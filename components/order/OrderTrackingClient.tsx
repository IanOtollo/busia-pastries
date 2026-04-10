"use client";

import React, { useEffect } from "react";
import { 
  Package, 
  Flame, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Smartphone, 
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useCurrency } from "@/store/useCurrency";
import Link from "next/link";

interface OrderTrackingClientProps {
  initialOrder: {
    id: string;
    status: string;
    fulfillment: string;
    deliveryArea?: string;
    deliveryLandmark?: string;
    guestName?: string;
    guestPhone?: string;
    totalKes: number;
    items: Array<{
      productName: string;
      quantity: number;
      unitPriceKes: number;
    }>;
  };
}

const STATUS_STEPS = [
  { status: "PENDING", label: "Confirmed", icon: Smartphone, desc: "Order received and waiting for Clare" },
  { status: "CONFIRMED", label: "Confirmed", icon: Smartphone, desc: "Order verified and in queue" },
  { status: "BAKING", label: "Baking", icon: Flame, desc: "Clare is hand-crafting your pastries" },
  { status: "READY", label: "Ready", icon: Package, desc: "Bakes are fresh out of the oven" },
  { status: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck, desc: "Courier is heading your way" },
  { status: "DELIVERED", label: "Delivered", icon: CheckCircle2, desc: "Enjoy your fresh bakes!" },
  { status: "COLLECTED", label: "Collected", icon: CheckCircle2, desc: "Enjoy your fresh bakes!" },
];

export function OrderTrackingClient({ initialOrder }: OrderTrackingClientProps) {
  const { formatPrice } = useCurrency();
  const order = initialOrder;

  const currentStatusIndex = STATUS_STEPS.findIndex(s => s.status === order.status);

  // Setup Supabase Realtime for order updates
  useEffect(() => {
    // This is where real Supabase logic would go: 
    // supabase.channel(`order-${order.id}`).on('postgres_changes', ...).subscribe()
  }, [order.id]);

  return (
    <div className="min-h-screen pt-40 pb-24 bg-cp-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-cp-border pb-12">
             <div className="space-y-4">
                <nav className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">
                   <Link href="/account" className="hover:text-cp-accent transition-colors">My Account</Link>
                   <ChevronRight className="w-3 h-3" />
                   <span className="text-cp-accent">Track Order</span>
                </nav>
                <h1 className="font-display text-5xl md:text-8xl font-black text-cp-text leading-[0.9] tracking-tighter uppercase italic">
                   Track Your <br />
                   <span className="text-cp-accent not-italic">Baking Journey.</span>
                </h1>
             </div>
             <div className="text-right">
                <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted mb-1">Order Identifier</span>
                <span className="text-xl font-mono font-bold text-cp-text">#{order.id.slice(-6).toUpperCase()}</span>
             </div>
          </div>

          {/* Main Status Timeline */}
          <div className="bg-white border border-cp-border rounded-3xl p-8 md:p-12 shadow-2xl space-y-16">
             <div className="flex flex-col space-y-12">
                {STATUS_STEPS.map((step, idx) => {
                   const isCompleted = idx < currentStatusIndex || order.status === "DELIVERED" || order.status === "COLLECTED";
                   const isActive = idx === currentStatusIndex && order.status !== "DELIVERED" && order.status !== "COLLECTED";
                   const isUpcoming = idx > currentStatusIndex;

                   // Only show meaningful sequence (simplified for user)
                   if (idx === 0 && order.status !== "PENDING") return null;

                   return (
                      <div key={idx} className="relative flex gap-8">
                         {/* Connector Line */}
                         {idx < STATUS_STEPS.length - 1 && (
                            <div className={cn(
                               "absolute left-6 top-12 w-0.5 h-16 transition-colors duration-1000",
                               isCompleted ? "bg-cp-accent" : "bg-cp-border"
                            )} />
                         )}

                         {/* Status Icon */}
                         <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 border-2",
                            isCompleted ? "bg-cp-accent text-white border-cp-accent shadow-md" : 
                            isActive ? "bg-white text-cp-accent border-cp-accent ring-8 ring-cp-accent/5" : 
                            "bg-cp-surface text-cp-border border-cp-border opacity-50"
                         )}>
                            <step.icon className="w-5 h-5" />
                         </div>

                         {/* Status Info */}
                         <div className={cn(
                            "flex flex-col gap-1 transition-opacity duration-500",
                            isUpcoming ? "opacity-40" : "opacity-100"
                         )}>
                            <span className={cn(
                               "text-[10px] font-mono font-bold uppercase tracking-widest",
                               isActive ? "text-cp-accent" : "text-cp-text-muted"
                            )}>
                               {step.label}
                            </span>
                            <h3 className="font-display text-2xl font-bold text-cp-text">{step.desc}</h3>
                            {isActive && (
                               <div className="flex items-center gap-2 mt-2 py-1.5 px-3 bg-cp-accent/5 rounded-full w-fit border border-cp-accent/10">
                                  <Clock className="w-3.5 h-3.5 text-cp-accent animate-pulse" />
                                  <span className="text-[10px] font-bold text-cp-accent uppercase tracking-widest">Happening Now</span>
                               </div>
                            )}
                         </div>
                      </div>
                   );
                })}
             </div>
          </div>

          {/* Order Meta & Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
             {/* Delivery Details */}
             <div className="bg-cp-surface/50 border border-cp-border rounded-2xl p-8 space-y-6 shadow-sm">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text">Fulfillment</h4>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white border border-cp-border rounded-xl flex items-center justify-center text-cp-accent shadow-sm">
                         <MapPin className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                         <span className="block text-sm font-bold text-cp-text uppercase tracking-wide">{order.fulfillment}</span>
                         <p className="text-xs text-cp-text-muted leading-relaxed font-body">
                            {order.fulfillment === "DELIVERY" 
                              ? `${order.deliveryArea} — ${order.deliveryLandmark || "Standard Delivery"}`
                              : "Pickup location provided upon readiness."
                            }
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Order Contact */}
             <div className="bg-cp-surface/50 border border-cp-border rounded-2xl p-8 space-y-6 shadow-sm">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text">Recipient</h4>
                   <div className="space-y-1">
                      <span className="block text-sm font-bold text-cp-text uppercase tracking-wide">{order.guestName || "Customer"}</span>
                      <p className="text-xs text-cp-text-muted leading-relaxed font-body">
                         {order.guestPhone}
                      </p>
                   </div>
                </div>
             </div>

             {/* Pricing Recap */}
             <div className="bg-cp-surface/50 border border-cp-border rounded-2xl p-8 flex flex-col justify-between shadow-sm">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text">Financials</h4>
                <div className="space-y-1 pt-4">
                   <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Final Total Paid</span>
                   <span className="text-3xl font-mono font-bold text-cp-accent">
                      {formatPrice(order.totalKes)}
                   </span>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-8 border-t border-cp-border">
             <Link href="/menu" className="btn-primary flex items-center gap-4 py-6 rounded-full px-12 font-black uppercase tracking-widest">
                Order More Bakes
                <ArrowRight className="w-5 h-5" />
             </Link>
             <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">
                Need Help? Clare is a phone call away: +254 724 848228
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
