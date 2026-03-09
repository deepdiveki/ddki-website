'use client';
import { Suspense } from 'react';
import Breadcrumb from "@/components/Breadcrumb";
import PricingGrids from "@/components/DDKI-Toolbox/Pricing/PricingGrids";
import Features from "@/components/DDKI-Toolbox/Tools";

export default function AutoSigninPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="relative z-10 pb-18 pt-30 lg:pt-35 xl:pt-40">
      <div className="absolute left-0 top-25 -z-1 flex w-full flex-col gap-3 opacity-50">
        <div className="footer-bg-gradient h-[1.24px] w-full"></div>
        <div className="footer-bg-gradient h-[2.47px] w-full"></div>
        <div className="footer-bg-gradient h-[3.71px] w-full"></div>
        <div className="footer-bg-gradient h-[4.99px] w-full"></div>
        <div className="footer-bg-gradient h-[6.19px] w-full"></div>
        <div className="footer-bg-gradient h-[7.42px] w-full"></div>
        <div className="footer-bg-gradient h-[8.66px] w-full"></div>
        <div className="footer-bg-gradient h-[9.90px] w-full"></div>
        <div className="footer-bg-gradient h-[13px] w-full"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-1 h-24 w-full bg-gradient-to-b from-dark/0 to-dark"></div>

      <div className="px-4 text-center">
        <h1 className="text-heading-3 font-bold text-white">
          Schalten Sie jetzt alle Funktionalitäten des DeepChat frei!
        </h1>
        <ul className="flex items-center justify-center gap-2">
        </ul>
      </div>
    </section>
      <div className="pb-14">
      <Features />
      <PricingGrids />
      </div>
    </Suspense>
  );
}