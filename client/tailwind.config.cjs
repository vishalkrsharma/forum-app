/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      white: 'var(--color-white)',
      dark: 'var(--color-dark)',
      diffused: 'var(--color-diffused)',
      warning: 'var(--color-warning)',
      black: 'var(--color-black)',
    },
  },
  plugins: [],
};
