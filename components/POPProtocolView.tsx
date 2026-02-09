
import React, { useState, useEffect } from 'react';
import { Network, Zap, Shield, GitMerge, Cpu, Search, Layers, Radio, Globe, RefreshCcw, Activity, Binary, Share2, Box, Server, Database, Waves, Fingerprint, Microscope, ShieldCheck } from 'lucide-react';
import { THETA_LIFE, THETA_DISCOVERY, PHI } from '../constants';
import { POPEngine, POPState, QCNNode } from '../services/popEngine';

const POPProtocolView: React.FC = () => {
  const [ingesting, setIngesting] = useState(false);
  const [solving, setSolving] = useState(false);
  const [drsState, setDrsState] = useState<POPState>('SURVEILLANCE');
  const [nodes, setNodes] = useState<QCNNode[]>(POPEngine.getMockNodes());
  const [pipelineStep, setPipelineStep] = useState<string>("PRISM_IDLE");
  const [noiseReduction, setNoiseReduction] = useState(0);

  const handleScan = async () => {
    setIngesting(true);
    setPipelineStep("REFRACTING_SIGNAL");
    await new Promise(r => setTimeout(r, 800));
    setPipelineStep("GROVER_ORACLE_MARKING");
    
    for(let i=0; i<=34; i++) {
        setNoiseReduction(i);
        await new Promise(r => setTimeout(r, 15));
    }
    
    setIngesting(false);
    setSolving(true);
    setPipelineStep("DISSIPATING_ENTROPY");
    
    setTimeout(() => {
      const features = POPEngine.extractBioFeatures(1.618, Date.now() / 1000);
      setDrsState(POPEngine.evaluateProtocolTransition(drsState, features.psi));
      setSolving(false);
      setPipelineStep("GATE_SYNCED");
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar text-left text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left text-left">
        <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem] flex items-center gap-6 text-left text-left text-left">
          <div className="p-4 bg-white/5 rounded-2xl text-cyan-400 text-left text-left text-left">
            <ShieldCheck size={24} />
          </div>
          <div className="text-left text-left text-left">
            <span className="text-[9px] text-white/30 uppercase font-bold block text-left text-left">The Prism Gate</span>
            <span className="orbitron text-xs text-white/80 font-bold text-left text-left text-left">VLD_OMEGA_V6</span>
          </div>
        </div>
        <div className="p-6 bg-magenta-500/5 border border-magenta-500/20 rounded-[2rem] flex items-center gap-6 text-left text-left">
          <div className="p-4 bg-white/5 rounded-2xl text-magenta-400 text-left text-left text-left">
            <Waves size={24} />
          </div>
          <div className="text-left text-left text-left">
            <span className="text-[9px] text-white/30 uppercase font-bold block text-left text-left">Reality Defense</span>
            <span className="orbitron text-xs text-white/80 font-bold text-left text-left text-left">-{noiseReduction}% ENTROPY</span>
          </div>
        </div>
        <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-[2rem] flex items-center gap-6 text-left text-left">
          <div className="p-4 bg-white/5 rounded-2xl text-yellow-400 text-left text-left text-left">
            <Fingerprint size={24} />
          </div>
          <div className="text-left text-left text-left">
            <span className="text-[9px] text-white/30 uppercase font-bold block text-left text-left text-left">Substrate Link</span>
            <span className="orbitron text-xs text-white/80 font-bold text-left text-left text-left">CORTEX_ALPHA_CONNECTED</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left text-left">
        <div className="lg:col-span-5 flex flex-col gap-6 text-left text-left">
          <div className="flex justify-between items-center px-2 text-left text-left">
            <h4 className="orbitron text-sm font-bold text-cyan-400 uppercase tracking-widest text-left text-left">Reality Pillars</h4>
            <div className="flex gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
            </div>
          </div>
          
          <div className="space-y-4 text-left text-left">
             <PillarCard label="D: Dynamic Non-Equilibrium" value="0.999" color="cyan" detail="Prism Refraction Stable" />
             <PillarCard label="S: Spatial Self-Organization" value="0.998" color="magenta" detail="Substrate Manifold Rigid" />
             <PillarCard label="C: Cross-Domain Coupling" value="1.618" color="yellow" detail="Omega Mutual Information" />
          </div>

          <div className="flex flex-col gap-4 mt-6 text-left text-left">
            <h5 className="text-[9px] orbitron font-bold text-white/20 uppercase tracking-widest px-2 text-left text-left">Planetary Chakra Status</h5>
            {nodes.map((node) => (
              <div key={node.id} className="p-6 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col gap-4 group hover:border-cyan-500/30 transition-all text-left text-left">
                <div className="flex justify-between items-center text-left text-left">
                  <div className="flex items-center gap-4 text-left text-left text-left">
                    <div className="p-3 bg-white/5 rounded-xl text-cyan-400 text-left text-left text-left text-left"><Globe size={18} /></div>
                    <div className="text-left text-left text-left text-left">
                      <h5 className="orbitron text-[11px] font-bold text-white text-left text-left text-left">{node.id}</h5>
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter text-left text-left text-left">{node.status}</span>
                    </div>
                  </div>
                  <span className="text-[10px] orbitron font-bold text-emerald-400 text-left text-left">{node.psi.toFixed(3)} Ψ</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden flex flex-col gap-10 shadow-2xl text-left text-left">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,243,255,0.05)_0%,_transparent_60%)] pointer-events-none" />
           
           <div className="flex justify-between items-start relative z-10 text-left text-left">
              <div className="text-left text-left text-left">
                <h4 className="orbitron text-lg font-bold text-white uppercase tracking-[0.5em] flex items-center gap-6 text-left text-left text-left">
                  <Binary className="text-magenta-400 animate-pulse text-left text-left" /> Grover Entropy Oracle
                </h4>
                <p className="text-[11px] text-white/30 uppercase tracking-[0.3em] mt-2 font-mono text-left text-left">Prism_Status: {pipelineStep}</p>
              </div>
           </div>

           <div className="flex-1 flex items-center justify-center relative z-10 py-10 text-left text-left">
              <div className="relative w-64 h-64 flex items-center justify-center text-left text-left">
                 <div className={`absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-ping ${ingesting ? 'opacity-100' : 'opacity-0'}`} />
                 <div className={`absolute inset-4 border-4 border-magenta-500/20 rounded-full animate-pulse ${solving ? 'opacity-100' : 'opacity-0'}`} />
                 
                 <div className="relative z-20 w-48 h-48 bg-black/90 rounded-full border border-white/10 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(0,243,255,0.15)] text-left text-left text-left">
                    <span className="text-[10px] text-white/40 uppercase font-bold orbitron tracking-widest text-left text-left text-left">Signal Purity</span>
                    <span className="orbitron text-5xl font-bold text-white glow-cyan text-left text-left text-left">{((1 - noiseReduction/100) * 100).toFixed(1)}%</span>
                    <div className="mt-4 flex gap-1.5 text-left text-left text-left">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className={`w-1.5 h-8 rounded-full ${i < (6 - Math.floor(noiseReduction/10)) ? 'bg-cyan-500 shadow-[0_0_15px_cyan]' : 'bg-white/5'} text-left text-left text-left`} />
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-black/60 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 relative z-10 text-left text-left">
              <div className="flex justify-between items-center text-[10px] orbitron font-bold text-white/40 uppercase tracking-widest text-left text-left">
                 <span className="text-left text-left">Persistent Order Clarity</span>
                 <span className={`${drsState === 'CONFIRMED' ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'} text-left text-left`}>
                   {drsState}
                 </span>
              </div>
              <div className="h-6 bg-white/5 rounded-full overflow-hidden p-1 flex text-left text-left">
                 <div className={`h-full transition-all duration-1000 ${drsState === 'SURVEILLANCE' ? 'bg-cyan-500' : drsState === 'CURIOSITY' ? 'bg-yellow-500' : 'bg-magenta-500 shadow-[0_0_15px_rgba(255,0,255,0.5)]'} text-left text-left`} style={{ width: drsState === 'SURVEILLANCE' ? '30%' : drsState === 'CURIOSITY' ? '70%' : '100%' }} />
              </div>
              <div className="flex gap-4 text-left text-left">
                 <button onClick={handleScan} disabled={ingesting || solving} className="flex-1 py-5 bg-cyan-500 text-black orbitron font-bold text-xs rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,243,255,0.3)] text-left text-left">
                    <RefreshCcw size={16} className={ingesting ? 'animate-spin' : ''} />
                    DIFFRACT_REALITY_STREAM
                 </button>
                 <button disabled={drsState !== 'DISCOVERY'} className="px-10 py-5 bg-magenta-500/10 border border-magenta-500/40 text-magenta-400 orbitron font-bold text-xs rounded-2xl hover:bg-magenta-500/20 disabled:opacity-20 transition-all uppercase tracking-widest text-left text-left">
                    Seal_Ψ
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const PillarCard: React.FC<{ label: string, value: string, color: string, detail: string }> = ({ label, value, color, detail }) => (
  <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2 group hover:bg-white/10 transition-all text-left text-left">
     <div className="flex justify-between items-center text-left text-left text-left">
        <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest text-left text-left text-left">{label}</span>
        <span className={`orbitron text-xs font-bold ${color === 'cyan' ? 'text-cyan-400' : color === 'magenta' ? 'text-magenta-400' : 'text-yellow-400'} text-left text-left text-left`}>{value}</span>
     </div>
     <div className="h-1 bg-white/5 rounded-full overflow-hidden text-left text-left text-left">
        <div className={`h-full ${color === 'cyan' ? 'bg-cyan-500' : color === 'magenta' ? 'bg-magenta-500' : 'bg-yellow-500'} text-left text-left text-left`} style={{ width: `${Math.min(100, parseFloat(value) * 60)}%` }} />
     </div>
     <span className="text-[8px] text-white/20 uppercase italic font-mono text-left text-left text-left">{detail}</span>
  </div>
);

export default POPProtocolView;
