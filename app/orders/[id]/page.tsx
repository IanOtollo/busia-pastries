"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { OrderStatusTimeline } from "@/components/order/OrderStatusTimeline";
import { useOrderStatus } from "@/hooks/useOrderStatus";
import { formatPrice } from "@/lib/utils/currency";
import { useCurrency } from "@/hooks/useCurrency";
import { Package, MapPin, Phone, HelpCircle, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { OrderStatus } from "@/types/product";

interface OrderItem {
  quantity: number;
  productName: string;
  unitPriceKes: number;
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { currency, rate } = useCurrency();

  // Real-time status tracking via Supabase
  const { status, order, isLoading, error } = useOrderStatus(params.id, token || "");

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
        <p className="font-mono text-sm font-bold text-[var(--color-muted)] animate-pulse">LOCATING YOUR ORDER...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center p-6 space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-[var(--color-surface)] flex items-center justify-center text-rose-500">
           <HelpCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
           <h1 className="font-display text-3xl font-bold">Order Not Found</h1>
           <p className="text-[var(--color-muted)] max-w-xs mx-auto">
              We couldn&apos;t find an order with this ID and token. Please check your confirmation email.
           </p>
        </div>
        <Link href="/">
           <button className="h-12 px-8 bg-[var(--color-cta)] text-[var(--color-cta-text)] rounded-xl font-bold">
              Return Home
           </button>
        </Link>
      </div>
    );
  }

  const shortId = params.id.slice(-8).toUpperCase();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--color-bg)]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
                 <ArrowLeft className="w-4 h-4" />
                 Back to Store
              </Link>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text)]">
                 Track Order <span className="text-[var(--color-accent)]">#{shortId}</span>
              </h1>
           </div>
           
           <div className="flex items-center gap-3 px-4 py-2 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] text-xs font-mono font-bold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE UPDATE CONNECTED
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
           {/* Left: Tracker */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-[var(--color-border)] rounded-3xl p-8 md:p-12 shadow-sm">
                 <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <Package className="w-6 h-6 text-[var(--color-accent)]" />
                    Baking Progress
                 </h2>
                 <OrderStatusTimeline status={status as OrderStatus} />
              </div>

              {/* Order Items Recap */}
              <div className="bg-[var(--color-surface)]/50 border border-[var(--color-border)] rounded-3xl p-8">
                 <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--color-muted)] mb-6">
                    Order Contents
                 </h3>
                 <div className="space-y-4">
                    {order.items.map((item: OrderItem, idx: number) => (
                       <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="font-medium text-[var(--color-text)]">
                             {item.quantity} × {item.productName}
                          </span>
                          <span className="font-mono text-[var(--color-muted)]">
                             {formatPrice(item.unitPriceKes * item.quantity, currency, rate)}
                          </span>
                       </div>
                    ))}
                    <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center font-bold">
                       <span>Grand Total</span>
                       <span className="text-xl font-mono">
                          {formatPrice(order.totalKes, currency, rate)}
                       </span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Info Sidebar */}
           <div className="space-y-6">
              {/* Delivery Info */}
              <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 shadow-sm space-y-6">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
                       <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                       Delivery Details
                    </div>
                    <div className="space-y-1">
                       <p className="font-bold text-[var(--color-text)]">{order.guestName}</p>
                       <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                          {order.deliveryAddress || "Store Pickup (In-person)"}
                       </p>
                    </div>
                 </div>

                 <div className="h-px bg-[var(--color-border)]" />

                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
                       <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                       Contact Info
                    </div>
                    <p className="text-sm font-mono font-bold">{order.guestPhone}</p>
                 </div>
              </div>

              {/* Support */}
              <div className="bg-[var(--color-cta)] text-[var(--color-cta-text)] rounded-2xl p-6 shadow-lg space-y-4">
                 <h4 className="font-bold">Need Help?</h4>
                 <p className="text-xs text-[var(--color-cta-text)]/70 leading-relaxed">
                    If you have any questions about your order or need to change delivery details, 
                    please call us immediately.
                 </p>
                 <a href="tel:+254700000000" className="flex items-center justify-center gap-2 w-full h-11 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all border border-white/10">
                    <Phone className="w-4 h-4" />
                    Call the Bakery
                 </a>
              </div>

              {/* Share link (for guests to find later) */}
              <div className="p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] flex items-center justify-between gap-4">
                 <div className="text-[10px] text-[var(--color-muted)] font-medium leading-tight">
                    Keep this link to track your order anytime.
                 </div>
                 <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[var(--color-border)]">
                    <ExternalLink className="w-4 h-4 text-[var(--color-accent)]" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
