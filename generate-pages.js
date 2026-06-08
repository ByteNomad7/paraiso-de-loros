#!/usr/bin/env node
/**
 * generate-pages.js
 * Creates all 37 missing SEO pages for paraisodeaves.com
 * Run: node generate-pages.js
 */

const fs = require('fs');
const path = require('path');

// ─── Shared snippets ────────────────────────────────────────────────────────
const GA = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>`;

const ADSENSE = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3219055968593295" crossorigin="anonymous"></script>`;

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" /></noscript>
  <link rel="preload" href="/global.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="/global.css" /></noscript>`;

const BLOG_CSS = `<style>
:root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-rich:#E0B75F;--gold-hover:#B8933E;--bg:#F8F5F0;--surface:#FFFFFF;--border:#E7E0D2;--text:#1A1A1A;--muted:#5C5C5C}
*{margin:0;padding:0;box-sizing:border-box}a{color:var(--primary);text-decoration:none}a:hover{color:var(--gold-hover);text-decoration:underline}
body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.78}
h1,h2,h3,h4{font-family:'Poppins',Arial,sans-serif}
.topbar{position:sticky;top:0;z-index:50;background:var(--primary);border-bottom:2px solid var(--gold);padding:14px 5%;display:flex;align-items:center;justify-content:space-between}
.brand{font-weight:900;font-size:1.05rem;color:#fff;text-decoration:none}
.topnav{display:flex;gap:1.4rem;align-items:center}.topnav a{color:rgba(255,255,255,.9);font-weight:600;font-size:.9rem;transition:color .2s;text-decoration:none}.topnav a:hover{color:var(--gold)}
.hero-article{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:56px 5% 48px;text-align:center}
.hero-article .wrap{max-width:820px;margin:0 auto}
.article-badge{display:inline-block;background:rgba(212,169,79,.18);border:1px solid var(--gold);color:var(--gold);font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:999px;margin-bottom:16px}
.hero-article h1{font-size:2.1rem;font-weight:900;color:#fff;line-height:1.2;margin-bottom:14px}
.hero-article .meta{color:rgba(255,255,255,.72);font-size:.88rem}
.content{max-width:820px;margin:0 auto;padding:52px 5% 24px}
.content h2{font-size:1.45rem;font-weight:800;color:var(--primary);margin:2.2rem 0 .8rem;padding-bottom:.5rem;border-bottom:2px solid var(--gold)}
.content h3{font-size:1.1rem;font-weight:700;color:var(--secondary);margin:1.5rem 0 .45rem}
.content p{margin-bottom:1.1rem;font-size:1rem;color:var(--text);line-height:1.82}
.content ul,.content ol{padding-left:22px;margin-bottom:1.1rem}
.content li{margin:7px 0;font-size:.97rem;line-height:1.75}
.content strong{color:var(--primary)}
table{width:100%;border-collapse:collapse;margin:1.5rem 0;background:var(--surface);border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)}
th,td{padding:.75rem 1rem;text-align:left;border-bottom:1px solid var(--border);font-size:.95rem}
th{background:var(--primary);color:#fff;font-family:'Poppins',Arial,sans-serif;font-weight:700}
tr:last-child td{border-bottom:none}
.info-box{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--gold);border-radius:10px;padding:18px 22px;margin:1.6rem 0}
.info-box p{margin-bottom:0;font-size:.95rem}
.cta-inline{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:14px;padding:30px;margin:2.2rem 0;text-align:center;color:#fff}
.cta-inline h3{font-size:1.2rem;font-weight:800;margin-bottom:8px;color:#fff}
.cta-inline p{color:rgba(255,255,255,.85);margin-bottom:16px;font-size:.95rem}
.cta-inline a{display:inline-block;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;font-weight:700;padding:11px 26px;border-radius:999px;text-decoration:none;margin:5px;transition:transform .2s,box-shadow .2s}
.cta-inline a:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(212,169,79,.4);color:#fff;text-decoration:none}
.related{max-width:820px;margin:0 auto;padding:0 5% 60px}
.related h2{font-size:1.05rem;font-weight:800;color:var(--primary);margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--gold);display:inline-block}
.related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:14px}
.related-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;transition:transform .2s,box-shadow .2s}
.related-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
.related-card h3{font-size:.92rem;font-weight:700;color:var(--primary);margin-bottom:5px}
.related-card p{font-size:.83rem;color:var(--muted);margin-bottom:10px}
.related-card a{font-size:.85rem;font-weight:700;color:var(--gold);text-decoration:none}.related-card a:hover{color:var(--primary)}
footer.article-footer{background:var(--primary);color:#fff;padding:32px 5%;text-align:center;font-size:.88rem}
footer.article-footer a{color:var(--gold-rich);text-decoration:none}
footer.article-footer a:hover{color:#fff}
@media(max-width:680px){.hero-article h1{font-size:1.55rem}.topnav{gap:.8rem}}
.author-bio{background:#f0ece4;border-left:4px solid var(--gold);border-radius:8px;padding:20px 24px;margin:2.5rem 0 1.5rem}
.author-bio__inner{display:flex;align-items:flex-start;gap:16px}
.author-bio__avatar{font-size:2rem;flex-shrink:0;line-height:1}
.author-bio__name{font-size:.95rem;margin:0 0 6px;color:var(--primary)}
.author-bio__desc{font-size:.87rem;color:#5c5c5c;line-height:1.6;margin:0}
.faq{margin:2rem 0}
.faq details{background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:10px;padding:0}
.faq summary{font-weight:700;color:var(--primary);padding:16px 20px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-family:'Poppins',Arial,sans-serif;font-size:.97rem}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:'▸';transition:transform .2s;color:var(--gold);font-size:.85rem}
.faq details[open] summary::after{transform:rotate(90deg)}
.faq-body{padding:0 20px 18px;color:var(--muted);font-size:.95rem;line-height:1.76}
.nav-dropdown{position:relative;display:inline-flex;align-items:center}
.nav-dropdown>.dropbtn{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.9);font-weight:600;font-size:.9rem;font-family:inherit;padding:6px 2px;transition:color .2s;display:flex;align-items:center;gap:5px;white-space:nowrap;-webkit-tap-highlight-color:transparent}
.nav-dropdown>.dropbtn:hover,.nav-dropdown.is-open>.dropbtn{color:var(--gold,#D4A94F)}
.nav-dropdown>.dropbtn .chevron{font-size:.6rem;transition:transform .22s;line-height:1;display:inline-block}
.nav-dropdown.is-open>.dropbtn .chevron{transform:rotate(180deg)}
.nav-mega{position:absolute;top:calc(100% + 10px);left:50%;transform:translateX(-50%) translateY(-4px);background:#fff;border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.22);padding:18px 20px;display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;min-width:320px;z-index:9999;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s ease,transform .18s ease,visibility .18s}
.nav-dropdown.is-open .nav-mega{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}
.nav-mega::before{content:'';position:absolute;top:-6px;left:50%;transform:translateX(-50%);border:6px solid transparent;border-bottom:6px solid #fff;border-top:none}
.nav-mega a{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:9px;color:#1F3D2B;font-size:.87rem;font-weight:600;text-decoration:none;transition:background .14s,color .14s;white-space:nowrap}
.nav-mega a:hover,.nav-mega a:focus{background:#f0f7f3;color:#D4A94F;outline:none}
.nav-mega .mega-icon{font-size:1.05rem;width:20px;text-align:center;flex-shrink:0}
.nav-mega .mega-label{line-height:1.2}
.nav-mega .mega-label small{display:block;font-weight:400;font-size:.74rem;color:#5C5C5C;margin-top:1px}
@media(max-width:680px){.nav-mega{left:auto;right:-8px;transform:translateY(-4px);min-width:260px;grid-template-columns:1fr}.nav-mega::before{left:auto;right:28px;transform:none}.nav-dropdown.is-open .nav-mega{transform:translateY(0)}}
</style>`;

const CITY_CSS = `<style>
  :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-rich:#E0B75F;--gold-hover:#B8933E;--bg:#F8F5F0;--surface:#FFFFFF;--border:#E7E0D2;--text:#1A1A1A;--muted:#5C5C5C}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.8}
  h1,h2,h3,h4{font-family:'Poppins',Arial,sans-serif}
  a{color:var(--primary);text-decoration:none}a:hover{color:var(--gold-hover);text-decoration:underline}
  .topbar{position:sticky;top:0;z-index:50;background:var(--primary);border-bottom:2px solid var(--gold);padding:14px 5%;display:flex;align-items:center;justify-content:space-between}
  .brand{font-weight:900;font-size:1.05rem;color:#fff;text-decoration:none}
  .topnav{display:flex;gap:1.4rem;align-items:center}
  .topnav a{color:rgba(255,255,255,.9);font-weight:600;font-size:.9rem;transition:color .2s;text-decoration:none}
  .topnav a:hover{color:var(--gold)}
  .hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:64px 5% 56px;text-align:center}
  .hero .wrap{max-width:860px;margin:0 auto}
  .badge{display:inline-block;background:rgba(212,169,79,.18);border:1px solid var(--gold);color:var(--gold);font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:999px;margin-bottom:18px}
  .hero h1{font-size:2.5rem;font-weight:900;color:#fff;line-height:1.2;margin-bottom:16px}
  .hero .sub{font-size:1.1rem;color:rgba(255,255,255,.82);max-width:640px;margin:0 auto 32px}
  .breadcrumb-nav{font-size:.83rem;color:rgba(255,255,255,.65);margin-bottom:16px}
  .breadcrumb-nav a{color:rgba(255,255,255,.65);text-decoration:none}
  .breadcrumb-nav a:hover{color:var(--gold)}
  .trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:24px}
  .trust-item{background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:7px 16px;font-size:.83rem;color:rgba(255,255,255,.9);font-weight:600}
  .content{max-width:860px;margin:0 auto;padding:56px 5% 24px}
  .content h2{font-size:1.5rem;font-weight:800;color:var(--primary);margin:2.4rem 0 .9rem;padding-bottom:.5rem;border-bottom:2px solid var(--gold)}
  .content h3{font-size:1.15rem;font-weight:700;color:var(--secondary);margin:1.6rem 0 .5rem}
  .content p{margin-bottom:1.1rem;font-size:1rem;color:var(--text);line-height:1.84}
  .content ul,.content ol{padding-left:22px;margin-bottom:1.2rem}
  .content li{margin:8px 0;font-size:.98rem;line-height:1.76}
  .content strong{color:var(--primary)}
  table{width:100%;border-collapse:collapse;margin:1.5rem 0;background:var(--surface);border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06)}
  th,td{padding:.75rem 1rem;text-align:left;border-bottom:1px solid var(--border);font-size:.95rem}
  th{background:var(--primary);color:#fff;font-family:'Poppins',Arial,sans-serif;font-weight:700}
  tr:last-child td{border-bottom:none}
  .callout{background:rgba(212,169,79,.07);border-left:4px solid var(--gold);border-radius:0 12px 12px 0;padding:18px 22px;margin:1.8rem 0}
  .callout p{margin-bottom:0}
  .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:18px;padding:2.4rem;text-align:center;margin:2.4rem 0;color:#fff}
  .cta-box h2{color:#fff;border:none;padding:0;margin-top:0;margin-bottom:10px;font-size:1.5rem}
  .cta-box p{color:rgba(255,255,255,.86);margin-bottom:1.4rem;font-size:1rem}
  .btn-primary{display:inline-block;padding:.9rem 2rem;border-radius:999px;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;text-decoration:none;font-family:'Poppins',Arial,sans-serif;font-size:.97rem;margin:6px;transition:transform .2s,box-shadow .2s}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(212,169,79,.45);color:#fff;text-decoration:none}
  .btn-ghost{display:inline-block;padding:.9rem 2rem;border-radius:999px;font-weight:700;border:2px solid rgba(255,255,255,.5);color:#fff;text-decoration:none;font-family:'Poppins',Arial,sans-serif;font-size:.95rem;margin:6px;transition:all .2s}
  .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff;color:#fff;text-decoration:none}
  .faq{margin:2rem 0}
  .faq details{background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:10px;padding:0}
  .faq summary{font-weight:700;color:var(--primary);padding:16px 20px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-family:'Poppins',Arial,sans-serif;font-size:.97rem}
  .faq summary::-webkit-details-marker{display:none}
  .faq summary::after{content:'▸';transition:transform .2s;color:var(--gold);font-size:.85rem}
  .faq details[open] summary::after{transform:rotate(90deg)}
  .faq-body{padding:0 20px 18px;color:var(--muted);font-size:.95rem;line-height:1.76}
  .city-links{display:flex;flex-wrap:wrap;gap:10px;margin:1.5rem 0}
  .city-links a{background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:6px 16px;font-size:.85rem;font-weight:600;color:var(--primary);text-decoration:none;transition:all .2s}
  .city-links a:hover{background:var(--primary);color:#fff;text-decoration:none}
  footer{background:var(--primary);padding:3.5rem 5% 2.5rem;border-top:1px solid rgba(255,255,255,.10);color:#F8F5F0;font-size:.9rem}
  footer a{color:var(--gold-rich);text-decoration:none;transition:color .2s}footer a:hover{color:#fff}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2.5rem;max-width:1200px;margin:0 auto 2.5rem}
  .footer-brand{font-family:'Poppins',Arial,sans-serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:.7rem;display:block}
  .footer-tagline{font-size:.86rem;color:rgba(245,245,245,.82);line-height:1.6;margin-bottom:1rem}
  .footer-contact{font-size:.84rem;color:rgba(245,245,245,.85);line-height:1.9}
  .footer-col h4{font-family:'Poppins',Arial,sans-serif;font-size:.72rem;font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:var(--gold-rich);margin-bottom:1rem}
  .footer-col ul{list-style:none;padding:0;margin:0}
  .footer-col ul li{margin-bottom:.55rem}
  .footer-col ul li a{color:#F8F5F0;font-size:.86rem}
  .footer-bottom{max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,.12);padding-top:1.2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;font-size:.78rem;color:rgba(245,245,245,.60)}
  @media(max-width:820px){.footer-grid{grid-template-columns:1fr 1fr;row-gap:1.6rem}}
  @media(max-width:640px){.hero h1{font-size:1.75rem}.topnav{gap:.8rem}.footer-grid{grid-template-columns:1fr}}
</style>`;

const CITY_FOOTER = `<footer>
  <div class="footer-grid">
    <div>
      <span class="footer-brand">🦜 paraisodeaves</span>
      <p class="footer-tagline">Criadero de loros y aves exóticas en España. Envíos con documentación CITES a toda Europa.</p>
      <p class="footer-contact">📧 <a href="mailto:info@paraisodeaves.com">info@paraisodeaves.com</a></p>
    </div>
    <div class="footer-col">
      <h4>Navegar</h4>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/nosotros.html">Nosotros</a></li>
        <li><a href="/#contacto">Contacto</a></li>
        <li><a href="/ciudades/">Ciudades</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Nuestras Aves</h4>
      <ul>
        <li><a href="/available-birds/loro-gris-africano.html">Loro Gris Africano</a></li>
        <li><a href="/available-birds/guacamayo-azul-amarillo.html">Guacamayos</a></li>
        <li><a href="/available-birds/cacatua.html">Cacatúas</a></li>
        <li><a href="/available-birds/">Ver todas</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Información</h4>
      <ul>
        <li><a href="/faq.html">FAQ</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/precios/">Precios</a></li>
        <li><a href="/criadero-de-loros-espana.html">Criadero</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 paraisodeaves &mdash; Todos los derechos reservados</span>
    <span><a href="/ciudades/">Ciudades</a> · <a href="/faq.html">FAQ</a> · <a href="/">Inicio</a></span>
  </div>
</footer>`;

const BLOG_FOOTER = `<footer class="article-footer">
    <p style="margin-bottom:.8rem;font-size:.85rem">
      <a href="/especies/">Especies</a> &nbsp;·&nbsp;
      <a href="/alimentacion/">Alimentación</a> &nbsp;·&nbsp;
      <a href="/salud/">Salud</a> &nbsp;·&nbsp;
      <a href="/comportamiento/">Comportamiento</a> &nbsp;·&nbsp;
      <a href="/curiosidades/">Curiosidades</a> &nbsp;·&nbsp;
      <a href="/guias/">Guías</a>
    </p>
    <p>© 2026 <strong>paraisodeaves</strong> — Criador de loros en España | <a href="/">Inicio</a> · <a href="/blog/">Blog</a> · <a href="/available-birds/">Aves disponibles</a> · <a href="/#contacto">Contacto</a></p>
  </footer>`;

const BLOG_NAV = `<div class="topbar">
    <a href="/" class="brand">🦜 paraisodeaves</a>
    <nav class="topnav">
      <a href="/">Inicio</a>
      <a href="/available-birds/">Aves</a>
      <a href="/tienda.html">Tienda</a>
      <div class="nav-dropdown">
      <button class="dropbtn" aria-haspopup="true" aria-expanded="false">Contenido <span class="chevron">▾</span></button>
      <div class="nav-mega" role="menu">
        <a href="/blog/" role="menuitem"><span class="mega-icon">📝</span><span class="mega-label">Blog<small>Todos los artículos</small></span></a>
        <a href="/especies/" role="menuitem"><span class="mega-icon">🦜</span><span class="mega-label">Especies<small>Por tipo de loro</small></span></a>
        <a href="/alimentacion/" role="menuitem"><span class="mega-icon">🥦</span><span class="mega-label">Alimentación<small>Qué comen los loros</small></span></a>
        <a href="/salud/" role="menuitem"><span class="mega-icon">🏥</span><span class="mega-label">Salud<small>Enfermedades y cuidados</small></span></a>
        <a href="/comportamiento/" role="menuitem"><span class="mega-icon">🧠</span><span class="mega-label">Comportamiento<small>Adiestramiento y psicología</small></span></a>
        <a href="/curiosidades/" role="menuitem"><span class="mega-icon">✨</span><span class="mega-label">Curiosidades<small>Datos y récords</small></span></a>
        <a href="/guias/" role="menuitem"><span class="mega-icon">📋</span><span class="mega-label">Guías<small>Para nuevos dueños</small></span></a>
      </div>
    </div>
      <a href="/#contacto">Contacto</a>
    </nav>
  </div>`;

const CITY_NAV = `<div class="topbar">
  <a href="/" class="brand">🦜 paraisodeaves</a>
  <nav class="topnav">
    <a href="/">Inicio</a>
    <a href="/available-birds/">Aves</a>
    <a href="/tienda.html">Tienda</a>
    <a href="/nosotros.html">Nosotros</a>
    <a href="/#contacto">Contacto</a>
  </nav>
</div>`;

const NAV_SCRIPT = `<script>
(function(){
  document.querySelectorAll('.nav-dropdown').forEach(function(dd){
    var btn=dd.querySelector('.dropbtn'),mega=dd.querySelector('.nav-mega');
    if(!btn||!mega)return;
    btn.addEventListener('click',function(e){e.stopPropagation();var open=dd.classList.toggle('is-open');btn.setAttribute('aria-expanded',open);});
    mega.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){dd.classList.remove('is-open');btn.setAttribute('aria-expanded','false');});});
  });
  document.addEventListener('click',function(){document.querySelectorAll('.nav-dropdown.is-open').forEach(function(dd){dd.classList.remove('is-open');var btn=dd.querySelector('.dropbtn');if(btn)btn.setAttribute('aria-expanded','false');});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){document.querySelectorAll('.nav-dropdown.is-open').forEach(function(dd){dd.classList.remove('is-open');var btn=dd.querySelector('.dropbtn');if(btn){btn.setAttribute('aria-expanded','false');btn.focus();}});}});
})();
</script>`;

const AUTHOR_BIO = `<div class="author-bio">
      <div class="author-bio__inner">
        <div class="author-bio__avatar" aria-hidden="true">🦜</div>
        <div>
          <p class="author-bio__name">Escrito por el equipo de <strong>paraisodeaves</strong></p>
          <p class="author-bio__desc">Criadero familiar registrado en Llíria (Valencia) desde 2016. Especializados en psitácidas exóticas con documentación CITES. Más de 8 años criando loros a mano con seguimiento veterinario y entrega en toda España y Europa.</p>
        </div>
      </div>
    </div>`;

// ─── Helper: build blog post HTML ───────────────────────────────────────────
function blogPost({ slug, title, titleFull, desc, keywords, badge, schema, content, related, ctaTitle, ctaDesc, date }) {
  const canonical = `https://www.paraisodeaves.com/blog/${slug}.html`;
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org", "@type": "Article",
    "headline": titleFull, "description": desc,
    "author": {"@type": "Organization", "name": "paraisodeaves"},
    "publisher": {"@type": "Organization", "name": "paraisodeaves", "url": "https://www.paraisodeaves.com"},
    "datePublished": date || "2026-06-08", "inLanguage": "es-ES"
  });
  const breadSchema = JSON.stringify({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.paraisodeaves.com/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.paraisodeaves.com/blog/"},
      {"@type": "ListItem", "position": 3, "name": titleFull, "item": canonical}
    ]
  });
  const faqSchema = schema ? JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": schema}) : null;

  return `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <title>${title} | paraisodeaves</title>
  ${GA}
  ${ADSENSE}
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="${keywords}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://www.paraisodeaves.com/uploaded-macaw.webp" />
  <link rel="icon" href="/favicon.ico" />
  ${FONTS}
  <script type="application/ld+json">${articleSchema}</script>
  <script type="application/ld+json">${breadSchema}</script>
  ${faqSchema ? `<script type="application/ld+json">${faqSchema}</script>` : ''}
  ${BLOG_CSS}
</head>
<body>
  ${BLOG_NAV}
  <div class="hero-article">
    <div class="wrap">
      <span class="article-badge">${badge}</span>
      <h1>${titleFull}</h1>
      <p class="meta">Por paraisodeaves · Criadores especializados en España · 10 min de lectura</p>
    </div>
  </div>
  <div class="content">
${content}
    ${AUTHOR_BIO}
    <div class="cta-inline">
      <h3>${ctaTitle || '¿Buscas un Loro Criado a Mano con Garantías?'}</h3>
      <p>${ctaDesc || 'Nuestros loros papilleros llegan con documentación CITES completa y asesoramiento incluido.'}</p>
      <a href="/available-birds/">Ver aves disponibles</a>
      <a href="mailto:info@paraisodeaves.com">✉ Solicitar información</a>
    </div>
  </div>
  <div class="related">
    <h2>Artículos relacionados</h2>
    <div class="related-grid">
${related.map(r => `      <div class="related-card"><h3>${r.title}</h3><p>${r.desc}</p><a href="${r.url}">Leer →</a></div>`).join('\n')}
    </div>
  </div>
  ${BLOG_FOOTER}
${NAV_SCRIPT}
</body>
</html>`;
}

