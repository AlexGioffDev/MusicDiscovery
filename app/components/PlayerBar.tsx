"use client";

import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function PlayerBar() {
  const { trackId, closePlayer } = usePlayer();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePlayer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePlayer]);
  if (!trackId) return null;

  return (
    <div className="fixed bottom-10 right-10 transform  z-50">
      <div className="relative w-[500px] bg-zinc-900 border border-zinc-800 rounded shadow-lg p-2">
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="450px"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
          loading="lazy"
          className="rounded"
        />
        <button
          onClick={closePlayer}
          className="absolute top-1 right-2 text-white hover:text-red-400"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
