import AnimatedSection from "@/components/AnimatedSection";
import HeroAnimated from "@/components/HeroAnimated";
import MotionCard from "@/components/MotionCard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroAnimated />

      <AnimatedSection>
        <h2 className="text-3xl font-bold text-center mb-8">Tecnologías Utilizadas</h2>
        <div className="flex justify-center flex-wrap gap-8 text-center">
          <MotionCard className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Next.js</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Frontend</p>
          </MotionCard>
          <MotionCard className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Tailwind CSS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Diseño UI</p>
          </MotionCard>
          <MotionCard className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Python</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Backend & IA</p>
          </MotionCard>
          <MotionCard className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">OpenCV</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visión Artificial</p>
          </MotionCard>
          <MotionCard className="w-40 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold">Docker</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Contenedores</p>
          </MotionCard>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Captura del Sistema</h2>
            <div className="bg-gray-200 dark:bg-gray-700 w-full max-w-4xl mx-auto h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">[Aquí irá una captura de pantalla del sistema en funcionamiento]</p>
            </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
