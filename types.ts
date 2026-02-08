
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
  NETWORK = 'NETWORK'
}
