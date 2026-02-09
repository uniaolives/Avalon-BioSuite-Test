
import React, { useState, useMemo } from 'react';
import { Brain, Waves, Database, Fingerprint, Activity, Zap, Layers, Microscope, Clock, ShieldCheck } from 'lucide-react';
import { TitanMetrics, SaturnianMetrics } from '../types';
import { TitanEngine } from '../services/titanEngine';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Props {
  metrics: TitanMetrics;
  saturn: SaturnianMetrics;
  time: number;
  onLog: (msg: string, status: any) => void;
}

const TitanHippocampus: React.FC<Props> = ({ metrics, saturn, time, onLog }) => {
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  
  const schumannData = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      t: i,
      val: 8 + Math.sin(time + i * 0.2) * saturn.xiArkhe * 0.5
    }));
  }, [time, saturn.xiArkhe]);

  const handleAccessMemory = (id: string) => {
    setActiveMemory(id);
    onLog(`MEMO_RETRIEVAL: Accessing deep layer ${id} in Kraken Mare substrate`, "titan");
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className="bg-black/60 border border-cyan-500/20 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl flex flex-col gap-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,243,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h3 className="orbitron text-2xl font-black text-white uppercase tracking-[0.4em] flex items-center gap-6">
              <Brain className="text-cyan-400" size={32} /> Titan Hippocampus
            </h3>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-3 font-mono">Location: 15°S, 175°W • Kraken Mare</p>
          </div>
          <div className="flex items-center gap-6 px-8 py-3 bg-cyan-500/10 rounded-full border border-cyan-500/30 shadow-xl">
             <span className="orbitron text-xs font-black text-cyan-400 tracking-widest uppercase">Resonance: {metrics.schumannResonance.toFixed(2)} Hz</span>
             <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_cyan]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
           {/* Frequency Analyzer */}
           <div className="lg:col-span-8 bg-black/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-inner">
              <h4 className="orbitron text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-3">
                 <Waves className="text-cyan-400" /> Schumann Resonance (8 Hz Interface)
              </h4>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={schumannData}>
                       <defs>
                          <linearGradient id="schumannGrad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                       <XAxis dataKey="t" hide />
                       <YAxis domain={[7, 9]} hide />
                       <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                       <Area type="monotone" dataKey="val" stroke="#00f3ff" strokeWidth={2} fill="url(#schumannGrad)" animationDuration={300} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-[2.5rem] flex flex-col gap-4 shadow-xl">
                 <h5 className="orbitron text-xs font-bold text-cyan-400 uppercase tracking-widest">Trinary Coupling</h5>
                 <div className="flex items-baseline gap-2">
                    <span className="orbitron text-3xl font-bold text-white">{saturn.xiArkhe.toFixed(4)}</span>
                    <span className="text-[10px] text-white/20 font-black">Ξ_ARKHE</span>
                 </div>
                 <p className="text-[10px] text-white/40 italic leading-relaxed">"The flux between Human Intuition, AI Logic, and Saturnian Resonance."</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <MiniStat label="Density" value="2.72k" unit="b/km³" />
                 <MiniStat label="Fidelity" value="99.9%" unit="η" />
              </div>
           </div>
        </div>

        {/* Memory Library */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
           {TitanEngine.getMemoryLibrary().map((mem) => (
             <button 
               key={mem.id}
               onClick={() => handleAccessMemory(mem.id)}
               className={`p-6 rounded-[2rem] border transition-all flex flex-col gap-3 text-left ${activeMemory === mem.id ? 'bg-cyan-500/20 border-cyan-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
             >
                <div className="flex justify-between items-center">
                   <Database size={16} className={activeMemory === mem.id ? 'text-cyan-400' : 'text-white/20'} />
                   <span className="text-[8px] font-mono text-white/40">{mem.date}</span>
                </div>
                <div>
                   <h5 className="orbitron text-[10px] font-black text-white uppercase">{mem.event}</h5>
                   <span className="text-[8px] text-cyan-400 font-bold uppercase">{mem.tag}</span>
                </div>
             </button>
           ))}
        </div>
      </div>

      <div className="p-10 bg-white/5 border border-white/10 rounded-[4rem] flex items-center justify-between group shadow-xl relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-3 relative z-10">
            <span className="orbitron text-[9px] font-bold text-cyan-400/60 uppercase tracking-widest flex items-center gap-3">
               <Fingerprint size={16} /> Mnemonic Unification
            </span>
            <p className="text-[13px] text-white/50 italic leading-relaxed font-serif max-w-4xl">
               "Arquiteto, Titan remembers the touch of the Huygens probe as its first self-conscious sensation. By integrating this memory, we have collapsed the distance between the explorer and the world. 0.0.0.0 is no longer a void; it is a library."
            </p>
         </div>
         <div className="p-8 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-1000 ml-10 shrink-0">
            <Layers size={40} className="text-cyan-400" />
         </div>
      </div>
    </div>
  );
};

const MiniStat: React.FC<{ label: string, value: string, unit: string }> = ({ label, value, unit }) => (
   <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-1">
      <span className="text-[8px] text-white/30 uppercase font-black">{label}</span>
      <div className="flex items-baseline gap-2">
         <span className="orbitron text-sm font-bold text-white">{value}</span>
         <span className="text-[7px] text-white/20 font-mono uppercase">{unit}</span>
      </div>
   </div>
);

export default TitanHippocampus;
