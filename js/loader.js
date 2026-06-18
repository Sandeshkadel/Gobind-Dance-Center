/**
 * Global Website Loader — Gobind Dance Academy
 *
 * Behaviour:
 *   • Initial visit / hard refresh of any page → loader shows, exits
 *     cleanly once the page is fully ready (window.load + fonts + a
 *     settling frame). The loader image pulses the entire time.
 *   • Click an internal link → loader shows on the CURRENT page and
 *     stays there until the browser navigates away.
 *   • The destination page (reached via internal-link click) does NOT
 *     show its own loader — coordinated via sessionStorage.
 *   • If the user refreshes the destination page (URL bar, F5, deep
 *     link, new tab), the flag is not set, so the loader shows.
 *
 * Markup is auto-injected (no HTML edit required). To change the logo,
 * edit the `logoPath` constant below.
 */

(function () {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────────────────────── */

  // 👇 Change this single line to swap the loader logo.
  const logoPath = 'assets/icons/Febicone.png';

  const CONFIG = {
    cssPath: 'css/loader.css',
    // Hard cap on initial load — never trap the user past this even
    // if a resource hangs forever. Generous so slow connections see
    // the loader for as long as it actually takes.
    initialMaxWaitMs: 12000,
    // Safety cap on the navigation loader — if navigation never happens
    // (popup blocker, devtools pause), don't trap the user.
    navMaxWaitMs: 15000,
    // Grace period AFTER window.load before we fade out, so the first
    // content paint is visible underneath the fade.
    initialExitDelayMs: 250,
    // Fade-out duration for the backdrop (matches CSS transition).
    fadeOutMs: 450,
    // Minimum visible time — even on a fast cached page, the loader
    // should be visible long enough to register. 400ms is below the
    // perception threshold for "stuck" but enough to feel intentional.
    minVisibleMs: 400,
  };

  const SAME_PAGE_RE = /^(#|javascript:|mailto:|tel:|sms:|whatsapp:)/i;
  const STORAGE_KEY = '__gda_inflight_nav';

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Inject the stylesheet if the page forgot the <link> tag ───────── */

  function ensureCSS() {
    const existing = document.querySelector(
      'link[rel="stylesheet"][href*="loader.css"]'
    );
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CONFIG.cssPath;
    document.head.appendChild(link);
  }

  /* ── Build the loader markup ────────────────────────────────────────── */

  function buildMarkup() {
    return (
      '<div class="gda-loader" role="status" aria-live="polite" aria-label="Loading">' +
        '<div class="gda-loader__backdrop"></div>' +
        '<div class="gda-loader__stack">' +
          '<div class="gda-loader__logo-wrap">' +
            '<img class="gda-loader__logo" src="' + logoPath + '" alt="Loading" draggable="false">' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── Mount the loader ───────────────────────────────────────────────── */

  function mount() {
    if (!document.body) return null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildMarkup();
    const node = wrapper.firstElementChild;
    document.body.insertBefore(node, document.body.firstChild);

    return {
      node,
      mountedAt: performance.now(),
      restoreScroll: () => {
        document.body.style.overflow = previousOverflow || '';
      },
    };
  }

  /* ── Exit helpers ───────────────────────────────────────────────────── */

  function fadeOut(handle) {
    if (!handle || !handle.node || !handle.node.isConnected) return;
    const { node, restoreScroll, mountedAt } = handle;

    // Honour the minimum-visible-time so the loader never feels like
    // a flash on a fast cached page.
    const elapsed = performance.now() - mountedAt;
    const remaining = Math.max(0, CONFIG.minVisibleMs - elapsed);
    if (remaining > 0) {
      window.setTimeout(() => fadeOut(handle), remaining);
      return;
    }

    const { node: n } = handle;
    n.classList.add('is-leaving');
    window.setTimeout(() => {
      if (n.parentNode) n.parentNode.removeChild(n);
      restoreScroll();
    }, CONFIG.fadeOutMs);
  }

  function removeInstant(handle) {
    if (!handle || !handle.node || !handle.node.isConnected) return;
    if (handle.node.parentNode) {
      handle.node.parentNode.removeChild(handle.node);
    }
    handle.restoreScroll();
  }

  const exit = prefersReducedMotion ? removeInstant : fadeOut;

  /* ── Wait helpers ───────────────────────────────────────────────────── */

  function waitForWindowLoad() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') return resolve();
      window.addEventListener('load', resolve, { once: true });
    });
  }

  function waitForFonts() {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready;
    }
    return Promise.resolve();
  }

  /**
   * Wait until the page is genuinely ready: window.load + fonts + one
   * animation frame after paint. This catches the case where images
   * have decoded but the browser hasn't yet committed a paint, so the
   * loader would fade out before the user sees the page underneath.
   */
  function whenPageReady() {
    return Promise.all([
      waitForWindowLoad(),
      waitForFonts(),
    ]).then(
      () =>
        new Promise((resolve) => {
          window.requestAnimationFrame(() => {
            // Two frames to make sure the first content paint is up.
            window.requestAnimationFrame(resolve);
          });
        })
    );
  }

  /* ── sessionStorage helpers ─────────────────────────────────────────── */

  function getNavFlag() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function setNavFlag() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) { /* ignore */ }
  }

  function clearNavFlag() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }

  /* ── Initial-load bootstrap ─────────────────────────────────────────── */

  function initInitial() {
    // If we arrived via internal-link click, the source page already
    // showed a loader. Skip ours — the user already saw one.
    if (getNavFlag()) {
      clearNavFlag();
      return;
    }

    // First visit / hard refresh / deep link — show the loader.
    const handle = mount();
    if (!handle) return;

    // Hard safety cap — never trap the user.
    const safetyTimer = window.setTimeout(
      () => exit(handle),
      CONFIG.initialMaxWaitMs
    );

    whenPageReady().then(() => {
      window.clearTimeout(safetyTimer);
      // Grace period so the first content paint is visible underneath
      // the fade.
      window.setTimeout(() => exit(handle), CONFIG.initialExitDelayMs);
    });
  }

  /* ── Navigation interception ────────────────────────────────────────── */

  function shouldIntercept(url, anchor) {
    if (!url) return false;
    if (SAME_PAGE_RE.test(url)) return false;

    if (anchor) {
      const target = (anchor.getAttribute('target') || '').toLowerCase();
      if (target === '_blank' || target === '_download') return false;
      if (anchor.hasAttribute('download')) return false;
      if (anchor.getAttribute('rel') === 'external') return false;
    }

    let parsed;
    try {
      parsed = new URL(url, window.location.href);
    } catch (e) {
      return false;
    }

    if (parsed.origin !== window.location.origin) return false;

    // Same-page anchor — skip.
    if (
      parsed.pathname === window.location.pathname &&
      parsed.search === window.location.search &&
      parsed.hash !== ''
    ) {
      return false;
    }

    return true;
  }

  function attachNavigationListeners() {
    document.addEventListener(
      'click',
      (e) => {
        if (e.defaultPrevented) return;
        if (e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const anchor = e.target.closest('a');
        const href = anchor ? anchor.getAttribute('href') : null;
        if (!shouldIntercept(href, anchor)) return;

        // Mark this navigation so the destination page can skip its own
        // loader. The browser's default click action navigates naturally.
        setNavFlag();

        // Show the loader on the CURRENT page so the user has visible
        // feedback while the next page is being fetched. The loader
        // stays up — pulsing — until the browser tears down this
        // document on pagehide.
        const handle = mount();

        // Safety: if navigation never happens, don't trap the user.
        window.setTimeout(() => exit(handle), CONFIG.navMaxWaitMs);
      },
      true
    );

    // When the document is being torn down for navigation, remove the
    // loader immediately. The destination page will skip its own loader
    // because the flag is still set.
    window.addEventListener('pagehide', () => {
      const existing = document.querySelector('.gda-loader');
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }
      document.body.style.overflow = '';
      // Don't clear the flag here — the destination page needs it.
    });

    // bfcache restoration: clear any leftover loader and the flag.
    window.addEventListener('pageshow', (e) => {
      const existing = document.querySelector('.gda-loader');
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }
      document.body.style.overflow = '';
      if (e.persisted) {
        clearNavFlag();
      }
    });
  }

  /* ── Bootstrap ──────────────────────────────────────────────────────── */

  function init() {
    ensureCSS();
    initInitial();
    attachNavigationListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  /* ── Debug surface ──────────────────────────────────────────────────── */

  window.GDALoader = { version: '2.2.0', logoPath };
})();