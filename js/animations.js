/* ═══════════════════════════════════════════════════════
   FIBROTEK · animations.js
   GSAP + ScrollTrigger — Animaciones para TODO el sitio
═══════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── UTILIDAD: esperar al preloader ────────────────── */
function afterPreloader(fn) {
  window.addEventListener('load', () => setTimeout(fn, 1800));
}

/* ══════════════════════════════════════════════════════
   1. HERO (solo index.html)
══════════════════════════════════════════════════════ */
afterPreloader(() => {
  /* Título — cada línea cae con rotación dramática */
  const lines = document.querySelectorAll('.h-tit .a, .h-tit .b, .h-tit .c');
  if (lines.length) {
    gsap.fromTo(lines, 
      { y: 120, opacity: 0, rotationX: -40, transformOrigin: 'bottom center' },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out' }
    );
  }

  /* Eyebrow tag — se desliza desde la izquierda */
  const tag = document.querySelector('.h-tag');
  if (tag) {
    gsap.fromTo(tag,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: 'power3.out' }
    );
  }

  /* Subtítulo */
  const sl = document.querySelector('.h-sl');
  if (sl) {
    gsap.fromTo(sl,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.6, ease: 'power3.out' }
    );
  }

  /* Botones — aparecen desde abajo con rebote */
  const btns = document.querySelector('.h-btns');
  if (btns) {
    gsap.fromTo(btns,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.8, ease: 'back.out(1.5)' }
    );
  }

  /* KPIs — cada uno sube con rebote escalonado */
  const kpis = document.querySelectorAll('.kpi');
  if (kpis.length) {
    gsap.fromTo(kpis,
      { y: 60, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, delay: 1.0, ease: 'back.out(2)' }
    );
  }

  /* Panel de especialidades — entra desde la derecha */
  const panel = document.querySelector('.h-panel');
  if (panel) {
    gsap.fromTo(panel,
      { x: 150, opacity: 0, scale: 0.88, rotationY: -8 },
      { x: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1.3, delay: 0.3, ease: 'power3.out' }
    );
  }

  /* Tarjetas mini de especialidades — escalonadas */
  const mcs = document.querySelectorAll('.h-mc');
  if (mcs.length) {
    gsap.fromTo(mcs,
      { y: 40, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, delay: 0.9, ease: 'back.out(2.5)' }
    );
  }

  /* Indicador de scroll */
  const sc = document.querySelector('.h-sc');
  if (sc) {
    gsap.fromTo(sc,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power2.out' }
    );
    gsap.to(sc, { y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 });
  }
});

/* ══════════════════════════════════════════════════════
   2. SUB-HERO (páginas internas)
══════════════════════════════════════════════════════ */
afterPreloader(() => {
  const subHi = document.querySelector('.sub-hi');
  if (!subHi) return;

  const subTitle = subHi.querySelector('.d1');
  const subEy = subHi.querySelector('.ey');
  const subP = subHi.querySelector('.sub');

  if (subEy) {
    gsap.fromTo(subEy,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }
  if (subTitle) {
    gsap.fromTo(subTitle,
      { y: 80, opacity: 0, skewY: 3 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.1, delay: 0.2, ease: 'power4.out' }
    );
  }
  if (subP) {
    gsap.fromTo(subP,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
    );
  }
});

/* ══════════════════════════════════════════════════════
   3. SCROLL REVEALS — Aplica a TODAS las páginas
══════════════════════════════════════════════════════ */

/* Secciones: títulos y eyebrows */
gsap.utils.toArray('section').forEach(sec => {
  const els = sec.querySelectorAll('.d2, .ey, h2, .sub');
  if (els.length) {
    gsap.fromTo(els,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: 'top 82%', toggleActions: 'play none none none' }
      }
    );
  }
});

