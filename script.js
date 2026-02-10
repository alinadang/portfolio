(function(){
  // Typing effect
  const typingEl = document.getElementById('typing');
  const phrases = ["Hi — I'm Alina Dang.", "I build full-stack apps.", "Product-minded & data-driven."];
  let pIdx = 0, cIdx = 0, deleting = false;
  function tick(){
    const full = phrases[pIdx];
    if(!deleting){
      typingEl.textContent = full.slice(0, ++cIdx);
      if(cIdx === full.length){ deleting = true; setTimeout(tick, 900); return; }
    } else {
      typingEl.textContent = full.slice(0, --cIdx);
      if(cIdx === 0){ deleting = false; pIdx = (pIdx+1)%phrases.length; }
    }
    setTimeout(tick, deleting ? 40 : 60);
  }
  tick();

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in-view');
    });
  }, {threshold:0.12});
  document.querySelectorAll('.section, .card, .headline, .section-title, .pill, .item').forEach(el=> io.observe(el));

  // Theme management with persistence
  const themeBtn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('alina_theme');
  if(stored === 'light') document.body.classList.add('theme-light');

  function updateThemeIcon(){
    // Show sun when light, moon when dark
    const moon = themeBtn.querySelector('.icon-moon');
    const sun = themeBtn.querySelector('.icon-sun');
    const isLight = document.body.classList.contains('theme-light');
    if(moon) moon.style.display = isLight ? 'none' : 'inline-block';
    if(sun) sun.style.display = isLight ? 'inline-block' : 'none';
    themeBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }

  function toggleTheme(){
    const isLight = document.body.classList.toggle('theme-light');
    localStorage.setItem('alina_theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
  }

  // initialize icon on load
  updateThemeIcon();
  themeBtn.addEventListener('click', toggleTheme);

  // Floating orbital parallax tied to scroll
  const floating = document.getElementById('floating');
  window.addEventListener('scroll', ()=> {
    const sc = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    if(floating) floating.style.transform = `translateY(${Math.sin(sc*Math.PI*2)*6}px) rotate(${sc*8}deg)`;
    document.documentElement.style.setProperty('--c1', `hsl(${200 + sc*30}deg 30% 70%)`);
    document.documentElement.style.setProperty('--c2', `hsl(${30 + sc*18}deg 40% 78%)`);
  }, {passive:true});

  // Card tilt interaction (subtle)
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('pointermove', (e)=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -6;
      const ry = (px - 0.5) * 9;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    });
    card.addEventListener('pointerleave', ()=> {
      card.style.transform = '';
    });
  });

  // Poster placeholder guidance (only for placeholder links)
  document.querySelectorAll('.poster-link').forEach(link=>{
    link.addEventListener('click', (e)=>{
      const href = link.getAttribute('href') || '';
      const hasPlaceholderAttr = !!link.getAttribute('data-placeholder');
      // Allow normal navigation if href points to a real file (not "#" and not empty)
      // and there isn't an explicit placeholder attribute.
      const looksLikeRealFile = href && href !== '#' && !href.startsWith('javascript:') && !hasPlaceholderAttr;
      if(looksLikeRealFile){
        // let the click proceed (open PDF / download) — do nothing
        return;
      }

      // Otherwise treat as a placeholder and show guidance
      e.preventDefault();
      alert('To add a project poster: place the PDF in an /assets/posters/ folder and update the href in index.html. If you want I can insert the poster for you — upload it and I will rebuild.');
    });
  });

  // Contact button action (guarded - only attach if button exists)
  const contactBtn = document.getElementById('contactBtn');
  if(contactBtn){
    contactBtn.addEventListener('click', ()=> {
      window.location.href = 'mailto:alinadang06@gmail.com';
    });
  }

})();
