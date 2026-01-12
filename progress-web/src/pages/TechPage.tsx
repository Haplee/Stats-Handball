import { Terminal, Github } from 'lucide-react';

function TechBadge({ name }: { name: string }) {
    return (
        <div className="px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/5 md:border-white/10 text-center text-sm font-medium text-gray-300 hover:text-white hover:border-blue-500/30 hover:bg-white/5 transition-all cursor-default shadow-sm">
            {name}
        </div>
    );
}

export default function TechPage() {
    return (
        <section className="container mx-auto max-w-4xl pt-32 pb-20 px-6 min-h-screen">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Terminal size={24} className="text-blue-500" />
                        Stack Tecnológico
                    </h3>
                    <a href="https://github.com/Haplee" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                        <Github size={16} />
                        Ver Repositorio
                    </a>
                </div>

                <p className="text-gray-400 mb-8 border-b border-white/5 pb-8">
                    Utilizamos herramientas de última generación para garantizar rendimiento, escalabilidad y precisión en el análisis de video.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechBadge name="React 18" />
                    <TechBadge name="TypeScript" />
                    <TechBadge name="Vite" />
                    <TechBadge name="Tailwind v4" />
                    <TechBadge name="Framer Motion" />
                    <TechBadge name="Python 3.11" />
                    <TechBadge name="FastAPI" />
                    <TechBadge name="YOLOv8" />
                    <TechBadge name="OpenCV" />
                    <TechBadge name="PostgreSQL" />
                    <TechBadge name="Docker" />
                    <TechBadge name="FFmpeg" />
                </div>
            </div>
        </section>
    );
}
