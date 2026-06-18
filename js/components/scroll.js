/**
 * Scroll Animations & Utilities
 */

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Unobserve after reveal (for single animation)
          if (!entry.target.classList.contains('stagger-item')) {
            revealObserver.unobserve(entry.target);
          }
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Stagger animation for children
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  } else {
    // Fallback for older browsers - show all
    reveals.forEach(el => el.classList.add('visible'));
  }
}

/**
 * Initialize parallax effect
 */
function initParallax() {
  const parallaxContainers = document.querySelectorAll('.parallax-container');

  if (parallaxContainers.length === 0) return;

  const handleScroll = () => {
    parallaxContainers.forEach(container => {
      const img = container.querySelector('img');
      if (!img) return;

      const rect = container.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const speed = parseFloat(container.dataset.speed) || 0.15;
      const offset = center * speed;

      img.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * Initialize count-up animation
 */
function initCountUp() {
  const countElements = document.querySelectorAll('.count-up');

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target) || 0;
          const suffix = el.dataset.suffix || '';
          const duration = parseInt(el.dataset.duration) || 2000;

          animateCount(el, target, suffix, duration);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));
  }
}

/**
 * Animate count number
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 * @param {string} suffix - Suffix to add
 * @param {number} duration - Duration in ms
 */
function animateCount(element, target, suffix, duration) {
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const stepDuration = duration / steps;

  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, stepDuration);
}

/**
 * Initialize text reveal animation
 */
function initTextReveal() {
  const textRevealElements = document.querySelectorAll('.text-reveal');

  if ('IntersectionObserver' in window) {
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.dataset.text || el.textContent;
          const words = text.split(' ');

          el.innerHTML = words.map((word, i) => `
            <span style="animation-delay: ${i * 0.04}s">${word}</span>
          `).join('');

          textObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    textRevealElements.forEach(el => textObserver.observe(el));
  }
}

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');

  if (!scrollBtn) {
    // Create the button if it doesn't exist
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'scroll-to-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  const button = document.getElementById('scroll-to-top');
  if (!button) return;

  const handleScroll = () => {
    if (window.scrollY > 600) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initial check
  handleScroll();
}

/**
 * Initialize all scroll utilities
 */
function initScroll() {
  initScrollReveal();
  initParallax();
  initCountUp();
  initTextReveal();
  initScrollToTop();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScroll);
} else {
  initScroll();
}

// Export
window.initScroll = initScroll;
window.initScrollReveal = initScrollReveal;
window.initParallax = initParallax;
window.initCountUp = initCountUp;
window.initTextReveal = initTextReveal;
window.initScrollToTop = initScrollToTop;