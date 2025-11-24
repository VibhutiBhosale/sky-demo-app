/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { useRouter } from "next/navigation";
import { restRequest } from "@/lib/apiClient";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { errorMessages, route } from "@/constants";

// ------------------------
// 🔧 Mock dependencies
// ------------------------
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/apiClient", () => ({
  restRequest: jest.fn(),
}));

jest.mock("@/hooks/useFormSubmit", () => ({
  useFormSubmit: jest.fn(),
}));

describe("LoginPage Component", () => {
  let mockPush: jest.Mock;
  let mockHandleSubmit: unknown;
  let mockSetErrors: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    mockSetErrors = jest.fn();
    mockHandleSubmit = jest.fn();

    (useFormSubmit as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      errors: {},
      setErrors: mockSetErrors,
      loading: false,
    });
  });

  // ----------------------------------------
  // 1️⃣ Renders the form
  // ----------------------------------------
  test("renders input and button", () => {
    render(<LoginPage />);

    expect(screen.getByTestId("identifier-input")).toBeInTheDocument();
    expect(screen.getByTestId("identifier-submit")).toBeInTheDocument();
  });

  // ----------------------------------------
  // 2️⃣ Shows validation error when submitting empty
  // ----------------------------------------
  test("shows validation error when identifier is empty", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByTestId("identifier-submit"));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    // Simulate validate failing inside useFormSubmit
    mockHandleSubmit.mock.calls[0][1].validate = () => ({
      email: errorMessages.login.requiredField,
    });

    // Force component re-render with error state
    (useFormSubmit as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      errors: { email: errorMessages.login.requiredField },
      setErrors: mockSetErrors,
      loading: false,
    });

    render(<LoginPage />);

    expect(screen.getByText(errorMessages.login.requiredField)).toBeInTheDocument();
  });

  // ----------------------------------------
  // 3️⃣ Clears the error when typing
  // ----------------------------------------
  test("clears error when user starts typing", () => {
    (useFormSubmit as jest.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      errors: { email: "Some error" },
      setErrors: mockSetErrors,
      loading: false,
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByTestId("identifier-input"), {
      target: { value: "abc" },
    });

    expect(mockSetErrors).toHaveBeenCalledWith({});
  });

  // ----------------------------------------
  // 4️⃣ Successful API response -> redirects
  // ----------------------------------------
  test("redirects to password page when API returns success", async () => {
    const mockResponse = { success: true };
    (restRequest as jest.Mock).mockResolvedValue(mockResponse);

    // Override hook to capture onSuccess
    let onSuccessCallback: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      onSuccessCallback = config.onSuccess;
      return {
        handleSubmit: (e: any, data: any) => {
          e.preventDefault();
          return onSuccessCallback(mockResponse);
        },
        errors: {},
        setErrors: mockSetErrors,
        loading: false,
      };
    });

    render(<LoginPage />);

    fireEvent.submit(screen.getByTestId("identifier-submit").closest("form")!);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(route.enterPassword);
    });
  });

  // ----------------------------------------
  // 5️⃣ API returns error -> show error message
  // ----------------------------------------
  test("shows identifier error when API returns failure", async () => {
    const mockResponse = {
      success: false,
      message: "Invalid user",
    };

    (restRequest as jest.Mock).mockResolvedValue(mockResponse);

    let onSuccessCallback: any;
    (useFormSubmit as jest.Mock).mockImplementation(config => {
      onSuccessCallback = config.onSuccess;
      return {
        handleSubmit: (e: any) => {
          e.preventDefault();
          return onSuccessCallback(mockResponse);
        },
        errors: { email: "Invalid user" },
        setErrors: mockSetErrors,
        loading: false,
      };
    });

    render(<LoginPage />);

    fireEvent.click(screen.getByTestId("identifier-submit"));

    expect(mockSetErrors).toHaveBeenCalledWith({ email: "Invalid user" });
  });

  // ----------------------------------------
  // 6️⃣ API throws error -> onError is called
  // ----------------------------------------
  test("shows general API error when request fails", async () => {
    (restRequest as jest.Mock).mockRejectedValue(new Error("Network error"));

    let onErrorCallback: any;

    (useFormSubmit as jest.Mock).mockImplementation(config => {
      onErrorCallback = config.onError;
      return {
        handleSubmit: (e: any) => {
          e.preventDefault();
          return onErrorCallback();
        },
        errors: { email: errorMessages.login.apiError },
        setErrors: mockSetErrors,
        loading: false,
      };
    });

    render(<LoginPage />);

    fireEvent.click(screen.getByTestId("identifier-submit"));

    expect(mockSetErrors).toHaveBeenCalledWith({
      email: errorMessages.login.apiError,
    });
  });
});
