/**
 * Navigation Component — SINGLE UNDERLINE
 * One underline slides between links on hover & returns to active page.
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
 * @param {string} activePage - Filename of the current page (e.g. 'index.html')
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
          <img
            class="navbar-logo-image"
            src="assets/image-removebg-preview.png"
            alt="Gobind Dance Center"
            width="84"
            height="84"
          />
        </a>

        <nav class="navbar-nav" id="navbar-nav">
          ${NAV_LINKS.map(link => `
            <a
              href="${link.href}"
              class="nav-link ${currentKey === link.key ? 'active' : ''}"
              data-page="${link.key}"
            >
              ${link.label}
            </a>
          `).join('')}
          <span class="nav-underline" id="nav-underline"></span>
        </nav>

        <a
          href="book-meeting.html"
          class="navbar-cta ${currentKey === 'booking' ? 'active' : 'default'}"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
               width="12"
               height="12"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          Schedule
        </a>

        <button
          class="navbar-mobile-toggle"
          id="mobile-menu-toggle"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
               width="26"
               height="26"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
               class="menu-icon">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg"
               width="26"
               height="26"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
               class="close-icon"
               style="display:none;">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu">

      <button
        class="mobile-menu-close"
        id="mobile-menu-close"
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <nav class="mobile-menu-nav">
        ${NAV_LINKS.map(link => `
          <a
            href="${link.href}"
            class="mobile-menu-link ${currentKey === link.key ? 'active' : ''}"
            data-page="${link.key}"
          >
            ${link.label}
            <span class="mobile-indicator"></span>
          </a>
        `).join('')}

        <a
          href="book-meeting.html"
          class="mobile-menu-link mobile-menu-cta"
          data-page="booking"
        >
          Schedule
        </a>
      </nav>

    </div>
  `;
}

/**
 * Initialize the navigation with single sliding underline
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

  // ── SINGLE UNDERLINE LOGIC ──
  function initUnderline() {
    const nav = document.getElementById('navbar-nav');
    if (!nav) return;

    const underline = document.getElementById('nav-underline');
    if (!underline) return;

    const links = nav.querySelectorAll('.nav-link');
    const activeLink = nav.querySelector('.nav-link.active');

    function positionUnderline(link) {
      if (!link) {
        underline.classList.remove('visible');
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      underline.style.left = (linkRect.left - navRect.left) + 'px';
      underline.style.width = linkRect.width + 'px';
      underline.classList.add('visible');
    }

    // Position on active link
    if (activeLink) {
      // Slight delay to ensure layout is settled
      requestAnimationFrame(() => {
        positionUnderline(activeLink);
      });
    }

    // Re-position on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentActive = nav.querySelector('.nav-link.active');
        if (currentActive) {
          positionUnderline(currentActive);
        }
      }, 100);
    });

    // ── Hover: slide underline to hovered link ──
    let hoverTimeout = null;

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        positionUnderline(link);
      });

      link.addEventListener('mouseleave', () => {
        // Small delay to allow mouseenter on another link to fire first
        hoverTimeout = setTimeout(() => {
          // Check if any link is currently being hovered
          const hovered = nav.querySelector('.nav-link:hover');
          if (!hovered) {
            const active = nav.querySelector('.nav-link.active');
            if (active) {
              positionUnderline(active);
            } else {
              underline.classList.remove('visible');
            }
          }
        }, 15);
      });
    });

    // Also handle mouse leaving the entire nav area
    nav.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const hovered = nav.querySelector('.nav-link:hover');
        if (!hovered) {
          const active = nav.querySelector('.nav-link.active');
          if (active) {
            positionUnderline(active);
          } else {
            underline.classList.remove('visible');
          }
        }
      }, 15);
    });

    // Expose for debugging
    window.__positionUnderline = positionUnderline;
  }

  // ── SCROLL HANDLER ──
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

  // ── MOBILE MENU TOGGLE ──
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

  // ── CLOSE MOBILE MENU ──
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileMenuToggle) {
        mobileMenuToggle.querySelector('.menu-icon').style.display = 'block';
        mobileMenuToggle.querySelector('.close-icon').style.display = 'none';
      }
    });
  }

  // ── CLOSE ON MOBILE LINK CLICK ──
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu-link') : [];
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileMenuToggle) {
        mobileMenuToggle.querySelector('.menu-icon').style.display = 'block';
        mobileMenuToggle.querySelector('.close-icon').style.display = 'none';
      }
    });
  });

  // ── INIT UNDERLINE (after DOM is fully ready) ──
  if (document.readyState === 'complete') {
    initUnderline();
  } else {
    window.addEventListener('load', initUnderline);
  }

  // Also re-init on window resize (for responsive layout changes)
  let resizeUnderlineTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeUnderlineTimer);
    resizeUnderlineTimer = setTimeout(() => {
      const nav = document.getElementById('navbar-nav');
      const underline = document.getElementById('nav-underline');
      if (nav && underline) {
        const activeLink = nav.querySelector('.nav-link.active');
        if (activeLink) {
          const navRect = nav.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          underline.style.left = (linkRect.left - navRect.left) + 'px';
          underline.style.width = linkRect.width + 'px';
          underline.classList.add('visible');
        }
      }
    }, 150);
  });

  // Initial scroll state
  handleScroll();
}

// ── AUTO-INIT ──
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}

// ── EXPORTS ──
window.NAV_LINKS = NAV_LINKS;
window.createNavbarHTML = createNavbarHTML;
window.initNavbar = initNavbar;