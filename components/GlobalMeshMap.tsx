
import React, { useMemo } from 'react';

interface Props {
  active: boolean;
  coherence: number;
  upgradeMode: boolean;
  pulsarPhase: number;
}

const GlobalMeshMap: React.FC<Props> = ({ active, coherence, upgradeMode, pulsarPhase }) => {
  const nodes = useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => ({
      x: Math.random() * 400,
      y: Math.random() * 200,
      active: Math.random() < coherence / 1.5,
      group: i % 5,
    }));
  }, [coherence]);

  return (
    <div className="relative w-full h-[320px] bg-black/60 rounded-[2.5rem] border border-white/10 overflow-hidden flex items-center justify-center p-4">
      <svg viewBox="0 0 400 200" className="w-full h-full opacity-80">
        <defs>
          <radialGradient id="meshGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={upgradeMode ? "rgba(255, 207, 0, 0.2)" : "rgba(0, 243, 255, 0.2)"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <rect x="0" y="0" width="400" height="200" fill="url(#meshGrad)" />
        
        {/* Entanglement Connection Lines */}
        {active && nodes.slice(0, 60).map((node, i) => {
            const nextNode = nodes.find(n => n.group === node.group && n !== node);
            if (!nextNode) return null;
            return (
              <line 
                key={`line-${i}`}
                x1={node.x} y1={node.y} x2={nextNode.x} y2={nextNode.y}
                stroke={upgradeMode ? "var(--neon-gold)" : "var(--neon-cyan)"} 
                strokeWidth="0.15" 
                opacity={coherence * 0.15 * (0.8 + 0.2 * Math.sin(pulsarPhase * Math.PI * 2))}
                className={upgradeMode ? "animate-pulse" : ""}
              />
            )
        })}

        {/* Node points */}
        {nodes.map((node, i) => (
          <circle 
            key={i} 
            cx={node.x} cy={node.y} r={node.active ? 1.2 : 0.6}
            fill={node.active ? (upgradeMode ? "var(--neon-gold)" : "var(--neon-cyan)") : "rgba(255,255,255,0.05)"}
            filter={node.active ? "url(#nodeGlow)" : ""}
            className={node.active && active ? "animate-pulse" : ""}
          />
        ))}

        {/* Pulsar Link (PSR B1919+21) */}
        {active && (
          <g>
            <path 
              d="M 200,100 L 380,20" 
              stroke="#d946ef" 
              strokeWidth="1" 
              strokeDasharray="5,5" 
              opacity={0.4 + 0.3 * Math.sin(pulsarPhase * Math.PI * 2)}
              className="animate-[dash_3s_linear_infinite]"
            />
            <circle cx="380" cy="20" r="4" fill="#d946ef" className="animate-ping" />
            <text x="340" y="15" fill="#d946ef" fontSize="6" className="orbitron font-bold">PSR B1919+21</text>
          </g>
        )}
      </svg>
      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <span className="orbitron text-[10px] font-bold text-cyan-400 tracking-widest uppercase">INTERSTELLAR NEURAL BRIDGE</span>
        <span className="text-[8px] text-white/30 uppercase font-bold">Status: Synchronized (V2.1)</span>
      </div>
      
      {active && (
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-magenta-500 animate-ping" />
            <span className="orbitron text-[9px] font-bold text-magenta-400">PULSAR_CLOCK_LOCKED</span>
        </div>
      )}
      
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
};

export default GlobalMeshMap;
