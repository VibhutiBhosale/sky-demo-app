// src/app/signup/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../../lib/clientAuth";
import Link from "next/link";
import PasswordToggleOnIcon from "../../components/icons/PasswordToggleOnIcon";
import PasswordToggleOffIcon from "../../components/icons/PasswordToggleOffIcon";
import ErrorIcon from "../../components/icons/ErrorIcon";

const SIGNUP_MUTATION = `
mutation Signup($name: String, $email: String!, $password: String!) {
  signup(name: $name, email: $email, password: $password) {
    token
    user { _id name email }
  }
}
`;

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPasswordHints, setShowPasswordHints] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[] | null>(null);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [touchedFullName, setTouchedFullName] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: SIGNUP_MUTATION,
          variables: { name, email, password },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        setServerError(json.errors[0].message || "Signup failed");
      } else {
        const token = json.data.signup.token;
        setAccessToken(token);
        router.push("/login");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-content enter-password">
      <div className="card-container">
        <div className="card">
          <div className="user-details-page-grid">
            <h1 className="page-heading" data-testid="SIGN_UP_PAGE_HEADING">
              Create an account
            </h1>
            <div className="form-wrapper" id="userDetailsFormWrapper">
              <form className="user-details-content-grid" onSubmit={onSubmit} noValidate>
                <div className="user-details-input-fields-grid">
                  <div className="text-input-container type-text label-in-border">
                    <label
                      id="fullNameAriaLabel"
                      className="visually-hidden"
                      data-testid="SIGN_UP_INPUT_NAME_LABEL"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="input-wrapper">
                      <input
                        autoComplete="given-name"
                        className={`input touched ${
                          fullNameError && touchedFullName ? "input-error" : ""
                        }`}
                        data-testid="SIGN_UP_INPUT_NAME"
                        id="fullName"
                        name="fullName"
                        required
                        type="text"
                        value={name}
                        onFocus={() => {
                          if (!name.trim()) {
                            setFullNameError("Enter your full name.");
                          }
                        }}
                        onBlur={() => {
                          setTouchedFullName(true);
                          if (!name.trim()) {
                            setFullNameError("Enter your full name.");
                          }
                        }}
                        onChange={e => {
                          const newName = e.target.value;
                          setName(newName);
                          setTouchedFullName(true);

                          // Progressive validation (one error at a time)
                          if (!newName.trim()) {
                            setFullNameError("Enter your full name.");
                          } else if (newName.trim().length < 4) {
                            setFullNameError(
                              "The full name must be longer than 3 characters long."
                            );
                          } else if (!newName.includes(" ")) {
                            setFullNameError("Please provide your first and last name.");
                          } else if (/[^a-zA-Z\s]/.test(newName)) {
                            setFullNameError("No special characters please.");
                          } else {
                            // ✅ All rules passed
                            setFullNameError(null);
                          }
                        }}
                      />
                      <span className="pseudo-focus"></span>
                      <p aria-hidden="true" className="displayed-input-label">
                        Full Name
                      </p>
                    </div>
                    {touchedFullName && fullNameError && (
                      <div className="error-message-container input-error-message">
                        <ErrorIcon />
                        {fullNameError}
                      </div>
                    )}
                  </div>
                  <div className="text-input-container type-email label-in-border">
                    <label
                      id="emailAriaLabel"
                      className="visually-hidden"
                      data-testid="SIGN_UP_INPUT_EMAIL_LABEL"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="input-wrapper">
                      <input
                        autoComplete="email"
                        autoCapitalize="off"
                        className={`input touched ${
                          emailError && touchedEmail ? "input-error" : ""
                        }`}
                        data-testid="SIGN_UP_INPUT_EMAIL"
                        id="email"
                        name="email"
                        required
                        type="email"
                        value={email}
                        onFocus={() => {
                          if (!email.trim()) {
                            setEmailError("Enter your email address.");
                          }
                        }}
                        onBlur={() => {
                          setTouchedEmail(true);
                          if (!email.trim()) {
                            setEmailError("Enter your email address.");
                          }
                        }}
                        onChange={e => {
                          const newEmail = e.target.value;
                          setEmail(newEmail);
                          setTouchedEmail(true);

                          // Validate live while typing
                          if (!newEmail.trim()) {
                            setEmailError("Enter your email address.");
                          } else if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
                            setEmailError("Please enter a valid email address.");
                          } else {
                            // ✅ Valid email → clear errors
                            setEmailError(null);
                          }
                        }}
                      />
                      <span className="pseudo-focus"></span>
                      <p aria-hidden="true" className="displayed-input-label">
                        Email
                      </p>
                    </div>
                    {touchedEmail && emailError && (
                      <div className="error-message-container input-error-message">
                        <ErrorIcon />
                        {emailError}
                      </div>
                    )}
                  </div>
                  <div className="text-input-container type-password label-in-border">
                    <label
                      id="passwordAriaLabel"
                      className="visually-hidden"
                      data-testid="SIGN_UP_INPUT_PASSWORD_LABEL"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="input-wrapper">
                      <input
                        autoComplete="new-password"
                        className={`input touched initially-password ${
                          passwordErrors && touchedPassword ? "input-error" : ""
                        }`}
                        data-testid="SIGN_UP_INPUT_PASSWORD"
                        id="password"
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        //onChange={e=>setPassword(e.target.value)}
                        onFocus={() => {
                          setShowPasswordHints(true);
                          if (!password.trim()) {
                            setPasswordErrors(["Enter your password."]);
                          }
                        }}
                        onBlur={() => {
                          setTouchedPassword(true);
                          if (!password.trim()) {
                            setPasswordErrors(["Enter your password."]);
                          }
                        }}
                        //onChange={handlePasswordChange}
                        onChange={e => {
                          const newPassword = e.target.value;
                          setPassword(newPassword);
                          setTouchedPassword(true);

                          // Step-by-step validation
                          if (!newPassword.trim()) {
                            setPasswordErrors(["Enter your password."]);
                          } else if (newPassword.length < 8) {
                            setPasswordErrors([
                              "Your password should be at least 8 characters long.",
                            ]);
                          } else if (!/[a-z]/.test(newPassword)) {
                            setPasswordErrors(["Your password should contain a lowercase letter."]);
                          } else if (!/[A-Z]/.test(newPassword)) {
                            setPasswordErrors([
                              "Your password should contain an uppercase letter.",
                            ]);
                          } else if (!/\d/.test(newPassword)) {
                            setPasswordErrors(["Your password should contain a number."]);
                          } else {
                            // ✅ All conditions passed
                            setPasswordErrors(null);
                            setShowPasswordHints(false);
                          }
                        }}
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
                        aria-label="Hide password in text field"
                        data-tracking-text="Hide password in text field"
                        data-testid="SIGN_UP_INPUT_PASSWORD_TOGGLE"
                        id="passwordToggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <PasswordToggleOffIcon /> : <PasswordToggleOnIcon />}
                      </button>
                    </div>
                    {touchedPassword && passwordErrors && (
                      <div className="error-message-container input-error-message">
                        <ErrorIcon />
                        {passwordErrors}
                      </div>
                    )}
                  </div>
                  {showPasswordHints && (
                    <div className="password-hints">
                      <p className="body-sm text bold dark">Make sure your password includes:</p>
                      <ul className="password-hints-list">
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One lowercase letter</li>
                        <li>One number</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="checkbox-container">
                  <div className="checkbox-wrapper user-details-external-links">
                    <div className="checkbox-icon-wrapper">
                      <input
                        className="checkbox"
                        type="checkbox"
                        id="marketingOption"
                        data-testid="marketingOption"
                        checked={marketingOptIn}
                        onChange={e => setMarketingOptIn(e.target.checked)}
                      />
                      <span className="pseudo-focus"></span>
                    </div>
                    <div className="checkbox-label-wrapper">
                      <label
                        className="checkbox-label"
                        htmlFor="marketingOption"
                        data-testid="marketingOption_LABEL"
                        id="marketingOption_LABEL"
                      >
                        I am happy for Sky to use my contact details above and my address to update
                        me about offers, products and services. You can change your preferences at
                        any time online or by speaking to us. Please also read Sky&apos;s
                        <br />
                        <a
                          className="privacy-link"
                          href="https://www.sky.com/help/articles/sky-privacy-and-cookies-notice?hideMasthead=true"
                          target="_blank"
                        >
                          Privacy &amp; cookies notice.
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <p
                  data-testid="SIGN_UP_DEFAULT_TERMS_AND_CONDITIONS"
                  className="body-sm text ta-left user-details-external-links dark"
                >
                  By continuing you confirm you have agreed to the <br />
                  <a
                    href="https://www.sky.com/help/articles/sky-terms-and-conditions"
                    data-testid="ACCEPT_TANDC_EXTERNAL_TC_LINK_1"
                    target="_blank"
                    className="nowrap"
                  >
                    Sky Terms &amp; Conditions.
                  </a>
                </p>
                {serverError && <div className="mb-2 text-sm text-red-700">{serverError}</div>}
                <div className="user-details-button-and-link">
                  <button
                    className="btn primary full-width"
                    data-testid="SIGN_UP_CREATE_ACCOUNT_BUTTON"
                    id="signUpContinueButton"
                    type="submit"
                    data-tracking-description="cta:SIGN_UP_CREATE_ACCOUNT_BUTTON"
                    data-tracking-location="Page"
                    data-tracking-text="Create account"
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>
                  <div className="user-details-sign-in-wrap">
                    <span className="link-container inline">
                      <Link
                        data-testid="SIGN_UP_LINK_TO_SIGN_IN"
                        data-tracking-description="cta:SIGN_UP_LINK_TO_SIGN_IN"
                        data-tracking-location="Page"
                        data-tracking-text="Back to sign in"
                        href="/"
                        className="link body dark active"
                        aria-current="page"
                      >
                        Back to sign in
                      </Link>
                      <span className="pseudo-focus"></span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
