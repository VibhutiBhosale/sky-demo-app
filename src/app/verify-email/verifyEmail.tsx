"use client";
import { labels } from "@/constants";
import OTPInputForm from "@/components/molecules/otp-form/otpForm";

export default function VerifyEmail() {
  const storedIdentifier = sessionStorage.getItem("email");
  return (
    <div className="page-content otp-form">
      <div className="card-container">
        <div className="card">
          <div className="sign-in-outer-grid">
            <h2 className="page-heading" data-testid="identifier-page-heading">
              {labels.verifyEmail.heading}
            </h2>
            <div className="text-center text-[18px] leading-[28px] text-[#4A4A4A]">
              {labels.verifyEmail.subHeading}
              <h3
                data-testid="identifier-page-sub-heading"
                aria-hidden="true"
                className="text-center text-[18px] leading-[28px] font-bold text-[#4A4A4A]"
              >
                {storedIdentifier}
              </h3>
            </div>
            <div className="form-wrapper">
              <OTPInputForm className="otp-form" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
