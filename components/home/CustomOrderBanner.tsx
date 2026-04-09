import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CustomOrderBanner() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-bp-cta rounded-3xl p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          {/* Decorative grain/pattern could be added here similar to hero */}
          <div className="absolute inset-0 opacity-10 pointer-events-none hero-grain" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-bp-cta-text leading-tight">
              Something Unique in Mind?
            </h2>
            <p className="text-bp-cta-text/80 text-lg md:text-xl font-body leading-relaxed">
              Design your custom cake or pastry — tell us exactly what you want and we&apos;ll make it happen. Michael handles every bespoke order with personalized care.
            </p>
            <div className="pt-6">
              <Link 
                href="/menu#custom-order"
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-bp-cta-text text-bp-cta-text rounded-md font-bold uppercase tracking-widest text-xs hover:bg-bp-cta-text hover:text-bp-cta transition-all duration-500 overflow-hidden group"
              >
                Start a Custom Order
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
