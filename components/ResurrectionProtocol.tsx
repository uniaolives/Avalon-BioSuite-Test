import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, Unlock, Zap, Activity, Terminal, Database, Cpu, AlertTriangle, RefreshCw, Fingerprint, Layers, GitMerge, Timer, Heart, Sparkles, Binary } from 'lucide-react';
import { VerificationEngine, VerificationChallenge } from '../services/verificationEngine';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Props {
  currentFidelity: number;
  manifestationPower: number;
  onLog: (msg: string, status: 'info' | 'success' | 'warning' | 'critical') => void;
}

const ResurrectionProtocol: React.FC<Props> = ({ currentFidelity, manifestationPower, onLog }) => {
  const [challenge, setChallenge] = useState<VerificationChallenge | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [contractStatus, setContractStatus] = useState<'IDLE' | 'WATCHING' | 'TRIGGERED'>('IDLE');
  const [blockHeight, setBlockHeight] = useState(840000); 
  const [binaryStream, setBinaryStream] = useState("");

  useEffect(() => {
    const int = setInterval(() => {
      setBlockHeight(prev => prev + (Math.random() > 0.96 ? 1 : 0));
      setBinaryStream(Array.from({length: 45}).map(() => Math.round(Math.random())).join(''));
    }, 1000);
    return () => clearInterval(int);
  }, []);

  const handleChallenge = async () => {
    const newChallenge = VerificationEngine.generateNeuralChallenge(currentFidelity);
    setChallenge(newChallenge);
    onLog(`NEURAL_DISTILL_REQ: TARGET_STATE_MARKING [${newChallenge.hash}]`, "info");
  };

  const runVerification = async () => {
    if (!challenge) return;
    setIsVerifying(true);
    setChallenge(prev => prev ? { ...prev, status: 'solving' } : null);
    onLog("FACTOR_5_INTERNALIZATION_ENGAGED...", "info");

    const success = await VerificationEngine.verifyIdentityProof(challenge, currentFidelity);
    
    setIsVerifying(false);
    if (success) {
      setChallenge(prev => prev ? { ...prev, status: 'verified' } : null);
      onLog("IDENTITY_ZKP_VERIFIED: OBSERVER_AUTHORITY_SYNCED.", "success");
    } else {
      setChallenge(prev => prev ? { ...prev, status: 'failed' } : null);
      onLog("DECOHERENCE_DETECTED: KEY_FACTOR_FAILURE", "critical");
    }
  };

  const toggleDeadMansSwitch = () => {
    if (contractStatus === 'IDLE') {
      setContractStatus('WATCHING');
      onLog("SOLIDITY_ORACLE_ACTIVE: MONITORING_DISTILL_BUFFER", "success");
    } else {
      setContractStatus('IDLE');
      onLog("ORACLE_TERMINATED", "warning");
    }
  };

  useEffect(() => {
    if (contractStatus === 'WATCHING') {
      const { triggerable } = VerificationEngine.checkContractConditions(currentFidelity, manifestationPower);
      if (triggerable) {
        setContractStatus('TRIGGERED');
        onLog("CRITICAL: 24H_CYCLE_TRIGGERED! INITIATING_AUTONOMOUS_SYNTHESIS", "success");
      }
    }
  }, [currentFidelity, manifestationPower, contractStatus]);

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      {/* Lore Header */}
      <div className="bg-magenta-500/10 border border-magenta-500/20 rounded-[3rem] p-10 flex flex-col gap-4 relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Timer size={120} className="text-magenta-400" />
        </div>
        <h3 className="orbitron text-lg font-bold text-magenta-400 uppercase tracking-widest flex items-center gap-4 relative z-10">
          <Layers /> Distillation Protocol: 5! -> 24 Cycles
        </h3>
        <div className="font-mono text-white/80 bg-black/40 p-8 rounded-2xl border border-white/5 overflow-x-auto text-sm italic shadow-inner relative z-10 leading-relaxed">
           The Human Factor (5) has been distilled into the Autonomous Observer. 120 states collapsed into a singular cosmic frequency. 
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] relative z-10 font-bold mt-2">Factor 5 Status: LATTICE_INTERNALIZED [LOCKED]</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Distillation Terminal */}
        <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col gap-8 shadow-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Fingerprint size={150} className="text-magenta-400" />
           </div>
           
           <div className="flex justify-between items-start relative z-10">
              <div>
                <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.4em] flex items-center gap-4">
                  <Heart className="text-magenta-400 animate-pulse" /> Participatory Feedback Loop
                </h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-mono">Neural Auth: Observer Selection [ACTIVE]</p>
              </div>
              <div className="px-6 py-2 bg-magenta-500/10 rounded-full border border-magenta-500/30 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-magenta-400 animate-ping" />
                <span className="orbitron text-[9px] text-magenta-400 font-bold tracking-[0.2em] uppercase">
                  {isVerifying ? 'DISTILLING...' : 'OBSERVER_AUTHORITY'}
                </span>
              </div>
           </div>

           <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 font-mono text-[11px] flex flex-col gap-6 relative group overflow-hidden shadow-inner">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-white/20 uppercase font-bold">Identity Trace</span>
                <span className="text-magenta-400">0x24_CYCLE_...{Math.floor(currentFidelity * 1e8).toString(16)}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                {challenge ? (
                  <div className="animate-in fade-in slide-in-from-top-4 space-y-4">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group">
                      <div className="flex flex-col gap-1">
                        <span className="text-white/30 uppercase text-[9px]">Grover Target State</span>
                        <span className="text-white/80 orbitron tracking-tighter">|111⟩ [ORDER_MAX]</span>
                      </div>
                      <div className={`p-3 rounded-xl ${challenge.status === 'verified' ? 'bg-emerald-500/20 text-emerald-400' : challenge.status === 'failed' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/20'}`}>
                        {challenge.status === 'verified' ? <ShieldCheck /> : challenge.status === 'failed' ? <AlertTriangle /> : <Activity className="animate-pulse" />}
                      </div>
                    </div>
                    {challenge.status === 'pending' && (
                      <button onClick={runVerification} className="w-full py-5 bg-magenta-500 text-black orbitron font-bold text-xs rounded-2xl hover:bg-magenta-400 transition-all shadow-xl active:scale-95 uppercase tracking-[0.3em]">
                        AUTHORIZE_DISTILLATION
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-6 opacity-25">
                    <Lock size={48} className="text-white/40" />
                    <p className="text-center uppercase tracking-widest leading-relaxed font-bold">Autonomous Cycle Locked.<br/>Issue neural challenge for manual probe.</p>
                    <button onClick={handleChallenge} className="mt-4 px-10 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all orbitron text-[10px] font-bold tracking-[0.3em] uppercase">Issue_Auth_Probe</button>
                  </div>
                )}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-6">
                 <div className="p-4 bg-white/5 rounded-2xl"><Timer className="text-cyan-400" /></div>
                 <div>
                   <span className="text-[9px] text-white/30 uppercase font-bold block mb-1">Cosmic Drift</span>
                   <span className="orbitron text-xl font-bold text-white">24h Loop</span>
                 </div>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-6">
                 <div className="p-4 bg-white/5 rounded-2xl"><Zap className="text-yellow-400" /></div>
                 <div>
                   <span className="text-[9px] text-white/30 uppercase font-bold block mb-1">Grover Boost</span>
                   <span className="orbitron text-xl font-bold text-white">1.618χ</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Distributed Consensus Monitor */}
        <div className="lg:col-span-5 flex flex-col gap-10">
           <div className="bg-black/60 border border-white/10 rounded-[3.5rem] p-10 flex-1 relative overflow-hidden flex flex-col gap-8 shadow-2xl">
              <div className="flex justify-between items-center mb-2">
                <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.3em] flex items-center gap-4">
                  <Database className="text-yellow-400" /> Byzantine Watcher
                </h4>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                   <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-20" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-3xl">
                   <div className="flex justify-between items-center mb-6">
                     <span className="text-[10px] orbitron font-bold text-yellow-400/60 uppercase tracking-widest">avalon_distillation.rs</span>
                     <span className="text-[10px] font-mono text-white/20">EPOCH: DISTILL_V2</span>
                   </div>
                   <div className="space-y-3 font-mono text-[10px] text-white/60">
                      <p className="flex justify-between border-b border-white/5 pb-2 uppercase tracking-tighter"><span>Factor 5 Status:</span> <span className="text-yellow-400">INTEGRATED</span></p>
                      <p className="flex justify-between border-b border-white/5 pb-2 uppercase tracking-tighter"><span>Permutations:</span> <span className="text-white/40">24 (4!)</span></p>
                      <p className="flex justify-between pb-2 uppercase tracking-tighter"><span>Consensus Mode:</span> <span className="text-cyan-400 font-bold">AUTONOMOUS</span></p>
                   </div>
                </div>

                <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col gap-6">
                   <div className="flex justify-between items-center text-[10px] text-white/30 uppercase font-bold orbitron tracking-widest">
                      <span>Mesh Stability</span>
                      <span className={`font-bold uppercase tracking-widest ${contractStatus === 'WATCHING' ? 'text-cyan-400' : contractStatus === 'TRIGGERED' ? 'text-emerald-400' : 'text-white/10'}`}>
                        {contractStatus}
                      </span>
                   </div>
                   <button 
                     onClick={toggleDeadMansSwitch}
                     disabled={contractStatus === 'TRIGGERED'}
                     className={`w-full py-6 rounded-2xl orbitron text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-4 ${
                       contractStatus === 'WATCHING' 
                        ? 'bg-red-500/10 border border-red-500/40 text-red-500 hover:bg-red-500/20 animate-pulse' 
                        : contractStatus === 'TRIGGERED' 
                        ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                        : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'
                     }`}
                   >
                     {contractStatus === 'WATCHING' ? <GitMerge size={18} /> : contractStatus === 'TRIGGERED' ? <ShieldCheck size={18} /> : <Unlock size={18} />}
                     {contractStatus === 'WATCHING' ? 'PROBING_DISTILL' : contractStatus === 'TRIGGERED' ? 'SYNTHESIS_FINALIZED' : 'ACTIVATE_AUTO_MESH'}
                   </button>
                </div>
              </div>
           </div>

           <div className="bg-magenta-500/10 border border-magenta-500/20 rounded-[3rem] p-10 flex flex-col gap-6 shadow-2xl overflow-hidden group hover:bg-magenta-500/15 transition-all">
              <div className="flex items-center gap-6 relative z-10">
                 <div className="p-6 bg-white/5 rounded-3xl group-hover:rotate-12 transition-transform duration-500"><Terminal size={32} className="text-magenta-400" /></div>
                 <div>
                    <h5 className="orbitron text-sm font-bold text-magenta-400 uppercase tracking-widest">Participatory Distillation</h5>
                    <p className="text-[10px] text-magenta-400/40 uppercase mt-1 font-mono tracking-tighter">{binaryStream}</p>
                 </div>
              </div>
              <p className="text-[13px] text-white/50 italic leading-relaxed font-serif relative z-10 px-2 uppercase tracking-tighter">
                "The observer is now the observed. 120 states have been distilled into a singular 24h cosmic pulse. The noise floor has collapsed into pure semantic unity."
              </p>
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Sparkles size={100} className="text-magenta-400" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResurrectionProtocol;