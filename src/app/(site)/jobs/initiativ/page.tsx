"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function InitiativbewerbungPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = "Initiativbewerbung DeepDiveKI";
    const lines = [
      name ? `Name: ${name}` : null,
      email ? `E-Mail: ${email}` : null,
      "",
      message,
    ].filter((line) => line !== null);
    const body = lines.join("\n");
    return `mailto:info@deepdive-ki.de?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [name, email, message]);

  return (
    <main className="min-h-screen bg-[#070511] text-white">
      <section className="relative z-10 overflow-visible pt-35 md:pt-40 xl:pt-45 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(134,70,244,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
          <div className="text-center">
            <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">Initiativbewerbung</span>
            </span>
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              Bewerbung im Team DeepDiveKI
            </h1>
            <div className="mx-auto mb-10 max-w-[780px] text-left">
              <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6 shadow-[0_0_40px_rgba(134,70,244,0.18)]">
                <p className="text-xs uppercase tracking-[0.35em] text-purple-300">
                  Bewerbung im Team
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  Kein perfekter Titel. Nur echtes Interesse.
                </h2>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  Als Tim und ich angefangen haben, haben wir tausend Fehler
                  gemacht. Wir haben uns Dinge selbst beigebracht, anderen
                  zugehört, um Rat gefragt, Workflows aufgebaut und wieder
                  verworfen, unter Schreibtischen geschlafen, uns gestritten –
                  und wieder vertragen.
                </p>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  Was ich sagen will: Wir hätten uns damals nie auf einen festen
                  Titel bewerben können. Und wir wissen, wie nervig und
                  schwierig das manchmal ist.
                </p>
                <div className="mt-5 rounded-2xl border border-purple-900/40 bg-[#141126] px-4 py-3 text-sm text-white">
                  Wenn du Bock hast, uns einfach mal kennenzulernen – ohne viel
                  Business-Buzzwords – schreib uns. Wir melden uns.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 pt-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6 shadow-[0_0_45px_rgba(134,70,244,0.2)]">
            <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-6">
              <h2 className="text-xl font-semibold text-white">
                Schreib uns direkt
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Erzähl uns, wer du bist, was du kannst und worauf du Lust hast.
                Der Button öffnet dein E-Mail-Programm mit deiner Nachricht.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Name
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Dein Name"
                    className="mt-2 w-full rounded-xl border border-purple-900/40 bg-[#0b071a] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60"
                  />
                </label>
                <label className="text-sm text-slate-300">
                  E-Mail
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="du@email.de"
                    className="mt-2 w-full rounded-xl border border-purple-900/40 bg-[#0b071a] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60"
                  />
                </label>
              </div>

              <label className="mt-5 block text-sm text-slate-300">
                Deine Nachricht
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Erzähl uns von deinem Background, Projekten oder was dich antreibt."
                  rows={7}
                  className="mt-2 w-full rounded-2xl border border-purple-900/40 bg-[#0b071a] px-4 py-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60"
                />
              </label>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={mailtoHref}
                  className="button-border-gradient hover:button-gradient-hover relative inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-white shadow-button hover:shadow-none"
                >
                  Nachricht senden
                </a>
                <span className="text-xs text-slate-400">
                  Alternativ: info@deepdive-ki.de
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="/jobs"
              className="text-sm text-purple-300 hover:text-purple-200"
            >
              Zurück zu den Jobs
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
