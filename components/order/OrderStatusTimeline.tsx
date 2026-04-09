"use client";
import React from "react";
import { Check, Clock, Flame, Package, Truck, CheckCircle2 } from "lucide-react";
import { OrderStatus } from "@/types/product";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface OrderStatusTimelineProps {
  status: OrderStatus;
}

const statusSteps: { status: OrderStatus; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { status: "PENDING", label: "Pending", icon: Clock },
  { status: "CONFIRMED", label: "Confirmed", icon: Check },
  { status: "BAKING", label: "In Oven", icon: Flame },
  { status: "READY", label: "Ready", icon: Package },
  { status: "OUT_FOR_DELIVERY", label: "On Way", icon: Truck },
  { status: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

export function OrderStatusTimeline({ status }: OrderStatusTimelineProps) {
  const currentStepIndex = statusSteps.findIndex((s) => s.status === status);
  
  if (currentStepIndex === -1 && status !== "CANCELLED") return null;

  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col items-start gap-0 mx-auto max-w-lg">
        <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-[var(--color-border)] z-0" />
        
        <motion.div 
           initial={{ height: 0 }}
           animate={{ height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
           className="absolute left-[19px] top-6 w-0.5 bg-[var(--color-accent)] z-0 transition-all duration-1000 ease-in-out"
        />

        {statusSteps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          if (status === "CANCELLED" && index > 0) return null;

          return (
            <div key={index} className="relative z-10 flex items-center gap-6 pb-12 last:pb-0 group">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-[var(--color-bg)]",
                  isCompleted && "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-sm",
                  isActive && "border-[var(--color-accent)] text-[var(--color-accent)] scale-110 shadow-lg shadow-[var(--color-accent)]/20 animate-pulse",
                  isPending && "border-[var(--color-border)] text-[var(--color-muted)]"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <step.icon className="w-5 h-5" />}
              </div>

              <div className="space-y-1">
                 <p className={cn(
                    "text-sm font-bold tracking-tight uppercase",
                    isActive ? "text-[var(--color-accent)]" : isPending ? "text-[var(--color-muted)]" : "text-[var(--color-text)]"
                 )}>
                    {step.label}
                 </p>
                 {isActive && (
                    <motion.p 
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="text-xs text-[var(--color-muted)] font-medium animate-pulse"
                    >
                       {status === "BAKING" ? "Almost there! Your pastry is rising." : 
                        status === "PENDING" ? "We're checking our availability." :
                        status === "OUT_FOR_DELIVERY" ? "The rider is close by." :
                        "This is the current stage."}
                    </motion.p>
                 )}
              </div>
            </div>
          );
        })}

        {status === "CANCELLED" && (
           <div className="relative z-10 flex items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center border-2 border-rose-500">
                 <XIcon className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                 <p className="text-sm font-bold text-rose-500 uppercase">Order Cancelled</p>
                 <p className="text-xs text-[var(--color-muted)]">This order will not be fulfilled.</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  )
}
