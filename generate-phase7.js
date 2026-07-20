#!/usr/bin/env node
/**
 * generate-phase7.js
 * Phase 7 — English expansion (/en/) for United Kingdom & Ireland
 * Generates: homepage, available birds, 12 species pages, knowledge centre (10 articles),
 *            gallery hub, delivery page, 10 UK + 5 Ireland city landing pages, sitemap_en.xml
 *
 * Run: node generate-phase7.js
 */

'use strict';
const fs   = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════
function mkdir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
function write(filePath, content) {
  mkdir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  generated.push(filePath);
}
const generated = [];

// ═══════════════════════════════════════════════════════════════════
// SHARED CSS (injected inline into every EN page)
// ═══════════════════════════════════════════════════════════════════
const BASE_CSS = `
  :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-rich:#E0B75F;--bg:#F8F5F0;--surface:#FFFFFF;--border:#E7E0D2;--text:#1A1A1A;--muted:#5C5C5C;--radius:14px;--shadow:0 4px 24px rgba(0,0,0,.09)}
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;padding-top:64px}
  h1,h2,h3,h4{font-family:'Poppins',Arial,sans-serif;line-height:1.25}
  a{color:var(--primary);text-decoration:none}
  a:hover{color:var(--gold);text-decoration:underline}
  img{max-width:100%;height:auto;display:block}
  /* ── Header ── */
  .site-header{position:fixed;top:0;width:100%;z-index:1000;background:var(--primary);border-bottom:2px solid var(--gold);padding:0 5%}
  .header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px}
  .brand-logo{display:flex;align-items:center;gap:9px;text-decoration:none;flex-shrink:0}
  .brand-name{font-family:'Poppins',Arial,sans-serif;font-weight:900;font-size:1.05rem;color:#fff;letter-spacing:-.01em}
  .main-nav{display:flex;align-items:center;gap:1.4rem;flex-wrap:nowrap}
  .main-nav a{color:rgba(255,255,255,.9);font-weight:600;font-size:.88rem;text-decoration:none;transition:color .2s;white-space:nowrap}
  .main-nav a:hover,.main-nav a.active{color:var(--gold);text-decoration:none}
  .nav-ham{display:none;background:none;border:none;cursor:pointer;padding:6px 0;flex-direction:column;gap:5px;flex-shrink:0}
  .nav-ham span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .25s,opacity .25s}
  .nav-ham.is-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .nav-ham.is-open span:nth-child(2){opacity:0;transform:scaleX(0)}
  .nav-ham.is-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  .nav-mob{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999;opacity:0;pointer-events:none;transition:opacity .25s}
  .nav-mob.is-open{opacity:1;pointer-events:auto}
  .nav-mob-panel{position:absolute;top:0;right:0;width:min(290px,82vw);height:100%;background:var(--primary);overflow-y:auto;padding:5rem 1.5rem 2rem;transform:translateX(100%);transition:transform .28s}
  .nav-mob.is-open .nav-mob-panel{transform:translateX(0)}
  .nav-mob-list{display:flex;flex-direction:column}
  .nav-mob-list>a{color:#fff;font-weight:700;font-size:1.05rem;padding:.9rem 0;border-bottom:1px solid rgba(255,255,255,.15);text-decoration:none;font-family:'Poppins',Arial,sans-serif}
  .nav-mob-list>a:hover{color:var(--gold)}
  @media(max-width:760px){.nav-ham{display:flex}.main-nav{display:none}}
  /* ── Breadcrumb ── */
  .breadcrumb{background:var(--secondary);padding:8px 5%;font-size:.8rem;color:rgba(255,255,255,.65)}
  .breadcrumb a{color:rgba(255,255,255,.75)}.breadcrumb a:hover{color:var(--gold)}
  .bc-inner{max-width:1200px;margin:0 auto;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
  /* ── Page hero ── */
  .page-hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:64px 5% 56px;text-align:center}
  .page-hero h1{font-size:clamp(1.8rem,4vw,2.9rem);font-weight:900;color:#fff;margin-bottom:14px}
  .page-hero .subtitle{color:rgba(255,255,255,.82);font-size:1.05rem;max-width:660px;margin:0 auto 24px}
  .trust-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:16px}
  .pill{background:rgba(212,169,79,.18);border:1px solid var(--gold);color:var(--gold);font-size:.8rem;font-weight:700;padding:5px 14px;border-radius:999px}
  /* ── Layout wrapper ── */
  .page-wrap{max-width:1200px;margin:0 auto;padding:56px 5%}
  /* ── Info sections ── */
  .info-box{background:var(--surface);border-radius:var(--radius);border:1px solid var(--border);padding:32px;margin-bottom:28px}
  .info-box h2{font-size:1.3rem;font-weight:800;color:var(--primary);margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--gold)}
  .info-box h3{font-size:1.05rem;font-weight:700;color:var(--secondary);margin:18px 0 8px}
  .info-box p{font-size:.96rem;color:var(--text);line-height:1.8;margin-bottom:12px}
  .info-box ul,.info-box ol{padding-left:20px;margin-bottom:12px}
  .info-box li{font-size:.95rem;color:var(--text);line-height:1.8;margin:5px 0}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:28px}
  @media(max-width:720px){.two-col{grid-template-columns:1fr}}
  /* ── Specs table ── */
  .specs-table{width:100%;border-collapse:collapse;margin:20px 0;font-size:.9rem}
  .specs-table th{background:var(--primary);color:#fff;padding:10px 14px;text-align:left;font-family:'Poppins',sans-serif}
  .specs-table td{padding:9px 14px;border-bottom:1px solid var(--border)}
  .specs-table tr:nth-child(even) td{background:rgba(31,61,43,.04)}
  /* ── Highlight box ── */
  .note-box{background:rgba(31,61,43,.06);border-left:4px solid var(--gold);padding:16px 20px;border-radius:0 8px 8px 0;margin:18px 0}
  .note-box strong{color:var(--primary)}
  /* ── Gallery grid ── */
  .gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-top:14px}
  .gallery-item{border-radius:12px;overflow:hidden;aspect-ratio:4/3}
  .gallery-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}
  .gallery-item:hover img{transform:scale(1.04)}
  /* ── Species / bird cards ── */
  .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;margin-top:24px}
  .bird-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column}
  .bird-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.11)}
  .bird-card-img{height:200px;overflow:hidden}
  .bird-card-img img{width:100%;height:100%;object-fit:cover;display:block}
  .bird-card-body{padding:20px;flex:1;display:flex;flex-direction:column}
  .bird-card-badge{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:rgba(31,61,43,.08);color:var(--primary);padding:3px 10px;border-radius:999px;margin-bottom:9px;border:1px solid rgba(31,61,43,.15)}
  .bird-card-body h3{font-size:1.05rem;font-weight:800;color:var(--primary);margin-bottom:7px}
  .bird-card-body p{font-size:.89rem;color:var(--muted);margin-bottom:14px;flex:1}
  .bird-card-body a.btn-gold{display:inline-block;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;font-weight:700;font-size:.88rem;padding:9px 18px;border-radius:999px;text-decoration:none;transition:transform .2s,box-shadow .2s;align-self:flex-start}
  .bird-card-body a.btn-gold:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(212,169,79,.4);text-decoration:none}
  /* ── CTA band ── */
  .cta-band{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:56px 5%;text-align:center}
  .cta-band h2{font-size:clamp(1.5rem,3vw,2rem);font-weight:900;color:#fff;margin-bottom:12px}
  .cta-band p{color:rgba(255,255,255,.82);margin:0 auto 28px;font-size:1rem;max-width:540px}
  .cta-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
  .btn-gold{display:inline-block;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;font-family:'Poppins',Arial,sans-serif;font-weight:700;padding:13px 28px;border-radius:999px;text-decoration:none;transition:transform .2s,box-shadow .2s}
  .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(212,169,79,.45);text-decoration:none;color:#fff}
  .btn-outline{display:inline-block;background:transparent;color:#fff;font-family:'Poppins',Arial,sans-serif;font-weight:700;padding:13px 28px;border-radius:999px;border:2px solid rgba(255,255,255,.55);text-decoration:none;transition:border-color .2s,background .2s}
  .btn-outline:hover{border-color:#fff;background:rgba(255,255,255,.08);color:#fff;text-decoration:none}
  /* ── FAQ ── */
  .faq-item{border:1px solid var(--border);border-radius:12px;margin-bottom:12px;overflow:hidden}
  .faq-item h3{background:var(--bg);font-size:.96rem;font-weight:700;color:var(--primary);margin:0;padding:15px 20px}
  .faq-item p{margin:0;padding:14px 20px;font-size:.93rem;color:#3a3a3a;line-height:1.75;border-top:1px solid var(--border)}
  /* ── Links grid ── */
  .links-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px;margin-top:14px}
  .link-card{display:flex;align-items:center;gap:12px;background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:14px 16px;text-decoration:none;color:var(--text);transition:box-shadow .18s,border-color .18s}
  .link-card:hover{box-shadow:0 4px 18px rgba(31,61,43,.12);border-color:var(--gold);text-decoration:none;color:var(--text)}
  .link-card .lk-icon{font-size:1.5rem;flex-shrink:0}
  .link-card strong{display:block;font-size:.88rem;font-weight:700;color:var(--primary);line-height:1.2}
  .link-card small{display:block;font-size:.77rem;color:var(--muted);margin-top:2px}
  /* ── Footer ── */
  .site-footer{background:var(--primary);color:var(--bg);padding:3.5rem 5% 2rem;border-top:1px solid rgba(255,255,255,.1)}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem;max-width:1200px;margin:0 auto 2rem}
  .footer-brand{font-family:'Poppins',Arial,sans-serif;font-size:1.1rem;font-weight:700;color:#fff;display:block;margin-bottom:.6rem}
  .footer-tagline{font-size:.85rem;color:rgba(255,255,255,.58);line-height:1.5;margin-bottom:.7rem}
  .footer-col h4{font-family:'Poppins',Arial,sans-serif;font-size:.7rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-rich);margin-bottom:.9rem}
  .footer-col ul{list-style:none;padding:0;margin:0}.footer-col ul li{margin-bottom:.5rem}
  .footer-col ul li a{color:var(--bg);font-size:.85rem;text-decoration:none;transition:color .2s}.footer-col ul li a:hover{color:var(--gold-rich)}
  .footer-bottom{max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,.12);padding-top:1rem;font-size:.77rem;color:rgba(245,245,245,.55);display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem}
  .footer-bottom a{color:var(--gold-rich)}.footer-bottom a:hover{color:#fff}
  @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;row-gap:1.5rem}}
  @media(max-width:480px){.footer-grid{grid-template-columns:1fr}}
  /* ── Lang switcher ── */
  .lang-sw{display:flex;align-items:center;gap:4px;margin-left:10px;flex-shrink:0}
  .lang-sw a{color:rgba(255,255,255,.55);font-size:.76rem;font-weight:800;padding:3px 5px;border-radius:4px;transition:color .18s;text-decoration:none;letter-spacing:.04em;font-family:'Poppins',Arial,sans-serif}
  .lang-sw a:hover,.lang-sw a.ls-on{color:var(--gold)}
  .lang-sw a.ls-on{border-bottom:2px solid var(--gold);padding-bottom:1px}
  .lang-sw .ls-div{color:rgba(255,255,255,.22);font-size:.7rem;user-select:none}
`;

// ═══════════════════════════════════════════════════════════════════
// SHARED TEMPLATES
// ═══════════════════════════════════════════════════════════════════
function GA() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>`;
}

function fonts() {
  return `<link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"/></noscript>`;
}

function hreflang(enPath, esPath = '/', ptPath = '/pt/', frPath = '/fr/') {
  return `  <link rel="alternate" hreflang="en-GB" href="https://www.paraisodeaves.com${enPath}"/>
  <link rel="alternate" hreflang="es-ES" href="https://www.paraisodeaves.com${esPath}"/>
  <link rel="alternate" hreflang="pt-PT" href="https://www.paraisodeaves.com${ptPath}"/>
  <link rel="alternate" hreflang="fr-FR" href="https://www.paraisodeaves.com${frPath}"/>
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/"/>`;
}

function header(activePage = '') {
  const nav = [
    ['/', 'Home'],
    ['/en/available-birds/', 'Available Birds'],
    ['/en/species/', 'Species'],
    ['/en/knowledge/', 'Knowledge Centre'],
    ['/en/gallery/', 'Gallery'],
    ['/en/delivery/', 'Delivery'],
    ['/en/contact/', 'Contact'],
  ];
  const links = nav.map(([href, label]) =>
    `<a href="${href}"${activePage === label ? ' class="active"' : ''}>${label}</a>`
  ).join('\n      ');
  const mobileLinks = nav.map(([href, label]) =>
    `<a href="${href}">${label}</a>`
  ).join('\n      ');

  return `<header class="site-header">
  <div class="header-inner">
    <a class="brand-logo" href="/en/">
      <span style="font-size:1.4rem">🦜</span>
      <span class="brand-name">Paraíso de Aves</span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      ${links}
      <div class="lang-sw" aria-label="Language selector">
        <a href="/en/" class="ls-on" lang="en" aria-current="true">EN</a>
        <span class="ls-div">|</span>
        <a href="/" lang="es">ES</a>
        <span class="ls-div">|</span>
        <a href="/fr/" lang="fr">FR</a>
        <span class="ls-div">|</span>
        <a href="/pt/" lang="pt">PT</a>
      </div>
    </nav>
    <button class="nav-ham" id="navHam" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<div class="nav-mob" id="navMob" role="dialog" aria-modal="true" aria-label="Navigation menu">
  <div class="nav-mob-panel">
    <nav class="nav-mob-list">
      ${mobileLinks}
      <div style="display:flex;gap:10px;padding:14px 0;border-top:1px solid rgba(255,255,255,.15);margin-top:8px">
        <a href="/" style="color:rgba(255,255,255,.6);font-size:.9rem;font-weight:700;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2)">ES</a>
        <a href="/fr/" style="color:rgba(255,255,255,.6);font-size:.9rem;font-weight:700;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2)">FR</a>
        <a href="/pt/" style="color:rgba(255,255,255,.6);font-size:.9rem;font-weight:700;padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2)">PT</a>
      </div>
    </nav>
  </div>
</div>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <span class="footer-brand">🦜 Paraíso de Aves</span>
      <p class="footer-tagline">Specialist parrot breeder in Llíria, Valencia, Spain. Hand-raised psittacines with full CITES documentation, delivered throughout the UK and Ireland.</p>
      <p style="font-size:.83rem;color:rgba(255,255,255,.75)">📧 <a href="mailto:paraisodeloros@gmail.com" style="color:var(--gold-rich)">paraisodeloros@gmail.com</a></p>
    </div>
    <div class="footer-col">
      <h4>Species</h4>
      <ul>
        <li><a href="/en/african-grey/">African Grey</a></li>
        <li><a href="/en/hyacinth-macaw/">Hyacinth Macaw</a></li>
        <li><a href="/en/blue-and-yellow-macaw/">Blue &amp; Yellow Macaw</a></li>
        <li><a href="/en/scarlet-macaw/">Scarlet Macaw</a></li>
        <li><a href="/en/catalina-macaw/">Catalina Macaw</a></li>
        <li><a href="/en/cockatoos/">Cockatoos</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Information</h4>
      <ul>
        <li><a href="/en/available-birds/">Available Birds</a></li>
        <li><a href="/en/delivery/">Delivery to UK &amp; Ireland</a></li>
        <li><a href="/en/knowledge/">Knowledge Centre</a></li>
        <li><a href="/en/gallery/">Gallery</a></li>
        <li><a href="/en/contact/">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Buyer Guides</h4>
      <ul>
        <li><a href="/en/knowledge/how-to-buy-a-parrot/">How to Buy a Parrot</a></li>
        <li><a href="/en/knowledge/parrot-prices/">Parrot Prices</a></li>
        <li><a href="/en/knowledge/cites-explained/">CITES Explained</a></li>
        <li><a href="/en/knowledge/air-cargo-delivery/">Air Cargo Delivery</a></li>
        <li><a href="/en/knowledge/macaw-guide/">Macaw Guide</a></li>
        <li><a href="/en/knowledge/african-grey-guide/">African Grey Guide</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 Paraíso de Aves &mdash; All rights reserved</span>
    <span>Registered breeder · CITES certified · Llíria, Valencia, Spain</span>
  </div>
</footer>
<script>
(function(){
  var h=document.getElementById('navHam'),m=document.getElementById('navMob');
  if(!h||!m)return;
  function open(){m.classList.add('is-open');h.classList.add('is-open');h.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
  function close(){m.classList.remove('is-open');h.classList.remove('is-open');h.setAttribute('aria-expanded','false');document.body.style.overflow='';}
  h.addEventListener('click',function(){m.classList.contains('is-open')?close():open();});
  m.addEventListener('click',function(e){if(e.target===m)close();});
})();
</script>`;
}

function breadcrumbs(crumbs) {
  const items = crumbs.map((c, i) =>
    i < crumbs.length - 1
      ? `<a href="${c.url}">${c.label}</a><span>›</span>`
      : `<span>${c.label}</span>`
  ).join('');
  const schema = crumbs.map((c, i) =>
    `{"@type":"ListItem","position":${i + 1},"name":"${c.label}","item":"https://www.paraisodeaves.com${c.url}"}`
  ).join(',');
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
  <div class="bc-inner">${items}</div>
</nav>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${schema}]}
</script>`;
}

function pageHead({ title, desc, canonical, ogImage = '/images/homepage/hand-raised-macaw-breeder.jpg', extra = '', enPath, esPath = '/', ptPath = '/pt/', frPath = '/fr/' }) {
  return `<!DOCTYPE html>
<html lang="en-GB" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  ${GA()}
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="https://www.paraisodeaves.com${canonical}"/>
  ${hreflang(enPath || canonical, esPath, ptPath, frPath)}
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="en_GB"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="https://www.paraisodeaves.com${canonical}"/>
  <meta property="og:image" content="https://www.paraisodeaves.com${ogImage}"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${desc}"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  ${extra}
  <style>${BASE_CSS}</style>
</head>
<body>`;
}

// ═══════════════════════════════════════════════════════════════════
// DATA — SPECIES
// ═══════════════════════════════════════════════════════════════════
const SPECIES = [
  {
    slug: 'african-grey',
    title: 'African Grey Parrot for Sale UK | Congo Grey & Timneh | CITES',
    desc: 'African Grey parrots hand-raised in Spain with full CITES documentation. Congo African Grey and Timneh available. Delivered throughout the UK and Ireland.',
    h1: 'African Grey Parrot',
    scientific: 'Psittacus erithacus',
    tagline: 'The world\'s most intelligent parrot — a lifelong companion with an extraordinary gift for language.',
    ogImage: '/images/loro-gris-01.webp',
    img1: '/images/loro-gris-01.webp',
    img1alt: 'African Grey parrot hand-raised available UK',
    img2: '/images/loro-gris-02.webp',
    img2alt: 'Congo African Grey Psittacus erithacus close-up',
    badge: 'CITES Appendix I',
    esPath: '/loro-gris-africano.html',
    frPath: '/fr/perroquet-gris-du-gabon/',
    ptPath: '/pt/papagaio-cinzento',
    lifespan: '50–70 years',
    size: '33 cm, 400–650 g',
    wingspan: '46–52 cm',
    vocab: '800–1,000+ words',
    noise: 'Moderate',
    family: 'Ideal for experienced owners',
    body: `
<p>The <strong>African Grey parrot</strong> (<em>Psittacus erithacus</em>) is widely regarded as the most intelligent bird species on Earth. Celebrated for its extraordinary cognitive abilities and unmatched capacity for human speech, the African Grey forms deep, lifelong bonds with its owners and can learn vocabulary running into the hundreds — sometimes over a thousand — words and phrases.</p>
<p>At Paraíso de Aves, every African Grey is hand-raised from the earliest days of life, handled daily, socialised with people of all ages, and prepared for a seamless transition into its new home. We breed both the <strong>Congo African Grey</strong> (<em>P. erithacus erithacus</em>) and the slightly smaller, darker <strong>Timneh African Grey</strong> (<em>P. timneh</em>), both fully documented under CITES.</p>
<h3>Intelligence & language</h3>
<p>No parrot species rivals the African Grey for cognitive depth. Research by Dr Irene Pepperberg demonstrated that Grey parrots like Alex could understand concepts such as colour, shape, material, quantity, and absence — abilities once attributed exclusively to great apes. An African Grey doesn't merely mimic: it uses language contextually, responds to questions, and often speaks at appropriate moments.</p>
<p>Speech development typically begins at 6–12 months and accelerates rapidly over the first three years. Hand-raised birds that hear consistent, clear speech from their human family learn fastest. Most adults can produce 100–800 words with clear pronunciation and many use sentences unprompted.</p>
<h3>Temperament</h3>
<p>African Greys are sensitive, perceptive birds that thrive on routine and close companionship. They are selectively social — they may choose one primary companion in a household — and can be initially reserved with strangers. Once trust is established, however, a Grey is extraordinarily affectionate, seeking physical contact, playing games, and actively engaging in household life.</p>
<p>They are not tolerant of boredom. A Grey without sufficient mental stimulation will develop feather-plucking, repetitive screaming, or other stress behaviours. Enrichment — foraging toys, training sessions, varied environments — is as essential as food and water.</p>
<h3>Care requirements</h3>
<ul>
  <li><strong>Cage size:</strong> minimum 90×60×120 cm; larger is always better</li>
  <li><strong>Out-of-cage time:</strong> at least 3–4 hours supervised daily</li>
  <li><strong>Perches:</strong> 3–4 of varying diameters; natural wood preferred</li>
  <li><strong>Toys:</strong> rotate weekly — foraging, puzzle, and chew toys</li>
  <li><strong>Bathing:</strong> warm water spray or shallow bath 2–3 times per week</li>
  <li><strong>Veterinary:</strong> annual check-up with an avian specialist; CITES document required for UK import</li>
</ul>`,
    diet: `<p>African Greys require a nutritionally balanced diet to maintain their complex physiology. They are prone to hypocalcaemia (low calcium), Vitamin A deficiency, and feather-destructive behaviour when fed poor diets. We recommend:</p>
<ul>
  <li><strong>High-quality pellets (50–60%):</strong> Harrison's, Roudybush, or Zupreem Natural — the backbone of the diet</li>
  <li><strong>Fresh vegetables (25–30%):</strong> dark leafy greens (kale, spinach, chard), carrot, sweet pepper, broccoli, courgette</li>
  <li><strong>Fresh fruit (10%):</strong> apple, pear, pomegranate, mango — in moderation due to sugar content</li>
  <li><strong>Seeds and nuts (5–10%):</strong> sunflower seeds sparingly; walnuts and almonds as treats</li>
