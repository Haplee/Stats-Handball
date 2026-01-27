import { motion } from 'framer-motion';
import { Target, ScanLine, BarChart3, Users, Zap, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: <Target className="text-blue-400" size={32} />,
        title: "Seguimiento YOLOv11 & v8",
        desc: "Implementación de modelos SOTA (State Of The Art) optimizados para el seguimiento de balón y jugadores en canchas de balonmano con oclusión dinámica."
    },
    {
        icon: <Users className="text-purple-400" size={32} />,
        title: "Gestión de Plantillas",
        desc: "Panel administrativo integral para la gestión de equipos, perfiles técnicos y bases de datos de jugadores con estadísticas físicas y de rendimiento."
    },
    {
        icon: <BarChart3 className="text-emerald-400" size={32} />,
        title: "Visualización Táctica",
        desc: "Conversión de coordenadas de píxeles a espacio de cancha real 40x20m para la generación automática de mapas de calor y trayectorias."
    },
    {
        icon: <ScanLine className="text-orange-400" size={32} />,
        title: "Detección de Eventos IA",
        desc: "Reconocimiento automático de marcas de tiempo críticas: goles, tiros a portería y eficacia de lanzamiento mediante clasificación de acciones."
    },
    {
        icon: <Zap className="text-yellow-400" size={32} />,
        title: "Arquitectura Escalable",
        desc: "Infraestructura basada en contenedores con colas de procesamiento Celery/Redis, garantizando una respuesta asíncrona fluida ante cargas pesadas."
    },
    {
        icon: <ShieldCheck className="text-cyan-400" size={32} />,
        title: "Pizarra Táctica Pro",
        desc: "Herramienta de dibujo profesional integrada con gráficos vectoriales para la planificación de jugadas y exportación instantánea en alta resolución."
    }
];

export default function FeaturesPage() {
    return (
        <section className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Capacidades del Núcleo
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Nuestro motor combina múltiples disciplinas de IA para proporcionar una comprensión integral del juego.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-blue-500/30 transition-colors group"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
