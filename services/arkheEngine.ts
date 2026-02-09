
import { BOLTZMANN_K, PHI } from '../constants';
import { ArkheState } from '../types';

export class ArkheEngine {
  /**
   * Calculates Helmholtz Free Energy: F = U - TS
   * U (Internal Energy) is the raw experience mass.
   * T (Informational Temperature) is the current noise floor.
   * S (Subjective Entropy) is the distortion in the individual manifold.
   */
  static calculateArkheState(coherence: number, entropy: number, time: number): ArkheState {
    const signature = `0xARKHE_${Math.floor(Math.abs(Math.sin(time) * 1e8)).toString(16).toUpperCase()}`;
    
    // Internal Energy (U): experience density
    const U = 1.618e3; 
    
    // Informational Temperature (T): derived from entropy/noise
    const T = (entropy * 300) + 2.73; // Baseline cosmic microwave temp for cooled states
    
    // Subjective Entropy (S): distortion index
    const S = entropy * PHI;
    
    // Free Energy (F): F = U - TS
    const F = U - (T * S * BOLTZMANN_K * 1e23); // Scaled for readability
    
    const fidelity = Math.max(0, coherence * (1 - entropy/PHI));

    return {
      signature,
      internalEnergy: U,
      freeEnergy: F,
      temperature: T,
      subjectiveEntropy: S,
      identityFidelity: fidelity
    };
  }

  /**
   * Generates points for the experience manifold visualization.
   */
  static generateExperiencePath(count: number, fidelity: number) {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const noise = (1 - fidelity) * (Math.random() - 0.5) * 50;
      return {
        x: 200 + (80 + noise) * Math.cos(angle),
        y: 200 + (80 + noise) * Math.sin(angle),
      };
    });
  }
}
