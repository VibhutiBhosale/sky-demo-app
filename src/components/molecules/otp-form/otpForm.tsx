import React, { useEffect, useRef, useState } from "react";
import ErrorIcon from "@/components/icons/ErrorIcon";
import Link from "next/link";

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
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /** 👇 FIX: Prevent React Strict Mode double-running useEffect */
  const didRun = useRef(false);

  const code = values.join("");

  /* ---------------------------------
     Timer Countdown (per second)
  ---------------------------------- */
  const startTimer = (duration: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

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
    sessionStorage.removeItem("otpTimestamp");

    if (timerRef.current) clearInterval(timerRef.current);
  };
  /* --------------------------
     Validate OTP Fields
  --------------------------- */
  const validateCode = () => {
    if (code.length !== length || code.includes("")) {
      setError(`Your code must be ${length} numbers long.`);
      return false;
    }
    setError("");
    return true;
  };

  /* ---------------------
     Auto-focus first input
  ---------------------- */
  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const loadOtp = () => {
    let attempts = 0;
    const savedOtp = window.sessionStorage.getItem("devOtp");

    // Retry for ~200ms until sessionStorage is populated
    if (!savedOtp && attempts < 15) {
      attempts++;
      setTimeout(loadOtp, 15);
      return;
    }

    // Still nothing → user has no OTP → allow resend
    if (!savedOtp) {
      setExpired(true);
      return;
    }

    // OTP FOUND → start timer
    setOtp(savedOtp);
    setExpired(false);
    setTimeLeft(30);
    startTimer(30);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    loadOtp();
  }, []);
  /* --------------------------------
     Validate on outside click
  --------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        validateCode();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  /* --------------------------
     Handle input changes
  --------------------------- */
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

  /* ---------------------------
     Keyboard Inputs
  ---------------------------- */
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

  /* --------------------------
     Handle Paste
  --------------------------- */
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/[^0-9]/g, "").slice(0, length);
    if (!digits) return;
    setValues(Array.from(digits.padEnd(length, ""), d => d));
  };

  /* --------------------------
     Continue Button
  --------------------------- */
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCode()) return;
  };

  const formatTime = (seconds: number): string => seconds.toString().padStart(2, "0");

  /* -----------------------------------
     RESEND OTP
  ------------------------------------ */
  const resendCode = async () => {
    // TODO: Replace with GraphQL mutation
    const newOtp = "123456";

    sessionStorage.setItem("devOtp", newOtp);
    sessionStorage.setItem("otpTimestamp", Date.now().toString());

    setOtp(newOtp);
    setExpired(false);
    setTimeLeft(30);
    startTimer(30);
  };

  /* --------------------------
     JSX (unchanged)
  --------------------------- */
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
            {" "}
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
