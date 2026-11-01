import { motion } from "framer-motion";
import { useEffect } from "react";

type PulseAnimationProps = {
  className?: string;
  pulseColor?: string;
  delay?: number;
};

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  className,
  pulseColor = "#E54D5E",
  delay = 0,
}) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse-${delay} {
        0% { box-shadow: 0 0 0 0 ${pulseColor} };
        70% { box-shadow: 0 0 10px 5px ${pulseColor} };
        100% { box-shadow: 0 0 0 0 ${pulseColor} };
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [pulseColor, delay]);

  return (
    <motion.span
      className={cn(
        "relative inline-block",
        className
      )}
      animate={{
        opacity: [0.5, 1],
        scale: [0.95, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "ease-in-out",
        delay,
      }}
    />
  );
};