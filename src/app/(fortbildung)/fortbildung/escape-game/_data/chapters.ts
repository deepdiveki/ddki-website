import type { JumpRunChapterId, JumpRunChapterConfig } from "../_lib/types";

export const JUMP_RUN_CHAPTERS: Record<JumpRunChapterId, JumpRunChapterConfig> = {
  /* ════════════════════════════════════════════════════════════
     ÜBER KI — Fragen referenzieren:
       • Quick-Draw-Experiment (Mustererkennung vs. Verstehen)
       • AI Fluency Framework (4Ds)
       • Stochastischer Papagei (Bender et al.)
       • Spezielle KI (ANI) vs. Generelle KI (AGI)
       • Black-Box-Perspektive & BNE-Matrix
     ════════════════════════════════════════════════════════════ */
  ueber: {
    id: "ueber",
    title: "Lernen über KI",
    mission:
      "In dieser Welt fehlt das Systemverständnis. Rekonstruiert, wie KI funktioniert, wo sie irrt und welche Verantwortung daraus folgt.",
    leitfragen: [
      "Wie entscheidet KI und woran erkennt man Muster?",
      "Wo liegt die Grenze zwischen Sprachmuster und Verstehen?",
      "Wie entstehen Bias, Halluzination und Manipulation?",
      "Welche pädagogische Konsequenz muss verbindlich sein?",
    ],
    stations: [
      {
        id: "daten-depot",
        mapLabel: "Quick-Draw",
        title: "Level 1: Mustererkennung (Quick Draw)",
        learning:
          "Im Tutorial habt ihr Quick-Draw ausprobiert: KI klassifiziert eure Zeichnungen anhand statistischer Muster aus Millionen Trainingsdaten — nicht durch Verstehen des Gezeichneten. Das zeigt: KI erkennt Wahrscheinlichkeiten, keine Bedeutung.",
        question: "Im Quick-Draw-Experiment erkennt die KI eure Zeichnungen. Was genau passiert dabei?",
        options: [
          { id: "muster", label: "Die KI vergleicht Strichmuster mit Millionen Trainingszeichnungen und berechnet Wahrscheinlichkeiten.", correct: true },
          { id: "mensch", label: "Die KI versteht den dargestellten Gegenstand und erkennt seine Funktion.", correct: false },
          { id: "regel", label: "Die KI folgt vorprogrammierten Wenn-Dann-Regeln für jede Objektkategorie.", correct: false },
        ],
        reward: "Muster-Log",
      },
      {
        id: "prompt-parkour",
        mapLabel: "Papagei",
        title: "Level 2: Stochastischer Papagei",
        learning:
          "Im Tutorial habt ihr gelernt: LLMs wie ChatGPT sagen das nächste wahrscheinliche Token vorher — Wort für Wort. Bender et al. nennen das den 'stochastischen Papagei'. Die Ausgabe klingt überzeugend, basiert aber auf statistischer Wahrscheinlichkeit, nicht auf Weltverstehen.",
        question: "Was bedeutet die Metapher des 'stochastischen Papageis' für Sprachmodelle?",
        options: [
          { id: "token", label: "Sie erzeugen statistisch wahrscheinliche Wortfolgen, ohne die Bedeutung zu verstehen.", correct: true },
          { id: "kopie", label: "Sie kopieren exakte Sätze aus dem Internet und geben sie wörtlich wieder.", correct: false },
          { id: "logik", label: "Sie folgen logischen Schlussregeln wie ein mathematischer Beweis.", correct: false },
        ],
        reward: "Papagei-Kompass",
      },
      {
        id: "modell-motor",
        mapLabel: "Bias-Lab",
        title: "Level 3: Bias und Halluzination",
        learning:
          "Im Tutorial habt ihr die vier Ds des AI Fluency Framework kennengelernt: Discernment (Urteilsfähigkeit) verlangt, KI-Ausgaben kritisch zu prüfen. Bias entsteht durch verzerrte Trainingsdaten, Halluzination durch plausibel klingende Falschaussagen — beides erfordert menschliche Prüfung.",
        question: "Welches 'D' aus dem AI Fluency Framework beschreibt die Fähigkeit, KI-Ausgaben auf Bias und Halluzination kritisch zu prüfen?",
        options: [
          { id: "discernment", label: "Discernment — die kritische Urteilsfähigkeit gegenüber KI-Ergebnissen.", correct: true },
          { id: "delegation", label: "Delegation — die Fähigkeit, Aufgaben effizient an KI abzugeben.", correct: false },
          { id: "description", label: "Description — die Fähigkeit, Prompts klar zu formulieren.", correct: false },
        ],
        reward: "Bias-Detektor",
      },
      {
        id: "ethik-endboss",
        mapLabel: "BNE-Matrix",
        title: "Level 4: KI, BNE und Gesellschaft",
        learning:
          "Die Black-Box-Perspektive aus dem Tutorial verbindet vier Ebenen: Wie KI technisch funktioniert (Funktionsprinzip), wo ihre erkenntnistheoretischen Grenzen liegen, welche gesellschaftliche Wirkung sie entfaltet und welche pädagogische Konsequenz daraus verbindlich folgt.",
        question: "Welche vier Ebenen umfasst die Black-Box-Perspektive, die ihr im Tutorial erarbeitet habt?",
        options: [
          {
            id: "matrix",
            label: "Funktionsprinzip, erkenntnistheoretische Grenze, gesellschaftliche Wirkung, pädagogische Konsequenz.",
            correct: true,
          },
          { id: "technik", label: "Hardware, Software, Datenbank, Benutzeroberfläche.", correct: false },
          { id: "didaktik", label: "Input, Verarbeitung, Output, Evaluation.", correct: false },
        ],
        reward: "Black-Box-Siegel",
      },
    ],
    dangers: [
      { id: "bias-banane", title: "Bias-Banane", description: "Rutschig: schiefe Datensätze verzerren das Ergebnis.", tip: "Tipp: Prüfe Perspektiven, Datenlücken und Gegenbeispiele — das ist Discernment aus dem AI Fluency Framework." },
      { id: "halluzinations-hologramm", title: "Halluzinations-Hologramm", description: "Klingt präzise, aber ohne belastbare Quelle.", tip: "Tipp: Der 'stochastische Papagei' erzeugt plausible Sätze, keine Fakten. Immer Quellen prüfen." },
      { id: "prompt-piranhas", title: "Papagei-Piranhas", description: "Produzieren Sprachmuster, aber kein echtes Verstehen.", tip: "Tipp: Denke an Quick-Draw — KI erkennt Muster, keine Bedeutung. Formuliere präzise und prüfe kritisch." },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     MIT KI — Fragen referenzieren:
       • Ko-Kreation vs. Delegation (Digitaler Würfel)
       • Prompt-Iteration & Dokumentation (Logbuch)
       • Anne-Frank-Comic (ethische Grenzen generativer KI)
       • Chain-of-Thought & Few-Shot Prompting
       • EU AI Act (Bildung = Hochrisiko)
       • NotebookLM Wissensverdichtung
       • 3-Satz-Governance-Statement
     ════════════════════════════════════════════════════════════ */
  mit: {
    id: "mit",
    title: "Lernen mit KI",
    mission:
      "In dieser Dimension geht es um Kooperation statt Delegation. Testet KI als Partner und formuliert klare Transparenz- und Governance-Regeln.",
    leitfragen: [
      "Wo entsteht Erkenntnis in der Kooperation Mensch-KI?",
      "Wo kippt Kooperation in blinde Delegation?",
      "Wie macht ihr Prompt-Iterationen transparent?",
      "Welche verbindliche 3-Satz-Empfehlung braucht das LI?",
    ],
    stations: [
      {
        id: "daten-depot",
        mapLabel: "Würfel",
        title: "Level 1: Digitaler Würfel",
        learning:
          "Im Tutorial habt ihr beim Würfel-Experiment gelernt: Ko-Kreation bedeutet iteratives Verbessern mit bewusster Steuerung. Delegation wäre, den KI-Output ungeprüft zu übernehmen. Die meisten Teams brauchten 3–7 Iterationen — das zeigt: Qualität entsteht im Prozess, nicht im ersten Prompt.",
        question: "Im Würfel-Experiment brauchten die meisten Teams 3–7 Iterationen. Was genau unterscheidet Ko-Kreation von Delegation?",
        options: [
          { id: "prozess", label: "Bei Ko-Kreation bewertet der Mensch jeden KI-Output, gibt Feedback und iteriert bewusst.", correct: true },
          { id: "einmal", label: "Bei Ko-Kreation reicht ein einziger perfekter Prompt.", correct: false },
          { id: "auto", label: "Bei Ko-Kreation überlässt man der KI die Qualitätskontrolle.", correct: false },
        ],
        reward: "Würfel-Protokoll",
      },
      {
        id: "prompt-parkour",
        mapLabel: "Transfer",
        title: "Level 2: Generative Transformation",
        learning:
          "Im Tutorial habt ihr den Anne-Frank-Comic erstellt und reflektiert: Eure Eigenleistung liegt in Szenenauswahl, Dramaturgie und Prompt-Gestaltung. Die ethische Kernfrage lautet: Dürft ihr mit KI die Gedanken einer realen Person visualisieren, die im Holocaust ermordet wurde? Diese Reflexion ist der Kern, nicht der Output.",
        question: "Beim Anne-Frank-Comic im Tutorial: Wo liegt eure Eigenleistung, und welche ethische Grenze wurde thematisiert?",
        options: [
          { id: "eigen", label: "Eigenleistung liegt in Szenenauswahl und Dramaturgie. Ethische Grenze: Visualisierung realer Opfer des Holocaust.", correct: true },
          { id: "tool", label: "Die KI hat alles gemacht. Ethische Fragen spielen bei Bildgenerierung keine Rolle.", correct: false },
          { id: "wow", label: "Eigenleistung ist irrelevant. Entscheidend ist nur die visuelle Qualität des Comics.", correct: false },
        ],
        reward: "Transformations-Karte",
      },
      {
        id: "modell-motor",
        mapLabel: "Podcast",
        title: "Level 3: Wissensverdichtung",
        learning:
          "Im Tutorial habt ihr mit NotebookLM einen Podcast aus einem Sachtext generiert. Die Lektion: 'Klingt gut' ist nicht gleich 'inhaltlich korrekt'. Jede KI-gestützte Verdichtung verliert Information — die Frage ist, ob dabei Gegenargumente verschluckt oder Unsicherheiten zu Gewissheiten werden.",
        question: "Im NotebookLM-Experiment habt ihr gelernt: Was ist das größte Risiko bei KI-gestützter Wissensverdichtung?",
        options: [
          { id: "verkuerzung", label: "Systemische Verkürzungen — Gegenargumente werden verschluckt, Unsicherheiten zu Gewissheiten.", correct: true },
          { id: "tempo", label: "Der Podcast dauert zu lange.", correct: false },
          { id: "stimme", label: "Die KI-Stimme klingt nicht natürlich genug.", correct: false },
        ],
        reward: "Verdichtungs-Siegel",
      },
      {
        id: "ethik-endboss",
        mapLabel: "Governance",
        title: "Level 4: Governance-Ebene",
        learning:
          "Im Tutorial habt ihr gelernt: Der EU AI Act stuft Bildung als Hochrisiko-Bereich ein. Seit Februar 2025 müssen Schulen KI-Literacy-Schulungen sicherstellen. Euer 3-Satz-Governance-Statement lautet: 'Lernen mit KI ist professionell, wenn … / Problematisch wird es, wenn … / Deshalb beschließen wir …'",
        question: "Wie stuft der EU AI Act den Bildungsbereich ein — und was folgt daraus laut eurem Tutorial?",
        options: [
          { id: "hochrisiko", label: "Hochrisiko-Bereich: Strenge Transparenz- und Aufsichtspflichten, KI-Literacy-Schulungen für Personal seit 2025.", correct: true },
          { id: "niedrig", label: "Niedrigrisiko-Bereich: Keine besonderen Auflagen für Schulen.", correct: false },
          { id: "verbot", label: "Verbotener Bereich: KI darf in Schulen grundsätzlich nicht eingesetzt werden.", correct: false },
        ],
        reward: "Governance-Siegel",
      },
    ],
    dangers: [
      { id: "bias-banane", title: "Delegations-Banane", description: "Ihr rutscht aus, wenn KI ungeprüft ganze Entscheidungen übernimmt.", tip: "Tipp: Denke an den Würfel — Ko-Kreation braucht Iteration, Kontrolle und Dokumentation." },
      { id: "halluzinations-hologramm", title: "Tool-Glitzer", description: "Beeindruckender Output verdeckt fehlende Dokumentation.", tip: "Tipp: Erinnere dich an NotebookLM — 'klingt gut' ist nicht gleich 'inhaltlich korrekt'." },
      { id: "prompt-piranhas", title: "Prompt-Piranhas", description: "Unklare Prompts zerpflücken Ziele und Rollen.", tip: "Tipp: Nutze Chain-of-Thought ('Schritt für Schritt denken') und Few-Shot-Beispiele aus dem Tutorial." },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     DURCH KI — Fragen referenzieren:
       • Hattie & Timperley (Feed Up/Back/Forward + 4 Ebenen)
       • PEER KI-Tutor (TU München)
       • Blooms 2-Sigma-Problem
       • Westermann Smart Response (adaptive Systeme)
       • Mega-Prompt-Tutor (Rolle, Feedbackmodus, Adaptation)
       • 2x2-Steuerungsmatrix
       • Formatives vs. summatives Feedback
     ════════════════════════════════════════════════════════════ */
  durch: {
    id: "durch",
    title: "Lernen durch KI",
    mission:
      "Hier wird KI selbst zum lernsteuernden Akteur. Analysiert Feedbacksysteme, adaptive Logik und menschliche Steuerungsverantwortung.",
    leitfragen: [
      "Wie spezifisch und adaptiv ist KI-Feedback wirklich?",
      "Wer definiert Lernziele und misst Fortschritt?",
      "Wo übernimmt KI Struktur statt Lernende zu aktivieren?",
      "Welche Steuerungsmatrix braucht verbindliche Regeln?",
    ],
    stations: [
      {
        id: "daten-depot",
        mapLabel: "Feedback",
        title: "Level 1: KI-Feedback erleben",
        learning:
          "Im Tutorial habt ihr den PEER KI-Tutor der TU München getestet und Feedback nach Hattie & Timperley analysiert: Feed Up (Wo will ich hin?), Feed Back (Wo stehe ich?), Feed Forward (Was ist der nächste Schritt?). Zusätzlich gibt es vier Ebenen — wobei die Selbstebene ('Du bist toll!') am wenigsten lernwirksam ist.",
        question: "Welche Feedback-Ebene nach Hattie & Timperley ist laut eurem Tutorial am WENIGSTEN lernwirksam — und warum erzeugen KI-Systeme sie besonders häufig?",
        options: [
          { id: "selbst", label: "Die Selbstebene ('Du bist ein kluger Schüler!') — KI neigt zu unspezifischem Lob, das keine aufgabenbezogene Info enthält.", correct: true },
          { id: "aufgabe", label: "Die Aufgabenebene — weil konkrete Korrekturen zu direkt sind.", correct: false },
          { id: "prozess", label: "Die Prozessebene — weil Strategiehinweise zu komplex für KI sind.", correct: false },
        ],
        reward: "Feedback-Lupe",
      },
      {
        id: "prompt-parkour",
        mapLabel: "Adaptiv",
        title: "Level 2: Adaptives Lernsystem",
        learning:
          "Im Tutorial habt ihr Westermann Smart Response analysiert. Die zentrale Erkenntnis: Ein Schüler, der aus Unkonzentriertheit falsch antwortet, braucht keine leichteren Aufgaben — er braucht eine Pause. Aber der Algorithmus kennt nur die Tatsache des Fehlers, nicht den Grund. Wer die Steuerungslogik nicht kennt, delegiert die Definition von Lernerfolg.",
        question: "Beim Analysieren von Westermann Smart Response im Tutorial: Warum ist es problematisch, wenn Lehrkräfte die Steuerungslogik eines adaptiven Systems nicht kennen?",
        options: [
          { id: "diagnose", label: "Weil sie dann die Definition von Lernerfolg an den Algorithmus delegieren, ohne dessen Diagnoselogik beurteilen zu können.", correct: true },
          { id: "design", label: "Weil sie dann die Farben und Icons des Interfaces nicht bewerten können.", correct: false },
          { id: "kosten", label: "Weil sie dann nicht wissen, wie viel die Lizenz kostet.", correct: false },
        ],
        reward: "System-Scanner",
      },
      {
        id: "modell-motor",
        mapLabel: "Tutor",
        title: "Level 3: Tutor durch Mega-Prompt",
        learning:
          "Im Tutorial habt ihr einen eigenen KI-Tutor gebaut und dabei drei Steuerungsentscheidungen getroffen: Rolle (sokratisch, erklärend, coachend), Feedbackmodus (sofort/auf Aufforderung, kriterial/ermutigend) und Schwierigkeitsanpassung. Die Erkenntnis: In kommerziellen KI-Tutoring-Systemen trifft ein Algorithmus genau diese Entscheidungen — aber intransparent.",
        question: "Bloom zeigte 1984, dass 1:1-Tutoring massive Leistungsgewinne bringt. Was sagt euer Tutorial über den Stand von KI-Tutoring?",
        options: [
          { id: "sigma", label: "KI-Tutoren erreichen 0,73–1,3 Sigma — vielversprechend, aber unter Blooms 2-Sigma von menschlichem 1:1-Tutoring.", correct: true },
          { id: "besser", label: "KI-Tutoren übertreffen menschliche Tutoren bereits in allen Studien.", correct: false },
          { id: "null", label: "KI-Tutoren zeigen in Studien keinen messbaren Lerneffekt.", correct: false },
        ],
        reward: "Tutor-Blueprint",
      },
      {
        id: "ethik-endboss",
        mapLabel: "Steuerung",
        title: "Level 4: Steuerungsmatrix",
        learning:
          "Im Tutorial habt ihr eine 2×2-Matrix erstellt: Horizontale Achse = menschliche Steuerung (niedrig bis hoch), vertikale Achse = algorithmische Steuerung (niedrig bis hoch). Ihr habt PEER KI-Tutor, Westermann Smart Response und euren Mega-Prompt-Tutor darin eingeordnet.",
        question: "In der 2×2-Steuerungsmatrix aus eurem Tutorial: Was beschreibt der Quadrant 'hohe algorithmische Steuerung, niedrige menschliche Steuerung'?",
        options: [
          { id: "autonom", label: "KI steuert den Lernprozess weitgehend autonom — z.B. ein vollautomatisches adaptives System ohne Lehrkraft-Eingriff.", correct: true },
          { id: "kooperation", label: "Mensch und KI steuern gemeinsam — die Lehrkraft definiert Ziele und prüft KI-Empfehlungen.", correct: false },
          { id: "klassisch", label: "Klassischer Unterricht mit gelegentlichem KI-Feedback.", correct: false },
        ],
        reward: "Steuerungs-Siegel",
      },
    ],
    dangers: [
      { id: "bias-banane", title: "Autopilot-Banane", description: "Systeme wirken adaptiv, bleiben aber in festen Diagnosemustern stecken.", tip: "Tipp: Erinnere dich an Westermann — der Algorithmus kennt den Fehler, nicht den Grund. Frage nach Diagnoselogik." },
      { id: "halluzinations-hologramm", title: "Feedback-Fata-Morgana", description: "Klingt differenziert, bleibt aber generisch.", tip: "Tipp: Prüfe mit Hattie & Timperley: Feed Up, Feed Back, Feed Forward — sind alle drei beantwortet?" },
      { id: "prompt-piranhas", title: "Tutor-Piranhas", description: "Unklare Rollen im Prompt fressen die didaktische Steuerung auf.", tip: "Tipp: Definiere im Mega-Prompt Rolle, Rubrik und Abbruchkriterien — wie im Tutorial gelernt." },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     TROTZ KI — vorübergehend deaktiviert
     ════════════════════════════════════════════════════════════ */
  // trotz: {
  //   id: "trotz",
  //   title: "Lernen trotz KI",
  //   mission:
  //     "In der Welt der perfekten Entwürfe planen Menschen nicht mehr selbst. Baut eine professionelle Warum-Begründung gegen blinde Delegation.",
  //   leitfragen: [
  //     "Wo fehlt Urteilskraft im KI-Entwurf?",
  //     "Wo verschwindet Verantwortung?",
  //     "Welche normativen Leerstellen bleiben unsichtbar?",
  //     "Welche 3-Satz-Position ist für das LI verbindlich?",
  //   ],
  //   stations: [
  //     {
  //       id: "daten-depot",
  //       mapLabel: "Diagnose",
  //       title: "Level 1: Diagnose KI-Entwurf",
  //       learning:
  //         "Im Tutorial habt ihr einen KI-generierten Unterrichtsentwurf mit dem 3-Ebenen-Analyseraster geprüft: Oberfläche (Struktur, Sprache, Formalia), Tiefenstruktur (Lernlogik, Antizipation von Schülerdenken, Ziel-Aufgaben-Kohärenz) und Situationsspezifik (Lerngruppe, Zeitplanung, Kontext). Die Tiefenstruktur ist die Ebene, wo die meisten KI-Schwächen sichtbar werden.",
  //       question: "Im 3-Ebenen-Analyseraster aus eurem Tutorial: Auf welcher Ebene zeigen KI-generierte Entwürfe die meisten Schwächen — und warum?",
  //       options: [
  //         { id: "tiefe", label: "Tiefenstruktur — weil KI keine echten Schüler kennt und keine Lernlogik begründen kann, sondern nur Muster reproduziert.", correct: true },
  //         { id: "oberflaeche", label: "Oberfläche — weil KI keine korrekte Gliederung erstellen kann.", correct: false },
  //         { id: "form", label: "Formale Stimmigkeit — weil KI bei Zeitangaben systematisch versagt.", correct: false },
  //       ],
  //       reward: "Diagnose-Raster",
  //     },
  //     {
  //       id: "prompt-parkour",
  //       mapLabel: "Failure",
  //       title: "Level 2: Failure-Modes bündeln",
  //       learning:
  //         "Im Tutorial habt ihr fünf typische Failure-Modes identifiziert: (1) Generisches Didaktisieren, (2) Pseudobegründungen ('fördert Schüleraktivierung' ohne zu erklären warum), (3) Fehlende Antizipation von Schülerfehlern, (4) Prüfungslogische Unschärfe und (5) Normative Blindstellen.",
  //       question: "Einer der fünf Failure-Modes heißt 'Pseudobegründungen'. Was genau ist damit gemeint?",
  //       options: [
  //         { id: "pseudo", label: "Sätze wie 'fördert Schüleraktivierung' klingen professionell, erklären aber nicht warum die Methode hier zur Klasse und zum Ziel passt.", correct: true },
  //         { id: "kurz", label: "Der Entwurf ist zu kurz und enthält zu wenig Text.", correct: false },
  //         { id: "format", label: "Der Entwurf verwendet das falsche Dokumentenformat.", correct: false },
  //       ],
  //       reward: "Failure-Matrix",
  //     },
  //     {
  //       id: "modell-motor",
  //       mapLabel: "Leitfragen",
  //       title: "Level 3: Leitfragen & Prüfungsvalidität",
  //       learning:
  //         "Im Tutorial habt ihr gelernt: OpenAI hat seinen eigenen KI-Detektor eingestellt — er erkannte nur 26% der KI-Texte und markierte 9% menschlicher Texte fälschlicherweise als KI. Eine Stanford-Studie zeigte: 97% der TOEFL-Aufsätze nicht-muttersprachlicher Schreibender wurden falsch markiert. Joscha Falcks Modell unterscheidet fünf Dimensionen: Prüfen OHNE, TROTZ, ÜBER, MIT und DURCH KI.",
  //       question: "Warum sind KI-Erkennungstools laut eurem Tutorial als alleiniges Prüfungsinstrument ungeeignet?",
  //       options: [
  //         { id: "unzuverlaessig", label: "OpenAIs Detektor erkannte nur 26% der KI-Texte und diskriminiert systematisch nicht-muttersprachliche Schreibende (Stanford: 97% falsch markiert).", correct: true },
  //         { id: "teuer", label: "Sie sind zu teuer für den Schulbetrieb.", correct: false },
  //         { id: "langsam", label: "Die Analyse dauert zu lange für den Schulalltag.", correct: false },
  //       ],
  //       reward: "Leitfragen-Set",
  //     },
  //     {
  //       id: "ethik-endboss",
  //       mapLabel: "Warum",
  //       title: "Level 4: Professionelle Warum-Begründung",
  //       learning:
  //         "Im Tutorial habt ihr die dreifache Warum-Begründung formuliert: (1) Professionalisierungsargument — eigenes Planen baut Urteilskraft auf. (2) Erkenntnisargument — der Wert liegt im Denkprozess, nicht im Produkt. (3) Prüfungsargument — Prüfungen müssen Eigenleistung nachweisen, nicht KI-Leistungsfähigkeit.",
  //       question: "Eure dreifache Warum-Begründung aus dem Tutorial: Welches Argument erklärt, warum der Denkprozess beim Planen nicht delegiert werden kann?",
  //       options: [
  //         { id: "erkenntnis", label: "Das Erkenntnisargument: Beim Schreiben durchdringt die Lehrkraft den Lerngegenstand und antizipiert Schülerdenken — diese kognitive Arbeit IST der Lerneffekt.", correct: true },
  //         { id: "zeit", label: "Das Zeitargument: Eigenes Planen dauert zwar länger, sieht aber besser aus.", correct: false },
  //         { id: "tradition", label: "Das Traditionsargument: Lehrkräfte haben das schon immer so gemacht.", correct: false },
  //       ],
  //       reward: "Warum-Siegel",
  //     },
  //   ],
  //   dangers: [
  //     { id: "bias-banane", title: "Delegations-Banane", description: "Wenn KI den Entwurf liefert, rutscht Verantwortung weg.", tip: "Tipp: Erinnere dich an das Erkenntnisargument — der Denkprozess beim Planen IST die Kompetenzentwicklung." },
  //     { id: "halluzinations-hologramm", title: "Perfekt-Entwurf-Hologramm", description: "Formal stark, didaktisch dünn.", tip: "Tipp: Nutze das 3-Ebenen-Raster: Oberfläche, Tiefenstruktur, Situationsspezifik — und prüfe die Kohärenz." },
  //     { id: "prompt-piranhas", title: "Normen-Piranhas", description: "Normative Fragen verschwinden hinter glatten Formulierungen.", tip: "Tipp: Denke an die 5 Failure-Modes — Pseudobegründungen und normative Blindstellen gezielt aufdecken." },
  //   ],
  // },
};
