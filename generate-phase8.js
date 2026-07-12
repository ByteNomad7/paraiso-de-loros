#!/usr/bin/env node
/**
 * generate-phase8.js
 * Phase 8 — English Knowledge Centre & Topical Authority
 * Generates: 40 buyer guides, 50 FAQ pages, 8 price guides, 6 comparison pages,
 *            updated /en/knowledge/ hub, updated sitemap_en.xml
 *
 * Run: node generate-phase8.js
 */

'use strict';
const fs   = require('fs');
const path = require('path');

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
// SHARED CSS (identical to Phase 7 for visual consistency)
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
  .breadcrumb{background:var(--secondary);padding:8px 5%;font-size:.8rem;color:rgba(255,255,255,.65)}
  .breadcrumb a{color:rgba(255,255,255,.75)}.breadcrumb a:hover{color:var(--gold)}
  .bc-inner{max-width:1200px;margin:0 auto;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
  .page-hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:64px 5% 56px;text-align:center}
  .page-hero h1{font-size:clamp(1.8rem,4vw,2.9rem);font-weight:900;color:#fff;margin-bottom:14px}
  .page-hero .subtitle{color:rgba(255,255,255,.82);font-size:1.05rem;max-width:700px;margin:0 auto 24px}
  .trust-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:16px}
  .pill{background:rgba(212,169,79,.18);border:1px solid var(--gold);color:var(--gold);font-size:.8rem;font-weight:700;padding:5px 14px;border-radius:999px}
  .page-wrap{max-width:1200px;margin:0 auto;padding:56px 5%}
  .article-wrap{max-width:860px;margin:0 auto;padding:56px 5%}
  .info-box{background:var(--surface);border-radius:var(--radius);border:1px solid var(--border);padding:32px;margin-bottom:28px}
  .info-box h2{font-size:1.3rem;font-weight:800;color:var(--primary);margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--gold)}
  .info-box h3{font-size:1.05rem;font-weight:700;color:var(--secondary);margin:18px 0 8px}
  .info-box p{font-size:.96rem;color:var(--text);line-height:1.8;margin-bottom:12px}
  .info-box ul,.info-box ol{padding-left:20px;margin-bottom:12px}
  .info-box li{font-size:.95rem;color:var(--text);line-height:1.8;margin:5px 0}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:28px}
  @media(max-width:720px){.two-col{grid-template-columns:1fr}}
  .specs-table{width:100%;border-collapse:collapse;margin:20px 0;font-size:.9rem}
  .specs-table th{background:var(--primary);color:#fff;padding:10px 14px;text-align:left;font-family:'Poppins',sans-serif}
  .specs-table td{padding:9px 14px;border-bottom:1px solid var(--border)}
  .specs-table tr:nth-child(even) td{background:rgba(31,61,43,.04)}
  .compare-table{width:100%;border-collapse:collapse;margin:20px 0;font-size:.9rem}
  .compare-table th{background:var(--primary);color:#fff;padding:12px 14px;text-align:center;font-family:'Poppins',sans-serif}
  .compare-table th:first-child{text-align:left}
  .compare-table td{padding:10px 14px;border-bottom:1px solid var(--border);text-align:center}
  .compare-table td:first-child{text-align:left;font-weight:600;color:var(--secondary)}
  .compare-table tr:nth-child(even) td{background:rgba(31,61,43,.03)}
  .compare-table .winner{color:var(--primary);font-weight:700}
  .note-box{background:rgba(31,61,43,.06);border-left:4px solid var(--gold);padding:16px 20px;border-radius:0 8px 8px 0;margin:18px 0}
  .note-box strong{color:var(--primary)}
  .price-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius);padding:28px 32px;margin:20px 0;text-align:center}
  .price-box .price-label{font-size:.82rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(212,169,79,.8);margin-bottom:6px}
  .price-box .price-range{font-size:2.2rem;font-weight:900;color:#fff;font-family:'Poppins',sans-serif}
  .price-box .price-note{font-size:.85rem;color:rgba(255,255,255,.7);margin-top:6px}
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
  .cta-band{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:56px 5%;text-align:center}
  .cta-band h2{font-size:clamp(1.5rem,3vw,2rem);font-weight:900;color:#fff;margin-bottom:12px}
  .cta-band p{color:rgba(255,255,255,.82);margin:0 auto 28px;font-size:1rem;max-width:540px}
  .cta-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
  .btn-gold{display:inline-block;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;font-family:'Poppins',Arial,sans-serif;font-weight:700;padding:13px 28px;border-radius:999px;text-decoration:none;transition:transform .2s,box-shadow .2s}
  .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(212,169,79,.45);text-decoration:none;color:#fff}
  .btn-outline{display:inline-block;background:transparent;color:#fff;font-family:'Poppins',Arial,sans-serif;font-weight:700;padding:13px 28px;border-radius:999px;border:2px solid rgba(255,255,255,.55);text-decoration:none;transition:border-color .2s,background .2s}
  .btn-outline:hover{border-color:#fff;background:rgba(255,255,255,.08);color:#fff;text-decoration:none}
  .faq-item{border:1px solid var(--border);border-radius:12px;margin-bottom:12px;overflow:hidden}
  .faq-item h3{background:var(--bg);font-size:.96rem;font-weight:700;color:var(--primary);margin:0;padding:15px 20px}
  .faq-item p{margin:0;padding:14px 20px;font-size:.93rem;color:#3a3a3a;line-height:1.75;border-top:1px solid var(--border)}
  .links-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px;margin-top:14px}
  .link-card{display:flex;align-items:center;gap:12px;background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:14px 16px;text-decoration:none;color:var(--text);transition:box-shadow .18s,border-color .18s}
  .link-card:hover{box-shadow:0 4px 18px rgba(31,61,43,.12);border-color:var(--gold);text-decoration:none;color:var(--text)}
  .link-card .lk-icon{font-size:1.5rem;flex-shrink:0}
  .link-card strong{display:block;font-size:.88rem;font-weight:700;color:var(--primary);line-height:1.2}
  .link-card small{display:block;font-size:.77rem;color:var(--muted);margin-top:2px}
  .hub-cat{margin-bottom:48px}
  .hub-cat h2{font-size:1.2rem;font-weight:800;color:var(--primary);margin-bottom:6px;padding-bottom:8px;border-bottom:2px solid var(--gold)}
  .hub-cat p{font-size:.9rem;color:var(--muted);margin-bottom:16px}
  .article-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
  .article-card{display:block;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px 20px;text-decoration:none;color:var(--text);transition:box-shadow .2s,border-color .2s}
  .article-card:hover{box-shadow:0 6px 24px rgba(31,61,43,.1);border-color:var(--gold);text-decoration:none;color:var(--text)}
  .article-card .ac-cat{font-size:.7rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
  .article-card h3{font-size:.95rem;font-weight:700;color:var(--primary);margin-bottom:6px;line-height:1.3}
  .article-card p{font-size:.82rem;color:var(--muted);line-height:1.55}
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

function hreflang(enPath) {
  return `  <link rel="alternate" hreflang="en-GB" href="https://www.paraisodeaves.com${enPath}"/>
  <link rel="alternate" hreflang="es-ES" href="https://www.paraisodeaves.com/"/>
  <link rel="alternate" hreflang="pt-PT" href="https://www.paraisodeaves.com/pt/"/>
  <link rel="alternate" hreflang="fr-FR" href="https://www.paraisodeaves.com/fr/"/>
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/"/>`;
}

function header(activePage = 'Knowledge Centre') {
  const nav = [
    ['/en/', 'Home'],
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
        <li><a href="/en/knowledge/macaw-guide/">Macaw Buying Guide</a></li>
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

function pageHead({ title, desc, canonical, ogImage = '/images/homepage/hand-raised-macaw-breeder.jpg', extra = '' }) {
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
  ${hreflang(canonical)}
  <meta property="og:type" content="article"/>
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
// INTERNAL LINKS BLOCK — injected at the bottom of every article
// ═══════════════════════════════════════════════════════════════════
function internalLinks() {
  return `<div class="info-box" style="margin-top:32px">
  <h2>Explore More</h2>
  <div class="links-grid">
    <a class="link-card" href="/en/available-birds/"><span class="lk-icon">🦜</span><div><strong>Available Birds</strong><small>See birds available now</small></div></a>
    <a class="link-card" href="/en/species/"><span class="lk-icon">📖</span><div><strong>Species Guide</strong><small>All 12 species we breed</small></div></a>
    <a class="link-card" href="/en/delivery/"><span class="lk-icon">✈️</span><div><strong>Delivery</strong><small>UK &amp; Ireland air cargo</small></div></a>
    <a class="link-card" href="/en/knowledge/"><span class="lk-icon">🎓</span><div><strong>Knowledge Centre</strong><small>All guides &amp; articles</small></div></a>
    <a class="link-card" href="/en/gallery/"><span class="lk-icon">📷</span><div><strong>Gallery</strong><small>Photos from our aviary</small></div></a>
    <a class="link-card" href="/en/contact/"><span class="lk-icon">✉️</span><div><strong>Contact Us</strong><small>Get pricing &amp; availability</small></div></a>
  </div>
</div>`;
}

function ctaBand() {
  return `<section class="cta-band">
  <h2>Ready to Welcome a Parrot?</h2>
  <p>Browse our current availability and get in touch for pricing, delivery timelines, and documentation details.</p>
  <div class="cta-btns">
    <a href="/en/available-birds/" class="btn-gold">View Available Birds</a>
    <a href="/en/contact/" class="btn-outline">Contact Us</a>
  </div>
</section>`;
}

// ═══════════════════════════════════════════════════════════════════
// DATA — BUYER GUIDES (40 new; 10 already exist from Phase 7)
// ═══════════════════════════════════════════════════════════════════
const BUYER_GUIDES = [
  {
    slug: 'cockatoo-guide',
    title: 'Cockatoo Buying Guide UK 2026 | Moluccan, Umbrella & Goffin\'s',
    desc: 'Everything you need to know before buying a cockatoo in the UK: species comparison, CITES requirements, pricing, care needs, and delivery from Spain.',
    h1: 'Cockatoo Buying Guide',
    cat: 'Species Guides',
    intro: 'Cockatoos are among the most emotionally expressive and socially demanding birds in the parrot world. Before buying a cockatoo in the UK, it is essential to understand their intense need for companionship, their lifespan of 40–80 years, and the CITES regulations that govern their import.',
    sections: [
      { h: 'Which cockatoo species is right for you?', body: '<p>Several cockatoo species are available from specialist breeders. The <strong>Moluccan (Salmon-crested) Cockatoo</strong> (<em>Cacatua moluccensis</em>) is the most affectionate and the loudest — a bird that bonds ferociously and can scream at extraordinary volume. The <strong>Umbrella Cockatoo</strong> (<em>Cacatua alba</em>) is slightly smaller, equally affectionate, and somewhat more manageable for experienced owners. The <strong>Goffin\'s Cockatoo</strong> (<em>Cacatua goffiniana</em>) is the most independent of the three, smaller, and better suited to owners who cannot provide constant attention.</p><p>All three species are listed on <a href="/en/knowledge/cites-explained/">CITES Appendix I or II</a>, meaning their purchase and import requires documentation. Wild-caught birds are illegal; only captive-bred specimens with proper papers may be traded.</p>' },
      { h: 'CITES requirements for cockatoos in the UK', body: '<p>Bringing a cockatoo into the UK from the EU (including Spain) requires an Animal Health Certificate and, for Appendix I species, a CITES import permit from the Animal and Plant Health Agency (APHA). At Paraíso de Aves, we provide all export documentation from Spain; you apply for the UK import permit, which we assist with throughout the process.</p><p>Post-Brexit, the UK is treated as a third country for the purposes of CITES. Import checks occur at Border Control Posts (BCPs) at the point of entry.</p>' },
      { h: 'Cockatoo care essentials', body: '<ul><li><strong>Cage size:</strong> minimum 90×60×120 cm; ideally larger — cockatoos need to stretch their wings fully</li><li><strong>Daily interaction:</strong> at least 3–5 hours out-of-cage time; cockatoos are not cage birds</li><li><strong>Enrichment:</strong> foraging toys, foot toys, chew items; rotate weekly to prevent boredom</li><li><strong>Diet:</strong> high-quality pellets (60%), fresh vegetables, limited fruit and seeds</li><li><strong>Veterinary:</strong> annual avian vet check-up; psittacosis screening recommended on arrival</li><li><strong>Noise:</strong> be aware of neighbours — cockatoos are among the loudest parrots</li></ul>' },
      { h: 'Are cockatoos good for first-time owners?', body: '<p>Honestly, cockatoos are challenging even for experienced parrot keepers. Their emotional neediness is frequently underestimated: a bored or lonely cockatoo will scream, feather-pluck, or become aggressive. They are best suited to households where at least one person is home most of the day, and where the bird is a central part of family life rather than a background pet.</p><p>If you are a first-time parrot owner, consider starting with a species such as a <a href="/en/conures/">Conure</a> or <a href="/en/caiques/">Caique</a> before progressing to a cockatoo.</p>' },
    ],
    faqs: [
      ['How long do cockatoos live?', 'Most cockatoo species live 40–60 years in captivity with proper care. Some individuals, particularly Moluccan and Umbrella Cockatoos, have been documented living past 80. This is a multigenerational commitment.'],
      ['Are cockatoos noisy?', 'Yes — cockatoos are among the loudest parrots. Moluccan Cockatoos in particular can produce calls exceeding 120 dB. This is something potential owners must factor into their housing situation and relationships with neighbours.'],
      ['Do cockatoos talk?', 'Cockatoos can learn words and short phrases but are not known for large vocabularies. They are far more expressive through body language, crest position, and vocalisations than through speech. Some individuals become excellent talkers; most do not.'],
      ['Can I keep a cockatoo if I work full-time?', 'This is difficult. Cockatoos need significant daily interaction and do not cope well with long periods alone. If you work full-time, you would need to arrange for someone to spend time with the bird during the day, or consider whether a cockatoo is the right choice at this stage.'],
      ['How much does a cockatoo cost in the UK?', 'Prices depend on species, age, and availability. Contact us at paraisodeloros@gmail.com for current pricing on our available birds. All prices include full CITES documentation, health certificate, and ring identification.'],
    ],
    ogImage: '/images/cacatua-01.webp',
  },
  {
    slug: 'amazon-guide',
    title: 'Amazon Parrot Buying Guide UK | Yellow-Naped, Blue-Fronted & More',
    desc: 'Complete guide to buying an Amazon parrot in the UK. Species comparison, CITES documents, care requirements, talking ability, and delivery from Spain.',
    h1: 'Amazon Parrot Buying Guide',
    cat: 'Species Guides',
    intro: 'Amazon parrots are bold, vocal, and charismatic birds with a talent for speech that rivals the African Grey. The genus Amazona contains over 30 species, several of which make outstanding companions for the right owner. This guide covers everything you need to know before buying an Amazon in the UK.',
    sections: [
      { h: 'The best Amazon species for UK buyers', body: '<p>The <strong>Yellow-Naped Amazon</strong> (<em>Amazona auropalliata</em>) is widely regarded as the finest talking Amazon, capable of producing clear, contextual speech with an impressive vocabulary. The <strong>Blue-Fronted Amazon</strong> (<em>Amazona aestiva</em>) is the most commonly kept species in Europe, known for its playful nature and good talking ability. The <strong>Double Yellow-Headed Amazon</strong> (<em>Amazona oratrix</em>) is perhaps the most talented vocalist of the group, though its temperament can be assertive.</p><p>All Amazon species listed on CITES Appendix I or II require appropriate documentation for legal import into the UK. Contact us for details on which species are currently available.</p>' },
      { h: 'Amazon parrot temperament', body: '<p>Amazons are confident, opinionated birds that do not hesitate to express themselves. During hormonal periods (typically in spring), even well-socialised Amazons can become territorial and nippy. This is entirely normal and manageable with experience, but first-time owners should be aware that Amazons are not submissive birds.</p><p>Outside hormonal periods, Amazons are playful, affectionate, and deeply entertaining. They love music, often singing along to radio or television, and enjoy showing off their vocal talents to household visitors.</p>' },
      { h: 'Diet and nutrition', body: '<p>Amazons are prone to obesity and Vitamin A deficiency on seed-only diets. We recommend a diet of 60% high-quality pellets, 25–30% fresh vegetables (particularly dark leafy greens, sweet pepper, and squash), 10% fruit, and minimal seeds. Fresh water must be available at all times.</p><p>Avoid avocado, chocolate, caffeine, onion, garlic, and apple seeds — all toxic to parrots. Cooked legumes, quinoa, and small amounts of cooked egg are healthy protein sources.</p>' },
      { h: 'Housing requirements', body: '<ul><li><strong>Minimum cage:</strong> 90×60×90 cm; larger is strongly recommended</li><li><strong>Bar spacing:</strong> 2–2.5 cm to prevent head entrapment</li><li><strong>Out-of-cage time:</strong> 3–4 hours minimum daily</li><li><strong>Perch variety:</strong> natural wood branches of varying diameters, rope perches</li><li><strong>Toys:</strong> foot toys, foraging puzzles, leather and rope chew items</li></ul>' },
    ],
    faqs: [
      ['Do Amazon parrots talk?', 'Yes — Amazons are among the best talking parrots. Yellow-Naped and Double Yellow-Headed Amazons in particular can develop large vocabularies (100–200+ words) and speak with remarkable clarity. Hand-raised birds that receive regular speech interaction learn fastest.'],
      ['How long do Amazon parrots live?', 'In captivity with proper care, most Amazon species live 40–60 years. Some individuals have been documented past 70. Buying an Amazon is a lifelong commitment — consider arrangements for the bird\'s care should circumstances change.'],
      ['Are Amazons good pets for beginners?', 'Amazons are best suited to owners with some previous bird experience, or those who have thoroughly researched the species. Their assertive temperament during hormonal periods can be startling without prior knowledge. With the right preparation, however, they make outstanding companions.'],
      ['Can Amazon parrots be delivered to the UK?', 'Yes. We deliver Amazon parrots throughout the UK via specialist live-animal air cargo from our aviary in Valencia, Spain. Full CITES documentation and a veterinary health certificate are provided. See our delivery page for full details.'],
      ['Are Amazon parrots loud?', 'Amazons are vocal birds and produce loud calls, particularly at dawn and dusk. They are not as loud as macaws or cockatoos but considerably louder than conures or caiques. Consider your living situation and neighbours before making a decision.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'conure-guide',
    title: 'Conure Buying Guide UK | Sun, Green-Cheek & Jenday Conures',
    desc: 'Complete guide to buying a conure in the UK. Sun Conure, Green-Cheek, Jenday — species comparison, care, noise levels, CITES, and delivery from Spain.',
    h1: 'Conure Buying Guide',
    cat: 'Species Guides',
    intro: 'Conures are vibrant, playful, and surprisingly affectionate birds that pack enormous personality into a compact body. They make excellent companions for owners who want an interactive, energetic bird without the size and complexity of a macaw or cockatoo.',
    sections: [
      { h: 'Conure species comparison', body: '<p>The <strong>Sun Conure</strong> (<em>Aratinga solstitialis</em>) is the most visually spectacular — a blaze of yellow, orange, and green that is breathtaking in sunlight. Sun Conures are affectionate and playful but are the loudest conures; their contact call is sharp and penetrating. The <strong>Green-Cheeked Conure</strong> (<em>Pyrrhura molinae</em>) is considerably quieter, equally cuddly, and is one of the best conure options for flat or apartment living. The <strong>Jenday Conure</strong> (<em>Aratinga jandaya</em>) sits between the two in noise level and is a lively, social companion.</p>' },
      { h: 'Are conures good for first-time owners?', body: '<p>Yes — conures are one of the better choices for first-time parrot owners who are moving up from budgies or cockatiels. They are hardy, relatively forgiving of minor care mistakes, and respond well to gentle handling and training. The Green-Cheeked Conure in particular is widely recommended as a starter parrot due to its manageable noise level and affectionate disposition.</p>' },
      { h: 'Care requirements', body: '<ul><li><strong>Cage:</strong> minimum 60×45×75 cm; larger is always better</li><li><strong>Out-of-cage time:</strong> 2–3 hours daily minimum — conures love climbing and playing</li><li><strong>Diet:</strong> high-quality conure pellets, fresh vegetables, some fruit, minimal seeds</li><li><strong>Social needs:</strong> conures crave company and do not thrive in isolation</li><li><strong>Lifespan:</strong> 15–30 years depending on species</li></ul>' },
      { h: 'CITES status', body: '<p>Most conure species are listed on CITES Appendix II. Import into the UK requires an Animal Health Certificate and appropriate CITES documentation. At Paraíso de Aves, all paperwork is prepared at our end; we guide you through the UK import process.</p>' },
    ],
    faqs: [
      ['Are conures noisy?', 'It depends on the species. Sun Conures are among the loudest small parrots — their contact call is sharp and frequent. Green-Cheeked Conures are considerably quieter and more suitable for flats or semi-detached houses. Jenday Conures fall in the middle.'],
      ['Do conures talk?', 'Conures are not known for large vocabularies, but many individuals learn 10–30 words and short phrases. They are more expressive through behaviour and vocalisation than through speech. Some Green-Cheeked Conures become surprisingly good talkers.'],
      ['How long do conures live?', 'Green-Cheeked Conures typically live 15–25 years. Sun Conures and Jenday Conures can live 25–30 years with good care. This is a long-term commitment — factor it into your decision.'],
      ['Can conures live with children?', 'Conures can be wonderful with children who handle them gently and respectfully. They are small enough that rough handling can injure them, so supervision with very young children is important. Many conures genuinely enjoy interacting with children.'],
    ],
    ogImage: '/images/conure-sol-01.webp',
  },
  {
    slug: 'eclectus-guide',
    title: 'Eclectus Parrot Buying Guide UK | Striking Dimorphic Parrot',
    desc: 'Everything about buying an Eclectus parrot in the UK. The most visually striking dimorphic parrot — care guide, diet, CITES, and delivery from Spain.',
    h1: 'Eclectus Parrot Buying Guide',
    cat: 'Species Guides',
    intro: 'The Eclectus parrot is unique in the parrot world: males and females are so different in colour that they were originally classified as separate species. Brilliant green males and vivid red-and-blue females are equally spectacular. This guide covers what prospective UK owners need to know.',
    sections: [
      { h: 'Male vs female Eclectus', body: '<p>The <strong>male Eclectus</strong> (<em>Eclectus roratus</em>) is emerald green with a candy-corn beak — bright orange at the top. The <strong>female Eclectus</strong> is scarlet red with a blue belly and a dark beak. Beyond appearance, there are personality differences: males tend to be calmer, more gentle, and easier for first-time owners. Females are often more independent, assertive, and can be nippy during hormonal periods. Both sexes are intelligent and beautiful birds.</p>' },
      { h: 'The unique Eclectus diet', body: '<p>Eclectus parrots have a uniquely long digestive tract compared to other parrots, which makes them particularly sensitive to artificial preservatives, colourings, and high-fat diets. Over-supplementation with vitamins is a known risk; a varied fresh diet is preferable to vitamin powders. Recommended diet:</p><ul><li><strong>Fresh fruit (40%):</strong> mango, papaya, pomegranate, fig, berries — Eclectus genuinely thrive on fruit</li><li><strong>Fresh vegetables (35%):</strong> leafy greens, carrot, sweet pepper, corn on the cob</li><li><strong>Pellets (20%):</strong> use a low-preservative, natural pellet (avoid dyed pellets)</li><li><strong>Seeds and grains (5%):</strong> cooked quinoa, brown rice, oats</li></ul>' },
      { h: 'Cage and enrichment', body: '<ul><li><strong>Cage size:</strong> minimum 90×60×120 cm; larger is better given Eclectus wing span</li><li><strong>Enrichment:</strong> foot toys, foraging, soft leather; avoid hard metal toys that can damage beaks</li><li><strong>Social time:</strong> Eclectus are not as demanding for constant companionship as cockatoos, but need several hours of interaction daily</li></ul>' },
    ],
    faqs: [
      ['Are Eclectus parrots good talkers?', 'Yes — Eclectus are among the better-talking parrots. They tend to speak clearly and with good context. Males are generally more vocal; females are typically more selective in what they vocalise.'],
      ['How long do Eclectus parrots live?', 'Eclectus parrots typically live 30–50 years in captivity with proper care. Diet quality significantly impacts their lifespan and feather condition.'],
      ['Are Eclectus parrots noisy?', 'Eclectus are moderately noisy — less than macaws or cockatoos, but louder than conures. They produce a distinctive loud contact call but are generally quieter and more considered in their vocalisation than many other parrots.'],
      ['Can male and female Eclectus be kept together?', 'Pairs can be kept together, though outside of breeding season they may not be closely bonded. Eclectus are not as socially dependent on each other as some species. Introductions should be done gradually and monitored carefully.'],
    ],
    ogImage: '/images/eclectus-01.webp',
  },
  {
    slug: 'caique-guide',
    title: 'Caique Buying Guide UK | White-Bellied & Black-Headed Caique',
    desc: 'Everything about buying a caique in the UK. White-Bellied vs Black-Headed comparison, care, enrichment, noise level, CITES, and delivery from Spain.',
    h1: 'Caique Buying Guide',
    cat: 'Species Guides',
    intro: 'Caiques are the clowns of the parrot world — small, stocky, boldly coloured birds with boundless energy and an attitude several sizes larger than their body. If you want a bird that will keep you entertained, a caique might be exactly what you are looking for.',
    sections: [
      { h: 'White-Bellied vs Black-Headed Caique', body: '<p>The <strong>White-Bellied Caique</strong> (<em>Pionites leucogaster</em>) has a white chest, yellow-orange head, and green wings. It is typically the more playful and slightly more cuddly of the two species. The <strong>Black-Headed Caique</strong> (<em>Pionites melanocephalus</em>) has a black cap, orange cheeks, and a yellow breast. Both species are equally energetic and entertaining; personality differences between individuals often outweigh species differences.</p>' },
      { h: 'Caique personality', body: '<p>Caiques are extraordinarily active birds. They bounce, wrestle toys, roll on their backs, and invent games with household objects. They tend to be confident and unafraid, which is charming but can also mean they get themselves into trouble by attempting to dominate much larger animals. Caiques are best supervised around other pets, and introductions with dogs or cats should be carefully managed.</p><p>Caiques can become nippy if over-stimulated or tired. Learning to read a caique\'s body language is an important part of ownership.</p>' },
      { h: 'Care and housing', body: '<ul><li><strong>Cage:</strong> minimum 60×45×90 cm — caiques are active climbers and need vertical space</li><li><strong>Out-of-cage time:</strong> 2–4 hours daily; caiques need space to play and explore</li><li><strong>Enrichment:</strong> foot toys are essential — caiques love holding and wrestling objects</li><li><strong>Diet:</strong> pellets, fresh vegetables and fruit; avoid a seed-only diet</li><li><strong>Lifespan:</strong> 25–40 years</li></ul>' },
    ],
    faqs: [
      ['Do caiques talk?', 'Caiques are not known as talkers — most learn a handful of words at most. They are far more expressive through behaviour and vocalisation (chirps, whistles, and small shrieks) than through speech.'],
      ['Are caiques good with children?', 'Caiques can be good with older children who understand how to handle them gently. Their tendency to nip when over-stimulated means young children should always be supervised. Caiques that are handled regularly from a young age tend to be more tolerant.'],
      ['Can caiques live with other birds?', 'Caiques can be aggressive towards other birds, including other parrots. Even in a large cage, caiques and other species should be introduced with great care and monitored closely. Many caique owners keep them as solo birds to prevent conflict.'],
      ['How active are caiques?', 'Extremely. Caiques are among the most energetic parrots relative to their size. They require significant daily exercise and enrichment. A bored caique will become destructive and can develop feather-damaging behaviours.'],
    ],
    ogImage: '/images/caique-01.webp',
  },
  {
    slug: 'pionus-guide',
    title: 'Pionus Parrot Buying Guide UK | The Calm, Gentle Parrot',
    desc: 'Guide to buying a Pionus parrot in the UK. Blue-Headed, Maximilian\'s, and White-Capped Pionus — calm temperament, care needs, and UK delivery.',
    h1: 'Pionus Parrot Buying Guide',
    cat: 'Species Guides',
    intro: 'Pionus parrots are one of the best-kept secrets in the parrot world. Calm, gentle, and less demanding than many other species, Pionus make outstanding companions particularly for owners who want a quieter, less hyper-interactive bird. Their understated beauty and even temperament win many devoted fans.',
    sections: [
      { h: 'Pionus species overview', body: '<p>The most commonly kept species are the <strong>Blue-Headed Pionus</strong> (<em>Pionus menstruus</em>), with a striking cobalt head and red undertail; the <strong>Maximilian\'s (Scaly-Headed) Pionus</strong> (<em>Pionus maximiliani</em>), the most commonly available species and a gentle, reliable companion; and the <strong>White-Capped Pionus</strong> (<em>Pionus senilis</em>), with its distinctive white forehead patch. All three make excellent pets.</p>' },
      { h: 'Why Pionus are underrated', body: '<p>Pionus parrots do not have the dramatic presence of a macaw or the clownish energy of a caique. They are quieter, more reserved, and take a little longer to warm up to new people. But owners who persevere consistently describe them as among the most rewarding parrot companions: affectionate once trust is established, calm around household activity, and genuinely easy to live with. They produce a distinctive wheeze when startled, which is normal and not a sign of illness.</p>' },
      { h: 'Care and housing', body: '<ul><li><strong>Cage:</strong> minimum 75×50×90 cm</li><li><strong>Diet:</strong> pellets 50%, fresh vegetables 30%, fruit 15%, seeds sparingly</li><li><strong>Noise:</strong> moderate — considerably quieter than amazons or macaws</li><li><strong>Lifespan:</strong> 25–40 years</li><li><strong>Personality:</strong> gentle, calm, somewhat independent — not as needy as cockatoos</li></ul>' },
    ],
    faqs: [
      ['Are Pionus parrots good for beginners?', 'Yes — Pionus are often recommended for first-time parrot owners who want a medium-sized bird. Their calm temperament, manageable noise level, and relatively straightforward care make them an excellent starting point.'],
      ['Do Pionus parrots talk?', 'Many Pionus parrots learn words and phrases, though they are not known for large vocabularies. They are more expressive through their behaviour and gentle vocalisations than through speech. Some individuals become quite good talkers with regular encouragement.'],
      ['What is the wheezing sound Pionus make?', 'Pionus produce a distinctive panting or wheezing sound when startled or over-handled. This is completely normal — a characteristic of the species — and not a sign of respiratory illness. Once the bird settles, the sound stops.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'quiet-parrots',
    title: 'Quiet Parrots for Flats & Apartments UK | Low-Noise Species Guide',
    desc: 'The best quiet parrot species for UK flat and apartment living. Low-noise parrots compared: noise levels, care needs, and expert buying advice.',
    h1: 'Quiet Parrots: Best Low-Noise Species for UK Homes',
    cat: 'Buying Guides',
    intro: 'Not all parrots are ear-splitting. If you live in a flat, a semi-detached house, or simply want a bird that won\'t test your relationship with the neighbours, several parrot species are genuinely suitable for quieter living situations.',
    sections: [
      { h: 'Noise levels: a realistic comparison', body: '<table class="specs-table"><thead><tr><th>Species</th><th>Noise Level</th><th>Flat-Friendly?</th><th>Peak Calling</th></tr></thead><tbody><tr><td>Green-Cheeked Conure</td><td>Low–Moderate</td><td>Yes</td><td>Dawn &amp; dusk</td></tr><tr><td>Pionus (all species)</td><td>Low–Moderate</td><td>Yes</td><td>Morning</td></tr><tr><td>Caique</td><td>Moderate</td><td>Possible</td><td>Throughout day</td></tr><tr><td>Eclectus</td><td>Moderate</td><td>Possible</td><td>Morning</td></tr><tr><td>Amazon (most species)</td><td>Loud</td><td>Difficult</td><td>Dawn &amp; dusk</td></tr><tr><td>African Grey</td><td>Moderate–Loud</td><td>Challenging</td><td>Variable</td></tr><tr><td>Macaw</td><td>Very Loud</td><td>No</td><td>Dawn &amp; dusk</td></tr><tr><td>Sun Conure</td><td>Very Loud</td><td>No</td><td>Continuous</td></tr><tr><td>Cockatoo</td><td>Extremely Loud</td><td>No</td><td>Variable</td></tr></tbody></table>' },
      { h: 'Best quiet species for flats', body: '<p><strong>1. Green-Cheeked Conure</strong> — the best all-round option for apartment living. Small enough that cage space is manageable, affectionate, playful, and their vocalisations are chirps rather than screams. Highly recommended for city dwellers.</p><p><strong>2. Pionus parrot</strong> — calm, gentle, and significantly quieter than most medium-to-large parrots. Maximilian\'s Pionus in particular is an excellent choice for those wanting a larger bird in a noise-sensitive environment.</p><p><strong>3. Caique</strong> — moderate noise level, and while they produce sharp chirps, they rarely sustain loud screaming. Their entertaining personality makes them a popular choice for flat-dwellers willing to invest in enrichment.</p>' },
      { h: 'Managing noise in any species', body: '<p>Even quieter species will vocalise — this is non-negotiable for any parrot. You can significantly reduce nuisance noise by: ensuring the bird has sufficient daily interaction; providing adequate enrichment; establishing a consistent daily routine; avoiding rewarding screaming with attention; covering the cage at dusk to signal bedtime. A parrot that screams constantly is almost always communicating unmet needs, not being wilfully noisy.</p>' },
    ],
    faqs: [
      ['What is the quietest parrot for a flat?', 'The Green-Cheeked Conure is widely considered the best choice for flat or apartment living among parrots. The Pionus species are also excellent low-noise options for those wanting a slightly larger bird.'],
      ['Can you keep any parrot in a flat?', 'Yes, depending on the species and your neighbours\' tolerance. Green-Cheeked Conures, Pionus, and Caiques are reasonable choices. Macaws, Sun Conures, and Cockatoos produce noise levels that most flat situations cannot accommodate comfortably.'],
    ],
    ogImage: '/images/conure-sol-01.webp',
  },
  {
    slug: 'large-parrots',
    title: 'Large Parrots Guide UK | Macaws, African Greys & Cockatoos',
    desc: 'Guide to large parrot species for UK buyers. Macaws, African Greys, Cockatoos, and Amazons — size, care needs, space requirements, and buying advice.',
    h1: 'Large Parrots: A Complete Guide for UK Buyers',
    cat: 'Buying Guides',
    intro: 'Large parrots are among the most impressive companion birds in the world — intelligent, long-lived, and capable of profound bonds with their human families. They also require serious space, time, and financial commitment. This guide helps you understand what large parrot ownership really involves.',
    sections: [
      { h: 'Which large parrots does Paraíso de Aves breed?', body: '<p>We breed and hand-raise the following large parrot species, all available for delivery to the UK and Ireland:</p><ul><li><a href="/en/african-grey/"><strong>African Grey Parrot</strong></a> — the world\'s most intelligent parrot, 33 cm</li><li><a href="/en/hyacinth-macaw/"><strong>Hyacinth Macaw</strong></a> — the world\'s largest parrot, up to 100 cm</li><li><a href="/en/blue-and-yellow-macaw/"><strong>Blue-and-Yellow Macaw</strong></a> — vibrant, affectionate, 86 cm</li><li><a href="/en/scarlet-macaw/"><strong>Scarlet Macaw</strong></a> — iconic red plumage, 81 cm</li><li><a href="/en/green-wing-macaw/"><strong>Green-Wing Macaw</strong></a> — the gentle giant among macaws, 90 cm</li><li><a href="/en/catalina-macaw/"><strong>Catalina Macaw</strong></a> — hybrid of Blue-and-Yellow and Scarlet, 80–85 cm</li><li><a href="/en/cockatoos/"><strong>Cockatoos</strong></a> — several species, 40–65 cm</li></ul>' },
      { h: 'Space requirements', body: '<p>Large parrots need large cages. As a minimum guide:</p><table class="specs-table"><thead><tr><th>Species</th><th>Min. Cage (W×D×H)</th><th>Daily Out-of-Cage</th></tr></thead><tbody><tr><td>African Grey</td><td>90×60×120 cm</td><td>3–4 hours</td></tr><tr><td>Blue-and-Yellow Macaw</td><td>120×80×150 cm</td><td>4+ hours</td></tr><tr><td>Hyacinth Macaw</td><td>150×90×180 cm</td><td>4+ hours</td></tr><tr><td>Cockatoo (medium)</td><td>90×60×120 cm</td><td>3–5 hours</td></tr></tbody></table><p>These are minimums. Larger is always better — a macaw in a cage it cannot fully spread its wings in is not a happy bird.</p>' },
      { h: 'The real cost of a large parrot', body: '<p>Beyond the purchase price, large parrots carry ongoing costs: premium diet (fresh produce, quality pellets), specialist avian veterinary care, high-quality cages and enrichment, and the hidden cost of household damage from chewing. A macaw with access to furniture will find it within minutes. Budget realistically before committing.</p>' },
    ],
    faqs: [
      ['What is the largest parrot in the world?', 'The Hyacinth Macaw (Anodorhynchus hyacinthinus) is the largest flying parrot, reaching 100 cm in length and weighing up to 1.7 kg. It is native to central and eastern Brazil and is listed on CITES Appendix I.'],
      ['Are large parrots good pets?', 'Large parrots can be extraordinary companions — highly intelligent, deeply bonded, and capable of rich communication. However, they require very significant time, space, and financial investment. They are not suitable as low-maintenance pets.'],
    ],
    ogImage: '/images/guacamayo-jacinto-01.webp',
  },
  {
    slug: 'small-parrots',
    title: 'Small Parrots Guide UK | Conures, Caiques, Pionus & More',
    desc: 'Guide to small and medium parrot species for UK buyers. Conures, caiques, Pionus, Eclectus — personality, care, noise, and buying advice for first-time owners.',
    h1: 'Small & Medium Parrots: A Guide for UK Buyers',
    cat: 'Buying Guides',
    intro: 'Small and medium parrots offer many of the same rewards as large species — intelligence, affection, entertaining personalities — in a more manageable package. This guide compares the best small-to-medium parrot options for UK buyers.',
    sections: [
      { h: 'Small parrot comparison', body: '<table class="specs-table"><thead><tr><th>Species</th><th>Size</th><th>Noise</th><th>Talking</th><th>Ideal For</th></tr></thead><tbody><tr><td>Green-Cheeked Conure</td><td>26 cm</td><td>Low</td><td>Some</td><td>First-time owners, flats</td></tr><tr><td>Sun Conure</td><td>30 cm</td><td>High</td><td>Some</td><td>Houses with outdoor space</td></tr><tr><td>Caique</td><td>23 cm</td><td>Moderate</td><td>Minimal</td><td>Active households</td></tr><tr><td>Pionus</td><td>27–29 cm</td><td>Low–Moderate</td><td>Some</td><td>Quieter homes</td></tr><tr><td>Eclectus</td><td>35 cm</td><td>Moderate</td><td>Good</td><td>Patient, experienced owners</td></tr></tbody></table>' },
      { h: 'Best small parrot for a first-time owner', body: '<p>The <strong>Green-Cheeked Conure</strong> is the most commonly recommended small parrot for first-time owners in the UK. It is manageable in size, relatively quiet, affectionate without being excessively needy, and hardy enough to recover from minor husbandry mistakes. The <strong>Pionus</strong> is the best choice for those wanting a slightly larger, calmer bird.</p>' },
      { h: 'Lifespan expectations', body: '<p>Small parrot lifespans are still substantial. Green-Cheeked Conures live 15–25 years; Caiques 25–40 years; Pionus and Eclectus 25–50 years. Even the smallest of these birds is a long-term commitment — nothing like a hamster or a goldfish.</p>' },
    ],
    faqs: [
      ['What is the easiest small parrot to keep?', 'The Green-Cheeked Conure is widely considered one of the easiest parrots to keep — manageable size, relatively quiet, affectionate, and adaptable to a range of living situations.'],
      ['Do small parrots live as long as large ones?', 'Not quite, but small parrots still live surprisingly long lives. Caiques and Pionus regularly reach 30+ years; Conures 15–25 years. These are not short-term pets.'],
    ],
    ogImage: '/images/conure-sol-01.webp',
  },
  {
    slug: 'first-parrot-guide',
    title: 'Buying Your First Parrot UK | Complete Beginner\'s Guide 2026',
    desc: 'Complete beginner\'s guide to buying your first parrot in the UK. Which species, what to prepare, costs, CITES documents, and what the first weeks really look like.',
    h1: 'Buying Your First Parrot: A Complete Beginner\'s Guide',
    cat: 'Buying Guides',
    intro: 'Buying your first parrot is an exciting and significant decision. Parrots are not like other pets — they are intelligent, long-lived, and emotionally complex creatures that require years of learning on the part of their owner. This guide gives you an honest picture of what first-time parrot ownership involves.',
    sections: [
      { h: 'Before you buy: the questions to answer', body: '<ul><li><strong>How much time can you give daily?</strong> Parrots need daily interaction — 2–4 hours minimum for most species. A parrot left alone all day is a suffering parrot.</li><li><strong>How long will you have this bird?</strong> Even small parrots live 15–30 years. Larger species live 40–80 years. This will outlive many life changes.</li><li><strong>What is your noise tolerance?</strong> Every parrot vocalises. Some species are significantly louder than others — assess your living situation honestly.</li><li><strong>What is your budget?</strong> Factor in the purchase price, cage, enrichment, high-quality food, specialist vet care, and unexpected expenses.</li><li><strong>Do you have other pets?</strong> Cats and dogs can be dangerous to parrots. Introductions require careful management and ongoing supervision.</li></ul>' },
      { h: 'Best species for first-time owners', body: '<p>For most first-time owners, we recommend the following species in rough order of suitability:</p><ol><li><strong>Green-Cheeked Conure</strong> — small, manageable, relatively quiet, affectionate</li><li><strong>Pionus (Maximilian\'s or Blue-Headed)</strong> — calm, gentle, moderate noise</li><li><strong>Caique</strong> — energetic and entertaining, moderate care needs</li><li><strong>African Grey</strong> — outstanding intelligence and companionship, but complex emotional needs; better for owners who have read extensively about the species</li></ol><p>We generally advise against macaws, cockatoos, or Amazons as a first parrot — not because they cannot be wonderful, but because their particular needs are best met by owners who have prior parrot experience.</p>' },
      { h: 'What to prepare before the bird arrives', body: '<ul><li>A suitable cage, fully set up with perches, water and food bowls, and initial toys</li><li>High-quality pellet food appropriate for the species</li><li>A registered avian vet contacted in advance</li><li>A quiet, stable area of the home where the cage will live</li><li>An understanding with all household members about how to interact with the bird</li></ul>' },
      { h: 'The first two weeks', body: '<p>The first two weeks after a parrot arrives are critical. Even a well-socialised, hand-raised bird needs time to adjust to a new home, new sounds, and new people. Give the bird space — allow it to observe its new environment from its cage before pushing for handling. Speak quietly, move slowly, and let the bird set the pace of interaction. Resist the temptation to show off the new bird to visitors immediately; this is stressful for a settling bird.</p>' },
    ],
    faqs: [
      ['How much does a pet parrot cost in the UK?', 'Costs range widely by species: Green-Cheeked Conures start from around £300–£500; African Greys from £1,500–£2,500; Hyacinth Macaws upward of £15,000. All prices should include full CITES documentation. Contact us for current pricing on available birds.'],
      ['Do I need a licence to keep a parrot in the UK?', 'You do not need a personal licence to keep most parrots in the UK as pets. However, CITES-listed species require proper purchase documentation (a CITES certificate issued by the seller). Wild-caught birds cannot be legally traded. All birds from Paraíso de Aves come with full documentation.'],
      ['What food should I feed my first parrot?', 'Start with a high-quality species-appropriate pellet as the dietary foundation (50–60%), supplemented with fresh vegetables, a small amount of fruit, and minimal seeds. Avoid avocado, chocolate, onion, garlic, and caffeine — all toxic to parrots.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-lifespan',
    title: 'How Long Do Parrots Live? Lifespans by Species UK Guide',
    desc: 'Complete guide to parrot lifespans. How long do African Greys, macaws, cockatoos, conures, and Amazons live? UK ownership implications and planning advice.',
    h1: 'How Long Do Parrots Live? A Complete Lifespan Guide',
    cat: 'Care Guides',
    intro: 'One of the most important facts a prospective parrot owner must understand is lifespan. Parrots are not short-term pets. Some species outlive their owners. This guide provides accurate lifespan data for all major species and discusses what it means for long-term ownership planning.',
    sections: [
      { h: 'Parrot lifespan by species', body: '<table class="specs-table"><thead><tr><th>Species</th><th>Typical Lifespan</th><th>Exceptional Records</th></tr></thead><tbody><tr><td>Hyacinth Macaw</td><td>60–80 years</td><td>80+ years</td></tr><tr><td>African Grey</td><td>50–70 years</td><td>80+ years</td></tr><tr><td>Cockatoo (large)</td><td>40–60 years</td><td>80 years documented</td></tr><tr><td>Amazon Parrot</td><td>40–60 years</td><td>70+ years</td></tr><tr><td>Blue-and-Yellow Macaw</td><td>50–70 years</td><td>80+ years</td></tr><tr><td>Scarlet Macaw</td><td>40–60 years</td><td>75 years</td></tr><tr><td>Eclectus</td><td>30–50 years</td><td>60 years</td></tr><tr><td>Caique</td><td>25–40 years</td><td>50 years</td></tr><tr><td>Pionus</td><td>25–40 years</td><td>45 years</td></tr><tr><td>Conure (larger species)</td><td>25–30 years</td><td>35 years</td></tr><tr><td>Green-Cheeked Conure</td><td>15–25 years</td><td>30 years</td></tr></tbody></table>' },
      { h: 'Planning for a long-lived bird', body: '<p>Buying an African Grey or a Hyacinth Macaw at age 30 means the bird could still be alive when you are 100. This is not an exaggeration. Responsible owners should consider:</p><ul><li>Naming a designated bird guardian in their will</li><li>Ensuring a trusted person knows how to care for the bird</li><li>Discussing the bird with family members so its needs are understood</li><li>Budgeting for ongoing veterinary, dietary, and enrichment costs over decades</li></ul>' },
      { h: 'What affects lifespan?', body: '<p>Diet is the single biggest determinant of captive parrot lifespan. A bird maintained on a seed-only diet lives significantly shorter than one fed a varied, pellet-based diet with fresh foods. Other factors: veterinary care, mental stimulation, social interaction, absence of household toxins (PTFE non-stick coating, scented candles, aerosols), and whether the bird is hand-raised (generally better socialised and less stressed).</p>' },
    ],
    faqs: [
      ['What is the longest-lived parrot species?', 'The African Grey and large macaw species (particularly Hyacinth and Blue-and-Yellow) are documented to live the longest, with some individual birds reaching 80+ years in captivity. Cookie, a Moluccan Cockatoo at the Brookfield Zoo in Illinois, lived to 83.'],
      ['Do parrots live longer in captivity or the wild?', 'Generally longer in captivity, assuming proper care. Wild parrots face predation, disease, food scarcity, and habitat loss. A well-cared-for captive parrot with a quality diet, regular veterinary care, and mental stimulation will typically exceed wild lifespans.'],
    ],
    ogImage: '/images/guacamayo-jacinto-01.webp',
  },
  {
    slug: 'parrot-bonding',
    title: 'How to Bond with Your Parrot | Building Trust & Relationship',
    desc: 'How to bond with a new parrot step by step. Building trust with hand-raised birds, body language signals, the first weeks home, and long-term relationship building.',
    h1: 'How to Bond with Your Parrot',
    cat: 'Behaviour',
    intro: 'Bonding with a parrot is a process, not an event. Even a hand-raised bird socialised from birth needs time and consistency to form a deep relationship with its new family. This guide walks you through the stages of bonding and the behaviours that build — or damage — trust.',
    sections: [
      { h: 'Reading parrot body language', body: '<p>Before attempting to interact with your bird, learn to read its signals. Key indicators:</p><ul><li><strong>Relaxed posture, one foot raised, eyes half-closed:</strong> the bird is calm and comfortable — a good time for interaction</li><li><strong>Feathers fluffed, head down, eyes closed:</strong> the bird is sleepy or unwell — leave it alone</li><li><strong>Pinning eyes (rapid pupil dilation/contraction):</strong> high excitement or agitation — proceed cautiously</li><li><strong>Tail fanning, raised wings:</strong> agitation or threat display — back off and give space</li><li><strong>Relaxed feathers, upright posture, alert eyes:</strong> curious and engaged — good state for interaction</li></ul>' },
      { h: 'The first two weeks: let the bird lead', body: '<p>Resist the urge to handle the bird immediately. Allow it to explore its cage, observe the household, and grow accustomed to your voice and presence. Sit near the cage and talk softly. Offer high-value treats (small pieces of fruit, walnut) through the bars without expecting the bird to approach. Let the bird set the pace of physical contact entirely.</p>' },
      { h: 'Building daily routines', body: '<p>Parrots thrive on routine. Consistent feeding times, consistent out-of-cage interaction times, and consistent bedtime signals help the bird feel secure. A bird that knows what to expect is a calmer, more confident bird — and a calmer bird bonds more readily.</p>' },
      { h: 'Hands-on bonding techniques', body: '<p>Once the bird is comfortable stepping onto your hand, short daily training sessions using positive reinforcement (target training, step-up practice, trick training with treats) are among the most effective bonding activities. They build trust, mental stimulation, and a shared communication language. Keep sessions short (5–10 minutes) and always end on a positive note.</p>' },
    ],
    faqs: [
      ['How long does it take for a parrot to bond with you?', 'It varies considerably by species and individual. Some hand-raised birds bond within days. Others — particularly African Greys and some cockatoos — are naturally cautious and may take weeks or months to fully trust a new person. Patience and consistency are always the answer.'],
      ['Can a parrot bond with more than one person?', 'Yes. Well-socialised hand-raised birds can bond with multiple family members, though many parrots do develop a preference for one primary person. Regular positive interactions by all household members help prevent exclusive one-person bonding.'],
      ['What if my parrot bites?', 'Biting is communication. When a parrot bites, it is expressing something: discomfort, fear, over-stimulation, or boundary-setting. Never punish biting — this damages trust. Instead, work on reading body language to prevent the situation that leads to biting. Over time, consistent positive interaction reduces biting significantly.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-training',
    title: 'Parrot Training Guide UK | Step-Up, Recall & Trick Training',
    desc: 'How to train a parrot using positive reinforcement. Step-up commands, recall training, target training, and common trick training for UK parrot owners.',
    h1: 'Parrot Training: A Practical Guide',
    cat: 'Behaviour',
    intro: 'Training a parrot is one of the most rewarding aspects of parrot ownership. Positive reinforcement training strengthens your bond, provides essential mental stimulation for your bird, and creates reliable behaviours that make daily life safer and more enjoyable for both of you.',
    sections: [
      { h: 'Principles of positive reinforcement', body: '<p>Parrot training works on one principle: <strong>behaviours that are rewarded are repeated</strong>. You reward exactly what you want more of, at the precise moment it occurs, using something the bird genuinely values (a piece of favourite food, praise, or a scratch). Punishment, corrections, or force are not part of modern parrot training — they create fear and damage the relationship.</p>' },
      { h: 'The step-up command', body: '<p>Step-up (asking the bird to step from its perch or cage onto your hand) is the foundation of safe handling. To teach it: present your finger or hand firmly against the bird\'s lower chest, just above the feet, and say "step up" clearly. Most hand-raised birds already know this from the breeder. Reward immediately with a treat and praise. Repeat daily in short 5-minute sessions.</p>' },
      { h: 'Target training', body: '<p>Target training — teaching the bird to touch a target stick with its beak on cue — is the entry point to most trick training. Once the bird understands targeting, you can use it to guide movement, teach tricks, and maintain engagement. It is also invaluable in veterinary situations where you need the bird to move into a position on cue.</p>' },
      { h: 'Recall training', body: '<p>Recall (coming to you when called) is an important safety behaviour. Train in a small, bird-safe room with all doors and windows closed. Call the bird\'s name, hold out your hand, and reward generously when it flies to you. Build distance gradually. A reliable recall is potentially life-saving if the bird ever escapes outdoors.</p>' },
      { h: 'Common beginner mistakes', body: '<ul><li>Training when the bird is tired, hungry, or over-stimulated</li><li>Sessions that are too long — 5–10 minutes is ideal; always end positively</li><li>Rewarding the wrong behaviour (inadvertently reinforcing biting or screaming with attention)</li><li>Expecting too much too soon — training is measured in weeks and months, not days</li><li>Inconsistency — all household members must use the same commands and reward the same behaviours</li></ul>' },
    ],
    faqs: [
      ['How long does it take to train a parrot?', 'Basic step-up and target training can be established in 1–2 weeks with daily sessions. More complex tricks and reliable recall take longer — months of consistent practice. The process is ongoing; training is a lifelong activity that keeps the bird engaged and the relationship strong.'],
      ['Can older parrots be trained?', 'Yes — older parrots can absolutely learn new behaviours. It may take more patience than with a young bird, particularly if the bird has had negative experiences with training in the past. Start with small, achievable behaviours and build from there.'],
      ['What are the best treats for parrot training?', 'The best treat is whatever the bird finds most motivating. For most parrots, this includes small pieces of favourite fruit (mango, pomegranate, banana), a small piece of walnut, or a pine nut. Keep treats tiny — you will be giving many in a session.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-cage-guide',
    title: 'Parrot Cage Guide UK | Size, Bar Spacing & Setup Advice',
    desc: 'Complete parrot cage guide for UK buyers. Minimum cage sizes by species, bar spacing, safe materials, best placement, and cage setup recommendations.',
    h1: 'Parrot Cage Guide: Choosing the Right Cage',
    cat: 'Care Guides',
    intro: 'The cage is your parrot\'s home base — the place it sleeps, eats, and retreats to for safety. Choosing the right cage and setting it up correctly has a direct impact on your bird\'s physical health and psychological wellbeing.',
    sections: [
      { h: 'Minimum cage sizes by species', body: '<table class="specs-table"><thead><tr><th>Species</th><th>Minimum (W×D×H)</th><th>Recommended</th><th>Bar Spacing</th></tr></thead><tbody><tr><td>African Grey</td><td>90×60×120 cm</td><td>120×75×150 cm</td><td>2.0–2.5 cm</td></tr><tr><td>Large Macaw</td><td>120×80×150 cm</td><td>150×90×180 cm</td><td>2.5–3.0 cm</td></tr><tr><td>Cockatoo (medium)</td><td>90×60×120 cm</td><td>120×75×150 cm</td><td>2.0–2.5 cm</td></tr><tr><td>Amazon</td><td>90×60×90 cm</td><td>105×75×120 cm</td><td>2.0–2.5 cm</td></tr><tr><td>Eclectus</td><td>90×60×120 cm</td><td>120×75×150 cm</td><td>2.0–2.5 cm</td></tr><tr><td>Caique</td><td>60×45×90 cm</td><td>75×55×100 cm</td><td>1.5–2.0 cm</td></tr><tr><td>Conure (larger)</td><td>75×50×90 cm</td><td>90×60×100 cm</td><td>1.5–2.0 cm</td></tr><tr><td>Green-Cheeked Conure</td><td>55×40×65 cm</td><td>70×50×80 cm</td><td>1.5 cm</td></tr></tbody></table>' },
      { h: 'Safe cage materials', body: '<p>Powder-coated steel is the standard safe cage material. Avoid:</p><ul><li><strong>Zinc</strong> — highly toxic to parrots; common in older galvanised wire cages</li><li><strong>Lead</strong> — extremely toxic; present in some older paints and solders</li><li><strong>Brass</strong> — contains zinc and copper, potentially toxic</li><li><strong>Rusty metal</strong> — can harbour bacteria and cause injury</li></ul><p>New cages from reputable UK suppliers (Liberta, Ferplast, HQ) are generally safe. If buying second-hand, research the manufacturer carefully and consider testing for zinc with a testing kit.</p>' },
      { h: 'Cage placement', body: '<p>Place the cage in a room where the bird can be part of household activity — not isolated in a spare room. Position it against a wall (not in the middle of a room) so the bird feels secure on at least one side. Avoid direct sunlight all day (overheating risk), near cooking fumes (especially PTFE non-stick), near draughts, or near scented candles and aerosols.</p>' },
      { h: 'Cage setup essentials', body: '<ul><li><strong>Perches:</strong> 3–5 perches of varying diameters; natural wood branches are ideal; one concrete/pumice perch for nail management</li><li><strong>Food and water bowls:</strong> stainless steel; minimum 2 food bowls (one for wet food, one for dry) and one water bowl</li><li><strong>Toys:</strong> 3–6 toys at initial setup; rotate weekly</li><li><strong>Substrate:</strong> paper towels or newspaper on the cage bottom; easy to change daily</li></ul>' },
    ],
    faqs: [
      ['Can a cage be too big?', 'Almost never for a single bird. The main concern with very large cages is bar spacing — if bars are too wide, small birds can get their heads caught. Otherwise, more space is always better.'],
      ['How often should I clean the cage?', 'The cage floor (tray) should be cleaned daily. Perches, bowls, and toys should be cleaned weekly. A full disinfection of the cage should be done monthly using a bird-safe disinfectant.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-diet-guide',
    title: 'Parrot Diet Guide UK | What to Feed Your Parrot in 2026',
    desc: 'Complete parrot diet guide for UK owners. What parrots eat, best pellets available in the UK, fresh foods, foods to avoid, and species-specific dietary advice.',
    h1: 'Parrot Diet Guide: Feeding Your Parrot Right',
    cat: 'Nutrition',
    intro: 'Diet is the single most important determinant of a parrot\'s health, longevity, and feather quality. The majority of health problems seen in captive parrots — obesity, Vitamin A deficiency, liver disease, feather quality issues — are directly linked to poor nutrition. This guide provides clear, practical dietary advice for UK parrot owners.',
    sections: [
      { h: 'The ideal parrot diet', body: '<p>The foundation of any parrot\'s diet should be a high-quality, species-appropriate pellet (50–60% of total intake), supplemented with fresh vegetables, a small amount of fruit, and minimal seeds. Seeds should be thought of as treats, not staples — they are high in fat and nutritionally incomplete.</p><table class="specs-table"><thead><tr><th>Food Type</th><th>% of Diet</th><th>Examples</th></tr></thead><tbody><tr><td>High-quality pellets</td><td>50–60%</td><td>Harrison\'s, Roudybush, Zupreem Natural</td></tr><tr><td>Fresh vegetables</td><td>25–30%</td><td>Kale, broccoli, carrot, sweet pepper, courgette</td></tr><tr><td>Fresh fruit</td><td>10%</td><td>Apple, mango, pomegranate, berries</td></tr><tr><td>Seeds &amp; nuts</td><td>5–10%</td><td>In moderation as treats; walnuts, almonds</td></tr></tbody></table>' },
      { h: 'Foods toxic to parrots', body: '<p>The following must never be fed to parrots:</p><ul><li><strong>Avocado</strong> — persin in avocado flesh, skin, and pip is highly toxic and can be fatal</li><li><strong>Chocolate</strong> — theobromine and caffeine are toxic to birds</li><li><strong>Caffeine</strong> — coffee, tea, energy drinks</li><li><strong>Onion and garlic</strong> — damage red blood cells</li><li><strong>Alcohol</strong> — toxic even in tiny amounts</li><li><strong>Apple and pear seeds</strong> — contain cyanide compounds</li><li><strong>Rhubarb</strong> — oxalic acid is toxic to birds</li><li><strong>Salt</strong> — avoid all heavily salted human foods</li></ul>' },
      { h: 'Best pellets available in the UK', body: '<p>The following pellets are widely available in the UK and are of good nutritional quality:</p><ul><li><strong>Harrison\'s Bird Foods</strong> — certified organic, highly regarded by avian vets; available from specialist pet shops and online</li><li><strong>Roudybush</strong> — US brand widely available in the UK; excellent nutritional profile</li><li><strong>Zupreem Natural</strong> — good quality; widely available</li><li><strong>Versele-Laga NutriBird</strong> — European brand, good availability in the UK</li></ul><p>Avoid pellets with artificial colourings or flavourings, particularly for Eclectus parrots which are especially sensitive to additives.</p>' },
    ],
    faqs: [
      ['Can parrots eat rice?', 'Yes — cooked brown rice is a nutritious addition to a parrot\'s diet. Plain cooked quinoa and other whole grains are also good options. Avoid fried rice or rice cooked with salt, sauces, or seasoning.'],
      ['How often should I feed fresh food?', 'Fresh vegetables and fruit should ideally be offered daily. Remove uneaten fresh food after 2–4 hours to prevent spoilage. Pellets and water should be available at all times.'],
      ['Should I give my parrot vitamin supplements?', 'If your parrot is eating a good-quality pellet-based diet with fresh vegetables, supplements are generally unnecessary and can cause over-supplementation issues. Consult your avian vet before adding vitamins to the diet.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-health-guide',
    title: 'Parrot Health Guide UK | Signs of Illness, Vets & Preventive Care',
    desc: 'Parrot health guide for UK owners. Signs your parrot is ill, finding an avian vet, common diseases, preventive care, and annual health check advice.',
    h1: 'Parrot Health: Recognising Illness and Preventive Care',
    cat: 'Health',
    intro: 'Parrots are prey animals that instinctively hide signs of illness until they can no longer do so. By the time a parrot looks obviously sick, it is often seriously ill. Understanding the subtle early warning signs and establishing a relationship with a qualified avian vet are among the most important things a parrot owner can do.',
    sections: [
      { h: 'Early warning signs of illness', body: '<p>Watch for these signs that warrant immediate veterinary attention:</p><ul><li><strong>Fluffed feathers and lethargy</strong> at any point outside normal sleep hours</li><li><strong>Change in droppings</strong> — colour, consistency, or volume change (note: normal variation can be diet-related)</li><li><strong>Reduced appetite</strong> — any parrot refusing food for more than 24 hours should be seen by a vet</li><li><strong>Laboured breathing, tail bobbing, or open-mouth breathing</strong> — emergency symptoms</li><li><strong>Discharge from nostrils or eyes</strong></li><li><strong>Unusual quietness</strong> in a normally vocal bird</li><li><strong>Inability to perch normally</strong> or falling from perch</li></ul>' },
      { h: 'Finding an avian vet in the UK', body: '<p>Not all vets are qualified to treat parrots. A general vet may be better than nothing in an emergency, but for routine care you should find a vet with specific avian experience or qualification. The <strong>Association of Avian Veterinarians British Chapter (AAV/BC)</strong> maintains a list of members. The <strong>Royal College of Veterinary Surgeons (RCVS)</strong> lists vets with advanced qualifications in avian medicine.</p><p>Establish a relationship with your avian vet <em>before</em> you need them in an emergency. A new-bird health check within 72 hours of bringing a bird home is strongly recommended — it establishes a baseline and catches any issues not apparent on visual inspection.</p>' },
      { h: 'Common parrot health conditions', body: '<ul><li><strong>Psittacosis (Chlamydiosis)</strong> — bacterial infection transmissible to humans; requires treatment with doxycycline</li><li><strong>Aspergillosis</strong> — fungal infection of the respiratory tract; often related to poor ventilation or mouldy food</li><li><strong>Proventricular Dilatation Disease (PDD)</strong> — viral disease affecting the digestive system; no cure, but manageable</li><li><strong>Pacheco\'s Disease</strong> — highly contagious viral disease; can be prevented by vaccination in some species</li><li><strong>Feather Destructive Behaviour (FDB)</strong> — often psychological; requires behavioural and veterinary assessment</li></ul>' },
    ],
    faqs: [
      ['How often should a parrot have a health check?', 'An annual wellness check with an avian vet is recommended for all parrots, even if the bird appears healthy. Early detection of problems such as elevated liver enzymes, beak issues, or weight changes significantly improves outcomes.'],
      ['Do parrots need vaccinations?', 'There are no routine vaccinations for most UK pet parrot species. Some avian vets offer the Newcastle Disease vaccine for certain species. Discuss vaccination options with your avian vet at your first consultation.'],
      ['Is psittacosis dangerous to humans?', 'Psittacosis (caused by Chlamydophila psittaci) can infect humans and typically presents as flu-like symptoms or atypical pneumonia. It is treatable with antibiotics. Newly acquired birds should be tested, particularly if purchased from a market or unknown source. All birds from Paraíso de Aves are health-checked prior to sale.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-socialisation',
    title: 'Parrot Socialisation Guide | Meeting New People, Pets & Environments',
    desc: 'How to socialise your parrot with new people, children, other pets, and new environments. Step-by-step guide for building a confident, well-adjusted parrot.',
    h1: 'Parrot Socialisation: Building a Confident Bird',
    cat: 'Behaviour',
    intro: 'Socialisation — exposing a parrot to a wide range of people, environments, and experiences in a positive way — is a critical part of raising a well-adjusted companion bird. Hand-raised parrots from quality breeders begin this process before they leave the aviary, but the work continues in the home.',
    sections: [
      { h: 'Why socialisation matters', body: '<p>Parrots that are socialised with multiple people and environments are less likely to become one-person birds, less likely to react with fear or aggression to new situations, and more resilient when household circumstances change (new baby, new partner, house move). Socialisation is not a one-time event — it is an ongoing practice throughout the bird\'s life.</p>' },
      { h: 'Introducing new people', body: '<p>Have new visitors sit calmly near the bird\'s cage and speak softly. Avoid forcing interactions — let the bird approach on its own terms. Have visitors offer high-value treats. Initially, ask visitors not to reach for the bird, but to let the bird make the first move toward contact. Build up the closeness of interaction gradually over multiple visits.</p>' },
      { h: 'Parrots and children', body: '<p>Children and parrots can coexist wonderfully if children are taught to respect the bird\'s boundaries. Teach children to: move slowly around the bird; not run, shout, or wave arms; allow the bird to step up rather than grabbing it; watch for body language signals that the bird wants space. Young children should always be supervised.</p>' },
      { h: 'Introducing other pets', body: '<p>Cats and dogs are natural predators of birds. Even a "gentle" cat or dog can injure a parrot, and even a small scratch from a cat claw or dog tooth can introduce fatal bacteria. The safest approach is strict separation — never allow the parrot out of its cage when cats or dogs are in the same room unsupervised. Over time, some households successfully habituate their animals, but this requires consistent work and should never be assumed safe.</p>' },
    ],
    faqs: [
      ['Can a poorly socialised parrot be improved?', 'Yes, with patience and time. Parrots that had limited socialisation in early life can become more comfortable with new people and situations through gradual, positive exposure. It takes longer than with a well-socialised bird, but significant improvement is almost always possible.'],
      ['Should I take my parrot to new places?', 'Occasionally exposing your parrot to new environments (in a secure travel cage) can build resilience and confidence. Start with short, low-stress trips — to a friend\'s house, or even just to the car — and build from there.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-vets-uk',
    title: 'Finding an Avian Vet in the UK | Parrot Vet Guide',
    desc: 'How to find an avian vet for your parrot in the UK. Why general vets are not enough, how to find qualified avian specialists, what to expect at a parrot health check.',
    h1: 'Finding an Avian Vet in the UK',
    cat: 'Health',
    intro: 'Finding a qualified avian veterinarian before you bring your parrot home is one of the most important steps a responsible parrot owner can take. Parrots have unique physiology that differs substantially from dogs and cats, and a general vet without avian experience may miss problems that an avian specialist would catch immediately.',
    sections: [
      { h: 'Why you need an avian vet, not a general vet', body: '<p>The internal anatomy, physiology, and disease profile of parrots differs significantly from mammals. Psittacine diseases like Proventricular Dilatation Disease (PDD), Psittacine Beak and Feather Disease (PBFD), and Aspergillosis require specific knowledge to diagnose and treat. Many general vets are simply not equipped to treat parrots effectively. In an emergency, a general vet may be better than nothing — but for routine care, an avian specialist is essential.</p>' },
      { h: 'How to find an avian vet in the UK', body: '<ul><li><strong>AAV British Chapter (AAV/BC):</strong> the Association of Avian Veterinarians has a member directory that includes UK-based avian specialists</li><li><strong>RCVS Certificate/Diploma in Avian Medicine:</strong> the Royal College of Veterinary Surgeons lists vets who hold advanced qualifications in avian medicine at rcvs.org.uk</li><li><strong>Word of mouth:</strong> local parrot clubs, online parrot forums, and Facebook groups (UK Parrot Society etc.) are excellent sources of recommendations from other owners</li><li><strong>Phone ahead:</strong> call prospective vets and ask specifically about their experience with psittacines (parrots) and whether they have specific equipment for avian patients (e.g. digital radiology, incubators)</li></ul>' },
      { h: 'What to expect at a parrot health check', body: '<p>A thorough new-bird health check should include: visual assessment of feather quality, posture, and alertness; physical examination of beak, nares, eyes, and vent; body weight and condition score; crop check; faecal examination for parasites; and ideally a Chlamydophila (psittacosis) test. Your vet may recommend baseline blood work, particularly for larger, longer-lived species like African Greys and macaws.</p>' },
    ],
    faqs: [
      ['How much does an avian vet visit cost in the UK?', 'Avian vet consultations typically range from £50–£150 for a standard consultation, depending on location and the complexity of the assessment. Diagnostic tests, blood work, and treatment are additional. Avian vet care is generally more expensive than standard pet vet care — factor this into your ownership budget.'],
      ['Do all vets treat parrots?', 'No. While most vets will see a parrot in an emergency, many do not have the training, equipment, or experience to provide specialist care. Seek out a vet with specific avian experience for routine and specialist care.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'importing-parrots-uk',
    title: 'Importing a Parrot into the UK | Rules, CITES & Documentation',
    desc: 'Complete guide to importing a parrot into the UK after Brexit. CITES permits, animal health certificates, Border Control Post requirements, and the import process.',
    h1: 'Importing a Parrot into the UK',
    cat: 'CITES & Legal',
    intro: 'Importing a parrot into the UK involves a number of regulatory steps that changed significantly after Brexit. This guide explains the current rules clearly so you know exactly what documentation is required and what to expect during the import process.',
    sections: [
      { h: 'Post-Brexit parrot import rules', body: '<p>Since the UK left the EU\'s single market on 1 January 2021, parrots being imported from EU countries (including Spain, where our aviary is located) are subject to the same third-country import rules as birds from non-EU countries. This means:</p><ul><li>An <strong>Animal Health Certificate (AHC)</strong> issued by an official veterinarian in Spain is required for every bird</li><li>For CITES Appendix I species (African Greys, Hyacinth Macaws, many large macaws, some cockatoos), a <strong>UK CITES import permit</strong> issued by the Animal and Plant Health Agency (APHA) is required</li><li>For CITES Appendix II species, CITES documentation is still required but the process is slightly less stringent</li><li>All commercial imports of live birds must enter the UK through a designated <strong>Border Control Post (BCP)</strong></li></ul>' },
      { h: 'What Paraíso de Aves handles', body: '<p>We prepare all export-side documentation from Spain: the CITES export permit, the EU Animal Health Certificate, and veterinary health certificate. We handle the Spanish CITES authority application on our end. Your responsibility as the UK buyer is to apply for the UK CITES import permit (for Appendix I species), which we assist you with throughout the process, providing all necessary supporting documents.</p>' },
      { h: 'The APHA CITES import permit', body: '<p>To apply for a UK CITES import permit, you will need to submit Form FC6050 to the Animal and Plant Health Agency (APHA). The application requires details of the species, the source (our CITES registration details), and proof of legal acquisition. Processing times can range from 2–8 weeks, so this should be applied for early in the purchase process. We provide all seller documentation needed for your application.</p>' },
    ],
    faqs: [
      ['Can I bring a parrot into the UK on a passenger flight?', 'Commercial import of parrots for sale (i.e., buying a parrot abroad and bringing it into the UK) must go through a Border Control Post and the full commercial import documentation applies. Personal pet birds returning to the UK with their owner follow a different — but still documented — process.'],
      ['How long does the import process take?', 'From placing an order to the bird arriving in the UK, the process typically takes 4–10 weeks depending on permit processing times and flight availability. We keep you informed at every stage.'],
      ['Does the UK still accept EU CITES certificates?', 'The UK now issues its own CITES permits rather than recognising EU permits automatically. For commercial imports, a UK CITES import permit must be obtained in advance. We coordinate the full documentation chain from Spain.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'importing-parrots-ireland',
    title: 'Importing a Parrot into Ireland | Rules, CITES & Delivery Guide',
    desc: 'Guide to importing a parrot into the Republic of Ireland. EU CITES requirements, animal health certificates, vet checks, and delivery from Spain.',
    h1: 'Importing a Parrot into Ireland',
    cat: 'CITES & Legal',
    intro: 'Importing a parrot into the Republic of Ireland from another EU country such as Spain is governed by EU CITES regulations and EU animal health rules. This guide explains the current process for Irish buyers purchasing a parrot from our aviary in Valencia.',
    sections: [
      { h: 'Ireland as an EU member', body: '<p>The Republic of Ireland remains a member of the European Union, meaning trade in live animals between Spain and Ireland is governed by EU internal market rules. This is significantly simpler than the UK situation post-Brexit. For most captive-bred, ring-identified parrots with proper documentation, the process is straightforward.</p>' },
      { h: 'Required documents for Ireland', body: '<ul><li><strong>EU Animal Health Certificate</strong> — required for commercial movements of live birds within the EU</li><li><strong>CITES certificate</strong> — required for CITES-listed species; EU CITES documentation is valid throughout all EU member states including Ireland</li><li><strong>Microchip or ring band identification</strong> — all birds must be individually identified</li><li><strong>Veterinary health certificate</strong> — issued by our official veterinarian in Spain prior to travel</li></ul>' },
      { h: 'Transport to Ireland', body: '<p>We transport parrots to Ireland via specialist live-animal air cargo. Birds travel in IATA-compliant crates with food, water, and appropriate ventilation. The most common route is Valencia → Dublin Airport. Collection by the buyer or arrangement of onward transport from Dublin is required. We provide full guidance on the arrival process.</p>' },
    ],
    faqs: [
      ['Do Irish buyers need a CITES permit?', 'For most captive-bred CITES Appendix II species, no individual Irish import permit is required — the EU CITES export permit from Spain is sufficient. For Appendix I species (African Greys, Hyacinth Macaws), an EU import permit may be required depending on current Irish NPWS guidance. We assist with all documentation.'],
      ['Can you deliver to cities outside Dublin?', 'We deliver to Dublin Airport by air cargo. Irish buyers can arrange onward transport from Dublin, or in some cases we can arrange direct delivery through our Irish logistics partners. Contact us to discuss your location.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'breeders-vs-pet-shops',
    title: 'Parrot Breeder vs Pet Shop UK | Which is Better?',
    desc: 'Should you buy a parrot from a breeder or a pet shop in the UK? Honest comparison of sources, welfare standards, documentation, and what to look for.',
    h1: 'Buying from a Breeder vs a Pet Shop: What\'s the Difference?',
    cat: 'Buying Guides',
    intro: 'Where you buy your parrot matters enormously — not just for the bird\'s welfare, but for your experience as an owner. This guide compares the main sources for parrots in the UK and explains what to look for and what to avoid.',
    sections: [
      { h: 'Specialist breeder', body: '<p><strong>Advantages:</strong></p><ul><li>Birds are hand-raised from birth and socialised from the earliest weeks of life</li><li>You know the exact age, parentage, and health history of the bird</li><li>Full CITES documentation provided and verified</li><li>Ongoing support from the breeder — most specialist breeders are genuinely invested in the birds they place</li><li>Ability to visit the facility and meet the parents (in many cases)</li></ul><p><strong>Disadvantages:</strong></p><ul><li>Often higher upfront cost than other sources</li><li>May require a waiting list</li><li>International breeders require additional import documentation</li></ul>' },
      { h: 'Pet shops', body: '<p><strong>Advantages:</strong></p><ul><li>Immediate availability</li><li>Physically accessible; can see the bird in person before purchase</li></ul><p><strong>Disadvantages:</strong></p><ul><li>Staff often have limited knowledge of the specific species being sold</li><li>Unknown background — source breeder, age, socialisation history often unavailable</li><li>Stress of the retail environment may mask health or behavioural problems</li><li>CITES documentation quality is variable; always verify independently</li><li>Generally not hand-raised or individually socialised</li></ul>' },
      { h: 'What to look for from any source', body: '<ul><li>Full CITES documentation with the government authority seal — not a breeder\'s own certificate</li><li>Individual ring or microchip identification matching the paperwork</li><li>Veterinary health certificate issued by an independent, licensed vet</li><li>Willingness to show you the bird\'s environment or answer questions about its rearing</li><li>Alert, responsive bird with bright eyes, clean plumage, and active posture</li></ul>' },
    ],
    faqs: [
      ['Is it safe to buy a parrot online?', 'Buying from a reputable online breeder is safe if you verify documentation and have the ability to check references or reviews. The risk with online purchase is that documentation can be forged. Always request original CITES papers and verify them with the issuing authority if in doubt.'],
      ['What questions should I ask a breeder?', 'Ask: When was the bird hatched? When was it weaned? How was it socialised? What CITES documentation is provided? Can I see the parent birds? Is a health certificate available? What diet is it currently on? A reputable breeder will answer all of these willingly.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'hand-raised-vs-parent-raised',
    title: 'Hand-Raised vs Parent-Raised Parrots | What\'s the Difference?',
    desc: 'Hand-raised vs parent-raised parrots explained. Why hand-raising produces better companions, what it involves, and what to expect from each type of bird.',
    h1: 'Hand-Raised vs Parent-Raised Parrots',
    cat: 'Buying Guides',
    intro: 'When buying a parrot, you will often see the term "hand-raised" used by breeders. Understanding what this means — and why it matters — is important for making an informed choice.',
    sections: [
      { h: 'What is hand-raising?', body: '<p>Hand-raising means the chicks are removed from the nest at an early age (typically 2–4 weeks, depending on species) and fed by human hands using crop needles or syringes. This is done multiple times daily as chicks require frequent feeding. The chicks grow up associating humans with warmth, food, and safety — the foundational conditions for a tame, trusting companion bird.</p><p>At Paraíso de Aves, every bird we sell is hand-raised from the earliest possible age. The chicks are handled daily, exposed to a variety of sounds and human interaction, and given every opportunity to develop the social confidence that makes them outstanding companions.</p>' },
      { h: 'Parent-raised birds', body: '<p>Parent-raised birds are reared entirely by their parents with no human intervention during the critical early weeks. They can still be tamed later in life, but the process requires significantly more time and patience. Parent-raised birds are generally more suitable for breeding programmes than as companion pets for first-time owners.</p>' },
      { h: 'The importance of proper weaning', body: '<p>A common problem in the trade is "early weaning" — birds sold before they are fully independent and able to eat on their own. An under-weaned bird may appear to eat normally but become stressed and ill once separated from its hand-feeding source. Always ask your breeder when the bird was fully weaned and whether it is eating independently and consistently before purchase. All birds from Paraíso de Aves are fully weaned before delivery.</p>' },
    ],
    faqs: [
      ['Are hand-raised parrots always tame?', 'Hand-raised birds that have been properly socialised are far more likely to be tame and human-bonded than parent-raised birds. However, tameness is maintained through ongoing interaction — a hand-raised bird that is neglected for months will become nervous and less tame. Consistent positive interaction throughout the bird\'s life is essential.'],
      ['Can parent-raised parrots become pets?', 'Yes, but it requires significantly more time and skill. Adult wild-caught or parent-raised birds can be tamed through patient, consistent positive reinforcement work, but the process is longer and more challenging than with a hand-raised bird.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-toys-guide',
    title: 'Best Parrot Toys UK | Enrichment Guide for 2026',
    desc: 'Complete parrot toys and enrichment guide for UK owners. Best toy types by species, how to introduce new toys, foraging enrichment, and safety advice.',
    h1: 'Parrot Toys & Enrichment: A Complete Guide',
    cat: 'Care Guides',
    intro: 'Enrichment — providing stimulating objects, foraging opportunities, and novel experiences — is as essential to a parrot\'s wellbeing as food and water. A parrot without adequate enrichment is a parrot at risk: of feather plucking, stereotypical behaviours, or chronic stress.',
    sections: [
      { h: 'Types of parrot toys', body: '<ul><li><strong>Foraging toys:</strong> toys that hide food and require the bird to work to retrieve it — the most natural and enriching toy type</li><li><strong>Shredding/chew toys:</strong> palm leaf, seagrass, cork, wood — satisfy the natural chewing drive and wear beaks appropriately</li><li><strong>Foot toys:</strong> small objects the bird holds in its foot while chewing or manipulating — beloved by caiques and conures</li><li><strong>Swings and ladders:</strong> provide physical exercise and positional variety</li><li><strong>Puzzle toys:</strong> toys requiring a sequence of actions to access a reward — ideal for African Greys and Amazons</li><li><strong>Noise toys:</strong> bells, crinkle materials — some birds love the sensory stimulation</li></ul>' },
      { h: 'Safe toy materials', body: '<p>Safe: untreated natural wood (pine, willow, balsa, cork, palm), vegetable-tanned leather, stainless steel, cotton rope (without synthetic fibres). Avoid: zinc fastenings, chain links with small enough loops for a toe to get caught, thin threads that can tangle, toys with toxic dyes or finishes. If buying from UK pet suppliers, look for DEFRA compliance markings.</p>' },
      { h: 'Introducing new toys', body: '<p>Many parrots are initially afraid of new toys — a completely normal response in a prey species alert to novelty. Introduce new toys gradually: place the toy on top of the cage or near it for a day before introducing it inside. If the bird shows fear, place the toy progressively closer over several days. Never force a bird to interact with a toy it finds frightening.</p>' },
    ],
    faqs: [
      ['How often should I change parrot toys?', 'Rotate toys weekly — remove 2–3 and introduce 2–3 replacements. Keeping all toys in place permanently means the bird habituates and stops using them. Rotation maintains novelty. Keep a "toy library" of rotated items.'],
      ['What are foraging toys?', 'Foraging toys simulate the natural feeding behaviour of wild parrots, which spend the majority of their waking hours searching for food. Examples include treat balls, puzzle feeders, paper wraps hiding food, and shreddable toys stuffed with pellets. Foraging enrichment reduces boredom-related behaviours significantly.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-noise-levels',
    title: 'Parrot Noise Levels Guide | Which Parrots Are Loudest?',
    desc: 'Complete guide to parrot noise levels. Which parrots are loudest, quietest, best for flats, and how to manage noise. UK parrot owners\' guide.',
    h1: 'Parrot Noise Levels: A Complete Guide',
    cat: 'Buying Guides',
    intro: 'Parrot noise is one of the most common reasons parrots are rehomed. Understanding noise levels before you buy — and choosing a species appropriate for your living situation — is one of the most important decisions you will make.',
    sections: [
      { h: 'Noise levels by species', body: '<p>Here is an honest assessment of noise levels from the species we breed and sell:</p><table class="specs-table"><thead><tr><th>Species</th><th>dB (approx.)</th><th>Character</th><th>Flat-Suitable?</th></tr></thead><tbody><tr><td>Hyacinth Macaw</td><td>105–115 dB</td><td>Deep booming calls; at dawn/dusk</td><td>No</td></tr><tr><td>Scarlet Macaw</td><td>100–110 dB</td><td>Loud screeches; social contact calls</td><td>No</td></tr><tr><td>Sun Conure</td><td>95–105 dB</td><td>Persistent, penetrating; throughout day</td><td>No</td></tr><tr><td>Cockatoo</td><td>100–120 dB</td><td>Screaming when lonely; intermittent</td><td>No</td></tr><tr><td>Amazon (Yellow-Naped)</td><td>85–100 dB</td><td>Loud song-like calls; dawn/dusk</td><td>Difficult</td></tr><tr><td>African Grey</td><td>75–90 dB</td><td>Variable; talking, whistling, calls</td><td>Challenging</td></tr><tr><td>Caique</td><td>70–85 dB</td><td>Chirps, contact calls; short bursts</td><td>Possible</td></tr><tr><td>Green-Cheeked Conure</td><td>65–75 dB</td><td>Chirping, chattering; not sustained</td><td>Yes</td></tr><tr><td>Pionus</td><td>65–75 dB</td><td>Moderate; morning focus</td><td>Yes</td></tr></tbody></table>' },
      { h: 'When parrots are noisiest', body: '<p>Most parrots are noisiest at dawn and dusk — this is hardwired behaviour from the wild, where flock contact calls signal location at the start and end of the day. Managing these peak periods is easier if you can be present and interactive during them, giving the bird positive engagement that reduces the need to call out.</p>' },
      { h: 'Reducing problem noise', body: '<p>Persistent screaming is almost always a communication of unmet needs. Before concluding a bird is simply noisy, ask: Is it getting enough daily interaction? Is it receiving sufficient enrichment? Is it lonely? Is its routine stable? Addressing the underlying cause almost always reduces problem noise. Never cover the cage as a "punishment" — this is confusing and counterproductive.</p>' },
    ],
    faqs: [
      ['Can parrot noise be trained away?', 'Contact calling (natural flock communication) cannot and should not be eliminated. Problem screaming (persistent attention-seeking screaming) can be significantly reduced through training — specifically, by not reinforcing it with attention and by ensuring the bird\'s needs are met before it reaches the point of screaming.'],
      ['What is the quietest parrot you breed?', 'The Green-Cheeked Conure and the Pionus species are our quietest. They produce vocalisations but at a volume that most flat and semi-detached house situations can accommodate.'],
    ],
    ogImage: '/images/conure-sol-01.webp',
  },
  {
    slug: 'parrots-with-children',
    title: 'Parrots and Children | Safe Species, Tips & Supervision Guide',
    desc: 'Guide to keeping parrots with children in the UK. Best species for families, how to supervise, teaching children to handle birds, and safety advice.',
    h1: 'Parrots and Children: A Family Owner\'s Guide',
    cat: 'Buying Guides',
    intro: 'Parrots and children can form wonderful bonds — but success requires the right species, the right expectations, and ongoing adult supervision. This guide helps families make an informed decision and set their parrot up for success in a family home.',
    sections: [
      { h: 'Best parrot species for families with children', body: '<p><strong>Best choices:</strong></p><ul><li><strong>Green-Cheeked Conure</strong> — small, robust, playful, and tolerant; one of the most family-friendly parrot options</li><li><strong>Caique</strong> — entertaining and interactive; good with older children (7+) who understand handling</li><li><strong>Blue-and-Yellow Macaw</strong> — can be excellent with children in families that invest in training and socialisation</li><li><strong>African Grey</strong> — very intelligent and can bond closely with children, but emotionally sensitive; better for calmer households</li></ul><p><strong>More challenging with young children:</strong> Cockatoos (emotionally demanding), Sun Conures (loud and easily startled), Amazons (hormonal aggression).</p>' },
      { h: 'Teaching children to interact safely', body: '<ul><li>Move slowly around the bird; no sudden movements or running</li><li>Use a quiet, calm voice</li><li>Hold out a flat hand for step-up rather than reaching for the bird</li><li>Respect when the bird moves away or shows body language indicating it wants space</li><li>Never put fingers through the cage bars without permission from the bird</li><li>Always get an adult to supervise first interactions</li></ul>' },
      { h: 'Managing parrots and very young children', body: '<p>Toddlers and infants should not interact with parrots without very close adult supervision. The unpredictability of young children — sudden screaming, grabbing, falling — is extremely stressful for parrots and can trigger biting in otherwise gentle birds. Many parrot owners establish a child-free zone around the bird\'s cage area until children are old enough to reliably follow interaction rules.</p>' },
    ],
    faqs: [
      ['Can parrots hurt children?', 'Yes — even a medium-sized parrot can inflict a serious bite. African Greys, Amazons, and macaws have strong beaks capable of breaking skin. This does not mean they will bite children, but it underscores why supervision and teaching proper interaction is essential.'],
      ['At what age can children handle parrots?', 'This varies by child and by species. Generally, children aged 7+ with good self-control and proper instruction can begin supervised handling of most parrot species. For large macaws, 10+ is a more appropriate guideline.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrots-with-cats-dogs',
    title: 'Parrots with Cats & Dogs | Safe Introduction & Management Guide',
    desc: 'Can you keep a parrot with cats or dogs? Safety guide for UK households. Introduction techniques, ongoing management, and honest risk assessment.',
    h1: 'Parrots with Cats and Dogs: Safety Guide',
    cat: 'Care Guides',
    intro: 'Many parrot owners also have cats or dogs. With careful management, these animals can coexist in the same household — but the risks must be understood clearly and appropriate precautions must be maintained permanently.',
    sections: [
      { h: 'The fundamental risk', body: '<p>Cats are obligate carnivores whose predatory instincts are hardwired — even a cat that has "lived with" a parrot for years can act on instinct in a moment of opportunity. Dogs vary widely: terriers and hunting breeds have strong prey drives; retrievers and spaniels can often be trained to behave safely around birds. But no cat or dog should ever be considered guaranteed safe around a parrot without supervision, regardless of previous good behaviour.</p><p>A cat scratch — even without apparent injury — can introduce Pasteurella multocida bacteria which is fatal to parrots without immediate antibiotic treatment. A dog bite can be instantly lethal. These are not theoretical risks.</p>' },
      { h: 'Introduction techniques', body: '<p>If you must integrate a parrot into a home with cats or dogs:</p><ul><li>Keep all interactions strictly supervised; never leave a parrot out of its cage unattended with other animals in the room</li><li>Allow the animals to become accustomed to each other\'s presence with the parrot safely caged before any closer introduction</li><li>Train the dog to "leave it" and respect the bird\'s space — this is achievable with consistent work</li><li>Provide the parrot with a cage the cat or dog cannot knock over or access</li></ul>' },
      { h: 'Practical management', body: '<p>The most practical approach for most households is strict spatial separation: the parrot has its out-of-cage time in a room where cats and dogs are not present. This is the simplest, safest arrangement and places no stress on any of the animals.</p>' },
    ],
    faqs: [
      ['Can a parrot live safely with a cat?', 'It is possible but requires permanent, vigilant management. The parrot should never be left unsupervised with a cat in the same room, regardless of how well they appear to get along. The risk — while manageable — is never zero.'],
      ['What should I do if my cat scratches my parrot?', 'Seek immediate veterinary attention, even if the scratch appears minor. Pasteurella bacteria in cat saliva and claws can cause fatal septicaemia in birds within hours. Antibiotic treatment must be started as quickly as possible.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-insurance-uk',
    title: 'Parrot Insurance UK | Do You Need Pet Insurance for a Parrot?',
    desc: 'Guide to parrot insurance in the UK. Do parrots need pet insurance? Costs, what is covered, best providers, and why avian vet bills can be high.',
    h1: 'Parrot Insurance in the UK',
    cat: 'Health',
    intro: 'Avian veterinary care can be expensive — significantly more so than routine cat or dog care. For high-value, long-lived birds, pet insurance can provide meaningful financial protection. This guide explains what is available for parrot owners in the UK.',
    sections: [
      { h: 'Why avian vet bills can be high', body: '<p>Parrots have unique physiology that requires specialised equipment, knowledge, and often hospitalisation. Common procedures: radiology (specialist positioning for birds), endoscopy, crop tubing, specialist medication compounding, and incubation during recovery. A single health crisis for a large macaw or African Grey can generate bills of £500–£3,000 or more. Owners without insurance face these costs directly.</p>' },
      { h: 'Parrot insurance in the UK', body: '<p>Pet insurance for parrots is available from a limited number of UK insurers. Key providers to research include:</p><ul><li><strong>Exotic Direct</strong> — one of the most established UK providers for exotic pets including parrots; offers cover for illness, injury, and third-party liability</li><li><strong>Cliverton</strong> — specialist in birds and exotic animals</li><li><strong>E&L Insurance</strong> — offers cover for birds including parrots</li></ul><p>Coverage varies significantly between providers and policies. Key things to check: does the policy cover avian specialist consultations? Are pre-existing conditions excluded? Is there a per-condition or annual claim limit?</p>' },
      { h: 'Is insurance worth it?', body: '<p>For high-value species like Hyacinth Macaws or African Greys, insurance is almost certainly worthwhile. Monthly premiums typically range from £15–£60 depending on species, cover level, and age of the bird. Compare this to a single hospitalisation event. For lower-cost birds, it is a personal financial decision — but the emotional argument for insurance is strong regardless: not having to make veterinary decisions based on cost alone is a significant benefit.</p>' },
    ],
    faqs: [
      ['Is parrot insurance expensive?', 'For most species, premiums range from £15–£60/month depending on the insurer, species, and cover level. Higher-value species (Hyacinth Macaws, African Greys) attract higher premiums reflecting their value and veterinary cost profile.'],
      ['Does parrot insurance cover CITES documentation replacement?', 'Some policies include coverage for loss or theft of CITES certificates. Check your policy carefully — replacement CITES documentation can take weeks and the process is bureaucratic.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'uk-parrot-laws',
    title: 'UK Parrot Laws 2026 | Legal Requirements for Parrot Owners',
    desc: 'UK legal requirements for parrot owners in 2026. CITES regulations, Animal Welfare Act, licensing requirements, microchipping rules, and what is and isn\'t legal.',
    h1: 'UK Parrot Laws: What Every Owner Needs to Know',
    cat: 'CITES & Legal',
    intro: 'Parrot ownership in the UK is subject to a number of legal requirements, primarily related to wildlife trade (CITES) and animal welfare. This guide summarises the key legal obligations for UK parrot owners.',
    sections: [
      { h: 'CITES and wildlife trade law', body: '<p>The UK controls the trade in CITES-listed species under the <strong>Control of Trade in Endangered Species (Enforcement) Regulations 2018 (COTES)</strong> and the <strong>Wildlife and Countryside Act 1981</strong>. It is a criminal offence to buy, sell, or possess CITES Appendix I species without valid paperwork. APHA enforces CITES regulations in the UK.</p><p>When you purchase a CITES-listed parrot, you must receive a CITES certificate confirming legal acquisition. You must keep this certificate safely for the lifetime of the bird — it is required if you ever sell, transfer, or export the bird, and APHA inspectors can request it.</p>' },
      { h: 'The Animal Welfare Act 2006', body: '<p>The Animal Welfare Act 2006 requires all animal owners to ensure their animals can exhibit normal behaviour patterns, are protected from pain and suffering, and have access to a suitable diet and environment. Failure to meet these obligations is a criminal offence. Specifically for parrots, keeping a bird in inadequate housing or without social interaction could constitute a welfare offence.</p>' },
      { h: 'Selling parrots in the UK', body: '<p>The sale of parrots in the UK is subject to licensing requirements introduced as part of the Animal Welfare (Licensing of Activities Involving Animals) (England) Regulations 2018. Anyone selling animals as a business — including parrots — requires a licence from their local authority. Unlicensed commercial sale of animals is illegal. Private individuals selling a single bird are generally exempt.</p>' },
      { h: 'Ring bands and microchipping', body: '<p>CITES-listed parrots are required to be individually identified, typically by a closed metal ring band applied as a chick, or in some cases by a microchip. The ring number must correspond to the CITES documentation. If a ring is lost or damaged, replacement identification must be arranged and documented — an avian vet can advise on the process.</p>' },
    ],
    faqs: [
      ['Can I keep any parrot species in the UK without a permit?', 'Most captive-bred parrots can be kept without a personal ownership permit, provided they come with valid CITES documentation. You do not need a licence simply to own a parrot in the UK, but you must have the documentation proving legal acquisition.'],
      ['What happens if my parrot escapes?', 'If a CITES-listed parrot escapes and is found by someone else, the CITES certificate is crucial for proving ownership and reclaiming the bird. Keep your documentation safe and in a known location. Microchipping (in addition to ringing) provides an additional layer of identification.'],
      ['Is it legal to breed parrots at home in the UK?', 'Yes, home breeding of parrots is legal for personal purposes. Commercial breeding requires a local authority licence. CITES documentation must be maintained correctly for all offspring of CITES-listed species.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'green-wing-macaw-guide',
    title: 'Green-Wing Macaw Guide UK | The Gentle Giant Macaw',
    desc: 'Complete guide to the Green-Wing Macaw for UK buyers. Temperament, care, CITES requirements, size, and delivery from Spain to the UK and Ireland.',
    h1: 'Green-Wing Macaw Guide',
    cat: 'Species Guides',
    intro: 'The Green-Wing Macaw (<em>Ara chloropterus</em>) is the second-largest macaw species — a magnificently coloured bird with a reputation as the gentlest and most even-tempered of the large macaws. Often called the "gentle giant," the Green-Wing is an outstanding choice for owners ready for a large bird.',
    sections: [
      { h: 'Appearance and identification', body: '<p>Green-Wings are often confused with Scarlet Macaws from a distance, but up close they are unmistakeable: the rich deep red body is interspersed with a band of green across the wings (giving the species its name), and blue tail feathers. The facial patch is distinctive — bare white skin with tiny red feather lines, unlike the Scarlet Macaw\'s plain yellow facial patch. Adults reach 90 cm from beak to tail tip and weigh 1.0–1.7 kg.</p>' },
      { h: 'Temperament', body: '<p>Green-Wing Macaws are generally calmer and less hyperactive than Blue-and-Yellow or Scarlet Macaws, and significantly less neurotic than many cockatoo species. They form very close bonds with their primary caregivers and are typically gentle when handled consistently and respectfully. They are playful and curious without being destructive in the chaotic way of some macaw species.</p><p>That said, they are still large macaws: their beak generates enormous force and their noise level is substantial. These are not birds for small spaces or apartment living.</p>' },
      { h: 'Care requirements', body: '<ul><li><strong>Cage:</strong> minimum 120×80×150 cm; ideally larger</li><li><strong>Daily out-of-cage time:</strong> 4+ hours minimum</li><li><strong>Diet:</strong> high-quality macaw pellets, fresh vegetables, palm nuts (a natural food for this species), moderate fruit</li><li><strong>Lifespan:</strong> 40–60 years</li><li><strong>CITES status:</strong> Appendix II</li></ul>' },
    ],
    faqs: [
      ['How does a Green-Wing compare to a Blue-and-Yellow Macaw?', 'Green-Wings are generally considered calmer and more gentle, while Blue-and-Yellows are more extroverted and active. Green-Wings are also slightly larger. Both are excellent companion birds; temperament preference is the main deciding factor for most buyers.'],
      ['Are Green-Wing Macaws good for first-time macaw owners?', 'The Green-Wing is often recommended as the best starting macaw for owners new to large parrots, given its generally calmer temperament. That said, any large macaw requires significant experience, time, and resources — they are not beginner birds in the broader sense.'],
    ],
    ogImage: '/images/guacamayo-ala-verde-01.webp',
  },
  {
    slug: 'catalina-macaw-guide',
    title: 'Catalina Macaw Guide UK | The Colourful Hybrid Macaw',
    desc: 'Complete guide to the Catalina Macaw. What is a hybrid macaw, colour variations, temperament, care needs, CITES status, and UK delivery.',
    h1: 'Catalina Macaw Guide',
    cat: 'Species Guides',
    intro: 'The Catalina Macaw is a first-generation hybrid between a Blue-and-Yellow Macaw and a Scarlet Macaw — one of the most colourful and visually spectacular birds in the parrot world. Each Catalina is unique, combining the colour genetics of both parents in unpredictable, breathtaking ways.',
    sections: [
      { h: 'What is a hybrid macaw?', body: '<p>Hybrid macaws are the offspring of two different macaw species. The Catalina (also written Catalína) is produced by crossing a Blue-and-Yellow Macaw (<em>Ara ararauna</em>) with a Scarlet Macaw (<em>Ara macao</em>). The resulting bird inherits colour traits from both parents, typically producing a bird with an orange-red chest, a blue-green back, and a mix of the two parents\' wing colouration. No two Catalinas look exactly alike.</p><p>Hybrid macaws are fertile only rarely, and breeding hybrids back to a pure species produces second-generation hybrids with further colour variation.</p>' },
      { h: 'Temperament and personality', body: '<p>Catalinas typically inherit a blend of their parents\' personalities. Blue-and-Yellows are known for being extroverted, playful, and somewhat vocal; Scarlets are more energetic and can be more assertive. Catalinas tend to be vibrant, energetic, and highly social birds that enjoy interaction and stimulation. Like all macaws, they benefit enormously from early socialisation and consistent positive reinforcement handling.</p>' },
      { h: 'CITES status', body: '<p>Catalina Macaws, as captive-bred hybrids of two CITES-listed species, are themselves subject to CITES documentation requirements. Our Catalinas are sold with full CITES-compliant documentation reflecting their hybrid status and captive-bred origin.</p>' },
      { h: 'Care requirements', body: '<ul><li><strong>Size:</strong> 80–90 cm; similar to Scarlet and Blue-and-Yellow parents</li><li><strong>Lifespan:</strong> 50–70 years</li><li><strong>Cage:</strong> minimum 120×80×150 cm</li><li><strong>Diet:</strong> quality macaw pellets, fresh vegetables, limited seeds, moderate fruit</li></ul>' },
    ],
    faqs: [
      ['Do Catalina Macaws make good pets?', 'Yes — Catalinas are excellent companion birds for owners experienced with large parrots. Their vibrant personality, visual uniqueness, and intelligence make them outstanding companions. Their care requirements are identical to their parent species.'],
      ['Are Catalina Macaws rare?', 'Not rare, but unique — each bird is a distinct colour combination that cannot be exactly replicated. They are bred specifically and are not available in large numbers at any given time.'],
    ],
    ogImage: '/images/catalina-macaw/catalina-macaw-01.jpg',
  },
  {
    slug: 'hyacinth-macaw-guide',
    title: 'Hyacinth Macaw Guide UK | Complete Owner\'s Guide',
    desc: 'Complete Hyacinth Macaw guide for UK buyers. The world\'s largest parrot — CITES requirements, care, diet, housing, and delivery from Spain.',
    h1: 'Hyacinth Macaw Guide',
    cat: 'Species Guides',
    intro: 'The Hyacinth Macaw (<em>Anodorhynchus hyacinthinus</em>) is the world\'s largest flying parrot and one of the most striking birds on Earth. Cobalt blue from head to tail with a vivid yellow facial ring, the Hyacinth commands attention in any room — and its gentle, affectionate temperament makes it one of the most remarkable companion birds available.',
    sections: [
      { h: 'Conservation status', body: '<p>The Hyacinth Macaw is listed as <strong>Vulnerable</strong> on the IUCN Red List and on <strong>CITES Appendix I</strong> — the highest protection category. The wild population, centred on the Brazilian Pantanal, has recovered from its nadir in the 1980s (when trapping and habitat loss pushed numbers below 1,500) but remains threatened. All legally traded Hyacinth Macaws must be captive-bred with full documentation. Wild-caught Hyacinths cannot be legally traded.</p>' },
      { h: 'The gentle giant temperament', body: '<p>Despite their intimidating size — up to 100 cm and 1.7 kg, with a beak capable of cracking a coconut — hand-raised Hyacinth Macaws are extraordinarily gentle birds. They take food carefully from fingers, groom their owners with deliberate gentleness, and generally exercise their immense strength with remarkable control. They are described by experienced macaw owners as "big dogs with wings" — loyal, affectionate, and endlessly entertaining.</p>' },
      { h: 'Practical care', body: '<ul><li><strong>Cage:</strong> minimum 150×90×180 cm — the largest commercially available macaw cage</li><li><strong>Diet:</strong> palm nuts are essential (their primary wild food); quality macaw pellets, fresh vegetables, fruit in moderation</li><li><strong>Out-of-cage time:</strong> 4+ hours daily; Hyacinths need significant physical activity</li><li><strong>Lifespan:</strong> 60–80 years</li><li><strong>CITES:</strong> Appendix I — full import permit required for UK</li></ul>' },
      { h: 'Cost reality', body: '<p>Hyacinth Macaws are among the most expensive parrots in the world, reflecting their rarity, the complexity of their captive breeding, the cost of their CITES documentation, and their care requirements. The purchase price is only the beginning — their diet, cage, veterinary care, and enrichment represent ongoing significant investment. They are birds for those who have planned carefully and are genuinely prepared for decades of commitment.</p>' },
    ],
    faqs: [
      ['Why are Hyacinth Macaws so expensive?', 'Several factors combine: CITES Appendix I status limits legal supply; they are challenging to breed in captivity; clutch sizes are small; and the full documentation process adds significant cost. The purchase price reflects genuine rarity and the complexity of legal captive breeding.'],
      ['Do Hyacinth Macaws talk?', 'Hyacinths are not renowned talkers — most learn a small vocabulary of 20–30 words. Their communication is primarily through vocalisations, body language, and behaviour rather than speech. Their vocalisations are loud and carry far.'],
    ],
    ogImage: '/images/guacamayo-jacinto-01.webp',
  },
  {
    slug: 'parrot-sleep-guide',
    title: 'How Much Sleep Do Parrots Need? | Parrot Sleep Guide UK',
    desc: 'How much sleep do parrots need? Sleep requirements by species, signs of sleep deprivation, cage covers, and creating the right sleep environment for your parrot.',
    h1: 'How Much Sleep Do Parrots Need?',
    cat: 'Care Guides',
    intro: 'Sleep is a critical and often overlooked aspect of parrot welfare. Parrots that are regularly sleep-deprived become irritable, prone to illness, and can develop chronic behavioural problems. Understanding your parrot\'s sleep needs is an important part of responsible ownership.',
    sections: [
      { h: 'Sleep requirements by species', body: '<p>As a general rule, parrots need <strong>10–12 hours of sleep per night</strong>, in a dark, quiet environment. Tropical species evolved near the equator where day length stays close to 12 hours year-round. A parrot kept in a bright living room until midnight and woken by morning activity at 7 am is not getting sufficient sleep.</p><p>Larger, longer-lived species (African Greys, macaws, cockatoos) seem to require the full 12 hours consistently. Smaller species (conures, caiques) appear to manage slightly better on 10–11 hours, though 12 is still ideal.</p>' },
      { h: 'Signs of sleep deprivation', body: '<ul><li>Unusual irritability or increased biting</li><li>Excessive feather fluffing during daytime</li><li>Reduced vocalisation or unusual quietness</li><li>More frequent "off days" where the bird is clearly not its normal self</li><li>Reduced immune function and increased susceptibility to illness</li></ul>' },
      { h: 'Creating the right sleep environment', body: '<p>Options:</p><ul><li><strong>Cage cover:</strong> a heavy, dark cage cover signals nighttime and blocks light. Use breathable fabric and ensure adequate ventilation.</li><li><strong>Separate sleep cage:</strong> moving the bird to a smaller, quieter room at bedtime. This is the preferred method for birds in lively households.</li><li><strong>Dimmer switch:</strong> gradually reducing room lighting in the hour before bedtime helps signal the transition to sleep.</li></ul>' },
    ],
    faqs: [
      ['Should I cover my parrot\'s cage at night?', 'Covering the cage is beneficial for most parrots — it simulates natural dusk, blocks light from screens and household activity, and helps the bird achieve undisturbed sleep. Use a breathable fabric cover and ensure the room is adequately ventilated.'],
      ['Can parrots nap during the day?', 'Yes — parrots naturally take a short midday rest, particularly in warm weather. A brief 30-minute nap after midday feeding is entirely normal. Extended daytime sleeping may indicate illness and warrants veterinary attention.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-bathing-guide',
    title: 'How to Bathe a Parrot | Bathing Guide UK',
    desc: 'How to bathe a parrot step by step. Spray bathing, shallow baths, shower perches, and why regular bathing is important for parrot feather health and skin condition.',
    h1: 'How to Bathe Your Parrot',
    cat: 'Care Guides',
    intro: 'Regular bathing is an important part of parrot care that is often underestimated by new owners. It maintains feather condition, supports healthy preening, removes dust and debris, and for many species, it is a genuinely enjoyable activity that provides enrichment.',
    sections: [
      { h: 'Why bathing matters', body: '<p>In the wild, parrots bathe in rain, dew, and shallow water sources regularly. In captivity, particularly in the UK\'s often dry heated homes, parrots can suffer from dry skin, poor feather quality, and increased feather dust accumulation without regular bathing. Regular bathing also supports the natural preening process — parrots spread uropygial gland oil while preening after bathing, which conditions feathers and maintains waterproofing.</p>' },
      { h: 'Bathing methods', body: '<ul><li><strong>Spray bottle:</strong> use a clean bottle filled with lukewarm water. Mist the bird gently, avoiding the eyes and nostrils. Most parrots enjoy this once they are accustomed to it.</li><li><strong>Shallow bath:</strong> a shallow dish of 2–3 cm of lukewarm water placed on the cage floor or a stable surface. Many parrots will splash happily.</li><li><strong>Shower perch:</strong> a suction-cup perch attached to the shower wall allows birds to bathe in light, warm water while their owner showers. African Greys and macaws often become enthusiastic shower companions.</li><li><strong>Leafy greens misting:</strong> some birds prefer to rub against wet leafy greens rather than being sprayed directly.</li></ul>' },
      { h: 'How often to bathe', body: '<p>Most species benefit from bathing 2–3 times per week. African Greys, which produce significant feather dust (dander), and cockatoos (similar), benefit from more frequent bathing — daily or every other day — which reduces dander in the home and supports feather health. Always bathe earlier in the day so the bird can dry completely before the cool of the evening.</p>' },
    ],
    faqs: [
      ['Can I use any products when bathing my parrot?', 'No. Use plain, lukewarm water only. Do not use soaps, shampoos, or any additives unless specifically prescribed by an avian vet for a medical condition. Most commercial "feather condition" sprays are unnecessary and some contain ingredients that could be harmful.'],
      ['What if my parrot hates bathing?', 'Some birds are initially reluctant. Introduce bathing very gradually — start with just a light mist at a distance and build up over weeks. Place a shallow dish in the cage and let the bird investigate at its own pace. Offering bathing after a training session (when the bird is in a positive, engaged state) can help.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'feather-plucking-guide',
    title: 'Feather Plucking in Parrots | Causes, Prevention & Treatment UK',
    desc: 'Why parrots feather pluck and what to do about it. Causes, prevention, treatment options, and when to see an avian vet. UK parrot owner\'s guide.',
    h1: 'Feather Plucking in Parrots: Causes & Treatment',
    cat: 'Health',
    intro: 'Feather destructive behaviour (FDB) — commonly called feather plucking — is one of the most distressing conditions a parrot owner can encounter. It is also one of the most complex: the causes are varied, the treatment is not always straightforward, and the condition can become chronic if not addressed promptly.',
    sections: [
      { h: 'Is it always plucking?', body: '<p>It is important to distinguish between feather plucking and other feather problems:</p><ul><li><strong>Feather plucking:</strong> the bird actively removes its own feathers; over-preening to the point of damage</li><li><strong>PBFD (Psittacine Beak and Feather Disease):</strong> viral disease causing feather loss; requires veterinary diagnosis</li><li><strong>Feather cysts:</strong> ingrown feathers causing lumps; requires veterinary treatment</li><li><strong>Normal moult:</strong> seasonal feather shedding is entirely normal</li></ul><p>Any sudden change in feather condition should be evaluated by an avian vet to rule out medical causes before assuming the cause is behavioural.</p>' },
      { h: 'Medical causes', body: '<ul><li><strong>Bacterial or fungal skin infection</strong></li><li><strong>Internal parasites</strong></li><li><strong>Nutritional deficiency</strong> (particularly Vitamin A)</li><li><strong>Heavy metal toxicity</strong> (zinc, lead)</li><li><strong>PBFD virus</strong></li><li><strong>Hormonal imbalance</strong></li><li><strong>Allergy</strong> (food, environmental)</li></ul>' },
      { h: 'Behavioural causes', body: '<ul><li><strong>Boredom and insufficient enrichment</strong> — the most common cause in companion birds</li><li><strong>Loneliness and insufficient social interaction</strong></li><li><strong>Chronic stress</strong> — from unpredictable routine, inadequate sleep, household tension</li><li><strong>Sexual frustration</strong></li><li><strong>Anxiety disorder</strong> — some birds develop compulsive plucking analogous to human OCD</li></ul>' },
      { h: 'Treatment approach', body: '<p>Successful treatment requires identifying and addressing the specific cause. This typically means: full veterinary workup to rule out medical causes; detailed history review to identify environmental triggers; enrichment audit; and in persistent cases, referral to an avian behaviourist. Anti-anxiety medications are used in severe cases but are not a substitute for addressing root causes.</p>' },
    ],
    faqs: [
      ['Can feather plucking be cured?', 'It depends on the cause. If caught early and the cause (medical or environmental) is identified and addressed, full recovery is possible. Long-standing cases or cases where the behaviour has become compulsive are harder to resolve but can often be managed to reduce severity.'],
      ['Does a parrot feel pain when it plucks?', 'Plucking feathers can cause pain, particularly when blood feathers (developing feathers with active blood supply) are removed. Despite this, some birds persist — indicating significant underlying distress that overrides the pain response.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-aggression-guide',
    title: 'Parrot Aggression | Why Parrots Bite & How to Manage It',
    desc: 'Why parrots bite and become aggressive. Understanding the causes of parrot aggression, body language warning signs, and positive reinforcement management techniques.',
    h1: 'Parrot Aggression: Understanding and Managing Biting',
    cat: 'Behaviour',
    intro: 'Parrot biting is one of the most common challenges parrot owners face, and one of the most misunderstood. Parrots do not bite out of spite or malice — biting is always a communication, and understanding what it is communicating is the key to reducing it.',
    sections: [
      { h: 'Common causes of biting', body: '<ul><li><strong>Fear:</strong> the most common cause; the bird feels threatened and bites defensively</li><li><strong>Over-stimulation:</strong> a bird that has been petted past its tolerance point communicates "stop" with a bite</li><li><strong>Hormonal behaviour:</strong> particularly in spring; otherwise gentle birds can become aggressive during breeding season</li><li><strong>Territorial behaviour:</strong> biting near the cage entrance is a common cage-territory behaviour</li><li><strong>Pain or illness:</strong> a bird in pain may bite when touched in an affected area</li><li><strong>Redirected aggression:</strong> a bird startled or frustrated by something else may bite the nearest available person</li></ul>' },
      { h: 'Reading pre-bite body language', body: '<p>Bites rarely come without warning. Learning to read warning signs prevents many bites before they happen:</p><ul><li>Pinning eyes (rapid pupil dilation and contraction)</li><li>Tail fanning</li><li>Raised feathers on the neck or back</li><li>Leaning away from contact</li><li>Nibbling escalating to harder biting</li></ul><p>When you see these signals, give the bird space rather than pushing through.</p>' },
      { h: 'Responding to biting', body: '<p>The worst response to a bite is a loud yelp, pulling away sharply, or any dramatic reaction — this is often reinforcing (it got a reaction!) and can become a game for some birds. The ideal response: stay calm, set the bird down gently, and disengage for a few minutes without drama or punishment. Punishing a parrot (tapping the beak, scruffing, putting it "in time out") damages trust and makes biting worse over time.</p>' },
    ],
    faqs: [
      ['Will my parrot always bite?', 'No — biting behaviour can be significantly reduced with consistent positive reinforcement training, learning to read body language, and addressing the root cause of the biting. Many "biters" become much gentler birds once their needs are better understood and met.'],
      ['What should I do immediately after being bitten?', 'Stay calm, set the bird down, and treat the wound. Do not punish the bird. Wash the bite with soap and water; parrot beaks can introduce bacteria. For deeper bites, seek medical attention. For persistent biting, consult an avian behaviourist.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-delivery-guide',
    title: 'How Parrot Delivery Works | Air Cargo to UK & Ireland',
    desc: 'Complete guide to how parrot delivery works from Spain to the UK and Ireland. Air cargo, IATA crates, collection points, timing, and what to expect on collection day.',
    h1: 'How Parrot Delivery Works: Air Cargo to the UK & Ireland',
    cat: 'Delivery',
    intro: 'Receiving a parrot by air cargo is a safe, well-regulated process when handled by a specialist breeder. This guide walks you through exactly how delivery from our aviary in Valencia, Spain, to the UK and Ireland works — from preparation to collection at the airport.',
    sections: [
      { h: 'The journey', body: '<p>Your bird is transported by specialist live-animal air cargo. The route from Valencia (VLC) typically connects through a major hub (Madrid Barajas or a Northern European hub) before arriving at the UK collection airport — usually London Heathrow (LHR), Manchester (MAN), Birmingham (BHX), or Glasgow (GLA) for UK buyers; Dublin (DUB) for Irish buyers.</p><p>The entire journey from aviary departure to airport collection typically takes 6–14 hours depending on connection times and routing. This is entirely normal for international live-animal movements and is well within welfare guidelines for healthy, acclimatised birds.</p>' },
      { h: 'The travel crate', body: '<p>All birds travel in <strong>IATA-compliant live-animal crates</strong> — purpose-built containers with adequate ventilation, a non-slip floor, and appropriate space for the bird\'s size and species. The crate contains food and a water gel pad. The bird has been introduced to the crate prior to travel to reduce stress. Our team ensures every bird is in excellent condition before departure.</p>' },
      { h: 'Collection at the airport', body: '<p>On arrival, the cargo must clear Border Control Post (BCP) veterinary inspection. This typically takes 1–4 hours after the flight lands. We provide you with the expected collection window in advance. You will need to bring: your ID, the delivery reference number we provide, and a suitable carrier or travel cage for the onward journey home. Our documentation (AHC, CITES) travels with the bird.</p>' },
      { h: 'First hours at home', body: '<p>When you get the bird home, set it up in its pre-prepared cage in a quiet area. Offer water and familiar food (we advise you on what the bird is eating before departure). Allow the bird to settle without pressure for interaction — the travel is tiring, and a quiet few hours of adjustment makes the transition significantly smoother.</p>' },
    ],
    faqs: [
      ['Is air cargo stressful for parrots?', 'Any change of environment involves some stress, and transport is no exception. However, a healthy, well-socialised hand-raised bird that has been introduced to the travel crate handles the journey far better than is often assumed. We take significant care in preparation and ensure all birds are in optimal condition before travel.'],
      ['What happens if the flight is delayed?', 'Air cargo delay procedures are well established. Birds are held in temperature-controlled animal holding facilities at airports during extended delays. We monitor all shipments and keep you informed of any changes to the expected arrival time.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
  {
    slug: 'parrot-acclimatisation',
    title: 'Settling a New Parrot In | The First Week Home',
    desc: 'How to help your new parrot settle in during the first week home. The acclimatisation process, cage setup, the 3-3-3 rule, signs of stress, and first vet visit.',
    h1: 'Settling a New Parrot: The First Week Home',
    cat: 'Buying Guides',
    intro: 'The first week a new parrot is home is a critical transition period. Even a well-socialised, hand-raised bird is entering an unfamiliar environment with new sounds, smells, people, and routines. How you manage this period has a lasting impact on the relationship you will build.',
    sections: [
      { h: 'The 3-3-3 rule', body: '<p>Many bird owners use the "3-3-3 rule" as a rough guide: 3 days for the bird to begin eating normally and orienting itself; 3 weeks to establish a routine and begin interacting consistently; 3 months to fully settle and show its true personality. This is a guide, not a guarantee — individual birds vary widely — but it sets realistic expectations and prevents owners from pushing for too much interaction too soon.</p>' },
      { h: 'What to do in the first 24–48 hours', body: '<ul><li>Place the bird in its pre-set-up cage in a quiet area of the home</li><li>Offer familiar food (ask us what it was eating before delivery)</li><li>Speak softly near the cage; do not attempt handling for at least 24 hours</li><li>Keep the household calm; avoid introducing lots of new people or pets</li><li>Observe droppings, eating, and posture; contact an avian vet if anything seems wrong</li></ul>' },
      { h: 'The first veterinary visit', body: '<p>A new-bird health check within 72 hours of arrival is strongly recommended. This establishes a health baseline, allows the vet to check for any issues not apparent on visual inspection, and starts the relationship with your avian specialist. If the bird has been recently health-checked by our vet before departure, this check is still worthwhile — different vets may catch different things, and a baseline UK record is valuable.</p>' },
    ],
    faqs: [
      ['What if my parrot won\'t eat after arriving?', 'Some degree of reduced appetite in the first 24–48 hours is normal. Offer familiar foods at familiar times. If the bird has not eaten by the end of the second day, or if you notice other signs of distress (fluffed feathers, lethargy), contact your avian vet. Ensure the bird has constant access to fresh water.'],
      ['How soon can I start handling my new parrot?', 'Follow the bird\'s lead. Some hand-raised birds will step up within a day or two. Others take a week or more before they are comfortable enough to accept handling. Do not force it — pushing too soon can set back the bonding process significantly.'],
    ],
    ogImage: '/images/homepage/hand-raised-macaw-breeder.jpg',
  },
];

// ═══════════════════════════════════════════════════════════════════
// DATA — FAQ PAGES (50 pages under /en/knowledge/faq/)
// ═══════════════════════════════════════════════════════════════════
const FAQS = [
  { slug: 'how-much-does-african-grey-cost', q: 'How Much Does an African Grey Parrot Cost in the UK?', relatedSpecies: '/en/african-grey/', relatedGuide: '/en/knowledge/african-grey-guide/', intro: 'The African Grey is one of the most sought-after parrots in the UK, and pricing reflects both its extraordinary intelligence and the cost of CITES documentation, captive breeding, and hand-raising. Here is an honest breakdown of what to expect.', answer: `<p>In the UK, hand-raised <strong>African Grey parrots from a reputable specialist breeder</strong> typically cost between <strong>£1,500 and £3,500</strong>, depending on subspecies, age, level of socialisation, and whether the bird has been trained. Hand-raised, fully weaned, recently purchased birds command the highest prices; older birds occasionally become available at different price points.</p><p>The <strong>Congo African Grey</strong> (<em>Psittacus erithacus erithacus</em>) — the larger, lighter grey subspecies with the bright red tail — is the more commonly available subspecies and typically sits in the £1,800–£2,800 range. The <strong>Timneh African Grey</strong> (<em>P. timneh</em>) — slightly smaller, darker, with a maroon tail — is less common and sometimes commands a slight premium.</p><p>Prices advertised significantly below £1,500 should be treated with caution. Bargain prices often indicate undocumented birds, parent-raised (non-socialised) birds, or birds from sources where welfare standards cannot be verified.</p><div class="note-box"><strong>🔑 Remember:</strong> The purchase price is only part of the total cost. Factor in: premium cage (£400–£1,500+), avian vet care, high-quality diet (pellets and fresh food), enrichment and toys, and insurance.</div>`, faqs: [
    ['Are African Greys expensive compared to other parrots?', 'Yes — African Greys are among the more expensive medium-sized parrots, reflecting their intelligence, CITES Appendix I status, and the cost of responsible hand-raising. They are less expensive than Hyacinth Macaws but more expensive than most conures, caiques, and Pionus.'],
    ['Do CITES documents affect the price?', 'Yes. Proper CITES documentation represents real cost — export permit fees in Spain, import permit application fees in the UK, and the administrative time involved. A bird sold without proper CITES documentation is not only potentially illegal — it is a red flag about the seller\'s practices overall.'],
    ['Where can I buy an African Grey in the UK?', 'From a specialist breeder or an importer who works with registered EU breeders. All birds from Paraíso de Aves come with full CITES documentation, a veterinary health certificate, and ring identification. Contact us at paraisodeloros@gmail.com for current availability and pricing.'],
  ]},
  { slug: 'how-much-does-hyacinth-macaw-cost', q: 'How Much Does a Hyacinth Macaw Cost in the UK?', relatedSpecies: '/en/hyacinth-macaw/', relatedGuide: '/en/knowledge/macaw-guide/', intro: 'The Hyacinth Macaw is the world\'s largest parrot and one of the most expensive birds in the world. Understanding why it costs so much — and what that price includes — is essential before enquiring about purchase.', answer: `<p>Hyacinth Macaws are typically priced between <strong>£12,000 and £20,000+</strong> in the UK from reputable specialist breeders. Some exceptional birds — particularly older, exceptionally socialised individuals — may be offered at higher prices. The extraordinary cost reflects several factors:</p><ul><li><strong>CITES Appendix I status:</strong> the highest protection category, with full export and import documentation required</li><li><strong>Breeding difficulty:</strong> Hyacinths are challenging to breed in captivity; clutch sizes are small and breeding success rates are lower than more common species</li><li><strong>Rearing cost:</strong> feeding large macaw chicks multiple times daily with specialist formula; intensive hand-socialisation</li><li><strong>Length of hand-raising:</strong> Hyacinth chicks require hand-feeding for longer than smaller species</li></ul><div class="note-box"><strong>⚠️ Warning:</strong> If you see a Hyacinth Macaw advertised for significantly less than £8,000 without verifiable paperwork, treat with extreme caution. The vast majority of "cheap" Hyacinth offers are scams or involve illegally sourced birds.</div>`, faqs: [
    ['Is a Hyacinth Macaw worth the money?', 'For the right owner, absolutely. Hyacinth Macaws are extraordinary animals — intelligent, gentle, affectionate, and breathtakingly beautiful. But they require very significant ongoing investment in care, space, and time. They are not suitable as status purchases; the ongoing cost and commitment must be fully understood before buying.'],
    ['What are the ongoing costs of a Hyacinth Macaw?', 'Budget for: premium diet including palm nuts (a key Hyacinth food), large high-quality cage, specialist avian vet care, enrichment, and insurance. Annual ongoing costs can be £2,000–£5,000 depending on circumstances.'],
    ['How can I verify a Hyacinth Macaw is legally obtained?', 'Request the CITES export permit from Spain (showing our official registration number and CITES authority stamp) and the UK CITES import permit from APHA. Both documents should name the individual bird by ring or microchip number. APHA can verify UK permits; the Spanish CITES authority can verify export permits.'],
  ]},
  { slug: 'how-much-does-blue-and-yellow-macaw-cost', q: 'How Much Does a Blue-and-Yellow Macaw Cost in the UK?', relatedSpecies: '/en/blue-and-yellow-macaw/', relatedGuide: '/en/knowledge/macaw-guide/', intro: 'The Blue-and-Yellow Macaw (Ara ararauna) is one of the most popular large parrots in the UK. Its vibrant plumage, outgoing personality, and good talking ability make it a highly sought-after species, with pricing reflecting its popularity and the cost of proper documentation.', answer: `<p>Hand-raised <strong>Blue-and-Yellow Macaws from a specialist breeder</strong> in the UK typically cost between <strong>£2,500 and £5,000</strong>, depending on age, level of training, and availability. This places them at the accessible end of the large macaw price spectrum — significantly less than a Hyacinth Macaw, but still a substantial investment reflecting quality breeding and full CITES documentation.</p><p>The Blue-and-Yellow Macaw is listed on <strong>CITES Appendix II</strong> — documentation is required but the process is simpler than for Appendix I species. A UK CITES import permit is not required for Appendix II species arriving commercially from Spain.</p>`, faqs: [
    ['Are Blue-and-Yellow Macaws good value?', 'Relative to other large macaws of similar companionship quality, Blue-and-Yellows are considered reasonable value. Their personality — outgoing, playful, with reasonable talking ability — combined with their slightly lower CITES documentation complexity makes them one of the more accessible large macaw options for UK buyers.'],
    ['What should the price include?', 'At minimum: the bird, CITES documentation, an EU Animal Health Certificate, a veterinary health certificate, ring identification. Delivery is typically invoiced separately. Ask for all documentation to be provided in originals.'],
  ]},
  { slug: 'how-much-does-scarlet-macaw-cost', q: 'How Much Does a Scarlet Macaw Cost in the UK?', relatedSpecies: '/en/scarlet-macaw/', relatedGuide: '/en/knowledge/macaw-guide/', intro: 'The Scarlet Macaw is one of the most iconic birds in the world — a blaze of red, yellow, and blue that has appeared on everything from Maya carvings to modern wildlife photography. Here is what to expect price-wise in the UK.', answer: `<p>Scarlet Macaws from reputable UK breeders and importers typically cost between <strong>£2,800 and £6,000</strong> for a hand-raised, fully documented bird. The wide price range reflects age, level of training, and individual breeder positioning. Scarlet Macaws are slightly less commonly available than Blue-and-Yellow Macaws in the UK, which can push prices slightly higher when demand outstrips supply.</p><p>The Scarlet Macaw is listed on <strong>CITES Appendix I</strong>, meaning a UK CITES import permit from APHA is required. This adds time and administration to the purchase process but is entirely manageable with our guidance.</p>`, faqs: [
    ['Are Scarlet Macaws harder to keep than Blue-and-Yellow Macaws?', 'Scarlets are generally considered slightly more challenging in temperament — they can be more assertive and are often described as "hot" compared to the friendlier Blue-and-Yellow. This does not make them bad pets, but their temperament is best suited to experienced macaw owners. Excellent hand-raising from birth, as at Paraíso de Aves, significantly moderates these traits.'],
    ['Why is the Scarlet Macaw on CITES Appendix I?', 'The Scarlet Macaw has suffered significant population decline due to habitat loss and trapping for the pet trade. CITES Appendix I listing provides the highest legal protection — only captive-bred, fully documented individuals may be legally traded.'],
  ]},
  { slug: 'how-much-does-catalina-macaw-cost', q: 'How Much Does a Catalina Macaw Cost?', relatedSpecies: '/en/catalina-macaw/', relatedGuide: '/en/knowledge/macaw-guide/', intro: 'The Catalina Macaw is a hybrid between a Blue-and-Yellow and a Scarlet Macaw — each bird a unique and spectacular colour combination. Here is what to expect for pricing.', answer: `<p>Catalina Macaws typically cost between <strong>£2,500 and £5,500</strong> depending on the specific bird\'s colouration, age, and training level. Because each Catalina has a unique colour combination, particularly striking or unusual individuals may command a premium. As a hybrid, Catalina pricing is broadly in line with its parent species rather than occupying a distinct price bracket.</p>`, faqs: [
    ['Are Catalina Macaws the same price as pure-species macaws?', 'Broadly yes — Catalina pricing aligns with the parent species price range. Some buyers pay a premium for unusually coloured individuals.'],
    ['Do Catalina Macaws need CITES documents?', 'Yes. As hybrids of CITES-listed parent species, Catalinas are themselves subject to CITES documentation requirements. We provide full documentation reflecting the hybrid status and captive-bred origin of every bird we sell.'],
  ]},
  { slug: 'how-much-does-cockatoo-cost', q: 'How Much Does a Cockatoo Cost in the UK?', relatedSpecies: '/en/cockatoos/', relatedGuide: '/en/knowledge/cockatoo-guide/', intro: 'Cockatoos range considerably in price depending on species. Here is a breakdown of what different cockatoo species cost in the UK from reputable breeders.', answer: `<p>Cockatoo prices in the UK vary by species:</p><table class="specs-table"><thead><tr><th>Species</th><th>Price Range (UK)</th><th>CITES Appendix</th></tr></thead><tbody><tr><td>Moluccan (Salmon-Crested)</td><td>£2,500–£5,000</td><td>I</td></tr><tr><td>Umbrella (White) Cockatoo</td><td>£2,000–£4,000</td><td>I</td></tr><tr><td>Goffin\'s Cockatoo</td><td>£1,200–£2,500</td><td>I</td></tr><tr><td>Sulphur-Crested</td><td>£1,500–£3,000</td><td>II</td></tr></tbody></table><p>All prices are for hand-raised, fully documented birds from specialist breeders. Rescue or second-hand birds may be available at different price points but typically require significant rehabilitation investment.</p>`, faqs: [
    ['Why are cockatoos so expensive?', 'Most cockatoo species are CITES Appendix I, meaning full documentation is required. The Moluccan and Umbrella Cockatoos in particular are challenging to breed in captivity and require intensive hand-raising. These factors combine to produce relatively high purchase prices.'],
    ['Are cockatoos high-maintenance?', 'Yes — arguably the highest-maintenance parrot species. Their social needs are extreme. Budget for significantly more daily interaction time than with other species.'],
  ]},
  { slug: 'how-much-does-amazon-parrot-cost', q: 'How Much Does an Amazon Parrot Cost in the UK?', relatedSpecies: '/en/amazon-parrots/', relatedGuide: '/en/knowledge/amazon-guide/', intro: 'Amazon parrots are popular and widely bred in Europe. Here is what hand-raised, documented Amazon parrots cost from specialist breeders in the UK.', answer: `<p>Amazon parrot prices in the UK for hand-raised, documented birds:</p><table class="specs-table"><thead><tr><th>Species</th><th>Price Range</th><th>CITES</th></tr></thead><tbody><tr><td>Blue-Fronted Amazon</td><td>£900–£1,800</td><td>Appendix II</td></tr><tr><td>Yellow-Naped Amazon</td><td>£1,500–£3,000</td><td>Appendix I</td></tr><tr><td>Double Yellow-Headed Amazon</td><td>£2,000–£4,000</td><td>Appendix I</td></tr><tr><td>Orange-Winged Amazon</td><td>£700–£1,400</td><td>Appendix II</td></tr></tbody></table>`, faqs: [
    ['What is the best-value Amazon for UK buyers?', 'The Blue-Fronted Amazon and Orange-Winged Amazon are the most accessible price-wise, and both are excellent companions. The Yellow-Naped and Double Yellow-Headed command higher prices for their superior talking ability.'],
  ]},
  { slug: 'how-much-does-conure-cost', q: 'How Much Does a Conure Cost in the UK?', relatedSpecies: '/en/conures/', relatedGuide: '/en/knowledge/conure-guide/', intro: 'Conures are among the most affordable parrots from specialist breeders. Here is a breakdown of typical UK prices by species.', answer: `<p>Conure prices in the UK for hand-raised birds:</p><table class="specs-table"><thead><tr><th>Species</th><th>Price Range</th><th>Notes</th></tr></thead><tbody><tr><td>Green-Cheeked Conure</td><td>£300–£600</td><td>Most affordable; excellent first parrot</td></tr><tr><td>Sun Conure</td><td>£600–£1,200</td><td>CITES II; louder but stunning</td></tr><tr><td>Jenday Conure</td><td>£500–£900</td><td>Lively and social</td></tr><tr><td>Nanday Conure</td><td>£400–£700</td><td>Good talker for size</td></tr></tbody></table>`, faqs: [
    ['Are conures cheap parrots?', 'Relative to macaws and cockatoos, yes. But "cheap" should never mean undocumented. All conure species still require appropriate CITES documentation, and a bird sold without it is a legal and welfare risk.'],
  ]},
  { slug: 'how-long-do-macaws-live', q: 'How Long Do Macaws Live?', relatedSpecies: '/en/blue-and-yellow-macaw/', relatedGuide: '/en/knowledge/macaw-guide/', intro: 'Macaws are among the longest-lived birds in the world. Before buying a macaw, understanding their lifespan and what it means for your long-term planning is essential.', answer: `<p>Macaw lifespans in captivity with proper care:</p><table class="specs-table"><thead><tr><th>Species</th><th>Typical Lifespan</th><th>Exceptional Records</th></tr></thead><tbody><tr><td>Hyacinth Macaw</td><td>60–80 years</td><td>80+ documented</td></tr><tr><td>Blue-and-Yellow Macaw</td><td>50–70 years</td><td>80+ documented</td></tr><tr><td>Scarlet Macaw</td><td>40–60 years</td><td>75 years</td></tr><tr><td>Green-Wing Macaw</td><td>50–70 years</td><td>70+ years</td></tr><tr><td>Catalina Macaw</td><td>50–70 years</td><td>70 years</td></tr></tbody></table><p>Buying a macaw in your 30s means the bird could outlive you. This is not an exaggeration — it is a planning reality. Consider naming a bird guardian in your will and ensuring family members know how to care for the bird.</p>`, faqs: [
    ['Do macaws live longer in captivity than in the wild?', 'Generally yes, with proper care. Wild macaws face predation, habitat loss, disease, and food scarcity. Captive birds with quality diet, veterinary care, and appropriate social interaction typically outlive their wild counterparts.'],
    ['What affects macaw lifespan?', 'Diet is the most significant factor. Macaws fed a quality pellet-based diet with fresh food, given appropriate veterinary care, and provided mental stimulation consistently outlive those on poor diets. Absence of household toxins (PTFE coating, aerosols) also significantly impacts longevity.'],
  ]},
  { slug: 'how-long-do-african-greys-live', q: 'How Long Do African Grey Parrots Live?', relatedSpecies: '/en/african-grey/', relatedGuide: '/en/knowledge/african-grey-guide/', intro: 'African Greys are one of the longest-lived parrot species. This is one of the most important facts a prospective owner must understand before buying.', answer: `<p>African Grey parrots in captivity, with proper care, typically live <strong>50–70 years</strong>. Some individuals have been documented living past 80. The current oldest confirmed African Grey in captivity was reportedly in his 80s at a rescue facility.</p><p>This extraordinary lifespan means that buying an African Grey as a young adult is a lifetime commitment — potentially longer than your own. This is not a reason not to buy one; it is a reason to plan responsibly. Consider who would care for the bird if you are no longer able to, and document this in your will or estate planning.</p>`, faqs: [
    ['Do African Greys live longer than dogs?', 'Dramatically so. Most dogs live 10–15 years; an African Grey may live 60–80 years. In terms of long-term commitment, buying an African Grey is more comparable to having a child than owning a dog.'],
    ['Does diet affect African Grey lifespan?', 'Yes significantly. African Greys are prone to hypocalcaemia and Vitamin A deficiency on seed-only diets. A varied, pellet-based diet with fresh food significantly extends healthy lifespan and feather quality.'],
  ]},
  { slug: 'how-long-do-cockatoos-live', q: 'How Long Do Cockatoos Live?', relatedSpecies: '/en/cockatoos/', relatedGuide: '/en/knowledge/cockatoo-guide/', intro: 'Cockatoos are extraordinarily long-lived birds. Their lifespans are frequently underestimated by new owners, with serious consequences for long-term planning.', answer: `<p>Most large cockatoo species live <strong>40–60 years</strong> in captivity with proper care. Cookie, a Moluccan Cockatoo at Brookfield Zoo in Illinois, lived to <strong>83 years</strong> — the longest documented lifespan for any parrot. This is not a typical result but it illustrates the potential.</p><p>Sulphur-Crested Cockatoos have been documented at 70+ years. Major Mitchells (Pink) Cockatoos can similarly reach 70+ years. Even smaller cockatoos like the Goffin\'s typically live 25–35 years.</p>`, faqs: [
    ['Do cockatoos live as long as macaws?', 'Broadly comparable, with some species potentially exceeding macaw lifespans. Cookie\'s documented 83 years at Brookfield Zoo is the longest confirmed parrot lifespan on record.'],
  ]},
  { slug: 'how-long-do-conures-live', q: 'How Long Do Conures Live?', relatedSpecies: '/en/conures/', relatedGuide: '/en/knowledge/conure-guide/', intro: 'Conures live considerably longer than most people expect. Before buying a conure, understanding its lifespan is important for long-term planning.', answer: `<p>Conure lifespans by species:</p><table class="specs-table"><thead><tr><th>Species</th><th>Typical Lifespan</th></tr></thead><tbody><tr><td>Sun Conure</td><td>25–30 years</td></tr><tr><td>Jenday Conure</td><td>20–28 years</td></tr><tr><td>Green-Cheeked Conure</td><td>15–25 years</td></tr><tr><td>Nanday Conure</td><td>20–25 years</td></tr></tbody></table><p>Even a Green-Cheeked Conure, the shortest-lived common conure species, can be a 15–25 year commitment. This is a longer lifespan than most dogs and cats. Factor this into your planning before purchase.</p>`, faqs: [
    ['Do conures need a lot of veterinary care?', 'Conures should receive annual avian vet wellness checks like any parrot. They are generally hardy birds but are susceptible to a number of conditions including Proventricular Dilatation Disease and respiratory infections. Annual checks allow early detection.'],
  ]},
  { slug: 'how-long-do-amazon-parrots-live', q: 'How Long Do Amazon Parrots Live?', relatedSpecies: '/en/amazon-parrots/', relatedGuide: '/en/knowledge/amazon-guide/', intro: 'Amazon parrots are long-lived birds whose lifespan is consistently underestimated. Here is the reality.', answer: `<p>Most Amazon parrot species live <strong>40–60 years</strong> in captivity with good care. Some individuals are documented past 70. The Blue-Fronted Amazon, one of the most common species, typically lives 40–60 years; Yellow-Naped and Double Yellow-Headed Amazons have similar lifespans.</p>`, faqs: [
    ['What is the oldest Amazon parrot on record?', 'Several Amazon parrots have been documented at 70+ years, though verification of extreme ages is challenging. Parrots from the Victorian era are documented in family histories — Amazons in particular appear in historical accounts as very long-lived family companions.'],
  ]},
  { slug: 'how-long-do-caiques-live', q: 'How Long Do Caiques Live?', relatedSpecies: '/en/caiques/', relatedGuide: '/en/knowledge/caique-guide/', intro: 'Caiques are energetic, fun birds that many people assume are short-lived. The reality is considerably longer.', answer: `<p>Caiques typically live <strong>25–40 years</strong> in captivity with proper care. Some individuals have been documented past 50. This is significantly longer than most small dog breeds, and longer than many cat lifespans. A caique is a decades-long commitment.</p>`, faqs: [
    ['Are caiques healthy birds?', 'Caiques are generally considered robust, healthy birds when properly cared for. They are susceptible to feather destructive behaviour if under-stimulated, and to obesity on seed-heavy diets. Annual vet checks are recommended.'],
  ]},
  { slug: 'how-long-do-eclectus-parrots-live', q: 'How Long Do Eclectus Parrots Live?', relatedSpecies: '/en/eclectus/', relatedGuide: '/en/knowledge/eclectus-guide/', intro: 'Eclectus parrots live significantly longer than their relatively affordable price might suggest. Here is what to expect.', answer: `<p>Eclectus parrots typically live <strong>30–50 years</strong> in captivity with appropriate care. Diet is particularly impactful for Eclectus: their distinctive long digestive tract makes them sensitive to additives, and birds on quality fresh-food diets consistently outlive those on processed or seed-heavy diets. Some individuals have been documented past 60 years.</p>`, faqs: [
    ['Does diet make a big difference to Eclectus lifespan?', 'Yes — more so than for most parrot species. Eclectus have a uniquely long digestive tract and are sensitive to artificial preservatives, colourings, and high-fat diets. A fresh-food-heavy diet (fruit, vegetables, low-additive pellets) significantly supports both lifespan and feather quality.'],
  ]},
  { slug: 'do-parrots-need-cites-documents', q: 'Do Parrots Need CITES Documents?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/cites-explained/', intro: 'CITES documentation is a legal requirement for most parrot species traded internationally. This FAQ explains what CITES is, which species need documents, and what those documents look like.', answer: `<p>Yes — the overwhelming majority of parrot species are listed on the Convention on International Trade in Endangered Species (CITES), which regulates their commercial trade. The level of documentation required depends on the Appendix listing:</p><ul><li><strong>CITES Appendix I</strong> (highest protection): African Grey, Hyacinth Macaw, Moluccan Cockatoo, Scarlet Macaw, and others. Commercial import into the UK requires both an export permit from the country of origin AND a UK CITES import permit issued by APHA.</li><li><strong>CITES Appendix II</strong> (controlled trade allowed): Blue-and-Yellow Macaw, most Amazons, Green-Cheeked Conure, and others. CITES export documentation is required but no UK import permit is needed for commercial movements from the EU.</li></ul><p>At Paraíso de Aves, all birds are sold with complete, verified CITES documentation. We handle the export permits from Spain and guide you through any UK import permit requirements.</p>`, faqs: [
    ['What does a CITES certificate look like?', 'A CITES certificate is an official government document, printed on security paper, with the issuing authority\'s stamp and official signature. It includes the species name, individual identification (ring or microchip number), source code (indicating captive-bred), and the seller and buyer details. It is not a document that a breeder can produce independently — it is issued by the relevant government wildlife authority.'],
    ['What happens if I buy a parrot without CITES documents?', 'Possession of an undocumented CITES-listed parrot is a potential criminal offence under UK law. Beyond the legal risk, undocumented birds cannot be legally sold, transferred, exported, or in some cases even proven to belong to you. Always insist on proper documentation.'],
  ]},
  { slug: 'can-i-import-parrot-to-uk', q: 'Can I Import a Parrot into the UK?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/importing-parrots-uk/', intro: 'Yes — but the process requires specific documentation, and since Brexit the rules for importing parrots from EU countries (including Spain) have changed significantly. Here is what is currently required.', answer: `<p>Importing a parrot into the UK is legal and achievable with the right documentation. The key requirements since Brexit:</p><ol><li><strong>Animal Health Certificate (AHC):</strong> issued by an official veterinarian in the country of export (Spain, in our case) within a specified period before travel. Replaces the EU health certificate that previously applied within the single market.</li><li><strong>CITES import permit (for Appendix I species):</strong> must be obtained in advance from the Animal and Plant Health Agency (APHA) in the UK. This involves Form FC6050 and processing typically takes 2–8 weeks.</li><li><strong>CITES documentation (all species):</strong> the export country CITES certificate must accompany the bird.</li><li><strong>Border Control Post (BCP) inspection:</strong> commercial imports of live birds enter the UK through designated BCPs with veterinary inspection capacity.</li></ol><p>We handle all export documentation from Spain and guide you through the UK import process from start to finish.</p>`, faqs: [
    ['How long does the UK import process take?', 'From order to delivery, typically 4–10 weeks depending on APHA permit processing times and flight availability.'],
    ['Can I bring a parrot back from holiday?', 'Bringing a parrot purchased abroad as personal luggage involves a different process (personal pet movement rules rather than commercial import). However, commercial purchase from an EU breeder requires commercial import documentation regardless of how the bird travels physically.'],
  ]},
  { slug: 'can-parrots-be-delivered-to-ireland', q: 'Can Parrots Be Delivered to Ireland?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/importing-parrots-ireland/', intro: 'Yes — we deliver parrots to Ireland regularly. As an EU member state, the Republic of Ireland benefits from simpler intra-EU movement rules than the UK. Here is how the process works.', answer: `<p>Yes. Paraíso de Aves delivers parrots to the Republic of Ireland via specialist live-animal air cargo. As Ireland is an EU member state, intra-EU movement rules apply — which are considerably simpler than the post-Brexit UK rules.</p><p>For most captive-bred CITES Appendix II species, the documentation required is: an EU Animal Health Certificate issued by our Spanish official veterinarian, plus the CITES documentation for the species in question. The bird travels by air cargo from Valencia to Dublin Airport.</p><p>For CITES Appendix I species, the process involves EU CITES intra-community movement requirements, which we handle in full.</p>`, faqs: [
    ['Which Irish airports do you deliver to?', 'We deliver by air cargo to Dublin Airport (DUB) as standard. For other locations in Ireland, collection from Dublin is required, or we can discuss alternative arrangements depending on your location.'],
    ['Are CITES rules different in Ireland vs the UK?', 'Yes. Ireland, as an EU member, benefits from EU internal market rules for intra-EU movement of CITES-listed animals. The UK, post-Brexit, requires separate UK CITES import permits for Appendix I species. The Irish process is generally simpler and faster.'],
  ]},
  { slug: 'what-is-cites', q: 'What is CITES? A Guide for UK Parrot Buyers', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/cites-explained/', intro: 'CITES — the Convention on International Trade in Endangered Species — is the international treaty that regulates the trade in wildlife. For parrot buyers in the UK, it is one of the most important things to understand.', answer: `<p>CITES stands for the <strong>Convention on International Trade in Endangered Species of Wild Fauna and Flora</strong>. It is an international agreement between governments that aims to ensure that international trade in specimens of wild animals and plants does not threaten their survival. Over 180 countries are CITES signatories, including the UK, Spain, and Ireland.</p><p>CITES works by categorising species into three Appendices:</p><ul><li><strong>Appendix I:</strong> species threatened with extinction. Commercial trade is prohibited except in exceptional circumstances. For parrots, this includes the African Grey, Hyacinth Macaw, Moluccan Cockatoo, and Scarlet Macaw.</li><li><strong>Appendix II:</strong> species not currently threatened but which could be threatened if trade is not controlled. Most other traded parrot species fall here.</li><li><strong>Appendix III:</strong> species protected in at least one country. Less relevant for parrot trade.</li></ul><p>When you buy a CITES-listed parrot, you must receive appropriate documentation proving the bird was legally bred in captivity and traded in accordance with CITES requirements. This protects both the buyer and the wild population of the species.</p>`, faqs: [
    ['Does CITES apply to captive-bred parrots?', 'Yes. CITES applies to all individuals of listed species, including captive-bred ones. The documentation system distinguishes between wild-caught (illegal for most Appendix I species) and captive-bred birds using source codes on the CITES certificate.'],
    ['Who enforces CITES in the UK?', 'The Animal and Plant Health Agency (APHA) enforces CITES regulations in the UK under the Control of Trade in Endangered Species (COTES) Regulations 2018.'],
  ]},
  { slug: 'are-parrots-legal-in-uk', q: 'Are Parrots Legal to Keep in the UK?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/uk-parrot-laws/', intro: 'Keeping a parrot in the UK is entirely legal — but there are important legal requirements related to documentation, welfare, and in some cases, licensing. Here is a clear overview.', answer: `<p>Yes, keeping a parrot in the UK is legal. There is no requirement for a personal ownership licence for most parrot species. However, several legal requirements do apply:</p><ul><li><strong>CITES documentation:</strong> CITES-listed parrots must have appropriate documentation proving legal acquisition. This is a criminal matter — possession of an undocumented Appendix I parrot can be prosecuted.</li><li><strong>Animal Welfare Act 2006:</strong> all parrot owners are legally required to provide for the five welfare needs of their animals — a suitable environment, a suitable diet, ability to exhibit normal behaviour, appropriate company, and protection from pain and suffering.</li><li><strong>Selling birds:</strong> commercial sale of parrots requires a local authority licence under the 2018 animal activity licensing regulations.</li></ul>`, faqs: [
    ['Do I need a licence to own a parrot in the UK?', 'No — a personal ownership licence is not required to keep a parrot in the UK. You do need to retain valid CITES documentation for listed species, and you must comply with the Animal Welfare Act.'],
    ['Can I take my parrot abroad?', 'Yes, but this involves meeting the health and CITES requirements of both the destination country and the UK on return. Regulations vary significantly by destination. Always consult APHA and the destination country\'s wildlife authority well in advance.'],
  ]},
  { slug: 'can-parrots-travel-by-air-cargo', q: 'Can Parrots Travel by Air Cargo?', relatedSpecies: '/en/delivery/', relatedGuide: '/en/knowledge/parrot-delivery-guide/', intro: 'Air cargo is the standard method for transporting parrots internationally, including from Spain to the UK and Ireland. Here is how it works and why it is safe.', answer: `<p>Yes — air cargo is the established, standard method for transporting live parrots internationally. It is heavily regulated and, when done correctly, is a safe method of transport for healthy birds.</p><p>Key aspects of how it works:</p><ul><li><strong>IATA regulations:</strong> the International Air Transport Association publishes Live Animals Regulations (LAR) specifying crate requirements, journey time limits, temperature requirements, and handling standards for live animals by air</li><li><strong>IATA-compliant crates:</strong> birds travel in purpose-built crates with adequate ventilation, a non-slip floor, and space appropriate to the species and size of bird</li><li><strong>Animal holding facilities:</strong> major airports have temperature-controlled animal holding facilities for transit birds</li><li><strong>Specialist handling agents:</strong> we work with specialist live-animal freight agents who understand psittacine requirements</li></ul>`, faqs: [
    ['Is air cargo stressful for parrots?', 'Some stress is inevitable with any transport, but healthy, well-prepared birds handle it well. Hand-raised birds acclimated to their travel crate prior to travel show significantly less stress behaviour than poorly prepared individuals.'],
    ['Which airlines carry live parrots to the UK?', 'Several airlines carry live animals in cargo, including Iberia, British Airways World Cargo, and Lufthansa Cargo. The specific airline depends on routing and availability. We select the most appropriate and reliable option for each delivery.'],
  ]},
  { slug: 'how-long-does-delivery-take', q: 'How Long Does Parrot Delivery Take from Spain to the UK?', relatedSpecies: '/en/delivery/', relatedGuide: '/en/knowledge/parrot-delivery-guide/', intro: 'From placing an order to the bird arriving at a UK airport, the process takes several weeks. Here is what the timeline looks like.', answer: `<p>The typical timeline from order to delivery:</p><table class="specs-table"><thead><tr><th>Stage</th><th>Approximate Time</th></tr></thead><tbody><tr><td>Order confirmed &amp; documentation begins</td><td>Week 1</td></tr><tr><td>Spanish CITES export permit application</td><td>2–4 weeks</td></tr><tr><td>UK CITES import permit (Appendix I species)</td><td>2–8 weeks</td></tr><tr><td>EU Animal Health Certificate (issued close to travel)</td><td>Within 10 days of travel</td></tr><tr><td>Flight booking &amp; travel</td><td>1–3 days</td></tr><tr><td>Border Control Post inspection on arrival</td><td>1–4 hours on day of arrival</td></tr></tbody></table><p>Total from order to collection: typically <strong>4–10 weeks</strong> depending on APHA processing times and flight availability. For Ireland, the process is typically faster (3–6 weeks) as no UK import permit is required for EU movement.</p>`, faqs: [
    ['Can delivery be expedited?', 'For Appendix II species to Ireland, timelines can be faster. For UK Appendix I species, the APHA permit processing time is the main variable — we cannot control government processing times, though we ensure our applications are complete and correct to minimise delays.'],
  ]},
  { slug: 'what-cage-should-i-buy', q: 'What Cage Should I Buy for My Parrot?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-cage-guide/', intro: 'Choosing the right cage is one of the most important decisions a parrot owner makes. The wrong cage — too small, unsafe materials, wrong bar spacing — directly impacts your bird\'s health and wellbeing.', answer: `<p>The right cage depends on the species. Key principles that apply to all:</p><ul><li><strong>Bigger is always better:</strong> if in doubt between two sizes, choose the larger</li><li><strong>Bar spacing must match species size:</strong> bars too wide risk head entrapment; too narrow limits movement</li><li><strong>Safe materials:</strong> powder-coated stainless steel is standard; avoid zinc, lead, or brass</li><li><strong>Door size:</strong> the bird must be able to enter and exit comfortably</li><li><strong>Accessibility:</strong> you need to be able to reach all areas for cleaning</li></ul><p>For specific minimum cage dimensions by species, see our <a href="/en/knowledge/parrot-cage-guide/">Parrot Cage Guide</a>.</p>`, faqs: [
    ['What are the best parrot cage brands in the UK?', 'Well-regarded brands available in the UK include Liberta, HQ, Prevue, and Ferplast. For very large macaws, custom or commercial aviary-quality cages from specialist suppliers are often necessary.'],
    ['Do I need a play stand as well as a cage?', 'A play stand (T-stand or play top) for out-of-cage time is highly recommended. It gives the bird a designated space during its daily free-flying time and prevents it from chewing the furniture.'],
  ]},
  { slug: 'how-big-a-cage-for-macaw', q: 'What Size Cage Does a Macaw Need?', relatedSpecies: '/en/blue-and-yellow-macaw/', relatedGuide: '/en/knowledge/parrot-cage-guide/', intro: 'Macaws are large, active birds that need large, robust cages. Undersized cages are one of the most common welfare problems in macaw keeping. Here is a clear guide to minimum and recommended sizes.', answer: `<p>Macaw cage minimums:</p><table class="specs-table"><thead><tr><th>Species</th><th>Minimum (W×D×H)</th><th>Recommended</th></tr></thead><tbody><tr><td>Blue-and-Yellow / Scarlet / Green-Wing</td><td>120×80×150 cm</td><td>150×90×180 cm</td></tr><tr><td>Hyacinth Macaw</td><td>150×90×180 cm</td><td>200×100×200 cm</td></tr><tr><td>Catalina Macaw</td><td>120×80×150 cm</td><td>150×90×180 cm</td></tr></tbody></table><p>Macaws should be able to fully spread both wings simultaneously without touching the cage walls. Many macaw-specific cages available in the UK are borderline on this requirement for the largest species — always measure before buying.</p>`, faqs: [
    ['Can a macaw cage be too big?', 'Almost never, provided bar spacing is appropriate (2.5–3.5 cm for large macaws). The larger the cage, the better. If space allows, a purpose-built aviary section is ideal for macaws.'],
  ]},
  { slug: 'how-big-a-cage-for-african-grey', q: 'What Size Cage Does an African Grey Need?', relatedSpecies: '/en/african-grey/', relatedGuide: '/en/knowledge/parrot-cage-guide/', intro: 'African Greys are active, intelligent birds that need a cage large enough to accommodate climbing, playing, and movement. Here is the correct sizing guidance.', answer: `<p>Minimum cage for an African Grey: <strong>90×60×120 cm (W×D×H)</strong>. Recommended: <strong>120×75×150 cm or larger</strong>.</p><p>Key considerations:</p><ul><li>Bar spacing: 2.0–2.5 cm</li><li>The cage should accommodate at least 3–4 perches at different heights</li><li>A separate play top or T-stand for out-of-cage time is strongly recommended</li><li>The cage must be stable and heavy enough that the bird cannot tip it</li></ul>`, faqs: [
    ['How many hours a day should an African Grey be out of its cage?', 'A minimum of 3–4 hours of supervised out-of-cage time daily is recommended for African Greys. This can be spread across multiple shorter sessions.'],
  ]},
  { slug: 'how-much-do-parrots-eat', q: 'How Much Do Parrots Eat?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-diet-guide/', intro: 'Parrot food consumption varies significantly by species size. Here is practical guidance on quantities and feeding frequency.', answer: `<p>Daily food volumes by species size (approximate, adjust based on individual and body condition):</p><table class="specs-table"><thead><tr><th>Category</th><th>Pellets/Day</th><th>Fresh Food/Day</th></tr></thead><tbody><tr><td>Small (Conure, Caique)</td><td>30–50g</td><td>1–2 tablespoons</td></tr><tr><td>Medium (African Grey, Amazon)</td><td>50–80g</td><td>2–4 tablespoons</td></tr><tr><td>Large (most Macaws)</td><td>80–150g</td><td>4–8 tablespoons</td></tr><tr><td>Extra Large (Hyacinth Macaw)</td><td>100–180g</td><td>6–10 tablespoons</td></tr></tbody></table><p>Fresh food should be offered twice daily and removed after 2–4 hours to prevent spoilage. Pellets can be available continuously or in measured portions depending on the individual bird's tendency toward obesity.</p>`, faqs: [
    ['Do parrots overeat?', 'Some species and individuals are prone to obesity, particularly Amazons on high-seed or high-fat diets. Monitoring body weight (weigh weekly using kitchen scales) and body condition (feel the keel bone — it should be gently palpable but not protruding) helps catch weight changes early.'],
    ['How often should I feed my parrot?', 'Fresh food twice daily; pellets available continuously (or in measured portions for obesity-prone birds); water changed twice daily minimum.'],
  ]},
  { slug: 'what-do-parrots-eat', q: 'What Do Parrots Eat? Complete Parrot Diet Guide', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-diet-guide/', intro: 'A balanced parrot diet is built on a foundation of quality pellets, supplemented with fresh vegetables, fruit, and minimal seeds. This FAQ covers the essentials.', answer: `<p>The ideal parrot diet consists of:</p><ul><li><strong>High-quality pellets (50–60%):</strong> Harrison's, Roudybush, Zupreem Natural — the dietary foundation. Pellets provide balanced nutrition that seeds cannot.</li><li><strong>Fresh vegetables (25–30%):</strong> dark leafy greens (kale, chard, broccoli), sweet pepper, carrot, courgette, sweetcorn — offer variety and rotate regularly</li><li><strong>Fresh fruit (10%):</strong> apple, mango, pomegranate, berries, pear — offer in moderation due to sugar content</li><li><strong>Seeds and nuts (5–10%):</strong> treat foods only; sunflower seeds sparingly; walnuts, almonds, pine nuts as occasional rewards</li></ul><p>Avoid: avocado, chocolate, caffeine, onion, garlic, alcohol, and apple or pear seeds.</p>`, faqs: [
    ['Can parrots eat cooked food?', 'Yes — cooked legumes (beans, lentils), brown rice, quinoa, and small amounts of cooked egg are nutritious additions. Avoid fried, salted, or heavily seasoned food.'],
    ['Should parrots eat seeds?', 'Seeds can be part of a varied diet but should not form the bulk of it. A seed-only diet leads to nutritional deficiencies — it is high in fat and low in Vitamins A, D, and calcium.'],
  ]},
  { slug: 'can-parrots-eat-fruit', q: 'Can Parrots Eat Fruit? Safe Fruits Guide', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-diet-guide/', intro: 'Fruit is a natural part of many parrots\' wild diets — but not all fruits are safe, and portion control matters. Here is what you need to know.', answer: `<p>Most fruits are safe and nutritious for parrots in moderation. Good choices include:</p><ul><li>Apple (flesh only — avoid seeds which contain cyanide compounds)</li><li>Mango — particularly good; high in Vitamin A</li><li>Pomegranate — excellent antioxidant value; well-loved by most species</li><li>Berries (strawberry, blueberry, raspberry) — high in antioxidants</li><li>Papaya — good for digestive health</li><li>Pear (flesh only, not seeds)</li><li>Orange and other citrus — in moderation</li><li>Banana — nutritious but high in sugar; limit quantity</li></ul><p><strong>Avoid:</strong> avocado (toxic — all parts including flesh, skin, and pit contain persin). Also avoid anything from the allium family (onion, garlic) and rhubarb.</p>`, faqs: [
    ['Can parrots eat grapes?', 'Yes — grapes are generally safe for parrots in moderation, unlike for dogs (where grapes can cause kidney failure). Seedless varieties are preferable, and wash well to remove pesticides.'],
    ['Can parrots eat dried fruit?', 'Unsulphured dried fruit can be offered occasionally as a treat, but it is very high in sugar and often high in preservatives. Fresh fruit is significantly preferable for regular feeding.'],
  ]},
  { slug: 'what-foods-are-toxic-to-parrots', q: 'What Foods Are Toxic to Parrots?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-diet-guide/', intro: 'Several common household foods are highly toxic to parrots. Knowing what to avoid can literally save your bird\'s life.', answer: `<p>The following foods are toxic to parrots and must never be given:</p><table class="specs-table"><thead><tr><th>Food</th><th>Toxic Component</th><th>Risk Level</th></tr></thead><tbody><tr><td>Avocado</td><td>Persin (in all parts)</td><td>⚠️ Fatal</td></tr><tr><td>Chocolate</td><td>Theobromine &amp; caffeine</td><td>⚠️ Fatal in quantity</td></tr><tr><td>Caffeine (coffee, tea)</td><td>Caffeine</td><td>⚠️ Serious</td></tr><tr><td>Onion &amp; garlic</td><td>Thiosulphate</td><td>⚠️ Serious</td></tr><tr><td>Alcohol</td><td>Ethanol</td><td>⚠️ Fatal in small amounts</td></tr><tr><td>Apple/pear seeds</td><td>Cyanogenic compounds</td><td>⚠️ Serious</td></tr><tr><td>Rhubarb</td><td>Oxalic acid</td><td>⚠️ Serious</td></tr><tr><td>Salt (in large amounts)</td><td>Sodium toxicity</td><td>Moderate</td></tr><tr><td>Raw onion</td><td>Thiosulphate</td><td>⚠️ Serious</td></tr></tbody></table>`, faqs: [
    ['What should I do if my parrot ate something toxic?', 'Contact your avian vet immediately. Do not wait for symptoms to appear — avocado toxicity, for example, can cause cardiac arrest within 1–3 days of ingestion, and early treatment significantly improves outcomes.'],
    ['Are house plants toxic to parrots?', 'Many common house plants are toxic to parrots. Known toxic plants include philodendron, dieffenbachia, oleander, mistletoe, azalea, and poinsettia. If you have a bird with access to house plants, verify each plant\'s safety or remove them.'],
  ]},
  { slug: 'how-intelligent-are-african-greys', q: 'How Intelligent Are African Grey Parrots?', relatedSpecies: '/en/african-grey/', relatedGuide: '/en/knowledge/african-grey-guide/', intro: 'The African Grey\'s intelligence is scientifically documented and consistently described as among the greatest in the animal kingdom. Here is what the research says.', answer: `<p>The <strong>African Grey parrot</strong> is widely regarded by cognitive scientists as the most intelligent non-human animal for cognitive tasks involving language, concept formation, and reasoning. The most extensively studied individual was <strong>Alex</strong>, a Congo African Grey worked with by Dr Irene Pepperberg at Harvard and Brandeis Universities from 1977 until his death in 2007.</p><p>Alex demonstrated the ability to:</p><ul><li>Identify objects by material, colour, shape, and quantity</li><li>Understand the concept of zero (absence)</li><li>Combine nouns and adjectives to describe novel objects ("banerry" — his coined word for apple, which he described as "banerry" combining banana and cherry colours)</li><li>Use language contextually — including saying "I'm sorry" in appropriate social situations</li><li>Count to six and understand numerical relationships</li></ul><p>These are cognitive abilities once attributed exclusively to great apes and young children. Alex routinely performed at the level of a 5–6 year old child on certain cognitive tasks.</p>`, faqs: [
    ['Are African Greys smarter than dogs?', 'In different ways, yes. On language comprehension and concept formation tasks, African Greys significantly outperform dogs. Dogs exceed parrots on certain social cognition tasks (reading human social cues). Intelligence is multi-dimensional.'],
    ['Does this mean African Greys are easy pets?', 'Counterintuitively, high intelligence makes African Greys more challenging, not easier. Their ability to perceive inconsistency, remember negative experiences, and require complex mental stimulation means their care needs are substantial.'],
  ]},
  { slug: 'can-macaws-live-with-children', q: 'Can Macaws Live with Children?', relatedSpecies: '/en/blue-and-yellow-macaw/', relatedGuide: '/en/knowledge/parrots-with-children/', intro: 'Macaws and children can coexist in the same household — but the size of a macaw and the power of its beak means thoughtful management is essential. Here is an honest assessment.', answer: `<p>Yes — macaws can live successfully in homes with children, and many do. However, several factors determine how successful this is:</p><ul><li><strong>Species:</strong> Blue-and-Yellow and Green-Wing Macaws are generally the most tolerant of busy, unpredictable family environments. Scarlet Macaws can be more assertive.</li><li><strong>Hand-raising:</strong> a hand-raised, well-socialised macaw that was socialised with children from a young age is far better prepared for family life than a parent-raised or poorly socialised bird.</li><li><strong>Age of children:</strong> children under 7–8 should not interact with large macaws without very close adult supervision. A macaw bite can cause serious injury, and children cannot reliably read avian body language.</li><li><strong>Training:</strong> a macaw with solid step-up training and consistent handling by all family members is significantly more manageable than an untrained bird.</li></ul>`, faqs: [
    ['At what age can children handle a macaw?', 'Around 10+ for large macaws with close adult supervision and proper handling instruction. Younger children should observe rather than handle.'],
    ['What is the most family-friendly macaw?', 'The Blue-and-Yellow Macaw and Green-Wing Macaw are most commonly described as the most tolerant and adaptable species for family environments with children.'],
  ]},
  { slug: 'do-parrots-bite', q: 'Do Parrots Bite? Understanding Parrot Biting Behaviour', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-aggression-guide/', intro: 'Yes, parrots can and do bite — but biting is always a communication, and understanding what drives it is the key to managing and reducing it.', answer: `<p>Yes, parrots bite. Even the most well-socialised, hand-raised parrot may bite in certain circumstances. Understanding why is essential for any parrot owner.</p><p>Common causes:</p><ul><li><strong>Fear</strong> — the most frequent cause; the bird feels threatened</li><li><strong>Over-stimulation</strong> — the bird has been petted or handled past its tolerance threshold</li><li><strong>Hormonal behaviour</strong> — seasonal breeding behaviour can make even gentle birds nippy</li><li><strong>Territorial behaviour</strong> — near the cage entrance is a common trigger</li><li><strong>Pain or illness</strong> — a bird that is hurting may bite when touched</li><li><strong>Testing</strong> — young birds may mouth or nip during the exploration phase</li></ul><p>The good news: biting behaviour can be significantly reduced through consistent positive reinforcement training, learning to read body language, and addressing root causes.</p>`, faqs: [
    ['How hard do parrots bite?', 'It depends entirely on species. A Green-Cheeked Conure bite stings; an African Grey bite can break skin; a Hyacinth Macaw bite (theoretically capable of cracking a coconut) can cause serious injury if the bird is genuinely defensive. Well-socialised hand-raised birds rarely bite at full force.'],
    ['Can parrot bites cause infection?', 'Yes — parrot beaks carry bacteria and any bite that breaks skin should be washed thoroughly with soap and water. Seek medical attention for deep bites or any signs of infection.'],
  ]},
  { slug: 'how-to-tame-a-parrot', q: 'How to Tame a Parrot', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-bonding/', intro: 'Taming a parrot — whether a new hand-raised bird or a less socialised adult — requires patience, consistency, and understanding of how parrots learn. Here is a practical guide.', answer: `<p>Taming a parrot is a process of building trust, not forcing compliance. Key steps:</p><ol><li><strong>Allow settling time:</strong> give a new bird 1–2 weeks to adjust to its environment before pushing for handling</li><li><strong>Establish presence:</strong> sit near the cage daily, speak softly, make eye contact without staring (which reads as a predatory threat)</li><li><strong>Hand desensitisation:</strong> place your hand near the cage bars without attempting to touch the bird. Let the bird approach your hand at its own pace.</li><li><strong>Treat association:</strong> offer high-value treats through the cage bars to associate your hand with positive experience</li><li><strong>Step-up practice:</strong> once the bird will take treats from your hand without retreating, practice the step-up command inside the cage, rewarding every success</li><li><strong>Out-of-cage time:</strong> begin short, supervised out-of-cage sessions once step-up is reliable</li></ol><p>With a well-socialised hand-raised bird, this process may take days to a couple of weeks. With a less socialised adult, it may take months. The timeline is determined by the bird, not by your impatience.</p>`, faqs: [
    ['Can a wild-caught parrot be tamed?', 'A wild-caught parrot can be worked with, but the process is far more challenging and time-consuming than with a captive-bred, hand-raised bird. Wild-caught birds carry deep predator wariness responses that must be addressed before any taming work can begin.'],
  ]},
  { slug: 'how-to-teach-parrot-to-talk', q: 'How to Teach a Parrot to Talk', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-training/', intro: 'Teaching a parrot to talk is one of the most rewarding aspects of parrot ownership — but it requires patience, consistency, and the right approach. Here is what actually works.', answer: `<p>Not all parrots will talk, but species like African Greys, Amazons, and some macaws are capable of impressive vocabulary development with the right input. Key principles:</p><ul><li><strong>Repetition in context:</strong> say words in the context where you want the bird to use them. "Hello" when greeting, "bye bye" when leaving, "want a treat" before giving food.</li><li><strong>Clear, consistent articulation:</strong> speak slowly and clearly; the bird is learning the pattern of sounds, not random noise</li><li><strong>Reward attempts:</strong> any vocalisation that resembles the target word deserves enthusiastic positive reinforcement — even an imperfect attempt is a step forward</li><li><strong>Avoid baby talk:</strong> clear adult articulation produces clearer talking birds</li><li><strong>One word at a time:</strong> master one word before introducing the next</li><li><strong>Age:</strong> younger birds (6 months – 3 years) are typically the fastest learners; older birds can learn but progress is slower</li></ul>`, faqs: [
    ['Which parrot is the best talker?', 'African Greys are consistently rated the most proficient talkers, particularly for contextual language use. Yellow-Naped Amazons and Double Yellow-Headed Amazons are the best talking Amazons. Indian Ringnecks (not a species we breed) are also noted for clarity.'],
    ['How long does it take to teach a parrot to talk?', 'The first recognisable word typically emerges after weeks to months of consistent input. Vocabulary development accelerates once the bird produces its first words — the process becomes self-reinforcing as the bird discovers that certain sounds generate responses from its human flock.'],
  ]},
  { slug: 'can-parrots-be-left-alone', q: 'Can Parrots Be Left Alone During the Day?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-bonding/', intro: 'Most parrot species are highly social and do not cope well with extended periods of isolation. Here is honest guidance on what different species can manage.', answer: `<p>All parrots are social animals that experience stress when left alone for extended periods. However, individual species and individuals vary significantly in how much alone time they can handle without welfare impact:</p><table class="specs-table"><thead><tr><th>Species</th><th>Alone Tolerance</th><th>Notes</th></tr></thead><tbody><tr><td>Cockatoo</td><td>Low (2–3 hours)</td><td>Most needy; screaming if left longer</td></tr><tr><td>African Grey</td><td>Moderate (4 hours)</td><td>Sensitive; enrichment essential</td></tr><tr><td>Amazon</td><td>Moderate (4–6 hours)</td><td>More independent than cockatoos</td></tr><tr><td>Macaw</td><td>Moderate (4–6 hours)</td><td>Needs enrichment; depends on individual</td></tr><tr><td>Caique</td><td>Moderate (4–5 hours)</td><td>Entertaining themselves if enriched</td></tr><tr><td>Conure</td><td>Moderate (4–6 hours)</td><td>Green-Cheeks more independent</td></tr><tr><td>Pionus</td><td>Better (5–7 hours)</td><td>More independent by species temperament</td></tr></tbody></table>`, faqs: [
    ['What should I do if I work full time?', 'If you work full time and cannot arrange for someone to interact with your bird for several hours daily, a cockatoo is not an appropriate choice. For more independent species like Pionus, Amazons, or conures, working full time is more manageable — particularly if you can provide significant before-work and evening interaction and high-quality enrichment.'],
    ['Would a second parrot help?', 'A same-species companion can significantly reduce stress for a parrot left alone. However, introducing a second bird requires careful management and is not a simple solution — some species do not pair well, and there are risks of disease transmission and territorial behaviour.'],
  ]},
  { slug: 'do-parrots-need-a-companion', q: 'Do Parrots Need a Companion?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-bonding/', intro: 'Parrots are flock animals. Does this mean they need a companion bird, or can a close human relationship fulfil their social needs?', answer: `<p>The question of whether parrots need a companion bird is nuanced. In the wild, all parrot species live in flocks of varying sizes — they are fundamentally social animals. In captivity, the human family can partially substitute for a flock, but the extent to which this is sufficient depends on:</p><ul><li><strong>Species:</strong> highly social species like cockatoos have significantly greater social needs than more independent species like Pionus</li><li><strong>Daily interaction time:</strong> a parrot receiving 4–6 hours of genuine daily interaction is better placed to thrive without an avian companion than one receiving 30 minutes</li><li><strong>Individual personality:</strong> some birds are more self-sufficient than others</li></ul><p>A lone parrot can thrive with a sufficiently attentive human family. However, if your lifestyle means the bird will spend significant time alone, a same-species companion genuinely improves quality of life for most species.</p>`, faqs: [
    ['Can I keep different parrot species together?', 'Different species can coexist in the same household but should generally not share a cage unless very carefully managed. Species size differences (small and large parrots), dietary differences, and species-specific behaviours make mixed-cage keeping risky.'],
  ]},
  { slug: 'are-african-greys-good-for-beginners', q: 'Are African Grey Parrots Good for Beginners?', relatedSpecies: '/en/african-grey/', relatedGuide: '/en/knowledge/african-grey-guide/', intro: 'African Greys are extraordinary birds. They are also among the most emotionally complex and demanding parrots to keep well. Here is an honest assessment of whether they are appropriate for first-time owners.', answer: `<p>Honestly — <strong>African Greys are not ideal for first-time parrot owners</strong>, and most experienced aviculturists would advise building experience with a less demanding species first.</p><p>This is not because they are dangerous or unmanageable, but because:</p><ul><li>Their emotional sensitivity means their wellbeing is easily impacted by changes in routine, household tension, or inadequate stimulation — in ways that less intelligent species simply don't respond to</li><li>Their biting — if it develops — can be serious</li><li>They are long-lived (50–70 years) and will outlive many life changes that require the owner to adapt</li><li>Their complex psychological needs (anti-anxiety, mental stimulation, social bonding) require an owner who has read extensively and ideally has some practical experience</li></ul><p>That said, a first-time owner who has <em>thoroughly</em> researched the species, ideally spent time with African Greys before purchase, and is genuinely prepared for the long-term commitment, can make an excellent Grey owner from the start.</p>`, faqs: [
    ['What should a first-time parrot owner start with instead?', 'Green-Cheeked Conure, Pionus (Maximilian\'s or Blue-Headed), or Caique are typically recommended as stepping stones before progressing to an African Grey. They give you practical experience of parrot body language, training, and care without the level of complexity a Grey introduces.'],
  ]},
  { slug: 'are-cockatoos-good-pets', q: 'Are Cockatoos Good Pets?', relatedSpecies: '/en/cockatoos/', relatedGuide: '/en/knowledge/cockatoo-guide/', intro: 'Cockatoos are among the most affectionate birds in the world. They are also among the most demanding. Here is a balanced view of whether a cockatoo is right for you.', answer: `<p>Cockatoos are extraordinary pets for the <em>right owner</em> — and genuinely problematic pets for everyone else. The key question is whether your lifestyle and household can meet their intense social needs.</p><p><strong>Cockatoos are wonderful if:</strong></p><ul><li>Someone is home most of the day</li><li>You actively want a bird that is physically affectionate and emotionally expressive</li><li>You can provide 4+ hours of daily direct interaction</li><li>Your living situation can accommodate significant noise</li><li>You are prepared for a 40–80 year commitment</li></ul><p><strong>Cockatoos are a poor choice if:</strong></p><ul><li>You work full time and no one is home during the day</li><li>You want a pet that is relatively self-sufficient</li><li>You live in a flat or noise-sensitive building</li><li>You have not previously owned a large parrot</li></ul>`, faqs: [
    ['What is the best pet cockatoo species?', 'The Umbrella (White) Cockatoo is often cited as the most manageable large cockatoo for experienced owners. The Goffin\'s Cockatoo is recommended for those wanting a less intense but still engaging species.'],
  ]},
  { slug: 'are-conures-noisy', q: 'Are Conures Noisy?', relatedSpecies: '/en/conures/', relatedGuide: '/en/knowledge/conure-guide/', intro: 'Conure noise levels vary significantly by species. Here is an honest breakdown by species to help you choose the right conure for your living situation.', answer: `<p>Yes and no — it depends entirely on the species:</p><p><strong>Very loud conures:</strong></p><ul><li><strong>Sun Conure</strong> — very loud; their contact call is sharp, penetrating, and frequent. Not suitable for flats or semi-detached houses unless neighbours are tolerant.</li><li><strong>Jenday Conure</strong> — similar to Sun Conure; loud contact calls.</li></ul><p><strong>Moderate:</strong></p><ul><li><strong>Nanday Conure</strong> — loud contact call but generally less frequent</li></ul><p><strong>Quieter conures:</strong></p><ul><li><strong>Green-Cheeked Conure</strong> — the quietest commonly available conure; chirps and chatters but does not produce sustained loud screaming. Suitable for most flat and semi-detached living.</li></ul>`, faqs: [
    ['Can you have a conure in a flat?', 'A Green-Cheeked Conure can work in a flat if neighbours are not immediately adjacent (or are tolerant). Sun Conures and Jenday Conures are not suitable for flat living in most cases.'],
  ]},
  { slug: 'do-amazon-parrots-talk', q: 'Do Amazon Parrots Talk?', relatedSpecies: '/en/amazon-parrots/', relatedGuide: '/en/knowledge/amazon-guide/', intro: 'Amazon parrots are among the best-known talking birds. Here is an honest assessment of talking ability by species and what to realistically expect.', answer: `<p>Yes — Amazons are among the best-talking parrot genera. But ability varies significantly by species:</p><table class="specs-table"><thead><tr><th>Species</th><th>Talking Ability</th><th>Notes</th></tr></thead><tbody><tr><td>Yellow-Naped Amazon</td><td>⭐⭐⭐⭐⭐</td><td>Best-talking Amazon; opera-quality song-like speech</td></tr><tr><td>Double Yellow-Headed</td><td>⭐⭐⭐⭐⭐</td><td>Exceptional vocabulary; dramatic speech style</td></tr><tr><td>Blue-Fronted Amazon</td><td>⭐⭐⭐⭐</td><td>Good talker; clear vocabulary</td></tr><tr><td>Orange-Winged Amazon</td><td>⭐⭐⭐</td><td>Moderate; good with consistent input</td></tr></tbody></table>`, faqs: [
    ['Do female Amazons talk as well as males?', 'Yes — unlike some bird species, both sexes of Amazon are equally capable of learning to talk. Sex is not a reliable predictor of talking ability in parrots.'],
  ]},
  { slug: 'do-eclectus-parrots-talk', q: 'Do Eclectus Parrots Talk?', relatedSpecies: '/en/eclectus/', relatedGuide: '/en/knowledge/eclectus-guide/', intro: 'Eclectus parrots have a reputation as good talkers, but their style differs from Amazon or African Grey speech. Here is what to expect.', answer: `<p>Yes — Eclectus parrots are considered good to very good talkers, particularly males. Their speech tends to be clear and somewhat deliberate, and they often repeat phrases in appropriate contexts. Unlike Amazons, who can be very expressive, Eclectus tend to have a more measured vocalisation style.</p><p>Females vocalise differently — often more tonally, with louder contact calls — and may be less inclined to mimic human speech than males, though individual variation is significant.</p>`, faqs: [
    ['Are Eclectus better talkers than African Greys?', 'African Greys are generally considered superior in vocabulary size and contextual language use. Eclectus are good talkers but do not typically develop the same depth of vocabulary or contextual application as a well-stimulated Grey.'],
  ]},
  { slug: 'why-are-hyacinth-macaws-expensive', q: 'Why Are Hyacinth Macaws So Expensive?', relatedSpecies: '/en/hyacinth-macaw/', relatedGuide: '/en/knowledge/hyacinth-macaw-guide/', intro: 'The Hyacinth Macaw\'s extraordinary price is the result of several converging factors — not simply a supply and demand game. Here is a full explanation.', answer: `<p>Hyacinth Macaws are expensive for genuine reasons that any serious buyer should understand:</p><ol><li><strong>CITES Appendix I status:</strong> the highest protection category. Every bird requires an official export permit from Brazil\'s IBAMA (in the case of Brazilian-origin bloodlines) and/or Spanish CITES authorities, plus a UK CITES import permit — significant cost and complexity.</li><li><strong>Breeding difficulty:</strong> Hyacinths are challenging to breed in captivity. Clutch sizes are small (1–2 eggs), incubation requirements are precise, and chick mortality is higher than in more common species. Successful clutches are not guaranteed even in well-managed aviaries.</li><li><strong>Length and cost of hand-raising:</strong> Hyacinth chicks require intensive hand-feeding for longer than smaller species. The ratio of staff time to birds produced is high.</li><li><strong>Feed costs:</strong> palm nuts — a critical component of the Hyacinth\'s diet — are expensive and must be sourced responsibly.</li><li><strong>The bird itself:</strong> 100 cm of cobalt blue magnificence with a 60–80 year lifespan, an extraordinary temperament, and unmatched visual presence. The intrinsic value is real.</li></ol>`, faqs: [
    ['Are there cheaper Hyacinth Macaws available?', 'Occasionally — rescue birds, adult birds rehomed by owners, or birds from different breeding backgrounds may be available at lower prices. However, extremely low prices for Hyacinth Macaws are a significant red flag for fraud, illegal sourcing, or welfare problems.'],
  ]},
  { slug: 'how-big-do-macaws-get', q: 'How Big Do Macaws Get?', relatedSpecies: '/en/blue-and-yellow-macaw/', relatedGuide: '/en/knowledge/large-parrots/', intro: 'Macaws range dramatically in size from the large Blue-and-Yellow to the extraordinary Hyacinth. Here is a complete size guide.', answer: `<table class="specs-table"><thead><tr><th>Species</th><th>Length (beak–tail)</th><th>Weight</th><th>Wingspan</th></tr></thead><tbody><tr><td>Hyacinth Macaw</td><td>~100 cm</td><td>1.2–1.7 kg</td><td>Up to 130 cm</td></tr><tr><td>Green-Wing Macaw</td><td>~90 cm</td><td>1.0–1.7 kg</td><td>~125 cm</td></tr><tr><td>Blue-and-Yellow Macaw</td><td>~86 cm</td><td>0.9–1.3 kg</td><td>~102 cm</td></tr><tr><td>Scarlet Macaw</td><td>~81 cm</td><td>0.9–1.1 kg</td><td>~101 cm</td></tr><tr><td>Catalina Macaw</td><td>~85 cm</td><td>0.9–1.3 kg</td><td>~102 cm</td></tr></tbody></table>`, faqs: [
    ['Is there a small macaw?', 'Mini macaws (Hahn\'s, Noble, Severe) are significantly smaller — typically 30–50 cm. We currently breed and offer the large macaw species listed above.'],
  ]},
  { slug: 'what-vaccinations-do-parrots-need', q: 'What Vaccinations Do Parrots Need in the UK?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-health-guide/', intro: 'Unlike dogs and cats, parrot vaccination programmes are limited in the UK. Here is what is available and what your avian vet may recommend.', answer: `<p>Unlike dogs and cats, there are no routine annual vaccination schedules for most pet parrots in the UK. The limited vaccines available include:</p><ul><li><strong>Newcastle Disease vaccine:</strong> available for certain avian species in the UK; some avian vets recommend this for psittacines that may be exposed at bird fairs or exhibitions</li><li><strong>No routine PBFD vaccine:</strong> despite research interest, no commercial Psittacine Beak and Feather Disease vaccine is currently available for routine clinical use in the UK</li><li><strong>No routine Psittacosis (Chlamydophila) vaccine:</strong> treatment rather than prevention is the current standard</li></ul><p>Your avian vet is the best source of advice on any vaccination options relevant to your bird\'s species and lifestyle.</p>`, faqs: [
    ['Does my parrot need any health treatments on arrival?', 'We recommend a veterinary check within 72 hours of arrival. Your vet may recommend a Chlamydophila (psittacosis) test, faecal parasite screen, and baseline blood work depending on species and age. All birds from Paraíso de Aves are health-checked prior to departure.'],
  ]},
  { slug: 'do-parrots-get-sick-easily', q: 'Do Parrots Get Sick Easily?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-health-guide/', intro: 'Healthy, well-cared-for parrots are generally hardy birds. However, their tendency to hide illness means problems can escalate quickly when they do occur. Here is what owners need to know.', answer: `<p>Healthy parrots on appropriate diets, in clean environments, with regular veterinary care do not get sick frequently. However, several features of avian physiology make illness more serious when it occurs:</p><ul><li><strong>Rapid metabolism:</strong> birds have a faster metabolic rate than mammals; illness progresses faster and deterioration can be rapid</li><li><strong>Prey species instinct:</strong> parrots instinctively hide illness signs (sick animals in the wild attract predators); by the time obvious symptoms appear, the bird may be seriously ill</li><li><strong>Specialist care requirement:</strong> most veterinary illnesses in parrots require avian specialist care, not a general vet</li></ul><p>This makes preventive care — annual wellness checks, quality diet, appropriate environment, attentive daily observation — more important than reactive treatment.</p>`, faqs: [
    ['How quickly should I take a sick parrot to the vet?', 'Same day, always. Any parrot showing obvious illness signs (fluffed feathers, lethargy, reduced appetite, abnormal droppings, breathing changes) should be seen by an avian vet on the day you notice the symptoms. Waiting 24–48 hours can be fatal.'],
  ]},
  { slug: 'how-do-i-know-if-parrot-is-sick', q: 'How Do I Know if My Parrot Is Sick?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-health-guide/', intro: 'Parrots hide illness instinctively. Knowing the subtle early signs of illness is essential for ensuring prompt treatment.', answer: `<p>Watch for these signs of potential illness:</p><table class="specs-table"><thead><tr><th>Sign</th><th>Urgency</th><th>Notes</th></tr></thead><tbody><tr><td>Fluffed feathers + lethargy outside sleep time</td><td>🔴 Urgent</td><td>Classic sign of illness; always investigate</td></tr><tr><td>Reduced or absent appetite (>24 hours)</td><td>🔴 Urgent</td><td>Seek vet same day</td></tr><tr><td>Open-mouth breathing / tail bobbing</td><td>🔴 Emergency</td><td>Respiratory distress; vet immediately</td></tr><tr><td>Discharge from eyes or nostrils</td><td>🟡 Same day</td><td>Upper respiratory infection likely</td></tr><tr><td>Abnormal droppings (colour, consistency change)</td><td>🟡 Monitor closely</td><td>Single change may be dietary; persistent warrants vet</td></tr><tr><td>Unusual quietness</td><td>🟡 Monitor</td><td>Especially notable in normally vocal birds</td></tr><tr><td>Inability to grip perch / falling</td><td>🔴 Emergency</td><td>Neurological or systemic crisis</td></tr></tbody></table>`, faqs: [
    ['Should I weigh my parrot regularly?', 'Yes — weekly weighing is one of the most sensitive early indicators of health changes. A parrot losing 5–10% of body weight without obvious dietary cause should be seen by an avian vet.'],
  ]},
  { slug: 'what-temperature-do-parrots-need', q: 'What Temperature Do Parrots Need?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-care/', intro: 'Most parrot species originate from tropical or subtropical regions and prefer moderate temperatures. Here is what temperature range is appropriate for UK parrot owners.', answer: `<p>Most commonly kept parrot species are comfortable at <strong>18–25°C</strong>, which aligns well with typical UK home temperatures. Key temperature guidelines:</p><ul><li><strong>Comfortable range:</strong> 18–25°C for most species</li><li><strong>Avoid below 15°C:</strong> cold stress can reduce immune function; draft-free environment is important</li><li><strong>Avoid above 30°C:</strong> heat stress; ensure shade and ventilation during heatwaves</li><li><strong>Avoid rapid temperature changes:</strong> sudden temperature fluctuations are more stressful than stable temperatures at the lower or higher end of the range</li></ul><p>In UK homes, central heating typically maintains suitable temperatures without special equipment. The more important factor is avoiding draughts — cold air movement around the cage, even in an otherwise warm room, can cause respiratory problems.</p>`, faqs: [
    ['Do parrots need UV lighting in the UK?', 'UV lighting (specifically UVB) supports Vitamin D3 synthesis, which in turn supports calcium metabolism. In the UK\'s limited sunshine, a full-spectrum UVB light near the cage (2–4 hours daily) is beneficial, particularly for African Greys which are prone to calcium deficiency.'],
    ['Can parrots go outside in the UK?', 'In warm summer weather, supervised outdoor time in a secure aviary or carrier is beneficial for most species. Avoid direct prolonged sun exposure and ensure shade is always available. Bring birds inside when temperatures drop below 15°C or in wet and windy conditions.'],
  ]},
  { slug: 'can-parrots-live-outside-uk', q: 'Can Parrots Live Outside in the UK?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/parrot-care/', intro: 'Outdoor aviaries are used for parrots in the UK, but the climate requires careful management. Here is what is practical and what is not.', answer: `<p>Some parrot species can be maintained in outdoor aviaries in the UK with appropriate shelter, but this requires careful assessment of species suitability and aviary design:</p><p><strong>Species that can manage UK outdoor aviaries (with proper shelter):</strong></p><ul><li>Most macaw species (during the warmer months)</li><li>Amazon parrots (with winter heating provision)</li><li>Some conure species</li></ul><p><strong>Species that should not be kept outdoors in the UK:</strong></p><ul><li>Eclectus — sensitive to temperature fluctuation</li><li>African Grey — require consistent warmer temperatures; cold and damp increase respiratory risk</li></ul><p>Any outdoor UK aviary must include: fully enclosed, heated indoor sleeping quarters; double-entry safety porch; predator-proof construction; rain shelter over part of the outdoor area; minimum temperature maintenance of 15°C in winter.</p>`, faqs: [
    ['Can Ring-Necked Parakeets live outside in the UK?', 'Yes — Ring-Necked Parakeets (Psittacula krameri) are already established as a naturalised feral population in the UK and are cold-tolerant. However, we do not sell this species; this FAQ applies to our tropical species.'],
  ]},
  { slug: 'how-do-i-choose-a-breeder', q: 'How Do I Choose a Reputable Parrot Breeder?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/breeders-vs-pet-shops/', intro: 'Choosing the right breeder is one of the most important decisions you will make when buying a parrot. Here is a practical checklist of what to look for and what to avoid.', answer: `<p>Signs of a reputable breeder:</p><ul><li><strong>Full CITES documentation:</strong> government-issued, with official stamps, ring number matching the bird</li><li><strong>Transparent about rearing practices:</strong> happy to explain when birds are separated from parents, how they are fed, how they are socialised</li><li><strong>Provides a veterinary health certificate:</strong> from an independent, licensed vet — not just a "breeder certificate"</li><li><strong>Willingness to answer questions:</strong> a genuine breeder is never defensive; they want you to ask questions because it demonstrates you are a serious, prepared buyer</li><li><strong>Follow-up support:</strong> reputable breeders remain available for questions after sale; we pride ourselves on being accessible to all buyers</li><li><strong>Appropriate pricing:</strong> prices in line with market rates for the species and documentation level</li></ul><p>Red flags:</p><ul><li>Prices significantly below market rates</li><li>Vague or missing documentation</li><li>Pressure to decide quickly</li><li>Reluctance to show the birds' environment</li><li>Birds sold before fully weaned</li></ul>`, faqs: [
    ['Can I visit your aviary?', 'Please contact us to discuss arrangements. We are located in Llíria, Valencia, Spain, and understand that not all international buyers can visit. We provide detailed video of birds and are happy to arrange video call viewings.'],
  ]},
  { slug: 'what-documents-come-with-parrot', q: 'What Documents Should Come with a Parrot?', relatedSpecies: '/en/species/', relatedGuide: '/en/knowledge/cites-explained/', intro: 'When buying a parrot from a reputable breeder, several important documents should be provided. Here is a complete checklist of what you should receive and why each document matters.', answer: `<p>When purchasing a parrot from Paraíso de Aves, you receive the following documentation:</p><table class="specs-table"><thead><tr><th>Document</th><th>Issued by</th><th>Purpose</th></tr></thead><tbody><tr><td>CITES export permit (Spain)</td><td>Spanish CITES authority (SEPRONA / MITECO)</td><td>Legally authorises export; proves captive-bred status</td></tr><tr><td>EU Animal Health Certificate</td><td>Official Spanish veterinarian</td><td>Required for commercial movement to UK/Ireland</td></tr><tr><td>Veterinary health certificate</td><td>Independent vet at our aviary</td><td>Confirms individual health at time of travel</td></tr><tr><td>Ring band identification</td><td>Applied as chick at Paraíso de Aves</td><td>Individual identity matching all paperwork</td></tr><tr><td>UK CITES import permit (Appendix I)</td><td>APHA (UK)</td><td>Required for UK import of Appendix I species; we assist your application</td></tr></tbody></table>`, faqs: [
    ['What if documents are lost after purchase?', 'CITES certificates can be replaced through the issuing authority (APHA in the UK for UK permits). The process is bureaucratic but achievable. Keep documents in a safe, known location and consider photographing them for your records.'],
  ]},
];

// ═══════════════════════════════════════════════════════════════════
// DATA — PRICE GUIDES (8 pages under /en/knowledge/price/)
// ═══════════════════════════════════════════════════════════════════
const PRICE_GUIDES = [
  {
    slug: 'african-grey-price',
    title: 'African Grey Parrot Price UK 2026 | Cost & Buying Guide',
    desc: 'How much does an African Grey parrot cost in the UK in 2026? Full price breakdown, what\'s included, and how to identify a fair price from a reputable breeder.',
    h1: 'African Grey Parrot Price Guide UK',
    speciesSlug: '/en/african-grey/',
    speciesName: 'African Grey',
    priceRange: '£1,500–£3,500',
    priceNote: 'Hand-raised, fully documented, from specialist breeder',
    image: '/images/loro-gris-01.webp',
    body: `<p>The African Grey Parrot is one of the most intelligent animals on the planet — and its price reflects both the cost of responsible captive breeding and the significance of CITES Appendix I documentation.</p><p>Price breakdown:</p><table class="specs-table"><thead><tr><th>Factor</th><th>Cost Contribution</th></tr></thead><tbody><tr><td>Base breeding &amp; hand-raising cost</td><td>£800–£1,500</td></tr><tr><td>CITES export/import documentation</td><td>£200–£600</td></tr><tr><td>Veterinary health certificate</td><td>£100–£200</td></tr><tr><td>Air freight to UK</td><td>£300–£600</td></tr><tr><td>Breeder margin (reflects quality, availability)</td><td>Variable</td></tr></tbody></table><p>African Greys at the lower end of the £1,500–£3,500 range may have less training or be slightly older than the peak hand-raised period. Younger, more extensively socialised birds with additional training command higher prices. Congo African Greys and Timneh African Greys are priced similarly.</p>`,
    ongoing: `<ul><li><strong>Cage:</strong> £400–£1,200 (one-time)</li><li><strong>Quality diet:</strong> £50–£100/month (pellets + fresh food)</li><li><strong>Avian vet (annual wellness):</strong> £80–£200/year</li><li><strong>Enrichment/toys:</strong> £20–£50/month</li><li><strong>Insurance:</strong> £20–£50/month</li></ul>`,
    faqs: [
      ['Are African Greys good value for money?', 'For those who can meet their needs, African Greys offer an unmatched companion experience — lifelong, deeply intelligent, and emotionally enriching. The question is not "is it good value?" but "can I genuinely provide for this bird for 50+ years?"'],
      ['What is a fair price for an African Grey in the UK?', '£1,500–£3,500 from a specialist breeder with full documentation is the current UK market range. Prices below £1,000 warrant careful investigation of documentation and sourcing.'],
    ],
  },
  {
    slug: 'hyacinth-macaw-price',
    title: 'Hyacinth Macaw Price UK 2026 | Why They Cost So Much',
    desc: 'How much does a Hyacinth Macaw cost in the UK? Full price guide, why the Hyacinth is so expensive, what\'s included, and what to check before buying.',
    h1: 'Hyacinth Macaw Price Guide UK',
    speciesSlug: '/en/hyacinth-macaw/',
    speciesName: 'Hyacinth Macaw',
    priceRange: '£12,000–£20,000+',
    priceNote: 'Hand-raised, fully CITES documented, from specialist breeder',
    image: '/images/guacamayo-jacinto-01.webp',
    body: `<p>The Hyacinth Macaw is one of the most expensive birds in the world. Understanding why helps buyers assess whether an offered price represents genuine value or inflated marketing.</p><p>Cost factors:</p><ul><li><strong>CITES Appendix I documentation:</strong> export permits, APHA import permit application, official veterinary work — £600–£1,500</li><li><strong>Breeding difficulty:</strong> small clutches (1–2 eggs), lower hatch success, intensive hand-rearing — the cost of rearing a single Hyacinth to sale age is far higher than for common species</li><li><strong>Feed cost:</strong> palm nuts (essential diet component) are expensive; chick formula for large macaws is costly</li><li><strong>Air freight:</strong> large crate, specialist live-animal handling — £600–£1,200</li><li><strong>The bird itself:</strong> irreplaceable, unique, 80-year companion — the intrinsic value is real</li></ul>`,
    ongoing: `<ul><li><strong>Premium cage:</strong> £800–£2,500+ (one-time; Hyacinth requires a very large, very robust cage)</li><li><strong>Diet including palm nuts:</strong> £150–£300/month</li><li><strong>Avian vet:</strong> £150–£400/year for wellness; higher for illness</li><li><strong>Insurance:</strong> £40–£100/month for a bird of this value</li></ul>`,
    faqs: [
      ['Is a £8,000 Hyacinth Macaw a bargain?', 'Significant caution is advised. While pricing varies, an £8,000 offer substantially below market rate for a verified, documented Hyacinth Macaw warrants detailed investigation. Verify CITES documentation independently with APHA.'],
      ['Can I get a Hyacinth Macaw on finance?', 'Some specialist exotic animal finance providers exist in the UK. We can provide documentation needed for any finance application. Contact us for details.'],
    ],
  },
  {
    slug: 'catalina-macaw-price',
    title: 'Catalina Macaw Price UK 2026 | Hybrid Macaw Cost Guide',
    desc: 'How much does a Catalina Macaw cost in the UK? Price guide for hybrid macaws, what\'s included, and how Catalina pricing compares to pure-species macaws.',
    h1: 'Catalina Macaw Price Guide UK',
    speciesSlug: '/en/catalina-macaw/',
    speciesName: 'Catalina Macaw',
    priceRange: '£2,500–£5,500',
    priceNote: 'Prices vary by individual colouration; each bird is unique',
    image: '/images/catalina-macaw/catalina-macaw-01.jpg',
    body: `<p>Catalina Macaws are priced broadly in line with their parent species (Blue-and-Yellow and Scarlet Macaws). Because each bird is a unique colour combination, particularly striking individuals may command a premium from buyers seeking exceptional visual appeal. As a hybrid, no two Catalinas are identical — this uniqueness is part of the bird\'s appeal and pricing rationale.</p><p>Standard price drivers: hand-raising quality, documentation completeness, age, training level, and the specific colour combination of the individual bird.</p>`,
    ongoing: `<ul><li><strong>Cage:</strong> £600–£1,500 (large macaw-spec cage)</li><li><strong>Diet:</strong> £80–£180/month</li><li><strong>Avian vet:</strong> £100–£300/year</li><li><strong>Insurance:</strong> £25–£60/month</li></ul>`,
    faqs: [
      ['Are Catalina Macaws more expensive than Blue-and-Yellow or Scarlet?', 'Broadly similar pricing. Exceptionally coloured individuals may be priced at the higher end. The uniqueness of each bird\'s colour pattern is a genuine differentiator.'],
    ],
  },
  {
    slug: 'blue-and-yellow-macaw-price',
    title: 'Blue-and-Yellow Macaw Price UK 2026 | Cost Guide',
    desc: 'How much does a Blue-and-Yellow Macaw cost in the UK? Full price guide, what documentation is included, and what to expect from reputable breeders.',
    h1: 'Blue-and-Yellow Macaw Price Guide UK',
    speciesSlug: '/en/blue-and-yellow-macaw/',
    speciesName: 'Blue-and-Yellow Macaw',
    priceRange: '£2,500–£5,000',
    priceNote: 'Hand-raised, CITES Appendix II documented',
    image: '/images/guacamayo-azul-amarillo-01.webp',
    body: `<p>The Blue-and-Yellow Macaw is one of the most widely available large macaws in the UK and represents relatively accessible entry to large parrot ownership at the quality end of the market. CITES Appendix II status (simpler documentation than Appendix I) contributes to a somewhat lower overall cost compared to African Greys or Scarlet Macaws.</p><p>Price variation is driven primarily by: age and level of socialisation, training invested by the breeder, and current supply/demand. Young, well-socialised birds with some training consistently command the highest prices within the range.</p>`,
    ongoing: `<ul><li><strong>Large macaw cage:</strong> £600–£1,800</li><li><strong>Quality diet:</strong> £80–£180/month</li><li><strong>Avian vet:</strong> £100–£300/year</li><li><strong>Insurance:</strong> £25–£60/month</li></ul>`,
    faqs: [
      ['Are Blue-and-Yellow Macaws the most popular macaw in the UK?', 'By availability and sales volume, yes — the Blue-and-Yellow Macaw is among the most commonly kept large macaw species in the UK, partly reflecting its excellent temperament and relatively accessible documentation requirements.'],
    ],
  },
  {
    slug: 'scarlet-macaw-price',
    title: 'Scarlet Macaw Price UK 2026 | Cost Guide',
    desc: 'How much does a Scarlet Macaw cost in the UK? Price guide, CITES Appendix I documentation, what\'s included, and comparison with other large macaws.',
    h1: 'Scarlet Macaw Price Guide UK',
    speciesSlug: '/en/scarlet-macaw/',
    speciesName: 'Scarlet Macaw',
    priceRange: '£2,800–£6,000',
    priceNote: 'CITES Appendix I species; UK import permit required',
    image: '/images/guacamayo-escarlata-01.webp',
    body: `<p>The Scarlet Macaw is one of the world\'s most iconic birds, and its CITES Appendix I status means the full UK import permit process applies. This adds cost and time relative to Appendix II species, reflected in the pricing range. Scarlets are not produced in as large numbers as Blue-and-Yellow Macaws, contributing to slightly higher prices when demand is strong.</p><p>As with all large macaws, hand-raising quality — the degree of socialisation, trust-building, and handling practice invested by the breeder before sale — is the most important quality differentiator and price driver within the range.</p>`,
    ongoing: `<ul><li><strong>Large macaw cage:</strong> £600–£1,800</li><li><strong>Quality diet:</strong> £80–£180/month</li><li><strong>Avian vet:</strong> £100–£300/year</li><li><strong>Insurance:</strong> £25–£60/month</li></ul>`,
    faqs: [
      ['Why is the Scarlet Macaw more expensive than the Blue-and-Yellow?', 'Two factors: CITES Appendix I status (more complex documentation = higher cost) and generally lower production volume in European captive breeding compared to the Blue-and-Yellow Macaw.'],
    ],
  },
  {
    slug: 'cockatoo-price',
    title: 'Cockatoo Price UK 2026 | Cost by Species',
    desc: 'How much do cockatoos cost in the UK? Price guide by species — Moluccan, Umbrella, Goffin\'s, Sulphur-Crested — with documentation and care cost breakdown.',
    h1: 'Cockatoo Price Guide UK',
    speciesSlug: '/en/cockatoos/',
    speciesName: 'Cockatoo',
    priceRange: '£1,200–£5,000',
    priceNote: 'Varies by species; most are CITES Appendix I',
    image: '/images/cacatua-01.webp',
    body: `<p>Cockatoo prices in the UK vary significantly by species:</p><table class="specs-table"><thead><tr><th>Species</th><th>Typical Price Range</th><th>CITES</th></tr></thead><tbody><tr><td>Moluccan (Salmon-Crested)</td><td>£2,500–£5,000</td><td>Appendix I</td></tr><tr><td>Umbrella (White)</td><td>£2,000–£4,000</td><td>Appendix I</td></tr><tr><td>Sulphur-Crested</td><td>£1,500–£3,000</td><td>Appendix II</td></tr><tr><td>Goffin\'s</td><td>£1,200–£2,500</td><td>Appendix I</td></tr></tbody></table>`,
    ongoing: `<ul><li><strong>Large cage:</strong> £500–£1,500</li><li><strong>Quality diet:</strong> £60–£150/month</li><li><strong>Avian vet:</strong> £100–£300/year</li><li><strong>Insurance:</strong> £20–£55/month</li></ul>`,
    faqs: [
      ['Why are Moluccan Cockatoos more expensive than Goffin\'s?', 'The Moluccan is larger, more intensively hand-reared (higher feed and staff cost), and CITES Appendix I. Goffin\'s are smaller and require less investment in rearing — though all CITES I species carry documentation costs.'],
    ],
  },
  {
    slug: 'amazon-parrot-price',
    title: 'Amazon Parrot Price UK 2026 | Cost Guide by Species',
    desc: 'How much do Amazon parrots cost in the UK? Price guide by species — Blue-Fronted, Yellow-Naped, Double Yellow-Headed, Orange-Winged — with full cost breakdown.',
    h1: 'Amazon Parrot Price Guide UK',
    speciesSlug: '/en/amazon-parrots/',
    speciesName: 'Amazon Parrot',
    priceRange: '£700–£4,000',
    priceNote: 'Varies widely by species and CITES appendix listing',
    image: '/images/amazon-01.webp',
    body: `<p>Amazon parrot prices in the UK by species:</p><table class="specs-table"><thead><tr><th>Species</th><th>Price Range</th><th>CITES</th></tr></thead><tbody><tr><td>Blue-Fronted Amazon</td><td>£900–£1,800</td><td>Appendix II</td></tr><tr><td>Orange-Winged Amazon</td><td>£700–£1,400</td><td>Appendix II</td></tr><tr><td>Yellow-Naped Amazon</td><td>£1,500–£3,000</td><td>Appendix I</td></tr><tr><td>Double Yellow-Headed Amazon</td><td>£2,000–£4,000</td><td>Appendix I</td></tr></tbody></table>`,
    ongoing: `<ul><li><strong>Cage:</strong> £400–£1,000</li><li><strong>Diet:</strong> £50–£120/month</li><li><strong>Avian vet:</strong> £80–£200/year</li><li><strong>Insurance:</strong> £15–£40/month</li></ul>`,
    faqs: [
      ['Why are Yellow-Naped Amazons more expensive?', 'CITES Appendix I status (higher documentation cost) and their superior talking ability command a significant price premium over the Appendix II Blue-Fronted and Orange-Winged Amazons.'],
    ],
  },
  {
    slug: 'conure-price',
    title: 'Conure Price UK 2026 | How Much Do Conures Cost?',
    desc: 'How much do conures cost in the UK? Price guide by species — Green-Cheeked, Sun, Jenday — what documentation is required, and total ownership cost.',
    h1: 'Conure Price Guide UK',
    speciesSlug: '/en/conures/',
    speciesName: 'Conure',
    priceRange: '£300–£1,200',
    priceNote: 'Most affordable parrots from specialist breeders with documentation',
    image: '/images/conure-sol-01.webp',
    body: `<p>Conures are among the most affordable parrots available with proper CITES documentation from specialist breeders:</p><table class="specs-table"><thead><tr><th>Species</th><th>Price Range</th><th>CITES</th></tr></thead><tbody><tr><td>Green-Cheeked Conure</td><td>£300–£600</td><td>Appendix II</td></tr><tr><td>Sun Conure</td><td>£600–£1,200</td><td>Appendix II</td></tr><tr><td>Jenday Conure</td><td>£500–£900</td><td>Appendix II</td></tr></tbody></table><p>While conures are relatively affordable, they are still living animals requiring 15–30 year commitment and ongoing investment in diet, veterinary care, and enrichment.</p>`,
    ongoing: `<ul><li><strong>Cage:</strong> £150–£400</li><li><strong>Diet:</strong> £25–£60/month</li><li><strong>Avian vet:</strong> £60–£150/year</li><li><strong>Insurance:</strong> £10–£25/month</li></ul>`,
    faqs: [
      ['Are conures cheap to keep?', 'Relative to macaws and cockatoos, yes. But ongoing costs are still real and should be budgeted carefully. The avian vet requirement is the same regardless of species.'],
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// DATA — COMPARISON PAGES (6 pages under /en/knowledge/compare/)
// ═══════════════════════════════════════════════════════════════════
const COMPARISONS = [
  {
    slug: 'african-grey-vs-amazon',
    title: 'African Grey vs Amazon Parrot | Complete Comparison UK',
    desc: 'African Grey vs Amazon Parrot: full comparison of intelligence, talking ability, temperament, care needs, noise, and price for UK buyers.',
    h1: 'African Grey vs Amazon Parrot',
    species1: { name: 'African Grey', url: '/en/african-grey/', scientific: 'Psittacus erithacus', size: '33 cm, 400–650g', lifespan: '50–70 years', noise: 'Moderate–High', talking: '⭐⭐⭐⭐⭐', family: 'Experienced only', cites: 'Appendix I', price: '£1,500–£3,500', badge: '🧠 World\'s smartest parrot' },
    species2: { name: 'Amazon Parrot', url: '/en/amazon-parrots/', scientific: 'Amazona spp.', size: '28–45 cm, 300–700g', lifespan: '40–60 years', noise: 'Loud', talking: '⭐⭐⭐⭐', family: 'Moderate experience', cites: 'II (most) / I (some)', price: '£700–£4,000', badge: '🎭 The entertainer' },
    verdict: '<p>Choose an <a href="/en/african-grey/"><strong>African Grey</strong></a> if: you want the most intellectually stimulating parrot companion available; you are prepared for its emotional complexity and sensitivity; you can provide consistent daily mental engagement.</p><p>Choose an <a href="/en/amazon-parrots/"><strong>Amazon</strong></a> if: you want a bold, entertaining, outgoing bird; you enjoy a parrot that performs and shows off; you are comfortable with louder vocalisations and seasonal hormonal behaviour.</p>',
    rows: [
      ['Intelligence', '⭐⭐⭐⭐⭐ World\'s most cognitively complex parrot', '⭐⭐⭐⭐ Highly intelligent; excellent contextual awareness'],
      ['Talking ability', '⭐⭐⭐⭐⭐ 500–1,000+ words; contextual use', '⭐⭐⭐⭐ 100–300 words; excellent clarity'],
      ['Noise level', 'Moderate — variable; contact calls', 'Loud — especially dawn and dusk'],
      ['Beginner suitable?', 'No — complex emotional needs', 'Moderate — assertive personality'],
      ['Social needs', 'High — sensitive, routine-dependent', 'Moderate–High — outgoing, can be independent'],
      ['Lifespan', '50–70 years', '40–60 years'],
      ['CITES status', 'Appendix I', 'Appendix I (Yellow-Naped, DYH) / II (Blue-Fronted)'],
    ],
    faqs: [
      ['Which is better for a family home?', 'Amazons are generally more robust and tolerant of family activity than African Greys, which are sensitive to stress and routine disruption. A Blue-Fronted Amazon in a busy household is often more comfortable than an African Grey in the same environment.'],
      ['Which talks more?', 'African Greys produce larger vocabularies and demonstrate more contextual language use. Amazons are arguably clearer and more dramatic in their delivery, but African Greys generally produce more words and more sophisticated language behaviour.'],
    ],
  },
  {
    slug: 'catalina-vs-blue-and-yellow-macaw',
    title: 'Catalina Macaw vs Blue-and-Yellow Macaw | Which to Choose?',
    desc: 'Catalina Macaw vs Blue-and-Yellow Macaw: full comparison of appearance, temperament, care needs, price, and suitability for UK buyers.',
    h1: 'Catalina Macaw vs Blue-and-Yellow Macaw',
    species1: { name: 'Catalina Macaw', url: '/en/catalina-macaw/', scientific: 'Ara ararauna × Ara macao', size: '80–90 cm, ~1.2 kg', lifespan: '50–70 years', noise: 'Loud', talking: '⭐⭐⭐⭐', family: 'Experienced owners', cites: 'CITES-compliant hybrid', price: '£2,500–£5,500', badge: '🌈 Unique — no two alike' },
    species2: { name: 'Blue-and-Yellow Macaw', url: '/en/blue-and-yellow-macaw/', scientific: 'Ara ararauna', size: '86 cm, 0.9–1.3 kg', lifespan: '50–70 years', noise: 'Loud', talking: '⭐⭐⭐⭐', family: 'Experienced owners', cites: 'Appendix II', price: '£2,500–£5,000', badge: '💛 Most popular large macaw' },
    verdict: '<p>If you want <strong>visual uniqueness</strong> — a bird whose exact colour combination has never existed before and will never exist again — the <a href="/en/catalina-macaw/">Catalina Macaw</a> is extraordinary. If you want the <strong>most widely understood species</strong> with the most available veterinary and care literature, the <a href="/en/blue-and-yellow-macaw/">Blue-and-Yellow Macaw</a> is the choice. In practical terms of temperament and care, they are extremely similar.</p>',
    rows: [
      ['Appearance', 'Orange-red chest, blue-green back; every bird unique', 'Vivid cobalt blue above, yellow below; consistent'],
      ['Temperament', 'Energetic blend of both parents; very social', 'Outgoing, playful, affectionate; well-documented'],
      ['Talking', 'Good; inherits ability from both parents', 'Good; one of the better-talking large macaws'],
      ['Care complexity', 'Same as parent species', 'Well-documented; good vet literature available'],
      ['Price', '£2,500–£5,500', '£2,500–£5,000'],
      ['Uniqueness', 'Every bird a unique colour combination', 'Consistent — what you see is what you get'],
    ],
    faqs: [
      ['Is a Catalina Macaw harder to care for than a Blue-and-Yellow?', 'No — the care requirements are essentially identical. The Catalina\'s hybrid nature does not introduce additional care complexity.'],
    ],
  },
  {
    slug: 'macaw-vs-cockatoo',
    title: 'Macaw vs Cockatoo | Which is Right for You? UK Guide',
    desc: 'Macaw vs Cockatoo: complete comparison for UK buyers. Temperament, noise, social needs, lifespan, care, and which is right for your lifestyle.',
    h1: 'Macaw vs Cockatoo: Which is Right for You?',
    species1: { name: 'Macaw', url: '/en/blue-and-yellow-macaw/', scientific: 'Ara spp.', size: '80–100 cm', lifespan: '40–80 years', noise: 'Very Loud', talking: '⭐⭐⭐⭐', family: 'Experienced owners', cites: 'I or II', price: '£2,500–£20,000+', badge: '🌈 Visual spectacle' },
    species2: { name: 'Cockatoo', url: '/en/cockatoos/', scientific: 'Cacatua spp.', size: '30–65 cm', lifespan: '25–80 years', noise: 'Extremely Loud', talking: '⭐⭐⭐', family: 'Very experienced owners', cites: 'Mostly Appendix I', price: '£1,200–£5,000', badge: '🤍 Most affectionate parrot' },
    verdict: '<p>Choose a <strong>Macaw</strong> if: visual spectacle is a priority; you want a parrot that maintains some independence; you prefer a bird whose social bonding is deep but not overwhelming. Choose a <strong>Cockatoo</strong> if: intense physical affection and emotional bonding is what you want; you are home most of the day; you can accommodate the noise and the extraordinary social neediness.</p>',
    rows: [
      ['Physical affection', 'High but not overwhelming', 'Extremely high — cockatoos demand physical contact'],
      ['Social needs', 'High', 'Very high — separation anxiety is a real risk'],
      ['Noise level', 'Very loud', 'Extremely loud (especially Moluccan)'],
      ['Talking ability', 'Moderate–good', 'Variable; generally lower than macaws'],
      ['Suitable for beginners?', 'No', 'Strongly not recommended'],
      ['Typical lifespan', '40–80 years', '25–80 years depending on species'],
    ],
    faqs: [
      ['Are cockatoos louder than macaws?', 'Moluccan and Umbrella Cockatoos are documented at higher sustained decibel levels than most macaw species — making them arguably the loudest of all companion parrots.'],
      ['Which is easier to keep, a macaw or a cockatoo?', 'Macaws, generally — their social needs, while high, are less extreme than cockatoos. Cockatoos kept without adequate daily interaction develop serious behavioural problems more quickly and severely than most macaw species.'],
    ],
  },
  {
    slug: 'conure-vs-caique',
    title: 'Conure vs Caique | Which Small Parrot is Right for You?',
    desc: 'Conure vs Caique: complete comparison for UK buyers. Temperament, noise, talking ability, care, lifespan, and which species suits your lifestyle best.',
    h1: 'Conure vs Caique: Choosing Your Small Parrot',
    species1: { name: 'Conure (Green-Cheeked)', url: '/en/conures/', scientific: 'Pyrrhura molinae', size: '26 cm, ~65g', lifespan: '15–25 years', noise: 'Low–Moderate', talking: '⭐⭐', family: 'Excellent for first-timers', cites: 'Appendix II', price: '£300–£600', badge: '💚 Best first parrot' },
    species2: { name: 'Caique', url: '/en/caiques/', scientific: 'Pionites spp.', size: '23 cm, ~150g', lifespan: '25–40 years', noise: 'Moderate', talking: '⭐', family: 'Good for active households', cites: 'Appendix II', price: '£600–£1,200', badge: '🎪 Clown of the parrot world' },
    verdict: '<p>Choose a <a href="/en/conures/"><strong>Green-Cheeked Conure</strong></a> if: you are a first-time parrot owner; you live in a flat or noise-sensitive environment; you want an affectionate, manageable bird. Choose a <a href="/en/caiques/"><strong>Caique</strong></a> if: entertainment and energy are your priority; you can provide extensive daily enrichment and interaction; you enjoy a bird with enormous personality in a compact body.</p>',
    rows: [
      ['Energy level', 'Moderate', 'Extremely high'],
      ['Noise level', 'Low–moderate (flat-suitable)', 'Moderate (possible in some flats)'],
      ['Talking', 'Some words, chirps', 'Minimal — not known as talkers'],
      ['Handling tolerance', 'Good', 'Good when not over-stimulated; can nip'],
      ['Suitable for beginners?', 'Yes — recommended', 'Yes, with research into their energy needs'],
      ['Lifespan', '15–25 years', '25–40 years'],
      ['Price', '£300–£600', '£600–£1,200'],
    ],
    faqs: [
      ['Can conures and caiques live together?', 'Not recommended. Caiques can be aggressive toward other birds including similarly sized conures. Separate housing is strongly advised.'],
    ],
  },
  {
    slug: 'hyacinth-vs-scarlet-macaw',
    title: 'Hyacinth Macaw vs Scarlet Macaw | Which is Right for You?',
    desc: 'Hyacinth vs Scarlet Macaw: complete UK comparison. Temperament, size, talking, CITES documentation, price, and which is the right choice for UK buyers.',
    h1: 'Hyacinth Macaw vs Scarlet Macaw',
    species1: { name: 'Hyacinth Macaw', url: '/en/hyacinth-macaw/', scientific: 'Anodorhynchus hyacinthinus', size: '100 cm, 1.2–1.7 kg', lifespan: '60–80 years', noise: 'Very Loud', talking: '⭐⭐', family: 'Very experienced owners only', cites: 'Appendix I', price: '£12,000–£20,000+', badge: '💙 World\'s largest parrot' },
    species2: { name: 'Scarlet Macaw', url: '/en/scarlet-macaw/', scientific: 'Ara macao', size: '81 cm, 900g–1.1 kg', lifespan: '40–60 years', noise: 'Very Loud', talking: '⭐⭐⭐', family: 'Experienced owners', cites: 'Appendix I', price: '£2,800–£6,000', badge: '❤️ The iconic macaw' },
    verdict: '<p>The <a href="/en/hyacinth-macaw/"><strong>Hyacinth Macaw</strong></a> is in an entirely different category — the most expensive, the largest, the gentlest, and the most impressive companion bird available. If budget permits and space is available, it is an unmatched experience. The <a href="/en/scarlet-macaw/"><strong>Scarlet Macaw</strong></a> offers iconic beauty at a fraction of the price, with slightly better talking ability and a more assertive personality that suits experienced macaw owners.</p>',
    rows: [
      ['Size', '100 cm — world\'s largest parrot', '81 cm'],
      ['Temperament', 'Gentle giant; most docile large macaw', 'More assertive; experienced owners advised'],
      ['Price', '£12,000–£20,000+', '£2,800–£6,000'],
      ['Talking', 'Low (20–30 words)', 'Moderate (30–80 words)'],
      ['Space requirement', 'Needs very large cage (150×90×180 cm minimum)', 'Needs large cage (120×80×150 cm minimum)'],
      ['Lifespan', '60–80 years', '40–60 years'],
    ],
    faqs: [
      ['Is the Hyacinth Macaw worth the extra cost over a Scarlet?', 'For the right buyer, yes. The Hyacinth\'s gentle temperament, extraordinary size and colour, and exceptional longevity create a uniquely rewarding companionship experience unavailable with any other species. But it requires a level of commitment and resource that the Scarlet does not.'],
    ],
  },
  {
    slug: 'eclectus-vs-african-grey',
    title: 'Eclectus vs African Grey Parrot | Complete Comparison UK',
    desc: 'Eclectus vs African Grey: full comparison for UK buyers. Intelligence, talking, diet, care needs, temperament, and which is better for your lifestyle.',
    h1: 'Eclectus vs African Grey Parrot',
    species1: { name: 'Eclectus', url: '/en/eclectus/', scientific: 'Eclectus roratus', size: '35 cm, 400–570g', lifespan: '30–50 years', noise: 'Moderate', talking: '⭐⭐⭐⭐', family: 'Patient, research-prepared owners', cites: 'Appendix II', price: '£1,200–£2,500', badge: '🦚 Most visually striking dimorphism' },
    species2: { name: 'African Grey', url: '/en/african-grey/', scientific: 'Psittacus erithacus', size: '33 cm, 400–650g', lifespan: '50–70 years', noise: 'Moderate–High', talking: '⭐⭐⭐⭐⭐', family: 'Experienced owners', cites: 'Appendix I', price: '£1,500–£3,500', badge: '🧠 Most intelligent parrot' },
    verdict: '<p>Choose an <a href="/en/eclectus/"><strong>Eclectus</strong></a> if: visual spectacle (the dramatic sexual dimorphism) is a priority; you are prepared for their unique, fresh-food-heavy dietary needs; you want a slightly calmer companion than an African Grey. Choose an <a href="/en/african-grey/"><strong>African Grey</strong></a> if: you want the most cognitively engaging, linguistically capable parrot companion available and are fully prepared for their emotional complexity.</p>',
    rows: [
      ['Intelligence', 'Very high', '⭐⭐⭐⭐⭐ Highest documented cognitive ability'],
      ['Talking', 'Good (clear, contextual)', 'Outstanding (500–1,000+ words; contextual)'],
      ['Dietary needs', 'Unique — fresh-food heavy; sensitive to additives', 'Standard pelleted diet + fresh food'],
      ['Emotional complexity', 'Moderate', 'Very high — sensitive, routine-dependent'],
      ['Visual appeal', '⭐⭐⭐⭐⭐ Striking male/female colour difference', 'Understated (grey with red tail)'],
      ['CITES status', 'Appendix II', 'Appendix I'],
      ['Price', '£1,200–£2,500', '£1,500–£3,500'],
    ],
    faqs: [
      ['Which has a higher nutritional maintenance requirement — Eclectus or African Grey?', 'The Eclectus. Their long digestive tract makes them unusually sensitive to diet quality and food additives. The African Grey has specific calcium needs but is less demanding in terms of overall dietary complexity.'],
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// PAGE GENERATORS
// ═══════════════════════════════════════════════════════════════════

function makeFaqSchema(faqs) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a.replace(/"/g, '\\"') }
    }))
  });
}

function makeArticleSchema(url, title, desc, image) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": desc,
    "url": `https://www.paraisodeaves.com${url}`,
    "image": `https://www.paraisodeaves.com${image}`,
    "author": { "@type": "Organization", "name": "Paraíso de Aves" },
    "publisher": { "@type": "Organization", "name": "Paraíso de Aves", "url": "https://www.paraisodeaves.com" },
    "datePublished": "2026-07-12",
    "dateModified": "2026-07-12"
  });
}

// ── BUYER GUIDE PAGE ──
function generateGuide(g) {
  const url = `/en/knowledge/${g.slug}/`;
  const sections = g.sections.map(s => `
  <div class="info-box">
    <h2>${s.h}</h2>
    ${s.body}
  </div>`).join('');

  const faqHtml = g.faqs.map(([q, a]) => `
  <div class="faq-item">
    <h3>${q}</h3>
    <p>${a}</p>
  </div>`).join('');

  const extra = `<script type="application/ld+json">${makeArticleSchema(url, g.title, g.desc, g.ogImage)}</script>
<script type="application/ld+json">${makeFaqSchema(g.faqs)}</script>
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"ImageObject","url":`https://www.paraisodeaves.com${g.ogImage}`,"name":g.h1,"description":g.desc})}</script>`;

  const html = pageHead({ title: g.title, desc: g.desc, canonical: url, ogImage: g.ogImage, extra }) +
    header() +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: '/en/knowledge/', label: 'Knowledge Centre' },
      { url: url, label: g.h1 }
    ]) + `
<section class="page-hero">
  <div style="max-width:1200px;margin:0 auto">
    <div class="trust-pills" style="margin-bottom:14px"><span class="pill">${g.cat}</span></div>
    <h1>${g.h1}</h1>
    <p class="subtitle">${g.intro}</p>
  </div>
</section>
<div class="article-wrap">
  ${sections}

  <div class="info-box">
    <h2>Frequently Asked Questions</h2>
    ${faqHtml}
  </div>

  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write(`en/knowledge/${g.slug}/index.html`, html);
}

// ── FAQ PAGE ──
function generateFaq(f) {
  const url = `/en/knowledge/faq/${f.slug}/`;
  const faqSchemaItems = f.faqs.map(([q, a]) => `{"@type":"Question","name":"${q.replace(/"/g,'\\"')}","acceptedAnswer":{"@type":"Answer","text":"${a.replace(/"/g,'\\"')}"}}`)
    .join(',');

  const extra = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${f.q.replace(/"/g,'\\"')}","url":"https://www.paraisodeaves.com${url}","author":{"@type":"Organization","name":"Paraíso de Aves"},"datePublished":"2026-07-12"}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"${f.q.replace(/"/g,'\\"')}","acceptedAnswer":{"@type":"Answer","text":"${f.answer.replace(/<[^>]*>/g,'').replace(/"/g,'\\"').slice(0,200)}..."}}${f.faqs.length ? ',' + faqSchemaItems : ''}]}</script>`;

  const relatedFaqs = f.faqs.map(([q, a]) => `
  <div class="faq-item">
    <h3>${q}</h3>
    <p>${a}</p>
  </div>`).join('');

  const html = pageHead({ title: f.q + ' | Paraíso de Aves', desc: f.intro, canonical: url, extra }) +
    header() +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: '/en/knowledge/', label: 'Knowledge Centre' },
      { url: '/en/knowledge/faq/', label: 'FAQ' },
      { url: url, label: f.q.length > 60 ? f.q.slice(0,57)+'…' : f.q }
    ]) + `
<section class="page-hero">
  <div style="max-width:1200px;margin:0 auto">
    <div class="trust-pills" style="margin-bottom:14px"><span class="pill">FAQ</span><span class="pill">Quick Answer</span></div>
    <h1>${f.q}</h1>
    <p class="subtitle">${f.intro}</p>
  </div>
</section>
<div class="article-wrap">
  <div class="info-box">
    <h2>Answer</h2>
    ${f.answer}
    <div style="margin-top:20px">
      <a href="${f.relatedSpecies}" class="btn-gold" style="margin-right:10px">View ${f.relatedSpecies.split('/').filter(Boolean).pop().replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())} Species Page</a>
      <a href="${f.relatedGuide}" style="color:var(--primary);font-weight:700;text-decoration:underline">Read Full Guide →</a>
    </div>
  </div>

  ${f.faqs.length ? `<div class="info-box"><h2>Related Questions</h2>${relatedFaqs}</div>` : ''}

  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write(`en/knowledge/faq/${f.slug}/index.html`, html);
}

// ── PRICE GUIDE PAGE ──
function generatePriceGuide(p) {
  const url = `/en/knowledge/price/${p.slug}/`;
  const extra = `<script type="application/ld+json">${makeArticleSchema(url, p.title, p.desc, p.image)}</script>
<script type="application/ld+json">${makeFaqSchema(p.faqs)}</script>`;

  const faqHtml = p.faqs.map(([q, a]) => `<div class="faq-item"><h3>${q}</h3><p>${a}</p></div>`).join('');

  const html = pageHead({ title: p.title, desc: p.desc, canonical: url, ogImage: p.image, extra }) +
    header() +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: '/en/knowledge/', label: 'Knowledge Centre' },
      { url: '/en/knowledge/price/', label: 'Price Guides' },
      { url: url, label: p.h1 }
    ]) + `
<section class="page-hero">
  <div style="max-width:1200px;margin:0 auto">
    <div class="trust-pills" style="margin-bottom:14px"><span class="pill">Price Guide</span><span class="pill">2026</span></div>
    <h1>${p.h1}</h1>
    <p class="subtitle">${p.desc}</p>
    <div class="trust-pills">
      <span class="pill">🇬🇧 UK Market Prices</span>
      <span class="pill">✅ CITES Documented</span>
      <span class="pill">✈️ Delivered to UK &amp; Ireland</span>
    </div>
  </div>
</section>
<div class="article-wrap">
  <div class="price-box">
    <div class="price-label">Typical UK Price Range (2026)</div>
    <div class="price-range">${p.priceRange}</div>
    <div class="price-note">${p.priceNote}</div>
  </div>

  <div class="info-box">
    <h2>${p.speciesName} Price Breakdown</h2>
    ${p.body}
  </div>

  <div class="info-box">
    <h2>Ongoing Ownership Costs</h2>
    <p>Beyond the purchase price, budget for the following annual and monthly costs:</p>
    ${p.ongoing}
  </div>

  <div class="info-box">
    <h2>Frequently Asked Questions</h2>
    ${faqHtml}
  </div>

  <div class="info-box">
    <h2>Interested in a ${p.speciesName}?</h2>
    <p>Contact us to discuss current availability and pricing for hand-raised, fully documented ${p.speciesName} parrots, delivered throughout the UK and Ireland.</p>
    <a href="${p.speciesSlug}" class="btn-gold" style="display:inline-block;margin-top:12px">View ${p.speciesName} Species Page</a>
  </div>

  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write(`en/knowledge/price/${p.slug}/index.html`, html);
}

// ── COMPARISON PAGE ──
function generateComparison(c) {
  const url = `/en/knowledge/compare/${c.slug}/`;
  const extra = `<script type="application/ld+json">${makeArticleSchema(url, c.title, c.desc, '/images/homepage/hand-raised-macaw-breeder.jpg')}</script>
<script type="application/ld+json">${makeFaqSchema(c.faqs)}</script>`;

  const tableRows = c.rows.map(([attr, v1, v2]) => `<tr><td>${attr}</td><td>${v1}</td><td>${v2}</td></tr>`).join('');
  const faqHtml = c.faqs.map(([q, a]) => `<div class="faq-item"><h3>${q}</h3><p>${a}</p></div>`).join('');

  const html = pageHead({ title: c.title, desc: c.desc, canonical: url, extra }) +
    header() +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: '/en/knowledge/', label: 'Knowledge Centre' },
      { url: '/en/knowledge/compare/', label: 'Comparisons' },
      { url: url, label: c.h1 }
    ]) + `
<section class="page-hero">
  <div style="max-width:1200px;margin:0 auto">
    <div class="trust-pills" style="margin-bottom:14px"><span class="pill">Species Comparison</span></div>
    <h1>${c.h1}</h1>
    <p class="subtitle">${c.desc}</p>
  </div>
</section>
<div class="article-wrap">

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px">
    <div class="info-box" style="text-align:center">
      <span class="bird-card-badge">${c.species1.badge}</span>
      <h2 style="border:none;padding:0"><a href="${c.species1.url}">${c.species1.name}</a></h2>
      <p style="font-style:italic;color:var(--muted);font-size:.85rem">${c.species1.scientific}</p>
      <table class="specs-table" style="margin-top:16px;text-align:left">
        <tr><td><strong>Size</strong></td><td>${c.species1.size}</td></tr>
        <tr><td><strong>Lifespan</strong></td><td>${c.species1.lifespan}</td></tr>
        <tr><td><strong>Noise</strong></td><td>${c.species1.noise}</td></tr>
        <tr><td><strong>Talking</strong></td><td>${c.species1.talking}</td></tr>
        <tr><td><strong>CITES</strong></td><td>${c.species1.cites}</td></tr>
        <tr><td><strong>UK Price</strong></td><td>${c.species1.price}</td></tr>
      </table>
      <a href="${c.species1.url}" class="btn-gold" style="display:inline-block;margin-top:14px">Species Page</a>
    </div>
    <div class="info-box" style="text-align:center">
      <span class="bird-card-badge">${c.species2.badge}</span>
      <h2 style="border:none;padding:0"><a href="${c.species2.url}">${c.species2.name}</a></h2>
      <p style="font-style:italic;color:var(--muted);font-size:.85rem">${c.species2.scientific}</p>
      <table class="specs-table" style="margin-top:16px;text-align:left">
        <tr><td><strong>Size</strong></td><td>${c.species2.size}</td></tr>
        <tr><td><strong>Lifespan</strong></td><td>${c.species2.lifespan}</td></tr>
        <tr><td><strong>Noise</strong></td><td>${c.species2.noise}</td></tr>
        <tr><td><strong>Talking</strong></td><td>${c.species2.talking}</td></tr>
        <tr><td><strong>CITES</strong></td><td>${c.species2.cites}</td></tr>
        <tr><td><strong>UK Price</strong></td><td>${c.species2.price}</td></tr>
      </table>
      <a href="${c.species2.url}" class="btn-gold" style="display:inline-block;margin-top:14px">Species Page</a>
    </div>
  </div>

  <div class="info-box">
    <h2>Head-to-Head Comparison</h2>
    <table class="compare-table">
      <thead><tr><th>Factor</th><th>${c.species1.name}</th><th>${c.species2.name}</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </div>

  <div class="info-box">
    <h2>Which Should You Choose?</h2>
    ${c.verdict}
  </div>

  <div class="info-box">
    <h2>Frequently Asked Questions</h2>
    ${faqHtml}
  </div>

  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write(`en/knowledge/compare/${c.slug}/index.html`, html);
}

// ═══════════════════════════════════════════════════════════════════
// UPDATED KNOWLEDGE HUB
// ═══════════════════════════════════════════════════════════════════
function generateKnowledgeHub() {
  const url = '/en/knowledge/';

  // Category sections
  const categories = [
    {
      name: 'Species Guides',
      desc: 'In-depth guides to every parrot species we breed — temperament, care, diet, CITES, and buying advice.',
      articles: [
        { url: '/en/knowledge/cockatoo-guide/', title: 'Cockatoo Buying Guide', desc: 'Moluccan, Umbrella, and Goffin\'s Cockatoos' },
        { url: '/en/knowledge/amazon-guide/', title: 'Amazon Parrot Buying Guide', desc: 'Yellow-Naped, Blue-Fronted, and more' },
        { url: '/en/knowledge/conure-guide/', title: 'Conure Buying Guide', desc: 'Sun, Green-Cheeked, and Jenday Conures' },
        { url: '/en/knowledge/eclectus-guide/', title: 'Eclectus Buying Guide', desc: 'The most visually striking dimorphic parrot' },
        { url: '/en/knowledge/caique-guide/', title: 'Caique Buying Guide', desc: 'White-Bellied and Black-Headed Caiques' },
        { url: '/en/knowledge/pionus-guide/', title: 'Pionus Buying Guide', desc: 'The calm, gentle parrot for quieter homes' },
        { url: '/en/knowledge/green-wing-macaw-guide/', title: 'Green-Wing Macaw Guide', desc: 'The gentle giant macaw' },
        { url: '/en/knowledge/catalina-macaw-guide/', title: 'Catalina Macaw Guide', desc: 'The unique hybrid macaw' },
        { url: '/en/knowledge/hyacinth-macaw-guide/', title: 'Hyacinth Macaw Guide', desc: 'The world\'s largest parrot' },
        { url: '/en/knowledge/african-grey-guide/', title: 'African Grey Guide', desc: 'The world\'s most intelligent parrot' },
        { url: '/en/knowledge/macaw-guide/', title: 'Macaw Buying Guide', desc: 'All large macaw species' },
      ]
    },
    {
      name: 'Buying Guides',
      desc: 'Expert advice on choosing, sourcing, and preparing for your first or next parrot.',
      articles: [
        { url: '/en/knowledge/how-to-buy-a-parrot/', title: 'How to Buy a Parrot', desc: 'Step-by-step process guide' },
        { url: '/en/knowledge/first-parrot-guide/', title: 'Buying Your First Parrot', desc: 'Complete beginner\'s guide' },
        { url: '/en/knowledge/choosing-the-right-parrot/', title: 'Choosing the Right Parrot', desc: 'Match species to your lifestyle' },
        { url: '/en/knowledge/quiet-parrots/', title: 'Quiet Parrots for Flats', desc: 'Low-noise species for UK apartments' },
        { url: '/en/knowledge/large-parrots/', title: 'Large Parrots Guide', desc: 'Macaws, African Greys and Cockatoos' },
        { url: '/en/knowledge/small-parrots/', title: 'Small Parrots Guide', desc: 'Conures, Caiques, Pionus and more' },
        { url: '/en/knowledge/parrot-noise-levels/', title: 'Parrot Noise Levels', desc: 'Which species are loudest?' },
        { url: '/en/knowledge/breeders-vs-pet-shops/', title: 'Breeder vs Pet Shop', desc: 'Where to buy your parrot' },
        { url: '/en/knowledge/hand-raised-vs-parent-raised/', title: 'Hand-Raised vs Parent-Raised', desc: 'Why hand-raising matters' },
        { url: '/en/knowledge/parrot-acclimatisation/', title: 'Settling a New Parrot', desc: 'The first week at home' },
        { url: '/en/knowledge/parrots-with-children/', title: 'Parrots with Children', desc: 'Family owner\'s guide' },
        { url: '/en/knowledge/parrots-with-cats-dogs/', title: 'Parrots with Cats & Dogs', desc: 'Safety and introduction guide' },
      ]
    },
    {
      name: 'Care Guides',
      desc: 'Everything you need to keep your parrot healthy, stimulated, and thriving.',
      articles: [
        { url: '/en/knowledge/parrot-cage-guide/', title: 'Parrot Cage Guide', desc: 'Sizes, materials, and setup' },
        { url: '/en/knowledge/parrot-diet-guide/', title: 'Parrot Diet Guide', desc: 'What to feed your parrot' },
        { url: '/en/knowledge/parrot-lifespan/', title: 'Parrot Lifespans', desc: 'How long do parrots live?' },
        { url: '/en/knowledge/parrot-toys-guide/', title: 'Parrot Toys & Enrichment', desc: 'Complete enrichment guide' },
        { url: '/en/knowledge/parrot-sleep-guide/', title: 'How Much Sleep Parrots Need', desc: 'Sleep guide by species' },
        { url: '/en/knowledge/parrot-bathing-guide/', title: 'How to Bathe a Parrot', desc: 'Bathing methods and frequency' },
        { url: '/en/knowledge/preparing-your-home/', title: 'Preparing Your Home', desc: 'Before the bird arrives' },
      ]
    },
    {
      name: 'Behaviour',
      desc: 'Understand your parrot\'s behaviour, body language, and build a deep, trusting relationship.',
      articles: [
        { url: '/en/knowledge/parrot-bonding/', title: 'How to Bond with Your Parrot', desc: 'Building trust step by step' },
        { url: '/en/knowledge/parrot-training/', title: 'Parrot Training Guide', desc: 'Step-up, recall, trick training' },
        { url: '/en/knowledge/parrot-socialisation/', title: 'Parrot Socialisation', desc: 'New people, pets, and environments' },
        { url: '/en/knowledge/parrot-aggression-guide/', title: 'Parrot Aggression & Biting', desc: 'Why parrots bite and how to manage it' },
      ]
    },
    {
      name: 'Nutrition',
      desc: 'Detailed nutritional guidance for every parrot species.',
      articles: [
        { url: '/en/knowledge/parrot-diet-guide/', title: 'Complete Diet Guide', desc: 'Pellets, fresh food, and what to avoid' },
        { url: '/en/knowledge/faq/what-do-parrots-eat/', title: 'What Do Parrots Eat?', desc: 'Full diet overview' },
        { url: '/en/knowledge/faq/can-parrots-eat-fruit/', title: 'Can Parrots Eat Fruit?', desc: 'Safe fruits guide' },
        { url: '/en/knowledge/faq/what-foods-are-toxic-to-parrots/', title: 'Toxic Foods for Parrots', desc: 'What never to feed' },
      ]
    },
    {
      name: 'Health',
      desc: 'Keeping your parrot healthy — recognising illness, finding a vet, and preventive care.',
      articles: [
        { url: '/en/knowledge/parrot-health-guide/', title: 'Parrot Health Guide', desc: 'Signs of illness and preventive care' },
        { url: '/en/knowledge/parrot-vets-uk/', title: 'Finding an Avian Vet', desc: 'Why general vets aren\'t enough' },
        { url: '/en/knowledge/parrot-insurance-uk/', title: 'Parrot Insurance UK', desc: 'Do you need it?' },
        { url: '/en/knowledge/feather-plucking-guide/', title: 'Feather Plucking Guide', desc: 'Causes, prevention, treatment' },
        { url: '/en/knowledge/faq/how-do-i-know-if-parrot-is-sick/', title: 'Is My Parrot Sick?', desc: 'Signs to watch for' },
      ]
    },
    {
      name: 'CITES & Legal',
      desc: 'Understand CITES, UK import requirements, and your legal obligations as a parrot owner.',
      articles: [
        { url: '/en/knowledge/cites-explained/', title: 'CITES Explained', desc: 'What it is and why it matters' },
        { url: '/en/knowledge/importing-parrots-uk/', title: 'Importing to the UK', desc: 'Post-Brexit rules and permits' },
        { url: '/en/knowledge/importing-parrots-ireland/', title: 'Importing to Ireland', desc: 'EU rules for Irish buyers' },
        { url: '/en/knowledge/uk-parrot-laws/', title: 'UK Parrot Laws 2026', desc: 'Legal requirements for owners' },
        { url: '/en/knowledge/faq/do-parrots-need-cites-documents/', title: 'Do Parrots Need CITES Docs?', desc: 'Quick answer' },
      ]
    },
    {
      name: 'Delivery',
      desc: 'How parrot delivery works, from our aviary in Spain to your door in the UK and Ireland.',
      articles: [
        { url: '/en/knowledge/parrot-delivery-guide/', title: 'How Delivery Works', desc: 'Air cargo explained' },
        { url: '/en/delivery/', title: 'Delivery Page', desc: 'Full delivery information' },
        { url: '/en/knowledge/faq/how-long-does-delivery-take/', title: 'How Long Does Delivery Take?', desc: 'Timeline guide' },
        { url: '/en/knowledge/air-cargo-delivery/', title: 'Air Cargo Delivery Guide', desc: 'The IATA process in detail' },
      ]
    },
    {
      name: 'Price Guides',
      desc: 'Honest, up-to-date UK price guides for every species we breed.',
      articles: PRICE_GUIDES.map(p => ({ url: `/en/knowledge/price/${p.slug}/`, title: `${p.speciesName} Price Guide`, desc: p.priceRange }))
    },
    {
      name: 'Species Comparisons',
      desc: 'Side-by-side comparisons to help you choose between species.',
      articles: COMPARISONS.map(c => ({ url: `/en/knowledge/compare/${c.slug}/`, title: c.h1, desc: 'Head-to-head comparison' }))
    },
    {
      name: 'FAQ',
      desc: 'Quick answers to the most common questions about buying and owning parrots in the UK.',
      articles: FAQS.slice(0, 12).map(f => ({ url: `/en/knowledge/faq/${f.slug}/`, title: f.q, desc: f.intro.slice(0,100)+'…' }))
    },
  ];

  const categoryHtml = categories.map(cat => `
<div class="hub-cat">
  <h2>${cat.name}</h2>
  <p>${cat.desc}</p>
  <div class="article-list">
    ${cat.articles.map(a => `<a class="article-card" href="${a.url}">
      <div class="ac-cat">${cat.name}</div>
      <h3>${a.title}</h3>
      <p>${a.desc}</p>
    </a>`).join('')}
  </div>
</div>`).join('');

  const extra = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"English Knowledge Centre","description":"The most comprehensive English-language parrot knowledge hub serving UK and Ireland buyers","url":"https://www.paraisodeaves.com/en/knowledge/"}</script>`;

  const html = pageHead({
    title: 'Parrot Knowledge Centre UK | Complete Guides, FAQs & Buying Advice',
    desc: 'The most comprehensive English-language parrot knowledge centre for UK and Ireland buyers. Species guides, CITES explained, price guides, comparisons, and 50 expert FAQs.',
    canonical: url,
    extra
  }) +
    header('Knowledge Centre') +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: url, label: 'Knowledge Centre' }
    ]) + `
<section class="page-hero">
  <div style="max-width:1200px;margin:0 auto">
    <h1>Knowledge Centre</h1>
    <p class="subtitle">The most comprehensive English-language parrot resource for UK and Ireland buyers. Expert guides, honest FAQs, price comparisons, and species comparisons — all in one place.</p>
    <div class="trust-pills">
      <span class="pill">📚 100+ Articles</span>
      <span class="pill">🇬🇧 British English</span>
      <span class="pill">✅ Expert Written</span>
      <span class="pill">🦜 9 Categories</span>
    </div>
  </div>
</section>
<div class="page-wrap">
  ${categoryHtml}
  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write('en/knowledge/index.html', html);
}

// ── FAQ INDEX PAGE ──
function generateFaqIndex() {
  const faqList = FAQS.map(f => `<a class="article-card" href="/en/knowledge/faq/${f.slug}/">
    <div class="ac-cat">FAQ</div>
    <h3>${f.q}</h3>
    <p>${f.intro.slice(0,100)}…</p>
  </a>`).join('');

  const html = pageHead({
    title: 'Parrot FAQ | 50 Expert Answers for UK Buyers',
    desc: 'Answers to the 50 most common questions about buying and owning parrots in the UK and Ireland. Prices, CITES, delivery, care, health, and behaviour.',
    canonical: '/en/knowledge/faq/'
  }) +
    header('Knowledge Centre') +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: '/en/knowledge/', label: 'Knowledge Centre' },
      { url: '/en/knowledge/faq/', label: 'FAQ' }
    ]) + `
<section class="page-hero">
  <h1>Parrot FAQ</h1>
  <p class="subtitle">50 expert answers to the most common questions about buying, keeping, and caring for parrots in the UK and Ireland.</p>
</section>
<div class="page-wrap">
  <div class="article-list">${faqList}</div>
  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write('en/knowledge/faq/index.html', html);
}

// ── PRICE INDEX PAGE ──
function generatePriceIndex() {
  const list = PRICE_GUIDES.map(p => `<a class="article-card" href="/en/knowledge/price/${p.slug}/">
    <div class="ac-cat">Price Guide</div>
    <h3>${p.h1}</h3>
    <p>${p.priceRange}</p>
  </a>`).join('');

  const html = pageHead({
    title: 'Parrot Prices UK 2026 | Price Guide by Species',
    desc: 'Complete UK parrot price guides for 2026. African Grey, Hyacinth Macaw, Cockatoo, Amazon, Conure and more — honest prices from specialist breeders.',
    canonical: '/en/knowledge/price/'
  }) +
    header('Knowledge Centre') +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: '/en/knowledge/', label: 'Knowledge Centre' },
      { url: '/en/knowledge/price/', label: 'Price Guides' }
    ]) + `
<section class="page-hero">
  <h1>Parrot Prices UK 2026</h1>
  <p class="subtitle">Honest, current price guides for every species we breed — including what\'s included, what drives the price, and ongoing ownership costs.</p>
</section>
<div class="page-wrap">
  <div class="article-list">${list}</div>
  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write('en/knowledge/price/index.html', html);
}

// ── COMPARE INDEX PAGE ──
function generateCompareIndex() {
  const list = COMPARISONS.map(c => `<a class="article-card" href="/en/knowledge/compare/${c.slug}/">
    <div class="ac-cat">Comparison</div>
    <h3>${c.h1}</h3>
    <p>${c.desc}</p>
  </a>`).join('');

  const html = pageHead({
    title: 'Parrot Species Comparisons | Side-by-Side Guides UK',
    desc: 'Side-by-side comparisons of parrot species to help UK buyers choose. African Grey vs Amazon, Macaw vs Cockatoo, Conure vs Caique, and more.',
    canonical: '/en/knowledge/compare/'
  }) +
    header('Knowledge Centre') +
    breadcrumbs([
      { url: '/en/', label: 'Home' },
      { url: '/en/knowledge/', label: 'Knowledge Centre' },
      { url: '/en/knowledge/compare/', label: 'Comparisons' }
    ]) + `
<section class="page-hero">
  <h1>Parrot Species Comparisons</h1>
  <p class="subtitle">Can\'t decide between two species? Our side-by-side comparisons cover temperament, noise, talking, care, CITES, and price — so you can make an informed choice.</p>
</section>
<div class="page-wrap">
  <div class="article-list">${list}</div>
  ${internalLinks()}
</div>
${ctaBand()}
${footer()}
</body></html>`;

  write('en/knowledge/compare/index.html', html);
}

// ═══════════════════════════════════════════════════════════════════
// RUN ALL GENERATORS
// ═══════════════════════════════════════════════════════════════════
console.log('Phase 8 — Generating English Knowledge Centre...\n');

// Buyer guides
console.log('Generating buyer guides...');
BUYER_GUIDES.forEach(g => generateGuide(g));

// FAQ pages
console.log('Generating FAQ pages...');
FAQS.forEach(f => generateFaq(f));
generateFaqIndex();

// Price guides
console.log('Generating price guides...');
PRICE_GUIDES.forEach(p => generatePriceGuide(p));
generatePriceIndex();

// Comparison pages
console.log('Generating comparison pages...');
COMPARISONS.forEach(c => generateComparison(c));
generateCompareIndex();

// Updated knowledge hub
console.log('Updating knowledge hub...');
generateKnowledgeHub();

// ═══════════════════════════════════════════════════════════════════
// SITEMAP UPDATE
// ═══════════════════════════════════════════════════════════════════
console.log('\nUpdating sitemap_en.xml...');

const sitemapPath = 'sitemap_en.xml';
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Build new URL entries
const today = '2026-07-12';
const newUrls = [];

BUYER_GUIDES.forEach(g => newUrls.push([`/en/knowledge/${g.slug}/`, '0.75']));
FAQS.forEach(f => newUrls.push([`/en/knowledge/faq/${f.slug}/`, '0.70']));
PRICE_GUIDES.forEach(p => newUrls.push([`/en/knowledge/price/${p.slug}/`, '0.78']));
COMPARISONS.forEach(c => newUrls.push([`/en/knowledge/compare/${c.slug}/`, '0.76']));
// Index pages
[['/en/knowledge/faq/', '0.72'], ['/en/knowledge/price/', '0.75'], ['/en/knowledge/compare/', '0.74']]
  .forEach(u => newUrls.push(u));

const urlXml = newUrls.map(([url, pri]) =>
  `  <!-- Phase 8 -->\n  <url><loc>https://www.paraisodeaves.com${url}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${pri}</priority></url>`
).join('\n');

sitemapContent = sitemapContent.replace('</urlset>', `\n${urlXml}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('sitemap_en.xml updated.\n');

// ═══════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════
const counts = {
  buyerGuides: BUYER_GUIDES.length,
  faqPages: FAQS.length + 1, // +1 for index
  priceGuides: PRICE_GUIDES.length + 1,
  comparisons: COMPARISONS.length + 1,
  hub: 1,
};

console.log('═══════════════════════════════════════════════════════════');
console.log('PHASE 8 — COMPLETE');
console.log('═══════════════════════════════════════════════════════════');
console.log(`Buyer guides generated:   ${counts.buyerGuides}`);
console.log(`FAQ pages generated:      ${counts.faqPages} (${FAQS.length} articles + 1 index)`);
console.log(`Price guides generated:   ${counts.priceGuides} (${PRICE_GUIDES.length} articles + 1 index)`);
console.log(`Comparison pages:         ${counts.comparisons} (${COMPARISONS.length} articles + 1 index)`);
console.log(`Updated knowledge hub:    1`);
console.log(`─────────────────────────────────────────────────────────`);
console.log(`Total files written:      ${generated.length}`);
console.log(`Sitemap URLs added:       ${newUrls.length}`);
console.log('═══════════════════════════════════════════════════════════');
