module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins", "Sans-serif"],
    },
    extend: {},
  },
  variants: {
    extend: {
      padding: ["hover"],
      translate: ["group-hover"],
    },
  },
  plugins: [],
};
