"use client";

import { createContext, useContext, useState } from "react";

type PlayerContextType = {
  trackId: string | null;
  openPlayer: (id: string) => void;
  closePlayer: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvide({ children }: { children: React.ReactNode }) {
  const [trackId, setTrackId] = useState<string | null>(null);

  const openPlayer = (id: string) => setTrackId(id);
  const closePlayer = () => setTrackId(null);

  return (
    <PlayerContext.Provider value={{ trackId, openPlayer, closePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("Use Player must be euset within a PlayerProvicer!");
  }

  return context;
};
