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
      <!-- Wave line animation -->
      <div class="footer-wave-line"></div>
      <!-- Glow overlay -->
      <div class="footer-glow-overlay"></div>

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
              <a href="https://facebook.com/gobind.rai.5" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img1" aria-label="YouTube">
                <img src="assets/icons/facebook.avif" alt="YouTube" class="footer-social-img" loading="lazy" />
              </a>
              <a href="https://wa.me/19296417574" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img" aria-label="YouTube">
                <img src="assets/icons/whatsapp.avif" alt="YouTube" class="footer-social-img" loading="lazy" />
              </a>
              <a href="https://www.youtube.com/@GobindRaiEntertainment" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img" aria-label="YouTube">
                <img src="assets/icons/youtube.avif" alt="YouTube" class="footer-social-img" loading="lazy" />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img" aria-label="TikTok">
                <img src="assets/icons/tiktok.avif" alt="TikTok" class="footer-social-img" loading="lazy" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img" aria-label="Instagram">
                <img src="assets/icons/instagram.jpg" alt="Instagram" class="footer-social-img" loading="lazy" />
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