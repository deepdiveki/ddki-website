import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Profil from "./Profil";
import { updateSessionAccess } from "@/libs/changeSessionData";

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

  if (!session?.user?.id || !session?.user?.access) {
    console.error("Session missing required fields:", session);
  }

  // Ensure values exist before making the request
  const userId = encodeURIComponent(session.user.id);
  const sessionAccess = encodeURIComponent(session.user.access);

  const baseUrl = process.env.SITE_URL || "";

    console.log("URL:", baseUrl);

  // Fetch the latest access data from the database
  const res = await fetch(`${process.env.SITE_URL}/api/dbAccessCheck?userId=${userId}&sessionAccess=${sessionAccess}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (data.error) {
    console.error("Access check failed:", data.error);
    redirect("/auth/signin"); // Redirect if the check fails
  }

  if (data.needsUpdate) {
    console.warn(`User access mismatch: Session (${session.user.access}) vs. DB (${data.databaseAccess})`);

    // Update the session with the correct access level
    await updateSessionAccess(userId, data.databaseAccess);
  }

  return <Profil />;
}

