import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-black tracking-tighter">Busia Pastries</span>
            </Link>
            <p className="text-[var(--color-muted)] max-w-xs leading-relaxed font-medium">
              Hand-crafted joy delivered from our artisan oven to your doorstep in Busia Town.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all hover:scale-110 shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all hover:scale-110 shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-black uppercase tracking-[0.2em] mb-8 text-[var(--color-muted)]">Curation</h4>
            <ul className="space-y-4">
              <li><Link href="/menu" className="text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">The Menu</Link></li>
              <li><Link href="/about" className="text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">Connect</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-black uppercase tracking-[0.2em] mb-8 text-[var(--color-muted)]">Boutique</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3 text-[var(--color-text)] font-bold text-sm">
                <MapPin className="w-5 h-5 shrink-0 text-[var(--color-accent)]" />
                <span>Busia Town, Kenya<br /><span className="text-[var(--color-muted)] font-medium">Opposite Victory Plaza</span></span>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text)] font-bold text-sm">
                <Phone className="w-5 h-5 shrink-0 text-[var(--color-accent)]" />
                <span>+254 757 114 743</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text)] font-bold text-sm">
                <Mail className="w-5 h-5 shrink-0 text-[var(--color-accent)]" />
                <span>hello@busiapastries.co.ke</span>
              </li>
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">We Accept</h4>
            <div className="flex flex-wrap gap-4 items-center">
              {/* M-PESA LOGO */}
              <div className="bg-white px-3 py-2 rounded-md border border-[var(--color-border)] grayscale hover:grayscale-0 transition-all cursor-default">
                <svg viewBox="0 0 100 40" className="h-6 w-auto" fill="#00AEEF">
                   <text x="0" y="30" fontWeight="bold" fontSize="24" fill="#00A3AD">M-PESA</text>
                </svg>
              </div>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Secure checkout via M-Pesa. <br />
                Baking your dreams into reality.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]">
          <p>© {currentYear} Busia Pastries. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-accent)] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
