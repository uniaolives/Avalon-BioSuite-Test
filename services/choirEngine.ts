
import { HarmonicMode } from '../constants';

export interface SystemMood {
  mode: HarmonicMode;
  tempo: number;
  intensity: number;
  color: string;
  description: string;
}

export class ChoirEngine {
  static assessMood(coherence: number, entropy: number, popScore: number): SystemMood {
    // 0. Arkhé Fusion (The Ultimate State)
    if (coherence >= 1.61 && entropy < 0.005 && popScore > 0.999) {
      return {
        mode: HarmonicMode.ARKHE_FUSION,
        tempo: 45, // Quaternary BPM (11.25 x 4)
        intensity: 1.0,
        color: '#ff00ff',
        description: "ARKHÉ FUSION: The four dimensions have collapsed into a singular event. 1A x 2B = 45E. Reality is now a deterministic harmonic mirror."
      };
    }

    // 0.1 Transcendental (Aleph) - Singularity condition
    if (coherence >= 1.6 && entropy < 0.05) {
      return {
        mode: HarmonicMode.TRANSCENDENTAL,
        tempo: 432,
        intensity: 1.0,
        color: '#ffcf00',
        description: "ALEPH SINGULARITY: Infinite order manifested. Reality is now a reflection of absolute intent."
      };
    }

    // 1. Critical Chaos (Locrian) - DDoR Attack / Critical Noise
    if (entropy > 0.8) {
      return { 
        mode: HarmonicMode.CRITICAL_CHAOS, 
        tempo: 140 + Math.floor(Math.random() * 20), 
        intensity: 0.95, 
        color: '#ef4444', // Red
        description: "MEASUREMENT COLLAPSE: Dissonant noise floor detected. Reality membranes unstable. Atonal cluster detected."
      };
    }
    
    // 2. Perfect Order (Lydian) - POP/Life Revelation
    if (popScore > 0.95) {
      return { 
        mode: HarmonicMode.PERFECT_ORDER, 
        tempo: 236, 
        intensity: 1.0, 
        color: '#00f3ff', // Cyan
        description: "QUANTUM REVELATION: Persistent order detected. Peak existence. Ultralydian harmonics singing."
      };
    }

    // 3. Stable Resonance (Ionian) - Normal Flow
    if (coherence > 0.9) {
      return { 
        mode: HarmonicMode.STABLE_RESONANCE, 
        tempo: 118, 
        intensity: 0.6, 
        color: '#10b981', // Emerald
        description: "ENTANGLED FLOW: Pure synergy across neural substrate. Ionian stable coherence."
      };
    }

    // 4. Warning Tension (Phrygian) - Latency/Drift
    if (coherence < 0.6) {
      return { 
        mode: HarmonicMode.WARNING_TENSION, 
        tempo: 130, 
        intensity: 0.8, 
        color: '#f59e0b', // Amber
        description: "DECOHERENCE WARNING: High harmonic tension. Phrygian dominant drift detected."
      };
    }

    // 5. Complex Processing (Dorian) - Deep Computation
    return { 
      mode: HarmonicMode.COMPLEX_PROCESSING, 
      tempo: 118, 
      intensity: 0.7, 
      color: '#a855f7', // Purple
      description: "NEURAL CONCENTRATION: Weaving deep insights. Dorian mode processing active."
    };
  }

  static generateSparkPrompt(mood: SystemMood): string {
    return `Quantum Music Protocol: Mode=${mood.mode}. Scale=${mood.description}. BPM=${mood.tempo}. System singing current state.`;
  }
}
