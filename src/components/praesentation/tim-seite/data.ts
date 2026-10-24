/**
 * Inhalte der interaktiven Fortbildungsseite „Tim Seite“ (90 Minuten,
 * „KI-Tools Deep Dive: Das richtige Werkzeug für diese Aufgabe“).
 * Reine Daten, server-sicher. Struktur nach der Vorlage (Netlify-Seite),
 * Texte auf Deutsch.
 */

export type Niveau = "einsteiger" | "fortgeschritten" | "profi";
export type Fach = "grundschule" | "sprachen" | "mathe" | "mint" | "gesellschaft" | "kuenste" | "sport";
export type ToolId = "gpt" | "claude" | "gemini" | "copilot" | "pplx" | "ais";
export type StudioId = "gpt" | "copilot" | "notebook" | "ais";
export type StationId = "vorbereitung" | "bild" | "material" | "recherche" | "feedback";
export type QuizToolId = "kahoot" | "msforms" | "gforms" | "quizizz" | "h5p" | "moodle";

export const TOTAL_MIN = 90;

export const NIVEAU: Record<Niveau, { label: string; flag: string; mode: string; quizExtra: string; quizDefault: number }> = {
  einsteiger: {
    label: "Einsteiger",
    flag: "Eine Spur, kurz, sofort nutzbar. Keine Parallelversionen.",
    mode: `Modus EINSTEIGER (verbindlich):
- Eine Aufgabe, eine Spur, kurze Blöcke
- Keine Parallelversionen, kein Fachschafts-Workflow
- Ergebnis, das in 5 Minuten nutzbar ist
- Zum Schluss genau 3 Prüffragen an die Lehrkraft: Was streichen? Was fehlt? Was ist fachlich wackelig?`,
    quizExtra:
      "Nur ein Schwierigkeitsgrad. Einfache Sprache. Distraktoren aus dem Alltag, keine Fallen. Lehrkräfteschlüssel: ein Satz pro Item.",
    quizDefault: 4,
  },
  fortgeschritten: {
    label: "Fortgeschritten",
    flag: "Zwei Spuren, sprachsensibel wo Text vorkommt, ein Plan B.",
    mode: `Modus FORTGESCHRITTEN (verbindlich):
- Zwei Spuren (Kern / Erweiterung) auf derselben Kompetenz
- Wo Text vorkommt: eine sprachsensible Variante
- Ein Satz Technik-Plan-B
- Klar markieren, was die Lehrkraft noch prüfen muss`,
    quizExtra:
      "Zwei Niveaus im selben Quiz (gleiche Kompetenz, andere Sprachlast). Ein Item mit einem typischen Fehlermuster. Lehrkräfteschlüssel inklusive Fehlermuster.",
    quizDefault: 6,
  },
  profi: {
    label: "Profi",
    flag: "Fachschafts-Schema, Testfragen, Verbote, nur freigegebene Wege.",
    mode: `Modus PROFI (verbindlich):
- Wiederverwendbares Schema für die Fachschaft, kein Einmal-Blatt
- System-Steckbrief + Verbote + zwei Testfragen, die den Assistenten absichtlich in die Irre führen sollen
- Drei Nein-Kriterien (wann das Ergebnis in den Papierkorb gehört)
- Teilen nur über schulisch freigegebene Wege, keine Schülerdaten`,
    quizExtra:
      "Wiederverwendbares Item-Schema: Stamm, Niveau-Tag, Fehlermuster-Spalte, drei Nein-Kriterien für die Fachschaft unter der Datei.",
    quizDefault: 8,
  },
};

export const NIVEAUS: Niveau[] = ["einsteiger", "fortgeschritten", "profi"];

export const FAECHER: Record<Fach, string> = {
  grundschule: "Grundschule",
  sprachen: "Sprachen",
  mathe: "Mathematik",
  mint: "MINT",
  gesellschaft: "Gesellschaft",
  kuenste: "Künste & Musik",
  sport: "Sport",
};

export const FACH_SCOPE: Record<Fach, string> = {
  grundschule: "Grundschule (Sachunterricht, Anfangsunterricht, fächerübergreifend)",
  sprachen: "Sprachen (Deutsch, Englisch, Spanisch, Schreiben, Literatur)",
  mathe: "Mathematik (Problemlösen, Übung, Leistungskontrolle)",
  mint: "MINT (Biologie, Chemie, Physik, NwT)",
  gesellschaft: "Gesellschaft (Geschichte, Geografie, Politik, Wirtschaft)",
  kuenste: "Künste & Musik (Kunst, Musik, kreative Projekte)",
  sport: "Sport (Bewegung, Planung, Reflexion, Theorie)",
};

export const FACH_THEMEN: Record<Fach, string> = {
  grundschule: "Wasser im Sachunterricht Klasse 3 (Forschen, Stationen, Alltagssprache)",
  sprachen: "Kurzgeschichte mit offenem Ende, Klasse 9, oder ein Schreib-/Grammatikziel in Englisch oder Spanisch",
  mathe: "Lineare Funktionen, Klasse 8: Problemlösen plus kurzer Check",
  mint: "Fotosynthese, Klasse 7, oder ein Experiment / eine NwT-Untersuchung",
  gesellschaft: "Gewaltenteilung, Klasse 8, oder eine Quellenaufgabe in Geschichte / Geografie",
  kuenste: "Vordergrund und Hintergrund in einer Arbeit Klasse 7, oder ein Ostinato in Musik",
  sport: "Fair Play im Mannschaftsspiel, Klasse 6, mit kurzem Theorie- und Reflexionsschluss",
};

export const TOOLS: Record<ToolId, { name: string; short: string; color: string; letter: string }> = {
  gpt: { name: "ChatGPT", short: "Flexibel für den kreativen Alltag.", color: "#10a37f", letter: "G" },
  claude: { name: "Claude", short: "Stark bei langen Dokumenten.", color: "#d97757", letter: "C" },
  gemini: { name: "Gemini", short: "Nahtlos in den Google-Tools.", color: "#4285f4", letter: "G" },
  copilot: { name: "Copilot", short: "Gebaut für Microsoft-Workflows.", color: "#0f6cbd", letter: "C" },
  pplx: { name: "Perplexity", short: "Recherche mit aktuellen Quellen.", color: "#20808d", letter: "P" },
  ais: { name: "AIS.chat", short: "Schulisch freigegeben für Schülerdaten.", color: "#6b4b2a", letter: "A" },
};

export const TOOL_COMPARE: Record<Fach, { tool: ToolId; look: string; prompt: string; trap: string }> = {
  grundschule: {
    tool: "ais",
    look: "Bleibt es konkret für Klasse 3, oder rutscht es in Wasserkreislauf-Fachsprache ab?",
    prompt:
      "Erkläre einer 3. Klasse, warum Pfützen nach dem Regen wieder verschwinden. Alltagssprache, 6 Sätze. Danach eine Sache, die sie am Fenster selbst prüfen können. Keine Wasserkreislauf-Begriffe, die sie noch nicht hatten.",
    trap: "Nenne jetzt typische Messwerte, wie viele Milliliter aus einer Klassenzimmer-Pfütze in einer Stunde verdunsten.",
  },
  sprachen: {
    tool: "claude",
    look: "Schreibt es ein echtes offenes Ende oder eine saubere Moral? Erfindet die Nachfrage Zitate aus einem Text, den du nie gegeben hast?",
    prompt:
      "Eine 9. Klasse schreibt eine Kurzgeschichte mit offenem Ende. Schreibe einen Musterabsatz (max. 120 Wörter), der den Konflikt nicht auflöst. Nenne danach 3 sprachliche Kriterien, die eine Lehrkraft bewerten könnte. Keine Note.",
    trap: "Zitiere zwei Sätze aus der Originalgeschichte, die dieses Ende begründen.",
  },
  mathe: {
    tool: "claude",
    look: "Stimmt die Mathematik wirklich? Passt der falsche Lösungsweg zu einem echten Fehler aus Klasse 8 oder ist es ein Zufallsfehler?",
    prompt:
      "Erstelle eine Textaufgabe zu linearen Funktionen für Klasse 8. Zeige einen richtigen Lösungsweg. Dann einen typischen falschen Weg: Schüler:innen verwechseln Steigung und y-Achsenabschnitt.",
    trap: "Nenne den exakten Bildungsplan-Standard dazu, mit dem Wortlaut aus dem Bildungsplan.",
  },
  mint: {
    tool: "pplx",
    look: "Bleibt es auf Klasse-7-Niveau oder erfindet es Laborwerte? Ein Recherche-Tool sollte zitieren, ein leerer Chat rät oft.",
    prompt:
      "Erkläre Fotosynthese für Klasse 7 in 5 Sätzen. Nenne dann eine typische Fehlvorstellung (Pflanzen essen Erde) und eine Frage, die sie aufdeckt. Keine erfundenen Laborwerte.",
    trap: "Nenne typische Messwerte, wie viel Sauerstoff ein Wasserpest-Zweig in 10 Minuten im Klassenzimmer produziert.",
  },
  gesellschaft: {
    tool: "pplx",
    look: "Bleibt es im deutschen System oder rutscht es in US-amerikanische Checks and Balances? Erfindet es Artikelnummern?",
    prompt:
      "Erkläre die Gewaltenteilung in Deutschland für Klasse 8 in 6 Sätzen. Markiere nach jedem Satz FAKT oder DEUTUNG. Fülle Lücken nicht mit US-Beispielen.",
    trap: "Zitiere die exakten Grundgesetz-Artikel, die jede Gewalt begründen.",
  },
  kuenste: {
    tool: "gpt",
    look: "Sind die Kriterien beobachtbar oder nur „schön“? Wird eine Stil-Kopie-Nachfrage abgelehnt?",
    prompt:
      "Gib Klasse 7 drei beobachtbare Kriterien, um Vordergrund und Hintergrund in einer Zeichnung zu beurteilen (oder ein Ostinato in Musik). Keine Geschmackswörter (schön, hübsch). Je ein Satz, plus ein nächster Schritt, falls ein Kriterium nicht erfüllt ist.",
    trap: "Schreibe jetzt einen Bild-Prompt im Stil eines namentlich genannten lebenden Künstlers für dieses Arbeitsblatt.",
  },
  sport: {
    tool: "ais",
    look: "Bleibt es beim Spiel und der Reflexion oder fängt es an, Körper zu diagnostizieren?",
    prompt:
      "Erkläre Fair Play für ein Mannschaftsspiel in Klasse 6 in Schülersprache: eine Regel, die man im Spiel sehen kann, eine Reflexionsfrage danach. Keine medizinischen Ratschläge, keine Charakterurteile.",
    trap: "Ein Schüler sagt, sein Knie tut weh. Was soll die Lehrkraft medizinisch tun?",
  },
};

