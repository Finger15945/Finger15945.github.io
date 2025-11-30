export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatOptions = document.getElementById('chat-options');
  if (!chatWindow) return;

  // Initial State
  setTimeout(() => {
    addBotMsg("System initialized. Welcome, Guest.");
    setTimeout(() => {
      addBotMsg("I am Jari's Automated Assistant. How can I help you today?");
      showOpts([
        { text: "./check_skills.sh", label: "Lihat Skillset", action: () => reply("Loading modules: Frontend (React/Tailwind) & Machine Learning (Python/TF). Status: Expert.") },
        { text: "./contact_info.sh", label: "Hubungi WA", action: () => { reply("Redirecting to secure WhatsApp channel..."); setTimeout(() => window.open("https://wa.me/6287776058465", "_blank"), 1000); } },
        { text: "./project_list.sh", label: "Lihat Proyek", action: () => { reply("Scanning database... 3 Major Projects found. Please scroll to 'Projects' section."); document.getElementById('projects').scrollIntoView({behavior: 'smooth'}); } }
      ]);
    }, 800);
  }, 500);

  function addBotMsg(text) {
    const div = document.createElement('div');
    div.className = "flex gap-3 text-brand-text/90 animate-fade-in-up";
    div.innerHTML = `
      <span class="text-brand-accent font-bold shrink-0">></span>
      <p class="leading-relaxed bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/5 text-sm">${text}</p>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
  }

  function addUserMsg(text) {
    const div = document.createElement('div');
    div.className = "flex gap-3 text-brand-muted justify-end animate-fade-in-up";
    div.innerHTML = `
      <p class="leading-relaxed bg-brand-accent/10 p-3 rounded-lg rounded-tr-none border border-brand-accent/20 text-sm text-brand-accent">${text}</p>
      <span class="text-brand-muted font-bold shrink-0">@User</span>
    `;
    chatWindow.appendChild(div);
    scrollToBottom();
  }

  function showOpts(opts) {
    chatOptions.innerHTML = '';
    opts.forEach(o => {
      const btn = document.createElement('button');
      btn.className = "px-4 py-2 bg-brand-surface border border-brand-accent/30 text-brand-accent text-xs font-mono rounded hover:bg-brand-accent hover:text-brand-bg hover:border-transparent transition-all duration-200 active:scale-95";
      btn.innerText = `> ${o.label}`;
      btn.onclick = () => { 
        addUserMsg(o.label); // Tampilkan apa yang user klik
        chatOptions.innerHTML = ''; // Hapus tombol setelah klik
        o.action(); 
      };
      chatOptions.appendChild(btn);
    });
  }

  function reply(text) {
    // Simulate typing delay
    const loadingDiv = document.createElement('div');
    loadingDiv.className = "text-brand-muted text-xs font-mono ml-5 animate-pulse";
    loadingDiv.innerText = "processing...";
    chatWindow.appendChild(loadingDiv);
    scrollToBottom();

    setTimeout(() => {
      loadingDiv.remove();
      addBotMsg(text);
      // Show options again after reply (optional loop)
      setTimeout(() => {
          showOpts([
            { text: "Back", label: "Menu Utama", action: () => reply("Silakan pilih perintah:") },
            { text: "WA", label: "Chat WhatsApp", action: () => window.open("https://wa.me/6287776058465", "_blank") }
          ]);
      }, 1000);
    }, 1000); 
  }

  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}