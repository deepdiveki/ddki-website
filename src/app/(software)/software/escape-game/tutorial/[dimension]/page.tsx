"use client";

import Link from "next/link";
import { useMemo, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
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
  knowledgeBlocks2?: KnowledgeBlock[];
  knowledgeBlocks2Title?: string;
  interactiveTools2?: InteractiveTool[];
  knowledgeBlocks3?: KnowledgeBlock[];
  knowledgeBlocks3Title?: string;
  knowledgeBlocks3Intro?: {
    heading: string;
    subheading: string;
    videoUrl: string;
    transcript?: string;
  };
  knowledgeBlocks3Videos?: Array<{
    title?: string;
    videoUrl: string;
    transcript: string;
  }>;
  interactiveTools3?: InteractiveTool[];
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
    subtitle: "Systemverständnis, AI Fluency & die 4D-Kompetenzen",
    focusQuestion:
      "Wie funktioniert KI wirklich — und welche Kompetenzen brauchst du für eine effektive, effiziente, ethische und sichere Zusammenarbeit mit KI?",
    introText:
      "Künstliche Intelligenz ist kein Zaubertrick, sondern angewandte Statistik. In diesem Tutorial baust du ein belastbares Verständnis auf: Wie erkennt KI Muster? Warum klingt sie überzeugend, ohne zu verstehen? Und welche Konsequenzen hat das für den Unterricht? Darüber hinaus lernst du das AI Fluency Framework kennen — ein wissenschaftlich fundiertes Kompetenzmodell mit vier Kernkompetenzen (Delegation, Beschreibung, Urteilsfähigkeit und Sorgfalt), das dir eine Struktur für professionelle Mensch-KI-Zusammenarbeit gibt. Diese Grundlagen sind unverzichtbar, bevor KI didaktisch eingesetzt wird.",
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
    ],
    knowledgeBlocks2Title: "AI Fluency Framework",
    knowledgeBlocks2: [
      {
        title: "Das AI Fluency Framework: Die 4D-Kompetenzen",
        content:
          "AI Fluency ist die bewusste Fähigkeit, mit KI effektiv, effizient, ethisch und sicher zusammenzuarbeiten. Das von Feller und Dakan entwickelte Framework definiert vier Kernkompetenzen — die 4Ds: Delegation (Was soll KI tun, was der Mensch?), Beschreibung (Wie kommuniziere ich meine Vision an KI?), Urteilsfähigkeit (Wie bewerte ich KI-Ergebnisse kritisch?) und Sorgfalt (Wie übernehme ich Verantwortung für KI-gestützte Produkte?). Jede Kompetenz hat drei Unterbereiche: Produkt, Prozess und Performanz. Diese 24 konkreten Verhaltensweisen bilden zusammen das Fundament professioneller Mensch-KI-Zusammenarbeit — unabhängig davon, welches KI-Tool oder welche Plattform du nutzt.",
        example:
          "Eine Lehrkraft will Unterrichtsmaterial erstellen. Mit den 4Ds: Sie überlegt zuerst, welche Aufgaben KI übernehmen kann und welche nicht (Delegation). Sie formuliert einen präzisen Prompt mit Kontext, Beispielen und Vorgaben (Beschreibung). Sie prüft das Ergebnis kritisch auf Fehler und Bias (Urteilsfähigkeit). Sie dokumentiert den KI-Einsatz und übernimmt Verantwortung für das Endprodukt (Sorgfalt).",
        takeaway:
          "AI Fluency = Delegation + Beschreibung + Urteilsfähigkeit + Sorgfalt. Diese Kompetenzen gelten für jedes KI-Tool und jeden Kontext.",
      },
      {
        title: "Drei Modi der Mensch-KI-Interaktion",
        content:
          "Die 4D-Kompetenzen werden in drei verschiedenen Interaktionsmodi angewendet: Automation bedeutet, dass KI eine klar definierte Aufgabe eigenständig ausführt — z.B. eine E-Mail zusammenfassen oder Code generieren. Augmentation (Ko-Kreation) beschreibt die iterative Zusammenarbeit, bei der Mensch und KI gemeinsam ein Ergebnis entwickeln — z.B. einen Unterrichtsentwurf schrittweise verbessern. Agency bedeutet, dass ein Mensch ein KI-System so konfiguriert, dass es künftig eigenständig mit anderen Nutzern interagiert — z.B. ein Chatbot für Schüler. Jeder Modus erfordert unterschiedliche Kompetenzen: Automation braucht klare Aufgabenbeschreibung, Augmentation erfordert iteratives Feedback, Agency verlangt vorausschauendes Design und Verantwortungsbewusstsein.",
        example:
          "Automation: 'Fasse diesen Elternbrief in 3 Sätzen zusammen.' — Klare Aufgabe, einmaliger Output. Augmentation: Du und die KI entwickeln gemeinsam eine Unterrichtsreihe über 4 Prompt-Iterationen. Agency: Du erstellst einen KI-gestützten Vokabeltrainer, der eigenständig mit deinen Schülern interagiert — hier musst du vorausdenken, wie die KI auf verschiedene Eingaben reagieren soll.",
        takeaway:
          "Automation = KI führt aus. Augmentation = Mensch und KI arbeiten zusammen. Agency = KI handelt eigenständig für andere. Jeder Modus braucht andere Kompetenzen.",
      },
      {
        title: "Delegation: Die richtige Aufgabenverteilung",
        content:
          "Delegation ist die kreative Vision und die bewusste Entscheidung, ob, wann und wie KI eingesetzt wird. Sie umfasst drei Teilbereiche: Aufgabenbewusstsein (Ziele, Umfang und Erfolgskriterien vor dem KI-Einsatz klären), Plattformbewusstsein (realistische Einschätzung der Fähigkeiten und Grenzen von KI-Systemen, inklusive Halluzinationen und Wissensgrenzen) und strategische Aufgabenverteilung (menschliche Stärken wie Urteilsvermögen und Kreativität nutzen, KI-Stärken wie Geschwindigkeit und Mustererkennung einsetzen). Gute Delegation beginnt immer mit der Frage: Was ist das Ziel — und welchen Teil kann KI sinnvoll übernehmen?",
        example:
          "Vor dem Prompten fragt sich eine Lehrkraft: 'Brauche ich hier überhaupt KI? Welches Tool passt? Was sind die Grenzen?' Sie entscheidet: Für den Brainstorm-Teil nutzt sie KI (Stärke: viele Ideen schnell generieren), die didaktische Feinplanung macht sie selbst (Stärke: pädagogisches Urteil, Kenntnis der Lerngruppe).",
        takeaway:
          "Delegation = Ziele klären + KI-Fähigkeiten realistisch einschätzen + Aufgaben strategisch verteilen.",
      },
      {
        title: "Beschreibung: Effektiv mit KI kommunizieren",
        content:
          "Beschreibung (Description) ist die Kompetenz, Aufgaben und Visionen so zu formulieren, dass KI nützliche Ergebnisse liefert. Sechs Kerntechniken helfen dabei: Kontext geben (Hintergrund, Zielgruppe, Absicht), Beispiele zeigen (Few-Shot: 1-2 Muster des gewünschten Ergebnisses), Einschränkungen definieren (Format, Länge, Stil), komplexe Aufgaben aufteilen (Schritt für Schritt statt alles auf einmal), zum Nachdenken auffordern ('Denke Schritt für Schritt' = Chain-of-Thought), und Rolle/Ton festlegen (z.B. 'Du bist ein kritischer Lektor'). Beschreibung und Urteilsfähigkeit bilden einen kontinuierlichen Feedback-Loop: beschreiben → bewerten → verfeinern.",
        example:
          "Schlechter Prompt: 'Schreib was über Klimawandel.' — Guter Prompt: 'Du bist Fachlehrerin für Geografie in der 9. Klasse. Erstelle einen Lückentext (10 Lücken) zum Thema Treibhauseffekt. Verwende einfache Sprache (B1-Niveau). Hier ist ein Beispiel für das gewünschte Format: [Beispiel]. Maximal eine A4-Seite.'",
        takeaway:
          "Gute Beschreibung = Kontext + Beispiele + Einschränkungen + Struktur + Rolle. Der Beschreibungs-Urteilsfähigkeits-Loop verfeinert iterativ.",
      },
      {
        title: "Urteilsfähigkeit und Sorgfalt: Prüfen und Verantworten",
        content:
          "Urteilsfähigkeit (Discernment) bedeutet, KI-Ausgaben kritisch zu bewerten: Stimmen die Fakten? Ist die Argumentation logisch? Gibt es versteckte Verzerrungen? Fehlt etwas Wichtiges? Sorgfalt (Diligence) geht noch weiter: Sie umfasst die ethische Verantwortung für den gesamten KI-Einsatz. Dazu gehören drei Bereiche — Erstellungssorgfalt (verantwortungsvolle Toolauswahl, Bias erkennen), Transparenzsorgfalt (offen kommunizieren, wo KI beteiligt war) und Einsatzsorgfalt (Faktencheck, Sicherheitsprüfung, Verantwortung für das Endprodukt). Eine praktische Umsetzung ist die 'Sorgfaltserklärung' (Diligence Statement): ein kurzes Dokument, das beschreibt, wie KI eingesetzt wurde und wer die Verantwortung trägt.",
        example:
          "Eine Lehrkraft erstellt mit KI-Unterstützung ein Arbeitsblatt. Urteilsfähigkeit: Sie prüft jede Aufgabe auf fachliche Korrektheit und Altersgerechtheit. Sorgfalt: Sie ergänzt eine Sorgfaltserklärung: 'Dieses Material wurde mit KI-Unterstützung erstellt. Die fachliche und didaktische Prüfung erfolgte durch [Name]. KI-Tool: [Tool]. Die Verantwortung für den Inhalt liegt bei der Lehrkraft.'",
        takeaway:
          "Urteilsfähigkeit prüft die Qualität. Sorgfalt übernimmt die Verantwortung. Zusammen bilden sie das ethische Fundament professioneller KI-Nutzung.",
      },
    ],
    interactiveTools2: [
      {
        title: "AI Fluency Framework – Praktische Zusammenfassung (PDF)",
        description:
          "Das vollständige AI Fluency Framework von Feller & Dakan als Referenzdokument: Alle 4D-Kompetenzen, die drei Interaktionsmodi und 24 konkrete Verhaltensweisen auf einen Blick. Ideal als Nachschlagewerk für den professionellen KI-Einsatz. Lizenziert unter CC BY-NC-ND 4.0.",
        url: "https://www-cdn.anthropic.com/334975cdec18f744b4fa511dc8518bd8d119d29d.pdf",
        label: "Framework-PDF öffnen",
      },
      {
        title: "AI Fluency Schlüsselbegriffe – Cheat Sheet (PDF)",
        description:
          "Kompakte Übersicht aller wichtigen Begriffe des AI Fluency Frameworks: Von Delegation bis Sorgfaltserklärung, von Automation bis Agency. Perfekt zum Ausdrucken und als Schnellreferenz im Unterricht.",
        url: "https://www-cdn.anthropic.com/4396730ed190e691a3712cf2fd6bfe35509deca2.pdf",
        label: "Cheat Sheet öffnen",
      },
    ],
    knowledgeBlocks3Title: "Über uns",
    knowledgeBlocks3: [],
    knowledgeBlocks3Intro: {
      heading: "Herzlich willkommen bei DeepDiveKI",
      subheading: "Wer wir sind: Björn Isenbiel und Tim Philipp",
      videoUrl: "",
      transcript:
        "Der Schwerpunkt dieses Kurses liegt nicht wirklich auf KI als Technologie. Stattdessen geht es hauptsächlich um uns – die Menschen – und darum, wie wir mit KI-Systemen interagieren und zusammenarbeiten. Wir erkunden KI-Fluency, also unsere Fähigkeit, mit KI-Systemen auf eine Art und Weise umzugehen, die effektiv, effizient, ethisch und sicher ist. Es geht darum, sich Möglichkeiten vorzustellen, die KI nicht als eine Art fortgeschrittene Rechtschreibprüfung betrachten, sondern als vertrauenswürdigen Partner für kreative und innovative Problemlösungsarbeit. Dies wird Ihnen helfen, ein intuitives Gespür dafür zu entwickeln, was generative KI leisten kann und wie man am besten damit arbeitet. Wir lernen alle gemeinsam, wie wir diese sich schnell entwickelnde Landschaft navigieren können. Dieser Kurs soll die Art und Weise, wie wir KI angehen, grundlegend verändern.",
    },
    knowledgeBlocks3Videos: [
      {
        title: "Lektion 1: Einführung in KI-Fluency",
        videoUrl: "",
        transcript:
          "Beginnen wir unsere Erkundung des KI-Fluency-Frameworks. Der Schwerpunkt dieses Kurses liegt nicht wirklich auf KI als Technologie. Stattdessen geht es hauptsächlich um uns – die Menschen – und darum, wie wir mit KI-Systemen interagieren und zusammenarbeiten. Es geht darum, sich Möglichkeiten vorzustellen, die KI nicht als eine Art fortgeschrittene Rechtschreibprüfung betrachten, sondern als vertrauenswürdigen Partner für kreative und innovative Problemlösungsarbeit. Und es geht darum, diese Möglichkeiten selbstbewusst und kompetent anzugehen.\n\nSeien wir ehrlich: Die KI-Welt bewegt sich extrem schnell. Und es ist sehr schwer zu wissen, wo man anfangen oder wie man auf dem Laufenden bleiben soll, wenn man kein grundlegendes Framework hat, das einen leitet und über den nächsten Prompt-Engineering-Trend hinausführt. Deshalb veröffentlichen wir diesen Kurs.\n\nIn diesem Kurs erkunden wir KI-Fluency – unsere Fähigkeit, mit KI-Systemen auf eine Art und Weise umzugehen, die effektiv, effizient, ethisch und sicher ist. Sie werden viele praktische Fähigkeiten erlernen, aber es ist keine weitere Sammlung technischer Definitionen oder Prompting-Tipps, die nächsten Monat möglicherweise veraltet sind. Dieser Kurs soll die Art und Weise, wie wir KI angehen, grundlegend verändern. Wir wollen verändern, wie wir über KI denken, damit wir lernen können, mit KI zu denken.\n\nIn den letzten Jahren hat sich KI von einer Spezialtechnologie zu interaktiven Systemen gewandelt, die Millionen von Menschen täglich in der Schule, bei der Arbeit und zu Hause nutzen. Dieser Wandel schafft sowohl Chancen als auch Unsicherheiten. Wir beobachten Organisationen, die KI ohne klare Strategien einsetzen. Wir sehen Menschen, die frustriert mit Systemen sind, die sie nicht vollständig verstehen. Und wir alle erleben eine wachsende Kluft zwischen dem, was möglich ist, und dem, was sich vertraut und intuitiv anfühlt. Dieser Kurs soll uns dabei helfen, diese Lücke gemeinsam zu überbrücken.\n\nHier ist der Weg, den wir in diesem Kurs gehen werden: Zunächst geben wir einen Überblick über das KI-Fluency-Framework – ein Modell für die Interaktion zwischen Mensch und KI, das wir als nützlich und wirkungsvoll empfunden haben. Wir werden die Arten besprechen, wie wir mit KI-Systemen interagieren, und vier Kernkompetenzen, die wir die vier Ds nennen, die diese Interaktionen in etwas Reichhaltigeres und viel Lohnenderes verwandeln. Dann werden wir uns jede Kompetenz genauer ansehen.\n\nKurz gesagt sind dies: Delegation (Übertragung), die fragt: Wann sollten Menschen arbeiten und wann sollte KI arbeiten? Description (Beschreibung), die fragt: Wie kommunizieren wir klar mit KI-Systemen? Discernment (Urteilsvermögen), die fragt: Wie bewerten wir, was KI uns liefert? Und Diligence (Sorgfalt), die fragt: Wie stellen wir sicher, dass unsere Interaktion mit KI verantwortungsvoll, transparent und rechenschaftspflichtig ist?\n\nJeder Abschnitt enthält fokussierte Videos, gepaart mit Übungen und Materialien, um praktisches Verständnis aufzubauen. Wir hoffen, dass Sie während dieses Kurses viel Zeit damit verbringen werden, das Gelernte auszuprobieren. Sie werden auch direkt von einigen von uns bei Anthropic hören – darüber, was die heutige KI von früheren Technologien unterscheidet, über die echten Fähigkeiten und Grenzen dieser Systeme und über praktische Techniken, die die vier Ds anwenden.\n\nDie meisten KI-Trainings konzentrieren sich ausschließlich auf taktische Fähigkeiten wie bestimmte Prompts, Einstellungen oder Systeme. Während diese Fähigkeiten nützlich sind, können sie schnell veralten. Wir verfolgen einen anderen Ansatz und konzentrieren uns auf Kernkompetenzen und tiefes Verständnis, damit Sie nicht nur für die heutige KI, sondern auch für zukünftige Veränderungen gerüstet sind.\n\nAm Ende unserer gemeinsamen Zeit werden Sie haben: ein Framework, das Ihre eigenen Interaktionen mit KI leitet; Vertrauen in die Entscheidung, wann und wie KI effektiv eingesetzt werden soll; praktische Fähigkeiten für eine durchdachtere und flüssigere Mensch-KI-Zusammenarbeit; sowie die Fähigkeit, die Ergebnisse dieser Zusammenarbeit zu bewerten und Verantwortung dafür zu übernehmen. Vielen Dank, dass Sie dabei sind.",
      },
      {
        title: "Lektion 2A: Warum brauchen wir KI-Fluency?",
        videoUrl: "",
        transcript:
          "Beginnen wir unsere Erkundung des KI-Fluency-Frameworks, der für unser Lernen im Rest dieses Kurses zentral ist. Was bedeutet es wirklich, mit KI fluent zu sein? Warum ist das wichtig?\n\nWir leben in einem faszinierenden Moment des technologischen Wandels – einem, der sowohl Aufregung als auch Unsicherheit mit sich bringt. KI verändert, wie wir kommunizieren, schaffen, lernen und Probleme lösen – sowohl in unserem Berufs- als auch in unserem Privatleben. Viele von uns haben jetzt vielseitige Assistenten und virtuelle Mitarbeiter zur Hand, die beim Schreiben, Brainstorming, Recherchieren, Entscheiden und vielem mehr helfen können.\n\nAber hier ist die Sache: Diese leistungsstarken Systeme zu haben, bedeutet nicht automatisch, dass wir wissen, wie wir das Beste aus ihnen herausholen oder wie wir verantwortungsvoll mit ihnen umgehen. Denken Sie an einen Moment, in dem Sie eine unerwartete Antwort von einer KI bekamen und nicht wussten, wie Sie weiter vorgehen sollten. Oder als Sie Schwierigkeiten hatten, genau zu erklären, was Sie brauchten, und die Interaktion frustriert verließen. Oder vielleicht haben Sie sich gefragt, ob die Informationen, die Sie teilen, ordnungsgemäß geschützt werden.\n\nAll diese Momente verdeutlichen die Lücken zwischen dem bloßen Zugang zu KI und dem wirklichen Fluent-Sein damit. Wie bewegen wir uns also über ein paar Prompt-Tricks hinaus zu einem durchdachten und verantwortungsvollen Ansatz, der uns auch dann noch gut dient, wenn sich KI weiterentwickelt?\n\nKI-Fluency bedeutet nicht nur, ein technischer Experte zu sein oder die zehn besten Prompts für welche trendige Aufgabe auch immer auswendig zu lernen. Es geht darum, eine Sammlung praktischer Fähigkeiten, Kenntnisse, Einsichten und Werte zu entwickeln, die sich gegenseitig verstärken und sich an technologische Veränderungen anpassen. Im Kern bedeutet KI-Fluency, mit KI-Systemen auf eine Weise zu interagieren, die effektiv, effizient, ethisch und sicher ist.\n\nDurch unsere Forschung und persönliche Erfahrungen haben wir herausgefunden, dass es drei Hauptwege gibt, wie Menschen mit KI interagieren. Das Verständnis dieser Modi hilft uns zu sehen, warum KI-Fluency über einfaches Prompt Engineering hinausgehen muss.\n\nDie erste Interaktionsform mit KI ist Automatisierung (Automation), bei der ein KI-Assistent eine bestimmte Aufgabe basierend auf Ihren Anweisungen erledigt. Zum Beispiel könnten Sie eine KI bitten, ein Dokument für Sie zusammenzufassen, eine E-Mail zu entwerfen, ein Bild zu erstellen oder eine Reiseroute zu planen. Sie definieren, was getan werden muss, und die KI führt es aus. Das funktioniert gut, wenn Sie ein klares Ergebnis im Sinn haben. Es kann jedoch schwierig sein, wenn Sie noch nicht ganz sicher sind, was Sie eigentlich suchen.\n\nDer zweite Ansatz ist Augmentierung (Augmentation), bei der Sie und der KI-Assistent gemeinsam eine Aufgabe abschließen. Die KI wird nicht als Maschine zur Automatisierung einer Aufgabe behandelt. Stattdessen wird sie zu einem kreativen Denk- und Problemlösungspartner. Stellen Sie sich zum Beispiel vor, Sie entwickeln eine Figur für eine Geschichte und fühlen sich feststeckend. Sie könnten dies durch ein Gespräch mit dem KI-Assistenten erkunden, Ideen hin und her werfen, Hintergrundgeschichten ausarbeiten, mit Dialog experimentieren und die Figur anderweitig verfeinern. Dieser Ansatz funktioniert am besten, wenn Lösungen nicht geradlinig sind und Sie Raum zum Erkunden und Experimentieren brauchen.\n\nDer dritte Modus ist Agentur (Agency), bei der KI unabhängig in Ihrem Namen arbeitet. Zum Beispiel könnten Sie einen KI-Assistenten einrichten, der eingehende E-Mails nach Thema oder Dringlichkeit kategorisiert und möglicherweise sogar damit beginnt, Antworten auf die dringendsten zu entwerfen. Der Schlüsselgedanke ist, dass Sie anstatt spezifische Aktionen zu definieren, das Wissen und die Verhaltensmuster der KI festlegen. Sie werden weniger wie ein Drehbuchautor, der genaue Anweisungen gibt, und mehr wie ein Regisseur, der eine Vision setzt.\n\nKeiner dieser Ansätze ist von Natur aus besser als die anderen. Sie dienen unterschiedlichen Zwecken und glänzen in verschiedenen Situationen. Tatsächlich könnten Sie sogar alle drei in einem einzigen Projekt verwenden. Während viele mit Automatisierung beginnen, haben wir festgestellt, dass Augmentierung und Agentur Ansätze sind, die wirklich die einzigartigen Fähigkeiten der KI nutzen und dass diese Modi oft zu den kreativsten und effektivsten Lösungen führen.\n\nDas Verständnis dieser Unterschiede hilft uns zu erkennen, dass KI nicht nur ein Werkzeug ist. Es ist eine Technologie, die als Werkzeug, aber auch als Medium oder als Partner oder Mitschöpfer agieren kann – und manchmal alles davon gleichzeitig. Und dieser Wandel vom bloßen Werkzeug zum mächtigen Mitarbeiter gibt der Technologie eine neue Rolle in unserer kreativen und problemlösenden Arbeit. Das bedeutet, dass wir auch neue Rollen haben und neue Fähigkeiten entwickeln müssen. Diese Fähigkeiten beschreiben wir im KI-Fluency-Framework.",
      },
      {
        title: "Lektion 2B: Das 4D-Framework",
        videoUrl: "",
        transcript:
          "Nachdem wir nun erkundet haben, was KI-Fluency bedeutet und die verschiedenen Arten, wie wir mit KI interagieren, tauchen wir in die Kernkompetenzen ein, die uns helfen, KI-Zusammenarbeit effektiv, effizient, ethisch und sicher zu navigieren.\n\nEgal, wie Sie mit KI arbeiten – ob durch Automatisierung, Augmentierung oder Agentur –, es gibt vier wesentliche Kompetenzen, die den entscheidenden Unterschied machen. Wir nennen sie die vier Ds: Delegation, Description (Beschreibung), Discernment (Urteilsvermögen) und Diligence (Sorgfalt).\n\nErstens die Delegation, die sich auf das große Ganze konzentriert: Was versuchen Sie zu erreichen? Welche Arten von Arbeit sind involviert? Welche Arbeit sollten Sie selbst erledigen? Und wo könnte KI hilfreich sein? Denken Sie an ein Forschungsprojekt, an dem Sie arbeiten. Sie könnten entscheiden, Ihren KI-Assistenten lange Dokumente und Daten durchgehen zu lassen, dann eine durchdachte Diskussion über die Implikationen und Ergebnisse zu führen, aber die kritische Analyse und die abschließenden Schlussfolgerungen für sich selbst zu reservieren. Um effektiv zu delegieren, müssen Sie Ihr Ziel und das Problem, das Sie lösen, verstehen; erkennen, was KI gut und nicht gut kann; und die Arbeit durchdacht zwischen Ihnen und der KI aufteilen. Delegation bedeutet nicht nur, Aufgaben abzuladen. Es geht darum, eine klare Vision zu haben und strategisch zu wählen, wie KI in Ihren Prozess passt.\n\nDann kommt die Description (Beschreibung), die sich auf klare Kommunikation mit KI konzentriert. Bedenken Sie den Unterschied zwischen der vagen Aussage 'Mach mir ein Logo' und dem Beschreiben der Werte Ihres Unternehmens, der Zielgruppe, der bevorzugten Farben, Stilreferenzen und so weiter. Description geht über das Schreiben von Prompts hinaus. Es geht darum, detailreiche, kontextreiche Gespräche zu führen, die festlegen, was Sie zu erreichen hoffen, in welchem Format die Ausgabe sein soll, wie Sie möchten, dass die KI die Aufgabe angeht, den Kontext und die Informationen, die die KI benötigt, und den Ton und Stil der Interaktion.\n\nDas dritte D ist Discernment (Urteilsvermögen), das beinhaltet, was KI Ihnen liefert, durchdacht zu bewerten. Angenommen, Sie haben einen KI-Assistenten gebeten, eine Marketingstrategie vorzuschlagen. Ihr Urteilsvermögen kommt ins Spiel, wenn Sie beurteilen: Sind die Fakten korrekt? Macht das Reasoning Sinn? Stimmen die Empfehlungen mit Ihren Markenwerten und Ihrer Zielgruppe überein? Und hilft mir diese Ausgabe tatsächlich weiterzukommen? Discernment erfordert Fachkompetenz in einem Bereich und das Entwickeln des Urteils und der kritischen Einsicht, um Nützliches von Unnützem zu trennen und zu erkennen, wann KI-Ausgaben verfeinert werden müssen oder ganz beiseitegelegt werden sollten.\n\nSchließlich gibt es Diligence (Sorgfalt), die sich auf verantwortungsvolle KI-Interaktionen konzentriert. Wenn Sie beispielsweise KI verwenden, um Stellenbeschreibungen zu schreiben oder Bewerbungen zu überprüfen: Wie stellen Sie Fairness sicher und kontrollieren Sie auf potenzielle Vorurteile? Diligence bedeutet, Verantwortung für Ihre KI-unterstützte Arbeit zu übernehmen und bereit zu sein, hinter den mit KI-Unterstützung erstellten Endprodukten zu stehen.\n\nZusammenfassend: KI-Fluency bedeutet, praktische Fähigkeiten, Kenntnisse, Einsichten und Werte zu entwickeln, die Ihnen helfen, KI effektiv, effizient, ethisch und sicher zu nutzen. KI-Fluency umfasst vier Schlüsselkompetenzen: Delegation, um zu entscheiden, wann und wie KI eingesetzt werden soll; Description, um klar mit KI zu kommunizieren; Discernment, um KI-Ausgaben zu bewerten; und Diligence, um KI verantwortungsvoll zu nutzen.\n\nWas diese Kompetenzen so wertvoll macht, ist, dass sie nicht an spezifische KI-Tools oder -Techniken gebunden sind, die möglicherweise veralten. Stattdessen sind es grundlegende Fähigkeiten, die Ihnen helfen werden, sich neben dieser sich schnell entwickelnden Technologie anzupassen und zu wachsen.",
      },
      {
        title: "Lektion 3A: Was ist generative KI? (Deep Dive)",
        videoUrl: "",
        transcript:
          "Willkommen bei unserer Erkundung der generativen KI. In diesem Video werden wir tief in das eintauchen, was generative KI eigentlich ist, wie sie unter der Haube funktioniert und welche technologischen Durchbrüche diese Systeme möglich gemacht haben. Sie interagieren möglicherweise täglich mit generativer KI, ohne vollständig zu verstehen, was hinter den Kulissen passiert. Lassen Sie uns das ändern.\n\nGenerative KI bezieht sich auf Systeme der künstlichen Intelligenz, die neue Inhalte erstellen können, anstatt nur vorhandene Daten zu analysieren. Während herkömmliche KI beispielsweise E-Mails als Spam oder Nicht-Spam klassifizieren könnte, kann generative KI eine völlig neue E-Mail für Sie schreiben. Der erste Ansatz analysiert und kategorisiert. Der zweite erstellt etwas Neues, das vorher nicht existierte. Dies stellt einen grundlegenden Wandel in den KI-Fähigkeiten dar.\n\nGroße Sprachmodelle oder LLMs (Large Language Models) wie Anthropics Claude-Modelle sind ein prominenter Typ generativer KI. Sie werden Sprachmodelle genannt, weil sie darauf trainiert sind, menschliche Sprache vorherzusagen und zu generieren, und groß, weil sie Milliarden von Parametern enthalten – mathematische Werte, die bestimmen, wie das Modell Informationen verarbeitet, ähnlich wie synaptische Verbindungen in Ihrem Gehirn.\n\nDer Weg zur heutigen generativen KI war nicht plötzlich. Er umfasste drei entscheidende Entwicklungen, die zur richtigen Zeit zusammenkamen:\n\nErstens gab es algorithmische und architektonische Durchbrüche, die grundlegend veränderten, wie KI-Systeme lernen. Die Entwicklung der Transformer-Architektur im Jahr 2017 war ein Wendepunkt. Diese Architektur zeichnet sich dadurch aus, dass sie Textsequenzen verarbeitet und dabei die Beziehungen zwischen Wörtern über lange Passagen hinweg aufrechterhält – was für das Verständnis von Sprache im Kontext entscheidend ist.\n\nZweitens lieferte die Explosion digitaler Daten das wesentliche Rohmaterial für das Training. Moderne LLMs wie Claude lernen aus verschiedenen Quellen wie Websites, Code-Repositorys und anderen Texten, die menschliches Wissen und Kommunikation repräsentieren. Dieser riesige Informationsschatz hilft den Modellen, ein breites und differenziertes Verständnis sowohl von Sprache als auch von Konzepten zu entwickeln.\n\nDrittens machten massive Steigerungen der Rechenleistung es möglich, diese komplexen Modelle auf all diesen Daten zu trainieren. Spezialisierte Hardware wie GPUs (Graphics Processing Units) und TPUs (Tensor Processing Units) zusammen mit verteilten Computernetzwerken – oft als Cluster bezeichnet – ermöglichen eine Verarbeitung, die noch vor wenigen Jahren unmöglich gewesen wäre.\n\nDie Kombination dieser drei Faktoren führte zu einer wichtigen Entdeckung, die als Skalierungsgesetze (Scaling Laws) bekannt ist. Diese empirischen Erkenntnisse zeigten, dass mit zunehmender Größe der Modelle und mehr Trainingsdaten mit mehr Rechenleistung ihre Leistung auf vorhersehbare Weise verbesserte. Überraschenderweise fanden Forscher heraus, dass völlig neue Fähigkeiten entstanden, als diese Modelle größer wurden – Fähigkeiten, die niemand explizit programmiert hatte, wie das schrittweise Durchdenken von Problemen oder die Anpassung an neue Aufgaben mit minimalen Anweisungen.\n\nWerfen wir einen Blick hinter die Kulissen, wie diese Systeme tatsächlich funktionieren. Während des anfänglichen Trainings, auch Pre-Training genannt, analysieren LLMs wie Claude Muster in Milliarden von Textbeispielen. Das Modell lernt die statistischen Beziehungen zwischen Wörtern, Phrasen und Konzepten und baut dabei so etwas wie eine komplexe Karte von Sprache und Wissen auf. Dieses Pre-Training beinhaltet, dem Modell Text zu zeigen und es zu bitten, vorherzusagen, was als Nächstes kommt. Durch viele Iterationen verfeinert das Modell schrittweise seine Vorhersagen.\n\nNach dem Pre-Training durchlaufen Modelle ein zusätzliches Training namens Fine-Tuning, bei dem sie lernen, Anweisungen zu befolgen, hilfreiche Antworten zu geben und wichtigerweise zu vermeiden, schädliche Inhalte zu generieren. Dies beinhaltet oft menschliches Feedback zur Verbesserung der Modellleistung sowie verstärkendes Lernen, das Belohnungen und Strafen verwendet, um das Verhalten des Modells in Richtung Hilfsbereitschaft, Ehrlichkeit und Harmlosigkeit zu gestalten.\n\nWenn Sie mit Claude oder einem anderen LLM interagieren, geben Sie einen Prompt ein – Text, den das Modell liest und dann basierend auf während des Trainings erlernten Mustern fortsetzt. Das Modell ruft keine vorgeschriebenen Antworten aus einer Datenbank ab. Stattdessen generiert es neuen Text, der statistisch aus dem folgt, was Sie geschrieben haben.\n\nEs gibt auch eine praktische Grenze dafür, wie viele Informationen ein LLM auf einmal berücksichtigen kann, das so genannte Kontextfenster (Context Window). Denken Sie daran als das Arbeitsgedächtnis der KI. Dieses Fenster umfasst Ihre Prompts, die KI-Antworten und alle anderen Informationen, die Sie in Ihrem Gespräch geteilt haben.\n\nZusammenfassend sind die drei Merkmale, die moderne generative KI so leistungsstark machen: erstens die Fähigkeit, während des Trainings riesige Mengen an Informationen zu verarbeiten; zweitens die In-Context-Lernfähigkeit, bei der LLMs sich an neue Aufgaben basierend auf Anweisungen oder Beispielen in Ihrem Prompt anpassen können, ohne zusätzliches Training zu benötigen; und drittens entstehende Fähigkeiten, die aus der Skalierung entstehen – wenn diese Modelle größer werden, entwickeln sie Fähigkeiten, die nicht explizit in sie hineindesignt wurden, manchmal sogar ihre Schöpfer überraschend.",
      },
      {
        title: "Lektion 3B: Fähigkeiten und Grenzen",
        videoUrl: "",
        transcript:
          "Untersuchen wir nun, was generative KI kann und was nicht. Mit dem Fokus auf LLMs wie Claude – denken Sie daran als das Kennenlernen eines neuen Kollegen. Das Verstehen seiner Stärken und Grenzen hilft Ihnen, effektiver zusammenzuarbeiten.\n\nZunächst konzentrieren wir uns auf das, was diese Systeme bemerkenswert gut machen. Sie sind mit Sprache auf eine Weise versiert, die noch vor wenigen Jahren unmöglich erschien: das Verfassen von E-Mails, die Ihre Stimme einfangen; das Zusammenfassen langer Berichte; das Übersetzen zwischen Sprachen; und das Erklären komplexer Themen aus unzähligen Bereichen, von Mikrobiologie bis Marketingstrategie. Das Gleiche System, das Ihnen beim Schreiben von Poesie oder beim Brainstorming für Ihre Geburtstagsfeier hilft, kann sich umdrehen und Ihnen helfen, Quantencomputing-Konzepte zu verstehen oder vierteljährliche Geschäftstrends zu analysieren – alles durch einfache Unterhaltung.\n\nDiese Modelle können auch den Faden eines Gesprächs aufrechterhalten, sich an frühere Diskussionen erinnern und darauf aufbauen. Viele moderne LLMs können jetzt auch über ihre eigenen Kenntnisse hinausgehen, indem sie sich mit externen Tools und Informationsquellen verbinden – und so das Web durchsuchen, Dateien verarbeiten oder sogar andere Anwendungen nutzen.\n\nJedoch haben LLMs wie alle Technologien auch bestimmte Grenzen.\n\nErstens sind KI-Modelle durch ihre Trainingsdaten begrenzt. LLMs haben ein Wissensdatum (Knowledge Cutoff Date), basierend auf dem Zeitpunkt ihrer Ausbildung. Stellen Sie sich jemanden vor, der zu einem bestimmten Datum in einen Retreat ohne Internetzugang gegangen ist – er würde nichts von Ereignissen wissen, die danach eingetreten sind. Außerdem überprüft der Trainingsprozess nicht jede Tatsache in den Trainingsdaten. Das bedeutet, dass Modelle manchmal Ungenauigkeiten lernen und reproduzieren können. Dies führt zu dem, was oft als Halluzination bezeichnet wird – KI, die selbstbewusst etwas behauptet, das plausibel klingt, aber tatsächlich falsch ist.\n\nEine weitere wichtige Einschränkung ist das bereits erwähnte Kontextfenster. Wenn dieses Limit überschritten wird, kann die KI sich nicht an Informationen außerhalb des Fensters erinnern – in der Regel nach dem First-In-First-Out-Prinzip.\n\nAußerdem sind LLMs von Natur aus nicht-deterministisch – im Gegensatz zu herkömmlicher Software, die bei denselben Eingaben identische Ausgaben produziert. Stellen Sie dieselbe Frage zweimal und Sie erhalten möglicherweise leicht unterschiedliche Antworten. Diese Variabilität kann für Brainstorming und die Generierung vielfältiger Ideen großartig sein, erfordert aber Bewusstsein, wenn Konsistenz oder Genauigkeit entscheidend sind.\n\nWährend diese Modelle sich schnell verbessern, haben sie historisch gesehen auch Einschränkungen bei komplexen Reasoning-Aufgaben, insbesondere bei mathematischen oder logischen Problemen, die mehrere Schritte erfordern. Die gute Nachricht ist, dass neuere Reasoning- oder Extended-Thinking-Modelle, die speziell darauf ausgelegt sind, schrittweise zu denken, in diesen Bereichen starke Fortschritte zeigen.\n\nDas Gebiet der generativen KI entwickelt sich rasant weiter. Forscher arbeiten daran, aktuelle Einschränkungen durch Techniken wie Retrieval Augmented Generation (RAG) zu beheben, die Modelle mit externen Wissens- und Datenquellen verbinden. Das Verständnis, was KI kann und was nicht, ist entscheidend für KI-Fluency und hilft Ihnen zu bestimmen, wann und wie Sie diese Systeme am besten in Ihre Arbeit und Ihr tägliches Leben integrieren.\n\nDie komplementären Stärken von Menschen und KI: Wir bringen kritisches Denken, Urteilsvermögen, Kreativität und ethische Aufsicht, die KI möglicherweise schwer zu replizieren hat. Während KI Geschwindigkeit, Skalierung, Mustererkennung und die Fähigkeit bietet, riesige Mengen an Informationen zu verarbeiten.",
      },
      {
        title: "Lektion 4: Ein näherer Blick auf Delegation",
        videoUrl: "",
        transcript:
          "In diesem Video werden wir uns die Delegation-Kompetenz genauer ansehen. Denken Sie daran, dass KI-Fluency bedeutet, mit KI auf eine Weise zu arbeiten, die effektiv, effizient, ethisch und sicher ist. Delegation konzentriert sich hauptsächlich auf die ersten beiden davon – Sie effektiv und effizient mit KI-Unterstützung arbeiten zu lassen.\n\nIm Kern geht es bei Delegation darum zu entscheiden, welche Arbeit erledigt werden soll, welche Arbeit Sie selbst erledigen sollten und welche Arbeit möglicherweise besser für KI geeignet ist. Das mag einfach klingen, ist aber überraschend differenziert. Effektive Delegation erfordert das Verstehen sowohl dessen, was Sie zu erreichen versuchen, als auch was Sie und KI jeweils realistischerweise tun können.\n\nHier ist etwas, das Sie überraschen könnte: Der Eckpfeiler guter Delegation dreht sich eigentlich gar nicht um KI. Es geht um Ihre eigene Expertise und Ihr eigenes Verständnis davon, was Sie zu erreichen versuchen. Bevor Sie KI in ein Projekt einbeziehen, nehmen Sie sich einen Moment, um einige wichtige Fragen zu beantworten: Was genau versuchen Sie zu erreichen? Was ist Ihre Vision oder Ihre wichtigsten Projektziele? Wie sieht Erfolg für Sie aus? Und fragen Sie sich, welche Art von Denken und Arbeit nötig ist, um dorthin zu gelangen. Gibt es Bereiche, die einfach aber zeitaufwändig sind? Bereiche der Unsicherheit, in denen Sie einen vertrauenswürdigen Denkpartner gebrauchen könnten? Bereiche der Unwissenheit, wo Sie mehr Daten benötigen, oder Bereiche, die kritisches Urteilsvermögen erfordern?\n\nWir nennen dieses erste Konzept Problembewusstsein (Problem Awareness) – die Fähigkeit, Ihre Ziele klar zu definieren und zu verstehen, welche Arbeit erforderlich ist, bevor Sie KI ins Bild bringen.\n\nÜber das Verständnis Ihres Problems hinaus benötigen Sie auch ein funktionierendes Wissen über die KI-Landschaft. Verschiedene KI-Systeme bieten sehr unterschiedliche Fähigkeiten, und dieses Feld entwickelt sich fast täglich weiter. Effektive Delegation bedeutet nicht, ein perfektes System zu finden. Es geht darum, die einzigartigen Stärken und Grenzen der verschiedenen verfügbaren Optionen zu verstehen.\n\nWir nennen dieses zweite Konzept Plattformbewusstsein (Platform Awareness) – ein funktionierendes Wissen über verfügbare KI-Systeme und ihre spezifischen Fähigkeiten und Grenzen.\n\nSobald Sie sowohl Ihr Problem als auch die verfügbaren KI-Assistenten verstehen, entfaltet sich die eigentliche Kunst der Delegation: die durchdachte Verteilung der Arbeit zwischen menschlicher und künstlicher Intelligenz, um die einzigartigen Stärken beider zu nutzen. Fragen Sie sich: Welche spezifischen Teile Ihres Workflows würden von Automatisierung profitieren? Wo würde ein Augmentierungsansatz mehr Wert schaffen? Gibt es kritische Urteilsbereiche, die ausschließlich menschlich bleiben sollten?\n\nWir nennen dieses dritte Konzept Aufgabendelegation (Task Delegation) – den strategischen Prozess der Aufteilung der Arbeit zwischen Menschen und KI.\n\nZusammenfassend umfasst Delegation drei Schlüsselelemente: Problembewusstsein (Ihre Ziele und das zu lösende Problem verstehen); Plattformbewusstsein (KI-Fähigkeiten und -Grenzen verstehen); und Aufgabendelegation (die Arbeit strategisch aufteilen). Diese Kompetenz hebt etwas Wichtiges hervor: Effektive KI-Zusammenarbeit bedeutet nicht, das Steuer abzugeben. Es geht darum, durchdachte Entscheidungen zu treffen und Arbeit zu delegieren, die die einzigartigen Stärken sowohl menschlicher als auch künstlicher Intelligenz nutzt.",
      },
      {
        title: "Lektion 6: Ein näherer Blick auf Description",
        videoUrl: "",
        transcript:
          "In diesem Video werden wir tiefer in die KI-Fluency-Kompetenz der Description (Beschreibung) eintauchen. KI-Fluency bedeutet, effektiv, effizient, ethisch und sicher mit KI zu arbeiten. Description geht weit über das Schreiben cleverer Prompts hinaus. Es geht darum, mit der KI zu kommunizieren, um Aufgaben zu erklären, Fragen zu stellen, Kontext bereitzustellen und die Interaktion anderweitig zu lenken. Es geht darum, ein Gespräch zu steuern, das in die falsche Richtung geht. Es geht darum, den Denkprozess oder das logische Reasoning einer KI zu leiten. Und es geht darum, eine Art Denkumgebung aufzubauen, in der sowohl Sie als auch die KI Ihre beste Arbeit leisten können.\n\nDie Qualität der KI-Ausgaben hängt oft davon ab, wie klar Sie beschreiben, was Sie wollen. Es ist wie der Unterschied zwischen jemandem zu bitten, Abendessen zu machen, gegenüber dem Bereitstellen eines detaillierten Rezepts mit Zutaten und Kochanweisungen. KI kann Ihre Gedanken nicht lesen. Anstatt anzunehmen, dass die KI weiß, was Sie suchen, müssen Sie jedes relevante Detail erklären. Was ist der Kontext für diese Arbeit? Was suchen Sie genau? In welchem Format soll die Ausgabe sein? Wer ist das Publikum und welcher Stil ist angemessen? Lassen Sie KI nicht raten. Setzen Sie explizite Anforderungen und geben Sie der KI die Informationen, die sie benötigt, um tatsächlich das zu liefern, was Sie suchen.\n\nWir nennen dieses erste Konzept Produktbeschreibung (Product Description) – die Fähigkeit, klar zu definieren, was Sie von der KI erstellt oder bereitgestellt haben möchten.\n\nManchmal ist die Angabe, wie eine KI eine Aufgabe angehen soll, genauso oder sogar wichtiger als die Angabe des Endprodukts. Genau wie Sie vielleicht bevorzugen würden, dass ein Kollege ein Problem mit Ihrer spezifischen Methode angeht, können Sie steuern, wie eine KI Ihre Anfrage bearbeitet. Es gibt verschiedene Arten, dies anzugehen: Sie könnten allgemeine Orientierungen wie ein Handbuch geben, Schritt-für-Schritt-Anweisungen wie ein Kochbuch oder sogar eine Demonstration durch Beispiele. Sind spezifische Daten vorhanden, auf die die KI zurückgreifen soll? Gibt es spezifische Probleme, mit denen sie sich befassen soll, und in welcher Reihenfolge? Gibt es einen bestimmten Analysestil oder einen bestimmten Workflow?\n\nWir nennen dieses zweite Konzept Prozessbeschreibung (Process Description) – die Fähigkeit, zu leiten, wie der KI-Assistent Ihre Anfrage angehen soll.\n\nWenn Sie eines aus diesem Kurs mitnehmen, dann sollte es dies sein: KI-Tools sind keine Datenbanken oder Automaten. Sie sind interaktive Systeme, die sich in verschiedenen Kontexten unterschiedlich verhalten können – ähnlich wie Menschen es tun. Sie müssen erklären, wie sich die KI verhalten soll, um die besten Ergebnisse zu erzielen. Wenn Sie sich das nächste Mal mit KI zusammensetzen, denken Sie zuerst nach: Welche Art von Denkpartner brauche ich gerade? Verenge ich mich auf eine bestimmte Antwort oder versuche ich, mehrere Möglichkeiten zu erkunden? Soll die KI meine Annahmen in Frage stellen oder einfach meiner Führung folgen? Ausführliche Details liefern oder die Dinge kurz halten? Erklären, warum sie auf eine bestimmte Weise antwortet, oder mir einfach die Antwort geben?\n\nWir nennen dieses dritte Konzept Leistungsbeschreibung (Performance Description) – die Fähigkeit, die Verhaltensaspekte einer KI-Interaktion zu definieren.\n\nWenn Sie Ihre Kapazität für Description entwickeln, verwandeln Sie KI von generischen Assistenten in fein abgestimmte Denkpartner, die Ihre Bedürfnisse wirklich erfüllen können.",
      },
      {
        title: "Lektion 7: Effektive Prompting-Techniken (Deep Dive)",
        videoUrl: "",
        transcript:
          "Lassen Sie uns eine der praktischsten Fähigkeiten beim Arbeiten mit KI erkunden: das Verfassen effektiver Prompts. Das mag technisch oder kompliziert klingen, aber im Kern ist es überraschend unkompliziert. Prompting ist einfach, wie wir die Description-Kompetenz dieses Kurses in der Praxis anwenden – klar kommunizieren, was wir wollen, wie wir es wollen und wie wir mit unserem KI-Assistenten während des gesamten Prozesses interagieren möchten.\n\nDenken Sie an Prompting wie das Erklären einer Aufgabe an einen hilfreichen neuen Kollegen, der bereit ist zu helfen, aber klare Anweisungen und das Setzen von Erwartungen braucht, um seine beste Arbeit zu leisten. Wir werden KI in diesem Abschnitt verwenden, aber diese Tipps lassen sich auf viele andere KI-Systeme übertragen.\n\nEffektives Prompting verbindet vertraute menschliche Kommunikationsfähigkeiten mit einigen KI-spezifischen Überlegungen. Viele Prinzipien, die gute menschliche Kommunikation ausmachen – wie Klarheit, die Bereitstellung relevanten Kontexts und das Geben konkreter Beispiele – gelten auch beim Arbeiten mit KI. In diesem Video werden wir sechs grundlegende Prompting-Tipps erkunden:\n\n1. Geben Sie KI Kontext\n\nDas erste Prinzip ist einfach, aber wirkungsvoll: Seien Sie spezifisch und klar darüber, was Sie wollen, warum Sie es wollen und wer Sie sind. Nehmen wir einen einfachen Prompt: 'Erzähl mir von dem Klimawandel.' Eine spezifischere, kontextreiche Version könnte so aussehen: 'Erkläre drei wichtige Auswirkungen des Klimawandels auf die Landwirtschaft in tropischen Regionen mit Beispielen aus dem letzten Jahrzehnt. Ich bereite mich auf ein Vorstellungsgespräch in einem landwirtschaftlichen Forschungslabor in Indonesien vor. Ich habe einen Abschluss in Ökologie, aber kein spezifisches Wissen über den Klimawandel. Schreibe eine Zusammenfassung der Schlüsselkonzepte, die mir helfen würden, im Interview kompetent zu sprechen.'\n\n2. Zeigen Sie Beispiele, wie Gutes aussieht (Few-Shot Prompting)\n\nManchmal ist Zeigen besser als Erzählen. Das Bereitstellen von Beispielen der Art von Ausgabe, die Sie suchen, kann unglaublich effektiv sein. Zum Beispiel: 'Hier sind zwei Beispiele, wie man Fachjargon in einfache Sprache umwandeln kann. Original: Der Quantenalgorithmus zeigt quadratische Beschleunigung. Einfach: Die neue Methode löst Probleme etwa doppelt so schnell wie frühere Methoden. Jetzt konvertiere bitte dieses komplexe technische Handbuch in einfache Sprache.'\n\n3. Angabe von Ausgabebeschränkungen\n\nKlar zu sein über Ausgabebeschränkungen – wie das gewünschte Format und die Länge von KI Antwort – hilft sicherzustellen, dass Sie genau das bekommen, was Sie brauchen. Zum Beispiel: 'Erstelle eine saubere, moderne, einseitige Kunstportfolio-Website. Füge diese Hauptabschnitte ein: Hero, Über mich, Fähigkeiten, Portfolio, Projekte, Erfahrungen und Kontakt. Mach das Navigationsmenü sticky und responsiv mit Hamburger-Menü auf Mobilgeräten. Verwende eine Sonnenuntergangs-Farbpalette und füge einen Dunkel-Hell-Modus-Schalter in der Navigation hinzu.'\n\n4. Komplexe Aufgaben in Schritte aufteilen (Chain of Thought Prompting)\n\nWenn Sie eine komplizierte Anfrage haben, hilft es, sie in kleinere Schritte zu unterteilen. Anstatt zu fragen: 'Analysiere diese vierteljährlichen Verkaufsdaten', könnten Sie sagen: 'Ich möchte diese vierteljährlichen Verkaufsdaten analysieren. Bitte gehe so vor: Schau dir unsere Verkaufsunterlagen durch, um die meistverkauften Produkte zu identifizieren; vergleiche die aktuellen Quartalsergebnisse mit dem Vorquartal; hebe alle ungewöhnlichen Trends oder Muster hervor; und schlage dann mögliche Gründe für diese Trends vor.'\n\n5. Bitten Sie KI, zuerst zu denken\n\nManchmal kann es hilfreich sein, KI-Assistenten explizit Raum zu geben, seinen Prozess zuerst zu durchdenken, bevor er seine Aufgabe ausführt. Sie können dies zu Ihrem Prompt hinzufügen: 'Bevor du antwortest, denke bitte sorgfältig durch dieses Problem nach. Berücksichtige die verschiedenen beteiligten Faktoren, potenzielle Einschränkungen und verschiedene Ansätze, bevor du die beste Lösung empfiehlst.'\n\n6. Definieren Sie KI\\'s Rolle, Stil oder Ton\n\nDas Festlegen des Maßstabs an erwarteter Expertise, der Perspektive oder des Kommunikationsstils kann erheblich beeinflussen, wie KI eine Aufgabe angeht. Zum Beispiel: 'Erkläre bitte, wie Regenbögen entstehen, aus der Perspektive eines erfahrenen Naturwissenschaftslehrers, der mit einem klugen 10-jährigen spricht, der sich für Naturwissenschaften interessiert.' Oder: 'Als UX-Design-Experte überprüfe diesen Website-Wireframe und schlage drei Verbesserungen vor, die sich auf Benutzernavigation und Barrierefreiheit konzentrieren.'\n\nDie Geheimwaffe: Bitten Sie Claude, Ihren Prompt zu verbessern\n\nVielleicht die leistungsstärkste Technik ist, KI zu bitten, Ihren Prompt zu verbessern. Wenn Sie nicht sicher sind, wie Sie nach etwas fragen oder wie Sie Ihren Prompt verbessern sollen: 'Ich versuche, von dir, KI, Hilfe bei [Ziel] zu bekommen. Ich bin nicht sicher, wie ich meine Anfrage formulieren soll, um die besten Ergebnisse zu erzielen. Kannst du mir helfen, einen effektiven Prompt dafür zu erstellen?'\n\nEffektives Prompting ist iterativ\n\nKI-Systeme und Best Practices entwickeln sich ständig weiter. Wenn eine Antwort nicht ganz das ist, was Sie brauchen, versuchen Sie Ihren Ansatz zu verfeinern: Fügen Sie mehr Spezifität oder Kontext hinzu; stellen Sie Beispiele Ihrer gewünschten Ausgabe bereit; unterteilen Sie die Aufgabe in kleinere Schritte; oder probieren Sie eine andere Technik aus. Sie können auch um Variationen bitten, verschiedene Formate anfordern oder die Konversation bei Bedarf neu starten.\n\nEinige Muster funktionieren konsistent gut: Beginnen Sie mit einer klaren Aufgabenübersicht; fügen Sie Formatspezifikationen und Beispiele ein; setzen Sie explizite Einschränkungen oder Anforderungen; stellen Sie umfangreiche und relevante Hintergrundinformationen bereit. Häufige Fehler sind: anzunehmen, dass Claude Ihre Gedanken lesen kann; einen einzelnen Prompt mit mehreren unzusammenhängenden Aufgaben zu überladen; zu vage darüber zu sein, wie Erfolg aussieht; und kein Feedback zu vorherigen Antworten zu geben.\n\nDenken Sie daran, dass Prompt-Engineering eine sich entwickelnde Praxis ist. Wenn sich Modelle verbessern, werden einige spezifische Techniken weniger notwendig. Dennoch sind diese Prinzipien guter Kommunikation auch dann noch relevant, wenn sich die Art ihrer Anwendung ändert. Behalten Sie einen Geist des Experimentierens bei und passen Sie Ihren Ansatz basierend auf Ihren Ergebnissen an.",
      },
      {
        title: "Lektion 8: Ein näherer Blick auf Discernment",
        videoUrl: "",
        transcript:
          "In diesem Video werden wir tiefer in die KI-Fluency-Kompetenz des Discernment (Urteilsvermögen) eintauchen. Discernment geht es speziell darum, KI-Ausgaben, -Prozesse und -Verhaltensweisen zu bewerten – im Wesentlichen Ihr Qualitätskontrollsystem für die KI-Zusammenarbeit.\n\nDiscernment ist Ihre Fähigkeit, das, was KI produziert, wie sie es produziert und wie sie sich verhält, kritisch zu bewerten. Es ist gewissermaßen die Kehrseite der Description. Wenn Description darum geht, klar zu kommunizieren, was Sie wollen, geht Discernment darum zu entscheiden, ob das, was Sie zurückbekommen, wirklich Ihren Bedürfnissen entspricht.\n\nDie erste Form: Produktbeurteilung (Product Discernment)\n\nDie direkteste Form des Discernment ist die Beurteilung der Qualität dessen, was die KI tatsächlich produziert. Beim Überprüfen von KI-generierten Inhalten sollten Sie sich fragen: Ist dies faktisch korrekt? Ist es für mein Publikum und meinen Zweck geeignet? Ist es kohärent und gut strukturiert? Erfüllt es meine Anforderungen? Und fügt es Wert hinzu oder löst es das Problem, das ich beabsichtigt habe?\n\nProduktbeurteilung ist die Fähigkeit, die Genauigkeit und den Wert der von KI erstellten Ausgabe zu beurteilen.\n\nDie zweite Form: Prozessbeurteilung (Process Discernment)\n\nBei der Interaktion mit KI müssen Sie nicht nur bewerten, was die KI produziert, sondern auch wie sie dorthin gelangt ist. Einige Dinge, auf die Sie achten sollten: logische Fehler, Unterbrechungen in der Aufmerksamkeit der KI, das Ergreifen unangemessener Schritte, das Feststecken bei einem kleinen Detail oder einer Interpretation und die Unfähigkeit, Alternativen in Betracht zu ziehen, oder das Verfangen in kreisförmigem Reasoning.\n\nProzessbeurteilung ist die Fähigkeit, die Qualität und Effektivität des Prozesses der KI zu beurteilen. Sie ist notwendig, um sicherzustellen, dass Sie und die KI während des Prozesses synchron denken, und wird besonders wichtig für komplexe Aufgaben, bei denen die richtige Antwort nicht sofort offensichtlich ist.\n\nDie dritte Form: Leistungsbeurteilung (Performance Discernment)\n\nEs ist oft auch wertvoll, zu bewerten und zu leiten, wie sich die KI während Ihrer Interaktion verhält. Der Unterschied zwischen Prozess und Leistung ist vielleicht etwas subtil: Sie können sich den Prozess als die Arbeit vorstellen, die die KI erledigt, während die Leistung beschreibt, wie gut sie mit Ihnen während der Arbeit interagiert. Wenn Sie die Leistung eines KI-Assistenten bewerten, können Sie sich fragen: Gibt es eine bessere Möglichkeit für die KI, mit Ihnen zu kommunizieren? Stellt sie die Informationen, die Sie benötigen, auf hilfreiche Weise bereit? Reagiert sie gut auf Ihr Feedback und Ihre Anleitung? Ist die Interaktion effizient oder unnötig komplex?\n\nNatürlich endet Discernment nicht mit der Bewertung. Sie müssen auch Feedback geben, um das, was eine KI liefert, voranzubringen und zu verbessern. Wenn Sie Probleme in KI-Ausgaben identifizieren, umfasst effektives Feedback: das Spezifizieren des Problems, das klare Erklären, warum es ein Problem ist, das Bereitstellen konkreter Verbesserungsvorschläge und das Überarbeiten Ihrer Anweisungen oder Beispiele.\n\nDiscernment und Description arbeiten Hand in Hand. Während Description sich auf die Kommunikation Ihrer Bedürfnisse an KI konzentriert, bewertet Discernment, wie gut diese Bedürfnisse erfüllt wurden. Zusammen bilden sie einen kontinuierlichen Kreislauf aus Anweisung und Bewertung, der Qualität vorantreibt.",
      },
      {
        title: "Lektion 10: Ein näherer Blick auf Diligence",
        videoUrl: "",
        transcript:
          "In diesem Video werden wir die Diligence (Sorgfalt)-Kompetenz aus dem KI-Fluency-Framework untersuchen. Während sich die anderen drei Kompetenzen hauptsächlich mit Effektivität und Effizienz befassen, konzentriert sich Diligence hauptsächlich auf die ethischen und Sicherheitsaspekte, die für eine erfolgreiche KI-Zusammenarbeit genauso entscheidend sind.\n\nIm Kern geht es bei Diligence darum, Verantwortung für Ihre KI-Interaktionen zu übernehmen. Es ist die Dimension der KI-Fluency, die sicherstellt, dass Ihre Nutzung von KI-Systemen nicht nur produktiv, sondern auch rigoros, transparent und rechenschaftspflichtig ist.\n\nIm Gegensatz zu den anderen Kompetenzen, die sich hauptsächlich auf das Erzielen von Ergebnissen konzentrieren, bittet uns Diligence, breitere Fragen zu berücksichtigen: Was sind die Implikationen der Arbeit mit dieser KI? Wer könnte von dem betroffen sein, was erstellt wird? Wer hat Zugang zu den zur Erstellung dieser Ausgabe verwendeten Daten? Wie stelle ich sicher, dass meine Interaktion und das Ergebnis ethischen Standards und Werten entsprechen?\n\nDenken Sie daran wie beim Autofahren: Wir konzentrieren uns nicht nur darauf, effizient von Punkt A nach Punkt B zu gelangen. Wir berücksichtigen auch Sicherheit, befolgen Verkehrsregeln und bleiben uns bewusst, wie unser Fahren andere auf der Straße beeinflusst. Ähnlich erkennt Diligence, dass KI-Systeme und unsere Interaktionen mit ihnen nicht in einem Vakuum existieren.\n\nErste Form: Schöpfungssorgfalt (Creation Diligence)\n\nDiligence beginnt damit, kritischer darüber nachzudenken, mit welchen KI-Systemen wir arbeiten, wie wir mit ihnen arbeiten und welche Auswirkungen aus diesen Zusammenarbeiten entstehen. Wir sollten Antworten auf Fragen suchen wie: Wie ist dieses System trainiert und aufgebaut? Welche Daten wurden verwendet? Wem gehören die Daten, die ich jetzt eingebe? Wer könnte Zugang dazu haben, sobald sie geteilt werden? Wie schütze ich die Privatsphäre und Sicherheit von mir selbst und anderen? Wie stimmt diese Interaktion mit meinen persönlichen und beruflichen Werten oder den Richtlinien meiner Organisation überein?\n\nSchöpfungssorgfalt ist die Fähigkeit, kritisch und absichtsvoll darüber zu sein, mit welchen KI-Systemen Sie zusammenarbeiten und wie Sie mit ihnen arbeiten.\n\nZweite Form: Transparenzsorgfalt (Transparency Diligence)\n\nVerschiedene Umgebungen – persönliche, akademische, kreative und berufliche – können unterschiedliche Erwartungen bezüglich der Offenlegung von KI-Interaktionen haben. Es liegt jedoch in unserer eigenen Verantwortung, diese Erwartungen zu verstehen und zu erfüllen. Fragen Sie sich: Wer muss von der Rolle der KI in dieser Arbeit wissen? Wie und wann sollte ich dies kommunizieren? Welches Detailniveau macht Sinn? Das Erfüllen von Transparenzerwartungen – ehrlich und offen zu sein – geht nicht nur darum, Regeln und Vorschriften zu befolgen. Es geht darum, Vertrauen und Respekt in Ihren Beziehungen aufrechtzuerhalten.\n\nDritte Form: Bereitstellungssorgfalt (Deployment Diligence)\n\nWenn Sie von KI generierte Inhalte mit der Welt teilen, sind Sie – nicht die KI – letztendlich für deren Genauigkeit und Angemessenheit verantwortlich. Das bedeutet, Fakten zu überprüfen, auf Vorurteile zu prüfen, Genauigkeit und Nutzungsrechte sicherzustellen und andere notwendige Überprüfungen durchzuführen, damit Sie hinter dem stehen können, was Sie teilen.\n\nDenken Sie an einen Journalisten, der KI verwendet, um einen Artikel zu entwerfen. Vor der Veröffentlichung müssten sie jeden Fakt und jede Quelle überprüfen; sicherstellen, dass das endgültige Stück jedem journalistischen Standard entspricht – denselben Standards, die gelten würden, hätten sie es vollständig selbst geschrieben.\n\nZusammenfassend: Schöpfungs-, Transparenz- und Bereitstellungssorgfalt arbeiten zusammen, um die vollständige Diligence-Kompetenz zu bilden. Durch die Entwicklung Ihrer Kapazität für Diligence stellen Sie sicher, dass Ihre KI-Nutzung nicht nur effektiv und effizient, sondern auch ethisch und sicher ist. Diligence erinnert uns daran, dass unsere Interaktion mit KI mit Verantwortlichkeiten verbunden ist: Gedanken über die Systeme, mit denen wir arbeiten, ehrlich über die Rolle der KI in unserer Arbeit zu sein und letztendlich verantwortlich für das zu sein, was wir zusammen mit KI schaffen.",
      },
      {
        title: "Lektion 11: Schlussfolgerung",
        videoUrl: "",
        transcript:
          "Innerhalb eines kurzen Zeitraums haben wir gemeinsam viel Boden bedeckt und das KI-Fluency-Framework erkundet und gesehen, wie es auf die alltägliche Zusammenarbeit mit KI zutrifft. Lassen Sie uns einen Moment innehalten, um über das Gelernte nachzudenken, einige wichtige Erkenntnisse hervorzuheben und einen Blick darauf zu werfen, wohin Sie als Nächstes gehen könnten.\n\nBeginnen wir damit, die vier Kernkompetenzen – auch bekannt als die vier Ds – zu revisitieren, aus denen das KI-Fluency-Framework besteht.\n\nDelegation konzentriert sich darauf zu entscheiden, welche Arbeit von und mit KI erledigt werden sollte, im Vergleich zu dem, was am besten von Menschen allein erledigt wird. Sie kombiniert Ihr Verständnis des Problems, das Bewusstsein für KI-Fähigkeiten und die Fähigkeit, die Arbeit effektiv zwischen Ihnen und Ihren KI-Assistenten aufzuteilen.\n\nDescription befasst sich damit, wie wir mit KI-Systemen kommunizieren. Durch klare Artikulation dessen, was wir wollen, wie wir es angegangen haben wollen und welche Art von Interaktion uns am hilfreichsten ist – auch bekannt als Produkt-, Prozess- und Leistungsbeschreibung –, lenken wir KI dazu, die Ausgaben zu produzieren, die wir benötigen.\n\nDiscernment beinhaltet die kritische Bewertung von KI-Ausgaben und -Verhaltensweisen. Durch die Entwicklung Ihrer Fähigkeit, Ausgaben, Prozesse und Interaktionen zu bewerten – auch bekannt als Produkt-, Prozess- und Leistungsbeurteilung –, stellen Sie Qualität und Angemessenheit in allen Ihren KI-gesteuerten Ausgaben sicher.\n\nDiligence stellt sicher, dass unsere KI-Interaktionen verantwortungsvoll sind. Durch die durchdachte Auswahl von KI-Systemen, Transparenz über die Rolle der KI und die Übernahme von Verantwortung für das Endprodukt – auch bekannt als Schöpfungs-, Transparenz- und Bereitstellungssorgfalt – können wir ethisch und sicher mit KI arbeiten.\n\nDenken Sie daran, dass diese Kompetenzen für alle drei Arten gelten, wie wir mit KI interagieren: Automatisierung, bei der KI bestimmte Aufgaben gemäß Ihren Anweisungen ausführt; Augmentierung, bei der Sie und KI als Denkpartner zusammenarbeiten; und Agentur, bei der KI so konfiguriert ist, unabhängig in Ihrem Namen zu handeln.\n\nWenn Sie auf Ihrer KI-Reise weiterkommen, denken Sie an diese wesentlichen Einsichten: Für Delegation bleibt Ihre Expertise und Ihr Urteilsvermögen die Grundlage effektiver KI-Nutzung. Die mächtigsten Ergebnisse entstehen oft, wenn Sie Gelegenheiten identifizieren können, bei denen Sie und KI aufeinander aufbauen können. Für Description überbrückt klare Kommunikation Ihre Absichten und KI-Fähigkeiten. Manchmal sind die effektivsten Anweisungen keine aufwendigen Prompts, sondern durchdachte Gespräche. Für Discernment ist die kritische Bewertung von KI-Ausgaben eine nicht verhandelbare Verantwortung. Für Diligence: Sie bleiben verantwortlich für das, was Sie mit KI tun, und für die Auswirkungen auf andere. Transparent über die Rolle der KI in Ihrer Arbeit zu sein, schafft Vertrauen und Integrität.\n\nDiese Kompetenzen werden nicht über Nacht gemeistert. Sie entwickeln sich durch Übung. Das Fluency-Framework ist so gestaltet, dass es auf die breite Palette generativer KI-Assistenten anwendbar ist und auch dann relevant bleibt, wenn sich KI-Systeme weiterentwickeln.\n\nWir hoffen, dass dieser Kurs nur der Beginn Ihrer KI-Fluency-Reise ist. Diese Systeme sind mächtig, aber keine Wundermittel oder magischen Lösungen für jedes Problem. Sie sind nur so nützlich und sicher, wie wir sie ermöglichen. Investieren Sie also in Ihre eigene Expertise und bleiben Sie sich technologischer Veränderungen bewusst, damit Sie angemessen delegieren können. Üben Sie die Kunst der Description und des Discernment. Und übernehmen Sie vor allem Verantwortung für die Art und Weise, wie Sie mit KI arbeiten und was Sie gemeinsam schaffen.\n\nSeien Sie effektiv und effizient. Seien Sie ethisch und sicher. Wir lernen alle gemeinsam, wie wir diese sich schnell entwickelnde Landschaft navigieren können. Vielen Dank, dass Sie uns auf dieser Reise zu größerer KI-Fluency begleitet haben. Die Zukunft der Mensch-KI-Zusammenarbeit ist hell, und Sie sind jetzt besser gerüstet, sie durchdacht zu gestalten.",
      },
    ],
    interactiveTools3: [],
    exercise: {
      instruction:
        "Sortiere die folgenden Aussagen: Welche beschreiben eine menschliche Kompetenz (die KI NICHT ersetzen kann) und welche eine KI-Stärke?",
      categoryA: "Menschliche Kompetenz",
      categoryB: "KI-Stärke",
      items: [
        { id: "e1", label: "Muster in großen Datenmengen erkennen", correctCategory: "B" },
        { id: "e2", label: "Entscheiden, ob und wann KI eingesetzt werden soll (Delegation)", correctCategory: "A" },
        { id: "e3", label: "Wahrscheinliche Wortfolgen vorhersagen", correctCategory: "B" },
        { id: "e4", label: "KI-Ergebnisse kritisch auf Fehler und Bias prüfen (Urteilsfähigkeit)", correctCategory: "A" },
        { id: "e5", label: "Texte in verschiedenen Stilen generieren", correctCategory: "B" },
        { id: "e6", label: "Verantwortung für KI-gestützte Produkte übernehmen (Sorgfalt)", correctCategory: "A" },
        { id: "e7", label: "Bilder nach Beschreibungen erzeugen", correctCategory: "B" },
        { id: "e8", label: "Moralische Urteile begründet fällen", correctCategory: "A" },
        { id: "e9", label: "Klare Aufgabenbeschreibungen und Prompts formulieren (Beschreibung)", correctCategory: "A" },
        { id: "e10", label: "Aus großen Datenmengen statistische Zusammenhänge lernen", correctCategory: "B" },
      ],
      successMessage:
        "Richtig! KI ist stark bei Mustererkennung und Generierung. Aber die 4D-Kompetenzen — Delegation, Beschreibung, Urteilsfähigkeit und Sorgfalt — bleiben menschliche Aufgaben. AI Fluency bedeutet, diese Kompetenzen bewusst einzusetzen.",
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
        url: "https://www.deepdive-ki.de/software/intro_fb",
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
        question: "Welche vier Kompetenzen umfasst das AI Fluency Framework?",
        options: [
          {
            id: "a",
            label: "Programmieren, Prompten, Prüfen, Publizieren.",
            correct: false,
          },
          {
            id: "b",
            label: "Delegation, Beschreibung, Urteilsfähigkeit, Sorgfalt.",
            correct: true,
          },
          {
            id: "c",
            label: "Lesen, Schreiben, Rechnen, Coden.",
            correct: false,
          },
        ],
        explanation:
          "Die 4Ds des AI Fluency Frameworks sind: Delegation (Was soll KI tun?), Description/Beschreibung (Wie kommuniziere ich mit KI?), Discernment/Urteilsfähigkeit (Wie bewerte ich KI-Ergebnisse?) und Diligence/Sorgfalt (Wie übernehme ich Verantwortung?). Diese Kompetenzen sind plattformunabhängig und gelten für jedes KI-Tool.",
      },
      {
        id: "q5",
        question: "Was unterscheidet den Interaktionsmodus 'Augmentation' von 'Automation'?",
        options: [
          {
            id: "a",
            label: "Augmentation ist einfach ein schnellerer Automationsmodus.",
            correct: false,
          },
          {
            id: "b",
            label:
              "Bei Augmentation arbeiten Mensch und KI iterativ zusammen, bei Automation führt KI eine klar definierte Aufgabe eigenständig aus.",
            correct: true,
          },
          {
            id: "c",
            label: "Augmentation funktioniert nur mit Bildern, Automation nur mit Text.",
            correct: false,
          },
        ],
        explanation:
          "Automation = einmaliger Auftrag, KI liefert Ergebnis (z.B. 'Fasse zusammen'). Augmentation = iterative Zusammenarbeit über mehrere Runden mit menschlichem Feedback und Verfeinerung. Der dritte Modus, Agency, bedeutet, dass KI eigenständig mit anderen Nutzern interagiert.",
      },
      {
        id: "q6",
        question: "Warum gilt 'Sorgfalt' (Diligence) als Startpunkt für verantwortungsvolle KI-Nutzung?",
        options: [
          {
            id: "a",
            label: "Weil man erst die technischen Details verstehen muss.",
            correct: false,
          },
          {
            id: "b",
            label: "Weil ethische Grundsätze, Transparenz und Faktenprüfung vor dem KI-Einsatz etabliert sein sollten.",
            correct: true,
          },
          {
            id: "c",
            label: "Weil Sorgfalt bedeutet, möglichst wenig KI zu verwenden.",
            correct: false,
          },
        ],
        explanation:
          "Sorgfalt umfasst drei Bereiche: Verantwortungsvoller Einsatz (Creation Diligence), Transparenz über KI-Beteiligung (Transparency Diligence) und Faktenprüfung vor Veröffentlichung (Deployment Diligence). Wer zuerst die ethischen Leitplanken setzt, kann KI danach bewusster und sicherer einsetzen.",
      },
    ],
    challengeSummary:
      "Du weißt jetzt, wie KI Muster erkennt, warum Sprachmodelle überzeugend klingen ohne zu verstehen, und welche Risiken durch Halluzination und Bias entstehen. Du kennst das AI Fluency Framework mit seinen vier Kernkompetenzen — Delegation, Beschreibung, Urteilsfähigkeit und Sorgfalt — und verstehst die drei Interaktionsmodi Automation, Augmentation und Agency. In der Jump-&-Run-Challenge wendest du dieses Wissen an den Lernstationen an.",
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

