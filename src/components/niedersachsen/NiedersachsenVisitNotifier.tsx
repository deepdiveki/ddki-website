"use client";

import { useEffect } from "react";

const VISIT_STORAGE_KEY = "ddki-niedersachsen-visit-notified";
const EXIT_STORAGE_KEY = "ddki-niedersachsen-exit-notified";
const TRACKING_ENDPOINT = "/api/niedersachsen-visit";

type TrackingEventType = "visit" | "link_click" | "tab_hidden" | "page_unload";

type TrackingPayload = {
  eventType: TrackingEventType;
  message: string;
  currentPath: string;
  durationSeconds?: number;
  nextUrl?: string;
};

function postTrackingEvent(payload: TrackingPayload) {
  return fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

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
    let exitSent = sessionStorage.getItem(EXIT_STORAGE_KEY) === "true";

    const getCurrentPath = () =>
      `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const getDurationSeconds = () => Math.max(0, Math.round((Date.now() - startedAt) / 1000));

    if (!sessionStorage.getItem(VISIT_STORAGE_KEY)) {
      sessionStorage.setItem(VISIT_STORAGE_KEY, "true");

      postTrackingEvent({
        eventType: "visit",
        message: "Ein Besucher hat die Niedersachsen-Seite geoeffnet.",
        currentPath: getCurrentPath(),
      }).catch(() => {
        sessionStorage.removeItem(VISIT_STORAGE_KEY);
      });
    }

    const sendExitEvent = (eventType: Exclude<TrackingEventType, "visit">) => {
      if (exitSent) {
        return;
      }

      exitSent = true;
      sessionStorage.setItem(EXIT_STORAGE_KEY, "true");

      const sent = sendBeaconEvent({
        eventType,
        message: "Ein Besucher hat die Niedersachsen-Seite verlassen.",
        currentPath: getCurrentPath(),
        durationSeconds: getDurationSeconds(),
        nextUrl: lastClickedUrl || undefined,
      });

      if (!sent) {
        sessionStorage.removeItem(EXIT_STORAGE_KEY);
        exitSent = false;
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
      sendExitEvent("link_click");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendExitEvent("tab_hidden");
      }
    };

    const handlePageHide = () => {
      sendExitEvent("page_unload");
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
