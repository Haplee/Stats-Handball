import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import StatusGrid from '../components/StatusGrid';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
                {/* Background Gradients */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-glow"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        v0.2.0 • Optimización del Motor
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent"
                    >
                        Nueva Generación de <br />
                        <span className="text-blue-500">Inteligencia en Video</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Transforma grabaciones de partidos en análisis profesionales.
                        Seguimiento en tiempo real, detección de eventos y tácticas impulsadas por Visión Artificial.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
                    >
                        <Link to="/features" className="group px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-glow hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2">
                            Explorar Funciones <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="https://github.com/Haplee/Stats-Handball" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2">
                            <Github size={20} />
                            Ver Código
                        </a>
                    </motion.div>

                    <StatusGrid />
                </div>
            </section>
        </>
    );
}
