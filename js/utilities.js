/**
 * Utility Functions
 */

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Get current page URL
 * @returns {string} - Current page filename
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page;
}

/**
 * Get current year
 * @returns {number} - Current year
 */
function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Set active navigation link
 * @param {string} activePage - Current page identifier
 */
function setActiveNavLink(activePage) {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link, .footer-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop() || 'index.html';

    if (linkPage === activePage || (activePage === 'index.html' && linkPage === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Smooth scroll to element
 * @param {string|HTMLElement} target - Target element or selector
 * @param {number} offset - Offset in pixels
 */
function smoothScrollTo(target, offset = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
}

/**
 * Scroll to top of page
 * @param {boolean} smooth - Use smooth scrolling
 */
function scrollToTop(smooth = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} offset - Offset in pixels
 * @returns {boolean} - Is in viewport
 */
function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get scroll progress
 * @returns {number} - Scroll progress (0-1)
 */
function getScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
}

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date
 */
function formatDate(date, options = { month: 'long', year: 'numeric' }) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', options);
}

/**
 * Create element with attributes and children
 * @param {string} tag - HTML tag
 * @param {Object} attrs - Attributes object
 * @param {Array|string} children - Children elements or text
 * @returns {HTMLElement} - Created element
 */
function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else if (key.startsWith('on')) {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  if (typeof children === 'string') {
    element.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
 * Escape HTML entities
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Generate unique ID
 * @returns {string} - Unique ID
 */
function generateId() {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} - Copy result
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (e) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * Get query parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Update query parameter
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 * @param {string} baseUrl - Base URL (optional)
 */
function updateQueryParam(param, value, baseUrl = window.location.href) {
  const url = new URL(baseUrl);
  if (value === null || value === '') {
    url.searchParams.delete(param);
  } else {
    url.searchParams.set(param, value);
  }
  return url.toString();
}

/**
 * Check if device is mobile
 * @returns {boolean} - Is mobile device
 */
function isMobile() {
  return window.innerWidth < 768;
}

/**
 * Check if device supports touch
 * @returns {boolean} - Is touch device
 */
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Preload images
 * @param {Array<string>} urls - Image URLs
 */
function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

/**
 * Lazy load images with Intersection Observer
 */
function initLazyLoadImages() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Toggle a FAQ / accordion item open or closed.
 * Works for any container pattern where the clickable header is followed
 * by an answer block in the same parent. Uses scrollHeight so the answer
 * can be any length — no fixed max-height cap.
 *
 * @param {HTMLElement} questionEl - The clicked question element.
 * @param {Object} [options]
 * @param {boolean} [options.single=false] - If true, close all other items first.
 * @param {string} [options.itemSelector='.booking-faq-item'] - Selector of the item wrapper.
 * @param {string} [options.activeClass='open'] - Class toggled on the item wrapper.
 * @param {string} [options.iconSelector='.booking-faq-icon'] - Selector of the +/- icon (rotated).
 */
function toggleFAQ(questionEl, options = {}) {
  if (!questionEl) return;

  const {
    single = false,
    itemSelector = '.booking-faq-item',
    activeClass = 'open',
    iconSelector = '.booking-faq-icon'
  } = options;

  // Find the answer: prefer the very next sibling, fall back to any answer block inside the item.
  const item = questionEl.closest(itemSelector) || questionEl.parentElement;
  if (!item) return;

  let answer = questionEl.nextElementSibling;
  if (!answer || !answer.classList.contains('booking-faq-answer')) {
    answer = item.querySelector('.booking-faq-answer');
  }
  if (!answer) return;

  const isOpen = item.classList.contains(activeClass);

  // If single-open mode, close siblings first.
  if (single && !isOpen) {
    const siblings = document.querySelectorAll(`${itemSelector}.${activeClass}`);
    siblings.forEach(sib => {
      if (sib === item) return;
      sib.classList.remove(activeClass);
      const sibAnswer = sib.querySelector('.booking-faq-answer');
      if (sibAnswer) sibAnswer.style.maxHeight = '0px';
      const sibIcon = sib.querySelector(iconSelector);
      if (sibIcon) sibIcon.setAttribute('aria-expanded', 'false');
      const sibQ = sib.querySelector('.booking-faq-question');
      if (sibQ) sibQ.setAttribute('aria-expanded', 'false');
    });
  }

  if (isOpen) {
    // CLOSE
    answer.style.maxHeight = answer.scrollHeight + 'px'; // set to current for transition
    // Force reflow so the browser registers the starting value
    void answer.offsetHeight;
    answer.style.maxHeight = '0px';
    item.classList.remove(activeClass);
    questionEl.setAttribute('aria-expanded', 'false');
  } else {
    // OPEN
    item.classList.add(activeClass);
    answer.style.maxHeight = answer.scrollHeight + 'px';
    questionEl.setAttribute('aria-expanded', 'true');

    // After the transition, set to 'none' so content can grow if window resizes.
    const onEnd = (e) => {
      if (e.propertyName !== 'max-height') return;
      if (item.classList.contains(activeClass)) {
        answer.style.maxHeight = 'none';
      }
      answer.removeEventListener('transitionend', onEnd);
    };
    answer.addEventListener('transitionend', onEnd);
  }
}

/**
 * Initialize all FAQ accordions on the page.
 * Hooks click + keyboard (Enter/Space) on every `.booking-faq-question`
 * and seeds proper ARIA attributes.
 *
 * @param {Object} [options] - Same options as toggleFAQ.
 */
function initFAQ(options = {}) {
  const {
    single = false,
    itemSelector = '.booking-faq-item',
    activeClass = 'open',
    iconSelector = '.booking-faq-icon',
    questionSelector = '.booking-faq-question',
    answerSelector = '.booking-faq-answer'
  } = options;

  const items = document.querySelectorAll(itemSelector);
  if (!items.length) return;

  items.forEach((item, index) => {
    const question = item.querySelector(questionSelector);
    const answer = item.querySelector(answerSelector);
    const icon = item.querySelector(iconSelector);
    if (!question || !answer) return;

    // Give the answer a stable id and wire ARIA on the question.
    if (!answer.id) {
      answer.id = `faq-answer-${index + 1}`;
    }
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    question.setAttribute('aria-controls', answer.id);
    question.setAttribute('aria-expanded',
      item.classList.contains(activeClass) ? 'true' : 'false'
    );
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', answer.id);

    if (icon) {
      icon.setAttribute('aria-hidden', 'true');
    }

    // Remove inline onclick (we'll bind via JS).
    question.removeAttribute('onclick');

    const handler = (e) => {
      // Ignore clicks bubbling up from interactive children
      if (e.target.closest('a, button, input, select, textarea')) return;
      e.preventDefault();
      toggleFAQ(question, { single, itemSelector, activeClass, iconSelector });
    };

    question.addEventListener('click', handler);
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleFAQ(question, { single, itemSelector, activeClass, iconSelector });
      }
    });
  });
}

/**
 * Initialize utility functions
 */
function initUtilities() {
  // Set current year in footer
  const yearElements = document.querySelectorAll('[data-year]');
  yearElements.forEach(el => {
    el.textContent = getCurrentYear();
  });

  // Auto-initialize any FAQ accordions on the page.
  // Pages can opt into "single-open at a time" by setting
  // <div class="booking-faq-list" data-faq-single> in the HTML.
  if (document.querySelector('.booking-faq-item')) {
    const single = !!document.querySelector('.booking-faq-list[data-faq-single]');
    initFAQ({ single });
  }
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUtilities);
} else {
  initUtilities();
}

// Expose FAQ helpers globally so inline onclick="toggleFAQ(this)" works
// as a fallback even before/without initFAQ binding.
window.toggleFAQ = toggleFAQ;
window.initFAQ = initFAQ;