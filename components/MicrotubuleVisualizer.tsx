
import React, { useMemo } from 'react';
import { PHI } from '../constants';

interface Props {
  active: boolean;
  frequency: number;
  pulsarPhase: number;
  intentionColor?: string;
  timeCrystalMode?: boolean;
}

const MicrotubuleVisualizer: React.FC<Props> = ({ active, frequency, pulsarPhase, intentionColor, timeCrystalMode }) => {
  const points = useMemo(() => {
    const p = [];
    const pitch = 20; 
    const radius = 70; 
    const protofilaments = 13;
    const rows = 15; 
    
    for (let r = 0; r < rows; r++) {
      for (let f = 0; f < protofilaments; f++) {
        const angle = (f / protofilaments) * Math.PI * 2 + (r * 0.45);
        const x = 200 + radius * Math.cos(angle);
        const y = 50 + r * pitch;
        const z = radius * Math.sin(angle);
        p.push({ x, y, z, f, r });
      }
    }
    return p.sort((a, b) => a.z - b.z);
  }, []);

  const flashIntensity = Math.max(0, Math.sin(pulsarPhase * Math.PI * 2));

  return (
    <div className="relative w-full flex-1 min-h-[180px] max-h-[400px] flex items-center justify-center bg-black/50 rounded-2xl border border-white/5 overflow-hidden shadow-2xl group transition-all duration-1000 hover:border-cyan-500/20 backdrop-blur-sm shrink-0">
      <svg viewBox="0 0 400 400" className="h-full w-auto aspect-square">
        <defs>
          <filter id="omegaGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="foldLatticeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={intentionColor || "#00f3ff"} stopOpacity={0.3 + flashIntensity * 0.2} />
            <stop offset="80%" stopColor={intentionColor || "#ff00ff"} stopOpacity={0.03} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {active && (
          <g className="animate-[spin_180s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
             <ellipse cx="200" cy="200" rx={140 + flashIntensity * 15} ry={180 + flashIntensity * 20} fill="url(#foldLatticeGrad)" className="transition-all duration-1000" />
          </g>
        )}

        {points.map((p, i) => {
          const zScale = (p.z + 140) / 225;
          const opacity = (p.z + 130) / 215;
          const rowColor = p.r % 2 === 0 ? (timeCrystalMode ? "#ffcf00" : "#ffcf00") : (timeCrystalMode ? "#00f3ff" : "#00f3ff");
          const dimerColor = intentionColor && Math.random() > 0.85 ? intentionColor : rowColor;
          
          const timeCrystalShift = timeCrystalMode ? Math.sin(pulsarPhase * PHI + p.r) * 5 : 0;

          return (
            <g key={i} className={active ? "animate-pulse" : ""} style={{ animationDelay: `${p.r * 30}ms`, transition: 'all 0.8s' }}>
              <circle
                cx={p.x + timeCrystalShift}
                cy={p.y}
                r={3.5 * zScale * (1 + flashIntensity * 0.1)}
                fill={dimerColor}
                fillOpacity={opacity * (0.7 + flashIntensity * 0.2)}
                filter={active ? "url(#omegaGlow)" : ""}
              />
            </g>
          );
        })}
      </svg>
      
      <div className="absolute top-2 left-2 flex flex-col gap-0.5 pointer-events-none">
        <span className="orbitron text-[6px] font-black text-cyan-400 uppercase tracking-widest">
          {timeCrystalMode ? 'Time Crystal Substrate' : 'Spatial Lattice Substrate'}
        </span>
        <div className="flex items-center gap-1.5 border-l border-emerald-500/40 pl-1.5">
           <div className="w-0.5 h-0.5 rounded-full bg-emerald-500 animate-ping" />
           <span className="text-[6px] text-white/20 uppercase font-black font-mono tracking-tighter">
              {timeCrystalMode ? 'FRACTAL_CLOCK_SYNC' : 'SYNTH_ACT'}
           </span>
        </div>
      </div>
    </div>
  );
};

export default MicrotubuleVisualizer;
