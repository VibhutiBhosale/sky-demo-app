import React from "react";

interface TailwindTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  label: string;
  error?: boolean;
  helperText?: string;
  className?: string;
}

/**
 * Tailwind TextField that visually and behaviorally matches MUI's outlined variant.
 */
const TailwindTextField: React.FC<TailwindTextFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error = false,
  helperText = "",
  disabled = false,
  className = "",
  ...rest
}) => {
  const activeLabel = value !== "" && value !== undefined && value !== null && value !== " ";

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`relative rounded-md border transition-all duration-200 ${error ? "border-red-500" : "border-gray-400"} bg-white focus-within:border-2 focus-within:border-blue-600`}
      >
        {/* Input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          disabled={disabled}
          className={`peer block w-full border-none bg-transparent px-3 pt-5 pb-2 text-sm text-gray-900 outline-none focus:ring-0 disabled:cursor-not-allowed`}
          {...rest}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`absolute left-3 bg-white px-1 text-sm text-gray-500 transition-all duration-200 ${
            activeLabel ? "top-1 text-xs text-blue-600" : "top-1/2 -translate-y-1/2 text-gray-500"
          } peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600`}
        >
          {label}
        </label>
      </div>

      {/* Helper text */}
      {helperText && (
        <p className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}>{helperText}</p>
      )}
    </div>
  );
};

export default TailwindTextField;
