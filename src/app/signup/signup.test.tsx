/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./signup";
import { useRouter } from "next/navigation";
import { graphqlRequest } from "@/lib/apiClient";
import { useSignupForm } from "@/hooks/useSignupForm";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { errorMessages, route } from "@/constants";

// ----------------------------------------------------------------
// 🔧 MOCK DEPENDENCIES
// ----------------------------------------------------------------
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/apiClient", () => ({
  graphqlRequest: jest.fn(),
}));

jest.mock("@/hooks/useSignupForm", () => ({
  useSignupForm: jest.fn(),
}));

jest.mock("@/hooks/useFormSubmit", () => ({
  useFormSubmit: jest.fn(),
}));

describe("Signup Component", () => {
  let mockPush: jest.Mock;
  let mockHandleSubmit: jest.Mock;
  let mockSetErrors: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    mockSetErrors = jest.fn();

    // Default Signup Form Hook Mock
    (useSignupForm as jest.Mock).mockReturnValue({
      name: "",
      email: "",
      password: "",
      fullNameError: "",
      emailError: "",
      passwordErrors: "",
      touchedFullName: false,
      touchedEmail: false,
      touchedPassword: false,
      validateAll: jest.fn(() => true),

      handleNameChange: jest.fn(),
      handleEmailChange: jest.fn(),
      handlePasswordChange: jest.fn(),
      setErrors: jest.fn(),
    });

    mockHandleSubmit = jest.fn();
    (useFormSubmit as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      setErrors: mockSetErrors,
      loading: false,
    });
  });

  // ------------------------------------------------------------
  // 1️⃣ Rendering basic fields
  // ------------------------------------------------------------
  test("renders full name, email and password inputs", () => {
    render(<Signup />);

    expect(document.querySelector("input#fullName")).toBeInTheDocument();
    expect(document.querySelector("input#email")).toBeInTheDocument();
    expect(document.querySelector("input#password")).toBeInTheDocument();
  });

  // ------------------------------------------------------------
  // 2️⃣ Password toggle button
  // ------------------------------------------------------------
  test("toggles show password when clicking icon button", () => {
    render(<Signup />);

    const toggleBtn = screen.getByRole("button", { name: "" }); // icon button has no label
    const passwordInput = screen.getByTestId("password-input");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  // ------------------------------------------------------------
  // 3️⃣ Show password hints when password input is focused
  // ------------------------------------------------------------
  test("shows password hints on focus", () => {
    render(<Signup />);

    const passwordInput = document.querySelector("input#password");
    expect(passwordInput).toBeInTheDocument();

    fireEvent.focus(passwordInput!);

    expect(screen.getByText(/Make sure your password includes/i)).toBeInTheDocument();
  });

  // ------------------------------------------------------------
  // 4️⃣ Validation: When validateAll returns false → general error
  // ------------------------------------------------------------
  test("shows general error if validateAll returns false", async () => {
    (useSignupForm as jest.Mock).mockReturnValue({
      ...useSignupForm(),
      validateAll: jest.fn(() => false),
    });

    (useFormSubmit as jest.Mock).mockImplementation(config => ({
      handleSubmit: (e: any, vars: any) => {
        e.preventDefault();
        const validationResult = config.validate();
        if (Object.keys(validationResult).length) {
          config.onError({ message: errorMessages.signup.generalFallback });
        }
      },
      setErrors: mockSetErrors,
      loading: false,
    }));

    render(<Signup />);

    fireEvent.submit(screen.getByRole("button", { name: /create account/i }).closest("form")!);

    await waitFor(() => {
      expect(mockSetErrors).toHaveBeenCalledWith({
        general: errorMessages.signup.generalFallback,
      });
    });
  });

  // ------------------------------------------------------------
  // 5️⃣ Successful signup + OTP success → redirect
  // ------------------------------------------------------------
  /*test("successful signup sends OTP and redirects", async () => {
    // Remove previous mock implementation from beforeEach
    (useFormSubmit as jest.Mock).mockReset();

    // 1️⃣ Mock signup response
    (graphqlRequest as jest.Mock)
      .mockResolvedValueOnce({
        signup: {
          token: "abc123",
          user: { email: "test@sky.com" },
        },
      })
      .mockResolvedValueOnce({
        sendOtp: {
          success: true,
          message: "OTP sent",
          otp: "9999",
        },
      });

    let onSuccessCallback: any;

    // 2️⃣ Proper useFormSubmit mock
    (useFormSubmit as jest.Mock).mockImplementation(config => {
      onSuccessCallback = config.onSuccess;

      return {
        loading: false,
        setErrors: jest.fn(),
        handleSubmit: () => {
          onSuccessCallback({
            token: "abc123",
            user: { email: "test@sky.com" },
          });
        },
      };
    });

    // 3️⃣ Render **AFTER** applying useFormSubmit mock
    render(<Signup />);

    // 4️⃣ Trigger the form submit
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    // 5️⃣ Expect redirect
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(route.verifyEmail);
    });

    // 6️⃣ Check OTP saved
    expect(sessionStorage.getItem("email")).toBe("test@sky.com");
    expect(sessionStorage.getItem("devOtp")).toBe("9999");
  });*/

  // ------------------------------------------------------------
  // 6️⃣ OTP failure → serverError shown
  // ------------------------------------------------------------
  test("shows server error if OTP request fails", async () => {
    (graphqlRequest as jest.Mock)
      .mockResolvedValueOnce({
        signup: {
          token: "abc",
          user: { email: "t@t.com" },
        },
      })
      .mockRejectedValueOnce(new Error("OTP API failed"));

    let onSuccessCallback: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      onSuccessCallback = config.onSuccess;
      return {
        handleSubmit: () =>
          onSuccessCallback({
            token: "abc",
            user: { email: "t@t.com" },
          }),
        loading: false,
      };
    });

    render(<Signup />);

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/OTP sending failed/i)).toBeInTheDocument();
    });
  });

  // ------------------------------------------------------------
  // 7️⃣ Signup API error → email already exists path
  // ------------------------------------------------------------
  test("shows email exists error when signup returns email error", async () => {
    const errorMsg = errorMessages.signup.signupFailed;

    const mockFormSetErrors = jest.fn();
    (useSignupForm as jest.Mock).mockReturnValue({
      ...useSignupForm(),
      setErrors: mockFormSetErrors,
    });

    let onErrorCallback: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      onErrorCallback = config.onError;
      return {
        handleSubmit: () => onErrorCallback({ message: errorMsg }),
        setErrors: mockSetErrors,
        loading: false,
      };
    });

    render(<Signup />);

    fireEvent.click(screen.getByText(/create account/i));

    expect(mockFormSetErrors).toHaveBeenCalled();
  });

  // ------------------------------------------------------------
  // 8️⃣ Checkbox interaction
  // ------------------------------------------------------------
  test("checkbox toggles on click", () => {
    render(<Signup />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
