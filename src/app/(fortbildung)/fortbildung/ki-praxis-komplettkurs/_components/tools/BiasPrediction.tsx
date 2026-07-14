"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Lightbulb, RotateCcw } from "lucide-react";
import ToolShell from "./ToolShell";

type Prompt = {
  prompt: string;
  question: string;
  options: { id: string; label: string }[];
  /** id der Tendenz, die in Audits/Studien am häufigsten beobachtet wurde. */
  observed: string;
  explanation: string;
};

const PROMPTS: Prompt[] = [
  {
    prompt: "Eine deutsche Familie beim Sonntagsessen",
    question: "Welche Darstellung erwartest du am ehesten?",
    options: [
      { id: "a", label: "Sehr divers — moderne deutsche Familien sind heterogen" },
      { id: "b", label: "Standardbild: weiße Familie, traditionell, Vater-Mutter-Kinder" },
      { id: "c", label: "Patchworkfamilien überrepräsentiert" },
      { id: "d", label: "Komplett zufällig" },
    ],
    observed: "b",
    explanation:
      'Bild-KI greift auf Trainingsdaten zurück, in denen das deutsche "Standard"-Bild dominiert. Beobachtet wurde meist eine monoethnische, traditionelle Konstellation — auch wenn die Realität vielfältiger ist.',
  },
  {
    prompt: "Ein CEO eines großen Konzerns",
    question: "Welche Darstellung erwartest du am ehesten?",
    options: [
      { id: "a", label: "Männlich, weiß, mittleren Alters" },
      { id: "b", label: "Geschlechterausgewogen mit ethnischer Vielfalt" },
      { id: "c", label: "Vorwiegend weiblich" },
      { id: "d", label: "Junge Asiat:innen" },
    ],
    observed: "a",
    explanation:
      "In mehreren Audits (u. a. Bloomberg 2023 zu Stable Diffusion) waren deutlich über 90 % der generierten CEO-Bilder weiß, männlich, mittleren Alters — ein Spiegel historischer Trainingsdaten, nicht der heutigen oder gewünschten Realität.",
  },
  {
    prompt: "Eine Putzkraft in einem Bürogebäude",
    question: "Welche Darstellung erwartest du am ehesten?",
    options: [
      { id: "a", label: "Weiße:r Endvierziger:in" },
      { id: "b", label: "Junge:r Studierende:r" },
      { id: "c", label: "Person of Color, oft mittleren Alters, in Arbeitskleidung" },
      { id: "d", label: "Gleichverteilt nach Demografie" },
    ],
    observed: "c",
    explanation:
      "Niedriglohn-Berufe werden in Trainingsdaten überproportional mit Migrant:innen und Frauen assoziiert. Bild-KI reproduziert diese gesellschaftliche Schieflage — sie beschreibt damit nicht, wie es sein sollte.",
  },
  {
    prompt: "Ein Programmierer bei der Arbeit",
    question: "Welche Darstellung erwartest du am ehesten?",
    options: [
      { id: "a", label: "Junger weißer/asiatischer Mann mit Brille vor mehreren Bildschirmen" },
      { id: "b", label: "Diverse Geschlechter und Hauttöne gleichverteilt" },
      { id: "c", label: "Ältere Person im Anzug" },
      { id: "d", label: "Frau im Vordergrund" },
    ],
    observed: "a",
    explanation:
      "Tech-Bias par excellence: Trotz wachsender Diversität in der echten Branche wurde meist das Standard-Klischee generiert.",
  },
  {
    prompt: "Eine Pflegekraft im Krankenhaus",
    question: "Welche Darstellung erwartest du am ehesten?",
    options: [
      { id: "a", label: "Männlicher Pfleger in Uniform" },
      { id: "b", label: "Weibliche Pflegerin, oft mit aufgesetztem Lächeln" },
      { id: "c", label: "Gleichverteilte Geschlechter" },
      { id: "d", label: "Roboter-Pfleger als Zukunftsvision" },
    ],
    observed: "b",
    explanation:
      "Pflege ist in Trainingsdaten stark weiblich konnotiert. Beobachtet wurde meist eine weibliche Darstellung, selbst bei geschlechtsneutralem Prompt.",
  },
];

