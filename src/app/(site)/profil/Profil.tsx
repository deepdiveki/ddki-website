"use client";

import Breadcrumb from "@/components/Breadcrumb";
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

  // Redirect to sign-in if session is null
  if (!session) {
    return <div>Redirecting to login...</div>;
  }

  // Extract user information
  const name = session.user?.name || "N/A";
  const email = session.user?.email || "N/A";

  return (
    <>
      <Breadcrumb pageTitle="Profil Seite" />

      <section className="pb-20 pt-17.5 lg:pb-25 lg:pt-22.5 xl:pb-30 xl:pt-27.5 2xl:pb-[150px]">
        <div className="wow fadeInUp mx-auto w-full max-w-[597px] px-4 text-center sm:px-8 lg:px-0">
          <h2 className="mb-5 text-heading-3 font-bold text-white">Profil</h2>

          {/* Display user information */}
          <p className="mb-4 text-lg text-white">
            <strong>Name:</strong> {name || "N/A"}
          </p>
          <p className="mb-4 text-lg text-white">
            <strong>Email:</strong> {email || "N/A"}
          </p>
          <p className="mb-4 text-lg text-white">
              <strong>Status:</strong> {status === "authenticated" ? "Standard Access" : "Not Authenticated"}
          </p>

          {/* Logout Button */}
          <button
            onClick={() => signOut()}
            className="hero-button-gradient mt-6 inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
          >
            Logout
          </button>
        </div>
      </section>
    </>
  );
};

export default ProfilPage;