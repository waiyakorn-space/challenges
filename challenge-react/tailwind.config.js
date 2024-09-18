/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
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
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
};
