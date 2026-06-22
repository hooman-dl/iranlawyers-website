/* ── IRAN LAWYERS — SHARED JS ── */

// Nav shadow on scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Scroll-reveal animation
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// Floating particles (hero only)
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + Math.random() * 100 + '%',
      'bottom:' + (Math.random() * -20) + '%',
      'animation-duration:' + (8 + Math.random() * 14) + 's',
      'animation-delay:' + (Math.random() * 12) + 's',
      'opacity:0'
    ].join(';');
    particleContainer.appendChild(p);
  }
}

// Animated number counter (stats)
function animateCount(el) {
  const target = el.dataset.target;
  if (!target || isNaN(target)) return;
  const num = parseInt(target);
  let current = 0;
  const step = Math.ceil(num / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, num);
    el.textContent = current + (el.dataset.suffix || '');
    if (current >= num) clearInterval(timer);
  }, 40);
}
document.querySelectorAll('[data-target]').forEach(el => {
  const obs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { animateCount(el); obs.unobserve(el); }
  });
  obs.observe(el);
});

// Smooth active nav link highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav ul a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});
