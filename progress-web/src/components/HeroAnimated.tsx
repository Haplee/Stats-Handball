"use client";

import { motion } from "framer-motion";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroAnimated() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <motion.div
        className="z-10 max-w-4xl px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl"
          variants={itemVariants}
        >
          Análisis de Partidos de Balonmano con Inteligencia Artificial
        </motion.h1>

        <motion.p
          className="mb-8 text-lg text-slate-300 md:text-xl"
          variants={itemVariants}
        >
          Web de seguimiento del TFG de ASIR centrado en análisis automático del
          rendimiento deportivo mediante visión artificial.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <a
            href="/progress"
            className="px-6 py-3 text-sm font-semibold text-white transition rounded-xl bg-indigo-600 hover:bg-indigo-500"
          >
            Ver progreso
          </a>
          <a
            href="/contact"
            className="px-6 py-3 text-sm font-semibold text-white transition border rounded-xl border-white/20 hover:bg-white/10"
          >
            Contacto
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
    </section>
  );
}
