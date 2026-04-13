"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useCurrency } from "@/store/useCurrency";
import { cn } from "@/lib/utils/cn";

export function Footer({ settings }: { settings: { phone: string; location: string; businessName: string } }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <footer className="bg-cp-surface border-t border-cp-border pt-20 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <Logo className="w-12 h-12 group-hover:rotate-12 transition-transform duration-500" />
            </Link>
            <p className="text-cp-text-muted text-sm leading-relaxed max-w-xs italic">
              "Hand-tailoring the finest bakes with love and tradition, right here in the heart of Busia."
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-cp-surface-2 rounded-full text-cp-text hover:text-cp-accent transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-cp-surface-2 rounded-full text-cp-text hover:text-cp-accent transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-cp-accent">Cravings</h4>
            <nav className="flex flex-col gap-3 text-sm font-semibold">
              <Link href="/menu" className="text-cp-text hover:text-cp-accent transition-colors">Menu</Link>
              <Link href="/menu?cat=Seasonal" className="text-cp-text hover:text-cp-accent transition-colors">Seasonal</Link>
              <Link href="/menu#custom-order" className="text-cp-text hover:text-cp-accent transition-colors">Custom Orders</Link>
            </nav>
          </div>

          {/* Column 3: The Bakery */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-cp-accent">The Bakery</h4>
            <nav className="flex flex-col gap-3 text-sm font-semibold">
              <Link href="/galore" className="text-cp-text hover:text-cp-accent transition-colors">About</Link>
              <Link href="/terms" className="text-cp-text hover:text-cp-accent transition-colors">FAQs</Link>
              <Link href="/galore" className="text-cp-text hover:text-cp-accent transition-colors">Gallery</Link>
              <Link href="/contact" className="text-cp-text hover:text-cp-accent transition-colors">Contact</Link>
              <Link href="/privacy-policy" className="text-cp-text hover:text-cp-accent transition-colors">Privacy Policy</Link>
            </nav>
          </div>

          {/* Column 4: Location & Payment */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-cp-accent">Find Us</h4>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cp-accent mt-0.5" />
                <p className="text-sm font-semibold text-cp-text leading-tight">
                  {settings.location} <br />
                  <span className="text-cp-text-muted text-xs font-normal">Open 10 AM to 6 PM</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cp-accent" />
                <a href={`https://wa.me/${settings.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-cp-accent transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-cp-border/30">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-cp-text-muted">Display Currency</span>
              <div className="flex bg-cp-surface-2/50 rounded-xl p-1 w-fit border border-cp-border">
                {["KES", "UGX"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c as "KES" | "UGX")}
                    className={cn(
                      "px-6 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all",
                      currency === c ? "bg-cp-cta text-cp-cta-text shadow-sm" : "text-cp-text-muted hover:text-cp-text"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-cp-border/30 grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-12 h-7 bg-[#3A6B35] rounded-md flex items-center justify-center border border-[#2d5a27] px-1 shadow-sm">
              <span className="text-[9px] font-black text-white italic">M-PESA</span>
            </div>
            <span className="text-[10px] font-bold text-cp-text-muted uppercase tracking-wider">Lipa na M-Pesa</span>
          </div>
          
          <div className="flex justify-center">
            <p className="text-[9px] font-medium text-cp-text-muted/60 uppercase tracking-widest flex items-center gap-1.5">
              Handcrafted by 
              <a href="https://ianotollo.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-cp-accent opacity-90 hover:opacity-100 transition-opacity">
                IanOtollo
              </a>
              <span>at</span>
              <a href="https://iomtechs.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-cp-accent opacity-90 hover:opacity-100 transition-opacity">
                IOM Techs
              </a>
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-cp-accent">
              © 2026 Clare Pastries. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
