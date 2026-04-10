import React from "react";
import { Shield, Lock, Eye, FileText, Star } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 10, 2026";

  return (
    <div className="min-h-screen pt-40 pb-24 bg-cp-bg text-cp-text">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Header */}
        <div className="space-y-6 mb-16 text-center">
           <div className="w-20 h-20 rounded-3xl bg-cp-accent/10 text-cp-accent flex items-center justify-center mx-auto border border-cp-accent/20">
              <Shield className="w-10 h-10" />
           </div>
           <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase italic">Privacy Policy</h1>
           <p className="inline-flex items-center gap-2 text-cp-text-muted font-bold text-[10px] uppercase tracking-[0.2em] bg-cp-surface px-4 py-2 rounded-full border border-cp-border">
             <Star className="w-3 h-3 fill-cp-accent" />
             Last updated: {lastUpdated}
           </p>
        </div>

        {/* Content */}
        <div className="bg-cp-surface border border-cp-border rounded-[3.5rem] p-10 md:p-16 shadow-xl space-y-16">
           
           <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold flex items-center gap-4 text-cp-text tracking-tight">
                 <div className="w-10 h-10 rounded-xl bg-cp-bg flex items-center justify-center text-cp-accent border border-cp-border shadow-sm">
                    <Eye className="w-5 h-5" />
                 </div>
                 1. Information We Collect
              </h2>
              <div className="space-y-4">
                 <p className="text-cp-text-muted leading-relaxed font-body text-lg">
                    When you visit <strong>Clare Pastries</strong>, we collect information that you provide directly to us 
                    and information that is collected automatically through cookies to enhance your experience.
                 </p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="p-4 bg-cp-bg border border-cp-border rounded-2xl"><span className="font-bold text-cp-accent block text-xs uppercase tracking-widest mb-1">Personal Data</span><span className="text-sm">Name, email, phone, and delivery address.</span></li>
                    <li className="p-4 bg-cp-bg border border-cp-border rounded-2xl"><span className="font-bold text-cp-accent block text-xs uppercase tracking-widest mb-1">Payment Info</span><span className="text-sm">Transaction details for M-Pesa (we never store PINs).</span></li>
                    <li className="p-4 bg-cp-bg border border-cp-border rounded-2xl"><span className="font-bold text-cp-accent block text-xs uppercase tracking-widest mb-1">Usage Data</span><span className="text-sm">Browser type and website interactions.</span></li>
                    <li className="p-4 bg-cp-bg border border-cp-border rounded-2xl"><span className="font-bold text-cp-accent block text-xs uppercase tracking-widest mb-1">Preferences</span><span className="text-sm">Seasonal theme settings and cookie consents.</span></li>
                 </ul>
              </div>
           </section>

           <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold flex items-center gap-4 text-cp-text tracking-tight">
                 <div className="w-10 h-10 rounded-xl bg-cp-bg flex items-center justify-center text-cp-accent border border-cp-border shadow-sm">
                    <Lock className="w-5 h-5" />
                 </div>
                 2. How We Use Your Data
              </h2>
              <p className="text-cp-text-muted leading-relaxed font-body text-lg">
                 We use the information we collect to provide and improve our artisanal services:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-cp-text-muted font-body">
                 <li>Processing and fulfilling your premium pastry orders.</li>
                 <li>Sending order tracking updates via SMS or Email.</li>
                 <li>Communicating about account or customer service inquiries.</li>
                 <li>Personalizing your experience with dynamic seasonal branding.</li>
              </ul>
           </section>

           <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold flex items-center gap-4 text-cp-text tracking-tight">
                 <div className="w-10 h-10 rounded-xl bg-cp-bg flex items-center justify-center text-cp-accent border border-cp-border shadow-sm">
                    <Shield className="w-5 h-5" />
                 </div>
                 3. Data Security
              </h2>
              <p className="text-cp-text-muted leading-relaxed font-body text-lg">
                 We employ industry-standard encryption (SSL/TLS) and secure database practices (Supabase RLS) 
                 to protect your privacy. Your trust is our most valuable ingredient.
              </p>
           </section>

           <section className="space-y-6">
              <h2 className="text-3xl font-display font-bold flex items-center gap-4 text-cp-text tracking-tight">
                 <div className="w-10 h-10 rounded-xl bg-cp-bg flex items-center justify-center text-cp-accent border border-cp-border shadow-sm">
                    <FileText className="w-5 h-5" />
                 </div>
                 4. Your Rights
              </h2>
              <p className="text-cp-text-muted leading-relaxed font-body text-lg">
                 You retain the right to access, update, or delete your personal information at any time. 
                 Reach out to us at <strong>hello@clarepastries.co.ke</strong> for any requests.
              </p>
           </section>

           <div className="pt-10 border-t border-cp-border text-center">
              <p className="text-cp-text-muted italic font-body">
                 Baking with integrity, securing with care. <br />
                 <span className="font-bold text-cp-accent mt-2 block not-italic uppercase tracking-[0.2em] text-xs">hello@clarepastries.co.ke</span>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
