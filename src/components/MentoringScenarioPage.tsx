"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ScenarioTabId = "unterricht" | "student" | "gespraech" | "literatur";

type ScenarioTimelineItem = {
  title: string;
  description: string;
  accent: "primary" | "muted";
};

type ScenarioCard = {
  title: string;
  description: string;
};

type ScenarioChatMessage = {
  sender: "user" | "mentor";
  text: string;
  time: string;
  kind?: "feedback";
};

export type ScenarioContent = {
  title: string;
  subtitle: string;
  studentName: string;
  heroDescription: string;
  image: string;
  hideLessonImage?: boolean;
  lessonTitle?: string;
  lessonSummary?: Array<{ label: string; value: string }>;
  theoryBridge?: ScenarioCard[];
  classOverview: ScenarioCard[];
  plannedFlow: ScenarioTimelineItem[];
  actualFlow: ScenarioTimelineItem[];
  issues: string[];
  studentProfile: ScenarioCard[];
  studentSignals: ScenarioCard[];
  studentDetails?: Array<{
    title?: string;
    layout?: "two-column" | "single";
    columns?: Array<{ title?: string; items: string[]; bullet?: boolean }>;
  }>;
  coachingFocus: ScenarioCard[];
  coachingPrompts: string[];
  coachingDetails?: Array<{
    title: string;
    body?: string[];
    layout?: "single" | "two-column";
    columns?: Array<{ title: string; items: string[]; bullet?: boolean }>;
  }>;
  literature: ScenarioCard[];
  chatIntro: string;
  chatGoal: string;
  chatMessages: ScenarioChatMessage[];
  chatPersona: string;
  chatContext: string;
};

const tabs = [
  { id: "unterricht", label: "Unterricht" },
  { id: "student", label: "Student:in" },
  { id: "gespraech", label: "Gesprächsführung" },
  { id: "literatur", label: "Literatur" },
] as const;

