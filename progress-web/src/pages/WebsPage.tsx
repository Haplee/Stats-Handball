import { motion } from 'framer-motion';
import { ExternalLink, Globe } from 'lucide-react';
import websData from '../data/webs.json';

export default function WebsPage() {
    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold mb-4"
                >
                    Webs de Referencia
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 max-w-2xl mx-auto"
                >
                    Recopilación de recursos, documentación e inspiraciones utilizadas en el desarrollo del proyecto.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {websData.map((web, index) => (
                    <motion.a
                        key={web.id}
                        href={web.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="block p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-blue-500/50 hover:bg-white/5 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                                {web.category}
                            </span>
                            <ExternalLink size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <Globe size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                            {web.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {web.description}
                        </p>
                    </motion.a>
                ))}
            </div>

            <div className="mt-20 p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-gray-400 text-sm">
                    Para añadir más webs, edita el archivo <code className="bg-black/30 px-2 py-1 rounded text-orange-400 font-mono">src/data/webs.json</code>
                </p>
            </div>
        </section>
    );
}
