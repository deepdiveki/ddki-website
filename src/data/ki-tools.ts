/**
 * Neutrale Liste der großen KI-Tools mit Login-Links. Grundlage der
 * öffentlichen Seite /ki-tools, auf die die Fortbildungsfolien per QR-Code
 * verweisen. Bewusst produktunabhängig: kein DeepDiveKI-Produkt in der Liste.
 */

export type KiTool = {
  name: string;
  vendor: string;
  country: string;
  url: string;
  /** Kurz: Wofür ist das Tool typischerweise gut? */
  text: string;
  /** Hinweis zu Konto oder Datenverarbeitung. */
  note: string;
  /** Europäischer Anbieter (nur Hinweis, kein Datenschutz-Gütesiegel). */
  eu?: boolean;
};

export const KI_TOOLS_URL = "https://www.deepdive-ki.de/ki-tools";
export const KI_TOOLS_HOST = "deepdive-ki.de/ki-tools";
export const KI_TOOLS_UPDATED = "Oktober 2026";

export const KI_CHATS: KiTool[] = [
  {
    name: "ChatGPT",
    vendor: "OpenAI",
    country: "USA",
    url: "https://chatgpt.com",
    text: "Der bekannteste KI-Chat. Texte, Ideen, Bilder, Dateien auswerten.",
    note: "Kostenlos nutzbar, Konto empfohlen.",
  },
  {
    name: "Claude",
    vendor: "Anthropic",
    country: "USA",
    url: "https://claude.ai",
    text: "Stark bei langen Texten und interaktiven Materialien (Artefakte).",
    note: "Kostenlos nutzbar, Konto nötig.",
  },
  {
    name: "Gemini",
    vendor: "Google",
    country: "USA",
    url: "https://gemini.google.com",
    text: "Eng mit Google Docs, Drive und YouTube verbunden.",
    note: "Google-Konto nötig.",
  },
  {
    name: "Copilot",
    vendor: "Microsoft",
    country: "USA",
    url: "https://copilot.microsoft.com",
    text: "KI-Chat in Windows, Edge und Office. Oft schon in der Schule vorhanden.",
    note: "Ohne Konto eingeschränkt nutzbar.",
  },
  {
    name: "Le Chat",
    vendor: "Mistral AI",
    country: "Frankreich",
    url: "https://chat.mistral.ai",
    text: "Europäischer KI-Chat mit eigenem Modell. Schnell, mehrsprachig.",
    note: "Kostenlos nutzbar, Konto nötig.",
    eu: true,
  },
  {
    name: "Perplexity",
    vendor: "Perplexity AI",
    country: "USA",
    url: "https://www.perplexity.ai",
    text: "Recherche mit Quellenangaben. Gut zum Prüfen von KI-Behauptungen.",
    note: "Ohne Konto eingeschränkt nutzbar.",
  },
  {
    name: "DeepSeek",
    vendor: "DeepSeek",
    country: "China",
    url: "https://chat.deepseek.com",
    text: "Offenes Modell aus China, kostenlos im Chat.",
    note: "Daten werden in China verarbeitet.",
  },
  {
    name: "Grok",
    vendor: "xAI",
    country: "USA",
    url: "https://grok.com",
    text: "KI-Chat von xAI, auch in X integriert.",
    note: "Konto nötig.",
  },
];

export const SCHOOL_TOOLS: KiTool[] = [
  {
    name: "telli",
    vendor: "FWU · Bundesländer",
    country: "Deutschland",
    url: "https://telli.schule",
    text: "Gemeinsamer KI-Assistent mehrerer Länder für Lehrkräfte und Lernende.",
    note: "Zugang über das eigene Bundesland.",
    eu: true,
  },
  {
    name: "fobizz",
    vendor: "fobizz",
    country: "Deutschland",
    url: "https://fobizz.com",
    text: "Fortbildungsplattform mit KI-Werkzeugen, Datenschutzfiltern und Klassenräumen.",
    note: "Lizenz über Schule oder Land.",
    eu: true,
  },
  {
    name: "SchulKI",
    vendor: "SchulKI",
    country: "Deutschland",
    url: "https://schulki.de",
    text: "KI-Chat für Schulen mit Klassenräumen und Rollen für Lehrkräfte und Lernende.",
    note: "Lizenz über die Schule.",
    eu: true,
  },
];
