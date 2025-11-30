// --- KONFIGURASI ---
// Paste API Key BARU kamu di sini
const API_KEY = "AIzaSyBpkH-BQD3pLUcAe4lHLm8rH4i0QnqzY9w"; 

// Kita pakai endpoint v1beta yang paling toleran
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// System Prompt kita simpan sebagai string biasa
const SYSTEM_PROMPT = "Kamu adalah asisten AI Jari Muhammad. Jawab singkat, padat, dan profesional. Konteks: Jari adalah AI Engineer (Python/JS).";

export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return;

  // Sapaan Awal
  setTimeout(() => {
    addBotMsg("Halo! Sistem AI Jari siap. Ada yang bisa saya bantu?");
  }, 1000);

  // --- FUNGSI KIRIM ---
  async function fetchGeminiReply(userMessage) {
    const loadingId = showTypingIndicator();

    // TEKNIK PREPEND: Gabungkan System Prompt + Pertanyaan User jadi satu teks
    // Ini cara paling aman biar gak kena Error 400
    const finalPrompt = `${SYSTEM_PROMPT}\n\nUser bertanya: "${userMessage}"\nJawab:`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // STRUKTUR JSON YANG DISEDERHANAKAN (ANTI ERROR 400)
          contents: [{
            parts: [{ text: finalPrompt }]
          }]
        })
      });

      const data = await response.json();
      removeTypingIndicator(loadingId);

      if (!response.ok) {
        console.error("DEBUG ERROR:", data); // Cek console kalau masih merah
        addBotMsg(`⚠️ Maaf error: ${data.error?.message || "Format request ditolak"}`);
        return;
      }

      // Ambil jawaban
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      addBotMsg(reply || "Maaf, tidak ada jawaban.");

    } catch (error) {
      removeTypingIndicator(loadingId);
      addBotMsg("Gagal koneksi internet.");
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

  function formatText(t) { return t.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); }

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