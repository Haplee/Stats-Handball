import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Youtube, Play, Loader2, FileVideo, Clock, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

interface Video {
    id: number;
    nombre: string;
    estado: 'pending' | 'processing' | 'completed' | 'failed';
    fecha: string;
    miniatura?: string;
    video_id?: string; // For youtube
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload');
    const [dragActive, setDragActive] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    // Mock data for initial render (while backend is not fully connected in dev env)
    // In real implementation, this would fetch from /api/videos
    useEffect(() => {
        // Fetch videos logic here...
        // For now, let's pretend we have some
        /* 
        fetch('/api/videos').then(res => res.json()).then(data => setVideos(data));
        */
        // Dummy data for visualization
        setVideos([
            { id: 1, nombre: 'Partido Final Regionales.mp4', estado: 'completed', fecha: '2026-01-25' },
            { id: 2, nombre: 'Entrenamiento Jueves', estado: 'processing', fecha: '2026-01-27' },
            { id: 3, nombre: 'España vs Francia 2025', estado: 'failed', fecha: '2026-01-20' },
        ]);
    }, []);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const handleFileUpload = async (file: File) => {
        setLoading(true);
        setUploadStatus({ type: null, message: '' });

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Replace with actual API call
            // const res = await fetch('/api/upload', { method: 'POST', body: formData });
            // if(!res.ok) throw new Error('Falló la subida');

            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            setUploadStatus({ type: 'success', message: '¡Vídeo subido con éxito! El análisis comenzará en breve.' });
            setActiveTab('library');
            // Mock adding to list
            setVideos(prev => [{ id: Date.now(), nombre: file.name, estado: 'pending', fecha: new Date().toISOString().split('T')[0] }, ...prev]);
        } catch (error) {
            setUploadStatus({ type: 'error', message: 'Error al subir el archivo. Inténtalo de nuevo.' });
        } finally {
            setLoading(false);
        }
    };

    const handleYoutubeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!youtubeUrl) return;

        setLoading(true);
        setUploadStatus({ type: null, message: '' });

        try {
            // Replace with actual API call
            // const res = await fetch('/api/upload-url', { 
            //     method: 'POST', 
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ url: youtubeUrl }) 
            // });

            await new Promise(resolve => setTimeout(resolve, 1500));

            setUploadStatus({ type: 'success', message: 'Enlace de YouTube recibido. Procesando...' });
            setActiveTab('library');
            setVideos(prev => [{ id: Date.now(), nombre: `YouTube Import`, estado: 'pending', fecha: new Date().toISOString().split('T')[0] }, ...prev]);
        } catch (error) {
            setUploadStatus({ type: 'error', message: 'Error con ell enlace. Asegúrate que es de YouTube.' });
        } finally {
            setLoading(false);
            setYoutubeUrl('');
        }
    };

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-6xl">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold">Panel de Análisis</h2>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-6 mb-8 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('upload')}
                    className={`pb-4 px-2 -mb-4 transition-all text-lg font-medium flex items-center gap-2 ${activeTab === 'upload'
                        ? 'border-b-2 border-blue-500 text-blue-400'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Upload size={20} />
                    Subir Vídeo
                </button>
                <button
                    onClick={() => setActiveTab('library')}
                    className={`pb-4 px-2 -mb-4 transition-all text-lg font-medium flex items-center gap-2 ${activeTab === 'library'
                        ? 'border-b-2 border-blue-500 text-blue-400'
                        : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <FileVideo size={20} />
                    Mi Biblioteca
                    <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-300">{videos.length}</span>
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'upload' ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* File Upload Option */}
                        <div
                            className={`
                                relative p-8 rounded-2xl border-2 border-dashed transition-all duration-300
                                ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-[#0f0f0f] hover:border-white/20'}
                                ${loading ? 'opacity-50 pointer-events-none' : ''}
                            `}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                id="video-upload"
                                className="hidden"
                                accept="video/mp4,video/mov,video/avi"
                                onChange={handleFileSelect}
                            />
                            <label htmlFor="video-upload" className="flex flex-col items-center justify-center p-6 cursor-pointer h-full">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 text-blue-400">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Sube tu Archivo</h3>
                                <p className="text-gray-400 text-center mb-6 text-sm">
                                    Arrastra tu vídeo aquí o haz clic para explorar.<br />
                                    <span className="text-xs text-gray-500 mt-2 block">MP4, MOV, AVI (Max 500MB)</span>
                                </p>
                                <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                                    Seleccionar Archivo
                                </span>
                            </label>
                        </div>

                        {/* YouTube URL Option */}
                        <div className="p-8 rounded-2xl bg-[#0f0f0f] border border-white/10 flex flex-col justify-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500 mx-auto">
                                <Youtube size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">Desde YouTube</h3>
                            <p className="text-gray-400 text-center mb-8 text-sm">
                                Pega el enlace de un partido público para analizarlo directamente.
                            </p>

                            <form onSubmit={handleYoutubeSubmit} className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                        <Youtube size={18} />
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                                        value={youtubeUrl}
                                        onChange={(e) => setYoutubeUrl(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || !youtubeUrl}
                                    className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Procesar Enlace'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="library"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {videos.map((video) => (
                            <div key={video.id} className="group relative bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all">
                                {/* Thumbnail Placeholder */}
                                <div className="aspect-video bg-black/50 relative flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                    {video.estado === 'completed' && (
                                        <Play className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 drop-shadow-lg" size={48} fill="white" />
                                    )}
                                    {video.estado === 'processing' && (
                                        <div className="flex flex-col items-center gap-2 text-blue-400">
                                            <Loader2 className="animate-spin" size={32} />
                                            <span className="text-xs font-mono uppercase tracking-widest text-center">Analizando</span>
                                        </div>
                                    )}
                                    {video.estado === 'failed' && (
                                        <div className="flex flex-col items-center gap-2 text-red-500">
                                            <AlertCircle size={32} />
                                            <span className="text-xs font-mono uppercase tracking-widest">Error</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg truncate pr-4" title={video.nombre}>{video.nombre}</h3>
                                        <button className="text-gray-600 hover:text-red-400 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={12} />
                                            {video.fecha}
                                        </div>
                                        <StatusBadge status={video.estado} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notifications Toast */}
            <AnimatePresence>
                {uploadStatus.message && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 right-8 p-4 rounded-xl border flex items-center gap-3 shadow-2xl z-50 ${uploadStatus.type === 'success'
                            ? 'bg-green-500/10 border-green-500/50 text-green-400'
                            : 'bg-red-500/10 border-red-500/50 text-red-400'
                            }`}
                    >
                        {uploadStatus.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        <div>
                            <h4 className="font-bold">{uploadStatus.type === 'success' ? '¡Éxito!' : 'Ha ocurrido un error'}</h4>
                            <p className="text-sm opacity-90">{uploadStatus.message}</p>
                        </div>
                        <button onClick={() => setUploadStatus({ type: null, message: '' })} className="ml-4 hover:opacity-75">
                            ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'completed':
            return <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-green-500/20">Completado</span>;
        case 'processing':
            return <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-blue-500/20">Procesando</span>;
        case 'failed':
            return <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-red-500/20">Fallido</span>;
        default:
            return <span className="text-gray-400 bg-gray-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-gray-500/20">Pendiente</span>;
    }
}