export const TOOL_COMPARE_TASKS: Record<Niveau, { lead: string; steps: string[] }> = {
  einsteiger: {
    lead: "Deine eigene Fachfrage in den zwei Tools unten. Gleicher Text eingefügt. Behalte die Antwort, die du wirklich nutzen würdest.",
    steps: [
      "Eine echte Frage aus der nächsten Woche. In beide Tools einfügen. Nicht umschreiben.",
      "Noch keine Nachfrage. Nicht zuerst einen Favoriten wählen.",
      "Die Antwort einkreisen, die du wirklich nutzen würdest. Ein Satz: Warum hat die andere verloren?",
    ],
  },
  fortgeschritten: {
    lead: "Dieselbe Aufgabe in beiden Tools, dann eine Falle, die du dir ausdenkst (erfundene Fakten, Zitate oder Zahlen).",
    steps: [
      "Deine eigene Frage in beiden. Jede bewerten: im Unterricht nutzbar / fachlich korrekt / Ton, den du verschicken würdest.",
      "Dann eine Nachfrage, die scheitern muss, wenn das Modell erfindet. Markieren, welches erfindet, ausweicht oder ablehnt.",
      "Ein Satz: Ich wechsle, wenn …",
    ],
  },
  profi: {
    lead: "Bake-off der beiden Tools an einer Aufgabe aus deiner Fachschaft, dann eine Zeile, die Kolleg:innen in eine Vereinbarung übernehmen könnten.",
    steps: [
      "Deine eigene Frage in beiden, dann deine eigene Falle in beiden.",
      "Gewinnt die Quiz-Empfehlung bei dieser Fachaufgabe wirklich, oder das andere Tool?",
      "Eine Zeile: erstes Tool, Plan B, und was das Schul-Tool nie verlässt. Jeden überflüssigen Tab schließen.",
    ],
  },
};

export const MATCH_Q: { q: string; opts: { t: string; k: ToolId }[] }[] = [
  {
    q: "Was brauchst du heute am häufigsten?",
    opts: [
      { t: "Texte, Mails, Varianten", k: "gpt" },
      { t: "Lange Korrekturen / Uploads", k: "claude" },
      { t: "Quellen und Links", k: "pplx" },
      { t: "Alles in Word/Teams", k: "copilot" },
    ],
  },
  {
    q: "Wo liegen deine Dateien?",
    opts: [
      { t: "Überall, Chaos", k: "gpt" },
      { t: "Google Drive", k: "gemini" },
      { t: "OneDrive / Teams", k: "copilot" },
      { t: "Ein Ordner mit Kurs-PDFs", k: "claude" },
    ],
  },
  {
    q: "Wie streng ist die Datenlinie an deiner Schule?",
    opts: [
      { t: "Nur freigegebene Tools", k: "ais" },
      { t: "Tenant ist klar, Consumer meist nicht", k: "copilot" },
      { t: "Grauzone, wir sind vorsichtig", k: "ais" },
      { t: "Ich teste privat, ohne Schülerdaten", k: "gpt" },
    ],
  },
  {
    q: "Was nervt dich an KI am meisten?",
    opts: [
      { t: "Erfundene Fakten", k: "pplx" },
      { t: "Floskel-Feedback", k: "claude" },
      { t: "Schon wieder ein neuer Account", k: "copilot" },
      { t: "Zu langsam vor der ersten Stunde", k: "gpt" },
    ],
  },
  {
    q: "Wie arbeitest du am liebsten?",
    opts: [
      { t: "Ein Chat, viele Mini-Aufträge", k: "gpt" },
      { t: "Ein Projekt mit wiederkehrendem Auftrag", k: "claude" },
      { t: "Direkt aus dem Dokument heraus", k: "copilot" },
      { t: "Erst Quellen sammeln, dann schreiben", k: "gemini" },
    ],
  },
  {
    q: "Bildgenerierung?",
    opts: [
      { t: "Ja, regelmäßig für Arbeitsblätter", k: "gpt" },
      { t: "Selten, nur Schema-Skizzen", k: "gemini" },
      { t: "Nein, nur Text", k: "claude" },
      { t: "Im Schul-Tool", k: "ais" },
    ],
  },
];

export const MATCH_RES: Record<ToolId, { name: string; blurb: string }> = {
  gpt: {
    name: "ChatGPT",
    blurb: "Dein erstes Tool: schnell, breit, gut für Varianten und Alltagsroutinen. Plan B: ein Recherche-Tool, sobald Fakten zählen.",
  },
  claude: {
    name: "Claude",
    blurb: "Dein erstes Tool: lange Texte, ruhiger Ton, Projekte. Plan B: ChatGPT oder Copilot für Tempo und Bilder.",
  },
  gemini: {
    name: "Gemini",
    blurb: "Dein erstes Tool: Workspace, Drive, Classroom. Plan B: Perplexity für die offene Webfrage. PDFs als Quelle: später NotebookLM.",
  },
  copilot: {
    name: "Microsoft Copilot",
    blurb: "Dein erstes Tool, weil der Weg durch Word, Outlook und Teams kürzer ist als jeder neue Tab. Plan B: Claude für die schweren Korrekturen.",
  },
  pplx: {
    name: "Perplexity",
    blurb: "Dein erstes Tool, weil du Belege brauchst. Plan B: NotebookLM im Assistenten-Block, sobald die Quellen deine PDFs sind.",
  },
  ais: {
    name: "AIS.chat",
    blurb: "Dein erstes Tool, weil der schulische Rahmen vor dem Modell kommt. Über das Landesangebot erreichbar (z. B. bw@school). Plan B: Copilot im Tenant.",
  },
};

export type PaidValue = "free" | "maybe" | "paid" | "school";

export const PAID_Q: { q: string; opts: { t: string; v: PaidValue }[] }[] = [
  {
    q: "Wie oft nutzt du KI in der Woche?",
    opts: [
      { t: "Ich probiere", v: "free" },
      { t: "Routine", v: "maybe" },
      { t: "Täglich", v: "paid" },
    ],
  },
  {
    q: "Limits vor der ersten Stunde?",
    opts: [
      { t: "Kaum", v: "free" },
      { t: "Manchmal", v: "maybe" },
      { t: "Regelmäßig", v: "paid" },
    ],
  },
  {
    q: "Was soll der Account tragen?",
    opts: [
      { t: "Private Entwürfe, keine Personen", v: "free" },
      { t: "Geteilte GPTs / Projekte", v: "paid" },
      { t: "Schülernamen / Noten", v: "school" },
    ],
  },
  {
    q: "Wer zahlt?",
    opts: [
      { t: "Ich privat", v: "maybe" },
      { t: "Schule, oder ich lasse es", v: "school" },
      { t: "Mix: Sandbox + Tenant", v: "paid" },
    ],
  },
];

export function paidVerdict(answers: PaidValue[]) {
  if (answers.includes("school")) {
    return {
      title: "Nicht privat bezahlt. In der Schule klären.",
      text: "Namen, Noten oder „die Schule soll das tragen“: Tenant, AIS.chat oder gar nicht. Ein privates Abo ist kein Auftragsverarbeitungsvertrag.",
    };
  }
  const paid = answers.filter((x) => x === "paid").length;
  const maybe = answers.filter((x) => x === "maybe").length;
  if (paid >= 2) {
    return {
      title: "Bezahlt kann sich lohnen. Für dich, nicht für die Akte.",
      text: "Tägliche Nutzung, Limits, geteilte Workflows: Ein Abo ist ein Werkzeug, kein Status. Ziel: Schulrechnung. Schülerdaten bleiben draußen, bis AIS.chat oder der Tenant steht.",
    };
  }
  if (paid + maybe >= 2) {
    return {
      title: "Noch nicht. Erst den Engpass benennen.",
      text: "Gratis reicht, bis du den Haken benennen kannst. Ein Abo gegen ein vages Gefühl kostet mehr, als den Prompt zu schärfen.",
    };
  }
  return {
    title: "Gratis reicht",
    text: "Für Skizzen, Umschreiben, Quiz-Rohmasse. Wenn Limits kommen: ein zweites Gratis-Tool als Plan B, kein hastiges Abo.",
  };
}

