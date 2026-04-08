import type { ComponentType, ReactNode } from "react";

// export type DimensionId = "ueber" | "durch" | "mit" | "trotz";
export type DimensionId = "ueber" | "durch" | "mit";

export type Character = {
  id: DimensionId;
  name: string;
  title: string;
  role: string;
  focus: string;
  key: string;
  accent: string;
  badge: string;
  icon: ReactNode;
};

export type WeltkarteDownload = {
  id: DimensionId;
  title: string;
  description: string;
  pdfPath: string;
  accent: string;
  icon: ReactNode;
};

export type QuizOption = {
  id: string;
  label: string;
  correct: boolean;
};

export type JumpRunStation = {
  id: string;
  mapLabel: string;
  title: string;
  learning: string;
  question: string;
  options: QuizOption[];
  reward: string;
};

export type JumpRunDanger = {
  id: string;
  title: string;
  description: string;
  tip: string;
};

export type JumpRunPlatform = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type JumpRunZone = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type JumpRunMovingPattern = {
  axis: "x" | "y";
  min: number;
  max: number;
  speed: number;
  startDirection?: 1 | -1;
};

export type JumpRunHazardZone = JumpRunZone & {
  dangerId: string;
  moving?: JumpRunMovingPattern;
};

export type JumpRunCollectible = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  points: number;
};

export type JumpRunQuestionBlock = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  powerupId: string;
};

export type JumpRunPowerup = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  extraLives: number;
  spawnedByBlockId?: string;
};

// export type JumpRunChapterId = "ueber" | "mit" | "durch" | "trotz";
export type JumpRunChapterId = "ueber" | "mit" | "durch";

// export type JumpRunMapId =
//   | "ueber-citadel"
//   | "mit-archipelago"
//   | "durch-lab"
//   | "trotz-fortress";
export type JumpRunMapId =
  | "ueber-citadel"
  | "mit-archipelago"
  | "durch-lab";

export type JumpRunDifficultyId = "easy" | "normal" | "hard";

export type JumpRunChapterConfig = {
  id: JumpRunChapterId;
  title: string;
  mission: string;
  leitfragen: string[];
  stations: JumpRunStation[];
  dangers: JumpRunDanger[];
};

export type JumpRunMapTheme = {
  skyTop: string;
  skyMid: string;
  horizonTop: string;
  horizonBottom: string;
  gridColor: string;
  cloudColor: string;
  cloudShadow: string;
  auraColor: string;
  groundColor: string;
  groundShadow: string;
  platformColor: string;
  platformShadow: string;
};

export type JumpRunMapConfig = {
  id: JumpRunMapId;
  chapterId: JumpRunChapterId;
  label: string;
  theme: JumpRunMapTheme;
  world: {
    width: number;
    height: number;
  };
  start: {
    x: number;
    y: number;
  };
  platforms: JumpRunPlatform[];
  stationZones: JumpRunZone[];
  hazardZones: JumpRunHazardZone[];
  collectibles: JumpRunCollectible[];
  questionBlocks: JumpRunQuestionBlock[];
  powerups: JumpRunPowerup[];
  finishZone: JumpRunZone;
  backgroundClass: string;
};

export type JumpRunDifficultyConfig = {
  id: JumpRunDifficultyId;
  label: string;
  lives: number;
  speedMultiplier: number;
  gravityMultiplier: number;
  jumpMultiplier: number;
  hazardSpeedMultiplier: number;
  hardExtraHazards: JumpRunHazardZone[];
};

export type JumpRunHazardVariant = "banana" | "ghost" | "piranha";

export type JumpRunHazardVisual = {
  shellColor: string;
  mainColor: string;
  secondaryColor: string;
  accentColor: string;
  minimapColor: string;
  cardColor: string;
  tipColor: string;
  sigil: string;
};

export type JumpRunStationVisual = {
  icon: ComponentType<{ className?: string }>;
  bubbleClass: string;
  accentClass: string;
};

export type RuntimeHazard = JumpRunHazardZone & {
  baseX: number;
  baseY: number;
  direction: 1 | -1;
};

export type RuntimePowerupMotion = {
  phase: "rising" | "walking";
  targetY: number;
  vx: number;
  remainingWalkMs: number;
};

export type PendingRespawn = {
  until: number;
  startX: number;
  startY: number;
  knockbackDirection: 1 | -1;
  message: string;
  checkpoint: {
    x: number;
    y: number;
  };
};
