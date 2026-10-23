"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Deck } from "./types";

export type DeckState = { slide: number; step: number };

type Message =
  | { type: "state"; state: DeckState; source: string; reply?: boolean }
  | { type: "hello"; source: string };

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

/**
 * Folien-/Schrittzustand mit drei Synchronisationswegen:
 * 1. URL-Hash (#4) für Deep-Links und Reload,
 * 2. BroadcastChannel zwischen Bühne und Presenter-Fenster,
 * 3. Tastatur (Pfeile, Leertaste, Bild auf/ab, Pos1/Ende, auch Presenter-Clicker).
 */
export function useDeckNavigation(deck: Deck) {
  const [state, setState] = useState<DeckState>({ slide: 0, step: 0 });
  const stateRef = useRef(state);
  stateRef.current = state;
  const fromRemote = useRef(false);
  const sourceId = useRef(Math.random().toString(36).slice(2));
  const channel = useRef<BroadcastChannel | null>(null);
  // true, wenn die Seite mit #N geöffnet wurde: Dann gewinnt der Deep-Link
  // gegen Antworten anderer (auch im Cache verbliebener) Fenster auf „hello“.
  const fromHash = useRef(false);
  const last = deck.slides.length - 1;

  const stepsOf = useCallback(
    (slide: number) => deck.slides[slide]?.steps ?? 0,
    [deck],
  );

  // Hash → Zustand (einmalig beim Laden)
  useEffect(() => {
    const n = parseInt(window.location.hash.slice(1), 10);
    if (Number.isFinite(n) && n >= 1) {
      fromHash.current = true;
      setState({ slide: clamp(n - 1, 0, last), step: 0 });
    }
  }, [last]);

  // BroadcastChannel
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const ch = new BroadcastChannel(`ddki-deck-${deck.id}`);
    channel.current = ch;
    ch.onmessage = (event: MessageEvent<Message>) => {
      const msg = event.data;
      if (msg.source === sourceId.current) return;
      if (msg.type === "state") {
        if (msg.reply && fromHash.current) return;
        fromRemote.current = true;
        setState(msg.state);
      } else if (msg.type === "hello") {
        ch.postMessage({
          type: "state",
          state: stateRef.current,
          source: sourceId.current,
          reply: true,
        } satisfies Message);
      }
    };
    ch.postMessage({ type: "hello", source: sourceId.current } satisfies Message);
    return () => {
      ch.close();
      channel.current = null;
    };
  }, [deck.id]);

  // Zustand → Hash + Broadcast
  useEffect(() => {
    window.history.replaceState(null, "", `#${state.slide + 1}`);
    if (fromRemote.current) {
      fromRemote.current = false;
      return;
    }
    channel.current?.postMessage({
      type: "state",
      state,
      source: sourceId.current,
    } satisfies Message);
  }, [state]);

  const next = useCallback(() => {
    setState((s) => {
      if (s.step < stepsOf(s.slide)) return { slide: s.slide, step: s.step + 1 };
      if (s.slide < last) return { slide: s.slide + 1, step: 0 };
      return s;
    });
  }, [last, stepsOf]);

  const prev = useCallback(() => {
    setState((s) => {
      if (s.step > 0) return { slide: s.slide, step: s.step - 1 };
      if (s.slide > 0) return { slide: s.slide - 1, step: stepsOf(s.slide - 1) };
      return s;
    });
  }, [stepsOf]);

  const goTo = useCallback(
    (slide: number, step = 0) =>
      setState({ slide: clamp(slide, 0, last), step: clamp(step, 0, stepsOf(slide)) }),
    [last, stepsOf],
  );

  const first = useCallback(() => goTo(0), [goTo]);
  const toLast = useCallback(() => goTo(last), [goTo, last]);

  return useMemo(
    () => ({ state, next, prev, goTo, first, last: toLast }),
    [state, next, prev, goTo, first, toLast],
  );
}

export type DeckNavigation = ReturnType<typeof useDeckNavigation>;

/** Tastatursteuerung. Presenter-Clicker senden Pfeiltasten oder Bild auf/ab. */
export function useDeckKeys(
  nav: DeckNavigation,
  extra?: Record<string, () => void>,
) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault();
          nav.next();
          return;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          nav.prev();
          return;
        case "Home":
          e.preventDefault();
          nav.first();
          return;
        case "End":
          e.preventDefault();
          nav.last();
          return;
      }
      const fn = extra?.[e.key.toLowerCase()] ?? extra?.[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav, extra]);
}
