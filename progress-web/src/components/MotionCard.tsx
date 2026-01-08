"use client";

import { motion } from "framer-motion";

const MotionCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
