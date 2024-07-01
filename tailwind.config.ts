import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      dark: "#0c0a09",
      card: "#181816",
      light: "#f4f4f5",
      darkline: "#18181b",
      primary: "#2DFFA7",
      muted: "#71717a",
      border: "rgba(224, 211, 218, 0.26)",
      oxford: "#212A37",
      obsidian: " #0B1215",
    },
    borderRadius: {
      button: "2rem",
      card: "1rem",
    },
    borderWidth: {
      button: "0.1em",
      card: "0.1rem",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "380px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
