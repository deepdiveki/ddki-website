"use client";

import { useEffect } from "react";

const COMBINED_STORAGE_KEY = "ddki-niedersachsen-visit-exit-notified";
const TRACKING_ENDPOINT = "/api/niedersachsen-visit";

type TrackingEventType = "visited_and_left";
type ExitTrigger = "link_click" | "tab_hidden" | "page_unload";

type TrackingPayload = {
  eventType: TrackingEventType;
  message: string;
  currentPath: string;
  durationSeconds?: number;
  nextUrl?: string;
  exitTrigger: ExitTrigger;
};

function sendBeaconEvent(payload: TrackingPayload) {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    return navigator.sendBeacon(TRACKING_ENDPOINT, blob);
  }

  fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => undefined);

  return true;
}

export default function NiedersachsenVisitNotifier() {
  useEffect(() => {
    const startedAt = Date.now();
    let lastClickedUrl = "";
    let combinedEventSent = sessionStorage.getItem(COMBINED_STORAGE_KEY) === "true";

    const getCurrentPath = () =>
      `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const getDurationSeconds = () => Math.max(0, Math.round((Date.now() - startedAt) / 1000));

    const sendCombinedEvent = (exitTrigger: ExitTrigger) => {
      if (combinedEventSent) {
        return;
      }

      combinedEventSent = true;
      sessionStorage.setItem(COMBINED_STORAGE_KEY, "true");

      const sent = sendBeaconEvent({
        eventType: "visited_and_left",
        message: "Ein Besucher hat die Niedersachsen-Seite besucht und wieder verlassen.",
        currentPath: getCurrentPath(),
        durationSeconds: getDurationSeconds(),
        nextUrl: lastClickedUrl || undefined,
        exitTrigger,
      });

      if (!sent) {
        sessionStorage.removeItem(COMBINED_STORAGE_KEY);
        combinedEventSent = false;
      }
    };

    const handleLinkClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const link = event.target.closest("a[href]");

      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      lastClickedUrl = link.href;
      sendCombinedEvent("link_click");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendCombinedEvent("tab_hidden");
      }
    };

    const handlePageHide = () => {
      sendCombinedEvent("page_unload");
    };

    document.addEventListener("click", handleLinkClick, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return null;
}
