"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import Stage from "./Stage";
import { getDeck } from "./decks";
import DeckMissing from "./DeckMissing";
import { InstantContext } from "./motion";
import type { Deck } from "./types";
import { useDeckKeys, useDeckNavigation } from "./useDeckNavigation";

/**
 * Hauptbühne: Vollbild, Tastatur/Clicker, Klick-/Tap-Zonen, Hash-Deep-Links,
 * Presenter-Fenster (Taste P), Vollbild (F), Hilfe (?).
 */
export default function DeckPlayer({ deckId }: { deckId: string }) {
  const deck = getDeck(deckId);
  if (!deck) return <DeckMissing id={deckId} />;
  return <DeckPlayerInner deck={deck} />;
}

function DeckPlayerInner({ deck }: { deck: Deck }) {
  const nav = useDeckNavigation(deck);
  const { slide, step } = nav.state;
  const current = deck.slides[slide];
  const [showHelp, setShowHelp] = useState(false);
  const [idle, setIdle] = useState(false);
  // Erst rendern, wenn der Hash gelesen ist: kein Aufblitzen von Folie 1
  // bei Deep-Links. ?static schaltet alle Animationen ab (Screenshots, PDF).
  const [ready, setReady] = useState(false);
  const [instant, setInstant] = useState(false);
  const [staticStep, setStaticStep] = useState<number | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInstant(params.has("static"));
    const s = parseInt(params.get("step") ?? "", 10);
    setStaticStep(Number.isFinite(s) ? s : null);
    setReady(true);
  }, []);

  const openPresenter = useCallback(() => {
    const url = `${window.location.pathname.replace(/\/$/, "")}/presenter#${slide + 1}`;
    window.open(url, `ddki-presenter-${deck.id}`, "width=1280,height=820");
  }, [deck.id, slide]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  }, []);

  const extraKeys = useMemo(
    () => ({
      f: toggleFullscreen,
      p: openPresenter,
      "?": () => setShowHelp((v) => !v),
      h: () => setShowHelp((v) => !v),
      escape: () => setShowHelp(false),
    }),
    [toggleFullscreen, openPresenter],
  );
  useDeckKeys(nav, extraKeys);

  // Cursor und Overlay-Elemente nach Inaktivität ausblenden
  useEffect(() => {
    let timer: number;
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), 2500);
    };
    wake();
    window.addEventListener("mousemove", wake);
    window.addEventListener("keydown", wake);
    return () => {
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("keydown", wake);
      window.clearTimeout(timer);
    };
  }, []);

  // Klick/Tap: rechte Hälfte weiter, linke zurück. Interaktive Bereiche
  // (data-interactive) werden ausgenommen.
  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-interactive], a, button, input, textarea")) return;
    if (e.clientX > window.innerWidth / 2) nav.next();
    else nav.prev();
  };

  const totalSteps = deck.slides.reduce((n, s) => n + 1 + (s.steps ?? 0), 0);
  const doneSteps =
    deck.slides.slice(0, slide).reduce((n, s) => n + 1 + (s.steps ?? 0), 0) + step + 1;
  const progress = doneSteps / totalSteps;
  const dark = current.theme === "dark";

  return (
    <div
      className={cn(
        "fixed inset-0 select-none",
        dark ? "bg-[#0b0820]" : "bg-background-secondary",
        idle && "cursor-none",
      )}
      onClick={onStageClick}
    >
      <Stage>
        {ready && (
        <InstantContext.Provider value={instant}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <AnimationErrorBoundary>
              <current.Component
                  step={instant ? (staticStep ?? current.steps ?? 0) : step}
                  active
                />
            </AnimationErrorBoundary>
          </motion.div>
        </AnimatePresence>
        </InstantContext.Provider>
        )}
      </Stage>

      {/* Fortschritt */}
      <div
        className="absolute inset-x-0 bottom-0 h-[3px]"
        style={{ background: dark ? "rgba(255,255,255,0.12)" : "rgba(24,27,37,0.1)" }}
      >
        <motion.div
          className="h-full bg-primary-dark"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Zähler + Hilfe-Hinweis */}
      <div
        className={cn(
          "absolute right-5 bottom-4 flex items-center gap-4 text-xs transition-opacity duration-500",
          dark ? "text-white/50" : "text-text-tertiary",
          idle && "opacity-0",
        )}
      >
        <span className="hidden sm:inline">? für Hilfe · P Presenter · F Vollbild</span>
        <span className="tabular-nums">
          {slide + 1} / {deck.slides.length}
        </span>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowHelp(false);
            }}
          >
            <div
              className="w-[min(92vw,560px)] rounded-3xl bg-white p-8 text-text-primary shadow-2xl"
              data-interactive
            >
              <h2 className="text-xl font-semibold">Steuerung</h2>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                <Key>→ ↓ Leertaste Bild↓</Key>
                <dd>Weiter (auch Presenter-Clicker)</dd>
                <Key>← ↑ Bild↑</Key>
                <dd>Zurück</dd>
                <Key>Pos1 / Ende</Key>
                <dd>Erste / letzte Folie</dd>
                <Key>Klick rechts / links</Key>
                <dd>Weiter / zurück (auch Touch)</dd>
                <Key>F</Key>
                <dd>Vollbild an/aus</dd>
                <Key>P</Key>
                <dd>Presenter-Fenster mit Notizen und Timer öffnen</dd>
                <Key>#4 in der URL</Key>
                <dd>Direkt zu Folie 4 springen</dd>
              </dl>
              <p className="mt-6 text-xs text-text-tertiary">
                Presenter-Fenster und Bühne synchronisieren sich im selben Browser
                automatisch. Hauptfenster auf den Beamer ziehen, Presenter auf das
                Laptop-Display.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <dt className="rounded-md border border-border-secondary bg-background-secondary px-2 py-1 font-mono text-xs whitespace-nowrap">
      {children}
    </dt>
  );
}
