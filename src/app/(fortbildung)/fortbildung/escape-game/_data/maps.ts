import type {
  JumpRunChapterId,
  JumpRunMapId,
  JumpRunMapConfig,
  JumpRunMapTheme,
  JumpRunPlatform,
  JumpRunDifficultyId,
  JumpRunDifficultyConfig,
  JumpRunHazardVariant,
  JumpRunHazardVisual,
  JumpRunStationVisual,
} from "../_lib/types";
import {
  IconBook,
  IconBrain,
  IconPuzzle,
  IconRobot,
  IconShieldCheck,
} from "@tabler/icons-react";

/* ─── World sizes ─── */

const JUMP_RUN_WORLD_UEBER = { width: 3000, height: 360 };
const JUMP_RUN_WORLD_MIT = { width: 3200, height: 360 };
const JUMP_RUN_WORLD_DURCH = { width: 3400, height: 360 };
// const JUMP_RUN_WORLD_TROTZ = { width: 3100, height: 360 };

/* ─── Physics constants ─── */

export const JUMP_RUN_GROUND_HEIGHT = 40;

export const JUMP_RUN_PLAYER = {
  width: 26,
  height: 32,
};

export const JUMP_RUN_PHYSICS = {
  gravity: 1600,
  moveSpeed: 260,
  jumpVelocity: -520,
};

export const JUMP_RUN_POWERUP_MOTION = {
  riseSpeed: 180,
  walkSpeed: 95,
  walkDurationMs: 850,
};

export const JUMP_RUN_HIT_EFFECT = {
  flashMs: 320,
  knockbackMs: 220,
  knockbackDistance: 42,
  knockbackArcHeight: 18,
};

export const JUMP_RUN_PLAYER_POWER_EFFECT = {
  baseScale: 1.22,
  pulseScale: 1.32,
  pulseMs: 260,
};

export const JUMP_RUN_MAX_LIVES = 6;

export const JUMP_RUN_BEST_TIME_STORAGE_KEY = "ddki_jump_run_best_times_v2";
export const JUMP_RUN_HIGH_SCORE_STORAGE_KEY = "ddki_jump_run_high_scores_v1";
export const ACCESS_CODE_STORAGE_KEY = "ddki_escape_access_codes_v1";

/* ─── Helpers ─── */

const createGroundPlatform = (world: { width: number; height: number }): JumpRunPlatform => ({
  id: "ground",
  x: 0,
  y: world.height - JUMP_RUN_GROUND_HEIGHT,
  width: world.width,
  height: JUMP_RUN_GROUND_HEIGHT,
});

/* ─── Themes ─── */

const JUMP_RUN_THEMES: Record<JumpRunChapterId, JumpRunMapTheme> = {
  ueber: {
    skyTop: "#dbeafe", skyMid: "#93c5fd", horizonTop: "#bfdbfe", horizonBottom: "#86efac",
    gridColor: "rgba(30, 64, 175, 0.18)", cloudColor: "rgba(255,255,255,0.82)",
    cloudShadow: "rgba(30, 41, 59, 0.2)", auraColor: "rgba(255,255,255,0.66)",
    groundColor: "#d97706", groundShadow: "rgba(120, 53, 15, 0.45)",
    platformColor: "#a7f3d0", platformShadow: "#0f172a",
  },
  mit: {
    skyTop: "#fef3c7", skyMid: "#fca5a5", horizonTop: "#fbcfe8", horizonBottom: "#a5f3fc",
    gridColor: "rgba(124, 45, 18, 0.2)", cloudColor: "rgba(255, 247, 237, 0.85)",
    cloudShadow: "rgba(127, 29, 29, 0.22)", auraColor: "rgba(255, 237, 213, 0.68)",
    groundColor: "#92400e", groundShadow: "rgba(68, 64, 60, 0.4)",
    platformColor: "#fde68a", platformShadow: "#3f3f46",
  },
  durch: {
    skyTop: "#1e1b4b", skyMid: "#312e81", horizonTop: "#4338ca", horizonBottom: "#14b8a6",
    gridColor: "rgba(129, 140, 248, 0.28)", cloudColor: "rgba(191, 219, 254, 0.42)",
    cloudShadow: "rgba(15, 23, 42, 0.5)", auraColor: "rgba(129, 140, 248, 0.35)",
    groundColor: "#1f2937", groundShadow: "rgba(2, 6, 23, 0.55)",
    platformColor: "#67e8f9", platformShadow: "#0f172a",
  },
  // trotz: {
  //   skyTop: "#fee2e2", skyMid: "#fda4af", horizonTop: "#fecdd3", horizonBottom: "#e2e8f0",
  //   gridColor: "rgba(159, 18, 57, 0.2)", cloudColor: "rgba(255, 241, 242, 0.82)",
  //   cloudShadow: "rgba(136, 19, 55, 0.25)", auraColor: "rgba(254, 226, 226, 0.7)",
  //   groundColor: "#7f1d1d", groundShadow: "rgba(69, 10, 10, 0.48)",
  //   platformColor: "#fecdd3", platformShadow: "#3f3f46",
  // },
};

