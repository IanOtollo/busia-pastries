"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, UserCircle2, X, ChevronRight, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/store/useCart";
import { useCurrency } from "@/store/useCurrency";
import { cn } from "@/lib/utils/cn";

const SHOP_LINKS = [
  { name: "Artisan Breads", href: "/menu?cat=bread" },
  { name: "Cakes & Celebrations", href: "/menu?cat=cakes" },
  { name: "Sweet Pastries", href: "/menu?cat=pastries" },
];

const NAV_LINKS = [
  { name: "About Clare", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar({ settings }: { settings: { phone: string } }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCart((state) => state.getItemCount());
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const CroissantIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-current" strokeWidth="1.5">
      <path d="M4 16C4 16 2 14 2 11C2 8 5 6 8 6C11 6 12 8 13 9" />
      <path d="M8 18C8 18 10 16 12 16C14 16 16 18 16 14C16 10 14 8 12 8" />
      <path d="M13 16C13 16 15 14 18 14C21 14 22 16 22 19" />
      <path d="M12 8C12 8 13.5 5 16 5C18.5 5 21 7 21 10C21 13 19 14 18 14" />
    </svg>
  );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
          isScrolled ? "bg-cp-bg/80 backdrop-blur-xl shadow-sm py-4 border-b border-cp-border/50" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="relative z-50 group">
              <Logo className="w-10 h-10 group-hover:scale-110 transition-transform" hideText={false} />
            </Link>

            {/* Center: Desktop Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <div 
                className="relative group"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold tracking-wide text-cp-text hover:text-cp-accent transition-colors">
                  Shop <ChevronDown className={cn("w-4 h-4 transition-transform", isShopDropdownOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isShopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 pt-4"
                    >
                      <div className="bg-cp-surface border border-cp-border shadow-lg rounded-xl overflow-hidden min-w-[200px] py-2">
                        {SHOP_LINKS.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="block px-4 py-2.5 text-sm font-medium hover:bg-cp-surface-2 hover:text-cp-accent transition-all"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold tracking-wide transition-colors hover:text-cp-accent",
                    pathname === link.href ? "text-cp-accent" : "text-cp-text"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />

              <div className="hidden lg:flex items-center bg-cp-surface-2/50 rounded-full p-1 border border-cp-border">
                {["KES", "UGX"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c as "KES" | "UGX")}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all",
                      currency === c ? "bg-cp-cta text-cp-cta-text shadow-sm" : "text-cp-text-muted hover:text-cp-text"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <Link href="/cart" className="relative p-2.5 hover:bg-cp-surface-2 transition-colors rounded-full shadow-sm border border-transparent hover:border-cp-border">
                <ShoppingBag className="w-5 h-5 text-cp-text" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cp-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in duration-300 shadow-md">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link href="/account" className="hidden md:flex p-2.5 hover:bg-cp-surface-2 transition-colors rounded-full shadow-sm border border-transparent hover:border-cp-border">
                <UserCircle2 className="w-5 h-5 text-cp-text" />
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 relative z-50 bg-cp-surface rounded-full border border-cp-border shadow-sm text-cp-text hover:text-cp-accent transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <CroissantIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-cp-bg flex flex-col pt-32 px-8 pb-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cp-accent">Shop Collections</span>
                {SHOP_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between py-2 border-b border-cp-border/30"
                  >
                    <span className="font-display text-2xl font-semibold">{link.name}</span>
                    <ChevronRight className="w-5 h-5 text-cp-accent" />
                  </Link>
                ))}
              </div>

              <div className="space-y-4 mt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cp-accent">Explore</span>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block font-display text-4xl font-bold hover:text-cp-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-8 pt-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-cp-text-muted">Currency</span>
                  <div className="flex gap-2">
                    {["KES", "UGX"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c as "KES" | "UGX")}
                        className={cn(
                          "px-4 py-2 rounded-lg text-xs font-bold transition-all border",
                          currency === c ? "bg-cp-cta border-cp-cta text-cp-cta-text" : "bg-cp-surface border-cp-border text-cp-text-muted"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                   <span className="block text-[10px] font-bold uppercase tracking-widest text-cp-text-muted">Account</span>
                   <Link href="/account" className="flex items-center gap-2 text-cp-text font-semibold text-sm">
                      <UserCircle2 className="w-5 h-5 text-cp-accent" />
                      Dashboard
                   </Link>
                </div>
              </div>

              <div className="space-y-3">
                 <span className="block text-[10px] font-bold uppercase tracking-widest text-cp-text-muted">Direct with Clare</span>
                 <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 text-xl font-bold bg-cp-surface p-4 rounded-2xl border border-cp-border shadow-sm">
                    <div className="w-10 h-10 bg-cp-accent/10 rounded-full flex items-center justify-center text-cp-accent">
                       <Phone className="w-5 h-5" />
                    </div>
                    {settings.phone}
                 </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
