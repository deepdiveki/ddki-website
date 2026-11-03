"use client";

import ExemplarySchedule from "@/components/paedagogischer-tag/ExemplarySchedule";
import ImageSlideshow from "@/components/paedagogischer-tag/ImageSlideshow";
import OrganisationProzess from "@/components/paedagogischer-tag/OrganisationProzess";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  HeartHandshake,
  Laptop,
  type LucideIcon,
} from "lucide-react";

const OFFER_POINTS: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Individuelle Planung",
    description:
      "Wir stimmen Inhalte und Ablauf gemeinsam mit Ihnen ab, passend zu den Zielen Ihrer Schule.",
    icon: ClipboardList,
  },
  {
    title: "Praxisnahe Workshops",
    description:
      "Hands-on-Sessions, in denen Lehrkräfte KI-Tools direkt ausprobieren und für ihren Unterricht nutzen lernen.",
    icon: Laptop,
  },
  {
    title: "Nachhaltige Begleitung",
    description:
      "Auch nach dem pädagogischen Tag stehen wir Ihnen mit weiterführenden Materialien und Beratung zur Seite.",
    icon: HeartHandshake,
  },
];

type PaedagogischerTagContentProps = {
  /** Nur für /fortbildung/niedersachsen — schmalere Spalte neben NLC-Sidebar */
  pageVariant?: "default" | "niedersachsen";
  /** „main“ / „schedule“: Abschnitt getrennt rendern (Niedersachsen-Seite) */
  part?: "all" | "main" | "schedule";
};

function ScheduleSection({
  sectionPadding,
}: {
  sectionPadding: string;
}) {
  return (
    <section className={cn("bg-white px-4 xl:px-0", sectionPadding)}>
      <div className="mx-auto max-w-304">
        <h2 className="text-display-xs font-semibold -tracking-[0.96px] text-text-primary lg:text-display-md">
          Exemplarischer Ablauf
        </h2>
        <p className="mt-4 max-w-180 text-md font-light text-text-secondary">
          So könnte ein pädagogischer Tag an Ihrer Schule aussehen, individuell
          anpassbar an Ihre Bedürfnisse.
        </p>

        <ExemplarySchedule />
      </div>
    </section>
  );
}

function OfferCards({
  pageVariant,
}: {
  pageVariant: PaedagogischerTagContentProps["pageVariant"];
}) {
  const isNiedersachsen = pageVariant === "niedersachsen";

  if (isNiedersachsen) {
    return (
      <div className="mt-8 rounded-2xl border border-border-tertiary bg-background-secondary p-5 md:mt-10">
        <ul className="flex flex-col gap-3">
          {OFFER_POINTS.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="flex gap-4 rounded-xl border border-border-tertiary border-l-4 border-l-primary-base bg-white p-4"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE] text-primary-base">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-medium text-text-primary">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {OFFER_POINTS.map(({ title, description }) => (
        <div
          key={title}
          className="rounded-2xl border border-border-tertiary p-6"
        >
          <h3 className="text-lg font-medium text-text-primary">{title}</h3>
          <p className="mt-2 text-sm font-light text-text-secondary">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function PaedagogischerTagContent({
  pageVariant = "default",
  part = "all",
}: PaedagogischerTagContentProps) {
  const isNiedersachsen = pageVariant === "niedersachsen";

  const sectionPadding = isNiedersachsen
    ? "py-8 md:py-10 lg:py-12"
    : "py-10 md:py-14 lg:py-20";

  const schedulePadding = isNiedersachsen
    ? "py-10 md:py-14 lg:py-20 pb-0 lg:pb-0"
    : sectionPadding;

  if (part === "schedule") {
    return <ScheduleSection sectionPadding={schedulePadding} />;
  }

  return (
    <>
      <section
        className={cn("bg-white px-4 xl:px-0", sectionPadding)}
      >
        <div className="mx-auto max-w-304">
          {isNiedersachsen ? (
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary-base">
                Pädagogischer Tag
              </p>
              <h2 className="mt-3 text-display-xs font-semibold -tracking-[0.96px] text-text-primary lg:text-display-md">
                Unser Angebot
              </h2>
              <p className="mt-4 text-md font-light text-text-secondary">
                Ein pädagogischer Tag bietet die ideale Gelegenheit, Ihr gesamtes
                Kollegium gemeinsam fortzubilden. Wir entwickeln ein
                maßgeschneidertes Programm, das auf die Bedürfnisse und den
                Wissensstand Ihrer Schule abgestimmt ist.
              </p>
            </div>
          ) : (
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary-base">
                  Pädagogischer Tag
                </p>
                <h2 className="mt-3 text-display-xs font-semibold -tracking-[0.96px] text-text-primary lg:text-display-md">
                  Unser Angebot
                </h2>
                <p className="mt-4 max-w-180 text-md font-light text-text-secondary">
                  Ein pädagogischer Tag bietet die ideale Gelegenheit, Ihr
                  gesamtes Kollegium gemeinsam fortzubilden. Wir entwickeln ein
                  maßgeschneidertes Programm, das auf die Bedürfnisse und den
                  Wissensstand Ihrer Schule abgestimmt ist.
                </p>
              </div>
            </div>
          )}

          <OfferCards pageVariant={pageVariant} />
        </div>
      </section>

      <ImageSlideshow sectionPadding={sectionPadding} />

      <section
        className={cn(
          "bg-background-secondary px-4 xl:px-0",
          sectionPadding,
        )}
      >
        <div className="mx-auto max-w-304">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary-base">
            So läuft es ab
          </p>
          <h2 className="mt-3 text-display-xs font-semibold -tracking-[0.96px] text-text-primary lg:text-display-md">
            Organisation
          </h2>
          <OrganisationProzess compact={isNiedersachsen} />
        </div>
      </section>

      {part === "all" ? (
        <ScheduleSection sectionPadding={schedulePadding} />
      ) : null}
    </>
  );
}
