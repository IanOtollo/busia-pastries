import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrencyState {
  currency: "KES" | "UGX";
  rate: number; // KES to UGX
  lastUpdated: number;
  setCurrency: (currency: "KES" | "UGX") => void;
  fetchRate: () => Promise<void>;
  formatPrice: (priceKes: number) => string;
}

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "KES",
      rate: 30, // Default fallback
      lastUpdated: 0,

      setCurrency: (currency) => {
        set({ currency });
        get().fetchRate();
      },

      fetchRate: async () => {
        const { lastUpdated } = get();
        const oneHour = 60 * 60 * 1000;

        // Cache for 1 hour
        if (Date.now() - lastUpdated < oneHour) return;

        try {
          // Frankfurter API doesn't require a key
          const res = await fetch("https://api.frankfurter.app/latest?from=KES&to=UGX");
          const data = await res.json();
          if (data.rates?.UGX) {
            set({ rate: data.rates.UGX, lastUpdated: Date.now() });
          }
        } catch (error) {
          console.error("Failed to fetch currency rate:", error);
        }
      },

      formatPrice: (priceKes) => {
        const { currency, rate } = get();
        if (currency === "UGX") {
          const priceUgx = priceKes * rate;
          return new Intl.NumberFormat("en-UG", {
            style: "currency",
            currency: "UGX",
            maximumFractionDigits: 0,
          }).format(priceUgx);
        }

        return new Intl.NumberFormat("en-KE", {
          style: "currency",
          currency: "KES",
          maximumFractionDigits: 0,
        }).format(priceKes);
      },
    }),
    {
      name: "bp-currency-storage",
    }
  )
);
