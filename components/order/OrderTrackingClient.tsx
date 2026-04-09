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
    items: any[];
  };
}

const STATUS_STEPS = [
  { status: "PENDING", label: "Confirmed", icon: Smartphone, desc: "Order received and waiting for Michael" },
  { status: "CONFIRMED", label: "Confirmed", icon: Smartphone, desc: "Order verified and in queue" },
  { status: "BAKING", label: "Baking", icon: Flame, desc: "Michael is hand-crafting your pastries" },
  { status: "READY", label: "Ready", icon: Package, desc: "Bakes are fresh out of the oven" },
  { status: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck, desc: "Courier is heading your way" },
  { status: "DELIVERED", label: "Delivered", icon: CheckCircle2, desc: "Enjoy your fresh pastries!" },
  { status: "COLLECTED", label: "Collected", icon: CheckCircle2, desc: "Enjoy your fresh pastries!" },
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
    <div className="min-h-screen pt-32 pb-24 bg-bp-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-bp-border pb-12">
             <div className="space-y-4">
                <nav className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">
                   <Link href="/account" className="hover:text-bp-accent transition-colors">My Account</Link>
                   <ChevronRight className="w-3 h-3" />
                   <span className="text-bp-accent">Track Order</span>
                </nav>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-bp-text leading-none">
                   Track Your <br />
                   <span className="text-bp-accent italic">Baking Journey.</span>
                </h1>
             </div>
             <div className="text-right">
                <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted mb-1">Order Identifier</span>
                <span className="text-lg font-mono font-bold text-bp-text">#{order.id.slice(-6).toUpperCase()}</span>
             </div>
          </div>

          {/* Main Status Timeline */}
          <div className="bg-white border border-bp-border rounded-3xl p-8 md:p-12 shadow-sm space-y-16">
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
                               isCompleted ? "bg-bp-accent" : "bg-bp-border"
                            )} />
                         )}

                         {/* Status Icon */}
                         <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 border-2",
                            isCompleted ? "bg-bp-accent text-white border-bp-accent shadow-md" : 
                            isActive ? "bg-white text-bp-accent border-bp-accent ring-4 ring-bp-accent/10" : 
                            "bg-bp-surface text-bp-border border-bp-border opacity-50"
                         )}>
                            <step.icon className="w-5 h-5" />
                         </div>

                         {/* Status Info */}
                         <div className={cn(
                            "flex flex-col gap-1 transition-opacity duration-500",
                            isUpcoming ? "opacity-40" : "opacity-100"
                         )}>
                            <span className={cn(
                               "text-xs font-mono font-bold uppercase tracking-widest",
                               isActive ? "text-bp-accent" : "text-bp-text-muted"
                            )}>
                               {step.label}
                            </span>
                            <h3 className="font-display text-2xl font-bold text-bp-text">{step.desc}</h3>
                            {isActive && (
                               <div className="flex items-center gap-2 mt-2 py-1.5 px-3 bg-bp-accent/5 rounded-full w-fit border border-bp-accent/10">
                                  <Clock className="w-3.5 h-3.5 text-bp-accent animate-pulse" />
                                  <span className="text-[10px] font-bold text-bp-accent uppercase tracking-widest">Happening Now</span>
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
             <div className="bg-bp-surface/50 border border-bp-border rounded-2xl p-8 space-y-6">
                <div className="space-y-4">
                   <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text">Fulfillment</h4>
                   <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white border border-bp-border rounded-lg flex items-center justify-center text-bp-accent">
                         <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                         <span className="block text-sm font-bold">{order.fulfillment}</span>
                         <p className="text-xs text-bp-text-muted leading-relaxed">
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
             <div className="bg-bp-surface/50 border border-bp-border rounded-2xl p-8 space-y-6">
                <div className="space-y-4">
                   <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text">Recipient</h4>
                   <div className="space-y-1">
                      <span className="block text-sm font-bold">{order.guestName || "Customer"}</span>
                      <p className="text-xs text-bp-text-muted leading-relaxed">
                         {order.guestPhone}
                      </p>
                   </div>
                </div>
             </div>

             {/* Pricing Recap */}
             <div className="bg-bp-surface/50 border border-bp-border rounded-2xl p-8 flex flex-col justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text">Financials</h4>
                <div className="space-y-1 pt-4">
                   <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">Final Total Paid</span>
                   <span className="text-3xl font-mono font-bold text-bp-accent">
                      {formatPrice(order.totalKes)}
                   </span>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-8 border-t border-bp-border">
             <Link href="/menu" className="btn-primary flex items-center gap-3">
                Order More Bakes
                <ArrowRight className="w-5 h-5" />
             </Link>
             <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">
                Need Help? Michael is a phone call away: +254 724 848228
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
