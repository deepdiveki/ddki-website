import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Profil from "./Profil";
import { signOut } from "next-auth/react";
import SignOutButton from "./SignOutButton"; // Import the client-side sign-out component

export const metadata: Metadata = {
  title: "Profil",
  description: "Das ist die Profil Seite",
};


// Use the client component within the server component
export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to sign-in if not authenticated
    redirect("/auth/signin");
  }

  console.log("Session Data:", session);

  const userId = session?.user?.id;
  const sessionAccess = session?.user?.access;

  if (!userId || !sessionAccess) {
    console.error("Session is missing required fields:", session);
  }

  try {
    // Fetch the latest access data from the database
    const res = await fetch(`${process.env.SITE_URL}/api/dbAccessCheck?userId=${encodeURIComponent(userId)}&sessionAccess=${encodeURIComponent(sessionAccess)}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if (data.error) {
      console.error("Access check failed:", data.error);
      // Show error7777777
    }

    if (data.needsUpdate) {
      console.warn(`User access mismatch: Session (${session.user.access}) vs. DB (${data.databaseAccess})`);
    }
  } catch (error) {
    console.error("Error fetching access data:", error);
    // Show error message777777777777777
  }

  return (
    <>
      {needsUpdate && <SignOutButton />} {/* Render the sign-out button if a mismatch is detected */}
      <Profil />
    </>
  );
}

