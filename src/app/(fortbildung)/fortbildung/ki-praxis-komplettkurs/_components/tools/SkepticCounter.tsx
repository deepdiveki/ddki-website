"use client";

import { useState } from "react";
import { ChevronRight, MessageSquare } from "lucide-react";
import ToolShell from "./ToolShell";

const OBJECTIONS = [
  {
    key: "denken",
    objection: '"SuS lernen mit KI nicht mehr selbst zu denken."',
    counter: "Das stimmt — wenn wir Aufgaben unverändert lassen. Genau deshalb gestalten wir Aufgaben so um, dass sie Reflexion und eigenständiges Denken einfordern (Modul II, 5 Grundsätze). KI wird zum Anlass für mehr Reflexion, nicht weniger.",
    arguments: [
      "Reverse Engineering: Jede Aufgabe vor dem Stellen einmal in ChatGPT testen — wo wird's KI-vulnerabel?",
      "Prozessorientierung statt Endprodukt-Fokus",
      "Persönlicher Bezug + lokaler Kontext = automatisch KI-resistenter",
    ],
  },
  {
    key: "datenschutz",
    objection: '"Datenschutz erlaubt das doch alles nicht."',
    counter: "DSGVO-konform geht es — wenn wir es richtig machen. Anonymisierung als Grundregel. Spezialisierte Schul-Tools (Fobizz, fragFINN, schulKI) für sensible Anwendungen. Klare Richtlinien im Kollegium.",
    arguments: [
      "Keine personenbezogenen Daten in KI eingeben — immer anonymisieren",
      "Schul-Tools wie Fobizz erfüllen DSGVO-Standards",
      "Datenschutzbeauftragte:n früh einbeziehen, nicht erst nach dem Vorfall",
    ],
  },
  {
    key: "klausuren",
    objection: '"Unsere Klausuren werden wertlos."',
    counter: "Klassische Klausuren ja. Aber wir können Aufgaben anders gestalten — KI-resistent, mit den 5 Grundsätzen aus Modul II. Plus: alternative Prüfungsformate (Portfolio, mündlich, Open-Book).",
    arguments: [
      "Aufgabenformate anpassen statt Schreiben verbieten",
      "Mündliche Komponenten: SuS müssen ihre Arbeit erklären können",
      "Open-Book mit KI als legitime Variante — dann muss KI-Integration mitbewertet werden",
    ],
  },
  {
    key: "zeit",
    objection: '"Ich habe keine Zeit, mich einzuarbeiten."',
    counter: "Anfangsinvestition lohnt sich. Mit nur 2 Stunden Einarbeitung sparst du langfristig viele Stunden pro Woche. Starte mit kleinen Hebeln (E-Mail-Generator, Differenzierung). Skaliere wenn du sicher bist.",
    arguments: [
      "Einstieg über kleine konkrete Anwendungen (Eltern-E-Mail, Stundeneinstieg)",
      "10 Min/Woche Podcast hören = 8 Std/Jahr Weiterbildung",
      "Schul-interner Austausch (Prompt-Library, Kollegiums-Stammtisch) potenziert das Lernen",
    ],
  },
  {
    key: "ueberlegen",
    objection: '"Die SuS sind technisch sowieso schon überlegen."',
    counter: "Bedienen können viele — aber didaktisch und reflexiv anwenden wenige. Genau hier liegt deine Stärke als Lehrkraft. Du musst nicht Tool-Profi sein, du musst pädagogisch führen.",
    arguments: [
      'SuS "prompten" oft naiv — kein Bewusstsein für Halluzinationen, Bias, Datenschutz',
      "Lehrkraft = didaktische Führung, nicht technische Konkurrenz",
      "Co-Konstruktion mit SuS: gemeinsam Prompts entwickeln, Outputs reflektieren",
    ],
  },
];

export default function SkepticCounter() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = OBJECTIONS.find((o) => o.key === selectedKey);

  return (
    <ToolShell title="Skeptiker-Einwand-Konter" description="Fünf typische Einwände im Kollegium. Klick auf einen — und du bekommst eine konstruktive Antwort plus Argumente für die Diskussion.">
      <div className="flex flex-col gap-2">
        {OBJECTIONS.map((o) => {
          const isSelected = selectedKey === o.key;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => setSelectedKey(isSelected ? null : o.key)}
              className={`flex items-start justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition ${
                isSelected ? "border-purple bg-purple-light-5" : "border-border-secondary bg-white hover:border-purple"
              }`}
            >
              <p className="text-sm font-semibold text-text-primary">{o.objection}</p>
              <ChevronRight className={`h-5 w-5 shrink-0 text-text-tertiary transition-transform ${isSelected ? "rotate-90" : ""}`} />
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 rounded-2xl border-2 border-purple bg-purple-light-5 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-white">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-dark">Konstruktive Antwort</p>
              <p className="mt-2 text-sm leading-relaxed text-text-primary">{selected.counter}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-text-primary">Argumente für die Diskussion</p>
            <ul className="mt-2 space-y-2">
              {selected.arguments.map((a) => (
                <li key={a} className="flex items-start gap-2 rounded-lg bg-white p-3 text-sm text-text-primary">
                  <span className="text-purple">•</span> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
