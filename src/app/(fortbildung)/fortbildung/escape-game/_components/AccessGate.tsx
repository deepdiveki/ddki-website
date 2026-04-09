"use client";

import { useState, useEffect, type FormEvent } from "react";
import { IconLock, IconKey, IconArrowRight, IconShoppingCart, IconRocket } from "@tabler/icons-react";

const STORAGE_KEY = "escape-game-access";

/** Set to `true` to show the "Lizenz kaufen" tab with Stripe checkout. */
const PURCHASE_ENABLED = true;

type Tab = "code" | "buy";

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("code");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") setAuthorized(true);
    setChecked(true);
  }, []);

  function grant() {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setAuthorized(true);
  }

  async function handleCodeSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setCodeError("");
    try {
      const res = await fetch("/api/escape-game-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "access", code: code.trim() }),
      });
      const data = (await res.json()) as { valid: boolean };
      if (data.valid) {
        grant();
      } else {
        setCodeError("Ungültiger oder abgelaufener Code. Bitte versuche es erneut.");
      }
    } catch {
      setCodeError("Fehler bei der Überprüfung. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy() {
    setBuyLoading(true);
    try {
      const res = await fetch("/api/escape-game-checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCodeError("Checkout konnte nicht gestartet werden. Bitte versuche es erneut.");
        setActiveTab("code");
      }
    } catch {
      setCodeError("Verbindungsfehler. Bitte versuche es erneut.");
      setActiveTab("code");
    } finally {
      setBuyLoading(false);
    }
  }

  if (!checked) return null;

  if (authorized) return <>{children}</>;

  return (
    <>
      {/* Static placeholder background */}
      <div
        className="pointer-events-none select-none"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(180deg, #7dd3fc 0%, #22c55e 70%, #9a5a1e 100%)",
        }}
      />

      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
        <div className="mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a2e]/90 shadow-2xl backdrop-blur-md">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-[#2a2a4a] to-transparent px-6 pt-8 pb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c6bdfa]/20">
              <IconLock size={28} className="text-[#c6bdfa]" />
            </div>
            <h2 className="text-xl font-bold text-white">Zugang zum Escape Game</h2>
            <p className="text-center text-sm text-white/60">
              {PURCHASE_ENABLED
                ? "Kaufe eine Lizenz oder gib deinen Zugangscode ein."
                : "Gib deinen Zugangscode ein, um zu starten."}
            </p>
          </div>

          {/* Tabs — only show when purchasing is enabled */}
          {PURCHASE_ENABLED && (
            <div className="mx-6 mt-2 flex rounded-lg bg-white/5 p-1">
              <button
                onClick={() => setActiveTab("code")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                  activeTab === "code"
                    ? "bg-[#c6bdfa]/20 text-[#c6bdfa]"
                    : "text-white/50 hover:text-white/70"
                }`}
              >
                <IconKey size={16} />
                Zugangscode
              </button>
              <button
                onClick={() => setActiveTab("buy")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                  activeTab === "buy"
                    ? "bg-[#c6bdfa]/20 text-[#c6bdfa]"
                    : "text-white/50 hover:text-white/70"
                }`}
              >
                <IconShoppingCart size={16} />
                Lizenz kaufen
              </button>
            </div>
          )}

          {/* Content */}
          <div className="px-6 pt-5 pb-8">
            {activeTab === "code" ? (
              <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="secret-code" className="mb-1.5 block text-sm font-medium text-white/70">
                    Zugangscode
                  </label>
                  <input
                    id="secret-code"
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setCodeError("");
                    }}
                    placeholder="Code eingeben…"
                    autoFocus
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white uppercase tracking-widest placeholder-white/30 outline-none transition-colors focus:border-[#c6bdfa]/50 focus:ring-1 focus:ring-[#c6bdfa]/30"
                  />
                  {codeError && (
                    <p className="mt-2 text-sm text-red-400">{codeError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#c6bdfa] px-4 py-2.5 font-semibold text-[#1a1a2e] transition-colors hover:bg-[#b4a9f0] disabled:opacity-60"
                >
                  {loading ? "Prüfe…" : "Zugang freischalten"}
                  <IconArrowRight size={18} />
                </button>
                {PURCHASE_ENABLED && (
                  <p className="text-center text-xs text-white/40">
                    Noch keinen Code?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("buy")}
                      className="text-[#c6bdfa] underline underline-offset-2 hover:text-white"
                    >
                      Lizenz kaufen
                    </button>
                  </p>
                )}
              </form>
            ) : (
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c6bdfa]/10">
                  <IconRocket size={24} className="text-[#c6bdfa]" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed text-white/70">
                    Erhalte <span className="font-semibold text-white">14 Tage Zugang</span> zum
                    KI Escape Game mit allen drei Dimensionen, Tutorials, Challenges und Materialien.
                  </p>
                  <p className="text-xs text-white/50">
                    Nach dem Kauf erhältst du deinen persönlichen Zugangscode per E-Mail.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBuy}
                  disabled={buyLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c6bdfa] px-4 py-3 font-semibold text-[#1a1a2e] transition-colors hover:bg-[#b4a9f0] disabled:opacity-60"
                >
                  {buyLoading ? (
                    "Weiterleitung…"
                  ) : (
                    <>
                      <IconShoppingCart size={18} />
                      Jetzt Lizenz kaufen
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-white/40">
                  Bereits einen Code?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("code")}
                    className="text-[#c6bdfa] underline underline-offset-2 hover:text-white"
                  >
                    Code eingeben
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
