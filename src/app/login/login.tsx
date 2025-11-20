"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ErrorIcon from "@/components/icons/ErrorIcon";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { restRequest } from "@/lib/apiClient";
import { errorMessages, labels, route, apiRoutes } from "@/constants";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");

  const { handleSubmit, errors, setErrors, loading } = useFormSubmit({
    validate: () => {
      const errs: Record<string, string> = {};
      if (!identifier.trim()) errs.email = errorMessages.login.requiredField;
      return errs;
    },
    request: async ({ identifier }: { identifier: string }) => {
      const data = await restRequest<{
        success: boolean;
        message?: string;
        error?: { message?: string };
      }>(apiRoutes.checkIdentifier, { identifier });
      return data;
    },
    onSuccess: data => {
      if (!data.success) {
        const message =
          data?.error?.message || data?.message || errorMessages.login.invalidIdentifier;
        setErrors({ email: message });
        return null;
      }
      sessionStorage.setItem("login_identifier", identifier);
      router.push(route.enterPassword);
    },
    onError: () => {
      setErrors({ email: errorMessages.login.apiError });
    },
  });

  return (
    <div className="page-content">
      <div className="card-container">
        <div className="card">
          <div className="sign-in-outer-grid">
            <h2 className="page-heading" data-testid="identifier-page-heading">
              {labels.login.greeting}
            </h2>
            <h3
              data-testid="identifier-page-sub-heading"
              aria-hidden="true"
              className="body text dark"
            >
              {labels.login.subHeading}
            </h3>
            <div className="form-wrapper" id="identifierFormWrapper">
              <form
                className="form-input-and-control-grid"
                onSubmit={e => handleSubmit(e, { identifier })}
                noValidate
              >
                <div className="text-input-container type-text label-in-border">
                  <div className="input-wrapper">
                    <input
                      autoComplete="username"
                      autoCapitalize="off"
                      className={`input touched ${errors.email ? "input-error" : ""}`}
                      data-testid="identifier-input"
                      id="identifier"
                      maxLength={256}
                      name="identifier"
                      required
                      type="text"
                      value={identifier}
                      onChange={e => {
                        setIdentifier(e.target.value);
                        if (errors.email) setErrors({});
                      }}
                      placeholder=" "
                      disabled={loading}
                    />
                    <span className="pseudo-focus"></span>
                    <p aria-hidden="true" className="displayed-input-label">
                      {labels.login.textLabel}
                    </p>
                  </div>
                  {errors.email && (
                    <div className="error-message-container">
                      <ErrorIcon />
                      <p
                        id="identifierAriaErrorText"
                        data-testid="identifier-input-error"
                        className="body-sm text ta-left error-message negative-regular"
                      >
                        {errors.email}
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
                      {labels.login.forgotPasswordLink}
                    </a>
                    <span className="pseudo-focus"></span>
                  </span>
                  <button
                    className="btn primary full-width"
                    data-testid="identifier-submit"
                    type="submit"
                  >
                    {loading ? "Checking..." : "Continue"}
                  </button>
                  <span className="link-container inline">
                    <a
                      data-testid="identifier-create-account-link"
                      href="/signup"
                      className="link body dark inactive"
                    >
                      {labels.login.createAccountLink}
                    </a>
                    <span className="pseudo-focus"></span>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
