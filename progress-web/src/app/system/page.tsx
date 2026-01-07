// src/app/system/page.tsx
import Card from '@/components/Card';

export default function SystemPage() {
  const technologies = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Flask', category: 'Backend' },
    { name: 'Celery', category: 'Backend' },
    { name: 'OpenCV', category: 'Inteligencia Artificial' },
    { name: 'PostgreSQL', category: 'Base de Datos' },
    { name: 'Redis', category: 'Message Broker' },
    { name: 'Docker', category: 'Infraestructura' },
    { name: 'Nginx', category: 'Infraestructura' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Arquitectura del Sistema</h1>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Diagrama de Arquitectura</h2>
        <Card title="Visión General">
          <div className="bg-gray-200 dark:bg-gray-700 w-full max-w-4xl mx-auto h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">[Aquí irá un diagrama de la arquitectura del sistema]</p>
          </div>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            El sistema sigue una arquitectura de microservicios orquestada con Docker Compose.
          </p>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Componentes y Servicios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="Frontend">
            <p>Aplicación web desarrollada con Next.js que sirve como interfaz para los usuarios y administradores.</p>
          </Card>
          <Card title="Backend (API)">
            <p>API RESTful construida con Flask (Python) que gestiona la lógica de negocio, los usuarios y los vídeos.</p>
          </Card>
          <Card title="Worker (IA)">
            <p>Servicio en segundo plano con Celery que procesa los vídeos utilizando modelos de OpenCV para el análisis de partidos.</p>
          </Card>
          <Card title="Nginx">
            <p>Proxy inverso que gestiona las peticiones entrantes y las dirige al servicio correspondiente (frontend o backend).</p>
          </Card>
          <Card title="Base de Datos">
            <p>PostgreSQL para almacenar la información de usuarios, vídeos, y los resultados de los análisis.</p>
          </Card>
          <Card title="Cola de Tareas">
            <p>Redis como message broker para gestionar las tareas de análisis de vídeo entre el backend y el worker.</p>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Stack Tecnológico</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
              <span className="font-semibold">{tech.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({tech.category})</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
