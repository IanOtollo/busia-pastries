"use client";
import React, { useEffect } from "react";
import { Check, Share2, Receipt, MapPin, Truck, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

interface StepDoneProps {
  orderId: string;
  trackingToken: string;
  data: {
    name: string;
    fulfillment: string;
    email?: string;
  };
}

export function StepDone({ orderId, trackingToken, data }: StepDoneProps) {
  const { clearCart } = useCart();
  const shortOrderId = orderId.slice(-8).toUpperCase();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="text-center space-y-12 animate-fade-in pb-12">
      <div className="space-y-6 pt-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 z-0">
             {[...Array(6)].map((_, i) => (
                <motion.div
                   key={i}
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ 
                      scale: [0, 1.5, 1], 
                      opacity: [0, 1, 0],
                      x: [0, (i % 2 === 0 ? 60 : -60) * Math.random()],
                      y: [0, -60 * Math.random()]
                   }}
                   transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
                   className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)]"
                />
             ))}
          </div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center relative z-10 shadow-xl"
          >
            <Check className="w-12 h-12 stroke-[3]" />
          </motion.div>
        </div>

        <div className="space-y-2">
           <h2 className="font-display text-4xl md:text-5xl font-bold text-cp-text italic">
          Bake Confirmed!
        </h2>
        <p className="text-cp-text-muted leading-relaxed max-w-sm mx-auto font-body">
          Your order has been received. Clare is already heating up the oven to 
          prepare your fresh artisan treats.
        </p>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-[var(--color-bg)] border border-[var(--color-border)] rounded-3xl p-8 shadow-sm space-y-6 relative overflow-hidden">
         <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--color-surface)] rounded-full blur-2xl" />
         
         <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-[0.2em]">Order Reference</p>
            <p className="text-2xl font-mono font-bold text-[var(--color-text)]">#{shortOrderId}</p>
         </div>

         <div className="h-px bg-[var(--color-border)]" />

         <div className="grid grid-cols-2 gap-4 text-left">
            <div className="space-y-1">
               <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider">Method</p>
               <div className="flex items-center gap-2 text-sm font-bold">
                  {data.fulfillment === "DELIVERY" ? <Truck className="w-3.5 h-3.5 text-[var(--color-accent)]" /> : <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />}
                  {data.fulfillment}
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider">Est. Arrival</p>
               <p className="text-sm font-bold">45–90 Minutes</p>
            </div>
         </div>

         {data.email && (
            <div className="text-xs text-[var(--color-muted)] pt-2">
               A confirmation has been sent to <span className="font-medium text-[var(--color-text)]">{data.email}</span>
            </div>
         )}
      </div>

      <div className="max-w-md mx-auto p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl flex items-center gap-5 text-left">
         <div className="w-12 h-12 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6 text-[var(--color-accent)]" />
         </div>
         <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold">Get status updates?</h4>
            <p className="text-[10px] text-[var(--color-muted)] leading-relaxed">
               We can notify you as soon as your order is <span className="font-bold">Baking</span>, <span className="font-bold">Ready</span>, or <span className="font-bold">Out for Delivery</span>.
            </p>
         </div>
         <Button size="sm" variant="outline" className="text-[10px] h-8 px-3">
            Allow
         </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4 font-bold">
         <Link href={`/orders/${orderId}?token=${trackingToken}`} className="flex-1">
            <Button fullWidth size="lg" className="h-14">
               Track Your Order
            </Button>
         </Link>
         <Link href="/menu" className="flex-1">
            <Button variant="outline" fullWidth size="lg" className="h-14">
               Browse More
            </Button>
         </Link>
      </div>

      <div className="flex items-center justify-center gap-8 pt-8 opacity-60">
         <button className="flex items-center gap-2 text-xs font-bold hover:text-[var(--color-accent)] transition-colors">
            <Share2 className="w-4 h-4" /> Share with Friends
         </button>
         <Link href="/contact" className="flex items-center gap-2 text-xs font-bold hover:text-[var(--color-accent)] transition-colors">
            <Receipt className="w-4 h-4" /> Need Help?
         </Link>
      </div>
    </div>
  );
}
