// --- KONFIGURASI ---
// Pastikan tidak ada spasi di awal/akhir Key!
const API_KEY = "AIzaSyBz5uZsWTAnVxF3DipP5b5JSS5RbRrAP_s"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `
Kamu adalah asisten portofolio Jari Muhammad.
Jawab singkat (max 3 kalimat), profesional, santai.
Konteks: AI Engineer, Tech Stack (Python, JS, Tailwind), Project (WA Bot, Sentiment Engine).
`;

// --- FUNGSI UTAMA ---
export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return; 

  // Sapaan awal
  setTimeout(() => {
    addBotMsg("Halo! 👋 Saya asisten AI Jari. Silakan tanya tentang pengalaman atau skill saya.");
  }, 800);

  // --- LOGIKA KIRIM (YANG DIPERBAIKI) ---
  async function fetchGeminiReply(userMessage) {
    const loadingId = showTypingIndicator();

    try {
      // 1. Kirim Request
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Format Paling Aman untuk Gemini Flash:
          contents: [{
            parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + userMessage }]
          }]
        })
      });

      // 2. Baca Respon
      const data = await response.json();
      removeTypingIndicator(loadingId);

      // 3. Cek Apakah Sukses atau Error
      if (!response.ok) {
        // Ini akan memunculkan pesan error ASLI dari Google di Console (F12)
        console.error("🚨 GOOGLE API ERROR:", data);
        addBotMsg(`Maaf, ada error teknis: ${data.error?.message || "Unknown Error"}`);
        return;
      }

      // 4. Tampilkan Jawaban
      if (data.candidates && data.candidates.length > 0) {
        const botReply = data.candidates[0].content.parts[0].text;
        addBotMsg(botReply);
      } else {
        addBotMsg("Maaf, saya bingung (No response).");
      }

    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("🚨 NETWORK ERROR:", error);
      addBotMsg("Gagal koneksi. Cek internet kamu.");
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
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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