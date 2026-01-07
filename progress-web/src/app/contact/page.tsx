import AnimatedSection from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - TFG Análisis de Balonmano con IA",
  description: "Contacta y sigue el progreso del proyecto a través de las redes sociales.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <AnimatedSection>
        <h1 className="mb-4 text-4xl font-bold text-center">Contacto</h1>
        <p className="mb-12 text-lg text-center text-gray-400">
          Puedes seguir el proyecto y contactarme en:
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="grid gap-6 max-w-3xl mx-auto px-6 md:grid-cols-3">
          {/* Web */}
          <a
            href="https://haplee.github.io/Portafolio-FranVi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 text-center transition rounded-2xl bg-white/5 border border-white/10 hover:scale-105 hover:bg-white/10"
          >
            🌐
            <h2 className="mt-2 text-xl font-semibold">Web personal</h2>
            <p className="mt-1 text-sm text-gray-400">Portfolio y proyectos</p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/franvidalmateo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 text-center transition rounded-2xl bg-white/5 border border-white/10 hover:scale-105 hover:bg-white/10"
          >
            📸
            <h2 className="mt-2 text-xl font-semibold">Instagram</h2>
            <p className="mt-1 text-sm text-gray-400">@franvidalmateo</p>
          </a>

          {/* Twitter / X */}
          <a
            href="https://twitter.com/FranVidalMateo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 text-center transition rounded-2xl bg-white/5 border border-white/10 hover:scale-105 hover:bg-white/10"
          >
            🐦
            <h2 className="mt-2 text-xl font-semibold">Twitter (X)</h2>
            <p className="mt-1 text-sm text-gray-400">@FranVidalMateo</p>
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
