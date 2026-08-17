/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
  output: "standalone", // Optimize the build for standalone deployment
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
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
