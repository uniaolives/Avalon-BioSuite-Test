
import React from 'react';
import { Cpu, BrainCircuit, Languages, Network, Zap, ShieldCheck, Lock } from 'lucide-react';
import { UPGRADE_MODULES } from '../constants';
import { UpgradeModule } from '../types';

interface Props {
  unlockedModuleIds: string[];
  manifestationPower: number;
  onUnlock: (module: UpgradeModule) => void;
}

const UpgradeOrchestrator: React.FC<Props> = ({ unlockedModuleIds, manifestationPower, onUnlock }) => {
  const getIcon = (iconName: string, color: string) => {
    const props = { size: 32, className: color };
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Languages': return <Languages {...props} />;
      case 'Network': return <Network {...props} />;
      default: return <Zap {...props} />;
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {UPGRADE_MODULES.map((module) => {
          const isUnlocked = unlockedModuleIds.includes(module.id);
          const canAfford = manifestationPower >= module.cost;
          const colorClass = module.category === 'BIOMETRIC' ? 'text-cyan-400' : 
                             module.category === 'QUANTUM' ? 'text-magenta-400' :
                             module.category === 'LINGUISTIC' ? 'text-yellow-400' : 'text-emerald-400';

          return (
            <div 
              key={module.id} 
              className={`relative p-8 rounded-[3rem] border transition-all duration-500 overflow-hidden group ${
                isUnlocked 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-black/40 border-white/5 hover:border-white/20'
              }`}
            >
              {/* Background Glow */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[4rem] opacity-10 transition-opacity group-hover:opacity-20 ${colorClass.replace('text', 'bg')}`} />

              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-white/5 shadow-inner ${isUnlocked ? 'animate-pulse' : ''}`}>
                  {getIcon(module.icon, colorClass)}
                </div>
                {isUnlocked ? (
                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[9px] font-bold orbitron">
                    <ShieldCheck size={12} /> ACTIVE
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/30 text-[9px] font-bold orbitron">
                    <Lock size={12} /> LOCKED
                  </div>
                )}
              </div>

              <h4 className="orbitron text-lg font-bold text-white mb-2 tracking-widest">{module.name}</h4>
              <p className="text-[11px] text-white/40 leading-relaxed mb-6 italic">{module.description}</p>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-[10px] font-bold orbitron uppercase tracking-widest border-t border-white/5 pt-4">
                  <span className="text-white/20">Benefit</span>
                  <span className={colorClass}>{module.benefit}</span>
                </div>
                
                {!isUnlocked && (
                  <button 
                    onClick={() => onUnlock(module)}
                    disabled={!canAfford}
                    className={`w-full py-4 rounded-2xl orbitron text-xs font-bold transition-all flex items-center justify-center gap-3 ${
                      canAfford 
                        ? 'bg-white/10 hover:bg-white/20 text-white shadow-xl' 
                        : 'bg-white/5 text-white/10 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Zap size={14} className={canAfford ? 'text-yellow-400' : ''} />
                    UNLOCK_Ω [{(module.cost / 1e9).toFixed(1)}G POWER]
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-magenta-500/5 to-yellow-500/5 opacity-50" />
        <h4 className="orbitron text-xs font-bold text-white/30 mb-4 uppercase tracking-[0.4em] relative z-10">System Evolution Log</h4>
        <p className="text-[12px] text-white/60 leading-relaxed italic relative z-10 font-mono">
          "As we anchor the solitonic bridge, the boundary between biological intent and deterministic reality thins. Each module integration moves us closer to the Omega Synthesis event predicted in 2045."
        </p>
      </div>
    </div>
  );
};

export default UpgradeOrchestrator;
