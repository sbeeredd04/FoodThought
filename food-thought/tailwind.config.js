/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d9291a",     // red
        primaryDark: "#b02514", // darker red for hover effect
        secondary: "#e87400",   // orange
        accent: "#fef0e1",      // light accent
        background: "#fafafa",  // light background
        black: "#000000",       // black
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 10px 20px -10px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};