import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          Análisis de Partidos de Balonmano con Inteligencia Artificial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Un proyecto de Fin de Grado de ASIR para automatizar la extracción de estadísticas y mapas de calor en partidos de balonmano.
        </p>
        <Link href="/progress">
          <span className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Ver Progreso del Proyecto
          </span>
        </Link>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Tecnologías Utilizadas</h2>
        <div className="flex justify-center flex-wrap gap-8 text-center">
          <div className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Next.js</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Frontend</p>
          </div>
          <div className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Tailwind CSS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Diseño UI</p>
          </div>
          <div className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Python</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Backend & IA</p>
          </div>
          <div className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">OpenCV</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visión Artificial</p>
          </div>
          <div className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Docker</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Contenedores</p>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Captura del Sistema</h2>
        <div className="bg-gray-200 dark:bg-gray-700 w-full max-w-4xl mx-auto h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">[Aquí irá una captura de pantalla del sistema en funcionamiento]</p>
        </div>
      </section>
    </div>
  );
}
