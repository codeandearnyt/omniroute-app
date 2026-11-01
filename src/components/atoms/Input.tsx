"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  required,
  className,
  label,
  error,
}) => {
  const inputClasses = cn(
    "block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
    disabled && "disabled:bg-muted/50 disabled:cursor-not-allowed",
    className
  );

  const labelClasses = cn(
    "block text-sm text-muted-foreground mb-1",
    error && "text-error"
  );

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor="input" className={labelClasses}>
          {label}
        </label>
      )}
      <input
        id="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={inputClasses}
        autoComplete="off"
      />
      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
};