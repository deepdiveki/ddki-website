import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import "../styles/animate.css";
import "../styles/prism-vsc-dark-plus.css";
import "../styles/star.css";
import "../styles/tailwind.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const siteUrl = process.env.SITE_URL || "https://www.deepdive-ki.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | DeepDiveKI",
    default: "DeepDiveKI – KI-Lösungen für Schulen und Universitäten",
  },
  description:
    "Mit dem DeepChat, dem KI-Schulbüro und den Fortbildungen zum Thema KI, bieten wir eine breite Palette von KI Produkten für Ihre Institution an.",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "rapFK4LKVJ-ur_9PSHMiVY7sFbmvzuTvfYj7TS-bqNE.",
  },
  openGraph: {
    type: "website",
    siteName: "DeepDiveKI",
    locale: "de_DE",
    url: siteUrl,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DeepDiveKI – KI-Lösungen für Schulen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
