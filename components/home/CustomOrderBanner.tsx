"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1980&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1964&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1936&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=1858&auto=format&fit=crop",
];

export function CustomOrderBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-cp-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-[3rem] overflow-hidden bg-cp-cta px-8 py-20 md:px-16 md:py-32 text-center shadow-2xl border border-white/10">
          {/* Slideshow Background */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.35, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={BANNER_IMAGES[currentSlide]}
                  alt="Custom Bake Inspiration"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-cp-cta via-cp-cta/60 to-cp-cta/40 z-10" />
            <div className="absolute inset-0 opacity-20 pointer-events-none hero-grain bg-repeat z-20" />
          </div>
          
          <div className="relative z-30 max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="p-3 bg-cp-accent/20 backdrop-blur-md rounded-2xl border border-cp-accent/30 text-cp-accent">
                <Sparkles className="w-6 h-6" />
              </div>
            </motion.div>

            <h2 className="font-display text-5xl md:text-8xl font-black text-cp-cta-text leading-[0.9] tracking-tighter uppercase italic drop-shadow-lg">
              Something <br />
              <span className="text-cp-accent not-italic drop-shadow-xl">Unique.</span>
            </h2>
            <p className="text-cp-cta-text opacity-90 text-lg md:text-2xl font-body leading-relaxed max-w-2xl mx-auto italic">
              Design your custom cake or pastry — tell us exactly what you want and we&apos;ll make it happen. Clare handles every bespoke order with personalized care and immense love.
            </p>
            <div className="pt-8">
              <Link 
                href="/menu#custom-order"
                className="inline-flex items-center gap-4 px-12 py-6 bg-cp-cta-text text-cp-cta rounded-full font-black uppercase tracking-widest text-xs hover:bg-cp-accent hover:text-white transition-all duration-500 shadow-xl group border border-cp-border"
              >
                Start a Custom Order
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
