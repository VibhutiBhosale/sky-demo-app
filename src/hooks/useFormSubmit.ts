import { useState } from "react";

interface FormSubmitOptions<TValues, TResponse> {
  validate?: (values: TValues) => boolean | Record<string, string>;
  request: (values: TValues) => Promise<TResponse>;
  onSuccess?: (response: TResponse) => void;
  onError?: (error: Error) => void;
}

export function useFormSubmit<TValues extends object, TResponse>({
  validate,
  request,
  onSuccess,
  onError,
}: FormSubmitOptions<TValues, TResponse>) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent, values: TValues): Promise<void> => {
    e.preventDefault();
    setErrors({});

    if (validate) {
      const result = validate(values);
      if (typeof result === "boolean" && !result) {
        setErrors({ general: "Form validation failed" });
        return;
      }
      if (typeof result === "object" && Object.keys(result).length > 0) {
        setErrors(result);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await request(values);
      onSuccess?.(response);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Something went wrong");
      setErrors({ general: error.message });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, errors, setErrors, loading };
}
