import Image from "next/image";
import Link from "next/link";
import Highlighter from "./HighLighter";

const FeaturesList = () => {
  return (
    <section className="pt-12.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-7.5 sm:grid-cols-12">
          {/* <!-- features item --> */}
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
                          Unsere Produkte im Überblick
                        </span>
                      </span>
                      <h3 className="mb-4.5 text-heading-4 font-bold text-white">
                        Mit der DDKI ToolBox Künstliche Intelligenz in Ihre Schule oder Universitäten integrieren.
                      </h3>
                      <p className="mb-10 font-medium">
                        Ob zur Unterstützung bei Aufgaben, der Analyse von Lernergebnissen oder der Erstellung interaktiver Inhalte – unsere Plattform hilft dabei, den Unterricht moderner und zugänglicher zu machen.
                      </p>
                      <Link
                        href="/ai-examples"
                        className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
                      >
                        Jetzt ausprobieren
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
                      <Image
                        src="/images/features/big-icon.svg"
                        alt="icon"
                        fill
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- Chatbot item --> */}
          <div className="sm:col-span-7">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover box-hover-small relative overflow-hidden rounded-3xl px-11 pb-14 pt-12.5">
                  <div className="relative z-20">
                    <span className="icon-border relative mx-auto mb-13.5 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                      <Image
                        src="/images/features/icon-05.svg"
                        alt="icon"
                        width={32}
                        height={32}
                      />
                    </span>

                    <h3 className="mb-4.5 text-heading-6 font-semibold text-white">
                      Chatbot für Ihre Schulwebsite
                    </h3>
                    <p className="mb-10 font-medium">
                      Mit unserem KI ChatBot haben Sie die Möglichkeit, in Ihrer Schulwebsite einen KI Chatbot zu integrieren. Damit verbessern Sie den Informationsfluss zu ihren Schülerinnen und Schülern, Eltern und Lehrkräften.
                    </p>
                    <Link
                      href="/chatbot-fuer-ihre-schule"
                      className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
                    >
                      Jetzt ausprobieren
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
                </div>
              </div>
            </Highlighter>
          </div>

          {/* <!-- Fortbildungen item --> */}
          <div className="sm:col-span-5">
            <Highlighter>
              <div className="features-box-border relative rounded-3xl">
                <div className="box-hover box-hover-small relative overflow-hidden rounded-3xl px-11 pb-14 pt-12.5">
                  <div className="relative z-20">
                    <span className="icon-border relative mx-auto mb-13.5 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
                      <Image
                        src="/images/features/icon-07.svg"
                        alt="icon"
                        width={32}
                        height={32}
                      />
                    </span>

                    <h3 className="mb-4.5 text-heading-6 font-semibold text-white">
                      Fortbildungen zum Thema KI
                    </h3>
                    <p className="mb-10 font-medium">
                      Wir bieten Fortbildungen zum Thema Künstliche Intelligenz für Lehrkräfte, Lehramtsstudierende und Angestellte an Bildungsinstituten an.
                    </p>
                    <Link
                      href="/fortbildungen"
                      className="features-button-gradient relative inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
                    >
                      Jetzt ausprobieren
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