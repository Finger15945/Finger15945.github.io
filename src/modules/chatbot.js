// --- KONFIGURASI BARU ---
// PASTE KEY BARU KAMU DI SINI (JANGAN PAKE YANG LAMA)
const API_KEY = "AIzaSyBpkH-BQD3pLUcAe4lHLm8rH4i0QnqzY9w"; 

// Kita gunakan URL yang paling stabil untuk Free Tier
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

// --- SYSTEM PROMPT ---
const SYSTEM_PROMPT = `
Kamu adalah asisten AI Jari Muhammad. Jawab singkat (max 3 kalimat), santai, dan profesional.
Data: AI Engineer, Tech Stack (Python, JS, Tailwind), Project (WA Bot, Sentiment Engine).
`;

export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return;

  // Pesan sambutan
  setTimeout(() => {
    addBotMsg("Halo! 👋 Saya asisten AI Jari. Tanyakan sesuatu tentang portofolio ini.");
  }, 800);

  // --- FUNGSI KIRIM ---
  async function fetchGeminiReply(userMessage) {
    const loadingId = showTypingIndicator();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Struktur JSON "Safety" (Kadang role:user bikin error di Flash, kita hapus saja)
          contents: [{
            parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + userMessage }]
          }]
        })
      });

      const data = await response.json();
      removeTypingIndicator(loadingId);

      // CEK ERROR DARI GOOGLE
      if (!response.ok) {
        console.error("🚨 API ERROR:", data);
        // Tampilkan pesan error spesifik biar kita tau salahnya apa
        addBotMsg(`⚠️ Error API: ${data.error?.message || "Kunci bermasalah"}`);
        return;
      }

      if (data.candidates && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        addBotMsg(text);
      } else {
        addBotMsg("Maaf, saya tidak mengerti.");
      }

    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("🚨 NETWORK ERROR:", error);
      addBotMsg("Gagal koneksi. Cek internet.");
    }
  }

  // --- UI HELPERS (Sama seperti sebelumnya) ---
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
    const id = 'loading-' + Date.now();
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
    if (el) el.remove();
  }

  function formatText(text) {
    // Ubah **bold** jadi <b> dan *italic* jadi <i>
    return text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>');
  }

  if (sendBtn && chatInput) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      addUserMsg(text);
      chatInput.value = '';
      fetchGeminiReply(text);
    };
    sendBtn.onclick = handleSend;
    chatInput.onkeypress = (e) => { if (e.key === 'Enter') handleSend(); };
  }
}