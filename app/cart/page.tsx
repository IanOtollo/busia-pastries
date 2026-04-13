"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCart();
  const { formatPrice } = useCurrency();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center bg-cp-bg">
        <div className="w-8 h-8 border-4 border-cp-accent border-t-transparent rounded-full animate-spin opacity-50" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-4 bg-cp-bg">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="space-y-8 max-w-md"
        >
          <div className="w-24 h-24 bg-cp-surface rounded-full flex items-center justify-center mx-auto text-cp-text-muted border border-cp-border shadow-xl">
             <ShoppingBag className="w-10 h-10 opacity-20" />
          </div>
          <div className="space-y-3">
             <h1 className="font-display text-4xl font-black text-cp-text uppercase tracking-tighter italic">Your cart is <span className="text-cp-accent not-italic">Empty.</span></h1>
             <p className="text-cp-text-muted font-body leading-relaxed text-lg">
                It looks like you haven&apos;t added any artisanal bakes to your journey yet. Every bite is a celebration — come find yours.
             </p>
          </div>
          <Link href="/menu" className="btn-primary inline-flex px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all">
             Browse the Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-24 bg-cp-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Main Cart Area */}
          <div className="flex-grow space-y-12 w-full">
            <div className="space-y-4">
               <h1 className="font-display text-5xl md:text-8xl font-black text-cp-text leading-[0.9] tracking-tighter uppercase italic">
                 Your <br />
                 <span className="text-cp-accent not-italic">Selection.</span>
               </h1>
               <p className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-cp-accent">
                  {getItemCount()} items currently in your journey
               </p>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                    <motion.div
                      key={item.sanityId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-cp-surface p-6 md:p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-2xl border border-cp-border/50"
                    >
                      {/* Item Image */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-cp-surface-2 flex-shrink-0 shadow-inner">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                           <div className="absolute inset-0 flex items-center justify-center text-cp-border bg-cp-surface">
                              <ShoppingBag className="w-10 h-10" />
                           </div>
                        )}
                      </div>
  
                      {/* Item Details */}
                      <div className="flex-grow space-y-2 text-center md:text-left">
                         <Link href={`/menu/${item.slug}`}>
                            <h3 className="font-display text-2xl md:text-3xl font-bold text-cp-text hover:text-cp-accent transition-colors">
                               {item.productName}
                            </h3>
                         </Link>
                         <p className="font-mono text-lg font-bold text-cp-accent">
                            {formatPrice(item.unitPriceKes)}
                         </p>
                      </div>
  
                      {/* Quantity & Actions */}
                      <div className="flex items-center gap-12">
                         <div className="flex items-center border border-cp-border rounded-full bg-cp-surface-2 p-2 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.sanityId, item.quantity - 1)}
                              className="p-2 hover:text-cp-accent transition-colors"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                            <span className="w-12 text-center font-mono font-bold text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.sanityId, item.quantity + 1)}
                              className="p-2 hover:text-cp-accent transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                         </div>
  
                         <div className="flex flex-col items-end gap-2">
                            <span className="font-mono font-bold text-2xl text-cp-text">
                              {formatPrice(item.unitPriceKes * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.sanityId)}
                              className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-error hover:scale-110 transition-transform flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
  
              <Link href="/menu" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-cp-text-muted hover:text-cp-accent transition-colors">
                 ← Continue Shopping
              </Link>
            </div>
  
            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-[450px] sticky top-40">
               <div className="bg-cp-surface border border-cp-border rounded-3xl p-10 space-y-10 shadow-2xl">
                  <h2 className="font-display text-3xl font-bold text-cp-text uppercase tracking-widest italic">Summary</h2>
  
                  <div className="space-y-6 pt-4">
                     <div className="flex justify-between items-center">
                        <span className="text-cp-text-muted font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                        <span className="font-mono font-bold text-xl">{formatPrice(getTotal())}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <span className="text-cp-text-muted font-bold uppercase tracking-widest text-[10px]">Delivery</span>
                           <Truck className="w-4 h-4 text-cp-accent" />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-cp-text-muted uppercase tracking-widest italic">
                           Calculated at checkout
                        </span>
                     </div>
                     <div className="h-px bg-cp-border" />
                     <div className="flex justify-between items-end pt-4">
                        <span className="font-display text-3xl font-bold text-cp-text">Total</span>
                        <div className="text-right">
                           <span className="block font-mono text-3xl font-bold text-cp-accent">
                             {formatPrice(getTotal())}
                           </span>
                        </div>
                     </div>
                  </div>
  
                  <div className="pt-6">
                     <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-4 py-6 rounded-full font-black uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all">
                        Proceed to Checkout
                        <ArrowRight className="w-6 h-6" />
                     </Link>
                  </div>
  
                  <div className="space-y-4 pt-4">
                     <div className="p-6 bg-cp-surface-2 border border-cp-border rounded-2xl space-y-4 shadow-inner">
                        <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-cp-success">
                           <div className="w-2 h-2 rounded-full bg-cp-success shadow-sm shadow-cp-success/50" />
                           Freshness Guaranteed
                        </div>
                        <p className="text-sm text-cp-text-muted leading-relaxed italic font-body">
                           Clare will bake your order fresh with so much love upon confirmation. Delivery within 90 minutes.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
