/**
 * Navigation Component
 */

const NAV_LINKS = [
  { label: 'Home', key: 'home', href: 'index.html' },
  { label: 'About', key: 'about', href: 'about.html' },
  { label: 'Courses', key: 'courses', href: 'course.html' },
  { label: 'Gallery', key: 'gallery', href: 'gallery.html' },
  { label: 'Blog', key: 'blog', href: 'blog.html' },
  { label: 'Contact', key: 'contact', href: 'contact.html' },
];

/**
 * Create navigation HTML
 * @returns {string} - Navigation HTML
 */
function createNavbarHTML(activePage = 'home') {
  const pageMap = {
    'index.html': 'home',
    'about.html': 'about',
    'course.html': 'courses',
    'gallery.html': 'gallery',
    'blog.html': 'blog',
    'contact.html': 'contact',
    'book-meeting.html': 'booking'
  };

  const currentKey = pageMap[activePage] || 'home';

  return `
    <header class="navbar transparent" id="navbar">
      <div class="navbar-inner">
        <a href="index.html" class="navbar-brand">
          <span class="navbar-logo">G</span>
          <div class="navbar-brand-text">
            <span class="navbar-brand-title">Gobind Dance</span>
            <span class="navbar-brand-subtitle">Academy</span>
          </div>
        </a>

        <nav class="navbar-nav" id="navbar-nav">
          ${NAV_LINKS.map(link => `
            <a href="${link.href}" class="nav-link ${currentKey === link.key ? 'active' : ''}" data-page="${link.key}">
              ${link.label}
              ${currentKey === link.key ? '<span class="nav-indicator"></span>' : ''}
            </a>
          `).join('')}
        </nav>

        <a href="book-meeting.html" class="navbar-cta ${currentKey === 'booking' ? 'active' : 'default'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          Book Audition
        </a>

        <button class="navbar-mobile-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="close-icon" style="display: none;">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu">
      <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <nav class="mobile-menu-nav">
        ${NAV_LINKS.map(link => `
          <a href="${link.href}" class="mobile-menu-link ${currentKey === link.key ? 'active' : ''}" data-page="${link.key}">
            ${link.label}
          </a>
        `).join('')}
        <a href="book-meeting.html" class="mobile-menu-link mobile-menu-cta" data-page="booking">
          Book Audition
        </a>
      </nav>
    </div>
  `;
}

/**
 * Initialize navigation
 */
function initNavbar() {
  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) return;

  const activePage = window.location.pathname.split('/').pop() || 'index.html';
  navbarContainer.innerHTML = createNavbarHTML(activePage);

  const navbar = document.getElementById('navbar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  // Scroll handler
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.remove('transparent');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        mobileMenuToggle.querySelector('.menu-icon').style.display = 'block';
        mobileMenuToggle.querySelector('.close-icon').style.display = 'none';
      } else {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        mobileMenuToggle.querySelector('.menu-icon').style.display = 'none';
        mobileMenuToggle.querySelector('.close-icon').style.display = 'block';
      }
    });
  }

  // Close mobile menu
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      mobileMenuToggle.querySelector('.menu-icon').style.display = 'block';
      mobileMenuToggle.querySelector('.close-icon').style.display = 'none';
    });
  }

  // Close mobile menu on link click
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      mobileMenuToggle.querySelector('.menu-icon').style.display = 'block';
      mobileMenuToggle.querySelector('.close-icon').style.display = 'none';
    });
  });

  // Initial scroll check
  handleScroll();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}

// Export for use in other files
window.NAV_LINKS = NAV_LINKS;
window.createNavbarHTML = createNavbarHTML;
window.initNavbar = initNavbar;