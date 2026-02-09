
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Zap, Binary, RefreshCw, Sparkles, Orbit, Layers, LayoutGrid, Target, Wind, Activity } from 'lucide-react';
import { QuantumSearchEngine } from '../services/quantumSearchEngine';
import { PHI } from '../constants';
import { NeuralPattern } from '../types';

interface Props {
  coherence: number;
  entropy: number;
  onLog: (msg: string, status: any) => void;
}

const GroverOracle: React.FC<Props> = ({ coherence, entropy, onLog }) => {
  const [iteration, setIteration] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<NeuralPattern>(QuantumSearchEngine.IDEAL_PATTERNS[0]);
  
  const spaceSize = 32;
  const maxIter = 6; // Fixed for clear visual steps

  const targetIndex = useMemo(() => 
    QuantumSearchEngine.encodePattern(selectedGoal, spaceSize),
    [selectedGoal]
  );

  const amplitudes = useMemo(() => 
    QuantumSearchEngine.getGroverAmplitudes(spaceSize, targetIndex, iteration, maxIter),
    [iteration, targetIndex]
  );

  useEffect(() => {
    if (isSearching) {
      const int = setInterval(() => {
        setIteration(prev => {
          if (prev >= maxIter) {
            setIsSearching(false);
            onLog(`QUANTUM_SEARCH_LOCKED: ${selectedGoal.type} DETECTED`, "success");
            return 1;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(int);
    }
  }, [isSearching, maxIter, selectedGoal, onLog]);

  const initiateSearch = (goal: NeuralPattern) => {
    setSelectedGoal(goal);
    onLog(`GROVER_ORACLE: SEARCHING_FOR_${goal.type}`, "quantum");
    setIteration(1);
    setIsSearching(true);
  };

  const prob = Math.pow(Math.sin((Math.PI/2) * (iteration/maxIter)), 2);

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1 custom-scrollbar text-left min-h-0">
      <div className={`p-4 md:p-5 border rounded-2xl transition-all duration-1000 relative overflow-hidden group shadow-2xl shrink-0 ${isSearching ? 'bg-cyan-500/10 border-cyan-400' : 'bg-black/40 border-white/5'}`}>
        <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none transition-transform duration-1000 group-hover:rotate-12">
           <Search size={180} className="text-cyan-400" />
        </div>
        
        <div className="flex justify-between items-start relative z-10">
           <div>
              <h3 className="orbitron text-sm md:text-base font-black uppercase tracking-widest flex items-center gap-2 text-white">
                <Search size={16} className={isSearching ? 'animate-pulse' : ''} /> Grover Neural Oracle
              </h3>
              <p className="text-[7px] text-white/30 font-mono tracking-widest mt-0.5 uppercase">O(√N) Speedup • Amplitude_Amplification</p>
           </div>
           <div className={`px-2 py-1 rounded-lg border flex items-center gap-2 ${isSearching ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'bg-black/40 border-white/10 text-white/40'}`}>
              <div className={`w-1 h-1 rounded-full ${isSearching ? 'bg-cyan-400 animate-ping' : 'bg-white/20'}`} />
              <span className="orbitron text-[7px] font-black tracking-widest uppercase">{isSearching ? 'AMPLIFYING' : 'IDLE'}</span>
           </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 relative z-10">
           {/* Amplitude Distribution */}
           <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center px-1">
                <span className="text-[7px] orbitron font-bold text-white/20 uppercase tracking-widest">ψ-Superposition</span>
                <span className="text-[7px] font-mono text-cyan-400/60">Iteration: {iteration}/{maxIter}</span>
              </div>
              <div className="h-20 flex items-end gap-0.5 px-2 bg-black/40 rounded-xl border border-white/5 p-3 shadow-inner">
                 {amplitudes.map((amp, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 transition-all duration-300 rounded-t-xs ${i === targetIndex ? 'bg-cyan-400 shadow-[0_0_15px_cyan]' : 'bg-white/10'}`} 
                      style={{ height: `${Math.max(4, amp * 100)}%`, opacity: i === targetIndex ? 1 : 0.3 }} 
                    />
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="grid grid-cols-2 gap-2">
                 <MetricSmall label="Certainty" value={(prob * 100).toFixed(1)} unit="%" status="ψ_LOCK" />
                 <MetricSmall label="Speedup" value={(Math.sqrt(256) * prob).toFixed(1)} unit="χ" status="O(√N)" />
                 <MetricSmall label="Space" value="2^24" unit="STATES" status="MAPPED" />
                 <MetricSmall label="Target" value={selectedGoal.type?.split('_')[0] || ""} status="ACTIVE" />
              </div>

              <div className="flex flex-col gap-2">
                 <span className="text-[7px] text-white/30 uppercase font-black px-1">Select Search Target:</span>
                 <div className="grid grid-cols-3 gap-1.5">
                   {QuantumSearchEngine.IDEAL_PATTERNS.map((goal) => (
                     <button
                       key={goal.type}
                       onClick={() => initiateSearch(goal)}
                       disabled={isSearching}
                       className={`p-2 rounded-lg border text-[7px] font-black orbitron transition-all ${
                         selectedGoal.type === goal.type 
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-inner' 
                          : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                       }`}
                     >
                        {goal.type?.split('_')[0]}
                     </button>
                   ))}
                 </div>
                 <div className="mt-1 p-2 bg-white/5 border border-white/5 rounded-lg text-[6px] text-white/40 leading-tight font-mono italic">
                    "Searching exponential neural state spaces to find the attractor of harmony."
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group shadow-inner relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-0.5 relative z-10">
            <span className="orbitron text-[7px] font-bold text-cyan-400/60 uppercase tracking-widest flex items-center gap-2">
               <Binary size={10} /> Pattern Inversion Principle
            </span>
            <p className="text-[8px] text-white/50 italic leading-snug font-serif max-w-xl">
               "Grover's Oracle marks the 'correct' state and inverts its phase about the mean. In neuro-synthesis, this represents the sudden crystallization of flow from the chaos of raw EEG."
            </p>
         </div>
         <div className="p-2 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-500">
            <Orbit size={14} className="text-cyan-500" />
         </div>
      </div>
    </div>
  );
};

const MetricSmall: React.FC<{ label: string, value: string, unit?: string, status: string }> = ({ label, value, unit, status }) => (
  <div className="p-1.5 bg-white/5 border border-white/5 rounded-lg flex flex-col gap-0.5">
     <span className="text-[5px] text-white/30 uppercase font-black tracking-widest">{label}</span>
     <div className="flex items-baseline gap-0.5 leading-none">
        <span className="orbitron text-[10px] font-bold text-white">{value}</span>
        {unit && <span className="text-[6px] text-white/20 font-bold">{unit}</span>}
     </div>
     <span className="text-[5px] text-white/10 font-mono tracking-tighter uppercase">{status}</span>
  </div>
);

export default GroverOracle;
