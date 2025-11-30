/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js" // Pastikan file JS di root juga ter-scan
  ],
  theme: {
    extend: {
      fontFamily: {
        // Font untuk paragraf / UI umum (Bersih & Modern)
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Font untuk Heading / Aksen Teknis
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          bg: '#0B132B',        
          surface: '#1C2541',   
          accent: '#5BC0BE',    
          text: '#ffffff',      // Pure white untuk teks utama agar kontras tinggi
          muted: '#94a3b8',     // Slate-400 (Lebih terbaca daripada abu-abu gelap)
        }
      },
    },
  },
  plugins: [],
}