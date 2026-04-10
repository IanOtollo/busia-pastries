import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer({ settings }: { settings: { phone: string; location: string; businessName: string } }) {
  return (
    <footer className="bg-bp-surface border-t border-bp-border pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {/* Left: Branding */}
          <div className="space-y-6">
            <Logo className="w-8 h-8" />
            <p className="text-bp-text-muted text-sm leading-relaxed max-w-xs">
              Every Bite, a Celebration. <br />
              {settings.location}
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text">Navigation</h4>
            <nav className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/menu" className="hover:text-bp-accent transition-colors">The Menu</Link>
              <Link href="/about" className="hover:text-bp-accent transition-colors">Our Story</Link>
              <Link href="/contact" className="hover:text-bp-accent transition-colors">Reach Us</Link>
              <Link href="/orders/track" className="hover:text-bp-accent transition-colors">Track Order</Link>
            </nav>
          </div>

          {/* Right: Reach Us & Payment */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-bp-text">Reach Us</h4>
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="block text-lg font-bold hover:text-bp-accent transition-colors">
                {settings.phone}
              </a>
              <p className="text-[10px] font-mono font-bold uppercase tracking-tighter text-bp-text-muted">
                {settings.location}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">Accepted Secured Payments</span>
              <div className="flex items-center gap-3">
                 {/* M-Pesa Logo Placeholder SVG */}
                 <div className="w-16 h-8 bg-bp-surface-2 rounded-md flex items-center justify-center border border-bp-border px-2">
                    <span className="text-[12px] font-black text-[#3A6B35]">M-PESA</span>
                 </div>
                 <span className="text-[10px] items-center text-bp-text font-bold">Lipa na M-Pesa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-bp-border/50 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex gap-8 text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">
             <Link href="/privacy-policy" className="hover:text-bp-text transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-bp-text transition-colors">Terms & Conditions</Link>
          </div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-bp-text-muted">
             © 2026 Busia Pastries. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
