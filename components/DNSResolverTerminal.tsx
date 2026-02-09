
import React, { useState, useEffect } from 'react';
import { Globe, Search, Plus, Terminal, Wifi, ShieldCheck, RefreshCcw, Activity, Server, Hash, Clock, Trash2, Send, Settings, ShieldAlert, Fingerprint, GitMerge, Layers, Zap } from 'lucide-react';
import { DNSEngine } from '../services/dnsEngine';
import { DNSRecord, NodeDNSConfig } from '../types';
import { GENESIS_VERIFIERS, PHI } from '../constants';

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
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodeConfigs[0]?.nodeId || '');
  const [resolutionStream, setResolutionStream] = useState<string[]>([]);

  const handleAdd = () => {
    if (!newHost) return;
    const record = DNSEngine.generateRecord(newHost, newProto);
    onAddRecord(record);
    onLog(`QDN_PUSH: Protocol ${newProto.toUpperCase()} initiated for ${newHost}`, 'network');
    setNewHost('');
  };

  const refreshRegistry = () => {
    setIsRefreshing(true);
    setResolutionStream(prev => [`[HANDSHAKE] QHTTP_MESH_RESCAN_INITIATED`, ...prev].slice(0, 5));
    onLog("QDN_SYNC: Force-refreshing Byzantine registry...", "info");
    setTimeout(() => {
      setIsRefreshing(false);
      setResolutionStream(prev => [`[SUCCESS] MESH_STATE_LOCKED: 0x840K`, ...prev].slice(0, 5));
      onLog("QDN_SYNC: Planetary mesh anchored.", "success");
    }, 1500);
  };

  const activeNodeConfig = nodeConfigs.find(c => c.nodeId === selectedNodeId);

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      
      {/* Configuration Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* DNS Entry & Byzantine Stream */}
        <div className="bg-black/60 border border-white/10 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl flex flex-col gap-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,243,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h4 className="orbitron text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-3">
                <Globe className="text-cyan-400" size={18} /> QHTTP Resolver v2.2
              </h4>
              <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1 font-mono">Byzantine Fault Tolerance Layer</p>
            </div>
            <button 
              onClick={refreshRegistry}
              className={`p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCcw size={16} className="text-cyan-400" />
            </button>
          </div>

          <div className="flex flex-col gap-4 relative z-10">
             <div className="flex flex-col gap-2">
                <span className="text-[8px] text-white/20 uppercase font-black px-1">Host Alias (Sub-Field)</span>
                <input 
                  type="text" 
                  value={newHost}
                  onChange={(e) => setNewHost(e.target.value)}
                  placeholder="axiom.qhttp.mesh"
                  className="bg-black/80 border border-white/10 rounded-2xl px-6 py-4 text-xs orbitron text-cyan-400 focus:outline-none focus:border-cyan-500/50 shadow-inner"
                />
             </div>
             <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                   <span className="text-[8px] text-white/20 uppercase font-black px-1">Protocol Matrix</span>
                   <select 
                     value={newProto}
                     onChange={(e) => setNewProto(e.target.value as any)}
                     className="bg-black/80 border border-white/10 rounded-2xl px-6 py-4 text-xs orbitron text-white/60 focus:outline-none appearance-none"
                   >
                      <option value="qhttp">qhttp:// (Byzantine)</option>
                      <option value="qdn">qdn:// (Encrypted)</option>
                      <option value="field">field:// (Direct)</option>
                   </select>
                </div>
                <div className="flex items-end">
                   <button 
                      onClick={handleAdd}
                      className="px-8 h-[52px] bg-cyan-500 text-black rounded-2xl flex items-center justify-center gap-2 orbitron text-[9px] font-black hover:bg-cyan-400 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
                   >
                      <Plus size={16} /> Deploy_Node
                   </button>
                </div>
             </div>
          </div>

          {/* Real-time Handshake Stream */}
          <div className="mt-4 p-4 bg-black/40 border border-white/5 rounded-2xl font-mono text-[8px] text-cyan-400/40 min-h-[80px]">
             {resolutionStream.length === 0 ? (
               <div className="opacity-10 uppercase italic">Awaiting resolution events...</div>
             ) : (
               resolutionStream.map((log, i) => <div key={i} className="mb-0.5 animate-in fade-in">{log}</div>)
             )}
          </div>
        </div>

        {/* Quantum Node Calibration */}
        <div className="bg-black/60 border border-white/10 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl flex flex-col gap-6">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,0,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
           <div className="flex justify-between items-start relative z-10">
              <div>
                <h4 className="orbitron text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-3">
                  <Settings className="text-magenta-400" size={18} /> Node Calibration
                </h4>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1 font-mono">Quantum Communication Node (QCN) Configuration</p>
              </div>
              <select 
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1 text-[10px] orbitron font-bold text-cyan-400 focus:outline-none"
              >
                {nodeConfigs.map(c => <option key={c.nodeId} value={c.nodeId}>{c.nodeId}</option>)}
              </select>
           </div>

           {activeNodeConfig && (
             <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                   <span className="text-[8px] text-white/20 uppercase font-black flex justify-between">Field Rigidity <span>{(activeNodeConfig.fieldRigidity * 100).toFixed(0)}%</span></span>
                   <input 
                    type="range" min="0" max="1" step="0.01"
                    value={activeNodeConfig.fieldRigidity} 
                    onChange={(e) => onUpdateNodeConfig({ ...activeNodeConfig, fieldRigidity: parseFloat(e.target.value) })}
                    className="accent-magenta-500 bg-white/5 rounded-lg h-1.5"
                   />
                </div>
                <div className="flex flex-col gap-2">
                   <span className="text-[8px] text-white/20 uppercase font-black flex justify-between">Consensus Stake <span>{(activeNodeConfig.consensusStake / 1e9).toFixed(1)}G</span></span>
                   <input 
                    type="range" min="1e8" max="1e10" step="1e8"
                    value={activeNodeConfig.consensusStake} 
                    onChange={(e) => onUpdateNodeConfig({ ...activeNodeConfig, consensusStake: parseFloat(e.target.value) })}
                    className="accent-cyan-500 bg-white/5 rounded-lg h-1.5"
                   />
                </div>
                <div className="col-span-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                   <span className="text-[8px] text-white/20 uppercase font-black mb-3 block">Byzantine Hardening Protocol</span>
                   <div className="flex gap-2">
                      {['ZKP_STEALTH', 'BYZANTINE_HARDENED'].map(m => (
                        <button 
                          key={m}
                          onClick={() => onUpdateNodeConfig({ ...activeNodeConfig, encryptionMode: m as any })}
                          className={`flex-1 py-3 rounded-xl orbitron text-[8px] font-black transition-all border ${activeNodeConfig.encryptionMode === m ? 'bg-magenta-500/20 border-magenta-500 text-magenta-400 shadow-[0_0_15px_rgba(255,0,255,0.2)]' : 'bg-black/40 border-white/5 text-white/20 hover:border-white/20'}`}
                        >
                          {m}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Resolution Registry */}
      <div className="flex-1 min-h-0 flex flex-col gap-4">
         <div className="flex justify-between items-center px-4">
            <h5 className="orbitron text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Mesh Resolution Registry</h5>
            <span className="text-[8px] font-mono text-cyan-400/40">Network Stability: χ = 1.618</span>
         </div>
         
         <div className="flex-1 bg-black/40 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 bg-white/[0.02] text-[8px] font-black text-white/20 uppercase tracking-widest">
               <div className="col-span-3 flex items-center gap-2"><Server size={10} /> Hostname</div>
               <div className="col-span-4 flex items-center gap-2"><Layers size={10} /> Byzantine Verifiers</div>
               <div className="col-span-3 flex items-center gap-2"><GitMerge size={10} /> Consensus</div>
               <div className="col-span-2 flex items-center gap-2"><Activity size={10} /> Finality</div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {records.map((record) => (
                 <div key={record.id} className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                    <div className="col-span-3 flex flex-col justify-center">
                       <span className="orbitron text-[11px] font-bold text-white/70">{record.host}</span>
                       <span className="text-[7px] font-mono text-white/20 uppercase mt-1">{record.protocol}://</span>
                    </div>
                    <div className="col-span-4 flex items-center gap-1.5">
                       {GENESIS_VERIFIERS.map((v, i) => (
                         <div 
                           key={i} 
                           title={v.name}
                           className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-700 ${record.verifiers.includes(v.name) ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_5px_cyan]' : 'bg-black/40 border-white/10 opacity-20 grayscale'}`}
                         >
                            <Fingerprint size={10} className={record.verifiers.includes(v.name) ? 'text-cyan-400' : 'text-white/20'} />
                         </div>
                       ))}
                    </div>
                    <div className="col-span-3 flex items-center">
                       <div className="w-full max-w-[120px]">
                          <div className="flex justify-between text-[7px] font-mono text-white/30 uppercase mb-1">
                             <span>Consensus</span>
                             <span>{(record.consensusWeight * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                             <div 
                              className={`h-full transition-all duration-1000 ${record.status === 'resolved' ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-cyan-400'}`} 
                              style={{ width: `${record.consensusWeight * 100}%` }} 
                             />
                          </div>
                       </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${record.status === 'resolved' ? 'bg-emerald-400 animate-pulse' : record.status === 'byzantine_check' ? 'bg-yellow-400 animate-spin-slow' : 'bg-white/10'}`} />
                          <span className={`text-[8px] font-bold uppercase tracking-tighter ${record.status === 'resolved' ? 'text-emerald-400' : 'text-white/40'}`}>{record.status.replace('_', ' ')}</span>
                       </div>
                       <button 
                        onClick={() => onDeleteRecord(record.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all hover:bg-red-400/10 rounded-lg"
                       >
                          <Trash2 size={12} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[3.5rem] flex items-center justify-between group shadow-inner relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-2 relative z-10">
            <span className="orbitron text-[9px] font-bold text-cyan-400/60 uppercase tracking-widest flex items-center gap-2">
               <ShieldCheck size={14} /> Byzantine Mesh Integrity Verification
            </span>
            <p className="text-[11px] text-white/50 italic leading-relaxed font-serif max-w-3xl">
               "Configure nodes to resolve the qhttp:// protocol through non-local consensus. Each node resolved against the planetary mesh must verify field rigidity (η) before establishing an entangled downlink to the observer's Arkhe(n)."
            </p>
         </div>
         <div className="p-10 bg-white/5 rounded-full group-hover:rotate-12 transition-transform duration-500 ml-6">
            <Zap size={32} className="text-cyan-500" />
         </div>
      </div>
    </div>
  );
};

export default DNSResolverTerminal;
