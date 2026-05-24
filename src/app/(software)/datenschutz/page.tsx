import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Informationen zum Datenschutz bei DeepDiveKI: Erfahren Sie, wie wir Ihre personenbezogenen Daten gemäß DSGVO verarbeiten und welche Rechte Sie dabei haben.",
  alternates: {
    canonical: "https://www.deepdive-ki.de/datenschutz",
  },
};

const PrivacyPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="Datenschutz" />
      <section className="p-6 md:p-12">
        <div className="max-w-4xl mx-auto text-lg space-y-6">
          <h1 className="text-2xl font-bold">Informationen zum Datenschutz</h1>
          <p>
          Mit diesen Datenschutzhinweisen informieren wir Sie über unseren Umgang mit Ihren personenbezogenen Daten und über Ihre Rechte nach der Europäischen Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz (BDSG). Verantwortlich für die Datenverarbeitung ist die DeepDiveKI UG (haftungsbeschränkt) (nachfolgend als „wir“ oder „uns“ bezeichnet).
          </p>

          <h2 className="text-xl font-semibold">Allgemeine Angaben</h2>

          <h3 className="text-lg font-semibold">1. Kontakt</h3>
          <p>
            Wenn Sie Fragen oder Anregungen zu diesen Informationen haben oder sich wegen der Geltendmachung Ihrer Rechte an uns wenden möchten, richten Sie Ihre Anfrage bitte an:
          </p>
          <p>
            DeepDiveKI UG (haftungsbeschränkt) <br />
            Eppendorfer Landstraße 55, 20249 Hamburg <br />
            Tel.: 0049 17661411514 <br />
            E-Mail: <a href="mailto:info@deepdive-ki.de" className="text-purple-400 underline">info@deepdive-ki.de</a>
          </p>

          <h3 className="text-lg font-semibold">2. Rechtsgrundlagen</h3>
          <p>
          Der datenschutzrechtliche Begriff „personenbezogene Daten“ bezeichnet alle Informationen, die sich auf einen bestimmten oder bestimmbaren Menschen beziehen. Wir verarbeiten personenbezogene Daten unter Beachtung der einschlägigen Datenschutzvorschriften, insbesondere der DSGVO und des BDSG. Eine Datenverarbeitung durch uns findet nur auf der Grundlage einer gesetzlichen Erlaubnis statt. Wir verarbeiten personenbezogene Daten nur mit Ihrer Einwilligung (§ 25 Abs. 1 TDDDG oder Art. 6 Abs. 1 Buchst. a DSGVO), zur Erfüllung eines Vertrags, dessen Vertragspartei Sie sind oder auf Ihre Anfrage zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 Buchst. b DSGVO), zur Erfüllung einer rechtlichen Verpflichtung (Art. 6 Abs. 1 Buchst. c DSGVO) oder wenn die Verarbeitung zur Wahrung unserer berechtigten Interessen oder der berechtigten Interessen eines Dritten erforderlich ist, sofern nicht Ihre Interessen oder Grundrechte und Grundfreiheiten, die den Schutz personenbezogener Daten erfordern, überwiegen (Art. 6 Abs. 1 Buchst. f DSGVO).          </p>

          <h3 className="text-lg font-semibold">3. Dauer der Speicherung</h3>
          <p>
          Sofern sich aus den folgenden Hinweisen nichts anderes ergibt, speichern wir die Daten nur solange, wie es zur Erreichung des Verarbeitungszwecks oder für die Erfüllung unserer vertraglichen oder gesetzlichen Pflichten erforderlich ist. Solche gesetzlichen Aufbewahrungspflichten können sich insbesondere aus handels- oder steuerrechtlichen Vorschriften ergeben. Ab dem Schluss des Kalenderjahres, in dem die Daten erhoben wurden, werden wir solche personenbezogenen Daten, die in unseren Buchhaltungsdaten enthalten sind, für zehn Jahre aufbewahren und in Handelsbriefen und Verträge vorhandene personenbezogene Daten für sechs Jahre aufbewahren. Im Übrigen werden wir Daten im Zusammenhang mit nachweispflichtigen Einwilligungen sowie mit Reklamations- und Forderungsansprüchen für die Dauer der gesetzlichen Verjährungsfristen aufbewahren. Für Werbezwecke gespeicherte Daten werden wir löschen, wenn Sie der Verarbeitung zu diesem Zweck widersprechen.
          </p>

          <h3 className="text-lg font-semibold">4. Kategorien von Empfängern der Daten</h3>
          <p>
          Wir setzen im Rahmen der Verarbeitung Ihrer Daten Auftragsverarbeiter ein. Zu den durch solche Auftragsverarbeiter ausgeführten Verarbeitungsvorgängen gehören z.B. Hosting, E-Mail-Versand, Wartung und Support von IT-Systemen, Kunden- und Auftragsmanagement, Buchhaltung und Abrechnung, Marketingmaßnahmen oder Akten- und Datenträgervernichtung. Bei einem Auftragsverarbeiter handelt es sich um eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des für die Datenverarbeitung Verantwortlichen verarbeitet. Auftragsverarbeiter nutzen die Daten nicht für eigene Zwecke, sondern führen die Datenverarbeitung ausschließlich für den Verantwortlichen aus und sind vertraglich zur Gewährleistung geeigneter technischer und organisatorischer Maßnahmen zum Datenschutz verpflichtet. Im Übrigen übermitteln wir Ihre personenbezogenen Daten ggf. an Stellen wie Post- und Zustelldienste, Hausbank, Steuerberatungs-/Wirtschaftsprüfungsgesellschaft oder die Finanzverwaltung. Weitere Empfänger ergeben sich ggf. aus den folgenden Hinweisen.
          </p>

          <h3 className="text-lg font-semibold">5. Datenübermittlung in Drittländer</h3>
          <p>
          Unsere Datenverarbeitungen können mit der Übermittlung bestimmter personenbezogener Daten in Drittländer, also Länder, in denen die DSGVO nicht geltendes Recht ist, verbunden sein. Eine solche Übermittlung erfolgt in zulässiger Weise, wenn die Europäische Kommission festgestellt hat, dass in einem solchen Drittland ein angemessenes Datenschutzniveau geboten ist. Wenn ein solcher Angemessenheitsbeschluss der Europäischen Kommission nicht vorliegt, erfolgt eine Übermittlung personenbezogener Daten in ein Drittland nur beim Vorliegen geeigneter Garantien gem. Art. 46 DSGVO oder wenn eine der Voraussetzungen des Art. 49 DSGVO gegeben ist.

