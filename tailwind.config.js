/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gameBg: "#0F172A",
        cardBg: "#1E293B",
      }
    },
  },
  plugins: [],
}