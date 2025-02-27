import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.access !== "admin") {
    return <p>Access denied</p>;
  }

  return <h1>Welcome, Admin</h1>;
}
