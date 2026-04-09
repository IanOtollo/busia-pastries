"use client";
import React, { useState, useEffect } from "react";
import { X, Cookie, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
       // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           exit={{ y: 100, opacity: 0 }}
           className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="container mx-auto max-w-4xl pointer-events-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-[var(--color-border)] rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[var(--color-accent)]/20">
                <Cookie className="w-6 h-6" />
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-1">
                <h4 className="font-bold text-sm">We use cookies</h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  This website uses cookies to ensure you get the best experience on
                  our website. By clicking &quot;Accept&quot;, you agree to our use of cookies.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="flex-1 md:flex-initial">
                   Later
                </Button>
                <Button size="sm" onClick={handleAccept} className="flex-1 md:flex-initial group">
                   Accept
                   <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-1 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
