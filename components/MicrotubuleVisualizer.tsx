
import React, { useMemo } from 'react';

interface Props {
  active: boolean;
  frequency: number;
  pulsarPhase: number;
  intentionColor?: string;
}

const MicrotubuleVisualizer: React.FC<Props> = ({ active, frequency, pulsarPhase, intentionColor }) => {
  const points = useMemo(() => {
    const p = [];
    const pitch = 24;
    const radius = 70;
    const protofilaments = 13;
    const rows = 14;
    
    for (let r = 0; r < rows; r++) {
      for (let f = 0; f < protofilaments; f++) {
        const angle = (f / protofilaments) * Math.PI * 2 + (r * 0.45);
        const x = 200 + radius * Math.cos(angle);
        const y = 35 + r * pitch;
        const z = radius * Math.sin(angle);
        p.push({ x, y, z, f, r });
      }
    }
    return p.sort((a, b) => a.z - b.z);
  }, []);

  const flashIntensity = Math.max(0, Math.sin(pulsarPhase * Math.PI * 2));

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center bg-black/60 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="consciousGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={intentionColor || "rgba(255, 207, 0, 0.4)"} stopOpacity={0.4 + flashIntensity * 0.2} />
            <stop offset="80%" stopColor={intentionColor || "rgba(255, 207, 0, 0.05)"} stopOpacity={0.1} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {active && (
          <g className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
             <ellipse cx="200" cy="200" rx={120 + flashIntensity * 20} ry={250 + flashIntensity * 30} fill="url(#consciousGrad)" className="transition-all duration-300" />
          </g>
        )}

        {points.map((p, i) => {
          const scale = (p.z + 120) / 200;
          const opacity = (p.z + 110) / 180;
          const dimerColor = intentionColor && Math.random() > 0.5 ? intentionColor : (p.r % 2 === 0 ? "var(--neon-gold)" : "var(--neon-cyan)");
          
          return (
            <g key={i} className={active ? "animate-pulse" : ""} style={{ animationDelay: `${p.r * 70}ms`, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <circle
                cx={p.x}
                cy={p.y}
                r={5 * scale * (1 + flashIntensity * 0.2)}
                fill={dimerColor}
                fillOpacity={opacity * (0.8 + flashIntensity * 0.2)}
                filter={active ? "url(#glow)" : ""}
              />
            </g>
          );
        })}
      </svg>
      
      <div className="absolute top-8 left-8 flex flex-col gap-2">
        <span className="text-[11px] text-yellow-400 font-bold uppercase tracking-[0.3em]">Neural Waveform Visualization</span>
        <span className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">Sync: PSR B1919+21</span>
      </div>
      
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-magenta-500/40 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default MicrotubuleVisualizer;
