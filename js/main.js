/*────────────────────────────────
  CUSTOM CURSOR
────────────────────────────────*/
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = (mx - 7) + 'px';
  cur.style.top  = (my - 7) + 'px';
});

function animRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = (rx - 20) + 'px';
  ring.style.top  = (ry - 20) + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a,button,.mini-card,.srv-card,.prod-card,.proj-slide,.gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.transform = 'scale(2.5)'; ring.style.opacity = '0'; });
  el.addEventListener('mouseleave', () => { cur.style.transform = 'scale(1)';   ring.style.opacity = '.5'; });
});

/*────────────────────────────────
  NAVBAR SCROLL + BACK TO TOP
────────────────────────────────*/
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
});

/*────────────────────────────────
  REVEAL ON SCROLL
────────────────────────────────*/
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/*────────────────────────────────
  TIMELINE REVEAL (escalonado)
────────────────────────────────*/
const io2 = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 120);
  });
}, { threshold: .1 });
document.querySelectorAll('.tl-item').forEach(el => io2.observe(el));

/*────────────────────────────────
  COUNTER ANIMATION
────────────────────────────────*/
function animCount(el, target) {
  let n = 0;
  const step = Math.ceil(target / 60);
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n + (target >= 100 ? '+' : '');
    if (n >= target) clearInterval(t);
  }, 30);
}

const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(el => animCount(el, +el.dataset.target));
      cio.disconnect();
    }
  });
}, { threshold: .5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) cio.observe(heroStats);

/*────────────────────────────────
  PROJECTS SLIDER
────────────────────────────────*/
const track    = document.getElementById('sliderTrack');
const slides   = [...track.children];
const dotsWrap = document.getElementById('slDots');
let curSlide   = 0;

const perView = () => window.innerWidth < 900 ? 1 : 3;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'sl-dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goTo(i);
  dotsWrap.appendChild(d);
});

function goTo(n) {
  curSlide = Math.max(0, Math.min(n, slides.length - perView()));
  const w      = track.parentElement.offsetWidth;
  const gap    = 24;
  const slideW = (w - (perView() - 1) * gap) / perView();
  track.style.transform = `translateX(-${curSlide * (slideW + gap)}px)`;
  [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === curSlide));
}

document.getElementById('slPrev').onclick = () => goTo(curSlide - 1);
document.getElementById('slNext').onclick = () => goTo(curSlide + 1);
window.addEventListener('resize', () => goTo(curSlide));

// auto-slide cada 4s
setInterval(() => goTo(curSlide + 1 < slides.length - perView() + 1 ? curSlide + 1 : 0), 4000);

/*────────────────────────────────
  VIDEO – play overlay (video local)
────────────────────────────────*/
const videoEl      = document.getElementById('presentacionVideo');
const videoOverlay = document.getElementById('videoOverlay');

if (videoEl && videoOverlay) {
  videoOverlay.addEventListener('click', () => {
    videoEl.play();
    videoOverlay.classList.add('hidden');
  });

  // Si el usuario pausa el video, mostrar overlay de nuevo
  videoEl.addEventListener('pause', () => {
    if (!videoEl.ended) videoOverlay.classList.remove('hidden');
  });

  videoEl.addEventListener('ended', () => {
    videoOverlay.classList.remove('hidden');
  });
}

/*────────────────────────────────
  CONTACT FORM
────────────────────────────────*/
function submitForm() {
  const n = document.getElementById('fname').value.trim();
  const e = document.getElementById('femail').value.trim();
  if (!n || !e) { alert('Por favor completa al menos tu nombre y email.'); return; }
  document.getElementById('formFields').style.display  = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

/*────────────────────────────────
  MOBILE NAV
────────────────────────────────*/
function closeMobile() {
  document.getElementById('mobileNav').classList.remove('open');
}

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobile();
});

/*────────────────────────────────
  GALLERY LIGHTBOX SIMPLE
────────────────────────────────*/
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9000;
      background:rgba(3,7,18,.95);
      display:flex;align-items:center;justify-content:center;
      padding:24px;cursor:none;
      animation:fadeIn .3s ease;
    `;

    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(style);

    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.style.cssText = `
      max-width:90vw;max-height:90vh;
      border-radius:16px;object-fit:contain;
      border:1px solid rgba(0,212,170,.3);
      box-shadow:0 0 80px rgba(0,212,170,.15);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position:absolute;top:24px;right:32px;
      background:none;border:none;color:#f0f6ff;
      font-size:28px;cursor:none;
      transition:color .2s;
    `;
    closeBtn.onmouseenter = () => closeBtn.style.color = '#00d4aa';
    closeBtn.onmouseleave = () => closeBtn.style.color = '#f0f6ff';

    overlay.appendChild(imgClone);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    const remove = () => { overlay.remove(); style.remove(); };
    overlay.addEventListener('click', e => { if (e.target === overlay || e.target === closeBtn) remove(); });
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { remove(); document.removeEventListener('keydown', handler); }
    });
  });
});
