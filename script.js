// Hero code-to-site animation
const codeLines = [
  '<section class="hero">',
  '  <h1>Grow your business</h1>',
  '  <p>Fast, custom, yours.</p>',
  '  <button>Get started</button>',
  '</section>'
].join('\n');

const codeEl = document.getElementById('typed-code');
const preview = document.getElementById('preview');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// Scroll reveal
const revealTargets = document.querySelectorAll('.services, .process, .pricing, .contact');
revealTargets.forEach((el) => el.classList.add('reveal'));

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
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}
