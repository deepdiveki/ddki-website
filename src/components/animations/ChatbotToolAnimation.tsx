"use client";

import Image from "next/image";

export default function CompactChatbotAnimation() {
  return (
    <div className="ddki-logo-container group relative flex items-center justify-center">
      {/* Glow ring */}
      <div className="absolute h-28 w-28 rounded-full border border-primary-darker/20 transition-all duration-500 group-hover:scale-110 group-hover:border-primary-darker/40" />
      <div className="absolute h-36 w-36 rounded-full border border-primary-darker/10 transition-all duration-700 group-hover:scale-110 group-hover:border-primary-darker/20" />

      {/* Subtle glow behind */}
      <div
        className="absolute h-24 w-24 rounded-full transition-all duration-500 group-hover:scale-125"
        style={{
          background:
            "radial-gradient(circle, rgba(140,113,246,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="relative h-20 w-20 transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
        <Image
          src="/images/ddki-logo.svg"
          alt="DeepDiveKI Logo"
          fill
          className="object-contain drop-shadow-lg brightness-0 invert"
        />
      </div>
    </div>
  );
}
