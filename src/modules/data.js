export const projectsData = [
  {
  id: "intent-classifier-ML",
  title: "Intent Classification Chatbot Engine",
  category: "Machine Learning",
  image: "https://placehold.co/800x600/f1f5f9/475569?text=ML+Chatbot+Engine",
  tags: ["Python", "Keras", "NLP"],
  problem: "Materi budaya Indonesia sering terasa kurang menarik bagi siswa, sehingga saya ingin menyediakan cara belajar yang lebih interaktif dan variatif sebagai bagian dari proyek akhir Studi Independen 2022.",
  solution: "Membangun Chatbot BUDI (Budaya Indonesia) menggunakan teknik NLP klasik seperti Bag-of-Words dan Lemmatization, serta model Multilayer Perceptron (MLP) untuk memahami intent pertanyaan siswa dan menjawab seputar budaya Indonesia.",
  result: "Model mencapai akurasi 98.16% pada proses training, mampu mengklasifikasikan intent secara konsisten, dan mengurangi kebutuhan rule-based secara signifikan."
  },
  {
    id: "sentiment-ml",
    title: "Sentiment Engine",
    category: "Machine Learning",
    image: "https://placehold.co/800x600/e2e8f0/475569?text=ML+Dashboard",
    tags: ["Python", "Scikit-Learn", "FastAPI"],
    problem: "Sulit memilah ribuan ulasan pelanggan secara manual.",
    solution: "Pipeline ML (SVM) untuk klasifikasi sentimen otomatis.",
    result: "Akurasi 88%. Deteksi isu kritis 3x lebih cepat."
  },
  {
    id: "auto-flow",
    title: "Lead Data Pipeline",
    category: "Integration",
    image: "https://placehold.co/800x600/f8fafc/475569?text=Data+Flow",
    tags: ["Webhooks", "Google Cloud", "REST"],
    problem: "Input data leads manual sering terjadi human error.",
    solution: "Sistem Webhook event-driven untuk validasi otomatis.",
    result: "Data integrity 100%. Hemat 20 jam kerja/bulan."
  }
];

export function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  container.innerHTML = projectsData.map((p, index) => `
    <article class="group clean-card overflow-hidden hover:cursor-pointer open-modal-trigger reveal flex flex-col h-full" data-id="${p.id}" style="transition-delay: ${index * 100}ms">
      <div class="h-56 overflow-hidden relative bg-slate-100">
        <img src="${p.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${p.title}">
        <div class="absolute top-4 left-4">
           <span class="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-brand-accent rounded-full shadow-sm">
             ${p.category}
           </span>
        </div>
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-accent transition-colors">${p.title}</h3>
        <p class="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">${p.problem}</p>
        <div class="flex items-center text-brand-accent font-medium text-sm gap-1 group-hover:gap-2 transition-all">
          View Case Study <span>→</span>
        </div>
      </div>
    </article>
  `).join('');
}
