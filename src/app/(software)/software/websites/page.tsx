import { Metadata } from "next";
import WebsitesContent from "./WebsitesContent";

export const metadata: Metadata = {
  title: "Schulwebsites – Modernes Webdesign für Schulen",
  description:
    "Professionelle Schulwebsites mit modernem Design, responsiven Layouts und integriertem KI-Schulbüro. Hosting in der EU, DSGVO-konform.",
};

export default function WebsitesPage() {
  return <WebsitesContent />;
}
