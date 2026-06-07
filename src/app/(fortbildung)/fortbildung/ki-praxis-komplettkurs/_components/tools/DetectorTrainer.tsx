"use client";

import { useState } from "react";
import { AlertTriangle, Check, CheckCircle2, RotateCcw, Trophy, X } from "lucide-react";
import ToolShell from "./ToolShell";

type Verdict = "real" | "false-positive";

type Scenario = {
  description: string;
  detectorScore: string;
  truth: Verdict;
  explanation: string;
};

const SCENARIOS: Scenario[] = [
  {
    description: 'Schüler-Aufsatz einer 11. Klasse zum Thema "Demokratie und soziale Medien". Schreibstil sehr glatt, lange Sätze, kaum Rechtschreibfehler.',
    detectorScore: "GPTZero: 87 % KI-Wahrscheinlichkeit",
    truth: "false-positive",
    explanation: "Glatter Schreibstil ist KEIN sicherer KI-Marker. Begabte SuS schreiben oft sauber. Detektoren strafen das fälschlicherweise ab. Klassischer False Positive.",
  },
  {
    description: "Hausaufgabe einer 9. Klasse zur Photosynthese. Acht Absätze, perfekt strukturiert, Standard-Lehrbuchformulierungen, keine Pointe oder persönliche Note.",
    detectorScore: "GPTZero: 92 % KI-Wahrscheinlichkeit",
    truth: "real",
    explanation: "Hier passen die KI-Marker: Lehrbuchglatt, keine eigene Perspektive, perfekte Struktur. Mit hoher Wahrscheinlichkeit tatsächlich KI-generiert.",
  },
  {
    description: "Text einer DaZ-Schülerin (Deutsch als Zweitsprache, B1-Niveau). Klare aber einfache Sätze, vorsichtige Formulierungen, gelegentlich ungewöhnliche Konstruktionen.",
    detectorScore: "CopyLeaks: 71 % KI",
    truth: "false-positive",
    explanation: 'Detektoren haben einen dokumentierten Bias gegen Nicht-Muttersprachler:innen. "Einfacher" Stil wird oft als KI gewertet. Sehr typischer False Positive — Stanford-Studie 2023.',
  },
  {
    description: 'Mathe-Erklärung einer 7. Klasse zur Bruchrechnung. Logischer Aufbau, drei Beispielrechnungen, am Ende ein "Tipp" — alles sehr ordentlich.',
    detectorScore: "GPTZero: 68 % KI-Wahrscheinlichkeit",
    truth: "false-positive",
    explanation: "Strukturierte Mathe-Erklärungen folgen oft natürlichen Mustern, die Detektoren als KI-typisch werten. Bei 7. Klasse + ordentlicher SuS sehr wahrscheinlich kein KI-Einsatz.",
  },
  {
    description: 'Antwort auf eine Reflexionsfrage in einem Portfolio: "Was hat dich diese Woche überrascht?" Drei lange, gut formulierte Absätze ohne persönliche Anekdoten.',
    detectorScore: 'ChatGPT-Detektor: "Wahrscheinlich KI"',
    truth: "real",
    explanation: "Reflexionsfragen verlangen persönliche Anekdoten. Wenn die ausbleiben — und stattdessen abstrakte Allgemeinplätze stehen — ist KI sehr wahrscheinlich.",
  },
  {
    description: 'Drei-Sätze-Antwort einer 5. Klasse auf eine Sachunterrichts-Frage. Rechtschreibfehler, Umgangssprache, persönliche Vorlieben ("Ich finde Vulkane voll cool").',
    detectorScore: "GPTZero: 12 % KI-Wahrscheinlichkeit",
    truth: "real",
    explanation: "Niedriger Score, persönliche Marker, Rechtschreibfehler — eindeutig keine KI. Korrekte Detektor-Einschätzung diesmal.",
  },
];

export default function DetectorTrainer() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Verdict | null>(null);
  const [finished, setFinished] = useState(false);

  const scenario = SCENARIOS[index];
  const isCorrect = selected !== null && selected === scenario.truth;
  const isLast = index === SCENARIOS.length - 1;

  const handleSelect = (v: Verdict) => {
    if (selected !== null) return;
    setSelected(v);
    if (v === scenario.truth) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) setFinished(true);
    else {
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
    const pct = Math.round((score / SCENARIOS.length) * 100);
    return (
      <ToolShell title="Detektor-Trainer" description="Ergebnis">
        <div className="flex items-start gap-5 rounded-2xl border-2 border-purple-light-3 bg-purple-light-5 p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple text-white">
            <Trophy className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-text-primary">Trainer beendet</h3>
            <p className="mt-2 text-text-primary">Du hast <strong>{score} von {SCENARIOS.length}</strong> Detektor-Treffer richtig eingeordnet ({pct}%).</p>
            <p className="mt-2 text-sm text-text-secondary">Merke: Detektoren sind Sensibilisierungs-Werkzeuge, keine Beweismittel. False-Positive-Raten von 20+ % sind dokumentiert.</p>
          </div>
        </div>
        <button type="button" onClick={handleRestart} className="mt-6 flex items-center gap-2 rounded-lg border-2 border-purple px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple hover:text-white">
          <RotateCcw className="h-4 w-4" />
          Nochmal üben
        </button>
      </ToolShell>
    );
  }

  return (
    <ToolShell title="Detektor-Trainer" description="Sechs reale Detektor-Szenarien. Tipp jeweils: Hat der Detektor recht — oder ist es ein False Positive?">
      <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
        <span>Szenario {index + 1} von {SCENARIOS.length}</span>
        <span>{score} richtig</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
        <div className="h-full rounded-full bg-purple transition-all duration-300" style={{ width: `${((selected !== null ? index + 1 : index) / SCENARIOS.length) * 100}%` }} />
      </div>

      <div className="mt-6 rounded-xl border border-border-secondary bg-background-secondary p-5">
        <p className="text-base text-text-primary">{scenario.description}</p>
        <p className="mt-3 inline-block rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-mono text-amber-900">
          {scenario.detectorScore}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {(["real", "false-positive"] as Verdict[]).map((v) => {
          const isSelected = selected === v;
          const correctMark = selected !== null && v === scenario.truth;
          const wrongMark = selected !== null && isSelected && v !== scenario.truth;
          let cls = "border-border-secondary bg-white hover:border-purple text-text-primary";
          if (selected !== null) {
            if (correctMark) cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
            else if (wrongMark) cls = "border-rose-500 bg-rose-50 text-rose-900";
            else cls = "border-border-secondary bg-white text-text-tertiary";
          }
          return (
            <button key={v} type="button" disabled={selected !== null} onClick={() => handleSelect(v)} className={`flex flex-1 min-w-40 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition disabled:cursor-default ${cls}`}>
              {v === "real" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {v === "real" ? "Detektor hat recht" : "False Positive"}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`mt-5 rounded-xl border px-4 py-3 text-sm ${isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
          <p className="font-bold">
            {isCorrect ? <Check className="inline h-4 w-4" /> : <X className="inline h-4 w-4" />}
            {" "}{isCorrect ? "Richtig." : "Knapp daneben."} Es war <span className="uppercase">{scenario.truth === "real" ? "ein echter Treffer" : "ein False Positive"}</span>.
          </p>
          <p className="mt-1.5">{scenario.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={handleNext} className="rounded-lg bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark">
            {isLast ? "Ergebnis anzeigen" : "Nächstes Szenario"}
          </button>
        </div>
      )}
    </ToolShell>
  );
}
