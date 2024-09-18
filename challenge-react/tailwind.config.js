/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        primary: '#0F67CD',
        secondary: '#0588EB',
        marker: '#f06e1d',
        drop: '#e6f4f1',
      },
      backgroundColor: {
        primary: '#0F67CD',
        secondary: '#0588EB',
        drop: '#e6f4f1',
      },
      borderColor: {
        primary: '#0F67CD',
        secondary: '#0588EB',
      },
    },
  },
  plugins: [],
};
