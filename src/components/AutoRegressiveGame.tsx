"use client";

import { useMemo, useState } from "react";

type Option = {
  token: string;
  prob: number;
  next: string | null;
};

type Node = {
  id: string;
  options: Option[];
};

const nodes: Record<string, Node> = {
  start: {
    id: "start",
    options: [
      { token: "fragt", prob: 52, next: "fragt" },
      { token: "bastelt", prob: 30, next: "bastelt" },
      { token: "traeumt", prob: 18, next: "traeumt" },
    ],
  },
  fragt: {
    id: "fragt",
    options: [
      { token: "nach", prob: 55, next: "nach" },
      { token: "die", prob: 25, next: "die" },
      { token: "im", prob: 20, next: "im" },
    ],
  },
  bastelt: {
    id: "bastelt",
    options: [
      { token: "einen", prob: 60, next: "einen" },
      { token: "mit", prob: 25, next: "mit" },
      { token: "am", prob: 15, next: "am" },
    ],
  },
  traeumt: {
    id: "traeumt",
    options: [
      { token: "von", prob: 58, next: "von" },
      { token: "ueber", prob: 22, next: "ueber" },
      { token: "im", prob: 20, next: "im2" },
    ],
  },
  nach: {
    id: "nach",
    options: [
      { token: "KI", prob: 58, next: null },
      { token: "Ethik", prob: 25, next: null },
      { token: "Regeln", prob: 17, next: null },
    ],
  },
  die: {
    id: "die",
    options: [
      { token: "Lehrkraft", prob: 50, next: null },
      { token: "Antwort", prob: 30, next: null },
      { token: "Methode", prob: 20, next: null },
    ],
  },
  im: {
    id: "im",
    options: [
      { token: "Unterricht", prob: 60, next: null },
      { token: "Team", prob: 25, next: null },
      { token: "Chat", prob: 15, next: null },
    ],
  },
  einen: {
    id: "einen",
    options: [
      { token: "Chatbot", prob: 55, next: null },
      { token: "Plan", prob: 28, next: null },
      { token: "Prototyp", prob: 17, next: null },
    ],
  },
  mit: {
    id: "mit",
    options: [
      { token: "Pappe", prob: 50, next: null },
      { token: "KI", prob: 30, next: null },
      { token: "Code", prob: 20, next: null },
    ],
  },
  am: {
    id: "am",
    options: [
      { token: "Notebook", prob: 55, next: null },
      { token: "Projekt", prob: 25, next: null },
      { token: "Prototyp", prob: 20, next: null },
    ],
  },
  von: {
    id: "von",
    options: [
      { token: "neuen Ideen", prob: 55, next: null },
      { token: "guten Fragen", prob: 25, next: null },
      { token: "schnellen Antworten", prob: 20, next: null },
    ],
  },
  ueber: {
    id: "ueber",
    options: [
      { token: "Moeglichkeiten", prob: 50, next: null },
      { token: "Risiken", prob: 30, next: null },
      { token: "Ideen", prob: 20, next: null },
    ],
  },
  im2: {
    id: "im2",
    options: [
      { token: "Kurs", prob: 50, next: null },
      { token: "Projekt", prob: 30, next: null },
      { token: "Alltag", prob: 20, next: null },
    ],
  },
};

const startTokens = ["Die", "Schuelerin"];
const totalSteps = 3;

const AutoRegressiveGame = () => {
  const [steps, setSteps] = useState<{ nodeId: string; option: Option }[]>(
    []
  );

  const currentNodeId =
    steps.length === 0
      ? "start"
      : steps[steps.length - 1].option.next ?? "done";

  const isDone = currentNodeId === "done";
  const options = isDone ? [] : nodes[currentNodeId].options;

  const tokens = useMemo(
    () => [...startTokens, ...steps.map((step) => step.option.token)],
    [steps]
  );

  const lastPick = steps[steps.length - 1];

  const handlePick = (option: Option) => {
    setSteps((prev) => [...prev, { nodeId: currentNodeId, option }]);
  };

  const handleUndo = () => {
    setSteps((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setSteps([]);
  };

  const handleAutoPick = () => {
    if (isDone || options.length === 0) return;
    const best = options.reduce((max, option) =>
      option.prob > max.prob ? option : max
    );
    handlePick(best);
  };

  return (
    <div className="features-box-border relative rounded-3xl">
      <div className="box-hover relative overflow-hidden rounded-3xl p-6">
        <div className="relative z-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                Mini-Spiel
              </div>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Autoregressiver Token-Flow
              </h3>
              <p className="mt-2 max-w-[480px] text-sm text-white/70">
                Waehle das naechste Token. Jeder Klick veraendert den Kontext
                und beeinflusst die folgenden Optionen.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-dark/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
              Schritt {Math.min(steps.length + 1, totalSteps)} / {totalSteps}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                Kontext
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tokens.map((token, index) => (
                  <span
                    key={`${token}-${index}`}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      index === tokens.length - 1
                        ? "border-purple/40 bg-purple/20 text-purple-light-2"
                        : "border-white/10 bg-white/5 text-white/70"
                    }`}
                  >
                    {token}
                  </span>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-dark/40 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Satz
                </div>
                <p className="mt-2 text-sm text-white/70">
                  {tokens.join(" ")}
                  {isDone ? "." : " ..."}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleAutoPick}
                  className="button-border-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                  disabled={isDone}
                >
                  Auto (hoechste Wkeit)
                </button>
                <button
                  type="button"
                  onClick={handleUndo}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70"
                  disabled={steps.length === 0}
                >
                  Rueckgaengig
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-white/10 bg-dark/70 px-4 py-2 text-xs font-semibold text-white/60"
                  disabled={steps.length === 0}
                >
                  Reset
                </button>
              </div>

              {lastPick ? (
                <div className="mt-4 text-xs text-white/60">
                  Letzte Wahl:{" "}
                  <span className="text-white">{lastPick.option.token}</span> (
                  {lastPick.option.prob}% Wahrscheinlichkeit)
                </div>
              ) : null}
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                Token-Auswahl
              </div>

              {!isDone ? (
                <div className="mt-4 space-y-3">
                  {options.map((option) => (
                    <button
                      key={option.token}
                      type="button"
                      onClick={() => handlePick(option)}
                      className="w-full rounded-2xl border border-white/10 bg-dark/40 px-4 py-3 text-left text-sm text-white/80 transition hover:border-white/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{option.token}</span>
                        <span className="text-xs text-white/60">
                          {option.prob}%
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-light to-pink-light"
                          style={{ width: `${option.prob}%` }}
                        ></div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-white/10 bg-dark/40 p-4 text-sm text-white/70">
                  Satz abgeschlossen. Probiere einen anderen Tokenpfad oder
                  lasse das Modell automatisch waehlen.
                </div>
              )}

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
                Hinweis: Autoregressive Modelle bauen Schritt fuer Schritt auf.
                Jeder Token veraendert die Wahrscheinlichkeiten der naechsten
                Auswahl.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoRegressiveGame;
