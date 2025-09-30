// Enhanced TSF animations and interactions
(function() {
  'use strict';

  // Animated counter for KPIs
  function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // Animate KPIs on reveal
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        
        // Animate specific KPIs
        if (entry.target.querySelector('.kpi-value')) {
          const valueEl = entry.target.querySelector('.kpi-value');
          const value = valueEl.dataset.value;
          
          if (value === '48') {
            animateValue(valueEl, 480, 48, 1500, 'h');
          } else if (value === '70') {
            animateValue(valueEl, 0, 70, 1500, '%');
          }
        }
      }
    });
  }, observerOptions);

  // Interactive provenance chain
  function setupProvenanceChain() {
    const svg = document.querySelector('.prov-chain');
    if (!svg) return;

    const stages = ['Source', 'QC', 'Transform', 'Figure'];
    const descriptions = {
      'Source': 'Raw data ingestion from piezometers, GNSS, drones, and bathymetry sensors',
      'QC': 'Automated quality control flags gaps, drift, outliers, and unit mismatches',
      'Transform': 'Advanced analytics compute displacement fields, pressure trends, and volume changes',
      'Figure': 'Publication-ready figures with full audit trail and click-through provenance'
    };

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'prov-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(15,17,21,0.95);
      color: #fff;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      max-width: 250px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1000;
      border: 1px solid #E5B202;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(tooltip);

    // Add interactivity to each stage
    svg.querySelectorAll('rect').forEach((rect, index) => {
      rect.style.cursor = 'pointer';
      rect.style.transition = 'all 0.3s';
      
      // Create glow filter for hover
      const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS('http://www.w3.org/2000/svg', 'defs'), svg.firstChild);
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', `glow-${index}`);
      filter.innerHTML = `
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      `;
      defs.appendChild(filter);

      rect.addEventListener('mouseenter', (e) => {
        rect.setAttribute('fill', '#E5B202');
        rect.setAttribute('fill-opacity', '0.2');
        rect.style.filter = `url(#glow-${index})`;
        
        const stageName = stages[index];
        if (stageName && descriptions[stageName]) {
          tooltip.textContent = descriptions[stageName];
          tooltip.style.opacity = '1';
        }
      });

      rect.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY - 40 + 'px';
      });

      rect.addEventListener('mouseleave', () => {
        rect.setAttribute('fill', 'none');
        rect.setAttribute('fill-opacity', '0');
        rect.style.filter = 'none';
        tooltip.style.opacity = '0';
      });

      // Add click animation
      rect.addEventListener('click', () => {
        rect.style.transform = 'scale(1.1)';
        setTimeout(() => {
          rect.style.transform = 'scale(1)';
        }, 200);
      });
    });
  }

  // Parallax effect for hero
  function setupParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    let ticking = false;
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // Floating animation for KPI cards
  function setupFloatingCards() {
    const cards = document.querySelectorAll('.kpi-card, .hero-kpis .kpi');
    cards.forEach((card, index) => {
      card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }

  // Type writer effect for hero text
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.minHeight = '1.5em';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Progressive image loading with blur effect
  function setupProgressiveImages() {
    const images = document.querySelectorAll('.demo-card img');
    images.forEach(img => {
      img.style.filter = 'blur(20px)';
      img.style.transition = 'filter 0.5s';
      
      img.addEventListener('load', () => {
        img.style.filter = 'blur(0)';
      });
    });
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(229,178,2,0.5); }
      50% { box-shadow: 0 0 40px rgba(229,178,2,0.8), 0 0 60px rgba(229,178,2,0.4); }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .demo-card:hover {
      transform: translateY(-5px) scale(1.02);
      transition: all 0.3s ease;
      box-shadow: 0 12px 40px rgba(229,178,2,0.3);
    }
    
    .btn:hover {
      animation: pulse 0.5s ease-in-out;
    }
    
    .reveal-left {
      animation: slideInLeft 0.8s ease-out;
    }
    
    .reveal-right {
      animation: slideInRight 0.8s ease-out;
    }
    
    .hero-kpis .kpi {
      position: relative;
      overflow: hidden;
    }
    
    .hero-kpis .kpi::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(229,178,2,0.3), transparent);
      animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    
    .prov-chain rect {
      transition: all 0.3s ease;
    }
    
    .prov-chain rect:hover {
      stroke-width: 3;
      stroke: #E5B202;
    }
  `;
  document.head.appendChild(style);

  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    setupParallax();
    setupProvenanceChain();
    setupFloatingCards();
    setupProgressiveImages();
    
    // Animate hero subtitle on load
    const subtitle = document.querySelector('.tsf-hero .sub');
    if (subtitle) {
      const originalText = subtitle.textContent;
      setTimeout(() => {
        typeWriter(subtitle, originalText, 30);
      }, 500);
    }
    
    // Observe KPI cards
    document.querySelectorAll('.kpi-card').forEach(card => {
      kpiObserver.observe(card);
    });
    
    // Add reveal animations to sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${index * 0.1}s`;
          entry.target.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
  });

  // Smooth scroll with progress indicator
  let progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #E5B202, #EACD6F);
    z-index: 9999;
    transition: width 0.2s;
    box-shadow: 0 0 10px rgba(229,178,2,0.6);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

})();
