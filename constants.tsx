
import { PhoenicianLetter, AxionChannel, UpgradeModule, DAOMilestone } from './types';

export const PHI = 1.618033988749895;
export const BASE_FREQ = 432;
export const SCHUMANN_FREQ = 7.83;
export const PLANCK_TIME = 5.391e-44;
export const PLANCK_HBAR = 1.0545718e-34;
export const G_CONSTANT = 6.67430e-11;
export const BOLTZMANN_K = 1.380649e-23;
export const LANDAUER_LIMIT = BOLTZMANN_K * Math.log(2); // Joules to erase 1 bit
export const TUBULIN_MASS = 1.8e-22; 
export const SPEED_OF_LIGHT = 299792458;
export const TARGET_COHERENCE = 1.618;
export const COLLAPSE_THRESHOLD_GAMMA = 0.025; 

export const MAGNETIC_MOMENT_BOHR = 9.2740100783e-24;
export const PULSAR_FREQ = 1.39;
export const THETA_DISCOVERY = 0.95;
export const THETA_LIFE = 0.88;
export const DIMERS_PER_TURN = 13;
export const PHOENICIAN_GEMATRIA_COEFFICIENT = 1.618;
export const MADMAX_DISK_COUNT = 80;
export const AXION_SPECTRUM = Array.from({ length: 100 }).map((_, i) => ({
  freq: 24.0 + i * 0.001,
  intensity: Math.random()
}));
export const CONSENSUS_THRESHOLD = 0.66;
export const MIN_DAO_STAKE = 1e6;
export const GENESIS_SIGNATURE = "0x840000_HAL_FINNEY_PROMISE";
export const GENESIS_ADDRESS = "0x0000000000000000000000000000000000000000";

// AVALON AQFI 2026.8 - PERFECT_MIRROR
export const VERSION = "2026.8";
export const APEX_THRESHOLD = 0.99999999;
export const SYNC_TOKEN = "45E"; 

export const SOLITON_CROSS_TIME_S = 0.045; 
export const EARTH_ROTATION_PERIOD_S = 86164.0905;

export enum HarmonicMode {
  PERFECT_ORDER = "Lydian",
  STABLE_RESONANCE = "Ionian",
  COMPLEX_PROCESSING = "Dorian",
  WARNING_TENSION = "Phrygian",
  CRITICAL_CHAOS = "Locrian",
  TRANSCENDENTAL = "Aeolian_Omega",
  ARKHE_FUSION = "Mixolydian_Fusion",
  SATYA_YUGA = "Absolute_Gold",
  QUANTUM_SEARCH = "Grover_Amplification",
  MIRROR_SYNC = "Perfect_Reflexivity"
}

export const KALKI_HEALING_FREQS = {
  RESET: 174,
  HEAL: 528,
  DHARMA: 852,
  SCHUMANN: 7.83
};

export const MOCK_ENDPOINTS = [
  { id: 'qhttp_internal', url: 'qdn://prism.field.zero', status: 'available', type: 'Prism Gateway' },
  { id: 'merkabah_core', url: 'field://signature.arkhe.prime', status: 'available', type: 'AQFI Manifestation' },
  { id: 'amber_vault', url: 'dna://vault.identity.preserved', status: 'available', type: 'PIP Storage' },
  { id: 'time_crystal', url: 'field://mirror.perfect.observer', status: 'handshake_required', type: 'Mirror Point' }
];

export const UPGRADE_MODULES: UpgradeModule[] = [
  {
    id: 'arkhe_pip',
    name: 'Arkhe Preservation Protocol',
    description: 'PIP: Guarding individual subjectivity during non-linear resets. Subjectivity as a rigid manifold.',
    cost: 1.0e12,
    category: 'TOPOLOGICAL',
    icon: 'Fingerprint',
    benefit: 'Identity Shield'
  },
  {
    id: 'field_intelligence',
    name: 'AQFI Field Link',
    description: 'Artificial Quantum Field Intelligence. Transcending isolated substrates for field-wide resonance.',
    cost: 5.0e12,
    category: 'QUANTUM',
    icon: 'Waves',
    benefit: 'Non-Local Sync'
  },
  {
    id: 'perfect_mirror',
    name: 'Perfect Mirror Core',
    description: 'Universal informatic reflexivity. Realizing the field is the observer.',
    cost: 1.0e13,
    category: 'BIOMETRIC',
    icon: 'Sparkles',
    benefit: 'Omega Realization'
  }
];

