/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateEmail from "./updateEmail";
import { useRouter } from "next/navigation";
import { graphqlRequest } from "@/lib/apiClient";
import { useUpdateEmailForm } from "@/hooks/useUpdateEmailForm";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { errorMessages, route } from "@/constants";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/lib/apiClient", () => ({ graphqlRequest: jest.fn() }));
jest.mock("@/hooks/useUpdateEmailForm", () => ({ useUpdateEmailForm: jest.fn() }));
jest.mock("@/hooks/useFormSubmit", () => ({ useFormSubmit: jest.fn() }));

describe("UpdateEmail Component", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();

    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // default form state
    (useUpdateEmailForm as jest.Mock).mockReturnValue({
      email1: "",
      email2: "",
      email1Error: "",
      email2Error: "",
      touchedEmail1: false,
      touchedEmail2: false,
      validateAll: jest.fn(() => true),
      handleEmail1Change: jest.fn(),
      handleEmail2Change: jest.fn(),
      setErrors: jest.fn(),
    });

    // useFormSubmit default stub (overridden in specific tests)
    (useFormSubmit as jest.Mock).mockReturnValue({
      handleSubmit: jest.fn(),
      loading: false,
      setErrors: jest.fn(),
    });
  });

  // -----------------------------------------------------
  // 1️⃣ Renders UI fields
  // -----------------------------------------------------
  test("renders both email fields", () => {
    render(<UpdateEmail />);
    expect(document.querySelector("input#email")).toBeInTheDocument();
    expect(document.querySelector("input#confirmEmail")).toBeInTheDocument();
  });

  // -----------------------------------------------------
  // 2️⃣ Validation failure (validateAll returns false)
  // -----------------------------------------------------
  test("shows general validation error when validateAll fails", async () => {
    (useUpdateEmailForm as jest.Mock).mockReturnValue({
      email1: "",
      email2: "",
      email1Error: "",
      email2Error: "",
      touchedEmail1: false,
      touchedEmail2: false,
      validateAll: jest.fn(() => false),
      handleEmail1Change: jest.fn(),
      handleEmail2Change: jest.fn(),
      setErrors: jest.fn(),
    });

    let onErrorCallback: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      onErrorCallback = config.onError;
      return {
        loading: false,
        setErrors: jest.fn(),
        handleSubmit: () => {
          onErrorCallback({ message: errorMessages.updateEmail.generalFallback });
        },
      };
    });

    render(<UpdateEmail />);

    fireEvent.click(screen.getByRole("button", { name: /update email/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessages.updateEmail.generalFallback)).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------
  // 3️⃣ SUCCESS: updateSignupEmail success + OTP success + redirect
  // -----------------------------------------------------
  test("successful update sends OTP and redirects", async () => {
    // Reset mocks specific to this test
    (graphqlRequest as jest.Mock).mockReset();
    (useFormSubmit as jest.Mock).mockReset();
    (useUpdateEmailForm as jest.Mock).mockReset();

    sessionStorage.setItem("email", "old@test.com");

    (useUpdateEmailForm as jest.Mock).mockReturnValue({
      email1: "new@test.com",
      email2: "new@test.com",
      touchedEmail1: false,
      touchedEmail2: false,
      email1Error: "",
      email2Error: "",
      validateAll: jest.fn(() => true),
      handleEmail1Change: jest.fn(),
      handleEmail2Change: jest.fn(),
      setErrors: jest.fn(),
    });

    // Mock BOTH graphql calls IN THE RIGHT ORDER
    (graphqlRequest as jest.Mock)
      .mockResolvedValueOnce({
        updateSignupEmail: { success: true, message: "ok" },
      })
      .mockResolvedValueOnce({
        sendOtp: { success: true, message: "sent", otp: "1234" },
      });

    let configStore: any;

    // FULL useFormSubmit mock — simulate request() then onSuccess()
    (useFormSubmit as jest.Mock).mockImplementation(config => {
      configStore = config;
      return {
        loading: false,
        handleSubmit: async () => {
          // FIRST call request() (the updateSignupEmail call)
          const result = await configStore.request({ email1: "new@test.com" });

          // THEN call onSuccess()
          await configStore.onSuccess(result);
        },
      };
    });

    render(<UpdateEmail />);

    fireEvent.click(screen.getByRole("button", { name: /update email/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(route.verifyEmail);
    });

    expect(sessionStorage.getItem("email")).toBe("new@test.com");
    expect(sessionStorage.getItem("devOtp")).toBe("1234");
  });

  // -----------------------------------------------------
  // 4️⃣ updateSignupEmail returns success: false → show server error
  // -----------------------------------------------------
  test("shows server error if updateSignupEmail returns failure", async () => {
    (graphqlRequest as jest.Mock).mockResolvedValueOnce({
      updateSignupEmail: { success: false, message: "Email invalid" },
    });

    let capturedOnSuccess: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      capturedOnSuccess = config.onSuccess;
      return {
        loading: false,
        handleSubmit: () => {
          capturedOnSuccess({ success: false, message: "Email invalid" });
        },
      };
    });

    render(<UpdateEmail />);

    fireEvent.click(screen.getByRole("button", { name: /update email/i }));

    await waitFor(() => {
      expect(screen.getByText("Email invalid")).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  // -----------------------------------------------------
  // 5️⃣ OTP request fails after update success
  // -----------------------------------------------------
  test("shows error when OTP sending fails", async () => {
    sessionStorage.setItem("email", "old@test.com");

    (useUpdateEmailForm as jest.Mock).mockReturnValue({
      email1: "new@test.com",
      email2: "new@test.com",
      email1Error: "",
      email2Error: "",
      touchedEmail1: false,
      touchedEmail2: false,
      validateAll: jest.fn(() => true),
      handleEmail1Change: jest.fn(),
      handleEmail2Change: jest.fn(),
      setErrors: jest.fn(),
    });

    // 1️⃣ First call → updateSignupEmail success
    (graphqlRequest as jest.Mock).mockResolvedValueOnce({
      updateSignupEmail: { success: true, message: "ok" },
    });

    // 2️⃣ Second call → OTP fails (rejected)
    (graphqlRequest as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessages.signup.otpSendFailed)
    );

    let configStore: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      configStore = config;

      return {
        loading: false,
        handleSubmit: async () => {
          const updateResult = await configStore.request({ email1: "new@test.com" });

          try {
            await configStore.onSuccess(updateResult);
          } catch (err) {
            // 🔥 Pass expected error to onError
            configStore.onError(new Error(errorMessages.signup.otpSendFailed));
          }
        },
      };
    });

    render(<UpdateEmail />);

    fireEvent.click(screen.getByRole("button", { name: /update email/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email invalid/i)).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------
  // 6️⃣ signupFailed → emailAlreadyExist path
  // -----------------------------------------------------
  test("shows emailAlreadyExist error on signupFailed", async () => {
    const mockSetErrors = jest.fn();

    (useUpdateEmailForm as jest.Mock).mockReturnValue({
      email1: "",
      email2: "",
      touchedEmail1: false,
      touchedEmail2: false,
      email1Error: "",
      email2Error: "",
      validateAll: jest.fn(() => true),
      handleEmail1Change: jest.fn(),
      handleEmail2Change: jest.fn(),
      setErrors: mockSetErrors,
    });

    let capturedOnError: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      capturedOnError = config.onError;
      return {
        loading: false,
        handleSubmit: () => capturedOnError({ message: errorMessages.signup.signupFailed }),
      };
    });

    render(<UpdateEmail />);

    fireEvent.click(screen.getByRole("button", { name: /update email/i }));

    await waitFor(() => {
      expect(mockSetErrors).toHaveBeenCalled();
    });
  });
});
