import ButtonLink from "../ui/button-link-fortbildung";
import HeroStats from "./HeroStats";
import HeroVideo from "./HeroVideo";

export default function HeroSection() {
  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] bg-cover hero-offset"
      >
        {/* Weiche Farb-Blobs im Hintergrund */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(134,70,244,0.25),transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 -right-52 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(211,69,248,0.18),transparent_70%)] blur-3xl"
        />

        <div className="relative bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto flex max-w-304 flex-col items-center justify-between gap-12 pb-14 md:flex-row md:gap-6 lg:gap-10 lg:pb-20">
            <div className="px-4 pb-12.5 md:max-w-100 lg:max-w-135 lg:pb-18.5 xl:max-w-149 xl:px-0">
              <div className="space-y-4 text-center md:text-start">
                <p className="animate-in text-sm font-medium tracking-[0.14em] text-primary-base uppercase delay-100 duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
                  DeepDiveKI · Fortbildungen
                </p>
                <h1 className="animate-in text-display-md font-semibold -tracking-[1.2px] text-text-primary delay-150 duration-700 fill-mode-both fade-in slide-in-from-bottom-4 lg:text-display-lg xl:text-display-xl">
                  Ihre nächste Fortbildung beginnt hier
                </h1>
                <p className="animate-in text-md font-light text-text-secondary delay-300 duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
                  Entdecken Sie praxisnahe Fortbildungen in den Bereichen KI,
                  Digitalisierung, Pädagogik, Management und Gesundheit.
                  Individuell und zukunftsorientiert.
                </p>
              </div>

              <div className="mt-6 flex animate-in items-center justify-center gap-4 delay-500 duration-700 fill-mode-both fade-in slide-in-from-bottom-4 md:mt-11 md:justify-start">
                <ButtonLink href="/fortbildung/fortbildungen">
                  Fortbildungen entdecken
                </ButtonLink>
                <ButtonLink href="/fortbildung/kontakt" variant="secondary">
                  Kontakt aufnehmen
                </ButtonLink>
              </div>
            </div>
            <HeroVideo />
          </div>
        </div>
      </section>

      <HeroStats />
    </>
  );
}
