import { Github, Code2, Activity, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0a0a0a] pt-20 pb-10 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-6">
                            <Activity className="text-blue-500" />
                            <span>Handball<span className="text-blue-500">Stats</span></span>
                        </div>
                        <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
                            An open-source initiative to bring elite-level video analytics to handball teams everywhere. Built with state-of-the-art Computer Vision.
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
                        <h4 className="font-bold mb-6 text-white">Project</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#overview" className="hover:text-blue-400 transition-colors">Overview</a></li>
                            <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                            <li><a href="#roadmap" className="hover:text-blue-400 transition-colors">Roadmap</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">License (MIT)</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm border-t border-white/5 pt-10">
                    <p className="mb-4 md:mb-0">© 2026 Handball Stats Project. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Designed for</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs font-mono">TFG 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
