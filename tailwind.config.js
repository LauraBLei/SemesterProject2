/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './/*.{html,js,ts}',
    './src/**/*.{html,js,ts}',
    './**/*.{html,js,ts}',
    '!./node_modules//*',
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: '#004225',
        brandWhite: '#FFFFFF',
        brandYellow: '#DAA520',
        brandBlack: '#2A2A2A',
      },
    },
  },
  plugins: [],
};
