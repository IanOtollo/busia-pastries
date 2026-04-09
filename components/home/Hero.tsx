"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Truck, Smartphone } from "lucide-react";
import { useSeason } from "@/components/providers/SeasonalProvider";

export function Hero() {
  const { season } = useSeason();

  const seasonalText = {
    valentine: "NOW BAKING FOR THE SEASON OF LOVE",
    halloween: "SPOOKY GOODNESS IN EVERY BITE",
    christmas: "FESTIVE BAKES FOR THE HOLIDAYS",
    newyear: "START THE YEAR WITH FRESHNESS",
    default: "BAKED IN BUSIA. BAKED WITH LOVE.",
  }[season] || "BAKED IN BUSIA. BAKED WITH LOVE.";

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-bp-bg hero-grain hero-pattern pt-20">
      {/* Radial Gradient Backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-bp-accent/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-bp-accent/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="space-y-10 max-w-5xl mx-auto"
        >
          {/* Seasonal Banner */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block font-mono text-xs font-bold tracking-[0.3em] text-bp-accent uppercase"
          >
            {seasonalText}
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-editorial font-display font-bold text-bp-text leading-[0.9] text-[clamp(3.5rem,8vw,7rem)]"
          >
            Every Bite, <br />
            <span className="text-bp-accent italic">a Celebration.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-bp-text-muted text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-body"
          >
            Freshly baked pastries, cakes, and more — made in Busia, delivered to your door or ready for pickup.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4"
          >
            <Link href="/menu" className="btn-primary flex items-center gap-3 active:scale-95 group">
              Order Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
            <Link href="/menu" className="btn-secondary group">
              Browse the Menu
              <span className="block h-px w-0 group-hover:w-full bg-bp-accent transition-all duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Operational Pills */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 1 }}
           className="mt-24 flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-12 border-t border-bp-border/30"
        >
          <div className="flex items-center gap-3 text-bp-text-muted">
            <MapPin className="w-5 h-5 text-bp-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Busia Town, Kenya</span>
          </div>
          <div className="flex items-center gap-3 text-bp-text-muted">
            <Truck className="w-5 h-5 text-bp-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Delivery in 45–90 min</span>
          </div>
          <div className="flex items-center gap-3 text-bp-text-muted">
            <Smartphone className="w-5 h-5 text-bp-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Order via M-Pesa</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
