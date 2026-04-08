"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  IconBook,
  IconBolt,
  IconClock,
  IconFlag3,
  IconKey,
  IconMap2,
  IconPlayerPlay,
  IconPuzzle,
  IconShieldCheck,
  IconSparkles,
  IconTrophy,
  IconUsers,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ANIM, DIMENSION_COLORS } from "./_lib/visual-constants";
import { LANDING_DURATION_MS } from "./_lib/player-animation";
import {
  updateParticles,
  getParticleCap,
  spawnDust,
  spawnRunDust,
  spawnSparkle,
  spawnBurst,
  spawnHitParticles,
  spawnAmbient,
  type Particle,
} from "./_lib/particle-engine";
import ParallaxBackground from "./_components/ParallaxBackground";
import PlayerSprite from "./_components/PlayerSprite";
import ParticleSystem from "./_components/ParticleSystem";
import { CREW_FACES } from "./_components/PixelFaces";
import { pixelFont, displayFont, bodyFont } from "./_lib/fonts";
import type {
  DimensionId,
  JumpRunPlatform,
  JumpRunStation,
  JumpRunDanger,
  JumpRunZone,
  JumpRunQuestionBlock,
  JumpRunPowerup,
  JumpRunChapterId,
  JumpRunMapId,
  JumpRunDifficultyId,
  JumpRunHazardVariant,
  RuntimeHazard,
  RuntimePowerupMotion,
  PendingRespawn,
} from "./_lib/types";
import { CHARACTERS, WELTKARTE_DOWNLOADS, DIMENSION_ACCESS_CODES } from "./_data/characters";
import { JUMP_RUN_CHAPTERS } from "./_data/chapters";
import {
  JUMP_RUN_MAPS,
  JUMP_RUN_CHAPTER_MAP,
  JUMP_RUN_DIFFICULTIES,
  JUMP_RUN_STATION_VISUALS,
  JUMP_RUN_STATION_DEFAULT_VISUAL,
  JUMP_RUN_HAZARD_VISUALS,
  JUMP_RUN_PLAYER,
  JUMP_RUN_PHYSICS,
  JUMP_RUN_POWERUP_MOTION,
  JUMP_RUN_HIT_EFFECT,
  JUMP_RUN_PLAYER_POWER_EFFECT,
  JUMP_RUN_MAX_LIVES,
  JUMP_RUN_BEST_TIME_STORAGE_KEY,
  JUMP_RUN_GROUND_HEIGHT,
  ACCESS_CODE_STORAGE_KEY,
  DEFAULT_CHAPTER_ID,
  DEFAULT_MAP_ID,
  DEFAULT_DIFFICULTY_ID,
  hazardVariantFromDangerId,
  buildPlayfieldStyle,
  formatTime,
  bestTimeKey,
  buildRuntimeHazards,
  buildInitialPowerupPositions,
  buildInitialRevealedPowerups,
} from "./_data/maps";
import "./escape-game.css";



type EscapeGameProps = {
  gameOnly?: boolean;
  forceChapterId?: JumpRunChapterId;
};

