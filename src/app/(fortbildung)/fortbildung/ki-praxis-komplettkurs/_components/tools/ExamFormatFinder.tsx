"use client";

import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import ToolShell from "./ToolShell";

type Format = "portfolio" | "open-book" | "muendlich" | "praxis-projekt" | "peer-review" | "klausur-prozess";

const QUESTIONS = [
  {
    key: "goal",
    text: "Was willst du primär prüfen?",
    options: [
      { id: "process", label: "Den Lern-Prozess (nicht nur das Endprodukt)", weight: { portfolio: 3, "open-book": 0, muendlich: 1, "praxis-projekt": 1, "peer-review": 1, "klausur-prozess": 2 } },
      { id: "understanding", label: "Tiefes Verständnis und Begründungen", weight: { portfolio: 1, "open-book": 1, muendlich: 3, "praxis-projekt": 1, "peer-review": 0, "klausur-prozess": 2 } },
      { id: "apply", label: "Anwendung in realer Situation", weight: { portfolio: 1, "open-book": 2, muendlich: 0, "praxis-projekt": 3, "peer-review": 0, "klausur-prozess": 1 } },
      { id: "reflection", label: "Reflexion und kritische Auseinandersetzung", weight: { portfolio: 3, "open-book": 1, muendlich: 2, "praxis-projekt": 0, "peer-review": 2, "klausur-prozess": 1 } },
    ],
  },
  {
    key: "ai",
    text: "Wie willst du KI dabei integrieren?",
    options: [
      { id: "no", label: "KI-frei prüfen", weight: { portfolio: 1, "open-book": 0, muendlich: 3, "praxis-projekt": 1, "peer-review": 0, "klausur-prozess": 3 } },
      { id: "explicit", label: "KI explizit erlaubt, dokumentationspflichtig", weight: { portfolio: 2, "open-book": 3, muendlich: 0, "praxis-projekt": 2, "peer-review": 1, "klausur-prozess": 0 } },
      { id: "neutral", label: "Format soll von Natur aus KI-resistent sein", weight: { portfolio: 3, "open-book": 0, muendlich: 3, "praxis-projekt": 2, "peer-review": 2, "klausur-prozess": 2 } },
    ],
  },
] as const;

const FORMATS: Record<Format, { name: string; description: string }> = {
  portfolio: { name: "Lernportfolio mit Reflexion", description: "SuS dokumentieren Lernweg, sammeln Artefakte, reflektieren. KI-Nutzung wird transparent gemacht. Beweis: der Prozess." },
  "open-book": { name: "Open-Book-Klausur mit KI", description: "KI explizit erlaubt, Aufgaben so gestaltet, dass nur informierte KI-Nutzung zu guten Ergebnissen führt. Bewertung: Qualität der KI-Integration." },
  muendlich: { name: "Mündliche Prüfung", description: "Klassisch KI-resistent: SuS müssen live denken und begründen. Anforderungsbereiche I/II/III klar trennen." },
  "praxis-projekt": { name: "Praxis-Projekt", description: "Reale Aufgabe in realer Situation. KI darf, aber: das Endprodukt muss in der Welt funktionieren — Mess- und Beobachtbar." },
  "peer-review": { name: "Peer-Review-Format", description: "SuS bewerten gegenseitig anhand klarer Kriterien. Stärkt Reflexionsfähigkeit und macht KI-Verwendung sichtbar." },
  "klausur-prozess": { name: "Prozessorientierte Klausur", description: "Klausur mit mehreren Schritten — Vorrecherche, Klausurteil, Reflexion. KI in Vorrecherche erlaubt, Klausurteil ohne." },
};

export default function ExamFormatFinder() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = QUESTIONS.every((q) => answers[q.key]);

  const scores: Record<Format, number> = { portfolio: 0, "open-book": 0, muendlich: 0, "praxis-projekt": 0, "peer-review": 0, "klausur-prozess": 0 };
  for (const q of QUESTIONS) {
    const opt = q.options.find((o) => o.id === answers[q.key]);
    if (!opt) continue;
    (Object.keys(scores) as Format[]).forEach((k) => (scores[k] += opt.weight[k]));
  }
  const winner = (Object.entries(scores) as [Format, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const result = allAnswered ? FORMATS[winner] : null;

  return (
    <ToolShell title="Format-Finder" description="Welches Prüfungsformat passt zu deinem Lernziel — und ist gleichzeitig KI-fair? Zwei Fragen reichen.">
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
        <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">Empfohlenes Format</p>
              <p className="text-xl font-bold text-purple-dark">{result.name}</p>
              <p className="mt-2 text-sm text-text-primary">{result.description}</p>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
