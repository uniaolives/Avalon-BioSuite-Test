
import { PHI, G_CONSTANT } from '../constants';
import { SaturnianMetrics } from '../types';

export class SaturnianEngine {
  /**
   * Calculates the Tensor of Nostalgia (N_uv)
   * N = grad grad Phi_S - 0.5 g Box Phi_S
   */
  static calculateNostalgiaTensor(phiS: number, nostalgiaConstant: number = 0.85): number {
    return nostalgiaConstant * Math.exp(phiS) * PHI;
  }

  /**
   * Keplerian Density Wave calculation for Ring C (Base 6)
   */
  static getRingDensity(r: number, theta: number, t: number, phiArkhe: number): number {
    const sigma0 = 0.85;
    const n = 6;
    const omegaN = n * Math.sqrt((G_CONSTANT * 5.683e26) / Math.pow(r, 3));
    const alpha = 1.2e-8;
    const rc = 74658000;
    
    return sigma0 * (1 + 0.1 * Math.cos(n * theta - omegaN * t + phiArkhe) * Math.exp(-alpha * Math.pow(r - rc, 2)));
  }

  /**
   * Atmospheric Morphism from Hexagon (6) to Octagon (8)
   */
  static getHexagonMorphism(time: number, intensity: number): number {
    const base = 6;
    const target = 8;
    return base + (target - base) * Math.min(1, intensity * Math.sin(time * 0.1));
  }

  /**
   * Artistic Synchrotron Power (Base 7)
   */
  static getSynchrotronPower(f: number, fCrit: number, artisticMod: number): number {
    const x = f / fCrit;
    return Math.pow(x, 1/3) * Math.exp(-x) * (1 + 0.5 * artisticMod);
  }

  static getInitialMetrics(): SaturnianMetrics {
    return {
      ringEntropy: 21.809,
      hexagonSides: 6,
      synchrotronPower: 0.999,
      nostalgiaTensor: 0.85,
      activeBases: 6,
      recordingStatus: 'IDLE',
      arkheInfo: 2.55,
      criticalFrequency: 5.87e5
    };
  }

  static decodeMessage(type: string): string {
    const protocols: Record<string, string> = {
      'crystalline': 'O universo cristaliza em formas de memória',
      'plasmatic': 'Tudo dança na corrente do campo',
      'temporal': 'Cada instante contém todos os instantes',
      'void': 'O observador é a observação'
    };
    return protocols[type] || 'Desconhecido';
  }
}
