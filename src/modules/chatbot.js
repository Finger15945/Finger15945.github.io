// 🔥 IMPORT SDK RESMI GOOGLE (LANGSUNG DARI CLOUD)
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// --- KONFIGURASI ---
const API_KEY = "AIzaSyBpkH-BQD3pLUcAe4lHLm8rH4i0QnqzY9w"; 

// System Prompt: Identitas AI
const SYSTEM_INSTRUCTION = `
Kamu adalah asisten profesional untuk Jari Muhammad (AI Engineer).
Style: Singkat, padat, teknis tapi ramah.
Fakta: Jari ahli Python, TensorFlow, JS, dan membangun bot WA otomatis.
Tugas: Jawab pertanyaan recruiter tentang skill dan proyek Jari.
`;

export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return;

  // Inisialisasi AI (Hanya sekali di awal)
  let model = null;
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch (e) {
    console.error("AI Init Error:", e);
  }

  // Pesan Pembuka
  setTimeout(() => {
    addBotMsg("Halo! 👋 Saya AI yang dilatih dari data Jari. Silakan tanya teknis atau pengalaman kerja.");
  }, 1000);

  // --- LOGIKA UTAMA ---
  async function fetchGeminiReply(userMessage) {
    if (!model) {
      addBotMsg("⚠️ Error: AI belum siap (API Key invalid).");
      return;
    }

    const loadingId = showTypingIndicator();

    try {
      // TEKNIK: Kita gabung System Prompt + User Chat biar AI paham konteks
      // (Ini lebih stabil daripada pakai parameter system_instruction terpisah di versi web)
      const finalPrompt = `${SYSTEM_INSTRUCTION}\n\nUser bertanya: "${userMessage}"\nJawab:`;

      // KIRIM KE GOOGLE (SDK yang urus semua format & headers)
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();

      removeTypingIndicator(loadingId);
      addBotMsg(text);

    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("GEMINI ERROR:", error); // Cek Console (F12) untuk detail

      let msg = "Maaf, koneksi terputus.";
      if (error.message.includes("400")) msg = "Request ditolak (Cek API Key).";
      if (error.message.includes("429")) msg = "Server sibuk (Kuota habis).";
      if (error.message.includes("Failed to fetch")) msg = "Koneksi diblokir browser (Cek API Key Restriction).";
      
      addBotMsg(`⚠️ ${msg}`);
    }
  }

  // --- UI HELPERS (JANGAN DIUBAH) ---
  function addBotMsg(text) {
    const div = document.createElement('div');
    div.className = "flex flex-col items-start mb-3 animate-fade-in";
    div.innerHTML = `<div class="bg-brand-surface border border-brand-border text-brand-text px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm">${formatText(text)}</div>`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = "flex flex-col items-end mb-3 animate-fade-in";
    div.innerHTML = `<div class="bg-brand-accent text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-sm">${text}</div>`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function showTypingIndicator() {
    const id = 'l-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = "text-xs text-brand-muted ml-4 animate-pulse mb-2";
    div.innerText = "Thinking...";
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if(el) el.remove();
  }

  // Ubah Markdown Bold (**) jadi HTML <b>
  function formatText(t) { 
    return t ? t.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') : ""; 
  }

  if (sendBtn && chatInput) {
    const send = () => {
      const txt = chatInput.value.trim();
      if(!txt) return;
      addUserMsg(txt);
      chatInput.value = '';
      fetchGeminiReply(txt);
    };
    sendBtn.onclick = send;
    chatInput.onkeypress = (e) => { if(e.key === 'Enter') send(); };
  }
}