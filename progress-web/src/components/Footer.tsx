import { Github, Code2, Activity, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0a0a0a] pt-20 pb-10 px-6 mt-auto">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-6">
                            <Activity className="text-blue-500" />
                            <span>Handball<span className="text-blue-500">Stats</span></span>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
                            Una iniciativa de código abierto para llevar el análisis de video de nivel élite a todos los equipos de balonmano. Construido con Visión Artificial de vanguardia.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/Haplee/Stats-Handball" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="mailto:contact@handballstats.com" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Proyecto</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link></li>
                            <li><Link to="/features" className="hover:text-blue-400 transition-colors">Funciones</Link></li>
                            <li><Link to="/roadmap" className="hover:text-blue-400 transition-colors">Hoja de Ruta</Link></li>
                            <li><Link to="/webs" className="hover:text-blue-400 transition-colors">Webs de Interés</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Términos</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Licencia (MIT)</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm border-t border-white/5 pt-10">
                    <p className="mb-4 md:mb-0">© 2026 Proyecto Handball Stats. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-2">
                        <span>Diseñado para</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs font-mono">TFG 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
