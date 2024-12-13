/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './/*.{html,js,ts}',
    './src/**/*.{html,js,ts}',
    './**/*.{html,js,ts}',
    '!./node_modules//*',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brandGreen: '#004225',
        brandWhite: '#FFFFFF',
        brandYellow: '#E0B341',
        brandBlack: '#1D1D1D',
        error: '#D32F2F',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        playfairDisplay: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
