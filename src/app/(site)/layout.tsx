"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import NextTopLoader from "nextjs-toploader";
import { usePathname } from "next/navigation";
import "../../styles/animate.css";
import "../../styles/prism-vsc-dark-plus.css";
import "../../styles/star.css";
import "../../styles/tailwind.css";
import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith("/escape-game/tutorial");

  return (
    <html lang="de">
      <body>
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
      </body>
    </html>
  );
}
