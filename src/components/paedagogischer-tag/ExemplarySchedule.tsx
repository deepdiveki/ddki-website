import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const REFERENTS = {
  bjoern: {
    name: "Björn Isenbiel",
    image: "/images/team/team-01.png",
  },
  tim: {
    name: "Tim Philipp",
    image: "/images/team/team-02.png",
  },
} as const;

const CELL_CLASS = "px-6 py-5 align-middle";
const TIME_CELL_CLASS = cn(CELL_CLASS, "whitespace-nowrap");

type ModuleEntry = {
  text: string;
  href: string;
};

type SharedSlot = {
  type: "shared";
  time: string;
  title: string;
  variant: "keynote" | "break" | "closing";
  href?: string;
};

type ParallelSlot = {
  type: "parallel";
  time: string;
  bjoern: ModuleEntry;
  tim: ModuleEntry;
};

type ScheduleSlot = SharedSlot | ParallelSlot;

const SCHEDULE: ScheduleSlot[] = [
  {
    type: "shared",
    time: "09:00 – 09:30 Uhr",
    title: "Keynote",
    variant: "keynote",
    href: "/fortbildung/keynote",
  },
  {
    type: "parallel",
    time: "09:30 – 11:00 Uhr",
    bjoern: {
      text: "Crash Kurs KI: Der kompakte Einstieg in KI für Schule und Unterricht",
      href: "/fortbildung/fortbildungen/crash-kurs-ki",
    },
    tim: {
      text: "Modul I: Unterrichtseinheiten konzipieren mit KI Tools",
      href: "/fortbildung/fortbildungen/deep-dive-modul-1",
    },
  },
  {
    type: "shared",
    time: "11:00 – 12:00 Uhr",
    title: "Pause",
    variant: "break",
  },
  {
    type: "parallel",
    time: "12:00 – 13:30 Uhr",
    bjoern: {
      text: "Modul II: Plagiate, Hausaufgaben und Klausuren in Zeiten von KI",
      href: "/fortbildung/fortbildungen/deep-dive-modul-2",
    },
    tim: {
      text: "Modul III: Chancen und Risiken von KI in Schule und Gesellschaft",
      href: "/fortbildung/fortbildungen/deep-dive-modul-3",
    },
  },
  {
    type: "shared",
    time: "13:30 – 14:00 Uhr",
    title: "Reflexion und Abschluss",
    variant: "closing",
  },
];

const linkClassName =
  "underline-offset-2 transition-colors hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary-base/20 focus-visible:outline-none";

function ModuleText({ text, href }: { text: string; href: string }) {
  const colonIndex = text.indexOf(":");
  const titlePart = colonIndex === -1 ? text : text.slice(0, colonIndex + 1);
  const descriptionPart = colonIndex === -1 ? null : text.slice(colonIndex + 1);

  return (
    <>
      <Link
        href={href}
        className={cn("font-medium text-text-primary", linkClassName)}
      >
        {titlePart}
      </Link>
      {descriptionPart && (
        <span className="font-light text-text-secondary">{descriptionPart}</span>
      )}
    </>
  );
}

function ReferentHeader({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-border-tertiary">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="36px"
        />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide text-text-tertiary uppercase">
          Module
        </p>
        <p className="text-sm font-medium text-text-primary">{name}</p>
      </div>
    </div>
  );
}

function ReferentLabel({ name, image }: { name: string; image: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <div className="relative size-6 shrink-0 overflow-hidden rounded-full border border-border-tertiary">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="24px"
        />
      </div>
      <span className="text-xs font-medium text-text-secondary">{name}</span>
    </div>
  );
}

function TimeLabel({
  time,
  parallel,
  className,
}: {
  time: string;
  parallel?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <time className="text-sm font-medium text-text-primary tabular-nums">
        {time}
      </time>
      {parallel && (
        <span className="rounded-full bg-background-secondary px-2 py-0.5 text-[10px] font-medium tracking-wide text-text-secondary uppercase">
          Parallel
        </span>
      )}
    </div>
  );
}

