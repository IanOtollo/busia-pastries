"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppCTA() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "254724848228";
  const message = encodeURIComponent("Hello Clare! I'm interested in ordering some pastries. I'd love to chat about a custom request.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-32 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="pointer-events-auto bg-cp-bg border border-cp-border rounded-2xl p-6 shadow-2xl max-w-[280px] space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cp-accent flex items-center justify-center text-white font-bold text-xs uppercase">
                  C
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-cp-text uppercase tracking-widest">Customer Support</h4>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest italic">Always online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-cp-text-muted hover:text-cp-text transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[11px] text-cp-text font-medium leading-relaxed italic border-l-2 border-cp-accent pl-3">
              "How can we help make your order extra special today?"
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-[#1ebd59]"
            >
              Contact via WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95 relative"
      >
        <MessageCircle className={cn("w-6 h-6 transition-transform duration-300", isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
        <X className={cn("w-6 h-6 absolute transition-transform duration-300", isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
      </button>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
