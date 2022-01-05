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
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      colors: { brand, lightbg, darkbg },
    },
  },
};

module.exports = config;