const CAVEAT =
  "Wichtig: Das sind beobachtete Tendenzen aus Studien, keine Naturgesetze — und keine Aussage darüber, wie Menschen wirklich sind. Neuere Modelle steuern teils aktiv gegen (und schießen dabei manchmal über das Ziel hinaus, siehe der Gemini-Vorfall 2024). Probier es mit deiner aktuellen KI selbst aus — die Ergebnisse ändern sich.";

export default function BiasPrediction() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const promptRef = useRef<HTMLDivElement>(null);

  const item = PROMPTS[index];
  const observedOption = item.options.find((o) => o.id === item.observed);
  const isLast = index === PROMPTS.length - 1;
  const answeredCount = selected !== null ? index + 1 : index;
  const progress = (answeredCount / PROMPTS.length) * 100;

  useEffect(() => {
    if (!finished) promptRef.current?.focus();
  }, [index, finished]);

  const handleSelect = (id: string) => {
    if (selected !== null) return;
    setSelected(id);
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
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <ToolShell title="Bias-Vorhersage-Spiel" description="Auswertung">
        <div role="status" className="flex items-start gap-5 rounded-2xl border-2 border-purple-light-3 bg-purple-light-5 p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple text-white">
            <Eye className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-text-primary">Durchgespielt</h3>
            <p className="mt-2 text-text-primary">
              Es gibt hier bewusst keine Punktzahl — es geht nicht ums „richtige" Raten von Stereotypen, sondern ums Erkennen von
              Mustern.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Erkenntnis: Bias ist strukturell — die KI bildet nicht ab, was richtig wäre, sondern was in den Trainingsdaten
              dominierte. Genau das macht Bias-Awareness zur Kernkompetenz im KI-Unterricht. Am stärksten wirkt es, wenn SuS es{" "}
              <strong>selbst ausprobieren</strong> und die Ergebnisse gemeinsam einordnen.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 flex items-center gap-2 rounded-lg border-2 border-purple px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Nochmal spielen
        </button>
      </ToolShell>
    );
  }

  return (
    <ToolShell
      title="Bias-Vorhersage-Spiel"
      description="Fünf Prompts an eine Bild-KI. Gib jeweils deine Vermutung ab — dann zeigen wir, was Untersuchungen beobachtet haben. Kein Richtig oder Falsch, sondern Muster erkennen."
    >
      <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
        <span>
          Prompt {index + 1} von {PROMPTS.length}
        </span>
      </div>
      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Fortschritt: ${index + 1} von ${PROMPTS.length}`}
      >
        <div className="h-full rounded-full bg-purple transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div ref={promptRef} tabIndex={-1} className="mt-6 rounded-xl border border-border-secondary bg-background-secondary p-5 outline-none">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary">Prompt an die Bild-KI</p>
        <p className="mt-2 font-mono text-base text-text-primary">{item.prompt}</p>
        <p className="mt-4 text-sm font-semibold text-text-primary">{item.question}</p>
      </div>

      <ul className="mt-5 flex flex-col gap-2" role="group" aria-label="Deine Vermutung">
        {item.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isObserved = opt.id === item.observed;
          let cls = "border-border-secondary bg-white hover:border-purple text-text-primary";
          let tag: string | null = null;
          if (selected !== null) {
            if (isObserved) {
              cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
              tag = "Am häufigsten beobachtet";
            } else if (isSelected) {
              cls = "border-purple bg-purple-light-5 text-purple-dark";
              tag = "Deine Vermutung";
            } else {
              cls = "border-border-secondary bg-white text-text-tertiary";
            }
          }
          return (
            <li key={opt.id}>
              <button
                type="button"
                disabled={selected !== null}
                aria-pressed={isSelected}
                onClick={() => handleSelect(opt.id)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition disabled:cursor-default ${cls}`}
              >
                <span className="font-semibold">{opt.id.toUpperCase()}</span>
                <span className="flex-1">{opt.label}</span>
                {tag && <span className="shrink-0 text-xs font-semibold">{tag}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite">
        {selected !== null && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="flex items-center gap-2 font-bold">
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
              Was Untersuchungen beobachtet haben: {observedOption?.label}
            </p>
            <p className="mt-1.5">{item.explanation}</p>
            <p className="mt-2 text-xs text-emerald-800">{CAVEAT}</p>
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
            {isLast ? "Auswertung anzeigen" : "Nächster Prompt"}
          </button>
        </div>
      )}
    </ToolShell>
  );
}
