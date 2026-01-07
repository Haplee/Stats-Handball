// src/app/blog/page.tsx
import BlogPost from '@/components/BlogPost';

export default function BlogPage() {
  // Datos de ejemplo para las entradas del blog.
  // En una aplicación real, esto vendría de archivos Markdown o una API.
  const posts = [
    {
      title: 'Semana 1: Planificación y Setup Inicial',
      date: '2023-10-05',
      content: `
        <p>La primera semana del proyecto se ha centrado en la definición de los objetivos y la arquitectura del sistema. Hemos decidido usar una arquitectura de microservicios con Docker para aislar los componentes.</p>
        <p>El stack tecnológico elegido es Next.js para el frontend y Python (Flask) para el backend, con Celery para el procesamiento asíncrono de vídeo. Esto nos da la flexibilidad para escalar y mantener el sistema a largo plazo.</p>
        <h3 class="font-bold mt-4">Decisiones clave:</h3>
        <ul class="list-disc list-inside ml-4">
          <li>Uso de Next.js con App Router.</li>
          <li>Comunicación entre servicios a través de una API REST.</li>
          <li>Uso de PostgreSQL como base de datos por su robustez.</li>
        </ul>
      `
    },
    {
      title: 'Semana 2: Primer Prototipo del Modelo de IA',
      date: '2023-10-12',
      content: `
        <p>Durante esta semana, hemos trabajado en el corazón del proyecto: el modelo de inteligencia artificial. Usando OpenCV y Python, hemos desarrollado un primer prototipo capaz de detectar jugadores en un vídeo de un partido de balonmano.</p>
        <p>Los resultados son prometedores, aunque todavía hay que mejorar la precisión y el seguimiento de los jugadores a lo largo de diferentes tomas y ángulos de cámara.</p>
        <h3 class="font-bold mt-4">Próximos pasos:</h3>
        <ul class="list-disc list-inside ml-4">
          <li>Mejorar el modelo para la detección del balón.</li>
          <li>Implementar un sistema de tracking para seguir a los jugadores.</li>
          <li>Optimizar el rendimiento del análisis de vídeo.</li>
        </ul>
      `
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Diario de Desarrollo</h1>
      <div className="max-w-3xl mx-auto space-y-12">
        {posts.map((post, index) => (
          <BlogPost key={index} title={post.title} date={post.date} content={post.content} />
        ))}
      </div>
    </div>
  );
}
