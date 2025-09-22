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
          50: "#f5faff",
          100: "#e6f0ff",
          200: "#cce0ff",
          300: "#99c2ff",
          400: "#66a3ff",
          500: "#3375ff",
          600: "#265acc",
          700: "#1a3f99",
          800: "#0d2659",
          900: "#071833"
        }
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1120px",
          xl: "1280px",
          "2xl": "1440px"
        }
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.6s ease-out"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
