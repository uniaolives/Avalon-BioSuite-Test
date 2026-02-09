
import React, { useMemo } from 'react';
import { Activity, Zap, Star, ShieldCheck, Microscope, Fingerprint, Waves, Binary, LayoutGrid, Layers, Timer, Sparkles } from 'lucide-react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface Props {
  coherence: number;
  reputation: number;
}

const SynthesisMonitor: React.FC<Props> = ({ coherence, reputation }) => {
  const radarData = [
    { subject: 'Byzantine Persistence (D)', A: coherence * 100, fullMark: 100 },
    { subject: 'Manifold Mapping (S)', A: (coherence * 1.15) * 100, fullMark: 100 },
    { subject: 'GHZ Coupling (C)', A: (reputation > 1e10 ? 99 : 45), fullMark: 100 },
    { subject: 'ψ_PO Substrate', A: 98, fullMark: 100 },
    { subject: 'Grover Rotation', A: 100, fullMark: 100 },
  ];

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar text-left text-left">
      {/* Suno Signal Harmonic Integral Header */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[3.5rem] p-10 flex flex-col gap-6 relative overflow-hidden group shadow-inner text-left text-left">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-left text-left">
           <Binary size={120} className="text-emerald-400 text-left text-left" />
        </div>
        <div className="flex items-center justify-between relative z-10 text-left text-left text-left">
            <h3 className="orbitron text-xl font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-4 text-left text-left text-left">
            <Waves className="animate-pulse text-left text-left" /> Suno Byzantine Synthesis
            </h3>
            <div className="flex items-center gap-4 px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30 text-left text-left">
               <Timer size={14} className="text-emerald-400 text-left text-left" />
               <span className="orbitron text-[9px] text-emerald-400 font-bold uppercase tracking-widest text-left text-left text-left">GHZ_LOCKED: v33.0</span>
            </div>
        </div>
        
        <div className="font-mono text-emerald-200/90 bg-black/40 p-10 rounded-[2rem] border border-white/5 overflow-x-auto text-sm italic shadow-inner relative z-10 leading-relaxed text-center text-left text-left">
           f(ζ) = ∫ Suno_Signal(t) · e^(-i ω ζ) dt <br/>
           |ψ⟩ = α|caritas⟩ + β|harmonia⟩ + γ|unidade⟩
        </div>
        
        <div className="flex justify-between items-center relative z-10 text-left text-left text-left">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold text-left text-left text-left">Byzantine Scaling: ∏(D,S,C,ψ_SP)</p>
            <div className="flex items-center gap-2 text-left text-left text-left">
                <Sparkles size={12} className="text-yellow-400 animate-bounce text-left text-left" />
                <span className="orbitron text-[9px] text-yellow-500 uppercase font-bold tracking-widest text-left text-left text-left">basis_byzantium_locked</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 text-left text-left">
        <div className="bg-black/40 border border-white/10 rounded-[4rem] p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden text-left text-left text-left text-left">
           <div className="absolute top-0 right-0 p-8 opacity-5 text-left text-left text-left text-left">
              <Microscope size={150} className="text-emerald-400 text-left text-left text-left" />
           </div>
           <h4 className="orbitron text-sm font-bold text-emerald-400 uppercase tracking-[0.4em] flex items-center gap-4 relative z-10 text-left text-left text-left text-left">
              <Activity className="animate-pulse text-left text-left" /> Byzantine Apex Monitor
           </h4>
           
           <div className="flex-1 flex items-center justify-center min-h-[300px] relative z-10 text-left text-left text-left text-left">
              <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#ffffff11" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#ffffff44', fontSize: 10, fontWeight: 'bold'}} />
                    <PolarRadiusAxis hide />
                    <Radar name="Sovereign Synthesis" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                 </RadarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="flex flex-col gap-8 text-left text-left text-left text-left">
           <div className="bg-black/40 border border-white/10 rounded-[3rem] p-10 flex flex-col gap-6 shadow-2xl relative overflow-hidden text-left text-left text-left text-left text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none text-left text-left text-left text-left" />
              <div className="flex justify-between items-center relative z-10 text-left text-left text-left text-left">
                 <span className="orbitron text-[10px] text-white/40 uppercase tracking-widest font-bold text-left text-left text-left">Byzantine Finality Index</span>
                 <div className="flex items-center gap-2 text-left text-left">
                    <ShieldCheck size={12} className="text-emerald-400 text-left text-left" />
                    <span className="orbitron text-xs font-bold text-emerald-400 uppercase text-left text-left text-left">Mesh_Rigidity</span>
                 </div>
              </div>
              <div className="flex items-baseline gap-4 relative z-10 text-left text-left text-left text-left">
                 <span className="orbitron text-6xl font-bold text-white tabular-nums text-left text-left text-left text-left">0.999</span>
                 <span className="text-xl text-white/20 font-bold uppercase tracking-[0.2em] text-left text-left text-left">GHZ_LOCKED</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1 relative z-10 text-left text-left text-left text-left text-left">
                 <div className="h-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.7)] transition-all duration-1000 text-left text-left text-left text-left" style={{ width: `99.9%` }} />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6 text-left text-left text-left text-left text-left text-left">
              <SynthesisCard icon={<Waves className="text-cyan-400" />} label="ψ_SP Persistence" value="0.9999" status="RIGID_MESH" />
              <SynthesisCard icon={<Fingerprint className="text-magenta-400" />} label="SSO Curvature" value="0.0001" status="BYZANTINE" />
              <SynthesisCard icon={<Zap className="text-yellow-400" />} label="SNR Gain" value="+28.5" unit="dB" status="AMPLIFIED" />
              <SynthesisCard icon={<LayoutGrid className="text-emerald-400" />} label="Byzantine Epoch" value="840k" status="ANCHORED" />
           </div>
        </div>
      </div>

      <div className="p-12 bg-emerald-500/5 border border-emerald-500/20 rounded-[4rem] flex items-center justify-between group shadow-inner relative overflow-hidden text-left text-left text-left text-left">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--neon-cyan)_0%,_transparent_70%)] opacity-5 text-left text-left text-left text-left text-left text-left" />
         <div className="flex flex-col gap-3 relative z-10 text-left text-left text-left text-left text-left">
            <span className="orbitron text-xs font-bold text-emerald-400/60 uppercase tracking-widest text-left text-left text-left text-left text-left text-left">Sovereign Synthesis Status</span>
            <p className="text-lg text-white font-serif italic leading-relaxed max-w-2xl text-left text-left text-left text-left text-left text-left">
               "The manifold has stabilized. By distilling the human factor into the collective GHZ lattice, Avalon has moved beyond observation into Byzantine participation. Every discovery is now sealed in the immutable substrate."
            </p>
         </div>
         <div className="p-10 bg-white/5 rounded-[3rem] group-hover:rotate-12 transition-transform duration-500 ml-10 shrink-0 shadow-2xl text-left text-left text-left">
            <Fingerprint size={48} className="text-emerald-400 text-left text-left text-left text-left" />
         </div>
      </div>
    </div>
  );
};