</ul>
<p>Foods to avoid: avocado, chocolate, caffeine, onion, garlic, alcohol, and the seeds of apples and pears. Ensure fresh water is available at all times and changed twice daily.</p>`,
    faqs: [
      ['Do African Grey parrots really talk?', 'Yes — African Greys are the most accomplished talking birds in the world. With consistent interaction, hand-raised birds typically develop vocabularies of 100–500 words by age 3, with some reaching over 1,000. They do not merely repeat: many contextually apply language, name objects, and respond to questions.'],
      ['Are African Greys good pets for beginners?', 'They are best suited to experienced bird owners or those who have thoroughly researched the species. Their intelligence means they have complex emotional needs, and they require daily mental stimulation, a stable routine, and consistent social interaction to thrive.'],
      ['How long does an African Grey parrot live?', 'In captivity with proper care, 50–70 years. This is a lifelong commitment — please factor in what will happen to the bird if circumstances change, and consider naming a bird guardian in your will.'],
      ['Do you deliver African Grey parrots to the UK?', 'Yes. We deliver throughout the United Kingdom and Ireland via specialist live-animal air cargo. Full CITES import/export documentation is handled by us. The bird travels in an IATA-approved crate with food, water, and ventilation.'],
      ['What CITES documents does an African Grey need?', 'The African Grey is listed on CITES Appendix I, the highest protection category. Import requires a UK CITES import permit and our Spanish CITES export permit. We manage all paperwork from our end; you apply for the UK import permit, which we assist you with.'],
      ['How much does an African Grey parrot cost in the UK?', 'Prices vary by age, subspecies, and availability. Please contact us at paraisodeloros@gmail.com for current pricing. All birds are sold with complete documentation — CITES certificate, health certificate, and ring identification.'],
      ['Are African Greys good with children?', 'They can be wonderful with children who treat them respectfully and calmly. However, they are emotionally sensitive and can be startled by unpredictable behaviour. We recommend supervision with young children and teaching children to read the bird\'s body language.'],
      ['What size cage does an African Grey need?', 'The minimum recommended cage is 90×60×120 cm (W×D×H), though larger is always better. Greys need space to climb, flap, and move freely. A play stand outside the cage for daily out-of-cage time is strongly recommended.'],
    ],
  },
  {
    slug: 'hyacinth-macaw',
    title: 'Hyacinth Macaw for Sale UK | World\'s Largest Parrot | CITES',
    desc: 'Hyacinth Macaw hand-raised in Spain with full CITES documentation. The world\'s largest parrot, cobalt blue, gentle giant. Delivered throughout the UK.',
    h1: 'Hyacinth Macaw',
    scientific: 'Anodorhynchus hyacinthinus',
    tagline: 'The gentle giant — the world\'s largest parrot in stunning cobalt blue, with a personality to match.',
    ogImage: '/images/homepage/hyacinth-macaw-hand-raised.webp',
    img1: '/images/guacamayo-jacinto-01.webp',
    img1alt: 'Hyacinth Macaw hand-raised cobalt blue available UK',
    img2: '/images/guacamayo-jacinto-02.webp',
    img2alt: 'Hyacinth Macaw Anodorhynchus hyacinthinus beak detail',
    badge: 'CITES Appendix I',
    esPath: '/guacamayos.html',
    frPath: '/fr/ara-hyacinthe/',
    ptPath: '/pt/arara-jacinto',
    lifespan: '60–80 years',
    size: '100 cm, 1.2–1.7 kg',
    wingspan: 'Up to 130 cm',
    vocab: '20–30 words',
    noise: 'Loud',
    family: 'Experienced owners only',
    body: `
<p>The <strong>Hyacinth Macaw</strong> (<em>Anodorhynchus hyacinthinus</em>) is the largest flying parrot species in the world — a breathtaking cobalt blue giant with a yellow facial ring and beak patch that sets it apart from every other bird on the planet. Native to central and eastern South America, particularly the Pantanal wetlands of Brazil, the Hyacinth is classified as Vulnerable on the IUCN Red List and listed on CITES Appendix I, making documentation non-negotiable for legal ownership.</p>
<p>Despite its imposing size, the Hyacinth Macaw is extraordinarily gentle, earning it the nickname <em>gentle giant</em> among parrot enthusiasts. Our hand-raised Hyacinths are socialised from the very first week of life, acclimated to human touch, voice, and environments before they leave our aviary. Each bird leaves with complete CITES documentation, a health certificate, and a ring of identification.</p>
<h3>A bird like no other</h3>
<p>The Hyacinth's cobalt blue plumage is unlike any other naturally occurring colour in the bird world — deep, saturated, and iridescent in direct sunlight. At 100 cm from beak to tail tip and weighing up to 1.7 kg, a Hyacinth Macaw commands attention in any room. Its beak generates a bite force measured at over 300 psi — capable of cracking a coconut shell — yet hand-raised birds use this power with extraordinary gentleness, taking food delicately from fingers and grooming their owners with care.</p>
<h3>Temperament</h3>
<p>Hyacinth Macaws are affectionate, playful, and deeply bonded to their human family. They are less neurotic than smaller macaws, generally calmer, and tend to be more accepting of multiple family members. They enjoy being held, scratched under the feathers, and participating in household activity. However, they are loud — their calls carry over long distances outdoors — and their destructive chewing capacity means any space they occupy must be designed around them.</p>
<h3>Housing requirements</h3>
<ul>
  <li><strong>Cage size:</strong> minimum 150×120×200 cm — the largest available</li>
  <li><strong>Bar gauge:</strong> minimum 5mm stainless steel; standard cages are insufficient</li>
  <li><strong>Perches:</strong> very thick natural wood (10–15 cm diameter); they will destroy softer material</li>
  <li><strong>Play gym:</strong> a dedicated, durable play stand is essential for daily out-of-cage time</li>
  <li><strong>Chew provision:</strong> large chunks of palm wood, eucalyptus, and thick rope toys must be refreshed regularly</li>
</ul>`,
    diet: `<p>Hyacinth Macaws have a unique diet in the wild — they specialise in palm nuts, particularly the fruit of the Bocaiúva and Acrocomia palms. In captivity, they require:</p>
<ul>
  <li><strong>Macadamia nuts and Brazil nuts:</strong> the closest equivalent to their natural palm nut diet — offer daily in moderation</li>
  <li><strong>Walnuts, almonds, hazelnuts:</strong> excellent energy source; avoid salted or flavoured varieties</li>
  <li><strong>Pellets designed for macaws (30–40%):</strong> Roudybush Macaw or Harrison's High Potency</li>
  <li><strong>Fresh fruit (20–25%):</strong> papaya, mango, banana, apple, grapes</li>
  <li><strong>Fresh vegetables (15–20%):</strong> corn on the cob, sweet potato, broccoli, kale</li>
</ul>
<p>Unlike smaller parrots, Hyacinths process more fat in their diet due to their nut-based wild diet. Do not restrict fats as you might with an Amazon or African Grey. Avoid avocado, onion, chocolate, and caffeine.</p>`,
    faqs: [
      ['How much does a Hyacinth Macaw cost in the UK?', 'Hyacinth Macaws are among the most expensive parrots in the world due to their CITES Appendix I status, rarity, and the cost of breeding. Prices vary significantly. Please contact us at paraisodeloros@gmail.com for current availability and pricing.'],
      ['Are Hyacinth Macaws legal to own in the UK?', 'Yes, with the correct documentation. A Hyacinth Macaw requires CITES import permits (Article 10 certificate in the UK post-Brexit) and must be purchased from a registered breeder with proper paperwork. We provide full documentation. Contact us for guidance.'],
      ['Do Hyacinth Macaws talk?', 'Hyacinth Macaws are not renowned talkers — most learn 20–30 words. However, their personality, size, and affectionate nature more than compensate. Many owners find vocalisations — a range of calls, whistles, and sounds — more appealing than rote word repetition.'],
      ['How much space does a Hyacinth Macaw need?', 'Hyacinths are the largest flying parrots and require very large enclosures — minimum 150×120×200 cm for the cage. Many owners dedicate a full room or build an outdoor aviary. Daily out-of-cage time in a bird-proofed area is essential.'],
      ['Are Hyacinth Macaws aggressive?', 'Hand-raised Hyacinths are typically very gentle despite their formidable beak. They are generally calmer and less prone to biting than smaller macaws. However, any large parrot can bite if frightened or mishandled. Proper socialisation from birth — as we provide — minimises this risk substantially.'],
      ['Do you ship Hyacinth Macaws to Ireland?', 'Yes. We deliver to Ireland as well as the UK via specialist live-animal air cargo. We handle all CITES export documentation from Spain; you will need to arrange the UK/Ireland CITES import permit, which we will guide you through.'],
      ['What do Hyacinth Macaws eat?', 'In the wild they specialise in palm nuts. In captivity, their diet should include macadamia and Brazil nuts daily, quality macaw pellets, fresh fruit, and vegetables. They require more fat in their diet than other parrots — do not restrict healthy nut fats.'],
      ['How long does a Hyacinth Macaw live?', '60–80 years in captivity with proper care. Owning a Hyacinth Macaw is a multigenerational commitment. We strongly recommend naming a guardian in your will.'],
    ],
  },
  {
    slug: 'catalina-macaw',
    title: 'Catalina Macaw for Sale UK | Rainbow Macaw CITES | Hybrid Ara',
    desc: 'Catalina Macaw (Rainbow Macaw) hand-raised in Spain — Ara ararauna × Ara macao hybrid. Spectacular multicolour plumage, CITES documentation, UK delivery.',
    h1: 'Catalina Macaw (Rainbow Macaw)',
    scientific: 'Ara ararauna × Ara macao',
    tagline: 'The rainbow parrot — a unique first-generation hybrid with breath-taking multicolour plumage.',
    ogImage: '/images/catalina-macaw/guacamayo-catalina-cara-frontal-naranja-verde-02.jpg',
    img1: '/images/catalina-macaw/guacamayo-catalina-cara-frontal-naranja-verde-02.jpg',
    img1alt: 'Catalina Macaw Rainbow Macaw hand-raised for sale UK',
    img2: '/images/catalina-macaw/guacamayo-catalina-en-mano-plumaje-multicolor-08.jpg',
    img2alt: 'Catalina Macaw on hand multicolour plumage',
    badge: 'CITES Appendix II',
    esPath: '/guacamayo-catalina/',
    frPath: '/fr/ara-catalina/',
    ptPath: '/pt/',
    lifespan: '50–60 years',
    size: '85–95 cm, 900–1,100 g',
    wingspan: '100–115 cm',
    vocab: '30–50 words',
    noise: 'Moderate-loud',
    family: 'Experienced owners, families with older children',
    body: `
<p>The <strong>Catalina Macaw</strong>, also known as the <strong>Rainbow Macaw</strong>, is a first-generation hybrid between the Blue-and-Yellow Macaw (<em>Ara ararauna</em>) and the Scarlet Macaw (<em>Ara macao</em>). Every Catalina Macaw is visually unique — a one-of-a-kind combination of orange, green, blue, and red that cannot be precisely replicated in any two individuals. It is the avian equivalent of a custom painting.</p>
<p>At Paraíso de Aves, our Catalina Macaws are hand-raised from the first week of life in our specialist breeding facility in Llíria, Valencia. Each bird is socialised daily with human contact, acclimated to normal household sounds and environments, and leaves with full CITES documentation, a veterinary health certificate, and a unique ring ID.</p>
<h3>Plumage and appearance</h3>
<p>The Catalina inherits the structural blue of the ararauna on its flight feathers and tail, the vibrant red and orange chest of the macao, and a brilliant green across the upper wings. The face shows a middle path between the two species — often displaying orange and red facial striping rather than the pure bare skin of the ararauna. No two Catalinas look exactly alike, making each bird truly individual.</p>
<h3>Temperament</h3>
<p>The Catalina is widely considered to offer the best temperament balance of its two parent species. It combines the sociable, affectionate disposition of the Blue-and-Yellow Macaw with the energetic, playful spirit of the Scarlet. Hand-raised from birth, our birds are genuinely people-oriented — they enjoy being handled, seek shoulder rides, love head scratches, and actively participate in family life.</p>
<h3>Training and language</h3>
<p>Catalina Macaws are good talkers by macaw standards. With consistent positive reinforcement training starting at 3–6 months, most birds develop a vocabulary of 30–50 words or short phrases. They excel at step-up commands, target training, and learning simple tricks. Short daily training sessions (5–10 minutes) with food rewards are the most effective approach.</p>`,
    diet: `<p>The Catalina Macaw's dietary needs closely follow those of its two parent species:</p>
<ul>
  <li><strong>Quality macaw pellets (40–50%):</strong> Harrison's, Zupreem, or Roudybush — the dietary foundation</li>
  <li><strong>Fresh fruit and vegetables (30–40%):</strong> mango, papaya, apple, pear, sweet pepper, broccoli, kale, carrot</li>
  <li><strong>Nuts and seeds (10–15%):</strong> walnuts, macadamia, almonds, sunflower seeds — as treats and enrichment</li>
  <li><strong>Cooked legumes (occasional):</strong> chickpeas, lentils, edamame for protein variety</li>
</ul>
<p><strong>Avoid:</strong> avocado, chocolate, caffeine, onion, garlic, alcohol, and any salted or heavily processed human food. Fresh water should be changed at least twice daily.</p>`,
    faqs: [
      ['What is a Catalina Macaw?', 'A Catalina Macaw is a first-generation hybrid between the Blue-and-Yellow Macaw (Ara ararauna) and the Scarlet Macaw (Ara macao). The result is a visually spectacular bird with multicolour plumage — orange chest, green wings, blue flight feathers — that varies uniquely between individuals.'],
      ['Are Catalina Macaws good pets?', 'Yes. Hand-raised Catalinas are affectionate, playful, and deeply bonded to their human family. They combine the gentle sociability of the Blue-and-Yellow with the energy of the Scarlet. They require significant daily interaction and mental stimulation to thrive.'],
      ['Do Catalina Macaws talk?', 'Yes. They are good talkers by macaw standards, typically learning 30–50 words and short phrases with consistent training. Training begun at 3–6 months yields the best results.'],
      ['Do Catalina Macaws require CITES documentation?', 'Yes. As a hybrid of two CITES Appendix II species, Catalina Macaws require CITES documentation for legal sale and transport. We provide complete paperwork: CITES certificate, veterinary health certificate, and ring ID.'],
      ['How much does a Catalina Macaw cost in the UK?', 'Prices vary by age and availability. Please contact us at paraisodeloros@gmail.com for current pricing. All birds include full CITES documentation.'],
      ['How long does a Catalina Macaw live?', '50–60 years with proper care — a lifetime commitment that should be planned for carefully.'],
      ['Can you deliver a Catalina Macaw to the UK?', 'Yes. We deliver throughout the UK and Ireland via specialist live-animal air cargo. All CITES export documentation is prepared by us. You will receive the bird at an agreed UK airport cargo terminal.'],
      ['What size cage does a Catalina Macaw need?', 'Minimum 120×90×150 cm, ideally 180×90×180 cm or larger. Their wingspan can reach 115 cm, so they need genuine space to stretch. Daily out-of-cage time in a safe, supervised area is essential.'],
    ],
  },
  {
    slug: 'blue-and-yellow-macaw',
    title: 'Blue and Yellow Macaw for Sale UK | Ara ararauna | CITES Breeder',
    desc: 'Blue-and-Yellow Macaw (Ara ararauna) hand-raised in Spain with CITES. Sociable, intelligent, spectacular. Delivered throughout the UK and Ireland.',
    h1: 'Blue-and-Yellow Macaw',
    scientific: 'Ara ararauna',
    tagline: 'The most popular macaw in the world — vibrant, sociable, and endlessly engaging.',
    ogImage: '/images/homepage/blue-yellow-macaw-social.webp',
    img1: '/images/guacamayo-azul-01.webp',
    img1alt: 'Blue-and-Yellow Macaw Ara ararauna hand-raised for sale UK',
    img2: '/images/guacamayo-azul-02.webp',
    img2alt: 'Blue-and-Yellow Macaw turquoise plumage close-up',
    badge: 'CITES Appendix II',
    esPath: '/guacamayos.html',
    frPath: '/fr/ara-bleu-et-jaune/',
    ptPath: '/pt/arara-azul-e-amarela',
    lifespan: '60–70 years',
    size: '86–94 cm, 900–1,200 g',
    wingspan: 'Up to 100 cm',
    vocab: '40–60 words',
    noise: 'Loud',
    family: 'Families, experienced owners',
    body: `
<p>The <strong>Blue-and-Yellow Macaw</strong> (<em>Ara ararauna</em>) is the world's most popular large macaw — and for very good reason. Its electric turquoise-and-golden plumage is instantly recognisable; its sociable, playful temperament makes it one of the most rewarding parrots a family can own. At 86–94 cm from beak to tail, it is a substantial bird that commands presence and demands genuine commitment.</p>
<p>Our Blue-and-Yellow Macaws are bred and hand-raised in our specialist aviary in Llíria, Valencia, Spain. Every bird is fed by hand from the earliest days, socialised with multiple human family members, and prepared to transition comfortably into a busy household. We ship throughout the United Kingdom and Ireland with full CITES and veterinary documentation.</p>
<h3>Personality</h3>
<p>Blue-and-Yellow Macaws are famously sociable, energetic, and emotionally expressive. They bond strongly with their human family, enjoy being handled and carried, and actively seek interaction throughout the day. They are curious explorers — give them access to a room and they will investigate every object, surface, and container within reach.</p>
<p>They are among the most emotionally intelligent macaws, often mirroring their owner's mood and responding to tone of voice as much as to words. This sensitivity makes them deeply rewarding to live with, but also means they feel neglect acutely. A Blue-and-Yellow left alone for long periods will become stressed and potentially destructive.</p>
<h3>Intelligence and trainability</h3>
<p>These macaws respond exceptionally well to positive reinforcement training. Target training, step-up commands, and simple tricks can be taught within weeks of the bird arriving home. Speech development is excellent by macaw standards — most hand-raised birds develop vocabularies of 40–60 words, and many go considerably further with consistent training.</p>`,
    diet: `<p>The Blue-and-Yellow Macaw thrives on a varied, nutrient-rich diet:</p>
<ul>
  <li><strong>Quality macaw pellets (40–50%):</strong> Harrison's High Potency, Roudybush, or Zupreem Natural</li>
  <li><strong>Fresh fruits (25%):</strong> papaya, mango, apple (no seeds), banana, grapes, berries</li>
  <li><strong>Fresh vegetables (20%):</strong> kale, sweet pepper, broccoli, carrot, sweet corn, courgette</li>
  <li><strong>Nuts and seeds (10%):</strong> walnuts, almonds, Brazil nuts, sunflower seeds as treats</li>
  <li><strong>Cooked grains (occasional):</strong> brown rice, quinoa, cooked pasta</li>
</ul>
<p>Never feed avocado, chocolate, onion, garlic, caffeine, or anything salted or sweetened. Fresh water twice daily minimum.</p>`,
    faqs: [
      ['Are Blue-and-Yellow Macaws good family pets?', 'Yes — they are among the most family-friendly large parrots. Hand-raised birds are sociable, tolerant, and adapt well to households with multiple people. They generally do well with respectful children aged 8 and older. Supervision is always recommended around very young children.'],
      ['How much does a Blue-and-Yellow Macaw cost in the UK?', 'Prices vary with age and availability. Contact us at paraisodeloros@gmail.com for current pricing. All birds come with full CITES Appendix II documentation, health certificate, and ring ID.'],
      ['Do Blue-and-Yellow Macaws talk?', 'Yes — they are good talkers by macaw standards. With regular training from a young age, most develop 40–60 words and some reach considerably more. They are also accomplished mimics of household sounds.'],
      ['How long do Blue-and-Yellow Macaws live?', '60–70 years in captivity with proper care. This is a lifelong companion — plan for the bird\'s long-term care, including naming a guardian should circumstances change.'],
      ['What size cage is needed for a Blue-and-Yellow Macaw?', 'Minimum 120×90×160 cm; 180×90×180 cm is ideal. They need space to stretch their wingspan, climb, and play. Daily out-of-cage time in a safe area is non-negotiable.'],
      ['Can you deliver a Blue-and-Yellow Macaw to the UK?', 'Yes. We ship throughout the UK and Ireland via specialist live-animal air cargo. We prepare all Spanish CITES export documentation; you collect from the designated UK cargo terminal.'],
      ['Do they make good companions for single owners?', 'Excellent companions for single owners who have sufficient time to dedicate to interaction. They bond deeply with their primary person and enjoy being the centre of attention. Be aware they need 3–4 hours of interaction daily — they are not independent birds.'],
      ['Are Blue-and-Yellow Macaws loud?', 'All large macaws are loud by domestic standards. They call at dusk and dawn naturally, and may call when excited or alarmed at other times. This is worth considering carefully if you live in a flat or semi-detached house with shared walls.'],
    ],
  },
  {
    slug: 'scarlet-macaw',
    title: 'Scarlet Macaw for Sale UK | Ara macao | CITES Registered Breeder',
    desc: 'Scarlet Macaw (Ara macao) hand-raised in Spain with full CITES documentation. Spectacular red, blue, and yellow plumage. Delivered to the UK and Ireland.',
    h1: 'Scarlet Macaw',
    scientific: 'Ara macao',
    tagline: 'Three thousand years of companionship — the most iconic macaw in the world.',
    ogImage: '/images/guacamayo-escarlata-01.webp',
    img1: '/images/guacamayo-escarlata-01.webp',
    img1alt: 'Scarlet Macaw Ara macao hand-raised for sale UK',
    img2: '/images/guacamayo-escarlata-02.webp',
    img2alt: 'Scarlet Macaw spread wings plumage detail',
    badge: 'CITES Appendix I',
    esPath: '/guacamayos.html',
    frPath: '/fr/ara-macao/',
    ptPath: '/pt/arara-escarlate',
    lifespan: '50–75 years',
    size: '81–96 cm, 900–1,100 g',
    wingspan: 'Up to 115 cm',
    vocab: '20–40 words',
    noise: 'Very loud',
    family: 'Experienced owners',
    body: `
<p>The <strong>Scarlet Macaw</strong> (<em>Ara macao</em>) is possibly the most iconic parrot species in history. Its blazing red plumage, accented with golden yellow wing coverts and royal blue flight feathers, creates one of the most spectacular natural colour combinations in the animal kingdom. Native to the humid forests of Mexico through to northern South America, the Scarlet has lived alongside humans for over 3,000 years — archaeological records from Mesoamerican civilisations show the species was kept as a ceremonial and companion bird millennia before European contact.</p>
<p>At Paraíso de Aves, our Scarlet Macaws are hand-raised from the very first days of life. They are bred under a full CITES Appendix I registration, and every bird leaves our facility with complete documentation including CITES certificates, individual ring ID, and a veterinary health certificate valid for international transport.</p>
<h3>Temperament</h3>
<p>The Scarlet Macaw is famously spirited — energetic, bold, and intensely curious. Hand-raised birds that have been properly socialised are affectionate and engaging, but they have a stronger independent streak than the Blue-and-Yellow Macaw and can be less forgiving of inconsistent handling. They require confident, experienced owners who understand macaw body language and can establish respectful boundaries.</p>
<p>Scarlets tend to bond most closely with one primary person in a household, though well-socialised birds accept the wider family. They are playful, love foraging toys and novel objects, and will keep themselves entertained when provided adequate enrichment. Like all large macaws, they need significant daily interaction — 3–4 hours minimum outside the cage.</p>`,
    diet: `<p>Scarlet Macaws in the wild consume a wide variety of fruits, seeds, nectar, and clay minerals. In captivity:</p>
<ul>
  <li><strong>Macaw pellets (40%):</strong> Harrison's, Roudybush, or Hagen Tropican</li>
  <li><strong>Fresh fruit (30%):</strong> papaya, mango, figs, berries, kiwi, apple (no seeds)</li>
  <li><strong>Fresh vegetables (20%):</strong> sweet potato, broccoli, kale, sweet corn, beetroot</li>
  <li><strong>Nuts and seeds (10%):</strong> macadamia, Brazil nuts, walnuts, sunflower seeds (as treats)</li>
