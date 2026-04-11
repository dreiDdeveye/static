/**
 * THE OBSCURA — script.js
 */
'use strict';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

/* ── LIVE DATE ──────────────────────────────────────────────── */
(function() {
  const el = document.getElementById('liveDate');
  if (!el) return;
  const d = new Date();
  el.textContent = `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
})();

/* ── LIVE CLOCK (footer) ────────────────────────────────────── */
function updateClock() {
  const el = document.getElementById('footerTime');
  if (!el) return;
  const n = new Date();
  const pad = v => String(v).padStart(2,'0');
  el.textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
}
updateClock();
setInterval(updateClock, 1000);

/* ── ELEMENT REFS ───────────────────────────────────────────── */
const flickerLayer = document.getElementById('layerFlicker');
const glitchBar    = document.getElementById('glitchBar');
const title        = document.querySelector('.masthead__title');
const overlay      = document.getElementById('overlay');
const oMedia       = document.getElementById('overlayMedia');
const oCaption     = document.getElementById('overlayCaption');

function rand(min, max) { return min + Math.random() * (max - min); }

/* ── FULL-PAGE GLITCH SEQUENCE ──────────────────────────────── */
function runPageGlitch() {
  const body = document.body;
  let tick = 0;
  const steps = 6 + Math.floor(Math.random() * 5);

  const seq = setInterval(() => {
    tick++;
    body.style.transform = `skewX(${rand(-2.5,2.5).toFixed(2)}deg) translate(${rand(-12,12).toFixed(0)}px,${rand(-4,4).toFixed(0)}px)`;
    flickerLayer.style.opacity = rand(0.04,0.2).toFixed(2);
    flickerLayer.style.background = Math.random() > 0.5
      ? `rgba(0,210,255,${rand(0.02,0.07).toFixed(3)})`
      : `rgba(255,20,20,${rand(0.02,0.06).toFixed(3)})`;
    glitchBar.style.opacity = rand(0.5,1.0).toFixed(2);
    glitchBar.style.top     = rand(0,95) + 'vh';
    glitchBar.style.height  = rand(1,6) + 'px';
    if (title) title.style.transform = `skewX(${rand(-4,4).toFixed(1)}deg) translateX(${rand(-8,8).toFixed(0)}px)`;

    if (tick >= steps) {
      clearInterval(seq);
      body.style.transform       = '';
      flickerLayer.style.opacity  = '0';
      glitchBar.style.opacity     = '0';
      if (title) title.style.transform = '';
    }
  }, 55);

  setTimeout(runPageGlitch, rand(8000,22000));
}
setTimeout(runPageGlitch, 2500);

/* ── SOFT FLICKER ───────────────────────────────────────────── */
function softFlicker() {
  flickerLayer.style.opacity    = rand(0.03,0.12).toFixed(3);
  flickerLayer.style.background = `rgba(255,255,255,${rand(0.01,0.04).toFixed(3)})`;
  setTimeout(() => { flickerLayer.style.opacity = '0'; }, 80);
  setTimeout(softFlicker, rand(2500,9000));
}
setTimeout(softFlicker, 1500);

/* ── GLITCH BAR SWEEP ───────────────────────────────────────── */
function sweepBar() {
  glitchBar.style.top     = rand(5,90) + 'vh';
  glitchBar.style.height  = rand(1,4) + 'px';
  glitchBar.style.opacity = rand(0.3,0.8).toFixed(2);
  setTimeout(() => { glitchBar.style.opacity = '0'; }, rand(60,180));
  setTimeout(sweepBar, rand(4000,12000));
}
setTimeout(sweepBar, 3500);

/* ── CARD ACCENT PULSE ──────────────────────────────────────── */
(function() {
  const cards = Array.from(document.querySelectorAll('.gif-card'));
  if (!cards.length) return;
  function pulse() {
    const c = cards[Math.floor(Math.random() * cards.length)];
    c.style.transition  = 'border-color 0.5s ease, box-shadow 0.5s ease';
    c.style.borderColor = 'rgba(107,47,26,0.7)';
    c.style.boxShadow   = '0 0 24px rgba(107,47,26,0.2)';
    setTimeout(() => {
      c.style.borderColor = '';
      c.style.boxShadow   = '';
      setTimeout(() => { c.style.transition = ''; }, 600);
    }, rand(700,1400));
    setTimeout(pulse, rand(5000,14000));
  }
  setTimeout(pulse, 4000);
})();

/* ── RANDOM CARD SNAP GLITCH ────────────────────────────────── */
(function() {
  const cards = Array.from(document.querySelectorAll('.gif-card'));
  if (!cards.length) return;
  function snap() {
    const c = cards[Math.floor(Math.random() * cards.length)];
    c.style.transition = 'none';
    c.style.transform  = `translate(${rand(-8,8).toFixed(0)}px,0) skewX(${rand(-2,2).toFixed(1)}deg)`;
    c.style.filter     = `brightness(1.9) hue-rotate(${Math.floor(rand(0,360))}deg) saturate(3.5)`;
    setTimeout(() => { c.style.transform = ''; c.style.filter = ''; c.style.transition = ''; }, rand(60,130));
    setTimeout(snap, rand(5000,18000));
  }
  setTimeout(snap, 6000);
})();

/* ── MASTHEAD PARALLAX ──────────────────────────────────────── */
(function() {
  if (!title) return;
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX - window.innerWidth/2)  / (window.innerWidth/2);
    const dy = (e.clientY - window.innerHeight/2) / (window.innerHeight/2);
    title.style.transform = `translate(${dx*4}px,${dy*2}px)`;
  });
})();

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
(function() {
  const cards = Array.from(document.querySelectorAll('.gif-card'));
  cards.forEach(c => {
    c.style.opacity    = '0';
    c.style.transform  = 'translateY(24px)';
    c.style.transition = 'opacity 0.7s ease, transform 0.7s ease, border-color 0.3s, box-shadow 0.3s, filter 0.1s';
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const idx = cards.indexOf(el);
      setTimeout(() => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, (idx % 3) * 80);
      obs.unobserve(el);
    });
  }, { threshold: 0.06 });
  cards.forEach(c => obs.observe(c));
})();

/* ── PAGE LOAD BURST ────────────────────────────────────────── */
window.addEventListener('load', () => {
  let t = 0;
  const burst = setInterval(() => {
    t++;
    flickerLayer.style.opacity = rand(0.06,0.25).toFixed(2);
    if (title) title.style.transform = `skewX(${rand(-3,3).toFixed(1)}deg) translateX(${rand(-10,10).toFixed(0)}px)`;
    glitchBar.style.opacity = rand(0.4,1.0).toFixed(2);
    glitchBar.style.top     = rand(0,90) + 'vh';
    if (t > 10) {
      clearInterval(burst);
      flickerLayer.style.opacity = '0';
      glitchBar.style.opacity    = '0';
      if (title) title.style.transform = '';
    }
  }, 60);
});

/* ── LIGHTBOX ───────────────────────────────────────────────── */
function openReveal(card) {
  const mediaEl    = card.querySelector('.gif-card__media');
  const mediaClone = mediaEl.cloneNode(true);
  ['gif-card__vignette','glitch-slice'].forEach(cls => {
    const el = mediaClone.querySelector('.' + cls);
    if (el) el.remove();
  });
  const img = mediaClone.querySelector('img');
  if (img) { img.style.width = '100%'; img.style.height = '100%'; img.style.animation = 'none'; }
  mediaClone.style.position = 'relative';
  mediaClone.style.inset    = 'auto';
  mediaClone.style.width    = '100%';
  mediaClone.style.height   = '100%';

  oMedia.innerHTML = '';
  oMedia.appendChild(mediaClone);

  const cap = card.querySelector('.gif-card__caption');
  oCaption.innerHTML = cap ? cap.innerHTML : '';
  const dek = oCaption.querySelector('.dek');
  if (dek) { dek.style.maxHeight = 'none'; dek.style.opacity = '1'; }

  overlay.setAttribute('aria-hidden','false');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeReveal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  setTimeout(() => { oMedia.innerHTML = ''; oCaption.innerHTML = ''; }, 450);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeReveal(); });
document.addEventListener('dblclick', () => runPageGlitch());