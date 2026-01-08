"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({
  children,
  delay = 0,
  className = "",
}: AnimatedSectionProps) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
