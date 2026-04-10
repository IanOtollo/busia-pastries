"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils/currency";

interface PayHeroPaymentProps {
  amountKes: number;
  orderId: string;
  customerPhone: string;
  onSuccess: () => void;
}

export function PayHeroPayment({ amountKes, orderId, customerPhone, onSuccess }: PayHeroPaymentProps) {
  const [status, setStatus] = useState<"IDLE" | "PENDING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const initiatePayment = async () => {
    setStatus("PENDING");
    setErrorMessage("");
    try {
      const res = await fetch("/api/checkout/payhero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          phone: customerPhone,
          amount: amountKes,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // Successfully initiated STK push via PayHero, now poll for status
      // Note: In production, the callback/webhook handles the definitive update,
      // but polling provides immediate feedback to the UI.
      pollStatus();
    } catch (err: unknown) {
      setStatus("ERROR");
      setErrorMessage(err instanceof Error ? err.message : "Failed to initiate payment. Please try again.");
    }
  };

  const pollStatus = async () => {
    let attempts = 0;
    const maxAttempts = 20; // ~1 minute

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/payment-status`);
        const data = await res.json();

        if (data.status === "COMPLETED" || data.status === "PAID") {
          clearInterval(interval);
          setStatus("SUCCESS");
          setTimeout(onSuccess, 2000);
        } else if (data.status === "FAILED") {
          clearInterval(interval);
          setStatus("ERROR");
          setErrorMessage("Payment was declined or timed out.");
        }
      } catch {
        // Silently continue polling
      }

      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        // We don't necessarily error out here if we expect the webhook might still come,
        // but for UX we show a message.
        setStatus("ERROR");
        setErrorMessage("Payment status check timed out. If you entered your PIN, your order will update shortly.");
      }
    }, 4000);
  };

  return (
    <div className="bg-white border border-cp-border/50 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden group">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cp-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-cp-accent/10 transition-colors" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-2">
          <h4 className="font-display text-2xl font-bold text-cp-text uppercase tracking-tight italic">Secure <span className="text-cp-accent not-italic">Payment.</span></h4>
          <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.2em]">M-Pesa STK Push via PayHero</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-cp-accent/10 border border-cp-accent/20 flex items-center justify-center shadow-inner">
           <Phone className="w-7 h-7 text-cp-accent" />
        </div>
      </div>

      <div className="p-6 bg-cp-surface rounded-2xl flex items-center justify-between border border-cp-border shadow-sm">
         <span className="text-[10px] font-bold text-cp-text-muted uppercase tracking-widest italic">Total Due</span>
         <span className="text-2xl font-mono font-bold text-cp-accent tracking-tighter italic">{formatPrice(amountKes, "KES", 1)}</span>
      </div>

      <div className="space-y-4 relative z-10">
        {status === "IDLE" && (
           <Button 
            fullWidth 
            onClick={initiatePayment} 
            className="h-16 font-black bg-cp-cta hover:bg-cp-cta/90 border-none text-cp-cta-text shadow-xl active:scale-[0.98] transition-all rounded-2xl uppercase tracking-[0.2em] text-xs"
           >
              Initiate Payment
           </Button>
        )}

        {status === "PENDING" && (
           <div className="text-center space-y-6 py-6 animate-pulse">
              <div className="relative inline-block">
                <Loader2 className="w-12 h-12 animate-spin text-cp-accent mx-auto" />
                <div className="absolute inset-0 bg-cp-accent/20 blur-xl rounded-full" />
              </div>
              <div className="space-y-2">
                 <p className="font-display text-xl font-bold uppercase italic tracking-tight">Handshaking...</p>
                 <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-widest">Check your phone to enter M-Pesa PIN</p>
              </div>
           </div>
        )}

        {status === "SUCCESS" && (
           <div className="text-center space-y-6 py-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 rounded-full bg-cp-success/10 text-cp-success flex items-center justify-center mx-auto border border-cp-success/30 shadow-lg shadow-cp-success/20">
                 <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <p className="font-display text-2xl font-black text-cp-success uppercase italic tracking-tighter">Perfect.</p>
                <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-widest">Payment received with love.</p>
              </div>
           </div>
        )}

        {status === "ERROR" && (
           <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-4 text-rose-800 shadow-sm">
                 <AlertCircle className="w-6 h-6 shrink-0 text-rose-500 mt-1" />
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest">Something went wrong</p>
                    <p className="text-sm font-medium leading-relaxed italic">{errorMessage}</p>
                 </div>
              </div>
              <Button 
                fullWidth 
                variant="outline" 
                onClick={initiatePayment}
                className="h-14 rounded-xl border-cp-border font-bold uppercase tracking-widest text-[10px] hover:bg-cp-surface transition-colors"
              >
                 Try Again
              </Button>
           </div>
        )}
      </div>

      <div className="pt-4 border-t border-cp-border/30">
        <p className="text-[9px] text-cp-text-muted text-center leading-relaxed font-bold uppercase tracking-[0.1em] opacity-60">
          AN STK PUSH WILL BE SENT TO <span className="text-cp-accent">{customerPhone}</span>.
          PLEASE KEEP YOUR PHONE ACTIVE AND ENTER YOUR PIN.
        </p>
      </div>
    </div>
  );
}
