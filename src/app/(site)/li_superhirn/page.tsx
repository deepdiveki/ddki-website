"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { IconMessage, IconRobot, IconSchool, IconSend } from "@tabler/icons-react";

type RoleId = "studierende" | "referendare" | "lehrkraefte";

type RoleProfile = {
  id: RoleId;
  label: string;
  title: string;
  description: string;
  quickPrompts: string[];
};

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  role: RoleId;
};

type ApiMessage = {
  role: "user" | "assistant";
  content: string;
};

const ROLE_PROFILES: RoleProfile[] = [
  {
    id: "studierende",
    label: "Studierende",
    title: "Lernen, Zusammenfassen, Üben",
    description:
      "Ideal für Skripte, Hausarbeiten und Prüfungsvorbereitung mit klaren Schritten.",
    quickPrompts: [
      "Fasse Kapitel 3 in 5 Punkten zusammen.",
      "Erstelle 6 Übungsfragen zu Zellbiologie.",
      "Wie baue ich eine Einleitung für eine Hausarbeit?",
    ],
  },
  {
    id: "referendare",
    label: "Referendare",
    title: "Unterrichtsplanung im Takt",
    description:
      "Unterstützt bei Sequenzplanung, Stundenentwurf und Reflexion.",
    quickPrompts: [
      "Plane eine 45-Min-Stunde zu Bruchrechnung.",
      "Gib mir Differenzierungsideen für Klasse 7.",
      "Formuliere Beobachtungskriterien für Gruppenarbeit.",
    ],
  },
  {
    id: "lehrkraefte",
    label: "Lehrkräfte",
    title: "Praxisnah, strukturiert, alltagstauglich",
    description:
      "Schnelle Vorlagen für Elternkommunikation und Lernstandschecks.",
    quickPrompts: [
      "Schreibe einen Elternbrief zur Klassenfahrt.",
      "Erstelle eine Kurzarbeit mit 3 Niveaus.",
      "Gib mir Aktivierungsimpulse für Deutsch Klasse 9.",
    ],
  },
];

const ROLE_LABELS: Record<RoleId, string> = {
  studierende: "Studierende",
  referendare: "Referendare",
  lehrkraefte: "Lehrkräfte",
};

const ROLE_STYLES: Record<
  RoleId,
  {
    badge: string;
    userBubble: string;
    glow: string;
    accent: string;
    ring: string;
  }
> = {
  studierende: {
    badge: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200",
    userBubble: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
    glow: "shadow-[0_0_35px_rgba(56,189,248,0.25)]",
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    ring: "border-cyan-500/50",
  },
  referendare: {
    badge: "border-pink-500/40 bg-pink-500/15 text-pink-200",
    userBubble: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
    glow: "shadow-[0_0_35px_rgba(236,72,153,0.25)]",
    accent: "from-pink-500/20 via-rose-500/10 to-transparent",
    ring: "border-pink-500/50",
  },
  lehrkraefte: {
    badge: "border-purple-500/40 bg-purple-500/15 text-purple-200",
    userBubble: "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white",
    glow: "shadow-[0_0_35px_rgba(168,85,247,0.25)]",
    accent: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    ring: "border-purple-500/60",
  },
};

const INITIAL_MESSAGES: ChatMessage[] = [];

const normalizeInput = (value: string) =>
  value
    .toLowerCase()
    .replace(/\u00e4/g, "ae")
    .replace(/\u00f6/g, "oe")
    .replace(/\u00fc/g, "ue")
    .replace(/\u00df/g, "ss");

