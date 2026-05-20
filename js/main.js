/* ═══════════════════════════════════════════
   FIBROTEK · main.js  v5
═══════════════════════════════════════════ */

/* ── PRELOADER ───────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader')?.classList.add('done'), 1600);
});

/* ── CURSOR ──────────────────────────────── */
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
// fallback logo: si no carga la imagen muestra el nombre de la empresa
document.querySelectorAll('.logo-img-box img').forEach(img=>{
  // si ya falló (cached error)
  if(!img.complete || img.naturalWidth === 0){
    img.style.display='none';
    const fb = img.closest('.logo-img-box')?.querySelector('.logo-fb') ||
                img.closest('.logo')?.querySelector('.logo-fb');
    if(fb) fb.style.display='block';
  }
  img.addEventListener('error', ()=>{
    img.style.display='none';
    const fb = img.closest('.logo-img-box')?.querySelector('.logo-fb') ||
                img.closest('.logo')?.querySelector('.logo-fb');
    if(fb) fb.style.display='block';
  });
});

document.querySelectorAll('a,button,.h-mc,.prd-c,.proj-c,.gi,.srv-c,.ct-it,.ab-item,.test-c,.faq-q,.val-c,.team-c').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

/* ── NAVBAR SCROLL + BTT ─────────────────── */
const navEl = document.querySelector('nav');
window.addEventListener('scroll', ()=>{
  navEl?.classList.toggle('sc', window.scrollY>40);
  document.getElementById('btt')?.classList.toggle('show', window.scrollY>400);
});

/* ── ACTIVE NAV LINK ─────────────────────── */
(()=>{
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-ul a').forEach(a=>{
    const h = a.getAttribute('href') || '';
    if(h===page || (page===''&&h==='index.html')) a.classList.add('on');
  });
})();

/* ── REVEAL ──────────────────────────────── */
const ioRv = new IntersectionObserver(
  es=>es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),
  {threshold:.12}
);
document.querySelectorAll('.rv').forEach(el=>ioRv.observe(el));

/* ── TIMELINE ────────────────────────────── */
const ioTl = new IntersectionObserver(
  es=>es.forEach((e,i)=>{ if(e.isIntersecting) setTimeout(()=>e.target.classList.add('in'),i*120); }),
  {threshold:.1}
);
document.querySelectorAll('.tl-row').forEach(el=>ioTl.observe(el));

/* ── COUNTER ─────────────────────────────── */
function animCount(el, target){
  let n=0; const step=Math.ceil(target/55);
  const t=setInterval(()=>{
    n=Math.min(n+step,target);
    el.textContent=n+(target>=10?'+':'');
    if(n>=target) clearInterval(t);
  },28);
}
const ioCnt = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('[data-count]').forEach(el=>animCount(el,+el.dataset.count));
      ioCnt.disconnect();
    }
  });
},{threshold:.5});
const kpis=document.querySelector('.h-kpis');
if(kpis) ioCnt.observe(kpis);

/* ── CAROUSEL (reutilizable) ─────────────── */
function buildCar(container){
  const inner = container.querySelector('.car-in');
  const dots  = container.querySelector('.car-dots');
  const cnt   = container.querySelector('.car-cnt');
  const prev  = container.querySelector('.car-pv');
  const next  = container.querySelector('.car-nx');
  if(!inner) return;
  const slides=[...inner.children];
  const total=slides.length;
  let cur=0;
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
    if(cnt) cnt.textContent=`${cur+1} / ${total}`;
  }
  prev?.addEventListener('click',e=>{ e.stopPropagation(); goTo(cur-1); });
  next?.addEventListener('click',e=>{ e.stopPropagation(); goTo(cur+1); });
  if(cnt) cnt.textContent=`1 / ${total}`;
}
document.querySelectorAll('.car').forEach(buildCar);

/* ── PRODUCT TABS ────────────────────────── */
document.querySelectorAll('.c-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    const id=tab.dataset.tab;
    document.querySelectorAll('.c-tab').forEach(t=>t.classList.remove('on'));
    document.querySelectorAll('.cat-panel').forEach(p=>p.classList.remove('on'));
    tab.classList.add('on');
    const panel=document.getElementById(id);
    if(panel){ panel.classList.add('on'); panel.querySelectorAll('.car').forEach(buildCar); }
  });
});
document.querySelectorAll('.cat-panel.on .car').forEach(buildCar);