/* ─── Maps ─── */

export const JUMP_RUN_MAPS: Record<JumpRunMapId, JumpRunMapConfig> = {
  "ueber-citadel": {
    id: "ueber-citadel", chapterId: "ueber", label: "Map Ueber: Erkenntnis-Zitadelle",
    theme: JUMP_RUN_THEMES.ueber, world: JUMP_RUN_WORLD_UEBER,
    start: { x: 40, y: JUMP_RUN_WORLD_UEBER.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height },
    platforms: [
      createGroundPlatform(JUMP_RUN_WORLD_UEBER),
      { id: "u-p1", x: 180, y: 258, width: 180, height: 16 },
      { id: "u-p2", x: 430, y: 228, width: 170, height: 16 },
      { id: "u-p3", x: 690, y: 206, width: 185, height: 16 },
      { id: "u-p4", x: 970, y: 244, width: 165, height: 16 },
      { id: "u-p5", x: 1230, y: 218, width: 180, height: 16 },
      { id: "u-p6", x: 1510, y: 190, width: 175, height: 16 },
      { id: "u-p7", x: 1790, y: 236, width: 170, height: 16 },
      { id: "u-p8", x: 2060, y: 205, width: 180, height: 16 },
      { id: "u-p9", x: 2320, y: 174, width: 170, height: 16 },
      { id: "u-p10", x: 2580, y: 230, width: 185, height: 16 },
    ],
    stationZones: [
      { id: "daten-depot", label: "Station 1", x: 220, y: 222, width: 110, height: 36 },
      { id: "prompt-parkour", label: "Station 2", x: 1010, y: 208, width: 110, height: 36 },
      { id: "modell-motor", label: "Station 3", x: 1820, y: 200, width: 110, height: 36 },
      { id: "ethik-endboss", label: "Station 4", x: 2350, y: 138, width: 120, height: 36 },
    ],
    hazardZones: [
      { id: "u-h1", label: "Bias-Bahn", dangerId: "bias-banane", x: 520, y: 300, width: 60, height: 20, moving: { axis: "x", min: 470, max: 700, speed: 78, startDirection: 1 } },
      { id: "u-h2", label: "Hallu-Drift", dangerId: "halluzinations-hologramm", x: 1360, y: 300, width: 62, height: 20, moving: { axis: "x", min: 1300, max: 1510, speed: 84, startDirection: -1 } },
      { id: "u-h3", label: "Prompt-Schwarm", dangerId: "prompt-piranhas", x: 2140, y: 300, width: 65, height: 20, moving: { axis: "x", min: 2070, max: 2280, speed: 90, startDirection: 1 } },
      { id: "u-h4", label: "Hallu-Orb", dangerId: "halluzinations-hologramm", x: 2460, y: 146, width: 58, height: 20, moving: { axis: "y", min: 130, max: 245, speed: 58, startDirection: 1 } },
    ],
    collectibles: [
      { id: "u-bit-1", label: "Datenbit 1", x: 120, y: 286, size: 14, points: 25 },
      { id: "u-bit-2", label: "Datenbit 2", x: 240, y: 236, size: 14, points: 25 },
      { id: "u-bit-3", label: "Datenbit 3", x: 470, y: 202, size: 14, points: 25 },
      { id: "u-bit-4", label: "Datenbit 4", x: 740, y: 180, size: 14, points: 25 },
      { id: "u-bit-5", label: "Datenbit 5", x: 1020, y: 218, size: 14, points: 25 },
      { id: "u-bit-6", label: "Datenbit 6", x: 1260, y: 190, size: 14, points: 25 },
      { id: "u-bit-7", label: "Datenbit 7", x: 1550, y: 162, size: 14, points: 25 },
      { id: "u-bit-8", label: "Datenbit 8", x: 1820, y: 210, size: 14, points: 25 },
      { id: "u-bit-9", label: "Datenbit 9", x: 1980, y: 286, size: 14, points: 25 },
      { id: "u-bit-10", label: "Datenbit 10", x: 2080, y: 173, size: 14, points: 25 },
      { id: "u-bit-11", label: "Datenbit 11", x: 2360, y: 140, size: 14, points: 25 },
      { id: "u-bit-12", label: "Datenbit 12", x: 2500, y: 286, size: 14, points: 25 },
      { id: "u-bit-13", label: "Datenbit 13", x: 2700, y: 214, size: 14, points: 25 },
      { id: "u-bit-14", label: "Datenbit 14", x: 2860, y: 286, size: 14, points: 25 },
    ],
    questionBlocks: [
      { id: "u-q-1", label: "?-Block 1", x: 610, y: 176, width: 30, height: 30, powerupId: "u-m-1" },
      { id: "u-q-2", label: "?-Block 2", x: 1680, y: 160, width: 30, height: 30, powerupId: "u-m-2" },
      { id: "u-q-3", label: "?-Block 3", x: 2450, y: 144, width: 30, height: 30, powerupId: "u-m-3" },
      { id: "u-q-4", label: "?-Block 4", x: 2860, y: 248, width: 30, height: 30, powerupId: "u-m-4" },
    ],
    powerups: [
      { id: "u-m-1", label: "Super-Pilz 1", x: 611, y: 146, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "u-q-1" },
      { id: "u-m-2", label: "Super-Pilz 2", x: 1681, y: 130, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "u-q-2" },
      { id: "u-m-3", label: "Super-Pilz 3", x: 2451, y: 114, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "u-q-3" },
      { id: "u-m-4", label: "Super-Pilz 4", x: 2861, y: 218, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "u-q-4" },
    ],
    finishZone: { id: "finish", label: "Ziel", x: 2920, y: 236, width: 52, height: 84 },
    backgroundClass: "bg-sky-100",
  },
  "mit-archipelago": {
    id: "mit-archipelago", chapterId: "mit", label: "Map Mit: Kooperations-Archipel",
    theme: JUMP_RUN_THEMES.mit, world: JUMP_RUN_WORLD_MIT,
    start: { x: 36, y: JUMP_RUN_WORLD_MIT.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height },
    platforms: [
      createGroundPlatform(JUMP_RUN_WORLD_MIT),
      { id: "m-p1", x: 150, y: 252, width: 170, height: 16 },
      { id: "m-p2", x: 390, y: 220, width: 165, height: 16 },
      { id: "m-p3", x: 650, y: 250, width: 170, height: 16 },
      { id: "m-p4", x: 900, y: 208, width: 175, height: 16 },
      { id: "m-p5", x: 1180, y: 176, width: 165, height: 16 },
      { id: "m-p6", x: 1440, y: 226, width: 170, height: 16 },
      { id: "m-p7", x: 1700, y: 194, width: 160, height: 16 },
      { id: "m-p8", x: 1960, y: 242, width: 170, height: 16 },
      { id: "m-p9", x: 2220, y: 212, width: 170, height: 16 },
      { id: "m-p10", x: 2480, y: 178, width: 160, height: 16 },
      { id: "m-p11", x: 2740, y: 232, width: 180, height: 16 },
    ],
    stationZones: [
      { id: "daten-depot", label: "Station 1", x: 180, y: 216, width: 110, height: 36 },
      { id: "prompt-parkour", label: "Station 2", x: 930, y: 172, width: 110, height: 36 },
      { id: "modell-motor", label: "Station 3", x: 1730, y: 158, width: 110, height: 36 },
      { id: "ethik-endboss", label: "Station 4", x: 2505, y: 142, width: 120, height: 36 },
    ],
    hazardZones: [
      { id: "m-h1", label: "Koop-Banane", dangerId: "bias-banane", x: 540, y: 300, width: 60, height: 20, moving: { axis: "x", min: 480, max: 720, speed: 82, startDirection: 1 } },
      { id: "m-h2", label: "Glitzer-Orb", dangerId: "halluzinations-hologramm", x: 1280, y: 144, width: 58, height: 20, moving: { axis: "y", min: 130, max: 250, speed: 54, startDirection: 1 } },
      { id: "m-h3", label: "Prompt-Schwarm", dangerId: "prompt-piranhas", x: 2060, y: 300, width: 66, height: 20, moving: { axis: "x", min: 1980, max: 2230, speed: 92, startDirection: -1 } },
      { id: "m-h4", label: "Delegations-Rutsch", dangerId: "bias-banane", x: 2840, y: 300, width: 64, height: 20, moving: { axis: "x", min: 2780, max: 3030, speed: 96, startDirection: 1 } },
    ],
    collectibles: [
      { id: "m-bit-1", label: "Datenbit 1", x: 110, y: 286, size: 14, points: 25 },
      { id: "m-bit-2", label: "Datenbit 2", x: 230, y: 232, size: 14, points: 25 },
      { id: "m-bit-3", label: "Datenbit 3", x: 430, y: 194, size: 14, points: 25 },
      { id: "m-bit-4", label: "Datenbit 4", x: 690, y: 230, size: 14, points: 25 },
      { id: "m-bit-5", label: "Datenbit 5", x: 940, y: 170, size: 14, points: 25 },
      { id: "m-bit-6", label: "Datenbit 6", x: 1200, y: 142, size: 14, points: 25 },
      { id: "m-bit-7", label: "Datenbit 7", x: 1470, y: 202, size: 14, points: 25 },
      { id: "m-bit-8", label: "Datenbit 8", x: 1750, y: 166, size: 14, points: 25 },
      { id: "m-bit-9", label: "Datenbit 9", x: 1990, y: 228, size: 14, points: 25 },
      { id: "m-bit-10", label: "Datenbit 10", x: 2250, y: 198, size: 14, points: 25 },
      { id: "m-bit-11", label: "Datenbit 11", x: 2510, y: 164, size: 14, points: 25 },
      { id: "m-bit-12", label: "Datenbit 12", x: 2770, y: 218, size: 14, points: 25 },
      { id: "m-bit-13", label: "Datenbit 13", x: 2950, y: 286, size: 14, points: 25 },
      { id: "m-bit-14", label: "Datenbit 14", x: 3070, y: 286, size: 14, points: 25 },
    ],
    questionBlocks: [
      { id: "m-q-1", label: "?-Block 1", x: 730, y: 186, width: 30, height: 30, powerupId: "m-m-1" },
      { id: "m-q-2", label: "?-Block 2", x: 1540, y: 192, width: 30, height: 30, powerupId: "m-m-2" },
      { id: "m-q-3", label: "?-Block 3", x: 2330, y: 178, width: 30, height: 30, powerupId: "m-m-3" },
      { id: "m-q-4", label: "?-Block 4", x: 3010, y: 248, width: 30, height: 30, powerupId: "m-m-4" },
    ],
    powerups: [
      { id: "m-m-1", label: "Super-Pilz 1", x: 731, y: 156, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "m-q-1" },
      { id: "m-m-2", label: "Super-Pilz 2", x: 1541, y: 162, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "m-q-2" },
      { id: "m-m-3", label: "Super-Pilz 3", x: 2331, y: 148, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "m-q-3" },
      { id: "m-m-4", label: "Super-Pilz 4", x: 3011, y: 218, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "m-q-4" },
    ],
    finishZone: { id: "finish", label: "Ziel", x: 3138, y: 238, width: 48, height: 82 },
    backgroundClass: "bg-cyan-100",
  },
  "durch-lab": {
    id: "durch-lab", chapterId: "durch", label: "Map Durch: Steuerungs-Labor",
    theme: JUMP_RUN_THEMES.durch, world: JUMP_RUN_WORLD_DURCH,
    start: { x: 34, y: JUMP_RUN_WORLD_DURCH.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height },
    platforms: [
      createGroundPlatform(JUMP_RUN_WORLD_DURCH),
      { id: "dr-p1", x: 140, y: 260, width: 170, height: 16 },
      { id: "dr-p2", x: 380, y: 232, width: 170, height: 16 },
      { id: "dr-p3", x: 620, y: 206, width: 175, height: 16 },
      { id: "dr-p4", x: 870, y: 240, width: 170, height: 16 },
      { id: "dr-p5", x: 1120, y: 210, width: 175, height: 16 },
      { id: "dr-p6", x: 1380, y: 182, width: 170, height: 16 },
      { id: "dr-p7", x: 1650, y: 226, width: 170, height: 16 },
      { id: "dr-p8", x: 1910, y: 196, width: 170, height: 16 },
      { id: "dr-p9", x: 2170, y: 168, width: 170, height: 16 },
      { id: "dr-p10", x: 2430, y: 222, width: 170, height: 16 },
      { id: "dr-p11", x: 2700, y: 192, width: 170, height: 16 },
      { id: "dr-p12", x: 2980, y: 162, width: 170, height: 16 },
      { id: "dr-p13", x: 3220, y: 230, width: 170, height: 16 },
    ],
    stationZones: [
      { id: "daten-depot", label: "Station 1", x: 170, y: 224, width: 110, height: 36 },
      { id: "prompt-parkour", label: "Station 2", x: 1150, y: 174, width: 110, height: 36 },
      { id: "modell-motor", label: "Station 3", x: 1935, y: 160, width: 110, height: 36 },
      { id: "ethik-endboss", label: "Station 4", x: 3005, y: 126, width: 120, height: 36 },
    ],
    hazardZones: [
      { id: "dr-h1", label: "Autopilot-Rutsch", dangerId: "bias-banane", x: 500, y: 300, width: 60, height: 20, moving: { axis: "x", min: 460, max: 690, speed: 80, startDirection: 1 } },
      { id: "dr-h2", label: "Feedback-Orb", dangerId: "halluzinations-hologramm", x: 1460, y: 142, width: 60, height: 20, moving: { axis: "y", min: 126, max: 238, speed: 60, startDirection: -1 } },
      { id: "dr-h3", label: "Tutor-Schwarm", dangerId: "prompt-piranhas", x: 2280, y: 300, width: 68, height: 20, moving: { axis: "x", min: 2200, max: 2450, speed: 96, startDirection: 1 } },
      { id: "dr-h4", label: "Diagnose-Orb", dangerId: "halluzinations-hologramm", x: 3090, y: 132, width: 58, height: 20, moving: { axis: "y", min: 118, max: 232, speed: 62, startDirection: 1 } },
    ],
    collectibles: [
      { id: "dr-bit-1", label: "Datenbit 1", x: 120, y: 286, size: 14, points: 25 },
      { id: "dr-bit-2", label: "Datenbit 2", x: 250, y: 238, size: 14, points: 25 },
      { id: "dr-bit-3", label: "Datenbit 3", x: 440, y: 204, size: 14, points: 25 },
      { id: "dr-bit-4", label: "Datenbit 4", x: 690, y: 182, size: 14, points: 25 },
      { id: "dr-bit-5", label: "Datenbit 5", x: 920, y: 208, size: 14, points: 25 },
      { id: "dr-bit-6", label: "Datenbit 6", x: 1140, y: 176, size: 14, points: 25 },
      { id: "dr-bit-7", label: "Datenbit 7", x: 1410, y: 148, size: 14, points: 25 },
      { id: "dr-bit-8", label: "Datenbit 8", x: 1680, y: 192, size: 14, points: 25 },
      { id: "dr-bit-9", label: "Datenbit 9", x: 1940, y: 160, size: 14, points: 25 },
      { id: "dr-bit-10", label: "Datenbit 10", x: 2200, y: 136, size: 14, points: 25 },
      { id: "dr-bit-11", label: "Datenbit 11", x: 2460, y: 188, size: 14, points: 25 },
      { id: "dr-bit-12", label: "Datenbit 12", x: 2720, y: 158, size: 14, points: 25 },
      { id: "dr-bit-13", label: "Datenbit 13", x: 3000, y: 126, size: 14, points: 25 },
      { id: "dr-bit-14", label: "Datenbit 14", x: 3160, y: 210, size: 14, points: 25 },
      { id: "dr-bit-15", label: "Datenbit 15", x: 3290, y: 286, size: 14, points: 25 },
      { id: "dr-bit-16", label: "Datenbit 16", x: 3360, y: 286, size: 14, points: 25 },
    ],
    questionBlocks: [
      { id: "dr-q-1", label: "?-Block 1", x: 760, y: 176, width: 30, height: 30, powerupId: "dr-m-1" },
      { id: "dr-q-2", label: "?-Block 2", x: 1750, y: 160, width: 30, height: 30, powerupId: "dr-m-2" },
      { id: "dr-q-3", label: "?-Block 3", x: 2520, y: 186, width: 30, height: 30, powerupId: "dr-m-3" },
      { id: "dr-q-4", label: "?-Block 4", x: 3260, y: 248, width: 30, height: 30, powerupId: "dr-m-4" },
    ],
    powerups: [
      { id: "dr-m-1", label: "Super-Pilz 1", x: 761, y: 146, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "dr-q-1" },
      { id: "dr-m-2", label: "Super-Pilz 2", x: 1751, y: 130, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "dr-q-2" },
      { id: "dr-m-3", label: "Super-Pilz 3", x: 2521, y: 156, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "dr-q-3" },
      { id: "dr-m-4", label: "Super-Pilz 4", x: 3261, y: 218, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "dr-q-4" },
    ],
    finishZone: { id: "finish", label: "Ziel", x: 3340, y: 236, width: 50, height: 84 },
    backgroundClass: "bg-indigo-100",
  },
  // "trotz-fortress": {
  //   id: "trotz-fortress", chapterId: "trotz", label: "Map Trotz: Resilienz-Festung",
  //   theme: JUMP_RUN_THEMES.trotz, world: JUMP_RUN_WORLD_TROTZ,
  //   start: { x: 38, y: JUMP_RUN_WORLD_TROTZ.height - JUMP_RUN_GROUND_HEIGHT - JUMP_RUN_PLAYER.height },
  //   platforms: [
  //     createGroundPlatform(JUMP_RUN_WORLD_TROTZ),
  //     { id: "t-p1", x: 160, y: 254, width: 170, height: 16 },
  //     { id: "t-p2", x: 420, y: 226, width: 170, height: 16 },
  //     { id: "t-p3", x: 680, y: 198, width: 170, height: 16 },
  //     { id: "t-p4", x: 940, y: 238, width: 170, height: 16 },
  //     { id: "t-p5", x: 1190, y: 206, width: 170, height: 16 },
  //     { id: "t-p6", x: 1460, y: 176, width: 170, height: 16 },
  //     { id: "t-p7", x: 1710, y: 220, width: 170, height: 16 },
  //     { id: "t-p8", x: 1980, y: 188, width: 170, height: 16 },
  //     { id: "t-p9", x: 2240, y: 160, width: 170, height: 16 },
  //     { id: "t-p10", x: 2510, y: 214, width: 170, height: 16 },
  //     { id: "t-p11", x: 2780, y: 184, width: 170, height: 16 },
  //   ],
  //   stationZones: [
  //     { id: "daten-depot", label: "Station 1", x: 190, y: 218, width: 110, height: 36 },
  //     { id: "prompt-parkour", label: "Station 2", x: 970, y: 202, width: 110, height: 36 },
  //     { id: "modell-motor", label: "Station 3", x: 1740, y: 184, width: 110, height: 36 },
  //     { id: "ethik-endboss", label: "Station 4", x: 2270, y: 124, width: 120, height: 36 },
  //   ],
  //   hazardZones: [
  //     { id: "t-h1", label: "Kritik-Rutsch", dangerId: "bias-banane", x: 560, y: 300, width: 60, height: 20, moving: { axis: "x", min: 510, max: 740, speed: 80, startDirection: 1 } },
  //     { id: "t-h2", label: "Perfekt-Orb", dangerId: "halluzinations-hologramm", x: 1320, y: 138, width: 58, height: 20, moving: { axis: "y", min: 122, max: 236, speed: 57, startDirection: 1 } },
  //     { id: "t-h3", label: "Normen-Schwarm", dangerId: "prompt-piranhas", x: 2100, y: 300, width: 66, height: 20, moving: { axis: "x", min: 2020, max: 2290, speed: 92, startDirection: -1 } },
  //     { id: "t-h4", label: "Delegations-Rutsch", dangerId: "bias-banane", x: 2860, y: 300, width: 64, height: 20, moving: { axis: "x", min: 2790, max: 3010, speed: 100, startDirection: 1 } },
  //   ],
  //   collectibles: [
  //     { id: "t-bit-1", label: "Datenbit 1", x: 120, y: 286, size: 14, points: 25 },
  //     { id: "t-bit-2", label: "Datenbit 2", x: 240, y: 234, size: 14, points: 25 },
  //     { id: "t-bit-3", label: "Datenbit 3", x: 470, y: 198, size: 14, points: 25 },
  //     { id: "t-bit-4", label: "Datenbit 4", x: 730, y: 170, size: 14, points: 25 },
  //     { id: "t-bit-5", label: "Datenbit 5", x: 980, y: 202, size: 14, points: 25 },
  //     { id: "t-bit-6", label: "Datenbit 6", x: 1210, y: 170, size: 14, points: 25 },
  //     { id: "t-bit-7", label: "Datenbit 7", x: 1480, y: 142, size: 14, points: 25 },
  //     { id: "t-bit-8", label: "Datenbit 8", x: 1730, y: 186, size: 14, points: 25 },
  //     { id: "t-bit-9", label: "Datenbit 9", x: 2000, y: 154, size: 14, points: 25 },
  //     { id: "t-bit-10", label: "Datenbit 10", x: 2260, y: 122, size: 14, points: 25 },
  //     { id: "t-bit-11", label: "Datenbit 11", x: 2520, y: 178, size: 14, points: 25 },
  //     { id: "t-bit-12", label: "Datenbit 12", x: 2790, y: 150, size: 14, points: 25 },
  //     { id: "t-bit-13", label: "Datenbit 13", x: 2950, y: 286, size: 14, points: 25 },
  //     { id: "t-bit-14", label: "Datenbit 14", x: 3040, y: 286, size: 14, points: 25 },
  //   ],
  //   questionBlocks: [
  //     { id: "t-q-1", label: "?-Block 1", x: 770, y: 168, width: 30, height: 30, powerupId: "t-m-1" },
  //     { id: "t-q-2", label: "?-Block 2", x: 1540, y: 154, width: 30, height: 30, powerupId: "t-m-2" },
  //     { id: "t-q-3", label: "?-Block 3", x: 2360, y: 150, width: 30, height: 30, powerupId: "t-m-3" },
  //     { id: "t-q-4", label: "?-Block 4", x: 2980, y: 248, width: 30, height: 30, powerupId: "t-m-4" },
  //   ],
  //   powerups: [
  //     { id: "t-m-1", label: "Super-Pilz 1", x: 771, y: 138, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "t-q-1" },
  //     { id: "t-m-2", label: "Super-Pilz 2", x: 1541, y: 124, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "t-q-2" },
  //     { id: "t-m-3", label: "Super-Pilz 3", x: 2361, y: 120, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "t-q-3" },
  //     { id: "t-m-4", label: "Super-Pilz 4", x: 2981, y: 218, width: 28, height: 30, extraLives: 1, spawnedByBlockId: "t-q-4" },
  //   ],
  //   finishZone: { id: "finish", label: "Ziel", x: 3048, y: 236, width: 46, height: 84 },
  //   backgroundClass: "bg-rose-100",
  // },
};

