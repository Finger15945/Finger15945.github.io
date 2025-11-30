export const projectsData = [
  {
    id: "wa-bot",
    title: "Chatbot WhatsApp",
    category: "Automation",
    image: "https://placehold.co/800x450/0B132B/6FFFE9?text=Chatbot+WhatsApp",
    subtitle: "Botpress & WhatsApp API",
    problem: "CS kewalahan balas chat berulang di luar jam kerja.",
    solution: "Chatbot AI (Botpress) handle 50+ pertanyaan umum otomatis.",
    result: "Respons instan 24/7, kurangi beban CS 60%."
  },
  {
    id: "sentiment-ml",
    title: "Analisis Sentimen",
    category: "Machine Learning",
    image: "https://placehold.co/800x450/0B132B/5BC0BE?text=Sentiment+Analysis",
    subtitle: "Python & Scikit-learn",
    problem: "Ribuan ulasan produk sulit disortir manual.",
    solution: "Pipeline ML klasifikasi teks (Positif/Negatif) otomatis.",
    result: "Akurasi 88%, deteksi komplain kritis lebih cepat."
  },
  {
    id: "auto-flow",
    title: "Automation Flow",
    category: "System Integration",
    image: "https://placehold.co/800x450/0B132B/6FFFE9?text=Automation+Flow",
    subtitle: "Webhook & Google Sheets",
    problem: "Input data lead manual rawan salah ketik.",
    solution: "API Webhook auto-input data web ke Google Sheets.",
    result: "Data 100% akurat, hemat 5 jam kerja/minggu."
  }
];

export function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = projectsData.map(p => `
    <a href="#" class="open-modal-trigger block rounded-xl overflow-hidden glass-card p-1.5 hover:scale-[1.02] transition-transform duration-300 group reveal" data-id="${p.id}">
      <div class="relative h-48 rounded-lg overflow-hidden">
        <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
        <img src="${p.image}" class="w-full h-full object-cover" alt="${p.title}">
      </div>
      <div class="p-4">
        <h3 class="text-lg font-bold text-brand-text">${p.title}</h3>
        <p class="text-sm text-brand-subtext">${p.subtitle}</p>
        <span class="text-xs text-brand-accent mt-2 inline-block">Lihat Detail →</span>
      </div>
    </a>
  `).join('');
}