
import React, { useState, useEffect } from 'react';
import { Globe, Search, Plus, Terminal, Wifi, ShieldCheck, RefreshCcw, Activity, Server, Hash, Clock, Trash2, Send } from 'lucide-react';
import { DNSEngine } from '../services/dnsEngine';
import { DNSRecord } from '../types';

interface Props {
  records: DNSRecord[];
  onAddRecord: (record: DNSRecord) => void;
  onDeleteRecord: (id: string) => void;
  onLog: (msg: string, status: any) => void;
}

const DNSResolverTerminal: React.FC<Props> = ({ records, onAddRecord, onDeleteRecord, onLog }) => {
  const [newHost, setNewHost] = useState('');
  const [newProto, setNewProto] = useState<DNSRecord['protocol']>('qhttp');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleAdd = () => {
    if (!newHost) return;
    const record = DNSEngine.generateRecord(newHost, newProto);
    onAddRecord(record);
    onLog(`QDN_PUSH: Propagation initiated for ${newHost}`, 'network');
    setNewHost('');
  };

  const refreshRegistry = () => {
    setIsRefreshing(true);
    onLog("QDN_SYNC: Refreshing non-local registry...", "info");
    setTimeout(() => {
      setIsRefreshing(false);
      onLog("QDN_SYNC: Registry synchronized with 8.4B nodes.", "success");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      {/* Header Config Panel */}
      <div className="bg-black/60 border border-white/10 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl flex flex-col gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,243,255,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <h4 className="orbitron text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-3">
              <Globe className="text-cyan-400" size={18} /> Quantum DNS Config
            </h4>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1 font-mono">QHTTP_MESH Resolution Protocol • Root_Server: 0.0.0.Ω</p>
          </div>
          <button 
            onClick={refreshRegistry}
            className={`p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCcw size={16} className="text-cyan-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
          <div className="md:col-span-6">
             <div className="flex flex-col gap-2">
                <span className="text-[8px] text-white/20 uppercase font-black px-1">Host Alias</span>
                <input 
                  type="text" 
                  value={newHost}
                  onChange={(e) => setNewHost(e.target.value)}
                  placeholder="e.g. gateway.leo.mesh"
                  className="bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-xs orbitron text-cyan-400 focus:outline-none focus:border-cyan-500/50 shadow-inner"
                />
             </div>
          </div>
          <div className="md:col-span-4">
             <div className="flex flex-col gap-2">
                <span className="text-[8px] text-white/20 uppercase font-black px-1">Protocol Stack</span>
                <select 
                  value={newProto}
                  onChange={(e) => setNewProto(e.target.value as any)}
                  className="bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-xs orbitron text-white/60 focus:outline-none focus:border-cyan-500/50 shadow-inner appearance-none"
                >
                   <option value="qhttp">qhttp:// Protocol</option>
                   <option value="qdn">qdn:// Direct</option>
                   <option value="field">field:// Signature</option>
                </select>
             </div>
          </div>
          <div className="md:col-span-2 flex items-end">
             <button 
                onClick={handleAdd}
                className="w-full h-[52px] bg-cyan-500 text-black rounded-2xl flex items-center justify-center gap-2 orbitron text-[10px] font-black hover:bg-cyan-400 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
             >
                <Plus size={16} /> Deploy
             </button>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="flex-1 min-h-0 flex flex-col gap-4">
         <div className="flex justify-between items-center px-4">
            <h5 className="orbitron text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Active Resolution Table</h5>
            <span className="text-[8px] font-mono text-cyan-400/40">Total Records: {records.length}</span>
         </div>
         
         <div className="flex-1 bg-black/40 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 bg-white/[0.02] text-[8px] font-black text-white/20 uppercase tracking-widest">
               <div className="col-span-4 flex items-center gap-2"><Server size={10} /> Hostname</div>
               <div className="col-span-4 flex items-center gap-2"><Hash size={10} /> Field Address</div>
               <div className="col-span-2 flex items-center gap-2"><Clock size={10} /> TTL (ms)</div>
               <div className="col-span-2 flex items-center gap-2"><Activity size={10} /> Status</div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {records.map((record) => (
                 <div key={record.id} className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                    <div className="col-span-4 flex items-center gap-4">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white/40 ${record.status === 'resolved' ? 'text-cyan-400' : 'animate-pulse'}`}>
                          {record.protocol === 'qhttp' ? <Wifi size={14} /> : record.protocol === 'qdn' ? <Send size={14} /> : <Hash size={14} />}
                       </div>
                       <span className="orbitron text-[11px] font-bold text-white/70">{record.host}</span>
                    </div>
                    <div className="col-span-4 flex items-center">
                       <span className="font-mono text-[10px] text-white/30 truncate max-w-full px-2 py-1 bg-black/40 rounded border border-white/5">{record.address}</span>
                    </div>
                    <div className="col-span-2 flex items-center">
                       <span className="orbitron text-[10px] font-bold text-magenta-400/60">{record.ttl}</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${record.status === 'resolved' ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : record.status === 'propagating' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`} />
                          <span className={`text-[8px] font-bold uppercase tracking-tighter ${record.status === 'resolved' ? 'text-emerald-400' : record.status === 'propagating' ? 'text-yellow-400' : 'text-red-400'}`}>{record.status}</span>
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

      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[3rem] flex items-center justify-between group shadow-inner relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-2 relative z-10">
            <span className="orbitron text-[9px] font-bold text-cyan-400/60 uppercase tracking-widest flex items-center gap-2">
               <ShieldCheck size={14} /> Propagation Assurance
            </span>
            <p className="text-[10px] text-white/50 italic leading-relaxed font-serif max-w-2xl">
               "Byzantium DNA propagation ensures that host resolution is not localized. Once a host is deployed, its field signature is entangled across the planetary mesh within 1.618 seconds."
            </p>
         </div>
         <div className="p-6 bg-white/5 rounded-[2rem] group-hover:rotate-12 transition-transform duration-500">
            <Wifi size={24} className="text-cyan-500" />
         </div>
      </div>
    </div>
  );
};

export default DNSResolverTerminal;
