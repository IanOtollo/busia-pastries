"use client";
import { useState, useEffect } from "react";
import { getSeasonTheme, SeasonTheme } from "@/lib/season/theme";

export function useSeasonalTheme(): SeasonTheme {
  const [theme, setTheme] = useState<SeasonTheme>(() => getSeasonTheme());

  useEffect(() => {
    // Apply CSS vars to :root immediately on mount
    const apply = (t: SeasonTheme) => {
      const root = document.documentElement;
      Object.entries(t.cssVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    };

    const current = getSeasonTheme();
    setTheme(current);
    apply(current);

    // Re-check at midnight each day
    const msUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight.getTime() - now.getTime();
    };

    const timeout = setTimeout(() => {
      const next = getSeasonTheme();
      setTheme(next);
      apply(next);
    }, msUntilMidnight());

    return () => clearTimeout(timeout);
  }, []);

  return theme;
}