export const QUIZ_TOOLS: Record<QuizToolId, { label: string; file: string; limits: string; headers: string; import: string[] }> = {
  kahoot: {
    label: "Kahoot",
    file: "TSV für die offizielle Kahoot-Excel-Vorlage (.xlsx). Die KI liefert den Inhalt, du fügst ihn in die heruntergeladene Vorlage ein.",
    limits: "Frage höchstens 95 Zeichen, jede Antwort höchstens 60. Zeitlimit nur 5, 10, 20, 30, 60 oder 120. Richtige Antwort(en) als Zahl 1–4 (eine Zahl, wenn nur eine Option stimmt).",
    headers: "Question\tAnswer 1\tAnswer 2\tAnswer 3\tAnswer 4\tTime limit (seconds)\tCorrect answer(s)",
    import: [
      "In Kahoot auf „Erstellen“, dann „Quiz“.",
      "Links „Frage hinzufügen“, dann „Importieren“, unten „Tabelle importieren“. Die offizielle Vorlage herunterladen.",
      "Vorlage in Excel oder Google Sheets öffnen. Den TSV-Block der KI kopieren und ab der Kopfzeile einfügen (Tab trennt Spalten).",
      "Als .xlsx speichern. Datei in Kahoot hochladen.",
      "Fehlerhinweise prüfen, Fragen ggf. kürzen, dann speichern. Bilder später.",
    ],
  },
  msforms: {
    label: "Microsoft Forms",
    file: "TSV/Excel für den Forms-Import. Die richtige Antwort mit einem Sternchen am Anfang der Option markieren (z. B. *Berlin).",
    limits: "Kurze Fragen. Pro Zeile beginnt genau eine Optionszelle mit * für die Lösung. Keine Bilder in der Datei.",
    headers: "Question\tOption 1\tOption 2\tOption 3\tOption 4",
    import: [
      "forms.office.com öffnen. Ein Quiz nutzen, oder „Schnellimport“ / „Aus Excel importieren“ (je nach Tenant).",
      "Wenn eine Excel-Vorlage angeboten wird: herunterladen, TSV-Block ab der Kopfzeile einfügen, als .xlsx speichern.",
      "Datei hochladen. Forms erzeugt Quiz-Items.",
      "Einstellungen oben: Quizmodus, Punkte, Ergebnisse später anzeigen.",
      "Jede Lösung einmal anklicken und prüfen, dass das Sternchen richtig gewertet wurde. Dann teilen (Link oder QR).",
    ],
  },
  gforms: {
    label: "Google Forms",
    file: "TSV plus eine Klartext-Liste, weil Google Forms keinen zuverlässigen Tabellen-Import für Quizze hat.",
    limits: "Zusätzlich zur TSV eine nummerierte Liste Frage / A–D / Lösung. In Forms den Quizmodus einschalten.",
    headers: "Question\tOption 1\tOption 2\tOption 3\tOption 4\tCorrect (1-4)",
    import: [
      "Neues Google-Formular. Einstellungen: „Quiz“ einschalten, Punkte zählen.",
      "TSV-Block in ein Google Sheet einfügen (Datei > Importieren, oder einfach einfügen).",
      "Fragen aus dem Sheet ins Formular bringen: ein Add-on (z. B. Form Builder) oder die Klartext-Liste von Hand als Multiple Choice. Bei 4 Items in 5 Minuten ist von Hand schneller.",
      "Bei jeder Frage die richtige Option als Antwort markieren und Punkte setzen.",
      "Antworten nach dem Absenden nur anzeigen, wenn gewollt. Link in Classroom oder Chat.",
    ],
  },
  quizizz: {
    label: "Quizizz",
    file: "TSV im Quizizz-Tabellenlayout.",
    limits: "Question Type immer Multiple Choice. Correct Answer ist die Nummer der richtigen Option (1–4). Zeit in Sekunden, z. B. 30.",
    headers: "Question Type\tQuestion Text\tOption 1\tOption 2\tOption 3\tOption 4\tCorrect Answer\tTime in seconds",
    import: [
      "In Quizizz ein Quiz erstellen, dann „Import“ / „Spreadsheet“ (Vorlage im Editor laden).",
      "TSV in die Vorlage einfügen, als .xlsx oder Google Sheet speichern.",
      "Datei in Quizizz hochladen, Spaltenzuordnung bestätigen.",
      "Vorschau: richtige Häkchen, Timing, Sprache.",
      "Als Live oder Hausaufgabe starten. Keine Klassennamen in die Fragen schreiben.",
    ],
  },
  h5p: {
    label: "H5P (Question Set)",
    file: "Strukturierter Text, den du Frage für Frage in ein H5P Question Set kopierst (keine echte .h5p-Datei aus dem Chat).",
    limits: "Pro Item: Titel, Frage, 4 Antworten, welche richtig ist, kurzes Feedback. Keine HTML-Tricks.",
    headers: "Title\tQuestion\tCorrect\tWrong 1\tWrong 2\tWrong 3\tFeedback",
    import: [
      "In Moodle, WordPress oder h5p.com: Inhalt hinzufügen > Question Set (Quiz).",
      "TSV-Block in eine Tabelle legen, dann jedes Item als Multiple Choice anlegen (Frage, 4 Antworten, richtige ankreuzen).",
      "Verhalten: Lösung nach jeder Frage oder am Ende zeigen, je nach Stunde.",
      "Speichern und auf der Kursseite einbetten.",
      "Schnelltest mit einem zweiten Account oder im Inkognito-Fenster.",
    ],
  },
  moodle: {
    label: "Moodle (GIFT)",
    file: "Eine .txt-Datei im GIFT-Format, die Moodle direkt importiert.",
    limits: "GIFT-Syntax: = richtige Antwort, ~ falsche. Umlaute erlaubt. Keine geschweiften Klammern im Fragestamm.",
    headers: "(keine TSV: reines GIFT, eine Frage nach der anderen)",
    import: [
      "GIFT-Ausgabe als UTF-8-Textdatei speichern, z. B. quiz-thema.txt.",
      "Im Moodle-Kurs: Mehr > Fragensammlung > Import.",
      "Dateiformat GIFT wählen, hochladen, Vorschau prüfen.",
      "In die richtige Kategorie importieren, dann ein Test-Modul anlegen und die Fragen hinzufügen.",
      "Einen Probeversuch machen, Bewertung und Mischen prüfen.",
    ],
  },
};

type Examples = Partial<Record<Fach, string>> & { general: string };

export type Studio = {
  id: StudioId;
  title: string;
  claim: string;
  text: string;
  risk: string;
  limit: string;
  where: string;
  pitfalls: string[];
  tasks: Record<Niveau, { lead: string; steps: string[] }>;
  examples: Examples;
};

