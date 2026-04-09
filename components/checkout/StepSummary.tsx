"use client";

import React from "react";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";
import { ArrowLeft, CheckCircle2, ShoppingBag, Truck, MapPin, User } from "lucide-react";

import { CheckoutFormData } from "@/types/checkout";

interface StepSummaryProps {
  data: CheckoutFormData;
  onNext: () => void;
  onBack: () => void;
}

export function StepSummary({ data, onNext, onBack }: StepSummaryProps) {
  const { items, getTotal } = useCart();
  const { formatPrice } = useCurrency();

  const deliveryFee = data.fulfillment === "DELIVERY" ? 100 : 0;
  const total = getTotal() + deliveryFee;

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-4">
        <h2 className="font-display text-4xl font-bold text-bp-text">Review your journey.</h2>
        <p className="text-sm text-bp-text-muted">One last look before we start baking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: recap items */}
        <div className="space-y-8">
           <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text flex items-center gap-2">
                 <ShoppingBag className="w-4 h-4 text-bp-accent" />
                 Items ({items.length})
              </h3>
              <div className="space-y-4 bg-white border border-bp-border rounded-2xl p-6">
                 {items.map((item) => (
                    <div key={item.sanityId} className="flex justify-between items-center gap-4">
                       <div className="flex-grow">
                          <p className="text-sm font-bold text-bp-text">{item.productName}</p>
                          <p className="text-[10px] font-mono font-bold text-bp-text-muted">{item.quantity} x {formatPrice(item.unitPriceKes)}</p>
                       </div>
                       <span className="font-mono text-sm font-bold">
                          {formatPrice(item.unitPriceKes * item.quantity)}
                       </span>
                    </div>
                 ))}
                 <div className="h-px bg-bp-border/50 my-4" />
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-bp-text-muted">Subtotal</span>
                    <span className="font-bold">{formatPrice(getTotal())}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-bp-text-muted">Delivery Fee</span>
                    <span className="font-bold text-bp-accent">{formatPrice(deliveryFee)}</span>
                 </div>
                 <div className="pt-4 flex justify-between items-end border-t border-bp-border">
                    <span className="font-display text-xl font-bold">Total</span>
                    <span className="font-mono text-xl font-bold text-bp-accent">{formatPrice(total)}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Fulfillment & Details */}
        <div className="space-y-8">
           <div className="space-y-6">
              <div className="space-y-4">
                 <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text flex items-center gap-2">
                    <Truck className="w-4 h-4 text-bp-accent" />
                    Fulfillment
                 </h3>
                 <div className="bg-bp-surface/50 border border-bp-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold">{data.fulfillment}</span>
                       <button onClick={onBack} className="text-[10px] font-mono font-bold text-bp-accent uppercase underline">Edit</button>
                    </div>
                    {data.fulfillment === "DELIVERY" ? (
                       <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-bp-text-muted mt-0.5" />
                          <p className="text-xs text-bp-text-muted leading-relaxed">
                             {data.deliveryArea} {data.deliveryLandmark && `— Landmark: ${data.deliveryLandmark}`}
                          </p>
                       </div>
                    ) : (
                       <p className="text-xs text-bp-text-muted italic">Pickup in Busia Town</p>
                    )}
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text flex items-center gap-2">
                    <User className="w-4 h-4 text-bp-accent" />
                    Delivery Contact
                 </h3>
                 <div className="bg-bp-surface/50 border border-bp-border rounded-xl p-6 space-y-2">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold">{data.fullName}</span>
                       <button onClick={onBack} className="text-[10px] font-mono font-bold text-bp-accent uppercase underline">Edit</button>
                    </div>
                    <p className="text-xs text-bp-text-muted">{data.phone}</p>
                    {data.email && <p className="text-xs text-bp-text-muted">{data.email}</p>}
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="pt-12 border-t border-bp-border/50 flex justify-between gap-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-bp-text-muted hover:text-bp-text transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={onNext}
          className="btn-primary flex items-center gap-3 group px-16"
        >
          Place Order & Pay
          <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
