// src/app/progress/page.tsx
import Timeline from '@/components/Timeline';
import ProgressBar from '@/components/ProgressBar';
import Card from '@/components/Card';

export default function ProgressPage() {
  // Datos de ejemplo para las fases del proyecto
  const projectPhases = [
    { name: 'Fase 1: Investigación y Planificación', progress: 100 },
    { name: 'Fase 2: Desarrollo del Backend y IA', progress: 75 },
    { name: 'Fase 3: Desarrollo del Frontend', progress: 50 },
    { name: 'Fase 4: Integración y Pruebas', progress: 25 },
    { name: 'Fase 5: Documentación y Despliegue', progress: 10 },
  ];

  // Datos de ejemplo para los hitos del timeline
  const timelineEvents = [
    { date: 'Mes 1', title: 'Inicio del Proyecto', description: 'Definición de objetivos, alcance y tecnologías. Creación del repositorio y estructura inicial.' },
    { date: 'Mes 2', title: 'Modelo de IA v1', description: 'Primer prototipo del modelo de detección de jugadores y balón. Pruebas iniciales con vídeos de muestra.' },
    { date: 'Mes 3', title: 'API Backend', description: 'Desarrollo de la API REST para la gestión de vídeos y resultados de análisis.' },
    { date: 'Próximamente', title: 'Interfaz de Usuario', description: 'Creación de la web de seguimiento y la interfaz para subir vídeos.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Progreso del Proyecto</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Avance por Fases</h2>
        <Card title="Estado General">
          <div className="space-y-4">
            {projectPhases.map((phase, index) => (
              <div key={index}>
                <p className="font-semibold mb-2">{phase.name}</p>
                <ProgressBar progress={phase.progress} />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Hitos del Proyecto</h2>
        <Timeline events={timelineEvents} />
      </section>
    </div>
  );
}
