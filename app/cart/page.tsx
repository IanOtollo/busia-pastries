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

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="space-y-8 max-w-md"
        >
          <div className="w-24 h-24 bg-bp-surface rounded-full flex items-center justify-center mx-auto text-bp-text-muted border border-bp-border">
             <ShoppingBag className="w-10 h-10 opacity-20" />
          </div>
          <div className="space-y-3">
             <h1 className="font-display text-4xl font-bold text-bp-text">Your cart is empty.</h1>
             <p className="text-bp-text-muted font-body leading-relaxed">
                It looks like you haven&apos;t added any artisanal bakes to your cart yet. Every bite is a celebration — come find yours.
             </p>
          </div>
          <Link href="/menu" className="btn-primary inline-flex">
             Browse the Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Main Cart Area */}
          <div className="flex-grow space-y-10 w-full">
            <div className="space-y-4">
               <h1 className="font-display text-5xl md:text-6xl font-bold text-bp-text">Your Selection</h1>
               <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">
                  {getItemCount()} items currently in your journey
               </p>
            </div>

            <div className="space-y-px bg-bp-border rounded-2xl overflow-hidden border border-bp-border">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.sanityId}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 md:gap-12"
                  >
                    {/* Item Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-bp-surface-2 flex-shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-bp-border bg-bp-surface">
                            <ShoppingBag className="w-10 h-10" />
                         </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow space-y-2 text-center md:text-left">
                       <Link href={`/menu/${item.slug}`}>
                          <h3 className="font-display text-2xl font-bold text-bp-text hover:text-bp-accent transition-colors">
                             {item.productName}
                          </h3>
                       </Link>
                       <p className="font-mono text-sm font-bold text-bp-accent">
                          {formatPrice(item.unitPriceKes)}
                       </p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center gap-8">
                       <div className="flex items-center border border-bp-border rounded-md bg-bp-bg p-1">
                          <button
                            onClick={() => updateQuantity(item.sanityId, item.quantity - 1)}
                            className="p-2 hover:text-bp-accent transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-mono font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.sanityId, item.quantity + 1)}
                            className="p-2 hover:text-bp-accent transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                       </div>

                       <div className="flex flex-col items-end gap-1">
                          <span className="font-mono font-bold text-bp-text">
                            {formatPrice(item.unitPriceKes * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.sanityId)}
                            className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-error hover:underline flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Link href="/menu" className="btn-secondary">
               ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[400px] sticky top-32">
             <div className="bg-bp-surface border border-bp-border rounded-2xl p-8 space-y-8">
                <h2 className="font-display text-3xl font-bold text-bp-text">Summary</h2>

                <div className="space-y-4 pt-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-bp-text-muted">Subtotal</span>
                      <span className="font-bold">{formatPrice(getTotal())}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                         <span className="text-bp-text-muted">Delivery</span>
                         <Truck className="w-3.5 h-3.5 text-bp-accent" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-bp-text-muted uppercase tracking-widest">
                         Calculated at checkout
                      </span>
                   </div>
                   <div className="h-px bg-bp-border" />
                   <div className="flex justify-between items-end pt-2">
                      <span className="font-display text-2xl font-bold">Total</span>
                      <div className="text-right">
                         <span className="block font-mono text-2xl font-bold text-bp-accent">
                           {formatPrice(getTotal())}
                         </span>
                      </div>
                   </div>
                </div>

                <div className="pt-4">
                   <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-3 active:scale-[0.98]">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>

                <div className="space-y-4 pt-4">
                   <div className="p-4 bg-bp-bg/50 border border-bp-border rounded-xl space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-bp-success">
                         <div className="w-1.5 h-1.5 rounded-full bg-bp-success" />
                         Freshness Guaranteed
                      </div>
                      <p className="text-[10px] text-bp-text-muted leading-relaxed italic">
                         Michael will bake your order fresh upon confirmation. Delivery within 90 minutes.
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
