import AnimatedSection from "@/components/AnimatedSection";
import SocialLinks from "@/components/SocialLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - TFG Análisis de Balonmano con IA",
  description: "Contacta y sigue el progreso del proyecto a través de las redes sociales.",
};

const ContactPage = () => {
  return (
    <div className="py-12">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-center mb-4">Contacto</h1>
        <p className="text-lg text-center text-gray-400 mb-12">
          Puedes seguir el proyecto y contactarme en:
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <SocialLinks />
      </AnimatedSection>
    </div>
  );
};

export default ContactPage;
