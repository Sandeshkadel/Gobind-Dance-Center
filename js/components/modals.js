/**
 * Modals & Lightboxes
 */

/**
 * Initialize image lightbox
 */
function initImageLightbox() {
  // Create lightbox container
  const lightbox = document.createElement('div');
  lightbox.id = 'image-lightbox';
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">
      Close
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <img src="" alt="Gallery full view" class="lightbox-img" />
  `;
  lightbox.style.display = 'none';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  // Open lightbox
  window.openImageLightbox = function(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lightbox.classList.add('lightbox-in');

    // Animate image
    setTimeout(() => {
      lightboxImg.classList.add('lightbox-image-in');
    }, 10);
  };

  // Close lightbox
  window.closeImageLightbox = function() {
    lightbox.classList.remove('lightbox-in');
    lightboxImg.classList.remove('lightbox-image-in');
    setTimeout(() => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }, 300);
  };

  // Close on click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeImageLightbox();
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display !== 'none') {
      closeImageLightbox();
    }
  });
}

/**
 * Initialize video lightbox
 */
function initVideoLightbox() {
  // Create video lightbox container
  const videoLightbox = document.createElement('div');
  videoLightbox.id = 'video-lightbox';
  videoLightbox.className = 'lightbox';
  videoLightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close video">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <div class="lightbox-video-container">
      <iframe src="" title="Gobind Rai Showreel" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
  `;
  videoLightbox.style.display = 'none';
  document.body.appendChild(videoLightbox);

  const iframe = videoLightbox.querySelector('iframe');
  const closeBtn = videoLightbox.querySelector('.lightbox-close');

  // Open video lightbox
  window.openVideoLightbox = function(videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1') {
    iframe.src = videoUrl;
    videoLightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    videoLightbox.classList.add('lightbox-in');
  };

  // Close video lightbox
  window.closeVideoLightbox = function() {
    videoLightbox.classList.remove('lightbox-in');
    setTimeout(() => {
      videoLightbox.style.display = 'none';
      iframe.src = '';
      document.body.style.overflow = '';
    }, 300);
  };

  // Close on click
  videoLightbox.addEventListener('click', (e) => {
    if (e.target === videoLightbox || e.target === closeBtn) {
      closeVideoLightbox();
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoLightbox.style.display !== 'none') {
      closeVideoLightbox();
    }
  });
}

/**
 * Initialize modal
 */
function initModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'modal-overlay';
  modalOverlay.className = 'modal-overlay';
  document.body.appendChild(modalOverlay);

  // Open modal
  window.openModal = function(content) {
    const modal = modalOverlay.querySelector('.modal');
    if (modal) {
      modal.remove();
    }

    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal modal-in';
    modalDiv.innerHTML = content;
    modalOverlay.appendChild(modalDiv);

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Close button handler
    const closeBtn = modalDiv.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
  };

  // Close modal
  window.closeModal = function() {
    const modal = modalOverlay.querySelector('.modal');
    if (modal) {
      modal.classList.remove('modal-in');
      modal.classList.add('modal-out');
      setTimeout(() => {
        modal.remove();
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }, 300);
    }
  };

  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * Initialize all modals
 */
function initModals() {
  initImageLightbox();
  initVideoLightbox();
  initModal();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModals);
} else {
  initModals();
}

// Export
window.initModals = initModals;
window.initImageLightbox = initImageLightbox;
window.initVideoLightbox = initVideoLightbox;
window.initModal = initModal;
window.openImageLightbox = window.openImageLightbox;
window.closeImageLightbox = window.closeImageLightbox;
window.openVideoLightbox = window.openVideoLightbox;
window.closeVideoLightbox = window.closeVideoLightbox;
window.openModal = window.openModal;
window.closeModal = window.closeModal;