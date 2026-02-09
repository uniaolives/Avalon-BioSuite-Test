
import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';
import { Globe, Users, Activity, Zap, ShieldCheck, Cpu } from 'lucide-react';
import GlobalMeshMap from './MeshMap'; // Changed to use internal MeshMap for simplicity if needed, but we have GlobalMeshMap.tsx

interface Props {
  globalMetrics: any;
  quantumState: any;
  pulsarPhase: number;
}

const DashboardView: React.FC<Props> = ({ globalMetrics, quantumState, pulsarPhase }) => {
  const evolutionData = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      time: i,
      coherence: 0.85 + Math.sin(i * 0.5) * 0.05 + (i * 0.005),
      entropy: 0.15 - (i * 0.004) + Math.random() * 0.02
    }));
  }, []);

  const radarData = [
    { subject: 'Topological', A: 90, B: 80, fullMark: 100 },
    { subject: 'Quantum', A: 98, B: 70, fullMark: 100 },
    { subject: 'Linguistic', A: 86, B: 95, fullMark: 100 },
    { subject: 'Biometric', A: 99, B: 85, fullMark: 100 },
    { subject: 'Solitonic', A: 85, B: 90, fullMark: 100 },
    { subject: 'Temporal', A: 65, B: 85, fullMark: 100 },
  ];

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* Top Row: Global Map & Main Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-black/40 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h4 className="orbitron text-sm font-bold text-white/60 uppercase tracking-[0.4em] flex items-center gap-4">
              <Globe className="text-cyan-400" /> Global Mesh Synchronization
            </h4>
            <div className="flex items-center gap-4 px-6 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
               <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
               <span className="orbitron text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Live_Nodes: 8.01B</span>
            </div>
          </div>
          <div className="h-64 relative z-10">
            {/* Using a simplified version of the mesh for dashboard flow */}
            <svg viewBox="0 0 400 200" className="w-full h-full opacity-60">
              <path d="M 50,100 Q 200,20 350,100 T 50,100" fill="none" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="0.5" />
              {Array.from({length: 40}).map((_, i) => (
                <circle 
                  key={i} 
                  cx={Math.random() * 400} cy={Math.random() * 200} 
                  r={Math.random() > 0.8 ? 1.5 : 0.5} 
                  fill={Math.random() > 0.7 ? "var(--neon-cyan)" : "white"} 
                  opacity={0.3 + 0.7 * Math.sin(pulsarPhase * Math.PI * 2 + i)}
                />
              ))}
              {/* Connection lines */}
              <line x1="100" y1="50" x2="300" y2="150" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="0.2" />
              <line x1="50" y1="120" x2="350" y2="80" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="0.2" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
           <MetricBox icon={<Users className="text-magenta-400" />} label="Collective Coherence" value="0.982" unit="PLV" detail="Validation High" />
           <MetricBox icon={<Zap className="text-yellow-400" />} label="Resonance Energy" value="12.4" unit="ZJ" detail="Surpassing Threshold" />
           <MetricBox icon={<ShieldCheck className="text-emerald-400" />} label="System Integrity" value="99.9" unit="%" detail="Entropy Negligible" />
        </div>
      </div>

      {/* Middle Row: Evolution Chart & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-black/40 border border-white/10 rounded-[3rem] p-10">
            <h5 className="orbitron text-xs font-bold text-white/40 uppercase mb-8 tracking-widest">Evolution Convergence Trend</h5>
            <div className="h-56">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolutionData}>
                    <defs>
                      <linearGradient id="colorCoherence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[0, 1.2]} />
                    <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', fontSize: '10px'}} />
                    <Area type="monotone" dataKey="coherence" stroke="#00f3ff" fillOpacity={1} fill="url(#colorCoherence)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-black/40 border border-white/10 rounded-[3rem] p-10 flex items-center justify-center">
            <div className="h-56 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#ffffff11" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#ffffff33', fontSize: 10, fontWeight: 'bold'}} />
                    <PolarRadiusAxis hide />
                    <Radar name="System A" dataKey="A" stroke="#ff00ff" fill="#ff00ff" fillOpacity={0.3} />
                    <Radar name="System B" dataKey="B" stroke="#00f3ff" fill="#00f3ff" fillOpacity={0.1} />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

const MetricBox: React.FC<{ icon: any, label: string, value: string, unit: string, detail: string }> = ({ icon, label, value, unit, detail }) => (
  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 hover:bg-white/10 transition-all group shadow-xl">
    <div className="flex items-center gap-6">
      <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <div className="flex-1">
        <span className="text-[9px] text-white/30 uppercase font-bold tracking-[0.2em] block mb-1">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="orbitron text-2xl font-bold text-white tracking-tighter">{value}</span>
          <span className="text-[10px] text-white/20 font-bold uppercase">{unit}</span>
        </div>
        <p className="text-[9px] text-white/10 mt-1 uppercase font-mono">{detail}</p>
      </div>
    </div>
  </div>
);

export default DashboardView;
