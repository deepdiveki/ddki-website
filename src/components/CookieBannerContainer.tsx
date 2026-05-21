"use client";

import CookieBanner from "@/components/CookieBanner";

/**
 * Mountet den Cookie-Banner global, damit:
 *  - der Banner beim Erstbesuch automatisch erscheint (vor dem Setzen nicht
 *    notwendiger Cookies / dem Laden von Drittanbieter-Inhalten),
 *  - der Footer-Link „Privatsphäre-Einstellungen" auf allen Seiten den Banner
 *    erneut öffnen kann (Art. 7 Abs. 3 DSGVO).
 */
export default function CookieBannerContainer() {
  return <CookieBanner />;
}
