"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type StatusVariant = "free" | "oauth" | "api-key" | "error" | "warning" | "default";

interface StatusChipProps {
  variant?: StatusVariant;
  children: ReactNode;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  variant = "default",
  children,
  className,
}) => {
  const variantStyles = {
    free: "bg-green-100 text-green-800",
    oauth: "bg-purple-100 text-purple-800",
    "api-key": "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-amber-100 text-amber-800",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "tangent", duration: 0.3 }}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium",
        "gap-1.5",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
};