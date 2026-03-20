"use client";

import { usePathname } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";

/** Renders the cookie banner only on escape game pages (landing + tutorial). */
export default function EscapeGameCookieBanner() {
  const pathname = usePathname();
  const isEscapeGame = pathname?.startsWith("/software/escape-game");

  if (!isEscapeGame) return null;

  return <CookieBanner />;
}
