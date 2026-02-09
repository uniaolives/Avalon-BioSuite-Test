
import { PHI } from '../constants';

export interface ConnectomeStats {
  originalMean: number;
  degradedMean: number;
  reconstructedMean: number;
  finalMean: number;
  connectionsLost: number;
  recoveryRate: number;
  fidelity: number;
}

export class NeuroEngine {
  static generateInitialWeights(numNeurons: number, prob: number): Float32Array {
    const weights = new Float32Array(numNeurons * numNeurons);
    for (let i = 0; i < numNeurons; i++) {
      for (let j = 0; j < numNeurons; j++) {
        if (i === j) continue;
        if (Math.random() < prob) {
          // Normal distribution-ish [0.3, 0.7]
          weights[i * numNeurons + j] = 0.5 + (Math.random() - 0.5) * 0.2;
        }
      }
    }
    return weights;
  }

  static applyCryoDegradation(weights: Float32Array, years: number, tempC: number): Float32Array {
    const degraded = new Float32Array(weights);
    const tempK = tempC + 273.15;
    const activationEnergy = 1.5e5;
    const R = 8.314;
    
    const tempFactor = Math.exp(-activationEnergy / (R * tempK));
    const degradationFactor = 0.3; // Base degradation per unit of temp-time
    const totalDegradation = 1 - Math.exp(-degradationFactor * tempFactor * years);
    
    for (let i = 0; i < degraded.length; i++) {
      if (degraded[i] > 0) {
        const damage = Math.random() * totalDegradation;
        degraded[i] *= (1 - damage);
        if (degraded[i] < 0.01) degraded[i] = 0;
      }
    }
    return degraded;
  }

  static reconstruct(weights: Float32Array, fidelity: number): Float32Array {
    const numNeurons = Math.sqrt(weights.length);
    const reconstructed = new Float32Array(weights);
    const noiseLevel = 1 - fidelity;
    
    for (let i = 0; i < reconstructed.length; i++) {
      if (reconstructed[i] > 0 || Math.random() < 0.01 * noiseLevel) {
        const noise = (Math.random() - 0.5) * 2 * noiseLevel;
        reconstructed[i] = Math.max(0, reconstructed[i] + noise);
      }
    }
    return reconstructed;
  }

  static runPlasticityStep(weights: Float32Array, firingRates: Float32Array, learningRate: number): { nextWeights: Float32Array, nextFiringRates: Float32Array } {
    const numNeurons = firingRates.length;
    const nextWeights = new Float32Array(weights);
    const nextFiringRates = new Float32Array(numNeurons);
    
    const hebbianFactor = 0.1;
    const homeostaticFactor = 0.01;

    // 1. Calculate input current and new firing rates
    for (let i = 0; i < numNeurons; i++) {
      let inputCurrent = 0;
      for (let j = 0; j < numNeurons; j++) {
        inputCurrent += weights[j * numNeurons + i] * firingRates[j];
      }
      // Sigmoid activation
      nextFiringRates[i] = 1 / (1 + Math.exp(-inputCurrent));
    }

    // 2. Hebbian update
    for (let i = 0; i < numNeurons; i++) {
      for (let j = 0; j < numNeurons; j++) {
        const idx = i * numNeurons + j;
        if (weights[idx] > 0) {
          const hebbian = nextFiringRates[i] * nextFiringRates[j];
          nextWeights[idx] += learningRate * (hebbianFactor * hebbian - homeostaticFactor * weights[idx]);
          nextWeights[idx] = Math.min(2.0, Math.max(0, nextWeights[idx]));
        }
      }
    }

    return { nextWeights, nextFiringRates };
  }

  static calculateMean(weights: Float32Array): number {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] > 0) {
        sum += weights[i];
        count++;
      }
    }
    return count > 0 ? sum / count : 0;
  }

  static countConnections(weights: Float32Array): number {
    let count = 0;
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] > 0) count++;
    }
    return count;
  }
}
