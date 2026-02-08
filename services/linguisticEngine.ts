
import { PHOENICIAN_ALPHABET, PHOENICIAN_GEMATRIA_COEFFICIENT, PHI } from '../constants';
import { PhoneticQubit, EtymologicalEntanglement } from '../types';

export interface PhoneticAnalysis {
  degutturalization: number;
  desenfatizacao: number;
  palatalization: number;
  simplification: number;
  regularization: number;
  complexityIndex: number;
  fidelity: number;
}

export class LinguisticEngine {
  private static translationMap: Record<string, string> = {
    'a': '𐤀', 'b': '𐤁', 'c': '𐤂', 'd': '𐤃', 'e': '𐤄',
    'f': '𐤅', 'g': '𐤂', 'h': '𐤇', 'i': '𐤉', 'j': '𐤉',
    'k': '𐤊', 'l': '𐤋', 'm': '𐤌', 'n': '𐤍', 'o': '𐤏',
    'p': '𐤐', 'q': '𐤒', 'r': '𐤓', 's': '𐤔', 't': '𐤕',
    'u': '𐤅', 'v': '𐤅', 'w': '𐤅', 'x': '𐤎', 'y': '𐤉',
    'z': '𐤆'
  };

  private static articulationMap: Record<string, number> = {
    'glottal': 0,
    'pharyngeal': 1,
    'uvular': 2,
    'velar': 3,
    'palatal': 4,
    'alveolar': 5,
    'dental': 6,
    'labial': 7,
    'vocalic': 3.5 // Vowels sit in the geometric center of the manifold
  };

  static translateToPhoenician(text: string): string {
    return text.toLowerCase().split('').map(char => {
      if (char === ' ') return '   ';
      return this.translationMap[char] || '?';
    }).join('');
  }

  static calculateGematria(text: string): number {
    let total = 0;
    const phoenician = this.translateToPhoenician(text);
    
    const characters = Array.from(phoenician);
    for (const char of characters) {
      const letter = PHOENICIAN_ALPHABET.find(l => l.glyph === char);
      if (letter) {
        total += letter.value;
      }
    }
    
    return Math.floor(total * PHOENICIAN_GEMATRIA_COEFFICIENT);
  }

  static calculateLinguisticEntropy(text: string): number {
    const counts: Record<string, number> = {};
    const characters = Array.from(this.translateToPhoenician(text)).filter(c => c !== ' ' && c !== '?');
    
    if (characters.length === 0) return 0;

    characters.forEach(char => {
      counts[char] = (counts[char] || 0) + 1;
    });

    let entropy = 0;
    const total = characters.length;
    for (const char in counts) {
      const p = counts[char] / total;
      entropy -= p * Math.log2(p);
    }

    return entropy;
  }

  /**
   * Models the 800 BCE Phonetic Collapse as a transition between quantum-like states.
   * Treating the transition from Abjad (Implicit) to Alphabet (Explicit) as a measurement event.
   */
  static generateEntanglementLayer(text: string): EtymologicalEntanglement {
    const phoenicianText = this.translateToPhoenician(text);
    const glyphs = Array.from(phoenicianText).filter(g => g !== ' ' && g !== '?');
    
    let cumulativeRiemannianDistance = 0;

    const qubits: PhoneticQubit[] = glyphs.map(glyph => {
      const letter = PHOENICIAN_ALPHABET.find(l => l.glyph === glyph);
      const isVowel = letter?.vowelCollapse || false;
      const isBifurcated = letter?.isBifurcated || false;
      
      // Riemannian Metric Calculation: Distance between Phoenician origin and Greek measured state
      const originPoint = this.getArticulationPoint(glyph);
      const measuredPoint = isVowel ? this.articulationMap['vocalic'] : originPoint;
      const delta = Math.abs(measuredPoint - originPoint);
      cumulativeRiemannianDistance += delta * (1 / PHI);

      // Coherence time models the duration of phonetic ambiguity before measurement
      const baseTime = isVowel ? 161.8 : 432;
      const noise = Math.random() * 50;
      
      return {
        superposition: glyph,
        measured: letter?.greek || '?',
        coherenceTime: baseTime + noise,
        isCollapsed: Math.random() > 0.05, 
        eigenstate: isVowel ? 'vowel' : isBifurcated ? 'intermediate' : 'consonant'
      };
    });

    const fidelity = this.calculateEtymologicalFidelity(qubits);

    return {
      origin: phoenicianText,
      descendant: text.toUpperCase(),
      fidelity,
      qubits,
      riemannianDistance: cumulativeRiemannianDistance
    };
  }

  private static getArticulationPoint(glyph: string): number {
    // Mapping specific glyphs to their specified articulation manifold values
    const letter = PHOENICIAN_ALPHABET.find(l => l.glyph === glyph);
    if (!letter) return 3.5;
    
    const note = (letter.evolutionNote || '').toLowerCase();
    if (note.includes('glotal')) return this.articulationMap['glottal'];
    if (note.includes('faríngea')) return this.articulationMap['pharyngeal'];
    if (note.includes('velar')) return this.articulationMap['velar'];
    if (note.includes('bilabial') || glyph === '𐤅') return this.articulationMap['labial'];
    if (note.includes('alveolar')) return this.articulationMap['alveolar'];
    if (note.includes('dental')) return this.articulationMap['dental'];
    return 3.5;
  }

  private static calculateEtymologicalFidelity(qubits: PhoneticQubit[]): number {
    if (qubits.length === 0) return 0;
    const collapsedCount = qubits.filter(q => q.isCollapsed).length;
    const stabilitySum = qubits.reduce((acc, q) => acc + (q.coherenceTime / 500), 0);
    // Fidelity formula integrating stability, collapse state, and PHI coherence
    return Math.min(1.0, (collapsedCount / qubits.length) * (stabilitySum / qubits.length) * (PHI / 1.618));
  }

  static performPhoneticAnalysis(text: string): PhoneticAnalysis {
    const characters = Array.from(this.translateToPhoenician(text)).filter(c => c !== ' ' && c !== '?');
    const letters = characters.map(c => PHOENICIAN_ALPHABET.find(l => l.glyph === c)).filter(Boolean) as any[];

    if (letters.length === 0) return { degutturalization: 0, desenfatizacao: 0, palatalization: 0, simplification: 0, regularization: 0, complexityIndex: 0, fidelity: 0 };

    const gutturalCount = letters.filter(l => l.vowelCollapse).length;
    const emphaticCount = letters.filter(l => ['Tet', 'Sade', 'Qof'].includes(l.name)).length;
    const palatalCount = letters.filter(l => ['Yod', 'Shin'].includes(l.name)).length;
    
    const total = letters.length;
    const entanglement = this.generateEntanglementLayer(text);

    return {
      degutturalization: (gutturalCount / total) * 100,
      desenfatizacao: (emphaticCount / total) * 100,
      palatalization: (palatalCount / total) * 100,
      simplification: (emphaticCount + gutturalCount) / (total * 2) * 100,
      regularization: (letters.filter(l => !l.vowelCollapse && !['Tet', 'Sade', 'Qof', 'Waw'].includes(l.name)).length / total) * 100,
      complexityIndex: 1.0 - (this.calculateLinguisticEntropy(text) / 5.0),
      fidelity: entanglement.fidelity
    };
  }
}
