"use client";

import Link from "next/link";
import { useMemo, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBook,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconBulb,
  IconPlayerPlay,
  IconPuzzle,
  IconRocket,
  IconExternalLink,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";
import { Bungee, Press_Start_2P, Space_Mono } from "next/font/google";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

const displayFont = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

/* ─── Types ─── */

type DimensionId = "ueber" | "durch" | "mit" | "trotz";

type KnowledgeBlock = {
  title: string;
  content: string;
  example: string;
  takeaway: string;
};

type InteractiveExercise = {
  instruction: string;
  categoryA: string;
  categoryB: string;
  items: Array<{ id: string; label: string; correctCategory: "A" | "B" }>;
  successMessage: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: Array<{ id: string; label: string; correct: boolean }>;
  explanation: string;
};

type InteractiveTool = {
  title: string;
  description: string;
  url: string;
  label: string;
};

type TutorialConfig = {
  id: DimensionId;
  title: string;
  subtitle: string;
  focusQuestion: string;
  introText: string;
  videoUrl: string;
  knowledgeBlocks: KnowledgeBlock[];
  exercise: InteractiveExercise;
  quizQuestions: QuizQuestion[];
  interactiveTools?: InteractiveTool[];
  challengeSummary: string;
};

/* ─── Tutorial Content ─── */

const TUTORIALS: Record<DimensionId, TutorialConfig> = {
  ueber: {
    id: "ueber",
    title: "Tutorial: Lernen über KI",
    subtitle: "Systemverständnis, Grenzen, Verantwortung",
    focusQuestion:
      "Wie funktioniert KI wirklich — und wo liegen die Grenzen, die jede Lehrkraft kennen muss?",
    introText:
      "Künstliche Intelligenz ist kein Zaubertrick, sondern angewandte Statistik. In diesem Tutorial baust du ein belastbares Verständnis auf: Wie erkennt KI Muster? Warum klingt sie überzeugend, ohne zu verstehen? Und welche Konsequenzen hat das für den Unterricht? Diese Grundlagen sind unverzichtbar, bevor KI didaktisch eingesetzt wird.",
    videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
    knowledgeBlocks: [
      {
        title: "Mustererkennung statt Verstehen",
        content:
          "KI-Systeme erkennen statistische Muster in großen Datenmengen. Ein Sprachmodell wie GPT wurde mit Milliarden von Texten trainiert und lernt dabei, welche Wörter wahrscheinlich aufeinander folgen. Es versteht weder Bedeutung noch Kontext — es berechnet Wahrscheinlichkeiten. Das ist fundamental anders als menschliches Denken, auch wenn die Ausgaben täuschend menschlich wirken können.",
        example:
          "Wenn du ein Sprachmodell fragst 'Was ist die Hauptstadt von Frankreich?', durchsucht es keine Datenbank. Es hat gelernt, dass nach diesem Satzmuster sehr wahrscheinlich 'Paris' folgt — weil das in den Trainingsdaten millionenfach so vorkam.",
        takeaway:
          "KI erkennt Muster, versteht aber nicht. Plausibilität ist kein Beweis für Korrektheit.",
      },
      {
        title: "Token-Vorhersage: Der Motor der Sprachmodelle",
        content:
          "Große Sprachmodelle arbeiten mit einem einfachen Prinzip: Sie sagen das nächste Token (Wortfragment) vorher. Jede Antwort entsteht Token für Token, wobei jedes neue Token von allen vorherigen abhängt. Das Modell wählt dabei nicht die 'richtige' Antwort, sondern die statistisch wahrscheinlichste Fortsetzung. Deshalb können unterschiedliche Durchläufe verschiedene Antworten produzieren — das System ist probabilistisch, nicht deterministisch.",
        example:
          "Der Satz 'Der Lehrer betritt das ...' wird vom Modell wahrscheinlich mit 'Klassenzimmer' ergänzt. Aber es könnte auch 'Lehrerzimmer', 'Gebäude' oder sogar 'Schlachtfeld' sagen — je nach Kontext und Zufallsfaktor (Temperature-Einstellung).",
        takeaway:
          "Sprachmodelle erzeugen wahrscheinliche Fortsetzungen, keine gesicherten Fakten.",
      },
      {
        title: "Halluzination, Bias und fehlende Welterkenntnis",
        content:
          "KI 'halluziniert', wenn sie plausibel klingende, aber falsche Informationen generiert — etwa erfundene Quellenangaben oder falsche Jahreszahlen. Bias entsteht, wenn die Trainingsdaten systematische Verzerrungen enthalten (z.B. Geschlechter-Stereotype in Berufsbezeichnungen). Zusätzlich fehlt KI jegliche Welterkenntnis: Sie hat kein Zeitgefühl, keine Sinneserfahrung und kann nicht zwischen Fiktion und Realität unterscheiden. All das sind keine Ausnahmen, sondern strukturelle Eigenschaften.",
        example:
          "Ein Sprachmodell kann einen überzeugenden Literaturhinweis generieren — mit Autor, Titel, Verlag und ISBN. Beim Nachprüfen stellt sich heraus: Das Buch existiert nicht. Die KI hat ein 'typisches' Literaturverzeichnis-Muster reproduziert.",
        takeaway:
          "Halluzination und Bias sind keine Bugs, sondern systemische Eigenschaften. Jede KI-Ausgabe braucht professionelle Prüfung.",
      },
      {
        title: "KI-Kategorien: Von schwacher KI bis Superintelligenz",
        content:
          "KI ist nicht gleich KI. Heute existiert ausschließlich schwache KI (Weak AI): Systeme, die auf spezifische Aufgaben spezialisiert sind — Bilderkennung, Textgenerierung, Sprachübersetzung. Starke KI (Strong AI), ein System mit allgemeiner menschenähnlicher Intelligenz, existiert bislang nur als Forschungsvision. Superintelligenz — KI, die menschliche Intelligenz in allen Bereichen übertrifft — ist reine Hypothese. Diese Unterscheidung ist wichtig, weil die öffentliche Debatte oft Fähigkeiten schwacher KI mit Szenarien starker KI vermischt.",
        example:
          "ChatGPT ist schwache KI: Es kann beeindruckend Texte generieren, aber es kann weder ein Bild riechen noch ein physisches Experiment durchführen. Es ist ein Spezialist für Sprachverarbeitung — kein universeller Denker.",
        takeaway:
          "Alle heutigen KI-Systeme sind schwache KI. Die Unterscheidung hilft, überzogene Erwartungen und Ängste einzuordnen.",
      },
      {
        title: "Maschinelles Lernen: Der Feedback-Loop",
        content:
          "Maschinelles Lernen (ML) ist der Motor hinter moderner KI. Das Grundprinzip: Ein neuronales Netzwerk erhält Trainingsdaten, trifft Vorhersagen, vergleicht sie mit den erwarteten Ergebnissen und passt seine internen Gewichtungen an — ein kontinuierlicher Feedback-Loop. Bei Sprachmodellen bedeutet das: Das System liest Milliarden von Sätzen und lernt durch wiederholte Fehlerkorrektur, welche Wortfolgen wahrscheinlich sind. Je mehr Daten und Rechenleistung, desto besser die Vorhersagen — aber nicht das Verständnis.",
        example:
          "Stell dir vor, du übst Vokabeln mit Karteikarten. Nach jeder falschen Antwort wird die Karte wieder einsortiert. Mit der Zeit wirst du besser — nicht weil du die Sprache 'verstehst', sondern weil du die Muster gelernt hast. Ähnlich funktioniert ML: Training durch Wiederholung und Fehlerkorrektur.",
        takeaway:
          "ML lernt durch Daten und Feedback-Loops. Mehr Daten verbessern die Vorhersagen, aber nicht das Verständnis.",
      },
    ],
    exercise: {
      instruction:
        "Sortiere die folgenden Aussagen: Was kann KI tatsächlich leisten und was nicht? Ziehe jede Aussage in die richtige Kategorie.",
      categoryA: "KI kann das",
      categoryB: "KI kann das nicht",
      items: [
        { id: "e1", label: "Muster in großen Datenmengen erkennen", correctCategory: "A" },
        { id: "e2", label: "Bedeutung von Texten wirklich verstehen", correctCategory: "B" },
        { id: "e3", label: "Wahrscheinliche Wortfolgen vorhersagen", correctCategory: "A" },
        { id: "e4", label: "Zwischen Fiktion und Realität unterscheiden", correctCategory: "B" },
        { id: "e5", label: "Texte in verschiedenen Stilen generieren", correctCategory: "A" },
        { id: "e6", label: "Eigene Fehler selbstständig erkennen und korrigieren", correctCategory: "B" },
        { id: "e7", label: "Bilder nach Beschreibungen erzeugen", correctCategory: "A" },
        { id: "e8", label: "Moralische Urteile begründet fällen", correctCategory: "B" },
        { id: "e9", label: "Allgemeine Intelligenz wie ein Mensch besitzen", correctCategory: "B" },
        { id: "e10", label: "Aus großen Datenmengen statistische Zusammenhänge lernen", correctCategory: "A" },
      ],
      successMessage:
        "Richtig! KI ist stark bei Mustererkennung und Generierung, aber sie versteht nicht, urteilt nicht und prüft sich nicht selbst. Alle heutigen KI-Systeme sind spezialisierte (schwache) KI.",
    },
    interactiveTools: [
      {
        title: "SoekiaGPT – Token-Vorhersage interaktiv erleben",
        description:
          "Eine webbasierte Lernumgebung, in der du nachvollziehen kannst, wie Trainingstexte zu Vorhersagen für das nächste Wort führen. Verändere gezielt die Datenbasis und Parameter und beobachte, wie sich Bias oder Halluzinationen ergeben.",
        url: "https://soekia.ch/GPT/",
        label: "SoekiaGPT ausprobieren",
      },
      {
        title: "Shannon-Experiment – Wie vorhersagbar ist Sprache?",
        description:
          "Versuche, Buchstabe für Buchstabe einen unbekannten Satz zu erraten. Dieses klassische Experiment von Claude Shannon (1951) zeigt: Sprache ist überraschend vorhersagbar — genau dieses Prinzip nutzen große Sprachmodelle für die Token-Vorhersage.",
        url: "https://www.deepdive-ki.de/intro_fb",
        label: "Zum Shannon-Experiment",
      },
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "Wie lernt ein großes Sprachmodell (LLM) während des Trainings?",
        options: [
          { id: "a", label: "Es speichert Fakten in einer Datenbank ab.", correct: false },
          {
            id: "b",
            label: "Es passt Gewichtungen an, um Vorhersagefehler zu minimieren.",
            correct: true,
          },
          { id: "c", label: "Es versteht Texte und merkt sich die Bedeutung.", correct: false },
        ],
        explanation:
          "Beim Training werden die Gewichtungen (Parameter) des Modells so angepasst, dass der Vorhersagefehler für das nächste Token minimiert wird. Es findet kein 'Verstehen' oder 'Abspeichern' von Fakten statt.",
      },
      {
        id: "q2",
        question:
          "Warum wird ein Sprachmodell manchmal als 'stochastischer Papagei' bezeichnet?",
        options: [
          {
            id: "a",
            label: "Weil es Sprachmuster reproduziert, ohne deren Bedeutung zu verstehen.",
            correct: true,
          },
          {
            id: "b",
            label: "Weil es nur vorgegebene Sätze wiederholen kann.",
            correct: false,
          },
          { id: "c", label: "Weil es absichtlich falsche Aussagen macht.", correct: false },
        ],
        explanation:
          "Der Begriff 'stochastischer Papagei' (Bender et al., 2021) beschreibt, dass Sprachmodelle statistisch gelernte Sprachmuster wiedergeben — überzeugend, aber ohne echtes Verständnis der Inhalte.",
      },
      {
        id: "q3",
        question: "Welche Konsequenz hat Bias in KI-Trainingsdaten für den Schulkontext?",
        options: [
          { id: "a", label: "Keine, weil KI neutral ist.", correct: false },
          {
            id: "b",
            label:
              "KI-Ausgaben können Stereotype reproduzieren und müssen kritisch geprüft werden.",
            correct: true,
          },
          {
            id: "c",
            label: "Bias betrifft nur englischsprachige Modelle.",
            correct: false,
          },
        ],
        explanation:
          "Wenn Trainingsdaten gesellschaftliche Verzerrungen enthalten (z.B. Geschlechter-Stereotype), reproduziert die KI diese systematisch. Im Schulkontext ist das besonders relevant, weil Lehrmaterialien inklusiv und diversitätssensibel sein müssen.",
      },
      {
        id: "q4",
        question: "Was beschreibt ein Token im Kontext von Sprachmodellen?",
        options: [
          { id: "a", label: "Ein komplettes Wort in einer bestimmten Sprache.", correct: false },
          {
            id: "b",
            label:
              "Ein Wortteil, Wort oder Zeichen — die kleinste Verarbeitungseinheit des Modells.",
            correct: true,
          },
          { id: "c", label: "Ein Sicherheitsschlüssel für den API-Zugang.", correct: false },
        ],
        explanation:
          "Tokens sind die Bausteine, mit denen Sprachmodelle arbeiten. Ein Token kann ein ganzes Wort, ein Wortteil oder sogar ein einzelnes Zeichen sein. Das Modell verarbeitet und erzeugt Text Token für Token.",
      },
      {
        id: "q5",
        question: "Welche Art von KI existiert heute tatsächlich?",
        options: [
          {
            id: "a",
            label: "Starke KI mit allgemeiner menschlicher Intelligenz.",
            correct: false,
          },
          {
            id: "b",
            label: "Schwache KI, die auf spezifische Aufgaben spezialisiert ist.",
            correct: true,
          },
          {
            id: "c",
            label: "Superintelligenz, die menschliches Denken übertrifft.",
            correct: false,
          },
        ],
        explanation:
          "Alle heutigen KI-Systeme — von ChatGPT bis zur Bilderkennung — sind schwache KI (Weak AI). Sie sind auf bestimmte Aufgaben spezialisiert. Starke KI und Superintelligenz sind bislang Forschungsvision bzw. Hypothese.",
      },
      {
        id: "q6",
        question: "Warum ist der Kontext bei einem Sprachmodell entscheidend?",
        options: [
          {
            id: "a",
            label: "Weil das Modell nur Texte in einer bestimmten Sprache verarbeitet.",
            correct: false,
          },
          {
            id: "b",
            label: "Weil der Kontext die Wahrscheinlichkeit der nächsten Tokens steuert.",
            correct: true,
          },
          {
            id: "c",
            label: "Weil ohne Kontext das Modell keine Internetverbindung hat.",
            correct: false,
          },
        ],
        explanation:
          "Der Kontext — also alle bisherigen Tokens in der Eingabe — bestimmt, welche Fortsetzungen das Modell als wahrscheinlich berechnet. Mehr und präziserer Kontext führt zu relevanteren Ausgaben.",
      },
    ],
    challengeSummary:
      "Du weißt jetzt, wie KI Muster erkennt, warum Sprachmodelle überzeugend klingen ohne zu verstehen, welche Risiken durch Halluzination und Bias entstehen, und wie du schwache KI von Science-Fiction unterscheidest. Du kennst den Feedback-Loop des Maschinellen Lernens und hast interaktive Tools zur Token-Vorhersage kennengelernt. In der Jump-&-Run-Challenge wendest du dieses Wissen an den Lernstationen an.",
  },

  durch: {
    id: "durch",
    title: "Tutorial: Lernen durch KI",
    subtitle: "KI als Lernsystem analysieren",
    focusQuestion:
      "Wie steuert KI Lernprozesse — und wo braucht es menschliche Verantwortung?",
    introText:
      "KI wird zunehmend als Feedbackgeberin, Tutorin und Lernbegleiterin eingesetzt. Aber wie gut ist KI-Feedback wirklich? Welche Logik steckt hinter adaptiven Systemen? Und wo bleibt die menschliche Steuerungsverantwortung? In diesem Tutorial analysierst du die Qualität von KI-gestütztem Lernen und entwickelst professionelle Bewertungskriterien.",
    videoUrl: "https://www.youtube-nocookie.com/embed/5sLYAQS9sWQ",
    knowledgeBlocks: [
      {
        title: "KI-Feedback: Zwischen Spezifität und Schablone",
        content:
          "KI kann in Sekundenschnelle Feedback zu Texten, Aufgaben und Lösungen generieren. Doch die Qualität variiert stark: Gutes Feedback ist kriterial, spezifisch und handlungsorientiert. KI-Feedback klingt oft professionell, bleibt aber häufig generisch — es wiederholt Muster aus Trainingsdaten, ohne den konkreten Lernstand des Schülers zu kennen. Die zentrale Frage ist: Hilft das Feedback beim nächsten Lernschritt oder bestätigt es nur, was schon offensichtlich ist?",
        example:
          "Ein Schüler reicht einen Aufsatz ein. Die KI lobt 'gute Struktur und klare Argumentation' — obwohl der Text kaum Belege enthält und die These vage bleibt. Das Feedback klingt positiv, führt aber nicht zum nächsten konkreten Verbesserungsschritt.",
        takeaway:
          "Professionelles Feedback ist spezifisch, kriterial und handlungsorientiert — nicht nur freundlich formuliert.",
      },
      {
        title: "Algorithmische Steuerung in adaptiven Systemen",
        content:
          "Adaptive Lernsysteme passen Schwierigkeit, Inhalte und Tempo automatisch an. Die zugrundeliegende Logik basiert auf Diagnosemodellen, die Lernende in Kategorien einordnen. Dabei treffen Algorithmen Vorauswahlen: Welche Aufgaben werden angezeigt? Welche Lernpfade empfohlen? Diese Entscheidungen sind oft unsichtbar und können bestimmte Lernwege systematisch bevorzugen oder ausschließen. Lehrkräfte müssen diese Steuerungslogik verstehen, um informierte Entscheidungen zu treffen.",
        example:
          "Ein adaptives Matheprogramm stuft einen Schüler nach zwei Fehlern bei Bruchrechnung als 'schwach' ein und bietet nur noch Grundaufgaben an. Die Diagnoselogik kennt aber nicht den Grund für die Fehler — vielleicht war es Unkonzentriertheit, nicht Unverständnis.",
        takeaway:
          "Adaptive Systeme steuern Lernwege nach algorithmischer Logik. Diese Logik muss für Lehrkräfte sichtbar und hinterfragbar sein.",
      },
      {
        title: "Menschliche Letztverantwortung",
        content:
          "Auch wenn KI diagnostiziert, adaptiert und Feedback gibt — die pädagogische Verantwortung bleibt bei der Lehrkraft. Das betrifft drei Ebenen: Erstens die Lernziele (Was soll gelernt werden?), zweitens die Bewertungskriterien (Was gilt als gute Leistung?) und drittens die ethische Dimension (Welche Daten werden erhoben und wie werden sie genutzt?). KI kann unterstützen, aber sie kann nicht verantworten.",
        example:
          "Eine KI-Plattform empfiehlt, einen Schüler in einen niedrigeren Kurs umzustufen, basierend auf Testergebnissen. Die Lehrkraft kennt aber den familiären Hintergrund und weiß, dass der Schüler gerade eine schwierige Phase durchlebt. Die menschliche Einschätzung korrigiert die algorithmische.",
        takeaway:
          "Lernziele, Bewertung und Verantwortung bleiben menschliche Aufgaben — KI liefert Daten, nicht Urteile.",
      },
      {
        title: "Das Feedback-Modell nach Hattie & Timperley",
        content:
          "Das meistzitierte Feedback-Modell der Bildungsforschung stammt von Hattie und Timperley (2007). Es definiert drei Leitfragen: 'Feed Up' (Wo will ich hin?), 'Feed Back' (Wo stehe ich?) und 'Feed Forward' (Was ist der nächste Schritt?). Zusätzlich unterscheidet es vier Feedback-Ebenen: Aufgabenebene (richtig/falsch), Prozessebene (Lernstrategien), Selbstregulationsebene (Metakognition) und Selbstebene ('Du bist toll!'). Die Selbstebene ist dabei am wenigsten lernwirksam — obwohl KI-Systeme besonders häufig genau dieses unspezifische Lob produzieren.",
        example:
          "Ein KI-Feedback wie 'Toller Text! Du hast das super gemacht!' operiert auf der Selbstebene — es klingt nett, enthält aber null aufgabenbezogene Information. Ein Feedback auf der Prozessebene wäre: 'Dein Argument wäre stärker, wenn du zuerst die Gegenposition darstellst und dann widerlegst.' Das gibt eine konkrete Strategie für den nächsten Schritt.",
        takeaway:
          "Lernwirksames Feedback beantwortet: Wo hin? Wo stehe ich? Was kommt als Nächstes? — nicht: 'Du bist toll!'",
      },
      {
        title: "Blooms 2-Sigma-Problem und KI-Tutoring",
        content:
          "Benjamin Bloom zeigte 1984, dass Schüler mit individuellem 1:1-Tutoring im Schnitt zwei Standardabweichungen besser abschneiden als Schüler im Klassenunterricht — der tutorierte Durchschnittsschüler übertrifft 98% der Klassengruppe. Das Problem: 1:1-Tutoring ist für Bildungssysteme nicht finanzierbar. KI-Tutoring-Systeme versprechen, diese Lücke zu schließen. Aktuelle Studien zeigen Effektstärken von 0,73 bis 1,3 Sigma — vielversprechend, aber noch nicht bei 2 Sigma. Wichtig: Blooms Effekt entstand nicht durch Tutoring allein, sondern durch die Kombination aus Tutoring, häufigem Feedback und mehr Lernzeit.",
        example:
          "Ein KI-Tutor wie Khanmigo (Khan Academy) nutzt den sokratischen Ansatz: Statt die Antwort zu geben, stellt er Gegenfragen ('Was passiert, wenn du beide Seiten der Gleichung durch 3 teilst?'). Das simuliert 1:1-Tutoring — aber ohne die menschliche Intuition, wann ein Schüler frustriert ist und Ermutigung statt einer weiteren Frage braucht.",
        takeaway:
          "KI-Tutoring schließt die 2-Sigma-Lücke teilweise, erreicht aber nicht die Wirkung menschlichen 1:1-Tutorings. Die Kombination ist entscheidend.",
      },
    ],
    exercise: {
      instruction:
        "Sortiere die Feedback-Beispiele: Welches Feedback ist spezifisch und professionell, welches ist generisch und oberflächlich?",
      categoryA: "Spezifisch & professionell",
      categoryB: "Generisch & oberflächlich",
      items: [
        {
          id: "e1",
          label: "Dein Argument in Absatz 2 braucht einen konkreten Beleg — z.B. eine Statistik oder ein Zitat.",
          correctCategory: "A",
        },
        { id: "e2", label: "Guter Text! Weiter so!", correctCategory: "B" },
        {
          id: "e3",
          label: "Die These ist klar formuliert, aber die Gegenposition fehlt. Ergänze eine alternative Sichtweise.",
          correctCategory: "A",
        },
        {
          id: "e4",
          label: "Du hast Verbesserungspotenzial in einigen Bereichen.",
          correctCategory: "B",
        },
        {
          id: "e5",
          label: "Die Überleitung zwischen Absatz 3 und 4 fehlt. Formuliere einen Satz, der beide Argumente verbindet.",
          correctCategory: "A",
        },
        {
          id: "e6",
          label: "Deine Arbeit zeigt Engagement und Kreativität.",
          correctCategory: "B",
        },
        {
          id: "e7",
          label: "Prüfe die Jahreszahl in Zeile 5 — die Quelle nennt 1989, nicht 1998.",
          correctCategory: "A",
        },
        { id: "e8", label: "Insgesamt eine solide Leistung.", correctCategory: "B" },
        {
          id: "e9",
          label: "Dein erster Absatz enthält eine starke These, aber der Beleg in Zeile 4 stützt sie nicht — wähle ein Beispiel, das Ursache und Wirkung zeigt.",
          correctCategory: "A",
        },
        { id: "e10", label: "Der Text hat Stärken und Schwächen.", correctCategory: "B" },
      ],
      successMessage:
        "Richtig! Professionelles Feedback benennt konkret, was zu verbessern ist und wie. Generisches Feedback klingt nett, führt aber nicht zum nächsten Lernschritt. Denk an Hattie & Timperley: Feed Up, Feed Back, Feed Forward!",
    },
    interactiveTools: [
      {
        title: "PEER AI Tutor – KI-Textfeedback live testen",
        description:
          "Kostenloser KI-Schreibtutor der TU München. Gib einen Schülertext ein und erhalte mehrstufiges Feedback: allgemeines Feedback, kriterienbasierte Rückmeldung und konkrete Verbesserungsvorschläge. Ideal zum Vergleich mit eigenem professionellem Feedback.",
        url: "https://peer-ai-tutor.streamlit.app/",
        label: "PEER ausprobieren",
      },
      {
        title: "FelloFish – KI-Feedback für die Schule",
        description:
          "DSGVO-konformes Feedback-Tool, bei dem Lehrkräfte Aufgabe und Bewertungskriterien definieren. Schüler reichen Texte ein und erhalten in Sekunden kriterienbasiertes KI-Feedback. Über 15.000 Lehrkräfte in Deutschland nutzen das Tool bereits.",
        url: "https://www.fellofish.com/",
        label: "FelloFish entdecken",
      },
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "Woran erkennt man, dass KI-Feedback professionell ist?",
        options: [
          {
            id: "a",
            label: "Es ist kriterial, spezifisch und zeigt den nächsten Lernschritt auf.",
            correct: true,
          },
          {
            id: "b",
            label: "Es ist möglichst lang und detailliert formuliert.",
            correct: false,
          },
          {
            id: "c",
            label: "Es motiviert den Lernenden mit Lob und Ermutigung.",
            correct: false,
          },
        ],
        explanation:
          "Professionelles Feedback erfüllt drei Kriterien: Es bezieht sich auf klare Standards (kriterial), benennt konkrete Stellen (spezifisch) und gibt eine Handlungsempfehlung (nächster Schritt). Länge und Motivation allein sind keine Qualitätsmerkmale.",
      },
      {
        id: "q2",
        question: "Warum muss die Steuerungslogik adaptiver Systeme transparent sein?",
        options: [
          { id: "a", label: "Weil das Interface besser aussieht.", correct: false },
          {
            id: "b",
            label:
              "Weil algorithmische Entscheidungen Lernwege einschränken können und Lehrkräfte dies prüfen müssen.",
            correct: true,
          },
          { id: "c", label: "Weil Eltern das fordern.", correct: false },
        ],
        explanation:
          "Adaptive Systeme treffen unsichtbare Entscheidungen über Lernpfade. Wenn Lehrkräfte diese Logik nicht kennen, können sie nicht beurteilen, ob die algorithmische Steuerung pädagogisch sinnvoll ist — oder ob sie Lernende systematisch benachteiligt.",
      },
      {
        id: "q3",
        question:
          "Welche Aufgabenverteilung zwischen Mensch und KI ist beim Lernen durch KI professionell?",
        options: [
          {
            id: "a",
            label: "KI übernimmt Diagnose und Feedback vollständig.",
            correct: false,
          },
          {
            id: "b",
            label:
              "KI liefert Daten und Vorschläge, der Mensch verantwortet Ziele, Bewertung und Entscheidungen.",
            correct: true,
          },
          {
            id: "c",
            label: "Der Mensch nutzt KI nur zur Zeitersparnis.",
            correct: false,
          },
        ],
        explanation:
          "Professionelles Lernen durch KI bedeutet: Die KI unterstützt mit Daten, Feedback und Adaptivität. Aber die Verantwortung für Lernziele, Bewertungskriterien und pädagogische Entscheidungen bleibt beim Menschen.",
      },
      {
        id: "q4",
        question:
          "Welche Feedback-Ebene nach Hattie & Timperley ist am WENIGSTEN lernwirksam?",
        options: [
          {
            id: "a",
            label: "Aufgabenebene: 'Du hast 3 von 5 Aufgaben richtig.'",
            correct: false,
          },
          {
            id: "b",
            label: "Prozessebene: 'Versuche, die Aufgabe mit einer Mindmap zu strukturieren.'",
            correct: false,
          },
          {
            id: "c",
            label: "Selbstebene: 'Du bist ein kluger Schüler!'",
            correct: true,
          },
        ],
        explanation:
          "Feedback auf der Selbstebene ('Du bist toll!') hat den geringsten Lerneffekt, weil es keine aufgabenbezogene Information enthält. Viele KI-Systeme neigen zu genau diesem unspezifischen Lob. Lernwirksames Feedback bezieht sich auf Aufgabe, Prozess oder Selbstregulation.",
      },
      {
        id: "q5",
        question: "Was besagt Blooms 2-Sigma-Problem in Bezug auf KI-Tutoring?",
        options: [
          {
            id: "a",
            label: "KI-Tutoren sind doppelt so effektiv wie menschliche Lehrkräfte.",
            correct: false,
          },
          {
            id: "b",
            label:
              "1:1-Tutoring führt zu massiven Leistungssteigerungen, ist aber zu teuer — KI könnte diese Lücke teilweise schließen.",
            correct: true,
          },
          {
            id: "c",
            label: "Nach 2 Stunden KI-Tutoring erreichen alle Schüler das gleiche Niveau.",
            correct: false,
          },
        ],
        explanation:
          "Bloom zeigte, dass tutorierte Schüler 98% der Klassen-Schüler übertreffen. Das Problem: 1:1-Tutoring ist nicht skalierbar. KI-Tutoren erreichen Effektstärken von 0,73-1,3 Sigma — vielversprechend, aber noch nicht auf dem Niveau menschlicher Tutoren.",
      },
      {
        id: "q6",
        question: "Was unterscheidet formatives von summativem KI-Feedback?",
        options: [
          {
            id: "a",
            label: "Formatives Feedback gibt es nur am Ende, summatives während des Lernens.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Formatives Feedback begleitet den Lernprozess und ermöglicht Überarbeitung; summatives Feedback bewertet das Endergebnis.",
            correct: true,
          },
          {
            id: "c",
            label: "Es gibt keinen Unterschied — beides bedeutet Bewertung.",
            correct: false,
          },
        ],
        explanation:
          "Formatives KI-Feedback unterstützt den Lernprozess: Schüler erhalten Rückmeldung während der Arbeit und können iterativ überarbeiten. Summatives Feedback bewertet nach Abschluss. Pädagogischer Konsens: Formatives Feedback ist lernwirksamer, weil es den nächsten Lernschritt aktiv unterstützt.",
      },
    ],
    challengeSummary:
      "Du kannst jetzt KI-Feedback mit dem Hattie-Timperley-Modell professionell bewerten, kennst Blooms 2-Sigma-Problem und die Grenzen von KI-Tutoring, und weißt, wo menschliche Verantwortung unverzichtbar bleibt. In der Challenge testest du dieses Wissen an den Lernstationen.",
  },

  mit: {
    id: "mit",
    title: "Tutorial: Lernen mit KI",
    subtitle: "Kooperation statt Delegation",
    focusQuestion:
      "Wie arbeiten Mensch und KI als Partner — transparent, reflektiert und mit klaren Rollen?",
    introText:
      "KI als Werkzeug einsetzen kann jeder. Aber KI als Ko-Kreationspartner professionell nutzen — das braucht Struktur, Transparenz und klare Rollenverteilung. In diesem Tutorial lernst du, wie Prompt-Iteration funktioniert, warum Dokumentation unverzichtbar ist und welche Governance-Regeln professionelle Ko-Kreation braucht.",
    videoUrl: "https://www.youtube-nocookie.com/embed/wjZofJX0v4M",
    knowledgeBlocks: [
      {
        title: "Ko-Kreation: Mehr als Copy-Paste",
        content:
          "Ko-Kreation mit KI bedeutet, dass Mensch und Maschine gemeinsam ein Produkt entwickeln — durch iteratives Verbessern, kritisches Prüfen und bewusstes Entscheiden. Der Unterschied zur bloßen Delegation: Bei Ko-Kreation bleibt der Mensch im Steuerungsprozess aktiv. Er definiert Ziele, bewertet Zwischenergebnisse, gibt gezielte Rückmeldung und entscheidet, was übernommen wird. Das Ergebnis ist ein gemeinsames Produkt, bei dem die Anteile klar benannt werden können.",
        example:
          "Eine Lehrkraft möchte eine Unterrichtsreihe zum Klimawandel erstellen. Statt einfach 'Erstelle eine Unterrichtsreihe' zu prompten, definiert sie zuerst Lernziele, lässt die KI einen Entwurf generieren, prüft ihn gegen ihre Kriterien, gibt gezieltes Feedback ('Mehr Schüleraktivierung in Phase 2') und überarbeitet iterativ — 4 Runden, bis das Ergebnis passt.",
        takeaway:
          "Ko-Kreation = iterativer Prozess mit menschlicher Steuerung. Delegation = Output ohne Prüfung übernehmen.",
      },
      {
        title: "Prompt-Iteration: Der Schlüssel zur Qualität",
        content:
          "Ein einzelner Prompt liefert selten das optimale Ergebnis. Professionelle KI-Nutzung arbeitet mit Iteration: Erster Prompt → Bewertung → Verfeinerter Prompt → Erneute Bewertung. Dabei wird jeder Schritt dokumentiert: Was wurde geändert? Warum? Was hat sich verbessert? Diese Dokumentation macht den Arbeitsprozess transparent und nachvollziehbar — ein zentrales Qualitätsmerkmal professioneller KI-Nutzung.",
        example:
          "Prompt 1: 'Erstelle Aufgaben zu Brüchen.' → Ergebnis zu einfach. Prompt 2: 'Erstelle 5 Aufgaben zu Brüchen für Klasse 7, aufsteigend nach Schwierigkeit, mit Alltagsbezug.' → Besser, aber Aufgabe 3 ist fehlerhaft. Prompt 3: 'Korrigiere Aufgabe 3 und ergänze Lösungshinweise.' → Passt.",
        takeaway:
          "Iteration + Dokumentation = Qualitätssicherung. Jeder Prompt-Schritt muss nachvollziehbar sein.",
      },
      {
        title: "Transparenz und Governance",
        content:
          "Wenn KI an der Entstehung von Unterrichtsmaterialien beteiligt ist, muss das transparent sein. Governance bedeutet: Klare Regeln für den Einsatz von KI im professionellen Kontext. Wer hat welchen Anteil? Wo wurde KI eingesetzt? Welche Qualitätskriterien gelten? Diese Transparenz ist keine bürokratische Pflicht, sondern professioneller Standard — vergleichbar mit Quellenangaben in wissenschaftlichen Arbeiten.",
        example:
          "Am Hamburger LI könnte eine Governance-Regel lauten: 'Wenn KI bei der Erstellung von Prüfungsaufgaben genutzt wird, muss dokumentiert werden: (1) welches Tool, (2) welche Prompts, (3) welche menschlichen Änderungen. Die fachliche Verantwortung liegt bei der Lehrkraft.'",
        takeaway:
          "Transparenz über KI-Einsatz ist kein Nice-to-have, sondern professioneller Standard.",
      },
      {
        title: "Prompt-Techniken: Chain-of-Thought und Few-Shot",
        content:
          "Zwei Prompting-Techniken verbessern die Qualität von KI-Ausgaben erheblich: Chain-of-Thought (CoT) fordert die KI auf, ihre Zwischenschritte sichtbar zu machen — das verbessert besonders mathematische und logische Aufgaben. Die einfachste Umsetzung: 'Lass uns Schritt für Schritt denken' an den Prompt anhängen. Few-Shot Prompting gibt der KI 2-5 Beispiele des gewünschten Ergebnisses, sodass sie das Muster erkennt und auf neue Aufgaben überträgt. Beide Techniken zeigen: KI versteht nicht, sondern folgt Mustern — das ist ein zentrales KI-Literacy-Konzept.",
        example:
          "Prompt ohne CoT: 'Was ist 17 × 23?' → KI antwortet direkt (manchmal falsch). Prompt mit CoT: 'Was ist 17 × 23? Rechne Schritt für Schritt.' → KI zeigt: 17 × 20 = 340, 17 × 3 = 51, 340 + 51 = 391. Die Zwischenschritte machen die Antwort nachvollziehbar und reduzieren Fehler.",
        takeaway:
          "Chain-of-Thought macht Denkwege sichtbar, Few-Shot lehrt durch Beispiele. Beide Techniken stärken die Kontrolle über KI-Ausgaben.",
      },
      {
        title: "Regulierung: KMK-Empfehlung und EU AI Act",
        content:
          "Die KMK-Handlungsempfehlung (Oktober 2024) definiert fünf Handlungsfelder für KI in der Schule: Didaktik, Prüfungen, Lehrerbildung, Regulierung und Chancengerechtigkeit. Sie fordert eine Anpassung der Prüfungskultur und die Verankerung von KI-Kompetenzen in der Lehrkräftebildung. Der EU AI Act (seit 2024 in Kraft) klassifiziert Bildung als 'Hochrisiko-Bereich' — ähnlich wie Gesundheitswesen. Das bedeutet: KI-Systeme für Benotung, Zulassung oder Prüfungsüberwachung unterliegen strengen Transparenz- und Aufsichtspflichten. Seit Februar 2025 müssen Schulen KI-Literacy-Schulungen für ihr Personal sicherstellen.",
        example:
          "Eine Schule setzt ein KI-System ein, das Bewerbungen für einen begrenzten Schulplatz vorselektiert. Nach dem EU AI Act muss dieses System strenge Anforderungen an Transparenz, Fairness und menschliche Aufsicht erfüllen — die finale Entscheidung darf nicht allein dem Algorithmus überlassen werden.",
        takeaway:
          "Bildung ist laut EU AI Act ein Hochrisiko-Bereich. Governance ist keine Kür, sondern wachsende rechtliche Pflicht.",
      },
    ],
    exercise: {
      instruction:
        "Sortiere die Aufgaben: Was sollte der Mensch machen und wo kann KI unterstützen?",
      categoryA: "Mensch macht das",
      categoryB: "KI unterstützt",
      items: [
        { id: "e1", label: "Lernziele definieren und priorisieren", correctCategory: "A" },
        { id: "e2", label: "Erste Textentwürfe generieren", correctCategory: "B" },
        {
          id: "e3",
          label: "Entscheiden, was in die Prüfung kommt",
          correctCategory: "A",
        },
        {
          id: "e4",
          label: "Aufgabenvarianten in verschiedenen Schwierigkeitsstufen erstellen",
          correctCategory: "B",
        },
        {
          id: "e5",
          label: "Ethische Grenzen des KI-Einsatzes festlegen",
          correctCategory: "A",
        },
        {
          id: "e6",
          label: "Rechtschreibung und Grammatik prüfen",
          correctCategory: "B",
        },
        {
          id: "e7",
          label: "Die pädagogische Qualität des Ergebnisses bewerten",
          correctCategory: "A",
        },
        {
          id: "e8",
          label: "Zusammenfassungen langer Texte erstellen",
          correctCategory: "B",
        },
        { id: "e9", label: "Entscheiden, ob KI-Einsatz in einer Prüfung erlaubt ist", correctCategory: "A" },
        { id: "e10", label: "Prompt-Varianten für verschiedene Schwierigkeitsstufen generieren", correctCategory: "B" },
      ],
      successMessage:
        "Richtig! Der Mensch verantwortet Ziele, Entscheidungen und Qualität. Die KI unterstützt bei Generierung, Variation und Routineaufgaben. Ko-Kreation heißt: Der Mensch steuert, die KI liefert.",
    },
    interactiveTools: [
      {
        title: "Learn Prompting – Interaktiver Prompting-Kurs (Deutsch)",
        description:
          "Kostenloser, interaktiver Kurs zum Prompt Engineering auf Deutsch. Du kannst Prompts direkt auf der Seite testen und verschiedene Techniken wie Few-Shot, Chain-of-Thought und Role Prompting ausprobieren — ohne technische Vorkenntnisse.",
        url: "https://learnprompting.org/de/docs/basics/introduction",
        label: "Kurs starten",
      },
      {
        title: "PAIR Explorables – KI-Konzepte interaktiv erleben (Google)",
        description:
          "16 interaktive Visualisierungen von Google PAIR, die grundlegende KI-Konzepte erklären: Bias, Fairness, Datenschutz, neuronale Netze. Komplett im Browser nutzbar und ohne Registrierung — ideal um zu verstehen, was 'unter der Haube' passiert.",
        url: "https://pair.withgoogle.com/explorables/",
        label: "Explorables öffnen",
      },
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "Was unterscheidet Ko-Kreation von Delegation?",
        options: [
          {
            id: "a",
            label:
              "Bei Ko-Kreation bleibt der Mensch im Steuerungsprozess aktiv und dokumentiert jeden Schritt.",
            correct: true,
          },
          {
            id: "b",
            label: "Ko-Kreation ist einfach ein anderes Wort für Delegation.",
            correct: false,
          },
          {
            id: "c",
            label: "Bei Ko-Kreation macht die KI alles allein, aber besser.",
            correct: false,
          },
        ],
        explanation:
          "Ko-Kreation bedeutet iteratives Zusammenarbeiten mit bewusster Steuerung. Bei Delegation wird der Output ohne aktive menschliche Beteiligung übernommen. Der entscheidende Unterschied liegt in der menschlichen Steuerung und Verantwortung im Prozess.",
      },
      {
        id: "q2",
        question: "Warum ist die Dokumentation von Prompt-Iterationen wichtig?",
        options: [
          {
            id: "a",
            label: "Weil es bürokratische Vorschrift ist.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Weil sie den Arbeitsprozess transparent macht und die Qualitätsentwicklung nachvollziehbar dokumentiert.",
            correct: true,
          },
          {
            id: "c",
            label: "Weil man die Prompts später wiederverkaufen kann.",
            correct: false,
          },
        ],
        explanation:
          "Dokumentation macht sichtbar, wie das Ergebnis entstanden ist: Welche Entscheidungen wurden getroffen? Was wurde verändert? Das ist die Grundlage für Qualitätssicherung und professionelle Verantwortung.",
      },
      {
        id: "q3",
        question: "Was gehört zu einer KI-Governance-Regelung im Schulkontext?",
        options: [
          {
            id: "a",
            label: "Nur ein Verbot aller KI-Tools.",
            correct: false,
          },
          {
            id: "b",
            label: "Nur eine Empfehlung, KI möglichst oft zu nutzen.",
            correct: false,
          },
          {
            id: "c",
            label:
              "Klare Regeln zu Transparenz, Dokumentation, Qualitätskriterien und Verantwortlichkeiten.",
            correct: true,
          },
        ],
        explanation:
          "Governance ist weder Verbot noch blinde Empfehlung. Es sind klare, verbindliche Regeln: Wann darf KI eingesetzt werden? Wie wird der Einsatz dokumentiert? Welche Qualitätskriterien gelten? Wer trägt die Verantwortung?",
      },
      {
        id: "q4",
        question:
          "Was bewirkt die Anweisung 'Lass uns Schritt für Schritt denken' in einem Prompt?",
        options: [
          {
            id: "a",
            label: "Die KI antwortet schneller und kürzer.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Die KI zeigt ihre Zwischenschritte, was die Qualität komplexer Antworten verbessert.",
            correct: true,
          },
          {
            id: "c",
            label: "Die KI verwendet weniger Rechenleistung.",
            correct: false,
          },
        ],
        explanation:
          "Chain-of-Thought (CoT) Prompting fordert die KI auf, ihren 'Denkprozess' sichtbar zu machen. Die Genauigkeit verbessert sich besonders bei mathematischen, logischen und komplexen Aufgaben. Das entspricht der pädagogischen Methode des 'lauten Denkens'.",
      },
      {
        id: "q5",
        question: "Wie klassifiziert der EU AI Act den Bildungsbereich?",
        options: [
          {
            id: "a",
            label: "Als 'Niedrigrisiko' — keine besonderen Regeln nötig.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Als 'Hochrisiko' — strenge Anforderungen an Transparenz, Fairness und menschliche Aufsicht.",
            correct: true,
          },
          {
            id: "c",
            label: "Als 'Verbotener Bereich' — KI darf in Schulen nicht eingesetzt werden.",
            correct: false,
          },
        ],
        explanation:
          "Der EU AI Act stuft Bildung als 'High-Risk'-Bereich ein. KI-Systeme für Zulassungsentscheidungen, Benotung oder Prüfungsüberwachung müssen strenge Anforderungen erfüllen. Seit Februar 2025 müssen Schulen KI-Literacy-Schulungen für ihr Personal sicherstellen.",
      },
      {
        id: "q6",
        question: "Was bedeutet 'Few-Shot Prompting'?",
        options: [
          {
            id: "a",
            label: "Man gibt der KI möglichst wenig Informationen.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Man gibt der KI einige Beispiele des gewünschten Ergebnisses, damit sie das Muster erkennt und anwendet.",
            correct: true,
          },
          {
            id: "c",
            label: "Man stellt der KI mehrere verschiedene Fragen gleichzeitig.",
            correct: false,
          },
        ],
        explanation:
          "Beim Few-Shot Prompting werden der KI 2-5 Beispiele des gewünschten Formats gezeigt. Die KI erkennt das Muster und überträgt es auf neue Aufgaben. Das zeigt, dass KI Muster reproduziert statt zu verstehen — ein wichtiges KI-Literacy-Konzept.",
      },
    ],
    challengeSummary:
      "Du verstehst jetzt den Unterschied zwischen Ko-Kreation und Delegation, beherrschst Prompt-Techniken wie Chain-of-Thought und Few-Shot, weißt warum Prompt-Dokumentation wichtig ist und kennst die Grundlagen professioneller KI-Governance — von der KMK-Empfehlung bis zum EU AI Act. Ab in die Challenge!",
  },

  trotz: {
    id: "trotz",
    title: "Tutorial: Lernen trotz KI",
    subtitle: "Urteilskraft und professionelle Begründung",
    focusQuestion:
      "Welche Fähigkeiten bleiben unverzichtbar — auch wenn KI vieles übernehmen kann?",
    introText:
      "KI kann beeindruckende Entwürfe liefern — Unterrichtspläne, Klausuren, Feedbacktexte. Aber formal starke Outputs können didaktisch schwach sein. In diesem Tutorial trainierst du, wie Lehrkräfte auch bei überzeugenden KI-Ausgaben professionell prüfen, begründen und verantworten. Es geht um die Fähigkeiten, die trotz (und gerade wegen) KI unverzichtbar bleiben.",
    videoUrl: "https://www.youtube-nocookie.com/embed/2ePf9rue1Ao",
    knowledgeBlocks: [
      {
        title: "Urteilskraft: Warum KI kein Urteil fällen kann",
        content:
          "Urteilskraft bedeutet, Situationen professionell einzuschätzen, Handlungsalternativen abzuwägen und begründet zu entscheiden. KI kann Informationen zusammenstellen und Optionen auflisten, aber sie kann nicht urteilen — weil Urteilen Werte, Erfahrung und Kontextwissen voraussetzt. Im Lehrberuf ist Urteilskraft zentral: Welche Methode passt zu dieser Klasse? Welche Aufgabe fördert welche Kompetenz? Wann braucht ein Schüler Ermutigung, wann Klarheit?",
        example:
          "Eine KI erstellt einen perfekt strukturierten Unterrichtsentwurf zum Thema Diskriminierung. Aber sie weiß nicht, dass in der Klasse gerade ein Mobbingfall bearbeitet wird. Die Lehrkraft muss urteilen, ob das Thema jetzt sensibel genug behandelt werden kann — das kann keine KI.",
        takeaway:
          "Urteilskraft = Werte + Erfahrung + Kontextwissen. Das ist nicht automatisierbar.",
      },
      {
        title: "Oberfläche vs. Tiefenstruktur",
        content:
          "KI-generierte Unterrichtsentwürfe sehen oft professionell aus: klare Gliederung, passende Fachbegriffe, zeitliche Strukturierung. Aber bei genauer Prüfung fehlt häufig die didaktische Tiefenstruktur: Sind Lernziele, Aufgaben und Sicherung aufeinander abgestimmt? Gibt es kognitive Aktivierung oder nur Wiedergabe? Stimmt der Situationsbezug? Die Fähigkeit, zwischen Oberfläche (sieht gut aus) und Tiefenstruktur (funktioniert didaktisch) zu unterscheiden, ist eine Kernkompetenz, die durch KI nicht ersetzt, sondern wichtiger wird.",
        example:
          "Ein KI-Entwurf für eine Deutschstunde enthält: Einstieg mit Video, Erarbeitungsphase mit Arbeitsblatt, Sicherung mit Präsentation. Klingt gut. Aber: Das Video hat keinen Bezug zum Arbeitsblatt, das Arbeitsblatt fragt nur Wissen ab (keine Transferaufgabe), und die Präsentation wiederholt nur die Ergebnisse. Die Tiefenstruktur — kohärenter Lernpfad mit kognitiver Aktivierung — fehlt.",
        takeaway:
          "Oberfläche ≠ Qualität. Professionelle Prüfung geht immer zur Tiefenstruktur.",
      },
      {
        title: "Prüfungsvalidität und Eigenleistung",
        content:
          "Wenn KI Texte, Analysen und sogar Quellenarbeit übernehmen kann, stellt sich die Frage: Was prüfen Prüfungen noch? Prüfungsvalidität bedeutet, dass eine Prüfung tatsächlich das misst, was sie messen soll — nämlich die Kompetenz des Prüflings, nicht die Leistungsfähigkeit seiner KI-Tools. Professionelle Lehrkräfte müssen Prüfungsformate weiterentwickeln, die Eigenleistung sichtbar machen: mündliche Reflexion, prozessbegleitende Dokumentation, situative Anwendungsaufgaben.",
        example:
          "Eine Hausarbeit kann mit KI in einer Stunde geschrieben werden. Aber wenn der Schüler die Arbeit mündlich verteidigen muss, Rückfragen beantworten und den Arbeitsprozess dokumentiert hat, wird Eigenleistung sichtbar — unabhängig davon, ob KI genutzt wurde.",
        takeaway:
          "Prüfungen müssen Eigenleistung sichtbar machen, nicht KI-Nutzung verhindern.",
      },
      {
        title: "KI-Erkennung: Warum Detektoren scheitern",
        content:
          "KI-Erkennungstools wie GPTZero oder Turnitin versprechen, KI-generierte Texte zu identifizieren. Die Realität: OpenAI hat seinen eigenen Detektor eingestellt — er erkannte nur 26% der KI-Texte und markierte 9% menschlicher Texte fälschlicherweise als KI-generiert. Eine Stanford-Studie zeigte, dass 97% der TOEFL-Aufsätze von nicht-muttersprachlichen Schreibenden von mindestens einem Detektor fälschlicherweise als KI markiert wurden. Mehrere Elite-Universitäten (Yale, Johns Hopkins, Vanderbilt) haben Turnitins KI-Erkennung deaktiviert. Die Konsequenz: KI-Detektoren sind als alleiniges Bewertungsinstrument ungeeignet.",
        example:
          "Eine Lehrkraft lässt einen Schüleraufsatz durch GPTZero prüfen. Ergebnis: '87% Wahrscheinlichkeit, dass der Text KI-generiert ist.' Der Schüler hat den Text selbst geschrieben. Eine einfache Umformulierung ('Schreibe wie ein Teenager') lässt die KI-Erkennung von 100% auf 0% fallen. Die vermeintliche Sicherheit der Detektoren ist trügerisch.",
        takeaway:
          "KI-Detektoren sind unzuverlässig und diskriminieren systematisch nicht-muttersprachliche Schreibende. Vertrauen auf Detektoren ersetzt keine professionelle Urteilskraft.",
      },
      {
        title: "Die fünf Dimensionen des Prüfens im KI-Zeitalter",
        content:
          "Joscha Falck unterscheidet fünf Dimensionen, wie Prüfungen im KI-Zeitalter gestaltet werden können: (1) Prüfen OHNE KI — klassisch, beaufsichtigt, papierbasiert. (2) Prüfen TROTZ KI — Standardformate trotz KI-Verfügbarkeit. (3) Prüfen ÜBER KI — KI selbst wird zum Prüfungsgegenstand. (4) Prüfen MIT KI — Schüler nutzen KI bewusst und dokumentiert. (5) Prüfen DURCH KI — automatisierte Bewertungssysteme. Dieses Modell hilft Lehrkräften, differenzierte Prüfungsstrategien zu entwickeln, statt zwischen 'KI verbieten' und 'KI erlauben' zu pendeln.",
        example:
          "Prüfen MIT KI: Schüler erhalten die Aufgabe, mit Hilfe von ChatGPT eine Erörterung zu verfassen. Sie müssen ihre Prompts, den Chatverlauf und alle eigenen Änderungen dokumentieren. Die Bewertung bezieht sich auf die Qualität der Prompts, die kritische Prüfung der KI-Ausgaben und die eigene Überarbeitung — nicht nur auf das Endprodukt.",
        takeaway:
          "Prüfen im KI-Zeitalter hat fünf Dimensionen — die professionelle Antwort ist Differenzierung, nicht Verbot oder blinde Erlaubnis.",
      },
    ],
    exercise: {
      instruction:
        "Sortiere die Aussagen: Was ist eine echte Grenze von KI und was ist ein verbreiteter Mythos?",
      categoryA: "Echte KI-Grenze",
      categoryB: "Mythos",
      items: [
        {
          id: "e1",
          label: "KI kann keine situationsbezogenen pädagogischen Urteile fällen.",
          correctCategory: "A",
        },
        {
          id: "e2",
          label: "KI wird niemals kreative Texte schreiben können.",
          correctCategory: "B",
        },
        {
          id: "e3",
          label: "KI kann zwischen didaktisch guten und schlechten Aufgaben nicht selbst unterscheiden.",
          correctCategory: "A",
        },
        {
          id: "e4",
          label: "KI-Texte sind immer sofort als solche erkennbar.",
          correctCategory: "B",
        },
        {
          id: "e5",
          label: "KI fehlt das Kontextwissen über einzelne Schüler und Klassen.",
          correctCategory: "A",
        },
        {
          id: "e6",
          label: "KI ist grundsätzlich unbrauchbar für den Unterricht.",
          correctCategory: "B",
        },
        {
          id: "e7",
          label: "KI kann Werte und ethische Abwägungen nicht eigenständig vornehmen.",
          correctCategory: "A",
        },
        {
          id: "e8",
          label: "KI-generierte Unterrichtsentwürfe sind immer schlecht.",
          correctCategory: "B",
        },
        {
          id: "e9",
          label: "KI-Erkennungstools können zuverlässig zwischen menschlichen und KI-Texten unterscheiden.",
          correctCategory: "B",
        },
        {
          id: "e10",
          label: "KI kann den Lernprozess eines Schülers nicht eigenständig bewerten und verantworten.",
          correctCategory: "A",
        },
      ],
      successMessage:
        "Richtig! KI hat echte Grenzen (Urteilskraft, Kontextwissen, Werte, Bewertungsverantwortung), aber viele pauschale Aussagen über KI sind Mythen — einschließlich der vermeintlichen Zuverlässigkeit von KI-Detektoren.",
    },
    interactiveTools: [
      {
        title: "GPTZero – KI-Erkennung live testen",
        description:
          "Teste selbst, wie (un)zuverlässig KI-Erkennung ist: Füge eigene Texte, Schülertexte oder KI-generierte Texte ein und beobachte die Ergebnisse. Ideal um zu erleben, warum KI-Detektoren als alleiniges Bewertungsinstrument ungeeignet sind.",
        url: "https://gptzero.me",
        label: "GPTZero ausprobieren",
      },
      {
        title: "Stanford CRAFT – KI-Literacy Aktivitäten",
        description:
          "Kostenlose, browserbasierte Aktivitäten der Stanford University für kritisches Denken über KI. Die Übung 'AI or Not AI?' trainiert die Fähigkeit, KI-Fähigkeiten realistisch einzuschätzen — eine Kernkompetenz für 'Lernen trotz KI'.",
        url: "https://craft.stanford.edu/resources/",
        label: "CRAFT-Aktivitäten entdecken",
      },
    ],
    quizQuestions: [
      {
        id: "q1",
        question:
          "Woran erkennt man, dass ein KI-Unterrichtsentwurf didaktisch schwach ist, obwohl er formal gut aussieht?",
        options: [
          {
            id: "a",
            label: "Wenn er keine Emojis enthält.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Wenn Lernziele, Aufgaben und Sicherung nicht kohärent aufeinander abgestimmt sind.",
            correct: true,
          },
          {
            id: "c",
            label: "Wenn er zu kurz ist.",
            correct: false,
          },
        ],
        explanation:
          "Die didaktische Tiefenstruktur zeigt sich in der Kohärenz: Passen Lernziele, Aufgaben und Sicherungsphasen zusammen? Gibt es kognitive Aktivierung? Stimmt der Situationsbezug? Formale Merkmale wie Länge oder Design sagen nichts über didaktische Qualität.",
      },
      {
        id: "q2",
        question: "Wie können Prüfungen in Zeiten von KI Eigenleistung sichtbar machen?",
        options: [
          {
            id: "a",
            label: "Durch Verbot aller digitalen Hilfsmittel.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Durch mündliche Reflexion, Prozessdokumentation und situative Anwendungsaufgaben.",
            correct: true,
          },
          {
            id: "c",
            label: "Durch längere Klausuren mit mehr Aufgaben.",
            correct: false,
          },
        ],
        explanation:
          "Verbote sind weder nachhaltig noch zielführend. Stattdessen müssen Prüfungsformate so gestaltet werden, dass der Denkprozess sichtbar wird: mündliche Verteidigung, Arbeitsdokumentation, Transfer auf neue Situationen.",
      },
      {
        id: "q3",
        question: "Was kennzeichnet eine professionelle Haltung 'trotz KI'?",
        options: [
          {
            id: "a",
            label: "KI komplett ablehnen und ignorieren.",
            correct: false,
          },
          {
            id: "b",
            label: "KI-Outputs ohne Prüfung übernehmen, weil sie zeitsparend sind.",
            correct: false,
          },
          {
            id: "c",
            label:
              "KI-Outputs kritisch prüfen, professionell begründen und Urteilskraft bewahren.",
            correct: true,
          },
        ],
        explanation:
          "Professionelle Haltung 'trotz KI' heißt weder Ablehnung noch unkritische Übernahme. Es bedeutet: Mit Urteilskraft prüfen, mit Fachwissen begründen und die Verantwortung für pädagogische Entscheidungen behalten — auch wenn KI beeindruckende Ergebnisse liefert.",
      },
      {
        id: "q4",
        question: "Warum hat OpenAI seinen eigenen KI-Textdetektor eingestellt?",
        options: [
          {
            id: "a",
            label: "Weil er zu teuer im Betrieb war.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Weil er nur 26% der KI-Texte erkannte und 9% menschlicher Texte fälschlicherweise als KI markierte.",
            correct: true,
          },
          {
            id: "c",
            label: "Weil er gegen Datenschutzgesetze verstieß.",
            correct: false,
          },
        ],
        explanation:
          "OpenAIs eigener Detektor hatte eine so niedrige Trefferquote (26%) und eine so hohe Falsch-Positiv-Rate (9%), dass er mehr Schaden als Nutzen anrichtete. Selbst der Entwickler der führenden KI-Technologie konnte kein zuverlässiges Erkennungstool bauen.",
      },
      {
        id: "q5",
        question:
          "Welche fünf Dimensionen des Prüfens im KI-Zeitalter unterscheidet Joscha Falck?",
        options: [
          {
            id: "a",
            label: "Digital, Analog, Hybrid, Mündlich, Schriftlich.",
            correct: false,
          },
          {
            id: "b",
            label: "Ohne KI, Trotz KI, Über KI, Mit KI, Durch KI.",
            correct: true,
          },
          {
            id: "c",
            label: "Wissen, Verstehen, Anwenden, Analysieren, Bewerten.",
            correct: false,
          },
        ],
        explanation:
          "Falcks Modell unterscheidet: Prüfen OHNE KI (klassisch), TROTZ KI (trotz Verfügbarkeit), ÜBER KI (KI als Lerngegenstand), MIT KI (bewusster dokumentierter KI-Einsatz) und DURCH KI (automatisierte Bewertung). Dieses Modell ermöglicht differenzierte Prüfungsstrategien statt eines Entweder-oder.",
      },
      {
        id: "q6",
        question:
          "Was ist der zentrale Vorteil prozessorientierter Leistungsbewertung im KI-Zeitalter?",
        options: [
          {
            id: "a",
            label: "Sie ist einfacher zu bewerten als produktorientierte Formate.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Sie macht den Lernweg sichtbar — Rechercheschritte, Promptverläufe und Reflexionen werden dokumentiert und bewertet.",
            correct: true,
          },
          {
            id: "c",
            label: "Sie verhindert, dass Schüler KI nutzen können.",
            correct: false,
          },
        ],
        explanation:
          "Prozessorientierte Bewertung dokumentiert den Lernweg: Prompts, Chatverläufe, Entscheidungen und Reflexionen. So kann die Lehrkraft beurteilen, ob echtes Lernen stattgefunden hat — unabhängig davon, ob KI eingesetzt wurde. Es geht nicht um Verhinderung, sondern um Sichtbarmachung.",
      },
    ],
    challengeSummary:
      "Du weißt jetzt, warum Urteilskraft, Tiefenstrukturanalyse und Prüfungsvalidität trotz KI unverzichtbar sind. Du kennst die Grenzen von KI-Erkennungstools und die fünf Dimensionen des Prüfens im KI-Zeitalter. In der Challenge zeigst du diese Fähigkeiten an den Lernstationen.",
  },
};

