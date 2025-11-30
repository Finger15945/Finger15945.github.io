export const projectsData = [
  {
    id: "wa-bot",
    title: "AI WhatsApp Orchestrator",
    category: "Automation & NLP",
    image: "https://placehold.co/800x600/0f172a/2dd4bf?text=WA+Auto+Bot",
    tags: ["Botpress", "Node.js", "WhatsApp API"],
    problem: "Customer Service kewalahan menangani 500+ chat repetitif harian di luar jam kerja, menyebabkan churn rate tinggi.",
    solution: "Mengembangkan Chatbot Hybrid berbasis NLP (Botpress) yang mampu memahami konteks percakapan lokal, terintegrasi langsung dengan CRM.",
    result: "Response time turun dari 4 jam menjadi <2 detik. Mengurangi beban tiket manual sebesar 60% dalam bulan pertama."
  },
  {
    id: "sentiment-ml",
    title: "E-Commerce Sentiment Engine",
    category: "Machine Learning",
    image: "https://placehold.co/800x600/0f172a/6366f1?text=Sentiment+AI",
    tags: ["Python", "Scikit-Learn", "FastAPI"],
    problem: "Tim produk kesulitan memilah ribuan ulasan pelanggan secara manual untuk menemukan bug kritis.",
    solution: "Membangun Pipeline ML (SVM + TF-IDF) untuk klasifikasi sentimen otomatis (Positif/Negatif/Urgent) dengan dashboard real-time.",
    result: "Akurasi model mencapai 88%. Tim engineer dapat mendeteksi isu produk kritis 3x lebih cepat."
  },
  {
    id: "auto-flow",
    title: "Lead Data Pipeline",
    category: "System Integration",
    image: "https://placehold.co/800x600/0f172a/2dd4bf?text=Auto+Pipeline",
    tags: ["Webhooks", "Google Cloud", "REST API"],
    problem: "Input data leads dari landing page ke spreadsheet dilakukan manual, sering terjadi human error dan duplikasi.",
    solution: "Sistem event-driven menggunakan Webhooks yang memvalidasi, memformat, dan menyimpan data secara asynchronous.",
    result: "Data integrity 100%. Menghemat estimasi 20 jam kerja/bulan untuk tim marketing."
  }
];

export function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  container.innerHTML = projectsData.map((p, index) => `
    <article class="group relative bg-brand-surface border border-white/5 rounded-2xl overflow-hidden hover:border-brand-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-accent/5 reveal flex flex-col h-full" style="transition-delay: ${index * 100}ms">
      
      <div class="h-56 overflow-hidden relative">
        <div class="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-all z-10"></div>
        <img src="${p.image}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt="${p.title}">
        
        <div class="absolute top-4 left-4 z-20 flex gap-2">
           <span class="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono font-bold text-brand-accent uppercase tracking-wider">
             ${p.category}
           </span>
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">${p.title}</h3>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${p.tags.map(tag => `<span class="text-xs text-brand-muted bg-white/5 px-2 py-1 rounded-md border border-white/5">${tag}</span>`).join('')}
        </div>
        
        <p class="text-sm text-brand-muted line-clamp-3 mb-6 flex-1">${p.problem}</p>
        
        <button data-id="${p.id}" class="open-modal-trigger w-full py-3 border border-white/10 rounded-lg text-sm font-bold text-brand-text hover:bg-brand-accent hover:text-brand-bg hover:border-transparent transition-all group-active:scale-95 flex items-center justify-center gap-2">
          View Case Study
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </article>
  `).join('');
}