const getRoleReply = (role: RoleId, input: string) => {
  const normalized = normalizeInput(input);

  if (role === "studierende") {
    if (normalized.includes("zusammenfass") || normalized.includes("summary")) {
      return "Gern. Schick mir das Thema oder den Text, dann liefere ich: 1) Kurzfassung in 5 Punkten, 2) Schlüsselbegriffe, 3) drei Übungsfragen.";
    }
    if (normalized.includes("hausarbeit") || normalized.includes("literatur")) {
      return "Für die Hausarbeit: 1) Forschungsfrage schärfen, 2) Gliederung mit 3-5 Kapiteln, 3) Kernquellen sammeln, 4) Argumentationslinie skizzieren.";
    }
    if (normalized.includes("pruefung") || normalized.includes("klausur") || normalized.includes("lernplan")) {
      return "Ich erstelle dir einen Lernplan: Themenliste, Prioritäten, Wiederholungszyklen und Beispielaufgaben. Nenne Fach, Umfang und Termin.";
    }
    if (normalized.includes("ueben") || normalized.includes("uebungsfragen")) {
      return "Sag mir das Thema und Niveau, dann generiere ich abwechslungsreiche Fragen: Reproduktion, Transfer und Anwendung.";
    }
    return "Ich helfe beim Lernen, Zusammenfassen und Üben. Sag mir Fach, Thema und Ziel, dann lege ich los.";
  }

  if (role === "referendare") {
    if (normalized.includes("stunde") || normalized.includes("unterricht")) {
      return "Ich skizziere dir einen Stundenentwurf mit Phasen, Methoden und Material. Nenne Fach, Jahrgang, Thema und Ziel.";
    }
    if (normalized.includes("differenzierung") || normalized.includes("heterogen")) {
      return "Differenzierungsideen: Wahlaufgaben, Hilfekarten, Niveaustufen, Lernprodukte (Poster, Audio, Kurztext) und Zeitfenster.";
    }
    if (normalized.includes("beobachtung") || normalized.includes("feedback")) {
      return "Beobachtungskriterien: Aktivierungsgrad, Aufgabenverständnis, Kooperation, Sprachhandeln, Zielerreichung. Soll ich ein Raster bauen?";
    }
    return "Ich helfe bei Planung, Reflexion und Material. Sag mir Fach, Klasse und Schwerpunkt.";
  }

  if (normalized.includes("eltern") || normalized.includes("kommunikation")) {
    return "Ich formuliere dir einen Elternbrief: Anlass, Termin, Ablauf, Kontakt und Rückmeldung. Nenne Datum und Ton.";
  }
  if (normalized.includes("klassenarbeit") || normalized.includes("test")) {
    return "Ich erstelle eine Klassenarbeit mit drei Niveaus: Basis, Standard, Transfer. Sag mir Thema, Zeit und Hilfsmittel.";
  }
  if (normalized.includes("aktivierung") || normalized.includes("stille")) {
    return "Aktivierung: Warm-up-Frage, Think-Pair-Share, Abstimmung mit Karten, Mini-Whiteboards und Exit-Ticket.";
  }

  return "Ich helfe mit Unterrichtsplanung, Kommunikation und Checklisten. Sag mir Fach, Klasse und Ziel.";
};

