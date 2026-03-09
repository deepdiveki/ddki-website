"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import ButtonLink from "../ui/button-link-fortbildung";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "../ui/section-header-fortbildung";

const previews = [
  {
    title: "Ihr digitales Fortbildungszertifikat",
    description:
      "Nach erfolgreichem Abschluss erhalten Sie ein anerkanntes Zertifikat – digital und sofort verfügbar für Ihre berufliche Weiterentwicklung.",
    imageSrc: "/images/certificate-preview.svg",
    imageAlt: "Digitales Fortbildungszertifikat Vorschau",
    reverse: false,
  },
  {
    title: "Übersichtliche Kursstruktur",
    description:
      "Behalten Sie den Überblick über Ihre Module, Fortschritte und nächsten Schritte – alles klar strukturiert und auf einen Blick verfügbar.",
    imageSrc: "/images/course-preview.svg",
    imageAlt: "Kursübersicht und Fortschrittsanzeige",
    reverse: true,
  },
];

export default function CertificatePreviewSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-304 py-14 md:py-14 lg:py-28">
        <SectionHeader>
          <HeaderTitle>
            Fortbildung, die sich auszahlt
          </HeaderTitle>
          <HeaderSubtitle>
            Praxisnahe Inhalte, klare Strukturen und ein anerkanntes Zertifikat
            – alles für Ihre berufliche Weiterentwicklung.
          </HeaderSubtitle>
        </SectionHeader>

        <ul className="mt-14 flex flex-col gap-y-10 px-4 lg:mt-16 lg:gap-y-20 xl:px-0">
          {previews.map((preview, index) => (
            <li key={index}>
              <CertificatePreview {...preview} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface CertificatePreviewProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  index: number;
}

function CertificatePreview({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse,
  index,
}: CertificatePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      className={cn(
        "flex flex-col items-center justify-between gap-x-5 gap-y-6 md:px-10 lg:px-0",
        reverse ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      <div className="flex w-full flex-col items-center text-center md:w-1/2 md:grow md:items-start md:text-left lg:max-w-122.75">
        <h3 className="text-display-xs text-text-primary lg:text-display-md">
          {title}
        </h3>
        <p className="mt-5 text-md font-light text-text-secondary md:max-w-full lg:text-xl">
          {description}
        </p>

        <ButtonLink
          href="/fortbildung/fortbildungen"
          className="mt-6 w-full md:w-fit lg:mt-11"
        >
          Fortbildungen entdecken
        </ButtonLink>
      </div>

      <div className="w-full rounded-3xl border-t border-primary-base bg-[linear-gradient(180deg,rgba(198,189,250,0.50)_0%,#FFF_100%)] px-20 md:h-75 md:max-w-75 md:pt-10 lg:h-125 lg:max-w-125 lg:px-36.5 lg:pt-17.5 lg:pb-6.25">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={500}
          className={cn(
            "mt-10 h-auto w-full px-4 md:mt-0 md:px-0 xl:w-150",
            reverse ? "lg:mr-5 xl:mr-0" : "",
          )}
        />
      </div>
    </motion.div>
  );
}
