// 1. Footer Year
const yearEl = document.getElementById('ftYear');
if(yearEl) yearEl.innerText = new Date().getFullYear();

// 2. Mobile Menu
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const hidden = mobileMenu.classList.toggle('hidden');
    mobileToggle.setAttribute('aria-expanded', (!hidden).toString());
  });
}

// 3. Typewriter Effect
const phrases = ["Frontend Developer", "Machine Learning Enthusiast", "Chatbot / Automation Builder", "UX-minded Engineer"];
async function runTypewriter(el, phrases) {
  for (const p of phrases) {
    await typeString(el, p);
    await wait(900);
    await deleteString(el);
    await wait(300);
  }
  runTypewriter(el, phrases);
}
function typeString(el, str) {
  return new Promise(resolve => {
    el.textContent = '';
    let i = 0;
    const speed = 40;
    const t = setInterval(() => {
      el.textContent += str[i++];
      if (i >= str.length) { clearInterval(t); resolve(); }
    }, speed);
  });
}
function deleteString(el) {
  return new Promise(resolve => {
    let str = el.textContent;
    const speed = 28;
    const t = setInterval(() => {
      str = str.slice(0, -1);
      el.textContent = str;
      if (str.length === 0) { clearInterval(t); resolve(); }
    }, speed);
  });
}
function wait(ms){ return new Promise(res=>setTimeout(res, ms)); }

// 4. Reveal Animation Observer
function initRevealObserver() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  reveals.forEach(r => observer.observe(r));
}

// 5. Hero Parallax
function initHeroParallax() {
  const wrap = document.getElementById('heroPhotoWrap');
  const img = document.getElementById('heroPhoto');
  if (!wrap || !img) return;
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `translate(${px * 8}px, ${py * 6}px) scale(1.03)`;
  });
  wrap.addEventListener('mouseleave', () => img.style.transform = 'translate(0,0) scale(1)');
  window.addEventListener('scroll', () => {
    const top = wrap.getBoundingClientRect().top;
    const offset = Math.min(Math.max(-top / 100, -8), 8);
    wrap.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}

// 6. Spotlight Effect (Mouse Tracking)
function initSpotlightEffect() {
  const cards = document.querySelectorAll('#skills .glass, #projects .glass');
  cards.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
    el.addEventListener('mouseenter', () => el.style.setProperty('--mouse-hover', '1'));
    el.addEventListener('mouseleave', () => el.style.setProperty('--mouse-hover', '0'));
  });
}

// 7. Modal Logic
function initModalLogic() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;
  
  const modalPanel = document.getElementById('modal-panel');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  
  const tabButtons = modalContainer.querySelectorAll('.modal-tab-btn');
  const tabContents = modalContainer.querySelectorAll('.modal-tab-panel');
  const problemContent = modalContainer.querySelector('[data-tab-content="problem"] p');
  const solutionContent = modalContainer.querySelector('[data-tab-content="solution"] p');
  const resultContent = modalContainer.querySelector('[data-tab-content="result"] p');

  document.querySelectorAll('.open-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const data = trigger.dataset;
      
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      problemContent.textContent = data.problem;
      solutionContent.textContent = data.solution;
      resultContent.textContent = data.result;
      
      resetTabs();
      
      modalContainer.style.display = 'flex';
      setTimeout(() => {
        modalContainer.style.opacity = '1';
        modalPanel.style.opacity = '1';
        modalPanel.style.transform = 'scale(1)';
      }, 10);
    });
  });

  function closeModal() {
    modalPanel.style.opacity = '0';
    modalPanel.style.transform = 'scale(0.95)';
    modalContainer.style.opacity = '0';
    setTimeout(() => {
      modalContainer.style.display = 'none';
    }, 300);
  }
  
  closeBtn.addEventListener('click', closeModal);
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) closeModal();
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      tabButtons.forEach(b => {
        b.classList.remove('text-brand-accent', 'border-brand-accent', 'border-b-2');
        b.classList.add('text-brand-subtext');
      });
      btn.classList.add('text-brand-accent', 'border-brand-accent', 'border-b-2');
      btn.classList.remove('text-brand-subtext');
      
      tabContents.forEach(content => {
        if (content.dataset.tabContent === tabName) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });
  
  function resetTabs() {
    tabButtons.forEach((btn, index) => {
      const tabName = btn.dataset.tab;
      if (index === 0) {
        btn.classList.add('text-brand-accent', 'border-brand-accent', 'border-b-2');
        btn.classList.remove('text-brand-subtext');
        modalContainer.querySelector(`[data-tab-content="${tabName}"]`).style.display = 'block';
      } else {
        btn.classList.remove('text-brand-accent', 'border-brand-accent', 'border-b-2');
        btn.classList.add('text-brand-subtext');
        modalContainer.querySelector(`[data-tab-content="${tabName}"]`).style.display = 'none';
      }
    });
  }
}

