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
        cp: {
          bg: "var(--cp-bg)",
          surface: "var(--cp-surface)",
          "surface-2": "var(--cp-surface-2)",
          border: "var(--cp-border)",
          text: "var(--cp-text)",
          "text-muted": "var(--cp-text-muted)",
          accent: "var(--cp-accent)",
          "accent-dark": "var(--cp-accent-dark)",
          cta: "var(--cp-cta)",
          "cta-hover": "var(--cp-cta-hover)",
          "cta-text": "var(--cp-cta-text)",
          success: "var(--cp-success)",
          error: "var(--cp-error)",
        },
        bp: {
          bg: "var(--cp-bg)",
          surface: "var(--cp-surface)",
          "surface-2": "var(--cp-surface-2)",
          border: "var(--cp-border)",
          text: "var(--cp-text)",
          "text-muted": "var(--cp-text-muted)",
          accent: "var(--cp-accent)",
          "accent-dark": "var(--cp-accent-dark)",
          cta: "var(--cp-cta)",
          "cta-hover": "var(--cp-cta-hover)",
          "cta-text": "var(--cp-cta-text)",
          success: "var(--cp-success)",
          error: "var(--cp-error)",
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
