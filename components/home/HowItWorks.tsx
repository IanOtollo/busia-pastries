import React from "react";
import { Search, ShoppingBag, Truck } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Browse",
    desc: "Explore our daily selection of artisan pastries and cakes.",
  },
  {
    icon: ShoppingBag,
    title: "Order",
    desc: "Secure checkout via M-Pesa. Choose delivery or store pickup.",
  },
  {
    icon: Truck,
    title: "Receive",
    desc: "Freshly baked items delivered to your door in 45–90 minutes.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 md:py-24 bg-cp-surface">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-20 text-cp-text leading-none">
          How It Works
        </h2>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px border-t border-dashed border-cp-border -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-6 group">
                <div className="relative">
                  <span className="absolute -top-6 -left-6 font-display text-[5rem] font-bold text-cp-accent opacity-[0.12] pointer-events-none group-hover:opacity-30 transition-opacity duration-500">
                    {idx + 1}
                  </span>
                  <div className="w-20 h-20 rounded-2xl bg-cp-bg border border-cp-border flex items-center justify-center text-cp-accent shadow-sm group-hover:shadow-md transition-shadow">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-cp-text">{step.title}</h3>
                  <p className="text-cp-text-muted text-sm leading-relaxed max-w-[240px] font-body">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
