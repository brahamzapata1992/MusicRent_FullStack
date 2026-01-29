/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8E6',
          100: '#FFEDB3',
          200: '#FFE180',
          300: '#FFD54D',
          400: '#FFCA1A',
          500: '#FDA310',
          600: '#E68A00',
          700: '#B36B00',
          800: '#804C00',
          900: '#4D2D00',
        },
        secondary: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D4D4D4',
          300: '#A3A3A3',
          400: '#737373',
          500: '#525252',
          600: '#404040',
          700: '#2D2D2D',
          800: '#1A1A1A',
          900: '#0D0D0D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
