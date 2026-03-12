"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CubeAnimation from "@/components/animations/CubeAnimation";
import { BASE_PATH } from "@/lib/constants";

const FeaturesList = () => {
  return (
    <section className="pt-12.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid gap-7.5 sm:grid-cols-12">
          {/* <!-- features item --> */}
          <motion.div
            className="sm:col-span-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="sw-card-glow relative overflow-hidden rounded-3xl border border-border-tertiary bg-white/40 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden rounded-3xl p-10 xl:p-15">
                <div className="relative z-20 flex items-center justify-between">
                  <div className="w-full max-w-[477px]">
                    <span className="sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-border-tertiary px-4.5 py-2 text-sm font-medium text-primary-darker shadow-sm">
                      Unsere Produkte im Überblick
                    </span>
                    <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-light text-text-primary">
                      Mit dem DeepChat in Ihre Schule oder Universitäten Künstliche Intelligenz integrieren.
                    </h3>
                    <p className="mb-10 font-light text-text-secondary">
                      Ob zur Unterstützung bei Aufgaben, der Analyse von Lernergebnissen oder der Erstellung interaktiver Inhalte – unsere Plattform hilft dabei, den Unterricht moderner und zugänglicher zu machen.
                    </p>
                    <Link
                      href={`${BASE_PATH}/ddki-toolbox`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary-darker px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
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
                    <CubeAnimation />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* <!-- Chatbot item --> */}
          <motion.div
            className="sm:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <div className="sw-card-glow relative h-full overflow-hidden rounded-3xl border border-border-tertiary bg-white/40 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden rounded-3xl px-11 pb-14 pt-12.5">
                <div className="relative z-20">
                  <span className="relative mx-auto mb-13.5 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full border border-border-tertiary bg-white/70 shadow-sm backdrop-blur-sm">
                    <Image
                      src="/images/features/icon-05.svg"
                      alt="icon"
                      width={32}
                      height={32}
                    />
                  </span>

                  <h3 className="mb-4.5 text-heading-6 font-semibold text-text-primary">
                    KI-Schulbüro
                  </h3>
                  <p className="mb-10 font-light text-text-secondary">
                    Mit unserem KI-Schulbüro haben Sie die Möglichkeit, in Ihrer Schulwebsite einen KI-Chatbot zu integrieren. Damit verbessern Sie den Informationsfluss zu Ihren Schülerinnen und Schülern, Eltern und Lehrkräften.
                  </p>
                  <Link
                    href={`${BASE_PATH}/chatbot-fuer-ihre-schule`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-darker px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
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
          </motion.div>

          {/* <!-- Fortbildungen item --> */}
          <motion.div
            className="sm:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="sw-card-glow relative h-full overflow-hidden rounded-3xl border border-border-tertiary bg-white/40 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden rounded-3xl px-11 pb-14 pt-12.5">
                <div className="relative z-20">
                  <span className="relative mx-auto mb-13.5 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full border border-border-tertiary bg-white/70 shadow-sm backdrop-blur-sm">
                    <Image
                      src="/images/features/icon-07.svg"
                      alt="icon"
                      width={32}
                      height={32}
                    />
                  </span>

                  <h3 className="mb-4.5 text-heading-6 font-semibold text-text-primary">
                    Fortbildungen zum Thema KI
                  </h3>
                  <p className="mb-10 font-light text-text-secondary">
                    Wir bieten Fortbildungen zum Thema Künstliche Intelligenz für Lehrkräfte, Lehramtsstudierende und Angestellte an Bildungsinstituten an.
                  </p>
                  <Link
                    href={`${BASE_PATH}/fortbildungen`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-darker px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