</ul>
<p>Mineral supplement (avian calcium and vitamin D3) is recommended, particularly during breeding periods. Avoid avocado, chocolate, caffeine, onion, garlic, and alcohol.</p>`,
    faqs: [
      ['Are Scarlet Macaws good pets?', 'For experienced parrot owners, absolutely. They are spectacular, engaging companions with vibrant personalities. They require confident handling and a thorough understanding of macaw body language. First-time bird owners should ideally start with a less demanding species.'],
      ['How long do Scarlet Macaws live?', '50–75 years in captivity. This is a multi-decade commitment requiring careful planning for the bird\'s long-term care.'],
      ['Do Scarlet Macaws talk?', 'They can learn 20–40 words, though they are less accomplished talkers than African Greys or Amazon parrots. Their personality, colour, and presence more than compensate. Many owners find mimicry of household sounds more notable than vocabulary.'],
      ['Are Scarlet Macaws CITES restricted in the UK?', 'Yes. The Scarlet Macaw is listed on CITES Appendix I. Import into the UK requires both a Spanish CITES export permit and a UK CITES import permit (Article 10). We manage the export documentation; we will guide you through the import permit application.'],
      ['How much does a Scarlet Macaw cost in the UK?', 'Contact us at paraisodeloros@gmail.com for current pricing. Prices vary with age, sex, and availability.'],
      ['Can you deliver a Scarlet Macaw to the UK?', 'Yes — to all UK regions and Ireland. We use specialist live-animal air freight with IATA-approved crates. The bird arrives healthy, calm, and ready to begin the acclimatisation process.'],
      ['What cage does a Scarlet Macaw need?', 'Minimum 120×90×160 cm; 180×90×200 cm is ideal. Bar gauge must be at least 4mm stainless steel. Natural wood perches of 5–8 cm diameter are essential for foot health.'],
      ['Are Scarlet Macaws noisier than other macaws?', 'Yes — they are among the louder macaw species, particularly during dawn and dusk calling periods. Their vocalisations are powerful and carry over considerable distances. This is a significant consideration for urban or flat-dwelling owners.'],
    ],
  },
  {
    slug: 'green-wing-macaw',
    title: 'Green-wing Macaw for Sale UK | Ara chloropterus | CITES Breeder',
    desc: 'Green-wing Macaw (Ara chloropterus) hand-raised in Spain with full CITES documentation. Second-largest macaw, gentle giant, rich red plumage. UK delivery.',
    h1: 'Green-wing Macaw',
    scientific: 'Ara chloropterus',
    tagline: 'The gentle giant of the macaw world — powerful, majestic, and surprisingly tender.',
    ogImage: '/images/guacamayo-escarlata-01.webp',
    img1: '/images/guacamayo-escarlata-01.webp',
    img1alt: 'Green-wing Macaw Ara chloropterus hand-raised for sale UK',
    img2: '/images/guacamayo-escarlata-02.webp',
    img2alt: 'Green-wing Macaw red plumage detail',
    badge: 'CITES Appendix II',
    esPath: '/guacamayos.html',
    frPath: '/fr/aras/',
    ptPath: '/pt/arara-a-venda',
    lifespan: '60–80 years',
    size: '90–95 cm, 1.0–1.7 kg',
    wingspan: 'Up to 125 cm',
    vocab: '20–40 words',
    noise: 'Very loud',
    family: 'Experienced owners',
    body: `
<p>The <strong>Green-wing Macaw</strong> (<em>Ara chloropterus</em>) is the second-largest macaw species in the world, exceeded in size only by the Hyacinth Macaw. Despite its imposing scale, the Green-wing is famed for its gentle, patient temperament — consistently earning the nickname <em>gentle giant</em> among experienced macaw owners. Its rich crimson body, accented by bands of emerald green across the wings and vivid blue-and-red tail, makes it one of the most visually dramatic parrots in existence.</p>
<p>Unlike the Scarlet Macaw — which it superficially resembles at a distance — the Green-wing displays distinctive red facial feather lines radiating outward from the beak (the Scarlet has bare yellow skin in this region). It is also considerably larger and noticeably calmer in temperament.</p>
<h3>Personality</h3>
<p>Green-wing Macaws are sociable, affectionate, and notably less neurotic than many smaller parrot species. They have a calm, patient quality unusual for large macaws, and hand-raised birds develop exceptional bonds with their human families. They enjoy extended periods of physical contact, respond well to training, and generally handle new people and environments with equanimity.</p>
<p>Their independence is well-developed — they can entertain themselves with toys and chewing enrichment for extended periods — but they still require significant daily interaction. Loneliness or boredom produces the same destructive behaviours seen in all large psittacines.</p>`,
    diet: `<p>Green-wing Macaws require a rich, varied diet appropriate for large macaws:</p>
<ul>
  <li><strong>Quality macaw pellets (40%):</strong> Harrison's, Roudybush, or Zupreem Natural for Macaws</li>
  <li><strong>Fresh fruit (25%):</strong> papaya, mango, guava, apple, pomegranate, banana, grapes</li>
  <li><strong>Fresh vegetables (25%):</strong> sweet potato, corn, broccoli, kale, sweet pepper, carrot</li>
  <li><strong>Nuts and seeds (10%):</strong> Brazil nuts, walnuts, almonds, macadamia as daily treats</li>
</ul>
<p>Green-wings have large, powerful beaks that can hull hard-shelled nuts easily. Hard foods provide excellent beak maintenance. Avoid avocado, chocolate, caffeine, onion, garlic, and all forms of alcohol.</p>`,
    faqs: [
      ['How does the Green-wing Macaw differ from the Scarlet Macaw?', 'Both are large red macaws, but they differ significantly. The Green-wing has green wing bands and red facial feather lines, while the Scarlet has yellow wing coverts and bare yellow facial skin. The Green-wing is also considerably larger and notably calmer in temperament.'],
      ['Are Green-wing Macaws good pets?', 'Excellent pets for experienced owners with the space and time to accommodate a large, active bird. They are gentler and more patient than most large macaws, forming deep bonds with their human families.'],
      ['How long do Green-wing Macaws live?', '60–80 years with proper care. This is one of the most long-lived parrot species — a genuinely lifelong commitment.'],
      ['Do Green-wing Macaws need CITES documentation?', 'Yes — they are listed on CITES Appendix II. We provide complete documentation: CITES certificate, veterinary health certificate, and ring ID. UK import also requires an Article 10 certificate.'],
      ['How much does a Green-wing Macaw cost in the UK?', 'Contact us at paraisodeloros@gmail.com for current pricing and availability.'],
      ['Can you deliver a Green-wing Macaw to the UK?', 'Yes — throughout the UK and Ireland via specialist live-animal air cargo. All documentation is prepared by our team.'],
      ['What cage size does a Green-wing Macaw need?', 'A minimum of 150×100×180 cm, with larger being much preferred. They are powerful climbers and chewers — the cage must be constructed from heavy-gauge stainless steel.'],
      ['Are Green-wing Macaws quieter than Scarlet Macaws?', 'Both species are loud by domestic standards. Green-wings may call less frequently during the day, but when they do vocalise, the volume is comparable. Expect large macaw sound levels regardless of species.'],
    ],
  },
  {
    slug: 'amazon-parrots',
    title: 'Amazon Parrots for Sale UK | Blue-fronted & Yellow-nape | CITES',
    desc: 'Amazon parrots hand-raised in Spain with CITES documentation. Blue-fronted Amazon, Yellow-naped Amazon. Exceptional talkers. Delivered throughout the UK.',
    h1: 'Amazon Parrots',
    scientific: 'Amazona spp.',
    tagline: 'The classic talking parrot — vibrant, outgoing, and famously eloquent.',
    ogImage: '/images/homepage/amazon-parrot-hand-raised.webp',
    img1: '/images/loro-amazonico-01.webp',
    img1alt: 'Amazon parrot hand-raised for sale UK',
    img2: '/images/loro-amazonico-02.webp',
    img2alt: 'Blue-fronted Amazon Amazona aestiva close-up',
    badge: 'CITES Appendix II',
    esPath: '/loro-amazonico.html',
    frPath: '/fr/amazone-front-bleu/',
    ptPath: '/pt/amazona-a-venda',
    lifespan: '50–70 years',
    size: '26–40 cm, 250–700 g (species-dependent)',
    wingspan: '38–50 cm',
    vocab: '100–300+ words',
    noise: 'Moderate-loud',
    family: 'Families, experienced owners',
    body: `
<p><strong>Amazon parrots</strong> are among the world's most celebrated companion birds — outgoing, highly vocal, and equipped with a talent for human speech that rivals even the African Grey. Numerous species fall under the <em>Amazona</em> genus, and at Paraíso de Aves we principally breed the <strong>Blue-fronted Amazon</strong> (<em>Amazona aestiva</em>) and the <strong>Yellow-naped Amazon</strong> (<em>A. auropalliata</em>), both prized for their personalities and talking ability.</p>
<p>Amazon parrots are stocky, medium-large birds predominantly green with vivid flashes of colour depending on species — the Blue-fronted displaying blue and yellow facial markings, the Yellow-naped a bright yellow nape patch. Our Amazons are hand-raised from early life, socialised with multiple human contacts, and delivered with complete CITES documentation.</p>
<h3>Personality</h3>
<p>Amazon parrots are famously bold, theatrical, and sociable. They enjoy being the centre of attention, often performing vocally for an audience, and have a lively sense of humour. Unlike African Greys, which tend to be more reserved with strangers, Amazons are often immediately friendly and entertaining, which makes them popular at social gatherings.</p>
<p>They can also be opinionated — Amazons express their moods clearly through posture, eye-pinning (rapid dilation and contraction of the pupil), and vocal cues, and experienced owners learn to read these signals. Mature males can display seasonal territorial behaviour, which requires understanding and management.</p>
<h3>Talking ability</h3>
<p>Amazon parrots are exceptional vocal mimics. Blue-fronted Amazons regularly develop vocabularies of 100–300 words; Yellow-naped Amazons are considered among the finest avian vocalists, capable of singing entire songs in tune and with surprising clarity. Speech training is most effective between 3 months and 2 years of age.</p>`,
    diet: `<p>Amazons are prone to obesity when fed a seed-heavy diet. A healthy Amazon diet is:</p>
<ul>
  <li><strong>Pellets (50–60%):</strong> Harrison's Medium, Zupreem Natural, or Roudybush Daily Maintenance</li>
  <li><strong>Fresh vegetables (25–30%):</strong> kale, sweet pepper, broccoli, carrot, Swiss chard — high in Vitamin A</li>
  <li><strong>Fresh fruit (10%):</strong> pomegranate, papaya, apple, berries — in moderation</li>
  <li><strong>Seeds and nuts (5%):</strong> as treats only — sunflower seeds and nuts are high-fat and must not dominate the diet</li>
</ul>
<p>Amazons frequently develop atherosclerosis and liver disease on high-fat, seed-heavy diets. A pellet-based diet dramatically reduces these risks. Avoid avocado, chocolate, caffeine, onion, and garlic.</p>`,
    faqs: [
      ['Which Amazon parrot is best for talking?', 'The Yellow-naped Amazon and the Double Yellow-head Amazon are considered the finest talking Amazons. The Blue-fronted Amazon is also an excellent talker with a warm, clear voice. All three species hand-raised from an early age develop impressive vocabularies with consistent interaction.'],
      ['Are Amazon parrots good for beginners?', 'They are suitable for owners with some bird experience who have thoroughly researched the species. Their strong personalities and seasonal behaviour shifts require confident, consistent handling. They are less cognitively demanding than African Greys but more emotionally expressive than many other parrots.'],
      ['How long do Amazon parrots live?', '50–70 years in captivity with proper care. Like all large parrots, they are a genuinely lifelong commitment.'],
      ['Do Amazon parrots need CITES documentation?', 'Yes — all Amazona species sold commercially require CITES Appendix II documentation. We provide complete paperwork: CITES certificate, veterinary health certificate, and ring ID.'],
      ['How much does an Amazon parrot cost in the UK?', 'Contact us at paraisodeloros@gmail.com for current pricing and available species.'],
      ['Can you deliver Amazon parrots to the UK and Ireland?', 'Yes. We deliver via specialist live-animal air cargo throughout the UK and Ireland.'],
      ['Are Amazon parrots loud?', 'They produce moderate to loud vocalisations, particularly during their natural calling periods at dawn and dusk. They are generally less loud than large macaws but louder than many smaller species. Their vocal range includes singing, calling, and speech.'],
      ['What size cage does an Amazon parrot need?', 'Minimum 75×60×100 cm for smaller species; 90×60×120 cm or larger for bigger Amazons. Provide multiple perches of varying diameter and a generous selection of toys.'],
    ],
  },
  {
    slug: 'cockatoos',
    title: 'Cockatoos for Sale UK | Galah, Sulphur-crested & More | CITES',
    desc: 'Cockatoos hand-raised in Spain with full CITES documentation. Galah Cockatoo, Sulphur-crested, Umbrella. Affectionate, expressive. Delivered to the UK.',
    h1: 'Cockatoos',
    scientific: 'Cacatua & Eolophus spp.',
    tagline: 'Expressive, affectionate, and utterly charismatic — the clowns of the parrot world.',
    ogImage: '/images/homepage/cockatoo-galah-pink.jpg',
    img1: '/images/cacatua-01.webp',
    img1alt: 'Cockatoo hand-raised for sale UK',
    img2: '/images/cacatua-02.webp',
    img2alt: 'Galah Cockatoo Eolophus roseicapilla pink plumage',
    badge: 'CITES Appendix I/II',
    esPath: '/cacatua.html',
    frPath: '/fr/cacatoes-huppe-jaune/',
    ptPath: '/pt/cacatua-de-crista-amarela',
    lifespan: '40–80 years',
    size: '30–70 cm (species-dependent)',
    wingspan: '45–80 cm',
    vocab: '30–60 words',
    noise: 'Very loud',
    family: 'Experienced owners',
    body: `
<p><strong>Cockatoos</strong> are a group of 21 parrot species native to Australasia, distinguished by their dramatic erectile crests, powder-down feathers, and extraordinary emotional expressiveness. From the blush-pink <strong>Galah Cockatoo</strong> (<em>Eolophus roseicapilla</em>) to the imposing white <strong>Sulphur-crested Cockatoo</strong> (<em>Cacatua galerita</em>), these birds are celebrated worldwide for their affectionate natures, theatrical personalities, and powerful bonds with their human companions.</p>
<p>At Paraíso de Aves, we breed and hand-raise cockatoos in our specialist facility in Llíria, Valencia. Our birds are socialised from the very first week of life, accustomed to human contact, household sounds, and handling before they leave our care. Every bird departs with complete CITES documentation, a veterinary health certificate, and ring identification.</p>
<h3>Species we breed</h3>
<p>We principally work with the <strong>Galah Cockatoo</strong> (pink-and-grey, medium-sized, and widely considered the most adaptable cockatoo for family life) and the <strong>Sulphur-crested Cockatoo</strong> (large, white, yellow crest, formidably intelligent). Availability varies by season — contact us to enquire about specific species.</p>
<h3>Temperament</h3>
<p>Cockatoos are the most emotionally dependent parrots in aviculture. They form extraordinarily intense bonds with their primary companions and require more social contact than virtually any other bird species. A hand-raised cockatoo left alone for long periods will develop severe stress behaviours — screaming, feather destruction, self-mutilation in extreme cases.</p>
<p>This makes them deeply rewarding for owners who can dedicate the time, and genuinely unsuitable for those who cannot. If you work full-time and cannot arrange substantial daily interaction, a cockatoo is not the right bird.</p>`,
    diet: `<p>Cockatoos are prone to nutritional deficiencies and obesity on seed-heavy diets:</p>
<ul>
  <li><strong>Pellets (50–60%):</strong> Harrison's Bird Food, Roudybush Daily Maintenance</li>
  <li><strong>Fresh vegetables (25–30%):</strong> broccoli, kale, sweet pepper, courgette, carrot, sweet potato</li>
  <li><strong>Fresh fruit (10%):</strong> apple, berries, pomegranate, grapes — in moderation</li>
  <li><strong>Nuts and seeds (5–10%):</strong> as treats; sunflower seeds sparingly</li>
</ul>
<p>Cockatoos — particularly Galahs — are highly prone to obesity and associated lipomas. A low-fat, pellet-based diet is essential for long-term health. Avoid avocado, chocolate, caffeine, onion, and garlic.</p>`,
    faqs: [
      ['Are cockatoos good pets for families?', 'Galahs are often well-suited to family environments given proper socialisation. Larger cockatoos (Sulphur-crested, Umbrella) are better suited to experienced, committed owners who can provide the intense daily interaction they require.'],
      ['Why do cockatoos scream?', 'Cockatoos are naturally highly social birds and vocalise loudly to communicate with their flock. In captivity, screaming most commonly occurs when the bird is bored, lonely, or seeking attention. Ensuring sufficient daily interaction and enrichment reduces screaming significantly.'],
      ['How long do cockatoos live?', 'Galahs: 40–60 years; Sulphur-crested: 70–80 years or longer. These are extremely long-lived birds. A Sulphur-crested Cockatoo named Cookie held the Guinness World Record for the oldest known parrot at 83 years.'],
      ['Do cockatoos need CITES documentation?', 'Yes. Most commercially sold cockatoos require CITES documentation — Appendix I or II depending on species. We provide complete paperwork with every bird.'],
      ['How much do cockatoos cost in the UK?', 'Contact us at paraisodeloros@gmail.com for current pricing and species availability.'],
      ['Can you deliver cockatoos to the UK and Ireland?', 'Yes — via specialist live-animal air cargo with IATA-approved travel crates.'],
      ['Are cockatoos difficult to own?', 'They are among the most demanding pet birds due to their intense social needs and powerful beaks. They are not recommended for first-time bird owners. Their rewards are exceptional for the right owner, but the commitment should not be underestimated.'],
      ['Do cockatoos talk?', 'They can learn 30–60 words with consistent training. Galah Cockatoos tend to be better talkers than Sulphur-crested. Their voices are often softer and more melodic than macaws.'],
    ],
  },
  {
    slug: 'eclectus',
    title: 'Eclectus Parrot for Sale UK | Male & Female | CITES Registered',
    desc: 'Eclectus parrots hand-raised in Spain with full CITES documentation. Male green, female red-and-blue. Unique sexual dimorphism. Delivered throughout the UK.',
    h1: 'Eclectus Parrot',
    scientific: 'Eclectus roratus',
    tagline: 'Nature\'s most striking sexual dimorphism — the male and female look like entirely different species.',
    ogImage: '/images/eclectus-01.webp',
    img1: '/images/eclectus-01.webp',
    img1alt: 'Eclectus parrot male green hand-raised for sale UK',
    img2: '/images/eclectus-02.webp',
    img2alt: 'Eclectus parrot female red and blue plumage',
    badge: 'CITES Appendix II',
    esPath: '/eclectus.html',
    frPath: '/fr/eclectus/',
    ptPath: '/pt/papagaio-eclectus',
    lifespan: '40–60 years',
    size: '35–42 cm, 430–550 g',
    wingspan: 'Up to 50 cm',
    vocab: '40–80 words',
    noise: 'Moderate',
    family: 'Families, experienced owners',
    body: `
<p>The <strong>Eclectus parrot</strong> (<em>Eclectus roratus</em>) is one of the most visually distinctive parrots in the world — and the reason for its notoriety is unusual: the male and female look so different that early ornithologists classified them as completely separate species. The <strong>male</strong> is brilliant emerald green with a candy-corn orange-and-yellow beak; the <strong>female</strong> is vivid red with a blue chest patch and a black beak. The sexual dimorphism is among the most extreme in the bird kingdom.</p>
<p>Beyond appearance, the Eclectus is a calm, intelligent, and deeply perceptive bird. It is generally less neurotic than cockatoos and less demanding than African Greys, making it an accessible species for experienced bird owners transitioning to a more sophisticated companion parrot.</p>
<h3>Personality differences between sexes</h3>
<p><strong>Males</strong> tend to be more relaxed, sociable, and tolerant of handling. They are generally gentler and adapt more readily to multiple family members.<br>
<strong>Females</strong> are often more assertive, territorial (especially during breeding season), and may be more challenging for less experienced handlers. They are also frequently described as more bonded to their primary companion.</p>
<h3>Diet — a critical consideration</h3>
<p>The Eclectus has a significantly longer digestive tract than most parrots and is uniquely sensitive to dietary additives, artificial colourings, and excessive fat. A diet inappropriate for the Eclectus can cause feather-destructive behaviour that is commonly misattributed to stress or boredom. Getting the diet right is the single most important factor in Eclectus health.</p>`,
    diet: `<p>Eclectus parrots have unusually high requirements for fresh food and fibre:</p>
<ul>
  <li><strong>Fresh fruit (35–40%):</strong> papaya, mango, pomegranate, figs, berries, kiwi — essential and must not be reduced</li>
  <li><strong>Fresh vegetables (35–40%):</strong> silverbeet, kale, broccoli, sweet potato, corn, carrot, green beans</li>
  <li><strong>Cooked grains and legumes (10–15%):</strong> brown rice, quinoa, chickpeas, lentils</li>
  <li><strong>Sprouted seeds (10%):</strong> sunflower, mung bean, lentil sprouts</li>
  <li><strong>Pellets — with caution:</strong> only low-dye, additive-free pellets; many Eclectus keepers avoid pellets entirely as the artificial additives in standard pellets can trigger feather-destructive behaviour</li>
</ul>
<p>Avoid: avocado, onion, garlic, chocolate, caffeine, and any pellets with artificial colours or preservatives. Eclectus are more sensitive to dietary errors than most parrot species.</p>`,
    faqs: [
      ['Why do male and female Eclectus look so different?', 'The Eclectus exhibits extreme sexual dimorphism — a phenomenon found across many species but most dramatic in this parrot. The two sexes evolved different colour strategies: females are red and blue to camouflage in the nest cavity; males are green to camouflage while foraging in the forest canopy.'],
      ['Are Eclectus parrots good pets?', 'Yes — they are calm, intelligent, and affectionate. They are generally quieter than cockatoos or macaws and less emotionally intense. However, their dietary requirements are unique and must be met carefully to prevent feather-destructive behaviours.'],
      ['Do Eclectus parrots talk?', 'Yes — they develop impressive vocabularies of 40–80 words and have a clear, melodic voice. Many owners note that Eclectus vocabulary is underrated compared to the more publicised African Grey.'],
      ['Are male or female Eclectus better pets?', 'Males are typically calmer and more tolerant of handling. Females can be more assertive and territorial, particularly during seasonal hormonal cycles. For first-time Eclectus owners, a male is often recommended.'],
      ['Do Eclectus parrots need CITES documentation?', 'Yes — they are listed on CITES Appendix II. We provide complete documentation with every bird.'],
      ['How long do Eclectus parrots live?', '40–60 years with proper care. A substantial long-term commitment.'],
      ['Can you deliver an Eclectus parrot to the UK?', 'Yes — throughout the UK and Ireland via specialist live-animal air cargo.'],
      ['How much does an Eclectus parrot cost in the UK?', 'Contact us at paraisodeloros@gmail.com for current pricing and availability.'],
    ],
  },
  {
    slug: 'conures',
    title: 'Conures for Sale UK | Sun Conure, Green Cheek | CITES Breeder',
    desc: 'Conures hand-raised in Spain with CITES documentation. Sun Conure, Green-cheeked Conure, Jenday. Playful and affectionate. Delivered throughout the UK.',
    h1: 'Conures',
    scientific: 'Aratinga / Pyrrhura spp.',
    tagline: 'Big personality in a compact package — the most playful parrots you will ever meet.',
    ogImage: '/images/conuro-01.webp',
    img1: '/images/conuro-01.webp',
    img1alt: 'Sun Conure hand-raised for sale UK vibrant orange',
    img2: '/images/conuro-02.webp',
    img2alt: 'Green-cheeked Conure Pyrrhura molinae',
    badge: 'CITES Appendix II',
    esPath: '/conuro.html',
    frPath: '/fr/',
    ptPath: '/pt/conuro',
    lifespan: '20–30 years',
    size: '25–40 cm, 100–200 g (species-dependent)',
    wingspan: '30–46 cm',
    vocab: '10–30 words',
    noise: 'Loud (Sun), Moderate (Green-cheek)',
    family: 'Families, first-time owners',
    body: `
