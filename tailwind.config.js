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
        sans: ['Inter', 'system-ui', 'sans-serif'], // Font utama yang bersih
        mono: ['JetBrains Mono', 'monospace'],       // Hanya untuk kode/label kecil
      },
      colors: {
        brand: {
          bg: '#f8fafc',        // Slate 50 (Background sangat muda/lembut)
          surface: '#ffffff',   // Putih bersih untuk kartu
          surfaceHighlight: '#f1f5f9', // Slate 100 untuk hover
          accent: '#4f46e5',    // Indigo 600 (Biru profesional, tidak norak)
          accentLight: '#818cf8', // Indigo 400
          text: '#0f172a',      // Slate 900 (Hitam pekat untuk teks utama)
          muted: '#64748b',     // Slate 500 (Abu-abu untuk teks sekunder)
          border: '#e2e8f0',    // Garis border tipis
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
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(79, 70, 229, 0.3)',
      }
    },
  },
  plugins: [],
}