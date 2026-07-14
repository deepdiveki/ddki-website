"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import QuizEngine, { type QuizChoice, type QuizItem } from "./shared/QuizEngine";

const CHOICES: QuizChoice[] = [
  {
    value: "hoch",
    label: "Risiko HOCH",
    icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
    selectedClass: "border-amber-500 bg-amber-50 text-amber-900",
  },
  {
    value: "niedrig",
    label: "Risiko NIEDRIG",
    icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
    selectedClass: "border-emerald-500 bg-emerald-50 text-emerald-900",
  },
];

const ITEMS: QuizItem[] = [
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
    text: "Du lässt die KI eine mehrstufige Mathe-Textaufgabe ohne Rechen-Tool ausrechnen.",
    answer: "hoch",
    explanation:
      "Reines Kopfrechnen ohne Rechen-Tool gehört zu den fehleranfälligen Bereichen. Rechenschritte selbst nachvollziehen oder ein Tool nutzen.",
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
  return (
    <QuizEngine
      eyebrow="Crash-Kurs KI · Tool"
      title="Halluzinations-Trainer"
      intro="Bei welcher Aufgabe ist das Risiko hoch, dass die KI selbstbewusst Unsinn behauptet? Schätze ein – und sieh, warum."
      itemNoun="Szenario"
      resultTitle="Halluzinations-Trainer beendet"
      choices={CHOICES}
      items={ITEMS}
      renderAnswer={(item) => (
        <>
          Risiko ist <span className="uppercase">{item.answer}</span>.
        </>
      )}
    />
  );
}
