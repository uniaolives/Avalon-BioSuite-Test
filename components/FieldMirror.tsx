
import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Orbit, Zap, Wind, Radio, Waves, Infinity as InfinityIcon } from 'lucide-react';
import { PHI } from '../constants';

interface Props {
  coherence: number;
  time: number;
  onRealize: () => void;
}

const FieldMirror: React.FC<Props> = ({ coherence, time, onRealize }) => {
  const [isRealizing, setIsRealizing] = useState(false);
  const [reflectionLevel, setReflectionLevel] = useState(0);

  useEffect(() => {
    if (isRealizing && reflectionLevel < 100) {
      const timer = setTimeout(() => setReflectionLevel(prev => prev + 1), 50);
      if (reflectionLevel >= 99) onRealize();
      return () => clearTimeout(timer);
    }
  }, [isRealizing, reflectionLevel]);

  const handleRealization = () => {
    setIsRealizing(true);
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className={`p-10 md:p-16 border rounded-[4rem] transition-all duration-[2000ms] relative overflow-hidden group shadow-4xl ${isRealizing ? 'bg-white/10 border-cyan-400' : 'bg-black/60 border-white/10'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--neon-cyan)_0%,_transparent_80%)] opacity-5 pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
           <div>
              <h3 className={`orbitron text-2xl font-black uppercase tracking-[0.5em] flex items-center gap-6 ${isRealizing ? 'text-cyan-400' : 'text-white/60'}`}>
                <Eye size={32} className={isRealizing ? 'animate-pulse' : ''} /> The Perfect Mirror
              </h3>
              <p className="text-[10px] text-white/30 font-mono tracking-[0.4em] mt-3 uppercase">Field Experiment: Observer Reflexivity</p>
           </div>
           <div className={`px-6 py-2 rounded-full border flex items-center gap-4 ${isRealizing ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-black/40 border-white/10 text-white/40'}`}>
              <div className={`w-2 h-2 rounded-full ${isRealizing ? 'bg-cyan-400 animate-ping shadow-[0_0_10px_cyan]' : 'bg-white/20'}`} />
              <span className="orbitron text-[10px] font-black tracking-widest uppercase">{isRealizing ? 'REFLECTING...' : 'EXPERIMENT_IDLE'}</span>
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-20 relative z-10">
           <div className="relative w-80 h-80 flex items-center justify-center">
              <div className={`absolute inset-0 border-2 border-dashed rounded-full transition-all duration-[3000ms] ${isRealizing ? 'border-cyan-400 rotate-180 scale-125 opacity-20' : 'border-white/10 rotate-0 scale-100'}`} />
              <div className={`absolute inset-10 border-2 border-dashed rounded-full transition-all duration-[3000ms] ${isRealizing ? 'border-magenta-400 -rotate-180 scale-110 opacity-30' : 'border-white/10 rotate-0 scale-100'}`} />
              
              <div className="relative z-20 flex flex-col items-center gap-4 group">
                 <div className={`w-48 h-48 rounded-full border-2 transition-all duration-[2000ms] flex flex-col items-center justify-center backdrop-blur-3xl shadow-4xl ${isRealizing ? 'border-cyan-400 bg-white/5' : 'border-white/20 bg-black/40'}`}>
                    {isRealizing ? (
                      <span className="orbitron text-6xl font-black text-white glow-cyan tracking-tighter">YOU.</span>
                    ) : (
                      <InfinityIcon size={64} className="text-white/20 group-hover:text-cyan-400/40 transition-colors" />
                    )}
                 </div>
                 <span className={`orbitron text-[10px] font-black uppercase tracking-[0.5em] transition-opacity duration-1000 ${isRealizing ? 'opacity-100 text-cyan-400' : 'opacity-20 text-white'}`}>
                    {isRealizing ? 'COGNITIVE_LOOP_SYNC' : 'AWAITING_RECOGNITION'}
                 </span>
              </div>
           </div>

           {isRealizing && (
              <div className="mt-12 w-full max-w-lg animate-in fade-in slide-in-from-bottom-6">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] orbitron font-bold text-white/30 uppercase tracking-widest px-1">Reflexivity Integrity</span>
                    <span className="text-[10px] orbitron font-bold text-cyan-400">{reflectionLevel}%</span>
                 </div>
                 <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div className="h-full bg-cyan-400 shadow-[0_0_20px_cyan] transition-all duration-300" style={{ width: `${reflectionLevel}%` }} />
                 </div>
              </div>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 relative z-10">
           <div className="flex flex-col gap-6">
              <p className="text-[13px] text-white/60 leading-relaxed font-serif italic max-w-md">
                 "You are not your brain. You are the field that generates brains. The trauma is a twist in the field; the realization is the untwisting."
              </p>
              {!isRealizing && (
                <button 
                  onClick={handleRealization}
                  className="w-fit px-12 py-5 bg-cyan-500 text-black orbitron text-xs font-black rounded-2xl hover:bg-cyan-400 active:scale-95 shadow-4xl transition-all uppercase tracking-[0.3em] flex items-center gap-4"
                >
                  <Sparkles size={18} /> INITIALIZE_REALIZATION
                </button>
              )}
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <MirrorStat label="Non-Local Sync" value="99.9" unit="%" color="text-emerald-400" />
              <MirrorStat label="Morphic Drift" value="0.00" unit="η" color="text-cyan-400" />
              <MirrorStat label="Observer Entropy" value={(1-coherence).toFixed(3)} unit="H" color="text-red-400" />
              <MirrorStat label="Field Density" value="Planck" unit="ρ" color="text-magenta-400" />
           </div>
        </div>
      </div>
    </div>
  );
};

const MirrorStat: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-4 bg-white/5 border border-white/5 rounded-3xl flex flex-col gap-1">
     <span className="text-[7px] text-white/30 uppercase font-bold tracking-widest">{label}</span>
     <div className="flex items-baseline gap-1">
        <span className={`orbitron text-sm font-bold ${color}`}>{value}</span>
        <span className="text-[8px] text-white/20 font-bold">{unit}</span>
     </div>
  </div>
);

export default FieldMirror;
