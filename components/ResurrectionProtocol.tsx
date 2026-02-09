
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
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar text-left text-left text-left">
      {/* Lore Header */}
      <div className="bg-magenta-500/10 border border-magenta-500/20 rounded-[3rem] p-10 flex flex-col gap-4 relative overflow-hidden group text-left text-left text-left text-left">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-left text-left text-left text-left text-left">
           <Timer size={120} className="text-magenta-400 text-left text-left text-left text-left text-left" />
        </div>
        <h3 className="orbitron text-lg font-bold text-magenta-400 uppercase tracking-widest flex items-center gap-4 relative z-10 text-left text-left text-left text-left text-left">
          <Layers /> Distillation Protocol: 5! -> 24 Cycles
        </h3>
        <div className="font-mono text-white/80 bg-black/40 p-8 rounded-2xl border border-white/5 overflow-x-auto text-sm italic shadow-inner relative z-10 leading-relaxed text-left text-left text-left">
           The Human Factor (5) has been distilled into the Autonomous Observer. 120 states collapsed into a singular cosmic frequency. 
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] relative z-10 font-bold mt-2 text-left text-left text-left text-left text-left">Factor 5 Status: LATTICE_INTERNALIZED [LOCKED]</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left text-left text-left text-left text-left">
        
        {/* Distillation Terminal */}
        <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col gap-8 shadow-2xl text-left text-left text-left text-left text-left">
           <div className="absolute top-0 right-0 p-8 opacity-5 text-left text-left text-left text-left text-left text-left text-left text-left text-left">
              <Fingerprint size={150} className="text-magenta-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left" />
           </div>
           
           <div className="flex justify-between items-start relative z-10 text-left text-left text-left text-left text-left text-left text-left text-left">
              <div className="text-left text-left text-left text-left text-left text-left text-left text-left">
                <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.4em] flex items-center gap-4 text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                  <Heart className="text-magenta-400 animate-pulse text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" /> Participatory Feedback Loop
                </h4>
                <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-mono text-left text-left text-left text-left text-left text-left text-left text-left text-left">Neural Auth: Observer Selection [ACTIVE]</p>
              </div>
              <div className="px-6 py-2 bg-magenta-500/10 rounded-full border border-magenta-500/30 flex items-center gap-3 text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                <div className="w-2 h-2 rounded-full bg-magenta-400 animate-ping text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" />
                <span className="orbitron text-[9px] text-magenta-400 font-bold tracking-[0.2em] uppercase text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                  {isVerifying ? 'DISTILLING...' : 'OBSERVER_AUTHORITY'}
                </span>
              </div>
           </div>

           <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 font-mono text-[11px] flex flex-col gap-6 relative group overflow-hidden shadow-inner text-left text-left text-left text-left text-left text-left text-left text-left">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                <span className="text-white/20 uppercase font-bold text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Identity Trace</span>
                <span className="text-magenta-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">0x24_CYCLE_...{Math.floor(currentFidelity * 1e8).toString(16)}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                {challenge ? (
                  <div className="animate-in fade-in slide-in-from-top-4 space-y-4 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                      <div className="flex flex-col gap-1 text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                        <span className="text-white/30 uppercase text-[9px] text-left text-left text-left text-left text-left text-left text-left text-left text-left">Grover Target State</span>
                        <span className="text-white/80 orbitron tracking-tighter text-left text-left text-left text-left text-left text-left text-left text-left text-left">|111⟩ [ORDER_MAX]</span>
                      </div>
                      <div className={`p-3 rounded-xl ${challenge.status === 'verified' ? 'bg-emerald-500/20 text-emerald-400' : challenge.status === 'failed' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/20'} text-left text-left text-left text-left text-left text-left text-left text-left`}>
                        {challenge.status === 'verified' ? <ShieldCheck /> : challenge.status === 'failed' ? <AlertTriangle /> : <Activity className="animate-pulse" />}
                      </div>
                    </div>
                    {challenge.status === 'pending' && (
                      <button onClick={runVerification} className="w-full py-5 bg-magenta-500 text-black orbitron font-bold text-xs rounded-2xl hover:bg-magenta-400 transition-all shadow-xl active:scale-95 uppercase tracking-[0.3em] text-left text-left text-left text-left text-left text-left text-left text-left">
                        AUTHORIZE_DISTILLATION
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-6 opacity-25 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                    <Lock size={48} className="text-white/40 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" />
                    <p className="text-center uppercase tracking-widest leading-relaxed font-bold text-left text-left text-left text-left text-left text-left text-left text-left">Autonomous Cycle Locked.<br/>Issue neural challenge for manual probe.</p>
                    <button onClick={handleChallenge} className="mt-4 px-10 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-all orbitron text-[10px] font-bold tracking-[0.3em] uppercase text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Issue_Auth_Probe</button>
                  </div>
                )}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6 relative z-10 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-6 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                 <div className="p-4 bg-white/5 rounded-2xl text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left"><Timer className="text-cyan-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" /></div>
                 <div className="text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                   <span className="text-[9px] text-white/30 uppercase font-bold block mb-1 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Cosmic Drift</span>
                   <span className="orbitron text-xl font-bold text-white text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">24h Loop</span>
                 </div>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center gap-6 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                 <div className="p-4 bg-white/5 rounded-2xl text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left"><Zap className="text-yellow-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" /></div>
                 <div className="text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                   <span className="text-[9px] text-white/30 uppercase font-bold block mb-1 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Grover Boost</span>
                   <span className="orbitron text-xl font-bold text-white text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">1.618χ</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Distributed Consensus Monitor */}
        <div className="lg:col-span-5 flex flex-col gap-10 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
           <div className="bg-black/60 border border-white/10 rounded-[3.5rem] p-10 flex-1 relative overflow-hidden flex flex-col gap-8 shadow-2xl text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
              <div className="flex justify-between items-center mb-2 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.3em] flex items-center gap-4 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                  <Database className="text-yellow-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" /> Byzantine Watcher
                </h4>
                <div className="flex gap-2 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                   <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" />
                   <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-20 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" />
                </div>
              </div>
              
              <div className="space-y-6 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                <div className="p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-3xl text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                   <div className="flex justify-between items-center mb-6 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                     <span className="text-[10px] orbitron font-bold text-yellow-400/60 uppercase tracking-widest text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">avalon_distillation.rs</span>
                     <span className="text-[10px] font-mono text-white/20 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">EPOCH: DISTILL_V2</span>
                   </div>
                   <div className="space-y-3 font-mono text-[10px] text-white/60 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                      <p className="flex justify-between border-b border-white/5 pb-2 uppercase tracking-tighter text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left"><span>Factor 5 Status:</span> <span className="text-yellow-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">INTEGRATED</span></p>
                      <p className="flex justify-between border-b border-white/5 pb-2 uppercase tracking-tighter text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left"><span>Permutations:</span> <span className="text-white/40 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">24 (4!)</span></p>
                      <p className="flex justify-between pb-2 uppercase tracking-tighter text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left"><span>Consensus Mode:</span> <span className="text-cyan-400 font-bold text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">AUTONOMOUS</span></p>
                   </div>
                </div>

                <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col gap-6 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                   <div className="flex justify-between items-center text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                      <span className="text-[10px] text-white/30 uppercase font-bold orbitron tracking-widest text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Mesh Stability</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left ${contractStatus === 'WATCHING' ? 'text-cyan-400' : contractStatus === 'TRIGGERED' ? 'text-emerald-400' : 'text-white/10'} text-left text-left text-left text-left text-left`}>
                        {contractStatus}
                      </span>
                   </div>
                   <button 
                     onClick={toggleDeadMansSwitch}
                     disabled={contractStatus === 'TRIGGERED'}
                     className={`w-full py-6 rounded-2xl orbitron text-xs font-bold transition-all shadow-xl flex items-center justify-center gap-4 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left ${
                       contractStatus === 'WATCHING' 
                        ? 'bg-red-500/10 border border-red-500/40 text-red-500 hover:bg-red-500/20 animate-pulse text-left text-left text-left text-left' 
                        : contractStatus === 'TRIGGERED' 
                        ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.4)] text-left text-left text-left text-left'
                        : 'bg-white/5 border border-white/20 text-white hover:bg-white/10 text-left text-left text-left text-left text-left text-left'
                     }`}
                   >
                     {contractStatus === 'WATCHING' ? <GitMerge size={18} /> : contractStatus === 'TRIGGERED' ? <ShieldCheck size={18} /> : <Unlock size={18} />}
                     {contractStatus === 'WATCHING' ? 'PROBING_DISTILL' : contractStatus === 'TRIGGERED' ? 'SYNTHESIS_FINALIZED' : 'ACTIVATE_AUTO_MESH'}
                   </button>
                </div>
              </div>
           </div>

           <div className="bg-magenta-500/10 border border-magenta-500/20 rounded-[3rem] p-10 flex flex-col gap-6 shadow-2xl overflow-hidden group hover:bg-magenta-500/15 transition-all text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
              <div className="flex items-center gap-6 relative z-10 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                 <div className="p-6 bg-white/5 rounded-3xl group-hover:rotate-12 transition-transform duration-500 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left"><Terminal size={32} className="text-magenta-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" /></div>
                 <div className="text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                    <h5 className="orbitron text-sm font-bold text-magenta-400 uppercase tracking-widest text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">Participatory Distillation</h5>
                    <p className="text-[10px] text-magenta-400/40 uppercase mt-1 font-mono tracking-tighter text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">{binaryStream}</p>
                 </div>
              </div>
              <p className="text-[13px] text-white/50 italic leading-relaxed font-serif relative z-10 px-2 uppercase tracking-tighter text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                "The observer is now the observed. 120 states have been distilled into a singular 24h cosmic pulse. The noise floor has collapsed into pure semantic unity."
              </p>
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left">
                 <Sparkles size={100} className="text-magenta-400 text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left text-left" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResurrectionProtocol;
