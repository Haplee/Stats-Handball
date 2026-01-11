"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from 'next/dynamic'

const ParticlesBackground = dynamic(() => import('./ParticlesBackground'), { ssr: false })

const HeroSection = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <ParticlesBackground />
      <motion.div
        className="relative z-10 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Handball Stats
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Análisis de partidos de balonmano con Inteligencia Artificial.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/progress">
            <motion.span
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg inline-block"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Ver Proyecto
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
