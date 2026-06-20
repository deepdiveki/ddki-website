import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

const NOTIFY_TO = "info@deepdive-ki.de";
const VALID_EVENT_TYPES = ["visited_and_left"] as const;
const VALID_EXIT_TRIGGERS = ["link_click", "tab_hidden", "page_unload"] as const;

type VisitEventType = (typeof VALID_EVENT_TYPES)[number];
type ExitTrigger = (typeof VALID_EXIT_TRIGGERS)[number];

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
  return VALID_EVENT_TYPES.includes(value as VisitEventType)
    ? (value as VisitEventType)
    : "visited_and_left";
}

function getExitTrigger(value: unknown): ExitTrigger {
  return VALID_EXIT_TRIGGERS.includes(value as ExitTrigger)
    ? (value as ExitTrigger)
    : "page_unload";
}

function getDurationSeconds(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : null;
}

function getEventLabel(eventType: VisitEventType) {
  if (eventType === "visited_and_left") {
    return "Besucht und verlassen";
  }

  return "Besucht und verlassen";
}

function getExitTriggerLabel(exitTrigger: ExitTrigger) {
  if (exitTrigger === "link_click") {
    return "Link geklickt";
  }

  if (exitTrigger === "tab_hidden") {
    return "Seite verlassen oder Tab gewechselt";
  }

  return "Seite geschlossen oder verlassen";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const eventType = getEventType(body.eventType);
    const exitTrigger = getExitTrigger(body.exitTrigger);
    const message =
      typeof body.message === "string" && body.message.trim()
        ? body.message.trim().slice(0, 300)
        : "Ein Besucher hat die Niedersachsen-Seite besucht und wieder verlassen.";
    const durationSeconds = getDurationSeconds(body.durationSeconds);
    const nextUrl = getString(body.nextUrl, "Nicht angegeben");
    const currentPath = getString(body.currentPath, "/fortbildung/niedersachsen");
    const ip = getClientIp(req);

    await sendEmail({
      to: NOTIFY_TO,
      subject: "Niedersachsen-Seite besucht und verlassen",
      html: `
        <h2>Seitenbesuch mit Exit</h2>
        <p><strong>Ereignis:</strong> ${escapeHtml(getEventLabel(eventType))}</p>
        <p><strong>Seite:</strong> ${escapeHtml(currentPath)}</p>
        <p><strong>IP-Adresse:</strong> ${escapeHtml(ip)}</p>
        <p><strong>Nachricht:</strong> ${escapeHtml(message)}</p>
        ${
          durationSeconds !== null
            ? `<p><strong>Aufenthaltsdauer:</strong> ${durationSeconds} Sekunden</p>`
            : ""
        }
        <p><strong>Exit-Ausloeser:</strong> ${escapeHtml(getExitTriggerLabel(exitTrigger))}</p>
        <p><strong>Naechster Link:</strong> ${escapeHtml(nextUrl)}</p>
        <p><strong>Zeitpunkt:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send Niedersachsen visit email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
