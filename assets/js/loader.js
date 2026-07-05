/**
 * ==========================================================================
 * LOADER MODULE (loader.js)
 * High-precision counter (0-100%) with GSAP Blur & Scale Curtain Reveal
 * ==========================================================================
 */

export function initLoader() {
  const preloader = document.querySelector('.preloader');
  const counterEl = document.querySelector('.preloader-counter');
  const barFillEl = document.querySelector('.preloader-bar-fill');

  if (!preloader || !counterEl || !barFillEl) return;

  let progress = 0;
  const duration = 1800; // 1.8 seconds total loader duration
  const intervalTime = 20;
  const increment = 100 / (duration / intervalTime);

  const timer = setInterval(() => {
    progress += increment + (Math.random() * 1.5 - 0.5);
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      onLoaderComplete();
    }
    counterEl.textContent = `${Math.floor(progress)}%`;
    barFillEl.style.width = `${progress}%`;
  }, intervalTime);

  function onLoaderComplete() {
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();

      tl.to('.preloader-content', {
        opacity: 0,
        y: -40,
        filter: 'blur(10px)',
        duration: 0.6,
        ease: 'power3.inOut'
      })
      .to(preloader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut'
      }, '-=0.2')
      .from('.hero-content', {
        opacity: 0,
        y: 60,
        filter: 'blur(15px)',
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.hero-visual', {
        opacity: 0,
        scale: 0.88,
        filter: 'blur(20px)',
        duration: 1.4,
        ease: 'power3.out',
        onComplete: () => {
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }
      }, '-=1.0');
    } else {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 600);
    }
  }
}
