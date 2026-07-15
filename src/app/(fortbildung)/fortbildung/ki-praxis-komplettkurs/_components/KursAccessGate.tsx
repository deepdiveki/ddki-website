"use client";

import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

// Weiche Zugangssperre für den KI-Praxis-Komplettkurs. Passwort-Prüfung server-seitig
// (/api/kurs-verify), Freischaltung im localStorage gemerkt.
// Look: helle DeepDiveKI-Fläche, gradient-getöntes Swirl-Logo, konzentrische „Deep-Dive"-Ringe.
const STORAGE_KEY = "ki-komplettkurs-access";
const LOGO = "/images/logo/logo-icon.svg";

export default function KursAccessGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") setAuthorized(true);
    } catch {
      /* localStorage nicht verfügbar – Sperre bleibt aktiv */
    }
    setChecked(true);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/kurs-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = (await res.json()) as { valid: boolean };
      if (data.valid) {
        try {
          localStorage.setItem(STORAGE_KEY, "true");
        } catch {
          /* ignorieren */
        }
        setAuthorized(true);
      } else {
        setError("Das Passwort stimmt nicht. Versuch es noch mal.");
      }
    } catch {
      setError("Da ist etwas schiefgelaufen. Versuch es gleich noch mal.");
    } finally {
      setLoading(false);
    }
  }

  if (!checked) return null;
  if (authorized) return <>{children}</>;

  const maskStyle = {
    background: "linear-gradient(135deg, #8646F4, #D345F8)",
    WebkitMaskImage: `url(${LOGO})`,
    maskImage: `url(${LOGO})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 font-inter"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 8%, #FFFFFF 0%, #F5F3FF 42%, #EDE9FE 100%)",
      }}
    >
      {/* Signatur: konzentrische „Deep-Dive"-Ringe */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[300, 520, 760, 1040].map((s, i) => (
          <div
            key={s}
            className="absolute rounded-full border"
            style={{
              width: s,
              height: s,
              left: -s / 2,
              top: -s / 2,
              borderColor: "rgba(134,70,244,0.10)",
              opacity: 1 - i * 0.18,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-[420px] rounded-[28px] border border-purple-light-3/70 bg-white/85 p-9 shadow-[0_24px_70px_-24px_rgba(134,70,244,0.35)] backdrop-blur-xl duration-500 animate-in fade-in slide-in-from-bottom-2">
        {/* Logo im Marken-Gradient */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-5 h-14 w-14" style={maskStyle} />
          <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-purple">
            DeepDiveKI · Komplettkurs
          </span>
          <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-text-primary">
            Schön, dass du wieder da bist.
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
            Gib dein Kurs-Passwort ein, um weiterzulernen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label htmlFor="kurs-password" className="mb-1.5 block text-sm font-semibold text-text-primary">
              Kurs-Passwort
            </label>
            <div className="relative">
              <input
                id="kurs-password"
                type={show ? "text" : "password"}
                inputMode="numeric"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••"
                autoFocus
                autoComplete="off"
                aria-invalid={Boolean(error)}
                className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-[15px] tracking-[0.2em] text-text-primary outline-none transition placeholder:tracking-normal placeholder:text-text-tertiary focus:ring-2 ${
                  error
                    ? "border-pink/60 focus:border-pink focus:ring-pink/20"
                    : "border-border-secondary focus:border-purple focus:ring-purple/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Passwort verbergen" : "Passwort anzeigen"}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-text-tertiary transition hover:bg-purple-light-5 hover:text-purple"
              >
                {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
            {error && <p className="mt-2 text-sm font-medium text-pink-dark">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[15px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(134,70,244,0.7)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ background: "linear-gradient(135deg, #8646F4, #D345F8)" }}
          >
            {loading ? "Einen Moment…" : "Weiterlernen"}
            {!loading && <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-text-tertiary">
          Passwort vergessen?{" "}
          <a href="mailto:support@deepdive-ki.de" className="font-medium text-purple underline-offset-2 hover:underline">
            support@deepdive-ki.de
          </a>
        </p>
      </div>
    </div>
  );
}
