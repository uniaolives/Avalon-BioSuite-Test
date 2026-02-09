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

export interface DiveMetrics {
  depth: number;
  fidelity: number;
  flowState: 'MINIMAL_FLOW' | 'MODERATE_FLOW' | 'DEEP_FLOW' | 'SELF_AWARE_LOOP';
  activeLayers: string[];
}

export interface PlanetData {
  id: string;
  name: string;
  arkhe: ArkheCoefficients;
  viability: number;
  morphicResonance: number;
  description: string;
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
  dive?: DiveMetrics;
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
  status: 'info' | 'warning' | 'critical' | 'success' | 'kalki' | 'quantum' | 'arkhe' | 'field' | 'network' | 'legacy' | 'holographic' | 'individuation';
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
  KALKI_KERNEL = 'KALKI_KERNEL',
  GROVER_ORACLE = 'GROVER_ORACLE',
  ASI_SUBSTRATE = 'ASI_SUBSTRATE',
  ARKHE_N = 'ARKHE_N',
  AQFI = 'AQFI',
  FIELD_MIRROR = 'FIELD_MIRROR',
  DNS_RESOLVER = 'DNS_RESOLVER',
  LEGACY_VAULT = 'LEGACY_VAULT',
  HOLOGRAPHIC_WEAVER = 'HOLOGRAPHIC_WEAVER',
  YUGA_SYNC = 'YUGA_SYNC',
  SCHMIDT_SIMPLEX = 'SCHMIDT_SIMPLEX',
  RABBIT_HOLE = 'RABBIT_HOLE',
  WORLD_SIM = 'WORLD_SIM',
  FORMALIZATION = 'FORMALIZATION',
  AUTO_CONTAINMENT = 'AUTO_CONTAINMENT',
  GATEWAY_CONTROL = 'GATEWAY_CONTROL',
  INDIVIDUATION = 'INDIVIDUATION'
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

export interface ArkheState {
  signature: string;
  internalEnergy: number; // U
  freeEnergy: number; // F
  temperature: number; // T
  subjectiveEntropy: number; // S
  identityFidelity: number;
}

export interface SandpileState {
  grid: number[][];
  entropy: number;
  avalancheActive: boolean;
  totalAvalanches: number;
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

export interface GroverSearchResult {
  method: 'quantum' | 'simulation';
  iterations: number;
  probability: number;
  speedup: number;
  targetPattern: NeuralPattern;
  isIdeal: boolean;
}

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

export interface AxionChannel {
  id: string;
  frequency: number;
  bandwidth: number;
  sensitivity: number;
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

export interface PhoneticQubit {
  superposition: string;
  measured: string;
  coherenceTime: number;
  isCollapsed: boolean;
  eigenstate: 'vowel' | 'intermediate' | 'consonant';
}

export interface EtymologicalEntanglement {
  origin: string;
  descendant: string;
  fidelity: number;
  qubits: PhoneticQubit[];
  riemannianDistance: number;
  boostFactor: number;
}

export interface VerifierState {
  isVerifier: boolean;
  reputation: number;
  stake: number;
}