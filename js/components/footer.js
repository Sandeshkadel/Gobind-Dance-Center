/**
 * Footer Component
 */

const FOOTER_LINKS = [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Courses', href: 'course.html' },
  { label: 'Gallery', href: 'gallery.html' },
  { label: 'Blog', href: 'blog.html' },
  { label: 'Contact', href: 'contact.html' },
];

const FOOTER_PROGRAMS = [
  'Kids Dance Courses',
  'Neplai Cultural Dance ',
  'Semi Classical Basic',
  'Dance Video Direction/Compose',
  'Choreography for Events',
  'Advance Sepcial Classes',
];

/**
 * Create footer HTML
 * @returns {string} - Footer HTML
 */
function createFooterHTML() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="footer-brand-logo">
              <a href="index.html"><img class="footer-logo-image" src="assets/icons/FooterIcone.png" alt="Febicone" width="72" height="72" /></a>
            </div>
            <p class="footer-brand-desc">
              Preserving heritage through movement. Over three decades of cinematic choreography, cultural education, and artistic excellence.
            </p>
            <div class="footer-social">
              <a href="https://facebook.com/gobind.rai.5" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H8.09V12h2.35V9.8c0-2.32 1.38-3.6 3.5-3.6 1.01 0 2.06.18 2.06.18v2.27h-1.16c-1.14 0-1.5.71-1.5 1.44V12h2.56l-.41 2.88h-2.15v6.99A10 10 0 0 0 22 12Z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@GobindRaiEntertainment" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2c-.8-2.1-2.1-2.3-2.1-2.3C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.4c0 0-1.3.2-2.1 2.3C0 8.3 0 12 0 12s0 3.7.5 5.8c.8 2.1 2.1 2.3 2.1 2.3 2.1.4 9.4.4 9.4.4s7.3 0 9.4-.4c0 0 1.3-.2 2.1-2.3.5-2.1.5-5.8.5-5.8s0-3.7-.5-5.8ZM9.7 15.5V8.5l6.2 3.5-6.2 3.5Z"/>
                </svg>
              </a>
              <a href="https://wa.me/19296417574" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.07 15.32c-.15-.08-.9-.44-1.04-.5-.14-.06-.24-.08-.34.08-.1.15-.39.5-.48.6-.09.1-.18.12-.33.04-.15-.08-.65-.24-1.24-.76-.46-.41-.77-.92-.86-1.08-.09-.16-.01-.25.07-.33.08-.08.15-.18.23-.27.08-.09.1-.15.15-.25.05-.1.02-.2-.02-.28-.05-.08-.34-.92-.47-1.26-.12-.33-.25-.27-.34-.27h-.29c-.1 0-.27.04-.41.2-.14.16-.52.51-.52 1.25s.53 1.46.6 1.56c.08.1 1.03 1.58 2.5 2.18.35.15.62.24.83.31.35.11.67.1.92.06.28-.04.9-.37 1.03-.73.13-.36.13-.66.09-.73-.05-.07-.14-.11-.29-.19z"/>
                  <path d="M16 3C9.9 3 5 7.9 5 14c0 2.1.6 4 1.7 5.7L5 29l9.5-1.6c1.6 1 3.6 1.6 5.5 1.6 6.1 0 11-4.9 11-11S22.1 3 16 3zm0 20c-1.7 0-3.3-.5-4.7-1.4l-.3-.2-5.2.9.9-5.1-.2-.3C6.5 14.5 6 13 6 11c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.95a8.16 8.16 0 0 0 4.77 1.52V7.02a4.85 4.85 0 0 1-1.84-.33Z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Navigation -->
          <div class="footer-nav">
            <h4 class="footer-title">Navigation</h4>
            <ul class="footer-links">
              ${FOOTER_LINKS.map(link => `
                <li>
                  <a href="${link.href}" class="footer-link">
                    <span class="footer-link-arrow"></span>
                    ${link.label}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Programs -->
          <div class="footer-programs">
            <h4 class="footer-title">Programs</h4>
            <ul class="footer-program-list">
              ${FOOTER_PROGRAMS.map(program => `
                <li>
                  <a href="course.html" class="footer-program-link">${program}</a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-contact">
            <h4 class="footer-title">Studio</h4>
            <div class="footer-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-contact-icon">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p class="footer-contact-text">
                <a href="https://maps.app.goo.gl/D6KbNcKLLepX2wMv7" target="_blank" rel="noopener noreferrer" class="footer-location-link">
                  Gobind Dance Center<br />
                  40-08 76th St, Elmhurst<br />
                  New York City, USA
                </a>
              </p>
            </div>
            <div class="footer-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-contact-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <p class="footer-contact-text">
                <a href="tel:+1(929)641-7574" class="footer-location-link">+1(929)641-7574</a>
              </p>
            </div>
            <a href="book-meeting.html" class="footer-cta">
              Book a Session
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="footer-copyright">© ${currentYear} Gobind Dance Center. All rights reserved.</p>
          <p class="footer-location">Elmhurst, New York City • Dharan, Nepal</p>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Initialize footer
 */
function initFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  footerContainer.innerHTML = createFooterHTML();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}

// Export
window.createFooterHTML = createFooterHTML;
window.initFooter = initFooter;