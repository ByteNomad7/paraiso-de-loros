/**
 * generate-phase2.js
 * PHASE 2 — Commercial Content Sections + Photo SEO Architecture
 * 12 pages: 4 topics × 3 languages (ES / PT / FR)
 * Topics: Comida · Aves Disponibles · Instalaciones · Juguetes Naturales
 */

const fs   = require('fs');
const path = require('path');

const BASE  = 'https://www.paraisodeaves.com';
const EMAIL = 'paraisodeloros@gmail.com';
const GA_ID = 'G-4007YHH4H9';

function mkdirp(d){ fs.mkdirSync(d,{recursive:true}); }

/* ─────────────────────────────────────────────────────
   SHARED CSS
───────────────────────────────────────────────────── */
function sharedCSS(){
  return `
  :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.10);}
  *{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
  body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;}
  h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
  a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
  img{max-width:100%;height:auto;display:block;}
  /* Topbar */
  .topbar{background:var(--primary);position:sticky;top:0;z-index:1000;padding:0 5%;box-shadow:0 2px 12px rgba(0,0,0,.15);}
  .topbar-inner{display:flex;align-items:center;justify-content:space-between;height:62px;max-width:1200px;margin:0 auto;}
  .logo{color:var(--white);font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;white-space:nowrap;}
  .logo span{font-size:1.4rem;}
  .topnav{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
  .topnav a{color:rgba(255,255,255,.85);font-size:.88rem;font-weight:500;transition:color .2s;white-space:nowrap;}
  .topnav a:hover,.topnav a.active{color:var(--gold);}
  .lang-sw{display:flex;align-items:center;gap:4px;margin-left:12px;}
  .lang-sw a{font-size:.76rem;font-weight:600;color:rgba(255,255,255,.55);padding:2px 5px;border-radius:3px;transition:all .2s;}
  .lang-sw a.active,.lang-sw a:hover{color:var(--gold);background:rgba(212,169,79,.15);}
  .lang-sw .sep{color:rgba(255,255,255,.25);font-size:.7rem;}
  /* Breadcrumb */
  .breadcrumb-bar{background:var(--secondary);padding:8px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
  .breadcrumb-bar .inner{max-width:1200px;margin:0 auto;font-size:.8rem;color:rgba(255,255,255,.6);display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
  .breadcrumb-bar .inner a{color:rgba(255,255,255,.7);}
  .breadcrumb-bar .inner a:hover{color:var(--gold);}
  /* Hero */
  .page-hero{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);padding:60px 5%;text-align:center;color:var(--white);}
  .page-hero .badge{display:inline-block;background:rgba(212,169,79,.15);border:1px solid var(--gold);color:var(--gold);padding:6px 20px;border-radius:30px;font-size:.78rem;font-weight:700;letter-spacing:1px;margin-bottom:18px;}
  .page-hero h1{font-size:clamp(1.9rem,5vw,3rem);margin-bottom:12px;}
  .page-hero .subtitle{font-size:1.05rem;color:rgba(255,255,255,.85);max-width:680px;margin:0 auto 22px;}
  .trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:10px;}
  .trust-pills span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:var(--white);padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;}
  /* Layout */
  .page-wrap{max-width:1200px;margin:0 auto;padding:56px 5%;display:grid;grid-template-columns:1fr 320px;gap:48px;align-items:start;}
  @media(max-width:900px){.page-wrap{grid-template-columns:1fr;}.topnav{display:none;}}
  .main-col p{margin-bottom:14px;color:#2a2a2a;}
  .main-col ul,.main-col ol{padding-left:20px;margin-bottom:14px;}
  .main-col ul li,.main-col ol li{margin-bottom:6px;}
  /* Sections */
  .section{margin-bottom:52px;}
  .section h2{font-size:1.55rem;color:var(--primary);margin-bottom:16px;padding-bottom:10px;border-bottom:3px solid var(--gold);display:inline-block;}
  .section h3{font-size:1.1rem;color:var(--secondary);margin:22px 0 8px;}
  .highlight-box{background:rgba(31,61,43,.07);border-left:4px solid var(--gold);padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;color:#2a2a2a;}
  .highlight-box strong{color:var(--primary);}
  .specs-table{width:100%;border-collapse:collapse;margin:20px 0;font-size:.9rem;}
  .specs-table th{background:var(--primary);color:var(--white);padding:10px 14px;text-align:left;}
  .specs-table td{padding:9px 14px;border-bottom:1px solid var(--border);}
  .specs-table tr:nth-child(even) td{background:rgba(31,61,43,.04);}
  /* Gallery */
  .gallery-section{margin-bottom:52px;}
  .gallery-section h2{font-size:1.55rem;color:var(--primary);margin-bottom:20px;padding-bottom:10px;border-bottom:3px solid var(--gold);display:inline-block;}
  .photo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:16px;}
  @media(max-width:600px){.photo-grid{grid-template-columns:repeat(2,1fr);}}
  .gallery-item{position:relative;border-radius:10px;overflow:hidden;background:var(--primary);cursor:zoom-in;aspect-ratio:4/3;box-shadow:0 2px 8px rgba(0,0,0,.12);transition:transform .2s,box-shadow .2s;}
  .gallery-item:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.2);}
  .gallery-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s;}
  .gallery-item:hover img{transform:scale(1.05);}
  .gallery-placeholder{width:100%;height:100%;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px;}
  .gallery-placeholder .ph-icon{font-size:2rem;}
  .gallery-placeholder .ph-label{font-size:.7rem;color:rgba(255,255,255,.7);text-align:center;font-family:'Open Sans',sans-serif;line-height:1.3;}
  .gallery-item figcaption{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.65);color:#fff;font-size:.72rem;padding:6px 10px;transform:translateY(100%);transition:transform .2s;}
  .gallery-item:hover figcaption{transform:translateY(0);}
  /* Lightbox */
  .lb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;align-items:center;justify-content:center;flex-direction:column;gap:14px;}
  .lb-overlay.open{display:flex;}
  .lb-img-wrap{max-width:90vw;max-height:80vh;position:relative;}
  .lb-overlay img{max-width:90vw;max-height:80vh;object-fit:contain;border-radius:8px;}
  .lb-caption{color:rgba(255,255,255,.8);font-size:.85rem;text-align:center;max-width:600px;}
  .lb-close{position:fixed;top:20px;right:24px;color:#fff;font-size:2rem;cursor:pointer;line-height:1;background:none;border:none;opacity:.8;transition:opacity .2s;}
  .lb-close:hover{opacity:1;}
  .lb-prev,.lb-next{position:fixed;top:50%;transform:translateY(-50%);color:#fff;font-size:2rem;cursor:pointer;background:rgba(255,255,255,.1);border:none;padding:12px 16px;border-radius:8px;transition:background .2s;}
  .lb-prev{left:16px;}.lb-next{right:16px;}
  .lb-prev:hover,.lb-next:hover{background:rgba(255,255,255,.2);}
  /* Bird cards */
  .bird-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-top:16px;}
  .bird-card{background:var(--white);border:1px solid var(--border);border-radius:14px;overflow:hidden;box-shadow:var(--shadow);transition:transform .2s,box-shadow .2s;}
  .bird-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.12);}
  .bird-card-img{height:200px;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;font-size:4rem;}
  .bird-card-body{padding:16px;}
  .bird-card-species{font-family:'Poppins',sans-serif;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:4px;}
  .bird-card-name{font-family:'Poppins',sans-serif;font-size:1rem;font-weight:700;color:var(--primary);margin-bottom:8px;}
  .bird-card-status{display:inline-block;padding:4px 12px;border-radius:20px;font-size:.76rem;font-weight:700;}
  .status-available{background:#d4edda;color:#155724;}
  .status-reserved{background:#fff3cd;color:#856404;}
  .status-consult{background:#d1ecf1;color:#0c5460;}
  .bird-card-traits{margin-top:10px;font-size:.83rem;color:var(--muted);display:flex;flex-wrap:wrap;gap:6px;}
  .trait{background:rgba(31,61,43,.07);padding:3px 8px;border-radius:4px;font-size:.76rem;}
  /* Species grid */
  .species-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;margin:16px 0 24px;}
  .species-chip{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:14px 10px;text-align:center;transition:all .2s;font-size:.83rem;font-family:'Poppins',sans-serif;font-weight:600;color:var(--primary);}
  .species-chip:hover{background:var(--primary);color:var(--gold);border-color:var(--primary);}
  .species-chip .ic{font-size:1.5rem;margin-bottom:6px;}
  /* FAQ */
  .faq-list{margin-top:8px;}
  .faq-item{border-bottom:1px solid var(--border);padding:18px 0;}
  .faq-item:last-child{border-bottom:none;}
  .faq-q{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:var(--primary);margin-bottom:8px;cursor:pointer;}
  .faq-a{color:#2a2a2a;font-size:.95rem;line-height:1.7;}
  /* CTA */
  .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:14px;padding:36px 28px;color:var(--white);text-align:center;margin:32px 0;}
  .cta-box h3{color:var(--gold);font-size:1.25rem;margin-bottom:10px;}
  .cta-box p{color:rgba(255,255,255,.85);font-size:.95rem;margin-bottom:22px;}
  .btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:12px 28px;border-radius:30px;font-weight:700;font-size:.92rem;transition:all .2s;font-family:'Poppins',sans-serif;}
  .btn-gold:hover{background:var(--gold-light);color:var(--primary);}
  .btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.5);color:var(--white);padding:10px 22px;border-radius:30px;font-weight:600;font-size:.88rem;margin-left:10px;transition:all .2s;}
  .btn-outline:hover{border-color:var(--white);background:rgba(255,255,255,.1);}
  /* Sidebar */
  .sidebar-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:22px;margin-bottom:22px;}
  .sidebar-card h4{font-family:'Poppins',sans-serif;color:var(--primary);font-size:.95rem;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--gold);}
  .sidebar-card ul{list-style:none;padding:0;}
  .sidebar-card ul li{padding:7px 0;border-bottom:1px solid var(--border);font-size:.86rem;}
  .sidebar-card ul li:last-child{border-bottom:none;}
  .sidebar-card ul li a{color:var(--secondary);}
  .sidebar-card ul li a:hover{color:var(--gold);}
  .contact-form{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;}
  .contact-form h3{color:var(--primary);font-size:1rem;margin-bottom:14px;font-family:'Poppins',sans-serif;}
  .form-group{margin-bottom:12px;}
  .form-group label{display:block;font-size:.82rem;font-weight:600;color:var(--primary);margin-bottom:4px;}
  .form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;font-family:'Open Sans',sans-serif;font-size:.88rem;color:var(--text);background:var(--bg);}
  .form-group textarea{min-height:80px;resize:vertical;}
  /* Related articles */
  .article-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-top:14px;}
  .article-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:16px;transition:transform .2s,box-shadow .2s;}
  .article-card:hover{transform:translateY(-3px);box-shadow:var(--shadow);}
  .article-card h3{font-size:.95rem;color:var(--primary);margin-bottom:6px;font-family:'Poppins',sans-serif;}
  .article-card p{font-size:.83rem;color:var(--muted);margin:0;}
  /* Footer */
  footer{background:var(--primary);color:rgba(255,255,255,.75);padding:56px 5% 28px;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:32px;max-width:1200px;margin:0 auto 40px;}
  @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:500px){.footer-grid{grid-template-columns:1fr;}}
  .footer-brand h3{font-family:'Poppins',sans-serif;color:var(--white);font-size:1.1rem;margin-bottom:10px;}
  .footer-brand p{font-size:.84rem;line-height:1.7;max-width:280px;}
  .footer-col h4{font-family:'Poppins',sans-serif;color:var(--gold-light);font-size:.8rem;text-transform:uppercase;letter-spacing:.9px;margin-bottom:12px;}
  .footer-col ul{list-style:none;}
  .footer-col ul li{margin-bottom:6px;}
  .footer-col ul li a{color:rgba(255,255,255,.65);font-size:.82rem;transition:color .2s;}
  .footer-col ul li a:hover{color:var(--gold);}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;text-align:center;font-size:.78rem;color:rgba(255,255,255,.4);max-width:1200px;margin:0 auto;}
  `;
}

/* ─────────────────────────────────────────────────────
   LIGHTBOX JS
───────────────────────────────────────────────────── */
function lightboxJS(){
  return `
<script>
(function(){
  var overlay=document.getElementById('lb'),lbImg=document.getElementById('lb-img'),lbCap=document.getElementById('lb-cap');
  var items=[],cur=0;
  document.querySelectorAll('.gallery-item').forEach(function(el,i){
    el.dataset.idx=i;
    var img=el.querySelector('img');
    var cap=el.querySelector('figcaption');
    items.push({src:img?img.dataset.src||img.src:'',alt:img?img.alt:'',cap:cap?cap.textContent:''});
    el.addEventListener('click',function(){open(i);});
  });
  function open(i){cur=i;show();}
  function show(){
    lbImg.src=items[cur].src||'';
    lbImg.alt=items[cur].alt||'';
    lbCap.textContent=items[cur].cap||'';
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function close(){overlay.classList.remove('open');document.body.style.overflow='';}
  document.getElementById('lb-close').addEventListener('click',close);
  overlay.addEventListener('click',function(e){if(e.target===overlay)close();});
  document.getElementById('lb-prev').addEventListener('click',function(e){e.stopPropagation();cur=(cur-1+items.length)%items.length;show();});
  document.getElementById('lb-next').addEventListener('click',function(e){e.stopPropagation();cur=(cur+1)%items.length;show();});
  document.addEventListener('keydown',function(e){
    if(!overlay.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft'){cur=(cur-1+items.length)%items.length;show();}
    if(e.key==='ArrowRight'){cur=(cur+1)%items.length;show();}
  });
  // Lazy load real images
  var io=new IntersectionObserver(function(ents){ents.forEach(function(e){if(e.isIntersecting){var i=e.target;if(i.dataset.src){i.src=i.dataset.src;io.unobserve(i);}}});});
  document.querySelectorAll('img[data-src]').forEach(function(i){io.observe(i);});
})();
</script>`;
}

function lightboxHTML(){
  return `<div class="lb-overlay" id="lb" role="dialog" aria-label="Lightbox">
  <button class="lb-close" id="lb-close" aria-label="Cerrar">✕</button>
  <button class="lb-prev" id="lb-prev" aria-label="Anterior">‹</button>
  <div class="lb-img-wrap"><img id="lb-img" src="" alt=""/></div>
  <div class="lb-caption" id="lb-cap"></div>
  <button class="lb-next" id="lb-next" aria-label="Siguiente">›</button>
</div>`;
}

/* ─────────────────────────────────────────────────────
   GALLERY GENERATOR — creates photo grid items
   photos: [{slug, iconEs, captionEs, captionPt, captionFr, altEs, altPt, altFr}]
───────────────────────────────────────────────────── */
function galleryItems(photos, lang='es'){
  return photos.map((p,i)=>{
    const alt   = lang==='es'?p.altEs : lang==='pt'?p.altPt : p.altFr;
    const cap   = lang==='es'?p.captionEs : lang==='pt'?p.captionPt : p.captionFr;
    const fname = `${p.slug}-${String(i+1).padStart(2,'0')}.webp`;
    return `<figure class="gallery-item" data-caption="${cap}" tabindex="0" aria-label="${alt}">
  <div class="gallery-placeholder">
    <div class="ph-icon">${p.icon||'🦜'}</div>
    <div class="ph-label">${fname}</div>
  </div>
  <img data-src="/images/gallery/${fname}" alt="${alt}" width="400" height="300" loading="lazy" decoding="async" style="display:none;"/>
  <figcaption>${cap}</figcaption>
</figure>`;
  }).join('\n');
}

/* ─────────────────────────────────────────────────────
   HEAD + HREFLANG
───────────────────────────────────────────────────── */
function head({lang, title, desc, canonical, ogImage, esPath, ptPath, frPath}){
  const hlEs = esPath||'/';
  const hlPt = ptPath||'/pt/';
  const hlFr = frPath||'/fr/';
  const og   = ogImage||'loro-gris-01.webp';
  const type = lang==='fr'?'fr-FR':lang==='pt'?'pt-PT':'es-ES';
  return `<!DOCTYPE html>
<html lang="${type}" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${BASE}${canonical}"/>
  <link rel="alternate" hreflang="es-ES" href="${BASE}${hlEs}"/>
  <link rel="alternate" hreflang="pt-PT" href="${BASE}${hlPt}"/>
  <link rel="alternate" hreflang="fr-FR" href="${BASE}${hlFr}"/>
  <link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="${lang==='fr'?'fr_FR':lang==='pt'?'pt_PT':'es_ES'}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="${BASE}${canonical}"/>
  <meta property="og:image" content="${BASE}/images/${og}"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${desc}"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>${sharedCSS()}</style>`;
}

/* ─────────────────────────────────────────────────────
   NAV VARIANTS
───────────────────────────────────────────────────── */
function navES(active=''){
  return `<header class="topbar">
  <div class="topbar-inner">
    <a class="logo" href="${BASE}/"><span>🦜</span> paraisodeaves</a>
    <nav class="topnav">
      <a href="${BASE}/"${active==='Inicio'?' class="active"':''}>Inicio</a>
      <a href="${BASE}/aves-disponibles/"${active==='Aves'?' class="active"':''}>Aves</a>
      <a href="${BASE}/adopcion-de-loros"${active==='Adopcion'?' class="active"':''}>Adopción</a>
      <a href="${BASE}/cuidados-basicos-de-un-loro"${active==='Cuidados'?' class="active"':''}>Cuidados</a>
      <a href="${BASE}/comida-para-loros/"${active==='Comida'?' class="active"':''}>Comida</a>
      <a href="${BASE}/juguetes-naturales-para-loros/"${active==='Juguetes'?' class="active"':''}>Juguetes</a>
      <a href="${BASE}/blog/"${active==='Blog'?' class="active"':''}>Blog</a>
      <a href="${BASE}/#contacto"${active==='Contacto'?' class="active"':''}>Contacto</a>
      <span class="lang-sw">
        <a class="active" href="${BASE}/" title="Español">ES</a>
        <span class="sep">|</span>
        <a href="${BASE}/pt/" title="Português">PT</a>
        <span class="sep">|</span>
        <a href="${BASE}/fr/" title="Français">FR</a>
      </span>
    </nav>
  </div>
</header>`;
}

function navPT(active=''){
  return `<header class="topbar">
  <div class="topbar-inner">
    <a class="logo" href="${BASE}/pt/"><span>🦜</span> paraisodeaves</a>
    <nav class="topnav">
      <a href="${BASE}/pt/"${active==='Inicio'?' class="active"':''}>Início</a>
      <a href="${BASE}/pt/papagaios-disponiveis/"${active==='Aves'?' class="active"':''}>Papagaios</a>
      <a href="${BASE}/pt/papagaios-a-venda-portugal/"${active==='Adocao'?' class="active"':''}>Adoção</a>
      <a href="${BASE}/pt/comida-para-papagaios/"${active==='Comida'?' class="active"':''}>Comida</a>
      <a href="${BASE}/pt/brinquedos-naturais-para-papagaios/"${active==='Brinquedos'?' class="active"':''}>Brinquedos</a>
      <a href="${BASE}/pt/blog/"${active==='Blog'?' class="active"':''}>Blog</a>
      <a href="${BASE}/pt/contacto/"${active==='Contacto'?' class="active"':''}>Contacto</a>
      <span class="lang-sw">
        <a href="${BASE}/" title="Español">ES</a>
        <span class="sep">|</span>
        <a class="active" href="${BASE}/pt/" title="Português">PT</a>
        <span class="sep">|</span>
        <a href="${BASE}/fr/" title="Français">FR</a>
      </span>
    </nav>
  </div>
</header>`;
}

function navFR(active=''){
  return `<header class="topbar">
  <div class="topbar-inner">
    <a class="logo" href="${BASE}/fr/"><span>🦜</span> paraisodeaves</a>
    <nav class="topnav">
      <a href="${BASE}/fr/"${active==='Accueil'?' class="active"':''}>Accueil</a>
      <a href="${BASE}/fr/perroquets-disponibles/"${active==='Perroquets'?' class="active"':''}>Perroquets</a>
      <a href="${BASE}/fr/nourriture-pour-perroquets/"${active==='Nourriture'?' class="active"':''}>Nourriture</a>
      <a href="${BASE}/fr/jouets-naturels-pour-perroquets/"${active==='Jouets'?' class="active"':''}>Jouets</a>
      <a href="${BASE}/fr/blog/"${active==='Blog'?' class="active"':''}>Blog</a>
      <a href="${BASE}/fr/contact/"${active==='Contact'?' class="active"':''}>Contact</a>
      <span class="lang-sw">
        <a href="${BASE}/" title="Español">ES</a>
        <span class="sep">|</span>
        <a href="${BASE}/pt/" title="Português">PT</a>
        <span class="sep">|</span>
        <a class="active" href="${BASE}/fr/" title="Français">FR</a>
      </span>
    </nav>
  </div>
</header>`;
}

/* ─────────────────────────────────────────────────────
   FOOTER VARIANTS
───────────────────────────────────────────────────── */
function footerES(){
  return `<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <h3>🦜 Paraíso de Aves</h3>
      <p>Criadero legal de loros y aves exóticas en Llíria, Valencia (España). Más de 25 años de experiencia. Envíos seguros a toda España y Europa.</p>
      <p style="margin-top:12px;font-size:.82rem;">📧 <a href="mailto:${EMAIL}" style="color:var(--gold-light);">${EMAIL}</a></p>
    </div>
    <div class="footer-col"><h4>Aves</h4><ul>
      <li><a href="${BASE}/loro-gris-africano.html">Loro Gris Africano</a></li>
      <li><a href="${BASE}/guacamayos.html">Guacamayos</a></li>
      <li><a href="${BASE}/cacatua.html">Cacatúas</a></li>
      <li><a href="${BASE}/loro-amazonico.html">Amazonas</a></li>
      <li><a href="${BASE}/eclectus.html">Eclectus</a></li>
      <li><a href="${BASE}/conuro.html">Conuros</a></li>
    </ul></div>
    <div class="footer-col"><h4>Información</h4><ul>
      <li><a href="${BASE}/adopcion-de-loros">Adopción</a></li>
      <li><a href="${BASE}/nuestras-instalaciones/">Nuestras Instalaciones</a></li>
      <li><a href="${BASE}/cuidados-basicos-de-un-loro">Cuidados Básicos</a></li>
      <li><a href="${BASE}/documentos-legales-para-adoptar-un-loro">Documentación CITES</a></li>
      <li><a href="${BASE}/nosotros.html">Nosotros</a></li>
      <li><a href="${BASE}/faq.html">FAQ</a></li>
    </ul></div>
    <div class="footer-col"><h4>Tienda</h4><ul>
      <li><a href="${BASE}/comida-para-loros/">Comida para Loros</a></li>
      <li><a href="${BASE}/juguetes-naturales-para-loros/">Juguetes Naturales</a></li>
      <li><a href="${BASE}/tienda.html">Aves Disponibles</a></li>
      <li><a href="${BASE}/aves-disponibles/">Galería de Aves</a></li>
    </ul></div>
    <div class="footer-col"><h4>Blog</h4><ul>
      <li><a href="${BASE}/blog/como-alimentar-un-loro-bebe.html">Alimentar un Bebé</a></li>
      <li><a href="${BASE}/blog/enfermedades-comunes-loros.html">Enfermedades</a></li>
      <li><a href="${BASE}/blog/jaula-ideal-loro-tamano.html">Jaulas</a></li>
      <li><a href="${BASE}/blog/cuanto-vive-un-loro.html">Longevidad</a></li>
      <li><a href="${BASE}/blog/">Ver todos →</a></li>
    </ul></div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Paraíso de Aves · Criadero Registrado · CITES Oficial · Llíria, Valencia, España</p>
    <p style="margin-top:6px;"><a href="${BASE}/fr/" style="color:rgba(255,255,255,.4);">FR</a> · <a href="${BASE}/pt/" style="color:rgba(255,255,255,.4);">PT</a></p>
  </div>
</footer>`;
}

function footerPT(){
  return `<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <h3>🦜 Paraíso de Aves</h3>
      <p>Criador registado de papagaios exóticos em Llíria, Valência (Espanha). Mais de 25 anos de experiência. Envios seguros para Portugal e toda a Europa.</p>
      <p style="margin-top:12px;font-size:.82rem;">📧 <a href="mailto:${EMAIL}" style="color:var(--gold-light);">${EMAIL}</a></p>
    </div>
    <div class="footer-col"><h4>Espécies</h4><ul>
      <li><a href="${BASE}/pt/papagaio-cinzento/">Papagaio Cinzento</a></li>
      <li><a href="${BASE}/pt/arara-a-venda/">Araras</a></li>
      <li><a href="${BASE}/pt/cacatua-a-venda/">Cacatuas</a></li>
      <li><a href="${BASE}/pt/amazona-a-venda/">Amazonas</a></li>
      <li><a href="${BASE}/pt/papagaio-eclectus/">Eclectus</a></li>
    </ul></div>
    <div class="footer-col"><h4>Informação</h4><ul>
      <li><a href="${BASE}/pt/papagaios-a-venda-portugal/">Papagaios em Portugal</a></li>
      <li><a href="${BASE}/pt/as-nossas-instalacoes/">As Nossas Instalações</a></li>
      <li><a href="${BASE}/pt/papagaios-disponiveis/">Papagaios Disponíveis</a></li>
      <li><a href="${BASE}/pt/contacto/">Contacto</a></li>
    </ul></div>
    <div class="footer-col"><h4>Loja</h4><ul>
      <li><a href="${BASE}/pt/comida-para-papagaios/">Comida para Papagaios</a></li>
      <li><a href="${BASE}/pt/brinquedos-naturais-para-papagaios/">Brinquedos Naturais</a></li>
    </ul></div>
    <div class="footer-col"><h4>Blog</h4><ul>
      <li><a href="${BASE}/pt/blog/alimentacao-correta-dos-papagaios/">Alimentação</a></li>
      <li><a href="${BASE}/pt/blog/documentacao-cites-portugal/">CITES Portugal</a></li>
      <li><a href="${BASE}/pt/blog/">Ver todos →</a></li>
    </ul></div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Paraíso de Aves · Criador Registado · CITES Oficial · Llíria, Valência, Espanha</p>
    <p style="margin-top:6px;"><a href="${BASE}/fr/" style="color:rgba(255,255,255,.4);">FR</a> · <a href="${BASE}/" style="color:rgba(255,255,255,.4);">ES</a></p>
  </div>
</footer>`;
}

function footerFR(){
  return `<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <h3>🦜 Paraíso de Aves</h3>
      <p>Éleveur enregistré de perroquets exotiques à Llíria, Valence (Espagne). Plus de 25 ans d'expérience. Livraisons sécurisées dans toute la France et l'Europe.</p>
      <p style="margin-top:12px;font-size:.82rem;">📧 <a href="mailto:${EMAIL}" style="color:var(--gold-light);">${EMAIL}</a></p>
    </div>
    <div class="footer-col"><h4>Espèces</h4><ul>
      <li><a href="${BASE}/fr/perroquet-gris-du-gabon/">Gris du Gabon</a></li>
      <li><a href="${BASE}/fr/ara-hyacinthe/">Ara Hyacinthe</a></li>
      <li><a href="${BASE}/fr/ara-bleu-et-jaune/">Ara Bleu et Jaune</a></li>
      <li><a href="${BASE}/fr/cacatoes-huppe-jaune/">Cacatoès Huppé</a></li>
      <li><a href="${BASE}/fr/eclectus/">Éclectus</a></li>
    </ul></div>
    <div class="footer-col"><h4>Information</h4><ul>
      <li><a href="${BASE}/fr/nos-installations/">Nos Installations</a></li>
      <li><a href="${BASE}/fr/perroquets-disponibles/">Perroquets Disponibles</a></li>
      <li><a href="${BASE}/fr/livraison/">Livraison en France</a></li>
      <li><a href="${BASE}/fr/contact/">Contact</a></li>
    </ul></div>
    <div class="footer-col"><h4>Boutique</h4><ul>
      <li><a href="${BASE}/fr/nourriture-pour-perroquets/">Nourriture</a></li>
      <li><a href="${BASE}/fr/jouets-naturels-pour-perroquets/">Jouets Naturels</a></li>
    </ul></div>
    <div class="footer-col"><h4>Blog</h4><ul>
      <li><a href="${BASE}/fr/blog/alimentation-perroquets/">Alimentation</a></li>
      <li><a href="${BASE}/fr/blog/guide-cites-france/">CITES France</a></li>
      <li><a href="${BASE}/fr/blog/">Tous les articles →</a></li>
    </ul></div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Paraíso de Aves · Éleveur Enregistré · CITES Officiel · Llíria, Valence, Espagne</p>
    <p style="margin-top:6px;"><a href="${BASE}/" style="color:rgba(255,255,255,.4);">ES</a> · <a href="${BASE}/pt/" style="color:rgba(255,255,255,.4);">PT</a></p>
  </div>
</footer>`;
}

/* ─────────────────────────────────────────────────────
   CONTACT FORM VARIANTS
───────────────────────────────────────────────────── */
function contactFormES(id){
  return `<div class="contact-form" id="contacto">
  <h3>📋 Solicitar información</h3>
  <p style="font-size:.82rem;color:var(--muted);margin-bottom:14px;">Respondemos en 24h.</p>
  <form method="POST" data-netlify="true" name="contact-${id}">
    <input type="hidden" name="form-name" value="contact-${id}"/>
    <div class="form-group"><label>Nombre *</label><input type="text" name="nombre" required placeholder="Tu nombre"/></div>
    <div class="form-group"><label>Email *</label><input type="email" name="email" required placeholder="email@ejemplo.es"/></div>
    <div class="form-group"><label>Especie de interés</label>
      <select name="especie">
        <option value="">Selecciona</option>
        <option>Loro gris africano (Yaco)</option><option>Guacamayo azul y amarillo</option>
        <option>Guacamayo jacinto</option><option>Cacatúa</option>
        <option>Amazona</option><option>Eclectus</option><option>Otro</option>
      </select>
    </div>
    <div class="form-group"><label>Mensaje</label>
      <textarea name="mensaje" placeholder="Preguntas sobre disponibilidad, precio, envío..."></textarea>
    </div>
    <button type="submit" class="btn-gold" style="width:100%;padding:12px;">Enviar consulta →</button>
  </form>
</div>`;
}

