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
    },
  },
};
export default config;
