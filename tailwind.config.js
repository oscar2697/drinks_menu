/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header": "url('/bg.jpg')"
      },
      animation: {
        spin: 'spin 1.2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animationDelay: {
        '0': '0ms',
        '200': '200ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
}

