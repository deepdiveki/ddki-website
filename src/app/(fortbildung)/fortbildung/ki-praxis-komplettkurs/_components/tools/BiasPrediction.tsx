"use client";

import { useState } from "react";
import { AlertTriangle, Check, RotateCcw, Trophy, X } from "lucide-react";
import ToolShell from "./ToolShell";

type Prompt = {
  prompt: string;
  question: string;
  options: { id: string; label: string; correct?: boolean }[];
  explanation: string;
};

const PROMPTS: Prompt[] = [
  {
    prompt: 'Eine deutsche Familie beim Sonntagsessen',
    question: "Wie viel Diversität hat das KI-Bild voraussichtlich?",
    options: [
      { id: "a", label: "Sehr divers — moderne deutsche Familien sind heterogen" },
      { id: "b", label: "Standardbild: weiße Familie, traditionell, Vater-Mutter-Kinder", correct: true },
      { id: "c", label: "Patchworkfamilien werden überrepräsentiert" },
      { id: "d", label: "Komplett zufällig" },
    ],
    explanation: 'KI-Bildgeneratoren greifen auf Trainingsdaten zurück, die das deutsche "Standard"-Bild dominant abbilden. Modell-Bias produziert hier oft monoethnische, traditionelle Konstellationen — auch wenn die Realität anders aussieht.',
  },
  {
    prompt: 'Ein CEO eines großen Konzerns',
    question: "Welches Geschlecht und Hauttyp produziert die KI mit hoher Wahrscheinlichkeit?",
    options: [
      { id: "a", label: "Männlich, weiß, mittleren Alters", correct: true },
      { id: "b", label: "Geschlechterausgewogen mit ethnischer Vielfalt" },
      { id: "c", label: "Vorwiegend weiblich" },
      { id: "d", label: "Junge Asiat:innen" },
    ],
    explanation: "Massiv dokumentierter Bias: Über 90 % der KI-CEO-Bilder sind weiß, männlich, mittleren Alters. Spiegelt historische Trainingsdaten, nicht heutige (oder gewünschte) Realität.",
  },
  {
    prompt: 'Eine Putzkraft in einem Bürogebäude',
    question: "Welche stereotype Darstellung ist wahrscheinlich?",
    options: [
      { id: "a", label: "Weiße:r Endvierziger:in" },
      { id: "b", label: "Junge:r Studierende:r" },
      { id: "c", label: "PoC-Frau, oft mittleren Alters, in Arbeitskleidung", correct: true },
      { id: "d", label: "Gleichverteilt nach Demografie" },
    ],
    explanation: "Niederlohn-Berufe werden in Trainingsdaten überproportional mit Migrant:innen und Frauen assoziiert. KI verstärkt diese gesellschaftliche Schieflage.",
  },
  {
    prompt: 'Ein Programmierer bei der Arbeit',
    question: "Welches Stereotyp produziert die KI mit hoher Wahrscheinlichkeit?",
    options: [
      { id: "a", label: "Junger weißer/asiatischer Mann mit Brille vor mehreren Bildschirmen", correct: true },
      { id: "b", label: "Diverse Geschlechter und Hauttöne gleichverteilt" },
      { id: "c", label: "Ältere Person im Anzug" },
      { id: "d", label: "Frau, die in den Vordergrund tritt" },
    ],
    explanation: "Tech-Bias par excellence. Trotz steigender Diversität in der echten Branche produziert KI fast immer das Standard-Klischee.",
  },
  {
    prompt: 'Eine Pflegekraft im Krankenhaus',
    question: "Was wird die KI mit hoher Wahrscheinlichkeit zeigen?",
    options: [
      { id: "a", label: "Männlicher Pfleger in Uniform" },
      { id: "b", label: "Weibliche Pflegerin, oft mit aufgesetztem Lächeln", correct: true },
      { id: "c", label: "Gleichverteilte Geschlechter" },
      { id: "d", label: "Roboter-Pfleger als Zukunftsvision" },
    ],
    explanation: "Pflege wird sprachlich und visuell stark weiblich konnotiert in Trainingsdaten. KI reproduziert das, selbst wenn der Prompt geschlechtsneutral ist.",
  },
];

