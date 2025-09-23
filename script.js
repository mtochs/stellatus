// Interactivity for Stellatus single-page site

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

  // Active nav highlight based on visible section
  const navLinks = Array.from(document.querySelectorAll(".main-nav .nav-link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((sec) => sectionObserver.observe(sec));

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
