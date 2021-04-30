/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {
    borderColor: ["responsive", "hover", "focus", "focus-within"],
    extend: {},
  },
  plugins: [],
};
