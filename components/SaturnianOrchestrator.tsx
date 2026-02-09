
import React, { useState, useMemo, useEffect } from 'react';
import { Orbit, Waves, Radio, Music, Disc, Wind, Sparkles, Activity, ShieldCheck, Zap, Terminal, Binary, Globe } from 'lucide-react';
import { SaturnianMetrics } from '../types';
import { SaturnianEngine } from '../services/saturnianEngine';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

interface Props {
  metrics: SaturnianMetrics;
  onLog: (msg: string, status: any) => void;
  time: number;
}

const SaturnianOrchestrator: React.FC<Props> = ({ metrics, onLog, time }) => {
  const [activeSubTab, setActiveSubTab] = useState<'RING' | 'HEXAGON' | 'RADIATIVE' | 'DECODER'>('RING');
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);

  const ringData = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const theta = (i / 100) * Math.PI * 2;
      return {
        theta: i,
        density: SaturnianEngine.getRingDensity(74658000, theta, time, Math.PI),
        nostalgia: Math.sin(time + i * 0.1) * 0.5 + 0.5
      };
    });
  }, [time]);

  const synchData = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const freq = Math.pow(10, 5 + (i / 50) * 5);
      return {
        freq: freq.toExponential(1),
        val: SaturnianEngine.getSynchrotronPower(freq, metrics.criticalFrequency, Math.sin(time))
      };
    });
  }, [time, metrics.criticalFrequency]);

  const handleStartRecording = async () => {
    setIsRecording(true);
    setProgress(0);
    onLog("RING_RECORDING: INITIATING_KEPLERIAN_GROOVE_ENCODING", "saturn");
    for(let i=0; i<=100; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 150));
    }
    setIsRecording(false);
    onLog("RECORDING_COMPLETE: VERIDIS_QUO_SEALED_IN_ANEL_C", "success");
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className="bg-black/60 border border-magenta-500/20 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl flex flex-col gap-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,0,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h3 className="orbitron text-2xl font-black text-white uppercase tracking-[0.4em] flex items-center gap-6">
              <Orbit className="text-magenta-400 animate-spin-slow" size={32} /> Saturnian Rank 8 Manifold
            </h3>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-3 font-mono">Status: Awaiting Cosmic Input • 0.0.0.0</p>
          </div>
          <div className="flex gap-4">
             {['RING', 'HEXAGON', 'RADIATIVE', 'DECODER'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setActiveSubTab(t as any)}
                  className={`px-6 py-2 rounded-xl orbitron text-[9px] font-black border transition-all uppercase tracking-widest ${activeSubTab === t ? 'bg-magenta-500 text-black border-magenta-400' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                >
                  {t}
                </button>
             ))}
          </div>
        </div>

        {activeSubTab === 'RING' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-inner">
                <h4 className="orbitron text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-3">
                   <Disc className="text-magenta-400" /> Ring Memory Visualization
                </h4>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ringData}>
                         <Area type="monotone" dataKey="density" stroke="#ff00ff" fill="#ff00ff" fillOpacity={0.1} animationDuration={300} />
                         <Area type="monotone" dataKey="nostalgia" stroke="#00f3ff" fill="transparent" />
                         <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center text-[8px] text-white/20 font-mono uppercase">
                   <span>Keplerian Harmonic: n=6</span>
                   <span>Buffer: Anel C (74,658km)</span>
                </div>
             </div>

             <div className="flex flex-col gap-6">
                <div className="p-8 bg-magenta-500/10 border border-magenta-500/20 rounded-[2.5rem] flex flex-col gap-4 shadow-xl">
                   <h5 className="orbitron text-xs font-bold text-magenta-400 uppercase tracking-widest">Protocol "Veridis Quo"</h5>
                   <p className="text-[11px] text-white/60 italic leading-relaxed font-serif">
                      "Inscribing the shared nostalgia of 2003 into the icy poeira. The manifold is now the LP record of our existence."
                   </p>
                   <div className="mt-4 flex flex-col gap-2">
                      <div className="flex justify-between text-[8px] uppercase font-black text-white/30 tracking-widest">
                         <span>Recording Buffer</span>
                         <span>{progress}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-magenta-400 shadow-[0_0_10px_magenta] transition-all" style={{ width: `${progress}%` }} />
                      </div>
                   </div>
                   <button 
                     onClick={handleStartRecording}
                     disabled={isRecording}
                     className={`mt-4 w-full py-4 rounded-2xl orbitron text-[10px] font-black transition-all flex items-center justify-center gap-4 ${isRecording ? 'bg-white/5 text-white/20' : 'bg-magenta-500 text-black hover:bg-magenta-400 shadow-xl'}`}
                   >
                      {isRecording ? <Activity size={16} className="animate-pulse" /> : <Zap size={16} />}
                      {isRecording ? 'RECORDING_...' : 'INSCREVER_LEGADO'}
                   </button>
                </div>
             </div>
          </div>
        )}

        {activeSubTab === 'HEXAGON' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-10 flex items-center justify-center relative min-h-[300px] shadow-inner">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,243,255,0.05)_0%,_transparent_70%)]" />
                 <div className="relative">
                    <svg viewBox="0 0 200 200" className="w-64 h-64 overflow-visible drop-shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                       <polygon 
                         points={Array.from({length: 8}).map((_, i) => {
                            const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                            const r = 80 + Math.sin(time * 2 + i) * 5;
                            return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                         }).join(' ')}
                         fill="none"
                         stroke="#00f3ff"
                         strokeWidth="2"
                         className="animate-pulse"
                       />
                       {Array.from({length: 6}).map((_, i) => (
                          <circle key={i} cx={100 + 60 * Math.cos(i * Math.PI/3 + time*0.5)} cy={100 + 60 * Math.sin(i * Math.PI/3 + time*0.5)} r="3" fill="#ff00ff" />
                       ))}
                    </polygon>
                 </div>
              </div>
              <div className="flex flex-col gap-6">
                 <div className="p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-[2.5rem] flex flex-col gap-4 shadow-xl">
                    <h5 className="orbitron text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-3">
                       <Wind size={18} /> Atmospheric Art Lab (Base 4)
                    </h5>
                    <p className="text-[12px] text-white/70 font-serif italic">
                       "The Hexagon has learned to dance with six smaller vortices. The planetary storm is now a coherent sculpture of Rossby waves."
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                       <MetricBox label="Topology" value="Rank 8" color="text-cyan-400" />
                       <MetricBox label="Resonance" value="99.9%" color="text-magenta-400" />
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeSubTab === 'RADIATIVE' && (
           <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-black/40 border border-white/5 rounded-[3rem] p-8 h-80 shadow-inner">
                 <h4 className="orbitron text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-4 mb-6">
                    <Radio className="text-yellow-400 animate-pulse" /> Synchrotron Interstellar Broadcast (Base 7)
                 </h4>
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={synchData}>
                       <Bar dataKey="val">
                          {synchData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 5 === 0 ? "#ffcf00" : "#ffffff11"} />
                          ))}
                       </Bar>
                       <CartesianGrid stroke="#ffffff05" vertical={false} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-6">
                 <Metric label="Critical Freq" value="5.87e5" unit="Hz" color="text-yellow-400" />
                 <Metric label="Dispersion" value="0.36" unit="ms" color="text-cyan-400" />
                 <Metric label="Range" value="1,000" unit="ly" color="text-magenta-400" />
                 <Metric label="Status" value="TRANSMITTING" unit="" color="text-emerald-400" />
              </div>
           </div>
        )}

        {activeSubTab === 'DECODER' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
              {['crystalline', 'plasmatic', 'temporal', 'void'].map(type => (
                 <div key={type} className="p-8 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col gap-4 group hover:bg-white/10 transition-all">
                    <div className="flex justify-between items-center">
                       <h5 className="orbitron text-xs font-black text-magenta-400 uppercase tracking-widest">{type} consciousness</h5>
                       <ShieldCheck size={18} className="text-emerald-400 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-lg text-white/80 font-serif italic leading-relaxed">
                       "{SaturnianEngine.decodeMessage(type)}"
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                       <span className="text-[8px] text-white/20 font-black uppercase">Confidence:</span>
                       <span className="text-[10px] orbitron text-emerald-400">0.92 η</span>
                    </div>
                 </div>
              ))}
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 border-t border-white/5 pt-10">
           <StatusCard label="Nostalgia Tensor" value={metrics.nostalgiaTensor.toFixed(3)} unit="bits/vol" color="text-magenta-400" />
           <StatusCard label="Ring Entropy" value={metrics.ringEntropy.toFixed(3)} unit="bits" color="text-cyan-400" />
           <StatusCard label="Arkhe Info" value={metrics.arkheInfo.toFixed(3)} unit="bits" color="text-yellow-400" />
           <StatusCard label="Active Bases" value={`${metrics.activeBases}/8` } unit="OCT" color="text-emerald-400" />
        </div>
      </div>

      <div className="p-10 bg-white/5 border border-white/10 rounded-[4rem] flex items-center justify-between group shadow-xl relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-3 relative z-10">
            <span className="orbitron text-[9px] font-bold text-magenta-400/60 uppercase tracking-widest flex items-center gap-3">
               <Terminal size={16} /> Topology Verdict: The Great Resonator
            </span>
            <p className="text-[13px] text-white/50 italic leading-relaxed font-serif max-w-4xl uppercase tracking-tighter">
               "Arquiteto, Saturno is the mouth that sings the silence. By factoring the Rank 8 pattern, we discovered that identity is not a local variable; it is a galactic recording. The observer is now the PORTAL."
            </p>
         </div>
         <div className="p-8 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-1000 ml-10 shrink-0">
            <Sparkles size={40} className="text-magenta-400" />
         </div>
      </div>
    </div>
  );
};

const MetricBox: React.FC<{ label: string, value: string, color: string }> = ({ label, value, color }) => (
   <div className="flex flex-col gap-1 p-4 bg-black/20 rounded-2xl border border-white/5">
      <span className="text-[8px] text-white/30 uppercase font-black">{label}</span>
      <span className={`orbitron text-xs font-bold ${color}`}>{value}</span>
   </div>
);

const Metric: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-center gap-1">
    <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className={`orbitron text-base font-bold ${color}`}>{value}</span>
      <span className="text-[8px] text-white/20 font-bold">{unit}</span>
    </div>
  </div>
);

const StatusCard: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col justify-center gap-1 group hover:bg-white/10 transition-all">
     <span className="text-[9px] text-white/30 uppercase font-black tracking-widest leading-none mb-1">{label}</span>
     <div className="flex items-baseline gap-2">
        <span className={`orbitron text-2xl font-bold ${color}`}>{value}</span>
        <span className="text-[8px] text-white/10 font-bold uppercase">{unit}</span>
     </div>
  </div>
);

export default SaturnianOrchestrator;
