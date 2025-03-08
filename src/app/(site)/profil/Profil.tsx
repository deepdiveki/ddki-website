"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const ProfilPage = () => {

  const { data: session, status, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified');
  const [isUpdating, setIsUpdating] = useState(false);
  const prevAccessRef = useRef(session?.user?.access);

  console.log("Client-side session5555:", session);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
      console.log("Session changed:", session);
  console.log("Previous access:", prevAccessRef.current);
  console.log("Current access:", session?.user?.access);
    if (session && session.user?.access !== prevAccessRef.current && !isUpdating) {
      setIsUpdating(true);
      update().finally(() => {
        setIsUpdating(false);
        prevAccessRef.current = session.user?.access; // Update the ref
      });
    }
  }, [session, update, isUpdating]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Redirect to sign-in if session is null
  if (!session) {
    return <div>Redirecting to login...</div>;
    router.push("/auth/signin");
  }

  // Extract user information
  const name = session.user?.name || "N/A";
  const email = session.user?.email || "N/A";
  const access = session.user?.access || "N/A";

  // Handler-Funktion, die den API-Call ausführt
  const handleDeleteAccount = async () => {
    // Benutzer um Bestätigung bitten
    if (
      !confirm(
        "Möchtest du deinen Account wirklich löschen? Diese Aktion ist unwiderruflich."
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Nach erfolgreicher Löschung kann der User ausgeloggt und umgeleitet werden
        await signOut();
        router.push("/");
      } else {
        const errorText = await response.text();
        console.error("Löschung fehlgeschlagen:", errorText);
        alert("Account konnte nicht gelöscht werden: " + errorText);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Accounts:", error);
      alert("Ein Fehler ist beim Löschen deines Accounts aufgetreten.");
    }
  };

  return (
    <>
      {verified === 'success' && (
        <div className="alert alert-success">
          Dein Account wurde erfolgreich verifiziert!
        </div>
      )}
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
              <strong>Zugriffsberechtigung:</strong> {access || "N/A"}
          </p>

          <div className="flex justify-center gap-4 mt-6">
              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="hero-button-gradient rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
              >
                Logout
              </button>

              {/* Delete Account Button (Grey Tone) */}
              <button
                onClick={handleDeleteAccount}
                className="bg-gray-600 text-white rounded-lg px-7 py-3 font-medium duration-300 ease-in hover:bg-gray-500"
              >
                Account löschen
              </button>
              {/* Refresh Session Button */}
              <button
                onClick={() => {
                  setIsUpdating(true);
                  update().finally(() => setIsUpdating(false));
                }}
                className="bg-blue-600 text-white rounded-lg px-7 py-3 font-medium duration-300 ease-in hover:bg-blue-500"
              >
                {isUpdating ? "Aktualisiere..." : "Session aktualisieren"}
              </button>
            </div>
        </div>
      </section>
    </>
  );
};

export default ProfilPage;