import { useState, useRef, useEffect } from 'react';
import { PenTool, Eraser, Save, Trash2, Smartphone, Download } from 'lucide-react';
import api from '../services/api';

export default function TacticsPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [color, setColor] = useState('#3b82f6'); // Blue default
    const [tacticName, setTacticName] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Draw Court Background (PRO VERSION)
        drawCourt(ctx, canvas.width, canvas.height);

        // Resize handler
        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            drawCourt(ctx, canvas.width, canvas.height);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const drawCourt = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
        // 1. Floor (Parquet / Wood)
        ctx.fillStyle = '#eab308'; // Base yellow
        ctx.fillRect(0, 0, w, h);

        // Add subtle texture pattern if possible, or just gradient
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, '#eab308');
        gradient.addColorStop(1, '#ca8a04');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // 2. Goal Areas (The D-zone) - Cyan/Blue standard
        const areaColor = '#3b82f6';
        ctx.fillStyle = areaColor;

        // Left Area
        ctx.beginPath();
        // 6m line is roughly 6m radius from goal posts + straight lines
        // Simplified scaling: Let's assume w is 40m, h is 20m.
        // 6m is 15% of width.
        const radius6m = w * 0.15;
        ctx.moveTo(0, h / 2 - radius6m / 1.5);
        ctx.arc(0, h / 2, radius6m, -Math.PI / 2.5, Math.PI / 2.5, false);
        ctx.lineTo(0, h / 2 + radius6m);
        ctx.fill();

        // Right Area
        ctx.beginPath();
        ctx.moveTo(w, h / 2 - radius6m / 1.5);
        ctx.arc(w, h / 2, radius6m, Math.PI - Math.PI / 2.5, Math.PI + Math.PI / 2.5, false);
        ctx.lineTo(w, h / 2 + radius6m);
        ctx.fill();

        // 3. Information Lines (White, 5cm width -> ~2px)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'square';

        // Outer Boundary
        const margin = 20;
        ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);

        // Center Line
        ctx.beginPath();
        ctx.moveTo(w / 2, margin);
        ctx.lineTo(w / 2, h - margin);
        ctx.stroke();

        // Center Circle
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 20, 0, Math.PI * 2);
        ctx.stroke();

        // 9m Dashed Line (Free throw line)
        const radius9m = w * 0.225;
        ctx.setLineDash([10, 10]); // Dashed

        // Left 9m
        ctx.beginPath();
        ctx.arc(0, h / 2, radius9m, -Math.PI / 2.2, Math.PI / 2.2, false);
        ctx.stroke();

        // Right 9m
        ctx.beginPath();
        ctx.arc(w, h / 2, radius9m, Math.PI - Math.PI / 2.2, Math.PI + Math.PI / 2.2, false);
        ctx.stroke();

        ctx.setLineDash([]); // Reset to solid

        // 7m Penalty Mark (1m line)
        const dist7m = w * 0.175;
        ctx.beginPath();
        ctx.moveTo(dist7m, h / 2 - 5); ctx.lineTo(dist7m, h / 2 + 5); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w - dist7m, h / 2 - 5); ctx.lineTo(w - dist7m, h / 2 + 5); ctx.stroke();

        // 4m Goalkeeper Line
        const dist4m = w * 0.10;
        ctx.beginPath();
        ctx.moveTo(dist4m, h / 2 - 5); ctx.lineTo(dist4m, h / 2 + 5); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w - dist4m, h / 2 - 5); ctx.lineTo(w - dist4m, h / 2 + 5); ctx.stroke();

        // Goals (Visual representation)
        ctx.fillStyle = '#ef4444'; // Red Stripes
        ctx.fillRect(0, h / 2 - 20, 5, 40);
        ctx.fillRect(w - 5, h / 2 - 20, 5, 40);
    };

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        setIsDrawing(true);
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.lineWidth = tool === 'eraser' ? 20 : 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = tool === 'eraser' ? '#eab308' : color;

        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        drawCourt(ctx, canvas.width, canvas.height);
    };

    const downloadPNG = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `jugada_handball_${new Date().getTime()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const saveTactic = async () => {
        if (!tacticName) {
            alert("Por favor, ponle un nombre a la jugada primero.");
            return;
        }
        setSaving(true);
        try {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const imageBase64 = canvas.toDataURL();

            await api.post('/tactics/', {
                name: tacticName,
                description: "",
                image_base64: imageBase64
            });
            alert("Jugada guardada en la base de datos correctamente.");
        } catch (error) {
            console.error(error);
            alert("Error al guardar la jugada");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-7xl h-screen flex flex-col">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Smartphone className="text-green-500" size={32} />
                        Pizarra Táctica Profesional
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Cancha 40x20m • Áreas reglamentarias</p>
                </div>

                <div className="flex bg-[#0f0f0f] p-1 rounded-xl border border-white/10 gap-1">
                    <button onClick={() => setTool('pen')} title="Rotulador" className={`p-2 rounded-lg ${tool === 'pen' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                        <PenTool size={20} />
                    </button>
                    <button onClick={() => setTool('eraser')} title="Borrador" className={`p-2 rounded-lg ${tool === 'eraser' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                        <Eraser size={20} />
                    </button>
                    <div className="w-px bg-white/10 mx-1" />
                    <button onClick={() => setColor('#2563eb')} className={`w-8 h-8 rounded-full border-2 ${color === '#2563eb' ? 'border-white' : 'border-transparent'}`} style={{ background: '#2563eb' }} />
                    <button onClick={() => setColor('#dc2626')} className={`w-8 h-8 rounded-full border-2 ${color === '#dc2626' ? 'border-white' : 'border-transparent'}`} style={{ background: '#dc2626' }} />
                    <button onClick={() => setColor('#16a34a')} className={`w-8 h-8 rounded-full border-2 ${color === '#16a34a' ? 'border-white' : 'border-transparent'}`} style={{ background: '#16a34a' }} />
                    <button onClick={() => setColor('#ffffff')} className={`w-8 h-8 rounded-full border-2 ${color === '#ffffff' ? 'border-white' : 'border-transparent'}`} style={{ background: '#ffffff' }} />
                    <button onClick={() => setColor('#000000')} className={`w-8 h-8 rounded-full border-2 ${color === '#000000' ? 'border-white' : 'border-transparent'}`} style={{ background: '#000000' }} />
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Nombre de la jugada..."
                        value={tacticName}
                        onChange={(e) => setTacticName(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm w-48 focus:outline-none focus:border-blue-500"
                    />
                    <button onClick={clearCanvas} title="Limpiar todo" className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors">
                        <Trash2 size={20} />
                    </button>
                    <button onClick={downloadPNG} title="Descargar PNG" className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-colors">
                        <Download size={20} />
                    </button>
                    <button onClick={saveTactic} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50">
                        <Save size={20} />
                        {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-[#1a1a1a] rounded-xl border-4 border-gray-800 overflow-hidden relative shadow-2xl">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur p-4 rounded-xl border border-white/10 flex flex-col gap-4 text-xs text-gray-400 select-none pointer-events-none">
                    <div className="text-center font-bold mb-1">Leyenda</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Propietario</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Rival</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Balón</div>
                </div>
            </div>
        </section>
    );
}
