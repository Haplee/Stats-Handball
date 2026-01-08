import AnimatedSection from "@/components/AnimatedSection";
import MotionCard from "@/components/MotionCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema - Handball Stats",
  description: "Exploración detallada de la arquitectura de microservicios, el flujo de datos y las tecnologías del proyecto.",
};

const technologies = [
  { name: "Next.js", category: "Frontend" },
  { name: "React & TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Estilos UI" },
  { name: "Python & Flask", category: "Backend API" },
  { name: "Celery & Redis", category: "Procesamiento Asíncrono" },
  { name: "OpenCV", category: "Visión Artificial" },
  { name: "PostgreSQL", category: "Base de Datos" },
  { name: "Docker", category: "Contenedores" },
  { name: "Nginx", category: "Proxy Inverso" },
];

export default function SystemPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-center mb-12">Arquitectura del Sistema</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <h2 className="text-3xl font-bold mb-8 text-center">Flujo de Datos y Arquitectura</h2>
        <MotionCard className="bg-gray-800 p-8 rounded-lg mb-16">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-400">
              El sistema se basa en una arquitectura de **microservicios orquestada con Docker Compose**. Esta estructura desacopla los componentes clave, permitiendo escalabilidad y mantenibilidad.
            </p>
          </div>
          <div className="bg-gray-900 w-full max-w-4xl mx-auto h-96 rounded-lg flex items-center justify-center p-4">
            <p className="text-gray-400 text-center">[Diagrama de Arquitectura: Usuario → Nginx → (Frontend / Backend) → Celery → Base de Datos]</p>
          </div>
          <p className="mt-6 text-center text-gray-400">
            El flujo comienza cuando un usuario sube un vídeo. Nginx redirige la petición al backend, que la encola en Redis. Un worker de Celery consume la tarea, procesa el vídeo con OpenCV y almacena los resultados en PostgreSQL.
          </p>
        </MotionCard>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <h2 className="text-3xl font-bold mb-8 text-center">Componentes y Servicios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MotionCard className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Frontend (Next.js)</h3>
            <p>Interfaz de usuario reactiva y optimizada para SEO. Permite la visualización de datos y la carga de vídeos. Se comunica con el backend a través de una API REST.</p>
          </MotionCard>
          <MotionCard className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Backend (API Flask)</h3>
            <p>Núcleo de la lógica de negocio. Gestiona la autenticación, el almacenamiento de metadatos de vídeo y la comunicación con la cola de tareas.</p>
          </MotionCard>
          <MotionCard className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Worker (Celery & OpenCV)</h3>
            <p>Servicio asíncrono que ejecuta las tareas más pesadas: el análisis de vídeo. Utiliza OpenCV para la detección de jugadores y la generación de estadísticas.</p>
          </MotionCard>
          <MotionCard className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Nginx</h3>
            <p>Actúa como proxy inverso y punto de entrada único al sistema. Balancea la carga y sirve los ficheros estáticos del frontend.</p>
          </MotionCard>
          <MotionCard className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Base de Datos (PostgreSQL)</h3>
            <p>Almacena de forma persistente todos los datos relacionales: usuarios, información de los partidos y resultados del análisis.</p>
          </MotionCard>
          <MotionCard className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Cola de Tareas (Redis)</h3>
            <p>Broker de mensajes que desacopla el backend del worker. Permite que las tareas de análisis se procesen en segundo plano sin bloquear la API.</p>
          </MotionCard>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <h2 className="text-3xl font-bold my-8 text-center">Stack Tecnológico</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {technologies.map((tech) => (
            <div key={tech.name} className="bg-gray-800 rounded-full px-4 py-2">
              <span className="font-semibold">{tech.name}</span>
              <span className="text-sm text-gray-400 ml-2">({tech.category})</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
