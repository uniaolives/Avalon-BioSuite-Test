
import { PHI, CONSENSUS_THRESHOLD } from '../constants';
import { DAOMilestone } from '../types';

export class GovernanceEngine {
  /**
   * Quadratic Voting Cost: Credits = Weight^2
   */
  static getVoteCost(weight: number): number {
    return weight * weight;
  }

  /**
   * Max Weight authorized by reputation.
   */
  static getMaxWeight(reputation: number): number {
    // Scaling: 10B Rep = 100 Weight
    return Math.floor(Math.sqrt(reputation / 1e6));
  }

  /**
   * Checks if a milestone has reached Byzantine Consensus.
   */
  static checkConsensus(milestone: DAOMilestone): boolean {
    return milestone.currentSupport >= milestone.threshold;
  }

  /**
   * Health metrics for the Sovereign Mesh.
   */
  static getDAOHealth(activeNodes: number, totalReputation: number) {
    // Ideal: 100+ nodes, 16.18B+ Reputation
    const decentralization = Math.min(1.0, activeNodes / 144); // 12^2
    const participation = Math.min(1.0, totalReputation / 1.618e10);
    const securityBuffer = decentralization * participation;
    
    return {
      decentralizationScore: decentralization * 100,
      participationRate: participation * 100,
      healthIndex: (decentralization + participation + securityBuffer) / 3,
      meshStability: securityBuffer > 0.8 ? 'IMMUTABLE' : 'STABILIZING'
    };
  }

  static getConsensusDrift(coherence: number): number {
    return (coherence / PHI) * 0.034; // 34% Noise Gate influence
  }
}
