import AnimatedSection from "@/components/AnimatedSection";
import MotionCard from "@/components/MotionCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El TFG - TFG Análisis de Balonmano con IA",
  description: "Documentación académica y técnica del Trabajo de Fin de Grado.",
};


export default function TfgPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-center mb-12">Documentación del TFG</h1>
      </AnimatedSection>

      <div className="max-w-3xl mx-auto">
        <AnimatedSection delay={0.2}>
          <MotionCard className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Sobre el Proyecto</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Este proyecto constituye el Trabajo de Fin de Grado (TFG) para el ciclo de **Administración de Sistemas Informáticos en Red (ASIR)**. Su propósito es aplicar los conocimientos en sistemas, redes y desarrollo para crear una solución tecnológica completa y funcional.
              </p>
              <p>
                El núcleo del TFG es el diseño e implementación de un sistema de **análisis de vídeo deportivo mediante Inteligencia Artificial**. El sistema automatiza la extracción de estadísticas y mapas de calor de partidos de balonmano, ofreciendo una herramienta innovadora para el análisis táctico.
              </p>
              <h3 className="font-bold text-lg mt-6">Decisiones Técnicas Clave:</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  **Arquitectura de Microservicios:** Elegida por su flexibilidad, escalabilidad y por facilitar el despliegue independiente de los componentes (frontend, backend, worker).
                </li>
                <li>
                  **Procesamiento Asíncrono:** La API delega el análisis de vídeo (una tarea pesada) a un worker de Celery. Esto asegura que la interfaz de usuario permanezca ágil y responsiva.
                </li>
                <li>
                  **Despliegue Híbrido:** Se utiliza Vercel para el frontend de Next.js por su integración con GitHub y su optimización para la entrega de contenido estático, mientras que los servicios de backend se despliegan en un entorno de contenedores.
                </li>
              </ul>
            </div>
          </MotionCard>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <MotionCard className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Memoria del TFG</h3>
              <p className="mb-4 text-gray-400">
                Accede a la documentación técnica completa, donde se detallan la planificación, el diseño y las conclusiones del proyecto.
              </p>
              <a
                href="#" // Enlace deshabilitado
                className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors cursor-not-allowed opacity-50"
              >
                Próximamente
              </a>
            </MotionCard>
            <MotionCard className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Repositorio de Código</h3>
              <p className="mb-4 text-gray-400">
                Explora el código fuente del proyecto, incluyendo backend, frontend y la configuración de Docker.
              </p>
              <a
                href="https://github.com/Haplee/TFG-ASIR" // Enlace al repositorio
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Ver en GitHub
              </a>
            </MotionCard>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
