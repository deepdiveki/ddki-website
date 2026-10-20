"use client";

import AnimationErrorBoundary from "@/components/shared/AnimationErrorBoundary";
import { cn } from "@/lib/utils";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import Stage from "./Stage";
import { getDeck } from "./decks";
import DeckMissing from "./DeckMissing";
import { InstantContext } from "./motion";
import type { Deck } from "./types";
import { useDeckKeys, useDeckNavigation } from "./useDeckNavigation";

/**
 * Presenter-View für das Laptop-Display: aktuelle und nächste Folie,
 * Notizen, Timer, Uhr, Folienliste. Steuert die Bühne über BroadcastChannel.
 */
export default function PresenterView({ deckId }: { deckId: string }) {
  const deck = getDeck(deckId);
  if (!deck) return <DeckMissing id={deckId} />;
  return <PresenterViewInner deck={deck} />;
}

function PresenterViewInner({ deck }: { deck: Deck }) {
  const nav = useDeckNavigation(deck);
  useDeckKeys(nav);
  const { slide, step } = nav.state;
  const current = deck.slides[slide];
  const nextSlide = deck.slides[slide + 1];
  const moreSteps = step < (current.steps ?? 0);

  return (
    <div className="fixed inset-0 grid grid-rows-[auto_1fr_auto] bg-[#121420] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-primary-dark/30 px-2 py-0.5 text-xs font-semibold tracking-wider text-primary-light uppercase">
            Presenter
          </span>
          <span className="font-medium">{deck.title}</span>
        </div>
        <Clock />
      </header>

      <div className="grid min-h-0 grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-5 p-5">
        {/* Aktuelle Folie */}
        <div className="flex min-h-0 flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>
              Aktuell · Folie {slide + 1} von {deck.slides.length}
              {(current.steps ?? 0) > 0 && (
                <span className="ml-2 text-primary-light">
                  Schritt {step} / {current.steps}
                </span>
              )}
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5">
              {moreSteps ? "Weiter enthüllt den nächsten Schritt" : "Weiter wechselt die Folie"}
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-black">
            <div className="aspect-video w-full">
              <Stage>
                <InstantContext.Provider value>
                  <AnimationErrorBoundary>
                    <current.Component step={step} active />
                  </AnimationErrorBoundary>
                </InstantContext.Provider>
              </Stage>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto rounded-xl bg-white/5 p-5 text-[17px] leading-relaxed whitespace-pre-line text-white/90">
            {current.notes ?? <span className="text-white/35">Keine Notizen zu dieser Folie.</span>}
          </div>
        </div>

        {/* Nächste Folie + Liste */}
        <div className="flex min-h-0 flex-col gap-3">
          <span className="text-xs text-white/60">
            {nextSlide ? `Nächste · ${nextSlide.title}` : "Letzte Folie"}
          </span>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
            <div className="aspect-video w-full">
              {nextSlide ? (
                <Stage>
                  <InstantContext.Provider value>
                    <AnimationErrorBoundary>
                      <nextSlide.Component step={nextSlide.steps ?? 0} active={false} />
                    </AnimationErrorBoundary>
                  </InstantContext.Provider>
                </Stage>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-white/40">
                  Ende der Präsentation
                </div>
              )}
            </div>
          </div>
          <Timer />
          <ol className="min-h-0 flex-1 overflow-auto rounded-xl bg-white/5 p-2 text-sm">
            {deck.slides.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => nav.goTo(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/10",
                    i === slide && "bg-primary-dark/30 text-white",
                    i !== slide && "text-white/70",
                  )}
                >
                  <span className="w-6 text-right tabular-nums text-white/40">{i + 1}</span>
                  <span className="truncate">{s.title}</span>
                  {(s.steps ?? 0) > 0 && (
                    <span className="ml-auto text-xs text-white/35">+{s.steps}</span>
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <footer className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-white/50">
        <span>← → steuern beide Fenster · Klick auf eine Folie springt direkt dorthin</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={nav.prev}
            className="rounded-md bg-white/10 px-3 py-1.5 text-white hover:bg-white/20"
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={nav.next}
            className="rounded-md bg-primary-dark px-3 py-1.5 font-medium text-white hover:bg-primary-darker"
          >
            Weiter
          </button>
        </div>
      </footer>
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums text-white/70">{now}</span>;
}

function Timer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const started = Date.now() - elapsed * 1000;
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 500);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
      <span className="text-xs text-white/60">Redezeit</span>
      <span className="font-mono text-3xl tabular-nums">
        {mm}:{ss}
      </span>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="rounded-md bg-white/10 p-2 hover:bg-white/20"
          aria-label={running ? "Timer pausieren" : "Timer starten"}
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
          }}
          className="rounded-md bg-white/10 p-2 hover:bg-white/20"
          aria-label="Timer zurücksetzen"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
    </div>
  );
}
