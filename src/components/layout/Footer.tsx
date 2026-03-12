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
    <footer className="overflow-hidden bg-background-secondary">
      <div className="mx-auto max-w-304 pt-14 pb-10 md:px-4 lg:pt-20 xl:px-0">
        <div className="mx-auto flex w-full flex-col flex-wrap justify-between md:flex-row md:flex-nowrap md:items-center lg:items-start">
          <CompanyInfo tagline={tagline} />

          <ul className="mt-10 flex shrink-0 flex-wrap items-start gap-13.5 pl-4 md:mt-0 md:grow-0 md:gap-7.5 lg:pl-14 xl:gap-16">
            {infoLinks.map((links, index) => (
              <li
                key={index}
                className="w-36 space-y-5 md:w-23.75 lg:w-22.5 xl:w-28"
              >
                <h4 className="text-md font-medium text-text-primary">
                  {links.title}
                </h4>

                <nav aria-label={links.title} className="space-y-3">
                  {links.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block text-sm text-text-secondary duration-100 hover:text-text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </li>
            ))}

            <li className="w-full space-y-5 md:w-45 lg:w-77">
              <h4 className="text-md font-medium text-text-primary">
                Über {sectionLabel}
              </h4>
              <p className="text-sm text-text-secondary">
                {aboutText}
              </p>
            </li>
          </ul>
        </div>

        <Copyright sectionLabel={sectionLabel} />
      </div>
    </footer>
  );
}

function CompanyInfo({ tagline }: { tagline: string }) {
  return (
    <div className="flex h-37.5 max-w-100 flex-col items-start justify-between px-4 text-center sm:mx-0 sm:h-full sm:min-h-50 sm:w-100 md:w-62.5 md:items-start md:px-0 md:text-left lg:w-91.75 xl:px-0">
      <div className="w-full">
        <Link href="/">
          <Logo />
        </Link>
        <p className="mt-4 text-start text-sm tracking-[0.16px] text-text-secondary lg:text-md">
          {tagline}
        </p>
      </div>

      <div className="space-x-2">
        <ButtonLink
          href="https://www.instagram.com/deepdive_ki"
          variant="secondary"
          className="size-11 rounded-full border-none px-0 py-0 hover:bg-background-tertiary"
          aria-label="Instagram"
        >
          <Instagram className="size-4.5" />
        </ButtonLink>
        <ButtonLink
          href="https://de.linkedin.com/company/deepdiveki"
          variant="secondary"
          className="size-11 rounded-full border-none px-0 py-0 hover:bg-background-tertiary"
          aria-label="LinkedIn"
        >
          <Linkedin className="size-4.5" />
        </ButtonLink>
      </div>
    </div>
  );
}

function Copyright({ sectionLabel }: { sectionLabel: string }) {
  return (
    <div className="mt-10 flex flex-col-reverse items-center justify-between px-4 md:mt-16 md:flex-row md:px-0">
      <p className="mt-5 text-center text-sm font-medium tracking-[0.28px] text-text-tertiary sm:text-left md:mt-0">
        &copy; {new Date().getFullYear()} {sectionLabel}. Alle Rechte vorbehalten.
      </p>

      <div className="flex items-center gap-x-4">
        <Link
          href="/impressum"
          className="text-sm font-medium tracking-[0.28px] text-text-secondary duration-300 hover:text-primary-base"
        >
          Impressum
        </Link>
        <span className="text-text-secondary" aria-hidden="true">
          |
        </span>
        <Link
          href="/datenschutz"
          className="text-sm font-medium tracking-[0.28px] text-text-secondary duration-300 hover:text-primary-base"
        >
          Datenschutz
        </Link>
      </div>
    </div>
  );
}
