"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TextField from "@mui/material/TextField";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { useUpdateEmailForm } from "@/hooks/useUpdateEmailForm";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { graphqlRequest } from "@/lib/apiClient";
import { route, errorMessages } from "@/constants";
import { UPDATE_SIGNUP_EMAIL_MUTATION, SEND_OTP_MUTATION } from "@/graphql/mutations/auth";

export default function UpdateEmail() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useUpdateEmailForm();
  const [shrinkLabel1, setShrinkLabel1] = useState(false);
  const [shrinkLabel2, setShrinkLabel2] = useState(false);

  const {
    email1,
    email2,
    email1Error,
    email2Error,
    touchedEmail1,
    touchedEmail2,
    handleEmail1Change,
    handleEmail2Change,
    validateAll,
  } = form;

  const oldEmail = sessionStorage.getItem("email");

  const { handleSubmit, loading } = useFormSubmit({
    validate: () => {
      const ok = validateAll();
      return ok ? true : { general: "Please correct the errors above." };
    },

    request: async ({ email1 }: { email1: string }) => {
      const data = await graphqlRequest<{
        updateSignupEmail: { success: boolean; message: string };
      }>({
        query: UPDATE_SIGNUP_EMAIL_MUTATION,
        variables: {
          oldEmail,
          newEmail: email1,
        },
      });

      return data.updateSignupEmail;
    },

    onSuccess: async data => {
      if (!data?.success) {
        setServerError(data.message);
        return;
      }

      const otpResponse = await graphqlRequest<{
        sendOtp: { success: boolean; message: string; otp: string };
      }>({
        query: SEND_OTP_MUTATION,
        variables: { email: email1 },
      });

      const otp = otpResponse.sendOtp.otp;

      // store new email + otp
      sessionStorage.setItem("email", email1);
      sessionStorage.setItem("devOtp", otp);

      router.push(route.verifyEmail);
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

      setServerError(err.message);
    },
  });

  return (
    <div className="page-content update-email">
      <div className="card-container">
        <div className="card">
          <div className="sign-in-outer-grid">
            <h2 className="page-heading">Update your email address</h2>

            <div className="form-wrapper" id="userDetailsFormWrapper">
              <form
                className="user-details-content-grid otp-grid grid gap-3"
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(e, { email1 });
                }}
              >
                <div className="user-details-input-fields-grid">
                  <div className="text-input-container type-email label-in-border">
                    <div className="input-wrapper">
                      <TextField
                        label="Enter new email address"
                        variant="outlined"
                        value={email1}
                        onChange={e => handleEmail1Change(e.target.value)}
                        onBlur={() => handleEmail1Change(email1)}
                        onFocus={() => setShrinkLabel1(true)}
                        error={Boolean(email1Error && touchedEmail1)}
                        fullWidth
                        slotProps={{
                          inputLabel: {
                            shrink: shrinkLabel1,
                          },
                        }}
                        sx={{
                          "& .MuiInputLabel-root": {
                            fontSize: "20px !important",
                          },
                        }}
                      />
                    </div>

                    {touchedEmail1 && email1Error && (
                      <div className="error-message-container input-error-message">
                        <ErrorIcon />
                        {email1Error}
                      </div>
                    )}
                  </div>

                  <div className="text-input-container type-email label-in-border">
                    <div className="input-wrapper">
                      <TextField
                        label="Confirm new email address"
                        variant="outlined"
                        value={email2}
                        onChange={e => handleEmail2Change(e.target.value)}
                        onBlur={() => handleEmail2Change(email2)}
                        onFocus={() => setShrinkLabel2(true)}
                        error={Boolean(email2Error && touchedEmail2)}
                        fullWidth
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": {
                            fontSize: "20px !important",
                          },
                        }}
                        slotProps={{
                          inputLabel: {
                            shrink: shrinkLabel2,
                          },
                        }}
                      />
                    </div>

                    {touchedEmail2 && email2Error && (
                      <div className="error-message-container input-error-message">
                        <ErrorIcon />
                        {email2Error}
                      </div>
                    )}
                  </div>
                </div>

                {serverError && <div className="text-sm text-red-700">{serverError}</div>}

                <div className="identifier-links-and-button-grid">
                  <button className="btn primary full-width" type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update email"}
                  </button>
                </div>
              </form>
            </div>

            <div className="color-[#000ff5] font-bold">
              <Link href="/verify-email" className="link body dark active">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