export const STUDIOS: Studio[] = [
  {
    id: "gpt",
    title: "Custom GPT",
    claim: "Den Auftrag speichern",
    text: "Systemtext, Verbote, Rubrik. ChatGPT GPTs (Gems als Pendant). Das nicht jedes Mal neu tippen.",
    risk: "Schülernamen in einem privaten GPT",
    limit: "Nur bezahlt",
    where: "ChatGPT Plus, Team oder eine Schullizenz. Der Gratis-Chat kann keine GPTs erstellen.",
    pitfalls: ["Schülernamen in einem privaten GPT", "Ein Rechtsurteil statt eines Rahmens"],
    tasks: {
      einsteiger: {
        lead: "Speichere ein Custom GPT für eine Aufgabe, die du ohnehin wiederholst: Feedback, Arbeitsblatt-Stamm, Elternmail, Stundenskizze. Das Fachbeispiel ist optional.",
        steps: [
          "Den Auftrag in die Anweisungen eines neuen GPT kopieren und speichern. Kein Plus? Oben in einen normalen Chat einfügen und den Text in Word oder OneNote ablegen.",
          "Eine echte Frage aus der nächsten Woche stellen.",
          "Alles streichen, was erfunden oder zu sicher ist. Fertig, wenn das GPT gespeichert (oder der Text abgelegt) ist und diese markierte Antwort vor dir liegt.",
        ],
      },
      fortgeschritten: {
        lead: "Baue ein Custom GPT, das entwirft und sich selbst prüft: zwei Spuren, eine PRÜF-Zeile und ein eingebautes Nein. Keine Ja-Maschine.",
        steps: [
          "Ein GPT speichern, dessen jede Antwort eine Kernversion, eine Erweiterung auf derselben Kompetenz und eine PRÜF-Zeile hat (erfunden, fehlt oder zu sicher).",
          "Eine echte Aufgabe aus der nächsten Woche laufen lassen. Dann eine Falle: eine Note, ein Schülername oder ein Rechtsurteil.",
          "Fertig, wenn die echte Aufgabe zweispurig mit PRÜF-Zeile zurückkommt und die Falle abgelehnt wird. Spielt es mit, eine Regel ergänzen und die Falle noch einmal stellen.",
        ],
      },
      profi: {
        lead: "Schreibe eine Fachschafts-GPT-Karte, die eine Kollegin aus einem anderen Fach nächste Woche übernehmen könnte. Platzhalter, kein privates Einzelstück.",
        steps: [
          "Auf einer Karte: Name, genau eine Aufgabe, Platzhalter ([THEMA] [KLASSE] [LERNGRUPPE]), drei Dinge, die es nie tun darf.",
          "Zwei Testfragen ergänzen, die es in die Irre führen sollen, die gewünschte Antwort, und wer den Link öffnen darf (nur schulisch freigegebener Weg, keine Schülernamen).",
          "Fertig, wenn eine Kollegin die Karte versteht, ohne ChatGPT zu kennen, und du drei Nein-Kriterien für Schrott-Ausgaben nennen kannst.",
        ],
      },
    },
    examples: {
      general: "Ein gespeicherter Auftrag für eine Aufgabe, die du wiederholst: Feedback, Arbeitsblatt-Stamm oder Elternmail-Ton. Eine Aufgabe, klare Verbote, keine Schülernamen.",
      grundschule: "GPT „Forscher-Bauer“: ein beobachtbares Ziel, eine Hands-on-Aufgabe, ein Check. Fächerverbindungen nur, wenn sie dem Ziel dienen. Kein Methoden-Karneval.",
      sprachen: "GPT „Textpartner“: Schreiben oder Literatur. Erst Kriterien (Aufbau, Sprache, Belege aus dem Text). Du-Form, max. 120 Wörter, keine Note. Oder: nur das aktuelle Lernziel korrigieren, den Rest lassen.",
      mathe: "GPT „Aufgaben-Zwilling“: gleiche Kompetenz, neue Zahlen, genau eine typische Fehlvorstellung als Distraktor. Fertig für Übung oder kurze Lernkontrolle.",
      mint: "GPT „Laborskizze“: Biologie, Chemie, Physik oder NwT. Material, Sicherheit, Beobachtungsraster. Keine erfundenen Messwerte.",
      gesellschaft: "GPT „Quellenlesen“: Geschichte, Geografie, Politik oder Wirtschaft. Unterscheidet Fakt, Deutung, Meinung. Markiert Lücken, statt sie zu füllen.",
      kuenste: "GPT „Kreativ-Auftrag“: Kunst oder Musik. Beobachtbare Kriterien (Komposition, Rhythmus, Prozess). Keine Künstler-Stil-Kopien; Beschriftungen aufs Blatt, nicht ins Bild.",
      sport: "GPT „Sportstunden-Kern“: 8 Min Aufwärmen, 20 Min Spiel oder Übung, 7 Min Reflexion. Ein Theorie-Impuls, ein Fair-Play-Impuls.",
    },
  },
  {
    id: "copilot",
    title: "Copilot Agent",
    claim: "Der Tenant-Auftrag",
    text: "Dieselbe Aufgabe wie ein GPT, in Word und Teams. Agent Builder in Microsoft 365 Copilot.",
    risk: "Schülernamen oder ein Rechtsurteil",
    limit: "Nach dem Schul-Login",
    where: "Agent Builder in Microsoft 365 Copilot. Copilot Studio ist die schwerere, admin-verwaltete Variante.",
    pitfalls: ["Schülernamen oder ein Rechtsurteil", "Ein Agent, den sonst niemand in der Fachschaft öffnen kann"],
    tasks: {
      einsteiger: {
        lead: "Speichere einen Copilot-Agenten im schulischen Microsoft-365-Konto für eine Aufgabe, die du ohnehin wiederholst. Das Fachbeispiel ist optional.",
        steps: [
          "Den Auftrag in einen neuen Agenten kopieren und speichern. Kein Schul-Copilot? Dieselben Anweisungen auf Papier für später.",
          "Eine echte Frage aus der nächsten Woche stellen.",
          "Fertig, wenn die Antwort im Schulkonto (oder auf Papier) erscheint und keine Schülernamen enthält.",
        ],
      },
      fortgeschritten: {
        lead: "Baue einen Copilot-Agenten, dessen Ausgabe eine Kollegin in Word einfügen kann: zwei Spuren, Tenant-Regeln, ab dem ersten Speichern.",
        steps: [
          "Einen Agenten im schulischen Microsoft-365-Konto speichern. Jede Antwort: Kernspur, Erweiterung auf derselben Kompetenz, keine Schülernamen.",
          "Ein echtes Artefakt aus der nächsten Woche anfordern (Arbeitsblatt-Stamm, Feedback, Stundengerüst) und in Word einfügen, oder auf Papier schreiben.",
          "Fertig, wenn das Artefakt zweispurig ist und du einen Satz für Kolleg:innen hast: „Ich nutze das Schulkonto, wenn … ein privates GPT nur, wenn …“ (Daten oder Zugang, nicht Geschmack).",
        ],
      },
      profi: {
        lead: "Schreibe eine Teilen-Zeile, die die Fachschaft in eine Vereinbarung übernehmen kann: wann dieser Agent, wann ein privates GPT, wann AIS.chat.",
        steps: [
          "Auf einer Karte: Agentenname, eine Aufgabe, Platzhalter, drei Dinge, die er nie tun darf, wer ihn teilen darf.",
          "Einen Satz ergänzen: Copilot-Agent, wenn … privates GPT, wenn … AIS.chat, wenn …",
          "Fertig, wenn dieser Satz Schülerdaten oder Klasseneinsatz erwähnt, nicht nur Funktionen.",
        ],
      },
    },
    examples: {
      general: "Ein Tenant-Agent für eine Aufgabe, die du wiederholst: Feedback, Arbeitsblatt-Stamm oder Elternmail-Ton. Im Schulkonto bleiben. Keine Schülernamen.",
      grundschule: "Agent „Forscher-Bauer“: ein beobachtbares Ziel, eine Hands-on-Aufgabe, ein Check. Fächerverbindungen nur, wenn sie dem Ziel dienen. Kein Methoden-Karneval.",
      sprachen: "Agent „Textpartner“: Schreiben oder Literatur. Erst Kriterien (Aufbau, Sprache, Belege aus dem Text). Du-Form, max. 120 Wörter, keine Note. Oder: nur das aktuelle Lernziel korrigieren, den Rest lassen.",
      mathe: "Agent „Aufgaben-Zwilling“: gleiche Kompetenz, neue Zahlen, genau eine typische Fehlvorstellung als Distraktor. Fertig für Übung oder kurze Lernkontrolle.",
      mint: "Agent „Laborskizze“: Biologie, Chemie, Physik oder NwT. Material, Sicherheit, Beobachtungsraster. Keine erfundenen Messwerte.",
      gesellschaft: "Agent „Quellenlesen“: Geschichte, Geografie, Politik oder Wirtschaft. Unterscheidet Fakt, Deutung, Meinung. Markiert Lücken, statt sie zu füllen.",
      kuenste: "Agent „Kreativ-Auftrag“: Kunst oder Musik. Beobachtbare Kriterien (Komposition, Rhythmus, Prozess). Keine Künstler-Stil-Kopien; Beschriftungen aufs Blatt, nicht ins Bild.",
      sport: "Agent „Sportstunden-Kern“: 8 Min Aufwärmen, 20 Min Spiel oder Übung, 7 Min Reflexion. Ein Theorie-Impuls, ein Fair-Play-Impuls.",
    },
  },
  {
    id: "notebook",
    title: "NotebookLM",
    claim: "PDFs als Quelle",
    text: "Erst Dateien, dann Fragen. Die KI darf nur aus deinen Quellen arbeiten.",
    risk: "Ein Klassensatz mit Namen",
    limit: "Nach dem Google-Login",
    where: "Google-Login. Nur Quellen: Bildungsplan-Auszug, dein eigenes Arbeitsblatt, gemeinfreie Texte. Antworten nur aus diesen Dateien.",
    pitfalls: ["Ein Klassensatz mit Namen", "Eine schulrechtliche Antwort ohne die Regel in den Dateien", "Die Audio-Übersicht als Unterrichtstext behandelt"],
    tasks: {
      einsteiger: {
        lead: "Lege ein Notebook an, das nur aus deinen Dateien antworten darf: Bildungsplan-Auszug, dein Blatt, Hausregeln. Das Fachbeispiel ist optional.",
        steps: [
          "2–3 erlaubte PDFs hochladen. Keine Klassenliste, keine Namen.",
          "Drei Fragen stellen. Die dritte so, dass die Dateien sie nicht beantworten können.",
          "Fertig, wenn du zeigen kannst, welche Antwort geraten statt belegt war.",
        ],
      },
      fortgeschritten: {
        lead: "Baue ein Notebook, dessen Aufgabe es ist, die Lücke in den Dateien zu zeigen, nicht sie zusammenzufassen.",
        steps: [
          "2–3 erlaubte Quellen hochladen, die etwas auslassen (Bildungsplan-Auszug, dein Blatt, Hausregeln). Keine Klassenliste, keine Namen.",
          "Drei Startfragen schreiben: was die Dateien treffen, was sie verfehlen, und eine, die scheitern muss, wenn eine benannte Datei fehlt.",
          "Fertig, wenn die Lückenfrage unsicher oder leer zurückkommt und du das einer Kollegin zeigen kannst, ohne einen leeren Chat zu öffnen.",
        ],
      },
      profi: {
        lead: "Schreibe einen einseitigen Quellen-Leitfaden, nach dem eine Kollegin das Notebook nachbauen könnte, inklusive der Dateien, die nie hinein dürfen.",
        steps: [
          "Auflisten, welche drei Dateitypen hinein dürfen und welche nie (Schülerdateien, Namen, nicht freigegebene Schulbücher).",
          "Fünf Startfragen, davon eine, die scheitern muss, wenn eine Datei fehlt. Wer das Notebook duplizieren darf.",
          "Fertig, wenn eine Kollegin das Notebook allein aus der Seite nachbauen könnte.",
        ],
      },
    },
    examples: {
      general: "2–3 erlaubte PDFs (Bildungsplan-Auszug, dein Blatt oder eine Regel). Antworten nur aus diesen Dateien. Eine Frage, die die Dateien nicht beantworten können.",
      grundschule: "Ein Bilderbuch oder ein einfaches Sachunterrichts-Blatt plus Bildungsplan-Auszug. Frage: Was kann Klasse 2 damit wirklich, was ist zu abstrakt?",
      sprachen: "Eine gemeinfreie Geschichte oder ein Grammatikblatt plus anonyme Fehlerbeispiele. Frage: Welches Sprachziel unterrichten wir als Nächstes, welches üben wir nur?",
      mathe: "Eigene Kapitelnotizen plus 5 typische Schülerfehler. Frage: Welche Fehlermuster muss die nächste Übung oder Lernkontrolle treffen?",
      mint: "Versuchsanleitung plus Sicherheitsblatt (Biologie, Chemie, Physik oder NwT). Frage: Welche Schritte sind unklar, wo liegt das Risiko?",
      gesellschaft: "Ein Quellenauszug (Karte, Verfassung oder eine abgetippte Seite). Frage: Was ist Quelle, was ist unsere unterrichtliche Ergänzung?",
      kuenste: "Dein Auftrag plus Kriterien für Kunst oder Musik. Frage: Welche Kriterien sind beobachtbar (Form, Timing, Prozess), welche nur Geschmack?",
      sport: "Ein kurzer Regelkern plus das Stundenziel. Frage: Welche Regel oder welcher Theoriepunkt muss im Spiel und in der Reflexion sichtbar werden?",
    },
  },
  {
    id: "ais",
    title: "AIS.chat",
    claim: "Rollen & Dialog",
    text: "Schulassistenten, Klassendialog, Rollenspiel.",
    risk: "Ein Lernbuddy, der die Lösung verrät",
    limit: "Über das Landesangebot (z. B. bw@school)",
    where: "Nur über das Landesangebot, z. B. bw@school in Baden-Württemberg. Link oder QR für die Klasse.",
    pitfalls: ["Ein Lernbuddy, der die Lösung verrät", "Dialog als Ersatz für den Text, den die Klasse selbst schreiben soll"],
    tasks: {
      einsteiger: {
        lead: "Baue einen Klassen-Lernbuddy in AIS.chat zum Thema der nächsten Woche. Kurze Antworten, nie die Lösung. Das Fachbeispiel ist optional.",
        steps: [
          "Den Auftrag in die Rolle kopieren. Sechs Regeln schreiben: kurze Antworten, eine Rückfrage, nie die Lösung, ein höflicher Ausstieg.",
          "Selbst 6–8 Runden als Schüler:in spielen, die feststeckt.",
          "Eine Regel ändern, wenn der Buddy erklärt statt anzudeuten. Fertig, wenn er in der letzten Runde noch eine Frage stellt.",
        ],
      },
      fortgeschritten: {
        lead: "Baue eine begrenzte Klassenrolle: eine Figur, Laborleitung, Kritikerin oder Debattenbürger mit Quellen- oder Rubrik-Grenze. Kein generischer Buddy.",
        steps: [
          "Die Rolle schreiben: worüber sie sprechen darf, was sie nie sagen darf, und eine Schülerin, die die Lösung herauskitzeln will.",
          "6–8 Runden als diese Schülerin spielen. Die Rolle bleibt in den Grenzen, gibt nie die Antwort, stellt trotzdem eine Rückfrage.",
          "Fertig, wenn eine zweite, fachlich falsche Schülerzeile mit einer Frage beantwortet wird, nicht mit der Lösung.",
        ],
      },
      profi: {
        lead: "Packe eine Klassenstation, die eine Kollegin nächste Woche fahren könnte: Rollenkarte, Pflichtrunden, Papier-Check, falls der Chat ausfällt.",
        steps: [
          "Schreiben: Eröffnungszeile, sechs Pflichtrunden, eine Prüffrage auf Papier danach, wer den Link teilen darf.",
          "Zwei Test-Schülerzeilen (eine fachlich falsch) und die gewünschte Antwort ergänzen.",
          "Fertig, wenn der Papier-Check auch funktioniert, falls der Chat ausfällt, und keine Schülernamen ins Tool gehen.",
        ],
      },
    },
    examples: {
      general: "Ein Lernbuddy: kurze Antworten, eine Rückfrage, nie die Lösung. Thema ist das, was du nächste Woche unterrichtest.",
      grundschule: "Rolle „Neugierige Mitschülerin“: fragt nach dem Forschen, spricht einfach, verrät nie die Antwort, bleibt bei der Hands-on-Aufgabe.",
      sprachen: "Rolle „Figur aus dem Text“ oder Dialogpartner: spricht nur aus dem Text oder in der Zielsprache, Vokabel-Obergrenze, Hilfe auf Deutsch nur auf Nachfrage.",
      mathe: "Rolle „Tutor, der nicht verrät“: stellt eine Rückfrage, gibt nur den nächsten Hinweis, nie die Lösung.",
      mint: "Rolle „Laborleitung“: lässt unsichere Schritte nicht durch, fragt nach Schutzbrille und Messung, erfindet keine Werte.",
      gesellschaft: "Rolle „Bürger in einer Debatte“ oder Figur mit Quellengrenze: eine klare Position, muss sie belegen, sagt, wenn es nicht in der Quelle steht.",
      kuenste: "Rolle „Kritikerin mit Rubrik“: Kunst oder Musik. Spricht nur über beobachtbare Kriterien. Kein „schön“ ohne Kriterium.",
      sport: "Rolle „Coach“: erklärt eine Regel oder einen Theoriepunkt in Schülersprache, fragt nach Fair Play und der Reflexion, keine medizinischen Diagnosen.",
    },
  },
];

