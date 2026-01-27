import { useState, useRef, useEffect } from 'react';

import { PenTool, Eraser, Save, Trash2, Smartphone } from 'lucide-react';

export default function TacticsPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const [color, setColor] = useState('#3b82f6'); // Blue default

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Draw Court Background (Simplified)
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
        // Floor
        ctx.fillStyle = '#eab308'; // Yellow wood ish
        ctx.fillRect(0, 0, w, h);

        // Areas (Blue)
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(0, 0, w / 6, h); // Goal area left
        ctx.fillRect(w - w / 6, 0, w / 6, h); // Goal area right

        // Lines
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, w - 40, h - 40); // Outer boundary
        ctx.moveTo(w / 2, 20); ctx.lineTo(w / 2, h - 20); ctx.stroke(); // Center line

        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 30, 0, Math.PI * 2); ctx.stroke(); // Center circle
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
        ctx.strokeStyle = tool === 'eraser' ? '#eab308' : color; // Eraser just paints over with floor color (simplified)

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

    return (
        <section className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-7xl h-screen flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Smartphone className="text-green-500" size={32} />
                        Pizarra Táctica
                    </h2>
                </div>

                <div className="flex bg-[#0f0f0f] p-1 rounded-xl border border-white/10 gap-1">
                    <button onClick={() => setTool('pen')} className={`p-2 rounded-lg ${tool === 'pen' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                        <PenTool size={20} />
                    </button>
                    <button onClick={() => setTool('eraser')} className={`p-2 rounded-lg ${tool === 'eraser' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}>
                        <Eraser size={20} />
                    </button>
                    <div className="w-px bg-white/10 mx-1" />
                    <button onClick={() => setColor('#3b82f6')} className={`w-8 h-8 rounded-full border-2 ${color === '#3b82f6' ? 'border-white' : 'border-transparent'}`} style={{ background: '#3b82f6' }} />
                    <button onClick={() => setColor('#ef4444')} className={`w-8 h-8 rounded-full border-2 ${color === '#ef4444' ? 'border-white' : 'border-transparent'}`} style={{ background: '#ef4444' }} />
                    <button onClick={() => setColor('#ffffff')} className={`w-8 h-8 rounded-full border-2 ${color === '#ffffff' ? 'border-white' : 'border-transparent'}`} style={{ background: '#ffffff' }} />
                    <button onClick={() => setColor('#000000')} className={`w-8 h-8 rounded-full border-2 ${color === '#000000' ? 'border-white' : 'border-transparent'}`} style={{ background: '#000000' }} />
                </div>

                <div className="flex gap-3">
                    <button onClick={clearCanvas} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors">
                        <Trash2 size={20} />
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2">
                        <Save size={20} />
                        Guardar Jugada
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-[#1a1a1a] rounded-3xl border-4 border-gray-800 overflow-hidden relative shadow-2xl">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />

                {/* Draggable Icons Palette (Visual Only for now) */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur p-4 rounded-xl border border-white/10 flex flex-col gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white cursor-move flex items-center justify-center font-bold text-xs">1</div>
                    <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white cursor-move flex items-center justify-center font-bold text-xs">A</div>
                    <div className="w-6 h-6 rounded-full bg-yellow-400 border border-black cursor-move"></div>
                </div>
            </div>
        </section>
    );
}
