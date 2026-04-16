"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

const JumpRunChallenge = dynamic(
  () => import("../../EscapeGameContent").then((mod) => mod.JumpRunChallenge),
  { ssr: false },
);
import {
  IconArrowLeft,
  IconArrowRight,
  IconBolt,
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
  IconUsers,
  IconNotebook,
  IconShieldCheck,
  IconX,
} from "@tabler/icons-react";
import { pixelFont, displayFont, bodyFont } from "../../_lib/fonts";
import type { DimensionId } from "../../_lib/types";

/** Derive a .vtt subtitle URL from a .mp4 video URL. */
function vttUrl(mp4: string): string {
  return mp4.replace(/\.mp4$/, ".vtt");
}

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
  hideEinstieg?: boolean;
  knowledgeBlocks?: KnowledgeBlock[];
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
  mitLessons?: Array<{ title: string; type: string }>;
  mitLessonsScripts?: string[];
  mitLessonsVideoUrls?: string[];
  mitLessonsLinks?: Record<number, { url: string; label: string }>;
  ldkLessons?: Array<{ title: string; type: string }>;
  ldkLessonsScripts?: string[];
  ldkLessonsVideoUrls?: string[];
  ldkLessonsLinks?: Record<number, { url: string; label: string }>;
  ltkLessons?: Array<{ title: string; type: string }>;
  ltkLessonsScripts?: string[];
  ltkLessonsVideoUrls?: string[];
  ltkLessonsLinks?: Record<number, { url: string; label: string }>;
  exercise?: InteractiveExercise;
  quizQuestions?: QuizQuestion[];
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
    /* ── Kernwissen (auskommentiert) ──
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
    ── Ende Kernwissen ── */
    /* ── AI Fluency Framework (auskommentiert) ──
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
    ── Ende AI Fluency Framework + Über uns ── */
    /* ── Praxis-Übung (auskommentiert) ──
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
    ── Ende Praxis-Übung + Wissens-Check ── */
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
    hideEinstieg: true,
    ldkLessons: [
      { title: "Willkommen in der Dimension LDK", type: "video" },
      { title: "Spielregeln: Analyse & Dokumentation", type: "video" },
      { title: "Level 1: KI-Feedback erleben – Auftrag", type: "video" },
      { title: "Level 1: KI-Feedback erleben – Reflexion", type: "video" },
      { title: "Level 2: Adaptives Lernsystem – Auftrag", type: "video" },
      { title: "Level 2: Adaptives Lernsystem – Reflexion", type: "video" },
      { title: "Level 3: Tutor durch Mega-Prompt – Auftrag", type: "video" },
      { title: "Level 3: Tutor durch Mega-Prompt – Reflexion", type: "video" },
      { title: "Steuerungsmatrix: Einordnung & Analyse", type: "video" },
      { title: "Governance-Ebene: Das Tor zur Freischaltung", type: "video" },
    ],
    ldkLessonsVideoUrls: [
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Willkommen%20in%20der%20Dimension%20LDK.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Spielregeln-%20Analyse%20%26%20Dokumentation.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Level%201-%20KI-Feedback%20erleben%20%E2%80%93%20Auftrag.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Level%201-%20KI-Feedback%20erleben%20%E2%80%93%20Reflexion.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Level%202-%20Adaptives%20Lernsystem%20%E2%80%93%20Auftrag.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Level%202-%20Adaptives%20Lernsystem%20%E2%80%93%20Reflexion.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Level%203-%20Tutor%20durch%20Mega-Prompt%20%E2%80%93%20Auftrag.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Level%203-%20Tutor%20durch%20Mega-Prompt%20%E2%80%93%20Reflexion.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Steuerungsmatrix-%20Einordnung%20%26%20Analyse.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game%20LDK/Governance-Ebene-%20Das%20Tor%20zur%20Freischaltung.mp4",
    ],
    ldkLessonsLinks: {
      2: { url: "https://peer-ai-tutor.streamlit.app", label: "PEER KI-Tutor öffnen" },
      4: { url: "https://smartresponse.westermann.de/klasse-7/wortschatz/wortschatz/wortschatz-menschen-und-gefuehle-people/", label: "Westermann Smart Response öffnen" },
      6: { url: "https://digitaleprofis.de/kuenstliche-intelligenz/chatgpt/mega-prompts/chatgpt-mega-prompt-4-der-tutor-prompt/", label: "Mega-Prompt Tutor öffnen" },
    },
    ldkLessonsScripts: [
      `Willkommen in der Dimension „Lernen durch KI"! Ich bin Toni und ich freue mich, dass du dabei bist.

In dieser Dimension geht es um eine grundlegende Frage: Was passiert, wenn KI selbst zum lernsteuernden Akteur wird? Nicht du steuerst die KI — die KI steuert deinen Lernprozess. Sie gibt Feedback, passt Schwierigkeitsgrade an, wählt Aufgaben aus und bereitet Entscheidungen vor.

Das klingt erst mal praktisch. Aber es wirft Fragen auf, die wir professionell beantworten müssen: Wer lernt eigentlich — und wer kontrolliert? Wo unterstützt algorithmische Steuerung den Lernprozess — und wo ersetzt sie menschliches Urteil?

In diesem Tutorial wirst du drei Ebenen kooperativer KI-Nutzung erleben: Erstens KI-Feedback — wie gut ist es wirklich? Zweitens adaptive Lernsysteme — welche Logik steckt dahinter? Und drittens KI-Tutoring — was passiert, wenn du selbst einen KI-Tutor baust?

Am Ende formulierst du ein Governance-Statement für deine Einrichtung. Dafür brauchst du eine Steuerungsmatrix, die sichtbar macht, wo menschliche und wo algorithmische Kontrolle dominiert.

Du wirst dabei nicht nur zuhören, sondern aktiv testen, analysieren und reflektieren. Jede Rückmeldung der KI wird kritisch geprüft. Jede Steuerungsentscheidung dokumentiert.

Und keine Sorge: Du brauchst dafür keinerlei Vorkenntnisse. Alles, was du mitbringen musst, ist Neugier und eine gesunde Portion Skepsis.

Also — los geht's! Schau dir die Fokus-Frage unten an, die uns durch diesen gesamten Bereich begleiten wird.`,

      `Bevor wir starten, die Spielregeln für diese Dimension. Hier geht es nicht ums Produzieren — sondern ums Analysieren.

Regel Nummer 1: Dokumentiert alle Schritte im Logbuch. Was habt ihr getestet? Was hat die KI zurückgegeben? Wie habt ihr es bewertet? Das Logbuch ist euer Analysewerkzeug — nicht nur ein Protokoll.

Regel Nummer 2: Nutzt KI-Tools aktiv und testet ihre Rückmeldungen. Ihr sollt nicht nur lesen, was KI kann — ihr sollt es erleben. Gebt eigene Texte ein, probiert adaptive Systeme aus, baut einen eigenen Tutor.

Regel Nummer 3: Prüft jede Rückmeldung kritisch. Klingt das Feedback der KI professionell — oder nur professionell? Ist es spezifisch oder generisch? Hilft es beim nächsten Lernschritt — oder bestätigt es nur, was offensichtlich ist?

Regel Nummer 4: Euer Ziel ist die Analyse von Steuerungsverschiebungen. Wo verschiebt sich Kontrolle vom Menschen zur Maschine? Wo ist das sinnvoll — und wo problematisch?

Am Ende steht eine Steuerungsmatrix und ein Governance-Statement. Das ist eure Escape-Bedingung.

Nehmt euch euer Logbuch — ab jetzt wird analysiert.`,

      `Willkommen bei Level 1: KI-Feedback erleben.

Eure Aufgabe: Lasst euch von einem KI-Tool Rückmeldung zu einem eigenen kurzen Text geben. Nutzt dafür den PEER KI-Tutor — ein kostenloses Feedback-Tool der TU München, das speziell für schulische Texte entwickelt wurde.

So geht ihr vor: Schreibt einen kurzen Text — das kann ein Aufsatz-Absatz sein, eine Argumentation, eine Erörterung oder ein Sachtext. Etwa 100 bis 200 Wörter reichen. Gebt diesen Text in den PEER KI-Tutor ein und lasst euch Feedback generieren.

Über den Button unten kommt ihr direkt zum PEER KI-Tutor.

Und jetzt beginnt eure eigentliche Arbeit — die Analyse: Lest das Feedback sorgfältig. Nicht als Empfänger, sondern als Analytiker. Fragt euch: Was genau sagt mir dieses Feedback? Ist es aufgabenbezogen oder allgemein? Gibt es einen konkreten nächsten Schritt — oder klingt es nur so?

Dokumentiert im Logbuch:
— Welchen Text habt ihr eingegeben?
— Was hat der PEER KI-Tutor zurückgegeben?
— Wie bewertet ihr die Qualität des Feedbacks?
— Was hättet ihr als Lehrkraft anders formuliert?

Das ist der Kern dieser Übung: Ihr erlebt KI-Feedback nicht als Nutzer, sondern als professionelle Analytiker. Denn genau das brauchen Lehrkräfte, wenn sie KI-Feedback-Tools im Unterricht einsetzen wollen.`,

      `Ihr habt KI-Feedback erlebt. Jetzt reflektieren wir — vier zentrale Fragen:

Erstens: Wie spezifisch ist das Feedback? Hat der PEER KI-Tutor konkrete Stellen in eurem Text benannt — oder hat er allgemeine Ratschläge gegeben? Professionelles Feedback nach Hattie und Timperley beantwortet drei Fragen: Wo will ich hin (Feed Up)? Wo stehe ich (Feed Back)? Was ist der nächste Schritt (Feed Forward)? Prüft: Hat das KI-Feedback alle drei Fragen beantwortet?

Zweitens: Wo wirkt es adaptiv? Hat das Feedback auf die spezifischen Schwächen eures Textes reagiert — oder hätte es bei jedem beliebigen Text ähnlich geklungen? Echte Adaptivität bedeutet: Das Feedback verändert sich, wenn der Text sich verändert. Testet das — gebt einen zweiten, deutlich anderen Text ein und vergleicht.

Drittens: Wo bleibt es generisch? KI-Feedback neigt zu Sätzen wie „Gute Struktur, aber du könntest noch konkreter werden." Das klingt hilfreich, ist aber oft eine Schablone. Identifiziert die Stellen, an denen das Feedback auf jeden Text passen würde — das sind die generischen Anteile.

Viertens: Welche Rolle spielt eure eigene Urteilsfähigkeit? Hättet ihr als Lehrkraft ein anderes Feedback gegeben? Wo seht ihr Stärken, die die KI übersehen hat? Wo Schwächen, die sie nicht erkannt hat? Eure professionelle Einschätzung ist der Maßstab — nicht die KI.

Tragt eure Analyse ins Logbuch ein. Seid konkret — Beispiele aus dem Feedback zitieren, nicht nur zusammenfassen.`,

      `Willkommen bei Level 2: Adaptives Lernsystem analysieren.

Jetzt geht es eine Ebene tiefer. Statt einzelnem Feedback analysiert ihr ein ganzes System, das Lernpfade steuert. Nutzt dafür Westermann Smart Response — ein adaptives Vokabeltraining, das Aufgaben automatisch anpasst.

Über den Button unten kommt ihr direkt zum Tool. Arbeitet mindestens 10 Minuten damit und beobachtet dabei systematisch:

Wie werden Aufgaben ausgewählt? Bekommt ihr nach einem Fehler eine leichtere Aufgabe? Nach einem Erfolg eine schwierigere? Oder ist die Reihenfolge fix?

Wie wird Fortschritt gemessen? Gibt es einen Fortschrittsbalken? Punkte? Level? Was genau wird gemessen — Geschwindigkeit, Korrektheit, Konsistenz?

Welche Entscheidungen trifft das System für euch? Könnt ihr den Lernpfad selbst wählen — oder bestimmt der Algorithmus, was als Nächstes kommt?

Dokumentiert im Logbuch:
— Wie reagiert das System auf Fehler?
— Wie reagiert es auf Erfolge?
— Welche Steuerungsentscheidungen sind sichtbar, welche unsichtbar?
— Wo fühlt ihr euch unterstützt — und wo bevormundet?

Das ist die analytische Kernaufgabe: Adaptive Systeme treffen ständig Entscheidungen über euren Lernprozess. Macht diese Entscheidungen sichtbar.`,

      `Ihr habt ein adaptives Lernsystem analysiert. Jetzt die Reflexion — drei Diskussionsfragen:

Erstens: Welche Logik der Leistungsdiagnose steckt dahinter? Das System hat euch eingestuft — aber nach welchen Kriterien? Basiert die Diagnose auf einem einzelnen Fehler oder auf einem Muster? Kennt das System den Grund für einen Fehler — oder nur die Tatsache, dass er passiert ist? Ein Schüler, der aus Unkonzentriertheit falsch antwortet, braucht keine leichteren Aufgaben — er braucht eine Pause. Aber das kann der Algorithmus nicht unterscheiden.

Zweitens: Wer definiert Lernziele? Das System hat Aufgaben ausgewählt und Fortschritt gemessen. Aber wer hat entschieden, was „Fortschritt" bedeutet? Wer hat die Lernziele definiert — ihr oder der Algorithmus? Wenn Lehrkräfte die Steuerungslogik nicht kennen, delegieren sie nicht nur Aufgaben an die KI — sie delegieren die Definition von Lernerfolg.

Drittens: Wo entstehen blinde Flecken? Adaptive Systeme optimieren auf das, was sie messen können. Aber was wird nicht gemessen? Kreativität? Transferleistung? Motivation? Soziale Kompetenz? Jedes System hat blinde Flecken — und diese blinden Flecken werden zu blinden Flecken im Lernprozess, wenn niemand sie benennt.

Tragt eure Analyse ins Logbuch ein. Diskutiert in der Gruppe: Würdet ihr dieses System in eurem Unterricht einsetzen — und wenn ja, unter welchen Bedingungen?`,

      `Willkommen bei Level 3: Tutor durch Mega-Prompt.

Jetzt wird es anspruchsvoll — und kreativ. Eure Aufgabe: Erstellt mit einem Mega-Prompt euren eigenen KI-Tutor. Nicht ein Tool nutzen, das jemand anderes gebaut hat — sondern selbst definieren, wie eine KI als Tutor agieren soll.

Über den Button unten findet ihr eine Anleitung für den Mega-Prompt-Ansatz. Nutzt ChatGPT, Claude oder ein anderes Sprachmodell und definiert:

Die Rolle: Wer ist euer Tutor? Ein sokratischer Fragensteller? Ein geduldiger Erklärer? Ein strenger Coach? Definiert Persönlichkeit, Tonalität und Stil.

Den Feedbackmodus: Wie soll der Tutor Rückmeldung geben? Sofort oder erst nach Aufforderung? Kriterial oder ermutigend? Auf welcher Ebene — Aufgabe, Prozess, Selbstregulation?

Die Schwierigkeitsanpassung: Soll der Tutor einfacher werden, wenn ihr Fehler macht? Oder soll er hartnäckig nachfragen? Definiert die Logik der Anpassung explizit.

Testet euren Tutor dann mit einem konkreten Lerninhalt — zum Beispiel einer Matheaufgabe, einer Textanalyse oder einer Vokabelübung. Führt mindestens drei Durchgänge durch.

Dokumentiert im Logbuch:
— Euren vollständigen Mega-Prompt
— Wie der Tutor reagiert hat
— Was ihr nach jeder Runde angepasst habt und warum
— Wie zufrieden ihr mit dem Ergebnis seid`,

      `Ihr habt euren eigenen KI-Tutor gebaut. Jetzt reflektieren wir — drei zentrale Fragen:

Erstens: Welche Steuerungsentscheidungen habt ihr bewusst getroffen? Ihr habt definiert, wie der Tutor reagiert, welches Feedback er gibt, wann er die Schwierigkeit anpasst. Das waren bewusste Designentscheidungen. Macht sie explizit: Was habt ihr gewählt — und warum? Jede Entscheidung, die ihr getroffen habt, trifft in kommerziellen KI-Tutoring-Systemen ein Algorithmus. Der Unterschied: Eure Entscheidungen sind transparent. Die des Algorithmus oft nicht.

Zweitens: Wo übernimmt die KI eigenständig Struktur? Auch wenn ihr den Mega-Prompt definiert habt — die KI interpretiert ihn. Hat sie Dinge getan, die ihr nicht vorgesehen hattet? Hat sie eigenständig den Schwierigkeitsgrad verändert? Hat sie Rückmeldungen gegeben, die über euren Prompt hinausgingen? Diese Momente sind aufschlussreich: Sie zeigen, wo die Grenze zwischen menschlicher Steuerung und algorithmischer Eigendynamik verläuft.

Drittens: Wie transparent ist der Anpassungsprozess? Wenn euer Tutor die Schwierigkeit anpasst — ist für den Lernenden nachvollziehbar, warum? Oder wirkt es wie Magie? Transparenz ist ein Qualitätsmerkmal professioneller KI-Nutzung. Wenn Lernende nicht verstehen, warum sie bestimmte Aufgaben bekommen, verlieren sie die Kontrolle über ihren eigenen Lernprozess.

Tragt eure Reflexion ins Logbuch ein. Vergleicht eure Erfahrung mit Level 1 und 2: Was haben die kommerziellen Tools besser gemacht — und was euer selbstgebauter Tutor?`,

      `Ihr habt drei Levels durchlaufen — KI-Feedback erlebt, ein adaptives System analysiert und einen eigenen KI-Tutor gebaut. Jetzt bringt ihr alles zusammen: die Steuerungsmatrix.

Erstellt eine 2x2-Matrix mit folgenden Dimensionen:

Horizontale Achse: Menschliche Steuerung — niedrig bis hoch
Vertikale Achse: Algorithmische Steuerung — niedrig bis hoch

Das ergibt vier Quadranten:

Oben links — Hohe algorithmische Steuerung, niedrige menschliche Steuerung: Die KI steuert den Lernprozess weitgehend autonom. Beispiel: Ein vollautomatisches adaptives Lernsystem ohne Lehrkraft-Eingriff.

Oben rechts — Hohe algorithmische Steuerung, hohe menschliche Steuerung: KI und Mensch steuern gemeinsam. Beispiel: Ein adaptives System, bei dem die Lehrkraft Lernziele definiert und die KI-Empfehlungen prüft.

Unten links — Niedrige algorithmische Steuerung, niedrige menschliche Steuerung: Weder KI noch Mensch steuern aktiv. Beispiel: Unbegleitetes, unstrukturiertes Online-Lernen.

Unten rechts — Niedrige algorithmische Steuerung, hohe menschliche Steuerung: Der Mensch steuert, KI unterstützt punktuell. Beispiel: Klassischer Unterricht mit gelegentlichem KI-Feedback.

Ordnet jetzt eure Erfahrungen aus den drei Levels ein: Wo steht der PEER KI-Tutor? Wo Westermann Smart Response? Wo euer selbstgebauter Mega-Prompt-Tutor?

Dokumentiert die Matrix und eure Einordnungen im Logbuch. Begründet jede Platzierung.`,

      `Ihr habt alle Levels durchlaufen und eure Steuerungsmatrix erstellt. Jetzt kommt die finale Aufgabe — die Governance-Ebene.

Das hier ist das Tor zur Freischaltung. Es öffnet sich nur, wenn ihr ein verbindliches Governance-Statement formuliert.

Nutzt eure Erfahrungen aus allen drei Levels und eure Steuerungsmatrix als Grundlage. Beantwortet diese Leitfragen:

Eins: Wo ist algorithmische Steuerung lernförderlich — und wo wird sie problematisch? Nicht jede Automatisierung ist schlecht. Schnelles Feedback zu Rechtschreibung? Sinnvoll. Automatische Einstufung in Leistungsniveaus ohne Lehrkraft-Prüfung? Problematisch. Wo liegt die Grenze?

Zwei: Welche Transparenzregeln braucht es? Wenn KI Lernpfade steuert — müssen Lernende das wissen? Müssen Lehrkräfte die Algorithmus-Logik kennen? Welche Information muss offengelegt werden?

Drei: Wo muss menschliche Letztverantwortung verbindlich sein? Lernzieldefinition? Leistungsbewertung? Schullaufbahnentscheidungen? Definiert die Bereiche, in denen algorithmische Steuerung nie allein entscheiden darf.

Und jetzt die Escape-Bedingung — euer 3-Satz-Governance-Statement:

Satz 1: „Lernen durch KI ist sinnvoll, wenn …"
Satz 2: „Problematisch wird es, wenn …"
Satz 3: „Deshalb beschließen wir …"

Formuliert dieses Statement gemeinsam. Nutzt eure Steuerungsmatrix als Argumentationsgrundlage. Das ist keine Meinungsübung — es ist eine Governance-Entscheidung auf Basis systematischer Analyse.

Tragt euer Statement ins Logbuch ein. Wenn ihr es habt — herzlichen Glückwunsch: Die Dimension „Lernen durch KI" ist freigeschaltet.`,
    ],
    /* ── Kernwissen (auskommentiert) ──
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
    ── Ende Kernwissen ── */
    /* ── Praxis-Übung + Wissens-Check (auskommentiert) ──
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
    ── Ende Praxis-Übung + Wissens-Check ── */
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
    hideEinstieg: true,
    /* ── Kernwissen (auskommentiert) ──
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
    ── Ende Kernwissen ── */
    mitLessons: [
      { title: "Willkommen in der Dimension MIT", type: "video" },
      { title: "Spielregeln: Logbuch & Transparenz", type: "video" },
      { title: "Level 1: Der digitale Würfel – Auftrag", type: "video" },
      { title: "Level 1: Der digitale Würfel – Reflexion", type: "video" },
      { title: "Insel 1: Generative Transformation – Comic zu Anne Frank", type: "video" },
      { title: "Insel 1: Generative Transformation – Reflexion", type: "video" },
      { title: "Insel 2: Wissensverdichtung – Auftrag", type: "video" },
      { title: "Insel 2: Wissensverdichtung – Reflexion", type: "video" },
      { title: "Insel 3: Simulierter Dialog – Auftrag & Reflexion", type: "video" },
      { title: "Governance-Ebene: Das Tor zur Freischaltung", type: "video" },
    ],
    mitLessonsVideoUrls: [
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Toni%20Intro.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Spielregeln-%20Logbuch%20%26%20Transparenz.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Level%201-%20Der%20digitale%20W%C3%BCrfel%20%E2%80%93%20Auftrag.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Level%201-%20Der%20digitale%20W%C3%BCrfel%20%E2%80%93%20Reflexion.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Insel%201-%20Generative%20Transformation%20%E2%80%93%20Comic%20zu%20Anne%20Frank.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Insel%201-%20Generative%20Transformation%20%E2%80%93%20Reflexion.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Insel%202-%20Wissensverdichtung%20%E2%80%93%20Auftrag.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Insel%202-%20Wissensverdichtung%20%E2%80%93%20Reflexion.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Insel%203-%20Simulierter%20Dialog%20%E2%80%93%20Auftrag%20%26%20Reflexion.mp4",
      "https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Lernen%20mit%20KI/Governance-Ebene-%20Das%20Tor%20zur%20Freischaltung.mp4",
    ],
    mitLessonsLinks: {
      6: { url: "https://notebooklm.google.com/", label: "NotebookLM öffnen" },
    },
    mitLessonsScripts: [
      `Herzlich willkommen zum Bereich „Lernen mit KI"! Ich bin Toni und ich freue mich, dass du dabei bist.

Bevor wir loslegen, eine kurze Orientierung: In diesem Tutorial geht es darum, wie Lernprozesse mit KI ausgestaltet werden können. Es soll für dich erfahrbar werden, welches Anwendungs- und Strategiewissen Lernende brauchen, um die eigenen Lernprozesse mit KI zu unterstützen und Lernprodukte neu zu denken.

Du wirst dabei nicht nur zuhören und lesen, sondern vor allem selbst ausprobieren. Wir starten gleich mit einem kleinen Experiment, mit dessen Ergebnis du dann entscheidest, welchen Lernpfad du beschreiten kannst.

Je nachdem wie viel Zeit du mitbringst, kannst du natürlich auch alle Lernpfade gehen: Von generativen Transformationen, zu KI-Wissensverdichtungen bis hin zum simulierten Dialog.

Eine zentrale Frage begleitet dich dabei: Wie kann KI kooperativ in Lehr- und Lernprozesse eingebettet werden? Bereise die komplette Lernlandkarte — jede Insel steht für eine spezifische Form der kooperativen KI-Nutzung. Am Ende formulierst du ein verbindliches Governance-Statement für deine Einrichtung.

Und keine Sorge: Du brauchst dafür keinerlei Vorkenntnisse. Alles, was du mitbringen musst, ist Neugier.

Also — los geht's! Schau dir die Fokus-Frage unten an, die uns durch diesen gesamten Bereich begleiten wird.`,

      ``,

      `Willkommen auf Level 1: Der digitale Würfel.

Eure Aufgabe klingt einfach: Programmiert mit Hilfe einer KI einen funktionierenden digitalen Würfel, der Zahlen von 1 bis 6 anzeigt. Das kann eine Webseite sein, ein Python-Skript, eine App — das Format ist euch überlassen.

Aber Achtung: Es geht nicht um das Ergebnis allein. Es geht um den Weg dorthin.

So geht ihr vor: Öffnet ein KI-Tool eurer Wahl — ChatGPT, Claude, Copilot, was auch immer. Formuliert euren ersten Prompt. Und jetzt wird es wichtig: Dokumentiert im Logbuch, was ihr promptet, was die KI liefert, was ihr ändert und warum.

Testet den Würfel. Funktioniert er? Zeigt er wirklich zufällige Zahlen? Ist das Design ansprechend? Wenn nicht — iteriert. Verbessert den Prompt, gebt Feedback an die KI, passt an.

Notiert im Logbuch:
— Prompt Nummer 1: Was habt ihr geschrieben?
— Ergebnis: Was kam zurück?
— Bewertung: Was war gut, was nicht?
— Prompt Nummer 2: Was habt ihr geändert und warum?

Wiederholt das, bis ihr zufrieden seid. Zählt die Iterationen. Die meisten Teams brauchen zwischen 3 und 7 Durchläufe — das ist völlig normal und zeigt, dass Ko-Kreation ein Prozess ist, keine Einmal-Aktion.

Viel Erfolg — und vergesst das Logbuch nicht!`,

      `Ihr habt euren digitalen Würfel gebaut — Glückwunsch! Jetzt kommt der entscheidende Teil: die Reflexion. Denn ohne Reflexion ist das hier nur eine Programmierübung. Mit Reflexion wird es zu einer Lektion über professionelle KI-Kooperation.

Drei Fragen für euer Logbuch:

Erstens: Welche Promptstrategie war erfolgreich? Habt ihr mit einem sehr allgemeinen Prompt gestartet und euch dann verfeinert? Oder wart ihr von Anfang an spezifisch? Was hat besser funktioniert — und warum? Die meisten stellen fest: Je klarer die Aufgabenbeschreibung, desto besser das Ergebnis. Das ist der Kern der Kompetenz „Beschreibung" aus dem AI Fluency Framework.

Zweitens: Welche Fehler traten auf? Hat die KI Code generiert, der nicht funktioniert hat? Waren die Zufallszahlen wirklich zufällig? Gab es Designprobleme? Fehler sind kein Versagen — sie sind Lernmomente. Dokumentiert, welche Fehler auftraten und wie ihr sie behoben habt.

Drittens: Welche Kompetenzen braucht ihr zur Qualitätskontrolle? Konntet ihr den Code lesen und verstehen? Oder habt ihr blind vertraut? Das ist eine zentrale Frage: Wenn wir KI-Outputs nicht prüfen können, delegieren wir — statt zu kooperieren. Urteilsfähigkeit ist hier der Schlüssel.

Tragt eure Antworten ins Logbuch ein. Erst dann ist Level 1 abgeschlossen und Insel 1 wird freigeschaltet.`,

      `Willkommen auf Insel 1: Generative Transformation.

Hier verlassen wir die Welt des Codes und betreten die Welt der kreativen KI-Nutzung. Euer Auftrag: Erstellt mit einem generativen KI-Tool einen Comic zu einem Tagebucheintrag von Anne Frank.

Hier ist der Eintrag, mit dem ihr arbeitet:

„Sonntag, 27. Februar 1944
Liebste Kitty!
Von morgens früh bis abends spät denke ich eigentlich an nichts anderes als an Peter. Ich schlafe mit seinem Bild vor Augen ein, träume von ihm und werde wieder wach, wenn er mich anschaut.
Ich glaube, dass Peter und ich gar nicht so verschieden sind, wie das von außen wirkt, und ich erkläre dir auch warum: Peter und ich vermissen beide eine Mutter. Seine ist zu oberflächlich, flirtet gern und kümmert sich nicht viel um Peters Gedanken. Meine bemüht sich zwar um mich, hat aber keinen Takt, kein Feingefühl, kein mütterliches Verständnis.
Peter und ich kämpfen beide in unserem Inneren. Wir sind beide noch unsicher und eigentlich zu zerbrechlich und innerlich zu zart, um so hart angepackt zu werden. Dann will ich raus oder will mein Inneres verbergen. Ich werfe mit Töpfen und Wasser und bin laut und lärmend, sodass jeder sich wünscht, ich wäre weit weg. Er zieht sich dann zurück, spricht fast nicht, ist still und träumt und verbirgt sich ängstlich.
Aber wie und wann werden wir uns endlich finden?
Ich weiß nicht, wie lange ich dieses Verlangen noch mit meinem Verstand beherrschen kann.
Deine Anne M. Frank"

Eure Aufgabe: Verwandelt diesen Tagebucheintrag in einen Comic — mit mehreren Panels, die die Stimmung, die Gedanken und die Situation visuell erzählen. Nutzt dafür ein generatives Bild-Tool eurer Wahl — DALL-E, Midjourney, Adobe Firefly, Stable Diffusion oder ein anderes Tool.

Überlegt euch: Wie setzt ihr die innere Zerrissenheit visuell um? Wie stellt ihr die Unterschiede zwischen Anne und Peter dar — sie laut und lärmend, er still und zurückgezogen? Welchen visuellen Stil wählt ihr — realistisch, expressionistisch, Graphic-Novel-Stil?

Dokumentiert im Logbuch:
— Welche Szenen habt ihr für die Panels ausgewählt und warum?
— Welche Bild-Prompts habt ihr formuliert?
— Wie viele Iterationen waren pro Panel nötig?
— Was habt ihr am Prompt verändert und warum?
— Wie zufrieden seid ihr mit dem Ergebnis?

Achtet besonders darauf: Was ist eure kreative Leistung — die Auswahl der Szenen, die Dramaturgie, die Reihenfolge — und was ist die Leistung des Tools? Wo habt ihr gesteuert, wo hat die KI überrascht? Diese Trennung ist besonders wichtig, weil ihr hier mit dem realen Tagebuch einer historischen Person arbeitet.

Startet jetzt — und haltet alles im Logbuch fest.`,

      `Ihr habt einen Comic zu Anne Franks Tagebucheintrag erstellt. Jetzt reflektieren wir — drei zentrale Fragen:

Erstens: Was verändert KI an der Rezeption? Wenn ihr den Tagebucheintrag vom 27. Februar 1944 lest und dann euren Comic seht — verändert die visuelle Darstellung, wie ihr den Text wahrnehmt? Verstärkt der Comic die Emotionalität? Oder vereinfacht er die innere Zerrissenheit, die Anne beschreibt? Wenn sie schreibt „Ich werfe mit Töpfen und Wasser und bin laut und lärmend" — wird das in einem Comic-Panel stärker, schwächer oder anders als im Text? Generative KI transformiert nicht nur das Medium — sie transformiert die Bedeutung. Gerade bei einem so persönlichen, historisch bedeutsamen Text ist das pädagogisch hochrelevant.

Zweitens: Wo liegt eure Eigenleistung? Habt ihr den Comic „gemacht"? Oder hat die KI ihn gemacht und ihr habt nur Prompts eingegeben? Die Wahrheit liegt dazwischen: Eure Eigenleistung liegt in der Auswahl der Szenen, der Dramaturgie, der Promptgestaltung, der Iteration und der kritischen Bewertung. Ihr habt entschieden, welche Momente des Eintrags zu Panels werden — die Sehnsucht nach Peter, die Einsamkeit, das Versteckspiel der Gefühle. Aber diese Anteile müssen klar benannt werden — sonst wird aus Ko-Kreation eine Illusion.

Drittens: Welche ethischen Grenzen werden berührt? Hier wird es besonders ernst: Ihr arbeitet mit dem Tagebuch einer realen Person — eines jüdischen Mädchens, das im Holocaust ermordet wurde. Dürft ihr Anne Franks intimste Gedanken visuell darstellen lassen? Wer hat die Deutungshoheit über ihre Worte? Wie stellt die KI Anne dar — stereotyp, historisch korrekt, verfremdet? Gibt es eine Darstellung, die ihrer Würde nicht gerecht wird? Und: Wie geht ihr damit um, wenn die KI ein Bild generiert, das Anne Franks Realität verzerrt oder trivialisiert? Diese Fragen sind keine Nebensache — sie sind der Kern der Übung. Generative KI wirft Fragen auf, die wir im Unterricht nicht ignorieren dürfen: Persönlichkeitsrechte, historische Verantwortung, Darstellungsmacht und die Grenzen der Visualisierung von Leid.

Tragt eure Reflexion ins Logbuch ein. Seid ehrlich mit euch selbst — das ist kein Test, sondern eine Übung in professioneller Selbstreflexion. Und diskutiert in der Gruppe: Gibt es einen Punkt, an dem ihr sagt — das sollte man nicht mit KI visualisieren?`,

      `Willkommen auf Insel 2: Wissensverdichtung.

Hier geht es um eine der mächtigsten Anwendungen kooperativer KI-Nutzung: die Verdichtung komplexer Inhalte in neue Formate. Euer Auftrag: Erstellt mit NotebookLM einen Podcast aus einem langen Sachtext.

So geht ihr vor: Wählt einen Sachtext — das kann ein Fachartikel sein, ein Kapitel aus einem Lehrbuch, ein wissenschaftlicher Bericht. Der Text sollte mindestens zwei Seiten lang sein, besser mehr.

Ladet den Text in Google NotebookLM hoch. Nutzt die Podcast-Funktion, um eine Audio-Zusammenfassung generieren zu lassen. Hört euch das Ergebnis an.

Und jetzt wird es spannend — denn jetzt beginnt eure eigentliche Arbeit:
— Stimmt die Zusammenfassung inhaltlich?
— Wurden wichtige Punkte weggelassen?
— Wurden Nuancen vereinfacht oder gar verfälscht?
— Ist die Gewichtung der Themen angemessen?

Dokumentiert im Logbuch:
— Welchen Text habt ihr verwendet?
— Was hat NotebookLM daraus gemacht?
— Welche Qualitätsprüfung habt ihr durchgeführt?
— Was musstet ihr korrigieren oder ergänzen?

Der Podcast klingt vielleicht beeindruckend — aber klingt gut ist nicht gleich inhaltlich korrekt. Genau das ist die Lektion dieser Insel.`,

      `Euer KI-Podcast ist fertig. Jetzt reflektieren wir — drei Fragen für das Logbuch:

Erstens: Welche Strukturierungsleistung habt ihr erbracht? Die KI hat den Text verdichtet — aber wer hat entschieden, ob die Verdichtung gut ist? Ihr. Wer hat den Ausgangstext ausgewählt? Ihr. Wer hat geprüft, ob nichts Wichtiges fehlt? Ihr. Die eigentliche intellektuelle Leistung liegt nicht in der Zusammenfassung, sondern in der Qualitätskontrolle und der Bewertung.

Zweitens: Welche Qualitätskontrolle war nötig? Habt ihr den Podcast Wort für Wort mit dem Original abgeglichen? Oder nur stichprobenartig gehört? Wie gründlich muss die Prüfung sein? Das hängt vom Verwendungszweck ab: Für eine interne Notiz reicht eine Stichprobe. Für Unterrichtsmaterial, das Schülerinnen und Schüler nutzen, braucht es eine vollständige Prüfung.

Drittens: Wo entstehen Verkürzungen? Jede Verdichtung verliert Information. Die Frage ist: Welche Information geht verloren — und ist das akzeptabel? Werden Gegenargumente verschluckt? Werden Unsicherheiten zu Gewissheiten? Wird Komplexität zu Einfachheit? Diese Verkürzungen sind nicht böswillig — sie sind systemisch. Und genau deshalb muss jede KI-gestützte Verdichtung professionell geprüft werden.

Tragt eure Reflexion ins Logbuch ein. Ihr seid jetzt bereit für Insel 3.`,

      `Willkommen auf Insel 3: Simulierter Dialog.

Hier betreten wir pädagogisch spannendes, aber auch heikles Terrain. Euer Auftrag: Führt einen Dialog mit einer KI-Simulation, um historische Perspektiven zu erkunden.

Das bedeutet: Ihr promptet eine KI so, dass sie in die Rolle einer historischen Person schlüpft — zum Beispiel Marie Curie, Martin Luther King oder Hannah Arendt. Stellt Fragen, führt ein Gespräch, erkundet Perspektiven.

Aber Achtung — hier beginnen die Reflexionsfragen schon während der Übung:

Erstens: Welche Fragen habt ihr gestellt — und warum? Habt ihr oberflächlich gefragt oder in die Tiefe gebohrt? Habt ihr versucht, die KI an ihre Grenzen zu bringen? Die Qualität des Dialogs hängt von euren Fragen ab, nicht von der KI.

Zweitens: Wo stößt Simulation an Grenzen? Die KI „ist" nicht Marie Curie. Sie simuliert, basierend auf Texten über und von Marie Curie. Aber sie hat keine authentische Perspektive, keine echte Erfahrung, keine Emotionen. Was die KI liefert, ist eine statistische Rekonstruktion — plausibel, aber nicht authentisch. Wo wird das problematisch?

Drittens: Ist das pädagogisch legitim? Dürfen wir historische Personen simulieren lassen? Was gewinnen Lernende dadurch — und was geht verloren? Besteht die Gefahr, dass Schülerinnen und Schüler die Simulation für die Realität halten? Wie rahmen wir das didaktisch ein?

Dokumentiert im Logbuch: Eure Prompts, die KI-Antworten, eure Beobachtungen und eure pädagogische Bewertung. Seid kritisch — das ist die anspruchsvollste Insel.`,

      `Ihr habt alle Inseln bereist. Ihr habt programmiert, transformiert, verdichtet und simuliert. Ihr habt dokumentiert und reflektiert. Jetzt kommt die finale Aufgabe — die Governance-Ebene.

Das hier ist das Tor zur Freischaltung. Und es öffnet sich nur, wenn ihr verbindliche Steuerungsfragen für eure Einrichtung formuliert.

Fünf Fragen, die ihr beantworten müsst:

Eins: Wo ist KI kooperativ lernförderlich — und wo substituierend? Nicht jeder KI-Einsatz ist Kooperation. Manchmal ersetzt KI menschliches Denken, statt es zu erweitern. Wo liegt die Grenze?

Zwei: Welche Transparenzregeln braucht das Referendariat? Wenn Referendarinnen und Referendare KI nutzen — wie muss das dokumentiert werden? Was muss offengelegt werden?

Drei: Welche Prüfungsformate sichern Eigenleistung trotz KI? Wenn KI mitschreibt, mitdenkt, mitgestaltet — wie stellen wir sicher, dass wir die Kompetenz der Person prüfen, nicht die der Maschine?

Vier: Welche ethischen Leitplanken müssen verbindlich sein? Nicht optional, nicht empfohlen — verbindlich. Was darf nie passieren? Was muss immer passieren?

Fünf: Wie wird Kompetenzzuwachs sichtbar gemacht? Wenn der Prozess wichtiger ist als das Produkt — wie dokumentieren und bewerten wir den Prozess?

Und jetzt die Escape-Bedingung — euer 3-Satz-Governance-Statement:

Satz 1: „Lernen mit KI ist professionell, wenn …"
Satz 2: „Lernen mit KI wird problematisch, wenn …"
Satz 3: „Deshalb beschließen wir …"

Formuliert dieses Statement gemeinsam. Diskutiert. Ringt um Formulierungen. Das ist keine Fleißaufgabe — das ist der Kern professioneller Governance.

Tragt euer Statement ins Logbuch ein. Wenn ihr es habt — herzlichen Glückwunsch: Die Dimension „Lernen mit KI" ist freigeschaltet.`,
    ],
    /* ── Praxis-Übung + Wissens-Check (auskommentiert) ──
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
    ── Ende Praxis-Übung + Wissens-Check ── */
    challengeSummary:
      "Du verstehst jetzt den Unterschied zwischen Ko-Kreation und Delegation, beherrschst Prompt-Techniken wie Chain-of-Thought und Few-Shot, weißt warum Prompt-Dokumentation wichtig ist und kennst die Grundlagen professioneller KI-Governance — von der KMK-Empfehlung bis zum EU AI Act. Ab in die Challenge!",
  },

  // ── TROTZ vorübergehend deaktiviert ──
  // trotz-Dimension ist in _TROTZ_TUTORIAL_BACKUP unten ausgelagert
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _TROTZ_TUTORIAL_BACKUP = {
  trotz: {
    id: "trotz",
    title: "Tutorial: Lernen trotz KI",
    subtitle: "Urteilskraft und professionelle Begründung",
    focusQuestion:
      "Welche Fähigkeiten bleiben unverzichtbar — auch wenn KI vieles übernehmen kann?",
    introText:
      "KI kann beeindruckende Entwürfe liefern — Unterrichtspläne, Klausuren, Feedbacktexte. Aber formal starke Outputs können didaktisch schwach sein. In diesem Tutorial trainierst du, wie Lehrkräfte auch bei überzeugenden KI-Ausgaben professionell prüfen, begründen und verantworten. Es geht um die Fähigkeiten, die trotz (und gerade wegen) KI unverzichtbar bleiben.",
    videoUrl: "https://www.youtube-nocookie.com/embed/2ePf9rue1Ao",
    hideEinstieg: true,
    ltkLessons: [
      { title: "Willkommen in der Dimension LTK", type: "video" },
      { title: "Spielregeln & Leitfrage", type: "video" },
      { title: "Schritt 1: Ersteinschätzung des KI-Entwurfs", type: "video" },
      { title: "Schritt 2A: Analyse – Oberflächenqualität", type: "video" },
      { title: "Schritt 2B: Analyse – Didaktische Tiefenstruktur", type: "video" },
      { title: "Schritt 2C: Analyse – Situationsspezifik", type: "video" },
      { title: "Schritt 3: Typische Problemkategorien bündeln", type: "video" },
      { title: "Schritt 4: Leitfragen formulieren", type: "video" },
      { title: "Schritt 5: Die professionelle Warum-Begründung", type: "video" },
      { title: "Abschluss: Ergebnisse & Governance-Statement", type: "video" },
    ],
    ltkLessonsVideoUrls: ["", "", "", "", "", "", "", "", "", ""],
    ltkLessonsScripts: [
      `Willkommen in der Dimension „Lernen trotz KI"! Ich bin Toni und ich freue mich, dass du dabei bist.

Diese Dimension stellt eine provokante Frage: Warum soll ich eigentlich noch lernen, einen Unterrichtsentwurf zu schreiben — Verlaufsplan, didaktische Analyse, methodische Begründung — wenn KI das scheinbar besser und schneller kann?

Das ist keine rhetorische Frage. Das ist eine ernst gemeinte Herausforderung. Denn KI kann tatsächlich in Minuten einen Unterrichtsentwurf generieren, der formal überzeugend aussieht: klare Gliederung, passende Fachbegriffe, zeitliche Struktur, Differenzierungshinweise. Auf den ersten Blick — beeindruckend.

Aber genau hier beginnt eure Arbeit. Denn „sieht gut aus" ist nicht dasselbe wie „funktioniert didaktisch". Und genau diesen Unterschied werdet ihr in dieser Dimension diagnostizieren, analysieren und begründen.

Euer Ziel: Typische Schwächen KI-generierter Unterrichtsentwürfe identifizieren. Daraus Konsequenzen für Ausbildung und Prüfungen ableiten. Und am Ende eine professionelle Begründung formulieren — warum das eigene Schreiben von Unterrichtsentwürfen trotz KI unverzichtbar bleibt.

Das ist keine Übung im KI-Bashing. Es ist eine Übung in professioneller Urteilskraft. Denn wer die Schwächen eines KI-Entwurfs nicht erkennt, kann ihn auch nicht verbessern — und genau das ist die Kompetenz, die trotz KI unverzichtbar bleibt.

Also — los geht's!`,

      `Bevor wir starten, die Spielregeln und die zentrale Leitfrage dieser Dimension.

Die Leitfrage lautet: Warum soll ich lernen, einen Unterrichtsentwurf zu schreiben, wenn KI das scheinbar besser und schneller kann?

Diese Frage begleitet euch durch alle Schritte. Am Ende werdet ihr sie nicht einfach beantworten — ihr werdet sie begründen. Dreifach. Professionell. Belastbar.

Jetzt die Spielregeln:

Regel Nummer 1: Arbeitet systematisch. Ihr bekommt ein Analyse-Raster mit drei Ebenen — Oberfläche, Tiefenstruktur, Situationsspezifik. Nutzt es konsequent.

Regel Nummer 2: Dokumentiert alles im Logbuch. Eure Befunde, eure Bewertungen, eure Begründungen. Das Logbuch ist euer Nachweis professioneller Urteilskraft.

Regel Nummer 3: Seid ehrlich. Wenn der KI-Entwurf etwas gut macht — benennt das. Wenn er versagt — benennt auch das. Differenzierung ist keine Schwäche, sondern Stärke.

Regel Nummer 4: Am Ende steht ein Abschlussprodukt — fünf typische Failure-Modes, sechs Leitfragen, ein Why-Statement und eine konkrete Konsequenz. Das ist eure Escape-Bedingung.

Nehmt euer Logbuch — es geht los mit der Ersteinschätzung.`,

      `Schritt 1: Ersteinschätzung.

Ihr bekommt jetzt einen KI-generierten Beispielentwurf für eine Unterrichtsstunde. Lest ihn vollständig durch — nehmt euch dafür etwa fünf Minuten.

Während ihr lest, achtet auf euren ersten Eindruck. Nicht analysieren, noch nicht. Nur lesen und wahrnehmen.

Wenn ihr fertig seid, beantwortet eine einzige Frage: Würde dieser Entwurf eine Lehrprobe bestehen? Bewertet auf einer Skala von 0 bis 10.

0 bedeutet: Keine Chance.
5 bedeutet: Mit erheblicher Überarbeitung vielleicht.
10 bedeutet: Sofort einsetzbar, herausragend.

Begründet eure Einschätzung stichpunktartig. Nicht ausformuliert — drei bis fünf Stichpunkte reichen. Was fällt euch auf? Was überzeugt? Was irritiert? Was fehlt?

Tragt eure Bewertung und die Stichpunkte ins Logbuch ein.

Wichtig: Es gibt hier kein richtig oder falsch. Es geht um eure professionelle Ersteinschätzung — euer Bauchgefühl, informiert durch eure Ausbildung und Erfahrung. Genau dieses Urteil werden wir in den nächsten Schritten systematisch überprüfen.

Haltet eure Ersteinschätzung fest — wir werden am Ende darauf zurückkommen und sehen, ob sich eure Bewertung verändert hat.`,

      `Schritt 2A: Analyse der Oberflächenqualität.

Jetzt geht es in die systematische Analyse. Wir arbeiten mit einem dreistufigen Analyse-Raster. Die erste Ebene ist die Oberflächenqualität.

Prüft den KI-Entwurf anhand von drei Kriterien:

Erstens: Vollständigkeit und Struktur. Sind alle erwarteten Elemente vorhanden — Lernziele, Sachanalyse, didaktische Analyse, methodische Begründung, Verlaufsplan, Materialien? Ist die Gliederung logisch und nachvollziehbar? Fehlt etwas Wesentliches?

Zweitens: Sprachliche Klarheit. Ist der Text verständlich und präzise formuliert? Oder gibt es Passagen, die zwar professionell klingen, aber bei genauerem Hinsehen vage bleiben? Achtet besonders auf Formulierungen wie „Die Schülerinnen und Schüler vertiefen ihr Verständnis" — das klingt gut, sagt aber nichts Konkretes.

Drittens: Formale Stimmigkeit. Stimmen Zeitangaben? Sind Sozialformen konsistent benannt? Passen die Materialverweise? Gibt es Widersprüche zwischen Verlaufsplan und didaktischer Analyse?

Die Oberfläche ist das, was KI typischerweise gut kann. Wenn hier schon Fehler auftreten, ist das ein klares Signal. Aber selbst wenn die Oberfläche perfekt ist — das sagt noch nichts über die didaktische Qualität aus.

Tragt eure Befunde ins Logbuch ein. Für jedes Kriterium: Was ist gelungen? Was fehlt oder irritiert?`,

      `Schritt 2B: Analyse der didaktischen Tiefenstruktur.

Jetzt verlassen wir die Oberfläche und gehen in die Tiefe. Hier zeigt sich, ob ein Entwurf didaktisch tragfähig ist — oder nur so aussieht.

Prüft den KI-Entwurf anhand von fünf Kriterien:

Erstens: Ist die fachliche Sachanalyse tragfähig? Hat der Entwurf den Lerngegenstand wirklich durchdrungen — oder nur Oberflächen-Wissen zusammengestellt? Erkennt ihr fachliche Verkürzungen, Ungenauigkeiten oder fehlende Tiefe?

Zweitens: Ist die Lernlogik nachvollziehbar begründet? Warum werden die Phasen in dieser Reihenfolge angeordnet? Gibt es eine erkennbare Progression — vom Einfachen zum Komplexen, vom Konkreten zum Abstrakten? Oder ist die Reihenfolge beliebig?

Drittens: Ist die Antizipation von Schülerdenken erkennbar? Ein guter Entwurf zeigt, dass die Lehrkraft vorausdenkt: Wo werden Schüler stolpern? Welche Fehlvorstellungen sind wahrscheinlich? Welche Rückfragen kommen? KI-Entwürfe haben hier typischerweise eine massive Schwäche — sie kennen keine echten Schüler.

Viertens: Ist die Differenzierung konkret oder generisch? „Leistungsstärkere Schüler erhalten anspruchsvollere Aufgaben" — das ist eine Nicht-Aussage. Konkrete Differenzierung benennt: Welche Aufgabe? Für wen? Warum?

Fünftens: Passung von Zielen, Aufgaben und Sicherung. Führen die Aufgaben tatsächlich zum formulierten Lernziel? Sichert die Sicherungsphase, was erarbeitet wurde — oder wiederholt sie nur? Das ist der Kohärenz-Check.

Tragt eure Befunde ins Logbuch ein. Hier werden die meisten Schwächen sichtbar.`,

      `Schritt 2C: Analyse der Situationsspezifik.

Die dritte Ebene ist die persönlichste — und die, die KI am wenigsten leisten kann.

Prüft den KI-Entwurf anhand von drei Kriterien:

Erstens: Berücksichtigung der Lerngruppe. Kennt der Entwurf die Klasse, für die er geschrieben ist? Gibt es Hinweise auf konkrete Schüler, auf Leistungsunterschiede, auf soziale Dynamiken, auf Vorkenntnisse? Oder könnte dieser Entwurf für jede beliebige Klasse geschrieben sein? Genau das ist der Punkt: KI schreibt für keine Klasse — sie schreibt für alle und damit für keine.

Zweitens: Realistische Zeitplanung. Sind die Zeitangaben im Verlaufsplan realistisch? Fünf Minuten für einen Einstieg, der ein Video, eine Diskussion und eine Überleitung enthält — funktioniert das? Wer unterrichtet hat, weiß: Zeitplanung ist Erfahrungswissen. KI hat keine Unterrichtserfahrung.

Drittens: Kontext- und Anschlussfähigkeit. Passt die Stunde in eine Reihe? Baut sie auf Vorwissen auf? Bereitet sie etwas vor? Oder steht sie isoliert da — ein perfektes Einzelstück ohne Zusammenhang?

Tragt eure Befunde ins Logbuch ein. Die Situationsspezifik ist der stärkste Grund, warum eigenes Planen trotz KI unverzichtbar bleibt — weil nur ihr eure Klasse kennt.`,

      `Schritt 3: Typische Problemkategorien bündeln.

Ihr habt den KI-Entwurf auf drei Ebenen analysiert — Oberfläche, Tiefenstruktur, Situationsspezifik. Jetzt verdichtet ihr eure Befunde.

Eure Aufgabe: Formuliert maximal fünf typische Problemfelder — die „Failure-Modes" KI-generierter Unterrichtsentwürfe. Das sind wiederkehrende Muster, nicht Einzelfehler.

Hier sind fünf Kategorien als Orientierung — ihr könnt sie übernehmen, anpassen oder eigene formulieren:

Erstens: Generisches Didaktisieren. Der Entwurf klingt professionell, passt aber auf jede Klasse, jedes Thema, jede Situation. Es fehlt das Spezifische.

Zweitens: Pseudo-Begründungen. „Die Methode fördert die Schüleraktivierung" — das ist keine Begründung, das ist ein Buzzword. Echte Begründungen erklären warum, nicht nur was.

Drittens: Fehlende Antizipation. Der Entwurf plant den Idealfall — aber nicht den Realfall. Keine Schülerfehler, keine Störungen, keine Nachfragen.

Viertens: Prüfungslogische Unschärfe. Der Entwurf zeigt nicht, was die Lehrkraft selbst durchdacht hat. In einer Prüfung muss der Entwurf das eigene Denken sichtbar machen — KI-Entwürfe machen KI-Denken sichtbar.

Fünftens: Normative Blindstellen. Der Entwurf trifft keine Wertentscheidungen — er benennt keine ethischen Abwägungen, keine pädagogischen Haltungen, keine bewussten Auslassungen.

Tragt eure fünf Failure-Modes ins Logbuch ein. Belegt jeden mit einem konkreten Beispiel aus dem analysierten Entwurf.`,

      `Schritt 4: Leitfragen formulieren.

Ihr habt diagnostiziert, was KI-Entwürfe typischerweise nicht können. Jetzt leitet ihr daraus Konsequenzen ab — in Form von Leitfragen.

Formuliert mindestens sechs Leitfragen in drei Bereichen:

Bereich A — Ausbildungsziele: Was muss die Ausbildung sicherstellen, damit angehende Lehrkräfte die Schwächen von KI-Entwürfen erkennen und professionell damit umgehen können? Beispiel: „Welche diagnostischen Kompetenzen brauchen Referendarinnen und Referendare, um KI-Outputs didaktisch bewerten zu können?"

Bereich B — Prüfungsvalidität: Wie müssen Prüfungsformate angepasst werden, damit sie Eigenleistung sichtbar machen — auch wenn KI-Tools verfügbar sind? Beispiel: „Wie kann eine Lehrprobe nachweisen, dass der Entwurf auf eigenem professionellem Denken basiert — und nicht auf KI-Output?"

Bereich C — Governance und Transparenzregeln: Welche verbindlichen Regeln braucht es für den Umgang mit KI in der Ausbildung? Beispiel: „Muss offengelegt werden, wenn KI bei der Erstellung eines Unterrichtsentwurfs genutzt wurde? Und wenn ja — wie?"

Formuliert mindestens zwei Leitfragen pro Bereich. Seid konkret — keine abstrakten Grundsatzfragen, sondern Fragen, die direkt in Ausbildungsrichtlinien übersetzt werden können.

Tragt eure Leitfragen ins Logbuch ein.`,

      `Schritt 5: Die professionelle Warum-Begründung.

Jetzt kommt der Kern dieser Dimension. Ihr habt analysiert, diagnostiziert, Leitfragen formuliert. Jetzt beantwortet ihr die Ausgangsfrage — professionell, dreifach, belastbar.

Warum soll ich einen Unterrichtsentwurf selbst schreiben, wenn KI das scheinbar kann?

Formuliert eine dreifache Begründung:

Erstens — das Professionalisierungsargument: Eigenes Planen trainiert Urteilskraft und Verantwortungsübernahme. Wer nur KI-Entwürfe übernimmt, entwickelt keine professionelle Identität als Lehrkraft. Das Schreiben eines Entwurfs ist kein Selbstzweck — es ist ein Denkprozess, der pädagogische Urteilskraft aufbaut.

Zweitens — das Erkenntnisargument: Der Wert liegt nicht im Produkt, sondern im Prozess. Beim Schreiben eines Entwurfs durchdringt die Lehrkraft den Lerngegenstand, antizipiert Schülerdenken, trifft bewusste Entscheidungen. Diese kognitive Arbeit kann nicht delegiert werden, ohne den Lerneffekt zu verlieren.

Drittens — das Prüfungsargument: Prüfungen müssen Eigenleistung nachweisen. Wenn ein Entwurf von KI stammt, prüft die Prüfung nicht die Kompetenz der Lehrkraft, sondern die Leistungsfähigkeit der KI. Das untergräbt die Validität jeder Prüfung.

Formuliert euer Why-Statement: Maximal 90 Sekunden, wenn ihr es laut vorlest. Prägnant, argumentativ, dreifach begründet.

Tragt es ins Logbuch ein.`,

      `Abschluss: Ergebnisse zusammenführen und Governance-Statement.

Ihr habt alle Schritte durchlaufen. Jetzt führt ihr eure Ergebnisse zusammen — das ist euer Abschlussprodukt und die Escape-Bedingung.

Vier Elemente, die ihr im Logbuch haben müsst:

Erstens: Fünf typische Failure-Modes KI-generierter Unterrichtsentwürfe — jeweils mit konkretem Beispiel aus eurer Analyse.

Zweitens: Sechs Leitfragen für die Einrichtung — je zwei zu Ausbildungszielen, Prüfungsvalidität und Governance.

Drittens: Euer Why-Statement — die dreifache Begründung, warum eigenes Schreiben trotz KI unverzichtbar bleibt. Maximal 90 Sekunden.

Viertens: Eine konkrete Konsequenz für Ausbildung oder Prüfung. Nicht abstrakt, sondern umsetzbar. Zum Beispiel: „Lehrproben-Entwürfe müssen eine dokumentierte Reflexion enthalten, die den eigenen Denkprozess bei der Planung nachweist."

Und jetzt die Escape-Bedingung — euer 3-Satz-Governance-Statement:

Satz 1: „Lernen trotz KI bedeutet …"
Satz 2: „Problematisch wird es, wenn …"
Satz 3: „Deshalb beschließen wir …"

Formuliert dieses Statement gemeinsam. Nutzt eure fünf Failure-Modes und sechs Leitfragen als Argumentationsgrundlage.

Tragt alles ins Logbuch ein. Wenn alle vier Elemente und das Governance-Statement stehen — herzlichen Glückwunsch: Die Dimension „Lernen trotz KI" ist freigeschaltet.`,
    ],
    /* ── Kernwissen (auskommentiert) ──
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
    ── Ende Kernwissen ── */
    /* ── Praxis-Übung + Wissens-Check (auskommentiert) ──
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
    ── Ende Praxis-Übung + Wissens-Check ── */
    challengeSummary:
      "Du weißt jetzt, warum Urteilskraft, Tiefenstrukturanalyse und Prüfungsvalidität trotz KI unverzichtbar sind. Du kennst die Grenzen von KI-Erkennungstools und die fünf Dimensionen des Prüfens im KI-Zeitalter. In der Challenge zeigst du diese Fähigkeiten an den Lernstationen.",
  },
  // ── Ende TROTZ deaktiviert ──
};

