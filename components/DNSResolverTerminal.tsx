
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, Search, Plus, Terminal, Wifi, ShieldCheck, RefreshCcw, 
  Activity, Server, Hash, Clock, Trash2, Send, Settings, 
  ShieldAlert, Fingerprint, GitMerge, Layers, Zap, Network, 
  MapPin, Radio, Thermometer, Binary, Wind
} from 'lucide-react';
import { DNSEngine } from '../services/dnsEngine';
import { DNSRecord, NodeDNSConfig, ArkheCoefficients } from '../types';
import { GENESIS_VERIFIERS, QHTTP_NODES, PHI } from '../constants';

interface Props {
  records: DNSRecord[];
  nodeConfigs: NodeDNSConfig[];
  onAddRecord: (record: DNSRecord) => void;
  onDeleteRecord: (id: string) => void;
  onUpdateNodeConfig: (config: NodeDNSConfig) => void;
  onLog: (msg: string, status: any) => void;
}

const DNSResolverTerminal: React.FC<Props> = ({ records, nodeConfigs, onAddRecord, onDeleteRecord, onUpdateNodeConfig, onLog }) => {
  const [newHost, setNewHost] = useState('');
  const [newProto, setNewProto] = useState<DNSRecord['protocol']>('qhttp');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSweeping, setIsSweeping] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodeConfigs[0]?.nodeId || '');
  const [resolutionStream, setResolutionStream] = useState<string[]>([]);

  const handleAdd = () => {
    if (!newHost) return;
    const record = DNSEngine.generateRecord(newHost, newProto);
    onAddRecord(record);
    onLog(`QDN_PUSH: Protocol ${newProto.toUpperCase()} initiated for ${newHost}`, 'network');
    setNewHost('');
  };

  const handleSweep = async () => {
    setIsSweeping(true);
    onLog("PLANETARY_SWEEP: INITIATING_BYZANTINE_CALIBRATION_v2.2", "network");
    setResolutionStream(prev => [`[HANDSHAKE] Broadacting η-calibration to all nodes...`, ...prev].slice(0, 8));
    
    for (const node of nodeConfigs) {
      await new Promise(r => setTimeout(r, 400));
      onUpdateNodeConfig({
        ...node,
        fieldRigidity: Math.min(1, node.fieldRigidity + 0.02)
      });
      setResolutionStream(prev => [`[CONSENSUS] Node_${node.nodeId} locked at 0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`, ...prev].slice(0, 8));
    }

    setIsSweeping(false);
    onLog("MESH_STABILIZED: QHTTP_RESOLVER_AT_PEAK_COHERENCE", "success");
  };

  const activeNodeConfig = nodeConfigs.find(c => c.nodeId === selectedNodeId);

  const updateArkhe = (factor: keyof ArkheCoefficients, value: number) => {
    if (!activeNodeConfig) return;
    onUpdateNodeConfig({
      ...activeNodeConfig,
      localArkhe: { ...activeNodeConfig.localArkhe, [factor]: value }
    });
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      
      {/* Top Section: Arkhe Polynomial Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Node & Arkhe Tuning */}
        <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl flex flex-col gap-6">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,207,0,0.05)_0%,_transparent_70%)] pointer-events-none" />
           <div className="flex justify-between items-center relative z-10">
              <h4 className="orbitron text-xs font-black text-white/60 uppercase tracking-widest flex items-center gap-2">
                 <Binary size={14} className="text-yellow-400" /> Arkhe Polynomial L=f(C,I,E,F)
              </h4>
              <select 
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1 text-[10px] orbitron font-bold text-cyan-400 focus:outline-none"
              >
                {nodeConfigs.map(c => <option key={c.nodeId} value={c.nodeId}>{c.nodeId}</option>)}
              </select>
           </div>
           
           {activeNodeConfig && (
             <div className="flex flex-col gap-5 relative z-10">
                <ArkheSlider label="C: Chemistry/Substrate" icon={<Thermometer size={10} />} value={activeNodeConfig.localArkhe.C} onChange={(v) => updateArkhe('C', v)} color="text-red-400" />
                <ArkheSlider label="I: Information/Code" icon={<Binary size={10} />} value={activeNodeConfig.localArkhe.I} onChange={(v) => updateArkhe('I', v)} color="text-blue-400" />
                <ArkheSlider label="E: Energy/Flux" icon={<Zap size={10} />} value={activeNodeConfig.localArkhe.E} onChange={(v) => updateArkhe('E', v)} color="text-yellow-400" />
                <ArkheSlider label="F: Function/Purpose" icon={<Wind size={10} />} value={activeNodeConfig.localArkhe.F} onChange={(v) => updateArkhe('F', v)} color="text-green-400" />
                
                <div className="mt-2 p-4 bg-white/5 border border-white/5 rounded-2xl">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">Self-Resonance Probability</span>
                      <span className="text-[10px] orbitron font-bold text-yellow-400">{(DNSEngine.calculateResonance(activeNodeConfig.localArkhe, activeNodeConfig.localArkhe) * 100).toFixed(0)}%</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 shadow-[0_0_10px_gold]" style={{ width: '100%' }} />
                   </div>
                </div>
             </div>
           )}
        </div>

        {/* Global Registry Controls */}
        <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl flex flex-col gap-6">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,0,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
           
           <div className="flex justify-between items-start relative z-10">
              <div>
                <h4 className="orbitron text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3">
                   <Globe className="text-cyan-400" size={18} /> Byzantine Mesh Resolver v2.2
                </h4>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1 font-mono">QHTTP Resolution via Arkhe Resonance</p>
              </div>
              <button 
                onClick={handleSweep} 
                disabled={isSweeping}
                className={`p-3 bg-white/5 rounded-2xl border border-white/10 transition-all ${isSweeping ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 animate-pulse' : 'text-white/40 hover:text-white'}`}
              >
                <RefreshCcw size={16} className={isSweeping ? 'animate-spin' : ''} />
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-2">
                    <span className="text-[8px] text-white/20 uppercase font-black">Target Hostname</span>
                    <input 
                      type="text" 
                      value={newHost}
                      onChange={(e) => setNewHost(e.target.value)}
                      placeholder="identity.prime.mesh"
                      className="bg-black/80 border border-white/10 rounded-2xl px-6 py-4 text-xs orbitron text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                    />
                 </div>
                 <div className="flex flex-col gap-2">
                    <span className="text-[8px] text-white/20 uppercase font-black">Protocol Matrix</span>
                    <select 
                      value={newProto}
                      onChange={(e) => setNewProto(e.target.value as any)}
                      className="bg-black/80 border border-white/10 rounded-2xl px-6 py-4 text-xs orbitron text-white/60 focus:outline-none appearance-none shadow-inner"
                    >
                      <option value="qhttp">qhttp:// (Resonant)</option>
                      <option value="qdn">qdn:// (Encrypted)</option>
                      <option value="field">field:// (Direct)</option>
                    </select>
                 </div>
                 <button 
                   onClick={handleAdd}
                   className="mt-2 w-full py-5 bg-cyan-500 text-black orbitron text-[10px] font-black rounded-2xl hover:bg-cyan-400 active:scale-95 shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                 >
                   <Plus size={16} /> Inject Node Record
                 </button>
              </div>

              <div className="flex flex-col gap-4">
                 <span className="text-[8px] text-white/20 uppercase font-black tracking-widest block mb-1">Byzantine Handshake Logs</span>
                 <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[8px] text-cyan-400/50 overflow-hidden shadow-inner flex flex-col gap-1 min-h-[140px]">
                    {resolutionStream.length === 0 ? (
                      <div className="opacity-10 uppercase italic h-full flex items-center justify-center">Mesh idle. Waiting for sweep...</div>
                    ) : (
                      resolutionStream.map((log, i) => <div key={i} className="animate-in slide-in-from-left-2">{log}</div>)
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Record Table with Resonance Meters */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
         <div className="bg-black/40 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 bg-white/[0.02] text-[8px] font-black text-white/20 uppercase tracking-widest">
               <div className="col-span-3 flex items-center gap-2"><Server size={10} /> Hostname</div>
               <div className="col-span-4 flex items-center gap-2"><GitMerge size={10} /> Arkhe Resonance (P_L)</div>
               <div className="col-span-3 flex items-center gap-2"><Activity size={10} /> Coefficients</div>
               <div className="col-span-2 flex items-center gap-2 text-right justify-end"><Clock size={10} /> Status</div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {records.map((record) => {
                 const resonance = activeNodeConfig ? DNSEngine.calculateResonance(activeNodeConfig.localArkhe, record.coefficients) : 0;
                 return (
                    <div key={record.id} className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                       <div className="col-span-3 flex flex-col justify-center">
                          <span className="orbitron text-[11px] font-bold text-white/80">{record.host}</span>
                          <span className="text-[7px] font-mono text-cyan-400/40 uppercase mt-1 tracking-tighter">{record.protocol}://</span>
                       </div>
                       <div className="col-span-4 flex items-center">
                          <div className="w-full pr-10">
                             <div className="flex justify-between text-[7px] font-mono text-white/30 uppercase mb-1">
                                <span>Overlap Fidelity</span>
                                <span>{(resonance * 100).toFixed(1)}%</span>
                             </div>
                             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div 
                                 className={`h-full transition-all duration-1000 ${record.status === 'resolved' ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : record.status === 'decoherence_error' ? 'bg-red-500' : 'bg-cyan-400'}`} 
                                 style={{ width: `${resonance * 100}%` }} 
                                />
                             </div>
                          </div>
                       </div>
                       <div className="col-span-3 flex items-center gap-2">
                          <MiniBar value={record.coefficients.C} color="bg-red-400" />
                          <MiniBar value={record.coefficients.I} color="bg-blue-400" />
                          <MiniBar value={record.coefficients.E} color="bg-yellow-400" />
                          <MiniBar value={record.coefficients.F} color="bg-green-400" />
                       </div>
                       <div className="col-span-2 flex items-center justify-end">
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${record.status === 'resolved' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : record.status === 'decoherence_error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'}`}>
                             <div className={`w-1 h-1 rounded-full ${record.status === 'resolved' ? 'bg-emerald-400' : record.status === 'decoherence_error' ? 'bg-red-500' : 'bg-yellow-400 animate-ping'}`} />
                             <span className={`text-[7px] font-black uppercase tracking-tighter`}>{record.status.replace('_', ' ')}</span>
                          </div>
                          <button 
                            onClick={() => onDeleteRecord(record.id)}
                            className="ml-3 opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all hover:bg-red-400/10 rounded-lg"
                          >
                            <Trash2 size={12} />
                          </button>
                       </div>
                    </div>
                 );
               })}
            </div>
         </div>
      </div>

      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[3.5rem] flex items-center justify-between group shadow-inner relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-2 relative z-10">
            <span className="orbitron text-[9px] font-bold text-cyan-400/60 uppercase tracking-widest flex items-center gap-2">
               <ShieldCheck size={14} /> Arkhe Polynomial Synchronization Assurance
            </span>
            <p className="text-[11px] text-white/50 italic leading-relaxed font-serif max-w-3xl">
               "Resonance resolution protocol: P(L) = |<local|target>|^2. Tune your coefficients (C,I,E,F) to match the target host's wave function. Decoherence below η=0.7 will result in resolution failure."
            </p>
         </div>
         <div className="p-10 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-500 ml-6">
            <Zap size={32} className="text-cyan-500" />
         </div>
      </div>
    </div>
  );
};

const ArkheSlider: React.FC<{ label: string, icon: any, value: number, onChange: (v: number) => void, color: string }> = ({ label, icon, value, onChange, color }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center text-[8px] font-black uppercase text-white/30 tracking-widest">
       <span className="flex items-center gap-2">{icon} {label}</span>
       <span className={color}>{(value * 100).toFixed(0)}%</span>
    </div>
    <input 
     type="range" min="0" max="1" step="0.01"
     value={value} 
     onChange={(e) => onChange(parseFloat(e.target.value))}
     className={`accent-cyan-500 bg-white/5 rounded-lg h-1.5 cursor-pointer`}
    />
  </div>
);

const MiniBar: React.FC<{ value: number, color: string }> = ({ value, color }) => (
  <div className="w-2 h-6 bg-white/5 rounded-full overflow-hidden flex flex-col justify-end">
    <div className={`w-full ${color}`} style={{ height: `${value * 100}%` }} />
  </div>
);

export default DNSResolverTerminal;
