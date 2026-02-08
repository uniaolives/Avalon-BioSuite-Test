
import React, { useMemo } from 'react';

interface Props {
  active: boolean;
  frequency: number;
}

const MicrotubuleVisualizer: React.FC<Props> = ({ active, frequency }) => {
  const points = useMemo(() => {
    const p = [];
    const pitch = 22;
    const radius = 65;
    const protofilaments = 13;
    const rows = 14;
    
    for (let r = 0; r < rows; r++) {
      for (let f = 0; f < protofilaments; f++) {
        const angle = (f / protofilaments) * Math.PI * 2 + (r * 0.45);
        const x = 200 + radius * Math.cos(angle);
        const y = 40 + r * pitch;
        const z = radius * Math.sin(angle);
        p.push({ x, y, z, f, r });
      }
    }
    return p.sort((a, b) => a.z - b.z);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-inner">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="vortexGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 243, 255, 0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <mask id="tubeMask">
            <rect x="0" y="0" width="400" height="400" fill="white" />
            <ellipse cx="200" cy="200" rx="40" ry="180" fill="black" />
          </mask>
        </defs>

        {active && (
          <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
             <ellipse cx="200" cy="200" rx="100" ry="200" fill="url(#vortexGrad)" className="animate-pulse" />
          </g>
        )}

        {points.map((p, i) => {
          const scale = (p.z + 110) / 180;
          const opacity = (p.z + 100) / 160;
          const dimerColor = p.r % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-magenta)";
          
          return (
            <g key={i} className={active ? "animate-pulse" : ""} style={{ animationDelay: `${p.r * 80}ms`, transition: 'all 0.3s ease' }}>
              <circle
                cx={p.x}
                cy={p.y}
                r={4.5 * scale}
                fill={dimerColor}
                fillOpacity={opacity}
                filter={active ? "url(#glow)" : ""}
              />
              {active && p.f === 0 && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={12 * scale}
                  stroke="var(--neon-gold)"
                  strokeWidth="0.5"
                  fill="transparent"
                  className="animate-ping"
                  opacity="0.2"
                />
              )}
            </g>
          );
        })}

        {active && (
            <g className="opacity-10 pointer-events-none">
              <path
                  d="M 200,20 L 200,380"
                  stroke="var(--neon-cyan)"
                  strokeWidth="0.5"
                  strokeDasharray="5,10"
              />
              <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="0.1" fill="none" />
            </g>
        )}
      </svg>
      
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.2em]">OAM Waveguide Matrix</span>
        <span className="text-[8px] text-white/20 uppercase tracking-widest">Helix Protocol v1.618</span>
      </div>
      
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default MicrotubuleVisualizer;
