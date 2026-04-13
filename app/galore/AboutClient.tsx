"use client";

import React from "react";
import { Wheat, Heart, Users, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { GalleryCarousel } from "@/components/galore/GalleryCarousel";

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  caption?: string;
}

interface AboutClientProps {
  galleryImages: GalleryImage[];
}

export function AboutClient({ galleryImages }: AboutClientProps) {
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
                 Galore
              </div>
              <h1 className="font-display text-5xl md:text-8xl font-black text-cp-text leading-[0.85] tracking-tighter">
                 Baking Joy <br />
                 <span className="text-cp-accent italic lowercase font-medium">into every bite.</span>
              </h1>
              <p className="text-cp-text-muted text-lg md:text-xl leading-relaxed max-w-xl font-body">
                 <strong className="text-cp-text font-bold">Clare Pastries</strong> is a homegrown artisan bakery in the heart of Busia Town, Kenya. 
                 Every product is made to order — fresh, never frozen, never mass-produced. 
                 Just honest baking, done with love.
              </p>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="relative"
           >
              <GalleryCarousel images={galleryImages} />
           </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cp-surface py-16 md:py-32 border-y border-cp-border">
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
                     Every bake starts with carefully selected local ingredients.
                  </p>
               </div>

               <div className="bg-cp-bg p-10 rounded-[2.5rem] border border-cp-border shadow-sm space-y-6 group hover:border-cp-accent transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-cp-surface-2 flex items-center justify-center text-cp-accent transition-transform group-hover:scale-110 group-hover:rotate-6">
                     <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-cp-text tracking-tight">Handcrafted with Love</h3>
                  <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                     No shortcuts. Every item shaped by hand, made to order.
                  </p>
               </div>

               <div className="bg-cp-bg p-10 rounded-[2.5rem] border border-cp-border shadow-sm space-y-6 group hover:border-cp-accent transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-cp-surface-2 flex items-center justify-center text-cp-accent transition-transform group-hover:scale-110 group-hover:rotate-6">
                     <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-cp-text tracking-tight">Fresh Daily</h3>
                  <p className="text-sm text-cp-text-muted leading-relaxed font-body">
                     We bake every morning. Nothing sits on a shelf overnight.
                  </p>
               </div>
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
                  <p className="font-display text-2xl font-bold text-cp-accent italic">— Clare</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
