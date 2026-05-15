/* ═══════════════════════════════════════════
   FIBROTEK · main.js
═══════════════════════════════════════════ */

/* ── CURSOR ─────────────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  if(cur){ cur.style.left=mx+'px'; cur.style.top=my+'px'; }
});
(function loop(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  if(curR){ curR.style.left=rx+'px'; curR.style.top=ry+'px'; }
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.h-mini,.prd-card,.proj-card,.gi,.srv-c,.ct-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

/* ── NAVBAR SCROLL + BTT ────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', ()=>{
  nav?.classList.toggle('sc', window.scrollY>40);
  document.getElementById('btt')?.classList.toggle('show', window.scrollY>400);
});

/* ── ACTIVE NAV LINK ─────────────────────── */
(()=>{
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href===page || (page==='index.html' && href==='index.html') ||
       (page==='' && href==='index.html')) a.classList.add('active');
    else if(href===page) a.classList.add('active');
  });
})();

/* ── REVEAL ──────────────────────────────── */
const io = new IntersectionObserver(
  entries=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),
  {threshold:.12}
);
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* ── TIMELINE ────────────────────────────── */
const io2 = new IntersectionObserver(
  entries=>entries.forEach((e,i)=>{
    if(e.isIntersecting) setTimeout(()=>e.target.classList.add('in'), i*120);
  }),{threshold:.1}
);
document.querySelectorAll('.tl-row').forEach(el=>io2.observe(el));

/* ── COUNTER ─────────────────────────────── */
function animCount(el,target){
  let n=0; const step=Math.ceil(target/55);
  const t=setInterval(()=>{
    n=Math.min(n+step,target);
    el.textContent=n+(target>=10?'+':'');
    if(n>=target) clearInterval(t);
  },28);
}
const cio = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('[data-count]').forEach(el=>animCount(el,+el.dataset.count));
      cio.disconnect();
    }
  });
},{threshold:.5});
const kpis=document.querySelector('.h-stats');
if(kpis) cio.observe(kpis);

/* ── IMAGE CAROUSEL (reutilizable) ──────── */
function buildCarousel(container){
  const inner = container.querySelector('.car-inner');
  const dots  = container.querySelector('.car-dots');
  const count = container.querySelector('.car-count');
  const prev  = container.querySelector('.car-prev');
  const next  = container.querySelector('.car-next');
  if(!inner) return;

  const slides=[...inner.children];
  const total=slides.length;
  let cur=0;

  // build dots
  if(dots){
    dots.innerHTML='';
    slides.forEach((_,i)=>{
      const d=document.createElement('button');
      d.className='car-dot'+(i===0?' on':'');
      d.onclick=e=>{ e.stopPropagation(); goTo(i); };
      dots.appendChild(d);
    });
  }

  function goTo(n){
    cur=(n+total)%total;
    inner.style.transform=`translateX(-${cur*100}%)`;
    if(dots) [...dots.children].forEach((d,i)=>d.classList.toggle('on',i===cur));
    if(count) count.textContent=`${cur+1} / ${total}`;
  }

  prev?.addEventListener('click',e=>{ e.stopPropagation(); goTo(cur-1); });
  next?.addEventListener('click',e=>{ e.stopPropagation(); goTo(cur+1); });

  // init count
  if(count) count.textContent=`1 / ${total}`;
}

document.querySelectorAll('.car').forEach(buildCarousel);

/* ── PRODUCT TABS ────────────────────────── */
document.querySelectorAll('.c-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    const id=tab.dataset.tab;
    document.querySelectorAll('.c-tab').forEach(t=>t.classList.remove('on'));
    document.querySelectorAll('.cat-panel').forEach(p=>p.classList.remove('on'));
    tab.classList.add('on');
    const panel=document.getElementById(id);
    if(panel){ panel.classList.add('on'); panel.querySelectorAll('.car').forEach(buildCarousel); }
  });
});
// init first panel carousels
document.querySelectorAll('.cat-panel.on .car').forEach(buildCarousel);

