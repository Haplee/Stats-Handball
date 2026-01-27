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

export default function Roadmap() {
    return (
        <section id="roadmap" className="container mx-auto max-w-4xl py-20 px-6">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold">Development Roadmap</h2>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-white/10">
                <TimelineItem
                    done
                    date="Q4 2025"
                    title="Foundation & Research"
                    desc="Requirement analysis, dataset acquisition (Handball World Cup footage), and selection of YOLOv8 as the primary object detection architecture."
                />
                <TimelineItem
                    done
                    date="Nov 2025"
                    title="Engine Prototype 1.0"
                    desc="First successful tracking of ball and players in controlled environments. Basic visualizer built with OpenCV."
                />
                <TimelineItem
                    active
                    date="Jan 2026"
                    title="Platform Integration"
                    desc="Integrating the Python Inference Engine with the React Frontend. Building the API layer for asynchronous video processing."
                />
                <TimelineItem
                    date="Feb 2026"
                    title="Beta Launch (MVP)"
                    desc="Release of the full end-to-end pipeline: Upload Video -> Process -> View Statistics. Restricted user access for testing."
                />
                <TimelineItem
                    date="Mar 2026"
                    title="Advanced Analytics"
                    desc="Implementation of complex event recognition (Pass Chains, Defensive Formations) and export capabilities (PDF/Excel)."
                />
            </div>
        </section>
    );
}
