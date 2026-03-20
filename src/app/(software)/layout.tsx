import "./software-theme.css";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.variable}>
      <Header />
      <AnnouncementBar />

      <main
        id="main-content"
        className="animate-in fade-in relative min-h-screen font-inter duration-700"
        style={{
          background:
            "linear-gradient(180deg, #030014 0%, #0a0525 25%, #060320 50%, #030014 100%)",
        }}
      >
        {/* Subtle dot-grid pattern overlay for "techy" feel */}
        <div
          className="pointer-events-none absolute inset-0 z-0 sw-grid-pattern"
          aria-hidden="true"
        />
        {/* Decorative floating purple orbs */}
        <div
          className="sw-float-slow sw-pulse-glow pointer-events-none absolute -left-32 top-[20%] z-0 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(140,113,246,0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="sw-float-medium sw-pulse-glow pointer-events-none absolute -right-24 top-[55%] z-0 h-72 w-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,71,208,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="sw-float-slow pointer-events-none absolute left-1/4 top-[80%] z-0 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(198,189,250,0.1) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
          aria-hidden="true"
        />

        {/* Page content */}
        <div className="relative z-10">{children}</div>
      </main>

      <Footer variant="software" />
    </div>
  );
}
