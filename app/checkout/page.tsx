"use client";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { StepIndicator } from "@/components/checkout/StepIndicator";
import { StepMix } from "@/components/checkout/StepMix";
import { StepBake } from "@/components/checkout/StepBake";
import { StepBox } from "@/components/checkout/StepBox";
import { StepPay } from "@/components/checkout/StepPay";
import { StepDone } from "@/components/checkout/StepDone";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define strict types for checkout data
interface CheckoutData {
  fulfillment: "DELIVERY" | "PICKUP";
  deliveryAddress: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
}

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [trackingToken, setTrackingToken] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const [formData, setFormData] = useState<CheckoutData>({
    fulfillment: "DELIVERY",
    deliveryAddress: "",
    notes: "",
    name: "",
    email: "",
    phone: "",
  });

  const updateFormData = (newData: Partial<CheckoutData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleCreateOrder = async () => {
    setIsCreatingOrder(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({
            sanityId: i.sanityId,
            productName: i.productName,
            quantity: i.quantity,
            unitPriceKes: i.unitPriceKes
          })),
          displayTotal: items.reduce((acc, i) => acc + (i.unitPriceKes * i.quantity), 0),
          ...formData
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setOrderId(data.orderId);
      setTrackingToken(data.trackingToken);
      setCurrentStep(4); // Move to Payment step
    } catch {
      alert("Failed to create order. Please try again.");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (items.length === 0 && currentStep < 5) {
     return (
        <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          <div className="w-32 h-32 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-muted)]">
            <ShoppingBag className="w-16 h-16" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="font-display text-4xl font-bold">Tray is empty</h1>
            <p className="text-[var(--color-muted)] max-w-xs mx-auto">Please add items to your cart before checking out.</p>
          </div>
          <Link href="/menu">
             <Button size="lg" className="h-14 px-10 font-bold rounded-2xl">Return to Menu</Button>
          </Link>
        </div>
     );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {currentStep < 5 && (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <button onClick={() => router.back()} className="flex items-center text-sm font-bold text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
                     <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </button>
                  <h1 className="font-display text-4xl font-bold">Checkout</h1>
                  <div className="w-4" /> {/* Spacer */}
               </div>
               <StepIndicator currentStep={currentStep} />
            </div>
          )}

          <div className="bg-white border border-[var(--color-border)] rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-[var(--color-accent)]/5">
            {currentStep === 1 && <StepMix data={formData} onNext={updateFormData} />}
            {currentStep === 2 && <StepBake data={formData} onNext={updateFormData} onBack={() => setCurrentStep(1)} />}
            {currentStep === 3 && (
               <StepBox 
                  data={formData} 
                  onNext={handleCreateOrder} 
                  onBack={() => setCurrentStep(2)} 
                  onJumpToStep={(s) => setCurrentStep(s)}
               />
            )}
            {currentStep === 4 && orderId && (
              <StepPay 
                orderId={orderId}
                data={formData}
                onNext={() => setCurrentStep(5)}
                onBack={() => setCurrentStep(3)}
              />
            )}
            {currentStep === 5 && orderId && trackingToken && (
               <StepDone 
                  orderId={orderId} 
                  trackingToken={trackingToken}
                  data={formData}
               />
            )}
          </div>
        </div>
      </div>

      {isCreatingOrder && (
         <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center space-y-4">
               <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
               <p className="font-bold text-[var(--color-muted)]">Creating your order...</p>
            </div>
         </div>
      )}
    </div>
  );
}