const STEP_BASE = { labels: ["Einstieg", "Kernwissen"], icons: [IconPlayerPlay, IconBook] };
const STEP_TAIL = { labels: ["Praxis-Übung", "Wissens-Check", "Challenge-Start"], icons: [IconPuzzle, IconSparkles, IconRocket] };

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

  const hasKnowledge2 = !!(tutorial?.knowledgeBlocks2);
  const hasKnowledge3 = !!(tutorial?.knowledgeBlocks3);

  const STEP_LABELS = useMemo(() => {
    const extra: string[] = [];
    if (hasKnowledge2) extra.push(tutorial?.knowledgeBlocks2Title || "Kernwissen 2");
    if (hasKnowledge3) extra.push(tutorial?.knowledgeBlocks3Title || "Kernwissen 3");
    return [...STEP_BASE.labels, ...extra, ...STEP_TAIL.labels];
  }, [hasKnowledge2, hasKnowledge3, tutorial?.knowledgeBlocks2Title, tutorial?.knowledgeBlocks3Title]);

  const STEP_ICONS = useMemo(() => {
    const extra = [...(hasKnowledge2 ? [IconBook] : []), ...(hasKnowledge3 ? [IconBook] : [])];
    return [...STEP_BASE.icons, ...extra, ...STEP_TAIL.icons];
  }, [hasKnowledge2, hasKnowledge3]);

  const maxStep = STEP_LABELS.length - 1;

  // Step index mapping — knowledge steps shift exercise/quiz/challenge
  const extraSteps = (hasKnowledge2 ? 1 : 0) + (hasKnowledge3 ? 1 : 0);
  const STEP_KNOWLEDGE2 = hasKnowledge2 ? 2 : -1;
  const STEP_KNOWLEDGE3 = hasKnowledge3 ? 2 + (hasKnowledge2 ? 1 : 0) : -1;
  const STEP_EXERCISE = 2 + extraSteps;
  const STEP_QUIZ = 3 + extraSteps;
  const STEP_CHALLENGE = 4 + extraSteps;

  const [currentStep, setCurrentStep] = useState(0);

  // Einstieg lesson player state
  const [einstiegLesson, setEinstiegLesson] = useState(0);
  const [einstiegCompleted, setEinstiegCompleted] = useState<Set<number>>(new Set());
  const [savedPrompt, setSavedPrompt] = useState("");
  const [promptSaved, setPromptSaved] = useState(false);
  const [savedPromptClaude, setSavedPromptClaude] = useState("");
  const [promptSavedClaude, setPromptSavedClaude] = useState(false);
  const [quickdrawDrawings, setQuickdrawDrawings] = useState(["", "", ""]);
  const [quickdrawSaved, setQuickdrawSaved] = useState(false);

  const einstiegLessons = useMemo(() => [
    { title: "Fokus-Frage & Einführung", type: "focus" as const },
    { title: "So geht es los!", type: "video" as const },
    { title: "Quickdraw – KI erleben", type: "quickdraw" as const },
    { title: "Wofür eigentlich KI?", type: "wofuer" as const },
    { title: "Von speziellen Aufgaben zu genereller KI", type: "ki-kategorien" as const },
    { title: "Eingabe bei ChatGPT", type: "eingabe-chatgpt" as const },
    { title: "oder bei Claude", type: "eingabe-claude" as const },
    { title: "Ausgabe bei ChatGPT", type: "ausgabe-chatgpt" as const },
    { title: "Aufgabe eines LLM", type: "llm-aufgabe" as const },
    { title: "Soekia GPT – Ausprobieren", type: "soekia-gpt" as const },
  ], []);

  const handleEinstiegNext = useCallback(() => {
    setEinstiegCompleted((prev) => new Set(prev).add(einstiegLesson));
    if (einstiegLesson < einstiegLessons.length - 1) {
      setEinstiegLesson((l) => l + 1);
    }
  }, [einstiegLesson, einstiegLessons.length]);

  const handleEinstiegBack = useCallback(() => {
    if (einstiegLesson > 0) setEinstiegLesson((l) => l - 1);
  }, [einstiegLesson]);

  // Cookie consent for YouTube embeds (TTDSG)
  const hasFunctionalConsent = useCookieConsent();

  // Lesson player state (Kernwissen 3 / Über uns)
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  // Build lesson list from knowledgeBlocks3 data
  const lessonList = useMemo(() => {
    if (!tutorial) return [];
    const lessons: Array<{ type: "intro" | "video" | "block"; title: string; index: number }> = [];
    if (tutorial.knowledgeBlocks3Intro) {
      lessons.push({ type: "intro", title: tutorial.knowledgeBlocks3Intro.heading, index: 0 });
    }
    if (tutorial.knowledgeBlocks3Videos) {
      tutorial.knowledgeBlocks3Videos.forEach((vid, i) => {
        lessons.push({ type: "video", title: vid.title || `Video ${i + 1}`, index: i });
      });
    }
    if (tutorial.knowledgeBlocks3 && tutorial.knowledgeBlocks3.length > 0) {
      tutorial.knowledgeBlocks3.forEach((block, i) => {
        lessons.push({ type: "block", title: block.title, index: i });
      });
    }
    return lessons;
  }, [tutorial]);

  const handleLessonNext = useCallback(() => {
    setCompletedLessons((prev) => new Set(prev).add(currentLesson));
    if (currentLesson < lessonList.length - 1) {
      setCurrentLesson((l) => l + 1);
    }
  }, [currentLesson, lessonList.length]);

  const handleLessonBack = useCallback(() => {
    if (currentLesson > 0) setCurrentLesson((l) => l - 1);
  }, [currentLesson]);

  // Exercise state
  const [exerciseAssignments, setExerciseAssignments] = useState<Record<string, "A" | "B">>({});
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const [exerciseCorrect, setExerciseCorrect] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizChecked, setQuizChecked] = useState<Record<string, boolean>>({});

  // Knowledge block expand state
  const [expandedExamples, setExpandedExamples] = useState<Record<string | number, boolean>>({});

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
      if (step === STEP_EXERCISE) return exerciseCorrect;
      if (step === STEP_QUIZ) return allQuizCorrect && allQuizChecked;
      return true;
    },
    [exerciseCorrect, allQuizCorrect, allQuizChecked, STEP_EXERCISE, STEP_QUIZ]
  );

  const handleNext = () => {
    if (currentStep < maxStep && canAdvance(currentStep)) {
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
      <main className={`${bodyFont.className} min-h-screen bg-slate-100 px-6 pt-28 pb-16`}>
        <div className="mx-auto max-w-3xl border-4 border-black bg-white p-8 shadow-[6px_6px_0_#000]">
          <h1 className={`${pixelFont.className} text-2xl`}>Tutorial nicht gefunden</h1>
          <p className="mt-4 text-sm text-slate-700">Dieses Tutorial existiert nicht.</p>
          <Link
            href="/software/escape-game"
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
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-4">
        <Link
          href="/software/escape-game"
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
          Schritt {currentStep + 1} von {STEP_LABELS.length}
        </p>
      </section>

      {/* Step Content */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        {/* ────── Step 0: Einstieg (Lesson Player) ────── */}
        {currentStep === 0 && (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#000]">
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                  Lektion {einstiegLesson + 1} von {einstiegLessons.length}
                </span>
                <span className="text-xs text-slate-500">
                  {einstiegCompleted.size} abgeschlossen
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${accent.bg} transition-all duration-500`}
                  style={{ width: `${(einstiegCompleted.size / einstiegLessons.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Lesson list */}
            <div className="border-4 border-black bg-white shadow-[6px_6px_0_#000]">
              <button
                type="button"
                onClick={() => setExpandedExamples((prev) => ({ ...prev, einstiegList: !prev.einstiegList }))}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Kursübersicht</span>
                <IconChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${expandedExamples.einstiegList ? "rotate-90" : ""}`} />
              </button>
              {expandedExamples.einstiegList && (
                <div className="border-t-2 border-black px-2 py-2">
                  {einstiegLessons.map((lesson, li) => {
                    const isCompleted = einstiegCompleted.has(li);
                    const isCurrent = li === einstiegLesson;
                    return (
                      <button
                        key={li}
                        type="button"
                        onClick={() => {
                          if (isCompleted || isCurrent || li <= einstiegLesson) setEinstiegLesson(li);
                        }}
                        className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors ${
                          isCurrent
                            ? `${accent.light} ${accent.text} font-bold`
                            : isCompleted
                            ? "text-slate-600 hover:bg-slate-50"
                            : "text-slate-300"
                        }`}
                      >
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isCompleted ? "bg-emerald-500 text-white" : isCurrent ? `${accent.bg} text-white` : "bg-slate-200 text-slate-400"
                        }`}>
                          {isCompleted ? <IconCheck className="h-3 w-3" /> : li + 1}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Current lesson content */}
            {einstiegLesson === 0 && (
              <div className={`border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]`}>
                <div className="mb-6 overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Einsieg%20Lernen%20ueber%20KI%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mb-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Herzlich willkommen zum Bereich „Lernen über KI"! Ich bin Björn von DeepDiveKI und ich freue mich, dass du dabei bist.

Bevor wir loslegen, eine kurze Orientierung: In diesem Tutorial geht es darum, ein grundlegendes Verständnis davon aufzubauen, was Künstliche Intelligenz eigentlich ist — und was nicht. Wir schauen uns an, wie KI funktioniert, was sie kann, wo ihre Grenzen liegen und warum das für deinen Schulalltag relevant ist.

Du wirst dabei nicht nur zuhören und lesen, sondern vor allem selbst ausprobieren. Wir starten gleich mit einem kleinen Experiment, schauen uns dann an, wie moderne KI-Tools aufgebaut sind, und arbeiten uns Schritt für Schritt zum technischen Kern vor — der Token-Vorhersage.

Am Ende dieses Einstiegs wirst du wissen, was hinter dem „Zauber" von ChatGPT und Co. steckt. Und keine Sorge: Du brauchst dafür keinerlei Vorkenntnisse. Alles, was du mitbringen musst, ist Neugier.

Also — los geht's! Schau dir die Fokus-Frage unten an, die uns durch diesen gesamten Bereich begleiten wird.`}
                  </p>
                </div>
                <div className={`mb-4 inline-block rounded border-2 ${accent.border} ${accent.light} px-3 py-1 text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                  Fokus-Frage
                </div>
                <p className="text-lg font-bold">{tutorial.focusQuestion}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{tutorial.introText}</p>
              </div>
            )}

            {einstiegLesson === 1 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>So geht es los!</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/So%20geht%20es%20los%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Okay, genug Theorie — jetzt wird ausprobiert! In der nächsten Lektion findest du Quickdraw, ein Zeichenspiel von Google. Du bekommst einen Begriff und hast 20 Sekunden, um ihn zu zeichnen — und eine KI versucht in Echtzeit zu erraten, was du malst. Klingt nach Spaß? Ist es auch. Aber dahinter steckt echte KI. Klick auf nächste Lektion und probier es einmal aus.
                  </p>
                </div>
              </div>
            )}

            {einstiegLesson === 2 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>Quickdraw – KI erleben</h3>
                <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                  <div className="flex-1">
                    <img
                      src="/images/escape-game/quickdraw-banner.png"
                      alt="Quick, Draw! – Flugs gezeichnet!"
                      className="w-full max-w-sm rounded border-2 border-slate-200"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src="/images/escape-game/quickdraw-qr.png"
                      alt="QR-Code für Quick, Draw!"
                      className="h-32 w-32"
                    />
                    <a
                      href="https://quickdraw.withgoogle.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90`}
                    >
                      Quickdraw starten
                      <IconExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className={`mt-6 rounded border-2 ${quickdrawSaved ? "border-emerald-400 bg-emerald-50" : `${accent.border} ${accent.light}`} p-5`}>
                  <div className="mb-2 flex items-center gap-2">
                    <IconSparkles className={`h-4 w-4 ${quickdrawSaved ? "text-emerald-600" : accent.text}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${quickdrawSaved ? "text-emerald-600" : accent.text}`}>
                      {quickdrawSaved ? "Gespeichert!" : "Deine Zeichnungen"}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-slate-600">
                    Na, erinnerst du dich noch an deine Zeichnungen? Bitte trage hier 3 Zeichnungstitel ein.
                  </p>
                  <div className="flex flex-col gap-2">
                    {quickdrawDrawings.map((val, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500">{i + 1}</span>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => {
                            const updated = [...quickdrawDrawings];
                            updated[i] = e.target.value;
                            setQuickdrawDrawings(updated);
                            setQuickdrawSaved(false);
                          }}
                          placeholder={`Zeichnung ${i + 1}, z.B. Katze`}
                          className="flex-1 rounded border-2 border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-black focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (quickdrawDrawings.some((d) => d.trim())) setQuickdrawSaved(true); }}
                    disabled={!quickdrawDrawings.some((d) => d.trim())}
                    className={`mt-3 inline-flex items-center gap-2 border-2 border-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
                      quickdrawDrawings.some((d) => d.trim())
                        ? `${accent.bg} text-white hover:opacity-90`
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <IconSparkles className="h-3 w-3" />
                    {quickdrawSaved ? "Gespeichert" : "Speichern"}
                  </button>
                </div>
              </div>
            )}

            {einstiegLesson === 3 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>Wofür eigentlich KI?</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Wof%C3%BCr%20eigentlich%20KI%3F%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Willkommen zurück! Du hast gerade Quickdraw ausprobiert — und dabei vielleicht zum ersten Mal ganz bewusst ein neuronales Netzwerk trainiert. Denn genau das ist passiert: Jedes Mal, wenn du einen Gegenstand gezeichnet hast, hat das System deine Zeichnung analysiert und versucht, sie zu erkennen. Dabei hat es nicht nur geraten — es hat aus deiner Interpretation gelernt.

Das Spannende daran: Jeder Mensch zeichnet eine Katze, ein Fahrrad oder eine Brille anders. Deine Zeichnung ist deine persönliche Interpretation dieses Objekts. Und genau diese Vielfalt an Interpretationen ist es, die das neuronale Netzwerk hinter Quickdraw besser macht. Je mehr verschiedene Menschen zeichnen, desto mehr Varianten lernt das System — und desto zuverlässiger kann es in Zukunft erkennen, was gemeint ist.

Das ist im Kern das Prinzip hinter Künstlicher Intelligenz: Große Mengen an Daten analysieren, Muster darin erkennen und auf dieser Basis Entscheidungen treffen oder Vorhersagen machen. Bei Quickdraw sind die Daten deine Zeichnungen, die Muster sind die typischen Formen und Striche für bestimmte Objekte, und die Entscheidung ist: „Das sieht aus wie eine Katze."

Aber — und das ist wichtig — das System versteht nicht wirklich, was eine Katze ist. Es hat kein Bild einer echten Katze im Kopf. Es erkennt nur statistische Muster in Pixeln und Strichen. Diesen Unterschied zwischen Mustererkennung und echtem Verstehen werden wir in diesem Kurs noch genauer beleuchten.

Schauen wir uns jetzt an, wofür KI eigentlich eingesetzt wird — und was sie besonders gut kann.`}
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="/images/escape-game/wofuer-ki-folie.png"
                    alt="Wofür eigentlich KI? — Analyse großer Datenmengen → Muster erkennen → Entscheidungen treffen"
                    className="w-full rounded border-2 border-slate-200"
                  />
                </div>
              </div>
            )}

            {einstiegLesson === 4 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>Von speziellen Aufgaben zu genereller KI</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Von%20speziellen%20Aufgaben%20zu%20genereller%20KI%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Es gibt drei sehr grobe wissenschaftliche Theorien zu Künstlicher Intelligenz. Die klingen ein wenig, als hätte ein Kind sich diese Kategorien ausgedacht — aber sie helfen tatsächlich, das große Bild zu verstehen.

Die erste Kategorie ist die sogenannte schwache KI. Klingt nicht besonders beeindruckend, oder? Aber genau das ist alles, was wir heute haben. Schwache KI sind Systeme, die auf eine ganz bestimmte Aufgabe spezialisiert sind: Bilder erkennen, Texte generieren, Sprache übersetzen, Schach spielen. Quickdraw, das du gerade ausprobiert hast, ist ein perfektes Beispiel — es kann Zeichnungen erkennen, aber es kann dir nicht sagen, was es zum Abendessen empfiehlt. Auch ChatGPT und Claude sind schwache KI: Sie sind Spezialisten für Sprachverarbeitung, keine universellen Denker.

Dann gibt es die starke KI. Das wäre ein System, das eine allgemeine Intelligenz besitzt — so wie ein Mensch. Es könnte nicht nur Texte schreiben, sondern auch ein physisches Experiment durchführen, emotionale Zusammenhänge verstehen und sich selbst neue Aufgaben stellen. Klingt nach Science-Fiction? Ist es auch — bislang existiert starke KI nur als Forschungsvision. Niemand hat sie bisher gebaut, und ob das überhaupt möglich ist, darüber streiten sich die Experten.

Und dann gibt es noch die überlegene KI — die Superintelligenz. Eine KI, die in allen Bereichen die menschliche Intelligenz weit übertrifft. Das ist reine Hypothese, mehr Gedankenexperiment als Wissenschaft. Aber es ist wichtig zu wissen, dass diese Kategorie existiert — weil in der öffentlichen Debatte oft Fähigkeiten von schwacher KI mit Szenarien von Superintelligenz vermischt werden. Und das führt zu überzogenen Erwartungen oder unnötigen Ängsten.

Also merk dir: Alles, was du heute nutzt — jedes KI-Tool, jeder Chatbot, jede Bilderkennung — ist schwache KI. Spezialisiert, leistungsstark in seinem Bereich, aber weit entfernt von menschlicher Intelligenz. Diese Unterscheidung hilft enorm, KI realistisch einzuordnen.`}
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="/images/escape-game/ki-kategorien-folie.png"
                    alt="Von speziellen Aufgaben zu genereller KI — Schwache KI, Starke KI, Überlegene KI"
                    className="w-full rounded border-2 border-slate-200"
                  />
                </div>
              </div>
            )}

            {einstiegLesson === 5 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>Eingabe bei ChatGPT</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Eingabe%20bei%20ChatGPT%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Schauen wir uns jetzt mal ganz konkret an, wie so ein moderner KI-Chatbot eigentlich aufgebaut ist. Denn wenn du ChatGPT öffnest, siehst du nicht einfach nur ein Textfeld — da steckt viel mehr dahinter.

Oben links kannst du neue Chats starten und deine bisherigen Unterhaltungen durchsuchen. Das ist praktisch, weil du so an frühere Gespräche anknüpfen kannst.

Aber das wirklich Spannende passiert unten im Eingabefeld. Hier hast du nicht nur die Möglichkeit, eine Frage einzutippen. Über das Plus-Symbol kannst du Fotos und Dateien hinzufügen — PDFs, Bilder, Tabellen. Die KI kann diese dann analysieren und darüber sprechen. Dann gibt es Deep Research — damit durchsucht die KI eigenständig das Internet und erstellt dir einen ausführlichen Recherchebericht. Du kannst Bilder erstellen lassen, den Agentenmodus nutzen, und sogar einen speziellen Lernmodus aktivieren.

Unter „Mehr" findest du noch weitere Funktionen: Die Internetsuche, mit der ChatGPT aktuelle Informationen aus dem Web einbezieht — das ist wichtig, weil das Modell selbst ja einen Wissensstichtag hat. Dann gibt es Canvas — ein separates Fenster, in dem du gemeinsam mit der KI an Texten oder Code arbeiten kannst, ähnlich wie in einem geteilten Dokument. Und du kannst sogar Google Drive, OneDrive oder Sharepoint verbinden, sodass die KI direkt auf deine Dateien zugreifen kann.

Rechts unten siehst du außerdem einen Bereich mit Vorschlägen — die KI bietet dir Einstiegsfragen an, um das Gespräch zu starten. Und ganz wichtig: Du kannst auch per Spracheingabe mit der KI interagieren.

All das zeigt: Moderne KI-Chatbots sind längst keine einfachen Frage-Antwort-Maschinen mehr. Sie sind Plattformen mit Konnektoren, Integrationen und Werkzeugen, die weit über reines Texten hinausgehen.

Jetzt wollen wir aber auch mal etwas Konkretes ausprobieren: Wie kann ich denn zum Beispiel ein Arbeitsblatt mit der Canvas-Funktion erstellen? Canvas ist ja dieses geteilte Dokument-Fenster, das wir gerade erwähnt haben. Und genau da wird es für den Schulalltag richtig praktisch — denn statt nur eine Textantwort im Chat zu bekommen, kannst du das Arbeitsblatt direkt im Canvas bearbeiten, Abschnitte umformulieren, Aufgaben verschieben oder ergänzen, und das alles gemeinsam mit der KI in Echtzeit.

Ich zeige dir das jetzt einmal live: Ich öffne Canvas, gebe einen Prompt ein — zum Beispiel „Erstelle ein Arbeitsblatt zum Thema Fotosynthese für Klasse 7 mit drei Aufgaben in aufsteigender Schwierigkeit" — und du siehst, wie das Arbeitsblatt direkt im Canvas-Fenster entsteht. Jetzt kann ich einzelne Stellen markieren und der KI sagen: „Mach diese Aufgabe etwas leichter" oder „Ergänze hier einen Tipp für schwächere Schüler." Das Dokument wird in Echtzeit angepasst, ohne dass ich jedes Mal einen komplett neuen Prompt schreiben muss.

Und jetzt probier das einmal selber aus — öffne ChatGPT, aktiviere Canvas und erstelle dein eigenes Arbeitsblatt. Experimentier ruhig mit verschiedenen Fächern, Klassenstufen und Aufgabenformaten.`}
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="/images/escape-game/eingabe-chatgpt-folie.png"
                    alt="Eingabe bei ChatGPT — Übersicht der Eingabemöglichkeiten"
                    className="w-full rounded border-2 border-slate-200"
                  />
                </div>
                <div className={`mt-6 rounded border-2 ${promptSaved ? "border-emerald-400 bg-emerald-50" : `${accent.border} ${accent.light}`} p-5`}>
                  <div className="mb-2 flex items-center gap-2">
                    <IconSparkles className={`h-4 w-4 ${promptSaved ? "text-emerald-600" : accent.text}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${promptSaved ? "text-emerald-600" : accent.text}`}>
                      {promptSaved ? "Prompt gespeichert!" : "Dein Prompt"}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-slate-600">
                    Trage hier deinen benutzten Prompt ein und speichere ihn für einen magischen weiteren Schritt später im Tutorial.
                  </p>
                  <textarea
                    value={savedPrompt}
                    onChange={(e) => { setSavedPrompt(e.target.value); setPromptSaved(false); }}
                    placeholder="z.B. Erstelle ein Arbeitsblatt zum Thema Fotosynthese für Klasse 7..."
                    className="w-full rounded border-2 border-slate-300 bg-white p-3 text-sm text-slate-800 placeholder-slate-400 focus:border-black focus:outline-none"
                    rows={3}
                  />
                  <button
                    type="button"
                    onClick={() => { if (savedPrompt.trim()) setPromptSaved(true); }}
                    disabled={!savedPrompt.trim()}
                    className={`mt-3 inline-flex items-center gap-2 border-2 border-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
                      savedPrompt.trim()
                        ? `${accent.bg} text-white hover:opacity-90`
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <IconSparkles className="h-3 w-3" />
                    {promptSaved ? "Gespeichert" : "Prompt speichern"}
                  </button>
                </div>
              </div>
            )}

            {einstiegLesson === 6 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>oder bei Claude</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/oder%20bei%20Claude%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Und so sieht das Ganze bei Claude aus — dem KI-Assistenten von Anthropic. Auf den ersten Blick wirkt die Oberfläche etwas aufgeräumter, aber die Funktionen sind vergleichbar.

Oben siehst du drei Modi: Chat, Cowork und Code. Chat ist der klassische Gesprächsmodus. Cowork ist Claudes Version eines Canvas-Fensters — hier kannst du gemeinsam mit der KI an Dokumenten arbeiten, Texte überarbeiten oder Ideen strukturieren. Und Code ist ein spezieller Modus für Programmierung.

Links hast du die Seitenleiste mit deinen bisherigen Chats, Suche und verschiedenen Bereichen für Projekte und gespeicherte Inhalte.

Unten im Eingabefeld siehst du wieder das Plus-Symbol zum Hochladen von Dateien. Daneben kannst du das Modell auswählen — hier steht zum Beispiel Sonnet 4.6 mit dem Zusatz „Erweitert", was bedeutet, dass erweiterte Denkfähigkeiten aktiviert sind. Und rechts gibt es auch hier eine Spracheingabe.

Darunter findest du Schnellzugriffe: Code, Lernen, Strategisch planen, Schreiben und sogar die Möglichkeit, direkt aus Google Drive Dateien einzubinden.

Was auffällt: Beide Plattformen — ChatGPT und Claude — bieten ähnliche Grundfunktionen, aber mit unterschiedlichen Schwerpunkten. ChatGPT hat mehr Integrationen und Konnektoren zu externen Diensten. Claude setzt stärker auf den Cowork-Modus und strukturiertes Zusammenarbeiten. Beide können Dateien verarbeiten, im Internet suchen und per Sprache bedient werden.

Für dich als Lehrkraft ist wichtig: Es lohnt sich, beide Plattformen zu kennen und auszuprobieren. Je nach Aufgabe kann das eine oder das andere Tool besser passen. Und genau das ist Teil der Delegation-Kompetenz aus dem AI Fluency Framework — zu wissen, welches Tool für welche Aufgabe geeignet ist.

Jetzt schauen wir uns den Cowork-Modus mal in Aktion an. Stell dir vor, du willst eine Klassenarbeit vorbereiten — nicht einfach nur generieren lassen, sondern wirklich gemeinsam mit der KI entwickeln. Ich wechsle jetzt in den Cowork-Modus und gebe einen Prompt ein, zum Beispiel: „Erstelle einen Erwartungshorizont für eine Klassenarbeit im Fach Geschichte, Klasse 10, Thema Weimarer Republik. Drei Aufgaben: Reproduktion, Transfer, Reflexion."

Was jetzt passiert, ist anders als bei einem normalen Chat: Claude öffnet ein Dokument-Fenster — ähnlich wie ein geteiltes Google Doc. Dort entsteht der Erwartungshorizont Stück für Stück. Und jetzt kommt das Entscheidende: Ich kann direkt im Dokument einzelne Passagen markieren und Claude gezielt Anweisungen geben — „Formuliere dieses Bewertungskriterium konkreter" oder „Ergänze hier eine Teilaufgabe zur Quellenanalyse." Claude überarbeitet nur diese Stelle, ohne den Rest des Dokuments zu verändern.

Das ist der Unterschied zwischen Chat und Cowork: Im Chat bekommst du jedes Mal eine komplett neue Antwort. In Cowork arbeitest du iterativ an einem gemeinsamen Dokument — genau so, wie man es von der Ko-Kreation erwartet. Und jetzt probier das einmal selber aus.`}
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="/images/escape-game/eingabe-claude-folie.png"
                    alt="oder bei Claude — Übersicht der Eingabemöglichkeiten"
                    className="w-full rounded border-2 border-slate-200"
                  />
                </div>
                <div className={`mt-6 rounded border-2 ${promptSavedClaude ? "border-emerald-400 bg-emerald-50" : `${accent.border} ${accent.light}`} p-5`}>
                  <div className="mb-2 flex items-center gap-2">
                    <IconSparkles className={`h-4 w-4 ${promptSavedClaude ? "text-emerald-600" : accent.text}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${promptSavedClaude ? "text-emerald-600" : accent.text}`}>
                      {promptSavedClaude ? "Prompt gespeichert!" : "Dein Prompt"}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-slate-600">
                    Trage hier deinen benutzten Prompt ein und speichere ihn für einen magischen weiteren Schritt später im Tutorial.
                  </p>
                  <textarea
                    value={savedPromptClaude}
                    onChange={(e) => { setSavedPromptClaude(e.target.value); setPromptSavedClaude(false); }}
                    placeholder="z.B. Erstelle einen Erwartungshorizont für eine Klassenarbeit im Fach Geschichte..."
                    className="w-full rounded border-2 border-slate-300 bg-white p-3 text-sm text-slate-800 placeholder-slate-400 focus:border-black focus:outline-none"
                    rows={3}
                  />
                  <button
                    type="button"
                    onClick={() => { if (savedPromptClaude.trim()) setPromptSavedClaude(true); }}
                    disabled={!savedPromptClaude.trim()}
                    className={`mt-3 inline-flex items-center gap-2 border-2 border-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
                      savedPromptClaude.trim()
                        ? `${accent.bg} text-white hover:opacity-90`
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <IconSparkles className="h-3 w-3" />
                    {promptSavedClaude ? "Gespeichert" : "Prompt speichern"}
                  </button>
                </div>
              </div>
            )}

            {einstiegLesson === 7 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>Ausgabe bei ChatGPT</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Ausgabe%20bei%20ChatGPT%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Diese Ansicht kennst du natürlich: Du tippst eine Frage ein, drückst Enter — und die KI liefert eine Antwort. Hier haben wir ChatGPT gebeten, ein Gedicht im Duktus von Hermann Hesse zu schreiben, das Lehrerinnen und Lehrern LLMs erklärt. Und was wir zurückbekommen, klingt tatsächlich erstaunlich überzeugend — der Sprachrhythmus, die Wortwahl, sogar die melancholische Stimmung erinnern an Hesse.

Links siehst du: Das ist eine unveränderte, vollautomatisch generierte Antwort von ChatGPT. Kein Mensch hat daran nachgebessert. Rechts die Begriffe, die wir gleich genauer anschauen: Oben der Prompt — also unsere Eingabe, unsere Anweisung an die KI. Und unten die Ausgabe — Token für Token vom Sprachmodell generiert.

Aber halt — wie macht die KI das eigentlich? Woher „weiß" sie, wie Hermann Hesse schreibt? Woher kennt sie den Unterschied zwischen einem Gedicht und einem Sachtext? Und warum klingt das so überzeugend, obwohl die KI — wie wir gelernt haben — gar nichts versteht?

Die Antwort liegt in der Art, wie ein LLM arbeitet. Und genau das schauen wir uns in der nächsten Lektion an: Wie ein Sprachmodell Wort für Wort — oder genauer: Token für Token — seine Antwort aufbaut. Klick auf „Nächste Lektion" — es wird spannend.`}
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="/images/escape-game/ausgabe-chatgpt-folie.png"
                    alt="Ausgabe bei ChatGPT — Prompt und LLM Ausgabe als Token"
                    className="w-full rounded border-2 border-slate-200"
                  />
                </div>
              </div>
            )}

            {einstiegLesson === 8 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>Aufgabe eines LLM</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Aufgabe%20eines%20LLM%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Okay, jetzt wird es richtig spannend. Wir schauen uns an, wie ein großes Sprachmodell — ein LLM — tatsächlich funktioniert. Und ich verspreche dir: Es ist einfacher, als du denkst.

Ein LLM hat im Grunde genau eine Aufgabe: Das nächste Wort vorhersagen. Das ist alles. Kein Nachdenken, kein Verstehen, keine Meinung — nur die Frage: Welches Wort kommt wahrscheinlich als Nächstes?

Schauen wir uns das an einem Beispiel an. Nehmen wir den berühmten Satz: „Houston, wir haben..." — was kommt als Nächstes? Dein Bauchgefühl sagt wahrscheinlich sofort „ein Problem". Und genau so funktioniert ein LLM. Es bekommt die bisherigen Wörter als Input — das ist der Kontext — schickt sie durch das Modell und berechnet: Welches Wort folgt am wahrscheinlichsten?

Aber das Modell gibt nicht einfach ein einzelnes Wort aus. Es berechnet für jedes mögliche Wort in seinem Wortschatz eine Wahrscheinlichkeit. In unserem Beispiel: „ein" bekommt 90 Prozent, „eine" bekommt 5 Prozent, „seine" 2 Prozent, „deine" 1 Prozent — und Wörter wie „du" oder „Atlanta" liegen bei praktisch null Prozent. Das Modell wählt dann das Wort mit der höchsten Wahrscheinlichkeit aus.

Und jetzt kommt der entscheidende Trick: Das gewählte Wort wird an den bisherigen Text angehängt — und der gesamte Text geht wieder als neuer Input in das Modell. Aus „Houston, wir haben" wird „Houston, wir haben ein" — und das Modell berechnet erneut: Was kommt als Nächstes? Wahrscheinlich „Problem". Und so weiter, Token für Token, Wort für Wort.

Diesen Kreislauf siehst du auf der dritten Folie: Der Output wird wieder zum Input. Das Modell baut seine Antwort Stück für Stück auf — wie eine Perlenkette, bei der jede neue Perle von allen vorherigen abhängt.

Und jetzt verstehst du auch, warum das Hesse-Gedicht so überzeugend klang: Das Modell hat in seinen Trainingsdaten Millionen von Texten gelesen — darunter auch Gedichte von Hesse und über Hesse. Es hat gelernt, welche Wörter in einem bestimmten Kontext wahrscheinlich aufeinander folgen. Wenn der Prompt „im Duktus von Hermann Hesse" enthält, verschiebt sich die Wahrscheinlichkeitsverteilung in Richtung poetischer, melancholischer Sprache. Nicht weil die KI Hesse versteht — sondern weil sie die statistischen Muster seiner Sprache gelernt hat.

Das ist die zentrale Erkenntnis: Ein LLM versteht nichts. Es berechnet Wahrscheinlichkeiten. Aber es tut das so gut, dass die Ergebnisse täuschend intelligent wirken. Und genau deshalb ist es so wichtig, dass wir als Menschen die Ergebnisse kritisch prüfen — denn Plausibilität ist kein Beweis für Korrektheit.

In der nächsten Lektion kannst du das Ganze selbst ausprobieren — mit Soekia GPT, einem interaktiven Tool, das dir Token-Vorhersage live erleben lässt.`}
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  <img
                    src="/images/escape-game/llm-aufgabe-folie1.png"
                    alt="Aufgabe eines LLM — Das nächste Wort (Token) in einer Wortsequenz soll vorhergesagt werden"
                    className="w-full rounded border-2 border-slate-200"
                  />
                  <img
                    src="/images/escape-game/llm-aufgabe-folie2.png"
                    alt="Aufgabe eines LLM — Allen Tokens wird eine Wahrscheinlichkeit zugeordnet"
                    className="w-full rounded border-2 border-slate-200"
                  />
                  <img
                    src="/images/escape-game/llm-aufgabe-folie3.png"
                    alt="Aufgabe eines LLM — Der Token mit der höchsten Wahrscheinlichkeit wird angehängt"
                    className="w-full rounded border-2 border-slate-200"
                  />
                </div>
              </div>
            )}

            {einstiegLesson === 9 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>Soekia GPT – Ausprobieren</h3>
                <div className="overflow-hidden rounded border-2 border-black bg-black">
                  <video
                    controls
                    className="w-full bg-black"
                    preload="metadata"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Soekia%20GPT%20%E2%80%93%20Ausprobieren%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Skript
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
{`Jetzt bist du dran. In der letzten Lektion haben wir gesehen, wie ein LLM Token für Token seine Antwort aufbaut — immer das wahrscheinlichste nächste Wort. Aber wie fühlt sich das eigentlich an, wenn man selbst in die Rolle des Modells schlüpft?

Genau das kannst du jetzt mit Soekia GPT ausprobieren. Das ist eine interaktive Lernumgebung, die von der Pädagogischen Hochschule St. Gallen entwickelt wurde. Du siehst dort einen Trainingstext — also die Daten, aus denen das Mini-Modell lernt — und kannst dann beobachten, wie es basierend auf diesen Daten das nächste Wort vorhersagt.

Das Besondere: Du kannst den Trainingstext verändern. Füg neue Sätze hinzu, entferne welche, verändere die Gewichtung — und schau, was passiert. Plötzlich ändert sich die Vorhersage. Und genau hier wird es spannend: Wenn der Trainingstext einseitig ist, wird auch die Vorhersage einseitig. Das ist Bias — nicht weil das Modell „voreingenommen" ist, sondern weil die Daten es sind.

Und wenn das Modell eine Antwort generiert, die plausibel klingt, aber im Trainingstext gar nicht so vorkommt? Dann hast du eine Halluzination live erlebt — das Modell füllt Lücken mit statistisch wahrscheinlichen, aber falschen Informationen.

Probier es aus, experimentier mit verschiedenen Texten und beobachte, wie sich die Vorhersagen verändern. Du wirst danach ein viel intuitiveres Verständnis dafür haben, warum KI manchmal überraschend gut und manchmal überraschend falsch liegt.

Damit hast du den Einstieg geschafft! Du weißt jetzt, was KI im Kern macht — Muster erkennen und Wahrscheinlichkeiten berechnen — und du hast es selbst erlebt. Im nächsten Schritt, dem Kernwissen, vertiefen wir diese Grundlagen und schauen uns an, was das für den Schulkontext konkret bedeutet.`}
                  </p>
                </div>
                <div className="mt-4">
                  <img
                    src="/images/escape-game/soekia-gpt-folie.png"
                    alt="Soekia GPT – Token-Vorhersage interaktiv erleben"
                    className="w-full rounded border-2 border-slate-200"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <a
                    href="http://www.soekia.ch/GPT/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90`}
                  >
                    Soekia GPT ausprobieren
                    <IconExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Lesson navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleEinstiegBack}
                disabled={einstiegLesson === 0}
                className={`inline-flex items-center gap-2 border-2 border-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
                  einstiegLesson === 0
                    ? "bg-slate-100 text-slate-300"
                    : "bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                <IconChevronLeft className="h-4 w-4" />
                Vorherige Lektion
              </button>

              {einstiegLesson < einstiegLessons.length - 1 ? (
                <button
                  type="button"
                  onClick={handleEinstiegNext}
                  className={`inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90`}
                >
                  Nächste Lektion
                  <IconChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEinstiegCompleted((prev) => new Set(prev).add(einstiegLesson));
                  }}
                  className="inline-flex items-center gap-2 border-2 border-black bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90"
                >
                  <IconCheck className="h-4 w-4" />
                  Einstieg abschließen
                </button>
              )}
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

        {/* ────── Kernwissen 2 ────── */}
        {hasKnowledge2 && currentStep === STEP_KNOWLEDGE2 && (
          <div className="space-y-6">
            {tutorial.knowledgeBlocks2!.map((block, i) => (
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
                      onClick={() => setExpandedExamples((prev) => ({ ...prev, [`k2-${i}`]: !prev[`k2-${i}`] }))}
                      className={`mt-4 inline-flex items-center gap-2 border-2 ${accent.border} rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${accent.text} hover:${accent.light}`}
                    >
                      <IconBulb className="h-4 w-4" />
                      {expandedExamples[`k2-${i}`] ? "Beispiel ausblenden" : "Beispiel anzeigen"}
                    </button>
                    {expandedExamples[`k2-${i}`] && (
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

            {/* Interactive Tools 2 */}
            {tutorial.interactiveTools2 && tutorial.interactiveTools2.length > 0 && (
              <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-600">
                  <IconExternalLink className="h-4 w-4" />
                  Interaktive Tools & Referenzmaterial
                </div>
                <p className="mb-4 text-sm text-slate-600">
                  Vertiefe dein Verständnis des AI Fluency Frameworks mit diesen Ressourcen:
                </p>
                <div className="space-y-4">
                  {tutorial.interactiveTools2.map((tool) => (
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

        {/* ────── Kernwissen 3: Lesson Player ────── */}
        {hasKnowledge3 && currentStep === STEP_KNOWLEDGE3 && lessonList.length > 0 && (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#000]">
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                  Lektion {currentLesson + 1} von {lessonList.length}
                </span>
                <span className="text-xs text-slate-500">
                  {completedLessons.size} abgeschlossen
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${accent.bg} transition-all duration-500`}
                  style={{ width: `${((completedLessons.size) / lessonList.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Lesson list (collapsible sidebar) */}
            <div className="border-4 border-black bg-white shadow-[6px_6px_0_#000]">
              <button
                type="button"
                onClick={() => setExpandedExamples((prev) => ({ ...prev, lessonList: !prev.lessonList }))}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                  Kursübersicht
                </span>
                <IconChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${expandedExamples.lessonList ? "rotate-90" : ""}`} />
              </button>
              {expandedExamples.lessonList && (
                <div className="border-t-2 border-black px-2 py-2">
                  {lessonList.map((lesson, li) => {
                    const isCompleted = completedLessons.has(li);
                    const isCurrent = li === currentLesson;
                    const isLocked = li > currentLesson && !completedLessons.has(li - 1) && li !== 0;
                    return (
                      <button
                        key={li}
                        type="button"
                        onClick={() => {
                          if (isCompleted || isCurrent || li <= currentLesson) setCurrentLesson(li);
                        }}
                        disabled={isLocked}
                        className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors ${
                          isCurrent
                            ? `${accent.light} ${accent.text} font-bold`
                            : isCompleted
                            ? "text-slate-600 hover:bg-slate-50"
                            : isLocked
                            ? "text-slate-300"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isCompleted
                            ? "bg-emerald-500 text-white"
                            : isCurrent
                            ? `${accent.bg} text-white`
                            : "bg-slate-200 text-slate-400"
                        }`}>
                          {isCompleted ? <IconCheck className="h-3 w-3" /> : li + 1}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Current lesson content */}
            {(() => {
              const lesson = lessonList[currentLesson];
              if (!lesson) return null;

              // Intro lesson
              if (lesson.type === "intro" && tutorial.knowledgeBlocks3Intro) {
                const intro = tutorial.knowledgeBlocks3Intro;
                return (
                  <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                    <h2 className={`${pixelFont.className} text-lg md:text-xl`}>{intro.heading}</h2>
                    <p className={`${displayFont.className} mt-2 text-base ${accent.text}`}>{intro.subheading}</p>
                    <div className="mt-6 overflow-hidden rounded border-2 border-black bg-black">
                      {intro.videoUrl ? (
                        hasFunctionalConsent ? (
                          <iframe title="Intro Video" src={intro.videoUrl} className="h-64 w-full md:h-80" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        ) : (
                          <div className="flex h-64 w-full flex-col items-center justify-center gap-3 bg-slate-900 px-4 md:h-80">
                            <IconPlayerPlay className="h-12 w-12 text-slate-400" />
                            <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-400">
                              Video laden: Bitte aktiviere funktionale Cookies über die Privatsphäre-Einstellungen im Footer.
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="flex h-64 w-full items-center justify-center bg-slate-900 md:h-80">
                          <div className="flex flex-col items-center gap-3 text-slate-400">
                            <IconPlayerPlay className="h-12 w-12" />
                            <p className="text-sm font-bold uppercase tracking-widest">Video kommt bald</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {intro.transcript && (
                      <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                          <IconBook className="h-4 w-4" />
                          Transkript
                        </div>
                        <p className="text-sm leading-relaxed text-slate-700">{intro.transcript}</p>
                      </div>
                    )}
                  </div>
                );
              }

              // Video lesson
              if (lesson.type === "video" && tutorial.knowledgeBlocks3Videos) {
                const vid = tutorial.knowledgeBlocks3Videos[lesson.index];
                if (!vid) return null;
                return (
                  <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                    {vid.title && (
                      <h3 className={`${displayFont.className} mb-4 text-lg ${accent.text}`}>{vid.title}</h3>
                    )}
                    <div className="overflow-hidden rounded border-2 border-black bg-black">
                      {vid.videoUrl ? (
                        hasFunctionalConsent ? (
                          <iframe title={vid.title || `Video`} src={vid.videoUrl} className="h-64 w-full md:h-80" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        ) : (
                          <div className="flex h-64 w-full flex-col items-center justify-center gap-3 bg-slate-900 px-4 md:h-80">
                            <IconPlayerPlay className="h-12 w-12 text-slate-400" />
                            <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-400">
                              Video laden: Bitte aktiviere funktionale Cookies über die Privatsphäre-Einstellungen im Footer.
                            </p>
                          </div>
                        )
                      ) : (
                        <div className="flex h-64 w-full items-center justify-center bg-slate-900 md:h-80">
                          <div className="flex flex-col items-center gap-3 text-slate-400">
                            <IconPlayerPlay className="h-12 w-12" />
                            <p className="text-sm font-bold uppercase tracking-widest">Video kommt bald</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {vid.transcript && (
                      <div className="mt-6 rounded border-2 border-slate-200 bg-slate-50 p-5">
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                          <IconBook className="h-4 w-4" />
                          Transkript
                        </div>
                        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{vid.transcript}</p>
                      </div>
                    )}
                  </div>
                );
              }

              // Knowledge block lesson
              if (lesson.type === "block" && tutorial.knowledgeBlocks3) {
                const block = tutorial.knowledgeBlocks3[lesson.index];
                if (!block) return null;
                return (
                  <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${accent.bg} text-sm font-bold text-white`}>
                        {lesson.index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold">{block.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-700">{block.content}</p>
                        <button
                          type="button"
                          onClick={() => setExpandedExamples((prev) => ({ ...prev, [`k3-${lesson.index}`]: !prev[`k3-${lesson.index}`] }))}
                          className={`mt-4 inline-flex items-center gap-2 border-2 ${accent.border} rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${accent.text} hover:${accent.light}`}
                        >
                          <IconBulb className="h-4 w-4" />
                          {expandedExamples[`k3-${lesson.index}`] ? "Beispiel ausblenden" : "Beispiel anzeigen"}
                        </button>
                        {expandedExamples[`k3-${lesson.index}`] && (
                          <div className={`mt-3 rounded border-2 ${accent.border} ${accent.light} p-4 text-sm leading-relaxed`}>
                            {block.example}
                          </div>
                        )}
                        <div className="mt-4 flex items-start gap-2 rounded border-l-4 border-black bg-slate-50 p-3">
                          <IconArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                          <p className="text-sm font-bold text-slate-800">{block.takeaway}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Lesson navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleLessonBack}
                disabled={currentLesson === 0}
                className={`inline-flex items-center gap-2 border-2 border-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000] ${
                  currentLesson === 0
                    ? "bg-slate-100 text-slate-300"
                    : "bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                <IconChevronLeft className="h-4 w-4" />
                Vorherige Lektion
              </button>

              {currentLesson < lessonList.length - 1 ? (
                <button
                  type="button"
                  onClick={handleLessonNext}
                  className={`inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90`}
                >
                  Nächste Lektion
                  <IconChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCompletedLessons((prev) => new Set(prev).add(currentLesson));
                  }}
                  className={`inline-flex items-center gap-2 border-2 border-black bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90`}
                >
                  <IconCheck className="h-4 w-4" />
                  Kurs abschließen
                </button>
              )}
            </div>
          </div>
        )}

        {/* ────── Praxis-Übung ────── */}
        {currentStep === STEP_EXERCISE && (
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

        {/* ────── Wissens-Check ────── */}
        {currentStep === STEP_QUIZ && (
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

        {/* ────── Challenge-Start ────── */}
        {currentStep === STEP_CHALLENGE && (
          <div className="space-y-6">
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-600">
                <IconRocket className="h-4 w-4" />
                Zusammenfassung
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{tutorial.challengeSummary}</p>

              <div className="mt-6 flex flex-col items-center gap-4">
                <Link
                  href={`/software/escape-game?chapter=${tutorial.id}&mode=challenge#ueber-quest`}
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

          {currentStep < maxStep && (
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
