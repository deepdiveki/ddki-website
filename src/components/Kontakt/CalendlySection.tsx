"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import {
  HeaderSubtitle,
  HeaderTitle,
  SectionHeader,
} from "@/components/ui/section-header-fortbildung";

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

export default function CalendlySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeCalendlyWidget(containerRef.current);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

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

          <div className="overflow-hidden rounded-[20px] border border-border-tertiary bg-white p-2 shadow-sm md:p-3">
            <div
              ref={containerRef}
              className="calendly-inline-widget w-full"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </div>
      </section>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => initializeCalendlyWidget(containerRef.current)}
      />
    </>
  );
}
