/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // keyframes: {
      //   turn: {
      //     "0%": { transform: "rotate(0deg)" },
      //     "100%": { transform: "rotate(180deg)" },
      //   },
      // },
      animation: { turn: "turn 1s paused 1 calc(var(--scroll)*-1s)" },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
