type ChatMessage = {
  sender: "user" | "mentor";
  text: string;
};

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{ type?: string; text?: string }>;
  }>;
  error?: { message?: string };
};

const OPENAI_URL = "https://api.openai.com/v1/responses";

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

const callOpenAI = async (apiKey: string, body: Record<string, unknown>) => {
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json()) as OpenAIResponse;
  return { response, payload };
};

export async function POST(request: Request) {
  try {
    const {
      messages,
      persona,
      context,
      literature,
      mode,
    } = (await request.json()) as {
      messages?: ChatMessage[];
      persona?: string;
      context?: string;
      literature?: string;
      mode?: "chat" | "feedback";
    };

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const systemPrompt =
      mode === "feedback"
        ? [
            "Du bist Mentoring-Coach.",
            "Analysiere das folgende Gespräch aus Sicht des Mentors.",
            "Beziehe dich explizit auf die angegebene Literatur und leite Empfehlungen daraus ab.",
            "Gib eine kurze Zusammenfassung (2-3 Sätze), dann eine Bewertung der Gesprächsführung (Wie gut wurde sie eingehalten?) und danach genau 3 Verbesserungstipps.",
            "Schreibe auf Deutsch, als Fließtext mit klaren Überschriften:",
            "Zusammenfassung: ...",
            "Beurteilung der Gesprächsführung: ...",
            "Empfehlungen aus der Literatur: 1) ... 2) ... 3) ...",
            "Kein JSON, keine Markdown-Listen, keine Emojis.",
          ].join(" ")
        : [
            persona || "Du bist eine Studentin im Mentoringgespräch.",
            context || "",
            "Antworte kurz, natürlich und konsistent zur Persona.",
            "Bleibe im Charakter, schreibe auf Deutsch.",
            "Keine Emojis, kein Markdown, keine Listen.",
          ].join(" ");

    const input = [
      { role: "system", content: systemPrompt },
      ...(mode === "feedback" && literature
        ? [{ role: "system", content: `Literatur: ${literature}` }]
        : []),
      ...messages.map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      })),
    ];

    const { response, payload } = await callOpenAI(apiKey, {
      model,
      input,
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: payload.error?.message || "OpenAI request failed.",
        }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const reply = extractOutputText(payload);
    if (!reply) {
      return new Response(
        JSON.stringify({ error: "No reply returned from OpenAI." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
