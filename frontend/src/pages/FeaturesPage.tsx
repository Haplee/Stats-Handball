import { motion } from 'framer-motion';
import { Target, ScanLine, BarChart3, Users, Zap, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: <Target className="text-blue-400" size={32} />,
        title: "Seguimiento de Balón",
        desc: "Tracking preciso de la trayectoria del balón usando modelos YOLOv8 personalizados y ajustados para la velocidad del balonmano."
    },
    {
        icon: <Users className="text-purple-400" size={32} />,
        title: "Reconocimiento Inteligente",
        desc: "Sistema de filtrado verificado que distingue exclusivamente jugadores y balón, ignorando árbitros, público y elementos externos para estadísticas limpias."
    },
    {
        icon: <BarChart3 className="text-emerald-400" size={32} />,
        title: "Analítica Táctica",
        desc: "Generación automática de mapas de calor, redes de pases y gráficos de tiro a partir de datos posicionales."
    },
    {
        icon: <ScanLine className="text-orange-400" size={32} />,
        title: "Detección de Eventos",
        desc: "Registro automático de eventos clave: Goles, Tiros, Pases y Pérdidas mapeados a marcas de tiempo específicas."
    },
    {
        icon: <Zap className="text-yellow-400" size={32} />,
        title: "Procesamiento en Tiempo Real",
        desc: "Pipeline de inferencia optimizado capaz de procesar partidos con latencia mínima usando aceleración TensorRT."
    },
    {
        icon: <ShieldCheck className="text-cyan-400" size={32} />,
        title: "Almacenamiento Seguro",
        desc: "Almacenamiento encriptado para videos de equipos y datos tácticos propietarios con control de acceso por roles."
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
