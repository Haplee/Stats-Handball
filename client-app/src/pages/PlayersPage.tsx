import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, User, Plus, X, Upload, Save, Trash2, Edit2, Shield } from 'lucide-react';
import api, { uploadFile } from '../services/api';

interface Player {
    id: number;
    name: string;
    number: number;
    position: string;
    team_id?: number;
    height?: number; // cm
    weight?: number; // kg
    date_of_birth?: string;
    photo_path?: string;
    stats: {
        goals: number;
        assists: number;
        efficiency: number; // calculated field or stored
    };
}

interface Team {
    id: number;
    name: string;
}

export default function PlayersPage() {
    const [searchParams] = useSearchParams();
    const [players, setPlayers] = useState<Player[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPosition, setSelectedPosition] = useState<string>('all');
    const [selectedTeam, setSelectedTeam] = useState<string>(searchParams.get('team') || 'all');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        position: 'Lateral Izquierdo',
        team_id: '',
        height: '',
        weight: '',
        date_of_birth: '',
        photo: null as File | null
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const teamParam = searchParams.get('team');
        if (teamParam) {
            setSelectedTeam(teamParam);
        }
    }, [searchParams]);

    const fetchData = async () => {
        try {
            const [playersRes, teamsRes] = await Promise.all([
                api.get('/players/'),
                api.get('/teams/')
            ]);
            setPlayers(playersRes.data);
            setTeams(teamsRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (player?: Player) => {
        if (player) {
            setEditingPlayer(player);
            setFormData({
                name: player.name,
                number: player.number.toString(),
                position: player.position,
                team_id: player.team_id?.toString() || '',
                height: player.height?.toString() || '',
                weight: player.weight?.toString() || '',
                date_of_birth: player.date_of_birth || '',
                photo: null
            });
        } else {
            setEditingPlayer(null);
            setFormData({
                name: '',
                number: '',
                position: 'Lateral Izquierdo',
                team_id: selectedTeam !== 'all' ? selectedTeam : '', // Auto-select team if filtering
                height: '',
                weight: '',
                date_of_birth: '',
                photo: null
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data: any = {
                name: formData.name,
                number: formData.number,
                position: formData.position,
                team_id: formData.team_id,
                height: formData.height,
                weight: formData.weight,
                date_of_birth: formData.date_of_birth
            };

            if (editingPlayer) {
                // Update
                if (formData.photo) {
                    await uploadFile(`/players/${editingPlayer.id}`, formData.photo, 'photo', data);
                } else {
                    await api.put(`/players/${editingPlayer.id}`, data);
                }
            } else {
                // Create
                if (formData.photo) {
                    await uploadFile('/players/', formData.photo, 'photo', data);
                } else {
                    const fData = new FormData();
                    Object.keys(data).forEach(k => fData.append(k, data[k]));
                    await api.post('/players/', fData);
                }
            }

            fetchData();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving player:", error);
            alert("Error al guardar jugador");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este jugador?")) return;
        try {
            await api.delete(`/players/${id}`);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredPlayers = players.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPos = selectedPosition === 'all' || p.position === selectedPosition;
        const matchesTeam = selectedTeam === 'all' || (p.team_id && p.team_id.toString() === selectedTeam);
        return matchesSearch && matchesPos && matchesTeam;
    });

    const positions = ['all', 'Portero', 'Extremo Izquierdo', 'Lateral Izquierdo', 'Central', 'Lateral Derecho', 'Extremo Derecho', 'Pivote'];
    const formPositions = positions.filter(p => p !== 'all');

    // Helper to get team name
    const getTeamName = (id?: number) => teams.find(t => t.id === id)?.name || 'Sin Equipo';

    // Helper to calculate age
    const calculateAge = (dob?: string) => {
        if (!dob) return '-';
        const birthDate = new Date(dob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <User className="text-purple-500" size={32} />
                        Base de Datos de Jugadores
                    </h2>
                    <p className="text-gray-400 mt-2">Gestión profesional de fichas técnicas y estadísticas.</p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 w-48"
                        />
                    </div>

                    {/* Team Filter */}
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <select
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                            className="bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-8 py-3 text-sm focus:outline-none focus:border-purple-500 appearance-none cursor-pointer w-48"
                        >
                            <option value="all">Todos los Equipos</option>
                            {teams.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Position Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className="bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-8 py-3 text-sm focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                        >
                            <option value="all">Todas las posiciones</option>
                            {positions.map(pos => (
                                pos !== 'all' && <option key={pos} value={pos}>{pos}</option>
                            ))}
                        </select>
                    </div>

                    <button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                        <Plus size={20} />
                        Nuevo Jugador
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Cargando base de datos...</div>
            ) : filteredPlayers.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <User size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400">No hay jugadores registrados.</p>
                    <button onClick={() => handleOpenModal()} className="mt-4 text-purple-400 hover:text-purple-300 text-sm font-bold">
                        + Añadir el primero
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredPlayers.map(player => (
                            <motion.div
                                key={player.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group relative"
                            >
                                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <button onClick={() => handleOpenModal(player)} className="p-2 bg-black/50 hover:bg-black/80 rounded-lg text-white"><Edit2 size={14} /></button>
                                    <button onClick={() => handleDelete(player.id)} className="p-2 bg-red-500/50 hover:bg-red-500/80 rounded-lg text-white"><Trash2 size={14} /></button>
                                </div>

                                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative">
                                    {player.photo_path ? (
                                        <img src={`http://localhost:5000${player.photo_path}`} alt={player.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                                            <User size={64} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-lg font-bold border border-white/10">
                                        #{player.number}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                                        <h3 className="text-lg font-bold truncate">{player.name}</h3>
                                        <p className="text-gray-400 text-xs truncate">{getTeamName(player.team_id)}</p>
                                    </div>
                                </div>

                                <div className="p-4 space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded text-xs font-bold uppercase truncate max-w-[120px]">{player.position}</span>
                                        <span className="text-gray-500 text-xs">{calculateAge(player.date_of_birth)} Años {player.height && `• ${player.height}cm`}</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-xl p-3">
                                        <div className="text-center">
                                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Goles</div>
                                            <div className="font-mono font-bold text-white text-sm">{player.stats?.goals || 0}</div>
                                        </div>
                                        <div className="text-center border-l border-white/5">
                                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Asis</div>
                                            <div className="font-mono font-bold text-white text-sm">{player.stats?.assists || 0}</div>
                                        </div>
                                        <div className="text-center border-l border-white/5">
                                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Efic%</div>
                                            <div className="font-mono font-bold text-green-400 text-sm">{player.stats?.efficiency || 0}%</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#1a1a1a] z-10">
                                <h3 className="text-xl font-bold">{editingPlayer ? 'Editar Jugador' : 'Nuevo Jugador'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                                            <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Dorsal</label>
                                                <input type="number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                                    value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Equipo</label>
                                                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                                    value={formData.team_id} onChange={e => setFormData({ ...formData, team_id: e.target.value })}>
                                                    <option value="">Seleccionar...</option>
                                                    {teams.map(t => (
                                                        <option key={t.id} value={t.id}>{t.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Posición</label>
                                            <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                                value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })}>
                                                {formPositions.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Foto del Jugador</label>
                                            <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors cursor-pointer relative group">
                                                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={e => setFormData({ ...formData, photo: e.target.files ? e.target.files[0] : null })} />
                                                <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-purple-400">
                                                    <Upload size={24} />
                                                    <span className="text-xs">{formData.photo ? formData.photo.name : 'Click para subir foto'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Altura (cm)</label>
                                                <input type="number" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                                    value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Peso (kg)</label>
                                                <input type="number" step="0.1" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                                    value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Fecha Nacimiento</label>
                                            <input type="date" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
                                                value={formData.date_of_birth} onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg hover:bg-white/5 transition-colors">Cancelar</button>
                                    <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold flex items-center gap-2">
                                        <Save size={18} /> Guardar
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
