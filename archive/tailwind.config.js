/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // critical for next-themes
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
