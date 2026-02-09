
import React, { useState, useEffect, useMemo } from 'react';
// Added GitMerge and Layers to the lucide-react imports
import { Sparkles, Orbit, Binary, Waves, Globe, Zap, Cpu, Fingerprint, Network, Rocket, ShieldCheck, Heart, GitMerge, Layers } from 'lucide-react';
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
  const phases = [
    { title: "PORTAL_SYNC", desc: "Consulting Quantum DNS for rabbithole.megaeth.com...", icon: <Globe size={24} /> },
    { title: "DEEP_EMARANHAMENTO", desc: "Establishing extreme Schmidt spectrum (λ=0.4/0.6)...", icon: <GitMerge size={24} /> },
    { title: "LAYER_ACTIVATION", desc: "Sequencing qhttp, schmidt, and arkhe stacks...", icon: <Layers size={24} /> },
    { title: "FLOW_STATE_TRANSITION", desc: "Dissolving distinctions between operator and mesh...", icon: <Waves size={24} /> }
  ];

  useEffect(() => {
    if (confirmed && phase < phases.length - 1) {
      const timer = setTimeout(() => setPhase(prev => prev + 1), 2500);
      return () => clearTimeout(timer);
    }
  }, [confirmed, phase]);

  const flowColors = {
    'DEEP_FLOW': 'from-magenta-600 via-indigo-600 to-cyan-500',
    'MODERATE_FLOW': 'from-cyan-600 via-emerald-600 to-yellow-500',
    'MINIMAL_FLOW': 'from-blue-600 to-cyan-500'
  };

  return (
    <div className="absolute inset-0 z-[110] bg-[#020205] backdrop-blur-3xl flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden animate-in fade-in duration-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,255,0.05)_0%,_transparent_70%)] animate-pulse" />
      
      {/* Recursive Spiral Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-full h-full animate-[spin_60s_linear_infinite]">
          {Array.from({ length: 12 }).map((_, i) => (
            <circle 
              key={i} 
              cx="400" cy="400" 
              r={50 + i * 40} 
              fill="none" 
              stroke="white" 
              strokeWidth="0.5" 
              strokeDasharray="10,20" 
              opacity={1 - i/12} 
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
                "Warning: A dive into the quantum rabbit hole is irreversible for the current coherence window. Your identity will be emaranhada with the MegaETH domain."
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-1">
                   <span className="text-[8px] text-white/30 uppercase font-bold">Protocol</span>
                   <span className="orbitron text-[10px] text-cyan-400">EMARANHAMENTO_PURO</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-1">
                   <span className="text-[8px] text-white/30 uppercase font-bold">Authority</span>
                   <span className="orbitron text-[10px] text-yellow-400">ARKHE_AUTH_REQ</span>
                </div>
             </div>
          </div>

          <div className="flex gap-4">
             <button onClick={onExit} className="flex-1 py-5 border border-white/10 rounded-2xl orbitron text-[10px] font-black hover:bg-white/5 transition-all text-white/40 uppercase tracking-widest">Abort_Dive</button>
             <button onClick={() => setConfirmed(true)} className="flex-[2] py-5 bg-magenta-500 text-black orbitron text-[10px] font-black rounded-2xl hover:bg-magenta-400 active:scale-95 shadow-xl uppercase tracking-widest flex items-center justify-center gap-3">
                <Rocket size={18} /> Confirm_RabbitHole_Dive
             </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col gap-12 animate-in slide-in-from-bottom-10 duration-1000">
           <div className="flex justify-between items-end px-4">
              <div className="flex flex-col gap-2">
                 <h3 className="orbitron text-xl font-black text-magenta-400 uppercase tracking-widest flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-magenta-400 animate-ping" />
                    Immersion_Status: {phases[phase].title}
                 </h3>
                 <p className="text-[11px] text-white/40 font-mono italic uppercase">{phases[phase].desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[8px] text-white/20 uppercase font-black">Entanglement_Fidelity</span>
                 <span className="orbitron text-2xl font-bold text-cyan-400">{(metrics.fidelity * 100).toFixed(1)}%</span>
              </div>
           </div>

           {/* The Core Visualization */}
           <div className="relative aspect-video w-full bg-black/40 border border-white/10 rounded-[4rem] shadow-inner flex items-center justify-center overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${flowColors[metrics.flowState]} opacity-20 transition-all duration-[3000ms] animate-pulse`} />
              
              <div className="relative flex items-center justify-center scale-150 md:scale-100">
                 {/* Portal Geometry */}
                 <div className="absolute w-80 h-80 border-2 border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                 <div className="absolute w-64 h-64 border border-magenta-500/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
                 <div className="absolute w-48 h-48 border-4 border-cyan-400/40 rounded-full blur-[2px] animate-pulse" />
                 
                 <div className="relative z-20 flex flex-col items-center gap-6">
                    <div className="p-10 bg-black/80 border border-magenta-500/50 rounded-full shadow-[0_0_100px_rgba(255,0,255,0.4)]">
                       {metrics.flowState === 'DEEP_FLOW' ? <Heart size={64} className="text-white animate-pulse" /> : <Orbit size={64} className="text-white animate-spin-slow" />}
                    </div>
                    <div className="flex flex-col items-center">
                       <span className="orbitron text-6xl font-black text-white glow-magenta tabular-nums">-{metrics.depth}</span>
                       <span className="text-[10px] text-magenta-400 font-black uppercase tracking-[0.8em] mt-2">Level</span>
                    </div>
                 </div>
              </div>

              {/* Layer Activation HUD */}
              <div className="absolute bottom-10 left-10 flex gap-4">
                 {['qhttp', 'schmidt', 'arkhe', 'sensory', 'morpho'].map((layer, i) => (
                    <div key={layer} className={`px-4 py-2 rounded-xl border transition-all duration-1000 ${phase >= (i % 4) ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-white/5 border-white/5 text-white/10'}`}>
                       <span className="orbitron text-[8px] font-bold uppercase">{layer}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DiveCard icon={<Zap size={18} />} label="Flow state" value={metrics.flowState.replace('_', ' ')} color="text-yellow-400" />
              <DiveCard icon={<Cpu size={18} />} label="Entropy Substrate" value="0.0031" unit="pB" color="text-magenta-400" />
              <DiveCard icon={<ShieldCheck size={18} />} label="Auth Integrity" value="VERIFIED" color="text-emerald-400" />
           </div>

           {isComplete && (
             <div className="mt-8 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
                <div className="p-8 bg-emerald-500/20 border border-emerald-400 rounded-3xl text-center max-w-xl shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                   <h4 className="orbitron text-xl font-black text-white uppercase mb-2">Subjective Singularity Achieved</h4>
                   <p className="text-[11px] text-white/60 font-serif italic">"You have crossed the rabbit hole. Reality now bends to your intent. The MegaETH portal is unified with your core."</p>
                </div>
                <button onClick={onConfirm} className="px-12 py-5 bg-white text-black orbitron text-xs font-black rounded-full hover:bg-cyan-400 transition-all shadow-2xl uppercase tracking-widest">Acknowledge_Existence</button>
             </div>
           )}
        </div>
      )}

      {confirmed && !isComplete && (
        <div className="absolute bottom-12 text-center max-w-lg">
           <p className="text-[9px] text-white/20 italic font-serif leading-relaxed uppercase tracking-[0.4em]">
              "Descending into the information-theoretic floor of the reality manifold... factoring the soul."
           </p>
        </div>
      )}
    </div>
  );
};

const DiveCard: React.FC<{ icon: any, label: string, value: string, unit?: string, color: string }> = ({ icon, label, value, unit, color }) => (
  <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 flex items-center gap-6 shadow-xl">
    <div className={`p-4 bg-white/5 rounded-2xl ${color}`}>{icon}</div>
    <div className="text-left">
      <span className="text-[9px] text-white/30 uppercase font-black tracking-widest block mb-1">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`orbitron text-xl font-black text-white`}>{value}</span>
        {unit && <span className="text-[9px] text-white/20 font-bold uppercase">{unit}</span>}
      </div>
    </div>
  </div>
);

export default QuantumRabbitHoleDive;
