/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js",
    "./modules/*.js" 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          // GANTI DARI SINI: Background diganti ke "Alabaster/Warm Grey"
          bg: '#fdfbf7',        // Putih tulang hangat (Warm White/Creamy) - tidak silau
          surface: '#ffffff',   // Surface tetap putih untuk kontras halus
          
          // Warna teks diganti ke "Soft Black" (Bukan hitam pekat)
          text: '#2d2a26',      // Charcoal (Hitam kecoklatan sangat tua)
          muted: '#78716c',     // Stone-500 (Abu-abu hangat)
          
          // Warna Aksen diganti ke "Earthy Teal" (Lebih elegan & unik dibanding biru biasa)
          accent: '#0d9488',    // Teal-600 (Warna hijau laut dalam)
          accentLight: '#ccfbf1', // Teal-100 (Untuk background highlight)
          
          border: '#e7e5e4',    // Stone-200 (Garis batas hangat)
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        // Shadow diganti jadi warm shadow
        'soft': '0 4px 20px -2px rgba(44, 42, 38, 0.05)', 
      }
    },
  },
  plugins: [],
}