function contactFormPT(id){
  return `<div class="contact-form" id="contacto">
  <h3>📋 Solicitar informações</h3>
  <p style="font-size:.82rem;color:var(--muted);margin-bottom:14px;">Respondemos em 24h.</p>
  <form method="POST" data-netlify="true" name="contact-pt-${id}">
    <input type="hidden" name="form-name" value="contact-pt-${id}"/>
    <div class="form-group"><label>Nome *</label><input type="text" name="nome" required placeholder="O seu nome"/></div>
    <div class="form-group"><label>Email *</label><input type="email" name="email" required placeholder="email@exemplo.pt"/></div>
    <div class="form-group"><label>Espécie de interesse</label>
      <select name="especie">
        <option value="">Selecione</option>
        <option>Papagaio Cinzento</option><option>Arara Azul e Amarela</option>
        <option>Arara Jacinto</option><option>Cacatua</option>
        <option>Amazona</option><option>Eclectus</option><option>Outro</option>
      </select>
    </div>
    <div class="form-group"><label>Mensagem</label>
      <textarea name="mensagem" placeholder="Perguntas sobre disponibilidade, preço, envio..."></textarea>
    </div>
    <button type="submit" class="btn-gold" style="width:100%;padding:12px;">Enviar consulta →</button>
  </form>
</div>`;
}

function contactFormFR(id){
  return `<div class="contact-form" id="contact">
  <h3>📋 Demander des informations</h3>
  <p style="font-size:.82rem;color:var(--muted);margin-bottom:14px;">Réponse sous 24h.</p>
  <form method="POST" data-netlify="true" name="contact-fr-${id}">
    <input type="hidden" name="form-name" value="contact-fr-${id}"/>
    <div class="form-group"><label>Nom *</label><input type="text" name="nom" required placeholder="Votre nom"/></div>
    <div class="form-group"><label>E-mail *</label><input type="email" name="email" required placeholder="email@exemple.fr"/></div>
    <div class="form-group"><label>Espèce souhaitée</label>
      <select name="espece">
        <option value="">Sélectionnez</option>
        <option>Perroquet Gris du Gabon</option><option>Ara Hyacinthe</option>
        <option>Ara Bleu et Jaune</option><option>Cacatoès</option>
        <option>Amazone</option><option>Éclectus</option><option>Autre</option>
      </select>
    </div>
    <div class="form-group"><label>Message</label>
      <textarea name="message" placeholder="Questions sur la disponibilité, le prix, la livraison..."></textarea>
    </div>
    <button type="submit" class="btn-gold" style="width:100%;padding:12px;">Envoyer →</button>
  </form>
</div>`;
}

/* ════════════════════════════════════════════════════
   TOPIC 1 — COMIDA / FOOD / ALIMENTATION
════════════════════════════════════════════════════ */

const foodPhotos = [
  {slug:'comida-para-loros-mezcla-premium',icon:'🌾',altEs:'Mezcla premium de semillas para loros',altPt:'Mistura premium de sementes para papagaios',altFr:'Mélange premium de graines pour perroquets',captionEs:'Mezcla premium de semillas y cereales para loros',captionPt:'Mistura premium de sementes e cereais para papagaios',captionFr:'Mélange premium de graines et céréales pour perroquets'},
  {slug:'pellets-para-loros-nutricion',icon:'🟤',altEs:'Pellets nutritivos para loros y psitácidos',altPt:'Peletes nutritivos para papagaios',altFr:'Granulés nutritifs pour perroquets',captionEs:'Pellets formulados para cubrir todas las necesidades nutricionales',captionPt:'Peletes formulados para todas as necessidades nutricionais',captionFr:'Granulés formulés pour couvrir tous les besoins nutritionnels'},
  {slug:'frutas-seguras-para-loros',icon:'🍎',altEs:'Frutas frescas seguras para loros: manzana, pera, papaya',altPt:'Frutas frescas seguras para papagaios',altFr:'Fruits frais sûrs pour perroquets',captionEs:'Frutas frescas recomendadas: manzana, pera, papaya, mango',captionPt:'Frutas frescas recomendadas: maçã, pera, papaia, manga',captionFr:'Fruits frais recommandés: pomme, poire, papaye, mangue'},
  {slug:'verduras-para-loros-dieta',icon:'🥦',altEs:'Verduras y hortalizas para la dieta del loro',altPt:'Verduras e hortaliças para a dieta do papagaio',altFr:'Légumes pour le régime alimentaire des perroquets',captionEs:'Verduras esenciales: zanahoria, pimiento, brócoli, calabaza',captionPt:'Verduras essenciais: cenoura, pimento, brócolos, abóbora',captionFr:'Légumes essentiels: carotte, poivron, brocoli, courgette'},
  {slug:'semillas-para-loros-grandes',icon:'🌻',altEs:'Semillas para loros grandes: girasol, cártamo, calabaza',altPt:'Sementes para papagaios grandes',altFr:'Graines pour grands perroquets',captionEs:'Semillas para especies grandes: girasol, cártamo, calabaza',captionPt:'Sementes para espécies grandes: girassol, cártamo, abóbora',captionFr:'Graines pour grandes espèces: tournesol, carthame, citrouille'},
  {slug:'alimentos-prohibidos-loros',icon:'🚫',altEs:'Alimentos prohibidos y tóxicos para loros',altPt:'Alimentos proibidos e tóxicos para papagaios',altFr:'Aliments interdits et toxiques pour perroquets',captionEs:'Alimentos NUNCA dar a un loro: aguacate, chocolate, cebolla',captionPt:'Alimentos que NUNCA dar a um papagaio: abacate, chocolate',captionFr:'Aliments à NE JAMAIS donner: avocat, chocolat, oignon'},
  {slug:'papilla-para-loros-bebe',icon:'🍼',altEs:'Papilla handfeeding para pichones de loro',altPt:'Papa handfeeding para filhotes de papagaio',altFr:'Bouillie handfeeding pour oisillons perroquets',captionEs:'Fórmula de papilla para pichones en cría a mano',captionPt:'Fórmula de papa para filhotes em criação à mão',captionFr:'Formule de bouillie pour oisillons élevés à la main'},
  {slug:'brotes-germinados-loros',icon:'🌱',altEs:'Brotes y germinados para enriquecer la dieta del loro',altPt:'Brotos germinados para enriquecer a dieta do papagaio',altFr:'Graines germées pour enrichir le régime du perroquet',captionEs:'Brotes germinados: lentejas, girasol, trigo — extra nutritivos',captionPt:'Brotos germinados: lentilhas, girassol, trigo — extra nutritivos',captionFr:'Graines germées: lentilles, tournesol, blé — ultra nutritives'},
  {slug:'suplementos-vitaminas-loros',icon:'💊',altEs:'Suplementos vitamínicos para loros y psitácidos',altPt:'Suplementos vitamínicos para papagaios',altFr:'Suppléments vitaminés pour perroquets',captionEs:'Suplementos: vitamina A, D3, calcio — especialmente en muda',captionPt:'Suplementos: vitamina A, D3, cálcio — especialmente na muda',captionFr:'Suppléments: vitamine A, D3, calcium — surtout en mue'},
  {slug:'comedero-acero-inoxidable-loro',icon:'🥣',altEs:'Comedero de acero inoxidable higiénico para loros',altPt:'Comedouro de aço inoxidável higiénico para papagaios',altFr:'Mangeoire en acier inoxydable hygiénique pour perroquets',captionEs:'Comedero de acero: fácil de limpiar y sin BPA',captionPt:'Comedouro de aço: fácil de limpar e sem BPA',captionFr:'Mangeoire en acier: facile à nettoyer et sans BPA'},
  {slug:'rutina-alimentacion-loro-diaria',icon:'🕐',altEs:'Rutina diaria de alimentación para loros',altPt:'Rotina diária de alimentação para papagaios',altFr:'Routine quotidienne d\'alimentation pour perroquets',captionEs:'Rutina recomendada: mañana fruta, mediodía pellets, tarde semillas',captionPt:'Rotina recomendada: manhã fruta, meio-dia peletes, tarde sementes',captionFr:'Routine recommandée: matin fruits, midi granulés, soir graines'},
  {slug:'hierbas-frescas-loros-beneficios',icon:'🌿',altEs:'Hierbas frescas beneficiosas para loros: perejil, cilantro',altPt:'Ervas frescas benéficas para papagaios: salsa, coentros',altFr:'Herbes fraîches bénéfiques pour perroquets: persil, coriandre',captionEs:'Hierbas frescas: perejil, cilantro, albahaca, menta — en pequeñas cantidades',captionPt:'Ervas frescas: salsa, coentros, manjericão — em pequenas quantidades',captionFr:'Herbes fraîches: persil, coriandre, basilic — en petites quantités'},
  {slug:'comida-guacamayo-dieta-especifica',icon:'🦜',altEs:'Dieta específica para guacamayos azul y amarillo',altPt:'Dieta específica para araras azul e amarela',altFr:'Régime spécifique pour aras bleus et jaunes',captionEs:'Guacamayos: dieta rica en nueces, semillas grandes y frutas tropicales',captionPt:'Araras: dieta rica em nozes, sementes grandes e frutas tropicais',captionFr:'Aras: régime riche en noix, grandes graines et fruits tropicaux'},
  {slug:'comida-yaco-loro-gris',icon:'🐦',altEs:'Alimentación específica para el loro gris africano (Yaco)',altPt:'Alimentação específica para o papagaio cinzento africano',altFr:'Alimentation spécifique pour le gris du Gabon',captionEs:'Yaco: alto en vitamina A (zanahoria, pimiento rojo, batata)',captionPt:'Cinzento: alto em vitamina A (cenoura, pimento vermelho, batata-doce)',captionFr:'Gris du Gabon: riche en vitamine A (carotte, poivron rouge, patate douce)'},
  {slug:'comida-cacatua-dieta-baja-grasa',icon:'🤍',altEs:'Dieta baja en grasas para cacatúas',altPt:'Dieta com baixo teor de gordura para cacatuas',altFr:'Régime pauvre en graisses pour cacatoès',captionEs:'Cacatúas propensas a obesidad: pellets bajos en grasa + muchas verduras',captionPt:'Cacatuas propensas a obesidade: peletes com baixo teor de gordura + muitas verduras',captionFr:'Cacatoès sujets à l\'obésité: granulés pauvres en graisses + beaucoup de légumes'},
  {slug:'agua-fresca-hidratacion-loros',icon:'💧',altEs:'Hidratación correcta para loros: agua fresca diaria',altPt:'Hidratação correta para papagaios: água fresca diária',altFr:'Hydratation correcte pour perroquets: eau fraîche quotidienne',captionEs:'Agua limpia y fresca diariamente — cambiar dos veces al día en verano',captionPt:'Água limpa e fresca diariamente — mudar duas vezes por dia no verão',captionFr:'Eau propre et fraîche quotidiennement — à renouveler deux fois par jour en été'},
  {slug:'premios-snacks-naturales-loros',icon:'🎁',altEs:'Premios y snacks naturales para adiestrar loros',altPt:'Petiscos naturais para treinar papagaios',altFr:'Friandises naturelles pour dresser les perroquets',captionEs:'Premios naturales: piñón, almendra, girasol — con moderación',captionPt:'Petiscos naturais: pinhão, amêndoa, girassol — com moderação',captionFr:'Friandises naturelles: pignon de pin, amande, tournesol — avec modération'},
  {slug:'dieta-loro-amazonico-frutas',icon:'🟢',altEs:'Alimentación del loro amazónico: frutas tropicales y verduras',altPt:'Alimentação da amazona: frutas tropicais e verduras',altFr:'Alimentation de l\'amazone: fruits tropicaux et légumes',captionEs:'Amazonas: frutas tropicales, verduras y pellets de alta calidad',captionPt:'Amazonas: frutas tropicais, verduras e peletes de alta qualidade',captionFr:'Amazones: fruits tropicaux, légumes et granulés de haute qualité'},
  {slug:'huesos-sepia-calcio-loros',icon:'🦴',altEs:'Hueso de sepia como fuente de calcio para loros',altPt:'Osso de choco como fonte de cálcio para papagaios',altFr:'Os de seiche comme source de calcium pour perroquets',captionEs:'Hueso de sepia: calcio natural y entretenimiento para el pico',captionPt:'Osso de choco: cálcio natural e entretenimento para o bico',captionFr:'Os de seiche: calcium naturel et occupation pour le bec'},
  {slug:'nevera-alimentos-frescos-loros',icon:'❄️',altEs:'Conservación correcta de alimentos frescos para loros',altPt:'Conservação correta de alimentos frescos para papagaios',altFr:'Conservation correcte des aliments frais pour perroquets',captionEs:'Los alimentos frescos no deben dejarse más de 2-3 horas en el comedero',captionPt:'Os alimentos frescos não devem ficar mais de 2-3 horas no comedouro',captionFr:'Les aliments frais ne doivent pas rester plus de 2-3h dans la mangeoire'},
  {slug:'comida-eclectus-especial',icon:'🟥',altEs:'Dieta especial para loros Eclectus: alta en betacaroteno',altPt:'Dieta especial para Eclectus: alto em betacaroteno',altFr:'Régime spécial pour l\'Éclectus: riche en bêtacarotène',captionEs:'Eclectus: dieta muy rica en frutas y verduras frescas (80% dieta)',captionPt:'Eclectus: dieta muito rica em frutas e verduras frescas (80% da dieta)',captionFr:'Éclectus: régime très riche en fruits et légumes frais (80% du régime)'},
  {slug:'comedero-forrajeo-estimulacion',icon:'🎯',altEs:'Comedero de forrajeo para estimulación mental del loro',altPt:'Comedouro de forrageamento para estimulação mental do papagaio',altFr:'Mangeoire de fourragement pour la stimulation mentale du perroquet',captionEs:'Comederos forrajeadores: estimulan el instinto natural de búsqueda de comida',captionPt:'Comedouros de forrageamento: estimulam o instinto natural de procura de comida',captionFr:'Mangeoires de fourragement: stimulent l\'instinct naturel de recherche de nourriture'},
  {slug:'nueces-para-loros-proteinas',icon:'🥜',altEs:'Nueces y frutos secos para loros como fuente de proteínas',altPt:'Nozes e frutos secos para papagaios como fonte de proteínas',altFr:'Noix et fruits secs pour perroquets comme source de protéines',captionEs:'Frutos secos: nuez, almendra, avellana — con moderación por su alto contenido graso',captionPt:'Frutos secos: noz, amêndoa, avelã — com moderação pelo alto teor de gordura',captionFr:'Fruits à coque: noix, amande, noisette — avec modération car très gras'},
  {slug:'cereales-cocidos-loros-energia',icon:'🌽',altEs:'Cereales cocidos para loros: arroz, quinoa, pasta integral',altPt:'Cereais cozidos para papagaios: arroz, quinoa, massa integral',altFr:'Céréales cuites pour perroquets: riz, quinoa, pâtes complètes',captionEs:'Cereales cocidos sin sal ni aceite: arroz, quinoa, pasta, maíz cocido',captionPt:'Cereais cozidos sem sal nem óleo: arroz, quinoa, massa, milho cozido',captionFr:'Céréales cuites sans sel ni huile: riz, quinoa, pâtes, maïs cuit'},
  {slug:'pimiento-rojo-vitamina-a-loro',icon:'🫑',altEs:'Pimiento rojo: fuente esencial de vitamina A para loros',altPt:'Pimento vermelho: fonte essencial de vitamina A para papagaios',altFr:'Poivron rouge: source essentielle de vitamine A pour perroquets',captionEs:'Pimiento rojo: uno de los alimentos más nutritivos para los loros',captionPt:'Pimento vermelho: um dos alimentos mais nutritivos para papagaios',captionFr:'Poivron rouge: l\'un des aliments les plus nutritifs pour les perroquets'},
  {slug:'bayas-arándanos-loros-antioxidantes',icon:'🫐',altEs:'Bayas y arándanos para loros: antioxidantes naturales',altPt:'Bagas e mirtilos para papagaios: antioxidantes naturais',altFr:'Baies et myrtilles pour perroquets: antioxydants naturels',captionEs:'Arándanos, frambuesas y moras: antioxidantes naturales en pequeñas cantidades',captionPt:'Mirtilos, framboesas e amoras: antioxidantes naturais em pequenas quantidades',captionFr:'Myrtilles, framboises et mûres: antioxydants naturels en petites quantités'},
  {slug:'dieta-equilibrada-loro-grafico',icon:'📊',altEs:'Gráfico de dieta equilibrada para loros psitácidos',altPt:'Gráfico de dieta equilibrada para papagaios psitacídeos',altFr:'Graphique de régime équilibré pour perroquets psittacidés',captionEs:'Distribución ideal: 50-60% pellets, 30-35% verduras y frutas, 10% semillas',captionPt:'Distribuição ideal: 50-60% peletes, 30-35% verduras e frutas, 10% sementes',captionFr:'Distribution idéale: 50-60% granulés, 30-35% légumes et fruits, 10% graines'},
  {slug:'mango-loro-fruta-tropical',icon:'🥭',altEs:'Mango fresco para loros: fruta tropical muy recomendada',altPt:'Manga fresca para papagaios: fruta tropical muito recomendada',altFr:'Mangue fraîche pour perroquets: fruit tropical très recommandé',captionEs:'Mango: rico en vitamina A y C, encanta a la mayoría de los loros',captionPt:'Manga: rica em vitamina A e C, adorada pela maioria dos papagaios',captionFr:'Mangue: riche en vitamine A et C, adorée par la plupart des perroquets'},
  {slug:'alimento-fresco-diario-loro',icon:'🌅',altEs:'Preparación diaria de alimento fresco para loros',altPt:'Preparação diária de alimento fresco para papagaios',altFr:'Préparation quotidienne d\'aliment frais pour perroquets',captionEs:'Preparar alimento fresco cada día: variedad y presentación importan',captionPt:'Preparar alimento fresco todos os dias: variedade e apresentação importam',captionFr:'Préparer des aliments frais chaque jour: la variété et la présentation comptent'},
  {slug:'papaya-loro-digestion-enzimas',icon:'🍈',altEs:'Papaya para loros: enzimas digestivas y vitamina C',altPt:'Papaia para papagaios: enzimas digestivas e vitamina C',altFr:'Papaye pour perroquets: enzymes digestives et vitamine C',captionEs:'Papaya: contiene papaína que favorece la digestión',captionPt:'Papaia: contém papaína que favorece a digestão',captionFr:'Papaye: contient de la papaïne qui favorise la digestion'},
  {slug:'granada-fruta-loros-antioxidante',icon:'🍎',altEs:'Granada para loros: antioxidantes y vitaminas naturales',altPt:'Romã para papagaios: antioxidantes e vitaminas naturais',altFr:'Grenade pour perroquets: antioxydants et vitamines naturelles',captionEs:'Granada: rica en antioxidantes, los loros adoran extraer los granos',captionPt:'Romã: rica em antioxidantes, os papagaios adoram extrair os grãos',captionFr:'Grenade: riche en antioxydants, les perroquets adorent extraire les graines'},
  {slug:'comida-conuro-alimentacion',icon:'💚',altEs:'Alimentación para conuros: mezclas pequeñas y frutas',altPt:'Alimentação para conuros: misturas pequenas e frutas',altFr:'Alimentation pour conures: petits mélanges et fruits',captionEs:'Conuros: semillas pequeñas, frutas tropicales y verduras variadas',captionPt:'Conuros: sementes pequenas, frutas tropicais e verduras variadas',captionFr:'Conures: petites graines, fruits tropicaux et légumes variés'},
  {slug:'dieta-loro-temporada-muda',icon:'🍂',altEs:'Dieta específica para la época de muda en loros',altPt:'Dieta específica para a época de muda em papagaios',altFr:'Régime spécifique pour la période de mue des perroquets',captionEs:'En época de muda: aumentar proteínas y vitamina A para nuevas plumas',captionPt:'Na época de muda: aumentar proteínas e vitamina A para novas penas',captionFr:'En période de mue: augmenter les protéines et la vitamine A pour les nouvelles plumes'},
  {slug:'suplemento-calcio-hembras-loros',icon:'🥚',altEs:'Suplemento de calcio extra para hembras en período de puesta',altPt:'Suplemento de cálcio extra para fêmeas em período de postura',altFr:'Supplément de calcium supplémentaire pour les femelles en période de ponte',captionEs:'Hembras en puesta: calcio extra imprescindible para evitar carencias',captionPt:'Fêmeas na postura: cálcio extra imprescindível para evitar carências',captionFr:'Femelles en ponte: calcium supplémentaire indispensable pour éviter les carences'},
  {slug:'batata-dulce-asada-loro',icon:'🍠',altEs:'Batata dulce asada para loros: fuente de betacaroteno',altPt:'Batata-doce assada para papagaios: fonte de betacaroteno',altFr:'Patate douce cuite pour perroquets: source de bêtacarotène',captionEs:'Batata dulce asada (sin sal): una de las mejores fuentes de betacaroteno',captionPt:'Batata-doce assada (sem sal): uma das melhores fontes de betacaroteno',captionFr:'Patate douce cuite (sans sel): l\'une des meilleures sources de bêtacarotène'},
  {slug:'alimentos-calcio-loro-natural',icon:'🦷',altEs:'Fuentes naturales de calcio para loros: hueso sepia, cuttlebone',altPt:'Fontes naturais de cálcio para papagaios',altFr:'Sources naturelles de calcium pour perroquets',captionEs:'Calcio natural: hueso de sepia, copos de calcio, brócoli, col rizada',captionPt:'Cálcio natural: osso de choco, flocos de cálcio, brócolos, couve',captionFr:'Calcium naturel: os de seiche, flocons de calcium, brocoli, chou kale'},
  {slug:'mezcla-semillas-artesanal-loro',icon:'⚗️',altEs:'Mezcla artesanal de semillas para loros: receta equilibrada',altPt:'Mistura artesanal de sementes para papagaios: receita equilibrada',altFr:'Mélange artisanal de graines pour perroquets: recette équilibrée',captionEs:'Receta casera de mezcla equilibrada: base mijo + avena + semillas pequeñas',captionPt:'Receita caseira de mistura equilibrada: base milheto + aveia + sementes pequenas',captionFr:'Recette maison de mélange équilibré: base millet + avoine + petites graines'},
  {slug:'porcion-correcta-comida-loro',icon:'⚖️',altEs:'Porción correcta de comida para loros por tamaño y especie',altPt:'Porção correta de comida para papagaios por tamanho e espécie',altFr:'Portion correcte de nourriture pour perroquets par taille et espèce',captionEs:'Porciones diarias: periquito 30g · Agapornis 45g · Yaco 80g · Guacamayo 150g',captionPt:'Porções diárias: periquito 30g · Agapornis 45g · Cinzento 80g · Arara 150g',captionFr:'Portions quotidiennes: perruche 30g · Inséparable 45g · Gris 80g · Ara 150g'},
  {slug:'kiwi-fruta-segura-loros',icon:'🥝',altEs:'Kiwi para loros: vitamina C y fibra natural',altPt:'Kiwi para papagaios: vitamina C e fibra natural',altFr:'Kiwi pour perroquets: vitamine C et fibres naturelles',captionEs:'Kiwi: excelente fuente de vitamina C, dar sin piel en trozos pequeños',captionPt:'Kiwi: excelente fonte de vitamina C, dar sem casca em pequenos pedaços',captionFr:'Kiwi: excellente source de vitamine C, donner sans peau en petits morceaux'},
  {slug:'agua-nebulizador-hidratacion-loro',icon:'💦',altEs:'Nebulizador de agua para hidratación y bienestar del loro',altPt:'Nebulizador de água para hidratação e bem-estar do papagaio',altFr:'Nébuliseur d\'eau pour l\'hydratation et le bien-être du perroquet',captionEs:'Nebulizador: hidratar las plumas además del agua en el bebedero',captionPt:'Nebulizador: hidratar as penas além da água no bebedouro',captionFr:'Nébuliseur: hydrater les plumes en plus de l\'eau dans l\'abreuvoir'},
];

