import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DownloadView from "./DownloadView";
import { downloadsContent } from "../../_data/downloadsContent";

export const metadata: Metadata = {
  title: "Kurs-Material",
  robots: { index: false, follow: false },
};

type Params = { params: Promise<{ slug: string }> };

export default async function DownloadPage({ params }: Params) {
  const { slug } = await params;
  const entry = downloadsContent[slug];
  if (!entry) notFound();
  return <DownloadView slug={slug} entry={entry} />;
}
