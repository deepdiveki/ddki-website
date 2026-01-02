import Image from "next/image";
import Link from "next/link";
import Highlighter from "./HighLighter";
import CubeAnimation from "../../CubeAnimation";  // Passe den Pfad an
import AbstractAnimation from "../../AbstractAnimation"
import ConceptPhaseAnimation from "../../ConceptPhaseAnimation"
import SecurityAnimation from "../../SecurityAnimation"
import OpportunityAnimation from "../../OpportunityAnimation"
import InclusionAnimation from "../../InclusionAnimation"
import PowerAnimation from "../../PowerAnimation"
import ToolsAnimation from "../../ToolsAnimation" 
import BotAnimation from "@/components/BotAnimationFortbildung";

const FeaturesList = () => {
  return (
    <section className="pt-12.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-7.5 sm:grid-cols-12">

          {/* <!-- Keynote --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                          DeepDiveKI Keynote
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                        Keynote
                      </h3>
                      <p className="mb-10 font-medium">
                      Die Keynote „DeepDive in die Welt von KI und Bildung – Vom Werkzeug zum Lernpartner“ zeigt, wie KI Lernen unterstützen kann: durch personalisierte Erklärungen, Feedback und passende Übungen. Im Mittelpunkt steht der Perspektivwechsel hin zur KI als Lernpartner – ergänzt um wichtige Leitplanken wie Didaktik, Transparenz, Datenschutz und die Rolle der Lehrenden. So werden Chancen und Grenzen praxisnah eingeordnet, ohne den Menschen aus dem Zentrum zu rücken.
                      </p>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block sm:-translate-x-12">
                      <CubeAnimation />
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- Crash Kurs --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                        Crash Kurs KI
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Crash Kurs KI - Unterstützung zum individualisierten Unterricht
                      </h3>
                      <p className="mb-10 font-medium">
                      In dieser Fortbildung stärken die Teilnehmerinnen und Teilnehmer ihre Kompetenz im Umgang mit Künstlicher Intelligenz.  
Sie erhalten praktische und direkt anwendbare Unterrichtsmethoden sowie Material für die Verwendung von KI.  
Die Teilnehmer*innen lernen unterschiedliche KI-basierte Werkzeuge kennen und erproben eine neue Form von Team-Teaching.                        </p>
<Link
  href="/pdfs/DeepDiveKI - CrashKurs.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
>
  Ausführliche Beschreibung als PDF herunterladen
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
      fill="white"
    />
  </svg>
</Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                    <AbstractAnimation />
                      
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive I --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                        Deep Dive Modul I
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Deep Dive Modul I - Unterrichtseinheiten konzipieren mit KI Tools                      </h3>
                      <p className="mb-10 font-medium">
                      In dieser Fortbildung stärken die Teilnehmerinnen und Teilnehmer ihre Kompetenz im Umgang mit Künstlicher Intelligenz.  
Sie erhalten praktische und direkt anwendbare Unterrichtsmethoden sowie Material für die Verwendung von KI.  
Die Teilnehmer*innen lernen unterschiedliche KI-basierte Werkzeuge kennen und erproben eine neue Form der Konzeption von Unterricht.                        </p>
<Link
  href="/pdfs/DeepDiveKI Modul I.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
>
  Ausführliche Beschreibung als PDF herunterladen
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
      fill="white"
    />
  </svg>
</Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                    <ConceptPhaseAnimation />
                      
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive II --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                          Deep Dive Modul II
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Deep Dive Modul II - Plagiate, Hausaufgaben und Klausuren in Zeiten von KI                      </h3>
                      <p className="mb-10 font-medium">
                      In dieser Fortbildung stärken die Teilnehmerinnen und Teilnehmer ihre Kompetenz im Umgang mit Künstlicher Intelligenz.  
Sie entwickeln und stärken ihre Awareness bzgl. des KI-gestützten Lernens und Aufgaben-Lösens.  
Die Teilnehmer*innen erhalten praktische und direkt anwendbare Methoden für den Umgang mit KI im eigenen Unterricht.                        </p>
<Link
  href="/pdfs/DeepDiveKI Modul II.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
>
  Ausführliche Beschreibung als PDF herunterladen
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
      fill="white"
    />
  </svg>
</Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                    <SecurityAnimation />
                      
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive III--> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                        Deep Dive Modul III
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Deep Dive Modul III - Chancen und Risiken von KI in Schule und Gesellschaft
                      </h3>
                      <p className="mb-10 font-medium">
                      In dieser Fortbildung stärken die Teilnehmerinnen und Teilnehmer ihre Kompetenz im Umgang mit Künstlicher Intelligenz.  
Sie erkennen Chancen von KI und wie sie diese sinnbringend nutzen können.  
Die Teilnehmer*innen erhalten praktische und direkt anwendbare Unterrichtsmethoden sowie Material, wie sie KI an ihrer Schule einführen und fördern können.                      </p>
<Link
  href="/pdfs/DeepDiveKI Modul III.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
>
  Ausführliche Beschreibung als PDF herunterladen
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
      fill="white"
    />
  </svg>
</Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                    <OpportunityAnimation />
                      
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive IV --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                        Deep Dive Modul IV                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Deep Dive Modul IV - Inklusion und KI                      </h3>
                      <p className="mb-10 font-medium">
                      In dieser Fortbildung stärken die Teilnehmenden ihre Kompetenzen im Umgang mit künstlicher Intelligenz und Inklusion.  
Sie erhalten praktische und direkt anwendbare Werkzeuge und Aufgaben, um die Qualität ihres inklusiven Unterrichts zu verbessern.  
Die Teilnehmer*innen lernen KI zu nutzen, um differenziertere Lernangebote zu erstellen und sich selbst in der Unterrichtsvorbereitung zu entlasten.  
Darüber hinaus sollen die KI-Tools und -Materialien den digitalen Unterricht noch inklusiver gestalten.                       </p>
<Link
  href="/pdfs/DeepDiveKI Modul IV.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
>
  Ausführliche Beschreibung als PDF herunterladen
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
      fill="white"
    />
  </svg>
</Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                    <InclusionAnimation />
                      
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive V --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                        Deep Dive Modul V                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Deep Dive Modul V - KI in deiner Schule Chancen für Schulleitung und Führungskräfte
                      </h3>
                      <p className="mb-10 font-medium">
                      In dieser Fortbildung stärken die Teilnehmenden ihre Kompetenzen im Umgang mit künstlicher Intelligenz.  
Sie erhalten praktische und direkt anwendbare Werkzeuge und Aufgaben, um die Qualität ihrer schulischen Prozesse zu verbessern.  
Dieses Modul zeigt auf, wie KI-Technologien effektiv im Schulbetrieb eingesetzt werden können, um sowohl administrative als auch pädagogische Prozesse zu optimieren.                        </p>
<Link
  href="/pdfs/DeepDiveKI Modul V.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
>
  Ausführliche Beschreibung als PDF herunterladen
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
      fill="white"
    />
  </svg>
</Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                    <PowerAnimation />
                      
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive VI --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                        Deep Dive Modul VI
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Deep Dive Modul VI - DDKI Toolbox Einführung und Anwendungsbeispiele                      </h3>
                      <p className="mb-10 font-medium">
                      In dieser praxisorientierten Fortbildung erhalten die Teilnehmenden eine Einführung in die Welt der Künstlichen Intelligenz (KI) und deren Anwendungsmöglichkeiten im Schulalltag.  
Der Schwerpunkt liegt auf der Vermittlung von Wissen über die DDKI Toolbox, die Lehrkräfte unterstützen kann, um den Unterricht effizienter und individueller zu gestalten.  
Die Teilnehmer*innen lernen, wie KI-Technologien in verschiedenen Bildungsbereichen eingesetzt werden können, und erhalten konkrete Anwendungsbeispiele, die direkt im Unterricht implementiert werden können.                        </p>
<Link
  href="/pdfs/DeepDiveKI Modul VI.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
>
  Ausführliche Beschreibung als PDF herunterladen
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
      fill="white"
    />
  </svg>
</Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                    <ToolsAnimation />
                      
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive VII --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />

                        <span className="hero-subtitle-text">
                          Deep Dive Modul VII
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                        Deep Dive Modul VII – KI Bots für deinen Unterricht erstellen
                      </h3>
                      <p className="mb-10 font-medium">
                      In diesem praxisorientierten Modul lernen die Teilnehmenden, wie sie eigene KI-gestützte Bots für den Einsatz im Unterricht erstellen und anpassen können. Ziel ist es, Lehrkräften Werkzeuge an die Hand zu geben, mit denen sie interaktive, unterstützende und automatisierte Lernbegleiter entwickeln, um Lernprozesse zu individualisieren und zu erleichtern. Die Fortbildung vermittelt Grundlagen zur Funktionsweise von KI-Bots, zeigt deren didaktisches Potenzial auf und führt Schritt für Schritt durch die Erstellung einfacher, anpassbarer Unterrichts-Bots.
                      </p>
                      <Link
                        href="/pdfs/DeepDiveKI Modul VII.pdf"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
                      >
                        Ausführliche Beschreibung als PDF herunterladen
                        <svg
                          width="14"
                          height="12"
                          viewBox="0 0 14 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </div>

                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                      <BotAnimation />
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- DeepDive VIII --> */}
          <div className="sm:col-span-12">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15">
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-full max-w-[477px]">
                      <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                        <Image
                          src="/images/hero/icon-title.svg"
                          alt="icon"
                          width={16}
                          height={16}
                        />
                        <span className="hero-subtitle-text">
                          Deep Dive Modul VIII
                        </span>
                      </span>
                      <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                        Deep Dive Modul VIII – Datenschutz und Sicherheit im Internet
                      </h3>
                      <p className="mb-10 font-medium">
                        Die Fortbildung „Datenschutz und Sicherheit im Internet“ lädt dich ein, die vielfältigen Aspekte deiner Online-Welt zu erkunden. Über drei Stunden hinweg beschäftigen wir uns mit Themen wie Kommunikationswelten, Fake News, Internetidentität, Cybercrime, KI im Alltag und den Risiken des Darknets. Gemeinsam reflektieren wir über den verantwortungsvollen Umgang mit digitalen Technologien und diskutieren ethische Fragen, um ein bewussteres und sichereres digitales Selbst zu entwickeln. Der Workshop bietet eine interaktive Plattform, um die Chancen und Gefahren der digitalen Welt besser zu verstehen und sich aktiv mit ihnen auseinanderzusetzen.
                      </p>
                      <Link
                        href="/pdfs/DeepDiveKI Modul VIII.pdf"
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
                      >
                        Ausführliche Beschreibung als PDF herunterladen
                        <svg
                          width="14"
                          height="12"
                          viewBox="0 0 14 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div className="relative hidden aspect-square w-full max-w-[428px] sm:block">
                      <SecurityAnimation />
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>
     
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;