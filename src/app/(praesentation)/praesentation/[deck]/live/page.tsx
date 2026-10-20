import { DECK_MANIFEST, getDeckMeta } from "@/components/praesentation/decks/manifest";
import { LIVE_ACTIVITIES } from "@/components/praesentation/live/activities";
import LiveParticipant from "@/components/praesentation/live/LiveParticipant";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { deck: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return DECK_MANIFEST.filter((d) => LIVE_ACTIVITIES[d.id]).map((d) => ({ deck: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const meta = getDeckMeta((await params).deck);
  return { title: meta ? `${meta.title} · Mitmachen` : "Mitmachen" };
}

export default async function LivePage({ params }: { params: Promise<Params> }) {
  const { deck } = await params;
  const meta = getDeckMeta(deck);
  const activities = LIVE_ACTIVITIES[deck];
  if (!meta || !activities) notFound();
  return <LiveParticipant deck={deck} title={meta.title} activities={activities} />;
}
