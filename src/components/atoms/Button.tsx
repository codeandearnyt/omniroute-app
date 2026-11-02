"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonVariants = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

interface ButtonProps {
  variant?: ButtonVariants;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled,
  loading,
  children,
  onClick,
  className,
}) => {
  const sizeStyles = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
    xl: "h-14 px-8 text-xl",
    icon: "h-10 w-10 p-0 flex items-center justify-center",
  };

  const variantStyles = {
    primary: "bg-[#E54D5E] hover:bg-[#C93D4E] text-white shadow-[0_0_20px_rgba(229,77,94,0.5)]",
    secondary: "bg-[#2D333B] hover:bg-[#1A1D24] text-white",
    ghost: "hover:bg-[#F1F5F9] hover:text-[#0F172A]",
    outline: "border border-[#2D333B] hover:bg-[#F1F5F9] text-[#2D333B]",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    sizeStyles[size],
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path className="opacity-75" fill="none" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
