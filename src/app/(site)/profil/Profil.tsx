"use client";

import Breadcrumb from "@/components/Breadcrumb";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const ProfilPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb pageTitle="Profil Seite" />

      <section className="pb-20 pt-17.5 lg:pb-25 lg:pt-22.5 xl:pb-30 xl:pt-27.5 2xl:pb-[150px]">
        <div
          className="wow fadeInUp mx-auto w-full max-w-[597px] px-4 text-center sm:px-8 lg:px-0"
          data-wow-delay="0.1s"
        >
          <div className="relative mx-auto mb-12.5 aspect-[191/143] w-full max-w-[382px]">
            <Image src="/images/404.svg" alt="404" fill />
          </div>
          <h2 className="mb-5.5 text-heading-3 font-bold text-white">
            Diese Seite ist noch in Arbeit!.
          </h2>
          <p className="mb-9 font-medium">
            Wir arbeiten mit hochdruck daran, diese Seite fertigzustellen!
          </p>
          <Link
            href="/"
            className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
          >
            Go To Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProfilPage;