"use client";
import React from "react";
import { Phone, MapPin, MessageSquare, Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
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
                Clare will get back to you as soon as possible.
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
                        Busia Town, Kenya
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-6 p-8 bg-cp-surface rounded-[2rem] border border-cp-border group hover:border-cp-accent transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-cp-bg border border-cp-border flex items-center justify-center text-cp-accent shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3">
                     <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-display font-bold text-lg text-cp-text">Call Us</p>
                     <p className="text-sm text-cp-text-muted font-body">
                        <a href="tel:+254724848228" className="hover:text-cp-accent transition-colors">+254 724 848228</a>
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-6 p-8 bg-cp-surface rounded-[2rem] border border-cp-border group hover:border-[#25D366]/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3">
                     <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                     <p className="font-display font-bold text-lg text-cp-text">WhatsApp Us</p>
                     <p className="text-sm text-cp-text-muted font-body">
                        <a href="https://wa.me/254724848228" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">Chat on WhatsApp →</a>
                     </p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
             <div className="bg-cp-surface border border-cp-border rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden group hover:border-cp-accent transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cp-accent/5 blur-2xl rounded-full" />
                <div className="relative z-10 space-y-6 text-center">
                   <div className="w-16 h-16 rounded-3xl bg-cp-accent/10 border border-cp-accent/20 flex items-center justify-center text-cp-accent mx-auto">
                      <Phone className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="font-display font-bold text-2xl mb-2 text-cp-text">Call or WhatsApp Clare</h3>
                      <p className="text-cp-text-muted font-body text-sm max-w-xs mx-auto mb-4">
                         +254 724 848228
                      </p>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="tel:+254724848228" className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[#1a1a1a] text-xs">
                         Call Now
                      </a>
                      <a href="https://wa.me/254724848228" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-colors w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs border border-[#25D366]/20 flex items-center justify-center">
                         WhatsApp
                      </a>
                   </div>
                </div>
             </div>

             <div className="bg-cp-surface border border-cp-border rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden group hover:border-cp-accent transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cp-accent/5 blur-2xl rounded-full" />
                <div className="relative z-10 space-y-6 text-center">
                   <div className="w-16 h-16 rounded-3xl bg-cp-accent/10 border border-cp-accent/20 flex items-center justify-center text-cp-accent mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="font-display font-bold text-2xl mb-2 text-cp-text">Ready to Order?</h3>
                      <p className="text-cp-text-muted font-body text-sm max-w-xs mx-auto mb-6 leading-relaxed">
                         Browse our menu and place your order directly online.
                      </p>
                   </div>
                   <div className="flex justify-center">
                      <a href="/menu" className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[#1a1a1a] text-xs transition-transform hover:-translate-y-1">
                         Browse Menu
                      </a>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
