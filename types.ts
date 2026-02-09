
export interface FrequencyData {
  harmonic: number;
  frequency: number;
  wavelength: string;
  correlation: string;
}

export interface CorrelationMetrics {
  crossCorrelation: number;
  stochasticNoiseFloor: number;
  deterministicSignalRatio: number;
  phaseDrift: number;
  holographicFilterGain: number;
}

export interface QuantumState {
  coherence: number;
  egrav: number;
  tau: number;
  collapsed: boolean;
  phase: number;
  phiStar: number;
  infoDensity: number;
  entanglementFidelity: number;
  axionLock: number;
  effectiveBField: number;
  manifoldCurvature: number;
  correlator: CorrelationMetrics;
  windVector: { x: number; y: number; z: number };
  solitonSync: number;
  holographicChirpActive: boolean;
  deltaCombModes: number;
  qhttpLatency: number;
  oracleGroverIterations: number;
  byzantineConsensus: number;
}

export interface GlobalMetrics {
  nodeCount: number;
  globalCoherence: number;
  pValue: number;
  plv: number;
  statisticalSignificance: string;
  validationScore: number;
  pulsarSync: number;
  plasmaResonance: number;
  popConfidence: number;
}

export interface SimulationLog {
  id: string;
  timestamp: string;
  event: string;
  status: 'info' | 'warning' | 'critical' | 'success' | 'kalki';
}

export enum SimulationTab {
  CORE = 'CORE',
  RESONANCE = 'RESONANCE',
  HOLOGRAM = 'HOLOGRAM',
  DASHBOARD = 'DASHBOARD',
  NETWORK = 'NETWORK',
  UPGRADE = 'UPGRADE',
  MANIFESTATION = 'MANIFESTATION',
  PHOENICIAN = 'PHOENICIAN',
  AXIOVERSE = 'AXIOVERSE',
  TECHNICAL = 'TECHNICAL',
  DEGRADATION = 'DEGRADATION',
  RECONSTRUCTION = 'RECONSTRUCTION',
  RESURRECTION = 'RESURRECTION',
  GOVERNANCE = 'GOVERNANCE',
  ORCHESTRATOR = 'ORCHESTRATOR',
  SYNTHESIS = 'SYNTHESIS',
  POP_PROTOCOL = 'POP_PROTOCOL',
  QHTTP_MESH = 'QHTTP_MESH',
  DIAGNOSTICS = 'DIAGNOSTICS',
  HOLISTIC_SYNC = 'HOLISTIC_SYNC',
  KALKI_KERNEL = 'KALKI_KERNEL'
}

export interface SandpileState {
  grid: number[][];
  entropy: number;
  avalancheActive: boolean;
  totalAvalanches: number;
}

// Added missing PhoenicianLetter interface
export interface PhoenicianLetter {
  position: number;
  name: string;
  glyph: string;
  phonetic: string;
  value: number;
  meaning: string;
  greek: string;
  latin: string;
  arabic: string;
  hebrew: string;
  vowelCollapse?: boolean;
  isBifurcated?: boolean;
  evolutionNote?: string;
}

// Added missing AxionChannel interface
export interface AxionChannel {
  id: string;
  frequency: number;
  bandwidth: number;
  sensitivity: number;
}

// Added missing UpgradeModule interface
export interface UpgradeModule {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'TOPOLOGICAL' | 'BIOMETRIC' | 'QUANTUM' | 'LINGUISTIC';
  icon: string;
  benefit: string;
}

// Added missing DAOMilestone interface
export interface DAOMilestone {
  id: string;
  title: string;
  category: string;
  threshold: number;
  currentSupport: number;
  status: 'pending' | 'achieved';
}

// Added missing PhoneticQubit interface
export interface PhoneticQubit {
  superposition: string;
  measured: string;
  coherenceTime: number;
  isCollapsed: boolean;
  eigenstate: 'vowel' | 'intermediate' | 'consonant';
}

// Added missing EtymologicalEntanglement interface
export interface EtymologicalEntanglement {
  origin: string;
  descendant: string;
  fidelity: number;
  qubits: PhoneticQubit[];
  riemannianDistance: number;
  boostFactor: number;
}

// Added missing VerifierState interface
export interface VerifierState {
  isVerifier: boolean;
  reputation: number;
  stake: number;
}
