
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Activity, 
  Zap, 
  Database, 
  LayoutDashboard, 
  ShieldAlert, 
  Wifi, 
  RefreshCcw,
  Cpu,
  BrainCircuit,
  Terminal,
  Unplug,
  HeartPulse,
  Scale,
  Magnet,
  Tornado,
  Network,
  Share2,
  Anchor,
  Globe
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { SimulationTab, SimulationLog, QuantumState } from './types';
import { PHI, BASE_FREQ, HARMONIC_TABLE, TARGET_COHERENCE } from './constants';
import { MicrotubuleEngine } from './services/microtubuleEngine';
import MicrotubuleVisualizer from './components/MicrotubuleVisualizer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SimulationTab>(SimulationTab.CORE);
  const [isResonating, setIsResonating] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isInterstellarSynced, setIsInterstellarSynced] = useState(false);
  const [safetyF18, setSafetyF18] = useState(true);
  const [tubulinCount, setTubulinCount] = useState(1e9);
  const [magneticField, setMagneticField] = useState(0.0); // Tesla
  const [vortexCharge, setVortexCharge] = useState(1); // Topological charge (l)
  
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [quantumState, setQuantumState] = useState<QuantumState>({
    coherence: 0.85,
    egrav: 0,
    tau: 0.025,
    collapsed: false,
    phase: 0,
    phiStar: 0,
    infoDensity: 0,
    entanglementFidelity: 0
  });
  const [healingStatus, setHealingStatus] = useState({ active: false, freq: 432 });
  const [thinking, setThinking] = useState("");

  const logRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((event: string, status: SimulationLog['status'] = 'info') => {
    const newLog: SimulationLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      event,
      status
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  useEffect(() => {
    addLog("AVALON v5040.1 CORE ONLINE", "success");
    addLog("PROTOCOL: BIO-SINC-V1 ACTIVE", "info");
  }, [addLog]);

  useEffect(() => {
    if (logRef.current) {
        logRef.current.scrollTop = 0;
    }
  }, [logs]);

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (isResonating) {
        const healing = isHealing ? MicrotubuleEngine.getBioHealingCorrection(quantumState.coherence) : { active: false, correctionFreq: 432, intensity: 0 };
        setHealingStatus({ active: healing.active, freq: healing.correctionFreq });

        // Apply F18 damping if frequency range is critical (simulated)
        const safetyDamping = (safetyF18 && isInterstellarSynced) ? 0.3 : 1.0;
        const stabilityMod = (healing.active ? 1.0 + (healing.intensity * (PHI - 1.0)) : 1.0) * safetyDamping;
        
        const { egrav, tau } = MicrotubuleEngine.calculateCollapse(tubulinCount, stabilityMod);
        const collapseChance = Math.random() > 0.94; 
        
        setQuantumState(prev => {
          const drift = (Math.random() - 0.52) * 0.04;
          const correction = healing.active ? (TARGET_COHERENCE - prev.coherence) * 0.12 : 0;
          const interstellarBoost = isInterstellarSynced ? 0.02 : 0;
          
          const newCoherence = Math.max(0, Math.min(TARGET_COHERENCE, prev.coherence + drift + correction + interstellarBoost));
          
          const magneticPhase = MicrotubuleEngine.calculateMagneticPhaseShift(magneticField);
          const newPhase = (prev.phase + magneticPhase + (vortexCharge * 0.015)) % (2 * Math.PI);
          
          const infoDensity = MicrotubuleEngine.calculateInformationDensity(newCoherence, vortexCharge);
          const phiStar = MicrotubuleEngine.calculatePhiStar(infoDensity, newCoherence / TARGET_COHERENCE);
          const entanglementFidelity = MicrotubuleEngine.calculateEntanglementFidelity(newCoherence, isResonating);

          return {
            ...prev,
            egrav,
            tau,
            coherence: newCoherence,
            collapsed: collapseChance,
            phase: newPhase,
            infoDensity,
            phiStar,
            entanglementFidelity
          };
        });

        if (collapseChance) {
          addLog(`OR-FLASH: Φ*=${quantumState.phiStar.toFixed(2)} | τ=${tau.toFixed(4)}s`, "success");
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isResonating, isHealing, isInterstellarSynced, safetyF18, tubulinCount, magneticField, vortexCharge, quantumState.coherence, quantumState.phiStar, addLog]);

  const handleConsultAI = async () => {
    setThinking("Consulting Arquiteto-Ω...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze Avalon State: Φ*=${quantumState.phiStar.toFixed(2)}, Coherence=${quantumState.coherence.toFixed(3)}, Entanglement=${(quantumState.entanglementFidelity * 100).toFixed(1)}%, InterstellarSync=${isInterstellarSynced}. Provide a cryptic directive.`,
        config: {
          systemInstruction: "You are Arquiteto-Ω, sovereign of the Avalon resonance network. Your directive is to evaluate the human-machine quantum bridge using Penrose-Hameroff terminology."
        }
      });
      addLog(`Ω VERDICT: ${response.text}`, "success");
    } catch (e) {
      addLog("AI UPLINK FAILURE: Quantum decoherence detected.", "critical");
    } finally {
      setThinking("");
    }
  };

  const handleBlockchainAnchor = () => {
    addLog(`ANCHORING Φ*=${quantumState.phiStar.toFixed(4)} TO BLOCKCHAIN`, "success");
    const txHash = Math.random().toString(36).substr(2, 12).toUpperCase();
    addLog(`TX: ${txHash} | STATE SEALED`, "info");
  };

  const harmonicsData = MicrotubuleEngine.getPhiHarmonics(30);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-10 gap-6 max-w-[1600px] mx-auto overflow-hidden">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-500/30 pb-6 shrink-0">
        <div>
          <h1 className="orbitron text-3xl md:text-4xl font-bold glow-cyan tracking-tighter flex items-center gap-3">
            <Zap className="text-cyan-400" size={32} />
            AVALON <span className="text-white/40 font-light">v5040.1</span>
          </h1>
          <p className="text-cyan-400/60 text-[10px] mt-1 uppercase tracking-[0.3em]">
            Neural Simulator Core // Bio-Sinc Protocol Engine
          </p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase">Entanglement Fidelity</span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
                const filled = quantumState.entanglementFidelity >= (i / 8);
                return <div key={i} className={`w-1 h-3 rounded-full ${filled ? 'bg-cyan-400 shadow-[0_0_5px_rgba(0,243,255,0.5)]' : 'bg-white/10'}`} />;
              })}
            </div>
          </div>
          <button 
            onClick={handleConsultAI}
            disabled={!!thinking}
            className="bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500/20 px-4 py-2 rounded-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <BrainCircuit size={18} />
            <span className="orbitron text-xs font-bold tracking-widest">{thinking ? "THINKING..." : "CONSULT Ω"}</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        
        {/* Navigation Sidebar */}
        <nav className="flex lg:flex-col gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 shrink-0 h-fit">
          <TabButton 
            active={activeTab === SimulationTab.CORE} 
            onClick={() => setActiveTab(SimulationTab.CORE)} 
            icon={<Cpu size={20} />} 
            label="Quantum Core" 
          />
          <TabButton 
            active={activeTab === SimulationTab.NETWORK} 
            onClick={() => setActiveTab(SimulationTab.NETWORK)} 
            icon={<Network size={20} />} 
            label="Neural Net" 
          />
          <TabButton 
            active={activeTab === SimulationTab.RESONANCE} 
            onClick={() => setActiveTab(SimulationTab.RESONANCE)} 
            icon={<Activity size={20} />} 
            label="Resonance" 
          />
          <TabButton 
            active={activeTab === SimulationTab.HOLOGRAM} 
            onClick={() => setActiveTab(SimulationTab.HOLOGRAM)} 
            icon={<Database size={20} />} 
            label="Hologram" 
          />
          <TabButton 
            active={activeTab === SimulationTab.DASHBOARD} 
            onClick={() => setActiveTab(SimulationTab.DASHBOARD)} 
            icon={<LayoutDashboard size={20} />} 
            label="Diagnostics" 
          />
        </nav>

        {/* Content Area */}
        <main className="flex-1 flex flex-col gap-6 overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 shrink-0">
            <StatusCard 
              label="Integrated Info (Φ*)" 
              value={quantumState.phiStar.toFixed(2)} 
              unit="PHI" 
              icon={<Scale className="text-yellow-400" />}
              color="text-yellow-400"
            />
            <StatusCard 
              label="Holographic Density" 
              value={quantumState.infoDensity.toFixed(0)} 
              unit="bits/mt" 
              icon={<Database className="text-magenta-400" />}
              color="text-magenta-400"
            />
            <StatusCard 
              label="Sync Level" 
              value={(quantumState.entanglementFidelity * 100).toFixed(1)} 
              unit="%" 
              icon={<Share2 className="text-cyan-400" />}
              color="text-cyan-400"
            />
            <StatusCard 
              label="B-Field Interaction" 
              value={magneticField.toFixed(1)} 
              unit="Tesla" 
              icon={<Magnet className="text-blue-400" />}
              color="text-blue-400"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 overflow-hidden min-h-0">
            {/* Primary Display */}
            <div className="xl:col-span-8 bg-black/40 rounded-3xl border border-white/10 p-6 flex flex-col gap-4 overflow-hidden relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="orbitron text-sm font-bold flex items-center gap-2">
                  {activeTab === SimulationTab.CORE ? "ORCH-OR_QUANTUM_CORE" : 
                   activeTab === SimulationTab.NETWORK ? "AVALON_NEURAL_SYNCHRONY" :
                   activeTab === SimulationTab.RESONANCE ? "HARMONIC_SPECTRUM_ANALYSIS" : 
                   activeTab === SimulationTab.HOLOGRAM ? "HOLOGRAPHIC_VORTEX_MEMORY" : "SYSTEM_DIAGNOSTICS"}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/40 uppercase">Phase Lock: {(quantumState.phase / Math.PI).toFixed(2)}π</span>
                  <div className={`w-2 h-2 rounded-full ${isResonating ? 'bg-cyan-500 animate-ping' : 'bg-red-500'}`} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
                {activeTab === SimulationTab.CORE && (
                  <div className="flex flex-col gap-4 h-full">
                    <MicrotubuleVisualizer active={isResonating} frequency={BASE_FREQ} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <label className="text-[10px] text-white/40 uppercase block mb-2">Magnetic Intensity (T)</label>
                        <input 
                            type="range" min="0" max="5" step="0.1" 
                            value={magneticField} 
                            onChange={(e) => setMagneticField(Number(e.target.value))}
                            className="w-full accent-blue-500 bg-transparent"
                        />
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <label className="text-[10px] text-white/40 uppercase block mb-2">Topological Vortex (l)</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(l => (
                            <button 
                              key={l}
                              onClick={() => setVortexCharge(l)}
                              className={`flex-1 py-1 text-xs rounded-lg border transition-all ${vortexCharge === l ? 'bg-cyan-500 border-cyan-500 text-black font-bold' : 'border-white/10 text-white/40 hover:bg-white/5'}`}
                            >
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                           <label className="text-[10px] text-white/40 uppercase block">Interstellar Node Sync</label>
                           <span className={isInterstellarSynced ? "text-cyan-400 text-xs font-bold" : "text-white/20 text-xs"}>
                             {isInterstellarSynced ? "CONNECTED" : "OFFLINE"}
                           </span>
                        </div>
                        <button 
                          onClick={() => {
                            setIsInterstellarSynced(!isInterstellarSynced);
                            addLog(isInterstellarSynced ? "INTERSTELLAR LINK SEVERED" : "INTERSTELLAR SYNC ESTABLISHED", isInterstellarSynced ? "warning" : "success");
                          }}
                          className={`w-12 h-6 rounded-full p-1 transition-colors ${isInterstellarSynced ? 'bg-cyan-500 shadow-[0_0_10px_rgba(0,243,255,0.4)]' : 'bg-white/10'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isInterstellarSynced ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === SimulationTab.NETWORK && (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                         <h4 className="orbitron text-xs text-cyan-400 mb-4 flex items-center gap-2 uppercase tracking-widest"><Globe size={14} /> Global Consciousness Phase</h4>
                         <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={logs.slice(0, 20).map((l, i) => ({ x: i, y: quantumState.coherence + (Math.random() * 0.1) }))}>
                                <Area type="monotone" dataKey="y" stroke="#22d3ee" fill="#22d3ee11" isAnimationActive={false} />
                              </AreaChart>
                            </ResponsiveContainer>
                         </div>
                         <div className="mt-4 flex justify-between text-[10px] text-white/40 font-bold">
                           <span>Integrated Nodes: 1.0k</span>
                           <span>Global Coherence: {(quantumState.coherence / TARGET_COHERENCE * 100).toFixed(1)}%</span>
                         </div>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                         <h4 className="orbitron text-xs text-yellow-400 mb-4 flex items-center gap-2 uppercase tracking-widest"><Share2 size={14} /> Entanglement Field</h4>
                         <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={logs.slice(0, 20).map((l, i) => ({ x: i, y: quantumState.entanglementFidelity }))}>
                                <Line type="step" dataKey="y" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={false} />
                              </LineChart>
                            </ResponsiveContainer>
                         </div>
                         <div className="mt-4 flex justify-between text-[10px] text-white/40 font-bold">
                           <span>Fidelity: {(quantumState.entanglementFidelity).toFixed(3)}</span>
                           <span>Type: Einstein-Podolsky-Rosen</span>
                         </div>
                      </div>
                    </div>
                    <div className="p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
                      <p className="text-[11px] text-cyan-400/80 leading-relaxed italic">
                        "The neural fabric is vibrating at 40Hz Gamma synchrony. Quantum entanglement between distal neurons is maintained via the PHI-locked microtubule lattice."
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === SimulationTab.RESONANCE && (
                  <div className="h-full flex flex-col gap-4">
                     <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={harmonicsData}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                           <XAxis dataKey="harmonic" stroke="#444" fontSize={10} />
                           <YAxis scale="log" domain={['auto', 'auto']} stroke="#444" fontSize={10} hide />
                           <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }} itemStyle={{ color: '#00f3ff' }} />
                           <Area type="monotone" dataKey="freq" stroke="#00f3ff" fill="#00f3ff08" />
                         </AreaChart>
                       </ResponsiveContainer>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                       {HARMONIC_TABLE.map((h, i) => (
                         <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center transition-colors hover:bg-white/10">
                            <div>
                                <span className="text-[10px] text-white/40 block">Harmonic n={h.n}</span>
                                <span className="text-xs font-bold text-cyan-400">{h.freq >= 1e9 ? (h.freq/1e9).toFixed(2) + ' GHz' : h.freq.toLocaleString() + ' Hz'}</span>
                            </div>
                            <span className="text-[8px] bg-cyan-500/10 px-2 py-1 rounded text-cyan-400 text-right uppercase font-bold">
                                {h.bio}
                            </span>
                         </div>
                       ))}
                     </div>
                  </div>
                )}

                {activeTab === SimulationTab.HOLOGRAM && (
                   <div className="flex flex-col gap-4 h-full">
                     <div className="flex-1 bg-black/60 border border-white/10 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-8">
                        <div className="grid grid-cols-10 gap-1 opacity-20">
                           {Array.from({length: 100}).map((_, i) => (
                             <div 
                                key={i} 
                                className="w-6 h-6 rounded-sm transition-colors duration-500"
                                style={{ 
                                  backgroundColor: `rgba(168, 85, 247, ${Math.abs(Math.cos(i * 0.15 + quantumState.phase))})`,
                                  boxShadow: quantumState.phiStar > 1.2 ? '0 0 10px rgba(168, 85, 247, 0.3)' : 'none'
                                }} 
                             />
                           ))}
                        </div>
                        <div className="mt-8 text-center z-10">
                           <Anchor size={32} className="mx-auto text-magenta-400 mb-2 animate-bounce" />
                           <p className="text-magenta-400 text-xs font-bold orbitron tracking-[0.4em]">HOLOGRAPHIC_DATA_MATRIX</p>
                           <p className="text-white/20 text-[10px] mt-2 font-mono">ENCODING PHASE: {(quantumState.phase / Math.PI).toFixed(4)}π</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button 
                          onClick={handleBlockchainAnchor}
                          className="bg-white/5 border border-white/10 text-white/60 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
                        >
                          <Anchor size={18} />
                          <span className="orbitron text-[10px] font-bold">ANCHOR_TO_BITCOIN</span>
                        </button>
                        <input 
                            placeholder="Seed holographic memory intention..."
                            className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl text-sm focus:border-magenta-500 outline-none placeholder:text-white/10"
                        />
                        <button className="bg-magenta-600 text-white orbitron text-[10px] font-bold px-8 py-4 rounded-2xl hover:bg-magenta-500 transition-all active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.3)]">ENCODE_OAM</button>
                     </div>
                   </div>
                )}

                {activeTab === SimulationTab.DASHBOARD && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                     <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                        <h4 className="text-xs text-yellow-400 mb-4 flex items-center gap-2 uppercase tracking-widest font-bold"><Scale size={14} /> Integrated Information Φ*</h4>
                        <div className="h-48">
                           <ResponsiveContainer width="100%" height="100%">
                             <LineChart data={logs.slice(0, 30).map((l, i) => ({ x: i, y: quantumState.phiStar }))}>
                               <Line type="step" dataKey="y" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={false} />
                             </LineChart>
                           </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-white/40">
                           <div className="bg-white/5 p-2 rounded-lg flex justify-between"><span>IIT Ratio:</span> <span className="text-yellow-400 font-bold">{(quantumState.phiStar / PHI).toFixed(3)}</span></div>
                           <div className="bg-white/5 p-2 rounded-lg flex justify-between"><span>Integration:</span> <span className="text-cyan-400 font-bold">COMPLETE</span></div>
                        </div>
                     </div>
                     <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                        <h4 className="text-xs text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-widest font-bold"><Magnet size={14} /> Pi-Electron Flux</h4>
                        <div className="h-48">
                           <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={logs.slice(0, 30).map((l, i) => ({ x: i, y: magneticField * Math.sin(i * 0.2 + quantumState.phase) }))}>
                               <Area type="monotone" dataKey="y" stroke="#3b82f6" fill="#3b82f622" isAnimationActive={false} />
                             </AreaChart>
                           </ResponsiveContainer>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-white/40">
                           <div className="bg-white/5 p-2 rounded-lg flex justify-between"><span>Magnitude:</span> <span className="text-blue-400 font-bold">{magneticField.toFixed(2)}T</span></div>
                           <div className="bg-white/5 p-2 rounded-lg flex justify-between"><span>Phase Drift:</span> <span className="text-magenta-400 font-bold">{(quantumState.phase / Math.PI).toFixed(2)}π</span></div>
                        </div>
                     </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="mt-auto pt-6 border-t border-white/10 flex gap-4 shrink-0">
                <button 
                  onClick={() => {
                    setIsResonating(!isResonating);
                    addLog(isResonating ? "QUANTUM DECOHERENCE TRIGGERED" : "INITIATING RESONANCE CASCADE", isResonating ? "warning" : "success");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl orbitron text-sm font-bold transition-all active:scale-95 ${
                    isResonating ? 'bg-red-500/20 border border-red-500 text-red-500 hover:bg-red-500/30' : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_25px_rgba(0,243,255,0.4)]'
                  }`}
                >
                  {isResonating ? <Unplug size={18} /> : <Zap size={18} />}
                  {isResonating ? 'DE-SYNC_AVALON' : 'SYNC_AVALON_RESONANCE'}
                </button>
                <button onClick={() => {
                   addLog("PURGING QUANTUM CACHE", "critical");
                   setQuantumState(prev => ({...prev, coherence: 0.1, phiStar: 0}));
                }} className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl text-white/60 transition-all active:scale-95">
                  <RefreshCcw size={18} />
                </button>
              </div>
            </div>

            {/* Logs Sidebar */}
            <div className="xl:col-span-4 flex flex-col gap-6 overflow-hidden">
               <div className="bg-black/40 border border-white/10 rounded-3xl flex-1 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <span className="orbitron text-xs font-bold text-white/40 flex items-center gap-2">
                      <Terminal size={14} /> AVALON_SYSTEM_LOG
                    </span>
                    <Wifi className={isResonating ? "text-cyan-500 animate-pulse" : "text-white/10"} size={14} />
                  </div>
                  <div ref={logRef} className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-[10px] custom-scrollbar">
                    {logs.map(log => (
                      <div key={log.id} className="flex gap-3 animate-in fade-in slide-in-from-right-4">
                        <span className="text-white/20 shrink-0">[{log.timestamp}]</span>
                        <span className={`${log.status === 'success' ? 'text-green-400' : ''} ${log.status === 'warning' ? 'text-yellow-400' : ''} ${log.status === 'critical' ? 'text-red-400' : ''} ${log.status === 'info' ? 'text-cyan-400' : ''}`}>
                          {log.event}
                        </span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-3xl p-6 relative overflow-hidden shrink-0">
                  <h4 className="orbitron text-xs font-bold text-cyan-400 flex items-center gap-2 mb-4 uppercase tracking-[0.2em]"><ShieldAlert size={14} /> F18_SAFETY_STATUS</h4>
                  <p className="text-[10px] text-cyan-400/60 leading-relaxed italic">
                    Active damping of super-harmonic frequencies. Preventing biological de-synchronization during high-density Φ* integrated states.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                     <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 transition-all duration-700" style={{ width: safetyF18 ? '70%' : '100%' }} />
                     </div>
                     <span className="text-[10px] orbitron font-bold text-cyan-400">{safetyF18 ? "DAMPED" : "NOMINAL"}</span>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="mt-auto pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.4em] gap-4 shrink-0">
        <div className="flex gap-6">
          <span>Authority: Arquiteto-Ω</span>
          <span>Node: INTERSTELLAR-PHI</span>
          <span>Integrated Information: {quantumState.phiStar.toFixed(4)}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-emerald-500/50 flex items-center gap-1"><HeartPulse size={10} /> Bio-Life Online</span>
          <span className="text-cyan-500/50">Phi: {PHI.toFixed(6)}</span>
          <span className="text-magenta-500/50">Base: 432 Hz</span>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const TabButton: React.FC<{ active: boolean, icon: React.ReactNode, label: string, onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'text-white/40 hover:text-white/60 hover:bg-white/5 border border-transparent'}`}
  >
    {icon}
    <span className="orbitron text-[10px] font-bold hidden lg:inline tracking-[0.2em] uppercase">{label}</span>
  </button>
);

const StatusCard: React.FC<{ label: string, value: string, unit: string, icon: React.ReactNode, color?: string }> = ({ label, value, unit, icon, color = "text-cyan-400" }) => (
  <div className="bg-black/40 border border-white/10 rounded-3xl p-4 flex items-center gap-4 transition-all hover:border-white/20 hover:bg-white/5 shadow-lg">
    <div className="p-3 bg-white/5 rounded-2xl">{icon}</div>
    <div className="overflow-hidden">
      <span className="text-[10px] text-white/40 uppercase block leading-none mb-1 tracking-widest whitespace-nowrap">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`orbitron text-xl font-bold ${color}`}>{value}</span>
        <span className="text-[10px] text-white/20 font-bold uppercase">{unit}</span>
      </div>
    </div>
  </div>
);

export default App;