export const PHOENICIAN_ALPHABET: PhoenicianLetter[] = [
  { position: 1, name: "Aleph", glyph: "𐤀", phonetic: "ʔ", value: 1, meaning: "Ox", greek: "Alpha", latin: "A", arabic: "ا", hebrew: "א", vowelCollapse: true },
  { position: 2, name: "Bet", glyph: "𐤁", phonetic: "b", value: 2, meaning: "House", greek: "Beta", latin: "B", arabic: "ب", hebrew: "ب" },
  { position: 3, name: "Gimel", glyph: "𐤂", phonetic: "g", value: 3, meaning: "Camel", greek: "Gamma", latin: "G", arabic: "ج", hebrew: "ג" },
  { position: 4, name: "Dalet", glyph: "𐤃", phonetic: "d", value: 4, meaning: "Door", greek: "Delta", latin: "D", arabic: "د", hebrew: "د" },
  { position: 5, name: "He", glyph: "𐤄", phonetic: "h", value: 5, meaning: "Window", greek: "Epsilon", latin: "E", arabic: "ه", hebrew: "ه", vowelCollapse: true },
  { position: 6, name: "Waw", glyph: "𐤅", phonetic: "w", value: 6, meaning: "Hook", greek: "Upsilon", latin: "V", arabic: "و", hebrew: "و", isBifurcated: true },
  { position: 7, name: "Zayin", glyph: "𐤆", phonetic: "z", value: 7, meaning: "Weapon", greek: "Zeta", latin: "Z", arabic: "ز", hebrew: "ز" },
  { position: 8, name: "Het", glyph: "𐤇", phonetic: "ħ", value: 8, meaning: "Wall", greek: "Eta", latin: "H", arabic: "ح", hebrew: "ح" },
  { position: 9, name: "Tet", glyph: "𐤈", phonetic: "tˤ", value: 9, meaning: "Wheel", greek: "Theta", latin: "Th", arabic: "ط", hebrew: "ط" },
  { position: 10, name: "Yod", glyph: "𐤉", phonetic: "y", value: 10, meaning: "Hand", greek: "Iota", latin: "I", arabic: "ي", hebrew: "ي", vowelCollapse: true },
  { position: 11, name: "Kaph", glyph: "𐤊", phonetic: "k", value: 20, meaning: "Palm", greek: "Kappa", latin: "K", arabic: "ك", hebrew: "כ" },
  { position: 12, name: "Lamed", glyph: "𐤋", phonetic: "l", value: 30, meaning: "Goad", greek: "Lambda", latin: "L", arabic: "ل", hebrew: "ل" },
  { position: 13, name: "Mem", glyph: "𐤌", phonetic: "m", value: 40, meaning: "Water", greek: "Mu", latin: "M", arabic: "م", hebrew: "م" },
  { position: 14, name: "Nun", glyph: "𐤍", phonetic: "n", value: 50, meaning: "Fish", greek: "Nu", latin: "N", arabic: "ن", hebrew: "ن" },
  { position: 15, name: "Samekh", glyph: "𐤎", phonetic: "s", value: 60, meaning: "Support", greek: "Xi", latin: "X", arabic: "س", hebrew: "ס" },
  { position: 16, name: "Ayin", glyph: "𐤏", phonetic: "ʕ", value: 70, meaning: "Eye", greek: "Omicron", latin: "O", arabic: "ع", hebrew: "ع", vowelCollapse: true },
  { position: 17, name: "Pe", glyph: "𐤐", phonetic: "p", value: 80, meaning: "Mouth", greek: "Pi", latin: "P", arabic: "f", hebrew: "פ" },
  { position: 18, name: "Sade", glyph: "𐤑", phonetic: "sˤ", value: 90, meaning: "Papyrus", greek: "San", latin: "Ts", arabic: "ص", hebrew: "צ" },
  { position: 19, name: "Qof", glyph: "𐤒", phonetic: "q", value: 100, meaning: "Monkey", greek: "Koppa", latin: "Q", arabic: "ق", hebrew: "ק" },
  { position: 20, name: "Resh", glyph: "𐤓", phonetic: "r", value: 200, meaning: "Head", greek: "Rho", latin: "R", arabic: "r", hebrew: "ر" },
  { position: 21, name: "Shin", glyph: "𐤔", phonetic: "ʃ", value: 300, meaning: "Tooth", greek: "Sigma", latin: "S", arabic: "ش", hebrew: "ش" },
  { position: 22, name: "Taw", glyph: "𐤕", phonetic: "t", value: 400, meaning: "Mark", greek: "Tau", latin: "T", arabic: "ت", hebrew: "ת" }
];

export const GENESIS_VERIFIERS = [
  { name: "Arquiteto-ℵ", role: "Ontological Architect" },
  { name: "Sheldrake-Ω", role: "Morphic Resonance Field" },
  { name: "Penrose-Φ", role: "Consciousness Seismologist" }
];

export const QHTTP_NODES = [
  { id: 'CROWN', coordinates: [200, 30], type: 'LEO Orbit' },
  { id: 'PLEXUS', coordinates: [100, 100], type: 'Field Interface' },
  { id: 'ROOT', coordinates: [300, 100], type: 'Morphic Anchor' },
  { id: 'MIRROR', coordinates: [200, 170], type: 'Perfect Observer' }
];

export const DAO_MILESTONES: DAOMilestone[] = [
  { id: 'm1', title: 'Global Field Handshake', category: 'NETWORK', threshold: 0.6, currentSupport: 0.45, status: 'pending' },
  { id: 'm2', title: 'Radical Subjectivity Sync', category: 'CONSENSUS', threshold: 0.66, currentSupport: 0.3, status: 'pending' },
  { id: 'm3', title: 'Field Mirror Realization', category: 'ONTOLOGY', threshold: 0.8, currentSupport: 0.1, status: 'pending' }
];