// ─── Helper: build city page HTML ───────────────────────────────────────────
function cityPage({ slug, title, titleFull, desc, city, region, regionAdj, content, faqItems, cityLinksHtml, schemaBread, schemaFaq, badge, sub, trustItems }) {
  const canonical = `https://www.paraisodeaves.com/ciudades/${slug}`;
  const breadSchema = JSON.stringify(schemaBread);
  const faqSchema = JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": schemaFaq});

  const faqHtml = faqItems.map(f => `    <details>
      <summary>${f.q}</summary>
      <div class="faq-body">${f.a}</div>
    </details>`).join('\n');

  return `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <title>${title} | paraisodeaves</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${canonical}" />
  ${GA}
  ${ADSENSE}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://www.paraisodeaves.com/uploaded-macaw.webp" />
  <link rel="icon" href="/favicon.ico" />
  ${FONTS}
  <script type="application/ld+json">${breadSchema}</script>
  <script type="application/ld+json">${faqSchema}</script>
  ${CITY_CSS}
</head>
<body>
${CITY_NAV}
<section class="hero">
  <div class="wrap">
    <p class="breadcrumb-nav"><a href="/">Inicio</a> · <a href="/ciudades/">Ciudades</a> · ${city}</p>
    <span class="badge">${badge}</span>
    <h1>${titleFull}</h1>
    <p class="sub">${sub}</p>
    <div class="trust-row">
      ${trustItems.map(t => `<span class="trust-item">${t}</span>`).join('\n      ')}
    </div>
  </div>
</section>
<div class="content">
${content}
  <h2>Preguntas Frecuentes sobre Loros en ${city}</h2>
  <div class="faq">
${faqHtml}
  </div>
  <div class="cta-box">
    <h2>¿Busca loros disponibles en ${city}?</h2>
    <p>📩 Contáctenos por correo para recibir información actualizada, fotos del ejemplar y condiciones de entrega a ${region}.</p>
    <a href="/#contacto" class="btn-primary">✉ Escribirnos por correo</a>
    <a href="/available-birds/" class="btn-ghost">Ver aves disponibles</a>
  </div>
  <h2>Más Información Útil</h2>
  <ul>
    <li><a href="/criadero-de-loros-espana.html">Nuestro criadero de loros en España</a></li>
    <li><a href="/blog/comprar-loro-legal-espana.html">Cómo comprar un loro legal en España</a></li>
    <li><a href="/precios/">Precios de loros en España 2026</a></li>
    <li><a href="/disponibles/">Aves disponibles actualmente</a></li>
    <li><a href="/faq.html">Preguntas frecuentes</a></li>
  </ul>
  <p style="margin-top:2rem;font-size:.9rem;color:var(--muted);">Otras ciudades:
    <span class="city-links">
${cityLinksHtml}
      <a href="/ciudades/">Ver todas →</a>
    </span>
  </p>
</div>
${CITY_FOOTER}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

const pages = [];

// ─── CLUSTER 1: FEEDING ────────────────────────────────────────────────────

pages.push({ file: 'blog/frutas-para-loros.html', html: blogPost({
  slug: 'frutas-para-loros',
  title: 'Frutas para Loros: Cuáles Pueden Comer y Cuáles Evitar',
  titleFull: 'Frutas para Loros: Guía Completa de las Frutas Permitidas y Prohibidas',
  desc: 'Descubre qué frutas pueden comer los loros de forma segura, cuáles están prohibidas y cómo ofrecerlas correctamente para una dieta equilibrada.',
  keywords: 'frutas para loros, que frutas pueden comer los loros, frutas prohibidas loros, dieta loro frutas, alimentar loro fruta',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Pueden los loros comer plátano?","acceptedAnswer":{"@type":"Answer","text":"Sí, el plátano es una excelente opción para los loros. Es rico en potasio y vitaminas del grupo B. Ofrézcalo en trozos pequeños sin piel, como complemento a la dieta principal."}},
    {"@type":"Question","name":"¿Qué frutas están prohibidas para los loros?","acceptedAnswer":{"@type":"Answer","text":"El aguacate es tóxico para los loros y puede ser mortal incluso en pequeñas cantidades. Las semillas y huesos de manzana, pera, melocotón y cereza contienen compuestos de cianuro y deben retirarse siempre antes de ofrecer estas frutas."}},
    {"@type":"Question","name":"¿Con qué frecuencia debo dar fruta a mi loro?","acceptedAnswer":{"@type":"Answer","text":"La fruta debe representar entre el 10 y el 20% de la dieta total del loro, ofrecida fresca cada día. Retire los restos tras dos horas para evitar fermentación."}},
    {"@type":"Question","name":"¿Pueden comer los loros frutas tropicales?","acceptedAnswer":{"@type":"Answer","text":"Sí. El mango, la papaya, el kiwi y la guayaba son frutas tropicales que los loros toleran muy bien y que aportan vitaminas esenciales, especialmente vitamina A y C."}}
  ],
  content: `    <p>Una alimentación variada es fundamental para la salud de cualquier psitácida. Las <strong>frutas para loros</strong> son una parte esencial de su dieta, aportando vitaminas, antioxidantes y agua en un formato que los estimula naturalmente. Sin embargo, no todas las frutas son seguras: algunas son directamente tóxicas.</p>

    <h2>¿Por Qué Son Importantes las Frutas en la Dieta del Loro?</h2>
    <p>En su hábitat natural, los loros consumen una gran variedad de frutas silvestres que les aportan azúcares naturales, vitaminas y minerales difíciles de obtener solo con semillas o pellets. La fruta en cautividad reproduce parcialmente este comportamiento de forrajeo natural y proporciona:</p>
    <ul>
      <li><strong>Vitamina A:</strong> esencial para la salud del sistema respiratorio, la visión y las mucosas. La carencia es la deficiencia nutricional más común en loros.</li>
      <li><strong>Vitamina C:</strong> antioxidante que refuerza el sistema inmunológico.</li>
      <li><strong>Agua:</strong> las frutas frescas aportan hidratación adicional, especialmente importante en épocas de calor.</li>
      <li><strong>Fibra:</strong> mejora el tránsito intestinal y la salud digestiva.</li>
      <li><strong>Estimulación mental:</strong> la variedad de texturas, colores y sabores enriquece la experiencia alimentaria del ave.</li>
    </ul>

    <h2>Frutas Recomendadas para Loros</h2>
    <h3>Las Mejores Opciones (Alta Frecuencia)</h3>
    <ul>
      <li><strong>Mango:</strong> fuente excepcional de vitamina A y betacaroteno. Ofrézcalo maduro, sin hueso y en trozos.</li>
      <li><strong>Papaya:</strong> rica en enzimas digestivas y vitaminas A y C. Muy bien tolerada por la mayoría de especies.</li>
      <li><strong>Melón:</strong> alto contenido en agua, vitamina A y potasio. Ideal en verano.</li>
      <li><strong>Sandía:</strong> hidratante y rica en licopeno. Retire las semillas negras.</li>
      <li><strong>Fresas:</strong> antioxidantes naturales. Lavar bien y ofrecer frescas.</li>
      <li><strong>Arándanos:</strong> ricos en flavonoides y antioxidantes. Uno de los superalimentos para psitácidas.</li>
      <li><strong>Plátano:</strong> rico en potasio y vitaminas del grupo B. Ofrezca en pequeñas cantidades por su contenido en azúcar.</li>
      <li><strong>Kiwi:</strong> excelente fuente de vitamina C. Ofrezca la pulpa sin piel.</li>
      <li><strong>Naranja y mandarina:</strong> vitamina C y folatos. Retire las semillas y ofrezca en gajos.</li>
      <li><strong>Uvas:</strong> ofrezca sin semillas. Ricas en resveratrol y antioxidantes.</li>
      <li><strong>Granada:</strong> rica en polifenoles. Los loros disfrutan especialmente de esta fruta.</li>
      <li><strong>Pera y manzana:</strong> permitidas, pero siempre retirando el corazón y las semillas que contienen compuestos de cianuro.</li>
    </ul>

    <h3>Frutas de Temporada Española (Consumo Estacional)</h3>
    <ul>
      <li><strong>Melocotón y nectarina:</strong> retire el hueso completamente. La pulpa es segura y nutritiva.</li>
      <li><strong>Higo:</strong> dulce y rico en calcio. Ofrecer con moderación por su alto contenido en azúcar.</li>
      <li><strong>Ciruela:</strong> retire siempre el hueso. La pulpa es segura en pequeñas cantidades.</li>
      <li><strong>Cereza:</strong> retire el hueso con cuidado. Las cerezas son apreciadas por muchos loros.</li>
    </ul>

    <h2>Frutas Prohibidas o Peligrosas para Loros</h2>
    <div class="info-box">
      <p>⚠️ <strong>Aguacate: PROHIBIDO.</strong> La persina, una toxina presente en la pulpa, piel y hueso del aguacate, es letal para las aves incluso en cantidades mínimas. Nunca ofrezca aguacate a ninguna especie de loro.</p>
    </div>

    <table>
      <thead><tr><th>Fruta</th><th>Estado</th><th>Razón</th></tr></thead>
      <tbody>
        <tr><td>Aguacate</td><td>❌ Prohibido</td><td>Persina: tóxica para aves, puede ser mortal</td></tr>
        <tr><td>Semillas de manzana/pera</td><td>❌ Retirar siempre</td><td>Contienen compuestos que liberan cianuro</td></tr>
        <tr><td>Huesos de melocotón/ciruela/cereza</td><td>❌ Retirar siempre</td><td>Glucósidos cianogénicos en el endocarpio</td></tr>
        <tr><td>Fruta en conserva o almíbar</td><td>❌ Prohibido</td><td>Exceso de azúcar, aditivos, conservantes</td></tr>
        <tr><td>Frutas secas azucaradas</td><td>⚠️ Limitar mucho</td><td>Azúcar concentrado, puede causar sobrepeso</td></tr>
        <tr><td>Cítricos en exceso</td><td>⚠️ Moderación</td><td>Acidez puede irritar la mucosa digestiva</td></tr>
      </tbody>
    </table>

    <h2>Cómo Ofrecer la Fruta Correctamente</h2>
    <ul>
      <li><strong>Siempre fresca:</strong> nunca ofrezca fruta enlatada, en almíbar ni procesada. Solo fruta fresca o, ocasionalmente, congelada descongelada.</li>
      <li><strong>Lavar bien:</strong> lave todas las frutas antes de ofrecerlas para eliminar pesticidas. Preferiblemente opte por fruta ecológica.</li>
      <li><strong>Retirar a tiempo:</strong> retire los restos de fruta al cabo de 2 horas para evitar fermentación y desarrollo de bacterias.</li>
      <li><strong>Variedad:</strong> rote las frutas semanalmente para proporcionar un perfil nutricional completo y mantener la curiosidad del ave.</li>
      <li><strong>Sin pelar siempre que sea posible:</strong> la piel de muchas frutas (manzana, pera, uva) es nutritiva si está limpia y libre de pesticidas.</li>
      <li><strong>Temperatura:</strong> ofrezca la fruta a temperatura ambiente, nunca directamente del frigorífico.</li>
    </ul>

    <h2>Proporción Correcta en la Dieta</h2>
    <p>La fruta no debe ser el alimento principal del loro, sino un complemento. La proporción recomendada por especialistas en nutrición aviar es:</p>
    <ul>
      <li><strong>Pellets de calidad:</strong> 50-60% de la dieta total</li>
      <li><strong>Verduras frescas:</strong> 20-25%</li>
      <li><strong>Frutas frescas:</strong> 10-20%</li>
      <li><strong>Semillas y frutos secos:</strong> 5-10% (como premio o complemento)</li>
    </ul>
    <p>Un loro alimentado principalmente con semillas y con poca fruta y verdura desarrolla frecuentemente deficiencia de vitamina A, que se manifiesta en problemas respiratorios, plumaje deteriorado y mayor susceptibilidad a infecciones. Consulte nuestro artículo sobre <a href="/blog/vitaminas-para-loros.html">vitaminas para loros</a> para más detalles.</p>

    <div class="faq">
      <details><summary>¿Pueden los loros comer plátano?</summary><div class="faq-body">Sí, el plátano es una excelente opción. Rico en potasio y vitaminas del grupo B. Ofrézcalo en trozos pequeños sin piel, como complemento a la dieta principal.</div></details>
      <details><summary>¿Qué frutas están prohibidas para los loros?</summary><div class="faq-body">El aguacate es tóxico y puede ser mortal. Las semillas y huesos de manzana, pera, melocotón y cereza contienen compuestos de cianuro y deben retirarse siempre.</div></details>
      <details><summary>¿Con qué frecuencia debo dar fruta a mi loro?</summary><div class="faq-body">La fruta debe representar el 10-20% de la dieta total, ofrecida fresca cada día. Retire los restos tras 2 horas para evitar fermentación.</div></details>
      <details><summary>¿Pueden comer los loros frutas tropicales?</summary><div class="faq-body">Sí. El mango, la papaya, el kiwi y la guayaba son frutas tropicales que los loros toleran muy bien y que aportan vitaminas esenciales, especialmente vitamina A y C.</div></details>
    </div>`,
  related: [
    {title: 'Verduras para Loros', desc: 'Qué verduras son seguras y cuáles evitar.', url: '/blog/verduras-para-loros.html'},
    {title: 'Alimentos Tóxicos para Loros', desc: 'Lista completa de lo que nunca debe comer.', url: '/blog/alimentos-toxicos-loros.html'},
    {title: 'Vitaminas para Loros', desc: 'Suplementos y fuentes naturales de vitaminas.', url: '/blog/vitaminas-para-loros.html'},
  ]
})});

pages.push({ file: 'blog/verduras-para-loros.html', html: blogPost({
  slug: 'verduras-para-loros',
  title: 'Verduras para Loros: Guía Completa de Vegetales Seguros y Prohibidos',
  titleFull: 'Verduras para Loros: Cuáles Pueden Comer y Cómo Ofrecerlas',
  desc: 'Guía completa sobre qué verduras pueden comer los loros. Cuáles son las más nutritivas, cuáles están prohibidas y cómo incluirlas en la dieta diaria.',
  keywords: 'verduras para loros, que verduras pueden comer los loros, verduras prohibidas loros, dieta loro verduras, vegetales loros',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Pueden los loros comer espinacas?","acceptedAnswer":{"@type":"Answer","text":"Sí, pero con moderación. Las espinacas son nutritivas pero contienen oxalatos que en exceso pueden interferir con la absorción de calcio. Ofrézcalas una o dos veces por semana como parte de una dieta variada."}},
    {"@type":"Question","name":"¿Qué verduras están prohibidas para los loros?","acceptedAnswer":{"@type":"Answer","text":"La cebolla y el ajo son tóxicos para los loros y pueden causar anemia hemolítica. El aguacate también está prohibido. Los champiñones crudos, el ruibarbo y las patatas verdes también deben evitarse."}},
    {"@type":"Question","name":"¿Pueden los loros comer zanahoria?","acceptedAnswer":{"@type":"Answer","text":"Sí, la zanahoria es una de las mejores verduras para loros. Rica en betacaroteno (vitamina A), es especialmente beneficiosa para mantener el plumaje sano. Ofrézcala cruda, rallada o en trozos."}},
    {"@type":"Question","name":"¿Hay que cocinar las verduras antes de dárselas al loro?","acceptedAnswer":{"@type":"Answer","text":"No. Los loros prefieren y aprovechan mejor las verduras crudas. La cocción destruye vitaminas y enzimas. Ofrezca siempre verduras frescas y crudas, bien lavadas."}}
  ],
  content: `    <p>Las <strong>verduras para loros</strong> son una parte fundamental de su dieta, a menudo más importantes que la fruta desde el punto de vista nutricional. Muchas psitácidas salvajes obtienen gran parte de sus nutrientes de hojas, brotes y verduras silvestres. En cautividad, replicar esta riqueza vegetal es clave para mantener la salud del ave a largo plazo.</p>

    <h2>Por Qué las Verduras Son Esenciales en la Dieta del Loro</h2>
    <p>Las verduras aportan nutrientes difíciles de obtener solo con pellets o semillas:</p>
    <ul>
      <li><strong>Vitamina A (betacaroteno):</strong> presente en zanahorias, calabaza y pimientos. La deficiencia de vitamina A es el problema nutricional más frecuente en loros.</li>
      <li><strong>Calcio:</strong> el brócoli, la col rizada y las hojas verdes oscuras son fuentes de calcio vegetal.</li>
      <li><strong>Hierro y folatos:</strong> presentes en verduras de hoja verde como acelgas y espinacas.</li>
      <li><strong>Fibra:</strong> mejora la motilidad intestinal y la salud digestiva.</li>
      <li><strong>Agua:</strong> las verduras frescas aportan hidratación complementaria.</li>
    </ul>

    <h2>Las Mejores Verduras para Loros</h2>
    <h3>Verduras de Alta Frecuencia (Ofrezca a Diario)</h3>
    <ul>
      <li><strong>Zanahoria:</strong> rica en betacaroteno. Una de las mejores fuentes de vitamina A para aves. Ofrézcala cruda, rallada o en bastones.</li>
      <li><strong>Pimiento rojo y amarillo:</strong> excelente fuente de vitamina C y betacaroteno. Los loros adoran los pimientos y son muy nutritivos.</li>
      <li><strong>Calabaza:</strong> rica en vitamina A y fibra. La calabaza butternut es especialmente recomendada.</li>
      <li><strong>Brócoli:</strong> fuente de calcio, vitamina K y C. Ofrezca los ramilletes crudos.</li>
      <li><strong>Col rizada (kale):</strong> superalimento para aves. Alta en calcio, vitamina K y antioxidantes.</li>
      <li><strong>Hojas de diente de león:</strong> si las recoge de zonas sin pesticidas, son nutritivas y muchos loros las aprecian.</li>
      <li><strong>Hojas de remolacha:</strong> ricas en hierro y vitaminas del grupo B.</li>
    </ul>

    <h3>Verduras de Frecuencia Media (Varias veces a la semana)</h3>
    <ul>
      <li><strong>Espinacas:</strong> nutritivas pero contienen oxalatos. Ofrezca 2 veces por semana como máximo.</li>
      <li><strong>Judías verdes:</strong> ricas en vitamina C y hierro. Ofrézcalas crudas.</li>
      <li><strong>Maíz dulce:</strong> en grano fresco (no en lata). Rico en carbohidratos y algo de vitamina B.</li>
      <li><strong>Pepino:</strong> muy hidratante. Bajo en nutrientes pero refrescante en verano.</li>
      <li><strong>Apio:</strong> bajo en calorías, alto en agua. Ofrezca los tallos sin hojas en exceso.</li>
      <li><strong>Guisantes frescos:</strong> ricos en proteína vegetal y vitaminas.</li>
      <li><strong>Boniato (batata):</strong> fuente excepcional de vitamina A. Ofrezca crudo o al vapor sin sal.</li>
    </ul>

    <h2>Verduras Prohibidas o Peligrosas</h2>
    <div class="info-box">
      <p>⚠️ <strong>Cebolla y ajo: PROHIBIDOS.</strong> Contienen compuestos organosulfurados (tiosulfatos) que provocan anemia hemolítica en aves. Incluso pequeñas cantidades pueden ser peligrosas.</p>
    </div>
    <table>
      <thead><tr><th>Verdura</th><th>Estado</th><th>Razón</th></tr></thead>
      <tbody>
        <tr><td>Cebolla (cruda/cocida)</td><td>❌ Prohibida</td><td>Tiosulfatos: causan anemia hemolítica en aves</td></tr>
        <tr><td>Ajo</td><td>❌ Prohibido</td><td>Igual que la cebolla, más concentrado</td></tr>
        <tr><td>Ruibarbo</td><td>❌ Prohibido</td><td>Ácido oxálico en altas concentraciones</td></tr>
        <tr><td>Patata cruda/verde</td><td>❌ Prohibida</td><td>Solanina tóxica para aves</td></tr>
        <tr><td>Champiñones crudos</td><td>⚠️ Evitar</td><td>Toxinas que no se neutralizan sin cocción</td></tr>
        <tr><td>Berenjenas crudas</td><td>⚠️ Evitar</td><td>Solanina en la piel cruda</td></tr>
      </tbody>
    </table>

    <h2>Cómo Preparar y Ofrecer las Verduras</h2>
    <ul>
      <li><strong>Siempre crudas:</strong> los loros aprovechan mejor los nutrientes de las verduras crudas. La cocción destruye vitaminas y enzimas.</li>
      <li><strong>Lavado exhaustivo:</strong> lave con agua abundante para eliminar pesticidas. Prefiera producto ecológico siempre que sea posible.</li>
      <li><strong>Variedad diaria:</strong> rote las verduras para asegurar un perfil nutricional completo. Un mismo loro puede rechazar verduras durante días antes de aceptarlas.</li>
      <li><strong>Presentación creativa:</strong> ensarte las verduras en un palo de madera, córtelas en formas distintas o escóndelas dentro de juguetes de forrajeo.</li>
      <li><strong>Retire a tiempo:</strong> retire las sobras tras 2-3 horas para evitar contaminación bacteriana.</li>
    </ul>

    <h2>Cómo Acostumbrar a un Loro a las Verduras</h2>
    <p>Muchos loros, especialmente los que han crecido con dieta de semillas, rechazan las verduras inicialmente. Estrategias para introducirlas:</p>
    <ul>
      <li>Mezcle trozos pequeños de verdura entre la comida que el loro ya acepta</li>
      <li>Coma delante del loro mostrando interés por la verdura — los loros son animales sociales que imitan conductas</li>
      <li>Pruebe diferentes texturas: rallada, en trozos, entera, ligeramente al vapor</li>
      <li>Sea consistente: ofrezca la misma verdura varios días seguidos aunque la rechace inicialmente</li>
      <li>Use verduras de colores llamativos (pimientos rojos, zanahoria) para captar su atención visual</li>
    </ul>

    <div class="faq">
      <details><summary>¿Pueden los loros comer espinacas?</summary><div class="faq-body">Sí, pero con moderación. Contienen oxalatos que en exceso interfieren con la absorción de calcio. Ofrézcalas 1-2 veces por semana como parte de una dieta variada.</div></details>
      <details><summary>¿Qué verduras están prohibidas para los loros?</summary><div class="faq-body">La cebolla y el ajo son tóxicos y pueden causar anemia hemolítica. También están prohibidos el ruibarbo, las patatas verdes y los champiñones crudos.</div></details>
      <details><summary>¿Pueden los loros comer zanahoria?</summary><div class="faq-body">Sí, la zanahoria es una de las mejores verduras para loros. Rica en betacaroteno (vitamina A). Ofrézcala cruda, rallada o en trozos.</div></details>
      <details><summary>¿Hay que cocinar las verduras antes de dárselas al loro?</summary><div class="faq-body">No. Los loros prefieren y aprovechan mejor las verduras crudas. La cocción destruye vitaminas y enzimas. Ofrezca siempre verduras frescas, bien lavadas.</div></details>
    </div>`,
  related: [
    {title: 'Frutas para Loros', desc: 'Qué frutas son seguras y cuáles evitar.', url: '/blog/frutas-para-loros.html'},
    {title: 'Alimentos Tóxicos para Loros', desc: 'Lista de todo lo que nunca debe comer tu loro.', url: '/blog/alimentos-toxicos-loros.html'},
    {title: 'Cómo Alimentar un Loro Bebé', desc: 'Guía completa de alimentación en las primeras semanas.', url: '/blog/como-alimentar-un-loro-bebe.html'},
  ]
})});

pages.push({ file: 'blog/alimentos-toxicos-loros.html', html: blogPost({
  slug: 'alimentos-toxicos-loros',
  title: 'Alimentos Tóxicos para Loros: Lista Completa de Lo Que Nunca Deben Comer',
  titleFull: 'Alimentos Tóxicos para Loros: Todo lo que Nunca Debes Darles',
  desc: 'Lista completa de alimentos tóxicos y peligrosos para loros. Descubre qué nunca debes darle a tu loro y por qué cada alimento es peligroso.',
  keywords: 'alimentos toxicos loros, que no puede comer un loro, comida peligrosa loros, venenos para loros, loro intoxicacion',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Por qué el aguacate es tóxico para los loros?","acceptedAnswer":{"@type":"Answer","text":"El aguacate contiene persina, una toxina fúngica natural que daña el corazón, el hígado y los tejidos musculares de las aves. Incluso pequeñas cantidades pueden causar la muerte del ave en 24-48 horas."}},
    {"@type":"Question","name":"¿El chocolate es peligroso para los loros?","acceptedAnswer":{"@type":"Answer","text":"Sí. El chocolate contiene teobromina y cafeína, que las aves no pueden metabolizar. Causa vómitos, temblores, convulsiones y puede ser mortal. Nunca ofrezca chocolate ni productos que lo contengan."}},
    {"@type":"Question","name":"¿La cebolla es tóxica para los loros?","acceptedAnswer":{"@type":"Answer","text":"Sí. La cebolla (y el ajo) contiene compuestos organosulfurados que destruyen los glóbulos rojos de las aves, causando anemia hemolítica potencialmente mortal. No los ofrezca ni cocinados."}},
    {"@type":"Question","name":"¿Qué hago si mi loro ha comido algo tóxico?","acceptedAnswer":{"@type":"Answer","text":"Acuda inmediatamente al veterinario especialista en aves exóticas. No intente provocar el vómito. Lleve información sobre qué comió y en qué cantidad. El tiempo es crucial en intoxicaciones aviares."}}
  ],
  content: `    <p>Los <strong>alimentos tóxicos para loros</strong> son una causa frecuente de urgencias veterinarias y muertes evitables en psitácidas. Muchos de los alimentos que consumimos los humanos con total normalidad pueden ser letales para un loro. Conocer esta lista es una responsabilidad básica de cualquier propietario.</p>

    <div class="info-box">
      <p>⚠️ <strong>Urgencia veterinaria:</strong> Si sospecha que su loro ha ingerido alguno de los alimentos de esta lista, contacte inmediatamente con un veterinario especialista en aves exóticas. No espere a que aparezcan síntomas.</p>
    </div>

    <h2>Los 10 Alimentos Más Peligrosos para Loros</h2>

    <h3>1. Aguacate — MORTAL</h3>
    <p>El aguacate contiene <strong>persina</strong>, una toxina fúngica natural que daña el miocardio, el hígado y los tejidos musculares de las aves. Toda la planta es tóxica: pulpa, piel, hueso y hasta las hojas del árbol. Los síntomas aparecen en 12-24 horas: dificultad respiratoria, debilidad, edema subcut áneo. La muerte puede producirse en 24-48 horas. No existe antídoto.</p>

    <h3>2. Chocolate y Cacao</h3>
    <p>El chocolate contiene <strong>teobromina y cafeína</strong>, que las aves no pueden metabolizar eficientemente. Causan hiperexcitabilidad, vómitos, diarrea, temblores, convulsiones y fallo cardíaco. Cuanto más puro el chocolate, más peligroso. El chocolate negro es especialmente letal.</p>

    <h3>3. Cebolla y Ajo</h3>
    <p>Contienen <strong>compuestos organosulfurados (tiosulfatos)</strong> que destruyen los glóbulos rojos de las aves, provocando anemia hemolítica. Tanto crudos como cocinados son peligrosos. Los síntomas incluyen debilidad, respiración difícil, heces oscuras y colapso. El ajo tiene una concentración más alta de estos compuestos que la cebolla.</p>

    <h3>4. Alcohol</h3>
    <p>Los loros no tienen enzimas para metabolizar el etanol. Incluso pequeñas cantidades causan fallo hepático, daño neurológico y muerte. Nunca ofrezca bebidas alcohólicas ni alimentos fermentados.</p>

    <h3>5. Sal en Exceso</h3>
    <p>Los loros tienen riñones mucho más pequeños que los mamíferos y no toleran el sodio en las cantidades presentes en comida humana. La sal provoca deshidratación celular, fallo renal, convulsiones y muerte. Evite chips, aperitivos salados, embutidos y comida procesada.</p>

    <h3>6. Cafeína</h3>
    <p>El café, el té, las bebidas energéticas y muchos refrescos contienen cafeína que acelera la frecuencia cardíaca del loro, puede causar arritmias, hiperactividad y paro cardíaco. Nunca deje que su loro acceda a bebidas con cafeína.</p>

    <h3>7. Semillas y Huesos de Frutas de Hueso</h3>
    <p>Las semillas de manzana y pera, y los huesos de melocotón, cereza, ciruela y albaricoque contienen <strong>amigdalina</strong>, un glucósido cianogénico que libera cianuro de hidrógeno en el sistema digestivo. Retire siempre estos elementos antes de ofrecer la fruta.</p>

    <h3>8. Champiñones y Setas Silvestres</h3>
    <p>Muchas setas contienen toxinas que no se neutralizan con la cocción. Los champiñones cultivados son menos peligrosos pero pueden causar trastornos digestivos. Las setas silvestres nunca deben ofrecerse.</p>

    <h3>9. Patata Cruda o Verde</h3>
    <p>Las patatas crudas y especialmente las que tienen partes verdes contienen <strong>solanina</strong>, un glucoalcaloide tóxico. La patata cocinada sin piel verde y sin sal es menos problemática pero aun así no recomendada.</p>

    <h3>10. Leche y Productos Lácteos</h3>
    <p>Los loros son intolerantes a la lactosa por carecer de la enzima lactasa. La leche causa diarrea severa, deshidratación y trastornos intestinales. Evite leche, queso, yogur y helado.</p>

    <h2>Lista Adicional de Alimentos a Evitar</h2>
    <table>
      <thead><tr><th>Alimento</th><th>Nivel de Riesgo</th><th>Efecto</th></tr></thead>
      <tbody>
        <tr><td>Ruibarbo</td><td>❌ Alto</td><td>Ácido oxálico — fallo renal</td></tr>
        <tr><td>Nuez moscada</td><td>❌ Alto</td><td>Miristicina — neurotóxica</td></tr>
        <tr><td>Tomate (planta y hojas)</td><td>⚠️ Medio</td><td>Solanina en hojas/tallo; fruto maduro en pequeña cantidad OK</td></tr>
        <tr><td>Mantequilla de cacahuete comercial</td><td>⚠️ Medio</td><td>Sal, azúcar, conservantes — ofrezca solo natural sin sal</td></tr>
        <tr><td>Comida ultraprocesada</td><td>⚠️ Medio</td><td>Aditivos, sal, azúcar — no apta para aves</td></tr>
        <tr><td>Huevo crudo (clara)</td><td>⚠️ Bajo-Medio</td><td>Avidina bloquea vitamina B7; ofrezca solo cocinado</td></tr>
      </tbody>
    </table>

    <h2>Síntomas de Intoxicación en Loros</h2>
    <p>Reconocer los síntomas de intoxicación puede salvar la vida de su ave:</p>
    <ul>
      <li>Dificultad respiratoria, respiración entrecortada o con la boca abierta</li>
      <li>Debilidad extrema, dificultad para mantenerse en el palo</li>
      <li>Convulsiones o temblores</li>
      <li>Vómitos o regurgitaciones frecuentes</li>
      <li>Plumas erizadas sin causa aparente</li>
      <li>Heces de color anormal (muy oscuras, verdes brillantes, con sangre)</li>
      <li>Pérdida de equilibrio o descoordinación</li>
    </ul>

    <div class="faq">
      <details><summary>¿Por qué el aguacate es tóxico para los loros?</summary><div class="faq-body">Contiene persina, una toxina que daña el corazón, el hígado y los tejidos musculares. Toda la planta es tóxica — pulpa, piel, hueso y hojas. No existe antídoto y puede matar al ave en 24-48 horas.</div></details>
      <details><summary>¿El chocolate es peligroso para los loros?</summary><div class="faq-body">Sí. Contiene teobromina y cafeína que las aves no pueden metabolizar. Causa vómitos, temblores, convulsiones y puede ser mortal. Nunca ofrezca chocolate ni productos que lo contengan.</div></details>
      <details><summary>¿La cebolla es tóxica para los loros?</summary><div class="faq-body">Sí. Contiene tiosulfatos que destruyen glóbulos rojos causando anemia hemolítica. Es peligrosa tanto cruda como cocinada.</div></details>
      <details><summary>¿Qué hago si mi loro ha comido algo tóxico?</summary><div class="faq-body">Acuda inmediatamente al veterinario especialista en aves exóticas. No intente provocar el vómito. Lleve información sobre qué comió y en qué cantidad. El tiempo es crucial.</div></details>
    </div>`,
  related: [
    {title: 'Frutas para Loros', desc: 'Qué frutas son seguras y cuáles evitar.', url: '/blog/frutas-para-loros.html'},
    {title: 'Verduras para Loros', desc: 'Qué vegetales puede comer tu loro.', url: '/blog/verduras-para-loros.html'},
    {title: 'Enfermedades Comunes en Loros', desc: 'Síntomas y prevención de las principales enfermedades.', url: '/blog/enfermedades-comunes-loros.html'},
  ]
})});

pages.push({ file: 'blog/dieta-loro-yaco.html', html: blogPost({
  slug: 'dieta-loro-yaco',
  title: 'Dieta del Loro Yaco: Qué Come el Loro Gris Africano en Cautividad',
  titleFull: 'Dieta del Loro Yaco (Gris Africano): Guía Completa de Alimentación',
  desc: 'Guía completa sobre la dieta del loro yaco o gris africano: qué come, qué alimentos debe evitar, proporciones correctas y suplementación necesaria.',
  keywords: 'dieta loro yaco, alimentacion loro gris africano, que come el yaco, comida loro gris africano, nutricion psittacus erithacus',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Qué deben comer los loros yacos?","acceptedAnswer":{"@type":"Answer","text":"La dieta del yaco debe basarse en pellets de calidad (50-60%), complementados con verduras frescas (20-25%), frutas (10-15%) y una pequeña cantidad de semillas y frutos secos (5-10%). Las semillas no deben ser la base de la dieta."}},
    {"@type":"Question","name":"¿Los yacos necesitan suplementos de calcio?","acceptedAnswer":{"@type":"Answer","text":"Los loros grises africanos son especialmente propensos a la hipocalcemia (bajo nivel de calcio en sangre). Si la dieta está basada en pellets de calidad, generalmente no necesitan suplementos. Consulte siempre con el veterinario antes de suplementar."}},
    {"@type":"Question","name":"¿Con qué frecuencia debo alimentar a mi yaco?","acceptedAnswer":{"@type":"Answer","text":"Los loros grises africanos adultos deben alimentarse dos veces al día: mañana y tarde. Ofrezca la verdura y fruta fresca por la mañana. Los pellets pueden estar disponibles durante más tiempo pero retire los sobrantes antes de que se deterioren."}}
  ],
  content: `    <p>El <strong>loro yaco o gris africano (Psittacus erithacus)</strong> tiene requerimientos nutricionales específicos que difieren de otras especies. Es especialmente propenso a deficiencias de vitamina A y calcio, lo que convierte una <strong>dieta correcta del yaco</strong> en uno de los factores más determinantes para su salud y longevidad.</p>

    <h2>Las Necesidades Nutricionales Específicas del Yaco</h2>
    <p>Los estudios realizados sobre yacos en estado silvestre muestran que en su hábitat africano consumen una dieta muy variada que incluye frutos silvestres, semillas, nueces, hojas tiernas e incluso minerales del suelo. En cautividad debemos replicar esta variedad:</p>
    <ul>
      <li><strong>Calcio:</strong> el yaco tiene mayor necesidad de calcio que otras especies. La hipocalcemia (deficiencia de calcio) causa temblores, convulsiones, parálisis y puede ser mortal si no se trata.</li>
      <li><strong>Vitamina A:</strong> la carencia provoca problemas respiratorios, infecciones recurrentes y deterioro del plumaje. El betacaroteno de frutas y verduras naranjas es la mejor fuente.</li>
      <li><strong>Vitamina D3:</strong> necesaria para absorber el calcio. Los yacos en interiores sin exposición a luz UV natural necesitan esta vitamina de los pellets o suplementos.</li>
    </ul>

    <h2>La Dieta Ideal del Loro Gris Africano</h2>
    <h3>Pellets (50-60% de la Dieta Total)</h3>
    <p>Los pellets formulados para loros deben ser la base de la alimentación. Elija una marca sin colorantes artificiales, con vitamina D3 incluida y sin exceso de azúcar. Marcas como Harrison's, Roudybush o Zupreem Natural son ampliamente utilizadas por especialistas.</p>

    <h3>Verduras Frescas (20-25%)</h3>
    <p>Las verduras más beneficiosas para el yaco, por su contenido en los nutrientes que más necesita:</p>
    <ul>
      <li><strong>Brócoli:</strong> fuente de calcio vegetal y vitamina K. Ofrezca los ramilletes crudos.</li>
      <li><strong>Col rizada (kale):</strong> extraordinaria fuente de calcio, hierro y vitamina A.</li>
      <li><strong>Zanahorias:</strong> betacaroteno esencial. Ofrezca crudas y ralladas.</li>
      <li><strong>Pimientos rojos y amarillos:</strong> vitamina C y betacaroteno. Los yacos suelen apreciarlos.</li>
      <li><strong>Boniato:</strong> fuente excepcional de vitamina A. Ofrezca crudo.</li>
      <li><strong>Hojas verdes oscuras:</strong> acelgas, espinacas (con moderación), diente de león.</li>
    </ul>

    <h3>Frutas Frescas (10-15%)</h3>
    <p>El mango, la papaya, la granada y los arándanos son especialmente recomendables por su aporte en vitamina A y antioxidantes. Evite excesiva cantidad de frutas muy dulces.</p>

    <h3>Semillas y Frutos Secos (5-10%)</h3>
    <p>Las semillas deben ser complemento, no base. Las nueces de macadamia, almendras crudas y nueces comunes (sin sal) son excelentes fuentes de grasas saludables. Ofrezca con moderación para evitar sobrepeso.</p>

    <h2>Alimentos que el Yaco Debe Evitar</h2>
    <ul>
      <li>Aguacate — mortal</li>
      <li>Cebolla y ajo — tóxicos</li>
      <li>Chocolate — tóxico</li>
      <li>Sal, azúcar y alimentos procesados</li>
      <li>Alcohol</li>
      <li>Dieta basada solo en semillas — provoca deficiencias graves</li>
    </ul>

    <h2>La Hipocalcemia en el Yaco: Cómo Prevenirla</h2>
    <p>La hipocalcemia es una condición particularmente común en loros grises africanos. Sus síntomas incluyen:</p>
    <ul>
      <li>Temblores musculares</li>
      <li>Convulsiones, especialmente nocturnas</li>
      <li>Debilidad general</li>
      <li>Problemas de equilibrio</li>
    </ul>
    <p>La prevención pasa por una dieta rica en calcio (brócoli, col rizada, pellets con calcio) y exposición a luz ultravioleta (ventana soleada o lámpara UV específica para aves) que permite la síntesis de vitamina D3 necesaria para absorber el calcio.</p>

    <h2>Horarios y Frecuencia de Alimentación del Yaco</h2>
    <p>Ofrezca las comidas en dos momentos del día:</p>
    <ul>
      <li><strong>Mañana (7-9h):</strong> verduras frescas, fruta y un pequeño puñado de pellets. Es el momento de mayor actividad y apetito.</li>
      <li><strong>Tarde (17-19h):</strong> pellets frescos y algún complemento (nueces, semillas en poca cantidad).</li>
      <li>Retire siempre los restos de fruta y verdura tras 2-3 horas para evitar fermentación.</li>
      <li>Los pellets pueden estar disponibles todo el día en un comedero aparte.</li>
    </ul>

    <div class="faq">
      <details><summary>¿Qué deben comer los loros yacos?</summary><div class="faq-body">La dieta del yaco debe basarse en pellets de calidad (50-60%), complementados con verduras frescas (20-25%), frutas (10-15%) y una pequeña cantidad de semillas y frutos secos (5-10%).</div></details>
      <details><summary>¿Los yacos necesitan suplementos de calcio?</summary><div class="faq-body">Son especialmente propensos a la hipocalcemia. Con una dieta basada en pellets de calidad generalmente no necesitan suplementos adicionales. Consulte siempre con el veterinario antes de suplementar.</div></details>
      <details><summary>¿Con qué frecuencia debo alimentar a mi yaco?</summary><div class="faq-body">Los yacos adultos deben alimentarse dos veces al día: mañana y tarde. Ofrezca la verdura y fruta fresca por la mañana, los pellets pueden estar disponibles más tiempo.</div></details>
    </div>`,
  related: [
    {title: 'Dieta del Guacamayo', desc: 'Qué comen los guacamayos en cautividad.', url: '/blog/dieta-guacamayo.html'},
    {title: 'Vitaminas para Loros', desc: 'Suplementación vitamínica para psitácidas.', url: '/blog/vitaminas-para-loros.html'},
    {title: 'Cuidados del Loro Gris Africano', desc: 'Guía completa de cuidados del yaco.', url: '/blog/cuidado-loro-gris-africano.html'},
  ]
})});

pages.push({ file: 'blog/dieta-guacamayo.html', html: blogPost({
  slug: 'dieta-guacamayo',
  title: 'Dieta del Guacamayo: Qué Come y Cómo Alimentarlo Correctamente',
  titleFull: 'Dieta del Guacamayo: Alimentación Correcta para Ararauna, Escarlata y Jacinto',
  desc: 'Descubre qué come el guacamayo, cuáles son sus necesidades nutricionales específicas y cómo diseñar una dieta equilibrada para guacamayos en cautividad.',
  keywords: 'dieta guacamayo, alimentacion guacamayo, que come el guacamayo, comida guacamayo, nutricion ararauna cautividad',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Qué come un guacamayo en cautividad?","acceptedAnswer":{"@type":"Answer","text":"Los guacamayos deben comer pellets de calidad (base de la dieta), complementados con verduras frescas, frutas, semillas variadas y frutos secos. Las nueces de macadamia y las almendras son especialmente apreciadas. Evite una dieta basada solo en semillas."}},
    {"@type":"Question","name":"¿Los guacamayos pueden comer nueces?","acceptedAnswer":{"@type":"Answer","text":"Sí, los guacamayos adoran las nueces y son parte natural de su dieta. Las nueces de Brasil, macadamia, almendras y nueces comunes (todas sin sal) son excelentes fuentes de grasas saludables. Por su alto contenido calórico, ofrézcalas con moderación."}},
    {"@type":"Question","name":"¿Cuánto come un guacamayo al día?","acceptedAnswer":{"@type":"Answer","text":"Un guacamayo adulto de tamaño grande (Ararauna, Escarlata) consume aproximadamente 10-15% de su peso corporal en alimento diario. Esto equivale a unos 150-200g de mezcla de pellets, verduras y fruta. Los guacamayos jacinto pueden necesitar más."}}
  ],
  content: `    <p>Los <strong>guacamayos</strong> son las psitácidas más grandes del mundo, y su alimentación refleja esa imponencia: son grandes comedores con necesidades nutricionales específicas, especialmente en lo referente a grasas saludables y vitaminas liposolubles. Una dieta inadecuada puede acortar significativamente su vida de 50-70 años.</p>

    <h2>Las Necesidades Nutricionales del Guacamayo</h2>
    <p>En su hábitat natural de América Central y del Sur, los guacamayos consumen una dieta muy variada: frutos silvestres, semillas, nueces, arcilla mineral (para neutralizar toxinas de semillas verdes) e insectos ocasionalmente. Esta diversidad es clave para entender qué necesitan en cautividad:</p>
    <ul>
      <li><strong>Grasas saludables:</strong> los guacamayos metabolizan bien las grasas de nueces y semillas. Son necesarias para el plumaje, la energía y la absorción de vitaminas liposolubles (A, D, E, K).</li>
      <li><strong>Vitamina A:</strong> fundamental para las mucosas, el sistema inmune y la piel. La carencia causa sinusitis recurrente, opacidad ocular y problemas de plumaje.</li>
      <li><strong>Calcio y fósforo:</strong> en proporción adecuada para la salud ósea y muscular.</li>
      <li><strong>Proteínas de calidad:</strong> necesarias para el mantenimiento muscular y la muda del plumaje.</li>
    </ul>

    <h2>Estructura de la Dieta Ideal del Guacamayo</h2>
    <h3>Pellets (40-50%)</h3>
    <p>Los pellets formulados para loros grandes deben ser la base. Elija pellets sin colorantes artificiales, con vitaminas y minerales equilibrados. Para el guacamayo jacinto, que tiene necesidades específicamente altas en grasas, algunos especialistas recomiendan un porcentaje algo menor de pellets y más nueces.</p>

    <h3>Verduras Frescas (20-25%)</h3>
    <ul>
      <li>Maíz en mazorca (fresco o descongelado, no en lata)</li>
      <li>Boniato crudo — excelente fuente de vitamina A</li>
      <li>Pimientos (especialmente rojo y naranja)</li>
      <li>Calabaza fresca</li>
      <li>Brócoli y col en pequeñas cantidades</li>
      <li>Zanahoria rallada o en bastones</li>
    </ul>

    <h3>Frutas Frescas (15-20%)</h3>
    <ul>
      <li>Mango — fuente principal de vitamina A y betacaroteno</li>
      <li>Granada — antioxidantes naturales</li>
      <li>Plátano — energía y potasio</li>
      <li>Papaya — enzimas digestivas y vitaminas</li>
      <li>Uvas sin semillas</li>
      <li>Frutas de temporada española: higos, melocotón (sin hueso), melón</li>
    </ul>

    <h3>Semillas y Frutos Secos (15-20%)</h3>
    <p>Los guacamayos toleran bien las grasas de nueces y semillas. Incluya:</p>
    <ul>
      <li><strong>Nueces de Brasil:</strong> ricas en selenio y grasas saludables. Especialmente recomendadas para el guacamayo jacinto.</li>
      <li><strong>Almendras crudas:</strong> sin tostar, sin sal. Fuente de vitamina E.</li>
      <li><strong>Nueces de macadamia:</strong> favoritas de muchos guacamayos. Alta en grasas monoinsaturadas.</li>
      <li><strong>Semillas de girasol:</strong> con moderación, por su alto contenido graso.</li>
      <li><strong>Piñones:</strong> fuente proteica y grasa de calidad.</li>
    </ul>

    <h2>El Guacamayo Jacinto: Necesidades Especiales</h2>
    <p>El <strong>guacamayo jacinto (Anodorhynchus hyacinthinus)</strong> tiene necesidades nutricionales únicas entre los guacamayos. En estado silvestre se alimenta casi exclusivamente de nueces de palma (especialmente Acrocomia totai y Astrocaryum), que son extremadamente ricas en grasas. Esto significa que:</p>
    <ul>
      <li>Necesita un porcentaje mayor de grasas saludables en la dieta que otras especies</li>
      <li>Las nueces de palma, de Brasil y las almendras son especialmente importantes</li>
      <li>Los pellets deben ser de alta calidad y complementarse con nueces variadas</li>
      <li>Necesita más suplementación de vitamina A que otras especies</li>
    </ul>

    <h2>Qué No Debe Comer un Guacamayo</h2>
    <ul>
      <li>Aguacate — mortal</li>
      <li>Cebolla y ajo — anemia hemolítica</li>
      <li>Chocolate — tóxico</li>
      <li>Sal y alimentos procesados</li>
      <li>Alcohol</li>
      <li>Dieta exclusiva de semillas — deficiencia de vitamina A y proteínas</li>
    </ul>

    <div class="faq">
      <details><summary>¿Qué come un guacamayo en cautividad?</summary><div class="faq-body">Pellets de calidad (base de la dieta), complementados con verduras frescas, frutas, semillas variadas y frutos secos. Las nueces son especialmente importantes. Evite una dieta basada solo en semillas.</div></details>
      <details><summary>¿Los guacamayos pueden comer nueces?</summary><div class="faq-body">Sí, son parte natural de su dieta. Nueces de Brasil, macadamia, almendras y nueces comunes (sin sal) son fuentes de grasas saludables. Por su alto contenido calórico, ofrézcalas con moderación.</div></details>
      <details><summary>¿Cuánto come un guacamayo al día?</summary><div class="faq-body">Un guacamayo adulto grande consume aproximadamente el 10-15% de su peso corporal en alimento diario, unos 150-200g de mezcla de pellets, verduras y fruta.</div></details>
    </div>`,
  related: [
    {title: 'Dieta del Loro Yaco', desc: 'Qué come el loro gris africano en cautividad.', url: '/blog/dieta-loro-yaco.html'},
    {title: 'Dieta de la Cacatúa', desc: 'Alimentación específica para cacatúas.', url: '/blog/dieta-cacatua.html'},
    {title: 'Guacamayo Jacinto: Características', desc: 'Todo sobre la especie más grande del mundo.', url: '/blog/guacamayo-jacinto-caracteristicas.html'},
  ]
})});

pages.push({ file: 'blog/dieta-cacatua.html', html: blogPost({
  slug: 'dieta-cacatua',
  title: 'Dieta de la Cacatúa: Alimentación Correcta para Cacatúas en Cautividad',
  titleFull: 'Dieta de la Cacatúa: Qué Comer, Qué Evitar y Proporciones Correctas',
  desc: 'Descubre qué comer una cacatúa en cautividad, sus necesidades nutricionales específicas, alimentos prohibidos y cómo prevenir la enfermedad por deficiencia de vitamina B1.',
  keywords: 'dieta cacatua, alimentacion cacatua, que come la cacatua, comida cacatua, nutricion cockatoo cautividad',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Qué come una cacatúa?","acceptedAnswer":{"@type":"Answer","text":"Las cacatúas deben comer pellets de calidad (50% de la dieta), verduras frescas (25%), frutas (15%) y una pequeña cantidad de semillas (10%). Las semillas no deben ser la base de su alimentación porque causan deficiencias nutricionales graves."}},
    {"@type":"Question","name":"¿Las cacatúas necesitan semillas?","acceptedAnswer":{"@type":"Answer","text":"Las cacatúas pueden comer semillas pero no deben ser la base de su dieta. Una dieta basada en semillas carece de vitaminas esenciales y provoca obesidad hepática. Ofrezca semillas solo como complemento (máximo 10-15% de la dieta total)."}},
    {"@type":"Question","name":"¿Qué es el síndrome de deficiencia de vitamina B1 en cacatúas?","acceptedAnswer":{"@type":"Answer","text":"Es una condición causada por exceso de semillas crudas en la dieta, que contienen tiaminasa (una enzima que destruye la vitamina B1). Se manifiesta con temblores, convulsiones y problemas neurológicos. Se previene con una dieta variada basada en pellets."}}
  ],
  content: `    <p>Las <strong>cacatúas</strong> son aves psitácidas originarias de Australia y el archipiélago malayo con necesidades nutricionales bien definidas. Son especialmente propensas a problemas causados por dietas inadecuadas —especialmente las basadas en semillas— que incluyen obesidad, lipidosis hepática y deficiencias vitamínicas.</p>

    <h2>Por Qué las Cacatúas Son Sensibles a la Dieta</h2>
    <p>En su hábitat australiano, las cacatúas consumen semillas silvestres, flores, cortezas, insectos y frutos según la temporada. La clave es la <strong>variedad estacional</strong>. En cautividad, una dieta monótona de semillas reproduc el peor escenario nutricional posible porque:</p>
    <ul>
      <li>Las semillas crudas de girasol y mijo son altas en grasas y calorías pero bajas en vitaminas</li>
      <li>Las semillas contienen tiaminasa, una enzima que destruye la vitamina B1 (tiamina) esencial para el sistema nervioso</li>
      <li>El exceso de grasa de semillas causa lipidosis hepática (hígado graso)</li>
      <li>La deficiencia de vitamina A (no presente en semillas) afecta a mucosas y sistema inmune</li>
    </ul>

    <h2>Dieta Ideal para Cacatúas</h2>
    <h3>Pellets (50% de la Dieta)</h3>
    <p>Los pellets son la base más completa para cacatúas. Elija pellets sin colorantes artificiales y específicamente formulados para psitácidas medianas. Harrison's, Zupreem Natural y Roudybush son marcas reconocidas por especialistas. Evite los pellets de colores vivos (contienen colorantes artificiales que las cacatúas consumen en exceso).</p>

    <h3>Verduras Frescas (25%)</h3>
    <ul>
      <li><strong>Zanahoria:</strong> betacaroteno esencial para compensar la dieta de semillas previa</li>
      <li><strong>Brócoli y coliflor:</strong> fuente de calcio, vitamina C y K</li>
      <li><strong>Pimientos:</strong> vitamina C y betacaroteno. Las cacatúas generalmente aceptan bien los pimientos</li>
      <li><strong>Espinacas:</strong> con moderación (máximo 2 veces por semana) por los oxalatos</li>
      <li><strong>Hojas verdes variadas:</strong> acelgas, col rizada, perejil</li>
      <li><strong>Maíz fresco:</strong> en mazorca, fuente de carbohidratos complejos</li>
    </ul>

    <h3>Frutas (15%)</h3>
    <p>Las cacatúas suelen apreciar especialmente:</p>
    <ul>
      <li>Manzana (sin semillas)</li>
      <li>Pera (sin semillas)</li>
      <li>Uvas sin semillas</li>
      <li>Plátano en pequeñas cantidades</li>
      <li>Fresas y arándanos</li>
      <li>Papaya fresca</li>
    </ul>

    <h3>Semillas y Granos (10%)</h3>
    <p>Las semillas deben ser tratadas como premio o complemento. Ofrezca una mezcla variada que incluya:</p>
    <ul>
      <li>Mijo (blanco, rojo, mixto)</li>
      <li>Cañamones</li>
      <li>Semillas de girasol (con moderación — altas en grasa)</li>
      <li>Avena sin tostar</li>
      <li>Semillas germinadas (aumentan el valor nutricional y reducen la tiaminasa)</li>
    </ul>

    <h2>El Problema de las Semillas Germinadas</h2>
    <p>Una excelente forma de mejorar el valor nutricional de las semillas es germinarlas antes de ofrecerlas. El proceso de germinación:</p>
    <ul>
      <li>Inactiva la tiaminasa que destruye vitamina B1</li>
      <li>Reduce el contenido en grasa hasta un 30%</li>
      <li>Aumenta el contenido en proteínas y vitaminas del grupo B</li>
      <li>Las hace más fáciles de digerir</li>
    </ul>
    <p>Para germinar: remoje las semillas 12-24 horas, enjuague bien, deje escurrir en un colador húmedo durante 24-36 horas hasta que aparezcan pequeños brotes. Enjuague antes de ofrecer.</p>

    <h2>La Enfermedad por Deficiencia de Vitamina B1</h2>
    <p>El <strong>síndrome por deficiencia de tiamina</strong> es una condición específica de cacatúas alimentadas principalmente con semillas. Se manifiesta con:</p>
    <ul>
      <li>Temblores musculares, especialmente del cuello</li>
      <li>Opistótonos (cabeza girada hacia atrás)</li>
      <li>Dificultad para caminar</li>
      <li>Convulsiones</li>
    </ul>
    <p>Es reversible si se detecta a tiempo con suplementación de tiamina y cambio dietético. La prevención es la mejor medicina: elimine las semillas crudas como base de la dieta.</p>

    <div class="faq">
      <details><summary>¿Qué come una cacatúa?</summary><div class="faq-body">Pellets de calidad (50%), verduras frescas (25%), frutas (15%) y una pequeña cantidad de semillas (10%). Las semillas no deben ser la base de su alimentación.</div></details>
      <details><summary>¿Las cacatúas necesitan semillas?</summary><div class="faq-body">Pueden comerlas pero no deben ser la base de su dieta. Una dieta basada en semillas provoca obesidad hepática y deficiencias vitamínicas. Ofrezca semillas solo como complemento (máximo 10-15%).</div></details>
      <details><summary>¿Qué es el síndrome de deficiencia de vitamina B1 en cacatúas?</summary><div class="faq-body">Es una condición causada por exceso de semillas crudas que contienen tiaminasa (destruye vitamina B1). Se manifiesta con temblores y convulsiones. Se previene con una dieta variada basada en pellets.</div></details>
    </div>`,
  related: [
    {title: 'Dieta del Loro Yaco', desc: 'Alimentación del loro gris africano.', url: '/blog/dieta-loro-yaco.html'},
    {title: 'Vitaminas para Loros', desc: 'Qué vitaminas necesitan las psitácidas.', url: '/blog/vitaminas-para-loros.html'},
    {title: 'Enfermedades Comunes en Loros', desc: 'Síntomas y prevención de enfermedades.', url: '/blog/enfermedades-comunes-loros.html'},
  ]
})});

pages.push({ file: 'blog/mejor-comida-para-loros-espana.html', html: blogPost({
  slug: 'mejor-comida-para-loros-espana',
  title: 'Mejor Comida para Loros en España 2026: Guía de Pellets y Marcas',
  titleFull: 'Mejor Comida para Loros en España 2026: Análisis de Pellets y Alimentos',
  desc: 'Análisis de las mejores marcas de pellets y comida para loros disponibles en España. Comparativa de Harrison\'s, Roudybush, Zupreem, Versele-Laga y más.',
  keywords: 'mejor comida para loros espana, pellets loros espana, marcas comida loros, harrison loros espana, zupreem loros, roudybush espana',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuál es la mejor comida para loros en España?","acceptedAnswer":{"@type":"Answer","text":"Los pellets de alta calidad son la mejor base alimentaria para loros. En España están disponibles marcas como Harrison's Bird Foods, Roudybush, Zupreem Natural y Versele-Laga. Complementados con verduras y frutas frescas diarias, ofrecen una nutrición completa."}},
    {"@type":"Question","name":"¿Los pellets son mejores que las semillas para los loros?","acceptedAnswer":{"@type":"Answer","text":"Sí, los pellets formulados son nutricionalmente más completos que una dieta de semillas. Las semillas son altas en grasa y bajas en vitaminas esenciales. Los pellets aportan un perfil nutricional equilibrado que previene las deficiencias más comunes."}},
    {"@type":"Question","name":"¿Dónde puedo comprar comida de calidad para loros en España?","acceptedAnswer":{"@type":"Answer","text":"Las marcas de pellets de calidad (Harrison's, Roudybush, Zupreem) se encuentran en tiendas especializadas en aves exóticas, veterinarios avícolas y tiendas online especializadas. No suelen estar disponibles en cadenas generalistas de mascotas."}}
  ],
  content: `    <p>Elegir la <strong>mejor comida para loros en España</strong> es una de las decisiones más importantes que tomará como propietario. La alimentación determina en gran medida la salud, la longevidad y el bienestar de su ave. En este artículo analizamos las principales opciones disponibles en el mercado español.</p>

    <h2>Por Qué los Pellets Son la Base Recomendada</h2>
    <p>Los especialistas en medicina aviar y los criadores más experimentados de España recomiendan los pellets como base de la dieta por varias razones:</p>
    <ul>
      <li><strong>Nutrición completa y equilibrada:</strong> los pellets están formulados para aportar todas las vitaminas, minerales, proteínas y grasas que el loro necesita en proporciones correctas.</li>
      <li><strong>Previenen la selección selectiva:</strong> los loros no pueden "seleccionar solo sus partes favoritas" como hacen con una mezcla de semillas (generalmente eligiendo solo las semillas más grasas).</li>
      <li><strong>Control del peso:</strong> los pellets permiten controlar mejor la ingesta calórica y previenen la obesidad, problema frecuente en loros de semillas.</li>
      <li><strong>Higiene:</strong> no generan la cantidad de polvo y cáscara que producen las semillas.</li>
    </ul>

    <h2>Marcas de Pellets Disponibles en España</h2>

    <h3>Harrison's Bird Foods</h3>
    <p>Considerada por muchos avicultores como la marca de referencia mundial. Pellets orgánicos certificados, sin colorantes, sin conservantes artificiales. Disponible en versión High Potency (para loros en transición desde semillas) y Adult Lifetime (mantenimiento). El inconveniente es su precio elevado y menor disponibilidad en España. Se puede pedir online desde distribuidores europeos.</p>

    <h3>Roudybush</h3>
    <p>Marca americana con gran prestigio entre veterinarios especializados. Pellets sin colorantes artificiales, con niveles bajos de grasa. Especialmente recomendada para loros propensos a sobrepeso. Disponible en varias texturas (crumbles para loros pequeños, pellets medianos y grandes para guacamayos).</p>

    <h3>Zupreem Natural</h3>
    <p>La línea Natural de Zupreem (sin colorantes) es la más recomendada de esta marca. Precio más accesible que Harrison's y Roudybush. Disponible en grandes superficies especializadas y online en España. Evite las versiones de colores (contienen colorantes artificiales).</p>

    <h3>Versele-Laga (Loro Parque Nutricion)</h3>
    <p>La línea desarrollada en colaboración con el Loro Parque de Tenerife está especialmente adaptada a las psitácidas ibéricas. Disponible en tiendas especializadas españolas con mayor facilidad que las marcas americanas. Buena relación calidad-precio.</p>

    <h3>Cédé (Aves exóticas)</h3>
    <p>Marca europea con buena distribución en España. No es específicamente de pellets pero sus mezclas enriquecidas son una transición aceptable. Menos completa nutricionalmente que las marcas anteriores pero más fácil de encontrar.</p>

    <h2>Comparativa de Marcas</h2>
    <table>
      <thead><tr><th>Marca</th><th>Calidad</th><th>Precio</th><th>Disponibilidad España</th></tr></thead>
      <tbody>
        <tr><td>Harrison's</td><td>⭐⭐⭐⭐⭐</td><td>Alto</td><td>Online / Veterinarios</td></tr>
        <tr><td>Roudybush</td><td>⭐⭐⭐⭐⭐</td><td>Alto</td><td>Online especializado</td></tr>
        <tr><td>Zupreem Natural</td><td>⭐⭐⭐⭐</td><td>Medio</td><td>Buena (tiendas y online)</td></tr>
        <tr><td>Loro Parque Nutricion</td><td>⭐⭐⭐⭐</td><td>Medio</td><td>Buena (España)</td></tr>
        <tr><td>Cédé</td><td>⭐⭐⭐</td><td>Bajo-Medio</td><td>Muy buena</td></tr>
      </tbody>
    </table>

    <h2>Transición de Semillas a Pellets</h2>
    <p>Si su loro está acostumbrado a comer semillas, la transición a pellets requiere paciencia. Es un proceso gradual que puede llevar semanas o meses:</p>
    <ul>
      <li><strong>Semana 1-2:</strong> mezcle pellets en una proporción 10% pellets / 90% semillas. El loro los ignorará al principio.</li>
      <li><strong>Semana 3-4:</strong> aumente a 25% pellets / 75% semillas.</li>
      <li><strong>Mes 2:</strong> 50% pellets / 50% semillas.</li>
      <li><strong>Mes 3:</strong> 80% pellets / 20% semillas.</li>
      <li><strong>Objetivo:</strong> pellets como base con verduras y fruta fresca diaria.</li>
    </ul>
    <p>Nunca quite todas las semillas de golpe. Monitorice el peso del ave durante la transición. Si pierde más del 10% del peso en una semana, ralentice el proceso.</p>

    <div class="faq">
      <details><summary>¿Cuál es la mejor comida para loros en España?</summary><div class="faq-body">Los pellets de alta calidad son la mejor base. Harrison's, Roudybush, Zupreem Natural y Loro Parque Nutricion son las marcas más recomendadas por especialistas en España.</div></details>
      <details><summary>¿Los pellets son mejores que las semillas?</summary><div class="faq-body">Sí, nutricionalmente son más completos. Las semillas son altas en grasa y bajas en vitaminas esenciales. Los pellets aportan un perfil nutricional equilibrado que previene las deficiencias más comunes.</div></details>
      <details><summary>¿Dónde puedo comprar comida de calidad para loros en España?</summary><div class="faq-body">En tiendas especializadas en aves exóticas, veterinarios avícolas y tiendas online especializadas. Las marcas premium (Harrison's, Roudybush) no suelen estar en cadenas generalistas.</div></details>
    </div>`,
  related: [
    {title: 'Vitaminas para Loros', desc: 'Suplementación vitamínica para psitácidas.', url: '/blog/vitaminas-para-loros.html'},
    {title: 'Calendario de Alimentación para Loros', desc: 'Cómo organizar la dieta semana a semana.', url: '/blog/calendario-alimentacion-loros.html'},
    {title: 'Dieta del Loro Yaco', desc: 'Alimentación específica del loro gris africano.', url: '/blog/dieta-loro-yaco.html'},
  ]
})});

pages.push({ file: 'blog/calendario-alimentacion-loros.html', html: blogPost({
  slug: 'calendario-alimentacion-loros',
  title: 'Calendario de Alimentación para Loros: Plan Semanal Completo',
  titleFull: 'Calendario de Alimentación para Loros: Plan Semanal y Menú Diario',
  desc: 'Descarga y aplica un calendario de alimentación semanal para tu loro. Con verduras, frutas, pellets y semillas organizados día a día para una dieta equilibrada.',
  keywords: 'calendario alimentacion loros, menu semanal loro, dieta semanal loro, plan alimentacion loro, horario comida loro',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cada cuánto tiempo debo cambiar la comida del loro?","acceptedAnswer":{"@type":"Answer","text":"La fruta y verdura fresca debe cambiarse dos veces al día (mañana y tarde) o al menos retirar los restos a las 2-3 horas para evitar fermentación. Los pellets pueden estar disponibles todo el día pero se retiran y renuevan cada 24 horas."}},
    {"@type":"Question","name":"¿Hay que variar la dieta del loro cada día?","acceptedAnswer":{"@type":"Answer","text":"Sí. La variedad es clave en la nutrición aviar. Rote las verduras y frutas cada día para asegurar un perfil nutricional completo y prevenir deficiencias. Un loro que siempre come lo mismo puede desarrollar carencias o rechazar alimentos nuevos."}},
    {"@type":"Question","name":"¿Los loros deben comer a horarios fijos?","acceptedAnswer":{"@type":"Answer","text":"Es recomendable establecer horarios regulares para los loros. Un ritmo fijo de alimentación reduce el estrés, facilita el control del peso y establece una rutina que los loros aprecian. El alimento fresco por las mañanas y los pellets disponibles todo el día es el patrón más habitual."}}
  ],
  content: `    <p>Organizar la <strong>alimentación de un loro</strong> mediante un calendario semanal estructurado es la mejor forma de asegurar variedad nutricional, evitar déficits vitamínicos y crear rutinas saludables para el ave. Este plan práctico es aplicable a las especies más comunes: loro gris africano, guacamayo, amazona y cacatúa.</p>

    <h2>Principios del Calendario de Alimentación</h2>
    <p>Antes de ver el plan concreto, estos son los principios que guían cualquier calendario de alimentación saludable para loros:</p>
    <ul>
      <li><strong>Variedad sobre repetición:</strong> rote los alimentos frescos cada día para proporcionar un perfil nutricional completo.</li>
      <li><strong>Base estable:</strong> los pellets de calidad son el ancla nutricional — siempre presentes.</li>
      <li><strong>Colores variados:</strong> un plato de diferentes colores (naranja, verde oscuro, rojo) suele garantizar diversidad de nutrientes.</li>
      <li><strong>Horarios regulares:</strong> los loros aprecian la rutina. Alimente a las mismas horas cada día.</li>
      <li><strong>Retirada oportuna:</strong> retire la fruta y verdura fresca a las 2-3 horas de ofrecerla.</li>
    </ul>

    <h2>Plan de Alimentación Semanal para Loros</h2>

    <h3>Lunes</h3>
    <ul>
      <li>🌅 Mañana: zanahoria rallada + brócoli + arándanos + pellets</li>
      <li>🌆 Tarde: pellets frescos + pequeño trozo de nuez</li>
    </ul>

    <h3>Martes</h3>
    <ul>
      <li>🌅 Mañana: pimiento rojo + kale + trozos de mango + pellets</li>
      <li>🌆 Tarde: pellets + semillas germinadas (pequeña cantidad)</li>
    </ul>

    <h3>Miércoles</h3>
    <ul>
      <li>🌅 Mañana: boniato crudo + espinacas + papaya + pellets</li>
      <li>🌆 Tarde: pellets + almendras crudas (1-2 unidades)</li>
    </ul>

    <h3>Jueves</h3>
    <ul>
      <li>🌅 Mañana: calabaza fresca + judías verdes + uvas sin semillas + pellets</li>
      <li>🌆 Tarde: pellets frescos + maíz fresco (pequeña cantidad)</li>
    </ul>

    <h3>Viernes</h3>
    <ul>
      <li>🌅 Mañana: zanahoria + col rizada + fresas + pellets</li>
      <li>🌆 Tarde: pellets + piñones o semillas de calabaza</li>
    </ul>

    <h3>Sábado</h3>
    <ul>
      <li>🌅 Mañana: pimiento amarillo + apio + plátano (trozo pequeño) + pellets</li>
      <li>🌆 Tarde: pellets + mezcla de frutas del bosque (arándanos, frambuesas)</li>
    </ul>

    <h3>Domingo</h3>
    <ul>
      <li>🌅 Mañana: brócoli + hojas de remolacha + kiwi + pellets</li>
      <li>🌆 Tarde: pellets frescos + nuez de Brasil (1 unidad)</li>
    </ul>

    <div class="info-box">
      <p>💡 <strong>Consejo:</strong> Prepare las verduras de la semana los domingos: lávelas, córtelas en porciones individuales y guárdelas en recipientes herméticos en la nevera. Esto facilita enormemente la alimentación diaria y asegura la variedad.</p>
    </div>

    <h2>Adaptar el Calendario por Especie</h2>
    <h3>Loro Gris Africano (Yaco)</h3>
    <p>Aumente la proporción de verduras ricas en calcio (brócoli, kale) y betacaroteno (zanahoria, boniato). Son especialmente propensos a hipocalcemia.</p>

    <h3>Guacamayo</h3>
    <p>Incorpore más frutos secos al calendario (nueces de Brasil, macadamia, almendras). El guacamayo jacinto necesita mayor porcentaje de grasas saludables.</p>

    <h3>Cacatúa</h3>
    <p>Reduzca las semillas al mínimo y asegure un aporte de tiamina (evitando semillas crudas en exceso). Las cacatúas son especialmente propensas a sobrepeso con dietas de semillas.</p>

    <h3>Amazona</h3>
    <p>Las amazonas son propensas a obesidad. Limite las frutas más dulces (plátano, higo) y aumente las verduras de hoja verde. El maíz fresco es un alimento muy apreciado por las amazonas.</p>

    <h2>Señales de Que la Dieta No Funciona</h2>
    <ul>
      <li>Plumaje opaco o con franjas de color anormal</li>
      <li>Pico con costras o deformaciones</li>
      <li>Diarrea frecuente o heces de color muy anormal</li>
      <li>Pérdida de peso progresiva</li>
      <li>Plumafagia (autoarranque de plumas)</li>
      <li>Letargia y falta de energía</li>
    </ul>
    <p>Ante cualquiera de estos signos, consulte con un veterinario especialista en aves exóticas. Consulte también nuestro artículo sobre <a href="/blog/como-saber-si-loro-esta-enfermo.html">cómo saber si un loro está enfermo</a>.</p>

    <div class="faq">
      <details><summary>¿Cada cuánto tiempo debo cambiar la comida del loro?</summary><div class="faq-body">La fruta y verdura fresca debe cambiarse o retirarse a las 2-3 horas. Los pellets pueden estar disponibles todo el día pero se renuevan cada 24 horas.</div></details>
      <details><summary>¿Hay que variar la dieta del loro cada día?</summary><div class="faq-body">Sí. La variedad es clave. Rote las verduras y frutas cada día para asegurar un perfil nutricional completo y prevenir deficiencias.</div></details>
      <details><summary>¿Los loros deben comer a horarios fijos?</summary><div class="faq-body">Es muy recomendable. Un ritmo fijo reduce el estrés, facilita el control del peso y establece una rutina que los loros aprecian.</div></details>
    </div>`,
  related: [
    {title: 'Frutas para Loros', desc: 'Guía de frutas seguras para psitácidas.', url: '/blog/frutas-para-loros.html'},
    {title: 'Verduras para Loros', desc: 'Los mejores vegetales para tu loro.', url: '/blog/verduras-para-loros.html'},
    {title: 'Mejor Comida para Loros en España', desc: 'Análisis de marcas de pellets.', url: '/blog/mejor-comida-para-loros-espana.html'},
  ]
})});

pages.push({ file: 'blog/vitaminas-para-loros.html', html: blogPost({
  slug: 'vitaminas-para-loros',
  title: 'Vitaminas para Loros: Cuáles Necesitan y Cómo Suplementarlas',
  titleFull: 'Vitaminas para Loros: Guía Completa de Suplementación y Deficiencias',
  desc: 'Descubre qué vitaminas necesitan los loros, cuáles son las deficiencias más comunes y cómo suplementar correctamente sin provocar intoxicaciones vitamínicas.',
  keywords: 'vitaminas para loros, suplementos vitaminas loros, vitamina a loros, vitamina d3 loros, deficiencia vitamina loro',
  badge: '🥦 Alimentación',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Qué vitaminas necesitan los loros?","acceptedAnswer":{"@type":"Answer","text":"Los loros necesitan vitamina A (o betacaroteno), vitamina D3, vitaminas del grupo B (especialmente B1 y B12), vitamina C, vitamina E y vitamina K. Las más frecuentemente deficientes son la vitamina A y la D3, especialmente en loros de interior."}},
    {"@type":"Question","name":"¿Debo suplementar con vitaminas si mi loro come pellets?","acceptedAnswer":{"@type":"Answer","text":"Si su loro come pellets de calidad (Harrison's, Roudybush, Zupreem Natural) como base de la dieta, generalmente no necesita suplementación vitamínica adicional. Los pellets ya contienen los niveles óptimos de todas las vitaminas necesarias."}},
    {"@type":"Question","name":"¿Puede una sobredosis de vitaminas dañar a un loro?","acceptedAnswer":{"@type":"Answer","text":"Sí. Las vitaminas liposolubles (A, D, E, K) pueden acumularse en el organismo y causar hipervitaminosis. La sobredosis de vitamina A y D3 son especialmente peligrosas. Nunca suplementes sin diagnóstico veterinario previo."}}
  ],
  content: `    <p>Las <strong>vitaminas para loros</strong> son micronutrientes esenciales que el organismo de las psitácidas no puede sintetizar en suficiente cantidad por sí solo. La deficiencia vitamínica es uno de los problemas de salud más frecuentes en loros en cautividad, especialmente en los alimentados con dietas basadas en semillas.</p>

    <h2>Las Vitaminas Esenciales para Loros</h2>

    <h3>Vitamina A — La Más Crítica</h3>
    <p>La vitamina A es la deficiencia nutricional más común en psitácidas en captividad. Es esencial para:</p>
    <ul>
      <li>La integridad de las mucosas (vías respiratorias, digestivas y reproductivas)</li>
      <li>El sistema inmunológico</li>
      <li>La salud ocular</li>
      <li>La calidad del plumaje</li>
    </ul>
    <p><strong>Fuentes naturales:</strong> betacaroteno en zanahorias, boniato, pimientos rojos/naranja, mango, papaya, calabaza. El organismo del loro convierte el betacaroteno en vitamina A según sus necesidades, lo que hace que sea imposible la intoxicación por fuentes vegetales (a diferencia de la vitamina A preformada en suplementos).</p>
    <p><strong>Síntomas de deficiencia:</strong> sinusitis recurrente, descargas nasales, problemas respiratorios, pérdida de voz, queratinización de las mucosas, infecciones frecuentes.</p>

    <h3>Vitamina D3 — La Vitamina del Sol</h3>
    <p>La vitamina D3 es esencial para la absorción del calcio. Los loros en interiores sin acceso a luz ultravioleta natural son especialmente propensos a su deficiencia. El vidrio de las ventanas filtra los rayos UV necesarios para la síntesis de vitamina D3 en la piel.</p>
    <p><strong>Fuentes:</strong> exposición directa al sol (sin cristal), pellets que contienen D3, lámparas UV específicas para aves (longitud de onda 340-360 nm).</p>
    <p><strong>Síntomas de deficiencia:</strong> en el loro yaco se manifiesta como hipocalcemia (temblores, convulsiones); en otras especies, debilidad ósea y problemas reproductivos.</p>
    <p><strong>Precaución:</strong> la vitamina D3 es liposoluble y puede causar intoxicación si se suplementa en exceso. Nunca la suplementes sin diagnóstico veterinario.</p>

    <h3>Vitaminas del Grupo B</h3>
    <p>El grupo B incluye varias vitaminas esenciales para el metabolismo energético y el sistema nervioso:</p>
    <ul>
      <li><strong>B1 (Tiamina):</strong> especialmente importante en cacatúas. Las semillas crudas contienen tiaminasa que destruye esta vitamina. Se previene con una dieta variada con pellets.</li>
      <li><strong>B2 (Riboflavina):</strong> esencial para el crecimiento y la energía celular.</li>
      <li><strong>B12:</strong> necesaria para la formación de glóbulos rojos y la función neurológica.</li>
      <li><strong>Biotina (B7):</strong> para la salud del plumaje y la piel.</li>
      <li><strong>Ácido fólico (B9):</strong> necesario en periodos de cría y crecimiento.</li>
    </ul>

    <h3>Vitamina E</h3>
    <p>Antioxidante liposoluble esencial para la función reproductiva, muscular e inmunológica. Las fuentes naturales incluyen frutos secos (almendras, avellanas), semillas de girasol y verduras de hoja verde.</p>

    <h3>Vitamina C</h3>
    <p>Los loros pueden sintetizar algo de vitamina C internamente, pero la aportación dietética es beneficiosa. Presente en pimientos, kiwi, naranja y frutas tropicales.</p>

    <h2>¿Cuándo Suplementar con Vitaminas?</h2>
    <div class="info-box">
      <p>💊 <strong>Regla de oro:</strong> Si su loro come pellets de calidad como base de la dieta, NO necesita suplementación vitamínica adicional. Los pellets ya contienen los niveles óptimos. La suplementación sin diagnóstico puede causar hipervitaminosis.</p>
    </div>
    <p>La suplementación sí está indicada en estos casos, siempre bajo supervisión veterinaria:</p>
    <ul>
      <li>Transición desde dieta de semillas hacia pellets</li>
      <li>Deficiencias confirmadas por análisis de sangre</li>
      <li>Periodos de cría, muda o enfermedad</li>
      <li>Aves con problemas de absorción intestinal</li>
      <li>Loros que rechazan los pellets y comen principalmente semillas</li>
    </ul>

    <h2>Riesgos de la Sobredosis Vitamínica</h2>
    <p>Las vitaminas liposolubles (A, D, E, K) se almacenan en el tejido graso y pueden acumularse hasta niveles tóxicos:</p>
    <ul>
      <li><strong>Hipervitaminosis A:</strong> paradójicamente causa síntomas similares a la deficiencia: fragilidad ósea, daño hepático</li>
      <li><strong>Hipervitaminosis D3:</strong> calcificación de tejidos blandos (riñones, vasos sanguíneos), puede ser mortal</li>
    </ul>

    <div class="faq">
      <details><summary>¿Qué vitaminas necesitan los loros?</summary><div class="faq-body">Las más importantes son vitamina A, D3, las del grupo B (especialmente B1 y B12), vitamina C, E y K. Las más frecuentemente deficientes son la A y la D3.</div></details>
      <details><summary>¿Debo suplementar si mi loro come pellets?</summary><div class="faq-body">No. Los pellets de calidad ya contienen los niveles óptimos. La suplementación sin necesidad puede causar hipervitaminosis.</div></details>
      <details><summary>¿Puede una sobredosis de vitaminas dañar a un loro?</summary><div class="faq-body">Sí. Las vitaminas liposolubles (A, D, E, K) se acumulan en el organismo. La sobredosis de A y D3 es especialmente peligrosa. Nunca suplementes sin diagnóstico veterinario.</div></details>
    </div>`,
  related: [
    {title: 'Mejor Comida para Loros en España', desc: 'Análisis de marcas de pellets.', url: '/blog/mejor-comida-para-loros-espana.html'},
    {title: 'Dieta del Loro Yaco', desc: 'Alimentación específica del loro gris africano.', url: '/blog/dieta-loro-yaco.html'},
    {title: 'Alimentos Tóxicos para Loros', desc: 'Lo que nunca debe comer tu loro.', url: '/blog/alimentos-toxicos-loros.html'},
  ]
})});

// ─── CLUSTER 2: HEALTH ────────────────────────────────────────────────────

pages.push({ file: 'blog/como-saber-si-loro-esta-enfermo.html', html: blogPost({
  slug: 'como-saber-si-loro-esta-enfermo',
  title: '¿Cómo Saber si un Loro Está Enfermo? Señales de Alerta',
  titleFull: 'Cómo Saber si un Loro Está Enfermo: 15 Señales de Alerta Tempranas',
  desc: 'Aprende a identificar las señales que indican que tu loro puede estar enfermo. 15 síntomas que no debes ignorar y cuándo acudir urgente al veterinario.',
  keywords: 'como saber si un loro esta enfermo, señales loro enfermo, sintomas loro enfermo, loro enfermo que hacer, loro plumas erizadas signos enfermedad',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuáles son las señales de que un loro está enfermo?","acceptedAnswer":{"@type":"Answer","text":"Las señales más comunes son: plumas permanentemente erizadas, ojos semicerrados fuera del horario de sueño, pérdida de apetito, cambios en las heces, pérdida de peso visible, letargia, respiración con ruido o con la boca abierta, y descargas nasales u oculares."}},
    {"@type":"Question","name":"¿Por qué los loros ocultan la enfermedad?","acceptedAnswer":{"@type":"Answer","text":"Es un instinto evolutivo de supervivencia. En estado salvaje, un loro que muestra debilidad atrae depredadores o pierde su posición en la bandada. Por eso, cuando un loro muestra síntomas visibles de enfermedad, a menudo ya lleva días o semanas sintiéndose mal."}},
    {"@type":"Question","name":"¿Cuándo es una urgencia veterinaria con un loro?","acceptedAnswer":{"@type":"Answer","text":"Acuda inmediatamente si observa: respiración con la boca abierta, caída del palo o incapacidad para mantenerse en pie, convulsiones, sangrado, incapacidad para volar o moverse, o si el ave está en el suelo de la jaula sin moverse."}}
  ],
  content: `    <p>Una de las características más peligrosas de los loros es su instinto de <strong>ocultar la enfermedad</strong>. En estado salvaje, mostrar debilidad significa atraer depredadores. Por eso, cuando un loro muestra síntomas evidentes de enfermedad, a menudo ya lleva días o semanas sintiéndose mal. Conocer las señales tempranas puede salvar la vida de su ave.</p>

    <h2>Por Qué los Loros Ocultan la Enfermedad</h2>
    <p>Este comportamiento, llamado "disimulación de la enfermedad" o "stoic illness", es común a todas las psitácidas y psittaciformes. Implica que:</p>
    <ul>
      <li>Un loro puede parecer "normal" ante su propietario pero estar gravemente enfermo</li>
      <li>Cuando la enfermedad supera la capacidad del ave para disimular, suele estar en fase avanzada</li>
      <li>La observación diaria del comportamiento habitual del ave es la mejor herramienta diagnóstica del propietario</li>
      <li>Los chequeos veterinarios periódicos son imprescindibles, incluso en aves aparentemente sanas</li>
    </ul>

    <h2>Las 15 Señales de Alerta de un Loro Enfermo</h2>

    <h3>Señales de Alta Urgencia — Acuda Inmediatamente al Veterinario</h3>
    <ul>
      <li><strong>Respiración con la boca abierta:</strong> indica dificultad respiratoria severa. Es una urgencia absoluta.</li>
      <li><strong>Caída del palo o estar en el suelo de la jaula:</strong> el loro sano siempre se mantiene en el palo. Estar en el suelo indica extrema debilidad.</li>
      <li><strong>Convulsiones o temblores intensos:</strong> pueden indicar hipocalcemia, intoxicación o enfermedad neurológica.</li>
      <li><strong>Sangrado visible:</strong> de cualquier zona del cuerpo.</li>
      <li><strong>Incapacidad total para moverse o reaccionar:</strong> estado de colapso.</li>
    </ul>

    <h3>Señales que Requieren Consulta Veterinaria en 24-48 horas</h3>
    <ul>
      <li><strong>Plumas permanentemente erizadas:</strong> los loros erizan las plumas para retener calor cuando tienen fiebre o se sienten mal. Si las tiene erizadas continuamente fuera del horario de sueño, es una señal de alarma.</li>
      <li><strong>Ojos semicerrados durante el día:</strong> el loro sano tiene los ojos completamente abiertos y alerta durante el día.</li>
      <li><strong>Cambios drásticos en las heces:</strong> diarrea persistente, heces totalmente acuosas, color negro (puede indicar sangrado intestinal), verde brillante sin haber comido nada verde.</li>
      <li><strong>Pérdida visible de peso:</strong> palpe suavemente el esternón. Si nota el hueso muy prominente, hay pérdida de masa muscular significativa.</li>
      <li><strong>Descargas nasales u oculares:</strong> secreciones en orificios nasales u ojos, costras alrededor del pico o los ojos.</li>
      <li><strong>Pérdida de apetito de más de 24 horas:</strong> un loro que rechaza completamente la comida durante más de un día necesita valoración veterinaria.</li>
      <li><strong>Respiración audible:</strong> si oye chasquidos, silbidos o "click" al respirar, puede indicar infección respiratoria.</li>
      <li><strong>Cambios de comportamiento drásticos:</strong> un loro sociable que de repente se vuelve agresivo, o un loro activo que pasa todo el día inmóvil, puede estar enfermo.</li>
    </ul>

    <h3>Señales de Monitoreo (Consulta en los Próximos Días)</h3>
    <ul>
      <li><strong>Pérdida de vocalización habitual:</strong> un loro que siempre vocaliza pero de repente está silencioso puede tener un problema de vías respiratorias superiores.</li>
      <li><strong>Cambios en la pluma:</strong> plumas de contorno anormal, estrías transversales ("líneas de estrés"), zonas sin plumas.</li>
      <li><strong>Dificultad para tomar alimento:</strong> si observa al loro intentar comer sin éxito, puede haber un problema en el pico o la boca.</li>
    </ul>

    <h2>Cómo Monitorear la Salud de su Loro Diariamente</h2>
    <ul>
      <li>Observe al loro cada mañana durante 2-3 minutos antes de interactuar con él</li>
      <li>Controle el peso mensualmente con una báscula de cocina precisa</li>
      <li>Limpie la bandeja de la jaula diariamente y observe la normalidad de las heces</li>
      <li>Lleve un registro de peso y comportamiento en un cuaderno o app</li>
      <li>Programe chequeos veterinarios anuales aunque el ave parezca sana</li>
    </ul>

    <div class="faq">
      <details><summary>¿Cuáles son las señales de que un loro está enfermo?</summary><div class="faq-body">Plumas permanentemente erizadas, ojos semicerrados fuera del horario de sueño, pérdida de apetito, cambios en las heces, pérdida de peso, letargia, respiración ruidosa o con boca abierta, y descargas nasales u oculares.</div></details>
      <details><summary>¿Por qué los loros ocultan la enfermedad?</summary><div class="faq-body">Es un instinto evolutivo de supervivencia. En estado salvaje, mostrar debilidad atrae depredadores. Por eso cuando un loro muestra síntomas visibles, a menudo ya lleva días sintiéndose mal.</div></details>
      <details><summary>¿Cuándo es una urgencia veterinaria?</summary><div class="faq-body">Acuda inmediatamente si observa: respiración con la boca abierta, caída del palo, convulsiones, sangrado o incapacidad para moverse.</div></details>
    </div>`,
  related: [
    {title: 'Enfermedades Comunes en Loros', desc: 'Las enfermedades más frecuentes y sus síntomas.', url: '/blog/enfermedades-comunes-loros.html'},
    {title: 'Veterinario de Aves Exóticas en España', desc: 'Cómo encontrar el especialista adecuado.', url: '/blog/veterinario-aves-exoticas-espana.html'},
    {title: 'Primeros Auxilios para Loros', desc: 'Qué hacer en situaciones de emergencia.', url: '/blog/primeros-auxilios-loros.html'},
  ]
})});

pages.push({ file: 'blog/acaros-en-loros.html', html: blogPost({
  slug: 'acaros-en-loros',
  title: 'Ácaros en Loros: Síntomas, Tipos y Tratamiento',
  titleFull: 'Ácaros en Loros: Cómo Identificarlos, Tratarlos y Prevenirlos',
  desc: 'Guía completa sobre los ácaros en loros: tipos (ácaros de plumas, de escamas, de tráquea), síntomas, diagnóstico veterinario y tratamientos disponibles en España.',
  keywords: 'acaros en loros, acaros loros tratamiento, loro tiene acaros, knemidocoptes loros, acaros plumas loro',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cómo sé si mi loro tiene ácaros?","acceptedAnswer":{"@type":"Answer","text":"Los síntomas varían según el tipo de ácaro. Los ácaros de escamas (Knemidocoptes) causan engrosamiento costroso del pico y escamas alrededor de los ojos y las patas. Los ácaros de plumas producen picor intenso. Los ácaros de tráquea causan problemas respiratorios."}},
    {"@type":"Question","name":"¿Los ácaros de loros se contagian a personas?","acceptedAnswer":{"@type":"Answer","text":"Los ácaros específicos de aves (Knemidocoptes pilae, ácaros de plumas) generalmente no infestan a personas de forma persistente. Pueden causar picazón temporal al contacto pero no se establecen en la piel humana."}},
    {"@type":"Question","name":"¿Cuál es el tratamiento para ácaros en loros?","acceptedAnswer":{"@type":"Answer","text":"Depende del tipo de ácaro. Los ácaros de escamas se tratan con ivermectina o moxidectina (prescripción veterinaria). Los ácaros de plumas con baños específicos y/o antiparasitarios. Nunca aplique productos sin diagnóstico veterinario previo."}}
  ],
  content: `    <p>Los <strong>ácaros en loros</strong> son parásitos externos que pueden afectar seriamente la calidad de vida del ave y, en casos severos, su salud general. Existen varios tipos de ácaros que parasitan a las psitácidas, y cada uno presenta síntomas y tratamiento diferente.</p>

    <h2>Tipos de Ácaros que Afectan a los Loros</h2>

    <h3>Knemidocoptes pilae — Ácaros de Escamas (Sarna Cnemidocóptica)</h3>
    <p>Es el tipo de ácaro más común en psitácidas, especialmente en periquitos, pero también afecta a otras especies. Estos ácaros microscópicos viven en las capas superficiales de la piel, especialmente alrededor del pico, los ojos, las patas y la cloaca.</p>
    <p><strong>Síntomas:</strong></p>
    <ul>
      <li>Engrosamiento y deformación del pico con aspecto esponjoso o costroso</li>
      <li>Acumulación de escamas blanquecinas alrededor del pico (comisuras)</li>
      <li>Costras y escamas en las patas</li>
      <li>Enrojecimiento alrededor de los ojos</li>
      <li>En casos avanzados, deformación permanente del pico</li>
    </ul>
    <p><strong>Diagnóstico:</strong> el veterinario realiza raspado de piel y lo examina al microscopio para identificar los ácaros.</p>
    <p><strong>Tratamiento:</strong> ivermectina o moxidectina (prescripción veterinaria). El tratamiento es altamente efectivo si se inicia a tiempo.</p>

    <h3>Dermanyssus gallinae — Ácaro Rojo o de las Gallinas</h3>
    <p>Aunque más asociado a aves de corral, puede afectar a psitácidas en cautividad, especialmente si comparten espacio o están cerca de gallinas o pájaros silvestres. El ácaro rojo es nocturno: se alimenta de sangre durante la noche y se esconde en grietas de la jaula durante el día.</p>
    <p><strong>Síntomas:</strong></p>
    <ul>
      <li>Picor intenso, especialmente nocturno</li>
      <li>Anemia en infestaciones severas (mucosas pálidas)</li>
      <li>Inquietud nocturna, el ave se rasca constantemente</li>
      <li>Manchas rojizas pequeñas visibles en la jaula (ácaros llenos de sangre)</li>
    </ul>
    <p><strong>Tratamiento:</strong> requiere tratar tanto al ave como la jaula y el entorno. Consulte al veterinario para el antiparasitario apropiado y desinfecte toda la jaula con productos específicos.</p>

    <h3>Sternostoma tracheacolum — Ácaro de Tráquea</h3>
    <p>Estos ácaros viven en la tráquea y los sacos aéreos del loro, causando problemas respiratorios. Son especialmente peligrosos porque pueden pasar desapercibidos hasta fases avanzadas.</p>
    <p><strong>Síntomas:</strong></p>
    <ul>
      <li>Respiración con ruidos (chasquidos, silbidos)</li>
      <li>Tos frecuente</li>
      <li>Dificultad respiratoria progresiva</li>
      <li>En casos severos, la boca abierta para respirar</li>
    </ul>
    <p><strong>Diagnóstico:</strong> radiografía, endoscopia o análisis específicos.</p>
    <p><strong>Tratamiento:</strong> ivermectina o moxidectina bajo prescripción y supervisión veterinaria estricta.</p>

    <h2>Cómo Prevenir los Ácaros en Loros</h2>
    <ul>
      <li>Cuarentena de 30-40 días para cualquier ave nueva antes de introducirla junto a otras</li>
      <li>Limpieza semanal exhaustiva de la jaula con agua caliente y jabón</li>
      <li>Inspección visual regular del plumaje y el pico del loro</li>
      <li>Evitar el contacto con aves de procedencia desconocida o aves silvestres</li>
      <li>Chequeos veterinarios anuales que incluyan evaluación parasitológica</li>
    </ul>

    <div class="info-box">
      <p>⚠️ <strong>Importante:</strong> Nunca aplique antiparasitarios sin prescripción veterinaria. Los productos para perros o gatos son tóxicos para aves. Algunos antiparasitarios aviares mal dosificados también pueden ser peligrosos.</p>
    </div>

    <div class="faq">
      <details><summary>¿Cómo sé si mi loro tiene ácaros?</summary><div class="faq-body">Los ácaros de escamas (Knemidocoptes) causan engrosamiento costroso del pico. Los de plumas producen picor intenso. Los de tráquea causan respiración con ruidos. Cualquiera de estos síntomas requiere diagnóstico veterinario.</div></details>
      <details><summary>¿Los ácaros de loros se contagian a personas?</summary><div class="faq-body">Los ácaros específicos de aves generalmente no infestan a personas de forma persistente. Pueden causar picazón temporal al contacto pero no se establecen en la piel humana.</div></details>
      <details><summary>¿Cuál es el tratamiento para ácaros en loros?</summary><div class="faq-body">Depende del tipo. Los ácaros de escamas se tratan con ivermectina o moxidectina (prescripción veterinaria). Nunca aplique productos sin diagnóstico previo.</div></details>
    </div>`,
  related: [
    {title: 'Enfermedades Comunes en Loros', desc: 'Las enfermedades más frecuentes y sus síntomas.', url: '/blog/enfermedades-comunes-loros.html'},
    {title: 'Cómo Saber si un Loro Está Enfermo', desc: '15 señales de alerta tempranas.', url: '/blog/como-saber-si-loro-esta-enfermo.html'},
    {title: 'Cómo Cuidar el Pico de un Loro', desc: 'Mantenimiento y salud del pico.', url: '/blog/cuidado-pico-loro.html'},
  ]
})});

pages.push({ file: 'blog/primeros-auxilios-loros.html', html: blogPost({
  slug: 'primeros-auxilios-loros',
  title: 'Primeros Auxilios para Loros: Qué Hacer en una Emergencia',
  titleFull: 'Primeros Auxilios para Loros: Guía de Emergencias Aviares en España',
  desc: 'Guía de primeros auxilios para loros: qué hacer si tu loro tiene una emergencia, cómo estabilizarlo y cuándo acudir urgente al veterinario de aves exóticas.',
  keywords: 'primeros auxilios loros, emergencia loro, loro herido que hacer, loro convulsiones primeros auxilios, veterinario urgencias aves exoticas espana',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Qué hago si mi loro se cae y no puede volar?","acceptedAnswer":{"@type":"Answer","text":"Coloque al loro en un lugar seguro y cálido (30-32°C). No intente forzar el movimiento de alas ni extremidades. Cúbralo con una tela suave para reducir el estrés y acuda inmediatamente al veterinario especialista en aves exóticas."}},
    {"@type":"Question","name":"¿Qué hago si mi loro está sangrando?","acceptedAnswer":{"@type":"Answer","text":"Aplique presión suave con una gasa estéril sobre la herida. Si sangra una pluma de sangre (pin feather), puede extraerse con una pinza en dirección de crecimiento. En heridas mayores, mantenga la presión y acuda urgente al veterinario."}},
    {"@type":"Question","name":"¿Cómo mantener caliente a un loro enfermo o herido?","acceptedAnswer":{"@type":"Answer","text":"Coloque al loro en una caja con ventilación y una toalla cálida. Puede usar una lámpara incandescente a 30 cm de la caja para calentarla parcialmente, dejando que el loro pueda alejarse del calor si lo necesita. La temperatura objetivo es 30-32°C."}}
  ],
  content: `    <p>Las <strong>emergencias aviares</strong> pueden ocurrir en cualquier momento. Saber cómo actuar en los primeros minutos puede marcar la diferencia entre la vida y la muerte de su loro. Esta guía le prepara para las situaciones de emergencia más comunes.</p>

    <div class="info-box">
      <p>🚨 <strong>Principio fundamental:</strong> Los primeros auxilios aviares tienen un único objetivo: estabilizar al ave y trasladarla al veterinario lo antes posible. No sustituyen la atención veterinaria profesional.</p>
    </div>

    <h2>Botiquín Básico para Loros</h2>
    <p>Tenga siempre a mano:</p>
    <ul>
      <li>Gasas estériles y vendas autoadhesivas para aves</li>
      <li>Suero salino fisiológico (para limpiar heridas)</li>
      <li>Pinzas hemostáticas (para plumas de sangre rotas)</li>
      <li>Harina de maíz o polvo hemostático (para cortar sangrados menores)</li>
      <li>Termómetro digital</li>
      <li>Caja de transporte con ventilación</li>
      <li>Paño oscuro para cubrir la caja y reducir el estrés</li>
      <li>Número del veterinario de aves exóticas más cercano</li>
    </ul>

    <h2>Emergencias Comunes y Cómo Actuar</h2>

    <h3>Convulsiones</h3>
    <p>Puede ser hipocalcemia (especialmente en yacos), intoxicación o epilepsia.</p>
    <ul>
      <li>No sujete al loro durante la convulsión — puede lesionarse más</li>
      <li>Retire objetos con los que pueda golpearse</li>
      <li>Oscurezca la habitación y reduzca el ruido</li>
      <li>Mantenga al loro cálido</li>
      <li>Llame al veterinario inmediatamente</li>
    </ul>

    <h3>Hemorragia</h3>
    <p>Las hemorragias en aves son peligrosas. Un loro puede morir de choque hemorrágico rápidamente.</p>
    <ul>
      <li><strong>Heridas externas:</strong> aplique presión con gasa estéril durante 3-5 minutos</li>
      <li><strong>Pluma de sangre rota:</strong> sujete firmemente al loro, agarre la pluma con pinzas lo más cerca de la base posible y extráigala en la dirección de crecimiento de una sola vez. Aplique presión después.</li>
      <li><strong>Uña cortada muy corta:</strong> aplique harina de maíz o polvo hemostático y mantenga presión</li>
      <li>Cualquier hemorragia que no cede en 5 minutos requiere atención veterinaria urgente</li>
    </ul>

    <h3>Traumatismo (Golpe contra Ventana, Caída)</h3>
    <ul>
      <li>No mueva innecesariamente al loro</li>
      <li>Colóquelo en posición cómoda en una superficie plana y suave</li>
      <li>Manténgalo cálido (30-32°C)</li>
      <li>No ofrezca comida ni agua hasta evaluación veterinaria</li>
      <li>Transporte al veterinario con la mínima manipulación posible</li>
    </ul>

    <h3>Intoxicación</h3>
    <ul>
      <li>Identifique qué pudo ingerir y en qué cantidad</li>
      <li>No provoque el vómito — las aves no tienen el reflejo emético igual que los mamíferos</li>
      <li>Acuda inmediatamente al veterinario con la información sobre el tóxico</li>
    </ul>

    <h3>Quemadura</h3>
    <ul>
      <li>Enfríe la zona quemada con agua tibia (no fría ni hielo) durante 5-10 minutos</li>
      <li>No aplique cremas, aceites ni nada más</li>
      <li>Cubra con gasa húmeda estéril</li>
      <li>Veterinario urgente</li>
    </ul>

    <h2>Cómo Mantener al Loro Estable durante el Traslado</h2>
    <ul>
      <li>Use una caja de cartón o plástico con ventilación, no la jaula habitual</li>
      <li>Cubra la caja con un paño oscuro para reducir el estrés visual</li>
      <li>Mantenga temperatura entre 30-32°C (puede usar una bolsa de agua caliente envuelta en tela a un lado)</li>
      <li>Conduzca suavemente, evite música alta o frenazos bruscos</li>
      <li>No moleste al loro durante el trayecto</li>
    </ul>

    <div class="faq">
      <details><summary>¿Qué hago si mi loro se cae y no puede volar?</summary><div class="faq-body">Colóquelo en un lugar seguro y cálido (30-32°C). No fuerce el movimiento de alas. Cúbralo con una tela suave y acuda inmediatamente al veterinario especialista en aves exóticas.</div></details>
      <details><summary>¿Qué hago si mi loro está sangrando?</summary><div class="faq-body">Aplique presión suave con gasa estéril sobre la herida. Si sangra una pluma de sangre, extráigala con pinzas. En heridas mayores, mantenga la presión y acuda urgente al veterinario.</div></details>
      <details><summary>¿Cómo mantener caliente a un loro enfermo o herido?</summary><div class="faq-body">Use una caja con ventilación y una lámpara incandescente a 30 cm que caliente parte de la caja, dejando que el loro pueda alejarse del calor. La temperatura objetivo es 30-32°C.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Saber si un Loro Está Enfermo', desc: '15 señales de alerta tempranas.', url: '/blog/como-saber-si-loro-esta-enfermo.html'},
    {title: 'Veterinario de Aves Exóticas en España', desc: 'Cómo encontrar al especialista adecuado.', url: '/blog/veterinario-aves-exoticas-espana.html'},
    {title: 'Enfermedades Comunes en Loros', desc: 'Las enfermedades más frecuentes.', url: '/blog/enfermedades-comunes-loros.html'},
  ]
})});

