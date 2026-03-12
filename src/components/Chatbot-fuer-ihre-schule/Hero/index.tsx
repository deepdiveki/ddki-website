"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconClock, IconMapPin, IconSchool, IconSend } from "@tabler/icons-react";

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
};

type ApiMessage = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_QUESTIONS = [
  "Wie sind die Öffnungszeiten vom Sekretariat?",
  "Wie funktioniert die Anmeldung für Klasse 5?",
  "Wann ist die nächste Projektwoche?",
  "Gibt es vegetarische Mensa-Optionen?",
  "Wie erreiche ich die Schule mit dem Bus?",
  "Wo finde ich den Vertretungsplan?",
];

const SCHOOL_FACTS = [
  {
    icon: IconSchool,
    title: "Nordlicht-Gymnasium",
    detail: "Ganztagsschule mit Fokus auf MINT und Sprachen.",
  },
  {
    icon: IconMapPin,
    title: "Sonnenweg 12, Hamburg",
    detail: "Haltestelle: Campus Nord (Linien 8, 14, 27).",
  },
  {
    icon: IconClock,
    title: "Sekretariat",
    detail: "Mo-Fr 07:30-15:00 Uhr, telefonisch ab 07:00 Uhr.",
  },
];

const normalizeInput = (value: string) =>
  value
    .toLowerCase()
    .replace(/\u00e4/g, "ae")
    .replace(/\u00f6/g, "oe")
    .replace(/\u00fc/g, "ue")
    .replace(/\u00df/g, "ss");

const getResponse = (input: string) => {
  const normalized = normalizeInput(input);

  if (normalized.includes("oeffnungs") || normalized.includes("sekretariat")) {
    return "Das Sekretariat ist montags bis freitags von 07:30 bis 15:00 Uhr geöffnet. Telefonisch sind wir ab 07:00 Uhr erreichbar.";
  }
  if (normalized.includes("anmeldung") || normalized.includes("anmelden")) {
    return "Die Anmeldung für Klasse 5 ist vom 15.02 bis 15.03 möglich. Benötigte Unterlagen: Geburtsurkunde, letztes Zeugnis und Masernnachweis. Termine können online gebucht werden.";
  }
  if (normalized.includes("projektwoche") || normalized.includes("projekt")) {
    return "Die nächste Projektwoche findet vom 03.06 bis 07.06 statt. Das Motto lautet \"Stadt der Zukunft\".";
  }
  if (normalized.includes("mensa") || normalized.includes("essen")) {
    return "Die Mensa ist von 11:30 bis 14:00 Uhr geöffnet. Essen kostet 3,50 EUR. Vegetarische und vegane Optionen sind täglich verfügbar.";
  }
  if (normalized.includes("bus") || normalized.includes("anreise") || normalized.includes("verkehr")) {
    return "Sie erreichen uns mit den Buslinien 8, 14 und 27. Haltestelle: Campus Nord (2 Minuten Fußweg).";
  }
  if (normalized.includes("vertretungsplan") || normalized.includes("vertretung")) {
    return "Der Vertretungsplan wird täglich um 07:15 aktualisiert und ist im Schulportal sowie auf den Displays im Foyer einsehbar.";
  }
  if (normalized.includes("kontakt") || normalized.includes("telefon") || normalized.includes("email")) {
    return "Kontakt: sekretariat@nordlicht-gymnasium.de oder 040 555 123 0.";
  }
  if (normalized.includes("sport") || normalized.includes("ag")) {
    return "Wir bieten AGs wie Basketball, Theater, Robotik und Chor an. Die Anmeldung erfolgt über das Schulportal bis zum 10.09.";
  }

  return "Danke für Ihre Frage! Ich helfe gern weiter. Fragen Sie z.B. nach Anmeldung, Mensa, Terminen oder Anreise.";
};

const HeroChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hallo! Ich bin der KI-Chatbot des Nordlicht-Gymnasiums. Was möchten Sie über unsere Schule wissen?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const quickQuestions = useMemo(() => QUICK_QUESTIONS, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (value?: string) => {
    const text = (value ?? inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    let reply = "";

    try {
      const history: ApiMessage[] = [...messages, userMessage].map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      }));

      const response = await fetch("/api/playground-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, messages: history }),
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
      reply = getResponse(text);
    }

    const botMessage: ChatMessage = {
      id: `${Date.now()}-bot`,
      sender: "bot",
      text: reply,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="relative pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="sw-card-glow rounded-3xl border border-border-tertiary bg-white/65 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-text-primary">Schulprofil</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Das Nordlicht-Gymnasium ist eine moderne Ganztagsschule mit
                digitalem Campus, persönlicher Beratung und klaren Prozessen.
              </p>
              <div className="mt-6 space-y-4">
                {SCHOOL_FACTS.map((fact) => (
                  <div
                    key={fact.title}
                    className="flex items-start gap-3 rounded-2xl border border-border-tertiary bg-background-secondary p-4"
                  >
                    <fact.icon className="mt-0.5 text-primary-dark" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {fact.title}
                      </p>
                      <p className="text-xs text-text-tertiary">{fact.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sw-card-glow rounded-3xl border border-border-tertiary bg-white/65 p-6 shadow-sm backdrop-blur-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-dark">
                Schnellfragen
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="rounded-full border border-border-tertiary bg-background-secondary px-4 py-2 text-xs text-text-secondary transition hover:border-primary-base hover:text-text-primary"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sw-glass-card rounded-[32px] shadow-md">
            <div className="flex items-center justify-between border-b border-border-tertiary px-6 py-4">
              <div>
                <p className="text-sm text-primary-dark">Nordlicht-Gymnasium</p>
                <h2 className="text-lg font-semibold text-text-primary">KI-Schulbüro</h2>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                Online
              </div>
            </div>

            <div
              ref={messagesContainerRef}
              className="h-[420px] space-y-4 overflow-y-auto px-6 py-6"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      message.sender === "user"
                        ? "bg-primary-darker text-white"
                        : "border border-border-tertiary bg-background-secondary text-text-primary"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="mt-2 text-[11px] opacity-60">
                      {message.timestamp.toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-border-tertiary bg-background-secondary px-4 py-3 text-sm text-text-secondary">
                    <span className="inline-flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary-base" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary-base [animation-delay:120ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary-base [animation-delay:240ms]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            <div className="border-t border-border-tertiary px-6 py-4">
              <div className="flex items-center gap-3 rounded-full border border-border-tertiary bg-background-secondary px-4 py-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Fragen Sie z.B. nach Anmeldung, Mensa oder Terminen..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  className="rounded-full bg-primary-darker p-2 text-white transition hover:bg-primary-dark"
                  aria-label="Nachricht senden"
                >
                  <IconSend size={18} />
                </button>
              </div>
              <p className="mt-3 text-xs text-text-tertiary">
                Beispiel: "Wann ist der Elternabend?" oder "Welche Unterlagen brauche ich?"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroChatbot;
