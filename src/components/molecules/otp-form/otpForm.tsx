import React, { useEffect, useRef, useState } from "react";
import ErrorIcon from "@/components/icons/ErrorIcon";

interface OTPInput6Props {
  length?: number;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export const OTPInputForm = ({
  length = 6,
  onChange,
  onComplete,
  autoFocus = true,
  className = "",
}: OTPInput6Props) => {
  const [values, setValues] = useState<string[]>(() => Array.from({ length }, () => ""));
  const [error, setError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const code = values.join("");

  // ⏱ Focus first input
  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  // ⏳ Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🔍 Validation logic
  const validateCode = () => {
    if (code.length !== length || code.includes("")) {
      setError(`Your code must be ${length} numbers long.`);
      return false;
    }
    setError("");
    return true;
  };

  // ✅ Validate when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        validateCode();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  // 🔄 Handle input changes
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

  // ⌨️ Handle key navigation & backspace
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

  // 📋 Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/[^0-9]/g, "").slice(0, length);
    if (!digits) return;
    setValues(Array.from(digits.padEnd(length, ""), d => d));
  };

  // ⚡ Verify OTP via GraphQL API
  const verifyOtp = async (otpCode: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation VerifyOtp($email: String!, $otp: String!) {
              verifyOtp(email: $email, otp: $otp) {
                success
                message
              }
            }
          `,
          variables: {
            email: "user@example.com", // ⚠️ Replace with actual user email from context/state
            otp: otpCode,
          },
        }),
      });

      const result = await response.json();
      const data = result.data?.verifyOtp;

      if (!data?.success) {
        setError(data?.message || "Invalid OTP. Please try again.");
      } else {
        setError("");
        onComplete?.(otpCode);
      }
    } catch (err) {
      console.error("verifyOtp error:", err);
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔁 Resend OTP via GraphQL API
  const resendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation SendOtp($email: String!) {
              sendOtp(email: $email) {
                success
                message
              }
            }
          `,
          variables: {
            email: "user@example.com", // ⚠️ Replace with actual user email
          },
        }),
      });

      const result = await response.json();
      const data = result.data?.sendOtp;

      if (!data?.success) {
        setError(data?.message || "Failed to resend OTP.");
      } else {
        setError("");
        setTimeLeft(30);
      }
    } catch (err) {
      console.error("sendOtp error:", err);
      setError("Failed to resend OTP. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🧩 Handle Continue click
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCode()) return;
    await verifyOtp(code);
  };

  // ⏱ Timer format
  const formatTime = (seconds: number): string => seconds.toString().padStart(2, "0");

  return (
    <div className={`flex flex-col gap-4 ${className}`.trim()}>
      <h2 className="body text-left font-normal">Please enter your code:</h2>
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
          <button
            className="btn primary full-width"
            data-testid="sign-up-create-account-button"
            id="signUpContinueButton"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
        </div>

        <hr className="mt-2 mb-2 w-full border-[0.5px] border-[#e6e6e6]" />
        <p>Didn&apos;t receive a code?</p>
        <div className="identifier-links-and-button-grid">
          <button
            className="btn secondary full-width"
            data-testid="sign-up-create-account-button"
            id="signUpContinueButton"
            type="button"
            onClick={resendOtp}
            disabled={isLoading || timeLeft > 0}
          >
            {isLoading ? "Sending..." : "Resend code"}
          </button>
        </div>
      </form>

      {timeLeft > 0 && (
        <div className="mt-2 text-center text-sm text-gray-500">
          <p className="text-left text-[16px] leading-[24px]">
            Please wait {formatTime(timeLeft)} seconds before you resend the code.
          </p>
        </div>
      )}

      <p className="text-left text-[16px] leading-[24px]">
        If you can't access this email, please update your email address and we'll resend the code.
      </p>
    </div>
  );
};

export default OTPInputForm;