Sofern kein Angemessenheitsbeschluss vorliegt und im Folgenden nichts anderes angegeben ist, verwenden wir für die Übermittlung personenbezogener Daten in Drittländern als geeignete Garantien die EU-Standarddatenschutzklauseln. Sie haben die Möglichkeit, diese EU-Standarddatenschutzklauseln in Kopie zu erhalten oder einzusehen. Bitte wenden Sie sich dazu an die unter Kontakt angegebene Adresse.

Sofern Sie in die Übermittlung personenbezogener Daten in Drittstaaten einwilligen, erfolgt die Übermittlung auf der Rechtsgrundlage des Art. 49 Abs. 1 Buchst. a DSGVO.          </p>

          <h3 className="text-lg font-semibold">6. Verarbeitung bei der Ausübung Ihrer Rechte</h3>
          <p>
          Wenn Sie Ihre Rechte gemäß den Art. 15 bis 22 DSGVO ausüben, verarbeiten wir die übermittelten personenbezogenen Daten zum Zweck der Umsetzung dieser Rechte durch uns und um den Nachweis hierüber erbringen zu können. Zum Zweck der Auskunftserteilung und deren Vorbereitung gespeicherte Daten werden wir nur für diesen Zweck sowie für Zwecke der Datenschutzkontrolle verarbeiten und im Übrigen die Verarbeitung nach Maßgabe des Art. 18 DSGVO einschränken.

Diese Verarbeitungen beruhen auf der Rechtsgrundlage des Art. 6 Abs. 1 Buchst. c DSGVO i.V.m. Art. 15 bis 22 DSGVO und § 34 Abs. 2 BDSG.          </p>

          <h3 className="text-lg font-semibold">7. Ihre Rechte</h3>
          <p>
          Als betroffene Person haben Sie das Recht, uns gegenüber Ihre Betroffenenrechte geltend zu machen. Dabei haben Sie insbesondere die folgenden Rechte:

