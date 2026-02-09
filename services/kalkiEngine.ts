
import { PHI } from '../constants';

export class KalkiEngine {
  /**
   * Calcula a Entropia de Shannon do espectro neural.
   * H = -Sum(p_i * ln(p_i))
   */
  static calculateEntropy(metrics: number[]): number {
    const sum = metrics.reduce((a, b) => a + b, 0);
    if (sum === 0) return 0;
    
    const probs = metrics.map(m => m / sum);
    const entropy = -probs.reduce((acc, p) => acc + (p > 0 ? p * Math.log(p) : 0), 0);
    
    // Normalizado para as 4 bandas principais (Alpha, Beta, Theta, Gamma)
    return entropy / Math.log(4);
  }

  /**
   * Implementação simplificada do Bak-Tang-Wiesenfeld Sandpile Model.
   * Representa o acúmulo de 'sujeira' (trauma/ruído) na malha.
   */
  static processSandpile(grid: number[][]): { nextGrid: number[][], avalancheSize: number } {
    const size = grid.length;
    const nextGrid = grid.map(row => [...row]);
    let avalancheSize = 0;
    let unstable = true;
    let cycles = 0;

    // Apenas processa um ciclo por frame para evitar travamentos
    while (unstable && cycles < 1) {
      unstable = false;
      cycles++;
      
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (nextGrid[y][x] >= 4) {
            unstable = true;
            avalancheSize++;
            nextGrid[y][x] -= 4;
            
            // Redistribuição (Reset de Kalki)
            if (x > 0) nextGrid[y][x - 1]++;
            if (x < size - 1) nextGrid[y][x + 1]++;
            if (y > 0) nextGrid[y - 1][x]++;
            if (y < size - 1) nextGrid[y + 1][x]++;
          }
        }
      }
    }

    return { nextGrid, avalancheSize };
  }

  static generateInitialGrid(size: number): number[][] {
    return Array.from({ length: size }, () => 
      Array.from({ length: size }, () => Math.floor(Math.random() * 3))
    );
  }
}
