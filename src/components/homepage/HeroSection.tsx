import Image from "next/image";
import ButtonLink from "../ui/button-link-fortbildung";
import HeroStats from "./HeroStats";

export default function HeroSection() {
  return (
    <>
      <section
        id="hero"
        className="bg-[linear-gradient(180deg,#DDD7FE_0%,#FFF_100%)] bg-cover pt-31.5 lg:pt-41.5 xl:pt-31.5"
      >
        <div className="bg-[url('/images/bg-gradient.svg')] bg-cover bg-center">
          <div className="mx-auto flex max-w-304 flex-col items-center justify-between md:flex-row">
            <div className="px-4 pb-12.5 md:max-w-100 lg:max-w-135 lg:pb-18.5 xl:max-w-149 xl:px-0">
              <div className="space-y-4 text-center md:text-start">
                <span className="relative mx-auto flex w-fit animate-in items-center rounded-full border border-transparent duration-700 [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(to_right,#FFFFFF,transparent)_border-box] fade-in slide-in-from-top-4 md:mx-0">
                  <span className="flex items-center justify-between gap-1 rounded-full bg-[rgba(255,255,255,0.18)] p-1 pr-3 text-sm text-text-secondary backdrop-blur-[3.6500000953674316px]">
                    <span className="rounded-full bg-primary-base px-2.5 py-0.5 font-light text-text-primary">
                      Neu
                    </span>
                    <span className="flex items-center gap-1">
                      Jetzt aktuelle Kurse entdecken
                    </span>
                  </span>
                </span>
                <h1 className="animate-in text-display-md font-light -tracking-[1.2px] text-text-primary delay-150 duration-700 fill-mode-both fade-in slide-in-from-bottom-4 lg:text-display-lg xl:text-display-xl">
                  Ihre nächste Fortbildung beginnt hier
                </h1>
                <p className="animate-in text-md font-light text-text-secondary delay-300 duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
                  Entdecken Sie praxisnahe Fortbildungen in den Bereichen KI,
                  Digitalisierung, Pädagogik, Management und Gesundheit –
                  individuell und zukunftsorientiert.
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
            <Image
              src="/images/hero-certificate.svg"
              alt="Fortbildungszertifikat"
              width={480}
              height={600}
              className="h-auto w-72 animate-in delay-500 duration-1000 fill-mode-both fade-in md:w-72 lg:w-96 xl:w-120"
              priority
            />
          </div>
        </div>
      </section>

      <HeroStats />
    </>
  );
}
