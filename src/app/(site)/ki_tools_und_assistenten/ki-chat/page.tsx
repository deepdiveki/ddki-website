"use client";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";
import { useState } from "react";
const DDKIKiChat = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage) {
      alert("Please enter a message.");
      return;
    }
    // Add the user's message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: inputMessage }]);
    setGeneratedContent("Generating response...");
    const prompt = [
      {
        role: "system",
        content: "You are an AI chatbot. Respond to the user's message.",
      },
      {
        role: "user",
        content: inputMessage,
      },
    ];
    const apiKey = localStorage.getItem("apiKey");
    try {
      const response = await axios.post(
        "/api/generate-content",
        { prompt, apiKey },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const botMessage = response.data || "No response generated.";
      setGeneratedContent(botMessage);
      // Add the AI's response to the chat
      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (error: any) {
      setGeneratedContent("Please Add the API Key!");
      console.error("Error:", error?.message);
    }
    setInputMessage("");
  };
  return (
    <>
      <title>DDKI KI-Chat</title>
      <meta name="description" content="This is AI Examples page for AI Tool" />
      <Breadcrumb pageTitle="KI-Chat" />
      <section className="pb-17.5 lg:pb-22.5 xl:pb-27.5">
        <div className="mx-auto max-w-[800px] px-4 sm:px-8">
          {/* Chat Messages */}
          <div className="rounded-lg bg-transparent p-8 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-white"
                  } max-w-[70%]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          {/* Chat Input Field */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-800 rounded-lg p-2 mt-4 shadow-md"
          >
            {/* Input Field */}
            <input
              type="text"
              value={inputMessage}
              onChange={handleChange}
              placeholder="Sende eine Nachricht an den DDKI KI-Chat"
              className="flex-1 bg-transparent text-white px-3 py-2 outline-none placeholder-gray-500"
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center bg-gray-700 text-white w-10 h-10 rounded-full hover:bg-gray-600"
            >
              ▲
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
export default DDKIKiChat;