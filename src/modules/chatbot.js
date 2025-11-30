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

  // --- FUNGSI KIRIM (PASTI WORKING — NO API KEY) ---
  async function fetchGeminiReply(userMessage) {
    const loadingId = showTypingIndicator();

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: SYSTEM_PROMPT + "\nUser: " + userMessage,
        })
      });

      const data = await response.json();
      removeTypingIndicator(loadingId);

      if (data.error) {
        addBotMsg("⚠️ API Error: " + data.error);
        return;
      }

      const text = data[0]?.generated_text || "Maaf, saya tidak mengerti.";
      addBotMsg(text);

    } catch (error) {
      removeTypingIndicator(loadingId);
      addBotMsg("⚠️ Gagal koneksi ke server AI.");
    }
  }

  // --- UI HELPERS ---
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
    return text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>');
  }

  // --- EVENT SEND ---
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