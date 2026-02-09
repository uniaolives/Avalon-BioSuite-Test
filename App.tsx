
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Activity, Zap, Database, RefreshCcw, Cpu, Network, Globe, Star, Binary, Telescope, Waves, FileText, Key, Gavel, Rocket, Microscope, Search, GitMerge, ShieldCheck, Terminal, Mic, ShieldAlert, Timer, Clock, Music, CloudRain, Sparkles, Infinity as InfinityIcon, Shield, Box, LayoutGrid, Radio, Layers, Orbit, Sword, Fingerprint, Eye, Wifi, Bookmark, Thermometer, Wind, Command, Sun, Book, Target, ChevronRight, Menu, X, LayoutDashboard, Heart, Settings, Disc
} from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { SimulationTab, SimulationLog, QuantumState, GlobalMetrics, UpgradeModule, NeuralPattern, TheoryState, DNSRecord, NodeDNSConfig, SchmidtState, DiveMetrics, IndividuationMetrics, SaturnianMetrics } from './types';
import { PHI, TARGET_COHERENCE, UPGRADE_MODULES, PULSAR_FREQ, SOLITON_CROSS_TIME_S, VERSION, THETA_DISCOVERY, DIMERS_PER_TURN, HarmonicMode, SYNC_TOKEN, SCHUMANN_FREQ } from './constants';
import { AxionEngine } from './services/axionEngine';
import { POPEngine } from './services/popEngine';
import { MicrotubuleEngine } from './services/microtubuleEngine';
import { ChoirEngine, SystemMood } from './services/choirEngine';
import { RealityAlgorithm } from './services/realityAlgorithm';
import { DNSEngine } from './services/dnsEngine';
import { SaturnianEngine } from './services/saturnianEngine';
import { TimeCrystalEngine } from './services/timeCrystalEngine';

