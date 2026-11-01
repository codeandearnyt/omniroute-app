import { motion } from "framer-motion";
import { useEffect } from "react";

type ShimmerProps = {
  className?: string;
  speed?: number;
};

export const Shimmer: React.FC<ShimmerProps> = ({
  className,
  speed = 2000,
}) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      whileHover={{ scale: 1.02 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          left: "-100%",
          animation: `shimmer ${speed}s linear infinite`,
        }}
      >
        {/* Content will be placed here */}
      </motion.span>
    </motion.div>
  );
};