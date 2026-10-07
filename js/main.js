/* =========================================================
   Muhammad Bahauddin — Portfolio interactions
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Project data (from Project-Portfolio.pdf) ---------- */
  const PROJECTS = [
    {
      slug: 'founder-ball', name: 'Founder Ball', tagline: 'Live pitch battle & yacht gala',
      url: 'https://founderball.org/', domain: 'founderball.org',
      platform: 'WordPress', builder: 'Elementor', role: 'Lead Developer',
      overview: "Founder Ball is Canada's live startup investment event: five finalists pitch for up to $1M in angel capital aboard an all-white yacht gala in Toronto. The brand is loud and cinematic, and the site had to carry that energy while still working as a real application and investor funnel.",
      work: 'I led the build from the design files in Elementor, using ACF to run the judges, confirmed angels, itinerary and FAQ content so the team could update them without touching layouts. I also built the custom functionality behind the Investor Portal, then tuned the heavy full-bleed imagery and carousels to keep the pages fast.',
      tags: ['Developed pages from design', 'ACF', 'Custom Functionality', 'Investor Portal', 'Performance optimization', 'Client revisions'],
    },
    {
      slug: 'contractors-liability', name: 'Contractors Liability', tagline: 'Insurance for every trade',
      url: 'https://contractorsliability.com/', domain: 'contractorsliability.com',
      platform: 'WordPress', builder: 'Elementor', role: 'Lead Developer',
      overview: "Contractors Liability is an independent agency that quotes liability, workers' comp and builders' risk coverage for contractors in all 50 states. The site is a large, SEO-driven content system: coverage pages, trade pages, state and city service areas, e-books, a blog and a quote flow.",
      work: 'As lead developer I turned the designs into a reusable set of Elementor sections and custom CSS, so dozens of trade and location pages stay consistent. I still maintain the site: I roll out new pages, handle client revisions and keep performance in check as the content grows.',
      tags: ['Developed pages from design', 'Custom CSS', 'Performance optimization', 'Client revisions', 'Maintenance'],
    },
    {
      slug: 'peaks-counseling', name: 'Peaks Counseling', tagline: 'Therapy practice in Colorado',
      url: 'https://peakscounseling.com/', domain: 'peakscounseling.com',
      platform: 'WordPress', builder: 'Elementor', role: 'Lead Developer',
      overview: 'Peaks Counseling supports children, teens, adults and new parents across two Colorado locations. The brief was a calm, modern site that makes reaching out feel easy, with soft tones, generous spacing and warm photography instead of a clinical feel.',
      work: 'I built the design pixel-close in Elementor with custom CSS for the rounded cards, the team grid and the testimonial slider. I also set up a clear multi-step consultation request form and an FAQ accordion, then optimised images and scripts so the site loads fast on phones, where most visitors arrive.',
      tags: ['Modern Design', 'Developed pages from design', 'Custom CSS', 'Performance optimization', 'Client revisions'],
    },
    {
      slug: 'monetary-gold', name: 'Monetary Gold', tagline: 'Precious metals & gold IRA',
      url: 'https://www.monetarygold.com/', domain: 'monetarygold.com',
      platform: 'WordPress', builder: 'Beaver Builder', role: 'Developer (Team)',
      overview: 'Monetary Gold is a precious metals dealer helping clients buy physical gold, silver and platinum or roll retirement funds into a Precious Metals IRA. The site is built for trust and lead generation, with a live metals price ticker, press logos, ratings and several information-kit request forms.',
      work: 'Working as part of the development team, I built pages from the design in Beaver Builder and wrote custom CSS for the gold-accented components, forms and testimonial sliders. I worked through client revisions quickly, since compliance copy changed often, and helped optimise a media-heavy site for speed.',
      tags: ['Teamwork', 'Developed pages from design', 'Custom CSS', 'Performance optimization', 'Client revisions'],
    },
    {
      slug: 'bonedry-services', name: 'BoneDry Services', tagline: '24/7 emergency restoration',
      url: 'https://www.bonedryservices.com/', domain: 'bonedryservices.com',
      platform: 'Webflow', builder: 'Webflow Designer', role: 'Developer (Team)',
      overview: 'BoneDry Services handles water, fire, mold and storm damage restoration across the Denver metro area. People land on the site in an emergency, so it has to be quick to scan, clearly show the phone number and quote form, and cover a lot of services and counties.',
      work: "Within the team I built the Webflow pages from design, including service detail templates, the three-step process section, the reviews wall and a county-by-county service area directory. I added custom functionality and custom CSS where Webflow's native tools fell short, and kept the pages light despite the heavy photography.",
      tags: ['Teamwork', 'Custom Functionality', 'Developed pages from design', 'Custom CSS', 'Performance optimization', 'Client revisions'],
    },
    {
      slug: 'tali', name: 'Tali', tagline: 'AI clinical assistant (SaaS)',
      url: 'https://tali.ai/', domain: 'tali.ai',
      platform: 'Webflow', builder: 'Webflow Designer', role: 'Developer',
      overview: 'Tali is a Canadian AI platform that writes clinical notes, supports decisions and handles billing for healthcare providers. The marketing site is a polished SaaS product site: impact statistics, tabbed feature showcases, template libraries, EMR integrations and security content.',
      work: 'I built the pages in Webflow from the design system and added custom functionality for the interactive feature tabs, testimonial carousels and press slider. Custom CSS kept the product UI mock-ups sharp at every breakpoint, and I worked through rounds of client revisions as new product features launched.',
      tags: ['Custom Functionality', 'Developed pages from design', 'Custom CSS', 'Performance optimization', 'Client revisions'],
    },
    {
      slug: 'cp-networks', name: 'CP Networks', tagline: 'Managed IT support, DFW',
      url: 'https://www.cp-1.net/', domain: 'cp-1.net',
      platform: 'WordPress', builder: 'Beaver Builder', role: 'Developer (Team)',
      overview: 'CP Networks has provided IT support and cybersecurity for small businesses in the Dallas–Fort Worth area since 2002. The site needed to look established and trustworthy, present eight service lines clearly and turn visitors into calls or network assessment requests.',
      work: 'As part of the team I built the site in Beaver Builder from the design, with custom CSS for the navy-and-lime brand system, service grids, partner logo walls and highlighted headings. I added the complimentary network assessment lead form, handled client revisions and optimised the site for fast, reliable loading.',
      tags: ['Teamwork', 'Developed pages from design', 'Custom CSS', 'Performance optimization', 'Client revisions'],
    },
  ];

  const pad = n => String(n).padStart(2, '0');
  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Render project cards ---------- */
  const grid = $('#projects');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="card spot project reveal" tabindex="0" role="button" data-i="${i}" data-platform="${p.platform}"
      aria-label="Open case study: ${esc(p.name)}">
      <div class="p-shot">
        <div class="p-bar"><i></i><i></i><i></i><span class="mono">${p.domain}</span></div>
        <img src="assets/projects/${p.slug}/home.webp" alt="${esc(p.name)} homepage screenshot" loading="lazy" decoding="async">
        <span class="p-hint mono">hover to scroll ↓</span>
      </div>
      <div class="p-body">
        <div>
          <span class="p-num mono">${pad(i + 1)} / ${pad(PROJECTS.length)}</span>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.tagline)}</p>
          <div class="p-meta">
            <span class="pill ${p.platform === 'Webflow' ? 'wf' : 'wp'}">${p.platform}</span>
            <span class="pill">${esc(p.builder)}</span>
            <span class="pill">${esc(p.role)}</span>
          </div>
        </div>
        <span class="p-arrow" aria-hidden="true">→</span>
      </div>
    </article>`).join('');

  // Hover auto-scroll: shift the screenshot by (image height − frame height)
  function setShift(card) {
    const shot = $('.p-shot', card), img = $('img', shot);
    if (!img.naturalHeight) return;
    const frameH = shot.clientHeight - 28;
    const imgH = img.clientHeight;
    const shift = Math.max(0, imgH - frameH);
    card.style.setProperty('--shift', `-${shift}px`);
    card.style.setProperty('--dur', `${Math.min(14, Math.max(3, shift / 450))}s`);
  }
  $$('.project', grid).forEach(card => {
    const img = $('img', card);
    if (img.complete) setShift(card); else img.addEventListener('load', () => setShift(card), { once: true });
  });
  window.addEventListener('resize', () => $$('.project', grid).forEach(setShift));

  /* ---------- Filters ---------- */
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    $$('.filter').forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn); });
    const f = btn.dataset.filter;
    $$('.project', grid).forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.platform !== f));
    $$('.project', grid).forEach(setShift);
  }));

  /* ---------- Case study modal ---------- */
  const modal = $('#modal');
  const mImg = $('#mImg'), mScroll = $('#mScroll'), mBrowser = $('#mBrowser');
  let current = 0, view = 'home', lastFocus = null;

  function setView(v) {
    view = v;
    const p = PROJECTS[current];
    $$('.vtab').forEach(t => { const on = t.dataset.view === v; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); });
    mBrowser.classList.toggle('is-mobile', v === 'mobile');
    mImg.classList.remove('loaded');
    mImg.onload = () => mImg.classList.add('loaded');
    mImg.src = `assets/projects/${p.slug}/${v}.webp`;
    mImg.alt = `${p.name} — ${v === 'home' ? 'homepage' : v === 'inner' ? 'inner page' : 'mobile view'} screenshot`;
    mScroll.scrollTop = 0;
  }

  function fill(i) {
    current = (i + PROJECTS.length) % PROJECTS.length;
    const p = PROJECTS[current];
    $('#mIndex').textContent = `// ${pad(current + 1)} / ${pad(PROJECTS.length)} — ${p.platform} · ${p.builder}`;
    $('#mTitle').textContent = p.name;
    $('#mTagline').textContent = p.tagline;
    const link = $('#mLink'); link.href = p.url; link.textContent = `${p.domain} ↗`;
    $('#mUrl').textContent = `https://${p.domain}`;
    const descs = $$('.m-desc', modal); descs.slice(1).forEach(d => d.remove());
    descs[0].textContent = p.overview;
    const d2 = document.createElement('p'); d2.className = 'm-desc'; d2.textContent = p.work; descs[0].after(d2);
    $('#mMeta').innerHTML = [['Platform', p.platform], ['Builder', p.builder], ['Role', p.role]]
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');
    $('#mTags').innerHTML = p.tags.map(t => `<li>${esc(t)}</li>`).join('');
    setView('home');
    $('.modal-panel', modal).scrollTop = 0;
  }

  function openModal(i) {
    lastFocus = document.activeElement;
    fill(i);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    $('.modal-close', modal).focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    lastFocus && lastFocus.focus();
  }

  grid.addEventListener('click', e => { const c = e.target.closest('.project'); if (c) openModal(+c.dataset.i); });
  grid.addEventListener('keydown', e => {
    const c = e.target.closest('.project');
    if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openModal(+c.dataset.i); }
  });
  $$('[data-close]', modal).forEach(el => el.addEventListener('click', closeModal));
  $$('.vtab').forEach(t => t.addEventListener('click', () => setView(t.dataset.view)));
  $('#mPrev').addEventListener('click', () => fill(current - 1));
  $('#mNext').addEventListener('click', () => fill(current + 1));
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight' && e.target !== mScroll) fill(current + 1);
    if (e.key === 'ArrowLeft' && e.target !== mScroll) fill(current - 1);
    if (e.key === 'Tab') { // focus trap
      const f = $$('button, a[href], [tabindex="0"]', modal).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- Nav ---------- */
  const nav = $('#nav'), toggle = $('#navToggle'), links = $('#navLinks');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  $$('a', links).forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  }));
  // Active section highlight
  const navMap = new Map($$('a[href^="#"]:not(.btn)', links).map(a => [a.getAttribute('href').slice(1), a]));
  const sectionObs = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) navMap.forEach((a, id) => a.classList.toggle('active', id === en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach(s => sectionObs.observe(s));

  /* ---------- CV dropdown ---------- */
  const drop = $('#cvDrop'), cvBtn = $('#cvBtn');
  cvBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = drop.classList.toggle('open');
    cvBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!drop.contains(e.target)) { drop.classList.remove('open'); cvBtn.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drop.classList.contains('open')) { drop.classList.remove('open'); cvBtn.setAttribute('aria-expanded', 'false'); cvBtn.focus(); }
  });

  /* ---------- Copy email ---------- */
  const copyBtn = $('#copyEmail');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copyBtn.dataset.email); copyBtn.textContent = 'Copied ✓'; }
    catch { copyBtn.textContent = copyBtn.dataset.email; }
    setTimeout(() => { copyBtn.textContent = 'Copy email'; }, 2200);
  });

  /* ---------- Typewriter ---------- */
  const roles = ['Senior Web Developer', 'WordPress Specialist', 'Frontend & Backend Developer', 'Webflow Developer', 'UI/UX Implementer', 'E-commerce Developer'];
  const typed = $('#typed');
  if (!reduceMotion) {
    let r = 0, c = roles[0].length, del = true;
    const tick = () => {
      const word = roles[r];
      c += del ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let t = del ? 38 : 70;
      if (!del && c === word.length) { del = true; t = 1900; }
      else if (del && c === 0) { del = false; r = (r + 1) % roles.length; t = 300; }
      setTimeout(tick, t);
    };
    setTimeout(tick, 2200);
  }

  /* ---------- Reveal on scroll + counters ---------- */
  const countUp = el => {
    const to = +el.dataset.to, dur = 1400, t0 = performance.now();
    const step = t => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add('in');
    $$('.count', el).forEach(countUp);
    $$('.gauge', el).forEach(g => g.classList.add('in'));
    io.unobserve(el);
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  // stagger siblings inside grids
  $$('.bento, .skills, .projects, .timeline').forEach(g => $$('.reveal', g).forEach((el, i) => el.style.setProperty('--d', `${(i % 4) * 0.08}s`)));
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Spotlight + cursor glow ---------- */
  const glow = $('.cursor-glow');
  if (window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('has-pointer');
    let gx = 0, gy = 0, raf = 0;
    window.addEventListener('pointermove', e => {
      gx = e.clientX; gy = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => { glow.style.transform = `translate(${gx - 260}px, ${gy - 260}px)`; raf = 0; });
    }, { passive: true });
    document.addEventListener('pointermove', e => {
      const card = e.target.closest && e.target.closest('.spot');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - r.left}px`);
      card.style.setProperty('--y', `${e.clientY - r.top}px`);
    }, { passive: true });

    // Terminal tilt
    const term = $('.tilt');
    if (term && !reduceMotion) {
      const hero = $('.hero');
      hero.addEventListener('pointermove', e => {
        const r = term.getBoundingClientRect();
        const rx = ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * -10;
        const ry = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 12;
        term.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      hero.addEventListener('pointerleave', () => { term.style.transform = ''; });
    }
  }

  /* ---------- Hero particle network ---------- */
  const canvas = $('#net');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let W, H, dpr, pts = [], mouse = { x: -9999, y: -9999 }, running = true;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, (W * H) / 14000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .4, h: Math.random() < .5 ? '34,211,238' : '167,139,250',
      }));
    };
    const LINK = 130;
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, dm = Math.hypot(dx, dy);
        if (dm < 140) { p.x += dx / dm * .8; p.y += dy / dm * .8; }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${a.h},${(1 - d / LINK) * .22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${a.h},.8)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('pointermove', e => {
      const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    // Pause when hero is off-screen
    new IntersectionObserver(([en]) => {
      const was = running; running = en.isIntersecting;
      if (running && !was) draw();
    }).observe(canvas);
  }

  $('#year').textContent = new Date().getFullYear();
})();
