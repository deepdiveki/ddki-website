import { sendEmail } from "@/lib/email";

const MIN_SUFFIX_LENGTH = 1;
const COOLDOWN_MS = 60 * 60 * 1000;
const NOTIFY_TO = "info@deepdive-ki.de";

const lastNotified = new Map<string, number>();

function getPrefixes(): string[] {
  return (process.env.ESCAPE_GAME_TRIAL_PREFIXES ?? "")
    .split(",")
    .map((p) => p.trim().toUpperCase())
    .filter(Boolean);
}

/**
 * Returns the matching prefix if `uppercased` starts with a configured trial
 * prefix and has at least one suffix character, otherwise null.
 */
export function matchTrialCode(uppercased: string): string | null {
  for (const prefix of getPrefixes()) {
    if (
      uppercased.startsWith(prefix) &&
      uppercased.length >= prefix.length + MIN_SUFFIX_LENGTH
    ) {
      return prefix;
    }
  }
  return null;
}

/**
 * Sends a notification email about a redeemed trial code. Throttled to at
 * most one email per exact code per `COOLDOWN_MS`. State is in-memory only;
 * cold starts reset it, which is acceptable for this use case.
 */
export async function notifyTrialRedemption(
  code: string,
  request: Request,
): Promise<void> {
  const now = Date.now();
  const last = lastNotified.get(code) ?? 0;
  if (now - last < COOLDOWN_MS) return;
  lastNotified.set(code, now);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const timestamp = new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "full",
    timeStyle: "medium",
  });

  await sendEmail({
    to: NOTIFY_TO,
    subject: `Escape Game Trial-Code verwendet: ${code}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px;">
        <h3 style="color: #1a1a2e; margin-bottom: 16px;">Trial-Code wurde aktiviert</h3>
        <p><strong>Code:</strong> <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${code}</code></p>
        <p><strong>Zeitpunkt:</strong> ${timestamp}</p>
        <p><strong>IP:</strong> ${ip}</p>
      </div>
    `,
  });
}
