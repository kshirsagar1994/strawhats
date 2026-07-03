/**
 * ==========================================================================
 * ANIMATIONS MODULE (animations.js)
 * GSAP SplitType Typography, Scroll Reveal, Blur Reveal & Sticky Scroll
 * ==========================================================================
 */

export function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. SplitType Section Header Animations
  if (typeof SplitType !== 'undefined') {
    const titles = document.querySelectorAll('.section-title');
    titles.forEach((title) => {
      const split = new SplitType(title, { types: 'words, chars' });
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out'
      });
    });
  }

  // 2. Generic Scroll Reveal (Cards, Badges, Subtitles)
  const revealElements = document.querySelectorAll('.reveal-up');
  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // 3. Scale & Blur Reveal for Portfolio / Case Studies
  const blurReveals = document.querySelectorAll('.blur-reveal');
  blurReveals.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.92,
      filter: 'blur(16px)',
      duration: 1.1,
      ease: 'power3.out'
    });
  });

  // 4. Floating Parallax Elements
  const floaters = document.querySelectorAll('.floating-element');
  floaters.forEach((floater, idx) => {
    gsap.to(floater, {
      y: idx % 2 === 0 ? -25 : 25,
      rotation: idx % 2 === 0 ? 5 : -5,
      duration: 3.5 + idx,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  // 5. Sticky Scroll Process Progression
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step, index) => {
    if (index > 0) {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true
        },
        scale: 0.9,
        opacity: 0.4
      });
    }
  });

  // 6. Number Counter Count-Up Animation
  const counters = document.querySelectorAll('.counter-number');
  counters.forEach((counter) => {
    const targetVal = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    const isFloat = counter.getAttribute('data-target').includes('.');

    gsap.to({ val: 0 }, {
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      val: targetVal,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: function () {
        const currentVal = isFloat ? this.targets()[0].val.toFixed(1) : Math.floor(this.targets()[0].val);
        counter.textContent = `${prefix}${currentVal}${suffix}`;
      }
    });
  });
}
