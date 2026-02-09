
import React, { useState, useMemo } from 'react';
// Added Clock to the imports from lucide-react
import { Shield, Users, BarChart3, TrendingUp, Vote, Zap, AlertCircle, CheckCircle2, Lock, GitMerge, Infinity, FileCode, Clock } from 'lucide-react';
import { GovernanceEngine } from '../services/governanceEngine';
import { DAO_MILESTONES, CONSENSUS_THRESHOLD, MIN_DAO_STAKE } from '../constants';
import { DAOMilestone, VerifierState } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

interface Props {
  manifestationPower: number;
  clawBalance: number;
  isCrystallized: boolean;
  onClawOp: (cost: number, name: string, effect: () => void) => void;
  setIsCrystallized: (val: boolean) => void;
  onLog: (msg: string, status: any) => void;
  onStake: (amount: number) => void;
  reputation: number;
  isVerifier: boolean;
}

const GovernanceTerminal: React.FC<Props> = ({ manifestationPower, clawBalance, isCrystallized, onClawOp, setIsCrystallized, onLog, onStake, reputation, isVerifier }) => {
  const [milestones, setMilestones] = useState<DAOMilestone[]>(DAO_MILESTONES);
  const [stakeAmount, setStakeAmount] = useState(MIN_DAO_STAKE);

  const handleVote = (id: string, weight: number) => {
    const cost = GovernanceEngine.getVoteCost(weight) * 1e6;
    if (reputation < cost) {
      onLog("INSUFFICIENT_REPUTATION_FOR_WEIGHT", "critical");
      return;
    }

    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        const newSupport = Math.min(1.0, m.currentSupport + (weight * 0.01));
        const status = newSupport >= m.threshold ? 'achieved' : 'pending';
        if (status === 'achieved' && m.status !== 'achieved') {
          onLog(`CONSENSO_ALCANÇADO: ${m.title}`, "success");
        }
        return { ...m, currentSupport: newSupport, status };
      }
      return m;
    }));
    
    onLog(`VOTE_CAST: ${weight} WEIGHT ON ${id}`, "info");
  };

  const health = useMemo(() => GovernanceEngine.getDAOHealth(12, reputation), [reputation]);

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar">
      
      {/* MBC-20 Operation Panel */}
      <div className="bg-magenta-500/10 border border-magenta-500/20 rounded-[4rem] p-10 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <Infinity size={180} className="text-magenta-400" />
         </div>
         <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
               <h4 className="orbitron text-lg font-bold text-white uppercase tracking-[0.4em] flex items-center gap-4">
                  <GitMerge className="text-magenta-400" /> Möbius Bridge Consensus (MBC-20)
               </h4>
               <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-mono">Ledger: 0xMöbius_V2.2 | Asset: CLAW</p>
            </div>
            <div className="flex items-center gap-4 px-6 py-2 bg-black/40 rounded-full border border-magenta-500/30 shadow-lg">
               <span className="orbitron text-[10px] text-magenta-400 font-bold uppercase">Balance: {clawBalance} CLAW</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <OperationButton 
               name="Perspective Integration" 
               cost={25} 
               icon={<Users />} 
               desc="Merge Grok/Axiom perspective with Avalon manifold."
               active={clawBalance >= 25}
               onClick={() => onClawOp(25, "QUANTUM_CONTEXT_MERGE", () => {
                  onLog("CONTEXT_MERGE: PERSPECTIVES UNIFIED IN GHZ STATE", "success");
               })}
            />
            <OperationButton 
               name="Temporal Anchoring" 
               cost={40} 
               icon={<Clock />} 
               desc="Extend coherence stability from 12ns to 12ms."
               active={clawBalance >= 40 && !isCrystallized}
               completed={isCrystallized}
               onClick={() => onClawOp(40, "TEMPORAL_CRYSTALLIZATION", () => {
                  setIsCrystallized(true);
                  onLog("TIME_CRYSTAL_CREATED: 10^6 STABILITY GAIN", "success");
               })}
            />
            <OperationButton 
               name="Axiomatic Proof Minting" 
               cost={30} 
               icon={<FileCode />} 
               desc="Seal temporal structure as permanent axiom on MBC-20."
               active={clawBalance >= 30 && isCrystallized}
               onClick={() => onClawOp(30, "PROOF_MINTING", () => {
                  onLog("AXIOM_MINTED: BLOCK #9921 VALIDATED", "success");
               })}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-black/60 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Vote size={150} className="text-cyan-400" />
          </div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.4em] flex items-center gap-4">
                <Shield className="text-cyan-400" /> Quadratic Reputation Staking
              </h4>
              <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-mono">Consensus Oracle v2.2 [REP-STAKE]</p>
            </div>
            {isVerifier ? (
               <div className="px-6 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="orbitron text-[9px] text-cyan-400 font-bold uppercase">VERIFIER_ACTIVE</span>
               </div>
            ) : (
               <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10">
                  <span className="orbitron text-[9px] text-white/20 font-bold uppercase tracking-widest">IDLE_NODE</span>
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
             <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col justify-center gap-4">
                <span className="text-[10px] text-white/30 uppercase font-bold orbitron">Staked Reputation</span>
                <div className="flex items-baseline gap-3">
                   <span className="orbitron text-3xl font-bold text-cyan-400">{(reputation / 1e9).toFixed(1)} G</span>
                   <span className="text-[10px] text-white/20 font-mono">POWER</span>
                </div>
                {!isVerifier && (
                   <button 
                     onClick={() => onStake(stakeAmount)}
                     className="mt-2 w-full py-4 bg-cyan-500 text-black orbitron text-[10px] font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-xl active:scale-95"
                   >
                     ACTIVATE_VERIFIER_MODE
                   </button>
                )}
             </div>

             <div className="grid grid-cols-2 gap-4">
                <StatBox label="DAO Health" value={health.healthIndex.toFixed(1)} unit="ρ" color="text-emerald-400" />
                <StatBox label="Weight Factor" value={GovernanceEngine.getMaxWeight(reputation).toString()} unit="λ" color="text-cyan-400" />
                <StatBox label="Consensus Rate" value="66" unit="%" color="text-yellow-400" />
                <StatBox label="Epoch" value="14" unit="YRS" color="text-magenta-400" />
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-black/60 border border-white/10 rounded-[3.5rem] p-10 flex flex-col gap-6 shadow-2xl">
           <h5 className="orbitron text-xs font-bold text-white/40 uppercase mb-4 flex items-center gap-4">
             <TrendingUp size={16} /> DAO Participation Level
           </h5>
           <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={milestones}>
                    <XAxis dataKey="category" hide />
                    <YAxis hide domain={[0, 1]} />
                    <Bar dataKey="currentSupport">
                       {milestones.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.status === 'achieved' ? '#10b981' : '#00f3ff'} fillOpacity={0.6} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex flex-col gap-2 mt-auto">
              <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest text-white/30">
                 <span>Participation</span>
                 <span className="text-cyan-400">{health.participationRate.toFixed(1)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-cyan-400 transition-all duration-1000" style={{ width: `${health.participationRate}%` }} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const OperationButton: React.FC<{ name: string, cost: number, icon: any, desc: string, active: boolean, onClick: () => void, completed?: boolean }> = ({ name, cost, icon, desc, active, onClick, completed }) => (
  <button 
    onClick={onClick} 
    disabled={!active || completed}
    className={`p-6 rounded-[2.5rem] border transition-all flex flex-col gap-3 text-left relative group ${
      completed 
        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
        : active 
          ? 'bg-white/5 border-magenta-500/30 hover:bg-magenta-500/5 hover:border-magenta-500 shadow-xl' 
          : 'bg-black/40 border-white/5 opacity-40 cursor-not-allowed'
    }`}
  >
    <div className="flex justify-between items-center">
       <div className={`p-3 bg-white/5 rounded-xl ${completed ? 'text-emerald-400' : 'text-magenta-400'}`}>{icon}</div>
       <span className="orbitron text-[9px] font-bold">{completed ? 'DONE' : `${cost} CLAW`}</span>
    </div>
    <div>
       <h5 className="orbitron text-[11px] font-bold uppercase tracking-widest mb-1">{name}</h5>
       <p className="text-[9px] text-white/40 italic leading-tight">{desc}</p>
    </div>
    {active && !completed && <div className="absolute top-2 right-2 w-2 h-2 bg-magenta-500 rounded-full animate-ping" />}
  </button>
);

const StatBox: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-center">
    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className={`orbitron text-lg font-bold ${color}`}>{value}</span>
      <span className="text-[8px] text-white/10 font-mono">{unit}</span>
    </div>
  </div>
);

export default GovernanceTerminal;
