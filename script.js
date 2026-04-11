/**
 * THE OBSCURA — script.js
 * Live date · Lightbox · Strong page glitch sequences
 * Atmospheric card pulses · Scroll reveal · Masthead parallax
 */

'use strict';

/* ══════════════════════════════════════════════
   LIVE DATE
   ══════════════════════════════════════════════ */
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

(function setDate() {
  const el = document.getElementById('liveDate');
  if (!el) return;
  const d = new Date();
  el.textContent = `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
})();

/* ══════════════════════════════════════════════
   ELEMENT REFS
   ══════════════════════════════════════════════ */
const flickerLayer = document.getElementById('layerFlicker');
const glitchBar    = document.getElementById('glitchBar');
const title        = document.querySelector('.masthead__title');
const overlay      = document.getElementById('overlay');
const oMedia       = document.getElementById('overlayMedia');
const oCaption     = document.getElementById('overlayCaption');

/* ══════════════════════════════════════════════
   UTILITY: randomBetween
   ══════════════════════════════════════════════ */
function rand(min, max) { return min + Math.random() * (max - min); }

/* ══════════════════════════════════════════════
   FULL-PAGE GLITCH SEQUENCE
   Combines: body skew, flicker, glitch bar sweep,
   and title RGB burst — all firing together.
   ══════════════════════════════════════════════ */
function runPageGlitch() {
  const body    = document.body;
  const steps   = 6 + Math.floor(Math.random() * 5); // 6–10 frames
  let   tick    = 0;

  const seq = setInterval(() => {
    tick++;

    /* — Body skew / translate — */
    const sx = rand(-2.5, 2.5).toFixed(2);
    const tx = rand(-12, 12).toFixed(0);
    const ty = rand(-4, 4).toFixed(0);
    body.style.transform = `skewX(${sx}deg) translate(${tx}px,${ty}px)`;

    /* — Screen flicker — */
    flickerLayer.style.opacity = rand(0.04, 0.2).toFixed(2);
    flickerLayer.style.background = Math.random() > 0.5
      ? `rgba(0,220,255,${rand(0.02,0.07).toFixed(3)})`
      : `rgba(255,30,30,${rand(0.02,0.06).toFixed(3)})`;

    /* — Glitch bar sweep — */
    glitchBar.style.opacity = rand(0.5, 1.0).toFixed(2);
    glitchBar.style.top     = rand(0, 95) + 'vh';
    glitchBar.style.height  = rand(1, 6) + 'px';

    /* — Title twitch — */
    if (title) {
      title.style.transform = `skewX(${rand(-4,4).toFixed(1)}deg) translateX(${rand(-8,8).toFixed(0)}px)`;
    }

    if (tick >= steps) {
      clearInterval(seq);
      body.style.transform      = '';
      flickerLayer.style.opacity = '0';
      glitchBar.style.opacity    = '0';
      if (title) title.style.transform = '';
    }
  }, 55);

  /* Schedule next glitch: 8–22 seconds */
  setTimeout(runPageGlitch, rand(8000, 22000));
}

/* Kick off first glitch after 2.5 s */
setTimeout(runPageGlitch, 2500);

/* ══════════════════════════════════════════════
   RANDOM FLICKER (light, between glitch sequences)
   ══════════════════════════════════════════════ */
function softFlicker() {
  flickerLayer.style.opacity    = rand(0.03, 0.12).toFixed(3);
  flickerLayer.style.background = `rgba(255,255,255,${rand(0.01,0.04).toFixed(3)})`;
  setTimeout(() => { flickerLayer.style.opacity = '0'; }, 80);
  setTimeout(softFlicker, rand(2500, 9000));
}
setTimeout(softFlicker, 1500);

/* ══════════════════════════════════════════════
   GLITCH BAR SWEEP (independent, slow drift)
   ══════════════════════════════════════════════ */
function sweepBar() {
  glitchBar.style.top     = rand(5, 90) + 'vh';
  glitchBar.style.height  = rand(1, 4) + 'px';
  glitchBar.style.opacity = rand(0.3, 0.8).toFixed(2);

  setTimeout(() => { glitchBar.style.opacity = '0'; }, rand(60, 180));
  setTimeout(sweepBar, rand(4000, 12000));
}
setTimeout(sweepBar, 3500);

/* ══════════════════════════════════════════════
   ATMOSPHERIC CARD ACCENT PULSE
   One card per 6–16 s gets a faint accent glow —
   unsettling but not chaotic.
   ══════════════════════════════════════════════ */
(function cardPulse() {
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!cards.length) return;

  function pulse() {
    const c = cards[Math.floor(Math.random() * cards.length)];
    c.style.transition   = 'border-color 0.5s ease, box-shadow 0.5s ease';
    c.style.borderColor  = 'rgba(107,47,26,0.65)';
    c.style.boxShadow    = '0 0 20px rgba(107,47,26,0.18)';
    setTimeout(() => {
      c.style.borderColor = '';
      c.style.boxShadow   = '';
      setTimeout(() => { c.style.transition = ''; }, 600);
    }, rand(700, 1400));
    setTimeout(pulse, rand(6000, 16000));
  }
  setTimeout(pulse, 4500);
})();

/* ══════════════════════════════════════════════
   RANDOM CARD GLITCH SNAP
   A single card gets a hard glitch-shift briefly.
   ══════════════════════════════════════════════ */
(function cardSnapGlitch() {
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!cards.length) return;

  function snap() {
    const c  = cards[Math.floor(Math.random() * cards.length)];
    const tx = rand(-8, 8).toFixed(0);
    const sx = rand(-2, 2).toFixed(1);
    c.style.transition = 'none';
    c.style.transform  = `translate(${tx}px, 0) skewX(${sx}deg)`;
    c.style.filter     = `brightness(1.8) hue-rotate(${Math.floor(rand(0,360))}deg) saturate(3)`;

    setTimeout(() => {
      c.style.transform  = '';
      c.style.filter     = '';
      c.style.transition = '';
    }, rand(60, 130));

    setTimeout(snap, rand(5000, 18000));
  }
  setTimeout(snap, 6000);
})();

/* ══════════════════════════════════════════════
   MASTHEAD PARALLAX (very subtle cursor pull)
   ══════════════════════════════════════════════ */
(function mastheadParallax() {
  if (!title) return;
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    title.style.transform = `translate(${dx * 4}px, ${dy * 2}px)`;
  });
})();

/* ══════════════════════════════════════════════
   STAGGERED SCROLL REVEAL
   ══════════════════════════════════════════════ */
(function scrollReveal() {
  const cards = Array.from(document.querySelectorAll('.card'));

  cards.forEach(c => {
    c.style.opacity   = '0';
    c.style.transform = (c.style.transform || '') + ' translateY(22px)';
    c.style.transition = 'opacity 0.7s ease, transform 0.7s ease, border-color 0.35s, box-shadow 0.35s';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const idx   = cards.indexOf(el);
      const delay = (idx % 4) * 75;
      setTimeout(() => {
        el.style.opacity   = '1';
        el.style.transform = el.style.transform.replace('translateY(22px)', 'translateY(0)');
      }, delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.07 });

  cards.forEach(c => obs.observe(c));
})();

/* ══════════════════════════════════════════════
   PAGE LOAD GLITCH BURST (first impression)
   ══════════════════════════════════════════════ */
window.addEventListener('load', () => {
  let t = 0;
  const burst = setInterval(() => {
    t++;
    flickerLayer.style.opacity = rand(0.06, 0.25).toFixed(2);
    if (title) {
      title.style.transform = `skewX(${rand(-3,3).toFixed(1)}deg) translateX(${rand(-10,10).toFixed(0)}px)`;
    }
    glitchBar.style.opacity = rand(0.4, 1.0).toFixed(2);
    glitchBar.style.top     = rand(0, 90) + 'vh';

    if (t > 10) {
      clearInterval(burst);
      flickerLayer.style.opacity  = '0';
      glitchBar.style.opacity     = '0';
      if (title) title.style.transform = '';
    }
  }, 60);
});

/* ══════════════════════════════════════════════
   LIGHTBOX
   ══════════════════════════════════════════════ */
function openReveal(card) {
  /* Clone media */
  const mediaEl    = card.querySelector('.card__media');
  const mediaClone = mediaEl.cloneNode(true);
  const vig = mediaClone.querySelector('.card__vignette');
  if (vig) vig.remove();
  const slice = mediaClone.querySelector('.glitch-slice');
  if (slice) slice.remove();

  /* Expand placeholder to fill panel */
  const ph = mediaClone.querySelector('.ph-wrap');
  if (ph) ph.style.height = '100%';

  /* GIF: ensure it fills */
  const img = mediaClone.querySelector('img');
  if (img) { img.style.width = '100%'; img.style.height = '100%'; }

  oMedia.innerHTML = '';
  oMedia.appendChild(mediaClone);

  /* Caption */
  const cap = card.querySelector('.card__caption');
  oCaption.innerHTML = cap.innerHTML;
  /* Force show dek in lightbox */
  const dek = oCaption.querySelector('.dek');
  if (dek) { dek.style.maxHeight = 'none'; dek.style.opacity = '1'; }

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeReveal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { oMedia.innerHTML = ''; oCaption.innerHTML = ''; }, 450);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeReveal(); });

/* Double-click anywhere = extra glitch burst */
document.addEventListener('dblclick', () => runPageGlitch());