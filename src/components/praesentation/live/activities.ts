/**
 * Live-Aktivitäten pro Deck (server-sicher, reine Daten).
 * Werden von der Teilnehmer-Seite (/live) und den Bühnenfolien gemeinsam genutzt.
 */

export type QuizTypeKey = "pionier" | "pragmatiker" | "skeptiker" | "entdecker";

export type LiveActivity =
  | { id: string; type: "words"; title: string; prompt: string; maxChars?: number }
  | { id: string; type: "poll"; title: string; question: string; options: string[] }
  | {
      id: string;
      type: "ranking";
      title: string;
      question: string;
      items: { key: string; label: string; value: number }[];
      source: string;
    }
  | {
      id: string;
      type: "estimate";
      title: string;
      question: string;
      unit: string;
      answer: number;
      source: string;
    }
  | {
      id: string;
      type: "judge";
      title: string;
      intro: string;
      options: [string, string, string];
      scenarios: { text: string; verdict: 0 | 1 | 2; why: string }[];
      /** true = Optionen sind gleichwertig (A/B/C), keine Ampelfarben */
      neutral?: boolean;
    }
  | {
      id: string;
      type: "quiz";
      title: string;
      intro: string;
      questions: { q: string; options: { text: string; type: QuizTypeKey }[] }[];
      types: Record<QuizTypeKey, { name: string; tagline: string; description: string }>;
    };

