import { motion } from 'framer-motion';
import { Target, ScanLine, BarChart3, Users, Zap, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: <Target className="text-blue-400" size={32} />,
        title: "Ball Tracking",
        desc: "Precision tracking of the ball trajectory using custom YOLOv8 models fine-tuned for high-velocity handball movements."
    },
    {
        icon: <Users className="text-purple-400" size={32} />,
        title: "Player Recognition",
        desc: "Identify and track individual players, referees, and goalkeepers with consistent ID re-identification across frames."
    },
    {
        icon: <BarChart3 className="text-emerald-400" size={32} />,
        title: "Tactical Analytics",
        desc: "Generate heatmaps, pass networks, and shot charts automatically from the extracted positional data."
    },
    {
        icon: <ScanLine className="text-orange-400" size={32} />,
        title: "Event Detection",
        desc: "Automated logging of key events: Goals, Shots, Passes, and Turnovers mapped to specific game timestamps."
    },
    {
        icon: <Zap className="text-yellow-400" size={32} />,
        title: "Real-time Processing",
        desc: "Optimized inference pipeline capable of processing match footage with minimal latency using TensorRT acceleration."
    },
    {
        icon: <ShieldCheck className="text-cyan-400" size={32} />,
        title: "Secure Cloud Storage",
        desc: "Encrypted storage for team videos and proprietary tactical data with role-based access control."
    }
];

export default function Features() {
    return (
        <section id="features" className="py-20 bg-white/[0.02]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our engine combines multiple AI disciplines to provide a comprehensive understanding of the game.
                    </p>
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
