import { projectsData } from './data.js';

export function initUI() {
  // Footer Year
  const yearEl = document.getElementById('ftYear');
  if(yearEl) yearEl.innerText = new Date().getFullYear();

  // Navbar Mobile
  const btn = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if(btn) btn.onclick = () => menu.classList.toggle('hidden');

  // Modal Logic
  const modal = document.getElementById('modal-container');
  const panel = document.getElementById('modal-panel');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-modal-trigger');
    if(trigger) {
      e.preventDefault();
      const p = projectsData.find(x => x.id === trigger.dataset.id);
      if(!p) return;
      
      title.innerText = p.title;
      body.innerHTML = `
        <div class="space-y-4 text-sm">
          <div><strong class="text-brand-accent">Masalah:</strong><p>${p.problem}</p></div>
          <div><strong class="text-brand-accent">Solusi:</strong><p>${p.solution}</p></div>
          <div><strong class="text-brand-accent">Hasil:</strong><p>${p.result}</p></div>
        </div>
      `;
      modal.classList.remove('hidden');
      setTimeout(() => { modal.classList.remove('opacity-0'); panel.classList.remove('scale-95', 'opacity-0'); }, 10);
    }
  });

  document.getElementById('modal-close-btn').onclick = () => {
    panel.classList.add('scale-95', 'opacity-0');
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
  };
  
  // Typewriter
  const typeEl = document.getElementById('typeText');
  if(typeEl) {
    const words = ["Frontend Dev", "ML Enthusiast", "Tech Explorer"];
    let i = 0, j = 0, isDeleting = false;
    function type() {
      typeEl.innerText = words[i].substring(0, j);
      if(!isDeleting && j++ === words[i].length) { isDeleting = true; setTimeout(type, 1500); return; }
      if(isDeleting && j-- === 0) { isDeleting = false; i = (i+1)%words.length; }
      setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  }
}