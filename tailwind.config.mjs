// tailwind.config.mjs
import { join } from "path";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    join(__dirname, "app/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "components/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "pages/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
