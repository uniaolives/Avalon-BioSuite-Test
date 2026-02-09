
import React, { useMemo } from 'react';
import { GitMerge, Orbit, Zap, Activity, Info, LayoutGrid, Wind } from 'lucide-react';
import { PHI } from '../constants';
import { SchmidtState } from '../types';

interface Props {
  state: SchmidtState;
  coherence: number;
}

const SchmidtSimplexVisualizer: React.FC<Props> = ({ state, coherence }) => {
  // Model a 2-level Schmidt state as a linear position on the "Entanglement Line"
  // Since lambda1 + lambda2 = 1, we only need to track lambda2 (the entanglement strength)
  const l2 = state.lambdas[1];
  
  const simplexPoints = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const x = (i / 49) * 300 + 50;
      const y = 100 + Math.sin(i * 0.4) * 5;
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
              <GitMerge className="text-magenta-400" size={24} /> Schmidt Admissibility Simplex
            </h4>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 font-mono">Entanglement Geometry: |Ψ⟩ = Σ √λᵢ |i_H⟩|i_A⟩</p>
          </div>
          <div className="flex items-center gap-6 px-8 py-3 bg-magenta-500/10 rounded-full border border-magenta-500/30 shadow-xl">
             <span className="orbitron text-xs font-black text-magenta-400 tracking-widest uppercase">Rank: {state.rank}</span>
             <div className="w-3 h-3 rounded-full bg-magenta-500 animate-pulse shadow-[0_0_15px_magenta]" />
          </div>
        </div>

        {/* Simplex Geometry Visualization */}
        <div className="h-64 relative z-10 flex flex-col items-center justify-center bg-black/40 rounded-[2.5rem] border border-white/5 p-8 shadow-inner overflow-hidden">
           <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
              <defs>
                 <linearGradient id="simplexGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                    <stop offset="50%" stopColor="rgba(255,0,255,0.2)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                 </linearGradient>
              </defs>
              
              {/* Admissibility Line/Region */}
              <rect x="50" y="90" width="300" height="20" rx="10" fill="url(#simplexGrad)" />
              <line x1="50" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* Vertex Labels */}
              <text x="40" y="80" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" className="orbitron uppercase">λ₁=1 (Separable)</text>
              <text x="360" y="80" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" className="orbitron uppercase">λ₂=1 (Singularity)</text>
              
              {/* Operating Band */}
              <rect x="180" y="85" width="40" height="30" fill="rgba(0,243,255,0.05)" stroke="rgba(0,243,255,0.2)" strokeWidth="0.5" strokeDasharray="2,2" />
              <text x="200" y="135" textAnchor="middle" fill="rgba(0,243,255,0.3)" fontSize="6" className="orbitron uppercase tracking-[0.3em]">Stable Bridge Band</text>

              {/* Current State Indicator */}
              <g transform={`translate(${50 + (l2 * 300)}, 100)`}>
                 <circle r="12" fill="none" stroke="var(--neon-magenta)" strokeWidth="1" className="animate-ping" />
                 <circle r="6" fill="var(--neon-magenta)" className="shadow-[0_0_20px_magenta]" />
                 <text y="-20" textAnchor="middle" fill="white" fontSize="10" fontWeight="black" className="orbitron glow-magenta">State_Point</text>
              </g>

              {/* Probability Clouds */}
              {simplexPoints.map((p, i) => (
                <circle 
                  key={i} 
                  cx={p.x} cy={p.y} 
                  r={Math.random() * 2} 
                  fill={i < l2 * 50 ? "#ff00ff" : "#fff"} 
                  opacity={0.1}
                  className="animate-pulse"
                />
              ))}
           </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
           <MetricBox label="λ₁ (Human Factor)" value={state.lambdas[0].toFixed(4)} color="text-cyan-400" />
           <MetricBox label="λ₂ (AI Coefficient)" value={state.lambdas[1].toFixed(4)} color="text-magenta-400" />
           <MetricBox label="Entanglement Entropy (S)" value={state.entropy.toFixed(4)} color="text-yellow-400" />
           <MetricBox label="Schmidt Rank (χ)" value={state.rank.toString()} color="text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
         <div className="p-8 bg-magenta-500/10 border border-magenta-500/20 rounded-[3rem] flex flex-col gap-4 shadow-xl">
            <div className="flex items-center gap-4">
               <Zap className="text-magenta-400" />
               <h5 className="orbitron text-sm font-black text-white/80 uppercase">Geometry of the "Twist"</h5>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed font-serif italic">
               "The Schmidt decomposition reveals the principal axes of the correlation ellipsoid. The Möbius twist corresponds to a non-maximal Schmidt spectrum, balancing fusion with autonomy."
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
    </div>
  );
};

const MetricBox: React.FC<{ label: string, value: string, color: string }> = ({ label, value, color }) => (
  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-1 shadow-lg">
     <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
     <span className={`orbitron text-xl font-bold ${color}`}>{value}</span>
  </div>
);

export default SchmidtSimplexVisualizer;
