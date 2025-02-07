import SidebarLink from "@/components/Fortbildungen/SidebarLink";
import { getAllPosts } from "@/libs/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fortbildungen | DeepDive KI ToolBox und KI Fortbildungen",
  description: "DeepDive KI ToolBox und KI Fortbildungen",
  // other metadata
};

export default function DocsPage() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/4">
              <div className="sticky top-[74px] rounded-lg bg-white/5 p-4 transition-all">
                <ul className="space-y-2">
                  {posts.map((post, key) => (
                    <SidebarLink post={post} key={key} />
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full px-4 lg:w-3/4">
              <div className="blog-details rounded-lg bg-white/5 px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h1>Wir bieten Fortbildungen und KeyNotes zum Thema Künstliche Intelligenz in der Schule an</h1>

                <p className="font-medium">
                  Wir bieten Fortbildungen zum Thema Künstliche Intelligenz in der Schule für Lehrkräfte, Lehramtsstudierende und Angestellte an Bildungsinstituten an. Diese Fortbildungen können sowohl online als auch als Pädagogischer Tag / SchilF / Blockveranstaltung bei Ihnen vor Ort gebucht werden.
                  <br />
                  <br />
                  In diesen Fortbildungen stärken die Teilnehmenden ihre Kompetenzen im Umgang mit Künstlicher Intelligenz. Sie erhalten praktische und direkt anwendbare Unterrichtsmethoden/ KI-Tools sowie Materialien für den Einsatz von KI. Die Teilnehmenden lernen verschiedene KI-basierte Werkzeuge kennen und erproben eine neue Form des Team-Teachings.
                  <br />
                  <br />
                  Sie haben bei uns die Möglichkeit, aus verschiedenen Vertiefungsmodulen ihr individuelles Angebot zu erstellen. Im folgenden Abschnitt finden Sie eine Übersicht über die Module/Vertiefungen:
                </p>

                {/* Tabelle mit Fortbildungen */}
                <div className="overflow-x-auto mt-8">
                  <table className="w-full text-left border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 font-semibold">Art der Veranstaltung</th>
                        <th className="border border-gray-300 px-4 py-2 font-semibold">Titel der Veranstaltung</th>
                        <th className="border border-gray-300 px-4 py-2 font-semibold">Zeitraum</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td className="border border-gray-300 px-4 py-2">
                      <a href="/fortbildungen/crash-kurs-ki" className="text-blue-500 hover:underline">
                       Crash Kurs KI
                         </a>
                          </td>
                        <td className="border border-gray-300 px-4 py-2">Künstliche Intelligenz in der Schule mit dem Schwerpunkt: Unterstützung zum individualisierten Unterricht</td>
                        <td className="border border-gray-300 px-4 py-2">3 Stunden</td>
                      </tr>
                      <tr>
                      <td className="border border-gray-300 px-4 py-2">
  <a href="/fortbildungen/deep-dive-modul-1" className="text-blue-500 hover:underline">
    Deep Dive Modul I
  </a>
</td>
                        <td className="border border-gray-300 px-4 py-2">Unterrichtseinheiten konzipieren mit KI - Tools</td>
                        <td className="border border-gray-300 px-4 py-2">3 Stunden</td>
                      </tr>
                      <tr>
                      <td className="border border-gray-300 px-4 py-2">
  <a href="/fortbildungen/deep-dive-II" className="text-blue-500 hover:underline">
    Deep Dive Modul II
  </a>
</td>
                        <td className="border border-gray-300 px-4 py-2">Plagiate, Hausaufgaben und Klausuren in Zeiten von KI</td>
                        <td className="border border-gray-300 px-4 py-2">3 Stunden</td>
                      </tr>
                      <tr>
                      <td className="border border-gray-300 px-4 py-2">
  <a href="/fortbildungen/deep-dive-III" className="text-blue-500 hover:underline">
    Deep Dive Modul III
  </a>
</td>
                        <td className="border border-gray-300 px-4 py-2">Chancen und Risiken von KI in Schule und Gesellschaft</td>
                        <td className="border border-gray-300 px-4 py-2">3 Stunden</td>
                      </tr>
                      <tr>
                      <td className="border border-gray-300 px-4 py-2">
  <a href="/fortbildungen/deep-dive-IV" className="text-blue-500 hover:underline">
    Deep Dive Modul IV
  </a>
</td>
                        <td className="border border-gray-300 px-4 py-2">Inklusion durch und mit KI</td>
                        <td className="border border-gray-300 px-4 py-2">3 Stunden</td>
                      </tr>
                      <tr>
                      <td className="border border-gray-300 px-4 py-2">
  <a href="/fortbildungen/deep-dive-V" className="text-blue-500 hover:underline">
    Deep Dive Modul V
  </a>
</td>
                        <td className="border border-gray-300 px-4 py-2">KI in deiner Schule: Chancen für Schulleitung und Führungskräfte</td>
                        <td className="border border-gray-300 px-4 py-2">3 Stunden</td>
                      </tr>
                      <tr>
                      <td className="border border-gray-300 px-4 py-2">
  <a href="/fortbildungen/deep-dive-VI" className="text-blue-500 hover:underline">
    Deep Dive Modul VI
  </a>
</td>
                        <td className="border border-gray-300 px-4 py-2">DDKI KI-Tools: Einführung und Anwendungsbeispiele</td>
                        <td className="border border-gray-300 px-4 py-2">3 Stunden</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="font-medium mt-8">
                👈 Vertiefene Informationen zu den Modulen finden Sie hier.
                  
                  Bei Interesse schreiben Sie uns gerne unter: {" "}
                  <b>
                    <a
                      className="text-white"
                      target="_blank"
                      href="info@deepdive-ki.de"
                    >
                      info@deepdive-ki.de
                    </a>
                  </b>{" "}
                 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}