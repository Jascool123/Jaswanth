const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- hero typewriter ---------- */
const codeLines = [
  '<section class="hero">',
  '  <h1>Grow your business</h1>',
  '  <p>Fast, custom, yours.</p>',
  '  <button>Get started</button>',
  '</section>'
].join('\n');

const codeEl = document.getElementById('typed-code');
const preview = document.getElementById('preview');

function typeCode() {
  return new Promise((resolve) => {
    if (prefersReducedMotion) {
      codeEl.textContent = codeLines;
      resolve();
      return;
    }
    codeEl.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      codeEl.textContent = codeLines.slice(0, i);
      i++;
      if (i > codeLines.length) {
        clearInterval(timer);
        resolve();
      }
    }, 18);
  });
}

async function runHeroAnimation() {
  preview.classList.remove('is-built');
  await typeCode();
  await new Promise((r) => setTimeout(r, 250));
  preview.classList.add('is-built');
}

runHeroAnimation();
if (!prefersReducedMotion) {
  setInterval(runHeroAnimation, 9000);
}

/* ---------- scroll reveal with stagger ---------- */
const revealGroups = [
  document.querySelectorAll('.service-card'),
  document.querySelectorAll('.process-step'),
  document.querySelectorAll('.price-card'),
];

revealGroups.forEach((group) => {
  group.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = prefersReducedMotion ? '0s' : `${i * 90}ms`;
  });
});

const contactPanel = document.querySelector('.contact-inner');
if (contactPanel) contactPanel.classList.add('reveal');

const allRevealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  allRevealEls.forEach((el) => observer.observe(el));
} else {
  allRevealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- tilt on hover ---------- */
if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------- flowing process line ---------- */
const processSection = document.getElementById('process');
const processFill = document.getElementById('process-fill');

function updateProcessLine() {
  if (!processSection || !processFill) return;
  const rect = processSection.getBoundingClientRect();
  const vh = window.innerHeight;
  const total = rect.height + vh * 0.6;
  const scrolled = vh * 0.85 - rect.top;
  const progress = Math.min(1, Math.max(0, scrolled / total));
  processFill.style.height = `${progress * 100}%`;
}

if (prefersReducedMotion) {
  if (processFill) processFill.style.height = '100%';
} else {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProcessLine();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProcessLine();
}

/* ---------- click to copy email ---------- */
const copyBtn = document.getElementById('copy-email');
const copyHint = document.getElementById('copy-hint');

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = 'Jaswanthchowdharypidikiti@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      copyHint.textContent = 'Copied!';
    } catch (err) {
      copyHint.textContent = email;
    }
    setTimeout(() => {
      copyHint.textContent = 'Click to copy';
    }, 2000);
  });
}
