// src/app/tfg/page.tsx
import Card from '@/components/Card';

export default function TfgPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Documentación del TFG</h1>

      <div className="max-w-3xl mx-auto">
        <Card title="Sobre el Proyecto">
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Este proyecto se ha desarrollado como parte del Trabajo de Fin de Grado (TFG) del ciclo formativo de Grado Superior en Administración de Sistemas Informáticos en Red (ASIR).
            </p>
            <p>
              El objetivo principal es diseñar, implementar y desplegar un sistema basado en inteligencia artificial capaz de analizar partidos de balonmano a partir de grabaciones de vídeo. El sistema extrae automáticamente estadísticas, posiciones de jugadores y genera mapas de calor, proporcionando herramientas valiosas para entrenadores y analistas deportivos.
            </p>
            <h3 className="font-bold text-lg mt-6">Objetivos Clave:</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Automatizar el análisis de partidos de balonmano.</li>
              <li>Proporcionar una interfaz web para la gestión y visualización de datos.</li>
              <li>Utilizar una arquitectura de microservicios escalable y robusta.</li>
              <li>Desplegar el sistema en un entorno cloud (Vercel) para su accesibilidad.</li>
            </ul>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card title="Memoria del TFG">
            <p className="mb-4">
              Accede a la documentación completa del proyecto, donde se detallan la planificación, el diseño, la implementación y las conclusiones.
            </p>
            <a
              href="/ruta/a/tu/memoria.pdf" // Cambiar por el enlace real al PDF
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Descargar Memoria (PDF)
            </a>
          </Card>
          <Card title="Repositorio de Código">
            <p className="mb-4">
              Explora el código fuente completo del proyecto, incluyendo el backend, el frontend y los scripts de configuración.
            </p>
            <a
              href="https://github.com/your-username/your-repo" // Cambiar por el enlace real al repositorio
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Ver en GitHub
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
