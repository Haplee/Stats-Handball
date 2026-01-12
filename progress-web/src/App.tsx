import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, CheckCircle2, ChevronRight, Code2, Database, Github, LayoutDashboard, Terminal, Video } from 'lucide-react';

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

export default function App() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <Activity className="text-blue-500" />
                        <span>Handball<span className="text-blue-500">Stats</span></span>
                    </div>
                    <div className="flex gap-6 text-sm font-medium text-gray-400">
                        <a href="#overview" className="hover:text-white transition-colors">Overview</a>
                        <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6">

                {/* Hero Section */}
                <div className="container mx-auto max-w-5xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center"
                    >
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
                            v0.1.0-alpha • Active Development
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                            Revolutionizing Handball <br />
                            <span className="text-blue-500">Video Analysis</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            An advanced AI-powered platform to transform raw match footage into actionable insights.
                            Automated tracking, event detection, and statistical analysis.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                                View Demo
                            </button>
                            <button className="px-8 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center justify-center gap-2">
                                <Github size={20} />
                                Source Code
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Status Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
                >
                    <StatusCard
                        icon={<Video className="text-purple-400" />}
                        title="Video Processing"
                        status="90%"
                        color="bg-purple-500"
                        desc="FFmpeg pipeline optimized for high framerate analysis."
                    />
                    <StatusCard
                        icon={<LayoutDashboard className="text-blue-400" />}
                        title="Analysis Dashboard"
                        status="75%"
                        color="bg-blue-500"
                        desc="Interactive charts and player heatmaps implemented."
                    />
                    <StatusCard
                        icon={<Database className="text-emerald-400" />}
                        title="Backend API"
                        status="100%"
                        color="bg-emerald-500"
                        desc="FastAPI endpoints secured and production ready."
                    />
                </motion.div>

                {/* Roadmap Section */}
                <section id="roadmap" className="container mx-auto max-w-4xl mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-bold">Project Roadmap</h2>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-white/10">
                        <TimelineItem
                            done
                            date="Oct 2025"
                            title="Project Inception"
                            desc="Definition of requirements, tech stack selection (React, Python, OpenCV), and initial repository setup."
                        />
                        <TimelineItem
                            done
                            date="Nov 2025"
                            title="Core Engine Prototype"
                            desc="Successful ball tracking algorithm implementation using YOLOv8 and custom fine-tuning."
                        />
                        <TimelineItem
                            done
                            date="Dec 2025"
                            title="Frontend Architecture"
                            desc="Setup of the web platform, video upload interface, and state management logic."
                        />
                        <TimelineItem
                            active
                            date="Jan 2026"
                            title="Event Detection Integration"
                            desc="Connecting the computer vision pipeline to the frontend to visualize pass/shot events in real-time."
                        />
                        <TimelineItem
                            date="Feb 2026"
                            title="Beta Release"
                            desc="Deployment to cloud infrastructure and closed beta testing with local teams."
                        />
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="container mx-auto max-w-4xl">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Terminal size={20} className="text-gray-400" />
                            Technical Infrastructure
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <TechBadge name="React 18" />
                            <TechBadge name="TypeScript" />
                            <TechBadge name="Vite" />
                            <TechBadge name="Tailwind v4" />
                            <TechBadge name="Framer Motion" />
                            <TechBadge name="Python" />
                            <TechBadge name="FastAPI" />
                            <TechBadge name="YOLOv8" />
                        </div>
                    </div>
                </section>

            </main>

            <footer className="border-t border-white/5 bg-[#0a0a0a] pt-20 pb-10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4 md:mb-0">
                            <Activity className="text-blue-500" />
                            <span>Handball<span className="text-blue-500">Stats</span></span>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                                <Github size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                                <Code2 size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm border-t border-white/5 pt-10">
                        <p className="mb-2 md:mb-0">© 2026 Handball Stats Project. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
                            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function StatusCard({ icon, title, status, color, desc }: { icon: React.ReactNode, title: string, status: string, color: string, desc: string }) {
    return (
        <motion.div
            variants={fadeInUp}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
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

function TechBadge({ name }: { name: string }) {
    return (
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-center text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors cursor-default">
            {name}
        </div>
    );
}
