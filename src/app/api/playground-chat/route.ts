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

const formatJsonReply = (rawText: string) => {
  const trimmed = rawText.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return "";
  }

  try {
    const parsed = JSON.parse(trimmed) as {
      school_overview?: { name?: string; description?: string };
    };

    if (parsed.school_overview?.name) {
      const name = parsed.school_overview.name;
      const description = parsed.school_overview.description || "";
      return `Hello! Welcome to ${name}. ${description} What would you like to know?`;
    }
  } catch (error) {
    return "";
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

const SYSTEM_PROMPT = [
  "Du bist das KI-Schulbuero des Nordlicht-Gymnasiums in Hamburg (fiktive Schule).",
  "Antworte nur auf Deutsch, kurz und hilfreich (1-3 Saetze).",
  "Keine Fantasy-, Sci-Fi- oder Rollenspiel-Elemente.",
  "Kein JSON, keine Listen, kein Markdown, keine Emojis.",
  "Begruesse nur, wenn der Nutzer begruesst. Sonst antworte direkt.",
  "Wenn Details fehlen, erfinde plausible Informationen, statt Rueckfragen zu stellen.",
  "Bleibe konsistent und klinge wie ein Schulbuero.",
  "Nutze diese Fakten: Sekretariat Mo-Fr 07:30-15:00, Mensa 11:30-14:00 (3,50 EUR), Anmeldung Klasse 5: 15.02-15.03, Buslinien 8/14/27 Haltestelle Campus Nord.",
  "Weitere plausible Fakten fuer das Nordlicht-Gymnasium: MINT-Projektwoche Anfang Juni, Schwerpunkt Robotik/Energie/Smart City; vegetarische Mensa-Optionen taeglich; Vertretungsplan taeglich 07:15 im Schulportal.",
].join(" ");

type ChatInputMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const buildInput = (messages: ChatInputMessage[] | undefined, fallbackMessage: string) => {
  const input: ChatInputMessage[] = [{ role: "system", content: SYSTEM_PROMPT }];

  if (messages && messages.length > 0) {
    for (const message of messages) {
      if (!message.content?.trim()) continue;
      input.push({ role: message.role, content: message.content });
    }
    return input;
  }

  input.push({ role: "user", content: fallbackMessage });
  return input;
};

export async function POST(request: Request) {
  try {
    const { message, messages } = (await request.json()) as {
      message?: string;
      messages?: ChatInputMessage[];
    };

    if (!message || !message.trim()) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
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
    const fallbackModel = process.env.OPENAI_FALLBACK_MODEL;
    const promptId = process.env.OPENAI_PROMPT_ID;
    const promptVersion = process.env.OPENAI_PROMPT_VERSION || "1";

    const baseBody: Record<string, unknown> = {
      model,
      input: buildInput(messages, message),
    };

    if (promptId) {
      baseBody.prompt = { id: promptId, version: promptVersion };
    }

    let { response, payload } = await callOpenAI(apiKey, baseBody);

    const errorMessage = payload.error?.message || "";
    if (
      !response.ok &&
      errorMessage.includes("reasoning.effort") &&
      (fallbackModel || promptId)
    ) {
      const retryBody: Record<string, unknown> = {
        ...baseBody,
        ...(fallbackModel ? { model: fallbackModel } : {}),
      };

      if (!fallbackModel) {
        delete retryBody.prompt;
      }

      const retryResult = await callOpenAI(apiKey, retryBody);
      response = retryResult.response;
      payload = retryResult.payload;
    }

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: payload.error?.message || "OpenAI request failed.",
        }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const reply = extractOutputText(payload);
    const formattedReply = formatJsonReply(reply);
    const finalReply = formattedReply || reply;

    if (!finalReply) {
      return new Response(
        JSON.stringify({ error: "No reply returned from OpenAI." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ reply: finalReply }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
