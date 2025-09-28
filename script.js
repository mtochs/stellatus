// Interactivity for Stellatus site

// Email capture modal for 1-pager download
function openEmailCapture(event) {
  event.preventDefault();
  
  // Create modal if it doesn't exist
  let modal = document.getElementById('email-capture-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'email-capture-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="closeEmailCapture()">&times;</button>
        <h2>Get Your TSF Monitoring Overview</h2>
        <p>Transform your tailings monitoring in 12 weeks. Enter your details to download our comprehensive overview.</p>
        <form id="download-form" onsubmit="handleDownloadSubmit(event)">
          <div class="modal-field">
            <label for="modal-name">Name *</label>
            <input type="text" id="modal-name" name="name" required placeholder="Your full name" />
          </div>
          <div class="modal-field">
            <label for="modal-email">Work Email *</label>
            <input type="email" id="modal-email" name="email" required placeholder="name@company.com" />
          </div>
          <button type="submit" class="btn btn-primary">Download Now</button>
        </form>
      </div>
    `;
    
    // Add styles if not already present
    if (!document.getElementById('modal-styles')) {
      const styles = document.createElement('style');
      styles.id = 'modal-styles';
      styles.innerHTML = `
        #email-capture-modal {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 10000;
        }
        #email-capture-modal.active {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
        }
        .modal-content {
          position: relative;
          background: #2a2a35;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 20px;
          padding: 40px;
          max-width: 450px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 60px rgba(212, 175, 55, 0.2);
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          color: #888;
          font-size: 28px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #d4af37;
        }
        .modal-content h2 {
          margin: 0 0 16px;
          font-size: 1.8em;
          text-shadow: 0 0 20px rgba(234, 205, 111, 0.5);
        }
        .modal-content p {
          color: #ADADB8;
          margin: 0 0 24px;
          line-height: 1.6;
        }
        .modal-field {
          margin-bottom: 20px;
        }
        .modal-field label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #F5F5F5;
        }
        .modal-field input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: #F5F5F5;
          font-size: 1em;
          transition: all 0.2s;
        }
        .modal-field input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          outline: none;
        }
        #download-form .btn {
          width: 100%;
          margin-top: 8px;
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEmailCapture() {
  const modal = document.getElementById('email-capture-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleDownloadSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  
  // Send to FormSubmit (in background)
  fetch('https://formsubmit.co/ajax/mike.ochs@stellat.us', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      _subject: '1-Pager Download Request - Stellatus',
      message: 'User requested TSF Monitoring 1-pager download'
    })
  });
  
  // Close modal
  closeEmailCapture();
  
  // Trigger download
  const link = document.createElement('a');
  link.href = 'Stellatus-TSF-Monitoring-Overview.pdf';
  link.download = 'Stellatus-TSF-Monitoring-Overview.pdf';
  link.click();
  
  // Show success message (optional)
  alert('Thank you! Your download will begin shortly. Check your downloads folder for the Stellatus TSF Monitoring Overview.');
}

// Close modal when clicking backdrop
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList && e.target.classList.contains('modal-backdrop')) {
    closeEmailCapture();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top on page load to prevent jump-to-hash issues
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;

  // Smooth scroll with header offset (works across browsers)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 12);
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", hash);
    });
  });

  // Reveal-on-scroll animations
  const revealElements = document.querySelectorAll(".reveal");
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.05, // Lower threshold for mobile
        rootMargin: "0px 0px -5% 0px" // Less aggressive margin for mobile
      }
    );

    // Initial pass so content is visible even before scrolling
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) { // More generous initial reveal
        el.classList.add("reveal-visible");
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    revealElements.forEach((el) => {
      el.classList.add("reveal-visible");
    });
  }

  // Active nav highlight based on current page
  const navLinks = Array.from(document.querySelectorAll(".main-nav .nav-link"));
  const currentPath = window.location.pathname;
  
  // Highlight active page in navigation
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath) {
      if (currentPath === linkPath || 
          (currentPath === '/' && linkPath === '/') ||
          (currentPath.endsWith('.html') && linkPath === currentPath.replace('.html', ''))) {
        link.classList.add('active');
      }
    }
  });
  
  // For homepage only: Active nav highlight based on visible section
  if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    
    if (sections.length > 0) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                if (href && href.startsWith('#')) {
                  link.classList.toggle("active", href === `#${id}`);
                }
              });
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((sec) => sectionObserver.observe(sec));
    }
  }

  // Contact form AJAX submission (FormSubmit)
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.hidden = false;
      status.textContent = "Sending...";
      status.classList.remove("success", "error");

      const formData = new FormData(form);
      const action = form.getAttribute("action") || "";
      const ajaxAction = action.includes("/ajax/")
        ? action
        : action.replace("formsubmit.co/", "formsubmit.co/ajax/");

      try {
        const res = await fetch(ajaxAction, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || `HTTP ${res.status}`);
        }

        status.textContent = "Thanks — your inquiry was sent. We'll be in touch shortly.";
        status.classList.add("success");
        form.reset();
      } catch (err) {
        status.textContent = "Sorry, something went wrong. Please email mike.ochs@stellat.us.";
        status.classList.add("error");
      }
    });
  }

  // Mobile navigation toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
      body.classList.toggle('nav-open');
    });

    // Close mobile nav when a link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (body.classList.contains('nav-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          mainNav.classList.remove('active');
          body.classList.remove('nav-open');
        }
      });
    });
  }
});
