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

  // 3. DARK MODE LOGIC (NEW & READY)
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  // Cek preferensi tersimpan di LocalStorage atau System
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply tema awal saat load
  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    html.classList.add('dark');
    updateIcons(true);
  } else {
    html.classList.remove('dark');
    updateIcons(false);
  }

  // Event Listener saat tombol diklik
  if(themeToggle) {
    themeToggle.onclick = () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateIcons(isDark);
    };
  }

  // Fungsi ganti icon matahari/bulan
  function updateIcons(isDark) {
    if(sunIcon && moonIcon) {
      if (isDark) {
        sunIcon.classList.remove('hidden'); // Munculkan Matahari
        moonIcon.classList.add('hidden');   // Sembunyikan Bulan
      } else {
        sunIcon.classList.add('hidden');    // Sembunyikan Matahari
        moonIcon.classList.remove('hidden');// Munculkan Bulan
      }
    }
  }

  // 4. MODAL LOGIC (Updated for Hybrid Theme)
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
    
    // PERBAIKAN: Menggunakan class 'brand-*' agar warna teks menyesuaikan Dark/Light mode otomatis
    body.innerHTML = `
      <div class="space-y-6">
        <div>
          <strong class="text-brand-text text-sm font-bold uppercase tracking-wide block mb-1">The Challenge</strong>
          <p class="text-brand-muted leading-relaxed">${p.problem}</p>
        </div>
        
        <div class="pl-4 border-l-4 border-brand-accent bg-gray-50 dark:bg-white/5 p-4 rounded-r-lg">
          <strong class="text-brand-text text-sm font-bold block mb-1">Our Solution</strong>
          <p class="text-brand-muted text-sm">${p.solution}</p>
        </div>

        <div>
          <strong class="text-brand-text text-sm font-bold uppercase tracking-wide block mb-1">Key Results</strong>
          <p class="text-brand-accent font-bold text-lg">${p.result}</p>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    // Double requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
      panel.classList.remove('scale-95', 'opacity-0');
    });
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeModal() {
    panel.classList.add('scale-95', 'opacity-0');
    modal.classList.add('opacity-0');
    
    setTimeout(() => { 
      modal.classList.add('hidden'); 
      document.body.style.overflow = '';
    }, 300);
  }

  // Event Delegation
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-modal-trigger');
    if(trigger) {
      e.preventDefault();
      openModal(trigger.dataset.id);
    }
  });

  if(closeBtn) closeBtn.onclick = closeModal;
  if(overlay) overlay.onclick = closeModal;
  
  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
}