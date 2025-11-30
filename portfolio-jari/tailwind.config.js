// tailwind.config.js - Pastikan ini sudah benar!

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B132B',        // Background
          surface: '#1C2541',   // Surface (untuk glass-card)
          accent: '#5BC0BE',    // Aksen utama
          text: '#edf2f4',      // Text utama
          muted: '#8d99ae',     // Text sekunder
        }
      },
      // ... (Animation, Keyframes, Fonts)
    },
  },
  plugins: [],
}