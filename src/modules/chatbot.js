// --- KONFIGURASI ---
const API_KEY = "AIzaSyBpkH-BQD3pLUcAe4lHLm8rH4i0QnqzY9w"; 

// 🔥 TRIK BYPASS CORS: Kita bungkus URL Google dengan Proxy
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const PROXY_URL = "https://corsproxy.io/?"; 
const API_URL = PROXY_URL + encodeURIComponent(`${BASE_URL}?key=${API_KEY}`);

const SYSTEM_PROMPT = "Kamu adalah asisten AI Jari Muhammad. Jawab singkat, profesional, dan santai. Konteks: Jari adalah AI Engineer (Python/JS/Tailwind).";

export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return;

  // Sapaan
  setTimeout(() => {
    addBotMsg("Halo! Sistem AI Jari siap. Tanyakan tentang skill atau proyek saya.");
  }, 1000);

  // --- FUNGSI KIRIM ---
  async function fetchGeminiReply(userMessage) {
    const loadingId = showTypingIndicator();

    try {
      // Kita pakai fetch biasa (tanpa SDK) karena SDK tidak support lewat Proxy
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${userMessage}\nAI:` }]
          }]
        })
      });

      // Cek Error
      if (!response.ok) {
        const errData = await response.json();
        console.error("PROXY/API ERROR:", errData);
        throw new Error(errData.error?.message || "Server Error");
      }

      const data = await response.json();
      removeTypingIndicator(loadingId);

      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      addBotMsg(reply || "Maaf, tidak ada jawaban.");

    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("NETWORK ERROR:", error);
      
      let msg = "Gagal koneksi.";
      if (error.message.includes("Failed to fetch")) msg = "Terblokir Proxy/CORS.";
      
      addBotMsg(`⚠️ ${msg} (Coba refresh atau cek internet)`);
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

  function formatText(t) { return t ? t.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') : ""; }

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