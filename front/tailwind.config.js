import { heroui } from "@heroui/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "dropdown-in": "fadeSlideIn 0.3s ease-out forwards",
        "dropdown-out": "fadeSlideOut 0.3s ease-in forwards",
      },
      keyframes: {
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(-10px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeSlideOut: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-10px) scale(0.95)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
// tailwind.config.js გამსიწორე
