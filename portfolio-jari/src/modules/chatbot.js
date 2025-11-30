export function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatOptions = document.getElementById('chat-options');
  if (!chatWindow) return;

  // Pesan Pertama
  addMsg("Halo! 👋 Saya asisten virtual Jari. Ada yg bisa dibantu?", 'bot');
  showOpts([
    { text: "Skill Jari?", action: () => reply("Skill utama: Frontend (Tailwind/JS) & ML (Python).") },
    { text: "Kontak WA", action: () => { reply("Langsung chat WA beliau saja!"); window.open("https://wa.me/6287776058465", "_blank"); } }
  ]);

  function addMsg(text, sender) {
    const div = document.createElement('div');
    div.className = sender === 'bot' 
      ? "bg-white/10 p-3 rounded-xl rounded-tl-none self-start text-sm max-w-[85%]"
      : "bg-brand-accent text-brand-bg p-3 rounded-xl rounded-tr-none self-end text-sm font-bold max-w-[85%]";
    div.innerText = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function showOpts(opts) {
    chatOptions.innerHTML = '';
    opts.forEach(o => {
      const btn = document.createElement('button');
      btn.className = "text-xs px-3 py-1 border border-brand-accent text-brand-accent rounded-full hover:bg-brand-accent hover:text-brand-bg transition";
      btn.innerText = o.text;
      btn.onclick = () => { addMsg(o.text, 'user'); o.action(); };
      chatOptions.appendChild(btn);
    });
  }

  function reply(text) { setTimeout(() => addMsg(text, 'bot'), 500); }
}