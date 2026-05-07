/* ─────────────────────────────────────────────────────
   FIBROTEK · main.js
   ───────────────────────────────────────────────────── */

/* ── CURSOR ─────────────────────────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left  = mx + 'px';
  cur.style.top   = my + 'px';
});
(function animR(){
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(animR);
})();
document.querySelectorAll('a,button,.mc,.pcard,.slide,.gi,.ai,.sc2,.cit').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* ── NAVBAR SCROLL ───────────────────────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('sc', window.scrollY > 40);
  document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
});

/* ── REVEAL ──────────────────────────────────────────── */
const io = new IntersectionObserver(entries =>
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: .12 }
);
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* ── TIMELINE REVEAL ─────────────────────────────────── */
const io2 = new IntersectionObserver(entries =>
  entries.forEach((e,i) => {
    if(e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 130);
  }), { threshold: .1 }
);
document.querySelectorAll('.tl').forEach(el => io2.observe(el));

/* ── COUNTER ANIMATION ───────────────────────────────── */
function animCount(el, target) {
  let n = 0;
  const step = Math.ceil(target / 55);
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n + (target >= 10 ? '+' : '');
    if(n >= target) clearInterval(t);
  }, 28);
}
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      document.querySelectorAll('[data-count]').forEach(el =>
        animCount(el, +el.dataset.count)
      );
      cio.disconnect();
    }
  });
}, { threshold: .5 });
const kpis = document.querySelector('.hero-kpis');
if(kpis) cio.observe(kpis);

/* ── PRODUCT TABS ────────────────────────────────────── */
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('on'));
    document.querySelectorAll('.prod-panel').forEach(p => p.classList.remove('on'));
    tab.classList.add('on');
    document.getElementById(target)?.classList.add('on');
  });
});

/* ── CARD IMAGE CAROUSEL (products & projects) ───────── */
function initCarousel(track, prevBtn, nextBtn, dotsWrap) {
  const slides = track.children;
  let cur = 0;
  const total = slides.length;

  // build dots
  if(dotsWrap){
    dotsWrap.innerHTML = '';
    for(let i=0; i<total; i++){
      const d = document.createElement('button');
      d.className = 'pcar-dot' + (i===0?' on':'');
      d.onclick = () => goTo(i);
      dotsWrap.appendChild(d);
    }
  }

  function goTo(n){
    cur = (n + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    if(dotsWrap)
      [...dotsWrap.children].forEach((d,i) => d.classList.toggle('on', i===cur));
  }

  prevBtn?.addEventListener('click', e => { e.stopPropagation(); goTo(cur - 1); });
  nextBtn?.addEventListener('click', e => { e.stopPropagation(); goTo(cur + 1); });
}

// product card carousels
document.querySelectorAll('.pcard').forEach(card => {
  const track   = card.querySelector('.pcar-inner');
  const prev    = card.querySelector('.pcar-prev');
  const next    = card.querySelector('.pcar-next');
  const dots    = card.querySelector('.pcar-dots');
  if(track) initCarousel(track, prev, next, dots);
});

// project slide carousels (inner)
document.querySelectorAll('.slide').forEach(slide => {
  const track = slide.querySelector('.scar-inner');
  const prev  = slide.querySelector('.scar-prev');
  const next  = slide.querySelector('.scar-next');
  const dots  = slide.querySelector('.scar-dots');
  if(track) initCarousel(track, prev, next, dots);
});

/* ── OUTER PROJECTS SLIDER ───────────────────────────── */
const slTrack  = document.getElementById('sliderTrack');
const slDots   = document.getElementById('slDots');
let slCur = 0;

if(slTrack){
  const slides = [...slTrack.children];
  const perView = () => window.innerWidth < 820 ? 1 : 3;

  // build outer dots
  slides.forEach((_,i) => {
    const d = document.createElement('button');
    d.className = 'sl-d2' + (i===0?' on':'');
    d.onclick = () => slGoTo(i);
    slDots.appendChild(d);
  });

  function slGoTo(n){
    const pv = perView();
    slCur = Math.max(0, Math.min(n, slides.length - pv));
    const w = slTrack.parentElement.offsetWidth;
    const gap = 22;
    const sw  = (w - (pv-1)*gap) / pv;
    slTrack.style.transform = `translateX(-${slCur * (sw + gap)}px)`;
    [...slDots.children].forEach((d,i) => d.classList.toggle('on', i===slCur));
  }

  document.getElementById('slPrev').onclick = () => slGoTo(slCur - 1);
  document.getElementById('slNext').onclick = () => slGoTo(slCur + 1);
  window.addEventListener('resize', () => slGoTo(slCur));
  setInterval(() => {
    const max = slides.length - perView();
    slGoTo(slCur < max ? slCur + 1 : 0);
  }, 4500);
}

/* ── VIDEO OVERLAY ───────────────────────────────────── */
const videoEl   = document.getElementById('presentacionVideo');
const videoOver = document.getElementById('videoOverlay');
if(videoEl && videoOver){
  videoOver.addEventListener('click', () => {
    videoEl.play();
    videoOver.classList.add('gone');
  });
  videoEl.addEventListener('pause', () => { if(!videoEl.ended) videoOver.classList.remove('gone'); });
  videoEl.addEventListener('ended', () => videoOver.classList.remove('gone'));
}

/* ── CONTACT FORM ────────────────────────────────────── */
window.submitForm = function(){
  const n = document.getElementById('fname')?.value.trim();
  const e = document.getElementById('femail')?.value.trim();
  if(!n || !e){ alert('Por favor completa tu nombre y email.'); return; }
  document.getElementById('formFields').style.display = 'none';
  document.getElementById('formOk').style.display    = 'block';
};

/* ── MOBILE NAV ──────────────────────────────────────── */
window.openMob  = () => document.getElementById('mobNav').classList.add('open');
window.closeMob = () => document.getElementById('mobNav').classList.remove('open');
document.addEventListener('keydown', e => { if(e.key==='Escape') closeMob(); });

/* ── GALLERY LIGHTBOX ────────────────────────────────── */
document.querySelectorAll('.gi').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if(!img) return;
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(5,11,20,.96);display:flex;align-items:center;justify-content:center;padding:24px;cursor:none;animation:fadeU .3s ease';
    const i  = document.createElement('img');
    i.src = img.src;
    i.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:16px;object-fit:contain;border:1px solid rgba(0,229,180,.3);box-shadow:0 0 80px rgba(0,229,180,.15)';
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="bi bi-x-lg"></i>';
    btn.style.cssText = 'position:absolute;top:22px;right:28px;color:#eef4ff;font-size:26px;cursor:none;background:none;border:none;transition:color .2s';
    btn.onmouseenter = () => btn.style.color = '#00e5b4';
    btn.onmouseleave = () => btn.style.color = '#eef4ff';
    ov.append(i, btn);
    document.body.appendChild(ov);
    const rm = () => ov.remove();
    ov.addEventListener('click', e => { if(e.target===ov||e.target===btn||e.target.closest('button')===btn) rm(); });
    document.addEventListener('keydown', function h(e){ if(e.key==='Escape'){ rm(); document.removeEventListener('keydown',h); }});
  });
});