pages.push({ file: 'blog/problemas-respiratorios-loros.html', html: blogPost({
  slug: 'problemas-respiratorios-loros',
  title: 'Problemas Respiratorios en Loros: Causas, Síntomas y Tratamiento',
  titleFull: 'Problemas Respiratorios en Loros: Causas, Diagnóstico y Tratamiento',
  desc: 'Los problemas respiratorios en loros son una emergencia. Aprende a reconocer los síntomas, las causas más frecuentes y qué hacer para salvar a tu loro.',
  keywords: 'problemas respiratorios loros, loro respiracion dificil, loro jadea, aspergilosis loro, infeccion respiratoria loro',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuáles son los síntomas de problemas respiratorios en loros?","acceptedAnswer":{"@type":"Answer","text":"Los síntomas incluyen: respiración con la boca abierta, movimientos exagerados de la cola al respirar (bob tail), ruidos respiratorios (silbidos, chasquidos, ronquidos), descargas nasales, estornudos frecuentes y cambio en la voz."}},
    {"@type":"Question","name":"¿Qué causa la aspergilosis en loros?","acceptedAnswer":{"@type":"Answer","text":"La aspergilosis es una infección fúngica causada por el hongo Aspergillus fumigatus. Se adquiere por inhalación de esporas presentes en material orgánico en descomposición, alimentos rancios o polvo ambiental. Los loros inmunosuprimidos por estrés o mala dieta son más susceptibles."}},
    {"@type":"Question","name":"¿Son peligrosas las aerosoles de cocina para los loros?","acceptedAnswer":{"@type":"Answer","text":"Sí. Los humos de teflón (PTFE) al sobrecalentar sartenes antiadherentes son letales para las aves en minutos. También son peligrosos: aerosoles ambientales, desodorantes, ambientadores, humo de tabaco, vapores de pintura y productos de limpieza."}}
  ],
  content: `    <p>Los <strong>problemas respiratorios en loros</strong> son una de las principales causas de urgencia veterinaria aviar. El sistema respiratorio de las psitácidas es muy diferente al de los mamíferos — incluyen sacos aéreos además de pulmones — lo que los hace especialmente sensibles a infecciones, hongos y toxinas ambientales.</p>

    <h2>Por Qué el Sistema Respiratorio del Loro Es Vulnerable</h2>
    <p>El aparato respiratorio aviar consta de pulmones relativamente rígidos conectados a sacos aéreos que actúan como fuelles. Esta estructura permite una oxigenación muy eficiente pero también significa que:</p>
    <ul>
      <li>Los contaminantes del aire llegan más fácil a los tejidos profundos</li>
      <li>Las infecciones fúngicas se instalan fácilmente en los sacos aéreos</li>
      <li>Los síntomas respiratorios aparecen cuando la enfermedad ya está bastante avanzada</li>
      <li>La reserva funcional es menor — el deterioro puede ser muy rápido</li>
    </ul>

    <h2>Síntomas de Problemas Respiratorios</h2>
    <ul>
      <li><strong>Respiración con la boca abierta:</strong> el síntoma más grave. Indica incapacidad para obtener suficiente oxígeno por vías normales.</li>
      <li><strong>Movimiento exagerado de la cola al respirar (bob tail):</strong> señal de esfuerzo respiratorio aumentado.</li>
      <li><strong>Ruidos respiratorios:</strong> clics, silbidos, gorjeos, ronquidos.</li>
      <li><strong>Estornudos frecuentes o descargas nasales.</strong></li>
      <li><strong>Cambio en la voz:</strong> voz ronca, pérdida parcial de la capacidad de vocalización.</li>
      <li><strong>Posturas anómalas:</strong> el loro estira el cuello para respirar mejor.</li>
      <li><strong>Letargia y plumas erizadas</strong> asociadas a dificultad respiratoria.</li>
    </ul>

    <h2>Causas Más Frecuentes</h2>

    <h3>Aspergilosis (Infección Fúngica)</h3>
    <p>La aspergilosis es la enfermedad respiratoria más común en psitácidas. Causada por el hongo <em>Aspergillus fumigatus</em>, se instala en los sacos aéreos y pulmones. Factores de riesgo:</p>
    <ul>
      <li>Inmunosupresión por estrés crónico</li>
      <li>Dieta deficiente (especialmente déficit de vitamina A)</li>
      <li>Ambientes húmedos con mala ventilación</li>
      <li>Alimentos rancios o mohosos</li>
    </ul>
    <p>Es difícil de diagnosticar y tratar. Requiere antifúngicos sistémicos de larga duración bajo supervisión veterinaria estricta.</p>

    <h3>Infecciones Bacterianas</h3>
    <p><em>Chlamydophila psittaci</em> (psitacosis) es la infección bacteriana respiratoria más relevante. Es además una zoonosis (puede transmitirse a personas). Si su loro tiene síntomas respiratorios, consulte al veterinario también por su seguridad personal.</p>

    <h3>Infecciones Virales</h3>
    <p>Varios virus (Paramixovirus, Poliomavirus) pueden afectar al sistema respiratorio de los loros.</p>

    <h3>Toxinas Ambientales — La Causa Más Subestimada</h3>
    <p>Los loros son extremadamente sensibles a las toxinas del aire:</p>
    <ul>
      <li><strong>Vapores de teflón (PTFE):</strong> las sartenes antiadherentes recalentadas liberan vapores que matan a un loro en minutos. Nunca cocine con teflón si hay aves en casa.</li>
      <li><strong>Humo de tabaco:</strong> causa daño acumulativo en el sistema respiratorio.</li>
      <li><strong>Aerosoles:</strong> desodorantes, insecticidas, ambientadores, lacas de cabello — todos son potencialmente tóxicos para el sistema respiratorio aviar.</li>
      <li><strong>Velas perfumadas:</strong> especialmente las de parafina con fragancia.</li>
      <li><strong>Vapores de pintura y adhesivos.</strong></li>
    </ul>

    <h2>Prevención</h2>
    <ul>
      <li>Elimine todas las sartenes antiadherentes de cocina (sustitúyalas por acero inoxidable o hierro fundido)</li>
      <li>Ventile bien la habitación donde vive el loro</li>
      <li>Nunca use aerosoles en presencia del ave</li>
      <li>Mantenga los alimentos frescos y retire los rancios</li>
      <li>Asegure una dieta rica en vitamina A (previene inmunosupresión)</li>
      <li>Chequeos veterinarios anuales con evaluación respiratoria</li>
    </ul>

    <div class="faq">
      <details><summary>¿Cuáles son los síntomas de problemas respiratorios en loros?</summary><div class="faq-body">Respiración con la boca abierta, movimientos de cola exagerados al respirar, ruidos respiratorios (silbidos, chasquidos), descargas nasales, estornudos frecuentes y cambio en la voz.</div></details>
      <details><summary>¿Qué causa la aspergilosis en loros?</summary><div class="faq-body">Es una infección fúngica causada por Aspergillus fumigatus. Se adquiere por inhalación de esporas presentes en material en descomposición o alimentos rancios. Los loros con déficit de vitamina A o estrés crónico son más susceptibles.</div></details>
      <details><summary>¿Son peligrosas las aerosoles de cocina para los loros?</summary><div class="faq-body">Sí. Los humos de teflón al sobrecalentar son letales en minutos. También son peligrosos los aerosoles ambientales, desodorantes, ambientadores, humo de tabaco y vapores de pintura.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Saber si un Loro Está Enfermo', desc: '15 señales de alerta tempranas.', url: '/blog/como-saber-si-loro-esta-enfermo.html'},
    {title: 'Ácaros en Loros', desc: 'Tipos, síntomas y tratamiento de ácaros.', url: '/blog/acaros-en-loros.html'},
    {title: 'Primeros Auxilios para Loros', desc: 'Qué hacer en situaciones de emergencia.', url: '/blog/primeros-auxilios-loros.html'},
  ]
})});

pages.push({ file: 'blog/obesidad-en-loros.html', html: blogPost({
  slug: 'obesidad-en-loros',
  title: 'Obesidad en Loros: Causas, Consecuencias y Cómo Tratarla',
  titleFull: 'Obesidad en Loros: Por Qué Engorda tu Loro y Cómo Ayudarle a Adelgazar',
  desc: 'La obesidad es uno de los problemas de salud más comunes en loros en cautividad. Aprende a detectarla, sus causas, consecuencias y cómo ayudar a tu loro a recuperar el peso ideal.',
  keywords: 'obesidad loros, loro obeso, loro gordo dieta, lipidosis hepatica loro, loro sobrepeso que hacer',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cómo sé si mi loro tiene sobrepeso?","acceptedAnswer":{"@type":"Answer","text":"Palpe suavemente el esternón del loro. En un peso normal, el hueso del esternón es apenas palpable, flanqueado por músculo a ambos lados. En un loro con sobrepeso, el área alrededor del esternón tiene depósitos grasos visibles y la quilla queda hundida entre la grasa."}},
    {"@type":"Question","name":"¿Qué es la lipidosis hepática en loros?","acceptedAnswer":{"@type":"Answer","text":"La lipidosis hepática (hígado graso) es una acumulación excesiva de grasa en las células del hígado causada principalmente por dietas ricas en semillas grasas. El hígado deja de funcionar correctamente y la condición puede ser fatal si no se trata."}},
    {"@type":"Question","name":"¿Cómo ayudar a un loro obeso a perder peso?","acceptedAnswer":{"@type":"Answer","text":"El proceso debe ser gradual y supervisado por veterinario. Incluye: reducción de semillas, introducción de pellets de calidad, aumento de verduras y ejercicio diario fuera de la jaula. Nunca imponga una dieta drástica sin supervisión."}}
  ],
  content: `    <p>La <strong>obesidad en loros</strong> es uno de los problemas de salud más comunes y más subestimados en psitácidas en cautividad. Se estima que más del 40% de los loros domésticos tienen sobrepeso, principalmente por dietas incorrectas y sedentarismo. Las consecuencias son graves: lipidosis hepática, arteroesclerosis, problemas articulares y reducción significativa de la esperanza de vida.</p>

    <h2>Causas de Sobrepeso en Loros</h2>
    <h3>Dieta Basada en Semillas</h3>
    <p>La causa número uno. Las semillas de girasol, cáñamo y maíz tienen un contenido en grasa del 25-50%. Un loro que come semillas como base de su dieta ingiere el doble o triple de calorías de las que necesita. Para empeorar las cosas, los loros tienden a seleccionar las semillas más grasas de la mezcla.</p>

    <h3>Sedentarismo</h3>
    <p>Los loros en libertad vuelan decenas de kilómetros al día. Un loro en jaula que no sale nunca quema una fracción mínima de esas calorías. La combinación de dieta calórica + inactividad es la receta perfecta para el sobrepeso.</p>

    <h3>Premios Calóricos en Exceso</h3>
    <p>Plátano, uvas, maíz cocido, frutos secos — todos son alimentos nutritivos pero muy calóricos. Ofrecidos en exceso o como alimento principal, contribuyen al sobrepeso.</p>

    <h3>Edad y Metabolismo</h3>
    <p>Los loros adultos tienen el metabolismo más lento que los jóvenes. Un loro que comía semillas de joven sin problemas de peso puede desarrollar obesidad en la madurez con la misma dieta.</p>

    <h2>Cómo Detectar el Sobrepeso</h2>
    <p>La evaluación más práctica es la palpación del esternón:</p>
    <ul>
      <li><strong>Peso ideal:</strong> el esternón (hueso quilla) se palpa con músculo a ambos lados. No es prominente ni está hundido.</li>
      <li><strong>Bajo peso:</strong> el esternón es muy prominente, con poco músculo a los lados. Se siente afilado.</li>
      <li><strong>Sobrepeso:</strong> el esternón está rodeado de depósitos grasos. No es fácilmente palpable. En casos severos, hay masa grasa visible en el abdomen.</li>
    </ul>
    <p>Pese a su loro mensualmente con una báscula de cocina digital (precisión de 1g). Compare con el peso ideal para su especie.</p>

    <h2>Consecuencias del Sobrepeso</h2>
    <ul>
      <li><strong>Lipidosis hepática (hígado graso):</strong> la grasa se acumula en el hígado, que pierde función. Puede ser mortal.</li>
      <li><strong>Arteroesclerosis:</strong> depósitos de grasa en las paredes arteriales, frecuente en loros obesos de mediana edad.</li>
      <li><strong>Problemas articulares:</strong> el exceso de peso daña las articulaciones de las patas.</li>
      <li><strong>Reducción de la esperanza de vida:</strong> los estudios muestran que los loros obesos viven significativamente menos.</li>
      <li><strong>Mayor riesgo quirúrgico:</strong> los loros con sobrepeso toloran peor la anestesia.</li>
    </ul>

    <h2>Cómo Ayudar a un Loro Obeso a Perder Peso</h2>
    <div class="info-box">
      <p>⚠️ La pérdida de peso en loros debe ser gradual (no más del 1-3% del peso por semana) y siempre bajo supervisión veterinaria. Una dieta excesivamente restrictiva puede causar lipidosis hepática paradójica.</p>
    </div>
    <ul>
      <li><strong>Paso 1 — Diagnóstico veterinario:</strong> antes de cambiar la dieta, confirme el grado de sobrepeso y descarte problemas hepáticos o tiroideos subyacentes.</li>
      <li><strong>Paso 2 — Reducir semillas:</strong> disminuya gradualmente las semillas hasta el 10% de la dieta.</li>
      <li><strong>Paso 3 — Introducir pellets:</strong> los pellets de mantenimiento (bajos en grasa) como Roudybush o Harrison's Lifetime deben ser la base.</li>
      <li><strong>Paso 4 — Aumentar verduras:</strong> las verduras de hoja verde y las bajas en almidón son aliadas clave.</li>
      <li><strong>Paso 5 — Ejercicio diario:</strong> el loro debe salir de la jaula mínimo 2-3 horas al día. Fomente el vuelo dentro de casa, trepar y forrajear.</li>
    </ul>

    <div class="faq">
      <details><summary>¿Cómo sé si mi loro tiene sobrepeso?</summary><div class="faq-body">Palpe suavemente el esternón. En peso ideal, el hueso es apenas palpable flanqueado por músculo. En sobrepeso, el área tiene depósitos grasos visibles y la quilla queda hundida entre la grasa.</div></details>
      <details><summary>¿Qué es la lipidosis hepática en loros?</summary><div class="faq-body">Es una acumulación de grasa en las células del hígado causada por dietas ricas en semillas. El hígado deja de funcionar correctamente y puede ser fatal si no se trata.</div></details>
      <details><summary>¿Cómo ayudar a un loro obeso a perder peso?</summary><div class="faq-body">El proceso debe ser gradual y supervisado por veterinario: reducción de semillas, introducción de pellets de calidad, aumento de verduras y ejercicio diario. Nunca imponga una dieta drástica sin supervisión.</div></details>
    </div>`,
  related: [
    {title: 'Mejor Comida para Loros en España', desc: 'Análisis de marcas de pellets.', url: '/blog/mejor-comida-para-loros-espana.html'},
    {title: 'Enfermedades Comunes en Loros', desc: 'Las enfermedades más frecuentes.', url: '/blog/enfermedades-comunes-loros.html'},
    {title: 'Cómo Saber si un Loro Está Enfermo', desc: '15 señales de alerta tempranas.', url: '/blog/como-saber-si-loro-esta-enfermo.html'},
  ]
})});

pages.push({ file: 'blog/cortar-unas-loro.html', html: blogPost({
  slug: 'cortar-unas-loro',
  title: 'Cómo Cortar las Uñas de un Loro: Guía Paso a Paso',
  titleFull: 'Cómo Cortar las Uñas de un Loro: Guía Completa con Frecuencia y Técnica',
  desc: 'Aprende a cortar las uñas de tu loro de forma segura en casa. Herramientas necesarias, técnica correcta, cómo evitar cortar el "quick" y cuándo acudir al veterinario.',
  keywords: 'cortar uñas loro, como cortar uñas loro, uñas loro largas, manicura loro en casa, dremel loro uñas',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Con qué frecuencia hay que cortar las uñas de un loro?","acceptedAnswer":{"@type":"Answer","text":"Depende de la especie, la dieta y el sustrato. Por término general, cada 4-8 semanas. Los loros que tienen acceso a perchas de madera natural (ramas rugosas) y piedras abrasivas desgastan naturalmente las uñas y necesitan cortado menos frecuente."}},
    {"@type":"Question","name":"¿Qué herramientas usar para cortar uñas de loro?","acceptedAnswer":{"@type":"Answer","text":"Para loros pequeños y medianos: cortaúñas de guillotina para aves o tijeras de punta roma. Para loros grandes (guacamayos): cortaúñas de guillotina resistente. Un Dremel con disco de desbaste permite un resultado más preciso. Tenga siempre a mano polvo hemostático por si hay sangrado."}},
    {"@type":"Question","name":"¿Qué hago si corto demasiado y sangra la uña?","acceptedAnswer":{"@type":"Answer","text":"Aplique polvo hemostático (disponible en tiendas de mascotas) o harina de maíz sobre la uña y mantenga presión suave durante 1-2 minutos. Si el sangrado no cede en 5 minutos, acuda al veterinario."}}
  ],
  content: `    <p><strong>Cortar las uñas de un loro</strong> es una parte del cuidado rutinario que muchos propietarios aprenden a hacer en casa. Unas uñas demasiado largas dificultan el agarre, pueden engancharse en tejidos de la jaula y causar heridas. Aunque parece intimidante al principio, con la técnica y las herramientas correctas es un procedimiento seguro.</p>

    <h2>¿Cuándo Hay que Cortar las Uñas?</h2>
    <p>No existe un intervalo fijo universal — depende de varios factores:</p>
    <ul>
      <li><strong>Perchas de madera natural:</strong> los loros en jaulas con ramas rugosas de árbol (manzano, sauce, abedul) desgastan las uñas naturalmente y necesitan cortarlas con menor frecuencia</li>
      <li><strong>Perchas lisas o de plástico:</strong> favorecen el crecimiento excesivo. Cambie a perchas de madera natural</li>
      <li><strong>Tamaño de la especie:</strong> los loros grandes (guacamayos, yacos) necesitan cortado cada 4-6 semanas; los medianos (amazonas, cacatúas) cada 6-8 semanas</li>
    </ul>
    <p>Señales de que las uñas están demasiado largas:</p>
    <ul>
      <li>El loro tiene dificultad para agarrarse al palo</li>
      <li>Las uñas se curvan hasta el punto de tocar casi la palma de la pata</li>
      <li>El loro se engancha en telas o juguetes</li>
      <li>Oye el "clic" de las uñas al caminar por superficies duras</li>
    </ul>

    <h2>Herramientas Necesarias</h2>
    <ul>
      <li><strong>Cortaúñas de guillotina para aves:</strong> diseñados específicamente para la forma de las uñas aviares. No use cortaúñas humanos</li>
      <li><strong>Dremel con disco de desbaste (opcional):</strong> permite un limado preciso y suave, especialmente útil para guacamayos con uñas muy duras</li>
      <li><strong>Polvo hemostático o harina de maíz:</strong> imprescindible para detener sangrados accidentales</li>
      <li><strong>Linterna o luz fuerte:</strong> para visualizar el "quick" (zona con vascularización)</li>
      <li><strong>Toalla o paño:</strong> para sujetar al loro de forma segura</li>
      <li><strong>Ayudante:</strong> idealmente dos personas, una sujeta y otra corta</li>
    </ul>

    <h2>Técnica Paso a Paso</h2>
    <ol>
      <li><strong>Prepare todo antes de coger al loro:</strong> tenga las herramientas a mano para minimizar el tiempo de manejo.</li>
      <li><strong>Envoltura en toalla:</strong> envuelva suavemente al loro en una toalla para inmovilizarlo sin lastimarlo. El cuerpo y las alas quedan envueltos, solo la pata a trabajar queda expuesta.</li>
      <li><strong>Identifique el "quick":</strong> en loros con uñas claras, el quick (zona vascularizada rosada) es visible. En uñas oscuras, ilumine con una linterna por debajo de la uña para ver la vascularización. Corte siempre por delante de esa zona.</li>
      <li><strong>Corte en ángulo de 45°:</strong> corte en la punta de la uña, en pequeños incrementos si no está seguro.</li>
      <li><strong>Lime los bordes:</strong> use una lima fina o el Dremel para suavizar los bordes cortados y evitar que arañen.</li>
      <li><strong>Recompense:</strong> ofrezca un premio especial inmediatamente después para asociar positivamente la experiencia.</li>
    </ol>

    <h2>Si Hay Sangrado</h2>
    <p>Si corta demasiado profundo y la uña sangra:</p>
    <ul>
      <li>Aplique polvo hemostático o harina de maíz presionando suavemente 1-2 minutos</li>
      <li>No suelte al loro hasta que el sangrado haya cesado</li>
      <li>Si el sangrado no cede en 5 minutos, acuda al veterinario</li>
      <li>Vigile la uña durante las siguientes 24 horas por si se vuelve a abrir</li>
    </ul>

    <h2>Cuándo Dejar Esta Tarea al Veterinario</h2>
    <p>Considere acudir al veterinario si:</p>
    <ul>
      <li>Su loro es muy agresivo y difícil de manejar</li>
      <li>Las uñas están muy deformadas o encarnadas</li>
      <li>Detecta cambios anómalos en la uña (color, textura)</li>
      <li>No se siente seguro haciéndolo en casa</li>
    </ul>

    <div class="faq">
      <details><summary>¿Con qué frecuencia hay que cortar las uñas de un loro?</summary><div class="faq-body">Por término general, cada 4-8 semanas. Los loros con acceso a perchas de madera natural desgastan las uñas naturalmente y necesitan cortado menos frecuente.</div></details>
      <details><summary>¿Qué herramientas usar para cortar uñas de loro?</summary><div class="faq-body">Cortaúñas de guillotina para aves o un Dremel con disco de desbaste. Tenga siempre polvo hemostático a mano por si hay sangrado.</div></details>
      <details><summary>¿Qué hago si corto demasiado y sangra la uña?</summary><div class="faq-body">Aplique polvo hemostático o harina de maíz con presión suave durante 1-2 minutos. Si el sangrado no cede en 5 minutos, acuda al veterinario.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Cuidar el Pico de un Loro', desc: 'Mantenimiento y salud del pico aviar.', url: '/blog/cuidado-pico-loro.html'},
    {title: 'Cómo Bañar a un Loro', desc: 'Guía completa de higiene aviar.', url: '/blog/banar-loro-guia-completa.html'},
    {title: 'Enfermedades Comunes en Loros', desc: 'Las enfermedades más frecuentes.', url: '/blog/enfermedades-comunes-loros.html'},
  ]
})});

