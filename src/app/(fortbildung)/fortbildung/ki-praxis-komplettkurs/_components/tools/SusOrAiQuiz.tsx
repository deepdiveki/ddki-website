"use client";

import { Bot, User } from "lucide-react";
import QuizEngine, { type QuizChoice, type QuizItem } from "./shared/QuizEngine";

const CHOICES: QuizChoice[] = [
  {
    value: "sus",
    label: "Schüler:in geschrieben",
    icon: <User className="h-4 w-4" aria-hidden="true" />,
    selectedClass: "border-emerald-500 bg-emerald-50 text-emerald-900",
  },
  {
    value: "ki",
    label: "Von KI geschrieben",
    icon: <Bot className="h-4 w-4" aria-hidden="true" />,
    selectedClass: "border-emerald-500 bg-emerald-50 text-emerald-900",
  },
];

const ITEMS: QuizItem[] = [
  {
    text: "Die Französische Revolution war ein bedeutendes Ereignis in der Geschichte Europas. Sie begann im Jahr 1789 mit dem Sturm auf die Bastille und führte zur Abschaffung der Monarchie. Verschiedene gesellschaftliche Gruppen kämpften für ihre Rechte und Freiheiten. Die Ideen der Aufklärung spielten dabei eine zentrale Rolle.",
    answer: "ki",
    explanation:
      "Typische KI-Marker: keine konkreten Personen, keine Daten außer der Standard-Jahreszahl, sehr glatte Übergänge, alles Allgemeinplätze ohne eigene Position. Marker sind aber Hinweise, kein Beweis.",
  },
  {
    text: "Ich finde Robespierre einerseits krass, weil er für Gleichheit gekämpft hat, andererseits aber auch übertrieben mit dem ganzen Terror. Mein Opa hat mal gesagt, sowas ist immer schlimm wenn Leute meinen, sie wären die einzigen die Recht haben. Bei der Französischen Revolution sieht man das gut.",
    answer: "sus",
    explanation:
      'Persönliche Position ("ich finde"), Umgangssprache ("krass", "übertrieben"), Bezug zur eigenen Lebenswelt (Opa-Zitat), nicht ganz korrekte Grammatik — alles typische SuS-Marker.',
  },
  {
    text: "Lineare Funktionen lassen sich durch die Gleichung y = mx + b beschreiben, wobei m die Steigung und b der y-Achsenabschnitt ist. Sie eignen sich besonders gut zur Modellierung realer Sachverhalte wie zum Beispiel des Mobilfunkvertrags, bei dem eine monatliche Grundgebühr (b) und ein Preis pro Minute (m) anfallen.",
    answer: "ki",
    explanation:
      'Lehrbuch-glatt, perfekt strukturiert, das "Mobilfunkvertrag"-Beispiel ist ein KI-Klassiker. Trotzdem: Auch ein:e fleißige:r SuS könnte so etwas abschreiben — der Stil legt KI nahe, beweist sie aber nicht.',
  },
  {
    text: "Also y = 2x + 3 heißt ja, dass wenn ich für x 0 einsetze, kommt 3 raus, das ist dann der Punkt wo es die y-Achse trifft. Und wenn x = 1 ist, dann 5, x = 2 dann 7 usw. Steigung ist immer 2 nach oben pro 1 nach rechts. Hab ich das richtig?",
    answer: "sus",
    explanation:
      'Tastendes Vorgehen, Umgangsformulierungen ("wo es trifft"), Selbst-Frage am Ende ("Hab ich das richtig?") — Denken auf dem Papier.',
  },
  {
    text: "Photosynthese ist der Prozess, bei dem Pflanzen mithilfe von Sonnenlicht aus Kohlenstoffdioxid und Wasser Glukose und Sauerstoff herstellen. Dieser Vorgang findet in den Chloroplasten statt und ist essentiell für das Leben auf der Erde, da er Sauerstoff produziert.",
    answer: "ki",
    explanation:
      'Perfekt abrufbare Lehrbuchdefinition, "essentiell für das Leben auf der Erde" ist eine typische KI-Phrase. Ein sehr guter Text kann aber auch von einem Menschen stammen.',
  },
  {
    text: "Photosynthese ist wenn Pflanzen aus Licht ihr Essen machen. Sie nehmen CO2 von der Luft auf und Wasser von den Wurzeln und Licht von der Sonne. Dann kommt Zucker raus für die Pflanze und Sauerstoff für uns. Steht in den Chloropasten oder so.",
    answer: "sus",
    explanation:
      'Vereinfachte Sprache, Rechtschreibfehler ("Chloropasten"), Vermutung ("oder so"), kindlich-direkter Erklärungsstil — spricht klar für SuS, vermutlich Mittelstufe.',
  },
];

export default function SusOrAiQuiz() {
  return (
    <QuizEngine
      eyebrow="Modul II · Tool"
      title="SuS oder KI?"
      intro="Sechs Beispieltexte. Tipp jeweils: Schüler:in oder KI? Und sieh dir an, woran du es erkennen kannst – und wo selbst gute Marker nur Hinweise bleiben."
      itemNoun="Text"
      itemVariant="passage"
      resultTitle="Quiz beendet"
      choices={CHOICES}
      items={ITEMS}
      renderAnswer={(item) => (
        <>
          Es war <span className="uppercase">{item.answer === "sus" ? "ein SuS-Text" : "ein KI-Text"}</span>.
        </>
      )}
      resultMessage={(score, total) => {
        const pct = Math.round((score / total) * 100);
        if (pct === 100) return "Beeindruckend — du hast ein sehr gutes Auge dafür.";
        if (pct >= 67) return "Solide. Du erkennst die wichtigsten Marker.";
        return "Genau das ist der Punkt: Es ist schwerer, als es aussieht. Und wenn erfahrene Lehrkräfte schon raten — was sollen kommerzielle Detektoren zuverlässig erkennen?";
      }}
    />
  );
}
