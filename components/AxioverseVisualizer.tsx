
import React, { useMemo } from 'react';
// Fix: Added BarChart and Bar to the recharts import list
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid, AreaChart, Area, LineChart, Line, BarChart, Bar } from 'recharts';
import { AXION_SPECTRUM, PHI, SOLITON_CROSS_TIME_S } from '../constants';
import { Sparkles, Radio, Zap, Activity, Compass, UnfoldHorizontal, Waves, Binary } from 'lucide-react';
import { AxionEngine } from '../services/axionEngine';

interface Props {
  pulsarPhase: number;
  burstActive: boolean;
  coherence: number;
  correlator: any;
  modulation: number;
  chirpActive: boolean;
}

const AxioverseVisualizer: React.FC<Props> = ({ pulsarPhase, burstActive, coherence, correlator, modulation, chirpActive }) => {
  const spectrumData = useMemo(() => AxionEngine.getDeltaCombSpectrum(80), [pulsarPhase > 0.5]); // Slight updates

  const chirpData = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const t = (i / 99) * 2 - 1; // -1 to 1
      return {
        time: t,
        phase: Math.tanh(t * 5) * 1.5, // tanh profile
        noise: Math.random() * 0.1
      };
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className={`p-8 bg-black/40 border ${chirpActive ? 'border-magenta-500 shadow-[0_0_50px_rgba(255,0,255,0.4)]' : 'border-white/10'} rounded-[3rem] relative overflow-hidden transition-all duration-700`}>
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <h4 className="orbitron text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
              <Binary className="text-magenta-400 animate-pulse" /> Holographic Chirp Profile
            </h4>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Solitonic Lattice Patch Crossing (VLD 2.0)</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`px-4 py-1 rounded-full text-[9px] font-bold orbitron border ${chirpActive ? 'bg-magenta-500 text-black border-magenta-400 animate-bounce' : 'bg-white/5 text-white/30 border-white/10'}`}>
              {chirpActive ? 'CHIRP_DETECTION_ACTIVE' : 'LATTICE_SYNC_MONITOR'}
            </div>
            <span className="text-[8px] font-mono text-magenta-500/60 uppercase">τ_cross: {SOLITON_CROSS_TIME_S}s</span>
          </div>
        </div>

        <div className="h-48 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chirpData}>
               <defs>
                  <linearGradient id="chirpGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff00ff" stopOpacity={0}/>
                  </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
               <XAxis dataKey="time" hide />
               <YAxis hide domain={[-2, 2]} />
               <Tooltip 
                  contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px', fontSize: '10px'}}
                  labelStyle={{display: 'none'}}
               />
               <Area 
                type="monotone" 
                dataKey="phase" 
                stroke="#ff00ff" 
                strokeWidth={3} 
                fill="url(#chirpGrad)" 
                animationDuration={chirpActive ? 250 : 2000}
               />
               {chirpActive && <Area type="monotone" dataKey="noise" stroke="#00f3ff" strokeWidth={1} fill="transparent" />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[9px] text-white/20 italic mt-6 uppercase font-mono text-center tracking-tighter">
           "H_F Algorithm: Phase-continuity maintained during non-linear topological jump."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem]">
           <h5 className="text-[10px] orbitron font-bold text-cyan-400 uppercase mb-6 flex items-center gap-3">
              <Waves size={16} /> Topological Delta-Comb Spectrum
           </h5>
           <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                {/* Fix: BarChart and Bar are now correctly imported */}
                <BarChart data={spectrumData}>
                  <CartesianGrid stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="freq" hide />
                  <YAxis hide />
                  <Bar dataKey="intensity">
                    {spectrumData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.intensity > 0.5 ? "#4ade80" : "#ffffff11"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-between mt-4">
              <span className="text-[8px] font-mono text-white/20">23.99 GHz</span>
              <span className="text-[8px] font-mono text-white/20">24.01 GHz</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <StatusMetric label="Lattice Sync" value={(coherence * 99).toFixed(1)} unit="%" color="text-green-400" />
           <StatusMetric label="Filter Gain" value={(correlator.holographicFilterGain * PHI).toFixed(2)} unit="dB" color="text-yellow-400" />
           <StatusMetric label="Stream N_str" value="1.0M" unit="MODES" color="text-cyan-400" />
           <StatusMetric label="SNR Substrate" value={(correlator.deterministicSignalRatio * 100).toFixed(1)} unit="%" color="text-magenta-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChannelCard icon={<Zap size={18} />} label="MADMAX (EM)" value={(180.5 * modulation).toFixed(1)} unit="GHz" status="Lattice-Lock" color="text-magenta-400" />
        <ChannelCard icon={<Activity size={18} />} label="MRFM (Spin)" value={(12.4 * (1 - modulation * 0.2)).toFixed(1)} unit="aN·m" status="Chirp-Scan" color="text-cyan-400" />
        <ChannelCard icon={<UnfoldHorizontal size={18} />} label="ASCI Baseline" value="10.0" unit="km" status="Phase-Coherent" color="text-yellow-400" />
      </div>
    </div>
  );
};

const StatusMetric: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem] flex flex-col justify-center gap-1">
    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className={`orbitron text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[8px] text-white/20 font-mono">{unit}</span>
    </div>
  </div>
);

const ChannelCard: React.FC<{ icon: any, label: string, value: string, unit: string, status: string, color: string }> = ({ icon, label, value, unit, status, color }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col gap-4 group hover:bg-white/10 transition-all">
     <div className="flex justify-between items-center">
       <div className={`p-3 bg-white/5 rounded-xl ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
       <span className={`text-[8px] orbitron font-bold uppercase px-2 py-1 rounded-full bg-white/5 ${status === 'Lattice-Lock' ? 'text-green-400' : 'text-yellow-400 animate-pulse'}`}>{status}</span>
     </div>
     <div>
       <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
       <div className="flex items-baseline gap-2">
          <span className={`orbitron text-2xl ${color} glow-magenta`}>{value}</span>
          <span className="text-[9px] text-white/20 font-bold font-mono">{unit}</span>
       </div>
     </div>
  </div>
);

export default AxioverseVisualizer;
