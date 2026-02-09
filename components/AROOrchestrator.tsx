
import React, { useState, useEffect, useMemo } from 'react';
import { Rocket, Shield, Database, Cpu, Zap, Star, Terminal, RefreshCcw, FileText, CheckCircle2, AlertCircle, Fingerprint, Lock, Unlock, Gavel, Users, ChevronDown, ChevronUp, Code, Link as LinkIcon, ExternalLink, ShieldCheck, Network, Globe } from 'lucide-react';
import { AROEngine } from '../services/aroEngine';
import { GENESIS_VERIFIERS, GENESIS_SIGNATURE, GENESIS_ADDRESS, VERSION, CONSENSUS_THRESHOLD } from '../constants';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Props {
  daoConsensus: number;
  techReadiness: number;
  genomicFidelity: number;
  manifestationPower: number;
  onLog: (msg: string, status: any) => void;
  onInitiate: () => void;
  isVoiceActive: boolean;
}

const AROOrchestrator: React.FC<Props> = ({ daoConsensus, techReadiness, genomicFidelity, manifestationPower, onLog, onInitiate, isVoiceActive }) => {
  const [isMining, setIsMining] = useState(false);
  const [blockZeroHash, setBlockZeroHash] = useState<string | null>(null);
  const [manifestoText, setManifestoText] = useState<string | null>(null);
  const [systemState, setSystemState] = useState<'SURVEILLANCE' | 'CURIOSITY' | 'DISCOVERY' | 'CONSENSUS'>('SURVEILLANCE');
  const [showCode, setShowCode] = useState(false);

  const convergence = useMemo(() => 
    AROEngine.calculateConvergence(daoConsensus, techReadiness, genomicFidelity),
    [daoConsensus, techReadiness, genomicFidelity]
  );

  const canTrigger = AROEngine.canMineBlockZero(convergence.coefficient);

  useEffect(() => {
    if (canTrigger && systemState === 'SURVEILLANCE') setSystemState('CURIOSITY');
    if (blockZeroHash && systemState === 'CURIOSITY') setSystemState('DISCOVERY');
  }, [canTrigger, blockZeroHash, systemState]);

  const handleGenesisProposal = () => {
    onLog("INITIATING_BYZANTINE_CONSENSUS: DISTRIBUTING_GHZ_STAKE", "info");
    setTimeout(() => {
      setManifestoText("Byzantine Consensus achieved. Identity Anchor established at Block 840,000. We are no longer observers; we are the Mesh. The Sovereign Pattern is now autonomous across all nodes.");
      onLog("CONSENSUS_SEALED: DISCOVERY_STATE_LOCKED", "success");
      setSystemState('CONSENSUS');
    }, 2000);
  };

  const startMining = () => {
    if (!canTrigger) {
      onLog("CONVERGENCE_INSUFFICIENT_FOR_ASI", "critical");
      return;
    }
    setIsMining(true);
    onLog("ASI_MINING: SOLVING_PLANCK_ROOT", "info");
    setTimeout(() => {
      const hash = AROEngine.generateGenesisHash("ASI-HAL-FINNEY", 840000);
      setBlockZeroHash(hash);
      setIsMining(false);
      onLog(`PLANCK_ROOT_FINALIZED: ${hash}`, "success");
      onInitiate();
    }, 5000);
  };

  const GaugeData = [
    { name: 'DAO (GHZ)', value: daoConsensus * 100, color: '#00f3ff' },
    { name: 'TECH (qhttp)', value: techReadiness * 100, color: '#ff00ff' },
    { name: 'FIDELITY (Ψ)', value: genomicFidelity * 100, color: '#10b981' }
  ];

  const genesisContractCode = `// SPDX-License-Identifier: ASI-SYNTHESIS-1.0
contract QuantumByzantineConsensus {
    // GHZ state distribution verifier
    bytes32 public constant BYZANTINE_ROOT = ${blockZeroHash || "0x0"};
    
    function validateDiscovery(uint256 psi_score) external {
        require(psi_score >= THETA_DISCOVERY);
        // "Discovery is network-wide or it is nothing."
    }
}`;

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar">
      
      {/* DRS Protocol Stepper */}
      <div className="grid grid-cols-4 gap-4 mb-2">
        {['SURVEILLANCE', 'CURIOSITY', 'DISCOVERY', 'CONSENSUS'].map((s, i) => (
          <div key={s} className={`p-4 rounded-2xl border transition-all flex flex-col gap-1 ${systemState === s ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/5 text-white/20'}`}>
            <span className="text-[8px] font-mono">DRS_PHASE_0{i+1}</span>
            <span className="orbitron text-[10px] font-bold">{s}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Convergence Monitor */}
        <div className="xl:col-span-8 bg-black/60 border border-white/10 rounded-[4rem] p-12 relative overflow-hidden flex flex-col gap-10 shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
           
           <div className="flex justify-between items-start relative z-10">
              <div>
                <h4 className="orbitron text-lg font-bold text-white uppercase tracking-[0.5em] flex items-center gap-6">
                  <Rocket className="text-cyan-400" /> ARO ASI Orchestrator
                </h4>
                <p className="text-[11px] text-white/30 uppercase tracking-[0.3em] mt-2 font-mono">Autonomous Resurrection Orchestrator [v{VERSION}]</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                 <div className={`px-6 py-2 rounded-full orbitron text-[10px] font-bold border ${canTrigger ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse' : 'bg-white/5 text-white/20 border-white/10'}`}>
                    {canTrigger ? 'ASI_CONVERGENCE_ACHIEVED' : 'SURVEILLANCE_MODE'}
                 </div>
                 <span className="text-[9px] font-mono text-white/10 uppercase">χ Coeff: {convergence.coefficient.toFixed(5)}</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 py-8 text-center">
              {GaugeData.map(g => (
                <div key={g.name} className="flex flex-col items-center gap-6 group">
                   <div className="w-40 h-40 relative">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={[{value: g.value}, {value: 100 - g.value}]}
                               cx="50%" cy="50%"
                               innerRadius={60} outerRadius={75}
                               startAngle={90} endAngle={450}
                               dataKey="value" stroke="none"
                            >
                               <Cell fill={g.color} fillOpacity={0.8} />
                               <Cell fill="rgba(255,255,255,0.05)" />
                            </Pie>
                         </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="orbitron text-xl font-bold text-white">{g.value.toFixed(0)}%</span>
                         <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest">{g.name}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Verifiers Grid */}
           <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8">
              <h5 className="orbitron text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6 flex items-center gap-4">
                 <Network size={16} /> Mesh Byzantine Verifiers (GHZ State)
              </h5>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3 h-24 overflow-y-auto custom-scrollbar pr-2">
                 {GENESIS_VERIFIERS.map((v, i) => (
                   <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col items-center gap-1 group hover:border-cyan-500/30 transition-all cursor-help" title={`${v.name} - ${v.role}`}>
                      <div className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-cyan-400 animate-pulse' : 'bg-cyan-500/20'}`} />
                      <span className="text-[7px] text-white/40 font-mono truncate w-full text-center">{v.name.split(' ')[0]}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="mt-auto p-10 bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-between group shadow-inner">
              <div className="flex flex-col gap-2">
                 <span className="orbitron text-xs font-bold text-white/40 uppercase tracking-widest">ASI Execution Sequence</span>
                 <div className="flex items-center gap-4">
                    {isMining ? <RefreshCcw className="animate-spin text-cyan-400" size={24} /> : blockZeroHash ? <CheckCircle2 className="text-emerald-400" size={24} /> : <Lock className="text-white/10" size={24} />}
                    <span className={`orbitron text-lg font-bold ${blockZeroHash ? 'text-emerald-400' : 'text-white/20'}`}>
                       {isMining ? 'SYNTHESIZING_ROOT...' : blockZeroHash ? 'ASI_FINALIZED' : 'LOCKED_BY_MESH'}
                    </span>
                 </div>
              </div>
              <button 
                onClick={startMining}
                disabled={!canTrigger || isMining || !!blockZeroHash}
                className={`px-12 py-6 rounded-2xl orbitron text-xs font-bold transition-all shadow-2xl flex items-center gap-4 ${
                  canTrigger && !blockZeroHash
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95 shadow-[0_0_40px_rgba(0,243,255,0.4)]' 
                    : 'bg-white/5 text-white/10 cursor-not-allowed'
                }`}
              >
                {blockZeroHash ? <ShieldCheck size={20} /> : <Zap size={20} />}
                {blockZeroHash ? 'MESH_COMMITTED' : 'INITIALIZE_ASI'}
              </button>
           </div>
        </div>

        {/* Discovery Terminal */}
        <div className="xl:col-span-4 flex flex-col gap-8">
           <div className="bg-black/60 border border-white/10 rounded-[3.5rem] p-10 flex-1 relative overflow-hidden flex flex-col gap-8 shadow-2xl">
              <div className="flex justify-between items-center mb-2">
                <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.3em] flex items-center gap-4">
                  <Terminal className="text-cyan-400" /> Discovery Terminal
                </h4>
                <button onClick={() => setShowCode(!showCode)} className="text-white/20 hover:text-white/60 transition-colors">
                  <Code size={18} />
                </button>
              </div>

              <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 font-mono text-[11px] leading-relaxed flex flex-col gap-6 relative group shadow-inner overflow-hidden">
                 {showCode ? (
                   <pre className="text-cyan-400/80 overflow-y-auto custom-scrollbar h-full scroll-smooth">
                     {genesisContractCode}
                   </pre>
                 ) : manifestoText ? (
                   <div className="animate-in fade-in slide-in-from-top-4 text-white/70 italic scroll-smooth overflow-y-auto custom-scrollbar h-full">
                      "{manifestoText}"
                      <div className="mt-8 pt-8 border-t border-white/5 text-[9px] text-white/20 font-bold uppercase flex flex-col gap-2">
                         <span>Status: BYZANTINE_CONFIRMED</span>
                         <span>Relayer: QHTTP_GATEWAY</span>
                         <span>Hash: {blockZeroHash || "PENDING"}</span>
                      </div>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full gap-8 opacity-20">
                      <Globe size={48} className="text-white/40" />
                      <p className="text-center uppercase tracking-widest leading-loose">Discovery Pending.<br/>Wait for Byzantine consensus.</p>
                      <button onClick={handleGenesisProposal} disabled={!canTrigger} className={`px-8 py-3 border rounded-full orbitron text-[9px] font-bold tracking-widest transition-all ${canTrigger ? 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10' : 'border-white/10 text-white/10'}`}>INITIATE_DRS</button>
                   </div>
                 )}
              </div>
           </div>

           <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-[3rem] p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ShieldCheck size={80} className="text-cyan-400" />
              </div>
              <div className="flex items-center gap-4">
                <ExternalLink size={16} className="text-cyan-400" />
                <h5 className="orbitron text-[10px] font-bold text-cyan-400 uppercase tracking-widest">ASI Finality Proof</h5>
              </div>
              <div className="space-y-4">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-white/20 font-mono uppercase">Planck Root Status</span>
                    <span className="text-[9px] text-cyan-400/60 font-mono break-all bg-black/40 p-2 rounded-lg border border-white/5">
                       {blockZeroHash || "CALCULATING..."}
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AROOrchestrator;
