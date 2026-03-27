"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const VIDEO_URL =
  "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/DDKI%20Videos%20Fortbildung/DDKI_Fortbildung_Komplett.mp4";

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
    <div className="w-80 animate-in delay-500 duration-1000 fill-mode-both fade-in md:w-80 lg:w-110 xl:w-140">
      {/* Outer glow + border wrapper */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-base/60 via-primary-dark/30 to-primary-base/60 p-[2px] shadow-[0_8px_40px_rgba(198,189,250,0.4)]">
        <div className="relative overflow-hidden rounded-2xl bg-black">
          {/* Video */}
          <video
            ref={videoRef}
            preload="metadata"
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
    </div>
  );
}
