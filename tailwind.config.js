/* eslint-disable no-undef */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Colors } = require('./src/styles/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...Colors
    },
    extend: {
      boxShadow: {
        app: `0 0 4px 2px ${Colors['neutral-3']}`
      }
    }
  },
  plugins: []
};
