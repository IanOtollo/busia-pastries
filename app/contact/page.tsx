"use client";
import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-[var(--color-text)]">
                Let&apos;s talk pastries.
              </h1>
              <p className="text-[var(--color-muted)] text-lg leading-relaxed">
                Have a special request? Or just want to say hi? We&apos;d love to hear from you. 
                Our team usually responds within 2 hours.
              </p>
            </div>

            <div className="space-y-6">
               <div className="flex items-start gap-5 p-6 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)]">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                     <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-bold">Visit Our Bakery</p>
                     <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                        Busia Town, Kenya <br />
                        Opposite Victory Plaza, Kisumu Road
                     </p>
                  </div>
               </div>

               <div className="flex items-start gap-5 p-6 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)]">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                     <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-bold">Call Us</p>
                     <p className="text-sm text-[var(--color-muted)]">+254 700 000 000</p>
                  </div>
               </div>

               <div className="flex items-start gap-5 p-6 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)]">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                     <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-bold">Email Us</p>
                     <p className="text-sm text-[var(--color-muted)]">hello@busiapastries.co.ke</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-[var(--color-accent)]/5">
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Input label="Your Name" placeholder="John Doe" required />
                   <Input label="Email Address" type="email" placeholder="john@example.com" required />
                </div>
                <Input label="Subject" placeholder="Inquiry about a custom cake" required />
                <div className="space-y-2">
                   <label className="text-sm font-medium text-[var(--color-text)] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" /> 
                      Your Message
                   </label>
                   <textarea 
                      placeholder="Tell us what's on your mind..."
                      className="w-full bg-[var(--color-surface)]/50 border border-[var(--color-border)] rounded-2xl p-4 text-sm min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                      required
                   />
                </div>
                <Button fullWidth size="lg" className="h-14 font-bold text-lg group">
                   Send Message
                   <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
