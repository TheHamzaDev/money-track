/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mLarge: "425px",
      mMedium: "375px",
      mSmall: "320px",
    },
    extend: {},
  },
  plugins: [],
};
