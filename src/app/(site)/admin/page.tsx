"use client";

import { useSession } from "next-auth/react";

import AdminSeite from "./AdminSeite";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.access !== "admin") {
    redirect("/");
  }

  return <AdminSeite />;
}
