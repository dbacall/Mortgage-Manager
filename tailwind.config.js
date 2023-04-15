/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        content: {
          primary: '#030712',
          secondary: '#4b5563',
          tertiary: '#9ca3af'
        },
      },
      spacing: {
        '112': '28rem',
        '128': '32rem',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // 'corporate',
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
