// ── Seasonal Theme Engine ──────────────────────────────────────────────────
// Determines the current season based on the current date and returns the
// corresponding CSS variable overrides and hero headline.
// Uses the Meeus/Jones/Butcher Computus algorithm for Easter date calculation.

export type Season =
  | "valentine"
  | "easter"
  | "halloween"
  | "christmas"
  | "newyear"
  | "default";

export interface SeasonTheme {
  season: Season;
  heroHeadline: string;
  heroSubheadline: string;
  cssVars: Record<string, string>;
}

/** Meeus/Jones/Butcher algorithm — returns Easter Sunday for the given year */
function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 1-indexed
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export function getSeasonTheme(now: Date = new Date()): SeasonTheme {
  const month = now.getMonth() + 1; // 1-indexed
  const day = now.getDate();
  const year = now.getFullYear();

  // Valentine's Day: Feb 1 – Feb 14
  if (month === 2 && day >= 1 && day <= 14) {
    return {
      season: "valentine",
      heroHeadline: "Made with Love.",
      heroSubheadline: "Order for Someone Special.",
      cssVars: {
        "--color-bg": "#FFF5F7",
        "--color-accent": "#C0395A",
        "--color-accent-hover": "#A02E4A",
        "--color-cta": "#8B1A35",
        "--color-cta-text": "#FAF7F2",
      },
    };
  }

  // Easter: 2 weeks before Easter Sunday to Easter Sunday
  const easter = getEasterDate(year);
  const twoWeeksBefore = new Date(easter);
  twoWeeksBefore.setDate(easter.getDate() - 14);
  if (now >= twoWeeksBefore && now <= easter) {
    return {
      season: "easter",
      heroHeadline: "Fresh Bakes for the Season.",
      heroSubheadline: "Celebrating the joy of Easter with every bite.",
      cssVars: {
        "--color-bg": "#F7FBF2",
        "--color-accent": "#5A8A3C",
        "--color-accent-hover": "#4A7230",
        "--color-cta": "#2D5016",
        "--color-cta-text": "#FAF7F2",
      },
    };
  }

  // Halloween: Oct 1 – Oct 31
  if (month === 10) {
    return {
      season: "halloween",
      heroHeadline: "Wickedly Good Pastries.",
      heroSubheadline: "Frighteningly fresh. Delightfully indulgent.",
      cssVars: {
        "--color-bg": "#FDF4EC",
        "--color-accent": "#C45E0A",
        "--color-accent-hover": "#A34E08",
        "--color-cta": "#6B2D00",
        "--color-cta-text": "#FAF7F2",
      },
    };
  }

  // Christmas: Dec 1 – Dec 25
  if (month === 12 && day >= 1 && day <= 25) {
    return {
      season: "christmas",
      heroHeadline: "The Sweetest Gift This Christmas.",
      heroSubheadline: "Share the warmth. Baked fresh from our kitchen to yours.",
      cssVars: {
        "--color-bg": "#F7FAF7",
        "--color-accent": "#B22222",
        "--color-accent-hover": "#921C1C",
        "--color-cta": "#1A4A1A",
        "--color-cta-text": "#FAF7F2",
      },
    };
  }

  // New Year's Eve: Dec 26 – Jan 1
  if ((month === 12 && day >= 26) || (month === 1 && day === 1)) {
    return {
      season: "newyear",
      heroHeadline: "End the Year on a Sweet Note.",
      heroSubheadline: "Ringing in the new year with flavours worth celebrating.",
      cssVars: {
        "--color-bg": "#F5F5FA",
        "--color-accent": "#4A4A8A",
        "--color-accent-hover": "#3A3A72",
        "--color-cta": "#1A1A4A",
        "--color-cta-text": "#FAF7F2",
      },
    };
  }

  // Default
  return {
    season: "default",
    heroHeadline: "Every Bite, a Celebration.",
    heroSubheadline:
      "Freshly baked pastries, cakes, and more — made in Busia, delivered to your door.",
    cssVars: {},
  };
}
