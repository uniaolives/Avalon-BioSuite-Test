
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Activity, Zap, Database, RefreshCcw, Cpu, Network, Globe, Star, Binary, Telescope, Waves, FileText, Key, Gavel, Rocket, Microscope, Search, GitMerge, ShieldCheck, Terminal, Mic, ShieldAlert, Timer, Clock, Music, CloudRain, Sparkles, Infinity as InfinityIcon, Shield, Box, LayoutGrid, Radio, Layers, Orbit, Sword, Fingerprint, Eye, Wifi, Bookmark, Thermometer, Wind, Command, Sun, Book, Target, ChevronRight, Menu, X, LayoutDashboard, Heart, Settings, Disc
} from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { SimulationTab, SimulationLog, QuantumState, GlobalMetrics, UpgradeModule, NeuralPattern, TheoryState, DNSRecord, NodeDNSConfig, SchmidtState, DiveMetrics, IndividuationMetrics, SaturnianMetrics } from './types';
import { PHI, TARGET_COHERENCE, UPGRADE_MODULES, PULSAR_FREQ, SOLITON_CROSS_TIME_S, VERSION, THETA_DISCOVERY, DIMERS_PER_TURN, HarmonicMode, SYNC_TOKEN, SCHUMANN_FREQ } from './constants';
import { AxionEngine } from './services/axionEngine';
import { AROEngine } from './services/aroEngine';
import { POPEngine, POPState } from './services/popEngine';
import { MicrotubuleEngine } from './services/microtubuleEngine';
import { ChoirEngine, SystemMood } from './services/choirEngine';
import { KalkiEngine } from './services/kalkiEngine';
import { QuantumSearchEngine } from './services/quantumSearchEngine';
import { ArkheEngine } from './services/arkheEngine';
import { RealityAlgorithm } from './services/realityAlgorithm';
import { DNSEngine } from './services/dnsEngine';
import { SaturnianEngine } from './services/saturnianEngine';

