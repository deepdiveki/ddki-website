"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import ToasterContext from "@/app/context/ToastContext";
import { BASE_PATH } from "@/lib/constants";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith(`${BASE_PATH}/escape-game/tutorial`);

  return (
    <>
      <NextTopLoader
        color="#8646F4"
        crawlSpeed={300}
        showSpinner={false}
        shadow="none"
      />
      <ToasterContext />
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
      {!hideChrome && <ScrollToTop />}
    </>
  );
}
