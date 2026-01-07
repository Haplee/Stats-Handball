"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const HeroAnimated = () => {
  return (
    <motion.section
      className="text-center py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl font-bold mb-4" variants={itemVariants}>
        Análisis de Partidos de Balonmano con Inteligencia Artificial
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300 mb-8"
        variants={itemVariants}
      >
        Un proyecto de Fin de Grado de ASIR para automatizar la extracción de estadísticas y mapas de calor en partidos de balonmano.
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link href="/progress">
          <motion.span
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg inline-block"
            whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }} // Equivalent to hover:bg-blue-600
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Ver Progreso del Proyecto
          </motion.span>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default HeroAnimated;
