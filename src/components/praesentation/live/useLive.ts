"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type LiveSnapshot = {
  current: string | null;
  votes: Record<string, unknown[]>;
  updatedAt: number;
};

const EMPTY: LiveSnapshot = { current: null, votes: {}, updatedAt: 0 };

/** Stabile anonyme Kennung pro Gerät, damit Mehrfachabstimmungen überschreiben statt addieren. */
export function useClientId() {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    try {
      let v = window.localStorage.getItem("ddki-live-id");
      if (!v) {
        v = Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
        window.localStorage.setItem("ddki-live-id", v);
      }
      setId(v);
    } catch {
      setId(Math.random().toString(36).slice(2, 12));
    }
  }, []);
  return id;
}

export async function postLive(deck: string, body: Record<string, unknown>) {
  const res = await fetch(`/api/live/${deck}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`live ${res.status}`);
  return res.json();
}

/** Pollt den Live-Zustand eines Decks. Pausiert, wenn der Tab unsichtbar ist. */
export function useLiveState(deck: string, intervalMs = 2500, enabled = true) {
  const [state, setState] = useState<LiveSnapshot>(EMPTY);
  const [error, setError] = useState(false);
  const timer = useRef<number>(0);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/live/${deck}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      setState(await res.json());
      setError(false);
    } catch {
      setError(true);
    }
  }, [deck]);

  useEffect(() => {
    if (!enabled) return;
    const tick = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    tick();
    timer.current = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(timer.current);
  }, [refresh, intervalMs, enabled]);

  return { state, error, refresh };
}

/**
 * Für Bühnenfolien: schaltet die Aktivität beim Betreten der Folie live und
 * liefert die bisher abgegebenen Werte.
 */
export function useStageActivity<T = unknown>(deck: string, activity: string, active: boolean) {
  const { state, refresh } = useLiveState(deck, 2000, active);
  useEffect(() => {
    if (!active) return;
    void postLive(deck, { action: "activate", activity }).then(() => refresh());
  }, [deck, activity, active, refresh]);
  const reset = useCallback(
    () => postLive(deck, { action: "reset", activity }).then(() => refresh()),
    [deck, activity, refresh],
  );
  return { values: (state.votes[activity] ?? []) as T[], reset };
}
