/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cards: {
          back: '#373635',
          black: '#373635',
          front: '#f3efe0',
          red: '#9f3a36',
        },
      },
    },
  },
  plugins: [],
}
