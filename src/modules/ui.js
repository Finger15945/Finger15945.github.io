import { projectsData } from './data.js';

export function initUI() {
  // 1. Footer Year
  const yearEl = document.getElementById('ftYear');
  if(yearEl) yearEl.innerText = new Date().getFullYear();

  // 2. Navbar Mobile Logic
  const btn = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if(btn && menu) {
    btn.onclick = () => menu.classList.toggle('hidden');
  }

  // 3. DARK MODE LOGIC (FIX FOR MOBILE & DESKTOP)
  // Kita pilih SEMUA tombol dengan class 'theme-toggle-btn'
  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const html = document.documentElement;

  // Cek preferensi
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply tema awal
  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    html.classList.add('dark');
    updateAllIcons(true);
  } else {
    html.classList.remove('dark');
    updateAllIcons(false);
  }

  // Pasang event listener ke SEMUA tombol (Desktop & Mobile)
  toggleButtons.forEach(btn => {
    btn.onclick = () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateAllIcons(isDark);
    };
  });

  // Fungsi update icon di SEMUA tombol
  function updateAllIcons(isDark) {
    toggleButtons.forEach(btn => {
      const sun = btn.querySelector('.sun-icon');
      const moon = btn.querySelector('.moon-icon');
      if (sun && moon) {
        if (isDark) {
          sun.classList.remove('hidden');
          moon.classList.add('hidden');
        } else {
          sun.classList.add('hidden');
          moon.classList.remove('hidden');
        }
      }
    });
  }

  // 4. MODAL LOGIC (Responsive)
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
    
    body.innerHTML = `
      <div class="space-y-6">
        <div>
          <strong class="text-brand-text text-sm font-bold uppercase tracking-wide block mb-1">The Challenge</strong>
          <p class="text-brand-muted leading-relaxed text-sm md:text-base">${p.problem}</p>
        </div>
        
        <div class="pl-4 border-l-4 border-brand-accent bg-gray-50 dark:bg-white/5 p-4 rounded-r-lg">
          <strong class="text-brand-text text-sm font-bold block mb-1">Our Solution</strong>
          <p class="text-brand-muted text-sm md:text-base">${p.solution}</p>
        </div>

        <div>
          <strong class="text-brand-text text-sm font-bold uppercase tracking-wide block mb-1">Key Results</strong>
          <p class="text-brand-accent font-bold text-lg">${p.result}</p>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      // Animasi berbeda untuk mobile (slide up) dan desktop (scale)
      panel.classList.remove('translate-y-20', 'scale-95', 'opacity-0');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    panel.classList.add('translate-y-20', 'scale-95', 'opacity-0');
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