function generateComidaES(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/comida-para-loros/#webpage","url":"${BASE}/comida-para-loros/","name":"Comida para Loros: Guía Completa de Alimentación 2026","description":"Guía experta sobre la mejor comida para loros: semillas, pellets, frutas, verduras, alimentos prohibidos y rutinas de alimentación. Escrita por criadores con 25+ años de experiencia.","inLanguage":"es-ES","isPartOf":{"@id":"${BASE}/#website"}},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"${BASE}/"},{"@type":"ListItem","position":2,"name":"Comida para Loros","item":"${BASE}/comida-para-loros/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"¿Qué es mejor para un loro: pellets o semillas?","acceptedAnswer":{"@type":"Answer","text":"Los pellets deben ser la base (50-60% de la dieta) por ser nutricionalmente completos. Las semillas son complemento, no base alimentaria, ya que son altas en grasa y bajas en vitaminas esenciales."}},
{"@type":"Question","name":"¿Qué frutas puede comer un loro?","acceptedAnswer":{"@type":"Answer","text":"Manzana (sin pepitas), pera, papaya, mango, kiwi, arándanos, frambuesas, granada, melocotón, melón. Evitar aguacate, que es tóxico para los loros."}},
{"@type":"Question","name":"¿Cuántas veces al día hay que darle de comer a un loro?","acceptedAnswer":{"@type":"Answer","text":"Lo ideal son 2-3 tomas diarias. Mañana: fruta fresca y verduras. Mediodía o tarde: pellets y cereales. Los pellets pueden dejarse disponibles durante más tiempo. Retirar siempre alimentos frescos antes de 3 horas en verano."}},
{"@type":"Question","name":"¿El chocolate es tóxico para los loros?","acceptedAnswer":{"@type":"Answer","text":"Sí, el chocolate es altamente tóxico para los loros. Contiene teobromina, que los psitácidos no pueden metabolizar y puede causar la muerte. Nunca dar chocolate, café, té o bebidas con cafeína."}},
{"@type":"Question","name":"¿Pueden comer loros arroz?","acceptedAnswer":{"@type":"Answer","text":"Sí, el arroz cocido sin sal es perfectamente seguro y nutritivo para los loros. También pueden comer quinoa, pasta integral, maíz cocido y otros cereales cocidos sin condimentos."}}
]}
]}</script>`;

  const html = `${head({lang:'es',title:'Comida para Loros: Guía Completa de Alimentación 2026 | Paraisodeaves',desc:'Guía experta sobre la mejor comida para loros: semillas, pellets, frutas, verduras y alimentos prohibidos. Escrita por criadores con 25 años de experiencia en España.',canonical:'/comida-para-loros/',esPath:'/comida-para-loros/',ptPath:'/pt/comida-para-papagaios/',frPath:'/fr/nourriture-pour-perroquets/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navES('Comida')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/">Inicio</a><span>›</span><span>Comida para Loros</span></div></div>

<section class="page-hero">
  <div class="badge">🌿 Nutrición Aviar · Expertos en Psitácidos</div>
  <h1>Comida para Loros:<br>Guía Completa de Alimentación</h1>
  <p class="subtitle">Todo lo que necesitas saber para alimentar correctamente a tu loro: semillas, pellets, frutas, verduras, suplementos y alimentos peligrosos.</p>
  <div class="trust-pills">
    <span>✓ 25+ años de experiencia</span>
    <span>✓ Basada en veterinaria aviar</span>
    <span>✓ Actualizada 2026</span>
    <span>✓ Para todas las especies</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>La mejor comida para loros en 2026</h2>
    <p>Alimentar correctamente a un loro es uno de los pilares más importantes de su salud y longevidad. Un loro bien nutrido puede vivir décadas, mientras que una dieta deficiente acorta su vida y genera problemas de salud crónicos. En Paraíso de Aves llevamos más de 25 años estudiando y perfeccionando la alimentación de nuestras aves, trabajando junto a veterinarios especializados en medicina aviar.</p>
    <p>La alimentación del loro moderno ha evolucionado mucho. Antiguamente se pensaba que bastaba con una mezcla de semillas, pero la ciencia aviar actual demuestra que los loros necesitan una dieta tan variada y equilibrada como la nuestra. La clave está en entender qué comen en la naturaleza y replicarlo de forma segura en cautividad.</p>
    <div class="highlight-box">
      <strong>Regla de oro:</strong> La dieta ideal de un loro debe componerse de un 50-60% de pellets formulados, un 30-35% de frutas y verduras frescas, y el restante 10-15% de semillas, frutos secos y cereales cocidos como complemento.
    </div>
    <h3>Tipos de alimentos para loros</h3>
    <p>Podemos clasificar los alimentos para loros en cuatro categorías principales: pellets (la base nutricional), alimentos frescos (frutas y verduras), semillas y frutos secos (como complemento, no base), y suplementos y minerales (calcio, vitaminas). Cada categoría cumple una función específica y ninguna debe faltar en una dieta completa.</p>
  </section>

  <section class="section">
    <h2>Pellets: la base nutricional imprescindible</h2>
    <p>Los pellets o gránulos formulados representan hoy en día el avance más importante en la alimentación de psitácidos en cautividad. A diferencia de las semillas, los pellets están diseñados específicamente para cubrir las necesidades nutricionales completas del loro, con un balance óptimo de proteínas, carbohidratos, grasas, vitaminas y minerales.</p>
    <p>Existen pellets para diferentes tamaños de loros: mini (para periquitos, agapornis y cotorras), medianos (para amazonas, yacos y cacatúas) y grandes (para guacamayos y loros eclectus). La textura y el tamaño deben adaptarse a la especie.</p>
    <h3>Marcas de pellets recomendadas</h3>
    <p>En el mercado español destacan varias marcas de calidad: <strong>Harrison's Bird Foods</strong> (certificada orgánica, la referencia mundial), <strong>Roudybush</strong> (formula científicamente validada), <strong>ZuPreem</strong> (buena relación calidad-precio) y <strong>Versele-Laga NutriBird</strong> (ampliamente disponible en España). La transición de semillas a pellets requiere paciencia: puede tomar semanas o meses dependiendo del loro.</p>
    <h3>¿Cómo hacer la transición a pellets?</h3>
    <p>Si tu loro lleva años comiendo solo semillas, el cambio a pellets debe ser gradual. Empieza mezclando el 20% de pellets con el 80% de semillas durante 2 semanas. Luego 40% pellets. Luego 60%. Nunca hagas el cambio de golpe: un loro que no reconoce los pellets como comida puede ayunar peligrosamente.</p>
  </section>

  <section class="section">
    <h2>Semillas para loros: complemento, no base</h2>
    <p>Las semillas son el alimento que la mayoría asocia con los loros, y aunque son un elemento válido en su dieta, no deben ser su base principal. El problema de las semillas es su alto contenido en grasa, especialmente las pipas de girasol y el cártamo, y su bajo contenido en vitaminas esenciales como la A y el D3.</p>
    <p>Una dieta basada principalmente en semillas lleva a deficiencias nutricionales crónicas, especialmente de vitamina A, que se manifiestan como problemas respiratorios, infecciones frecuentes, problemas de plumas y lesiones en el tracto digestivo.</p>
    <h3>Semillas recomendadas y frecuencia</h3>
    <table class="specs-table"><thead><tr><th>Semilla</th><th>Frecuencia</th><th>Especies principales</th></tr></thead><tbody>
      <tr><td>Mijo</td><td>Diario (pequeñas cantidades)</td><td>Periquitos, agapornis, cotorras</td></tr>
      <tr><td>Alpiste</td><td>Varios días/semana</td><td>Periquitos, ninfas</td></tr>
      <tr><td>Avena</td><td>Varios días/semana</td><td>Todas las especies</td></tr>
      <tr><td>Cártamo</td><td>2-3 veces/semana</td><td>Loros medianos y grandes</td></tr>
      <tr><td>Girasol</td><td>Ocasional (premio)</td><td>Todas (con moderación)</td></tr>
      <tr><td>Calabaza</td><td>Varios días/semana</td><td>Guacamayos, yacos</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Frutas y verduras: el arcoíris en el comedero</h2>
    <p>Las frutas y verduras frescas son esenciales en la dieta de cualquier loro. Aportan vitaminas, minerales, antioxidantes y fibra que no se pueden obtener de semillas ni pellets en la misma proporción. El objetivo es ofrecer variedad y color: cuanto más colorido sea el plato, más completo nutricionalmente.</p>
    <h3>Frutas seguras para loros</h3>
    <p>La mayoría de las frutas son seguras para los loros. Las más recomendadas son: manzana (sin pepitas ni semillas), pera, papaya, mango, kiwi, sandía, melón, naranja, mandarinas, piña, frambuesas, arándanos, moras, granada, melocotón, nectarina, higos y dátiles. La fruta se puede dar fresca, ligeramente deshidratada o congelada.</p>
    <div class="highlight-box"><strong>⚠ Importante:</strong> Nunca dar aguacate a un loro. Contiene persin, una toxina letal para los psitácidos. Tampoco dar pepitas de manzana, pera, melocotón ni cerezas.</div>
    <h3>Verduras esenciales para loros</h3>
    <p>Las verduras más recomendadas son: zanahoria (rica en betacaroteno), pimiento rojo y amarillo (vitamina C y betacaroteno), brócoli, col rizada (kale), calabaza, espinacas (con moderación por el oxalato), guisantes, maíz dulce, judías verdes, apio y pepino. Las verduras pueden ofrecerse crudas, ligeramente al vapor o cocidas sin sal.</p>
    <h3>Preparación y presentación</h3>
    <p>Los loros aprenden a comer nuevos alimentos observando a otros loros o a sus dueños. Presentar los alimentos de formas creativas ayuda: ensartados en un espeto, en trozos grandes para manipular, o mezclados en un cuenco colorido. La variedad en la presentación estimula el interés y previene la selectividad alimentaria.</p>
  </section>

  <section class="section">
    <h2>Alimentos tóxicos y prohibidos para loros</h2>
    <p>Algunos alimentos que los humanos consumimos habitualmente son extremadamente peligrosos para los loros. Es fundamental que todos los miembros de la familia conozcan esta lista y que nunca se ofrezcan estos alimentos al ave, ni siquiera en pequeñas cantidades.</p>
    <table class="specs-table"><thead><tr><th>Alimento</th><th>Toxicidad</th><th>Efecto</th></tr></thead><tbody>
      <tr><td>Aguacate</td><td>🔴 LETAL</td><td>Persin: fallo cardíaco y respiratorio</td></tr>
      <tr><td>Chocolate</td><td>🔴 LETAL</td><td>Teobromina: fallo del sistema nervioso</td></tr>
      <tr><td>Cebolla y ajo</td><td>🔴 MUY TÓXICO</td><td>Anemia hemolítica</td></tr>
      <tr><td>Café / Cafeína</td><td>🔴 TÓXICO</td><td>Arritmias cardíacas</td></tr>
      <tr><td>Alcohol</td><td>🔴 LETAL incluso en mínimas cantidades</td><td>Fallo orgánico</td></tr>
      <tr><td>Sal</td><td>🟠 PERJUDICIAL</td><td>Deshidratación y fallo renal</td></tr>
      <tr><td>Azúcar refinado</td><td>🟠 PERJUDICIAL</td><td>Obesidad y candidiasis</td></tr>
      <tr><td>Leche / lácteos</td><td>🟡 EVITAR</td><td>Los loros son intolerantes a la lactosa</td></tr>
      <tr><td>Semillas de manzana/pera</td><td>🔴 TÓXICO</td><td>Contienen cianuro</td></tr>
      <tr><td>Plantas ornamentales</td><td>🔴 MUCHAS TÓXICAS</td><td>Variable según especie</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Alimentación específica por especie</h2>
    <p>Aunque todos los loros comparten necesidades básicas, cada especie tiene particularidades nutricionales propias. Conocerlas permite optimizar la dieta y prevenir problemas específicos de salud.</p>
    <div class="species-grid">
      <a class="species-chip" href="${BASE}/loro-gris-africano.html"><div class="ic">🐦</div>Yaco (Loro Gris)</a>
      <a class="species-chip" href="${BASE}/guacamayos.html"><div class="ic">🦜</div>Guacamayos</a>
      <a class="species-chip" href="${BASE}/cacatua.html"><div class="ic">🤍</div>Cacatúas</a>
      <a class="species-chip" href="${BASE}/loro-amazonico.html"><div class="ic">🟢</div>Amazonas</a>
      <a class="species-chip" href="${BASE}/eclectus.html"><div class="ic">🔴</div>Eclectus</a>
      <a class="species-chip" href="${BASE}/conuro.html"><div class="ic">💚</div>Conuros</a>
    </div>
    <h3>Loro gris africano (Yaco)</h3>
    <p>Los yacos son especialmente propensos a la deficiencia de vitamina A. Su dieta debe ser muy rica en alimentos con betacaroteno: zanahoria, pimiento rojo, batata dulce, calabaza y papaya. También necesitan calcio adicional. Base: pellets Harrison's + abundantes verduras + frutas variadas.</p>
    <h3>Guacamayos</h3>
    <p>Los guacamayos tienen un metabolismo que tolera más grasa que otras especies. Su dieta incluye frutos secos (nueces, almendras, anacardos) además de pellets, frutas y verduras. Son los que más variedad de frutas tropicales aprecian. Precisan porciones grandes: un guacamayo azul necesita aprox. 150g de comida diaria.</p>
    <h3>Cacatúas</h3>
    <p>Las cacatúas son muy propensas a la obesidad y a la carencia de vitamina A. Su dieta debe basarse en pellets bajos en grasa, con muchas verduras y pocas semillas grasas. Evitar especialmente el girasol como base. Las cacatúas sulphur-crested tienden a lipomas (tumores grasos) cuando comen demasiadas semillas.</p>
    <h3>Eclectus</h3>
    <p>El eclectus es único: tiene el tracto digestivo más largo entre los loros, diseñado para procesar grandes cantidades de frutas y verduras frescas. El 80% de su dieta debe ser fruta fresca y verduras. Nunca dar pellets coloreados artificialmente a eclectus: pueden causar problemas neurológicos por exceso de vitaminas sintéticas.</p>
  </section>

  <section class="section">
    <h2>Suplementos y minerales</h2>
    <p>Si la dieta está bien equilibrada con pellets de calidad, frutas y verduras variadas, en general no serán necesarios suplementos adicionales. Sin embargo, hay situaciones específicas donde los suplementos son recomendables: durante la muda (vitamina A y proteínas), en hembras en puesta (calcio), en loros en transición de semillas a pellets (vitaminas), y en aves convalecientes.</p>
    <p>El calcio puede aportarse de forma natural mediante hueso de sepia (siempre disponible en la jaula), col rizada, brócoli o copos de calcio. La vitamina D3 es esencial para la absorción del calcio: los loros criados en interior deben tener acceso a luz UVB o recibir suplementación.</p>
  </section>

  <section class="section">
    <h2>Rutina de alimentación diaria recomendada</h2>
    <p>Establecer una rutina estable de alimentación beneficia la salud digestiva del loro y facilita la detección de problemas (si el loro deja de comer, es señal de alerta). Aquí la rutina que seguimos en nuestro criadero para adultos:</p>
    <table class="specs-table"><thead><tr><th>Hora</th><th>Alimento</th><th>Notas</th></tr></thead><tbody>
      <tr><td>8:00</td><td>Fruta fresca + verduras</td><td>Retirar antes de 2h en verano, 3h en invierno</td></tr>
      <tr><td>12:00</td><td>Pellets + cereales cocidos opcionales</td><td>Pueden dejarse durante el día</td></tr>
      <tr><td>17:00</td><td>Semillas y frutos secos (pequeña cantidad)</td><td>Como complemento final del día</td></tr>
      <tr><td>Todo el día</td><td>Agua fresca</td><td>Cambiar al menos 2 veces al día en verano</td></tr>
    </tbody></table>
  </section>

  <section class="gallery-section">
    <h2>Galería: Alimentos y Nutrición para Loros</h2>
    <p>Imágenes de referencia de alimentos, presentaciones y rutinas de alimentación. Se preparan para recibir fotografías reales del criadero.</p>
    <div class="photo-grid">${galleryItems(foodPhotos,'es')}</div>
  </section>

  <section class="section">
    <h2>Preguntas frecuentes sobre alimentación</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">¿Qué es mejor para un loro: pellets o semillas?</div><div class="faq-a">Los pellets deben ser la base (50-60% de la dieta) por ser nutricionalmente completos. Las semillas son un buen complemento pero no deben ser la base, ya que son altas en grasa y bajas en vitaminas esenciales.</div></div>
      <div class="faq-item"><div class="faq-q">¿Qué frutas puede comer un loro?</div><div class="faq-a">Manzana (sin pepitas), pera, papaya, mango, kiwi, arándanos, frambuesas, granada, melocotón, melón, piña, naranja, mandarina y muchas más. Evitar siempre el aguacate, que es tóxico.</div></div>
      <div class="faq-item"><div class="faq-q">¿Cuántas veces al día hay que darle de comer?</div><div class="faq-a">Lo ideal son 2-3 tomas diarias. Mañana: fruta y verduras frescas. Mediodía: pellets. Tarde: pequeña cantidad de semillas. Los pellets pueden dejarse disponibles durante más tiempo. Retirar alimentos frescos antes de 3 horas en verano.</div></div>
      <div class="faq-item"><div class="faq-q">¿El chocolate es tóxico para los loros?</div><div class="faq-a">Sí, el chocolate es altamente tóxico. Contiene teobromina, que los loros no pueden metabolizar y puede causar convulsiones y muerte. Nunca dar chocolate, café, té ni bebidas con cafeína.</div></div>
      <div class="faq-item"><div class="faq-q">¿Pueden comer loros arroz o pasta?</div><div class="faq-a">Sí, el arroz cocido y la pasta integral cocida (sin sal ni aceite) son perfectamente seguros y nutritivos. También pueden comer quinoa cocida, maíz cocido y otros cereales. Son especialmente buenos en la época de muda.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>¿Tienes dudas sobre la dieta de tu loro?</h3>
    <p>Nuestro equipo de criadores expertos está disponible para orientarte sobre la mejor alimentación según la especie y edad de tu ave.</p>
    <a href="${BASE}/#contacto" class="btn-gold">Consultar por email</a>
    <a href="${BASE}/blog/como-alimentar-un-loro-bebe.html" class="btn-outline">Guía de bebés</a>
  </div>

  <section class="section">
    <h2>Artículos relacionados</h2>
    <div class="article-grid">
      <div class="article-card"><h3><a href="${BASE}/blog/como-alimentar-un-loro-bebe.html">Cómo alimentar un loro bebé</a></h3><p>Guía completa de papilla y handfeeding para pichones.</p></div>
      <div class="article-card"><h3><a href="${BASE}/cuidados-basicos-de-un-loro">Cuidados básicos de un loro</a></h3><p>Todo lo esencial para el bienestar diario de tu ave.</p></div>
      <div class="article-card"><h3><a href="${BASE}/blog/enfermedades-comunes-loros.html">Enfermedades comunes</a></h3><p>Síntomas y prevención de enfermedades frecuentes.</p></div>
      <div class="article-card"><h3><a href="${BASE}/juguetes-naturales-para-loros/">Juguetes naturales</a></h3><p>Enriquecimiento y estimulación para tu loro.</p></div>
    </div>
  </section>

</main>
<aside>
  ${contactFormES('comida')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Aves Disponibles</h4><ul>
    <li><a href="${BASE}/loro-gris-africano.html">🐦 Loro Gris Africano</a></li>
    <li><a href="${BASE}/guacamayos.html">🦜 Guacamayos</a></li>
    <li><a href="${BASE}/cacatua.html">🤍 Cacatúas</a></li>
    <li><a href="${BASE}/loro-amazonico.html">🟢 Amazonas</a></li>
    <li><a href="${BASE}/eclectus.html">🔴 Eclectus</a></li>
    <li><a href="${BASE}/aves-disponibles/">Ver todas las aves →</a></li>
  </ul></div>
  <div class="sidebar-card"><h4>Guías de Cuidados</h4><ul>
    <li><a href="${BASE}/cuidados-basicos-de-un-loro">Cuidados básicos</a></li>
    <li><a href="${BASE}/documentos-legales-para-adoptar-un-loro">Documentación CITES</a></li>
    <li><a href="${BASE}/blog/jaula-ideal-loro-tamano.html">Elegir la jaula ideal</a></li>
    <li><a href="${BASE}/blog/enfermedades-comunes-loros.html">Enfermedades comunes</a></li>
    <li><a href="${BASE}/juguetes-naturales-para-loros/">Juguetes naturales</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerES()}
${lightboxJS()}
</body></html>`;
  return html;
}

function generateComidaPT(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/pt/comida-para-papagaios/#webpage","url":"${BASE}/pt/comida-para-papagaios/","name":"Comida para Papagaios: Guia Completo de Alimentação 2026","description":"Guia especializado sobre a melhor comida para papagaios: sementes, peletes, frutas, verduras e alimentos proibidos. Escrito por criadores com 25+ anos de experiência.","inLanguage":"pt-PT"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"${BASE}/pt/"},{"@type":"ListItem","position":2,"name":"Comida para Papagaios","item":"${BASE}/pt/comida-para-papagaios/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Peletes ou sementes: o que é melhor para papagaios?","acceptedAnswer":{"@type":"Answer","text":"Os peletes devem ser a base da dieta (50-60%) por serem nutricionalmente completos. As sementes são um bom complemento mas não devem ser a base, pois são ricas em gordura e pobres em vitaminas essenciais."}},
{"@type":"Question","name":"Que frutas pode comer um papagaio?","acceptedAnswer":{"@type":"Answer","text":"Maçã (sem sementes), pera, papaia, manga, kiwi, mirtilos, framboesas, romã, pêssego, melão, ananás, laranja. Nunca dar abacate, que é tóxico para os papagaios."}},
{"@type":"Question","name":"O chocolate é tóxico para os papagaios?","acceptedAnswer":{"@type":"Answer","text":"Sim, o chocolate é altamente tóxico para papagaios. Contém teobromina que os psitacídeos não conseguem metabolizar. Nunca dar chocolate, café, chá ou bebidas com cafeína."}}
]}
]}</script>`;

  return `${head({lang:'pt',title:'Comida para Papagaios: Guia Completo de Alimentação 2026 | Paraisodeaves',desc:'Guia especializado sobre a melhor alimentação para papagaios: sementes, peletes, frutas e alimentos proibidos. Escrito por criadores com 25 anos de experiência em Espanha.',canonical:'/pt/comida-para-papagaios/',esPath:'/comida-para-loros/',ptPath:'/pt/comida-para-papagaios/',frPath:'/fr/nourriture-pour-perroquets/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navPT('Comida')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/pt/">Início</a><span>›</span><span>Comida para Papagaios</span></div></div>

<section class="page-hero">
  <div class="badge">🌿 Nutrição Aviar · Especialistas em Psitacídeos</div>
  <h1>Comida para Papagaios:<br>Guia Completo de Alimentação</h1>
  <p class="subtitle">Tudo o que precisa saber para alimentar corretamente o seu papagaio: sementes, peletes, frutas, verduras, suplementos e alimentos perigosos.</p>
  <div class="trust-pills">
    <span>✓ 25+ anos de experiência</span>
    <span>✓ Baseado em medicina aviar</span>
    <span>✓ Atualizado 2026</span>
    <span>✓ Para todas as espécies</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>A melhor comida para papagaios em 2026</h2>
    <p>Alimentar corretamente um papagaio é um dos pilares mais importantes da sua saúde e longevidade. Um papagaio bem nutrido pode viver décadas, enquanto uma dieta deficiente encurta a sua vida e gera problemas de saúde crónicos. No Paraíso de Aves temos mais de 25 anos a estudar e aperfeiçoar a alimentação das nossas aves, trabalhando lado a lado com veterinários especializados em medicina aviar.</p>
    <p>A alimentação do papagaio moderno evoluiu muito. Antigamente pensava-se que bastava uma mistura de sementes, mas a ciência aviar atual demonstra que os papagaios precisam de uma dieta tão variada e equilibrada como a nossa. A chave está em entender o que comem na natureza e replicá-lo de forma segura em cativeiro.</p>
    <div class="highlight-box">
      <strong>Regra de ouro:</strong> A dieta ideal de um papagaio deve ser composta por 50-60% de peletes formulados, 30-35% de frutas e verduras frescas, e os restantes 10-15% de sementes, frutos secos e cereais cozidos como complemento.
    </div>
    <h3>Tipos de alimentos para papagaios</h3>
    <p>Podemos classificar os alimentos para papagaios em quatro categorias principais: peletes (a base nutricional), alimentos frescos (frutas e verduras), sementes e frutos secos (como complemento, não base), e suplementos e minerais (cálcio, vitaminas). Cada categoria tem uma função específica e nenhuma deve faltar numa dieta completa.</p>
  </section>

  <section class="section">
    <h2>Peletes: a base nutricional indispensável</h2>
    <p>Os peletes ou grânulos formulados representam hoje o avanço mais importante na alimentação de psitacídeos em cativeiro. Ao contrário das sementes, os peletes são especificamente concebidos para cobrir as necessidades nutricionais completas do papagaio, com um equilíbrio ótimo de proteínas, hidratos de carbono, gorduras, vitaminas e minerais.</p>
    <p>Existem peletes para diferentes tamanhos: mini (para periquitos, inseparáveis e periquitos-da-austrália), médios (para amazonas, papagaios cinzentos e cacatuas) e grandes (para araras e eclectus). A textura e o tamanho devem adaptar-se à espécie.</p>
    <h3>Marcas de peletes recomendadas para Portugal</h3>
    <p>As marcas de referência disponíveis em Portugal incluem: <strong>Harrison's Bird Foods</strong> (certificada orgânica, a referência mundial), <strong>Roudybush</strong> (fórmula cientificamente validada), <strong>Versele-Laga NutriBird</strong> (amplamente disponível) e <strong>ZuPreem</strong> (boa relação qualidade-preço). A transição de sementes para peletes requer paciência: pode demorar semanas ou meses.</p>
  </section>

  <section class="section">
    <h2>Sementes para papagaios: complemento, não base</h2>
    <p>As sementes são o alimento que a maioria associa aos papagaios, e embora sejam válidas na dieta, não devem ser a sua base principal. O problema das sementes é o seu alto teor em gordura, especialmente as sementes de girassol e o cártamo, e o baixo teor em vitaminas essenciais como a A e a D3.</p>
    <p>Uma dieta baseada principalmente em sementes leva a deficiências nutricionais crónicas, especialmente de vitamina A, que se manifestam como problemas respiratórios, infeções frequentes, problemas nas penas e lesões no trato digestivo.</p>
    <h3>Sementes recomendadas e frequência</h3>
    <table class="specs-table"><thead><tr><th>Semente</th><th>Frequência</th><th>Espécies principais</th></tr></thead><tbody>
      <tr><td>Milheto</td><td>Diário (pequenas quantidades)</td><td>Periquitos, inseparáveis</td></tr>
      <tr><td>Alpiste</td><td>Vários dias/semana</td><td>Periquitos, ninfas</td></tr>
      <tr><td>Aveia</td><td>Vários dias/semana</td><td>Todas as espécies</td></tr>
      <tr><td>Cártamo</td><td>2-3 vezes/semana</td><td>Papagaios médios e grandes</td></tr>
      <tr><td>Girassol</td><td>Ocasional (petisco)</td><td>Todas (com moderação)</td></tr>
      <tr><td>Abóbora</td><td>Vários dias/semana</td><td>Araras, papagaios cinzentos</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Frutas e verduras: o arco-íris no comedouro</h2>
    <p>As frutas e verduras frescas são essenciais na dieta de qualquer papagaio. Fornecem vitaminas, minerais, antioxidantes e fibras que não se obtêm de sementes nem de peletes na mesma proporção. O objetivo é oferecer variedade e cor: quanto mais colorido for o prato, mais completo é nutricionalmente.</p>
    <h3>Frutas seguras para papagaios</h3>
    <p>A maioria das frutas é segura para papagaios. As mais recomendadas são: maçã (sem sementes), pera, papaia, manga, kiwi, melancia, melão, laranja, tangerina, ananás, framboesas, mirtilos, amoras, romã, pêssego, nectarina, figos e tâmaras.</p>
    <div class="highlight-box"><strong>⚠ Importante:</strong> Nunca dar abacate a um papagaio. Contém persina, uma toxina letal para os psitacídeos. Também não dar sementes de maçã, pera, pêssego nem cerejas.</div>
    <h3>Verduras essenciais para papagaios</h3>
    <p>As verduras mais recomendadas são: cenoura (rica em betacaroteno), pimento vermelho e amarelo (vitamina C e betacaroteno), brócolos, couve-galega (kale), abóbora, espinafres (com moderação), ervilhas, milho doce, feijão-verde, aipo e pepino.</p>
  </section>

  <section class="section">
    <h2>Alimentos tóxicos e proibidos para papagaios</h2>
    <table class="specs-table"><thead><tr><th>Alimento</th><th>Toxicidade</th><th>Efeito</th></tr></thead><tbody>
      <tr><td>Abacate</td><td>🔴 LETAL</td><td>Persina: falência cardíaca e respiratória</td></tr>
      <tr><td>Chocolate</td><td>🔴 LETAL</td><td>Teobromina: falência do sistema nervoso</td></tr>
      <tr><td>Cebola e alho</td><td>🔴 MUITO TÓXICO</td><td>Anemia hemolítica</td></tr>
      <tr><td>Café / Cafeína</td><td>🔴 TÓXICO</td><td>Arritmias cardíacas</td></tr>
      <tr><td>Álcool</td><td>🔴 LETAL mesmo em quantidades mínimas</td><td>Falência orgânica</td></tr>
      <tr><td>Sal</td><td>🟠 PREJUDICIAL</td><td>Desidratação e falência renal</td></tr>
      <tr><td>Açúcar refinado</td><td>🟠 PREJUDICIAL</td><td>Obesidade e candidíase</td></tr>
      <tr><td>Leite / laticínios</td><td>🟡 EVITAR</td><td>Os papagaios são intolerantes à lactose</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Rotina de alimentação diária recomendada</h2>
    <table class="specs-table"><thead><tr><th>Hora</th><th>Alimento</th><th>Notas</th></tr></thead><tbody>
      <tr><td>8:00</td><td>Fruta fresca + verduras</td><td>Retirar antes de 2h no verão, 3h no inverno</td></tr>
      <tr><td>12:00</td><td>Peletes + cereais cozidos opcionais</td><td>Podem ficar disponíveis durante o dia</td></tr>
      <tr><td>17:00</td><td>Sementes e frutos secos (pequena quantidade)</td><td>Como complemento final do dia</td></tr>
      <tr><td>Todo o dia</td><td>Água fresca</td><td>Mudar pelo menos 2 vezes por dia no verão</td></tr>
    </tbody></table>
  </section>

  <section class="gallery-section">
    <h2>Galeria: Alimentação e Nutrição para Papagaios</h2>
    <div class="photo-grid">${galleryItems(foodPhotos,'pt')}</div>
  </section>

  <section class="section">
    <h2>Perguntas frequentes sobre alimentação</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Peletes ou sementes: o que é melhor?</div><div class="faq-a">Os peletes devem ser a base (50-60%) por serem nutricionalmente completos. As sementes são um bom complemento mas não devem ser a base, pois são ricas em gordura e pobres em vitaminas essenciais.</div></div>
      <div class="faq-item"><div class="faq-q">Que frutas pode comer um papagaio?</div><div class="faq-a">Maçã (sem sementes), pera, papaia, manga, kiwi, mirtilos, framboesas, romã, pêssego, melão, ananás. Nunca dar abacate, que é tóxico.</div></div>
      <div class="faq-item"><div class="faq-q">O chocolate é tóxico para papagaios?</div><div class="faq-a">Sim, o chocolate é altamente tóxico. Contém teobromina que os papagaios não conseguem metabolizar. Nunca dar chocolate, café, chá nem bebidas com cafeína.</div></div>
      <div class="faq-item"><div class="faq-q">Podem os papagaios comer arroz ou massa?</div><div class="faq-a">Sim, arroz cozido e massa integral cozida (sem sal nem azeite) são seguros e nutritivos. Também podem comer quinoa, milho cozido e outros cereais. São especialmente bons na época de muda.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Tem dúvidas sobre a dieta do seu papagaio?</h3>
    <p>A nossa equipa de criadores especializados está disponível para o orientar sobre a melhor alimentação para a espécie e idade da sua ave.</p>
    <a href="${BASE}/pt/contacto/" class="btn-gold">Consultar por email</a>
  </div>

</main>
<aside>
  ${contactFormPT('comida')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Espécies Disponíveis</h4><ul>
    <li><a href="${BASE}/pt/papagaio-cinzento/">🐦 Papagaio Cinzento</a></li>
    <li><a href="${BASE}/pt/arara-a-venda/">🦜 Araras</a></li>
    <li><a href="${BASE}/pt/cacatua-a-venda/">🤍 Cacatuas</a></li>
    <li><a href="${BASE}/pt/amazona-a-venda/">🟢 Amazonas</a></li>
    <li><a href="${BASE}/pt/papagaio-eclectus/">🔴 Eclectus</a></li>
    <li><a href="${BASE}/pt/papagaios-disponiveis/">Ver todos →</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerPT()}
${lightboxJS()}
</body></html>`;
}

function generateComidaFR(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/fr/nourriture-pour-perroquets/#webpage","url":"${BASE}/fr/nourriture-pour-perroquets/","name":"Nourriture pour Perroquets: Guide Complet d'Alimentation 2026","description":"Guide expert sur la meilleure nourriture pour perroquets: graines, granulés, fruits, légumes et aliments interdits. Rédigé par des éleveurs avec 25+ ans d'expérience.","inLanguage":"fr-FR"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},{"@type":"ListItem","position":2,"name":"Nourriture pour Perroquets","item":"${BASE}/fr/nourriture-pour-perroquets/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Granulés ou graines: que choisir pour un perroquet?","acceptedAnswer":{"@type":"Answer","text":"Les granulés doivent être la base de l'alimentation (50-60%) car ils sont nutritionnellement complets. Les graines sont un bon complément mais pas une base, car elles sont riches en graisses et pauvres en vitamines essentielles."}},
{"@type":"Question","name":"Quels fruits peut manger un perroquet?","acceptedAnswer":{"@type":"Answer","text":"Pomme (sans pépins), poire, papaye, mangue, kiwi, myrtilles, framboises, grenade, pêche, melon, ananas, orange, mandarine. Ne jamais donner d'avocat, qui est toxique pour les perroquets."}},
{"@type":"Question","name":"Le chocolat est-il toxique pour les perroquets?","acceptedAnswer":{"@type":"Answer","text":"Oui, le chocolat est très toxique pour les perroquets. Il contient de la théobromine que les psittacidés ne peuvent pas métaboliser. Ne jamais donner de chocolat, de café, de thé ni de boissons contenant de la caféine."}}
]}
]}</script>`;

  return `${head({lang:'fr',title:'Nourriture pour Perroquets: Guide Complet d\'Alimentation 2026 | Paraisodeaves',desc:'Guide expert sur la meilleure nourriture pour perroquets: graines, granulés, fruits, légumes et aliments interdits. Rédigé par des éleveurs avec 25+ ans d\'expérience en Espagne.',canonical:'/fr/nourriture-pour-perroquets/',esPath:'/comida-para-loros/',ptPath:'/pt/comida-para-papagaios/',frPath:'/fr/nourriture-pour-perroquets/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navFR('Nourriture')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/fr/">Accueil</a><span>›</span><span>Nourriture pour Perroquets</span></div></div>

<section class="page-hero">
  <div class="badge">🌿 Nutrition Aviaire · Spécialistes en Psittacidés</div>
  <h1>Nourriture pour Perroquets:<br>Guide Complet d'Alimentation</h1>
  <p class="subtitle">Tout ce que vous devez savoir pour nourrir correctement votre perroquet: graines, granulés, fruits, légumes, compléments et aliments dangereux.</p>
  <div class="trust-pills">
    <span>✓ 25+ ans d'expérience</span>
    <span>✓ Basé sur la médecine aviaire</span>
    <span>✓ Mis à jour 2026</span>
    <span>✓ Pour toutes les espèces</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>La meilleure nourriture pour perroquets en 2026</h2>
    <p>Nourrir correctement un perroquet est l'un des piliers les plus importants de sa santé et de sa longévité. Un perroquet bien nourri peut vivre des décennies, tandis qu'une alimentation déficiente raccourcit sa vie et génère des problèmes de santé chroniques. Chez Paraíso de Aves, nous avons plus de 25 ans d'expérience dans l'étude et le perfectionnement de l'alimentation de nos oiseaux, en collaboration avec des vétérinaires spécialisés en médecine aviaire.</p>
    <p>L'alimentation du perroquet moderne a beaucoup évolué. Autrefois, on pensait qu'un simple mélange de graines suffisait, mais la science aviaire actuelle démontre que les perroquets ont besoin d'un régime aussi varié et équilibré que le nôtre. La clé est de comprendre ce qu'ils mangent dans la nature et de le reproduire de manière sûre en captivité.</p>
    <div class="highlight-box">
      <strong>Règle d'or:</strong> Le régime idéal d'un perroquet doit être composé à 50-60% de granulés formulés, à 30-35% de fruits et légumes frais, et les 10-15% restants de graines, noix et céréales cuites comme complément.
    </div>
  </section>

  <section class="section">
    <h2>Granulés: la base nutritionnelle indispensable</h2>
    <p>Les granulés représentent aujourd'hui l'avancée la plus importante dans l'alimentation des psittacidés en captivité. Contrairement aux graines, les granulés sont spécifiquement conçus pour couvrir les besoins nutritionnels complets du perroquet, avec un équilibre optimal de protéines, glucides, graisses, vitamines et minéraux.</p>
    <p>Il existe des granulés pour différentes tailles: mini (pour perruches, inséparables et perruches calopsittes), médium (pour amazones, gris du Gabon et cacatoès) et large (pour aras et éclectus). La texture et la taille doivent être adaptées à l'espèce.</p>
    <h3>Marques de granulés recommandées disponibles en France</h3>
    <p>Les marques de référence disponibles en France incluent: <strong>Harrison's Bird Foods</strong> (certifiée biologique, la référence mondiale), <strong>Roudybush</strong> (formule scientifiquement validée), <strong>Versele-Laga NutriBird</strong> (largement disponible) et <strong>ZuPreem</strong> (bon rapport qualité-prix). La transition des graines vers les granulés demande de la patience: cela peut prendre des semaines ou des mois.</p>
  </section>

  <section class="section">
    <h2>Fruits et légumes: l'arc-en-ciel dans la mangeoire</h2>
    <p>Les fruits et légumes frais sont essentiels dans le régime de tout perroquet. Ils apportent des vitamines, minéraux, antioxydants et fibres qu'on ne peut pas obtenir des graines ni des granulés dans la même proportion. L'objectif est d'offrir variété et couleur: plus le plat est coloré, plus il est complet nutritionnellement.</p>
    <h3>Fruits sûrs pour les perroquets</h3>
    <p>La plupart des fruits sont sûrs pour les perroquets. Les plus recommandés sont: pomme (sans pépins), poire, papaye, mangue, kiwi, pastèque, melon, orange, mandarine, ananas, framboises, myrtilles, mûres, grenade, pêche et figues.</p>
    <div class="highlight-box"><strong>⚠ Important:</strong> Ne jamais donner d'avocat à un perroquet. Il contient de la persin, une toxine létale pour les psittacidés. Ne pas donner non plus les pépins de pomme, poire, pêche ni cerises.</div>
    <h3>Légumes essentiels pour perroquets</h3>
    <p>Les légumes les plus recommandés sont: carotte (riche en bêtacarotène), poivron rouge et jaune (vitamine C et bêtacarotène), brocoli, chou kale, courge, épinards (avec modération), petits pois, maïs doux, haricots verts, céleri et concombre.</p>
  </section>

  <section class="section">
    <h2>Aliments toxiques et interdits pour les perroquets</h2>
    <table class="specs-table"><thead><tr><th>Aliment</th><th>Toxicité</th><th>Effet</th></tr></thead><tbody>
      <tr><td>Avocat</td><td>🔴 LÉTAL</td><td>Persin: défaillance cardiaque et respiratoire</td></tr>
      <tr><td>Chocolat</td><td>🔴 LÉTAL</td><td>Théobromine: défaillance du système nerveux</td></tr>
      <tr><td>Oignon et ail</td><td>🔴 TRÈS TOXIQUE</td><td>Anémie hémolytique</td></tr>
      <tr><td>Café / Caféine</td><td>🔴 TOXIQUE</td><td>Arythmies cardiaques</td></tr>
      <tr><td>Alcool</td><td>🔴 LÉTAL même en quantités minimales</td><td>Défaillance organique</td></tr>
      <tr><td>Sel</td><td>🟠 NOCIF</td><td>Déshydratation et insuffisance rénale</td></tr>
      <tr><td>Sucre raffiné</td><td>🟠 NOCIF</td><td>Obésité et candidose</td></tr>
      <tr><td>Lait / produits laitiers</td><td>🟡 À ÉVITER</td><td>Les perroquets sont intolérants au lactose</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Alimentation spécifique par espèce</h2>
    <p>Bien que tous les perroquets partagent des besoins fondamentaux, chaque espèce a ses particularités nutritionnelles propres.</p>
    <h3>Gris du Gabon</h3>
    <p>Les gris du Gabon sont particulièrement sujets à la carence en vitamine A. Leur régime doit être très riche en aliments contenant du bêtacarotène: carotte, poivron rouge, patate douce, courge et papaye. Ils ont également besoin de calcium supplémentaire.</p>
    <h3>Aras</h3>
    <p>Les aras ont un métabolisme qui tolère plus de graisses que d'autres espèces. Leur alimentation comprend des noix (noix, amandes, noix de cajou) en plus des granulés, fruits et légumes. Ce sont les espèces qui apprécient le plus la variété de fruits tropicaux.</p>
    <h3>Cacatoès</h3>
    <p>Les cacatoès sont très sujets à l'obésité et à la carence en vitamine A. Leur régime doit être basé sur des granulés pauvres en graisses, avec beaucoup de légumes et peu de graines grasses.</p>
    <h3>Éclectus</h3>
    <p>L'éclectus est unique: il a le tractus digestif le plus long parmi les perroquets, conçu pour traiter de grandes quantités de fruits et légumes frais. 80% de son alimentation doit être des fruits frais et des légumes. Ne jamais donner de granulés colorés artificiellement à un éclectus.</p>
  </section>

  <section class="gallery-section">
    <h2>Galerie: Alimentation et Nutrition pour Perroquets</h2>
    <div class="photo-grid">${galleryItems(foodPhotos,'fr')}</div>
  </section>

  <section class="section">
    <h2>Questions fréquentes sur l'alimentation</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Granulés ou graines: que choisir pour un perroquet?</div><div class="faq-a">Les granulés doivent être la base (50-60%) car ils sont nutritionnellement complets. Les graines sont un bon complément mais pas une base, car elles sont riches en graisses et pauvres en vitamines essentielles.</div></div>
      <div class="faq-item"><div class="faq-q">Quels fruits peut manger un perroquet?</div><div class="faq-a">Pomme (sans pépins), poire, papaye, mangue, kiwi, myrtilles, framboises, grenade, pêche, melon. Ne jamais donner d'avocat, qui est toxique.</div></div>
      <div class="faq-item"><div class="faq-q">Le chocolat est-il toxique pour les perroquets?</div><div class="faq-a">Oui, le chocolat est hautement toxique. Il contient de la théobromine que les perroquets ne peuvent pas métaboliser. Ne jamais donner de chocolat, de café ni de boissons caféinées.</div></div>
      <div class="faq-item"><div class="faq-q">Les perroquets peuvent-ils manger du riz ou des pâtes?</div><div class="faq-a">Oui, le riz cuit et les pâtes complètes cuites (sans sel ni huile) sont parfaitement sûrs et nutritifs. Ils peuvent aussi manger du quinoa, du maïs cuit et d'autres céréales cuites.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Vous avez des questions sur l'alimentation de votre perroquet?</h3>
    <p>Notre équipe d'éleveurs spécialisés est disponible pour vous orienter sur la meilleure alimentation pour votre oiseau.</p>
    <a href="${BASE}/fr/contact/" class="btn-gold">Nous contacter</a>
  </div>

</main>
<aside>
  ${contactFormFR('nourriture')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Espèces Disponibles</h4><ul>
    <li><a href="${BASE}/fr/perroquet-gris-du-gabon/">🐦 Gris du Gabon</a></li>
    <li><a href="${BASE}/fr/ara-hyacinthe/">🦜 Ara Hyacinthe</a></li>
    <li><a href="${BASE}/fr/ara-bleu-et-jaune/">🦜 Ara Bleu et Jaune</a></li>
    <li><a href="${BASE}/fr/cacatoes-huppe-jaune/">🤍 Cacatoès</a></li>
    <li><a href="${BASE}/fr/eclectus/">🔴 Éclectus</a></li>
    <li><a href="${BASE}/fr/perroquets-disponibles/">Voir tous →</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerFR()}
${lightboxJS()}
</body></html>`;
}

/* ════════════════════════════════════════════════════
   TOPIC 2 — AVES DISPONIBLES / PAPAGAIOS DISPONÍVEIS / PERROQUETS DISPONIBLES
════════════════════════════════════════════════════ */

const avesDisponiblesPhotos = [
  {slug:'yaco-disponible-espana',icon:'🐦',altEs:'Loro gris africano (Yaco) disponible en España',altPt:'Papagaio cinzento africano disponível em Espanha',altFr:'Perroquet gris du Gabon disponible en Espagne',captionEs:'Yaco pichón criado a mano, socializado desde pequeño',captionPt:'Filhote de papagaio cinzento criado à mão, socializado desde cedo',captionFr:'Oisillon gris du Gabon élevé à la main, socialisé dès le plus jeune âge'},
  {slug:'guacamayo-azul-amarillo-disponible',icon:'🦜',altEs:'Guacamayo azul y amarillo disponible para adopción',altPt:'Arara azul e amarela disponível para adoção',altFr:'Ara bleu et jaune disponible à l\'adoption',captionEs:'Guacamayo azul y amarillo pichón con documentación CITES',captionPt:'Filhote de arara azul e amarela com documentação CITES',captionFr:'Oisillon ara bleu et jaune avec documentation CITES'},
  {slug:'guacamayo-jacinto-disponible',icon:'💙',altEs:'Guacamayo jacinto disponible en España',altPt:'Arara jacinto disponível em Espanha',altFr:'Ara hyacinthe disponible en Espagne',captionEs:'Guacamayo jacinto — la especie más grande. Disponibilidad bajo consulta',captionPt:'Arara jacinto — a maior espécie. Disponibilidade sob consulta',captionFr:'Ara hyacinthe — la plus grande espèce. Disponibilité sur demande'},
  {slug:'cacatua-criada-a-mano',icon:'🤍',altEs:'Cacatúa criada a mano disponible en el criadero',altPt:'Cacatua criada à mão disponível no criadeiro',altFr:'Cacatoès élevé à la main disponible dans l\'élevage',captionEs:'Cacatúa pichón criada a mano — temperamento dulce y sociable',captionPt:'Filhote de cacatua criada à mão — temperamento doce e sociável',captionFr:'Oisillon cacatoès élevé à la main — tempérament doux et sociable'},
  {slug:'eclectus-macho-disponible',icon:'🟢',altEs:'Loro Eclectus macho disponible — plumaje verde brillante',altPt:'Eclectus macho disponível — plumagem verde brilhante',altFr:'Éclectus mâle disponible — plumage vert brillant',captionEs:'Eclectus macho con plumaje verde brillante — especie única dimórfica',captionPt:'Eclectus macho com plumagem verde brilhante — espécie única dimórfica',captionFr:'Éclectus mâle au plumage vert brillant — espèce unique dimorphique'},
  {slug:'eclectus-hembra-disponible',icon:'🔴',altEs:'Loro Eclectus hembra disponible — plumaje rojo y azul',altPt:'Eclectus fêmea disponível — plumagem vermelha e azul',altFr:'Éclectus femelle disponible — plumage rouge et bleu',captionEs:'Eclectus hembra con plumaje rojo y azul — aspecto completamente diferente al macho',captionPt:'Eclectus fêmea com plumagem vermelha e azul — aspeto completamente diferente do macho',captionFr:'Éclectus femelle au plumage rouge et bleu — apparence totalement différente du mâle'},
  {slug:'loro-amazonico-disponible',icon:'🟡',altEs:'Loro amazónico disponible — frente azul socializado',altPt:'Papagaio amazónico disponível — frente azul socializado',altFr:'Amazone disponible — à front bleu socialisée',captionEs:'Amazona de frente azul criada a mano — excelente aprendiz del habla',captionPt:'Amazona de frente azul criada à mão — excelente aprendiz da fala',captionFr:'Amazone à front bleu élevée à la main — excellente apprenante du langage'},
  {slug:'conuro-sol-disponible',icon:'☀️',altEs:'Conuro del sol disponible — colores vibrantes',altPt:'Conuro-do-sol disponível — cores vibrantes',altFr:'Conure soleil disponible — couleurs vibrantes',captionEs:'Conuro del sol con colores anaranjados y amarillos brillantes',captionPt:'Conuro-do-sol com cores alaranjadas e amarelas brilhantes',captionFr:'Conure soleil aux couleurs orange et jaune éclatantes'},
  {slug:'guacamayo-escarlata-disponible',icon:'🔴',altEs:'Guacamayo escarlata disponible — tricolor espectacular',altPt:'Arara escarlate disponível — tricolor espetacular',altFr:'Ara macao disponible — tricolore spectaculaire',captionEs:'Guacamayo escarlata pichón — rojo, azul y amarillo intenso',captionPt:'Filhote de arara escarlate — vermelho, azul e amarelo intenso',captionFr:'Oisillon ara macao — rouge, bleu et jaune intense'},
  {slug:'pichon-papillero-mano',icon:'👐',altEs:'Pichón en handfeeding — proceso de crianza a mano',altPt:'Filhote em handfeeding — processo de criação à mão',altFr:'Oisillon en handfeeding — processus d\'élevage à la main',captionEs:'Proceso de handfeeding: papilla especializada cada pocas horas',captionPt:'Processo de handfeeding: papa especializada a cada poucas horas',captionFr:'Processus de handfeeding: bouillie spécialisée toutes les quelques heures'},
  {slug:'anillado-cites-loro',icon:'📋',altEs:'Anilla de identificación CITES en pata del loro',altPt:'Anel de identificação CITES na pata do papagaio',altFr:'Bague d\'identification CITES sur la patte du perroquet',captionEs:'Anilla CITES — identificación oficial para transporte legal en Europa',captionPt:'Anel CITES — identificação oficial para transporte legal na Europa',captionFr:'Bague CITES — identification officielle pour transport légal en Europe'},
  {slug:'revision-veterinaria-loro',icon:'🏥',altEs:'Revisión veterinaria completa antes de la entrega',altPt:'Revisão veterinária completa antes da entrega',altFr:'Examen vétérinaire complet avant la livraison',captionEs:'Cada ave sale con certificado veterinario de salud vigente',captionPt:'Cada ave sai com certificado veterinário de saúde válido',captionFr:'Chaque oiseau part avec un certificat vétérinaire de santé valide'},
  {slug:'transporte-seguro-loro-caja',icon:'📦',altEs:'Transporte seguro de loros en caja IATA homologada',altPt:'Transporte seguro de papagaios em caixa IATA homologada',altFr:'Transport sécurisé des perroquets en boîte IATA homologuée',captionEs:'Envío con caja IATA: climatizada, ventilada y con comida y agua',captionPt:'Envio com caixa IATA: climatizada, ventilada e com comida e água',captionFr:'Livraison avec boîte IATA: climatisée, ventilée et avec nourriture et eau'},
  {slug:'socializacion-temprana-pichon',icon:'🤝',altEs:'Socialización temprana de pichones de loro',altPt:'Socialização precoce de filhotes de papagaio',altFr:'Socialisation précoce des oisillons perroquets',captionEs:'Socialización desde la primera semana: clave para un loro confiado y sociable',captionPt:'Socialização desde a primeira semana: chave para um papagaio confiante e sociável',captionFr:'Socialisation dès la première semaine: clé pour un perroquet confiant et sociable'},
  {slug:'jaula-criadero-loros',icon:'🏠',altEs:'Jaulas espaciosas del criadero para el desarrollo óptimo',altPt:'Jaulas espaçosas do criadeiro para o desenvolvimento ótimo',altFr:'Volières spacieuses de l\'élevage pour un développement optimal',captionEs:'Jaulas amplias con enriquecimiento: fundamental para el desarrollo psicológico',captionPt:'Jaulas amplas com enriquecimento: fundamental para o desenvolvimento psicológico',captionFr:'Volières spacieuses avec enrichissement: fondamental pour le développement psychologique'},
  {slug:'yaco-adulto-hablador',icon:'💬',altEs:'Loro gris africano adulto con capacidad de habla demostrada',altPt:'Papagaio cinzento adulto com capacidade de fala demonstrada',altFr:'Perroquet gris adulte avec capacité de parole démontrée',captionEs:'Yacos adultos: los mejores habladores del reino animal',captionPt:'Papagaios cinzentos adultos: os melhores falantes do reino animal',captionFr:'Gris du Gabon adultes: les meilleurs parleurs du règne animal'},
  {slug:'guacamayo-azul-plumaje-detalle',icon:'🔵',altEs:'Detalle del plumaje azul y amarillo del guacamayo',altPt:'Detalhe da plumagem azul e amarela da arara',altFr:'Détail du plumage bleu et jaune de l\'ara',captionEs:'El guacamayo azul y amarillo muestra su plumaje en todo su esplendor',captionPt:'A arara azul e amarela mostra a sua plumagem em todo o seu esplendor',captionFr:'L\'ara bleu et jaune montre son plumage dans toute sa splendeur'},
  {slug:'cacatua-ninfa-carolina',icon:'🟡',altEs:'Cacatúa ninfa/carolina — ideal para principiantes',altPt:'Cacatua-ninfa/carolina — ideal para principiantes',altFr:'Calopsitte élevée/carolina — idéale pour les débutants',captionEs:'Cacatúa ninfa (Carolina): el loro ideal para familias y principiantes',captionPt:'Cacatua-ninfa (Carolina): o papagaio ideal para famílias e principiantes',captionFr:'Calopsitte élevée: le perroquet idéal pour les familles et les débutants'},
  {slug:'huevos-fertiles-incubacion',icon:'🥚',altEs:'Huevos fértiles de loro para incubación — CITES incluido',altPt:'Ovos férteis de papagaio para incubação — CITES incluído',altFr:'Oeufs fécondés de perroquet pour incubation — CITES inclus',captionEs:'Huevos fértiles con CITES: para criadores registrados',captionPt:'Ovos férteis com CITES: para criadores registados',captionFr:'Oeufs fécondés avec CITES: pour éleveurs enregistrés'},
  {slug:'loro-con-familia-socializado',icon:'👨‍👩‍👧',altEs:'Loro socializado con familia — temperamento equilibrado',altPt:'Papagaio socializado com família — temperamento equilibrado',altFr:'Perroquet socialisé avec une famille — tempérament équilibré',captionEs:'Loros criados para convivir en familia: equilibrados y afectuosos',captionPt:'Papagaios criados para conviver em família: equilibrados e afetuosos',captionFr:'Perroquets élevés pour vivre en famille: équilibrés et affectueux'},
  {slug:'amazon-frente-azul-joven',icon:'🟩',altEs:'Amazona de frente azul joven — ideal para el habla',altPt:'Amazona de frente azul jovem — ideal para a fala',altFr:'Amazone à front bleu jeune — idéale pour la parole',captionEs:'Amazona de frente azul joven: aprende palabras y melodías con facilidad',captionPt:'Amazona de frente azul jovem: aprende palavras e melodias com facilidade',captionFr:'Amazone à front bleu jeune: apprend les mots et mélodies facilement'},
  {slug:'conuro-jenday-colores',icon:'🌈',altEs:'Conuro jenday — colores vibrantes y carácter juguetón',altPt:'Conuro-jenday — cores vibrantes e carácter brincalhão',altFr:'Conure de Jenday — couleurs vives et caractère joueur',captionEs:'Conuro jenday con sus colores característicos amarillo, verde y naranja',captionPt:'Conuro-jenday com as suas cores características amarelo, verde e laranja',captionFr:'Conure de Jenday avec ses couleurs caractéristiques jaune, vert et orange'},
  {slug:'loro-pesado-veterinario',icon:'⚖️',altEs:'Peso y control de salud veterinario antes de entrega',altPt:'Pesagem e controlo de saúde veterinário antes da entrega',altFr:'Pesée et contrôle de santé vétérinaire avant livraison',captionEs:'Control de peso semanal: fundamental para detectar problemas de salud a tiempo',captionPt:'Controlo de peso semanal: fundamental para detetar problemas de saúde a tempo',captionFr:'Contrôle du poids hebdomadaire: fondamental pour détecter les problèmes de santé'},
  {slug:'documentacion-cites-carpeta',icon:'📁',altEs:'Documentación CITES completa para cada ave',altPt:'Documentação CITES completa para cada ave',altFr:'Documentation CITES complète pour chaque oiseau',captionEs:'Carpeta completa: CITES, certificado veterinario, anilla, guía de cuidados',captionPt:'Pasta completa: CITES, certificado veterinário, anel, guia de cuidados',captionFr:'Dossier complet: CITES, certificat vétérinaire, bague, guide de soins'},
  {slug:'guacamayo-jacinto-primer-plano',icon:'💙',altEs:'Guacamayo jacinto de primer plano — azul cobalto intenso',altPt:'Arara jacinto em primeiro plano — azul cobalto intenso',altFr:'Ara hyacinthe en gros plan — bleu cobalt intense',captionEs:'El guacamayo jacinto es el loro más grande del mundo — hasta 100cm',captionPt:'A arara jacinto é o maior papagaio do mundo — até 100cm',captionFr:'L\'ara hyacinthe est le plus grand perroquet du monde — jusqu\'à 100cm'},
  {slug:'loro-en-transportin-viaje',icon:'🚐',altEs:'Loro en transportín seguro para viaje de entrega',altPt:'Papagaio em transportador seguro para viagem de entrega',altFr:'Perroquet dans un transporteur sécurisé pour la livraison',captionEs:'Transportín homologado para el viaje: ventilado y con comida y agua',captionPt:'Transportador homologado para a viagem: ventilado e com comida e água',captionFr:'Transporteur homologué pour le voyage: ventilé et avec nourriture et eau'},
  {slug:'proceso-adopcion-firma',icon:'✍️',altEs:'Proceso de adopción — firma del contrato de responsabilidad',altPt:'Processo de adoção — assinatura do contrato de responsabilidade',altFr:'Processus d\'adoption — signature du contrat de responsabilité',captionEs:'Contrato de adopción responsable: garantiza el bienestar del ave',captionPt:'Contrato de adoção responsável: garante o bem-estar da ave',captionFr:'Contrat d\'adoption responsable: garantit le bien-être de l\'oiseau'},
  {slug:'loros-varios-criadero',icon:'🐦',altEs:'Vista general del criadero con diferentes especies de loros',altPt:'Vista geral do criadeiro com diferentes espécies de papagaios',altFr:'Vue générale de l\'élevage avec différentes espèces de perroquets',captionEs:'Nuestro criadero aloja diferentes especies criadas en instalaciones óptimas',captionPt:'O nosso criadeiro aloja diferentes espécies em instalações ótimas',captionFr:'Notre élevage accueille différentes espèces dans des installations optimales'},
  {slug:'cacatua-sulfurea-disponible',icon:'🟡',altEs:'Cacatúa de cresta amarilla disponible en el criadero',altPt:'Cacatua-de-crista-amarela disponível no criadeiro',altFr:'Cacatoès à huppe jaune disponible dans l\'élevage',captionEs:'Cacatúa sulphur-crested: personalidad fuerte e inteligencia excepcional',captionPt:'Cacatua-de-crista-amarela: personalidade forte e inteligência excecional',captionFr:'Cacatoès à huppe jaune: forte personnalité et intelligence exceptionnelle'},
  {slug:'amazona-real-venezolana-disponible',icon:'🌿',altEs:'Amazona real venezolana disponible en el criadero',altPt:'Amazona-real-venezuelana disponível no criadeiro',altFr:'Amazone à front bleu disponible dans l\'élevage',captionEs:'Amazona real: colores verde intenso con toques de rojo y amarillo',captionPt:'Amazona-real: cores verde intenso com toques de vermelho e amarelo',captionFr:'Amazone royale: couleurs vert intense avec touches de rouge et jaune'},
  {slug:'loro-hablando-aprendizaje',icon:'🗣️',altEs:'Loro aprendiendo a hablar con su entrenador',altPt:'Papagaio a aprender a falar com o seu treinador',altFr:'Perroquet apprenant à parler avec son éducateur',captionEs:'El aprendizaje del habla comienza en el criadero: base para un loro confiado',captionPt:'A aprendizagem da fala começa no criadeiro: base para um papagaio confiante',captionFr:'L\'apprentissage du langage commence dans l\'élevage: base pour un perroquet confiant'},
];

function generateAvesDispES(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"CollectionPage","@id":"${BASE}/aves-disponibles/#page","url":"${BASE}/aves-disponibles/","name":"Aves Disponibles | Loros en Venta con CITES | Paraisodeaves","description":"Galería de aves disponibles: loros criados a mano con documentación CITES. Yacos, guacamayos, cacatúas, amazonas, eclectus y conuros. Envíos a toda España y Europa.","inLanguage":"es-ES"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"${BASE}/"},{"@type":"ListItem","position":2,"name":"Aves Disponibles","item":"${BASE}/aves-disponibles/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"¿Qué documentación incluye la venta de un loro?","acceptedAnswer":{"@type":"Answer","text":"Cada ave incluye: certificado CITES o de nacimiento en criadero registrado, anilla de identificación, certificado veterinario de salud, guía de cuidados personalizada y soporte post-venta."}},
{"@type":"Question","name":"¿Hacéis envíos de loros a toda España?","acceptedAnswer":{"@type":"Answer","text":"Sí, realizamos envíos a toda la península, Baleares y Canarias mediante mensajería especializada en animales vivos. El transporte se realiza en condiciones óptimas de seguridad, temperatura y ventilación."}},
{"@type":"Question","name":"¿Se pueden reservar los pichones antes de que estén listos?","acceptedAnswer":{"@type":"Answer","text":"Sí, aceptamos reservas para pichones en desarrollo. Se requiere un depósito para confirmar la reserva. Te informaremos del estado del desarrollo y la fecha estimada de disponibilidad."}}
]}
]}</script>`;

  return `${head({lang:'es',title:'Aves Disponibles | Loros en Venta con CITES | Paraisodeaves',desc:'Galería de aves disponibles: loros criados a mano con documentación CITES en España. Yacos, guacamayos, cacatúas, amazonas, eclectus y conuros. Envíos a toda España.',canonical:'/aves-disponibles/',esPath:'/aves-disponibles/',ptPath:'/pt/papagaios-disponiveis/',frPath:'/fr/perroquets-disponibles/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navES('Aves')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/">Inicio</a><span>›</span><span>Aves Disponibles</span></div></div>

<section class="page-hero">
  <div class="badge">🦜 Criados a Mano · CITES Oficial · Envíos a España</div>
  <h1>Aves Disponibles</h1>
  <p class="subtitle">Loros psitácidos criados a mano en nuestro criadero de Llíria, Valencia. Documentación CITES completa, revisión veterinaria y envíos seguros a toda España y Europa.</p>
  <div class="trust-pills">
    <span>✓ CITES oficial</span>
    <span>✓ Criados a mano</span>
    <span>✓ Certificado veterinario</span>
    <span>✓ Soporte post-venta</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Nuestras aves disponibles</h2>
    <p>En Paraíso de Aves criamos loros y psitácidos con la más alta dedicación y profesionalidad desde hace más de 25 años. Cada ave que sale de nuestro criadero ha sido criada a mano desde pichón, socializada con personas y tratada con mimo para garantizar un animal de compañía equilibrado, confiado y afectuoso.</p>
    <p>La disponibilidad varía según la temporada y las camadas en curso. Los estados que puedes encontrar son: <strong>Disponible</strong> (listo para entrega), <strong>Reservado</strong> (con depósito confirmado) y <strong>Consultar disponibilidad</strong> (en desarrollo o próximas camadas). Para conocer la disponibilidad exacta en este momento, escríbenos por email.</p>
    <div class="highlight-box">
      <strong>Importante:</strong> No marcamos aves como vendidas sin confirmación del criador. La disponibilidad de cada especie debe confirmarse por email. No trabajamos con precios fijos en la web — los precios varían según edad, especie y temporada.
    </div>
  </section>

  <section class="section">
    <h2>Especies disponibles en nuestro criadero</h2>
    <div class="bird-grid">
      <div class="bird-card">
        <div class="bird-card-img">🐦</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Psittacus erithacus</div>
          <div class="bird-card-name">Loro Gris Africano (Yaco)</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">🧠 Alta inteligencia</span><span class="trait">💬 Gran hablador</span><span class="trait">👐 Criado a mano</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">El loro más inteligente del mundo. Vocabulario de hasta 1000 palabras.</p>
          <a href="${BASE}/loro-gris-africano.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🦜</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Ara ararauna</div>
          <div class="bird-card-name">Guacamayo Azul y Amarillo</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">💙 Plumaje espectacular</span><span class="trait">🤝 Afectuoso</span><span class="trait">👐 Criado a mano</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Grande, vistoso y con una personalidad extraordinaria. Hasta 60 años de vida.</p>
          <a href="${BASE}/guacamayo-azul-amarillo.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">💙</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Anodorhynchus hyacinthinus</div>
          <div class="bird-card-name">Guacamayo Jacinto</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">👑 El loro más grande</span><span class="trait">💙 Azul cobalto único</span><span class="trait">👐 Criado a mano</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">El loro más grande del mundo. Especie protegida con documentación CITES completa.</p>
          <a href="${BASE}/guacamayo-jacinto.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🤍</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Cacatua galerita</div>
          <div class="bird-card-name">Cacatúa de Cresta Amarilla</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">😄 Muy expresiva</span><span class="trait">🎵 Canta y baila</span><span class="trait">👐 Criada a mano</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Personalidad fuerte y carismática. Necesita mucha interacción y estimulación.</p>
          <a href="${BASE}/cacatua.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🟢</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Eclectus roratus</div>
          <div class="bird-card-name">Loro Eclectus</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">🌈 Dimorfismo sexual</span><span class="trait">🌿 Dieta especial</span><span class="trait">👐 Criado a mano</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Macho verde, hembra roja y azul. Una de las especies más fascinantes.</p>
          <a href="${BASE}/eclectus.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🟡</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Amazona aestiva</div>
          <div class="bird-card-name">Amazona de Frente Azul</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">💬 Gran habladora</span><span class="trait">🎶 Musical</span><span class="trait">👐 Criada a mano</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Excelente aprendiz de vocabulario y canciones. Temperamento equilibrado.</p>
          <a href="${BASE}/loro-amazonico.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">☀️</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Aratinga solstitialis</div>
          <div class="bird-card-name">Conuro del Sol</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">🌈 Muy colorido</span><span class="trait">🎉 Juguetón</span><span class="trait">👐 Criado a mano</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Pequeño y vibrante. Ideal para familias activas que buscan una mascota alegre.</p>
          <a href="${BASE}/conuro.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🥚</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Varios psitácidos</div>
          <div class="bird-card-name">Huevos Fértiles con CITES</div>
          <span class="bird-card-status status-consult">Consultar disponibilidad</span>
          <div class="bird-card-traits"><span class="trait">📋 CITES incluido</span><span class="trait">🌡️ Para incubar</span><span class="trait">🔬 Alta viabilidad</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Para criadores registrados. Incluye CITES, certificado de procedencia y guía de incubación.</p>
          <a href="${BASE}/available-birds/huevos-fertiles.html" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>Por qué elegirnos: crianza responsable</h2>
    <p>No somos una tienda de mascotas. Somos un criadero con núcleo zoológico registrado en la Comunitat Valenciana, con más de 25 años de experiencia especializada en psitácidos exóticos. Criamos nuestras propias aves bajo las normativas españolas y europeas más exigentes: Ley 42/2007, Reglamento CE 338/97 y Convenio CITES.</p>
    <h3>Proceso de entrega y documentación</h3>
    <p>Cada ave que adoptáis de Paraíso de Aves lleva consigo una carpeta completa de documentación:</p>
    <ul>
      <li><strong>Certificado CITES</strong> o de nacimiento en criadero registrado</li>
      <li><strong>Anilla de identificación</strong> (con código único trazable)</li>
      <li><strong>Certificado veterinario de salud</strong> (emitido en los días previos a la entrega)</li>
      <li><strong>Guía de cuidados personalizada</strong> para la especie</li>
      <li><strong>Soporte post-adopción</strong> por email durante los primeros meses</li>
    </ul>
    <h3>Envíos a toda España y Europa</h3>
    <p>Realizamos envíos a toda la península ibérica, Baleares y Canarias (previo acuerdo por las condiciones especiales de las islas). Para el envío al extranjero, incluyendo Portugal, Francia y el resto de Europa, consultar disponibilidad y requisitos específicos de cada país. El transporte se realiza siempre en cajas IATA homologadas, con ventilación, temperatura controlada, y agua y comida para el viaje.</p>
  </section>

  <section class="section">
    <h2>Proceso de reserva y adopción</h2>
    <table class="specs-table"><thead><tr><th>Paso</th><th>Acción</th><th>Tiempo</th></tr></thead><tbody>
      <tr><td>1</td><td>Consulta por email — especie, disponibilidad, preguntas</td><td>24h respuesta</td></tr>
      <tr><td>2</td><td>Presupuesto personalizado con documentación incluida</td><td>1-2 días</td></tr>
      <tr><td>3</td><td>Depósito de reserva para confirmar el ave</td><td>Inmediato</td></tr>
      <tr><td>4</td><td>Seguimiento — fotos y vídeos del desarrollo del pichón</td><td>Semanal</td></tr>
      <tr><td>5</td><td>Revisión veterinaria final + preparación de documentación</td><td>1 semana antes</td></tr>
      <tr><td>6</td><td>Entrega en criadero o envío seguro a domicilio</td><td>Fecha acordada</td></tr>
    </tbody></table>
  </section>

  <section class="gallery-section">
    <h2>Galería de Nuestras Aves</h2>
    <p>Imágenes representativas de las especies que criamos. Se actualizan con fotos reales de las aves disponibles.</p>
    <div class="photo-grid">${galleryItems(avesDisponiblesPhotos,'es')}</div>
  </section>

  <section class="section">
    <h2>Preguntas frecuentes</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">¿Qué documentación incluye la adopción de un loro?</div><div class="faq-a">Certificado CITES, anilla de identificación, certificado veterinario de salud vigente, guía de cuidados y soporte post-adopción. Todo legal y trazable.</div></div>
      <div class="faq-item"><div class="faq-q">¿Hacéis envíos a toda España?</div><div class="faq-a">Sí, a toda la península, Baleares y Canarias. También a Portugal, Francia y el resto de Europa (consultar condiciones específicas por país).</div></div>
      <div class="faq-item"><div class="faq-q">¿Se pueden reservar pichones antes de que estén listos?</div><div class="faq-a">Sí. Con un depósito confirmáis la reserva y recibís fotos y vídeos del desarrollo semanalmente hasta la fecha de entrega.</div></div>
      <div class="faq-item"><div class="faq-q">¿Puedo visitar el criadero antes de adoptar?</div><div class="faq-a">Las visitas al criadero son posibles previa cita y bajo protocolos de bioseguridad. Escríbenos para coordinar.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>¿Buscas un loro específico?</h3>
    <p>Escríbenos con la especie que te interesa y te informamos de disponibilidad, precio y proceso de adopción.</p>
    <a href="${BASE}/#contacto" class="btn-gold">Consultar disponibilidad</a>
    <a href="${BASE}/adopcion-de-loros" class="btn-outline">Proceso de adopción</a>
  </div>

</main>
<aside>
  ${contactFormES('aves')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Documentación CITES</h4><ul>
    <li><a href="${BASE}/documentos-legales-para-adoptar-un-loro">📄 Qué documentos necesitas</a></li>
    <li><a href="${BASE}/criadero-loros-espana">🏛 Criadero registrado</a></li>
    <li><a href="${BASE}/adopcion-de-loros">🤝 Proceso de adopción</a></li>
    <li><a href="${BASE}/nuestras-instalaciones/">🏠 Nuestras instalaciones</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerES()}
${lightboxJS()}
</body></html>`;
}

function generateAvesDispPT(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"CollectionPage","@id":"${BASE}/pt/papagaios-disponiveis/#page","url":"${BASE}/pt/papagaios-disponiveis/","name":"Papagaios Disponíveis | À Venda com CITES | Paraisodeaves","description":"Galeria de papagaios disponíveis: criados à mão com documentação CITES. Papagaios cinzentos, araras, cacatuas, amazonas, eclectus. Envios para Portugal e Europa.","inLanguage":"pt-PT"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"${BASE}/pt/"},{"@type":"ListItem","position":2,"name":"Papagaios Disponíveis","item":"${BASE}/pt/papagaios-disponiveis/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Que documentação inclui a adoção de um papagaio?","acceptedAnswer":{"@type":"Answer","text":"Cada ave inclui: certificado CITES, anel de identificação, certificado veterinário de saúde, guia de cuidados personalizado e suporte pós-adoção."}},
{"@type":"Question","name":"Fazem envios para Portugal?","acceptedAnswer":{"@type":"Answer","text":"Sim, realizamos envios para todo o território português, incluindo ilhas. O transporte é feito em caixas IATA homologadas com condições ótimas de segurança."}}
]}
]}</script>`;

  return `${head({lang:'pt',title:'Papagaios Disponíveis | À Venda com CITES | Paraisodeaves',desc:'Galeria de papagaios disponíveis à venda: criados à mão com documentação CITES completa. Papagaios cinzentos, araras, cacatuas, amazonas. Envios para Portugal.',canonical:'/pt/papagaios-disponiveis/',esPath:'/aves-disponibles/',ptPath:'/pt/papagaios-disponiveis/',frPath:'/fr/perroquets-disponibles/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navPT('Aves')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/pt/">Início</a><span>›</span><span>Papagaios Disponíveis</span></div></div>

<section class="page-hero">
  <div class="badge">🦜 Criados à Mão · CITES Oficial · Envios para Portugal</div>
  <h1>Papagaios Disponíveis</h1>
  <p class="subtitle">Psitacídeos criados à mão no nosso criadeiro em Llíria, Valência. Documentação CITES completa, revisão veterinária e envios seguros para Portugal e toda a Europa.</p>
  <div class="trust-pills">
    <span>✓ CITES oficial</span>
    <span>✓ Criados à mão</span>
    <span>✓ Certificado veterinário</span>
    <span>✓ Envios para Portugal</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Os nossos papagaios disponíveis</h2>
    <p>No Paraíso de Aves criamos papagaios e psitacídeos com a mais alta dedicação e profissionalismo há mais de 25 anos. Cada ave que sai do nosso criadeiro foi criada à mão desde filhote, socializada com pessoas e tratada com carinho para garantir um animal de companhia equilibrado, confiante e afetuoso.</p>
    <p>A disponibilidade varia conforme a época e as ninhadas em curso. Os estados que pode encontrar são: <strong>Disponível</strong> (pronto para entrega), <strong>Reservado</strong> (com depósito confirmado) e <strong>Consultar disponibilidade</strong> (em desenvolvimento ou próximas ninhadas).</p>
    <div class="highlight-box">
      <strong>Importante:</strong> Para conhecer a disponibilidade exata neste momento, escreva-nos por email. Não trabalhamos com preços fixos na web — os preços variam conforme a idade, espécie e época.
    </div>
  </section>

  <section class="section">
    <h2>Espécies disponíveis no nosso criadeiro</h2>
    <div class="bird-grid">
      <div class="bird-card">
        <div class="bird-card-img">🐦</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Psittacus erithacus</div>
          <div class="bird-card-name">Papagaio Cinzento Africano</div>
          <span class="bird-card-status status-consult">Consultar disponibilidade</span>
          <div class="bird-card-traits"><span class="trait">🧠 Alta inteligência</span><span class="trait">💬 Excelente falador</span><span class="trait">👐 Criado à mão</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">O papagaio mais inteligente do mundo. Vocabulário de até 1000 palavras.</p>
          <a href="${BASE}/pt/papagaio-cinzento/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🦜</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Ara ararauna</div>
          <div class="bird-card-name">Arara Azul e Amarela</div>
          <span class="bird-card-status status-consult">Consultar disponibilidade</span>
          <div class="bird-card-traits"><span class="trait">💙 Plumagem espetacular</span><span class="trait">🤝 Afetuosa</span><span class="trait">👐 Criada à mão</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Grande, vistosa e com personalidade extraordinária. Até 60 anos de vida.</p>
          <a href="${BASE}/pt/arara-a-venda/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🤍</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Cacatua galerita</div>
          <div class="bird-card-name">Cacatua-de-Crista-Amarela</div>
          <span class="bird-card-status status-consult">Consultar disponibilidade</span>
          <div class="bird-card-traits"><span class="trait">😄 Muito expressiva</span><span class="trait">🎵 Canta e dança</span><span class="trait">👐 Criada à mão</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Personalidade forte e carismática. Necessita de muita interação e estimulação.</p>
          <a href="${BASE}/pt/cacatua-a-venda/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🟢</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Eclectus roratus</div>
          <div class="bird-card-name">Papagaio Eclectus</div>
          <span class="bird-card-status status-consult">Consultar disponibilidade</span>
          <div class="bird-card-traits"><span class="trait">🌈 Dimorfismo sexual</span><span class="trait">🌿 Dieta especial</span><span class="trait">👐 Criado à mão</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Macho verde, fêmea vermelha e azul. Uma das espécies mais fascinantes.</p>
          <a href="${BASE}/pt/papagaio-eclectus/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🟡</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Amazona aestiva</div>
          <div class="bird-card-name">Amazona de Frente Azul</div>
          <span class="bird-card-status status-consult">Consultar disponibilidade</span>
          <div class="bird-card-traits"><span class="trait">💬 Excelente faladora</span><span class="trait">🎶 Musical</span><span class="trait">👐 Criada à mão</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Excelente aprendiz de vocabulário e canções. Temperamento equilibrado.</p>
          <a href="${BASE}/pt/amazona-a-venda/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🥚</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Vários psitacídeos</div>
          <div class="bird-card-name">Ovos Férteis com CITES</div>
          <span class="bird-card-status status-consult">Consultar disponibilidade</span>
          <div class="bird-card-traits"><span class="trait">📋 CITES incluído</span><span class="trait">🌡️ Para incubar</span><span class="trait">🔬 Alta viabilidade</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Para criadores registados. Inclui CITES, certificado de origem e guia de incubação.</p>
          <a href="${BASE}/pt/ovos-fertilizados/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Ver ficha →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>Processo de reserva e adoção</h2>
    <table class="specs-table"><thead><tr><th>Passo</th><th>Ação</th><th>Tempo</th></tr></thead><tbody>
      <tr><td>1</td><td>Consulta por email — espécie, disponibilidade, perguntas</td><td>24h resposta</td></tr>
      <tr><td>2</td><td>Orçamento personalizado com documentação incluída</td><td>1-2 dias</td></tr>
      <tr><td>3</td><td>Depósito de reserva para confirmar a ave</td><td>Imediato</td></tr>
      <tr><td>4</td><td>Acompanhamento — fotos e vídeos do desenvolvimento</td><td>Semanal</td></tr>
      <tr><td>5</td><td>Revisão veterinária final + preparação da documentação</td><td>1 semana antes</td></tr>
      <tr><td>6</td><td>Entrega no criadeiro ou envio seguro ao domicílio</td><td>Data acordada</td></tr>
    </tbody></table>
  </section>

  <section class="gallery-section">
    <h2>Galeria das Nossas Aves</h2>
    <div class="photo-grid">${galleryItems(avesDisponiblesPhotos,'pt')}</div>
  </section>

  <section class="section">
    <h2>Perguntas frequentes</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Que documentação inclui a adoção de um papagaio?</div><div class="faq-a">Certificado CITES, anel de identificação, certificado veterinário de saúde válido, guia de cuidados e suporte pós-adoção. Tudo legal e rastreável.</div></div>
      <div class="faq-item"><div class="faq-q">Fazem envios para Portugal?</div><div class="faq-a">Sim, para todo o território português, incluindo Madeira e Açores. O transporte é feito em caixas IATA homologadas com condições ótimas de segurança.</div></div>
      <div class="faq-item"><div class="faq-q">É possível reservar filhotes antes de estarem prontos?</div><div class="faq-a">Sim. Com um depósito confirma a reserva e recebe fotos e vídeos do desenvolvimento semanalmente até à data de entrega.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Procura um papagaio específico?</h3>
    <p>Escreva-nos com a espécie que lhe interessa e informamos sobre disponibilidade, preço e processo de adoção.</p>
    <a href="${BASE}/pt/contacto/" class="btn-gold">Consultar disponibilidade</a>
  </div>

</main>
<aside>
  ${contactFormPT('papagaios')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Links Úteis</h4><ul>
    <li><a href="${BASE}/pt/papagaios-a-venda-portugal/">📋 Comprar em Portugal</a></li>
    <li><a href="${BASE}/pt/as-nossas-instalacoes/">🏠 As nossas instalações</a></li>
    <li><a href="${BASE}/pt/contacto/">✉ Contacto</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerPT()}
${lightboxJS()}
</body></html>`;
}

function generateAvesDispFR(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"CollectionPage","@id":"${BASE}/fr/perroquets-disponibles/#page","url":"${BASE}/fr/perroquets-disponibles/","name":"Perroquets Disponibles | À Vendre avec CITES | Paraisodeaves","description":"Galerie de perroquets disponibles: élevés à la main avec documentation CITES. Gris du Gabon, Aras, Cacatoès, Amazones, Éclectus. Livraisons en France.","inLanguage":"fr-FR"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},{"@type":"ListItem","position":2,"name":"Perroquets Disponibles","item":"${BASE}/fr/perroquets-disponibles/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Quelle documentation est incluse avec l'achat d'un perroquet?","acceptedAnswer":{"@type":"Answer","text":"Chaque oiseau inclut: certificat CITES, bague d'identification, certificat vétérinaire de santé, guide de soins personnalisé et support post-adoption."}},
{"@type":"Question","name":"Livrez-vous des perroquets en France?","acceptedAnswer":{"@type":"Answer","text":"Oui, nous livrons dans toute la France métropolitaine et les DOM-TOM via un transport spécialisé en animaux vivants. Le transport se fait dans des caisses IATA homologuées."}}
]}
]}</script>`;

  return `${head({lang:'fr',title:'Perroquets Disponibles | À Vendre avec CITES | Paraisodeaves',desc:'Galerie de perroquets disponibles à vendre en France: élevés à la main avec documentation CITES complète. Gris du Gabon, Aras, Cacatoès, Amazones. Livraisons France.',canonical:'/fr/perroquets-disponibles/',esPath:'/aves-disponibles/',ptPath:'/pt/papagaios-disponiveis/',frPath:'/fr/perroquets-disponibles/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navFR('Perroquets')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/fr/">Accueil</a><span>›</span><span>Perroquets Disponibles</span></div></div>

<section class="page-hero">
  <div class="badge">🦜 Élevés à la Main · CITES Officiel · Livraisons en France</div>
  <h1>Perroquets Disponibles</h1>
  <p class="subtitle">Psittacidés élevés à la main dans notre élevage à Llíria, Valence (Espagne). Documentation CITES complète, contrôle vétérinaire et livraisons sécurisées en France et dans toute l'Europe.</p>
  <div class="trust-pills">
    <span>✓ CITES officiel</span>
    <span>✓ Élevés à la main</span>
    <span>✓ Certificat vétérinaire</span>
    <span>✓ Livraison en France</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Nos perroquets disponibles</h2>
    <p>Chez Paraíso de Aves, nous élevons des perroquets et psittacidés avec le plus grand soin et professionnalisme depuis plus de 25 ans. Chaque oiseau qui sort de notre élevage a été nourri à la main depuis l'oisillon, socialisé avec des personnes et traité avec affection pour garantir un animal de compagnie équilibré, confiant et affectueux.</p>
    <p>La disponibilité varie selon la saison et les couvées en cours. Les statuts que vous pouvez trouver sont: <strong>Disponible</strong> (prêt pour livraison), <strong>Réservé</strong> (avec acompte confirmé) et <strong>Consulter disponibilité</strong> (en développement ou prochaines couvées).</p>
    <div class="highlight-box">
      <strong>Important:</strong> Pour connaître la disponibilité exacte au moment de votre demande, écrivez-nous par email. Nous ne pratiquons pas de prix fixes sur le site — les prix varient selon l'âge, l'espèce et la saison.
    </div>
  </section>

  <section class="section">
    <h2>Espèces disponibles dans notre élevage</h2>
    <div class="bird-grid">
      <div class="bird-card">
        <div class="bird-card-img">🐦</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Psittacus erithacus</div>
          <div class="bird-card-name">Perroquet Gris du Gabon</div>
          <span class="bird-card-status status-consult">Consulter disponibilité</span>
          <div class="bird-card-traits"><span class="trait">🧠 Haute intelligence</span><span class="trait">💬 Grand parleur</span><span class="trait">👐 Élevé à la main</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Le perroquet le plus intelligent au monde. Vocabulaire jusqu'à 1000 mots.</p>
          <a href="${BASE}/fr/perroquet-gris-du-gabon/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Voir la fiche →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🦜</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Ara ararauna</div>
          <div class="bird-card-name">Ara Bleu et Jaune</div>
          <span class="bird-card-status status-consult">Consulter disponibilité</span>
          <div class="bird-card-traits"><span class="trait">💙 Plumage spectaculaire</span><span class="trait">🤝 Affectueux</span><span class="trait">👐 Élevé à la main</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Grand, coloré et doté d'une personnalité extraordinaire. Jusqu'à 60 ans de vie.</p>
          <a href="${BASE}/fr/ara-bleu-et-jaune/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Voir la fiche →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">💙</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Anodorhynchus hyacinthinus</div>
          <div class="bird-card-name">Ara Hyacinthe</div>
          <span class="bird-card-status status-consult">Consulter disponibilité</span>
          <div class="bird-card-traits"><span class="trait">👑 Le plus grand perroquet</span><span class="trait">💙 Bleu cobalt unique</span><span class="trait">👐 Élevé à la main</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Le plus grand perroquet du monde. Espèce protégée avec documentation CITES complète.</p>
          <a href="${BASE}/fr/ara-hyacinthe/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Voir la fiche →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🤍</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Cacatua galerita</div>
          <div class="bird-card-name">Cacatoès à Huppe Jaune</div>
          <span class="bird-card-status status-consult">Consulter disponibilité</span>
          <div class="bird-card-traits"><span class="trait">😄 Très expressif</span><span class="trait">🎵 Chante et danse</span><span class="trait">👐 Élevé à la main</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Personnalité forte et charismatique. Nécessite beaucoup d'interaction et de stimulation.</p>
          <a href="${BASE}/fr/cacatoes-huppe-jaune/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Voir la fiche →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🟢</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Eclectus roratus</div>
          <div class="bird-card-name">Éclectus</div>
          <span class="bird-card-status status-consult">Consulter disponibilité</span>
          <div class="bird-card-traits"><span class="trait">🌈 Dimorphisme sexuel</span><span class="trait">🌿 Régime spécial</span><span class="trait">👐 Élevé à la main</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Mâle vert, femelle rouge et bleue. L'une des espèces les plus fascinantes.</p>
          <a href="${BASE}/fr/eclectus/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Voir la fiche →</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img">🟡</div>
        <div class="bird-card-body">
          <div class="bird-card-species">Amazona aestiva</div>
          <div class="bird-card-name">Amazone à Front Bleu</div>
          <span class="bird-card-status status-consult">Consulter disponibilité</span>
          <div class="bird-card-traits"><span class="trait">💬 Excellente parleuse</span><span class="trait">🎶 Musicale</span><span class="trait">👐 Élevée à la main</span></div>
          <p style="font-size:.84rem;color:var(--muted);margin-top:10px;">Excellente apprenante de vocabulaire et de chansons. Tempérament équilibré.</p>
          <a href="${BASE}/fr/amazone-front-bleu/" class="btn-gold" style="margin-top:12px;display:inline-block;padding:8px 16px;">Voir la fiche →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>Pourquoi nous choisir: élevage responsable</h2>
    <p>Nous ne sommes pas une animalerie. Nous sommes un élevage enregistré à Llíria, Valence, avec plus de 25 ans d'expérience spécialisée en psittacidés exotiques. Nous élevons nos propres oiseaux selon les normes espagnoles et européennes les plus strictes: CITES, Règlement CE 338/97 et Directive Oiseaux.</p>
    <h3>Documentation incluse avec chaque oiseau</h3>
    <ul>
      <li><strong>Certificat CITES</strong> ou de naissance en élevage enregistré</li>
      <li><strong>Bague d'identification</strong> (code unique traçable)</li>
      <li><strong>Certificat vétérinaire de santé</strong> (émis dans les jours précédant la livraison)</li>
      <li><strong>Guide de soins personnalisé</strong> pour l'espèce</li>
      <li><strong>Support post-adoption</strong> par email pendant les premiers mois</li>
    </ul>
  </section>

  <section class="gallery-section">
    <h2>Galerie de nos Oiseaux</h2>
    <div class="photo-grid">${galleryItems(avesDisponiblesPhotos,'fr')}</div>
  </section>

  <section class="section">
    <h2>Questions fréquentes</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Quelle documentation est incluse?</div><div class="faq-a">Certificat CITES, bague d'identification, certificat vétérinaire de santé valide, guide de soins et support post-adoption. Tout légal et traçable.</div></div>
      <div class="faq-item"><div class="faq-q">Livrez-vous des perroquets en France?</div><div class="faq-a">Oui, dans toute la France métropolitaine et les DOM-TOM. Transport en caisses IATA homologuées avec conditions optimales de sécurité.</div></div>
      <div class="faq-item"><div class="faq-q">Peut-on réserver un oisillon avant qu'il soit prêt?</div><div class="faq-a">Oui. Avec un acompte, vous confirmez la réservation et recevez des photos et vidéos du développement chaque semaine jusqu'à la date de livraison.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Vous recherchez une espèce spécifique?</h3>
    <p>Écrivez-nous avec l'espèce qui vous intéresse et nous vous informons sur la disponibilité, le prix et le processus d'adoption.</p>
    <a href="${BASE}/fr/contact/" class="btn-gold">Consulter la disponibilité</a>
    <a href="${BASE}/fr/processus-adoption/" class="btn-outline">Processus d'adoption</a>
  </div>

</main>
<aside>
  ${contactFormFR('perroquets')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Liens Utiles</h4><ul>
    <li><a href="${BASE}/fr/livraison/">🚚 Livraison en France</a></li>
    <li><a href="${BASE}/fr/nos-installations/">🏠 Nos installations</a></li>
    <li><a href="${BASE}/fr/garantie-sante/">🏥 Garantie santé</a></li>
    <li><a href="${BASE}/fr/contact/">✉ Contact</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerFR()}
${lightboxJS()}
</body></html>`;
}

/* ════════════════════════════════════════════════════
   TOPIC 3 — NUESTRAS INSTALACIONES / NOS INSTALLATIONS
════════════════════════════════════════════════════ */

const instalacionesPhotos = [
  {slug:'instalaciones-criadero-loros',icon:'🏠',altEs:'Instalaciones del criadero de loros Paraisodeaves',altPt:'Instalações do criadeiro de papagaios Paraisodeaves',altFr:'Installations de l\'élevage de perroquets Paraisodeaves',captionEs:'Vista general de las instalaciones de Paraíso de Aves en Llíria, Valencia',captionPt:'Vista geral das instalações do Paraíso de Aves em Llíria, Valência',captionFr:'Vue générale des installations de Paraíso de Aves à Llíria, Valence'},
  {slug:'zona-crianza-papagayos',icon:'🐣',altEs:'Zona de crianza a mano de pichones de loro',altPt:'Zona de criação à mão de filhotes de papagaio',altFr:'Zone d\'élevage à la main des oisillons perroquets',captionEs:'Sala de crianza a mano: temperatura controlada y silencio para los pichones',captionPt:'Sala de criação à mão: temperatura controlada e silêncio para os filhotes',captionFr:'Salle d\'élevage à la main: température contrôlée et calme pour les oisillons'},
  {slug:'habitacion-socializacion-loros',icon:'👥',altEs:'Habitación de socialización de loros con personas',altPt:'Sala de socialização de papagaios com pessoas',altFr:'Salle de socialisation des perroquets avec des personnes',captionEs:'Sala de socialización diaria: exposición a voces, música y contacto humano',captionPt:'Sala de socialização diária: exposição a vozes, música e contacto humano',captionFr:'Salle de socialisation quotidienne: exposition aux voix, musique et contact humain'},
  {slug:'area-alimentacion-papagayos',icon:'🍽️',altEs:'Área de preparación y servicio de alimentos para loros',altPt:'Área de preparação e serviço de alimentos para papagaios',altFr:'Zone de préparation et service des aliments pour perroquets',captionEs:'Cocina de preparación: alimentos frescos preparados diariamente',captionPt:'Cozinha de preparação: alimentos frescos preparados diariamente',captionFr:'Cuisine de préparation: aliments frais préparés quotidiennement'},
  {slug:'jaulas-amplias-loros-vuelo',icon:'🕊️',altEs:'Jaulas de vuelo amplias para loros adultos',altPt:'Jaulas de voo amplas para papagaios adultos',altFr:'Grandes volières de vol pour perroquets adultes',captionEs:'Voladeros exteriores de 4×2×2m: ejercicio diario al aire libre',captionPt:'Voadores exteriores de 4×2×2m: exercício diário ao ar livre',captionFr:'Volières extérieures de 4×2×2m: exercice quotidien en plein air'},
  {slug:'sistema-calefaccion-criadero',icon:'🌡️',altEs:'Sistema de climatización del criadero para temperatura óptima',altPt:'Sistema de climatização do criadeiro para temperatura ótima',altFr:'Système de climatisation de l\'élevage pour température optimale',captionEs:'Temperatura controlada: 22-26°C en invierno, refrigeración en verano',captionPt:'Temperatura controlada: 22-26°C no inverno, refrigeração no verão',captionFr:'Température contrôlée: 22-26°C en hiver, climatisation en été'},
  {slug:'zona-cuarentena-loros',icon:'🔬',altEs:'Zona de cuarentena para nuevas aves y control sanitario',altPt:'Zona de quarentena para novas aves e controlo sanitário',altFr:'Zone de quarantaine pour nouveaux oiseaux et contrôle sanitaire',captionEs:'Sala de cuarentena: aislamiento preventivo de 30 días para nuevas adquisiciones',captionPt:'Sala de quarentena: isolamento preventivo de 30 dias para novas aquisições',captionFr:'Salle de quarantaine: isolement préventif de 30 jours pour les nouvelles acquisitions'},
  {slug:'dispensario-veterinario-criadero',icon:'🏥',altEs:'Área de atención veterinaria del criadero',altPt:'Área de atendimento veterinário do criadeiro',altFr:'Zone de soins vétérinaires de l\'élevage',captionEs:'Consulta veterinaria en el propio criadero: diagnóstico y tratamiento',captionPt:'Consulta veterinária no próprio criadeiro: diagnóstico e tratamento',captionFr:'Cabinet vétérinaire dans l\'élevage même: diagnostic et traitement'},
  {slug:'zona-juego-enriquecimiento-loros',icon:'🎯',altEs:'Zona de enriquecimiento y juego para loros psitácidos',altPt:'Zona de enriquecimento e jogo para papagaios psitacídeos',altFr:'Zone d\'enrichissement et de jeu pour les perroquets psittacidés',captionEs:'Zona de juego con perchas, cuerdas y juguetes naturales rotativos',captionPt:'Zona de jogo com poleiros, cordas e brinquedos naturais rotativos',captionFr:'Zone de jeu avec perchoirs, cordes et jouets naturels rotatifs'},
  {slug:'iluminacion-natural-criadero',icon:'☀️',altEs:'Sistema de iluminación natural y artificial del criadero',altPt:'Sistema de iluminação natural e artificial do criadeiro',altFr:'Système d\'éclairage naturel et artificiel de l\'élevage',captionEs:'Luz natural + UVB artificial: esencial para la síntesis de vitamina D3',captionPt:'Luz natural + UVB artificial: essencial para a síntese de vitamina D3',captionFr:'Lumière naturelle + UVB artificiel: essentiel pour la synthèse de vitamine D3'},
  {slug:'protocolo-higiene-criadero',icon:'🧹',altEs:'Protocolo de higiene y desinfección diaria del criadero',altPt:'Protocolo de higiene e desinfeção diária do criadeiro',altFr:'Protocole d\'hygiène et désinfection quotidienne de l\'élevage',captionEs:'Limpieza y desinfección diaria con productos seguros para aves',captionPt:'Limpeza e desinfeção diária com produtos seguros para aves',captionFr:'Nettoyage et désinfection quotidiens avec des produits sûrs pour les oiseaux'},
  {slug:'registro-criadero-oficial',icon:'📋',altEs:'Registro oficial del núcleo zoológico del criadero',altPt:'Registo oficial do núcleo zoológico do criadeiro',altFr:'Enregistrement officiel du noyau zoologique de l\'élevage',captionEs:'Núcleo zoológico registrado: nuestro número oficial de registro autonómico',captionPt:'Núcleo zoológico registado: o nosso número oficial de registo autonómico',captionFr:'Noyau zoologique enregistré: notre numéro officiel d\'enregistrement régional'},
  {slug:'pichones-sala-incubacion',icon:'🥚',altEs:'Sala de incubación y eclosión de huevos de loro',altPt:'Sala de incubação e eclosão de ovos de papagaio',altFr:'Salle d\'incubation et d\'éclosion des oeufs de perroquet',captionEs:'Incubadoras de precisión: temperatura y humedad controlada para cada especie',captionPt:'Incubadoras de precisão: temperatura e humidade controlada para cada espécie',captionFr:'Incubateurs de précision: température et humidité contrôlées par espèce'},
  {slug:'bascula-precision-control-peso',icon:'⚖️',altEs:'Báscula de precisión para control de peso de los loros',altPt:'Balança de precisão para controlo de peso dos papagaios',altFr:'Balance de précision pour le contrôle du poids des perroquets',captionEs:'Control de peso diario: la pérdida de peso es el primer indicador de enfermedad',captionPt:'Controlo de peso diário: a perda de peso é o primeiro indicador de doença',captionFr:'Contrôle du poids quotidien: la perte de poids est le premier indicateur de maladie'},
  {slug:'agua-filtrada-sistema-criadero',icon:'💧',altEs:'Sistema de filtración de agua pura para los loros',altPt:'Sistema de filtração de água pura para os papagaios',altFr:'Système de filtration d\'eau pure pour les perroquets',captionEs:'Agua filtrada y renovada diariamente en bebederos automáticos',captionPt:'Água filtrada e renovada diariamente em bebedouros automáticos',captionFr:'Eau filtrée et renouvelée quotidiennement dans des abreuvoirs automatiques'},
  {slug:'exterior-voladores-sol',icon:'🌤️',altEs:'Voladores exteriores con acceso al sol y aire fresco',altPt:'Voadores exteriores com acesso ao sol e ar fresco',altFr:'Volières extérieures avec accès au soleil et à l\'air frais',captionEs:'Acceso diario a exteriores: luz solar natural e aire fresco imprescindibles',captionPt:'Acesso diário ao exterior: luz solar natural e ar fresco imprescindíveis',captionFr:'Accès quotidien à l\'extérieur: lumière solaire naturelle et air frais indispensables'},
  {slug:'cuidadores-profesionales-criadero',icon:'👨‍⚕️',altEs:'Equipo de cuidadores profesionales del criadero',altPt:'Equipa de cuidadores profissionais do criadeiro',altFr:'Équipe de soignants professionnels de l\'élevage',captionEs:'Equipo de cuidadores con formación especializada en psitácidos',captionPt:'Equipa de cuidadores com formação especializada em psitacídeos',captionFr:'Équipe de soignants avec formation spécialisée en psittacidés'},
  {slug:'separacion-edad-loros',icon:'📦',altEs:'Separación de aves por edad y especie en el criadero',altPt:'Separação de aves por idade e espécie no criadeiro',altFr:'Séparation des oiseaux par âge et espèce dans l\'élevage',captionEs:'Separación por edad y especie: evita contagios y reduce el estrés',captionPt:'Separação por idade e espécie: evita contágios e reduz o stress',captionFr:'Séparation par âge et espèce: évite les contagions et réduit le stress'},
  {slug:'musica-radio-socializacion',icon:'🎵',altEs:'Música y radio durante la socialización de los loros',altPt:'Música e rádio durante a socialização dos papagaios',altFr:'Musique et radio pendant la socialisation des perroquets',captionEs:'Radio y música: exposición auditiva que mejora la vocalización futura',captionPt:'Rádio e música: exposição auditiva que melhora a vocalização futura',captionFr:'Radio et musique: exposition auditive qui améliore la vocalisation future'},
  {slug:'perchas-naturales-madera',icon:'🌲',altEs:'Perchas naturales de madera no tratada para loros',altPt:'Poleiros naturais de madeira não tratada para papagaios',altFr:'Perchoirs naturels en bois non traité pour perroquets',captionEs:'Perchas de madera natural: manzano, fresno, sauce — mantienen el pico y las patas',captionPt:'Poleiros de madeira natural: macieira, freixo, salgueiro — mantêm o bico e as patas',captionFr:'Perchoirs en bois naturel: pommier, frêne, saule — entretien du bec et des pattes'},
  {slug:'alimentacion-fresca-diaria-criadero',icon:'🥗',altEs:'Preparación de alimentación fresca diaria en el criadero',altPt:'Preparação de alimentação fresca diária no criadeiro',altFr:'Préparation de l\'alimentation fraîche quotidienne dans l\'élevage',captionEs:'Cada mañana: preparación de fruta fresca, verduras y papilla para pichones',captionPt:'Cada manhã: preparação de fruta fresca, verduras e papa para filhotes',captionFr:'Chaque matin: préparation de fruits frais, légumes et bouillie pour oisillons'},
  {slug:'sala-observacion-nuevas-aves',icon:'🔭',altEs:'Sala de observación para nuevas aves en período de adaptación',altPt:'Sala de observação para novas aves em período de adaptação',altFr:'Salle d\'observation pour les nouveaux oiseaux en période d\'adaptation',captionEs:'Sala de observación: monitoreo intensivo durante las primeras semanas',captionPt:'Sala de observação: monitorização intensiva durante as primeiras semanas',captionFr:'Salle d\'observation: surveillance intensive durant les premières semaines'},
  {slug:'documentacion-archivo-criadero',icon:'📁',altEs:'Archivo de documentación CITES del criadero',altPt:'Arquivo de documentação CITES do criadeiro',altFr:'Archives de documentation CITES de l\'élevage',captionEs:'Archivo completo: historial de cada ave desde el nacimiento',captionPt:'Arquivo completo: historial de cada ave desde o nascimento',captionFr:'Archives complètes: historique de chaque oiseau depuis sa naissance'},
  {slug:'nidos-artificiales-crianza',icon:'🪺',altEs:'Nidos artificiales para la crianza de loros en el criadero',altPt:'Ninhos artificiais para a criação de papagaios no criadeiro',altFr:'Nids artificiels pour l\'élevage des perroquets dans l\'élevage',captionEs:'Nidos homologados por especie: tamaño, material y oscuridad adaptados',captionPt:'Ninhos homologados por espécie: tamanho, material e escuridão adaptados',captionFr:'Nids homologués par espèce: taille, matériau et obscurité adaptés'},
  {slug:'seguimiento-salud-fichas',icon:'📊',altEs:'Fichas de seguimiento de salud individual de cada loro',altPt:'Fichas de acompanhamento de saúde individual de cada papagaio',altFr:'Fiches de suivi de santé individuel de chaque perroquet',captionEs:'Ficha individual: peso, alimentación, comportamiento y registro veterinario',captionPt:'Ficha individual: peso, alimentação, comportamento e registo veterinário',captionFr:'Fiche individuelle: poids, alimentation, comportement et dossier vétérinaire'},
  {slug:'entorno-calmo-bienestar-loros',icon:'🌿',altEs:'Entorno tranquilo y natural para el bienestar de los loros',altPt:'Ambiente tranquilo e natural para o bem-estar dos papagaios',altFr:'Environnement calme et naturel pour le bien-être des perroquets',captionEs:'Entorno sin estrés: vegetación, silencio y rutinas estables diarias',captionPt:'Ambiente sem stress: vegetação, silêncio e rotinas estáveis diárias',captionFr:'Environnement sans stress: végétation, calme et routines stables quotidiennes'},
];

function generateInstalacionesES(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/nuestras-instalaciones/#webpage","url":"${BASE}/nuestras-instalaciones/","name":"Nuestras Instalaciones | Criadero Paraisodeaves en Llíria, Valencia","description":"Visita virtual a las instalaciones de Paraíso de Aves: zonas de crianza, socialización, cuarentena, alimentación y cuidados veterinarios de nuestros loros y psitácidos.","inLanguage":"es-ES"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"${BASE}/"},{"@type":"ListItem","position":2,"name":"Nuestras Instalaciones","item":"${BASE}/nuestras-instalaciones/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"¿Puedo visitar el criadero antes de adoptar?","acceptedAnswer":{"@type":"Answer","text":"Sí, las visitas al criadero son posibles previa cita y bajo protocolos de bioseguridad. Escríbenos por email para coordinar la visita. Las visitas se realizan de lunes a sábado en horario de mañana."}},
{"@type":"Question","name":"¿Está el criadero registrado oficialmente?","acceptedAnswer":{"@type":"Answer","text":"Sí, Paraíso de Aves opera como núcleo zoológico registrado en la Comunitat Valenciana, cumpliendo con la Ley 42/2007 de Patrimonio Natural, el Convenio CITES y el Reglamento CE 338/97 sobre el comercio de fauna silvestre."}},
{"@type":"Question","name":"¿Cómo garantizáis la salud de las aves?","acceptedAnswer":{"@type":"Answer","text":"Mediante revisiones veterinarias periódicas, control diario de peso y comportamiento, cuarentena de 30 días para nuevas aves, sistema de agua filtrada, limpieza y desinfección diaria, y alimentación fresca preparada en nuestras propias cocinas."}}
]}
]}</script>`;

  return `${head({lang:'es',title:'Nuestras Instalaciones | Criadero de Loros en Llíria, Valencia | Paraisodeaves',desc:'Conoce las instalaciones de Paraíso de Aves: criadero registrado con zonas de crianza, socialización, cuarentena y atención veterinaria en Llíria, Valencia.',canonical:'/nuestras-instalaciones/',esPath:'/nuestras-instalaciones/',ptPath:'/pt/as-nossas-instalacoes/',frPath:'/fr/nos-installations/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navES()}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/">Inicio</a><span>›</span><span>Nuestras Instalaciones</span></div></div>

<section class="page-hero">
  <div class="badge">🏛 Núcleo Zoológico Registrado · Llíria, Valencia</div>
  <h1>Nuestras Instalaciones</h1>
  <p class="subtitle">Más de 25 años criando loros con las más altas condiciones de bienestar, higiene y profesionalidad. Conoce cómo trabajamos en Paraíso de Aves.</p>
  <div class="trust-pills">
    <span>✓ Registro oficial autonómico</span>
    <span>✓ Protocolo veterinario propio</span>
    <span>✓ Bienestar animal certificado</span>
    <span>✓ Higiene de máximo nivel</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Un criadero con vocación de excelencia</h2>
    <p>Paraíso de Aves no es una tienda de animales. Es un criadero especializado en psitácidos exóticos con más de 25 años de historia, ubicado en Llíria, en la Comunitat Valenciana. Empezamos como una pequeña pasión familiar y hemos crecido hasta convertirnos en uno de los criaderos más respetados de España, con aves enviadas a toda Europa.</p>
    <p>Nuestras instalaciones han sido diseñadas y mejoradas continuamente con un único objetivo: garantizar el máximo bienestar de cada ave, desde el huevo hasta la entrega a su nueva familia. Cada decisión en el diseño de nuestro criadero — desde la orientación de los voladeros hasta el tipo de madera de las perchas — tiene una razón de ser fundamentada en la ciencia aviar y en nuestra propia experiencia acumulada.</p>
    <div class="highlight-box">
      <strong>Núcleo Zoológico Registrado:</strong> Operamos con registro oficial en la Comunitat Valenciana, cumpliendo con la Ley 42/2007, el Reglamento CE 338/97 y el Convenio CITES. Cada ave sale con documentación 100% legal y trazable.
    </div>
  </section>

  <section class="section">
    <h2>Zonas del criadero</h2>
    <h3>1. Sala de incubación y eclosión</h3>
    <p>Contamos con incubadoras de precisión de última generación donde controlamos temperatura y humedad específicamente adaptadas a cada especie. Los huevos son monitorizados a diario y giramos los nidos de forma regular. La temperatura de incubación varía según la especie: los guacamayos incuban a 37,2°C con 55% de humedad, mientras que los yacos requieren 37,5°C y 50% de humedad relativa.</p>
    <h3>2. Sala de crianza a mano (handfeeding)</h3>
    <p>Es el corazón emocional del criadero. Aquí, pichones desde las primeras horas de vida reciben alimentación manual cada 2-4 horas con papilla especializada según especie y edad. La temperatura de la sala se mantiene entre 32°C para recién nacidos y va reduciéndose progresivamente hasta temperatura ambiente. El personal que trabaja en esta sala tiene formación específica en crianza de psitácidos y conoce perfectamente las señales de alerta en pichones.</p>
    <h3>3. Sala de socialización</h3>
    <p>Una vez que los pichones están suficientemente desarrollados, pasan a la sala de socialización, donde se realizan sesiones diarias de contacto humano, exposición a diferentes sonidos y voces, manipulación de objetos de diferentes texturas, y aprendizaje de vocalizaciones básicas. Esta fase es crítica para el desarrollo psicológico del loro: un loro bien socializado en sus primeras semanas de vida será un animal confiado y equilibrado para toda su vida.</p>
    <h3>4. Voladeros exteriores</h3>
    <p>Nuestros voladeros exteriores miden entre 4×2×2m y 6×3×2.5m dependiendo de la especie. El acceso al sol, al aire fresco y al ejercicio de vuelo son fundamentales para la salud física y mental del loro. En nuestras instalaciones, incluso los pichones tienen acceso controlado a exteriores desde que su plumaje lo permite.</p>
    <h3>5. Zona de cuarentena</h3>
    <p>Toda nueva ave que entra a nuestro criadero — ya sea adquirida externamente o procedente de una nueva camada que requiere separación — pasa obligatoriamente por un período de cuarentena de 30 días en una sala completamente aislada del resto del criadero. Durante este período se realizan análisis de sangre, coprocultivos y observación clínica diaria.</p>
    <h3>6. Sala de atención veterinaria</h3>
    <p>Disponemos de una sala de atención veterinaria equipada para diagnóstico básico: báscula de precisión, iluminación quirúrgica, material de primeros auxilios y almacenamiento de medicación aviar. Nuestro veterinario colaborador de referencia es especialista en medicina de aves exóticas y realiza visitas periódicas al criadero.</p>
  </section>

  <section class="section">
    <h2>Protocolos de higiene y bioseguridad</h2>
    <p>La higiene es el primer pilar de prevención de enfermedades en un criadero. Seguimos protocolos estrictos que incluyen:</p>
    <ul>
      <li><strong>Limpieza diaria</strong> de comederos, bebederos y fondos de jaulas con agua caliente y detergente específico para aves</li>
      <li><strong>Desinfección semanal</strong> con desinfectantes seguros para psitácidos (sin fenol, sin cloro en exceso)</li>
      <li><strong>Rotación de perchas y juguetes</strong> para evitar acumulación de bacterias</li>
      <li><strong>Acceso restringido</strong> al criadero — solo personal autorizado y visitas con protocolo de bioseguridad</li>
      <li><strong>Cambio de ropa</strong> al entrar a las zonas de crianza de pichones</li>
      <li><strong>Control de plagas</strong> trimestral mediante empresa especializada</li>
    </ul>
  </section>

  <section class="section">
    <h2>Alimentación y nutrición en el criadero</h2>
    <p>Cada mañana, nuestro equipo prepara los alimentos frescos del día: fruta de temporada troceada, verduras variadas, papilla fresca para pichones y cereales cocidos. Nunca utilizamos alimentos pre-envasados como base de la alimentación. La dieta de cada especie está diseñada con la colaboración de nuestro veterinario nutrólogo, y varía según la época del año (muda, cría, invierno) y el estado de cada ave.</p>
    <p>El agua del criadero pasa por un sistema de filtración de triple etapa que elimina cloro, metales pesados y bacterias. Los bebederos se vacían, limpian y rellenan con agua fresca dos veces al día.</p>
  </section>

  <section class="section">
    <h2>Bienestar y enriquecimiento ambiental</h2>
    <p>Un loro aburrido es un loro problemático. El enriquecimiento ambiental no es un lujo: es una necesidad básica de los psitácidos, animales con alta inteligencia y necesidades cognitivas complejas. En nuestro criadero, el enriquecimiento incluye:</p>
    <ul>
      <li>Rotación semanal de juguetes y elementos de enriquecimiento</li>
      <li>Perchas de diferentes maderas naturales (manzano, fresno, sauce, eucalipto sin tratar)</li>
      <li>Comederos forrajeadores que estimulan el comportamiento natural de búsqueda de comida</li>
      <li>Exposición a música y diferentes sonidos durante la mañana</li>
      <li>Sesiones de ejercicio supervisado fuera de la jaula para aves adultas</li>
      <li>Elementos naturales: ramas frescas, piñas, vegetales enteros para manipular</li>
    </ul>
  </section>

  <section class="gallery-section">
    <h2>Galería de Nuestras Instalaciones</h2>
    <p>Imágenes de las diferentes zonas de nuestro criadero. Se actualizan regularmente con fotografías reales.</p>
    <div class="photo-grid">${galleryItems(instalacionesPhotos,'es')}</div>
  </section>

  <section class="section">
    <h2>Preguntas frecuentes sobre el criadero</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">¿Puedo visitar el criadero antes de adoptar?</div><div class="faq-a">Sí, las visitas son posibles previa cita y bajo protocolos de bioseguridad (lavado de manos, no entrar si has visitado otro criadero en las últimas 48h). Escríbenos para coordinar.</div></div>
      <div class="faq-item"><div class="faq-q">¿Está el criadero registrado oficialmente?</div><div class="faq-a">Sí, operamos como núcleo zoológico registrado en la Comunitat Valenciana, cumpliendo con la Ley 42/2007, el Convenio CITES y el Reglamento CE 338/97.</div></div>
      <div class="faq-item"><div class="faq-q">¿Cómo garantizáis la salud de las aves?</div><div class="faq-a">Control de peso diario, revisiones veterinarias periódicas, cuarentena de 30 días para nuevas aves, agua filtrada, limpieza y desinfección diaria, y alimentación fresca preparada en nuestras cocinas.</div></div>
      <div class="faq-item"><div class="faq-q">¿Qué ocurre si el loro enferma después de la entrega?</div><div class="faq-a">Ofrecemos soporte post-adopción por email durante los primeros meses. Si el ave enferma por una condición preexistente no detectada en el momento de la entrega, estudiamos cada caso con nuestro equipo veterinario.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>¿Quieres conocer nuestro criadero?</h3>
    <p>Escríbenos para concertar una visita o para resolver cualquier pregunta sobre cómo trabajamos.</p>
    <a href="${BASE}/#contacto" class="btn-gold">Contactar por email</a>
    <a href="${BASE}/nosotros.html" class="btn-outline">Sobre nosotros</a>
  </div>

</main>
<aside>
  ${contactFormES('instalaciones')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Más Información</h4><ul>
    <li><a href="${BASE}/nosotros.html">👥 Quiénes somos</a></li>
    <li><a href="${BASE}/adopcion-de-loros">🤝 Proceso de adopción</a></li>
    <li><a href="${BASE}/documentos-legales-para-adoptar-un-loro">📄 Documentación CITES</a></li>
    <li><a href="${BASE}/aves-disponibles/">🦜 Aves disponibles</a></li>
    <li><a href="${BASE}/criadero-loros-espana">🏛 Nuestro criadero</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerES()}
${lightboxJS()}
</body></html>`;
}

function generateInstalacionesPT(){
  return `${head({lang:'pt',title:'As Nossas Instalações | Criadeiro de Papagaios em Llíria, Valência | Paraisodeaves',desc:'Conheça as instalações do Paraíso de Aves: criadeiro registado com zonas de criação, socialização, quarentena e cuidados veterinários em Llíria, Valência, Espanha.',canonical:'/pt/as-nossas-instalacoes/',esPath:'/nuestras-instalaciones/',ptPath:'/pt/as-nossas-instalacoes/',frPath:'/fr/nos-installations/',ogImage:'loro-gris-01.webp'})}
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","url":"${BASE}/pt/as-nossas-instalacoes/","name":"As Nossas Instalações | Criadeiro Paraisodeaves","description":"Visita virtual às instalações do Paraíso de Aves: zonas de criação, socialização, quarentena, alimentação e cuidados veterinários.","inLanguage":"pt-PT"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"${BASE}/pt/"},{"@type":"ListItem","position":2,"name":"As Nossas Instalações","item":"${BASE}/pt/as-nossas-instalacoes/"}]}
]}</script>
</head>
<body>
${navPT()}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/pt/">Início</a><span>›</span><span>As Nossas Instalações</span></div></div>

<section class="page-hero">
  <div class="badge">🏛 Núcleo Zoológico Registado · Llíria, Valência</div>
  <h1>As Nossas Instalações</h1>
  <p class="subtitle">Mais de 25 anos a criar papagaios com as mais altas condições de bem-estar, higiene e profissionalismo. Conheça como trabalhamos no Paraíso de Aves.</p>
  <div class="trust-pills">
    <span>✓ Registo oficial autonómico</span>
    <span>✓ Protocolo veterinário próprio</span>
    <span>✓ Bem-estar animal certificado</span>
    <span>✓ Higiene de máximo nível</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Um criadeiro com vocação de excelência</h2>
    <p>O Paraíso de Aves não é uma loja de animais. É um criadeiro especializado em psitacídeos exóticos com mais de 25 anos de história, localizado em Llíria, na Comunitat Valenciana (Espanha). Começámos como uma pequena paixão familiar e crescemos até nos tornarmos um dos criadeiros mais respeitados de Espanha, com aves enviadas para toda a Europa — incluindo Portugal.</p>
    <p>As nossas instalações foram concebidas e melhoradas continuamente com um único objetivo: garantir o máximo bem-estar de cada ave, desde o ovo até à entrega à nova família.</p>
    <div class="highlight-box">
      <strong>Núcleo Zoológico Registado:</strong> Operamos com registo oficial na Comunitat Valenciana, cumprindo a Lei 42/2007, o Regulamento CE 338/97 e a Convenção CITES. Cada ave sai com documentação 100% legal e rastreável.
    </div>
  </section>

  <section class="section">
    <h2>Zonas do criadeiro</h2>
    <h3>1. Sala de incubação e eclosão</h3>
    <p>Dispomos de incubadoras de precisão de última geração onde controlamos temperatura e humidade especificamente adaptadas a cada espécie. Os ovos são monitorizados diariamente e os ninhos são girados regularmente. A temperatura de incubação varia consoante a espécie.</p>
    <h3>2. Sala de criação à mão (handfeeding)</h3>
    <p>É o coração emocional do criadeiro. Aqui, filhotes desde as primeiras horas de vida recebem alimentação manual a cada 2-4 horas com papa especializada conforme espécie e idade. A temperatura da sala mantém-se entre 32°C para recém-nascidos e vai reduzindo progressivamente até à temperatura ambiente.</p>
    <h3>3. Sala de socialização</h3>
    <p>Quando os filhotes estão suficientemente desenvolvidos, passam para a sala de socialização, onde são realizadas sessões diárias de contacto humano, exposição a diferentes sons e vozes, e aprendizagem de vocalizações básicas. Esta fase é crítica para o desenvolvimento psicológico do papagaio.</p>
    <h3>4. Voadores exteriores</h3>
    <p>Os nossos voadores exteriores medem entre 4×2×2m e 6×3×2.5m dependendo da espécie. O acesso ao sol, ao ar fresco e ao exercício de voo são fundamentais para a saúde física e mental do papagaio.</p>
    <h3>5. Zona de quarentena</h3>
    <p>Cada nova ave que entra no nosso criadeiro passa obrigatoriamente por um período de quarentena de 30 dias numa sala completamente isolada. Durante este período realizam-se análises sanguíneas, coproculturas e observação clínica diária.</p>
    <h3>6. Sala de assistência veterinária</h3>
    <p>Dispomos de uma sala de assistência veterinária equipada para diagnóstico básico. O nosso veterinário colaborador de referência é especialista em medicina de aves exóticas e realiza visitas periódicas ao criadeiro.</p>
  </section>

  <section class="section">
    <h2>Protocolos de higiene e biossegurança</h2>
    <ul>
      <li><strong>Limpeza diária</strong> de comedouros, bebedouros e fundos de gaiolas</li>
      <li><strong>Desinfeção semanal</strong> com desinfetantes seguros para psitacídeos</li>
      <li><strong>Rotação de poleiros e brinquedos</strong> para evitar acumulação de bactérias</li>
      <li><strong>Acesso restrito</strong> — apenas pessoal autorizado e visitas com protocolo de biossegurança</li>
      <li><strong>Controlo de pragas</strong> trimestral por empresa especializada</li>
    </ul>
  </section>

  <section class="section">
    <h2>Alimentação e nutrição no criadeiro</h2>
    <p>Cada manhã, a nossa equipa prepara os alimentos frescos do dia: fruta da época cortada, verduras variadas, papa fresca para filhotes e cereais cozidos. Nunca utilizamos alimentos pré-embalados como base da alimentação. A água do criadeiro passa por um sistema de filtração de tripla etapa que elimina cloro, metais pesados e bactérias.</p>
  </section>

  <section class="gallery-section">
    <h2>Galeria das Nossas Instalações</h2>
    <div class="photo-grid">${galleryItems(instalacionesPhotos,'pt')}</div>
  </section>

  <section class="section">
    <h2>Perguntas frequentes sobre o criadeiro</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Posso visitar o criadeiro antes de adotar?</div><div class="faq-a">Sim, as visitas são possíveis mediante marcação e sob protocolos de biossegurança. Escreva-nos por email para coordenar.</div></div>
      <div class="faq-item"><div class="faq-q">O criadeiro está registado oficialmente?</div><div class="faq-a">Sim, operamos como núcleo zoológico registado na Comunitat Valenciana, cumprindo a Lei 42/2007, o Convenio CITES e o Regulamento CE 338/97.</div></div>
      <div class="faq-item"><div class="faq-q">Como garantem a saúde das aves?</div><div class="faq-a">Controlo de peso diário, revisões veterinárias periódicas, quarentena de 30 dias, água filtrada, limpeza e desinfeção diárias, e alimentação fresca preparada nas nossas cozinhas.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Quer conhecer o nosso criadeiro?</h3>
    <p>Escreva-nos para marcar uma visita ou para esclarecer qualquer dúvida sobre como trabalhamos.</p>
    <a href="${BASE}/pt/contacto/" class="btn-gold">Contactar por email</a>
  </div>

</main>
<aside>
  ${contactFormPT('instalacoes')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Mais Informação</h4><ul>
    <li><a href="${BASE}/pt/papagaios-disponiveis/">🦜 Papagaios Disponíveis</a></li>
    <li><a href="${BASE}/pt/papagaios-a-venda-portugal/">📋 Comprar em Portugal</a></li>
    <li><a href="${BASE}/pt/contacto/">✉ Contacto</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerPT()}
${lightboxJS()}
</body></html>`;
}

function generateInstalacionesFR(){
  return `${head({lang:'fr',title:'Nos Installations | Élevage de Perroquets à Llíria, Valence | Paraisodeaves',desc:'Découvrez les installations de Paraíso de Aves: élevage enregistré avec zones d\'élevage, socialisation, quarantaine et soins vétérinaires à Llíria, Valence, Espagne.',canonical:'/fr/nos-installations/',esPath:'/nuestras-instalaciones/',ptPath:'/pt/as-nossas-instalacoes/',frPath:'/fr/nos-installations/',ogImage:'loro-gris-01.webp'})}
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","url":"${BASE}/fr/nos-installations/","name":"Nos Installations | Élevage Paraisodeaves","description":"Visite virtuelle des installations de Paraíso de Aves: zones d'élevage, socialisation, quarantaine, alimentation et soins vétérinaires.","inLanguage":"fr-FR"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},{"@type":"ListItem","position":2,"name":"Nos Installations","item":"${BASE}/fr/nos-installations/"}]}
]}</script>
</head>
<body>
${navFR()}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/fr/">Accueil</a><span>›</span><span>Nos Installations</span></div></div>

