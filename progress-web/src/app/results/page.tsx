// src/app/results/page.tsx
import Card from '@/components/Card';

export default function ResultsPage() {
  // Datos de ejemplo para los vídeos analizados
  const analyzedVideos = [
    { name: 'Partido A vs. Partido B - Final de Liga', status: 'Completado' },
    { name: 'Partido C vs. Partido D - Semifinal', status: 'Completado' },
    { name: 'Partido E vs. Partido F - Amistoso', status: 'En progreso' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Resultados y Métricas</h1>

      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-16">
        Esta sección mostrará los resultados visuales y cuantitativos de los análisis de vídeo.
        Actualmente, es un marcador de posición para futuras implementaciones.
      </p>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Vídeos Analizados</h2>
        <Card title="Lista de Partidos">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {analyzedVideos.map((video, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <span>{video.name}</span>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  video.status === 'Completado'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {video.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Métricas y Visualizaciones</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Mapa de Calor de Tiros (Heatmap)">
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">[Placeholder para Heatmap]</p>
            </div>
          </Card>
          <Card title="Estadísticas de Posesión">
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">[Placeholder para Gráfico de Estadísticas]</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
