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
        // Inter untuk keterbacaan tinggi di paragraf
        sans: ['"Inter"', 'sans-serif'],
        // JetBrains Mono untuk kesan 'Engineering' yang kuat
        mono: ['"JetBrains Mono"', 'monospace'], 
      },
      colors: {
        brand: {
          bg: "#050505",       // Hitam Hampir Pekat (Premium)
          surface: "#121212",  // Abu-abu gelap untuk kartu/modal
          border: "#2A2A2A",   // Border tipis elegan
          text: "#EDEDED",     // Off-white (tidak menyakitkan mata)
          muted: "#888888",    // Abu-abu teks sekunder
          accent: "#3B82F6",   // Electric Blue (Fokus & Intelek)
        }
      },
      backgroundImage: {
        // Efek gradasi halus untuk background
        'gradient-subtle': 'radial-gradient(circle at top right, #1a1a1a 0%, #050505 40%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}