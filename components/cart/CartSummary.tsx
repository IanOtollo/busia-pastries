"use client";
import React from "react";
import { ArrowRight, Truck, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice, calculateDeliveryFee } from "@/lib/utils/currency";

export function CartSummary() {
  const { subtotalKes } = useCart();
  const { currency, rate } = useCurrency();

  // Delivery fee is KES 200 unless order is > 3000
  const deliveryFeeKes = calculateDeliveryFee("DELIVERY", subtotalKes);
  const totalKes = subtotalKes + deliveryFeeKes;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 space-y-6 sticky top-32">
      <h3 className="font-display text-2xl font-bold text-[var(--color-text)]">
        Order Summary
      </h3>

      <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
        <div className="flex justify-between text-sm font-medium text-[var(--color-muted)]">
          <span>Subtotal</span>
          <span className="font-mono text-[var(--color-text)]">
            {formatPrice(subtotalKes, currency, rate)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm font-medium text-[var(--color-muted)]">
          <div className="flex items-center gap-1.5">
            <span>Delivery Fee</span>
            <div className="group relative">
               <Info className="w-4 h-4 text-[var(--color-muted)] cursor-help" />
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[var(--color-cta)] text-[var(--color-cta-text)] text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  Flat rate in Busia town. Free for orders above KES 3,000.
               </div>
            </div>
          </div>
          <span className="font-mono text-[var(--color-text)]">
            {deliveryFeeKes === 0 ? "FREE" : formatPrice(deliveryFeeKes, currency, rate)}
          </span>
        </div>

        {deliveryFeeKes > 0 && (
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-3">
             <Truck className="w-4 h-4 text-amber-600 mt-0.5" />
             <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                Add {formatPrice(3000 - subtotalKes, currency, rate)} more to your cart for <span className="font-bold">Free Delivery</span>!
             </p>
          </div>
        )}
      </div>

      <div className="pt-6 border-t-2 border-[var(--color-border)] flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-sm font-bold text-[var(--color-text)] uppercase tracking-wider">Total</span>
          <p className="text-xs text-[var(--color-muted)]">Including all taxes</p>
        </div>
        <div className="text-3xl font-mono font-bold text-[var(--color-text)]">
          {formatPrice(totalKes, currency, rate)}
        </div>
      </div>

      <div className="pt-4">
        <a href="/checkout">
           <Button fullWidth size="lg" className="h-14 font-bold text-lg group">
              Proceed to Checkout
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </a>
      </div>

      <div className="flex flex-col items-center gap-2 pt-4">
         <p className="text-[10px] text-[var(--color-muted)] font-medium flex items-center gap-1.5">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-emerald-600">
               <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3 5l-4 4-2-2 1-1 1 1 3-3 1 1z" />
            </svg>
            Secure M-Pesa Payment
         </p>
      </div>
    </div>
  );
}
