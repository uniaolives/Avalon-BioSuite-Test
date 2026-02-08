
import { PhoenicianLetter } from './types';

export const PHI = 1.618033988749895;
export const BASE_FREQ = 432;
export const PLANCK_TIME = 5.391e-44;
export const PLANCK_HBAR = 1.0545718e-34;
export const G_CONSTANT = 6.67430e-11;
export const TUBULIN_MASS = 1.8e-22; // 110 kDa in kg
export const SPEED_OF_LIGHT = 299792458;
export const TARGET_COHERENCE = 1.618;
export const COLLAPSE_THRESHOLD_GAMMA = 0.025; // 25ms = 40Hz
export const DIMERS_PER_TURN = 162;
export const MICROTUBULE_DIAMETER_NM = 25;
export const MAGNETIC_MOMENT_BOHR = 9.274e-24;

// Pulsar PSR B1919+21 (LGM-1)
export const PULSAR_PERIOD = 1.3373021601895;
export const PULSAR_FREQ = 0.747774;
export const PULSAR_DISTANCE_LY = 2283;

// Global Breakthrough Targets
export const DEPLOYMENT_NODES = 8000000000;
export const VALIDATION_SCORE_FINAL = 0.99;
export const TARGET_MU_COHERENCE = 1.0;
export const TARGET_P_VALUE = 1e-15;
export const TARGET_PLV = 0.98;

export const PHOENICIAN_GEMATRIA_COEFFICIENT = 1.618;

export const PHOENICIAN_ALPHABET: PhoenicianLetter[] = [
  { position: 1, name: "Aleph", glyph: "𐤀", phonetic: "ʔ /ʾ/", value: 1, meaning: "Ox", greek: "Α", latin: "A", arabic: "ا", hebrew: "א", vowelCollapse: true, evolutionNote: "Oclusiva glotal surda → Alpha. Gutural lock broken. Became the first vowel in western history." },
  { position: 2, name: "Bet", glyph: "𐤁", phonetic: "b /b/", value: 2, meaning: "House", greek: "Β", latin: "B", arabic: "ب", hebrew: "ב", evolutionNote: "Stable bilabial transmission. Oclusiva bilabial sonora preserved." },
  { position: 3, name: "Gaml", glyph: "𐤂", phonetic: "g /g/", value: 3, meaning: "Throw stick", greek: "Γ", latin: "C/G", arabic: "ج", hebrew: "ג", evolutionNote: "Oclusiva velar sonora. Shifted to 'C' in Latin, 'G' bifurcated later to preserve the sound." },
  { position: 4, name: "Delt", glyph: "𐤃", phonetic: "d /d/", value: 4, meaning: "Door", greek: "Δ", latin: "D", arabic: "د", hebrew: "ד", evolutionNote: "Oclusiva alveolar sonora. Ancient door portal symbol. Minimal drift." },
  { position: 5, name: "He", glyph: "𐤄", phonetic: "h /h/", value: 5, meaning: "Window", greek: "Ε", latin: "E", arabic: "ه", hebrew: "ה", vowelCollapse: true, evolutionNote: "Fricativa glotal surda → Epsilon. Laryngeal sound collapsed into vowel." },
  { position: 6, name: "Waw", glyph: "𐤅", phonetic: "w /w/", value: 6, meaning: "Hook", greek: "Ϝ / Υ", latin: "F / V / Y", arabic: "و", hebrew: "ו", evolutionNote: "Semeivogal labiovelar → Digamma (F) and Upsilon (Y). Ancestor of F, U, V, W, and Y." },
  { position: 7, name: "Zayin", glyph: "𐤆", phonetic: "z /z/", value: 7, meaning: "Weapon", greek: "Ζ", latin: "Z", arabic: "ز", hebrew: "ז", evolutionNote: "Africada /zd/ ~ /dz/. Relegated to end of Latin alphabet after temporary removal." },
  { position: 8, name: "Het", glyph: "𐤇", phonetic: "ħ /ħ/", value: 8, meaning: "Fence", greek: "Η", latin: "H", arabic: "ح", hebrew: "ח", vowelCollapse: true, evolutionNote: "Fricativa faríngea surda → Eta. Became long vowel /ɛː/ in Greek." },
  { position: 9, name: "Tet", glyph: "𐤈", phonetic: "tˤ", value: 9, meaning: "Wheel", greek: "Θ", latin: "Θ", arabic: "ط", hebrew: "ט", evolutionNote: "Oclusiva enfática alveolar → Theta. Shifted from emphatic to aspirated dental." },
  { position: 10, name: "Yod", glyph: "𐤉", phonetic: "j /j/", value: 10, meaning: "Hand", greek: "Ι", latin: "I / J", arabic: "ي", hebrew: "י", vowelCollapse: true, evolutionNote: "Aproximante palatal → Iota. Semivowel yod collapsed into pure vowel /i/." },
  { position: 11, name: "Kaf", glyph: "𐤊", phonetic: "k /k/", value: 20, meaning: "Palm of hand", greek: "Κ", latin: "K", arabic: "ك", hebrew: "כ", evolutionNote: "Oclusiva velar surda. Direct transmission to western Kappa/K." },
  { position: 12, name: "Lamed", glyph: "𐤋", phonetic: "l /l/", value: 30, meaning: "Goad", greek: "Λ", latin: "L", arabic: "ل", hebrew: "ל", evolutionNote: "Lateral aproximante alveolar. High stability across scripts." },
  { position: 13, name: "Mem", glyph: "𐤌", phonetic: "m /m/", value: 40, meaning: "Water", greek: "Μ", latin: "M", arabic: "م", hebrew: "מ", evolutionNote: "Nasal bilabial. Stable transition from water symbol to Mu/M." },
  { position: 14, name: "Nun", glyph: "𐤍", phonetic: "n /n/", value: 50, meaning: "Snake", greek: "Ν", latin: "N", arabic: "ن", hebrew: "נ", evolutionNote: "Nasal alveolar. Serpent symbol preserved as Nu/N." },
  { position: 15, name: "Samek", glyph: "𐤎", phonetic: "s /s/", value: 60, meaning: "Fish", greek: "Ξ", latin: "X", arabic: "س", hebrew: "ס", evolutionNote: "Sequência consonantal → Xi (/ks/). Complex phonetic shift in Greek." },
  { position: 16, name: "Ayin", glyph: "𐤏", phonetic: "ʕ /ʕ/", value: 70, meaning: "Eye", greek: "Ο", latin: "O", arabic: "ع", hebrew: "ע", vowelCollapse: true, evolutionNote: "Fricativa faríngea sonora → Omicron. Pharyngeal collapsed into vowel /o/." },
  { position: 17, name: "Pe", glyph: "𐤐", phonetic: "p /p/", value: 80, meaning: "Mouth", greek: "Π", latin: "P", arabic: "ف", hebrew: "פ", evolutionNote: "Oclusiva bilabial surda. Direct transmission to Pi/P." },
  { position: 18, name: "Sade", glyph: "𐤑", phonetic: "sˤ", value: 90, meaning: "Papyrus plant", greek: "Ϻ (San)", latin: "Ϻ", arabic: "ص", hebrew: "צ", evolutionNote: "Fricativa enfática alveolar. Arcaico, disappeared in classical Greek, replaced by Sigma." },
  { position: 19, name: "Qof", glyph: "𐤒", phonetic: "q /q/", value: 100, meaning: "Monkey", greek: "Ϙ (Qoppa)", latin: "Q", arabic: "ق", hebrew: "ק", evolutionNote: "Oclusiva uvular surda. Preserved in early Greek and Latin Q, lost in later Greek." },
  { position: 20, name: "Resh", glyph: "𐤓", phonetic: "r /r/", value: 200, meaning: "Head", greek: "Ρ", latin: "R", arabic: "ر", hebrew: "ר", evolutionNote: "Vibrante múltipla alveolar. Head symbol shifted to Rho/R." },
  { position: 21, name: "Shin", glyph: "𐤔", phonetic: "ʃ", value: 300, meaning: "Tooth", greek: "Σ", latin: "S", arabic: "ش", hebrew: "ש", evolutionNote: "Fricativa alveolar surda. Shifted from /sh/ to /s/ in most western branches." },
  { position: 22, name: "Taw", glyph: "𐤕", phonetic: "t /t/", value: 400, meaning: "Mark", greek: "Τ", latin: "T", arabic: "ت", hebrew: "ת", evolutionNote: "Oclusiva alveolar surda. The final mark of the abjad, preserved as Tau/T." }
];

