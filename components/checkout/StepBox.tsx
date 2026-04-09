"use client";
import React from "react";
import { ArrowLeft, Box, MapPin, Truck, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatPrice, calculateDeliveryFee } from "@/lib/utils/currency";
import { useCurrency } from "@/hooks/useCurrency";

interface StepBoxProps {
  onNext: () => void;
  onBack: () => void;
  onJumpToStep: (step: number) => void;
  data: {
    name: string;
    email: string;
    phone: string;
    fulfillment: "DELIVERY" | "PICKUP";
    deliveryAddress?: string;
    notes?: string;
  }; 
}

export function StepBox({ onNext, onBack, onJumpToStep, data }: StepBoxProps) {
  const { items, subtotalKes } = useCart();
  const { currency, rate } = useCurrency();
  
  const deliveryFeeKes = calculateDeliveryFee(data.fulfillment, subtotalKes);
  const totalKes = subtotalKes + deliveryFeeKes;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Review content stays the same */}
      <div className="space-y-2">
        <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--color-muted)]">
          The Final Flourish
        </h3>
        <p className="text-sm text-[var(--color-text)]">
          Review your order details one last time before we start the oven.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold flex items-center gap-2">
                   <Box className="w-4 h-4 text-[var(--color-accent)]" />
                   Selected Bakes
                </h4>
                <button onClick={() => onJumpToStep(1)} className="text-[10px] uppercase font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)]">Edit</button>
              </div>
              <div className="space-y-3">
                 {items.map((item) => (
                    <div key={item.sanityId} className="flex justify-between text-sm">
                       <span className="text-[var(--color-muted)]">{item.quantity} × {item.productName}</span>
                       <span className="font-mono text-[var(--color-text)]">
                          {formatPrice(item.unitPriceKes * item.quantity, currency, rate)}
                       </span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold flex items-center gap-2">
                   <Edit3 className="w-4 h-4 text-[var(--color-accent)]" />
                   Baker Details
                </h4>
                <button onClick={() => onJumpToStep(2)} className="text-[10px] uppercase font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)]">Edit</button>
              </div>
              <div className="space-y-1 text-sm">
                 <p className="font-bold">{data.name}</p>
                 <p className="text-[var(--color-muted)]">{data.email}</p>
                 <p className="text-[var(--color-muted)]">{data.phone}</p>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold flex items-center gap-2">
                   {data.fulfillment === "DELIVERY" ? <Truck className="w-4 h-4 text-[var(--color-accent)]" /> : <MapPin className="w-4 h-4 text-[var(--color-accent)]" />}
                   Fulfillment
                </h4>
                <button onClick={() => onJumpToStep(1)} className="text-[10px] uppercase font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)]">Edit</button>
              </div>
              <div className="space-y-1 text-sm">
                 <p className="font-bold">{data.fulfillment === "DELIVERY" ? "Doorstep Delivery" : "Store Pickup"}</p>
                 <p className="text-[var(--color-muted)] leading-relaxed">
                    {data.fulfillment === "DELIVERY" ? data.deliveryAddress : "Busia Town, Opposite Victory Plaza"}
                 </p>
              </div>
           </div>

           <div className="p-1 bg-gradient-to-br from-[var(--color-accent)] to-[#f3e4b2] rounded-[2rem] shadow-xl shadow-[var(--color-accent)]/10">
              <div className="bg-white rounded-[1.8rem] p-6 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[var(--color-muted)]">Subtotal</span>
                    <span className="font-mono text-sm">{formatPrice(subtotalKes, currency, rate)}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[var(--color-muted)]">Delivery Fee</span>
                    <span className="font-mono text-sm">{formatPrice(deliveryFeeKes, currency, rate)}</span>
                 </div>
                 <div className="h-px bg-[var(--color-border)]" />
                 <div className="flex justify-between items-center">
                    <span className="font-bold">Total Bill</span>
                    <span className="text-2xl font-mono font-bold text-[var(--color-accent)]">
                       {formatPrice(totalKes, currency, rate)}
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[var(--color-border)] text-center space-y-6">
         <p className="text-xs text-[var(--color-muted)] leading-relaxed max-w-sm mx-auto">
            You&apos;re just a few steps away from your fresh bakes. 
            Please double check your details before we start the oven.
         </p>
         <div className="flex gap-4">
            <Button variant="ghost" className="flex-1 h-14" onClick={onBack}>
               <ArrowLeft className="mr-2 w-4 h-4" />
               Bake Step
            </Button>
            <Button className="flex-1 h-14" onClick={onNext}>
               Ready to Pay
            </Button>
         </div>
      </div>
    </div>
  );
}