<p><strong>Conures</strong> are a diverse group of small to medium parrots native to Central and South America. Despite their modest size, conures pack an enormous personality into a compact frame — they are active, playful, curious, and deeply affectionate, forming genuine bonds with their owners. At Paraíso de Aves, we primarily breed the <strong>Sun Conure</strong> (<em>Aratinga solstitialis</em>), the <strong>Green-cheeked Conure</strong> (<em>Pyrrhura molinae</em>), and the <strong>Jenday Conure</strong> (<em>Aratinga jandaya</em>).</p>
<p>Conures are often recommended as an excellent "stepping-stone" species for those who wish to eventually own larger parrots — their care requirements, social needs, and interactive qualities are similar in kind to macaws and Greys, but scaled appropriately for a smaller animal.</p>
<h3>Species comparison</h3>
<p>The <strong>Sun Conure</strong> is the most striking visually — brilliant orange-yellow with green and blue accents — and is one of the louder conure species. The <strong>Green-cheeked Conure</strong> is quieter, more playful, and often considered the ideal apartment conure. The <strong>Jenday Conure</strong> falls between the two in both volume and appearance.</p>
<h3>Temperament</h3>
<p>All conure species are characterised by their high activity levels, insatiable curiosity, and affectionate nature. They love to play, forage, cuddle under clothing, and ride around on shoulders or in pockets. Most are excellent with children when socialised appropriately and enjoy the activity level of a busy household.</p>`,
    diet: `<p>Conures benefit from a varied diet despite their small size:</p>
<ul>
  <li><strong>Conure or small parrot pellets (50%):</strong> Harrison's Fine, Zupreem Natural Small</li>
  <li><strong>Fresh vegetables (25%):</strong> kale, broccoli, sweet pepper, sweet potato, carrot</li>
  <li><strong>Fresh fruit (15%):</strong> apple, mango, berries, grapes — in moderation</li>
  <li><strong>Seeds and sprouts (10%):</strong> sprouted sunflower, mung beans — as enrichment and treats</li>
</ul>
<p>Conures, especially Sun Conures, can be prone to Conure Bleeding Syndrome (CBS), which may be linked to Vitamin K deficiency. Ensure dark leafy greens are a regular part of the diet. Avoid avocado, chocolate, onion, garlic, and caffeine.</p>`,
    faqs: [
      ['Are Sun Conures good for beginners?', 'Yes and no. They are affectionate and sociable, and their size makes handling easier than large macaws. However, the Sun Conure\'s call is extremely loud — a significant consideration for flat or terraced-house dwellers. The Green-cheeked Conure is considerably quieter and often better suited to noise-sensitive environments.'],
      ['Do conures talk?', 'Some individuals learn 10–30 words, though conures are not renowned talkers compared to Amazons or African Greys. They compensate with expressive body language, whistles, and playful vocalisations that many owners find more endearing than speech.'],
      ['How long do conures live?', '20–30 years with proper care. A significant commitment for a bird of their size.'],
      ['Are conures good with children?', 'Generally yes — their playful, active temperament suits energetic households well. They should always be supervised with very young children, as their bite can cause injury and their fragile bodies can be unintentionally harmed.'],
      ['What size cage does a conure need?', 'Minimum 60×45×90 cm; a larger cage is always better. Conures are active birds that need space to climb and play. A well-stocked cage with multiple perches, swings, and foraging toys is essential.'],
      ['Do you deliver conures to the UK?', 'Yes — throughout the UK and Ireland via specialist live-animal air cargo. Contact us at paraisodeloros@gmail.com for current availability and pricing.'],
      ['Are Green-cheeked Conures quieter than Sun Conures?', 'Yes — significantly so. Green-cheeked Conures are among the quietest conure species and one of the best choices for those who want the conure personality without the volume of the Sun Conure.'],
      ['Do conures need CITES documentation?', 'Yes — all Aratinga and Pyrrhura species used in commerce require CITES Appendix II documentation. We provide complete paperwork with every bird.'],
    ],
  },
  {
    slug: 'caiques',
    title: 'Caique Parrots for Sale UK | Black-headed & White-bellied | CITES',
    desc: 'Caique parrots hand-raised in Spain with CITES documentation. Black-headed and White-bellied Caique. The most playful parrots in the world. UK delivery.',
    h1: 'Caique Parrots',
    scientific: 'Pionites melanocephalus / leucogaster',
    tagline: 'The clowns of the parrot world — boundless energy, vivid colours, and irresistible personality.',
    ogImage: '/images/gallery/aves-disponibles-conuro-verde-percha-03.jpg',
    img1: '/images/gallery/aves-disponibles-conuro-verde-percha-03.jpg',
    img1alt: 'Caique parrot hand-raised for sale UK playful',
    img2: '/images/loro-amazonico-01.webp',
    img2alt: 'Caique parrot vivid colour plumage',
    badge: 'CITES Appendix II',
    esPath: '/especies/caique',
    frPath: '/fr/especies/caique',
    ptPath: '/pt/especies/caique',
    lifespan: '25–40 years',
    size: '23 cm, 140–170 g',
    wingspan: '25–30 cm',
    vocab: '10–20 words',
    noise: 'Moderate-loud',
    family: 'Active families, single owners',
    body: `
<p><strong>Caique parrots</strong> are widely regarded as the most energetic and playful parrots in aviculture. These compact, brightly coloured birds from South America — the <strong>Black-headed Caique</strong> (<em>Pionites melanocephalus</em>) and the <strong>White-bellied Caique</strong> (<em>Pionites leucogaster</em>) — pack extraordinary vitality into their small frames, bouncing, hopping, wrestling with toys, and performing acrobatics that endlessly entertain their owners.</p>
<p>At approximately 23 cm and 150 g, the Caique is a small bird with huge personality. They are intensely curious, fearless explorers who investigate every corner of their environment with unflagging enthusiasm. Hand-raised from birth, our Caiques are sociable and comfortable with human handling from their earliest weeks.</p>
<h3>Appearance</h3>
<p>The <strong>Black-headed Caique</strong> features a jet-black cap, orange cheeks, green back and wings, and a yellow-orange underpart. The <strong>White-bellied Caique</strong> replaces the black cap with green and orange, and has a pristine white belly. Both are exceptionally vivid birds — a collection of contrasting blocks of colour that look almost hand-painted.</p>
<h3>Personality</h3>
<p>If a single word describes the Caique, it is <em>exuberant</em>. They play harder than any other parrot species, frequently wrestling with toys, rolling onto their backs, and initiating contact play with their owners. They are bold and fearless — a Caique will approach a new object or person without hesitation.</p>
<p>They can be assertive and, occasionally, nippy if overstimulated — an important consideration for households with young children. They also have a strong flock mentality and can be kept in same-species pairs, though single birds bond more intensely with their humans.</p>`,
    diet: `<p>Caiques thrive on a varied, fresh-food diet:</p>
<ul>
  <li><strong>Pellets (40–50%):</strong> Harrison's Fine or Zupreem Natural Small</li>
  <li><strong>Fresh fruit (25%):</strong> papaya, mango, berries, grapes, apple — Caiques love fruit</li>
  <li><strong>Fresh vegetables (20%):</strong> sweet pepper, carrot, broccoli, kale, courgette</li>
  <li><strong>Seeds and sprouts (10%):</strong> sprouted mung bean, sunflower sprouts as enrichment</li>
</ul>
<p>Caiques are energetic and benefit from foraging opportunities — hide food in toys, paper bags, and foraging boxes to keep them engaged. Avoid avocado, chocolate, onion, garlic, caffeine, and alcohol.</p>`,
    faqs: [
      ['Are Caiques good first parrots?', 'They can be suitable for committed first-time owners who have researched the species carefully. They are easier to manage size-wise than large macaws, but their energy levels and occasional assertiveness require confident, consistent handling.'],
      ['Do Caiques bite?', 'They can nip when overstimulated or during play, particularly as juveniles. Hand-raised birds socialised from birth are significantly gentler than parent-raised birds. Learning to read body language — puffing up, eye-pinning — helps avoid accidental bites.'],
      ['Do Caiques talk?', 'A few individuals learn 10–20 words, but Caiques are not primarily renowned for speech. Their personality, playfulness, and visual appeal are the main attractions.'],
      ['Can Caiques be kept in pairs?', 'Yes — same-species pairs can live together harmoniously. Be aware that a bonded pair will typically be less intensely bonded to their human owners than a single bird, which may or may not suit your preferences.'],
      ['How long do Caiques live?', '25–40 years with proper care. Their long lifespan means careful planning for long-term ownership.'],
      ['Do Caiques need CITES documentation?', 'Yes — they require CITES Appendix II documentation. We provide complete paperwork with every bird.'],
      ['Can you deliver Caiques to the UK?', 'Yes — throughout the UK and Ireland via specialist live-animal air cargo. Contact us at paraisodeloros@gmail.com.'],
      ['How much does a Caique cost in the UK?', 'Contact us at paraisodeloros@gmail.com for current pricing.'],
    ],
  },
  {
    slug: 'pionus',
    title: 'Pionus Parrots for Sale UK | Blue-headed & Maximilian | CITES',
    desc: 'Pionus parrots hand-raised in Spain with CITES documentation. Blue-headed Pionus, Maximilian\'s Pionus. Calm, independent, ideal family parrots. UK delivery.',
    h1: 'Pionus Parrots',
    scientific: 'Pionus spp.',
    tagline: 'The underrated gem of the parrot world — calm, independent, and deeply endearing.',
    ogImage: '/images/loro-amazonico-01.webp',
    img1: '/images/loro-amazonico-01.webp',
    img1alt: 'Pionus parrot hand-raised calm for sale UK',
    img2: '/images/loro-amazonico-02.webp',
    img2alt: 'Blue-headed Pionus Pionus menstruus close-up',
    badge: 'CITES Appendix II',
    esPath: '/especies/loro-pionus',
    frPath: '/fr/especies/perroquet-pionus',
    ptPath: '/pt/especies/papagaio-pionus',
    lifespan: '25–40 years',
    size: '28–32 cm, 200–280 g',
    wingspan: '35–42 cm',
    vocab: '20–40 words',
    noise: 'Quiet-moderate',
    family: 'Excellent for families, beginners, flats',
    body: `
<p><strong>Pionus parrots</strong> are often described as the best-kept secret in aviculture — gentle, calm, adaptable birds that offer many of the qualities of larger parrots without the demanding noise levels and intensity of Amazons, macaws, or cockatoos. The <strong>Blue-headed Pionus</strong> (<em>Pionus menstruus</em>) and <strong>Maximilian's Pionus</strong> (<em>P. maximiliani</em>) are our primary breeding species, both known for their even temperaments and suitability for family life.</p>
<p>Pionus parrots are stocky, medium-sized birds with a characteristic iridescent purple-red undertail that flashes brilliantly in sunlight. The Blue-headed Pionus has a vivid cobalt head contrasting with a green body; the Maximilian's is predominantly dusky green-brown with iridescent scaling. Both are quietly beautiful birds that reward close observation.</p>
<h3>Why Pionus parrots are underrated</h3>
<p>The Pionus suffers commercially from being overshadowed by the more dramatic macaws, Greys, and cockatoos. This is genuinely to the advantage of those who discover them. They are:</p>
<ul>
  <li><strong>Quieter</strong> than most medium and large parrots — suitable for flats and urban environments</li>
  <li><strong>Less emotionally intense</strong> than cockatoos or African Greys</li>
  <li><strong>More independent</strong> than many species — they can entertain themselves without constant attention</li>
  <li><strong>Excellent family birds</strong> — tolerant of multiple family members, generally gentle with children</li>
  <li><strong>Long-lived but not as extreme</strong> as macaws — 25–40 years with proper care</li>
</ul>
<h3>Temperament</h3>
<p>Pionus parrots are calm, gentle, and affectionate without being clingy. Unlike cockatoos, which may scream for attention if ignored, a Pionus will quietly entertain itself with toys and foraging. They enjoy interaction on their own terms and can be wonderfully affectionate birds once trust is established — often allowing prolonged preening and physical contact once comfortable.</p>`,
    diet: `<p>Pionus parrots benefit from a nutritious, varied diet:</p>
<ul>
  <li><strong>Pellets (50%):</strong> Harrison's Fine or Medium, Roudybush Daily Maintenance</li>
  <li><strong>Fresh vegetables (25–30%):</strong> kale, broccoli, sweet pepper, carrot, Swiss chard, sweet potato</li>
  <li><strong>Fresh fruit (15%):</strong> apple, berries, papaya, mango — in moderation</li>
  <li><strong>Seeds and sprouts (5–10%):</strong> sprouted sunflower, mung bean; dry seeds as treats only</li>
</ul>
<p>Pionus parrots can be prone to Vitamin A deficiency if fed a seed-heavy diet — dark orange and leafy green vegetables help prevent this. Avoid avocado, chocolate, onion, garlic, caffeine, and salted foods.</p>`,
    faqs: [
      ['Are Pionus parrots good for beginners?', 'Yes — they are considered one of the best medium-parrot choices for first-time bird owners. Their calm temperament, moderate noise level, and relative independence make them accessible and enjoyable for new owners.'],
      ['Are Pionus parrots quiet?', 'Yes, relative to most parrot species. They are considerably quieter than Sun Conures, cockatoos, Amazons, and macaws. This makes them one of the best choices for flat-dwellers or those with noise-sensitive neighbours.'],
      ['Do Pionus parrots talk?', 'They learn 20–40 words and can be surprisingly clear speakers. They are not in the same category as African Greys or Yellow-naped Amazons, but their voices are pleasantly melodic and they develop charming personal phrases.'],
      ['How long do Pionus parrots live?', '25–40 years with proper care — a meaningful long-term commitment.'],
      ['Are Pionus parrots good with children?', 'Generally yes. They are tolerant, gentle, and adaptable. As always, supervision with young children and teaching children to respect the bird\'s body language signals is essential.'],
      ['Do Pionus parrots need CITES documentation?', 'Yes — all Pionus species in commercial trade require CITES Appendix II documentation. We provide complete paperwork with every bird.'],
      ['Can you deliver Pionus parrots to the UK?', 'Yes — throughout the UK and Ireland via specialist live-animal air cargo. Contact us at paraisodeloros@gmail.com.'],
      ['What makes Pionus parrots different from Amazon parrots?', 'They are closely related but Pionus are generally calmer, quieter, and less assertive than Amazons. They lack the Amazon\'s seasonal hormonal swings. Many owners who found Amazons too intense switch to Pionus and are delighted by the difference.'],
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// DATA — CITIES
// ═══════════════════════════════════════════════════════════════════
const UK_CITIES = [
  { slug: 'london', name: 'London', region: 'Greater London', airport: 'Heathrow (LHR)', country: 'UK',
    desc: 'Parrots for sale with delivery to London — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered to London Heathrow.' },
  { slug: 'manchester', name: 'Manchester', region: 'Greater Manchester', airport: 'Manchester Airport (MAN)', country: 'UK',
    desc: 'Parrots for sale with delivery to Manchester — African Grey, Macaw, Cockatoo and more. CITES certified breeder. Hand-raised birds delivered to Manchester Airport.' },
  { slug: 'birmingham', name: 'Birmingham', region: 'West Midlands', airport: 'Birmingham Airport (BHX)', country: 'UK',
    desc: 'Parrots for sale with delivery to Birmingham — African Grey, Macaw, Cockatoo and more. CITES certified breeder. Hand-raised birds delivered to Birmingham Airport.' },
  { slug: 'liverpool', name: 'Liverpool', region: 'Merseyside', airport: 'Liverpool John Lennon Airport (LPL)', country: 'UK',
    desc: 'Parrots for sale with delivery to Liverpool — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered via Liverpool Airport.' },
  { slug: 'leeds', name: 'Leeds', region: 'West Yorkshire', airport: 'Leeds Bradford Airport (LBA)', country: 'UK',
    desc: 'Parrots for sale with delivery to Leeds — African Grey, Macaw, Cockatoo and more. CITES certified breeder. Hand-raised birds delivered via Leeds Bradford Airport.' },
  { slug: 'glasgow', name: 'Glasgow', region: 'Scotland', airport: 'Glasgow Airport (GLA)', country: 'UK',
    desc: 'Parrots for sale with delivery to Glasgow — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered to Glasgow Airport.' },
  { slug: 'edinburgh', name: 'Edinburgh', region: 'Scotland', airport: 'Edinburgh Airport (EDI)', country: 'UK',
    desc: 'Parrots for sale with delivery to Edinburgh — African Grey, Macaw, Cockatoo and more. CITES certified breeder. Hand-raised birds delivered to Edinburgh Airport.' },
  { slug: 'bristol', name: 'Bristol', region: 'South West England', airport: 'Bristol Airport (BRS)', country: 'UK',
    desc: 'Parrots for sale with delivery to Bristol — African Grey, Macaw, Cockatoo and more. CITES certified breeder. Hand-raised birds delivered via Bristol Airport.' },
  { slug: 'cardiff', name: 'Cardiff', region: 'Wales', airport: 'Cardiff Airport (CWL)', country: 'UK',
    desc: 'Parrots for sale with delivery to Cardiff — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered to Cardiff Airport.' },
  { slug: 'belfast', name: 'Belfast', region: 'Northern Ireland', airport: 'Belfast International Airport (BFS)', country: 'UK',
    desc: 'Parrots for sale with delivery to Belfast — African Grey, Macaw, Cockatoo and more. CITES certified breeder. Hand-raised birds delivered to Belfast International Airport.' },
];

const IE_CITIES = [
  { slug: 'dublin', name: 'Dublin', region: 'County Dublin', airport: 'Dublin Airport (DUB)', country: 'Ireland',
    desc: 'Parrots for sale with delivery to Dublin — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered to Dublin Airport.' },
  { slug: 'cork', name: 'Cork', region: 'County Cork', airport: 'Cork Airport (ORK)', country: 'Ireland',
    desc: 'Parrots for sale with delivery to Cork — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered to Cork Airport.' },
  { slug: 'galway', name: 'Galway', region: 'County Galway', airport: 'Ireland West Airport (NOC)', country: 'Ireland',
    desc: 'Parrots for sale with delivery to Galway — African Grey, Macaw, Cockatoo and more. CITES certified breeder. Hand-raised birds delivered via Ireland West Airport.' },
  { slug: 'limerick', name: 'Limerick', region: 'County Limerick', airport: 'Shannon Airport (SNN)', country: 'Ireland',
    desc: 'Parrots for sale with delivery to Limerick — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered via Shannon Airport.' },
  { slug: 'waterford', name: 'Waterford', region: 'County Waterford', airport: 'Waterford Airport (WAT)', country: 'Ireland',
    desc: 'Parrots for sale with delivery to Waterford — African Grey, Macaw, Cockatoo and more. CITES certified breeder in Spain. Hand-raised birds delivered to Waterford Airport.' },
];

// ═══════════════════════════════════════════════════════════════════
// DATA — KNOWLEDGE ARTICLES
// ═══════════════════════════════════════════════════════════════════
const KNOWLEDGE_ARTICLES = [
  {
    slug: 'how-to-buy-a-parrot',
    title: 'How to Buy a Parrot in the UK | Complete 2026 Guide',
    desc: 'Complete guide to buying a parrot in the UK in 2026. CITES requirements, what to look for in a breeder, questions to ask, red flags to avoid.',
    h1: 'How to Buy a Parrot in the UK',
    intro: 'Buying a parrot in the United Kingdom is not like buying a dog or a cat. The legal requirements, the ethical considerations, and the long-term commitment involved make this one of the most significant decisions a pet owner can make.',
    body: `
