import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/Home/Features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | DeepDive KI ToolBox und KI Fortbildungen",
  description: "Impressum der DeepDive KI ToolBox und KI Fortbildungen",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Impressum" />
      <section className="p-6 md:p-12">
        <div className="max-w-4xl mx-auto text-lg space-y-6">
          <h1 className="text-2xl font-bold">Impressum</h1>

          <h2 className="text-xl font-semibold">Hauptsitz</h2>
          <p>
            DeepDiveKi UG (haftungsbeschränkt) <br />
            Eppendorfer Landstraße 55 <br />
            20249 Hamburg <br />
            <a href="https://www.deepdive-ki.de" className="text-blue-500 underline">www.deepdive-ki.de</a>
          </p>

          <h2 className="text-xl font-semibold">Vertreten durch</h2>
          <p>
            Björn Isenbiel (Geschäftsführender Gesellschafter) <br />
            Tim Philipp (Geschäftsführender Gesellschafter)
          </p>

          <h2 className="text-xl font-semibold">Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:info@deepdive-ki.de" className="text-blue-500 underline">info@deepdive-ki.de</a>
          </p>

          <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt</h2>
          <p>
            Björn Isenbiel, Tim Philipp <br />
            Eppendorfer Landstraße 55 <br />
            20249 Hamburg
          </p>

          <h2 className="text-xl font-semibold">Registereintrag</h2>
          <p>
            Registergericht: Hamburg <br />
            Registernummer: HRB 189193
          </p>

          <h2 className="text-xl font-semibold">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <br />
            <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-500 underline">
              https://ec.europa.eu/consumers/odr/
            </a>. <br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2 className="text-xl font-semibold">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 className="text-xl font-semibold">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
            verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
            gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
            bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
            entfernen.
          </p>

          <h2 className="text-xl font-semibold">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können
            wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
            Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
            inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
            Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h2 className="text-xl font-semibold">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
            der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
            privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
            werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
            trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
            von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>

          <p className="text-sm text-gray-500">
            Quelle: <a href="https://www.e-recht24.de" className="text-blue-500 underline">https://www.e-recht24.de</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;