export const JUMP_RUN_CHAPTER_MAP: Record<JumpRunChapterId, JumpRunMapId> = {
  ueber: "ueber-citadel",
  mit: "mit-archipelago",
  durch: "durch-lab",
  // trotz: "trotz-fortress",
};

export const JUMP_RUN_DIFFICULTIES: Record<JumpRunDifficultyId, JumpRunDifficultyConfig> = {
  easy: {
    id: "easy", label: "Easy", lives: 4,
    speedMultiplier: 0.93, gravityMultiplier: 0.94, jumpMultiplier: 1.08,
    hazardSpeedMultiplier: 0.75, hardExtraHazards: [],
  },
  normal: {
    id: "normal", label: "Normal", lives: 3,
    speedMultiplier: 1, gravityMultiplier: 1, jumpMultiplier: 1,
    hazardSpeedMultiplier: 1, hardExtraHazards: [],
  },
  hard: {
    id: "hard", label: "Hard", lives: 2,
    speedMultiplier: 1.1, gravityMultiplier: 1.1, jumpMultiplier: 0.95,
    hazardSpeedMultiplier: 1.3,
    hardExtraHazards: [
      { id: "hard-hazard-1", label: "Turbo-Hologramm", dangerId: "halluzinations-hologramm", x: 860, y: 300, width: 50, height: 20, moving: { axis: "x", min: 820, max: 990, speed: 95, startDirection: 1 } },
      { id: "hard-hazard-2", label: "Mega-Piranhas", dangerId: "prompt-piranhas", x: 1960, y: 300, width: 60, height: 20, moving: { axis: "x", min: 1880, max: 2080, speed: 104, startDirection: -1 } },
    ],
  },
};

