// ❌ DELETE BARIS INI (Ini yang bikin error di GitHub Pages)
// import './style.css'; 

// ✅ PERBAIKI PATH (Gunakan '../' karena folder modules ada di luar folder src)
import { loadProjects } from '../modules/data.js';
import { initUI } from '../modules/ui.js';
import { initChatbot } from '../modules/chatbot.js';
import { initAnimations } from '../modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 System Booting..."); // Cek Console browser nanti

  try {
    loadProjects();     
    initUI();           
    initChatbot();      
    initAnimations();   
    console.log("✅ System Ready: All Modules Loaded");
  } catch (error) {
    console.error("❌ System Crash:", error);
  }
});