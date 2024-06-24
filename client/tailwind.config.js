/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */

// TODO define primary colors instead of using sky
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          200: '#C0E1F1',
          300: '#96CCE8',
        },
      },
    },
  },
};
