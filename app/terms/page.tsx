import React from "react";
import { Shield, Scale, Clock, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text)]">
              Terms &amp; Conditions
            </h1>
            <p className="text-[var(--color-muted)]">Last updated: April 2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-[var(--color-surface)] p-8 rounded-3xl border border-[var(--color-border)] space-y-4">
                <Shield className="w-8 h-8 text-[var(--color-accent)]" />
                <h3 className="font-bold">Summary</h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                   By using Busia Pastries, you agree to our terms of service regarding ordering, 
                   fulfillment, and payment. We strive for 100% satisfaction but have certain 
                   limitations regarding perishable goods.
                </p>
             </div>
             <div className="bg-[var(--color-surface)] p-8 rounded-3xl border border-[var(--color-border)] space-y-4">
                <Clock className="w-8 h-8 text-[var(--color-accent)]" />
                <h3 className="font-bold">Ordering</h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                   Orders must be placed via our website. Once an order is &quot;Confirmed&quot; or 
                   &quot;Baking&quot;, cancellations are no longer possible due to the 
                   customized nature of our products.
                </p>
             </div>
          </div>

          {/* Detailed Content */}
          <div className="prose prose-sm prose-gray max-w-none text-[var(--color-muted)] space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                 <Scale className="w-5 h-5" /> 1. Ordering and Payment
              </h2>
              <p>
                All orders are subject to availability. Prices displayed on our website include all 
                applicable taxes in Kenya and Uganda. Payment must be made at the time of order via 
                M-Pesa, or upon delivery/pickup if the option is selected.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
                 <AlertCircle className="w-5 h-5" /> 2. Delivery &amp; Pickup
              </h2>
              <p>
                We aim to meet all estimated delivery times, but cannot guarantee them during 
                peak hours or extreme weather. If an order is not picked up within 24 hours of 
                its &quot;Ready&quot; status, it will be disposed of for food safety reasons 
                and no refund will be issued.
              </p>
            </section>

            <section className="space-y-4">
               <h2 className="text-xl font-bold text-[var(--color-text)]">3. Refunds &amp; Returns</h2>
               <p>
                  Due to the perishable nature of our products, we do not accept returns. If you 
                  are unsatisfied with the quality of your bake, please contact us within 
                  2 hours of receipt with photos. 
               </p>
            </section>

            <div className="p-8 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] text-center italic">
               &quot;Baking your day a little brighter, one rule at a time.&quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
