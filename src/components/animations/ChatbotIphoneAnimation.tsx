"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { IconBatteryFilled, IconWifi2, IconSignalE, IconSignal5g } from "@tabler/icons-react"

// iPhone mockup component
const IPhoneMockup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex justify-center h-[620px] w-full py-4">
    <div className="h-[600px] w-[300px]">
      {/* iPhone frame */}
      <div className="absolute inset-0 rounded-[40px] bg-black shadow-xl">
        {/* iPhone inner frame */}
        <div className="relative h-full w-full overflow-hidden rounded-[36px] border-[14px] border-black bg-[#0b0a1e]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2 z-50 h-6 w-36 -translate-x-1/2 rounded-full bg-black shadow-lg"></div>

          {/* Status bar */}
          <div className="relative z-40 flex h-10 w-full items-center justify-between bg-black px-6 pt-1 text-white">
            <div className="text-xs font-medium">9:41</div>
            <div className="absolute right-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <IconSignal5g size={18} className="align-middle" />
                <IconWifi2 size={18} className="align-middle" />
                <IconBatteryFilled size={18} className="align-middle" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="h-full w-full overflow-hidden bg-[#0b0a1e]">{children}</div>

          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  </div>
)

// Finger animation component
const AnimatedFinger = ({ isActive, position }: { isActive: boolean; position: { x: number; y: number } }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: isActive ? 1 : 0,
      x: position.x,
      y: position.y,
      scale: isActive ? [1, 0.9, 1] : 1,
    }}
    transition={{ duration: 0.3 }}
    className="absolute z-[999] h-8 w-8 rounded-full border-2 border-white bg-white/40 shadow-lg"
  >
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1">
      <div className="rounded-md bg-white/90 px-2 py-1 text-xs text-black">Tap</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
        <path fill="black" d="M8 12L3 6h10L8 12z" />
      </svg>
    </div>
  </motion.div>
)

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-purple-800 bg-[#1c1c24] text-white shadow-md ${className}`}>
    {children}
  </div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-4 py-2 ${className}`}>{children}</div>
)

// Only keeping the registration conversation
const messagesMobile = [
  { sender: "user", text: "Wie kann ich mein Kind an dieser Schule anmelden?" },
  { sender: "bot", text: "1. Online-Formular ausfüllen\n2. Dokumente hochladen\n3. Bestätigung per E-Mail erhalten" },
  { sender: "user", text: "Wo finde ich das Formular?" },
  { sender: "bot", text: "Das Anmeldeformular kannst du direkt hier im Chat als PDF herunterladen." },
  { sender: "user", text: "Welche Dokumente muss ich hochladen?" },
  {
    sender: "bot",
    text: "Du brauchst die Geburtsurkunde, den Impfpass (Masernnachweis) und das letzte Zeugnis deines Kindes.",
  },
  { sender: "user", text: "Wie lange dauert die Bearbeitung?" },
  {
    sender: "bot",
    text: "Die Bearbeitung dauert in der Regel 3 bis 5 Werktage. Du bekommst eine Bestätigung per E-Mail.",
  },
  { sender: "user", text: "Kann ich die Anmeldung auch persönlich abgeben?" },
  {
    sender: "bot",
    text: "Ja, du kannst die Unterlagen auch im Sekretariat abgeben. Bitte vorher telefonisch einen Termin vereinbaren.",
  },
]

const ChatBubble = ({ sender, text }: { sender: string; text: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`p-3 m-2 rounded-xl max-w-[80%] text-sm shadow-lg whitespace-pre-line ${
      sender === "user"
        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white self-end"
        : "bg-[#1c1c24] text-gray-200 self-start border border-purple-700"
    }`}
  >
    {text.split("\n").map((line, i) => (
      <div key={i}>{line}</div>
    ))}
  </motion.div>
)

const ChatWindow = ({ messages, isTyping }: { messages: { sender: string; text: string }[]; isTyping?: boolean }) => (
  <div className="w-full h-full flex flex-col p-4 space-y-2 pb-20 bg-[#141414] text-white">
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm font-medium">KI-Schulbüro</div>
      <div className="text-xs text-gray-400">Online</div>
    </div>
    <div className="flex-1 flex flex-col space-y-2 overflow-y-auto scrollbar-none">
      {messages.map((msg, i) => (
        <ChatBubble key={i} sender={msg.sender} text={msg.text} />
      ))}
      {isTyping && (
        <div className="p-3 m-2 rounded-xl max-w-[80%] text-sm shadow-lg bg-[#1c1c24] text-gray-200 self-start border border-purple-700 animate-pulse">
          ...
        </div>
      )}
    </div>
    <div className="sticky bottom-0 z-40 w-[calc(100%-2rem)] mx-auto pt-2 pb-4 mb-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Nachricht schreiben..."
          className="w-full p-3 rounded-full bg-[#1c1c24] border border-purple-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          readOnly
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13"></path>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
)

// School website mockup
const SchoolWebsite = ({ onChatButtonClick }: { onChatButtonClick: () => void }) => (
  <div className="h-full w-full bg-[#141414] text-white text-xs p-4 overflow-hidden relative">
    {/* Browser window-style header with URL bar */}
    <div className="h-6 flex items-center justify-center mb-4">
      <div>
        <div className="bg-[#2c2c2c] text-gray-400 text-[10px] px-3 py-0.5 rounded w-[200px] truncate flex items-center gap-1 justify-center">
          <span>🔒</span>
          <span>https://gymnasium-alster.de</span>
        </div>
      </div>
    </div>
    <header className="mb-4">
      <h2 className="text-xl font-bold">Gymnasium Alster</h2>
      <p className="text-gray-400">Willkommen auf unserer Schulwebseite</p>
    </header>
    <nav className="flex gap-4 text-sm text-purple-300 mb-4 border-b border-purple-800 pb-2">
      <span>Start</span>
      <span>Termine</span>
      <span>Sport</span>
      <span>Downloads</span>
      <span>Kontakt</span>
    </nav>
    <section className="mb-4">
      <h3 className="text-white font-semibold mb-1">Herzlich Willkommen</h3>
      <ul className="list-disc ml-4 text-gray-300">
        <li>
          bei uns am Alstercampus, wie wir hier in Hamburg zu unserer Schule sagen. Das Gymnasium Alster hat Vieles für
          viele zu bieten. Ich lade Sie ganz herzlich ein, uns kennenzulernen. Surfen Sie auf unseren Seiten durch die bunte Welt einer Schule für Alle. Von der 5. Klasse bis zum Abitur lernen hier alle an einem Ort.
        </li>
      </ul>
    </section>
    <section className="mb-4">
      <h3 className="text-white font-semibold mb-1">Infos für neue Eltern</h3>
      <p className="text-gray-400">Alles zur Anmeldung, Termine, benötigte Unterlagen und Ansprechpersonen.</p>
    </section>
    <footer className="text-gray-500 text-[10px] mt-auto border-t border-purple-800 pt-2">
      © 2025 Gymnasium Alster · Impressum · Datenschutz
    </footer>

    {/* Chatbot button */}
    <motion.button
      onClick={onChatButtonClick}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      className="absolute bottom-16 right-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-[0_0_25px_8px_rgba(236,72,153,0.8)] z-20"
    >
      💬
    </motion.button>
  </div>
)

export default function ChatbotPreview() {
  const [displayedMessages, setDisplayedMessages] = useState<{ sender: string; text: string }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<"website" | "chat">("website")
  const [fingerPosition, setFingerPosition] = useState({ x: 0, y: 0 })
  const [showFinger, setShowFinger] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const messageIndexRef = useRef(0)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Reset and restart the animation
  const resetAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    setCurrentScreen("website")
    setDisplayedMessages([])
    messageIndexRef.current = 0
    setAnimationStep(0)
    setShowFinger(false)

    // Start the animation sequence again after a delay
    animationTimeoutRef.current = setTimeout(() => {
      startAnimation()
    }, 1000)
  }

  // Handle chat button click
  const handleChatButtonClick = () => {
    setFingerPosition({ x: 265, y: 430 })
    setShowFinger(false)

    setTimeout(() => {
      setCurrentScreen("chat")
      setAnimationStep(1)
    }, 300)
  }

  // Start the animation sequence
  const startAnimation = () => {
    // Show finger over chat button
    setFingerPosition({ x: 265, y: 430 })
    setShowFinger(true)

    // Click chat button after delay
    animationTimeoutRef.current = setTimeout(() => {
      handleChatButtonClick()
    }, 1500)
  }

  // Handle the chat conversation animation
  useEffect(() => {
    if (currentScreen !== "chat" || animationStep !== 1) return

    let messageInterval: NodeJS.Timeout

    // Start showing messages
    messageInterval = setInterval(() => {
      const currentMessage = messagesMobile[messageIndexRef.current]

      if (!currentMessage) {
        clearInterval(messageInterval)

        // Reset animation after all messages are shown
        animationTimeoutRef.current = setTimeout(() => {
          resetAnimation()
        }, 4000)
        return
      }

      if (currentMessage.sender === "user") {
        // For user messages, show typing finger first
        const inputPosition = { x: 150, y: 520 }
        setFingerPosition(inputPosition)
        setShowFinger(true)

        animationTimeoutRef.current = setTimeout(() => {
          setShowFinger(false)
          setDisplayedMessages((prev) => [...prev, currentMessage])
          messageIndexRef.current++
        }, 1000)
      } else {
        // For bot messages, show typing indicator
        setIsTyping(true)
        setShowFinger(false)

        animationTimeoutRef.current = setTimeout(() => {
          setIsTyping(false)
          setDisplayedMessages((prev) => [...prev, currentMessage])
          messageIndexRef.current++
        }, 1500)
      }
    }, 3000)

    return () => {
      clearInterval(messageInterval)
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [currentScreen, animationStep])

  // Start the animation on component mount
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      startAnimation()
    }, 2000)

    return () => {
      clearTimeout(initialDelay)
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-start bg-[#030014] px-6">
      <div className="relative">
        <IPhoneMockup>
          {currentScreen === "website" ? (
            <SchoolWebsite onChatButtonClick={handleChatButtonClick} />
          ) : (
            <ChatWindow messages={displayedMessages} isTyping={isTyping} />
          )}
        </IPhoneMockup>
      </div>
    </div>
  )
}
