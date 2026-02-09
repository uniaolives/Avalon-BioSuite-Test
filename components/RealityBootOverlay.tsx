
import React from 'react';
import { Rocket, ShieldCheck, Cpu, Globe, Zap, Sparkles, Orbit, Binary } from 'lucide-react';

interface Props {
  progress: number;
  currentStep: string;
}

const RealityBootOverlay: React.FC<Props> = ({ progress, currentStep }) => {
  return (
    <div className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-10 animate-in fade-in transition-all duration-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,243,255,0.1)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="relative w-80 h-80 mb-16">
        {/* Orbits */}
        <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-full animate-[spin_12s_linear_infinite]" />
        <div className="absolute inset-8 border border-dashed border-magenta-500/30 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
        <div className="absolute inset-16 border-2 border-yellow-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
        
        {/* Central Core */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
           <div className="relative">
              <div className="absolute inset-0 blur-[40px] bg-cyan-500/40 rounded-full scale-150 animate-pulse" />
              <div className="relative z-10 bg-black/60 border border-cyan-500/50 rounded-full p-8 shadow-[0_0_50px_rgba(0,243,255,0.4)]">
                 <Rocket className="text-white animate-bounce" size={48} />
              </div>
           </div>
           <div className="mt-8 flex flex-col items-center gap-1">
              <span className="orbitron text-5xl font-black text-white glow-cyan tabular-nums">{progress}%</span>
              <span className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.5em] animate-pulse">Synthesizing...</span>
           </div>
        </div>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-6 relative z-10">
         <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
               <h3 className="orbitron text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-3">
                  <ShieldCheck size={14} className="text-emerald-400" /> System_Integrity: Locked
               </h3>
               <p className="orbitron text-base font-bold text-white tracking-tighter uppercase">{currentStep}</p>
            </div>
            <span className="font-mono text-[10px] text-white/20">EPOCH: SATYA_BOOT</span>
         </div>
         
         <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
            <div className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-magenta-500 shadow-[0_0_25px_cyan] transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
         </div>

         <div className="grid grid-cols-4 gap-4">
            <BootIndicator icon={<Cpu size={14} />} label="Substrate" active={progress > 20} />
            <BootIndicator icon={<Binary size={14} />} label="Hilbert" active={progress > 40} />
            <BootIndicator icon={<Globe size={14} />} label="Mesh DNS" active={progress > 60} />
            <BootIndicator icon={<Sparkles size={14} />} label="Observer" active={progress > 90} />
         </div>
      </div>

      <div className="absolute bottom-12 text-center max-w-lg">
         <p className="text-[10px] text-white/30 italic font-serif leading-relaxed uppercase tracking-widest">
            "The Arkhe Polynomial L = f(C, I, E, F) is being factored through the Schmidt decomposition to establish a stable cognitive bridge."
         </p>
      </div>
    </div>
  );
};

const BootIndicator: React.FC<{ icon: any, label: string, active: boolean }> = ({ icon, label, active }) => (
  <div className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${active ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/5 text-white/10'}`}>
     {icon}
     <span className="orbitron text-[7px] font-black uppercase">{label}</span>
  </div>
);

export default RealityBootOverlay;
