"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, UserCircle2, Menu, X, ChevronRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCart((state) => state.getItemCount());
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
          isScrolled ? "bg-bp-bg/80 backdrop-blur-xl shadow-sm py-4" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="relative z-50">
              <Logo className="w-9 h-9" hideText={false} />
            </Link>

            {/* Center: Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors hover:text-bp-accent",
                    pathname === link.href ? "text-bp-accent" : "text-bp-text"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Currency Selector (Desktop) */}
              <div className="hidden lg:flex items-center bg-bp-surface-2/50 rounded-full p-1 border border-bp-border">
                {["KES", "UGX"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c as "KES" | "UGX")}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all",
                      currency === c ? "bg-bp-cta text-bp-cta-text shadow-sm" : "text-bp-text-muted hover:text-bp-text"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:bg-bp-surface-2 transition-colors rounded-full touch-target-fix">
                <ShoppingBag className="w-6 h-6 text-bp-text" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-bp-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Account (Desktop) */}
              <Link href="/account" className="hidden md:block p-2 hover:bg-bp-surface-2 transition-colors rounded-full touch-target-fix">
                <UserCircle2 className="w-6 h-6 text-bp-text" />
              </Link>

              {/* Hamburger (Mobile) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 relative z-50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-bp-bg flex flex-col pt-32 px-8 pb-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between"
                >
                  <span className="font-display text-5xl font-bold">{link.name}</span>
                  <ChevronRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-bp-accent" />
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-12">
              <div className="h-px bg-bp-border w-full" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <span className="block text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Currency</span>
                  <div className="flex flex-wrap gap-2">
                    {["KES", "UGX"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c as "KES" | "UGX")}
                        className={cn(
                          "px-6 py-3 rounded-xl text-xs font-bold transition-all border",
                          currency === c ? "bg-bp-cta border-bp-cta text-bp-cta-text" : "bg-bp-surface border-bp-border text-bp-text-muted"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <span className="block text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Account</span>
                   <Link href="/account" className="flex items-center gap-3 text-bp-text font-medium">
                      <UserCircle2 className="w-6 h-6" />
                      Dashboard
                   </Link>
                </div>
              </div>

              <div className="space-y-4">
                 <span className="block text-xs font-mono font-bold uppercase tracking-widest text-bp-text-muted">Contact Michael</span>
                 <a href="tel:+254724848228" className="flex items-center gap-4 text-2xl font-bold">
                    <div className="w-12 h-12 bg-bp-surface rounded-full flex items-center justify-center text-bp-accent border border-bp-border">
                       <Phone className="w-6 h-6" />
                    </div>
                    +254 724 848228
                 </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
