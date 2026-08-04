"use client";

import ExemplarySchedule from "@/components/paedagogischer-tag/ExemplarySchedule";
import ImageSlideshow from "@/components/paedagogischer-tag/ImageSlideshow";
import OrganisationProzess from "@/components/paedagogischer-tag/OrganisationProzess";
import { GlassPanel, GlassStep, GrainCard } from "@/components/fortbildungen/GrainCard";


export default function PaedagogischerTagContent() {
  return (
    <>
      <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary-base">
                Pädagogischer Tag
              </p>
              <h2 className="mt-3 text-display-xs font-semibold -tracking-[0.96px] text-text-primary lg:text-display-md">
                Unser Angebot
              </h2>
              <p className="mt-4 max-w-180 text-md font-light text-text-secondary">
                Ein pädagogischer Tag bietet die ideale Gelegenheit, Ihr gesamtes
                Kollegium gemeinsam fortzubilden. Wir entwickeln ein
                maßgeschneidertes Programm, das auf die Bedürfnisse und den
                Wissensstand Ihrer Schule abgestimmt ist.
              </p>
            </div>
            <GrainCard gradient="aurora">
              <GlassPanel>
                <p className="text-sm font-medium text-white">
                  Ihr pädagogischer Tag mit DeepDiveKI
                </p>
                <div className="my-3 h-px w-full bg-white/20" />
                <div className="flex flex-col gap-2.5">
                  <GlassStep>Auftakt-Keynote: KI im Schulalltag</GlassStep>
                  <GlassStep>Parallele Praxis-Workshops nach Fachgruppen</GlassStep>
                  <GlassStep>Transfer-Phase: nächste Schritte fürs Kollegium</GlassStep>
                  <GlassStep>Materialpaket für alle Lehrkräfte</GlassStep>
                </div>
              </GlassPanel>
              <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/25 bg-white/10 p-3 text-center backdrop-blur-md">
                {[
                  ["1 Tag", "vor Ort"],
                  ["100 %", "Kollegium"],
                  ["0", "Vorwissen nötig"],
                ].map(([value, label]) => (
                  <div key={label} className="flex-1">
                    <p className="text-lg font-semibold text-white">{value}</p>
                    <p className="text-xs text-white/70">{label}</p>
                  </div>
                ))}
              </div>
            </GrainCard>
          </div>

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

      <ImageSlideshow />

      <section className="bg-background-secondary px-4 py-10 md:py-14 lg:py-20 xl:px-0">
        <div className="mx-auto max-w-304">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary-base">
            So läuft es ab
          </p>
          <h2 className="mt-3 text-display-xs font-semibold -tracking-[0.96px] text-text-primary lg:text-display-md">
            Organisation
          </h2>
          <OrganisationProzess />
        </div>
      </section>

      <section className="bg-white px-4 py-10 md:py-14 lg:py-20 xl:px-0">
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
    </>
  );
}
