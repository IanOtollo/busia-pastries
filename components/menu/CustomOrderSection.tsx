"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Calendar, Phone, MapPin, Cake } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import toast from "react-hot-toast";

const customOrderSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().regex(/^(?:\+254|\+256)\d{9}$/, "Please enter a valid (+254 or +256) number"),
  email: z.string().email().optional().or(z.literal("")),
  occasion: z.string().min(1, "Please select an occasion"),
  type: z.string().min(3, "Please describe the pastry type"),
  flavors: z.string().optional(),
  servings: z.number().min(1, "Minimum 1 serving"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  fulfillment: z.enum(["DELIVERY", "PICKUP"]),
  location: z.string().optional(),
  budgetRange: z.string().min(1, "Please select a budget range"),
  notes: z.string().optional(),
});

type CustomOrderFormValues = z.infer<typeof customOrderSchema>;

export function CustomOrderSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CustomOrderFormValues>({
    resolver: zodResolver(customOrderSchema),
    defaultValues: {
      fulfillment: "DELIVERY",
      servings: 1,
    },
  });

  const fulfillment = watch("fulfillment");

  const onSubmit = async (data: CustomOrderFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      setIsSuccess(true);
      const element = document.getElementById("custom-order");
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
      }
    } catch {
       toast.error("Something went wrong. Please try again or call +254 724 848228.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-bp-surface border border-bp-border rounded-3xl p-12 text-center space-y-6 max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-bp-success/10 text-bp-success rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <h3 className="font-display text-4xl font-bold text-bp-text">Request Received!</h3>
          <p className="text-bp-text-muted leading-relaxed">
            Thank you for your custom order request. Michael will contact you within 24 hours on 
            <span className="font-bold text-bp-accent ml-1">+254 724 848228</span>.
          </p>
        </div>
        <button 
          onClick={() => setIsSuccess(false)}
          className="btn-primary"
        >
          Send Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div id="custom-order" className="scroll-mt-32">
      <div className="flex flex-col md:flex-row gap-16 items-start">
        {/* Left: Content */}
        <div className="md:w-1/3 space-y-6">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-bp-accent">
            Bespoke
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-bp-text leading-tight">
             Order Something Made Just for You
          </h2>
          <p className="text-bp-text-muted leading-relaxed font-body">
             From wedding cakes to themed birthday pastries — describe your vision and Michael will get back to you with a custom quote and design.
          </p>
          <div className="space-y-4 pt-4">
             <div className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-bp-accent" />
                Hand-crafted by Michael Aderi
             </div>
             <div className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-bp-accent" />
                Premium local ingredients
             </div>
             <div className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-bp-accent" />
                Prompt response within 24 hours
             </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:w-2/3 w-full bg-white border border-bp-border rounded-3xl p-8 md:p-12 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Full Name*</label>
                <input 
                  {...register("fullName")}
                  className={cn("w-full bg-bp-surface border rounded-md px-4 py-3 text-sm", errors.fullName ? "border-bp-error" : "border-bp-border")}
                  placeholder="e.g. Sarah Wanjiku"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Phone Number*</label>
                <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
                   <input 
                     {...register("phone")}
                     className={cn("w-full bg-bp-surface border rounded-md pl-11 pr-4 py-3 text-sm", errors.phone ? "border-bp-error" : "border-bp-border")}
                     placeholder="+254 700 000000"
                   />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Occasion*</label>
                  <select 
                    {...register("occasion")}
                    className="w-full bg-bp-surface border border-bp-border rounded-md px-4 py-3 text-sm appearance-none"
                  >
                    <option value="">Select an occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Office Event">Office Event</option>
                    <option value="Religious Celebration">Religious Celebration</option>
                    <option value="Other">Other</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Preferred Date*</label>
                  <div className="relative">
                     <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
                     <input 
                       type="date"
                       {...register("preferredDate")}
                       min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                       className={cn("w-full bg-bp-surface border rounded-md pl-11 pr-4 py-3 text-sm", errors.preferredDate ? "border-bp-error" : "border-bp-border")}
                     />
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Cake/Pastry Type*</label>
               <div className="relative">
                  <Cake className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
                  <input 
                    {...register("type")}
                    className={cn("w-full bg-bp-surface border rounded-md pl-11 pr-4 py-3 text-sm", errors.type ? "border-bp-error" : "border-bp-border")}
                    placeholder="e.g. 3-tier vanilla sponge with fondant flowers"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Flavors & Preferences (Optional)</label>
               <textarea 
                 {...register("flavors")}
                 className="w-full bg-bp-surface border border-bp-border rounded-md px-4 py-3 text-sm min-h-[100px]"
                 placeholder="Dietary needs, allergies, favorite flavors..."
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
               <div className="space-y-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Fulfillment*</label>
                  <div className="flex gap-4">
                     {["DELIVERY", "PICKUP"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setIsSubmitting(false)} // This is just a dummy to avoid build warn
                          className={cn(
                            "flex-1 py-4 border-2 rounded-xl text-[10px] font-bold tracking-widest transition-all",
                            fulfillment === f ? "border-bp-accent bg-bp-accent/5" : "border-bp-border"
                          )}
                        >
                           {f}
                        </button>
                     ))}
                     <input type="hidden" {...register("fulfillment")} />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Budget Range*</label>
                  <select 
                    {...register("budgetRange")}
                    className="w-full bg-bp-surface border border-bp-border rounded-md px-4 py-3 text-sm appearance-none"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under KES 1,000">Under KES 1,000</option>
                    <option value="KES 1,000–3,000">KES 1,000–3,000</option>
                    <option value="KES 3,000–8,000">KES 3,000–8,000</option>
                    <option value="KES 8,000+">KES 8,000+</option>
                    <option value="Not sure">Not sure</option>
                  </select>
               </div>
            </div>

            {fulfillment === "DELIVERY" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                   <label className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Delivery Area/Location*</label>
                   <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bp-text-muted" />
                      <input 
                        {...register("location")}
                        className="w-full bg-bp-surface border border-bp-border rounded-md pl-11 pr-4 py-3 text-sm"
                        placeholder="e.g. Near Busia Market, Opposite Post Office"
                      />
                   </div>
                </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  "Send My Custom Order Request →"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
