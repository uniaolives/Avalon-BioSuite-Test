
import { PHI } from '../constants';

export interface HolographicFragment {
  id: number;
  position: { x: number; y: number; z: number };
  coherence: number;
  isTraumatized: boolean;
}

export class HolographicEngine {
  /**
   * Generates a fragmented holographic signature for the Weaver.
   */
  static generateArkheFragments(count: number, noise: number): HolographicFragment[] {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 100 + (Math.random() - 0.5) * noise * 50;
      return {
        id: i,
        position: {
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
          z: (Math.random() - 0.5) * 40
        },
        coherence: Math.random() > noise ? 1.0 : 0.2,
        isTraumatized: Math.random() < noise
      };
    });
  }

  /**
   * Reconstructs a fragment using field redundancy.
   */
  static weave(fragment: HolographicFragment, fieldCoherence: number): HolographicFragment {
    if (!fragment.isTraumatized) return fragment;
    
    // Recovery based on AQFI Field Coherence
    const recoveryChance = fieldCoherence / PHI;
    if (Math.random() < recoveryChance) {
      return {
        ...fragment,
        isTraumatized: false,
        coherence: 0.95
      };
    }
    return fragment;
  }

  /**
   * Calculates Phase Sync Delta.
   * Delta = pi implies destructive trauma loop.
   */
  static getPhaseSync(time: number, traumaFactor: number): number {
    const basePhase = (time * 0.5) % (Math.PI * 2);
    const traumaShift = traumaFactor * Math.PI; // Max shift is pi (destruction)
    return Math.cos(basePhase) + Math.cos(basePhase + traumaShift);
  }
}