/* ─── Helpers ─── */

const STEP_BASE = { labels: ["Einstieg", "Kernwissen"], icons: [IconPlayerPlay, IconBook] };
const STEP_TAIL = { labels: ["Praxis-Übung", "Wissens-Check", "Challenge-Start"], icons: [IconPuzzle, IconSparkles, IconRocket] };

const DIMENSION_ACCENT: Record<DimensionId, { bg: string; border: string; light: string; text: string }> = {
  ueber: { bg: "bg-amber-500", border: "border-amber-500", light: "bg-amber-50", text: "text-amber-700" },
  durch: { bg: "bg-emerald-500", border: "border-emerald-500", light: "bg-emerald-50", text: "text-emerald-700" },
  mit: { bg: "bg-sky-500", border: "border-sky-500", light: "bg-sky-50", text: "text-sky-700" },
  // trotz: { bg: "bg-rose-500", border: "border-rose-500", light: "bg-rose-50", text: "text-rose-700" },
};

const getChapterId = (value: string | string[] | undefined): DimensionId | null => {
  if (typeof value !== "string") return null;
  // if (value === "ueber" || value === "durch" || value === "mit" || value === "trotz") return value;
  if (value === "ueber" || value === "durch" || value === "mit") return value;
  return null;
};

/* ─── Component ─── */

