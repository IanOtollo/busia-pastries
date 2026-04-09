"use client";

import React from "react";
import { Truck, Store, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FulfillmentMode } from "@/app/checkout/page";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";

interface StepOrderProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
}

export function StepOrder({ data, updateData, onNext }: StepOrderProps) {
  const items = useCart((state) => state.items);
  const { formatPrice } = useCurrency();

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-6">
        <h2 className="font-display text-4xl font-bold text-bp-text">How should we get it to you?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Option */}
          <button
            onClick={() => updateData({ fulfillment: "DELIVERY" })}
            className={cn(
              "flex flex-col items-start p-8 rounded-2xl border-2 transition-all text-left group",
              data.fulfillment === "DELIVERY"
                ? "border-bp-cta bg-bp-cta/5 ring-1 ring-bp-cta shadow-md"
                : "border-bp-border bg-white hover:border-bp-text-muted"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
              data.fulfillment === "DELIVERY" ? "bg-bp-cta text-bp-cta-text" : "bg-bp-surface text-bp-text-muted"
            )}>
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-bp-text">Doorstep Delivery</h3>
            <p className="text-sm text-bp-text-muted mt-2 leading-relaxed">
              Delivered within 45–90 minutes in Busia Town.
            </p>
            <span className="mt-4 text-xs font-mono font-bold text-bp-accent">KES 100 Fee</span>
          </button>

          {/* Pickup Option */}
          <button
            onClick={() => updateData({ fulfillment: "PICKUP" })}
            className={cn(
              "flex flex-col items-start p-8 rounded-2xl border-2 transition-all text-left group",
              data.fulfillment === "PICKUP"
                ? "border-bp-cta bg-bp-cta/5 ring-1 ring-bp-cta shadow-md"
                : "border-bp-border bg-white hover:border-bp-text-muted"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
              data.fulfillment === "PICKUP" ? "bg-bp-cta text-bp-cta-text" : "bg-bp-surface text-bp-text-muted"
            )}>
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-bp-text">Store Pickup</h3>
            <p className="text-sm text-bp-text-muted mt-2 leading-relaxed">
              Collect from us near the Kenya-Uganda border.
            </p>
            <span className="mt-4 text-xs font-mono font-bold text-bp-success uppercase tracking-widest">Free</span>
          </button>
        </div>
      </div>

      {data.fulfillment === "DELIVERY" ? (
        <div className="space-y-8 pt-8 border-t border-bp-border/50 animate-in slide-in-from-top-4 duration-500">
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted flex items-center gap-2">
               <MapPin className="w-4 h-4" />
               Delivery Location in Busia Town
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">Town / Area*</label>
                  <input 
                    value={data.deliveryArea}
                    onChange={(e) => updateData({ deliveryArea: e.target.value })}
                    className="w-full bg-bp-surface border border-bp-border rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-bp-accent outline-none"
                    placeholder="e.g. Busia Central, Marachi"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">Landmark (Optional)</label>
                  <input 
                    value={data.deliveryLandmark}
                    onChange={(e) => updateData({ deliveryLandmark: e.target.value })}
                    className="w-full bg-bp-surface border border-bp-border rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-bp-accent outline-none"
                    placeholder="e.g. Near Coop Bank, Opposite Victory"
                  />
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-bp-surface/50 border border-bp-border rounded-2xl space-y-4 animate-in slide-in-from-top-4 duration-500">
           <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-bp-accent" />
              <h4 className="font-bold text-sm">Pickup Details</h4>
           </div>
           <p className="text-sm text-bp-text-muted leading-relaxed italic">
              Michael will provide the exact pickup location in Busia Town once your order is confirmed. 
              Usually ready within 60 minutes.
           </p>
        </div>
      )}

      <div className="space-y-2 pt-4">
        <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Order Notes (Optional)</label>
        <textarea 
          value={data.notes}
          onChange={(e) => updateData({ notes: e.target.value })}
          className="w-full bg-bp-surface border border-bp-border rounded-md px-4 py-3 text-sm min-h-[100px] focus:ring-1 focus:ring-bp-accent outline-none"
          placeholder="e.g. Please leave at the gate, call upon arrival..."
        />
      </div>

      <div className="pt-12 border-t border-bp-border/50 flex justify-end">
        <button
          onClick={onNext}
          disabled={data.fulfillment === "DELIVERY" && !data.deliveryArea}
          className="btn-primary flex items-center gap-3 group"
        >
          Your Details
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
