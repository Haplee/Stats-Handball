import { useParams } from 'react-router-dom';

import { Play, Activity, Clock } from 'lucide-react';

export default function AnalysisPage() {
    useParams();

    return (
        <section className="pt-24 pb-8 min-h-screen container mx-auto px-4 max-w-[1600px] flex flex-col lg:flex-row gap-6">

            {/* Left Column: Video Player & Controls (70%) */}
            <div className="lg:w-[70%] space-y-4">
                {/* Video Player Container */}
                <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative group">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Play className="text-white/50 w-24 h-24" />
                    </div>
                    {/* Mock Overlay UI */}
                    <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-lg text-xs font-mono text-green-400 flex items-center gap-2">
                        <Activity size={12} className="animate-pulse" />
                        LIVE TRACKING ACTIVE
                    </div>

                    {/* Bounding Box Mock */}
                    <div className="absolute top-[40%] left-[60%] w-16 h-24 border-2 border-yellow-400 rounded">
                        <div className="absolute -top-6 left-0 bg-yellow-400 text-black text-[10px] px-1 font-bold">#10 A.Duj</div>
                    </div>
                </div>

                {/* Timeline / Scrubber */}
                <div className="bg-[#0f0f0f] p-4 rounded-xl border border-white/10">
                    <div className="h-12 flex items-center gap-2 mb-2 overflow-x-auto">
                        {/* Event Markers */}
                        <div className="h-full w-1 bg-red-500 mx-10 relative group cursor-pointer">
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">Gol (10:23)</div>
                        </div>
                        <div className="h-full w-1 bg-blue-500 mx-24 cursor-pointer"></div>
                        <div className="h-full w-1 bg-yellow-500 mx-5 cursor-pointer"></div>
                    </div>
                </div>
            </div>

            {/* Right Column: Stats & Events (30%) */}
            <div className="lg:w-[30%] flex flex-col gap-4">
                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 flex-1">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="text-blue-500" />
                        Estadísticas en Vivo
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2 text-gray-400">
                                <span>Posesión</span>
                                <span>62%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[62%]"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-white">28</div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Tiros</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-green-400">64%</div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Eficacia</div>
                            </div>
                        </div>

                        {/* Shot Chart Mock */}
                        <div className="aspect-[4/3] bg-blue-900/20 rounded-xl border border-blue-500/30 relative opacity-80 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Handball_court.svg/1200px-Handball_court.svg.png')] bg-cover bg-center">
                            <div className="absolute top-[30%] left-[80%] w-3 h-3 bg-green-500 rounded-full border border-white shadow shadow-green-500/50"></div>
                            <div className="absolute top-[50%] left-[75%] w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                            <div className="absolute top-[40%] left-[90%] w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 h-[300px] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4 sticky top-0 bg-[#0f0f0f] py-2 border-b border-white/10 flex items-center justify-between">
                        Feed de Eventos
                        <Clock size={16} className="text-gray-500" />
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex gap-3 items-start text-sm">
                                <div className="w-12 text-gray-500 font-mono text-xs pt-1">1{i}:24</div>
                                <div>
                                    <span className="text-white font-bold">Gol</span> de <span className="text-blue-400">#10 Alex Dujshebaev</span> desde 9m.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