export default function CrewTutorialPage() {
  const params = useParams();
  const chapterId = getChapterId(params.dimension);
  const tutorial = chapterId ? TUTORIALS[chapterId] : null;
  const accent = chapterId ? DIMENSION_ACCENT[chapterId] : null;

  const hasEinstieg = !tutorial?.hideEinstieg;
  const hasKnowledge = !!(tutorial?.knowledgeBlocks && tutorial.knowledgeBlocks.length > 0);
  const hasKnowledge2 = !!(tutorial?.knowledgeBlocks2);
  const hasKnowledge3 = !!(tutorial?.knowledgeBlocks3);
  const hasMitLessons = !!(tutorial?.mitLessons);
  const hasLdkLessons = !!(tutorial?.ldkLessons);
  const hasLtkLessons = !!(tutorial?.ltkLessons);
  const hasExercise = !!(tutorial?.exercise);
  const hasQuiz = !!(tutorial?.quizQuestions && tutorial.quizQuestions.length > 0);

  const STEP_LABELS = useMemo(() => {
    const labels: string[] = [];
    if (hasEinstieg) labels.push("Einstieg");
    if (hasMitLessons) labels.push("MIT");
    if (hasLdkLessons) labels.push("LDK");
    if (hasLtkLessons) labels.push("LTK");
    if (hasKnowledge) labels.push("Kernwissen");
    if (hasKnowledge2) labels.push(tutorial?.knowledgeBlocks2Title || "Kernwissen 2");
    if (hasKnowledge3) labels.push(tutorial?.knowledgeBlocks3Title || "Kernwissen 3");
    if (hasExercise) labels.push("Praxis-Übung");
    if (hasQuiz) labels.push("Wissens-Check");
    labels.push("Challenge-Start");
    return labels;
  }, [hasEinstieg, hasMitLessons, hasLdkLessons, hasLtkLessons, hasKnowledge, hasKnowledge2, hasKnowledge3, hasExercise, hasQuiz, tutorial?.knowledgeBlocks2Title, tutorial?.knowledgeBlocks3Title]);

  const STEP_ICONS = useMemo(() => {
    const icons: Array<typeof IconPlayerPlay> = [];
    if (hasEinstieg) icons.push(IconPlayerPlay);
    if (hasMitLessons) icons.push(IconUsers);
    if (hasLdkLessons) icons.push(IconBolt);
    if (hasLtkLessons) icons.push(IconShieldCheck);
    if (hasKnowledge) icons.push(IconBook);
    if (hasKnowledge2) icons.push(IconBook);
    if (hasKnowledge3) icons.push(IconBook);
    if (hasExercise) icons.push(IconPuzzle);
    if (hasQuiz) icons.push(IconSparkles);
    icons.push(IconRocket);
    return icons;
  }, [hasEinstieg, hasMitLessons, hasLdkLessons, hasLtkLessons, hasKnowledge, hasKnowledge2, hasKnowledge3, hasExercise, hasQuiz]);

  const maxStep = STEP_LABELS.length - 1;

  // Step index mapping — dynamically computed based on which steps are present
  let stepCounter = 0;
  const STEP_EINSTIEG = hasEinstieg ? stepCounter++ : -1;
  const STEP_MIT = hasMitLessons ? stepCounter++ : -1;
  const STEP_LDK = hasLdkLessons ? stepCounter++ : -1;
  const STEP_LTK = hasLtkLessons ? stepCounter++ : -1;
  const STEP_KERNWISSEN = hasKnowledge ? stepCounter++ : -1;
  const STEP_KNOWLEDGE2 = hasKnowledge2 ? stepCounter++ : -1;
  const STEP_KNOWLEDGE3 = hasKnowledge3 ? stepCounter++ : -1;
  const STEP_EXERCISE = hasExercise ? stepCounter++ : -1;
  const STEP_QUIZ = hasQuiz ? stepCounter++ : -1;
  const STEP_CHALLENGE = stepCounter;

  const [currentStep, setCurrentStep] = useState(0);
  const [showChallenge, setShowChallenge] = useState(false);

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

  // Einstieg Logbuch state
  const EINSTIEG_LOGBUCH_STORAGE_KEY = "ddki_escape_einstieg_logbuch_v1";
  const [einstiegLogbuchEntries, setEinstiegLogbuchEntries] = useState<Record<number, string>>({});
  const [einstiegLogbuchOpen, setEinstiegLogbuchOpen] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(EINSTIEG_LOGBUCH_STORAGE_KEY);
      if (stored) setEinstiegLogbuchEntries(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const handleEinstiegLogbuchChange = useCallback((lessonIndex: number, value: string) => {
    setEinstiegLogbuchEntries((prev) => {
      const next = { ...prev, [lessonIndex]: value };
      try { localStorage.setItem(EINSTIEG_LOGBUCH_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // Logbuch PDF generation state
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const generateLogbuchPdf = useCallback(async (
    entries: Record<number, string>,
    lessonList: Array<{ title: string }>,
    dimensionTitle: string,
    accentColor: string,
  ) => {
    if (pdfGenerating) return;
    setPdfGenerating(true);

    try {
      const escapeHtml = (value: string) => value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Call AI review API
      const lessonTitles = lessonList.map((l) => l.title);
      const res = await fetch("/api/logbuch-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries, lessonTitles, dimensionTitle }),
      });
      const data = await res.json() as { review?: string; error?: string };
      const review = data.review || "KI-Kommentar konnte nicht generiert werden.";

      // Build HTML for PDF
      const sortedEntries = Object.entries(entries)
        .filter(([, v]) => v.trim())
        .sort(([a], [b]) => Number(a) - Number(b));

      const entryHtml = sortedEntries.length
        ? sortedEntries
          .map(([k, v], index) => {
            const title = lessonTitles[Number(k)] || `Lektion ${Number(k) + 1}`;
            return `<article class="entry-card">
  <div class="entry-meta">Eintrag ${index + 1}</div>
  <h3 class="entry-title">${escapeHtml(title)}</h3>
  <p class="entry-text">${escapeHtml(v).replace(/\n/g, "<br/>")}</p>
</article>`;
          })
          .join("")
        : `<div class="empty-state">Noch keine Logbuch-Einträge vorhanden.</div>`;

      const reviewHtml = review
        .trim()
        .replace(/^\s*[-*]\s+/gm, "• ")
        .replace(/^\s*\d+\.\s+/gm, "• ")
        .replace(/\s*\n{3,}\s*/g, "\n\n")
        .replace(/\n{2,}/g, "\n\n")
        .replace(/^\s+|\s+$/g, "")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .split("\n\n")
        .map((p: string) => {
          if (p.startsWith("Zusammenfassung") || p.startsWith("Fehlende Aspekte") || p.startsWith("Kritische Diskussion")) {
            const [heading, ...rest] = p.split("\n");
            return `<h3 class="review-heading">${heading}</h3><p class="review-text">${rest.join("<br/>")}</p>`;
          }
          return `<p class="review-text">${p.replace(/\n/g, "<br/>")}</p>`;
        })
        .join("");

      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear()}`;

      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Logbuch – ${dimensionTitle}</title><style>
@page{size:A4;margin:16mm 14mm}
*{box-sizing:border-box}
body{font-family:Inter,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;margin:0;padding:0;background:#ffffff}
.doc{max-width:180mm;margin:0 auto}
.header{border:1px solid #d8e2ec;border-left:5px solid ${accentColor};background:#f8fafc;border-radius:10px;padding:12px 14px;margin-bottom:16px}
.header h1{font-size:20px;line-height:1.25;margin:0 0 6px 0;color:#0f172a}
.meta{display:flex;gap:8px;flex-wrap:wrap;font-size:10px;color:#475569}
.meta-chip{display:inline-block;border:1px solid #d1dbe7;border-radius:999px;padding:3px 8px;background:#ffffff}
.section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.09em;color:#334155;margin:0 0 10px 0}
.entry-grid{display:grid;grid-template-columns:1fr;gap:8px}
.entry-card{border:1px solid #e2e8f0;border-radius:8px;padding:10px 11px;background:#ffffff;break-inside:avoid}
.entry-meta{font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;margin-bottom:5px}
.entry-title{font-size:12px;line-height:1.4;margin:0 0 6px 0;color:${accentColor};text-transform:uppercase;letter-spacing:0.03em}
.entry-text{font-size:11px;line-height:1.7;margin:0;color:#1e293b;white-space:pre-wrap;word-break:break-word}
.empty-state{font-size:11px;color:#64748b;border:1px dashed #cbd5e1;border-radius:8px;padding:12px;background:#f8fafc}
.review-box{margin-top:16px;background:#f8fafc;border:1px solid #dbe4ee;border-radius:10px;padding:12px 13px}
.review-label{font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:${accentColor};font-weight:700;margin-bottom:8px}
.review-heading{font-size:12px;font-weight:700;margin:12px 0 6px 0;color:#0f172a}
.review-text{font-size:11px;line-height:1.7;margin:0 0 8px 0;color:#1e293b}
.footer{margin-top:18px;padding-top:8px;border-top:1px solid #e2e8f0;font-size:9px;color:#64748b;text-align:center}
@media print{
  .entry-card,.review-box{break-inside:avoid}
}
</style></head><body>
<div class="doc">
<header class="header">
  <h1>Logbuch — ${escapeHtml(dimensionTitle)}</h1>
  <div class="meta">
    <span class="meta-chip">Erstellt am ${dateStr}</span>
    <span class="meta-chip">DeepDiveKI Escape Game</span>
    <span class="meta-chip">${sortedEntries.length} Einträge</span>
  </div>
</header>
<section>
  <h2 class="section-title">Deine Einträge</h2>
  <div class="entry-grid">${entryHtml}</div>
</section>
<section class="review-box">
  <div class="review-label">KI-Kommentar</div>
  ${reviewHtml}
</section>
<footer class="footer">Dieses Dokument wurde automatisch generiert. Der KI-Kommentar dient als Reflexionsimpuls, nicht als Bewertung. · deepdive-ki.de</footer>
</div>
</body></html>`;

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 400);
      }
    } catch {
      alert("Fehler beim Generieren des Logbuch-PDFs. Bitte versuche es erneut.");
    } finally {
      setPdfGenerating(false);
    }
  }, [pdfGenerating]);

  // MIT lesson player state
  const [mitLesson, setMitLesson] = useState(0);
  const [mitCompleted, setMitCompleted] = useState<Set<number>>(new Set());

  const handleMitNext = useCallback(() => {
    setMitCompleted((prev) => new Set(prev).add(mitLesson));
    if (tutorial?.mitLessons && mitLesson < tutorial.mitLessons.length - 1) {
      setMitLesson((l) => l + 1);
    }
  }, [mitLesson, tutorial?.mitLessons]);

  const handleMitBack = useCallback(() => {
    if (mitLesson > 0) setMitLesson((l) => l - 1);
  }, [mitLesson]);

  // Logbuch state — persisted per lesson in localStorage
  const LOGBUCH_STORAGE_KEY = "ddki_escape_mit_logbuch_v1";
  const [logbuchEntries, setLogbuchEntries] = useState<Record<number, string>>({});
  const [logbuchOpen, setLogbuchOpen] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOGBUCH_STORAGE_KEY);
      if (stored) setLogbuchEntries(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const handleLogbuchChange = useCallback((lessonIndex: number, value: string) => {
    setLogbuchEntries((prev) => {
      const next = { ...prev, [lessonIndex]: value };
      try { localStorage.setItem(LOGBUCH_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // LDK lesson player state
  const [ldkLesson, setLdkLesson] = useState(0);
  const [ldkCompleted, setLdkCompleted] = useState<Set<number>>(new Set());

  const handleLdkNext = useCallback(() => {
    setLdkCompleted((prev) => new Set(prev).add(ldkLesson));
    if (tutorial?.ldkLessons && ldkLesson < tutorial.ldkLessons.length - 1) {
      setLdkLesson((l) => l + 1);
    }
  }, [ldkLesson, tutorial?.ldkLessons]);

  const handleLdkBack = useCallback(() => {
    if (ldkLesson > 0) setLdkLesson((l) => l - 1);
  }, [ldkLesson]);

  // LDK Logbuch state
  const LDK_LOGBUCH_STORAGE_KEY = "ddki_escape_ldk_logbuch_v1";
  const [ldkLogbuchEntries, setLdkLogbuchEntries] = useState<Record<number, string>>({});
  const [ldkLogbuchOpen, setLdkLogbuchOpen] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LDK_LOGBUCH_STORAGE_KEY);
      if (stored) setLdkLogbuchEntries(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const handleLdkLogbuchChange = useCallback((lessonIndex: number, value: string) => {
    setLdkLogbuchEntries((prev) => {
      const next = { ...prev, [lessonIndex]: value };
      try { localStorage.setItem(LDK_LOGBUCH_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // LTK lesson player state
  const [ltkLesson, setLtkLesson] = useState(0);
  const [ltkCompleted, setLtkCompleted] = useState<Set<number>>(new Set());

  const handleLtkNext = useCallback(() => {
    setLtkCompleted((prev) => new Set(prev).add(ltkLesson));
    if (tutorial?.ltkLessons && ltkLesson < tutorial.ltkLessons.length - 1) {
      setLtkLesson((l) => l + 1);
    }
  }, [ltkLesson, tutorial?.ltkLessons]);

  const handleLtkBack = useCallback(() => {
    if (ltkLesson > 0) setLtkLesson((l) => l - 1);
  }, [ltkLesson]);

  // LTK Logbuch state
  const LTK_LOGBUCH_STORAGE_KEY = "ddki_escape_ltk_logbuch_v1";
  const [ltkLogbuchEntries, setLtkLogbuchEntries] = useState<Record<number, string>>({});
  const [ltkLogbuchOpen, setLtkLogbuchOpen] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LTK_LOGBUCH_STORAGE_KEY);
      if (stored) setLtkLogbuchEntries(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const handleLtkLogbuchChange = useCallback((lessonIndex: number, value: string) => {
    setLtkLogbuchEntries((prev) => {
      const next = { ...prev, [lessonIndex]: value };
      try { localStorage.setItem(LTK_LOGBUCH_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

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

  const allExerciseItemsAssigned = tutorial?.exercise
    ? tutorial.exercise.items.every((item) => exerciseAssignments[item.id] !== undefined)
    : false;

  const allQuizCorrect = useMemo(() => {
    if (!tutorial?.quizQuestions) return false;
    return tutorial.quizQuestions.every((q) => {
      const answerId = quizAnswers[q.id];
      if (!answerId) return false;
      const selected = q.options.find((o) => o.id === answerId);
      return selected?.correct === true;
    });
  }, [tutorial, quizAnswers]);

  const allQuizChecked = useMemo(() => {
    if (!tutorial?.quizQuestions) return false;
    return tutorial.quizQuestions.every((q) => quizChecked[q.id]);
  }, [tutorial, quizChecked]);

  const canAdvance = useCallback(
    (step: number): boolean => {
      if (STEP_EXERCISE !== -1 && step === STEP_EXERCISE) return exerciseCorrect;
      if (STEP_QUIZ !== -1 && step === STEP_QUIZ) return allQuizCorrect && allQuizChecked;
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
    if (!tutorial?.exercise || !allExerciseItemsAssigned) return;
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
            href="/fortbildung/escape-game"
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
          href="/fortbildung/escape-game"
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
        {/* ────── Einstieg (Lesson Player) ────── */}
        {STEP_EINSTIEG !== -1 && currentStep === STEP_EINSTIEG && (
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Einsieg%20Lernen%20ueber%20KI%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Einsieg%20Lernen%20ueber%20KI%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mb-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
{`Herzlich willkommen zum Bereich „Lernen über KI"! Ich bin Björn von DeepDiveKI und ich freue mich, dass du dabei bist.

Bevor wir loslegen, eine kurze Orientierung: In diesem Tutorial geht es darum, ein grundlegendes Verständnis davon aufzubauen, was Künstliche Intelligenz eigentlich ist — und was nicht. Wir schauen uns an, wie KI funktioniert, was sie kann, wo ihre Grenzen liegen und warum das für deinen Schulalltag relevant ist.

Du wirst dabei nicht nur zuhören und lesen, sondern vor allem selbst ausprobieren. Wir starten gleich mit einem kleinen Experiment, schauen uns dann an, wie moderne KI-Tools aufgebaut sind, und arbeiten uns Schritt für Schritt zum technischen Kern vor — der Token-Vorhersage.

Am Ende dieses Einstiegs wirst du wissen, was hinter dem „Zauber" von ChatGPT und Co. steckt. Und keine Sorge: Du brauchst dafür keinerlei Vorkenntnisse. Alles, was du mitbringen musst, ist Neugier.

Also — los geht's! Schau dir die Fokus-Frage unten an, die uns durch diesen gesamten Bereich begleiten wird.`}
                  </p>
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/So%20geht%20es%20los%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/So%20geht%20es%20los%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-700">
                    Okay, genug Theorie — jetzt wird ausprobiert! In der nächsten Lektion findest du Quickdraw, ein Zeichenspiel von Google. Du bekommst einen Begriff und hast 20 Sekunden, um ihn zu zeichnen — und eine KI versucht in Echtzeit zu erraten, was du malst. Klingt nach Spaß? Ist es auch. Aber dahinter steckt echte KI. Klick auf nächste Lektion und probier es einmal aus.
                  </p>
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Wof%C3%BCr%20eigentlich%20KI%3F%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Wof%C3%BCr%20eigentlich%20KI%3F%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
{`Willkommen zurück! Du hast gerade Quickdraw ausprobiert — und dabei vielleicht zum ersten Mal ganz bewusst ein neuronales Netzwerk trainiert. Denn genau das ist passiert: Jedes Mal, wenn du einen Gegenstand gezeichnet hast, hat das System deine Zeichnung analysiert und versucht, sie zu erkennen. Dabei hat es nicht nur geraten — es hat aus deiner Interpretation gelernt.

Das Spannende daran: Jeder Mensch zeichnet eine Katze, ein Fahrrad oder eine Brille anders. Deine Zeichnung ist deine persönliche Interpretation dieses Objekts. Und genau diese Vielfalt an Interpretationen ist es, die das neuronale Netzwerk hinter Quickdraw besser macht. Je mehr verschiedene Menschen zeichnen, desto mehr Varianten lernt das System — und desto zuverlässiger kann es in Zukunft erkennen, was gemeint ist.

Das ist im Kern das Prinzip hinter Künstlicher Intelligenz: Große Mengen an Daten analysieren, Muster darin erkennen und auf dieser Basis Entscheidungen treffen oder Vorhersagen machen. Bei Quickdraw sind die Daten deine Zeichnungen, die Muster sind die typischen Formen und Striche für bestimmte Objekte, und die Entscheidung ist: „Das sieht aus wie eine Katze."

Aber — und das ist wichtig — das System versteht nicht wirklich, was eine Katze ist. Es hat kein Bild einer echten Katze im Kopf. Es erkennt nur statistische Muster in Pixeln und Strichen. Diesen Unterschied zwischen Mustererkennung und echtem Verstehen werden wir in diesem Kurs noch genauer beleuchten.

Schauen wir uns jetzt an, wofür KI eigentlich eingesetzt wird — und was sie besonders gut kann.`}
                  </p>
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Von%20speziellen%20Aufgaben%20zu%20genereller%20KI%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Von%20speziellen%20Aufgaben%20zu%20genereller%20KI%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
{`Es gibt drei sehr grobe wissenschaftliche Theorien zu Künstlicher Intelligenz. Die klingen ein wenig, als hätte ein Kind sich diese Kategorien ausgedacht — aber sie helfen tatsächlich, das große Bild zu verstehen.

Die erste Kategorie ist die sogenannte schwache KI. Klingt nicht besonders beeindruckend, oder? Aber genau das ist alles, was wir heute haben. Schwache KI sind Systeme, die auf eine ganz bestimmte Aufgabe spezialisiert sind: Bilder erkennen, Texte generieren, Sprache übersetzen, Schach spielen. Quickdraw, das du gerade ausprobiert hast, ist ein perfektes Beispiel — es kann Zeichnungen erkennen, aber es kann dir nicht sagen, was es zum Abendessen empfiehlt. Auch ChatGPT und Claude sind schwache KI: Sie sind Spezialisten für Sprachverarbeitung, keine universellen Denker.

Dann gibt es die starke KI. Das wäre ein System, das eine allgemeine Intelligenz besitzt — so wie ein Mensch. Es könnte nicht nur Texte schreiben, sondern auch ein physisches Experiment durchführen, emotionale Zusammenhänge verstehen und sich selbst neue Aufgaben stellen. Klingt nach Science-Fiction? Ist es auch — bislang existiert starke KI nur als Forschungsvision. Niemand hat sie bisher gebaut, und ob das überhaupt möglich ist, darüber streiten sich die Experten.

Und dann gibt es noch die überlegene KI — die Superintelligenz. Eine KI, die in allen Bereichen die menschliche Intelligenz weit übertrifft. Das ist reine Hypothese, mehr Gedankenexperiment als Wissenschaft. Aber es ist wichtig zu wissen, dass diese Kategorie existiert — weil in der öffentlichen Debatte oft Fähigkeiten von schwacher KI mit Szenarien von Superintelligenz vermischt werden. Und das führt zu überzogenen Erwartungen oder unnötigen Ängsten.

Also merk dir: Alles, was du heute nutzt — jedes KI-Tool, jeder Chatbot, jede Bilderkennung — ist schwache KI. Spezialisiert, leistungsstark in seinem Bereich, aber weit entfernt von menschlicher Intelligenz. Diese Unterscheidung hilft enorm, KI realistisch einzuordnen.`}
                  </p>
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Eingabe%20bei%20ChatGPT%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Eingabe%20bei%20ChatGPT%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
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
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/oder%20bei%20Claude%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/oder%20bei%20Claude%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
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
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Ausgabe%20bei%20ChatGPT%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Ausgabe%20bei%20ChatGPT%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
{`Diese Ansicht kennst du natürlich: Du tippst eine Frage ein, drückst Enter — und die KI liefert eine Antwort. Hier haben wir ChatGPT gebeten, ein Gedicht im Duktus von Hermann Hesse zu schreiben, das Lehrerinnen und Lehrern LLMs erklärt. Und was wir zurückbekommen, klingt tatsächlich erstaunlich überzeugend — der Sprachrhythmus, die Wortwahl, sogar die melancholische Stimmung erinnern an Hesse.

Links siehst du: Das ist eine unveränderte, vollautomatisch generierte Antwort von ChatGPT. Kein Mensch hat daran nachgebessert. Rechts die Begriffe, die wir gleich genauer anschauen: Oben der Prompt — also unsere Eingabe, unsere Anweisung an die KI. Und unten die Ausgabe — Token für Token vom Sprachmodell generiert.

Aber halt — wie macht die KI das eigentlich? Woher „weiß" sie, wie Hermann Hesse schreibt? Woher kennt sie den Unterschied zwischen einem Gedicht und einem Sachtext? Und warum klingt das so überzeugend, obwohl die KI — wie wir gelernt haben — gar nichts versteht?

Die Antwort liegt in der Art, wie ein LLM arbeitet. Und genau das schauen wir uns in der nächsten Lektion an: Wie ein Sprachmodell Wort für Wort — oder genauer: Token für Token — seine Antwort aufbaut. Klick auf „Nächste Lektion" — es wird spannend.`}
                  </p>
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Aufgabe%20eines%20LLM%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Aufgabe%20eines%20LLM%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
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
                </details>
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
                    crossOrigin="anonymous"
                  >
                    <source src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Soekia%20GPT%20%E2%80%93%20Ausprobieren%20(mit%20Intro%20und%20Outro).mp4" type="video/mp4" />
                    <track kind="subtitles" src="https://pub-c5c3d362b2f64f92a63038ba1fc6dd74.r2.dev/Videos%20Escape%20Game/Soekia%20GPT%20%E2%80%93%20Ausprobieren%20(mit%20Intro%20und%20Outro).vtt" srcLang="de" label="Deutsch" />
                    Dein Browser unterstützt keine Videowiedergabe.
                  </video>
                </div>
                <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" />
                    Video-Skript
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">
{`Jetzt bist du dran. In der letzten Lektion haben wir gesehen, wie ein LLM Token für Token seine Antwort aufbaut — immer das wahrscheinlichste nächste Wort. Aber wie fühlt sich das eigentlich an, wenn man selbst in die Rolle des Modells schlüpft?

Genau das kannst du jetzt mit Soekia GPT ausprobieren. Das ist eine interaktive Lernumgebung, die von der Pädagogischen Hochschule St. Gallen entwickelt wurde. Du siehst dort einen Trainingstext — also die Daten, aus denen das Mini-Modell lernt — und kannst dann beobachten, wie es basierend auf diesen Daten das nächste Wort vorhersagt.

Das Besondere: Du kannst den Trainingstext verändern. Füg neue Sätze hinzu, entferne welche, verändere die Gewichtung — und schau, was passiert. Plötzlich ändert sich die Vorhersage. Und genau hier wird es spannend: Wenn der Trainingstext einseitig ist, wird auch die Vorhersage einseitig. Das ist Bias — nicht weil das Modell „voreingenommen" ist, sondern weil die Daten es sind.

Und wenn das Modell eine Antwort generiert, die plausibel klingt, aber im Trainingstext gar nicht so vorkommt? Dann hast du eine Halluzination live erlebt — das Modell füllt Lücken mit statistisch wahrscheinlichen, aber falschen Informationen.

Probier es aus, experimentier mit verschiedenen Texten und beobachte, wie sich die Vorhersagen verändern. Du wirst danach ein viel intuitiveres Verständnis dafür haben, warum KI manchmal überraschend gut und manchmal überraschend falsch liegt.

Damit hast du den Einstieg geschafft! Du weißt jetzt, was KI im Kern macht — Muster erkennen und Wahrscheinlichkeiten berechnen — und du hast es selbst erlebt. Im nächsten Schritt, dem Kernwissen, vertiefen wir diese Grundlagen und schauen uns an, was das für den Schulkontext konkret bedeutet.`}
                  </p>
                </details>
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

            {/* Logbuch */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <div className="rounded border-2 border-amber-300 bg-amber-50 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700">
                    <IconNotebook className="h-4 w-4" /> Logbuch
                  </div>
                  <span className="text-[10px] text-amber-500">wird automatisch gespeichert</span>
                </div>
                <textarea
                  value={einstiegLogbuchEntries[einstiegLesson] ?? ""}
                  onChange={(e) => handleEinstiegLogbuchChange(einstiegLesson, e.target.value)}
                  placeholder="Halte hier deine Notizen, Beobachtungen und Reflexionen fest …"
                  className="w-full resize-y rounded border-2 border-amber-200 bg-white p-3 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none"
                  rows={5}
                />
                {Object.values(einstiegLogbuchEntries).some((v) => v.trim()) && (
                  <button
                    type="button"
                    onClick={() => setEinstiegLogbuchOpen((o) => !o)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-800"
                  >
                    <IconNotebook className="h-3 w-3" />
                    {einstiegLogbuchOpen ? "Alle Einträge ausblenden" : "Alle Einträge anzeigen"}
                  </button>
                )}
                {einstiegLogbuchOpen && Object.entries(einstiegLogbuchEntries).some(([k, v]) => Number(k) !== einstiegLesson && v.trim()) && (
                  <div className="mt-3 space-y-2 border-t border-amber-200 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Bisherige Einträge</p>
                    {Object.entries(einstiegLogbuchEntries)
                      .filter(([k, v]) => Number(k) !== einstiegLesson && v.trim())
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([k, v]) => (
                        <div key={k} className="rounded border border-amber-200 bg-white p-3">
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            {einstiegLessons[Number(k)]?.title}
                          </p>
                          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{v}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

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
                  disabled={pdfGenerating}
                  onClick={() => {
                    setEinstiegCompleted((prev) => new Set(prev).add(einstiegLesson));
                    if (Object.values(einstiegLogbuchEntries).some((v) => v.trim())) {
                      generateLogbuchPdf(
                        einstiegLogbuchEntries,
                        einstiegLessons,
                        tutorial.title,
                        accent.bg.includes("amber") ? "#f59e0b"
                          : accent.bg.includes("emerald") ? "#10b981"
                          : accent.bg.includes("sky") ? "#0ea5e9"
                          : "#f43f5e",
                      );
                    }
                  }}
                  className="inline-flex items-center gap-2 border-2 border-black bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#000] hover:opacity-90 disabled:opacity-50"
                >
                  {pdfGenerating ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Logbuch wird erstellt…
                    </>
                  ) : (
                    <>
                      <IconCheck className="h-4 w-4" />
                      Abschließen & Logbuch als PDF
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ────── Step MIT: Lernen mit KI (Lesson Player) ────── */}
        {hasMitLessons && currentStep === STEP_MIT && tutorial.mitLessons && (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#000]">
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                  Lektion {mitLesson + 1} von {tutorial.mitLessons.length}
                </span>
                <span className="text-xs text-slate-500">
                  {mitCompleted.size} abgeschlossen
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${accent.bg} transition-all duration-500`}
                  style={{ width: `${(mitCompleted.size / tutorial.mitLessons.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Lesson list */}
            <div className="border-4 border-black bg-white shadow-[6px_6px_0_#000]">
              <button
                type="button"
                onClick={() => setExpandedExamples((prev) => ({ ...prev, mitList: !prev.mitList }))}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Kursübersicht</span>
                <IconChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${expandedExamples.mitList ? "rotate-90" : ""}`} />
              </button>
              {expandedExamples.mitList && (
                <div className="border-t-2 border-black px-2 py-2">
                  {tutorial.mitLessons.map((lesson, li) => {
                    const isCompleted = mitCompleted.has(li);
                    const isCurrent = li === mitLesson;
                    return (
                      <button
                        key={li}
                        type="button"
                        onClick={() => {
                          if (isCompleted || isCurrent || li <= mitLesson) setMitLesson(li);
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
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <h3 className={`mb-4 text-lg font-bold ${accent.text}`}>
                {tutorial.mitLessons[mitLesson]?.title}
              </h3>

              {/* Video */}
              {tutorial.mitLessonsVideoUrls?.[mitLesson] ? (
                <div className="mb-6 overflow-hidden rounded border-2 border-black bg-black">
                  {tutorial.mitLessonsVideoUrls[mitLesson].endsWith(".mp4") ? (
                    <video
                      controls
                      className="w-full bg-black"
                      preload="metadata"
                      crossOrigin="anonymous"
                      key={tutorial.mitLessonsVideoUrls[mitLesson]}
                    >
                      <source src={tutorial.mitLessonsVideoUrls[mitLesson]} type="video/mp4" />
                      <track kind="subtitles" src={vttUrl(tutorial.mitLessonsVideoUrls[mitLesson])} srcLang="de" label="Deutsch" />
                      Dein Browser unterstützt keine Videowiedergabe.
                    </video>
                  ) : hasFunctionalConsent ? (
                    <iframe
                      src={tutorial.mitLessonsVideoUrls[mitLesson]}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={tutorial.mitLessons[mitLesson]?.title}
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-slate-900 text-center text-sm text-slate-400 p-4">
                      Video wird nach Cookie-Zustimmung geladen.
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-6 flex aspect-video items-center justify-center rounded border-2 border-dashed border-slate-300 bg-slate-50">
                  <div className="text-center text-slate-400">
                    <IconPlayerPlay className="mx-auto mb-2 h-10 w-10" />
                    <p className="text-sm font-medium">Video kommt bald</p>
                  </div>
                </div>
              )}

              {/* Script / Transcript */}
              {tutorial.mitLessonsScripts?.[mitLesson] && (
                <details className="rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" /> Video-Skript
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                    {tutorial.mitLessonsScripts[mitLesson]}
                  </div>
                </details>
              )}

              {/* External tool link */}
              {tutorial.mitLessonsLinks?.[mitLesson] && (
                <div className="mt-6 flex justify-center">
                  <a
                    href={tutorial.mitLessonsLinks[mitLesson].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#000]`}
                  >
                    <IconExternalLink className="h-4 w-4" />
                    {tutorial.mitLessonsLinks[mitLesson].label}
                  </a>
                </div>
              )}

              {/* Logbuch */}
              <div className="mt-6 rounded border-2 border-sky-300 bg-sky-50 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-700">
                    <IconNotebook className="h-4 w-4" /> Logbuch
                  </div>
                  <span className="text-[10px] text-sky-500">wird automatisch gespeichert</span>
                </div>
                <textarea
                  value={logbuchEntries[mitLesson] ?? ""}
                  onChange={(e) => handleLogbuchChange(mitLesson, e.target.value)}
                  placeholder="Halte hier deine Notizen, Beobachtungen und Reflexionen fest …"
                  className="w-full resize-y rounded border-2 border-sky-200 bg-white p-3 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
                  rows={5}
                />
                {Object.values(logbuchEntries).some((v) => v.trim()) && (
                  <button
                    type="button"
                    onClick={() => setLogbuchOpen((o) => !o)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800"
                  >
                    <IconNotebook className="h-3 w-3" />
                    {logbuchOpen ? "Alle Einträge ausblenden" : "Alle Einträge anzeigen"}
                  </button>
                )}
                {logbuchOpen && Object.entries(logbuchEntries).some(([k, v]) => Number(k) !== mitLesson && v.trim()) && (
                  <div className="mt-3 space-y-2 border-t border-sky-200 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sky-500">Bisherige Einträge</p>
                    {Object.entries(logbuchEntries)
                      .filter(([k, v]) => Number(k) !== mitLesson && v.trim())
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([k, v]) => (
                        <div key={k} className="rounded border border-sky-200 bg-white p-3">
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-sky-600">
                            {tutorial.mitLessons?.[Number(k)]?.title}
                          </p>
                          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{v}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleMitBack}
                disabled={mitLesson === 0}
                className="flex items-center gap-1 border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                <IconChevronLeft className="h-4 w-4" /> Zurück
              </button>
              {mitLesson < tutorial.mitLessons.length - 1 ? (
                <button
                  type="button"
                  onClick={handleMitNext}
                  className={`flex items-center gap-1 border-2 border-black px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] ${accent.bg}`}
                >
                  Weiter <IconChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={pdfGenerating}
                  onClick={() => {
                    handleMitNext();
                    if (Object.values(logbuchEntries).some((v) => v.trim())) {
                      generateLogbuchPdf(logbuchEntries, tutorial.mitLessons!, tutorial.title, "#0ea5e9");
                    }
                  }}
                  className="flex items-center gap-1 border-2 border-black bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] disabled:opacity-50"
                >
                  {pdfGenerating ? (
                    <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Logbuch wird erstellt…</>
                  ) : (
                    <><IconCheck className="h-4 w-4" /> Abschließen & Logbuch als PDF</>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ────── Step LDK: Lernen durch KI (Lesson Player) ────── */}
        {hasLdkLessons && currentStep === STEP_LDK && tutorial.ldkLessons && (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#000]">
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                  Lektion {ldkLesson + 1} von {tutorial.ldkLessons.length}
                </span>
                <span className="text-xs text-slate-500">
                  {ldkCompleted.size} abgeschlossen
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${accent.bg} transition-all duration-500`}
                  style={{ width: `${(ldkCompleted.size / tutorial.ldkLessons.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Lesson list */}
            <div className="border-4 border-black bg-white shadow-[6px_6px_0_#000]">
              <button
                type="button"
                onClick={() => setExpandedExamples((prev) => ({ ...prev, ldkList: !prev.ldkList }))}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Kursübersicht</span>
                <IconChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${expandedExamples.ldkList ? "rotate-90" : ""}`} />
              </button>
              {expandedExamples.ldkList && (
                <div className="border-t-2 border-black px-2 py-2">
                  {tutorial.ldkLessons.map((lesson, li) => {
                    const isCompleted = ldkCompleted.has(li);
                    const isCurrent = li === ldkLesson;
                    return (
                      <button
                        key={li}
                        type="button"
                        onClick={() => {
                          if (isCompleted || isCurrent || li <= ldkLesson) setLdkLesson(li);
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
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <h3 className={`mb-4 text-lg font-bold ${accent.text}`}>
                {tutorial.ldkLessons[ldkLesson]?.title}
              </h3>

              {/* Video */}
              {tutorial.ldkLessonsVideoUrls?.[ldkLesson] ? (
                <div className="mb-6 overflow-hidden rounded border-2 border-black bg-black">
                  {tutorial.ldkLessonsVideoUrls[ldkLesson].endsWith(".mp4") ? (
                    <video
                      controls
                      className="w-full bg-black"
                      preload="metadata"
                      crossOrigin="anonymous"
                      key={tutorial.ldkLessonsVideoUrls[ldkLesson]}
                    >
                      <source src={tutorial.ldkLessonsVideoUrls[ldkLesson]} type="video/mp4" />
                      <track kind="subtitles" src={vttUrl(tutorial.ldkLessonsVideoUrls[ldkLesson])} srcLang="de" label="Deutsch" />
                      Dein Browser unterstützt keine Videowiedergabe.
                    </video>
                  ) : hasFunctionalConsent ? (
                    <iframe
                      src={tutorial.ldkLessonsVideoUrls[ldkLesson]}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={tutorial.ldkLessons[ldkLesson]?.title}
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-slate-900 text-center text-sm text-slate-400 p-4">
                      Video wird nach Cookie-Zustimmung geladen.
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-6 flex aspect-video items-center justify-center rounded border-2 border-dashed border-slate-300 bg-slate-50">
                  <div className="text-center text-slate-400">
                    <IconPlayerPlay className="mx-auto mb-2 h-10 w-10" />
                    <p className="text-sm font-medium">Video kommt bald</p>
                  </div>
                </div>
              )}

              {/* Script / Transcript */}
              {tutorial.ldkLessonsScripts?.[ldkLesson] && (
                <details className="rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <IconBook className="h-4 w-4" /> Video-Skript
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                    {tutorial.ldkLessonsScripts[ldkLesson]}
                  </div>
                </details>
              )}

              {/* External tool link */}
              {tutorial.ldkLessonsLinks?.[ldkLesson] && (
                <div className="mt-6 flex justify-center">
                  <a
                    href={tutorial.ldkLessonsLinks[ldkLesson].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#000]`}
                  >
                    <IconExternalLink className="h-4 w-4" />
                    {tutorial.ldkLessonsLinks[ldkLesson].label}
                  </a>
                </div>
              )}

              {/* Logbuch */}
              <div className="mt-6 rounded border-2 border-emerald-300 bg-emerald-50 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
                    <IconNotebook className="h-4 w-4" /> Logbuch
                  </div>
                  <span className="text-[10px] text-emerald-500">wird automatisch gespeichert</span>
                </div>
                <textarea
                  value={ldkLogbuchEntries[ldkLesson] ?? ""}
                  onChange={(e) => handleLdkLogbuchChange(ldkLesson, e.target.value)}
                  placeholder="Halte hier deine Notizen, Beobachtungen und Reflexionen fest …"
                  className="w-full resize-y rounded border-2 border-emerald-200 bg-white p-3 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                  rows={5}
                />
                {Object.values(ldkLogbuchEntries).some((v) => v.trim()) && (
                  <button
                    type="button"
                    onClick={() => setLdkLogbuchOpen((o) => !o)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800"
                  >
                    <IconNotebook className="h-3 w-3" />
                    {ldkLogbuchOpen ? "Alle Einträge ausblenden" : "Alle Einträge anzeigen"}
                  </button>
                )}
                {ldkLogbuchOpen && Object.entries(ldkLogbuchEntries).some(([k, v]) => Number(k) !== ldkLesson && v.trim()) && (
                  <div className="mt-3 space-y-2 border-t border-emerald-200 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Bisherige Einträge</p>
                    {Object.entries(ldkLogbuchEntries)
                      .filter(([k, v]) => Number(k) !== ldkLesson && v.trim())
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([k, v]) => (
                        <div key={k} className="rounded border border-emerald-200 bg-white p-3">
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                            {tutorial.ldkLessons?.[Number(k)]?.title}
                          </p>
                          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{v}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleLdkBack}
                disabled={ldkLesson === 0}
                className="flex items-center gap-1 border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                <IconChevronLeft className="h-4 w-4" /> Zurück
              </button>
              {ldkLesson < tutorial.ldkLessons.length - 1 ? (
                <button
                  type="button"
                  onClick={handleLdkNext}
                  className={`flex items-center gap-1 border-2 border-black px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] ${accent.bg}`}
                >
                  Weiter <IconChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={pdfGenerating}
                  onClick={() => {
                    handleLdkNext();
                    if (Object.values(ldkLogbuchEntries).some((v) => v.trim())) {
                      generateLogbuchPdf(ldkLogbuchEntries, tutorial.ldkLessons!, tutorial.title, "#10b981");
                    }
                  }}
                  className="flex items-center gap-1 border-2 border-black bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] disabled:opacity-50"
                >
                  {pdfGenerating ? (
                    <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Logbuch wird erstellt…</>
                  ) : (
                    <><IconCheck className="h-4 w-4" /> Abschließen & Logbuch als PDF</>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ────── Step LTK: Lernen trotz KI (Lesson Player) ────── */}
        {hasLtkLessons && currentStep === STEP_LTK && tutorial.ltkLessons && (
          <div className="space-y-4">
            <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0_#000]">
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                  Lektion {ltkLesson + 1} von {tutorial.ltkLessons.length}
                </span>
                <span className="text-xs text-slate-500">{ltkCompleted.size} abgeschlossen</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div className={`h-2 rounded-full ${accent.bg} transition-all duration-500`} style={{ width: `${(ltkCompleted.size / tutorial.ltkLessons.length) * 100}%` }} />
              </div>
            </div>

            <div className="border-4 border-black bg-white shadow-[6px_6px_0_#000]">
              <button type="button" onClick={() => setExpandedExamples((prev) => ({ ...prev, ltkList: !prev.ltkList }))} className="flex w-full items-center justify-between px-4 py-3 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Kursübersicht</span>
                <IconChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${expandedExamples.ltkList ? "rotate-90" : ""}`} />
              </button>
              {expandedExamples.ltkList && (
                <div className="border-t-2 border-black px-2 py-2">
                  {tutorial.ltkLessons.map((lesson, li) => {
                    const isCompleted = ltkCompleted.has(li);
                    const isCurrent = li === ltkLesson;
                    return (
                      <button key={li} type="button" onClick={() => { if (isCompleted || isCurrent || li <= ltkLesson) setLtkLesson(li); }}
                        className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors ${isCurrent ? `${accent.light} ${accent.text} font-bold` : isCompleted ? "text-slate-600 hover:bg-slate-50" : "text-slate-300"}`}>
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isCompleted ? "bg-emerald-500 text-white" : isCurrent ? `${accent.bg} text-white` : "bg-slate-200 text-slate-400"}`}>
                          {isCompleted ? <IconCheck className="h-3 w-3" /> : li + 1}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
              <h3 className={`mb-4 text-lg font-bold ${accent.text}`}>{tutorial.ltkLessons[ltkLesson]?.title}</h3>

              {tutorial.ltkLessonsVideoUrls?.[ltkLesson] ? (
                <div className="mb-6 overflow-hidden rounded border-2 border-black bg-black">
                  {tutorial.ltkLessonsVideoUrls[ltkLesson].endsWith(".mp4") ? (
                    <video controls className="w-full bg-black" preload="metadata" crossOrigin="anonymous" key={tutorial.ltkLessonsVideoUrls[ltkLesson]}>
                      <source src={tutorial.ltkLessonsVideoUrls[ltkLesson]} type="video/mp4" />
                      <track kind="subtitles" src={vttUrl(tutorial.ltkLessonsVideoUrls[ltkLesson])} srcLang="de" label="Deutsch" />
                      Dein Browser unterstützt keine Videowiedergabe.
                    </video>
                  ) : hasFunctionalConsent ? (
                    <iframe src={tutorial.ltkLessonsVideoUrls[ltkLesson]} className="aspect-video w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={tutorial.ltkLessons[ltkLesson]?.title} />
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-slate-900 text-center text-sm text-slate-400 p-4">Video wird nach Cookie-Zustimmung geladen.</div>
                  )}
                </div>
              ) : (
                <div className="mb-6 flex aspect-video items-center justify-center rounded border-2 border-dashed border-slate-300 bg-slate-50">
                  <div className="text-center text-slate-400"><IconPlayerPlay className="mx-auto mb-2 h-10 w-10" /><p className="text-sm font-medium">Video kommt bald</p></div>
                </div>
              )}

              {tutorial.ltkLessonsScripts?.[ltkLesson] && (
                <details className="rounded border-2 border-slate-200 bg-slate-50">
                  <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500"><IconBook className="h-4 w-4" /> Video-Skript</summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-700 whitespace-pre-line">{tutorial.ltkLessonsScripts[ltkLesson]}</div>
                </details>
              )}

              {tutorial.ltkLessonsLinks?.[ltkLesson] && (
                <div className="mt-6 flex justify-center">
                  <a href={tutorial.ltkLessonsLinks[ltkLesson].url} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 border-2 border-black ${accent.bg} px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[4px_4px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#000]`}>
                    <IconExternalLink className="h-4 w-4" />{tutorial.ltkLessonsLinks[ltkLesson].label}
                  </a>
                </div>
              )}

              <div className="mt-6 rounded border-2 border-rose-300 bg-rose-50 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-700"><IconNotebook className="h-4 w-4" /> Logbuch</div>
                  <span className="text-[10px] text-rose-500">wird automatisch gespeichert</span>
                </div>
                <textarea value={ltkLogbuchEntries[ltkLesson] ?? ""} onChange={(e) => handleLtkLogbuchChange(ltkLesson, e.target.value)}
                  placeholder="Halte hier deine Notizen, Beobachtungen und Reflexionen fest …"
                  className="w-full resize-y rounded border-2 border-rose-200 bg-white p-3 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:border-rose-400 focus:outline-none" rows={5} />
                {Object.values(ltkLogbuchEntries).some((v) => v.trim()) && (
                  <button type="button" onClick={() => setLtkLogbuchOpen((o) => !o)} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800">
                    <IconNotebook className="h-3 w-3" />{ltkLogbuchOpen ? "Alle Einträge ausblenden" : "Alle Einträge anzeigen"}
                  </button>
                )}
                {ltkLogbuchOpen && Object.entries(ltkLogbuchEntries).some(([k, v]) => Number(k) !== ltkLesson && v.trim()) && (
                  <div className="mt-3 space-y-2 border-t border-rose-200 pt-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500">Bisherige Einträge</p>
                    {Object.entries(ltkLogbuchEntries).filter(([k, v]) => Number(k) !== ltkLesson && v.trim()).sort(([a], [b]) => Number(a) - Number(b)).map(([k, v]) => (
                      <div key={k} className="rounded border border-rose-200 bg-white p-3">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-rose-600">{tutorial.ltkLessons?.[Number(k)]?.title}</p>
                        <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{v}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button type="button" onClick={handleLtkBack} disabled={ltkLesson === 0}
                className="flex items-center gap-1 border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0">
                <IconChevronLeft className="h-4 w-4" /> Zurück
              </button>
              {ltkLesson < tutorial.ltkLessons.length - 1 ? (
                <button type="button" onClick={handleLtkNext}
                  className={`flex items-center gap-1 border-2 border-black px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] ${accent.bg}`}>
                  Weiter <IconChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="button" disabled={pdfGenerating}
                  onClick={() => {
                    handleLtkNext();
                    if (Object.values(ltkLogbuchEntries).some((v) => v.trim())) {
                      generateLogbuchPdf(ltkLogbuchEntries, tutorial.ltkLessons!, tutorial.title, "#f43f5e");
                    }
                  }}
                  className="flex items-center gap-1 border-2 border-black bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] disabled:opacity-50">
                  {pdfGenerating ? (
                    <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Logbuch wird erstellt…</>
                  ) : (
                    <><IconCheck className="h-4 w-4" /> Abschließen & Logbuch als PDF</>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ────── Step Kernwissen ────── */}
        {STEP_KERNWISSEN !== -1 && currentStep === STEP_KERNWISSEN && tutorial.knowledgeBlocks && (
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
                      <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                        <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                          <IconBook className="h-4 w-4" />
                          Video-Skript
                        </summary>
                        <p className="px-5 pb-5 text-sm leading-relaxed text-slate-700">{intro.transcript}</p>
                      </details>
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
                      <details className="mt-6 rounded border-2 border-slate-200 bg-slate-50">
                        <summary className="flex cursor-pointer items-center gap-2 p-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                          <IconBook className="h-4 w-4" />
                          Video-Skript
                        </summary>
                        <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-700">{vid.transcript}</p>
                      </details>
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
        {STEP_EXERCISE !== -1 && currentStep === STEP_EXERCISE && tutorial.exercise && (
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
                          {tutorial.exercise!.categoryA}
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
                          {tutorial.exercise!.categoryB}
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
        {STEP_QUIZ !== -1 && currentStep === STEP_QUIZ && tutorial.quizQuestions && (
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
                      Frage {qi + 1} von {tutorial.quizQuestions!.length}
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

              {!showChallenge && (
                <div className="mt-6 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowChallenge(true)}
                    className={`inline-flex items-center gap-3 border-2 border-black ${accent.bg} px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0_#000] hover:opacity-90`}
                  >
                    <IconRocket className="h-5 w-5" />
                    Zur Jump-&-Run-Challenge
                  </button>
                  <p className="text-xs text-slate-500">
                    Meistere alle Lernstationen im Spiel, um deinen 6-stelligen Missions-Code zu erhalten.
                  </p>
                </div>
              )}
            </div>

            {showChallenge && (
              <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-8">
                <JumpRunChallenge chapterId={tutorial.id as "ueber" | "durch" | "mit"} />
              </div>
            )}
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
              {currentStep + 1 === STEP_CHALLENGE ? "Zum Jump-and-Run-Spiel" : "Weiter"}
              <IconChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
