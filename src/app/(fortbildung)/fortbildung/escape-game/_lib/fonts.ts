import { Bungee, Press_Start_2P, Space_Mono } from "next/font/google";

export const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

export const displayFont = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const bodyFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});