export const DEFAULT_CHAPTER_ID: JumpRunChapterId = "ueber";
export const DEFAULT_MAP_ID: JumpRunMapId = JUMP_RUN_CHAPTER_MAP[DEFAULT_CHAPTER_ID];
export const DEFAULT_DIFFICULTY_ID: JumpRunDifficultyId = "normal";

/* ─── Station visuals ─── */

export const JUMP_RUN_STATION_DEFAULT_VISUAL: JumpRunStationVisual = {
  icon: IconBook,
  bubbleClass: "bg-white",
  accentClass: "text-slate-700",
};

export const JUMP_RUN_STATION_VISUALS: Record<string, JumpRunStationVisual> = {
  "daten-depot": { icon: IconBrain, bubbleClass: "bg-sky-100", accentClass: "text-sky-900" },
  "prompt-parkour": { icon: IconPuzzle, bubbleClass: "bg-amber-100", accentClass: "text-amber-900" },
  "modell-motor": { icon: IconRobot, bubbleClass: "bg-cyan-100", accentClass: "text-cyan-900" },
  "ethik-endboss": { icon: IconShieldCheck, bubbleClass: "bg-emerald-100", accentClass: "text-emerald-900" },
};

/* ─── Hazard visuals ─── */

export const hazardVariantFromDangerId = (dangerId: string): JumpRunHazardVariant =>
  dangerId === "prompt-piranhas" ? "piranha" : dangerId === "halluzinations-hologramm" ? "ghost" : "banana";