/* ── PROJECT FILTER ──────────────────────── */
document.querySelectorAll('.f-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const cat=btn.dataset.cat;
    document.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.querySelectorAll('.proj-c').forEach(c=>{
      c.style.display=(cat==='all'||c.dataset.cat===cat)?'':'none';
    });
  });
});

/* ── VIDEO OVERLAY ───────────────────────── */
const vidEl = document.getElementById('mainVideo');
const vidOv = document.getElementById('vidOv');
if(vidEl && vidOv){
  vidOv.addEventListener('click',()=>{ vidEl.play(); vidOv.classList.add('gone'); });
  vidEl.addEventListener('pause',()=>{ if(!vidEl.ended) vidOv.classList.remove('gone'); });
  vidEl.addEventListener('ended',()=>vidOv.classList.remove('gone'));
}

/* ── FAQ ─────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const it=q.closest('.faq-it');
    const wasOpen=it.classList.contains('open');
    document.querySelectorAll('.faq-it').forEach(i=>i.classList.remove('open'));
    if(!wasOpen) it.classList.add('open');
  });
});

/* ── MOBILE NAV ──────────────────────────── */
window.openMob  = ()=>document.getElementById('mobNav')?.classList.add('open');
window.closeMob = ()=>document.getElementById('mobNav')?.classList.remove('open');
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMob(); });

/* ── WHATSAPP FORM ───────────────────────── */
window.sendWA = function(){
  const nombre  = document.getElementById('wa-nombre')?.value.trim();
  const tel     = document.getElementById('wa-tel')?.value.trim();
  const prod    = document.getElementById('wa-prod')?.value;
  const ciudad  = document.getElementById('wa-ciudad')?.value.trim();
  const detalle = document.getElementById('wa-detalle')?.value.trim();
  if(!nombre||!tel||!prod){ alert('Por favor completá: nombre, teléfono y producto.'); return; }
  /* ⚠️  CAMBIA ESTE NÚMERO por el real de Fibrotek */
  const WA = '59168124071';
  const msg=`*COTIZACIÓN FIBROTEK*\n\n`
    +`👤 *Nombre:* ${nombre}\n`
    +`📱 *Teléfono:* ${tel}\n`
    +`📦 *Producto:* ${prod}\n`
    +(ciudad?`📍 *Ciudad:* ${ciudad}\n`:'')
    +(detalle?`💬 *Detalle:* ${detalle}\n`:'')
    +`\n_enviado desde fibrotek.bo_`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
  document.getElementById('formFields').style.display='none';
  document.getElementById('formOk').style.display='block';
};

/* cotizar producto directo */
window.cotizarWA = function(producto){
  const WA = '59168124071';
  const msg=`*CONSULTA FIBROTEK*\n\n📦 *Producto:* ${producto}\n\nHola, me gustaría recibir información y cotización.`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
};

/* ── GALLERY LIGHTBOX ────────────────────── */
document.querySelectorAll('.gi').forEach(item=>{
  item.addEventListener('click',()=>{
    const img=item.querySelector('img');
    if(!img) return;
    const ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;z-index:9000;background:rgba(15,37,69,.88);display:flex;align-items:center;justify-content:center;padding:24px;cursor:none';
    const im=document.createElement('img');
    im.src=img.src;
    im.style.cssText='max-width:90vw;max-height:90vh;border-radius:16px;object-fit:contain;border:2px solid rgba(245,168,0,.4);box-shadow:0 0 60px rgba(245,168,0,.2)';
    const btn=document.createElement('button');
    btn.innerHTML='<i class="bi bi-x-lg"></i>';
    btn.style.cssText='position:absolute;top:20px;right:26px;color:#fff;font-size:24px;cursor:none;background:none;border:none;transition:color .2s';
    btn.onmouseenter=()=>btn.style.color='#f5a800';
    btn.onmouseleave=()=>btn.style.color='#fff';
    ov.append(im,btn);
    document.body.appendChild(ov);
    const rm=()=>ov.remove();
    ov.addEventListener('click',e=>{ if(e.target===ov||e.target===btn||e.target.closest('button')===btn) rm(); });
    document.addEventListener('keydown',function h(e){ if(e.key==='Escape'){ rm(); document.removeEventListener('keydown',h); }});
  });
});

/* ── BTT ─────────────────────────────────── */
document.getElementById('btt')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));