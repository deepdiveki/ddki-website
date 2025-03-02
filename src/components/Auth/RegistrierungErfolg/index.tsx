"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";



const AboutSection = () => {

    const { data: session } = useSession();

  return (
    <section className="overflow-hidden">
      <div className="relative mx-auto max-w-[1170px] px-4 py-20 sm:px-8 lg:py-25 xl:px-0">
        <div className="about-divider-gradient absolute bottom-0 left-0 h-[1px] w-full"></div>

        <div className="flex flex-wrap justify-between gap-11 xl:flex-nowrap">
          <div className="wow fadeInLeft w-full max-w-[570px]">
            <span className="hero-subtitle-text mb-5 block font-semibold">
            E-Mail-Adresse bestätigen
            </span>

            <h2 className="mb-5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">
            Bitte bestätigen Sie Ihre E-Mail-Adresse
            </h2>
            <p className="mb-9 font-medium">
            Wir haben eine E-Mail an ${session?.user.email} geschickt. Klicken Sie den Bestätigungslink in der E-Mail an, um Ihr Benutzerkonto zu bestätigen. <br />
            <br />Keine E-Mail erhalten?
            Bitte prüfen Sie Ihren Spam Ordner oder ob Sie vielleicht einen Tippfehler in der E-Mail-Adresse haben. Sonst melden Sie sich gerne unter support@deepdive-ki.de 
            </p>

            <a
              href="/auth/signin"
              className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
            >
              Zum Login
            </a>
          </div>

          <div className="wow fadeInRight relative hidden aspect-[556/401] w-full xl:block">
            <Image src="/images/about/about.svg" alt="about" fill />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
