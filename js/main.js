// Particles.js Configuration
document.addEventListener('DOMContentLoaded', function() {
  // Particles.js initialization
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#ffffff", "#00e5ff", "#1a7be0"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#1a7be0",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "bubble": {
          "distance": 400,
          "size": 4,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  // Scroll Animation
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Initial check for elements in viewport on page load
  checkVisibility();
  
  // Check if elements are in viewport on scroll
  window.addEventListener('scroll', checkVisibility);
  
  function checkVisibility() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Adjust this value to change when the animation triggers
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }
  
  // Parallax Scrolling Effect
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Parallax for hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
    
    // Adjust Earth-Moon animation based on scroll
    const earthMoonContainer = document.querySelector('.earth-moon-container');
    if (earthMoonContainer) {
      const opacity = Math.max(0, 1 - (scrollPosition / 500));
      earthMoonContainer.style.opacity = opacity;
      
      // Scale effect on scroll
      const scale = Math.max(0.5, 1 - (scrollPosition / 1000));
      earthMoonContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    
    // Parallax for stars (particles)
    const particlesCanvas = document.querySelector('#particles-js canvas');
    if (particlesCanvas) {
      particlesCanvas.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
  });
  
  // Interactive stars on mouse move
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const stars = document.querySelectorAll('#particles-js canvas');
    stars.forEach(star => {
      const moveX = (mouseX - 0.5) * 20;
      const moveY = (mouseY - 0.5) * 20;
      star.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll indicator click handler
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const historySection = document.getElementById('history');
      if (historySection) {
        window.scrollTo({
          top: historySection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
});
