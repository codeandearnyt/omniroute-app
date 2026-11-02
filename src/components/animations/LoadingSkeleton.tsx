import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

type SkeletonType = "button" | "input" | "card" | "avatar" | "line";

type LoadingSkeletonProps = {
  type: SkeletonType;
  className?: string;
  width?: string;
  height?: string;
  radius?: number | string;
};

const skeletonStyles: Record<
  SkeletonType,
  { width: string; height: string; borderRadius: string }
> = {
  button: {
    width: "100%",
    height: "2.5rem",
    borderRadius: "0.5rem",
  },
  input: {
    width: "100%",
    height: "1.5rem",
    borderRadius: "0.375rem",
  },
  card: {
    width: "100%",
    height: "1.5rem",
    borderRadius: "0.5rem",
  },
  avatar: {
    width: "3rem",
    height: "3rem",
    borderRadius: "9999px",
  },
  line: {
    width: "100%",
    height: "1rem",
    borderRadius: "0.25rem",
  },
};

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type,
  className,
  width,
  height,
  radius,
}) => {
  const base = skeletonStyles[type];
  const shimmerStyle: React.CSSProperties = {
    width: width ?? base.width,
    height: height ?? base.height,
    borderRadius: radius ?? base.borderRadius,
    background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
    backgroundSize: "468px 100%",
    animation: "shimmer 2s infinite",
  };

  return (
    <motion.div className={cn(className)} whileHover={{ opacity: 0.8 }}>
      <div className="relative block" style={shimmerStyle} />
    </motion.div>
  );
};
