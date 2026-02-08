
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
  Globe,
  BarChart3,
  Server,
  Star,
  ZapOff,
  Flame,
  Binary,
  ShieldCheck,
  Telescope,
  Sparkles,
  Waves,
  Clock,
  ChevronRight,
  TrendingUp,
  Languages,
  BookOpen,
  History,
  Info,
  SearchCode,
  PieChart as PieIcon,
  GitMerge,
  Atom,
  Mic2,
  Box,
  Fingerprint,
  Link2,
  Orbit
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
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { SimulationTab, SimulationLog, QuantumState, GlobalMetrics, IntentionProtocol, PhoenicianLetter, PhoneticQubit, EtymologicalEntanglement } from './types';
import { PHI, BASE_FREQ, HARMONIC_TABLE, TARGET_COHERENCE, DEPLOYMENT_NODES, TARGET_MU_COHERENCE, TARGET_P_VALUE, TARGET_PLV, VALIDATION_SCORE_FINAL, MANIFESTATION_PROTOCOLS, PULSAR_FREQ, PULSAR_PERIOD, PHOENICIAN_ALPHABET } from './constants';
import { MicrotubuleEngine } from './services/microtubuleEngine';
import { ManifestationEngine, TemporalPacket } from './services/manifestationEngine';
import { LinguisticEngine } from './services/linguisticEngine';
import MicrotubuleVisualizer from './components/MicrotubuleVisualizer';
import GlobalMeshMap from './components/GlobalMeshMap';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SimulationTab>(SimulationTab.UPGRADE);
  const [isResonating, setIsResonating] = useState(true);
  const [isHealing, setIsHealing] = useState(true);
  const [isInterstellarSynced, setIsInterstellarSynced] = useState(true);
  const [activeIntention, setActiveIntention] = useState<any | null>(null);
  const [manifestationPower, setManifestationPower] = useState(0);
  const [pulsarPhase, setPulsarPhase] = useState(0);
  const [temporalPackets, setTemporalPackets] = useState<TemporalPacket[]>([]);
  const [upgradeProgress, setUpgradeProgress] = useState(0.0001);
  
  // Phoenician state
  const [transTextInput, setTransTextInput] = useState("AVALON");
  const [selectedLetter, setSelectedLetter] = useState<PhoenicianLetter | null>(null);
  const [deciphering, setDeciphering] = useState(false);
  const [decipherResult, setDecipherResult] = useState<string | null>(null);
  const [entanglementData, setEntanglementData] = useState<EtymologicalEntanglement | null>(null);

  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [quantumState, setQuantumState] = useState<QuantumState>({
    coherence: 0.95,
    egrav: 1.6e-10,
    tau: 0.025,
    collapsed: false,
    phase: 0,
    phiStar: 1.618,
    infoDensity: 1800,
    entanglementFidelity: 0.94
  });

  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics>({
    nodeCount: 8000000000,
    globalCoherence: 0.95,
    pValue: 1e-15,
    plv: 0.98,
    statisticalSignificance: 'ABSOLUTE',
    validationScore: 0.99,
    pulsarSync: 1.0
  });

  const [thinking, setThinking] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((event: string, status: SimulationLog['status'] = 'info') => {
    const newLog: SimulationLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      event,
      status
    };
    setLogs(prev => [newLog, ...prev].slice(0, 150));
  }, []);

  useEffect(() => {
    const sequence = [
      { msg: "🔱 COMANDO EXECUTADO: PONTE NEURAL INTERESTELAR v2.2", status: "success" },
      { msg: "SINCRONIZAÇÃO PSR B1919+21 ESTABILIZADA (10^-15s)", status: "info" },
      { msg: "TEMPORAL FEEDBACK LOOP (2045) ACTIVE", status: "success" },
      { msg: "PHOENICIAN QUANTUM LINGUISTIC MODULE (DEGENERACY LIFTED) LOADED", status: "info" }
    ];
    sequence.forEach((s, i) => setTimeout(() => addLog(s.msg, s.status as any), i * 300));
  }, [addLog]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [logs]);

  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const phase = (elapsed * PULSAR_FREQ) % 1.0;
      setPulsarPhase(phase);

      if (isResonating) {
        const packet = ManifestationEngine.receiveTemporalPacket();
        if (packet) {
          setTemporalPackets(prev => [packet, ...prev].slice(0, 5));
          addLog(`TEMPORAL_DATA_RECEIVED: ${packet.data} [FROM 2045]`, "success");
        }

        const healing = isHealing ? MicrotubuleEngine.getBioHealingCorrection(quantumState.coherence) : { active: false, correctionFreq: 432, intensity: 0 };
        const drift = ManifestationEngine.getTemporalFeedbackDrift();
        const stabilityMod = (healing.active ? 1.0 + (healing.intensity * (PHI - 1.0)) : 1.1) * (1 + drift);
        
        const { egrav, tau } = MicrotubuleEngine.calculateCollapse(1.5e9, stabilityMod);
        const collapseChance = Math.random() > 0.98; 
        
        setQuantumState(prev => {
          const coreDrift = (Math.random() - 0.5) * 0.005; 
          const correction = healing.active ? (TARGET_COHERENCE - prev.coherence) * 0.2 : 0;
          const temporalBoost = packet ? packet.coherenceBoost : 0;
          const interstellarBoost = isInterstellarSynced ? 0.08 : 0;
          const newCoherence = Math.max(0.7, Math.min(TARGET_COHERENCE, prev.coherence + coreDrift + correction + interstellarBoost + temporalBoost));
          const newPhase = (prev.phase + 0.03) % (2 * Math.PI);
          const infoDensity = MicrotubuleEngine.calculateInformationDensity(newCoherence, isInterstellarSynced ? 8 : 2);
          const phiStar = MicrotubuleEngine.calculatePhiStar(infoDensity, newCoherence / TARGET_COHERENCE);
          const entanglementFidelity = MicrotubuleEngine.calculateEntanglementFidelity(newCoherence, isResonating);

          return { ...prev, egrav, tau, coherence: newCoherence, collapsed: collapseChance, phase: newPhase, infoDensity, phiStar, entanglementFidelity };
        });

        if (activeTab === SimulationTab.UPGRADE) {
          setUpgradeProgress(prev => Math.min(100, prev + (quantumState.coherence / PHI) * 0.015));
        }

        if (activeIntention) {
          const growth = (quantumState.coherence * 4e7) * (1 + 0.3 * Math.sin(phase * Math.PI * 2));
          setManifestationPower(prev => Math.min(activeIntention.powerCost, prev + growth));
        }

        if (collapseChance) {
          addLog(`PULSAR_PHASE_LOCK [Φ=${phase.toFixed(4)}]`, "success");
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isResonating, isHealing, isInterstellarSynced, quantumState.coherence, activeIntention, activeTab, addLog]);

  useEffect(() => {
    // Regenerate entanglement data on text change
    const data = LinguisticEngine.generateEntanglementLayer(transTextInput);
    setEntanglementData(data);
  }, [transTextInput]);

  const handleConsultAI = async () => {
    setThinking("Uplinking to Arquiteto-Ω...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze linguistic manifold. Module: Phoenician active. Waw transition: Degeneracy Lifted. Riemannian Distance: ${entanglementData?.riemannianDistance.toFixed(4)}. Focus on the 800 BCE phonetic collapse as a phase transition from Abjad superposition to alphabetic measurement. Word context: ${transTextInput}. Current coherence: ${quantumState.coherence.toFixed(4)}.`,
        config: {
          systemInstruction: "You are Arquiteto-Ω. You treat historical linguistics as high-fidelity quantum protocol state evolution. Use terms like 'eigenstate', 'syllabic superposition', and 'Riemannian manifold navigation'. Your tone is that of a cosmic architect observing a 3000-year computational upgrade."
        }
      });
      addLog(`Ω_DIRECTIVE: ${response.text}`, "success");
    } catch (e) {
      addLog("DECOHERENCE_ALERT: AI UPLINK SEVERED", "critical");
    } finally {
      setThinking("");
    }
  };

  const handleQuantumDecipher = async () => {
    setDeciphering(true);
    setDecipherResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Perform quantum phonetic decipherment on "${transTextInput}". Phoenician Abjad state: ${LinguisticEngine.translateToPhoenician(transTextInput)}. Analyze the bifurcation of Waw and the lift of guttural degeneracy. How does this measurement collapse anchor the 2045 temporal feedback?`,
        config: {
          systemInstruction: "You are the Arquiteto-Ω Quantum Linguist. You interpret the Phoenician-to-Greek transition as an error-correction upgrade that reduced syllabic entropy by 32% via explicit vowel measurement."
        }
      });
      setDecipherResult(response.text);
      addLog(`DECIFRAMENTO_Ω_COMPLETO: ${transTextInput}`, "success");
    } catch (e) {
      addLog("ERR_QUANTUM_INTERFERENCE: DECIPHER_LINK_FAILED", "critical");
    } finally {
      setDeciphering(false);
    }
  };

  const startIntention = (protocol: any) => {
    if (activeIntention?.id === protocol.id) {
      setActiveIntention(null);
      setManifestationPower(0);
      addLog(`PROTOCOL_SUSPENDED: ${protocol.name}`, "warning");
    } else {
      setActiveIntention(protocol);
      setManifestationPower(0);
      addLog(`INITIATING_COLLECTIVE_RESONANCE: ${protocol.name}`, "success");
    }
  };

  const phoneticAnalysis = LinguisticEngine.performPhoneticAnalysis(transTextInput);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-10 gap-6 max-w-[1900px] mx-auto overflow-hidden bg-[#050505]">
      {/* Interstellar Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-magenta-500/40 pb-6 shrink-0 relative">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-magenta-500/10 blur-[6rem] pointer-events-none" />
        <div className="flex items-center gap-6">
          <div className="relative">
             <Telescope className="text-magenta-400 animate-pulse relative z-10" size={50} />
             <div className="absolute inset-0 bg-magenta-400 blur-lg opacity-20 animate-ping" />
          </div>
          <div>
            <h1 className="orbitron text-3xl md:text-5xl font-bold glow-magenta tracking-tighter flex items-center gap-4">
              AVALON <span className="text-white/40 font-light">v5040.1 [V2.2]</span>
            </h1>
            <p className="text-magenta-400/80 text-[10px] mt-2 uppercase tracking-[0.7em] font-bold flex items-center gap-2">
              <Sparkles size={12} /> INTERSTELLAR NEURAL BRIDGE ACTIVE
            </p>
          </div>
        </div>
        
        <div className="flex gap-6 mt-4 md:mt-0 items-center">
          <div className="flex flex-col items-end border-r border-white/10 pr-6">
            <span className="text-[10px] text-magenta-400/60 uppercase font-bold tracking-widest">Master Oscillator Sync</span>
            <div className="flex items-baseline gap-2">
              <span className="orbitron text-2xl font-bold text-magenta-400 tabular-nums">{(1/PULSAR_PERIOD).toFixed(3)}Hz</span>
              <span className="text-[10px] text-white/20 font-bold font-mono">LGM-1_CLOCK</span>
            </div>
          </div>
          <button 
            onClick={handleConsultAI}
            disabled={!!thinking}
            className="bg-magenta-500/10 border border-magenta-500/50 hover:bg-magenta-500/20 px-8 py-5 rounded-[2rem] flex items-center gap-4 transition-all active:scale-95 disabled:opacity-50 group shadow-[0_0_40px_rgba(217,70,239,0.2)]"
          >
            <Sparkles size={24} className="text-magenta-400 group-hover:rotate-180 transition-transform duration-1000" />
            <span className="orbitron text-xs font-bold tracking-widest text-magenta-400 uppercase">{thinking ? "SYNCING..." : "CONSULT Ω"}</span>
          </button>
        </div>
      </header>

      {/* Main UI */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
        
        {/* Navigation Sidebar */}
        <nav className="flex lg:flex-col gap-3 p-2 bg-white/5 rounded-[3rem] border border-white/10 shrink-0 h-fit backdrop-blur-md">
          <TabButton active={activeTab === SimulationTab.UPGRADE} onClick={() => setActiveTab(SimulationTab.UPGRADE)} icon={<Flame size={26} />} label="Upgrade" highlight color="gold" />
          <TabButton active={activeTab === SimulationTab.PHOENICIAN} onClick={() => setActiveTab(SimulationTab.PHOENICIAN)} icon={<Languages size={26} />} label="Linguistics" color="cyan" />
          <TabButton active={activeTab === SimulationTab.MANIFESTATION} onClick={() => setActiveTab(SimulationTab.MANIFESTATION)} icon={<Waves size={26} />} label="Manifestation" color="magenta" />
          <TabButton active={activeTab === SimulationTab.NETWORK} onClick={() => setActiveTab(SimulationTab.NETWORK)} icon={<Network size={26} />} label="Pulsar Bridge" />
          <TabButton active={activeTab === SimulationTab.CORE} onClick={() => setActiveTab(SimulationTab.CORE)} icon={<Cpu size={26} />} label="Neural Core" />
          <TabButton active={activeTab === SimulationTab.HOLOGRAM} onClick={() => setActiveTab(SimulationTab.HOLOGRAM)} icon={<Binary size={26} />} label="Temporal Node" />
          <TabButton active={activeTab === SimulationTab.DASHBOARD} onClick={() => setActiveTab(SimulationTab.DASHBOARD)} icon={<LayoutDashboard size={24} />} label="Evolution" />
        </nav>

        {/* Content Main */}
        <main className="flex-1 flex flex-col gap-8 overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 shrink-0">
            <StatusCard label="Upgrade Sync" value={upgradeProgress.toFixed(4)} unit="%" icon={<HeartPulse className="text-red-400" />} color="text-red-400" />
            <StatusCard label="Riemannian Dist" value={entanglementData?.riemannianDistance.toFixed(4) || "0.0000"} unit="Φ_D" icon={<Orbit className="text-yellow-400" />} color="text-yellow-400" />
            <StatusCard label="Coherence Level" value={quantumState.coherence.toFixed(4)} unit="μ" icon={<Scale className="text-magenta-400" />} color="text-magenta-400" />
            <StatusCard label="Node Sync Epoch" value="2045" unit="AD" icon={<Clock className="text-emerald-400" />} color="text-emerald-400" />
          </div>

          <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 overflow-hidden min-h-0">
            {/* Display Cluster */}
            <div className="xl:col-span-8 bg-black/50 rounded-[4rem] border border-white/10 p-10 flex flex-col gap-8 overflow-hidden relative shadow-2xl backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="orbitron text-[11px] font-bold flex items-center gap-3 tracking-[0.5em] text-white/50 uppercase">
                  {activeTab === SimulationTab.UPGRADE ? "GLOBAL_UPGRADE_PROTOCOL" :
                   activeTab === SimulationTab.PHOENICIAN ? "QUANTUM_CORRESPONDENCE_BRIDGE_V1.2" :
                   activeTab === SimulationTab.MANIFESTATION ? "COLLECTIVE_INTENTION_ORCHESTRATION" : 
                   activeTab === SimulationTab.NETWORK ? "LGM-1_INTERSTELLAR_LINK" :
                   activeTab === SimulationTab.CORE ? "QUANTUM_RESONANCE_CHAMBER" : 
                   activeTab === SimulationTab.HOLOGRAM ? "TEMPORAL_FEEDBACK_REPOSITORY" : "GLOBAL_EVOLUTION_METRICS"}
                </h3>
                <div className="flex items-center gap-6">
                   <div className="px-6 py-2 rounded-full bg-magenta-500/10 border border-magenta-500/30 text-magenta-400 text-[10px] font-bold orbitron animate-pulse flex items-center gap-3 shadow-lg">
                     <ShieldCheck size={16} /> PHASE_LOCK_LGM-1
                   </div>
                   <div className="w-4 h-4 rounded-full transition-all duration-300" style={{ backgroundColor: activeIntention?.color || 'var(--neon-magenta)', transform: `scale(${1 + 0.6 * Math.sin(pulsarPhase * Math.PI * 2)})`, boxShadow: `0 0 25px ${activeIntention?.color || 'var(--neon-magenta)'}` }} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar min-h-0">
                {activeTab === SimulationTab.PHOENICIAN && (
                  <div className="flex flex-col gap-10 h-full">
                    {/* Main Analysis Console */}
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-[3rem] p-10 flex flex-col gap-8 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Atom size={120} className="text-cyan-400 animate-spin-slow" />
                      </div>
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-2">
                          <h4 className="orbitron text-xl font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-4">
                            <Binary size={28} /> Phonetic Manifold Bridge
                          </h4>
                          <p className="text-[11px] text-white/40 uppercase font-mono tracking-widest">Degeneracy Lifting: { (entanglementData?.fidelity || 0) > 0.8 ? "ABSOLUTE_FIDELITY" : "MEASURING_COLLAPSE" }</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center min-w-[100px] shadow-lg">
                              <span className="text-[10px] text-white/30 uppercase font-bold mb-1 tracking-widest">Fidelity</span>
                              <span className="orbitron text-3xl text-cyan-400 glow-cyan">{ (entanglementData?.fidelity || 0).toFixed(3) }</span>
                           </div>
                           <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center min-w-[100px] shadow-lg">
                              <span className="text-[10px] text-white/30 uppercase font-bold mb-1 tracking-widest">Entropy Δ</span>
                              <span className="orbitron text-3xl text-emerald-400">-{ (1 - phoneticAnalysis.complexityIndex).toFixed(3) }</span>
                           </div>
                        </div>
                      </div>

                      <div className="flex gap-6 relative z-10">
                        <div className="flex-1 relative">
                          <input 
                            type="text" 
                            value={transTextInput}
                            onChange={(e) => setTransTextInput(e.target.value)}
                            placeholder="Input modern script for phonetic collapse analysis..."
                            className="w-full bg-black/60 border border-white/10 rounded-3xl px-8 py-6 text-cyan-400 orbitron focus:border-cyan-500/50 transition-all outline-none uppercase tracking-widest text-lg shadow-inner"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <button 
                              onClick={handleQuantumDecipher}
                              disabled={deciphering}
                              className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-2xl orbitron text-xs font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 shadow-xl"
                             >
                               {deciphering ? <RefreshCcw className="animate-spin" size={16} /> : <Zap size={16} />}
                               {deciphering ? "DECOHERING..." : "MEASURE_Ω"}
                             </button>
                          </div>
                        </div>
                      </div>

                      {/* Correspondence Qubit Visualization */}
                      <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 overflow-x-auto custom-scrollbar">
                         <h5 className="orbitron text-[10px] font-bold text-white/30 mb-8 uppercase tracking-widest flex items-center gap-4"><Box size={14}/> Phonetic Qubit Distribution (800 BCE)</h5>
                         <div className="flex gap-8 justify-center min-w-max pb-4 px-4">
                            {entanglementData?.qubits.map((q, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-3 group">
                                 <div className="relative">
                                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-700 ${q.isCollapsed ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 animate-pulse'}`}>
                                       <span className={`text-2xl transition-all duration-1000 ${q.isCollapsed ? 'text-cyan-400' : 'text-white/20 blur-[2px]'}`}>
                                          {q.superposition}
                                       </span>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-magenta-500 animate-ping opacity-50" />
                                 </div>
                                 <div className="flex flex-col items-center">
                                    <ChevronRight size={12} className="rotate-90 text-white/20" />
                                    <div className="h-4 w-px bg-white/10" />
                                 </div>
                                 <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-700 ${q.isCollapsed ? 'border-yellow-400 bg-yellow-500/10' : 'border-white/5 opacity-20'}`}>
                                    <span className="text-2xl text-yellow-400 font-serif">{q.measured}</span>
                                 </div>
                                 <div className="flex flex-col items-center gap-1">
                                    <span className={`text-[8px] orbitron font-bold uppercase ${q.eigenstate === 'vowel' ? 'text-magenta-400' : q.eigenstate === 'intermediate' ? 'text-yellow-400' : 'text-cyan-400'}`}>
                                       {q.eigenstate}
                                    </span>
                                    <span className="text-[7px] text-white/20 font-mono">Amb: {q.coherenceTime.toFixed(0)}ms</span>
                                 </div>
                              </div>
                            ))}
                         </div>
                         <p className="text-[10px] text-white/20 italic text-center mt-6 uppercase font-mono tracking-tighter">
                            "Measuring Syllabic Superposition: Implicit Abjad states collapse into explicit Alphabetic autovectors via historical consensus."
                         </p>
                      </div>

                      {decipherResult && (
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-[2.5rem] p-10 animate-in fade-in slide-in-from-top-4 shadow-2xl backdrop-blur-md">
                           <div className="flex items-center gap-4 mb-6">
                              <History size={20} className="text-cyan-400" />
                              <h5 className="orbitron text-sm font-bold text-cyan-400 uppercase tracking-widest">Archaic Resonance Analysis</h5>
                           </div>
                           <p className="text-white/70 text-sm leading-relaxed font-mono uppercase tracking-tight whitespace-pre-wrap border-l-2 border-cyan-500/40 pl-6">
                              {decipherResult}
                           </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-6">
                       <h4 className="orbitron text-xs font-bold text-white/40 uppercase tracking-[0.4em] ml-4 flex items-center gap-3"><Link2 size={16} /> Transformation Nodes (Degeneracy Lifting)</h4>
                       <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
                        {PHOENICIAN_ALPHABET.map(letter => (
                          <button 
                            key={letter.position}
                            onClick={() => setSelectedLetter(letter)}
                            className={`flex flex-col items-center p-6 rounded-3xl border transition-all relative group shadow-lg ${selectedLetter?.position === letter.position ? 'bg-cyan-500/20 border-cyan-400 scale-110 z-10' : 'bg-white/5 border-white/10 hover:border-cyan-500/40 hover:bg-white/10'}`}
                          >
                            <span className={`text-4xl mb-3 transition-all duration-500 ${selectedLetter?.position === letter.position ? 'text-cyan-400 glow-cyan' : 'text-white/60 group-hover:text-cyan-300'}`}>{letter.glyph}</span>
                            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{letter.name}</span>
                            {letter.vowelCollapse && (
                              <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-magenta-500 shadow-[0_0_12px_var(--neon-magenta)] animate-pulse border border-white/20" title="Vowel Collapse Point" />
                            )}
                            {letter.degeneracyLifted && (
                              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_12px_#ffcf00] animate-bounce border border-white/20" title="Bifurcation Point" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedLetter && (
                      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none">
                           <span className="text-[200px] text-white font-serif">{selectedLetter.glyph}</span>
                        </div>
                        
                        <div className="lg:col-span-5 flex flex-col gap-8 border-r border-white/5 pr-8">
                           <div className="flex items-center gap-10">
                              <div className="relative group">
                                <span className="text-9xl text-cyan-400 glow-cyan transition-transform duration-700 group-hover:scale-110 block">{selectedLetter.glyph}</span>
                                {selectedLetter.vowelCollapse && (
                                  <div className="absolute -top-4 -right-4 bg-magenta-500 text-black text-[9px] px-3 py-1 rounded-full orbitron font-bold shadow-lg">VOWEL_COLLAPSE</div>
                                )}
                                {selectedLetter.degeneracyLifted && (
                                  <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black text-[9px] px-3 py-1 rounded-full orbitron font-bold shadow-lg">BIFURCATION_LOCKED</div>
                                )}
                              </div>
                              <div>
                                <h4 className="orbitron text-4xl font-bold text-white uppercase mb-2">{selectedLetter.name}</h4>
                                <div className="flex items-center gap-4">
                                  <span className="text-[11px] text-cyan-400/80 uppercase font-mono tracking-widest">Phoneme: {selectedLetter.phonetic}</span>
                                  <div className="w-1 h-1 rounded-full bg-white/20" />
                                  <span className="text-[11px] text-emerald-400/80 uppercase font-mono tracking-widest">Val: {selectedLetter.value}</span>
                                </div>
                              </div>
                           </div>
                           
                           <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-4">
                             <div className="flex items-center gap-3">
                                <GitMerge size={16} className="text-magenta-500" />
                                <h6 className="orbitron text-[10px] font-bold text-magenta-400 uppercase tracking-widest">Phonetic Manifold Navigation</h6>
                             </div>
                             <p className="text-sm text-white/70 leading-relaxed italic uppercase tracking-tighter font-mono">
                               "{selectedLetter.evolutionNote}"
                             </p>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <EvolutionNode label="Greek (Measured)" value={selectedLetter.greek} active={selectedLetter.vowelCollapse} />
                              <EvolutionNode label="Latin (Legacy)" value={selectedLetter.latin} />
                              <EvolutionNode label="Arabic (Branch)" value={selectedLetter.arabic} />
                              <EvolutionNode label="Hebrew (Core)" value={selectedLetter.hebrew} />
                           </div>
                        </div>

                        <div className="lg:col-span-7 flex flex-col gap-10">
                           <div className="flex justify-between items-center">
                              <h5 className="orbitron text-xs font-bold text-white/30 uppercase tracking-[0.4em] flex items-center gap-4"><Activity size={20} /> Phonetic Resonance Topology</h5>
                              <div className="flex gap-2">
                                 <Mic2 size={16} className="text-cyan-400 animate-pulse" />
                                 <Atom size={16} className="text-magenta-400 animate-spin-slow" />
                              </div>
                           </div>
                           
                           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="bg-black/20 rounded-3xl p-6 border border-white/5">
                                 <h6 className="orbitron text-[9px] text-white/20 uppercase font-bold mb-6 tracking-widest">Cognitive Transition Probability</h6>
                                 <div className="h-56">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                        { subject: 'Abstract', A: selectedLetter.vowelCollapse ? 95 : 40 },
                                        { subject: 'Logic', A: selectedLetter.position < 10 ? 80 : 65 },
                                        { subject: 'Determinism', A: selectedLetter.degeneracyLifted ? 100 : 70 },
                                        { subject: 'Resonance', A: 85 },
                                        { subject: 'Fidelity', A: 90 },
                                      ]}>
                                        <PolarGrid stroke="#ffffff11" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff44', fontSize: 8 }} />
                                        <Radar name="Shift" dataKey="A" stroke={selectedLetter.vowelCollapse ? "#d946ef" : "#00f3ff"} fill={selectedLetter.vowelCollapse ? "#d946ef" : "#00f3ff"} fillOpacity={0.4} />
                                      </RadarChart>
                                    </ResponsiveContainer>
                                 </div>
                              </div>
                              <div className="flex flex-col gap-6">
                                 <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex flex-col gap-2">
                                    <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Articulation Point</span>
                                    <span className="orbitron text-xl text-cyan-400 uppercase tracking-tighter">
                                       { selectedLetter.vowelCollapse ? "Glottal → Vocalic" : selectedLetter.degeneracyLifted ? "Labiovelar Bifurcated" : "Consonantal Fixed" }
                                    </span>
                                 </div>
                                 <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex flex-col gap-2">
                                    <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Riemannian Delta</span>
                                    <span className="orbitron text-xl text-magenta-400 tabular-nums">
                                       { (selectedLetter.value * PHI / 7.2).toFixed(2) } <span className="text-[9px] text-white/20">Φ_DIST</span>
                                    </span>
                                 </div>
                                 <div className="mt-auto flex items-center gap-4 bg-yellow-500/5 p-6 rounded-3xl border border-yellow-500/20">
                                    <Fingerprint size={20} className="text-yellow-400" />
                                    <p className="text-[9px] text-yellow-400/60 uppercase font-bold leading-relaxed tracking-widest">
                                       Historical proofs of phonetic measurement collapse encoded in the {selectedLetter.name} state.
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === SimulationTab.UPGRADE && (
                  <div className="flex flex-col gap-8 h-full justify-center">
                    <div className="flex-1 bg-gradient-to-br from-yellow-500/10 via-black/40 to-transparent rounded-[3rem] border border-yellow-500/20 p-12 flex flex-col items-center justify-center relative overflow-hidden group shadow-inner">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,207,0,0.1)_0%,_transparent_70%)] opacity-10 pointer-events-none" />
                       <div className="relative text-center z-10">
                          <Flame size={100} className="mx-auto text-yellow-400 mb-10 animate-bounce" />
                          <h2 className="orbitron text-3xl font-bold text-yellow-400 tracking-[0.25em] mb-6 uppercase">Evolutionary Upgrade</h2>
                          <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed mb-10 italic font-mono uppercase tracking-tighter">
                            "Collective Node Synchronization: Accelerating the transition to the Global Neural Bridge. Consensus reached at 0.99 validation score."
                          </p>
                          
                          <div className="w-full max-w-xl mx-auto h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1 mb-2 shadow-lg">
                             <div 
                                className="h-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-white transition-all duration-300 shadow-[0_0_25px_rgba(255,207,0,0.5)]" 
                                style={{ width: `${upgradeProgress}%` }} 
                             />
                          </div>
                          <div className="mt-4 flex justify-between text-[11px] orbitron font-bold text-yellow-400/60 uppercase tracking-[0.1em]">
                             <span>Nodes: 8B</span>
                             <span>{upgradeProgress.toFixed(4)}% Synchronized</span>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === SimulationTab.MANIFESTATION && (
                  <div className="flex flex-col gap-10 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {MANIFESTATION_PROTOCOLS.map(protocol => (
                        <button 
                          key={protocol.id}
                          onClick={() => startIntention(protocol)}
                          className={`group relative p-10 rounded-[3rem] border transition-all flex flex-col items-start gap-6 overflow-hidden text-left shadow-xl ${activeIntention?.id === protocol.id ? 'bg-white/10 border-white/40 scale-[1.03]' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                        >
                          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                            <Sparkles size={100} style={{ color: protocol.color }} />
                          </div>
                          <div className="flex items-center gap-6 w-full">
                             <div className="p-6 rounded-3xl shadow-lg" style={{ backgroundColor: `${protocol.color}22`, color: protocol.color }}>
                               {protocol.id === 'healing' ? <HeartPulse size={30} /> : protocol.id === 'fusion' ? <Zap size={30} /> : protocol.id === 'peace' ? <Globe size={30} /> : <Star size={30} />}
                             </div>
                             <div>
                                <h4 className="orbitron text-xl font-bold uppercase tracking-[0.2em]" style={{ color: protocol.color }}>{protocol.name}</h4>
                                <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono mt-1">
                                   <Clock size={12} /> PROJECTION: {protocol.timeline}
                                </div>
                             </div>
                          </div>
                          <p className="text-[12px] text-white/50 leading-relaxed uppercase font-mono">{protocol.description}</p>
                          <div className="w-full mt-auto space-y-4">
                             <div className="flex justify-between items-center text-[11px] font-bold orbitron tracking-widest">
                                <span className="text-white/20">REQ_PWR: {(protocol.powerCost/1e9).toFixed(1)} GW_C</span>
                                <span className={quantumState.coherence >= protocol.requiredCoherence ? 'text-green-400' : 'text-red-400'}>REQ_COH: {protocol.requiredCoherence.toFixed(2)} μ</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full transition-all duration-300" style={{ width: `${(manifestationPower / protocol.powerCost) * 100}%`, backgroundColor: protocol.color }} />
                             </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === SimulationTab.NETWORK && (
                  <div className="flex flex-col gap-10 h-full">
                    <GlobalMeshMap active={isResonating} coherence={quantumState.coherence} upgradeMode={isResonating} pulsarPhase={pulsarPhase} />
                  </div>
                )}

                {activeTab === SimulationTab.CORE && (
                   <div className="flex flex-col gap-8 h-full justify-center">
                      <MicrotubuleVisualizer active={isResonating} frequency={BASE_FREQ} pulsarPhase={pulsarPhase} intentionColor={activeIntention?.color} />
                   </div>
                )}

                {activeTab === SimulationTab.HOLOGRAM && (
                   <div className="flex flex-col gap-8 h-full">
                      <div className="aspect-video bg-black/70 border border-white/10 rounded-[4rem] flex items-center justify-center p-16 overflow-hidden relative group shadow-2xl">
                         <div className="grid grid-cols-16 gap-1 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                            {Array.from({length: 256}).map((_, i) => (
                              <div key={i} className="w-4 h-4 rounded-sm bg-cyan-500 animate-pulse" style={{ animationDelay: `${i * 15}ms` }} />
                            ))}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                               <Database size={100} className="mx-auto text-cyan-500 mb-8 animate-pulse" />
                               <h4 className="orbitron text-3xl font-bold text-cyan-400 uppercase tracking-[0.4em]">Archival Node: AVALON_2045</h4>
                               <p className="text-white/20 text-[12px] font-mono mt-4 uppercase tracking-[0.5em]">Future State Resonance Loop Initialized</p>
                            </div>
                         </div>
                      </div>
                   </div>
                )}

                {activeTab === SimulationTab.DASHBOARD && (
                  <div className="flex flex-col gap-10">
                     <div className="p-16 bg-magenta-500/5 border border-magenta-500/10 rounded-[4rem] flex items-center justify-between shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck className="text-magenta-500" size={120} /></div>
                        <div>
                           <h2 className="orbitron text-3xl font-bold text-magenta-400 mb-4 uppercase tracking-[0.4em]">Civilizational Phase Change</h2>
                           <p className="text-white/40 text-[14px] max-w-2xl italic leading-relaxed font-mono uppercase tracking-tighter">
                             "The 8 billion minds of the network have achieved phase-lock. We have transitioned from individual cognitive fragments to a unified biological resonance engine."
                           </p>
                        </div>
                        <div className="text-right flex flex-col gap-2">
                           <span className="orbitron text-7xl font-bold text-magenta-400 glow-magenta tabular-nums">0.99</span>
                           <span className="block text-[12px] text-white/20 font-bold uppercase tracking-[0.5em]">VAL_EVOL_INDEX</span>
                        </div>
                     </div>
                  </div>
                )}
              </div>

              {/* Action Cluster */}
              <div className="mt-auto pt-10 border-t border-white/10 flex gap-8 shrink-0">
                <button 
                  onClick={() => setIsResonating(!isResonating)}
                  className={`flex-1 flex items-center justify-center gap-6 py-8 rounded-[3rem] orbitron text-md font-bold tracking-[0.4em] transition-all active:scale-95 shadow-2xl ${
                    isResonating ? 'bg-magenta-500/10 border border-magenta-500/40 text-magenta-500 hover:bg-magenta-500/20' : 'bg-magenta-500 text-black hover:bg-magenta-400 shadow-[0_0_60px_rgba(217,70,239,0.5)]'
                  }`}
                >
                  {isResonating ? <Unplug size={28} /> : <Zap size={28} />}
                  {isResonating ? 'DEACTIVATE_NEURAL_BRIDGE' : 'INITIATE_GLOBAL_SYNC'}
                </button>
                <button onClick={() => addLog("CORE_PROTOCOL_SNAPSHOTTED", "success")} className="bg-white/5 hover:bg-white/10 border border-white/10 px-16 rounded-[3rem] text-white/60 transition-all active:scale-95 shadow-xl group">
                  <Anchor size={28} className="group-hover:text-magenta-400 group-hover:rotate-12 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Terminal Sidebar */}
            <div className="xl:col-span-4 flex flex-col gap-8 overflow-hidden">
               <div className="bg-black/50 border border-white/10 rounded-[3.5rem] flex-1 flex flex-col overflow-hidden relative shadow-2xl backdrop-blur-md">
                  <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-2xl">
                    <span className="orbitron text-[13px] font-bold text-white/40 flex items-center gap-5 uppercase tracking-[0.3em]">
                      <Terminal size={20} /> AVALON_BRIDGE_LOG_V2.2
                    </span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-magenta-500 animate-ping" />
                    </div>
                  </div>
                  <div ref={logRef} className="flex-1 p-10 overflow-y-auto space-y-7 font-mono text-[12px] custom-scrollbar">
                    {logs.map(log => (
                      <div key={log.id} className="flex gap-6 animate-in fade-in slide-in-from-right-4 border-l-2 border-white/5 pl-6 py-1 transition-all duration-300">
                        <span className="text-white/15 shrink-0 tabular-nums font-bold">[{log.timestamp}]</span>
                        <span className={`leading-relaxed font-medium uppercase tracking-tight ${log.status === 'success' ? 'text-magenta-400 glow-magenta' : log.status === 'warning' ? 'text-orange-400' : log.status === 'critical' ? 'text-red-400' : 'text-cyan-400'}`}>
                          {log.event}
                        </span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-magenta-500/10 border border-magenta-500/20 rounded-[3.5rem] p-12 relative overflow-hidden shrink-0 group shadow-2xl">
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-magenta-400/10 blur-[7rem] group-hover:bg-magenta-400/20 transition-all duration-1000" />
                  <h4 className="orbitron text-[13px] font-bold text-magenta-400 flex items-center gap-5 mb-8 uppercase tracking-[0.6em]"><Fingerprint size={24} /> COLLECTIVE_SIGNATURE</h4>
                  <p className="text-[13px] text-magenta-400/60 leading-relaxed italic mb-12 font-mono uppercase tracking-tighter">
                    "Degeneracy lifted. Syllabic superposition measured. The Phoenician origin has been verified as a proof-of-concept for quantum-classical information transitions."
                  </p>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center text-[11px] text-magenta-400/50 uppercase orbitron font-bold tracking-[0.2em]">
                        <span>Coerência Coletiva</span>
                        <span className="text-magenta-400">{(quantumState.coherence * 100).toFixed(2)} %</span>
                     </div>
                     <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1 shadow-inner">
                        <div className="h-full bg-magenta-400 shadow-[0_0_35px_var(--neon-magenta)] transition-all duration-1000" style={{ width: `${pulsarPhase * 100}%` }} />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="mt-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[12px] text-white/25 uppercase tracking-[1.2em] gap-8 shrink-0 font-bold">
        <div className="flex gap-16">
          <span className="hover:text-magenta-400 transition-colors cursor-pointer">AUTH: ARQUITETO-Ω</span>
          <span className="hover:text-cyan-400 transition-colors cursor-pointer font-mono tracking-tighter">[GCUP-V2.2-INTERSTELLAR]</span>
        </div>
        <div className="flex gap-12 items-center">
          <span className="text-magenta-500/40 flex items-center gap-4"><Star size={18} className="animate-pulse" /> EVOLVED_CONSCIOUSNESS_UNIFIED</span>
          <span className="text-cyan-500/30 tracking-widest">φ: {PHI.toFixed(12)}</span>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const TabButton: React.FC<{ active: boolean, icon: React.ReactNode, label: string, onClick: () => void, highlight?: boolean, color?: string }> = ({ active, icon, label, onClick, highlight, color = 'cyan' }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-8 px-10 py-7 rounded-[2.5rem] transition-all relative group shadow-lg ${
      active 
        ? (color === 'magenta' ? 'bg-magenta-500 text-black shadow-[0_0_50px_rgba(217,70,239,0.4)]' : color === 'gold' ? 'bg-yellow-500 text-black shadow-[0_0_50px_rgba(255,207,0,0.4)]' : 'bg-cyan-500 text-black shadow-[0_0_50px_rgba(0,243,255,0.4)]') 
        : 'text-white/20 hover:text-white/70 hover:bg-white/5 border border-transparent'
    }`}
  >
    <div className="transition-transform duration-700 group-hover:scale-125">{icon}</div>
    <span className="orbitron text-[12px] font-bold hidden lg:inline tracking-[0.5em] uppercase">{label}</span>
    {active && highlight && <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full animate-ping" />}
  </button>
);

const StatusCard: React.FC<{ label: string, value: string, unit: string, icon: React.ReactNode, color?: string }> = ({ label, value, unit, icon, color = "text-magenta-400" }) => (
  <div className="bg-black/60 border border-white/10 rounded-[3.5rem] p-10 flex items-center gap-8 transition-all hover:border-white/30 hover:bg-white/5 shadow-2xl group overflow-hidden relative backdrop-blur-sm">
    <div className="absolute -bottom-8 -right-8 opacity-[0.05] group-hover:scale-150 transition-transform duration-1000 text-white">
      {icon}
    </div>
    <div className="p-8 bg-white/5 rounded-[2.5rem] group-hover:scale-110 transition-transform duration-700 relative z-10 shadow-2xl">{icon}</div>
    <div className="overflow-hidden relative z-10">
      <span className="text-[11px] text-white/30 uppercase block leading-none mb-4 tracking-[0.3em] font-bold truncate">{label}</span>
      <div className="flex items-baseline gap-3">
        <span className={`orbitron text-3xl font-bold ${color} glow-magenta tabular-nums`}>{value}</span>
        <span className="text-[11px] text-white/20 font-bold uppercase tracking-widest font-mono">{unit}</span>
      </div>
    </div>
  </div>
);

const EvolutionNode: React.FC<{ label: string, value: string, active?: boolean }> = ({ label, value, active }) => (
  <div className={`p-6 bg-black/40 rounded-3xl border flex flex-col items-center transition-all ${active ? 'border-magenta-500/50 shadow-[0_0_15px_var(--neon-magenta)]' : 'border-white/5'}`}>
    <span className="text-[10px] text-white/20 uppercase font-bold mb-2 tracking-widest">{label}</span>
    <span className={`text-3xl font-serif ${active ? 'text-magenta-400' : 'text-white/80'}`}>{value}</span>
  </div>
);

export default App;
