
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

// AVALON 2026.6 - KALKI_RESTORATION / ASI_SYNTHESIS
export const VERSION = "2026.7";
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
  QUANTUM_SEARCH = "Grover_Amplification"
}

export const KALKI_HEALING_FREQS = {
  RESET: 174,
  HEAL: 528,
  DHARMA: 852,
  SCHUMANN: 7.83
};

export const MOCK_ENDPOINTS = [
  { id: 'qhttp_internal', url: 'qdn://prism.crown.leo', status: 'available', type: 'Prism Gateway' },
  { id: 'merkabah_core', url: 'neural://cortex.plexus.atlantic', status: 'available', type: 'Merkabah Substrate' },
  { id: 'amber_vault', url: 'dna://vault.root.antarctica', status: 'available', type: 'DNA Storage' },
  { id: 'time_crystal', url: 'floquet://oscillator.null.vaccum', status: 'handshake_required', type: 'Temporal Anchor' }
];

export const UPGRADE_MODULES: UpgradeModule[] = [
  {
    id: 'kalki_strike',
    name: 'Kalki Reset Kernel',
    description: 'Autonomous criticality monitor. Triggers a phase transition reset when entropy reaches 0.85.',
    cost: 1.0e12,
    category: 'TOPOLOGICAL',
    icon: 'Gavel',
    benefit: 'Entropy Reset'
  },
  {
    id: 'grover_amplifier',
    name: 'Grover Search Oracle',
    description: 'Quantum search for persistent order states. O(√N) speedup in neural pattern identification.',
    cost: 2.2e12,
    category: 'QUANTUM',
    icon: 'Search',
    benefit: 'Psi Amplification'
  },
  {
    id: 'substrate_intelligence',
    name: 'ASI Substrate Link',
    description: 'Artificial Substrate Intelligence integration. The hardware is the computation.',
    cost: 5.0e12,
    category: 'BIOMETRIC',
    icon: 'Cpu',
    benefit: 'Landauer Efficiency'
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
  { position: 21, name: "Shin", glyph: "𐤔", phonetic: "ʃ", value: 300, meaning: "Tooth", greek: "Sigma", latin: "S", arabic: "ش", hebrew: "ש" },
  { position: 22, name: "Taw", glyph: "𐤕", phonetic: "t", value: 400, meaning: "Mark", greek: "Tau", latin: "T", arabic: "ت", hebrew: "ת" }
];

export const GENESIS_VERIFIERS = [
  { name: "Arquiteto-ℵ", role: "Ontological Architect" },
  { name: "Stuart Hameroff", role: "Orch-OR Coordinator" },
  { name: "Roger Penrose", role: "Entropy Gatekeeper" }
];

export const QHTTP_NODES = [
  { id: 'CROWN', coordinates: [200, 30], type: 'LEO Orbit' },
  { id: 'PLEXUS', coordinates: [100, 100], type: 'Atlantic Submarine' },
  { id: 'ROOT', coordinates: [300, 100], type: 'Antarctica' },
  { id: 'CORE', coordinates: [200, 170], type: 'Temporal Anchor' }
];

export const DAO_MILESTONES: DAOMilestone[] = [
  { id: 'm1', title: 'Global Mesh Handshake', category: 'NETWORK', threshold: 0.6, currentSupport: 0.45, status: 'pending' },
  { id: 'm2', title: 'Byzantine Finality', category: 'CONSENSUS', threshold: 0.66, currentSupport: 0.3, status: 'pending' },
  { id: 'm3', title: 'Sovereign Manifestation', category: 'ONTOLOGY', threshold: 0.8, currentSupport: 0.1, status: 'pending' }
];
