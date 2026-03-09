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
};

export const courses: Course[] = [
  // ─── KI (4 bestehend + 2 neu = 6) ───
  {
    slug: "deepdiveki-keynote",
    title: "DeepDive in die Welt von KI und Bildung",
    shortDescription:
      "Vom Werkzeug zum Lernpartner – wie KI Lernen durch personalisierte Erklärungen, Feedback und Übungen unterstützen kann.",
    description:
      "Diese Keynote zeigt, wie künstliche Intelligenz Lernen durch personalisierte Erklärungen, Feedback und Übungen unterstützen kann. Der Fokus liegt auf KI als Lernpartner unter Berücksichtigung von Didaktik, Transparenz und Datenschutz. Ideal als Einstieg für Kollegien, die sich erstmals mit KI in der Bildung auseinandersetzen.",
    categoryId: "ki",
    format: "Online",
    duration: "1 Stunde",
    targetAudience: "Lehrkräfte und Schulleitung",
    topics: [
      "KI als Lernpartner im Unterricht",
      "Personalisierte Erklärungen und Feedback mit KI",
      "Didaktische Einbettung von KI-Tools",
      "Transparenz und Datenschutz",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: true,
  },
  {
    slug: "crash-kurs-ki",
    title: "Crash Kurs KI – Unterstützung zum individualisierten Unterricht",
    shortDescription:
      "Praktische KI-Werkzeuge und Unterrichtsmethoden kennenlernen und Team-Teaching-Modelle erproben.",
    description:
      "Dieser Crash Kurs vermittelt praktische KI-Werkzeuge und Unterrichtsmethoden. Teilnehmende lernen verschiedene KI-basierte Werkzeuge kennen und erproben Team-Teaching-Modelle. DeepChat steht allen Teilnehmenden datenschutzkonform und kostenlos zur Verfügung.",
    categoryId: "ki",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Überblick KI-basierter Werkzeuge für den Unterricht",
      "Team-Teaching-Modelle mit KI",
      "Individualisierter Unterricht mit KI-Unterstützung",
      "Praktische Übungen mit DeepChat",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: true,
    pdfUrl: "/pdfs/crash-kurs-ki.pdf",
  },
  {
    slug: "deep-dive-modul-3",
    title: "Deep Dive Modul III – Chancen und Risiken von KI in Schule und Gesellschaft",
    shortDescription:
      "Chancen von KI erarbeiten, sinnvolle Nutzung diskutieren und Methoden zur KI-Einführung in Schulen kennenlernen.",
    description:
      "Dieses Modul erarbeitet die Chancen von KI und deren sinnvolle Nutzung. Es vermittelt Methoden zur KI-Einführung in Schulen und beleuchtet sowohl Potenziale als auch Risiken aus schulischer und gesellschaftlicher Perspektive.",
    categoryId: "ki",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Schulleitung",
    topics: [
      "Chancen von KI in der Bildung",
      "Risiken und Herausforderungen",
      "Methoden zur KI-Einführung an Schulen",
      "Gesellschaftliche Perspektiven auf KI",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
    pdfUrl: "/pdfs/deep-dive-modul-3.pdf",
  },
  {
    slug: "deep-dive-modul-7",
    title: "Deep Dive Modul VII – KI Bots für deinen Unterricht erstellen",
    shortDescription:
      "Eigene KI-gestützte Bots entwickeln und Schritt für Schritt für den Unterricht anpassen.",
    description:
      "In diesem Modul lernen Lehrkräfte, eigene KI-gestützte Bots zu entwickeln und anzupassen. Es vermittelt Grundlagen sowie eine Schritt-für-Schritt-Anleitung zur Erstellung von Unterrichtsbots, die den individuellen Bedürfnissen der Lernenden gerecht werden.",
    categoryId: "ki",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte mit Interesse an aktiver KI-Gestaltung",
    topics: [
      "Grundlagen der Bot-Erstellung",
      "Schritt-für-Schritt-Anleitung für Unterrichtsbots",
      "Anpassung an individuelle Unterrichtsbedürfnisse",
      "Praxisübung: Eigenen Bot erstellen",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: true,
    pdfUrl: "/pdfs/deep-dive-modul-7.pdf",
  },
  {
    slug: "ki-grundkompetenzen-eu-ai-act",
    title: "KI-Grundkompetenzen für Lehrkräfte – EU AI Act verstehen und umsetzen",
    shortDescription:
      "Was der EU AI Act für Lehrkräfte bedeutet und wie Sie die geforderten KI-Kompetenzen praxisnah aufbauen.",
    description:
      "Der EU AI Act verpflichtet alle Landesbediensteten – einschließlich Lehrkräfte – zu grundlegenden KI-Kompetenzen. Diese Fortbildung vermittelt niedrigschwellig, was Lehrkräfte wissen müssen: Wie funktioniert KI? Welche Pflichten ergeben sich aus der Regulierung? Und wie setzen Sie KI-Tools verantwortungsvoll im Schulalltag ein?",
    categoryId: "ki",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte aller Fächer und Schulformen",
    topics: [
      "Grundlagen: Was ist KI und wie funktioniert sie?",
      "EU AI Act – Pflichten für den Bildungsbereich",
      "Risikoklassifizierung von KI-Systemen",
      "Verantwortungsvoller KI-Einsatz im Schulalltag",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: true,
  },
  {
    slug: "prompt-engineering-fuer-lehrkraefte",
    title: "Prompt Engineering für Lehrkräfte – KI gezielt und effektiv nutzen",
    shortDescription:
      "Lernen Sie, KI-Chatbots wie telli und DeepChat durch präzise Prompts optimal für Ihren Unterricht einzusetzen.",
    description:
      "Prompt Engineering ist die Schlüsselkompetenz für den effektiven Einsatz von KI im Unterricht. In dieser Fortbildung lernen Lehrkräfte, wie sie durch gezielte Eingaben bessere Ergebnisse aus KI-Chatbots wie telli und DeepChat erhalten – von der Materialerstellung über die Differenzierung bis zur Feedback-Automatisierung.",
    categoryId: "ki",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Grundlagen des Prompt Engineerings",
      "Prompts für Materialerstellung und Aufgabendesign",
      "Differenzierung und Individualisierung per Prompt",
      "Automatisiertes Feedback mit KI generieren",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Didaktik (1 bestehend + 2 neu = 3) ───
  {
    slug: "deep-dive-modul-1",
    title: "Deep Dive Modul I – Unterrichtseinheiten konzipieren mit KI Tools",
    shortDescription:
      "Unterricht mithilfe von KI konzipieren und sofort anwendbare Methoden und Materialien erhalten.",
    description:
      "Dieses Modul fokussiert auf die Konzeption von Unterricht mithilfe von KI. Teilnehmende erhalten praktische, sofort anwendbare Unterrichtsmethoden und Material. Sie lernen, wie KI-Tools den Planungsprozess unterstützen und beschleunigen können.",
    categoryId: "didaktik",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Unterrichtsplanung mit KI-Unterstützung",
      "Erstellung von Unterrichtsmaterialien mit KI",
      "Sofort anwendbare Methoden für den Schulalltag",
      "Differenzierte Aufgabenstellung mit KI",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: true,
    pdfUrl: "/pdfs/deep-dive-modul-1.pdf",
  },
  {
    slug: "blended-learning-mit-ki",
    title: "Blended Learning mit KI – Präsenz- und Digitalunterricht verzahnen",
    shortDescription:
      "Digitale und analoge Lernphasen didaktisch sinnvoll kombinieren und mit KI-Tools anreichern.",
    description:
      "Blended Learning ist seit der Pandemie fester Bestandteil des Schulalltags. Diese Fortbildung zeigt, wie Lehrkräfte Präsenz- und Online-Phasen didaktisch sinnvoll miteinander verzahnen und dabei KI-Tools für individualisierte Lernpfade, automatisiertes Feedback und adaptive Übungen einsetzen können.",
    categoryId: "didaktik",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Grundlagen des Blended Learning",
      "Didaktische Modelle für hybrides Lernen",
      "KI-gestützte Lernpfade gestalten",
      "Praxisbeispiele aus dem Schulalltag",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "differenzierung-im-unterricht",
    title: "Differenzierung im Unterricht – Mit KI alle Lernenden erreichen",
    shortDescription:
      "Heterogene Lerngruppen mit KI-gestützten Methoden individuell fördern und fordern.",
    description:
      "Heterogene Klassen sind die Norm. Diese Fortbildung vermittelt praxiserprobte Strategien, wie Lehrkräfte mit Hilfe von KI-Tools differenzierte Aufgaben, gestufte Hilfen und individuelle Lernwege für verschiedene Leistungsniveaus erstellen – zeitsparend und effektiv.",
    categoryId: "didaktik",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Differenzierungsstrategien für heterogene Klassen",
      "KI-gestützte Aufgabenvarianten erstellen",
      "Gestufte Hilfen und Scaffolding mit KI",
      "Praxisübung: Differenziertes Material entwickeln",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Leistung (1 bestehend + 2 neu = 3) ───
  {
    slug: "deep-dive-modul-2",
    title: "Deep Dive Modul II – Plagiate, Hausaufgaben und Klausuren in Zeiten von KI",
    shortDescription:
      "KI-gestütztes Lernen und Lösungsverfahren sowie praktische Methoden zum Umgang mit KI bei Leistungsbewertung.",
    description:
      "Dieses Modul behandelt KI-gestütztes Lernen und Lösungsverfahren. Es vermittelt praktische Methoden zum Umgang mit KI im Unterricht und schafft Awareness für den KI-Einsatz bei Leistungsbewertung. Wie gehen wir mit Hausaufgaben, Klausuren und Plagiaten in Zeiten von KI um?",
    categoryId: "leistung",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Plagiate erkennen in Zeiten von KI",
      "Hausaufgaben und KI – Herausforderungen und Lösungen",
      "Klausuren und Prüfungsformate neu denken",
      "Praktische Methoden für faire Leistungsbewertung",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: true,
    pdfUrl: "/pdfs/deep-dive-modul-2.pdf",
  },
  {
    slug: "neue-pruefungsformate-ki",
    title: "Neue Prüfungsformate in Zeiten von KI",
    shortDescription:
      "Kompetenzorientierte Prüfungsformate entwickeln, die KI-Nutzung konstruktiv einbeziehen statt zu verbieten.",
    description:
      "Klassische Prüfungen stoßen in Zeiten von KI an ihre Grenzen. Diese Fortbildung zeigt, wie Lehrkräfte kompetenzorientierte Prüfungsformate entwickeln, die KI-Nutzung produktiv einbeziehen – von mündlichen Reflexionen über Portfolioarbeit bis zu prozessbegleitenden Bewertungen.",
    categoryId: "leistung",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Warum klassische Prüfungen überarbeitet werden müssen",
      "Kompetenzorientierte Aufgabenformate",
      "Portfolio- und Prozessbewertung",
      "KI als Teil der Prüfung – nicht als Gegner",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "ki-gestuetztes-feedback",
    title: "KI-gestütztes Feedback – Lernstände erkennen und individuell rückmelden",
    shortDescription:
      "Automatisiertes und personalisiertes Feedback mit KI-Tools effizient in den Unterricht integrieren.",
    description:
      "Gutes Feedback ist einer der wirksamsten Faktoren für Lernfortschritt – aber auch einer der zeitaufwändigsten. Diese Fortbildung zeigt, wie Lehrkräfte KI-Tools nutzen können, um Lernstände schnell zu erfassen und individuelles, konstruktives Feedback zu generieren.",
    categoryId: "leistung",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Prinzipien wirksamen Feedbacks",
      "KI-Tools für automatisierte Rückmeldungen",
      "Lernstandsdiagnose mit digitalen Werkzeugen",
      "Praxisübung: Feedback-Workflows aufsetzen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Inklusion (1 bestehend + 2 neu = 3) ───
  {
    slug: "deep-dive-modul-4",
    title: "Deep Dive Modul IV – Inklusion und KI",
    shortDescription:
      "KI im Kontext von Inklusion nutzen – differenzierte Lernangebote erstellen und barrierefreieren Unterricht gestalten.",
    description:
      "Dieses Modul behandelt KI im Kontext von Inklusion. Lehrkräfte lernen, differenzierte Lernangebote zu erstellen und KI für barrierefreiere Unterrichtsgestaltung zu nutzen. Praxisnahe Beispiele zeigen, wie KI individuelle Förderung unterstützen kann.",
    categoryId: "inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte im inklusiven Unterricht",
    topics: [
      "KI-gestützte Differenzierung im inklusiven Unterricht",
      "Barrierefreie Unterrichtsgestaltung mit KI",
      "Individuelle Förderung durch KI-Tools",
      "Praxisbeispiele für inklusiven KI-Einsatz",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
    pdfUrl: "/pdfs/deep-dive-modul-4.pdf",
  },
  {
    slug: "sprachfoerderung-daz-mit-ki",
    title: "Sprachförderung und DaZ mit KI – Sprachsensiblen Unterricht digital gestalten",
    shortDescription:
      "KI-Tools für differenzierte Sprachförderung und Deutsch als Zweitsprache im Fachunterricht nutzen.",
    description:
      "Sprachbildung ist Aufgabe aller Lehrkräfte in allen Fächern. Diese Fortbildung zeigt, wie KI-Tools die Sprachförderung unterstützen: von automatischer Textanpassung an verschiedene Sprachniveaus über die Erstellung von DaZ-Materialien bis hin zu individuellen Wortschatz-Übungen.",
    categoryId: "inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte aller Fächer, DaZ-Lehrkräfte",
    topics: [
      "Sprachsensiblen Unterricht mit KI unterstützen",
      "Texte automatisch an Sprachniveaus anpassen",
      "DaZ-Materialien mit KI erstellen",
      "Individualisierte Wortschatz- und Grammatikübungen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "individuelle-lernwege-ki",
    title: "Individuelle Lernwege mit KI – Fördern und Fordern in heterogenen Klassen",
    shortDescription:
      "Adaptive Lernmaterialien und individuelle Förderpläne mit KI für Schüler:innen mit unterschiedlichem Unterstützungsbedarf.",
    description:
      "In inklusiven Klassen treffen sehr unterschiedliche Lernvoraussetzungen aufeinander. Diese Fortbildung vermittelt, wie Lehrkräfte mit KI individuelle Lernwege gestalten – von der Diagnostik über die Materialerstellung bis zur Dokumentation von Lernfortschritten.",
    categoryId: "inklusion",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, Sonderpädagog:innen",
    topics: [
      "Lernausgangslagen mit digitalen Tools erfassen",
      "Adaptive Materialien mit KI generieren",
      "Förderpläne KI-gestützt erstellen und anpassen",
      "Lernfortschritte dokumentieren und visualisieren",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Medienkompetenz (1 bestehend + 2 neu = 3) ───
  {
    slug: "deep-dive-modul-8",
    title: "Deep Dive Modul VIII – Datenschutz und Sicherheit im Internet",
    shortDescription:
      "Online-Sicherheit, Fake News, Internetidentität und ethischer Umgang mit digitalen Technologien.",
    description:
      "Dieses Modul behandelt Online-Sicherheit, Fake News, Internetidentität, Cybercrime und KI-Risiken. Es diskutiert den ethischen Umgang mit digitalen Technologien und vermittelt praxisnahes Wissen zum Schutz im digitalen Raum.",
    categoryId: "medienkompetenz",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Online-Sicherheit und Datenschutz",
      "Fake News erkennen und einordnen",
      "Internetidentität und Cybercrime",
      "Ethischer Umgang mit KI und digitalen Technologien",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
    pdfUrl: "/pdfs/deep-dive-modul-8.pdf",
  },
  {
    slug: "deepfakes-desinformation-unterricht",
    title: "Deepfakes & Desinformation – Medienkritik im Zeitalter von KI unterrichten",
    shortDescription:
      "Schüler:innen befähigen, KI-generierte Inhalte zu erkennen, einzuordnen und kritisch zu bewerten.",
    description:
      "KI-generierte Bilder, Videos und Texte sind allgegenwärtig. Diese Fortbildung vermittelt Lehrkräften Methoden, um Medienkritik im KI-Zeitalter zu unterrichten – von der Erkennung von Deepfakes über Fact-Checking-Strategien bis zu Unterrichtseinheiten, die kritisches Denken fördern.",
    categoryId: "medienkompetenz",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Deepfakes erkennen und einordnen",
      "KI-generierte Texte identifizieren",
      "Fact-Checking-Methoden für den Unterricht",
      "Unterrichtseinheiten zur Medienkritik gestalten",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "dsgvo-konformer-ki-einsatz",
    title: "DSGVO-konformer KI-Einsatz in der Schule – Datenschutz praktisch umsetzen",
    shortDescription:
      "Datenschutzkonform mit KI-Tools arbeiten: DSGVO-Grundlagen, telli, DeepChat und Einwilligungsmanagement.",
    description:
      "Datenschutz ist die größte Hürde beim KI-Einsatz in Schulen. Diese Fortbildung vermittelt praxisnah, welche KI-Tools DSGVO-konform nutzbar sind, wie personenbezogene Daten geschützt werden und wie Lehrkräfte den datenschutzkonformen Einsatz von telli und DeepChat im Unterricht umsetzen.",
    categoryId: "medienkompetenz",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, Datenschutzbeauftragte",
    topics: [
      "DSGVO-Grundlagen für den KI-Einsatz",
      "Datenschutzkonforme Tools: telli, DeepChat & Co.",
      "Umgang mit personenbezogenen Daten und KI",
      "Einwilligungsmanagement und Dokumentation",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Schulentwicklung (1 bestehend + 2 neu = 3) ───
  {
    slug: "deep-dive-modul-5",
    title: "Deep Dive Modul V – KI in deiner Schule: Chancen für Schulleitung und Führungskräfte",
    shortDescription:
      "Effektive KI-Einsätze zur Optimierung administrativer und pädagogischer Schulprozesse.",
    description:
      "Dieses Modul zeigt Schulleitungen und Führungskräften effektive KI-Einsätze zur Optimierung administrativer und pädagogischer Schulprozesse. Von der Verwaltung bis zur strategischen Schulentwicklung – erfahren Sie, wie KI Ihre Arbeit unterstützen kann.",
    categoryId: "schulentwicklung",
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
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
    pdfUrl: "/pdfs/deep-dive-modul-5.pdf",
  },
  {
    slug: "medienbildungskonzept-mit-ki",
    title: "Medienbildungskonzept mit KI – Schulentwicklung strategisch gestalten",
    shortDescription:
      "Ein zukunftsfähiges Medienbildungskonzept entwickeln, das KI-Kompetenzen systematisch verankert.",
    description:
      "Schulen müssen Medienbildungskonzepte entwickeln – eine Voraussetzung für DigitalPakt-Förderung. Diese Fortbildung unterstützt Schulleitungen dabei, KI-Kompetenzen im Rahmen der Ziellinie 2030 systematisch im schulischen Medienbildungskonzept zu verankern.",
    categoryId: "schulentwicklung",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Schulleitung, Medienbeauftragte",
    topics: [
      "Orientierungsrahmen Medienbildung und Ziellinie 2030",
      "KI-Kompetenzraster in der Schulentwicklung",
      "Medienbildungskonzept Schritt für Schritt erstellen",
      "DigitalPakt-Förderung und Dokumentation",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "change-management-ki-schule",
    title: "Change Management – KI erfolgreich im Kollegium einführen",
    shortDescription:
      "Widerstände abbauen, Multiplikatoren gewinnen und KI-Nutzung nachhaltig im Kollegium verankern.",
    description:
      "Die Einführung von KI in der Schule ist ein Veränderungsprozess. Diese Fortbildung richtet sich an Schulleitungen und zeigt erprobte Strategien für Change Management: Wie gewinne ich das Kollegium? Wie baue ich Widerstände ab? Wie schaffe ich nachhaltige Strukturen für KI-Nutzung?",
    categoryId: "schulentwicklung",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Schulleitung und Führungskräfte",
    topics: [
      "Change Management im schulischen Kontext",
      "Multiplikator:innen-Konzepte aufbauen",
      "Widerstände verstehen und konstruktiv begegnen",
      "Nachhaltige KI-Strukturen verankern",
    ],
    prerequisites: "Führungserfahrung im schulischen Kontext",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Digitale Tools (1 bestehend + 2 neu = 3) ───
  {
    slug: "deep-dive-modul-6",
    title: "Deep Dive Modul VI – DDKI Toolbox: Einführung und Anwendungsbeispiele",
    shortDescription:
      "Praxisorientierte Einführung in die DDKI Toolbox mit konkreten Anwendungsbeispielen für den Unterricht.",
    description:
      "Dieses Modul bietet eine praxisorientierte Einführung in die DDKI Toolbox mit konkreten Anwendungsbeispielen für den Unterricht. Ziel ist eine effizientere und individualisierte Unterrichtsgestaltung durch den gezielten Einsatz digitaler Werkzeuge.",
    categoryId: "digitale-tools",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Einführung in die DDKI Toolbox",
      "Konkrete Anwendungsbeispiele im Unterricht",
      "Effizientere Unterrichtsgestaltung",
      "Individualisierung mit digitalen Werkzeugen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
    pdfUrl: "/pdfs/deep-dive-modul-6.pdf",
  },
  {
    slug: "telli-im-unterricht",
    title: "telli im Unterricht – Den KI-Chatbot der Bildungscloud effektiv einsetzen",
    shortDescription:
      "Praxisnahe Einführung in telli: den DSGVO-konformen KI-Chatbot, der allen niedersächsischen Schulen zur Verfügung steht.",
    description:
      "Seit Februar 2026 steht allen niedersächsischen Schulen der KI-Chatbot telli über die Bildungscloud zur Verfügung. Diese Fortbildung zeigt praxisnah, wie Lehrkräfte telli im Unterricht einsetzen – für Materialerstellung, Textgenerierung, Bildgenerierung und individualisiertes Lernen.",
    categoryId: "digitale-tools",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte in Niedersachsen",
    topics: [
      "telli einrichten und konfigurieren",
      "Text- und Bildgenerierung im Unterricht",
      "Materialerstellung mit telli",
      "Best Practices und Limitationen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: true,
  },
  {
    slug: "digitale-werkzeuge-fachunterricht",
    title: "Digitale Werkzeuge im Fachunterricht – Von der App zum didaktischen Mehrwert",
    shortDescription:
      "Die besten digitalen Tools für verschiedene Fächer kennenlernen und didaktisch sinnvoll einsetzen.",
    description:
      "Die Auswahl an digitalen Werkzeugen ist riesig – aber welche eignen sich wirklich für den Fachunterricht? Diese Fortbildung gibt einen strukturierten Überblick über bewährte Tools für verschiedene Fächer und zeigt, wie sie didaktisch sinnvoll eingesetzt werden.",
    categoryId: "digitale-tools",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte aller Fächer",
    topics: [
      "Toolauswahl: Kriterien für gute digitale Werkzeuge",
      "Fachspezifische Tools im Überblick",
      "Didaktischer Mehrwert vs. Technik-Spielerei",
      "Praxisübung: Tools im eigenen Fach einsetzen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Gesundheit & Professionalisierung (3 neu) ───
  {
    slug: "lehrergesundheit-ki-entlastung",
    title: "Lehrergesundheit – Wie KI den Arbeitsalltag entlasten kann",
    shortDescription:
      "Zeitfresser identifizieren und KI-Tools gezielt für Entlastung bei Korrektur, Planung und Verwaltung nutzen.",
    description:
      "Lehrkräfte arbeiten durchschnittlich deutlich über ihre Sollstunden. Diese Fortbildung zeigt, wie KI-Tools gezielt Zeitfresser im Arbeitsalltag reduzieren können – von der Korrekturentlastung über automatisierte Elternkommunikation bis zur effizienteren Unterrichtsplanung.",
    categoryId: "gesundheit",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte",
    topics: [
      "Zeitfresser im Lehreralltag identifizieren",
      "KI-gestützte Korrekturentlastung",
      "Automatisierte Kommunikation und Verwaltung",
      "Selbstmanagement und digitale Routinen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "resilienz-und-stressmanagement",
    title: "Resilienz und Stressmanagement für Lehrkräfte",
    shortDescription:
      "Strategien für psychische Gesundheit im Schulalltag entwickeln und Belastungen präventiv begegnen.",
    description:
      "Der Lehrerberuf gehört zu den belastendsten Berufen. Diese Fortbildung vermittelt wissenschaftlich fundierte Strategien zur Stressbewältigung und Resilienzförderung – von Achtsamkeitstechniken über kollegiale Fallberatung bis hin zu digitalen Unterstützungsangeboten.",
    categoryId: "gesundheit",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte und Schulleitung",
    topics: [
      "Stressoren im Schulalltag erkennen",
      "Resilienzfaktoren stärken",
      "Achtsamkeit und Selbstfürsorge im Berufsalltag",
      "Kollegiale Unterstützungsstrukturen aufbauen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "stark-starten-berufseinstieg",
    title: "Stark Starten – Erfolgreich in den Lehrerberuf mit digitalen Kompetenzen",
    shortDescription:
      "Berufseinsteiger:innen beim Aufbau digitaler und KI-gestützter Routinen für den Unterrichtsalltag begleiten.",
    description:
      "Der Berufseinstieg ist eine kritische Phase. Diese Fortbildung unterstützt Berufseinsteiger:innen dabei, von Anfang an effiziente digitale Routinen aufzubauen – von der Unterrichtsplanung mit KI über Klassenmanagement-Tools bis zur professionellen Selbstorganisation.",
    categoryId: "gesundheit",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Berufseinsteigende Lehrkräfte, Referendar:innen",
    topics: [
      "Digitale Routinen von Anfang an aufbauen",
      "KI-Tools für effiziente Unterrichtsplanung",
      "Klassenmanagement mit digitalen Werkzeugen",
      "Professionelle Selbstorganisation und Work-Life-Balance",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Team- und Beziehungsarbeit (3 neu) ───
  {
    slug: "multiprofessionelle-teams",
    title: "Multiprofessionelle Teams im Ganztag – Zusammenarbeit digital gestalten",
    shortDescription:
      "Lehrkräfte, Erzieher:innen und Sozialpädagog:innen vernetzen und die Zusammenarbeit mit digitalen Tools stärken.",
    description:
      "Der Rechtsanspruch auf Ganztagsbetreuung ab 2026 erfordert neue Formen der Zusammenarbeit. Diese Fortbildung zeigt, wie multiprofessionelle Teams digitale Tools für Kommunikation, Dokumentation und gemeinsame Planung nutzen können.",
    categoryId: "team",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, Erzieher:innen, Sozialpädagog:innen",
    topics: [
      "Multiprofessionelle Zusammenarbeit im Ganztag",
      "Digitale Kommunikationstools für Teams",
      "Gemeinsame Dokumentation und Planung",
      "Rollen und Verantwortlichkeiten klären",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "kollegiale-zusammenarbeit-ki",
    title: "Kollegiale Zusammenarbeit mit KI – Gemeinsam Material entwickeln und teilen",
    shortDescription:
      "KI als Werkzeug für kollaborative Materialentwicklung nutzen und Sharing-Strukturen im Kollegium aufbauen.",
    description:
      "Guter Unterricht entsteht oft im Team. Diese Fortbildung zeigt, wie Fachschaften und Kollegien KI-Tools nutzen können, um gemeinsam Materialien zu entwickeln, Best Practices zu teilen und eine schulweite Wissensbasis aufzubauen.",
    categoryId: "team",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, Fachschaftsleitungen",
    topics: [
      "Kollaborative Materialentwicklung mit KI",
      "Sharing-Strukturen im Kollegium aufbauen",
      "Fachschaftsarbeit digital organisieren",
      "Gemeinsame Prompt-Bibliotheken erstellen",
    ],
    prerequisites: "Grundlegende KI-Kenntnisse empfohlen",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "elternkommunikation-digital",
    title: "Elternkommunikation digital – Transparente Zusammenarbeit mit KI-Unterstützung",
    shortDescription:
      "Professionelle Elternkommunikation mit digitalen Tools und KI-gestützten Textvorlagen effizient gestalten.",
    description:
      "Elternkommunikation ist zeitaufwändig und anspruchsvoll. Diese Fortbildung zeigt, wie Lehrkräfte mit digitalen Tools und KI-Unterstützung Elternbriefe, Gesprächsprotokolle und Informationsschreiben professionell und zeitsparend erstellen können.",
    categoryId: "team",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, Klassenleitungen",
    topics: [
      "Professionelle Elternbriefe mit KI-Unterstützung",
      "Gesprächsprotokolle effizient erstellen",
      "Mehrsprachige Kommunikation mit Übersetzungs-KI",
      "Digitale Plattformen für die Elternarbeit",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Schülerinnenwelten & Gesellschaft (3 neu) ───
  {
    slug: "demokratiebildung-ki",
    title: "Demokratiebildung und KI – Mündige Bürger:innen im digitalen Zeitalter",
    shortDescription:
      "Demokratische Kompetenzen im Kontext von KI und Digitalisierung fördern und kritisches Denken stärken.",
    description:
      "KI verändert unsere Demokratie – von Filterblasen über Deepfakes bis zu algorithmischer Meinungsbildung. Diese Fortbildung verbindet Demokratiebildung mit Medien- und KI-Kompetenz und zeigt, wie Lehrkräfte Schüler:innen zu mündigen digitalen Bürger:innen erziehen.",
    categoryId: "schuelerwelten",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, insb. Politik, Gesellschaft, Ethik",
    topics: [
      "Algorithmische Meinungsbildung verstehen",
      "Filterblasen und Echokammern im Unterricht thematisieren",
      "Demokratische Partizipation im digitalen Raum",
      "Unterrichtseinheiten zur digitalen Demokratiebildung",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "ki-ethik-im-unterricht",
    title: "KI-Ethik im Unterricht – Philosophische und gesellschaftliche Perspektiven",
    shortDescription:
      "Ethische Fragen rund um KI im Unterricht thematisieren und Schüler:innen zum kritischen Nachdenken anregen.",
    description:
      "Darf eine KI über Schulnoten entscheiden? Wer ist verantwortlich, wenn ein Algorithmus diskriminiert? Diese Fortbildung liefert Lehrkräften Unterrichtsmaterial und Methoden, um ethische Fragen rund um KI altersgerecht mit Schüler:innen zu diskutieren.",
    categoryId: "schuelerwelten",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, insb. Ethik, Religion, Philosophie",
    topics: [
      "Ethische Grundfragen zu KI",
      "Bias und Diskriminierung in Algorithmen",
      "Verantwortung und Transparenz bei KI-Entscheidungen",
      "Unterrichtsmethoden für ethische Diskussionen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "klimabildung-data-literacy",
    title: "Klimabildung und Data Literacy – Mit Daten und KI Umweltthemen verstehen",
    shortDescription:
      "Klimadaten analysieren, visualisieren und im Unterricht nutzen – unterstützt durch KI und digitale Tools.",
    description:
      "Klimabildung braucht Datenkompetenz. Diese Fortbildung zeigt, wie Lehrkräfte Klimadaten mit KI-Tools analysieren, visualisieren und im Unterricht einsetzen können – fächerübergreifend von Geographie über Naturwissenschaften bis Politik.",
    categoryId: "schuelerwelten",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, insb. MINT, Geographie, Politik",
    topics: [
      "Klimadaten finden und aufbereiten",
      "Datenvisualisierung mit digitalen Tools",
      "KI-gestützte Analyse von Umweltdaten",
      "Fächerübergreifende Unterrichtsprojekte",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Startchancen (3 neu) ───
  {
    slug: "lesefoerderung-ki",
    title: "Leseförderung mit KI – Lesekompetenz gezielt stärken",
    shortDescription:
      "KI-gestützte Methoden zur Diagnose und Förderung der Lesekompetenz auf verschiedenen Niveaustufen.",
    description:
      "Im Rahmen des Startchancen-Programms ist Leseförderung eine zentrale Säule. Diese Fortbildung zeigt, wie Lehrkräfte KI-Tools nutzen können, um Lesekompetenz zu diagnostizieren, individualisierte Lesetexte zu generieren und Lesemotivation gezielt zu fördern.",
    categoryId: "startchancen",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, insb. Grundschule und Sek I",
    topics: [
      "Lesekompetenz mit digitalen Tools diagnostizieren",
      "Lesetexte KI-gestützt an Niveaustufen anpassen",
      "Lesemotivation mit personalisierten Inhalten fördern",
      "Integration in den Fachunterricht",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "mathematische-basiskompetenzen-ki",
    title: "Mathematische Basiskompetenzen mit KI fördern",
    shortDescription:
      "Individuelle Diagnose und Förderung mathematischer Grundkompetenzen mit adaptiven KI-Tools.",
    description:
      "Mathematische Basiskompetenzen sind Voraussetzung für schulischen Erfolg. Diese Fortbildung zeigt, wie Lehrkräfte KI-Tools nutzen, um Lernlücken zu identifizieren, individuelle Übungsaufgaben zu generieren und mathematisches Verständnis nachhaltig aufzubauen.",
    categoryId: "startchancen",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, insb. Mathematik",
    topics: [
      "Lernstandsdiagnose in Mathematik",
      "Adaptive Übungsaufgaben mit KI erstellen",
      "Visualisierungen und Erklärungen generieren",
      "Förderpläne für mathematische Basiskompetenzen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "chancengerechtigkeit-digitale-bildung",
    title: "Chancengerechtigkeit durch digitale Bildung – Benachteiligung abbauen mit KI",
    shortDescription:
      "Wie digitale Tools und KI gezielt Bildungsbenachteiligung reduzieren und individuelle Potenziale fördern können.",
    description:
      "Das Startchancen-Programm erreicht rund 400 Schulen mit 122.000 Schüler:innen. Diese Fortbildung zeigt, wie digitale Bildung und KI gezielt eingesetzt werden können, um Bildungsbenachteiligung abzubauen – von sprachlicher Förderung bis zur individuellen Lernbegleitung.",
    categoryId: "startchancen",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte an Startchancen-Schulen",
    topics: [
      "Bildungsbenachteiligung erkennen und verstehen",
      "Digitale Tools für individuelle Förderung",
      "KI-gestützte Lernbegleitung",
      "Best Practices aus dem Startchancen-Programm",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },

  // ─── Programmieren & Informatik (3 neu) ───
  {
    slug: "einstieg-programmieren-ki",
    title: "Einstieg ins Programmieren – KI-gestützt Coding vermitteln",
    shortDescription:
      "Programmiergrundlagen mit KI-Unterstützung vermitteln: Von Scratch bis Python mit intelligenter Hilfe.",
    description:
      "Informatik ist Mangelfach – und Programmieren zunehmend gefragt. Diese Fortbildung zeigt, wie Lehrkräfte Programmiergrundlagen mit KI-Unterstützung vermitteln können: KI als Coding-Assistent, automatische Fehleranalyse und individualisierte Lernpfade vom Block-basierten bis zum textbasierten Programmieren.",
    categoryId: "programmieren",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte, insb. Informatik und MINT",
    topics: [
      "Programmiergrundlagen mit KI vermitteln",
      "KI als Coding-Assistent im Unterricht",
      "Von Scratch zu Python – Lernpfade gestalten",
      "Automatische Fehleranalyse und Feedback",
    ],
    prerequisites: "Keine Programmierkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "data-literacy-schule",
    title: "Data Literacy in der Schule – Datenkompetenz fächerübergreifend aufbauen",
    shortDescription:
      "Schüler:innen den kompetenten Umgang mit Daten vermitteln – von der Erhebung über die Analyse bis zur Visualisierung.",
    description:
      "Datenkompetenz ist eine Schlüsselqualifikation des 21. Jahrhunderts. Diese Fortbildung vermittelt Lehrkräften, wie sie Data Literacy fächerübergreifend in den Unterricht integrieren – von der Datenerhebung über die Analyse mit KI-Tools bis zur kritischen Interpretation.",
    categoryId: "programmieren",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte aller Fächer",
    topics: [
      "Was ist Data Literacy und warum ist sie wichtig?",
      "Daten erheben, analysieren und visualisieren",
      "KI-Tools für die Datenanalyse",
      "Fächerübergreifende Unterrichtsbeispiele",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
    featured: false,
  },
  {
    slug: "algorithmisches-denken",
    title: "Algorithmisches Denken – Problemlösen mit und ohne Computer",
    shortDescription:
      "Computational Thinking als Grundkompetenz vermitteln und algorithmische Denkweisen im Unterricht fördern.",
    description:
      "Algorithmisches Denken ist mehr als Programmieren – es ist eine Problemlösekompetenz. Diese Fortbildung zeigt, wie Lehrkräfte Computational Thinking in verschiedenen Fächern fördern können, von unplugged-Aktivitäten bis zu KI-gestützten Programmierumgebungen.",
    categoryId: "programmieren",
    format: "Online",
    duration: "3 Stunden",
    targetAudience: "Lehrkräfte aller Fächer",
    topics: [
      "Computational Thinking als Grundkompetenz",
      "Unplugged-Aktivitäten für algorithmisches Denken",
      "Algorithmische Problemlösung in verschiedenen Fächern",
      "KI-gestützte Programmierumgebungen nutzen",
    ],
    prerequisites: "Keine Vorkenntnisse erforderlich",
    instructor: "Björn Isenbiel und Tim Philipp",
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
