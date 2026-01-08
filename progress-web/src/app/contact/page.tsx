"use client";

import AnimatedSection from "@/components/AnimatedSection";
import SocialLinks from "@/components/SocialLinks";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-center mb-4">Contacto</h1>
        <p className="text-lg text-gray-400 text-center mb-12">
          Conecta conmigo a través de mis redes sociales.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <SocialLinks />
      </AnimatedSection>
    </div>
  );
}
