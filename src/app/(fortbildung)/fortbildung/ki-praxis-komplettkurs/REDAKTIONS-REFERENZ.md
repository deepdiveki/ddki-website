# Redaktions-Referenz — KI-Praxis Komplettkurs

**Stand: Juli 2026** · Interne Referenz, nicht Teil des Kurses (wird nicht importiert).

Diese Datei ist die **einzige Quelle der Wahrheit** für wiederkehrende Begriffe und Zahlen im Kurs. Ziel: Widersprüche zwischen Lektionen vermeiden. Wenn du eine Zahl oder einen Begriff änderst, ändere ihn **hier zuerst**, dann in allen betroffenen Skripten/Downloads.

Betroffene Dateien: `_data/scripts/s1–s7.ts`, `_data/courseContent.ts`, `_data/downloadsContent.ts`.

---

## 1. Terminologie-Glossar

### 1.1 Das „Bausteine"-Problem (wichtig)

Das Wort **„Bausteine"** meint im Kurs an drei Stellen etwas Verschiedenes. Das verwirrt Lernende. **Feste Vokabeln verwenden:**

| Vorkommen | Kanonischer Begriff | Anzahl | Bestandteile |
|---|---|---|---|
| Crash-Kurs (s2-7) | **Prompt-Bausteine** | 4 | Rolle · Aufgabe · Kontext · Format |
| Modul I (s3-6) | **UE-Bausteine** | 6 | Rolle · Aufgabe · Rahmen · Schwerpunkt · Leitfragen · Output-Format |
| Modul IV (s6-2) | **Assistenten-Komponenten** | 3 (+1) | System-Prompt · Knowledge · Tools (+ Memory, plattformabhängig) |
| Modul IV (s6-4) | **Instruction-Blöcke** | 6 | Rolle · Aufgabe · Vorgehen · Stil/Format · Quellen · Don'ts |

**Regeln:**
- „Bausteine" nur noch für **Prompt-Bausteine** (4) und **UE-Bausteine** (6).
- Modul IV: die Architektur heißt **Komponenten**, die Instructions-Teile heißen **Blöcke** — nie „Bausteine".
- **Brücke 4 → 6** (fehlt bisher, in s3-6 ergänzen): Die 6 UE-Bausteine sind kein neues System, sondern eine Verfeinerung. Der eine Prompt-Baustein **Kontext** fächert sich bei großen Aufgaben in drei auf: **Rahmen, Schwerpunkt, Leitfragen**. Aus 4 werden 6 — gleiche Logik.
- **s6-3 Zeile 88** sagt „6-Bausteine-Prompt-Schema" — mehrdeutig. Gemeint sind die **6 UE-Bausteine aus Modul I**. Entweder so ausschreiben oder auf die Instruction-Blöcke umstellen.

### 1.2 KI-Grundbegriffe (einheitliche Kurz-Definitionen)

- **Sprachmodell / LLM:** Vervollständigungs-Maschine, die das wahrscheinlichste nächste Wort wählt. Kein Wahrheits-Automat.
- **Prompt:** Die Eingabe/Anweisung an die KI.
- **Token:** Text-Baustein (Wortteil), in dem das Modell rechnet.
- **Halluzination:** Plausibel klingende, aber falsche KI-Aussage.
- **Kontextfenster:** Wie viel Text das Modell gleichzeitig „im Kopf" hat.
- **System-Prompt / Instructions:** Dauerhafte Rollen-/Verhaltens-Anweisung eines Assistenten.
- **Knowledge / Wissensbasis:** Dokumente, auf die ein Assistent zugreift (≠ Training).
- **Custom GPT / Claude Project / Gemini Gem:** Selbstgebaute, wiederverwendbare Assistenten der jeweiligen Plattform.
- **Reasoning-/Thinking-Modell:** Modell-Variante, die vor der Antwort mehr „nachdenkt" (für komplexe, mehrstufige Aufgaben).

### 1.3 Schreibweisen

- **Schüler:innen / SuS** — „SuS" ist **Plural**. Niemals „eine SuS" / „einer SuS" → „ein:e Schüler:in".
- **Du-Ansprache** an die Lehrkraft durchgängig.
- Aufzählungen: „Erstens / Zweitens / **Drittens** / Viertens" (nicht „Dritte").
- Plattformnamen: **ChatGPT, Claude, Gemini** (keine Versionsnummern — siehe Regel 4.1).

### 1.4 Tool-Doppelrolle: Quickdraw & SoekiaGPT

Beide Tools erscheinen **an zwei Stellen mit unterschiedlicher Rolle** — das ist Absicht, kein Widerspruch:

