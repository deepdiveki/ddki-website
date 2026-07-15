"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
} from "lucide-react";

// Eigener, schlanker Videoplayer — ersetzt die nativen Controls (deren grauer
// Hover-/Pause-Schleier sich in Safari nicht per CSS entfernen lässt) durch eine
// einheitliche, markenkonforme Steuerleiste. Integriert Autoplay + onEnded.

function fmt(s: number): string {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

type Props = {
  src: string;
  title?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  onPlay?: () => void;
};

export default function LessonVideo({ src, title, autoPlay, onEnded, onPlay }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const percent = duration > 0 ? (current / duration) * 100 : 0;
  const bufPercent = duration > 0 ? (buffered / duration) * 100 : 0;

  const revealControls = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false);
    }, 2600);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, []);

  const seekBy = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration || 0);
    revealControls();
  }, [revealControls]);

  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const t = (Number(e.target.value) / 100) * duration;
    v.currentTime = t;
    setCurrent(t);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const vol = Number(e.target.value);
    v.volume = vol;
    v.muted = vol === 0;
    setVolume(vol);
    setMuted(vol === 0);
  };

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => void })
      | null;
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      webkitExitFullscreen?: () => void;
    };
    const vid = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!el) return;
    if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (vid?.webkitEnterFullscreen) vid.webkitEnterFullscreen(); // iOS Safari
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      setFullscreen(Boolean(document.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

  // Tastatur (nur wenn der Player fokussiert/gehovert ist – via Container-Handler).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "k") { e.preventDefault(); togglePlay(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); seekBy(-5); }
    else if (e.key === "ArrowRight") { e.preventDefault(); seekBy(5); }
    else if (e.key === "f") { e.preventDefault(); toggleFullscreen(); }
    else if (e.key === "m") { e.preventDefault(); toggleMute(); }
  };

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 hover:text-white";

  return (
    <div
      ref={containerRef}
      className="group absolute inset-0 h-full w-full bg-black outline-none"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseMove={revealControls}
      onMouseLeave={() => {
        if (videoRef.current && !videoRef.current.paused) setShowControls(false);
      }}
    >
      <video
        ref={videoRef}
        src={src}
        title={title}
        autoPlay={autoPlay}
        preload="metadata"
        playsInline
        className="h-full w-full object-contain"
        onClick={togglePlay}
        onPlay={() => { setPlaying(true); revealControls(); onPlay?.(); }}
        onPause={() => { setPlaying(false); setShowControls(true); }}
        onEnded={() => { setPlaying(false); setShowControls(true); onEnded?.(); }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onVolumeChange={(e) => { setMuted(e.currentTarget.muted); setVolume(e.currentTarget.volume); }}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
        }}
      />

      {/* Großer Play-Button, wenn pausiert */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Abspielen"
          className="group/play absolute inset-0 flex items-center justify-center"
        >
          <span
            className="flex h-[74px] w-[74px] items-center justify-center rounded-full p-[3px] shadow-[0_10px_30px_-6px_rgba(134,70,244,0.6)] transition-transform duration-200 group-hover/play:scale-105"
            style={{ background: "linear-gradient(135deg, #8646F4, #D345F8)" }}
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
              <Play className="ml-1 h-8 w-8 fill-white text-white" />
            </span>
          </span>
        </button>
      )}

      {/* Steuerleiste */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pb-2.5 pt-8 transition-opacity duration-200 sm:px-4 ${
          showControls || !playing ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Fortschritt */}
        <div className="group/track relative flex h-4 items-center">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div className="absolute inset-y-0 left-0 rounded-full bg-white/25" style={{ width: `${bufPercent}%` }} />
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${percent}%`, background: "linear-gradient(90deg, #8646F4, #D345F8)" }}
            />
          </div>
          <div
            className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover/track:opacity-100"
            style={{ left: `${percent}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={percent}
            onChange={onScrub}
            aria-label="Video-Position"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>

        {/* Buttons */}
        <div className="mt-1 flex items-center gap-1 text-white">
          <button type="button" onClick={togglePlay} className={btn} aria-label={playing ? "Pause" : "Abspielen"}>
            {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          <button type="button" onClick={() => seekBy(-10)} className={btn} aria-label="10 Sekunden zurück">
            <RotateCcw className="h-[18px] w-[18px]" />
          </button>
          <button type="button" onClick={() => seekBy(10)} className={btn} aria-label="10 Sekunden vor">
            <RotateCw className="h-[18px] w-[18px]" />
          </button>

          <div className="group/vol flex items-center">
            <button type="button" onClick={toggleMute} className={btn} aria-label={muted ? "Ton an" : "Ton aus"}>
              {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={onVolume}
              aria-label="Lautstärke"
              className="h-1 w-0 cursor-pointer opacity-0 transition-all duration-200 group-hover/vol:ml-1 group-hover/vol:w-16 group-hover/vol:opacity-100 accent-purple"
            />
          </div>

          <span className="ml-1 select-none text-xs font-medium tabular-nums text-white/90">
            {fmt(current)} <span className="text-white/50">/ {fmt(duration)}</span>
          </span>

          <div className="ml-auto flex items-center gap-1">
            <button type="button" onClick={toggleFullscreen} className={btn} aria-label={fullscreen ? "Vollbild verlassen" : "Vollbild"}>
              {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
