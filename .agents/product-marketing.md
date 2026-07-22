# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-07-20

> **Status: Entwurf aus der Website-Copy abgeleitet.** Alles mit ❓ markierte ist eine Annahme, die Björn bestätigen oder korrigieren muss — insbesondere Preise, Kennzahlen und Wettbewerb. Nichts hier stammt aus Kundeninterviews.

## Product Overview

**One-liner:** KI-Fortbildungen und DSGVO-konforme KI-Software für Schulen — von Lehrkräften für Lehrkräfte.

**What it does:** DeepDiveKI verbindet zwei Angebote, die sich gegenseitig verkaufen: praxisnahe Lehrerfortbildungen zu KI, Digitalisierung und Pädagogik (Online, Inhouse-SchiLf, pädagogische Tage, Keynotes) und eine Software-Suite für Schulen (DeepChat als KI-Chat für Unterricht und Verwaltung, KI-Schulbüro als Website-Chatbot, Schulwebsites). Fortbildungsteilnehmende bekommen DeepChat datenschutzkonform gestellt — die Fortbildung ist der Land-and-Expand-Kanal für die Software.

**Product category:** Zwei Regale gleichzeitig — „Lehrerfortbildung / SchiLf-Anbieter" und „KI-Software für Schulen". Die Kombination aus einer Hand ist die eigentliche Kategorie und der Grund, warum Referenzkunden bleiben.

**Product type:** Dienstleistung (Fortbildung) + SaaS (DeepChat, KI-Schulbüro) + Projektgeschäft (Schulwebsites). Rechtsform GmbH, HRB 189193, Sitz Hamburg.

**Business model:**
- DeepChat Einzellizenz **7,99 €** — Self-Service über Stripe. ❓ Periodizität fehlt in der Copy: monatlich oder einmalig?
- DeepChat Schullizenz **ab 59,99 €**, „abhängig von Kollegiumsgröße" — über Anfrage. ❓ pro Monat? pro Jahr?
- KI-Schulbüro (Standard + Premium): „Auf Anfrage"
- Fortbildungen: kein Preis öffentlich, Buchung ausschließlich über Anfrage ❓
- Schulwebsites: Projektpreis ❓
- KI Escape Game: Lizenzverkauf via Stripe, Kauf-Tab derzeit hinter Feature-Flag deaktiviert
- **Förderfähigkeit als Preis-Hebel:** Startchancen-Programm und DigitalPakt 2.0 (dauerhafter Banner) — der Käufer zahlt oft nicht aus dem eigenen Budget.

**Beobachtung:** Es gibt genau *einen* Self-Service-Kaufpfad (7,99 € Einzellizenz). Alles andere ist beratungsgetrieben. Das ist für institutionelle Käufer stimmig, deckelt aber die Conversion bei Einzellehrkräften.

## Target Audience

**Target companies:** Allgemeinbildende Schulen aller Formen (Schwerpunkt Gymnasien/Sek I+II), Studienseminare, sowie institutionelle Käufer eine Ebene darüber: **Schulträger, Medienzentren, Bundesländer, Hochschulen**. Geografisch: Niedersachsen mit eigenem Funnel (NLC-Integration), Standort und Herkunftsmarke Hamburg.

**Decision-makers:**
- **Schulleitung / Ständige Vertretung** — entscheidet über SchiLf und pädagogische Tage
- **Didaktische Leitung / Fachbereichsleitung** — bringt Themen ein
- **Schulträger / Medienzentrum / Landesinstitut** — kauft in Volumen, entscheidet über Landeslizenzen
- **Einzelne Lehrkraft** — kauft die 7,99-€-Lizenz selbst, ist aber vor allem *Nutzer* und Fürsprecher

**Primary use case:** Ein Kollegium soll KI im Unterricht einsetzen, aber niemand weiß rechtssicher wie — und die verfügbaren Tools sind datenschutzrechtlich nicht freigegeben.

**Jobs to be done:**
- „Bring mein Kollegium auf einen gemeinsamen Stand bei KI, ohne dass ich das selbst erarbeiten muss."
- „Gib mir ein KI-Werkzeug, das ich Schülerinnen und Schülern guten Gewissens vorsetzen darf."
- „Nimm mir Verwaltungs- und Korrekturzeit ab."
- „Hilf mir, Fördermittel (Startchancen / DigitalPakt) sinnvoll auszugeben."

