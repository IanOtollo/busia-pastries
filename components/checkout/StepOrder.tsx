"use client";

import React from "react";
import { Truck, Store, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CheckoutFormData } from "@/types/checkout";

interface StepOrderProps {
  data: CheckoutFormData;
  updateData: (data: Partial<CheckoutFormData>) => void;
  onNext: () => void;
}

export function StepOrder({ data, updateData, onNext }: StepOrderProps) {
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-6">
        <h2 className="font-display text-4xl md:text-6xl font-black text-cp-text leading-[0.9] tracking-tighter uppercase italic">
          How should we <br />
          <span className="text-cp-accent not-italic">Get it to You?</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delivery Option */}
          <button
            onClick={() => updateData({ fulfillment: "DELIVERY" })}
            className={cn(
              "flex flex-col items-start p-10 rounded-3xl border-2 transition-all duration-500 text-left group shadow-xl",
              data.fulfillment === "DELIVERY"
                ? "border-cp-accent bg-cp-accent/5 ring-4 ring-cp-accent/5 shadow-2xl scale-[1.02]"
                : "border-cp-border bg-white hover:border-cp-accent/50"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors shadow-lg",
              data.fulfillment === "DELIVERY" ? "bg-cp-accent text-white" : "bg-cp-surface text-cp-text-muted"
            )}>
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="font-black text-xl text-cp-text uppercase tracking-widest italic">Doorstep <br /><span className="text-cp-accent not-italic">Delivery</span></h3>
            <p className="text-sm text-cp-text-muted mt-4 leading-relaxed font-body">
              Delivered within 45–90 minutes in Busia Town.
            </p>
            <span className="mt-6 text-[10px] font-mono font-bold text-cp-accent border border-cp-accent/20 px-4 py-2 rounded-full uppercase tracking-[0.2em] bg-white">KES 100 Fee</span>
          </button>

          {/* Pickup Option */}
          <button
            onClick={() => updateData({ fulfillment: "PICKUP" })}
            className={cn(
              "flex flex-col items-start p-10 rounded-3xl border-2 transition-all duration-500 text-left group shadow-xl",
              data.fulfillment === "PICKUP"
                ? "border-cp-accent bg-cp-accent/5 ring-4 ring-cp-accent/5 shadow-2xl scale-[1.02]"
                : "border-cp-border bg-white hover:border-cp-accent/50"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors shadow-lg",
              data.fulfillment === "PICKUP" ? "bg-cp-accent text-white" : "bg-cp-surface text-cp-text-muted"
            )}>
              <Store className="w-8 h-8" />
            </div>
            <h3 className="font-black text-xl text-cp-text uppercase tracking-widest italic">Store <br /><span className="text-cp-accent not-italic">Pickup</span></h3>
            <p className="text-sm text-cp-text-muted mt-4 leading-relaxed font-body">
              Collect from us near the Kenya-Uganda border.
            </p>
            <span className="mt-6 text-[10px] font-mono font-bold text-cp-success border border-cp-success/20 px-4 py-2 rounded-full uppercase tracking-[0.3em] bg-white shadow-sm">Free</span>
          </button>
        </div>
      </div>

      {data.fulfillment === "DELIVERY" ? (
        <div className="space-y-8 pt-12 border-t border-cp-border animate-in slide-in-from-top-6 duration-700">
          <div className="space-y-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-cp-accent flex items-center gap-3">
               <MapPin className="w-4 h-4" />
               Delivery Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Town / Area*</label>
                  <input 
                    value={data.deliveryArea}
                    onChange={(e) => updateData({ deliveryArea: e.target.value })}
                    className="w-full bg-cp-surface border border-cp-border rounded-xl px-4 py-5 text-sm focus:ring-2 focus:ring-cp-accent outline-none font-body shadow-sm"
                    placeholder="e.g. Busia Central, Marachi"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Landmark (Optional)</label>
                  <input 
                    value={data.deliveryLandmark}
                    onChange={(e) => updateData({ deliveryLandmark: e.target.value })}
                    className="w-full bg-cp-surface border border-cp-border rounded-xl px-4 py-5 text-sm focus:ring-2 focus:ring-cp-accent outline-none font-body shadow-sm"
                    placeholder="e.g. Near Coop Bank, Opposite Victory"
                  />
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 bg-cp-surface border border-cp-border rounded-3xl space-y-6 animate-in slide-in-from-top-6 duration-700 shadow-xl">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white border border-cp-border rounded-xl flex items-center justify-center text-cp-accent shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold text-cp-text uppercase tracking-widest italic">Pickup Details</h4>
           </div>
           <p className="text-lg text-cp-text-muted leading-relaxed italic font-body max-w-2xl pl-14">
              Clare will provide the exact pickup location in Busia Town once your order is confirmed. 
              Usually ready within 60 minutes.
           </p>
        </div>
      )}

      <div className="space-y-4 pt-4">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Order Notes (Optional)</label>
        <textarea 
          value={data.notes}
          onChange={(e) => updateData({ notes: e.target.value })}
          className="w-full bg-cp-surface border border-cp-border rounded-xl px-4 py-5 text-sm min-h-[140px] focus:ring-2 focus:ring-cp-accent outline-none font-body shadow-sm"
          placeholder="e.g. Please leave at the gate, call upon arrival..."
        />
      </div>

      <div className="pt-12 border-t border-cp-border flex justify-end">
        <button
          onClick={onNext}
          disabled={data.fulfillment === "DELIVERY" && !data.deliveryArea}
          className="btn-primary flex items-center gap-4 px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-lg active:scale-[0.98] group transition-all"
        >
          Customer Details
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
