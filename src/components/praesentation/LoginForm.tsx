"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/praesentation-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        setError("Der Code stimmt nicht.");
        setCode("");
        return;
      }
      // Reload behält den Folien-Hash (#12) bei.
      window.location.reload();
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte noch einmal.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 font-inter">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-border-tertiary bg-white p-8 shadow-md"
      >
        <div className="flex items-center gap-3">
          <Image src="/images/ddki-logo.svg" alt="" width={32} height={32} className="size-8" />
          <div>
            <p className="text-base font-semibold text-text-primary">DeepDiveKI</p>
            <p className="text-xs text-text-tertiary">Präsentationen · Intern</p>
          </div>
        </div>
        <h1 className="mt-6 text-xl font-semibold text-text-primary">Zugangscode</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Dieser Bereich ist für das DeepDiveKI-Team. Teilnehmende brauchen keinen Code,
          sie nutzen den QR-Code auf der Leinwand.
        </p>
        <input
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
          aria-label="Zugangscode"
          className="mt-5 w-full rounded-xl border border-border-secondary px-4 py-3 text-center text-2xl tracking-[0.4em] text-text-primary outline-none focus:border-primary-dark"
        />
        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
        <button
          type="submit"
          disabled={busy || !code}
          className="mt-5 w-full rounded-xl bg-text-primary px-4 py-3 text-base font-medium text-white transition hover:bg-primary-darker disabled:opacity-40"
        >
          {busy ? "Prüfe …" : "Öffnen"}
        </button>
      </form>
    </main>
  );
}
