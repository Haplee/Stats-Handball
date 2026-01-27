import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Bell, Palette, Database, LogOut, Check } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', icon: <Palette size={18} />, label: 'Apariencia' },
        { id: 'profile', icon: <User size={18} />, label: 'Mi Perfil' },
        { id: 'notifications', icon: <Bell size={18} />, label: 'Notificaciones' },
        { id: 'data', icon: <Database size={18} />, label: 'Datos y Almacenamiento' },
    ];

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Settings className="text-gray-400" size={32} />
                Configuración
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex flex-col gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                    <div className="h-px bg-white/10 my-4" />
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'general' && (
                            <motion.div
                                key="general"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Color de Acento</h3>
                                    <div className="flex gap-4">
                                        {['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-orange-600'].map((color, i) => (
                                            <button key={i} className={`w-12 h-12 rounded-full ${color} flex items-center justify-center ring-2 ring-offset-4 ring-offset-[#0f0f0f] ${i === 0 ? 'ring-white' : 'ring-transparent'}`}>
                                                {i === 0 && <Check size={20} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Modo de Visualización</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="border-2 border-blue-500 rounded-xl p-4 bg-[#1a1a1a] cursor-pointer">
                                            <div className="h-20 bg-gray-800 rounded mb-2"></div>
                                            <span className="text-sm font-medium">Oscuro (Por defecto)</span>
                                        </div>
                                        <div className="border-2 border-transparent rounded-xl p-4 bg-gray-200 cursor-pointer opacity-50">
                                            <div className="h-20 bg-white rounded mb-2 border border-gray-300"></div>
                                            <span className="text-sm font-medium text-gray-900">Claro</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* More tabs functionality would go here */}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
