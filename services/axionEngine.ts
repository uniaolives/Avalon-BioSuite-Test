
import { PHI, MADMAX_DISK_COUNT, SPEED_OF_LIGHT } from '../constants';

export class AxionEngine {
  /**
   * Calculates the signal power boost factor for a MADMAX dielectric stack.
   * Boost Factor B relates to the number of disks and their nanometer-precision placement.
   */
  static getMadmaxBoostFactor(diskCoherence: number): number {
    const baseBoost = Math.pow(MADMAX_DISK_COUNT, 0.5);
    return baseBoost * diskCoherence * PHI;
  }

  /**
   * Calculates the longitudinal plasma frequency for the ALPHA metamaterial.
   * ω_p depends on the wire spacing and radius.
   */
  static getAlphaPlasmaFrequency(wireSpacingUm: number): number {
    const c = SPEED_OF_LIGHT / 1000; // mm/s
    return (c / (2 * wireSpacingUm / 1000)) * (1 / PHI);
  }

  /**
   * Models axion-electron coupling force for MRFM (Magnetic Resonance Force Microscopy).
   */
  static getMRFMForce(coupling: number, gradient: number): number {
    return coupling * gradient * 1e23;
  }

  /**
   * Estimates the effective magnetic field (B_eff) induced by local axion DM.
   */
  static calculateEffectiveBField(coupling: number, coherence: number): number {
    return coupling * coherence * 1e-9; // Tesla equivalent scaling
  }

  /**
   * Models the higher-dimensional residual manifold curvature.
   */
  static getManifoldCurvature(phiStar: number): number {
    return Math.sin(phiStar / PHI) * (1 / PHI);
  }

  /**
   * Detects if an Axion Minicluster is currently crossing the sensor array.
   */
  static isMiniclusterCrossing(time: number): boolean {
    const burstPhase = (time * 0.0001) % 1;
    return burstPhase > 0.9995;
  }
}
