/**
 * EmailJS Configuration
 * Replace these with your actual EmailJS keys and template IDs
 */

const EMAILJS_CONFIG = {
  // Replace these with your EmailJS keys and template IDs
  PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',
  SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
  TEMPLATE_CONTACT: 'YOUR_TEMPLATE_ID_FOR_CONTACT',
  TEMPLATE_ENROLLMENT: 'YOUR_TEMPLATE_ID_FOR_ENROLLMENT',

  // Calendly scheduling link
  CALENDLY_URL: 'YOUR_CALENDLY_URL'
};

/**
 * Initialize EmailJS
 * Call this once when the page loads
 */
function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
}

/**
 * Send contact form email
 * @param {Object} params - Template parameters
 * @returns {Promise} - EmailJS send result
 */
async function sendContactEmail(params) {
  const templateParams = {
    name: params.name,
    email: params.email,
    phone: params.phone || '',
    subject: params.subject || 'Contact form',
    message: params.message
  };

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_CONTACT,
    templateParams
  );
}

/**
 * Send enrollment form email
 * @param {Object} params - Template parameters
 * @returns {Promise} - EmailJS send result
 */
async function sendEnrollmentEmail(params) {
  const templateParams = {
    course_name: params.courseName,
    name: params.name,
    phone: params.phone,
    address: params.address || '',
    time: params.time || 'Not specified'
  };

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ENROLLMENT,
    templateParams
  );
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type: 'success' | 'error' | 'info'
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');

  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success'
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    : type === 'error'
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} - Is valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number
 * @returns {boolean} - Is valid phone
 */
function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}