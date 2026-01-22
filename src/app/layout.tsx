import type { Metadata } from "next";

interface RootLayoutProps {
  children: React.ReactNode;
}

const siteUrl = process.env.SITE_URL || "https://www.deepdive-ki.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DeepDiveKI Künstliche Intelligenz für Schulen und Universitäten",
  description:
    "Mit dem DeepChat, dem KI-Schulbüro und den Fortbildungen zum Thema KI, bieten wir eine breite Palette von KI Produkten für Ihre Institution an.",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "rapFK4LKVJ-ur_9PSHMiVY7sFbmvzuTvfYj7TS-bqNE.",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
