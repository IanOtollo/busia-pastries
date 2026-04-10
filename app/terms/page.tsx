"use client";

import React from "react";
import { Shield, Scale, Clock, AlertCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
  const lastUpdated = "April 10, 2026";

  return (
    <div className="min-h-screen pt-40 pb-24 bg-cp-bg text-cp-text">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 rounded-3xl bg-cp-accent/10 text-cp-accent flex items-center justify-center mx-auto border border-cp-accent/20">
               <Scale className="w-10 h-10" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
              Terms &amp; Conditions
            </h1>
            <p className="inline-flex items-center gap-2 text-cp-text-muted font-bold text-[10px] uppercase tracking-[0.2em] bg-cp-surface px-4 py-2 rounded-full border border-cp-border">
              <Star className="w-3 h-3 fill-cp-accent" />
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-cp-surface p-10 rounded-[2.5rem] border border-cp-border space-y-6 shadow-sm group hover:border-cp-accent transition-all duration-300"
             >
                <div className="w-12 h-12 rounded-xl bg-cp-bg flex items-center justify-center text-cp-accent border border-cp-border group-hover:rotate-6 transition-transform">
                   <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-tighter italic">Order Protocol</h3>
                <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                   By choosing **Clare Pastries**, you agree to our terms of service regarding artisanal ordering, 
                   fulfillment, and payment. We strive for 100% satisfaction in every bake.
                </p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-cp-surface p-10 rounded-[2.5rem] border border-cp-border space-y-6 shadow-sm group hover:border-cp-accent transition-all duration-300"
             >
                <div className="w-12 h-12 rounded-xl bg-cp-bg flex items-center justify-center text-cp-accent border border-cp-border group-hover:rotate-6 transition-transform">
                   <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-tighter italic">Cancellations</h3>
                <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                   Once an order reaches &quot;Confirmed&quot; or &quot;Baking&quot; status, cancellations are no longer 
                   possible due to the customized, perishable nature of our products.
                </p>
             </motion.div>
          </div>

          {/* Detailed Content */}
          <div className="bg-cp-surface border border-cp-border rounded-[3.5rem] p-10 md:p-16 shadow-xl space-y-16">
            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold flex items-center gap-4 text-cp-text tracking-tight uppercase italic">
                 1. Ordering & Payment
              </h2>
              <p className="text-cp-text-muted leading-relaxed font-body text-lg">
                All orders are subject to availability. Prices include all applicable taxes. 
                Payment is required at the time of order via **PayHero (M-Pesa)** or authorized gateway partners.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold flex items-center gap-4 text-cp-text tracking-tight uppercase italic">
                 2. Delivery & Fulfillment
              </h2>
              <p className="text-cp-text-muted leading-relaxed font-body text-lg">
                We prioritize freshness. If an order is not picked up within 24 hours of its &quot;Ready&quot; status, 
                it will be disposed of for safety reasons, and no refund will be issued.
              </p>
            </section>

            <section className="space-y-6">
               <h2 className="text-3xl font-display font-bold text-cp-text tracking-tight uppercase italic">3. Refunds & Quality</h2>
               <p className="text-cp-text-muted leading-relaxed font-body text-lg">
                  Due to the perishable nature of bakes, we do not accept returns. If quality issues arise, 
                  please notify us with photos within 2 hours of receipt.
               </p>
            </section>

            <div className="p-10 bg-cp-bg rounded-[2.5rem] border border-cp-border text-center italic font-body text-cp-text-muted">
               &quot;Baking your day a little brighter, with integrity in every rule.&quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
