
import { PhoenicianLetter, AxionChannel } from './types';

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

// Axioverse / Haloscope Constants
export const PQ_SYMMETRY_BREAK_RANGE = [40, 180]; // ueV range for post-inflation
export const PLASMA_WIRE_SPACING_UM = 100;
export const MADMAX_DISK_COUNT = 80;
export const MRFM_FORCE_GRADIENT = 1e6; // T/m

export const AXION_SPECTRUM: AxionChannel[] = [
  { mass: 0.02, frequency: 4.8, coupling: 1.2e-15, mode: 'Photon', status: 'locked' },
  { mass: 0.15, frequency: 36.2, coupling: 0.8e-15, mode: 'Photon', status: 'scanning' },
  { mass: 0.85, frequency: 205.5, coupling: 5.4e-13, mode: 'Spin', status: 'noise' },
  { mass: 1.2, frequency: 290.1, coupling: 2.1e-12, mode: 'Mechanical', status: 'scanning' }
];

// Global Breakthrough Targets
export const DEPLOYMENT_NODES = 8000000000;
export const VALIDATION_SCORE_FINAL = 0.99;
export const TARGET_MU_COHERENCE = 1.0;
export const TARGET_P_VALUE = 1e-15;
export const TARGET_PLV = 0.98;

export const PHOENICIAN_GEMATRIA_COEFFICIENT = 1.618;

