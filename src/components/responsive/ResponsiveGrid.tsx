import { useRef } from "react";
import { useResponsiveColumns } from "./use-resize";

type ResponsiveGridProps = {
  children: React.ReactNode;
  baseColumns?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  className?: string;
};

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  baseColumns = 1,
  sm,
  md,
  lg,
  xl,
  className,
}) => {
  const breakpoint = useResize().breakpoint;
  
  const columns = useResponsiveColumns(
    (bp: any) => {
      if (bp === "sm" && sm !== undefined) return sm;
      if (bp === "md" && md !== undefined) return md;
      if (bp === "lg" && lg !== undefined) return lg;
      if (bp === "xl" && xl !== undefined) return xl;
      return baseColumns;
    },
    breakpoint
  );
  
  return (
    <div
      className={cn(
        "grid gap-4",
        {
          "grid-cols-1": baseColumns === 1,
          "grid-cols-2": baseColumns === 2,
          "grid-cols-3": baseColumns === 3,
          "grid-cols-4": baseColumns === 4,
        },
        className
      )}
    >
      {children}
    </div>
  );
};