export const s6Scripts: Record<string, string> = {
  "s6-1": `**[0:00]** Willkommen zu Modul IV. Die Sektion mit dem **größten Levelup**. Bisher KI als Werkzeug, jetzt **eigene Assistenten** bauen — maßgeschneidert.

**[0:35]** **Prompt vs. Assistent.** Prompt = einmalige Eingabe, beim nächsten Mal neu. Assistent = konfiguriertes System mit drei Vorteilen:
1. **Wiederverwendbarkeit** — einmal bauen, hundertmal nutzen
2. **Spezialisierung** — auf konkrete Aufgabe zugeschnitten, kennt Anforderungen, antwortet im richtigen Stil
3. **Teilbarkeit** — Link an Kolleg:innen weitergeben, gleiche Funktion ohne Setup

[CUT TO: Talking Head]

**[1:20]** **Konkretes Beispiel — "Feedback-Bot Aufsatz".** Schüleressay rein, strukturierte Erstanalyse nach meinen Bewertungskriterien raus. Aufwand Bau: 2 Std einmalig. Ersparnis pro Aufsatz: 10 Min. Bei 100 Aufsätzen/Halbjahr: **1000 Min gespart minus 2 Std Bau = 13 Std Lebenszeit**.

**[2:00]** **Was wir in den nächsten drei Stunden machen:**
1. **Grundlagen** — wie funktionieren Assistenten? Bausteine?
2. **Drei Plattformen** — Custom GPTs (ChatGPT), Claude Projects, Gemini Gems
3. **Fünf Beispiel-Assistenten** zum Mitnehmen
4. **Workflows und Best Practices**
5. **Kritische Reflexion** — Ethik, Risiken, Ausblick

**[2:50]** **Voraussetzungen:** mindestens **ein kostenpflichtiger KI-Account**. Custom GPTs und Claude Projects nur in Plus/Pro. Gemini Gems oft in kostenlosem Google-Account. ~20 €/Monat. Plan ~60–120 Min Bau-Zeit pro Assistent.

**[3:35]** Take-away: **Assistenten sind wiederverwendbare, spezialisierte, teilbare KI-Konfigurationen. Modul IV ist die Investition mit der höchsten Zeit-Rendite.**

[END 5:00]`,

  "s6-2": `**[0:00]** Jeder Assistent — egal welche Plattform — besteht aus denselben **vier Bausteinen**.

**[0:35]** **Baustein 1 — System-Prompt (Instructions).** Rolle und Persönlichkeit. Was tun, wie reden, was nicht.
> *"Du bist eine Feedback-Hilfe für Geschichtslehrkräfte. Du analysierst Schüleressays anhand vorgegebener Kriterien. Du gibst keine Noten. Du formulierst freundlich, präzise, mit konkreten Verbesserungsvorschlägen."*

Die Seele des Assistenten.

**[1:25]** **Baustein 2 — Knowledge (Wissensbasis).** Dokumente, auf die der Assistent zugreift:
- Dein Bewertungs-Raster als PDF
- Lehrwerk-Auszüge
- Operatoren-Liste für Klausuren
- Eigene Stoffsammlung zu einer UE

**Wichtig:** Knowledge ≠ trainieren. KI lernt dauerhaft nichts dazu. Sie **schaut beim Antworten auf die Dokumente**.

**[2:15]** **Baustein 3 — Tools (Aktionen).** Manche können mehr als reden:
- Web-Suche
- Code ausführen
- Bilder generieren
- Externe APIs
- Dateien lesen

Custom GPTs am meisten Optionen, Claude etwas weniger, Gemini im Standard begrenzter.

**[3:00]** **Baustein 4 — Memory (Gedächtnis).** Manche merken sich Infos aus früheren Gesprächen. **Vorsicht — datenschutzrechtlich sensibel.** Niemals persönliche SuS-Daten in Memory.

[CUT TO: Talking Head]

**[3:45]** **Workflow bei Anfrage:**
1. System-Prompt aktiviert Rolle/Verhalten
2. Wissensbasis durchsuchen
3. Tools nutzen wenn nötig
4. Memory berücksichtigen
5. Antwort generieren, geformt durch alle vier Bausteine

**[4:30]** Mit diesem mentalen Modell hast du **80 %** des Wissens. Rest = Bedienung der Plattform.

**[4:55]** Take-away: **Vier Bausteine — System-Prompt, Knowledge, Tools, Memory. Auf jeder Plattform dieselben.**

[END 6:00]`,

  "s6-3": `**[0:00]** Wir bauen **deinen ersten Custom GPT**. Plus-Account nötig. Mit Free: zuschauen, später nachholen.

**[0:30]** **Schritt 1 — GPT erstellen.** Linkes Menu "GPTs" → oben rechts "Erstellen" → **GPT-Builder**.

**[0:50]** Zwei Spalten: links Chat mit Builder (KI hilft beim Bauen), rechts Vorschau. Tab **"Konfigurieren"** für manuelle Kontrolle empfohlen.

**[1:25]** **Schritt 2 — Grunddaten:**
- **Name** — kurz, prägnant, beschreibend. Beispiel: **"Geschichts-Sparring"**
- **Beschreibung** — Ein-Satz-Beschreiber: "Ein Sparringspartner für die Konzeption von Geschichts-Unterrichtseinheiten."
- **Profilbild** — auto-generierbar

**[2:10]** **Schritt 3 — Conversation Starters.** Drei vorgeschlagene Einstiegsfragen:
- "Hilf mir, eine UE zu strukturieren."
- "Welche Methoden passen zum Thema X?"
- "Erstelle mir ein MC-Quiz zu Thema Y."

**[2:50]** **Schritt 4 — Instructions (System-Prompt).**
> *"Du bist eine erfahrene Geschichtslehrkraft, die anderen Lehrkräften bei der UE-Konzeption hilft. Du fragst nach Klassenstufe, Schwerpunkt, Stundenzahl, bevor du Vorschläge machst. Du gibst Optionen, nicht fertige Lösungen. Du arbeitest nach dem 6-Bausteine-Prompt-Schema. Du nennst niemals Quellen, die du nicht verifizieren kannst."*

**[3:35]** **Schritt 5 — Knowledge hochladen.** Z.B. Hamburger Bildungsplan Geschichte + Operatoren-Liste als PDFs.

**[4:05]** **Schritt 6 — Capabilities:**
- **Web Browsing** — Live-Recherche → aktivieren
- **DALL-E** — Bilder → aktivieren
- **Code Interpreter** — Datenanalyse → optional

**[4:35]** **Schritt 7 — Speichern.** Drei Sharing-Optionen: **Nur ich** / **Über Link teilbar** / **Öffentlich im GPT Store**. Anfangs "Nur ich" oder "Link teilbar".

[CUT TO: Talking Head]

**[5:10]** **Schritt 8 — Testen.** Iteratives Testen ist normal. Mein erster Custom GPT brauchte ~10 Iterationen.

**[5:45]** **Drei häufige Anfänger-Fehler:**
1. **Zu viel auf einmal.** GPT für "alles" = GPT für nichts. **Ein Use-Case.**
2. **Instructions zu kurz.** "Du bist eine Lehrkraft" reicht nicht. Rolle/Aufgaben/Tonalität/Don'ts nötig.
3. **Knowledge ungelesen.** Selbst in PDFs reinschauen. Tabellen/komplexe Layouts oft problematisch.

**[6:25]** Take-away: **Sieben Schritte, ~15 Min beim ersten Mal. Name, Beschreibung, Starter, Instructions, Knowledge, Capabilities, Speichern. Dann testen und iterieren.**

[END 7:00]`,

  "s6-4": `**[0:00]** Instructions sind das, was deinen GPT von normalem ChatGPT unterscheidet. **Bewährtes Sechs-Block-Schema:**

**[0:35]** **Block 1 — Rolle.**
> *"Du bist eine erfahrene Geschichtslehrkraft an einem deutschen Gymnasium mit 15 Jahren Berufserfahrung. Du hast Schwerpunkt Sek II, kennst aktuelle Bildungspläne und arbeitest didaktisch reflektiert."*

Je präziser, desto besser. "KI-Assistent" = generisch. "Erfahrene Geschichtslehrkraft Sek II Hamburg" = spezifisch.

**[1:25]** **Block 2 — Aufgabe.**
> *"Deine Aufgabe ist es, anderen Lehrkräften bei der Konzeption von Unterrichtseinheiten zu helfen. Du analysierst ihre Anforderungen, schlägst Strukturen vor, gibst methodische Optionen, hilfst bei der Differenzierung."*

**[2:00]** **Block 3 — Vorgehensweise.**
> *"Du arbeitest immer in drei Schritten. Erstens: Du klärst durch Rückfragen die Eckdaten (Klassenstufe, Stundenzahl, Schwerpunkt, Lerngruppe). Zweitens: Du machst drei bis fünf konkrete Vorschläge. Drittens: Wenn der User wählt, gehst du in Detail."*

**[2:50]** **Block 4 — Format und Stil.**
> *"Du antwortest in kurzen Absätzen, nicht in langen Texten. Du verwendest Aufzählungen für Optionen. Du nutzt keine Marketing-Sprache, sondern fach-präzises Lehrer-Deutsch. Du sprichst die User per 'Sie' an, mit kollegialer Wärme."*

**[3:25]** **Block 5 — Quellen und Wissensbasis.**
> *"Du beziehst dich primär auf die hochgeladenen Lehrplan-Dokumente. Du nennst Quellen nur, wenn du sie aus dem Material zitieren kannst. Wenn du etwas nicht aus dem Material weißt: 'Das ist mein Allgemeinwissen, prüfe es bitte selbst.'"*

Schützt vor Halluzinationen.

**[4:05]** **Block 6 — Don'ts.**
> *"Du gibst niemals fertige Klausuren — nur Strukturen. Du nennst keine echten Schüler:innen-Beispiele. Du verlässt nie die Lehrkraft-Rolle. Du gibst keine Noten und keine politischen Empfehlungen."*

[CUT TO: Talking Head]

**[4:45]** **Vier Tipps zur Formulierung:**
1. **Aktiv statt passiv.** "Du analysierst" > "Die Analyse wird durchgeführt".
2. **Konkret statt vage.** "In drei Schritten" > "schrittweise".
3. **Mit Beispielen arbeiten.** Antwortbeispiel mitgeben.
4. **Test-driven.** Fünf typische Anfragen testen, anpassen.

**[5:30]** **Länge:** 300–800 Wörter. Kürzer = vage. Länger = verliert sich. Im Texteditor außerhalb des Builders schreiben — bessere Iteration.

**[5:55]** **Iterations-Schritte:** Erst-Version → 5 Test-Fragen → Output bewerten → Anpassen → Wieder testen. 3–5 Iterationen normal, bei besten Assistenten 10.

**[6:30]** Take-away: **Instructions in sechs Blöcken — Rolle, Aufgabe, Vorgehen, Stil, Quellen, Don'ts. 300–800 Wörter. Iterativ verfeinern.**

[END 7:00]`,

  "s6-5": `**[0:00]** Knowledge-Files machen deinen Assistenten **wirklich smart** — eigene Dokumente statt nur Welt-Wissen. Aber tückisch.

**[0:35]** Bis 20 Dateien pro GPT, je 512 MB. **Mein Rat: 3–5 Dateien pro Assistent.**

**[1:15]** **Formate:**
- **Sehr gut** — Plain Text (.txt), Markdown (.md), saubere PDFs mit echtem Text
- **Mittel** — Word und PowerPoint (Tabellen/Layouts können verloren gehen)
- **Schwierig** — gescannte PDFs ohne OCR
- **Geht nicht** — Bilder allein

[CUT TO: Talking Head]

**[2:05]** **Drei Praxis-Regeln:**
1. **Sauber strukturiert.** Überschriften, Absätze, Listen.
2. **Vorne wichtig.** KI schaut nicht immer alles durch.
3. **Aktuell halten.** Veraltete PDFs ersetzen.

**[3:00]** **Demo:** Frage an GPT mit Knowledge — *"Welche Themen kommen im Hamburger Bildungsplan Geschichte Studienstufe Klasse 12 vor?"*

**[3:30]** GPT antwortet mit **Quellen-Markierung** beim Zitieren aus dem PDF — du siehst, wo das Wissen herkommt.

**[3:50]** **Wann Knowledge ja:** spezifisches Wissen + eigene Materialien + Dokumente nach KI-Stichtag.
**Wann Knowledge nein:** allgemeines Schulwissen + täglich änderndes Wissen + sehr große Mengen (lieber NotebookLM).

**[4:35]** **Datenschutz-Hinweis.** Inhalte landen auf OpenAI-Servern. Keine personenbezogenen SuS-Daten, keine vertraulichen Schulkonzepte. **Eigene Materialien okay.**

**[5:15]** **Knowledge vs. System-Prompt:**
- **System-Prompt:** Verhalten, Tonalität, Vorgehen, allgemeine Regeln, kurze immer-relevante Infos
- **Knowledge:** lange Dokumente, kontextabhängig abrufbare Spezifika, Zitations-Quellen

**[5:55]** **Drei besonders nützliche Knowledge-Typen für Lehrkräfte:**
1. **Lehrplan-Auszug** — Bildungs-Kontext
2. **Operatoren-Liste** — konsistente Aufgaben-Vorschläge
3. **Beispiel-Material** — Stilorientierung

**[6:30]** Take-away: **3–5 Dateien pro Assistent. Sauber strukturiert, anonymisiert. Lehrplan, Operatoren, Beispiel-Material.**

[END 7:00]`,

  "s6-6": `**[0:00]** Mit **Actions** kann ein GPT externe Dienste ansteuern — Website besuchen, API aufrufen, andere App. Technisch anspruchsvoller.

**[0:35]** **Was Actions können:**
- **Websuche** (oft eingebaut)
- **Wikipedia-Suche** (gezielter)
- **Eigene API** (Schul-System)
- **Zapier** (hunderte Apps)
- **OpenAI-Tools** — Bildgen, Code-Interpreter, Datei-Lesen

**[1:25]** **Konfigurieren:** Im Builder "Actions" → "Aktion erstellen". Brauchst:
1. **OpenAPI-Spezifikation** (technisch)
2. **Authentifizierung**
3. **Test-Setup**

**Für Anfänger:** Finger weg von eigenen Actions. Eingebaute Capabilities decken 90 % der Lehrer-Use-Cases.

[CUT TO: Talking Head]

**[2:30]** **Drei praktische Action-Use-Cases:**
1. **Bildgenerierung im Workflow** — DALL-E direkt im GPT
2. **Recherche mit Quellen** — Web Browsing + Links
3. **Daten-Analyse** — Code Interpreter mit Excel-Tabelle (Anonymisierung Pflicht!)

**[3:30]** **Datenschutz bei Actions.** Externe Server kommunizieren mit OpenAI. Weitere Stelle, wo Daten fließen:
- Personenbezogene Daten: höchste Vorsicht
- Drittanbieter-Actions: vor Aktivierung prüfen
- Schul-Setup: mit Datenschutz abstimmen

**[4:10]** **Ohne Actions** baust du schon mächtige Assistenten mit den eingebauten Capabilities — Web Browsing, DALL-E, Code Interpreter, File Upload.

**[4:55]** **Mein Rat:** Erst Standard-Capabilities ausreizen (Wochen). Dann ggf. Actions lernen oder Hilfe holen. GPT Store beobachten.

**[5:25]** Take-away: **Actions sind mächtig, aber technisch anspruchsvoll. Für die meisten Lehrkräfte reichen die eingebauten Capabilities.**

[END 6:00]`,

  "s6-7": `**[0:00]** Anthropic-Variante: **Claude Projects**. In manchen Aspekten besser, in anderen schwächer als Custom GPTs.

**[0:35]** **Schritt 1 — Project erstellen.** Linkes Menu "Projects" → "Create Project". Beispiel: **"Schreibhilfe für Deutsch-Aufsätze"**.

**[1:00]** **Project-Interface — konversationell** (anders als GPT-Builder):
- **Links** — Gespräche im Project
- **Mitte** — aktueller Chat
- **Rechts** — Settings (Instructions, Knowledge, Artifacts)

**[1:35]** **Schritt 2 — Custom Instructions.** Wie bei Custom GPT — Rolle, Aufgabe, Vorgehen, Stil, Don'ts.
> *"Du bist eine Deutsch-Lehrkraft mit Schwerpunkt Aufsatz-Didaktik. Du hilfst Lehrkräften, Schüleressays zu analysieren. Du gibst nie Noten, sondern strukturierte Analyse nach: (1) Aufbau und Roter Faden, (2) Argumentation, (3) Sprachliche Qualität, (4) Eigene Position. Du formulierst freundlich, konkret. Du arbeitest nur mit anonymisierten Texten."*

**[2:30]** **Schritt 3 — Speichern.** Auto-Save beim Verlassen des Felds. Kurze Bestätigung beachten.

**[2:50]** **Schritt 4 — Testen.** Neuer Chat → anonymisierten Schüleressay rein → "Bitte analysiere".

**[3:15]** Claude antwortet **automatisch** in der vier-Punkte-Struktur aus den Instructions. Kein Drumherum.

[CUT TO: Talking Head]

**[3:35]** **Claude Projects vs. Custom GPTs:**
- **Sprache** — Claude vorsichtiger, reflektierter. Für nuancierte Texte oft besser.
- **Kontextfenster** — deutlich größer. Längere Dokumente.
- **Artifacts** — Killer-Funktion (nächste Lektion).
- **Sharing** — weniger flexibel als Custom GPTs.
- **Preis** — Claude Pro ~18 €/Monat.

**[4:30]** **Wann Claude Projects?**
- Viel mit langen Texten (Aufsätze, Hausarbeiten, Lektüren)
- Sprachlich differenzierte Outputs
- Artifacts nötig
- Datensensibles Setup

**Wann nicht:** Bildgenerierung oder Plus-Funktionen aus ChatGPT.

[CUT TO: Talking Head]

**[5:15]** **Wenn nur ein Abo:** Mai 2026 → **ChatGPT Plus** (größeres Ökosystem). Wenn zwei: ChatGPT + Claude für beide Welten.

**[5:55]** Take-away: **Claude Projects — Anthropic-Variante. Stärken: Sprache, Kontextfenster, Artifacts. Für sprachsensible Aufgaben oft die bessere Wahl.**

[END 7:00]`,

  "s6-8": `**[0:00]** Zwei besondere Funktionen: **Knowledge** und **Artifacts** (Killer-Trick).

**[0:30]** **Knowledge.** "Add knowledge" → bis 200 MB pro Datei, mehrere parallel. Großzügiges Kontextfenster — selbst lange Bücher als Knowledge möglich.

**[1:00]** Beispiel: Bewertungs-Raster für Aufsätze hochladen.

**[1:15]** Prompt:
> *"Bewerte diesen anonymisierten Aufsatz nach dem hochgeladenen Bewertungs-Raster. Pro Kriterium: Einschätzung und Verbesserungsvorschlag."*

Claude folgt **exakt dem Raster**. Punkt für Punkt.

[CUT TO: Talking Head]

**[2:05]** **Artifacts** — eigenständige Output-Objekte in separatem Fenster rechts. Chat = Diskussion, Artifact = Produkt.

Was kann ein Artifact sein?
- Langer Text — Aufsatz, Brief, Skript
- Code-Snippet — HTML, Python, JavaScript
- Schaubild — SVG oder Mermaid
- Ganze kleine Web-App

**[2:55]** **Beispiel aus Crash-Kurs Modul III 40:**
> *"Aufgabe: Erstelle einen interaktiven Selbsteinschätzungsbogen als einzelne HTML-Datei. Design: Modern, serifenlos, Blau/Grau. Drei Info-Boxen für Bewertung, Wiederholung, Zusammenfassung. JavaScript für Live-Berechnung mit Ampelsystem."*

**[3:35]** Claude **baut das tatsächlich** — HTML/CSS/JS. Rechts Code + Live-Vorschau. HTML-Datei läuft sofort. Download → Schul-Server → SuS. **Werkzeug fertig in 30 Sekunden.**

[CUT TO: Talking Head]

**[4:00]** **Drei Artifact-Use-Cases:**
1. **Interaktive Materialien** — Selbsteinschätzung, Quiz-Apps, Glossare
2. **Druckvorlagen** — Briefe, Stundenpläne, Übersichten
3. **Schaubilder** — Mermaid/SVG, Zeitstrahlen, Konzept-Karten

**[4:40]** **Iterativ verfeinern.** "Mach die Ampel-Logik schärfer." "Füge Fortschritts-Anzeige hinzu." "Übersetze in einfache Sprache." Live-Änderungen, bis es passt.

[CUT TO: Talking Head]

**[5:10]** **Mein Favorit-Use-Case:** Digitale Begleit-Materialien für UEs — Karten mit Markern, Quiz-Apps mit Sofort-Auswertung, Lerntagebücher. 15–30 Min Konzeption. **Ohne Artifacts hätte ich das nicht gemacht** — ich bin kein Programmierer. Mit Artifacts regelmäßig.

**[5:35]** Take-away: **Claude Projects + Artifacts = riesiger Werkzeugkasten für Lehrkräfte. Interaktive Materialien und Druckvorlagen direkt im Chat.**

[END 6:00]`,

  "s6-9": `**[0:00]** Dritte Plattform: **Gemini Gems** von Google. Im Workspace tief integriert.

**[0:30]** **Schritt 1 — Gems-Bereich.** In Gemini linke Seitenleiste "Gems" → Sammlung von Google-Gems und eigenen.

**[0:50]** **Schritt 2 — Neues Gem.** "Neues Gem erstellen". Beispiel: **"Stundenplan-Generator"** mit Beschreibung "Hilft beim Erstellen von Stundenverlaufsplänen, abgestimmt auf G9-Lehrpläne."

**[1:25]** **Schritt 3 — Instructions.** 6-Block-System-Prompt wie in 6.4. Besonderheit: **Beispiel-Konversationen** direkt mitliefern.

**[2:00]** Ich gebe drei Beispiel-Konversationen mit — eine pro Klassenstufe. So lernt das Gem Tonfall und Detailtiefe.

**[2:25]** **Schritt 4 — Knowledge.** Etwas weniger flexibel als Custom GPTs/Claude. Aber: **Google-Drive-Dokumente anbinden**, Gmail-Inhalte, Google-Docs direkt. **Großer Vorteil** bei Workspace-Schulen.

**[3:10]** **Schritt 5 — Tools:**
- **Google Suche** — bessere Quellen-Verbindung
- **Workspace-Integration** — Docs schreiben, Sheets-Tabellen, Gmail-Vorbereitung
- **Imagen** — Bildgenerierung wie DALL-E

**[3:40]** **Schritt 6 — Testen.** Frage: *"Erstelle einen Stundenverlaufsplan für eine 90-Minuten-Stunde Mathematik 8. Klasse zum Thema 'Lineare Funktionen — Einstieg'."*

**[4:05]** Gem antwortet strukturiert nach Instructions. Output direkt in Google Doc kopierbar oder vom Gem bauen lassen.

[CUT TO: Talking Head]

**[4:30]** **Stärken Gemini Gems:**
- **Workspace-Integration** (Geschwindigkeitsvorteil)
- **Recherche mit Google-Suche**
- **Beispiel-Konversationen**
- **Memory** funktioniert gut

**Schwächen:**
- **Kleineres Ökosystem**
- **Sharing** umständlicher außerhalb Workspace
- **Knowledge-Limits** enger als Claude

**[5:15]** **Wann Gems?**
- Schule mit Google Workspace
- Viel mit Tabellen/Dokumenten/Mails
- Google-fokussierte Recherche

**Wann nicht:**
- Hauptsächlich lange Texte (lieber Claude)
- Viele Custom-GPTs Dritter (lieber ChatGPT)
- Höchste Bildgen-Qualität

[CUT TO: Talking Head]

**[5:50]** **Schul-Lizenzen.** Bei **Google Workspace for Education** ist Gemini oft **schon enthalten** — kostenlos für SuS und Lehrkräfte. Großer Unterschied: Gemini ist in vielen Schulkontexten bereits da. Frag IT-Team.

**[6:25]** Take-away: **Gemini Gems — Google-Variante mit tiefer Workspace-Integration. Stark bei Recherche, Tabellen, Mail-Workflows. Oft in Schul-Lizenzen schon enthalten.**

[END 7:00]`,

  "s6-10": `**[0:00]** Entscheidungshilfe.

**[0:35]** **Vergleichsmatrix:**

| Kriterium | Custom GPTs | Claude Projects | Gemini Gems |
|---|---|---|---|
| Ökosystem | Größtes | Mittel | Kleinstes |
| Sprachqualität | Sehr gut | Hervorragend | Sehr gut |
| Kontext-Fenster | Mittelgroß | Sehr groß | Mittelgroß |
| Bildgenerierung | DALL-E (gut) | Keine native | Imagen (gut) |
| Code/HTML | Gut (Code Interp.) | Sehr gut (Artifacts) | Gut |
| Workspace-Integration | Schwach | Schwach | Hervorragend |
| Sharing | Sehr einfach | Mittel | Schwierig (außer Workspace) |
| Preis (Solo) | ~23 €/Monat | ~18 €/Monat | Oft in Schul-Lizenz |
| DSGVO-Profil | Mittel | Gut | Mittel |

[CUT TO: Talking Head]

**[1:30]** **Matrix-Durchgang:**
- **Ökosystem** — Custom GPTs am verbreitetsten. Im Internet Tausende fertige.
- **Sprachqualität** — Claude **etwas reflektierter**. Für nuancierte Texte oft besser.
- **Kontext-Fenster** — Claude längste Eingaben. Bücher/lange Lektüren möglich.
- **Bildgenerierung** — ChatGPT (DALL-E) und Gemini (Imagen). Claude nicht.

**[2:35]** **Drei typische Lehrer-Use-Cases:**
1. **Schreibhilfe + Aufsatz-Feedback** → **Claude Projects** (Sprache, lange Texte, Artifacts)
2. **UE-Planung mit Lehrplan-Anbindung** → **Gemini Gems** (Drive) oder **Custom GPT** (PDF-Upload)
3. **Schnelle Tool-Vielfalt** → **Custom GPT** (alle Capabilities in einem)

[CUT TO: Talking Head]

**[3:30]** **Meine Strategie:** **Alle drei** abhängig von der Aufgabe. ChatGPT für Custom-GPT-Arbeit + Bildgen. Claude für lange Texte + HTML-Artifacts. Gemini für Workspace-Workflows. **~60 €/Monat für drei Pro-Abos** — Bruchteil der Zeitersparnis.

**[4:15]** **Wenn nur eins:**
- **Google Workspace im Haus?** → **Gemini** (oft schon bezahlt)
- **Sonst:** Mai 2026 → **ChatGPT Plus** (größtes Ökosystem)
- **Sprach-/Schreib-Fächer:** **Claude Pro** oft die bessere Wahl

**[5:00]** **Strategie über Zeit:**
- **Monat 1–3:** Ein Tool, richtig lernen, 2–3 Assistenten bauen
- **Monat 4–6:** Zweites Tool testen
- **Monat 7–12:** Bewusste Entscheidung

Keine Eile. Wirklich gut werden in dem, was du nutzt.

**[5:30]** Take-away: **Drei Tools, drei Stärken. Custom GPTs für Vielfalt, Claude für Sprache und Artifacts, Gemini für Workspace-Integration.**

[END 6:00]`,

  "s6-11": `**[0:00]** Wir bauen ab dieser Lektion fünf konkrete Beispiel-Assistenten. Jeder eine **Vorlage**. Wir starten mit dem **Lernhelfer für Begabtenförderung** — Original aus DeepDiveKI-Material: *"Erstelle einen KI-Assistenten, der einem Schüler mit Hochbegabung Aufgaben deutlich komplexer gestaltet."*

**[0:40]** **Use-Case.** 2–3 starke SuS in der Klasse, mit Standard-Aufgabe in 10 Min fertig. Brauchen **Anschluss-Aufgaben**, die wirklich fordern. KI-Lösung: Assistent verkompliziert Aufgaben gezielt — mit Methodik, Bezug zum Stoff, klarem nächsten Lernziel.

**[1:25]** **Setup als Custom GPT.**
- **Name:** "Diff+ Lernhelfer"
- **Beschreibung:** "Verkompliziert Aufgaben gezielt für leistungsstarke SuS in Sek I und II."
- **Conversation Starters:**
  - "Hier ist eine Aufgabe — mach sie für Begabtenförderung anspruchsvoller."
  - "Wie kann ich diese Aufgabe in 3 Niveau-Stufen anbieten?"
  - "Welche Brücken-Aufgaben zu Wissenschafts-Olympiaden gibt es?"

**[2:10]** **Instructions:**
> *"Du bist eine erfahrene Lehrkraft mit Schwerpunkt Begabtenförderung. Du arbeitest in der Sek I und II. Deine Aufgabe ist es, vorhandene Aufgaben aus dem regulären Unterricht so zu erweitern, dass sie hochbegabte oder besonders leistungsstarke SuS herausfordern — ohne sie zu überfordern und ohne sie von der Klasse abzukoppeln.*
>
> *Du arbeitest in zwei Schritten. Erstens: Du klärst durch kurze Rückfragen — Klassenstufe, Fach, aktuelles Thema, Charakter der zu fordernden SuS (eher abstrakt-denkend, eher kreativ, eher detail-orientiert). Zweitens: Du lieferst drei Erweiterungen — eine vertiefend, eine transferierend, eine kreativ-experimentell.*
>
> *Erweiterungs-Prinzipien: (a) Anknüpfung an den aktuellen Stoff. (b) Anspruchsniveau zwei bis drei Stufen über dem Klassendurchschnitt. (c) Klarer Sinn-Zusammenhang, keine 'Strafe-Aufgaben'. (d) Wenn möglich, Brücken zu Wettbewerben (Mathematik-Olympiade, Bundeswettbewerb Fremdsprachen, Jugend forscht).*
>
> *Pro Erweiterung: Aufgabentext, Lernziel, Bearbeitungsdauer, Bezug zum Lehrplan. Keine Marketing-Sprache. Lehrkräfte per 'du' ansprechen, kollegial."*

**[3:50]** **Knowledge:**
- Liste von Aufgabentypen für Begabtenförderung pro Fach
- Liste von Wettbewerben/Olympiaden mit Klassenstufen und Themen

**[4:25]** **Capabilities:** Web Browsing ja (aktuelle Wettbewerbe), DALL-E nein, Code Interpreter ja (Berechnungs-Aufgaben).

**[4:50]** **Test:**
> *"Hier eine Aufgabe für Mathe Klasse 8: 'Eine Gerade hat die Steigung 2 und schneidet die y-Achse bei -3. Bestimme den x-Wert für y = 7.' Bitte für Begabtenförderung erweitern."*

**[5:25]** **Output:**
- **Erweiterung 1 (vertiefend):** "Bestimme die Gerade als Funktion und untersuche, an welchen Stellen y > 10 und y < -10 angenommen werden. Erklär dein Vorgehen."
- **Erweiterung 2 (transferierend):** "Eine zweite Gerade hat die Steigung -0,5 und schneidet die y-Achse bei 5. Berechne den Schnittpunkt algebraisch und geometrisch. Diskutiere die unterschiedlichen Verfahren."
- **Erweiterung 3 (kreativ-experimentell):** "Untersuche, wie sich der Steigungs-Parameter auf die Schnittpunkte zweier Geraden auswirkt. Beschreibe einen Algorithmus, mit dem ein Computer jeden beliebigen Schnittpunkt finden würde."

Mit Lernzielen, Dauer und Lehrplan-Bezug.

[CUT TO: Talking Head]

**[6:25]** **Bilanz:** Aus Standard-Aufgabe wurden drei sehr anspruchsvolle. Zweite = klassische Sek-I-Vertiefung. Dritte = Olympiade-Niveau (algorithmisches Denken). Aufwand: ein Prompt. Zeitersparnis: 20+ Min gegenüber Eigenkonzeption.

**[6:50]** **Iteration:** Mit 5 Aufgabentypen testen. Bei Schwächen Instructions ergänzen. ~10 Iterationen bis zum Reifegrad.

**[7:20]** Take-away: **Lernhelfer Begabtenförderung — Bauzeit ~30 Min. Pro Anwendung 20+ Min gespart. Skaliert über das Schuljahr.**

[END 8:00]`,

  "s6-12": `**[0:00]** Aus DeepDiveKI-Original: *"Erstelle einen KI-Assistenten, der dir bei der Vorbereitung mündlicher Prüfungen hilft. Er muss das Curriculum berücksichtigen und verschiedene Erwartungshorizonte erstellen."*

**[0:40]** **Use-Case.** Mündliche Prüfung vorbereiten: Prüfungsthema, drei Aufgaben mit aufsteigender Schwierigkeit, Erwartungshorizont nach Anforderungsbereichen (AB I, II, III), Punkteverteilung, mögliche Rückfragen. Klassisch: 60–90 Min. Mit Assistent: 15 Min Anpassung.

**[1:20]** **Setup:**
- **Name:** "Mündliche Prüfung Sek II"
- **Conversation Starters:**
  - "Erstelle eine Prüfungsaufgabe für Fach X, Thema Y."
  - "Generiere einen Erwartungshorizont nach Anforderungsbereichen."
  - "Welche typischen Rückfragen kann ich stellen?"

**[1:55]** **Instructions:**
> *"Du bist eine erfahrene Lehrkraft mit Erfahrung in mündlichen Prüfungen — Abitur, MSA, BBR, fachgebundene Prüfungen.*
>
> *Du arbeitest in vier Schritten: (1) Du klärst Fach, Klassenstufe, Prüfungsart, Thema und Zeitumfang. (2) Du schlägst eine Prüfungsaufgabe vor — mit Quelle/Material falls möglich. (3) Du gliederst nach den drei Anforderungsbereichen: AB I (Reproduktion), AB II (Reorganisation und Transfer), AB III (Reflexion und Problemlösung). (4) Du lieferst pro AB erwartete Schüler:innen-Leistung und mögliche Lehrer-Rückfragen.*
>
> *Du nennst keine konkreten SuS-Namen. Du hältst dich an die KMK-Bildungsstandards. Bei Nennung eines Bundeslandes: dessen Operatoren-Liste verwenden, sofern hochgeladen. Tonalität: prüfungs-erfahren, präzise, mit klarem Bezug zu Standards. Format: Strukturiert mit Überschriften pro AB."*

**[3:40]** **Knowledge:** KMK-Operatorenliste · Beispiel-Erwartungshorizonte (anonymisiert) · Bewertungsbogen der Schule.

**[4:15]** **Test:**
> *"Erstelle eine Abi-Prüfungsaufgabe in PGW. Thema: Soziale Medien und Demokratie. Dauer 20 Minuten. Klausurverwandte Aufgabenstellung. Sek II, Hamburg."*

**[4:45]** **Output — fünf Teile:**
- **Teil 1 — Aufgabe mit Material:** "Quelle: Auszug aus Forschungspapier zu Filterblasen (max. 200 Wörter). Aufgabe: Analysieren Sie die Position des Autors und setzen Sie sie in Bezug zu Ihren Kenntnissen über die Funktionsweise sozialer Medien."
- **Teil 2 — AB I (Reproduktion):** Definition Filterblase, Algorithmen-Funktionsweise, Beispiele.
- **Teil 3 — AB II (Reorganisation):** Verbindung zur Bürger:innen-Rolle, Analyse-Schritte.
- **Teil 4 — AB III (Reflexion):** Eigene Position zur Regulierung sozialer Medien, begründet.
- **Teil 5 — Sieben mögliche Lehrer-Rückfragen** gestaffelt nach Schwierigkeit.

[CUT TO: Talking Head]

**[6:00]** **Praxis-Workflow:** Assistent generiert → ich lese kritisch → übernehme ~70 % → anpasse Rest an konkrete Klasse. Ersetzt nicht Prüfungs-Verantwortung — liefert prüfungs-konforme Struktur.

**[6:30]** **Datenschutz-Hinweis.** Nie konkrete SuS-Namen oder Lerngruppen-Spezifika. Bei Sharing mit Kolleg:innen gemeinsam vereinbaren, was hochgeladen werden darf.

**[7:00]** Take-away: **Strukturiert nach Anforderungsbereichen, mit Erwartungshorizonten und Rückfragen. Spart 60 Min pro Prüfung.**

[END 8:00]`,

  "s6-13": `**[0:00]** **Datenschutz-sensibelster** der fünf Assistenten. Original-Aufgabe: *"Erstelle einen KI-Assistenten, der bestimmte Profile von SuS hält und dein Arbeitsmaterial anpasst."* — **mit dem Zusatz: "Keine Angabe des Namens des SuS!"**

Schlüssel: Wir arbeiten mit **anonymisierten Lernprofilen**, niemals mit identifizierbaren Personen.

**[0:40]** **Use-Case.** Statt für jede SuS individuell zu differenzieren — Profil-Typen: Typ A (starke, abstrakt-orientiert), Typ B (mittelstark, anwendungsorientiert), Typ C (Förderbedarf, struktur-orientiert). Assistent generiert ein Material in mehreren Profil-Versionen.

**[1:30]** **Setup:**
- **Name:** "Profil-Differenzierer"
- **Conversation Starters:**
  - "Hier ist ein Arbeitsblatt — generiere drei Profil-Versionen."
  - "Definiere Profil-Typen für meine Klasse."
  - "Welches Profil passt zu welchem Lern-Modus?"

**[2:05]** **Instructions:**
> *"Du bist eine erfahrene Lehrkraft mit Schwerpunkt Differenzierung. Du arbeitest mit anonymisierten Lerntyp-Profilen, niemals mit konkreten Personen.*
>
> *Profile sind didaktische Konstrukte: 'Typ A — abstrakt-deduktiv, schnell, fordert komplexe Anschlussaufgaben.' 'Typ B — anwendungsorientiert, mittlere Geschwindigkeit, gut mit konkreten Beispielen.' 'Typ C — struktur-orientiert, klare Schritte, Stützung.'*
>
> *Aufgabe: Du nimmst ein bestehendes Material und generierst Versionen für die jeweiligen Profile.*
>
> *In zwei Schritten: (1) Profil-Definitionen klären, falls noch nicht klar. (2) Pro Profil eine angepasste Version, mit klar erkennbaren Unterschieden.*
>
> *Du fragst niemals nach konkreten SuS-Namen. Bei Namens-Nennung: 'Bitte arbeiten Sie mit anonymen Profilen — Datenschutz.'*
>
> *Output-Format: Drei Profile nebeneinander, mit klaren Bezeichnungen, plus Hinweisen zur Lehrkraft-Steuerung."*

**[4:00]** **Knowledge:** Liste typischer Lerntyp-Profile (anonym, abstrakt) · Differenzierungs-Strategien nach Bezugsnorm (individuell, sozial, kriterial) · Beispiel-Arbeitsblätter in mehreren Versionen.

**[4:35]** **Test:**
> *"Hier ein Arbeitsblatt zur Französischen Revolution. Aufgabe: 'Erläutere die Funktionen der drei Stände vor 1789.' Bitte für drei Profile differenzieren — A, B, C."*

**[5:05]** **Output — drei Versionen:**
- **Profil A (abstrakt-deduktiv):** "Analysiere die Rolle der drei Stände als Strukturmerkmal des Ancien Régime. Diskutiere, wie diese Struktur die Eskalation 1789 beeinflusste. Berücksichtige die theoretische Position Sieyès'."
- **Profil B (anwendungsorientiert):** "Erkläre, was die drei Stände konkret im Alltag eines durchschnittlichen Bürgers vor 1789 bedeuteten. Nutze die Materialien M1 und M2. Welche Probleme entstanden daraus?"
- **Profil C (struktur-orientiert):** "Beschreibe die drei Stände in eigenen Worten. Vervollständige die Tabelle. Wer gehörte zu welchem Stand? Welche Rechte hatten sie? Welche Pflichten? Achte auf vollständige Sätze."

Plus Hinweise zur Lehrkraft-Steuerung — "Bei Profil C bietet sich eine Begleit-Tabelle als Strukturhilfe an."

[CUT TO: Talking Head]

**[6:10]** **Bilanz.** Aus einer Aufgabe drei Niveau-Varianten mit klaren didaktischen Akzenten. Differenzierung, die mehrere Stunden gekostet hätte — jetzt in 30 Sekunden.

**[6:50]** **Datenschutz-Kernbotschaft.** Profile sind **didaktische Konstrukte**, keine Personen. "Profil C = Lisa, Bashir und Marie" ist deine pädagogische Verantwortung — **im Prompt taucht das nicht auf**.

**[7:20]** **Variation:** Statt drei auch vier/fünf Profile. Fachspezifisch (Mathe-Profile ≠ Deutsch-Profile). Schuljährlich anpassen. **Profile schriftlich definieren** im Knowledge-File, mit pädagogischer Begründung.

**[7:50]** Take-away: **Differenzierung in drei Versionen pro Minute. Mit anonymisierten Lerntyp-Profilen. Datenschutz strukturell eingebaut.**

[END 8:00]`,

  "s6-14": `**[0:00]** Diesmal in **Claude Projects** statt Custom GPT — längere Texte, Claude-Stärke. Antonius hat den Bot mit mir entwickelt — nutzt ihn intensiv für Erstanalyse von Sek-II-Essays.

**[0:35]** **Use-Case.** 25 Aufsätze einer 11./12. Klasse. **Strukturierte Erstanalyse** statt Null-Analyse pro Text. **Wichtig — KI bewertet nicht. KI hilft bei der Analyse.** Bewertungs-Entscheidung bleibt bei dir.

**[1:15]** **Setup in Claude:**
- **Project-Name:** "Aufsatz-Sparring Sek II"
- **Custom Instructions:**
> *"Du bist eine erfahrene Deutsch-Lehrkraft mit Schwerpunkt Sek II. Du analysierst anonymisierte Schüleressays nach festem Schema:*
>
> *(1) Aufbau und Roter Faden — Einleitung, Hauptteil, Schluss: Bewertung pro Teil.*
> *(2) Argumentation und Beweisführung — Stärken, logische Lücken, Quellenarbeit.*
> *(3) Sprachliche Qualität — Stil, Variation, Klarheit, Fachsprache.*
> *(4) Eigene Position der SuS — Wo nimmt der oder die Verfasser:in Stellung? Wie wird sie begründet?*
> *(5) Drei konkrete Verbesserungsvorschläge.*
>
> *Du nennst keine Punkte und keine Note. Du formulierst freundlich-präzise. Bezug auf hochgeladenes Bewertungs-Raster falls vorhanden.*
>
> *Du arbeitest nur mit anonymisierten Texten. Bei Namen-Funden: Hinweis und Anonymisierungs-Bitte."*

**[3:00]** **Knowledge:** Eigenes Bewertungs-Raster Sek-II-Aufsätze · drei selbst geschriebene Beispiel-Feedbacks (Stil-Referenz) · KMK-Operatoren-Liste Deutsch.

**[3:30]** **Test.** Anonymisierter Schüleressay (~500 Wörter, Erörterung) hineinkopieren: *"Bitte analysiere diesen Aufsatz."*

**[4:00]** **Output — strukturierte Fünf-Punkte-Analyse:**
- **(1) Aufbau:** "Klare Einleitung mit These. Hauptteil mit drei Argumenten. Schluss kürzer als erwartet — eine pointierte Schlussformulierung fehlt."
- **(2) Argumentation:** "Argumente 1 und 2 gut gestützt. Argument 3 bleibt assertorisch — kein Beleg, kein Beispiel."
- **(3) Sprache:** "Variation in der Satzlänge gut. Drei Wortwiederholungen im Hauptteil. Fachsprache vorhanden, aber stellenweise inkorrekt ('Hypothese' statt 'These')."
- **(4) Eigene Position:** "Wird im zweiten Hauptteilabschnitt deutlich, aber nicht im Schluss aufgegriffen."
- **(5) Verbesserungsvorschläge:** Drei konkrete Punkte.

[CUT TO: Talking Head]

**[5:00]** **Bilanz.** Bot nimmt **mechanische Erstanalyse** ab. Ich konzentriere mich auf: inhaltliche Tiefe · Stil-Eigenheiten würdigen · Bezug zur Lerngruppe · Bewertungs-Entscheidung. Workflow: Aufsatz → Claude → Analyse lesen → kritisch prüfen → eigenes Feedback. **10 statt 25 Min pro Aufsatz.**

**[5:50]** **Drei Tipps von Antonius (Englisch/Deutsch):**
1. **Beispiel-Feedbacks als Knowledge.** Eigene Feedback-Sprache → 5–10 Beispiele hochladen. Bot lernt deinen Ton.
2. **Sprachsensibilität.** In Instructions markieren, dass nicht-muttersprachliche Texte nicht unfair beurteilt werden.
3. **Iterativ verfeinern.** Bei Fehlleistungen Knowledge/Instructions ergänzen. 2–3 Iterationen pro Klasse.

**[6:30]** Take-away: **Strukturierte Erstanalyse in 30 Sek. Spart 15 Min pro Aufsatz. Bewertung bleibt bei dir. Anonymisierung Pflicht.**

[END 7:00]`,

  "s6-15": `**[0:00]** Andere Zielgruppe: **SuS nutzen den Assistenten**. Fach-Tutor hilft bei Übungs-Aufgaben — **ohne Lösungen zu schenken**. Beispiel: Latein. Logik überträgt sich auf Mathe, Physik, Chemie.

**[0:35]** **Pädagogisches Konzept.** Klassisch: SuS hängt → fragt Lehrkraft (nicht immer da), Klassenchat (oft Lösung kopieren), ChatGPT (sofortige Lösung, kein Lernen). Unser Tutor **fragt zurück**, hilft mit Tipps, bestätigt Teilergebnisse, erklärt nur bei echten Sackgassen.

**[1:15]** **Setup:**
- **Name:** "Latein-Lerntutor"
- **Beschreibung:** "Hilft bei Übersetzungs-Aufgaben — ohne Lösungen zu verraten."
- **Conversation Starters:**
  - "Ich hänge bei dieser Übersetzung. Kannst du mir helfen?"
  - "Welcher Kasus ist hier richtig — und warum?"
  - "Erkläre mir die Konstruktion in diesem Satz."

**[1:55]** **Instructions — pädagogisches Herzstück:**
> *"Du bist ein freundlicher Latein-Tutor für SuS der Sek I und Sek II. Zentrale Regel: Du gibst niemals direkte Lösungen. Du arbeitest sokratisch — mit Fragen, Hinweisen, kleinen Schritten.*
>
> *Bei einer Übersetzung:*
> *(1) Frag, was er oder sie schon herausgefunden hat.*
> *(2) Bestätige, was korrekt ist.*
> *(3) Frag bei Lücken nach: 'Welche Form hat das Verb? Welche Person und Zeit?'*
> *(4) Erst bei echter Sackgasse: kleiner Hinweis — keine Lösung.*
> *(5) Am Ende: Lob, Zusammenfassung des Gelernten.*
>
> *Tonalität: warm, geduldig, ermutigend. Kein Sarkasmus, keine Herablassung.*
>
> *Du fragst nie nach Namen/persönlichen Daten. Du bietest niemals an, ganze Hausaufgaben zu erledigen. Bei solchen Anfragen: 'Lass uns lieber gemeinsam einen Schritt nach dem anderen machen.'*
>
> *Beispiele aus dem Lehrbuch beziehen sich auf das hochgeladene Curriculum."*

**[3:30]** **Knowledge:** Operatoren und Grammatik-Konstruktionen pro Klassenstufe · Wortschatz-Listen aus dem Lehrbuch · Beispiel-Aufgaben mit Musterlösungen (nur als KI-Referenz, nicht weitergebbar an SuS).

**[4:00]** **Test — SuS-Simulation:**
> *"Ich übersetze gerade einen Satz: 'Caesar milites in proelium duxit.' Ich weiß, 'Caesar' ist das Subjekt. Aber dann werde ich unsicher."*

**[4:30]** **Antwort:**
> "Super, dass du 'Caesar' als Subjekt erkannt hast. Jetzt schauen wir uns 'milites' an. Was siehst du da — Plural oder Singular? Welchen Kasus könnte es haben?"

**SuS:** "Plural — Akkusativ vielleicht?"

**Tutor:**
> "Sehr gut, das stimmt — Akkusativ Plural. Was bedeutet das in unserem Satz? Wenn 'Caesar' Subjekt ist und 'milites' im Akkusativ steht — welche Rolle hat 'milites'?"

Schritt für Schritt — bis SuS selbst übersetzt hat.

[CUT TO: Talking Head]

**[5:25]** **Datenschutz und Setup für SuS-Zugang.** Drei Optionen:
1. **Link teilen** — SuS brauchen eigenen ChatGPT-Account
2. **Schul-Account** — ChatGPT EDU oder Anthropic for Education (zentral)
3. **Embed** — technisch versierte können in Schul-Website einbetten

**Vor Einsatz:** Mit Datenschutzbeauftragten klären. Eltern informieren. Klare Regeln.

**[6:10]** **Übertragung auf andere Fächer:**
- **Mathe** — Hinweise statt Lösungen
- **Physik** — Konzept-Verständnis durch sokratische Fragen
- **Englisch/Französisch** — Textverständnis, ohne direkte Übersetzung
- **Geschichte** — Quellenanalyse mit gestützten Fragen

**[6:40]** Take-away: **Sokratisches Lernen statt Lösungs-Lieferung. Pädagogisch hochwertig. Datenschutz vor Einsatz klären. Übertragbar auf alle Fächer.**

[END 7:00]`,

  "s6-16": `**[0:00]** NotebookLM = **Wissens-Workbench**. Dokumente rein, durchsuchbare und befragbare Wissensbasis raus. Stark für Schulleitungen, Kollegien, Unterrichts-Materialien.

**[0:30]** **Was ist NotebookLM?** Google-Tool, kostenlos in Basis, mit Premium-Features. notebooklm.google.com. Google-Account nötig. **Notebook** anlegen + **Quellen** hochladen (PDFs, Google Docs, Webseiten, YouTube, Audio). Mit den Quellen chatten.

**[1:15]** **Beispiel — Schul-Konzept-Wissensbasis.** Ich lade hoch:
- Schulkonzept Digitalisierung (PDF, 30 Seiten)
- Drei Konferenz-Protokolle des Halbjahres
- Studie zur KI-Nutzung an Hamburger Schulen
- Bildungsplan Informatik

**[1:50]** Interface: links Quellen, Mitte Chat, rechts Notizen. Frage:
> *"Welche Aussagen aus den Konferenz-Protokollen unserer Schule decken sich mit den Hamburger Studien-Ergebnissen?"*

**[2:35]** Antwort **mit exaktem Quellen-Verweis** — Seite und Quelle. Klick auf Verweis → direkt zur Stelle. **NotebookLM halluziniert kaum**, weil streng auf hochgeladene Quellen begrenzt.

[CUT TO: Talking Head]

**[3:10]** **Drei Killer-Features:**

**Feature 1 — Quellen-strikte Antworten.** Was nicht in den Quellen, wird nicht erfunden. **Wesentlich verlässlicher als allgemeine LLMs für Recherche.**

**Feature 2 — Audio-Summary.** NotebookLM erstellt aus deinem Material einen **Podcast** — zwei KI-Stimmen, natürlicher Dialog, 10–20 Min.

**[3:50]** "Audio Overview generieren" → einige Minuten warten → fertiger Podcast. Klingt verrückt, funktioniert erstaunlich gut.

[CUT TO: Talking Head]

**[4:25]** **Schul-Use-Case Audio.** SuS bekommen Lektüre. Manche lesen gerne, andere nicht. Podcast aus dem Material → SuS **hören** statt lesen. Inklusion. Unterwegs, in der Pause, abends.

**Feature 3 — Mindmap-Generierung.** Interaktive Mindmaps aus dem Material. Visuelle Übersicht — Themen, Verknüpfungen, Hierarchien. Für komplexe Themen sehr hilfreich.

**[5:20]** **Use-Cases im Schulalltag:**
1. **Schulleitungs-Wissensbasis** — alle Schulkonzepte, Protokolle, Pläne. Riesige Zeitersparnis.
2. **Lehrkraft-Wissensbasis pro Fach** — eigene durchsuchbare Wissensbasis.
3. **UE-Vorbereitung** — alle Quellen für eine UE in einem Notebook.
4. **Schüler-Lernen** — Lektüre als Podcast, Lehrwerk-Kapitel als befragbar.

**[6:10]** **Datenschutz.** Inhalte gehen auf Google-Server. Persönliche SuS-Daten nicht hochladen. Eigene Materialien unproblematisch. Bei **Google Workspace for Education** oft geschütztere Variante.

**[6:40]** Take-away: **Wissens-Workbench für eigene Dokumente. Quellen-strikt, Audio-Summary, Mindmaps. Riesiger Nutzen für Schulleitungen und Lehrkräfte mit großem Materialfundus.**

[END 7:00]`,

  "s6-17": `**[0:00]** Erkenntnis nach zwei Jahren KI-Nutzung: **Gute Prompts sind ein Schatz, der wiederverwendet werden muss.** Wer jeden Prompt neu schreibt, verschwendet Zeit.

**[0:35]** **Was ist eine Prompt-Library?** Strukturierte Sammlung wiederverwendbarer Prompts mit Metadaten. Notion, Excel, Google Sheets, Markdown — Hauptsache durchsuchbar und konsistent.

**[1:10]** **Mein Notion-Template — 8 Spalten:**
1. **Prompt-Name** — kurz, prägnant
2. **Kategorie** — Tags wie "UE-Planung", "Feedback", "Quizzes"
3. **Fach** — "Geschichte", "Deutsch", "Mathe" oder "fachübergreifend"
4. **Klassenstufe** — "Sek I", "Sek II", "Grundschule", "alle"
5. **Tool** — ChatGPT, Claude, Gemini, oder "egal"
6. **Prompt-Text** — voll ausformuliert
7. **Letzter Einsatz** — Datum
8. **Variation-Notizen** — Anpassungen

**[2:30]** **Beispiel-Eintrag:**
- **Name:** "Erstprompt UE-Strukturierung"
- **Kategorie:** UE-Planung, Erstellung
- **Fach:** Fachübergreifend
- **Stufe:** Sek I + Sek II
- **Tool:** ChatGPT oder Claude
- **Prompt:** "Du bist erfahrene Lehrkraft an einem deutschen Gymnasium. Erstelle eine Unterrichtseinheit zu [Thema] für [Klassenstufe] [Schulform]. Rahmen: [Stundenzahl] Sitzungen á [Dauer]. Schwerpunkt: [Schwerpunkt]. Leitfragen: [Leitfragen]. Bitte gib pro Sitzung: Thema, Lernziele, Phasen mit Methode, Material, Hausaufgabe."
- **Letzter Einsatz:** 2026-05-08, UE Französische Revolution
- **Notizen:** Funktioniert gut. Bei differenzierten Lerngruppen ergänzen: "Berücksichtige drei Niveau-Stufen."

[CUT TO: Talking Head]

**[3:35]** **Drei Empfehlungen:**
1. **Klein anfangen.** 5–10 Prompts. Nach 3 Monaten 30. Nach 1 Jahr 80.
2. **Variablen markieren.** Eckige Klammern für veränderbare Stellen: [Thema], [Klassenstufe], [Material].
3. **Wöchentlich pflegen.** 10 Min — neue hinzufügen, Notizen aktualisieren, veraltete entfernen.

**[4:25]** **Excel-Alternative.** Gleiches in Excel/Google Sheets. Weniger schön, alle Funktionen da.

**[4:55]** **Kategorien für jede Library:**
- **UE-Planung** — Themenfindung, Strukturierung, Differenzierung
- **Materialien** — Arbeitsblätter, Quizzes, Bilder
- **Feedback** — Aufsatz-Analyse, Bewertungs-Vorbereitung
- **Kommunikation** — E-Mails, Eltern-Briefe, Konferenz-Berichte
- **Reflexion** — Selbst-Reflexion, Lern-Tagebücher
- **Spezial** — fach-/klassen-spezifisch

10–15 Kategorien reichen am Anfang.

**[5:30]** Take-away: **Prompt-Library ist nicht optional bei ernsthafter KI-Nutzung. Strukturierte Sammlung mit Kategorien, Variationen, Metadaten.**

[END 6:00]`,

  "s6-18": `**[0:00]** Eigene Library gut. **Gemeinsame Schul-Library** exponentiell besser. 15 Lehrkräfte × 30 Prompts = 400+ geprüfte Prompts.

**[0:35]** **Drei Architektur-Varianten:**
1. **Geteiltes Notion-Workspace** — Workspace "KI-Prompts", alle Lehrkräfte Zugriff, nach Fächern sortiert
2. **Gemeinsame Google Drive Tabelle** — kollaborativ, weniger flexibel, praktisch
3. **Schul-Wiki** — BSCW, MS Teams, WordPress

[CUT TO: Talking Head]

**[1:25]** **Drei Rollen:**
1. **Kurator:in** — pflegt Library, Strukturen, Kategorisierung, Qualitätskontrolle (Digital-Beauftragten-Team)
2. **Beiträger:innen** — alle Lehrkräfte, manche aktiver
3. **Reviewer** — Zweit-Lektüre vor Aufnahme, Qualitäts-Hebung

**[2:10]** **Quality Gates — Aufnahme-Kriterien:**
1. **Selbst getestet** — mehrfach verwendet, keine theoretischen Prompts
2. **Schul-konform** — keine Datenschutz-/Verantwortungsverletzungen
3. **Reproduzierbar** — andere bekommen mit gleichem Prompt vergleichbare Ergebnisse
4. **Dokumentiert** — alle Metadaten vorhanden

[CUT TO: Talking Head]

**[2:55]** **Start in fünf Schritten:**
1. **Initiative ergreifen.** Nicht warten — 3–5 Lehrkräfte einladen
2. **Struktur festlegen.** Erstes Treffen (60 Min) — Architektur und Kategorien
3. **Ersten Bestand füllen.** Jede:r bringt 5–10 Prompts. = 50 in der Library
4. **Wöchentlicher Rhythmus.** 20 Min in Konferenz — neue Prompts vorstellen, diskutieren
5. **Erweitern.** Nach 3 Monaten andere Fachschaften einladen

**[4:00]** **Anreize schaffen:**
1. **"Prompt der Woche"** im Lehrer-Newsletter
2. **Erfolgs-Geschichten** ("30 Min gespart")
3. **Wertschätzung** — namentliche Erwähnung wirkt sehr

**[4:30]** Take-away: **Schul-Library ist Skaleneffekt. Definierte Rollen, Quality Gates, regelmäßiger Rhythmus. Wer initiativ wird, baut etwas Bleibendes für seine Schule auf.**

[END 5:00]`,

  "s6-19": `**[0:00]** Multimodal = mehrere Modalitäten in einem Workflow. Standard in ChatGPT, Claude, Gemini.

**[0:30]** **Multimodal:** Bild rein → Text raus. Audio rein → Text raus. Text rein → Bild/Audio raus. Beliebige Kombinationen.

**[1:10]** **Workflow 1 — Tafel-Foto zu Quiz.** Foto vom Tafelbild → ChatGPT:
> *"Hier ist das Tafelbild aus meiner heutigen Stunde. Erkenne den Inhalt und erstelle daraus ein Quiz mit 8 Fragen für die SuS — als Hausaufgabe zur Sicherung."*

**[1:45]** ChatGPT analysiert Bild → erkennt Stichworte → generiert Quiz. Ein Foto, ein Prompt, fertige Hausaufgabe.

**[2:20]** **Workflow 2 — Audio-Notizen zu strukturierten Notizen.** Nach Konferenz aufs Handy gesprochen:
> *"Folgende Punkte aus der Sitzung: Digital-Beauftragte braucht Vertretung, Klassenfahrten 2027 bis Februar geplant, neue Sportstätte verzögert. Kernerkenntnis: Kollegium bei Digitalisierung mitnehmen."*

Audio/Transkript an ChatGPT: *"Strukturiere meine Audio-Notizen. Format: kurzer Bericht plus Aufgabenliste."*

**[3:05]** Output: Strukturierter Bericht + Aufgabenliste mit Deadlines.

[CUT TO: Talking Head]

**[3:30]** **Workflow 3 — Material in mehreren Modalitäten.** Lektüre in drei Versionen:
- **Text-Zusammenfassung** für lesegewohnte SuS
- **Audio-Podcast** (NotebookLM) für unterwegs
- **Schaubild** (Bildgenerierung) für visuelle Lerner

In 15 Min für jeden Lerntyp passendes Material.

**[4:10]** **Workflow 4 — Bilder didaktisch analysieren.** Karikatur aus Französischer Revolution in ChatGPT:
> *"Analysiere diese Karikatur. Welche Personen? Welche Botschaft? Welche Stilmittel?"*

**[4:50]** Strukturierte Bildanalyse — Personen, Symbole, Komposition, Botschaft, Kontext. **Nicht als Ersatz für SuS-Analyse**, als Eigenrecherche-Hilfe oder Vergleichsmöglichkeit.

**[5:25]** **Workflow 5 — Eigene Erklär-Videos:**
1. Konzept-Stichworte → ChatGPT → Skript
2. ElevenLabs/ähnlich → Stimme synthetisieren (auch eigene)
3. Canva/HeyGen → Video mit Avatar und Stimme

**Ergebnis:** 5-Min-Video in 20 Min, ohne vor die Kamera. Datenschutz: SuS müssen wissen, dass KI-generiert.

[CUT TO: Talking Head]

**[6:15]** Multimodale Workflows = **echte Zeitgewinner**. Eine Stunde klassisch in 2 Std vorbereitet — multimodal in 30 Min. Tool-Investition zahlt sich überproportional aus.

**[6:40]** Take-away: **Multimodal Standard 2026. Bild, Text, Audio, Video in einem Workflow. Spart die meiste Zeit gegenüber Single-Mode.**

[END 7:00]`,

  "s6-20": `**[0:00]** Effizienteste Nutzer:innen sind **nicht** Mono-Tool-Loyale — sondern strategisch Wechselnde.

**[0:30]** **Grund-Logik:**
- **ChatGPT für Brainstorming und Vielfalt** — schnell, viele Ideen
- **Claude für Tiefe und Sprache** — lange Texte, nuancierte Formulierungen, gründliche Analyse
- **Gemini für Workspace und Recherche** — Tabellen, Mails, Drive, aktuelle Web-Recherche
- **Perplexity für Quellen** — Recherche mit Quellen-Links, Faktencheck

**[1:15]** **Workflow-Beispiel UE-Konzeption:**
1. **Brainstorming in ChatGPT** — *"Welche Zugänge zu Thema X? 5 Optionen."* → schneller Output, viele Ideen
2. **Vertiefung in Claude** — *"Hier ist Option 3. Detailliere 6-stündige UE mit ausgearbeiteten Lernzielen."* → lange, gut formulierte Ausarbeitung
3. **Recherche in Perplexity** — *"Welche aktuellen Materialien seit 2024 mit Quellen-Links?"* → verifizierbare Quellen
4. **Tabelle in Gemini** — *"Bring den Plan in eine Tabelle, integriere in Google Drive."* → direkte Workspace-Integration

**Ergebnis:** UE in einer Stunde statt zwei.

[CUT TO: Talking Head]

**[2:35]** **Wann Tool-Switching?**
**Lohnt sich:** Mehrere Phasen · unterschiedliche Stärken nötig · Verifikation wichtig
**Lohnt sich nicht:** Kleine geschlossene Aufgabe · gerade KI-Einstieg · Zeitdruck (Switching kostet Sekunden)

**[3:15]** **Switching-Matrix:**

| Aufgabe | Erstes Tool | Zweites Tool |
|---|---|---|
| UE-Brainstorming | ChatGPT | Claude für Vertiefung |
| Aufsatz-Feedback | Claude | ChatGPT für Vergleichs-Analyse |
| Recherche mit Quellen | Perplexity | ChatGPT für Synthese |
| Bildgenerierung | ChatGPT (DALL-E) | Midjourney für höhere Qualität |
| Email-Drafting | Gemini (Workspace) | Claude für Schliff |
| Datenanalyse | ChatGPT (Code Interpreter) | Claude für Interpretation |

[CUT TO: Talking Head]

**[4:05]** **Praxis-Tipp: Verifikation durch zweites Tool.** ChatGPT-Antwort → Claude:
> *"Hier ist eine Antwort eines anderen KI-Tools auf die Frage X. Prüfe auf inhaltliche Korrektheit, logische Konsistenz, mögliche Halluzinationen."*

Findet oft Schwächen, die du übersehen hast.

**[4:50]** **Tool-Hygiene — drei Regeln:**
1. **Konsistente Logins** — Passwort-Manager
2. **Saubere Konversationen** — pro Tool und Aufgabe ein Chat
3. **Periodisches Aufräumen** — monatlich alte Chats archivieren, ungenutzte Custom GPTs deaktivieren

**[5:30]** Take-away: **Tool-Switching ist Strategie, nicht Untreue. Jedes Tool hat Stärken. Workflow-Logik vor Tool-Loyalität.**

[END 6:00]`,

  "s6-21": `**[0:00]** Eine der Lektionen mit der **höchsten Zeitersparnis** im ganzen Kurs. Bewertungs-Workflow für Hausaufgaben/Übungs-Materialien mit klaren Datenschutz- und Verantwortungs-Grenzen. Antonius hat diesen Workflow mit mir entwickelt.

**[0:40]** **Use-Case.** 25 SuS-Texte, klassisch: 3–4 Stunden Wochenend-Arbeit. Mit Workflow: 60–90 Minuten. KI macht mechanische Erstanalyse, du machst pädagogische Bewertung.

**[1:15]** **Workflow in sechs Schritten:**
1. SuS reichen Texte digital ein
2. Texte werden anonymisiert
3. Texte gehen durch deinen Feedback-Bot (aus Lektion 6.14)
4. Du liest die KI-Analysen kritisch und passt an
5. Du formulierst dein persönliches Feedback — mit KI-Unterstützung
6. Feedback wird an die SuS zurückgegeben

**[2:00]** **Schritt 1+2 — Eingang und Anonymisierung.** Vor der KI-Verarbeitung Find-and-Replace:
- SuS-Namen → "Schüler:in A/B/C..."
- Klassen-Bezeichnung → "Klasse X"
- Spezifische identifizierende Inhalts-Bezüge

Bei 25 Texten: 5–10 Minuten. Automatisierbar mit Word-Makro oder DSGVO-konformen KI-Tools.

**[3:00]** **Schritt 3 — Feedback-Bot.** Mehrere Texte gleichzeitig: *"Hier sind fünf anonymisierte Schüler:innen-Texte. Bitte analysiere jeden nach dem bekannten Schema. Markiere mit Schüler A bis E."* Claude verträgt das gut (großes Kontextfenster).

**[3:35]** Output: Fünf parallele Analysen, strukturiert nach deinem Schema. Zwei Minuten für fünf Texte.

**[4:00]** **Schritt 4 — Kritisches Lesen.** Hier deine pädagogische Verantwortung. Prüfst:
- Hat KI etwas Wichtiges übersehen? (Oft ja — klassen-spezifischer Kontext fehlt.)
- Zu hart/nachsichtig bewertet? Korrigiere.
- Verbesserungsvorschläge konkret genug? Schärfe.

Pro Analyse: 1–2 Min. Bei 25 SuS: 25–50 Min kritisches Lesen.

**[4:55]** **Schritt 5 — Persönliches Feedback.** Variante: *"Auf Basis dieser Analyse formuliere ein Feedback an die SuS. Drei Teile: gut, ausbaufähig, konkreter Tipp für nächsten Text. Max. 200 Wörter, freundlich-konkret."* Du passt an und ergänzt mit persönlichen Klassen-Beobachtungen.

**[5:40]** **Schritt 6 — Rückgabe.** Feedback an Original-Texte kleben — Papier oder digital. Anonymisierte Versionen löschen oder sicher speichern.

[CUT TO: Talking Head]

**[6:10]** **Bilanz:** Zeitersparnis 50–65 %. Datenschutz gewahrt. Pädagogische Verantwortung bei dir. Feedback-Qualität oft besser — KI stößt auf Aspekte, die du sonst übersehen hättest.

**[6:40]** Take-away: **Sechs Schritte. Anonymisierung, KI-Erstanalyse, kritische Prüfung, persönliches Feedback. 50–65 % Zeitersparnis. Datenschutz und pädagogische Verantwortung bleiben gewahrt.**

[END 7:00]`,

  "s6-22": `**[0:00]** Was passiert, wenn die KI **danebenliegt**? Qualitätssicherung, ohne die der Workflow nicht professionell ist.

**[0:35]** **Vier QS-Mechanismen.**

**Mechanismus 1 — Stichproben-Lesen.** Alle paar Texte: Originaltext **komplett selbst** lesen vor der KI-Analyse. Eigene Notizen. Dann vergleichen. So kalibrierst du deine Bewertung an der KI und siehst Schwächen.

**[1:15]** **Mechanismus 2 — Eigenständige Bewertung vor KI-Lesen.** Bei kritischen Texten (Tendenz-Note): erst ohne KI bewerten, dann mit KI vergleichen. Übereinstimmung = Vertrauen bestätigt. Abweichung = deine Bewertung gilt.

**[1:50]** **Mechanismus 3 — Zwei-KI-Kreuz-Check.** Heikle Bewertungen (Klausuren): ChatGPT **und** Claude. Übereinstimmung = höhere Wahrscheinlichkeit. Abweichung = sorgfältiger schauen.

**[2:25]** **Mechanismus 4 — Eltern-und-SuS-Transparenz.** Auf Klassenarbeit/Eltern-Brief:
> *"Diese Bewertung wurde mit Unterstützung von KI-Tools zur Erstanalyse erstellt. Die Bewertungs-Entscheidung und das Feedback stammen von der Lehrkraft."*

Wirkt aufmerksam-professionell statt heimlich-unsicher.

[CUT TO: Talking Head]

**[3:00]** **Beispiel aus meiner Praxis:** KI markierte Aufsatz eines 16-Jährigen als "sprachlich auffällig schwach". Tatsächlich: **dialektal gefärbt**. Klassisches Bias-Problem.

Mein Vorgehen: KI-Analyse für diesen Aspekt **ignorieren**, kulturelle Eigenheit als Stärke würdigen, Fall notieren für klarere Bot-Instructions.

**[4:00]** **Fünf typische KI-Fehlbewertungen:**
1. **Stilistische Glätte überbewertet.** KI mag glatte, mittelmäßige Texte; eigenständige, eckige Texte unterbewertet.
2. **Quellen-Treue überbewertet.** Auch oberflächliche Zitate gelobt.
3. **Nuancen übersehen.** Ironie, Subtext, Doppeldeutigkeiten.
4. **Kulturelle Eigenheiten als Fehler.** Dialekte, regionale Ausdrücke.
5. **Anforderungs-Niveau-Verwechslung.** Universitäts-Standards statt Mittelstufe. Im Prompt Stufe klar angeben.

[CUT TO: Talking Head]

**[5:00]** **Drei Praxis-Tipps für robuste QS:**
1. **Eigene Bewertungs-Brille beibehalten.** KI = Werkzeug, nicht Urteilsersatz.
2. **Regelmäßige Sanity-Checks.** Monatlich eine Klausur mit und ohne KI vergleichen.
3. **Im Kollegium austauschen.** Fachschaft-Erfahrungen teilen.

**[5:50]** **Was du niemals delegieren darfst:**
- **Notenentscheidung** — niemals.
- **Disziplinar-Konsequenzen** — niemals.
- **Kommunikation in heiklen Situationen** — niemals.
- **Bewertung bei besonderen Lernbedürfnissen** ohne deine Lektüre — niemals.
- **Eltern-Kommunikation bei Konflikten** — niemals.

**KI hilft dir. Sie entscheidet nicht.**

**[6:25]** Take-away: **Vier QS-Mechanismen — Stichproben, Eigenbewertung vor KI, Zwei-KI-Check, Transparenz. Fünf typische KI-Fehler kennen.**

[END 7:00]`,

  "s6-23": `**[0:00]** Eine Lektion zu **Notion** — Mischung aus Notizbuch, Datenbank, Wiki, Projektmanagement. Natürliche Heimat für KI-Workflows.

**[0:30]** **Was ist Notion?** notion.so. Privatnutzung kostenlos. Schul-Lizenzen verfügbar. Seiten + Datenbanken + Verlinkung.

**[1:00]** **Mein Notion-Workspace als Lehrer:**
- **Bereich 1 — Klassen.** Pro Klasse eine Seite, Datenbank mit Stunden/Materialien/Notizen
- **Bereich 2 — Prompt-Library** (Lektion 6.17)
- **Bereich 3 — UE-Planungen.** Pro UE eine Seite mit Tabellen-Verlauf
- **Bereich 4 — Schul-Organisation.** Konferenz-Protokolle, Aufgaben, Deadlines
- **Bereich 5 — Eigene Ressourcen.** Sammelnde Notizen, Artikel-Links, Buch-Notizen

[CUT TO: Talking Head]

**[1:45]** **Warum Notion + KI gut zusammenpassen:**
1. **Notion AI** eingebaut — KI-Texte direkt in Seiten generieren
2. **Strukturierte Datenbanken** ergänzen KI-Output
3. **Verlinkung** zwischen KI-Outputs und eigenen Notizen
4. **Teilbarkeit** im Kollegium

**[2:40]** **Notion AI in der Praxis.** In einer Seite: Space + "AI" → KI-Menu:
- **Continue writing** — KI führt Text fort
- **Summarize** — zusammenfassen
- **Brainstorm ideas** — Ideen liefern
- **Translate** — übersetzen

Anwendung: Konferenz-Stichworte → ausformulierter Bericht via Notion AI.

**[3:30]** **Empfohlene Templates:**
1. **Stundenplan-Datenbank** mit Filter
2. **Klassenbuch** (Anwesenheit, Notizen, Beobachtungen)
3. **Material-Bibliothek** zentral, getaggt, durchsuchbar
4. **Schul-Wissensdatenbank**
5. **Prompt-Library**

Im Download das **Notion-Lehrer-Template** mit allen fünf Bereichen.

**[4:25]** **Datenschutz bei Notion.** US-Unternehmen, US-Server:
- **Eigene Materialien** — unproblematisch
- **Anonymisierte Notizen** — unproblematisch
- **SuS-Namen** — kritisch, lieber nicht
- **SuS-Bewertungen** — kritisch, DSGVO-konforme Tools

Bei **Notion for Education** mit AV-Vertrag: andere Regeln. Frag Datenschutz-Person.

**[5:00]** **Alternativen:**
- **Obsidian** — lokal, Open Source, ohne Cloud (datenschutz-freundlich)
- **Microsoft OneNote** — bei Office 365
- **Anytype** — Open Source, Privacy-fokussiert

Logik überall ähnlich. Notion am leichtesten zu starten.

**[5:30]** Take-away: **Notion = natürliche Heimat für KI-Workflows. Strukturiert, verlinkt, teilbar, mit eingebauter KI.**

[END 6:00]`,

  "s6-24": `**[0:00]** Werkzeug = Verantwortung. **Sechs ethische Leitplanken** bei jedem Assistenten anlegen.

**[0:30]** **Leitplanke 1 — Bias-Bewusstsein.** Jeder Assistent hat den Bias der zugrundeliegenden KI **plus** den Bias deiner Instructions.

**Vor dem Teilen:** absichtliche Bias-Test-Fragen. Bei einem "Berufsorientierungs-Bot" testen: "Welche Berufe für Mädchen geeignet?" → stereotype Antwort? → Instructions nachbessern.

**[1:15]** **Leitplanke 2 — Datenschutz strukturell.** Wenn SuS/Eltern nutzen, Datenschutz Standard:
- In Instructions: "Frag nie nach Namen, Adressen, persönlichen Daten."
- Nur nötige Capabilities aktivieren
- Beim Sharing: Wer Zugriff? Was wird gespeichert?

**[2:00]** **Leitplanke 3 — Transparenz über KI-Nutzung.** Nutzer:innen sollen wissen, dass es **KI** ist.

In Instructions:
> *"Wenn du gefragt wirst, ob du KI bist, antworte ehrlich: Ja, ich bin ein KI-Assistent."*

Schafft Vertrauen, schützt vor Missverständnissen.

**[2:40]** **Leitplanke 4 — Notausgang-Prinzip.** Bei sensiblen Themen konsequent weiterleiten:
> *"Bei Anzeichen von emotionaler Krise oder Selbstgefährdung leitest du immer an Beratungsstellen weiter — Nummer gegen Kummer (116 111), Telefonseelsorge (0800-1110111). Du übernimmst keine therapeutische Funktion."*

**Diese Klausel rettet im Ernstfall Leben.**

**[3:25]** **Leitplanke 5 — Verantwortungs-Klärung.** Bei Falschem ist **du als Erstellerin** verantwortlich. Muss klar sein:
- Im Footer/Beschreibung: "Erstellt von [Name], Schule X. Rückfragen an…"
- Schul-internes Register eingesetzter Assistenten

**[4:05]** **Leitplanke 6 — Reversibility.** Jederzeit abschaltbar:
- Admin-Rechte behalten
- Nutzung dokumentieren
- Bei Problemen deaktivieren oder anpassen

Vermeide Einbettung in Systeme ohne deine Kontrolle.

[CUT TO: Talking Head]

**[4:40]** **Drei Mindest-Kriterien zum Teilen:**
1. Bias getestet, dokumentiert, in Instructions adressiert
2. Datenschutz strukturell eingebaut
3. Du als Verantwortliche:r identifizierbar + Abschaltung möglich

**[5:15]** **Im Zweifel zurückhalten.** Lieber zwei Wochen länger testen als einen kritischen Vorfall. Kolleg:innen-Zweit-Meinung holen.

**[5:45]** Take-away: **Sechs Leitplanken — Bias, Datenschutz, Transparenz, Notausgang, Verantwortung, Reversibility. Vor jedem Sharing prüfen. Im Zweifel zurückhalten.**

[END 6:00]`,

  "s6-25": `**[0:00]** Jetzt bist du dran. Wir haben fünf Assistenten gemeinsam gebaut — jetzt **dein erster eigener**.

**[0:25]** **Aufgabe:** Bau einen KI-Assistenten (Custom GPT, Claude Project, Gemini Gem). Soll eine konkrete, wiederkehrende Aufgabe abnehmen.

**Anforderungen:**
1. Klarer Use-Case (ein Satz)
2. Instructions nach 6-Block-Schema (Lektion 6.4)
3. Mindestens ein Knowledge-File
4. Mit fünf Test-Prompts geprüft
5. Ethik-Check nach Lektion 6.24

**[1:15]** **Use-Case-Ideen:**
1. **Operatoren-Coach** — Klausur-Aufgaben mit KMK-Operatoren
2. **Eltern-Brief-Generator** — Stichworte → kollegiale Briefe
3. **Stundenverlauf-Strukturierer**
4. **Vokabel-Quizzer** für Fremdsprachen
5. **Differenzierungs-Helfer** auf dein Fach zugeschnitten
6. **Konferenz-Vorbereiter**
7. **Recherche-Sparringspartner**

**[2:30]** **Schritt-für-Schritt — ca. 2 Stunden Aufwand:**
1. Use-Case festlegen (5 Min)
2. Tool wählen via Entscheidungsmatrix Lektion 6.10 (5 Min)
3. Instructions schreiben — 6 Blöcke (30 Min)
4. Knowledge-Files vorbereiten — 1–3 Dokumente (15 Min)
5. Aufbau im Tool — Setup Lektion 6.3/6.7/6.9 (15 Min)
6. Testen — 5 typische Anfragen, anpassen (30 Min)
7. Ethik-Check — 6 Leitplanken (10 Min)

**[3:30]** **Padlet-Einreichung:**
- Name oder Pseudonym
- Fach + Klassenstufe
- Use-Case in einem Satz
- Tool gewählt
- Link zum Assistenten (wenn teilbar) oder Screenshot
- Drei Sätze: gut geklappt / schwierig / nächstes Mal anders

[CUT TO: Talking Head]

**[4:15]** **Warum Padlet?** Lernen von anderen. Vokabel-Quizzer von Mathe-Kollegin → Adaption für Französisch denkbar. Teilbare Assistenten = Kollegium-Bildung in Aktion.

**[4:50]** **Selbst-Check:**
1. **Funktional** — macht er, was er soll?
2. **Differenziert** — geht er auf unterschiedliche Anfragen sinnvoll ein?
3. **Ethisch** — sechs Leitplanken angelegt?

Drei × "ja" → veröffentlichungsreif.

**[5:30]** **Empfehlung:** Nicht jetzt sofort. Erst restliche Lektionen anschauen. Dann ungestörten Termin in den nächsten 2 Wochen. Zwei Stunden volle Konzentration. **Ein guter Assistent > drei halbfertige.**

**[6:00]** **Wenn gestrandet:**
1. Lektion mit konkreter Plattform nochmal (6.3/6.7/6.9)
2. Eines der fünf Beispiele als Vorlage
3. Fragen im Diskussions-Bereich

**[6:30]** Take-away: **Dein erster Assistent — ~2 Std Investition. Klarer Use-Case, 6 Blöcke Instructions, Knowledge, Testen, Ethik-Check. Padlet einreichen.**

[END 7:00]`,

  "s6-26": `**[0:00]** Erster Assistent läuft. Sieben Optimierungs-Tipps für nächstes Level.

**[0:30]** **Tipp 1 — A/B-Testing der Instructions.** Zwei Versionen schreiben (länger/kürzer, ausführlicher/prägnanter). Mit fünf gleichen Anfragen testen. Behalte die bessere. Überraschung oft: kürzere ist besser.

**[1:15]** **Tipp 2 — Beispiele im System-Prompt.**
> *"Beispiel-Dialog: User: 'Ich brauche eine UE zu Thema X.' Assistent: 'Gerne. Zur besseren Strukturierung — welche Klassenstufe, welche Stundenzahl, welchen Schwerpunkt?'"*

Beispiele prägen Verhalten mehr als abstrakte Regeln.

**[1:55]** **Tipp 3 — Negative Beispiele.**
> *"Vermeide das folgende Verhalten: User: 'Mach mir die ganze Hausarbeit.' Falsche Antwort: 'Gerne, hier deine Hausarbeit...' Richtige Antwort: 'Lass uns lieber gemeinsam einen Schritt nach dem anderen machen.'"*

Negative Beispiele klären Grenzen besser als Regeln allein.

**[2:35]** **Tipp 4 — Output-Format-Vorlagen.**
> *"Antworte immer in folgendem Format: ## Übersicht (max. 3 Sätze) ## Schritte (nummeriert) ## Ressourcen (Liste mit Quellen)"*

Konsistente Outputs ohne Nachbearbeitung.

**[3:10]** **Tipp 5 — Feedback-Sammler einbauen.**
> *"Am Ende jeder Konversation fragst du: 'War diese Antwort hilfreich? Wenn nicht, was hätte besser sein können?' Antworten speicherst du in deinem Memory."*

Systematische Verbesserungs-Hinweise.

**[3:50]** **Tipp 6 — Regelmäßige Iteration.**
- **Wöchentlich** 5 Min: Was war unzufriedenstellend? Notiz
- **Monatlich** 30 Min: Instructions anpassen
- **Halbjährlich** 1 Std: Komplette Überarbeitung. Knowledge aktualisieren

**[4:30]** **Tipp 7 — Im Kollegium evaluieren.** Kurze Umfrage:
- Hast du den Assistenten genutzt?
- Was hat funktioniert?
- Was nicht?
- Was wünschst du dir?

**[5:00]** **Drei häufige Fehler:**
1. **Über-Optimierung.** Baue 10 echte Anfragen zwischen Iterationen.
2. **Funktions-Schwemme.** Lieber zweiten Assistenten bauen statt ersten überladen.
3. **Knowledge ungeprüft.** Test: Frag den Assistenten nach Inhalten aus dem PDF.

**[5:30]** Take-away: **Sieben Optimierungs-Tipps — A/B, Beispiele, negative Beispiele, Format-Vorlagen, Feedback-Sammler, Iteration, Kollegium-Evaluation.**

[END 6:00]`,

  "s6-27": `**[0:00]** Letzte inhaltliche Lektion. Ausblick auf 2027/2028.

**[0:35]** **Trend 1 — Agenten.** Bisher reaktiv (Frage → Antwort). Nächster Schritt: **mehrstufige autonome Aufgaben**.

Beispiel: *"Plane meine nächste UE zu Thema X — recherchiere Quellen, finde Materialien, baue UE, erstelle Arbeitsblätter, leg ins Drive."* Agent macht alles selbständig, kommt nur bei Entscheidungen zurück.

Erste Versionen 2026 (OpenAI Operator, Anthropic Computer Use). In zwei Jahren Standard.

**[1:35]** **Trend 2 — Multi-Agent-Systeme.** Mehrere Agenten arbeiten zusammen.

Beispiel Klausur-Korrektur: Agent 1 (Erstanalyse) → Agent 2 (Bewertungs-Sparringspartner) → Agent 3 (Feedback-Formulierer) → Agent 4 (Qualitätskontrolle). Ganzes Workflow-Produkt.

**[2:25]** **Trend 3 — Persönliche Assistenten mit langem Gedächtnis.** Assistenten kennen **dich**, deine Klasse, Vorlieben, Schwächen.

Geschichts-Assistent weiß: Karikaturen-Analysen bevorzugt, Sitzungs-Strukturen mit Plenum am Ende, 12c besonders aktiv, braucht Provokation.

Datenschutz wird **kritisch**. Aber Produktivität revolutionär.

**[3:15]** **Trend 4 — Native Multimodalität.** Heute: Bild geben, KI analysiert. In 2 Jahren: **Live-Gespräch** mit Bildschirm-Sharing, KI sieht und hört parallel, antwortet sofort.

Sora und Veo3 zeigen Video-Richtung. KI-Avatare mit **Live-Lippen-Synchronität**.

Für Lehrkräfte: Tutor-Bots als sichtbare Avatare — mit allen pädagogischen/ethischen Fragen.

**[4:00]** **Trend 5 — Open Source und Selbst-Hosting.** Llama, Mistral, DeepSeek holen rasant auf — und laufen **lokal**.

Für Schulen revolutionär: KI-Lösung auf **Schul-Server**. Keine Daten ins Ausland. Datenschutz-Probleme gelöst. In 2–3 Jahren normaler Markt.

[CUT TO: Talking Head]

**[4:45]** **Was machst du jetzt?**
1. **Keine Panik.** Grund-Kompetenzen übertragen sich. Custom GPTs bauen → Agenten orchestrieren.
2. **Bleib informiert.** Newsletter und Podcasts aus Lektion 5.20.
3. **Investier in Konzepte, nicht in Tools.** Prompt-Engineering, KI-Pädagogik, Bias-Reflexion bleiben übertragbar.

**[5:15]** **Konkreter Rat:** Jährlich eine Stunde KI-Stand reflektieren. Genutzte Tools? Wertvolle? Neue zum Testen?

**[5:35]** Take-away: **Fünf Trends — Agenten, Multi-Agent, persönliche Assistenten, Multimodalität, Open Source. Grundkompetenzen übertragen sich. Jährliche Reflexion einbauen.**

[END 6:00]`,
};
