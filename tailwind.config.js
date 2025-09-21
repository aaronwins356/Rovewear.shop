/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0F172A',
          accent: '#1E293B',
          light: '#E2E8F0',
          muted: '#475569'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        elevated: '0 25px 50px -12px rgba(15, 23, 42, 0.45)'
      }
    }
  },
  plugins: []
};
