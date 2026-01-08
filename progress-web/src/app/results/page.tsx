
import AnimatedSection from "@/components/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resultados - Handball Stats",
  description: "Visualiza los resultados de los análisis de partidos de balonmano.",
};

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-center mb-12">Resultados</h1>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <div className="text-center">
          <p className="text-lg text-gray-400">
            Próximamente...
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
