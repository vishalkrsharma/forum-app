/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        bar: 'bar 5s linear',
      },
      keyframes: {
        bar: {
          '0%': { width: '0' },
          '100%': { wdith: '100%' },
        },
      },
    },
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      white: 'var(--color-white)',
      dark: 'var(--color-dark)',
      diffused: 'var(--color-diffused)',
      warning: 'var(--color-warning)',
      black: 'var(--color-black)',
      bg: 'var(--color-bg)',
      pink: 'var(--color-bg)',
    },
  },
  plugins: [],
};
