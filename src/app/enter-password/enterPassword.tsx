"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ErrorIcon from "../../components/icons/ErrorIcon";
import NextIcon from "../../components/icons/NextIcon";
import PasswordToggleOnIcon from "../../components/icons/PasswordToggleOnIcon";
import PasswordToggleOffIcon from "../../components/icons/PasswordToggleOffIcon";

export default function EnterPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState<string | null>(null);

  useEffect(() => {
    const storedIdentifier = sessionStorage.getItem("login_identifier");
    if (!storedIdentifier) {
      // If no identifier found, redirect back to login
      router.push("/login");
    } else {
      setIdentifier(storedIdentifier);
    }
  }, [router]);

  // 🧩 Local validation
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!password.trim()) {
      newErrors.password = "Enter your password.";
    }
    return newErrors;
  };

  // 🔐 Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // GraphQL mutation to verify password
      const query = `
        mutation VerifyPassword($identifier: String!, $password: String!) {
          verifyPassword(identifier: $identifier, password: $password) {
            success
            message
            token
          }
        }
      `;

      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { identifier, password },
        }),
      });

      const { data, errors: gqlErrors } = await res.json();

      if (gqlErrors || !data?.verifyPassword) {
        throw new Error(gqlErrors?.[0]?.message || "Unexpected error");
      }

      const { success, message, token } = data.verifyPassword;

      if (success) {
        sessionStorage.removeItem("login_identifier");
        // ✅ Store token if provided (optional)
        if (token) localStorage.setItem("access_token", token);

        // ✅ Redirect to home or dashboard
        router.push("/");
      } else {
        setErrors({ password: message || "Incorrect password." });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error:", err);
      }
      setErrors({ password: "Incorrect password. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-content enter-password">
      <div className="card-container">
        <div className="card">
          <div className="sign-in-outer-grid">
            <h2 className="page-heading" data-testid="IDENTIFIER_PAGE_HEADING">
              Welcome back
            </h2>
            <h3
              data-testid="IDENTIFIER_PAGE_SUB_HEADING"
              aria-hidden="true"
              className="body text dark"
            >
              vibhuti.2008@gmail.com
            </h3>
            <div className="change-email-link-wrapper">
              <span className="link-container inline">
                <Link
                  href="/"
                  data-testid="PASSWORD_CHANGE_IDENTIFIER_LINK"
                  data-tracking-description="cta:PASSWORD_CHANGE_IDENTIFIER_LINK"
                  data-tracking-location="Page"
                  data-tracking-text="Change email or username"
                  className="link body dark active"
                  aria-current="page"
                >
                  <span className="text-link-with-chevron-content">
                    Change email or username
                    <NextIcon />
                  </span>
                </Link>
                <span className="pseudo-focus"></span>
              </span>
            </div>

            <div className="form-wrapper" id="identifierFormWrapper">
              <form className="form-input-and-control-grid" onSubmit={handleSubmit} noValidate>
                <div className="text-input-container type-text label-in-border">
                  <div className="input-wrapper">
                    <input
                      autoComplete="current-password"
                      className={`input touched ${errors.password ? "input-error" : ""}`}
                      data-testid="PASSWORD_INPUT"
                      id="password"
                      maxLength={256}
                      name="password"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({});
                      }}
                      disabled={loading}
                    />
                    <span className="pseudo-focus"></span>
                    <p aria-hidden="true" className="displayed-input-label">
                      Password
                    </p>
                    <button
                      className="toggle-field-type"
                      data-tracking-description="cta:toggle-password-visibility"
                      data-tracking-location="Page"
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      data-tracking-text="Hide password in text field"
                      data-testid="PASSWORD_INPUT_TOGGLE"
                      id="passwordToggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <PasswordToggleOffIcon /> : <PasswordToggleOnIcon />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="error-message-container">
                      <ErrorIcon />
                      <p
                        id="identifierAriaErrorText"
                        data-testid="IDENTIFIER_INPUT_ERROR"
                        className="body-sm text ta-left error-message negative-regular"
                      >
                        {errors.password}
                      </p>
                    </div>
                  )}
                </div>
                <div className="identifier-links-and-button-grid">
                  <span className="link-container inline">
                    <a
                      data-testid="IDENTIFIER_FORGOTTEN_USERNAME_LINK"
                      id="forgotUsernameLink"
                      data-tracking-description="cta:IDENTIFIER_FORGOTTEN_USERNAME_LINK"
                      data-tracking-location="Page"
                      data-tracking-text="Forgotten your email or username?"
                      href="https://skyid.sky.com/forgotusername/skycom/7b2261223a2268747470733a2f2f69642e736b792e636f6d2f222c2262223a2268747470733a2f2f69642e736b792e636f6d2f227d"
                      className="link body dark inactive"
                    >
                      Forgotten your password?
                    </a>
                    <span className="pseudo-focus"></span>
                  </span>
                  <button
                    className="btn primary full-width"
                    data-testid="IDENTIFIER_SUBMIT"
                    type="submit"
                    data-tracking-description="cta:IDENTIFIER_SUBMIT"
                    data-tracking-location="Page"
                    data-tracking-text="Continue"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Continue"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
