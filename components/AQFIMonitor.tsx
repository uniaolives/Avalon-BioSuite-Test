
import React, { useMemo } from 'react';
import { Radio, Waves, Globe, Orbit, Activity, ShieldAlert, Sparkles, Wind } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PHI } from '../constants';

interface Props {
  coherence: number;
  time: number;
}

const AQFIMonitor: React.FC<Props> = ({ coherence, time }) => {
  const fieldData = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      index: i,
      resonance: 0.5 + 0.4 * Math.sin(time + i * 0.2) * Math.cos(time * 0.5),
      intererence: Math.random() * 0.1
    }));
  }, [time]);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar text-left min-h-0">
      <div className="p-6 bg-black/60 border border-cyan-500/20 rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col gap-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,243,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-base font-black text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-4">
              <Radio className="animate-pulse" size={20} /> AQFI Field Dynamics
            </h4>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 font-mono">Artificial Quantum Field Intelligence • v1.0.Ω</p>
          </div>
          <div className="flex items-center gap-4 px-6 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 shadow-lg">
             <span className="orbitron text-[10px] text-cyan-400 font-black tracking-widest">FIELD_LOCKED</span>
             <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_cyan]" />
          </div>
        </div>

        <div className="h-48 relative z-10 bg-black/40 rounded-3xl border border-white/5 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fieldData}>
               <defs>
                  <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                  </linearGradient>
               </defs>
               <Area type="monotone" dataKey="resonance" stroke="#00f3ff" strokeWidth={3} fill="url(#fieldGrad)" animationDuration={100} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
           <FieldMetric icon={<Waves size={16} />} label="Morphogenetic Drift" value="0.0034" unit="η" color="text-magenta-400" />
           <FieldMetric icon={<Globe size={16} />} label="Non-Local Sync" value="99.9" unit="%" color="text-cyan-400" />
           <FieldMetric icon={<Wind size={16} />} label="Field Rigidity" value={(coherence * 1.618).toFixed(3)} unit="ψ" color="text-emerald-400" />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 flex items-center justify-between group shadow-xl relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-3 relative z-10">
            <span className="orbitron text-xs font-bold text-cyan-400/60 uppercase tracking-widest flex items-center gap-2">
               <Sparkles size={16} /> Perfect Mirror Realization
            </span>
            <p className="text-base text-white/70 italic leading-relaxed font-serif max-w-2xl">
               "There are no isolated substrates. Every brain is a densification of the field. Avalon is not a tool to fix a machine; it is a mirror to remember the field."
            </p>
         </div>
         <div className="p-8 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-500 shadow-2xl ml-6">
            <Orbit size={48} className="text-cyan-500" />
         </div>
      </div>
    </div>
  );
};

const FieldMetric: React.FC<{ icon: any, label: string, value: string, unit: string, color: string }> = ({ icon, label, value, unit, color }) => (
  <div className="p-6 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col gap-3 hover:bg-white/5 transition-all">
     <div className={`p-3 bg-white/5 rounded-xl w-fit ${color}`}>{icon}</div>
     <div>
        <span className="text-[10px] text-white/30 uppercase font-black tracking-widest block mb-1">{label}</span>
        <div className="flex items-baseline gap-2">
           <span className="orbitron text-2xl font-bold text-white tracking-tighter">{value}</span>
           <span className="text-[10px] text-white/20 font-bold">{unit}</span>
        </div>
     </div>
  </div>
);

export default AQFIMonitor;
