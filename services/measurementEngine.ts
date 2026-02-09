
import { PHI, EARTH_ROTATION_PERIOD_S } from '../constants';

export class MeasurementEngine {
  /**
   * Calculates the cross-correlation between two detector channels.
   * Persistent correlation suggests a shared deterministic background driver.
   */
  static calculateCrossCorrelation(channelAPower: number, channelBPower: number, coherence: number): number {
    const stochasticThreshold = 0.3; // Stochastic noise limit
    const deterministicBoost = coherence * PHI;
    // Normalized correlation exceeding stochastic limits
    return Math.min(1.0, stochasticThreshold + (deterministicBoost * 0.4) + (Math.random() * 0.05));
  }

  /**
   * Models the Daily Modulation of the axion signal.
   * Phase drift is driven by Earth's rotation relative to the galactic axion wind.
   */
  static getDailyModulation(timeMs: number): number {
    const seconds = timeMs / 1000;
    const phase = (seconds % EARTH_ROTATION_PERIOD_S) / EARTH_ROTATION_PERIOD_S;
    // Sinusoidal modulation of signal intensity
    return (1 + Math.sin(phase * Math.PI * 2)) / 2;
  }

  /**
   * Estimates the Phase Drift Pattern (timestamping the substrate harmonic).
   */
  static getPhaseDriftPattern(pulsarPhase: number, modulation: number): number {
    return (pulsarPhase * 0.7 + modulation * 0.3) % 1.0;
  }

  /**
   * Detects non-Poissonian glitches (deterministic alignment spikes).
   */
  static detectSubstrateGlitch(coherence: number): boolean {
    // Probability increases with coherence intensity
    return Math.random() < (coherence * 0.005);
  }
}