Sie haben nach Maßgabe des Art. 15 DSGVO und § 34 BDSG das Recht, Auskunft darüber zu verlangen, ob und gegebenenfalls in welchem Umfang wir personenbezogene Daten zu Ihrer Person verarbeiten oder nicht.
Sie haben das Recht, nach Maßgabe des Art. 16 DSGVO von uns die Berichtigung Ihrer Daten zu verlangen.
Sie haben das Recht, nach Maßgabe des Art. 17 DSGVO und § 35 BDSG von uns die Löschung Ihrer personenbezogenen Daten zu verlangen.
Sie haben das Recht, nach Maßgabe des Art. 18 DSGVO die Verarbeitung Ihrer personenbezogenen Daten einschränken zu lassen.
Sie haben das Recht, nach Maßgabe des Art. 20 DSGVO die Sie betreffenden personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und diese Daten einem anderen Verantwortlichen zu übermitteln.
Sofern Sie uns eine gesonderte Einwilligung in die Datenverarbeitung erteilt haben, können Sie diese Einwilligung nach Maßgabe des Art. 7 Abs. 3 DSGVO jederzeit widerrufen. Durch einen solchen Widerruf wird die Rechtmäßigkeit der Verarbeitung, die bis zum Widerruf aufgrund der Einwilligung erfolgt ist, nicht berührt.
Wenn Sie der Ansicht sind, dass eine Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Bestimmungen der DSGVO verstößt, haben Sie nach Maßgabe des Art. 77 DSGVO das Recht auf Beschwerde bei einer Aufsichtsbehörde.          </p>

          <h3 className="text-lg font-semibold">8. Widerspruchsrecht</h3>
          <p>
          Sie haben nach Maßgabe des Art. 21 Abs. 1 DSGVO das Recht, gegen Verarbeitungen, die auf der Rechtsgrundlage des Art. 6 Abs. 1 Buchst. e oder f DSGVO beruhen, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch einzulegen. Sofern durch uns personenbezogene Daten über Sie zum Zweck der Direktwerbung verarbeitet werden, können Sie gegen diese Verarbeitung gem. Art. 21 Abs. 2 und Abs. 3 DSGVO Widerspruch einlegen.          </p>

          <h3 className="text-lg font-semibold">9. Kontakt für Datenschutzanfragen</h3>
          <p>
          <b>Kontakt für Datenschutzanfragen:</b> <br />
          DeepDiveKI UG (haftungsbeschränkt) <br />
          E-Mail: 
            <a href="mailto:datenschutz@deepdive-ki.de" className="text-purple-400 underline">datenschutz@deepdive-ki.de</a>
          </p>


          <h2 className="text-xl font-semibold">Datenverarbeitungen auf unserer Website</h2>

          <h3 className="text-lg font-semibold">1. Verarbeitung von Server-Log-Files</h3>
          <p>Bei der rein informativen Nutzung unserer Website werden zunächst automatisiert (also nicht über eine Registrierung) allgemeine Informationen gespeichert, die Ihr Browser an unseren Server übermittelt. Hierzu zählen standardmäßig: Browsertyp/ -version, verwendetes Betriebssystem, aufgerufene Seite, die zuvor besuchte Seite (Referrer URL), IP-Adresse, Datum und Uhrzeit der Serveranfrage und HTTP-Statuscode.

Die Verarbeitung erfolgt zur Wahrung unserer berechtigten Interessen und beruht auf der Rechtsgrundlage des Art. 6 Abs. 1 Buchst. f DSGVO. Diese Verarbeitung dient der technischen Verwaltung und der Sicherheit der Website. Die gespeicherten Daten werden nach 190 Tagen gelöscht, wenn nicht aufgrund konkreter Anhaltspunkte ein berechtigter Verdacht auf eine rechtswidrige Nutzung besteht und eine weitere Prüfung und Verarbeitung der Informationen aus diesem Grund erforderlich ist. Wir sind nicht in der Lage, Sie anhand der gespeicherten Informationen als betroffene Person zu identifizieren. Die Art. 15 bis 22 DSGVO finden daher gem. Art. 11 Abs. 2 DSGVO keine Anwendung, es sei denn, Sie stellen zur Ausübung Ihrer in diesen Artikeln niedergelegten Rechte zusätzliche Informationen bereit, die Ihre Identifizierung ermöglichen.</p>

<h3 className="text-lg font-semibold">2.     Kontaktmöglichkeiten und Anfragen</h3>
          <p>Unsere Website enthält Kontaktformulare, über welche Sie uns Nachrichten schicken können. Der Transfer Ihrer Daten erfolgt dabei verschlüsselt (zu erkennen an dem „https“ in der Adresszeile des Browsers). Alle als Pflichtfelder gekennzeichneten Datenfelder sind zur Bearbeitung Ihres Anliegens erforderlich. Eine Nichtbereitstellung hat zur Folge, dass wir Ihr Anliegen nicht bearbeiten können. Die Bereitstellung von weiteren Daten erfolgt freiwillig. Sie können uns alternativ auch über die Kontakt-E-Mail eine Nachricht schicken. Wir verarbeiten die Daten zu dem Zweck, Ihre Anfrage zu beantworten.

