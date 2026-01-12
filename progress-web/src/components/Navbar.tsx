import { Activity, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path ? "text-white" : "text-gray-400 hover:text-white";

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <Activity className="text-blue-500" />
                    <span>Handball<span className="text-blue-500">Stats</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-medium">
                    <Link to="/" className={`${isActive('/')} transition-colors`}>Inicio</Link>
                    <Link to="/features" className={`${isActive('/features')} transition-colors`}>Funciones</Link>
                    <Link to="/roadmap" className={`${isActive('/roadmap')} transition-colors`}>Hoja de Ruta</Link>
                    <Link to="/tech" className={`${isActive('/tech')} transition-colors`}>Tecnología</Link>
                    <Link to="/webs" className={`${isActive('/webs')} transition-colors`}>Webs</Link>
                </div>

                <div className="hidden md:flex gap-4">
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
                            <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
                            <Link to="/features" onClick={() => setIsOpen(false)}>Funciones</Link>
                            <Link to="/roadmap" onClick={() => setIsOpen(false)}>Hoja de Ruta</Link>
                            <Link to="/tech" onClick={() => setIsOpen(false)}>Tecnología</Link>
                            <Link to="/webs" onClick={() => setIsOpen(false)}>Webs</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
