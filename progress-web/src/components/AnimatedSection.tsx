"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection = ({ children, className, delay = 0 }: AnimatedSectionProps) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
