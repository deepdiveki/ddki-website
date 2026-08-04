"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GraduationCap, Play } from "lucide-react";
import ButtonLink from "../ui/button-link-fortbildung";
import {
  GlassPanel,
  GlassStep,
  GrainCard,
  GreenDot,
} from "../fortbildungen/GrainCard";
import {
  HeaderEyebrow,
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "../ui/section-header-fortbildung";

export default function CertificatePreviewSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-304 py-14 md:py-14 lg:py-28">
        <SectionHeader>
          <HeaderEyebrow>So lernen Sie bei uns</HeaderEyebrow>
          <HeaderTitle>Fortbildung, die sich auszahlt</HeaderTitle>
          <HeaderSubtitle>
            Praxisnahe Inhalte, klare Strukturen und ein Zertifikat: alles für
            Ihre berufliche Weiterentwicklung.
          </HeaderSubtitle>
        </SectionHeader>

        <ul className="mt-14 flex flex-col gap-y-10 px-4 lg:mt-16 lg:gap-y-20 xl:px-0">
          <li>
            <PreviewRow
              index={0}
              title="Ihr digitales Fortbildungszertifikat"
              description="Nach erfolgreichem Abschluss erhalten Sie ein Zertifikat, digital und sofort verfügbar für Ihre berufliche Weiterentwicklung."
              mockup={<ZertifikatMockup />}
            />
          </li>
          <li>
            <PreviewRow
              index={1}
              reverse
              title="Übersichtliche Kursstruktur"
              description="Behalten Sie den Überblick über Ihre Module, Fortschritte und nächsten Schritte, alles klar strukturiert und auf einen Blick verfügbar."
              mockup={<KursstrukturMockup />}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ── Grain-Mockups im neuen Landing-Design ── */

function ZertifikatMockup() {
  return (
    <GrainCard gradient="purple">
      <GlassPanel>
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/85">
            <GraduationCap className="size-5 text-primary-darker" />
          </span>
          <div>
            <p className="text-xs tracking-[0.14em] text-white/70 uppercase">
              Zertifikat
            </p>
            <p className="text-sm font-medium text-white">
              DeepDiveKI Fortbildung
            </p>
          </div>
        </div>
        <div className="my-3 h-px w-full bg-white/20" />
        <p className="text-sm text-white/95">Hiermit wird bestätigt, dass</p>
        <p className="mt-1 text-lg font-semibold text-white">Ihr Name</p>
        <p className="mt-1 text-sm text-white/80">
          die Fortbildung erfolgreich abgeschlossen hat.
        </p>
      </GlassPanel>
      <div className="flex flex-col gap-2.5 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
        <GlassStep>Digital &amp; sofort verfügbar</GlassStep>
        <GlassStep>Zum Ausdrucken oder fürs Portfolio</GlassStep>
        <GlassStep>Anerkannter Teilnahme-Nachweis</GlassStep>
      </div>
    </GrainCard>
  );
}

function KursstrukturMockup() {
  return (
    <GrainCard gradient="aurora">
      <GlassPanel>
        <div className="flex items-start gap-3">
          <GreenDot />
          <p className="text-sm font-medium text-white">
            Ihr Fortbildungs-Fortschritt
          </p>
        </div>
        <div className="mt-3 ml-6 rounded-xl border border-white/25 bg-white/15 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary-darker">
              <Play className="size-3.5 text-white" />
            </span>
            <span className="text-sm font-medium text-white">
              Modul 3: KI im Unterricht einsetzen
            </span>
          </div>
          <div className="mt-2 ml-8 h-1 overflow-hidden rounded-full bg-white/25">
            <span className="block h-full w-3/5 rounded-full bg-white/90" />
          </div>
        </div>
        <div className="my-3 h-px w-full bg-white/20" />
        <div className="flex flex-col gap-2.5">
          <GlassStep>Modul 1: Grundlagen abgeschlossen</GlassStep>
          <GlassStep>Modul 2: Praxis-Übungen abgeschlossen</GlassStep>
          <GlassStep>Materialien zum Download bereit</GlassStep>
        </div>
      </GlassPanel>
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/25 bg-white/10 p-3 text-center backdrop-blur-md">
        {[
          ["12", "Module"],
          ["60 %", "Fortschritt"],
          ["3", "Downloads"],
        ].map(([value, label]) => (
          <div key={label} className="flex-1">
            <p className="text-lg font-semibold text-white">{value}</p>
            <p className="text-xs text-white/70">{label}</p>
          </div>
        ))}
      </div>
    </GrainCard>
  );
}

/* ── Text/Mockup-Zeile ── */

function PreviewRow({
  title,
  description,
  mockup,
  reverse,
  index,
}: {
  title: string;
  description: string;
  mockup: React.ReactNode;
  reverse?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      className={cn(
        "flex flex-col items-center justify-between gap-x-16 gap-y-6 md:px-10 lg:px-0",
        reverse ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      <div className="flex w-full flex-col items-center text-center md:w-1/2 md:grow md:items-start md:text-left lg:max-w-122.75">
        <h3 className="text-display-xs font-semibold -tracking-[0.5px] text-text-primary lg:text-display-md">
          {title}
        </h3>
        <p className="mt-5 text-md font-light leading-relaxed text-text-secondary md:max-w-full lg:text-xl">
          {description}
        </p>

        <ButtonLink
          href="/fortbildung/fortbildungen"
          className="mt-6 w-full md:w-fit lg:mt-11"
        >
          Fortbildungen entdecken
        </ButtonLink>
      </div>

      <div className="w-full md:w-1/2">{mockup}</div>
    </motion.div>
  );
}
