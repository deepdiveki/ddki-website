"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RotateCcw, Trophy } from "lucide-react";

export type QuizChoice = {
  /** Stabiler Wert, muss zu `answer` der Fragen passen. */
  value: string;
  label: string;
  icon?: ReactNode;
  /** Optionale Akzentfarbe für den ausgewählten Zustand (Tailwind-Klassen für border/bg/text). */
  selectedClass?: string;
};

export type QuizItem = {
  text: string;
  /** `value` der korrekten Choice. */
  answer: string;
  explanation: string;
  /** Optionaler Zusatz (z. B. ein Detektor-Score) unter dem Text im Passage-Modus. */
  badge?: string;
};

export type QuizEngineProps = {
  eyebrow: string;
  title: string;
  intro: string;
  /** Substantiv für den Zähler, z. B. "Szenario", "Text", "Fall". */
  itemNoun: string;
  choices: QuizChoice[];
  items: QuizItem[];
  resultTitle: string;
  /** "prompt" = kurze Frage als Überschrift (Default), "passage" = längerer Text im Kasten. */
  itemVariant?: "prompt" | "passage";
  /** Schwelle (Anzahl richtig), ab der das Ergebnis als „stark" gilt. Default: 75 %. */
  strongThreshold?: number;
  /** Optionale eigene Ergebnis-Nachricht. */
  resultMessage?: (score: number, total: number) => string;
  /** Wie die korrekte Antwort im Feedback benannt wird. Default: Label der korrekten Choice. */
  renderAnswer?: (item: QuizItem, choice: QuizChoice) => ReactNode;
};

const DEFAULT_SELECTED_CLASS = "border-purple bg-purple-light-5 text-purple-dark";

export default function QuizEngine({
  eyebrow,
  title,
  intro,
  itemNoun,
  choices,
  items,
  resultTitle,
  itemVariant = "prompt",
  strongThreshold,
  resultMessage,
  renderAnswer,
}: QuizEngineProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const questionRef = useRef<HTMLElement | null>(null);

  const item = items[index];
  const isCorrect = selected !== null && selected === item.answer;
  const isLast = index === items.length - 1;
  const total = items.length;
  const answeredCount = selected !== null ? index + 1 : index;
  const progress = (answeredCount / total) * 100;
  const strong = strongThreshold ?? Math.ceil(total * 0.75);

  // Fokus auf die neue Frage lenken (Tastatur-/Screenreader-Nutzer verlieren sonst die Stelle).
  useEffect(() => {
    if (!finished) questionRef.current?.focus();
  }, [index, finished]);

  const handleSelect = (value: string) => {
    if (selected !== null) return;
    setSelected(value);
    if (value === item.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    const passed = score === total;
    const good = score >= strong;
    let message =
      resultMessage?.(score, total) ??
      "Guter Anfang – schau dir die Erklärungen noch mal an und übe die knappen Fälle.";
    if (!resultMessage) {
      if (passed) message = "Perfekt – du liegst überall richtig.";
      else if (good) message = "Stark! Du hast ein sicheres Gespür entwickelt.";
    }

    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 lg:py-12">
        <div
          role="status"
          className={`flex items-start gap-5 rounded-2xl border-2 p-6 ${
            passed || good ? "border-emerald-200 bg-emerald-50" : "border-purple-light-3 bg-purple-light-5"
          }`}
        >
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${
              passed || good ? "bg-emerald-500" : "bg-purple"
            }`}
          >
            <Trophy className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-text-primary md:text-2xl">{resultTitle}</h2>
            <p className="mt-3 text-text-primary">
              Du hast{" "}
              <span className="font-semibold">
                {score} von {total}
              </span>{" "}
              richtig eingeschätzt.
            </p>
            <p className="mt-2 text-sm text-text-secondary">{message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 flex items-center gap-2 rounded-lg border-2 border-purple px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Nochmal üben
        </button>
      </div>
    );
  }

  const correctChoice = choices.find((c) => c.value === item.answer);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 lg:py-12">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-purple">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-text-secondary">{intro}</p>
      </header>

      <div className="rounded-2xl border border-border-secondary bg-white p-5 shadow-sm md:p-7">
        <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
          <span>
            {itemNoun} {index + 1} von {total}
          </span>
          <span aria-live="polite">
            {score} richtig<span className="sr-only"> von bisher {answeredCount} beantwortet</span>
          </span>
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Fortschritt: ${index + 1} von ${total}`}
        >
          <div className="h-full rounded-full bg-purple transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {itemVariant === "passage" ? (
          <div
            ref={(el) => {
              questionRef.current = el;
            }}
            tabIndex={-1}
            className="mt-6 rounded-xl border border-border-secondary bg-background-secondary p-5 outline-none"
          >
            <p className="text-sm leading-relaxed text-text-primary">{item.text}</p>
            {item.badge && (
              <p className="mt-3 inline-block rounded-lg bg-amber-100 px-3 py-1.5 font-mono text-sm text-amber-900">
                {item.badge}
              </p>
            )}
          </div>
        ) : (
          <p
            ref={(el) => {
              questionRef.current = el;
            }}
            tabIndex={-1}
            className="mt-6 text-lg font-semibold leading-snug text-text-primary outline-none md:text-xl"
          >
            {item.text}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3" role="group" aria-label="Deine Einschätzung">
          {choices.map((choice) => {
            const isSelected = selected === choice.value;
            const isLocked = selected !== null;
            let stateClass = "border-border-secondary bg-white text-text-primary hover:border-purple";
            if (isLocked) {
              stateClass = isSelected
                ? choice.selectedClass ?? DEFAULT_SELECTED_CLASS
                : "border-border-secondary bg-white text-text-tertiary";
            }
            return (
              <button
                key={choice.value}
                type="button"
                onClick={() => handleSelect(choice.value)}
                disabled={isLocked}
                aria-pressed={isSelected}
                className={`flex flex-1 min-w-40 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition disabled:cursor-default ${stateClass}`}
              >
                {choice.icon}
                {choice.label}
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {selected !== null && (
            <div
              className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"
              }`}
            >
              <p className="font-bold">
                {isCorrect ? "Richtig." : "Nicht ganz."}{" "}
                <span className="font-medium">
                  {correctChoice
                    ? renderAnswer?.(item, correctChoice) ?? (
                        <>
                          Richtige Antwort: <span className="uppercase">{correctChoice.label}</span>.
                        </>
                      )
                    : null}
                </span>
              </p>
              <p className="mt-1.5">{item.explanation}</p>
            </div>
          )}
        </div>

        {selected !== null && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark"
            >
              {isLast ? "Ergebnis anzeigen" : "Weiter"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
