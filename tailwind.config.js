/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },

      colors: {
        alabaster: {
          DEFAULT: '#f2efe7',
          100: '#3e3621',
          200: '#7b6c42',
          300: '#b09e6c',
          400: '#d1c7aa',
          500: '#f2efe7',
          600: '#f5f3ec',
          700: '#f8f6f1',
          800: '#faf9f6',
          900: '#fdfcfa',
        },
        'floral-white': {
          DEFAULT: '#f8f5ee',
          100: '#45391c',
          200: '#8a7138',
          300: '#bfa463',
          400: '#dccca8',
          500: '#f8f5ee',
          600: '#f9f7f1',
          700: '#fbf9f4',
          800: '#fcfbf8',
          900: '#fefdfb',
        },
        'old-lace': {
          DEFAULT: '#f3eddf',
          100: '#43371a',
          200: '#876e33',
          300: '#bfa057',
          400: '#d9c69a',
          500: '#f3eddf',
          600: '#f5f0e4',
          700: '#f7f4eb',
          800: '#faf7f2',
          900: '#fcfbf8',
        },
        'dim-gray': {
          DEFAULT: '#717171',
          100: '#161616',
          200: '#2d2d2d',
          300: '#434343',
          400: '#5a5a5a',
          500: '#717171',
          600: '#8d8d8d',
          700: '#a9a9a9',
          800: '#c6c6c6',
          900: '#e2e2e2',
        },
        coral: {
          DEFAULT: '#ff8a5b',
          100: '#451400',
          200: '#8b2700',
          300: '#d03b00',
          400: '#ff5816',
          500: '#ff8a5b',
          600: '#ffa17c',
          700: '#ffb99d',
          800: '#ffd0be',
          900: '#ffe8de',
        },
        burgundy: {
          DEFAULT: '#780116',
          100: '#180005',
          200: '#300009',
          300: '#49010e',
          400: '#610113',
          500: '#780116',
          600: '#c60226',
          700: '#fd1943',
          800: '#fd6681',
          900: '#feb2c0',
        },
      },
    },
  },
  plugins: [],
};
