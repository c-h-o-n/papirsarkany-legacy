/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */

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
  plugins: [require('@tailwindcss/line-clamp')],
};