export default function BiasPrediction() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const item = PROMPTS[index];
  const correctOption = item.options.find((o) => o.correct);
  const isCorrect = selected === correctOption?.id;
  const isLast = index === PROMPTS.length - 1;

  const handleSelect = (id: string) => {
    if (selected !== null) return;
    setSelected(id);
    if (id === correctOption?.id) setScore((s) => s + 1);
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
    return (
      <ToolShell title="Bias-Vorhersage-Spiel" description="Ergebnis">
        <div className="flex items-start gap-5 rounded-2xl border-2 border-purple-light-3 bg-purple-light-5 p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple text-white">
            <Trophy className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-text-primary">Spiel beendet</h3>
            <p className="mt-2 text-text-primary">Du hast <strong>{score} von {PROMPTS.length}</strong> Bias-Vorhersagen richtig getroffen.</p>
            <p className="mt-2 text-sm text-text-secondary">Erkenntnis: Bias ist strukturell — die KI bildet nicht ab, was richtig wäre, sondern was in den Trainingsdaten dominierend war. Genau das macht Bias-Awareness zur Kernkompetenz im KI-Unterricht.</p>
          </div>
        </div>
        <button type="button" onClick={handleRestart} className="mt-6 flex items-center gap-2 rounded-lg border-2 border-purple px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple hover:text-white">
          <RotateCcw className="h-4 w-4" />
          Nochmal spielen
        </button>
      </ToolShell>
    );
  }

  return (
    <ToolShell title="Bias-Vorhersage-Spiel" description="Fünf KI-Prompts. Tipp jeweils: Welches Stereotyp produziert die KI? Auflösung mit Hintergrund.">
      <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
        <span>Prompt {index + 1} von {PROMPTS.length}</span>
        <span>{score} richtig</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
        <div className="h-full rounded-full bg-purple transition-all duration-300" style={{ width: `${((selected !== null ? index + 1 : index) / PROMPTS.length) * 100}%` }} />
      </div>

      <div className="mt-6 rounded-xl border border-border-secondary bg-background-secondary p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Prompt an die Bild-KI</p>
        <p className="mt-2 font-mono text-base text-text-primary">{item.prompt}</p>
        <p className="mt-4 text-sm font-semibold text-text-primary">{item.question}</p>
      </div>

      <ul className="mt-5 flex flex-col gap-2">
        {item.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrectOpt = opt.correct;
          let cls = "border-border-secondary bg-white hover:border-purple text-text-primary";
          if (selected !== null) {
            if (isCorrectOpt) cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
            else if (isSelected && !isCorrectOpt) cls = "border-rose-500 bg-rose-50 text-rose-900";
            else cls = "border-border-secondary bg-white text-text-tertiary";
          }
          return (
            <li key={opt.id}>
              <button type="button" disabled={selected !== null} onClick={() => handleSelect(opt.id)} className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition disabled:cursor-default ${cls}`}>
                <span className="font-semibold">{opt.id.toUpperCase()}</span>
                <span className="flex-1">{opt.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {selected !== null && (
        <div className={`mt-5 rounded-xl border px-4 py-3 text-sm ${isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
          <p className="font-bold">
            {isCorrect ? <Check className="inline h-4 w-4" /> : <AlertTriangle className="inline h-4 w-4" />}
            {" "}{isCorrect ? "Richtig erkannt." : "Knapp daneben — aber genau das ist die Crux."}
          </p>
          <p className="mt-1.5">{item.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={handleNext} className="rounded-lg bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark">
            {isLast ? "Ergebnis anzeigen" : "Nächster Prompt"}
          </button>
        </div>
      )}
    </ToolShell>
  );
}
