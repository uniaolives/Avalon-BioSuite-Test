
import { PHI, BASE_FREQ, PLANCK_HBAR, G_CONSTANT, TUBULIN_MASS, TARGET_COHERENCE, MAGNETIC_MOMENT_BOHR } from '../constants';

export class MicrotubuleEngine {
  static getFrequency(n: number): number {
    return BASE_FREQ * Math.pow(PHI, n);
  }

  static calculateCollapse(tubulinCount: number, stabilityFactor: number = 1.0) {
    const totalMass = tubulinCount * TUBULIN_MASS;
    const separation = 8e-9; // Penrose separation: approximately tubulin diameter (8nm)
    
    // E_G = G * M^2 / R
    const egrav = (G_CONSTANT * Math.pow(totalMass, 2)) / separation;
    
    // Tau = hbar / E_G, adjusted by stability factor (current_stability in C++)
    const tau = (PLANCK_HBAR / egrav) / stabilityFactor;
    
    return {
      egrav,
      tau,
      eventsPerSec: 1 / tau
    };
  }

  static calculateInformationDensity(coherence: number, vortexCharge: number): number {
    const quantumStatesPerTubulin = 1024.0; // 2^10 as per Hameroff/C++ Spec
    const fringeFactor = (coherence / PHI) * (1 + (vortexCharge * 0.15));
    return quantumStatesPerTubulin * Math.abs(fringeFactor);
  }

  static calculatePhiStar(infoDensity: number, networkCoherence: number): number {
    // Φ* - Integrated Information for quantum systems, scaled by Phi
    return infoDensity * networkCoherence * PHI;
  }

  static calculateEntanglementFidelity(coherence: number, isResonating: boolean): number {
    if (!isResonating) return 0;
    // Fidelity is a function of coherence intensity and resonance lock
    return Math.min(1.0, (coherence / PHI) * (0.8 + Math.random() * 0.2));
  }

  static getBioHealingCorrection(currentCoherence: number) {
    const deviation = TARGET_COHERENCE - currentCoherence;
    if (deviation > 0.1) {
      const correctionFreq = BASE_FREQ * (1 + (deviation * PHI));
      return {
        active: true,
        correctionFreq,
        intensity: deviation * 2.0
      };
    }
    return { active: false, correctionFreq: BASE_FREQ, intensity: 0 };
  }

  static calculateMagneticPhaseShift(tesla: number): number {
    return (MAGNETIC_MOMENT_BOHR * tesla) / PLANCK_HBAR;
  }

  static getPhiHarmonics(count: number = 29) {
    return Array.from({ length: count }, (_, i) => ({
      harmonic: i,
      freq: this.getFrequency(i)
    }));
  }
}
