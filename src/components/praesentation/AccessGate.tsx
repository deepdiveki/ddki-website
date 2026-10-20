import { isAuthed } from "@/lib/praesentation-auth";
import LoginForm from "./LoginForm";

/**
 * Server-Komponente: zeigt den Inhalt nur mit gültigem Zugangscode-Cookie,
 * sonst das Login-Formular. Die Teilnehmer-Seite (/live) nutzt das Gate nicht.
 */
export default async function AccessGate({ children }: { children: React.ReactNode }) {
  if (await isAuthed()) return <>{children}</>;
  return <LoginForm />;
}
