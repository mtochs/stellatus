// Download Modal Component for Stellatus Website
// This creates a popup form to capture user info before PDF download

(function() {
  'use strict';

  // Create modal HTML
  const modalHTML = `
    <div id="downloadModal" class="download-modal" style="display: none;">
      <div class="download-modal-overlay" onclick="closeDownloadModal()"></div>
      <div class="download-modal-content">
        <button class="download-modal-close" onclick="closeDownloadModal()">&times;</button>

        <div class="download-modal-header">
          <h2>Download TSF Monitoring Overview</h2>
          <p>Get instant access to our 2-page overview on EOR Draft automation.</p>
        </div>

        <div id="downloadModalError" class="download-modal-error" style="display: none;"></div>

        <form id="downloadModalForm" class="download-modal-form">
          <div class="download-form-group">
            <label for="downloadName">Full Name *</label>
            <input type="text" id="downloadName" name="name" required placeholder="John Smith">
          </div>

          <div class="download-form-group">
            <label for="downloadEmail">Email Address *</label>
            <input type="email" id="downloadEmail" name="email" required placeholder="john.smith@company.com">
          </div>

          <div class="download-form-group">
            <label for="downloadCompany">Company (Optional)</label>
            <input type="text" id="downloadCompany" name="company" placeholder="Acme Mining Co.">
          </div>

          <input type="hidden" id="downloadTimestamp" name="timestamp">

          <button type="submit" class="download-modal-submit" id="downloadSubmitBtn">
            Download PDF
          </button>
        </form>

        <div id="downloadModalSuccess" class="download-modal-success" style="display: none;">
          <div class="success-icon">✓</div>
          <h3>Thank You!</h3>
          <p>Your download is starting...</p>
          <p style="margin-top: 12px; font-size: 14px; color: #888;">Check your downloads folder for the Stellatus TSF Monitoring Overview.</p>
        </div>

        <p class="download-modal-privacy">
          We respect your privacy. Your information will only be used to send you occasional updates about Stellatus. You can unsubscribe anytime.
        </p>
      </div>
    </div>
  `;

  // Inject modal HTML into page
  function injectModal() {
    if (document.getElementById('downloadModal')) return; // Already injected

    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div.firstElementChild);

    // Attach form handler
    const form = document.getElementById('downloadModalForm');
    if (form) {
      form.addEventListener('submit', handleDownloadSubmit);
    }
  }

  // Open modal
  window.openDownloadModal = function(e) {
    if (e) e.preventDefault();
    injectModal();
    const modal = document.getElementById('downloadModal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
  };

  // Close modal
  window.closeDownloadModal = function() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scroll

      // Reset form
      const form = document.getElementById('downloadModalForm');
      if (form) form.reset();

      // Hide error/success messages
      const error = document.getElementById('downloadModalError');
      if (error) error.style.display = 'none';

      const success = document.getElementById('downloadModalSuccess');
      if (success) success.style.display = 'none';

      const formContainer = document.querySelector('.download-modal-form');
      if (formContainer) formContainer.style.display = 'block';
    }
  };

  // Handle form submission
  async function handleDownloadSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('downloadSubmitBtn');
    const errorDiv = document.getElementById('downloadModalError');
    const form = document.getElementById('downloadModalForm');
    const successDiv = document.getElementById('downloadModalSuccess');

    // Add timestamp
    document.getElementById('downloadTimestamp').value = new Date().toISOString();

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Hide any previous errors
    errorDiv.style.display = 'none';

    try {
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());

      // Send to your Vercel serverless function
      // Use relative path for Vercel, or skip API call if testing locally
      const apiUrl = '/api/submit-download';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
      });

      const data = await response.json();
      
      console.log('API Response:', { status: response.status, data });

      if (data.success) {
        // Hide form and show success message
        form.style.display = 'none';
        successDiv.style.display = 'block';

        // Trigger download immediately
        const link = document.createElement('a');
        link.href = 'collateral/Stellatus-EOR-Draft-in-48-Overview.pdf';
        link.download = 'Stellatus-EOR-Draft-in-48-Overview.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Close modal after 2.5 seconds
        setTimeout(() => {
          closeDownloadModal();
        }, 2500);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      errorDiv.textContent = 'There was an error submitting the form. Please try again or contact us at mike.ochs@stellat.us';
      errorDiv.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Download PDF';
    }
  }

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDownloadModal();
    }
  });

  // Alias for compatibility with existing onclick handlers
  window.openEmailCapture = window.openDownloadModal;

})();
