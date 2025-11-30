/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#1a2332',
          accent: '#7dd3c0',
          secondary: '#6ba5a8',
          text: '#e8eef2',
          subtext: '#a8b8d8'
        }
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        bgShift: { '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' } }
      },
      animation: {
        floaty: 'floaty 10s ease-in-out infinite',
        bgShift: 'bgShift 30s linear infinite'
      }
    },
  },
  plugins: [],
}