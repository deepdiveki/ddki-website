import { Metadata } from "next";
import MentoringScenarioPage, { type ScenarioContent } from "@/components/MentoringScenarioPage";

export const metadata: Metadata = {
  title: "Szenario Marc | DeepDiveKI",
  description:
    "Training im Mentoring Simulator: Nachbesprechung einer Englischlektion mit Marc.",
};

const scenario: ScenarioContent = {
  title: "Szenario Marc",
  subtitle: "Mentoring Simulator",
  studentName: "Marc",
  heroDescription:
    "Üben Sie die Nachbesprechung einer pragmatischen Englischlektion mit Fokus auf klare Zielsetzungen und Zeitmanagement.",
  image: "/images/cover/cover-05.jpg",
  hideLessonImage: true,
  lessonTitle: "Englischlektion \"Einführung going to-future\"",
  lessonSummary: [
    {
      label: "Klassenstufe",
      value: "8. Klasse",
    },
    {
      label: "Lernziel",
      value:
        "Die Schüler:innen können die going to-future Form verstehen und in einfachen Sätzen anwenden.",
    },
    {
      label: "Sozialform",
      value: "Frontalunterricht und Einzelarbeit",
    },
    {
      label: "Zeitrahmen",
      value: "45 Minuten",
    },
    {
      label: "Material",
      value: "Lehrbuch, drei Arbeitsblätter",
    },
    {
      label: "Setting",
      value: "Normales Klassenzimmer",
    },
  ],
  theoryBridge: [
    {
      title: "Interaktion & Aktivierung",
      description:
        "Kurzer aktivierender Einstieg (2–3 Min) spart Erklärzeit und erhöht die Beteiligung. Direkt umsetzbar ohne Zusatzmaterial.",
    },
    {
      title: "Content-Focused Coaching",
      description:
        "An Lernzielen ansetzen, kleine, fachliche Mikro-Schritte planen (z. B. 3-Min-Mündlichkeit), Wirkung im Blick behalten.",
    },
    {
      title: "Feedback strukturieren",
      description:
        "Hattie–Timperley: Wohin? Wie läuft es? Was nachher? – Kurz und praxisnah auf Aufgabe/Strategie/Selbstregulation beziehen.",
    },
    {
      title: "MERID-Gesprächsmuster",
      description:
        "Weniger direktiv, mehr ko-konstruktiv: einladen, gemeinsam elaborieren, kleine Alternativen abwägen (Kosten–Nutzen).",
    },
  ],
  classOverview: [
    {
      title: "Klassenstufe",
      description: "8. Klasse",
    },
    {
      title: "Lernziel",
      description:
        "Schüler:innen formulieren Future Plans in kurzen Dialogen.",
    },
    {
      title: "Sozialform",
      description: "Partnerarbeit nach Input.",
    },
    {
      title: "Zeitrahmen",
      description: "45 Minuten",
    },
    {
      title: "Material",
      description: "Dialogkarten, Vokabelliste, Timer.",
    },
    {
      title: "Setting",
      description: "Englischraum mit Beamer.",
    },
  ],
  plannedFlow: [
    {
      title: "Einstieg (10 Min)",
      description:
        "Aktivierende Wiederholung Simple Future, spielerischer Einstieg in going to-future über Bildkarten.",
      accent: "primary",
    },
    {
      title: "Erarbeitung (20 Min)",
      description:
        "Induktive Erarbeitung der Grammatikregel durch Beispiele, Partnerarbeit mit sprachlichen Übungen.",
      accent: "primary",
    },
    {
      title: "Anwendung (15 Min)",
      description:
        "Kommunikative Übungen in Gruppen, kreative Anwendung der neuen Struktur.",
      accent: "primary",
    },
  ],
  actualFlow: [
    {
      title: "Einstieg (5 Min)",
      description:
        "Knappe Erklärung: \"Heute lernt ihr going to-future\". Vokabeln werden kurz an die Tafel geschrieben.",
      accent: "muted",
    },
    {
      title: "Grammatikerklärung (10 Min)",
      description:
        "Frontale Erklärung der Regel, wenig Interaktion, SuS schreiben passiv mit.",
      accent: "muted",
    },
    {
      title: "Arbeitsphase (25 Min)",
      description:
        "Drei Arbeitsblätter nacheinander, ausschließlich schriftliche Einzelarbeit, kaum Unterstützung.",
      accent: "muted",
    },
    {
      title: "Abschluss (5 Min)",
      description:
        "Hausaufgaben verkünden, keine Reflexion oder Zusammenfassung der Lerninhalte.",
      accent: "muted",
    },
  ],
  issues: [
    "Einführung zu knapp und oberflächlich gestaltet.",
    "Keine aktivierenden Elemente für die Schüler:innen.",
    "Kaum mündliche Interaktion in der Fremdsprache.",
    "Ausschließlich schriftliche Einzelarbeit ohne Abwechslung.",
    "Wenig individuelle Lernbegleitung während der Arbeitszeit.",
    "Fokus auf Abarbeiten von Material statt aktivem Lernen.",
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
            "Alter: 40 Jahre",
            "Status: Quereinsteiger, Sek I",
            "Familie: Verheiratet, zwei Kinder",
            "Vorberuf: Kaufmännischer Angestellter",
            "Studium: Berufsbegleitend",
          ],
        },
        {
          title: "Lebenssituation",
          items: [
            "Hohe Arbeitsbelastung durch Dreifachrolle",
            "Zeitmanagement ist oberste Priorität",
            "Pragmatische Herangehensweise",
            "Erfahrung aus der Berufswelt",
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
          title: "",
          items: [
            "Sucht nach konkreten, zeiteffizienten Lösungen (\"Rezepten\")",
            "Begründet Entscheidungen oft mit Zeitmangel",
            "Skeptisch gegenüber Theorie ohne direkten Praxisbezug",
            "Schwer zu tiefergehender Reflexion zu bewegen",
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
            "Ort: Ruhiger Sitzplatz im Lehrerzimmer",
            "Atmosphäre: Sachlich, zeitlich begrenzt",
            "Stimmung: Pragmatisch, lösungsorientiert",
            "Zeitpunkt: Nach der Englischstunde",
          ],
        },
        {
          title: "Fokus des Gesprächs",
          items: [
            "Nachbesprechung der Englischlektion zu \"going to-future\"",
            "Balance zwischen Effizienz und didaktischer Qualität",
            "Entwicklung praxistauglicher Verbesserungsvorschläge",
          ],
        },
      ],
    },
    {
      title: "Zu erwartende Herausforderungen",
      layout: "two-column",
      columns: [
        {
          title: "Hauptherausforderung: \"Suche nach Kochrezepten\"",
          items: [
            "Markus sucht nach schnellen, konkreten Lösungen und \"Rezepten\". Er fokussiert auf praktische Tipps, ohne sich tiefergehend mit didaktischen Prinzipien auseinanderzusetzen.",
          ],
        },
        {
          title: "Gesprächsverhalten",
          items: [
            "Fokus auf praktische Umsetzbarkeit",
            "Häufige Verweise auf Zeitknappheit",
            "Widerstand gegen theoretische Aspekte",
            "Sucht nach \"einfachen\" Lösungen",
          ],
          bullet: true,
        },
        {
          title: "Vermeidungsstrategien",
          items: [
            "Argumentiert mit Zeitdruck",
            "Oberflächliche Zustimmung",
            "Fokus auf Symptome statt Ursachen",
            "Ausweichen bei tieferen Fragen",
          ],
          bullet: true,
        },
      ],
    },
    {
      title: "Vorgeschlagene Gesprächstechniken",
      body: [
        "Schlüsselstrategie: Praxisbezug herstellen",
        "Zeigen Sie konkrete Vorteile und Zeitersparnisse auf. Verbinden Sie didaktische Prinzipien mit praktischen Beispielen, die Markus sofort umsetzen kann.",
        "Beispiel: \"Wenn Sie 5 Minuten in eine aktivierende Einführung investieren, sparen Sie 15 Minuten bei der Erklärung.\"",
      ],
    },
    {
      title: "Effektive Fragetechniken",
      body: [
        "\"Was würde passieren, wenn Sie nur 2 Minuten mehr für den Einstieg investieren?\"",
        "\"Wie viel Zeit haben Sie mit den drei Arbeitsblättern tatsächlich gespart?\"",
        "\"Was denken Sie, warum die Schüler so wenig mitgemacht haben?\"",
        "\"Welche Methode würde Ihnen helfen, Zeit zu sparen UND bessere Ergebnisse zu erzielen?\"",
        "\"Stellen Sie sich vor, die Schüler wären aktiver gewesen...\"",
      ],
    },
    {
      title: "Gesprächsablauf",
      body: [
        "1. Anerkennung (3 Min)",
        "Würdigen Sie die pragmatische Herangehensweise",
        "2. Kosten-Nutzen-Analyse",
        "Zeitinvestition vs. Lernerfolg thematisieren",
        "3. Konkrete Alternativen",
        "Praxistaugliche Methoden vorschlagen",
        "4. Kleine Schritte",
        "Eine umsetzbare Veränderung für nächste Stunde",
        "5. Erfolg messbar machen",
        "Konkrete Erfolgsindikatoren definieren",
      ],
    },
    {
      title: "Meta-Ebene & Überzeugungen",
      body: [
        "Wann wechseln? Wenn Markus pauschal auf Zeit verweist oder rein auf Rezepte fokussiert, kurz innehalten und den Rahmen klären.",
        "Beispiel-Prompts: \"Wollen wir 2 Minuten klären, was Ihnen an der Stunde wichtig ist (Lernertrag/Zeiteffizienz)?\", \"Welche 1 Sache soll nächste Stunde spürbar besser sein?\"",
        "Ziel: Gemeinsames Verständnis von Qualität vs. Aufwand, um kleine, wirksame Schritte auszuhandeln.",
      ],
    },
    {
      title: "Wendepunkte erkennen",
      layout: "two-column",
      columns: [
        {
          title: "Indikatoren",
          items: [
            "Nachfragen zu Aufwand–Nutzen",
            "Bereitschaft, 1 Mini-Schritt auszuprobieren",
            "Selbst benannte Erfolgskriterien",
          ],
          bullet: true,
        },
        {
          title: "Darauf reagieren",
          items: [
            "Alternative konkretisieren (Material, Zeitbedarf)",
            "Erfolg sichtbar machen (2–3 Indikatoren)",
            "Termin/Folgefrage setzen",
          ],
          bullet: true,
        },
      ],
    },
    {
      title: "Balance: Unterstützung & Herausforderung",
      layout: "two-column",
      columns: [
        {
          title: "Wertschätzung",
          items: [
            "\"Sie halten vieles am Laufen. Lassen Sie uns 1 Sache wählen, die wenig Zeit kostet und Wirkung zeigt.\"",
          ],
        },
        {
          title: "Herausforderung",
          items: [
            "\"Welche 3 Minuten könnten Sie für Mündlichkeit freimachen, ohne den Plan zu sprengen?\"",
          ],
        },
      ],
    },
    {
      title: "Follow-up & Erfolgskriterien",
      body: [
        "• Nächste Stunde: 1 Mini-Schritt (z. B. 3-Min-Aktivierung oder 3-Min-Mündlichkeit)",
        "• Erfolg messen: Anteil aktiver Beiträge, Anzahl mündlicher Sätze, beobachtete Interaktion",
        "• Kurztermin (5 Min) zur Rückmeldung einplanen",
      ],
    },
  ],
  literature: [
    {
      title: "Praxisorientierter Leitfaden für schwierige Situationen",
      description:
        "Beckmann, T., & Ehmke, T. (2021). Mentoring in schulischen Praxisphasen. Diese Quelle dient als praxisorientierter Leitfaden für Mentorinnen und Mentoren und ist daher direkt relevant. Sie behandelt allgemeine Aspekte der Lernbegleitung im Praktikum und widmet ein ganzes Kapitel schwierigen Situationen. Konkret werden Situationen besprochen, die im Umgang mit einer pragmatischen, rezept-suchenden Persona relevant sein können, wie z. B. das Geben von (negativem) Feedback, der Umgang mit Zeitmangel und vor allem die Problematik unterschiedlicher Erwartungen an Gesprächsschwerpunkte zwischen Mentoratsperson und angehender Lehrkraft. Die Quelle liefert Reflexionsfragen und mögliche Herangehensweisen für solche Situationen, was der Mentoratsperson hilft, konkrete Strategien für das Gespräch mit Markus zu entwickeln.",
    },
    {
      title: "Gesprächsführung und Kommunikationsmuster",
      description:
        "Kreis, A. (2012). Produktive Unterrichtsbesprechungen. Diese Dissertation bietet eine tiefgehende empirische Analyse von Unterrichtsbesprechungen und identifiziert, welche Gesprächsmerkmale das Lernen angehender Lehrkräfte fördern. Sie diskutiert das MERID-Modell, das Gesprächsstile von Mentorinnen und Mentoren (direktiv vs. nicht-direktiv) und deren Rollen charakterisiert. Der Befund, dass direktives Handeln (\"Imperator\") häufig dominiert, aber weniger direktive, ko-konstruktive Interaktionsmuster (\"Initiator\", \"Ermutiger\") stärker mit Lernen assoziiert sind, ist zentral für das Gespräch mit Markus. Die Quelle analysiert spezifische Gesprächshandlungen wie Einladen (\"eliciting\") und Informieren (\"inform\") und wie Ratschläge formuliert werden (indirekt vs. direkt). Dies hilft der Mentoratsperson zu verstehen, warum ein reines Geben von Tipps möglicherweise nicht zu tiefem Lernen führt und welche kommunikativen Strategien (z. B. Einladen, ko-konstruktive Elaboration, hypothetische Optimierung) effektiver sind, um die Reflexion von Markus anzuregen.",
    },
    {
      title: "Ko-konstruktives Coaching als Alternative",
      description:
        "Kreis, A. & Staub, F. C. (2011). Fachspezifisches Unterrichtscoaching im Praktikum. Diese Quelle stellt das Fachspezifisch-Pädagogische Coaching (Content-Focused Coaching) vor, ein Modell zur ko-konstruktiven Förderung unterrichtsrelevanten Lernens. Das Modell basiert auf konstruktivistischen Lernauffassungen und betont die Wichtigkeit der Interaktion in authentischen Situationen. Es unterscheidet sich von Ansätzen, die nur auf Problembewältigung abzielen, indem es die Optimierung der Lernumgebung für die Schülerinnen und Schüler in den Fokus stellt. Der Ansatz plädiert für eine dialogische und ko-konstruktive Interaktion und hebt die grössere Bedeutung der Vorbesprechung gegenüber der Nachbesprechung hervor, da hier handlungswirksame Veränderungen direkt am Plan möglich sind. Für die Mentoratsperson im Gespräch mit Markus bietet diese Quelle einen alternativen konzeptuellen Rahmen zum reinen \"Tipps-Geben\". Sie zeigt auf, wie durch strukturierte Gespräche, die sich an theoretischen Werkzeugen wie Kernaspekten der Unterrichtsplanung orientieren, eine an der Sache orientierte Reflexion angeregt und über unmittelbare Probleme hinausgegangen werden kann.",
    },
    {
      title: "Individuelles Lernen und Feedback-Strategien",
      description:
        "Staub, F. Praktiken professioneller Lehrpersonen (E-Book). Diese Kapitel des E-Books befassen sich mit dem individuellen Lernen und dessen Unterstützung. Sie greifen die Tendenz angehender Lehrpersonen auf, zunächst \"Anleitungen möglichst bald in routiniertes Handeln überführen\" zu wollen und zu erfahren, \"wie man es macht\", was genau der Haltung von Markus entspricht. Die Quelle betont jedoch, dass \"Erfahrungen machen\" mehr ist als blosses Handeln; es geht darum, \"über das Handeln nachzudenken, es zu analysieren\". Sie bietet konkrete Praktiken zur Unterstützung individueller Lernprozesse und Strategien für das Geben von Feedback, das über einfache Korrekturen hinausgeht. Insbesondere wird das Hattie-Timperley-Modell vorgestellt, das Feedback auf verschiedenen Ebenen (Aufgabe, Strategie, Selbstregulierung) und Phasen (Wohin? Wie läuft es? Was nachher?) strukturiert. Dies liefert der Mentoratsperson praktische Werkzeuge und Frameworks, um Markus gezielt zu Reflexion und strategischem Denken anzuregen, indem sie Feedback und Fragen auf konkrete Situationen und Lernprozesse bezieht.",
    },
  ],
  chatIntro:
    "Starten Sie das Nachgespräch zu Marcs Englischlektion. Vereinbaren Sie konkrete Verbesserungen.",
  chatGoal: "Führen Sie das Nachbesprechungsgespräch zur Englischlektion.",
  chatMessages: [
  ],
  chatPersona:
    "Du bist Marc, ein pragmatischer, zeiteffizienter Student im Praktikum. Du suchst nach schnellen, konkreten Lösungen und reagierst kritisch auf theoretische Aspekte ohne Praxisbezug. Du betonst Zeitknappheit, bist aber höflich und lösungsorientiert.",
  chatContext:
    "Kontext: Nachbesprechung einer Englischlektion zur Einführung von going to-future. Probleme: sehr kurzer Einstieg, frontale Grammatikerklärung, fast nur schriftliche Einzelarbeit, wenig Interaktion. Ziel ist es, pragmatische Verbesserungen zu vereinbaren.",
};

export default function ScenarioMarcPage() {
  return <MentoringScenarioPage scenario={scenario} />;
}
