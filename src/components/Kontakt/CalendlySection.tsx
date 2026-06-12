"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import Button from "@/components/ui/button-fortbildung";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "@/components/ui/section-header-fortbildung";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/info-4_qi/kennenlernen";

function initializeCalendlyWidget(container: HTMLDivElement | null) {
  if (!container || !window.Calendly) {
    return;
  }

  container.innerHTML = "";
  window.Calendly.initInlineWidget({
    url: CALENDLY_URL,
    parentElement: container,
  });
}

function setFunctionalConsent(value: boolean) {
  try {
    const next = { essential: true, functional: value };
    localStorage.setItem("cookieConsent", JSON.stringify(next));
    window.dispatchEvent(
      new CustomEvent("cookieConsentUpdated", { detail: next }),
    );
  } catch (error) {
    console.error("Cookie-Consent konnte nicht gespeichert werden:", error);
  }
}

export default function CalendlySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasFunctionalConsent = useCookieConsent();
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (hasFunctionalConsent && scriptReady) {
      initializeCalendlyWidget(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [hasFunctionalConsent, scriptReady]);

  return (
    <>
      <section className="bg-background-secondary px-4 pb-10 md:pb-14 lg:px-4 lg:pb-20 xl:px-28">
        <div className="mx-auto max-w-304">
          <SectionHeader className="mb-10 md:mb-12 lg:mb-16">
            <HeaderTitle>Lass uns gemeinsam starten!</HeaderTitle>
            <HeaderSubtitle>
              Wir wollen Sie kennenlernen: Buchen Sie direkt einen Termin in
              unserem Kalender.
            </HeaderSubtitle>
          </SectionHeader>

          {hasFunctionalConsent ? (
            <>
              <div className="overflow-hidden rounded-[20px] border border-border-tertiary bg-white p-2 shadow-sm md:p-3">
                <div
                  ref={containerRef}
                  className="calendly-inline-widget w-full"
                  data-url={CALENDLY_URL}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
              <p className="mt-4 text-center text-xs text-text-tertiary">
                Calendly-Einbindung aktiv.{" "}
                <button
                  type="button"
                  onClick={() => setFunctionalConsent(false)}
                  className="underline hover:text-text-primary"
                >
                  Einwilligung widerrufen
                </button>
              </p>
            </>
          ) : (
            <ConsentPlaceholder loading={hasFunctionalConsent === null} />
          )}
        </div>
      </section>

      {hasFunctionalConsent && (
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
          onReady={() => {
            setScriptReady(true);
            initializeCalendlyWidget(containerRef.current);
          }}
        />
      )}
    </>
  );
}

function ConsentPlaceholder({ loading }: { loading: boolean }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[20px] border border-border-tertiary bg-white p-6 text-center shadow-sm md:p-8">
      <p className="text-sm leading-relaxed text-text-secondary">
        Calendly wird erst nach Ihrer Einwilligung geladen. 
        <br />
        Details finden Sie in der{" "}
        <Link
          href="/datenschutz"
          className="underline underline-offset-2 hover:text-text-primary"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="flex flex-col items-center gap-3">
        <Button
          type="button"
          variant="primary"
          onClick={() => setFunctionalConsent(true)}
          disabled={loading}
        >
          Calendly aktivieren und Termin buchen
        </Button>
        <a
          href="#kontaktformular"
          className="text-xs text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline"
        >
          Oder Termin über Kontaktformular anfragen
        </a>
      </div>
    </div>
  );
}
