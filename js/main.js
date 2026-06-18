/**
 * Main Entry Point
 */

// Initialize EmailJS
function initMain() {
  // Load EmailJS SDK
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3.2.0/dist/email.min.js';
  script.onload = () => {
    initEmailJS();
  };
  document.head.appendChild(script);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain);
} else {
  initMain();
}

// Add CSS for lightbox
const lightboxCSS = `
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgb(0 0 0 / 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.35s ease;
  }

  .lightbox.open {
    opacity: 1;
    visibility: visible;
  }

  .lightbox-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    color: rgb(255 255 255 / 0.5);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .lightbox-close:hover {
    color: white;
  }

  .lightbox-img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    transform: scale(0.85);
    opacity: 0;
    transition: transform 0.35s ease, opacity 0.35s ease;
  }

  .lightbox-img.lightbox-image-in {
    transform: scale(1);
    opacity: 1;
  }

  .lightbox-video-container {
    width: 100%;
    max-width: 56rem;
    aspect-ratio: 16 / 9;
    margin: 0 1.5rem;
  }

  .lightbox-video-container iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Scroll to top button */
  .scroll-to-top-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 50;
    width: 52px;
    height: 52px;
    background: #E48A24;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(228, 138, 36, 0.35), 0 2px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: scale(0.5) translateY(20px);
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .scroll-to-top-btn:hover {
    background: #2A3A8C;
    box-shadow: 0 12px 32px rgba(42, 58, 140, 0.4), 0 2px 6px rgba(0, 0, 0, 0.1);
    transform: scale(1.08) translateY(-2px);
  }

  .scroll-to-top-btn:active {
    transform: scale(0.95);
  }

  .scroll-to-top-btn.visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1) translateY(0);
  }

  .scroll-to-top-btn svg {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

// Inject lightbox styles
const style = document.createElement('style');
style.textContent = lightboxCSS;
document.head.appendChild(style);

// Add animation CSS
const animationCSS = `
  .text-reveal span {
    display: inline-block;
    opacity: 0;
    transform: translateY(12px);
    animation: textReveal 0.4s ease forwards;
  }

  @keyframes textReveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const animStyle = document.createElement('style');
animStyle.textContent = animationCSS;
document.head.appendChild(animStyle);

// Export
window.initMain = initMain;