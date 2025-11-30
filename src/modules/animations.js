export function initAnimations() {
  // Reveal on Scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) { 
        e.target.classList.add('active'); 
        observer.unobserve(e.target); // Hanya animasi sekali biar clean
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
  
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Parallax Hero Effect (Smoother)
  const img = document.getElementById('heroPhoto');
  const container = document.getElementById('heroPhotoContainer');
  
  if(img) {
    document.addEventListener('mousemove', (e) => {
      // Menggunakan requestAnimationFrame untuk performa lebih baik
      requestAnimationFrame(() => {
        const x = (e.clientX - window.innerWidth/2) * 0.015;
        const y = (e.clientY - window.innerHeight/2) * 0.015;
        img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      });
    });
  }
}