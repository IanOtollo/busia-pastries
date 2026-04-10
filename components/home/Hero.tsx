"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Truck, Smartphone, Star } from "lucide-react";
import { useSeason } from "@/components/providers/SeasonalProvider";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1965&auto=format&fit=crop",
];

export function Hero() {
  const { season } = useSeason();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const seasonalText: Record<string, string> = {
    valentine: "Hand-crafting love for your special someone",
    halloween: "Spooky sweetness for the brave souls",
    christmas: "Festive magic in every golden crust",
    newyear: "A fresh start, a sweeter year",
    easter: "Easter joy, freshly baked with care",
    default: "Hand-crafted with love by Clare",
  };

  const text = seasonalText[season] || seasonalText.default;

  return (
    <section className="relative min-h-[90vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden bg-zinc-950 py-20 px-4">
      {/* Premium Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentSlide]}
              alt="Artisan Pastries Slideshow"
              fill
              className="object-cover"
              priority
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-transparent to-zinc-950/90 z-10" />
        <div className="absolute inset-0 hero-grain opacity-20 pointer-events-none z-20" />
      </div>

      <div className="container mx-auto relative z-30">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 md:gap-12"
          >
            {/* Seasonal Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-2xl"
            >
              <Star className="w-3.5 h-3.5 text-cp-accent fill-cp-accent" />
              <span className="font-mono text-[10px] md:text-xs font-bold tracking-[0.25em] text-white uppercase">
                {text}
              </span>
            </motion.div>

            {/* Typography Masterpiece */}
            <div className="text-center space-y-4 md:space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-white leading-[0.85] text-[clamp(4rem,12vw,10rem)] uppercase tracking-tighter shadow-sm"
              >
                Clare <br />
                <span className="text-cp-accent italic lowercase font-medium tracking-normal drop-shadow-[0_0_15px_rgba(230,172,135,0.3)]">Bakes.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-body font-medium drop-shadow-md"
              >
                Luxury pastries and bespoke celebration cakes, meticulously crafted by Clare in the heart of Busia. 
                <span className="hidden md:inline"> Freshly delivered or ready for collection.</span>
              </motion.p>
            </div>

            {/* CTA Ecosystem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 w-full sm:w-auto"
            >
              <Link href="/menu" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-4 group">
                Reserve Yours
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link href="/about" className="text-white font-bold text-lg hover:text-cp-accent transition-colors flex items-center gap-2 group underline-offset-8 hover:underline">
                Our Story
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>→</motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Proof / Features */}
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1, duration: 1.2 }}
             className="mt-20 md:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 w-full pt-12 border-t border-white/10"
          >
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <MapPin className="w-6 h-6 text-cp-accent" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Busia HQ</h3>
                <p className="text-xs text-white/60 mt-1 italic">Busia Town, Kenya</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <Truck className="w-6 h-6 text-cp-accent" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Doorstep Bliss</h3>
                <p className="text-xs text-white/60 mt-1 italic">45–90 min Express Delivery</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <Smartphone className="w-6 h-6 text-cp-accent" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">M-Pesa Express</h3>
                <p className="text-xs text-white/60 mt-1 italic">Instant Secure Checkout</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
