
import React, { useMemo } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { AXION_SPECTRUM } from '../constants';
import { Sparkles, Radio, Zap, Activity } from 'lucide-react';

interface Props {
  pulsarPhase: number;
  burstActive: boolean;
  coherence: number;
}

const AxioverseVisualizer: React.FC<Props> = ({ pulsarPhase, burstActive, coherence }) => {
  const chartData = useMemo(() => {
    return AXION_SPECTRUM.map(ax => ({
      ...ax,
      y: Math.log10(ax.coupling),
      x: ax.frequency,
      z: ax.mass * 100
    }));
  }, []);

  const wavePoints = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const x = (i / 49) * 100;
      const y = 50 + Math.sin((x / 10) + pulsarPhase * Math.PI * 4) * 20 * coherence;
      return { x, y };
    });
  }, [pulsarPhase, coherence]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className={`p-8 bg-black/40 border ${burstActive ? 'border-yellow-500 shadow-[0_0_40px_rgba(255,207,0,0.4)]' : 'border-white/10'} rounded-[3rem] relative overflow-hidden transition-all duration-500`}>
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <h4 className="orbitron text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
              <Radio className="text-cyan-400" /> ALP Spectral Manifold
            </h4>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Multi-Channel Detection: Seoul 2026 Directives</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`px-4 py-1 rounded-full text-[9px] font-bold orbitron border ${burstActive ? 'bg-yellow-500 text-black border-yellow-400 animate-pulse' : 'bg-white/5 text-white/30 border-white/10'}`}>
              {burstActive ? 'MINICLUSTER_SYNC_LOCKED' : 'BACKGROUND_RESIDUAL'}
            </div>
            <span className="text-[8px] font-mono text-cyan-500/50 uppercase">λ_de_Broglie: { (100 / coherence).toFixed(2) } m</span>
          </div>
        </div>

        <div className="h-64 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Frequency" 
                unit=" GHz" 
                tick={{fill: '#ffffff33', fontSize: 10}} 
                axisLine={{stroke: '#ffffff11'}}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Coupling" 
                unit=" log(g)" 
                tick={{fill: '#ffffff33', fontSize: 10}} 
                axisLine={{stroke: '#ffffff11'}}
              />
              <ZAxis type="number" dataKey="z" range={[50, 400]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px', fontSize: '10px'}}
              />
              <Scatter name="Axion Harmonics" data={chartData}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.status === 'locked' ? '#4ade80' : '#00f3ff'} 
                    fillOpacity={0.6 + (Math.sin(pulsarPhase * Math.PI * 2) * 0.2)}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Constructive Interference Visualization */}
        <div className="mt-4 h-16 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d={`M ${wavePoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="rgba(0, 243, 255, 0.3)"
              strokeWidth="0.5"
            />
            <path 
              d={`M ${wavePoints.map(p => `${p.x},${100 - p.y}`).join(' L ')}`}
              fill="none"
              stroke="rgba(255, 0, 255, 0.2)"
              strokeWidth="0.5"
            />
          </svg>
          <div className="absolute top-0 right-0 p-2 flex items-center gap-2">
            <Sparkles size={12} className="text-yellow-500 animate-pulse" />
            <span className="text-[8px] orbitron text-yellow-500/80 font-bold uppercase tracking-widest">MADMAX Boost Active</span>
          </div>
        </div>

        {burstActive && (
          <div className="absolute inset-0 bg-yellow-500/5 pointer-events-none animate-pulse" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChannelCard 
          icon={<Zap size={18} />} 
          label="Photon Channel" 
          value="180.5" 
          unit="GHz" 
          status="Locked" 
          color="text-magenta-400" 
        />
        <ChannelCard 
          icon={<Activity size={18} />} 
          label="Spin Channel" 
          value="12.4" 
          unit="aN·m" 
          status="Scanning" 
          color="text-cyan-400" 
        />
        <ChannelCard 
          icon={<Radio size={18} />} 
          label="Mechanical Force" 
          value="850.2" 
          unit="zN" 
          status="Locked" 
          color="text-emerald-400" 
        />
      </div>
    </div>
  );
};

const ChannelCard: React.FC<{ icon: any, label: string, value: string, unit: string, status: string, color: string }> = ({ icon, label, value, unit, status, color }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col gap-4 group hover:bg-white/10 transition-colors">
     <div className="flex justify-between items-center">
       <div className={`p-3 bg-white/5 rounded-xl ${color}`}>{icon}</div>
       <span className={`text-[8px] orbitron font-bold uppercase px-2 py-1 rounded-full bg-white/5 ${status === 'Locked' ? 'text-green-400' : 'text-yellow-400 animate-pulse'}`}>{status}</span>
     </div>
     <div>
       <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
       <div className="flex items-baseline gap-2">
          <span className={`orbitron text-2xl ${color}`}>{value}</span>
          <span className="text-[9px] text-white/20 font-bold font-mono">{unit}</span>
       </div>
     </div>
  </div>
);

export default AxioverseVisualizer;
