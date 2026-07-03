/**
 * ==========================================================================
 * LENIS SMOOTH SCROLL MODULE (lenis-scroll.js)
 * Velvet smooth inertia scrolling integrated with GSAP ScrollTrigger
 * ==========================================================================
 */

export function initLenisScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis CDN script not loaded. Falling back to native scroll.');
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2
  });

  // Sync Lenis scroll with GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.fps(60);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Navbar scrolled effect on Lenis scroll
  const navbar = document.querySelector('.navbar');
  lenis.on('scroll', ({ scroll }) => {
    if (navbar) {
      if (scroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  return lenis;
}