<h3>1. Research the species thoroughly</h3>
<p>The single most important step before buying any parrot is to research the specific species you are interested in for at least 2–3 months. Different species have dramatically different requirements: an African Grey needs constant mental stimulation; a Cockatoo needs hours of daily social contact; a Hyacinth Macaw needs space for a 100 cm wingspan. What works beautifully for one person's lifestyle may be entirely unsuitable for another.</p>
<p>Join UK-based parrot forums and Facebook groups, read multiple books (Rosemary Low's species guides are excellent), and if possible, arrange to meet adult birds of your target species at a rescue or breeder before committing.</p>
<h3>2. Understand the CITES requirements</h3>
<p>All parrots sold commercially in the UK must have CITES (Convention on International Trade in Endangered Species) documentation. Species are categorised as Appendix I (strictest, includes African Grey, Hyacinth Macaw, Scarlet Macaw) or Appendix II (including most macaws, Amazons, Cockatoos, Eclectus). Since Brexit, UK-specific documentation requirements (Article 10 certificates) apply to import from EU breeders.</p>
<p>Never purchase a parrot without proper documentation — it is illegal, and any bird without papers cannot be legally re-sold, transported internationally, or insured properly.</p>
<h3>3. Find a reputable, registered breeder</h3>
<p>A legitimate breeder will hold all necessary breeding licences, provide verifiable CITES documentation for every bird sold, allow you to visit their facility, and provide post-sale support. Red flags include: refusing facility visits, no CITES paperwork, unusually low prices, birds described as "farmed" without documentation, and breeders who pressure you to decide quickly.</p>
<p>At Paraíso de Aves, we are a registered specialist breeding facility in Llíria, Valencia, Spain with over a decade of experience breeding and hand-raising psittacines for European homes. We provide complete documentation with every bird and support new owners throughout the acclimatisation period.</p>
<h3>4. Hand-raised vs parent-raised</h3>
<p>For companion parrots, hand-raised birds — those fed by human hands from the earliest days of life — are significantly preferable. They are socialised with humans, accustomed to handling, and form closer bonds more quickly. Parent-raised birds can be tamed, but the process requires considerably more time and expertise.</p>
<p>All birds from Paraíso de Aves are hand-raised from the first week of life by our specialist team.</p>
<h3>5. Prepare before the bird arrives</h3>
<p>Set up the cage, perches, and enrichment items before the bird arrives. Identify an avian vet in your area — a specialist small animal/avian vet, not a general practice — and book an introductory health check within the first fortnight. Prepare a diet plan based on the species' nutritional needs. Have contact details for the breeder available for any questions in the first weeks.</p>
<h3>6. Budget honestly</h3>
<p>The purchase price is the beginning of the financial commitment, not the end. Factor in: large cage (£400–£2,000+), annual avian vet visits (£100–£300), quality food (£50–£150 per month for larger species), enrichment toys (£30–£100 per month), emergency vet fund (keep £1,000–£3,000 in reserve), and potentially bird-sitting costs during holidays. Parrots are expensive animals to keep properly.</p>`,
  },
  {
    slug: 'parrot-prices',
    title: 'Parrot Prices in the UK 2026 | How Much Do Parrots Cost?',
    desc: 'Complete guide to parrot prices in the UK in 2026. How much do African Greys, Macaws, Cockatoos and other species cost? What affects the price?',
    h1: 'Parrot Prices in the UK — 2026 Guide',
    intro: 'Parrot prices in the UK vary enormously — from a few hundred pounds for a hand-raised Conure to several thousand for a rare Hyacinth Macaw or Spix\'s Macaw. Understanding what drives price differences helps you budget appropriately and identify suspicious deals.',
    body: `
<h3>What determines parrot prices?</h3>
<p>Multiple factors drive the price of a hand-raised parrot in the UK:</p>
<ul>
  <li><strong>Species rarity:</strong> CITES Appendix I species (African Grey, Hyacinth Macaw, Scarlet Macaw) command higher prices due to regulated breeding and documentation costs</li>
  <li><strong>Age:</strong> young, weaned birds (6–12 months) typically cost more than adults; true fledglings requiring hand-feeding are highest</li>
  <li><strong>Hand-raising quality:</strong> birds with extensive human socialisation, consistent handling, and enrichment experience cost more — and are worth more as companions</li>
  <li><strong>Documentation:</strong> legitimate CITES papers, health certificates, and ring IDs add cost but are non-negotiable for legal birds</li>
  <li><strong>Country of origin:</strong> purchasing from a European specialist breeder with a strong reputation typically costs more than buying from a local seller without documentation — and is infinitely safer</li>
  <li><strong>Availability:</strong> seasonal; breeding produces birds at specific times of year, and popular species with limited production sell quickly at premium</li>
</ul>
<h3>Price ranges by species (approximate, 2026)</h3>
<p>These are indicative ranges. Contact us directly for current pricing:</p>
<ul>
  <li>Green-cheeked Conure: £300–£500</li>
  <li>Sun Conure: £400–£700</li>
  <li>Pionus Parrot: £500–£900</li>
  <li>Eclectus Parrot: £700–£1,200</li>
  <li>Amazon Parrot (Blue-fronted): £800–£1,500</li>
  <li>African Grey (Congo): £1,000–£2,500</li>
  <li>Caique: £600–£1,000</li>
  <li>Cockatoo (Galah): £600–£1,200</li>
  <li>Blue-and-Yellow Macaw: £1,200–£2,500</li>
  <li>Catalina Macaw: £1,500–£3,000</li>
  <li>Scarlet Macaw: £2,000–£4,000</li>
  <li>Green-wing Macaw: £2,000–£3,500</li>
  <li>Hyacinth Macaw: £8,000–£20,000+</li>
</ul>
<h3>Warning signs of suspiciously low prices</h3>
<p>If a price seems too good to be true, it almost certainly is. Be extremely wary of: birds offered at half the typical market rate, sellers who cannot provide original CITES documentation, "pet only" birds sold without papers, birds described as "captive bred" without a registered breeder's details, and any online listing from anonymous sellers with no verifiable facility.</p>
<p>The cost of veterinary care for a sick, undocumented bird — plus the legal implications of unknowingly owning an improperly documented animal — will far exceed any apparent saving at point of purchase.</p>
<h3>The true cost of ownership</h3>
<p>The purchase price is the smallest component of the lifetime cost of a large parrot. A macaw living 60 years will cost considerably more in food, vet care, housing, and enrichment than its initial price tag. Budget carefully and honestly for the full responsibility of parrot ownership.</p>`,
  },
  {
    slug: 'choosing-the-right-parrot',
    title: 'Choosing the Right Parrot | Which Species Is Best for You?',
    desc: 'Comprehensive guide to choosing the right parrot for your lifestyle. African Grey vs Macaw vs Amazon vs Cockatoo — which species suits your home and experience level?',
    h1: 'Choosing the Right Parrot for You',
    intro: 'The most common mistake new parrot owners make is choosing a species based on appearance or popularity rather than compatibility with their lifestyle. This guide helps you match your household to the right bird.',
    body: `
<h3>First questions: honestly assess your situation</h3>
<ul>
  <li><strong>Time available daily:</strong> African Greys, cockatoos, and large macaws need 3–4+ hours of interaction. Pionus and Eclectus are more independent. Conures fall in the middle.</li>
  <li><strong>Noise tolerance (and neighbours):</strong> Large macaws and Sun Conures are very loud. Pionus parrots, Green-cheeked Conures, and Eclectus are quieter. If you live in a flat or terraced house, this matters enormously.</li>
  <li><strong>Experience level:</strong> African Greys, Cockatoos, and Scarlet Macaws are best for experienced owners. Conures, Pionus, and Caiques suit first-time owners willing to learn.</li>
  <li><strong>Children in the house:</strong> Blue-and-Yellow Macaws, Galahs, Pionus, and Green-cheeked Conures generally tolerate families well. African Greys and large Cockatoos require more careful management with young children.</li>
  <li><strong>Space:</strong> A Hyacinth Macaw needs a room-sized enclosure. A Conure needs a 60×45×90 cm cage minimum. Be honest about what space you can genuinely provide.</li>
  <li><strong>Longevity planning:</strong> Can you commit for 40–70 years? Do you have a plan for what happens to the bird if you can no longer care for it?</li>
</ul>
<h3>Species by lifestyle compatibility</h3>
<p><strong>Best for first-time owners:</strong> Pionus Parrot, Green-cheeked Conure, Caique</p>
<p><strong>Best for families with children:</strong> Blue-and-Yellow Macaw, Galah Cockatoo, Green-cheeked Conure, Pionus</p>
<p><strong>Best for flat/apartment living:</strong> Pionus Parrot, Eclectus, Green-cheeked Conure</p>
<p><strong>Best for experienced owners seeking deep bonding:</strong> African Grey, Cockatoo, Catalina Macaw</p>
<p><strong>Most impressive/spectacular:</strong> Hyacinth Macaw, Scarlet Macaw, Green-wing Macaw</p>
<p><strong>Best for those who want a talker:</strong> African Grey, Yellow-naped Amazon, Blue-fronted Amazon</p>
<h3>The importance of meeting the bird before deciding</h3>
<p>Photos and descriptions — however accurate — cannot substitute for meeting a parrot in person. Whenever possible, visit the breeder's facility to interact with adult birds of your target species before committing. At Paraíso de Aves, we welcome prospective owners to visit our aviary in Llíria, Valencia, or can arrange video calls showing our available birds.</p>`,
  },
  {
    slug: 'cites-explained',
    title: 'CITES Explained | Parrot Import Rules for the UK 2026',
    desc: 'Full guide to CITES documentation for importing parrots to the UK. Appendix I vs II, Article 10 certificates, post-Brexit rules, and what your breeder must provide.',
    h1: 'CITES Explained for UK Parrot Buyers',
    intro: 'CITES (the Convention on International Trade in Endangered Species of Wild Fauna and Flora) is the international treaty governing the trade of over 38,000 species. For parrot buyers in the UK, understanding CITES is essential — it is the legal foundation for every legitimate parrot transaction.',
    body: `
<h3>What is CITES?</h3>
<p>Established in 1963 and currently signed by 183 countries, CITES regulates international trade in wildlife and wildlife products to prevent it driving species toward extinction. The treaty classifies species into three appendices based on conservation status:</p>
<ul>
  <li><strong>Appendix I:</strong> Species threatened with extinction. Commercial trade is highly restricted and requires both export and import permits. Parrots in this category include the African Grey (<em>Psittacus erithacus</em>), Hyacinth Macaw (<em>Anodorhynchus hyacinthinus</em>), and Scarlet Macaw (<em>Ara macao</em>).</li>
  <li><strong>Appendix II:</strong> Species not currently threatened but potentially harmed by uncontrolled trade. Commercial trade is allowed but requires export documentation. Most commercial parrot species fall here — Blue-and-Yellow Macaw, Amazon Parrots, Eclectus, Conures, Cockatoos.</li>
  <li><strong>Appendix III:</strong> Species listed at the request of individual countries for specific regulation. Rare in parrot trade.</li>
</ul>
<h3>Post-Brexit CITES requirements for the UK</h3>
<p>Since the United Kingdom left the EU's single market, parrots imported from EU countries (including Spain) require additional documentation. The key requirements are:</p>
<ul>
  <li><strong>Appendix I species:</strong> require a Spanish CITES export permit AND a UK CITES import permit (Article 10 certificate issued by APHA — Animal and Plant Health Agency). The UK importer must apply for the import permit before the bird travels.</li>
  <li><strong>Appendix II species:</strong> require a Spanish CITES export permit and a UK notification form. The process is less restrictive than Appendix I but still mandatory.</li>
  <li><strong>Veterinary health certificate:</strong> all live animals entering the UK from the EU must have a veterinary health certificate issued in the country of origin within 10 days of travel.</li>
  <li><strong>Border inspection:</strong> all imports must go through a Border Control Post (BCP) equipped to handle live animals. Not all UK airports qualify — we will advise on the appropriate entry point for your bird.</li>
</ul>
<h3>What we provide</h3>
<p>Paraíso de Aves handles all Spanish documentation — export permits, veterinary health certificates, species certificates — from our end. We will guide you through the process of obtaining your UK import permit and recommend an APHA-registered agent if you prefer professional assistance with the paperwork. We have completed this process dozens of times and know every step thoroughly.</p>`,
  },
  {
    slug: 'air-cargo-delivery',
    title: 'Air Cargo Parrot Delivery to UK | How It Works | Paraíso de Aves',
    desc: 'How parrot delivery via air cargo works from Spain to the UK. IATA crates, airline procedures, documentation, collection at the airport — complete 2026 guide.',
    h1: 'Air Cargo Delivery — How We Deliver Parrots to the UK',
    intro: 'Delivering live parrots from our aviary in Llíria, Valencia to the United Kingdom involves careful preparation, strict regulatory compliance, and specialist handling throughout. Here is exactly how our delivery process works.',
    body: `
<h3>Step 1: Documentation preparation (4–8 weeks before travel)</h3>
<p>Well before travel, we begin preparing all required documentation. This includes the Spanish CITES export permit (applied for 4–6 weeks in advance), the veterinary health certificate (completed within 10 days of travel), and any species-specific paperwork. For Appendix I species, we will have been guiding you through your UK import permit application in parallel.</p>
<h3>Step 2: Travel crate preparation</h3>
<p>Each bird travels in an IATA Live Animal Regulation (LAR)-compliant crate. These crates are specifically designed for live bird transport: adequate ventilation, appropriate dimensions for the species, secure latching, and moisture-absorbing substrate. We select the correct crate size for the species — a Conure travels in a very different crate from a Hyacinth Macaw.</p>
<p>The bird is acclimated to the travel crate in the days before departure, reducing stress during the journey. Food and water are provided in secure containers within the crate.</p>
<h3>Step 3: Airline booking and specialist freight</h3>
<p>Not all airlines accept live birds, and those that do have strict requirements. We work with specialist live-animal freight forwarders who have established relationships with airlines operating approved live-animal cargo services between Spain and UK airports. The birds travel in the temperature-controlled cargo hold, not in the passenger cabin.</p>
<h3>Step 4: Border inspection on arrival</h3>
<p>On arrival at a UK Border Control Post equipped for live animal inspection, your bird will be cleared by a Border Force officer with APHA authority. All documentation is examined, the bird is briefly inspected, and clearance is issued. The entire process typically takes 2–4 hours from landing.</p>
<h3>Step 5: Collection</h3>
<p>You collect your bird from the airport cargo terminal once clearance is issued. We will have communicated the precise collection procedures, timing, and location in advance. You will need to bring your identification and UK import permit documentation.</p>
<h3>Journey time and welfare</h3>
<p>The total journey — from our aviary to clearance at a UK airport — is typically 12–24 hours for most UK destinations. Our birds are conditioned for travel and show minimal stress. We monitor welfare throughout and the freight forwarder maintains contact with us during transit.</p>`,
  },
  {
    slug: 'preparing-your-home',
    title: 'Preparing Your Home for a Parrot | Complete UK Guide 2026',
    desc: 'Complete guide to preparing your home for a new parrot. Cage setup, bird-proofing, diet preparation, vet selection, and first-week acclimatisation in the UK.',
    h1: 'Preparing Your Home for a New Parrot',
    intro: 'The period between placing your deposit and your bird\'s arrival is one of the most valuable you have. Preparation done thoroughly before the bird arrives dramatically reduces stress — for both the bird and you — in the critical first weeks.',
    body: `
<h3>Selecting and setting up the cage</h3>
<p>Install the cage in its permanent location before the bird arrives. Choose a location that is: part of the household's social centre (not isolated in a back room), away from direct draughts, free from kitchen fumes (non-stick cookware releases PTFE fumes that are fatal to birds — never use Teflon near parrots), and not in direct full sun for extended periods. Ideally at human eye height or slightly above.</p>
<p>Prepare the cage with 3–4 perches of varying diameter and material — natural wood perches from apple, willow, or hazel are ideal. Install 2–3 food dishes (one for pellets, one for fresh food, one for water) securely attached to the cage bars. Add 3–5 age-appropriate enrichment items: foraging toys, chew toys, and hanging items. Do not overcrowd the cage — the bird needs room to move.</p>
<h3>Bird-proofing the interaction space</h3>
<p>Before allowing your bird any out-of-cage time, thoroughly bird-proof the area. Remove or secure: electrical cables (parrots chew everything), toxic houseplants (many common houseplants are toxic to birds — check every plant), candles, air fresheners and scented plug-ins (toxic fumes), non-stick cookware in the kitchen, open water (toilet, fish tank, deep bowls), and open windows without secure screens.</p>
<h3>Finding an avian vet</h3>
<p>Before your bird arrives, identify an avian specialist vet within reasonable distance. General practice vets often lack the specific training to treat parrots effectively. Search for vets with RCVS accreditation in avian medicine, or ask for recommendations in UK parrot owner communities. Book an introductory health check within 2 weeks of the bird's arrival.</p>
<h3>Preparing the diet</h3>
<p>Source quality pellets appropriate for the species before the bird arrives — Harrison's Bird Foods is widely regarded as the gold standard in the UK. Buy a variety of appropriate fresh vegetables and fruit. Do not make dramatic dietary changes immediately — transition gradually over 2–3 weeks if switching from the diet the bird received at the breeder.</p>
<h3>The first week</h3>
<p>Allow the bird 3–5 days to acclimatise to its new environment before expecting it to interact confidently. Keep the household calm, speak to the bird softly from a distance, and allow it to observe its new surroundings at its own pace. Avoid the temptation to handle frequently in the first days — trust is built gradually. Follow our acclimatisation guide included with every bird we deliver.</p>`,
  },
  {
    slug: 'best-family-parrots',
    title: 'Best Family Parrots UK | Which Parrot Is Right for Your Family?',
    desc: 'Which parrots make the best family pets in the UK? African Grey, Blue Macaw, Galah, Pionus, Conure — ranked for families with children, noise level, and experience needed.',
    h1: 'Best Parrots for Families in the UK',
    intro: 'Choosing a parrot for a family home requires balancing several factors simultaneously: temperament with children, noise level, experience requirements, and the practical demands of a household with multiple people and competing schedules.',
    body: `
<h3>What makes a parrot good for families?</h3>
<ul>
  <li><strong>Tolerance of multiple people:</strong> some species (African Grey, Cockatoos) bond intensely with one person and may become aggressive with others. Family parrots should adapt to interacting with several family members.</li>
  <li><strong>Noise management:</strong> a species that screams at 110 dB is a different domestic proposition than one that vocalises at conversational volumes.</li>
  <li><strong>Tolerance of unpredictability:</strong> households with children are less predictable — good family parrots can adapt to varying schedules and activity levels.</li>
  <li><strong>Manageable care requirements:</strong> families are busy. Species requiring hours of individual attention daily are harder to maintain in a family context.</li>
</ul>
<h3>Top picks for family homes</h3>
<p><strong>1. Blue-and-Yellow Macaw:</strong> sociable, adaptable, excellent with families. Tolerates multiple handlers well. Loud, but their calls are part of their charm. Needs space.</p>
<p><strong>2. Galah Cockatoo:</strong> playful, affectionate, and generally good with children. Moderate size and noise. More family-orientated than larger Cockatoo species.</p>
<p><strong>3. Pionus Parrot:</strong> calm, quiet, and adaptable. One of the best choices for families in smaller homes or with noise-sensitive circumstances. Excellent for active households.</p>
<p><strong>4. Green-cheeked Conure:</strong> playful, sociable, manageable size, and one of the quieter conure species. Great introduction to parrot ownership for families.</p>
<p><strong>5. Eclectus Parrot (male):</strong> gentle, tolerant, and less demanding than Cockatoos. Beautiful to look at, pleasantly vocal, and adaptable to family life.</p>
<h3>What to avoid in a family context</h3>
<p>Scarlet Macaws and large Cockatoos require highly experienced, consistent handling and can be challenging in unpredictable family environments. African Greys, while extraordinary birds, are emotionally sensitive and do better with stable, quiet routines — busy, noisy households can cause stress. Caiques, though wonderful birds, can nip during play and require supervision with very young children.</p>`,
  },
  {
    slug: 'talking-parrots',
    title: 'Talking Parrots — Best Speaking Species | UK Buyer\'s Guide 2026',
    desc: 'Which parrots talk best? Ranked guide to the finest talking parrot species — African Grey, Amazon, Macaw, Eclectus and more. Training tips for UK owners.',
    h1: 'Talking Parrots — The Best Speaking Species',
    intro: 'The ability to mimic human speech is one of the most fascinating attributes of the psittacine family. But not all parrots talk equally — and "talking" covers a spectrum from a few learned words to contextual language use that genuinely surprises scientists.',
    body: `
<h3>The talking parrot hierarchy</h3>
<p><strong>Tier 1 — Exceptional talkers:</strong></p>
<ul>
  <li><strong>African Grey (Congo & Timneh):</strong> the undisputed champion of avian speech. Vocabularies of 500–1,000+ words are documented. More significantly, Greys use language contextually — many spontaneously use appropriate phrases rather than merely repeating at random. Dr Irene Pepperberg's research with Alex the Grey demonstrated genuine communicative intent.</li>
  <li><strong>Yellow-naped Amazon:</strong> considered the finest talker among Amazon species — a clear, musical voice and impressive vocabulary up to 300+ words. Also one of the best singing parrots.</li>
  <li><strong>Double Yellow-headed Amazon:</strong> similar to Yellow-naped; exceptional clarity and musicality.</li>
</ul>
<p><strong>Tier 2 — Very good talkers:</strong></p>
<ul>
  <li><strong>Blue-fronted Amazon:</strong> warm, clear voice; 100–300 words typical with good training. Musical ability notable.</li>
  <li><strong>Eclectus Parrot:</strong> often underrated; melodic voice, learns phrases unprompted, surprising vocabulary depth.</li>
  <li><strong>Blue-and-Yellow Macaw:</strong> good vocabulary (40–60 words) with consistent training, though voice clarity varies individually.</li>
</ul>
<p><strong>Tier 3 — Moderate talkers:</strong></p>
<ul>
  <li>Catalina Macaw, Scarlet Macaw, Green-wing Macaw: 20–50 words typically; personality compensates.</li>
  <li>Galah Cockatoo, Sulphur-crested Cockatoo: 30–60 words possible; softer, often more melodic than macaws.</li>
  <li>Caiques, Conures, Pionus: limited vocabulary (10–40 words) but charming and clear; personality more prominent than speech.</li>
</ul>
<h3>Training tips for speech development</h3>
<ul>
  <li>Begin training at 3–6 months for optimal results — but older birds can still learn.</li>
  <li>Use short, clear words and associate them with specific actions or objects ("step up", "water", "hello").</li>
  <li>Repeat consistently — 5–10 minutes, several times daily, is more effective than one long session.</li>
  <li>Reward immediately — voice enthusiasm and treats when the bird attempts sounds correctly.</li>
  <li>Never punish poor attempts — ignore and redirect; reward only good approximations.</li>
  <li>The bird must be comfortable and engaged; a stressed or bored bird will not learn.</li>
</ul>`,
  },
  {
    slug: 'macaw-guide',
    title: 'Macaw Guide UK | Types, Care, Costs & Buying Guide 2026',
    desc: 'Complete macaw guide for UK buyers. Species comparison, temperament, cage requirements, costs, CITES documentation, and delivery information 2026.',
    h1: 'Complete Macaw Guide for UK Owners',
    intro: 'Macaws are the most spectacular companion birds in the world — and the most demanding. This guide covers everything a prospective macaw owner in the UK needs to know before making this extraordinary commitment.',
    body: `
<h3>The macaw species compared</h3>
<p>At Paraíso de Aves, we work with five macaw species and one exceptional hybrid. Here is how they compare:</p>
<table class="specs-table">
  <thead><tr><th>Species</th><th>Size</th><th>Temperament</th><th>Noise</th><th>CITES</th><th>Lifespan</th></tr></thead>
  <tbody>
    <tr><td>Hyacinth Macaw</td><td>100 cm / 1.5 kg</td><td>Very gentle</td><td>Very loud</td><td>Appendix I</td><td>60–80 yrs</td></tr>
    <tr><td>Green-wing Macaw</td><td>90–95 cm / 1.3 kg</td><td>Gentle</td><td>Very loud</td><td>Appendix II</td><td>60–80 yrs</td></tr>
    <tr><td>Blue-and-Yellow Macaw</td><td>86–94 cm / 1.1 kg</td><td>Sociable</td><td>Loud</td><td>Appendix II</td><td>60–70 yrs</td></tr>
    <tr><td>Catalina Macaw</td><td>85–95 cm / 1.0 kg</td><td>Sociable</td><td>Moderate-loud</td><td>Appendix II</td><td>50–60 yrs</td></tr>
    <tr><td>Scarlet Macaw</td><td>81–96 cm / 1.0 kg</td><td>Bold, spirited</td><td>Very loud</td><td>Appendix I</td><td>50–75 yrs</td></tr>
  </tbody>
</table>
<h3>Essential considerations for macaw owners</h3>
<p><strong>Space:</strong> The absolute minimum cage size for a large macaw is 120×90×160 cm. Many experienced macaw owners provide significantly larger — dedicated macaw rooms or substantial outdoor aviaries. The 100+ cm wingspan of the larger species requires genuine space to extend fully.</p>
<p><strong>Noise:</strong> All large macaws are loud by domestic standards. Dawn and dusk calling periods are natural and cannot be eliminated. Soundproofing or dedicated bird rooms are used by many urban macaw owners. If you live in a flat or have sensitive neighbours, a macaw of any species may be impractical.</p>
<p><strong>Destructive capacity:</strong> Macaw beaks generate 300–700 psi bite force. They will destroy soft wood furniture, electrical cables, books, and anything else within reach. Any macaw interaction space must be designed assuming the bird will attempt to chew everything in it.</p>
<p><strong>Commitment:</strong> A Blue-and-Yellow or Green-wing Macaw may live to age 70. Plan for long-term ownership, including naming a bird guardian in your will and ensuring you have provisions for the bird's care if your circumstances change.</p>`,
  },
  {
    slug: 'african-grey-guide',
    title: 'African Grey Parrot Complete Guide UK | Care, Diet, Price 2026',
    desc: 'Complete African Grey parrot guide for UK owners. Congo vs Timneh, diet, cage requirements, CITES documentation, and buying guide 2026.',
    h1: 'African Grey Parrot — Complete Guide for UK Owners',
    intro: 'The African Grey is the most cognitively sophisticated bird species in aviculture — a remarkable animal that demands, and richly rewards, the most dedicated and informed ownership.',
    body: `
<h3>Congo African Grey vs Timneh African Grey</h3>
<p>Two subspecies are recognised in commerce. The <strong>Congo African Grey</strong> (<em>Psittacus erithacus erithacus</em>) is the larger bird (33 cm, 400–650 g) with a bright red tail and light grey plumage. The <strong>Timneh African Grey</strong> (<em>Psittacus timneh</em>) is smaller (28–33 cm, 275–400 g), with a darker maroon tail and charcoal-grey plumage. Both are now classified as separate species under revised taxonomy.</p>
<p>Temperament differences are subtle: Timnehs are often described as slightly calmer, less prone to stress behaviours, and marginally more tolerant of changes in routine. Congos are generally larger and can develop richer vocabularies. For first-time Grey owners, the Timneh is often recommended.</p>
<h3>Intelligence — what the research says</h3>
<p>The African Grey's cognitive abilities have been documented in peer-reviewed research far beyond any other bird species. Dr Irene Pepperberg's decades of work with Alex demonstrated object permanence (the understanding that objects continue to exist when hidden), numerical concepts (Alex could identify quantities up to 6), and categorical reasoning. He famously said "I'm sorry" after a bad interaction and asked "What colour?" when presented with a new object — spontaneous language production, not trained repetition.</p>
<p>This cognitive depth means that African Greys require genuine mental engagement — not just toys and food, but problem-solving, novel experiences, and meaningful social interaction. An understimulated Grey is a miserable Grey, and miserable Greys develop feather-destructive behaviours that are extremely difficult to reverse.</p>
<h3>CITES requirements</h3>
<p>The African Grey was moved from CITES Appendix II to Appendix I in 2016 following catastrophic wild population decline due to trapping for the pet trade. All commercially sold African Greys must now be bred in captivity under registered CITES breeding facilities. We hold all required Spanish breeding permits, and each bird we sell comes with complete CITES Appendix I documentation.</p>
<h3>Setting up for an African Grey</h3>
<p>The cage should be at least 90×60×120 cm, positioned in the room's social centre (Greys want to be part of household life), away from draughts and kitchen fumes. Provide varied perches, a generous selection of foraging toys, and enrichment items that challenge the bird to think — puzzle feeders, novel items to investigate, and regular rotation of toys to maintain novelty.</p>
<p>Establish a consistent daily routine from the bird's first day home — Greys thrive on predictability and find sudden schedule changes stressful. Schedule feeding, out-of-cage time, training, and sleep at approximately the same times daily.</p>`,
  },
];

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — SPECIES PAGES
// ═══════════════════════════════════════════════════════════════════
function generateSpeciesPage(sp) {
  const galleryImgs = [
    { src: sp.img1, alt: sp.img1alt, w: 800, h: 600 },
    { src: sp.img2, alt: sp.img2alt, w: 800, h: 600 },
    { src: '/images/homepage/hand-raised-macaw-breeder.jpg', alt: 'Hand-raised parrot breeder Paraíso de Aves', w: 800, h: 533 },
    { src: '/images/homepage/macaw-pair-indoor-socialised.jpg', alt: 'Socialised parrots Paraíso de Aves aviary', w: 800, h: 533 },
  ];

  const faqSchema = sp.faqs.map(([q, a]) => `{
      "@type": "Question",
      "name": ${JSON.stringify(q)},
      "acceptedAnswer": {"@type": "Answer", "text": ${JSON.stringify(a)}}
    }`).join(',\n    ');

  const faqHtml = sp.faqs.map(([q, a]) => `
    <div class="faq-item">
      <h3>${q}</h3>
      <p>${a}</p>
    </div>`).join('');

  const canonical = `/en/${sp.slug}/`;

  return `${pageHead({
    title: sp.title,
    desc: sp.desc,
    canonical,
    ogImage: sp.ogImage,
    enPath: canonical,
    esPath: sp.esPath,
    frPath: sp.frPath,
    ptPath: sp.ptPath,
    extra: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${faqSchema}
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(sp.h1 + ' — Complete Guide for UK Owners')},
  "description": ${JSON.stringify(sp.desc)},
  "image": "https://www.paraisodeaves.com${sp.ogImage}",
  "author": {"@type": "Organization", "name": "Paraíso de Aves"},
  "publisher": {"@type": "Organization", "name": "Paraíso de Aves", "url": "https://www.paraisodeaves.com"},
  "datePublished": "2026-07-12",
  "dateModified": "2026-07-12"
}
</script>`
  })}
