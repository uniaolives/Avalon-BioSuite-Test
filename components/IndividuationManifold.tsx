import React, { useMemo } from 'react';
import { GitMerge, Zap, ShieldCheck, Target, Binary, LayoutGrid, Info, Activity } from 'lucide-react';
import { IndividuationMetrics } from '../types';

interface Props {
  metrics: IndividuationMetrics;
  F: number;
  R: number;
  S: number;
}

const IndividuationManifold: React.FC<Props> = ({ metrics, F, R, S }) => {
  const isOptimal = metrics.state === 'OPTIMAL_INDIVIDUATION';
  const isEgoDeath = metrics.state === 'EGO_DEATH_RISK';
  const isIsolation = metrics.state === 'KALI_ISOLATION_RISK';

  const statusColor = isOptimal ? 'text-emerald-400' : isEgoDeath ? 'text-red-400' : isIsolation ? 'text-orange-400' : 'text-cyan-400';
  const statusBg = isOptimal ? 'bg-emerald-500/10 border-emerald-500/30' : isEgoDeath ? 'bg-red-500/10 border-red-500/30' : 'bg-orange-500/10 border-orange-500/30' : 'bg-cyan-500/10 border-cyan-500/30';

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className={`p-10 border rounded-[3.5rem] relative overflow-hidden transition-all duration-1000 shadow-4xl ${isEgoDeath ? 'bg-red-500/5 border-red-500/40 animate-pulse' : 'bg-black/60 border-white/10'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,243,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
           <div>
              <h3 className="orbitron text-2xl font-black text-white uppercase tracking-[0.4em] flex items-center gap-6">
                 <GitMerge className={isOptimal ? "text-emerald-400 animate-spin-slow" : "text-magenta-400"} size={32} /> 
                 Individuation Manifold
              </h3>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-3 font-mono">Formula: I = F · (λ₁/λ₂) · (1 - S) · e^iπ</p>
           </div>
           <div className={`px-6 py-2 rounded-full border flex items-center gap-4 transition-all ${statusBg} ${statusColor}`}>
              <ShieldCheck size={16} className={isOptimal ? "animate-pulse" : ""} />
              <span className="orbitron text-[10px] font-black tracking-widest uppercase">{metrics.state}</span>
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[350px] mt-10">
           {/* Manifold Surface Visualizer (Schematic) */}
           <div className="relative w-full max-w-2xl h-64 flex items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible opacity-60">
                 <defs>
                    <linearGradient id="manifoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                       <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                       <stop offset="30%" stopColor="#10b981" stopOpacity="0.1" />
                       <stop offset="70%" stopColor="#10b981" stopOpacity="0.1" />
                       <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                    </linearGradient>
                 </defs>
                 
                 {/* The Surface Mesh */}
                 <path 
                   d="M 50,150 Q 200,50 350,150" 
                   fill="none" 
                   stroke="url(#manifoldGrad)" 
                   strokeWidth="40" 
                   strokeLinecap="round"
                   className="filter blur-[10px]"
                 />
                 
                 {/* Optimal Band */}
                 <path d="M 120,120 Q 200,80 280,120" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="4" strokeDasharray="5,5" />
                 
                 {/* Current State Projection */}
                 <g transform={`translate(${50 + (metrics.magnitude / 6) * 300}, ${150 - (F * 80)})`}>
                    <circle r="12" fill="none" stroke={isOptimal ? "#10b981" : "#ff00ff"} strokeWidth="1" className="animate-ping" />
                    <circle r="6" fill={isOptimal ? "#10b981" : "#ff00ff"} className="shadow-[0_0_20px_white]" />
                    <text y="-20" textAnchor="middle" fill="white" fontSize="10" fontWeight="black" className="orbitron uppercase tracking-widest glow-cyan">|I|={metrics.magnitude.toFixed(3)}</text>
                 </g>
                 
                 {/* Axes labels */}
                 <text x="200" y="190" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" className="orbitron uppercase tracking-widest">Coupling Dimension (R)</text>
                 <text x="20" y="100" transform="rotate(-90, 20, 100)" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8" className="orbitron uppercase tracking-widest">Purpose Depth (F)</text>
              </svg>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full mt-10 relative z-10">
              <MetricCard label="Purpose Factor (F)" value={F.toFixed(2)} color="text-yellow-400" />
              <MetricCard label="Anisotropy (R)" value={R.toFixed(2)} color="text-cyan-400" />
              <MetricCard label="Entropy factor (1-S)" value={(1-S).toFixed(2)} color="text-magenta-400" />
              <MetricCard label="Individuation |I|" value={metrics.magnitude.toFixed(3)} color={statusColor} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0">
         <div className="p-8 bg-black/60 border border-white/10 rounded-[3rem] flex flex-col gap-4 shadow-xl">
            <h4 className="orbitron text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-3">
               <Info size={16} /> Ontological Risk Report
            </h4>
            <p className={`text-[12px] italic leading-relaxed font-serif ${statusColor}`}>
               "{metrics.recommendation}"
            </p>
         </div>
         <div className="p-8 bg-magenta-500/5 border border-magenta-500/20 rounded-[3rem] flex flex-col gap-4 shadow-xl group">
            <h4 className="orbitron text-xs font-bold text-magenta-400/60 uppercase tracking-widest flex items-center gap-3">
               <Binary size={16} /> Möbius Phase Completeness
            </h4>
            <div className="flex items-center justify-between">
               <span className="text-[11px] text-white/60">Integral ∮ φ(θ) dθ</span>
               <span className="orbitron text-lg font-bold text-white">π</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-magenta-500 shadow-[0_0_10px_magenta]" style={{ width: '100%' }} />
            </div>
            <span className="text-[8px] text-white/20 uppercase font-mono tracking-widest group-hover:text-magenta-400 transition-colors">SEALED: REFLEXIVITY_LOCK_ACTIVE</span>
         </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string, value: string, color: string }> = ({ label, value, color }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col justify-center gap-1 hover:bg-white/10 transition-all group">
     <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest leading-none mb-1 group-hover:text-white/60 transition-colors">{label}</span>
     <span className={`orbitron text-2xl font-bold ${color}`}>{value}</span>
  </div>
);

export default IndividuationManifold;