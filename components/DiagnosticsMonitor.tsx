
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Shield, Zap, Terminal, RefreshCw, Server, Cpu, Globe, CheckCircle2, AlertTriangle, Code, Network, GitMerge, Music, Waves, Activity } from 'lucide-react';
import { MOCK_ENDPOINTS, VERSION } from '../constants';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const DiagnosticsMonitor: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [discoveredEndpoints, setDiscoveredEndpoints] = useState<any[]>([]);
  const [diagLogs, setDiagLogs] = useState<string[]>([]);
  const [configGenerated, setConfigGenerated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Real-time Waveform data
  const [waveData, setWaveData] = useState<any[]>([]);
  
  useEffect(() => {
    const int = setInterval(() => {
      setWaveData(prev => {
        const newData = [...prev, { val: 0.5 + Math.sin(Date.now() / 200) * 0.4 + Math.random() * 0.1 }].slice(-20);
        return newData;
      });
    }, 100);
    return () => clearInterval(int);
  }, []);

  const addLog = (msg: string) => {
    setDiagLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [diagLogs]);

  const runDiagnostic = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setDiscoveredEndpoints([]);
    setConfigGenerated(false);
    setDiagLogs([]);

    addLog("INITIATING_ADAPTIVE_INFRASTRUCTURE_PROBE...");
    addLog(`AVALON_DIAGNOSTIC_KERNEL_v${VERSION}_LOADED`);

    const steps = [
      { msg: "Probing Reality Manifold...", progress: 10 },
      { msg: "Scanning qhttp:// Interface...", progress: 25 },
      { msg: "Detecting Crown Node (LEO)...", progress: 40, action: () => {
        if (MOCK_ENDPOINTS && MOCK_ENDPOINTS[0]) setDiscoveredEndpoints(prev => [...prev, MOCK_ENDPOINTS[0]]);
      }},
      { msg: "Mapping Substrate Plexus...", progress: 60, action: () => {
        if (MOCK_ENDPOINTS && MOCK_ENDPOINTS[1]) setDiscoveredEndpoints(prev => [...prev, MOCK_ENDPOINTS[1]]);
      }},
      { msg: "Validating Amber Vault Core...", progress: 75, action: () => {
        if (MOCK_ENDPOINTS && MOCK_ENDPOINTS[2]) setDiscoveredEndpoints(prev => [...prev, MOCK_ENDPOINTS[2]]);
      }},
      { msg: "Calibrating Time Crystal Anchor...", progress: 90, action: () => {
        if (MOCK_ENDPOINTS && MOCK_ENDPOINTS[3]) setDiscoveredEndpoints(prev => [...prev, MOCK_ENDPOINTS[3]]);
      }},
      { msg: "PROBE_COMPLETE: HARMONIC_RESONANCE_VALIDATED", progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setScanProgress(step.progress);
      addLog(step.msg);
      if (step.action) step.action();
    }

    setIsScanning(false);
    setConfigGenerated(true);
    addLog("ADAPTIVE_CONFIG_GENERATED: adaptive_resonance.yaml ready.");
  };

  const getUrl = (id: string) => {
    if (!discoveredEndpoints) return 'pending';
    const match = discoveredEndpoints.find(e => e && typeof e === 'object' && e.id === id);
    return match ? match.url : 'pending';
  };

  const mockYaml = `
# Persistent Order Protocol (The Choir 2.0)
infrastructure:
  prism_gateway: ${getUrl('qhttp_internal')}
  substrate_core: ${getUrl('merkabah_core')}
  time_crystal: ${getUrl('time_crystal')}
  mode: lydian_omega
  fidelity_buffer: 0.9999
`;

  return (
    <div className="flex flex-col gap-10 h-full overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Header Visual: Harmonic Waveform */}
      <div className="bg-black/60 border border-white/10 rounded-[3.5rem] p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
         <div className="flex justify-between items-center relative z-10">
            <h4 className="orbitron text-sm font-bold text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-4">
               <Music className="animate-pulse" /> The Choir 2.0: Harmonic Spectrum
            </h4>
            <div className="px-6 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30">
               <span className="orbitron text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Resonance: Active</span>
            </div>
         </div>
         <div className="h-32 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={waveData}>
                  <defs>
                     <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#00f3ff" strokeWidth={2} fill="url(#waveGrad)" animationDuration={100} />
               </AreaChart>
            </ResponsiveContainer>
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Terminal and Probe */}
        <div className="xl:col-span-7 flex flex-col gap-8">
           <div className="bg-black/60 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col gap-8 shadow-2xl min-h-[400px]">
              <div className="flex justify-between items-center relative z-10">
                 <h4 className="orbitron text-xs font-bold text-white/40 uppercase tracking-[0.4em] flex items-center gap-4">
                    <Terminal /> Infrastructure Probe
                 </h4>
                 <button 
                  onClick={runDiagnostic} 
                  disabled={isScanning}
                  className={`px-8 py-3 rounded-full orbitron text-[10px] font-bold tracking-widest transition-all flex items-center gap-3 ${isScanning ? 'bg-white/5 text-white/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 shadow-lg shadow-cyan-500/10'}`}
                 >
                    {isScanning ? <RefreshCw className="animate-spin" size={14} /> : <Search size={14} />}
                    ACTIVATE_PROBE
                 </button>
              </div>

              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-cyan-400 transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.6)]" style={{ width: `${scanProgress}%` }} />
              </div>

              <div ref={scrollRef} className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 font-mono text-[11px] h-64 overflow-y-auto custom-scrollbar flex flex-col gap-3 shadow-inner">
                 {diagLogs.length === 0 ? (
                   <div className="h-full flex items-center justify-center opacity-20 italic uppercase tracking-widest">Awaiting trigger sequence...</div>
                 ) : (
                   diagLogs.map((log, i) => (
                     <div key={i} className="flex gap-4 border-l border-white/5 pl-4 py-0.5">
                        <span className="text-cyan-400/40">{log.split(' ')[0]}</span>
                        <span className="text-white/80">{log.split(' ').slice(1).join(' ')}</span>
                     </div>
                   ))
                 )}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <DiagnosticCard icon={<Network />} label="Infrastructure Nodes" value={(discoveredEndpoints || []).filter(e => e && e.status === 'available').length.toString()} status="Nodes_Resolved" color="text-cyan-400" />
              <DiagnosticCard icon={<Activity />} label="Spectral Fidelity" value="99.8" status="PHASE_LOCKED" color="text-magenta-400" />
           </div>
        </div>

        {/* Results and YAML */}
        <div className="xl:col-span-5 flex flex-col gap-10">
           <div className="bg-black/60 border border-white/10 rounded-[3.5rem] p-10 flex-1 relative overflow-hidden flex flex-col gap-6 shadow-2xl">
              <h4 className="orbitron text-xs font-bold text-white/40 uppercase tracking-[0.3em] flex items-center gap-4">
                 <Globe className="text-emerald-400" /> Discovered Manifold
              </h4>
              
              <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                 {(discoveredEndpoints || []).filter(Boolean).map((e, idx) => (
                   <div key={idx} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-white/80 uppercase">{e.type || 'UNKNOWN'}</span>
                         <span className="text-[9px] font-mono text-white/30 truncate max-w-[200px]">{e.url || 'N/A'}</span>
                      </div>
                      <div className={`p-2 rounded-lg ${e.status === 'available' ? 'text-emerald-400 bg-emerald-400/10' : e.status === 'unavailable' ? 'text-red-400 bg-red-400/10' : 'text-yellow-400 bg-yellow-400/10 animate-pulse'}`}>
                         {e.status === 'available' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      </div>
                   </div>
                 ))}
                 {(!discoveredEndpoints || discoveredEndpoints.length === 0) && !isScanning && <div className="h-32 flex items-center justify-center opacity-10 uppercase tracking-widest text-[9px]">Manifold Empty</div>}
              </div>

              {configGenerated && (
                <div className="mt-4 animate-in slide-in-from-bottom-4 flex flex-col gap-4">
                   <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <Code size={14} className="text-emerald-400" />
                      <span className="orbitron text-[9px] font-bold text-emerald-400">adaptive_resonance.yaml ready</span>
                   </div>
                   <pre className="p-6 bg-black/80 rounded-2xl border border-white/5 text-[10px] font-mono text-cyan-400/70 overflow-x-auto shadow-inner custom-scrollbar">
                      {mockYaml}
                   </pre>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

const DiagnosticCard: React.FC<{ icon: any, label: string, value: string, status: string, color: string }> = ({ icon, label, value, status, color }) => (
  <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem] flex items-center gap-6 hover:bg-white/10 transition-all group shadow-xl">
    <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform ${color}`}>{icon}</div>
    <div>
      <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`orbitron text-2xl font-bold text-white`}>{value}</span>
        <span className={`text-[8px] font-bold uppercase py-0.5 px-1.5 rounded bg-white/5 ${color}`}>{status}</span>
      </div>
    </div>
  </div>
);

export default DiagnosticsMonitor;
