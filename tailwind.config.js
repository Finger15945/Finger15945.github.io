/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // PENTING: Agar tombol switch berfungsi
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
      // Ganti bagian colors di tailwind.config.js
      colors: {
        brand: {
          bg: '#0F172A',         // Slate-900 (Lebih modern daripada #0B132B)
          surface: '#1E293B',    // Slate-800
          accent: '#38BDF8',     // Sky-400 (Warna "Tech" standar industri saat ini)
          text: '#F8FAFC',       
          subtext: '#94A3B8',    
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(45, 212, 191, 0.3)',
      }
    },
  },
  plugins: [],
}