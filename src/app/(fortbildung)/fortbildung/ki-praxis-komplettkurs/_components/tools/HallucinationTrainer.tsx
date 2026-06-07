"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, Trophy } from "lucide-react";

type Risk = "hoch" | "niedrig";

type Scenario = {
  text: string;
  answer: Risk;
  explanation: string;
};

const SCENARIOS: Scenario[] = [
  {
    text: "Du lässt dir eine Quellenangabe mit Autor und Jahreszahl zu einem Nischenthema geben.",
    answer: "hoch",
    explanation:
      "Quellen und Zitate werden besonders gern frei erfunden – perfekt formatiert, aber nicht existent. Immer außerhalb der KI prüfen.",
  },
  {
    text: "Du lässt eine Eltern-E-Mail freundlicher formulieren.",
    answer: "niedrig",
    explanation:
      "Reines Umformulieren: Hier kann nichts „halluziniert“ werden, weil du den Inhalt selbst lieferst.",
  },
  {
    text: "Du fragst nach dem genauen Geburtsdatum einer weniger bekannten historischen Person.",
    answer: "hoch",
    explanation:
      "Konkrete Fakten wie Zahlen, Daten und Namen sind fehleranfällig – klingt überzeugt, kann aber falsch sein.",
  },
  {
    text: "Du lässt dir 5 Ideen für einen Stundeneinstieg zum Thema Vulkane sammeln.",
    answer: "niedrig",
    explanation:
      "Ideen sammeln ist ungefährlich – es gibt kein „richtig oder falsch“, das halluziniert werden könnte.",
  },
  {
    text: "Du lässt die KI eine mehrstufige Mathe-Textaufgabe ausrechnen.",
    answer: "hoch",
    explanation:
      "Mathematik gehört zu den fehleranfälligen Bereichen. Rechenschritte selbst nachvollziehen oder gegenprüfen.",
  },
  {
    text: "Du lässt einen Sachtext für eine 5. Klasse vereinfachen.",
    answer: "niedrig",
    explanation:
      "Vereinfachen ist eine Sprach-Aufgabe – genau die Kernkompetenz der KI. Geringes Risiko.",
  },
  {
    text: "Du fragst (ohne Internet-Tool) nach Ereignissen von letzter Woche.",
    answer: "hoch",
    explanation:
      "Alles nach dem Trainings-Stichtag ist unsicher – außer das Tool kann live im Internet nachschauen.",
  },
  {
    text: "Du lässt anonyme Stichworte zu einer Schülerleistung in wertschätzendes Feedback umformulieren.",
    answer: "niedrig",
    explanation:
      "Du lieferst die Bewertung, die KI formuliert nur. Kein Faktenrisiko (und denk an: anonymisieren!).",
  },
];

export default function HallucinationTrainer() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Risk | null>(null);
  const [finished, setFinished] = useState(false);

  const scenario = SCENARIOS[index];
  const isCorrect = selected !== null && selected === scenario.answer;
  const isLast = index === SCENARIOS.length - 1;
  const progress = ((selected !== null ? index + 1 : index) / SCENARIOS.length) * 100;

  const handleSelect = (value: Risk) => {
    if (selected !== null) return;
    setSelected(value);
    if (value === scenario.answer) setScore((s) => s + 1);
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
    const total = SCENARIOS.length;
    const passed = score === total;
    const strong = score >= 6;
    let message = "Guter Anfang. Merke: Fakten, Quellen, Mathe & Aktuelles = prüfen. Sprache umformen = sicher.";
    if (passed) message = "Perfekt – du erkennst Halluzinationsrisiken sicher.";
    else if (strong) message = "Stark! Du hast ein gutes Gespür dafür, wo Vorsicht nötig ist.";

    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 lg:py-12">
        <div
          className={`flex items-start gap-5 rounded-2xl border-2 p-6 ${
            passed || strong
              ? "border-emerald-200 bg-emerald-50"
              : "border-purple-light-3 bg-purple-light-5"
          }`}
        >
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white ${
              passed || strong ? "bg-emerald-500" : "bg-purple"
            }`}
          >
            <Trophy className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
              Halluzinations-Trainer beendet
            </h2>
            <p className="mt-3 text-text-primary">
              Du hast <span className="font-semibold">{score} von {total}</span> Szenarien richtig eingeschätzt.
            </p>
            <p className="mt-2 text-sm text-text-secondary">{message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 flex items-center gap-2 rounded-lg border-2 border-purple px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Nochmal üben
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 lg:py-12">
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-purple">
          Crash-Kurs KI · Tool
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-text-primary md:text-3xl">
          Halluzinations-Trainer
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Bei welcher Aufgabe ist das Risiko hoch, dass die KI selbstbewusst Unsinn behauptet? Schätze ein – und sieh, warum.
        </p>
      </header>

      <div className="rounded-2xl border border-border-secondary bg-white p-5 shadow-sm md:p-7">
        <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
          <span>
            Szenario {index + 1} von {SCENARIOS.length}
          </span>
          <span>{score} richtig</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
          <div
            className="h-full rounded-full bg-purple transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-6 text-lg font-semibold leading-snug text-text-primary md:text-xl">
          {scenario.text}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <RiskButton
            value="hoch"
            label="Risiko HOCH"
            icon={<AlertTriangle className="h-4 w-4" />}
            selected={selected}
            onClick={() => handleSelect("hoch")}
          />
          <RiskButton
            value="niedrig"
            label="Risiko NIEDRIG"
            icon={<CheckCircle2 className="h-4 w-4" />}
            selected={selected}
            onClick={() => handleSelect("niedrig")}
          />
        </div>

        {selected !== null && (
          <div
            className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
              isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            <p className="font-bold">
              {isCorrect ? "Richtig." : "Knapp daneben."}{" "}
              <span className="font-medium">
                Risiko ist <span className="uppercase">{scenario.answer}</span>.
              </span>
            </p>
            <p className="mt-1.5">{scenario.explanation}</p>
          </div>
        )}

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

function RiskButton({
  value,
  label,
  icon,
  selected,
  onClick,
}: {
  value: Risk;
  label: string;
  icon: React.ReactNode;
  selected: Risk | null;
  onClick: () => void;
}) {
  const isSelected = selected === value;
  const isLocked = selected !== null;

  const baseClass =
    "flex flex-1 min-w-40 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition disabled:cursor-default";

  let stateClass = "border-border-secondary bg-white text-text-primary hover:border-purple";
  if (isLocked) {
    if (isSelected) {
      stateClass =
        value === "hoch"
          ? "border-amber-500 bg-amber-50 text-amber-900"
          : "border-emerald-500 bg-emerald-50 text-emerald-900";
    } else {
      stateClass = "border-border-secondary bg-white text-text-tertiary";
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLocked}
      className={`${baseClass} ${stateClass}`}
    >
      {icon}
      {label}
    </button>
  );
}