export const CRASH_KURS_LIVE = {
  wordsStart: {
    id: "wort-ki",
    type: "words",
    title: "Ein Wort",
    prompt: "Was verbindest du mit KI? Ein Wort oder ein kurzer Begriff.",
    maxChars: 30,
  },
  usage: {
    id: "nutzung",
    type: "poll",
    title: "Kurze Umfrage",
    question: "Wie oft nutzt du KI-Tools gerade?",
    options: ["Noch nie", "Ab und zu", "Jede Woche", "Jeden Tag"],
  },
  ranking: {
    id: "ranking-chatgpt",
    type: "ranking",
    title: "Ranking",
    question: "Wofür nutzen Menschen ChatGPT am häufigsten? Sortiere von Platz 1 bis 6.",
    items: [
      { key: "guidance", label: "Praktische Hilfe & Anleitungen", value: 28.8 },
      { key: "info", label: "Informationen suchen", value: 24.4 },
      { key: "writing", label: "Schreiben & Texte überarbeiten", value: 23.9 },
      { key: "media", label: "Bilder & Medien erzeugen", value: 7.3 },
      { key: "tech", label: "Programmieren & Technik", value: 5.1 },
      { key: "relations", label: "Beziehungen & Gefühle", value: 1.9 },
    ],
    source: "OpenAI / NBER, „How People Use ChatGPT“, September 2025, Anteil aller Nachrichten",
  },
  quiz: {
    id: "ki-typ",
    type: "quiz",
    title: "Welcher KI-Typ bist du?",
    intro: "Fünf Fragen, keine falschen Antworten. Am Ende siehst du deinen Typ.",
    questions: [
      {
        q: "Ein neues KI-Tool erscheint. Du …",
        options: [
          { text: "meldest dich noch am selben Tag an.", type: "pionier" },
          { text: "wartest, bis jemand im Kollegium davon berichtet.", type: "pragmatiker" },
          { text: "liest zuerst die Datenschutzerklärung.", type: "skeptiker" },
          { text: "willst wissen, welches Modell dahintersteckt.", type: "entdecker" },
        ],
      },
      {
        q: "KI im Unterricht ist für dich …",
        options: [
          { text: "längst Alltag.", type: "pionier" },
          { text: "ein Werkzeug für Vorbereitung und Korrektur.", type: "pragmatiker" },
          { text: "ein Risiko, das klare Regeln braucht.", type: "skeptiker" },
          { text: "ein spannendes Thema für die Klasse selbst.", type: "entdecker" },
        ],
      },
      {
        q: "ChatGPT antwortet falsch. Du …",
        options: [
          { text: "promptest nach, bis es passt.", type: "pionier" },
          { text: "nimmst, was brauchbar ist, und korrigierst selbst.", type: "pragmatiker" },
          { text: "fühlst dich bestätigt.", type: "skeptiker" },
          { text: "fragst dich, warum das Modell so antwortet.", type: "entdecker" },
        ],
      },
      {
        q: "Kolleg:innen fragen dich nach KI. Du …",
        options: [
          { text: "zeigst gleich drei Tools auf einmal.", type: "pionier" },
          { text: "gibst einen praktischen Tipp für morgen.", type: "pragmatiker" },
          { text: "warnst vor Schülerdaten in US-Tools.", type: "skeptiker" },
          { text: "erklärst, wie ein Sprachmodell funktioniert.", type: "entdecker" },
        ],
      },
      {
        q: "Was erledigst du als Erstes mit KI?",
        options: [
          { text: "Einen eigenen KI-Assistenten bauen.", type: "pionier" },
          { text: "Das nächste Arbeitsblatt.", type: "pragmatiker" },
          { text: "Erst mal nichts ohne Freigabe der Schulleitung.", type: "skeptiker" },
          { text: "Die Grenzen mit kniffligen Fragen austesten.", type: "entdecker" },
        ],
      },
    ],
    types: {
      pionier: {
        name: "Pionier:in",
        tagline: "Erst machen, dann fragen.",
        description:
          "Du probierst alles sofort aus und ziehst dein Kollegium mit. Dein Risiko: Datenschutz und Didaktik kommen manchmal erst an zweiter Stelle.",
      },
      pragmatiker: {
        name: "Pragmatiker:in",
        tagline: "Wenn es Zeit spart, ist es gut.",
        description:
          "KI ist für dich ein Werkzeug wie der Kopierer: unauffällig, nützlich, alltäglich. Du bist die Person, die Kolleg:innen am ehesten überzeugt.",
      },
      skeptiker: {
        name: "Skeptiker:in",
        tagline: "Vertrauen ist gut, prüfen ist besser.",
        description:
          "Du stellst die unbequemen Fragen nach Daten, Fehlern und Verantwortung. Jede Schule braucht dich, sonst wird KI blind eingeführt.",
      },
      entdecker: {
        name: "Entdecker:in",
        tagline: "Ich will verstehen, wie es funktioniert.",
        description:
          "Dich interessiert die Technik hinter dem Chat. Du machst KI selbst zum Unterrichtsthema und erklärst, warum ein Modell so antwortet.",
      },
    },
  },
  students: {
    id: "schueler-schaetzung",
    type: "estimate",
    title: "Schätzfrage",
    question: "Wie viel Prozent der Schüler:innen nutzen KI für die Schule?",
    unit: "%",
    answer: 74,
    source: "Vodafone Stiftung, „Pioniere des Wandels“, 2024, Befragung 14- bis 20-Jähriger",
  },
  judge: {
    id: "urteil",
    type: "judge",
    title: "Urteilsübung",
    intro: "Drei Situationen aus dem Schulalltag. Was sagen Sie?",
    options: ["Erlaubt", "Grenzwertig", "Geht nicht"],
    scenarios: [
      {
        text: "Eine Lehrkraft lädt die Klassenarbeiten ihrer 8b mit Namen bei ChatGPT hoch und lässt sie korrigieren.",
        verdict: 2,
        why: "Personenbezogene Schülerdaten in einem US-Tool ohne Auftragsverarbeitung. Mit DSGVO-konformer Plattform und anonymisiert wäre es möglich.",
      },
      {
        text: "Ein Schüler lässt sich für sein Referat eine Gliederung von einer KI vorschlagen und arbeitet sie dann selbst aus.",
        verdict: 0,
        why: "Das ist Werkzeugnutzung wie Lexikon oder Suchmaschine. Transparenz einfordern, dann ist es gute Praxis.",
      },
      {
        text: "Eine Lehrkraft formuliert mit KI einen Elternbrief über das Verhalten eines bestimmten Kindes und nennt dabei Vorname und Klasse.",
        verdict: 1,
        why: "Der Brief an sich ist unkritisch, der Name nicht. Ohne Namen prompten und erst im Word-Dokument einsetzen.",
      },
    ],
  },
  feedback: {
    id: "feedback",
    type: "poll",
    title: "Feedback",
    question: "War der Crash Kurs hilfreich für dich?",
    options: ["Sehr", "Ja", "Teilweise", "Eher nicht"],
  },
  challenge: {
    id: "challenge",
    type: "words",
    title: "30-Tage-Challenge",
    prompt: "Ein Tool, ein Use Case: Was setzt du in den nächsten 30 Tagen um?",
    maxChars: 80,
  },
} satisfies Record<string, LiveActivity>;

