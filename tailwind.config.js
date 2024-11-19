/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './/*.{html,js,ts}',
    './src/**/*.{html,js,ts}',
    '!./node_modules//*',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
