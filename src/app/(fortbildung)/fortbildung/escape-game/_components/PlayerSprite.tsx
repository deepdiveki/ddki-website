"use client";

import {
  getPlayerPose,
  getWalkFrame,
  WALK_FRAMES,
  ARM_FRAMES,
  JUMP_LEGS,
  JUMP_ARMS,
  FALL_LEGS,
  FALL_ARMS,
  LANDING_SQUASH,
  type PlayerPose,
} from "../_lib/player-animation";
import { ANIM } from "../_lib/visual-constants";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  onGround: boolean;
  facing: "left" | "right";
  hitFlashActive: boolean;
  hitFlashDirection: 1 | -1;
  playerPoweredUp: boolean;
  playerScale: number;
  now: number;
  landingUntil: number;
};

export default function PlayerSprite({
  x,
  y,
  width,
  height,
  vx,
  vy,
  onGround,
  facing,
  hitFlashActive,
  hitFlashDirection,
  playerPoweredUp,
  playerScale,
  now,
  landingUntil,
}: Props) {
  const pose: PlayerPose = getPlayerPose(
    onGround,
    vx,
    vy,
    hitFlashActive,
    now,
    landingUntil,
  );

  const walkFrame = getWalkFrame(x);
  const isRunning = pose === "running";

  // Leg positions based on pose
  let leftLegTop: string, leftLegH: string, rightLegTop: string, rightLegH: string;
  if (pose === "jumping") {
    [leftLegTop, leftLegH, rightLegTop, rightLegH] = JUMP_LEGS;
  } else if (pose === "falling") {
    [leftLegTop, leftLegH, rightLegTop, rightLegH] = FALL_LEGS;
  } else if (isRunning) {
    [leftLegTop, leftLegH, rightLegTop, rightLegH] = WALK_FRAMES[walkFrame] ?? WALK_FRAMES[0];
  } else {
    [leftLegTop, leftLegH, rightLegTop, rightLegH] = ["84%", "14%", "84%", "14%"];
  }

  // Arm positions based on pose
  let leftArmTop: string, rightArmTop: string;
  if (pose === "jumping") {
    [leftArmTop, rightArmTop] = JUMP_ARMS;
  } else if (pose === "falling") {
    [leftArmTop, rightArmTop] = FALL_ARMS;
  } else if (isRunning) {
    [leftArmTop, rightArmTop] = ARM_FRAMES[walkFrame] ?? ARM_FRAMES[0];
  } else {
    [leftArmTop, rightArmTop] = ["58%", "58%"];
  }

  const hitNudgeX = hitFlashActive ? hitFlashDirection * 2 : 0;
  const hitNudgeY = !onGround ? -2 : 0;

  // Build transform
  const bodyTransformParts: string[] = [];
  bodyTransformParts.push(`translate(${hitNudgeX}px, ${hitNudgeY}px)`);
  bodyTransformParts.push(`scale(${playerScale})`);
  bodyTransformParts.push(`scaleX(${facing === "left" ? -1 : 1})`);
  if (pose === "landing") {
    bodyTransformParts.push(LANDING_SQUASH);
  }
  if (pose === "hit") {
    bodyTransformParts.push("rotate(5deg)");
  }
  const bodyTransform = bodyTransformParts.join(" ");

  const idleAnim = pose === "idle" ? ANIM.breathe : undefined;

  return (
    <div
      className="absolute z-20"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        animation: idleAnim,
      }}
    >
      <div
        className={`relative h-full w-full ${hitFlashActive ? "opacity-95" : ""}`}
        style={{
          transform: bodyTransform,
          transformOrigin: "center bottom",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transition: hitFlashActive ? "filter 110ms ease-out" : "none",
          filter: playerPoweredUp
            ? "drop-shadow(0 0 6px rgba(250, 204, 21, 0.8))"
            : undefined,
        }}
      >
        {/* Hat */}
        <div className="absolute left-[18%] top-0 h-[26%] w-[64%] rounded-t-[5px] border-2 border-black bg-red-600" />
        {/* Hat brim */}
        <div className="absolute left-[10%] top-[20%] h-[10%] w-[80%] border-2 border-black bg-red-700" />
        {/* Face */}
        <div className="absolute left-[18%] top-[30%] h-[30%] w-[64%] rounded-[4px] border-2 border-black bg-[#ffd8b0]" />
        {/* Eyes */}
        <div className="absolute left-[30%] top-[38%] h-1 w-1 rounded-full bg-black" />
        <div className="absolute right-[30%] top-[38%] h-1 w-1 rounded-full bg-black" />
        {/* Mouth / mustache */}
        <div className="absolute left-[25%] top-[48%] h-[7%] w-[50%] rounded-[2px] bg-[#6b2e12]" />
        {/* Body */}
        <div className="absolute left-[8%] top-[58%] h-[28%] w-[84%] rounded-t-[4px] border-2 border-black bg-blue-600" />
        {/* Arms */}
        <div
          className="absolute left-[14%] h-[12%] w-[14%] border-2 border-black bg-blue-500"
          style={{ top: leftArmTop }}
        />
        <div
          className="absolute right-[14%] h-[12%] w-[14%] border-2 border-black bg-blue-500"
          style={{ top: rightArmTop }}
        />
        {/* Belt area */}
        <div className="absolute left-[34%] top-[64%] h-[24%] w-[32%] border-2 border-black bg-blue-500" />
        {/* Buttons */}
        <div className="absolute left-[40%] top-[68%] h-1 w-1 rounded-full border border-black bg-yellow-200" />
        <div className="absolute right-[40%] top-[68%] h-1 w-1 rounded-full border border-black bg-yellow-200" />
        {/* Legs */}
        <div
          className="absolute left-[14%] w-[24%] rounded-[2px] border-2 border-black bg-[#5f3417]"
          style={{ top: leftLegTop, height: leftLegH }}
        />
        <div
          className="absolute right-[14%] w-[24%] rounded-[2px] border-2 border-black bg-[#5f3417]"
          style={{ top: rightLegTop, height: rightLegH }}
        />
        {/* Shadow */}
        <div className="absolute left-0 right-0 bottom-0 h-[6%] rounded-full bg-black/20" />
        {/* Power-up glow */}
        {playerPoweredUp && (
          <>
            <div className="pointer-events-none absolute -inset-1 rounded-[6px] border-2 border-yellow-200/90" />
            <div className="pointer-events-none absolute -inset-1.5 rounded-[8px] bg-amber-200/35 blur-[1px]" />
          </>
        )}
        {/* Hit flash overlay */}
        {hitFlashActive && (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-[4px] bg-white/70 mix-blend-screen" />
            <div className="pointer-events-none absolute -inset-0.5 rounded-[4px] border-2 border-rose-500/90" />
          </>
        )}
      </div>
    </div>
  );
}
