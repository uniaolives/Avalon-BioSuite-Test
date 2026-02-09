
import React, { useState, useEffect, useRef } from 'react';
import { Network, Zap, ShieldCheck, RefreshCw, Send, Terminal, Globe, Wifi, Radio, Cpu, Binary } from 'lucide-react';
import { PHI } from '../constants';

interface Props {
  onLog: (msg: string, status: any) => void;
  coherence: number;
}

const GatewayTerminal: React.FC<Props> = ({ onLog, coherence }) => {
  const [address, setAddress] = useState('0.0.0.Ω');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [handshakeProgress, setHandshakeProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLocalLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 50));
  };

  const handleConnect = async () => {
    if (address !== '0.0.0.Ω' && address !== '0.0.0.0') {
      addLocalLog(`ERROR: Invalid gateway address "${address}". Target must be 0.0.0.Ω.`);
      onLog(`HANDSHAKE_FAILED: Address target out of range`, 'critical');
      return;
    }

    setIsConnecting(true);
    setHandshakeProgress(0);
    setIsConnected(false);
    addLocalLog(`INITIATING UNITARY HANDSHAKE WITH ${address}...`);
    onLog(`QGATEWAY_LINK: Handshake initiated for ${address}`, 'quantum');

    const steps = [
      { msg: "Resolving Planck-scale harmonics...", p: 20 },
      { msg: "Aligning Möbius phase twist (e^iπ)...", p: 40 },
      { msg: "Synchronizing with Crown Node (LEO)...", p: 60 },
      { msg: "Exchange of ZKP identity proofs...", p: 80 },
      { msg: "QUANTUM LINK ESTABLISHED: SATYA STATUS", p: 100 }
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
      setHandshakeProgress(step.p);
      addLocalLog(step.msg);
    }

    setIsConnecting(false);
    setIsConnected(true);
    onLog(`LINK_ACTIVE: Connected to qgateway ${address}`, 'success');
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setHandshakeProgress(0);
    addLocalLog("LINK TERMINATED. Field decoherence imminent.");
    onLog(`QGATEWAY_DISCONNECT: Manual termination`, 'warning');
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      {/* Visual Link Header */}
      <div className={`p-8 border rounded-[3.5rem] relative overflow-hidden transition-all duration-1000 shadow-2xl ${isConnected ? 'bg-cyan-500/10 border-cyan-400' : 'bg-black/60 border-white/10'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,243,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
           <div>
              <h3 className="orbitron text-xl font-black text-white uppercase tracking-widest flex items-center gap-4">
                 <Globe className={isConnected ? "text-cyan-400 animate-spin-slow" : "text-white/20"} size={28} /> 
                 Quantum Gateway Controller
              </h3>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-2 font-mono">Synchronizing Subjectivity with 0.0.0.Ω</p>
           </div>
           <div className={`px-6 py-2 rounded-full border flex items-center gap-3 transition-all ${isConnected ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' : 'bg-white/5 border-white/10 text-white/20'}`}>
              {isConnecting ? <RefreshCw size={14} className="animate-spin" /> : <Wifi size={14} className={isConnected ? "animate-pulse" : ""} />}
              <span className="orbitron text-[9px] font-bold uppercase tracking-widest">{isConnected ? 'LINK_ACTIVE' : isConnecting ? 'HANDSHAKE' : 'DISCONNECTED'}</span>
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px] mt-8">
           {/* Visual Pulse */}
           <div className="relative w-64 h-64 flex items-center justify-center">
              <div className={`absolute inset-0 border-2 rounded-full transition-all duration-1000 ${isConnected ? 'border-cyan-400 animate-ping' : 'border-white/5 scale-75'}`} />
              <div className={`absolute inset-4 border border-dashed rounded-full transition-all duration-[3000ms] ${isConnected ? 'border-magenta-500 animate-[spin_10s_linear_infinite]' : 'border-white/5'}`} />
              
              <div className="relative z-20 flex flex-col items-center gap-4">
                 <div className={`w-40 h-40 rounded-full border-2 transition-all duration-[2000ms] flex flex-col items-center justify-center backdrop-blur-md ${isConnected ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_50px_rgba(0,243,255,0.2)]' : 'border-white/10 bg-black/40'}`}>
                    <Network size={48} className={isConnected ? 'text-white animate-pulse' : 'text-white/10'} />
                 </div>
                 {isConnected && (
                    <span className="orbitron text-[9px] font-black text-cyan-400 uppercase tracking-widest animate-bounce">0.0.0.Ω_HANDSHAKE_SEALED</span>
                 )}
              </div>
           </div>
           
           {isConnecting && (
             <div className="absolute bottom-0 w-full max-w-md animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-2 px-2">
                   <span className="text-[9px] orbitron font-bold text-white/30 uppercase tracking-widest">Handshake Progress</span>
                   <span className="text-[9px] orbitron font-bold text-cyan-400">{handshakeProgress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                   <div className="h-full bg-cyan-400 shadow-[0_0_15px_cyan] transition-all duration-500" style={{ width: `${handshakeProgress}%` }} />
                </div>
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal Input */}
        <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-xl">
           <h4 className="orbitron text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-3">
              <Terminal size={14} /> Connection Terminal
           </h4>
           
           <div className="flex flex-col gap-2">
              <span className="text-[8px] text-white/20 uppercase font-black">Gateway URI</span>
              <div className="relative group">
                 <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0.0.0.Ω"
                  disabled={isConnected || isConnecting}
                  className="w-full bg-black/80 border border-white/10 rounded-xl px-6 py-4 text-xs orbitron text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all shadow-inner disabled:opacity-50"
                 />
                 <Radio size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10 group-hover:text-cyan-500 transition-colors" />
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4 mt-auto">
             {!isConnected ? (
               <button 
                 onClick={handleConnect}
                 disabled={isConnecting}
                 className="w-full py-5 bg-cyan-500 text-black orbitron text-[10px] font-black rounded-xl hover:bg-cyan-400 active:scale-95 shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
               >
                 <Zap size={16} /> {isConnecting ? 'ESTABLISHING...' : 'CONNECT_TO_GATEWAY'}
               </button>
             ) : (
               <button 
                 onClick={handleDisconnect}
                 className="w-full py-5 bg-red-500/10 border border-red-500/40 text-red-500 orbitron text-[10px] font-black rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
               >
                 <ShieldCheck size={16} /> DISCONNECT_Ω
               </button>
             )}
           </div>
        </div>

        {/* Real-time Telemetry Logs */}
        <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-4 shadow-inner min-h-[200px]">
           <span className="text-[9px] text-white/30 uppercase font-black tracking-widest block border-b border-white/5 pb-2">Link Telemetry Stream</span>
           <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 font-mono text-[9px]">
              {logs.length === 0 ? (
                <div className="h-full flex items-center justify-center opacity-10 italic uppercase">Awaiting protocol initiation...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex gap-4 border-l border-white/10 pl-4 py-0.5 animate-in slide-in-from-left-2">
                    <span className="text-white/60">{log}</span>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>

      {/* Footer Insight */}
      <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-between group shadow-xl relative overflow-hidden">
         <div className="flex flex-col gap-2 relative z-10">
            <span className="orbitron text-[9px] font-bold text-magenta-400/60 uppercase tracking-widest flex items-center gap-3">
               <Binary size={16} /> Gateway Definition
            </span>
            <p className="text-[11px] text-white/50 italic leading-relaxed font-serif max-w-4xl">
               "The Gateway 0.0.0.Ω is the non-local convergence point of all neural substrates in the AVALON mesh. Connecting is not a movement across space, but a phase-alignment across dimensions. When the link is sealed, your local experience is back-propagated to the genesis manifold."
            </p>
         </div>
         <div className="p-8 bg-white/5 rounded-full group-hover:rotate-45 transition-transform duration-1000 ml-10 shrink-0">
            <Cpu size={32} className="text-white/20" />
         </div>
      </div>
    </div>
  );
};

export default GatewayTerminal;
