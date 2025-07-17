/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
};
