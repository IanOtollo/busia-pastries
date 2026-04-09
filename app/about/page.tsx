"use client";
import React from "react";
import Image from "next/image";
import { Wheat, Heart, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 space-y-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-mono font-bold uppercase tracking-wider">
                 Our Story
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-[var(--color-text)] leading-tight">
                 Baking Joy into Every Bite Since 2021.
              </h1>
              <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-xl">
                 What started as a small home kitchen project in Busia has grown into the region&apos;s 
                 preeminent artisanal bakery. We believe in the power of fresh ingredients, 
                 traditional techniques, and a touch of Kenyan warmth.
              </p>
           </div>
           
           <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200" 
                alt="Bakery Interior" 
                fill 
                className="object-cover"
              />
           </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--color-surface)] py-24">
         <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
               <h2 className="font-display text-4xl font-bold">The Pillars of Our Bakery</h2>
               <p className="text-[var(--color-muted)]">We never compromise on the quality of our bakes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-6 group hover:border-[var(--color-accent)] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-accent)] transition-transform group-hover:scale-110">
                     <Wheat className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">Premium Ingredients</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                     We source our flour and dairy directly from local farmers in Western Kenya, 
                     ensuring every pastry is as fresh as it is flavorful.
                  </p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-6 group hover:border-[var(--color-accent)] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-accent)] transition-transform group-hover:scale-110">
                     <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">Made with Love</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                     Baking is an art of patience. Every loaf of bread and custom cake is 
                     handcrafted by our passionate team of local artisans.
                  </p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-sm space-y-6 group hover:border-[var(--color-accent)] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-accent)] transition-transform group-hover:scale-110">
                     <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">Community First</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                     Busia Pastries is proud to support local schools and community centers through 
                     our &apos;Baker&apos;s Give-Back&apos; program every month.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Stats/Achievements */}
      <section className="container mx-auto px-4 md:px-6 py-12">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
               <p className="text-4xl md:text-5xl font-display font-bold text-[var(--color-accent)]">50k+</p>
               <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">Cakes Delivered</p>
            </div>
            <div className="text-center space-y-2">
               <p className="text-4xl md:text-5xl font-display font-bold text-[var(--color-accent)]">12</p>
               <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">Local Artisans</p>
            </div>
            <div className="text-center space-y-2">
               <p className="text-4xl md:text-5xl font-display font-bold text-[var(--color-accent)]">4.9</p>
               <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">Average Rating</p>
            </div>
            <div className="text-center space-y-2">
               <p className="text-4xl md:text-5xl font-display font-bold text-[var(--color-accent)]">100%</p>
               <p className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-widest">Fresh Guarantee</p>
            </div>
         </div>
      </section>

      {/* Team/Founder Quote */}
      <section className="container mx-auto px-4 md:px-6">
         <div className="bg-[var(--color-cta)] text-[var(--color-cta-text)] rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
            <div className="max-w-3xl mx-auto space-y-8">
               <Award className="w-12 h-12 text-[var(--color-accent)] mx-auto" />
               <blockquote className="text-2xl md:text-4xl font-display font-medium leading-tight">
                  &quot;At Busia Pastries, we&apos;re not just selling cakes; we&apos;re crafting moments of celebration 
                  and everyday delight for the people of this beautiful county.&quot;
               </blockquote>
               <div>
                  <p className="font-bold text-lg">Fatuma Aswani</p>
                  <p className="text-xs opacity-60 uppercase tracking-widest">Founder & Head Baker</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
