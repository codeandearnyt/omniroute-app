import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        slate: {
          0: "#F8FAFC",
          50: "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#1E293B",
          700: "#0F172A",
          800: "#020617",
          900: "#01040f",
          950: "#000000",
        },
        emerald: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#146C35",
          900: "#10582D",
          950: "#052E16",
        },
        rose: {
          50: "#FFF1F2",
          100: "#FEE2E4",
          200: "#FECACA",
          300: "#FEA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
        },
        amber: {
          50: "#FAFAFE",
          100: "#FEF3CF",
          200: "#FDE68A",
          300: "#FCD37F",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#EAB308",
          700: "#CA8A04",
          800: "#A16207",
          900: "#854C02",
          950: "#4A2C00",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Geist", "sans-serif"],
      },
      keyframes: {
        accordion-down: {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-height)" },
        },
        accordion-up: {
          from: { height: "var(--radix-accordion-height)" },
          to: { height: "0" },
        },
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "50%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, -40%) scale(0.98)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0.7" },
        },
      },
      animation: {
        accordion-down: "accordion-down 0.2s ease-out",
        accordion-up: "accordion-up 0.2s ease-out",
        blob: "blob 20s ease-in-out infinite",
        spotlight: "spotlight 0.5s ease-in-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [
    forms,
    typography,
    animate,
  ],
} satisfies Config;