pages.push({ file: 'blog/cuidado-pico-loro.html', html: blogPost({
  slug: 'cuidado-pico-loro',
  title: 'Cómo Cuidar el Pico de un Loro: Salud, Desgaste y Problemas',
  titleFull: 'Cómo Cuidar el Pico de un Loro: Guía Completa de Salud y Mantenimiento',
  desc: 'Guía completa sobre el cuidado del pico del loro: cómo se desgasta naturalmente, señales de problemas, cuándo cortar el pico y qué enfermedades del pico existen.',
  keywords: 'cuidado pico loro, pico loro deformado, pico loro largo que hacer, enfermedad pico loro, malformacion pico loro',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Hay que cortar el pico a un loro?","acceptedAnswer":{"@type":"Answer","text":"En condiciones normales, el pico de un loro se desgasta solo con la masticación de alimentos, juguetes de madera y mineral (sepia). Si el pico está sobrecrecido, malformado o con cambios de textura, debe evaluarlo un veterinario especialista. No intente cortarlo en casa."}},
    {"@type":"Question","name":"¿Qué enfermedades afectan al pico del loro?","acceptedAnswer":{"@type":"Answer","text":"La sarna cnemidocóptica (ácaros de escamas), la enfermedad del pico y las plumas (PBFD por poliomavirus/circovirus), la malnutrición por deficiencia de vitamina A y los traumatismos son las causas más frecuentes de problemas en el pico."}},
    {"@type":"Question","name":"¿Qué es la minerale (sepia) para loros?","acceptedAnswer":{"@type":"Answer","text":"El hueso de sepia es un mineral natural rico en calcio que los loros mastican para desgastar el pico y obtener calcio y oligoelementos. Es recomendable tener siempre uno en la jaula."}}
  ],
  content: `    <p>El <strong>pico del loro</strong> es uno de sus órganos más importantes: lo usa para comer, trepar, explorar, comunicarse y defenderse. Un pico sano es fundamental para la calidad de vida del ave. Conocer cómo cuidarlo y reconocer las señales de problema es parte esencial del manejo de psitácidas.</p>

    <h2>Anatomía y Función del Pico del Loro</h2>
    <p>A diferencia de los dientes de los mamíferos, el pico del loro crece continuamente a lo largo de toda su vida. Está formado por queratina (la misma proteína de las uñas humanas) y contiene terminaciones nerviosas sensibles. El loro lo usa para:</p>
    <ul>
      <li>Descascarillar semillas y abrir frutos</li>
      <li>Trepar por barras, ramas y juguetes</li>
      <li>Preacicalamiento propio y de su pareja</li>
      <li>Explorar texturas y objetos (los loros "tocan" con el pico)</li>
      <li>Defensa y expresión emocional</li>
    </ul>

    <h2>Desgaste Natural del Pico</h2>
    <p>En condiciones ideales, el pico se desgasta solo con la actividad diaria:</p>
    <ul>
      <li>Masticación de alimentos duros (nueces, frutos secos, verduras crudas)</li>
      <li>Masticación de juguetes de madera no tratada</li>
      <li>Frotado contra minerales como el hueso de sepia</li>
      <li>Frotado del pico contra perchas rugosas</li>
    </ul>
    <p>Para asegurar este desgaste natural, proporcione siempre:</p>
    <ul>
      <li>Hueso de sepia permanente en la jaula</li>
      <li>Bloques de madera blanda para masticar (balsa, sauce, pino sin tratar)</li>
      <li>Perchas de madera rugosa de diferentes diámetros</li>
      <li>Piedra mineral para aves</li>
    </ul>

    <h2>Señales de Problemas en el Pico</h2>

    <h3>Sobrecrecimiento (Pico Largo)</h3>
    <p>Cuando el pico crece más de lo que se desgasta. Causas:</p>
    <ul>
      <li>Falta de materiales para masticar</li>
      <li>Problemas de alineación del pico (mal oclusión)</li>
      <li>Infecciones o traumatismos previos</li>
    </ul>
    <p>Un veterinario especialista puede recortar el pico con fresas de desbaste (tipo Dremel dental). No lo haga en casa: el pico tiene vasos sanguíneos y nervios.</p>

    <h3>Cambios de Textura: Escamas, Costras, Descamación</h3>
    <p>Un pico sano es liso, brillante y simétrico. La aparición de escamas o costras puede indicar:</p>
    <ul>
      <li><strong>Sarna cnemidocóptica:</strong> ácaros de escamas (Knemidocoptes). Se tratan con ivermectina. Consulte el artículo sobre <a href="/blog/acaros-en-loros.html">ácaros en loros</a>.</li>
      <li><strong>Enfermedad del pico y las plumas (PBFD):</strong> infección viral que causa deformación progresiva del pico y las plumas. No tiene cura, pero hay manejo paliativo.</li>
      <li><strong>Deficiencia de vitamina A:</strong> la queratina del pico se ve afectada por la falta de vitamina A en la dieta.</li>
    </ul>

    <h3>Deformaciones o Asimetrías</h3>
    <p>Pueden ser congénitas o adquiridas por traumatismos. Requieren evaluación veterinaria.</p>

    <h3>Sangrado del Pico</h3>
    <p>Si el pico sangra (rotura por traumatismo o corte accidental), aplique presión suave con gasa y acuda al veterinario si el sangrado no cede.</p>

    <h2>Signos de un Pico Saludable</h2>
    <ul>
      <li>Superficie lisa y uniforme, sin grietas ni descamación</li>
      <li>Color brillante (varía por especie, pero homogéneo)</li>
      <li>Simetría: mandíbula superior e inferior alineadas</li>
      <li>No hay inflamación ni enrojecimiento en la base</li>
    </ul>

    <div class="faq">
      <details><summary>¿Hay que cortar el pico a un loro?</summary><div class="faq-body">En condiciones normales, el pico se desgasta solo con la masticación. Si está sobrecrecido o deformado, un veterinario especialista debe evaluarlo. No intente cortarlo en casa.</div></details>
      <details><summary>¿Qué enfermedades afectan al pico del loro?</summary><div class="faq-body">La sarna cnemidocóptica (ácaros), la enfermedad del pico y las plumas (PBFD), la malnutrición por déficit de vitamina A y los traumatismos son las causas más frecuentes de problemas en el pico.</div></details>
      <details><summary>¿Qué es la sepia para loros?</summary><div class="faq-body">El hueso de sepia es un mineral natural rico en calcio que los loros mastican para desgastar el pico y obtener calcio. Tenga siempre uno en la jaula.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Cortar las Uñas de un Loro', desc: 'Guía de manicura aviar paso a paso.', url: '/blog/cortar-unas-loro.html'},
    {title: 'Ácaros en Loros', desc: 'Tipos, síntomas y tratamiento.', url: '/blog/acaros-en-loros.html'},
    {title: 'Enfermedades Comunes en Loros', desc: 'Las enfermedades más frecuentes.', url: '/blog/enfermedades-comunes-loros.html'},
  ]
})});

pages.push({ file: 'blog/guia-veterinaria-loros.html', html: blogPost({
  slug: 'guia-veterinaria-loros',
  title: 'Guía Veterinaria para Loros: Chequeos, Vacunas y Analíticas',
  titleFull: 'Guía Veterinaria Completa para Loros: Revisiones, Pruebas y Prevención',
  desc: 'Guía completa sobre los cuidados veterinarios que necesita un loro: con qué frecuencia ir al vet, qué pruebas hacer, cómo elegir un especialista en aves exóticas en España.',
  keywords: 'guia veterinaria loros, veterinario loros españa, chequeo loro anual, analisis sangre loro, veterinario aves exoticas que hace',
  badge: '🏥 Salud',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Con qué frecuencia debe ir un loro al veterinario?","acceptedAnswer":{"@type":"Answer","text":"Un loro adulto sano debe tener un chequeo veterinario anual aunque parezca completamente sano. Los loros ocultan la enfermedad, por lo que las revisiones preventivas son la mejor herramienta para detectar problemas en fase temprana."}},
    {"@type":"Question","name":"¿Qué hace el veterinario en un chequeo de un loro?","acceptedAnswer":{"@type":"Answer","text":"El veterinario realiza una exploración física completa (peso, plumaje, pico, ojos, fosas nasales, cloaca), analítica de sangre, y según la especie y edad, pueden añadirse radiografías, cultivos bacterianos o pruebas de PCR para enfermedades específicas como la psitacosis."}},
    {"@type":"Question","name":"¿Los loros necesitan vacunas?","acceptedAnswer":{"@type":"Answer","text":"A diferencia de perros y gatos, actualmente no existen vacunas comerciales disponibles en España para las enfermedades más comunes de los loros. La prevención se basa en higiene, cuarentena de nuevas aves, dieta correcta y chequeos veterinarios regulares."}}
  ],
  content: `    <p>Muchos propietarios de loros llevan a sus aves al veterinario solo cuando están claramente enfermas. Este es un error frecuente: dado que los loros <strong>ocultan la enfermedad</strong> hasta fases avanzadas, cuando los síntomas son evidentes el problema puede estar muy establecido. Los chequeos preventivos regulares son la mejor inversión en la salud de su loro.</p>

    <h2>Cómo Elegir un Buen Veterinario para su Loro</h2>
    <p>No todos los veterinarios están igualmente preparados para tratar psitácidas. Busque un especialista en <strong>aves exóticas</strong> (no un veterinario generalista de mascotas comunes). Señales de que ha encontrado el veterinario adecuado:</p>
    <ul>
      <li>Tiene equipamiento específico para aves: anestesia inhalatoria con gases, instrumental adaptado, báscula de precisión</li>
      <li>Está familiarizado con las especies de psitácidas comunes (yacos, guacamayos, cacatúas, amazonas)</li>
      <li>Solicita analítica de sangre antes de diagnosticar</li>
      <li>Le hace preguntas detalladas sobre dieta, entorno y comportamiento del ave</li>
      <li>Puede realizarle un examen de cultivo para Chlamydophila (psitacosis)</li>
    </ul>

    <h2>Frecuencia de Visitas Veterinarias</h2>
    <table>
      <thead><tr><th>Momento</th><th>Acción</th></tr></thead>
      <tbody>
        <tr><td>Al adquirir el loro</td><td>Chequeo completo en los primeros 3-5 días, aunque parezca sano</td></tr>
        <tr><td>Anualmente</td><td>Revisión preventiva completa + analítica de sangre</td></tr>
        <tr><td>Ante cualquier síntoma</td><td>Consulta sin demora — no espere a "ver si mejora solo"</td></tr>
        <tr><td>Antes de la época de cría</td><td>Si cría, revisión de la hembra para valorar reservas de calcio</td></tr>
        <tr><td>En aves mayores de 10 años</td><td>Revisiones cada 6 meses</td></tr>
      </tbody>
    </table>

    <h2>El Chequeo Preventivo Anual: Qué Incluye</h2>
    <h3>Exploración Física Completa</h3>
    <ul>
      <li><strong>Peso:</strong> comparado con el registro anterior para detectar pérdidas insidiosas</li>
      <li><strong>Condición corporal:</strong> palpación del esternón</li>
      <li><strong>Plumaje:</strong> calidad, simetría, presencia de líneas de estrés, plumas de sangre</li>
      <li><strong>Pico:</strong> simetría, textura, ausencia de lesiones</li>
      <li><strong>Ojos y fosas nasales:</strong> descargas, inflamación</li>
      <li><strong>Cloaca:</strong> limpieza, ausencia de prolapsos</li>
      <li><strong>Abdomen:</strong> presencia de masas, hernias</li>
      <li><strong>Tono muscular y articulaciones</strong></li>
    </ul>

    <h3>Analítica de Sangre</h3>
    <p>Una analítica básica anual proporciona información valiosa:</p>
    <ul>
      <li><strong>Hemograma:</strong> detecta anemias, infecciones, leucemias</li>
      <li><strong>Perfil bioquímico:</strong> función hepática (AST, ALT, GGT), función renal (ácido úrico), glucosa, calcio, proteínas</li>
      <li><strong>Calcio total:</strong> especialmente importante en yacos y cacatúas</li>
    </ul>

    <h3>Pruebas Adicionales Según Indicación</h3>
    <ul>
      <li><strong>PCR Chlamydophila (psitacosis):</strong> recomendada en aves nuevas o con síntomas respiratorios (también por seguridad del propietario)</li>
      <li><strong>PCR PBFD:</strong> especialmente en cacatúas jóvenes</li>
      <li><strong>Radiografías:</strong> en aves con síntomas respiratorios, digestivos o en aves mayores</li>
      <li><strong>Cultivos bacterianos y fúngicos:</strong> ante infecciones recurrentes</li>
    </ul>

    <h2>Preparación para la Visita Veterinaria</h2>
    <ul>
      <li>Lleve al loro en una caja de transporte segura, no en la jaula habitual</li>
      <li>Cubra la caja para reducir el estrés durante el traslado</li>
      <li>Si es posible, lleve una muestra de heces reciente (1-2 horas) en un recipiente limpio</li>
      <li>Prepare información sobre dieta, comportamiento reciente y cualquier cambio observado</li>
      <li>Lleve la documentación CITES y veterinaria previa del ave</li>
    </ul>

    <div class="faq">
      <details><summary>¿Con qué frecuencia debe ir un loro al veterinario?</summary><div class="faq-body">Un loro adulto sano debe tener un chequeo anual aunque parezca completamente sano. Los loros ocultan la enfermedad, por lo que las revisiones preventivas son la mejor herramienta para detectar problemas temprano.</div></details>
      <details><summary>¿Qué hace el veterinario en un chequeo de un loro?</summary><div class="faq-body">Exploración física completa (peso, plumaje, pico, ojos, cloaca) + analítica de sangre. Según especie y edad pueden añadirse radiografías, cultivos o PCR para psitacosis.</div></details>
      <details><summary>¿Los loros necesitan vacunas?</summary><div class="faq-body">Actualmente no existen vacunas comerciales disponibles en España para las enfermedades más comunes de los loros. La prevención se basa en higiene, cuarentena, dieta correcta y chequeos regulares.</div></details>
    </div>`,
  related: [
    {title: 'Veterinario de Aves Exóticas en España', desc: 'Cómo encontrar al especialista adecuado.', url: '/blog/veterinario-aves-exoticas-espana.html'},
    {title: 'Cómo Saber si un Loro Está Enfermo', desc: '15 señales de alerta tempranas.', url: '/blog/como-saber-si-loro-esta-enfermo.html'},
    {title: 'Enfermedades Comunes en Loros', desc: 'Las enfermedades más frecuentes.', url: '/blog/enfermedades-comunes-loros.html'},
  ]
})});

// ─── CLUSTER 3: BEHAVIOUR ─────────────────────────────────────────────────

pages.push({ file: 'blog/por-que-grita-mi-loro.html', html: blogPost({
  slug: 'por-que-grita-mi-loro',
  title: '¿Por Qué Grita Mi Loro? Causas y Cómo Reducir los Gritos',
  titleFull: '¿Por Qué Grita Mi Loro? Causas Reales y Soluciones Efectivas',
  desc: 'Descubre por qué tu loro grita tanto, cuáles son las causas más frecuentes de los gritos en psitácidas y técnicas efectivas para reducirlos sin castigar al ave.',
  keywords: 'por que grita mi loro, loro grita mucho que hacer, reducir gritos loro, loro chilla todo el dia, como callar un loro',
  badge: '🧠 Comportamiento',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Es normal que un loro grite?","acceptedAnswer":{"@type":"Answer","text":"Sí. Los loros son aves sociales que se comunican vocalmente en libertad. Cierto nivel de vocalización es completamente normal e inevitable. Los gritos problemáticos son los excesivos, prolongados o asociados a conductas de alarma o demanda que el propietario refuerza inadvertidamente."}},
    {"@type":"Question","name":"¿Cómo debo reaccionar cuando mi loro grita?","acceptedAnswer":{"@type":"Answer","text":"La respuesta más contraproducente es gritar de vuelta o darle atención inmediata cuando grita. Ambas refuerzan el comportamiento. La estrategia correcta es ignorar los gritos de demanda de atención y recompensar los momentos de silencio o vocalización tranquila."}},
    {"@type":"Question","name":"¿A qué hora gritan más los loros?","acceptedAnswer":{"@type":"Answer","text":"Los loros tienen dos picos naturales de vocalización: al amanecer y al atardecer, coincidiendo con sus patrones naturales de bandada. Estos gritos son completamente normales e instintivos. Los gritos durante el resto del día suelen tener causas específicas identificables."}}
  ],
  content: `    <p>Los <strong>gritos del loro</strong> son, con diferencia, la queja más frecuente de los propietarios de psitácidas. Antes de intentar reducir los gritos, es fundamental entender por qué grita el loro — la causa determina la solución. No todos los gritos son iguales ni tienen el mismo origen.</p>

    <h2>Los Gritos Normales vs. Los Problemáticos</h2>
    <p>Existe una distinción importante que muchos propietarios no conocen:</p>
    <ul>
      <li><strong>Vocalizaciones normales:</strong> los gritos al amanecer y atardecer (contacto con la "bandada"), los sonidos de juego y exploración, el gorjeo y canto durante el día — estos son completamente normales y no deben intentar eliminarse.</li>
      <li><strong>Gritos problemáticos:</strong> gritos prolongados, estridentes o repetitivos que el propietario refuerza inadvertidamente respondiendo a ellos, o gritos asociados a estrés, aburrimiento o miedo.</li>
    </ul>

    <h2>Causas Más Frecuentes de Gritos Excesivos</h2>

    <h3>1. Gritos de Contacto (La Causa Más Común)</h3>
    <p>En estado salvaje, los loros se llaman constantemente entre sí para saber dónde está la bandada. En cautividad, el loro considera a su propietario parte de su bandada. Cuando el propietario sale de la habitación, el loro llama para saber dónde está. Si el propietario responde gritando "¡cállate!", el loro aprende que gritar hace que su compañero de bandada aparezca — y grita más.</p>
    <p><strong>Solución:</strong> establezca una "llamada de contacto" mutua. Cuando el loro llame, responda con una vocalización tranquila específica (un silbido, una frase corta) que indique que está allí. Esto satisface la necesidad del loro sin reforzar el grito.</p>

    <h3>2. Búsqueda de Atención</h3>
    <p>El loro aprende que gritar atrae atención inmediata. El propietario va corriendo a ver qué pasa — y el loro lo tiene todo claro: gritar = atención.</p>
    <p><strong>Solución:</strong> no acuda inmediatamente cuando grita. Espere a que el loro pare de gritar unos segundos antes de darle atención. Recompense activamente los momentos de calma.</p>

    <h3>3. Aburrimiento y Falta de Estimulación</h3>
    <p>Un loro aburrido, sin juguetes o interacción suficiente, grita por falta de estímulos. Los gritos de aburrimiento suelen ser monótonos y repetitivos.</p>
    <p><strong>Solución:</strong> enriquecimiento ambiental. Rote los juguetes semanalmente, ofrezca puzzles de forrajeo, permita al loro pasar tiempo fuera de la jaula explorando de forma segura.</p>

    <h3>4. Miedo o Estrés</h3>
    <p>Los gritos de alarma son agudos, rápidos y tienen una calidad diferente a los gritos de demanda. Pueden estar provocados por un espejo, un objeto nuevo, un animal desconocido o un ruido inesperado.</p>
    <p><strong>Solución:</strong> identifique y elimine la fuente de miedo. Si la causa es inevitable, trabaje la desensibilización gradual.</p>

    <h3>5. Hormonalidad o Época de Cría</h3>
    <p>En primavera, el aumento hormonal puede incrementar significativamente la vocalización. Es temporal y normal, aunque difícil de gestionar.</p>

    <h2>Estrategias para Reducir los Gritos</h2>
    <ul>
      <li><strong>No grite de vuelta:</strong> nunca funciona y es lo que el loro quiere (atención)</li>
      <li><strong>No cubra la jaula para callar:</strong> es punitivo y no resuelve la causa</li>
      <li><strong>Recompense el silencio:</strong> cuando el loro está tranquilo, acérquese, hable con él, ofrezca un premio</li>
      <li><strong>Establezca rutinas:</strong> los loros gritan más cuando la rutina es imprevisible</li>
      <li><strong>Aumente el ejercicio y la estimulación:</strong> un loro estimulado grita menos</li>
    </ul>

    <div class="faq">
      <details><summary>¿Es normal que un loro grite?</summary><div class="faq-body">Sí. Cierto nivel de vocalización es completamente normal. Los gritos problemáticos son los excesivos, prolongados o los que el propietario refuerza inadvertidamente respondiendo a ellos.</div></details>
      <details><summary>¿Cómo debo reaccionar cuando mi loro grita?</summary><div class="faq-body">No gritar de vuelta ni dar atención inmediata — ambas refuerzan el comportamiento. Ignore los gritos de demanda y recompense los momentos de silencio o vocalización tranquila.</div></details>
      <details><summary>¿A qué hora gritan más los loros?</summary><div class="faq-body">Al amanecer y al atardecer — picos naturales de vocalización totalmente normales. Los gritos durante el resto del día suelen tener causas específicas identificables.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Reducir el Estrés en Loros', desc: 'Técnicas para calmar y estabilizar al loro.', url: '/blog/como-reducir-estres-loros.html'},
    {title: 'Cómo Entrenar un Loro Paso a Paso', desc: 'Adiestramiento positivo para psitácidas.', url: '/blog/como-entrenar-un-loro.html'},
    {title: '¿Por Qué Mi Loro Me Tiene Miedo?', desc: 'Causas del miedo y cómo ganar confianza.', url: '/blog/por-que-mi-loro-me-tiene-miedo.html'},
  ]
})});

