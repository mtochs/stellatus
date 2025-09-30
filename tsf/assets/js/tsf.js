// Scroll reveal & progress bar
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal-visible'); io.unobserve(e.target); }});
  }, { threshold: 0.12 });
  els.forEach(el=>io.observe(el));

  const prog = document.createElement('div');
  prog.className = 'progress';
  document.body.appendChild(prog);
  const onScroll = ()=>{ const h = document.documentElement; const p = (h.scrollTop)/(h.scrollHeight - h.clientHeight); prog.style.width = (p*100)+'%'; };
  document.addEventListener('scroll', onScroll, { passive:true });

  // Parallax hero
  const bg = document.querySelector('.hero-bg');
  if(bg){ document.addEventListener('scroll', ()=>{ const y = window.scrollY * 0.15; bg.style.transform = `translateY(${y}px) scale(1.04)`; }, {passive:true}); }
})();