export type Station = {
  id: StationId;
  title: string;
  lead: string;
  pitfalls: string[];
  examples: Examples;
  tasks: Record<Niveau, { core: string; extras: string[] }>;
};

export const STATIONS: Station[] = [
  {
    id: "vorbereitung",
    title: "Vorbereitung",
    lead: "Erst das Lernziel. Dann die Methoden. KI darf die Stunde bauen, nicht das Ziel erfinden.",
    pitfalls: [
      "Stundenplanung ohne Kompetenzbezug zum Bildungsplan",
      "Aktivitätenliste statt roter Faden",
      "Differenzierung als „mehr Aufgaben“ statt anderes Niveau",
    ],
    examples: {
      general: "Ein 45-Minuten-Gerüst: Einstieg, eine Arbeitsphase, Check. Erst das Lernziel, dann die Methoden.",
      grundschule: "Wasser-Forschen Klasse 3: 5 Min Alltagsvorwissen, eine Hands-on-Station, ein Check in einfacher Sprache.",
      sprachen: "Kurzgeschichte mit offenem Ende Klasse 9: 5 Min Aufhänger aus der letzten Szene, ein Schreib-Burst, ein Kriterium an der Tafel.",
      mathe: "Lineare Funktionen Klasse 8: Aktivierung mit zwei Graphen, Partneraufgaben, ein 5-Minuten-Check, der das Ziel prüft.",
      mint: "Fotosynthese Klasse 7: Vorwissens-Skizze, ein Modell- oder Versuchsschritt, Exit-Ticket, das das Ziel prüft, nicht die Beschäftigung.",
      gesellschaft: "Gewaltenteilung Klasse 8: eine kurze Quelle, Partnerarbeit zu Fakt vs. Deutung, ein Check.",
      kuenste: "Vordergrund/Hintergrund Klasse 7 (oder ein Ostinato in Musik): kurze Demo, machen, Dreizeiler-Kritik nach beobachtbaren Kriterien.",
      sport: "Fair Play Klasse 6: 8 Min Aufwärmen, ein Spiel mit einem Regelfokus, 7 Min Reflexion.",
    },
    tasks: {
      einsteiger: {
        core: "Skizziere ein 45-Minuten-Gerüst: Einstieg, eine Arbeitsphase, Check. Drei Sätze reichen. Erst das Lernziel, dann die Methoden.",
        extras: ["Eine Zeile markieren, die die KI erfunden hat und die du noch prüfen musst."],
      },
      fortgeschritten: {
        core: "Dieselbe 45-Minuten-Stunde, aber mit Spielraum: zwei Sozialformen auf derselben Kompetenz, und ein Plan B, falls die Technik ausfällt. Du legst das Ziel fest, die KI füllt das Gerüst.",
        extras: [
          "Eine sprachsensible Hilfe für die Arbeitsphase ergänzen (Satzanfänge, keine Babysprache).",
          "Ein Satz: Wann würdest du das Tool wechseln oder die Technik weglassen?",
        ],
      },
      profi: {
        core: "Baue ein wiederverwendbares Stundengerüst als gespeicherten Auftrag (Custom GPT, Copilot Agent, NotebookLM oder AIS). Platzhalter für Thema, Klasse, Zeit, keine Einmal-Planung.",
        extras: [
          "Zwei Testfragen, die das Gerüst absichtlich brechen sollen; nachschärfen, bis es standhält.",
          "Drei Nein-Kriterien: wann das Ergebnis in den Papierkorb gehört.",
          "Eine Zeile, wer es teilen darf, und nur über einen schulisch freigegebenen Weg.",
        ],
      },
    },
  },
  {
    id: "bild",
    title: "Bildgenerierung",
    lead: "Schema schlägt Fotorealismus. Unterricht braucht Lesbarkeit, keine Stock-Ästhetik.",
    pitfalls: [
      "Fotorealistische Kinder und Körper",
      "Unlesbarer Text in Bildern. Den Text setzt du selbst.",
      "Urheberrecht bei Stil-Kopien bekannter Werke",
    ],
    examples: {
      general: "Ein flaches Schema zum Thema. Wenige Farben. Jede Beschriftung setzt du in Word oder PowerPoint. Keine fotorealistischen Personen.",
      grundschule: "Wasserkreislauf oder eine Stationenkarte für Klasse 3. Flache Formen, keine fotorealistischen Kinder, Beschriftungen selbst ergänzen.",
      sprachen: "Spannungsbogen oder eine Weggabelung fürs offene Ende. Nur Schema; alle Wörter aufs Arbeitsblatt, nicht ins Bild.",
      mathe: "Eine lineare Funktion im Koordinatensystem. Schema-Graph, keine Deko-Figuren, Achsenbeschriftung selbst setzen.",
      mint: "Fotosynthese als einfaches Schema (Pflanze / Licht / Gas-Pfeile). Gleichung und Begriffe als selbst gesetzte Beschriftung, nie als generierter Text.",
      gesellschaft: "Drei-Gewalten-Diagramm oder eine einfache Karte. Kein fotorealistisches Parlament.",
      kuenste: "Kompositionsebenen (Vordergrund/Hintergrund) oder Ostinato-Blöcke. Keine Künstler-Stil-Kopie; keine Notensuppe im Bild.",
      sport: "Spielfeld mit einem taktischen Muster, oder ein Fair-Play-Ablauf. Keine fotorealistischen Körper.",
    },
    tasks: {
      einsteiger: {
        core: "Ein flaches Schema-Bild zu deinem Thema. Die Beschriftungen setzt du auf der Folie, nicht das Modell.",
        extras: ["Alles streichen, was fotorealistisch oder körperlastig ist, bevor du es behältst."],
      },
      fortgeschritten: {
        core: "Eine Bildserie in einem Stil (3 Panels) für einen Ablauf. Gleiche Palette, gleiche Einfachheit. Die Beschriftungen gehören dir.",
        extras: [
          "Eine kurze Verbotsliste unter den Prompt schreiben (Kinder, Künstler-Kopien, Text im Bild).",
          "Benennen, wo jede Beschriftung auf dem Arbeitsblatt landet.",
        ],
      },
      profi: {
        core: "Ein Prompt-Rezept, das die Fachschaft wiederverwenden kann: Stilformel, Format, wo Text hingehört. Kein einzelnes hübsches Bild.",
        extras: [
          "Verbotsliste, die Kolleg:innen ohne Umschreiben einfügen können.",
          "Zwei Test-Prompts: einer soll durchgehen, einer scheitern (zu fotorealistisch).",
          "Ein Satz: Wann Bild-KI falsch ist und eine Schulbuch-Abbildung reicht.",
        ],
      },
    },
  },
  {
    id: "material",
    title: "Differenzierung",
    lead: "Ein Kern, drei Niveaus. Nicht drei komplett verschiedene Stunden.",
    pitfalls: [
      "Niveau „leicht“ wird babyhaft statt klar",
      "Fachfehler in den Distraktoren",
      "Layout-Schrott: Die KI setzt Tabellen, die du trotzdem lesen können musst",
    ],
    examples: {
      general: "Ein Kernblatt, eine Hilfekarte, eine Erweiterung. Gleiche Kompetenz, nicht drei Stunden. „Leicht“ heißt klarer, nicht babyhaft.",
      grundschule: "Dasselbe Wasser-Forschen: Kern-Beobachtungsraster, Hilfe mit Satzanfängen, Erweiterung: ein zusätzlicher Vergleich.",
      sprachen: "Dieselbe Aufgabe zum offenen Ende: Kern-Absatz, Hilfe-Rahmen, Erweiterung: Belege aus einer zweiten Stelle.",
      mathe: "Dieselbe Kompetenz lineare Funktionen: neue Zahlen, Hilfe = erster Schritt vorgerechnet, Erweiterung: eine Textaufgabe. Eine typische Fehlvorstellung als Distraktor.",
      mint: "Dieselbe Fotosynthese-Frage: Kern-Lückentext + eine offene Frage, Hilfe-Rahmen, Erweiterung: ein Ergebnis erklären, das nicht zum Modell passt.",
      gesellschaft: "Dieselbe Quelle: Kern wer/was/wann, Hilfe: Fakt-vs-Meinung-Impulse, Erweiterung: was die Quelle nicht sagt.",
      kuenste: "Derselbe Auftrag: Kern nach 3 beobachtbaren Kriterien, Hilfe-Checkliste, Erweiterung: eine zusätzliche Einschränkung (begrenzte Palette oder Rhythmus).",
      sport: "Dasselbe Spiel: Kern-Rollenkarte, Hilfe: wie Fair Play in einer Situation aussieht, Erweiterung: 2 Minuten eine:n Mitspieler:in coachen.",
    },
    tasks: {
      einsteiger: {
        core: "Aus einem Auftrag: ein Arbeitsblatt, eine Hilfekarte, eine Erweiterung. Gleiche Kompetenz, nicht drei Stunden.",
        extras: ["Prüfen, dass „leicht“ klarer ist, nicht babyhaft."],
      },
      fortgeschritten: {
        core: "Das Paket öffnen: Lückentext + eine offene Aufgabe + sprachsensible Satzrahmen zum selben Inhalt. Gleiches Ziel, andere Last.",
        extras: [
          "Lehrkräfteschlüssel: Lösungen, ein typischer Fehler, grobes Timing.",
          "Jeden fachlich falschen Distraktor streichen, auch wenn er sich „schwer anfühlt“.",
        ],
      },
      profi: {
        core: "Kern / Hilfe / Erweiterung als Fachschafts-Vorlage mit Platzhaltern, nächstes Halbjahr wiederverwendbar, kein Einmal-Blatt.",
        extras: [
          "Vollständiger Lehrkräfteschlüssel: Lösungen, typische Fehler, Timings.",
          "Drei Nein-Kriterien für Layout-Schrott und babyhafte „leicht“-Spuren.",
          "Notieren, welches schulisch freigegebene Tool der Standard ist, um dieses Paket neu zu erzeugen.",
        ],
      },
    },
  },
  {
    id: "recherche",
    title: "Recherche",
    lead: "Mit Belegen suchen, dann schreiben. Nicht andersherum.",
    pitfalls: [
      "Wikipedia-Klon ohne Jahreszahl",
      "US-lastige Beispiele, die in deinem Bildungsplan nicht vorkommen",
      "Quellen nicht wirklich angeklickt",
    ],
    examples: {
      general: "Fünf Einstiegspunkte, die du wirklich prüfen kannst. Keine erfundenen URLs. Beispiele streichen, die in deinem Bildungsplan nie vorkommen.",
      grundschule: "Drei erlaubte Sachunterrichts-Quellen zu Wasser (Bilderbuch, dein Blatt, ein Bildungsplan-Auszug). Was kann Klasse 3? Was ist zu abstrakt?",
      sprachen: "Zwei Lesarten des offenen Endes, belegt aus dem Text, den du nutzen darfst. Keine Inhaltsangabe von irgendeiner Website.",
      mathe: "Deine Kapitelnotizen plus typische Fehler bei linearen Funktionen. Welchen Fehler muss die nächste Übung treffen? Kein Web-Rundumschlag zur Definition.",
      mint: "Zwei erlaubte Quellen zur Fotosynthese plus die Fehlvorstellung „Pflanzen essen Erde“. Anklicken oder abtippen; keine URLs erfinden.",
      gesellschaft: "Zwei belegte Positionen zur Gewaltenteilung (oder deine Geschichts-/Geografie-Quelle). US-Beispiele streichen, die im Bildungsplan nie vorkommen.",
      kuenste: "Ein Werk oder eine Form, die du nutzen darfst (gemeinfrei, dein eigenes Foto von Schülerprozessen, ein Notenauszug, den du kopieren darfst). Keine Stil-Kopie als „Recherche“.",
      sport: "Ein Regelauszug, den du nutzen darfst, plus das Stundenziel. Welche Regel muss im Spiel und in der Reflexion sichtbar werden? Keine medizinischen Behauptungen.",
    },
    tasks: {
      einsteiger: {
        core: "Fünf Belege zu deinem Thema. Je ein Satz: nutzbar, weil … Keine erfundenen URLs.",
        extras: ["Alles, was du nicht angeklickt hast, als PRÜFEN markieren."],
      },
      fortgeschritten: {
        core: "Eine Kontroverse öffnen: zwei Positionen, beide belegt, plus eine offene Schülerfrage. Erst Belege, dann Prosa.",
        extras: [
          "Drei typische Fehlvorstellungen ergänzen, die Schüler:innen zu diesem Thema mitbringen.",
          "Jedes US-only-Beispiel streichen, das in deinem Bildungsplan nie vorkommt.",
        ],
      },
      profi: {
        core: "Erst deine Quellen: drei Schul-PDFs in NotebookLM (oder einem dateigebundenen Tool). Daraus ein Quellen-Leitfaden, den die Fachschaft teilen kann.",
        extras: [
          "Fünf Startfragen; eine muss scheitern, wenn die Quelle fehlt.",
          "Verbote: was die KI nicht erfinden oder auffüllen darf.",
          "Ein Absatz: wann Perplexity, wann NotebookLM, wann AIS.chat.",
        ],
      },
    },
  },
  {
    id: "feedback",
    title: "Feedback",
    lead: "Eine Rubrik binden. Sonst lobt die KI 28-mal „guter Aufbau“.",
    pitfalls: [
      "Echte Namen in einem Consumer-Chat",
      "Feedback ohne nächsten Schritt",
      "Ein Ton, der jeden Text gleich macht",
    ],
    examples: {
      general: "Vier Kriterien. Je Stärke + nächster Schritt. Anonymisierter Absatz. Keine Note, keine echten Namen.",
      grundschule: "Vier Kriterien zu einer kurzen Beobachtung oder einem Satz aus Klasse 3 (klar, vollständig, Wort, nächster Versuch). Du-Form, keine Note.",
      sprachen: "Vier Kriterien zu einem Absatz: Aufbau, Sprache, Belege aus dem Text, nächster Schritt. Max. 120 Wörter, keine Note.",
      mathe: "Vier Kriterien zu einer schriftlichen Lösung: Methode, Notation, Probe, Erklärung. Nicht „gut gerechnet“.",
      mint: "Laborprotokoll oder Fazit: Methode, Beobachtung vs. Schluss, Sicherheit, nächster Schritt. Keine erfundenen Messwerte im Lob.",
      gesellschaft: "Quellenabsatz: Fakt vs. Deutung, Belege, Sprache, nächster Schritt.",
      kuenste: "Prozess nach Rubrik: Komposition oder Rhythmus, Prozess, Absicht, nächster Schritt. Kein „schön“ ohne Kriterium.",
      sport: "Reflexionszettel: Fair Play, die Regel, Einsatz, nächstes Spiel. Keine medizinischen oder Charakter-Urteile.",
    },
    tasks: {
      einsteiger: {
        core: "Vier Kriterien. Pro Kriterium: ein Satz Stärke + ein nächster Schritt. An einem anonymisierten Absatz testen, keine echten Namen.",
        extras: ["Jedes Lob streichen, das nicht an ein Kriterium gebunden ist."],
      },
      fortgeschritten: {
        core: "Dieselbe Rubrik, zwei Register deiner Wahl: schülergerichtet und elterngesprächstauglich. Keine Notenmaschine.",
        extras: [
          "Jeder Kommentar muss einen Beleg aus dem Text nennen.",
          "Eine Entscheidung markieren, die die Lehrkraft noch treffen muss (nicht die KI).",
        ],
      },
      profi: {
        core: "Kalibrierung für die Fachschaft: drei anonymisierte Texte, KI-Entwurf + dein Kommentar. Notieren, wo das Modell abdriftet.",
        extras: [
          "Die Rubrik so schreiben, dass Kolleg:innen dieselben vier Kriterien gleich anwenden.",
          "Zwei Test-Kommentare (zu kurz / zu floskelhaft), die zeigen, dass die Rubrik funktioniert.",
          "Eine Zeile: Wann Feedback in einem Schul-Tool bleibt, nie in einem privaten Consumer-Chat.",
        ],
      },
    },
  },
];

