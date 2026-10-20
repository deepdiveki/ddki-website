import { NextRequest, NextResponse } from "next/server";
import { isValidToken, PRAES_COOKIE } from "@/lib/praesentation-auth";

/**
 * Live-Mitmachen für Präsentationen (Umfragen, Rankings, Quiz, Wortwolke).
 * Bewusst ohne Datenbank: Der Zustand lebt im Arbeitsspeicher des Servers und
 * ist nach einem Neustart weg. Für eine Fortbildung reicht das, Ergebnisse
 * werden ohnehin nur während des Vortrags gebraucht.
 */

type Store = {
  current: string | null;
  votes: Record<string, Record<string, unknown>>;
  updatedAt: number;
};

const g = globalThis as unknown as { __ddkiLive?: Map<string, Store> };
const stores = (g.__ddkiLive ??= new Map<string, Store>());

const MAX_CLIENTS = 2000;
const MAX_VALUE_CHARS = 2000;

function getStore(deck: string): Store {
  let s = stores.get(deck);
  if (!s) {
    s = { current: null, votes: {}, updatedAt: Date.now() };
    stores.set(deck, s);
  }
  return s;
}

const isId = (v: unknown): v is string =>
  typeof v === "string" && /^[a-z0-9-]{1,64}$/i.test(v);

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ deck: string }> },
) {
  const { deck } = await params;
  if (!isId(deck)) return NextResponse.json({ error: "bad deck" }, { status: 400 });
  const s = getStore(deck);
  const votes = Object.fromEntries(
    Object.entries(s.votes).map(([k, v]) => [k, Object.values(v)]),
  );
  return NextResponse.json(
    { current: s.current, votes, updatedAt: s.updatedAt },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ deck: string }> },
) {
  const { deck } = await params;
  if (!isId(deck)) return NextResponse.json({ error: "bad deck" }, { status: 400 });
  const s = getStore(deck);
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const action = body.action;

  // Steuer-Aktionen nur mit Präsentations-Cookie (Bühne). Abstimmen bleibt offen.
  if (action === "activate" || action === "reset") {
    if (!isValidToken(req.cookies.get(PRAES_COOKIE)?.value)) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  if (action === "activate") {
    const activity = body.activity;
    s.current = activity === null ? null : isId(activity) ? activity : s.current;
    s.updatedAt = Date.now();
    return NextResponse.json({ ok: true, current: s.current });
  }

  if (action === "reset") {
    if (isId(body.activity)) delete s.votes[body.activity];
    s.updatedAt = Date.now();
    return NextResponse.json({ ok: true });
  }

  if (action === "vote") {
    const { activity, clientId, value } = body;
    if (!isId(activity) || !isId(clientId)) {
      return NextResponse.json({ error: "bad ids" }, { status: 400 });
    }
    if (JSON.stringify(value ?? null).length > MAX_VALUE_CHARS) {
      return NextResponse.json({ error: "too large" }, { status: 413 });
    }
    const bucket = (s.votes[activity] ??= {});
    if (!(clientId in bucket) && Object.keys(bucket).length >= MAX_CLIENTS) {
      return NextResponse.json({ error: "full" }, { status: 429 });
    }
    bucket[clientId] = value;
    s.updatedAt = Date.now();
    return NextResponse.json({ ok: true, count: Object.keys(bucket).length });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