<section class="page-hero">
  <div class="badge">🏛 Noyau Zoologique Enregistré · Llíria, Valence</div>
  <h1>Nos Installations</h1>
  <p class="subtitle">Plus de 25 ans d'élevage de perroquets dans les meilleures conditions de bien-être, d'hygiène et de professionnalisme. Découvrez comment nous travaillons chez Paraíso de Aves.</p>
  <div class="trust-pills">
    <span>✓ Enregistrement officiel régional</span>
    <span>✓ Protocole vétérinaire propre</span>
    <span>✓ Bien-être animal certifié</span>
    <span>✓ Hygiène de niveau maximum</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Un élevage avec une vocation d'excellence</h2>
    <p>Paraíso de Aves n'est pas une animalerie. C'est un élevage spécialisé en psittacidés exotiques avec plus de 25 ans d'histoire, situé à Llíria, dans la Communauté Valencienne (Espagne). Nous avons commencé comme une petite passion familiale et nous sommes devenus l'un des élevages les plus respectés d'Espagne, avec des oiseaux livrés dans toute l'Europe — dont la France.</p>
    <p>Nos installations ont été conçues et améliorées continuellement avec un seul objectif: garantir le maximum de bien-être à chaque oiseau, depuis l'oeuf jusqu'à la livraison à sa nouvelle famille.</p>
    <div class="highlight-box">
      <strong>Noyau Zoologique Enregistré:</strong> Nous opérons avec un enregistrement officiel dans la Communauté Valencienne, en conformité avec la Loi 42/2007, le Règlement CE 338/97 et la Convention CITES. Chaque oiseau part avec une documentation 100% légale et traçable.
    </div>
  </section>

  <section class="section">
    <h2>Zones de notre élevage</h2>
    <h3>1. Salle d'incubation et d'éclosion</h3>
    <p>Nous disposons d'incubateurs de précision de dernière génération où nous contrôlons la température et l'humidité spécifiquement adaptées à chaque espèce. Les oeufs sont surveillés quotidiennement. La température d'incubation varie selon l'espèce: les aras incubent à 37,2°C avec 55% d'humidité, tandis que les gris du Gabon nécessitent 37,5°C et 50% d'humidité relative.</p>
    <h3>2. Salle d'élevage à la main (handfeeding)</h3>
    <p>C'est le coeur émotionnel de l'élevage. Ici, des oisillons dès leurs premières heures de vie reçoivent une alimentation manuelle toutes les 2-4 heures avec une bouillie spécialisée selon l'espèce et l'âge. La température de la salle est maintenue entre 32°C pour les nouveau-nés et diminue progressivement jusqu'à la température ambiante.</p>
    <h3>3. Salle de socialisation</h3>
    <p>Lorsque les oisillons sont suffisamment développés, ils passent en salle de socialisation pour des sessions quotidiennes de contact humain, d'exposition à différents sons et voix, et d'apprentissage des vocalisations de base. Cette phase est critique pour le développement psychologique du perroquet.</p>
    <h3>4. Volières extérieures</h3>
    <p>Nos volières extérieures mesurent entre 4×2×2m et 6×3×2.5m selon l'espèce. L'accès au soleil, à l'air frais et à l'exercice de vol sont fondamentaux pour la santé physique et mentale du perroquet.</p>
    <h3>5. Zone de quarantaine</h3>
    <p>Tout nouvel oiseau entrant dans notre élevage passe obligatoirement par une quarantaine de 30 jours dans une salle complètement isolée. Pendant cette période, des analyses sanguines, coprologies et observations cliniques quotidiennes sont effectuées.</p>
    <h3>6. Salle de soins vétérinaires</h3>
    <p>Nous disposons d'une salle de soins vétérinaires équipée pour le diagnostic de base. Notre vétérinaire référent est spécialiste en médecine des oiseaux exotiques et effectue des visites périodiques dans l'élevage.</p>
  </section>

  <section class="section">
    <h2>Protocoles d'hygiène et de biosécurité</h2>
    <ul>
      <li><strong>Nettoyage quotidien</strong> des mangeoires, abreuvoirs et fonds de cage</li>
      <li><strong>Désinfection hebdomadaire</strong> avec des produits sûrs pour les oiseaux (sans phénol, sans chlore excessif)</li>
      <li><strong>Rotation des perchoirs et jouets</strong> pour éviter l'accumulation de bactéries</li>
      <li><strong>Accès restreint</strong> — uniquement le personnel autorisé et les visiteurs avec protocole de biosécurité</li>
      <li><strong>Contrôle des nuisibles</strong> trimestriel par une entreprise spécialisée</li>
    </ul>
  </section>

  <section class="section">
    <h2>Alimentation et nutrition dans l'élevage</h2>
    <p>Chaque matin, notre équipe prépare les aliments frais du jour: fruits de saison découpés, légumes variés, bouillie fraîche pour les oisillons et céréales cuites. L'eau passe par un système de filtration à triple étage éliminant le chlore, les métaux lourds et les bactéries. Les abreuvoirs sont vidés, nettoyés et remplis d'eau fraîche deux fois par jour.</p>
  </section>

  <section class="gallery-section">
    <h2>Galerie de nos Installations</h2>
    <div class="photo-grid">${galleryItems(instalacionesPhotos,'fr')}</div>
  </section>

  <section class="section">
    <h2>Questions fréquentes sur l'élevage</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Puis-je visiter l'élevage avant d'adopter?</div><div class="faq-a">Oui, les visites sont possibles sur rendez-vous et sous protocoles de biosécurité. Écrivez-nous par email pour coordonner.</div></div>
      <div class="faq-item"><div class="faq-q">L'élevage est-il officiellement enregistré?</div><div class="faq-a">Oui, nous opérons en tant que noyau zoologique enregistré dans la Communauté Valencienne, conformément à la Loi 42/2007, la Convention CITES et le Règlement CE 338/97.</div></div>
      <div class="faq-item"><div class="faq-q">Comment garantissez-vous la santé des oiseaux?</div><div class="faq-a">Contrôle du poids quotidien, visites vétérinaires périodiques, quarantaine de 30 jours, eau filtrée, nettoyage et désinfection quotidiens, et alimentation fraîche préparée dans nos cuisines.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Vous souhaitez visiter notre élevage?</h3>
    <p>Écrivez-nous pour organiser une visite ou pour répondre à toutes vos questions sur notre façon de travailler.</p>
    <a href="${BASE}/fr/contact/" class="btn-gold">Nous contacter</a>
    <a href="${BASE}/fr/perroquets-disponibles/" class="btn-outline">Perroquets disponibles</a>
  </div>

