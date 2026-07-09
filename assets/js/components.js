/**
 * ==========================================================================
 * COMPONENTS INTERACTIVITY MODULE (components.js)
 * FAQ Accordion, Tabs, Testimonial Switcher, Pricing Toggle, Mobile Menu
 * ==========================================================================
 */

export function initComponents() {
  // 1. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all others
        faqItems.forEach((i) => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 2. Solutions Tabs Switcher
  const solutionTabs = document.querySelectorAll('.solution-tab');
  const solutionDisplays = document.querySelectorAll('.solution-display');
  solutionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      solutionTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      solutionDisplays.forEach((display) => {
        if (display.getAttribute('id') === targetId) {
          display.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(display, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
          }
        } else {
          display.style.display = 'none';
        }
      });
    });
  });

  // 3. Testimonials Interactive Switcher
  const testimonials = [
    {
      quote: "Linear and Apple level execution. Strawhats re-architected our high-frequency trading backend and cut latency by 84%. Truly world-class engineering.",
      author: "Marcus Vance",
      role: "CTO, Apex Quantum Financial"
    },
    {
      quote: "They didn't just write code; they transformed our AI data infrastructure into a scalable machine handling 50M+ daily events effortlessly.",
      author: "Elena Rostova",
      role: "VP of Engineering, NeuroSphere AI"
    },
    {
      quote: "The cleanest codebase and most stunning UI architecture we have ever received from a software engineering partner. 10/10.",
      author: "David Chen",
      role: "Founder & CEO, HyperScale Cloud"
    }
  ];

  let currentTestimonial = 0;
  const quoteEl = document.querySelector('.testimonial-quote');
  const authorEl = document.querySelector('.author-name');
  const roleEl = document.querySelector('.author-role');
  const nextBtn = document.querySelector('.testimonial-next');
  const prevBtn = document.querySelector('.testimonial-prev');

  function updateTestimonial(index) {
    if (!quoteEl || !authorEl || !roleEl) return;
    if (typeof gsap !== 'undefined') {
      gsap.to('.testimonial-content', {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          quoteEl.textContent = `"${testimonials[index].quote}"`;
          authorEl.textContent = testimonials[index].author;
          roleEl.textContent = testimonials[index].role;
          gsap.to('.testimonial-content', { opacity: 1, y: 0, duration: 0.3 });
        }
      });
    } else {
      quoteEl.textContent = `"${testimonials[index].quote}"`;
      authorEl.textContent = testimonials[index].author;
      roleEl.textContent = testimonials[index].role;
    }
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial(currentTestimonial);
    });
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonial);
    });
  }

  // 4. Pricing Annual vs Monthly Toggle
  const pricingToggle = document.querySelector('#pricing-toggle');
  const priceValues = document.querySelectorAll('.pricing-val');
  if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      priceValues.forEach((valEl) => {
        const monthlyPrice = valEl.getAttribute('data-monthly');
        const annualPrice = valEl.getAttribute('data-annual');
        valEl.textContent = isAnnual ? `$${annualPrice}` : `$${monthlyPrice}`;
      });
    });
  }

  // 5. Mobile Menu Navigation
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking nav item
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // 6. Contact Form Backend Integration
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✨ Sending Architecture Request...';
      submitBtn.disabled = true;

      const formData = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        'project-type': document.querySelector('#project-type').value,
        message: document.querySelector('#message').value
      };

      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        submitBtn.innerHTML = '🚀 Request Received! Our Engineers Will Reach Out.';
        submitBtn.style.background = 'var(--accent-green)';
        submitBtn.style.color = '#05050a';
        contactForm.reset();
      } catch (error) {
        console.error('Submission error:', error);
        submitBtn.innerHTML = '❌ Error. Please try again.';
        submitBtn.style.background = 'red';
        setTimeout(() => {
          submitBtn.innerHTML = origText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
}