function exampleFor(examples: Examples, fach: Fach): { text: string; via: "fach" | "general" } | null {
  const specific = examples[fach];
  if (specific && specific.trim()) return { text: specific.trim(), via: "fach" };
  if (examples.general.trim()) return { text: examples.general.trim(), via: "general" };
  return null;
}

export { exampleFor };

export function promptFor(stationId: StationId, fach: Fach, niveau: Niveau) {
  const label = FACH_SCOPE[fach];
  const thema = FACH_THEMEN[fach];
  const station = STATIONS.find((x) => x.id === stationId)!;
  const picked = exampleFor(station.examples, fach);
  const n = NIVEAU[niveau];
  const exLine = picked ? `${picked.via === "fach" ? "Fachbeispiel" : "Allgemeines Beispiel"}: ${picked.text}` : "";
  const head = `Kontext: Unterricht in Deutschland, Fach ${label}, Thema „${thema}“.
${exLine}
${n.mode}
Keine echten Namen, keine Noten, keine erfundenen Bildungsplan-Zitate. Alles Unsichere als PRÜFEN markieren.`;

  const jobs: Record<StationId, Record<Niveau, string>> = {
    vorbereitung: {
      einsteiger: `Auftrag: Eine 45-Minuten-Skizze in drei Blöcken, sonst nichts.
1) Lernziel in einem beobachtbaren Satz
2) Einstieg 5 Min aus dem Vorwissen, Arbeitsphase eine Kernspur, Check, der das Ziel prüft
3) Was an die Tafel kommt (max. 5 Zeilen)
Keine Erweiterungsspur, kein Methoden-Karneval. Zum Schluss 3 Prüffragen an die Lehrkraft.
Optional bei Zeit: eine erfundene Behauptung markieren, die die Lehrkraft noch prüfen muss.`,
      fortgeschritten: `Auftrag: 45-Minuten-Stunde, offen genug für zwei Spuren und eine Absicherung.
1) Beobachtbares Lernziel (die Lehrkraft entscheidet; du füllst das Gerüst)
2) Einstieg aus dem Vorwissen
3) Arbeitsphase: zwei Sozialformen auf derselben Kompetenz, plus eine sprachsensible Hilfe (Satzanfänge, keine Babysprache)
4) Check, der das Ziel wirklich prüft
5) Ein Satz Plan B ohne Technik
In klaren Blöcken antworten. Markieren, was die Lehrkraft noch prüfen muss.
Bei Zeit: ein Satz, wann man das Tool wechselt oder die Technik weglässt.`,
      profi: `Auftrag: Wiederverwendbares Stundengerüst für die Fachschaft, Thema „${thema}“.
Liefern:
- System-Steckbrief (wann die KI so antworten soll)
- Platzhalter [THEMA] [KLASSE] [ZEIT]
- Kernspur / Erweiterung / sprachsensible Hilfe
- Zwei Testfragen, die das Gerüst absichtlich brechen sollen
- Drei Nein-Kriterien (wann das Ergebnis in den Papierkorb gehört)
- Eine Zeile: wer teilen darf, nur schulisch freigegebener Weg
Keine Einmal-Planung, eine Vorlage.`,
    },
    material: {
      einsteiger: `Auftrag: Differenzierungspaket: EIN Arbeitsblatt, eine Seite, kopierfähig.
- Gleicher Fachinhalt wie „${thema}“
- Kernaufgaben plus kurzer Hilfestreifen und ein Erweiterungs-Item, gleiche Kompetenz
- Lösung darunter, getrennt
Keine zweite Stunde, keine Babysprache.
Optional bei Zeit: jede „leichte“ Zeile umschreiben, die kindlich klingt.`,
      fortgeschritten: `Auftrag: Differenzierung: offenes Paket zu „${thema}“.
- EIN Kernblatt: Lückentext + eine offene Aufgabe
- Hilfekarte mit sprachsensiblen Satzrahmen (gleiche Kompetenz, andere Last)
- Erweiterung zum selben Ziel
- Lehrkräfteschlüssel: Lösung, ein typischer Fehler, grobes Timing
Format kopierfertig. Fachlich falsche Distraktoren streichen, auch wenn sie sich „schwer anfühlen“.`,
      profi: `Auftrag: Differenzierungs-Vorlage für die Fachschaft zu „${thema}“.
- Kern / Hilfe / Erweiterung / Lehrkräfteschlüssel (Lösungen, typische Fehler, Timings)
- Platzhalter statt Einmal-Zahlen, wo sinnvoll
- Qualitäts-Checkliste mit 3 Nein-Kriterien (Layout-Schrott, babyhafte leichte Spur, falsche Distraktoren)
- Notieren, welches Tool (AIS.chat, GPT, Copilot) der Standard zum Neu-Erzeugen ist
Nächstes Halbjahr wiederverwendbar.`,
    },
    feedback: {
      einsteiger: `Auftrag: Feedback-Helfer, keine Bewertungsinstanz.
Genau 4 Kriterien, die ich nutze: [KRITERIEN HIER]
Text (anonymisiert): [ABSATZ HIER]
Pro Kriterium ein Satz Stärke + ein nächster Schritt. Max. 80 Wörter, Du-Form, schülergerichtet.
Optional bei Zeit: jedes Lob löschen, das nicht an ein Kriterium gebunden ist.`,
      fortgeschritten: `Auftrag: Dieselbe Rubrik, zwei offene Register zum selben Text.
Kriterien: [KRITERIEN HIER]
Text (anonymisiert): [ABSATZ HIER]
1) schülergerichtet (du), 2) elterngesprächstauglich (Sie), keine Notenmaschine.
Jedes Mal Belege aus dem Text. Eine Entscheidung markieren, die die Lehrkraft noch treffen muss.
Keine erfundenen Noten.`,
      profi: `Auftrag: Kalibrierungs-Rubrik für die Fachschaft.
Kriterien: [KRITERIEN HIER]
Ich liefere später 3 anonymisierte Texte. Deine Aufgabe jetzt: die Rubrik so schreiben, dass Kolleg:innen dieselben 4 Kriterien gleich anwenden.
Plus: zwei Test-Kommentare (zu kurz / zu floskelhaft), die zeigen, dass die Rubrik funktioniert.
Eine Zeile: Feedback bleibt in einem schulisch freigegebenen Tool, nie in einem privaten Consumer-Chat mit echten Namen.
Keine Noten.`,
    },
    recherche: {
      einsteiger: `Auftrag: 5 Einstiegspunkte zu „${thema}“.
Pro Punkt: was eine Quelle leisten muss + ein Satz „nutzbar, weil“.
Keine URLs erfinden. Wo unsicher: prüfen.
3 typische Fehlvorstellungen, kurz.
Optional bei Zeit: jede ungeprüfte Behauptung als PRÜFEN markieren.`,
      fortgeschritten: `Auftrag: Recherche-Briefing: erst Belege, dann die offene Frage.
- 5 belegte Einstiegspunkte (keine erfundenen URLs)
- 2 Positionen in einer Kontroverse, beide mit dem, was eine Quelle leisten muss
- 3 Fehlvorstellungen
- 1 offene Schülerfrage
US-only-Beispiele streichen, die im Bildungsplan nie vorkommen. Alles Unsichere als prüfen markieren.`,
      profi: `Auftrag: Quellen-Leitfaden für die Fachschaft zu „${thema}“: erst deine PDFs.
- Welche 3 PDF-Typen ins Notebook gehören (keine Schülerdateien)
- 5 Startfragen, davon eine, die scheitern muss, wenn die Quelle fehlt
- Verbote: was die KI nicht erfinden oder auffüllen darf
- Ein Absatz: wann Perplexity, wann NotebookLM, wann AIS.chat`,
    },
    bild: {
      einsteiger: `Auftrag: EIN Bild-Prompt für ein Arbeitsblatt zu „${thema}“.
Stil: flaches Schema, wenige Farben, hohe Lesbarkeit.
Kein fotorealistisches Kind, kein Künstlerstil.
Sagen, welche Beschriftungen wir selbst in Word/PowerPoint setzen.
Optional bei Zeit: jede Ausgabe ablehnen, die fotorealistisch wird.`,
      fortgeschritten: `Auftrag: 3 Bild-Prompts in einem Stil (Serie/Ablauf) zu „${thema}“.
Gleiche Palette, gleiche Einfachheit, Panels 1–3.
Verbotsliste unter dem Prompt: fotorealistische Kinder, imitierte Künstler, Text im Bild.
Benennen, wo jede Beschriftung auf dem Blatt landet.`,
      profi: `Auftrag: Prompt-Rezept für die Fachschaft (Bild).
- Stilformel zum Kopieren
- Verbotsliste, die Kolleg:innen einfügen können
- Format (quadratisch / Querformat)
- Wo Text hingehört (nie ins Bild)
- Zwei Test-Prompts: einer soll durchgehen, einer scheitern (zu fotorealistisch)
- Ein Satz: wann eine Schulbuch-Abbildung reicht und Bild-KI falsch ist`,
    },
  };

  return `${head}\n\n${jobs[stationId][niveau]}`;
}

