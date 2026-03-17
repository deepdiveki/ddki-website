"use client";

import Logo from "@/components/shared/Logo";
import ButtonLink from "@/components/ui/button-link-fortbildung";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const fortbildungLinks = [
  {
    title: "Angebot",
    links: [
      { name: "Fortbildungen", href: "/fortbildung/fortbildungen" },
      { name: "Kategorien", href: "/fortbildung#kategorien" },
      { name: "Empfehlungen", href: "/fortbildung#empfehlungen" },
    ],
  },
  {
    title: "Informationen",
    links: [
      { name: "Häufige Fragen", href: "/fortbildung#faq" },
      { name: "Kontakt", href: "/fortbildung/kontakt" },
    ],
  },
];

const softwareLinks = [
  {
    title: "Produkte",
    links: [
      { name: "DeepChat", href: "/software/ddki-toolbox" },
      { name: "KI-Schulbüro", href: "/software/chatbot-fuer-ihre-schule" },
      { name: "Websites", href: "/software/websites" },
      { name: "Fortbildungen", href: "/fortbildung" },
    ],
  },
  {
    title: "Informationen",
    links: [
      { name: "Über uns", href: "/software/about" },
      { name: "Kontakt", href: "/software/kontakt" },
      { name: "Jobs", href: "/jobs" },
      { name: "Mentoring", href: "/software/mentoring" },
      { name: "Escape Game", href: "/software/escape-game" },
      { name: "info@deepdive-ki.de", href: "mailto:info@deepdive-ki.de" },
    ],
  },
];

type FooterVariant = "fortbildung" | "software";

export default function Footer({ variant = "fortbildung" }: { variant?: FooterVariant }) {
  const isSoftware = variant === "software";
  const infoLinks = isSoftware ? softwareLinks : fortbildungLinks;
  const sectionLabel = isSoftware ? "DDKI Software" : "DDKI Fortbildungen";
  const aboutText = isSoftware
    ? "DeepDiveKI bietet Schulen innovative KI-Tools: DeepChat für den Unterricht, KI-Schulbüro für die Schulwebsite und professionelle Websites für Schulen."
    : "Hochwertige Fortbildungen in den Bereichen KI, Digitalisierung, Pädagogik, Management und Gesundheit für Fach- und Führungskräfte.";
  const tagline = isSoftware
    ? "Innovative KI-Lösungen für Schulen und Bildungseinrichtungen."
    : "Ihre zentrale Plattform für berufliche Weiterbildung und Kompetenzentwicklung.";

  return (
    <footer className={`overflow-hidden ${isSoftware ? "bg-[#0a0525]" : "bg-background-secondary"}`}>
      <div className="mx-auto max-w-304 pt-14 pb-10 md:px-4 lg:pt-20 xl:px-0">
        <div className="mx-auto flex w-full flex-col flex-wrap justify-between md:flex-row md:flex-nowrap md:items-center lg:items-start">
          <CompanyInfo tagline={tagline} logoLabel={isSoftware ? "Software" : "Fortbildungen"} isSoftware={isSoftware} />

          <ul className="mt-10 flex shrink-0 flex-wrap items-start gap-13.5 pl-4 md:mt-0 md:grow-0 md:gap-7.5 lg:pl-14 xl:gap-16">
            {infoLinks.map((links, index) => (
              <li
                key={index}
                className="w-36 space-y-5 md:w-23.75 lg:w-22.5 xl:w-28"
              >
                <h4 className={`text-md font-medium ${isSoftware ? "text-white" : "text-text-primary"}`}>
                  {links.title}
                </h4>

                <nav aria-label={links.title} className="space-y-3">
                  {links.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block text-sm duration-100 ${isSoftware ? "text-white/70 hover:text-white" : "text-text-secondary hover:text-text-primary"}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </li>
            ))}

            <li className="w-full space-y-5 md:w-45 lg:w-77">
              <h4 className={`text-md font-medium ${isSoftware ? "text-white" : "text-text-primary"}`}>
                Über {sectionLabel}
              </h4>
              <p className={`text-sm ${isSoftware ? "text-white/70" : "text-text-secondary"}`}>
                {aboutText}
              </p>
            </li>
          </ul>
        </div>

        <Copyright sectionLabel={sectionLabel} isSoftware={isSoftware} />
      </div>
    </footer>
  );
}

function CompanyInfo({ tagline, logoLabel, isSoftware }: { tagline: string; logoLabel: string; isSoftware: boolean }) {
  return (
    <div className="flex h-37.5 max-w-100 flex-col items-start justify-between px-4 text-center sm:mx-0 sm:h-full sm:min-h-50 sm:w-100 md:w-62.5 md:items-start md:px-0 md:text-left lg:w-91.75 xl:px-0">
      <div className="w-full">
        <Link href="/">
          <Logo label={logoLabel} variant={isSoftware ? "software" : "default"} />
        </Link>
        <p className={`mt-4 text-start text-sm tracking-[0.16px] lg:text-md ${isSoftware ? "text-white/70" : "text-text-secondary"}`}>
          {tagline}
        </p>
      </div>

      <div className="space-x-2">
        <ButtonLink
          href="https://www.instagram.com/deepdive_ki"
          variant="secondary"
          className={`size-11 rounded-full border-none px-0 py-0 ${isSoftware ? "hover:bg-white/10" : "hover:bg-background-tertiary"}`}
          aria-label="Instagram"
        >
          <Instagram className="size-4.5" />
        </ButtonLink>
        <ButtonLink
          href="https://de.linkedin.com/company/deepdiveki"
          variant="secondary"
          className={`size-11 rounded-full border-none px-0 py-0 ${isSoftware ? "hover:bg-white/10" : "hover:bg-background-tertiary"}`}
          aria-label="LinkedIn"
        >
          <Linkedin className="size-4.5" />
        </ButtonLink>
      </div>
    </div>
  );
}

function Copyright({ sectionLabel, isSoftware }: { sectionLabel: string; isSoftware: boolean }) {
  return (
    <div className="mt-10 flex flex-col-reverse items-center justify-between px-4 md:mt-16 md:flex-row md:px-0">
      <p className={`mt-5 text-center text-sm font-medium tracking-[0.28px] sm:text-left md:mt-0 ${isSoftware ? "text-white/50" : "text-text-tertiary"}`}>
        &copy; {new Date().getFullYear()} {sectionLabel}. Alle Rechte vorbehalten.
      </p>

      <div className="flex items-center gap-x-4">
        <Link
          href="/impressum"
          className={`text-sm font-medium tracking-[0.28px] duration-300 ${isSoftware ? "text-white/70 hover:text-white" : "text-text-secondary hover:text-primary-base"}`}
        >
          Impressum
        </Link>
        <span className={isSoftware ? "text-white/70" : "text-text-secondary"} aria-hidden="true">
          |
        </span>
        <Link
          href="/datenschutz"
          className={`text-sm font-medium tracking-[0.28px] duration-300 ${isSoftware ? "text-white/70 hover:text-white" : "text-text-secondary hover:text-primary-base"}`}
        >
          Datenschutz
        </Link>
      </div>
    </div>
  );
}
