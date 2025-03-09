"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import AdminSeite from "./AdminSeite";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading spinner or message
  }

  console.log("admin page access?: ", session?.user?.access);

  if (!session || session.user.access !== "admin") {
    redirect("/");
  }

  return <AdminSeite />;
}
