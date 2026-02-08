
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
}

export interface GlobalMetrics {
  nodeCount: number;
  globalCoherence: number;
  pValue: number;
  plv: number; // Phase Locking Value
  statisticalSignificance: string;
  validationScore: number;
  pulsarSync: number; // 0 to 1
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
  MANIFESTATION = 'MANIFESTATION'
}

export interface IntentionProtocol {
  id: string;
  name: string;
  description: string;
  requiredCoherence: number;
  powerCost: number;
  color: string;
}
