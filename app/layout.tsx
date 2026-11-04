import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Special_Elite,
  Dancing_Script,
  Inter,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Kelsi 🌹",
  description: "A birthday scrapbook made just for you, Kelsi ♥",
  openGraph: {
    title: "Happy Birthday Kelsi 🌹",
    description: "Something special made just for you ♥",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${specialElite.variable} ${dancingScript.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
