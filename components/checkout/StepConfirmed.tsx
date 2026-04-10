"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Package, Truck, Smartphone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

import { CheckoutFormData } from "@/types/checkout";

interface StepConfirmedProps {
  orderId: string;
  data: CheckoutFormData;
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
          className="w-40 h-40 bg-cp-success text-white rounded-full flex items-center justify-center relative z-10 shadow-2xl"
        >
          <CheckCircle2 className="w-20 h-20" />
        </motion.div>
        
        {/* Animated Particles (CSS/Framer) */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{ 
              x: Math.cos((i * (360/16)) * Math.PI / 180) * 180, 
              y: Math.sin((i * (360/16)) * Math.PI / 180) * 180,
              opacity: 0,
              scale: 0.5
            }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-cp-accent rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        ))}
      </div>

      <div className="space-y-6 max-w-2xl mx-auto px-4">
        <h2 className="font-display text-5xl md:text-8xl font-black text-cp-text leading-[0.9] tracking-tighter uppercase italic">
          Baking Journey <br />
          <span className="text-cp-accent not-italic">Started!</span>
        </h2>
        <p className="text-cp-text-muted text-lg md:text-2xl font-body leading-relaxed italic">
           Thank you, <span className="font-bold text-cp-text not-italic">{data.fullName}</span>. Your order <span className="font-mono font-bold text-cp-accent not-italic">#{orderId.slice(-6).toUpperCase()}</span> has been received. Clare is already preparing the oven with so much love.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="max-w-xl mx-auto grid grid-cols-3 gap-4 pt-12 px-4">
         <div className="space-y-4">
            <div className="w-16 h-16 bg-cp-success/10 text-cp-success rounded-full flex items-center justify-center mx-auto border-2 border-cp-success shadow-lg">
               <Smartphone className="w-6 h-6" />
            </div>
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-cp-success">Confirmed</span>
         </div>
         <div className="space-y-4">
            <div className="w-16 h-16 bg-cp-surface text-cp-text-muted rounded-full flex items-center justify-center mx-auto border-2 border-cp-border shadow-sm">
               <Package className="w-6 h-6" />
            </div>
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Baking</span>
         </div>
         <div className="space-y-4">
            <div className="w-16 h-16 bg-cp-surface text-cp-text-muted rounded-full flex items-center justify-center mx-auto border-2 border-cp-border shadow-sm">
               <Truck className="w-6 h-6" />
            </div>
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Dispatch</span>
         </div>
      </div>

      <div className="pt-12 flex flex-col items-center gap-12">
        <button
          onClick={onFinish}
          className="btn-primary flex items-center gap-4 px-20 py-6 rounded-full font-black uppercase tracking-widest active:scale-[0.98] shadow-2xl group"
        >
          Track My Order
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>

        <div className="flex flex-col items-center gap-4 py-8 border-t border-cp-border w-full max-w-lg mx-auto">
            <Logo className="w-8 h-8" hideText />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-cp-text-muted">
               Hand-crafted by Clare • Busia, Kenya
            </span>
        </div>
      </div>
    </div>
  );
}
