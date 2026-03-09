import { Metadata } from "next";
import MentoringScenarioPage, { type ScenarioContent } from "@/components/MentoringScenarioPage";

export const metadata: Metadata = {
  title: "Szenario Antonia | DeepDiveKI",
  description:
    "Training im Mentoring Simulator: Nachbesprechung einer Englischlektion mit Antonia.",
};

const scenario = {
  title: "Szenario Antonia",
  subtitle: "Mentoring Simulator",
  studentName: "Antonia Weber",
  heroDescription:
    "Trainieren Sie die Nachbesprechung einer Englischlektion in der 11. Klasse mit Fokus auf Aktivierung und Schüler:innen-Sprechzeit.",
  image: "/images/cover/cover-07.png",
  lessonTitle: "Englischlektion \"Debating: Social Media & Society\"",
  lessonSummary: [
    {
      label: "Klassenstufe",
      value: "11. Klasse",
    },
    {
      label: "Lernziel",
      value:
        "Schüler:innen können Argumente strukturieren und Redemittel in Diskussionen anwenden.",
    },
    {
      label: "Sozialform",
      value: "Input, Gruppenarbeit, Diskussion",
    },
    {
      label: "Zeitrahmen",
      value: "45 Minuten",
    },
    {
      label: "Material",
      value: "Kurztext, Redemittel-Karten, Arbeitsblatt",
    },
    {
      label: "Setting",
      value: "Englischzimmer",
    },
  ],
  classOverview: [
    {
      title: "Klassenstufe",
      description: "11. Klasse",
    },
    {
      title: "Lernziel",
      description:
        "Argumentieren, Redemittel nutzen, Diskussionen strukturieren.",
    },
    {
      title: "Sozialform",
      description: "Plenum und Gruppenarbeit.",
    },
    {
      title: "Zeitrahmen",
      description: "45 Minuten",
    },
    {
      title: "Material",
      description: "Kurztext, Redemittel, Arbeitsblatt.",
    },
    {
      title: "Setting",
      description: "Englischzimmer.",
    },
  ],
  plannedFlow: [
    {
      title: "Einstieg (5 Min)",
      description:
        "Warm-up Frage, Think-Pair-Share, kurze Sammlung der Meinungen.",
      accent: "primary",
    },
    {
      title: "Erarbeitung (20 Min)",
      description:
        "Kurztext auswerten, Redemittel sammeln, Rollen für die Debatte klären.",
      accent: "primary",
    },
    {
      title: "Anwendung (20 Min)",
      description:
        "Gruppen-Debatte mit Feedback, Abschluss mit Lernziel-Check.",
      accent: "primary",
    },
  ],
  actualFlow: [
    {
      title: "Einstieg (10 Min)",
      description:
        "Langer Rückblick und Beispiele durch Antonia, kaum Schüler:innenbeiträge.",
      accent: "muted",
    },
    {
      title: "Inputphase (25 Min)",
      description:
        "Ausführliche Erklärung der Argumentationsstruktur mit Folien, wenig Fragen.",
      accent: "muted",
    },
    {
      title: "Arbeitsphase (10 Min)",
      description:
        "Kurzes Arbeitsblatt, keine Debatte, Abschluss knapp und ohne Reflexion.",
      accent: "muted",
    },
  ],
  issues: [
    "Lehrerzentrierter Input dominiert die Stunde.",
    "Geringe Schüler:innen-Sprechzeit.",
    "Kooperative Phasen fallen aus.",
    "Redemittel werden nicht aktiv angewendet.",
    "Kaum Aktivierung und Transfer in die Diskussion.",
    "Feedback an Lernende fehlt.",
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
            "Alter: 24 Jahre",
            "Studium: Lehramt Sek II, Englisch",
            "Nebenjob: Sprachkurs-Tutorin",
            "Wohnsituation: Eigene Wohnung",
            "Familienstand: Ledig",
          ],
        },
        {
          title: "Lebensstil",
          items: [
            "Extrovertiert, kontaktfreudig",
            "Übernimmt gern die Gesprächsführung",
            "Viele Projekte und Engagement",
            "Braucht sichtbares Feedback",
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
            "Möchte inhaltlich stark auftreten",
            "Sichert Unterricht über ausführliche Erklärungen",
            "Sorge, dass Gruppenarbeit unruhig wird",
            "Will alle Inhalte abdecken, auch unter Zeitdruck",
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
            "Redegewandt, lange Antworten",
            "Viele Beispiele und Anekdoten",
            "Stellt Fragen, beantwortet sie oft selbst",
            "Wechselt schnell das Thema",
          ],
          bullet: true,
        },
        {
          title: "Arbeitsweise",
          items: [
            "Plant strukturierte Präsentationen",
            "Lässt wenig Zeit für Schüler:innenaktivität",
            "Reagiert spontan auf Zwischenrufe",
            "Setzt auf Kontrolle statt Delegation",
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
            "Ort: Englischzimmer, Sitzkreis",
            "Atmosphäre: Lebhaft, zeitlich begrenzt",
            "Stimmung: Motiviert, extrovertiert",
            "Zeitpunkt: Direkt nach der Stunde",
          ],
        },
        {
          title: "Fokus des Gesprächs",
          items: [
            "Nachbesprechung der Englischlektion zu Debating",
            "Aktivierung und Schüler:innen-Sprechzeit erhöhen",
            "Mehr Verantwortung an Lernende übergeben",
          ],
        },
      ],
    },
    {
      title: "Zu erwartende Herausforderungen",
      layout: "single",
      columns: [
        {
          title: "Hauptherausforderung: \"Lehrperson im Mittelpunkt\"",
          items: [
            "Antonia fühlt sich sicher, wenn sie viel erklärt. Dadurch bleiben Lernende passiv und die Aktivierung der Klasse zu gering.",
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
            "Redet viel und ausführlich",
            "Betont klare Führung und Struktur",
            "Verweist auf Prüfungsdruck",
            "Interpretiert Stille als Desinteresse",
          ],
          bullet: true,
        },
        {
          title: "Vermeidungsstrategien",
          items: [
            "Erklärt länger, statt Fragen zu öffnen",
            "Legt Fokus auf Inhalt statt Prozess",
            "Delegiert Aufgaben erst sehr spät",
            "Lenkt Kritik mit Erfolgsbeispielen um",
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
            "Schlüsselstrategie: Redeanteile sichtbar machen und Übergaben planen",
            "Arbeiten Sie mit klaren Zeitankern: 2 Minuten Input, dann Think-Pair-Share oder Gruppenauftrag. So bleibt Struktur erhalten und die Klasse spricht mehr.",
            "Beispiel: \"Nach jeder Folie geben Sie 90 Sekunden Austausch in Paaren, danach eine Stimme aus dem Raum.\"",
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
            "\"Wann hatten die Schüler:innen heute wirklich Sprechzeit?\"",
            "\"Welche Phase könnte mit einer Mini-Debatte starten?\"",
            "\"Was wäre ein 3-Minuten-Format für echte Anwendung?\"",
            "\"Wie viel Input braucht es wirklich, damit die Aufgabe gelingt?\"",
            "\"Woran merken wir, dass die Lernenden aktiv denken?\"",
          ],
          bullet: true,
        },
        {
          title: "Gesprächsablauf",
          items: [
            "1. Wahrnehmung spiegeln",
            "Redeanteile und Aktivität konkret benennen",
            "2. Ziel klären",
            "Schüler:innen-Sprechzeit als Schwerpunkt festlegen",
            "3. Mini-Formate planen",
            "Think-Pair-Share und kurze Debatten einbauen",
            "4. Zeitanker definieren",
            "Input und Aktivierung eng takten",
            "5. Erfolg prüfen",
            "Kurzfeedback der Klasse in der nächsten Stunde",
          ],
        },
      ],
    },
  ],
  literature: [
    {
      title: "Handreichung: Schüler:innenaktivierung im Fremdsprachenunterricht (intern)",
      description:
        "Zusammenfassung wirksamer Aktivierungsformate wie Think-Pair-Share, Mini-Debatte und Rollenarbeit. Fokus auf höherer Sprechzeit und selbstständiger Anwendung von Redemitteln.",
    },
    {
      title: "Praxisnotizen: Teacher Talk reduzieren",
      description:
        "Kurze Werkzeuge zur Steuerung der Lehrendenrede: Zeitanker, Wartezeit, offene Impulse. Ziel: mehr Lernendenbeiträge bei gleicher Struktur.",
    },
    {
      title: "Methodenkarten: Kooperative Gesprächsformate",
      description:
        "Praxisnahe Abläufe für Fishbowl, Pro-Con-Staffel und Partnerinterview. Unterstützt eine schülerzentrierte Diskussion ohne Kontrollverlust.",
    },
  ],
  chatIntro:
    "Starten Sie das Nachbesprechungsgespräch mit Antonia. Ziel ist mehr Aktivierung und Sprechzeit.",
  chatGoal: "Führen Sie das Nachbesprechungsgespräch zur Englischlektion.",
  chatMessages: [],
  chatPersona:
    "Du bist Antonia Weber, Studentin im Praktikum. Du bist extrovertiert, redegewandt und voller Energie. Du erklärst gern viel und führst das Gespräch, bist aber offen für konkrete Formate, wenn sie strukturiert bleiben.",
  chatContext:
    "Kontext: Nachbesprechung einer Englischlektion in der 11. Klasse (Debating). Probleme: sehr lehrerzentriert, geringe Schüler:innen-Sprechzeit, wenig kooperative Phasen. Ziel ist eine aktivere, schülerzentrierte Stunde mit klaren Zeitankern.",
} satisfies ScenarioContent;

export default function ScenarioAntoniaPage() {
  return <MentoringScenarioPage scenario={scenario} />;
}
