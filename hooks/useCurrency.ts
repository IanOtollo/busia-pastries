"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Currency } from "@/types/product";

interface CurrencyState {
  currency: Currency;
  rate: number; // KES to UGX rate
  isFetching: boolean;
  lastFetched: number | null;
  setCurrency: (c: Currency) => void;
  fetchRate: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "KES",
      rate: 28, // sensible default KES→UGX until fetched
      isFetching: false,
      lastFetched: null,

      setCurrency: (currency) => {
        set({ currency });
        // Fetch fresh rate when switching to UGX if >1 hr stale
        if (currency === "UGX") {
          const { lastFetched, fetchRate } = get();
          const ONE_HOUR = 60 * 60 * 1000;
          if (!lastFetched || Date.now() - lastFetched > ONE_HOUR) {
            fetchRate();
          }
        }
      },

      fetchRate: async () => {
        if (get().isFetching) return;
        set({ isFetching: true });
        try {
          const res = await fetch("/api/currency");
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              set({ rate: data.data.rate, lastFetched: Date.now() });
            }
          }
        } catch {
          // silently fail — keep existing rate
        } finally {
          set({ isFetching: false });
        }
      },
    }),
    {
      name: "busia-currency",
      partialize: (s) => ({ currency: s.currency, rate: s.rate, lastFetched: s.lastFetched }),
    }
  )
);

export function useCurrency() {
  const currency = useCurrencyStore((s) => s.currency);
  const rate = useCurrencyStore((s) => s.rate);
  const isFetching = useCurrencyStore((s) => s.isFetching);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);
  const fetchRate = useCurrencyStore((s) => s.fetchRate);
  return { currency, rate, isFetching, setCurrency, fetchRate };
}
