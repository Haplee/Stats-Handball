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
                    date="Nov 2025"
                    title="Prototipo de Motor 1.0"
                    desc="Primer rastreo exitoso de balón y jugadores en entornos controlados. Visualizador básico construido con OpenCV."
                />
                <TimelineItem
                    done
                    date="Ene 2026"
                    title="Backend & Core IA Completado"
                    desc="API REST segura implementada (Auth, CRUD, Videos). Pipeline de procesamiento asíncrono (Celery/Redis) integrado y validado con tests unitarios."
                />
                <TimelineItem
                    done
                    date="Feb 2026"
                    title="Lanzamiento Beta (MVP)"
                    desc="COMPLETADO. 1) Frontend: Dashboard con subida de archivos/YouTube y gestión de biblioteca. 2) Worker: Pipeline completo de procesamiento de vídeo. 3) IA: Integración de modelo YOLOv8 para detección en partidos."
                />
                <TimelineItem
                    date="Mar 2026"
                    title="Analítica Avanzada"
                    desc="Implementación de reconocimiento de eventos complejos (Cadenas de Pases, Formaciones Defensivas) y exportación (PDF/Excel)."
                />
            </div>
        </section>
    );
}