**Use cases:**
- Pädagogischer Tag / SchiLf für das ganze Kollegium (4-Schritt-Prozess: Kennenlernen → individuelles Programm → Durchführung vor Ort → Materialien zur Weiterarbeit)
- Einzelmodule à 3 Stunden, online, aus einem Katalog von 19 Kursen in 6 Kategorien
- DeepChat für Unterrichtsvorbereitung, Arbeitsblatt-Generierung, Chat mit PDF, KI-Assistenten-Builder, Persona-Chat
- KI-Schulbüro beantwortet Elternfragen (Anmeldung Klasse 5, Mensa, Busanbindung, Vertretungsplan) — Premium in 35 Sprachen
- Mentoring-Simulator für Referendariat und Studienseminare
- Keynotes für Konferenzen und Schulveranstaltungen

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---|---|---|---|
| **Schulleitung** (Decision Maker) | Rechtssicherheit, Außenwirkung, Kollegium mitnehmen | Steht in der Verantwortung, wenn Datenschutz schiefgeht; Kollegium ist gespalten zwischen Begeisterten und Verweigerern | Ein Anbieter für Fortbildung *und* Tool, DSGVO-konform, förderfähig |
| **Lehrkraft** (User + Champion) | Zeitersparnis, sofort anwendbare Ideen, nicht bloßgestellt werden | Wenig Zeit, oft geringe Technikaffinität, Angst „das Falsche" zu tun | „Von Lehrenden für Lehrende", praxisnah, funktioniert auch für Technikferne |
| **Schulträger / Medienzentrum** (Financial Buyer) | Skalierbarkeit, Vergaberecht, Serverstandort | Muss für viele Schulen gleichzeitig entscheiden | Maßgeschneiderte Lösungen für Träger, Bundesländer, Hochschulen |
| **Datenschutzbeauftragte:r** (Technical Influencer) | Auftragsverarbeitung, Serverstandort, Datenflüsse | Muss freigeben oder blockieren | EU-/Deutschland-Hosting, DSGVO-Konformität als Kernversprechen |

## Problems & Pain Points

**Core problem:** Schulen stehen unter Druck, KI einzusetzen, dürfen die verbreiteten Tools aber datenschutzrechtlich nicht nutzen — und das Kollegium hat weder Zeit noch Ausbildung, sich das selbst zu erarbeiten.

**Why alternatives fall short:**
- ChatGPT & Co.: rechtlich nicht freigegeben, Schülerdaten problematisch, kein pädagogischer Rahmen
- Klassische Fortbildungsanbieter: pädagogisch versiert, aber technisch nicht auf KI-Höhe; liefern kein Werkzeug mit
- Reine Ed-Tech-Anbieter: liefern ein Tool, aber keine Befähigung — das Kollegium nutzt es nicht
- Landes-Tools (z.B. AIS.chat): vorhanden, aber ohne Schulung bleibt die Nutzung flach

**What it costs them:** Verlorene Vorbereitungs- und Korrekturzeit; Fördermittel, die ungenutzt verfallen; eine Schere im Kollegium zwischen KI-Nutzenden und Abgehängten; Reputationsrisiko bei einem Datenschutzvorfall.