Sofern sich Ihre Anfrage auf den Abschluss oder die Durchführung eines Vertrages mit uns richtet, ist Art. 6 Abs. 1 Buchst. b DSGVO Rechtsgrundlage für die Datenverarbeitung. Ansonsten verarbeiten wir die Daten aufgrund unseres berechtigten Interesses, mit anfragenden Personen in Kontakt zu treten. Rechtsgrundlage für die Datenverarbeitung ist dann Art. 6 Abs. 1 Buchst. f DSGVO.</p>

          {/*
            Newsletter-Klausel deaktiviert: Aktuell wird auf der Website kein
            Newsletter angeboten. Wieder aktivieren, sobald eine Newsletter-
            Anmeldung implementiert ist.

          <h3 className="text-lg font-semibold">3. Newsletter</h3>
          <p>Wir bieten auf unserer Website die Möglichkeit an, sich für unseren Newsletter anzumelden. Nach der Anmeldung werden wir Sie regelmäßig über aktuelle Neuigkeiten zu unseren Angeboten informieren. Für die Anmeldung zum Newsletter ist eine gültige E-Mail-Adresse erforderlich. Zur Verifizierung der E-Mail-Adresse erhalten Sie zunächst eine Anmelde-E-Mail, die Sie über einen Link bestätigen müssen (Double Opt-In). Wenn Sie den Newsletter auf unserer Website abonnieren, verarbeiten wir personenbezogene Daten wie Ihre E-Mail-Adresse und Ihren Namen auf Grundlage der von Ihnen erteilten Einwilligung. Die Verarbeitung beruht auf der Rechtsgrundlage des Art. 6 Abs. 1 Buchst. a DSGVO. Die erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, etwa über den „Austragen“-Link im Newsletter oder indem Sie uns über die oben genannten Kanäle kontaktieren. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.

Bei der Anmeldung zum Newsletter speichern wir ferner die IP-Adresse sowie das Datum und die Uhrzeit der Anmeldung. Die Verarbeitung dieser Daten ist erforderlich, um eine erteilte Einwilligung nachweisen zu können. Die Rechtsgrundlage ergibt sich aus unserer rechtlichen Verpflichtung zur Dokumentation Ihrer Einwilligung (Art. 6 Abs. 1 Buchst. c i.V.m. Art. 7 Abs. 1 DSGVO).

Wir analysieren außerdem das Leseverhalten und die Öffnungsraten unseres Newsletters. So werten wir die bei Zustellung und Abruf unserer E-Mails entstandenen Daten zum einen in aggregierter und anonymisierter Form aus (Zustellrate, Öffnungsrate, Klickraten, Abmelderate, Bouncerate, Visits, Abschlüsse), um Nutzung und Erfolg der E-Mails zu messen. Rechtsgrundlage für die Analyse unseres Newsletters ist Art. 6 Abs. 1 Buchst. f DSGVO und die Verarbeitung dient unserem berechtigten Interesse an der Optimierung unseres Newsletters. Sie können dem jederzeit widersprechen, indem Sie sich an einen der oben genannten Kontaktkanäle wenden.

Zum anderen werten wir auch die bei Abruf und Nutzung dieser E-Mails durch Sie entstehenden Daten (Öffnungszeitpunkt, angeklickte Hyperlinks, heruntergeladene Dokumente) sowie Bewegungsdaten auf nachgelagerten Websiten personenbezogen in Verbindung mit Ihrer E-Mail-Adresse aus, um Ihnen auch auf dieser Basis künftig individualisierte Informationen zukommen zu lassen, die Ihre Interessen und Bedürfnisse bestmöglich berücksichtigen. Die erhobenen anonymen sowie personenbezogenen Daten nutzen wir, um Ihnen in unseren werblichen E-Mails und nachgelagerten Websiten personalisierte Inhalte und individualisierte Informationen bereitzustellen. Rechtsgrundlage für die Datenverarbeitung im Rahmen von E-Mails ist Art. 6 Abs. 1 Buchst. a DSGVO. Die erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, etwa über den „Austragen“-Link im Newsletter oder indem Sie uns über die oben genannten Kanäle kontaktieren.</p>
          */}

          <h3 className="text-lg font-semibold">4.     Cookies und vergleichbare Technologien
          </h3>
          <p>Wir verwenden auf unserer Website Cookies und vergleichbare Technologien („Cookies“) nur im technisch erforderlichen Umfang. Bei Cookies handelt es sich um kleine Datensätze, die durch Ihren Browser gespeichert werden, wenn Sie eine Website besuchen. Sie haben durch Ihren Browser die volle Kontrolle über die Verwendung von Cookies und können diese in den Sicherheitseinstellungen Ihres Browsers jederzeit löschen oder ihrer Verwendung widersprechen.</p>
          <p>
            Beim bloßen Aufruf unserer Seiten setzen wir <strong>keine</strong> nicht-essentiellen Cookies und laden <strong>keine</strong> Drittanbieter-Skripte. Aus diesem Grund verzichten wir bewusst auf einen seitenweiten Cookie-Banner. Cookies und Inhalte von Drittanbietern (insbesondere Calendly auf der Kontaktseite sowie eingebettete YouTube-Videos in den Tutorials) werden ausschließlich nach Ihrem ausdrücklichen, ortsbezogenen Klick („Click&#8209;to&#8209;Load") geladen. Rechtsgrundlage hierfür ist Ihre Einwilligung gemäß § 25 Abs. 1 TDDDG i.V.m. Art. 6 Abs. 1 Buchst. a DSGVO.
          </p>
          <p>
            Eine einmal erteilte Einwilligung kann optional („Für diese Website merken") im lokalen Speicher Ihres Browsers (<code>localStorage</code>, Schlüssel <code>cookieConsent</code>) gespeichert werden, damit Sie nicht bei jedem Video erneut zustimmen müssen. Sie können diese Einwilligung jederzeit über den Link „Einwilligungen widerrufen" im Footer der Website oder direkt am jeweiligen eingebetteten Inhalt (z.&nbsp;B. Calendly) zurücknehmen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
          </p>

          <h3 className="text-lg font-semibold">5. Online-Terminbuchung (Calendly)</h3>
          <p>
            Auf unserer Kontaktseite bieten wir Ihnen die Möglichkeit, über das Tool „Calendly“ direkt einen Termin mit uns zu vereinbaren. Anbieter ist die Calendly LLC, 271 17th St NW, Atlanta, GA 30363, USA. Das Calendly-Widget wird ausschließlich nach Ihrer ausdrücklichen Einwilligung geladen. Solange Sie nicht eingewilligt haben, werden weder Skripte noch Cookies von Calendly geladen und es findet keine Verbindung zu Calendly-Servern statt.
          </p>
          <p>
            Wenn Sie die Einbindung aktivieren, verarbeitet Calendly insbesondere Ihre IP-Adresse, Browser- und Geräteinformationen, Datum und Uhrzeit der Anfrage sowie die von Ihnen im Buchungsprozess angegebenen Daten (insbesondere Name, E-Mail-Adresse, gewünschter Termin und ggf. weitere von Ihnen freiwillig gemachte Angaben). Zweck der Verarbeitung ist die Bereitstellung der Online-Terminbuchung sowie die Organisation und Durchführung des vereinbarten Termins.
          </p>
          <p>
            Rechtsgrundlage für das Laden des Calendly-Widgets und das Setzen damit verbundener Cookies ist Ihre Einwilligung gemäß § 25 Abs. 1 TDDDG i.V.m. Art. 6 Abs. 1 Buchst. a DSGVO. Die anschließende Verarbeitung Ihrer Buchungsdaten erfolgt zur Durchführung vorvertraglicher Maßnahmen bzw. zur Anbahnung und Durchführung eines Vertrags auf Grundlage von Art. 6 Abs. 1 Buchst. b DSGVO sowie auf Grundlage unseres berechtigten Interesses an einer effizienten Terminorganisation gemäß Art. 6 Abs. 1 Buchst. f DSGVO. Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt wird.
          </p>
          <p>
            Im Rahmen der Nutzung von Calendly werden personenbezogene Daten in die USA übermittelt. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien im Sinne der Art. 44 ff. DSGVO, insbesondere auf Grundlage von EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 Buchst. c DSGVO und – soweit der Anbieter zertifiziert ist – auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss der Europäischen Kommission vom 10. Juli 2023).             Weitere Informationen zur Datenverarbeitung durch Calendly sowie die dortige Datenschutzerklärung finden Sie unter{" "}
            <a
              href="https://calendly.com/de/pages/privacy"
              className="text-purple-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://calendly.com/de/pages/privacy
            </a>
            .
          </p>

          <h3 className="text-lg font-semibold">6. Eingebettete Videos (YouTube)</h3>
          <p>
            In Teilen unseres Angebots, insbesondere im Bereich „Escape Game“ und in unseren Tutorials, binden wir Videos von YouTube ein. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, ein Tochterunternehmen der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA (nachfolgend „Google“). Die Einbindung erfolgt im erweiterten Datenschutzmodus über die Domain <code>youtube-nocookie.com</code>. In diesem Modus werden laut Google erst dann Informationen über das Nutzerverhalten zur Personalisierung gespeichert, wenn Sie ein Video aktiv abspielen.
          </p>
          <p>
            Die Videos werden ausschließlich nach Ihrer ausdrücklichen Einwilligung geladen. Solange Sie nicht eingewilligt haben, wird kein YouTube-Player geladen, es werden keine Cookies gesetzt und es findet keine Verbindung zu Google-Servern statt. Beim Laden bzw. Abspielen eines Videos verarbeitet Google insbesondere Ihre IP-Adresse, Datum und Uhrzeit der Anfrage, Browser- und Geräteinformationen, die URL der aufgerufenen Seite sowie Interaktionsdaten mit dem Player. Sofern Sie zeitgleich in einem Google-Konto angemeldet sind, kann Google die Daten zudem Ihrem Konto zuordnen; dies können Sie durch eine vorherige Abmeldung verhindern.
          </p>
          <p>
            Rechtsgrundlage für das Laden des YouTube-Players und das Setzen damit verbundener Cookies ist Ihre Einwilligung gemäß § 25 Abs. 1 TDDDG i.V.m. Art. 6 Abs. 1 Buchst. a DSGVO. Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt wird.
          </p>
          <p>
            Im Rahmen der Nutzung von YouTube werden personenbezogene Daten in die USA übermittelt. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien im Sinne der Art. 44 ff. DSGVO, insbesondere auf Grundlage von EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 Buchst. c DSGVO sowie auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss der Europäischen Kommission vom 10. Juli 2023), unter dem die Google LLC zertifiziert ist. Weitere Informationen zur Datenverarbeitung durch Google finden Sie in der Datenschutzerklärung von Google unter{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-purple-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </a>
            .
          </p>

          <h3 className="text-lg font-semibold">7. Auslieferung von Videodateien (Cloudflare R2)</h3>
          <p>
            Zur Auslieferung von Videodateien (insbesondere Hero-Video, Mission-Briefing zum Escape Game, Tutorial- und Demo-Videos sowie Produktvideos im Bereich „Websites" und „KI-Schulbüro") setzen wir das Speicher- und Auslieferungsangebot „R2" der Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA, ein. Vertragspartner für Kunden im Europäischen Wirtschaftsraum ist die Cloudflare Germany GmbH, Rosental 7, c/o Mindspace, 80331 München, Deutschland (nachfolgend gemeinsam „Cloudflare").
          </p>
          <p>
            Die Video-Elemente unserer Website sind mit der Einstellung <code>preload=&quot;none&quot;</code> versehen. Das bedeutet, dass beim bloßen Aufruf einer Seite zunächst keine Videodaten von Cloudflare-Servern geladen werden. Erst wenn Sie ein Video aktiv durch Klick auf die Wiedergabeschaltfläche starten, wird eine Verbindung zu Cloudflare aufgebaut. Dabei verarbeitet Cloudflare insbesondere Ihre IP-Adresse, Datum und Uhrzeit der Anfrage, Informationen zu Browser und Endgerät sowie die abgerufene Video-URL, um die angeforderten Daten technisch ausliefern zu können.
          </p>
          <p>
            Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 Buchst. f DSGVO. Unser berechtigtes Interesse besteht darin, große Mediendateien performant, ausfallsicher und ressourcenschonend bereitzustellen. Cloudflare verarbeitet die Daten als Auftragsverarbeiter im Sinne des Art. 28 DSGVO auf Grundlage eines mit uns geschlossenen Auftragsverarbeitungsvertrags (AVV/Data Processing Addendum).
          </p>
          <p>
            Im Rahmen der Auslieferung kann es zu einer Übermittlung personenbezogener Daten in die USA bzw. in andere Drittländer kommen, in denen Cloudflare Infrastruktur betreibt. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien im Sinne der Art. 44 ff. DSGVO, insbesondere auf Grundlage von EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 Buchst. c DSGVO sowie – soweit der konkrete Empfänger zertifiziert ist – auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss der Europäischen Kommission vom 10. Juli 2023), unter dem die Cloudflare, Inc. zertifiziert ist. Weitere Informationen zur Datenverarbeitung durch Cloudflare sowie die dortige Datenschutzerklärung finden Sie unter{" "}
            <a
              href="https://www.cloudflare.com/de-de/privacypolicy/"
              className="text-purple-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.cloudflare.com/de-de/privacypolicy/
            </a>
            .
          </p>

          <h3 className="text-lg font-semibold">8. Single-Sign-On / Plattform-Session</h3>
          <p>
            Auf unserer Website binden wir oberhalb der Seiten eine Statusabfrage zu unserer Plattform unter <code>plattform.deepdive-ki.de</code> ein. Verantwortlich für diese Plattform ist ebenfalls die DeepDiveKI UG (haftungsbeschränkt). Beim Aufruf einer Seite sendet Ihr Browser einmalig eine Anfrage an{" "}
            <code>https://plattform.deepdive-ki.de/api/getSession</code>. Sofern in Ihrem Browser bereits ein Sitzungs-Cookie unserer Plattform vorhanden ist, wird dieses an die Plattform übermittelt, damit Sie auch auf unserer Hauptwebsite mit Ihrem Anzeigenamen begrüßt werden und Links zur Plattform (z. B. „Zur Plattform", „Profil") korrekt dargestellt werden können (Single-Sign-On-ähnliche Funktion).
          </p>
          <p>
            Sind Sie nicht in der Plattform angemeldet, ist auch kein Sitzungs-Cookie vorhanden und es werden keine personenbezogenen Daten an die Plattform übermittelt, die über die ohnehin in jedem HTTP-Request enthaltenen Informationen (IP-Adresse, Browserkennung, Zeitstempel) hinausgehen. Bei eingeloggten Nutzer:innen wird zusätzlich der in der Plattform hinterlegte Anzeigename verarbeitet.
          </p>
          <p>
            Die Verarbeitung dient ausschließlich der technischen Funktion der Anzeige (Erkennung eines aktiven Logins, Personalisierung der Navigation) und beruht – soweit das Sitzungs-Cookie betroffen ist – auf § 25 Abs. 2 Nr. 2 TDDDG, da sie unbedingt erforderlich ist, um den von Ihnen ausdrücklich gewünschten Dienst des Logins über mehrere Subdomains hinweg bereitstellen zu können. Im Übrigen ist Rechtsgrundlage Art. 6 Abs. 1 Buchst. f DSGVO; unser berechtigtes Interesse besteht in einer konsistenten Nutzerführung zwischen Hauptwebsite und Plattform. Sie können diese Funktion jederzeit unterbinden, indem Sie sich in der Plattform abmelden oder die zugehörigen Cookies in Ihren Browsereinstellungen löschen bzw. blockieren.
          </p>

          <h3 className="text-lg font-semibold">9. Zahlungsabwicklung über Stripe</h3>
          <p>
            Für den Verkauf digitaler Lizenzen (insbesondere Zugangslizenzen für unser „Escape Game") setzen wir den Zahlungsdienstleister Stripe ein. Anbieter für Kunden im Europäischen Wirtschaftsraum ist die Stripe Payments Europe Limited, 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland („Stripe Europe"). Stripe Europe arbeitet mit weiteren Stripe-Konzernunternehmen zusammen, insbesondere mit der Stripe, Inc., 354 Oyster Point Boulevard, South San Francisco, CA 94080, USA („Stripe Inc.").
          </p>
          <p>
            Wenn Sie eine kostenpflichtige Lizenz erwerben, leiten wir Sie über unseren Server zu einer von Stripe gehosteten Bezahlseite (Stripe Checkout) weiter. Die eigentlichen Zahlungsdaten (insbesondere Kreditkartennummer, Karteninhaber, Gültigkeit, Prüfziffer bzw. Kontoverbindung bei SEPA-Lastschrift) geben Sie ausschließlich direkt bei Stripe ein. Wir selbst erhalten von Stripe nach erfolgreichem Abschluss lediglich Informationen, die wir zur Vertragsabwicklung benötigen, insbesondere Ihren Namen, Ihre E-Mail-Adresse, das gekaufte Produkt sowie Status, Zeitpunkt und ID der Transaktion. Auf dieser Grundlage erzeugen wir Ihren persönlichen Zugangscode und übersenden diesen an die von Ihnen bei Stripe hinterlegte E-Mail-Adresse.
          </p>
          <p>
            Stripe verarbeitet darüber hinaus eigenständig die zur Durchführung des Zahlungsvorgangs und zur Betrugsprävention erforderlichen Daten (u. a. Zahlungsmittel-Daten, Geräte- und Verbindungsdaten, IP-Adresse, Land, ggf. Identifikations- und Verifizierungsdaten). Für diese Verarbeitungen ist Stripe gemeinsam mit uns oder als eigener Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO tätig; Einzelheiten ergeben sich aus der Datenschutzerklärung von Stripe.
          </p>
          <p>
            Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 Buchst. b DSGVO (Anbahnung und Durchführung des Lizenzkaufvertrags) sowie Art. 6 Abs. 1 Buchst. f DSGVO (berechtigtes Interesse an einer sicheren und betrugsresistenten Zahlungsabwicklung). Soweit Stripe für uns als Auftragsverarbeiter tätig wird, erfolgt die Verarbeitung auf Grundlage eines Auftragsverarbeitungsvertrags (Data Processing Agreement) gemäß Art. 28 DSGVO.
          </p>
          <p>
            Im Rahmen der Zahlungsabwicklung kann es zu einer Übermittlung personenbezogener Daten in die USA, insbesondere an die Stripe, Inc., kommen. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien im Sinne der Art. 44 ff. DSGVO, insbesondere auf Grundlage von EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 Buchst. c DSGVO sowie auf Grundlage des EU-US Data Privacy Framework (Angemessenheitsbeschluss der Europäischen Kommission vom 10. Juli 2023), unter dem die Stripe, Inc. zertifiziert ist.
          </p>
          <p>
            Wir speichern die Transaktionsdaten so lange, wie es zur Vertragserfüllung und zur Erfüllung gesetzlicher Aufbewahrungspflichten (insbesondere handels- und steuerrechtliche Pflichten von in der Regel sechs bzw. zehn Jahren ab dem Ende des Kalenderjahres) erforderlich ist. Die Speicherdauer bei Stripe richtet sich nach den dortigen Vorgaben und Aufbewahrungsfristen. Weitere Informationen zur Datenverarbeitung durch Stripe sowie die dortige Datenschutzerklärung finden Sie unter{" "}
            <a
              href="https://stripe.com/de/privacy"
              className="text-purple-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://stripe.com/de/privacy
            </a>
            .
          </p>

<h2 className="text-xl font-semibold">Weitere Datenverarbeitungen</h2>


          <h3 className="text-lg font-semibold">1.     Verwendung der E-Mail-Adresse zu Marketingzwecken</h3>
          <p>Wir können Ihre bei Registrierung angegebene E-Mail-Adresse verwenden, um Sie über eigene ähnliche von uns angebotene Produkte und Leistungen zu informieren.

Die Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. f DSGVO i.V.m. § 7 Abs. 3 UWG. Sie können dem jederzeit widersprechen, ohne dass hierfür andere als die Übermittlungskosten nach den Basistarifen entstehen. Dazu können Sie sich per Klick auf den in jedem Mailing enthaltenen Abmeldelink abmelden.</p>

          <h3 className="text-lg font-semibold">2. Durchführung von Fortbildungen und Veranstaltungen</h3>
          <p>
            Wir verarbeiten personenbezogene Daten zur Anmeldung, Organisation, Durchführung, Abrechnung und Dokumentation unserer Fortbildungen und Veranstaltungen. Dies betrifft insbesondere Name, E-Mail-Adresse, Schule bzw. Dienststelle, Schulnummer bzw. Dienstadresse, Veranstaltungsdaten, Anmeldestatus, Anwesenheitsdaten, Rechnungsdaten sowie ggf. Angaben zu Rücktritt, Ersatzpersonen oder besonderen organisatorischen Anforderungen.
          </p>
          <p>
            Die Anmeldung zu bestimmten Fortbildungen erfolgt über das Niedersächsische LernCenter (NLC). Betreiber des NLC ist das Niedersächsische Landesinstitut für schulische Qualitätsentwicklung (NLQ), Keßlerstraße 52, 31134 Hildesheim. Für die Registrierung und Anmeldung im NLC gelten ergänzend die Datenschutzhinweise des NLC bzw. des NLQ. Im Rahmen der Anmeldung und Veranstaltungsorganisation erhalten wir Zugriff auf die für die Durchführung erforderlichen Anmeldedaten.
          </p>
          <p>
            Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung der Fortbildung bzw. zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen erforderlich ist. Soweit wir gesetzliche Aufbewahrungspflichten erfüllen müssen, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Soweit die Verarbeitung der effizienten Organisation, Kommunikation und Durchführung unserer Veranstaltungen dient, erfolgt sie auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Für die Kommunikation nutzen wir unseren E-Mail-Provider STRATO GmbH, Otto-Ostrowski-Straße 7, 10249 Berlin, Deutschland. Für Online-Fortbildungen können Videokonferenzsysteme wie Zoom eingesetzt werden. Anbieter ist Zoom Communications, Inc.; Datenschutzerklärung:{" "}
            <a href="https://www.zoom.com/de/trust/privacy/privacy-statement/" className="text-purple-400 underline" target="_blank" rel="noopener noreferrer">
              https://www.zoom.com/de/trust/privacy/privacy-statement/
            </a>
          </p>
          <p>
            Im Rahmen einzelner Fortbildungen können außerdem digitale Anwendungen, Kollaborationstools und KI-Anwendungen zu Demonstrations- und Übungszwecken eingesetzt werden, z. B. ChatGPT/OpenAI oder weitere in der jeweiligen Veranstaltung benannte Anwendungen. Die Teilnehmenden werden darauf hingewiesen, keine personenbezogenen, vertraulichen oder sensiblen Daten, insbesondere keine Schülerdaten, Noten, Gesundheitsdaten oder vertraulichen Schulunterlagen, in solche Tools einzugeben, sofern dies nicht ausdrücklich freigegeben wurde. Für die Datenverarbeitung durch diese Dienste gelten ergänzend die Datenschutzhinweise der jeweiligen Anbieter.
          </p>
          <p>
            Empfänger personenbezogener Daten können, soweit erforderlich, insbesondere das NLC/NLQ, Schulen oder Dienststellen, Veranstaltungsorte, Tagungshäuser, Bildungsstätten, Hotels, technische Dienstleister, Videokonferenzanbieter, E-Mail-Provider, Zahlungs- und Finanzdienstleister, Steuerberatungs- und Buchhaltungsdienstleister sowie öffentliche Stellen im Rahmen gesetzlicher Verpflichtungen sein.
          </p>
          <p>
            Für Zahlungsabwicklung, Kontoführung und Buchhaltung können Zahlungs- und Finanzdienstleister sowie Steuerberatungs- und Buchhaltungsdienstleister eingesetzt werden.
          </p>
          <p>
            Soweit wir Dienstleister als Auftragsverarbeiter einsetzen, erfolgt dies auf Grundlage einer Vereinbarung zur Auftragsverarbeitung nach Art. 28 DSGVO. Bei einzelnen Diensten, insbesondere Zahlungs-, Finanz- oder Plattformdiensten, können Anbieter auch als eigene Verantwortliche handeln.
          </p>
          <p>
            Eine Übermittlung personenbezogener Daten in Drittländer kann insbesondere beim Einsatz internationaler Dienstleister, etwa Videokonferenz- oder KI-Anbieter, nicht ausgeschlossen werden. In diesem Fall erfolgt die Übermittlung nur, soweit hierfür eine datenschutzrechtliche Grundlage besteht, insbesondere ein Angemessenheitsbeschluss der Europäischen Kommission, EU-Standardvertragsklauseln oder eine andere geeignete Garantie im Sinne der DSGVO.
          </p>
          <p>
            Die Daten werden gelöscht, sobald sie für die genannten Zwecke nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Rechnungs- und Buchhaltungsdaten werden entsprechend den gesetzlichen Aufbewahrungsfristen gespeichert.
          </p>

          <p className="text-sm text-white/50 mt-6">Stand: 1.1, Mai 2026</p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPage;