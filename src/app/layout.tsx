import type { Metadata } from "next";
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
    default: "DeepDiveKI – KI-Fortbildungen & Software für Schulen | DSGVO-konform",
  },
  description:
    "DSGVO-konforme KI-Tools und Fortbildungen für Schulen: DeepChat, KI-Schulbüro & praxisnahe Lehrerfortbildungen. Made in Hamburg. Jetzt kostenlos testen.",
  alternates: {
    canonical: "/",
  },
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
    title: "DeepDiveKI – KI-Fortbildungen & Software für Schulen",
    description:
      "DSGVO-konforme KI-Tools und Fortbildungen für Schulen: DeepChat, KI-Schulbüro & praxisnahe Lehrerfortbildungen. Made in Hamburg.",
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
    title: "DeepDiveKI – KI-Fortbildungen & Software für Schulen",
    description:
      "DSGVO-konforme KI-Tools und Fortbildungen für Schulen. Made in Hamburg.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
