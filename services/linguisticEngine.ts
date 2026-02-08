
import { PHOENICIAN_ALPHABET, PHOENICIAN_GEMATRIA_COEFFICIENT } from '../constants';

export interface PhoneticAnalysis {
  degutturalization: number;
  desenfatizacao: number;
  palatalization: number;
  simplification: number;
  regularization: number;
  complexityIndex: number;
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

  static performPhoneticAnalysis(text: string): PhoneticAnalysis {
    const characters = Array.from(this.translateToPhoenician(text)).filter(c => c !== ' ' && c !== '?');
    const letters = characters.map(c => PHOENICIAN_ALPHABET.find(l => l.glyph === c)).filter(Boolean) as any[];

    if (letters.length === 0) return { degutturalization: 0, desenfatizacao: 0, palatalization: 0, simplification: 0, regularization: 0, complexityIndex: 0 };

    const gutturalCount = letters.filter(l => l.vowelCollapse).length;
    const emphaticCount = letters.filter(l => l.name === 'Tet' || l.name === 'Sade' || l.name === 'Qof').length;
    const palatalCount = letters.filter(l => l.name === 'Yod' || l.name === 'Shin').length;
    
    const total = letters.length;

    return {
      degutturalization: (gutturalCount / total) * 100,
      desenfatizacao: (emphaticCount / total) * 100,
      palatalization: (palatalCount / total) * 100,
      simplification: (emphaticCount + gutturalCount) / (total * 2) * 100,
      regularization: (letters.filter(l => !l.vowelCollapse && !['Tet', 'Sade', 'Qof', 'Waw'].includes(l.name)).length / total) * 100,
      complexityIndex: 1.0 - (this.calculateLinguisticEntropy(text) / 5.0)
    };
  }
}