pages.push({ file: 'blog/como-domesticar-un-loro.html', html: blogPost({
  slug: 'como-domesticar-un-loro',
  title: 'Cómo Domesticar un Loro: Guía Paso a Paso para Ganar su Confianza',
  titleFull: 'Cómo Domesticar un Loro: De Salvaje a Compañero en Semanas',
  desc: 'Guía completa para domesticar un loro adulto o semicrestado. Técnicas de adiestramiento positivo, pasos concretos y cuánto tiempo tarda en confiar en ti.',
  keywords: 'como domesticar un loro, loro no me hace caso, loro salvaje domesticar, loro adulto domesticar, ganar confianza loro',
  badge: '🧠 Comportamiento',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuánto tiempo tarda en domesticarse un loro?","acceptedAnswer":{"@type":"Answer","text":"Depende del historial del ave, la especie y la constancia del propietario. Un loro papillero bien socializado puede confiar en pocos días. Un loro adulto sin socialización previa puede tardar de semanas a varios meses. La paciencia y la constancia son imprescindibles."}},
    {"@type":"Question","name":"¿Se puede domesticar un loro adulto?","acceptedAnswer":{"@type":"Answer","text":"Sí, aunque requiere más tiempo y paciencia que con un loro joven. Los loros adultos pueden perder el miedo y desarrollar vínculos con nuevos propietarios. El proceso de desensibilización gradual y el refuerzo positivo son las herramientas principales."}},
    {"@type":"Question","name":"¿Puedo forzar a mi loro a que me deje cogerlo?","acceptedAnswer":{"@type":"Answer","text":"No. Forzar el contacto físico genera miedo y desconfianza, no confianza. El loro debe aprender que el contacto con el propietario es algo seguro y positivo, y eso solo se consigue a través del respeto de sus límites y el refuerzo positivo."}}
  ],
  content: `    <p><strong>Domesticar un loro</strong> no significa romper su voluntad — significa construir una relación de confianza mutua en la que el ave elige interactuar contigo. Este proceso se llama "adiestramiento positivo" y es la base de toda la ciencia del comportamiento aviar moderno.</p>

    <h2>Primero: Comprenda el Concepto de "Domesticado"</h2>
    <p>Un loro papillero criado a mano desde pequeño ya confía en los humanos desde el primer día. Un loro más "salvaje" o mal socializado necesita aprender que los humanos son seguros y positivos, no amenazantes. Esta diferencia es fundamental:</p>
    <ul>
      <li>Un loro papillero (criado a mano) → proceso de mantenimiento y refinamiento de la confianza</li>
      <li>Un loro adulto poco socializado → proceso de construcción de confianza desde cero</li>
    </ul>

    <h2>El Proceso de Domesticación Paso a Paso</h2>

    <h3>Fase 1: Período de Adaptación (Días 1-7)</h3>
    <ul>
      <li>Coloque la jaula en una zona donde el loro pueda ver la actividad familiar sin ser perturbado</li>
      <li>No intente coger al loro ni forzar el contacto durante esta fase</li>
      <li>Hable cerca de la jaula en tono tranquilo sin mirar directamente a los ojos (los loros perciben la mirada directa como amenaza)</li>
      <li>Ofrezca comida manualmente a través de los barrotes — pequeños trozos de fruta que solo estén disponibles de su mano</li>
      <li>Observe el lenguaje corporal: plumas relajadas, sin jadeos ni aleteos = se siente cómodo</li>
    </ul>

    <h3>Fase 2: Acercamiento Gradual (Días 7-21)</h3>
    <ul>
      <li>Abra la puerta de la jaula mientras ofrece comida de la mano, sin intentar meter la mano dentro</li>
      <li>Si el loro acepta comer de su mano con la puerta abierta, acerque la mano gradualmente dentro de la jaula</li>
      <li>Practique el "step up" (subir al dedo): coloque el dedo horizontalmente delante de las patas del loro y aplique una presión suave hacia arriba. Si rechaza, espere y repita más tarde</li>
    </ul>

    <h3>Fase 3: Construcción de la Relación (Semanas 3-6)</h3>
    <ul>
      <li>Aumente el tiempo que el loro pasa fuera de la jaula</li>
      <li>Practique sesiones cortas de entrenamiento (5-10 minutos) basadas en refuerzo positivo</li>
      <li>Explore qué premios son más motivadores para su loro (la motivación varía por individuo)</li>
      <li>Lea el lenguaje corporal y respete los momentos en que el loro no quiere interactuar</li>
    </ul>

    <h2>Señales de Lenguaje Corporal del Loro</h2>
    <table>
      <thead><tr><th>Señal</th><th>Significado</th></tr></thead>
      <tbody>
        <tr><td>Plumas erizadas ligeramente, ojos medio cerrados</td><td>Relajado, contento</td></tr>
        <tr><td>Pupilas que se dilatan y contraen rápidamente (flasheo)</td><td>Excitado o agresivo — precaución</td></tr>
        <tr><td>Alas levantadas, plumas pegadas al cuerpo</td><td>Asustado o en modo defensivo</td></tr>
        <tr><td>Cola que se mueve de lado a lado lentamente</td><td>Contento</td></tr>
        <tr><td>Inclina la cabeza y balanceo</td><td>Curioso, interesado en interactuar</td></tr>
        <tr><td>Pico abierto mostrando lengua</td><td>Amenaza — no acerque la mano</td></tr>
      </tbody>
    </table>

    <h2>Errores Comunes al Domesticar un Loro</h2>
    <ul>
      <li><strong>Forzar el contacto físico:</strong> destruye la confianza que se está construyendo</li>
      <li><strong>Consistencia nula:</strong> un día intenso de entrenamiento y una semana sin interactuar no funciona. La consistencia diaria es clave</li>
      <li><strong>Ignorar el lenguaje corporal:</strong> interactuar cuando el loro está claramente asustado refuerza el miedo</li>
      <li><strong>Castigar:</strong> los loros no aprenden con el castigo — aprenden con el refuerzo de lo que funciona</li>
    </ul>

    <div class="faq">
      <details><summary>¿Cuánto tiempo tarda en domesticarse un loro?</summary><div class="faq-body">Depende del historial del ave y la especie. Un loro papillero puede confiar en pocos días. Un loro adulto sin socialización puede tardar semanas o meses. La paciencia y constancia son imprescindibles.</div></details>
      <details><summary>¿Se puede domesticar un loro adulto?</summary><div class="faq-body">Sí, aunque requiere más tiempo. Los loros adultos pueden perder el miedo y desarrollar vínculos con nuevos propietarios mediante desensibilización gradual y refuerzo positivo.</div></details>
      <details><summary>¿Puedo forzar a mi loro a que me deje cogerlo?</summary><div class="faq-body">No. Forzar el contacto genera miedo y desconfianza. El loro debe aprender por sí mismo que el contacto es seguro y positivo — solo se consigue respetando sus límites y con refuerzo positivo.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Entrenar un Loro Paso a Paso', desc: 'Adiestramiento con refuerzo positivo.', url: '/blog/como-entrenar-un-loro.html'},
    {title: '¿Por Qué Mi Loro Me Tiene Miedo?', desc: 'Causas del miedo y cómo superarlo.', url: '/blog/por-que-mi-loro-me-tiene-miedo.html'},
    {title: 'Cómo Socializar un Loro Recién Adoptado', desc: 'Los primeros días con un loro nuevo.', url: '/blog/socializar-loro-recien-adoptado.html'},
  ]
})});

pages.push({ file: 'blog/como-reducir-estres-loros.html', html: blogPost({
  slug: 'como-reducir-estres-loros',
  title: 'Cómo Reducir el Estrés en Loros: Causas y Técnicas Efectivas',
  titleFull: 'Cómo Reducir el Estrés en Loros: Guía Completa de Bienestar Aviar',
  desc: 'Aprende a identificar las señales de estrés en loros y aplica técnicas probadas para reducirlo. Entorno, rutinas, enriquecimiento y técnicas de desensibilización.',
  keywords: 'como reducir estres loros, estres loro signos, loro estresado que hacer, ansiedad separacion loro, bienestar psitacidas',
  badge: '🧠 Comportamiento',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuáles son las señales de estrés en un loro?","acceptedAnswer":{"@type":"Answer","text":"Las señales incluyen: plumafagia (autoarranque de plumas), gritos excesivos, agresividad inusual, estereotipias (movimientos repetitivos sin sentido), rechazo de alimentos, cambios en las heces y posturas anómalas con plumas muy erizadas."}},
    {"@type":"Question","name":"¿Qué causa más estrés a un loro?","acceptedAnswer":{"@type":"Answer","text":"Las causas más frecuentes son: cambios en la rutina o el entorno, ausencia del propietario principal, falta de estimulación mental, presencia de animales amenazantes, exposición a ruidos fuertes o cambios de temperatura, y falta de sueño suficiente."}},
    {"@type":"Question","name":"¿Cuántas horas de sueño necesita un loro?","acceptedAnswer":{"@type":"Answer","text":"Los loros necesitan entre 10 y 12 horas de sueño ininterrumpido cada noche. La falta de sueño es una fuente importante de estrés crónico que se manifiesta en irritabilidad, mayor vocalización y comportamientos problemáticos."}}
  ],
  content: `    <p>El <strong>estrés en loros</strong> es una causa subyacente de muchos problemas de salud y comportamiento. A diferencia de los mamíferos, los loros no pueden verbalizar su malestar de forma directa — lo expresan a través del comportamiento y, en casos severos, a través de la enfermedad física. Identificar y reducir el estrés es uno de los aspectos más importantes del bienestar aviar.</p>

    <h2>Señales de Estrés en un Loro</h2>
    <ul>
      <li><strong>Plumafagia:</strong> autoarranque de plumas — la manifestación más clara de estrés crónico</li>
      <li><strong>Gritos excesivos:</strong> vocalizaciones más frecuentes e intensas de lo habitual</li>
      <li><strong>Agresividad inusual:</strong> un loro habitualmente tranquilo que muerde o amenaza</li>
      <li><strong>Estereotipias:</strong> movimientos repetitivos sin función aparente (cabeceo, balanaceo continuos)</li>
      <li><strong>Rechazo de alimentos:</strong> pérdida de apetito o selectividad extrema</li>
      <li><strong>Cambios en las heces:</strong> diarrea o heces acuosas sin causa física aparente</li>
      <li><strong>Hipervigilancia:</strong> el loro permanece constantemente en alerta, nervioso ante cualquier movimiento</li>
    </ul>

    <h2>Las Causas Más Frecuentes de Estrés en Loros</h2>

    <h3>Cambios en la Rutina o el Entorno</h3>
    <p>Los loros son animales de hábitos. Un cambio de casa, un mueble nuevo en el lugar de la jaula, un horario diferente del propietario o incluso un cambio de ropa pueden generar ansiedad en aves sensibles.</p>
    <p><strong>Solución:</strong> introduzca los cambios gradualmente. Si va a cambiar la jaula de sitio, hágalo en pasos pequeños durante varios días.</p>

    <h3>Ausencia del Propietario Principal</h3>
    <p>La ansiedad de separación es especialmente común en loros con un vínculo muy fuerte con una sola persona. Cuando esa persona se ausenta por trabajo, vacaciones o enfermedad, el estrés puede ser severo.</p>
    <p><strong>Solución:</strong> trabaje la independencia desde el principio. Asegúrese de que el loro interactúa con varias personas. Practique ausencias cortas progresivas.</p>

    <h3>Falta de Sueño</h3>
    <p>Los loros necesitan 10-12 horas de sueño oscuro e ininterrumpido. Si el loro comparte espacio con el salón donde la televisión está encendida hasta las 0:00, sufre privación de sueño crónica que se manifiesta como irritabilidad, mayor vocalización y problemas de comportamiento.</p>
    <p><strong>Solución:</strong> cubra la jaula con una tela oscura a la misma hora cada noche y destápela a la misma hora cada mañana.</p>

    <h3>Estimulación Insuficiente</h3>
    <p>El aburrimiento crónico es una forma de estrés. Los loros son animales de inteligencia superior que necesitan desafíos mentales diarios.</p>
    <p><strong>Solución:</strong> enriquecimiento ambiental con puzzles de forrajeo, juguetes que rotan, interacción con el propietario y tiempo de vuelo libre.</p>

    <h2>Técnicas de Reducción del Estrés</h2>
    <h3>Rutinas Estables</h3>
    <p>Establezca horarios regulares para despertar, alimentar, interactuar y cubrir la jaula. La previsibilidad reduce drásticamente el estrés en psitácidas.</p>

    <h3>Enriquecimiento Ambiental</h3>
    <ul>
      <li>Rote los juguetes semanalmente para mantener la novedad</li>
      <li>Ofrezca puzzles de forrajeo donde el loro deba trabajar para obtener la comida</li>
      <li>Proporcione materiales para masticar y destruir (madera blanda, papel)</li>
      <li>Permita vuelo libre en zonas seguras diariamente</li>
    </ul>

    <h3>Socialización Múltiple</h3>
    <p>Asegúrese de que el loro interactúa positivamente con varias personas, no solo con una. Esto previene la ansiedad de separación y mejora la resiliencia del ave.</p>

    <h3>Música y Estimulación Auditiva</h3>
    <p>La música clásica, los sonidos de naturaleza (aves en el exterior, lluvia, viento) tienen un efecto calmante demostrado en psitácidas. Evite música con bajos fuertes o música de rock muy intensa.</p>

    <div class="faq">
      <details><summary>¿Cuáles son las señales de estrés en un loro?</summary><div class="faq-body">Plumafagia, gritos excesivos, agresividad inusual, estereotipias, rechazo de alimentos, cambios en las heces e hipervigilancia constante.</div></details>
      <details><summary>¿Qué causa más estrés a un loro?</summary><div class="faq-body">Cambios en la rutina, ausencia del propietario principal, falta de estimulación mental, presencia de animales amenazantes, ruidos fuertes y falta de sueño suficiente.</div></details>
      <details><summary>¿Cuántas horas de sueño necesita un loro?</summary><div class="faq-body">Entre 10 y 12 horas de sueño ininterrumpido cada noche. La falta de sueño es una fuente importante de estrés crónico que se manifiesta en irritabilidad y comportamientos problemáticos.</div></details>
    </div>`,
  related: [
    {title: '¿Por Qué Grita Mi Loro?', desc: 'Causas y soluciones para los gritos excesivos.', url: '/blog/por-que-grita-mi-loro.html'},
    {title: 'Plumafagia en Loros', desc: 'Causas y cómo solucionarla.', url: '/blog/plumafagia-loros-causas.html'},
    {title: 'Cómo Fortalecer el Vínculo con tu Loro', desc: 'Técnicas para una relación más profunda.', url: '/blog/fortalecer-vinculo-loro.html'},
  ]
})});

pages.push({ file: 'blog/por-que-mi-loro-me-tiene-miedo.html', html: blogPost({
  slug: 'por-que-mi-loro-me-tiene-miedo',
  title: '¿Por Qué Mi Loro Me Tiene Miedo? Causas y Cómo Recuperar la Confianza',
  titleFull: '¿Por Qué Mi Loro Me Tiene Miedo? Guía para Recuperar la Confianza',
  desc: 'Descubre por qué tu loro ha desarrollado miedo a las personas y qué técnicas usar para recuperar su confianza de forma gradual y sin estrés.',
  keywords: 'loro me tiene miedo, loro asustado personas, como ganar confianza loro, loro huye de mi, loro agresivo por miedo',
  badge: '🧠 Comportamiento',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Por qué un loro que antes era manso de repente tiene miedo?","acceptedAnswer":{"@type":"Answer","text":"Los cambios repentinos de comportamiento pueden deberse a una experiencia traumática (caída, susto fuerte), dolor o enfermedad, cambio de propietario o entorno, o la llegada de la pubertad (los loros jóvenes en edad de maduración sexual pueden volverse más desconfiados temporalmente)."}},
    {"@type":"Question","name":"¿Cuánto tiempo tarda en perder el miedo un loro asustado?","acceptedAnswer":{"@type":"Answer","text":"Depende de la causa, la especie y el historial del ave. En loros con un susto puntual, puede recuperar la confianza en días o semanas con paciencia. En loros con trauma severo o historial de maltrato, el proceso puede llevar meses de trabajo constante."}},
    {"@type":"Question","name":"¿Debo forzar a mi loro a salir de la jaula si tiene miedo?","acceptedAnswer":{"@type":"Answer","text":"No. Forzarlo empeora el miedo y destruye la confianza. El objetivo es que el loro aprenda por experiencia propia que salir de la jaula y acercarse a ti es seguro y positivo. Esto solo se consigue respetando su ritmo y usando refuerzo positivo."}}
  ],
  content: `    <p>El <strong>miedo en loros</strong> es uno de los problemas de comportamiento más frustrantes para los propietarios. Puede aparecer de repente en un loro antes manso, o puede ser un rasgo persistente en aves que nunca fueron bien socializadas. En ambos casos, la solución pasa por comprender el origen del miedo y aplicar un proceso de desensibilización gradual.</p>

    <h2>Por Qué los Loros Desarrollan Miedo a las Personas</h2>

    <h3>Socialización Deficiente en las Primeras Semanas de Vida</h3>
    <p>Las primeras semanas de vida son el "período sensible" para la socialización de los loros. Un loro papillero criado a mano con contacto humano positivo desde el nacimiento raramente desarrolla miedo a las personas. Un loro criado por sus padres sin contacto humano durante este período puede tardar mucho más en confiar en los humanos.</p>

    <h3>Experiencia Traumática</h3>
    <p>Un susto fuerte (caída, ataque de otro animal, manejo brusco) puede generar miedo condicionado que persiste mucho después de que el evento haya pasado. El loro aprende a asociar la presencia humana (o de manos, o de determinados movimientos) con peligro.</p>

    <h3>Enfermedad o Dolor</h3>
    <p>Un loro que de repente se vuelve huidizo o agresivo puede estar sufriendo dolor. La exploración veterinaria debe ser el primer paso ante cualquier cambio repentino de comportamiento.</p>

    <h3>Pubertad y Cambios Hormonales</h3>
    <p>Los loros jóvenes en edad de maduración sexual (varía por especie, entre 1 y 5 años) pueden experimentar cambios de comportamiento drásticos. La desconfianza o agresividad temporal en esta etapa es relativamente común y suele remitir.</p>

    <h3>Cambio de Propietario o Entorno</h3>
    <p>Un loro adoptado puede tardar tiempo en confiar en el nuevo propietario, especialmente si tuvo un manejo deficiente en la casa anterior.</p>

    <h2>Señales de Miedo en un Loro</h2>
    <ul>
      <li>Alas apretadas contra el cuerpo (posición de "fuga")</li>
      <li>Intento de escapar cuando se acerca la mano</li>
      <li>Pico abierto en posición amenazante aunque no ataque</li>
      <li>Respiración acelerada</li>
      <li>Huida hacia el fondo de la jaula ante cualquier movimiento</li>
      <li>Mordedura por miedo (diferente a la mordedura de dominancia)</li>
    </ul>

    <h2>Cómo Recuperar la Confianza de un Loro con Miedo</h2>

    <h3>Paso 1: Elimine Cualquier Causa Médica</h3>
    <p>Antes de trabajar el comportamiento, consulte al veterinario para descartar que el cambio de comportamiento tenga una causa física (dolor, enfermedad).</p>

    <h3>Paso 2: Desensibilización por Proximidad</h3>
    <p>Durante varios días, simplemente esté cerca de la jaula sin intentar interactuar. Hable en voz baja, lea en voz alta, cante o tarareé. El loro aprende que su presencia no supone amenaza.</p>

    <h3>Paso 3: Ofrezca Comida como Herramienta de Desensibilización</h3>
    <p>Ofrezca alimentos muy apetecidos (trozos de fruta, nueces) a través de los barrotes. No mueva la mano bruscamente. Con el tiempo, el loro asociará su mano con algo positivo.</p>

    <h3>Paso 4: Respete el Ritmo del Loro</h3>
    <p>Nunca fuerce el contacto. Si el loro muestra señales de estrés, retroceda y retome al día siguiente. Los pequeños progresos sostenidos son más efectivos que los intentos forzados.</p>

    <div class="faq">
      <details><summary>¿Por qué un loro que antes era manso de repente tiene miedo?</summary><div class="faq-body">Puede deberse a una experiencia traumática, dolor o enfermedad, cambio de propietario o entorno, o la llegada de la pubertad. La exploración veterinaria debe ser el primer paso.</div></details>
      <details><summary>¿Cuánto tiempo tarda en perder el miedo un loro asustado?</summary><div class="faq-body">Depende de la causa. Con un susto puntual puede recuperar la confianza en días o semanas. Con trauma severo o historial de maltrato, el proceso puede llevar meses de trabajo constante.</div></details>
      <details><summary>¿Debo forzar a mi loro a salir de la jaula si tiene miedo?</summary><div class="faq-body">No. Forzarlo empeora el miedo. El loro debe aprender por experiencia propia que acercarse a ti es seguro. Solo se consigue respetando su ritmo con refuerzo positivo.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Domesticar un Loro', desc: 'Guía paso a paso para ganar su confianza.', url: '/blog/como-domesticar-un-loro.html'},
    {title: 'Cómo Reducir el Estrés en Loros', desc: 'Técnicas para calmar y estabilizar al loro.', url: '/blog/como-reducir-estres-loros.html'},
    {title: 'Cómo Socializar un Loro Recién Adoptado', desc: 'Los primeros días con un loro nuevo.', url: '/blog/socializar-loro-recien-adoptado.html'},
  ]
})});