export const UE_LIVE = {
  wordsStart: {
    id: "zeitfresser",
    type: "words",
    title: "Ein Wort",
    prompt: "Was kostet dich bei einer neuen Unterrichtseinheit die meiste Zeit?",
    maxChars: 40,
  },
  ebene: {
    id: "ebene",
    type: "poll",
    title: "Kurze Umfrage",
    question: "Wo setzt du KI heute ein?",
    options: ["Noch gar nicht", "Für meine Vorbereitung", "Schüler:innen nutzen sie im Unterricht", "KI ist selbst Thema"],
  },
  stunden: {
    id: "stunden",
    type: "estimate",
    title: "Schätzfrage",
    question: "Wie viele Stunden steckst du in eine neue achtstündige Unterrichtseinheit?",
    unit: "Std.",
    answer: 3,
    source: "Ziel heute: ca. 3 Stunden für das Grundgerüst. Erfahrungswert aus Modul I, keine Studie.",
  },
  judge: {
    id: "urteil-ue",
    type: "judge",
    title: "Urteilsübung",
    intro: "Drei Situationen aus der Planung. Didaktisch sauber oder nicht?",
    options: ["Erlaubt", "Grenzwertig", "Geht nicht"],
    scenarios: [
      {
        text: "Eine Lehrkraft übernimmt die von der KI formulierten Lernziele unverändert in ihre Unterrichtseinheit.",
        verdict: 1,
        why: "Lernziele sind Ihre Entscheidung. Der KI-Vorschlag ist ein Entwurf, der gegen den Bildungsplan geprüft und in Ihre Sprache gebracht werden muss.",
      },
      {
        text: "Schüler:innen führen ein Gespräch mit „Robespierre“ und zitieren seine Antworten in der Klausur als historische Quelle.",
        verdict: 2,
        why: "Die KI-Figur ist eine Konstruktion, keine Quelle. Die Methode funktioniert nur mit dem Vergleich gegen eine echte Quelle und einer Reflexion.",
      },
      {
        text: "Eine Lehrkraft lässt zehn Multiple-Choice-Fragen generieren, prüft jede gegen das Schulbuch und streicht zwei davon.",
        verdict: 0,
        why: "Genau so. Generieren, außerhalb der KI prüfen, aussortieren. Die zwei gestrichenen Fragen sind der Beweis, dass geprüft wurde.",
      },
    ],
  },
  feedback: {
    id: "feedback-ue",
    type: "poll",
    title: "Feedback",
    question: "War das Modul hilfreich für dich?",
    options: ["Sehr", "Ja", "Teilweise", "Eher nicht"],
  },
  challenge: {
    id: "challenge-ue",
    type: "words",
    title: "30-Tage-Challenge",
    prompt: "Welche Unterrichtseinheit planst du als Nächstes mit KI? Fach und Thema.",
    maxChars: 80,
  },
} satisfies Record<string, LiveActivity>;

