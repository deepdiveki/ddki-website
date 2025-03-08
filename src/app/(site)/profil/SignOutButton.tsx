"use client"; // Mark this as a client component

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  useEffect(() => {
    // Perform the sign-out
    signOut({ redirect: false }).then(() => {
      // Redirect to the sign-in page after signing out
      window.location.href = "/auth/signin";
    });
  }, [router]);

  return null; // This component doesn't render anything
}