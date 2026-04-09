import React from "react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 25, 2023";

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Header */}
        <div className="space-y-6 mb-16 text-center">
           <div className="w-16 h-16 rounded-3xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
           </div>
           <h1 className="font-display text-4xl md:text-6xl font-bold">Privacy Policy</h1>
           <p className="text-[var(--color-muted)] font-medium">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="bg-white border border-[var(--color-border)] rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-12">
           
           <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                 <Eye className="w-6 h-6 text-[var(--color-accent)]" />
                 1. Information We Collect
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                 When you visit Busia Pastries, we collect information that you provide directly to us 
                 (such as when you create an account, place an order, or contact us) and information 
                 that is collected automatically (such as through cookies).
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-muted)]">
                 <li><span className="font-bold text-[var(--color-text)]">Personal Data:</span> Name, email address, phone number, and delivery address.</li>
                 <li><span className="font-bold text-[var(--color-text)]">Payment Info:</span> Transaction details for M-Pesa payments (we do not store your PIN).</li>
                 <li><span className="font-bold text-[var(--color-text)]">Usage Data:</span> IP address, browser type, and interactions with our website.</li>
              </ul>
           </section>

           <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                 <Lock className="w-6 h-6 text-[var(--color-accent)]" />
                 2. How We Use Your Information
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                 We use the information we collect to provide, maintain, and improve our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[var(--color-muted)]">
                 <li>Processing and fulfilling your pastry orders.</li>
                 <li>Sending order confirmations and tracking updates via SMS or Email.</li>
                 <li>Communicating with you about your account or customer service inquiries.</li>
                 <li>Personalizing your experience with seasonal theme overrides.</li>
              </ul>
           </section>

           <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                 <Shield className="w-6 h-6 text-[var(--color-accent)]" />
                 3. Security of Data
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                 The security of your data is important to us. We use industry-standard encryption 
                 (SSL/TLS) and secure database practices (Supabase RLS) to protect your personal information. 
                 However, no method of transmission over the Internet is 100% secure.
              </p>
           </section>

           <section className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                 <FileText className="w-6 h-6 text-[var(--color-accent)]" />
                 4. Your Rights
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                 You have the right to access, update, or delete your personal information at any time. 
                 You can do this within your account settings or by contacting us at hello@busiapastries.co.ke.
              </p>
           </section>

           <div className="pt-8 border-t border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-muted)] text-center">
                 If you have any questions about this Privacy Policy, please contact us at <br />
                 <span className="font-bold text-[var(--color-text)]">hello@busiapastries.co.ke</span>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
