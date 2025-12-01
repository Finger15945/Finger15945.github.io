// --- KONFIGURASI OPENROUTER ---
const API_KEY = "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"; 

// Kita pakai model Llama 3 versi Free
const MODEL_ID = "meta-llama/llama-3-8b-instruct:free";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = "Kamu adalah asisten AI untuk Jari Muhammad (AI Engineer). Jawab pertanyaan recruiter dengan singkat, padat, dan profesional dalam Bahasa Indonesia.";

export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (!chatWindow) return;

  // Sapaan Awal
  setTimeout(() => {
    addBotMsg("Halo! Sistem Llama-3 siap. Tanyakan tentang skill atau project Jari.");
  }, 1000);

  // --- FUNGSI KIRIM ---
  async function fetchLlamaReply(userMessage) {
    const loadingId = showTypingIndicator();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          // HEADER WAJIB OPENROUTER (Biar gak kena CORS)
          "HTTP-Referer": window.location.href, // Link website kamu
          "X-Title": "Jari Portfolio"
        },
        body: JSON.stringify({
          model: MODEL_ID,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await response.json();
      removeTypingIndicator(loadingId);

      // Cek Error Provider
      if (data.error) {
        console.error("OpenRouter Error:", data);
        throw new Error(data.error.message || "Provider Error");
      }

      // Ambil Jawaban (Format OpenAI Standard)
      const reply = data.choices?.[0]?.message?.content;
      addBotMsg(reply || "Maaf, tidak ada respon.");

    } catch (error) {
      removeTypingIndicator(loadingId);
      console.error("NETWORK ERROR:", error);
      addBotMsg("⚠️ Gagal koneksi ke Llama.");
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
    div.innerText = "Llama is thinking...";
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
      fetchLlamaReply(txt);
    };
    sendBtn.onclick = send;
    chatInput.onkeypress = (e) => { if(e.key === 'Enter') send(); };
  }
}