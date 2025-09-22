import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Manrope",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        serif: ["Playfair Display", "Georgia", "Cambria", "Times New Roman", "serif"]
      },
      colors: {
        brand: {
          50: "#ecfeff",
          500: "#0f172a",
          700: "#0b1220"
        }
      }
    }
  }
};

export default config;