function SharedContent({
  title,
  variant,
  href,
}: {
  title: string;
  variant: SharedSlot["variant"];
  href?: string;
}) {
  const className = cn(
    "text-sm",
    variant === "break"
      ? "font-light italic text-text-tertiary"
      : "font-medium text-text-primary",
  );

  if (href) {
    return (
      <Link href={href} className={cn(className, linkClassName)}>
        {title}
      </Link>
    );
  }

  return <p className={className}>{title}</p>;
}

function MobileSchedule() {
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {SCHEDULE.map((slot) => (
        <div
          key={slot.time}
          className="rounded-2xl border border-border-tertiary bg-white p-4"
        >
          <TimeLabel
            time={slot.time}
            parallel={slot.type === "parallel"}
          />

          {slot.type === "shared" ? (
            <div className="mt-3">
              <SharedContent
                title={slot.title}
                variant={slot.variant}
                href={slot.href}
              />
            </div>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="flex h-full flex-col rounded-xl border border-border-tertiary bg-white p-4">
                <ReferentLabel
                  name={REFERENTS.bjoern.name}
                  image={REFERENTS.bjoern.image}
                />
                <p className="flex flex-1 items-center text-sm leading-relaxed">
                  <ModuleText text={slot.bjoern.text} href={slot.bjoern.href} />
                </p>
              </div>
              <div className="flex h-full flex-col rounded-xl border border-border-tertiary bg-white p-4">
                <ReferentLabel
                  name={REFERENTS.tim.name}
                  image={REFERENTS.tim.image}
                />
                <p className="flex flex-1 items-center text-sm leading-relaxed">
                  <ModuleText text={slot.tim.text} href={slot.tim.href} />
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DesktopSchedule() {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border-tertiary md:block">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="border-b border-border-tertiary bg-white">
            <th className="w-[18%] px-6 py-4 text-sm font-medium text-text-primary">
              Uhrzeit
            </th>
            <th className="w-[41%] border-l border-border-tertiary px-6 py-4">
              <ReferentHeader
                name={REFERENTS.bjoern.name}
                image={REFERENTS.bjoern.image}
              />
            </th>
            <th className="w-[41%] border-l border-border-tertiary px-6 py-4">
              <ReferentHeader
                name={REFERENTS.tim.name}
                image={REFERENTS.tim.image}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {SCHEDULE.map((slot, index) => {
            const isLast = index === SCHEDULE.length - 1;

            if (slot.type === "shared") {
              return (
                <tr
                  key={slot.time}
                  className={cn(
                    !isLast && "border-b border-border-tertiary",
                    "bg-white",
                  )}
                >
                  <td className={TIME_CELL_CLASS}>
                    <TimeLabel time={slot.time} />
                  </td>
                  <td
                    colSpan={2}
                    className={cn(
                      CELL_CLASS,
                      "border-l border-border-tertiary text-center",
                    )}
                  >
                    <SharedContent
                      title={slot.title}
                      variant={slot.variant}
                      href={slot.href}
                    />
                  </td>
                </tr>
              );
            }

            return (
              <tr
                key={slot.time}
                className={cn(
                  !isLast && "border-b border-border-tertiary",
                  "bg-white",
                )}
              >
                <td className={TIME_CELL_CLASS}>
                  <TimeLabel time={slot.time} parallel />
                </td>
                <td className={cn(CELL_CLASS, "border-l border-border-tertiary")}>
                  <p className="text-sm leading-relaxed">
                    <ModuleText text={slot.bjoern.text} href={slot.bjoern.href} />
                  </p>
                </td>
                <td className={cn(CELL_CLASS, "border-l border-border-tertiary")}>
                  <p className="text-sm leading-relaxed">
                    <ModuleText text={slot.tim.text} href={slot.tim.href} />
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function ExemplarySchedule() {
  return (
    <div className="mt-10">
      <MobileSchedule />
      <DesktopSchedule />

      <p className="mt-4 max-w-180 text-sm font-light text-text-tertiary">
        <span className="font-medium text-text-secondary">Hinweis:</span> In den
        parallelen Slots wählen die Teilnehmenden einen der beiden Workshops.
      </p>
    </div>
  );
}
