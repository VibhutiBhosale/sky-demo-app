"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ErrorIcon from "@/components/icons/ErrorIcon";
import NextIcon from "@/components/icons/NextIcon";
import PasswordToggleOnIcon from "@/components/icons/PasswordToggleOnIcon";
import PasswordToggleOffIcon from "@/components/icons/PasswordToggleOffIcon";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { VERIFY_PASSWORD_MUTATION } from "@/graphql/mutations/auth";
import { graphqlRequest } from "@/lib/apiClient";
import { errorMessages, labels, route } from "@/constants";

export default function EnterPassword() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    (async () => {
      const storedIdentifier = sessionStorage.getItem("login_identifier");
      if (!storedIdentifier) {
        await router.push(route.login);
      } else {
        setIdentifier(storedIdentifier);
      }
    })();
  }, [router]);

  const { handleSubmit, errors, loading, setErrors } = useFormSubmit({
    validate: () => {
      const errs: Record<string, string> = {};
      if (!password) errs.password = errorMessages.enterPassword.requiredField;
      return errs;
    },
    request: async ({ identifier, password }: { identifier: string; password: string }) => {
      const data = await graphqlRequest<{
        verifyPassword: { success: boolean; message?: string; token?: string };
      }>({
        query: VERIFY_PASSWORD_MUTATION,
        variables: { identifier, password },
      });
      if (!data.verifyPassword.success) {
        throw new Error(
          data.verifyPassword.message || errorMessages.enterPassword.passwordVrificationFailed
        );
      }

      return data.verifyPassword;
    },
    onSuccess: ({ success, token, message }) => {
      if (success) {
        sessionStorage.removeItem("login_identifier");
        if (token) localStorage.setItem("access_token", token);
        router.push("/");
      } else {
        setErrors({
          password: message || errorMessages.enterPassword.incorrectPassword,
        });
      }
    },
    onError: () => {
      setErrors({
        password: errorMessages.enterPassword.incorrectPassword,
      });
    },
  });

  return (
    <div className="page-content enter-password">
      <div className="card-container">
        <div className="card">
          <div className="sign-in-outer-grid">
            <h2 className="page-heading" data-testid="identifier-page-heading">
              {labels.enterPassword.welcomeLebel}
            </h2>
            <h3
              data-testid="identifier-page-sub-heading"
              aria-hidden="true"
              className="body text dark"
            >
              {identifier}
            </h3>
            <div className="change-email-link-wrapper">
              <span className="link-container inline">
                <Link
                  href="/"
                  data-testid="password-change-identifier-link"
                  className="link body dark active"
                  aria-current="page"
                >
                  <span className="text-link-with-chevron-content">
                    {labels.enterPassword.changeemailandUsername}
                    <NextIcon />
                  </span>
                </Link>
                <span className="pseudo-focus"></span>
              </span>
            </div>

            <div className="form-wrapper" id="identifierFormWrapper">
              <form
                className="form-input-and-control-grid"
                onSubmit={e => handleSubmit(e, { identifier, password })}
                noValidate
              >
                <div className="text-input-container type-text label-in-border">
                  <div className="input-wrapper">
                    <input
                      autoComplete="current-password"
                      className={`input touched ${errors.password ? "input-error" : ""}`}
                      data-testid="password-input"
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
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      data-testid="password-input-toggle"
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
                        data-testid="identifier-input-error"
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
                      data-testid="identifier-forgotton-username-link"
                      id="forgotUsernameLink"
                      href="https://skyid.sky.com/forgotusername/skycom/7b2261223a2268747470733a2f2f69642e736b792e636f6d2f222c2262223a2268747470733a2f2f69642e736b792e636f6d2f227d"
                      className="link body dark inactive"
                    >
                      {labels.enterPassword.forgotPasswordLink}
                    </a>
                    <span className="pseudo-focus"></span>
                  </span>
                  <button
                    className="btn primary full-width"
                    data-testid="identifier-submit"
                    type="submit"
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
