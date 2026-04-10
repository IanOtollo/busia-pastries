import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, DM_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SeasonalProvider } from "@/components/providers/SeasonalProvider";
import { NextAuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { SeasonalTheme } from "@/components/ui/SeasonalTheme";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Clare Pastries | Baked Fresh. Delivered with Love.",
  description: "Hand-crafted artisan pastries and cakes by Clare in Busia Town, Kenya. Order online for delivery or pickup.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
};

import Script from "next/script";
import { getSiteSettings } from "@/lib/sanity/services";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="cp-theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('cp-theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${jost.variable} ${dmMono.variable} font-body bg-cp-bg text-cp-text antialiased`}
      >
        <NextAuthProvider>
          <SeasonalProvider>
            <div className="flex flex-col min-h-screen">
              <SeasonalTheme />
              <Navbar settings={settings} />
              <main className="flex-grow">{children}</main>
              <Footer settings={settings} />
              <CookieBanner />
              <WhatsAppCTA />
            </div>
            <Toaster position="bottom-right" />
          </SeasonalProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