</main>
<aside>
  ${contactFormFR('installations')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Plus d'informations</h4><ul>
    <li><a href="${BASE}/fr/perroquets-disponibles/">🦜 Perroquets Disponibles</a></li>
    <li><a href="${BASE}/fr/processus-adoption/">🤝 Processus d'adoption</a></li>
    <li><a href="${BASE}/fr/garantie-sante/">🏥 Garantie santé</a></li>
    <li><a href="${BASE}/fr/contact/">✉ Contact</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerFR()}
${lightboxJS()}
</body></html>`;
}

/* ════════════════════════════════════════════════════
   TOPIC 4 — JUGUETES NATURALES / BRINQUEDOS NATURAIS / JOUETS NATURELS
════════════════════════════════════════════════════ */

const juguetesPhotos = [
  {slug:'juguetes-naturales-para-loros',icon:'🌿',altEs:'Juguetes naturales de madera para loros psitácidos',altPt:'Brinquedos naturais de madeira para papagaios psitacídeos',altFr:'Jouets naturels en bois pour perroquets psittacidés',captionEs:'Selección de juguetes naturales para loros: madera, sisal y fibras naturales',captionPt:'Seleção de brinquedos naturais para papagaios: madeira, sisal e fibras naturais',captionFr:'Sélection de jouets naturels pour perroquets: bois, sisal et fibres naturelles'},
  {slug:'juguete-madera-guacamayo',icon:'🪵',altEs:'Juguete de madera para guacamayos — resistente y seguro',altPt:'Brinquedo de madeira para araras — resistente e seguro',altFr:'Jouet en bois pour aras — résistant et sûr',captionEs:'Juguetes de madera dura para guacamayos: eucalipto, olmo, pino no tratado',captionPt:'Brinquedos de madeira dura para araras: eucalipto, olmo, pinheiro não tratado',captionFr:'Jouets en bois dur pour aras: eucalyptus, orme, pin non traité'},
  {slug:'columpio-natural-loros',icon:'🎠',altEs:'Columpio natural de madera y sisal para loros',altPt:'Baloiço natural de madeira e sisal para papagaios',altFr:'Balançoire naturelle en bois et sisal pour perroquets',captionEs:'Columpio natural: ejercicio físico y estimulación del equilibrio',captionPt:'Baloiço natural: exercício físico e estimulação do equilíbrio',captionFr:'Balançoire naturelle: exercice physique et stimulation de l\'équilibre'},
  {slug:'juguete-forrajeo-papagayos',icon:'🎯',altEs:'Juguete de forrajeo para estimulación mental del loro',altPt:'Brinquedo de forrageamento para estimulação mental do papagaio',altFr:'Jouet de fourragement pour la stimulation mentale du perroquet',captionEs:'Juguetes forrajeadores: el loro trabaja para conseguir su comida — estimulación máxima',captionPt:'Brinquedos de forrageamento: o papagaio trabalha para obter comida — estimulação máxima',captionFr:'Jouets de fourragement: le perroquet travaille pour obtenir sa nourriture — stimulation maximale'},
  {slug:'cuerdas-naturales-loros-trepar',icon:'🪢',altEs:'Cuerdas naturales de sisal y algodón para loros',altPt:'Cordas naturais de sisal e algodão para papagaios',altFr:'Cordes naturelles en sisal et coton pour perroquets',captionEs:'Cuerdas trenzadas de sisal y algodón: seguras, naturales y estimulantes',captionPt:'Cordas trançadas de sisal e algodão: seguras, naturais e estimulantes',captionFr:'Cordes tressées en sisal et coton: sûres, naturelles et stimulantes'},
  {slug:'perchas-madera-natural-loro',icon:'🌲',altEs:'Perchas de madera natural sin tratar para loros',altPt:'Poleiros de madeira natural não tratada para papagaios',altFr:'Perchoirs en bois naturel non traité pour perroquets',captionEs:'Perchas naturales: manzano, sauce, fresno — mantienen el pico en perfecto estado',captionPt:'Poleiros naturais: macieira, salgueiro, freixo — mantêm o bico em perfeito estado',captionFr:'Perchoirs naturels: pommier, saule, frêne — gardent le bec en parfait état'},
  {slug:'juguete-destruir-loros',icon:'💥',altEs:'Juguetes destructibles para loros: satisfacen el instinto de masticar',altPt:'Brinquedos destruíveis para papagaios: satisfazem o instinto de mastigar',altFr:'Jouets destructibles pour perroquets: satisfont l\'instinct de mâcher',captionEs:'Juguetes para destruir: cartón, papel kraft, palitos de madera — normales y saludables',captionPt:'Brinquedos para destruir: cartão, papel kraft, pauzinhos de madeira — normais e saudáveis',captionFr:'Jouets à détruire: carton, papier kraft, bâtonnets de bois — normal et sain'},
  {slug:'piña-natural-loro-jugar',icon:'🌲',altEs:'Piña natural como juguete destructible y enriquecimiento',altPt:'Pinha natural como brinquedo destruível e enriquecimento',altFr:'Pomme de pin naturelle comme jouet destructible et enrichissement',captionEs:'Piñas naturales: enriquecimiento gratuito y sostenible para loros',captionPt:'Pinhas naturais: enriquecimento gratuito e sustentável para papagaios',captionFr:'Pommes de pin naturelles: enrichissement gratuit et durable pour perroquets'},
  {slug:'escalera-madera-loros-escalar',icon:'🪜',altEs:'Escalera de madera natural para escalar — estimulación física',altPt:'Escada de madeira natural para trepar — estimulação física',altFr:'Échelle en bois naturel pour grimper — stimulation physique',captionEs:'Escalera de madera: trepar activa músculos y estimula la coordinación',captionPt:'Escada de madeira: trepar ativa músculos e estimula a coordenação',captionFr:'Échelle en bois: grimper active les muscles et stimule la coordination'},
  {slug:'campanas-loros-sonido',icon:'🔔',altEs:'Campanas y elementos sonoros para loros — estimulación auditiva',altPt:'Campainhas e elementos sonoros para papagaios — estimulação auditiva',altFr:'Clochettes et éléments sonores pour perroquets — stimulation auditive',captionEs:'Campanas de acero inoxidable: los loros adoran los sonidos que ellos mismos producen',captionPt:'Campainhas de aço inoxidável: os papagaios adoram os sons que eles próprios produzem',captionFr:'Clochettes en acier inoxydable: les perroquets adorent les sons qu\'ils produisent eux-mêmes'},
  {slug:'juguete-acrílico-loro-seguro',icon:'🔷',altEs:'Juguetes de acrílico seguro para loros — sin BPA',altPt:'Brinquedos de acrílico seguro para papagaios — sem BPA',altFr:'Jouets en acrylique sûr pour perroquets — sans BPA',captionEs:'Acrílico certificado sin BPA: componentes seguros y fáciles de limpiar',captionPt:'Acrílico certificado sem BPA: componentes seguros e fáceis de limpar',captionFr:'Acrylique certifié sans BPA: composants sûrs et faciles à nettoyer'},
  {slug:'plumas-naturales-decoracion-loro',icon:'🪶',altEs:'Plumas naturales como elemento de enriquecimiento para loros',altPt:'Penas naturais como elemento de enriquecimento para papagaios',altFr:'Plumes naturelles comme élément d\'enrichissement pour perroquets',captionEs:'Plumas naturales: elemento táctil y visual que despierta la curiosidad',captionPt:'Penas naturais: elemento tátil e visual que desperta a curiosidade',captionFr:'Plumes naturelles: élément tactile et visuel qui éveille la curiosité'},
  {slug:'juguetes-pequeños-periquitos',icon:'💚',altEs:'Juguetes pequeños para periquitos y agapornis',altPt:'Brinquedos pequenos para periquitos e inseparáveis',altFr:'Petits jouets pour perruches et inséparables',captionEs:'Juguetes a escala para especies pequeñas: tamaño y peso adaptados',captionPt:'Brinquedos à escala para espécies pequenas: tamanho e peso adaptados',captionFr:'Jouets adaptés pour petites espèces: taille et poids ajustés'},
  {slug:'juguetes-grandes-guacamayos',icon:'🦜',altEs:'Juguetes grandes y robustos para guacamayos',altPt:'Brinquedos grandes e robustos para araras',altFr:'Grands jouets robustes pour aras',captionEs:'Juguetes reforzados para guacamayos: soportan la fuerza de su pico poderoso',captionPt:'Brinquedos reforçados para araras: suportam a força do seu bico poderoso',captionFr:'Jouets renforcés pour aras: résistant à la force de leur puissant bec'},
  {slug:'rotacion-juguetes-loros-semana',icon:'🔄',altEs:'Rotación semanal de juguetes para evitar aburrimiento',altPt:'Rotação semanal de brinquedos para evitar o tédio',altFr:'Rotation hebdomadaire des jouets pour éviter l\'ennui',captionEs:'Rotación cada 7-10 días: el efecto novedad reactiva el interés del loro',captionPt:'Rotação a cada 7-10 dias: o efeito novidade reativa o interesse do papagaio',captionFr:'Rotation tous les 7-10 jours: l\'effet nouveauté réactive l\'intérêt du perroquet'},
  {slug:'juguete-sisal-fibra-natural',icon:'🟫',altEs:'Juguete de sisal y fibras naturales para loros',altPt:'Brinquedo de sisal e fibras naturais para papagaios',altFr:'Jouet en sisal et fibres naturelles pour perroquets',captionEs:'Sisal natural: textura perfecta para masticar sin peligro',captionPt:'Sisal natural: textura perfeita para mastigar sem perigo',captionFr:'Sisal naturel: texture parfaite pour mâcher en toute sécurité'},
  {slug:'forrajeo-caja-escondite-comida',icon:'📦',altEs:'Caja de forrajeo con comida escondida para loros',altPt:'Caixa de forrageamento com comida escondida para papagaios',altFr:'Boîte de fourragement avec nourriture cachée pour perroquets',captionEs:'Cajas forrajeadoras: esconder comida activa el instinto natural de búsqueda',captionPt:'Caixas de forrageamento: esconder comida ativa o instinto natural de procura',captionFr:'Boîtes de fourragement: cacher la nourriture active l\'instinct naturel de recherche'},
  {slug:'juguetes-acrílico-espejo',icon:'🪞',altEs:'Espejo y juguetes de acrílico seguros para loros medianos',altPt:'Espelho e brinquedos de acrílico seguros para papagaios médios',altFr:'Miroir et jouets en acrylique sûrs pour perroquets de taille moyenne',captionEs:'Espejos solo para solitarios: los loros en pareja no necesitan espejo',captionPt:'Espelhos apenas para solitários: os papagaios em casal não precisam de espelho',captionFr:'Miroirs uniquement pour les solitaires: les perroquets en couple n\'en ont pas besoin'},
  {slug:'cadena-eslabones-segura-loro',icon:'⛓️',altEs:'Cadena de eslabones de acero inoxidable para colgar juguetes',altPt:'Corrente de elos de aço inoxidável para pendurar brinquedos',altFr:'Chaîne à maillons en acier inoxydable pour accrocher des jouets',captionEs:'Cadenas de acero: para colgar juguetes de forma segura en la jaula',captionPt:'Correntes de aço: para pendurar brinquedos de forma segura na gaiola',captionFr:'Chaînes en acier: pour accrocher des jouets de manière sûre dans la cage'},
  {slug:'palos-bambú-loros',icon:'🎋',altEs:'Palos de bambú natural para loros — seguro y destruible',altPt:'Pauzinhos de bambu natural para papagaios — seguro e destruível',altFr:'Bâtonnets de bambou naturel pour perroquets — sûrs et destructibles',captionEs:'Bambú natural: fibra segura para masticar, destruir y explorar',captionPt:'Bambu natural: fibra segura para mastigar, destruir e explorar',captionFr:'Bambou naturel: fibre sûre pour mâcher, détruire et explorer'},
  {slug:'percha-rope-algodón-natural',icon:'🧶',altEs:'Percha de cuerda de algodón natural para loros',altPt:'Poleiro de corda de algodão natural para papagaios',altFr:'Perchoir en corde de coton naturel pour perroquets',captionEs:'Perchas de algodón: suavidad para las patas y entretenimiento a la vez',captionPt:'Poleiros de algodão: suavidade para as patas e entretenimento ao mesmo tempo',captionFr:'Perchoirs en coton: douceur pour les pattes et divertissement simultané'},
  {slug:'juguete-interactivo-inteligencia-loro',icon:'🧩',altEs:'Juguete interactivo de inteligencia para loros — puzle',altPt:'Brinquedo interativo de inteligência para papagaios — puzzle',altFr:'Jouet interactif d\'intelligence pour perroquets — puzzle',captionEs:'Puzzles para loros: abrir cajas, extraer palitos, resolver mecanismos',captionPt:'Puzzles para papagaios: abrir caixas, extrair pauzinhos, resolver mecanismos',captionFr:'Puzzles pour perroquets: ouvrir des boîtes, extraire des bâtonnets, résoudre des mécanismes'},
  {slug:'madera-balsa-destruir-pico',icon:'🪨',altEs:'Bloques de madera de balsa para destruir — pico y entretenimiento',altPt:'Blocos de madeira de balsa para destruir — bico e entretenimento',altFr:'Blocs de bois balsa à détruire — bec et divertissement',captionEs:'Madera de balsa: muy blanda, perfecta para loros pequeños y medianos',captionPt:'Madeira de balsa: muito mole, perfeita para papagaios pequenos e médios',captionFr:'Bois balsa: très tendre, parfait pour les petits et moyens perroquets'},
  {slug:'juguete-colorido-estimulación-visual',icon:'🌈',altEs:'Juguetes coloridos para estimulación visual de los loros',altPt:'Brinquedos coloridos para estimulação visual dos papagaios',altFr:'Jouets colorés pour la stimulation visuelle des perroquets',captionEs:'Los loros ven el espectro UV: los colores brillantes son especialmente estimulantes',captionPt:'Os papagaios vêem o espectro UV: as cores brilhantes são especialmente estimulantes',captionFr:'Les perroquets voient le spectre UV: les couleurs vives sont particulièrement stimulantes'},
  {slug:'troncos-naturales-masticar',icon:'🌳',altEs:'Troncos naturales para masticar y explorar en la jaula',altPt:'Troncos naturais para mastigar e explorar na gaiola',altFr:'Troncs naturels à mâcher et explorer dans la cage',captionEs:'Troncos de madera no tratada: el enriquecimiento más natural y económico',captionPt:'Troncos de madeira não tratada: o enriquecimento mais natural e económico',captionFr:'Troncs de bois non traité: l\'enrichissement le plus naturel et économique'},
  {slug:'juguetes-hojas-frescas-enriquecimiento',icon:'🍃',altEs:'Hojas y ramas frescas como enriquecimiento natural gratuito',altPt:'Folhas e ramos frescos como enriquecimento natural gratuito',altFr:'Feuilles et branches fraîches comme enrichissement naturel gratuit',captionEs:'Ramas frescas de frutales: enriquecimiento natural gratuito y nutritivo',captionPt:'Ramos frescos de árvores de fruto: enriquecimento natural gratuito e nutritivo',captionFr:'Branches fraîches d\'arbres fruitiers: enrichissement naturel gratuit et nutritif'},
  {slug:'colgante-semillas-su-jaula',icon:'🌻',altEs:'Colgante de semillas naturales para loro en jaula',altPt:'Pendente de sementes naturais para papagaio em gaiola',altFr:'Pendant de graines naturelles pour perroquet en cage',captionEs:'Racimos de semillas colgantes: forrajeo natural dentro de la jaula',captionPt:'Cachos de sementes pendentes: forrageamento natural dentro da gaiola',captionFr:'Grappes de graines pendantes: fourragement naturel dans la cage'},
  {slug:'juguetes-sin-metales-pesados-loros',icon:'✅',altEs:'Juguetes certificados sin metales pesados para loros',altPt:'Brinquedos certificados sem metais pesados para papagaios',altFr:'Jouets certifiés sans métaux lourds pour perroquets',captionEs:'Certificación de seguridad: sin zinc, sin plomo, sin pinturas tóxicas',captionPt:'Certificação de segurança: sem zinco, sem chumbo, sem tintas tóxicas',captionFr:'Certification de sécurité: sans zinc, sans plomb, sans peintures toxiques'},
  {slug:'colgantes-yute-natural',icon:'🪡',altEs:'Colgantes de yute natural para loros — textura y masticación',altPt:'Pendentes de juta natural para papagaios — textura e mastigação',altFr:'Pendants en jute naturel pour perroquets — texture et mastication',captionEs:'Yute natural: fibra perfecta para masticar, tirar y destripar',captionPt:'Juta natural: fibra perfeita para mastigar, puxar e destripar',captionFr:'Jute naturel: fibre parfaite pour mâcher, tirer et démembrer'},
  {slug:'red-trepar-loros-habilidades',icon:'🕸️',altEs:'Red de trepar para loros — habilidades motoras y ejercicio',altPt:'Rede de trepar para papagaios — habilidades motoras e exercício',altFr:'Filet d\'escalade pour perroquets — habiletés motrices et exercice',captionEs:'Redes de sisal: trepar ejercita la coordinación y la musculatura de patas',captionPt:'Redes de sisal: trepar exercita a coordenação e a musculatura das patas',captionFr:'Filets en sisal: grimper exercice la coordination et la musculature des pattes'},
  {slug:'juguete-sonido-campana-metal',icon:'🎶',altEs:'Juguete con campanas de metal inoxidable para loros',altPt:'Brinquedo com campainhas de metal inoxidável para papagaios',altFr:'Jouet avec clochettes en métal inoxydable pour perroquets',captionEs:'Campanas de acero inoxidable — el único metal seguro para loros',captionPt:'Campainhas de aço inoxidável — o único metal seguro para papagaios',captionFr:'Clochettes en acier inoxydable — le seul métal sûr pour les perroquets'},
];

function generateJuguetesES(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/juguetes-naturales-para-loros/#webpage","url":"${BASE}/juguetes-naturales-para-loros/","name":"Juguetes Naturales para Loros: Guía de Enriquecimiento 2026","description":"Guía completa sobre los mejores juguetes naturales para loros: madera, sisal, forrajeo, perchas y estimulación mental. Por criadores con 25+ años de experiencia.","inLanguage":"es-ES"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"${BASE}/"},{"@type":"ListItem","position":2,"name":"Juguetes Naturales para Loros","item":"${BASE}/juguetes-naturales-para-loros/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"¿Qué materiales son seguros para los juguetes de loros?","acceptedAnswer":{"@type":"Answer","text":"Los materiales seguros son: madera natural sin tratar (manzano, fresno, sauce, eucalipto, pino sin resina), sisal natural, algodón sin colorantes, acero inoxidable, acrílico sin BPA y cuero sin curtir. Evitar: zinc, plomo, madera pintada o barnizada, plásticos con BPA."}},
{"@type":"Question","name":"¿Con qué frecuencia hay que cambiar los juguetes?","acceptedAnswer":{"@type":"Answer","text":"Lo ideal es rotar los juguetes cada 7-10 días. El loro pierde interés rápidamente en lo que conoce. Un sistema de rotación con 3-4 grupos de juguetes alternativos mantiene la novedad constante. Los juguetes destruidos deben retirarse inmediatamente por seguridad."}},
{"@type":"Question","name":"¿Son peligrosos los espejos para los loros?","acceptedAnswer":{"@type":"Answer","text":"Para loros que viven en pareja o grupo, los espejos no son necesarios y pueden causar confusión. Para un loro solitario, un espejo puede ofrecer compañía visual. Los espejos nunca deben ser el único estímulo social: el contacto humano y el enriquecimiento activo son mucho más importantes."}}
]}
]}</script>`;

  return `${head({lang:'es',title:'Juguetes Naturales para Loros: Guía Completa de Enriquecimiento 2026 | Paraisodeaves',desc:'Guía experta sobre los mejores juguetes naturales para loros: madera, sisal, forrajeo, perchas y estimulación mental. Por criadores con 25 años de experiencia.',canonical:'/juguetes-naturales-para-loros/',esPath:'/juguetes-naturales-para-loros/',ptPath:'/pt/brinquedos-naturais-para-papagaios/',frPath:'/fr/jouets-naturels-pour-perroquets/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navES('Juguetes')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/">Inicio</a><span>›</span><span>Juguetes Naturales para Loros</span></div></div>

<section class="page-hero">
  <div class="badge">🌿 Enriquecimiento Natural · Estimulación Cognitiva</div>
  <h1>Juguetes Naturales para Loros</h1>
  <p class="subtitle">Guía completa sobre los mejores juguetes y elementos de enriquecimiento para loros. Materiales seguros, tipos por especie y cómo mantener a tu loro mentalmente estimulado.</p>
  <div class="trust-pills">
    <span>✓ Materiales 100% naturales</span>
    <span>✓ Sin metales pesados</span>
    <span>✓ Por especie y tamaño</span>
    <span>✓ Basado en etología aviar</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>¿Por qué los loros necesitan juguetes?</h2>
    <p>Los loros son una de las criaturas más inteligentes del planeta. En la naturaleza, pasan entre 4 y 8 horas diarias buscando comida, interactuando con su bandada, explorando el entorno y destruyendo madera para construir nidos. En cautividad, si no ofrecemos alternativas a estas conductas naturales, el loro buscará satisfacerlas de otras formas: arrancándose las plumas, chillando sin parar, destruyendo muebles o volviéndose ansioso y agresivo.</p>
    <p>El enriquecimiento ambiental — que incluye los juguetes pero también las perchas, la disposición de la jaula, los forrajeadores y los estímulos sensoriales — no es un lujo. Es una necesidad básica de bienestar para un animal con la capacidad cognitiva de un loro.</p>
    <div class="highlight-box">
      <strong>Regla clave:</strong> Un loro sin estímulos suficientes durante más de 4-6 horas diarias desarrollará problemas de comportamiento. Los juguetes y el enriquecimiento son medicina preventiva.
    </div>
  </section>

  <section class="section">
    <h2>Materiales seguros para juguetes de loros</h2>
    <p>No todos los materiales son seguros para los loros. El loro masticará y destruirá cualquier elemento que esté en su jaula, por lo que cada material debe ser completamente seguro si es ingerido en pequeñas cantidades.</p>
    <h3>Materiales seguros ✓</h3>
    <table class="specs-table"><thead><tr><th>Material</th><th>Tipo de uso</th><th>Notas</th></tr></thead><tbody>
      <tr><td>Madera natural sin tratar</td><td>Perchas, juguetes destructibles</td><td>Manzano, fresno, sauce, eucalipto, pino sin resina, abedul</td></tr>
      <tr><td>Sisal natural</td><td>Cuerdas, perchas, juguetes</td><td>Sin teñir o con tintes vegetales seguros</td></tr>
      <tr><td>Algodón sin blanquear</td><td>Cuerdas suaves, perchas</td><td>Evitar hilos muy finos que puedan enredarse en dedos</td></tr>
      <tr><td>Acero inoxidable</td><td>Campanas, aros, clips</td><td>El único metal completamente seguro para loros</td></tr>
      <tr><td>Acrílico sin BPA</td><td>Juguetes interactivos</td><td>Certificar que no contiene BPA ni ftalatos</td></tr>
      <tr><td>Cuero sin curtir</td><td>Tiras, colgantes</td><td>Sin tintes, sin productos químicos de curtido</td></tr>
      <tr><td>Papel sin blanquear</td><td>Juguetes destructibles</td><td>Papel kraft, cartón sin tinta');
      <tr><td>Madera de balsa</td><td>Juguetes destructibles blandos</td><td>Muy ligera, ideal para especies pequeñas</td></tr>
      <tr><td>Bambú natural</td><td>Perchas, juguetes</td><td>Sin tratar, sin lacas</td></tr>
      <tr><td>Piñas y elementos naturales</td><td>Forrajeo, destrucción</td><td>Limpiar bien antes de ofrecer</td></tr>
    </tbody></table>
    <h3>Materiales peligrosos ✗</h3>
    <table class="specs-table"><thead><tr><th>Material</th><th>Peligro</th></tr></thead><tbody>
      <tr><td>Zinc (galvanizado)</td><td>Tóxico cuando es ingerido — provoca envenenamiento</td></tr>
      <tr><td>Plomo</td><td>Muy tóxico — presente en algunas soldaduras y pinturas viejas</td></tr>
      <tr><td>Madera pintada/barnizada</td><td>Toxicidad de pinturas y barnices</td></tr>
      <tr><td>Cadenas de metal no inoxidable</td><td>Oxidación y posible toxicidad</td></tr>
      <tr><td>Plásticos con BPA</td><td>Disruptor endocrino — peligroso si lo ingieren</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Tipos de juguetes naturales para loros</h2>
    <h3>1. Juguetes destructibles — el favorito de todos los loros</h3>
    <p>Los loros necesitan destruir. Es un comportamiento absolutamente normal y necesario que en la naturaleza sirve para construir nidos, conseguir comida y marcar territorio. Los mejores juguetes destructibles son los de madera blanda (balsa, pino sin resina), cartón sin tinta, papel kraft arrugado, piñas naturales y mazorcas de maíz secas. Un loro que tiene objetos para destruir es un loro con menos ansiedad y más satisfecho.</p>
    <h3>2. Juguetes de forrajeo</h3>
    <p>El forrajeo — la búsqueda activa de comida — es la actividad que más tiempo ocupa a un loro silvestre. Podemos replicarla en cautividad con juguetes forrajeadores: cajas de cartón donde esconder semillas, bolas de sisal con comida dentro, tubos de papel con fruta escondida o cualquier elemento que el loro deba manipular para acceder a su comida. El forrajeo activa la mente, reduce el estrés y proporciona horas de entretenimiento.</p>
    <h3>3. Juguetes de trepa y ejercicio</h3>
    <p>Las cuerdas de sisal, las escaleras de madera, las redes de algodón y los columpios son esenciales para la actividad física del loro. Trepar, balancearse y colgarse activan la musculatura de las patas y la coordinación. Son especialmente importantes para loros que tienen poco acceso a vuelo libre.</p>
    <h3>4. Perchas naturales</h3>
    <p>Las perchas son más importantes de lo que parece. Una percha de diámetro incorrecto puede provocar deformidades en las patas y dolor crónico. Las perchas naturales de diferentes diámetros y texturas ejercitan los músculos del pie y mantienen el pico en buen estado cuando el loro las mordisquea. Especies recomendadas: manzano, peral, fresno, sauce llorón, eucalipto y abedul. Evitar: aguacatero, pino con resina y cualquier árbol tratado con pesticidas.</p>
    <h3>5. Juguetes sensoriales y sonoros</h3>
    <p>Las campanas de acero inoxidable, los elementos con texturas diferentes y los colores brillantes estimulan los sentidos del loro. Los psitácidos ven en el espectro UV, por lo que los colores que a nosotros nos parecen "muy brillantes" son especialmente atractivos para ellos.</p>
    <h3>6. Juguetes interactivos de inteligencia</h3>
    <p>Los puzzles para aves — cajas con mecanismos para abrir, sistemas de extracción de palitos, torres de anillas — son el nivel más alto de enriquecimiento cognitivo. Están especialmente recomendados para los loros más inteligentes: yacos, guacamayos y cacatúas. Un loro resolviendo un puzzle puede mantenerse concentrado 20-30 minutos, lo que equivale a varias horas de aburrimiento pasivo.</p>
  </section>

  <section class="section">
    <h2>Juguetes recomendados por especie</h2>
    <table class="specs-table"><thead><tr><th>Especie</th><th>Tamaño jaula</th><th>Juguetes ideales</th><th>A evitar</th></tr></thead><tbody>
      <tr><td>Periquito / Agapornis</td><td>Mini</td><td>Espejitos, cuerdas finas, escaleras pequeñas, campanas</td><td>Juguetes grandes con partes pesadas</td></tr>
      <tr><td>Cacatúa Ninfa</td><td>Pequeño-Medio</td><td>Cuerdas algodón, destruibles balsa, columpios medianos</td><td>Piezas muy pequeñas que pueda tragar</td></tr>
      <tr><td>Amazona / Yaco</td><td>Grande</td><td>Puzzles, forrajeadores, madera dura, cuerdas sisal</td><td>Zinc, plástico blando, cadenas galvanizadas</td></tr>
      <tr><td>Cacatúa grande</td><td>Extra grande</td><td>Madera dura, cuerdas gruesas, elementos sonoros</td><td>Todo lo de plástico blando (lo destrozan en segundos)</td></tr>
      <tr><td>Guacamayo</td><td>Extra grande</td><td>Madera muy dura, troncos, cuerdas de barco, forrajeadores robustos</td><td>Cualquier elemento de madera blanda o plástico</td></tr>
      <tr><td>Eclectus</td><td>Grande</td><td>Elementos naturales, ramas frescas, forrajeadores con fruta</td><td>Plástico en general — prefieren lo natural</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Sistema de rotación de juguetes</h2>
    <p>La rotación es el secreto de un loro siempre estimulado. Divide los juguetes en 3-4 grupos y rota completamente cada 7-10 días. El loro verá "juguetes nuevos" aunque sean los mismos de hace 3 semanas, porque habrá olvidado parcialmente cómo interactuar con ellos. Este sistema multiplica el valor de tu inversión en juguetes.</p>
    <p>Cuando introduzcas un juguete nuevo, colócalo primero fuera de la jaula para que el loro lo observe. Algunos loros son neofóbicos (miedosos ante lo nuevo) y necesitan tiempo para acostumbrarse a un nuevo elemento. Nunca fuerces al loro a interactuar con un juguete que le da miedo.</p>
  </section>

  <section class="gallery-section">
    <h2>Galería: Juguetes Naturales para Loros</h2>
    <p>Imágenes de referencia de juguetes y elementos de enriquecimiento natural. Se actualizan con fotografías reales del criadero.</p>
    <div class="photo-grid">${galleryItems(juguetesPhotos,'es')}</div>
  </section>

  <section class="section">
    <h2>Preguntas frecuentes sobre juguetes para loros</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">¿Qué materiales son seguros para los juguetes de loros?</div><div class="faq-a">Madera natural sin tratar (manzano, fresno, sauce, eucalipto, pino sin resina), sisal natural, algodón sin colorantes, acero inoxidable, acrílico sin BPA y cuero sin curtir. Evitar siempre zinc, plomo, madera pintada o barnizada y plásticos con BPA.</div></div>
      <div class="faq-item"><div class="faq-q">¿Con qué frecuencia hay que cambiar los juguetes?</div><div class="faq-a">Lo ideal es rotar los juguetes cada 7-10 días. El loro pierde interés en lo que conoce. Un sistema de rotación con 3-4 grupos alternativos mantiene la novedad constante. Los juguetes destruidos deben retirarse inmediatamente por seguridad.</div></div>
      <div class="faq-item"><div class="faq-q">¿Son peligrosos los espejos para los loros?</div><div class="faq-a">Para loros en pareja o grupo, los espejos no son necesarios. Para un loro solitario, un espejo puede ofrecer compañía visual. Nunca debe ser el único estímulo: el contacto humano y el enriquecimiento activo son mucho más importantes.</div></div>
      <div class="faq-item"><div class="faq-q">¿Por qué mi loro destroza todos los juguetes tan rápido?</div><div class="faq-a">¡Es completamente normal! Destruir es un comportamiento natural y necesario. Un loro que destruye juguetes es un loro sano y activo. Invierte en juguetes de madera blanda como la balsa para las sesiones de destrucción, y reserva las maderas más duras para las perchas.</div></div>
      <div class="faq-item"><div class="faq-q">¿Cuántos juguetes necesita un loro en su jaula?</div><div class="faq-a">Entre 3-6 juguetes en rotación activa, más las perchas (al menos 2-3 de diferente diámetro). Demasiados juguetes a la vez pueden resultar abrumadores. Poco a poco aprenderás qué tipos prefiere tu loro.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>¿Quieres saber más sobre el bienestar de tu loro?</h3>
    <p>Nuestro equipo de criadores te orienta sobre las mejores opciones de enriquecimiento para tu especie.</p>
    <a href="${BASE}/#contacto" class="btn-gold">Consultar por email</a>
    <a href="${BASE}/cuidados-basicos-de-un-loro" class="btn-outline">Cuidados básicos</a>
  </div>

  <section class="section">
    <h2>Artículos relacionados</h2>
    <div class="article-grid">
      <div class="article-card"><h3><a href="${BASE}/cuidados-basicos-de-un-loro">Cuidados básicos de un loro</a></h3><p>Guía completa de bienestar diario para tu ave.</p></div>
      <div class="article-card"><h3><a href="${BASE}/comida-para-loros/">Comida para loros</a></h3><p>La mejor alimentación para cada especie.</p></div>
      <div class="article-card"><h3><a href="${BASE}/blog/jaula-ideal-loro-tamano.html">Jaula ideal para loros</a></h3><p>Cómo elegir y equipar la jaula perfecta.</p></div>
      <div class="article-card"><h3><a href="${BASE}/aves-disponibles/">Aves disponibles</a></h3><p>Loros criados a mano con CITES en nuestro criadero.</p></div>
    </div>
  </section>

</main>
<aside>
  ${contactFormES('juguetes')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Guías de Cuidados</h4><ul>
    <li><a href="${BASE}/cuidados-basicos-de-un-loro">Cuidados básicos</a></li>
    <li><a href="${BASE}/comida-para-loros/">Comida para loros</a></li>
    <li><a href="${BASE}/documentos-legales-para-adoptar-un-loro">CITES y documentación</a></li>
    <li><a href="${BASE}/errores-comunes-al-adoptar-un-loro">Errores comunes</a></li>
    <li><a href="${BASE}/blog/jaula-ideal-loro-tamano.html">Jaula ideal</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerES()}
${lightboxJS()}
</body></html>`;
}