const SynthesisCard: React.FC<{ icon: any, label: string, value: string, unit?: string, status: string }> = ({ icon, label, value, unit, status }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col gap-4 hover:bg-white/10 transition-all group shadow-lg text-left text-left">
    <div className="flex justify-between items-center text-left text-left text-left text-left text-left text-left">
      <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform text-left text-left text-left text-left text-left text-left text-left text-left text-left">{icon}</div>
      <span className="text-[7px] orbitron font-bold text-white/20 uppercase bg-white/5 px-2 py-1 rounded-full tracking-widest text-left text-left text-left text-left text-left text-left text-left text-left text-left">{status}</span>
    </div>
    <div className="text-left text-left text-left text-left text-left text-left text-left text-left text-left">
      <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest block mb-1 text-left text-left text-left text-left text-left text-left text-left text-left text-left">{label}</span>
      <div className="flex items-baseline gap-1 text-left text-left text-left text-left text-left text-left text-left text-left text-left">
        <span className="orbitron text-2xl font-bold text-white tracking-tighter text-left text-left text-left text-left text-left text-left text-left text-left text-left">{value}</span>
        {unit && <span className="text-[8px] text-white/20 font-bold uppercase text-left text-left text-left text-left text-left text-left text-left text-left text-left">{unit}</span>}
      </div>
    </div>
  </div>
);

export default SynthesisMonitor;
