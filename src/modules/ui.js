import { projectsData } from './data.js';

export function initUI() {
  const yearEl = document.getElementById('ftYear');
  if(yearEl) yearEl.innerText = new Date().getFullYear();

  const btn = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if(btn && menu) {
    btn.onclick = () => menu.classList.toggle('hidden');
  }

  // MODAL LOGIC
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
    
    // Gunakan text-slate-600 agar terbaca di background putih
    body.innerHTML = `
      <div class="space-y-6">
        <div>
          <strong class="text-slate-900 text-sm font-bold uppercase tracking-wide block mb-1">The Challenge</strong>
          <p class="text-slate-600 leading-relaxed">${p.problem}</p>
        </div>
        
        <div class="pl-4 border-l-4 border-brand-accent bg-slate-50 p-4 rounded-r-lg">
          <strong class="text-slate-900 text-sm font-bold block mb-1">Our Solution</strong>
          <p class="text-slate-600 text-sm">${p.solution}</p>
        </div>

        <div>
          <strong class="text-slate-900 text-sm font-bold uppercase tracking-wide block mb-1">Key Results</strong>
          <p class="text-brand-accent font-bold text-lg">${p.result}</p>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      panel.classList.remove('scale-95', 'opacity-0');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    panel.classList.add('scale-95', 'opacity-0');
    modal.classList.add('opacity-0');
    setTimeout(() => { 
      modal.classList.add('hidden'); 
      document.body.style.overflow = '';
    }, 300);
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-modal-trigger');
    if(trigger) {
      e.preventDefault();
      openModal(trigger.dataset.id);
    }
  });

  if(closeBtn) closeBtn.onclick = closeModal;
  if(overlay) overlay.onclick = closeModal;
  
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
}