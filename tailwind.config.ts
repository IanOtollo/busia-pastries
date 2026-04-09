import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bp: {
          bg: "var(--bp-bg)",
          surface: "var(--bp-surface)",
          "surface-2": "var(--bp-surface-2)",
          border: "var(--bp-border)",
          text: "var(--bp-text)",
          "text-muted": "var(--bp-text-muted)",
          accent: "var(--bp-accent)",
          "accent-dark": "var(--bp-accent-dark)",
          cta: "var(--bp-cta)",
          "cta-hover": "var(--bp-cta-hover)",
          "cta-text": "var(--bp-cta-text)",
          success: "var(--bp-success)",
          error: "var(--bp-error)",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        "card-hover": "var(--shadow-card-hover)",
      },
      borderRadius: {
        xl: "12px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        pulse: "pulse 0.6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
