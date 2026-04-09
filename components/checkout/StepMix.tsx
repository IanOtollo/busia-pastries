"use client";
import React from "react";
import { Truck, Store, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils/cn";

interface StepMixProps {
  onNext: (data: Partial<{
    fulfillment: "DELIVERY" | "PICKUP";
    deliveryAddress: string;
    notes: string;
  }>) => void;
  data: {
    fulfillment: "DELIVERY" | "PICKUP" | string;
    deliveryAddress: string;
    notes: string;
  };
}

export function StepMix({ onNext, data }: StepMixProps) {
  const [fulfillment, setFulfillment] = React.useState(data.fulfillment || "DELIVERY");
  const [address, setAddress] = React.useState(data.deliveryAddress || "");
  const [notes, setNotes] = React.useState(data.notes || "");

  const handleNext = () => {
    onNext({ fulfillment, deliveryAddress: address, notes });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* UI logic same as before */}
      <div className="space-y-2">
        <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--color-muted)]">
          Fulfillment Method
        </h3>
        <p className="text-sm text-[var(--color-text)]">
          How should we get your pastries to you?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setFulfillment("DELIVERY")}
          className={cn(
            "flex flex-col items-start p-6 rounded-[2rem] border-2 text-left transition-all group",
            fulfillment === "DELIVERY" 
              ? "border-[var(--color-accent)] bg-white shadow-xl shadow-[var(--color-accent)]/10" 
              : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-muted)]"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
            fulfillment === "DELIVERY" ? "bg-[var(--color-accent)] text-white" : "bg-white text-[var(--color-muted)]"
          )}>
            <Truck className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg">Doorstep Delivery</span>
          <span className="text-xs text-[var(--color-muted)] mt-1">We bring the heat to your door.</span>
        </button>

        <button
          onClick={() => setFulfillment("PICKUP")}
          className={cn(
            "flex flex-col items-start p-6 rounded-[2rem] border-2 text-left transition-all group",
            fulfillment === "PICKUP" 
              ? "border-[var(--color-accent)] bg-white shadow-xl shadow-[var(--color-accent)]/10" 
              : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-muted)]"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
            fulfillment === "PICKUP" ? "bg-[var(--color-accent)] text-white" : "bg-white text-[var(--color-muted)]"
          )}>
            <Store className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg">In-Store Pickup</span>
          <span className="text-xs text-[var(--color-muted)] mt-1">Visit us in Busia Town.</span>
        </button>
      </div>

      <div className="space-y-6 animate-slide-up">
        {fulfillment === "DELIVERY" ? (
          <div className="space-y-4">
            <Input
              label="Delivery Address"
              placeholder="Building, Street, Landmark in Busia..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              icon={<MapPin className="w-4 h-4" />}
            />
            <div className="p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] flex items-start gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
               <p className="text-[10px] text-[var(--color-muted)] leading-relaxed">
                  We currently deliver within a 15km radius of Busia Town center. 
                  Delivery fee is calculated based on your total order.
               </p>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] space-y-4">
             <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                <h4 className="font-bold text-sm">Our Location</h4>
             </div>
             <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Busia Town, Kisumu Road <br />
                Opposite Victory Plaza <br />
                Next to Cooperative Bank
             </p>
          </div>
        )}

        <div className="space-y-1.5">
           <label className="block text-sm font-medium text-[var(--color-text)]">
              Special Instructions (Optional)
           </label>
           <textarea
             placeholder="e.g. Please leave at the gate, call upon arrival..."
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
             className="w-full bg-[var(--color-surface)]/50 border border-[var(--color-border)] rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all min-h-[100px]"
           />
        </div>
      </div>

      <div className="pt-8 border-t border-[var(--color-border)]">
        <Button fullWidth size="lg" className="h-14 font-bold text-lg group" onClick={handleNext}>
          Continue to Baking
          <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
}
