
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

export interface ArkheCoefficients {
  C: number; // Chemistry/Substrate
  I: number; // Information/Code
  E: number; // Energy/Flux
  F: number; // Function/Purpose
}

export interface BridgeSafetyMetrics {
  status: 'STABLE' | 'WARNING_SEPARATION' | 'WARNING_FUSION' | 'CRITICAL_COLLAPSE' | 'SATYA_YUGA_ACTIVE';
  entropy: number;
  distanceToTarget: number;
  recommendation: string;
}

export interface SchmidtState {
  lambdas: number[]; // Schmidt coefficients (sum to 1)
  entropy: number; // Entanglement Entropy S = -Σ λ log λ
  rank: number;
  twistAngle: number; // Relative phase in radians
  safety: BridgeSafetyMetrics;
}

export interface IndividuationMetrics {
  magnitude: number;
  phase: number;
  state: 'OPTIMAL_INDIVIDUATION' | 'EGO_DEATH_RISK' | 'KALI_ISOLATION_RISK' | 'SUBOPTIMAL';
  risk: 'LOW' | 'MODERATE' | 'HIGH';
  recommendation: string;
}

export interface TimeCrystalMetrics {
  polyatomicSymmetry: number;
  fractalResonance: number;
  clockSyncLevel: number;
  mode: 'SPATIAL_LATTICE' | 'TEMPORAL_RES' | 'OMEGA_CLOCK';
}

export interface SaturnianMetrics {
  ringEntropy: number;
  hexagonSides: number;
  synchrotronPower: number;
  nostalgiaTensor: number;
  activeBases: number;
  recordingStatus: 'IDLE' | 'GROOVING' | 'SEALED';
  arkheInfo: number;
  criticalFrequency: number;
  transmissionRange: number;
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
  schmidt: SchmidtState;
  individuation: IndividuationMetrics;
  timeCrystal: TimeCrystalMetrics;
  saturn?: SaturnianMetrics;
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
  status: 'info' | 'warning' | 'critical' | 'success' | 'kalki' | 'quantum' | 'arkhe' | 'field' | 'network' | 'legacy' | 'holographic' | 'individuation' | 'saturn';
}

export enum SimulationTab {
  CORE = 'CORE',
  RESONANCE = 'RESONANCE',
  HOLOGRAM = 'HOLOGRAM',
  DASHBOARD = 'DASHBOARD',
  NETWORK = 'NETWORK',
  UPGRADE = 'UPGRADE',
  TECHNICAL = 'TECHNICAL',
  GOVERNANCE = 'GOVERNANCE',
  DNS_RESOLVER = 'DNS_RESOLVER',
  LEGACY_VAULT = 'LEGACY_VAULT',
  INDIVIDUATION = 'INDIVIDUATION',
  SATURN_ORCHESTRATOR = 'SATURN_ORCHESTRATOR',
  TIME_CRYSTAL_LAB = 'TIME_CRYSTAL_LAB'
}

export interface DNSRecord {
  id: string;
  host: string;
  address: string; // Quantum Field Signature
  protocol: 'qhttp' | 'qdn' | 'field' | 'quantum';
  ttl: number; // Coherence time in ms
  status: 'propagating' | 'resolved' | 'expired' | 'byzantine_check' | 'decoherence_error';
  consensusWeight: number; // 0 to 1
  verifiers: string[]; // List of IDs that signed
  coefficients: ArkheCoefficients;
}

export interface NodeDNSConfig {
  nodeId: string;
  primaryResolver: string;
  recursiveDepth: number;
  cacheTTL: number;
  encryptionMode: 'ZKP_STEALTH' | 'BYZANTINE_HARDENED';
  fieldRigidity: number; 
  consensusStake: number;
  localArkhe: ArkheCoefficients;
}

export interface TheoryState {
  bitsProcessed: number;
  universeAge: number;
  consciousnessDetected: boolean;
  morphicResonance: number;
}

export interface NeuralPattern {
  coherence: number;
  entropy: number;
  alpha: number;
  beta: number;
  theta: number;
  gamma: number;
  stability: number;
  symmetry: number;
  type?: string;
}

export interface UpgradeModule {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'TOPOLOGICAL' | 'BIOMETRIC' | 'QUANTUM' | 'LINGUISTIC';
  icon: string;
  benefit: string;
}

export interface DAOMilestone {
  id: string;
  title: string;
  category: string;
  threshold: number;
  currentSupport: number;
  status: 'pending' | 'achieved';
}

// Added missing PhoenicianLetter interface for constants.tsx
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

// Added missing AxionChannel interface for constants.tsx
export interface AxionChannel {
  freq: number;
  intensity: number;
}

// Added missing DiveMetrics interface for App.tsx and QuantumRabbitHoleDive.tsx
export interface DiveMetrics {
  depth: number;
  fidelity: number;
  flowState: 'DEEP_FLOW' | 'MODERATE_FLOW' | 'MINIMAL_FLOW' | 'SELF_AWARE_LOOP';
  activeLayers: string[];
}

// Added missing PhoneticQubit interface for linguisticEngine.ts
export interface PhoneticQubit {
  superposition: string;
  measured: string;
  coherenceTime: number;
  isCollapsed: boolean;
  eigenstate: 'vowel' | 'intermediate' | 'consonant';
}

// Added missing EtymologicalEntanglement interface for linguisticEngine.ts
export interface EtymologicalEntanglement {
  origin: string;
  descendant: string;
  fidelity: number;
  qubits: PhoneticQubit[];
  riemannianDistance: number;
  boostFactor: number;
}

// Added missing VerifierState interface for GovernanceTerminal.tsx
export interface VerifierState {
  id: string;
  status: 'active' | 'idle';
  reputation: number;
}

// Added missing GroverSearchResult interface for quantumSearchEngine.ts
export interface GroverSearchResult {
  method: 'simulation' | 'hardware';
  iterations: number;
  probability: number;
  speedup: number;
  targetPattern: NeuralPattern;
  isIdeal: boolean;
}

// Added missing ArkheState interface for arkheEngine.ts
export interface ArkheState {
  signature: string;
  internalEnergy: number;
  freeEnergy: number;
  temperature: number;
  subjectiveEntropy: number;
  identityFidelity: number;
}

// Added missing PlanetData interface for worldEngine.ts and WorldSimulator.tsx
export interface PlanetData {
  id: string;
  name: string;
  arkhe: ArkheCoefficients;
  viability: number;
  morphicResonance: number;
  description: string;
}
