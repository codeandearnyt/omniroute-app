import { motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/shared/utils/cn";

type BlobAnimationProps = {
  className?: string;
  delay?: number;
  duration?: number;
};

export const BlobAnimation: React.FC<BlobAnimationProps> = ({
  className,
  delay = 0,
  duration = 20000,
}) => {
  useEffect(() => {
    const element = document.querySelector(`.blob-animation[data-delay="${delay}"]`) as HTMLElement;
    if (element) {
      element.style.animationDuration = `${duration}ms`;
    }
  }, [delay, duration]);

  return (
    <motion.span
      className={cn("blob-animation relative inline-block", className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate="blob"
      style={{ animationDuration: `${duration}ms` }}
    />
  );
};
