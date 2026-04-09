"use client";

import React from "react";
import { User, Phone, Mail, ArrowLeft, ArrowRight, LogIn } from "lucide-react";

import { CheckoutFormData } from "@/types/checkout";

interface StepDetailsProps {
  data: CheckoutFormData;
  updateData: (data: Partial<CheckoutFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDetails({ data, updateData, onNext, onBack }: StepDetailsProps) {
  const isFormValid = data.fullName && data.phone && data.phone.length >= 10;

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Left: Login Prompt */}
        <div className="md:w-1/3 p-8 bg-bp-surface border border-bp-border rounded-2xl space-y-6">
           <h3 className="font-display text-2xl font-bold">Already part of the family?</h3>
           <p className="text-sm text-bp-text-muted leading-relaxed">
             Sign in to use your saved addresses and track your baking journey easily.
           </p>
           <button 
             onClick={() => {}} // Integration for login
             className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-bp-cta text-bp-cta rounded-md font-bold text-xs uppercase tracking-widest hover:bg-bp-cta hover:text-bp-cta-text transition-all"
           >
             <LogIn className="w-4 h-4" />
             Sign In
           </button>
        </div>

        {/* Right: Guest Fields */}
        <div className="flex-grow space-y-8">
           <div className="space-y-2">
              <h2 className="font-display text-4xl font-bold text-bp-text">Who are we baking for?</h2>
              <p className="text-sm text-bp-text-muted">Michael will use these details to contact you about your order.</p>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Full Name*</label>
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
                   <input 
                     value={data.fullName}
                     onChange={(e) => updateData({ fullName: e.target.value })}
                     className="w-full bg-bp-surface border border-bp-border rounded-md pl-11 pr-4 py-3.5 text-sm focus:ring-1 focus:ring-bp-accent outline-none"
                     placeholder="e.g. Michael Aderi"
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Phone Number*</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
                       <input 
                         value={data.phone}
                         onChange={(e) => updateData({ phone: e.target.value })}
                         className="w-full bg-bp-surface border border-bp-border rounded-md pl-11 pr-4 py-3.5 text-sm focus:ring-1 focus:ring-bp-accent outline-none"
                         placeholder="+254 7..."
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Email (Optional)</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
                       <input 
                         value={data.email}
                         onChange={(e) => updateData({ email: e.target.value })}
                         className="w-full bg-bp-surface border border-bp-border rounded-md pl-11 pr-4 py-3.5 text-sm focus:ring-1 focus:ring-bp-accent outline-none"
                         placeholder="your@email.com"
                       />
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                 <input 
                   type="checkbox"
                   id="save-details"
                   checked={data.saveDetails}
                   onChange={(e) => updateData({ saveDetails: e.target.checked })}
                   className="w-4 h-4 rounded border-bp-border text-bp-accent focus:ring-bp-accent"
                 />
                 <label htmlFor="save-details" className="text-xs font-medium text-bp-text-muted select-none cursor-pointer">
                    Save these details for my next order
                 </label>
              </div>
           </div>
        </div>
      </div>

      <div className="pt-12 border-t border-bp-border/50 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-bp-text-muted hover:text-bp-text transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Order
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="btn-primary flex items-center gap-3 group"
        >
          Summary
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
