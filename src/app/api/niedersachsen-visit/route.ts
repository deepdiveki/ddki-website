import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

const NOTIFY_TO = "info@deepdive-ki.de";
const VALID_EVENT_TYPES = ["visit", "link_click", "tab_hidden", "page_unload"] as const;

type VisitEventType = (typeof VALID_EVENT_TYPES)[number];

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "Unbekannt";
  }

  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("true-client-ip") ||
    "Unbekannt"
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim().slice(0, 500) : fallback;
}

function getEventType(value: unknown): VisitEventType {
  return VALID_EVENT_TYPES.includes(value as VisitEventType) ? (value as VisitEventType) : "visit";
}

function getDurationSeconds(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : null;
}

function getEventLabel(eventType: VisitEventType) {
  if (eventType === "visit") {
    return "Besucher hat Niedersachsen-Seite geoeffnet";
  }

  if (eventType === "link_click") {
    return "Besucher hat einen Link geklickt";
  }

  if (eventType === "tab_hidden") {
    return "Besucher hat die Seite verlassen oder den Tab gewechselt";
  }

  return "Besucher hat die Seite geschlossen oder verlassen";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const eventType = getEventType(body.eventType);
    const message =
      typeof body.message === "string" && body.message.trim()
        ? body.message.trim().slice(0, 300)
        : getEventLabel(eventType);
    const durationSeconds = getDurationSeconds(body.durationSeconds);
    const nextUrl = getString(body.nextUrl, "Nicht angegeben");
    const currentPath = getString(body.currentPath, "/fortbildung/niedersachsen");
    const ip = getClientIp(req);
    const isVisit = eventType === "visit";

    await sendEmail({
      to: NOTIFY_TO,
      subject: isVisit
        ? "Besuch auf Niedersachsen-Fortbildungsseite"
        : "Niedersachsen-Seite verlassen",
      html: `
        <h2>${isVisit ? "Seitenbesuch" : "Seiten-Exit"}</h2>
        <p><strong>Ereignis:</strong> ${escapeHtml(getEventLabel(eventType))}</p>
        <p><strong>Seite:</strong> ${escapeHtml(currentPath)}</p>
        <p><strong>IP-Adresse:</strong> ${escapeHtml(ip)}</p>
        <p><strong>Nachricht:</strong> ${escapeHtml(message)}</p>
        ${
          durationSeconds !== null
            ? `<p><strong>Aufenthaltsdauer:</strong> ${durationSeconds} Sekunden</p>`
            : ""
        }
        ${!isVisit ? `<p><strong>Naechster Link:</strong> ${escapeHtml(nextUrl)}</p>` : ""}
        <p><strong>Zeitpunkt:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send Niedersachsen visit email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