/* ── PROJECT FILTER ──────────────────────── */
document.querySelectorAll('.f-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const cat=btn.dataset.cat;
    document.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.querySelectorAll('.proj-card').forEach(c=>{
      const match = cat==='all' || c.dataset.cat===cat;
      c.style.display = match?'':'none';
    });
  });
});

/* ── VIDEO OVERLAY ───────────────────────── */
const videoEl  = document.getElementById('mainVideo');
const videoOv  = document.getElementById('videoOv');
if(videoEl && videoOv){
  videoOv.addEventListener('click',()=>{ videoEl.play(); videoOv.classList.add('gone'); });
  videoEl.addEventListener('pause',()=>{ if(!videoEl.ended) videoOv.classList.remove('gone'); });
  videoEl.addEventListener('ended',()=>videoOv.classList.remove('gone'));
}

/* ── MOBILE NAV ──────────────────────────── */
window.openMob  = ()=>document.getElementById('mobNav')?.classList.add('open');
window.closeMob = ()=>document.getElementById('mobNav')?.classList.remove('open');
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMob(); });

/* ── WHATSAPP FORM ───────────────────────── */
window.sendWA = function(){
  const nombre  = document.getElementById('wa-nombre')?.value.trim();
  const tel     = document.getElementById('wa-tel')?.value.trim();
  const prod    = document.getElementById('wa-prod')?.value;
  const detalle = document.getElementById('wa-detalle')?.value.trim();
  const ciudad  = document.getElementById('wa-ciudad')?.value.trim();

  if(!nombre||!tel||!prod){
    alert('Por favor completa: nombre, teléfono y producto de interés.');
    return;
  }

  // ⚠️  CAMBIA ESTE NÚMERO por el real de Fibrotek (sin + ni espacios)
  const WA_NUMBER = '59168124071';

  const msg = `*COTIZACIÓN FIBROTEK*\n\n`
    + `👤 *Nombre:* ${nombre}\n`
    + `📱 *Teléfono:* ${tel}\n`
    + `📦 *Producto:* ${prod}\n`
    + (ciudad  ? `📍 *Ciudad:* ${ciudad}\n` : '')
    + (detalle ? `💬 *Detalle:* ${detalle}\n` : '')
    + `\n_Enviado desde fibrotek.bo_`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url,'_blank');

  document.getElementById('formFields').style.display='none';
  document.getElementById('formOk').style.display='block';
};

/* ── GALLERY LIGHTBOX ────────────────────── */
document.querySelectorAll('.gi').forEach(item=>{
  item.addEventListener('click',()=>{
    const img=item.querySelector('img');
    if(!img) return;
    const ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;z-index:9000;background:rgba(4,11,18,.96);display:flex;align-items:center;justify-content:center;padding:24px;cursor:none';
    const im=document.createElement('img');
    im.src=img.src;
    im.style.cssText='max-width:90vw;max-height:90vh;border-radius:14px;object-fit:contain;border:1px solid rgba(181,242,58,.25);box-shadow:0 0 60px rgba(181,242,58,.12)';
    const btn=document.createElement('button');
    btn.innerHTML='<i class="bi bi-x-lg"></i>';
    btn.style.cssText='position:absolute;top:20px;right:26px;color:#eef5ff;font-size:24px;cursor:none;background:none;border:none;transition:color .2s';
    btn.onmouseenter=()=>btn.style.color='#b5f23a';
    btn.onmouseleave=()=>btn.style.color='#eef5ff';
    ov.append(im,btn);
    document.body.appendChild(ov);
    const rm=()=>ov.remove();
    ov.addEventListener('click',e=>{ if(e.target===ov||e.target===btn||e.target.closest('button')===btn) rm(); });
    document.addEventListener('keydown',function h(e){ if(e.key==='Escape'){ rm(); document.removeEventListener('keydown',h); }});
  });
});

/* ── BTT ─────────────────────────────────── */
document.getElementById('btt')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
