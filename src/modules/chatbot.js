// --- KONFIGURASI BACKEND ---
// Ganti URL ini dengan URL Replit kamu yang berakhiran .replit.app
// PENTING: Jangan lupa tambah '/chat' di belakangnya!
const BACKEND_URL = "https://c7a517f9-852c-4bf2-b91e-ee42ada1ddd7-00-3jwfzk0lbrywu.worf.replit.dev/chat";

export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return;

  // Sapaan Awal
  setTimeout(() => {
    addBotMsg("Halo! 👋 Saya asisten AI Jari. Silakan tanya tentang pengalaman atau skill saya.");
  }, 1000);

  // --- FUNGSI KIRIM KE REPLIT ---
  async function fetchReply(userMessage) {
    const loadingId = showTypingIndicator();

    try {
      // Kita panggil server Replit kita sendiri
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      removeTypingIndicator(loadingId);

      if (data.error) {
        console.error("Backend Error:", data);
        addBotMsg("⚠️ Maaf, server sedang sibuk.");
      } else {
        addBotMsg(data.reply);
      }

    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("Network Error:", error);
      // Pesan khusus kalau Replit lagi 'Tidur'
      addBotMsg("⚠️ Koneksi lambat (Server sedang bangun tidur). Coba kirim pesan lagi nanti.");
    }
  }

  // --- UI HELPERS ---
  function addBotMsg(text) {
    const div = document.createElement('div');
    div.className = "flex flex-col items-start mb-3 animate-fade-in";
    // Render HTML bold/italic dari Gemini
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
    return t
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
      .replace(/\*(.*?)\*/g, '<i>$1</i>');     // Italic
  }

  if (sendBtn && chatInput) {
    const send = () => {
      const txt = chatInput.value.trim();
      if(!txt) return;
      addUserMsg(txt);
      chatInput.value = '';
      fetchReply(txt);
    };
    sendBtn.onclick = send;
    chatInput.onkeypress = (e) => { if(e.key === 'Enter') send(); };
  }
}