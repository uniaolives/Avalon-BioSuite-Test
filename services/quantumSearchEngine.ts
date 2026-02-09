
import { PHI } from '../constants';
import { NeuralPattern, GroverSearchResult } from '../types';

export class QuantumSearchEngine {
  static IDEAL_PATTERNS: NeuralPattern[] = [
    {
      type: "FLOW_STATE",
      coherence: 0.9, entropy: 0.1, alpha: 0.6, beta: 0.4,
      theta: 0.3, gamma: 0.2, stability: 0.95, symmetry: 0.9
    },
    {
      type: "FOCUS_STATE",
      coherence: 0.85, entropy: 0.2, alpha: 0.3, beta: 0.7,
      theta: 0.2, gamma: 0.3, stability: 0.9, symmetry: 0.8
    },
    {
      type: "CALM_STATE",
      coherence: 0.8, entropy: 0.15, alpha: 0.8, beta: 0.2,
      theta: 0.4, gamma: 0.1, stability: 0.85, symmetry: 0.85
    }
  ];

  /**
   * Encodes a pattern into a discrete index for the Grover search space.
   */
  static encodePattern(p: NeuralPattern, spaceSize: number = 256): number {
    // Simple hashing for simulation
    const val = (p.coherence * 123 + p.entropy * 456 + p.alpha * 789) % spaceSize;
    return Math.floor(val);
  }

  /**
   * Run a full search simulation.
   */
  static search(current: NeuralPattern, spaceSize: number = 256): GroverSearchResult {
    const target = this.findClosestIdeal(current);
    const targetIdx = this.encodePattern(target, spaceSize);
    const maxIter = Math.floor((Math.PI / 4) * Math.sqrt(spaceSize));
    
    // We simulate 3 iterations for the "quantum boost" visualization
    const iterations = 3;
    const theta = (Math.PI / 2) * (iterations / maxIter);
    const prob = Math.pow(Math.sin(theta), 2);
    
    return {
      method: 'simulation',
      iterations,
      probability: Math.min(0.9999, prob),
      speedup: Math.sqrt(spaceSize) * prob,
      targetPattern: target,
      isIdeal: this.calculateDistance(current, target) < 0.2
    };
  }

  static findClosestIdeal(p: NeuralPattern): NeuralPattern {
    let closest = this.IDEAL_PATTERNS[0];
    let minDist = Infinity;

    for (const ideal of this.IDEAL_PATTERNS) {
      const dist = this.calculateDistance(p, ideal);
      if (dist < minDist) {
        minDist = dist;
        closest = ideal;
      }
    }
    return closest;
  }

  static calculateDistance(p1: NeuralPattern, p2: NeuralPattern): number {
    return Math.sqrt(
      Math.pow(p1.coherence - p2.coherence, 2) +
      Math.pow(p1.entropy - p2.entropy, 2) +
      Math.pow(p1.alpha - p2.alpha, 2) +
      Math.pow(p1.beta - p2.beta, 2)
    );
  }

  /**
   * Generates a "marked" superposition state for visualization.
   */
  static getGroverAmplitudes(count: number, targetIdx: number, iteration: number, maxIter: number): number[] {
    const theta = (Math.PI / 2) * (iteration / maxIter);
    const markedAmp = Math.sin(theta);
    const otherAmp = Math.cos(theta) / Math.sqrt(count - 1);
    
    return Array.from({ length: count }).map((_, i) => 
      i === targetIdx ? markedAmp : otherAmp
    );
  }
}
