const OPENAI_URL = "https://api.openai.com/v1/responses";

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{ type?: string; text?: string }>;
  }>;
  error?: { message?: string };
};

const extractOutputText = (payload: OpenAIResponse) => {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }
  const outputBlocks = payload.output ?? [];
  for (const block of outputBlocks) {
    const content = block.content ?? [];
    for (const item of content) {
      if ((item.type === "output_text" || item.type === "text") && item.text) {
        return item.text.trim();
      }
    }
  }
  return "";
};

const SYSTEM_PROMPT = `Du bist ein erfahrener Fachdidaktiker und KI-Literacy-Experte. Du erhältst die Logbuch-Einträge eines Teilnehmers aus einem Escape-Game-Tutorial zum Thema KI in der Bildung.

Deine Aufgabe:
1. Gehe kurz auf die wesentlichen Notizen des Teilnehmers ein (max. 3-4 Sätze).
2. Prüfe, ob wichtige Aspekte fehlen — z.B. kritische Reflexion, ethische Perspektiven, Praxisbezug, Differenzierung zwischen KI-Fähigkeiten und -Grenzen.
3. Führe eine kurze kritische Diskussion (3-5 Sätze), die den Teilnehmer zum Weiterdenken anregt.

Formatierung:
- Schreibe auf Deutsch.
- Nutze klare Absätze mit Überschriften: "Zusammenfassung", "Fehlende Aspekte", "Kritische Diskussion".
- Halte dich kurz — der gesamte Kommentar soll auf eine halbe Seite passen (max. 250 Wörter).
- Kein Markdown, keine Listen mit Aufzählungszeichen, keine Emojis. Nutze Fließtext mit Absätzen.
- Sei konstruktiv und wertschätzend, aber ehrlich.`;

export async function POST(request: Request) {
  try {
    const { entries, lessonTitles, dimensionTitle } = (await request.json()) as {
      entries: Record<string, string>;
      lessonTitles: string[];
      dimensionTitle: string;
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // Build user message from logbook entries
    const entryLines = Object.entries(entries)
      .filter(([, v]) => v.trim())
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([k, v]) => {
        const title = lessonTitles[Number(k)] || `Lektion ${Number(k) + 1}`;
        return `--- ${title} ---\n${v}`;
      })
      .join("\n\n");

    if (!entryLines.trim()) {
      return new Response(
        JSON.stringify({ error: "Keine Logbuch-Einträge vorhanden." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const userMessage = `Dimension: ${dimensionTitle}\n\nLogbuch-Einträge des Teilnehmers:\n\n${entryLines}`;

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const payload = (await response.json()) as OpenAIResponse;

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: payload.error?.message || "OpenAI request failed." }),
        { status: response.status, headers: { "Content-Type": "application/json" } },
      );
    }

    const review = extractOutputText(payload);
    if (!review) {
      return new Response(
        JSON.stringify({ error: "No review returned." }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ review }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
