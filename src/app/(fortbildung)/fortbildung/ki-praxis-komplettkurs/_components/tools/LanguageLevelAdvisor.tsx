"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import ToolShell, { CopyButton } from "./ToolShell";

type Level = "A1" | "A2" | "B1";

const QUESTIONS = [
  {
    key: "audience",
    text: "Wer ist die Zielgruppe?",
    options: [
      { id: "daz-start", label: "DaZ-SuS am Anfang (wenige Wochen Deutsch)", weight: { A1: 3, A2: 1, B1: 0 } },
      { id: "daz-fort", label: "DaZ-SuS fortgeschritten (1+ Jahr Deutsch)", weight: { A1: 0, A2: 3, B1: 1 } },
      { id: "lrs", label: "SuS mit LRS / Förderbedarf Lesen", weight: { A1: 1, A2: 3, B1: 1 } },
      { id: "grundschule", label: "Grundschul-Kinder (1.–4. Klasse)", weight: { A1: 2, A2: 3, B1: 0 } },
      { id: "sek1-mittel", label: "Sek I, mittlere Leistungsstärke", weight: { A1: 0, A2: 1, B1: 3 } },
    ],
  },
  {
    key: "purpose",
    text: "Wofür brauchst du den vereinfachten Text?",
    options: [
      { id: "homework", label: "Hausaufgabe / selbstständiges Lesen", weight: { A1: 1, A2: 2, B1: 2 } },
      { id: "support", label: "Begleitmaterial parallel zum Originaltext", weight: { A1: 1, A2: 3, B1: 2 } },
      { id: "summary", label: "Komprimierte Zusammenfassung", weight: { A1: 2, A2: 2, B1: 1 } },
    ],
  },
] as const;

const LEVELS: Record<Level, { name: string; rules: string; promptHint: string }> = {
  A1: {
    name: "A1 – Sehr einfach",
    rules: "Sehr kurze Sätze (max. 6–8 Wörter). Grundwortschatz, keine Nebensätze. Konkrete Beispiele statt abstrakter Begriffe.",
    promptHint: "Sprachniveau A1 — sehr einfach, kurze Sätze (max. 6–8 Wörter), Grundwortschatz, keine Nebensätze",
  },
  A2: {
    name: "A2 – Einfach",
    rules: "Kurze Sätze, einfacher Wortschatz. Schwierige Wörter werden erklärt. Höchstens ein Nebensatz pro Satz.",
    promptHint: "Sprachniveau A2 — kurze Sätze, einfacher Wortschatz, schwierige Wörter erklären",
  },
  B1: {
    name: "B1 – Mittelstufe",
    rules: "Mittellange Sätze, alltagsnahes Vokabular, Fachbegriffe erlaubt aber erklärt. Komplexere Sätze möglich.",
    promptHint: "Sprachniveau B1 — mittellange Sätze, alltagsnahes Vokabular, Fachbegriffe erklären",
  },
};

export default function LanguageLevelAdvisor() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = QUESTIONS.every((q) => answers[q.key]);

  const scores: Record<Level, number> = { A1: 0, A2: 0, B1: 0 };
  for (const q of QUESTIONS) {
    const opt = q.options.find((o) => o.id === answers[q.key]);
    if (!opt) continue;
    (Object.keys(scores) as Level[]).forEach((k) => (scores[k] += opt.weight[k]));
  }
  const winner = (Object.entries(scores) as [Level, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const result = allAnswered ? LEVELS[winner] : null;
  const promptTemplate = result
    ? `Vereinfache den folgenden Text. ${result.promptHint}. Maximal 6 Absätze. Komplexe Konzepte mit Beispielen erklären.\n\n[Text einfügen]`
    : "";

  return (
    <ToolShell title="Niveau-Empfehler: Einfache Sprache" description="Zwei Fragen — und ich empfehle dir das passende Sprachniveau plus einen fertigen Prompt zum Kopieren.">
      <ol className="flex flex-col gap-6">
        {QUESTIONS.map((q, i) => (
          <li key={q.key}>
            <p className="text-sm font-semibold text-text-primary">{i + 1}. {q.text}</p>
            <div className="mt-2 flex flex-col gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[q.key] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAnswers((p) => ({ ...p, [q.key]: opt.id }))}
                    className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition ${
                      isSelected ? "border-purple bg-purple-light-5" : "border-border-secondary bg-white hover:border-purple"
                    } text-text-primary`}
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
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
                <Languages className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">Empfehlung</p>
                <p className="text-xl font-bold text-purple-dark">{result.name}</p>
                <p className="mt-2 text-sm text-text-primary">{result.rules}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-border-tertiary bg-background-secondary p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Fertiger Prompt</p>
            <p className="mt-2 whitespace-pre-wrap font-mono text-sm text-text-primary">{promptTemplate}</p>
          </div>

          <CopyButton value={promptTemplate} />

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Wichtig:</strong> Einfache Sprache ≠ Leichte Sprache. Leichte Sprache ist ein geprüfter Standard mit eigenen Regeln. Für offizielle Leichte-Sprache-Dokumente brauchst du spezialisierte Anbieter (Forschungsstelle Leichte Sprache Uni Hildesheim).
          </div>
        </div>
      )}
    </ToolShell>
  );
}
