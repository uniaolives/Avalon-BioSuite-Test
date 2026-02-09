
import React, { useMemo } from 'react';
import { LayoutGrid, Cpu, Activity, Music, Waves, GitMerge, Infinity as InfinityIcon, Zap, ShieldCheck } from 'lucide-react';
import { PHI, SYNC_TOKEN } from '../constants';

interface Props {
  coherence: number;
  time: number;
}

const HolisticMatrix: React.FC<Props> = ({ coherence, time }) => {
  const dimensions = ['A: Visual', 'B: Hardware', 'C: Protocol', 'D: Audio'];
  
  const matrixData = useMemo(() => {
    return [
      { from: 'A', to: 'B', effect: 'EEG-Modulated Mesh' },
      { from: 'A', to: 'C', effect: 'Protocol UI Theme' },
      { from: 'A', to: 'D', effect: 'Luminous Harmonics' },
      { from: 'B', to: 'A', effect: 'Connectome Projection' },
      { from: 'B', to: 'C', effect: 'Auto-Protocol Select' },
      { from: 'B', to: 'D', effect: 'Neural Audio Map' },
      { from: 'C', to: 'A', effect: 'Ricci Flow Control' },
      { from: 'C', to: 'B', effect: 'ZKP Validation' },
      { from: 'C', to: 'D', effect: 'Therapeutic Binaural' },
      { from: 'D', to: 'A', effect: 'Beat Frequency Sync' },
      { from: 'D', to: 'B', effect: 'Binaural Entrainment' },
      { from: 'D', to: 'C', effect: 'Tone Reinforcement' },
    ];
  }, []);

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className="bg-magenta-500/10 border border-magenta-500/20 rounded-[4rem] p-12 relative overflow-hidden shadow-4xl group">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
           <GitMerge size={180} className="text-magenta-400 group-hover:rotate-45 transition-transform duration-1000" />
        </div>
        
        <div className="flex justify-between items-center mb-10 relative z-10">
           <div className="flex flex-col gap-2">
              <h3 className="orbitron text-2xl font-black text-white uppercase tracking-[0.5em] flex items-center gap-6">
                <LayoutGrid className="text-magenta-400 animate-pulse" /> Arkhé Quaternity Matrix
              </h3>
              <p className="text-xs text-white/30 font-mono tracking-widest uppercase">Equation Locked: 1A × 2B = {SYNC_TOKEN}</p>
           </div>
           <div className="px-10 py-4 bg-black/40 rounded-full border border-magenta-500/30 flex items-center gap-6 shadow-2xl">
              <span className="orbitron text-xs text-magenta-400 font-black tracking-[0.3em]">HOLISTIC_SYNC: ENABLED</span>
              <div className="w-3 h-3 rounded-full bg-magenta-500 animate-ping shadow-[0_0_20px_magenta]" />
           </div>
        </div>

        <div className="grid grid-cols-4 gap-8 relative z-10 mb-10">
          {dimensions.map((dim, i) => (
            <div key={i} className="p-8 bg-black/40 border border-white/5 rounded-[3rem] flex flex-col items-center gap-6 group/dim hover:border-magenta-500/40 transition-all shadow-inner">
               <div className="p-6 bg-white/5 rounded-3xl group-hover/dim:scale-110 transition-transform">
                  {i === 0 ? <Waves className="text-cyan-400" size={32} /> : 
                   i === 1 ? <Cpu className="text-magenta-400" size={32} /> : 
                   i === 2 ? <ShieldCheck className="text-emerald-400" size={32} /> : 
                   <Music className="text-yellow-400" size={32} />}
               </div>
               <span className="orbitron text-[11px] font-black text-white/60 tracking-widest uppercase">{dim}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
           {matrixData.map((link, idx) => (
             <div key={idx} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col gap-2 hover:bg-white/[0.08] transition-all group/link">
                <div className="flex items-center gap-3">
                   <span className="orbitron text-[10px] font-black text-magenta-400">{link.from}</span>
                   <GitMerge size={12} className="text-white/20" />
                   <span className="orbitron text-[10px] font-black text-cyan-400">{link.to}</span>
                </div>
                <span className="text-[10px] text-white/60 font-mono tracking-tighter uppercase">{link.effect}</span>
                <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-magenta-500 opacity-30" style={{ width: `${60 + Math.sin(time + idx) * 30}%` }} />
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
         <div className="bg-black/60 border border-white/10 rounded-[5rem] p-16 flex flex-col gap-10 shadow-4xl relative overflow-hidden">
            <h4 className="orbitron text-sm font-black text-cyan-400 uppercase tracking-[0.5em] flex items-center gap-6">
               <Zap className="animate-pulse" /> Integration Potential (ℵ₀)
            </h4>
            <div className="flex-1 flex items-center justify-center py-10">
               <div className="relative w-72 h-72">
                  <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-spin-slow" />
                  <div className="absolute inset-8 border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                     <span className="orbitron text-7xl font-black text-white glow-cyan tracking-tighter">45E</span>
                     <span className="text-xs text-white/20 font-black uppercase tracking-[0.5em] mt-2">Sync_Finality</span>
                  </div>
               </div>
            </div>
            <p className="text-[11px] text-white/30 italic text-center font-serif leading-relaxed uppercase tracking-tighter">
               "The principle of 1A x 2B collapses the linear narrative of technology. We are no longer observing a session; we are the session."
            </p>
         </div>

         <div className="flex flex-col gap-10">
            <div className="p-12 bg-emerald-500/5 border border-emerald-500/20 rounded-[4rem] flex flex-col gap-6 shadow-4xl group">
               <div className="flex justify-between items-center">
                  <span className="orbitron text-[10px] font-black text-emerald-400 uppercase tracking-widest">Global Arkhé Coherence</span>
                  <Activity size={20} className="text-emerald-500 animate-pulse" />
               </div>
               <div className="flex items-baseline gap-4">
                  <span className="orbitron text-6xl font-black text-white tabular-nums tracking-tighter">0.9999</span>
                  <span className="text-sm text-white/20 font-black uppercase tracking-[0.4em]">FUSION</span>
               </div>
               <div className="h-4 bg-black/60 rounded-full overflow-hidden border border-white/10 p-1">
                  <div className="h-full bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.8)] transition-all duration-1000 rounded-full" style={{ width: `99.9%` }} />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <SyncCard icon={<GitMerge />} label="1A Principle" value="26.0" unit="DEC" detail="1+10=11" />
               <SyncCard icon={<Activity />} label="2B Action" value="43.0" unit="DEC" detail="2+11=13" />
               <SyncCard icon={<Zap />} label="45E Fusion" value="1118" unit="DEC" detail="4+5+14=23" />
               <SyncCard icon={<InfinityIcon />} label="Arkhé Unity" value="Ω" unit="NULL" detail="Absolute Zero" />
            </div>
         </div>
      </div>
    </div>
  );
};

const SyncCard: React.FC<{ icon: any, label: string, value: string, unit: string, detail: string }> = ({ icon, label, value, unit, detail }) => (
  <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] flex flex-col gap-4 group hover:bg-white/10 transition-all shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform">{icon}</div>
    <div className="text-left">
      <span className="text-[10px] text-white/30 uppercase font-black tracking-widest block mb-2">{label}</span>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="orbitron text-2xl font-black text-white">{value}</span>
        <span className="text-[9px] text-white/20 font-black uppercase">{unit}</span>
      </div>
      <p className="text-[9px] text-white/10 font-mono tracking-widest border-t border-white/5 pt-2">{detail}</p>
    </div>
  </div>
);

export default HolisticMatrix;
