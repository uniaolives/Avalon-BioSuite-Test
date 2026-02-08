
export interface FrequencyData {
  harmonic: number;
  frequency: number;
  wavelength: string;
  correlation: string;
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
  axionLock: number; // 0 to 1
  effectiveBField: number; // Effective magnetic field from axion coupling
  manifoldCurvature: number; // Residual vibration of higher dimensions
}

export interface GlobalMetrics {
  nodeCount: number;
  globalCoherence: number;
  pValue: number;
  plv: number; // Phase Locking Value
  statisticalSignificance: string;
  validationScore: number;
  pulsarSync: number; // 0 to 1
  plasmaResonance: number; // ALPHA protocol
}

export interface SimulationLog {
  id: string;
  timestamp: string;
  event: string;
  status: 'info' | 'warning' | 'critical' | 'success';
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
  AXIOVERSE = 'AXIOVERSE'
}

export interface IntentionProtocol {
  id: string;
  name: string;
  description: string;
  requiredCoherence: number;
  powerCost: number;
  color: string;
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
  evolutionNote?: string;
  vowelCollapse?: boolean;
  isBifurcated?: boolean;
  degeneracyLifted?: boolean;
  axionFrequency?: number; // Related ALP frequency in GHz
}

export interface PhoneticQubit {
  superposition: string; // Implicit vowel (Abjad)
  measured: string;      // Explicit vowel (Alphabet)
  coherenceTime: number; // In hypothetical ms
  isCollapsed: boolean;
  eigenstate: 'consonant' | 'vowel' | 'intermediate';
}

export interface EtymologicalEntanglement {
  origin: string;
  descendant: string;
  fidelity: number;
  qubits: PhoneticQubit[];
  riemannianDistance: number;
  boostFactor?: number; // MADMAX interference boost
}

export interface AxionChannel {
  mass: number; // meV scale
  frequency: number; // GHz/THz
  coupling: number; // g_ag or g_ae
  mode: 'Photon' | 'Spin' | 'Mechanical';
  status: 'scanning' | 'locked' | 'noise';
}

export interface DeciphermentResult {
  modern: string;
  phoenician: string;
  resonanceScore: number;
  lineage: string;
}
