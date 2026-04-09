"use client";
import React from "react";
import { ArrowLeft, Wallet, Banknote, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MpesaPayment } from "./MpesaPayment";
import { useCart } from "@/hooks/useCart";
import { calculateDeliveryFee } from "@/lib/utils/currency";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface StepPayProps {
  onNext: () => void;
  onBack: () => void;
  data: {
    fulfillment: "DELIVERY" | "PICKUP";
    phone: string;
  };
  orderId: string;
}

export function StepPay({ onNext, onBack, data, orderId }: StepPayProps) {
  const { subtotalKes } = useCart();
  const [method, setMethod] = React.useState<"MPESA" | "CASH">("MPESA");

  const deliveryFeeKes = calculateDeliveryFee(data.fulfillment, subtotalKes);
  const totalKes = subtotalKes + deliveryFeeKes;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-[var(--color-muted)]">
          Payment Method
        </h3>
        <p className="text-sm text-[var(--color-text)]">
          Select how you&apos;d like to pay for your fresh bakes.
        </p>
      </div>

      <div className="flex p-1 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
        <button
          onClick={() => setMethod("MPESA")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all",
            method === "MPESA"
              ? "bg-[var(--color-bg)] text-[var(--color-accent)] shadow-sm border border-[var(--color-border)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
          )}
        >
          <Wallet className="w-4 h-4" />
          M-Pesa
        </button>
        <button
          onClick={() => setMethod("CASH")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all",
            method === "CASH"
              ? "bg-[var(--color-bg)] text-[var(--color-accent)] shadow-sm border border-[var(--color-border)]"
              : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
          )}
        >
          <Banknote className="w-4 h-4" />
          Pay on Delivery
        </button>
      </div>

      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {method === "MPESA" ? (
            <motion.div
              key="mpesa"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <MpesaPayment 
                amountKes={totalKes}
                orderId={orderId}
                customerPhone={data.phone}
                onSuccess={onNext}
              />
            </motion.div>
          ) : (
            <motion.div
              key="cash"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl text-center space-y-6">
                 <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Banknote className="w-8 h-8" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="font-bold text-lg">Pay on Delivery / Pickup</h4>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                       You can pay with Cash or M-Pesa to the delivery person. 
                       Please have the exact amount ready if paying in cash.
                    </p>
                 </div>
                 <div className="p-4 bg-white/50 rounded-xl border border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-muted)] mb-1">Amount to pay</p>
                    <p className="text-xl font-mono font-bold text-[var(--color-text)]">
                       {totalKes.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                    </p>
                 </div>
                 <Button fullWidth size="lg" onClick={onNext} className="h-14">
                    Confirm Order & Pay Later
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-2 py-4 border-t border-[var(--color-border)]">
         <ShieldCheck className="w-5 h-5 text-emerald-500" />
         <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-widest">
            Safe & Secure Checkout
         </span>
      </div>

      <div className="flex justify-start">
         <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Review Summary
         </Button>
      </div>
    </div>
  );
}