export const PLAGIATE_LIVE = {
  wordsStart: {
    id: "gefuehl",
    type: "words",
    title: "Ein Wort",
    prompt: "„Hausaufgabe“ und „KI“ in einem Satz. Was fühlst du dabei? Ein Wort.",
    maxChars: 30,
  },
  veraendert: {
    id: "veraendert",
    type: "poll",
    title: "Kurze Umfrage",
    question: "Wie sehr hast du deine Prüfungen seit KI verändert?",
    options: ["Gar nicht", "Ein wenig", "Deutlich", "Komplett neu gedacht"],
  },
  susOderKi: {
    id: "sus-oder-ki",
    type: "judge",
    neutral: true,
    title: "SuS oder KI?",
    intro: "Drei Aufgaben, je drei Texte auf der Leinwand. Welcher Text ist von der KI?",
    options: ["Text A", "Text B", "Text C"],
    scenarios: [
      { text: "Aufgabe 1 · Klimawandel: Nenne drei Folgen und erkläre sie kurz.", verdict: 0, why: "„Erstens, zweitens, drittens“, präzise Fachbegriffe, keine Reibung. B ist eine Schülerin („echt krass“), C eine schwächere." },
      { text: "Aufgabe 2 · Erlkönig: Analysiere die Wirkung der Sprache, besonders Angst und Bedrohung.", verdict: 1, why: "Vollständige Fachterminologie, jeder Satz trägt, kein Beispiel wird falsch gelesen. A hat einen eigenen Lesezugang, C bricht ab." },
      { text: "Aufgabe 3 · Mathe: 12 km in 30 Minuten. Geschwindigkeit in km/h? Strecke in 2 Stunden?", verdict: 2, why: "Rechenweg als nummerierte Schritte mit Einheiten in jeder Zeile. A rechnet richtig, aber knapp. B hat den typischen Flüchtigkeitsfehler (6 km/h)." },
    ],
  },
  tools: {
    id: "tools-genutzt",
    type: "poll",
    title: "Kurze Umfrage",
    question: "Welche KI-Tools hast du selbst schon genutzt?",
    options: ["ChatGPT", "Gemini", "telli oder Landestool", "Etwas anderes", "Nichts davon"],
  },
  fpRate: {
    id: "fp-rate",
    type: "estimate",
    title: "Schätzfrage",
    question: "Wie viel Prozent echter Schülertexte markieren KI-Detektoren fälschlich als KI?",
    unit: "%",
    answer: 25,
    source: "Studien 2023–2024 (Weber-Wulff et al., Perkins et al.): False-Positive-Raten zwischen 15 und 38 %, je nach Tool. 25 % ist der Mittelwert.",
  },
  note: {
    id: "note-chatgpt",
    type: "poll",
    title: "Reverse Engineering",
    question: "Welche Note bekäme ChatGPT für deine Aufgabe?",
    options: ["1 oder 2", "3", "4", "5 oder 6"],
  },
  bewertung: {
    id: "bewertung-urteil",
    type: "judge",
    title: "Urteilsübung",
    intro: "Drei Situationen rund um KI und Bewertung. Was sagst du?",
    options: ["Erlaubt", "Grenzwertig", "Geht nicht"],
    scenarios: [
      { text: "Eine Lehrkraft fotografiert 28 Klassenarbeiten mit Namen und lässt ChatGPT Noten vorschlagen.", verdict: 2, why: "Personenbezogene Daten Minderjähriger an einen US-Anbieter, und die Note ist ein Verwaltungsakt, der von Ihnen kommen muss." },
      { text: "Eine Lehrkraft gibt einen anonymisierten Aufsatz mit ihrem Bewertungsraster in DeepChat und vergleicht das KI-Feedback mit ihrer eigenen Bewertung.", verdict: 0, why: "Anonymisiert, mit Rubrik, als Zweitmeinung. Die finale Bewertung bleibt bei der Lehrkraft. So geht Assistenz." },
      { text: "Ein Schüler reicht eine Hausaufgabe ein, die zu 80 % von KI stammt, kennzeichnet die Passagen und listet seine Prompts auf.", verdict: 1, why: "Transparent, also kein Täuschungsversuch. Aber ob 80 % KI als Eigenleistung zählt, regelt die KI-Vereinbarung der Klasse. Ohne Vereinbarung: Gespräch." },
    ],
  },
  feedback: {
    id: "feedback-plagiate",
    type: "poll",
    title: "Feedback",
    question: "War das Modul hilfreich für dich?",
    options: ["Sehr", "Ja", "Teilweise", "Eher nicht"],
  },
  challenge: {
    id: "challenge-plagiate",
    type: "words",
    title: "30-Tage-Challenge",
    prompt: "Welche Aufgabe baust du als Erstes um? Fach und Aufgabe in Stichworten.",
    maxChars: 80,
  },
} satisfies Record<string, LiveActivity>;

export const LIVE_ACTIVITIES: Record<string, LiveActivity[]> = {
  plagiate: Object.values(PLAGIATE_LIVE),
  "crash-kurs": Object.values(CRASH_KURS_LIVE),
  unterrichtseinheiten: Object.values(UE_LIVE),
};
