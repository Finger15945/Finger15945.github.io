export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatOptions = document.getElementById('chat-options');
  if (!chatWindow) return;

  setTimeout(() => {
    addBotMsg("Halo! 👋 Saya asisten virtual Jari. Ada yang bisa dibantu?");
    showOpts([
      { text: "Lihat Skillset", label: "Skill & Tech Stack", action: () => reply("Fokus utama saya: Frontend (React/Tailwind) & Machine Learning (Python/TensorFlow). Kombinasi desain & data.") },
      { text: "Hubungi WA", label: "Chat WhatsApp", action: () => { reply("Membuka WhatsApp sekarang..."); window.open("https://wa.me/6287776058465", "_blank"); } }
    ]);
  }, 500);

  function addBotMsg(text) {
    const div = document.createElement('div');
    // Ganti border-slate-100 jadi border-stone-200 (lebih warm)
    div.className = "flex flex-col items-start animate-fade-in";
    div.innerHTML = `
      <div class="bg-white border border-stone-200 text-brand-text px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm leading-relaxed">
        ${text}
      </div>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    // Ganti bg-brand-accent (Teal sekarang)
    div.className = "flex flex-col items-end animate-fade-in";
    div.innerHTML = `
      <div class="bg-brand-accent text-white px-4 py-2.5 rounded-2xl rounded-tr-none shadow-md shadow-teal-900/10 max-w-[85%] text-sm font-medium">
        ${text}
      </div>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
  }

  function showOpts(opts) {
    chatOptions.innerHTML = '';
    opts.forEach(o => {
      const btn = document.createElement('button');
      // Style Tombol Option: Outline simple
      btn.className = "px-4 py-2 bg-white border border-brand-accent text-brand-accent text-xs font-semibold rounded-full hover:bg-brand-accent hover:text-white transition-all active:scale-95 shadow-sm";
      btn.innerText = o.label;
      btn.onclick = () => { 
        addUserMsg(o.label);
        chatOptions.innerHTML = '';
        o.action(); 
      };
      chatOptions.appendChild(btn);
    });
  }

  function reply(text) {
    const loading = document.createElement('div');
    loading.className = "text-xs text-slate-400 ml-2 animate-pulse mb-2";
    loading.innerText = "Jari's AI is typing...";
    chatWindow.appendChild(loading);
    scrollToBottom();

    setTimeout(() => {
      loading.remove();
      addBotMsg(text);
      setTimeout(() => {
        showOpts([
          { text: "Reset", label: "Menu Awal", action: () => reply("Silakan pilih topik:") },
          { text: "WA", label: "Kontak Langsung", action: () => window.open("https://wa.me/6287776058465", "_blank") }
        ]);
      }, 800);
    }, 1000); 
  }

  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}