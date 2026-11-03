import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const nlcTrainings = [
  {
    date: "03.12.2026",
    time: "16:00 - 19:00 Uhr",
    name: "KI-Praxislabor für Fortgeschrittene",
    url: "https://nlc.info/app/edb/event/57601",
  },
  {
    date: "07.12.2026",
    time: "16:00 - 19:00 Uhr",
    name: "Chancen und Risiken von KI in Schule und Gesellschaft",
    url: "https://nlc.info/app/edb/event/57540",
  },
  {
    date: "09.12.2026",
    time: "16:00 - 19:00 Uhr",
    name: "Resilienz im Schulalltag: Kraft tanken und langfristig gesund bleiben",
    url: "https://nlc.info/app/edb/event/57603",
  },
] as const;

type NlcTrainingOverviewProps = {
  variant?: "section" | "sidebar";
};

function NlcTrainingCard({
  training,
}: {
  training: (typeof nlcTrainings)[number];
}) {
  return (
    <a
      href={training.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-lg border border-border-tertiary bg-white p-5 transition hover:-translate-y-1 hover:border-primary-base hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-base">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <span>{training.date}</span>
        </div>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-text-tertiary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-base"
          aria-hidden="true"
        />
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm font-light text-text-secondary">
        <Clock className="h-4 w-4" aria-hidden="true" />
        <span>{training.time}</span>
      </div>

      <h3 className="mt-5 text-lg font-medium leading-snug text-text-primary">
        {training.name}
      </h3>
    </a>
  );
}

function NlcTrainingSidebarItem({
  training,
}: {
  training: (typeof nlcTrainings)[number];
}) {
  return (
    <a
      href={training.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 px-4 py-3.5 transition hover:bg-background-secondary"
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-primary-base">
          {training.date}
          <span className="font-light text-text-tertiary"> · </span>
          <span className="font-light text-text-secondary">{training.time}</span>
        </p>
        <p className="mt-1.5 text-sm font-medium leading-snug text-text-primary">
          {training.name}
        </p>
      </div>
      <ArrowUpRight
        className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary transition group-hover:text-primary-base"
        aria-hidden="true"
      />
    </a>
  );
}

function NlcTrainingIntro({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("max-w-180", className)}>
      <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary-base">
        NLC-Termine
      </p>
      <h2
        className={cn(
          "mt-3 text-text-primary",
          compact
            ? "text-lg font-medium leading-snug"
            : "text-display-xs font-light -tracking-[0.96px] lg:text-display-md",
        )}
      >
        Unsere nächsten Fortbildungen im NLC
      </h2>
      <p
        className={cn(
          "mt-4 font-light text-text-secondary",
          compact ? "text-sm leading-relaxed" : "text-md",
        )}
      >
        Melden Sie sich direkt über das Niedersächsische LernCenter an. Die
        Termine führen jeweils zur passenden NLC-Veranstaltungsseite.
      </p>
    </div>
  );
}

export default function NlcTrainingOverview({
  variant = "section",
}: NlcTrainingOverviewProps) {
  const isSidebar = variant === "sidebar";

  if (isSidebar) {
    return (
      <div className="rounded-2xl border border-border-tertiary bg-background-secondary p-5 lg:p-6">
        <NlcTrainingIntro className="max-w-none" compact />
        <ul className="mt-6 divide-y divide-border-tertiary overflow-hidden rounded-lg border border-border-tertiary bg-white">
          {nlcTrainings.map((training) => (
            <li key={`${training.date}-${training.name}`}>
              <NlcTrainingSidebarItem training={training} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
      <div className="mx-auto max-w-304">
        <NlcTrainingIntro />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {nlcTrainings.map((training) => (
            <NlcTrainingCard
              key={`${training.date}-${training.name}`}
              training={training}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
