import { Activity, Github, Menu, X, LayoutDashboard, Users, Smartphone, Settings } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();



    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <Activity className="text-blue-500" />
                    <span>Handball<span className="text-blue-500">Stats</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 text-sm font-medium">
                    <a href="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/5">← Salir</a>
                    <div className="w-px h-6 bg-white/10 my-auto mx-2" />

                    <Link to="/" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${location.pathname === '/' ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <LayoutDashboard size={18} />
                        Panel
                    </Link>
                    <Link to="/teams" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${location.pathname === '/teams' ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Users size={18} />
                        Equipos
                    </Link>
                    <Link to="/players" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${location.pathname === '/players' ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Users size={18} />
                        Jugadores
                    </Link>
                    <Link to="/tactics" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${location.pathname === '/tactics' ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Smartphone size={18} />
                        Táctica
                    </Link>
                </div>

                <div className="hidden md:flex gap-3">
                    <Link to="/settings" className={`p-2 rounded-full transition-colors ${location.pathname === '/settings' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                        <Settings size={20} />
                    </Link>
                    <a href="https://github.com/Haplee/Stats-Handball" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <Github size={20} />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-400" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0a] border-b border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4 text-gray-400 font-medium">
                            <a href="/" onClick={() => setIsOpen(false)}>← Volver al Progreso</a>
                            <div className="h-px bg-white/5 my-2" />
                            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3"><LayoutDashboard size={20} /> Panel de Control</Link>
                            <Link to="/teams" onClick={() => setIsOpen(false)} className="flex items-center gap-3"><Users size={20} /> Equipos</Link>
                            <Link to="/players" onClick={() => setIsOpen(false)} className="flex items-center gap-3"><Users size={20} /> Jugadores</Link>
                            <Link to="/tactics" onClick={() => setIsOpen(false)} className="flex items-center gap-3"><Smartphone size={20} /> Pizarra Táctica</Link>
                            <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-blue-400"><Settings size={20} /> Configuración</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
