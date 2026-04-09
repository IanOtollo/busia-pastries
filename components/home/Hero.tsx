"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSeasonalTheme } from "@/hooks/useSeasonalTheme";

export function Hero() {
  const { heroHeadline, heroSubheadline, season } = useSeasonalTheme();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[var(--color-bg)] pt-20">
      {/* Neo-Chic Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Deep Gradients */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[var(--color-accent)]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[var(--color-success)]/5 blur-[100px] rounded-full" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(var(--color-text) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        {/* Floating Geometric Elements (Parallax) */}
        <motion.div style={{ y: y1, rotate }} className="absolute top-[20%] right-[15%] w-32 h-32 border border-[var(--color-accent)]/20 rounded-3xl" />
        <motion.div style={{ y: y2, rotate: -rotate }} className="absolute bottom-[25%] left-[10%] w-48 h-48 border-2 border-[var(--color-border)] rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]"></span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text)] font-mono">
              {season !== "default" ? `Limited: ${season.toUpperCase()} Collection` : "Oven-Fresh in Busia Town"}
            </span>
          </motion.div>

          {/* Headline Stack */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 flex items-center gap-2 text-[var(--color-accent)] font-display italic text-xl"
            >
              <Sparkles className="w-5 h-5" />
              <span>Premium Artisan Bakes</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-[var(--color-text)] pt-4"
            >
              {heroHeadline.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-success)]" : ""}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[var(--color-muted)] max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {heroSubheadline}
          </motion.p>

          {/* Modern CTA Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button size="lg" className="w-full sm:w-auto shadow-[0_20px_50px_rgba(var(--color-accent-rgb),0.3)] hover:shadow-none transition-all group px-10">
              <span className="relative z-10 flex items-center gap-3">
                Order Your Pastries
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
            
            <div className="flex items-center gap-8 pl-4">
               <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-bold">Delivery</span>
                  <div className="flex items-center gap-1.5 text-[var(--color-text)] font-display font-bold">
                    <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                    <span>45-90m</span>
                  </div>
               </div>
               <div className="h-8 w-px bg-[var(--color-border)]" />
               <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-bold">Location</span>
                  <div className="flex items-center gap-1.5 text-[var(--color-text)] font-display font-bold">
                    <MapPin className="w-4 h-4 text-[var(--color-success)]" />
                    <span>Busia CBD</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Footnote / Trust Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-0 right-0 hidden md:flex justify-center items-center gap-12 text-[var(--color-muted)]/60 text-xs font-mono font-bold tracking-[0.3em] uppercase"
      >
        <span>M-Pesa Integrated</span>
        <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
        <span>Fresh Daily</span>
        <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
        <span>Contactless Delivery</span>
      </motion.div>

      {/* Floating Scroll Cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pb-4"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex justify-center p-1.5">
          <motion.div className="w-1 h-2 bg-[var(--color-accent)] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
