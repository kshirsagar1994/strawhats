/**
 * ==========================================================================
 * MAIN ORCHESTRATION MODULE (main.js)
 * Initializes Preloader, Cursor, Lenis Scroll, GSAP Animations & UI Interactivity
 * ==========================================================================
 */

import { initLoader } from './loader.js';
import { initCursorAndMagnetics } from './cursor.js';
import { initLenisScroll } from './lenis-scroll.js';
import { initAnimations } from './animations.js';
import { initComponents } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize custom cursor and magnetic buttons
  initCursorAndMagnetics();

  // 2. Initialize UI components (Accordions, Tabs, Sliders, Forms)
  initComponents();

  // 3. Initialize Lenis Smooth Scroll
  const lenis = initLenisScroll();

  // 4. Initialize GSAP & SplitType Animations
  initAnimations();

  // 5. Start page preloader & entrance sequence
  initLoader();

  console.log('✨ Strawhats Software Engineering Flagship initialized successfully.');
});
