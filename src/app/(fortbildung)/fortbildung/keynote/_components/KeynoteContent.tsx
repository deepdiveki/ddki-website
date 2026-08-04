"use client";

import { GrainCard } from "@/components/fortbildungen/GrainCard";
import CtaCard from "@/components/shared/CtaCard";
import LogoSlider from "@/components/shared/LogoSlider";
import ButtonLink from "@/components/ui/button-link-fortbildung";
import {
  HeaderEyebrow,
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "@/components/ui/section-header-fortbildung";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Award,
  Brain,
  GraduationCap,
  Lightbulb,
  MapPin,
  Presentation,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";

const FACTS = [
  { icon: MapPin, label: "Vor Ort oder digital" },
  { icon: SlidersHorizontal, label: "Individuell zugeschnitten" },
  { icon: Users, label: "Für Konferenzen & pädagogische Tage" },
];

const KEYNOTES: {
  icon: typeof Brain;
  title: string;
  description: string;
  gradient: "aurora" | "purple" | "ocean";
}[] = [
  {
    icon: Presentation,
    title: "KI im Klassenzimmer",
    description:
      "Wie Künstliche Intelligenz den Unterricht verändert und welche Chancen sich für Lehrkräfte und Lernende ergeben.",
    gradient: "aurora",
  },
  {
    icon: Brain,
    title: "Zukunft der Bildung",
    description:
      "Ein Blick auf die Trends und Entwicklungen, die das Bildungssystem in den kommenden Jahren prägen werden.",
    gradient: "purple",
  },
  {
    icon: Shield,
    title: "Datenschutz & Ethik",
    description:
      "Verantwortungsvoller Umgang mit KI-Werkzeugen im schulischen Kontext. Was ist erlaubt und worauf sollte man achten?",
    gradient: "ocean",
  },
];

const REASONS = [
  {
    icon: Lightbulb,
    title: "Impulse setzen",
    description:
      "Eröffnen Sie Ihre Veranstaltung mit einem inspirierenden Vortrag, der zum Nachdenken und Handeln anregt.",
  },
  {
    icon: GraduationCap,
    title: "Wissen vermitteln",
    description:
      "Komplexe Themen rund um KI werden verständlich und anschaulich aufbereitet, auch für Einsteiger.",
  },
  {
    icon: Sparkles,
    title: "Flexibel & individuell",
    description:
      "Jede Keynote wird auf Ihr Publikum und Ihre Veranstaltung zugeschnitten, vor Ort oder digital.",
  },
  {
    icon: Award,
    title: "Erfahrene Referenten",
    description:
      "Unsere Referenten bringen fundiertes Fachwissen und jahrelange Praxiserfahrung aus dem Bildungsbereich mit.",
  },
];

const SPEAKERS = [
  {
    name: "Björn Isenbiel",
    role: "Geschäftsführer DeepDiveKI\nLehrkraft für PGW, Informatik & Sport",
    image: "/images/team/team-01-cutout.png",
    back: {
      intro:
        "Geschäftsführer und Mitgründer von DeepDiveKI, aktive Lehrkraft. Verbindet Schulpraxis mit KI-Expertise.",
      points: [
        "Wissenschaftlicher Mitarbeiter an der Leuphana und Doktorand im Bereich Künstliche Intelligenz und Bildung",
        "Keynotes & Fortbildungen für Kollegien und Konferenzen",
        "Entwickler des Video-KI-Komplettkurses für Lehrkräfte",
        "Schwerpunkte: KI im Unterricht, Prompting, Schulentwicklung",
      ],
    },
  },
  {
    name: "Tim Philipp",
    role: "Geschäftsführer DeepDiveKI\nLehrkraft für Informatik & Sport",
    image: "/images/team/team-02-cutout.png",
    back: {
      intro:
        "Geschäftsführer und Mitgründer  von DeepDiveKI mit langjähriger Erfahrung in der Lehre. Bringt Technik und Didaktik zusammen.",
      points: [
        "Workshops & pädagogische Tage mit hohem Praxisanteil",
        "Entwicklung des DeepChat für Schulen",
        "Schwerpunkte: KI, Datenschutz, Digitalisierung",
      ],
    },
  },
];

const STEPS = [
  {
    step: "1",
    title: "Anfrage",
    description: "Sie schildern uns kurz Anlass, Publikum und Termin.",
  },
  {
    step: "2",
    title: "Abstimmung",
    description: "Wir schneiden Thema und Schwerpunkte auf Ihre Veranstaltung zu.",
  },
  {
    step: "3",
    title: "Ihre Keynote",
    description: "Wir begeistern Ihr Publikum, vor Ort oder digital.",
  },
];

export default function KeynoteContent() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] hero-offset pb-10 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
            <p className="mb-3 text-sm font-medium tracking-[0.14em] text-primary-base uppercase">
              Impulse für Ihr Kollegium
            </p>
            <h1 className="text-display-sm font-semibold -tracking-[0.96px] text-text-primary lg:text-display-lg">
              Keynote
            </h1>
            <p className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
              Inspirierende Vorträge zu KI in der Bildung für Konferenzen,
              Schulveranstaltungen und pädagogische Tage.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/fortbildung/kontakt">
                Keynote anfragen
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {FACTS.map((fact) => (
                <span
                  key={fact.label}
                  className="flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm text-text-secondary shadow-sm backdrop-blur-md"
                >
                  <fact.icon className="size-4 text-primary-darker" />
                  {fact.label}
                </span>
              ))}
            </div>

            {/* Referenten direkt im Hero – Karten drehen sich beim Hovern */}
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:mt-16">
              {SPEAKERS.map((speaker, index) => (
                <motion.div
                  key={speaker.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2 + index * 0.12,
                  }}
                  className="group h-105 sm:h-110 lg:h-105 [perspective:1400px]"
                >
                  <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:group-hover:[transform:none]">
                    {/* Vorderseite */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-sm [backface-visibility:hidden]">
                      <div className="mx-auto w-fit rounded-full p-1 [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)]">
                        <div className="relative size-36 overflow-hidden rounded-full border-4 border-white bg-[#DDD7FE]">
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            fill
                            sizes="144px"
                            className="rounded-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-text-primary">
                        {speaker.name}
                      </h3>
                      <p className="mt-1.5 text-sm font-light leading-relaxed text-text-secondary">
                        {speaker.role.split("\n").map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Rückseite */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl p-5 shadow-sm [backface-visibility:hidden] [background:linear-gradient(155deg,#8b5cf6_0%,#a78bfa_38%,#d68cfa_72%,#f0bdfa_100%)] [transform:rotateY(180deg)]">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                          backgroundSize: "140px 140px",
                        }}
                      />
                      <div className="relative flex h-full flex-col rounded-xl border border-white/25 bg-white/10 p-4 backdrop-blur-md">
                        <h3 className="text-lg font-semibold text-white">
                          {speaker.name}
                        </h3>
                        <p className="mt-1.5 text-sm font-light leading-relaxed text-white/90">
                          {speaker.back.intro}
                        </p>
                        <div className="my-3 h-px w-full bg-white/25" />
                        <ul className="flex flex-col gap-2.5">
                          {speaker.back.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5">
                              <span className="mt-1.5 flex size-3 shrink-0 items-center justify-center rounded-full border-2 border-emerald-300/90">
                                <span className="size-1 rounded-full bg-emerald-300" />
                              </span>
                              <span className="text-sm text-white/95">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Themen */}
      <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <SectionHeader>
            <HeaderEyebrow>Unsere Keynotes</HeaderEyebrow>
            <HeaderTitle>Drei Themen, die bewegen</HeaderTitle>
            <HeaderSubtitle>
              Unsere Keynotes verbinden aktuelle Forschung mit praxisnahen
              Einblicken. Verständlich, motivierend und mit konkreten
              Beispielen.
            </HeaderSubtitle>
          </SectionHeader>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16">
            {KEYNOTES.map((keynote, index) => (
              <motion.div
                key={keynote.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <GrainCard
                  gradient={keynote.gradient}
                  className="h-full max-w-none"
                >
                  <div className="flex h-full flex-col rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-md">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/85">
                      <keynote.icon className="size-5.5 text-primary-darker" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {keynote.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-white/90">
                      {keynote.description}
                    </p>
                  </div>
                </GrainCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warum buchen */}
      <section className="bg-[#F9F8FB] px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <SectionHeader>
            <HeaderEyebrow>Ihre Vorteile</HeaderEyebrow>
            <HeaderTitle>Warum eine Keynote buchen?</HeaderTitle>
          </SectionHeader>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {REASONS.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: (index % 4) * 0.1,
                }}
                className="rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-base/10">
                  <reason.icon className="size-5.5 text-primary-base" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-text-secondary">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <SectionHeader>
            <HeaderEyebrow>So läuft es ab</HeaderEyebrow>
            <HeaderTitle>In drei Schritten zu Ihrer Keynote</HeaderTitle>
          </SectionHeader>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-14 lg:mt-16"
          >
            <GrainCard gradient="ocean" className="max-w-none p-5 sm:p-8">
              <div className="grid gap-4 md:grid-cols-3">
                {STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-md"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white/90 text-md font-semibold text-primary-darker">
                      {item.step}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-light leading-relaxed text-white/85">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </GrainCard>
          </motion.div>
        </div>
      </section>

      <LogoSlider />
      <CtaCard />
    </div>
  );
}
