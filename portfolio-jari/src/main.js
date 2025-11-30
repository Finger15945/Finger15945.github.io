import './style.css'; // Import CSS Global
import { loadProjects } from './modules/data.js';
import { initUI } from './modules/ui.js';
import { initChatbot } from './modules/chatbot.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();     // 1. Render Proyek
  initUI();           // 2. Aktifkan Tombol/Modal
  initChatbot();      // 3. Nyalakan Chatbot
  initAnimations();   // 4. Jalankan Animasi
  console.log("System Ready: Expert Mode");
});