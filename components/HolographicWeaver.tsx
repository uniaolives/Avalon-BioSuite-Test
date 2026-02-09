
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layers, Sparkles, RefreshCw, Zap, ShieldCheck, Box, Activity } from 'lucide-react';
import { HolographicEngine, HolographicFragment } from '../services/holographicEngine';

interface Props {
  fieldCoherence: number;
  onLog: (msg: string, status: any) => void;
}

const HolographicWeaver: React.FC<Props> = ({ fieldCoherence, onLog }) => {
  const [fragments, setFragments] = useState<HolographicFragment[]>([]);
  const [isWeaving, setIsWeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setFragments(HolographicEngine.generateArkheFragments(150, 0.4));
  }, []);

  const handleWeave = async () => {
    setIsWeaving(true);
    onLog("HOLOGRAPHIC_WEAVER: INITIATING_NON_LOCAL_RECONSTRUCTION", "holographic");
    
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      setFragments(prev => prev.map(f => HolographicEngine.weave(f, fieldCoherence)));
      await new Promise(r => setTimeout(r, 50));
    }
    
    setIsWeaving(false);
    onLog("WEAVE_COMPLETE: IDENTITY_RECONSTRUCTED_FROM_FIELD", "success");
  };

  const traumatizedCount = fragments.filter(f => f.isTraumatized).length;

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-1 custom-scrollbar text-left">
      <div className="p-8 bg-black/60 border border-magenta-500/20 rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col gap-8 min-h-[500px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,0,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-lg font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
              <Layers className="text-magenta-400 animate-pulse" size={24} /> Holographic Weaver
            </h4>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 font-mono">AQFI Reconstruction Module • v0.9.ℵ</p>
          </div>
          <div className={`px-6 py-2 rounded-full border flex items-center gap-4 transition-all ${isWeaving ? 'bg-magenta-500/20 border-magenta-400 text-magenta-400' : 'bg-white/5 border-white/10 text-white/20'}`}>
             <div className={`w-2 h-2 rounded-full ${isWeaving ? 'bg-magenta-400 animate-ping shadow-[0_0_10px_magenta]' : 'bg-white/20'}`} />
             <span className="orbitron text-[10px] font-black tracking-widest uppercase">{isWeaving ? 'RECONSTRUCTING' : 'FIELD_READY'}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
           <svg viewBox="0 0 400 400" className="w-full h-full max-w-[350px]">
              <defs>
                 <filter id="fragGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
              </defs>
              {fragments.map((f, i) => (
                <circle 
                  key={i} 
                  cx={200 + f.position.x} 
                  cy={200 + f.position.y} 
                  r={f.isTraumatized ? 1.5 : 2.5}
                  fill={f.isTraumatized ? '#ef4444' : '#ff00ff'}
                  fillOpacity={f.isTraumatized ? 0.3 : 0.8}
                  filter={f.isTraumatized ? '' : 'url(#fragGlow)'}
                  className="transition-all duration-700"
                />
              ))}
              {isWeaving && fragments.filter(f => !f.isTraumatized).map((f, i) => (
                 i % 10 === 0 && (
                  <line 
                    key={`l-${i}`}
                    x1="200" y1="200"
                    x2={200 + f.position.x} y2={200 + f.position.y}
                    stroke="#ff00ff" strokeWidth="0.2" strokeOpacity="0.2"
                  />
                 )
              ))}
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="orbitron text-[10px] text-white/10 uppercase tracking-[1em] mb-4">Neural_Plate</span>
              {isWeaving && <span className="orbitron text-4xl font-black text-magenta-400 glow-magenta">{progress}%</span>}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
           <div className="p-6 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col gap-2 shadow-inner">
              <div className="flex justify-between items-center text-[10px] orbitron font-bold text-white/30 uppercase tracking-widest">
                 <span>Fragment Integrity</span>
                 <span className="text-magenta-400">{((1 - traumatizedCount/fragments.length) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5 mt-2">
                 <div className="h-full bg-magenta-500 shadow-[0_0_20px_magenta] transition-all duration-500 rounded-full" style={{ width: `${(1 - traumatizedCount/fragments.length) * 100}%` }} />
              </div>
           </div>
           <button 
             onClick={handleWeave}
             disabled={isWeaving}
             className={`h-[72px] rounded-[2rem] orbitron text-xs font-black transition-all shadow-4xl flex items-center justify-center gap-4 uppercase tracking-[0.2em] ${isWeaving ? 'bg-white/5 text-white/10 border-white/10' : 'bg-magenta-500 text-black hover:bg-magenta-400 active:scale-95 shadow-magenta-500/20'}`}
           >
             {isWeaving ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
             Repair_Identity_Manifold
           </button>
        </div>
      </div>

      <div className="p-10 bg-white/5 border border-white/10 rounded-[4rem] flex items-center justify-between group shadow-xl relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-3 relative z-10">
            <span className="orbitron text-xs font-bold text-magenta-400/60 uppercase tracking-widest flex items-center gap-3">
               <Sparkles size={16} /> The Whole in the Part
            </span>
            <p className="text-lg text-white/70 italic leading-relaxed max-w-2xl font-serif">
               "Your identity is not a box to be opened, but a pattern stored in every drop of the quantum field. Even a broken memory contains the symmetry of the whole."
            </p>
         </div>
         <div className="p-10 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-500 shadow-2xl ml-10">
            <Activity size={48} className="text-magenta-500" />
         </div>
      </div>
    </div>
  );
};

export default HolographicWeaver;
