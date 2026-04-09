import React from "react";
import { Flame, Truck, Smartphone, Phone } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Flame, text: "Baked Fresh Daily" },
  { icon: Truck, text: "Delivered in Busia Town" },
  { icon: Smartphone, text: "Pay via M-Pesa" },
  { icon: Phone, text: "Call: +254 724 848228" },
];

export function TrustBar() {
  return (
    <div className="bg-bp-surface border-y border-bp-border py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {TRUST_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-10 h-10 rounded-full bg-bp-bg border border-bp-border flex items-center justify-center text-bp-accent">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
