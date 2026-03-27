/** Player animation state machine and pose constants. */

export type PlayerPose = "idle" | "running" | "jumping" | "falling" | "landing" | "hit";

export type PlayerAnimState = {
  pose: PlayerPose;
  /** 0-3 for 4-frame walk cycle */
  walkFrame: number;
};

/**
 * Determine the current player pose from physics state.
 * `justLanded` is true on the first frame where onGround transitions from false to true.
 * `landingUntil` is a timestamp; if `now < landingUntil`, the landing squash is still active.
 */
export function getPlayerPose(
  onGround: boolean,
  vx: number,
  vy: number,
  hitActive: boolean,
  now: number,
  landingUntil: number,
): PlayerPose {
  if (hitActive) return "hit";
  if (now < landingUntil) return "landing";
  if (!onGround) {
    return vy < 0 ? "jumping" : "falling";
  }
  if (Math.abs(vx) > 35) return "running";
  return "idle";
}

/**
 * Compute the 4-frame walk cycle index from player x position.
 * Returns 0-3 where each value represents a distinct leg/arm position.
 */
export function getWalkFrame(x: number): number {
  return Math.floor(x / 10) % 4;
}

/** CSS transform for landing squash-and-stretch */
export const LANDING_SQUASH = "scaleY(0.85) scaleX(1.15)";
export const LANDING_DURATION_MS = 120;

/**
 * Per-pose leg positions (top offset %, height %) for left and right legs.
 * Format: [leftTop, leftHeight, rightTop, rightHeight]
 * These percentages are relative to the player container.
 */
export const WALK_FRAMES: Record<number, [string, string, string, string]> = {
  0: ["84%", "14%", "86%", "12%"],  // left forward, right back
  1: ["85%", "13%", "85%", "13%"],  // both mid
  2: ["86%", "12%", "84%", "14%"],  // right forward, left back
  3: ["85%", "13%", "85%", "13%"],  // both mid (return)
};

/**
 * Arm position offsets per walk frame.
 * Returns [leftArmTop, rightArmTop] as percentages — arms swing opposite to legs.
 */
export const ARM_FRAMES: Record<number, [string, string]> = {
  0: ["58%", "60%"],
  1: ["59%", "59%"],
  2: ["60%", "58%"],
  3: ["59%", "59%"],
};

/** Jump pose: arms up, legs tucked */
export const JUMP_LEGS: [string, string, string, string] = ["88%", "10%", "88%", "10%"];
export const JUMP_ARMS: [string, string] = ["54%", "54%"];

/** Fall pose: arms spread wider, legs extended */
export const FALL_LEGS: [string, string, string, string] = ["83%", "15%", "83%", "15%"];
export const FALL_ARMS: [string, string] = ["56%", "56%"];
