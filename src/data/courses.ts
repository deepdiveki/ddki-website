export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  format: "Online" | "Präsenz" | "Hybrid";
  duration: string;
  targetAudience: string;
  topics: string[];
  prerequisites: string;
  instructor: string;
  featured: boolean;
  pdfUrl?: string;
  /**
   * Explizite Cross-References. Wenn gesetzt, überschreibt das die automatische
   * „same category"-Logik in CourseDetail. Sonst fallen wir auf Auto-Derivation
   * (selbe Kategorie, bis zu 3) zurück.
   */
  relatedSlugs?: string[];
};

export const courses: Course[] = [
  {
    slug: "crash-kurs-ki",
    title: "Crash Kurs KI: Der kompakte Einstieg in KI für Schule und Unterricht",
    shortDescription:
      "Praktische KI-Werkzeuge und Unterrichtsmethoden kennenlernen und Team-Teaching-Modelle erproben.",
    description:
      "Dieser Crash Kurs vermittelt praktische KI-Werkzeuge und Unterrichtsmethoden. Teilnehmende lernen verschiedene KI-basierte Werkzeuge kennen und erproben Team-Teaching-Modelle. DeepChat steht allen Teilnehmenden datenschutzkonform und kostenlos zur Verfügung.",
    categoryId: "ki-grundlagen",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Überblick KI-basierter Werkzeuge für den Unterricht",
      "Team-Teaching-Modelle mit KI",
      "Individualisierter Unterricht mit KI-Unterstützung",
      "Praktische Übungen mit DeepChat",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: true,
    pdfUrl: "/pdfs/DeepDiveKI - Crash Kurs.pdf",
  },
  {
    slug: "deep-dive-modul-3",
    title: "Deep Dive Modul III: Chancen und Risiken von KI in Schule und Gesellschaft",
    shortDescription:
      "Chancen von KI erarbeiten, sinnvolle Nutzung diskutieren und Methoden zur KI-Einführung in Schulen kennenlernen.",
    description:
      "Dieses Modul erarbeitet die Chancen von KI und deren sinnvolle Nutzung. Es vermittelt Methoden zur KI-Einführung in Schulen und beleuchtet sowohl Potenziale als auch Risiken aus schulischer und gesellschaftlicher Perspektive.",
    categoryId: "ki-grundlagen",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Chancen von KI in der Bildung",
      "Risiken und Herausforderungen",
      "Methoden zur KI-Einführung an Schulen",
      "Gesellschaftliche Perspektiven auf KI",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Modul III.pdf",
  },
  {
    slug: "deep-dive-modul-7",
    title: "KI-Bots für deinen Unterricht erstellen",
    shortDescription:
      "Eigene KI-gestützte Bots entwickeln und Schritt für Schritt für den Unterricht anpassen.",
    description:
      "In diesem Modul lernen Lehrkräfte, eigene KI-gestützte Bots zu entwickeln und anzupassen. Es vermittelt Grundlagen sowie eine Schritt-für-Schritt-Anleitung zur Erstellung von Unterrichtsbots, die den individuellen Bedürfnissen der Lernenden gerecht werden.",
    categoryId: "ki-tools-chatbots",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Grundlagen der Bot-Erstellung",
      "Schritt-für-Schritt-Anleitung für Unterrichtsbots",
      "Anpassung an individuelle Unterrichtsbedürfnisse",
      "Praxisübung: Eigenen Bot erstellen",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn und Tim",
    featured: true,
    pdfUrl: "/pdfs/DeepDiveKI - KI-Bots.pdf",
  },
  {
    slug: "prompt-engineering-fuer-lehrkraefte",
    title: "Prompt Engineering für Lehrkräfte: KI gezielt und effektiv nutzen",
    shortDescription:
      "Lernen Sie, KI-Chatbots wie ChatGPT, AIS.chat oder DeepChat durch präzise Prompts optimal für Ihren Unterricht einzusetzen.",
    description:
      "Prompt Engineering ist die Schlüsselkompetenz für den effektiven Einsatz von KI im Unterricht. In dieser Fortbildung lernen Lehrkräfte, wie sie durch gezielte Eingaben bessere Ergebnisse aus KI-Chatbots wie dem AIS.chat und DeepChat erhalten. Von der Materialerstellung über die Differenzierung bis zur Feedback-Automatisierung.",
    categoryId: "ki-grundlagen",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Grundlagen des Prompt Engineerings",
      "Prompts für Materialerstellung und Aufgabendesign",
      "Differenzierung und Individualisierung per Prompt",
      "Automatisiertes Feedback mit KI generieren",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn und Tim",
    featured: false,
  },

  {
    slug: "deep-dive-modul-1",
    title: "Deep Dive Modul I: Unterrichtseinheiten konzipieren mit KI Tools",
    shortDescription:
      "Unterricht mithilfe von KI konzipieren und sofort anwendbare Methoden und Materialien erhalten.",
    description:
      "Dieses Modul fokussiert auf die Konzeption von Unterricht mithilfe von KI. Teilnehmende erhalten praktische, sofort anwendbare Unterrichtsmethoden und Material. Sie lernen, wie KI-Tools den Planungsprozess unterstützen und beschleunigen können.",
    categoryId: "ki-grundlagen",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Unterrichtsplanung mit KI-Unterstützung",
      "Erstellung von Unterrichtsmaterialien mit KI",
      "Sofort anwendbare Methoden für den Schulalltag",
      "Differenzierte Aufgabenstellung mit KI",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn und Tim",
    featured: true,
    pdfUrl: "/pdfs/DeepDiveKI - Modul I.pdf",
  },
  {
    slug: "differenzierung-im-unterricht",
    title: "Differenzierung und Individualisierung: Mit KI alle Lernenden erreichen",
    shortDescription:
      "Heterogene Lerngruppen mit KI-gestützten Methoden individuell fördern und fordern.",
    description:
      "Heterogene Klassen sind die Norm. Diese Fortbildung vermittelt praxiserprobte Strategien, wie Lehrkräfte mit Hilfe von KI-Tools differenzierte Aufgaben, gestufte Hilfen und individuelle Lernwege für verschiedene Leistungsniveaus erstellen, zeitsparend und effektiv.",
    categoryId: "foerderung-inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Differenzierungsstrategien für heterogene Klassen",
      "KI-gestützte Aufgabenvarianten erstellen",
      "Gestufte Hilfen und Scaffolding mit KI",
      "Praxisübung: Differenziertes Material entwickeln",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Differenzierung.pdf",
    relatedSlugs: ["ki-und-neurodivergenz", "deep-dive-modul-4"],
  },

  {
    slug: "deep-dive-modul-2",
    title: "Deep Dive Modul II: Plagiate, Hausaufgaben und Klausuren in Zeiten von KI",
    shortDescription:
      "Praktische Methoden für Lernen, Aufgaben, Prüfungen und faire Leistungsbewertung mit KI im Unterricht.",
    description:
      "Dieses Modul vermittelt praktische Methoden für den Umgang mit KI im Unterricht und in der Leistungsbewertung. Im Fokus stehen Hausaufgaben, Klausuren, Plagiate und faire Bewertungsformen in Zeiten von KI.",
    categoryId: "pruefen-bewerten-feedback",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Plagiate erkennen in Zeiten von KI",
      "Hausaufgaben und KI: Herausforderungen und Lösungen",
      "Klausuren und Prüfungsformate neu denken",
      "Praktische Methoden für faire Leistungsbewertung",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn und Tim",
    featured: true,
    pdfUrl: "/pdfs/DeepDiveKI - Modul II.pdf",
  },
  {
    slug: "neue-pruefungsformate-ki",
    title: "Neue Prüfungsformate in Zeiten von KI",
    shortDescription:
      "Kompetenzorientierte Prüfungsformate entwickeln, die KI-Nutzung konstruktiv einbeziehen statt zu verbieten.",
    description:
      "Klassische Prüfungen stoßen in Zeiten von KI an ihre Grenzen. Diese Fortbildung zeigt, wie Lehrkräfte kompetenzorientierte Prüfungsformate entwickeln, die KI-Nutzung produktiv einbeziehen. Von mündlichen Reflexionen über Portfolioarbeit bis zu prozessbegleitenden Bewertungen.",
    categoryId: "pruefen-bewerten-feedback",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Warum klassische Prüfungen überarbeitet werden müssen",
      "Kompetenzorientierte Aufgabenformate",
      "Portfolio- und Prozessbewertung",
      "KI als Teil der Prüfung, nicht als Gegner",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Prüfungsformate.pdf",
  },
  {
    slug: "ki-gestuetztes-feedback",
    title: "KI-gestütztes Feedback: Lernstände erkennen und individuell rückmelden",
    shortDescription:
      "Automatisiertes und personalisiertes Feedback mit KI-Tools effizient in den Unterricht integrieren.",
    description:
      "Gutes Feedback ist einer der wirksamsten Faktoren für Lernfortschritt, aber auch einer der zeitaufwändigsten. Diese Fortbildung zeigt, wie Lehrkräfte KI-Tools nutzen können, um Lernstände schnell zu erfassen und individuelles, konstruktives Feedback zu generieren.",
    categoryId: "pruefen-bewerten-feedback",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Prinzipien wirksamen Feedbacks",
      "KI-Tools für automatisierte Rückmeldungen",
      "Lernstandsdiagnose mit digitalen Werkzeugen",
      "Praxisübung: Feedback-Workflows aufsetzen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
  },

  {
    slug: "deep-dive-modul-4",
    title: "Inklusion und KI",
    shortDescription:
      "KI im Kontext von Inklusion nutzen: differenzierte Lernangebote erstellen und barrierefreieren Unterricht gestalten.",
    description:
      "Dieses Modul behandelt KI im Kontext von Inklusion. Lehrkräfte lernen, differenzierte Lernangebote zu erstellen und KI für barrierefreiere Unterrichtsgestaltung zu nutzen. Praxisnahe Beispiele zeigen, wie KI individuelle Förderung unterstützen kann.",
    categoryId: "foerderung-inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte aller Fächer und Schulformen",
    topics: [
      "KI-gestützte Differenzierung im inklusiven Unterricht",
      "Barrierefreie Unterrichtsgestaltung mit KI",
      "Individuelle Förderung durch KI-Tools",
      "Praxisbeispiele für inklusiven KI-Einsatz",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Inklusion.pdf",
    relatedSlugs: ["ki-und-neurodivergenz", "differenzierung-im-unterricht"],
  },
  {
    slug: "ki-und-neurodivergenz",
    title: "KI und Neurodivergenz: Unterrichtsentlastung und Inklusion",
    shortDescription:
      "Verstehen, anpassen, entlasten: KI für neurodivergente Lernende.",
    description:
      "Dieses Modul verbindet Grundlagenwissen zu Neurodivergenz mit konkreten KI-Anwendungen für den Schulalltag. Lehrkräfte lernen, wie sich ADHS und Autismus bei Lernenden im Unterricht zeigen – und wie KI bei Differenzierung, Kommunikation und Planung gezielt entlasten kann. Praxisnahe Szenarien machen deutlich, wie individuelle Unterstützung realistisch umsetzbar wird.",
    categoryId: "foerderung-inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Einsatz von KI zur Unterstützung individueller Lernprozesse und Perspektivenvielfalt",
      "Neurodivergenz im Schulkontext verstehen: ADHS und Autismus bei Lernenden",
      "KI-gestützte Differenzierung und Unterrichtsanpassung",
      "Praxisbeispiele und Formulierungshilfen für den Schulalltag mit KI-Einsatz",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Janne",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - KI Neurodivergenz.pdf",
    relatedSlugs: ["differenzierung-im-unterricht", "deep-dive-modul-4"],
  },

  {
    slug: "deep-dive-modul-8",
    title: "Datenschutz und Sicherheit im Internet",
    shortDescription:
      "Online-Sicherheit, Fake News, Internetidentität und ethischer Umgang mit digitalen Technologien.",
    description:
      "Dieses Modul behandelt Online-Sicherheit, Fake News, Internetidentität, Cybercrime und KI-Risiken. Es diskutiert den ethischen Umgang mit digitalen Technologien und vermittelt praxisnahes Wissen zum Schutz im digitalen Raum.",
    categoryId: "fachunterricht-medien-informatik",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Online-Sicherheit und Datenschutz",
      "Fake News erkennen und einordnen",
      "Internetidentität und Cybercrime",
      "Ethischer Umgang mit KI und digitalen Technologien",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Datenschutz.pdf",
  },

  {
    slug: "deep-dive-modul-5",
    title: "KI in Ihrer Schule: Chancen für Schulleitung und Führungskräfte",
    shortDescription:
      "Effektive KI-Einsätze zur Optimierung administrativer und pädagogischer Schulprozesse.",
    description:
      "Dieses Modul zeigt Schulleitungen und Führungskräften effektive KI-Einsätze zur Optimierung administrativer und pädagogischer Schulprozesse. Von der Verwaltung bis zur strategischen Schulentwicklung erfahren Sie, wie KI Ihre Arbeit unterstützen kann.",
    categoryId: "schule-zusammenarbeit",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Schulleitung und Führungskräfte",
    topics: [
      "KI für administrative Schulprozesse",
      "Strategische Schulentwicklung mit KI",
      "Optimierung pädagogischer Prozesse",
      "KI-Implementierung an der eigenen Schule planen",
    ],
    prerequisites: "Führungserfahrung im schulischen Kontext",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Schulleitung.pdf",
  },

  {
    slug: "deep-dive-modul-6",
    title: "DDKI DeepChat: Einführung und Anwendungsbeispiele",
    shortDescription:
      "Praxisorientierte Einführung in den DDKI DeepChat mit konkreten Anwendungsbeispielen für den Unterricht.",
    description:
      "Dieses Modul bietet eine praxisorientierte Einführung in den DeepChat mit konkreten Anwendungsbeispielen für den Unterricht. Ziel ist eine effizientere und individualisierte Unterrichtsgestaltung durch den gezielten Einsatz digitaler Werkzeuge.",
    categoryId: "ki-tools-chatbots",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Einführung in den DeepChat",
      "Konkrete Anwendungsbeispiele im Unterricht",
      "Effizientere Unterrichtsgestaltung",
      "Individualisierung mit digitalen Werkzeugen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - DeepChat.pdf",
  },
  {
    slug: "KI-Chatbots-im-unterricht",
    title: "AIS.chat im Unterricht (unabhängige Fortbildung)",
    shortDescription:
      "Praxisnahe Einführung in KI-Chatbots im Unterricht am Beispiel vom AIS.chat. Eine unabhängige Fortbildung ohne Verbindung zum Anbieter.",
    description:
      "Seit Februar 2026 steht vielen Schulen in Deutschland der KI-Chatbot AIS.chat zur Verfügung. Diese Fortbildung zeigt praxisnah, wie Lehrkräfte den AIS.chat im Unterricht einsetzen. Für Materialerstellung, Textgenerierung, Bildgenerierung und individualisiertes Lernen.",
    categoryId: "ki-tools-chatbots",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "KI-Tools wie den AIS.chat einrichten und konfigurieren",
      "Text- und Bildgenerierung im Unterricht",
      "Materialerstellung mit KI-Tools wie dem AIS.chat",
      "Best Practices und Limitationen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: true,
  },
  {
    slug: "digitale-werkzeuge-fachunterricht",
    title: "Digitale Werkzeuge im Fachunterricht",
    shortDescription:
      "Die besten digitalen Tools für verschiedene Fächer kennenlernen und didaktisch sinnvoll einsetzen.",
    description:
      "Die Auswahl an digitalen Werkzeugen ist riesig, aber welche eignen sich wirklich für den Fachunterricht? Diese Fortbildung gibt einen strukturierten Überblick über bewährte Tools für verschiedene Fächer und zeigt, wie sie didaktisch sinnvoll eingesetzt werden.",
    categoryId: "fachunterricht-medien-informatik",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte einzelner Fächer und Schulformen",
    topics: [
      "Toolauswahl: Kriterien für gute digitale Werkzeuge",
      "Fachspezifische Tools im Überblick",
      "Didaktischer Mehrwert vs. Technik-Spielerei",
      "Praxisübung: Tools im eigenen Fach einsetzen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
  },
  {
    slug: "musik-trifft-mathematik",
    title: "Musik trifft Mathematik – Verschmelzung von Klang und Form",
    shortDescription:
      "Kreative Verbindungen zwischen Musik und Mathematik mit praxiserprobten Beispielen – von Notenwerten und Bruchrechnung bis zu Komposition mit ungewöhnlichen Instrumenten.",
    description:
      "Das Programm vermittelt kreative Verbindungen zwischen Musik und Mathematik anhand praxiserprobter Beispiele, die durch die Reduktion musikalischer Parameter in allen Jahrgangsstufen einsetzbar sind. Die Teilnehmenden lernen einfache Lieder mit mathematischen Texten, verbinden Bruchrechnung und Notenlängen im Klassenrap, machen Musik im Stil von Stomp mit Mathebüchern oder Linealen, erkunden akustische Eigenschaften von Schulorten in einer Klang-Raum-Performance und nutzen Stochastik sowie symmetrische Formen für kompositorische Strukturen. Optional nach Absprache: grafische Notation, Zwölftonmusik, serielle oder aleatorische Musik.",
    categoryId: "fachunterricht-medien-informatik",
    format: "Präsenz",
    duration: "3 Stunden",
    targetAudience:
      "Lehrkräfte aller Schulformen und Jahrgangsstufen",
    topics: [
      "Einfache Lieder mit mathematischen Texten",
      "Rhythmusbausteine: Bruchrechnung und Notenlängen im Klassenrap",
      "Stomp-Musik mit Mathebüchern und Linealen",
      "Klang-Raum-Performance an Schulorten",
      "Stochastik und symmetrische Formen in der Komposition",
      "Praxiserprobtes Unterrichtsmaterial für Musik, Mathematik und Naturwissenschaften",
    ],
    prerequisites:
      "Keine musikalischen oder künstlerischen Vorkenntnisse erforderlich. Mitbringen: zwei gleich große (alte) Schulbücher im Hardcover, ein hartes Plastiklineal (30 cm oder kürzer, nicht biegsam, kein Geodreieck) sowie mindestens ein Glockenspiel der Schule pro zwei Teilnehmende.",
    instructor: "Matthies",
    featured: false,
    pdfUrl: "/pdfs/Musik trifft Mathematik Workshopbeschreibung.pdf",
  },
  {
    slug: "musik-trifft-sprache",
    title: "Musik trifft Sprache – Verschmelzung von Sprachklang und Musik",
    shortDescription:
      "Kreative Verbindungen zwischen Sprache und Klängen mit Beispielen aus Literatur, Theater und Musical – Texte und Töne zu kurzen Musikstücken für Gedichte oder Geschichten verbinden.",
    description:
      "Das Programm erkundet Klänge, Stimmungen, Rhythmen und Klangfarben in Sprache und Musik. Anhand praxiserprobter Beispiele aus Literatur, Theater und Musical werden Texte mit Klängen verbunden, um kurze Musikstücke für Gedichte oder Kurzgeschichten zu entwickeln. Die Teilnehmenden nutzen die (Sprech-)Stimme als Klangquelle, präsentieren Gedichte und dramatische Texte, schreiben Raps oder Kurzgedichte mit Rhythmusbausteinen, improvisieren mit ungewöhnlichen Klangkörpern und erkunden Alltagsgeräusche aus Comics durch Hören, Zeichnen und Sprechen. Schulorte wie Treppenhäuser oder Keller werden in einer Klang-Raum-Performance auf ihre akustischen Eigenschaften hin untersucht.",
    categoryId: "fachunterricht-medien-informatik",
    format: "Präsenz",
    duration: "3 Stunden",
    targetAudience:
      "Lehrkräfte aller Schulformen und Jahrgangsstufen",
    topics: [
      "Bewusster Einsatz der eigenen (Sprech-)Stimme",
      "Lerngruppenbezogene Soundtrack-Techniken",
      "Visualisierung von Sprache und Klängen",
      "Percussion-Instrumente entdecken und ausprobieren",
      "Präsentations- und Kompositionstechniken",
      "Kurze Gruppenperformances entwickeln",
      "Praxiserprobtes Material für Musik, Deutsch, Bildende Kunst und Fremdsprachen",
    ],
    prerequisites:
      "Keine musikalischen oder künstlerischen Vorkenntnisse erforderlich",
    instructor: "Matthies",
    featured: false,
    pdfUrl: "/pdfs/Musik trifft Sprache Workshopbeschreibung.pdf",
  },

  {
    slug: "lehrergesundheit-ki-entlastung",
    title: "Lehrergesundheit: Wie KI den Arbeitsalltag entlasten kann",
    shortDescription:
      "Zeitfresser identifizieren und KI-Tools gezielt für Entlastung bei Korrektur, Planung und Verwaltung nutzen.",
    description:
      "Lehrkräfte arbeiten durchschnittlich deutlich über ihre Sollstunden. Diese Fortbildung zeigt, wie KI-Tools gezielt Zeitfresser im Arbeitsalltag reduzieren können. Von der Korrekturentlastung über automatisierte Elternkommunikation bis zur effizienteren Unterrichtsplanung.",
    categoryId: "schule-zusammenarbeit",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal",
    topics: [
      "Zeitfresser im Lehreralltag identifizieren",
      "Resilienz und Stressmanagement",
      "Automatisierte Kommunikation und Verwaltung",
      "Selbstmanagement und digitale Routinen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Lehrergesundheit.pdf",
  },
  
  {
    slug: "eltern-kollegium-multiprofessionelle-teams-ki",
    title: "Eltern, Kollegium und Multiprofessionelle Teams",
    shortDescription:
      "KI und digitale Tools nutzen, um Zusammenarbeit mit Eltern, Kollegium und multiprofessionellen Teams transparenter, strukturierter und zeitsparender zu gestalten.",
    description:
      "Diese Fortbildung zeigt Lehrkräften und Bildungspersonal, wie Künstliche Intelligenz und digitale Tools die Zusammenarbeit mit Eltern, im Kollegium und in multiprofessionellen Teams transparenter, strukturierter und zeitsparender gestalten können. Im Mittelpunkt stehen klare Absprachen, organisierte Übergaben, verlässliche Informationsflüsse sowie die gemeinsame Planung und Weiterentwicklung von Materialien. Die Teilnehmenden erproben praxisnah, wie KI bei Elternkommunikation, Dokumentation, Organisation und Teamprozessen unterstützen kann. Besonderer Wert liegt auf dem direkten Praxistransfer, der Erprobung datenschutzkonformer Tools und der unmittelbaren Anwendbarkeit im Schulalltag.",
    categoryId: "schule-zusammenarbeit",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal aller Schulformen",
    topics: [
      "Die Teilnehmer*innen erhalten einen kompakten Überblick über die Funktionsweise von KI und digitalen Tools für die Zusammenarbeit im multiprofessionellen Team.",
      "Die Teilnehmer*innen erproben im Seminar konkrete Werkzeuge, um Absprachen, Übergaben und Informationsflüsse zu organisieren.",
      "Die Teilnehmer*innen entwickeln eigene digitale Abläufe, erste gemeinsame Materialien und Vorlagen für die gemeinsame Planung.",
      "Die Teilnehmer*innen lernen, wie sie mit KI Material effizient teilen und weiterentwickeln und sich so gegenseitig entlasten.",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Multiprofessionelle Teams.pdf",
  },

  {
    slug: "lese-und-sprachfoerderung-mit-ki",
    title: "Lese- und Sprachförderung mit KI: Sprachsensibel unterrichten und Schüler*innen individuell begleiten",
    shortDescription:
      "KI-Tools zur gezielten Förderung von Lesekompetenz, Sprachbildung und individueller Unterstützung im Unterricht nutzen.",
    description:
      "Diese Fortbildung vermittelt Lehrkräften, wie Künstliche Intelligenz gezielt zur Förderung von Lesekompetenz und Sprachbildung eingesetzt werden kann. Im Mittelpunkt stehen die Erstellung sprachsensibler, differenzierter und mehrsprachiger Materialien sowie die Anpassung von Texten an unterschiedliche Sprachniveaus und Lesefähigkeiten. Die Teilnehmenden erproben praxisnah, wie sie mit KI Lesetexte vereinfachen oder anreichern, Wortschatzübungen, Verständnisfragen, Lesebegleitungen und Sprachhilfen erstellen sowie individuelle Lernwege für Schüler*innen ermöglichen können. Besonderer Wert liegt auf dem direkten Praxistransfer, der datenschutzkonformen Nutzung geeigneter Tools und der fächerübergreifenden Anwendbarkeit im Schulalltag.",
    categoryId: "foerderung-inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Bildungspersonal aller Schulformen",
    topics: [
      "Die Teilnehmer*innen erhalten einen kompakten Überblick über die Funktionsweise von KI und ihre Einsatzmöglichkeiten in der Lese- und Sprachförderung.",
      "Die Teilnehmer*innen erproben konkrete KI-Tools, um Texte sprachsensibel, niveaudifferenziert und mehrsprachig anzupassen.",
      "Die Teilnehmer*innen entwickeln eigene Lese- und Sprachfördermaterialien für den direkten Einsatz im Unterricht.",
      "Die Teilnehmer*innen reflektieren, wie KI individuelle Förderung ermöglicht und gleichzeitig bei der Materialerstellung entlasten kann.",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Sprachförderung.pdf",
  },
  {
    slug: "mathematische-basiskompetenzen-ki",
    title: "Mathematische Basiskompetenzen mit KI fördern",
    shortDescription:
      "Individuelle Diagnose und Förderung mathematischer Grundkompetenzen mit adaptiven KI-Tools.",
    description:
      "Mathematische Basiskompetenzen sind Voraussetzung für schulischen Erfolg. Diese Fortbildung zeigt, wie Lehrkräfte KI-Tools nutzen, um Lernlücken zu identifizieren, individuelle Übungsaufgaben zu generieren und mathematisches Verständnis nachhaltig aufzubauen.",
    categoryId: "foerderung-inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Mathematiklehrkräfte und Bildungspersonal",
    topics: [
      "Lernstandsdiagnose in Mathematik",
      "Adaptive Übungsaufgaben mit KI erstellen",
      "Visualisierungen und Erklärungen generieren",
      "Förderpläne für mathematische Basiskompetenzen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
    pdfUrl: "/pdfs/DeepDiveKI - Mathematik.pdf",
  },

  {
    slug: "einstieg-programmieren-ki",
    title: "Einstieg ins Programmieren: KI-gestützt Coding vermitteln",
    shortDescription:
      "Programmiergrundlagen mit KI-Unterstützung vermitteln: Von Scratch bis Python mit intelligenter Hilfe.",
    description:
      "Informatik ist Mangelfach und Programmieren zunehmend gefragt. Diese Fortbildung zeigt, wie Lehrkräfte Programmiergrundlagen mit KI-Unterstützung vermitteln können: KI als Coding-Assistent, automatische Fehleranalyse und individualisierte Lernpfade vom Block-basierten bis zum textbasierten Programmieren.",
    categoryId: "fachunterricht-medien-informatik",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Informatiklehrkräfte und Bildungspersonal",
    topics: [
      "Programmiergrundlagen mit KI vermitteln",
      "KI als Coding-Assistent im Unterricht",
      "Von Scratch zu Python: Lernpfade gestalten",
      "Automatische Fehleranalyse und Feedback",
    ],
    prerequisites: "Keine Programmierkenntnisse erforderlich",
    instructor: "Björn und Tim",
    featured: false,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(categoryId: string): Course[] {
  return courses.filter((course) => course.categoryId === categoryId);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured);
}
