import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Shield, Trash2, Save, X, Upload } from 'lucide-react';
import api, { uploadFile } from '../services/api';

interface Team {
    id: number;
    name: string;
    category: string;
    coach_name: string;
    logo_path?: string;
    stats: {
        wins: number;
        draws: number;
        losses: number;
    } | string;
    player_count?: number;
}

export default function TeamsPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Senior Masculino',
        coach_name: '',
        logo: null as File | null
    });

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const res = await api.get('/teams/');
            setTeams(res.data);
        } catch (error) {
            console.error("Error fetching teams", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Borrar equipo y todos sus jugadores?")) return;
        try {
            await api.delete(`/teams/${id}`);
            fetchTeams();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                name: formData.name,
                category: formData.category,
                coach_name: formData.coach_name
            };

            if (formData.logo) {
                await uploadFile('/teams/', formData.logo, 'logo', data);
            } else {
                const fData = new FormData();
                fData.append('name', data.name);
                fData.append('category', data.category);
                fData.append('coach_name', data.coach_name);
                await api.post('/teams/', fData); // Endpoint expects FormData logic in backend
            }

            fetchTeams();
            setIsModalOpen(false);
            setFormData({ name: '', category: 'Senior Masculino', coach_name: '', logo: null });
        } catch (error) {
            console.error("Error creating team:", error);
            alert("Error al crear equipo");
        }
    };

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-7xl">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Users className="text-blue-500" size={32} />
                        Gestión de Equipos
                    </h2>
                    <p className="text-gray-400 mt-2">Administra tus plantillas, categorías y cuerpos técnicos.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                >
                    <Plus size={20} />
                    Crear Equipo
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Cargando equipos...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {teams.map(team => (
                            <motion.div
                                key={team.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group relative"
                            >
                                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDelete(team.id)} className="p-2 bg-red-500/20 hover:bg-red-500/50 rounded-lg text-red-400 hover:text-white transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="h-32 bg-gradient-to-r from-blue-900/20 to-purple-900/20 relative p-6">
                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-[#0f0f0f] absolute -bottom-8 overflow-hidden">
                                        {team.logo_path ? (
                                            <img src={`http://localhost:5000${team.logo_path}`} alt={team.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{team.name.substring(0, 2).toUpperCase()}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-12 p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                                        <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                                            {team.category}
                                        </span>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-400">
                                            <Shield size={16} className="text-gray-500" />
                                            <span>Entrenador: <span className="text-white">{team.coach_name || 'Sin asignar'}</span></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-400 cursor-pointer hover:text-blue-400 transition-colors" onClick={() => window.location.href = `/app/players?team=${team.id}`}>
                                            <Users size={16} className="text-gray-500" />
                                            <span>Plantilla: <span className="text-white hover:underline">{team.player_count || 0} Jugadores</span></span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => window.location.href = `/app/players?team=${team.id}`}
                                        className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-bold text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <Users size={16} /> Gestionar Plantilla
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* New Team Card Placeholder (Functional trigger) */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-500 hover:border-blue-500/50 hover:text-blue-500 hover:bg-blue-500/5 transition-all min-h-[300px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <Plus size={32} />
                        </div>
                        <span className="font-medium">Añadir Nuevo Equipo</span>
                    </button>
                </div>
            )}

            {/* Create Team Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a] rounded-t-2xl">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Shield className="text-blue-500" /> Nuevo Equipo
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Nombre del Equipo</label>
                                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ej. Senior Masculino A" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
                                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                                        value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Entrenador Principal</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                                        value={formData.coach_name} onChange={e => setFormData({ ...formData, coach_name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Escudo / Logo</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center hover:border-blue-500/50 transition-colors cursor-pointer relative group">
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={e => setFormData({ ...formData, logo: e.target.files ? e.target.files[0] : null })} />
                                        <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-blue-400">
                                            <Upload size={24} />
                                            <span className="text-xs">{formData.logo ? formData.logo.name : 'Click para subir logo'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg hover:bg-white/5 transition-colors">Cancelar</button>
                                    <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold flex items-center gap-2">
                                        <Save size={18} /> Crear Equipo
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
