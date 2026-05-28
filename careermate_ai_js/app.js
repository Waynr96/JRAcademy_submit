const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======== CONTACT FORM ========
const formValidator = {
  rules: {
    name: {
      required: true,
      message: 'Please enter your name.'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address.'
    },
    role: {
      required: true,
      message: 'Please select your role.'
    },
    field: {
      required: true,
      message: 'Please select your field.'
    },
    message: {
      required: true,
      minLength: 20,
      message: 'Please enter your message (at least 20 characters).'
    }
  },

  validateField(field) {
    const rule = this.rules[field.name];

    // No rule means we don't validate this field
    if (!rule) return true;

    const value = field.value.trim();

    if (rule.required && !value) {
      this.showError(field, rule.message);
      return false;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      this.showError(field, rule.message);
      return false;
    }

    if (rule.minLength && value.length < rule.minLength) {
      this.showError(field, rule.message);
      return false;
    }

    this.showSuccess(field);
    return true;
  },

  showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');

    // Remove any existing error message before adding a new one
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('small');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
  },

  showSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');

    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
  }
};

// ======== TOAST ========
function showToast(message, type) {
  const container = document.getElementById('toastContainer');

  const toast = document.createElement('div');
  toast.classList.add('toast', 'toast-' + type);
  toast.innerHTML = `<span>${message}</span><button class="toast-close" aria-label="Close">✕</button>`;

  container.appendChild(toast);

  // Trigger slide-in on next frame so the CSS transition fires
  requestAnimationFrame(() => toast.classList.add('toast-show'));

  function dismiss() {
    toast.classList.remove('toast-show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  setTimeout(dismiss, 4000);
}

// ======== CONTACT FORM ========
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  const submitBtn = contactForm.querySelector('.btn-submit');
  const fields = contactForm.querySelectorAll('[name="name"], [name="email"], [name="role"], [name="field"], [name="message"]');

  // Validate each field when the user leaves it
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      formValidator.validateField(field);
    });

    // Clear error message as soon as the user starts correcting the field
    const clearEvent = (field.tagName === 'SELECT') ? 'change' : 'input';
    field.addEventListener(clearEvent, () => {
      formValidator.showSuccess(field);
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Step 1 — validate all fields before sending
    let isValid = true;
    fields.forEach(field => {
      if (!formValidator.validateField(field)) {
        isValid = false;
      }
    });
    if (!isValid) return;

    // Step 2 — enter loading state to prevent double-submit
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending…';

    // Collect form data
    const payload = {
      name:    document.getElementById('name').value,
      email:   document.getElementById('email').value,
      role:    document.getElementById('role').value,
      field:   document.getElementById('field').value,
      message: document.getElementById('message').value,
    };

    try {
      // Step 3 — send request to mock endpoint
      // To test the error path, swap the URL for 'https://httpstat.us/500'
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Server returned ' + response.status);
      }

      // Step 4a — success: show confirmation, then clear the form
      submitBtn.classList.remove('loading');
      submitBtn.classList.add('submitted');
      submitBtn.textContent = 'Submitted ✓';
      showToast('Your message has been sent successfully!', 'success');

      setTimeout(() => {
        submitBtn.classList.remove('submitted');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        contactForm.reset();
      }, 2000);

    } catch (error) {
      // Step 4b — failure: restore button so user can retry, keep their input
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      showToast('Something went wrong. Please try again.', 'error');
    }
  });
}