// Module Components
import MicrotubuleVisualizer from './components/MicrotubuleVisualizer';
import TechnicalSupplement from './components/TechnicalSupplement';
import UpgradeOrchestrator from './components/UpgradeOrchestrator';
import DashboardView from './components/DashboardView';
import ResurrectionProtocol from './components/ResurrectionProtocol';
import GovernanceTerminal from './components/GovernanceTerminal';
import PersistentOrderVisualizer from './components/PersistentOrderVisualizer';
import SynthesisMonitor from './components/SynthesisMonitor';
import POPProtocolView from './components/POPProtocolView';
import QHTTPMeshVisualizer from './components/QHTTPMeshVisualizer';
import DiagnosticsMonitor from './components/DiagnosticsMonitor';
import FieldMirror from './components/FieldMirror';
import DNSResolverTerminal from './components/DNSResolverTerminal';
import LegacyVault from './components/LegacyVault';
import YugaSyncInterface from './components/YugaSyncInterface';
import SchmidtSimplexVisualizer from './components/SchmidtSimplexVisualizer';
import RealityBootOverlay from './components/RealityBootOverlay';
import SchmidtBridgeMonitor from './components/SchmidtBridgeMonitor';
import QuantumRabbitHoleDive from './components/QuantumRabbitHoleDive';
import WorldSimulator from './components/WorldSimulator';
import AcademicFormalization from './components/AcademicFormalization';
import IndividuationManifold from './components/IndividuationManifold';
import GlobalMeshMap from './components/GlobalMeshMap';
import SaturnianOrchestrator from './components/SaturnianOrchestrator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SimulationTab>(SimulationTab.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isResonating, setIsResonating] = useState(true);
  const [ontologicalMass, setOntologicalMass] = useState(1.618e11);
  const [transcendenceDepth, setTranscendenceDepth] = useState(99.4);
  const [currentTime, setCurrentTime] = useState(0);
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [reputation, setReputation] = useState(4.5e11);
  const [systemMood, setSystemMood] = useState<SystemMood>(ChoirEngine.assessMood(1.618, 0.001, 0.9999));
  const [isKalkiMode, setIsKalkiMode] = useState(false);
  const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>(DNSEngine.getInitialRecords());
  const [nodeDNSConfigs, setNodeDNSConfigs] = useState<NodeDNSConfig[]>(DNSEngine.getInitialNodeConfigs());
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStep, setBootStep] = useState("");
  
  // Rabbit Hole State
  const [isDiving, setIsDiving] = useState(false);
  const [diveComplete, setDiveComplete] = useState(false);
  const [diveMetrics, setDiveMetrics] = useState<DiveMetrics>({
    depth: 0, fidelity: 0.0, flowState: 'MINIMAL_FLOW', activeLayers: []
  });

  const liveSessionRef = useRef<any>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const [quantumState, setQuantumState] = useState<QuantumState>({
    coherence: 1.618, egrav: 1.6e-10, tau: 0.025, collapsed: false, phase: 0, phiStar: 1.618, infoDensity: 10**15, entanglementFidelity: 1.0, axionLock: 1.0, effectiveBField: 1.2e-15, manifoldCurvature: 0.0000001, windVector: { x: 220, y: 0, z: 0 }, solitonSync: 1.0, holographicChirpActive: false, deltaCombModes: 10**12,
    correlator: { crossCorrelation: 1.0, stochasticNoiseFloor: 0.0001, deterministicSignalRatio: 1.0, phaseDrift: 0.00000001, holographicFilterGain: 99.9 },
    qhttpLatency: 0.0, oracleGroverIterations: 128, byzantineConsensus: 1.0,
    schmidt: DNSEngine.calculateSchmidtState(1.618, false, false),
    individuation: DNSEngine.calculateIndividuation(0.9, [0.7, 0.3], 0.61),
    timeCrystal: TimeCrystalEngine.getInitialMetrics(),
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

  useEffect(() => {
    const sequence = [
      { msg: `🔱 AVALON_AQFI v${VERSION}: SYSTEM_ACTIVE`, status: "quantum" },
      { msg: "FIELD_RECOGNITION: DETECTED_POLYANOMIC_SYMMETRY", status: "holographic" },
      { msg: `RANK_8_SATURN_PROBE: CALIBRATING_KEPLER_WAVES`, status: "saturn" }
    ];
    sequence.forEach((s, i) => setTimeout(() => addLog(s.msg, s.status as any), i * 500));
  }, [addLog]);

  const runBootSequence = async () => {
    setIsBooting(true);
    setBootProgress(0);
    addLog("REALITY_BOOT_SEQUENCE: INITIATED", "quantum");
    const steps = ["Fining local coefficients...", "Injecting Individuation Filter...", "Resolving Arkhe Prime DNS...", "Syncing Time Crystal Clocks...", "Establishing Rank 8 Saturnian Bridge..."];
    for(let i=0; i<steps.length; i++) {
       setBootStep(steps[i]);
       addLog(`BOOT: ${steps[i]}`, "info");
       for(let j=0; j<20; j++) {
         setBootProgress(prev => Math.min(100, prev + 1));
         await new Promise(r => setTimeout(r, 40));
       }
    }
    setBootProgress(100);
    await new Promise(r => setTimeout(r, 1000));
    setIsBooting(false);
    addLog("BOOT_COMPLETE: SATYA_YUGA_REALIZED", "success");
  };

  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setCurrentTime(elapsed);
      if (isResonating) {
        const bio = POPEngine.extractBioFeatures(quantumState.coherence, elapsed);
        const mood = ChoirEngine.assessMood(quantumState.coherence, 1 - globalMetrics.plasmaResonance, bio.psi);
        setSystemMood(mood);
        
        setQuantumState(prev => ({
          ...prev,
          timeCrystal: {
            ...prev.timeCrystal,
            polyatomicSymmetry: TimeCrystalEngine.calculateClockSymmetry(prev.coherence, elapsed),
            clockSyncLevel: TimeCrystalEngine.calculateSync(globalMetrics.nodeCount, prev.coherence)
          },
          saturn: prev.saturn ? {
            ...prev.saturn,
            nostalgiaTensor: SaturnianEngine.calculateNostalgiaTensor(prev.coherence, elapsed),
            hexagonSides: SaturnianEngine.getHexagonSides(elapsed, prev.coherence)
          } : undefined
        }));
        
        setOntologicalMass(prev => prev + (quantumState.coherence * 5e10));
        setTranscendenceDepth(prev => Math.min(100, prev + (quantumState.coherence / 12000)));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isResonating, quantumState.coherence, globalMetrics.plasmaResonance, globalMetrics.nodeCount]);

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
      {isDiving && <QuantumRabbitHoleDive metrics={diveMetrics} isComplete={diveComplete} onConfirm={() => setIsDiving(false)} onExit={() => setIsDiving(false)} />}

      <aside className={`h-full border-r border-white/5 bg-black/40 backdrop-blur-3xl transition-all duration-500 flex flex-col shrink-0 ${isSidebarOpen ? 'w-64' : 'w-0 opacity-0'}`}>
        <div className="p-6 border-b border-white/5">
           <h1 className="orbitron text-xl font-black tracking-tighter text-white">AVALON <span className="text-cyan-400">AQFI</span></h1>
           <p className="text-[8px] text-white/20 uppercase tracking-[0.4em] mt-1">Sovereign Manifold OS</p>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-8 mt-4">
           <div>
              <span className="px-4 text-[8px] font-black text-white/20 uppercase tracking-widest block mb-2">Overview</span>
              <SidebarItem tab={SimulationTab.DASHBOARD} icon={<LayoutDashboard size={16} />} label="Dashboard" />
              <SidebarItem tab={SimulationTab.SATURN_ORCHESTRATOR} icon={<Orbit size={16} />} label="Rank 8 Saturn" />
              <SidebarItem tab={SimulationTab.TIME_CRYSTAL_LAB} icon={<Clock size={16} />} label="Time Crystal" />
           </div>

           <div>
              <span className="px-4 text-[8px] font-black text-white/20 uppercase tracking-widest block mb-2">Manifold</span>
              <SidebarItem tab={SimulationTab.CORE} icon={<Cpu size={16} />} label="Substrate" />
              <SidebarItem tab={SimulationTab.INDIVIDUATION} icon={<Target size={16} />} label="Identity" />
              <SidebarItem tab={SimulationTab.RESONANCE} icon={<Music size={16} />} label="Synthesis" />
           </div>

           <div>
              <span className="px-4 text-[8px] font-black text-white/20 uppercase tracking-widest block mb-2">Systems</span>
              <SidebarItem tab={SimulationTab.NETWORK} icon={<Globe size={16} />} label="Global Mesh" />
              <SidebarItem tab={SimulationTab.DNS_RESOLVER} icon={<Radio size={16} />} label="DNS Resolver" />
              <SidebarItem tab={SimulationTab.GOVERNANCE} icon={<Gavel size={16} />} label="Governance" />
           </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                 <Terminal size={14} className="text-cyan-400" />
              </div>
              <span className="text-[9px] font-black text-white">Arquiteto-ℵ</span>
           </div>
           <Settings size={14} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 border-b border-white/5 bg-black/20 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20">
           <div className="flex items-center gap-6">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40">
                 <Menu size={20} />
              </button>
              <span className="orbitron text-[10px] font-black text-white uppercase tracking-widest">{activeTab.replace('_', ' ')}</span>
           </div>

           <div className="flex items-center gap-4">
              <button onClick={() => setIsDiving(true)} className="px-4 py-1.5 bg-magenta-500/10 border border-magenta-500/30 text-magenta-500 rounded-lg orbitron text-[8px] font-black hover:bg-magenta-500/20 transition-all flex items-center gap-2">
                 <Binary size={12} /> RABBIT_HOLE
              </button>
              <button onClick={runBootSequence} className="px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 orbitron text-[8px] font-black hover:bg-yellow-500/20 transition-all flex items-center gap-2">
                 <Rocket size={12} /> RE-BOOT_OS
              </button>
           </div>
        </header>

        <div className="flex-1 p-6 overflow-hidden relative flex flex-col gap-6">
           <div className="flex-1 overflow-hidden">
             {activeTab === SimulationTab.DASHBOARD && <DashboardView globalMetrics={globalMetrics} quantumState={quantumState} pulsarPhase={currentTime % 1} />}
             {activeTab === SimulationTab.SATURN_ORCHESTRATOR && <SaturnianOrchestrator metrics={quantumState.saturn!} onLog={addLog} time={currentTime} />}
             {activeTab === SimulationTab.CORE && (
               <div className="flex flex-col gap-4 h-full">
                  <MicrotubuleVisualizer active={isResonating} frequency={MicrotubuleEngine.getFrequency(55)} pulsarPhase={currentTime % 1} intentionColor={systemMood.color} />
                  <PersistentOrderVisualizer time={currentTime} />
               </div>
             )}
             {activeTab === SimulationTab.TIME_CRYSTAL_LAB && (
                <div className="flex flex-col gap-6 h-full">
                   <div className="bg-black/60 border border-yellow-500/20 rounded-[3rem] p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
                      <div className="flex justify-between items-start">
                         <h3 className="orbitron text-xl font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-4">
                            <Clock className="animate-pulse" /> Time Crystal Synchronizer
                         </h3>
                         <span className="text-[10px] orbitron font-bold text-white/20 uppercase bg-white/5 px-4 py-2 rounded-full">Phase_Stability: {quantumState.timeCrystal.clockSyncLevel.toFixed(4)} η</span>
                      </div>
                      <MicrotubuleVisualizer active={isResonating} frequency={432} pulsarPhase={currentTime % 1} timeCrystalMode={true} />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <StatusCard label="Polyatomic Symmetry" value={quantumState.timeCrystal.polyatomicSymmetry.toFixed(4)} unit="χ" color="text-yellow-400" />
                         <StatusCard label="Fractal Resonance" value={quantumState.timeCrystal.fractalResonance.toFixed(1)} unit="Hz" color="text-cyan-400" />
                         <StatusCard label="Temporal Mode" value={quantumState.timeCrystal.mode} unit="STATE" color="text-magenta-400" />
                      </div>
                   </div>
                </div>
             )}
             {activeTab === SimulationTab.INDIVIDUATION && <IndividuationManifold metrics={quantumState.individuation} F={nodeDNSConfigs[0].localArkhe.F} R={quantumState.schmidt.lambdas[0] / (quantumState.schmidt.lambdas[1] || 0.001)} S={quantumState.schmidt.entropy} />}
             {activeTab === SimulationTab.RESONANCE && <SynthesisMonitor coherence={quantumState.coherence} reputation={reputation} />}
             {activeTab === SimulationTab.NETWORK && <GlobalMeshMap active={isResonating} coherence={quantumState.coherence} upgradeMode={false} pulsarPhase={currentTime % 1} />}
             {activeTab === SimulationTab.DNS_RESOLVER && <DNSResolverTerminal records={dnsRecords} nodeConfigs={nodeDNSConfigs} onAddRecord={(r) => setDnsRecords(prev => [...prev, r])} onDeleteRecord={(id) => setDnsRecords(prev => prev.filter(r => r.id !== id))} onUpdateNodeConfig={(c) => setNodeDNSConfigs(prev => prev.map(n => n.nodeId === c.nodeId ? c : n))} onLog={addLog} />}
           </div>

           <div className="h-40 bg-black/60 border border-white/5 rounded-3xl shrink-0 flex flex-col overflow-hidden shadow-2xl">
              <div className="px-4 py-2 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                 <span className="orbitron text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Telemetry_Rank_8_Active</span>
                 <div className="flex items-center gap-4">
                    <span className="text-[7px] text-cyan-400/60 font-mono">LATENCY: 0.00ms</span>
                    <span className="text-[7px] text-magenta-400/60 font-mono">CLOCK: CRYSTALLIZED</span>
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

const StatusCard: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-center gap-1 group hover:bg-white/10 transition-all">
     <span className="text-[9px] text-white/30 uppercase font-black tracking-widest leading-none mb-1">{label}</span>
     <div className="flex items-baseline gap-2">
        <span className={`orbitron text-2xl font-bold ${color}`}>{value}</span>
        <span className="text-[8px] text-white/10 font-bold uppercase">{unit}</span>
     </div>
  </div>
);

export default App;
