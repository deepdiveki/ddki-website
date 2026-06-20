import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";

const nlcTrainings = [
  {
    date: "25.08.2026",
    time: "16:00 - 19:00 Uhr",
    name: "Deep Dive Modul II: Plagiate, Hausaufgaben und Klausuren in Zeiten von KI",
    url: "https://nlc.info/app/edb/event/55620",
  },
  {
    date: "31.08.2026",
    time: "16:00 - 19:00 Uhr",
    name: "Datenschutz und Sicherheit im Internet",
    url: "https://nlc.info/app/edb/event/53839",
  },
  {
    date: "08.09.2026",
    time: "16:00 - 19:00 Uhr",
    name: "Crash Kurs KI: Unterstützung zum individualisierten Unterricht",
    url: "https://nlc.info/app/edb/event/55619",
  },
];

export default function NlcTrainingOverview() {
  return (
    <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
      <div className="mx-auto max-w-304">
        <div className="max-w-180">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary-base">
            NLC-Termine
          </p>
          <h2 className="mt-3 text-display-xs font-light -tracking-[0.96px] text-text-primary lg:text-display-md">
            Unsere nächsten Fortbildungen im NLC
          </h2>
          <p className="mt-4 text-md font-light text-text-secondary">
            Melden Sie sich direkt über das Niedersächsische LernCenter an. Die
            Termine führen jeweils zur passenden NLC-Veranstaltungsseite.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {nlcTrainings.map((training) => (
            <a
              key={`${training.date}-${training.name}`}
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
                  className="h-5 w-5 text-text-tertiary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-base"
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
          ))}
        </div>
      </div>
    </section>
  );
}