pages.push({ file: 'blog/fortalecer-vinculo-loro.html', html: blogPost({
  slug: 'fortalecer-vinculo-loro',
  title: 'Cómo Fortalecer el Vínculo con tu Loro: Técnicas y Actividades',
  titleFull: 'Cómo Fortalecer el Vínculo con tu Loro: Guía Completa de Bonding Aviar',
  desc: 'Aprende a fortalecer el vínculo con tu loro mediante actividades diarias, técnicas de comunicación y el sistema del refuerzo positivo. Más que una mascota, un compañero.',
  keywords: 'fortalecer vinculo loro, bonding loro, relacion loro propietario, loro apego, actividades con loro en casa',
  badge: '🧠 Comportamiento',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuánto tiempo al día debo pasar con mi loro?","acceptedAnswer":{"@type":"Answer","text":"Lo mínimo recomendado es 2-3 horas de interacción activa diaria, fuera de la jaula. Esto no significa interacción intensa todo el tiempo — el loro puede estar en su árbol-jaula fuera mientras el propietario trabaja, siempre que haya momentos de interacción de calidad."}},
    {"@type":"Question","name":"¿Qué actividades fortalecen el vínculo con un loro?","acceptedAnswer":{"@type":"Answer","text":"Las más efectivas son: comer juntos (compartir alimentos seguros de vuestra mano), sesiones de preacicalamiento (rascado en la cabeza si el loro lo acepta), jugar con juguetes interactivos, entrenamiento de trucos con refuerzo positivo y hablar/cantar con el loro regularmente."}},
    {"@type":"Question","name":"¿Mi loro puede vincularse con más de una persona?","acceptedAnswer":{"@type":"Answer","text":"Sí, y es muy recomendable que así sea. Los loros monogámicos en la naturaleza forman vínculos fuertes pero también interactúan con la bandada. Un loro que solo está vinculado a una persona desarrolla mayor ansiedad de separación."}}
  ],
  content: `    <p>El vínculo entre un loro y su propietario es uno de los más intensos del reino animal. Los loros son aves monógamas por naturaleza que forman lazos de por vida. En cautividad, el propietario asume el rol del compañero. <strong>Fortalecer este vínculo</strong> activamente tiene un impacto directo en la salud mental y el bienestar del ave.</p>

    <h2>Por Qué el Vínculo es Crucial para la Salud del Loro</h2>
    <p>Los estudios sobre bienestar de psitácidas muestran que los loros con vínculos fuertes y relaciones positivas con sus propietarios tienen:</p>
    <ul>
      <li>Menor incidencia de plumafagia y otros comportamientos estereotípicos</li>
      <li>Mayor actividad e interés por el entorno</li>
      <li>Mejor sistema inmunológico</li>
      <li>Mayor esperanza de vida</li>
      <li>Menor estrés ante situaciones inevitables (veterinario, cambios de entorno)</li>
    </ul>

    <h2>Las Bases del Vínculo Aviar</h2>

    <h3>El Preacicalamiento (Allopreening)</h3>
    <p>En la naturaleza, los loros se preacicalan mutuamente — se limpian las plumas de la cabeza que no pueden alcanzar solos. Este comportamiento es una de las principales formas de refuerzo del vínculo entre parejas.</p>
    <p>Si su loro inclina la cabeza hacia usted y levanta la nuca, le está invitando a preacicalarle. Rasque suavemente las plumas de la cabeza y el cuello con la uña del dedo. No insista si el loro se aparta.</p>

    <h3>Comer Juntos</h3>
    <p>Compartir la comida es un comportamiento de bandada que refuerza la confianza. Coma fruta o verdura cerca del loro, ofreciéndole trozos de su plato. El loro aprende a asociarle con fuente de alimento positivo.</p>

    <h3>Comunicación Vocal</h3>
    <p>Los loros se comunican constantemente con la voz. Hablar con su loro, cantarle, imitar sus sonidos y responder a sus vocalizaciones fortalece el vínculo. No importa lo que diga — el tono y la intención son lo que el loro interpreta.</p>

    <h2>Actividades para Fortalecer el Vínculo</h2>

    <h3>Sesiones de Entrenamiento de Trucos</h3>
    <p>El entrenamiento con refuerzo positivo es una de las actividades que más fortalece el vínculo. No porque el loro haga lo que se le pide, sino porque crea un contexto de comunicación mutua, motivación compartida y recompensas positivas. Empiece por trucos simples: "step up", "step down", dar la pata.</p>

    <h3>Tiempo Fuera de la Jaula</h3>
    <p>El loro debe pasar mínimo 2-3 horas diarias fuera de la jaula. Este tiempo puede incluir:</p>
    <ul>
      <li>Estar en su árbol-jaula o percha externa mientras el propietario trabaja cerca</li>
      <li>Explorar zonas seguras de la casa</li>
      <li>Jugar en el suelo con juguetes que el propietario también manipula</li>
      <li>Volar libremente en espacios seguros</li>
    </ul>

    <h3>Actividades Cognitivas Compartidas</h3>
    <ul>
      <li>Esconder comida en puzzles de forrajeo que el propietario "resuelve" junto al loro</li>
      <li>Leer en voz alta mientras el loro está en el hombro</li>
      <li>Escuchar música y cantarle</li>
      <li>Ofrecer juguetes nuevos que explore "junto" al propietario</li>
    </ul>

    <h2>Señales de un Vínculo Fuerte</h2>
    <ul>
      <li>El loro busca activamente la proximidad del propietario</li>
      <li>Inclina la cabeza para ser preacicalado</li>
      <li>Vocaliza de forma alegre cuando el propietario aparece</li>
      <li>Acepta el "step up" sin resistencia</li>
      <li>Come de la mano del propietario</li>
      <li>Se duerme relajado en presencia del propietario</li>
    </ul>

    <div class="faq">
      <details><summary>¿Cuánto tiempo al día debo pasar con mi loro?</summary><div class="faq-body">Lo mínimo recomendado es 2-3 horas de interacción activa fuera de la jaula. El loro puede estar cerca mientras trabajas, pero necesita momentos de interacción de calidad.</div></details>
      <details><summary>¿Qué actividades fortalecen el vínculo con un loro?</summary><div class="faq-body">Comer juntos compartiendo alimentos, preacicalamiento (rascado en la cabeza), entrenamiento de trucos con refuerzo positivo, jugar con juguetes interactivos y hablar/cantar regularmente.</div></details>
      <details><summary>¿Mi loro puede vincularse con más de una persona?</summary><div class="faq-body">Sí, y es muy recomendable. Un loro que solo está vinculado a una persona desarrolla mayor ansiedad de separación. Asegúrese de que interactúa positivamente con varias personas.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Entrenar un Loro Paso a Paso', desc: 'Adiestramiento con refuerzo positivo.', url: '/blog/como-entrenar-un-loro.html'},
    {title: 'Cómo Reducir el Estrés en Loros', desc: 'Técnicas para calmar y estabilizar al loro.', url: '/blog/como-reducir-estres-loros.html'},
    {title: 'Cómo Domesticar un Loro', desc: 'Guía para ganar su confianza.', url: '/blog/como-domesticar-un-loro.html'},
  ]
})});

pages.push({ file: 'blog/como-entrenar-un-loro.html', html: blogPost({
  slug: 'como-entrenar-un-loro',
  title: 'Cómo Entrenar un Loro Paso a Paso: Adiestramiento con Refuerzo Positivo',
  titleFull: 'Cómo Entrenar un Loro Paso a Paso: Guía Completa de Adiestramiento Aviar',
  desc: 'Aprende a entrenar a tu loro con refuerzo positivo. Trucos básicos, técnicas de clicker training, sesiones de entrenamiento y cómo resolver problemas comunes.',
  keywords: 'como entrenar un loro, adiestramiento loros, refuerzo positivo loros, clicker training loros, trucos loros en casa',
  badge: '🧠 Comportamiento',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Qué trucos puede aprender un loro?","acceptedAnswer":{"@type":"Answer","text":"Los loros pueden aprender una gran variedad de comportamientos: step up (subir al dedo), step down, wave (saludar), giro, agacharse, target training, venir cuando se llama, abrir la jaula, distinguir objetos por color o forma, y muchos más según las capacidades individuales de cada ave."}},
    {"@type":"Question","name":"¿Cuánto dura una sesión de entrenamiento para loros?","acceptedAnswer":{"@type":"Answer","text":"Las sesiones de entrenamiento para loros deben ser cortas: entre 5 y 15 minutos máximo, 2-3 veces al día. Los loros tienen una capacidad de atención intensa pero se cansan y aburren rápido. Terminar siempre en éxito (pidiendo algo que ya saben hacer bien) asegura una experiencia positiva."}},
    {"@type":"Question","name":"¿Se puede usar castigo para entrenar a un loro?","acceptedAnswer":{"@type":"Answer","text":"No. El castigo deteriora la confianza y puede desencadenar agresividad o miedo. Los loros solo aprenden eficientemente con refuerzo positivo: recompensando los comportamientos correctos. El castigo nunca funciona en adiestramiento aviar."}}
  ],
  content: `    <p>El <strong>adiestramiento de loros</strong> con refuerzo positivo es una de las actividades más gratificantes que puede compartir con su ave. No se trata solo de que el loro aprenda trucos — el entrenamiento es una herramienta para fortalecer el vínculo, estimular mentalmente al loro y crear canales de comunicación mutuamente comprensibles.</p>

    <h2>El Principio del Refuerzo Positivo</h2>
    <p>El refuerzo positivo es simple: cuando el loro hace algo que queremos, le damos algo que valora (premio, elogio). Esto hace que sea más probable que repita ese comportamiento. No se usa castigo, no se fuerza, no se grita.</p>
    <p>¿Por qué funciona con loros?</p>
    <ul>
      <li>Los loros son extremadamente inteligentes y aprenden rápido la conexión causa-efecto</li>
      <li>La motivación mediante premios apetecidos genera un loro activo y participativo</li>
      <li>Elimina el miedo como componente de la interacción</li>
      <li>Crea un ambiente de aprendizaje positivo que el loro busca activamente</li>
    </ul>

    <h2>Herramientas de Entrenamiento</h2>
    <h3>El Premio Correcto</h3>
    <p>El premio más efectivo varía por individuo. Pruebe diferentes opciones:</p>
    <ul>
      <li>Trozos muy pequeños de su fruta favorita (del tamaño de un garbanzo)</li>
      <li>Nueces o semillas que no son parte de la dieta habitual</li>
      <li>Preacicalamiento si el loro lo valora</li>
      <li>Elogio vocal entusiasta (funciona mejor como refuerzo secundario)</li>
    </ul>

    <h3>Clicker Training (Opcional pero Muy Efectivo)</h3>
    <p>El clicker es un pequeño dispositivo que produce un sonido "clic" exacto y consistente. Se usa para "marcar" el comportamiento correcto en el instante exacto en que ocurre, antes de dar el premio. Ventajas:</p>
    <ul>
      <li>Precisión: el clic marca exactamente el comportamiento correcto</li>
      <li>Consistencia: siempre suena igual, sin las variaciones de la voz humana</li>
      <li>Velocidad: el loro entiende inmediatamente qué ha hecho bien</li>
    </ul>

    <h2>Los 5 Trucos Básicos para Empezar</h2>

    <h3>1. Step Up (Subir al Dedo)</h3>
    <p>El truco más fundamental. Coloque el dedo horizontalmente frente a las patas del loro, aplique una presión suave hacia arriba y diga "step up". Cuando el loro ponga aunque sea una pata en el dedo, premie inmediatamente. Repita.</p>

    <h3>2. Step Down (Bajar del Dedo)</h3>
    <p>Acerque el dedo con el loro a una percha o superficie, diga "step down" y cuando el loro ponga una pata en la percha, premie. Más sencillo que el step up porque el loro lo hace naturalmente.</p>

    <h3>3. Target Training (Tocar el Target)</h3>
    <p>Entrene al loro a tocar un objeto específico (una varita con bolita en la punta). Cuando el loro toca el target, clic + premio. Una vez que lo hace consistentemente, puede usar el target para moverlo a lugares deseados.</p>

    <h3>4. Wave (Saludar Levantando la Pata)</h3>
    <p>Una vez que el loro domina el step up, inicie el movimiento pero retire el dedo justo antes de que el loro suba. El loro levantará la pata "en el aire" buscando el dedo. Ese es el momento de hacer clic y premiar.</p>

    <h3>5. Volver a la Jaula por su Propio Pie</h3>
    <p>Use el target o un premio para guiar al loro de vuelta a la jaula. Nunca lo fuerce a volver — hace que la jaula sea percibida como castigo.</p>

    <h2>Sesiones de Entrenamiento Efectivas</h2>
    <ul>
      <li><strong>Duración:</strong> 5-15 minutos máximo, 2-3 veces al día</li>
      <li><strong>Momento:</strong> cuando el loro está activo y ligeramente hambriento (antes de las comidas principales)</li>
      <li><strong>Terminar en éxito:</strong> pida siempre algo que ya sabe hacer bien al finalizar</li>
      <li><strong>Una cosa a la vez:</strong> trabaje un comportamiento nuevo hasta que esté asentado antes de introducir otro</li>
      <li><strong>Paciencia:</strong> nunca se frustre visiblemente — los loros son muy sensibles a las emociones del propietario</li>
    </ul>

    <div class="faq">
      <details><summary>¿Qué trucos puede aprender un loro?</summary><div class="faq-body">Step up, step down, saludar, girar, volver a la jaula, target training, distinguir objetos, y muchos más según las capacidades individuales.</div></details>
      <details><summary>¿Cuánto dura una sesión de entrenamiento?</summary><div class="faq-body">5-15 minutos máximo, 2-3 veces al día. Terminar siempre en éxito asegura una experiencia positiva.</div></details>
      <details><summary>¿Se puede usar castigo para entrenar a un loro?</summary><div class="faq-body">No. El castigo deteriora la confianza y puede desencadenar agresividad o miedo. Solo el refuerzo positivo funciona eficientemente en adiestramiento aviar.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Domesticar un Loro', desc: 'Guía paso a paso para ganar su confianza.', url: '/blog/como-domesticar-un-loro.html'},
    {title: 'Fortalecer el Vínculo con tu Loro', desc: 'Actividades y técnicas de bonding.', url: '/blog/fortalecer-vinculo-loro.html'},
    {title: 'Cómo Enseñar a Hablar a un Loro', desc: 'Técnicas para desarrollar el vocabulario.', url: '/blog/como-ensenar-a-hablar-un-loro.html'},
  ]
})});

