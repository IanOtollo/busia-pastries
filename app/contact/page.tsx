"use client";
import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <div className="min-h-screen pt-40 pb-24 bg-cp-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cp-accent/10 text-cp-accent text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                 <Star className="w-3 h-3 fill-cp-accent" />
                 Contact Us
              </div>
              <h1 className="font-display text-5xl md:text-8xl font-black text-cp-text leading-[0.85] tracking-tighter">
                Let&apos;s talk <br />
                <span className="text-cp-accent italic lowercase font-medium">pastries.</span>
              </h1>
              <p className="text-cp-text-muted text-lg leading-relaxed max-w-md font-body">
                Have a special request? Or just want to say hi? We&apos;d love to hear from you. 
                Our team usually responds within 2 hours.
              </p>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-6 p-8 bg-cp-surface rounded-[2rem] border border-cp-border group hover:border-cp-accent transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-cp-bg border border-cp-border flex items-center justify-center text-cp-accent shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3">
                     <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-display font-bold text-lg text-cp-text">Visit Our Bakery</p>
                     <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                        Busia Town, Kenya <br />
                        Opposite Victory Plaza, Kisumu Road
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-6 p-8 bg-cp-surface rounded-[2rem] border border-cp-border group hover:border-cp-accent transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-cp-bg border border-cp-border flex items-center justify-center text-cp-accent shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3">
                     <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-display font-bold text-lg text-cp-text">Call Us</p>
                     <p className="text-sm text-cp-text-muted font-body">+254 700 000 000</p>
                  </div>
               </div>

               <div className="flex items-center gap-6 p-8 bg-cp-surface rounded-[2rem] border border-cp-border group hover:border-cp-accent transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-cp-bg border border-cp-border flex items-center justify-center text-cp-accent shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3">
                     <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-display font-bold text-lg text-cp-text">Email Us</p>
                     <p className="text-sm text-cp-text-muted font-body">hello@clarepastries.co.ke</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-cp-surface border border-cp-border rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-cp-accent/5 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-cp-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
             
             <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-cp-text-muted ml-1">Your Name</label>
                      <Input placeholder="John Doe" required className="bg-cp-bg border-cp-border focus:ring-cp-accent rounded-xl h-14" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-cp-text-muted ml-1">Email Address</label>
                      <Input type="email" placeholder="john@example.com" required className="bg-cp-bg border-cp-border focus:ring-cp-accent rounded-xl h-14" />
                   </div>
                </div>
                
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-cp-text-muted ml-1">Subject</label>
                   <Input placeholder="Inquiry about a custom cake" required className="bg-cp-bg border-cp-border focus:ring-cp-accent rounded-xl h-14" />
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-cp-text-muted ml-1 flex items-center gap-2">
                      Your Message
                   </label>
                   <textarea 
                      placeholder="Tell us what's on your mind..."
                      className="w-full bg-cp-bg border border-cp-border rounded-2xl p-6 text-sm min-h-[180px] focus:outline-none focus:ring-2 focus:ring-cp-accent transition-all font-body"
                      required
                   />
                </div>

                <Button fullWidth size="lg" className="h-16 font-bold text-lg group bg-cp-cta text-cp-cta-text hover:bg-cp-cta-hover transition-all rounded-xl shadow-lg">
                   Send Message
                   <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
             </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
