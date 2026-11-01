import { useEffect, useRef, useState } from "react";

type Breakpoints = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpointSizes: Record<Breakpoints, number> = {
  xxs: 320,
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useResize() {
  const [breakpoint, setBreakpoint] = useState<Breakpoints>("md");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      let newBreakpoint: Breakpoints = "md";
      
      if (width <= breakpointSizes.xxs) {
        newBreakpoint = "xxs";
      } else if (width <= breakpointSizes.xs) {
        newBreakpoint = "xs";
      } else if (width <= breakpointSizes.sm) {
        newBreakpoint = "sm";
      } else if (width <= breakpointSizes.md) {
        newBreakpoint = "md";
      } else if (width <= breakpointSizes.lg) {
        newBreakpoint = "lg";
      } else if (width <= breakpointSizes.xl) {
        newBreakpoint = "xl";
      } else {
        newBreakpoint = "2xl";
      }
      
      setBreakpoint(newBreakpoint);
    };

    // Initial check
    handleResize();
    
    // Event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return { breakpoint, breakpointSize: breakpointSizes[breakpoint] };
}

/**
 * Hook to check if currently on mobile
 */
export function useIsMobile() {
  const { breakpoint } = useResize();
  return breakpoint <= "md";
}

/**
 * Hook to check if currently on tablet
 */
export function useIsTablet() {
  const { breakpoint } = useResize();
  return breakpoint >= "sm" && breakpoint <= "lg";
}

/**
 * Hook to check if currently on desktop
 */
export function useIsDesktop() {
  const { breakpoint } = useResize();
  return breakpoint >= "xl";
}

/**
 * Responsive grid columns
 */
export function useResponsiveColumns(
  cols: number | ((breakpoint: Breakpoints) => number),
  breakpoint: Breakpoints = "md"
) {
  const { breakpoint: currentBreakpoint } = useResize();
  
  if (typeof cols === "function") {
    return cols(currentBreakpoint);
  }
  
  // Default mapping
  const columnMap: Record<Breakpoints, number> = {
    xxs: 1,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6,
  };
  
  return columnMap[currentBreakpoint] || cols;
}

/**
 * Text size based on breakpoint
 */
export function useResponsiveFontSize(
  sizes: {
    xxs?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  }
) {
  const { breakpoint } = useResize();
  
  const sizeMap: Record<Breakpoints, keyof typeof sizes> = {
    xxs: "xxs",
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  };
  
  const key = sizeMap[breakpoint] || "md";
  return sizes[key] || sizes.md;
}