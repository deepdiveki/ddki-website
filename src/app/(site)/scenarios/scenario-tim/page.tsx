import { Metadata } from "next";
import MentoringScenarioPage, { type ScenarioContent } from "@/components/MentoringScenarioPage";

export const metadata: Metadata = {
  title: "Szenario Tim | DeepDiveKI",
  description:
    "Training im Mentoring Simulator: Nachbesprechung einer Sportlektion mit Tim.",
};

const scenario: ScenarioContent = {
  title: "Szenario Tim",
  subtitle: "Mentoring Simulator",
  studentName: "Tim Schubert",
  heroDescription:
    "Trainieren Sie die Nachbesprechung einer Sportlektion in der 12. Klasse mit Fokus auf Differenzierung und Belastungssteuerung.",
  image: "/images/cover/cover-06.png",
  lessonTitle: "Sportlektion \"Intervalltraining & Technikstationen\"",
  lessonSummary: [
    {
      label: "Klassenstufe",
      value: "12. Klasse",
    },
    {
      label: "Lernziel",
      value:
        "Schüler:innen steuern ihre Ausdauerbelastung und verbessern die Lauftechnik.",
    },
    {
      label: "Sozialform",
      value: "Stationenarbeit in Kleingruppen",
    },
    {
      label: "Zeitrahmen",
      value: "60 Minuten",
    },
    {
      label: "Material",
      value: "Markierungskegel, Stoppuhr, Hürden, Pulsbänder",
    },
    {
      label: "Setting",
      value: "Sporthalle und Laufbahn",
    },
  ],
  classOverview: [
    {
      title: "Klassenstufe",
      description: "12. Klasse",
    },
    {
      title: "Lernziel",
      description:
        "Belastung steuern, Ausdauer und Technik im Intervalltraining verbessern.",
    },
    {
      title: "Sozialform",
      description: "Stationenarbeit in Teams.",
    },
    {
      title: "Zeitrahmen",
      description: "60 Minuten",
    },
    {
      title: "Material",
      description: "Kegel, Stoppuhr, Hürden, Pulsbänder.",
    },
    {
      title: "Setting",
      description: "Sporthalle und Laufbahn.",
    },
  ],
  plannedFlow: [
    {
      title: "Einstieg (10 Min)",
      description:
        "Aktivierung und Mobilisation, Leistungsniveaus kurz klären, Stationen erklären.",
      accent: "primary",
    },
    {
      title: "Trainingszirkel (35 Min)",
      description:
        "Differenzierte Stationen mit Wahlstufen und Selbststeuerung über Puls.",
      accent: "primary",
    },
    {
      title: "Abschluss (15 Min)",
      description:
        "Cool-down, kurze Reflexion zur Belastung, individuelle Zielsetzung.",
      accent: "primary",
    },
  ],
  actualFlow: [
    {
      title: "Einstieg (10 Min)",
      description:
        "Standard-Warm-up für alle, keine Abfrage der Leistungsniveaus.",
      accent: "muted",
    },
    {
      title: "Trainingszirkel (40 Min)",
      description:
        "Alle Stationen mit gleicher Intensität. Leistungsstarke Schüler:innen sind unterfordert, schwächere überfordert. Wenig Coaching.",
      accent: "muted",
    },
    {
      title: "Abschluss (10 Min)",
      description:
        "Kurzes Abpfeifen, keine Reflexion, Pulsdaten werden nicht genutzt.",
      accent: "muted",
    },
  ],
  issues: [
    "Keine Differenzierung nach Leistungsniveaus.",
    "Über- und Unterforderung bleiben unbeachtet.",
    "Keine Wahlstufen oder alternativen Schwierigkeitsgrade.",
    "Wenig individuelles Feedback und Coaching.",
    "Reflexion zur Belastungssteuerung fehlt.",
    "Motivationsunterschiede werden nicht aufgefangen.",
  ],
  studentProfile: [],
  studentSignals: [],
  studentDetails: [
    {
      layout: "two-column",
      columns: [
        {
          title: "Grunddaten",
          items: [
            "Alter: 26 Jahre",
            "Studium: Lehramt Sek II, Sport",
            "Nebenjob: Fitnesstrainer",
            "Wohnsituation: WG",
            "Familienstand: Ledig",
          ],
        },
        {
          title: "Lebenssituation",
          items: [
            "Pragmatisch, klar strukturiert",
            "Hohe Leistungsorientierung",
            "Klare Erwartungen an den Ablauf",
            "Fokus auf Zeit und Effizienz",
          ],
          bullet: true,
        },
      ],
    },
    {
      title: "Einstellung zum Unterrichten",
      layout: "single",
      columns: [
        {
          items: [
            "Bevorzugt standardisierte Abläufe",
            "Sieht Differenzierung als Mehraufwand",
            "Will Leistung transparent und messbar machen",
            "Unsicher bei adaptiven Aufgabenstellungen",
          ],
          bullet: true,
        },
      ],
    },
    {
      title: "Typisches Verhalten",
      layout: "two-column",
      columns: [
        {
          title: "Kommunikation",
          items: [
            "Kurz und direkt",
            "Fragt nach konkreten Lösungen",
            "Fokussiert auf Ablauf und Zeit",
            "Bleibt sachlich, wenig Emotion",
          ],
          bullet: true,
        },
        {
          title: "Arbeitsweise",
          items: [
            "Strukturiert, checklistenorientiert",
            "Setzt auf einheitliche Übungen",
            "Gibt klare Anweisungen",
            "Beobachtet eher aus der Distanz",
          ],
          bullet: true,
        },
      ],
    },
  ],
  coachingFocus: [],
  coachingPrompts: [],
  coachingDetails: [
    {
      title: "Beschreibung der Gesprächssituation",
      layout: "two-column",
      columns: [
        {
          title: "Setting",
          items: [
            "Ort: Geräteraum an der Sporthalle",
            "Atmosphäre: Sachlich, zielorientiert",
            "Stimmung: Pragmatisch, klar",
            "Zeitpunkt: Direkt nach der Sportlektion",
          ],
        },
        {
          title: "Fokus des Gesprächs",
          items: [
            "Nachbesprechung der Sportlektion zu Intervalltraining",
            "Differenzierung nach Leistungsniveau",
            "Belastungssteuerung und Motivation",
          ],
        },
      ],
    },
    {
      title: "Zu erwartende Herausforderungen",
      layout: "single",
      columns: [
        {
          title: "Hauptherausforderung: \"Einheitsprogramm\"",
          items: [
            "Tim hält identische Aufgaben für fair und effizient. Dadurch bleiben Leistungsunterschiede und Sicherheitsaspekte im Training unberücksichtigt.",
          ],
        },
      ],
    },
    {
      title: "Gesprächsverhalten & Vermeidungsstrategien",
      layout: "two-column",
      columns: [
        {
          title: "Gesprächsverhalten",
          items: [
            "Fokus auf klare Abläufe",
            "Betont Fairness durch gleiche Aufgaben",
            "Sucht schnelle, umsetzbare Lösungen",
            "Bleibt sachlich und knapp",
          ],
          bullet: true,
        },
        {
          title: "Vermeidungsstrategien",
          items: [
            "Verweist auf Zeitdruck und Hallenbelegung",
            "Setzt Differenzierung mit Zusatzmaterial gleich",
            "Lenkt auf Leistungstests statt Lernen",
            "Wechselt das Thema bei Motivation",
          ],
          bullet: true,
        },
      ],
    },
    {
      title: "Vorgeschlagene Gesprächstechniken",
      layout: "single",
      columns: [
        {
          title: "Kernpunkte",
          items: [
            "Schlüsselstrategie: Differenzierung schlank gestalten",
            "Nutzen Sie Wahlstufen (Basis/Plus/Pro) und feste Belastungsanker (Puls, Wiederholungen), damit Tim Differenzierung ohne Mehraufwand umsetzen kann.",
            "Beispiel: \"Gleiche Station, drei Stufen: 60/70/80 Prozent Intensität. Ablauf bleibt gleich, Belastung passt.\"",
          ],
        },
      ],
    },
    {
      title: "Effektive Fragetechniken & Gesprächsablauf",
      layout: "two-column",
      columns: [
        {
          title: "Effektive Fragetechniken",
          items: [
            "\"Welche Station lässt sich ohne neues Material in drei Stufen anbieten?\"",
            "\"Wo haben Sie heute Über- oder Unterforderung gesehen?\"",
            "\"Was wäre ein 5-Minuten-Check für die Belastung?\"",
            "\"Woran merken die Schüler:innen selbst, ob die Intensität passt?\"",
            "\"Welche Differenzierung kostet Sie am wenigsten Zeit?\"",
          ],
          bullet: true,
        },
        {
          title: "Gesprächsablauf",
          items: [
            "1. Beobachtung spiegeln",
            "Über- und Unterforderung konkret benennen",
            "2. Ziel klären",
            "Sicherheit, Motivation und Leistungsausgleich festhalten",
            "3. Mini-Differenzierung planen",
            "Eine Station in drei Stufen definieren",
            "4. Belastungsanker festlegen",
            "Pulsbereiche oder Wiederholungen vereinbaren",
            "5. Erfolg prüfen",
            "Kurzer Check in der nächsten Stunde",
          ],
        },
      ],
    },
  ],
  literature: [
    {
      title: "Handreichung: Differenzierung im Sportunterricht (intern)",
      description:
        "Kurzleitfaden zu Wahlstufen, variabler Intensität und klaren Kriterien. Betont: gleiche Struktur, unterschiedliche Belastung. Hilft, Differenzierung ohne zusätzlichen Materialaufwand umzusetzen.",
    },
    {
      title: "Praxisnotizen: Belastungssteuerung mit Jugendlichen",
      description:
        "Zusammenfassung einfacher Steuerungsinstrumente (Pulsbereiche, Borg-Skala, 2-Minuten-Check). Fördert Selbstregulation und verhindert Überforderung.",
    },
    {
      title: "Checkliste: Sicherheit und Motivation in heterogenen Gruppen",
      description:
        "Fokus auf Fairness durch individuelle Zielbereiche statt identischer Aufgaben. Unterstützt die Balance aus Leistung, Sicherheit und Motivation.",
    },
  ],
  chatIntro:
    "Starten Sie das Nachbesprechungsgespräch mit Tim. Ziel ist eine schlanke Differenzierung.",
  chatGoal: "Führen Sie das Nachbesprechungsgespräch zur Sportlektion.",
  chatMessages: [],
  chatPersona:
    "Du bist Tim Schubert, Sportstudent im Praktikum. Du bist pragmatisch und klar, antwortest kurz und direkt. Du hältst gleiche Aufgaben für fair und effizient und willst konkrete, umsetzbare Lösungen. Bei guten Argumenten bist du offen.",
  chatContext:
    "Kontext: Nachbesprechung einer Sportlektion in der 12. Klasse (Intervalltraining). Probleme: keine Differenzierung, identische Intensität, Über- und Unterforderung, wenig Coaching. Ziel ist eine einfache, klar umsetzbare Differenzierung und Belastungssteuerung.",
};

export default function ScenarioTimPage() {
  return <MentoringScenarioPage scenario={scenario} />;
}