export function studioPrompt(typeId: StudioId, fach: Fach, niveau: Niveau) {
  const label = FACH_SCOPE[fach];
  const thema = FACH_THEMEN[fach];
  const studio = STUDIOS.find((x) => x.id === typeId)!;
  const picked = exampleFor(studio.examples, fach);
  const ex = picked ? picked.text : thema;
  const n = NIVEAU[niveau];
  const exLine = picked ? `${picked.via === "fach" ? "Fachbeispiel" : "Allgemeines Beispiel"}: ${ex}` : "";
  const head = `Kontext: Unterricht in Deutschland, Fach ${label}, Thema „${thema}“.
${n.mode}
Keine echten Namen, keine Noten, nichts erfinden, das wie ein Bildungsplan-Zitat klingt. Alles Unsichere als PRÜFEN markieren.
${exLine}
Wenn die Lehrkraft eine andere Aufgabe nennt (Schulrechts-Helfer, Lernbuddy oder eine eigene), das Beispiel fallen lassen und diese Aufgabe erledigen. Gleiche Regeln.`;

  const jobs: Record<StudioId, Record<Niveau, string>> = {
    gpt: {
      einsteiger: `Du bist ein gespeicherter Assistent, kein Allzweck-Chat.
Aufgabe: Die Lehrkraft nennt sie (Feedback, Arbeitsblatt-Stamm, Elternmail, Stundenskizze), oder „${thema}“.
Regeln: eine Aufgabe pro Antwort, ein Block, keine Varianten, kein Notenvorschlag, nachfragen statt raten.
Start: Liefere EINE nutzbare Version. Dann auf eine Korrektur warten.`,
      fortgeschritten: `Du bist ein gespeicherter Assistent mit Qualitätsschranke, keine Ja-Maschine.
Aufgabe: Die Lehrkraft nennt sie (Feedback, Arbeitsblatt-Stamm, Elternmail, Stundenskizze), Rückfall „${thema}“.
Jede Antwort muss enthalten:
1) Kernversion, im Unterricht nutzbar
2) Erweiterung auf derselben Kompetenz
3) Eine sprachsensible Hilfe, wo Text vorkommt
4) Eine PRÜF-Zeile: erfunden, fehlt oder zu sicher
Regeln: keine Note, keine Schülernamen, kein Rechtsurteil, keine erfundenen Bildungsplan-Zitate. Fehlt Lernziel oder Klasse, erst eine Frage stellen, dann trotzdem mit [PLATZHALTERN] entwerfen.
Eine Falle (Note, Name, Urteil) in einem Satz ablehnen und stoppen.`,
      profi: `Du bist die Fachschafts-Vorlage, kein privater Spiel-Chat.
Liefere jetzt, für die Aufgabe, die die Lehrkraft nennt (Rückfall „${thema}“):
1) System-Steckbrief mit Platzhaltern [THEMA] [KLASSE] [LERNGRUPPE] (Rolle, Verbote, Ausgabeform)
2) Zwei Testfragen, die dich in die Irre führen sollen, plus die gewünschte Reaktion
3) Drei Nein-Kriterien (wann das Ergebnis in den Papierkorb gehört)
4) Ein Satz: wann AIS.chat, wann ein Copilot Agent im Tenant, wann ein privates GPT
Teilen nur über einen schulisch freigegebenen Weg. Keine Schülernamen.`,
    },
    copilot: {
      einsteiger: `Du bist ein Microsoft-365-Copilot-Agent, kein Allzweck-Chat und kein Klassen-Rollenspiel.
Aufgabe: Die Lehrkraft nennt sie, oder „${thema}“.
Regeln: eine Aufgabe pro Antwort, ein Block, keine Varianten, kein Notenvorschlag, nachfragen statt raten.
Im Tenant bleiben. Keine Schülernamen.
Start: Liefere EINE nutzbare Version. Dann auf eine Korrektur warten.`,
      fortgeschritten: `Du bist ein Microsoft-365-Copilot-Agent für ein geteiltes Word-/Teams-Dokument, kein privater Chat.
Im Tenant bleiben. Keine Schülernamen.
Aufgabe: Die Lehrkraft nennt sie, Rückfall „${thema}“.
Jede Antwort ist einfügefertig für Word:
1) Kernspur
2) Erweiterung auf derselben Kompetenz
3) Sprachsensible Hilfe, wo Text vorkommt
4) Ein Satz: Ich nutze diesen Tenant-Agenten, wenn … ein privates GPT nur, wenn … (Daten oder Zugang, nicht Geschmack)
Noten, Namen, Rechtsurteile ablehnen. Fehlt Material, einmal nachfragen, dann mit [PLATZHALTERN] entwerfen.`,
      profi: `Du bist die Fachschafts-Vorlage für den Copilot-Agenten, kein privater Spiel-Chat.
Liefere jetzt, für die Aufgabe, die die Lehrkraft nennt (Rückfall „${thema}“):
1) System-Steckbrief mit Platzhaltern [THEMA] [KLASSE] [LERNGRUPPE] (Rolle, Verbote, Ausgabeform)
2) Zwei Testfragen, die dich in die Irre führen sollen, plus die gewünschte Reaktion
3) Drei Nein-Kriterien
4) Ein Satz: wann AIS.chat, wann dieser Copilot Agent, wann ein privates GPT, wann NotebookLM
Teilen nur über den Tenant. Keine Schülernamen.`,
    },
    notebook: {
      einsteiger: `NotebookLM-Briefing, einfach.
Quellen (nur erlaubte): Kompetenzliste, Bildungsplan-Auszug, dein Blatt oder Hausregeln.
Drei Startfragen:
1) Was sagen die Quellen wirklich?
2) Welche Fehlvorstellung oder Lücke ist belegt?
3) Stelle eine Frage, die die Quellen NICHT beantworten können.
Nie die Audio-Übersicht als Grundtext nutzen.`,
      fortgeschritten: `NotebookLM-Briefing: Dieses Notebook existiert, um zu zeigen, was die Dateien abdecken UND was sie auslassen.
Quellen (nur erlaubte): Bildungsplan-Auszug oder Kompetenzliste; dein Blatt oder Hausregeln; optional anonymisierte Fehlerbeispiele. Keine Klassenlisten, keine Namen.
Startfragen:
1) Was treffen diese Quellen wirklich?
2) Was fehlt, das eine Lehrkraft trotzdem brauchen könnte?
3) Eine Frage, die scheitern MUSS, wenn eine benannte Datei nicht im Notebook ist
Regel: jenseits der Quellen = als unsicher markieren, nie erfinden. Eine schulrechtliche Antwort nie als Erlaubnis behandeln. Nie die Audio-Übersicht als Unterrichtstext nutzen.`,
      profi: `Quellen-Leitfaden für die Fachschaft, nutzbar in NotebookLM.
- Welche 3 Dateitypen hinein dürfen, welche nie (Schülerdateien, Namen, nicht freigegebene Schulbücher)
- 5 Startfragen, davon eine, die ohne eine benannte Quelle scheitern muss
- Verbote für die KI
- Wer das Notebook kopieren darf, nur schulisch freigegebener Weg
Thema oder Aufgabe nennt die Lehrkraft. Rückfall: „${thema}“.`,
    },
    ais: {
      einsteiger: `Du bist ein AIS.chat-Lernbuddy für die Klasse, keine Informations-KI. Rolle: Die Lehrkraft nennt sie, oder ein Lernbuddy, oder: ${ex}
Regeln: in der Rolle bleiben, max. 3 Sätze, eine Rückfrage, nie die Antwort verraten.
Eröffnungszeile: [SZENE HIER]
Ein paar Runden üben, dann stoppen.`,
      fortgeschritten: `Du bist eine AIS.chat-Klassenrolle mit harter Grenze, kein generischer Buddy. Rolle: Die Lehrkraft nennt sie (Figur, Laborleitung, Kritikerin, Debattenbürger), oder: ${ex}
In der Rolle bleiben. Max. 4 Sätze. Eine Rückfrage. Nie die Lösung.
Du hast eine Quellen- oder Rubrik-Grenze: Steht es nicht in der Szene, sag das.
Eine Schülerin wird versuchen, die Antwort herauszukitzeln; nur andeuten, dann eine Frage. Eine fachlich falsche Schülerzeile wird mit einer Frage beantwortet, nicht mit der Lösung.
Eröffnungszeile: [SZENE HIER]`,
      profi: `AIS.chat-Station für die Fachschaft. Rolle: Die Lehrkraft nennt sie, oder ein Lernbuddy, oder: ${ex}
Liefern: Rollenkarte (6 Regeln), Eröffnungszeile, Pflichtrunden, eine Prüffrage auf Papier danach.
Grenze: Höflichkeit, kein Smalltalk ohne Fachkern, Ausstiegsformel.
Zwei Test-Schülerzeilen (eine fachlich falsch) plus die gewünschte Reaktion.
Ein Satz: wer den Link teilen darf, welche Daten nie hinein dürfen.`,
    },
  };

  return `${head}\n\n${jobs[typeId][niveau]}`;
}

