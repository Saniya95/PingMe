/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blush: "#F8C8DC",
          mint: "#B8E8D2",
          lavender: "#C7CEEA",
          peach: "#FFD1BA",
          sky: "#BDE0FE",
        },
      },
    },
  },
  plugins: [],
};
