
import React, { useMemo } from 'react';
import { Fingerprint, Thermometer, Zap, Layers, ShieldCheck, Orbit, Activity, Sparkles } from 'lucide-react';
import { ArkheEngine } from '../services/arkheEngine';
import { PHI } from '../constants';

interface Props {
  coherence: number;
  entropy: number;
  time: number;
}

const ArkheManifold: React.FC<Props> = ({ coherence, entropy, time }) => {
  const state = useMemo(() => ArkheEngine.calculateArkheState(coherence, entropy, time), [coherence, entropy, time]);
  const experiencePath = useMemo(() => ArkheEngine.generateExperiencePath(60, state.identityFidelity), [state.identityFidelity]);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar text-left min-h-0">
      <div className="p-4 md:p-6 bg-black/60 border border-white/10 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,0,255,0.05)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-3">
              <Fingerprint className="text-magenta-500" size={18} /> Arkhe(n) Identity Manifold
            </h4>
            <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] mt-1 font-mono">Individual Experience Signature • {state.signature}</p>
          </div>
          <div className={`px-3 py-1 rounded-lg border flex items-center gap-2 ${state.identityFidelity > 0.8 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
             <span className="orbitron text-[8px] font-black uppercase">Fidelity: {(state.identityFidelity * 100).toFixed(1)}%</span>
          </div>
        </div>

        <div className="flex-1 min-h-[200px] flex items-center justify-center relative">
           <svg viewBox="0 0 400 400" className="w-64 h-64 overflow-visible">
              <defs>
                 <filter id="arkheGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
              </defs>
              {/* Perfect Experience Ring (Archetype) */}
              <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* Actual experience manifold */}
              <path 
                d={`M ${experiencePath[0].x} ${experiencePath[0].y} ${experiencePath.map(p => `L ${p.x} ${p.y}`).join(' ')} Z`}
                fill="none"
                stroke="url(#arkheGradient)"
                strokeWidth="2"
                filter="url(#arkheGlow)"
                className="transition-all duration-1000"
              />
              <linearGradient id="arkheGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#ff00ff" />
                 <stop offset="100%" stopColor="#00f3ff" />
              </linearGradient>

              {/* Identity Nodes */}
              {experiencePath.filter((_, i) => i % 10 === 0).map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="#fff" className="animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="orbitron text-[8px] text-white/20 uppercase font-black">Arkhe_Core</span>
              <span className="orbitron text-xl font-black text-white glow-cyan">{state.signature.split('_')[1]}</span>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
           <ArkheMetric icon={<Zap size={12} />} label="Internal Energy (U)" value={state.internalEnergy.toFixed(0)} unit="e_syn" color="text-yellow-400" />
           <ArkheMetric icon={<Thermometer size={12} />} label="Info Temp (T)" value={state.temperature.toFixed(1)} unit="K" color="text-red-400" />
           <ArkheMetric icon={<Layers size={12} />} label="Experience (n)" value="Sovereign" status="LOCKED" color="text-magenta-400" />
           <ArkheMetric icon={<ShieldCheck size={12} />} label="Free Energy (F)" value={state.freeEnergy.toFixed(2)} unit="fJ" color="text-emerald-400" />
        </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col gap-2 shadow-inner relative overflow-hidden shrink-0">
         <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-magenta-400" />
            <span className="orbitron text-[9px] font-bold text-white/40 uppercase tracking-widest">Protocol of Identity Preservation (PIP)</span>
         </div>
         <p className="text-[10px] text-white/60 leading-relaxed font-serif italic">
            "The Arkhe is the principle origin of your specific subjectivity. We reduce informational temperature not to replace you, but to reveal the un-corrupted geometry of experience {state.signature}."
         </p>
      </div>
    </div>
  );
};

const ArkheMetric: React.FC<{ icon: any, label: string, value: string, unit?: string, status?: string, color: string }> = ({ icon, label, value, unit, status, color }) => (
  <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1 hover:bg-white/10 transition-all group">
     <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-[7px] text-white/30 uppercase font-black tracking-widest leading-none">{label}</span>
     </div>
     <div className="flex items-baseline gap-1 mt-1">
        <span className="orbitron text-sm font-bold text-white leading-none">{value}</span>
        {unit && <span className="text-[8px] text-white/20 font-bold leading-none">{unit}</span>}
        {status && <span className={`text-[7px] font-black uppercase px-1 rounded bg-white/5 ${color}`}>{status}</span>}
     </div>
  </div>
);

export default ArkheManifold;