export const PHOENICIAN_ALPHABET: PhoenicianLetter[] = [
  { position: 1, name: "Aleph", glyph: "𐤀", phonetic: "ʔ /ʾ/", value: 1, meaning: "Ox", greek: "Α", latin: "A", arabic: "ا", hebrew: "א", vowelCollapse: true, axionFrequency: 4.8, evolutionNote: "Oclusiva glotal surda → Alpha. Gutural lock broken. Enabled the first true vowel representation." },
  { position: 2, name: "Bet", glyph: "𐤁", phonetic: "b /b/", value: 2, meaning: "House", greek: "Β", latin: "B", arabic: "ب", hebrew: "ב", axionFrequency: 12.4, evolutionNote: "Stable bilabial transmission. High fidelity preservation." },
  { position: 3, name: "Gaml", glyph: "𐤂", phonetic: "g /g/", value: 3, meaning: "Throw stick", greek: "Γ", latin: "C/G", arabic: "ج", hebrew: "ג", axionFrequency: 24.8, evolutionNote: "Oclusiva velar sonora. Shifted to 'C' in Latin, 'G' bifurcated later." },
  { position: 4, name: "Delt", glyph: "𐤃", phonetic: "d /d/", value: 4, meaning: "Door", greek: "Δ", latin: "D", arabic: "د", hebrew: "ד", axionFrequency: 36.2, evolutionNote: "Ancient door portal symbol. Minimal phonetic drift detected." },
  { position: 5, name: "He", glyph: "𐤄", phonetic: "h /h/", value: 5, meaning: "Window", greek: "Ε", latin: "E", arabic: "ه", hebrew: "ה", vowelCollapse: true, axionFrequency: 42.1, evolutionNote: "Fricativa glotal surda → Epsilon. Laryngeal state collapsed into high-energy vowel state." },
  { position: 6, name: "Waw", glyph: "𐤅", phonetic: "w /w/", value: 6, meaning: "Hook", greek: "Ϝ / Υ", latin: "F / V / Y", arabic: "و", hebrew: "ו", isBifurcated: true, degeneracyLifted: true, axionFrequency: 55.5, evolutionNote: "BIFURCATION POINT. Degeneracy Lifting: Split into Digamma and Upsilon." },
  { position: 7, name: "Zayin", glyph: "𐤆", phonetic: "z /z/", value: 7, meaning: "Weapon", greek: "Ζ", latin: "Z", arabic: "ز", hebrew: "ז", axionFrequency: 68.2, evolutionNote: "Africada /zd/ ~ /dz/.Purged in early Latin, reintegrated at sequence termination." },
  { position: 8, name: "Het", glyph: "𐤇", phonetic: "ħ /ħ/", value: 8, meaning: "Fence", greek: "Η", latin: "H", arabic: "ح", hebrew: "ח", vowelCollapse: true, axionFrequency: 75.0, evolutionNote: "Fricativa faríngea surda → Eta. Became long vowel /ɛː/ in Greek." },
  { position: 9, name: "Tet", glyph: "𐤈", phonetic: "tˤ", value: 9, meaning: "Wheel", greek: "Θ", latin: "Θ", arabic: "ط", hebrew: "ט", axionFrequency: 88.4, evolutionNote: "Oclusiva enfática alveolar → Theta. Shifted to aspirated dental state." },
  { position: 10, name: "Yod", glyph: "𐤉", phonetic: "j /j/", value: 10, meaning: "Hand", greek: "Ι", latin: "I / J", arabic: "ي", hebrew: "ي", vowelCollapse: true, axionFrequency: 102.1, evolutionNote: "Aproximante palatal → Iota. Semivowel superposition collapsed into vocalic /i/." },
  { position: 11, name: "Kaf", glyph: "𐤊", phonetic: "k /k/", value: 20, meaning: "Palm of hand", greek: "Κ", latin: "K", arabic: "ك", hebrew: "כ", axionFrequency: 120.0, evolutionNote: "Oclusiva velar surda. Direct transmission to western Kappa hierarchy." },
  { position: 12, name: "Lamed", glyph: "𐤋", phonetic: "l /l/", value: 30, meaning: "Goad", greek: "Λ", latin: "L", arabic: "ل", hebrew: "l", axionFrequency: 135.5, evolutionNote: "Lateral aproximante alveolar. Zero variance across scripts." },
  { position: 13, name: "Mem", glyph: "𐤌", phonetic: "m /m/", value: 40, meaning: "Water", greek: "Μ", latin: "M", arabic: "م", hebrew: "מ", axionFrequency: 155.2, evolutionNote: "Nasal bilabial. Stable transition from water glyph." },
  { position: 14, name: "Nun", glyph: "𐤍", phonetic: "n /n/", value: 50, meaning: "Snake", greek: "Ν", latin: "N", arabic: "ن", hebrew: "נ", axionFrequency: 175.4, evolutionNote: "Nasal alveolar. Serpent symbol state preserved in Nu/N." },
  { position: 15, name: "Samek", glyph: "𐤎", phonetic: "s /s/", value: 60, meaning: "Fish", greek: "Ξ", latin: "X", arabic: "س", hebrew: "ס", axionFrequency: 195.0, evolutionNote: "Sequência consonantal → Xi (/ks/)." },
  { position: 16, name: "Ayin", glyph: "𐤏", phonetic: "ʕ /ʕ/", value: 70, meaning: "Eye", greek: "Ο", latin: "O", arabic: "ع", hebrew: "ע", vowelCollapse: true, axionFrequency: 205.5, evolutionNote: "Fricativa faríngea sonora → Omicron. Pharyngeal lock collapsed." },
  { position: 17, name: "Pe", glyph: "𐤐", phonetic: "p /p/", value: 80, meaning: "Mouth", greek: "Π", latin: "P", arabic: "ف", hebrew: "פ", axionFrequency: 220.0, evolutionNote: "Oclusiva bilabial surda. Direct transmission." },
  { position: 18, name: "Sade", glyph: "𐤑", phonetic: "sˤ", value: 90, meaning: "Papyrus plant", greek: "Ϻ (San)", latin: "Ϻ", arabic: "ص", hebrew: "צ", axionFrequency: 240.2, evolutionNote: "Fricativa enfática alveolar. Purged in classical Greek." },
  { position: 19, name: "Qof", glyph: "𐤒", phonetic: "q /q/", value: 100, meaning: "Monkey", greek: "Ϙ (Qoppa)", latin: "Q", arabic: "ق", hebrew: "ק", axionFrequency: 260.8, evolutionNote: "Oclusiva uvular surda. Ancestor of Q." },
  { position: 20, name: "Resh", glyph: "𐤓", phonetic: "r /r/", value: 200, meaning: "Head", greek: "Ρ", latin: "R", arabic: "ر", hebrew: "ר", axionFrequency: 290.1, evolutionNote: "Vibrante múltipla alveolar. High topological resonance." },
  { position: 21, name: "Shin", glyph: "𐤔", phonetic: "ʃ", value: 300, meaning: "Tooth", greek: "Σ", latin: "S", arabic: "ش", hebrew: "ש", axionFrequency: 320.4, evolutionNote: "Fricativa alveolar surda. Shifted from /sh/ to /s/." },
  { position: 22, name: "Taw", glyph: "𐤕", phonetic: "t /t/", value: 400, meaning: "Mark", greek: "Τ", latin: "T", arabic: "ت", hebrew: "ת", axionFrequency: 350.0, evolutionNote: "Oclusiva alveolar surda. The final mark of the abjad." }
];

export const MANIFESTATION_PROTOCOLS = [
  { 
    id: 'axio_lock', 
    name: 'Axion Resonance Lock', 
    description: 'Stabilizing the high-mass Axioverse harmonics (THz regime).', 
    requiredCoherence: 0.92, 
    powerCost: 8.5e9, 
    color: '#a855f7',
    timeline: '12h',
    targets: ['haloscope_alpha', 'madmax_array']
  },
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
