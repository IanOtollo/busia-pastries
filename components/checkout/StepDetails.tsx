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
        <div className="md:w-1/3 p-10 bg-cp-surface border border-cp-border rounded-3xl space-y-6 shadow-xl">
           <h3 className="font-display text-2xl font-bold text-cp-text">Already part of the family?</h3>
           <p className="text-sm text-cp-text-muted leading-relaxed font-body">
             Sign in to use your saved addresses and track your baking journey easily.
           </p>
           <button 
             onClick={() => {}} // Integration for login
             className="w-full flex items-center justify-center gap-2 py-4 border-2 border-cp-accent text-cp-accent rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-cp-accent hover:text-white transition-all duration-500"
           >
             <LogIn className="w-4 h-4" />
             Sign In
           </button>
        </div>

        {/* Right: Guest Fields */}
        <div className="flex-grow space-y-10">
           <div className="space-y-2">
              <h2 className="font-display text-4xl md:text-6xl font-black text-cp-text leading-[0.9] tracking-tighter uppercase italic">
                Who are we <br />
                <span className="text-cp-accent not-italic">Baking For?</span>
              </h2>
              <p className="text-lg text-cp-text-muted font-body italic">Clare will use these details to contact you about your order.</p>
           </div>

           <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Full Name*</label>
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cp-text-muted" />
                   <input 
                     value={data.fullName}
                     onChange={(e) => updateData({ fullName: e.target.value })}
                     className="w-full bg-cp-surface border border-cp-border rounded-xl pl-11 pr-4 py-4 text-sm focus:ring-2 focus:ring-cp-accent outline-none transition-all"
                     placeholder="e.g. Sarah Wanjiku"
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Phone Number*</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cp-text-muted" />
                       <input 
                         value={data.phone}
                         onChange={(e) => updateData({ phone: e.target.value })}
                         className="w-full bg-cp-surface border border-cp-border rounded-xl pl-11 pr-4 py-4 text-sm focus:ring-2 focus:ring-cp-accent outline-none transition-all"
                         placeholder="+254 7..."
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-cp-text-muted">Email (Optional)</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cp-text-muted" />
                       <input 
                         value={data.email}
                         onChange={(e) => updateData({ email: e.target.value })}
                         className="w-full bg-cp-surface border border-cp-border rounded-xl pl-11 pr-4 py-4 text-sm focus:ring-2 focus:ring-cp-accent outline-none transition-all"
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
                   className="w-4 h-4 rounded border-cp-border text-cp-accent focus:ring-cp-accent cursor-pointer"
                 />
                 <label htmlFor="save-details" className="text-xs font-bold text-cp-text-muted select-none cursor-pointer uppercase tracking-widest">
                    Save these details for my next order
                 </label>
              </div>
           </div>
        </div>
      </div>

      <div className="pt-12 border-t border-cp-border flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-cp-text-muted hover:text-cp-text transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Order
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="btn-primary flex items-center gap-4 px-12 py-5 rounded-full font-black uppercase tracking-widest active:scale-[0.98] shadow-lg group"
        >
          Order Summary
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
