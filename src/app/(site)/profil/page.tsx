import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Profil from "./Profil";
import UpdateSession from "@/components/Auth/updateSessionData";
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
    console.log("mismatch?:", data.needsUpdate);

    return (
      <>
        {/* Render the Profil component */}
        <Profil />

        {/* Conditionally render the UpdateSession component */}
        {data.needsUpdate && (
          <UpdateSession userId={userId} newAccess={data.databaseAccess} />
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching access data:", error);
    // Handle the error (e.g., show an error message to the user)
    return <Profil />; // Fallback to rendering the Profil component
  }
}

