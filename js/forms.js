/**
 * Forms & Contact
 */

/**
 * Initialize contact form
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const subjectInput = form.querySelector('[name="subject"]');
  const messageInput = form.querySelector('[name="message"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const countrySelect = form.querySelector('[name="countryCode"]');

  // Phone input - only digits
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 15);
    });
  }

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate
    if (!nameInput?.value.trim()) {
      showToast('Please enter your name', 'error');
      return;
    }
    if (!emailInput?.value.trim()) {
      showToast('Please enter your email', 'error');
      return;
    }
    if (!messageInput?.value.trim()) {
      showToast('Please enter a message', 'error');
      return;
    }

    // Show loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="spinner spinner-sm"></span>
      Sending...
    `;
    submitBtn.disabled = true;

    try {
      const phone = countrySelect?.value ? `${countrySelect.value} ${phoneInput?.value || ''}` : '';
      const params = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phone,
        subject: subjectInput?.value || 'Contact form',
        message: messageInput.value
      };

      await sendContactEmail(params);

      showToast('Message sent — we will contact you soon', 'success');

      // Reset form
      form.reset();
    } catch (err) {
      console.error(err);
      showToast('Failed to send message — try again later', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/**
 * Initialize enrollment form
 */
function initEnrollmentForm() {
  const form = document.getElementById('enrollment-form');
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const addressInput = form.querySelector('[name="address"]');
  const timeInput = form.querySelector('[name="time"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const countrySelect = form.querySelector('[name="countryCode"]');
  const courseNameInput = form.querySelector('[name="courseName"]');

  // Phone input - only digits
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
  }

  // Form submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate
    if (!nameInput?.value.trim()) {
      showToast('Please enter your name', 'error');
      return;
    }
    if (!phoneInput?.value || phoneInput.value.length !== 10) {
      showToast('Phone must be exactly 10 digits', 'error');
      return;
    }

    // Show loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="spinner spinner-sm"></span>
      Sending...
    `;
    submitBtn.disabled = true;

    try {
      const params = {
        courseName: courseNameInput?.value || 'Unknown Course',
        name: nameInput.value,
        phone: `${countrySelect?.value || '+1'} ${phoneInput.value}`,
        address: addressInput?.value || '',
        time: timeInput?.value || 'Not specified'
      };

      await sendEnrollmentEmail(params);

      showToast('Enrollment submitted — we will contact you soon', 'success');

      // Close modal
      if (typeof closeModal === 'function') {
        closeModal();
      }

      // Reset form
      form.reset();
    } catch (err) {
      console.error(err);
      showToast('Failed to send. Please try again later.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

/**
 * Open enrollment modal
 * @param {string} courseName - Course name
 */
function openEnrollmentModal(courseName) {
  const content = `
    <div class="modal-header">
      <div>
        <h3 class="modal-title">Enroll — ${courseName}</h3>
        <p class="modal-subtitle">Complete the form below and we will reach out to confirm your enrollment.</p>
      </div>
      <button class="modal-close" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <form id="enrollment-form">
        <input type="hidden" name="courseName" value="${courseName}" />

        <div class="form-group">
          <label class="form-label form-label-required">Full name</label>
          <input type="text" name="name" class="form-input" placeholder="Your name" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Country</label>
            <select name="countryCode" class="form-select">
              <option value="+1">United States +1</option>
              <option value="+91">India +91</option>
              <option value="+44">United Kingdom +44</option>
              <option value="+61">Australia +61</option>
              <option value="+49">Germany +49</option>
              <option value="+33">France +33</option>
              <option value="+81">Japan +81</option>
              <option value="+86">China +86</option>
              <option value="+39">Italy +39</option>
              <option value="+7">Russia +7</option>
              <option value="+55">Brazil +55</option>
              <option value="+27">South Africa +27</option>
              <option value="+64">New Zealand +64</option>
              <option value="+34">Spain +34</option>
              <option value="+46">Sweden +46</option>
            </select>
          </div>
          <div class="form-group
            </select>
          </div>
          <div class="form-group">
            <label class="form-label form-label-required">Phone (10 digits)</label>
            <input type="tel" name="phone" class="form-input" placeholder="Digits only" required inputmode="numeric" pattern="[0-9]*" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Address</label>
          <input type="text" name="address" class="form-input" placeholder="Your address" />
        </div>

        <div class="form-group">
          <label class="form-label">Preferred time</label>
          <input type="time" name="time" class="form-input" />
        </div>

        <div class="modal-footer" style="border: none; padding: 0; padding-top: 1rem;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Submit
          </button>
        </div>
      </form>
    </div>
  `;

  openModal(content);

  // Re-init enrollment form after modal opens
  setTimeout(() => {
    initEnrollmentForm();
  }, 100);
}

/**
 * Initialize all forms
 */
function initForms() {
  initContactForm();
  initEnrollmentForm();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForms);
} else {
  initForms();
}

// Export
window.initForms = initForms;
window.initContactForm = initContactForm;
window.initEnrollmentForm = initEnrollmentForm;
window.openEnrollmentModal = openEnrollmentModal;