import { useState, useEffect } from "react";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/lib/utils/cn";

export function CurrencyToggle() {
  const [mounted, setMounted] = useState(false);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="inline-flex items-center rounded-full bg-cp-surface p-1 border border-cp-border shadow-sm opacity-50">
      <div className="px-3 py-1 text-[10px] font-mono font-bold">...</div>
    </div>
  );

  return (
    <div className="inline-flex items-center rounded-full bg-cp-surface p-1 border border-cp-border shadow-inner">
      <button
        onClick={() => setCurrency("KES")}
        className={cn(
          "px-4 py-1 text-[10px] font-mono font-bold rounded-full transition-all duration-300",
          currency === "KES"
            ? "bg-cp-cta text-cp-cta-text shadow-lg shadow-cp-cta/20"
            : "text-cp-text-muted hover:text-cp-text"
        )}
      >
        KES
      </button>
      <button
        onClick={() => setCurrency("UGX")}
        className={cn(
          "px-4 py-1 text-[10px] font-mono font-bold rounded-full transition-all duration-300",
          currency === "UGX"
            ? "bg-cp-cta text-cp-cta-text shadow-lg shadow-cp-cta/20"
            : "text-cp-text-muted hover:text-cp-text"
        )}
      >
        UGX
      </button>
    </div>
  );
}
