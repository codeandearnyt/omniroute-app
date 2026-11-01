"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FlowAnimationProps = {
  children: ReactNode;
};

export const FlowAnimation: React.FC<FlowAnimationProps> = ({
  children,
}) => {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};