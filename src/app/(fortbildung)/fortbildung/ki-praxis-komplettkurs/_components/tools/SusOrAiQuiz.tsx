"use client";

import { useState } from "react";
import { Bot, Check, RotateCcw, Trophy, User, X } from "lucide-react";
import ToolShell from "./ToolShell";

type Source = "sus" | "ki";

type Sample = {
  text: string;
  answer: Source;
  explanation: string;
};

const SAMPLES: Sample[] = [
  {
    text: "Die Französische Revolution war ein bedeutendes Ereignis in der Geschichte Europas. Sie begann im Jahr 1789 mit dem Sturm auf die Bastille und führte zur Abschaffung der Monarchie. Verschiedene gesellschaftliche Gruppen kämpften für ihre Rechte und Freiheiten. Die Ideen der Aufklärung spielten dabei eine zentrale Rolle.",
    answer: "ki",
    explanation: "Typische KI-Marker: keine konkreten Personen, keine Daten außer der Standard-Jahreszahl, sehr glatte Übergänge, alles Allgemeinplätze ohne eigene Position oder Pointe.",
  },
  {
    text: "Ich finde Robespierre einerseits krass, weil er für Gleichheit gekämpft hat, andererseits aber auch übertrieben mit dem ganzen Terror. Mein Opa hat mal gesagt, sowas ist immer schlimm wenn Leute meinen, sie wären die einzigen die Recht haben. Bei der Französischen Revolution sieht man das gut.",
    answer: "sus",
    explanation: 'Persönliche Position ("ich finde"), Umgangssprache ("krass", "übertrieben"), Bezug zu persönlicher Lebenswelt (Opa-Zitat), nicht ganz korrekte Grammatik — alles typische SuS-Marker.',
  },
  {
    text: "Lineare Funktionen lassen sich durch die Gleichung y = mx + b beschreiben, wobei m die Steigung und b der y-Achsenabschnitt ist. Sie eignen sich besonders gut zur Modellierung realer Sachverhalte wie zum Beispiel des Mobilfunkvertrags, bei dem eine monatliche Grundgebühr (b) und ein Preis pro Minute (m) anfallen.",
    answer: "ki",
    explanation: 'Lehrbuch-glatt, perfekt strukturiert, das "Mobilfunkvertrag"-Beispiel ist ein KI-Klassiker. Keine SuS würde so schreiben, ohne dass es kopiert wirkt.',
  },
  {
    text: "Also y = 2x + 3 heißt ja, dass wenn ich für x 0 einsetze, kommt 3 raus, das ist dann der Punkt wo es die y-Achse trifft. Und wenn x = 1 ist, dann 5, x = 2 dann 7 usw. Steigung ist immer 2 nach oben pro 1 nach rechts. Hab ich das richtig?",
    answer: "sus",
    explanation: 'Tastendes Vorgehen, Umgangsformulierungen ("wo es trifft"), Selbst-Frage am Ende ("Hab ich das richtig?") — Denken auf dem Papier.',
  },
  {
    text: "Photosynthese ist der Prozess, bei dem Pflanzen mithilfe von Sonnenlicht aus Kohlenstoffdioxid und Wasser Glukose und Sauerstoff herstellen. Dieser Vorgang findet in den Chloroplasten statt und ist essentiell für das Leben auf der Erde, da er Sauerstoff produziert.",
    answer: "ki",
    explanation: 'Perfekt abrufbare Lehrbuchdefinition, "essentiell für das Leben auf der Erde" ist eine typische KI-Phrase. Keine Schwächen, keine Verkürzungen.',
  },
  {
    text: "Photosynthese ist wenn Pflanzen aus Licht ihr Essen machen. Sie nehmen CO2 von der Luft auf und Wasser von den Wurzeln und Licht von der Sonne. Dann kommt Zucker raus für die Pflanze und Sauerstoff für uns. Steht in den Chloropasten oder so.",
    answer: "sus",
    explanation: 'Vereinfachte Sprache, Rechtschreibfehler ("Chloropasten"), Vermutung ("oder so"), kindlich-direkter Erklärungsstil — eindeutig SuS, vermutlich Mittelstufe.',
  },
];

