/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import VerifyEmail from "./verifyEmail";
import { labels } from "@/constants";

// Mock child component OTPInputForm
jest.mock("@/components/molecules/otp-form/otpForm", () => {
  return function MockOTPForm(props: any) {
    return (
      <div data-testid="otp-form" {...props}>
        OTP FORM
      </div>
    );
  };
});

describe("VerifyEmail Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("renders the Verify Email heading", () => {
    render(<VerifyEmail />);

    expect(screen.getByTestId("identifier-page-heading")).toHaveTextContent(
      labels.verifyEmail.heading
    );
  });

  test("displays subheading text", () => {
    render(<VerifyEmail />);

    expect(screen.getByText(labels.verifyEmail.subHeading)).toBeInTheDocument();
  });

  test("shows stored email from sessionStorage", () => {
    sessionStorage.setItem("email", "test@sky.com");

    render(<VerifyEmail />);

    expect(screen.getByTestId("identifier-page-sub-heading")).toHaveTextContent("test@sky.com");
  });

  test("renders OTPInputForm", () => {
    render(<VerifyEmail />);

    expect(screen.getByTestId("otp-form")).toBeInTheDocument();
  });

  test("passes className to OTPInputForm", () => {
    render(<VerifyEmail />);

    const otpForm = screen.getByTestId("otp-form");
    expect(otpForm).toHaveClass("otp-form");
  });
});
