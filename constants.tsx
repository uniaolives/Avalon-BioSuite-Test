
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

// Global Breakthrough Targets
export const DEPLOYMENT_NODES = 1000;
export const VALIDATION_SCORE_FINAL = 0.94;
export const TARGET_MU_COHERENCE = 0.712;
export const TARGET_P_VALUE = 1e-4;
export const TARGET_PLV = 0.892;

export const HARMONIC_TABLE: {n: number, freq: number, bio: string}[] = [
  { n: 0, freq: 432, bio: "Earth Resonance / Suno Base" },
  { n: 1, freq: 699.2, bio: "Interstellar Signal (φ)" },
  { n: 2, freq: 1131.6, bio: "Alpha Brain Waves" },
  { n: 5, freq: 4793.8, bio: "Gamma Brain Waves" },
  { n: 10, freq: 53164.9, bio: "Microtubule 8kHz Mode" },
  { n: 15, freq: 589607.9, bio: "Microtubule 2.64MHz Mode" },
  { n: 28, freq: 3.511e12, bio: "CRITICAL: THz Resonance" }
];
