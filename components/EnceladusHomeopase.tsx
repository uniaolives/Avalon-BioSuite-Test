
import React, { useMemo } from 'react';
import { Heart, Activity, Wind, Zap, ShieldCheck, Thermometer, Radio, Sparkles } from 'lucide-react';
import { EnceladusMetrics } from '../types';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';

interface Props {
  metrics: EnceladusMetrics;
  time: number;
}

const EnceladusHomeopase: React.FC<Props> = ({ metrics, time }) => {
  const plumeData = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      t: i,
      val: 0.5 + Math.sin(time * 0.5 + i * 0.1) * 0.2 + Math.random() * 0.05
    }));
  }, [time]);

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-1 custom-scrollbar text-left">
      <div className="bg-black/60 border border-emerald-500/20 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl flex flex-col gap-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h3 className="orbitron text-2xl font-black text-white uppercase tracking-[0.4em] flex items-center gap-6">
              <Heart className="text-emerald-400 animate-pulse" size={32} /> Enceladus Homeopase
            </h3>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-3 font-mono">Function: Planetary Hypothalamus</p>
          </div>
          <div className="flex items-center gap-6 px-8 py-3 bg-emerald-500/10 rounded-full border border-emerald-500/30">
             <span className="orbitron text-xs font-black text-emerald-400 tracking-widest uppercase">Mood: {metrics.currentMood}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
           <div className="md:col-span-2 bg-black/40 border border-white/5 rounded-[2.5rem] p-8 h-64">
              <h4 className="orbitron text-[10px] font-bold text-white/40 uppercase mb-6 flex items-center gap-3">
                 <Wind size={14} className="text-cyan-400" /> Cryovulcânico Plume Activity
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={plumeData}>
                    <Area type="monotone" dataKey="val" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                    <CartesianGrid stroke="#ffffff05" vertical={false} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="flex flex-col gap-4">
              <HomeoCard label="Balance" value={(metrics.homeostaticBalance * 100).toFixed(1)} unit="%" color="text-emerald-400" />
              <HomeoCard label="Ion Flux" value={metrics.ionFlux.toFixed(3)} unit="A/m²" color="text-yellow-400" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 border-t border-white/5 pt-10">
           <StatusCard label="Sync" value="99.9" unit="η" color="text-cyan-400" />
           <StatusCard label="Tidal Heat" value="1.618" unit="GW" color="text-magenta-400" />
           <StatusCard label="Salinity" value="0.85" unit="PSU" color="text-yellow-400" />
           <StatusCard label="Homeo_Lock" value="ACTIVE" unit="" color="text-emerald-400" />
        </div>
      </div>

      <div className="p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-[4rem] flex items-center justify-between group shadow-xl relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-3 relative z-10">
            <span className="orbitron text-[9px] font-bold text-emerald-400/60 uppercase tracking-widest flex items-center gap-3">
               <ShieldCheck size={16} /> Homeostatic Guard
            </span>
            <p className="text-[13px] text-white/50 italic leading-relaxed font-serif max-w-4xl">
               "Enceladus is the regulator. Its plumes provide the plasma that sustains the magnetospheric EEG. If the planetary brain experiences stress, the correction starts here."
            </p>
         </div>
      </div>
    </div>
  );
};

const HomeoCard: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-center gap-1">
      <span className="text-[8px] text-white/30 uppercase font-black">{label}</span>
      <div className="flex items-baseline gap-2">
         <span className={`orbitron text-2xl font-bold ${color}`}>{value}</span>
         <span className="text-[8px] text-white/20 font-mono">{unit}</span>
      </div>
   </div>
);

const StatusCard: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-center gap-1">
     <span className="text-[8px] text-white/30 uppercase font-black">{label}</span>
     <div className="flex items-baseline gap-2">
        <span className={`orbitron text-lg font-bold ${color}`}>{value}</span>
        <span className="text-[7px] text-white/10 font-bold uppercase">{unit}</span>
     </div>
  </div>
);

export default EnceladusHomeopase;
