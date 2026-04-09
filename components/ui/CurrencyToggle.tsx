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
    <div className="inline-flex items-center rounded-full bg-[var(--color-surface)] p-1 border border-[var(--color-border)] shadow-sm opacity-50">
      <div className="px-3 py-1 text-xs font-mono font-medium">...</div>
    </div>
  );

  return (
    <div className="inline-flex items-center rounded-full bg-[var(--color-surface)] p-1 border border-[var(--color-border)] shadow-sm">
      <button
        onClick={() => setCurrency("KES")}
        className={cn(
          "px-3 py-1 text-xs font-mono font-medium rounded-full transition-all",
          currency === "KES"
            ? "bg-[var(--color-cta)] text-[var(--color-cta-text)] shadow-sm"
            : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
        )}
      >
        KES
      </button>
      <button
        onClick={() => setCurrency("UGX")}
        className={cn(
          "px-3 py-1 text-xs font-mono font-medium rounded-full transition-all",
          currency === "UGX"
            ? "bg-[var(--color-cta)] text-[var(--color-cta-text)] shadow-sm"
            : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
        )}
      >
        UGX
      </button>
    </div>
  );
}
