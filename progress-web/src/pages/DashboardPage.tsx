import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Youtube, Play, CheckCircle, Loader2, FileVideo, Activity, Clock, Users, Zap, X, Download } from 'lucide-react';

interface VideoData {
    id: number;
    filename: string;
    status: 'pending' | 'procesando' | 'completado' | 'fallido';
    progress: number;
    results: any;
    created_at: string;
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [statusColor, setStatusColor] = useState('text-gray-400');

    const [videos, setVideos] = useState<VideoData[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const urlInputRef = useRef<HTMLInputElement>(null);

    // Polling de videos
    useEffect(() => {
        fetchVideos();
        const interval = setInterval(fetchVideos, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await fetch('/api/videos');
            if (res.ok) {
                const data = await res.json();
                setVideos(data);
                // Si hay un video seleccionado, refrescar sus datos también
                if (selectedVideo) {
                    const updatedSelected = data.find((v: VideoData) => v.id === selectedVideo.id);
                    if (updatedSelected) setSelectedVideo(updatedSelected);
                }
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        const files = fileInputRef.current?.files;
        if (!files || files.length === 0) {
            setStatusMessage('Selecciona un archivo primero.');
            setStatusColor('text-red-500');
            return;
        }

        const formData = new FormData();
        formData.append('file', files[0]);

        setUploading(true);
        setStatusMessage('Subiendo vídeo...');
        setStatusColor('text-blue-400');

        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) {
                const percent = Math.round((ev.loaded / ev.total) * 100);
                setUploadProgress(percent);
            }
        };

        xhr.onload = () => {
            setUploading(false);
            if (xhr.status === 202) {
                setStatusMessage('¡Listo! Análisis en marcha.');
                setStatusColor('text-green-500');
                if (fileInputRef.current) fileInputRef.current.value = '';
                fetchVideos();
            } else {
                setStatusMessage('Ha fallado la subida.');
                setStatusColor('text-red-500');
            }
        };

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
    };

    const handleUrlUpload = async () => {
        const url = urlInputRef.current?.value.trim();
        if (!url) {
            setStatusMessage('Pega un enlace de Youtube válido.');
            setStatusColor('text-red-500');
            return;
        }

        setStatusMessage('Enviando enlace...');
        setStatusColor('text-blue-400');

        try {
            const res = await fetch('/api/upload-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (res.ok) {
                setStatusMessage('¡Enlace recibido! Procesando.');
                setStatusColor('text-green-500');
                if (urlInputRef.current) urlInputRef.current.value = '';
                fetchVideos();
            } else {
                const err = await res.json();
                setStatusMessage(`Error: ${err.error}`);
                setStatusColor('text-red-500');
            }
        } catch (error) {
            setStatusMessage('Error de conexión.');
            setStatusColor('text-red-500');
        }
    };

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Panel Izquierdo: Subida y Lista */}
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                    {/* Tarjeta de Subida */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0f172a] rounded-xl border border-white/10 p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold">Ingesta de Vídeo</h2>
                            <div className="flex bg-white/5 rounded-lg p-1">
                                <button
                                    onClick={() => setActiveTab('file')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${activeTab === 'file' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Archivo
                                </button>
                                <button
                                    onClick={() => setActiveTab('url')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${activeTab === 'url' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    YouTube
                                </button>
                            </div>
                        </div>

                        {activeTab === 'file' ? (
                            <form onSubmit={handleFileUpload}>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors group cursor-pointer relative">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="video/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={() => setStatusMessage(`Archivo seleccionado: ${fileInputRef.current?.files?.[0]?.name}`)}
                                    />
                                    <UploadCloud className="mx-auto w-10 h-10 text-gray-500 group-hover:text-blue-500 transition-colors mb-4" />
                                    <p className="font-semibold text-gray-300">Arrastra o selecciona un video</p>
                                    <p className="text-xs text-gray-500 mt-2">MP4, MOV, AVI (Max 500MB)</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {uploading ? <Loader2 className="animate-spin" /> : 'Iniciar Análisis'}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <Youtube className="absolute left-3 top-3 text-gray-500" size={20} />
                                    <input
                                        ref={urlInputRef}
                                        type="text"
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>
                                <button
                                    onClick={handleUrlUpload}
                                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition-all"
                                >
                                    Analizar Link
                                </button>
                            </div>
                        )}

                        {/* Status Message & Progress */}
                        <div className="mt-4 min-h-[1.5rem]">
                            {uploading && (
                                <div className="w-full h-1 bg-white/10 rounded-full mb-2 overflow-hidden">
                                    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                            )}
                            <p className={`text-xs text-center font-medium ${statusColor}`}>{statusMessage}</p>
                        </div>
                    </motion.div>

                    {/* Lista de Videos */}
                    <div className="bg-[#0f172a] rounded-xl border border-white/10 p-6 flex-1 overflow-y-auto max-h-[500px]">
                        <h2 className="text-lg font-bold mb-4">Biblioteca ({videos.length})</h2>
                        <div className="space-y-3">
                            {videos.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-8">No hay videos procesados aún.</p>
                            ) : (
                                videos.map(v => (
                                    <div
                                        key={v.id}
                                        onClick={() => v.status === 'completado' && setSelectedVideo(v)}
                                        className={`p-3 rounded-lg border flex items-center gap-3 transition-all cursor-pointer
                                            ${v.status === 'completado' ? 'hover:bg-white/5 border-white/5 text-gray-200' : 'opacity-70 border-transparent'}
                                            ${selectedVideo?.id === v.id ? 'bg-blue-600/10 border-blue-500/50' : ''}
                                        `}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center shrink-0">
                                            {v.status === 'completado' ? <CheckCircle size={18} className="text-green-500" /> :
                                                v.status === 'procesando' ? <Loader2 size={18} className="text-blue-500 animate-spin" /> :
                                                    v.status === 'fallido' ? <X size={18} className="text-red-500" /> :
                                                        <Clock size={18} className="text-gray-500" />}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-medium text-sm truncate">{v.filename}</p>
                                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                                {v.status === 'procesando' ? `Analizando ${v.progress}%` : new Date(v.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Panel Derecho: Resultados */}
                <div className="w-full md:w-2/3">
                    <AnimatePresence mode="wait">
                        {selectedVideo ? (
                            <motion.div
                                key={selectedVideo.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-[#0f172a] rounded-xl border border-white/10 p-8 h-full min-h-[600px]"
                            >
                                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
                                            {selectedVideo.filename}
                                            <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/20">Completado</span>
                                        </h1>
                                        <div className="flex gap-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {selectedVideo.results?.summary?.duration || '--:--'}</span>
                                            <span className="flex items-center gap-1"><FileVideo size={14} /> ID: {selectedVideo.id}</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                                        <Download size={16} /> Exportar PDF
                                    </button>
                                </div>

                                {/* KPIs */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <KpiCard icon={<Activity className="text-blue-400" />} label="Intensidad" value={selectedVideo.results?.summary?.intensity_score || '0%'} />
                                    <KpiCard icon={<Zap className="text-yellow-400" />} label="Vel. Media" value={selectedVideo.results?.summary?.avg_speed || '0 km/h'} />
                                    <KpiCard icon={<Users className="text-purple-400" />} label="Jugadores" value={selectedVideo.results?.summary?.total_players || '0'} />
                                    <KpiCard icon={<Clock className="text-emerald-400" />} label="Duración" value={selectedVideo.results?.summary?.duration || '00:00'} />
                                </div>

                                {/* Placeholder Grafico */}
                                <div className="bg-black/30 rounded-xl border border-white/5 p-6 mb-8 h-64 relative overflow-hidden flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                                    <div className="text-center">
                                        <Activity className="w-12 h-12 text-blue-500/50 mx-auto mb-2" />
                                        <p className="text-gray-400">Mapa de Calor Interactivo</p>
                                        <p className="text-xs text-gray-600">(Visualización Canvas placeholder)</p>
                                    </div>
                                </div>

                                {/* Tabla Jugadores */}
                                <div>
                                    <h3 className="font-bold mb-4 flex items-center gap-2"><Users size={18} /> Top Performance</h3>
                                    <div className="grid gap-2">
                                        {selectedVideo.results?.player_stats?.map((p: any) => (
                                            <div key={p.id} className="bg-white/5 p-3 rounded-lg flex justify-between items-center border-l-2 border-blue-500">
                                                <span className="font-medium">{p.name}</span>
                                                <div className="flex gap-4 text-sm">
                                                    <span className="text-gray-400">{p.dist}</span>
                                                    <span className="text-green-400 font-bold">{p.speed}</span>
                                                </div>
                                            </div>
                                        )) || <p className="text-gray-500">No hay datos de jugadores.</p>}
                                    </div>
                                </div>

                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-[#0f172a] rounded-xl border border-white/10 p-12 text-center min-h-[400px]">
                                <Play className="w-16 h-16 opacity-20 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Selecciona un partido</h3>
                                <p className="max-w-xs mx-auto">Sube un video o selecciona uno de la lista para ver el análisis detallado.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function KpiCard({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2 opacity-80">
                {icon}
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">{label}</span>
            </div>
            <div className="text-xl font-bold">{value}</div>
        </div>
    );
}
