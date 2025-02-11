import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Construction",
  description: "This is UC page",
  // other metadata
};


// Import the client-side component
import UnderConstruction from "./UnderConstruction";

// Use the client component within the server component
export default async function UnderConstructionPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to sign-in if not authenticated
    redirect("/auth/signin");
  }
  return <UnderConstruction />;
}