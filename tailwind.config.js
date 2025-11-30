/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          bg: '#FAFAFA',        // Neutral 50 (Bukan putih silau, tapi soft grey-white)
          surface: '#ffffff',   // Pure White untuk kartu biar kontras dikit sama bg
          
          // WARNA BARU: "Soft Violet" (Modern AI Vibe)
          accent: '#8b5cf6',    // Violet 500 (Warna utama)
          accentLight: '#a78bfa', // Violet 400 (Untuk hover/glow)
          
          text: '#171717',      // Neutral 900 (Hitam lembut, bukan #000000)
          muted: '#737373',     // Neutral 500 (Abu-abu elegan)
          border: '#e5e5e5',    // Border sangat tipis
        }
      },
      animation: {
        'float': 'float 8s ease-in-out infinite', // Diperlambat biar calm
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      boxShadow: {
        // Shadow berwarna (Glow) tapi sangat soft
        'glow': '0 0 20px -5px rgba(139, 92, 246, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}