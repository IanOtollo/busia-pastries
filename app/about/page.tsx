"use client";
import React from "react";
import Image from "next/image";
import { Wheat, Heart, Users, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 space-y-24 bg-cp-bg">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-8"
           >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cp-accent/10 text-cp-accent text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                 <Star className="w-3 h-3 fill-cp-accent" />
                 Our Story
              </div>
              <h1 className="font-display text-5xl md:text-8xl font-black text-cp-text leading-[0.85] tracking-tighter">
                 Baking Joy <br />
                 <span className="text-cp-accent italic lowercase font-medium">into every bite.</span>
              </h1>
              <p className="text-cp-text-muted text-lg md:text-xl leading-relaxed max-w-xl font-body">
                 What started as a small home kitchen project in Busia has evolved into **Clare Pastries** — the region&apos;s 
                 preeminent artisanal bakery. We believe in the power of fresh ingredients, 
                 traditional techniques, and a touch of genuine Kenyan warmth.
              </p>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-cp-border"
           >
              <Image 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200" 
                alt="Clare Pastries Bakery" 
                fill 
                className="object-cover transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cp-bg/40 to-transparent" />
           </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cp-surface py-32 border-y border-cp-border">
         <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
               <h2 className="font-display text-4xl md:text-6xl font-black text-cp-text tracking-tight uppercase">The Pillars of Our Craft</h2>
               <p className="text-cp-text-muted font-body text-lg italic">&quot;Quality is never an accident; it is always the result of high intention.&quot;</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="bg-cp-bg p-10 rounded-[2.5rem] border border-cp-border shadow-sm space-y-6 group hover:border-cp-accent transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-cp-surface-2 flex items-center justify-center text-cp-accent transition-transform group-hover:scale-110 group-hover:rotate-6">
                     <Wheat className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-cp-text tracking-tight">Premium Sourcing</h3>
                  <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                     We source our flour and dairy directly from local partners in Western Kenya, 
                     ensuring every pastry is as fresh as it is flavorful.
                  </p>
               </div>

               <div className="bg-cp-bg p-10 rounded-[2.5rem] border border-cp-border shadow-sm space-y-6 group hover:border-cp-accent transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-cp-surface-2 flex items-center justify-center text-cp-accent transition-transform group-hover:scale-110 group-hover:rotate-6">
                     <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-cp-text tracking-tight">Handcrafted Love</h3>
                  <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                     Baking is an art of patience. Every loaf of bread and custom cake is 
                     hand-tailored by Clare and her dedicated team of local bakers.
                  </p>
               </div>

               <div className="bg-cp-bg p-10 rounded-[2.5rem] border border-cp-border shadow-sm space-y-6 group hover:border-cp-accent transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-cp-surface-2 flex items-center justify-center text-cp-accent transition-transform group-hover:scale-110 group-hover:rotate-6">
                     <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-cp-text tracking-tight">Community First</h3>
                  <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                     Clare Pastries is proud to support local schools and community centers through 
                     our monthly give-back program, sharing the sweetness of our success.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 md:px-6 py-12">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center space-y-2 group">
               <p className="text-5xl md:text-6xl font-display font-black text-cp-accent group-hover:scale-110 transition-transform">50k+</p>
               <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.3em]">Cakes Delivered</p>
            </div>
            <div className="text-center space-y-2 group">
               <p className="text-5xl md:text-6xl font-display font-black text-cp-accent group-hover:scale-110 transition-transform">12</p>
               <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.3em]">Local Artisans</p>
            </div>
            <div className="text-center space-y-2 group">
               <p className="text-5xl md:text-6xl font-display font-black text-cp-accent group-hover:scale-110 transition-transform">4.9</p>
               <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.3em]">Average Rating</p>
            </div>
            <div className="text-center space-y-2 group">
               <p className="text-5xl md:text-6xl font-display font-black text-cp-accent group-hover:scale-110 transition-transform">100%</p>
               <p className="text-[10px] font-bold text-cp-text-muted uppercase tracking-[0.3em]">Freshness</p>
            </div>
         </div>
      </section>

      {/* Founder Quote */}
      <section className="container mx-auto px-4 md:px-6">
         <div className="bg-cp-cta text-cp-cta-text rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center border border-cp-border/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cp-accent/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="max-w-4xl mx-auto space-y-10 relative z-10">
               <Award className="w-16 h-16 text-cp-accent mx-auto" />
               <blockquote className="text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight">
                  &quot;At Clare Pastries, we&apos;re not just selling cakes; we&apos;re crafting moments of celebration 
                  and everyday delight for the heart of Busia.&quot;
               </blockquote>
               <div className="pt-6">
                  <p className="font-display text-2xl font-bold text-cp-accent italic">Clare Aswani</p>
                  <p className="text-[10px] opacity-60 uppercase font-bold tracking-[0.4em] mt-2">Founder & Head Baker</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
