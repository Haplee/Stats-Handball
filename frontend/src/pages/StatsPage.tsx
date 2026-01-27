import { motion } from 'framer-motion';
import { Code2, Bug, FileCheck, Cpu, HardDrive, GitBranch } from 'lucide-react';

function StatCard({ icon, label, value, sublabel }: { icon: React.ReactNode, label: string, value: string, sublabel: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center"
        >
            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 mb-6 font-bold">
                {icon}
            </div>
            <div className="text-4xl font-black mb-2 tracking-tight text-white">{value}</div>
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</div>
            <div className="text-xs text-gray-400">{sublabel}</div>
        </motion.div>
    );
}

export default function StatsPage() {
    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic uppercase"
                >
                    Métricas del <span className="text-blue-500">Proyecto</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 max-w-2xl mx-auto text-lg"
                >
                    Transparencia total sobre la complejidad y el estado de salud del código fuente.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCard
                    icon={<Code2 size={24} />}
                    label="Líneas de Código"
                    value="+12k"
                    sublabel="React, TypeScript y Python integrados"
                />
                <StatCard
                    icon={<FileCheck size={24} />}
                    label="Tests Unitarios"
                    value="100%"
                    sublabel="Cobertura crítica de API y lógica"
                />
                <StatCard
                    icon={<Cpu size={24} />}
                    label="Precisión Modelo IA"
                    value="94.2%"
                    sublabel="mAP@0.5 en dataset de balonmano"
                />
                <StatCard
                    icon={<Bug size={24} />}
                    label="Errores Críticos"
                    value="0"
                    sublabel="Validado por suite de tests automatizada"
                />
                <StatCard
                    icon={<HardDrive size={24} />}
                    label="Backend Endpoints"
                    value="24"
                    sublabel="Servicios REST documentados y estables"
                />
                <StatCard
                    icon={<GitBranch size={24} />}
                    label="Módulos Sistema"
                    value="4"
                    sublabel="App, Progress Web, Backend, Worker"
                />
            </div>

            <div className="mt-20 p-12 rounded-3xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">Salud Tecnológica</h3>
                <p className="text-gray-400 max-w-xl mx-auto mb-8 relative z-10 italic">
                    "La arquitectura ha sido diseñada para escalar horizontalmente, permitiendo el procesamiento de múltiples partidos simultáneos sin degradación de rendimiento."
                </p>
                <div className="flex justify-center gap-12 relative z-10">
                    <div className="text-center">
                        <div className="text-blue-400 font-black text-2xl">A+</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Code Quality</div>
                    </div>
                    <div className="text-center">
                        <div className="text-green-500 font-black text-2xl">100%</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Uptime Dev</div>
                    </div>
                    <div className="text-center">
                        <div className="text-purple-400 font-black text-2xl">Vite</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Build Engine</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
