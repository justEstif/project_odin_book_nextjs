/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: colors.fuchsia,
      secondary: colors.gray,
      success: colors.green,
      danger: colors.red,
      warning: colors.amber,
      info: colors.sky,
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-quicksand)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
