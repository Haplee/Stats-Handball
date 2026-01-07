"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
}

const MotionCard = ({ children, className }: MotionCardProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
