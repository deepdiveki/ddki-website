import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const siteUrl = process.env.SITE_URL || "https://www.deepdive-ki.de";
const siteAppDir = path.join(process.cwd(), "src/app/(site)");

const excludedSegments = new Set(["error", "unauthorized"]);
const excludedRoutes = new Set(["/error", "/error/verify", "/unauthorized"]);

const collectRoutes = () => {
  const pageFiles: string[] = [];

  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name === "page.tsx") {
        pageFiles.push(fullPath);
      }
    }
  };

  walk(siteAppDir);

  const routes = pageFiles
    .map((filePath) => {
      const relativeDir = path.relative(siteAppDir, path.dirname(filePath));
      const normalized = relativeDir.split(path.sep).join("/");
      return normalized ? `/${normalized}` : "/";
    })
    .filter((route) => {
      if (excludedRoutes.has(route)) return false;
      const segments = route.split("/").filter(Boolean);
      return !segments.some((segment) => excludedSegments.has(segment));
    });

  return Array.from(new Set(routes)).sort();
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = collectRoutes();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
  }));
}
