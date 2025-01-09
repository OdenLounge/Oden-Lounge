/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto, monospace',
      serif: 'Merienda, monospace',
      mono: 'Barlow Condensed, monospace',
      tenor: 'Tenor Sans, monospace',
      lato: 'Lato, monospace',
    },
    extend: {
      height: {
        screen: '100dvh',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          '0%': { borderWidth: '0px', opacity: '0' },
          '50%': { borderWidth: '1px', opacity: '0.5' },
          '100%': { borderWidth: '2px', opacity: '1' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out',
        'draw-border': 'draw 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
