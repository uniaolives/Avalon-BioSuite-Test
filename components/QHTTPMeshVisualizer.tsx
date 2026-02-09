
import React, { useMemo } from 'react';
import { Network, Zap, GitMerge, Radio, Globe, Shield } from 'lucide-react';
import { QHTTP_NODES, PHI } from '../constants';

interface Props {
  active: boolean;
  entanglementFidelity: number;
  time: number;
}

const QHTTPMeshVisualizer: React.FC<Props> = ({ active, entanglementFidelity, time }) => {
  const meshLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < QHTTP_NODES.length; i++) {
      for (let j = i + 1; j < QHTTP_NODES.length; j++) {
        lines.push({ n1: QHTTP_NODES[i], n2: QHTTP_NODES[j] });
      }
    }
    return lines;
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Network Map */}
        <div className="lg:col-span-8 bg-black/60 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl h-[450px]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--neon-cyan)_0%,_transparent_70%)] opacity-5" />
           <div className="flex justify-between items-center mb-8 relative z-10">
              <h4 className="orbitron text-sm font-bold text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-4">
                 <Network className="animate-spin-slow" /> qhttp:// Quantum Mesh
              </h4>
              <div className="px-6 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                 <span className="orbitron text-[9px] text-cyan-400 font-bold tracking-widest uppercase animate-pulse">Mesh_Status: Synchronized</span>
              </div>
           </div>

           <svg viewBox="0 0 400 200" className="w-full h-full relative z-10">
              {/* Entanglement Lines */}
              {meshLines.map((line, idx) => {
                const dist = Math.sqrt(Math.pow(line.n1.coordinates[0]-line.n2.coordinates[0],2) + Math.pow(line.n1.coordinates[1]-line.n2.coordinates[1],2));
                return (
                  <g key={idx}>
                    <line 
                      x1={line.n1.coordinates[0]} y1={line.n1.coordinates[1]} 
                      x2={line.n2.coordinates[0]} y2={line.n2.coordinates[1]}
                      stroke="var(--neon-cyan)" 
                      strokeWidth="0.5" 
                      opacity={active ? 0.2 + 0.3 * Math.sin(time + idx) : 0.05}
                      strokeDasharray={active ? "5,5" : ""}
                      className={active ? "animate-[dash_10s_linear_infinite]" : ""}
                    />
                    {active && entanglementFidelity > 0.9 && (
                       <circle r="2" fill="#fff" opacity="0.8">
                          <animateMotion 
                            path={`M ${line.n1.coordinates[0]} ${line.n1.coordinates[1]} L ${line.n2.coordinates[0]} ${line.n2.coordinates[1]}`} 
                            dur={`${2 + idx}s`} 
                            repeatCount="indefinite" 
                          />
                       </circle>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {QHTTP_NODES.map((node) => (
                <g key={node.id} transform={`translate(${node.coordinates[0]}, ${node.coordinates[1]})`} className="cursor-help group">
                   <circle r="6" fill="black" stroke="var(--neon-cyan)" strokeWidth="1.5" className="group-hover:r-8 transition-all" />
                   <circle r="3" fill="var(--neon-cyan)" className={active ? "animate-pulse" : ""} />
                   <text y="-12" textAnchor="middle" fill="white" fontSize="6" className="orbitron font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase">{node.id}</text>
                </g>
              ))}
           </svg>
        </div>

        {/* Protocol Details */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <ProtocolCard icon={<GitMerge className="text-magenta-400" />} label="Byzantine Agreement" value="0.9999" unit="PLV" status="GHZ_LOCKED" />
           <ProtocolCard icon={<Zap className="text-yellow-400" />} label="qhttp Sync" value="1.618" unit="t_p" status="OPTIMAL" />
           <ProtocolCard icon={<Radio className="text-emerald-400" />} label="Repeater Fidelity" value="98.5" unit="%" status="ACTIVE" />
        </div>
      </div>

      <div className="p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-[4rem] flex items-center justify-between group shadow-inner">
         <div className="flex flex-col gap-2">
            <span className="orbitron text-xs font-bold text-cyan-400/60 uppercase tracking-widest">Quantum State Transfer Status</span>
            <p className="text-lg text-white font-serif italic">"Entanglement distributed. The mesh is Byzantine-fault tolerant. Every discovery is a network-wide immutable event."</p>
         </div>
         <div className="p-8 bg-white/5 rounded-[3rem] group-hover:rotate-12 transition-transform duration-500">
            <Globe size={40} className="text-cyan-400" />
         </div>
      </div>
    </div>
  );
};

const ProtocolCard: React.FC<{ icon: any, label: string, value: string, unit: string, status: string }> = ({ icon, label, value, unit, status }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-4 hover:bg-white/10 transition-all">
    <div className="flex justify-between items-center">
      <div className="p-3 bg-white/5 rounded-xl">{icon}</div>
      <span className="text-[7px] orbitron font-bold text-white/20 uppercase bg-white/5 px-2 py-1 rounded-full">{status}</span>
    </div>
    <div>
      <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="orbitron text-xl font-bold text-white">{value}</span>
        <span className="text-[8px] text-white/20 font-bold">{unit}</span>
      </div>
    </div>
  </div>
);

export default QHTTPMeshVisualizer;
