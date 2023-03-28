/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0891b2",
          // secondary: "#f6d860",
          // accent: "#37cdbe",
          // neutral: "#3d4451",
          // "base-100": "#ffffff",
        },
      },
    ],
  },
};

module.exports = config;