| Tool | Crash-Kurs (Sektion 2) — *Selbst-Ausprobieren zum Verstehen* | Modul III (Sektion 5) — *Unterrichts-Einsatz nach Schulstufe* |
|---|---|---|
| **Quickdraw** (`quickdraw.withgoogle.com`) | **s2-2**: spielerischer KI-Erstkontakt; dient der **Abgrenzung** „KI-Oberbegriff (Mustererkennung) ≠ Sprachmodell". | Grundschule (SchoolStageFinder, Elternabend) als spielerische Methode. |
| **SoekiaGPT** (`soekia.ch`) | **s2-3**: Hands-on-Demo der **Nächstes-Wort-/Token-Mechanik** eines LLM. | Sek I (SchoolStageFinder) als Sprachmodell-Mechanik-Demo. |

**Regeln:** Quickdraw immer klar als *Bild-/Mustererkennung, kein Sprachmodell* einordnen (sonst falsches mentales Modell). SoekiaGPT = **SoekiaGPT** schreiben (nicht „Soekia GPT"). Links nur in Downloads/On-Screen-Karten, nicht als Versionsnummer/Preis (Regel 4.1).

---

## 2. Zahlen-Faktenblatt

> **Alle Preise/Zahlen sind volatil.** Als „ca."/Spannen behandeln, „Stand: Juli 2026" mitdenken. Möglichst aus den gesprochenen Skripten heraushalten (Regel 4.1) und in Downloads/Referenzen pflegen.

### 2.1 Abo-Preise (Solo, Stand Juli 2026)

| Produkt | Kanonischer Wert | Hinweis |
|---|---|---|
| ChatGPT Plus | **ca. 23 €/Monat** ($20) | Standard-Paid-Tier. **Nicht** „Pro". |
| ChatGPT Pro | **ca. 200 $/Monat** | Power-User-Tier. Im Kurs praktisch nie gemeint. |
| Claude Pro | **ca. 18 €/Monat** ($20) | |
| Gemini (Advanced) | **ca. 22 €/Monat** | Oft in Google-Workspace-/Schul-Lizenz. |
| „Mein Stack" (s7) | **ca. 40 €/Monat** | ChatGPT Plus + Claude Pro (+ Notion). |
| Drei Pro-Abos (s6-21) | **ca. 60 €/Monat** | |

**⚠️ Häufige Falle:** *ChatGPT Plus* (23 €) ≠ *ChatGPT Pro* (200 $). Debatten über „KI für alle" meinen den **Plus-Tier** — daher in s5-10 anbieter-neutral „Premium-KI".

### 2.2 Weitere Preise (Nebenschauplätze)

| Ding | Wert | Fundstelle |
|---|---|---|
| Headshot Pro | ca. **30–50 €** (einheitlich verwenden) | s5-2 / s5-4 |
| Ray-Ban Meta | ca. 350 € | s4-19 |
| KI-Detektor-Abo | ca. 10–15 $/Monat | s4-7 / s4-10 |

### 2.3 Zeit-/ROI-Angaben (Modul IV)

- **ROI-Rechnung Feedback-Bot (s6-1):** 100 Aufsätze × 10 Min = **1000 Min ≈ 16,7 Std** gespart − 2 Std Bau = **knapp 15 Std** (nicht „13").
- **Bauzeit pro Assistent:** einheitlich **ca. 30–120 Min** je nach Komplexität (s6-1: „~2 Std" für den komplexen Feedback-Bot; einfache Assistenten ~30 Min; Voraussetzungs-Lektion nennt „60–120 Min"). Als **Spanne** kommunizieren, nicht als Fixwert.
- **Instructions-Länge:** Empfehlung **300–800 Wörter** (s6-4). Die gezeigten Beispiel-Instructions sind bewusst **gekürzt** (~120–180 Wörter) — das im Skript einmal so labeln.

### 2.4 Feature-Matrix Plattformen (Stand Juli 2026)

| Fähigkeit | ChatGPT | Claude | Gemini |
|---|---|---|---|
| Live-Websuche | ✅ | ✅ | ✅ |
| Bildgenerierung | ✅ | ❌ (keine native) | ✅ |
| Code-Ausführung / Datenanalyse | ✅ | ✅ (Artifacts) | ✅ |
| Selbstgebaute Assistenten | Custom GPTs | Claude Projects | Gemini Gems |
| Memory (Cross-Chat) | Account-Funktion | ❌ (nicht in der Form) | ✅ (in Gems) |

> **Produktnamen vermeiden:** funktional „Bildgenerierung" statt „DALL-E", „Web-Suche" statt „Web Browsing". UI-Labels veralten quartalsweise.

### 2.5 KI-Kontextzahlen (Crash-Kurs `s2-kontext-tempo` / `s2-kontext-nutzung`)

Grafiken: Compositions `ModellZeitstrahl`, `AdoptionSpeed`, `PrivatVsArbeit`, `NutzungWofuer` (im ddki-videos-Projekt). **Volatil — als „ca."/Stand 2026 behandeln, in den Grafiken pflegen, nicht ins Skript festbrennen (Regel 4.1).**

| Fakt | Kanonischer Wert | Hinweis / Korrektur |
|---|---|---|
| Parameter-Wachstum | GPT-1 **117 Mio** → GPT-2 **1,5 Mrd** → GPT-3 **175 Mrd** → GPT-4 **~1,8 Bio (geschätzt)** | „170 Bio" war falsch; GPT-4 nicht offiziell, ~1,8 Bio geschätzt. GPT-4 = **März 2023** (nicht 2022). |
| Zeitstrahl aktuell halten | Transformer 2017 · … · **DeepSeek** (01/2025) · **GPT-5** (2025) · **Gemini 3** (11/2025) | Claude/Gemini/GPT-5 ergänzt; bis 2026 fortgeschrieben. |
| 100 Mio Nutzer | Netflix 3,5 J · Twitter 2 J · Facebook 10 Mon · Spotify 5 Mon · Instagram 2,5 Mon · **ChatGPT 2 Mon** | **„5 Tage" gilt für 1 Mio, nicht 100 Mio.** 100 Mio ≈ 2 Monate (Jan 2023) — trotzdem **schnellste Consumer-App aller Zeiten** (UBS). „5 Tage" nur als 1-Mio-Callout. |
| KI-Nachrichten/Tag | **451 Mio → 2,6 Mrd** (Jun 2024 → Jun 2025, ~6×) | Quelle: OpenAI-Studie. |
| Arbeit/Privat | Nicht-Arbeit **53 % → 73 %** | „Privat überholt Arbeit". |
| Top-Nutzungsgründe | Praktische Anleitung **28,8 %** · Info **24,4 %** · Schreiben **23,9 %** · **Tutoring/Lehren ~10 %** | Quelle: **OpenAI, „How People Use ChatGPT" (15.09.2025)** — Chatterji, Cunningham, Deming et al. (OpenAI/Duke/Harvard). |

---

## 3. Inkonsistenzen-Register

Status der im Review gefundenen Widersprüche.

| # | Thema | Soll-Wert | Fundstellen | Status |
|---|---|---|---|---|
| 1 | ROI-Rechnung | 1000 Min − 2 Std = **knapp 15 Std** | s6-1 | ✅ gefixt |
| 2 | Plus/Pro-Verwechslung | anbieter-neutral „Premium-KI" | s5-10 (Titel/Body/Übergang) | ✅ gefixt |
| 3 | Memory als 4. Baustein | plattformabhängig, nicht universell | s6-2, s6-26 | ✅ gefixt |
| 4 | „DALL-E" als Capability | „Bildgenerierung" | s6 (mehrfach), s7 | ✅ gefixt |
| 5 | Ray-Ban „Knochenleitung" | offene Ohr-Lautsprecher | s4-11, s4-19 | ✅ gefixt |
| 6 | Spiralcurriculum-Stufen | **4 Stufen** (nicht 5) | s5-12/15/16, spiralcurriculum-karte | ✅ gefixt |
| 7 | Gemini-Vorfall (nicht DALL-E) | Google Gemini 2024 | s5-8 | ✅ gefixt |
| 8 | „Bausteine" 4/6/Komponenten | feste Vokabeln (§1.1) | s2-7, s3-6, s6-2, s6-4 | ✅ gefixt (Modul IV → „Komponenten") |
| 9 | Brücke 4→6 Bausteine | Erklärsatz ergänzen | s3-6 | ✅ gefixt |
| 10 | Headshot-Preis | einheitlich 30–50 € | s5-2 vs. s5-4 | ⚠️ offen (Detail) |
| 11 | Umweltkosten fehlten | eigene Lektion | s5-9b | ✅ ergänzt |

---

## 4. Redaktionsregeln (evergreen)

**4.1 Keine verderblichen Spezifika ins gesprochene Skript.** Alles, was quartalsweise altert, gehört in Downloads/Referenzen oder wird neutral-funktional formuliert:
- **Versionsnummern** vermeiden (die Grundentscheidung des Kurses — beibehalten).
- **Produktnamen/UI-Labels** funktional formulieren („Bildgenerierung", „Web-Suche").
- **Preise, konkrete Datumsangaben, benannte Communities/Links** → in Download-Referenzen.

**4.2 „Stand:"-Denken.** Wo eine Zahl/ein Fakt doch ins Skript muss: als „ca."/Spanne und mit implizitem Aktualitäts-Vorbehalt.

**4.3 Datenschutz-Demos immer anonymisiert als Default.** In jeder Vorführung Platzhalter („Schülerin A/B") von Anfang an, echte Namen nie als nachträglicher Zusatz.

**4.4 Feature-Versprechen hedgen.** Besonders bei Bild („beschriftet in 30 Sek."): auf reale Schwächen (Text-in-Bild) hinweisen.

**4.5 Rechtlich heikle Ratschläge absichern.** Prüfungsrecht, Täuschungsvorwürfe, KI-Detektoren: nie als Beweismittel, immer auf Schul-/Prüfungsrecht verweisen, Bias-Gruppen mitdenken.

**4.6 Redundanz dosieren.** Kern-Botschaften (Datenschutz, Iteration) einmal als „Kern-Baustein" definieren, dann nur lektionsspezifische Deltas — nicht wortgleich wiederholen.
