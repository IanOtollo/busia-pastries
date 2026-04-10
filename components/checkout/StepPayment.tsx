"use client";

import React, { useState } from "react";
import { Smartphone, Banknote, Loader2, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import toast from "react-hot-toast";
import { CheckoutFormData } from "@/types/checkout";

import { PayHeroPayment } from "./PayHeroPayment";

interface StepPaymentProps {
  data: CheckoutFormData;
  orderId: string;
  amountKes: number;
  onNext: () => void;
}

export function StepPayment({ data, orderId, amountKes, onNext }: StepPaymentProps) {
  const [method, setMethod] = useState<"MPESA" | "CASH">("MPESA");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCashOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
       toast.success("Order confirmed with Cash on Delivery/Pickup.");
       onNext();
    }, 1000);
  };

  return (
    <div className="space-y-12 animate-fade-in relative z-10">
      <div className="space-y-4">
        <h2 className="font-display text-5xl md:text-7xl font-black text-cp-text leading-[0.9] tracking-tighter uppercase italic">
          Payment <br />
          <span className="text-cp-accent not-italic">Gateway.</span>
        </h2>
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-cp-accent">Choose your preferred path</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* M-Pesa Option */}
         <button
            disabled={isProcessing}
            onClick={() => setMethod("MPESA")}
            className={cn(
              "group relative flex flex-col items-start p-10 rounded-3xl border transition-all text-left overflow-hidden",
              method === "MPESA"
                ? "border-cp-accent bg-white shadow-2xl ring-1 ring-cp-accent/20"
                : "border-cp-border bg-cp-surface hover:border-cp-accent/30 hover:shadow-xl"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500",
              method === "MPESA" ? "bg-cp-accent text-white scale-110 shadow-lg shadow-cp-accent/20" : "bg-cp-border text-cp-text-muted"
            )}>
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-cp-text uppercase tracking-tight italic">M-Pesa <span className="text-cp-accent not-italic">Express.</span></h3>
            <p className="text-xs font-medium text-cp-text-muted mt-3 leading-relaxed italic">
              Instant activation via STK Push. Securely handled by PayHero.
            </p>
            {method === "MPESA" && (
              <motion.div layoutId="active-pill" className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cp-accent shadow-sm shadow-cp-accent/50" />
            )}
         </button>

         {/* Cash Option */}
         <button
            disabled={isProcessing}
            onClick={() => setMethod("CASH")}
            className={cn(
              "group relative flex flex-col items-start p-10 rounded-3xl border transition-all text-left overflow-hidden",
              method === "CASH"
                ? "border-cp-accent bg-white shadow-2xl ring-1 ring-cp-accent/20"
                : "border-cp-border bg-cp-surface hover:border-cp-accent/30 hover:shadow-xl"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500",
              method === "CASH" ? "bg-cp-accent text-white scale-110 shadow-lg shadow-cp-accent/20" : "bg-cp-border text-cp-text-muted"
            )}>
              <Banknote className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-cp-text uppercase tracking-tight italic">Cash on <span className="text-cp-accent not-italic">Fulfillment.</span></h3>
            <p className="text-xs font-medium text-cp-text-muted mt-3 leading-relaxed italic">
              Pay upon collection or delivery. Simple and transparent.
            </p>
            {method === "CASH" && (
              <motion.div layoutId="active-pill" className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cp-accent shadow-sm shadow-cp-accent/50" />
            )}
         </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        {method === "MPESA" && (
           <PayHeroPayment 
              amountKes={amountKes} 
              orderId={orderId} 
              customerPhone={data.phone} 
              onSuccess={onNext} 
           />
        )}

        {method === "CASH" && (
           <div className="bg-white border border-cp-border/50 rounded-3xl p-10 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cp-accent/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="flex items-center gap-4 p-6 bg-cp-surface rounded-2xl border border-cp-border shadow-inner">
                 <AlertCircle className="w-6 h-6 text-cp-accent shrink-0" />
                 <p className="text-sm font-medium text-cp-text-muted leading-relaxed italic">
                    You've selected Cash payment. Please ensure you have the exact amount ready upon delivery or collection for a smooth experience.
                 </p>
              </div>
              <button
                 onClick={handleCashOrder}
                 disabled={isProcessing}
                 className="btn-primary w-full flex items-center justify-center gap-4 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-[0.98] transition-all"
              >
                 Confirm Order (Cash)
                 <ChevronRight className="w-6 h-6" />
              </button>
           </div>
        )}
      </div>
    </div>
  );
}
