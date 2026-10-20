import "../(chooser)/chooser-theme.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const stackSans = localFont({
  src: [
    {
      path: "../../../public/fonts/stack-sans-text/stack-sans-text-latin-wght-normal.woff2",
      weight: "200 700",
    },
  ],
  variable: "--font-stack-sans-text",
});

// Vortragsfolien sind kein Suchinhalt.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PraesentationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-background-secondary antialiased",
        stackSans.className,
        inter.variable,
      )}
    >
      {children}
    </div>
  );
}