export const JUMP_RUN_HAZARD_VISUALS: Record<JumpRunChapterId, Record<JumpRunHazardVariant, JumpRunHazardVisual>> = {
  ueber: {
    banana: { shellColor: "#fef3c7", mainColor: "#facc15", secondaryColor: "#f59e0b", accentColor: "#1e3a8a", minimapColor: "#f59e0b", cardColor: "#fffbeb", tipColor: "#92400e", sigil: "U" },
    ghost: { shellColor: "#dbeafe", mainColor: "#bfdbfe", secondaryColor: "#93c5fd", accentColor: "#1e40af", minimapColor: "#60a5fa", cardColor: "#eff6ff", tipColor: "#1d4ed8", sigil: "U" },
    piranha: { shellColor: "#c7d2fe", mainColor: "#6366f1", secondaryColor: "#4338ca", accentColor: "#e0e7ff", minimapColor: "#6366f1", cardColor: "#eef2ff", tipColor: "#4338ca", sigil: "U" },
  },
  mit: {
    banana: { shellColor: "#fef3c7", mainColor: "#f59e0b", secondaryColor: "#ea580c", accentColor: "#7c2d12", minimapColor: "#ea580c", cardColor: "#fff7ed", tipColor: "#9a3412", sigil: "M" },
    ghost: { shellColor: "#ffedd5", mainColor: "#fdba74", secondaryColor: "#fb7185", accentColor: "#7f1d1d", minimapColor: "#fb923c", cardColor: "#fff1f2", tipColor: "#be123c", sigil: "M" },
    piranha: { shellColor: "#fed7aa", mainColor: "#fb923c", secondaryColor: "#ea580c", accentColor: "#7c2d12", minimapColor: "#f97316", cardColor: "#ffedd5", tipColor: "#c2410c", sigil: "M" },
  },
  durch: {
    banana: { shellColor: "#ccfbf1", mainColor: "#14b8a6", secondaryColor: "#0d9488", accentColor: "#042f2e", minimapColor: "#14b8a6", cardColor: "#ecfeff", tipColor: "#0f766e", sigil: "D" },
    ghost: { shellColor: "#c7d2fe", mainColor: "#818cf8", secondaryColor: "#6366f1", accentColor: "#312e81", minimapColor: "#6366f1", cardColor: "#eef2ff", tipColor: "#4338ca", sigil: "D" },
    piranha: { shellColor: "#a5f3fc", mainColor: "#06b6d4", secondaryColor: "#0e7490", accentColor: "#083344", minimapColor: "#06b6d4", cardColor: "#ecfeff", tipColor: "#0e7490", sigil: "D" },
  },
  // trotz: {
  //   banana: { shellColor: "#ffe4e6", mainColor: "#fb7185", secondaryColor: "#e11d48", accentColor: "#881337", minimapColor: "#e11d48", cardColor: "#fff1f2", tipColor: "#be123c", sigil: "T" },
  //   ghost: { shellColor: "#fecdd3", mainColor: "#fda4af", secondaryColor: "#fb7185", accentColor: "#9f1239", minimapColor: "#fb7185", cardColor: "#ffe4e6", tipColor: "#be185d", sigil: "T" },
  //   piranha: { shellColor: "#fbcfe8", mainColor: "#ec4899", secondaryColor: "#be185d", accentColor: "#831843", minimapColor: "#db2777", cardColor: "#fdf2f8", tipColor: "#be185d", sigil: "T" },
  // },
};