pages.push({ file: 'blog/lenguaje-corporal-loros.html', html: blogPost({
  slug: 'lenguaje-corporal-loros',
  title: 'Lenguaje Corporal de los Loros: Guía para Entender a tu Loro',
  titleFull: 'Lenguaje Corporal de los Loros: Qué Significan Sus Posturas y Gestos',
  desc: 'Aprende a leer el lenguaje corporal de tu loro: qué significan las posturas, el movimiento de las plumas, los ojos y la cola. Comunícate mejor con tu psitácida.',
  keywords: 'lenguaje corporal loros, posturas loros significado, como entender a mi loro, loro plumas erizadas significado, flasheo ojos loro',
  badge: '🧠 Comportamiento',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Qué significa que un loro eriza las plumas?","acceptedAnswer":{"@type":"Answer","text":"Depende del contexto. Si eriza solo las plumas de la cabeza ligeramente mientras lo acaricias, está contento y relajado. Si eriza TODAS las plumas de forma continua durante el día, puede indicar frío o enfermedad y requiere atención veterinaria."}},
    {"@type":"Question","name":"¿Qué es el flasheo de ojos en los loros?","acceptedAnswer":{"@type":"Answer","text":"El flasheo o pinning es la dilatación y contracción rápida de las pupilas. Indica excitación intensa — puede ser positiva (entusiasmo ante un premio o juego) o negativa (agresividad). El contexto determina la interpretación. Si va acompañado de plumas erizadas y pico abierto, indica agresividad."}},
    {"@type":"Question","name":"¿Por qué el loro abre el pico ampliamente sin hacer ruido?","acceptedAnswer":{"@type":"Answer","text":"Abrir el pico ampliamente sin vocalizar (bostezo) es una señal de relajación y comodidad. También puede indicar que el loro está haciendo ajustes en el buche. Si el loro lo hace frecuentemente con esfuerzo visible, puede indicar un problema en el buche o tráquea."}}
  ],
  content: `    <p>Los <strong>loros se comunican principalmente a través del lenguaje corporal</strong>. Su cara está limitada en expresión (sin músculos faciales como los mamíferos), pero el movimiento de las plumas, la postura, el uso de las alas y los ojos son un sistema de comunicación extraordinariamente rico. Aprender a leerlo transforma radicalmente la relación propietario-loro.</p>

    <h2>El Lenguaje de las Plumas</h2>

    <h3>Plumas Completamente Lisas y Pegadas al Cuerpo</h3>
    <p>El loro está alerta, ligeramente estresado o en actitud defensiva. Si va acompañado de otros signos (alas abiertas, pico abierto), indica preparación para atacar.</p>

    <h3>Plumas Ligeramente Infladas (Solo la Cabeza)</h3>
    <p>Señal de confort y relajación, especialmente si el loro inclina la cabeza hacia ti. Te está invitando a preacicalarle.</p>

    <h3>Plumas de Todo el Cuerpo Infladas (Estado Permanente)</h3>
    <p>Durante el día, puede indicar frío, enfermedad o gran malestar. Durante la noche o la siesta es completamente normal.</p>

    <h3>Plumas Erizadas Acompañadas de Temblores</h3>
    <p>Combinación que puede indicar enfermedad, hipocalcemia o frío severo. Requiere evaluación veterinaria.</p>

    <h2>El Lenguaje de los Ojos</h2>

    <h3>Flasheo o Pinning (Dilatación y Contracción Rápida de Pupilas)</h3>
    <p>Una de las señales más características de los loros, especialmente visible en el yaco y las amazonas. Indica excitación intensa:</p>
    <ul>
      <li>En contexto positivo (comida, juguete, propietario): entusiasmo</li>
      <li>En contexto de contacto: puede preceder a un mordisco — tenga cuidado</li>
      <li>Acompañado de plumas erizadas y pico abierto: señal de ataque</li>
    </ul>

    <h3>Ojos Semicerrados</h3>
    <p>Relajación y confianza. Un loro que cierra los ojos lentamente mientras le acaricias es una señal de confort total.</p>

    <h3>Parpadeo Lento (Similar a los Gatos)</h3>
    <p>Señal de afecto y confianza. Algunos loros "parpadean" a sus propietarios como muestra de vínculo.</p>

    <h2>El Lenguaje del Cuerpo y las Alas</h2>

    <h3>Aleteo con las Alas (Sin Volar)</h3>
    <p>Puede ser ejercicio normal (estiramiento), excitación positiva o un intento de llamar la atención. El contexto determina la interpretación.</p>

    <h3>Una Ala Caída a un Lado</h3>
    <p>Si es persistente (más de unos minutos) y el loro parece molestar, puede indicar una lesión en el ala. Requiere evaluación veterinaria.</p>

    <h3>Alas Abiertas en Posición de Ataque</h3>
    <p>El loro se siente amenazado o está defendiendo su territorio. No acerque la mano.</p>

    <h3>Balanceo de Lado a Lado</h3>
    <p>Señal de excitación positiva, especialmente frecuente en guacamayos y cacatúas. Suele preceder a la vocalización o el juego.</p>

    <h2>El Lenguaje de la Cola</h2>
    <ul>
      <li><strong>Cola abanicada (abierta lateralmente):</strong> excitación intensa o señal de amenaza</li>
      <li><strong>Cola que se mueve lentamente de lado a lado:</strong> contento y relajado</li>
      <li><strong>Cola muy apretada y hacia abajo:</strong> miedo o malestar</li>
      <li><strong>Cola que se mueve rítmicamente arriba y abajo al respirar:</strong> puede indicar esfuerzo respiratorio — señal de alarma</li>
    </ul>

    <h2>Señales de Pico</h2>
    <ul>
      <li><strong>Pico entreabierto con lengua visible:</strong> amenaza — está dispuesto a morder</li>
      <li><strong>Pico cerrado frotándose sobre percha:</strong> comportamiento normal de limpieza y desgaste</li>
      <li><strong>Pico abierto ampliamente sin ruido:</strong> bostezo — relajación</li>
      <li><strong>Rechinar de pico (beak grinding):</strong> sonido de frotamiento rítmico — señal de somnolencia y confort</li>
      <li><strong>Chasquido de pico:</strong> advertencia — detén lo que estás haciendo</li>
    </ul>

    <div class="faq">
      <details><summary>¿Qué significa que un loro eriza las plumas?</summary><div class="faq-body">Depende del contexto. Erizadas solo en la cabeza = relajado y contento. Plumas de todo el cuerpo erizadas permanentemente durante el día puede indicar frío o enfermedad.</div></details>
      <details><summary>¿Qué es el flasheo de ojos en los loros?</summary><div class="faq-body">La dilatación y contracción rápida de las pupilas indica excitación intensa — positiva o negativa según el contexto. Si va acompañado de plumas erizadas y pico abierto, indica agresividad.</div></details>
      <details><summary>¿Por qué el loro abre el pico ampliamente sin hacer ruido?</summary><div class="faq-body">El "bostezo" en loros es señal de relajación. Si lo hace frecuentemente con esfuerzo visible, puede indicar un problema en el buche o tráquea.</div></details>
    </div>`,
  related: [
    {title: 'Cómo Entrenar un Loro Paso a Paso', desc: 'Adiestramiento con refuerzo positivo.', url: '/blog/como-entrenar-un-loro.html'},
    {title: 'Cómo Domesticar un Loro', desc: 'Guía para ganar la confianza del loro.', url: '/blog/como-domesticar-un-loro.html'},
    {title: 'Fortalecer el Vínculo con tu Loro', desc: 'Actividades y técnicas de bonding.', url: '/blog/fortalecer-vinculo-loro.html'},
  ]
})});

// ─── CLUSTER 4: BUYER INTENT ──────────────────────────────────────────────

pages.push({ file: 'blog/precio-amazona-frente-azul-espana.html', html: blogPost({
  slug: 'precio-amazona-frente-azul-espana',
  title: 'Precio del Amazona Frente Azul en España 2026: Bajo Consulta',
  titleFull: 'Amazona Frente Azul en España: Precio, Características y Disponibilidad',
  desc: 'Información sobre el amazona frente azul (Amazona aestiva) en España: características, cuidados, disponibilidad y cómo consultar precio actualizado con documentación CITES.',
  keywords: 'precio amazona frente azul espana, amazona aestiva precio, comprar amazona frente azul, loro amazona frente azul caracteristicas',
  badge: '🛒 Compra',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuánto cuesta un amazona frente azul en España?","acceptedAnswer":{"@type":"Answer","text":"El precio de un amazona frente azul varía según la edad, el sexo y la disponibilidad del ejemplar en el momento de la consulta. Contacte directamente con el criadero para recibir información actualizada sobre disponibilidad y precio."}},
    {"@type":"Question","name":"¿El amazona frente azul necesita documentación CITES?","acceptedAnswer":{"@type":"Answer","text":"Sí. El amazona frente azul (Amazona aestiva) está incluido en el Apéndice II del Convenio CITES, lo que requiere documentación específica para su comercialización legal en España. Todo ejemplar criado en cautividad debe contar con certificado CITES, anilla cerrada y certificado de nacimiento en cautividad."}},
    {"@type":"Question","name":"¿Cuánto vive un amazona frente azul?","acceptedAnswer":{"@type":"Answer","text":"El amazona frente azul puede vivir entre 40 y 60 años en cautividad con buenos cuidados. Es un compromiso de vida que requiere reflexión previa a su adquisición."}}
  ],
  content: `    <p>El <strong>amazona frente azul (Amazona aestiva)</strong>, también conocido como loro hablador, amazona turquesa o "loro azul", es una de las especies de amazona más populares en España y una de las psitácidas con mayor capacidad verbal nativa de América del Sur. En este artículo le proporcionamos toda la información necesaria antes de plantearse su adquisición.</p>

    <h2>Características del Amazona Frente Azul</h2>
    <p>El amazona frente azul destaca por:</p>
    <ul>
      <li><strong>Tamaño:</strong> mediano, aproximadamente 37 cm de longitud y 400-550g de peso</li>
      <li><strong>Coloración:</strong> plumaje predominantemente verde con frente azul turquesa, manchas rojas en las alas y cola con tonos rojizos</li>
      <li><strong>Capacidad vocal:</strong> es considerada una de las amazonas con mayor talento para imitar el habla humana, junto con la amazona de frente amarilla (Amazona ochrocephala)</li>
      <li><strong>Carácter:</strong> extrovertida, vocal, con fuerte personalidad. Puede ser territorial en época reproductiva</li>
      <li><strong>Longevidad:</strong> 40-60 años en cautividad</li>
    </ul>

    <h2>La Amazona Frente Azul como Mascota</h2>
    <p>El amazona frente azul es una excelente mascota para propietarios con experiencia en psitácidas medianas-grandes. Sus características principales como animal de compañía:</p>
    <ul>
      <li><strong>Capacidad de aprendizaje verbal:</strong> puede desarrollar un vocabulario de decenas a cientos de palabras y frases con entrenamiento consistente</li>
      <li><strong>Sociabilidad:</strong> es un loro social que necesita interacción diaria. Sin estimulación suficiente, puede desarrollar comportamientos problemáticos</li>
      <li><strong>Nivel sonoro:</strong> es una de las especies más vocales de las amazonas. Los vecinos son una consideración real</li>
      <li><strong>Ciclos hormonales:</strong> durante la primavera, puede volverse más territorial y morder con más facilidad — comportamiento estacional normal</li>
      <li><strong>Compatibilidad con familias:</strong> con buena socialización, se adapta bien a hogares con varios miembros</li>
    </ul>

    <h2>Documentación CITES Necesaria en España</h2>
    <p>El amazona frente azul está incluido en el <strong>Apéndice II del Convenio CITES</strong>. Aunque la protección es menor que el Apéndice I (como el loro gris africano), sigue requiriendo documentación legal específica:</p>
    <ul>
      <li>Certificado CITES Apéndice II</li>
      <li>Anilla cerrada que certifica el nacimiento en cautividad</li>
      <li>Certificado de nacimiento de criadero registrado</li>
      <li>Factura del vendedor con CIF y número de operador CITES</li>
    </ul>
    <p>Adquirir un amazona sin esta documentación en España es una infracción grave que puede acarrear multas y el decomiso del animal.</p>

    <h2>Cuidados Básicos del Amazona Frente Azul</h2>
    <ul>
      <li><strong>Jaula:</strong> mínimo 90x70x110 cm. Necesita espacio para extender las alas horizontalmente</li>
      <li><strong>Dieta:</strong> pellets como base, complementados con verduras frescas ricas en vitamina A (zanahoria, boniato, pimiento) y fruta</li>
      <li><strong>Ejercicio:</strong> mínimo 3 horas fuera de la jaula diariamente</li>
      <li><strong>Estimulación:</strong> juguetes rotatorios, puzzles de forrajeo, entrenamiento de trucos</li>
      <li><strong>Higiene:</strong> baños 3 veces por semana (ducha o nebulizador)</li>
    </ul>

    <h2>¿Cómo Consultar la Disponibilidad y el Precio?</h2>
    <p>El precio del amazona frente azul varía según el momento, la edad del ejemplar y la disponibilidad actual del criadero. Los precios concretos no se publican en línea porque cambian según los ciclos de cría y el estado de cada ave disponible. Para obtener información actualizada:</p>
    <ul>
      <li>Escríbanos a <a href="mailto:info@paraisodeaves.com">info@paraisodeaves.com</a> indicando su interés en el amazona frente azul</li>
      <li>Le informaremos de la disponibilidad actual, características del ejemplar y precio</li>
      <li>Le enviaremos fotos y vídeos actuales del ave disponible</li>
    </ul>

    <div class="faq">
      <details><summary>¿Cuánto cuesta un amazona frente azul en España?</summary><div class="faq-body">El precio varía según edad, sexo y disponibilidad. Contacte directamente con el criadero para recibir información actualizada.</div></details>
      <details><summary>¿El amazona frente azul necesita documentación CITES?</summary><div class="faq-body">Sí. Está en el Apéndice II del Convenio CITES. Requiere certificado CITES, anilla cerrada y certificado de nacimiento en cautividad para su comercialización legal en España.</div></details>
      <details><summary>¿Cuánto vive un amazona frente azul?</summary><div class="faq-body">Entre 40 y 60 años en cautividad con buenos cuidados. Es un compromiso de vida que requiere reflexión previa.</div></details>
    </div>`,
  related: [
    {title: 'Precio del Loro Amazónico', desc: 'Información sobre precios de loros amazónicos.', url: '/blog/precio-loro-amazonico.html'},
    {title: '¿Qué Loro Habla Mejor?', desc: 'Comparativa de capacidades verbales.', url: '/blog/que-loro-habla-mejor.html'},
    {title: 'Cómo Comprar un Loro Legal en España', desc: 'Documentación y pasos necesarios.', url: '/blog/comprar-loro-legal-espana.html'},
  ]
})});

pages.push({ file: 'blog/cuanto-cuesta-mantener-loro-al-ano.html', html: blogPost({
  slug: 'cuanto-cuesta-mantener-loro-al-ano',
  title: 'Cuánto Cuesta Mantener un Loro al Año en España (2026)',
  titleFull: 'Cuánto Cuesta Mantener un Loro al Año en España: Presupuesto Completo 2026',
  desc: 'Calcula el coste anual de mantener un loro en España: alimentación, veterinario, jaula, juguetes y más. Presupuesto detallado por especie para 2026.',
  keywords: 'cuanto cuesta mantener un loro al año, coste anual loro espana, presupuesto loro espana 2026, gastos tener un loro, mantenimiento loro precio',
  badge: '🛒 Compra',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuánto cuesta mantener un loro al año en España?","acceptedAnswer":{"@type":"Answer","text":"El coste anual varía significativamente según la especie. Para un loro mediano (amazona, cacatúa) el presupuesto anual suele estar entre 1.200€ y 2.500€ incluyendo alimentación, veterinario, accesorios y gastos varios. Los guacamayos grandes pueden superar los 3.000€ anuales."}},
    {"@type":"Question","name":"¿Cuál es el mayor gasto de un loro al año?","acceptedAnswer":{"@type":"Answer","text":"Para la mayoría de propietarios, los costes veterinarios son los más variables e imprevisibles. La alimentación de calidad (pellets premium) es el gasto fijo más significativo. El primer año tiene gastos adicionales de instalación (jaula, accesorios iniciales) que no se repiten."}},
    {"@type":"Question","name":"¿Merece la pena hacerle un seguro médico al loro?","acceptedAnswer":{"@type":"Answer","text":"Actualmente existen seguros de salud para aves exóticas en España. Para especies de alto valor (yacos, guacamayos) puede ser una inversión interesante dado que una cirugía o tratamiento de larga duración puede superar los 1.000-3.000€."}}
  ],
  content: `    <p>Antes de adquirir un loro, es fundamental entender el <strong>coste real de mantenimiento anual</strong>. Más allá del precio de adquisición, el loro genera gastos continuos que muchos propietarios primerizos subestiman. Este análisis detallado le ayudará a tomar una decisión financieramente informada.</p>

    <h2>Costes Fijos Anuales por Categoría</h2>

    <h3>Alimentación</h3>
    <p>La alimentación es el gasto fijo más regular. Varía según la especie y la calidad de la dieta:</p>
    <table>
      <thead><tr><th>Especie</th><th>Coste Mensual Alimentación</th><th>Coste Anual</th></tr></thead>
      <tbody>
        <tr><td>Periquito / Agapórnis</td><td>15-30€</td><td>180-360€</td></tr>
        <tr><td>Cacatúa mediana / Amazona</td><td>40-70€</td><td>480-840€</td></tr>
        <tr><td>Loro Gris Africano (Yaco)</td><td>50-80€</td><td>600-960€</td></tr>
        <tr><td>Guacamayo grande</td><td>70-120€</td><td>840-1.440€</td></tr>
      </tbody>
    </table>
    <p>Nota: incluye pellets de calidad + fruta y verdura fresca diaria. La dieta de semillas baratas es un ahorro falso — genera costes veterinarios mucho mayores a largo plazo.</p>

    <h3>Veterinario</h3>
    <p>Los costes veterinarios son los más variables. En el mejor de los casos (loro sano):</p>
    <ul>
      <li>Revisión anual preventiva: 60-120€</li>
      <li>Analítica de sangre básica: 80-150€</li>
      <li><strong>Total anual mínimo (loro sano):</strong> 140-270€</li>
    </ul>
    <p>En caso de enfermedad:</p>
    <ul>
      <li>Consulta veterinaria urgente: 80-150€</li>
      <li>Tratamiento antibiótico/antifúngico de 4 semanas: 150-400€</li>
      <li>Radiografías: 100-200€</li>
      <li>Cirugía (en caso de necesitarse): 500-3.000€</li>
    </ul>
    <p>Se recomienda disponer de un fondo de emergencia de <strong>al menos 1.000€</strong> para imprevistos veterinarios.</p>

    <h3>Accesorios y Juguetes</h3>
    <ul>
      <li>Juguetes (rotación mensual recomendada): 15-40€/mes → 180-480€/año</li>
      <li>Perchas (se desgastan y deben reemplazarse): 30-60€/año</li>
      <li>Comederos y bebederos (reemplazar cada 1-2 años): 20-40€</li>
      <li>Mineral (sepia, piedra mineral): 15-30€/año</li>
      <li><strong>Total anual accesorios:</strong> 245-610€</li>
    </ul>

    <h3>Jaula y Elementos de Instalación (Primer Año)</h3>
    <p>Son gastos del primer año que no se repiten (salvo reemplazo):</p>
    <ul>
      <li>Jaula de calidad para loro mediano: 200-500€</li>
      <li>Jaula para loro grande (guacamayo): 500-1.500€</li>
      <li>Árbol-jaula o percha externa: 80-300€</li>
      <li>Transporte (caja de viaje): 50-120€</li>
    </ul>

    <h2>Resumen de Coste Anual (Loro Mediano en España)</h2>
    <table>
      <thead><tr><th>Categoría</th><th>Coste Anual Estimado</th></tr></thead>
      <tbody>
        <tr><td>Alimentación (pellets + fruta/verdura)</td><td>480-840€</td></tr>
        <tr><td>Veterinario (preventivo, sin emergencias)</td><td>140-270€</td></tr>
        <tr><td>Juguetes y accesorios</td><td>245-610€</td></tr>
        <tr><td>Fondo de emergencia veterinaria (provisionado)</td><td>200-500€</td></tr>
        <tr><td><strong>Total anual estimado</strong></td><td><strong>1.065-2.220€</strong></td></tr>
      </tbody>
    </table>

    <h2>Comparativa por Especie: Coste Anual Total</h2>
    <table>
      <thead><tr><th>Especie</th><th>Coste Anual Estimado</th></tr></thead>
      <tbody>
        <tr><td>Periquito / Agapórnis</td><td>400-700€</td></tr>
        <tr><td>Cacatúa mediana</td><td>900-1.800€</td></tr>
        <tr><td>Amazona / Loro Gris Africano</td><td>1.200-2.500€</td></tr>
        <tr><td>Guacamayo grande (Ararauna, Escarlata)</td><td>2.000-4.000€</td></tr>
        <tr><td>Guacamayo Jacinto</td><td>2.500-5.000€</td></tr>
      </tbody>
    </table>

    <div class="faq">
      <details><summary>¿Cuánto cuesta mantener un loro al año en España?</summary><div class="faq-body">Para un loro mediano (amazona, cacatúa), el presupuesto anual está entre 1.200€ y 2.500€ incluyendo alimentación, veterinario y accesorios. Los guacamayos grandes pueden superar los 3.000€ anuales.</div></details>
      <details><summary>¿Cuál es el mayor gasto de un loro al año?</summary><div class="faq-body">Los costes veterinarios son los más variables e imprevisibles. La alimentación de calidad es el gasto fijo más significativo. El primer año tiene gastos adicionales de instalación que no se repiten.</div></details>
      <details><summary>¿Merece la pena hacerle un seguro médico al loro?</summary><div class="faq-body">Existen seguros de salud para aves exóticas en España. Para especies de alto valor (yacos, guacamayos) puede ser interesante dado que tratamientos complejos pueden superar los 1.000-3.000€.</div></details>
    </div>`,
  related: [
    {title: 'Cuánto Cuesta Mantener un Loro al Mes', desc: 'Presupuesto mensual detallado.', url: '/blog/coste-mantener-loro-mes.html'},
    {title: 'Qué Loro es Mejor para Principiantes', desc: 'Comparativa de especies para nuevos propietarios.', url: '/blog/mejores-loros-para-principiantes.html'},
    {title: 'Precio de un Loro en España', desc: 'Guía de precios por especie.', url: '/blog/precio-de-un-loro-en-espana.html'},
  ]
})});

pages.push({ file: 'blog/que-loro-habla-mejor.html', html: blogPost({
  slug: 'que-loro-habla-mejor',
  title: '¿Qué Loro Habla Mejor? Comparativa de Especies con Mayor Capacidad Verbal',
  titleFull: '¿Qué Loro Habla Mejor? Ranking de Psitácidas por Capacidad Verbal',
  desc: 'Comparativa completa de qué loro habla mejor: yaco, amazona, guacamayo, periquito. Análisis de capacidad verbal, comprensión contextual y facilidad de aprendizaje por especie.',
  keywords: 'que loro habla mejor, loro mas hablador, yaco o amazona habla mejor, guacamayo habla, loro gris africano capacidad verbal',
  badge: '🛒 Compra',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuál es el loro que habla mejor?","acceptedAnswer":{"@type":"Answer","text":"El loro gris africano (yaco) está científicamente considerado el loro con mayor capacidad verbal y comprensión contextual del habla. Puede aprender cientos de palabras y usarlas en contexto apropiado. La amazona frente azul y la amazona frente amarilla tienen también capacidad verbal excepcional."}},
    {"@type":"Question","name":"¿Los guacamayos hablan?","acceptedAnswer":{"@type":"Answer","text":"Sí, los guacamayos pueden aprender a hablar, pero su capacidad verbal es generalmente inferior a la del yaco o las amazonas. Su voz es más rasposa y el repertorio suele ser más limitado. Lo que les diferencia es que suelen repetir frases con gran entusiasmo y volumen."}},
    {"@type":"Question","name":"¿Los periquitos pueden hablar?","acceptedAnswer":{"@type":"Answer","text":"Sí. Los periquitos comunes (Melopsittacus undulatus) tienen una capacidad verbal sorprendente para su tamaño. Algunos individuos aprenden decenas de palabras. Sin embargo, su voz es muy aguda y puede ser difícil de entender. El periquito macho suele hablar mejor que la hembra."}}
  ],
  content: `    <p>La capacidad de <strong>imitar el habla humana</strong> es una de las características que más atrae a los futuros propietarios de loros. Sin embargo, no todas las especies tienen la misma capacidad, y dentro de cada especie hay diferencias individuales considerables. Este análisis comparativo le ayudará a encontrar la especie que mejor se adapta a sus expectativas.</p>

    <h2>Factores que Determinan la Capacidad Verbal de un Loro</h2>
    <p>Antes del ranking, es importante entender qué determina la capacidad verbal:</p>
    <ul>
      <li><strong>Anatomía del aparato fonador:</strong> las diferentes especies tienen estructuras del tracto vocal diferentes. El yaco, por ejemplo, tiene un syrinx (órgano vocal aviar) especialmente flexible.</li>
      <li><strong>Capacidad cognitiva:</strong> la inteligencia general correlaciona con la capacidad de aprendizaje verbal</li>
      <li><strong>Motivación social:</strong> los loros altamente sociales y dependientes del grupo hablan más para mantener contacto</li>
      <li><strong>Individuo:</strong> dentro de cada especie hay grandes diferencias individuales</li>
      <li><strong>Estimulación temprana:</strong> los loros expuestos al habla humana desde jóvenes aprenden mejor</li>
    </ul>

    <h2>Ranking de Loros por Capacidad Verbal</h2>

    <h3>🥇 1º Loro Gris Africano (Yaco) — Psittacus erithacus</h3>
    <p>El campeón indiscutible. Los estudios científicos de Irene Pepperberg demostraron que el yaco Alex podía usar más de 100 palabras y expresiones con comprensión contextual real — no solo imitación mecánica.</p>
    <ul>
      <li><strong>Vocabulario potencial:</strong> 300-500+ palabras con entrenamiento intensivo</li>
      <li><strong>Comprensión contextual:</strong> excepcional — usa las palabras en el contexto correcto</li>
      <li><strong>Calidad del habla:</strong> muy clara, con buena modulación</li>
      <li><strong>Inicio del habla:</strong> puede empezar a las 3-6 semanas de vida en papilleros</li>
    </ul>

    <h3>🥈 2º Amazona Frente Azul y Frente Amarilla — Amazona aestiva / A. ochrocephala</h3>
    <p>Las amazonas son las más vocales en volumen y entusiasmo. Algunas superan al yaco en repertorio bruto, aunque la comprensión contextual suele ser inferior.</p>
    <ul>
      <li><strong>Vocabulario potencial:</strong> 100-300 palabras</li>
      <li><strong>Comprensión contextual:</strong> buena, aunque inferior al yaco</li>
      <li><strong>Calidad del habla:</strong> muy clara y con mucho volumen</li>
      <li><strong>Característica especial:</strong> suelen cantar con gran entusiasmo</li>
    </ul>

    <h3>🥉 3º Loro Eclectus — Eclectus roratus</h3>
    <p>Especie menos conocida pero con capacidad verbal notable. Voz clara y bien articulada.</p>

    <h3>4º Cacatúa</h3>
    <p>Las cacatúas pueden hablar pero generalmente tienen un vocabulario más limitado. Su punto fuerte es la imitación de sonidos y la capacidad de aprender melodías. Son las más musicales.</p>

    <h3>5º Guacamayo</h3>
    <p>Pueden aprender palabras y frases, pero con menos claridad y menor vocabulario que yacos o amazonas. Compensan con una personalidad excepcional y capacidad de comunicación no verbal muy rica.</p>

    <h3>6º Periquito Común — Melopsittacus undulatus</h3>
    <p>La gran sorpresa de este ranking. Un periquito macho bien estimulado puede aprender un vocabulario sorprendente. El inconveniente es la voz muy aguda y difícil de entender.</p>

    <h2>Diferencia Entre Imitación y Comprensión</h2>
    <p>La distinción más importante del ranking: algunos loros imitan palabras mecánicamente, otros las usan con comprensión real del contexto. El yaco está en una categoría aparte porque puede:</p>
    <ul>
      <li>Identificar objetos, colores y formas con nombre correcto</li>
      <li>Usar frases apropiadas en situaciones específicas</li>
      <li>Comprender preguntas sencillas y responder adecuadamente</li>
      <li>Inventar combinaciones nuevas de palabras conocidas</li>
    </ul>

    <div class="faq">
      <details><summary>¿Cuál es el loro que habla mejor?</summary><div class="faq-body">El loro gris africano (yaco) está científicamente considerado el loro con mayor capacidad verbal y comprensión contextual. La amazona frente azul y frente amarilla tienen también capacidad verbal excepcional.</div></details>
      <details><summary>¿Los guacamayos hablan?</summary><div class="faq-body">Sí, pero con capacidad generalmente inferior al yaco o las amazonas. Su voz es más rasposa y el repertorio suele ser más limitado, aunque repiten con gran entusiasmo y volumen.</div></details>
      <details><summary>¿Los periquitos pueden hablar?</summary><div class="faq-body">Sí. Los periquitos tienen capacidad verbal sorprendente para su tamaño. El macho suele hablar mejor que la hembra. Su voz es muy aguda y puede ser difícil de entender.</div></details>
    </div>`,
  related: [
    {title: '¿Qué Loro es Más Cariñoso?', desc: 'Comparativa de especies por afectividad.', url: '/blog/que-loro-es-mas-carinoso.html'},
    {title: 'Qué Loro es Mejor para Principiantes', desc: 'Guía de elección para nuevos propietarios.', url: '/blog/mejores-loros-para-principiantes.html'},
    {title: 'Cómo Enseñar a Hablar a un Loro', desc: 'Técnicas para desarrollar el vocabulario.', url: '/blog/como-ensenar-a-hablar-un-loro.html'},
  ]
})});

pages.push({ file: 'blog/que-loro-es-mas-carinoso.html', html: blogPost({
  slug: 'que-loro-es-mas-carinoso',
  title: '¿Qué Loro es Más Cariñoso? Comparativa de Especies por Afectividad',
  titleFull: '¿Qué Loro es Más Cariñoso? Ranking de Psitácidas por Nivel de Afecto',
  desc: 'Descubre qué loro es más cariñoso y afectuoso. Comparativa de cacatúas, yacos, amazonas, agapórnis y guacamayos por nivel de afecto, vínculo y contacto físico.',
  keywords: 'que loro es mas carinoso, loro mas afectuoso, cacatua o yaco mas carinoso, loro que le guste el contacto, loro mascotas mas amorosas',
  badge: '🛒 Compra',
  date: '2026-06-08',
  schema: [
    {"@type":"Question","name":"¿Cuál es el loro más cariñoso?","acceptedAnswer":{"@type":"Answer","text":"Las cacatúas (especialmente la cacatúa alba o de Molucas) son consideradas las psitácidas más demandantes de contacto físico y afecto. Los agapórnis (inseparables) son los más expresivos en pareja. El loro gris africano forma vínculos muy intensos pero a veces es más reservado en el contacto físico."}},
    {"@type":"Question","name":"¿Todos los loros son cariñosos?","acceptedAnswer":{"@type":"Answer","text":"No. El nivel de afecto varía enormemente por especie y también por individuo. Los loros papilleros criados a mano son generalmente más cariñosos que los criados por sus padres. Incluso dentro de la misma especie y camada, hay individuos más independientes que otros."}},
    {"@type":"Question","name":"¿Las cacatúas son demasiado dependientes?","acceptedAnswer":{"@type":"Answer","text":"Sí, puede ser un problema. Las cacatúas, especialmente las blancas de Molucas y las cacatúas de cresta amarilla, tienen necesidades de atención muy altas. Un propietario que trabaja fuera de casa muchas horas puede no ser el compañero ideal para estas especies."}}
  ],
  content: `    <p>Cuando la gente pregunta qué loro es más cariñoso, a menudo buscan un ave que disfrute del contacto físico, que busque la compañía del propietario y que muestre afecto activo. Pero el "cariño" aviar se expresa de formas muy diferentes según la especie — y no siempre es lo que se espera.</p>

    <h2>Cómo Expresan Afecto los Loros</h2>
    <p>Antes del ranking, es importante entender las formas en que los loros expresan afecto:</p>
    <ul>
      <li><strong>Contacto físico activo:</strong> buscan ser acariados, se acurrucan contra el propietario</li>
      <li><strong>Preacicalamiento (allopreening):</strong> limpian las plumas del propietario o le muerden suavemente el pelo</li>
      <li><strong>Vocalización de contacto:</strong> llaman al propietario, imitan su voz</li>
      <li><strong>Seguimiento:</strong> van detrás del propietario por la casa</li>
      <li><strong>Compartir alimento:</strong> regurgitan comida como señal de afecto intenso</li>
    </ul>

    <h2>Ranking de Loros por Afectividad</h2>

    <h3>🥇 1º Cacatúa (Cacatua alba, C. moluccensis)</h3>
    <p>Las cacatúas blancas son las psitácidas más demandantes de contacto físico de todas. Sus apodos ("cockatoos = velcro birds") lo dicen todo: una vez vinculadas, quieren estar literalmente pegadas al propietario.</p>
    <ul>
      <li><strong>Nivel de contacto físico:</strong> extremo — buscan ser acariadas horas al día</li>
      <li><strong>Nivel de dependencia:</strong> muy alto — sufren ansiedad de separación severa</li>
      <li><strong>Ideal para:</strong> propietarios en casa mucho tiempo, personas retiradas, familias numerosas</li>
      <li><strong>No ideal para:</strong> personas que trabajan fuera muchas horas</li>
    </ul>

    <h3>🥈 2º Agapórnis (Inseparables) — Agapornis spp.</h3>
    <p>Los "pájaros del amor" son extraordinariamente afectuosos en pareja. Si se cría uno solo, el propietario se convierte en su pareja de vinculación y el nivel de afecto es muy intenso.</p>
    <ul>
      <li><strong>Nivel de contacto:</strong> muy alto si está solo</li>
      <li><strong>Nivel de dependencia:</strong> alto — necesitan compañía constante (del propietario o de otro agapórnis)</li>
      <li><strong>Ventaja:</strong> tamaño pequeño hace el manejo fácil para personas mayores o niños</li>
    </ul>

    <h3>🥉 3º Loro Gris Africano (Yaco)</h3>
    <p>El yaco forma vínculos de una intensidad extraordinaria. Sin embargo, a diferencia de la cacatúa, expresa ese vínculo de forma más sutil — menos contacto físico, pero una lealtad y sensibilidad emocional que muchos propietarios describen como casi "humana".</p>
    <ul>
      <li><strong>Nivel de contacto físico:</strong> moderado a alto (más selectivo)</li>
      <li><strong>Intensidad del vínculo:</strong> extrema</li>
      <li><strong>Característica especial:</strong> puede "leer" el estado emocional del propietario y reaccionar a él</li>
    </ul>

    <h3>4º Amazona</h3>
    <p>Las amazonas son cariñosas en sus términos — no les gusta necesariamente que las cojan pero son muy vocales y expresivas en su afecto. Celebran entusiastamente la llegada del propietario.</p>

    <h3>5º Guacamayo</h3>
    <p>Los guacamayos papilleros bien criados pueden ser muy afectuosos, pero son animales de fuerte carácter que expresan afecto de formas intensas (a veces incluyendo mordeduras "cariñosas" que duelen).</p>

    <h3>6º Ninfa Carolina (Cockatiel)</h3>
    <p>Es la psitácida más equilibrada entre afectividad y autonomía. Menos demandante que la cacatúa pero muy cariñosa, tolera bien la vida sin atención constante.</p>

    <div class="faq">
      <details><summary>¿Cuál es el loro más cariñoso?</summary><div class="faq-body">Las cacatúas (especialmente la cacatúa alba) son las más demandantes de contacto físico. Los agapórnis son muy expresivos en pareja. El yaco forma vínculos muy intensos aunque más sutiles en el contacto físico.</div></details>
      <details><summary>¿Todos los loros son cariñosos?</summary><div class="faq-body">No. El nivel de afecto varía por especie e individuo. Los loros papilleros criados a mano son generalmente más cariñosos que los criados por sus padres.</div></details>
      <details><summary>¿Las cacatúas son demasiado dependientes?</summary><div class="faq-body">Puede serlo. Las cacatúas blancas tienen necesidades de atención muy altas. Propietarios que trabajan fuera muchas horas pueden no ser el compañero ideal para estas especies.</div></details>
    </div>`,
  related: [
    {title: '¿Qué Loro Habla Mejor?', desc: 'Comparativa de capacidades verbales por especie.', url: '/blog/que-loro-habla-mejor.html'},
    {title: 'Qué Loro es Mejor para Principiantes', desc: 'Guía de elección para nuevos propietarios.', url: '/blog/mejores-loros-para-principiantes.html'},
    {title: 'Fortalecer el Vínculo con tu Loro', desc: 'Técnicas de bonding aviar.', url: '/blog/fortalecer-vinculo-loro.html'},
  ]
})});

