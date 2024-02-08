/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      m_gold: "#D4AF37",
      m_black: "#111111",
      m_darkGrey: "#2a2a2a",
      m_lightGrey: "#7b7b7b",
      m_white: "#eeeeee",
    },
    extend: {
      fontFamily: {
        amaranth: ["Amaranth", "sans-serif"],
        open_sans: ["Open Sans", "sans-serif"],
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [],
};
