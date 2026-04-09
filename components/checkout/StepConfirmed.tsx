"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Package, Truck, Smartphone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

interface StepConfirmedProps {
  orderId: string;
  data: any;
  onFinish: () => void;
}

export function StepConfirmed({ orderId, data, onFinish }: StepConfirmedProps) {
  useEffect(() => {
    // Scroll to top on success
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="space-y-16 animate-fade-in text-center py-12">
      {/* Visual Success */}
      <div className="relative inline-block">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="w-32 h-32 bg-bp-success text-white rounded-full flex items-center justify-center relative z-10 shadow-lg"
        >
          <CheckCircle2 className="w-16 h-16" />
        </motion.div>
        
        {/* Animated Particles (CSS/Framer) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{ 
              x: Math.cos((i * 30) * Math.PI / 180) * 150, 
              y: Math.sin((i * 30) * Math.PI / 180) * 150,
              opacity: 0,
              scale: 0.5
            }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-bp-accent rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        ))}
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-bp-text leading-none">
          Baking Journey <br />
          <span className="text-bp-accent">Started!</span>
        </h2>
        <p className="text-bp-text-muted text-lg font-body leading-relaxed">
           Thank you, <span className="font-bold text-bp-text">{data.fullName}</span>. Your order <span className="font-mono font-bold text-bp-accent">#{orderId.slice(-6).toUpperCase()}</span> has been received. Michael is already preparing the oven.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="max-w-xl mx-auto grid grid-cols-3 gap-4 pt-8">
         <div className="space-y-4">
            <div className="w-12 h-12 bg-bp-success/10 text-bp-success rounded-full flex items-center justify-center mx-auto border-2 border-bp-success">
               <Smartphone className="w-5 h-5" />
            </div>
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-bp-success">Confirmed</span>
         </div>
         <div className="space-y-4">
            <div className="w-12 h-12 bg-bp-surface text-bp-text-muted rounded-full flex items-center justify-center mx-auto border-2 border-bp-border">
               <Package className="w-5 h-5" />
            </div>
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">Baking</span>
         </div>
         <div className="space-y-4">
            <div className="w-12 h-12 bg-bp-surface text-bp-text-muted rounded-full flex items-center justify-center mx-auto border-2 border-bp-border">
               <Truck className="w-5 h-5" />
            </div>
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">Dispatch</span>
         </div>
      </div>

      <div className="pt-8 flex flex-col items-center gap-8">
        <button
          onClick={onFinish}
          className="btn-primary flex items-center gap-3 px-16 group active:scale-[0.98]"
        >
          Track My Order
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </button>

        <div className="flex items-center gap-4 py-6 border-t border-bp-border w-full justify-center">
            <Logo className="w-6 h-6" hideText />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">
               Baked by Michael Aderi • Busia, Kenya
            </span>
        </div>
      </div>
    </div>
  );
}