// ─── CLUSTER 5: CITY PAGES ────────────────────────────────────────────────

const cityBaseLinks = `      <a href="/ciudades/comprar-loros-madrid">Madrid</a>
      <a href="/ciudades/comprar-loros-barcelona">Barcelona</a>
      <a href="/ciudades/comprar-loros-valencia">Valencia</a>
      <a href="/ciudades/comprar-loros-sevilla">Sevilla</a>
      <a href="/ciudades/comprar-loros-bilbao">Bilbao</a>`;

function makeCityContent(city, region, regionAdj, extraPara) {
  return `
  <p>Si está buscando <strong>loros en ${city}</strong> con todas las garantías legales, en paraisodeaves somos el criadero especializado que necesita. Estamos ubicados en Llíria, Valencia, y enviamos aves exóticas papilleras a compradores de toda España, incluida ${region}. Nuestros envíos a ${city} se realizan con plenas garantías logísticas y documentación CITES en regla.</p>

  ${extraPara}

  <h2>Por Qué la Documentación CITES es Imprescindible en ${city}</h2>

  <p>En España, la Ley 42/2007 del Patrimonio Natural y de la Biodiversidad, junto con el Convenio CITES, regula estrictamente la tenencia y comercialización de psitácidas protegidas. Adquirir un loro sin documentación CITES en ${city} o en cualquier punto de España es una infracción grave que puede acarrear sanciones de hasta 200.000 euros y el decomiso del animal. En paraisodeaves, cada ave que enviamos a ${city} incluye toda la documentación exigida por la ley.</p>

  <div class="callout">
    <p><strong>Importante:</strong> Desconfíe de vendedores particulares en plataformas de segunda mano que ofrezcan loros sin certificado CITES. <a href="/blog/detectar-venta-ilegal-loros.html">Cómo detectar ventas ilegales de loros →</a></p>
  </div>

  <h2>Especies Disponibles para Compradores en ${city}</h2>
  <ul>
    <li><strong>Loro Gris Africano (Yaco)</strong> — La especie más inteligente del mundo. Apéndice I CITES.</li>
    <li><strong>Guacamayo Azul y Amarillo (Ararauna)</strong> — El guacamayo más popular en Europa.</li>
    <li><strong>Amazona (Loro Amazónico)</strong> — Carismáticas, vocales y muy sociables.</li>
    <li><strong>Cacatúa</strong> — Gran variedad de subespecies muy valoradas por su afectividad.</li>
    <li><strong>Loro Eclectus</strong> — Dimorfismo sexual extraordinario, carácter tranquilo.</li>
    <li><strong>Conuro</strong> — Psitácidas de tamaño medio, muy activas y juguetonas.</li>
  </ul>

  <h2>Cómo Se Realiza el Envío de Loros a ${city}</h2>
  <ol>
    <li><strong>Consulta por correo:</strong> Le informamos de disponibilidad y características del ave.</li>
    <li><strong>Documentación:</strong> Preparamos toda la documentación CITES y guía sanitaria.</li>
    <li><strong>Transporte especializado:</strong> Coordinamos el envío con transportistas homologados para aves vivas.</li>
    <li><strong>Entrega y seguimiento:</strong> Le mantenemos informado hasta la entrega en ${city}.</li>
    <li><strong>Posventa:</strong> Asesoramiento en los primeros días de adaptación del ave.</li>
  </ol>
  <p>El plazo habitual desde la confirmación hasta la entrega en ${city} es de <strong>1 a 2 semanas</strong>.</p>`;
}

pages.push({ file: 'ciudades/comprar-loros-salamanca.html', html: cityPage({
  slug: 'comprar-loros-salamanca',
  title: 'Loros en Salamanca: Precio, CITES y Envío ✓',
  titleFull: 'Comprar Loros en Salamanca',
  desc: 'Comprar loros en Salamanca con documentación CITES completa. Envío seguro a Castilla y León. Yaco, Amazona, Guacamayo criados a mano. Consulta disponibilidad.',
  city: 'Salamanca', region: 'Castilla y León', regionAdj: 'castellano-leonesa',
  badge: '🦜 Envío a Salamanca · CITES Oficial',
  sub: 'Loros papilleros criados a mano con documentación CITES completa. Envío profesional y seguro a Salamanca y toda Castilla y León.',
  trustItems: ['✓ CITES Oficial', '✓ Envío a Castilla y León', '✓ Aves Criadas a Mano', '✓ Atención por Correo'],
  content: makeCityContent('Salamanca', 'Castilla y León', 'castellano-leonesa', '<p>Salamanca, ciudad universitaria por excelencia y Patrimonio de la Humanidad, alberga una comunidad cultivada y exigente de aficionados a los animales exóticos. Los compradores salmantinos valoran especialmente la documentación completa, la transparencia del proceso y la posibilidad de comunicarse directamente con el criadero antes de la compra.</p>'),
  faqItems: [
    {q: '¿Enviáis loros a Salamanca?', a: 'Sí. Realizamos envíos a Salamanca y a toda Castilla y León con transportistas especializados en aves vivas, cumpliendo la normativa IATA de transporte animal.'},
    {q: '¿Qué documentación incluye el loro al llegar a Salamanca?', a: 'Cada ave llega con certificado CITES, guía sanitaria oficial, certificado de nacimiento en cautividad y anilla cerrada.'},
    {q: '¿Cuánto tarda el envío a Salamanca?', a: 'El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido, tiempo necesario para preparar la documentación y coordinar el transporte especializado.'},
    {q: '¿Puedo ver fotos del loro antes de comprarlo?', a: 'Por supuesto. Antes de cerrar cualquier acuerdo le enviamos fotos y vídeos actuales del ejemplar disponible.'},
    {q: '¿El clima de Salamanca es adecuado para tener un loro?', a: 'Sí. Los loros se adaptan bien al interior de los hogares con calefacción adecuada. El importante es mantener temperatura estable entre 18-28°C y evitar corrientes de aire frío directo.'},
  ],
  cityLinksHtml: cityBaseLinks,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Loros en Salamanca","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-salamanca"}]},
  schemaFaq: [{"@type":"Question","name":"¿Enviáis loros a Salamanca?","acceptedAnswer":{"@type":"Answer","text":"Sí. Realizamos envíos a Salamanca y a toda Castilla y León con transportistas especializados en aves vivas."}},{"@type":"Question","name":"¿Cuánto tarda el envío a Salamanca?","acceptedAnswer":{"@type":"Answer","text":"El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido."}}]
})});

pages.push({ file: 'ciudades/comprar-loros-gijon.html', html: cityPage({
  slug: 'comprar-loros-gijon',
  title: 'Loros en Gijón: Precio, CITES y Envío ✓',
  titleFull: 'Comprar Loros en Gijón',
  desc: 'Comprar loros en Gijón con documentación CITES completa. Envío seguro a Asturias. Yaco, Amazona, Guacamayo criados a mano. Consulta disponibilidad.',
  city: 'Gijón', region: 'Asturias', regionAdj: 'asturiana',
  badge: '🦜 Envío a Gijón · CITES Oficial',
  sub: 'Loros papilleros criados a mano con documentación CITES completa. Envío profesional y seguro a Gijón y toda Asturias.',
  trustItems: ['✓ CITES Oficial', '✓ Envío a Asturias', '✓ Aves Criadas a Mano', '✓ Atención por Correo'],
  content: makeCityContent('Gijón', 'Asturias', 'asturiana', '<p>Gijón, la mayor ciudad de Asturias y motor económico del Principado, tiene una larga tradición de amor por los animales de compañía. El clima atlántico húmedo de Asturias es perfectamente compatible con la tenencia de psitácidas en interiores con la calefacción adecuada.</p>'),
  faqItems: [
    {q: '¿Enviáis loros a Gijón?', a: 'Sí. Realizamos envíos a Gijón y a toda Asturias con transportistas especializados en aves vivas, cumpliendo la normativa IATA de transporte animal.'},
    {q: '¿Qué documentación incluye el loro al llegar a Gijón?', a: 'Cada ave llega con certificado CITES, guía sanitaria oficial, certificado de nacimiento en cautividad y anilla cerrada.'},
    {q: '¿Cuánto tarda el envío a Gijón?', a: 'El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido.'},
    {q: '¿El clima húmedo de Gijón es adecuado para un loro?', a: 'La humedad atlántica es generalmente favorable para muchas especies tropicales. Es importante mantener temperatura estable entre 18-28°C con calefacción en invierno y evitar corrientes de aire frío.'},
    {q: '¿Puedo ver fotos del loro antes de comprarlo?', a: 'Por supuesto. Antes de cerrar cualquier acuerdo le enviamos fotos y vídeos actuales del ejemplar disponible.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/comprar-loros-oviedo">Oviedo</a>\n` + cityBaseLinks,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Loros en Gijón","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-gijon"}]},
  schemaFaq: [{"@type":"Question","name":"¿Enviáis loros a Gijón?","acceptedAnswer":{"@type":"Answer","text":"Sí. Realizamos envíos a Gijón y a toda Asturias con transportistas especializados en aves vivas."}},{"@type":"Question","name":"¿Cuánto tarda el envío a Gijón?","acceptedAnswer":{"@type":"Answer","text":"El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido."}}]
})});

pages.push({ file: 'ciudades/comprar-loros-oviedo.html', html: cityPage({
  slug: 'comprar-loros-oviedo',
  title: 'Loros en Oviedo: Precio, CITES y Envío ✓',
  titleFull: 'Comprar Loros en Oviedo',
  desc: 'Comprar loros en Oviedo con documentación CITES completa. Envío seguro a Asturias. Yaco, Amazona, Guacamayo criados a mano. Consulta disponibilidad.',
  city: 'Oviedo', region: 'Asturias', regionAdj: 'asturiana',
  badge: '🦜 Envío a Oviedo · CITES Oficial',
  sub: 'Loros papilleros criados a mano con documentación CITES completa. Envío profesional y seguro a Oviedo y toda Asturias.',
  trustItems: ['✓ CITES Oficial', '✓ Envío a Asturias', '✓ Aves Criadas a Mano', '✓ Atención por Correo'],
  content: makeCityContent('Oviedo', 'Asturias', 'asturiana', '<p>Oviedo, capital del Principado de Asturias y sede del Gobierno autonómico, concentra la mayor densidad de veterinarios especializados en aves exóticas de la comunidad autónoma, lo que facilita el seguimiento sanitario de las psitácidas adquiridas desde fuera de la región.</p>'),
  faqItems: [
    {q: '¿Enviáis loros a Oviedo?', a: 'Sí. Realizamos envíos a Oviedo y a toda Asturias con transportistas especializados en aves vivas, cumpliendo la normativa IATA de transporte animal.'},
    {q: '¿Qué documentación incluye el loro al llegar a Oviedo?', a: 'Cada ave llega con certificado CITES, guía sanitaria oficial, certificado de nacimiento en cautividad y anilla cerrada.'},
    {q: '¿Cuánto tarda el envío a Oviedo?', a: 'El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido.'},
    {q: '¿Puedo ver fotos del loro antes de comprarlo?', a: 'Por supuesto. Antes de cerrar cualquier acuerdo le enviamos fotos y vídeos actuales del ejemplar disponible.'},
    {q: '¿El clima de Oviedo es apto para tener un loro?', a: 'Sí. Con calefacción adecuada en invierno (los loros necesitan entre 18-28°C) el clima interior de Oviedo es perfectamente compatible con las psitácidas.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/comprar-loros-gijon">Gijón</a>\n` + cityBaseLinks,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Loros en Oviedo","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-oviedo"}]},
  schemaFaq: [{"@type":"Question","name":"¿Enviáis loros a Oviedo?","acceptedAnswer":{"@type":"Answer","text":"Sí. Realizamos envíos a Oviedo y a toda Asturias con transportistas especializados en aves vivas."}},{"@type":"Question","name":"¿Cuánto tarda el envío a Oviedo?","acceptedAnswer":{"@type":"Answer","text":"El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido."}}]
})});

pages.push({ file: 'ciudades/comprar-loros-pamplona.html', html: cityPage({
  slug: 'comprar-loros-pamplona',
  title: 'Loros en Pamplona: Precio, CITES y Envío ✓',
  titleFull: 'Comprar Loros en Pamplona',
  desc: 'Comprar loros en Pamplona con documentación CITES completa. Envío seguro a Navarra. Yaco, Amazona, Guacamayo criados a mano. Consulta disponibilidad.',
  city: 'Pamplona', region: 'Navarra', regionAdj: 'navarra',
  badge: '🦜 Envío a Pamplona · CITES Oficial',
  sub: 'Loros papilleros criados a mano con documentación CITES completa. Envío profesional y seguro a Pamplona y toda Navarra.',
  trustItems: ['✓ CITES Oficial', '✓ Envío a Navarra', '✓ Aves Criadas a Mano', '✓ Atención por Correo'],
  content: makeCityContent('Pamplona', 'Navarra', 'navarra', '<p>Pamplona, capital de la Comunidad Foral de Navarra, destaca por su alta calidad de vida y una comunidad de propietarios de mascotas muy activa. La Ley Foral de Navarra en materia de animales de compañía complementa la normativa estatal española, con especial atención a los animales exóticos con documentación CITES.</p>'),
  faqItems: [
    {q: '¿Enviáis loros a Pamplona?', a: 'Sí. Realizamos envíos a Pamplona y a toda Navarra con transportistas especializados en aves vivas, cumpliendo la normativa IATA de transporte animal.'},
    {q: '¿Qué documentación incluye el loro al llegar a Pamplona?', a: 'Cada ave llega con certificado CITES, guía sanitaria oficial, certificado de nacimiento en cautividad y anilla cerrada. Toda la documentación necesaria para tenerlo legalmente en Navarra.'},
    {q: '¿Cuánto tarda el envío a Pamplona?', a: 'El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido.'},
    {q: '¿Puedo ver fotos del loro antes de comprarlo?', a: 'Por supuesto. Antes de cerrar cualquier acuerdo le enviamos fotos y vídeos actuales del ejemplar disponible.'},
    {q: '¿Qué normativa específica aplica en Navarra para las aves exóticas?', a: 'La Comunidad Foral de Navarra aplica la normativa estatal española (Ley 42/2007 y reglamentos CITES) complementada con la normativa foral de bienestar animal. Toda psitácida adquirida legalmente en criadero registrado cumple automáticamente con esta normativa.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/comprar-loros-bilbao">Bilbao</a>\n` + cityBaseLinks,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Loros en Pamplona","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-pamplona"}]},
  schemaFaq: [{"@type":"Question","name":"¿Enviáis loros a Pamplona?","acceptedAnswer":{"@type":"Answer","text":"Sí. Realizamos envíos a Pamplona y a toda Navarra con transportistas especializados en aves vivas."}},{"@type":"Question","name":"¿Cuánto tarda el envío a Pamplona?","acceptedAnswer":{"@type":"Answer","text":"El plazo habitual es de 1 a 2 semanas desde la confirmación del pedido."}}]
})});

// ─── CLUSTER 6: SPECIES + CITY ────────────────────────────────────────────

function makeSpeciesCityContent(species, speciesShort, city, region, speciesFacts) {
  return `
  <p>El <strong>${species}</strong> es una de las psitácidas más solicitadas por los compradores en ${city}. En paraisodeaves criamos ejemplares papilleros en nuestro criadero de Llíria, Valencia, y los enviamos a ${city} con toda la documentación legal exigida por el Convenio CITES.</p>

  <h2>Por Qué el ${speciesShort} es Tan Popular en ${city}</h2>
  <p>${speciesFacts}</p>

  <h2>Documentación CITES para el ${speciesShort}</h2>
  <p>En España, la comercialización de psitácidas requiere documentación específica. Cada ave que enviamos a ${city} incluye:</p>
  <ul>
    <li>Certificado CITES oficial (expedido por la autoridad CITES española)</li>
    <li>Anilla cerrada que certifica nacimiento en cautividad</li>
    <li>Certificado veterinario de estado de salud previo al traslado</li>
    <li>Guía sanitaria de transporte</li>
    <li>Factura oficial del criadero con CIF y número de operador CITES</li>
  </ul>

  <div class="callout">
    <p><strong>Advertencia legal:</strong> Adquirir un ${speciesShort} sin certificado CITES en ${city} es una infracción grave que puede acarrear sanciones de hasta 200.000€ y el decomiso del animal.</p>
  </div>

  <h2>Cómo Enviar un ${speciesShort} a ${city}</h2>
  <ol>
    <li>Consúltenos disponibilidad por correo a info@paraisodeaves.com</li>
    <li>Le enviamos fotos, vídeos y características del ejemplar disponible</li>
    <li>Preparamos toda la documentación CITES y guía sanitaria</li>
    <li>Coordinamos el envío con transportistas especializados en aves vivas a ${region}</li>
    <li>Le seguimos informando hasta la entrega y ofrecemos asesoramiento postventa</li>
  </ol>`;
}

pages.push({ file: 'ciudades/loro-gris-africano-malaga.html', html: cityPage({
  slug: 'loro-gris-africano-malaga',
  title: 'Loro Gris Africano en Málaga: Precio, CITES y Disponibilidad 2026',
  titleFull: 'Loro Gris Africano en Málaga',
  desc: 'Loro Gris Africano (Yaco) disponible para Málaga con CITES Apéndice I oficial. Envío seguro a domicilio en Málaga. Papillero criado a mano. Consulta precio y disponibilidad.',
  city: 'Málaga', region: 'Málaga y la Costa del Sol', regionAdj: 'malagueña',
  badge: '🦜 Loro Gris Africano · Málaga · CITES I',
  sub: 'Yaco papillero con CITES Apéndice I oficial. Envío seguro y profesional a Málaga y la Costa del Sol. La psitácida más inteligente del mundo.',
  trustItems: ['✓ CITES Apéndice I', '✓ Papillero Criado a Mano', '✓ Envío a Málaga', '✓ Asesoramiento Incluido'],
  content: makeSpeciesCityContent('Loro Gris Africano (Psittacus erithacus)', 'Yaco', 'Málaga', 'Málaga y la Costa del Sol', 'Málaga, con su clima mediterráneo privilegiado y una de las mayores tasas de turismo residencial de España, tiene una comunidad activa de aficionados a las aves exóticas. El loro gris africano es la especie más solicitada por su combinación única de inteligencia, capacidad verbal y vínculo emocional con el propietario.'),
  faqItems: [
    {q: '¿Podéis enviar un Loro Gris Africano a Málaga?', a: 'Sí. Enviamos Loros Grises Africanos a Málaga con toda la documentación CITES Apéndice I, certificado de nacimiento en cautividad y guía sanitaria.'},
    {q: '¿Cuál es el precio de un Loro Gris Africano papillero?', a: 'El precio varía según la edad, sexo y disponibilidad del ejemplar. Consulte por correo para recibir información actualizada y fotos del ave.'},
    {q: '¿El Loro Gris Africano se adapta al clima de Málaga?', a: 'Perfectamente. El clima mediterráneo de Málaga, especialmente en el interior del hogar, es ideal para el Yaco. Las temperaturas suaves minimizan el gasto en calefacción para mantener los 18-28°C que necesita el ave.'},
    {q: '¿Cuánto vive un Loro Gris Africano?', a: 'En cautividad bien cuidada, entre 50 y 70 años. Es una decisión de vida entera que requiere reflexión previa.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/loro-gris-africano-madrid">Madrid</a>
      <a href="/ciudades/loro-gris-africano-barcelona">Barcelona</a>
      <a href="/ciudades/loro-gris-africano-valencia">Valencia</a>
      <a href="/ciudades/comprar-loros-malaga">Todos los loros en Málaga</a>`,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Málaga","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-malaga"},{"@type":"ListItem","position":4,"name":"Loro Gris Africano","item":"https://www.paraisodeaves.com/ciudades/loro-gris-africano-malaga"}]},
  schemaFaq: [{"@type":"Question","name":"¿Podéis enviar un Loro Gris Africano a Málaga?","acceptedAnswer":{"@type":"Answer","text":"Sí. Enviamos Loros Grises Africanos a Málaga con toda la documentación CITES Apéndice I."}},{"@type":"Question","name":"¿El clima de Málaga es adecuado para el Yaco?","acceptedAnswer":{"@type":"Answer","text":"Perfectamente. El clima mediterráneo de Málaga, especialmente en el interior del hogar, es ideal para el Yaco."}}]
})});

pages.push({ file: 'ciudades/loro-gris-africano-murcia.html', html: cityPage({
  slug: 'loro-gris-africano-murcia',
  title: 'Loro Gris Africano en Murcia: Precio, CITES y Disponibilidad 2026',
  titleFull: 'Loro Gris Africano en Murcia',
  desc: 'Loro Gris Africano (Yaco) disponible para Murcia con CITES Apéndice I oficial. Envío seguro. Papillero criado a mano en Llíria, Valencia. Consulta precio y disponibilidad.',
  city: 'Murcia', region: 'Murcia y la Región de Murcia', regionAdj: 'murciana',
  badge: '🦜 Loro Gris Africano · Murcia · CITES I',
  sub: 'Yaco papillero con CITES Apéndice I oficial. Envío seguro y profesional a Murcia y la Región de Murcia.',
  trustItems: ['✓ CITES Apéndice I', '✓ Papillero Criado a Mano', '✓ Envío a Murcia', '✓ Asesoramiento Incluido'],
  content: makeSpeciesCityContent('Loro Gris Africano (Psittacus erithacus)', 'Yaco', 'Murcia', 'la Región de Murcia', 'Murcia, con su clima semiárido mediterráneo y sus cálidos veranos, ofrece uno de los entornos más favorables de España para las psitácidas africanas como el yaco, acostumbrado en su hábitat natural a climas cálidos. La Región de Murcia tiene una comunidad creciente de aficionados a las aves exóticas.'),
  faqItems: [
    {q: '¿Podéis enviar un Loro Gris Africano a Murcia?', a: 'Sí. Enviamos Loros Grises Africanos a Murcia con toda la documentación CITES Apéndice I, certificado de nacimiento en cautividad y guía sanitaria.'},
    {q: '¿Cuál es el precio de un Loro Gris Africano papillero?', a: 'El precio varía según la edad, sexo y disponibilidad del ejemplar. Consulte por correo para recibir información actualizada y fotos del ave.'},
    {q: '¿El clima de Murcia es adecuado para el Yaco?', a: 'El clima cálido y seco de Murcia es muy favorable para el yaco, originario del África tropical. Los veranos calurosos requieren atención a la hidratación del ave, pero el clima general es más favorable que en el norte de España.'},
    {q: '¿Cuánto vive un Loro Gris Africano?', a: 'En cautividad bien cuidada, entre 50 y 70 años.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/loro-gris-africano-madrid">Madrid</a>
      <a href="/ciudades/loro-gris-africano-barcelona">Barcelona</a>
      <a href="/ciudades/loro-gris-africano-valencia">Valencia</a>
      <a href="/ciudades/comprar-loros-murcia">Todos los loros en Murcia</a>`,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Murcia","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-murcia"},{"@type":"ListItem","position":4,"name":"Loro Gris Africano","item":"https://www.paraisodeaves.com/ciudades/loro-gris-africano-murcia"}]},
  schemaFaq: [{"@type":"Question","name":"¿Podéis enviar un Loro Gris Africano a Murcia?","acceptedAnswer":{"@type":"Answer","text":"Sí. Enviamos Loros Grises Africanos a Murcia con toda la documentación CITES Apéndice I."}},{"@type":"Question","name":"¿El clima de Murcia es adecuado para el Yaco?","acceptedAnswer":{"@type":"Answer","text":"El clima cálido y seco de Murcia es muy favorable para el yaco, originario del África tropical."}}]
})});

pages.push({ file: 'ciudades/guacamayo-malaga.html', html: cityPage({
  slug: 'guacamayo-malaga',
  title: 'Guacamayo en Málaga: Precio, CITES y Disponibilidad 2026',
  titleFull: 'Guacamayo en Málaga',
  desc: 'Guacamayo disponible para Málaga con documentación CITES completa. Ararauna y Guacamayo Escarlata papilleros criados a mano. Consulta precio y disponibilidad.',
  city: 'Málaga', region: 'Málaga y la Costa del Sol', regionAdj: 'malagueña',
  badge: '🦜 Guacamayo · Málaga · CITES Oficial',
  sub: 'Guacamayos papilleros criados a mano con documentación CITES completa. Envío seguro a Málaga y la Costa del Sol.',
  trustItems: ['✓ CITES Oficial', '✓ Papillero Criado a Mano', '✓ Envío a Málaga', '✓ Asesoramiento Incluido'],
  content: makeSpeciesCityContent('Guacamayo (Ara ararauna / Ara macao)', 'Guacamayo', 'Málaga', 'Málaga y la Costa del Sol', 'Los guacamayos son las psitácidas más impresionantes visualmente. En Málaga, con su clima mediterráneo y viviendas generalmente más espaciosas que en otras ciudades, la demanda de guacamayos es creciente. El clima suave reduce los costes de calefacción en invierno, uno de los factores importantes para mantener estas grandes aves tropicales.'),
  faqItems: [
    {q: '¿Podéis enviar un Guacamayo a Málaga?', a: 'Sí. Enviamos Guacamayos a Málaga con toda la documentación CITES oficial, certificado de nacimiento en cautividad y guía sanitaria.'},
    {q: '¿Cuál es el precio de un Guacamayo papillero?', a: 'El precio varía según la especie (Ararauna, Escarlata, Jacinto) y la disponibilidad. Consulte por correo para recibir información actualizada.'},
    {q: '¿El Guacamayo Ararauna es el más común?', a: 'Sí. El Guacamayo Azul y Amarillo (Ararauna) es la especie de guacamayo más popular en España por su belleza, adaptabilidad y carácter afectuoso.'},
    {q: '¿Cuánto espacio necesita un guacamayo?', a: 'Los guacamayos grandes necesitan jaulas de al menos 90x90x120 cm y tiempo diario fuera de la jaula en un espacio amplio. Son animales que requieren un entorno con espacio suficiente.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/guacamayo-madrid">Madrid</a>
      <a href="/ciudades/guacamayo-barcelona">Barcelona</a>
      <a href="/ciudades/guacamayo-valencia">Valencia</a>
      <a href="/ciudades/comprar-loros-malaga">Todos los loros en Málaga</a>`,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Málaga","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-malaga"},{"@type":"ListItem","position":4,"name":"Guacamayo","item":"https://www.paraisodeaves.com/ciudades/guacamayo-malaga"}]},
  schemaFaq: [{"@type":"Question","name":"¿Podéis enviar un Guacamayo a Málaga?","acceptedAnswer":{"@type":"Answer","text":"Sí. Enviamos Guacamayos a Málaga con toda la documentación CITES oficial."}},{"@type":"Question","name":"¿Cuál es la especie de guacamayo más popular?","acceptedAnswer":{"@type":"Answer","text":"El Guacamayo Azul y Amarillo (Ararauna) es la especie más popular en España por su belleza, adaptabilidad y carácter afectuoso."}}]
})});

pages.push({ file: 'ciudades/guacamayo-sevilla.html', html: cityPage({
  slug: 'guacamayo-sevilla',
  title: 'Guacamayo en Sevilla: Precio, CITES y Disponibilidad 2026',
  titleFull: 'Guacamayo en Sevilla',
  desc: 'Guacamayo disponible para Sevilla con documentación CITES completa. Ararauna y Guacamayo Escarlata papilleros criados a mano. Consulta precio y disponibilidad.',
  city: 'Sevilla', region: 'Sevilla y Andalucía Occidental', regionAdj: 'sevillana',
  badge: '🦜 Guacamayo · Sevilla · CITES Oficial',
  sub: 'Guacamayos papilleros criados a mano con documentación CITES completa. Envío seguro a Sevilla y Andalucía Occidental.',
  trustItems: ['✓ CITES Oficial', '✓ Papillero Criado a Mano', '✓ Envío a Sevilla', '✓ Asesoramiento Incluido'],
  content: makeSpeciesCityContent('Guacamayo (Ara ararauna / Ara macao)', 'Guacamayo', 'Sevilla', 'Sevilla y Andalucía Occidental', 'Sevilla, la mayor ciudad de Andalucía y capital de la comunidad autónoma, tiene uno de los climas más cálidos de España, con veranos que superan los 40°C. Este clima, aunque requiere atención especial en verano (ventilación, agua fresca), es generalmente favorable para las especies tropicales sudamericanas como los guacamayos.'),
  faqItems: [
    {q: '¿Podéis enviar un Guacamayo a Sevilla?', a: 'Sí. Enviamos Guacamayos a Sevilla con toda la documentación CITES oficial, certificado de nacimiento en cautividad y guía sanitaria.'},
    {q: '¿El calor de Sevilla afecta al guacamayo?', a: 'Los guacamayos son aves tropicales que toleran bien el calor, pero requieren sombra, agua fresca disponible siempre y ventilación adecuada en los meses de verano. Evite la exposición directa al sol durante las horas de máximo calor.'},
    {q: '¿Cuál es el precio de un Guacamayo papillero?', a: 'El precio varía según la especie y la disponibilidad. Consulte por correo para recibir información actualizada.'},
    {q: '¿Cuánto espacio necesita un guacamayo en Sevilla?', a: 'Los guacamayos grandes necesitan jaulas de al menos 90x90x120 cm y tiempo diario fuera de la jaula. Las viviendas con patio o terraza en Sevilla pueden ser ideales para estas grandes aves.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/guacamayo-madrid">Madrid</a>
      <a href="/ciudades/guacamayo-barcelona">Barcelona</a>
      <a href="/ciudades/guacamayo-valencia">Valencia</a>
      <a href="/ciudades/comprar-loros-sevilla">Todos los loros en Sevilla</a>`,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Sevilla","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-sevilla"},{"@type":"ListItem","position":4,"name":"Guacamayo","item":"https://www.paraisodeaves.com/ciudades/guacamayo-sevilla"}]},
  schemaFaq: [{"@type":"Question","name":"¿Podéis enviar un Guacamayo a Sevilla?","acceptedAnswer":{"@type":"Answer","text":"Sí. Enviamos Guacamayos a Sevilla con toda la documentación CITES oficial."}},{"@type":"Question","name":"¿El calor de Sevilla afecta al guacamayo?","acceptedAnswer":{"@type":"Answer","text":"Los guacamayos son aves tropicales que toleran bien el calor pero requieren sombra, agua fresca y ventilación en verano."}}]
})});

pages.push({ file: 'ciudades/cacatua-valencia.html', html: cityPage({
  slug: 'cacatua-valencia',
  title: 'Cacatúa en Valencia: Precio, CITES y Disponibilidad 2026',
  titleFull: 'Cacatúa en Valencia',
  desc: 'Cacatúa disponible para Valencia con documentación CITES completa. Cacatúa Alba, Cacatúa de Molucas papilleras criadas a mano. Consulta precio y disponibilidad.',
  city: 'Valencia', region: 'Valencia y la Comunitat Valenciana', regionAdj: 'valenciana',
  badge: '🦜 Cacatúa · Valencia · CITES Oficial',
  sub: 'Cacatúas papilleras criadas a mano con documentación CITES completa. Envío seguro a Valencia y la Comunitat Valenciana.',
  trustItems: ['✓ CITES Oficial', '✓ Papillera Criada a Mano', '✓ Envío a Valencia', '✓ Asesoramiento Incluido'],
  content: makeSpeciesCityContent('Cacatúa (Cacatua spp.)', 'Cacatúa', 'Valencia', 'Valencia y la Comunitat Valenciana', 'Valencia, sede de nuestro criadero y comunidad autónoma con tradición avícola notable (el Loro Parque está en las Islas Canarias pero la Comunitat Valenciana tiene uno de los registros de operadores CITES más activos de España), es una de las comunidades con mayor demanda de psitácidas. La cacatúa es especialmente apreciada por su afectividad y su carácter expresivo.'),
  faqItems: [
    {q: '¿Podéis enviar una Cacatúa a Valencia?', a: 'Sí. Nuestro criadero está en Llíria, Valencia. Podemos coordinar la entrega en persona o mediante transporte especializado en toda la Comunitat Valenciana.'},
    {q: '¿Cuál es el precio de una Cacatúa papillera?', a: 'El precio varía según la especie (Alba, de Molucas, de cresta amarilla, ninfa) y la disponibilidad. Consulte por correo para recibir información actualizada.'},
    {q: '¿Es posible recoger la Cacatúa en el criadero en Valencia?', a: 'Sí. Al estar situados en Llíria (Valencia), los compradores de la Comunitat Valenciana pueden coordinar la recogida directa en el criadero previa cita. Contacte por correo.'},
    {q: '¿Las cacatúas son buenas mascotas para familias valencianas?', a: 'Las cacatúas son aves muy afectuosas y sociables, ideales para familias que pueden dedicarles tiempo suficiente. Necesitan mínimo 3-4 horas de interacción diaria y son muy vocales.'},
  ],
  cityLinksHtml: `      <a href="/ciudades/cacatua-madrid">Madrid</a>
      <a href="/ciudades/cacatua-barcelona">Barcelona</a>
      <a href="/ciudades/cacatua-malaga">Málaga</a>
      <a href="/ciudades/comprar-loros-valencia">Todos los loros en Valencia</a>`,
  schemaBread: {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.paraisodeaves.com/"},{"@type":"ListItem","position":2,"name":"Ciudades","item":"https://www.paraisodeaves.com/ciudades/"},{"@type":"ListItem","position":3,"name":"Valencia","item":"https://www.paraisodeaves.com/ciudades/comprar-loros-valencia"},{"@type":"ListItem","position":4,"name":"Cacatúa","item":"https://www.paraisodeaves.com/ciudades/cacatua-valencia"}]},
  schemaFaq: [{"@type":"Question","name":"¿Podéis enviar una Cacatúa a Valencia?","acceptedAnswer":{"@type":"Answer","text":"Nuestro criadero está en Llíria, Valencia. Podemos entregar en persona o mediante transporte en toda la Comunitat Valenciana."}},{"@type":"Question","name":"¿Es posible recoger la Cacatúa en el criadero?","acceptedAnswer":{"@type":"Answer","text":"Sí. Al estar en Llíria (Valencia), los compradores de la Comunitat pueden recoger en el criadero previa cita por correo."}}]
})});

// ═══════════════════════════════════════════════════════════════════════════
// WRITE ALL FILES
// ═══════════════════════════════════════════════════════════════════════════

let created = 0;
let errors = 0;

for (const page of pages) {
  try {
    const dir = path.dirname(page.file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(page.file, page.html, 'utf8');
    console.log(`✓ ${page.file}`);
    created++;
  } catch (e) {
    console.error(`✗ ${page.file}: ${e.message}`);
    errors++;
  }
}

console.log(`\n✅ Created ${created} files, ${errors} errors.`);