**Emotional tension:** Sorge, etwas rechtlich Falsches zu tun. Scham, technisch nicht mitzukommen („Ich bin kein Profi beim Thema Digitales"). Erschöpfung — KI ist die x-te Anforderung obendrauf.

## Competitive Landscape

❓ **Dieser Abschnitt ist die größte Lücke — er ist aus der Website nicht ableitbar und muss von Björn kommen.**

**Direct:** Andere KI-Fortbildungsanbieter für Schulen sowie Landesinstitute mit eigenem Angebot. ❓ Wer taucht in Ausschreibungen tatsächlich neben euch auf?

**Secondary:** Landesweit bereitgestellte KI-Chatbots (AIS.chat, Telli, fobizz, SchulKI). Bemerkenswert: DeepDiveKI positioniert sich hier *nicht* als Gegner — es gibt eine explizit „unabhängige Fortbildung ohne Verbindung zum Anbieter" zu AIS.chat. Das ist eine bewusste Enabler-Rolle statt Verdrängungswettbewerb.

**Indirect:** Nichts tun / selbst erarbeiten; einzelne technikaffine Lehrkräfte, die intern schulen; kostenlose YouTube-/Fortbildungsangebote.

## Differentiation

**Key differentiators:**
1. **Fortbildung + Software aus einer Hand** — das Referenzzitat der DBR Hannover belegt genau diese Kombination
2. **Von Lehrenden für Lehrende** — beide Geschäftsführer sind aktive Lehrkräfte, nicht Ed-Tech-Quereinsteiger
3. **DSGVO-Konformität und EU-/Deutschland-Hosting** als Produktkern, nicht als Fußnote
4. **Förderfähig** über Startchancen-Programm und DigitalPakt 2.0
5. **Made in Hamburg** — deutscher Anbieter, kurze Wege, „gut erreichbar"
6. **Anbieterneutral** — schult auch auf fremde Landes-Tools

**How we do it differently:** Fortbildung und Werkzeug greifen ineinander. Teilnehmende bekommen DeepChat gestellt und können das Gelernte am Montag anwenden, statt es zu vergessen.

**Why that's better:** Klassisches SchiLf-Problem gelöst — der Transfer scheitert sonst daran, dass nach der Fortbildung das Werkzeug fehlt.

**Why customers choose us:** Ein Ansprechpartner, rechtssicher, förderfähig, und die Leute vorne stehen selbst im Unterricht.

## Objections

| Objection | Response |
|---|---|
| „Wir haben doch schon [Landes-Tool]." | Wir schulen anbieterneutral darauf — der AIS.chat-Kurs ist ausdrücklich unabhängig. Das Tool zu haben heißt nicht, dass das Kollegium es nutzt. |
| „Ist das datenschutzkonform?" | Verarbeitung und Speicherung auf deutschen bzw. europäischen Servern. Alle Produkte DSGVO-konform. |
| „Dafür haben wir kein Budget." | Förderfähig über Startchancen-Programm und DigitalPakt 2.0. |
| „Unser Kollegium ist technikfern." | „Der DeepChat ist einfach zu bedienen, auch für technikferne Kolleg:innen." (Schulleiter, Hamburg) — keine Vorkenntnisse bei 12 von 19 Kursen. |
| ❓ Weitere aus echten Verkaufsgesprächen | *Bitte ergänzen — die obigen sind aus der Copy abgeleitet, nicht aus Gesprächen.* |

**Anti-persona:** Schulen, die nur ein Tool ohne Begleitung wollen und Fortbildung als Kostenfaktor sehen — dort verpufft die Wirkung und die Nutzung bleibt niedrig. Ebenso Einzelpersonen ohne schulischen Kontext.

## Switching Dynamics

**Push:** Druck von Ministerium/Schulaufsicht, KI zu adressieren; Fördermittel mit Verfallsdatum; Kollegium nutzt bereits privat ChatGPT im Graubereich; Überlastung bei Korrektur und Verwaltung.

**Pull:** Ein Anbieter für alles; rechtssicher; förderfähig; „die verstehen Schule, weil sie selbst unterrichten"; konkrete Referenzschulen in der Nähe.

**Habit:** Etablierte Fortbildungswege über Landesinstitute; „das machen wir seit Jahren so"; vorhandene Website-Agentur; Skepsis gegenüber Neuanschaffungen.

**Anxiety:** Datenschutzvorfall mit Schülerdaten; Geld ausgeben für etwas, das das Kollegium nicht annimmt; Abhängigkeit von einem kleinen Anbieter; Vergaberecht.

## Customer Language

**How they describe the problem:**
- „Ich bin kein Profi beim Thema Digitales."
- „Auch für technikferne Kolleg:innen."
- ❓ *Echte Verbatims aus Gesprächen fehlen — die Testimonials beschreiben die Lösung, nicht das Problem.*

**How they describe us:**
- „So ein Hilfslehrer ist Gold wert." (Lehrer, Köln)
- „Habe meine Klassenfahrt mit dem DeepChat geplant. Das hat mir viel Zeit gespart." (Lehrerin, Hamburg)
- „Ich spare mit dem DeepChat viel Zeit bei administrativen Aufgaben." (Lehrkraft, NRW)
- „Ich finde das kuratierte Prompting super." (Lehrer, Stuttgart)
- „Das Deep-Dive-Team ist gut erreichbar, Wünsche und Anliegen werden zeitnah umgesetzt." (Rektorin, DBR Hannover)
- „Die KI-Fortbildung hat uns alle inspiriert." (Studienseminar Göttingen)

**Words to use:** praxisnah, sofort anwendbar, datenschutzkonform, DSGVO-konform, EU-Hosting, entlasten, Zeit sparen, von Lehrenden für Lehrende, förderfähig, Kollegium, Schulalltag, rechtssicher, Made in Hamburg.

**Words to avoid:** „revolutionär", „disruptiv", „Game-Changer" — passt nicht zum sachlichen Register und weckt bei Schulleitungen Misstrauen. Keine Superlative ohne Beleg. „Künstliche Intelligenz ersetzt Lehrkräfte" oder Framings, die Angst um den Beruf auslösen.

**Glossary:**
| Term | Meaning |
|---|---|
| DeepChat | Eigener KI-Chat für Unterricht und Schulorganisation |
| KI-Schulbüro | Chatbot auf der Schulwebsite für Eltern-/Verwaltungsanfragen |
| DDKI Auto-Select | Technologie, die automatisch das passende Sprachmodell wählt |
| SchiLf | Schulinterne Lehrerfortbildung |
| Pädagogischer Tag | Ganztägige Inhouse-Fortbildung für das Kollegium |
| Startchancen-Programm | Bund-Länder-Förderprogramm für Schulen in schwieriger Lage |
| DigitalPakt 2.0 | Förderprogramm für digitale Schulinfrastruktur |
| NLC | Niedersächsisches LernCenter — Anmeldeplattform für Niedersachsen |
| LI Superhirn | KI-Assistent für Studierende, Referendare, Lehrkräfte |

## Brand Voice

**Tone:** Sachlich-professionell, warm, nie marktschreierisch. Keine Ausrufezeichen außer im Förder-Banner.

**Style:** **Siezen in der gesamten Marketing-Copy.** ⚠️ Inkonsistenz: die Websites-Seite und der komplette KI-Praxis-Komplettkurs duzen („Du brauchst keine teuren Abos"). Das sollte bewusst entschieden werden — Vorschlag: Marketing siezt, Produkt/Kurs darf duzen, aber dann konsequent.

Auffälliges Stilmittel: Dreiklang-Aufzählungen („Praxisnah, datenschutzkonform und mit Fokus auf Mehrwert"). Sparsam einsetzen, sonst wird es zur Masche.

⚠️ Gendering uneinheitlich: „Lehrer:innen", „Kolleg:innen", „Schüler*innen" und generisches „Lehrkräfte" mischen sich. Eine Konvention festlegen.

**Personality:** Kollegial, kompetent, bodenständig, verlässlich, unaufgeregt.

**Visuelle Tonalität dual:** Fortbildung hell/lila/luftig („Bildungsträger"), Software dark/Glow/bold („Tech-Startup"). Bewusste Trennung.

## Proof Points

**Metrics:** ⚠️ **Die veröffentlichten Zahlen widersprechen sich und den Daten im Code — vor der Weiterverwendung klären:**

| Zahl | Wo | Problem |
|---|---|---|
| 254+ Fortbildungen | HeroStats | ❓ durchgeführte Veranstaltungen? |
| 12 Themenbereiche | HeroStats | `categories.ts` kennt nur **6** |
| 40+ Kursthemen | CardDetail | `courses.ts` enthält **19** |
| 500+ Teilnehmer | CardDetail | ❓ |
| 98% Zufriedenheit | HeroStats + CardDetail | ❓ woraus erhoben? |
| 35 Sprachen | Schulbüro Premium | plausibel |

**Customers (namentlich, belastbar):** DBR Hannover, Robert-Koch-Schule Clausthal-Zellerfeld, Ratsgymnasium Goslar, Oberharzgymnasium Braunlage, Studienseminar für das Lehramt an Gymnasien Göttingen.

**Testimonials:**
> „Im Rahmen des Startchancenprogramms haben wir unter anderem mit der angebotenen Schul-KI gearbeitet und uns unsere Homepage neu konzipieren lassen. […] Die Schul-KI wird von den Kolleginnen und Kollegen gut angenommen und erleichtert den datenschutzkonformen Unterricht sehr. […] Wir können die Zusammenarbeit sehr empfehlen." — **C. Weller, Rektorin der DBR Hannover** *(stärkstes Zitat: belegt beide Zweige plus Förderfähigkeit)*

> „Auch die beteiligten Kollegien des Ratsgymnasiums Goslar sowie des Oberharzgymnasiums Braunlage waren von der Sachkompetenz, der Praxisnähe und der Vielfalt der vorgestellten Anwendungen und Möglichkeiten überzeugt." — **Jens Wachsmuth, Ständiger Vertreter des Schulleiters**

> „Die KI-Fortbildung hat uns alle inspiriert und tatsächlich – wie der Name schon sagt – in die Tiefen der KI (inkl. Escape Game) geführt." — **Anne Schumann, Leiterin des Studienseminars f. d. Lehramt an Gymnasien Göttingen**

**Value themes:**
| Theme | Proof |
|---|---|
| Rechtssicherheit | EU-/DE-Hosting, DSGVO-Konformität, Calendly nur nach Click-to-Load |
| Zeitersparnis | Lehrkraft-Testimonials zu Klassenfahrt- und Verwaltungsentlastung |
| Praxisnähe | Wachsmuth-Zitat, 3-Stunden-Module, „keine Vorkenntnisse" bei 12/19 Kursen |
| Glaubwürdigkeit | Geschäftsführer sind aktive Lehrkräfte |
| Beide Zweige aus einer Hand | Weller-Zitat |
| Förderfähigkeit | Startchancen + DigitalPakt, im Weller-Zitat bestätigt |

⚠️ Die 6 Partner-Logos haben nur generische Alt-Texte („Partnerschule 1–7") — die Referenzen sind visuell da, aber für SEO und Glaubwürdigkeit textlich ungenutzt.

## Goals

**Business goal:** ❓ Bestätigen. Vermutet: Wachstum bei institutionellen Abschlüssen (Schullizenzen, pädagogische Tage, Trägerverträge) statt Einzellizenzen — dort liegt der Umsatz je Abschluss.

**Conversion action:** Primär **Kontaktanfrage** (Formular oder Calendly). Sekundär: Registrierung auf `plattform.deepdive-ki.de`, DeepChat-Trial auf `toolbox.deepdive-ki.de`, Stripe-Kauf der Einzellizenz.

**Current metrics:** ❓ Keine Analytics-Daten verfügbar. Google Ads/gtag ist im Root-Layout aus DSGVO-Gründen auskommentiert — es gibt derzeit **kein aktives Conversion-Tracking**. Search-Console-Property ist verifiziert.

## Offene Fragen an Björn

1. **Preise:** Ist die 7,99 € Einzellizenz monatlich oder einmalig? Gleiche Frage für die 59,99 € Schullizenz. Was kostet ein pädagogischer Tag / ein Einzelmodul typischerweise?
2. **Wettbewerb:** Wer taucht in Ausschreibungen und Gesprächen tatsächlich als Alternative auf?
3. **Kennzahlen:** Welche der Zahlen (254+, 12, 40+, 500+, 98%) sind belastbar und wie erhoben? Die widersprüchlichen sollten korrigiert oder entfernt werden.
4. **Einwände:** Was sind die drei häufigsten echten Einwände aus Verkaufsgesprächen?
5. **Geschäftsziel:** Wo soll das Wachstum herkommen — Einzellehrkräfte, Schulen, oder Träger/Länder?
6. **Duzen/Siezen:** Bewusste Entscheidung oder gewachsene Inkonsistenz?

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-07-20) — Initialer Entwurf, vollständig aus Website-Copy, `courses.ts`, `categories.ts`, Testimonials und Pricing-Komponenten abgeleitet. Wettbewerb, Preis-Periodizität, Kennzahlen-Validierung und Geschäftsziel stehen offen.
