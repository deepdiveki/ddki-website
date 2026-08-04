"use client";

import { useRef, useState } from "react";
import { GraduationCap, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const VIDEO_URL =
  "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/DDKI%20Videos%20Fortbildung/DDKI_Fortbildung_Komplett.mp4";

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  }

  function handleEnded() {
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
  }

  function toggleFullscreen() {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  }

  return (
    <div className="relative w-80 animate-in delay-500 duration-1000 fill-mode-both fade-in md:w-80 lg:w-110 xl:w-140">
      {/* Körniger Gradient-Rahmen im Landing-Design */}
      <div className="relative overflow-hidden rounded-[28px] p-2 shadow-2xl [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage: `url("${NOISE}")`,
            backgroundSize: "140px 140px",
          }}
        />
        <div className="relative overflow-hidden rounded-[20px] bg-black">
          {/* Video */}
          <video
            ref={videoRef}
            preload="none"
            playsInline
            poster="/images/hero-video-poster.jpg"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            className="h-auto w-full"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>

          {/* Play overlay – visible when not started or paused */}
          <button
            onClick={togglePlay}
            className={`absolute inset-0 transition-opacity duration-300 ${
              isPlaying ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            aria-label={isPlaying ? "Pause" : "Video abspielen"}
          >
            {/* Dimmed background */}
            {!hasStarted && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            )}
            {/* Play button – bottom left */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2.5 lg:bottom-6 lg:left-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform hover:scale-110 lg:h-14 lg:w-14">
                <Play className="ml-0.5 h-5 w-5 text-primary-dark lg:h-6 lg:w-6" fill="currentColor" />
              </div>
              <span className="text-xs font-medium tracking-wide text-white drop-shadow-md lg:text-sm">
                Video ansehen
              </span>
            </div>
          </button>

          {/* Bottom controls – visible when playing or started */}
          {hasStarted && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-6 pb-2 lg:px-4 lg:pb-3">
              {/* Progress bar */}
              <div
                onClick={handleSeek}
                className="group mb-2 h-1 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-1.5"
              >
                <div
                  className="h-full rounded-full bg-primary-base transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
                  aria-label={isPlaying ? "Pause" : "Abspielen"}
                >
                  {isPlaying ? (
                    <Pause className="h-3.5 w-3.5" fill="currentColor" />
                  ) : (
                    <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
                  aria-label={isMuted ? "Ton an" : "Ton aus"}
                >
                  {isMuted ? (
                    <VolumeX className="h-3.5 w-3.5" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" />
                  )}
                </button>
                <div className="flex-1" />
                <button
                  onClick={toggleFullscreen}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
                  aria-label="Vollbild"
                >
                  <Maximize className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schwebende Glas-Badges */}
      <div className="hero-float absolute -top-6 -right-4 hidden items-center gap-2.5 rounded-2xl border border-white/60 bg-white/75 px-4 py-2.5 shadow-lg backdrop-blur-md md:flex lg:-right-8">
        <span className="flex size-3 items-center justify-center rounded-full border-2 border-emerald-400/90">
          <span className="size-1 rounded-full bg-emerald-400" />
        </span>
        <div>
          <p className="text-md leading-tight font-semibold text-text-primary">
            98 %
          </p>
          <p className="text-xs text-text-secondary">Zufriedenheit</p>
        </div>
      </div>
      <div
        className={`hero-float-delayed absolute -bottom-6 -left-4 hidden items-center gap-2.5 rounded-2xl border border-white/60 bg-white/75 px-4 py-2.5 shadow-lg backdrop-blur-md transition-opacity duration-300 md:flex lg:-left-8 ${
          hasStarted ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary-base/25">
          <GraduationCap className="size-4.5 text-primary-darker" />
        </span>
        <div>
          <p className="text-md leading-tight font-semibold text-text-primary">
            254+
          </p>
          <p className="text-xs text-text-secondary">Fortbildungen</p>
        </div>
      </div>
    </div>
  );
}
