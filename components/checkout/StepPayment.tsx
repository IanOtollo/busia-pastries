"use client";

import React, { useState, useEffect } from "react";
import { Smartphone, Banknote, Loader2, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import toast from "react-hot-toast";

interface StepPaymentProps {
  data: any;
  orderId: string;
  onNext: () => void;
}

export function StepPayment({ data, orderId, onNext }: StepPaymentProps) {
  const [method, setMethod] = useState<"MPESA" | "CASH">("MPESA");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"IDLE" | "POLLING" | "SUCCESS" | "FAILED">("IDLE");

  const initiateMpesa = async () => {
    setIsProcessing(true);
    setPaymentStatus("POLLING");
    
    try {
      const res = await fetch("/api/checkout/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, phone: data.phone }),
      });
      
      const resData = await res.json();
      if (!resData.success) throw new Error(resData.error || "STK Push failed");

      toast.success("M-Pesa prompt sent to your phone!");
      
      // Poll for status
      startPolling(resData.checkoutId);
    } catch (error: any) {
      setIsProcessing(false);
      setPaymentStatus("FAILED");
      toast.error(error.message);
    }
  };

  const startPolling = async (checkoutId: string) => {
    let attempts = 0;
    const maxAttempts = 20; // ~60 seconds

    const interval = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(interval);
        setPaymentStatus("FAILED");
        setIsProcessing(false);
        toast.error("Payment timeout. Please check your phone or try again.");
        return;
      }

      try {
        const res = await fetch(`/api/checkout/mpesa/status?checkoutId=${checkoutId}`);
        const statusData = await res.json();
        
        if (statusData.status === "PAID") {
          clearInterval(interval);
          setPaymentStatus("SUCCESS");
          setIsProcessing(false);
          toast.success("Payment confirmed!");
          setTimeout(onNext, 1500);
        }
      } catch (e) {
        // Continue polling
      }
    }, 3000);
  };

  const handleCashOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
       toast.success("Order confirmed with Cash on Delivery/Pickup.");
       onNext();
    }, 1000);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-4">
        <h2 className="font-display text-4xl font-bold text-bp-text">Payment</h2>
        <p className="text-sm text-bp-text-muted">Choose your preferred payment method.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* M-Pesa Option */}
         <button
            disabled={isProcessing}
            onClick={() => setMethod("MPESA")}
            className={cn(
              "flex flex-col items-start p-8 rounded-2xl border-2 transition-all text-left",
              method === "MPESA"
                ? "border-bp-cta bg-bp-cta/5 ring-1 ring-bp-cta shadow-md"
                : "border-bp-border bg-white hover:border-bp-text-muted"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
              method === "MPESA" ? "bg-[#3A6B35] text-white" : "bg-bp-surface text-bp-text-muted"
            )}>
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-bp-text">M-Pesa STK Push</h3>
            <p className="text-sm text-bp-text-muted mt-2 leading-relaxed">
              Securely pay using your Safaricom M-Pesa. A prompt will appear on your phone.
            </p>
         </button>

         {/* Cash Option */}
         <button
            disabled={isProcessing}
            onClick={() => setMethod("CASH")}
            className={cn(
              "flex flex-col items-start p-8 rounded-2xl border-2 transition-all text-left",
              method === "CASH"
                ? "border-bp-cta bg-bp-cta/5 ring-1 ring-bp-cta shadow-md"
                : "border-bp-border bg-white hover:border-bp-text-muted"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors",
              method === "CASH" ? "bg-bp-cta text-bp-cta-text" : "bg-bp-surface text-bp-text-muted"
            )}>
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-bp-text">Cash on Fulfillment</h3>
            <p className="text-sm text-bp-text-muted mt-2 leading-relaxed">
              Pay in cash upon delivery or pickup.
            </p>
         </button>
      </div>

      {method === "MPESA" && (
        <div className="p-8 bg-white border border-bp-border rounded-2xl space-y-8">
           {paymentStatus === "POLLING" ? (
             <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
                <Loader2 className="w-12 h-12 text-bp-accent animate-spin" />
                <div className="space-y-2">
                   <h4 className="font-bold text-lg">Waiting for M-Pesa...</h4>
                   <p className="text-sm text-bp-text-muted">Please enter your PIN on your phone ({data.phone}).</p>
                </div>
             </div>
           ) : paymentStatus === "SUCCESS" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
                 <CheckCircle2 className="w-12 h-12 text-bp-success" />
                 <h4 className="font-bold text-lg">Payment Confirmed!</h4>
              </div>
           ) : (
              <div className="space-y-6">
                 <div className="flex items-center gap-4 p-4 bg-bp-bg rounded-xl border border-bp-border">
                    <AlertCircle className="w-5 h-5 text-bp-accent" />
                    <p className="text-xs text-bp-text-muted leading-relaxed">
                       Ensure your phone is unlocked and ready to receive the M-Pesa prompt.
                    </p>
                 </div>
                 <button
                    onClick={initiateMpesa}
                    disabled={isProcessing}
                    className="btn-primary w-full flex items-center justify-center gap-3"
                 >
                    Send M-Pesa Prompt
                    <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
           )}
        </div>
      )}

      {method === "CASH" && (
         <div className="space-y-6">
            <button
               onClick={handleCashOrder}
               disabled={isProcessing}
               className="btn-primary w-full flex items-center justify-center gap-3"
            >
               Confirm Order (Cash)
               <ChevronRight className="w-5 h-5" />
            </button>
         </div>
      )}
    </div>
  );
}
