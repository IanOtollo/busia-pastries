import React from "react";
import { Wheat, Flame, Package, Smartphone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const STEPS = [
  { icon: Wheat, label: "Your Order" },
  { icon: Flame, label: "Your Details" },
  { icon: Package, label: "Summary" },
  { icon: Smartphone, label: "Payment" },
  { icon: CheckCircle2, label: "Confirmed" },
];

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="relative flex items-center justify-between">
      {/* Progress Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-bp-border -translate-y-1/2 z-0" />
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-bp-accent -translate-y-1/2 z-0 transition-all duration-700 ease-in-out" 
        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
      />

      {STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                isCompleted 
                  ? "bg-bp-accent text-white shadow-md" 
                  : isActive 
                    ? "bg-bp-cta text-bp-cta-text ring-4 ring-bp-cta/20 animate-pulse" 
                    : "bg-white border-2 border-bp-border text-bp-border"
              )}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <span 
              className={cn(
                "hidden md:block text-[10px] font-mono font-bold uppercase tracking-widest transition-colors duration-500",
                isActive || isCompleted ? "text-bp-text" : "text-bp-text-muted"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
