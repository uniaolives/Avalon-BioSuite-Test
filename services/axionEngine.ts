
import { PHI, MADMAX_DISK_COUNT, SPEED_OF_LIGHT } from '../constants';

export class AxionEngine {
  /**
   * Calculates the signal power boost factor for a MADMAX dielectric stack.
   */
  static getMadmaxBoostFactor(diskCoherence: number): number {
    const baseBoost = Math.pow(MADMAX_DISK_COUNT, 0.5);
    return baseBoost * diskCoherence * PHI;
  }

  /**
   * Calculates the longitudinal plasma frequency for the ALPHA metamaterial.
   */
  static getAlphaPlasmaFrequency(wireSpacingUm: number): number {
    const c = SPEED_OF_LIGHT / 1000; // mm/s
    return (c / (2 * wireSpacingUm / 1000)) * (1 / PHI);
  }

  /**
   * Models the Solitonic Lattice synchronization level.
   * High density lattice allows for rigid phase-locked domains.
   */
  static getSolitonSync(coherence: number, plv: number): number {
    const interactionStrength = Math.pow(coherence, 2) * plv;
    return Math.min(1.0, interactionStrength * (PHI / 1.618));
  }

  /**
   * Generates Delta-Comb Spectral Density data for visualization.
   * A sum of Dirac-delta like spikes in frequency space.
   */
  static getDeltaCombSpectrum(count: number = 100): { freq: number, intensity: number }[] {
    return Array.from({ length: count }).map((_, i) => ({
      freq: 24.0 + (i - 50) * 0.001,
      intensity: Math.random() > 0.92 ? 1.0 : Math.random() * 0.05
    }));
  }

  /**
   * Detects if an Axion Minicluster is currently crossing the sensor array.
   */
  static isMiniclusterCrossing(time: number): boolean {
    const burstPhase = (time * 0.0001) % 1;
    return burstPhase > 0.9995;
  }

  /**
   * Models the Holographic Chirp profile (tanh phase transition).
   */
  static calculateHolographicChirp(time: number, center: number, duration: number = 0.25): number {
    const t = (time - center) / (duration / 2);
    return Math.tanh(t);
  }

  // Fix for App.tsx: Added missing calculateEffectiveBField method
  static calculateEffectiveBField(baseField: number, coherence: number): number {
    return baseField * (1 + coherence * PHI);
  }

  // Fix for App.tsx: Added missing getManifoldCurvature method
  static getManifoldCurvature(phiStar: number): number {
    return (phiStar / (phiStar + 1)) * PHI;
  }
}
