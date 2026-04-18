/* ═══════════════════════════════════════════════════════════════
   OS-005 — AI Assessment Service
   Shared JS. Runs per-page; each block only activates if its
   target elements exist, so one script fits all four pages.
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   Active nav link — underline the current page in the top nav.
   Normalises both sides so that ./foo.html and /subdir/foo.html
   resolve to the same filename for comparison.
   ───────────────────────────────────────────────────────────── */
(function () {
  const normalise = path => {
    const last = path.split('/').pop();
    return (last === '' ? 'index.html' : last).toLowerCase();
  };
  const currentPage = normalise(location.pathname);
  document.querySelectorAll('nav.top .nav-links a').forEach(a => {
    const linkPage = normalise(new URL(a.href, location.href).pathname);
    if (linkPage === currentPage) a.classList.add('active');
  });
})();

/* ─────────────────────────────────────────────────────────────
   Sticky nav — add hairline border once the page has scrolled
   ───────────────────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('topnav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
})();

/* ─────────────────────────────────────────────────────────────
   Hero video — click overlay to play, hide overlay on play
   Runs only on Home.
   ───────────────────────────────────────────────────────────── */
(function () {
  const video   = document.getElementById('hero-video');
  const overlay = document.getElementById('video-overlay');
  if (!video || !overlay) return;

  const play = () => {
    overlay.classList.add('hidden');
    video.play().catch(() => {/* user can still use native controls */});
  };
  overlay.addEventListener('click', play);
  video.addEventListener('play',  () => overlay.classList.add('hidden'));
  video.addEventListener('pause', () => {
    if (video.currentTime < 0.1) overlay.classList.remove('hidden');
  });

  // Force first frame to render if the poster.jpg is missing
  video.addEventListener('loadedmetadata', () => {
    if (!video.poster) return;
    const img = new Image();
    img.onerror = () => { try { video.currentTime = 0.5; } catch (_) {} };
    img.src = video.poster;
  });
})();

/* ─────────────────────────────────────────────────────────────
   Lightbox — click thumbs, prev/next with hide-at-edges,
   arrow keys, Esc, click-outside closes. Runs only on pages
   that contain .slide-fig.
   ───────────────────────────────────────────────────────────── */
(function () {
  const lb        = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbCounter = document.getElementById('lightbox-counter');
  const lbClose   = document.getElementById('lightbox-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  const figs      = Array.from(document.querySelectorAll('.slide-fig'));
  if (!lb || !figs.length) return;

  let lbIndex = -1;

  function updateNavChrome() {
    lbPrev.classList.toggle('hidden', lbIndex <= 0);
    lbNext.classList.toggle('hidden', lbIndex >= figs.length - 1);
    lbCounter.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(figs.length).padStart(2, '0')}`;
  }

  function openLightbox(i) {
    const fig = figs[i];
    if (!fig) return;
    lbIndex = i;
    lbImg.src   = fig.dataset.src;
    lbImg.alt   = fig.querySelector('img')?.alt || '';
    lbCaption.textContent = fig.dataset.caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateNavChrome();
    requestAnimationFrame(() => lbClose.focus());
  }
  function closeLightbox() {
    lb.classList.remove('open');
    lbImg.src = '';
    lbCaption.textContent = '';
    document.body.style.overflow = '';
    if (lbIndex >= 0) figs[lbIndex].focus();
    lbIndex = -1;
  }
  function step(d) {
    if (lbIndex < 0) return;
    const next = lbIndex + d;
    if (next < 0 || next >= figs.length) return;
    openLightbox(next);
  }

  figs.forEach((fig, i) => {
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('role', 'button');
    fig.addEventListener('click', () => openLightbox(i));
    fig.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  lb.addEventListener('click', e => {
    if (e.target === lb) closeLightbox();
  });
  lbClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  lbPrev.addEventListener('click',  e => { e.stopPropagation(); step(-1); });
  lbNext.addEventListener('click',  e => { e.stopPropagation(); step( 1); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') step( 1);
    if (e.key === 'ArrowLeft')  step(-1);
  });
})();

/* ─────────────────────────────────────────────────────────────
   Tab switcher (underline tabs). Each .tabs-bar is independent;
   a page can have more than one. Keyboard navigable per ARIA spec.
   ───────────────────────────────────────────────────────────── */
(function () {
  const bars = document.querySelectorAll('.tabs-bar[role="tablist"]');
  if (!bars.length) return;

  bars.forEach(bar => {
    const tabs = Array.from(bar.querySelectorAll('[role="tab"]'));
    const panels = tabs.map(t => document.getElementById(t.dataset.panel));

    function activate(i, focus = false) {
      tabs.forEach((t, j) => {
        const on = j === i;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(i));
      tab.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          activate((i + 1) % tabs.length, true);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          activate((i - 1 + tabs.length) % tabs.length, true);
        } else if (e.key === 'Home') {
          e.preventDefault(); activate(0, true);
        } else if (e.key === 'End') {
          e.preventDefault(); activate(tabs.length - 1, true);
        }
      });
    });

    // Deep-link support: #panel-id activates the matching tab
    const hash = location.hash.slice(1);
    if (hash) {
      const idx = tabs.findIndex(t => t.dataset.panel === hash);
      if (idx >= 0) activate(idx);
    }
  });
})();

/* ─────────────────────────────────────────────────────────────
   Subtle reveal on scroll + ladder bar animation
   ───────────────────────────────────────────────────────────── */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.rung').forEach(el => el.classList.add('in-view'));
    return;
  }
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('rung')) {
          entry.target.classList.add('in-view');
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('section, .step, .upside-card, .stat, .rung, .slide-fig').forEach(el => {
    el.classList.add('reveal');
    reveal.observe(el);
  });
})();
