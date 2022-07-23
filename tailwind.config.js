module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#1498d5",
      },
      fontFamily: {
        body: ["arial"],
        heading: ["'Merriweather', serif"],
      },
      textColor: {
        primary: "#1498d5",
      },
      backgroundColor: {
        primary: "#1498d5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
