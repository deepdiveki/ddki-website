"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import QuizEngine, { type QuizChoice, type QuizItem } from "./shared/QuizEngine";

const CHOICES: QuizChoice[] = [
  {
    value: "real",
    label: "Detektor hat recht",
    icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
    selectedClass: "border-emerald-500 bg-emerald-50 text-emerald-900",
  },
  {
    value: "false-positive",
    label: "False Positive",
    icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
    selectedClass: "border-amber-500 bg-amber-50 text-amber-900",
  },
];

const ITEMS: QuizItem[] = [
  {
    text: 'Schüler-Aufsatz einer 11. Klasse zum Thema "Demokratie und soziale Medien". Schreibstil sehr glatt, lange Sätze, kaum Rechtschreibfehler.',
    badge: "GPTZero: 87 % KI-Wahrscheinlichkeit",
    answer: "false-positive",
    explanation:
      "Glatter Schreibstil ist KEIN sicherer KI-Marker. Begabte SuS schreiben oft sauber. Detektoren strafen das fälschlicherweise ab. Klassischer False Positive.",
  },
  {
    text: "Hausaufgabe einer 9. Klasse zur Photosynthese. Acht Absätze, perfekt strukturiert, Standard-Lehrbuchformulierungen, keine Pointe oder persönliche Note.",
    badge: "GPTZero: 92 % KI-Wahrscheinlichkeit",
    answer: "real",
    explanation:
      "Hier passen die KI-Marker: Lehrbuchglatt, keine eigene Perspektive, perfekte Struktur. Mit hoher Wahrscheinlichkeit tatsächlich KI-generiert – aber auch das bleibt eine Wahrscheinlichkeit, kein Beweis.",
  },
  {
    text: "Text einer DaZ-Schülerin (Deutsch als Zweitsprache, B1-Niveau). Klare aber einfache Sätze, vorsichtige Formulierungen, gelegentlich ungewöhnliche Konstruktionen.",
    badge: "CopyLeaks: 71 % KI",
    answer: "false-positive",
    explanation:
      'Detektoren haben einen dokumentierten Bias gegen Nicht-Muttersprachler:innen. "Einfacher" Stil wird oft als KI gewertet. Sehr typischer False Positive — Stanford-Studie 2023.',
  },
  {
    text: 'Mathe-Erklärung einer 7. Klasse zur Bruchrechnung. Logischer Aufbau, drei Beispielrechnungen, am Ende ein "Tipp" — alles sehr ordentlich.',
    badge: "GPTZero: 68 % KI-Wahrscheinlichkeit",
    answer: "false-positive",
    explanation:
      "Strukturierte Mathe-Erklärungen folgen oft natürlichen Mustern, die Detektoren als KI-typisch werten. Bei 7. Klasse + ordentlicher SuS sehr wahrscheinlich kein KI-Einsatz.",
  },
  {
    text: 'Antwort auf eine Reflexionsfrage in einem Portfolio: "Was hat dich diese Woche überrascht?" Drei lange, gut formulierte Absätze ohne persönliche Anekdoten.',
    badge: 'ChatGPT-Detektor: "Wahrscheinlich KI"',
    answer: "real",
    explanation:
      "Reflexionsfragen verlangen persönliche Anekdoten. Wenn die ausbleiben — und stattdessen abstrakte Allgemeinplätze stehen — ist KI wahrscheinlich. Ein pädagogisches Gespräch klärt es, nicht der Detektor.",
  },
  {
    text: 'Drei-Sätze-Antwort einer 5. Klasse auf eine Sachunterrichts-Frage. Rechtschreibfehler, Umgangssprache, persönliche Vorlieben ("Ich finde Vulkane voll cool").',
    badge: "GPTZero: 12 % KI-Wahrscheinlichkeit",
    answer: "real",
    explanation:
      "Niedriger Score, persönliche Marker, Rechtschreibfehler — sehr wahrscheinlich keine KI. Korrekte Detektor-Einschätzung diesmal.",
  },
];

export default function DetectorTrainer() {
  return (
    <QuizEngine
      eyebrow="Modul II · Tool"
      title="Detektor-Trainer"
      intro="Sechs reale Detektor-Szenarien. Tipp jeweils: Hat der Detektor recht — oder ist es ein False Positive?"
      itemNoun="Szenario"
      itemVariant="passage"
      resultTitle="Trainer beendet"
      choices={CHOICES}
      items={ITEMS}
      renderAnswer={(item) => (
        <>
          Es war <span className="uppercase">{item.answer === "real" ? "ein echter Treffer" : "ein False Positive"}</span>.
        </>
      )}
      resultMessage={() =>
        "Merke: Detektoren sind Sensibilisierungs-Werkzeuge, keine Beweismittel. False-Positive-Raten von 20+ % sind dokumentiert."
      }
    />
  );
}
