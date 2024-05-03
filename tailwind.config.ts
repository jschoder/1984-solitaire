/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        inset: 'inset 10px 10px 5px -7px rgba(0, 0, 0, 0.75)',
      },
      colors: {
        button: {
          bg: '#373635',
          text: '#fff',
        },
        cards: {
          back: '#373635',
          black: '#373635',
          front: '#f3efe0',
          red: '#9f3a36',
        },
        controls: {
          bg: '#282726',
        },
        counter: {
          bg: '#373635',
          text: '#fff',
        },
        successScreen: {
          bg: '#F2F2D5',
          greenLine: '#c6d2a2',
          redLine: '#A8675E',
        },
      },
      // Using the standard values from https://tailwindcss.com/docs/breakpoints for documentation
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionTimingFunction: {
        'mech-in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
