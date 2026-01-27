import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Activity, Clock, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

interface VideoData {
    id: number;
    filename: string;
    status: 'pending' | 'procesando' | 'completed' | 'failed';
    progress: number;
    created_at: string;
    results?: {
        possession?: number;
        shots_total?: number;
        efficiency?: number;
        events?: Array<{ time: string; description: string; type: 'goal' | 'foul' | 'pass' }>;
        heatmap?: Array<{ x: number; y: number; type: 'shot' | 'position' }>;
    };
}

export default function AnalysisPage() {
    const { id } = useParams();
    const [video, setVideo] = useState<VideoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchVideoData();

        // Poll every 5 seconds if processing
        const interval = setInterval(() => {
            if (video && (video.status === 'pending' || video.status === 'procesando')) {
                fetchVideoData();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [id, video?.status]);

    const fetchVideoData = async () => {
        try {
            // Don't show full loading spinner on updates, only initial load
            if (!video) setLoading(true);

            const res = await api.get(`/videos/${id}`);
            setVideo(res.data);
            setError(null);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || "Error al cargar el video");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !video) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">Cargando análisis...</p>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] p-4 text-center">
                <AlertCircle className="text-red-500 mb-4" size={64} />
                <h2 className="text-2xl font-bold mb-2">Error</h2>
                <p className="text-gray-400 mb-6">{error || "No se encontró el video"}</p>
                <Link to="/" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors">
                    <ArrowLeft size={18} /> Volver al Inicio
                </Link>
            </div>
        );
    }

    // PROCESSING STATE
    if (video.status === 'pending' || video.status === 'procesando') {
        return (
            <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-4xl flex flex-col items-center justify-center text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                    <Activity className="text-blue-500 relative z-10 animate-pulse" size={80} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Analizando Partido</h2>
                <p className="text-gray-400 max-w-lg mb-8">
                    Nuestra IA está procesando el video para extraer estadísticas, cortes y mapas de calor.
                    Esto puede tomar unos minutos dependiendo de la duración.
                </p>

                <div className="w-full max-w-md bg-white/5 rounded-full h-4 overflow-hidden mb-4 border border-white/10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${video.progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 relative"
                    >
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                    </motion.div>
                </div>
                <p className="font-mono text-blue-400 font-bold">{video.progress}% Completado</p>

                <div className="mt-12 p-4 bg-white/5 rounded-xl text-sm text-gray-500 flex items-center gap-3">
                    <Clock size={16} />
                    Puedes salir de esta página. Te notificaremos cuando termine.
                </div>
            </section>
        );
    }

    // COMPLETED STATE
    return (
        <section className="pt-24 pb-8 min-h-screen container mx-auto px-4 max-w-[1600px] flex flex-col lg:flex-row gap-6">

            {/* Left Column: Video Player & Controls (70%) */}
            <div className="lg:w-[70%] space-y-4">
                <div className="flex items-center gap-4 mb-2">
                    <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
                    <h1 className="text-2xl font-bold truncate">{video.filename}</h1>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20 flex items-center gap-1">
                        <CheckCircle size={12} /> COMPLETADO
                    </span>
                </div>

                {/* Video Player Container */}
                <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative group">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Play className="text-white/50 w-24 h-24" />
                    </div>
                    {/* Placeholder for real player */}
                    <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-lg text-xs font-mono text-green-400 flex items-center gap-2">
                        <Activity size={12} className="animate-pulse" />
                        IA TRACKING: READY
                    </div>
                </div>

                {/* Timeline / Scrubber */}
                <div className="bg-[#0f0f0f] p-4 rounded-xl border border-white/10">
                    <div className="h-12 flex items-center gap-2 mb-2 overflow-x-auto">
                        {/* Event Markers from Real Results */}
                        {video.results?.events?.map((ev, i) => (
                            <div key={i} className="h-full w-1 bg-blue-500 mx-5 cursor-pointer relative group" title={`${ev.description} (${ev.time})`}>
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-10">
                                    {ev.description}
                                </div>
                            </div>
                        ))}
                        {!video.results?.events && <span className="text-gray-600 text-sm">No hay eventos marcados aún.</span>}
                    </div>
                </div>
            </div>

            {/* Right Column: Stats & Events (30%) */}
            <div className="lg:w-[30%] flex flex-col gap-4">
                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 flex-1">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="text-blue-500" />
                        Estadísticas del Partido
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2 text-gray-400">
                                <span>Posesión Estimada</span>
                                <span>{video.results?.possession || 50}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${video.results?.possession || 50}%` }}></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-white">{video.results?.shots_total || 0}</div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Tiros Detectados</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-green-400">{video.results?.efficiency || 0}%</div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Eficacia</div>
                            </div>
                        </div>

                        {/* Shot Chart Visualization */}
                        <div className="aspect-[4/3] bg-blue-900/20 rounded-xl border border-blue-500/30 relative opacity-80 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Handball_court.svg/1200px-Handball_court.svg.png')] bg-cover bg-center overflow-hidden">
                            {video.results?.heatmap?.map((point, i) => (
                                <div
                                    key={i}
                                    className="absolute w-3 h-3 bg-red-500 rounded-full border border-white shadow-sm transform -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 h-[300px] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4 sticky top-0 bg-[#0f0f0f] py-2 border-b border-white/10 flex items-center justify-between">
                        Registro de Eventos
                        <Clock size={16} className="text-gray-500" />
                    </h3>
                    <div className="space-y-4">
                        {video.results?.events?.map((ev, i) => (
                            <div key={i} className="flex gap-3 items-start text-sm border-l-2 border-white/10 pl-3 hover:border-blue-500 transition-colors">
                                <div className="w-12 text-gray-500 font-mono text-xs pt-1">{ev.time}</div>
                                <div>
                                    <span className="text-white">{ev.description}</span>
                                </div>
                            </div>
                        ))}
                        {(!video.results?.events || video.results.events.length === 0) && (
                            <div className="text-gray-500 text-center py-4">Sin eventos registrados</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
