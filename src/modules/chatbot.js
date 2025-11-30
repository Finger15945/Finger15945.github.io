export function initChatbot() {
  // Kita inject HTML Floating Button & Chat Window langsung via JS
  // biar kamu gak perlu obrak-abrik index.html lagi.
  const chatbotHTML = `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <div id="chat-interface" class="bg-brand-surface border border-white/10 shadow-2xl rounded-2xl w-80 h-96 flex flex-col transition-all duration-300 transform translate-y-10 opacity-0 pointer-events-none hidden">
        <div class="p-3 bg-brand-bg/90 border-b border-white/5 flex justify-between items-center rounded-t-2xl">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="font-mono text-xs font-bold text-white">JARI_AI_BOT</span>
          </div>
          <button id="close-chat" class="text-gray-400 hover:text-white">✕</button>
        </div>
        <div id="chat-window" class="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide text-sm"></div>
        <div class="p-3 border-t border-white/5 bg-brand-bg/50">
          <div id="chat-options" class="flex flex-wrap gap-2 justify-center"></div>
        </div>
      </div>

      <button id="chat-toggle" class="w-14 h-14 bg-brand-accent rounded-full shadow-lg shadow-brand-accent/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
        <svg class="w-7 h-7 text-brand-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      </button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const toggleBtn = document.getElementById('chat-toggle');
  const chatInterface = document.getElementById('chat-interface');
  const closeBtn = document.getElementById('close-chat');
  const chatWindow = document.getElementById('chat-window');
  const chatOptions = document.getElementById('chat-options');

  let isOpen = false;

  toggleBtn.onclick = () => {
    isOpen = !isOpen;
    if (isOpen) {
      chatInterface.classList.remove('hidden', 'opacity-0', 'translate-y-10', 'pointer-events-none');
      toggleBtn.classList.add('scale-0'); // Sembunyikan tombol saat chat terbuka
      if (chatWindow.children.length === 0) startConversation();
    }
  };

  closeBtn.onclick = () => {
    isOpen = false;
    chatInterface.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    setTimeout(() => chatInterface.classList.add('hidden'), 300);
    toggleBtn.classList.remove('scale-0');
  };

  function startConversation() {
    addMsg("System Online. Halo! Saya AI Assistant Jari. Ada yang bisa dibantu?", 'bot');
    showOpts([
      { text: "Keahlian Jari?", action: () => reply("Core Stack: React/Tailwind (Frontend) & Python/TensorFlow (Machine Learning).") },
      { text: "Lihat Project", action: () => { reply("Scroll ke section Projects untuk melihat studi kasus."); document.getElementById('projects').scrollIntoView({behavior: 'smooth'}); } },
      { text: "Contact WA", action: () => { reply("Membuka WhatsApp..."); window.open("https://wa.me/6287776058465", "_blank"); } }
    ]);
  }

  function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = sender === 'bot'
      ? "bg-white/10 text-brand-text p-3 rounded-xl rounded-tl-none self-start max-w-[85%] border border-white/5"
      : "bg-brand-accent text-brand-bg p-3 rounded-xl rounded-tr-none self-end font-bold max-w-[85%]";
    div.innerText = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function reply(text) {
    const loading = document.createElement('div');
    loading.className = "text-xs text-brand-muted animate-pulse ml-2 mb-2";
    loading.innerText = "AI sedang mengetik...";
    chatWindow.appendChild(loading);
    setTimeout(() => { loading.remove(); addMsg(text, 'bot'); }, 800);
  }

  function showOpts(opts) {
    chatOptions.innerHTML = '';
    opts.forEach(o => {
      const btn = document.createElement('button');
      btn.className = "text-[10px] px-3 py-1.5 border border-brand-accent/50 text-brand-accent rounded-full hover:bg-brand-accent hover:text-brand-bg transition";
      btn.innerText = o.text;
      btn.onclick = () => { addMsg(o.text, 'user'); o.action(); };
      chatOptions.appendChild(btn);
    });
  }
}