const TabButton = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-5 py-3 text-sm font-semibold transition-colors ${
      active
        ? "text-white border-b-2 border-purple-400"
        : "text-slate-400 hover:text-white"
    }`}
  >
    {label}
  </button>
);

export default function MentoringScenarioPage({
  scenario,
}: {
  scenario: ScenarioContent;
}) {
  const [activeTab, setActiveTab] = useState<ScenarioTabId>("unterricht");
  const [messages, setMessages] = useState<ScenarioChatMessage[]>(
    scenario.chatMessages
  );
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [feedbackModal, setFeedbackModal] = useState<string | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const needsZoomOut =
    scenario.image.includes("cover-06") || scenario.image.includes("cover-07");
  const activeLabel = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.label ?? "",
    [activeTab]
  );
  const userMessageCount = useMemo(
    () => messages.filter((message) => message.sender === "user").length,
    [messages]
  );
  const canRequestFeedback = userMessageCount >= 4 && userMessageCount - feedbackCount >= 4;

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const now = new Date();
    const userMessage: ScenarioChatMessage = {
      sender: "user",
      text: trimmed,
      time: now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await fetch("/api/mentoring-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          persona: scenario.chatPersona,
          context: scenario.chatContext,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { reply?: string };
        if (data.reply) {
          const botMessage: ScenarioChatMessage = {
            sender: "mentor",
            text: data.reply,
            time: new Date().toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleFeedback = async () => {
    if (!canRequestFeedback || isSending) return;
    setIsSending(true);
    setIsFeedbackLoading(true);

    try {
      const literature = scenario.literature
        .map((item) => `${item.title}: ${item.description}`)
        .join("\n");
      const response = await fetch("/api/mentoring-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          persona: scenario.chatPersona,
          context: scenario.chatContext,
          literature,
          mode: "feedback",
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { reply?: string };
        if (data.reply) {
          const feedbackMessage: ScenarioChatMessage = {
            sender: "mentor",
            text: data.reply,
            time: new Date().toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            kind: "feedback",
          };
          setMessages((prev) => [...prev, feedbackMessage]);
          setFeedbackCount(userMessageCount);
          setFeedbackModal(data.reply);
        }
      }
    } finally {
      setIsSending(false);
      setIsFeedbackLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070511] text-white">
      {feedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="max-w-2xl w-full rounded-3xl border border-emerald-500/30 bg-[#0b071a] shadow-[0_0_60px_rgba(16,185,129,0.25)]">
            <div className="flex items-center justify-between border-b border-emerald-500/20 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Feedback</h3>
              <button
                onClick={() => setFeedbackModal(null)}
                className="rounded-full border border-emerald-500/30 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-500/10"
              >
                Schließen
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-200 whitespace-pre-line">
                {feedbackModal}
              </p>
            </div>
          </div>
        </div>
      )}
      <section className="relative z-10 overflow-visible pt-35 md:pt-40 xl:pt-45 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(134,70,244,0.18),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
          <div className="text-center max-w-[900px] mx-auto">
            <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
              <Image
                src="/images/hero/icon-title.svg"
                alt="icon"
                width={16}
                height={16}
              />
              <span className="hero-subtitle-text">{scenario.subtitle}</span>
            </span>
            <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
              {scenario.title}
            </h1>
            <p className="mx-auto mb-9 max-w-[620px] font-medium md:text-lg text-white">
              {scenario.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-20 pt-4">
        <div className="mx-auto max-w-6xl px-6">
          <a
            href="/mentoring"
            className="mb-6 inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
          >
            <span className="text-lg">&lt;-</span>
            Zurück zur Mentoring-Übersicht
          </a>
          <div className="grid gap-8">
            <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] shadow-[0_0_45px_rgba(134,70,244,0.18)]">
              <div className="flex flex-wrap items-center border-b border-purple-900/60">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    active={activeTab === tab.id}
                    label={tab.label}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
              <div className="p-6 space-y-8">
                <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-5">
                  <p className="text-sm text-slate-300">
                    Vorbereitung aktiv: Nutzen Sie die Tabs, um Unterricht,
                    Profil und Gesprächsstrategie zu verstehen. Aktuell sehen Sie
                    <span className="text-white font-semibold"> {activeLabel}</span>.
                  </p>
                </div>

                {activeTab === "unterricht" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Beschreibung der Unterrichtssituation
                      </h3>
                        <div className={`grid gap-6 ${scenario.hideLessonImage ? "" : "md:grid-cols-[220px_1fr]"}`}>
                        {!scenario.hideLessonImage && (
                          <div
                            className={`relative h-56 md:h-60 rounded-2xl overflow-hidden border border-purple-900/40 ${
                              needsZoomOut ? "bg-[#f6e9ff]" : ""
                            }`}
                          >
                            <Image
                              src={scenario.image}
                              alt={`Szenario ${scenario.title}`}
                              fill
                              className={`object-cover ${
                                needsZoomOut ? "scale-85" : ""
                              }`}
                              sizes="(max-width: 768px) 100vw, 40vw"
                              unoptimized={scenario.image.endsWith(".svg")}
                            />
                          </div>
                        )}
                        <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-5">
                          <h4 className="font-semibold text-white mb-3">
                            {scenario.lessonTitle || "Unterrichtsüberblick"}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                            {(scenario.lessonSummary ?? scenario.classOverview).map((item) => (
                              <div key={"label" in item ? item.label : item.title}>
                                <p className="text-white font-semibold">
                                  {"label" in item ? item.label : item.title}
                                </p>
                                <p className="text-slate-400">
                                  {"value" in item ? item.value : item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {scenario.theoryBridge && scenario.theoryBridge.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Theorie-Praxis-Brücke
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {scenario.theoryBridge.map((item) => (
                            <div
                              key={item.title}
                              className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4"
                            >
                              <p className="text-white font-semibold">{item.title}</p>
                              <p className="text-sm text-slate-300 mt-2">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Geplanter Ablauf
                        </h4>
                        <div className="space-y-4">
                          {scenario.plannedFlow.map((item) => (
                            <div
                              key={item.title}
                              className="border-l-2 border-purple-400/70 pl-4"
                            >
                              <p className="text-white font-semibold">
                                {item.title}
                              </p>
                              <p className="text-sm text-slate-300 mt-1">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Tatsächlicher Ablauf
                        </h4>
                        <div className="space-y-4">
                          {scenario.actualFlow.map((item) => (
                            <div
                              key={item.title}
                              className={`border-l-2 pl-4 ${
                                item.accent === "primary"
                                  ? "border-purple-400/70"
                                  : "border-slate-500/60"
                              }`}
                            >
                              <p className="text-white font-semibold">
                                {item.title}
                              </p>
                              <p className="text-sm text-slate-300 mt-1">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Festgestellte Probleme
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {scenario.issues.map((issue) => (
                          <div
                            key={issue}
                            className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-sm text-slate-300"
                          >
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "student" && (
                  <div className="space-y-8">
                    {scenario.studentDetails ? (
                      scenario.studentDetails.map((section) => (
                        <div key={section.title || section.columns?.[0]?.title} className="space-y-4">
                          {section.title && (
                            <h3 className="text-xl font-semibold text-white">
                              {section.title}
                            </h3>
                          )}
                          {section.columns && section.layout === "two-column" ? (
                            <div className="grid md:grid-cols-2 gap-4">
                              {section.columns.map((column) => (
                                <div
                                  key={column.title || column.items.join("-")}
                                  className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-sm text-slate-300"
                                >
                                  {column.title && (
                                    <p className="text-white font-semibold mb-3">
                                      {column.title}
                                    </p>
                                  )}
                                  {column.bullet ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                      {column.items.map((item) => (
                                        <li key={item}>{item}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <div className="space-y-2">
                                      {column.items.map((item) => (
                                        <p key={item}>{item}</p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : section.columns && section.layout === "single" ? (
                            <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-sm text-slate-300">
                              {section.columns[0]?.title && (
                                <p className="text-white font-semibold mb-3">
                                  {section.columns[0].title}
                                </p>
                              )}
                              {section.columns[0]?.bullet ? (
                                <ul className="list-disc pl-5 space-y-1">
                                  {section.columns[0].items.map((item) => (
                                    <li key={item}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="space-y-2">
                                  {section.columns[0]?.items.map((item) => (
                                    <p key={item}>{item}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-sm text-slate-300">
                              {section.columns?.[0]?.items.map((item) => (
                                <p key={item}>{item}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">
                            Profil von {scenario.studentName}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {scenario.studentProfile.map((item) => (
                              <div
                                key={item.title}
                                className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4"
                              >
                                <p className="text-white font-semibold">{item.title}</p>
                                <p className="text-sm text-slate-300 mt-2">
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Beobachtbare Signale
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {scenario.studentSignals.map((item) => (
                              <div
                                key={item.title}
                                className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4"
                              >
                                <p className="text-white font-semibold">{item.title}</p>
                                <p className="text-sm text-slate-300 mt-2">
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === "gespraech" && (
                  <div className="space-y-8">
                    {scenario.coachingFocus.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">
                          Fokus im Gespräch
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {scenario.coachingFocus.map((item) => (
                            <div
                              key={item.title}
                              className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4"
                            >
                              <p className="text-white font-semibold">{item.title}</p>
                              <p className="text-sm text-slate-300 mt-2">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {scenario.coachingPrompts.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Leitfragen für das Gespräch
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {scenario.coachingPrompts.map((prompt) => (
                            <span
                              key={prompt}
                              className="rounded-full border border-purple-700/50 bg-[#16122b] px-4 py-2 text-xs text-purple-100"
                            >
                              {prompt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {scenario.coachingDetails?.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <h4 className="text-lg font-semibold text-white">
                          {section.title}
                        </h4>
                        {section.columns && section.layout === "two-column" ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {section.columns.map((column) => (
                              <div
                                key={column.title}
                                className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-sm text-slate-300"
                              >
                                <p className="text-white font-semibold mb-2">
                                  {column.title}
                                </p>
                                {column.bullet ? (
                                  <ul className="list-disc pl-5 space-y-1">
                                    {column.items.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className="space-y-1">
                                    {column.items.map((item) => (
                                      <p key={item}>{item}</p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4 text-sm text-slate-300 space-y-2">
                            {section.body?.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "literatur" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">
                      Weiterführende Literatur
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {scenario.literature.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-purple-900/40 bg-[#141126] p-4"
                        >
                          <p className="text-white font-semibold">{item.title}</p>
                          <p className="text-sm text-slate-300 mt-2">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-purple-900/60 bg-[#0b071a] shadow-[0_0_45px_rgba(134,70,244,0.18)] flex flex-col">
              <div className="border-b border-purple-900/60 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">
                  Chat mit {scenario.studentName}
                </h2>
                <p className="text-sm text-slate-300 mt-1">{scenario.chatGoal}</p>
              </div>

              <div className="px-6 py-4 border-b border-purple-900/40">
                <p className="text-sm text-slate-400">
                  Hinweis: Beim Schliessen wird das Feedback nicht gespeichert,
                  kann aber jederzeit neu generiert werden. Sie können danach
                  direkt weiter chatten.
                </p>
              </div>

              <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
                {userMessageCount === 0 && messages.length === 0 && (
                  <div className="rounded-2xl border border-purple-900/40 bg-[#141126] p-6 text-center text-slate-300">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/20 text-purple-200">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h6" />
                        <path d="M16 3h5v5" />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Beginnen Sie das Gespräch mit dem Studenten
                    </p>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={`${message.sender}-${index}`}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white"
                          : message.kind === "feedback"
                          ? "bg-[#1b1733] text-slate-100 border border-emerald-500/40"
                          : "bg-[#151128] text-slate-200 border border-purple-800/60"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="mt-2 text-[11px] text-white/60">
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                {isSending && (
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
              </div>

              <div className="border-t border-purple-900/60 px-6 py-5 space-y-3">
                <div className="flex items-center gap-3 rounded-full border border-purple-800/60 bg-[#141126] px-4 py-2">
                  <input
                    type="text"
                    placeholder="Nachricht eingeben..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSend();
                      }
                    }}
                    disabled={isSending}
                  />
                  <button
                    className="rounded-full bg-purple-600 p-2 text-white disabled:opacity-60"
                    disabled={!inputValue.trim() || isSending}
                    aria-label="Nachricht senden"
                    onClick={handleSend}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 14l11 -11" />
                      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-purple-900/40 pt-3">
                  <button
                    className="rounded-lg border border-purple-700/50 bg-[#16122b] px-4 py-2 text-sm text-purple-100 disabled:opacity-50"
                    disabled={!canRequestFeedback || isSending}
                    onClick={handleFeedback}
                  >
                    Feedback einholen
                  </button>
                  <p className="text-xs text-slate-400">
                    {isSending
                      ? "Analysiere..."
                      : canRequestFeedback
                      ? "Feedback bereit."
                      : `Noch ${Math.max(0, 4 - (userMessageCount - feedbackCount))} Nachrichten nötig.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
