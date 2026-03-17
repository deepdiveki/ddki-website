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
            <div className="sw-card-glow relative overflow-hidden rounded-3xl border border-purple-500/20 bg-white/5 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden rounded-3xl p-10 xl:p-15">
                <div className="relative z-20 flex items-center justify-between">
                  <div className="w-full max-w-[477px]">
                    <span className="sw-glass relative mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-primary-light">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C12 1 12.7 5.3 14.7 7.3C16.7 9.3 21 10 21 10C21 10 16.7 10.7 14.7 12.7C12.7 14.7 12 19 12 19C12 19 11.3 14.7 9.3 12.7C7.3 10.7 3 10 3 10C3 10 7.3 9.3 9.3 7.3C11.3 5.3 12 1 12 1Z"/><path d="M19 15C19 15 19.4 17.1 20.1 17.9C20.9 18.6 23 19 23 19C23 19 20.9 19.4 20.1 20.1C19.4 20.9 19 23 19 23C19 23 18.6 20.9 17.9 20.1C17.1 19.4 15 19 15 19C15 19 17.1 18.6 17.9 17.9C18.6 17.1 19 15 19 15Z" opacity="0.7"/><circle cx="20" cy="5" r="1" opacity="0.5"/></svg>
                      Unsere Produkte im Überblick
                    </span>
                    <h3 id="ddki-toolbox" className="mb-4.5 text-heading-4 font-bold text-white">
                      Mit dem DeepChat in Ihre Schule oder Universitäten Künstliche Intelligenz integrieren.
                    </h3>
                    <p className="mb-10 font-light text-white/70">
                      Ob zur Unterstützung bei Aufgaben, der Analyse von Lernergebnissen oder der Erstellung interaktiver Inhalte – unsere Plattform hilft dabei, den Unterricht moderner und zugänglicher zu machen.
                    </p>
                    <Link
                      href={`${BASE_PATH}/ddki-toolbox`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-purple px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-purple-light hover:shadow-lg"
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
            <div className="sw-card-glow relative h-full overflow-hidden rounded-3xl border border-purple-500/20 bg-white/5 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden rounded-3xl px-11 pb-14 pt-12.5">
                <div className="relative z-20">
                  <span className="relative mx-auto mb-13.5 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full border border-purple-500/20 bg-white/10 shadow-sm backdrop-blur-sm">
                    <Image
                      src="/images/features/icon-05.svg"
                      alt="icon"
                      width={32}
                      height={32}
                    />
                  </span>

                  <h3 className="mb-4.5 text-heading-6 font-semibold text-white">
                    KI-Schulbüro
                  </h3>
                  <p className="mb-10 font-light text-white/70">
                    Mit unserem KI-Schulbüro haben Sie die Möglichkeit, in Ihrer Schulwebsite einen KI-Chatbot zu integrieren. Damit verbessern Sie den Informationsfluss zu Ihren Schülerinnen und Schülern, Eltern und Lehrkräften.
                  </p>
                  <Link
                    href={`${BASE_PATH}/chatbot-fuer-ihre-schule`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-purple px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-purple-light hover:shadow-lg"
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
            <div className="sw-card-glow relative h-full overflow-hidden rounded-3xl border border-purple-500/20 bg-white/5 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg">
              <div className="relative overflow-hidden rounded-3xl px-11 pb-14 pt-12.5">
                <div className="relative z-20">
                  <span className="relative mx-auto mb-13.5 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full border border-purple-500/20 bg-white/10 shadow-sm backdrop-blur-sm">
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
                  <p className="mb-10 font-light text-white/70">
                    Wir bieten Fortbildungen zum Thema Künstliche Intelligenz für Lehrkräfte, Lehramtsstudierende und Angestellte an Bildungsinstituten an.
                  </p>
                  <Link
                    href="/fortbildung/fortbildungen"
                    className="inline-flex items-center gap-1.5 rounded-full bg-purple px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-purple-light hover:shadow-lg"
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
