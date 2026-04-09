"use client";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";

/**
 * Client component that applies seasonal CSS variable overrides to :root.
 * Renders nothing visible — purely a side-effect component.
 */
export function SeasonalTheme() {
  useSeasonalTheme(); // applies vars on mount + rechecks at midnight
  return null;
}
