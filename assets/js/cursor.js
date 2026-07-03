/**
 * ==========================================================================
 * CURSOR & MAGNETIC BUTTONS MODULE (cursor.js)
 * Trailing custom cursor dot, magnetic physics, and card spotlight tracking
 * ==========================================================================
 */

export function initCursorAndMagnetics() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorGlow = document.querySelector('.cursor-glow');
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (isTouchDevice) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth trailing animation loop
  function renderCursor() {
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    if (cursorDot) {
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
    }
    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .solution-tab, .faq-question');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (cursorDot) {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursorDot.style.backgroundColor = 'var(--accent-cyan)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursorDot) {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.backgroundColor = '#ffffff';
      }
    });
  });

  // Magnetic Buttons Physics
  const magneticElements = document.querySelectorAll('.magnetic-wrap');
  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const hX = rect.left + rect.width / 2;
      const hY = rect.top + rect.height / 2;
      const distanceX = e.clientX - hX;
      const distanceY = e.clientY - hY;

      el.style.transform = `translate(${distanceX * 0.35}px, ${distanceY * 0.35}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });

  // Spotlight Card Glow Tracking
  const cards = document.querySelectorAll('.glass-card, .service-card, .pricing-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
