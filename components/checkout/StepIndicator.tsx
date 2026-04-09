import React from "react";
import { Wheat, Flame, Package, CreditCard, CheckCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { icon: Wheat, label: "Mix" },
  { icon: Flame, label: "Bake" },
  { icon: Package, label: "Box It" },
  { icon: CreditCard, label: "Pay" },
  { icon: CheckCircle, label: "Done" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto relative">
        {/* Background Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--color-border)] -translate-y-1/2 z-0" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-[var(--color-accent)] -translate-y-1/2 z-0 transition-all duration-500 ease-in-out" 
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {/* Icons */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          const isPending = currentStep < stepNumber;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center gap-3">
              <div 
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-[var(--color-bg)]",
                  isCompleted && "bg-[var(--color-accent)] border-[var(--color-accent)] text-[var(--color-cta-text)]",
                  isActive && "border-[var(--color-accent)] text-[var(--color-accent)] scale-110 shadow-lg shadow-[var(--color-accent)]/20",
                  isPending && "border-[var(--color-border)] text-[var(--color-muted)]"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <step.icon className={cn("w-5 h-5", isActive ? "animate-pulse" : "")} />
                )}
              </div>
              
              <span 
                className={cn(
                  "text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-center",
                  isActive ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
