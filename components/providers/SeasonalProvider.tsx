"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Season = "valentine" | "easter" | "halloween" | "christmas" | "newyear" | "default";

interface SeasonalContextType {
  season: Season;
}

const SeasonalContext = createContext<SeasonalContextType>({ season: "default" });

export const useSeason = () => useContext(SeasonalContext);

export function SeasonalProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<Season>("default");

  useEffect(() => {
    const checkSeason = () => {
      const now = new Date();
      const month = now.getMonth(); // 0-indexed
      const date = now.getDate();

      let currentSeason: Season = "default";

      // Valentine's: Feb 1-14
      if (month === 1 && date >= 1 && date <= 14) {
        currentSeason = "valentine";
      }
      // Halloween: Oct 1-31
      else if (month === 9) {
        currentSeason = "halloween";
      }
      // Christmas: Dec 1-25
      else if (month === 11 && date >= 1 && date <= 25) {
        currentSeason = "christmas";
      }
      // New Year: Dec 26 - Jan 1
      else if ((month === 11 && date >= 26) || (month === 0 && date === 1)) {
        currentSeason = "newyear";
      }
      // Easter (Approximate for Phase 1 - mid March to mid April logic can be added)
      // For now, these are the primary fixed-date ones.

      setSeason(currentSeason);
      document.documentElement.setAttribute("data-season", currentSeason);
    };

    checkSeason();
  }, []);

  return (
    <SeasonalContext.Provider value={{ season }}>
      {children}
    </SeasonalContext.Provider>
  );
}
