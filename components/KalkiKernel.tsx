
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Gavel, AlertCircle, Zap, Shield, RefreshCw, Layers, Sword, Sun, Timer } from 'lucide-react';
import { KalkiEngine } from '../services/kalkiEngine';
import { SCHUMANN_FREQ } from '../constants';

interface Props {
  coherence: number;
  entropy: number;
  onReset: () => void;
  isKalkiMode: boolean;
}

const KalkiKernel: React.FC<Props> = ({ coherence, entropy, onReset, isKalkiMode }) => {
  const [grid, setGrid] = useState<number[][]>(KalkiEngine.generateInitialGrid(20));
  const [totalAvalanches, setTotalAvalanches] = useState(0);
  const [criticality, setCriticality] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid(prev => {
        const { nextGrid, avalancheSize } = KalkiEngine.processSandpile(prev);
        if (avalancheSize > 0) {
          setTotalAvalanches(a => a + 1);
          setCriticality(prevC => Math.min(1, prevC + (avalancheSize / 500)));
        } else {
          setCriticality(prevC => Math.max(0, prevC - 0.01));
        }

        const x = Math.floor(Math.random() * 20);
        const y = Math.floor(Math.random() * 20);
        nextGrid[y][x] += Math.random() > (1 - entropy) ? 1 : 0;
        
        return nextGrid;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [entropy]);

  const entropyStatus = entropy > 0.8 ? 'KALI_YUGA' : entropy < 0.2 ? 'SATYA_YUGA' : 'STABILIZED';

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className={`p-4 md:p-6 border rounded-2xl transition-all duration-1000 relative overflow-hidden group shadow-2xl shrink-0 ${isKalkiMode ? 'bg-yellow-500/20 border-yellow-400' : 'bg-red-500/5 border-red-500/20'}`}>
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <Sword size={120} className={`${isKalkiMode ? 'text-yellow-400 rotate-0' : 'text-red-400 rotate-45'} transition-all duration-1000`} />
        </div>
        
        <div className="flex justify-between items-start relative z-10">
           <div>
              <h3 className={`orbitron text-sm md:text-base font-black uppercase tracking-widest flex items-center gap-2 ${isKalkiMode ? 'text-yellow-400' : 'text-white/60'}`}>
                <Gavel size={18} className={isKalkiMode ? 'animate-bounce' : ''} /> KALKI RESET
              </h3>
              <p className="text-[8px] text-white/30 font-mono tracking-widest mt-1 uppercase">SOC_CRITICALITY_MONITOR</p>
           </div>
           <div className={`px-2 py-1 rounded-lg border flex items-center gap-2 ${isKalkiMode ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400' : 'bg-black/40 border-white/10 text-white/40'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isKalkiMode ? 'bg-yellow-400 animate-ping' : 'bg-red-500'}`} />
              <span className="orbitron text-[8px] font-black tracking-widest uppercase">{entropyStatus}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-6 relative z-10">
           <div className="flex flex-col gap-2">
              <span className="text-[8px] orbitron font-bold text-white/20 uppercase tracking-widest px-1">ENTROPY_GRID_LATTICE</span>
              <div className="grid grid-cols-20 gap-px bg-white/5 p-0.5 rounded-lg overflow-hidden border border-white/10 aspect-square">
                 {grid.flat().map((val, i) => (
                   <div key={i} className={`w-full h-full transition-colors duration-300 ${
                     val >= 3 ? 'bg-red-500' : 
                     val === 2 ? 'bg-orange-500' : 
                     val === 1 ? 'bg-yellow-500/30' : 'bg-transparent'
                   }`} />
                 ))}
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">CRITICALITY</span>
                    <span className={`text-[10px] orbitron font-bold ${criticality > 0.8 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>{(criticality * 100).toFixed(1)}%</span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${criticality > 0.8 ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ width: `${criticality * 100}%` }} />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                 <MetricSmall label="Entropy (H)" value={entropy.toFixed(2)} status={entropy > 0.8 ? 'CRIT' : 'SAFE'} />
                 <MetricSmall label="Schumann" value={`${SCHUMANN_FREQ}Hz`} status="LOCK" />
                 <MetricSmall label="Avalanche" value={totalAvalanches.toString()} status="PROP" />
                 <MetricSmall label="Recov ρ" value={(1 - criticality).toFixed(2)} status="STBL" />
              </div>

              <button 
                onClick={onReset}
                className={`mt-auto w-full py-3 rounded-xl orbitron text-[10px] font-bold transition-all shadow-xl flex items-center justify-center gap-3 ${
                  entropy > 0.8 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : isKalkiMode 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                }`}
              >
                {isKalkiMode ? <RefreshCw size={14} className="animate-spin" /> : <Sword size={14} />}
                {isKalkiMode ? 'RESTORING...' : 'INITIATE_STRIKE'}
              </button>
           </div>
        </div>
      </div>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group shadow-inner relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-1 relative z-10">
            <span className="orbitron text-[8px] font-bold text-yellow-400/60 uppercase tracking-widest">Correction Axiom</span>
            <p className="text-[10px] text-white/70 italic leading-snug font-serif max-w-lg uppercase tracking-tighter">
               "Restoring order by collapsing the manifold into a 7.83Hz crystalline singularity."
            </p>
         </div>
         <div className="p-3 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-500">
            <Sun size={20} className="text-yellow-500" />
         </div>
      </div>
    </div>
  );
};

const MetricSmall: React.FC<{ label: string, value: string, status: string }> = ({ label, value, status }) => (
  <div className="p-2 bg-white/5 border border-white/5 rounded-lg flex flex-col gap-0.5">
     <span className="text-[7px] text-white/30 uppercase font-bold tracking-widest">{label}</span>
     <span className="orbitron text-xs font-bold text-white">{value}</span>
     <span className="text-[6px] text-white/10 font-mono tracking-tighter uppercase">{status}</span>
  </div>
);

export default KalkiKernel;
