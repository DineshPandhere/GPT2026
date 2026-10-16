/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffe',
          300: '#7cc4fd',
          400: '#36a5fa',
          500: '#0c87eb',
          600: '#006bc9',
          700: '#0155a3',
          800: '#064886',
          900: '#0b3c6f',
          950: '#07274a',
        },
        saffron: {
          50: '#fff9ed',
          100: '#ffefd5',
          200: '#ffdda9',
          300: '#ffc371',
          400: '#ffa034',
          500: '#f97e0c',
          600: '#ea6104',
          700: '#c24505',
          800: '#9a360c',
          900: '#7c2d0d',
        },
        konkan: {
          emerald: '#059669',
          sand: '#fbf8f2',
          rock: '#292524',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(249, 126, 12, 0.3)',
        'ocean-glow': '0 0 30px -5px rgba(12, 135, 235, 0.3)',
      }
    },
  },
  plugins: [],
}
