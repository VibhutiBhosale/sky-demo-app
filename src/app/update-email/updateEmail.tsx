"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "next/link";

export default function UpdateEmail() {
  return (
    <div className="page-content update-email">
      <div className="card-container">
        <div className="card">
          <div className="sign-in-outer-grid">
            <h2 className="page-heading" data-testid="identifier-page-heading">
              Update your email address
            </h2>
            <div className="form-wrapper" id="userDetailsFormWrapper">
              <form className="user-details-content-grid otp-grid grid gap-4">
                <div className="user-details-input-fields-grid">
                  <div className="text-input-container type-text label-in-border">
                    <div className="input-wrapper">
                      <TextField
                        error
                        id="outlined-basic"
                        label="Enter new email address"
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": {
                            fontSize: "16px !important", // floating label size
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-input-container type-text label-in-border">
                    <div className="input-wrapper">
                      <TextField
                        error
                        id="outlined-basic"
                        label="Enter new email address"
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root.Mui-focused": {
                            fontSize: "16px !important", // floating label size
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="identifier-links-and-button-grid">
                  <button
                    className="btn primary full-width"
                    data-testid="sign-up-create-account-button"
                    id="signUpContinueButton"
                    type="button"
                  >
                    Update email
                  </button>
                </div>
              </form>
            </div>
            <div className="color-[#000ff5] font-bold">
              <Link
                data-testid="sign-up-link-to-sign-in"
                href="/verify-email"
                className="link body dark active"
                aria-current="page"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