export function EscapeGamePageContent({ gameOnly = false, forceChapterId }: EscapeGameProps = {}) {
  const searchParams = useSearchParams();
  const chapterParam = forceChapterId || searchParams.get("chapter");
  const isChallengeMode = gameOnly || searchParams.get("mode") === "challenge";
  const [enteredCodes, setEnteredCodes] = useState<Record<DimensionId, string>>(() =>
    CHARACTERS.reduce((acc, character) => {
      acc[character.id] = "";
      return acc;
    }, {} as Record<DimensionId, string>)
  );
  const [earnedCodes, setEarnedCodes] = useState<Partial<Record<DimensionId, string>>>({});
  const [recentlyEarnedCode, setRecentlyEarnedCode] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] =
    useState<JumpRunChapterId>(DEFAULT_CHAPTER_ID);
  const activeChapter = JUMP_RUN_CHAPTERS[selectedChapterId];
  const activeStations = activeChapter.stations;
  const activeDangers = activeChapter.dangers;
  const [selectedMapId, setSelectedMapId] = useState<JumpRunMapId>(DEFAULT_MAP_ID);
  const [difficultyId, setDifficultyId] = useState<JumpRunDifficultyId>(
    DEFAULT_DIFFICULTY_ID
  );
  useEffect(() => {
    if (!chapterParam) return;
    if (chapterParam in JUMP_RUN_CHAPTERS) {
      setSelectedChapterId(chapterParam as JumpRunChapterId);
    }
  }, [chapterParam]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(ACCESS_CODE_STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as {
        entered?: Partial<Record<DimensionId, string>>;
        earned?: Partial<Record<DimensionId, string>>;
      };
      if (parsed.entered) {
        setEnteredCodes((prev) => ({ ...prev, ...parsed.entered }));
      }
      if (parsed.earned) {
        setEarnedCodes(parsed.earned);
      }
    } catch {
      // ignore malformed local storage
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      ACCESS_CODE_STORAGE_KEY,
      JSON.stringify({
        entered: enteredCodes,
        earned: earnedCodes,
      })
    );
  }, [enteredCodes, earnedCodes]);

  useEffect(() => {
    const chapterMapId = JUMP_RUN_CHAPTER_MAP[selectedChapterId];
    if (selectedMapId !== chapterMapId) {
      setSelectedMapId(chapterMapId);
    }
  }, [selectedChapterId, selectedMapId]);

  const activeMap = JUMP_RUN_MAPS[selectedMapId];
  const difficultyConfig = JUMP_RUN_DIFFICULTIES[difficultyId];
  const [player, setPlayer] = useState(() => ({
    x: JUMP_RUN_MAPS[DEFAULT_MAP_ID].start.x,
    y: JUMP_RUN_MAPS[DEFAULT_MAP_ID].start.y,
    vx: 0,
    vy: 0,
    onGround: false,
    facing: "right",
  }));
  const [runtimeHazards, setRuntimeHazards] = useState<RuntimeHazard[]>(() =>
    buildRuntimeHazards(
      JUMP_RUN_MAPS[DEFAULT_MAP_ID],
      JUMP_RUN_DIFFICULTIES[DEFAULT_DIFFICULTY_ID]
    )
  );
  const [runnerLives, setRunnerLives] = useState(
    JUMP_RUN_DIFFICULTIES[DEFAULT_DIFFICULTY_ID].lives
  );
  const [runnerMessage, setRunnerMessage] = useState<string | null>(null);
  const [runnerFinished, setRunnerFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [stationAnswers, setStationAnswers] = useState<Record<string, string>>({});
  const [stationSolved, setStationSolved] = useState<Record<string, boolean>>({});
  const [collectedBits, setCollectedBits] = useState<Record<string, boolean>>({});
  const [collectedPowerups, setCollectedPowerups] = useState<Record<string, boolean>>({});
  const [powerupPositions, setPowerupPositions] = useState<
    Record<string, { x: number; y: number }>
  >(() => buildInitialPowerupPositions(JUMP_RUN_MAPS[DEFAULT_MAP_ID]));
  const [revealedPowerups, setRevealedPowerups] = useState<Record<string, boolean>>(() =>
    buildInitialRevealedPowerups(JUMP_RUN_MAPS[DEFAULT_MAP_ID])
  );
  const [usedQuestionBlocks, setUsedQuestionBlocks] = useState<Record<string, boolean>>({});
  const [stationFeedback, setStationFeedback] = useState<string | null>(null);
  const [activeStationId, setActiveStationId] = useState<string | null>(null);
  const [runElapsedMs, setRunElapsedMs] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<string, number>>({});
  const [cameraX, setCameraX] = useState(0);
  const [hitFlashActive, setHitFlashActive] = useState(false);
  const [hitFlashDirection, setHitFlashDirection] = useState<1 | -1>(1);
  const [playerPoweredUp, setPlayerPoweredUp] = useState(false);
  const [playerGrowPulse, setPlayerGrowPulse] = useState(false);
  const [playfieldShakeX, setPlayfieldShakeX] = useState(0);
  const [hitImpact, setHitImpact] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [touchState, setTouchState] = useState({
    left: false,
    right: false,
    jump: false,
  });
  const playfieldViewportRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef(player);
  const keysRef = useRef({ left: false, right: false });
  const virtualKeysRef = useRef({ left: false, right: false });
  const jumpQueuedRef = useRef(false);
  const jumpLockRef = useRef(false);
  const checkpointRef = useRef({ x: activeMap.start.x, y: activeMap.start.y });
  const invulnerableUntilRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const viewportWidthRef = useRef(900);
  const cameraXRef = useRef(0);
  const runStartRef = useRef<number | null>(null);
  const runnerLivesRef = useRef(runnerLives);
  const runnerFinishedRef = useRef(runnerFinished);
  const playerPoweredUpRef = useRef(playerPoweredUp);
  const pendingRespawnRef = useRef<PendingRespawn | null>(null);
  const allStationsSolvedRef = useRef(false);
  const activeStationRef = useRef<string | null>(null);
  const collectedBitsRef = useRef(collectedBits);
  const collectedPowerupsRef = useRef(collectedPowerups);
  const powerupPositionsRef = useRef(powerupPositions);
  const powerupMotionsRef = useRef<Record<string, RuntimePowerupMotion>>({});
  const revealedPowerupsRef = useRef(revealedPowerups);
  const usedQuestionBlocksRef = useRef(usedQuestionBlocks);
  const runtimeHazardsRef = useRef(runtimeHazards);
  const bestTimesRef = useRef(bestTimes);
  const soundEnabledRef = useRef(soundEnabled);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hitFlashTimeoutRef = useRef<number | null>(null);
  const hitImpactTimeoutRef = useRef<number | null>(null);
  const playerGrowPulseTimeoutRef = useRef<number | null>(null);
  const shakeTimeoutsRef = useRef<number[]>([]);
  const prevOnGroundRef = useRef(true);
  const landingUntilRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const [particleSnapshot, setParticleSnapshot] = useState<Particle[]>([]);
  const particleFrameCounter = useRef(0);
  const lastRunDustRef = useRef(0);
  const lastAmbientRef = useRef(0);
  const [nowTimestamp, setNowTimestamp] = useState(0);

  const enteredCodeByDimension = useMemo(
    () =>
      Object.entries(enteredCodes).reduce((acc, [dimensionId, value]) => {
        acc[dimensionId as DimensionId] = value.trim();
        return acc;
      }, {} as Record<DimensionId, string>),
    [enteredCodes]
  );
  const acceptedCodeByDimension = useMemo(
    () =>
      CHARACTERS.reduce((acc, character) => {
        acc[character.id] =
          enteredCodeByDimension[character.id] === DIMENSION_ACCESS_CODES[character.id];
        return acc;
      }, {} as Record<DimensionId, boolean>),
    [enteredCodeByDimension]
  );
  const acceptedCodeCount = useMemo(
    () => Object.values(acceptedCodeByDimension).filter(Boolean).length,
    [acceptedCodeByDimension]
  );
  const allCodesAccepted = acceptedCodeCount === CHARACTERS.length;
  const accessProgress = (acceptedCodeCount / CHARACTERS.length) * 100;


  const completedStations = useMemo(
    () => Object.values(stationSolved).filter(Boolean).length,
    [stationSolved]
  );
  const activeStationMap = useMemo(
    () =>
      activeStations.reduce((acc, station) => {
        acc[station.id] = station;
        return acc;
      }, {} as Record<string, JumpRunStation>),
    [activeStations]
  );
  const activeDangerMap = useMemo(
    () =>
      activeDangers.reduce((acc, danger) => {
        acc[danger.id] = danger;
        return acc;
      }, {} as Record<string, JumpRunDanger>),
    [activeDangers]
  );
  const activeStationLabelMap = useMemo(
    () =>
      activeStations.reduce((acc, station) => {
        acc[station.id] = station.mapLabel;
        return acc;
      }, {} as Record<string, string>),
    [activeStations]
  );
  const allStationsSolved = completedStations === activeStations.length;
  const chapterProgress = (completedStations / Math.max(activeStations.length, 1)) * 100;
  const runnerAlive = runnerLives > 0;
  const runnerProgress =
    (player.x / Math.max(activeMap.world.width - JUMP_RUN_PLAYER.width, 1)) * 100;
  const playerScale = playerGrowPulse
    ? JUMP_RUN_PLAYER_POWER_EFFECT.pulseScale
    : playerPoweredUp
    ? JUMP_RUN_PLAYER_POWER_EFFECT.baseScale
    : 1;
  const activeStation = activeStationId ? activeStationMap[activeStationId] : null;
  const activeStationVisual = activeStation
    ? JUMP_RUN_STATION_VISUALS[activeStation.id] ?? JUMP_RUN_STATION_DEFAULT_VISUAL
    : JUMP_RUN_STATION_DEFAULT_VISUAL;
  const activeStationSolved = activeStation ? stationSolved[activeStation.id] : false;
  const activeStationAnswer = activeStation ? stationAnswers[activeStation.id] ?? "" : "";
  const activeStationZoneMap = useMemo(
    () =>
      activeMap.stationZones.reduce((acc, zone) => {
        acc[zone.id] = zone;
        return acc;
      }, {} as Record<string, JumpRunZone>),
    [activeMap]
  );
  const activePowerupMap = useMemo(
    () =>
      activeMap.powerups.reduce((acc, powerup) => {
        acc[powerup.id] = powerup;
        return acc;
      }, {} as Record<string, JumpRunPowerup>),
    [activeMap]
  );
  const activePlayfieldStyle = useMemo(
    () => buildPlayfieldStyle(activeMap.theme),
    [activeMap]
  );
  const activeHazardVisuals = useMemo(
    () => JUMP_RUN_HAZARD_VISUALS[activeMap.chapterId],
    [activeMap.chapterId]
  );

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    runnerLivesRef.current = runnerLives;
  }, [runnerLives]);

  useEffect(() => {
    runnerFinishedRef.current = runnerFinished;
  }, [runnerFinished]);

  useEffect(() => {
    playerPoweredUpRef.current = playerPoweredUp;
  }, [playerPoweredUp]);

  useEffect(() => {
    allStationsSolvedRef.current = allStationsSolved;
  }, [allStationsSolved]);

  useEffect(() => {
    collectedBitsRef.current = collectedBits;
  }, [collectedBits]);

  useEffect(() => {
    collectedPowerupsRef.current = collectedPowerups;
  }, [collectedPowerups]);

  useEffect(() => {
    powerupPositionsRef.current = powerupPositions;
  }, [powerupPositions]);

  useEffect(() => {
    revealedPowerupsRef.current = revealedPowerups;
  }, [revealedPowerups]);

  useEffect(() => {
    usedQuestionBlocksRef.current = usedQuestionBlocks;
  }, [usedQuestionBlocks]);

  useEffect(() => {
    runtimeHazardsRef.current = runtimeHazards;
  }, [runtimeHazards]);

  useEffect(() => {
    cameraXRef.current = cameraX;
  }, [cameraX]);

  useEffect(() => {
    bestTimesRef.current = bestTimes;
  }, [bestTimes]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(JUMP_RUN_BEST_TIME_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, number>;
      setBestTimes(parsed);
      bestTimesRef.current = parsed;
    } catch {
      setBestTimes({});
      bestTimesRef.current = {};
    }
  }, []);

  useEffect(() => {
    const updateViewportWidth = () => {
      if (!playfieldViewportRef.current) return;
      viewportWidthRef.current = playfieldViewportRef.current.clientWidth;
    };
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, [activeMap]);

  const handleCodeInput = (id: DimensionId, value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 6);
    setEnteredCodes((prev) => ({ ...prev, [id]: sanitized }));
  };


  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const clearShakeTimeouts = () => {
    for (const timeoutId of shakeTimeoutsRef.current) {
      window.clearTimeout(timeoutId);
    }
    shakeTimeoutsRef.current = [];
  };

  const clearHitEffectTimers = () => {
    if (hitFlashTimeoutRef.current !== null) {
      window.clearTimeout(hitFlashTimeoutRef.current);
      hitFlashTimeoutRef.current = null;
    }
    if (hitImpactTimeoutRef.current !== null) {
      window.clearTimeout(hitImpactTimeoutRef.current);
      hitImpactTimeoutRef.current = null;
    }
    clearShakeTimeouts();
  };

  const clearPlayerPowerTimers = () => {
    if (playerGrowPulseTimeoutRef.current !== null) {
      window.clearTimeout(playerGrowPulseTimeoutRef.current);
      playerGrowPulseTimeoutRef.current = null;
    }
  };

  const disablePlayerPowerMode = () => {
    clearPlayerPowerTimers();
    playerPoweredUpRef.current = false;
    setPlayerPoweredUp(false);
    setPlayerGrowPulse(false);
  };

  const triggerPlayerGrowEffect = () => {
    clearPlayerPowerTimers();
    playerPoweredUpRef.current = true;
    setPlayerPoweredUp(true);
    setPlayerGrowPulse(true);
    playerGrowPulseTimeoutRef.current = window.setTimeout(() => {
      setPlayerGrowPulse(false);
      playerGrowPulseTimeoutRef.current = null;
    }, JUMP_RUN_PLAYER_POWER_EFFECT.pulseMs);
  };

  const triggerHitEffects = (direction: 1 | -1, impactX: number, impactY: number) => {
    clearHitEffectTimers();
    setHitFlashDirection(direction);
    setHitFlashActive(true);
    setHitImpact({ x: impactX, y: impactY });

    hitFlashTimeoutRef.current = window.setTimeout(() => {
      setHitFlashActive(false);
      hitFlashTimeoutRef.current = null;
    }, JUMP_RUN_HIT_EFFECT.flashMs);

    hitImpactTimeoutRef.current = window.setTimeout(() => {
      setHitImpact(null);
      hitImpactTimeoutRef.current = null;
    }, JUMP_RUN_HIT_EFFECT.flashMs);

    const shakeSequence = [-8, 6, -4, 2, 0].map((step) => step * -direction);
    shakeSequence.forEach((offset, index) => {
      const timeoutId = window.setTimeout(() => {
        setPlayfieldShakeX(offset);
      }, index * 38);
      shakeTimeoutsRef.current.push(timeoutId);
    });
  };

  useEffect(() => {
    return () => {
      clearHitEffectTimers();
      clearPlayerPowerTimers();
      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  const setVirtualDirection = (direction: "left" | "right", active: boolean) => {
    virtualKeysRef.current[direction] = active;
    setTouchState((prev) => ({ ...prev, [direction]: active }));
  };

  const triggerVirtualMove = (direction: "left" | "right") => {
    setVirtualDirection(direction, true);
    window.setTimeout(() => setVirtualDirection(direction, false), 170);
  };

  const triggerVirtualJump = () => {
    if (jumpLockRef.current) return;
    jumpQueuedRef.current = true;
    jumpLockRef.current = true;
    setTouchState((prev) => ({ ...prev, jump: true }));
    window.setTimeout(() => {
      jumpLockRef.current = false;
      setTouchState((prev) => ({ ...prev, jump: false }));
    }, 200);
  };

  const onTouchMoveStart = (direction: "left" | "right") => {
    setVirtualDirection(direction, true);
  };

  const onTouchMoveEnd = (direction: "left" | "right") => {
    setVirtualDirection(direction, false);
  };


  const playSfx = (kind: "jump" | "collect" | "hit" | "finish" | "station") => {
    if (!soundEnabledRef.current) return;
    const context = audioContextRef.current;
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    const config =
      kind === "jump"
        ? { start: 520, end: 680, duration: 0.08, volume: 0.05, type: "square" as const }
        : kind === "collect"
        ? { start: 760, end: 980, duration: 0.1, volume: 0.06, type: "triangle" as const }
        : kind === "hit"
        ? { start: 220, end: 130, duration: 0.14, volume: 0.08, type: "sawtooth" as const }
        : kind === "finish"
        ? { start: 640, end: 1120, duration: 0.2, volume: 0.07, type: "triangle" as const }
        : { start: 420, end: 520, duration: 0.1, volume: 0.045, type: "square" as const };

    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(config.start, now);
    oscillator.frequency.exponentialRampToValueAtTime(config.end, now + config.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(config.volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + config.duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + config.duration + 0.02);
  };

  const toggleSound = async () => {
    if (soundEnabledRef.current) {
      setSoundEnabled(false);
      setRunnerMessage("Sound deaktiviert.");
      return;
    }

    const AudioConstructor =
      typeof window !== "undefined"
        ? window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext
        : undefined;

    if (!AudioConstructor) {
      setRunnerMessage("Audio wird in diesem Browser nicht unterstützt.");
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioConstructor();
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    setSoundEnabled(true);
    setRunnerMessage("Sound aktiviert.");
  };

  const handleStationSelect = (stationId: string, optionId: string) => {
    setStationAnswers((prev) => ({ ...prev, [stationId]: optionId }));
    setStationFeedback(null);
  };

  const handleStationCheck = (stationId: string) => {
    const station = activeStationMap[stationId];
    if (!station) {
      setStationFeedback("Station nicht gefunden.");
      return;
    }
    const answerId = stationAnswers[stationId];
    if (!answerId) {
      setStationFeedback("Bitte wähle eine Antwort.");
      return;
    }
    const isCorrect = station.options.find((option) => option.id === answerId)?.correct;
    if (isCorrect) {
      setStationSolved((prev) => ({ ...prev, [stationId]: true }));
      const zone = activeStationZoneMap[stationId];
      if (zone) {
        checkpointRef.current = {
          x: zone.x + zone.width / 2 - JUMP_RUN_PLAYER.width / 2,
          y: zone.y - JUMP_RUN_PLAYER.height - 4,
        };
      }
      playSfx("collect");
      setStationFeedback(`Richtig! ${station.reward} eingesammelt.`);
      setRunnerMessage(`Lernstern erhalten: ${station.reward}.`);
    } else {
      setStationFeedback("Noch nicht. Schau dir den Lernhinweis oben an.");
    }
  };

  const resetJumpRun = () => {
    clearHitEffectTimers();
    disablePlayerPowerMode();
    const initialPowerupPositions = buildInitialPowerupPositions(activeMap);
    const initialRevealedPowerups = buildInitialRevealedPowerups(activeMap);
    const nextPlayer = {
      ...playerRef.current,
      x: activeMap.start.x,
      y: activeMap.start.y,
      vx: 0,
      vy: 0,
      onGround: false,
    };
    playerRef.current = nextPlayer;
    const nextHazards = buildRuntimeHazards(activeMap, difficultyConfig);
    runtimeHazardsRef.current = nextHazards;
    setRuntimeHazards(nextHazards);
    setPlayer(nextPlayer);
    setRunnerLives(difficultyConfig.lives);
    setRunnerMessage(null);
    setRunnerFinished(false);
    setRecentlyEarnedCode(null);
    setRunElapsedMs(0);
    setStationAnswers({});
    setStationSolved({});
    setCollectedBits({});
    setCollectedPowerups({});
    setPowerupPositions(initialPowerupPositions);
    setRevealedPowerups(initialRevealedPowerups);
    setUsedQuestionBlocks({});
    setStationFeedback(null);
    setActiveStationId(null);
    setCameraX(0);
    setPlayfieldShakeX(0);
    setHitFlashActive(false);
    setHitFlashDirection(1);
    setHitImpact(null);
    setTouchState({ left: false, right: false, jump: false });
    checkpointRef.current = { x: activeMap.start.x, y: activeMap.start.y };
    keysRef.current = { left: false, right: false };
    virtualKeysRef.current = { left: false, right: false };
    jumpQueuedRef.current = false;
    jumpLockRef.current = false;
    runStartRef.current = null;
    invulnerableUntilRef.current = 0;
    runnerLivesRef.current = difficultyConfig.lives;
    runnerFinishedRef.current = false;
    pendingRespawnRef.current = null;
    collectedBitsRef.current = {};
    collectedPowerupsRef.current = {};
    powerupPositionsRef.current = initialPowerupPositions;
    powerupMotionsRef.current = {};
    revealedPowerupsRef.current = initialRevealedPowerups;
    usedQuestionBlocksRef.current = {};
    cameraXRef.current = 0;
    activeStationRef.current = null;
    lastFrameRef.current = null;
    particlesRef.current = [];
    setParticleSnapshot([]);
    prevOnGroundRef.current = true;
    landingUntilRef.current = 0;
    lastRunDustRef.current = 0;
    lastAmbientRef.current = 0;
  };

  useEffect(() => {
    resetJumpRun();
    setRunnerMessage(
      `Chapter: ${activeChapter.title} | Map: ${activeMap.label} | Schwierigkeit: ${difficultyConfig.label}`
    );
  }, [selectedChapterId, selectedMapId, difficultyId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (target.isContentEditable) return;
      }

      const key = event.key;
      if (["ArrowRight", "ArrowLeft", "ArrowUp", " "].includes(key)) {
        event.preventDefault();
      }

      if (key === "ArrowRight") {
        keysRef.current.right = true;
        return;
      }
      if (key === "ArrowLeft") {
        keysRef.current.left = true;
        return;
      }
      if (key === "ArrowUp" || key === " ") {
        if (!jumpLockRef.current) {
          jumpQueuedRef.current = true;
          jumpLockRef.current = true;
        }
        return;
      }
      if (key.toLowerCase() === "r") {
        resetJumpRun();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "ArrowRight") {
        keysRef.current.right = false;
      }
      if (key === "ArrowLeft") {
        keysRef.current.left = false;
      }
      if (key === "ArrowUp" || key === " ") {
        jumpLockRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const applyDamage = (message: string, now: number, sourceX?: number) => {
      if (now < invulnerableUntilRef.current) return;
      playSfx("hit");
      const playerCenter = playerRef.current.x + JUMP_RUN_PLAYER.width / 2;
      const impactSourceX =
        sourceX ?? playerCenter + (playerRef.current.facing === "right" ? 30 : -30);
      const knockbackDirection: 1 | -1 = playerCenter < impactSourceX ? -1 : 1;
      triggerHitEffects(
        knockbackDirection,
        playerCenter,
        playerRef.current.y + JUMP_RUN_PLAYER.height / 2
      );
      // Hit particles
      const capNow = getParticleCap(viewportWidthRef.current);
      particlesRef.current = [
        ...particlesRef.current,
        ...spawnHitParticles(playerCenter, playerRef.current.y + JUMP_RUN_PLAYER.height / 2, 5),
      ].slice(-capNow);
      if (playerPoweredUpRef.current) {
        disablePlayerPowerMode();
      }

      const nextLives = Math.max(runnerLivesRef.current - 1, 0);
      runnerLivesRef.current = nextLives;
      setRunnerLives(nextLives);
      const invulnerabilityMs =
        difficultyConfig.id === "easy" ? 1200 : difficultyConfig.id === "hard" ? 650 : 900;
      invulnerableUntilRef.current = now + invulnerabilityMs;
      if (nextLives === 0) {
        pendingRespawnRef.current = null;
        const gameOverPlayer = {
          ...playerRef.current,
          x: clamp(
            playerRef.current.x + knockbackDirection * 16,
            0,
            activeMap.world.width - JUMP_RUN_PLAYER.width
          ),
          y: Math.max(0, playerRef.current.y - 8),
          vx: 0,
          vy: 0,
          onGround: false,
          facing: knockbackDirection < 0 ? "left" : "right",
        };
        playerRef.current = gameOverPlayer;
        setPlayer(gameOverPlayer);
        setRunnerMessage("Game Over! Neustart mit R.");
        return;
      }

      pendingRespawnRef.current = {
        until: now + JUMP_RUN_HIT_EFFECT.knockbackMs,
        startX: playerRef.current.x,
        startY: playerRef.current.y,
        knockbackDirection,
        message,
        checkpoint: checkpointRef.current,
      };
      setStationFeedback(null);
    };

    const maybeUpdateBestTime = (finalTimeMs: number) => {
      const key = bestTimeKey(selectedChapterId, selectedMapId, difficultyId);
      const currentBest = bestTimesRef.current[key];
      const isNewBest = currentBest === undefined || finalTimeMs < currentBest;
      if (!isNewBest) return false;

      const updatedBestTimes = { ...bestTimesRef.current, [key]: finalTimeMs };
      bestTimesRef.current = updatedBestTimes;
      setBestTimes(updatedBestTimes);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          JUMP_RUN_BEST_TIME_STORAGE_KEY,
          JSON.stringify(updatedBestTimes)
        );
      }
      return true;
    };

    const loop = (timestamp: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((timestamp - lastFrameRef.current) / 1000, 0.033);
      lastFrameRef.current = timestamp;

      if (runnerLivesRef.current <= 0 || runnerFinishedRef.current) {
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      const pendingRespawn = pendingRespawnRef.current;
      if (pendingRespawn) {
        if (runStartRef.current !== null) {
          setRunElapsedMs(Math.max(0, timestamp - runStartRef.current));
        }

        const remainingMs = pendingRespawn.until - timestamp;
        if (remainingMs <= 0) {
          pendingRespawnRef.current = null;
          const checkpoint = pendingRespawn.checkpoint;
          const respawnPlayer = {
            ...playerRef.current,
            x: checkpoint.x,
            y: checkpoint.y,
            vx: 0,
            vy: 0,
            onGround: false,
            facing: pendingRespawn.knockbackDirection < 0 ? "left" : "right",
          };
          const viewportWidth = Math.max(320, viewportWidthRef.current);
          const maxCamera = Math.max(activeMap.world.width - viewportWidth, 0);
          const nextCameraX = clamp(
            checkpoint.x + JUMP_RUN_PLAYER.width / 2 - viewportWidth * 0.35,
            0,
            maxCamera
          );
          cameraXRef.current = nextCameraX;
          setCameraX(nextCameraX);
          playerRef.current = respawnPlayer;
          setPlayer(respawnPlayer);
          setRunnerMessage(pendingRespawn.message);
          animationFrame = window.requestAnimationFrame(loop);
          return;
        }

        const progress =
          1 - remainingMs / Math.max(JUMP_RUN_HIT_EFFECT.knockbackMs, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        const knockbackX = clamp(
          pendingRespawn.startX +
            pendingRespawn.knockbackDirection * JUMP_RUN_HIT_EFFECT.knockbackDistance * eased,
          0,
          activeMap.world.width - JUMP_RUN_PLAYER.width
        );
        const knockbackY = Math.max(
          0,
          pendingRespawn.startY -
            Math.sin(progress * Math.PI) * JUMP_RUN_HIT_EFFECT.knockbackArcHeight
        );
        const knockbackPlayer = {
          ...playerRef.current,
          x: knockbackX,
          y: knockbackY,
          vx: pendingRespawn.knockbackDirection * 120 * (1 - progress),
          vy: -150 * (1 - progress),
          onGround: false,
          facing: pendingRespawn.knockbackDirection < 0 ? "left" : "right",
        };
        playerRef.current = knockbackPlayer;
        setPlayer(knockbackPlayer);
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      const inputLeft = keysRef.current.left || virtualKeysRef.current.left;
      const inputRight = keysRef.current.right || virtualKeysRef.current.right;
      const moveDirection = (inputRight ? 1 : 0) - (inputLeft ? 1 : 0);

      const current = playerRef.current;
      const moveSpeed = JUMP_RUN_PHYSICS.moveSpeed * difficultyConfig.speedMultiplier;
      const gravity = JUMP_RUN_PHYSICS.gravity * difficultyConfig.gravityMultiplier;
      const jumpVelocity = JUMP_RUN_PHYSICS.jumpVelocity * difficultyConfig.jumpMultiplier;
      let vx = moveDirection * moveSpeed;
      let vy = current.vy;
      if (jumpQueuedRef.current && current.onGround) {
        vy = jumpVelocity;
        playSfx("jump");
        jumpQueuedRef.current = false;
      }
      vy += gravity * dt;

      if (runStartRef.current === null && (moveDirection !== 0 || jumpQueuedRef.current)) {
        runStartRef.current = timestamp;
        setRunElapsedMs(0);
      } else if (runStartRef.current !== null) {
        setRunElapsedMs(Math.max(0, timestamp - runStartRef.current));
      }

      let nextX = clamp(
        current.x + vx * dt,
        0,
        activeMap.world.width - JUMP_RUN_PLAYER.width
      );
      let nextY = current.y + vy * dt;
      let onGround = false;

      const prevBottom = current.y + JUMP_RUN_PLAYER.height;
      const nextBottom = nextY + JUMP_RUN_PLAYER.height;
      const prevTop = current.y;
      const nextTop = nextY;
      const triggeredQuestionBlocks: JumpRunQuestionBlock[] = [];

      const solidSurfaces: Array<JumpRunPlatform | JumpRunQuestionBlock> = [
        ...activeMap.platforms,
        ...activeMap.questionBlocks,
      ];

      for (const surface of solidSurfaces) {
        const overlapsX =
          nextX + JUMP_RUN_PLAYER.width > surface.x &&
          nextX < surface.x + surface.width;
        if (!overlapsX) continue;

        if (vy >= 0 && prevBottom <= surface.y && nextBottom >= surface.y) {
          nextY = surface.y - JUMP_RUN_PLAYER.height;
          vy = 0;
          onGround = true;
          break;
        }

        if (
          vy < 0 &&
          prevTop >= surface.y + surface.height &&
          nextTop <= surface.y + surface.height
        ) {
          nextY = surface.y + surface.height;
          vy = 0;
          if (
            "powerupId" in surface &&
            !usedQuestionBlocksRef.current[surface.id]
          ) {
            triggeredQuestionBlocks.push(surface);
          }
        }
      }

      if (nextY > activeMap.world.height + 120) {
        applyDamage(
          "Abgestürzt! Zurück zum Checkpoint.",
          timestamp,
          playerRef.current.x + JUMP_RUN_PLAYER.width / 2
        );
        animationFrame = window.requestAnimationFrame(loop);
        return;
      }

      if (triggeredQuestionBlocks.length > 0) {
        const newlyUsedBlocks = triggeredQuestionBlocks.filter(
          (block) => !usedQuestionBlocksRef.current[block.id]
        );
        if (newlyUsedBlocks.length > 0) {
          const nextUsedQuestionBlocks = { ...usedQuestionBlocksRef.current };
          for (const block of newlyUsedBlocks) {
            nextUsedQuestionBlocks[block.id] = true;
          }
          usedQuestionBlocksRef.current = nextUsedQuestionBlocks;
          setUsedQuestionBlocks(nextUsedQuestionBlocks);

          const nextRevealedPowerups = { ...revealedPowerupsRef.current };
          const newlyRevealedPowerups: string[] = [];
          const nextPowerupPositions = { ...powerupPositionsRef.current };
          const nextPowerupMotions = { ...powerupMotionsRef.current };
          let powerupSpawned = false;
          for (const block of newlyUsedBlocks) {
            const powerup = activePowerupMap[block.powerupId];
            if (
              powerup &&
              !nextRevealedPowerups[block.powerupId] &&
              !collectedPowerupsRef.current[block.powerupId]
            ) {
              nextRevealedPowerups[block.powerupId] = true;
              newlyRevealedPowerups.push(block.powerupId);
              const spawnX = clamp(
                block.x + (block.width - powerup.width) / 2,
                0,
                activeMap.world.width - powerup.width
              );
              const spawnStartY = block.y + block.height - powerup.height;
              const playerCenter = nextX + JUMP_RUN_PLAYER.width / 2;
              const blockCenter = block.x + block.width / 2;
              const walkDirection: 1 | -1 = playerCenter <= blockCenter ? 1 : -1;
              nextPowerupPositions[powerup.id] = {
                x: spawnX,
                y: spawnStartY,
              };
              nextPowerupMotions[powerup.id] = {
                phase: "rising",
                targetY: powerup.y,
                vx: walkDirection * JUMP_RUN_POWERUP_MOTION.walkSpeed,
                remainingWalkMs: JUMP_RUN_POWERUP_MOTION.walkDurationMs,
              };
              powerupSpawned = true;
            }
          }
          revealedPowerupsRef.current = nextRevealedPowerups;
          setRevealedPowerups(nextRevealedPowerups);
          if (powerupSpawned) {
            powerupPositionsRef.current = nextPowerupPositions;
            setPowerupPositions(nextPowerupPositions);
            powerupMotionsRef.current = nextPowerupMotions;
          }

          if (newlyRevealedPowerups.length > 0) {
            playSfx("collect");
            setRunnerMessage(
              newlyRevealedPowerups.length > 1
                ? `${newlyRevealedPowerups.length} Super-Pilze freigeschaltet!`
                : "?-Block getroffen! Super-Pilz freigeschaltet."
            );
          } else {
            setRunnerMessage("?-Block ist leer.");
          }
        }
      }

      const powerupMotionEntries = Object.entries(powerupMotionsRef.current);
      if (powerupMotionEntries.length > 0) {
        const nextPowerupPositions = { ...powerupPositionsRef.current };
        const nextPowerupMotions = {} as Record<string, RuntimePowerupMotion>;
        let positionsChanged = false;
        let motionsChanged = false;

        for (const [powerupId, motion] of powerupMotionEntries) {
          const powerup = activePowerupMap[powerupId];
          if (!powerup || collectedPowerupsRef.current[powerupId]) {
            motionsChanged = true;
            continue;
          }

          const currentPosition = nextPowerupPositions[powerupId] ?? {
            x: powerup.x,
            y: powerup.y,
          };

          if (motion.phase === "rising") {
            const nextRiseY = Math.max(
              currentPosition.y - JUMP_RUN_POWERUP_MOTION.riseSpeed * dt,
              motion.targetY
            );
            if (Math.abs(nextRiseY - currentPosition.y) > 0.001) {
              nextPowerupPositions[powerupId] = {
                x: currentPosition.x,
                y: nextRiseY,
              };
              positionsChanged = true;
            }

            if (nextRiseY <= motion.targetY + 0.001) {
              nextPowerupMotions[powerupId] = {
                ...motion,
                phase: "walking",
              };
              motionsChanged = true;
            } else {
              nextPowerupMotions[powerupId] = motion;
            }
            continue;
          }

          const worldMaxX = activeMap.world.width - powerup.width;
          let nextWalkX = currentPosition.x + motion.vx * dt;
          let nextWalkVx = motion.vx;
          if (nextWalkX <= 0) {
            nextWalkX = 0;
            nextWalkVx = Math.abs(nextWalkVx);
          } else if (nextWalkX >= worldMaxX) {
            nextWalkX = worldMaxX;
            nextWalkVx = -Math.abs(nextWalkVx);
          }
          if (Math.abs(nextWalkX - currentPosition.x) > 0.001) {
            nextPowerupPositions[powerupId] = {
              x: nextWalkX,
              y: currentPosition.y,
            };
            positionsChanged = true;
          }

          const nextWalkMs = motion.remainingWalkMs - dt * 1000;
          if (nextWalkMs <= 0) {
            motionsChanged = true;
            continue;
          }

          nextPowerupMotions[powerupId] = {
            ...motion,
            vx: nextWalkVx,
            remainingWalkMs: nextWalkMs,
          };
          motionsChanged = true;
        }

        if (positionsChanged) {
          powerupPositionsRef.current = nextPowerupPositions;
          setPowerupPositions(nextPowerupPositions);
        }
        if (
          motionsChanged ||
          Object.keys(nextPowerupMotions).length !== powerupMotionEntries.length
        ) {
          powerupMotionsRef.current = nextPowerupMotions;
        }
      }

      const playerBox = {
        x: nextX,
        y: nextY,
        width: JUMP_RUN_PLAYER.width,
        height: JUMP_RUN_PLAYER.height,
      };

      let nextRuntimeHazards = runtimeHazardsRef.current;
      let hazardsMoved = false;
      for (let index = 0; index < nextRuntimeHazards.length; index += 1) {
        const hazard = nextRuntimeHazards[index];
        if (!hazard.moving) continue;
        const movement = hazard.moving;
        const speed = movement.speed * difficultyConfig.hazardSpeedMultiplier;
        const currentPos = movement.axis === "x" ? hazard.x : hazard.y;
        let nextPos = currentPos + hazard.direction * speed * dt;
        let nextDirection = hazard.direction;
        if (nextPos <= movement.min) {
          nextPos = movement.min;
          nextDirection = 1;
        } else if (nextPos >= movement.max) {
          nextPos = movement.max;
          nextDirection = -1;
        }

        if (!hazardsMoved) {
          nextRuntimeHazards = [...nextRuntimeHazards];
          hazardsMoved = true;
        }
        nextRuntimeHazards[index] =
          movement.axis === "x"
            ? { ...hazard, x: nextPos, direction: nextDirection }
            : { ...hazard, y: nextPos, direction: nextDirection };
      }

      if (hazardsMoved) {
        runtimeHazardsRef.current = nextRuntimeHazards;
        setRuntimeHazards(nextRuntimeHazards);
      }

      for (const hazard of runtimeHazardsRef.current) {
        const overlaps =
          playerBox.x < hazard.x + hazard.width &&
          playerBox.x + playerBox.width > hazard.x &&
          playerBox.y < hazard.y + hazard.height &&
          playerBox.y + playerBox.height > hazard.y;
        if (overlaps) {
          const danger = activeDangerMap[hazard.dangerId];
          const message = danger
            ? `Autsch! ${danger.title}. ${danger.description}`
            : "Autsch! Gefahr getroffen.";
          applyDamage(message, timestamp, hazard.x + hazard.width / 2);
          animationFrame = window.requestAnimationFrame(loop);
          return;
        }
      }

      const collectedThisFrame: string[] = [];
      for (const collectible of activeMap.collectibles) {
        if (collectedBitsRef.current[collectible.id]) continue;
        const overlaps =
          playerBox.x < collectible.x + collectible.size &&
          playerBox.x + playerBox.width > collectible.x &&
          playerBox.y < collectible.y + collectible.size &&
          playerBox.y + playerBox.height > collectible.y;
        if (overlaps) {
          collectedThisFrame.push(collectible.id);
        }
      }
      if (collectedThisFrame.length > 0) {
        setCollectedBits((prev) => {
          const next = { ...prev };
          for (const id of collectedThisFrame) {
            next[id] = true;
          }
          collectedBitsRef.current = next;
          return next;
        });
        playSfx("collect");
        setRunnerMessage(
          collectedThisFrame.length > 1
            ? `${collectedThisFrame.length} Datenbits eingesammelt!`
            : "Datenbit eingesammelt!"
        );
        // Collect sparkle particles
        for (const id of collectedThisFrame) {
          const col = activeMap.collectibles.find((c) => c.id === id);
          if (col) {
            const capNow = getParticleCap(viewportWidthRef.current);
            particlesRef.current = [
              ...particlesRef.current,
              ...spawnSparkle(col.x + col.size / 2, col.y + col.size / 2, 7),
            ].slice(-capNow);
          }
        }
      }

      const collectedPowerupsThisFrame: JumpRunPowerup[] = [];
      for (const powerup of activeMap.powerups) {
        if (collectedPowerupsRef.current[powerup.id]) continue;
        if (!revealedPowerupsRef.current[powerup.id]) continue;
        const powerupPosition = powerupPositionsRef.current[powerup.id] ?? {
          x: powerup.x,
          y: powerup.y,
        };
        const overlaps =
          playerBox.x < powerupPosition.x + powerup.width &&
          playerBox.x + playerBox.width > powerupPosition.x &&
          playerBox.y < powerupPosition.y + powerup.height &&
          playerBox.y + playerBox.height > powerupPosition.y;
        if (overlaps) {
          collectedPowerupsThisFrame.push(powerup);
        }
      }
      if (collectedPowerupsThisFrame.length > 0) {
        setCollectedPowerups((prev) => {
          const next = { ...prev };
          for (const powerup of collectedPowerupsThisFrame) {
            next[powerup.id] = true;
          }
          collectedPowerupsRef.current = next;
          return next;
        });
        const extraLives = collectedPowerupsThisFrame.reduce(
          (sum, powerup) => sum + powerup.extraLives,
          0
        );
        if (extraLives > 0) {
          const nextLives = Math.min(runnerLivesRef.current + extraLives, JUMP_RUN_MAX_LIVES);
          runnerLivesRef.current = nextLives;
          setRunnerLives(nextLives);
          invulnerableUntilRef.current = Math.max(invulnerableUntilRef.current, timestamp + 700);
        }
        const nextPowerupMotions = { ...powerupMotionsRef.current };
        let powerupMotionRemoved = false;
        for (const powerup of collectedPowerupsThisFrame) {
          if (nextPowerupMotions[powerup.id]) {
            delete nextPowerupMotions[powerup.id];
            powerupMotionRemoved = true;
          }
        }
        if (powerupMotionRemoved) {
          powerupMotionsRef.current = nextPowerupMotions;
        }
        triggerPlayerGrowEffect();
        playSfx("collect");
        setRunnerMessage(
          extraLives > 0
            ? `Super-Pilz! +${extraLives} Leben. Figur wächst!`
            : "Super-Pilz eingesammelt! Figur wächst!"
        );
        // Powerup burst particles
        for (const powerup of collectedPowerupsThisFrame) {
          const pPos = powerupPositionsRef.current[powerup.id] ?? { x: powerup.x, y: powerup.y };
          const capNow = getParticleCap(viewportWidthRef.current);
          particlesRef.current = [
            ...particlesRef.current,
            ...spawnBurst(pPos.x + powerup.width / 2, pPos.y + powerup.height / 2, 11),
          ].slice(-capNow);
        }
      }

      let stationId: string | null = null;
      for (const zone of activeMap.stationZones) {
        const overlaps =
          playerBox.x < zone.x + zone.width &&
          playerBox.x + playerBox.width > zone.x &&
          playerBox.y < zone.y + zone.height &&
          playerBox.y + playerBox.height > zone.y;
        if (overlaps) {
          stationId = zone.id;
          break;
        }
      }
      if (stationId !== activeStationRef.current) {
        activeStationRef.current = stationId;
        setActiveStationId(stationId);
        if (stationId) {
          const station = activeStationMap[stationId];
          playSfx("station");
          setRunnerMessage(
            station ? `Station erreicht: ${station.title}.` : "Station erreicht."
          );
        }
      }

      const finishOverlap =
        playerBox.x < activeMap.finishZone.x + activeMap.finishZone.width &&
        playerBox.x + playerBox.width > activeMap.finishZone.x &&
        playerBox.y < activeMap.finishZone.y + activeMap.finishZone.height &&
        playerBox.y + playerBox.height > activeMap.finishZone.y;

      if (finishOverlap) {
        if (allStationsSolvedRef.current) {
          const finalTimeMs =
            runStartRef.current === null ? 0 : Math.max(0, timestamp - runStartRef.current);
          const accessCode = DIMENSION_ACCESS_CODES[selectedChapterId];
          runnerFinishedRef.current = true;
          setRunnerFinished(true);
          setRunElapsedMs(finalTimeMs);
          setRecentlyEarnedCode(accessCode);
          setEarnedCodes((prev) => ({ ...prev, [selectedChapterId]: accessCode }));
          const hasNewBest = maybeUpdateBestTime(finalTimeMs);
          playSfx("finish");
          setRunnerMessage(
            hasNewBest
              ? `Neue Bestzeit! Ziel erreicht in ${formatTime(finalTimeMs)}. Code: ${accessCode}`
              : `Ziel erreicht in ${formatTime(finalTimeMs)}. Code: ${accessCode}`
          );
        } else {
          setRunnerMessage("Das Ziel bleibt verriegelt. Sammle alle Lernsterne.");
        }
      }

      const nextPlayer = {
        x: nextX,
        y: nextY,
        vx,
        vy,
        onGround,
        facing:
          moveDirection < 0
            ? "left"
            : moveDirection > 0
            ? "right"
            : current.facing,
      };

      const viewportWidth = Math.max(320, viewportWidthRef.current);
      const maxCamera = Math.max(activeMap.world.width - viewportWidth, 0);
      const desiredCameraX = clamp(
        nextPlayer.x + JUMP_RUN_PLAYER.width / 2 - viewportWidth * 0.35,
        0,
        maxCamera
      );
      if (Math.abs(desiredCameraX - cameraXRef.current) > 0.5) {
        cameraXRef.current = desiredCameraX;
        setCameraX(desiredCameraX);
      }

      // ── Particle system updates ──
      const playerFeetX = nextPlayer.x + JUMP_RUN_PLAYER.width / 2;
      const playerFeetY = nextPlayer.y + JUMP_RUN_PLAYER.height;
      const cap = getParticleCap(viewportWidthRef.current);

      // Landing detection → dust + squash
      const wasAirborne = !prevOnGroundRef.current;
      if (onGround && wasAirborne) {
        landingUntilRef.current = timestamp + LANDING_DURATION_MS;
        particlesRef.current = [
          ...particlesRef.current,
          ...spawnDust(playerFeetX, playerFeetY, 4),
        ].slice(-cap);
      }
      prevOnGroundRef.current = onGround;

      // Running trail
      if (onGround && Math.abs(vx) > 35 && timestamp - lastRunDustRef.current > 80) {
        lastRunDustRef.current = timestamp;
        particlesRef.current = [
          ...particlesRef.current,
          ...spawnRunDust(playerFeetX, playerFeetY),
        ].slice(-cap);
      }

      // Ambient particles (every 2s)
      if (timestamp - lastAmbientRef.current > 2000) {
        lastAmbientRef.current = timestamp;
        const dimColors = DIMENSION_COLORS[activeMap.chapterId as keyof typeof DIMENSION_COLORS];
        const ambientColor = dimColors?.glow ?? "rgba(245,158,11,0.3)";
        particlesRef.current = [
          ...particlesRef.current,
          ...spawnAmbient(cameraXRef.current, viewportWidthRef.current, activeMap.world.height, ambientColor, 3),
        ].slice(-cap);
      }

      // Update particle physics
      particlesRef.current = updateParticles(particlesRef.current, dt);

      // Throttle snapshot to every 2nd frame
      particleFrameCounter.current++;
      if (particleFrameCounter.current % 2 === 0) {
        setParticleSnapshot(particlesRef.current);
      }

      setNowTimestamp(timestamp);

      playerRef.current = nextPlayer;
      setPlayer(nextPlayer);
      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [
    activeDangerMap,
    activeMap,
    activePowerupMap,
    activeStationMap,
    difficultyConfig,
    difficultyId,
    selectedChapterId,
    selectedMapId,
  ]);

  return (
    <main
      className={`${bodyFont.className} ${gameOnly ? "" : "min-h-screen bg-[var(--sky)]"} text-slate-900`}
      style={{
        "--sky": "#7dd3fc",
        "--grass": "#22c55e",
        "--earth": "#9a5a1e",
        "--block": "#f59e0b",
        "--shadow": "#1b1b1b",
      } as CSSProperties}
    >
      {!gameOnly && (
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-10 h-14 w-32 rounded-full bg-white/80 shadow-[6px_6px_0_rgba(0,0,0,0.15)]" />
          <div className="absolute right-16 top-20 h-20 w-44 rounded-full bg-white/80 shadow-[6px_6px_0_rgba(0,0,0,0.15)]" />
          <div className="absolute left-1/3 top-6 h-10 w-24 rounded-full bg-white/70 shadow-[6px_6px_0_rgba(0,0,0,0.12)]" />
          <div className="absolute -bottom-24 left-[-10%] h-64 w-[28rem] rounded-[50%] bg-[var(--grass)] opacity-80" />
          <div className="absolute -bottom-28 right-[-5%] h-72 w-[32rem] rounded-[50%] bg-[var(--grass)] opacity-70" />
          <div className="absolute bottom-0 h-20 w-full bg-[var(--earth)] shadow-[0_-6px_0_rgba(0,0,0,0.2)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-28">
          <div className="inline-flex items-center gap-3 border-4 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] shadow-[4px_4px_0_#000]">
            <IconMap2 className="h-4 w-4" />
            KI Escape Game
          </div>

          <h1
            className={`${pixelFont.className} mt-6 text-3xl leading-tight sm:text-4xl lg:text-5xl`}
          >
            Escape-Game: KI-Kompetenz-Quest
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg">
            Drei spielbare Chapter. Zwei Stunden Spielzeit. Eine klare Mission:
            die Kompetenzen{" "}
            <span className="font-bold">
              Lernen über, durch und mit KI
            </span>{" "}
            spielerisch erschließen und in handfeste Ergebnisse übersetzen.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <IconClock className="h-5 w-5" />,
                title: "2 Stunden",
                text: "Escape-Game mit drei spielbaren Chaptern",
              },
              {
                icon: <IconFlag3 className="h-5 w-5" />,
                title: "1 Stunde",
                text: "Vorstellung der Ergebnisse im Plenum",
              },
              {
                icon: <IconUsers className="h-5 w-5" />,
                title: "1 Stunde",
                text: "Diskussion, Transfer, nächste Schritte",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="animate__animated animate__fadeInUp border-4 border-black bg-white px-5 py-4 shadow-[6px_6px_0_#000]"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-center gap-3 text-sm font-semibold">
                  {item.icon}
                  {item.title}
                </div>
                <p className="mt-2 text-sm text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>

          {/* ── Erklärvideo ── */}
          <div className="mt-8 border-4 border-black bg-white shadow-[6px_6px_0_#000]">
            <div className="overflow-hidden bg-black">
              <video
                controls
                preload="metadata"
                className="w-full"
              >
                <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/DDKI%20Video%20EG%20Main/EscapeGameMainVideo_combined.mp4" type="video/mp4" />
                Dein Browser unterstützt keine Videowiedergabe.
              </video>
            </div>
            <div className="flex items-center gap-3 px-5 py-3">
              <IconPlayerPlay className="h-5 w-5 shrink-0 text-[var(--block)]" />
              <div>
                <div className="text-sm font-bold">Mission Briefing</div>
                <div className="text-xs text-slate-600">
                  Ablauf, Steuerung und Tipps — in 2 Minuten startklar
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#crew"
              className="inline-flex items-center gap-2 border-4 border-black bg-[var(--block)] px-5 py-3 text-xs uppercase tracking-[0.25em] shadow-[6px_6px_0_#000] transition hover:-translate-y-1"
            >
              <IconKey className="h-4 w-4" />
              Crew treffen
            </a>
            <a
              href="#map"
              className="inline-flex items-center gap-2 border-4 border-black bg-white px-5 py-3 text-xs uppercase tracking-[0.25em] shadow-[6px_6px_0_#000] transition hover:-translate-y-1"
            >
              <IconFlag3 className="h-4 w-4" />
              Weltkarte
            </a>
          </div>
        </div>
      </section>
      )}

      {!gameOnly && (
      <section id="crew" className="relative bg-[#fef9c3]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Die Crew</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                Wählt ein Crew-Mitglied und startet das passende Tutorial. Nach dem
                erfolgreichen Jump-&-Run erhaltet ihr einen 6-stelligen Missions-Code.
              </p>
            </div>

            <div className="border-4 border-black bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2">
                <IconKey className="h-4 w-4" />
                Code-Portal
              </div>
              <div className="mt-3 h-3 w-48 border-2 border-black bg-black/10">
                <div
                  className="h-full bg-[var(--block)] transition-all"
                  style={{ width: `${accessProgress}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-700">
                {acceptedCodeCount} von {CHARACTERS.length} Codes akzeptiert
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2 xl:grid-cols-3">
            {CHARACTERS.map((character, index) => {
              const hasAcceptedCode = acceptedCodeByDimension[character.id];
              const hasEarnedCode = Boolean(earnedCodes[character.id]);
              return (
                <div
                  key={character.id}
                  className="animate__animated animate__fadeInUp border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`relative h-16 w-16 overflow-hidden rounded-none border-4 border-black bg-gradient-to-br ${character.accent}`}
                  >
                    {(() => {
                      const Face = CREW_FACES[character.id];
                      return Face ? <Face /> : character.icon;
                    })()}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 border-2 border-black px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    {character.title}
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{character.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{character.role}</p>
                  <p className="mt-3 text-sm">{character.focus}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold">{character.key}</span>
                    <Link
                      href={`/fortbildung/escape-game/tutorial/${character.id}`}
                      className="border-2 border-black bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5"
                    >
                      Tutorial
                    </Link>
                  </div>
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center justify-between gap-2 border-2 border-black bg-white px-2 py-2 text-xs">
                      <span>Code eingeben</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={enteredCodes[character.id]}
                        onChange={(event) =>
                          handleCodeInput(character.id, event.target.value)
                        }
                        placeholder="000000"
                        className="w-24 border-2 border-black px-2 py-1 text-right font-bold tracking-[0.2em]"
                      />
                    </label>
                    {hasAcceptedCode ? (
                      <div className="flex items-center gap-2 border-2 border-black bg-emerald-100 px-3 py-2 text-xs">
                        <IconKey className="h-4 w-4" />
                        Code akzeptiert
                      </div>
                    ) : hasEarnedCode ? (
                      <div className="flex items-center gap-2 border-2 border-black bg-amber-100 px-3 py-2 text-xs">
                        <IconSparkles className="h-4 w-4" />
                        Code erhalten - bitte eintragen
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 border-2 border-black bg-slate-100 px-3 py-2 text-xs">
                        <IconPuzzle className="h-4 w-4" />
                        Tutorial + Challenge abschließen
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {!gameOnly && (
      <section id="map" className="relative bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>Weltkarte</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                Sobald alle drei Missions-Codes korrekt eingetragen sind, werden die
                Materialien zu allen drei Dimensionen als PDF-Download freigeschaltet.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 border-4 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_#000]">
              <IconFlag3 className="h-4 w-4" />
              {allCodesAccepted ? "Downloads freigeschaltet" : "Noch gesperrt"}
            </div>
          </div>

          <div className="relative mt-10 border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-600">
              <span className="flex items-center gap-2">
                <IconMap2 className="h-4 w-4" />
                Materialien
              </span>
            </div>

            <div
              className={`mt-6 grid gap-6 md:grid-cols-2 ${
                allCodesAccepted ? "opacity-100" : "opacity-50"
              }`}
            >
              {WELTKARTE_DOWNLOADS.map((download, index) => (
                <div
                  key={download.id}
                  className={`animate__animated animate__fadeInUp border-4 border-black p-5 shadow-[5px_5px_0_#000] ${download.accent}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white">
                      {download.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{download.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{download.description}</p>
                  <a
                    href={download.pdfPath}
                    download
                    className={`mt-4 inline-flex items-center gap-2 border-2 border-black px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 ${
                      allCodesAccepted
                        ? "bg-[var(--block)] text-black"
                        : "pointer-events-none bg-slate-200 text-slate-500"
                    }`}
                  >
                    <IconBook className="h-4 w-4" />
                    PDF herunterladen
                  </a>
                </div>
              ))}
            </div>

            {!allCodesAccepted && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                <div className="border-4 border-black bg-white px-6 py-4 text-center text-xs uppercase tracking-[0.3em] shadow-[6px_6px_0_#000]">
                  Tragt alle drei Missions-Codes ein, um die Downloads freizuschalten
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {(isChallengeMode || gameOnly) && (
      <section id="ueber-quest" className="relative bg-[#fefce8]">
        <div className={`mx-auto px-6 py-16 ${gameOnly ? "" : "max-w-6xl"}`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className={`${displayFont.className} text-2xl`}>
                {isChallengeMode
                  ? `Challenge-Modus: ${activeChapter.title}`
                  : "KI-Multiversum (Jump & Run)"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                {isChallengeMode
                  ? "Schließe diese Challenge erfolgreich ab, um deinen 6-stelligen Missions-Code zu erhalten."
                  : "Laufe durch die 2D-Welt und löse die passenden Lernstationen aus dem Mission Scroll."}
              </p>
            </div>
            <div className="border-4 border-black bg-white px-4 py-3 text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2">
                <IconKey className="h-4 w-4" />
                Fortschritt
              </div>
              <div className="mt-3 h-3 w-48 border-2 border-black bg-black/10">
                <div
                  className="h-full bg-[var(--block)] transition-all"
                  style={{ width: `${chapterProgress}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-700">
                {activeChapter.title}: {completedStations} von {activeStations.length} Leveln
              </div>
            </div>
          </div>

          {isChallengeMode && (
            <Link
              href={`/fortbildung/escape-game/tutorial/${selectedChapterId}`}
              className="mb-4 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] shadow-[3px_3px_0_#000] hover:bg-slate-50"
            >
              <IconBolt className="h-4 w-4" />
              Zurück zum Tutorial
            </Link>
          )}

          <div className="mt-4 grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="self-start border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-600">
                  <IconPuzzle className="h-4 w-4" />
                  {activeChapter.title}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border-2 border-black bg-red-100 px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    Leben {runnerLives}
                  </span>
                  <span className="border-2 border-black bg-sky-100 px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    Zeit {formatTime(runElapsedMs)}
                  </span>
                  <span className="border-2 border-black bg-amber-100 px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                    Stationen {completedStations}/{activeStations.length}
                  </span>
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="inline-flex items-center gap-1 border-2 border-black bg-white px-2 py-1 text-[10px] uppercase tracking-[0.25em] shadow-[2px_2px_0_#000] hover:-translate-y-0.5"
                  >
                    {soundEnabled ? (
                      <IconVolume className="h-3 w-3" />
                    ) : (
                      <IconVolumeOff className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Keyframes loaded via escape-game.css import */}
              <div
                ref={playfieldViewportRef}
                className={`relative mt-4 overflow-hidden rounded border-2 border-black ${activeMap.backgroundClass}`}
                style={{
                  ...activePlayfieldStyle,
                  height: `${activeMap.world.height}px`,
                  transform: `translateX(${playfieldShakeX}px)`,
                  transition: "transform 80ms linear",
                }}
              >
                <ParallaxBackground chapterId={activeMap.chapterId} cameraX={cameraX} />
                <div
                  className="absolute inset-0"
                  style={{ transform: `translateX(-${Math.round(cameraX)}px)` }}
                >
                  <div
                    className="relative h-full"
                    style={{ width: `${activeMap.world.width}px` }}
                  >
                    {activeMap.platforms.map((platform) => {
                      const isGround = platform.id === "ground";
                      const tufts = !isGround ? Math.max(2, Math.floor(platform.width / 40)) : 0;
                      const tuffColor = activeMap.chapterId === "durch"
                        ? "rgba(6,182,212,0.5)"
                        // : activeMap.chapterId === "trotz"
                        // ? "rgba(248,113,113,0.4)"
                        : activeMap.chapterId === "mit"
                        ? "rgba(234,179,8,0.5)"
                        : "rgba(34,197,94,0.5)";
                      return (
                        <div
                          key={platform.id}
                          className="absolute border-2 border-black"
                          style={{
                            left: `${platform.x}px`,
                            top: `${platform.y}px`,
                            width: `${platform.width}px`,
                            height: `${platform.height}px`,
                            backgroundColor: isGround
                              ? activeMap.theme.groundColor
                              : activeMap.theme.platformColor,
                            boxShadow: isGround
                              ? `0 -4px 0 ${activeMap.theme.groundShadow}`
                              : `3px 3px 0 ${activeMap.theme.platformShadow}`,
                          }}
                        >
                          {Array.from({ length: tufts }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${((i + 0.5) / tufts) * 100}%`,
                                top: "-4px",
                                width: activeMap.chapterId === "durch" ? "4px" : "6px",
                                height: "5px",
                                backgroundColor: tuffColor,
                                borderRadius: activeMap.chapterId === "durch" ? "1px" : "50% 50% 0 0",
                                transform: "translateX(-50%)",
                              }}
                            />
                          ))}
                        </div>
                      );
                    })}

                    {activeMap.questionBlocks.map((block) => {
                      const used = usedQuestionBlocks[block.id];
                      return (
                        <div
                          key={block.id}
                          className={`anim-shimmer absolute flex items-center justify-center border-2 border-black text-sm font-bold shadow-[2px_2px_0_#000] ${
                            used ? "bg-amber-800 text-amber-200" : "bg-amber-300 text-black"
                          }`}
                          style={{
                            left: `${block.x}px`,
                            top: `${block.y}px`,
                            width: `${block.width}px`,
                            height: `${block.height}px`,
                            animation: !used ? ANIM.shimmer : undefined,
                          }}
                          title={used ? `${block.label} (leer)` : block.label}
                        >
                          {used ? "·" : "?"}
                        </div>
                      );
                    })}

                    {runtimeHazards.map((hazard) => {
                      const variant = hazardVariantFromDangerId(hazard.dangerId);
                      const hazardVisual = activeHazardVisuals[variant];
                      const hazardCenterX = hazard.x + hazard.width / 2;
                      const eyeShift = Math.max(-1.5, Math.min(1.5, (player.x - hazardCenterX) / 80));
                      return (
                        <div
                          key={hazard.id}
                          className="anim-bob absolute border-2 border-black shadow-[2px_2px_0_#000]"
                          style={{
                            left: `${hazard.x}px`,
                            top: `${hazard.y}px`,
                            width: `${hazard.width}px`,
                            height: `${hazard.height}px`,
                            backgroundColor: hazardVisual.shellColor,
                            animation: ANIM.bob,
                            animationDelay: `${(hazard.x % 500) / 500}s`,
                          }}
                        >
                          <div className="relative h-full w-full overflow-hidden">
                            {variant === "piranha" && (
                              <>
                                <div
                                  className="absolute inset-x-0 top-0 h-[58%] border-b-2 border-black"
                                  style={{ backgroundColor: hazardVisual.mainColor }}
                                />
                                <div
                                  className="absolute inset-x-0 bottom-0 h-[42%]"
                                  style={{ backgroundColor: hazardVisual.secondaryColor }}
                                />
                                <div className="absolute left-[14%] top-[20%] h-1.5 w-1.5 rounded-full border border-black bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute right-[14%] top-[20%] h-1.5 w-1.5 rounded-full border border-black bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute left-[35%] top-[55%] h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-white" />
                                <div className="absolute left-1/2 top-[55%] h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-r-2 border-t-2 border-white" />
                                <div className="absolute right-[35%] top-[55%] h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-white" />
                              </>
                            )}
                            {variant === "ghost" && (
                              <>
                                <div
                                  className="absolute left-[16%] top-[8%] h-[74%] w-[68%] rounded-t-[8px] border-2 border-black"
                                  style={{ backgroundColor: hazardVisual.mainColor }}
                                />
                                <div className="absolute left-[32%] top-[34%] h-1.5 w-1.5 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 0, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute right-[32%] top-[34%] h-1.5 w-1.5 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 0, left: 1 + eyeShift }} />
                                </div>
                                <div className="absolute left-[26%] bottom-[8%] h-1.5 w-1.5 rounded-full border border-black bg-white" />
                                <div className="absolute left-[46%] bottom-[4%] h-1.5 w-1.5 rounded-full border border-black bg-white" />
                                <div className="absolute left-[66%] bottom-[8%] h-1.5 w-1.5 rounded-full border border-black bg-white" />
                              </>
                            )}
                            {variant === "banana" && (
                              <>
                                <div
                                  className="absolute left-[20%] top-[20%] h-[60%] w-[64%] -rotate-12 rounded-[999px] border-2 border-black"
                                  style={{ backgroundColor: hazardVisual.mainColor }}
                                />
                                <div className="absolute left-[16%] top-[44%] h-2 w-2 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 2 + eyeShift }} />
                                </div>
                                <div className="absolute right-[22%] top-[34%] h-2 w-2 rounded-full bg-white">
                                  <div className="absolute rounded-full bg-black" style={{ width: 3, height: 3, top: 1, left: 2 + eyeShift }} />
                                </div>
                                <div className="absolute right-[16%] bottom-[22%] h-1 w-2 rounded-full bg-black/30" />
                              </>
                            )}
                            <span
                              className="absolute right-[8%] top-[8%] text-[7px] font-bold uppercase tracking-[0.08em]"
                              style={{ color: hazardVisual.accentColor }}
                            >
                              {hazardVisual.sigil}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {activeMap.collectibles.map((collectible) => {
                      const collected = collectedBits[collectible.id];
                      return (
                        <div
                          key={collectible.id}
                          className={`anim-bob absolute flex items-center justify-center rounded-full border-2 border-black text-[8px] ${
                            collected ? "bg-slate-300 opacity-60 shadow-[2px_2px_0_#000]" : "bg-yellow-200"
                          }`}
                          style={{
                            left: `${collectible.x}px`,
                            top: `${collectible.y}px`,
                            width: `${collectible.size}px`,
                            height: `${collectible.size}px`,
                            animation: !collected ? ANIM.bob : undefined,
                            animationDelay: `${(collectible.x % 400) / 400}s`,
                            boxShadow: !collected
                              ? "2px 2px 0 #000, 0 0 8px 2px rgba(250,204,21,0.4)"
                              : undefined,
                          }}
                          title={collectible.label}
                        >
                          <IconSparkles className="h-3 w-3" />
                        </div>
                      );
                    })}

                    {activeMap.powerups.map((powerup) => {
                      const revealed = revealedPowerups[powerup.id];
                      const collected = collectedPowerups[powerup.id];
                      if (!revealed && !collected) return null;
                      const powerupPosition = powerupPositions[powerup.id] ?? {
                        x: powerup.x,
                        y: powerup.y,
                      };
                      return (
                        <div
                          key={powerup.id}
                          className={`absolute ${collected ? "opacity-40" : ""}`}
                          style={{
                            left: `${powerupPosition.x}px`,
                            top: `${powerupPosition.y}px`,
                            width: `${powerup.width}px`,
                            height: `${powerup.height}px`,
                          }}
                          title={`${powerup.label}: +${powerup.extraLives} Leben`}
                        >
                          <div className="relative h-full w-full">
                            <div className="absolute left-0 top-0 h-[58%] w-full rounded-t-full border-2 border-black bg-red-500" />
                            <div className="absolute left-[10%] top-[8%] h-1.5 w-1.5 rounded-full bg-white" />
                            <div className="absolute left-[44%] top-[6%] h-1.5 w-1.5 rounded-full bg-white" />
                            <div className="absolute left-[72%] top-[11%] h-1.5 w-1.5 rounded-full bg-white" />
                            <div className="absolute bottom-0 left-[18%] h-[52%] w-[64%] rounded-t-[6px] border-2 border-black bg-[#fef7d3]" />
                            <div className="absolute bottom-[14%] left-[34%] h-1.5 w-1.5 rounded-full bg-black" />
                            <div className="absolute bottom-[14%] right-[34%] h-1.5 w-1.5 rounded-full bg-black" />
                          </div>
                        </div>
                      );
                    })}

                    {activeMap.stationZones.map((zone) => {
                      const solved = stationSolved[zone.id];
                      const stationVisual =
                        JUMP_RUN_STATION_VISUALS[zone.id] ?? JUMP_RUN_STATION_DEFAULT_VISUAL;
                      const StationIcon = stationVisual.icon;
                      const bubbleClass = solved ? "bg-emerald-100" : stationVisual.bubbleClass;
                      return (
                        <div
                          key={zone.id}
                          className="absolute"
                          style={{
                            left: `${zone.x}px`,
                            top: `${zone.y}px`,
                            width: `${zone.width}px`,
                            height: `${zone.height}px`,
                          }}
                        >
                          {!solved && (
                            <div
                              className="anim-ring pointer-events-none absolute inset-[-6px] rounded-[14px] border-2"
                              style={{
                                borderColor: DIMENSION_COLORS[activeMap.chapterId as keyof typeof DIMENSION_COLORS]?.accent ?? "#f59e0b",
                                animation: ANIM.ring,
                              }}
                            />
                          )}
                          <div
                            className={`anim-pulse relative flex h-full w-full items-center gap-1 rounded-[8px] border-2 border-black px-1.5 shadow-[2px_2px_0_#000] ${bubbleClass} ${
                              solved ? "text-emerald-900" : stationVisual.accentClass
                            }`}
                            style={{
                              animation: !solved ? ANIM.pulse : undefined,
                            }}
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-black bg-white">
                              <StationIcon className="h-2.5 w-2.5" />
                            </span>
                            <span className="truncate text-[8px] font-bold uppercase tracking-[0.16em]">
                              {activeStationLabelMap[zone.id] ?? zone.label}
                            </span>
                            <span
                              className={`absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-black ${bubbleClass}`}
                            />
                            {solved && (
                              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-black bg-emerald-200 text-emerald-800">
                                <IconSparkles className="h-2.5 w-2.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div
                      className={`anim-glow absolute flex items-center justify-center gap-1 border-2 border-black text-[9px] uppercase tracking-[0.2em] ${
                        allStationsSolved ? "bg-emerald-200" : "bg-slate-200 shadow-[2px_2px_0_#000]"
                      }`}
                      style={{
                        left: `${activeMap.finishZone.x}px`,
                        top: `${activeMap.finishZone.y}px`,
                        width: `${activeMap.finishZone.width}px`,
                        height: `${activeMap.finishZone.height}px`,
                        animation: allStationsSolved ? ANIM.glow : undefined,
                      }}
                    >
                      <span style={{ display: "inline-flex", animation: allStationsSolved ? ANIM.trophyBounce : undefined }}>
                        <IconTrophy className="h-3 w-3" />
                      </span>
                      Ziel
                    </div>

                    {hitImpact && (
                      <div
                        className="pointer-events-none absolute z-20"
                        style={{
                          left: `${hitImpact.x - 15}px`,
                          top: `${hitImpact.y - 15}px`,
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-rose-500/80 animate-ping" />
                        <div className="absolute inset-[32%] rounded-full bg-rose-500/80" />
                      </div>
                    )}

                    <PlayerSprite
                      x={player.x}
                      y={player.y}
                      width={JUMP_RUN_PLAYER.width}
                      height={JUMP_RUN_PLAYER.height}
                      vx={player.vx}
                      vy={player.vy}
                      onGround={player.onGround}
                      facing={player.facing as "left" | "right"}
                      hitFlashActive={hitFlashActive}
                      hitFlashDirection={hitFlashDirection}
                      playerPoweredUp={playerPoweredUp}
                      playerScale={playerScale}
                      now={nowTimestamp}
                      landingUntil={landingUntilRef.current}
                    />
                    <ParticleSystem particles={particleSnapshot} />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-slate-600">
                    <IconShieldCheck className="h-4 w-4" />
                    Leben
                    <div className="ml-2 flex gap-1">
                      {Array.from({ length: JUMP_RUN_MAX_LIVES }).map((_, index) => (
                        <span
                          key={`life-${index}`}
                          className={`h-2 w-4 border-2 border-black ${
                            index < runnerLives ? "bg-emerald-300" : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-2 border-2 border-black bg-black/10">
                    <div
                      className="h-full bg-[var(--block)] transition-all"
                      style={{ width: `${runnerProgress}%` }}
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-600">
                    Fortschritt {Math.round(runnerProgress)}%
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => triggerVirtualMove("left")}
                    onTouchStart={(event) => {
                      event.preventDefault();
                      onTouchMoveStart("left");
                    }}
                    onTouchEnd={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("left");
                    }}
                    onTouchCancel={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("left");
                    }}
                    disabled={!runnerAlive || runnerFinished}
                    className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                      !runnerAlive || runnerFinished
                        ? "cursor-not-allowed bg-slate-200"
                        : touchState.left
                        ? "bg-sky-200"
                        : "bg-white hover:-translate-y-0.5"
                    }`}
                  >
                    Links
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerVirtualMove("right")}
                    onTouchStart={(event) => {
                      event.preventDefault();
                      onTouchMoveStart("right");
                    }}
                    onTouchEnd={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("right");
                    }}
                    onTouchCancel={(event) => {
                      event.preventDefault();
                      onTouchMoveEnd("right");
                    }}
                    disabled={!runnerAlive || runnerFinished}
                    className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                      !runnerAlive || runnerFinished
                        ? "cursor-not-allowed bg-slate-200"
                        : touchState.right
                        ? "bg-sky-200"
                        : "bg-white hover:-translate-y-0.5"
                    }`}
                  >
                    Rechts
                  </button>
                  <button
                    type="button"
                    onClick={triggerVirtualJump}
                    onTouchStart={(event) => {
                      event.preventDefault();
                      triggerVirtualJump();
                    }}
                    disabled={!runnerAlive || runnerFinished}
                    className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                      !runnerAlive || runnerFinished
                        ? "cursor-not-allowed bg-slate-200"
                        : touchState.jump
                        ? "bg-amber-300"
                        : "bg-[var(--block)] hover:-translate-y-0.5"
                    }`}
                  >
                    Springen
                  </button>
                  <button
                    type="button"
                    onClick={resetJumpRun}
                    className="border-2 border-black bg-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] hover:-translate-y-0.5"
                  >
                    Neustart
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
                <button
                  type="button"
                  onTouchStart={(event) => {
                    event.preventDefault();
                    onTouchMoveStart("left");
                  }}
                  onTouchEnd={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("left");
                  }}
                  onTouchCancel={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("left");
                  }}
                  onMouseDown={() => onTouchMoveStart("left")}
                  onMouseUp={() => onTouchMoveEnd("left")}
                  onMouseLeave={() => onTouchMoveEnd("left")}
                  disabled={!runnerAlive || runnerFinished}
                  className={`border-2 border-black px-3 py-3 text-[11px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                    !runnerAlive || runnerFinished
                      ? "cursor-not-allowed bg-slate-200"
                      : touchState.left
                      ? "bg-sky-200"
                      : "bg-white"
                  }`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onTouchStart={(event) => {
                    event.preventDefault();
                    triggerVirtualJump();
                  }}
                  onMouseDown={triggerVirtualJump}
                  disabled={!runnerAlive || runnerFinished}
                  className={`border-2 border-black px-3 py-3 text-[11px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                    !runnerAlive || runnerFinished
                      ? "cursor-not-allowed bg-slate-200"
                      : touchState.jump
                      ? "bg-amber-300"
                      : "bg-[var(--block)]"
                  }`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onTouchStart={(event) => {
                    event.preventDefault();
                    onTouchMoveStart("right");
                  }}
                  onTouchEnd={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("right");
                  }}
                  onTouchCancel={(event) => {
                    event.preventDefault();
                    onTouchMoveEnd("right");
                  }}
                  onMouseDown={() => onTouchMoveStart("right")}
                  onMouseUp={() => onTouchMoveEnd("right")}
                  onMouseLeave={() => onTouchMoveEnd("right")}
                  disabled={!runnerAlive || runnerFinished}
                  className={`border-2 border-black px-3 py-3 text-[11px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                    !runnerAlive || runnerFinished
                      ? "cursor-not-allowed bg-slate-200"
                      : touchState.right
                      ? "bg-sky-200"
                      : "bg-white"
                  }`}
                >
                  →
                </button>
              </div>

              {runnerMessage && (
                <div className="mt-4 border-2 border-black bg-amber-100 px-3 py-2 text-xs">
                  {runnerMessage}
                </div>
              )}
              {recentlyEarnedCode && runnerFinished && (
                <div className="mt-3 border-2 border-black bg-emerald-100 px-3 py-2 text-xs">
                  Mission-Code freigeschaltet:{" "}
                  <span className="font-bold tracking-[0.2em]">{recentlyEarnedCode}</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0_#000]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-600">
                  <IconBook className="h-4 w-4" />
                  Aktuelle Lernstation
                </div>
                {activeStation ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border-2 border-black ${activeStationVisual.bubbleClass} ${activeStationVisual.accentClass}`}
                      >
                        <activeStationVisual.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-base font-bold">{activeStation.title}</div>
                        <p className="mt-2 text-sm text-slate-700">
                          {activeStation.learning}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div
                        className={`relative rounded-[10px] border-2 border-black px-3 py-2 text-xs shadow-[2px_2px_0_#000] ${activeStationVisual.bubbleClass}`}
                      >
                        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                          <IconBook className="h-3 w-3" />
                          Mini-Quest
                        </div>
                        {activeStation.question}
                      </div>
                      <span
                        className={`absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b-2 border-r-2 border-black ${activeStationVisual.bubbleClass}`}
                      />
                    </div>

                    <div className="space-y-2">
                      {activeStation.options.map((option) => {
                        const isSelected = activeStationAnswer === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            disabled={!runnerAlive || activeStationSolved}
                            onClick={() =>
                              handleStationSelect(activeStation.id, option.id)
                            }
                            className={`w-full border-2 border-black px-3 py-2 text-left text-xs shadow-[2px_2px_0_#000] transition ${
                              !runnerAlive || activeStationSolved
                                ? "cursor-not-allowed bg-slate-200"
                                : isSelected
                                ? "bg-emerald-200"
                                : "bg-white hover:-translate-y-0.5"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleStationCheck(activeStation.id)}
                        disabled={!runnerAlive || activeStationSolved}
                        className={`border-2 border-black px-3 py-1 text-[10px] uppercase tracking-[0.2em] shadow-[2px_2px_0_#000] ${
                          !runnerAlive || activeStationSolved
                            ? "cursor-not-allowed bg-slate-200"
                            : "bg-[var(--block)]"
                        }`}
                      >
                        Prüfen
                      </button>
                      {activeStationSolved && (
                        <span className="flex items-center gap-1 border-2 border-black bg-emerald-100 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                          <IconSparkles className="h-3 w-3" />
                          {activeStation.reward}
                        </span>
                      )}
                    </div>
                    {stationFeedback && (
                      <div className="border-2 border-black bg-amber-100 px-3 py-2 text-xs">
                        {stationFeedback}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-700">
                    Laufe zur nächsten Lernstation, um eine Mini-Aufgabe zu lösen.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
      )}
{/* REMOVED: Mini-Map, Timer & Bestzeit, Lern-Logbuch panels — decluttered in redesign */}

    </main>
  );
}

export default function EscapeGamePage() {
  return (
    <Suspense fallback={null}>
      <EscapeGamePageContent />
    </Suspense>
  );
}

/** Standalone game component for embedding in tutorials. */
export function JumpRunChallenge({ chapterId }: { chapterId: JumpRunChapterId }) {
  return (
    <Suspense fallback={null}>
      <EscapeGamePageContent gameOnly forceChapterId={chapterId} />
    </Suspense>
  );
}
