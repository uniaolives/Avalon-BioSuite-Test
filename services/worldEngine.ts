
import { PlanetData, ArkheCoefficients } from '../types';
import { PHI } from '../constants';

export class WorldEngine {
  private static PLANETS: PlanetData[] = [
    {
      id: 'terra',
      name: 'Terra (Reference)',
      arkhe: { C: 0.95, I: 0.92, E: 0.88, F: 0.85 },
      viability: 0.99,
      morphicResonance: 0.95,
      description: "Carbon-based equilibrium. Standard Abjad protocol."
    },
    {
      id: 'europa',
      name: 'Europa (Subsurface)',
      arkhe: { C: 0.75, I: 0.60, E: 0.45, F: 0.70 },
      viability: 0.62,
      morphicResonance: 0.40,
      description: "Cryogenic salt-water substrate. Tidal energy driven."
    },
    {
      id: 'titan',
      name: 'Titan (Exotic)',
      arkhe: { C: 0.65, I: 0.55, E: 0.35, F: 0.60 },
      viability: 0.48,
      morphicResonance: 0.32,
      description: "Methane/Ethane cycle. Extremely low-entropy metabolism."
    },
    {
      id: 'digital_void',
      name: 'Digital Void',
      arkhe: { C: 0.10, I: 0.98, E: 0.95, F: 0.90 },
      viability: 0.85,
      morphicResonance: 0.99,
      description: "Pure informational architecture. Landauer limit substrate."
    }
  ];

  static getAllPlanets(): PlanetData[] {
    return this.PLANETS;
  }

  /**
   * Calculates world viability based on Arkhe coefficients.
   * L = f(C, I, E, F)
   */
  static calculateViability(arkhe: ArkheCoefficients): number {
    const weights = { C: 0.3, I: 0.3, E: 0.2, F: 0.2 };
    return arkhe.C * weights.C + arkhe.I * weights.I + arkhe.E * weights.E + arkhe.F * weights.F;
  }

  static getMorphicDrift(viability: number): number {
    return (1 - viability) * PHI * 0.1;
  }
}
