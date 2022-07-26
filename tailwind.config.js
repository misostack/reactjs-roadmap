const tailwindColors = require('./node_modules/tailwindcss/colors');
const colorSafeList = [];

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = [
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray'
];

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue;
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const pallette = tailwindColors[colorName];

  if (typeof pallette === 'object') {
    shades.forEach(shade => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`);
        colorSafeList.push(`bg-${colorName}-${shade}`);
      }
    });
  }
}
module.exports = {
  safelist: colorSafeList,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
        primary: '#1498d5'
      },
      fontFamily: {
        body: ['arial'],
        heading: ["'Merriweather', serif"]
      },
      textColor: {
        primary: '#1498d5'
      },
      backgroundColor: {
        primary: '#1498d5'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
