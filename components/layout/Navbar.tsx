"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)] py-3 shadow-sm"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-sm bg-[var(--color-cta)] text-[var(--color-cta-text)] group-hover:scale-110 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="font-display text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2">
                Busia Pastries
                <span className="hidden lg:flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] font-black">Delivered with Love</span>
                </span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[var(--color-accent)]",
                    pathname === link.href
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text)]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Nav Right */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden sm:block">
                <CurrencyToggle />
              </div>

              <Link href="/cart" className="relative p-2 hover:bg-[var(--color-surface)] rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-accent)] text-[var(--color-cta-text)] text-[10px] font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link href="/account" className="hidden sm:block p-2 hover:bg-[var(--color-surface)] rounded-full transition-colors">
                <User className="w-5 h-5" />
              </Link>

              <button
                className="md:hidden p-2 hover:bg-[var(--color-surface)] rounded-full transition-colors"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[var(--color-bg)] flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-[var(--color-border)]">
              <span className="font-display text-2xl font-semibold">Busia Pastries</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[var(--color-surface)] rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between text-2xl font-display font-medium group"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t border-[var(--color-border)] space-y-6">
                <div>
                  <p className="text-sm font-medium text-[var(--color-muted)] mb-3">Currency</p>
                  <CurrencyToggle />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/account" className="flex items-center gap-3 p-4 bg-[var(--color-surface)] rounded-xl">
                    <User className="w-5 h-5" />
                    <span className="font-medium text-sm">Account</span>
                  </Link>
                  <Link href="/cart" className="flex items-center gap-3 p-4 bg-[var(--color-surface)] rounded-xl">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium text-sm">Cart ({mounted ? totalItems : 0})</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <Link href="/menu">
                <Button fullWidth size="lg">Order Now</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
