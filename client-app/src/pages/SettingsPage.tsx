import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Bell, Palette, Database, LogOut, Check, Save, Shield, Download, Trash2, Mail, Lock } from 'lucide-react';
import api from '../services/api';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [accentColor, setAccentColor] = useState('blue');
    const [theme, setTheme] = useState('dark');

    // Notifications State
    const [notifications, setNotifications] = useState({
        emailMatches: true,
        emailReports: false,
        pushAlerts: true,
        pushNews: false
    });

    // Profile State
    const [profile, setProfile] = useState({
        name: 'Francisco', // Mock data - ideally from context/api
        email: 'admin@stats-handball.com',
        currentPassword: '',
        newPassword: ''
    });

    const handleLogout = async () => {
        if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
            try {
                await api.post('/auth/logout');
                localStorage.removeItem('user_id'); // basic cleanup
                window.location.href = '/'; // Redirect to landing (mock login)
            } catch (e) {
                console.error(e);
                // Force logout anyway on client
                localStorage.removeItem('user_id');
                window.location.href = '/';
            }
        }
    }

    const tabs = [
        { id: 'general', icon: <Palette size={18} />, label: 'Apariencia' },
        { id: 'profile', icon: <User size={18} />, label: 'Mi Perfil' },
        { id: 'notifications', icon: <Bell size={18} />, label: 'Notificaciones' },
        { id: 'data', icon: <Database size={18} />, label: 'Datos y Almacenamiento' },
    ];

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Settings className="text-gray-400" size={32} />
                Configuración
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex flex-col gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                    <div className="h-px bg-white/10 my-4" />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 min-h-[500px]">
                    <AnimatePresence mode="wait">

                        {/* APPEARANCE */}
                        {activeTab === 'general' && (
                            <motion.div
                                key="general"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Color de Acento</h3>
                                    <div className="flex gap-4">
                                        {[
                                            { name: 'blue', class: 'bg-blue-600' },
                                            { name: 'purple', class: 'bg-purple-600' },
                                            { name: 'green', class: 'bg-green-600' },
                                            { name: 'orange', class: 'bg-orange-600' }
                                        ].map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => setAccentColor(c.name)}
                                                className={`w-12 h-12 rounded-full ${c.class} flex items-center justify-center ring-2 ring-offset-4 ring-offset-[#0f0f0f] transition-all ${accentColor === c.name ? 'ring-white scale-110' : 'ring-transparent opacity-70 hover:opacity-100 hover:scale-105'}`}
                                            >
                                                {accentColor === c.name && <Check size={20} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Modo de Visualización</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            onClick={() => setTheme('dark')}
                                            className={`border-2 rounded-xl p-4 bg-[#1a1a1a] cursor-pointer transition-all ${theme === 'dark' ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-transparent hover:border-white/20'}`}
                                        >
                                            <div className="h-20 bg-gray-800 rounded mb-3 border border-white/5"></div>
                                            <span className="text-sm font-bold block mb-1">Oscuro (Por defecto)</span>
                                            <span className="text-xs text-gray-500">Menos fatiga visual</span>
                                        </div>
                                        <div
                                            onClick={() => setTheme('light')}
                                            className={`border-2 rounded-xl p-4 bg-gray-200 cursor-pointer transition-all opacity-80 ${theme === 'light' ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-transparent hover:border-white/20'}`}
                                        >
                                            <div className="h-20 bg-white rounded mb-3 border border-gray-300"></div>
                                            <span className="text-sm font-bold text-gray-900 block mb-1">Claro</span>
                                            <span className="text-xs text-gray-600">Mayor contraste</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* PROFILE */}
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold border-4 border-[#0f0f0f] shadow-xl">
                                        {profile.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{profile.name}</h3>
                                        <p className="text-gray-400">Administrador</p>
                                        <button className="text-sm text-blue-400 hover:text-blue-300 mt-1 font-medium">Cambiar Avatar</button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                type="text"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Correo Electrónico</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                type="email"
                                                disabled
                                                className="w-full bg-black/20 border border-white/5 rounded-lg pl-10 pr-4 py-3 text-gray-400 cursor-not-allowed"
                                                value={profile.email}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><Shield size={18} /> Seguridad</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña Actual</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Nueva Contraseña</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <input
                                                        type="password"
                                                        placeholder="Mínimo 8 caracteres"
                                                        className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
                                        <Save size={18} /> Guardar Cambios
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* NOTIFICATIONS */}
                        {activeTab === 'notifications' && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-bold mb-2">Preferencias de Alerta</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div>
                                            <div className="font-bold flex items-center gap-2"><Mail size={16} /> Resumen de Procesamiento</div>
                                            <p className="text-sm text-gray-400">Recibe un email cuando termine de analizar un video.</p>
                                        </div>
                                        <div
                                            onClick={() => setNotifications({ ...notifications, emailMatches: !notifications.emailMatches })}
                                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notifications.emailMatches ? 'bg-green-500' : 'bg-gray-700'}`}
                                        >
                                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications.emailMatches ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div>
                                            <div className="font-bold flex items-center gap-2"><Mail size={16} /> Informes Semanales</div>
                                            <p className="text-sm text-gray-400">Resumen semanal del rendimiento de tu equipo.</p>
                                        </div>
                                        <div
                                            onClick={() => setNotifications({ ...notifications, emailReports: !notifications.emailReports })}
                                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notifications.emailReports ? 'bg-green-500' : 'bg-gray-700'}`}
                                        >
                                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications.emailReports ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div>
                                            <div className="font-bold flex items-center gap-2"><Bell size={16} /> Notificaciones Push</div>
                                            <p className="text-sm text-gray-400">Alertas en el navegador cuando estés online.</p>
                                        </div>
                                        <div
                                            onClick={() => setNotifications({ ...notifications, pushAlerts: !notifications.pushAlerts })}
                                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notifications.pushAlerts ? 'bg-green-500' : 'bg-gray-700'}`}
                                        >
                                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications.pushAlerts ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* DATA & STORAGE */}
                        {activeTab === 'data' && (
                            <motion.div
                                key="data"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h3 className="text-xl font-bold mb-4">Gestión de Datos</h3>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-bold">Exportar todos mis datos</div>
                                                <p className="text-sm text-gray-400">Descarga un JSON con todos tus jugadores, partidos y estadísticas.</p>
                                            </div>
                                            <button className="px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-bold flex items-center gap-2">
                                                <Download size={16} /> Exportar
                                            </button>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-bold text-red-400">Borrar Caché Local</div>
                                                <p className="text-sm text-gray-400">Libera espacio eliminando miniaturas y datos temporales.</p>
                                            </div>
                                            <button className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm font-bold flex items-center gap-2">
                                                <Trash2 size={16} /> Limpiar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">Almacenamiento en Nube</h3>
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Uso Actual</span>
                                            <span className="font-mono font-bold">4.2 GB / 10 GB</span>
                                        </div>
                                        <div className="h-4 bg-black/50 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[42%]"></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-4 text-center">
                                            Plan Gratuito. <span className="text-blue-400 cursor-pointer hover:underline">Mejorar a PRO</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