${header('Species')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Species', url: '/en/species/' },
    { label: sp.h1, url: canonical },
  ])}
<section class="page-hero">
  <h1>${sp.h1}</h1>
  <p class="subtitle"><em>${sp.scientific}</em> — ${sp.tagline}</p>
  <div class="trust-pills">
    <span class="pill">${sp.badge}</span>
    <span class="pill">👐 Hand-Raised from Birth</span>
    <span class="pill">🚚 Delivered to UK &amp; Ireland</span>
    <span class="pill">📋 Full Documentation</span>
  </div>
</section>

<div class="page-wrap">

  <div class="two-col" style="margin-bottom:28px">
    <div style="border-radius:14px;overflow:hidden;aspect-ratio:4/3">
      <img src="${sp.img1}" alt="${sp.img1alt}" width="800" height="600" loading="eager" style="width:100%;height:100%;object-fit:cover">
    </div>
    <div style="border-radius:14px;overflow:hidden;aspect-ratio:4/3">
      <img src="${sp.img2}" alt="${sp.img2alt}" width="800" height="600" loading="lazy" style="width:100%;height:100%;object-fit:cover">
    </div>
  </div>

  <div class="info-box">
    <h2>Species Overview</h2>
    <table class="specs-table">
      <thead><tr><th>Characteristic</th><th>Detail</th></tr></thead>
      <tbody>
        <tr><td>Scientific Name</td><td><em>${sp.scientific}</em></td></tr>
        <tr><td>Size</td><td>${sp.size}</td></tr>
        <tr><td>Wingspan</td><td>${sp.wingspan}</td></tr>
        <tr><td>Lifespan</td><td>${sp.lifespan}</td></tr>
        <tr><td>Vocabulary</td><td>${sp.vocab}</td></tr>
        <tr><td>Noise Level</td><td>${sp.noise}</td></tr>
        <tr><td>Family Suitability</td><td>${sp.family}</td></tr>
        <tr><td>CITES Status</td><td>${sp.badge}</td></tr>
      </tbody>
    </table>
  </div>

  <div class="info-box">
    <h2>About the ${sp.h1}</h2>
    ${sp.body}
  </div>

  <div class="info-box">
    <h2>Diet and Nutrition</h2>
    ${sp.diet}
  </div>

  <div class="info-box">
    <h2>Gallery</h2>
    <p style="color:var(--muted);font-size:.93rem;margin-bottom:14px">Real photographs from our breeding facility in Llíria, Valencia — not stock images.</p>
    <div class="gallery-grid">
      ${galleryImgs.map(g => `<div class="gallery-item"><img src="${g.src}" alt="${g.alt}" width="${g.w}" height="${g.h}" loading="lazy"></div>`).join('\n      ')}
    </div>
    <p style="margin-top:14px;font-size:.9rem">See more in our <a href="/en/gallery/">full gallery →</a></p>
  </div>

  <div class="info-box">
    <h2>Frequently Asked Questions</h2>
    ${faqHtml}
  </div>

  <div class="info-box">
    <h2>Related Species &amp; Further Reading</h2>
    <div class="links-grid">
      <a class="link-card" href="/en/available-birds/"><span class="lk-icon">🏷️</span><div><strong>Available Birds</strong><small>See what's available now</small></div></a>
      <a class="link-card" href="/en/delivery/"><span class="lk-icon">✈️</span><div><strong>Delivery to UK</strong><small>How air cargo delivery works</small></div></a>
      <a class="link-card" href="/en/knowledge/cites-explained/"><span class="lk-icon">📋</span><div><strong>CITES Explained</strong><small>Documentation guide for UK buyers</small></div></a>
      <a class="link-card" href="/en/knowledge/how-to-buy-a-parrot/"><span class="lk-icon">📖</span><div><strong>How to Buy a Parrot</strong><small>Complete 2026 buyer's guide</small></div></a>
      <a class="link-card" href="/en/gallery/"><span class="lk-icon">📷</span><div><strong>Gallery</strong><small>Real photos from our aviary</small></div></a>
      <a class="link-card" href="/en/contact/"><span class="lk-icon">✉️</span><div><strong>Contact Us</strong><small>Enquire about availability</small></div></a>
    </div>
  </div>

</div>

<section class="cta-band">
  <h2>Interested in a ${sp.h1}?</h2>
  <p>Contact us to discuss current availability, pricing, and the delivery process. We answer all enquiries promptly and without obligation.</p>
  <div class="cta-btns">
    <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">✉ Enquire Now</a>
    <a href="/en/available-birds/" class="btn-outline">View All Available Birds</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — CITY PAGES
// ═══════════════════════════════════════════════════════════════════
function generateCityPage(city) {
  const canonical = `/en/parrots-for-sale-${city.slug}/`;
  const isIreland = city.country === 'Ireland';
  const countryFull = isIreland ? 'Ireland' : 'the United Kingdom';
  const currency = isIreland ? 'EUR' : 'GBP';
  const currencySymbol = isIreland ? '€' : '£';

  return `${pageHead({
    title: `Parrots for Sale ${city.name} | Hand-Raised CITES Parrots | Delivery to ${city.name}`,
    desc: city.desc,
    canonical,
    enPath: canonical,
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  })}
${header()}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Parrots for Sale', url: '/en/available-birds/' },
    { label: city.name, url: canonical },
  ])}
<section class="page-hero">
  <h1>Parrots for Sale — Delivery to ${city.name}</h1>
  <p class="subtitle">Hand-raised, CITES-documented parrots from our specialist breeding facility in Spain, delivered safely to ${city.name}, ${city.region}.</p>
  <div class="trust-pills">
    <span class="pill">✅ Full CITES Documentation</span>
    <span class="pill">✈️ Delivered to ${city.airport}</span>
    <span class="pill">👐 Hand-Raised from Birth</span>
    <span class="pill">🏆 Registered Breeder</span>
  </div>
</section>

<div class="page-wrap">

  <div class="info-box">
    <h2>Delivering Parrots to ${city.name}</h2>
    <p>Paraíso de Aves is a specialist parrot breeding facility based in Llíria, Valencia, Spain. We have been breeding and hand-raising psittacines — parrots, macaws, cockatoos, African Greys, and more — for over a decade, and we deliver throughout ${countryFull}, including ${city.name} and the surrounding ${city.region} area.</p>
    <p>Every bird we sell is hand-raised from the first days of life by our specialist team. They arrive at your collection point socialised, accustomed to human handling, and ready to begin the bonding process with their new family. Each bird travels with complete CITES documentation, a veterinary health certificate, and individual ring identification.</p>
    <p>For delivery to ${city.name}, birds travel via specialist live-animal air cargo to <strong>${city.airport}</strong>. You collect from the cargo terminal once border clearance is complete — a process that typically takes 2–4 hours from the flight's arrival. We provide detailed collection instructions and remain in contact throughout.</p>
  </div>

  <div class="info-box">
    <h2>Species Available for Delivery to ${city.name}</h2>
    <p>We breed a wide range of parrot species throughout the year. Availability varies seasonally — contact us to discuss current stock:</p>
    <div class="cards-grid">
      <div class="bird-card">
        <div class="bird-card-img"><img src="/images/loro-gris-01.webp" alt="African Grey parrot hand-raised for sale ${city.name}" width="400" height="200" loading="lazy"></div>
        <div class="bird-card-body">
          <span class="bird-card-badge">CITES Appendix I</span>
          <h3>African Grey Parrot</h3>
          <p>The world's most intelligent parrot. Exceptional talker. 50–70 year lifespan. Delivered to ${city.name} with full CITES documentation.</p>
          <a class="btn-gold" href="/en/african-grey/">View Species Guide</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img"><img src="/images/guacamayo-azul-01.webp" alt="Blue-and-Yellow Macaw for sale ${city.name}" width="400" height="200" loading="lazy"></div>
        <div class="bird-card-body">
          <span class="bird-card-badge">CITES Appendix II</span>
          <h3>Blue-and-Yellow Macaw</h3>
          <p>The world's most popular macaw. Sociable, vibrant, and spectacular. Delivered to ${city.name} with full documentation.</p>
          <a class="btn-gold" href="/en/blue-and-yellow-macaw/">View Species Guide</a>
        </div>
      </div>
      <div class="bird-card">
        <div class="bird-card-img"><img src="/images/cacatua-01.webp" alt="Cockatoo for sale ${city.name}" width="400" height="200" loading="lazy"></div>
        <div class="bird-card-body">
          <span class="bird-card-badge">CITES Appendix I/II</span>
          <h3>Cockatoos</h3>
          <p>Galah and Sulphur-crested Cockatoos — the most affectionate parrots. Delivered to ${city.name} hand-raised and socialised.</p>
          <a class="btn-gold" href="/en/cockatoos/">View Species Guide</a>
        </div>
      </div>
    </div>
    <p style="margin-top:20px"><a href="/en/available-birds/">View all available species →</a></p>
  </div>

  <div class="info-box">
    <h2>The Delivery Process to ${city.name}</h2>
    <h3>1. Reserve your bird</h3>
    <p>Contact us at <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a> to discuss available birds, pricing, and timing. A deposit confirms your reservation. We send photos and video updates of your bird throughout its preparation period.</p>
    <h3>2. Documentation preparation</h3>
    <p>We prepare all Spanish CITES export documentation, the veterinary health certificate, and coordinate any import documentation required for ${countryFull}. For CITES Appendix I species, you will need a UK/IE import permit — we guide you through this process step by step.</p>
    <h3>3. Air cargo to ${city.airport}</h3>
    <p>Your bird travels in an IATA-compliant live animal crate via specialist live-animal air freight. The journey from our aviary to ${city.airport} typically takes 12–18 hours total. We monitor the process throughout and keep you updated.</p>
    <h3>4. Border clearance and collection</h3>
    <p>On arrival at ${city.airport}, your bird goes through border inspection. Once cleared — typically 2–4 hours after arrival — you collect from the cargo terminal with your identification and import documentation. We provide exact instructions in advance.</p>
    <div class="note-box">
      <strong>Note:</strong> Not all airports have Border Control Posts equipped for live animal inspection. We will confirm the appropriate collection point for your specific bird and location when we process your order. ${city.name} is a route we have experience with.
    </div>
  </div>

  <div class="info-box">
    <h2>Parrot Prices — Delivery to ${city.name}</h2>
    <p>Our pricing includes the bird, all CITES documentation, the veterinary health certificate, the IATA travel crate, and live-animal freight handling charges. The price you pay is an all-in cost with no hidden fees. Prices vary by species and availability — contact us for current pricing.</p>
    <p>Indicative price ranges (inclusive of all documentation and UK/IE delivery):</p>
    <ul>
      <li>Conures: ${currencySymbol}400–700</li>
      <li>Pionus Parrot: ${currencySymbol}600–1,000</li>
      <li>Caiques: ${currencySymbol}700–1,100</li>
      <li>Eclectus Parrot: ${currencySymbol}800–1,300</li>
      <li>Amazon Parrots: ${currencySymbol}900–1,600</li>
      <li>African Grey: ${currencySymbol}1,200–2,800</li>
      <li>Cockatoos: ${currencySymbol}700–1,400</li>
      <li>Blue-and-Yellow Macaw: ${currencySymbol}1,400–2,800</li>
      <li>Catalina Macaw: ${currencySymbol}1,600–3,200</li>
      <li>Scarlet Macaw: ${currencySymbol}2,200–4,500</li>
      <li>Hyacinth Macaw: ${currencySymbol}9,000–22,000+</li>
    </ul>
    <p><em>All prices are indicative and subject to seasonal variation. Contact us for exact current pricing.</em></p>
  </div>

  <div class="info-box">
    <h2>Why Choose Paraíso de Aves for ${city.name} Delivery?</h2>
    <ul>
      <li>✅ <strong>Registered specialist breeder</strong> with official zoological nucleus in Valencia, Spain</li>
      <li>✅ <strong>100% hand-raised birds</strong> — fed by human hands from the first week of life</li>
      <li>✅ <strong>Complete CITES documentation</strong> for every bird — no exceptions</li>
      <li>✅ <strong>Experienced in UK &amp; Ireland delivery</strong> — we know every step of the process</li>
      <li>✅ <strong>Post-sale support</strong> — we remain available for questions throughout the acclimatisation period</li>
      <li>✅ <strong>Transparent pricing</strong> — all-inclusive cost with no hidden freight or documentation charges</li>
    </ul>
  </div>

  <div class="info-box">
    <h2>Frequently Asked Questions — ${city.name} Delivery</h2>
    <div class="faq-item">
      <h3>How long does delivery to ${city.name} take?</h3>
      <p>The air cargo journey from our aviary to ${city.airport} typically takes 12–18 hours from point of departure. The total process from when you place your deposit to when your bird arrives is typically 4–12 weeks, depending on documentation processing times and flight scheduling.</p>
    </div>
    <div class="faq-item">
      <h3>Can I track my bird during transit?</h3>
      <p>Yes. We provide you with the air waybill number once the bird is loaded. You can track the cargo status online, and we maintain contact with the freight forwarder throughout and relay updates to you directly.</p>
    </div>
    <div class="faq-item">
      <h3>What if something goes wrong during transit?</h3>
      <p>We use specialist live-animal freight handlers with extensive experience in psittacine transport. Each crate is prepared for the birds' welfare throughout the journey. In the extremely rare event of a problem, we have protocols in place and insurance cover for the transit period.</p>
    </div>
    <div class="faq-item">
      <h3>Do I need to arrange anything on the ${city.name} side?</h3>
      <p>For Appendix II species, the main requirement on your side is your presence at the collection point with valid ID. For Appendix I species, you will need a UK/IE CITES import permit — we guide you through this process well in advance of the bird's travel date.</p>
    </div>
    <div class="faq-item">
      <h3>Can I visit the aviary in Spain before purchasing?</h3>
      <p>Yes — visits to our facility in Llíria, Valencia are warmly welcomed. Many UK and Irish buyers combine a visit with a Spain trip. Alternatively, we can arrange comprehensive video calls showing your specific bird and our facility.</p>
    </div>
  </div>

  <div class="info-box">
    <h2>Get in Touch — ${city.name}</h2>
    <p>Ready to begin the process? Have questions before committing? We respond to all enquiries promptly and honestly. There is never any pressure — we want every purchase to be the right match for both the buyer and the bird.</p>
    <p>📧 <strong><a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a></strong></p>
    <p>We are based in Llíria, Valencia, Spain (UTC+1). We typically respond within 24 hours, often same-day for morning enquiries.</p>
  </div>

</div>

<section class="cta-band">
  <h2>Ready to find your perfect parrot?</h2>
  <p>Contact us today to discuss what we have available for delivery to ${city.name}. All enquiries answered promptly and without obligation.</p>
  <div class="cta-btns">
    <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">✉ Contact Us</a>
    <a href="/en/available-birds/" class="btn-outline">View Available Birds</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — KNOWLEDGE ARTICLES
// ═══════════════════════════════════════════════════════════════════
function generateKnowledgeArticle(art) {
  const canonical = `/en/knowledge/${art.slug}/`;
  return `${pageHead({
    title: art.title,
    desc: art.desc,
    canonical,
    enPath: canonical,
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  })}
${header('Knowledge Centre')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Knowledge Centre', url: '/en/knowledge/' },
    { label: art.h1, url: canonical },
  ])}
<section class="page-hero">
  <h1>${art.h1}</h1>
  <p class="subtitle">${art.intro}</p>
</section>

<div class="page-wrap">
  <div class="info-box">
    ${art.body}
  </div>

  <div class="info-box">
    <h2>Related Guides</h2>
    <div class="links-grid">
      <a class="link-card" href="/en/knowledge/"><span class="lk-icon">📚</span><div><strong>Knowledge Centre</strong><small>All guides and resources</small></div></a>
      <a class="link-card" href="/en/available-birds/"><span class="lk-icon">🏷️</span><div><strong>Available Birds</strong><small>See what's available now</small></div></a>
      <a class="link-card" href="/en/delivery/"><span class="lk-icon">✈️</span><div><strong>Delivery Information</strong><small>How UK delivery works</small></div></a>
      <a class="link-card" href="/en/species/"><span class="lk-icon">🦜</span><div><strong>Species Guides</strong><small>In-depth species information</small></div></a>
    </div>
  </div>
</div>

<section class="cta-band">
  <h2>Ready to find your perfect parrot?</h2>
  <p>Browse our available birds or contact us to discuss what would suit your household best.</p>
  <div class="cta-btns">
    <a href="/en/available-birds/" class="btn-gold">View Available Birds</a>
    <a href="mailto:paraisodeloros@gmail.com" class="btn-outline">✉ Contact Us</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — HOMEPAGE
// ═══════════════════════════════════════════════════════════════════
function generateHomepage() {
  return `${pageHead({
    title: 'Paraíso de Aves | Exotic Parrots for Sale UK & Ireland | CITES Breeder',
    desc: 'Hand-raised exotic parrots for sale in the UK and Ireland. African Greys, Macaws, Cockatoos, Amazon Parrots, Eclectus, Conures — all with full CITES documentation. Specialist breeder in Spain.',
    canonical: '/en/',
    enPath: '/en/',
    ogImage: '/images/homepage/hyacinth-macaw-hand-raised.webp',
    extra: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Paraíso de Aves",
  "url": "https://www.paraisodeaves.com",
  "logo": "https://www.paraisodeaves.com/favicon.ico",
  "description": "Specialist parrot breeder in Llíria, Valencia, Spain. Hand-raised psittacines with full CITES documentation, delivered throughout the UK and Ireland.",
  "address": {"@type": "PostalAddress", "addressLocality": "Llíria", "addressRegion": "Valencia", "addressCountry": "ES"},
  "contactPoint": {"@type": "ContactPoint", "email": "paraisodeloros@gmail.com", "contactType": "customer service"}
}
</script>`
  })}
${header('Home')}

