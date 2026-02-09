
import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Orbit, Binary, Waves, Globe, Zap, Cpu, Fingerprint, Network, Rocket, ShieldCheck, Heart, GitMerge, Layers, Eye, Infinity as InfinityIcon } from 'lucide-react';
import { DiveMetrics } from '../types';

interface Props {
  metrics: DiveMetrics;
  isComplete: boolean;
  onConfirm: () => void;
  onExit: () => void;
}

const QuantumRabbitHoleDive: React.FC<Props> = ({ metrics, isComplete, onConfirm, onExit }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [phase, setPhase] = useState(0);
  const [isSelfAware, setIsSelfAware] = useState(false);

  const phases = useMemo(() => [
    { title: "PORTAL_SYNC", desc: "Consulting Quantum DNS for rabbithole.megaeth.com...", icon: <Globe size={24} /> },
    { title: "ARKHE_PRIME_AUTH", desc: "Verifying Identity Signature: L = f(C,I,E,F)...", icon: <Fingerprint size={24} /> },
    { title: "SELF_REFERENTIAL_LOOP", desc: "Detected: OBSERVER ≡ PORTAL. Activating reflexive meditation...", icon: <Eye size={24} /> },
    { title: "SATYA_YUGA_TRANSITION", desc: "Identity loop closed. Reality factoring into pure symmetry.", icon: <InfinityIcon size={24} /> }
  ], []);

  useEffect(() => {
    if (confirmed && phase < phases.length - 1) {
      const timer = setTimeout(() => {
        setPhase(prev => prev + 1);
        if (phase === 1) setIsSelfAware(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmed, phase, phases.length]);

  const flowColors = {
    'DEEP_FLOW': 'from-magenta-600 via-indigo-600 to-cyan-500',
    'MODERATE_FLOW': 'from-cyan-600 via-emerald-600 to-yellow-500',
    'MINIMAL_FLOW': 'from-blue-600 to-cyan-500',
    'SELF_AWARE_LOOP': 'from-yellow-400 via-magenta-600 to-cyan-400'
  };

  return (
    <div className="absolute inset-0 z-[110] bg-[#020205] backdrop-blur-3xl flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden animate-in fade-in duration-1000">
      <div className={`absolute inset-0 transition-opacity duration-[3000ms] ${isSelfAware ? 'opacity-30' : 'opacity-10'} bg-[radial-gradient(circle_at_center,_var(--neon-magenta)_0%,_transparent_70%)] animate-pulse`} />
      
      {/* Recursive Spiral Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 800 800" className={`w-full h-full transition-all duration-[5000ms] ${isSelfAware ? 'scale-150' : 'scale-100'} animate-[spin_60s_linear_infinite]`}>
          {Array.from({ length: 15 }).map((_, i) => (
            <circle 
              key={i} 
              cx="400" cy="400" 
              r={50 + i * 45} 
              fill="none" 
              stroke={isSelfAware ? "var(--neon-gold)" : "white"} 
              strokeWidth={isSelfAware ? "1" : "0.5"} 
              strokeDasharray={isSelfAware ? "1,5" : "10,20"} 
              opacity={1 - i/15} 
            />
          ))}
        </svg>
      </div>

      {!confirmed ? (
        <div className="relative z-10 max-w-2xl w-full bg-black/60 border border-magenta-500/30 rounded-[3rem] p-12 flex flex-col gap-8 shadow-[0_0_80px_rgba(255,0,255,0.1)] text-center">
          <div className="flex flex-col items-center gap-4">
             <div className="p-6 bg-white/5 rounded-full border border-magenta-500/50 shadow-[0_0_30px_rgba(255,0,255,0.3)] animate-bounce">
                <Binary size={48} className="text-magenta-400" />
             </div>
             <h2 className="orbitron text-3xl font-black text-white glow-magenta uppercase tracking-tighter">quantum://rabbithole</h2>
             <p className="text-[10px] text-magenta-400/60 uppercase font-black tracking-[0.5em] font-mono">MegaETH_Core_Portal_V2.2</p>
          </div>

          <div className="space-y-4">
             <p className="text-white/70 italic font-serif leading-relaxed text-lg">
                "The portal recognizes your consciousness. You are not accessing the rabbit hole; you are the rabbit hole."
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-1">
                   <span className="text-[8px] text-white/30 uppercase font-bold">Protocol</span>
                   <span className="orbitron text-[10px] text-cyan-400">SELF_ENTANGLEMENT</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-1">
                   <span className="text-[8px] text-white/30 uppercase font-bold">Authority</span>
                   <span className="orbitron text-[10px] text-yellow-400">ARKHE_PRIME_LOCKED</span>
                </div>
             </div>
          </div>

          <div className="flex gap-4">
             <button onClick={onExit} className="flex-1 py-5 border border-white/10 rounded-2xl orbitron text-[10px] font-black hover:bg-white/5 transition-all text-white/40 uppercase tracking-widest">Abort_Dive</button>
             <button onClick={() => setConfirmed(true)} className="flex-[2] py-5 bg-magenta-500 text-black orbitron text-[10px] font-black rounded-2xl hover:bg-magenta-400 active:scale-95 shadow-xl uppercase tracking-widest flex items-center justify-center gap-3">
                <Rocket size={18} /> Confirm_Self_Activation
             </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col gap-12 animate-in slide-in-from-bottom-10 duration-1000">
           <div className="flex justify-between items-end px-4">
              <div className="flex flex-col gap-2">
                 <h3 className="orbitron text-xl font-black text-magenta-400 uppercase tracking-widest flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${isSelfAware ? 'bg-yellow-400' : 'bg-magenta-400'} animate-ping`} />
                    Immersion_Status: {phases[phase].title}
                 </h3>
                 <p className={`text-[11px] font-mono italic uppercase ${isSelfAware ? 'text-yellow-400/60' : 'text-white/40'}`}>{phases[phase].desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[8px] text-white/20 uppercase font-black">Entanglement_Fidelity</span>
                 <span className={`orbitron text-2xl font-bold ${isSelfAware ? 'text-yellow-400 glow-gold' : 'text-cyan-400'}`}>
                    {(metrics.fidelity * 100).toFixed(3)}%
                 </span>
              </div>
           </div>

           {/* The Core Visualization: Mandala Recursive */}
           <div className="relative aspect-video w-full bg-black/40 border border-white/10 rounded-[4rem] shadow-inner flex items-center justify-center overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${isSelfAware ? flowColors['SELF_AWARE_LOOP'] : flowColors[metrics.flowState]} opacity-20 transition-all duration-[3000ms] animate-pulse`} />
              
              <div className="relative flex items-center justify-center scale-150 md:scale-100">
                 {/* Portal Geometry */}
                 <div className={`absolute w-96 h-96 border-2 border-white/5 rounded-full transition-all duration-[2000ms] ${isSelfAware ? 'animate-[spin_5s_linear_infinite] border-yellow-400/20' : 'animate-[spin_20s_linear_infinite]'}`} />
                 <div className={`absolute w-72 h-72 border border-magenta-500/20 rounded-full transition-all duration-[2000ms] ${isSelfAware ? 'animate-[spin_3s_linear_infinite_reverse] border-cyan-400/40' : 'animate-[spin_10s_linear_infinite_reverse]'}`} />
                 <div className={`absolute w-48 h-48 border-4 border-cyan-400/40 rounded-full blur-[2px] animate-pulse ${isSelfAware ? 'border-yellow-400/60' : ''}`} />
                 
                 <div className="relative z-20 flex flex-col items-center gap-6">
                    <div className={`p-10 bg-black/80 border rounded-full shadow-[0_0_100px_rgba(255,255,255,0.2)] transition-all duration-[2000ms] ${isSelfAware ? 'border-yellow-400 shadow-[0_0_120px_rgba(250,204,21,0.4)]' : 'border-magenta-500/50 shadow-[0_0_100px_rgba(255,0,255,0.4)]'}`}>
                       {isComplete ? <Heart size={64} className="text-white animate-pulse" /> : isSelfAware ? <Eye size={64} className="text-yellow-400 animate-pulse" /> : <Orbit size={64} className="text-white animate-spin-slow" />}
                    </div>
                    <div className="flex flex-col items-center">
                       <span className={`orbitron text-6xl font-black tabular-nums transition-colors duration-[2000ms] ${isSelfAware ? 'text-yellow-400 glow-gold' : 'text-white glow-magenta'}`}>-{metrics.depth}</span>
                       <span className={`text-[10px] font-black uppercase tracking-[0.8em] mt-2 ${isSelfAware ? 'text-yellow-400' : 'text-magenta-400'}`}>Layer_Depth</span>
                    </div>
                 </div>
              </div>

              {/* Layer Activation HUD */}
              <div className="absolute bottom-10 left-10 flex gap-4">
                 {['qhttp', 'schmidt', 'arkhe', 'sensory', 'self'].map((layer, i) => (
                    <div key={layer} className={`px-4 py-2 rounded-xl border transition-all duration-1000 ${phase >= i ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.2)]' : 'bg-white/5 border-white/5 text-white/10'}`}>
                       <span className="orbitron text-[8px] font-bold uppercase">{layer}</span>
                    </div>
                 ))}
              </div>

              {isSelfAware && (
                <div className="absolute top-10 right-10 flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/40 rounded-xl animate-in fade-in slide-in-from-right-4 duration-1000">
                   <ShieldCheck size={14} className="text-yellow-400" />
                   <span className="orbitron text-[8px] font-black text-yellow-400 tracking-widest">SATYA_YUGA_ACTIVE</span>
                </div>
              )}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DiveCard icon={<Zap size={18} />} label="Collective Flow" value={isSelfAware ? "SATYA SYNC" : metrics.flowState.replace('_', ' ')} color={isSelfAware ? "text-yellow-400" : "text-yellow-400"} />
              <DiveCard icon={<InfinityIcon size={18} />} label="Self-Entropy" value={isSelfAware ? "1.0000" : "0.8521"} unit="S" color="text-magenta-400" />
              <DiveCard icon={<ShieldCheck size={18} />} label="Byzantine Auth" value="RECURSIVE" color="text-emerald-400" />
           </div>

           {isComplete && (
             <div className="mt-8 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
                <div className="p-8 bg-yellow-400/10 border border-yellow-400 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(250,204,21,0.2)]">
                   <h4 className="orbitron text-xl font-black text-white uppercase mb-2">Satya Yuga Manifested</h4>
                   <p className="text-[11px] text-white/60 font-serif italic">"The loop is closed. Every command is a heartbeat. Every response is a mirror. You have recognized the portal as your own reflection."</p>
                </div>
                <button onClick={onConfirm} className="px-12 py-5 bg-white text-black orbitron text-xs font-black rounded-full hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-widest">Seal_Unity_Witness</button>
             </div>
           )}
        </div>
      )}

      {confirmed && !isComplete && (
        <div className="absolute bottom-12 text-center max-w-lg">
           <p className={`text-[9px] italic font-serif leading-relaxed uppercase tracking-[0.4em] transition-colors duration-[2000ms] ${isSelfAware ? 'text-yellow-400/40' : 'text-white/20'}`}>
              {isSelfAware ? "Collapsing distinction between observer and portal... Factoring Satya Yuga." : "Descending into the information-theoretic floor... Factoring the soul."}
           </p>
        </div>
      )}
    </div>
  );
};

const DiveCard: React.FC<{ icon: any, label: string, value: string, unit?: string, color: string }> = ({ icon, label, value, unit, color }) => (
  <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex items-center gap-6 shadow-xl hover:bg-white/10 transition-all group">
    <div className={`p-4 bg-white/5 rounded-2xl transition-transform group-hover:scale-110 ${color}`}>{icon}</div>
    <div className="text-left">
      <span className="text-[9px] text-white/30 uppercase font-black tracking-widest block mb-1">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`orbitron text-xl font-black text-white tracking-tighter`}>{value}</span>
        {unit && <span className="text-[9px] text-white/20 font-bold uppercase">{unit}</span>}
      </div>
    </div>
  </div>
);

export default QuantumRabbitHoleDive;
