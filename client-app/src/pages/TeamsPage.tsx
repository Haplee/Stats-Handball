import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, MoreVertical, Shield, ChevronRight, Calendar } from 'lucide-react';


interface Player {
    id: number;
    name: string;
    number: number;
    position: string;
    avatar?: string;
}

interface Team {
    id: number;
    name: string;
    category: string;
    coach: string;
    players: Player[];
    nextMatch?: string;
    stats: {
        wins: number;
        draws: number;
        losses: number;
    };
}

export default function TeamsPage() {
    const [teams] = useState<Team[]>([
        {
            id: 1,
            name: 'Senior Masculino A',
            category: '1ª Nacional',
            coach: 'Paco García',
            nextMatch: 'vs BM Granollers B (29 Ene)',
            stats: { wins: 12, draws: 2, losses: 4 },
            players: [
                { id: 101, name: 'Alex Dujshebaev', number: 10, position: 'Lateral Derecho' },
                { id: 102, name: 'Gonzalo Pérez', number: 1, position: 'Portero' },
            ]
        },
        {
            id: 2,
            name: 'Juvenil Femenino',
            category: 'Liga Autonómica',
            coach: 'Laura M.',
            nextMatch: 'vs Maristas (01 Feb)',
            stats: { wins: 8, draws: 0, losses: 1 },
            players: []
        }
    ]);

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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                >
                    <Plus size={20} />
                    Crear Equipo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map(team => (
                    <motion.div
                        key={team.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group"
                    >
                        <div className="h-32 bg-gradient-to-r from-blue-900/20 to-purple-900/20 relative p-6">
                            <div className="absolute top-4 right-4">
                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-[#0f0f0f] absolute -bottom-8">
                                {team.name.substring(0, 2).toUpperCase()}
                            </div>
                        </div>

                        <div className="pt-12 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                                    <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                                        {team.category}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <Shield size={16} className="text-gray-500" />
                                    <span>Entrenador: <span className="text-white">{team.coach}</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <Users size={16} className="text-gray-500" />
                                    <span>Plantilla: <span className="text-white">{team.players.length} Jugadores</span></span>
                                </div>
                                {team.nextMatch && (
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <Calendar size={16} className="text-gray-500" />
                                        <span>Próx: <span className="text-yellow-400">{team.nextMatch}</span></span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/5">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-green-400">{team.stats.wins}</div>
                                    <div className="text-[10px] uppercase text-gray-500 font-bold">Victorias</div>
                                </div>
                                <div className="text-center border-l border-white/5">
                                    <div className="text-lg font-bold text-gray-300">{team.stats.draws}</div>
                                    <div className="text-[10px] uppercase text-gray-500 font-bold">Empates</div>
                                </div>
                                <div className="text-center border-l border-white/5">
                                    <div className="text-lg font-bold text-red-400">{team.stats.losses}</div>
                                    <div className="text-[10px] uppercase text-gray-500 font-bold">Derrotas</div>
                                </div>
                            </div>

                            <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:text-blue-400">
                                Gestionar Plantilla
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {/* New Team Card Placeholder */}
                <button
                    className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-500 hover:border-blue-500/50 hover:text-blue-500 hover:bg-blue-500/5 transition-all min-h-[400px]"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <Plus size={32} />
                    </div>
                    <span className="font-medium">Añadir Nuevo Equipo</span>
                </button>
            </div>
        </section>
    );
}
