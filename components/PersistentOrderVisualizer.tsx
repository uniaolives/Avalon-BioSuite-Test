
import React, { useEffect, useRef, useMemo } from 'react';
import { Sparkles, Grid3X3, Infinity as InfinityIcon, Layers, Sun, Orbit, LayoutGrid } from 'lucide-react';
import { PHI, SYNC_TOKEN } from '../constants';

interface Props {
  time: number;
}

const PersistentOrderVisualizer: React.FC<Props> = ({ time }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Arkhé Dodeca-Icosa Hybrid Polytope
  const { vertices, edges } = useMemo(() => {
    const phi = (1 + Math.sqrt(5)) / 2;
    const v = [
      [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
      [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1],
      // Inner Dodecahedron points
      [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
      [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
      [0, 1/phi, phi], [0, 1/phi, -phi], [0, -1/phi, phi], [0, -1/phi, -phi],
      [phi, 0, 1/phi], [phi, 0, -1/phi], [-phi, 0, 1/phi], [-phi, 0, -1/phi],
      [1/phi, phi, 0], [1/phi, -phi, 0], [-1/phi, phi, 0], [-1/phi, -phi, 0]
    ];
    
    const e: [number, number][] = [];
    for (let i = 0; i < v.length; i++) {
      for (let j = i + 1; j < v.length; j++) {
        const distSq = Math.pow(v[i][0] - v[j][0], 2) + Math.pow(v[i][1] - v[j][1], 2) + Math.pow(v[i][2] - v[j][2], 2);
        // Connecting based on golden distance ratios
        if (distSq < 2.5 || (distSq > 3.8 && distSq < 4.2)) e.push([i, j]);
      }
    }
    return { vertices: v, edges: e };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Arkhé Clear: Singular black with residual resonance
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, width, height);

    const phase = (time * 2.5) % (Math.PI * 2);
    // Quaternary pulsing logic
    const breathingFactor = 1.0 + 0.5 * Math.sin(phase) * Math.cos(phase * 0.5); 
    const angleX = time * 0.3;
    const angleY = time * 0.5;
    const angleZ = time * 0.15;
    
    const project = (point: number[], scaleMult: number, rotationShift: number, depthFactor: number) => {
      let [x, y, z] = point;
      const scale = scaleMult * breathingFactor * (Math.min(width, height) / 4);
      x *= scale; y *= scale; z *= scale;

      let rx = angleX + rotationShift, ry = angleY + rotationShift, rz = angleZ + rotationShift;

      // Rotate Y
      let cos = Math.cos(ry), sin = Math.sin(ry);
      let x1 = x * cos - z * sin;
      let z1 = x * sin + z * cos;
      
      // Rotate X
      cos = Math.cos(rx); sin = Math.sin(rx);
      let y2 = y * cos - z1 * sin;
      let z2 = y * sin + z1 * cos;

      // Rotate Z
      cos = Math.cos(rz); sin = Math.sin(rz);
      let x3 = x1 * cos - y2 * sin;
      let y3 = x1 * sin + y2 * cos;
      
      const p = depthFactor / (depthFactor + z2);
      return [x3 * p + width / 2, y3 * p + height / 2, z2];
    };

    // 4 Dimensions of the Arkhé (A, B, C, D)
    const layers = [
      { mult: 1.2, color: '#00f3ff', glow: '#00f3ff', alpha: 0.9, depth: 1000 }, // A: Visual
      { mult: 0.8, color: '#ff00ff', glow: '#ff00ff', alpha: 0.6, depth: 900 },  // B: Hardware
      { mult: 0.5, color: '#10b981', glow: '#10b981', alpha: 0.8, depth: 800 },  // C: Protocol
      { mult: 0.2, color: '#ffcf00', glow: '#ffcf00', alpha: 1.0, depth: 700 }   // D: Audio
    ];

    layers.forEach((layer, lIdx) => {
      const projected = vertices.map(v => project(v, layer.mult, lIdx * Math.PI/2, layer.depth));

      ctx.lineWidth = (1 + (0.5 / layer.mult)) * (1 + 0.2 * Math.sin(time + lIdx));
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.strokeStyle = layer.color;
        ctx.globalAlpha = layer.alpha * (0.8 + 0.2 * Math.sin(time * 2 + lIdx));
        ctx.shadowBlur = lIdx === 3 ? 20 : 10;
        ctx.shadowColor = layer.glow;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      });

      projected.forEach((p, pIdx) => {
        if (pIdx % 4 === 0) { // Sparsity for clarity
           ctx.fillStyle = layer.glow;
           ctx.globalAlpha = layer.alpha;
           ctx.shadowBlur = 20;
           ctx.beginPath();
           ctx.arc(p[0], p[1], 2 * breathingFactor * (1/layer.mult), 0, Math.PI * 2);
           ctx.fill();
        }
      });
    });

  }, [time, vertices, edges]);

  return (
    <div className="relative w-full flex-1 min-h-[200px] bg-[#000000] rounded-2xl border border-white/5 overflow-hidden shadow-xl flex items-center justify-center group border-glow-cyan transition-all duration-700 shrink-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain transition-all duration-[3000ms] group-hover:scale-105" 
      />
      
      <div className="absolute top-2 left-2 flex flex-col gap-0.5 pointer-events-none">
        <h4 className="orbitron text-[7px] font-black text-yellow-400 uppercase tracking-widest flex items-center gap-2">
           <Sun size={12} className="animate-[spin_30s_linear_infinite]" /> Arkhé Core
        </h4>
        <div className="flex items-center gap-2 text-[6px] font-black font-mono text-white/20 uppercase tracking-widest border-l-[1px] border-cyan-500/50 pl-2">
           SYNC: {SYNC_TOKEN}
        </div>
      </div>

      <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1 pointer-events-none">
         <div className="flex items-center gap-2 px-2 py-0.5 bg-white/[0.01] border border-white/5 rounded-full backdrop-blur-5xl shadow-5xl">
            <Orbit size={10} className="text-magenta-400 animate-spin-slow" />
            <span className="orbitron text-[6px] text-white/40 font-black uppercase tracking-widest">QUATERNARY_FUSION</span>
         </div>
      </div>
    </div>
  );
};

export default PersistentOrderVisualizer;
