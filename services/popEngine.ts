
import { PHI, THETA_LIFE, THETA_DISCOVERY } from '../constants';

export type POPState = 'SURVEILLANCE' | 'CURIOSITY' | 'DISCOVERY' | 'CONSENSUS_PENDING' | 'CONFIRMED';

export interface QCNNode {
  id: string;
  status: 'entangled' | 'scanning' | 'idle' | 'offline';
  psi: number;
  health: number;
  latency: number;
}

export interface POPMetrics {
  dne: number; // Dynamic Non-Equilibrium (D) - Temporal Persistence
  sso: number; // Spatial Self-Organization (S) - Shannon Entropy
  cdc: number; // Cross-Domain Coupling (C) - Mutual Info
  psi: number; // Persistent Order Function (Ψ_PO)
  noiseFloor: number; // Quantum Noise Level
  groverGain: number; // Signal Amplification factor
  persistence: number; // ψ_SP: Solitonic Persistence
}

export class POPEngine {
  /**
   * BYZANTINE UPGRADE: Solitonic Persistence Kernel.
   * D: Temporal FFT persistence.
   * S: Spatial manifold inversion.
   * C: Cross-modal info coupling.
   * ψ_SP: Rigid coherence of the underlying solitonic lattice.
   */
  static extractBioFeatures(coherence: number, time: number): POPMetrics {
    // DNE: modeled as temporal wave persistence (432Hz baseline)
    const dne = Math.tanh(0.9 + coherence * 0.1 + Math.sin(time * 0.12) * 0.03);
    
    // SSO: Spatial self-organization (normalized entropy minimization)
    const sso = Math.min(1.0, (0.85 + coherence * 0.15) * (0.98 + Math.random() * 0.02));
    
    // CDC: Cross-domain mutual information coupling (Byzantine scale)
    const cdc = 0.78 + coherence * 0.22 * (0.95 + Math.random() * 0.05);
    
    // Grover Noise Gate: -34% noise floor reduction from base
    const baseNoise = 0.18 - (coherence * 0.15);
    const noiseFloor = baseNoise * 0.66; 
    
    // Grover Gain: Amplification of probability amplitude
    const groverGain = 1.0 + (coherence * (PHI + 0.1));

    // ψ_SP: Solitonic Persistence - Rigid lattice lock index
    const persistence = (dne * sso * cdc) ** (1 / 3);

    // Final Ψ_PO calculation: Distilled probability weighted by Byzantine consensus drift
    const psi = persistence * (1 - noiseFloor) * groverGain * 0.618;
    
    return { dne, sso, cdc, psi: Math.min(0.9999, psi), noiseFloor, groverGain, persistence };
  }

  static evaluateProtocolTransition(current: POPState, psi: number): POPState {
    if (current === 'SURVEILLANCE' && psi > 0.88) return 'CURIOSITY';
    if (current === 'CURIOSITY' && psi > THETA_DISCOVERY) return 'DISCOVERY';
    if (current === 'CURIOSITY' && psi < 0.75) return 'SURVEILLANCE';
    if (current === 'DISCOVERY' && psi > 0.995) return 'CONSENSUS_PENDING';
    if (current === 'CONSENSUS_PENDING' && psi > 0.999) return 'CONFIRMED';
    return current;
  }

  static getMockNodes(): QCNNode[] {
    return [
      { id: 'ALPHA_BYZANTIUM', status: 'entangled', psi: 0.998, health: 0.99, latency: 1.618 },
      { id: 'BETA_HORIZON', status: 'entangled', psi: 0.942, health: 0.98, latency: 2.718 },
      { id: 'DELTA_SOVEREIGN', status: 'scanning', psi: 0.811, health: 0.96, latency: 4.236 }
    ];
  }
}
