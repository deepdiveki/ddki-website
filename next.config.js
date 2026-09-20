/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Bilder liegen vorab als passend skalierte WebP-Dateien in public/images.
    // Die serverseitige Optimierung (sharp) hat den Scalingo-Container bei
    // jedem Cache-Miss sekundenlang blockiert und alle anderen Requests
    // mitgezogen. Nachteil: kein srcset, d.h. Mobile lädt dieselbe Datei.
    unoptimized: true,
  },
  output: "standalone", // Optimize the build for standalone deployment
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    // Dateien aus public/ liefert Next standardmäßig mit max-age=0 aus, d.h.
    // jeder Seitenaufruf validiert jedes Bild/Video erneut gegen den Server.
    // Eine Woche Browser-Cache entlastet den Container spürbar.
    const staticCache = {
      key: "Cache-Control",
      value: "public, max-age=604800, stale-while-revalidate=86400",
    };
    return ["/images/:path*", "/video/:path*", "/pdfs/:path*", "/fonts/:path*"].map(
      (source) => ({ source, headers: [staticCache] }),
    );
  },
  async redirects() {
    return [
      {
        source: "/kontakt",
        destination: "/software/kontakt",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/software/about",
        permanent: true,
      },
      {
        source: "/fortbildung/fortbildungen/deep-dive-modul-4",
        destination: "/fortbildung/fortbildungen/inklusion-und-ki",
        permanent: true,
      },
      {
        source: "/fortbildung/fortbildungen/deep-dive-modul-5",
        destination: "/fortbildung/fortbildungen/ki-fuer-schulleitung",
        permanent: true,
      },
      {
        source: "/fortbildung/fortbildungen/deep-dive-modul-6",
        destination: "/fortbildung/fortbildungen/deepchat-einfuehrung",
        permanent: true,
      },
      {
        source: "/fortbildung/fortbildungen/deep-dive-modul-8",
        destination: "/fortbildung/fortbildungen/datenschutz",
        permanent: true,
      },
      {
        source: "/fortbildung/fortbildungen/deep-dive-modul-7",
        destination: "/fortbildung/fortbildungen/ki-bots",
        permanent: true,
      },
      {
        source:
          "/fortbildung/fortbildungen/eltern-kollegium-multiprofessionelle-teams-ki",
        destination: "/fortbildung/fortbildungen/eltern-kollegium-und-teams",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