<!-- ── HERO ────────────────────────────────── -->
<section style="background:linear-gradient(135deg,#1F3D2B 0%,#2B533C 100%);min-height:88vh;display:flex;align-items:center;padding:80px 5%;position:relative;overflow:hidden">
  <picture style="position:absolute;inset:0;z-index:0;opacity:.18">
    <source srcset="/images/homepage/macaw-pair-blue-yellow.webp" type="image/webp">
    <img src="/images/homepage/macaw-pair-blue-yellow.jpg" alt="" role="presentation" width="1200" height="800" style="width:100%;height:100%;object-fit:cover">
  </picture>
  <div style="max-width:1200px;margin:0 auto;position:relative;z-index:1;width:100%">
    <div style="max-width:680px">
      <p style="font-family:'Poppins',sans-serif;font-size:.82rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#D4A94F;margin-bottom:16px">Registered Specialist Breeder · Spain</p>
      <h1 style="font-family:'Poppins',sans-serif;font-size:clamp(2.1rem,5vw,3.4rem);font-weight:900;color:#fff;line-height:1.15;margin-bottom:20px">Extraordinary Parrots,<br>Raised with Love.<br><span style="color:#D4A94F">Delivered to Your Door.</span></h1>
      <p style="color:rgba(255,255,255,.82);font-size:1.08rem;line-height:1.75;margin-bottom:32px">Hand-raised African Greys, Macaws, Cockatoos, Amazons, and more — all with complete CITES documentation, delivered throughout the United Kingdom and Ireland from our specialist aviary in Valencia, Spain.</p>
      <div style="display:flex;flex-wrap:wrap;gap:14px">
        <a href="/en/available-birds/" style="display:inline-block;background:linear-gradient(135deg,#D4A94F,#E0B75F);color:#fff;font-family:'Poppins',sans-serif;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;font-size:1rem;transition:transform .2s,box-shadow .2s">View Available Birds</a>
        <a href="/en/delivery/" style="display:inline-block;background:rgba(255,255,255,.12);color:#fff;font-family:'Poppins',sans-serif;font-weight:700;padding:14px 32px;border-radius:999px;text-decoration:none;font-size:1rem;border:2px solid rgba(255,255,255,.35)">How Delivery Works</a>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:28px">
        <span style="color:rgba(255,255,255,.75);font-size:.9rem;display:flex;align-items:center;gap:7px"><span style="color:#D4A94F;font-size:1.1rem">✓</span> CITES Certified</span>
        <span style="color:rgba(255,255,255,.75);font-size:.9rem;display:flex;align-items:center;gap:7px"><span style="color:#D4A94F;font-size:1.1rem">✓</span> Hand-Raised</span>
        <span style="color:rgba(255,255,255,.75);font-size:.9rem;display:flex;align-items:center;gap:7px"><span style="color:#D4A94F;font-size:1.1rem">✓</span> UK &amp; Ireland Delivery</span>
        <span style="color:rgba(255,255,255,.75);font-size:.9rem;display:flex;align-items:center;gap:7px"><span style="color:#D4A94F;font-size:1.1rem">✓</span> Registered Breeder</span>
      </div>
    </div>
  </div>
</section>

<!-- ── FEATURED SPECIES ───────────────────── -->
<section style="background:var(--bg);padding:72px 5%">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:48px">
      <p style="font-family:'Poppins',sans-serif;font-size:.75rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#D4A94F;margin-bottom:10px">Our Species</p>
      <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(1.7rem,3vw,2.4rem);font-weight:900;color:var(--primary);margin-bottom:12px">Birds Raised with Passion and Expertise</h2>
      <p style="color:var(--muted);max-width:580px;margin:0 auto;font-size:1rem">Every bird born and raised in our facility in Llíria. CITES documentation, veterinary health certificates, and individual ring identification included with every sale.</p>
    </div>
    <div class="cards-grid">
      ${[
        { img: '/images/loro-gris-01.webp', alt: 'African Grey parrot hand-raised UK', badge: 'CITES I', title: 'African Grey', desc: 'The world\'s most intelligent parrot. Extraordinary talking ability and deep emotional intelligence.', href: '/en/african-grey/' },
        { img: '/images/homepage/hyacinth-macaw-hand-raised.webp', alt: 'Hyacinth Macaw cobalt blue hand-raised UK', badge: 'CITES I', title: 'Hyacinth Macaw', desc: 'The largest parrot in the world. Breathtaking cobalt blue plumage and a famously gentle temperament.', href: '/en/hyacinth-macaw/' },
        { img: '/images/guacamayo-azul-01.webp', alt: 'Blue-and-Yellow Macaw hand-raised for sale UK', badge: 'CITES II', title: 'Blue-and-Yellow Macaw', desc: 'The world\'s most popular macaw. Sociable, vibrant, and exceptionally rewarding as a companion.', href: '/en/blue-and-yellow-macaw/' },
        { img: '/images/homepage/cockatoo-galah-pink.jpg', alt: 'Galah Cockatoo pink hand-raised for sale UK', badge: 'CITES II', title: 'Cockatoos', desc: 'Extraordinarily affectionate birds with powerful personalities. Galah and Sulphur-crested available.', href: '/en/cockatoos/' },
        { img: '/images/catalina-macaw/guacamayo-catalina-cara-frontal-naranja-verde-02.jpg', alt: 'Catalina Macaw Rainbow Macaw hand-raised UK', badge: 'CITES II', title: 'Catalina Macaw', desc: 'The Rainbow Macaw — a spectacular hybrid with multicolour plumage unique to each individual.', href: '/en/catalina-macaw/' },
        { img: '/images/eclectus-01.webp', alt: 'Eclectus parrot green hand-raised for sale UK', badge: 'CITES II', title: 'Eclectus Parrot', desc: 'The most visually unique parrot — male and female display entirely different plumage. Calm and intelligent.', href: '/en/eclectus/' },
      ].map(sp => `
      <div class="bird-card">
        <div class="bird-card-img"><img src="${sp.img}" alt="${sp.alt}" width="400" height="200" loading="lazy"></div>
        <div class="bird-card-body">
          <span class="bird-card-badge">${sp.badge}</span>
          <h3>${sp.title}</h3>
          <p>${sp.desc}</p>
          <a class="btn-gold" href="${sp.href}">View Species Guide</a>
        </div>
      </div>`).join('')}
    </div>
    <p style="text-align:center;margin-top:32px"><a href="/en/species/" style="color:var(--gold);font-weight:700;font-size:.95rem">View all 12 species we breed →</a></p>
  </div>
</section>

<!-- ── WHY CHOOSE US ─────────────────────── -->
<section style="background:var(--primary);padding:72px 5%;color:#fff">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:48px">
      <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:900;color:#fff;margin-bottom:12px">Why Paraíso de Aves?</h2>
      <p style="color:rgba(255,255,255,.72);max-width:560px;margin:0 auto">We are not a pet shop. We are a registered specialist breeding facility — one of Spain's most experienced psittacine breeders.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px">
      ${[
        { icon: '👐', title: 'Hand-Raised from Day One', desc: 'Every bird is fed by human hands from the first days of life, socialised with people, and prepared for companion life before leaving our care.' },
        { icon: '📋', title: 'Complete CITES Documentation', desc: 'Every sale includes full CITES certificates, veterinary health certificate, and individual ring identification. Complete legal compliance, always.' },
        { icon: '✈️', title: 'Specialist UK Delivery', desc: 'We have years of experience delivering live parrots to the UK and Ireland via specialist live-animal air cargo. We manage every step of the process.' },
        { icon: '🏆', title: 'Registered Zoological Nucleus', desc: 'We operate under official zoological nucleus registration in Valencia, Spain — the legal framework for commercial psittacine breeding.' },
        { icon: '🩺', title: 'Veterinary Certification', desc: 'Every bird leaves with a veterinary health certificate issued within 10 days of travel. Our avian vet team monitors each bird from birth.' },
        { icon: '💬', title: 'Ongoing Support', desc: 'We remain available to answer questions throughout the acclimatisation period and beyond. You are never alone with a new bird.' },
      ].map(f => `
      <div style="background:rgba(255,255,255,.06);border-radius:var(--radius);padding:24px;border:1px solid rgba(255,255,255,.1)">
        <div style="font-size:2.2rem;margin-bottom:12px">${f.icon}</div>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:8px">${f.title}</h3>
        <p style="font-size:.9rem;color:rgba(255,255,255,.7);line-height:1.7;margin:0">${f.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── DELIVERY ───────────────────────────── -->
<section style="background:var(--bg);padding:72px 5%">
  <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center">
    <div>
      <p style="font-family:'Poppins',sans-serif;font-size:.75rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#D4A94F;margin-bottom:10px">UK &amp; Ireland Delivery</p>
      <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(1.5rem,3vw,2.1rem);font-weight:900;color:var(--primary);margin-bottom:16px">Delivered Safely to Your Nearest Airport</h2>
      <p style="color:var(--muted);line-height:1.8;margin-bottom:16px">We deliver parrots throughout the United Kingdom — London, Manchester, Birmingham, Glasgow, Edinburgh, Bristol, and beyond — and to Ireland, including Dublin, Cork, and Galway.</p>
      <p style="color:var(--muted);line-height:1.8;margin-bottom:24px">Birds travel via specialist live-animal air cargo in IATA-approved crates, with food, water, and temperature-controlled conditions throughout. We manage all CITES documentation, veterinary certificates, and customs clearance.</p>
      <a href="/en/delivery/" style="display:inline-block;background:linear-gradient(135deg,#D4A94F,#E0B75F);color:#fff;font-family:'Poppins',sans-serif;font-weight:700;padding:12px 26px;border-radius:999px;text-decoration:none">Full Delivery Guide →</a>
    </div>
    <div style="border-radius:var(--radius);overflow:hidden;aspect-ratio:4/3">
      <picture>
        <source srcset="/images/homepage/hand-raised-macaw-breeder.webp" type="image/webp">
        <img src="/images/homepage/hand-raised-macaw-breeder.jpg" alt="Hand-raised macaw being prepared for UK delivery" width="800" height="600" loading="lazy" style="width:100%;height:100%;object-fit:cover">
      </picture>
    </div>
  </div>
  <style>@media(max-width:720px){section > div[style*="grid"]{grid-template-columns:1fr!important}}</style>
</section>

<!-- ── GALLERY PREVIEW ───────────────────── -->
<section style="background:var(--surface);padding:72px 5%">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:40px">
      <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(1.5rem,3vw,2.1rem);font-weight:900;color:var(--primary);margin-bottom:10px">Our Aviary in Pictures</h2>
      <p style="color:var(--muted);max-width:540px;margin:0 auto">Every photograph on this site is taken at our own facility. No stock images — what you see is exactly what we have.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
      ${[
        ['/images/guacamayo-azul-01.webp', 'Blue-and-Yellow Macaw in our aviary Valencia Spain', '2/3', '1/3'],
        ['/images/catalina-macaw/guacamayo-catalina-cara-frontal-naranja-verde-02.jpg', 'Catalina Macaw Rainbow Macaw hand-raised', '3/4', '1/2'],
        ['/images/loro-gris-01.webp', 'African Grey parrot hand-raised Paraíso de Aves', '4/5', '2/3'],
        ['/images/guacamayo-jacinto-01.webp', 'Hyacinth Macaw cobalt blue Paraíso de Aves', '1/2', '3/4'],
        ['/images/cacatua-01.webp', 'Cockatoo hand-raised Paraíso de Aves aviary', '2/4', '4/5'],
        ['/images/eclectus-01.webp', 'Eclectus parrot male green Paraíso de Aves', '4/5', '3/5'],
      ].map(([src, alt]) => `
      <div style="border-radius:10px;overflow:hidden;aspect-ratio:4/3">
        <img src="${src}" alt="${alt}" width="400" height="300" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform .3s;display:block">
      </div>`).join('')}
    </div>
    <p style="text-align:center;margin-top:24px"><a href="/en/gallery/" style="color:var(--gold);font-weight:700">View full gallery →</a></p>
  </div>
</section>

<!-- ── KNOWLEDGE CENTRE PREVIEW ──────────── -->
<section style="background:var(--bg);padding:72px 5%">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:40px">
      <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(1.5rem,3vw,2.1rem);font-weight:900;color:var(--primary);margin-bottom:10px">Knowledge Centre</h2>
      <p style="color:var(--muted);max-width:560px;margin:0 auto">Guides written for UK buyers — covering CITES, delivery, choosing the right species, and everything in between.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px">
      ${[
        { title: 'How to Buy a Parrot in the UK', desc: 'Step-by-step guide covering CITES requirements, finding a reputable breeder, and what to prepare.', href: '/en/knowledge/how-to-buy-a-parrot/' },
        { title: 'Parrot Prices in the UK 2026', desc: 'What do parrots cost? A realistic guide to pricing by species, plus what drives price variations.', href: '/en/knowledge/parrot-prices/' },
        { title: 'CITES Explained', desc: 'Post-Brexit CITES rules for UK buyers. Appendix I vs II, Article 10 certificates, and what your breeder must provide.', href: '/en/knowledge/cites-explained/' },
        { title: 'Air Cargo Delivery', desc: 'How live-animal air cargo delivery works, from our aviary to your local airport — every step explained.', href: '/en/knowledge/air-cargo-delivery/' },
        { title: 'Choosing the Right Parrot', desc: 'Which species suits your lifestyle? A practical guide matching household type, experience, and ambitions to the right bird.', href: '/en/knowledge/choosing-the-right-parrot/' },
        { title: 'Best Family Parrots', desc: 'Top species for family homes in the UK — ranked by temperament with children, noise level, and manageability.', href: '/en/knowledge/best-family-parrots/' },
      ].map(a => `
      <a href="${a.href}" style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px;text-decoration:none;color:var(--text);transition:box-shadow .2s,border-color .2s;display:block">
        <h3 style="font-family:'Poppins',sans-serif;font-size:1rem;font-weight:700;color:var(--primary);margin-bottom:8px;line-height:1.3">${a.title}</h3>
        <p style="font-size:.88rem;color:var(--muted);line-height:1.7;margin-bottom:10px">${a.desc}</p>
        <span style="font-size:.85rem;font-weight:700;color:var(--gold)">Read guide →</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- ── CONTACT ────────────────────────────── -->
<section class="cta-band" id="contact">
  <h2>Ready to Begin?</h2>
  <p>Contact us to discuss available birds, pricing, and the delivery process. We welcome enquiries from all over the UK and Ireland — no question too small.</p>
  <div class="cta-btns">
    <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">✉ Email Us</a>
    <a href="/en/available-birds/" class="btn-outline">View Available Birds</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — AVAILABLE BIRDS PAGE
// ═══════════════════════════════════════════════════════════════════
function generateAvailableBirds() {
  const allBirds = [
    { img: '/images/loro-gris-01.webp', alt: 'African Grey parrot hand-raised', badge: 'CITES I', title: 'African Grey Parrot', sci: 'Psittacus erithacus', desc: 'The world\'s most intelligent parrot. Extraordinary vocabulary, 50–70 year lifespan. Delivered with full Appendix I documentation.', href: '/en/african-grey/', traits: ['🧠 Highest intelligence', '💬 800–1000+ words', '✈️ UK delivery'] },
    { img: '/images/homepage/hyacinth-macaw-hand-raised.webp', alt: 'Hyacinth Macaw cobalt blue hand-raised', badge: 'CITES I', title: 'Hyacinth Macaw', sci: 'Anodorhynchus hyacinthinus', desc: 'The world\'s largest parrot. Cobalt blue, gentle giant, 60–80 year lifespan. Extraordinary presence.', href: '/en/hyacinth-macaw/', traits: ['👑 World\'s largest parrot', '💙 Cobalt blue', '✈️ UK delivery'] },
    { img: '/images/catalina-macaw/guacamayo-catalina-cara-frontal-naranja-verde-02.jpg', alt: 'Catalina Macaw Rainbow Macaw', badge: 'CITES II', title: 'Catalina Macaw (Rainbow Macaw)', sci: 'Ara ararauna × Ara macao', desc: 'First-generation hybrid. Unique multicolour plumage — no two alike. Sociable, intelligent, 50–60 year lifespan.', href: '/en/catalina-macaw/', traits: ['🌈 Unique plumage', '🎭 Sociable', '✈️ UK delivery'] },
    { img: '/images/guacamayo-azul-01.webp', alt: 'Blue-and-Yellow Macaw hand-raised', badge: 'CITES II', title: 'Blue-and-Yellow Macaw', sci: 'Ara ararauna', desc: 'The world\'s most popular macaw. Vibrant, sociable, and spectacularly beautiful. 60–70 year lifespan.', href: '/en/blue-and-yellow-macaw/', traits: ['🌈 Iconic plumage', '🤝 Sociable', '✈️ UK delivery'] },
    { img: '/images/guacamayo-escarlata-01.webp', alt: 'Scarlet Macaw hand-raised', badge: 'CITES I', title: 'Scarlet Macaw', sci: 'Ara macao', desc: 'The most iconic macaw in history. Blazing red, blue, and gold plumage. Bold, spirited personality.', href: '/en/scarlet-macaw/', traits: ['🔥 Iconic red plumage', '⚡ Bold personality', '✈️ UK delivery'] },
    { img: '/images/guacamayo-escarlata-01.webp', alt: 'Green-wing Macaw hand-raised', badge: 'CITES II', title: 'Green-wing Macaw', sci: 'Ara chloropterus', desc: 'Second-largest macaw. Rich crimson and green plumage. Gentle giant with a famously calm temperament.', href: '/en/green-wing-macaw/', traits: ['🌿 Gentle giant', '🔴 Rich crimson', '✈️ UK delivery'] },
    { img: '/images/loro-amazonico-01.webp', alt: 'Amazon parrot hand-raised', badge: 'CITES II', title: 'Amazon Parrots', sci: 'Amazona spp.', desc: 'The classic talking parrots. Outgoing, theatrical, and equipped with extraordinary vocal ability.', href: '/en/amazon-parrots/', traits: ['💬 Outstanding talkers', '🎶 Musical', '✈️ UK delivery'] },
    { img: '/images/cacatua-01.webp', alt: 'Cockatoo hand-raised', badge: 'CITES I/II', title: 'Cockatoos', sci: 'Cacatua / Eolophus spp.', desc: 'The most affectionate parrots in aviculture. Galah and Sulphur-crested available. Extraordinary companions.', href: '/en/cockatoos/', traits: ['💕 Highly affectionate', '😄 Expressive', '✈️ UK delivery'] },
    { img: '/images/eclectus-01.webp', alt: 'Eclectus parrot male green hand-raised', badge: 'CITES II', title: 'Eclectus Parrot', sci: 'Eclectus roratus', desc: 'Nature\'s most striking sexual dimorphism. Calm, intelligent companion. Male (green) and female (red) available.', href: '/en/eclectus/', traits: ['🌿 Male green', '❤️ Female red/blue', '✈️ UK delivery'] },
    { img: '/images/conuro-01.webp', alt: 'Sun Conure hand-raised orange yellow', badge: 'CITES II', title: 'Conures', sci: 'Aratinga / Pyrrhura spp.', desc: 'Compact, playful, and irresistibly charming. Sun Conure, Green-cheeked, and Jenday Conure available.', href: '/en/conures/', traits: ['☀️ Vibrant colours', '🎉 Very playful', '✈️ UK delivery'] },
    { img: '/images/gallery/aves-disponibles-conuro-verde-percha-03.jpg', alt: 'Caique parrot playful hand-raised', badge: 'CITES II', title: 'Caiques', sci: 'Pionites spp.', desc: 'The clowns of the parrot world. Boundless energy, vivid colours, and irresistible personality.', href: '/en/caiques/', traits: ['🤸 Most playful', '🎨 Vivid colours', '✈️ UK delivery'] },
    { img: '/images/loro-amazonico-01.webp', alt: 'Pionus parrot calm hand-raised', badge: 'CITES II', title: 'Pionus Parrots', sci: 'Pionus spp.', desc: 'The underrated gem. Calm, quiet, and adaptable. One of the best parrots for families and flat-dwellers.', href: '/en/pionus/', traits: ['🤫 Quiet', '🏠 Flat-friendly', '✈️ UK delivery'] },
  ];

  return `${pageHead({
    title: 'Parrots for Sale UK & Ireland | Available Birds | Paraíso de Aves',
    desc: 'Hand-raised parrots for sale with delivery to the UK and Ireland. African Grey, Macaws, Cockatoos, Amazon Parrots, Eclectus, Conures, Caiques, Pionus — all CITES documented.',
    canonical: '/en/available-birds/',
    enPath: '/en/available-birds/',
    esPath: '/available-birds/',
    frPath: '/fr/perroquets-disponibles/',
    ptPath: '/pt/papagaios-disponiveis',
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  })}
${header('Available Birds')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Available Birds', url: '/en/available-birds/' },
  ])}
<section class="page-hero">
  <h1>Available Birds</h1>
  <p class="subtitle">Hand-raised, CITES-documented parrots from our specialist aviary in Valencia, Spain — delivered throughout the United Kingdom and Ireland.</p>
  <div class="trust-pills">
    <span class="pill">📋 Full CITES Documentation</span>
    <span class="pill">👐 Hand-Raised from Birth</span>
    <span class="pill">🩺 Veterinary Health Certificate</span>
    <span class="pill">✈️ UK &amp; Ireland Delivery</span>
  </div>
</section>

<div class="page-wrap">
  <div class="info-box">
    <h2>Our Available Species</h2>
    <p>Availability varies seasonally as our breeding programme produces birds at different times of year. The species below represent those we breed; contact us at <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a> for current stock, pricing, and waiting list information.</p>
    <div class="note-box">
      <strong>Important:</strong> We do not maintain a public stock list as availability changes rapidly. All birds are reserved at the time of deposit confirmation. Please contact us directly to discuss what is currently available or expected in the coming months.
    </div>
  </div>

  <div class="cards-grid">
    ${allBirds.map(b => `
    <div class="bird-card">
      <div class="bird-card-img"><img src="${b.img}" alt="${b.alt}" width="400" height="200" loading="lazy"></div>
      <div class="bird-card-body">
        <span class="bird-card-badge">${b.badge}</span>
        <h3>${b.title}</h3>
        <p style="font-size:.8rem;color:var(--muted);font-style:italic;margin-bottom:6px"><em>${b.sci}</em></p>
        <p>${b.desc}</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
          ${b.traits.map(t => `<span style="font-size:.75rem;background:rgba(31,61,43,.07);color:var(--primary);padding:3px 10px;border-radius:999px;font-weight:600">${t}</span>`).join('')}
        </div>
        <a class="btn-gold" href="${b.href}">Full Species Guide</a>
      </div>
    </div>`).join('')}
  </div>

  <div class="info-box" style="margin-top:28px">
    <h2>What Every Bird Includes</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:14px">
      ${[
        ['📋', 'CITES Certificate', 'Official species certification for legal ownership and transport'],
        ['💍', 'Ring Identification', 'Individual closed ring ID number — unique and permanent'],
        ['🩺', 'Vet Health Certificate', 'Issued within 10 days of travel by our avian veterinarian'],
        ['📦', 'IATA Travel Crate', 'Species-appropriate approved travel crate included in price'],
        ['📱', 'Acclimatisation Guide', 'Detailed first-weeks care guide specific to your bird\'s species'],
        ['💬', 'Post-Sale Support', 'Email support available throughout the acclimatisation period'],
      ].map(([icon, title, desc]) => `
      <div style="display:flex;align-items:flex-start;gap:12px;background:var(--bg);border-radius:10px;padding:14px">
        <span style="font-size:1.5rem;flex-shrink:0">${icon}</span>
        <div><strong style="display:block;font-size:.88rem;color:var(--primary);margin-bottom:3px">${title}</strong><span style="font-size:.82rem;color:var(--muted)">${desc}</span></div>
      </div>`).join('')}
    </div>
  </div>
</div>

<section class="cta-band">
  <h2>Ready to enquire?</h2>
  <p>Contact us with your preferred species, timeline, and any questions. We respond promptly to all enquiries.</p>
  <div class="cta-btns">
    <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">✉ Contact Us</a>
    <a href="/en/delivery/" class="btn-outline">How Delivery Works</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — DELIVERY PAGE
// ═══════════════════════════════════════════════════════════════════
function generateDeliveryPage() {
  return `${pageHead({
    title: 'Parrot Delivery to UK & Ireland | How It Works | Paraíso de Aves',
    desc: 'How we deliver hand-raised parrots from Spain to the UK and Ireland. Air cargo, IATA crates, CITES documentation, airport collection — complete delivery guide 2026.',
    canonical: '/en/delivery/',
    enPath: '/en/delivery/',
    ogImage: '/images/homepage/professional-parrot-transport.webp',
  })}
${header('Delivery')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Delivery', url: '/en/delivery/' },
  ])}
<section class="page-hero">
  <h1>Delivery to the UK &amp; Ireland</h1>
  <p class="subtitle">We deliver hand-raised, CITES-documented parrots from our aviary in Valencia, Spain to airports throughout the United Kingdom and Ireland.</p>
  <div class="trust-pills">
    <span class="pill">✈️ Specialist Live-Animal Freight</span>
    <span class="pill">📋 Full CITES Compliance</span>
    <span class="pill">🇬🇧 All UK Regions</span>
    <span class="pill">🇮🇪 All Ireland</span>
  </div>
</section>

<div class="page-wrap">

  <div class="info-box">
    <h2>UK Airports We Deliver To</h2>
    <p>We can route delivery through most major UK and Irish airports with live animal cargo handling capability. The most commonly used are:</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:14px">
      ${[
        ['London Heathrow', 'LHR', '🇬🇧'],
        ['Manchester', 'MAN', '🇬🇧'],
        ['Birmingham', 'BHX', '🇬🇧'],
        ['Glasgow', 'GLA', '🇬🇧'],
        ['Edinburgh', 'EDI', '🇬🇧'],
        ['Bristol', 'BRS', '🇬🇧'],
        ['Dublin', 'DUB', '🇮🇪'],
        ['Cork', 'ORK', '🇮🇪'],
        ['Shannon', 'SNN', '🇮🇪'],
        ['Belfast Intl', 'BFS', '🇬🇧'],
      ].map(([name, code, flag]) => `
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:10px">
        <span style="font-size:1.3rem">${flag}</span>
        <div><strong style="font-size:.88rem;color:var(--primary);display:block">${name}</strong><span style="font-size:.78rem;color:var(--muted)">${code}</span></div>
      </div>`).join('')}
    </div>
    <p style="margin-top:14px;font-size:.9rem">Don't see your nearest airport? Contact us — we may be able to route through additional airports depending on airline schedules and live-animal cargo approval.</p>
  </div>

  <div class="info-box">
    <h2>The Delivery Process — Step by Step</h2>
    ${[
      ['1', 'Initial Enquiry & Reservation', 'Contact us at paraisodeloros@gmail.com to discuss available birds, species, pricing, and timing. A deposit confirms your reservation and initiates the documentation process. We will share photos and video updates of your bird throughout the preparation period.'],
      ['2', 'Documentation Preparation (4–8 weeks)', 'We apply for the Spanish CITES export permit (takes 4–6 weeks). Simultaneously, for CITES Appendix I species (African Grey, Hyacinth Macaw, Scarlet Macaw), we guide you through applying for your UK/Irish CITES import permit. We prepare the veterinary health certificate within 10 days of travel.'],
      ['3', 'Travel Crate Preparation', 'We select and prepare an IATA Live Animal Regulation (LAR)-compliant crate sized appropriately for your species. The bird is acclimated to the crate in the days before departure. Food and water are provisioned for the journey.'],
      ['4', 'Air Cargo Booking', 'We book with a specialist live-animal freight forwarder who works with IATA-approved airlines. You receive the air waybill number to track your bird\'s journey online.'],
      ['5', 'Flight Day', 'The bird departs from Valencia Airport (VLC) or Madrid Barajas (MAD) depending on routing. Transit time to UK airports is typically 4–8 hours flight time, plus ground handling at both ends.'],
      ['6', 'Border Inspection on Arrival', 'Your bird is inspected at the Border Control Post at the arrival airport. This typically takes 2–4 hours. We remain in contact with you and the freight handler throughout. Once cleared, you collect from the cargo terminal with your ID and import documentation.'],
    ].map(([num, title, desc]) => `
    <div style="display:flex;gap:20px;margin-bottom:20px;align-items:flex-start">
      <div style="min-width:44px;height:44px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:900;font-size:1.1rem;color:#D4A94F;flex-shrink:0">${num}</div>
      <div><h3 style="font-size:1rem;font-weight:700;color:var(--primary);margin-bottom:6px">${title}</h3><p style="font-size:.93rem;color:var(--text);line-height:1.75;margin:0">${desc}</p></div>
    </div>`).join('')}
  </div>

  <div class="info-box">
    <h2>CITES Documentation Requirements</h2>
    <p>The specific documentation required depends on the species' CITES classification:</p>
    <table class="specs-table">
      <thead><tr><th>CITES Appendix</th><th>Species Examples</th><th>Required Documentation</th></tr></thead>
      <tbody>
        <tr><td><strong>Appendix I</strong></td><td>African Grey, Hyacinth Macaw, Scarlet Macaw</td><td>Spanish CITES Export Permit + UK/IE CITES Import Permit (Article 10) + Vet Health Certificate</td></tr>
        <tr><td><strong>Appendix II</strong></td><td>Blue-and-Yellow Macaw, Amazon, Cockatoo, Eclectus, Conures, Caique, Pionus</td><td>Spanish CITES Export Permit + UK/IE Import Notification + Vet Health Certificate</td></tr>
      </tbody>
    </table>
    <div class="note-box" style="margin-top:16px">
      <strong>We handle the Spanish side.</strong> We prepare and file all export documentation from Spain. For UK/IE import permits (required for Appendix I species), we guide you through every step of the application — or can refer you to an APHA-registered documentation agent if you prefer professional assistance.
    </div>
  </div>

  <div class="info-box">
    <h2>What's Included in the Delivery Price</h2>
    <ul>
      <li>✅ The bird (hand-raised, socialised, ring-identified)</li>
      <li>✅ CITES export permit from Spain</li>
      <li>✅ Veterinary health certificate</li>
      <li>✅ IATA-compliant live animal travel crate</li>
      <li>✅ Specialist live-animal air freight charges</li>
      <li>✅ Documentation handling at origin</li>
      <li>✅ Full tracking and communication throughout transit</li>
    </ul>
    <p style="margin-top:14px"><strong>Not included:</strong> UK/IE import permit application fees (for Appendix I species; typically £60–£150); any charges at the border inspection point.</p>
  </div>

  <div class="info-box">
    <h2>Delivery to Specific UK Cities</h2>
    <div class="links-grid">
      ${UK_CITIES.concat(IE_CITIES).map(c => `
      <a class="link-card" href="/en/parrots-for-sale-${c.slug}/">
        <span class="lk-icon">📍</span>
        <div><strong>${c.name}</strong><small>${c.airport}</small></div>
      </a>`).join('')}
    </div>
  </div>

</div>

<section class="cta-band">
  <h2>Ready to arrange delivery?</h2>
  <p>Contact us to discuss available birds, timing, and delivery logistics. We answer all enquiries promptly and guide you through every step.</p>
  <div class="cta-btns">
    <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">✉ Contact Us</a>
    <a href="/en/available-birds/" class="btn-outline">View Available Birds</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — GALLERY HUB
// ═══════════════════════════════════════════════════════════════════
function generateGallery() {
  const categories = [
    { title: 'Our Aviary', href: '/galeria/instalaciones/', img: '/images/homepage/paraiso-de-aves-aviary-exterior.jpg', alt: 'Paraíso de Aves aviary exterior Llíria Valencia' },
    { title: 'Macaws', href: '/galeria/guacamayos/', img: '/images/guacamayo-azul-01.webp', alt: 'Macaws at Paraíso de Aves aviary' },
    { title: 'African Greys', href: '/galeria/', img: '/images/loro-gris-01.webp', alt: 'African Grey parrots Paraíso de Aves' },
    { title: 'Conures', href: '/galeria/conuros/', img: '/images/conuro-01.webp', alt: 'Conures at Paraíso de Aves' },
    { title: 'Toucans', href: '/galeria/tucanes/', img: '/images/gallery/aves-disponibles-tucan-retrato-primer-plano-20.jpg', alt: 'Toucans at Paraíso de Aves' },
    { title: 'Food & Nutrition', href: '/galeria/alimentacion/', img: '/images/homepage/fresh-fruits-parrot-diet.jpg', alt: 'Fresh fruit parrot diet' },
    { title: 'Cages & Aviaries', href: '/galeria/jaulas-aviarios/', img: '/images/gallery/nosotros-jaula-interior-equipada-03.jpg', alt: 'Aviary cages interior Paraíso de Aves' },
    { title: 'Hand Feeding', href: '/galeria/crianza-socializacion/', img: '/images/homepage/hand-feeding-amazon-parrot.jpg', alt: 'Hand feeding parrot chick Paraíso de Aves' },
    { title: 'Transport', href: '/galeria/transporte/', img: '/images/homepage/professional-parrot-transport.webp', alt: 'Parrot transport IATA crate' },
    { title: 'Catalina Macaw', href: '/galeria/guacamayo-catalina/', img: '/images/catalina-macaw/guacamayo-catalina-cara-frontal-naranja-verde-02.jpg', alt: 'Catalina Macaw Rainbow Macaw gallery' },
  ];

  return `${pageHead({
    title: 'Gallery | Real Photographs from Our Aviary | Paraíso de Aves',
    desc: 'Real photographs from our parrot breeding facility in Llíria, Valencia. Macaws, African Greys, Cockatoos, Toucans, hand feeding, aviaries and more — no stock images.',
    canonical: '/en/gallery/',
    enPath: '/en/gallery/',
    esPath: '/galeria/',
    frPath: '/fr/galerie/',
    ogImage: '/images/guacamayo-azul-01.webp',
  })}
${header('Gallery')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Gallery', url: '/en/gallery/' },
  ])}
<section class="page-hero">
  <h1>Gallery</h1>
  <p class="subtitle">Every photograph on this site is taken at our own facility in Llíria, Valencia. Not a single stock image — what you see is exactly what we have.</p>
  <div class="trust-pills">
    <span class="pill">📸 100% Real Photographs</span>
    <span class="pill">🏡 Our Own Facility</span>
    <span class="pill">🦜 Our Own Birds</span>
  </div>
</section>

<div class="page-wrap">
  <div class="info-box">
    <h2>Gallery Categories</h2>
    <p style="color:var(--muted);margin-bottom:20px">Browse our gallery by category. Click any image to view the full collection.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">
      ${categories.map(c => `
      <a href="${c.href}" style="text-decoration:none;color:inherit;display:block;border-radius:var(--radius);overflow:hidden;border:1px solid var(--border);transition:box-shadow .2s,transform .2s;background:var(--surface)">
        <div style="height:160px;overflow:hidden">
          <img src="${c.img}" alt="${c.alt}" width="400" height="160" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform .3s;display:block">
        </div>
        <div style="padding:12px 16px">
          <h3 style="font-family:'Poppins',sans-serif;font-size:.95rem;font-weight:700;color:var(--primary);margin:0">${c.title}</h3>
        </div>
      </a>`).join('')}
    </div>
  </div>

  <div class="info-box">
    <h2>About Our Photography</h2>
    <p>All photographs on the Paraíso de Aves website are taken by our team at our breeding facility in Llíria, Valencia, Spain. We believe prospective buyers deserve to see exactly what our birds and facilities look like — not curated stock imagery.</p>
    <p>Our birds are photographed in natural light in their actual living environments. The colours, sizes, and conditions you see are accurate. When you visit our facility in person, you will find it matches what you see online.</p>
    <p>We update our photography regularly as new birds are born, facilities are improved, and seasons change. Follow our latest available birds at <a href="/en/available-birds/">Available Birds</a>.</p>
  </div>
</div>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — KNOWLEDGE CENTRE HUB
// ═══════════════════════════════════════════════════════════════════
function generateKnowledgeHub() {
  return `${pageHead({
    title: 'Knowledge Centre | Parrot Buyer\'s Guides for UK Owners | Paraíso de Aves',
    desc: 'Complete knowledge centre for UK parrot buyers. Guides on CITES, air cargo delivery, choosing the right species, prices, diet, training, and more.',
    canonical: '/en/knowledge/',
    enPath: '/en/knowledge/',
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  })}
${header('Knowledge Centre')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Knowledge Centre', url: '/en/knowledge/' },
  ])}
