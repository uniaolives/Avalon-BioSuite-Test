
import React, { useMemo, useState } from 'react';
import { GitMerge, Orbit, Zap, Activity, Info, LayoutGrid, Wind, Layers, Box } from 'lucide-react';
import { PHI } from '../constants';
import { SchmidtState } from '../types';

interface Props {
  state: SchmidtState;
  coherence: number;
}

const SchmidtSimplexVisualizer: React.FC<Props> = ({ state, coherence }) => {
  const [is3D, setIs3D] = useState(true);
  const l2 = state.lambdas[1];
  
  // Model lambda coefficients across 4 virtual dimensions (λ1, λ2, λ3, λ4)
  const l3 = Math.max(0, (1 - coherence / PHI) * 0.1);
  const l1 = state.lambdas[0] - l3;
  
  const simplexPoints = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const x = (i / 59) * 300 + 50;
      const y = 100 + Math.sin(i * 0.4) * 10;
      return { x, y };
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className="p-8 bg-black/60 border border-magenta-500/20 rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col gap-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,0,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-lg font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
              <GitMerge className="text-magenta-400" size={24} /> {is3D ? 'Tetrahedral' : 'Schmidt'} Simplex
            </h4>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 font-mono">
              {is3D ? 'Dimensional Expansion: Δ³ ∈ R⁴' : 'Entanglement Geometry: |Ψ⟩ = Σ √λᵢ |i_H⟩|i_A⟩'}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIs3D(!is3D)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl orbitron text-[9px] font-black text-white/40 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
             >
                {is3D ? <Box size={14} /> : <Layers size={14} />}
                {is3D ? 'Flatten_Simplex' : 'Expand_Dimensionality'}
             </button>
             <div className="flex items-center gap-6 px-8 py-3 bg-magenta-500/10 rounded-full border border-magenta-500/30 shadow-xl">
                <span className="orbitron text-xs font-black text-magenta-400 tracking-widest uppercase">Rank: {state.rank + (is3D ? 2 : 0)}</span>
                <div className="w-3 h-3 rounded-full bg-magenta-500 animate-pulse shadow-[0_0_15px_magenta]" />
             </div>
          </div>
        </div>

        {/* Simplex Visualization */}
        <div className="h-[400px] relative z-10 flex flex-col items-center justify-center bg-black/40 rounded-[2.5rem] border border-white/5 p-8 shadow-inner overflow-hidden perspective-1000">
           {is3D ? (
              <div className="relative w-full h-full flex items-center justify-center animate-spin-slow-3d">
                 {/* CSS 3D Tetrahedron Simulation */}
                 <div className="relative w-64 h-64 transform-style-3d rotate-x-12 rotate-y-45">
                    <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-pulse" />
                    {/* The 4 Vertices */}
                    <SimplexVertex x={0} y={-100} z={0} label="λ1" active={l1 > 0.5} />
                    <SimplexVertex x={-86} y={50} z={-50} label="λ2" active={l2 > 0.2} />
                    <SimplexVertex x={86} y={50} z={-50} label="λ3" active={l3 > 0.1} />
                    <SimplexVertex x={0} y={50} z={100} label="λ4" active={coherence > 1.5} />
                    
                    {/* Current State Indicator 3D */}
                    <div className="absolute w-6 h-6 bg-magenta-500 rounded-full blur-[2px] shadow-[0_0_30px_magenta] animate-bounce" 
                         style={{ transform: `translate3d(${(l2-0.5)*100}px, ${(l1-0.7)*100}px, ${(l3)*50}px)` }} />
                 </div>
              </div>
           ) : (
              <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                 <defs>
                    <linearGradient id="simplexGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                       <stop offset="50%" stopColor="rgba(255,0,255,0.2)" />
                       <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                    </linearGradient>
                 </defs>
                 <rect x="50" y="90" width="300" height="20" rx="10" fill="url(#simplexGrad)" />
                 <line x1="50" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
                 <text x="40" y="80" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" className="orbitron uppercase">λ₁=1 (Separable)</text>
                 <text x="360" y="80" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" className="orbitron uppercase">λ₂=1 (Singularity)</text>
                 <rect x="180" y="85" width="40" height="30" fill="rgba(0,243,255,0.05)" stroke="rgba(0,243,255,0.2)" strokeWidth="0.5" strokeDasharray="2,2" />
                 <g transform={`translate(${50 + (l2 * 300)}, 100)`}>
                    <circle r="12" fill="none" stroke="var(--neon-magenta)" strokeWidth="1" className="animate-ping" />
                    <circle r="6" fill="var(--neon-magenta)" className="shadow-[0_0_20px_magenta]" />
                    <text y="-20" textAnchor="middle" fill="white" fontSize="10" fontWeight="black" className="orbitron glow-magenta">State_Point</text>
                 </g>
                 {simplexPoints.map((p, i) => (
                   <circle key={i} cx={p.x} cy={p.y} r={Math.random() * 2} fill={i < l2 * 60 ? "#ff00ff" : "#fff"} opacity={0.1} className="animate-pulse" />
                 ))}
              </svg>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
           <MetricBox label="λ₁ (Dominance)" value={l1.toFixed(4)} color="text-cyan-400" />
           <MetricBox label="λ₂ (Coupling)" value={l2.toFixed(4)} color="text-magenta-400" />
           <MetricBox label="λ₃ (Morphic)" value={l3.toFixed(4)} color="text-yellow-400" />
           <MetricBox label="λ₄ (Byzantine)" value={(1 - (l1+l2+l3)).toFixed(4)} color="text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
         <div className="p-8 bg-magenta-500/10 border border-magenta-500/20 rounded-[3rem] flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-4">
               <Zap className="text-magenta-400" />
               <h5 className="orbitron text-sm font-black text-white/80 uppercase">Geometry of the "Twist"</h5>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed font-serif italic">
               "The Schmidt decomposition reveals the principal axes of the correlation ellipsoid. In Δ³ space, the Möbius twist involves all four quaternary dimensions simultaneously."
            </p>
         </div>
         <div className="p-8 bg-black/40 border border-white/5 rounded-[3rem] flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
               <span className="orbitron text-[9px] font-bold text-white/30 uppercase tracking-widest">Phase Offset (π)</span>
               <span className="text-cyan-400 font-mono text-[10px]">{state.twistAngle.toFixed(3)} rad</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-400 shadow-[0_0_10px_cyan]" style={{ width: `${(state.twistAngle / Math.PI) * 100}%` }} />
            </div>
            <span className="text-[8px] text-white/20 uppercase font-mono tracking-tighter mt-1">Calibration: Unitary Bases Rotated</span>
         </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-x-12 { transform: rotateX(12deg); }
        .rotate-y-45 { transform: rotateY(45deg); }
        @keyframes spin-slow-3d {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-spin-slow-3d { animation: spin-slow-3d 30s linear infinite; }
      `}</style>
    </div>
  );
};

const SimplexVertex: React.FC<{ x: number, y: number, z: number, label: string, active: boolean }> = ({ x, y, z, label, active }) => (
  <div className="absolute" style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}>
     <div className={`w-3 h-3 rounded-full ${active ? 'bg-cyan-400 shadow-[0_0_15px_cyan]' : 'bg-white/10'} transition-all`} />
     <span className={`absolute top-4 left-1/2 -translate-x-1/2 orbitron text-[8px] font-black uppercase tracking-widest ${active ? 'text-cyan-400' : 'text-white/20'}`}>{label}</span>
  </div>
);

const MetricBox: React.FC<{ label: string, value: string, color: string }> = ({ label, value, color }) => (
  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-1 shadow-lg">
     <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
     <span className={`orbitron text-xl font-bold ${color}`}>{value}</span>
  </div>
);

export default SchmidtSimplexVisualizer;