// 8. Chatbot Logic
function initChatbot() {
  const chatWindow = document.getElementById('chat-window');
  const chatOptions = document.getElementById('chat-options');
  if (!chatWindow) return;

  const chatFlow = {
    'start': {
      message: "Halo! Saya asisten mini Jari. 👋 Apa yang ingin Anda ketahui?",
      options: [
        { text: "Tanya soal skill", next: "skills" },
        { text: "Lihat proyek", next: "projects" },
        { text: "Kontak langsung", next: "contact" }
      ]
    },
    'skills': {
      message: "Jari fokus pada 3 area: 1. Frontend (Tailwind, JS), 2. ML (scikit-learn), 3. Automasi (Botpress).",
      options: [ { text: "Keren!", next: "more_help" } ]
    },
    'projects': {
      message: "Anda bisa melihat proyek-proyeknya di bagian atas halaman ini. Yang favorit saya adalah 'Chatbot WhatsApp'!",
      options: [ { text: "OK, Paham", next: "more_help" } ]
    },
    'contact': {
      message: "Pilihan terbaik! Anda bisa langsung chat Jari via WhatsApp untuk respons cepat. Link-nya di bawah ini:",
      link: { text: "💬 Chat Jari di WhatsApp", href: "https://wa.me/6287776058465" },
      options: [ { text: "Terima kasih!", next: "more_help" } ]
    },
    'more_help': {
      message: "Ada lagi yang bisa saya bantu?",
      options: [
        { text: "Tanya skill", next: "skills" },
        { text: "Lihat proyek", next: "projects" },
        { text: "Kontak", next: "contact" },
        { text: "Sudah cukup", next: "end" }
      ]
    },
    'end': {
      message: "Siap! Terima kasih sudah mampir. Semoga harimu menyenangkan! ✨",
      options: []
    }
  };

  let currentStep = 'start';

  function showTyping() {
    if (document.getElementById('typing-indicator')) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble-typing'; 
    bubble.id = 'typing-indicator'; 
    bubble.innerHTML = '<span></span><span></span><span></span>';
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight; 
  }

  function hideTyping() {
    const typingBubble = document.getElementById('typing-indicator');
    if (typingBubble) typingBubble.remove();
  }

  function addMessage(text, sender = 'bot') {
    const bubble = document.createElement('div');
    if (sender === 'bot') {
      bubble.className = 'chat-bubble bg-white/5 p-3 rounded-xl max-w-[80%] text-brand-text self-start mr-auto';
    } else {
      bubble.className = 'chat-bubble bg-brand-accent p-3 rounded-xl max-w-[80%] text-brand-bg font-medium self-end ml-auto';
    }
    bubble.innerHTML = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener" class="chat-link">$1</a>');
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function showOptions(options) {
    chatOptions.innerHTML = ''; 
    options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.className = 'chat-option-btn text-sm px-4 py-2 rounded-full bg-brand-accent/20 text-brand-accent transition-all duration-200 hover:bg-brand-accent hover:text-brand-bg hover:scale-105 focus:scale-105 border border-brand-accent/30';
      btn.textContent = opt.text;
      btn.style.animationDelay = `${index * 100}ms`; 
      btn.addEventListener('click', () => {
        addMessage(opt.text, 'user');
        goToStep(opt.next);
      });
      chatOptions.appendChild(btn);
    });
  }
  
  function showLink(link) {
     if (!link) return;
     const linkEl = document.createElement('a');
     linkEl.href = link.href;
     linkEl.target = "_blank";
     linkEl.rel = "noopener";
     linkEl.className = "chat-option-btn text-sm px-4 py-2 rounded-full bg-brand-accent/20 text-brand-accent transition-all duration-200 hover:bg-brand-accent hover:text-brand-bg hover:scale-105 focus:scale-105 border border-brand-accent/30";
     linkEl.textContent = link.text;
     linkEl.style.animationDelay = '100ms';
     chatOptions.appendChild(linkEl);
  }

  function goToStep(stepName) {
    const step = chatFlow[stepName];
    if (!step) return;
    currentStep = stepName;
    showTyping();
    chatOptions.innerHTML = ''; 
    setTimeout(() => {
      hideTyping(); 
      addMessage(step.message, 'bot');
      setTimeout(() => {
        showOptions(step.options);
        showLink(step.link); 
      }, 400); 
    }, 800); 
  }

  setTimeout(() => { goToStep('start'); }, 1000); 
}

// 9. Scroll Aware Navbar
function initScrollAwareNavbar() {
  const nav = document.querySelector('nav.fixed');
  if (!nav) return; 
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('navbar-scrolled');
    } else {
      nav.classList.remove('navbar-scrolled');
    }
  }, { passive: true }); 
}

// 10. Intro Animation
function runIntroAnimation() {
  const elements = document.querySelectorAll('.intro-anim');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('is-visible');
    }, index * 250); 
  });
}

// === MAIN INITIALIZATION ===
function runPageScripts() {
  const el = document.getElementById('typeText');
  if (el) runTypewriter(el, phrases);
  
  initRevealObserver();
  initSpotlightEffect();
  initHeroParallax();
  initModalLogic();
  initChatbot();
  initScrollAwareNavbar();
}

window.addEventListener('load', () => {
  runPageScripts();
  setTimeout(runIntroAnimation, 100);
});