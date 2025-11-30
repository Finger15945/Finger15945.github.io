// ✅ IMPORT LIBRARY RESMI GOOGLE (LANGSUNG DARI CDN)
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// --- KONFIGURASI ---
const API_KEY = "AIzaSyBpkH-BQD3pLUcAe4lHLm8rH4i0QnqzY9w"; 

// System Prompt
const SYSTEM_PROMPT = "Kamu adalah asisten AI Jari Muhammad. Jawab singkat, padat, dan profesional. Konteks: Jari adalah AI Engineer (Python/JS).";

export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return;

  // Inisialisasi SDK Google (Biar dia yang urus CORS & Header)
  let genAI = null;
  let model = null;

  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch (e) {
    console.error("Gagal inisialisasi AI:", e);
    addBotMsg("⚠️ Error konfigurasi API Key.");
  }

  // Sapaan Awal
  setTimeout(() => {
    addBotMsg("Halo! Sistem AI Jari siap. Ada yang bisa saya bantu?");
  }, 1000);

  // --- FUNGSI KIRIM (PAKAI SDK) ---
  async function fetchGeminiReply(userMessage) {
    if (!model) return;

    const loadingId = showTypingIndicator();

    // Gabungkan Prompt (Teknik Prepend)
    const finalPrompt = `${SYSTEM_PROMPT}\n\nUser bertanya: "${userMessage}"\nJawab:`;

    try {
      // PANGGIL AI PAKAI SDK RESMI (Lebih stabil daripada fetch manual)
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();

      removeTypingIndicator(loadingId);
      addBotMsg(text);

    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("SDK ERROR:", error);
      
      // Deteksi jenis error biar jelas
      let errorMsg = "Maaf, terjadi kesalahan.";
      if (error.message.includes("400")) errorMsg = "Format request ditolak (400).";
      if (error.message.includes("403")) errorMsg = "Akses ditolak (Cek API Key/Lokasi).";
      if (error.message.includes("Failed to fetch")) errorMsg = "Koneksi/CORS Error.";
      
      addBotMsg(`⚠️ ${errorMsg}`);
    }
  }

  // --- UI HELPERS (Tetap Sama) ---
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

  function formatText(t) { 
    if(!t) return "";
    return t.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); 
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