export default function SusOrAiQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Source | null>(null);
  const [finished, setFinished] = useState(false);

  const sample = SAMPLES[index];
  const isCorrect = selected !== null && selected === sample.answer;
  const isLast = index === SAMPLES.length - 1;

  const handleSelect = (s: Source) => {
    if (selected !== null) return;
    setSelected(s);
    if (s === sample.answer) setScore((sc) => sc + 1);
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
    const pct = Math.round((score / SAMPLES.length) * 100);
    const message = pct === 100 ? "Beeindruckend — du hast ein sehr gutes Auge dafür." : pct >= 67 ? "Solide. Du erkennst die wichtigsten Marker." : "Genau das ist der Punkt: Es ist schwerer, als es aussieht. Und wenn erfahrene Lehrkräfte schon raten — was sollen kommerzielle Detektoren erkennen?";
    return (
      <ToolShell title="SuS oder KI?" description="Auflösung">
        <div className="flex items-start gap-5 rounded-2xl border-2 border-purple-light-3 bg-purple-light-5 p-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple text-white">
            <Trophy className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-text-primary">Quiz beendet</h3>
            <p className="mt-2 text-text-primary">Du hast <strong>{score} von {SAMPLES.length}</strong> Texte richtig zugeordnet ({pct}%).</p>
            <p className="mt-2 text-sm text-text-secondary">{message}</p>
          </div>
        </div>
        <button type="button" onClick={handleRestart} className="mt-6 flex items-center gap-2 rounded-lg border-2 border-purple px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple hover:text-white">
          <RotateCcw className="h-4 w-4" />
          Nochmal versuchen
        </button>
      </ToolShell>
    );
  }

  return (
    <ToolShell title="SuS oder KI?" description="Sechs Beispieltexte. Tipp jeweils: Schüler:in oder KI? Und sieh dir an, woran du es erkennen kannst.">
      <div className="flex items-center justify-between text-sm font-medium text-text-secondary">
        <span>Text {index + 1} von {SAMPLES.length}</span>
        <span>{score} richtig</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background-secondary">
        <div className="h-full rounded-full bg-purple transition-all duration-300" style={{ width: `${((selected !== null ? index + 1 : index) / SAMPLES.length) * 100}%` }} />
      </div>

      <div className="mt-6 rounded-xl border border-border-secondary bg-background-secondary p-5">
        <p className="text-sm leading-relaxed text-text-primary">{sample.text}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {(["sus", "ki"] as Source[]).map((src) => {
          const isSelected = selected === src;
          const correctMark = selected !== null && src === sample.answer;
          const wrongMark = selected !== null && isSelected && src !== sample.answer;
          let cls = "border-border-secondary bg-white hover:border-purple text-text-primary";
          if (selected !== null) {
            if (correctMark) cls = "border-emerald-500 bg-emerald-50 text-emerald-900";
            else if (wrongMark) cls = "border-rose-500 bg-rose-50 text-rose-900";
            else cls = "border-border-secondary bg-white text-text-tertiary";
          }
          return (
            <button key={src} type="button" disabled={selected !== null} onClick={() => handleSelect(src)} className={`flex flex-1 min-w-40 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition disabled:cursor-default ${cls}`}>
              {src === "sus" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              {src === "sus" ? "Schüler:in geschrieben" : "Von KI geschrieben"}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`mt-5 rounded-xl border px-4 py-3 text-sm ${isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
          <p className="font-bold">
            {isCorrect ? <Check className="inline h-4 w-4" /> : <X className="inline h-4 w-4" />}
            {" "}{isCorrect ? "Richtig." : "Knapp daneben."} Es war <span className="uppercase">{sample.answer === "sus" ? "ein SuS-Text" : "ein KI-Text"}</span>.
          </p>
          <p className="mt-1.5">{sample.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={handleNext} className="rounded-lg bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-dark">
            {isLast ? "Ergebnis anzeigen" : "Nächster Text"}
          </button>
        </div>
      )}
    </ToolShell>
  );
}
