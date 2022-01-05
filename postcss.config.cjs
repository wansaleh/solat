const tailwindcss = require('tailwindcss');
const nesting = require('tailwindcss/nesting');
const autoprefixer = require('autoprefixer');

const config = {
  plugins: [
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    nesting(),
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer(),
  ],
};

module.exports = config;
