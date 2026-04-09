"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice } from "@/lib/utils/currency";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const { currency, rate } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center space-y-8 animate-fade-in">
        <div className="w-32 h-32 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-muted)]">
          <ShoppingBag className="w-16 h-16" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="font-display text-4xl font-bold">Your cart is empty</h1>
          <p className="text-[var(--color-muted)] max-w-xs mx-auto">
            Looks like you haven&apos;t added any delicious pastries yet. 
            Let&apos;s change that.
          </p>
        </div>
        <Link href="/menu">
           <Button size="lg" className="h-14 px-10 font-bold rounded-2xl group">
              Explore Our Menu
              <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
           </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 space-y-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items List */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-8">
               <h1 className="font-display text-4xl font-bold text-[var(--color-text)]">
                  Your Baking Tray
               </h1>
               <p className="text-[var(--color-muted)] font-medium">({items.length} items)</p>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.sanityId} className="flex gap-6 p-6 bg-white border border-[var(--color-border)] rounded-3xl group hover:border-[var(--color-accent)]/30 transition-all shadow-sm">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0">
                    <Image src={item.imageUrl || ""} alt={item.productName} fill className="object-cover transition-transform group-hover:scale-110" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                     <div className="flex justify-between items-start">
                        <div className="space-y-1">
                           <h3 className="font-bold text-lg">{item.productName}</h3>
                           <p className="text-sm font-mono text-[var(--color-muted)]">
                              {formatPrice(item.unitPriceKes, currency, rate)} / unit
                           </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.sanityId)}
                          className="p-2 text-[var(--color-muted)] hover:text-rose-500 transition-colors"
                        >
                           <Trash2 className="w-5 h-5" />
                        </button>
                     </div>

                     <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-[var(--color-surface)] rounded-xl p-1 border border-[var(--color-border)]">
                           <button onClick={() => updateQuantity(item.sanityId, item.quantity - 1)} className="p-2 hover:text-[var(--color-accent)] transition-colors"><Minus className="w-4 h-4" /></button>
                           <span className="w-10 text-center font-mono font-bold text-sm">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.sanityId, item.quantity + 1)} className="p-2 hover:text-[var(--color-accent)] transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                        <p className="font-mono font-bold text-[var(--color-text)]">
                           {formatPrice(item.unitPriceKes * item.quantity, currency, rate)}
                        </p>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/menu" className="inline-flex items-center text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors group">
               <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
               Continue Ordering
            </Link>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-[400px]">
             <div className="sticky top-40 space-y-6">
                <CartSummary />
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] text-center">
                      <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] mb-1 tracking-widest">Secure</p>
                      <p className="text-xs font-bold text-[var(--color-text)]">M-Pesa Ready</p>
                   </div>
                   <div className="p-4 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] text-center">
                      <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] mb-1 tracking-widest">Fresh</p>
                      <p className="text-xs font-bold text-[var(--color-text)]">Baked Today</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