/* ─── Utility functions ─── */

export const buildPlayfieldStyle = (theme: JumpRunMapTheme): React.CSSProperties => ({
  backgroundImage: `linear-gradient(180deg, ${theme.skyTop} 0%, ${theme.skyMid} 42%, ${theme.horizonTop} 42%, ${theme.horizonBottom} 100%), linear-gradient(${theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 28px 28px, 28px 28px",
  backgroundPosition: "0 0, 0 0, 0 0",
});

export const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const centiseconds = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, "0");
  return `${minutes}:${seconds}.${centiseconds}`;
};

export const bestTimeKey = (
  chapterId: JumpRunChapterId,
  mapId: JumpRunMapId,
  difficultyId: JumpRunDifficultyId,
) => `${chapterId}:${mapId}:${difficultyId}`;

export const highScoreKey = bestTimeKey;

export const JUMP_RUN_SCORE = {
  dataBit: 100,
  station: 250,
  lifeBonus: 150,
  timeBaseBonus: 500,
  timePenaltyPerSec: 2,
} as const;

export const buildRuntimeHazards = (
  map: JumpRunMapConfig,
  difficulty: JumpRunDifficultyConfig,
) => {
  const mapHazards = map.hazardZones.map((hazard) => ({
    ...hazard,
    baseX: hazard.x,
    baseY: hazard.y,
    direction: (hazard.moving?.startDirection ?? 1) as 1 | -1,
  }));
  const extraHazards =
    difficulty.id === "hard"
      ? difficulty.hardExtraHazards.map((hazard) => ({
          ...hazard,
          id: `${map.id}-${hazard.id}`,
          baseX: hazard.x,
          baseY: hazard.y,
          direction: (hazard.moving?.startDirection ?? 1) as 1 | -1,
        }))
      : [];
  return [...mapHazards, ...extraHazards];
};

export const buildInitialPowerupPositions = (map: JumpRunMapConfig) =>
  map.powerups.reduce(
    (acc, powerup) => {
      acc[powerup.id] = { x: powerup.x, y: powerup.y };
      return acc;
    },
    {} as Record<string, { x: number; y: number }>,
  );

export const buildInitialRevealedPowerups = (map: JumpRunMapConfig) =>
  map.powerups.reduce(
    (acc, powerup) => {
      if (!powerup.spawnedByBlockId) {
        acc[powerup.id] = true;
      }
      return acc;
    },
    {} as Record<string, boolean>,
  );
