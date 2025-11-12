import { renderHook, act } from "@testing-library/react";
import { useSignupForm } from "./useSignupForm";

describe("useSignupForm", () => {
  it("validates empty fields correctly", () => {
    const { result } = renderHook(() => useSignupForm());

    act(() => {
      result.current.handleNameChange("");
      result.current.handleEmailChange("");
      result.current.handlePasswordChange("");
    });

    expect(result.current.fullNameError).toBe("Enter your full name.");
    expect(result.current.emailError).toBe("Enter your email address.");
    expect(result.current.passwordErrors).toEqual(["Enter your password."]);
  });
});