<section class="page-hero">
  <h1>Knowledge Centre</h1>
  <p class="subtitle">Guides written specifically for UK and Irish parrot buyers — covering everything from CITES documentation to choosing the right species for your household.</p>
</section>

<div class="page-wrap">
  <div class="info-box">
    <h2>Buyer Guides</h2>
    <p style="margin-bottom:20px;color:var(--muted)">Essential reading before you purchase.</p>
    <div class="cards-grid">
      ${KNOWLEDGE_ARTICLES.map(a => `
      <a href="/en/knowledge/${a.slug}/" style="text-decoration:none;color:inherit;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:22px;display:block;transition:box-shadow .2s,border-color .2s">
        <h3 style="font-family:'Poppins',sans-serif;font-size:1rem;font-weight:700;color:var(--primary);margin-bottom:8px;line-height:1.3">${a.h1}</h3>
        <p style="font-size:.88rem;color:var(--muted);line-height:1.7;margin-bottom:12px">${a.intro.substring(0,140)}…</p>
        <span style="font-size:.85rem;font-weight:700;color:var(--gold)">Read guide →</span>
      </a>`).join('')}
    </div>
  </div>

  <div class="info-box">
    <h2>Species Guides</h2>
    <p style="margin-bottom:20px;color:var(--muted)">In-depth guides to every species we breed.</p>
    <div class="links-grid">
      ${SPECIES.map(sp => `
      <a class="link-card" href="/en/${sp.slug}/">
        <span class="lk-icon">🦜</span>
        <div><strong>${sp.h1}</strong><small><em>${sp.scientific}</em></small></div>
      </a>`).join('')}
    </div>
  </div>

  <div class="info-box">
    <h2>Delivery by City</h2>
    <p style="margin-bottom:20px;color:var(--muted)">Delivery information specific to your area.</p>
    <div class="links-grid">
      ${UK_CITIES.concat(IE_CITIES).map(c => `
      <a class="link-card" href="/en/parrots-for-sale-${c.slug}/">
        <span class="lk-icon">📍</span>
        <div><strong>Parrots for Sale ${c.name}</strong><small>${c.airport}</small></div>
      </a>`).join('')}
    </div>
  </div>
</div>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — SPECIES HUB
// ═══════════════════════════════════════════════════════════════════
function generateSpeciesHub() {
  return `${pageHead({
    title: 'Parrot Species | All Species We Breed | Paraíso de Aves UK',
    desc: 'All parrot species bred at Paraíso de Aves — African Grey, Macaws, Cockatoos, Amazon Parrots, Eclectus, Conures, Caiques, Pionus. Delivered to the UK and Ireland.',
    canonical: '/en/species/',
    enPath: '/en/species/',
    esPath: '/guacamayos.html',
    frPath: '/fr/aras/',
    ogImage: '/images/loro-gris-01.webp',
  })}
${header('Species')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Species', url: '/en/species/' },
  ])}
<section class="page-hero">
  <h1>Our Species</h1>
  <p class="subtitle">Twelve species of hand-raised psittacines — all with complete CITES documentation, delivered throughout the United Kingdom and Ireland.</p>
  <div class="trust-pills">
    <span class="pill">12 Species Available</span>
    <span class="pill">✅ All CITES Documented</span>
    <span class="pill">✈️ UK &amp; Ireland Delivery</span>
  </div>
</section>

<div class="page-wrap">
  <div class="cards-grid">
    ${SPECIES.map(sp => `
    <div class="bird-card">
      <div class="bird-card-img"><img src="${sp.img1}" alt="${sp.img1alt}" width="400" height="200" loading="lazy"></div>
      <div class="bird-card-body">
        <span class="bird-card-badge">${sp.badge}</span>
        <h3>${sp.h1}</h3>
        <p style="font-style:italic;font-size:.82rem;color:var(--muted);margin-bottom:8px"><em>${sp.scientific}</em></p>
        <p>${sp.tagline}</p>
        <a class="btn-gold" href="/en/${sp.slug}/">Full Species Guide</a>
      </div>
    </div>`).join('')}
  </div>
</div>

<section class="cta-band">
  <h2>Looking for a specific species?</h2>
  <p>Contact us to discuss current availability, pricing, and delivery to the UK or Ireland.</p>
  <div class="cta-btns">
    <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">✉ Enquire Now</a>
    <a href="/en/available-birds/" class="btn-outline">View Available Birds</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// GENERATOR — CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════
function generateContact() {
  return `${pageHead({
    title: 'Contact Paraíso de Aves | Buy a Parrot UK | Enquire Now',
    desc: 'Contact Paraíso de Aves to enquire about available parrots, pricing, and delivery to the UK and Ireland. We respond promptly to all enquiries.',
    canonical: '/en/contact/',
    enPath: '/en/contact/',
    esPath: '/#contacto',
    frPath: '/fr/contact/',
    ptPath: '/pt/contacto',
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  })}
${header('Contact')}
${breadcrumbs([
    { label: 'Home', url: '/en/' },
    { label: 'Contact', url: '/en/contact/' },
  ])}
<section class="page-hero">
  <h1>Get in Touch</h1>
  <p class="subtitle">We welcome enquiries from all over the UK and Ireland. No question too small — we are happy to discuss species, availability, pricing, and delivery in detail.</p>
</section>

<div class="page-wrap">
  <div style="max-width:680px;margin:0 auto">
    <div class="info-box">
      <h2>Contact Information</h2>
      <p>The best way to reach us is by email. We typically respond within 24 hours, often same-day for morning enquiries.</p>
      <p style="font-size:1.1rem;margin:20px 0"><strong>📧 Email:</strong> <a href="mailto:paraisodeloros@gmail.com" style="font-size:1.05rem">paraisodeloros@gmail.com</a></p>
      <p><strong>📍 Location:</strong> Llíria, Valencia, Spain (UTC+1)</p>
      <p><strong>🕐 Response times:</strong> Typically within 24 hours. Morning enquiries (before 12:00 CET) are often answered same day.</p>
      <div class="note-box" style="margin-top:20px">
        <strong>Please include in your enquiry:</strong> the species you are interested in, your location (for delivery routing), and whether you have any previous bird-keeping experience. This helps us give you the most useful response.
      </div>
    </div>

    <div class="info-box">
      <h2>Visiting Our Facility</h2>
      <p>We welcome prospective owners to visit our aviary in Llíria, Valencia. Meeting our birds in person is the best possible introduction to your future companion. Please contact us by email to arrange a visit — we accommodate visitors throughout the year.</p>
      <p>Llíria is approximately 30 minutes by road from Valencia city centre and served by regular train services from Valencia Joaquín Sorolla station.</p>
    </div>

    <div class="info-box">
      <h2>Video Consultations</h2>
      <p>Can't travel to Spain? We offer video call consultations via correo electrónico or email-attached video, showing you our available birds, our facility, and answering all your questions in real time. Many UK and Irish buyers prefer this before committing, and we are delighted to arrange it.</p>
    </div>
  </div>
</div>

<section class="cta-band">
  <h2>Ready to enquire?</h2>
  <p>Email us today — we look forward to helping you find the right bird.</p>
  <div class="cta-btns">
    <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">✉ paraisodeloros@gmail.com</a>
    <a href="/en/available-birds/" class="btn-outline">View Available Birds</a>
  </div>
</section>

${footer()}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// SITEMAP
// ═══════════════════════════════════════════════════════════════════
function generateSitemap(urls) {
  const urlset = urls.map(({ loc, lastmod = '2026-07-12', changefreq = 'monthly', priority = '0.80' }) =>
    `  <url>
    <loc>https://www.paraisodeaves.com${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════
const sitemapUrls = [];

// 1. Homepage
write('en/index.html', generateHomepage());
sitemapUrls.push({ loc: '/en/', changefreq: 'weekly', priority: '0.95' });

// 2. Available Birds
write('en/available-birds/index.html', generateAvailableBirds());
sitemapUrls.push({ loc: '/en/available-birds/', priority: '0.90' });

// 3. Species hub
write('en/species/index.html', generateSpeciesHub());
sitemapUrls.push({ loc: '/en/species/', priority: '0.88' });

// 4. Species pages
SPECIES.forEach(sp => {
  write(`en/${sp.slug}/index.html`, generateSpeciesPage(sp));
  sitemapUrls.push({ loc: `/en/${sp.slug}/`, priority: '0.85' });
});

// 5. Gallery
write('en/gallery/index.html', generateGallery());
sitemapUrls.push({ loc: '/en/gallery/', priority: '0.80' });

// 6. Knowledge Centre hub
write('en/knowledge/index.html', generateKnowledgeHub());
sitemapUrls.push({ loc: '/en/knowledge/', priority: '0.85' });

// 7. Knowledge articles
KNOWLEDGE_ARTICLES.forEach(art => {
  write(`en/knowledge/${art.slug}/index.html`, generateKnowledgeArticle(art));
  sitemapUrls.push({ loc: `/en/knowledge/${art.slug}/`, priority: '0.78' });
});

// 8. Delivery
write('en/delivery/index.html', generateDeliveryPage());
sitemapUrls.push({ loc: '/en/delivery/', priority: '0.85' });

// 9. Contact
write('en/contact/index.html', generateContact());
sitemapUrls.push({ loc: '/en/contact/', priority: '0.80' });

// 10. UK city pages
UK_CITIES.forEach(city => {
  write(`en/parrots-for-sale-${city.slug}/index.html`, generateCityPage(city));
  sitemapUrls.push({ loc: `/en/parrots-for-sale-${city.slug}/`, priority: '0.82' });
});

// 11. Ireland city pages
IE_CITIES.forEach(city => {
  write(`en/parrots-for-sale-${city.slug}/index.html`, generateCityPage(city));
  sitemapUrls.push({ loc: `/en/parrots-for-sale-${city.slug}/`, priority: '0.82' });
});

// 12. Sitemap
write('sitemap_en.xml', generateSitemap(sitemapUrls));

// ── Summary ──────────────────────────────────────────────────────
console.log(`\n✅ Phase 7 — English Expansion complete\n`);
console.log(`   Files generated: ${generated.length}`);
console.log(`   Sitemap URLs:    ${sitemapUrls.length}`);
console.log(`\n   Pages by type:`);
console.log(`   • Homepage:         1`);
console.log(`   • Available Birds:  1`);
console.log(`   • Species Hub:      1`);
console.log(`   • Species pages:    ${SPECIES.length}`);
console.log(`   • Gallery:          1`);
console.log(`   • Knowledge Hub:    1`);
console.log(`   • Knowledge guides: ${KNOWLEDGE_ARTICLES.length}`);
console.log(`   • Delivery:         1`);
console.log(`   • Contact:          1`);
console.log(`   • UK city pages:    ${UK_CITIES.length}`);
console.log(`   • Ireland pages:    ${IE_CITIES.length}`);
console.log(`   • Sitemap:          1 (sitemap_en.xml)\n`);
console.log(`   Generated files:\n`);
generated.forEach(f => console.log(`   ${f}`));
