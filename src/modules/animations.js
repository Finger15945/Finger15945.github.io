export function initAnimations() {
  // Reveal on Scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Parallax Hero
  const img = document.getElementById('heroPhoto');
  if(img) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX - window.innerWidth/2) * 0.02;
      const y = (e.clientY - window.innerHeight/2) * 0.02;
      img.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}