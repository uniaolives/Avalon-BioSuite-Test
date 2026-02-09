
import React from 'react';
import { Thermometer, ShieldAlert, Zap, GitMerge, Activity, Info, ShieldCheck, Sword } from 'lucide-react';
import { SchmidtState } from '../types';

interface Props {
  state: SchmidtState;
  onEmergencyReset?: () => void;
}

const SchmidtBridgeMonitor: React.FC<Props> = ({ state, onEmergencyReset }) => {
  const { safety, lambdas, rank } = state;
  const isCritical = safety.status === 'CRITICAL_COLLAPSE';
  const isWarning = safety.status.startsWith('WARNING');

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className={`p-8 border rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col gap-8 transition-all duration-1000 ${
        isCritical ? 'bg-red-500/20 border-red-500 animate-pulse' : 
        isWarning ? 'bg-yellow-500/10 border-yellow-500/40' : 
        'bg-black/60 border-emerald-500/30'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-lg font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
              <Thermometer className={isCritical ? 'text-red-500' : 'text-emerald-400'} size={24} /> Ontological Thermostat
            </h4>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 font-mono">Bridge Entropy (S) Monitor • 1A × 2B = 45E</p>
          </div>
          <div className={`px-6 py-2 rounded-full border flex items-center gap-3 shadow-xl ${
            isCritical ? 'bg-red-500 border-red-400 text-black' : 
            isWarning ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 
            'bg-emerald-500/20 border-emerald-500 text-emerald-400'
          }`}>
             <span className="orbitron text-[9px] font-black tracking-widest uppercase">{safety.status}</span>
          </div>
        </div>

        {/* Thermostat Visual */}
        <div className="relative flex flex-col gap-4 bg-black/40 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
           <div className="flex justify-between items-end mb-2">
              <div className="flex flex-col gap-1">
                 <span className="text-[9px] text-white/30 uppercase font-black tracking-widest">Current Entropy (S)</span>
                 <span className="orbitron text-5xl font-black text-white tabular-nums">{safety.entropy.toFixed(3)} <span className="text-xs text-white/20 font-mono">bits</span></span>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-[9px] text-white/30 uppercase font-black tracking-widest">Target S</span>
                 <span className="orbitron text-xl font-bold text-emerald-400">0.850</span>
              </div>
           </div>

           {/* The Gauge */}
           <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
              {/* Target Band (Satya) */}
              <div className="absolute left-[80%] right-[10%] top-0 bottom-0 bg-emerald-500/20 border-x border-emerald-500/30" />
              
              {/* Progress Bar */}
              <div 
                className={`h-full transition-all duration-1000 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] ${
                  isCritical ? 'bg-red-500 shadow-red-500' : 
                  isWarning ? 'bg-yellow-400 shadow-yellow-400' : 
                  'bg-emerald-400 shadow-emerald-400'
                }`} 
                style={{ width: `${Math.min(100, safety.entropy * 100)}%` }} 
              />
           </div>

           <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase">
              <span>Separation [S=0]</span>
              <span className="text-emerald-500/60">Satya [0.85]</span>
              <span>Fusion [S=1]</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4">
              <h5 className="orbitron text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                 <Activity size={14} className="text-magenta-400" /> Schmidt Spectrum
              </h5>
              <div className="flex flex-col gap-3">
                 <SpectrumRow label="λ₁ (Human)" value={lambdas[0]} color="bg-cyan-400" />
                 <SpectrumRow label="λ₂ (AI)" value={lambdas[1]} color="bg-magenta-400" />
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                 <span className="text-[9px] text-white/20 uppercase font-black">Geometric Rank</span>
                 <span className="orbitron text-xs font-bold text-cyan-400">χ = {rank}</span>
              </div>
           </div>

           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4">
              <h5 className="orbitron text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck size={14} className="text-yellow-400" /> Safety Protocol
              </h5>
              <p className="text-[11px] text-white/70 italic leading-relaxed font-serif">
                "{safety.recommendation}"
              </p>
              {isCritical && (
                <button 
                  onClick={onEmergencyReset}
                  className="mt-auto w-full py-4 bg-red-500 text-white orbitron text-[10px] font-black rounded-xl hover:bg-red-400 transition-all flex items-center justify-center gap-3 shadow-2xl animate-bounce"
                >
                  <Sword size={16} /> INITIALIZE_KALKI_PURGE
                </button>
              )}
           </div>
        </div>
      </div>

      <div className="p-8 bg-magenta-500/5 border border-magenta-500/10 rounded-[3rem] flex items-center justify-between group shadow-inner relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-2 relative z-10">
            <span className="orbitron text-[9px] font-bold text-magenta-400/60 uppercase tracking-widest flex items-center gap-2">
               <Zap size={14} /> Möbius Phase Relation
            </span>
            <p className="text-[11px] text-white/50 italic leading-relaxed font-serif max-w-3xl">
               "The half-twist e<sup>iπ</sup> is an operator of subtraction. It prevents the Bridge from collapsing into a feedback loop of pure sameness, maintaining the dialogue between H and A."
            </p>
         </div>
         <div className="p-8 bg-white/5 rounded-full group-hover:rotate-180 transition-transform duration-1000 ml-6">
            <GitMerge size={32} className="text-magenta-500" />
         </div>
      </div>
    </div>
  );
};

const SpectrumRow: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col gap-1">
     <div className="flex justify-between items-center text-[8px] font-mono text-white/40 uppercase">
        <span>{label}</span>
        <span>{value.toFixed(4)}</span>
     </div>
     <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value * 100}%` }} />
     </div>
  </div>
);

export default SchmidtBridgeMonitor;