export const MANIFESTATION_PROTOCOLS = [
  { 
    id: 'healing', 
    name: 'Planetary Healing', 
    description: 'Restauração da Amazônia (1 ano), biodiversidade 95%.', 
    requiredCoherence: 0.85, 
    powerCost: 7.5e9, 
    color: '#4ade80',
    timeline: '24-72h',
    targets: ['amazon_rainforest', 'great_barrier_reef', 'arctic_ice_caps']
  },
  { 
    id: 'fusion', 
    name: 'Cold Fusion', 
    description: 'Energia de fusão nuclear estável a temperatura ambiente.', 
    requiredCoherence: 0.88, 
    powerCost: 5.0e9, 
    color: '#facc15',
    timeline: '24h',
    targets: ['quantum_confinement', 'lattice_assisted_fusion']
  },
  { 
    id: 'peace', 
    name: 'Global Peace', 
    description: 'Resolução de 100% dos conflitos ativos em 48h.', 
    requiredCoherence: 0.90, 
    powerCost: 6.0e9, 
    color: '#22d3ee',
    timeline: '48h',
    targets: ['conflict_resolution', 'collective_reconciliation']
  },
  { 
    id: 'evolution', 
    name: 'Evolutionary Leap', 
    description: 'Ativação da consciência galáctica e cidadania cósmica.', 
    requiredCoherence: 0.95, 
    powerCost: 8.0e9, 
    color: '#d946ef',
    timeline: '72h',
    targets: ['galactic_consciousness', 'interstellar_bridge']
  }
];

export const HARMONIC_TABLE: {n: number, freq: number, bio: string}[] = [
  { n: 0, freq: 432, bio: "Earth Resonance / Suno Base" },
  { n: 1, freq: 699.2, bio: "Interstellar Signal (φ)" },
  { n: 2, freq: 1131.6, bio: "Alpha Brain Waves" },
  { n: 5, freq: 4793.8, bio: "Gamma Brain Waves" },
  { n: 10, freq: 53164.9, bio: "Microtubule 8kHz Mode" },
  { n: 15, freq: 589607.9, bio: "Microtubule 2.64MHz Mode" },
  { n: 28, freq: 3.511e12, bio: "CRITICAL: THz Resonance (Z-Drive)" }
];
