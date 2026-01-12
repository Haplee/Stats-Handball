import { motion } from 'framer-motion';
import { Video, LayoutDashboard, Server } from 'lucide-react';
import React from 'react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

function StatusCard({ icon, title, status, color, desc }: { icon: React.ReactNode, title: string, status: string, color: string, desc: string }) {
    return (
        <motion.div
            variants={fadeInUp}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-left"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-white/5">
                    {icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 ${color.replace('bg-', 'text-')}`}>{status}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: status }}></div>
            </div>
        </motion.div>
    );
}

export default function StatusGrid() {
    return (
        <section className="py-20 w-full">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8 text-center">Estado del Sistema</h3>
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
            >
                <StatusCard
                    icon={<Video className="text-purple-400" />}
                    title="Pipeline de Visión (CV)"
                    status="92%"
                    color="bg-purple-500"
                    desc="Integración estable de YOLOv8 + ByteTrack. Optimizando el manejo de oclusiones."
                />
                <StatusCard
                    icon={<LayoutDashboard className="text-blue-400" />}
                    title="Frontend UX"
                    status="85%"
                    color="bg-blue-500"
                    desc="Dashboard y subida de videos completada. Implementando controles de reproducción."
                />
                <StatusCard
                    icon={<Server className="text-emerald-400" />}
                    title="Servicios API"
                    status="98%"
                    color="bg-emerald-500"
                    desc="Backend FastAPI totalmente desacoplado y dockerizado."
                />
            </motion.div>
        </section>
    );
}
