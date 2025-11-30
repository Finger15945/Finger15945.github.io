import { projectsData } from './data.js';

export function initUI() {
  // Footer Year
  const yearEl = document.getElementById('ftYear');
  if(yearEl) yearEl.innerText = new Date().getFullYear();

  // Navbar Mobile Logic
  const btn = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if(btn && menu) {
    btn.onclick = () => {
      menu.classList.toggle('hidden');
    };
  }

  // Navbar Scroll Effect (Blur when scrolled)
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
      nav.classList.add('shadow-lg', 'bg-brand-bg/90');
    } else {
      nav.classList.remove('shadow-lg', 'bg-brand-bg/70');
    }
  });

  // MODAL LOGIC (Improved)
  const modal = document.getElementById('modal-container');
  const panel = document.getElementById('modal-panel');
  const overlay = document.getElementById('modal-overlay');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');
  
  function openModal(projectId) {
    const p = projectsData.find(x => x.id === projectId);
    if(!p) return;
    
    title.innerText = p.title;
    
    // Formatting content as HTML
    body.innerHTML = `
      <div class="grid gap-6">
        <div class="p-4 rounded-xl bg-white/5 border border-white/5">
          <strong class="text-brand-accent block text-xs font-mono uppercase mb-1">The Challenge</strong>
          <p class="text-gray-300 leading-relaxed">${p.problem}</p>
        </div>
        
        <div class="relative pl-4 border-l-2 border-brand-accent/50">
          <strong class="text-white block text-sm font-bold mb-2">Tech Solution</strong>
          <p class="text-gray-400 text-sm leading-relaxed">${p.solution}</p>
        </div>

        <div>
          <strong class="text-brand-accent block text-xs font-mono uppercase mb-2">Key Outcomes</strong>
          <p class="text-white font-medium text-lg">${p.result}</p>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    // Double requestAnimationFrame for transition to work
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      modal.classList.add('pointer-events-auto');
      panel.classList.remove('scale-95', 'opacity-0');
    });
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeModal() {
    panel.classList.add('scale-95', 'opacity-0');
    modal.classList.add('opacity-0');
    modal.classList.remove('pointer-events-auto');
    
    setTimeout(() => { 
      modal.classList.add('hidden'); 
      document.body.style.overflow = '';
    }, 300);
  }

  // Event Delegation for Performance
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-modal-trigger');
    if(trigger) {
      e.preventDefault();
      openModal(trigger.dataset.id);
    }
  });

  if(closeBtn) closeBtn.onclick = closeModal;
  if(overlay) overlay.onclick = closeModal;

  // Escape key close
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
}