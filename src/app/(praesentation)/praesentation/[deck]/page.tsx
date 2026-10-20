import AccessGate from "@/components/praesentation/AccessGate";
import DeckPlayer from "@/components/praesentation/DeckPlayer";
import { getDeckMeta } from "@/components/praesentation/decks/manifest";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { deck: string };

// Cookie-Prüfung (Zugangscode) → immer zur Laufzeit rendern.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const meta = getDeckMeta((await params).deck);
  return { title: meta ? `${meta.title} · Präsentation` : "Präsentation" };
}

export default async function DeckPage({ params }: { params: Promise<Params> }) {
  const { deck } = await params;
  if (!getDeckMeta(deck)) notFound();
  return (
    <AccessGate>
      <DeckPlayer deckId={deck} />
    </AccessGate>
  );
}
