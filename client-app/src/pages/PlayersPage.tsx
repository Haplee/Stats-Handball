import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, User } from 'lucide-react';

interface PlayerStats {
    goals: number;
    assists: number;
    steals: number;
    efficiency: number;
}

interface Player {
    id: number;
    name: string;
    number: number;
    position: string;
    team: string; // Team ID or name reference
    age: number;
    height: number; // cm
    weight: number; // kg
    stats: PlayerStats;
    image?: string;
}

export default function PlayersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPosition, setSelectedPosition] = useState<string>('all');

    // Mock Players Data
    const players: Player[] = [
        {
            id: 1,
            name: 'Alex Dujshebaev',
            number: 10,
            position: 'Lateral Derecho',
            team: 'Senior Masculino A',
            age: 28,
            height: 188,
            weight: 92,
            stats: { goals: 84, assists: 120, steals: 15, efficiency: 68 },
            image: 'https://images.unsplash.com/photo-1549488347-19ad08035259?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 2,
            name: 'Gonzalo Pérez',
            number: 1,
            position: 'Portero',
            team: 'Senior Masculino A',
            age: 30,
            height: 202,
            weight: 105,
            stats: { goals: 2, assists: 45, steals: 3, efficiency: 38 }, // Efficiency for GK = Save rate
            image: ''
        },
        {
            id: 3,
            name: 'Ludovic Fabregas',
            number: 72,
            position: 'Pivote',
            team: 'Senior Masculino A',
            age: 26,
            height: 198,
            weight: 100,
            stats: { goals: 102, assists: 12, steals: 24, efficiency: 82 },
            image: ''
        },
    ];

    const filteredPlayers = players.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPos = selectedPosition === 'all' || p.position === selectedPosition;
        return matchesSearch && matchesPos;
    });

    const positions = ['all', 'Portero', 'Extremo Izquierdo', 'Lateral Izquierdo', 'Central', 'Lateral Derecho', 'Extremo Derecho', 'Pivote'];

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <User className="text-purple-500" size={32} />
                        Base de Datos de Jugadores
                    </h2>
                    <p className="text-gray-400 mt-2">Seguimiento individual, estadísticas y fichas técnicas.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar jugador..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 w-64"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <select
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                            className="bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-8 py-3 text-sm focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                        >
                            {positions.map(pos => (
                                <option key={pos} value={pos}>{pos === 'all' ? 'Todas las posiciones' : pos}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlayers.map(player => (
                    <motion.div
                        key={player.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group relative"
                    >
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative">
                            {player.image ? (
                                <img src={player.image} alt={player.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
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
                                <p className="text-gray-400 text-xs">{player.team}</p>
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded text-xs font-bold uppercase">{player.position}</span>
                                <span className="text-gray-500">{player.age} Años  • {player.height}cm</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-xl p-3">
                                <div className="text-center">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Goles</div>
                                    <div className="font-mono font-bold text-white">{player.stats.goals}</div>
                                </div>
                                <div className="text-center border-l border-white/5">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Asis</div>
                                    <div className="font-mono font-bold text-white">{player.stats.assists}</div>
                                </div>
                                <div className="text-center border-l border-white/5">
                                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Efic%</div>
                                    <div className={`font-mono font-bold ${player.stats.efficiency >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {player.stats.efficiency}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
