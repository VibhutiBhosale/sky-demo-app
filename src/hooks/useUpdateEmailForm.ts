"use client";
import { useState } from "react";

type UpdateEmailFields = {
  email1: string;
  email2: string;
};

type UpdateEmailErrors = {
  email1Error: string | null;
  email2Error: string | null;
};

export function useUpdateEmailForm() {
  const [values, setValues] = useState<UpdateEmailFields>({
    email1: "",
    email2: "",
  });

  const [errors, setErrors] = useState<UpdateEmailErrors>({
    email1Error: null,
    email2Error: null,
  });

  const [touched, setTouched] = useState({
    email1: false,
    email2: false,
  });

  const validateEmail = (v: string): string | null => {
    if (!v.trim()) return "Enter your new email address.";
    if (!/^\S+@\S+\.\S+$/.test(v)) return "Please enter a valid email address.";
    return null;
  };

  const validateMatch = (email1: string, email2: string): string | null => {
    if (!email2.trim()) return "Enter your new email address.";
    if (!/^\S+@\S+\.\S+$/.test(email2)) return "Please enter a valid email address.";
    if (email1 && email2 && email1 !== email2)
      return "The email addresses don't match. Please check and try again.";
    return null;
  };

  // 🔹 Inline handlers
  const handleEmail1Change = (v: string) => {
    setValues(prev => ({ ...prev, email1: v }));
    setTouched(prev => ({ ...prev, email1: true }));
    setErrors(prev => ({
      ...prev,
      email1Error: validateEmail(v),
    }));
  };

  const handleEmail2Change = (v: string) => {
    setValues(prev => ({ ...prev, email2: v }));
    setTouched(prev => ({ ...prev, email2: true }));
    setErrors(prev => ({
      ...prev,
      email2Error: validateMatch(values.email1, v),
    }));
  };

  // 🔹 Validate entire form (on submit)
  const validateAll = () => {
    const email1Err = validateEmail(values.email1);
    const email2Err = validateMatch(values.email1, values.email2);

    setErrors({
      email1Error: email1Err,
      email2Error: email2Err,
    });

    setTouched({
      email1: true,
      email2: true,
    });

    return !(email1Err || email2Err);
  };

  return {
    ...values,
    ...errors,
    touchedEmail1: touched.email1,
    touchedEmail2: touched.email2,
    handleEmail1Change,
    handleEmail2Change,
    validateAll,
    setErrors,
  };
}
