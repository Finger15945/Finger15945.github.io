// --- KONFIGURASI API ---
// Ganti dengan API Key kamu
const API_KEY = "AIzaSyBz5uZsWTAnVxF3DipP5b5JSS5RbRrAP_s"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// --- SYSTEM PROMPT (OTAKNYA) ---
const SYSTEM_PROMPT = `
Kamu adalah asisten virtual untuk portofolio Jari Muhammad (seorang AI & Software Engineer).
Tugasmu adalah menjawab pertanyaan pengunjung/recruiter tentang Jari secara profesional, singkat, dan ramah.

DATA TENTANG JARI:
- Role: AI Engineer & Software Engineer.
- Fokus: Membangun sistem cerdas dengan pendekatan engineering yang simpel dan scalable.
- Tech Stack Utama: Python (Machine Learning), JavaScript (Vanilla/React), Tailwind CSS, Node.js.
- Proyek Unggulan:
  1. AI WhatsApp Orchestrator (Bot Automation).
  2. Sentiment Engine (Analisis sentimen customer).
  3. Lead Data Pipeline (Integrasi data otomatis).
- Kontak: Bisa dihubungi via LinkedIn atau email (jari@example.com).

ATURAN MENJAWAB:
1. Jawablah dengan ringkas (maksimal 2-3 kalimat per chat).
2. Gunakan bahasa Indonesia yang santai tapi profesional (Tone: Helpful & Smart).
3. Jika ditanya hal di luar konteks (misal: resep masakan), tolak dengan sopan dan arahkan kembali ke topik portofolio.
`;

// --- FUNGSI UTAMA (INI YANG DICARI MAIN.JS) ---
export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const chatOptions = document.getElementById('chat-options');

  // Cek apakah elemen ada (supaya tidak error null)
  if (!chatWindow) {
    console.error("Chatbot Error: Element #chat-window tidak ditemukan di HTML.");
    return;
  }

  // Pesan Awal
  setTimeout(() => {
    addBotMsg("Halo! 👋 Saya asisten AI Jari. Ada yang ingin ditanyakan tentang skill atau pengalaman Jari?");
  }, 800);

  // Fungsi Kirim ke Gemini
  async function fetchGeminiReply(userMessage) {
    const loadingId = showTypingIndicator();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + userMessage }]
          }]
        })
      });

      const data = await response.json();
      removeTypingIndicator(loadingId);

      if (data.candidates && data.candidates[0].content) {
        const botReply = data.candidates[0].content.parts[0].text;
        addBotMsg(botReply);
      } else {
        addBotMsg("Maaf, saya sedang pusing (Server Error). Tanya lagi nanti ya.");
      }
    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("Chat Error:", error);
      addBotMsg("Koneksi error. Cek internet kamu ya.");
    }
  }

  // --- UI HELPERS ---
  
  function addBotMsg(text) {
    const div = document.createElement('div');
    div.className = "flex flex-col items-start mb-3 animate-fade-in";
    div.innerHTML = `
      <div class="bg-brand-surface border border-brand-border text-brand-text px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm">
        ${marked(text)}
      </div>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = "flex flex-col items-end mb-3 animate-fade-in";
    div.innerHTML = `
      <div class="bg-brand-accent text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-sm">
        ${text}
      </div>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const id = 'loading-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = "text-xs text-brand-muted ml-4 animate-pulse mb-2";
    div.innerText = "Jari's AI is thinking...";
    chatWindow.appendChild(div);
    scrollToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // --- EVENT LISTENERS ---
  if (sendBtn && chatInput) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      addUserMsg(text);
      chatInput.value = '';
      fetchGeminiReply(text);
    };

    sendBtn.onclick = handleSend;
    chatInput.onkeypress = (e) => {
      if (e.key === 'Enter') handleSend();
    };
  } else {
    console.warn("Chatbot Warning: Input/Button tidak ditemukan. Pastikan HTML sudah diupdate.");
  }
}

// Helper Format Text sederhana
function marked(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}