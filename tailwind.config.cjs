/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

const lightbg = '#fff';
const darkbg = '#000';
const brand = '#9333EA';

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: { brand, lightbg, darkbg },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      fontSize: {
        '2xs': '0.65rem',
      },
    },
  },
};

module.exports = config;
