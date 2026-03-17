"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconMessage, IconSend, IconRobot, IconSettings, IconRotateClockwise, IconDownload, IconUpload } from '@tabler/icons-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'file' | 'link';
  metadata?: {
    fileName?: string;
    fileSize?: string;
    url?: string;
  };
}

interface ChatbotConfig {
  name: string;
  welcomeMessage: string;
  primaryColor: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  language: 'de' | 'en' | 'fr' | 'es';
  autoOpen: boolean;
  showTypingIndicator: boolean;
  maxMessages: number;
}

interface AdvancedChatbotWidgetProps {
  config?: Partial<ChatbotConfig>;
  onMessageSend?: (message: Message) => void;
  onChatOpen?: () => void;
  onChatClose?: () => void;
  customResponses?: Record<string, string>;
  apiEndpoint?: string;
  apiKey?: string;
}

export default function AdvancedChatbotWidget({
  config = {},
  onMessageSend,
  onChatOpen,
  onChatClose,
  customResponses = {},
  apiEndpoint,
  apiKey
}: AdvancedChatbotWidgetProps) {
  const defaultConfig: ChatbotConfig = {
    name: "KI-Schulbüro",
    welcomeMessage: "Hallo! Ich bin Ihr KI-Schulbüro. Wie kann ich Ihnen helfen?",
    primaryColor: "#6C63FF",
    position: "bottom-right",
    language: "de",
    autoOpen: false,
    showTypingIndicator: true,
    maxMessages: 100,
    ...config
  };

  const [isOpen, setIsOpen] = useState(defaultConfig.autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: defaultConfig.welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current && !isMinimized) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Auto-open chat if configured
  useEffect(() => {
    if (defaultConfig.autoOpen) {
      setTimeout(() => setIsOpen(true), 2000);
    }
  }, [defaultConfig.autoOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Call callback if provided
    onMessageSend?.(userMessage);

    try {
      let botResponse: string;
      
      if (apiEndpoint && apiKey) {
        // Use AI API if configured
        botResponse = await callAIAPI(inputValue, apiEndpoint, apiKey);
      } else {
        // Use local response generation
        botResponse = generateLocalResponse(inputValue);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Anfrage. Bitte versuchen Sie es später erneut.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }

    // Limit message history
    if (messages.length >= defaultConfig.maxMessages) {
      setMessages(prev => prev.slice(-defaultConfig.maxMessages + 1));
    }
  };

  const callAIAPI = async (userInput: string, endpoint: string, key: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          message: userInput,
          language: defaultConfig.language,
          context: 'school_office'
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.response || "Entschuldigung, ich konnte keine Antwort generieren.";
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check custom responses first
    for (const [key, response] of Object.entries(customResponses)) {
      if (input.includes(key.toLowerCase())) {
        return response;
      }
    }
    
    // Default responses
    if (input.includes('öffnungszeiten') || input.includes('öffnungszeiten')) {
      return "Unser Sekretariat ist von Montag bis Freitag von 7:30 bis 15:30 Uhr geöffnet.";
    } else if (input.includes('anmeldung') || input.includes('anmelden')) {
      return "Für die Anmeldung benötigen wir folgende Unterlagen: Geburtsurkunde, Impfpass, letztes Zeugnis und ein Passfoto. Termine können Sie telefonisch oder per E-Mail vereinbaren.";
    } else if (input.includes('mensa') || input.includes('essen')) {
      return "Die Mensa ist von 11:30 bis 14:00 Uhr geöffnet. Das Essen kostet 3,50€ pro Tag. Vegetarische Optionen sind verfügbar.";
    } else if (input.includes('termin') || input.includes('veranstaltung')) {
      return "Der nächste Elternabend findet am 15. Mai um 19:00 Uhr statt. Weitere Termine finden Sie in unserem Schulkalender.";
    } else if (input.includes('krankmeldung') || input.includes('krank')) {
      return "Krankmeldungen können Sie telefonisch bis 8:00 Uhr oder per E-Mail an krankmeldung@schule.de senden.";
    } else if (input.includes('vertretungsplan') || input.includes('vertretung')) {
      return "Der aktuelle Vertretungsplan wird täglich aktualisiert und ist im Schulgebäude und auf unserer Website einsehbar.";
    } else if (input.includes('sprechstunde') || input.includes('lehrer')) {
      return "Sprechstunden der Lehrkräfte finden Sie auf unserer Website unter 'Kontakt' > 'Sprechstunden'. Termine können Sie über das Sekretariat vereinbaren.";
    } else if (input.includes('bus') || input.includes('verkehr')) {
      return "Unsere Schule ist gut mit öffentlichen Verkehrsmitteln erreichbar. Buslinien 101, 102 und 103 halten direkt vor der Schule.";
    } else {
      return "Danke für Ihre Nachricht. Ich leite Ihre Anfrage gerne an das zuständige Sekretariat weiter. Haben Sie noch weitere Fragen?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `Datei hochgeladen: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file',
        metadata: {
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`
        }
      };
      setMessages(prev => [...prev, fileMessage]);
      onMessageSend?.(fileMessage);
    }
  };

  const exportChatHistory = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages,
      config: defaultConfig
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setChatHistory(messages);
    setMessages([{
      id: Date.now().toString(),
      text: defaultConfig.welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const getPositionClasses = () => {
    switch (defaultConfig.position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const handleChatToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    setIsMinimized(false);
    
    if (newState) {
      onChatOpen?.();
    } else {
      onChatClose?.();
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed ${getPositionClasses()} z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col`}
            style={{ 
              width: isMinimized ? '300px' : '400px',
              height: isMinimized ? '60px' : '500px',
              maxHeight: 'calc(100vh - 2rem)',
              backgroundColor: defaultConfig.primaryColor
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 rounded-t-2xl text-white"
              style={{ backgroundColor: defaultConfig.primaryColor }}
            >
              <div className="flex items-center gap-2">
                <IconRobot size={20} />
                <span className="font-semibold">{defaultConfig.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title="Einstellungen"
                >
                  <IconSettings size={16} />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title={isMinimized ? "Maximieren" : "Minimieren"}
                >
                  <IconX size={16} />
                </button>
                <button
                  onClick={handleChatToggle}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title="Schließen"
                >
                  <IconX size={18} />
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && !isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50 border-b border-gray-200 overflow-hidden"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Chat löschen</span>
                      <button
                        onClick={clearChat}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Löschen
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Chat exportieren</span>
                      <button
                        onClick={exportChatHistory}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Exportieren
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sprache</span>
                      <select 
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                        value={defaultConfig.language}
                        onChange={(e) => {
                          // Update language logic here
                        }}
                      >
                        <option value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-white'
                      }`}
                    >
                      {message.type === 'file' ? (
                        <div>
                          <p className="text-sm font-medium">{message.metadata?.fileName}</p>
                          <p className="text-xs opacity-70">{message.metadata?.fileSize}</p>
                        </div>
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('de-DE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && defaultConfig.showTypingIndicator && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 text-white p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input */}
            {!isMinimized && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ihre Nachricht..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                    title="Datei hochladen"
                  >
                    <IconUpload size={16} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2 rounded-full transition-colors disabled:opacity-50"
                    style={{ backgroundColor: defaultConfig.primaryColor, color: 'white' }}
                  >
                    <IconSend size={16} />
                  </button>
                </div>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={handleChatToggle}
        className={`fixed ${getPositionClasses()} z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white cursor-pointer transition-all duration-300 hover:scale-110`}
        style={{ backgroundColor: defaultConfig.primaryColor }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <IconX size={24} /> : <IconMessage size={24} />}
      </motion.button>
    </>
  );
}
