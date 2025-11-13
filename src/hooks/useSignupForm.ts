"use client";
import { useState } from "react";

type SignupFormFields = {
  name: string;
  email: string;
  password: string;
};

type SignupFormErrors = {
  fullNameError: string | null;
  emailError: string | null;
  passwordErrors: string[] | null;
};

export function useSignupForm() {
  const [values, setValues] = useState<SignupFormFields>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupFormErrors>({
    fullNameError: null,
    emailError: null,
    passwordErrors: null,
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  // ✅ Field-level validation
  const validateFullName = (value: string): string | null => {
    if (!value.trim()) return "Enter your full name.";
    if (value.trim().length < 4) return "The full name must be longer than 3 characters.";
    if (!value.includes(" ")) return "Please provide your first and last name.";
    if (/[^a-zA-Z\s]/.test(value)) return "No special characters please.";
    return null;
  };

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) return "Enter your email address.";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Please enter a valid email address.";
    return null;
  };

  const validatePassword = (value: string): string[] | null => {
    if (!value.trim()) return ["Enter your password."];
    if (value.length < 8) return ["Your password should be at least 8 characters long."];
    if (!/[a-z]/.test(value)) return ["Your password should contain a lowercase letter."];
    if (!/[A-Z]/.test(value)) return ["Your password should contain an uppercase letter."];
    if (!/\d/.test(value)) return ["Your password should contain a number."];
    return null;
  };

  // ✅ Validate all fields at once (for onSubmit)
  const validateAll = (): boolean => {
    const nameErr = validateFullName(values.name);
    const emailErr = validateEmail(values.email);
    const passErr = validatePassword(values.password);

    setErrors({
      fullNameError: nameErr,
      emailError: emailErr,
      passwordErrors: passErr,
    });

    setTouched({
      fullName: true,
      email: true,
      password: true,
    });

    return !(nameErr || emailErr || passErr);
  };

  // ✅ Inline field validation handlers
  const handleNameChange = (value: string) => {
    setValues(prev => ({ ...prev, name: value }));
    setTouched(prev => ({ ...prev, fullName: true }));
    setErrors(prev => ({
      ...prev,
      fullNameError: validateFullName(value),
    }));
  };

  const handleEmailChange = (value: string) => {
    setValues(prev => ({ ...prev, email: value }));
    setTouched(prev => ({ ...prev, email: true }));
    setErrors(prev => ({
      ...prev,
      emailError: validateEmail(value),
    }));
  };

  const handlePasswordChange = (value: string) => {
    setValues(prev => ({ ...prev, password: value }));
    setTouched(prev => ({ ...prev, password: true }));
    setErrors(prev => ({
      ...prev,
      passwordErrors: validatePassword(value),
    }));
  };

  return {
    // 🧩 Values
    ...values,
    // 🧩 Errors
    ...errors,
    // 🧩 Touched flags
    touchedFullName: touched.fullName,
    touchedEmail: touched.email,
    touchedPassword: touched.password,
    // 🧩 Handlers
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    // 🧩 Validation
    validateAll,
    // 🧩 Allow parent to set errors (for inline server-side validation)
    setErrors,
  };
}
