import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SeasonalTheme } from "@/components/ui/SeasonalTheme";
import { Providers } from "./providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Busia Pastries — Premium Bakery & Confectionery",
    template: "%s | Busia Pastries",
  },
  description:
    "Premium freshly baked pastries, cakes, and artisan bread in Busia, Kenya. Order online for delivery or pickup. Made fresh daily.",
  keywords: ["pastries", "cakes", "bakery", "Busia", "Kenya", "order online", "fresh baked"],
  authors: [{ name: "Busia Pastries" }],
  creator: "Busia Pastries",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_KE",
    title: "Busia Pastries — Premium Bakery & Confectionery",
    description: "Premium pastries, cakes, and artisan bread in Busia, Kenya.",
    siteName: "Busia Pastries",
  },
  twitter: {
    card: "summary_large_image",
    title: "Busia Pastries",
    description: "Premium pastries in Busia, Kenya. Order online.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2C1810" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <SeasonalTheme />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
