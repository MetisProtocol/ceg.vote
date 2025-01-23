import { createPreset } from "fumadocs-ui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.{ts,tsx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  presets: [createPreset({ preset: "neutral" })],
  theme: {
    extend: {
      width: {
        container: "1300px",
      },
      colors: {
        // Primary Colors
        primary: {
          blue: "#00CFFF",
          black: "#000000",
        },
        // Support Colors
        support: {
          white: "#F8FAFC",
          navy: {
            DEFAULT: "#001C41",
            light: "#024680",
            lighter: "#0088ED",
          },
          skyblue: {
            DEFAULT: "#00CFFF",
            light: "#A9E5FF",
          },
          darkblue: {
            DEFAULT: "#151523",
          },
          teal: {
            DEFAULT: "#002123",
            light: "#00363D",
            lighter: "#00A2AA",
          },
          cyan: {
            DEFAULT: "#ABFFFF",
          },
        },

        // Theme-specific colors
        // light mode
        bg: "#F8FAFC",
        text: "#001C41",
        border: "#00CFFF",

        // dark mode
        darkBg: "#151523",
        darkText: "#F8FAFC",
        darkBorder: "#00CFFF",

        // Keep existing utility colors
        main: "#eee",
        mainAccent: "#eee",
        overlay: "rgba(0,0,0,0.8)",
      },
      borderRadius: {
        base: "5px",
      },
      // boxShadow: {
      //   light: "0px 4px 0px #00CFFF",
      //   dark: "0px 4px 0px #00CFFF",
      // },
      // translate: {
      //   boxShadowX: "4px",
      //   boxShadowY: "4px",
      //   reverseBoxShadowX: "-4px",
      //   reverseBoxShadowY: "-4px",
      // },
      fontWeight: {
        base: "500",
        heading: "700",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
        "pulse-fade": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.6" },
        },
        "pulse-bright": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 15s linear infinite",
        marquee2: "marquee2 15s linear infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "pulse-fade": "pulse-fade 2.5s ease-in-out infinite",
        "pulse-bright": "pulse-bright 2s ease-in-out infinite",
      },
      screens: {
        w900: { raw: "(max-width: 900px)" },
        w500: { raw: "(max-width: 500px)" },
      },
    },
  },
};
export default config;
