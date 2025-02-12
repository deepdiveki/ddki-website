import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil",
  description: "This is Profil page",
  // other metadata
};


// Import the client-side component
import Profil from "./Profil";

// Use the client component within the server component
export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  return <Profil />;
}