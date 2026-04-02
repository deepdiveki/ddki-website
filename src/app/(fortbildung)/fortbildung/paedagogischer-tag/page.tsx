import ImageSlideshow from "@/components/paedagogischer-tag/ImageSlideshow";
import CtaCard from "@/components/shared/CtaCard";
import LogoSlider from "@/components/shared/LogoSlider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pädagogischer Tag – Maßgeschneidert für Ihre Schule",
  description:
    "Gestalten Sie Ihren pädagogischen Tag mit maßgeschneiderten Fortbildungen rund um KI im Schulalltag – praxisnah, interaktiv und individuell.",
  openGraph: {
    title: "Pädagogischer Tag | DeepDive Fortbildungen",
    description:
      "Maßgeschneiderte KI-Fortbildungen für Ihr gesamtes Kollegium – von der Planung bis zur Nachbereitung.",
  },
};

export default function PaedagogischerTagPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] pt-31.5 pb-10 lg:pt-38 lg:pb-14">
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto max-w-304 px-4 text-center xl:px-0">
            <h1 className="text-display-sm font-light -tracking-[0.96px] text-text-primary lg:text-display-lg">
              Pädagogischer Tag
            </h1>
            <p className="mx-auto mt-3 max-w-150 text-md font-light text-text-secondary">
              Wir gestalten Ihren pädagogischen Tag praxisnah, interaktiv und
              individuell auf Ihre Schule zugeschnitten.
            </p>
          </div>
        </div>
      </section>

      <ImageSlideshow />

      <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <h2 className="text-display-xs font-light -tracking-[0.96px] text-text-primary lg:text-display-md">
            Unser Angebot
          </h2>
          <p className="mt-4 max-w-180 text-md font-light text-text-secondary">
            Ein pädagogischer Tag bietet die ideale Gelegenheit, Ihr gesamtes
            Kollegium gemeinsam fortzubilden. Wir entwickeln ein
            maßgeschneidertes Programm, das auf die Bedürfnisse und den
            Wissensstand Ihrer Schule abgestimmt ist.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border-tertiary p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Individuelle Planung
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Wir stimmen Inhalte und Ablauf gemeinsam mit Ihnen ab, passend
                zu den Zielen Ihrer Schule.
              </p>
            </div>
            <div className="rounded-2xl border border-border-tertiary p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Praxisnahe Workshops
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Hands-on-Sessions, in denen Lehrkräfte KI-Tools direkt
                ausprobieren und für ihren Unterricht nutzen lernen.
              </p>
            </div>
            <div className="rounded-2xl border border-border-tertiary p-6">
              <h3 className="text-lg font-medium text-text-primary">
                Nachhaltige Begleitung
              </h3>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Auch nach dem pädagogischen Tag stehen wir Ihnen mit
                weiterführenden Materialien und Beratung zur Seite.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-secondary px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <h2 className="text-display-xs font-light -tracking-[0.96px] text-text-primary lg:text-display-md">
            Ablauf
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Erstgespräch",
                description:
                  "Wir lernen Ihre Schule und Ihre Wünsche kennen.",
              },
              {
                step: "2",
                title: "Konzeption",
                description:
                  "Wir erstellen ein individuelles Programm für Ihren Tag.",
              },
              {
                step: "3",
                title: "Durchführung",
                description:
                  "Unser Team kommt zu Ihnen und führt den Tag vor Ort durch.",
              },
              {
                step: "4",
                title: "Nachbereitung",
                description:
                  "Sie erhalten Materialien und Empfehlungen für die Weiterarbeit.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col">
                <span className="text-display-sm font-light text-primary-base">
                  {item.step}
                </span>
                <h3 className="mt-2 text-lg font-medium text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-light text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <h2 className="text-display-xs font-light -tracking-[0.96px] text-text-primary lg:text-display-md">
            Exemplarischer Ablauf
          </h2>
          <p className="mt-4 max-w-180 text-md font-light text-text-secondary">
            So könnte ein pädagogischer Tag an Ihrer Schule aussehen, individuell
            anpassbar an Ihre Bedürfnisse.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border-tertiary">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-tertiary bg-background-secondary">
                  <th className="px-6 py-4 text-sm font-medium text-text-primary">
                    Uhrzeit
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-text-primary">
                    Module
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-text-primary">
                    Referenten
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    time: "08:30 - 09:00 Uhr",
                    module: "Keynote",
                    referent: "Björn Isenbiel und Tim Philipp",
                  },
                  {
                    time: "09:00 - 12:00 Uhr",
                    module:
                      "Crash Kurs KI - Unterstützung zum individualisierten Unterricht + Deep Dive Modul I - Unterrichtseinheiten konzipieren mit KI Tools",
                    referent: "Björn Isenbiel und Tim Philipp",
                  },
                  {
                    time: "Pause",
                    module: "Pause",
                    referent: "Pause",
                  },
                  {
                    time: "13:00 - 15:00 Uhr",
                    module:
                      "Deep Dive Modul II - Plagiate, Hausaufgaben und Klausuren in Zeiten von KI + Deep Dive Modul VII - KI Bots für deinen Unterricht erstellen",
                    referent: "Björn Isenbiel und Tim Philipp",
                  },
                  {
                    time: "15:00 - 15:30 Uhr",
                    module: "Reflexion und Abschluss",
                    referent: "",
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={
                      row.time === "Pause"
                        ? "border-b border-border-tertiary bg-background-secondary"
                        : "border-b border-border-tertiary last:border-b-0"
                    }
                  >
                    <td className="whitespace-nowrap px-6 py-4 align-top text-sm font-light text-text-secondary">
                      {row.time}
                    </td>
                    <td className="px-6 py-4 align-top text-sm font-light text-text-primary">
                      {row.module}
                    </td>
                    <td className="px-6 py-4 align-top text-sm font-light text-text-secondary">
                      {row.referent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <LogoSlider />
      <CtaCard />
    </div>
  );
}
