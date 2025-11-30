export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatOptions = document.getElementById('chat-options');
  if (!chatWindow) return;

  // Initial Message (Delay sedikit biar natural)
  setTimeout(() => {
    addBotMsg("Halo! 👋 Saya asisten virtual Jari. Ada yang bisa dibantu?");
    showOpts([
      { text: "Lihat Skillset", label: "Skill & Tech Stack", action: () => reply("Fokus utama saya: Frontend (React/Tailwind) & Machine Learning (Python/TensorFlow). Kombinasi desain & data.") },
      { text: "Hubungi WA", label: "Chat WhatsApp", action: () => { reply("Membuka WhatsApp sekarang..."); window.open("https://wa.me/6287776058465", "_blank"); } }
    ]);
  }, 800);

  function addBotMsg(text) {
    const div = document.createElement('div');
    div.className = "flex flex-col items-start animate-fade-in";
    
    // PERBAIKAN DI SINI:
    // 1. bg-white diganti jadi bg-brand-surface (Putih di Light, Slate di Dark)
    // 2. border-stone-200 diganti jadi border-brand-border
    // 3. text-brand-text otomatis jadi hitam di Light, putih di Dark
    div.innerHTML = `
      <div class="bg-brand-surface border border-brand-border text-brand-text px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm md:text-base leading-relaxed">
        ${text}
      </div>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = "flex flex-col items-end animate-fade-in";
    
    // PERBAIKAN KONTRAS TOMBOL USER:
    // text-white (untuk Light Mode) dan dark:text-brand-bg (untuk Dark Mode)
    // Agar teks terbaca jelas di atas warna Teal/Cyan
    div.innerHTML = `
      <div class="bg-brand-accent text-white dark:text-brand-bg px-4 py-2.5 rounded-2xl rounded-tr-none shadow-md shadow-brand-accent/10 max-w-[85%] text-sm md:text-base font-bold">
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
      
      // PERBAIKAN TOMBOL OPSI:
      // Menggunakan bg-brand-surface agar tidak putih polos di dark mode
      btn.className = "px-4 py-2 bg-brand-surface border border-brand-border text-brand-text text-xs md:text-sm font-medium rounded-full hover:bg-brand-accent hover:text-white dark:hover:text-brand-bg hover:border-transparent transition-all active:scale-95 shadow-sm";
      
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
    // Loading indicator mengikuti warna text brand
    loading.className = "text-xs text-brand-muted ml-4 animate-pulse mb-2";
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