export default function LiSuperhirnPage() {
  const [activeRole, setActiveRole] = useState<RoleId>("studierende");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeProfile = useMemo(
    () => ROLE_PROFILES.find((role) => role.id === activeRole) ?? ROLE_PROFILES[0],
    [activeRole]
  );
  const visibleMessages = useMemo(
    () => messages.filter((message) => message.role === activeRole),
    [messages, activeRole]
  );

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior });
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [visibleMessages.length, isTyping, activeRole]);

  const handleSend = async (value?: string) => {
    const text = (value ?? inputValue).trim();
    if (!text) return;

    const newMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      sender: "user",
      text,
      timestamp: new Date(),
      role: activeRole,
    };

    const nextMessages = [...messages, newMessage];
    setMessages(nextMessages);
    setInputValue("");
    setIsTyping(true);
    requestAnimationFrame(() => scrollToBottom("smooth"));

    let reply = "";

    try {
      const history: ApiMessage[] = nextMessages
        .filter((message) => message.role === activeRole)
        .map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.text,
        }));

      const response = await fetch("/api/li-superhirn-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          role: activeRole,
          messages: history,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { reply?: string };
        if (data.reply && data.reply.trim()) {
          reply = data.reply.trim();
        }
      }
    } catch (error) {
      reply = "";
    }

    if (!reply) {
      reply = getRoleReply(activeRole, text);
    }

    const botMessage: ChatMessage = {
      id: `${Date.now()}-bot`,
      sender: "bot",
      text: reply,
      timestamp: new Date(),
      role: activeRole,
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen bg-[#070511] text-white">
      <section className="relative overflow-hidden pb-20 pt-35 md:pt-40 xl:pt-45">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(134,70,244,0.18),_transparent_60%)]" />
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center animated fadeInUp">
            <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">LI Superhirn</span>
            </span>
            <h1 className="mb-5 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-2">
              Das LI Superhirn
            </h1>
            <p className="mx-auto max-w-[700px] text-base font-medium text-white/80 md:text-lg">
              Ein gemeinsamer KI-Chat, der Lernprozesse, Unterrichtsplanung,
              Termine und Prüfungsvorbereitung in einer Oberfläche vereint. Rolle auswählen, Frage
              stellen, Antwort nutzen.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 animated fadeInLeft">
              <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] p-6 shadow-[0_0_45px_rgba(134,70,244,0.18)]">
                <h2 className="text-lg font-semibold">Wer schreibt gerade?</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Schalte zwischen Rollen, um Antworten auf Zielgruppen-Niveau zu erhalten.
                </p>
                <div className="mt-5 grid gap-3">
                  {ROLE_PROFILES.map((role) => {
                    const isActive = role.id === activeRole;
                    const styles = ROLE_STYLES[role.id];

                    return (
                      <button
                        key={role.id}
                        onClick={() => setActiveRole(role.id)}
                        className={`group relative overflow-hidden rounded-2xl border px-4 py-3 text-left transition ${
                          isActive
                            ? `${styles.ring} ${styles.glow} bg-gradient-to-r ${styles.accent}`
                            : "border-purple-900/50 bg-[#141126] hover:border-purple-600/70"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {role.label}
                            </p>
                            <p className="text-xs text-slate-400">{role.title}</p>
                          </div>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] ${
                              isActive
                                ? styles.badge
                                : "border-white/10 bg-white/5 text-white/60"
                            }`}
                          >
                            {isActive ? "Aktiv" : "Wählen"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: IconMessage,
                    title: "Dialog in Echtzeit",
                    detail: "Antworten in klaren Schritten und Format.",
                  },
                  {
                    icon: IconSchool,
                    title: "Didaktische Tiefe",
                    detail: "Methoden, Differenzierung, Aufgabenformate.",
                  },
                  {
                    icon: IconRobot,
                    title: "Vorlagen & Struktur",
                    detail: "Schnelle Entwürfe für Alltag und Praxis.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-purple-900/40 bg-[#0b071a] p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-900/60 bg-[#141126] text-purple-300">
                      <item.icon size={20} />
                    </div>
                    <h4 className="mt-4 text-sm font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-400">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animated fadeInRight">
              <div className="rounded-[32px] border border-purple-900/60 bg-[#0b071a] shadow-[0_0_60px_rgba(134,70,244,0.2)]">
                <div className="flex flex-col gap-4 border-b border-purple-900/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-900/60 bg-[#151128] text-purple-300">
                      <IconRobot size={22} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-purple-300">
                        LI Superhirn
                      </p>
                      <h2 className="text-lg font-semibold">KI-Chatfenster</h2>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${ROLE_STYLES[activeRole].badge}`}
                  >
                    Modus: {activeProfile.label}
                  </div>
                </div>

                <div className="px-6 pt-4">
                  <div className="flex items-center justify-between rounded-2xl border border-purple-900/50 bg-[#141126] px-4 py-3 text-xs text-slate-300">
                    <span>Antwortzeit: ca. 1-3 Sekunden</span>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                      Online
                    </span>
                  </div>
                </div>

                <div
                  ref={messagesContainerRef}
                  className="h-[430px] space-y-4 overflow-y-auto px-6 py-6 no-scrollbar"
                >
                  {visibleMessages.length === 0 && !isTyping && (
                    <div className="rounded-2xl border border-purple-800/60 bg-[#151128] px-4 py-4 text-sm text-slate-300">
                      Starte den Chat im Modus {activeProfile.label}. Stelle eine
                      konkrete Frage, damit die Antwort direkt passt.
                    </div>
                  )}
                  {visibleMessages.map((message) => {
                    const roleStyle = ROLE_STYLES[message.role];
                    const isUser = message.sender === "user";

                    return (
                      <div
                        key={message.id}
                        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                            isUser
                              ? roleStyle.userBubble
                              : "bg-[#151128] text-slate-200 border border-purple-800/60"
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-white/60">
                            <span
                              className={`rounded-full border px-2 py-0.5 ${isUser ? roleStyle.badge : "border-purple-700/60 bg-purple-500/15 text-purple-200"}`}
                            >
                              {isUser ? ROLE_LABELS[message.role] : "Superhirn"}
                            </span>
                            <span>
                              {message.timestamp.toLocaleTimeString("de-DE", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="whitespace-pre-line">{message.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl border border-purple-800/60 bg-[#151128] px-4 py-3 text-sm text-slate-200">
                        <span className="inline-flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:120ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:240ms]" />
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-purple-900/60 px-6 py-4">
                  <div className="flex items-center gap-3 rounded-full border border-purple-800/60 bg-[#141126] px-4 py-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Schreibe deine Frage und drücke Enter..."
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleSend()}
                      className="rounded-full bg-purple-600 p-2 text-white transition hover:bg-purple-500"
                      aria-label="Nachricht senden"
                    >
                      <IconSend size={18} />
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Tipp: Nenne Fach, Niveau und Ziel, damit die Antwort direkt passt.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Live-Chat: Antworten kommen vom KI-Backend.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
