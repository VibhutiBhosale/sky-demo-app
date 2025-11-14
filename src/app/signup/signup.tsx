"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordToggleOnIcon from "@/components/icons/PasswordToggleOnIcon";
import PasswordToggleOffIcon from "@/components/icons/PasswordToggleOffIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useSignupForm } from "@/hooks/useSignupForm";
import { SIGNUP_MUTATION } from "@/graphql/mutations/auth";
import { graphqlRequest } from "@/lib/apiClient";
import { errorMessages, labels, route } from "@/constants";

export default function Signup() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPasswordHints, setShowPasswordHints] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const form = useSignupForm();
  const {
    name,
    email,
    password,
    fullNameError,
    emailError,
    passwordErrors,
    touchedFullName,
    touchedEmail,
    touchedPassword,
    validateAll,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
  } = form;

  const { handleSubmit, loading, setErrors } = useFormSubmit({
    validate: (): Record<string, string> => {
      const isValid = validateAll();
      return isValid ? {} : { general: errorMessages.signup.generalFallback };
    },

    request: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const data = await graphqlRequest<{ signup: { token: string; user: unknown } }>({
        query: SIGNUP_MUTATION,
        variables: { name, email, password },
      });
      return data.signup;
    },

    onSuccess: async data => {
      try {
        if (data.token) localStorage.setItem("access_token", data.token);

        const email = data?.user?.email;

        /** ---------------------------------------------
         *  1️⃣ OTP GRAPHQL MUTATION (not REST)
         *  --------------------------------------------- */
        const SEND_OTP_MUTATION = `
          mutation SendOtp($email: String!) {
            sendOtp(email: $email) {
              success
              message
              otp
            }
          }
        `;

        const otpResponse = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: SEND_OTP_MUTATION,
            variables: { email },
          }),
        });

        const result = await otpResponse.json();
        const otp = result?.data?.sendOtp?.otp;

        /** ---------------------------------------------
         *  2️⃣ STORE OTP + EMAIL SECURELY (NOT IN URL)
         *  --------------------------------------------- */
        sessionStorage.setItem("devOtp", otp);
        sessionStorage.setItem("email", email);

        /** ---------------------------------------------
         *  3️⃣ REDIRECT TO VERIFY EMAIL PAGE
         *  --------------------------------------------- */
        router.push(route.verifyEmail);
      } catch (err) {
        console.error("OTP Error:", err);
        setServerError("OTP sending failed. Try again.");
      }
    },

    onError: err => {
      if (err.message === errorMessages.signup.signupFailed) {
        form.setErrors(prev => ({
          ...prev,
          emailError: errorMessages.signup.emailAlreadyExist,
        }));
        setServerError(null);
        return;
      }
      setErrors({ general: err.message || errorMessages.signup.signupFailed });
      setServerError(err.message);
    },
  });

  return (
    <div className="page-content enter-password">
      <div className="card-container">
        <div className="card">
          <div className="user-details-page-grid">
            <h1 className="page-heading" data-testid="signup-page-heading">
              {labels.signup.createAccount}
            </h1>
            <div className="form-wrapper" id="userDetailsFormWrapper">
              <form
                className="user-details-content-grid"
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(e, {
                    name: name.trim(),
                    email: email.trim(),
                    password: password.trim(),
                  });
                }}
                noValidate
              >
                <div className="user-details-input-fields-grid">
                  <div className="text-input-container type-text label-in-border">
                    <div className="input-wrapper">
                      <input
                        autoComplete="given-name"
                        className={`input touched ${
                          fullNameError && touchedFullName ? "input-error" : ""
                        }`}
                        data-testid="sign-up-input-name"
                        id="fullName"
                        name="fullName"
                        required
                        type="text"
                        value={name}
                        onChange={e => handleNameChange(e.target.value)}
                        onBlur={() => handleNameChange(name)}
                      />
                      <span className="pseudo-focus"></span>
                      <p aria-hidden="true" className="displayed-input-label">
                        {labels.signup.fullName}
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
                    <div className="input-wrapper">
                      <input
                        autoComplete="email"
                        autoCapitalize="off"
                        className={`input touched ${
                          emailError && touchedEmail ? "input-error" : ""
                        }`}
                        data-testid="sign-up-input-emailL"
                        id="email"
                        name="email"
                        required
                        type="email"
                        value={email}
                        onChange={e => handleEmailChange(e.target.value)}
                        onBlur={() => handleEmailChange(email)}
                      />
                      <span className="pseudo-focus"></span>
                      <p aria-hidden="true" className="displayed-input-label">
                        {labels.signup.email}
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
                    <div className="input-wrapper">
                      <input
                        autoComplete="new-password"
                        className={`input touched initially-password ${
                          passwordErrors && touchedPassword ? "input-error" : ""
                        }`}
                        data-testid="sign-up-input-password"
                        id="password"
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => handlePasswordChange(e.target.value)}
                        onBlur={() => handlePasswordChange(password)}
                        onFocus={() => {
                          setShowPasswordHints(true);
                        }}
                      />
                      <span className="pseudo-focus"></span>
                      <p aria-hidden="true" className="displayed-input-label">
                        {labels.signup.password}
                      </p>
                      <button
                        className="toggle-field-type"
                        type="button"
                        aria-label="Hide password in text field"
                        data-testid="sign-up-input-password-toggle"
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
                      <p className="body-sm text bold dark">{labels.passwordHints.passwordHint}</p>
                      <ul className="password-hints-list">
                        <li>{labels.passwordHints.firstRule}</li>
                        <li>{labels.passwordHints.secondRule}</li>
                        <li>{labels.passwordHints.thirdRule}</li>
                        <li>{labels.passwordHints.fourthRule}</li>
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
                        data-testid="marketingOption_label"
                        id="marketingOption_label"
                      >
                        {labels.signup.consentText}
                        <br />
                        <a
                          className="privacy-link"
                          href="https://www.sky.com/help/articles/sky-privacy-and-cookies-notice?hideMasthead=true"
                          target="_blank"
                        >
                          {labels.signup.privacycontentLink}
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <p
                  data-testid="sign-up-default-terms-and-condition"
                  className="body-sm text ta-left user-details-external-links dark"
                >
                  {labels.signup.confirmText} <br />
                  <a
                    href="https://www.sky.com/help/articles/sky-terms-and-conditions"
                    data-testid="accept-terms-and-condition"
                    target="_blank"
                    className="nowrap"
                  >
                    {labels.signup.skyTermText}
                  </a>
                </p>
                {serverError && <div className="mb-2 text-sm text-red-700">{serverError}</div>}
                <div className="user-details-button-and-link">
                  <button
                    className="btn primary full-width"
                    data-testid="sign-up-create-account-button"
                    id="signUpContinueButton"
                    type="submit"
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>
                  <div className="user-details-sign-in-wrap">
                    <span className="link-container inline">
                      <Link
                        data-testid="sign-up-link-to-sign-in"
                        href="/"
                        className="link body dark active"
                        aria-current="page"
                      >
                        {labels.signup.backToSignIn}
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
