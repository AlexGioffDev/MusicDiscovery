import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlayerProvide } from "./context/PlayerContext";
import PlayerBar from "./components/PlayerBar";
import Link from "next/link";
import SearchForm from "./components/SearchForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Discovery",
  description: "Find the best tracks on Last.FM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-dvw h-dvh bg-stone-400`}
      >
        <PlayerProvide>
          <header className="w-full px-4 py-5 flex justify-between items-center">
            <Link href="/" className="cursor-pointer">
              <h1 className="font-black text-green-500 tracking-tighter uppercase text-xl md:text-3xl">
                MusicDiscovery
              </h1>
            </Link>
            <SearchForm />
          </header>
          {children}

          <PlayerBar />
          <footer className="w-full p-4 md:p-6 fixed bottom-0 left-0 bg-black/80 backdrop-blur text-stone-300 border-t border-stone-700 flex items-center justify-between z-50">
            <h1 className="text-sm md:text-base font-semibold">
              AlexGioffre© {new Date().getFullYear()}
            </h1>
            <p className="text-xs md:text-sm">Powered by Spotify API</p>
          </footer>
        </PlayerProvide>
      </body>
    </html>
  );
}