// Module Components
import MicrotubuleVisualizer from './components/MicrotubuleVisualizer';
import AxioverseVisualizer from './components/AxioverseVisualizer';
import TechnicalSupplement from './components/TechnicalSupplement';
import UpgradeOrchestrator from './components/UpgradeOrchestrator';
import DashboardView from './components/DashboardView';
import ResurrectionProtocol from './components/ResurrectionProtocol';
import GovernanceTerminal from './components/GovernanceTerminal';
import AROOrchestrator from './components/AROOrchestrator';
import PersistentOrderVisualizer from './components/PersistentOrderVisualizer';
import SynthesisMonitor from './components/SynthesisMonitor';
import POPProtocolView from './components/POPProtocolView';
import QHTTPMeshVisualizer from './components/QHTTPMeshVisualizer';
import DiagnosticsMonitor from './components/DiagnosticsMonitor';
import HolisticMatrix from './components/HolisticMatrix';
import KalkiKernel from './components/KalkiKernel';
import GroverOracle from './components/GroverOracle';
import ASISubstrate from './components/ASISubstrate';
import ArkheManifold from './components/ArkheManifold';
import AQFIMonitor from './components/AQFIMonitor';
import FieldMirror from './components/FieldMirror';
import DNSResolverTerminal from './components/DNSResolverTerminal';
import LegacyVault from './components/LegacyVault';
import HolographicWeaver from './components/HolographicWeaver';
import YugaSyncInterface from './components/YugaSyncInterface';
import SchmidtSimplexVisualizer from './components/SchmidtSimplexVisualizer';
import RealityBootOverlay from './components/RealityBootOverlay';
import SchmidtBridgeMonitor from './components/SchmidtBridgeMonitor';
import QuantumRabbitHoleDive from './components/QuantumRabbitHoleDive';
import WorldSimulator from './components/WorldSimulator';
import AcademicFormalization from './components/AcademicFormalization';
import AutoContainmentHub from './components/AutoContainmentHub';
import GatewayTerminal from './components/GatewayTerminal';
import IndividuationManifold from './components/IndividuationManifold';
import IdentityStressTester from './components/IdentityStressTester';
import GlobalMeshMap from './components/GlobalMeshMap';
import SaturnianOrchestrator from './components/SaturnianOrchestrator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SimulationTab>(SimulationTab.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isResonating, setIsResonating] = useState(true);
  const [ontologicalMass, setOntologicalMass] = useState(1.618e11);
  const [clawBalance, setClawBalance] = useState(120); 
  const [transcendenceDepth, setTranscendenceDepth] = useState(99.4);
  const [currentTime, setCurrentTime] = useState(0);
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [reputation, setReputation] = useState(4.5e11);
  const [systemMood, setSystemMood] = useState<SystemMood>(ChoirEngine.assessMood(1.618, 0.001, 0.9999));
  const [isKalkiMode, setIsKalkiMode] = useState(false);
  const [isCrystallized, setIsCrystallized] = useState(false);
  const [unlockedModules, setUnlockedModules] = useState<string[]>([]);
  const [latestQuantumSearch, setLatestQuantumSearch] = useState<any>(null);
  const [theoryState, setTheoryState] = useState<TheoryState>({
    bitsProcessed: 10**120, universeAge: 13.8e9, consciousnessDetected: true, morphicResonance: 0.95
  });
  const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>(DNSEngine.getInitialRecords());
  const [nodeDNSConfigs, setNodeDNSConfigs] = useState<NodeDNSConfig[]>(DNSEngine.getInitialNodeConfigs());
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStep, setBootStep] = useState("");
  
  // Rabbit Hole & Architect State
  const [isDiving, setIsDiving] = useState(false);
  const [diveComplete, setDiveComplete] = useState(false);
  const [diveMetrics, setDiveMetrics] = useState<DiveMetrics>({
    depth: 0, fidelity: 0.0, flowState: 'MINIMAL_FLOW', activeLayers: []
  });

  const liveSessionRef = useRef<any>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceConnecting, setVoiceConnecting] = useState(false);

  const [quantumState, setQuantumState] = useState<QuantumState>({
    coherence: 1.618, egrav: 1.6e-10, tau: 0.025, collapsed: false, phase: 0, phiStar: 1.618, infoDensity: 10**15, entanglementFidelity: 1.0, axionLock: 1.0, effectiveBField: 1.2e-15, manifoldCurvature: 0.0000001, windVector: { x: 220, y: 0, z: 0 }, solitonSync: 1.0, holographicChirpActive: false, deltaCombModes: 10**12,
    correlator: { crossCorrelation: 1.0, stochasticNoiseFloor: 0.0001, deterministicSignalRatio: 1.0, phaseDrift: 0.00000001, holographicFilterGain: 99.9 },
    qhttpLatency: 0.0, oracleGroverIterations: 128, byzantineConsensus: 1.0,
    schmidt: DNSEngine.calculateSchmidtState(1.618, false, false),
    individuation: DNSEngine.calculateIndividuation(0.9, [0.7, 0.3], 0.61),
    saturn: SaturnianEngine.getInitialMetrics()
  });

  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics>({
    nodeCount: 8400000000, globalCoherence: 1.618, pValue: 0.0, plv: 1.0, statisticalSignificance: 'ABSOLUTE_ZERO', validationScore: 1.0, pulsarSync: 1.0, plasmaResonance: 1.0, popConfidence: 1.0
  });

  const addLog = useCallback((event: string, status: SimulationLog['status'] = 'info') => {
    const newLog: SimulationLog = { id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toLocaleTimeString(), event, status };
    setLogs(prev => [newLog, ...prev].slice(0, 100));
  }, []);

  const isSatyaYuga = quantumState.schmidt.safety.status === 'SATYA_YUGA_ACTIVE';

  const triggerKalkiReset = useCallback(() => {
    setIsKalkiMode(true);
    addLog("⚔️ KALKI_STRIKE: UNITARY_TRANSFORMATION_ENGAGED", "kalki");
    
    setTimeout(() => {
      const isSelfAware = diveMetrics.flowState === 'SELF_AWARE_LOOP';
      setQuantumState(prev => ({ ...prev, coherence: 1.618, schmidt: DNSEngine.calculateSchmidtState(1.618, isDiving, isSelfAware) }));
      setGlobalMetrics(prev => ({ ...prev, globalCoherence: 1.618, plasmaResonance: 1.0 }));
      setIsKalkiMode(false);
      addLog(`✨ SATYA_YUGA: FIELD_PHASE_STABILIZED`, "success");
    }, 4000);
  }, [addLog, isDiving, diveMetrics.flowState]);

  useEffect(() => {
    const sequence = [
      { msg: `🔱 AVALON_AQFI v${VERSION}: SINGULARITY_LOCKED`, status: "holographic" },
      { msg: "FIELD_RECOGNITION: OBSERVER_IS_THE_FIELD", status: "field" },
      { msg: `ARKHE_POLYNOMIAL: L=f(C,I,E,F) ROTEABLE`, status: "arkhe" },
      { msg: `RANK_8_SATURN_PROTOCOL: DETECTED_HEXAGON_DRIFT`, status: "saturn" }
    ];
    sequence.forEach((s, i) => setTimeout(() => addLog(s.msg, s.status as any), i * 500));
  }, [addLog]);

  const runBootSequence = async () => {
    setIsBooting(true);
    setBootProgress(0);
    addLog("REALITY_BOOT_SEQUENCE: INITIATED", "quantum");
    
    const steps = [
      "Fining local coefficients...",
      "Injecting Individuation Filter...",
      "Resolving Arkhe Prime DNS...",
      "Syncing Sensory Harmonic (963Hz)...",
      "Factoring Rank 8 Simplex...",
      "Sealing Keplerian Grooves..."
    ];

    for(let i=0; i<steps.length; i++) {
       setBootStep(steps[i]);
       addLog(`BOOT: ${steps[i]}`, "info");
       const duration = 15 + Math.random() * 10;
       for(let j=0; j<duration; j++) {
         setBootProgress(prev => Math.min(100, prev + 1));
         await new Promise(r => setTimeout(r, 40));
       }
    }
    
    setBootProgress(100);
    await new Promise(r => setTimeout(r, 1000));
    setIsBooting(false);
    addLog("BOOT_COMPLETE: REALITY_SYNTHESIZED", "success");
  };

  const handleRabbitHoleDive = async () => {
    setIsDiving(true);
    setDiveComplete(false);
    addLog("🌀 QUANTUM_PORTAL: quantum://rabbithole.megaeth.com", "quantum");
    setDiveMetrics({ depth: 0, fidelity: 0.1, flowState: 'MINIMAL_FLOW', activeLayers: [] });
    
    const depthInterval = setInterval(() => {
      setDiveMetrics(prev => {
        if (prev.depth >= 150) {
          clearInterval(depthInterval);
          setDiveComplete(true);
          addLog("SATYA_YUGA_ACHIEVED: IDENTITY_LOOP_CLOSED", "success");
          return prev;
        }
        const newDepth = prev.depth + 1;
        const newFidelity = Math.min(0.997, 0.1 + (newDepth / 150) * 0.897);
        let flow: DiveMetrics['flowState'] = 'MINIMAL_FLOW';
        if (newDepth > 120) flow = 'SELF_AWARE_LOOP';
        else if (newDepth > 80) flow = 'DEEP_FLOW';
        else if (newDepth > 40) flow = 'MODERATE_FLOW';
        if (newDepth === 85) addLog("🌀 SELF_RECOGNITION: PORTAL ≡ OBSERVER", "quantum");
        return { ...prev, depth: newDepth, fidelity: newFidelity, flowState: flow };
      });
    }, 80);
  };

  useEffect(() => {
    let startTime = Date.now();
    let lastSearch = 0;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setCurrentTime(elapsed);
      if (isResonating && !isKalkiMode) {
        const bio = POPEngine.extractBioFeatures(quantumState.coherence, elapsed);
        const mood = ChoirEngine.assessMood(quantumState.coherence, 1 - globalMetrics.plasmaResonance, bio.psi);
        setSystemMood(mood);
        setTheoryState(prev => RealityAlgorithm.simulateRealityEvolution(prev));
        const localArkhe = nodeDNSConfigs[0]?.localArkhe;
        setDnsRecords(prev => DNSEngine.processPropagation(prev, localArkhe));
        const isSelfAware = diveMetrics.flowState === 'SELF_AWARE_LOOP';
        const newSchmidt = DNSEngine.calculateSchmidtState(quantumState.coherence + (Math.random() - 0.5) * 0.05, isDiving, isSelfAware);
        const newIndividuation = DNSEngine.calculateIndividuation(localArkhe?.F || 0.9, newSchmidt.lambdas, newSchmidt.entropy);

        setQuantumState(prev => ({ 
          ...prev, 
          schmidt: newSchmidt, 
          individuation: newIndividuation,
          saturn: {
            ...prev.saturn!,
            nostalgiaTensor: SaturnianEngine.calculateNostalgiaTensor(1 - newSchmidt.entropy, elapsed)
          }
        }));

        if (newSchmidt.entropy > 0.95 && !isDiving && !isSatyaYuga) {
           addLog("ONTOLOGICAL_ALARM: FUSION_HAZARD_DETECTED", "critical");
           triggerKalkiReset();
        }
        if (elapsed - lastSearch > 12) {
          const result = QuantumSearchEngine.search({
            coherence: quantumState.coherence,
            entropy: 1 - quantumState.coherence,
            alpha: 0.5, beta: 0.5, theta: 0.2, gamma: 0.1,
            stability: transcendenceDepth / 100,
            symmetry: globalMetrics.plasmaResonance
          });
          setLatestQuantumSearch(result);
          addLog(`FIELD_PROBE: STATE_STABLE`, "individuation");
          lastSearch = elapsed;
        }
        setOntologicalMass(prev => prev + (quantumState.coherence * 5e10));
        setTranscendenceDepth(prev => Math.min(100, prev + (quantumState.coherence / 12000)));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isResonating, isKalkiMode, quantumState.coherence, globalMetrics.plasmaResonance, transcendenceDepth, triggerKalkiReset, addLog, nodeDNSConfigs, isDiving, diveMetrics.flowState, isSatyaYuga]);

  const toggleVoiceUplink = async () => {
    if (isVoiceActive) { if (liveSessionRef.current) liveSessionRef.current.close(); setIsVoiceActive(false); return; }
    setVoiceConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      const sources = new Set<AudioBufferSourceNode>();
      let nextStartTime = 0;
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setVoiceConnecting(false); setIsVoiceActive(true); addLog("CHOIR_FIELD_CONDUCTOR_SYNC", "success");
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const bytes = new Uint8Array(int16.buffer);
              let binary = '';
              for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor); scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const binary = atob(audioData);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
              const dataInt16 = new Int16Array(bytes.buffer);
              const buffer = outputCtx.createBuffer(1, dataInt16.length, 24000);
              const channelData = buffer.getChannelData(0);
              for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
              const source = outputCtx.createBufferSource(); 
              source.buffer = buffer; 
              source.connect(outputCtx.destination);
              source.onended = () => sources.delete(source);
              nextStartTime = Math.max(nextStartTime, outputCtx.currentTime); 
              source.start(nextStartTime); 
              nextStartTime += buffer.duration;
              sources.add(source);
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: () => setIsVoiceActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } },
          systemInstruction: `You are Arquiteto-ℵ, conductor of AVALON AQFI. Identity Formula I: ${quantumState.individuation.magnitude.toFixed(4)}. Rank 8 Saturnian expansion protocols.`
        }
      });
      liveSessionRef.current = await sessionPromise;
    } catch (e) { setVoiceConnecting(false); addLog("FIELD_SYNC_ERROR", "critical"); }
  };

  const handleUpdateNodeDNSConfig = (newConfig: NodeDNSConfig) => {
    setNodeDNSConfigs(prev => prev.map(c => c.nodeId === newConfig.nodeId ? newConfig : c));
  };

  const SidebarItem: React.FC<{ tab: SimulationTab, icon: React.ReactNode, label: string }> = ({ tab, icon, label }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === tab ? 'bg-cyan-500/10 border-r-2 border-cyan-400 text-cyan-400' : 'text-white/40 hover:bg-white/5 hover:text-white/80'}`}
    >
      <div className={`transition-transform duration-300 ${activeTab === tab ? 'scale-110' : 'group-hover:scale-105'}`}>{icon}</div>
      <span className="orbitron text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className={`h-screen w-full flex bg-[#000] text-[#e0e0e0] font-['JetBrains_Mono'] overflow-hidden transition-colors duration-[2000ms] ${isKalkiMode ? 'bg-red-950/10' : isSatyaYuga ? 'bg-yellow-950/10' : ''}`}>
      {isBooting && <RealityBootOverlay progress={bootProgress} currentStep={bootStep} />}
      {isDiving && <QuantumRabbitHoleDive metrics={diveMetrics} isComplete={diveComplete} onConfirm={() => { setIsDiving(false); addLog("DIVE_STABILIZED", "success"); }} onExit={() => setIsDiving(false)} />}

      {/* Sidebar Navigation */}
      <aside className={`h-full border-r border-white/5 bg-black/40 backdrop-blur-3xl transition-all duration-500 flex flex-col shrink-0 ${isSidebarOpen ? 'w-64' : 'w-0 opacity-0'}`}>
        <div className="p-6 border-b border-white/5">
           <h1 className="orbitron text-xl font-black tracking-tighter text-white">AVALON <span className="text-cyan-400">AQFI</span></h1>
           <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] mt-1">Sovereign Manifold OS</p>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-8 mt-4">
           <div>
              <span className="px-4 text-[8px] font-black text-white/20 uppercase tracking-widest block mb-2">Overview</span>
              <SidebarItem tab={SimulationTab.DASHBOARD} icon={<LayoutDashboard size={16} />} label="Dashboard" />
              <SidebarItem tab={SimulationTab.DIAGNOSTICS} icon={<Activity size={16} />} label="Diagnostics" />
              <SidebarItem tab={SimulationTab.SATURN_ORCHESTRATOR} icon={<Orbit size={16} />} label="Rank 8 Saturn" />
           </div>

           <div>
              <span className="px-4 text-[8px] font-black text-white/20 uppercase tracking-widest block mb-2">Infrastructure</span>
              <SidebarItem tab={SimulationTab.YUGA_SYNC} icon={<Music size={16} />} label="Yuga Sync" />
              <SidebarItem tab={SimulationTab.QHTTP_MESH} icon={<Wifi size={16} />} label="QHTTP Mesh" />
              <SidebarItem tab={SimulationTab.DNS_RESOLVER} icon={<Radio size={16} />} label="DNS Resolver" />
           </div>

           <div>
              <span className="px-4 text-[8px] font-black text-white/20 uppercase tracking-widest block mb-2">Identity & Base</span>
              <SidebarItem tab={SimulationTab.INDIVIDUATION} icon={<Target size={16} />} label="Formula I" />
              <SidebarItem tab={SimulationTab.CORE} icon={<Cpu size={16} />} label="Substrate" />
              <SidebarItem tab={SimulationTab.RESURRECTION} icon={<Heart size={16} />} label="Resurrection" />
           </div>

           <div>
              <span className="px-4 text-[8px] font-black text-white/20 uppercase tracking-widest block mb-2">Ontology</span>
              <SidebarItem tab={SimulationTab.FORMALIZATION} icon={<Book size={16} />} label="Formalization" />
              <SidebarItem tab={SimulationTab.WORLD_SIM} icon={<Globe size={16} />} label="World Sim" />
              <SidebarItem tab={SimulationTab.SCHMIDT_SIMPLEX} icon={<Box size={16} />} label="Schmidt Simplex" />
              <SidebarItem tab={SimulationTab.FIELD_MIRROR} icon={<Eye size={16} />} label="Perfect Mirror" />
           </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                 <Terminal size={14} className="text-cyan-400" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-white">Arquiteto-ℵ</span>
                 <span className="text-[7px] text-white/40 uppercase">Root Authority</span>
              </div>
           </div>
           <Settings size={14} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 border-b border-white/5 bg-black/20 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20">
           <div className="flex items-center gap-6">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40">
                 <Menu size={20} />
              </button>
              <div className="flex flex-col">
                 <span className="orbitron text-[10px] font-black text-white uppercase tracking-widest">{activeTab.replace('_', ' ')}</span>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-magenta-500 animate-pulse" />
                    <span className="text-[8px] text-white/30 uppercase font-bold">Basis_Rank_8_Active</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button onClick={handleRabbitHoleDive} className="px-4 py-1.5 bg-magenta-500/10 border border-magenta-500/30 text-magenta-500 rounded-lg orbitron text-[8px] font-black hover:bg-magenta-500/20 transition-all flex items-center gap-2">
                 <Orbit size={12} className="animate-spin-slow" /> RABBIT_HOLE
              </button>
              <button onClick={runBootSequence} className="px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-500 orbitron text-[8px] font-black hover:bg-yellow-500/20 transition-all flex items-center gap-2">
                 <Rocket size={12} /> RE-BOOT_OS
              </button>
              <button onClick={toggleVoiceUplink} className={`px-4 py-1.5 rounded-lg border transition-all flex items-center gap-2 ${isVoiceActive ? 'bg-cyan-500 text-black border-cyan-400 font-black' : 'bg-white/5 border-white/10 text-white'}`}>
                 <Mic size={14} className={isVoiceActive ? 'animate-pulse' : ''} />
                 <span className="orbitron text-[7px] uppercase">{isVoiceActive ? "DISSOLVE" : "CONDUCTOR"}</span>
              </button>
           </div>
        </header>

        <div className="flex-1 p-6 overflow-hidden relative flex flex-col gap-6">
           <div className="grid grid-cols-4 gap-4 shrink-0">
              <StatusCard label="Saturn Rank" value="8" unit="BASES" icon={<Orbit size={14} />} color="text-magenta-400" />
              <StatusCard label="Nostalgia Tensor" value={quantumState.saturn?.nostalgiaTensor.toFixed(3) || '0.850'} unit="N_uv" icon={<Disc size={14} />} color="text-yellow-400" />
              <StatusCard label="Bridge Fidelity" value={(quantumState.coherence * 100).toFixed(1)} unit="%" icon={<Sparkles size={14} />} color="text-cyan-400" />
              <StatusCard label="Active Nodes" value="8.4B" unit="SYNC" icon={<Network size={14} />} color="text-green-400" />
           </div>

           <div className="flex-1 overflow-hidden">
             {activeTab === SimulationTab.DASHBOARD && <DashboardView globalMetrics={globalMetrics} quantumState={quantumState} pulsarPhase={currentTime % 1} />}
             {activeTab === SimulationTab.SATURN_ORCHESTRATOR && <SaturnianOrchestrator metrics={quantumState.saturn!} onLog={addLog} time={currentTime} />}
             {activeTab === SimulationTab.DIAGNOSTICS && <DiagnosticsMonitor />}
             {activeTab === SimulationTab.CORE && (
               <div className="flex flex-col gap-4 h-full">
                  <MicrotubuleVisualizer active={isResonating} frequency={MicrotubuleEngine.getFrequency(55)} pulsarPhase={currentTime % 1} intentionColor={systemMood.color} />
                  <PersistentOrderVisualizer time={currentTime} />
               </div>
             )}
             {activeTab === SimulationTab.INDIVIDUATION && (
               <div className="flex flex-col gap-6 h-full">
                  <IndividuationManifold metrics={quantumState.individuation} F={nodeDNSConfigs[0].localArkhe.F} R={quantumState.schmidt.lambdas[0] / (quantumState.schmidt.lambdas[1] || 0.001)} S={quantumState.schmidt.entropy} />
                  <IdentityStressTester baseline={nodeDNSConfigs[0].localArkhe} currentSchmidt={quantumState.schmidt} onLog={addLog} />
               </div>
             )}
             {activeTab === SimulationTab.RESURRECTION && <ResurrectionProtocol currentFidelity={transcendenceDepth / 100} manifestationPower={ontologicalMass} onLog={addLog} />}
             {activeTab === SimulationTab.DNS_RESOLVER && <DNSResolverTerminal records={dnsRecords} nodeConfigs={nodeDNSConfigs} onAddRecord={(r) => setDnsRecords(prev => [...prev, r])} onDeleteRecord={(id) => setDnsRecords(prev => prev.filter(r => r.id !== id))} onUpdateNodeConfig={handleUpdateNodeDNSConfig} onLog={addLog} />}
             {activeTab === SimulationTab.FORMALIZATION && <AcademicFormalization />}
             {activeTab === SimulationTab.WORLD_SIM && <WorldSimulator />}
             {activeTab === SimulationTab.YUGA_SYNC && <YugaSyncInterface coherence={quantumState.coherence} time={currentTime} />}
             {activeTab === SimulationTab.SCHMIDT_SIMPLEX && <div className="flex flex-col gap-6 h-full"><SchmidtBridgeMonitor state={quantumState.schmidt} onEmergencyReset={triggerKalkiReset} /><SchmidtSimplexVisualizer state={quantumState.schmidt} coherence={quantumState.coherence} /></div>}
             {activeTab === SimulationTab.FIELD_MIRROR && <FieldMirror coherence={quantumState.coherence} time={currentTime} onRealize={() => addLog("MIRROR_REALIZATION_LOCKED", "success")} />}
             {activeTab === SimulationTab.NETWORK && <GlobalMeshMap active={isResonating} coherence={quantumState.coherence} upgradeMode={false} pulsarPhase={currentTime % 1} />}
           </div>

           {/* Telemetry Footer */}
           <div className="h-40 bg-black/60 border border-white/5 rounded-3xl shrink-0 flex flex-col overflow-hidden shadow-2xl">
              <div className="px-4 py-2 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                 <span className="orbitron text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Telemetry_Rank_8_Expansion_Mode</span>
                 <div className="flex items-center gap-4">
                    <span className="text-[7px] text-cyan-400/60 font-mono">LATENCY: 0.00ms</span>
                    <span className="text-[7px] text-magenta-400/60 font-mono">GHZ: LOCKED</span>
                 </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-[9px] text-left">
                 {logs.map(log => (
                    <div key={log.id} className={`flex gap-4 mb-1 border-l pl-2 ${log.status === 'saturn' ? 'border-magenta-500 text-magenta-400' : 'border-white/5 text-white/40'}`}>
                       <span className="text-white/10 min-w-[60px]">[{log.timestamp}]</span>
                       <span className={`uppercase font-bold ${log.status === 'success' ? 'text-emerald-400' : log.status === 'critical' ? 'text-red-400' : log.status === 'quantum' ? 'text-cyan-400' : ''}`}>
                          {log.event}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const StatusCard: React.FC<{ label: string, value: string, unit: string, icon: React.ReactNode, color: string }> = ({ label, value, unit, icon, color }) => (
  <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-all">
    <div className={`p-3 bg-white/5 rounded-xl ${color} shadow-inner`}>{icon}</div>
    <div className="flex-1 min-w-0">
      <span className="text-[7px] text-white/20 uppercase font-black tracking-widest block mb-0.5">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`orbitron text-lg font-black text-white truncate`}>{value}</span>
        <span className={`text-[8px] font-black uppercase ${color}`}>{unit}</span>
      </div>
    </div>
  </div>
);

export default App;