function generateJuguetesPT(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","url":"${BASE}/pt/brinquedos-naturais-para-papagaios/","name":"Brinquedos Naturais para Papagaios: Guia de Enriquecimento 2026","description":"Guia completo sobre os melhores brinquedos naturais para papagaios: madeira, sisal, forrageamento, poleiros e estimulação mental.","inLanguage":"pt-PT"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"${BASE}/pt/"},{"@type":"ListItem","position":2,"name":"Brinquedos Naturais","item":"${BASE}/pt/brinquedos-naturais-para-papagaios/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Que materiais são seguros para brinquedos de papagaios?","acceptedAnswer":{"@type":"Answer","text":"Madeira natural não tratada (macieira, freixo, salgueiro, eucalipto, pinheiro sem resina), sisal natural, algodão sem corantes, aço inoxidável, acrílico sem BPA e couro não curtido. Evitar sempre zinco, chumbo, madeira pintada ou envernizada e plásticos com BPA."}},
{"@type":"Question","name":"Com que frequência se devem trocar os brinquedos?","acceptedAnswer":{"@type":"Answer","text":"O ideal é rodar os brinquedos a cada 7-10 dias. O papagaio perde rapidamente o interesse no que já conhece. Um sistema de rotação com 3-4 grupos alternados mantém a novidade constante. Os brinquedos destruídos devem ser retirados imediatamente por segurança."}}
]}
]}</script>`;

  return `${head({lang:'pt',title:'Brinquedos Naturais para Papagaios: Guia de Enriquecimento 2026 | Paraisodeaves',desc:'Guia especializado sobre os melhores brinquedos naturais para papagaios: madeira, sisal, forrageamento, poleiros e estimulação mental. Por criadores com 25 anos de experiência.',canonical:'/pt/brinquedos-naturais-para-papagaios/',esPath:'/juguetes-naturales-para-loros/',ptPath:'/pt/brinquedos-naturais-para-papagaios/',frPath:'/fr/jouets-naturels-pour-perroquets/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navPT('Brinquedos')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/pt/">Início</a><span>›</span><span>Brinquedos Naturais para Papagaios</span></div></div>

<section class="page-hero">
  <div class="badge">🌿 Enriquecimento Natural · Estimulação Cognitiva</div>
  <h1>Brinquedos Naturais para Papagaios</h1>
  <p class="subtitle">Guia completo sobre os melhores brinquedos e elementos de enriquecimento para papagaios. Materiais seguros, tipos por espécie e como manter o seu papagaio mentalmente estimulado.</p>
  <div class="trust-pills">
    <span>✓ Materiais 100% naturais</span>
    <span>✓ Sem metais pesados</span>
    <span>✓ Por espécie e tamanho</span>
    <span>✓ Baseado em etologia aviar</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Por que os papagaios precisam de brinquedos?</h2>
    <p>Os papagaios são uma das criaturas mais inteligentes do planeta. Na natureza, passam entre 4 e 8 horas diárias à procura de comida, a interagir com o seu bando, a explorar o ambiente e a destruir madeira para construir ninhos. Em cativeiro, se não oferecermos alternativas a estes comportamentos naturais, o papagaio procurará satisfazê-los de outras formas: arrancando as penas, gritando sem parar, destruindo móveis ou tornando-se ansioso e agressivo.</p>
    <p>O enriquecimento ambiental — que inclui os brinquedos mas também os poleiros, a disposição da gaiola, os forrageadores e os estímulos sensoriais — não é um luxo. É uma necessidade básica de bem-estar para um animal com a capacidade cognitiva de um papagaio.</p>
    <div class="highlight-box">
      <strong>Regra fundamental:</strong> Um papagaio sem estímulos suficientes durante mais de 4-6 horas diárias desenvolverá problemas de comportamento. Os brinquedos e o enriquecimento são medicina preventiva.
    </div>
  </section>

  <section class="section">
    <h2>Materiais seguros para brinquedos de papagaios</h2>
    <table class="specs-table"><thead><tr><th>Material</th><th>Tipo de uso</th><th>Notas</th></tr></thead><tbody>
      <tr><td>Madeira natural não tratada</td><td>Poleiros, brinquedos destruíveis</td><td>Macieira, freixo, salgueiro, eucalipto, pinheiro sem resina</td></tr>
      <tr><td>Sisal natural</td><td>Cordas, poleiros, brinquedos</td><td>Sem tingir ou com corantes vegetais seguros</td></tr>
      <tr><td>Algodão não branqueado</td><td>Cordas suaves, poleiros</td><td>Evitar fios muito finos que possam enrolar nos dedos</td></tr>
      <tr><td>Aço inoxidável</td><td>Campainhas, argolas, clips</td><td>O único metal completamente seguro para papagaios</td></tr>
      <tr><td>Acrílico sem BPA</td><td>Brinquedos interativos</td><td>Certificar que não contém BPA nem ftalatos</td></tr>
      <tr><td>Bambu natural</td><td>Poleiros, brinquedos</td><td>Sem tratamento, sem verniz</td></tr>
      <tr><td>Pinhas e elementos naturais</td><td>Forrageamento, destruição</td><td>Limpar bem antes de oferecer</td></tr>
    </tbody></table>
    <h3>Materiais perigosos ✗</h3>
    <table class="specs-table"><thead><tr><th>Material</th><th>Perigo</th></tr></thead><tbody>
      <tr><td>Zinco (galvanizado)</td><td>Tóxico quando ingerido — provoca envenenamento</td></tr>
      <tr><td>Chumbo</td><td>Muito tóxico — presente em algumas soldas e tintas antigas</td></tr>
      <tr><td>Madeira pintada/envernizada</td><td>Toxicidade das tintas e vernizes</td></tr>
      <tr><td>Plásticos com BPA</td><td>Disruptor endócrino — perigoso se ingerido</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Tipos de brinquedos naturais para papagaios</h2>
    <h3>1. Brinquedos destruíveis</h3>
    <p>Os papagaios precisam de destruir. É um comportamento absolutamente normal e necessário que na natureza serve para construir ninhos, obter comida e marcar território. Os melhores brinquedos destruíveis são de madeira mole (balsa, pinheiro sem resina), cartão sem tinta, papel kraft amachucado, pinhas naturais e espigas de milho secas.</p>
    <h3>2. Brinquedos de forrageamento</h3>
    <p>O forrageamento — a busca ativa de comida — é a atividade que mais tempo ocupa um papagaio silvestre. Podemos replicá-la com brinquedos forrageadores: caixas de cartão onde esconder sementes, bolas de sisal com comida dentro, tubos de papel com fruta escondida ou qualquer elemento que o papagaio deva manipular para aceder à sua comida.</p>
    <h3>3. Brinquedos de trepar e exercício</h3>
    <p>As cordas de sisal, as escadas de madeira, as redes de algodão e os baloiços são essenciais para a atividade física do papagaio. Trepar, balançar e pendurar-se ativam a musculatura das patas e a coordenação.</p>
    <h3>4. Poleiros naturais</h3>
    <p>Os poleiros são mais importantes do que parecem. Um poleiro de diâmetro incorreto pode provocar deformidades nas patas e dor crónica. Os poleiros naturais de diferentes diâmetros e texturas exercitam os músculos do pé e mantêm o bico em bom estado. Espécies recomendadas: macieira, pereira, freixo, salgueiro, eucalipto e bétula.</p>
    <h3>5. Brinquedos de inteligência</h3>
    <p>Os puzzles para aves — caixas com mecanismos para abrir, sistemas de extração de pauzinhos — são o nível mais alto de enriquecimento cognitivo. Especialmente recomendados para papagaios cinzentos, araras e cacatuas.</p>
  </section>

  <section class="section">
    <h2>Brinquedos recomendados por espécie</h2>
    <table class="specs-table"><thead><tr><th>Espécie</th><th>Brinquedos ideais</th></tr></thead><tbody>
      <tr><td>Periquito / Inseparável</td><td>Espelhos pequenos, cordas finas, escadas pequenas, campainhas</td></tr>
      <tr><td>Cacatua-ninfa</td><td>Cordas de algodão, destruíveis de balsa, baloiços médios</td></tr>
      <tr><td>Amazona / Papagaio Cinzento</td><td>Puzzles, forrageadores, madeira dura, cordas de sisal</td></tr>
      <tr><td>Arara</td><td>Madeira muito dura, troncos, cordas grossas, forrageadores robustos</td></tr>
      <tr><td>Eclectus</td><td>Elementos naturais, ramos frescos, forrageadores com fruta</td></tr>
    </tbody></table>
  </section>

  <section class="gallery-section">
    <h2>Galeria: Brinquedos Naturais para Papagaios</h2>
    <div class="photo-grid">${galleryItems(juguetesPhotos,'pt')}</div>
  </section>

  <section class="section">
    <h2>Perguntas frequentes sobre brinquedos para papagaios</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Que materiais são seguros para brinquedos de papagaios?</div><div class="faq-a">Madeira natural não tratada, sisal natural, algodão sem corantes, aço inoxidável, acrílico sem BPA e couro não curtido. Evitar zinco, chumbo, madeira pintada e plásticos com BPA.</div></div>
      <div class="faq-item"><div class="faq-q">Com que frequência se devem trocar os brinquedos?</div><div class="faq-a">O ideal é rodar os brinquedos a cada 7-10 dias. Um sistema de rotação com 3-4 grupos alternados mantém a novidade constante. Os brinquedos destruídos devem ser retirados imediatamente por segurança.</div></div>
      <div class="faq-item"><div class="faq-q">O meu papagaio destrói todos os brinquedos muito rapidamente. É normal?</div><div class="faq-a">Completamente normal! Destruir é um comportamento natural e necessário. Um papagaio que destrói brinquedos é um papagaio saudável e ativo. Invista em brinquedos de madeira mole como a balsa para as sessões de destruição.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Quer saber mais sobre o bem-estar do seu papagaio?</h3>
    <p>A nossa equipa de criadores orienta-o sobre as melhores opções de enriquecimento para a sua espécie.</p>
    <a href="${BASE}/pt/contacto/" class="btn-gold">Consultar por email</a>
    <a href="${BASE}/pt/papagaios-disponiveis/" class="btn-outline">Ver papagaios disponíveis</a>
  </div>

</main>
<aside>
  ${contactFormPT('brinquedos')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Guias de Cuidados</h4><ul>
    <li><a href="${BASE}/pt/comida-para-papagaios/">Comida para papagaios</a></li>
    <li><a href="${BASE}/pt/as-nossas-instalacoes/">As nossas instalações</a></li>
    <li><a href="${BASE}/pt/papagaios-disponiveis/">Papagaios disponíveis</a></li>
    <li><a href="${BASE}/pt/blog/">Blog</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerPT()}
${lightboxJS()}
</body></html>`;
}

function generateJuguetesFR(){
  const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","url":"${BASE}/fr/jouets-naturels-pour-perroquets/","name":"Jouets Naturels pour Perroquets: Guide d'Enrichissement 2026","description":"Guide complet sur les meilleurs jouets naturels pour perroquets: bois, sisal, fourragement, perchoirs et stimulation mentale. Par des éleveurs avec 25+ ans d'expérience.","inLanguage":"fr-FR"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},{"@type":"ListItem","position":2,"name":"Jouets Naturels","item":"${BASE}/fr/jouets-naturels-pour-perroquets/"}]},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Quels matériaux sont sûrs pour les jouets de perroquets?","acceptedAnswer":{"@type":"Answer","text":"Les matériaux sûrs sont: bois naturel non traité (pommier, frêne, saule, eucalyptus, pin sans résine), sisal naturel, coton sans colorants, acier inoxydable, acrylique sans BPA et cuir non tanné. Éviter: zinc, plomb, bois peint ou verni et plastiques avec BPA."}},
{"@type":"Question","name":"À quelle fréquence changer les jouets?","acceptedAnswer":{"@type":"Answer","text":"L'idéal est de faire tourner les jouets tous les 7-10 jours. Le perroquet perd rapidement l'intérêt pour ce qu'il connaît. Un système de rotation avec 3-4 groupes alternés maintient la nouveauté constante."}}
]}
]}</script>`;

  return `${head({lang:'fr',title:'Jouets Naturels pour Perroquets: Guide Complet d\'Enrichissement 2026 | Paraisodeaves',desc:'Guide expert sur les meilleurs jouets naturels pour perroquets: bois, sisal, fourragement, perchoirs et stimulation mentale. Par des éleveurs avec 25 ans d\'expérience en Espagne.',canonical:'/fr/jouets-naturels-pour-perroquets/',esPath:'/juguetes-naturales-para-loros/',ptPath:'/pt/brinquedos-naturais-para-papagaios/',frPath:'/fr/jouets-naturels-pour-perroquets/',ogImage:'loro-gris-01.webp'})}
${schema}
</head>
<body>
${navFR('Jouets')}
<div class="breadcrumb-bar"><div class="inner"><a href="${BASE}/fr/">Accueil</a><span>›</span><span>Jouets Naturels pour Perroquets</span></div></div>

<section class="page-hero">
  <div class="badge">🌿 Enrichissement Naturel · Stimulation Cognitive</div>
  <h1>Jouets Naturels pour Perroquets</h1>
  <p class="subtitle">Guide complet sur les meilleurs jouets et éléments d'enrichissement pour perroquets. Matériaux sûrs, types par espèce et comment garder votre perroquet mentalement stimulé.</p>
  <div class="trust-pills">
    <span>✓ Matériaux 100% naturels</span>
    <span>✓ Sans métaux lourds</span>
    <span>✓ Par espèce et taille</span>
    <span>✓ Basé sur l'éthologie aviaire</span>
  </div>
</section>

<div class="page-wrap">
<main class="main-col">

  <section class="section">
    <h2>Pourquoi les perroquets ont-ils besoin de jouets?</h2>
    <p>Les perroquets sont l'une des créatures les plus intelligentes de la planète. Dans la nature, ils passent entre 4 et 8 heures par jour à chercher de la nourriture, à interagir avec leur groupe, à explorer leur environnement et à détruire du bois pour construire des nids. En captivité, si nous n'offrons pas d'alternatives à ces comportements naturels, le perroquet cherchera à les satisfaire autrement: en s'arrachant les plumes, en criant sans arrêt, en détruisant des meubles ou en devenant anxieux et agressif.</p>
    <p>L'enrichissement environnemental — qui comprend les jouets mais aussi les perchoirs, la disposition de la cage, les mangeoires de fourragement et les stimuli sensoriels — n'est pas un luxe. C'est un besoin fondamental de bien-être pour un animal avec les capacités cognitives d'un perroquet.</p>
    <div class="highlight-box">
      <strong>Règle clé:</strong> Un perroquet sans stimuli suffisants pendant plus de 4-6 heures par jour développera des problèmes de comportement. Les jouets et l'enrichissement sont de la médecine préventive.
    </div>
  </section>

  <section class="section">
    <h2>Matériaux sûrs pour les jouets de perroquets</h2>
    <table class="specs-table"><thead><tr><th>Matériau</th><th>Type d'usage</th><th>Notes</th></tr></thead><tbody>
      <tr><td>Bois naturel non traité</td><td>Perchoirs, jouets destructibles</td><td>Pommier, frêne, saule, eucalyptus, pin sans résine, bouleau</td></tr>
      <tr><td>Sisal naturel</td><td>Cordes, perchoirs, jouets</td><td>Non teint ou avec des teintures végétales sûres</td></tr>
      <tr><td>Coton non blanchi</td><td>Cordes douces, perchoirs</td><td>Éviter les fils très fins qui peuvent s'enrouler autour des doigts</td></tr>
      <tr><td>Acier inoxydable</td><td>Clochettes, anneaux, clips</td><td>Le seul métal complètement sûr pour les perroquets</td></tr>
      <tr><td>Acrylique sans BPA</td><td>Jouets interactifs</td><td>Certifier l'absence de BPA et de phtalates</td></tr>
      <tr><td>Bambou naturel</td><td>Perchoirs, jouets</td><td>Sans traitement, sans laque</td></tr>
      <tr><td>Pommes de pin et éléments naturels</td><td>Fourragement, destruction</td><td>Bien nettoyer avant de proposer</td></tr>
    </tbody></table>
    <h3>Matériaux dangereux ✗</h3>
    <table class="specs-table"><thead><tr><th>Matériau</th><th>Danger</th></tr></thead><tbody>
      <tr><td>Zinc (galvanisé)</td><td>Toxique si ingéré — provoque un empoisonnement</td></tr>
      <tr><td>Plomb</td><td>Très toxique — présent dans certaines soudures et vieilles peintures</td></tr>
      <tr><td>Bois peint/verni</td><td>Toxicité des peintures et vernis</td></tr>
      <tr><td>Plastiques avec BPA</td><td>Perturbateur endocrinien — dangereux si ingéré</td></tr>
    </tbody></table>
  </section>

  <section class="section">
    <h2>Types de jouets naturels pour perroquets</h2>
    <h3>1. Jouets destructibles — le préféré de tous les perroquets</h3>
    <p>Les perroquets ont besoin de détruire. C'est un comportement absolument normal et nécessaire qui, dans la nature, sert à construire des nids, à trouver de la nourriture et à marquer le territoire. Les meilleurs jouets destructibles sont en bois tendre (balsa, pin sans résine), carton sans encre, papier kraft froissé, pommes de pin naturelles et épis de maïs séchés.</p>
    <h3>2. Jouets de fourragement</h3>
    <p>Le fourragement — la recherche active de nourriture — est l'activité qui occupe le plus de temps chez un perroquet sauvage. Nous pouvons la reproduire avec des jouets de fourragement: boîtes en carton où cacher des graines, boules de sisal avec de la nourriture à l'intérieur, tubes de papier avec des fruits cachés ou tout élément que le perroquet doit manipuler pour accéder à sa nourriture.</p>
    <h3>3. Jouets d'escalade et d'exercice</h3>
    <p>Les cordes en sisal, les échelles en bois, les filets en coton et les balançoires sont essentiels pour l'activité physique du perroquet. Grimper, se balancer et se suspendre activent la musculature des pattes et la coordination.</p>
    <h3>4. Perchoirs naturels</h3>
    <p>Les perchoirs sont plus importants qu'il n'y paraît. Un perchoir de diamètre incorrect peut provoquer des déformations des pattes et des douleurs chroniques. Les perchoirs naturels de différents diamètres et textures exercent les muscles du pied et maintiennent le bec en bon état. Espèces recommandées: pommier, poirier, frêne, saule pleureur, eucalyptus et bouleau.</p>
    <h3>5. Jouets interactifs d'intelligence</h3>
    <p>Les puzzles pour oiseaux — boîtes avec des mécanismes à ouvrir, systèmes d'extraction de bâtonnets, tours d'anneaux — représentent le niveau le plus élevé d'enrichissement cognitif. Particulièrement recommandés pour les gris du Gabon, les aras et les cacatoès.</p>
  </section>

  <section class="section">
    <h2>Jouets recommandés par espèce</h2>
    <table class="specs-table"><thead><tr><th>Espèce</th><th>Jouets idéaux</th></tr></thead><tbody>
      <tr><td>Perruche / Inséparable</td><td>Petits miroirs, cordes fines, petites échelles, clochettes</td></tr>
      <tr><td>Calopsitte élevée</td><td>Cordes en coton, destructibles en balsa, balançoires moyennes</td></tr>
      <tr><td>Amazone / Gris du Gabon</td><td>Puzzles, fourrageurs, bois dur, cordes en sisal</td></tr>
      <tr><td>Ara</td><td>Bois très dur, troncs, cordes épaisses, fourrageurs robustes</td></tr>
      <tr><td>Éclectus</td><td>Éléments naturels, branches fraîches, fourrageurs avec fruits</td></tr>
    </tbody></table>
  </section>

  <section class="gallery-section">
    <h2>Galerie: Jouets Naturels pour Perroquets</h2>
    <div class="photo-grid">${galleryItems(juguetesPhotos,'fr')}</div>
  </section>

  <section class="section">
    <h2>Questions fréquentes sur les jouets pour perroquets</h2>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">Quels matériaux sont sûrs pour les jouets de perroquets?</div><div class="faq-a">Bois naturel non traité (pommier, frêne, saule, eucalyptus), sisal naturel, coton sans colorants, acier inoxydable, acrylique sans BPA. Éviter zinc, plomb, bois peint et plastiques avec BPA.</div></div>
      <div class="faq-item"><div class="faq-q">À quelle fréquence changer les jouets?</div><div class="faq-a">Tous les 7-10 jours idéalement. Un système de rotation avec 3-4 groupes alternés maintient la nouveauté constante. Les jouets détruits doivent être retirés immédiatement pour des raisons de sécurité.</div></div>
      <div class="faq-item"><div class="faq-q">Mon perroquet détruit tous ses jouets très vite. Est-ce normal?</div><div class="faq-a">Tout à fait normal! Détruire est un comportement naturel et nécessaire. Un perroquet qui détruit des jouets est un perroquet sain et actif. Investissez dans des jouets en bois tendre comme le balsa pour les sessions de destruction.</div></div>
      <div class="faq-item"><div class="faq-q">Combien de jouets un perroquet a-t-il besoin dans sa cage?</div><div class="faq-a">Entre 3-6 jouets en rotation active, plus les perchoirs (au moins 2-3 de différents diamètres). Trop de jouets à la fois peuvent être déstabilisants. Apprenez progressivement quels types votre perroquet préfère.</div></div>
    </div>
  </section>

  <div class="cta-box">
    <h3>Vous souhaitez en savoir plus sur le bien-être de votre perroquet?</h3>
    <p>Notre équipe d'éleveurs vous guide sur les meilleures options d'enrichissement pour votre espèce.</p>
    <a href="${BASE}/fr/contact/" class="btn-gold">Nous contacter</a>
    <a href="${BASE}/fr/nourriture-pour-perroquets/" class="btn-outline">Nourriture pour perroquets</a>
  </div>

</main>
<aside>
  ${contactFormFR('jouets')}
  <div class="sidebar-card" style="margin-top:22px;"><h4>Guides de Soins</h4><ul>
    <li><a href="${BASE}/fr/nourriture-pour-perroquets/">Nourriture pour perroquets</a></li>
    <li><a href="${BASE}/fr/nos-installations/">Nos installations</a></li>
    <li><a href="${BASE}/fr/perroquets-disponibles/">Perroquets disponibles</a></li>
    <li><a href="${BASE}/fr/blog/">Blog</a></li>
  </ul></div>
</aside>
</div>

${lightboxHTML()}
${footerFR()}
${lightboxJS()}
</body></html>`;
}

/* ════════════════════════════════════════════════════
   RUN — Generate all 12 pages
════════════════════════════════════════════════════ */
function run(){
  const pages = [
    { dir:'comida-para-loros',                           fn: generateComidaES },
    { dir:'pt/comida-para-papagaios',                   fn: generateComidaPT },
    { dir:'fr/nourriture-pour-perroquets',              fn: generateComidaFR },
    { dir:'aves-disponibles',                            fn: generateAvesDispES },
    { dir:'pt/papagaios-disponiveis',                   fn: generateAvesDispPT },
    { dir:'fr/perroquets-disponibles',                  fn: generateAvesDispFR },
    { dir:'nuestras-instalaciones',                      fn: generateInstalacionesES },
    { dir:'pt/as-nossas-instalacoes',                   fn: generateInstalacionesPT },
    { dir:'fr/nos-installations',                        fn: generateInstalacionesFR },
    { dir:'juguetes-naturales-para-loros',               fn: generateJuguetesES },
    { dir:'pt/brinquedos-naturais-para-papagaios',       fn: generateJuguetesPT },
    { dir:'fr/jouets-naturels-pour-perroquets',          fn: generateJuguetesFR },
  ];

  let ok=0, fail=0;
  pages.forEach(p=>{
    try {
      mkdirp(p.dir);
      const html = p.fn();
      fs.writeFileSync(path.join(p.dir,'index.html'), html, 'utf8');
      const kb = Math.round(Buffer.byteLength(html,'utf8')/1024);
      console.log(`✅  ${p.dir}/index.html  (${kb} KB)`);
      ok++;
    } catch(e){
      console.error(`❌  ${p.dir}:`, e.message);
      fail++;
    }
  });
  console.log(`\n📊 Done: ${ok} OK, ${fail} failed`);
}

run();
