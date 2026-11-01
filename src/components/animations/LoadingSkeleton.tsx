import { motion } from "framer-motion";
import { css } from "styled-components";

type SkeletonType = "button" | "input" | "card" | "avatar" | "line";

type LoadingSkeletonProps = {
  type: SkeletonType;
  className?: string;
  width?: string;
  height?: string;
  radius?: number;
};

const skeletonStyles = {
  button: {
    width: "full",
    height: "2.5rem",
    borderRadius: "0.5rem",
  },
  input: {
    width: "full",
    height: "1.5rem",
    borderRadius: "0.375rem",
  },
  card: {
    width: "full",
    height: "1.5rem",
    borderRadius: "0.5rem",
  },
  avatar: {
    width: "3rem",
    height: "3rem",
    borderRadius: "full",
  },
  line: {
    width: "full",
    height: "1rem",
    borderRadius: "0.25rem",
  },
};

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type,
  className,
  width = "100%",
  height = "1rem",
  radius = "0.375rem",
}) => {
  const skeletonStyle = css`
    @keyframes shimmer {
      0% {
        background-position: -468px 0;
      }
      100% {
        background-position: 468px 0;
      }
    }

    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e8e8e8 50%,
      #f0f0f0 75%
    );
    background-size: 468px 100%;
    animation: shimmer 2s infinite;
    border-radius: ${radius};
  `;

  return (
    <motion.div
      className={cn(className, "animate-bounce")}
      whileHover={{ opacity: 0.8 }}
    >
      <div
        className="relative block"
        style={{
          width: width,
          height: height,
          background: "var(--background)",
          ...skeletonStyle,
        }}
      />
    </motion.div>
  );
};