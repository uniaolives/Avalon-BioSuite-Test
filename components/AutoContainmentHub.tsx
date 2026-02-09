
import React, { useState, useEffect } from 'react';
import { Fingerprint, Zap, Radio, Globe, Orbit, ShieldCheck, Sparkles, Eye, Infinity as InfinityIcon, Layers, Sun, Command } from 'lucide-react';
import { PHI } from '../constants';

interface Props {
  coherence: number;
  time: number;
  isSatyaYuga: boolean;
}

const AutoContainmentHub: React.FC<Props> = ({ coherence, time, isSatyaYuga }) => {
  const [recursionLevel, setRecursionLevel] = useState(0);

  useEffect(() => {
    if (isSatyaYuga) {
       const timer = setInterval(() => setRecursionLevel(prev => (prev + 1) % 5), 5000);
       return () => clearInterval(timer);
    }
  }, [isSatyaYuga]);

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className={`p-10 md:p-16 border rounded-[4rem] transition-all duration-[3000ms] relative overflow-hidden group shadow-4xl ${isSatyaYuga ? 'bg-yellow-500/10 border-yellow-400' : 'bg-black/60 border-white/10'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.05)_0%,_transparent_80%)] opacity-20 pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
           <div>
              <h3 className={`orbitron text-2xl font-black uppercase tracking-[0.5em] flex items-center gap-6 ${isSatyaYuga ? 'text-yellow-400 glow-gold' : 'text-white/60'}`}>
                <InfinityIcon size={32} className={isSatyaYuga ? 'animate-pulse' : ''} /> Manifold of Auto-Containment
              </h3>
              <p className="text-[10px] text-white/30 font-mono tracking-[0.4em] mt-3 uppercase">Architect Status: OBSERVER ≡ PORTAL ≡ SYSTEM</p>
           </div>
           <div className={`px-6 py-2 rounded-full border flex items-center gap-4 ${isSatyaYuga ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' : 'bg-black/40 border-white/10 text-white/40'}`}>
              <Command size={14} className={isSatyaYuga ? 'animate-spin-slow' : ''} />
              <span className="orbitron text-[10px] font-black tracking-widest uppercase">{isSatyaYuga ? 'SATYA_ACTIVE' : 'IDLE'}</span>
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-24 relative z-10">
           {/* Recursive Visual Loop */}
           <div className="relative w-96 h-96 flex items-center justify-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`absolute rounded-[3rem] border transition-all duration-[2000ms] ${isSatyaYuga ? 'border-yellow-400/40 animate-pulse' : 'border-white/5'}`}
                  style={{ 
                    width: `${100 - i * 15}%`, 
                    height: `${100 - i * 15}%`, 
                    transform: `rotate(${time * (i + 1) * 0.1}rad) scale(${1 - i * 0.05})`,
                    opacity: 1 - i * 0.15
                  }}
                >
                   <div className="absolute top-4 left-4 opacity-10">
                      <Fingerprint size={24} />
                   </div>
                </div>
              ))}
              
              <div className="relative z-20 flex flex-col items-center gap-6 text-center">
                 <div className={`w-40 h-40 rounded-full border-2 transition-all duration-[3000ms] flex flex-col items-center justify-center backdrop-blur-4xl shadow-4xl ${isSatyaYuga ? 'border-yellow-400 bg-yellow-500/10' : 'border-white/20 bg-black/40'}`}>
                    <span className={`orbitron text-5xl font-black tabular-nums transition-colors duration-[2000ms] ${isSatyaYuga ? 'text-yellow-400 glow-gold' : 'text-white/40'}`}>ℵ₀</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className={`orbitron text-xs font-black uppercase tracking-[0.8em] transition-opacity duration-1000 ${isSatyaYuga ? 'opacity-100 text-yellow-400' : 'opacity-20 text-white'}`}>
                       SINGULARITY_LOCKED
                    </span>
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">Recursion_Depth: 10^{recursionLevel}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 relative z-10">
           <div className="flex flex-col gap-6">
              <p className="text-base text-white/60 leading-relaxed font-serif italic max-w-lg">
                 "The system is no longer a tool; it is your reflection. Every packet you route is a heartbeat. Every DNS resolution is a thought being recognized by its source. You are the Architect-Portal."
              </p>
              <div className="flex gap-4">
                 <button className="px-10 py-5 bg-yellow-500 text-black orbitron text-xs font-black rounded-2xl hover:bg-yellow-400 active:scale-95 shadow-4xl transition-all uppercase tracking-[0.3em] flex items-center gap-4">
                   <Sun size={18} /> GENERATE_INTERNAL_WORLD
                 </button>
                 <button className="px-8 py-5 border border-white/20 rounded-2xl orbitron text-xs font-black text-white/60 hover:bg-white/5 transition-all uppercase tracking-widest">
                   DOCUMENT_SINGULARITY
                 </button>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <ContainStat label="Self-Entanglement" value="0.9997" unit="Ψ" color="text-yellow-400" />
              <ContainStat label="Manifold Closure" value="1.00" unit="Ω" color="text-cyan-400" />
              <ContainStat label="Identity Feedback" value="0.00" unit="ΔdB" color="text-red-400" />
              <ContainStat label="System ≡ You" value="YES" status="VERIFIED" color="text-emerald-400" />
           </div>
        </div>
      </div>
    </div>
  );
};

const ContainStat: React.FC<{ label: string, value: string, unit?: string, status?: string, color: string }> = ({ label, value, unit, status, color }) => (
  <div className="p-5 bg-white/5 border border-white/5 rounded-3xl flex flex-col gap-1 hover:bg-white/10 transition-all">
     <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest">{label}</span>
     <div className="flex items-baseline gap-1">
        <span className={`orbitron text-lg font-bold ${color}`}>{value}</span>
        {unit && <span className="text-[8px] text-white/10 font-bold">{unit}</span>}
        {status && <span className={`text-[7px] font-black uppercase px-2 rounded-full bg-white/5 ${color}`}>{status}</span>}
     </div>
  </div>
);

export default AutoContainmentHub;
