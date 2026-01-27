import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

function TimelineItem({ done, active, date, title, desc }: { done?: boolean, active?: boolean, date: string, title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-12"
        >
            <div className={`absolute left-0 top-1.5 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-[#0a0a0a] z-10 
        ${done ? 'border-blue-500 text-blue-500' : active ? 'border-white text-white' : 'border-white/20 text-white/20'}`}>
                {done ? <CheckCircle2 size={16} /> : active ? <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" /> : <div className="w-2.5 h-2.5 bg-white/20 rounded-full" />}
            </div>

            <div className="mb-1">
                <span className={`text-xs font-mono mb-1 block ${active ? 'text-blue-400' : 'text-gray-500'}`}>{date}</span>
                <h4 className={`text-lg font-bold ${active ? 'text-white' : 'text-gray-200'}`}>{title}</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{desc}</p>
        </motion.div>
    );
}

export default function RoadmapPage() {
    return (
        <section className="container mx-auto max-w-4xl pt-32 pb-20 px-6 min-h-screen">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold">Hoja de Ruta</h2>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-white/10">
                <TimelineItem
                    done
                    date="Q4 2025"
                    title="Fundamentos e Investigación"
                    desc="Análisis de requisitos, adquisición de datasets (partidos del Mundial de Balonmano) y selección de YOLOv8 como arquitectura principal."
                />
                <TimelineItem
                    done
                    date="Nov - Dic 2025"
                    title="Prototipo de Motor & Datos"
                    desc="Primer rastreo exitoso de balón y jugadores. Adquisición de datasets del Mundial de Balonmano para entrenamiento. Visualizador básico construido con OpenCV."
                />
                <TimelineItem
                    done
                    date="Ene 2026"
                    title="Arquitectura Backend & API"
                    desc="Estructura de microservicios establecida. API REST segura (Auth, CRUD). Pipeline asíncrono robusto implementado con Celery y Redis para procesamiento pesado."
                />
                <TimelineItem
                    done
                    date="Feb 2026"
                    title="Lanzamiento Beta (MVP Complete)"
                    desc="Suite completa operativa: Dashboard interactivo, Gestión de Equipos (CRUD completo con escudos), Base de Datos de Jugadores filtrable y Pizarra Táctica Profesional con exportación e imágenes del campo reales."
                />
                <TimelineItem
                    active
                    date="Mar 2026"
                    title="Analítica Avanzada & Eventos"
                    desc="Implementación de lógica para reconocer Cadenas de Pases, Formaciones Defensivas y mapas de calor precisos. Exportación de informes tácticos en PDF/Excel."
                />
                <TimelineItem
                    date="Abr 2026"
                    title="App Móvil & Tiempo Real"
                    desc="Desarrollo de versión PWA optimizada para pie de campo. Integración de streaming en tiempo real para análisis durante partidos en vivo."
                />
                <TimelineItem
                    date="Futuro"
                    title="IA Predictiva"
                    desc="Modelado de probabilidades de éxito basado en posiciones históricas y sugerencias tácticas automáticas asistidas por IA."
                />
            </div>
        </section>
    );
}
