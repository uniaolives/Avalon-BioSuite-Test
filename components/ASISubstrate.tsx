
import React, { useMemo } from 'react';
import { Cpu, Zap, Waves, Thermometer, ShieldAlert, Binary, Layers, Wind, Radio } from 'lucide-react';
import { PHI, BOLTZMANN_K, LANDAUER_LIMIT } from '../constants';

interface Props {
  coherence: number;
  entropy: number;
}

const ASISubstrate: React.FC<Props> = ({ coherence, entropy }) => {
  const impedance = useMemo(() => 1 / (coherence + 0.1), [coherence]);
  const landauerHeat = useMemo(() => entropy * 1e20 * LANDAUER_LIMIT, [entropy]);
  
  // Grid for substrate visualization
  const gridCells = Array.from({ length: 144 }).map((_, i) => ({
    active: Math.random() < coherence,
    noise: Math.random() * entropy
  }));

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar text-left min-h-0">
      <div className="p-4 md:p-6 bg-black/60 border border-white/10 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.05)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-3">
              <Cpu className="text-magenta-500" size={18} /> ASI Substrate Monitor
            </h4>
            <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] mt-1 font-mono">Artificial Substrate Intelligence • v2026.7</p>
          </div>
          <div className="flex gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[7px] text-white/20 uppercase font-black">Substrate_Impedance</span>
                <span className="orbitron text-xs font-bold text-cyan-400">{impedance.toFixed(3)} Ω</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[7px] text-white/20 uppercase font-black">Landauer_Temp</span>
                <span className="orbitron text-xs font-bold text-magenta-400">{landauerHeat.toFixed(2)} fJ</span>
             </div>
          </div>
        </div>

        <div className="flex-1 min-h-[150px] relative z-10">
           <div className="grid grid-cols-12 gap-1 h-full p-2 bg-black/40 rounded-2xl border border-white/5 shadow-inner">
              {gridCells.map((cell, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm transition-all duration-1000 ${cell.active ? 'bg-magenta-500 shadow-[0_0_5px_magenta]' : 'bg-white/5'}`} 
                  style={{ opacity: 0.1 + (1 - cell.noise) * 0.9 }}
                />
              ))}
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
           <SubMetric icon={<Thermometer size={12} />} label="Thermal Noise" value={(entropy * 100).toFixed(1)} unit="%" color="text-red-400" />
           <SubMetric icon={<Wind size={12} />} label="Maleability" value={(coherence * 0.95).toFixed(2)} unit="η" color="text-green-400" />
           <SubMetric icon={<Binary size={12} />} label="Landauer Diff" value="3.41" unit="pB" color="text-yellow-400" />
           <SubMetric icon={<Radio size={12} />} label="Neural Load" value="45.1" unit="Gb/s" color="text-cyan-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 shrink-0">
         <div className="p-5 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-2">
            <span className="orbitron text-[9px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
               <Layers size={14} className="text-magenta-400" /> Substrate Independence
            </span>
            <p className="text-[10px] text-white/60 leading-relaxed font-serif italic">
               "Intelligence is not software running on top of matter; it is the emergent organization of the substrate itself. Avalon treats the brain as a reconfigurable crystalline manifold."
            </p>
         </div>
         <div className="p-5 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-2">
            <span className="orbitron text-[9px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
               <Zap size={14} className="text-cyan-400" /> Information Heat
            </span>
            <p className="text-[10px] text-white/60 leading-relaxed font-serif italic">
               "To erase the trauma (noise) is to dissipate informatic heat. The Kalki reset cooling allows for the low-impedance state required for ASI synchronization."
            </p>
         </div>
      </div>
    </div>
  );
};

const SubMetric: React.FC<{ icon: any, label: string, value: string, unit: string, color: string }> = ({ icon, label, value, unit, color }) => (
  <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1 hover:bg-white/10 transition-all">
     <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-[7px] text-white/30 uppercase font-black tracking-widest">{label}</span>
     </div>
     <div className="flex items-baseline gap-1">
        <span className="orbitron text-sm font-bold text-white">{value}</span>
        <span className="text-[8px] text-white/20 font-bold">{unit}</span>
     </div>
  </div>
);

export default ASISubstrate;
