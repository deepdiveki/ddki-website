const OPENAI_URL = "https://api.openai.com/v1/responses";

type RoleId = "studierende" | "referendare" | "lehrkraefte";

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{ type?: string; text?: string }>;
  }>;
  error?: { message?: string };
};

type ChatInputMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const BASE_SYSTEM_PROMPT = [
  "Du bist LI Superhirn, ein KI-Assistent fuer Studium, Referendariat und Schule.",
  "Antworte auf Deutsch, klar und praxisnah in 2-6 Saetzen.",
  "Kein Markdown, keine Emojis, kein JSON.",
  "Wenn wichtige Angaben fehlen, stelle eine Rueckfrage.",
  "Wenn sinnvoll, nummeriere kurze Schritte mit 1) 2) 3) im Fliesstext.",
].join(" ");

const ROLE_PROMPTS: Record<RoleId, string> = {
  studierende: [
    "Zielgruppe: Studierende.",
    "Fokus: Verstaendnis, Zusammenfassungen, Lernplaene, Beispiele und Uebungsfragen.",
    "Nutze klare Begriffe und kurze Erklaerungen.",
  ].join(" "),
  referendare: [
    "Zielgruppe: Referendare.",
    "Fokus: Unterrichtsplanung, Phasen, Lernziele, Differenzierung und Materialideen.",
    "Gib konkrete Vorschlaege mit Zeitbausteinen, wenn passend.",
    "Nutze Informationen aus dem Wegweiser fuer Lehrkraefte im Vorbereitungsdienst, wenn vorhanden.",
  ].join(" "),
  lehrkraefte: [
    "Zielgruppe: Lehrkraefte.",
    "Fokus: Unterrichtspraxis, Klassenfuehrung, Elternkommunikation und Leistungserhebung.",
    "Liefer vorlagenartige Antworten und praxistaugliche Formulierungen.",
  ].join(" "),
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

const buildInput = (
  role: RoleId,
  messages: ChatInputMessage[] | undefined,
  fallbackMessage: string
) => {
  const input: ChatInputMessage[] = [
    { role: "system", content: BASE_SYSTEM_PROMPT },
    { role: "system", content: ROLE_PROMPTS[role] },
  ];

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

const resolveRole = (role: string | undefined): RoleId => {
  if (role === "studierende" || role === "referendare" || role === "lehrkraefte") {
    return role;
  }
  return "studierende";
};

export async function POST(request: Request) {
  try {
    const { message, messages, role } = (await request.json()) as {
      message?: string;
      messages?: ChatInputMessage[];
      role?: string;
    };

    if (!message || !message.trim()) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.LI_SUPERHIRN_OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "LI_SUPERHIRN_OPENAI_API_KEY is not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const activeRole = resolveRole(role);
    const vectorStoreId = process.env.LI_SUPERHIRN_VECTOR_STORE_ID;

    const body: Record<string, unknown> = {
      model,
      input: buildInput(activeRole, messages, message),
    };

    if (activeRole === "referendare" && vectorStoreId) {
      body.tools = [{ type: "file_search" }];
      body.tool_resources = {
        file_search: {
          vector_store_ids: [vectorStoreId],
        },
      };
    }

    let { response, payload } = await callOpenAI(apiKey, body);

    const errorMessage = payload.error?.message || "";
    if (
      !response.ok &&
      vectorStoreId &&
      activeRole === "referendare" &&
      errorMessage.includes("tool_resources")
    ) {
      const fallbackBody: Record<string, unknown> = { ...body };
      fallbackBody.tools = [
        { type: "file_search", vector_store_ids: [vectorStoreId] },
      ];
      delete fallbackBody.tool_resources;

      const retryResult = await callOpenAI(apiKey, fallbackBody);
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