/* Cards de producto (.prd-c) */
gsap.utils.toArray('.prd-c').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 80, opacity: 0, scale: 0.92 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* Cards de proyecto (.proj-c) */
gsap.utils.toArray('.proj-c').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 70, opacity: 0, rotationY: -5 },
    {
      y: 0, opacity: 1, rotationY: 0,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* About items (.ab-item) */
gsap.utils.toArray('.ab-item').forEach((item, i) => {
  gsap.fromTo(item,
    { x: -60, opacity: 0 },
    {
      x: 0, opacity: 1,
      duration: 0.7, delay: i * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});

/* Big card de estadísticas (.big-card) */
const bigCard = document.querySelector('.big-card');
if (bigCard) {
  gsap.fromTo(bigCard,
    { scale: 0.8, opacity: 0, rotation: 4 },
    {
      scale: 1, opacity: 1, rotation: 0,
      duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: bigCard, start: 'top 80%' }
    }
  );
}

/* Contacto items (.ct-it) */
gsap.utils.toArray('.ct-it').forEach((item, i) => {
  gsap.fromTo(item,
    { x: -50, opacity: 0, scale: 0.95 },
    {
      x: 0, opacity: 1, scale: 1,
      duration: 0.6, delay: i * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* Formulario WhatsApp */
const waForm = document.querySelector('.wa-form');
if (waForm) {
  gsap.fromTo(waForm,
    { x: 80, opacity: 0, scale: 0.9 },
    {
      x: 0, opacity: 1, scale: 1,
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: waForm, start: 'top 80%' }
    }
  );
}

/* Sección de servicios (.srv-c) */
gsap.utils.toArray('.srv-c').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 70, opacity: 0, scale: 0.9 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.8, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* Timeline rows (.tl-row) */
gsap.utils.toArray('.tl-row').forEach((row, i) => {
  gsap.fromTo(row,
    { x: i % 2 === 0 ? -80 : 80, opacity: 0 },
    {
      x: 0, opacity: 1,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
});

/* Valores / equipo (.val-c, .team-c) */
gsap.utils.toArray('.val-c, .team-c').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 50, opacity: 0, scale: 0.9 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.7, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* FAQs (.faq-it) */
gsap.utils.toArray('.faq-it').forEach((item, i) => {
  gsap.fromTo(item,
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration: 0.5, delay: i * 0.06, ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' }
    }
  );
});

/* Filter bar (.filter-bar) */
const filterBar = document.querySelector('.filter-bar');
if (filterBar) {
  gsap.fromTo(filterBar,
    { y: 30, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: filterBar, start: 'top 88%' }
    }
  );
}

/* Tarjetas de links rápidos (sección "¿Qué buscás?") */
gsap.utils.toArray('[onmouseenter]').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 70, opacity: 0, scale: 0.9 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.8, delay: i * 0.1, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    }
  );
});

/* Cat section headers */
gsap.utils.toArray('.cat-section-hd').forEach(hd => {
  gsap.fromTo(hd,
    { x: -60, opacity: 0 },
    {
      x: 0, opacity: 1,
      duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: hd, start: 'top 85%' }
    }
  );
});

/* ══════════════════════════════════════════════════════
   4. PARALLAX — Orbs del hero + mapa
══════════════════════════════════════════════════════ */
const o1 = document.querySelector('.h-o1');
const o2 = document.querySelector('.h-o2');
if (o1) {
  gsap.to(o1, {
    y: -150, ease: 'none',
    scrollTrigger: { trigger: '#hero, .sub-hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
}
if (o2) {
  gsap.to(o2, {
    y: -100, ease: 'none',
    scrollTrigger: { trigger: '#hero, .sub-hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
}

/* Mapa con reveal */
const mapBox = document.querySelector('.map-box');
if (mapBox) {
  gsap.fromTo(mapBox,
    { y: 60, opacity: 0, scale: 0.95 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: mapBox, start: 'top 85%' }
    }
  );
}

/* ══════════════════════════════════════════════════════
   5. FOOTER
══════════════════════════════════════════════════════ */
const footer = document.querySelector('footer');
if (footer) {
  const ftCols = footer.querySelectorAll('.ft-col, .ft-brand');
  gsap.fromTo(ftCols,
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, stagger: 0.12,
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: footer, start: 'top 90%' }
    }
  );
}

/* ══════════════════════════════════════════════════════
   6. BOTÓN WhatsApp FLOTANTE — pulso continuo
══════════════════════════════════════════════════════ */
const waFab = document.querySelector('.wa-fab');
if (waFab) {
  gsap.fromTo(waFab,
    { scale: 0, opacity: 0, rotation: -180 },
    { scale: 1, opacity: 1, rotation: 0, duration: 0.8, delay: 2.5, ease: 'back.out(2)' }
  );
  gsap.to(waFab, {
    scale: 1.12, duration: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3.5
  });
}

/* Burbuja del WhatsApp */
const waBubble = document.querySelector('.wa-bubble');
if (waBubble) {
  gsap.fromTo(waBubble,
    { x: 20, opacity: 0, scale: 0.8 },
    { x: 0, opacity: 1, scale: 1, duration: 0.6, delay: 3, ease: 'back.out(2)' }
  );
}
