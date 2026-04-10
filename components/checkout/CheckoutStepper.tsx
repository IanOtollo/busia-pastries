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
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cp-border -translate-y-1/2 z-0" />
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-cp-accent -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(230,172,135,0.5)]" 
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
                  ? "bg-cp-accent text-cp-cta-text shadow-lg shadow-cp-accent/20" 
                  : isActive 
                    ? "bg-cp-cta text-cp-cta-text ring-4 ring-cp-cta/10 animate-pulse shadow-xl shadow-cp-cta/20" 
                    : "bg-cp-surface border border-cp-border text-cp-text-muted"
              )}
            >
              <step.icon className={cn("w-5 h-5", isActive && "animate-bounce")} />
            </div>
            <span 
              className={cn(
                "hidden md:block text-[10px] font-mono font-bold uppercase tracking-widest transition-colors duration-500 italic",
                isActive || isCompleted ? "text-cp-text" : "text-cp-text-muted"
              )}
            >
              {step.label}.
            </span>
          </div>
        );
      })}
    </div>
  );
}
