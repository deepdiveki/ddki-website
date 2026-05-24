"use client";

import { useState } from "react";
import Link from "next/link";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

interface YouTubeEmbedProps {
  src: string;
  title?: string;
  /**
   * Tailwind sizing classes applied to BOTH the placeholder wrapper and the
   * loaded iframe so that the layout doesn't jump when the user activates the
   * video. Defaults to `aspect-video w-full`.
   */
  className?: string;
}

const CONSENT_KEY = "cookieConsent";

function persistFunctionalConsent() {
  try {
    const next = { essential: true, functional: true };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdated", { detail: next }),
    );
  } catch (error) {
    console.error("Cookie-Consent konnte nicht gespeichert werden:", error);
  }
}

/**
 * Renders a YouTube (or youtube-nocookie) embed behind a click-to-load
 * consent gate. We do not load any third-party scripts or set any cookies
 * until the user explicitly activates the video.
 *
 * If the user has previously granted functional consent (e.g. by activating
 * Calendly or by checking "Für diese Website merken" on another video), the
 * iframe is rendered directly without an extra click.
 */
export default function YouTubeEmbed({
  src,
  title,
  className = "aspect-video w-full",
}: YouTubeEmbedProps) {
  const persistedConsent = useCookieConsent();
  const [sessionConsent, setSessionConsent] = useState(false);
  const [remember, setRemember] = useState(true);

  const hasConsent = persistedConsent === true || sessionConsent;

  if (hasConsent) {
    return (
      <iframe
        src={src}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    );
  }

  const handleLoad = () => {
    if (remember) {
      persistFunctionalConsent();
    } else {
      setSessionConsent(true);
    }
  };

  return (
    <div
      className={`${className} flex flex-col items-center justify-center gap-3 bg-slate-900 px-4 py-6 text-center text-slate-200`}
    >
      <IconPlayerPlay className="h-10 w-10 text-slate-400" />
      <p className="text-sm font-semibold">Video von YouTube laden?</p>
      <p className="max-w-md text-xs leading-relaxed text-slate-400">
        Beim Laden des Videos werden Daten (u.&nbsp;a. Ihre IP-Adresse) an
        Google in den USA übermittelt.{" "}
        <Link
          href="/datenschutz"
          className="underline hover:text-slate-200"
        >
          Mehr erfahren
        </Link>
        .
      </p>
      <label className="flex items-center gap-2 text-xs text-slate-300">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="accent-purple-500"
        />
        Für diese Website merken
      </label>
      <button
        type="button"
        onClick={handleLoad}
        className="cursor-pointer rounded bg-purple-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
      >
        Video laden
      </button>
    </div>
  );
}
