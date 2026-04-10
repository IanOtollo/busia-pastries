import React from "react";
import { Flame, Truck, Smartphone, Phone } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Flame, text: "Baked Fresh Daily" },
  { icon: Truck, text: "Delivered in Busia Town" },
  { icon: Smartphone, text: "M-Pesa Express Checkout" },
  { icon: Phone, text: "WhatsApp: +254 724 848228" },
];

export function TrustBar() {
  return (
    <div className="bg-cp-bg border-y border-cp-border/50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {TRUST_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center lg:justify-start gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-cp-surface flex items-center justify-center text-cp-accent border border-cp-border shadow-sm group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cp-text italic">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
