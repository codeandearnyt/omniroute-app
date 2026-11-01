"use client";

import { ReactNode } from "react";

type IconSize = "sm" | "md" | "lg" | "xl";

interface IconProps {
  size?: IconSize;
  className?: string;
  children: ReactNode;
}

export const Icon: React.FC<IconProps> = ({
  size = "md",
  className,
  children,
}) => {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };

  return (
    <span className={cn(sizeMap[size], className)}>
      {children}
    </span>
  );
};