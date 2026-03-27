import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const siteUrl = process.env.SITE_URL || "https://www.deepdive-ki.de";
const siteAppDir = path.join(process.cwd(), "src/app");

const excludedSegments = new Set(["error", "unauthorized"]);
const excludedRoutes = new Set([
  "/error",
  "/error/verify",
  "/unauthorized",
  "/software/error",
  "/software/error/verify",
  "/software/unauthorized",
]);

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
      // Strip Next.js route groups like (software) or (chooser) from the path
      const routePath = normalized.replace(/\([^)]+\)\/?/g, "").replace(/\/$/, "") || "";
      return routePath ? `/${routePath}` : "/";
    })
    .filter((route) => {
      if (excludedRoutes.has(route)) return false;
      const segments = route.split("/").filter(Boolean);
      return !segments.some((segment) => excludedSegments.has(segment));
    });

  return Array.from(new Set(routes)).sort();
};

const priorityMap: Record<string, number> = {
  "/": 1.0,
  "/software": 1.0,
  "/software/ddki-toolbox": 0.8,
  "/software/chatbot-fuer-ihre-schule": 0.8,
  "/software/fortbildungen": 0.9,
  "/software/about": 0.7,
  "/software/websites": 0.7,
  "/software/playground": 0.7,
  "/fortbildung/escape-game": 0.7,
  "/software/li_superhirn": 0.7,
  "/software/kontakt": 0.6,
  "/software/kontakt-chat-bot": 0.6,
};

const frequencyMap: Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]> = {
  "/": "weekly",
  "/software": "weekly",
  "/software/ddki-toolbox": "monthly",
  "/software/chatbot-fuer-ihre-schule": "monthly",
  "/software/fortbildungen": "weekly",
  "/software/about": "monthly",
  "/software/websites": "monthly",
  "/software/playground": "monthly",
  "/fortbildung/escape-game": "monthly",
  "/software/li_superhirn": "monthly",
  "/software/kontakt": "yearly",
  "/software/kontakt-chat-bot": "yearly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = collectRoutes();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    priority: priorityMap[route] ?? 0.5,
    changeFrequency: frequencyMap[route] ?? "monthly",
  }));
}
