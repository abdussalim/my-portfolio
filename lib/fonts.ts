import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
  display: "swap",
});

export const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const fontVariables = `${bricolage.variable} ${geist.variable} ${geistMono.variable}`;
