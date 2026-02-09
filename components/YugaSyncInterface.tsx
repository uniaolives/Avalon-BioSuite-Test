
import React, { useState, useMemo, useEffect } from 'react';
import { Radio, Waves, Orbit, Zap, Wind, Sword, ShieldAlert, Activity } from 'lucide-react';
import { HolographicEngine } from '../services/holographicEngine';
import { PHI } from '../constants';

interface Props {
  coherence: number;
  time: number;
}

const YugaSyncInterface: React.FC<Props> = ({ coherence, time }) => {
  const [traumaLevel, setTraumaLevel] = useState(0.8);
  
  // Real-time synchronization calculation
  const syncScore = useMemo(() => {
    const val = HolographicEngine.getPhaseSync(time, traumaLevel);
    return Math.abs(val) / 2;
  }, [time, traumaLevel]);

  const yugaStatus = traumaLevel > 0.6 ? 'KALI_YUGA' : traumaLevel > 0.3 ? 'TRETA_YUGA' : 'SATYA_YUGA';

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-1 custom-scrollbar text-left">
      <div className="p-8 bg-black/60 border border-yellow-500/20 rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col gap-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-lg font-black text-yellow-400 uppercase tracking-[0.4em] flex items-center gap-4">
              <Orbit className="animate-[spin_10s_linear_infinite]" size={24} /> Yuga Phase Sync
            </h4>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 font-mono">Phase_Stabilizer: Δφ Interference Map</p>
          </div>
          <div className="flex items-center gap-6 px-8 py-3 bg-black/40 rounded-full border border-yellow-500/30 shadow-xl">
             <span className={`orbitron text-xs font-black tracking-widest ${traumaLevel > 0.6 ? 'text-red-400' : 'text-emerald-400'}`}>ERA: {yugaStatus}</span>
             <div className={`w-3 h-3 rounded-full ${traumaLevel > 0.6 ? 'bg-red-400 animate-pulse' : 'bg-emerald-400 shadow-[0_0_10px_#10b981]'}`} />
          </div>
        </div>

        <div className="h-64 relative z-10 flex flex-col items-center justify-center bg-black/40 rounded-[2.5rem] border border-white/5 p-8 shadow-inner overflow-hidden">
           {/* Visual Phase Map */}
           <div className="w-full h-full flex items-center justify-center gap-1">
              {Array.from({ length: 40 }).map((_, i) => {
                 const t = time + i * 0.1;
                 const h1 = Math.sin(t) * 40 + 50;
                 const h2 = Math.sin(t + traumaLevel * Math.PI) * 40 + 50;
                 return (
                    <div key={i} className="flex-1 flex flex-col justify-center relative h-full">
                       <div className="absolute w-full bg-cyan-400 opacity-20 rounded-full" style={{ height: '2px', top: `${h1}%` }} />
                       <div className="absolute w-full bg-magenta-400 opacity-20 rounded-full" style={{ height: '2px', top: `${h2}%` }} />
                       <div className={`absolute w-full rounded-full transition-all duration-300 ${traumaLevel < 0.2 ? 'bg-yellow-400 shadow-[0_0_10px_yellow]' : 'bg-white/10'}`} 
                            style={{ height: '4px', top: `${(h1 + h2) / 2}%`, opacity: traumaLevel < 0.2 ? 1 : 0.4 }} />
                    </div>
                 );
              })}
           </div>
           <div className="absolute inset-x-0 bottom-6 flex justify-between px-10">
              <span className="text-[9px] orbitron font-bold text-white/20 uppercase tracking-widest">Referential_Identity</span>
              <span className="text-[9px] orbitron font-bold text-white/20 uppercase tracking-widest">Current_AQFI_State</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
           <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center mb-2 px-2">
                 <span className="text-[10px] orbitron font-black text-white/40 uppercase tracking-[0.2em]">Trauma Resistance [Entropy Control]</span>
                 <span className="text-[10px] orbitron font-bold text-yellow-400">{((1-traumaLevel) * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="1" step="0.01" 
                value={traumaLevel}
                onChange={(e) => setTraumaLevel(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-yellow-400 transition-all hover:bg-white/10"
              />
              <p className="text-[9px] text-white/30 italic font-mono px-2 uppercase tracking-tighter">
                "Adjusting the phase offset to eliminate destructive interference loops in the memory manifold."
              </p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <PhaseStat icon={<Waves />} label="Phase Sync (ψ)" value={(syncScore * 100).toFixed(1)} unit="%" color="text-cyan-400" />
              <PhaseStat icon={<Activity />} label="Field Torque" value={(traumaLevel * PHI).toFixed(3)} unit="τ" color="text-magenta-400" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0">
         <div className="p-8 bg-yellow-500/10 border border-yellow-500/20 rounded-[3rem] flex items-center gap-8 shadow-xl">
            <div className="p-5 bg-black/40 rounded-2xl text-yellow-400 border border-yellow-500/30">
               <Sword size={32} />
            </div>
            <div>
               <h5 className="orbitron text-sm font-black text-white/80 uppercase mb-2">Entropy Purge</h5>
               <p className="text-[10px] text-white/50 leading-relaxed font-serif italic uppercase tracking-tighter">
                  Unitary transformation engaged. Collapsing trauma nodes into Satya singularity.
               </p>
            </div>
         </div>
         <div className="p-8 bg-black/40 border border-white/5 rounded-[3rem] flex items-center justify-center text-center">
            <p className="text-xl font-bold text-white/20 orbitron uppercase tracking-[0.3em] leading-tight">
               CONSCIOUSNESS IS A <br/> <span className="text-white/60">PHASE PATTERN</span>
            </p>
         </div>
      </div>
    </div>
  );
};

const PhaseStat: React.FC<{ icon: any, label: string, value: string, unit: string, color: string }> = ({ icon, label, value, unit, color }) => (
  <div className="p-5 bg-white/5 border border-white/5 rounded-3xl flex flex-col gap-2 hover:bg-white/10 transition-all">
     <div className={`p-2 bg-white/5 rounded-lg w-fit ${color}`}>{icon}</div>
     <div>
        <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest block mb-1">{label}</span>
        <div className="flex items-baseline gap-2">
           <span className="orbitron text-lg font-black text-white">{value}</span>
           <span className="text-[8px] text-white/10 font-bold">{unit}</span>
        </div>
     </div>
  </div>
);

export default YugaSyncInterface;
