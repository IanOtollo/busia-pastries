"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { StepOrder } from "@/components/checkout/StepOrder";
import { StepDetails } from "@/components/checkout/StepDetails";
import { StepSummary } from "@/components/checkout/StepSummary";
import { StepPayment } from "@/components/checkout/StepPayment";
import { StepConfirmed } from "@/components/checkout/StepConfirmed";
import toast from "react-hot-toast";

export type FulfillmentMode = "DELIVERY" | "PICKUP";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const { currency } = useCurrency();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    fulfillment: "DELIVERY" as FulfillmentMode,
    deliveryArea: "",
    deliveryLandmark: "",
    notes: "",
    fullName: "",
    email: "",
    phone: "",
    saveDetails: false,
    paymentMethod: "MPESA" as "MPESA" | "CASH",
  });

  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (items.length === 0 && step < 5) {
      router.push("/cart");
    }
  }, [items, step, router]);

  if (!mounted || items.length === 0 && step < 5) return null;

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleUpdateForm = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items,
          totalKes: getTotal() + (formData.fulfillment === "DELIVERY" ? 100 : 0),
          deliveryFeeKes: formData.fulfillment === "DELIVERY" ? 100 : 0,
          subtotalKes: getTotal(),
          displayCurrency: currency,
        }),
      });

      const resData = (await response.json()) as { success: boolean; error?: string; data?: { id: string } };
      if (!resData.success || !resData.data) throw new Error(resData.error || "Failed to place order");

      setOrderId(resData.data.id);
      nextStep(); // Advance to payment or confirmed
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-bp-bg">
      <div className="container mx-auto px-4 md:px-6">
        {/* Baking Journey Stepper */}
        <div className="max-w-4xl mx-auto mb-16">
          <CheckoutStepper currentStep={step} />
        </div>

        {/* Steps Container */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepOrder 
                  data={formData} 
                  updateData={handleUpdateForm} 
                  onNext={nextStep} 
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepDetails 
                   data={formData} 
                   updateData={handleUpdateForm} 
                   onNext={nextStep} 
                   onBack={prevStep}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepSummary 
                  data={formData} 
                  onNext={handlePlaceOrder} 
                  onBack={prevStep}
                />
              </motion.div>
            )}

            {step === 4 && orderId && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepPayment 
                  data={formData} 
                  orderId={orderId}
                  onNext={nextStep} 
                />
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <StepConfirmed 
                  orderId={orderId!} 
                  data={formData} 
                  onFinish={() => {
                    clearCart();
                    router.push(`/orders/${orderId}`);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
