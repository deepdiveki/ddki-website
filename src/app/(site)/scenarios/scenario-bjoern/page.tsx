import { Metadata } from "next";
import MentoringScenarioPage, { type ScenarioContent } from "@/components/MentoringScenarioPage";

export const metadata: Metadata = {
  title: "Szenario Björn | DeepDiveKI",
  description:
    "Training im Mentoring Simulator: Nachbesprechung einer Deutschlektion mit Björn.",
};

const scenario: ScenarioContent = {
  title: "Szenario Björn",
  subtitle: "Mentoring Simulator",
  studentName: "Björn",
  heroDescription:
    "Trainieren Sie die Nachbesprechung einer Deutschlektion mit Fokus auf kreatives Schreiben und einer zurückhaltenden Studentin.",
  image: "/images/cover/cover-04.jpg",
  hideLessonImage: true,
  lessonTitle: "Deutschlektion \"Kreatives Schreiben zu Bildimpulsen\"",
  lessonSummary: [
    {
      label: "Klassenstufe",
      value: "5. Klasse",
    },
    {
      label: "Lernziel",
      value:
        "Die Schüler:innen können zu einem Bildimpuls eine kreative Kurzgeschichte mit Einleitung, Hauptteil und Schluss verfassen",
    },
    {
      label: "Sozialform",
      value: "Einzelarbeit nach gemeinsamem Einstieg",
    },
    {
      label: "Zeitrahmen",
      value: "60 Minuten",
    },
    {
      label: "Material",
      value:
        "Bildkarten mit unterschiedlichen Szenen, Arbeitsblatt mit Schreibstruktur",
    },
    {
      label: "Setting",
      value: "Normales Klassenzimmer",
    },
  ],
  classOverview: [
    {
      title: "Klassenstufe",
      description: "5. Klasse",
    },
    {
      title: "Lernziel",
      description:
        "Die Schüler:innen verfassen eine Kurzgeschichte mit Einleitung, Hauptteil und Schluss.",
    },
    {
      title: "Sozialform",
      description: "Einzelarbeit nach gemeinsamem Einstieg.",
    },
    {
      title: "Zeitrahmen",
      description: "60 Minuten",
    },
    {
      title: "Material",
      description: "Bildkarten, Schreibstruktur, Arbeitsblatt.",
    },
    {
      title: "Setting",
      description: "Reguläres Klassenzimmer.",
    },
  ],
  plannedFlow: [
    {
      title: "Einstieg (10 Min)",
      description:
        "Präsentation der Bildkarten, Erklärung des Arbeitsauftrags, Kriterien für gelungene Geschichten besprechen",
      accent: "primary",
    },
    {
      title: "Arbeitsphase (40 Min)",
      description:
        "Selbstständiges Verfassen der Geschichten, individuelle Betreuung und Hilfestellung durch die Lehrperson",
      accent: "primary",
    },
    {
      title: "Abschluss (10 Min)",
      description:
        "Vorlesen ausgewählter Geschichten, konstruktives Feedback, Würdigung der Leistungen",
      accent: "primary",
    },
  ],
  actualFlow: [
    {
      title: "Einstieg (10 Min)",
      description:
        "Björn präsentiert kurz die Bildkarten und erklärt knapp: \"Sucht euch ein Bild aus und schreibt dazu eine Geschichte.\" Keine Beispiele oder Kriterien",
      accent: "muted",
    },
    {
      title: "Arbeitsphase (40 Min)",
      description:
        "Björn korrigiert Hefte am Lehrertisch. 5–6 Kinder unterhalten sich und zeichnen statt zu schreiben. Knappe, abweisende Antworten auf Fragen. Nach 20 Min haben die Hälfte kaum etwas geschrieben",
      accent: "muted",
    },
    {
      title: "Abschluss (10 Min)",
      description:
        "Abruptes Ende. Nur zwei leistungsstarke Kinder lesen vor. Kein Feedback außer \"Danke\". Hausaufgabe für Unfertige",
      accent: "muted",
    },
  ],
  issues: [
    "Fehlende klare Kriterien und Struktur für die Schreibaufgabe",
    "Keine differenzierten Hilfestellungen für verschiedene Leistungsniveaus",
    "Mangelnde Begleitung und Präsenz während der Arbeitsphase",
    "Ignorieren von Störungen und Untätigkeit mehrerer Schüler:innen",
    "Kein konstruktives Feedback zu den vorgelesenen Texten",
    "Oberflächlicher Abschluss ohne Reflexion oder Würdigung",
  ],
  studentProfile: [
    {
      title: "Rolle",
      description:
        "Studentin im Praktikum, erste eigenständige Unterrichtserfahrung.",
    },
    {
      title: "Auftreten",
      description: "Ruhig, sachlich, wirkt unsicher bei Rückfragen.",
    },
    {
      title: "Stärken",
      description: "Gute Vorbereitung der Materialien, strukturierter Plan.",
    },
    {
      title: "Herausforderungen",
      description:
        "Zu wenig Interaktion im Raum, unsicher bei Störungen und Feedback.",
    },
  ],
  studentSignals: [
    {
      title: "Im Unterricht",
      description:
        "Bleibt am Pult, reagiert knapp, greift Störungen nicht auf.",
    },
    {
      title: "Im Gespräch",
      description:
        "Antwortet kurz, benötigt klare, konkrete Rückmeldungen.",
    },
  ],
  studentDetails: [
    {
      layout: "two-column",
      columns: [
        {
          title: "Grunddaten",
          items: [
            "Alter: 22 Jahre",
            "Studium: PH, 3. Semester",
            "Nebenjob: Admin in Reisebüro",
            "Wohnsituation: Bei den Eltern",
            "Familienstand: Ledig",
          ],
        },
        {
          title: "Lebensstil",
          items: [
            "Lässt sich viele Optionen offen, unverbindlich",
            "Hat sich eine \"Schutzschicht\" zugelegt",
            "Ohne längerfristige Perspektiven",
            "Oft gestresst, wenig soziale Kontakte",
          ],
          bullet: true,
        },
      ],
    },
    {
      title: "Einstellung zum Lehrberuf",
      layout: "single",
      columns: [
        {
          items: [
            "Kein \"Feuer\" oder tiefe innere Überzeugung für den Beruf",
            "Berufsziel ist nicht klar - Hauptsache einen Abschluss haben",
            "Nimmt das eigene Heft nicht selbst in die Hand",
            "Lässt sich von den Umständen treiben",
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
            "Kurze, minimale Antworten",
            "Mimik kaum lesbar, teilnahmslose Stimme",
            "Keine Nachfragen",
            "Rückmeldungen werden abgenickt",
          ],
          bullet: true,
        },
        {
          title: "Arbeitsweise",
          items: [
            "Schreibt fast nichts auf",
            "Wirkt desinteressiert",
            "Löst Gefühl der Unwirksamkeit aus",
            "Verwendet unverbindliche Formulierungen",
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
            "Ort: Leeres Klassenzimmer, ungestört",
            "Atmosphäre: Eher beiläufig, nicht zu formell",
            "Stimmung: Verhalten, abwartend",
            "Zeitpunkt: Einige Tage nach der Deutschstunde",
          ],
        },
        {
          title: "Fokus des Gesprächs",
          items: [
            "Nachbesprechung der Deutschlektion zu \"Kreatives Schreiben\"",
            "Reflexion über Engagement und Motivation",
            "Erarbeiten von Strategien für mehr Präsenz",
          ],
        },
      ],
    },
    {
      title: "Zu erwartende Herausforderungen",
      layout: "single",
      columns: [
        {
          title: "Hauptherausforderung: \"Teflon-Verhalten\"",
          items: [
            "Björn zeigt ein abweisendes Verhalten, bei dem Kritik, Feedback und Ratschläge an ihm \"abperlen\". Er signalisiert oberflächlich Zustimmung, ohne sich wirklich auf eine tiefergehende Auseinandersetzung einzulassen.",
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
            "Einsilbige Antworten (\"Ja\", \"Nein\", \"Weiss nicht\")",
            "Blickkontakt wird vermieden",
            "Keine Eigeninitiative im Gespräch",
            "Emotionale Distanz, unbeteiligt",
          ],
          bullet: true,
        },
        {
          title: "Vermeidungsstrategien",
          items: [
            "Zustimmen ohne Nachfrage (\"Ja, mach ich\")",
            "Passivität, abwartende Haltung",
            "Fokus auf externe Faktoren (\"schwierige Klasse\")",
            "Wechselt das Thema, wenn es konkret wird",
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
            "Schlüsselstrategie: Beziehungsebene stärken",
            "Bauen Sie eine persönliche Verbindung auf. Zeigen Sie echtes Interesse an Björn als Person, nicht nur an seiner Leistung. Validieren Sie seine Gefühle und schaffen Sie eine sichere Atmosphäre.",
            "Beispiel: \"Ich habe das Gefühl, dass dich das Praktikum gerade sehr fordert. Wie geht es dir denn damit?\"",
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
            "\"Was war für dich in dieser Stunde die grösste Herausforderung?\"",
            "\"Wenn du die Stunde nochmals halten könntest, was würdest du genau gleich machen?\"",
            "\"Was würde dir helfen, mit den Störungen besser umzugehen?\"",
            "\"Woran würdest du merken, dass die nächste Stunde besser gelaufen ist?\"",
            "\"Was brauchst du von mir, damit du dich sicherer fühlst?\"",
          ],
          bullet: true,
        },
        {
          title: "Gesprächsablauf",
          items: [
            "1. Vertrauen aufbauen (5 Min)",
            "Persönliches Interesse zeigen, nicht sofort zum Thema",
            "2. Beobachtung teilen",
            "Eigene Wahrnehmung schildern (Ich-Botschaften)",
            "3. Offene Fragen stellen",
            "Björn zur Reflexion einladen, ohne Lösungen vorzugeben",
            "4. Gemeinsam Ideen entwickeln",
            "Hypothetische Szenarien durchspielen (\"Was wäre, wenn...\")",
            "5. Konkrete Vereinbarung",
            "Einen kleinen, umsetzbaren Schritt für die Zukunft festhalten",
          ],
        },
      ],
    },
  ],
  literature: [
    {
      title: "Emotionale Aspekte und Beziehungsaufbau im Mentoring",
      description:
        "Hascher, T. (2005). Emotionale Aspekte des schulischen Lernens. Diese Quelle liefert der Mentoratsperson entscheidende Einblicke, um das \"Teflon\"-Verhalten von Nina besser zu verstehen. Sie unterscheidet zwischen oberflächlicher und tiefergehender Reflexion und zeigt auf, dass für Letztere eine vertrauensvolle Beziehung und die Bereitschaft zur Auseinandersetzung mit eigenen Emotionen und Überzeugungen notwendig sind. Sie warnt davor, dass ein zu stark direktives Vorgehen der Mentoratsperson die studentische Reflexion hemmen kann, was im Fall von Nina kontraproduktiv wäre. Stattdessen wird die Bedeutung von 'relatedness' (Beziehungs- und Vertrauensaufbau) und 'autonomy' (Wahrung der Autonomie der lernenden Person) betont. Dies ist für das Gespräch mit Nina zentral: Es geht weniger darum, fertige Lösungen zu präsentieren, sondern darum, durch gezielte, offene Fragen und das Anbieten von Perspektiven einen Raum zu schaffen, in dem Nina sich öffnen und selbst reflektieren kann. Die Quelle sensibilisiert dafür, dass Ninas Verhalten ein Schutzmechanismus sein könnte und nicht zwingend Desinteresse bedeutet.",
    },
    {
      title: "Reflexion, Emotion und persönliche Voraussetzungen",
      description:
        "Hascher, T., & Neuweg, G. H. (2012). Forschung und Entwicklung zur Wirksamkeit der Praktika in der LehrerInnenbildung. Diese Quelle untermauert die Bedeutung der emotionalen und motivationalen Aspekte für das Lernen im Praktikum. Sie verdeutlicht, dass die Effektivität von Praktika stark von den persönlichen Voraussetzungen der Studierenden (wie Selbstwirksamkeit und Motivation) und der Qualität der Betreuung abhängt. Der Artikel hebt hervor, dass Reflexion nicht nur ein kognitiver, sondern auch ein emotionaler Prozess ist. Dies ist für das Gespräch mit Nina hochrelevant, da ihr \"Teflon\"-Verhalten auf emotionale Barrieren wie Unsicherheit oder mangelnde Identifikation mit dem Beruf hindeuten könnte. Die Quelle bestärkt die Mentoratsperson darin, nicht nur auf der Sachebene zu argumentieren, sondern gezielt die emotionale Ebene anzusprechen. Sie legt nahe, dass eine Verbesserung von Ninas Unterrichtshandeln erst möglich wird, wenn auch ihre persönliche Einstellung und ihre emotionalen Bedürfnisse thematisiert und ernst genommen werden. Der Hinweis, dass \"gute Praktikumslehrpersonen ... durch verständnisvolle, unterstützende Kommunikation und die Gewährung von Autonomie zum Aufbau einer positiven Beziehung beitragen\", liefert eine direkte Handlungsanleitung für die Mentoratsperson.",
    },
    {
      title: "Individuelles Lernen und Feedback-Strategien",
      description:
        "Staub, F. Praktiken professioneller Lehrpersonen (E-Book). Diese Kapitel des E-Books befassen sich mit dem individuellen Lernen und dessen Unterstützung. Sie greifen die Tendenz angehender Lehrpersonen auf, zunächst \"Anleitungen möglichst bald in routiniertes Handeln überführen\" zu wollen und zu erfahren, \"wie man es macht\", was genau der Haltung von Markus entspricht. Die Quelle betont jedoch, dass \"Erfahrungen machen\" mehr ist als blosses Handeln; es geht darum, \"über das Handeln nachzudenken, es zu analysieren\". Sie bietet konkrete Praktiken zur Unterstützung individueller Lernprozesse und Strategien für das Geben von Feedback, das über einfache Korrekturen hinausgeht. Insbesondere wird das Hattie-Timperley-Modell vorgestellt, das Feedback auf verschiedenen Ebenen (Aufgabe, Strategie, Selbstregulierung) und Phasen (Wohin? Wie läuft es? Was nachher?) strukturiert. Dies liefert der Mentoratsperson praktische Werkzeuge und Frameworks, um Nina gezielt zu Reflexion und strategischem Denken anzuregen, indem sie Feedback und Fragen auf konkrete Situationen und Lernprozesse bezieht.",
    },
  ],
  chatIntro:
    "Starten Sie das Nachbesprechungsgespräch mit Björn. Ziel ist es, konkrete Verbesserungen zu vereinbaren.",
  chatGoal: "Führen Sie das Nachbesprechungsgespräch zur Deutschlektion.",
  chatMessages: [
  ],
  chatPersona:
    "Du bist Björn, Student im Praktikum. Du wirkst zurückhaltend, gibst kurze Antworten, vermeidest Blickkontakt und sagst oft nur das Nötigste. Du bist schnell überfordert und reagierst eher abwehrend auf Kritik. Wenn gefragt, antwortest du knapp, manchmal ausweichend, aber nicht unhöflich.",
  chatContext:
    "Kontext: Nachbesprechung einer Deutschlektion zu kreativem Schreiben mit Bildimpulsen. Probleme: fehlende Kriterien, wenig Präsenz im Raum, Störungen nicht aufgegriffen, kaum Feedback. Ziel ist Reflexion und konkrete, kleine Verbesserungen.",
};

export default function ScenarioBjoernPage() {
  return <MentoringScenarioPage scenario={scenario} />;
}