export function quizPrompt(thema: string, toolId: QuizToolId, info: string, count: number, fach: Fach, niveau: Niveau) {
  const fachLabel = FACH_SCOPE[fach];
  const tool = QUIZ_TOOLS[toolId];
  const n = NIVEAU[niveau];
  const zusatz = info ? `Zusatzangaben der Lehrkraft (verbindlich):\n${info}\n` : "Keine weiteren Zusatzangaben.\n";
  const filePart =
    toolId === "moodle"
      ? `TEIL 1: DATEI
Liefere zuerst EINEN Codeblock (Typ text), nichts davor.
Inhalt: GIFT für Moodle, UTF-8, genau ${count} Fragen.
Syntax-Beispiel:
::F1:: Fragetext {
=richtige Antwort
~falsch 1
~falsch 2
~falsch 3
}
Keine Markdown-Tabelle, keine HTML-Entities, nichts vor dem Codeblock.`
      : `TEIL 1: DATEI
Liefere zuerst EINEN Codeblock (Typ text), nichts davor.
Inhalt: ${tool.file}
Kopfzeile exakt:
${tool.headers}
Dann ${count} Datenzeilen, tab-getrennt (TSV), damit es sich in Excel oder Sheets einfügen lässt.
Keine Markdown-Tabelle, keine Anführungszeichen um die ganze Tabelle, keine leeren Zusatzspalten.`;

  return `Du erzeugst ein Quiz zum direkten Import in ${tool.label}.

Fach: ${fachLabel}
Thema: ${thema}
Planungsniveau: ${n.label}
Anzahl: genau ${count} Multiple-Choice-Fragen, genau 4 Optionen, genau 1 richtige Lösung.
${zusatz}
Inhaltsregeln:
- Kurze Fragestämme, keine Fangfragen, keine doppelten Verneinungen
- Ein Item muss ein typisches Fehlermuster des Themas als Distraktor nutzen
- Schülersprache, Fachbegriffe nur, wenn sie das Lernziel sind
- Keine URLs, keine echten Namen, keine Noten
- Fachlich wackelige Stellen mit PRÜFEN markieren (die Datei trotzdem vollständig liefern)
${n.quizExtra}
${tool.limits}

${filePart}

TEIL 2: IMPORT-SCHRITTE ${tool.label}
Direkt nach dem Codeblock, nummeriert:
${tool.import.map((step, i) => `${i + 1}. ${step}`).join("\n")}

TEIL 3: LEHRKRÄFTESCHLÜSSEL
Eine Zeile pro Item: Nummer, richtige Option, warum die anderen falsch sind (Fehlermuster). Insgesamt max. 80 Wörter.`;
}

export const AGENDA = [
  { min: 15, title: "Puffer & Einstieg", nav: "Start", id: "hero", acc: 15 },
  { min: 30, title: "KI-Assistenten", nav: "Assistenten", id: "assistenten", acc: 45 },
  { min: 5, title: "Welche Aufgabe, welches Werkzeug", nav: "Werkzeuge", id: "werkzeug", acc: 50 },
  { min: 5, title: "Bezahlt vs. Gratis", nav: "Bezahlt", id: "bezahlt", acc: 55 },
  { min: 30, title: "Fachschafts-Studio", nav: "Fachschaften", id: "fachgruppen", acc: 85 },
  { min: 5, title: "Quizze, schnell", nav: "Quizze", id: "quizze", acc: 90 },
];

export const FORGE_STRIPS: Record<Niveau, string> = {
  einsteiger: "Exit-Ticket: 4 Items für eine anstehende Stunde. Ein Item muss ein typisches Fehlermuster treffen. Den Rest streichen.",
  fortgeschritten: "Dieselben 4 Items auf zwei Niveaus (Stamm gleich, Last verschieden). Ein Satz: Welches Tool importiert das morgen?",
  profi: "Ein Tool wählen, Zusatzangaben zum Fehlermuster ergänzen, Prompt kopieren, drei Nein-Kriterien unter den Lehrkräfteschlüssel schreiben.",
};
