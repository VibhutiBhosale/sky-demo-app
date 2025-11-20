"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { graphqlRequest } from "@/lib/apiClient";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { route } from "@/constants";
import { VERIFY_OTP, RESEND_OTP } from "@/graphql/mutations/auth";

interface OTPInput6Props {
  length?: number;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export const OTPInputForm = ({ length = 6, autoFocus = true, className = "" }: OTPInput6Props) => {
  const [values, setValues] = useState<string[]>(() => Array.from({ length }, () => ""));
  const [otp, setOtp] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [expired, setExpired] = useState(true);
  const router = useRouter();

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const loadAttempts = useRef(0);
  const [inputFocused, setInputFocused] = useState(false);

  const code = values.join("");

  const allFilled = (arr: string[]) => arr.every(v => v !== "" && v !== null && v !== undefined);

  const validateCode = () => {
    if (code.length !== length || !allFilled(values)) {
      setError(`Your code must be ${length} numbers long.`);
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    if (error && code.length === length && allFilled(values)) {
      setError(""); // auto clear
    }
  }, [code, error, length, values]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!inputFocused) return;
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        validateCode();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputFocused, code, values]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const startTimer = (duration: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setTimeLeft(duration);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          expireOtp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const expireOtp = () => {
    setExpired(true);
    setOtp(null);
    sessionStorage.removeItem("devOtp");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const fillInputsFromOtp = (otpValue: string) => {
    const digits = otpValue.slice(0, length).split("");
    const filled = Array.from({ length }, (_, i) => digits[i] ?? "");
    setValues(filled);
  };

  const loadOtp = () => {
    const savedOtp = typeof window !== "undefined" ? window.sessionStorage.getItem("devOtp") : null;

    if (!savedOtp && loadAttempts.current < 20) {
      loadAttempts.current++;
      setTimeout(loadOtp, 30);
      return;
    }

    if (!savedOtp) {
      setExpired(true);
      return;
    }

    // OTP found → start fresh 30s timer and fill inputs for dev
    setOtp(savedOtp);
    fillInputsFromOtp(savedOtp);
    setExpired(false);
    startTimer(30);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    loadOtp();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const raw = e.target.value;
    const digit = raw.replace(/[^0-9]/g, "");

    if (digit.length === 0) {
      setValues(prev => {
        const next = [...prev];
        next[idx] = "";
        return next;
      });
      return;
    }

    if (digit.length > 1) {
      setValues(prev => {
        const next = [...prev];
        let pos = idx;
        for (let i = 0; i < digit.length && pos < length; i += 1, pos += 1) {
          next[pos] = digit[i];
        }
        return next;
      });
      return;
    }

    setValues(prev => {
      const next = [...prev];
      next[idx] = digit;
      return next;
    });

    if (idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (values[idx]) {
        setValues(prev => {
          const next = [...prev];
          next[idx] = "";
          return next;
        });
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/[^0-9]/g, "").slice(0, length);
    if (!digits) return;
    setValues(Array.from(digits.padEnd(length, ""), d => d));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCode()) return;

    try {
      setIsLoading(true);

      const email = sessionStorage.getItem("email") || "";

      const verifyData = await graphqlRequest<{
        verifyOtp: { success: boolean; message: string };
      }>({
        query: VERIFY_OTP,
        variables: { email, otp: code },
      });

      if (verifyData.verifyOtp.success) {
        router.push(route.login);
      } else {
        setError(verifyData.verifyOtp.message || "Invalid code, please try again.");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      setIsLoading(true);

      const email = sessionStorage.getItem("email") || "";

      const resendData = await graphqlRequest<{
        sendOtp: { success: boolean; message: string; otp: string };
      }>({
        query: RESEND_OTP,
        variables: { email },
      });

      const newOtp = resendData.sendOtp.otp;

      if (newOtp) {
        sessionStorage.setItem("devOtp", newOtp);
        setOtp(newOtp);
        fillInputsFromOtp(newOtp);
        setExpired(false);
        startTimer(30);
      } else {
        console.warn("Resend did not return an otp");
      }
    } catch (err) {
      console.error("Resend OTP failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => seconds.toString().padStart(2, "0");

  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      <h2 className="body text-left font-normal">
        Please enter your code: {otp && !expired ? sessionStorage.getItem("devOtp") : ""}
      </h2>

      <form
        ref={formRef}
        onSubmit={handleContinue}
        className="user-details-content-grid otp-grid grid gap-4"
      >
        <div
          className="flex gap-4"
          onPaste={handlePaste}
          role="group"
          aria-label={`Enter ${length}-digit verification code`}
        >
          {values.map((value, i) => (
            <input
              key={i}
              ref={el => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={value}
              onChange={e => handleChange(e, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              onFocus={() => setInputFocused(true)}
              className={`h-12 w-12 rounded-[4px] border text-center text-lg font-medium caret-transparent focus:ring-1 focus:ring-indigo-500 focus:outline-none md:h-[54px] md:w-[41px] ${
                error ? "border-red-500" : "border-[#e6e6e6]"
              }`}
              aria-label={`Digit ${i + 1}`}
              aria-required="true"
              disabled={isLoading}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center">
            <ErrorIcon />
            <p className="pl-2 text-left text-sm text-[16px] leading-[24px] text-red-500">
              {error}
            </p>
          </div>
        )}

        <div className="identifier-links-and-button-grid">
          <button className="btn primary full-width" type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Continue"}
          </button>
        </div>

        <hr className="mt-2 mb-2 w-full border-[0.5px] border-[#e6e6e6]" />
        <p>Didn&apos;t receive a code?</p>

        <div className="identifier-links-and-button-grid">
          <button
            className="btn secondary full-width"
            type="button"
            disabled={!expired}
            onClick={resendCode}
          >
            {isLoading ? "Sending..." : "Resend code"}
          </button>
        </div>
      </form>

      {timeLeft > 0 && (
        <div className="mt-2 text-center text-sm text-gray-500">
          <p className="mb-2 text-left text-[16px] leading-[24px]">
            We have sent you a new code. Please check your spam folder if it has not arrived within
            1 minute.
          </p>
          <p className="text-left text-[16px] leading-[24px]">
            Please wait {formatTime(timeLeft)} seconds before you resend the code.
          </p>
        </div>
      )}

      <p className="text-left text-[16px] leading-[24px]">
        If you can&apos;t access this email, please{" "}
        <Link href="/update-email" className="text-sky-600 underline hover:text-sky-800">
          update your email address
        </Link>{" "}
        and we&apos;ll resend the code.
      </p>
    </div>
  );
};

export default OTPInputForm;
