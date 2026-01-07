"use client";

import AnimatedSection from '@/components/AnimatedSection';
import MotionCard from '@/components/MotionCard';
import Timeline from '@/components/Timeline';
import { motion } from 'framer-motion';

const projectPhases = [
  { name: 'Fase 1: Investigación y Planificación', progress: 100 },
  { name: 'Fase 2: Desarrollo del Backend y IA', progress: 75 },
  { name: 'Fase 3: Desarrollo del Frontend', progress: 50 },
  { name: 'Fase 4: Integración y Pruebas', progress: 25 },
  { name: 'Fase 5: Documentación y Despliegue', progress: 10 },
];

const timelineEvents = [
  { date: 'Mes 1', title: 'Inicio del Proyecto', description: 'Definición de objetivos, alcance y tecnologías. Creación del repositorio y estructura inicial.' },
  { date: 'Mes 2', title: 'Modelo de IA v1', description: 'Primer prototipo del modelo de detección de jugadores y balón. Pruebas iniciales con vídeos de muestra.' },
  { date: 'Mes 3', title: 'API Backend', description: 'Desarrollo de la API REST para la gestión de vídeos y resultados de análisis.' },
  { date: 'Próximamente', title: 'Interfaz de Usuario', description: 'Creación de la web de seguimiento y la interfaz para subir vídeos.' },
];

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-center mb-12">Progreso del Proyecto</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <h2 className="text-3xl font-bold mb-8 text-center">Avance por Fases</h2>
        <MotionCard className="bg-gray-800 p-6 rounded-lg">
            <div className="space-y-4">
              {projectPhases.map((phase, index) => (
                <div key={index}>
                  <p className="font-semibold mb-2">{phase.name}</p>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <motion.div
                      className="bg-blue-600 h-4 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${phase.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                </div>
              ))}
            </div>
        </MotionCard>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <h2 className="text-3xl font-bold my-8 text-center">Hitos del Proyecto</h2>
        <Timeline events={timelineEvents} />
      </AnimatedSection>
    </div>
  );
}
