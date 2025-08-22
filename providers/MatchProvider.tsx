"use client";

import { createContext, useContext, useState } from "react";
import { StartMatchPayload } from "@/types/room";

const MatchContext = createContext<{
  match: StartMatchPayload | null;
  setMatch: (m: StartMatchPayload | null) => void;
}>({
  match: null,
  setMatch: () => {},
});

export const MatchProvider = ({ children }: { children: React.ReactNode }) => {
  const [match, setMatch] = useState<StartMatchPayload | null>(null);
  return (
    <MatchContext.Provider value={{ match, setMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => useContext(MatchContext);
