"use client";

import { useState } from "react";
import { RotateCcw, Route } from "lucide-react";
import ToolShell from "./ToolShell";

type Path = "komplett" | "schnellstart" | "themen";

const QUESTIONS = [
  {
    key: "experience",
    text: "Wie viel KI-Erfahrung hast du?",
    options: [
      { id: "a", label: "Keine bis kaum — ChatGPT habe ich vielleicht 1–2 Mal ausprobiert", weight: { komplett: 3, schnellstart: 0, themen: 0 } },
      { id: "b", label: "Bisschen — ich nutze KI gelegentlich für einzelne Aufgaben", weight: { komplett: 1, schnellstart: 1, themen: 2 } },
      { id: "c", label: "Viel — KI ist Teil meines Alltags", weight: { komplett: 0, schnellstart: 3, themen: 1 } },
    ],
  },
  {
    key: "goal",
    text: "Was willst du nach diesem Kurs können?",
    options: [
      { id: "a", label: "Alles von Grund auf — solides Fundament", weight: { komplett: 3, schnellstart: 0, themen: 0 } },
      { id: "b", label: "Schnell auf Profi-Niveau kommen", weight: { komplett: 0, schnellstart: 3, themen: 0 } },
      { id: "c", label: "Eine ganz bestimmte Frage lösen", weight: { komplett: 0, schnellstart: 0, themen: 3 } },
    ],
  },
  {
    key: "time",
    text: "Wie viel Zeit hast du pro Woche?",
    options: [
      { id: "a", label: "1–2 Stunden — ich nehme mir Zeit", weight: { komplett: 2, schnellstart: 1, themen: 1 } },
      { id: "b", label: "30–60 Min — eher in Häppchen", weight: { komplett: 1, schnellstart: 2, themen: 1 } },
      { id: "c", label: "Sehr wenig — gezielt zu konkreten Themen", weight: { komplett: 0, schnellstart: 0, themen: 3 } },
    ],
  },
] as const;

const RESULTS: Record<Path, { name: string; order: string; why: string }> = {
  komplett: {
    name: "Komplett-Pfad",
    order: "Sektion 1 → 2 → 3 → 4 → 5 → 6 → 7",
    why: "Linear durch alle Sektionen. Sicherster Weg, du verpasst nichts und baust solide auf.",
  },
  schnellstart: {
    name: "Schnellstart-Pfad",
    order: "Sektion 1 (kurz) → Crash-Kurs überfliegen → Modul I → Modul II → Modul IV → Abschluss",
    why: "Du überspringst die Grundlagen und gehst direkt in die Tiefe — perfekt für erfahrene KI-Nutzer:innen.",
  },
  themen: {
    name: "Themen-Pfad",
    order: "Sektion 1 → direkt ins passende Modul → bei Bedarf weitere",
    why: "Du hast ein konkretes Problem (z.B. KI-Plagiate) und springst direkt in das passende Modul.",
  },
};

export default function LearningPathWizard() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = QUESTIONS.every((q) => answers[q.key]);

  const scores = QUESTIONS.reduce(
    (acc, q) => {
      const selected = answers[q.key];
      const option = q.options.find((o) => o.id === selected);
      if (!option) return acc;
      acc.komplett += option.weight.komplett;
      acc.schnellstart += option.weight.schnellstart;
      acc.themen += option.weight.themen;
      return acc;
    },
    { komplett: 0, schnellstart: 0, themen: 0 } as Record<Path, number>,
  );
  const winner: Path = (Object.entries(scores) as [Path, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const result = allAnswered ? RESULTS[winner] : null;

  return (
    <ToolShell title="Lernpfad-Wizard" description="Drei kurze Fragen — dann zeige ich dir, welcher der drei Lernpfade am besten zu dir passt.">
      <ol className="flex flex-col gap-6">
        {QUESTIONS.map((q, i) => (
          <li key={q.key}>
            <p className="text-sm font-semibold text-text-primary">
              {i + 1}. {q.text}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[q.key] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: opt.id }))}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                      isSelected
                        ? "border-purple bg-purple-light-5 text-text-primary"
                        : "border-border-secondary bg-white text-text-primary hover:border-purple"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {result && (
        <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
              <Route className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">
                Deine Empfehlung
              </p>
              <p className="text-xl font-bold text-purple-dark">{result.name}</p>
              <p className="mt-2 text-sm font-mono text-text-primary">{result.order}</p>
              <p className="mt-3 text-sm text-text-secondary">{result.why}</p>
            </div>
          </div>
        </div>
      )}

      {allAnswered && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="flex items-center gap-2 text-sm font-semibold text-purple hover:underline"
          >
            <RotateCcw className="h-4 w-4" />
            Neu starten
          </button>
        </div>
      )}
    </ToolShell>
  );
}
