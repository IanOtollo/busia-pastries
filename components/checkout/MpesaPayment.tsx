"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils/currency";

interface MpesaPaymentProps {
  amountKes: number;
  orderId: string;
  customerPhone: string;
  onSuccess: () => void;
}

export function MpesaPayment({ amountKes, orderId, customerPhone, onSuccess }: MpesaPaymentProps) {
  const [status, setStatus] = useState<"IDLE" | "PENDING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const initiatePayment = async () => {
    setStatus("PENDING");
    setErrorMessage("");
    try {
      const res = await fetch("/api/checkout/mpesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          phone: customerPhone.replace("+", ""),
          amount: amountKes,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      // Successfully initiated STK push, now poll for status
      pollStatus();
    } catch (err: unknown) {
      setStatus("ERROR");
      setErrorMessage(err instanceof Error ? err.message : "Failed to initiate M-Pesa payment");
    }
  };

  const pollStatus = async () => {
    let attempts = 0;
    const maxAttempts = 20; // ~1 minute

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/payment-status`);
        const data = await res.json();

        if (data.status === "COMPLETED") {
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
        setStatus("ERROR");
        setErrorMessage("Payment status check timed out. Please check your phone.");
      }
    }, 3000);
  };

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-3xl p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-bold text-lg">M-Pesa STK Push</h4>
          <p className="text-xs text-[var(--color-muted)]">Instant & Secure Payment</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
           <Phone className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      <div className="p-4 bg-[var(--color-surface)] rounded-2xl flex items-center justify-between">
         <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider">Amount</span>
         <span className="text-xl font-mono font-bold text-[var(--color-text)]">{formatPrice(amountKes, "KES", 1)}</span>
      </div>

      <div className="space-y-4">
        {status === "IDLE" && (
           <Button fullWidth onClick={initiatePayment} className="h-14 font-bold bg-[#00AEEF] hover:bg-[#008dbf] border-none text-white shadow-lg shadow-[#00AEEF]/20">
              Pay KES {amountKes.toLocaleString()}
           </Button>
        )}

        {status === "PENDING" && (
           <div className="text-center space-y-4 py-4">
              <Loader2 className="w-10 h-10 animate-spin text-[var(--color-accent)] mx-auto" />
              <div className="space-y-1">
                 <p className="font-bold">Waiting for Payment...</p>
                 <p className="text-xs text-[var(--color-muted)]">Check your phone to enter M-Pesa PIN</p>
              </div>
           </div>
        )}

        {status === "SUCCESS" && (
           <div className="text-center space-y-4 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                 <CheckCircle2 className="w-10 h-10" />
              </div>
              <p className="font-bold text-emerald-600 text-lg">Payment Successful!</p>
           </div>
        )}

        {status === "ERROR" && (
           <div className="space-y-4">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-800 text-sm">
                 <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                 <p>{errorMessage}</p>
              </div>
              <Button fullWidth variant="outline" onClick={initiatePayment}>
                 Try Again
              </Button>
           </div>
        )}
      </div>

      <p className="text-[10px] text-[var(--color-muted)] text-center leading-relaxed">
        By clicking Pay, an STK push will be sent to <span className="font-bold">{customerPhone}</span>.
        Please keep your phone active and enter your service provider PIN.
      </p>
    </div>
  );
}