/* ─── Helpers ─── */

const STEP_LABELS = ["Einstieg", "Kernwissen", "Praxis-Übung", "Wissens-Check", "Challenge-Start"];

const STEP_ICONS = [IconPlayerPlay, IconBook, IconPuzzle, IconSparkles, IconRocket];

const DIMENSION_ACCENT: Record<DimensionId, { bg: string; border: string; light: string; text: string }> = {
  ueber: { bg: "bg-amber-500", border: "border-amber-500", light: "bg-amber-50", text: "text-amber-700" },
  durch: { bg: "bg-emerald-500", border: "border-emerald-500", light: "bg-emerald-50", text: "text-emerald-700" },
  mit: { bg: "bg-sky-500", border: "border-sky-500", light: "bg-sky-50", text: "text-sky-700" },
  trotz: { bg: "bg-rose-500", border: "border-rose-500", light: "bg-rose-50", text: "text-rose-700" },
};

const getChapterId = (value: string | string[] | undefined): DimensionId | null => {
  if (typeof value !== "string") return null;
  if (value === "ueber" || value === "durch" || value === "mit" || value === "trotz") return value;
  return null;
};

/* ─── Component ─── */

export default function CrewTutorialPage() {
  const params = useParams();
  const chapterId = getChapterId(params.dimension);
  const tutorial = chapterId ? TUTORIALS[chapterId] : null;
  const accent = chapterId ? DIMENSION_ACCENT[chapterId] : null;

  const [currentStep, setCurrentStep] = useState(0);

  // Exercise state
  const [exerciseAssignments, setExerciseAssignments] = useState<Record<string, "A" | "B">>({});
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const [exerciseCorrect, setExerciseCorrect] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizChecked, setQuizChecked] = useState<Record<string, boolean>>({});

  // Knowledge block expand state
  const [expandedExamples, setExpandedExamples] = useState<Record<number, boolean>>({});

  const allExerciseItemsAssigned = tutorial
    ? tutorial.exercise.items.every((item) => exerciseAssignments[item.id] !== undefined)
    : false;

  const allQuizCorrect = useMemo(() => {
    if (!tutorial) return false;
    return tutorial.quizQuestions.every((q) => {
      const answerId = quizAnswers[q.id];
      if (!answerId) return false;
      const selected = q.options.find((o) => o.id === answerId);
      return selected?.correct === true;
    });
  }, [tutorial, quizAnswers]);

  const allQuizChecked = useMemo(() => {
    if (!tutorial) return false;
    return tutorial.quizQuestions.every((q) => quizChecked[q.id]);
  }, [tutorial, quizChecked]);

  const canAdvance = useCallback(
    (step: number): boolean => {
      if (step === 2) return exerciseCorrect;
      if (step === 3) return allQuizCorrect && allQuizChecked;
      return true;
    },
    [exerciseCorrect, allQuizCorrect, allQuizChecked]
  );

  const handleNext = () => {
    if (currentStep < 4 && canAdvance(currentStep)) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleExerciseAssign = (itemId: string, category: "A" | "B") => {
    if (exerciseCorrect) return;
    setExerciseAssignments((prev) => ({ ...prev, [itemId]: category }));
    setExerciseChecked(false);
  };

  const handleExerciseCheck = () => {
    if (!tutorial || !allExerciseItemsAssigned) return;
    const correct = tutorial.exercise.items.every(
      (item) => exerciseAssignments[item.id] === item.correctCategory
    );
    setExerciseChecked(true);
    setExerciseCorrect(correct);
  };

  const handleExerciseReset = () => {
    setExerciseAssignments({});
    setExerciseChecked(false);
    setExerciseCorrect(false);
  };

  const handleQuizSelect = (questionId: string, optionId: string) => {
    if (quizChecked[questionId]) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleQuizCheck = (questionId: string) => {
    setQuizChecked((prev) => ({ ...prev, [questionId]: true }));
  };

  /* ─── Not found ─── */
  if (!tutorial || !accent) {
    return (
      <main className={`${bodyFont.className} min-h-screen bg-slate-100 px-6 py-16`}>
        <div className="mx-auto max-w-3xl border-4 border-black bg-white p-8 shadow-[6px_6px_0_#000]">
          <h1 className={`${pixelFont.className} text-2xl`}>Tutorial nicht gefunden</h1>
          <p className="mt-4 text-sm text-slate-700">Dieses Tutorial existiert nicht.</p>
          <Link
            href="/escape-game"
            className="mt-6 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] shadow-[3px_3px_0_#000]"
          >
            <IconArrowLeft className="h-4 w-4" />
            Zurück
          </Link>
        </div>
      </main>
    );
  }

  /* ─── Render ─── */
  return (
    <main className={`${bodyFont.className} min-h-screen bg-[#f8fafc] text-slate-900`}>
      {/* Header */}
      <section className="mx-auto max-w-5xl px-6 pt-10 pb-4">
        <Link
          href="/escape-game"
          className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] shadow-[3px_3px_0_#000] hover:bg-slate-50"
        >
          <IconArrowLeft className="h-4 w-4" />
          Zur Hauptseite
        </Link>
        <div className="mt-6 border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
          <h1 className={`${pixelFont.className} text-xl md:text-2xl`}>{tutorial.title}</h1>
          <p className={`${displayFont.className} mt-2 text-lg ${accent.text}`}>
            {tutorial.subtitle}
          </p>
        </div>
      </section>

      {/* Stepper */}
      <section className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between gap-1 rounded-lg border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#000]">
          {STEP_LABELS.map((label, i) => {
            const StepIcon = STEP_ICONS[i];
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            const isLocked = i > currentStep && !canAdvance(i - 1);
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (i < currentStep) setCurrentStep(i);
                  else if (i === currentStep + 1 && canAdvance(currentStep)) setCurrentStep(i);
                }}
                disabled={isLocked && i > currentStep}
                className={`flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                  isActive
                    ? `${accent.text} font-bold`
                    : isDone
                    ? "text-slate-600"
                    : "text-slate-300"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    isActive
                      ? `${accent.bg} border-black text-white`
                      : isDone
                      ? "border-slate-400 bg-slate-200 text-slate-600"
                      : "border-slate-200 bg-slate-50 text-slate-300"
                  }`}
                >
                  {isDone ? <IconCheck className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </div>
                <span className="hidden text-[10px] uppercase tracking-wider sm:block">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
        <p className={`mt-2 text-center text-xs ${accent.text} font-bold uppercase tracking-widest`}>
          Schritt {currentStep + 1} von 5
        </p>
      </section>

      {/* Step Content */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        {/* ────── Step 0: Einstieg ────── */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className={`border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]`}>
              <div className={`mb-4 inline-block rounded border-2 ${accent.border} ${accent.light} px-3 py-1 text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                Fokus-Frage
              </div>
              <p className="text-lg font-bold">{tutorial.focusQuestion}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">{tutorial.introText}</p>
            </div>
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-600">
                <IconPlayerPlay className="h-4 w-4" />
                Video-Impuls
              </div>
              <div className="overflow-hidden rounded border-2 border-black bg-black">
                <iframe
                  title={`${tutorial.title} Video`}
                  src={tutorial.videoUrl}
                  className="h-64 w-full md:h-80"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* ────── Step 1: Kernwissen ────── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {tutorial.knowledgeBlocks.map((block, i) => (
              <div key={block.title} className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <div className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${accent.bg} text-sm font-bold text-white`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold">{block.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{block.content}</p>

                    {/* Expandable example */}
                    <button
                      type="button"
                      onClick={() => setExpandedExamples((prev) => ({ ...prev, [i]: !prev[i] }))}
                      className={`mt-4 inline-flex items-center gap-2 border-2 ${accent.border} rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${accent.text} hover:${accent.light}`}
                    >
                      <IconBulb className="h-4 w-4" />
                      {expandedExamples[i] ? "Beispiel ausblenden" : "Beispiel anzeigen"}
                    </button>
                    {expandedExamples[i] && (
                      <div className={`mt-3 rounded border-2 ${accent.border} ${accent.light} p-4 text-sm leading-relaxed`}>
                        {block.example}
                      </div>
                    )}

                    {/* Takeaway */}
                    <div className="mt-4 flex items-start gap-2 rounded border-l-4 border-black bg-slate-50 p-3">
                      <IconArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      <p className="text-sm font-bold text-slate-800">{block.takeaway}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Interactive Tools */}
            {tutorial.interactiveTools && tutorial.interactiveTools.length > 0 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-600">
                  <IconExternalLink className="h-4 w-4" />
                  Interaktive Tools zum Ausprobieren
                </div>
                <p className="mb-4 text-sm text-slate-600">
                  Vertiefe dein Verständnis mit diesen interaktiven Werkzeugen:
                </p>
                <div className="space-y-4">
                  {tutorial.interactiveTools.map((tool) => (
                    <div key={tool.title} className={`rounded border-2 ${accent.border} p-4`}>
                      <h4 className="text-sm font-bold">{tool.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{tool.description}</p>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-3 inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90`}
                      >
                        {tool.label}
                        <IconExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ────── Step 2: Praxis-Übung ────── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-600">
                <IconPuzzle className="h-4 w-4" />
                Kategorisierungs-Übung
              </div>
              <p className="text-sm text-slate-700">{tutorial.exercise.instruction}</p>

              {/* Category headers */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className={`rounded-t border-2 ${accent.border} ${accent.light} p-3 text-center text-sm font-bold ${accent.text}`}>
                  {tutorial.exercise.categoryA}
                </div>
                <div className="rounded-t border-2 border-slate-400 bg-slate-50 p-3 text-center text-sm font-bold text-slate-700">
                  {tutorial.exercise.categoryB}
                </div>
              </div>

              {/* Items */}
              <div className="mt-4 space-y-3">
                {tutorial.exercise.items.map((item) => {
                  const assigned = exerciseAssignments[item.id];
                  const isChecked = exerciseChecked;
                  const isCorrect = assigned === item.correctCategory;

                  return (
                    <div
                      key={item.id}
                      className={`rounded border-2 border-black p-3 shadow-[2px_2px_0_#000] ${
                        isChecked && exerciseCorrect
                          ? "border-emerald-500 bg-emerald-50"
                          : isChecked && !isCorrect && assigned
                          ? "border-red-400 bg-red-50"
                          : "bg-white"
                      }`}
                    >
                      <p className="mb-2 text-sm">{item.label}</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleExerciseAssign(item.id, "A")}
                          disabled={exerciseCorrect}
                          className={`flex-1 rounded border-2 px-2 py-1.5 text-xs font-bold transition-colors ${
                            assigned === "A"
                              ? `${accent.border} ${accent.light} ${accent.text}`
                              : "border-slate-200 bg-white text-slate-500 hover:border-slate-400"
                          }`}
                        >
                          {tutorial.exercise.categoryA}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleExerciseAssign(item.id, "B")}
                          disabled={exerciseCorrect}
                          className={`flex-1 rounded border-2 px-2 py-1.5 text-xs font-bold transition-colors ${
                            assigned === "B"
                              ? "border-slate-500 bg-slate-100 text-slate-700"
                              : "border-slate-200 bg-white text-slate-500 hover:border-slate-400"
                          }`}
                        >
                          {tutorial.exercise.categoryB}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Check / Reset */}
              <div className="mt-6 flex gap-3">
                {!exerciseCorrect && (
                  <button
                    type="button"
                    onClick={handleExerciseCheck}
                    disabled={!allExerciseItemsAssigned}
                    className={`border-2 border-black px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
                      allExerciseItemsAssigned
                        ? `${accent.bg} text-white hover:opacity-90`
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    Prüfen
                  </button>
                )}
                {exerciseChecked && !exerciseCorrect && (
                  <button
                    type="button"
                    onClick={handleExerciseReset}
                    className="border-2 border-black bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] hover:bg-slate-50"
                  >
                    Nochmal versuchen
                  </button>
                )}
              </div>

              {/* Feedback */}
              {exerciseChecked && !exerciseCorrect && (
                <div className="mt-4 rounded border-2 border-red-400 bg-red-50 p-4 text-sm text-red-800">
                  <div className="flex items-center gap-2 font-bold">
                    <IconX className="h-4 w-4" />
                    Noch nicht ganz richtig. Überprüfe deine Zuordnungen und versuche es erneut.
                  </div>
                </div>
              )}
              {exerciseCorrect && (
                <div className="mt-4 rounded border-2 border-emerald-500 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <div className="flex items-center gap-2 font-bold">
                    <IconCheck className="h-4 w-4" />
                    Alle richtig!
                  </div>
                  <p className="mt-1">{tutorial.exercise.successMessage}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ────── Step 3: Wissens-Check ────── */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {tutorial.quizQuestions.map((q, qi) => {
              const answerId = quizAnswers[q.id];
              const checked = quizChecked[q.id] ?? false;
              const selectedOption = q.options.find((o) => o.id === answerId);
              const isCorrect = selectedOption?.correct === true;

              return (
                <div key={q.id} className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                  <div className="mb-3 flex items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      checked && isCorrect ? "bg-emerald-500" : checked ? "bg-red-400" : accent.bg
                    } text-xs font-bold text-white`}>
                      {checked && isCorrect ? (
                        <IconCheck className="h-4 w-4" />
                      ) : (
                        qi + 1
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-slate-500">
                      Frage {qi + 1} von {tutorial.quizQuestions.length}
                    </span>
                  </div>

                  <p className="text-sm font-bold">{q.question}</p>

                  <div className="mt-4 space-y-2">
                    {q.options.map((option) => {
                      const isSelected = answerId === option.id;
                      const showCorrect = checked && option.correct;
                      const showWrong = checked && isSelected && !option.correct;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleQuizSelect(q.id, option.id)}
                          disabled={checked}
                          className={`w-full rounded border-2 px-4 py-2.5 text-left text-sm shadow-[2px_2px_0_#000] transition-colors ${
                            showCorrect
                              ? "border-emerald-500 bg-emerald-100 font-bold"
                              : showWrong
                              ? "border-red-400 bg-red-100"
                              : isSelected
                              ? `${accent.border} ${accent.light}`
                              : "border-black bg-white hover:bg-slate-50"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>

                  {answerId && !checked && (
                    <button
                      type="button"
                      onClick={() => handleQuizCheck(q.id)}
                      className={`mt-4 border-2 border-black ${accent.bg} px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90`}
                    >
                      Antwort prüfen
                    </button>
                  )}

                  {checked && (
                    <div
                      className={`mt-4 rounded border-2 p-4 text-sm ${
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                          : "border-red-400 bg-red-50 text-red-800"
                      }`}
                    >
                      <p className="font-bold">
                        {isCorrect ? "Richtig!" : "Leider falsch."}
                      </p>
                      <p className="mt-1">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {allQuizChecked && !allQuizCorrect && (
              <div className="rounded border-2 border-amber-400 bg-amber-50 p-4 text-sm text-amber-800">
                Beantworte alle Fragen korrekt, um zum nächsten Schritt zu gelangen. Du kannst die falsch beantworteten Fragen nicht mehr ändern — lies die Erklärungen aufmerksam durch.
              </div>
            )}
          </div>
        )}

        {/* ────── Step 4: Challenge-Start ────── */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-600">
                <IconRocket className="h-4 w-4" />
                Zusammenfassung
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{tutorial.challengeSummary}</p>

              <div className="mt-6 flex flex-col items-center gap-4">
                <Link
                  href={`/escape-game?chapter=${tutorial.id}&mode=challenge#ueber-quest`}
                  className={`inline-flex items-center gap-3 border-2 border-black ${accent.bg} px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0_#000] hover:opacity-90`}
                >
                  <IconRocket className="h-5 w-5" />
                  Zur Jump-&-Run-Challenge
                </Link>
                <p className="text-xs text-slate-500">
                  Meistere alle Lernstationen im Spiel, um deinen 6-stelligen Missions-Code zu erhalten.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`inline-flex items-center gap-2 border-2 border-black px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
              currentStep === 0
                ? "bg-slate-100 text-slate-300"
                : "bg-white text-slate-800 hover:bg-slate-50"
            }`}
          >
            <IconChevronLeft className="h-4 w-4" />
            Zurück
          </button>

          {currentStep < 4 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance(currentStep)}
              className={`inline-flex items-center gap-2 border-2 border-black px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
                canAdvance(currentStep)
                  ? `${accent.bg} text-white hover:opacity-90`
                  : "bg-slate-100 text-slate-300"
              }`}
            >
              Weiter
              <IconChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
