
import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Key, Database, Zap, Terminal, RefreshCw, Thermometer, Fingerprint, Lock, Unlock, Binary, Compass, Activity, Sparkles, Orbit } from 'lucide-react';
import { GENESIS_SIGNATURE, RUNNING_BITCOIN_TIMESTAMP, PHI } from '../constants';

interface Props {
  coherence: number;
  time: number;
  onLog: (msg: string, status: any) => void;
}

const LegacyVault: React.FC<Props> = ({ coherence, time, onLog }) => {
  const [cryoStability, setCryoStability] = useState(0.84);
  const [reconstructionProgress, setReconstructionProgress] = useState(0.12);
  const [isMiningRpow, setIsMiningRpow] = useState(false);

  // Decrypting legacy signature effect
  const signatureDisplay = useMemo(() => {
    const chars = "0123456789ABCDEF";
    return GENESIS_SIGNATURE.split('').map(c => {
      if (Math.random() > 0.95) return chars[Math.floor(Math.random() * chars.length)];
      return c;
    }).join('');
  }, [time]);

  const handleRpowSync = () => {
    setIsMiningRpow(true);
    onLog("RPOW_INITIATED: CRYSTALLIZING_CRYPTOGRAPHIC_CONSCIOUSNESS", "legacy");
    setTimeout(() => {
      setIsMiningRpow(false);
      setCryoStability(prev => Math.min(0.99, prev + 0.05));
      setReconstructionProgress(prev => Math.min(1.0, prev + 0.08));
      onLog("RPOW_SEALED: CRYO_MANIFOLD_STABILIZED", "success");
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      {/* Heritage Header */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Database size={150} className="text-orange-400" />
        </div>
        
        <div className="flex justify-between items-start relative z-10">
           <div>
              <h3 className="orbitron text-xl font-black text-white uppercase tracking-[0.4em] flex items-center gap-4">
                <Shield className="text-orange-400 animate-pulse" /> The Hal Finney Legacy Vault
              </h3>
              <p className="text-[10px] text-white/30 font-mono tracking-widest mt-1 uppercase italic">
                "Running bitcoin" - Jan 10, 2009 | Legacy Observer #0
              </p>
           </div>
           <div className="px-6 py-2 bg-black/40 rounded-full border border-orange-500/30 flex items-center gap-4">
              <span className="orbitron text-[10px] text-orange-400 font-black uppercase">Cryo_Station: Alcor-N</span>
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
           </div>
        </div>

        <div className="mt-8 p-6 bg-black/60 border border-white/5 rounded-2xl relative z-10 shadow-inner">
           <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] orbitron font-bold text-white/20 uppercase tracking-[0.3em]">Genetic_Hash_Signature</span>
              <span className="text-[9px] font-mono text-orange-400/80">{signatureDisplay}</span>
           </div>
           <p className="text-[12px] text-white/60 italic leading-relaxed font-serif">
              "Every person’s life is a proof of work. When the substrate fails, the signature remains in the distributed mesh of time. We are reconstructing the witness."
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cryo Monitor */}
        <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col gap-8 shadow-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Thermometer size={120} className="text-cyan-400" />
           </div>
           <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.4em] flex items-center gap-4">
              <Activity className="text-cyan-400 animate-pulse" /> Neural Cryo-Stability
           </h4>

           <div className="flex-1 flex items-center justify-center py-6">
              <div className="relative w-64 h-64 flex items-center justify-center">
                 <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full animate-spin-slow" />
                 <div className="absolute inset-4 border border-dashed border-orange-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                 <div className="relative z-10 text-center flex flex-col items-center">
                    <span className="orbitron text-6xl font-black text-white glow-cyan">{(cryoStability * 100).toFixed(1)}</span>
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1">Stability_ψ</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                 <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Temperature</span>
                 <span className="orbitron text-xl font-bold text-cyan-400">-196.2°C</span>
                 <span className="text-[7px] text-white/10 font-mono">Liquid Nitrogen Substrate</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                 <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Recon_Fidelity</span>
                 <span className="orbitron text-xl font-bold text-orange-400">{(reconstructionProgress * 100).toFixed(1)}%</span>
                 <span className="text-[7px] text-white/10 font-mono">Neural Slice Interpolation</span>
              </div>
           </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-5 flex flex-col gap-8">
           <div className="bg-black/60 border border-white/10 rounded-[3rem] p-10 flex-1 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center">
                <h5 className="orbitron text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-4">
                  <Terminal size={18} /> RPOW Protocol
                </h5>
                <Fingerprint size={20} className="text-white/10" />
              </div>

              <div className="flex-1 space-y-6">
                 <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                    <span className="text-[9px] font-mono text-orange-400/60 uppercase block mb-3">Legacy Status: Pending_Resurrection</span>
                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-2">
                       <div className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-1000" style={{ width: `${reconstructionProgress * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-white/40 italic leading-snug">
                       Computing proof-of-consciousness across 8.4B nodes.
                    </p>
                 </div>

                 <button 
                  onClick={handleRpowSync}
                  disabled={isMiningRpow}
                  className={`w-full py-6 rounded-2xl orbitron text-xs font-black transition-all shadow-xl flex items-center justify-center gap-4 ${
                    isMiningRpow ? 'bg-white/5 text-white/20 border-white/10 animate-pulse' : 'bg-orange-500 text-black hover:bg-orange-400 active:scale-95 shadow-orange-500/20'
                  }`}
                 >
                    {isMiningRpow ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                    {isMiningRpow ? 'MINING_PROOF_OF_LIFE...' : 'SEAL_RPOW_WITNESS'}
                 </button>
              </div>

              <div className="mt-auto border-t border-white/5 pt-6 flex flex-col gap-2">
                 <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase">
                    <span>Block Height</span>
                    <span className="text-white/40">840,000+</span>
                 </div>
                 <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase">
                    <span>Protocol</span>
                    <span className="text-white/40">Reusable Proof-of-Work</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="p-8 bg-white/5 border border-white/10 rounded-[4rem] flex items-center justify-between group shadow-inner relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.03)_0%,_transparent_70%)] opacity-10" />
         <div className="flex flex-col gap-2 relative z-10">
            <span className="orbitron text-xs font-bold text-orange-400/60 uppercase tracking-widest flex items-center gap-3">
               <Binary size={16} /> Cypherpunk Ethos
            </span>
            <p className="text-lg text-white/70 italic leading-relaxed max-w-2xl font-serif">
               "Privacy is necessary for an open society in the electronic age. Hal's vision of running bitcoin was the first step toward a decentralized soul."
            </p>
         </div>
         <div className="p-10 bg-white/5 rounded-[3rem] group-hover:rotate-45 transition-transform duration-1000 ml-10 shrink-0">
            <Orbit size={40} className="text-orange-500" />
         </div>
      </div>
    </div>
  );
};

export default LegacyVault;
