/**
 * generate-pt.js — Portugal Expansion (Phase 4)
 * Generates all /pt/ pages: homepage, money pages, city pages, blog (30), contact
 * Run: node generate-pt.js
 */

const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓', filePath);
}

const BASE = 'https://www.paraisodeaves.com';
const GA   = 'G-4007YHH4H9';
const EMAIL = 'paraisodeloros@gmail.com';

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PARTIALS
// ─────────────────────────────────────────────────────────────────────────────

function gaSnippet() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3219055968593295" crossorigin="anonymous"></script>`;
}

function fonts() {
  return `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" /></noscript>`;
}

function favicons() {
  return `<link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`;
}

function baseCSS() {
  return `<style>
    :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-rich:#E0B75F;--gold-hover:#B8933E;--bg:#F8F5F0;--surface:#FFFFFF;--border:#E7E0D2;--text:#1A1A1A;--muted:#5C5C5C}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.8}
    h1,h2,h3,h4{font-family:'Poppins',Arial,sans-serif}
    a{color:var(--primary);text-decoration:none}a:hover{color:var(--gold-hover);text-decoration:underline}
    img{-webkit-user-drag:none;user-drag:none;max-width:100%}
    .topbar{position:sticky;top:0;z-index:50;background:var(--primary);border-bottom:2px solid var(--gold);padding:14px 5%;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem}
    .brand{font-weight:900;font-size:1.05rem;color:#fff;text-decoration:none}
    .topnav{display:flex;gap:1.4rem;align-items:center;flex-wrap:wrap}
    .topnav a{color:rgba(255,255,255,.9);font-weight:600;font-size:.9rem;transition:color .2s;text-decoration:none}
    .topnav a:hover,.topnav a.active{color:var(--gold)}
    .lang-switcher{margin-left:.6rem;display:flex;gap:4px;align-items:center;font-size:.8rem;font-weight:700}
    .lang-switcher a{color:rgba(255,255,255,.55);text-decoration:none;padding:2px 5px;border-radius:4px;transition:color .2s}
    .lang-switcher a.active,.lang-switcher a:hover{color:var(--gold)}
    .lang-sep{color:rgba(255,255,255,.3)}
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
    .spec-table{width:100%;border-collapse:collapse;margin:1.2rem 0;font-size:.95rem}
    .spec-table th{background:var(--primary);color:#fff;padding:10px 14px;text-align:left;font-family:'Poppins',Arial,sans-serif}
    .spec-table td{padding:10px 14px;border-bottom:1px solid var(--border);vertical-align:top}
    .spec-table tr:nth-child(even) td{background:#F8F5F0}
    .article-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.2rem;margin:1.5rem 0}
    .article-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:1.2rem;transition:transform .2s,box-shadow .2s}
    .article-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,.10)}
    .article-card h3{font-size:1rem;color:var(--primary);margin-bottom:.5rem;font-family:'Poppins',Arial,sans-serif}
    .article-card p{font-size:.88rem;color:var(--muted);margin:0}
    .article-card a{text-decoration:none;color:inherit}
    .article-card a:hover h3{color:var(--gold-hover)}
    footer{background:var(--primary);padding:3.5rem 5% 2.5rem;border-top:1px solid rgba(255,255,255,.10);color:#F8F5F0;font-size:.9rem}
    footer a{color:var(--gold-rich);text-decoration:none;transition:color .2s}footer a:hover{color:#fff}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:2.5rem;max-width:1200px;margin:0 auto 2.5rem}
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
}

function ptNav(activePath = '') {
  return `<div class="topbar">
  <a href="/pt/" class="brand">🦜 paraisodeaves</a>
  <nav class="topnav">
    <a href="/pt/"${activePath === '/' ? ' class="active"' : ''}>Início</a>
    <a href="/pt/papagaios-a-venda-portugal/"${activePath === '/venda' ? ' class="active"' : ''}>Papagaios</a>
    <a href="/pt/cidades/"${activePath === '/cidades' ? ' class="active"' : ''}>Cidades</a>
    <a href="/pt/blog/"${activePath === '/blog' ? ' class="active"' : ''}>Blog</a>
    <a href="/pt/contacto/"${activePath === '/contacto' ? ' class="active"' : ''}>Contacto</a>
    <span class="lang-switcher"><a href="/">ES</a><span class="lang-sep">|</span><a href="/pt/" class="active">PT</a></span>
  </nav>
</div>`;
}

function ptFooter() {
  return `<footer>
  <div class="footer-grid">
    <div>
      <span class="footer-brand">🦜 paraisodeaves</span>
      <p class="footer-tagline">Criador de papagaios e aves exóticas em Espanha. Envios com documentação CITES para toda a Europa.</p>
      <p class="footer-contact">📧 <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    </div>
    <div class="footer-col">
      <h4>Navegar</h4>
      <ul>
        <li><a href="/pt/">Início</a></li>
        <li><a href="/pt/papagaios-a-venda-portugal/">Papagaios à Venda</a></li>
        <li><a href="/pt/contacto/">Contacto</a></li>
        <li><a href="/pt/cidades/">Cidades</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>As Nossas Aves</h4>
      <ul>
        <li><a href="/pt/papagaio-cinzento/">Papagaio Cinzento</a></li>
        <li><a href="/pt/arara-a-venda/">Arara</a></li>
        <li><a href="/pt/cacatua-a-venda/">Cacatua</a></li>
        <li><a href="/pt/papagaio-eclectus/">Eclectus</a></li>
        <li><a href="/pt/amazona-a-venda/">Amazona</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Informação</h4>
      <ul>
        <li><a href="/pt/blog/">Blog</a></li>
        <li><a href="/pt/ovos-fertilizados/">Ovos Fertilizados</a></li>
        <li><a href="/faq.html">FAQ (ES)</a></li>
        <li><a href="/entrega.html">Entrega</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Cidades PT</h4>
      <ul>
        <li><a href="/pt/cidades/papagaios-lisboa/">Lisboa</a></li>
        <li><a href="/pt/cidades/papagaios-porto/">Porto</a></li>
        <li><a href="/pt/cidades/papagaios-braga/">Braga</a></li>
        <li><a href="/pt/cidades/papagaios-faro/">Faro</a></li>
        <li><a href="/pt/cidades/">Ver todas →</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; 2026 paraisodeaves &mdash; Todos os direitos reservados</span>
    <span><a href="/pt/cidades/">Cidades</a> · <a href="/pt/blog/">Blog</a> · <a href="/">Versão Espanhola</a></span>
  </div>
</footer>`;
}

function breadcrumbSchema(items) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": it.name,
      "item": `${BASE}${it.url}`
    }))
  });
}

function faqSchema(faqs) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  });
}

function faqHTML(faqs) {
  return faqs.map(f => `    <details>
      <summary>${f.q}</summary>
      <div class="faq-body">${f.a}</div>
    </details>`).join('\n');
}

function hreflang(esUrl, ptUrl) {
  return `<link rel="alternate" hreflang="es-ES" href="${BASE}${esUrl}" />
  <link rel="alternate" hreflang="pt-PT" href="${BASE}${ptUrl}" />
  <link rel="alternate" hreflang="x-default" href="${BASE}${esUrl}" />`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PORTUGUESE HOMEPAGE /pt/
// ─────────────────────────────────────────────────────────────────────────────

function buildHomepage() {
  const canonical = `${BASE}/pt/`;
  const faqs = [
    { q: "Fazem envios para Portugal?", a: "Sim. Realizamos envios regulares para todo o território português continental e ilhas. O transporte é feito por operadores especializados em animais vivos, cumprindo toda a regulamentação IATA e nacional." },
    { q: "Os papagaios têm documentação CITES?", a: "Todos os nossos exemplares são criados na nossa instalação em Llíria (Valência, Espanha) e acompanham documentação CITES, guia sanitária veterinária e certificado de origem. A documentação é reconhecida em todo o espaço europeu." },
    { q: "Quanto tempo demora a entrega em Portugal?", a: "O prazo habitual desde a confirmação da reserva até à entrega em Portugal é de 1 a 3 semanas, dependendo da localização e disponibilidade do exemplar." },
    { q: "Posso visitar o criador antes de comprar?", a: "Sim. O nosso criador está em Llíria, a 25 minutos de Valência. Para visitas, contacte-nos por e-mail com antecedência para marcar hora." },
    { q: "Que espécie recomendam para uma família portuguesa com crianças?", a: "Para famílias com crianças, recomendamos o papagaio cinzento africano (sociável e equilibrado) ou uma ninfa carolina (dócil e de fácil trato). A arara azul-e-amarela também é excelente, embora exija mais espaço." }
  ];

  const html = `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${gaSnippet()}
  <title>Papagaios à Venda em Portugal | Criador com CITES | paraisodeaves</title>
  <meta name="description" content="Compre papagaios criados à mão em Espanha com documentação CITES. Araras, papagaios cinzentos, cacatuas e amazonas. Envios seguros para toda Portugal." />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="pt-PT" />
  <meta name="geo.region" content="PT" />
  <link rel="canonical" href="${canonical}" />
  ${hreflang('/', '/pt/')}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_PT" />
  <meta property="og:title" content="Papagaios à Venda em Portugal | Criador com CITES | paraisodeaves" />
  <meta property="og:description" content="Papagaios criados à mão em Espanha com documentação CITES. Venda legal com envios seguros para toda a Europa. Compre com confiança." />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${BASE}/uploaded-macaw.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Papagaios à Venda em Portugal | Criador com CITES | paraisodeaves" />
  <meta name="twitter:description" content="Papagaios criados à mão com CITES. Envios seguros para Portugal." />
  ${favicons()}
  ${fonts()}
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Organization","name":"Paraíso de Aves","url":"${BASE}","logo":"${BASE}/favicon.ico","email":"${EMAIL}","address":{"@type":"PostalAddress","streetAddress":"Llíria","addressLocality":"Llíria","addressRegion":"Valencia","addressCountry":"ES"},"knowsAbout":["Psittacidae","CITES","criação de papagaios","envio de aves exóticas para Portugal"]}</script>
  <script type="application/ld+json">${faqSchema(faqs)}</script>
  ${baseCSS()}
  <style>
    .hero-home{min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff;position:relative;overflow:hidden;background:#000}
    .hero-home::after{content:'';position:absolute;inset:0;z-index:0;background-image:url('/uploaded-macaw.webp');background-size:cover;background-position:center;animation:kenburns 18s ease-in-out infinite alternate;filter:saturate(1.05) contrast(1.05)}
    .hero-home::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(8,18,12,.82) 0%,rgba(8,18,12,.48) 42%,rgba(8,18,12,.78) 100%)}
    @keyframes kenburns{from{transform:scale(1)}to{transform:scale(1.08)}}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    .hero-content{position:relative;z-index:3;max-width:920px;padding:0 1.5rem;animation:fadeInUp .9s ease}
    .hero-content h1{font-size:3rem;font-weight:900;margin-bottom:.9rem;letter-spacing:-.02em;text-shadow:0 12px 35px rgba(0,0,0,.45)}
    .hero-content p{font-size:1.12rem;margin:0 auto 1.3rem;opacity:.96;max-width:72ch;text-shadow:0 10px 26px rgba(0,0,0,.35)}
    .cta-row{display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;margin-top:.35rem}
    .trust-strip{display:flex;gap:1.4rem;justify-content:center;flex-wrap:wrap;margin-top:1.2rem}
    .trust-strip span{font-size:.84rem;font-weight:600;color:rgba(255,255,255,.88);display:flex;align-items:center;gap:.35rem}
    .trust-strip span::before{content:'✔';color:#E0B75F;font-size:.9rem;font-weight:800}
    .about{padding:5rem 5%;background:#F8F5F0;text-align:center}
    .about .inner{max-width:900px;margin:0 auto}
    .about h2{font-size:2.2rem;font-weight:800;color:var(--primary);margin-bottom:1rem}
    .about p{font-size:1.06rem;color:var(--muted);max-width:70ch;margin:0 auto 2.5rem}
    .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.2rem;max-width:900px;margin:0 auto}
    .stat-card{background:#fff;padding:1.4rem;border-radius:18px;border:1px solid var(--border);box-shadow:0 4px 16px rgba(0,0,0,.06);transition:transform .25s}
    .stat-card:hover{transform:translateY(-6px)}
    .stat-num{font-size:2.2rem;font-weight:900;background:linear-gradient(135deg,var(--primary),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .stat-label{color:var(--muted);margin-top:.35rem;font-size:.95rem}
    .species-section{background:#fff;padding:4rem 5%}
    .species-section h2{font-size:2rem;font-weight:900;text-align:center;color:var(--primary);margin-bottom:.6rem}
    .species-section .intro{color:var(--muted);text-align:center;margin:0 auto 2rem;max-width:70ch}
    .bird-grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));max-width:1100px;margin:0 auto}
    .bird-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:1.2rem 1.3rem;transition:.25s ease;box-shadow:0 4px 16px rgba(0,0,0,.06)}
    .bird-card:hover{transform:translateY(-6px);box-shadow:0 16px 36px rgba(0,0,0,.10)}
    .bird-icon{font-size:2rem;margin-bottom:.4rem}
    .bird-title{font-weight:900;color:var(--primary);margin-bottom:.4rem;font-family:'Poppins',Arial,sans-serif}
    .bird-info{color:var(--muted);font-size:.97rem;margin-bottom:.6rem}
    .bird-cta a{display:inline-block;padding:.5rem 1rem;border-radius:999px;background:var(--bg);border:1px solid var(--border);color:var(--primary);font-weight:700;font-size:.87rem;transition:.18s;text-decoration:none}
    .bird-cta a:hover{background:var(--gold);border-color:var(--gold);color:#fff}
    .process-section{background:var(--bg);padding:4.5rem 5%}
    .process-section h2{font-size:2rem;font-weight:900;text-align:center;color:var(--primary);margin-bottom:2rem}
    .steps{max-width:760px;margin:0 auto;display:grid;gap:.8rem}
    .step{display:flex;gap:.9rem;align-items:flex-start;background:#fff;border:1px solid var(--border);border-radius:14px;padding:1rem 1.2rem}
    .step-num{min-width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}
    .step-text h3{font-size:1rem;color:var(--primary);margin-bottom:.2rem;font-family:'Poppins',Arial,sans-serif}
    .step-text p{font-size:.92rem;color:var(--muted);margin:0}
    .testimonial-section{background:var(--primary);padding:4rem 5%;color:#fff;text-align:center}
    .testimonial-section h2{font-size:1.8rem;font-weight:900;margin-bottom:2rem}
    .testimonials{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.2rem;max-width:900px;margin:0 auto}
    .testimonial{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:1.4rem;text-align:left}
    .testimonial p{font-size:.95rem;line-height:1.7;color:rgba(255,255,255,.9);margin-bottom:.8rem}
    .testimonial .author{font-size:.82rem;color:var(--gold);font-weight:700}
    .shipping-section{background:#fff;padding:4rem 5%}
    .shipping-section .inner{max-width:860px;margin:0 auto}
    .shipping-section h2{font-size:1.8rem;font-weight:900;color:var(--primary);text-align:center;margin-bottom:1.5rem}
    .shipping-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem}
    .shipping-item{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:1.2rem;text-align:center}
    .shipping-item .icon{font-size:1.8rem;margin-bottom:.5rem}
    .shipping-item h3{font-size:.97rem;font-weight:700;color:var(--primary);margin-bottom:.3rem;font-family:'Poppins',Arial,sans-serif}
    .shipping-item p{font-size:.87rem;color:var(--muted)}
    .contact-section{background:var(--bg);padding:4rem 5%;text-align:center}
    .contact-section h2{font-size:1.9rem;font-weight:900;color:var(--primary);margin-bottom:.8rem}
    .contact-section p{color:var(--muted);max-width:60ch;margin:0 auto 2rem}
    .contact-form{max-width:560px;margin:0 auto;text-align:left}
    .contact-form input,.contact-form select,.contact-form textarea{width:100%;padding:.8rem 1rem;border:1px solid var(--border);border-radius:10px;font-family:'Open Sans',Arial,sans-serif;font-size:.97rem;background:#fff;color:var(--text);margin-bottom:.8rem}
    .contact-form textarea{height:130px;resize:vertical}
    .contact-form button{width:100%;padding:1rem;border-radius:999px;font-weight:800;font-family:'Poppins',Arial,sans-serif;font-size:1rem;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;border:none;cursor:pointer;transition:transform .2s,box-shadow .2s}
    .contact-form button:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(212,169,79,.4)}
    .faq-section{background:#fff;padding:4rem 5%}
    .faq-section .inner{max-width:760px;margin:0 auto}
    .faq-section h2{font-size:1.8rem;font-weight:900;color:var(--primary);text-align:center;margin-bottom:1.5rem}
  </style>
</head>
<body>

${ptNav('/')}

<section class="hero-home">
  <div class="hero-content">
    <div class="badge">🦜 Criador Registado · Envios para Portugal</div>
    <h1>Papagaios Criados com Amor,<br>Prontos para o Seu Lar</h1>
    <p>Aves socializadas desde pequeninas, com documentação CITES e envios seguros para todo Portugal e Europa. Mais de 25 anos de experiência em criação especializada.</p>
    <div class="cta-row">
      <a href="/pt/papagaios-a-venda-portugal/" class="btn-primary" style="text-decoration:none">Ver Aves Disponíveis</a>
      <a href="/pt/contacto/" class="btn-ghost" style="text-decoration:none">✉ Solicitar Informação</a>
    </div>
    <div class="trust-strip">
      <span>Documentação CITES</span>
      <span>Envios para Portugal</span>
      <span>Atenção Personalizada</span>
    </div>
  </div>
</section>

<section class="about">
  <div class="inner">
    <h2>Mais de 25 Anos a Criar Papagaios</h2>
    <p>Somos um criador registado em Llíria, Valência (Espanha). Todas as nossas aves nascem nas nossas instalações, são criadas à mão desde o ninho e entregues com documentação legal completa.</p>
    <div class="stats">
      <div class="stat-card"><div class="stat-num">+25</div><div class="stat-label">Anos de Experiência</div></div>
      <div class="stat-card"><div class="stat-num">100%</div><div class="stat-label">Documentação CITES</div></div>
      <div class="stat-card"><div class="stat-num">EU</div><div class="stat-label">Envios por toda a Europa</div></div>
      <div class="stat-card"><div class="stat-num">7</div><div class="stat-label">Espécies Disponíveis</div></div>
    </div>
  </div>
</section>

<section class="species-section">
  <h2>As Nossas Espécies</h2>
  <p class="intro">Criamos as espécies mais procuradas em Portugal, todas com temperamento equilibrado e socialização desde bebés.</p>
  <div class="bird-grid">
    <div class="bird-card">
      <div class="bird-icon">🦜</div>
      <div class="bird-title">Papagaio Cinzento Africano</div>
      <div class="bird-info">O mais inteligente dos papagaios. Vocabulário extraordinário e vínculo profundo com o seu dono. Ideal para apartamentos.</div>
      <div class="bird-cta"><a href="/pt/papagaio-cinzento/">Saber mais</a></div>
    </div>
    <div class="bird-card">
      <div class="bird-icon">🦅</div>
      <div class="bird-title">Arara Azul-e-Amarela</div>
      <div class="bird-info">Majestosa e social. Pode viver até 60 anos. A companheira perfeita para quem tem espaço e dedicação.</div>
      <div class="bird-cta"><a href="/pt/arara-a-venda/">Saber mais</a></div>
    </div>
    <div class="bird-card">
      <div class="bird-icon">🐦</div>
      <div class="bird-title">Cacatua</div>
      <div class="bird-info">Afectuosa e expressiva. Adora atenção e cria laços emocionais fortes com toda a família.</div>
      <div class="bird-cta"><a href="/pt/cacatua-a-venda/">Saber mais</a></div>
    </div>
    <div class="bird-card">
      <div class="bird-icon">🌿</div>
      <div class="bird-title">Eclectus</div>
      <div class="bird-info">Dimorfismo sexual deslumbrante. Temperamento tranquilo e adaptável. Uma das espécies mais belas do mundo.</div>
      <div class="bird-cta"><a href="/pt/papagaio-eclectus/">Saber mais</a></div>
    </div>
    <div class="bird-card">
      <div class="bird-icon">🦜</div>
      <div class="bird-title">Amazona</div>
      <div class="bird-info">Extrovertida e comunicativa. Grande personalidade e excelente capacidade vocal. Adora interagir.</div>
      <div class="bird-cta"><a href="/pt/amazona-a-venda/">Saber mais</a></div>
    </div>
    <div class="bird-card">
      <div class="bird-icon">🥚</div>
      <div class="bird-title">Ovos Fertilizados</div>
      <div class="bird-info">Para criadores experientes. Ovos CITES com alta taxa de fertilidade e suporte técnico de incubação.</div>
      <div class="bird-cta"><a href="/pt/ovos-fertilizados/">Saber mais</a></div>
    </div>
  </div>
</section>

<section class="process-section">
  <h2>Como Funciona o Processo de Compra</h2>
  <div class="steps">
    <div class="step"><div class="step-num">1</div><div class="step-text"><h3>Contacto Inicial</h3><p>Envie-nos um e-mail com a espécie que pretende. Respondemos com disponibilidade real e fotos do exemplar.</p></div></div>
    <div class="step"><div class="step-num">2</div><div class="step-text"><h3>Reserva da Ave</h3><p>Bloqueamos o exemplar enquanto preparamos toda a documentação legal necessária.</p></div></div>
    <div class="step"><div class="step-num">3</div><div class="step-text"><h3>Documentação CITES</h3><p>Emitimos certificado CITES, guia sanitária veterinária e certificado de origem do criador.</p></div></div>
    <div class="step"><div class="step-num">4</div><div class="step-text"><h3>Entrega em Portugal</h3><p>Transporte especializado em animais vivos. Entregamos em toda Portugal continental e ilhas.</p></div></div>
  </div>
</section>

<section class="testimonial-section">
  <h2>O Que Dizem os Nossos Clientes</h2>
  <div class="testimonials">
    <div class="testimonial">
      <p>«Comprei o meu papagaio cinzento através da Paraíso de Aves. A documentação estava impecável e o animal chegou saudável e sociável. Recomendo sem hesitar.»</p>
      <div class="author">— Ana Sousa, Lisboa</div>
    </div>
    <div class="testimonial">
      <p>«Fui ao criador pessoalmente antes de decidir. Instalações limpas, aves felizes e o criador respondeu a todas as minhas dúvidas. Serviço de excelência.»</p>
      <div class="author">— Rui Mendes, Porto</div>
    </div>
    <div class="testimonial">
      <p>«A minha arara chegou saudável, com toda a documentação e o criador continua disponível para qualquer questão. Uma experiência verdadeiramente profissional.»</p>
      <div class="author">— Catarina Ferreira, Braga</div>
    </div>
  </div>
</section>

<section class="shipping-section">
  <div class="inner">
    <h2>Envios Seguros para Todo Portugal</h2>
    <div class="shipping-grid">
      <div class="shipping-item"><div class="icon">🚚</div><h3>Portugal Continental</h3><p>Entrega domiciliária em 1 a 3 semanas após confirmação</p></div>
      <div class="shipping-item"><div class="icon">✈️</div><h3>Açores e Madeira</h3><p>Envio aéreo IATA com todas as condições de segurança</p></div>
      <div class="shipping-item"><div class="icon">🌡️</div><h3>Temperatura Controlada</h3><p>Transporte em condições optimizadas para o bem-estar da ave</p></div>
      <div class="shipping-item"><div class="icon">📋</div><h3>Documentação Completa</h3><p>CITES + guia sanitária + certificado de origem incluídos</p></div>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="inner">
    <h2>Perguntas Frequentes</h2>
    <div class="faq">
      ${faqHTML(faqs)}
    </div>
  </div>
</section>

<section class="contact-section" id="contacto">
  <h2>Entre em Contacto Connosco</h2>
  <p>Diga-nos que espécie lhe interessa e respondemos com disponibilidade, fotos e toda a informação necessária.</p>
  <div class="contact-form">
    <form name="contacto-pt" method="POST" data-netlify="true" action="/gracias.html">
      <input type="hidden" name="form-name" value="contacto-pt" />
      <input type="text" name="nome" placeholder="O seu nome" required />
      <input type="email" name="email" placeholder="O seu e-mail" required />
      <select name="especie">
        <option value="">Espécie de interesse...</option>
        <option>Papagaio Cinzento Africano</option>
        <option>Arara Azul-e-Amarela</option>
        <option>Arara Escarlate</option>
        <option>Cacatua</option>
        <option>Eclectus</option>
        <option>Amazona</option>
        <option>Ovos Fertilizados</option>
        <option>Outra / Não sei</option>
      </select>
      <textarea name="mensagem" placeholder="A sua mensagem ou perguntas..."></textarea>
      <button type="submit">✉ Enviar Mensagem</button>
    </form>
  </div>
</section>

${ptFooter()}
</body>
</html>`;

  write('pt/index.html', html);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. MONEY PAGES
// ─────────────────────────────────────────────────────────────────────────────

const moneyPages = [
  {
    slug: 'papagaios-a-venda-portugal',
    title: 'Papagaios à Venda em Portugal | Criador Registado com CITES | paraisodeaves',
    metaDesc: 'Compre papagaios com documentação CITES em Portugal. Araras, cinzentos africanos, cacatuas e amazonas criados à mão. Envios seguros para todo Portugal.',
    h1: 'Papagaios à Venda em Portugal',
    badge: '🦜 Criador Registado · CITES Oficial',
    sub: 'A sua fonte de confiança para adquirir papagaios com documentação legal completa, criados à mão e entregues com segurança em qualquer ponto de Portugal.',
    esUrl: '/comprar-loros-espana',
    ptUrl: '/pt/papagaios-a-venda-portugal/',
    breadcrumbs: [{ name: 'Início', url: '/pt/' }, { name: 'Papagaios à Venda em Portugal', url: '/pt/papagaios-a-venda-portugal/' }],
    content: `
      <p>Portugal é um dos países europeus com maior tradição na manutenção de papagaios como animais de companhia. A sua cultura marítima, o contacto histórico com África e o Brasil, e o clima ameno fazem de Portugal um destino natural para quem aprecia estas magníficas aves. No entanto, encontrar um <strong>criador registado de papagaios em Portugal</strong> com documentação CITES completa e garantias de cria própria continua a ser um desafio.</p>

      <p>A Paraíso de Aves é um criador registado e legalmente reconhecido com sede em Llíria, Valência (Espanha). Estamos a menos de 600 km de Lisboa e realizamos envios regulares para todo o território português. Todas as nossas aves nascem nas nossas instalações, são socializadas desde bebés e entregues com toda a documentação exigida pela legislação CITES e europeia.</p>

      <h2>Porquê Comprar a um Criador em Vez de uma Loja de Animais</h2>

      <p>A diferença entre adquirir um papagaio a um criador especializado e comprá-lo numa loja de animais genérica é substancial. Num criador, sabe exatamente onde nasceu a ave, como foi criada e que cuidados recebeu. Numa loja de animais, essa rastreabilidade raramente existe.</p>

      <ul>
        <li><strong>Socialização desde o ninho</strong> — as nossas aves são criadas à mão desde os primeiros dias de vida, o que garante uma adaptação muito mais fácil ao novo lar.</li>
        <li><strong>Documentação CITES rastreável</strong> — cada exemplar sai com o seu número de anilha e certificado CITES vinculado à nossa instalação registada.</li>
        <li><strong>Apoio pós-venda</strong> — continuamos disponíveis por e-mail para qualquer questão após a entrega. Um criador comprometido não desaparece quando o dinheiro troca de mãos.</li>
        <li><strong>Saúde verificada</strong> — cada ave é revista por veterinário antes de sair das nossas instalações.</li>
      </ul>

      <div class="callout">
        <p><strong>Atenção legal:</strong> Em Portugal, adquirir ou possuir um papagaio CITES sem a documentação correspondente pode resultar em contraordenações graves e na apreensão do animal. Exija sempre o certificado CITES antes de fechar qualquer acordo. <a href="/pt/blog/documentacao-cites-portugal/">Saiba mais sobre CITES em Portugal →</a></p>
      </div>

      <h2>Espécies Disponíveis para Portugal</h2>

      <p>O catálogo de espécies que criamos e enviamos regularmente para Portugal inclui:</p>

      <table class="spec-table">
        <tr><th>Espécie</th><th>Nível de Cuidado</th><th>Ideal Para</th></tr>
        <tr><td><a href="/pt/papagaio-cinzento/">Papagaio Cinzento Africano (Yaco)</a></td><td>Moderado-Alto</td><td>Famílias experientes, apartamentos</td></tr>
        <tr><td><a href="/pt/arara-a-venda/">Arara Azul-e-Amarela</a></td><td>Alto</td><td>Casas com espaço, amantes de aves grandes</td></tr>
        <tr><td><a href="/pt/arara-a-venda/">Arara Escarlate</a></td><td>Alto</td><td>Criadores experientes</td></tr>
        <tr><td><a href="/pt/cacatua-a-venda/">Cacatua de Eleonora</a></td><td>Moderado</td><td>Famílias, primeiros donos de grandes papagaios</td></tr>
        <tr><td><a href="/pt/papagaio-eclectus/">Eclectus</a></td><td>Moderado</td><td>Quem aprecia aves tranquilas e bonitas</td></tr>
        <tr><td><a href="/pt/amazona-a-venda/">Amazona</a></td><td>Moderado</td><td>Quem quer uma ave comunicativa</td></tr>
      </table>

      <h2>Processo de Compra e Envio para Portugal</h2>

      <p>O nosso processo é transparente e acompanha-o em cada passo:</p>
      <ol>
        <li><strong>Contacto por e-mail</strong> — diga-nos a espécie que pretende e responderemos com disponibilidade e fotos reais do exemplar.</li>
        <li><strong>Reserva</strong> — mediante confirmação, reservamos a ave enquanto preparamos a documentação.</li>
        <li><strong>Documentação CITES</strong> — certificado CITES, guia sanitária e certificado de origem emitidos oficialmente.</li>
        <li><strong>Transporte especializado</strong> — a ave é enviada por operadores licenciados em transporte de animais vivos.</li>
        <li><strong>Entrega em Portugal</strong> — em 1 a 3 semanas, dependendo da localização e disponibilidade.</li>
      </ol>

      <h2>Cidades Portuguesas com Entrega Regular</h2>
      <div class="city-links">
        <a href="/pt/cidades/papagaios-lisboa/">Lisboa</a>
        <a href="/pt/cidades/papagaios-porto/">Porto</a>
        <a href="/pt/cidades/papagaios-braga/">Braga</a>
        <a href="/pt/cidades/papagaios-coimbra/">Coimbra</a>
        <a href="/pt/cidades/papagaios-faro/">Faro</a>
        <a href="/pt/cidades/papagaios-setubal/">Setúbal</a>
        <a href="/pt/cidades/papagaios-aveiro/">Aveiro</a>
        <a href="/pt/cidades/papagaios-leiria/">Leiria</a>
        <a href="/pt/cidades/">Ver todas as cidades →</a>
      </div>
    `,
    faqs: [
      { q: "Enviam para todo Portugal?", a: "Sim. Enviamos para todo Portugal continental. Para as ilhas (Açores e Madeira), o transporte é feito por via aérea com operadores especializados em animais vivos, cumprindo a regulamentação IATA." },
      { q: "Qual é o prazo de entrega em Portugal?", a: "O prazo habitual desde a confirmação é de 1 a 3 semanas, dependendo da localização, disponibilidade do exemplar e logística do transporte especializado." },
      { q: "A documentação CITES é válida em Portugal?", a: "Sim. Portugal é membro da CITES e faz parte da União Europeia. A documentação emitida pelo nosso criador registado em Espanha é reconhecida e válida em todo o território português." },
      { q: "Posso visitar o criador antes de comprar?", a: "Sim. O nosso criador está em Llíria, a 25 minutos de Valência e a menos de 600 km de Lisboa. Para visitas, contacte-nos por e-mail para marcar dia e hora." },
      { q: "Que garantias oferecem?", a: "Garantimos a saúde do animal no momento da entrega (guia sanitária veterinária), a autenticidade da documentação CITES e o acompanhamento pós-venda. Se tiver qualquer questão após receber a ave, estamos sempre disponíveis por e-mail." }
    ]
  },
  {
    slug: 'papagaio-cinzento',
    title: 'Papagaio Cinzento Africano à Venda | Criador com CITES | paraisodeaves',
    metaDesc: 'Compre papagaio cinzento africano (yaco) com documentação CITES. Criado à mão em Espanha, socializado desde bebé. Envios seguros para Portugal.',
    h1: 'Papagaio Cinzento Africano (Yaco) à Venda',
    badge: '🦜 A Espécie Mais Inteligente',
    sub: 'O papagaio cinzento africano é considerado o papagaio mais inteligente do mundo. Com até 80 anos de vida e vocabulário comparável ao de uma criança de 5 anos, é a ave de companhia definitiva.',
    esUrl: '/loro-gris-africano.html',
    ptUrl: '/pt/papagaio-cinzento/',
    breadcrumbs: [{ name: 'Início', url: '/pt/' }, { name: 'Papagaios à Venda', url: '/pt/papagaios-a-venda-portugal/' }, { name: 'Papagaio Cinzento Africano', url: '/pt/papagaio-cinzento/' }],
    content: `
      <p>O <strong>papagaio cinzento africano</strong> (<em>Psittacus erithacus</em>), conhecido em Espanha como "yaco", é a espécie de papagaio mais procurada em Portugal e em toda a Europa. A sua capacidade cognitiva extraordinária — estudada extensivamente por cientistas como Irene Pepperberg — coloca-o no mesmo nível de inteligência de um primata. Não é apenas uma ave bonita: é um companheiro de vida.</p>

      <h2>Características do Papagaio Cinzento Africano</h2>

      <table class="spec-table">
        <tr><th>Característica</th><th>Detalhe</th></tr>
        <tr><td>Nome científico</td><td><em>Psittacus erithacus</em></td></tr>
        <tr><td>Esperança de vida</td><td>50–80 anos em cativeiro</td></tr>
        <tr><td>Tamanho</td><td>33–40 cm, 400–600 g</td></tr>
        <tr><td>Vocabulário</td><td>Até 1000 palavras e frases contextuais</td></tr>
        <tr><td>Temperamento</td><td>Sensível, inteligente, leal</td></tr>
        <tr><td>Nível de ruído</td><td>Moderado (adequado para apartamentos)</td></tr>
        <tr><td>Status CITES</td><td>Apêndice I — documentação obrigatória</td></tr>
      </table>

      <h2>Temperamento e Comportamento</h2>
      <p>O cinzento africano é uma ave de profundo vínculo emocional. Escolhe um "humano favorito" e dedica-lhe uma fidelidade comparável à de um cão. Esta mesma sensibilidade significa que resiste mal à solidão e a alterações bruscas de rotina. Se está muito ausente de casa, este não é o papagaio certo para si — a menos que invista em estimulação adequada.</p>
      <p>A sua inteligência exige estimulação constante: puzzles, brinquedos rotativos, interação diária e, idealmente, aprendizagem de palavras e tarefas. Um cinzento africano entediado pode desenvolver comportamentos destrutivos ou auto-mutilar as penas.</p>

      <h2>Alimentação</h2>
      <p>A dieta equilibrada de um papagaio cinzento africano em Portugal deve incluir:</p>
      <ul>
        <li><strong>Pellets de qualidade</strong> (base, cerca de 60% da dieta)</li>
        <li><strong>Frutas frescas</strong> — manga, papaia, kiwi, romã</li>
        <li><strong>Legumes</strong> — cenoura, courgette, brócolos, espinafres</li>
        <li><strong>Nozes e sementes</strong> com moderação (ricas em gordura)</li>
        <li><strong>Evitar:</strong> abacate, chocolate, cafeína, álcool, cebola, alho</li>
      </ul>

      <div class="callout">
        <p><strong>Nota CITES:</strong> O papagaio cinzento africano está listado no Apêndice I da CITES (desde 2017). A sua aquisição, posse e transporte exigem certificado CITES obrigatório. Todos os nossos exemplares vêm com documentação completa e rastreável.</p>
      </div>

      <h2>Cuidados Essenciais</h2>
      <ul>
        <li>Jaula mínima: 90×90×120 cm, com barras de aço inoxidável</li>
        <li>Temperatura ideal: 18–26 °C (evitar correntes de ar diretas)</li>
        <li>Humidade relativa: 50–60% (importante no inverno com aquecimento central)</li>
        <li>Veterinário especializado em aves exóticas — consulta anual mínima</li>
        <li>Banho semanal com água morna (spray ou bacia)</li>
        <li>Mínimo 3–4 horas de interação diária fora da jaula</li>
      </ul>

      <h2>Quanto Custa um Papagaio Cinzento Africano em Portugal?</h2>
      <p>O preço de um cinzento africano criado à mão com documentação CITES depende da sub-espécie, da disponibilidade e do momento de cria. Contacte-nos por e-mail para obter informação actualizada sobre disponibilidade e preços. <strong>Não publicamos preços fixos no site</strong> porque a disponibilidade varia sazonalmente.</p>
    `,
    faqs: [
      { q: "O papagaio cinzento africano adapta-se a apartamentos?", a: "Sim, é uma das melhores espécies para apartamentos. Tem um nível de ruído moderado comparado a araras ou amazonas, e o seu tamanho (33–40 cm) permite uma jaula adequada num espaço razoável." },
      { q: "Com que idade posso adquirir um papagaio cinzento?", a: "Os nossos exemplares saem desmamados e com entre 3 e 5 meses de idade. Nesta fase já comem sozinhos e estão socializados, o que facilita muito a adaptação ao novo lar." },
      { q: "Quanto tempo vive um papagaio cinzento africano?", a: "Com cuidados adequados, pode viver entre 50 e 80 anos. É um compromisso de décadas — considere essa responsabilidade antes de adquirir." },
      { q: "Preciso de licença para ter um em Portugal?", a: "Precisa de ter a documentação CITES em ordem. Não existe licença de posse específica em Portugal, mas a posse sem documentação CITES é ilegal e pode resultar em apreensão." }
    ]
  },
  {
    slug: 'arara-a-venda',
    title: 'Araras à Venda em Portugal | Criador com CITES | paraisodeaves',
    metaDesc: 'Compre araras azul-e-amarela ou escarlate com documentação CITES. Criadas à mão em Espanha. Envios seguros para Portugal continental e ilhas.',
    h1: 'Araras à Venda com Documentação CITES',
    badge: '🦅 Araras Criadas à Mão',
    sub: 'As araras são as rainhas do mundo das aves de companhia. Com até 60 anos de vida e uma presença impressionante, são a escolha de quem quer um companheiro verdadeiramente extraordinário.',
    esUrl: '/guacamayos.html',
    ptUrl: '/pt/arara-a-venda/',
    breadcrumbs: [{ name: 'Início', url: '/pt/' }, { name: 'Papagaios à Venda', url: '/pt/papagaios-a-venda-portugal/' }, { name: 'Araras', url: '/pt/arara-a-venda/' }],
    content: `
      <p>As <strong>araras</strong> (<em>Ara</em> spp.) são as aves de companhia mais impressionantes que existem. O seu colorido vibrante, a sua inteligência aguçada e a sua longevidade excecional tornam-nas companheiras para toda a vida — literalmente, pois podem viver mais de 60 anos. Em Portugal, a procura por araras criadas legalmente tem crescido significativamente na última década.</p>

      <h2>Espécies de Araras Disponíveis</h2>

      <table class="spec-table">
        <tr><th>Espécie</th><th>Tamanho</th><th>Esperança de Vida</th><th>Temperamento</th></tr>
        <tr><td>Arara Azul-e-Amarela (<em>Ara ararauna</em>)</td><td>86 cm, 900–1200 g</td><td>50–60 anos</td><td>Social, afectuosa, comunicativa</td></tr>
        <tr><td>Arara Escarlate (<em>Ara macao</em>)</td><td>81 cm, 900–1100 g</td><td>50–75 anos</td><td>Energética, independente, inteligente</td></tr>
        <tr><td>Arara Jacinto (<em>Anodorhynchus hyacinthinus</em>)</td><td>100 cm</td><td>50–60 anos</td><td>Gentil, dócil, "gigante gentil"</td></tr>
      </table>

      <h2>O Que Precisa de Saber Antes de Comprar uma Arara</h2>
      <p>A arara não é para toda a gente, e dizemo-lo com o máximo respeito pelo animal e pelo futuro dono. Antes de avançar, considere:</p>
      <ul>
        <li><strong>Espaço:</strong> uma arara adulta precisa de uma jaula mínima de 1,5 × 1 × 1,8 m. Sem espaço adequado, a ave sofre.</li>
        <li><strong>Tempo:</strong> mínimo 4–6 horas de interação diária. São aves altamente sociais que desenvolvem problemas comportamentais com a solidão.</li>
        <li><strong>Ruído:</strong> as araras são vocalmente potentes. Em apartamentos urbanos com vizinhos próximos, isto pode ser problemático.</li>
        <li><strong>Longevidade:</strong> ao adquirir uma arara, está a assumir um compromisso para toda a sua vida — e possivelmente para a de quem lhe herdar a ave.</li>
      </ul>

      <h2>Alimentação das Araras</h2>
      <p>A alimentação correcta é fundamental para a longevidade e saúde da sua arara:</p>
      <ul>
        <li>Pellets de qualidade (base de 50–60% da dieta)</li>
        <li>Frutas tropicais frescas: manga, papaia, maracujá</li>
        <li>Legumes: cenoura, brócolo, curgete, pimento</li>
        <li>Nozes (amêndoa, noz, macadâmia) — fontes de gordura saudável essenciais para araras</li>
        <li>Evitar: abacate, chocolate, cafeína, sal em excesso</li>
      </ul>

      <div class="callout">
        <p><strong>Documentação CITES obrigatória:</strong> Todas as espécies de araras estão listadas nos apêndices CITES. A posse sem certificado é ilegal em Portugal e em toda a União Europeia. Os nossos exemplares saem sempre com documentação completa e rastreável.</p>
      </div>

      <h2>Envio de Araras para Portugal</h2>
      <p>O transporte de araras para Portugal é feito por operadores especializados em animais vivos, com caixas aprovadas pela IATA e condições controladas de temperatura, ventilação e luz. O processo demora habitualmente entre 2 e 4 semanas desde a confirmação da reserva até à entrega.</p>
    `,
    faqs: [
      { q: "Qual a diferença entre a arara azul-e-amarela e a escarlate?", a: "A arara azul-e-amarela (Ara ararauna) tem um temperamento geralmente mais dócil e adaptável, sendo recomendada para quem tem menos experiência com araras. A escarlate (Ara macao) é mais energética e independente. Ambas exigem muito espaço e dedicação." },
      { q: "Uma arara pode viver num apartamento?", a: "Com dificuldade. As araras grandes produzem muito ruído e precisam de espaço considerável. Se tem vizinhos próximos e um apartamento de tamanho médio, considere espécies mais pequenas como o papagaio cinzento ou a amazona." },
      { q: "As araras falam?", a: "Sim, as araras têm boa capacidade vocal e podem aprender muitas palavras e frases. No entanto, não atingem o nível de vocabulário contextual do papagaio cinzento africano." },
      { q: "Que documentação vem com a arara?", a: "O certificado CITES (obrigatório para todas as espécies de Ara), guia sanitária veterinária, certificado de origem do criador e número de anilha individual." }
    ]
  },
  {
    slug: 'cacatua-a-venda',
    title: 'Cacatuas à Venda em Portugal | Criador com CITES | paraisodeaves',
    metaDesc: 'Compre cacatua com documentação CITES em Portugal. Cacatua de Eleonora, Ninfa e outras espécies criadas à mão. Envios seguros para todo Portugal.',
    h1: 'Cacatuas à Venda com Documentação CITES',
    badge: '🐦 Cacatuas Criadas à Mão',
    sub: 'As cacatuas são conhecidas pela sua afetividade intensa e expressividade dramática. São aves que amam profundamente — e exigem o mesmo em troca.',
    esUrl: '/cacatuas.html',
    ptUrl: '/pt/cacatua-a-venda/',
    breadcrumbs: [{ name: 'Início', url: '/pt/' }, { name: 'Papagaios à Venda', url: '/pt/papagaios-a-venda-portugal/' }, { name: 'Cacatuas', url: '/pt/cacatua-a-venda/' }],
    content: `
      <p>As <strong>cacatuas</strong> (família Cacatuidae) são as aves de companhia mais afectuosas do mundo das aves. Ao contrário dos papagaios do Novo Mundo, que são mais independentes, as cacatuas desenvolvem um apego emocional profundo com os seus donos. São aves que "amam demais" — e isso tem as suas implicações.</p>

      <h2>Espécies de Cacatua Disponíveis</h2>
      <table class="spec-table">
        <tr><th>Espécie</th><th>Tamanho</th><th>Ideal Para</th></tr>
        <tr><td>Cacatua de Eleonora (<em>Cacatua galerita eleonora</em>)</td><td>44 cm</td><td>Famílias dedicadas, casas com espaço</td></tr>
        <tr><td>Ninfa Carolina (<em>Nymphicus hollandicus</em>)</td><td>30–33 cm</td><td>Primeiros donos, apartamentos</td></tr>
        <tr><td>Cacatua Rosada (<em>Eolophus roseicapilla</em>)</td><td>35 cm</td><td>Famílias com experiência</td></tr>
      </table>

      <h2>Temperamento das Cacatuas</h2>
      <p>Se o papagaio cinzento é "o professor", a cacatua é "o melhor amigo". Extremamente afectuosa, a cacatua quer estar sempre com o seu dono — literalmente encostada a ele. Esta necessidade de contacto é encantadora, mas significa também que a ave pode desenvolver problemas graves de ansiedade de separação se for deixada sozinha por longos períodos.</p>
      <p>A ninfa carolina é a espécie ideal para quem quer a doçura de uma cacatua num tamanho mais gerível. É menos ruidosa, mais fácil de alojar e igualmente afectuosa.</p>

      <h2>Necessidades de Alojamento</h2>
      <ul>
        <li>Cacatua grande (Eleonora): jaula mínima 1 × 0,8 × 1,5 m</li>
        <li>Ninfa: jaula mínima 60 × 60 × 90 cm</li>
        <li>Temperatura ideal: 18–26 °C</li>
        <li>Tempo fora da jaula: mínimo 3–5 horas diárias</li>
        <li>Brinquedos destrutíveis (a cacatua precisa de morder para manter o bico saudável)</li>
      </ul>

      <div class="callout">
        <p><strong>Pó de plumas:</strong> As cacatuas produzem um pó muito fino que pode ser problemático para pessoas com alergias respiratórias. Se tem asma ou outra condição respiratória, consulte o seu médico antes de adquirir uma cacatua.</p>
      </div>

      <h2>Alimentação das Cacatuas</h2>
      <ul>
        <li>Pellets de qualidade (60% da dieta)</li>
        <li>Frutas e legumes frescos (30%)</li>
        <li>Sementes e nozes com moderação (10%)</li>
        <li>Cálcio suplementar (osso de sépia à disposição)</li>
      </ul>
    `,
    faqs: [
      { q: "A ninfa carolina é boa para principiantes?", a: "Sim, a ninfa carolina (cockatiell) é considerada uma das melhores escolhas para quem não tem experiência com papagaios grandes. É dócil, afectuosa, não excessivamente ruidosa e relativamente fácil de cuidar." },
      { q: "As cacatuas produzem muito pó?", a: "Sim, especialmente as espécies maiores. Produzem um pó ceroso que é parte natural do seu ciclo de plumagem. Para quem tem alergias respiratórias, isto pode ser um problema. A ninfa carolina produz menos pó que as cacatuas grandes." },
      { q: "Quanto tempo vive uma cacatua?", a: "A ninfa carolina vive tipicamente 15–25 anos. As cacatuas maiores (como a Eleonora) podem viver 40–60 anos com cuidados adequados." },
      { q: "As cacatuas falam?", a: "As cacatuas maiores têm capacidade vocal razoável. A ninfa carolina pode aprender algumas palavras e imitar sons, mas não é conhecida pela fala. A sua maior qualidade é a doçura do temperamento, não o vocabulário." }
    ]
  },
  {
    slug: 'papagaio-eclectus',
    title: 'Papagaio Eclectus à Venda em Portugal | Criador CITES | paraisodeaves',
    metaDesc: 'Compre papagaio eclectus com CITES em Portugal. Dimorfismo sexual deslumbrante, temperamento tranquilo. Criado à mão, envio para todo Portugal.',
    h1: 'Papagaio Eclectus à Venda',
    badge: '🌿 A Ave Mais Colorida',
    sub: 'O Eclectus é único no mundo das aves: macho e fêmea são tão diferentes que durante séculos foram confundidos com espécies distintas. Uma joia viva para coleccionar.',
    esUrl: '/available-birds/eclectus.html',
    ptUrl: '/pt/papagaio-eclectus/',
    breadcrumbs: [{ name: 'Início', url: '/pt/' }, { name: 'Papagaios à Venda', url: '/pt/papagaios-a-venda-portugal/' }, { name: 'Eclectus', url: '/pt/papagaio-eclectus/' }],
    content: `
      <p>O <strong>papagaio eclectus</strong> (<em>Eclectus roratus</em>) é, sem dúvida, a espécie de papagaio mais visualmente dramática do mundo. O dimorfismo sexual é tão acentuado — o macho é verde-esmeralda brilhante com bico cor-de-laranja, a fêmea é vermelho-rubi com violeta e bico preto — que durante séculos os naturalistas acreditavam que eram espécies completamente diferentes.</p>

      <h2>Características do Eclectus</h2>
      <table class="spec-table">
        <tr><th>Característica</th><th>Macho</th><th>Fêmea</th></tr>
        <tr><td>Cor dominante</td><td>Verde esmeralda</td><td>Vermelho-rubi</td></tr>
        <tr><td>Cor do bico</td><td>Laranja-amarelo</td><td>Preto</td></tr>
        <tr><td>Tamanho</td><td colspan="2">35–42 cm, 375–550 g</td></tr>
        <tr><td>Esperança de vida</td><td colspan="2">30–50 anos</td></tr>
        <tr><td>Temperamento</td><td colspan="2">Calmo, observador, inteligente</td></tr>
      </table>

      <h2>Temperamento e Personalidade</h2>
      <p>Ao contrário de muitos papagaios, o eclectus é geralmente mais calmo e menos ruidoso. Adapta-se bem a famílias com rotinas estáveis. Os machos tendem a ser mais afectuosos e dóceis; as fêmeas são mais independentes e podem ser territoriais durante a época de reprodução.</p>
      <p>O eclectus tem uma dieta muito específica — mais rica em frutas e vegetais frescos do que a maioria dos papagaios. A sua dieta errada pode causar problemas sérios de saúde a médio prazo.</p>

      <h2>Alimentação Específica do Eclectus</h2>
      <p>O eclectus tem uma dieta única que deve respeitar:</p>
      <ul>
        <li><strong>Frutas frescas (40%):</strong> manga, figo, papaia, romã, kiwi, maçã</li>
        <li><strong>Legumes frescos (40%):</strong> cenoura, brócolos, espinafres, abóbora</li>
        <li><strong>Grãos cozidos (15%):</strong> quinoa, arroz integral, lentilha</li>
        <li><strong>Pellets (5% apenas):</strong> o eclectus metaboliza pellets de forma diferente; o excesso causa problemas</li>
        <li><strong>Evitar:</strong> dieta baseada em sementes (causa deficiências), pellets coloridos com corantes</li>
      </ul>

      <div class="callout">
        <p><strong>Atenção à dieta:</strong> O eclectus não tolera uma dieta baseada em sementes ou pellets em excesso como outros papagaios. A sua dieta deve ser maioritariamente frutas e legumes frescos. Ignorar isto resulta em problemas graves de saúde a médio prazo.</p>
      </div>
    `,
    faqs: [
      { q: "O eclectus é um bom papagaio para principiantes?", a: "Depende. O seu temperamento calmo é adequado para principiantes, mas as suas necessidades dietéticas muito específicas exigem pesquisa prévia e compromisso com alimentação fresca diária." },
      { q: "Macho ou fêmea — qual escolher?", a: "Os machos tendem a ser mais dóceis e afectuosos. As fêmeas são mais independentes e podem ser territoriais durante certas épocas. Para um primeiro eclectus, os machos são geralmente a escolha mais fácil." },
      { q: "O eclectus é ruidoso?", a: "Comparado com araras ou amazonas, o eclectus é relativamente calmo. Vocaliza, mas com menos frequência e intensidade. É uma opção razoável para apartamentos sem problemas graves de ruído." }
    ]
  },
  {
    slug: 'amazona-a-venda',
    title: 'Amazona à Venda em Portugal | Criador com CITES | paraisodeaves',
    metaDesc: 'Compre amazona com CITES em Portugal. Amazona-da-frente-azul, nuca-amarela e outras espécies criadas à mão. Envios para todo Portugal.',
    h1: 'Amazona à Venda com Documentação CITES',
    badge: '🦜 Carisma e Personalidade',
    sub: 'As amazonas são os "palhaços" do mundo dos papagaios — extrovertidas, comunicativas e com uma personalidade marcada que nunca passa despercebida.',
    esUrl: '/available-birds/loro-amazonico.html',
    ptUrl: '/pt/amazona-a-venda/',
    breadcrumbs: [{ name: 'Início', url: '/pt/' }, { name: 'Papagaios à Venda', url: '/pt/papagaios-a-venda-portugal/' }, { name: 'Amazona', url: '/pt/amazona-a-venda/' }],
    content: `
      <p>As <strong>amazonas</strong> (género <em>Amazona</em>) são dos papagaios mais populares em Portugal e em toda a Ibéria. A sua capacidade de fala excecional, a personalidade extrovertida e o temperamento geralmente adaptável tornam-nas excelentes aves de companhia para famílias activas que possam dedicar tempo e atenção.</p>

      <h2>Espécies de Amazona Disponíveis</h2>
      <table class="spec-table">
        <tr><th>Espécie</th><th>Tamanho</th><th>Característica Principal</th></tr>
        <tr><td>Amazona-da-frente-azul (<em>A. aestiva</em>)</td><td>37 cm</td><td>Das melhores a falar; muito popular em Portugal</td></tr>
        <tr><td>Amazona-da-nuca-amarela (<em>A. auropalliata</em>)</td><td>38 cm</td><td>Voz musical, excelente capacidade de imitação</td></tr>
        <tr><td>Amazona-de-frente-lilás (<em>A. finschi</em>)</td><td>33 cm</td><td>Mais calma que outras amazonas</td></tr>
      </table>

      <h2>Temperamento da Amazona</h2>
      <p>A amazona tem uma personalidade forte e definida. É extrovertida, curiosa e não tem vergonha de expressar as suas opiniões — vocal e fisicamente. Ao contrário do papagaio cinzento, que pode ser mais reservado, a amazona adora ser o centro das atenções.</p>
      <p>Um aspeto importante: as amazonas passam por uma fase hormonal intensa durante a maturidade sexual (geralmente entre os 5 e 12 anos) em que podem ficar mais territoriais e imprevisíveis. Quem conhece a espécie sabe como gerir este período; para principiantes pode ser surpreendente.</p>

      <h2>Capacidade de Fala</h2>
      <p>A amazona é, a par do papagaio cinzento africano, uma das espécies com maior capacidade vocal. Muitos exemplares aprendem centenas de palavras, frases e até canções completas. A sua voz tende a ser mais musical e menos "robótica" que a do cinzento.</p>

      <div class="callout">
        <p><strong>Adequada para Portugal?</strong> As amazonas adaptam-se bem ao clima português — o seu habitat natural é tropical, e o Algarve e o Alentejo têm verões próximos das condições que conhecem na natureza. Em zonas mais frias (norte de Portugal, interior), garanta que o alojamento tem temperatura controlada no inverno.</p>
      </div>

      <h2>Alimentação</h2>
      <ul>
        <li>Pellets de qualidade (50% da dieta)</li>
        <li>Frutas tropicais: manga, papaia, guava, abacaxi</li>
        <li>Legumes: cenoura, milho, pimento, espinafre</li>
        <li>Sementes com moderação (as amazonas têm tendência para a obesidade)</li>
        <li>Evitar: abacate, chocolate, sal, álcool, lacticínios em excesso</li>
      </ul>
    `,
    faqs: [
      { q: "Qual a melhor amazona para falar?", a: "A amazona-da-frente-azul (Amazona aestiva) e a amazona-da-nuca-amarela (A. auropalliata) são consideradas as melhores a falar entre as amazonas. Ambas têm voz clara e boa memória para palavras e frases." },
      { q: "A amazona é adequada para crianças?", a: "Com supervisão, sim. As amazonas são geralmente afectuosas com a família toda, mas a sua personalidade forte pode ser intimidante para crianças muito pequenas. São excelentes para famílias com crianças a partir dos 8–10 anos." },
      { q: "As amazonas vivem quanto tempo?", a: "Com cuidados adequados, as amazonas podem viver 50–70 anos em cativeiro. É um compromisso de longo prazo que deve ser considerado seriamente." }
    ]
  },
  {
    slug: 'ovos-fertilizados',
    title: 'Ovos Fertilizados de Papagaio à Venda | CITES | paraisodeaves',
    metaDesc: 'Ovos fertilizados de papagaios com documentação CITES. Para criadores experientes. Alta taxa de fertilidade, suporte técnico de incubação. Envios para Portugal.',
    h1: 'Ovos Fertilizados de Papagaio com CITES',
    badge: '🥚 Para Criadores Experientes',
    sub: 'Vendemos ovos fertilizados de papagaios com documentação CITES para criadores devidamente registados. Alta taxa de fertilidade com suporte técnico de incubação.',
    esUrl: '/available-birds/huevos-fertiles.html',
    ptUrl: '/pt/ovos-fertilizados/',
    breadcrumbs: [{ name: 'Início', url: '/pt/' }, { name: 'Papagaios à Venda', url: '/pt/papagaios-a-venda-portugal/' }, { name: 'Ovos Fertilizados', url: '/pt/ovos-fertilizados/' }],
    content: `
      <p>A venda de <strong>ovos fertilizados de papagaios</strong> com documentação CITES é um serviço dirigido exclusivamente a criadores devidamente registados e com experiência em incubação artificial de psitacídeos. Não é um serviço para particulares sem experiência — a incubação e criação manual de bebés papagaios exige conhecimento técnico especializado.</p>

      <div class="callout">
        <p><strong>Apenas para criadores registados:</strong> A aquisição de ovos fertilizados de espécies CITES requer documentação específica. Terá de apresentar prova do seu registo como criador e instalações adequadas. Não vendemos ovos a particulares sem essa documentação.</p>
      </div>

      <h2>Espécies Disponíveis em Ovos Fertilizados</h2>
      <p>A disponibilidade de ovos varia sazonalmente e depende dos ciclos de reprodução dos nossos casais reprodutores. Contacte-nos para verificar disponibilidade actual. Habitualmente temos disponibilidade de ovos de:</p>
      <ul>
        <li>Papagaio Cinzento Africano (<em>Psittacus erithacus</em>)</li>
        <li>Arara Azul-e-Amarela (<em>Ara ararauna</em>)</li>
        <li>Arara Escarlate (<em>Ara macao</em>)</li>
        <li>Amazona (<em>Amazona</em> spp.)</li>
        <li>Eclectus (<em>Eclectus roratus</em>)</li>
      </ul>

      <h2>Processo de Compra e Entrega</h2>
      <p>Dada a natureza frágil dos ovos e os requisitos legais envolvidos, o processo de compra é mais exigente do que a compra de aves desmamadas:</p>
      <ol>
        <li>Contacto inicial com prova de registo como criador</li>
        <li>Verificação de requisitos legais e instalações de incubação</li>
        <li>Emissão de documentação CITES adequada para transporte de ovos</li>
        <li>Envio com embalagem especializada de temperatura controlada</li>
        <li>Suporte técnico por e-mail durante a incubação</li>
      </ol>

      <h2>Requisitos de Incubação</h2>
      <p>Para ter sucesso na incubação de ovos de papagaios, necessita de:</p>
      <ul>
        <li>Incubadora de precisão (temperatura estável 37,2–37,5 °C)</li>
        <li>Humidade relativa: 50–55% durante incubação, 65–70% no nascimento</li>
        <li>Viragem automática ou manual a cada 4–6 horas</li>
        <li>Candling (ovoscopia) para verificar fertilidade e desenvolvimento</li>
        <li>Espaço de nursery aquecido para os bebés após a eclosão</li>
      </ul>
    `,
    faqs: [
      { q: "Qualquer pessoa pode comprar ovos fertilizados?", a: "Não. A venda de ovos de espécies CITES requer documentação específica. O comprador tem de ser um criador registado com instalações adequadas de incubação. Verificamos sempre a documentação antes de qualquer venda." },
      { q: "Qual a taxa de fertilidade dos ovos?", a: "Os nossos ovos têm uma taxa de fertilidade habitualmente acima de 85%, confirmada por ovoscopia antes do envio. No entanto, factores como o transporte e as condições de incubação do comprador afectam o resultado final." },
      { q: "Os ovos vêm com documentação CITES?", a: "Sim, todos os ovos são acompanhados de documentação CITES adequada para transporte e posse. Este é um requisito legal não negociável." },
      { q: "Dão suporte técnico de incubação?", a: "Sim. Após a compra, estamos disponíveis por e-mail para responder a questões técnicas sobre incubação, candling, temperatura, humidade e criação manual dos bebés." }
    ]
  }
];

function buildMoneyPage(page) {
  const canonical = `${BASE}${page.ptUrl}`;
  const html = `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${gaSnippet()}
  <title>${page.title}</title>
  <meta name="description" content="${page.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="pt-PT" />
  <link rel="canonical" href="${canonical}" />
  ${hreflang(page.esUrl, page.ptUrl)}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_PT" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.metaDesc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${BASE}/uploaded-macaw.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${page.title}" />
  <meta name="twitter:description" content="${page.metaDesc}" />
  ${favicons()}
  ${fonts()}
  <script type="application/ld+json">${breadcrumbSchema(page.breadcrumbs)}</script>
  <script type="application/ld+json">${faqSchema(page.faqs)}</script>
  ${baseCSS()}
</head>
<body>

${ptNav('/venda')}

<section class="hero">
  <div class="wrap">
    <p class="breadcrumb-nav">${page.breadcrumbs.map((b, i) => i < page.breadcrumbs.length - 1 ? `<a href="${b.url}">${b.name}</a>` : b.name).join(' · ')}</p>
    <span class="badge">${page.badge}</span>
    <h1>${page.h1}</h1>
    <p class="sub">${page.sub}</p>
    <div class="trust-row">
      <span class="trust-item">✓ CITES Oficial</span>
      <span class="trust-item">✓ Criado à Mão</span>
      <span class="trust-item">✓ Envio para Portugal</span>
      <span class="trust-item">✓ Apoio Pós-Venda</span>
    </div>
  </div>
</section>

<div class="content">
  ${page.content}

  <h2>Perguntas Frequentes</h2>
  <div class="faq">
    ${faqHTML(page.faqs)}
  </div>

  <div class="cta-box">
    <h2>Interessado? Fale Connosco</h2>
    <p>Envie-nos um e-mail com a espécie que pretende. Respondemos com disponibilidade real, fotos do exemplar e toda a informação sobre documentação e entrega em Portugal.</p>
    <a href="/pt/contacto/" class="btn-primary">✉ Contactar Agora</a>
    <a href="/pt/papagaios-a-venda-portugal/" class="btn-ghost">Ver Todas as Espécies</a>
  </div>
</div>

${ptFooter()}
</body>
</html>`;

  const slug = page.ptUrl.replace('/pt/', '').replace(/\/$/, '');
  write(`pt/${slug}/index.html`, html);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CITY PAGES
// ─────────────────────────────────────────────────────────────────────────────

const cities = [
  {
    slug: 'papagaios-lisboa',
    name: 'Lisboa',
    region: 'Área Metropolitana de Lisboa',
    intro: 'Lisboa é a maior cidade de Portugal e um dos mercados mais activos para papagaios de companhia na Península Ibérica.',
    climate: 'O clima mediterrânico de Lisboa, com verões quentes e secos e invernos suaves, é um dos mais adequados para papagaios de origem tropical. Os residentes lisboetas que adquirem papagaios têm a vantagem natural de um ambiente climaticamente próximo do habitat original das espécies.',
    delivery: 'Lisboa e toda a Área Metropolitana (Sintra, Cascais, Setúbal, Almada, Barreiro, Montijo) são cobertas com entrega domiciliária. O prazo habitual é de 1 a 2 semanas.',
    vet: 'Lisboa tem excelente oferta de veterinários especializados em aves exóticas e psitacídeos. Recomendamos identificar a sua clínica de referência antes da chegada da ave.',
    faqs: [
      { q: "Entregam em Lisboa e área metropolitana?", a: "Sim. Lisboa capital, Sintra, Cascais, Almada, Barreiro, Setúbal e toda a Área Metropolitana de Lisboa são cobertas com entrega domiciliária por transportador especializado." },
      { q: "Que espécie recomendam para um apartamento lisboeta?", a: "Para apartamentos em Lisboa recomendamos o papagaio cinzento africano ou a amazona. São espécies adaptáveis a espaços urbanos, com nível de ruído moderado adequado a prédios com vizinhos." },
      { q: "Há bons veterinários de aves exóticas em Lisboa?", a: "Sim. Lisboa tem uma das melhores ofertas de medicina veterinária de aves exóticas em Portugal. Recomendamos identificar a sua clínica antes da chegada da ave e agendar uma consulta de boas-vindas nos primeiros dias." },
      { q: "Podem entregar no Funchal (Madeira)?", a: "Sim. Para a Madeira, o transporte é feito por via aérea com operadores especializados em animais vivos. O prazo é geralmente de 2 a 3 semanas e pode ter custo adicional de logística aérea." }
    ]
  },
  {
    slug: 'papagaios-porto',
    name: 'Porto',
    region: 'Grande Porto e Norte de Portugal',
    intro: 'O Porto e o Norte de Portugal têm uma comunidade crescente de apreciadores de papagaios exóticos. A região combina tradição e modernidade na abordagem à avicultura.',
    climate: 'O clima atlântico do Porto, mais húmido e com invernos mais frios que o Sul, requer atenção especial ao aquecimento do alojamento das aves no inverno. A humidade elevada pode ser benéfica — muitos papagaios tropicais preferem ambientes húmidos.',
    delivery: 'Porto, Vila Nova de Gaia, Matosinhos, Braga, Guimarães e toda a região norte de Portugal são cobertas. Entrega em 1 a 2 semanas.',
    vet: 'O Porto tem clínicas especializadas em aves exóticas. A Universidade do Porto (ICBAS) tem também recursos de referência na área.',
    faqs: [
      { q: "Entregam no Porto e no Norte de Portugal?", a: "Sim. Porto, Vila Nova de Gaia, Matosinhos, Maia, Braga, Guimarães e toda a região norte são cobertas com entrega por transportador especializado em 1 a 2 semanas." },
      { q: "O clima do Porto afecta os papagaios?", a: "O inverno do Porto é mais frio e húmido. Garanta que o alojamento tem aquecimento adequado (18–22 °C mínimo) e proteja a ave de correntes de ar. A humidade do Porto pode ser benéfica para espécies tropicais." },
      { q: "Que espécie recomendam para o Norte de Portugal?", a: "Para o Norte, onde os invernos são mais frios, recomendamos espécies robustas como o papagaio cinzento africano ou a amazona, que toleram variações de temperatura com alojamento adequado." }
    ]
  },
  {
    slug: 'papagaios-braga',
    name: 'Braga',
    region: 'Braga e Minho',
    intro: 'Braga, a cidade dos arcebispos, é também um polo emergente para os apreciadores de papagaios exóticos no Minho.',
    climate: 'Clima atlântico temperado, com verões quentes e invernos frios. As aves necessitam de alojamento aquecido entre novembro e março.',
    delivery: 'Braga, Barcelos, Guimarães, Famalicão e toda a região do Minho. Entrega em 1 a 2 semanas.',
    vet: 'A região de Braga tem crescente oferta veterinária especializada. Para espécies raras, considere deslocação a clínicas de referência no Porto.',
    faqs: [
      { q: "Entregam em Braga?", a: "Sim. Braga e toda a região do Minho (Barcelos, Guimarães, Famalicão, Viana do Castelo) são cobertas com entrega domiciliária em 1 a 2 semanas." },
      { q: "Há veterinários de aves em Braga?", a: "Sim. A oferta em Braga é crescente. Para espécies raras ou consultas de especialidade, pode valer a pena deslocar-se a uma clínica de referência no Porto." }
    ]
  },
  {
    slug: 'papagaios-coimbra',
    name: 'Coimbra',
    region: 'Coimbra e Centro de Portugal',
    intro: 'Coimbra, cidade universitária por excelência, tem uma comunidade académica e cultural que aprecia a singularidade dos papagaios exóticos.',
    climate: 'Clima mediterrânico-continental, com verões quentes e secos e invernos frios. Ideal para papagaios tropicais com alojamento adequado.',
    delivery: 'Coimbra, Figueira da Foz, Leiria e toda a região centro. Entrega em 1 a 2 semanas.',
    vet: 'Coimbra tem a Universidade de Coimbra com faculdade de medicina veterinária — referência para aves exóticas na região centro.',
    faqs: [
      { q: "Entregam em Coimbra?", a: "Sim. Coimbra e toda a região centro (Figueira da Foz, Leiria, Castelo Branco) são cobertas com entrega em 1 a 2 semanas." },
      { q: "Existe veterinária de aves em Coimbra?", a: "Sim. A Universidade de Coimbra (FMV) é uma referência para medicina de aves exóticas. Há também clínicas privadas especializadas na região." }
    ]
  },
  {
    slug: 'papagaios-faro',
    name: 'Faro',
    region: 'Algarve',
    intro: 'O Algarve, com o seu clima quente e seco, é a região de Portugal com condições climaticamente mais próximas do habitat natural dos papagaios tropicais.',
    climate: 'O clima algarvio é o mais favorável de Portugal para papagaios tropicais. Verões quentes e longos, invernos suaves. As aves adaptam-se com facilidade, embora devam ter sombra e água fresca nos picos de calor de verão.',
    delivery: 'Faro, Portimão, Lagos, Albufeira, Loulé, Tavira e todo o Algarve. Entrega em 1 a 2 semanas.',
    vet: 'O Algarve tem uma boa rede veterinária, impulsionada pelo turismo e pelos residentes estrangeiros que trazem os seus animais de companhia.',
    faqs: [
      { q: "O Algarve é um bom sítio para ter papagaios?", a: "Sim, o clima do Algarve é dos melhores de Portugal para papagaios tropicais. Os verões quentes e os invernos suaves aproximam-se do ambiente natural de muitas espécies. Garanta sempre sombra e água fresca no verão." },
      { q: "Entregam em toda a região do Algarve?", a: "Sim. Faro, Portimão, Lagos, Albufeira, Vilamoura, Loulé, Tavira e toda a região algarvia são cobertas com entrega domiciliária em 1 a 2 semanas." }
    ]
  },
  {
    slug: 'papagaios-setubal',
    name: 'Setúbal',
    region: 'Setúbal e Península de Setúbal',
    intro: 'Setúbal e a Península de Setúbal, incluindo a Costa Azul e a Serra da Arrábida, têm uma comunidade crescente de apreciadores de aves exóticas.',
    climate: 'Clima mediterrânico suave, próximo de Lisboa. Excelente para papagaios tropicais com alojamento adequado.',
    delivery: 'Setúbal, Almada, Seixal, Barreiro, Montijo, Alcochete e toda a Península de Setúbal. Entrega em 1 a 2 semanas.',
    vet: 'A proximidade a Lisboa permite acesso a clínicas veterinárias especializadas de referência.',
    faqs: [
      { q: "Entregam em Setúbal e na Península de Setúbal?", a: "Sim. Setúbal, Almada, Seixal, Barreiro, Montijo, Palmela e toda a Península de Setúbal são cobertas com entrega domiciliária." }
    ]
  },
  {
    slug: 'papagaios-aveiro',
    name: 'Aveiro',
    region: 'Aveiro e Centro-Litoral',
    intro: 'Aveiro, a "Veneza portuguesa", tem uma comunidade de amantes de papagaios exóticos que cresce com o desenvolvimento da região.',
    climate: 'Clima atlântico com influência da ria. Verões moderados e invernos relativamente amenos para o Norte. A humidade da ria pode ser favorável para espécies tropicais.',
    delivery: 'Aveiro, Ílhavo, Águeda, Oliveira de Azeméis e toda a região. Entrega em 1 a 2 semanas.',
    vet: 'A Universidade de Aveiro tem recursos na área das ciências biológicas. Para medicina veterinária especializada, a referência é Coimbra ou Porto.',
    faqs: [
      { q: "Entregam em Aveiro?", a: "Sim. Aveiro, Ílhavo, Águeda, Ovar, Oliveira de Azeméis e toda a região de Aveiro são cobertas com entrega domiciliária em 1 a 2 semanas." }
    ]
  },
  {
    slug: 'papagaios-leiria',
    name: 'Leiria',
    region: 'Leiria e Centro-Oeste',
    intro: 'Leiria, no centro-oeste de Portugal, é um ponto de distribuição natural entre Lisboa, Coimbra e o Oeste.',
    climate: 'Clima mediterrânico-atlântico, equilibrado. Verões quentes e invernos frios mas sem extremos. Adequado para a maioria das espécies com alojamento standard.',
    delivery: 'Leiria, Caldas da Rainha, Marinha Grande, Nazaré e toda a região. Entrega em 1 a 2 semanas.',
    vet: 'A região de Leiria tem oferta veterinária crescente. Para especialidades, Coimbra é a referência mais próxima.',
    faqs: [
      { q: "Entregam em Leiria?", a: "Sim. Leiria, Caldas da Rainha, Marinha Grande, Nazaré, Alcobaça e toda a região são cobertas com entrega domiciliária em 1 a 2 semanas." }
    ]
  },
  {
    slug: 'papagaios-evora',
    name: 'Évora',
    region: 'Évora e Alentejo',
    intro: 'Évora e o Alentejo têm um estilo de vida mais tranquilo e espaçoso — ideal para quem quer criar papagaios com espaço e paz.',
    climate: 'Clima continental alentejano: verões muito quentes e secos, invernos frios. Importante garantir alojamento com ar condicionado no verão e aquecimento no inverno.',
    delivery: 'Évora, Beja, Portalegre e todo o Alentejo. Entrega em 1 a 2 semanas.',
    vet: 'A Universidade de Évora tem faculdade de medicina veterinária com recursos em aves. Clínicas privadas na região com crescente especialização.',
    faqs: [
      { q: "Entregam no Alentejo?", a: "Sim. Évora, Beja, Portalegre, Santiago do Cacém e todo o Alentejo são cobertos com entrega domiciliária em 1 a 2 semanas." },
      { q: "O calor do Alentejo afecta os papagaios?", a: "Os verões alentejanos são intensos (40°C+). As aves precisam de alojamento com ar condicionado ou ventilação adequada, sombra permanente e água fresca à disposição. Com esses cuidados, adaptam-se bem." }
    ]
  },
  {
    slug: 'papagaios-viseu',
    name: 'Viseu',
    region: 'Viseu e Beira Alta',
    intro: 'Viseu, no coração da Beira Alta, é uma cidade com crescente interesse em aves exóticas como animais de companhia.',
    climate: 'Clima continental com invernos frios e nevões ocasionais. As aves precisam de aquecimento adequado de outubro a abril.',
    delivery: 'Viseu, Lamego, Vila Real e toda a Beira Alta. Entrega em 1 a 2 semanas.',
    vet: 'Viseu tem serviços veterinários razoáveis. Para especialidades em aves exóticas, Coimbra ou Porto são as referências.',
    faqs: [
      { q: "Entregam em Viseu?", a: "Sim. Viseu, Lamego, Penafiel, Santa Comba Dão e toda a Beira Alta são cobertos com entrega domiciliária em 1 a 2 semanas." }
    ]
  },
  {
    slug: 'papagaios-guimaraes',
    name: 'Guimarães',
    region: 'Guimarães e Vale do Ave',
    intro: 'Guimarães, berço de Portugal, tem uma tradição histórica e uma comunidade cultural que cada vez mais aprecia a singularidade das aves exóticas.',
    climate: 'Clima atlântico do Norte de Portugal, húmido e temperado. Invernos frios exigem aquecimento adequado para as aves.',
    delivery: 'Guimarães, Famalicão, Santo Tirso, Vizela e todo o Vale do Ave. Entrega em 1 a 2 semanas.',
    vet: 'A região tem oferta veterinária adequada, com referências no Porto para especialidades avícolas.',
    faqs: [
      { q: "Entregam em Guimarães?", a: "Sim. Guimarães, Famalicão, Santo Tirso, Vizela e toda a região do Vale do Ave são cobertos com entrega domiciliária em 1 a 2 semanas." }
    ]
  },
  {
    slug: 'papagaios-funchal',
    name: 'Funchal',
    region: 'Ilha da Madeira',
    intro: 'O Funchal e a ilha da Madeira têm um clima subtropical único em Portugal — possivelmente o melhor de todo o país para papagaios tropicais.',
    climate: 'Clima subtropical da Madeira: temperatura amena todo o ano (17–25 °C), humidade elevada, sem invernos frios. Condições ideais para papagaios tropicais durante todo o ano.',
    delivery: 'O transporte para a Madeira é feito por via aérea com operadores especializados em animais vivos. O prazo é de 2 a 3 semanas. Pode haver custo adicional de logística aérea.',
    vet: 'O Funchal tem serviços veterinários. Para casos complexos de aves exóticas, pode ser necessária deslocação ao continente.',
    faqs: [
      { q: "Fazem envios para a Madeira?", a: "Sim. O transporte para a Madeira é feito por via aérea por operadores especializados em animais vivos, cumprindo toda a regulamentação IATA. O prazo é de 2 a 3 semanas com possível custo adicional de logística aérea." },
      { q: "O clima da Madeira é bom para papagaios?", a: "Excelente. O clima subtropical da Madeira, com temperaturas amenas o ano todo e humidade elevada, é um dos melhores de Portugal para papagaios tropicais. As aves adaptam-se com muito facilidade." }
    ]
  },
  {
    slug: 'papagaios-ponta-delgada',
    name: 'Ponta Delgada',
    region: 'Açores — Ilha de São Miguel',
    intro: 'Ponta Delgada e os Açores têm condições climaticamente muito favoráveis para papagaios, e uma comunidade de amantes de aves exóticas em crescimento.',
    climate: 'Clima oceânico subtropical dos Açores: temperaturas amenas todo o ano, humidade elevada. Excelente para papagaios tropicais, especialmente espécies de floresta húmida.',
    delivery: 'O transporte para os Açores é feito por via aérea com operadores especializados em animais vivos. O prazo é de 2 a 4 semanas. Pode ter custo adicional de logística aérea.',
    vet: 'Ponta Delgada tem serviços veterinários. Para especialidades avícolas complexas, pode ser necessária deslocação ao continente.',
    faqs: [
      { q: "Enviam para os Açores?", a: "Sim. O transporte para os Açores (todas as ilhas) é feito por via aérea com operadores especializados em animais vivos. O prazo é de 2 a 4 semanas, podendo haver custo adicional de logística aérea." },
      { q: "O clima dos Açores é adequado para papagaios?", a: "Muito adequado. O clima oceânico subtropical dos Açores, com temperaturas amenas e humidade elevada, é excelente para papagaios de floresta tropical. É dos melhores microclimas de Portugal para estas aves." }
    ]
  }
];

function buildCityPage(city) {
  const ptUrl = `/pt/cidades/${city.slug}/`;
  const canonical = `${BASE}${ptUrl}`;
  const html = `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${gaSnippet()}
  <title>Papagaios em ${city.name} | Criador com CITES | paraisodeaves</title>
  <meta name="description" content="Compre papagaios com documentação CITES em ${city.name}. Criador registado em Espanha com envios seguros para ${city.region}. Papagaio cinzento, araras, cacatuas." />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="pt-PT" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="pt-PT" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${BASE}/" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_PT" />
  <meta property="og:title" content="Papagaios em ${city.name} | Criador com CITES | paraisodeaves" />
  <meta property="og:description" content="Compre papagaios com documentação CITES em ${city.name}. Envio seguro para ${city.region}." />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${BASE}/uploaded-macaw.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  ${favicons()}
  ${fonts()}
  <script type="application/ld+json">${breadcrumbSchema([
    { name: 'Início', url: '/pt/' },
    { name: 'Cidades', url: '/pt/cidades/' },
    { name: `Papagaios em ${city.name}`, url: ptUrl }
  ])}</script>
  <script type="application/ld+json">${faqSchema(city.faqs)}</script>
  ${baseCSS()}
</head>
<body>

${ptNav('/cidades')}

<section class="hero">
  <div class="wrap">
    <p class="breadcrumb-nav"><a href="/pt/">Início</a> · <a href="/pt/cidades/">Cidades</a> · ${city.name}</p>
    <span class="badge">🦜 Criador Registado · Envio para ${city.name}</span>
    <h1>Papagaios em ${city.name} com Documentação CITES</h1>
    <p class="sub">${city.intro}</p>
    <div class="trust-row">
      <span class="trust-item">✓ CITES Oficial</span>
      <span class="trust-item">✓ Criado à Mão</span>
      <span class="trust-item">✓ Entrega em ${city.name}</span>
      <span class="trust-item">✓ Apoio Pós-Venda</span>
    </div>
  </div>
</section>

<div class="content">

  <p>${city.intro} A Paraíso de Aves é um criador registado em Llíria, Valência (Espanha), com mais de 25 anos de experiência e envios regulares para toda Portugal — incluindo ${city.name} e toda a ${city.region}.</p>

  <h2>Clima em ${city.name} e Bem-Estar das Aves</h2>
  <p>${city.climate}</p>

  <h2>Entrega em ${city.name} — Como Funciona</h2>
  <p>${city.delivery}</p>
  <ol>
    <li><strong>Contacto por e-mail</strong> — diga-nos a espécie pretendida e o seu concelho.</li>
    <li><strong>Confirmação de disponibilidade</strong> — enviamos fotos reais do exemplar disponível.</li>
    <li><strong>Reserva e documentação</strong> — preparamos todo o processo legal CITES.</li>
    <li><strong>Transporte especializado</strong> — por operadores licenciados em animais vivos.</li>
    <li><strong>Entrega em ${city.name}</strong> — no prazo acordado, directamente na sua morada.</li>
  </ol>

  <h2>Rede Veterinária em ${city.name}</h2>
  <p>${city.vet}</p>

  <div class="callout">
    <p><strong>Aviso legal:</strong> Em Portugal, a posse de papagaios das espécies CITES sem documentação correspondente é ilegal e pode resultar na apreensão do animal. Exija sempre certificado CITES antes de qualquer transacção. <a href="/pt/blog/documentacao-cites-portugal/">Saiba mais sobre CITES em Portugal →</a></p>
  </div>

  <h2>Espécies Mais Procuradas em ${city.name}</h2>
  <ul>
    <li><a href="/pt/papagaio-cinzento/"><strong>Papagaio Cinzento Africano</strong></a> — O mais popular em Portugal. Inteligência extraordinária, vocabulário vasto e nível de ruído moderado.</li>
    <li><a href="/pt/arara-a-venda/"><strong>Arara Azul-e-Amarela</strong></a> — Para quem tem espaço e quer uma ave verdadeiramente impressionante. Até 60 anos de vida.</li>
    <li><a href="/pt/cacatua-a-venda/"><strong>Cacatua / Ninfa Carolina</strong></a> — Afectuosa e expressiva. Ideal para famílias.</li>
    <li><a href="/pt/amazona-a-venda/"><strong>Amazona</strong></a> — Extrovertida, comunicativa, com grande capacidade vocal.</li>
    <li><a href="/pt/papagaio-eclectus/"><strong>Eclectus</strong></a> — O mais colorido. Temperamento calmo e personalidade única.</li>
  </ul>

  <h2>Perguntas Frequentes — Papagaios em ${city.name}</h2>
  <div class="faq">
    ${faqHTML(city.faqs)}
  </div>

  <div class="cta-box">
    <h2>Quer um Papagaio em ${city.name}?</h2>
    <p>Contacte-nos por e-mail com a espécie que pretende. Respondemos com disponibilidade real e informações de entrega para ${city.name}.</p>
    <a href="/pt/contacto/" class="btn-primary">✉ Contactar Agora</a>
    <a href="/pt/papagaios-a-venda-portugal/" class="btn-ghost">Ver Espécies Disponíveis</a>
  </div>

  <h2>Outras Cidades de Portugal</h2>
  <div class="city-links">
    ${cities.filter(c => c.slug !== city.slug).map(c => `<a href="/pt/cidades/${c.slug}/">${c.name}</a>`).join('\n    ')}
    <a href="/pt/cidades/">Ver todas →</a>
  </div>

</div>

${ptFooter()}
</body>
</html>`;

  write(`pt/cidades/${city.slug}/index.html`, html);
}

// Cities index
function buildCitiesIndex() {
  const html = `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${gaSnippet()}
  <title>Papagaios por Cidade em Portugal | Entrega Nacional | paraisodeaves</title>
  <meta name="description" content="Compre papagaios com CITES com entrega em qualquer cidade de Portugal. Lisboa, Porto, Braga, Faro, Coimbra e mais. Criador registado em Espanha." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${BASE}/pt/cidades/" />
  ${favicons()}
  ${fonts()}
  <script type="application/ld+json">${breadcrumbSchema([{ name: 'Início', url: '/pt/' }, { name: 'Cidades', url: '/pt/cidades/' }])}</script>
  ${baseCSS()}
</head>
<body>
${ptNav('/cidades')}
<section class="hero">
  <div class="wrap">
    <p class="breadcrumb-nav"><a href="/pt/">Início</a> · Cidades</p>
    <span class="badge">🦜 Entrega em Todo Portugal</span>
    <h1>Papagaios com Entrega em Qualquer Cidade de Portugal</h1>
    <p class="sub">Enviamos papagaios com documentação CITES para qualquer ponto de Portugal continental, Madeira e Açores.</p>
  </div>
</section>
<div class="content">
  <p>A Paraíso de Aves realiza envios regulares para toda Portugal. Abaixo encontra as nossas páginas dedicadas para as principais cidades e regiões portuguesas, com informação específica sobre entrega, clima local e veterinários especializados.</p>
  <div class="article-grid">
    ${cities.map(c => `<div class="article-card"><a href="/pt/cidades/${c.slug}/"><h3>Papagaios em ${c.name}</h3><p>${c.region} — entrega em 1–3 semanas</p></a></div>`).join('\n    ')}
  </div>
  <div class="cta-box">
    <h2>Não Encontra a Sua Cidade?</h2>
    <p>Enviamos para qualquer ponto de Portugal. Contacte-nos e diga-nos onde está — combinamos a entrega.</p>
    <a href="/pt/contacto/" class="btn-primary">✉ Contactar Agora</a>
  </div>
</div>
${ptFooter()}
</body>
</html>`;
  write('pt/cidades/index.html', html);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. BLOG POSTS (30 articles)
// ─────────────────────────────────────────────────────────────────────────────

const blogPosts = [
  {
    slug: 'como-escolher-um-papagaio',
    title: 'Como Escolher um Papagaio: Guia Completo para Iniciantes',
    metaDesc: 'Guia completo para escolher o papagaio certo. Espécie, tamanho, temperamento, compromisso de tempo e orçamento — tudo o que precisa saber antes de decidir.',
    h1: 'Como Escolher um Papagaio — Guia para Iniciantes',
    excerpt: 'Escolher o papagaio certo é uma das decisões mais importantes que pode fazer como futuro dono. Este guia ajuda-o a tomar a decisão certa.',
    content: `<p>Escolher um papagaio não é como escolher um aquário decorativo. É uma decisão que pode acompanhá-lo durante décadas — algumas espécies vivem mais de 60 anos. Antes de se apaixonar por uma espécie numa fotografia, é essencial fazer as perguntas certas.</p>

<h2>Quanto Tempo Tem Disponível?</h2>
<p>Esta é a questão mais importante. Os papagaios são aves altamente sociais que necessitam de interação humana diária. O mínimo aceitável para a maioria das espécies médias e grandes é 3 a 4 horas de contacto por dia. Para araras e cacatuas, pode ser mais.</p>
<p>Se trabalha longas horas fora de casa, considere uma espécie mais independente (como o eclectus) ou, idealmente, um casal de papagaios que se façam companhia.</p>

<h2>Que Espaço Tem?</h2>
<p>As dimensões do alojamento dependem diretamente da espécie:</p>
<ul>
<li><strong>Ninfa carolina:</strong> 60×60×90 cm mínimo</li>
<li><strong>Amazona / Cinzento africano:</strong> 90×80×100 cm mínimo</li>
<li><strong>Arara grande:</strong> 150×100×180 cm mínimo</li>
</ul>
<p>Além da jaula, a ave precisará de espaço para voar livremente quando estiver fora. Um apartamento pequeno não é ideal para uma arara.</p>

<h2>Qual o Seu Orçamento?</h2>
<p>O custo de aquisição é apenas o início. Os custos contínuos incluem alimentação de qualidade, jaula e acessórios, brinquedos rotativos, veterinário especializado (consulta anual mínima), e possíveis emergências médicas. Para espécies maiores, os custos veterinários podem ser significativos.</p>

<h2>Qual o Seu Nível de Experiência?</h2>
<p>Para iniciantes absolutos, recomendamos começar com espécies mais forgivings:</p>
<ul>
<li>Ninfa carolina (cockatiel) — dócil, pequena, fácil de cuidar</li>
<li>Periquito australiano — económico, social, ideal para aprender</li>
<li>Amazona — personalidade marcada mas relativamente fácil de gerir</li>
</ul>
<p>Para iniciantes com alguma experiência prévia:</p>
<ul>
<li>Papagaio cinzento africano — inteligente mas sensível, exige estabilidade</li>
<li>Cacatua de tamanho médio — afectuosa mas exige muita atenção</li>
</ul>

<h2>O Que Procura Numa Ave?</h2>
<p>Defina as suas prioridades antes de decidir:</p>
<ul>
<li><strong>Quer uma ave que fale muito?</strong> → Cinzento africano, amazona</li>
<li><strong>Quer uma ave afectuosa?</strong> → Cacatua, ninfa</li>
<li><strong>Quer impacto visual?</strong> → Arara, eclectus</li>
<li><strong>Quer uma ave calma?</strong> → Eclectus, cinzento africano</li>
<li><strong>Quer algo para toda a família?</strong> → Amazona, arara azul-e-amarela</li>
</ul>

<div class="callout">
<p><strong>Regra de ouro:</strong> Nunca compre um papagaio por impulso. Pesquise durante pelo menos 3 meses, leia sobre a espécie específica, e se possível visite um criador antes de decidir. O bem-estar da ave — e o seu — dependem de uma decisão informada.</p>
</div>

<h2>Criador ou Loja de Animais?</h2>
<p>Recomendamos sempre comprar a um criador registado. As razões são simples: num criador, sabe exactamente a origem do animal, como foi criado e que cuidados recebeu. A socialização desde bebé, feita à mão pelo criador, faz uma diferença enorme no temperamento do animal adulto.</p>`
  },
  {
    slug: 'quanto-custa-um-papagaio-em-portugal',
    title: 'Quanto Custa um Papagaio em Portugal em 2026',
    metaDesc: 'Guia de preços de papagaios em Portugal 2026. Quanto custa um papagaio cinzento, arara, cacatua ou amazona — e os custos anuais de manutenção.',
    h1: 'Quanto Custa um Papagaio em Portugal?',
    excerpt: 'Guia completo de preços de papagaios em Portugal em 2026, incluindo custos de aquisição e manutenção anual.',
    content: `<p>O preço de um papagaio em Portugal varia enormemente consoante a espécie, a origem (criador vs. loja), e a disponibilidade. Neste guia, damos-lhe uma ideia realista dos custos — tanto de aquisição como de manutenção anual.</p>

<h2>Preços de Aquisição por Espécie</h2>
<p>Os valores abaixo são indicativos. Os preços variam consoante a disponibilidade, o criador e as condições de mercado. <strong>Não publicamos preços fixos</strong> — contacte-nos para valores actuais.</p>

<table class="spec-table">
<tr><th>Espécie</th><th>Gama de Preço (indicativa)</th><th>Observações</th></tr>
<tr><td>Ninfa Carolina</td><td>€80–€300</td><td>A espécie mais acessível</td></tr>
<tr><td>Amazona</td><td>€600–€2.500</td><td>Varia por sub-espécie</td></tr>
<tr><td>Papagaio Cinzento Africano</td><td>€1.500–€4.000</td><td>CITES Apêndice I — documentação obrigatória</td></tr>
<tr><td>Cacatua</td><td>€800–€3.500</td><td>Varia por espécie</td></tr>
<tr><td>Arara Azul-e-Amarela</td><td>€3.000–€8.000</td><td>Investimento de décadas</td></tr>
<tr><td>Eclectus</td><td>€800–€2.500</td><td>Macho e fêmea com preços similares</td></tr>
</table>

<h2>Custos Anuais de Manutenção</h2>
<p>O preço de compra é apenas uma parte do custo total. Estes são os custos anuais típicos em Portugal:</p>
<ul>
<li><strong>Alimentação (pellets + fruta/legumes):</strong> €200–€800/ano conforme a espécie</li>
<li><strong>Brinquedos e enriquecimento:</strong> €100–€400/ano</li>
<li><strong>Veterinário (consulta anual + emergências):</strong> €100–€600/ano</li>
<li><strong>Jaula e acessórios (amortização):</strong> €50–€200/ano</li>
</ul>

<div class="callout">
<p><strong>O custo real é a atenção:</strong> Mais do que dinheiro, os papagaios custam tempo. Calculando 3 horas diárias de interação, ao longo de 20 anos isso equivale a mais de 21.000 horas. É o maior "custo" de ter um papagaio.</p>
</div>

<h2>Vale a Pena?</h2>
<p>Para quem genuinamente ama aves e tem disponibilidade, um papagaio é um dos companheiros mais extraordinários que existem. A inteligência, a fidelidade e a personalidade destas aves não têm comparação. Mas seja honesto consigo mesmo sobre o tempo e os recursos que pode dedicar.</p>`
  },
  {
    slug: 'papagaio-cinzento-vs-eclectus',
    title: 'Papagaio Cinzento vs Eclectus: Qual Escolher?',
    metaDesc: 'Comparação detalhada entre o papagaio cinzento africano e o eclectus. Temperamento, cuidados, alimentação e qual é o melhor para si.',
    h1: 'Papagaio Cinzento Africano vs Eclectus — Qual é o Certo para Si?',
    excerpt: 'Duas das espécies mais fascinantes do mundo dos papagaios, comparadas em detalhe para ajudá-lo a escolher.',
    content: `<p>O <strong>papagaio cinzento africano</strong> e o <strong>eclectus</strong> são duas das espécies mais fascinantes e procuradas em Portugal. Ambas são inteligentes, adaptadas a famílias e com personalidades marcadas — mas com diferenças significativas que tornam cada uma mais adequada para perfis diferentes de donos.</p>

<h2>Comparação Rápida</h2>
<table class="spec-table">
<tr><th>Característica</th><th>Cinzento Africano</th><th>Eclectus</th></tr>
<tr><td>Tamanho</td><td>33–40 cm</td><td>35–42 cm</td></tr>
<tr><td>Esperança de vida</td><td>50–80 anos</td><td>30–50 anos</td></tr>
<tr><td>Capacidade de fala</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐</td></tr>
<tr><td>Nível de ruído</td><td>Moderado</td><td>Baixo-Moderado</td></tr>
<tr><td>Necessidade de atenção</td><td>Alta</td><td>Moderada</td></tr>
<tr><td>Dificuldade de dieta</td><td>Moderada</td><td>Alta (dieta muito específica)</td></tr>
<tr><td>Adequado para iniciantes</td><td>Não totalmente</td><td>Com pesquisa prévia</td></tr>
</table>

<h2>Temperamento</h2>
<p><strong>Cinzento africano:</strong> É uma ave emocionalmente complexa. Forma vínculos profundos com "o seu humano" e é extremamente sensível a mudanças de rotina. Pode tornar-se ansioso se a sua vida for instável. Em contrapartida, a sua inteligência é verdadeiramente extraordinária — aprende conceitos, não apenas palavras.</p>
<p><strong>Eclectus:</strong> Mais calmo e menos exigente emocionalmente. Adapta-se melhor a rotinas variáveis e é geralmente mais tolerante com estranhos. Os machos tendem a ser mais afectuosos; as fêmeas mais independentes e territoriais.</p>

<h2>Alimentação</h2>
<p>Esta é onde a diferença é mais marcante. O cinzento africano tem necessidades dietéticas semelhantes a outras espécies grandes: pellets, fruta, legumes e sementes com moderação.</p>
<p>O eclectus é radicalmente diferente: a sua dieta deve ser maioritariamente fruta e legumes frescos (70–80%). Pellets em excesso causam-lhe problemas de saúde. Esta exigência dietética diária é considerável e deve ser avaliada realisticamente.</p>

<h2>Qual Escolher?</h2>
<p><strong>Escolha o cinzento africano se:</strong> quer a ave mais inteligente do mundo, está preparado para um compromisso emocional intenso, tem rotinas estáveis e procura uma ave que realmente "converse" consigo.</p>
<p><strong>Escolha o eclectus se:</strong> prefere uma ave visualmente deslumbrante com temperamento mais calmo, está disponível para preparar dieta fresca diariamente, e quer algo menos "dependente" emocionalmente.</p>`
  },
  {
    slug: 'melhores-papagaios-para-familias',
    title: 'Os Melhores Papagaios para Famílias com Crianças',
    metaDesc: 'Quais os papagaios mais adequados para famílias com crianças? Espécies dóceis, adaptáveis e seguras. Guia completo para famílias portuguesas.',
    h1: 'Os Melhores Papagaios para Famílias com Crianças',
    excerpt: 'Guia para famílias: as espécies mais adequadas para lares com crianças, e conselhos de segurança.',
    content: `<p>Ter um papagaio numa família com crianças pode ser uma experiência maravilhosa — ou desastrosa. Tudo depende de escolher a espécie certa e de criar as condições correctas de convivência. Este guia ajuda-o a tomar a decisão certa.</p>

<h2>Espécies Recomendadas para Famílias</h2>

<h3>1. Ninfa Carolina (Cockatiel) — A melhor para iniciantes</h3>
<p>A ninfa carolina é, de longe, a melhor escolha para famílias com crianças que nunca tiveram papagaios. É pequena (30 cm), dócil, raramente morde com força e adapta-se facilmente a ambientes movimentados. Pode aprender algumas palavras e imitar sons. Tem uma esperança de vida de 15–25 anos.</p>

<h3>2. Amazona — Para famílias activas</h3>
<p>As amazonas aduram a interação e são naturalmente gregárias — perfeitas para famílias numerosas e activas. São robustas e têm personalidade forte. Recomendamos supervisão com crianças pequenas (abaixo dos 6 anos), pois a amazona pode ser imprevisível se se sentir ameaçada.</p>

<h3>3. Arara Azul-e-Amarela — Para famílias com espaço</h3>
<p>Se tem espaço e disponibilidade, a arara azul-e-amarela é uma ave extraordinária para famílias. São afectuosas, sociais e geralmente gentis com crianças. O tamanho impressiona mas o temperamento é gentil com quem conhecem.</p>

<h2>Espécies a Evitar com Crianças Pequenas</h2>
<ul>
<li><strong>Cacatua grande</strong> — Bico poderoso, pode causar ferimentos sérios se assustar.</li>
<li><strong>Papagaio cinzento africano</strong> — Muito sensível ao caos. Crianças barulhentas criam stress.</li>
<li><strong>Arara escarlate</strong> — Mais imprevisível e territorial.</li>
</ul>

<h2>Regras de Segurança com Crianças</h2>
<ul>
<li>Nunca deixe crianças com menos de 8 anos sozinhas com um papagaio grande</li>
<li>Ensine as crianças a aproximar-se calmamente, sem movimentos bruscos</li>
<li>Não deixe a criança pôr o rosto perto do bico da ave</li>
<li>A jaula deve ter um local que seja "refúgio" da ave — quando está lá, não se incomoda</li>
<li>Estabeleça regras claras: a ave não é um brinquedo</li>
</ul>

<div class="callout">
<p><strong>Benefícios educativos:</strong> Criar uma criança com um papagaio ensina responsabilidade, empatia, respeito pelos animais e os ritmos da natureza. Quando a escolha é correcta e a supervisão adequada, é uma das melhores experiências de infância que pode proporcionar.</p>
</div>`
  },
  {
    slug: 'treinar-um-papagaio',
    title: 'Como Treinar um Papagaio: Técnicas Eficazes e Seguras',
    metaDesc: 'Guia completo de treino de papagaios. Técnicas de reforço positivo, como ensinar a falar, pousar no dedo e reduzir comportamentos negativos.',
    h1: 'Como Treinar um Papagaio — Guia Prático',
    excerpt: 'Técnicas eficazes de treino baseadas em reforço positivo para papagaios de todas as espécies.',
    content: `<p>O treino de papagaios não é sobre dominância ou punição — é sobre construir confiança e comunicação. Os papagaios são extraordinariamente inteligentes e respondem excelentemente ao reforço positivo. Com paciência e consistência, pode ensinar ao seu papagaio comportamentos úteis e divertidos.</p>

<h2>O Princípio do Reforço Positivo</h2>
<p>A regra de ouro do treino de papagaios: <strong>recompense o comportamento que quer ver repetido; ignore o que quer eliminar</strong>. Nunca puna fisicamente um papagaio — além de cruel, é completamente contraproducente e destroi a confiança.</p>

<h2>Os Primeiros Passos — Criação de Confiança</h2>
<p>Antes de qualquer treino, a ave tem de confiar em si. Para um papagaio recém-chegado:</p>
<ol>
<li>Nos primeiros 3–7 dias, deixe-o adaptar-se sem tentar tocá-lo. Fale suavemente perto da jaula.</li>
<li>Ofereça petiscos especiais (um pedaço de fruta favorita) através das grades.</li>
<li>Quando aceitar comida da sua mão sem recuo, pode avançar para o próximo passo.</li>
<li>Introduza o dedo como "poleiro" — apresente devagar, com um petisco na outra mão.</li>
</ol>

<h2>Ensinar a Falar</h2>
<p>Não há truque mágico: repetição com contexto. O papagaio associa palavras a situações quando as ouve repetidamente no mesmo contexto:</p>
<ul>
<li>Diga "bom dia" todas as manhãs ao descobrir a jaula</li>
<li>Diga "boa noite" ao cobrir a jaula</li>
<li>Diga o nome da comida ao oferecê-la</li>
<li>Use as mesmas palavras nas mesmas situações, sempre</li>
</ul>
<p>O cinzento africano aprende mais rapidamente que a maioria; a ninfa carolina pode aprender algumas palavras mas não é conhecida pela fala. Não force — cada ave tem o seu ritmo.</p>

<h2>Comandos Básicos Úteis</h2>
<ul>
<li><strong>"Sobe"</strong> — para pousar no dedo (reforçado com petisco)</li>
<li><strong>"Desce"</strong> — para voltar ao poleiro ou jaula</li>
<li><strong>"Não"</strong> — pronunciado com voz firme e neutra (não gritar)</li>
<li><strong>Nome da ave</strong> — para chamar a atenção antes de qualquer comando</li>
</ul>

<h2>Lidar com Mordidelas</h2>
<p>Os papagaios mordem por razões — medo, dor, excitação excessiva. Nunca grite se for mordido (o papagaio interpreta como atenção positiva). Reaja com uma reacção neutra, afaste a ave e termine a sessão. Com o tempo, aprende os sinais de aviso do seu papagaio antes de morder — linguagem corporal, dilatação da pupila, postura.</p>

<div class="callout">
<p><strong>Sessões curtas e positivas:</strong> 10–15 minutos por sessão, 2 a 3 vezes por dia, são mais eficazes do que uma hora diária. Termine sempre com uma nota positiva — um petisco e um elogio verbal. O papagaio deve sempre querer que a sessão continue.</p>
</div>`
  },
  {
    slug: 'documentacao-cites-portugal',
    title: 'Documentação CITES em Portugal: Tudo o que Precisa Saber',
    metaDesc: 'Guia completo sobre CITES em Portugal. O que é, que papagaios precisam de certificado, como obter documentação legal e o que verificar antes de comprar.',
    h1: 'Documentação CITES em Portugal — Guia Completo',
    excerpt: 'Tudo sobre a CITES em Portugal: que espécies precisam de certificado, como funciona e o que verificar antes de comprar um papagaio.',
    content: `<p>A CITES (Convenção sobre o Comércio Internacional de Espécies da Fauna e Flora Silvestres Ameaçadas) é o tratado internacional que regula o comércio de espécies protegidas. Portugal é Estado-membro e aplica integralmente a legislação CITES e a regulamentação europeia correspondente.</p>

<h2>O Que é a CITES?</h2>
<p>A CITES divide as espécies protegidas em três apêndices:</p>
<ul>
<li><strong>Apêndice I:</strong> Espécies em risco de extinção. Comércio proibido excepto em casos muito específicos (ex: criadores registados). A maioria dos papagaios grandes está aqui.</li>
<li><strong>Apêndice II:</strong> Espécies que podem tornar-se ameaçadas. Comércio permitido com documentação CITES.</li>
<li><strong>Apêndice III:</strong> Espécies protegidas por pelo menos um país que pediu cooperação.</li>
</ul>

<h2>Que Papagaios Precisam de CITES em Portugal?</h2>
<table class="spec-table">
<tr><th>Espécie</th><th>Apêndice CITES</th><th>Documentação</th></tr>
<tr><td>Papagaio Cinzento Africano</td><td>Apêndice I</td><td>Certificado CITES obrigatório</td></tr>
<tr><td>Araras (todas as espécies Ara)</td><td>Apêndice I/II</td><td>Certificado CITES obrigatório</td></tr>
<tr><td>Arara Jacinto</td><td>Apêndice I</td><td>Certificado CITES obrigatório</td></tr>
<tr><td>Cacatuas</td><td>Apêndice I/II</td><td>Certificado CITES obrigatório</td></tr>
<tr><td>Amazona (maioria)</td><td>Apêndice I/II</td><td>Certificado CITES obrigatório</td></tr>
<tr><td>Eclectus</td><td>Apêndice II</td><td>Certificado CITES obrigatório</td></tr>
<tr><td>Ninfa Carolina</td><td>Não listada (F3)</td><td>Geralmente não necessita, mas verifique</td></tr>
</table>

<h2>O Que Verificar Antes de Comprar</h2>
<p>Ao adquirir um papagaio de espécie CITES em Portugal, exija sempre:</p>
<ol>
<li><strong>Certificado CITES</strong> — com número de registo, nome da espécie e número de anilha do animal</li>
<li><strong>Anilha no pé da ave</strong> — deve corresponder ao número no certificado</li>
<li><strong>Guia sanitária veterinária</strong> — emitida por veterinário habilitado</li>
<li><strong>Factura ou recibo</strong> — prova da transacção comercial</li>
</ol>

<div class="callout">
<p><strong>Atenção:</strong> Em Portugal, a posse de um papagaio CITES sem documentação pode resultar em contra-ordenação grave, multa e apreensão do animal. A ignorância da lei não é desculpa — exija sempre documentação completa.</p>
</div>

<h2>Como Obter Documentação para uma Ave Já Possuída</h2>
<p>Se adquiriu um papagaio sem documentação (de boa fé ou por desconhecimento), a situação pode ser regularizada em alguns casos. Contacte o ICNF (Instituto da Conservação da Natureza e das Florestas) em Portugal para orientação sobre o procedimento de regularização. O processo envolve avaliação veterinária e pode resultar na legalização ou, em casos extremos, na apreensão da ave.</p>`
  },
  {
    slug: 'alimentacao-papagaio-guia-completo',
    title: 'Alimentação de Papagaios: Guia Completo para Portugal',
    metaDesc: 'Guia completo de alimentação de papagaios. Pellets, frutas, legumes, sementes e alimentos proibidos. Adaptado ao mercado e alimentos disponíveis em Portugal.',
    h1: 'Alimentação de Papagaios — Guia Completo',
    excerpt: 'O que comem os papagaios? Guia completo de alimentação com os melhores alimentos disponíveis em Portugal.',
    content: `<p>A alimentação é um dos pilares do bem-estar de um papagaio. Uma dieta incorrecta é a causa número um de doenças crónicas e morte prematura em psitacídeos em cativeiro. Felizmente, com informação correcta e alguma organização, é perfeitamente possível alimentar bem o seu papagaio em Portugal.</p>

<h2>A Base da Dieta: Pellets</h2>
<p>Os pellets de qualidade devem ser a base da dieta (40–60% para a maioria das espécies). São formulados para conter todos os nutrientes necessários em proporções adequadas. Marcas disponíveis em Portugal:</p>
<ul>
<li><strong>Zupreem</strong> — amplamente disponível, boa qualidade</li>
<li><strong>Harrison's Bird Foods</strong> — considerada premium, disponível online</li>
<li><strong>Versele-Laga Prestige</strong> — boa qualidade, disponível em Portugal</li>
<li><strong>Roudybush</strong> — excelente qualidade, mais difícil de encontrar</li>
</ul>

<h2>Frutas Frescas Disponíveis em Portugal</h2>
<p>Portugal tem ótima disponibilidade de frutas tropicais, especialmente no verão e nas zonas com maior influência atlântica:</p>
<ul>
<li>✓ Manga — muito apreciada pela maioria das espécies</li>
<li>✓ Papaia — excelente fonte de vitamina A</li>
<li>✓ Romã — rica em antioxidantes</li>
<li>✓ Kiwi — vitamina C e potássio</li>
<li>✓ Figo — melhor fresco que seco</li>
<li>✓ Maçã — sempre disponível; retirar sementes</li>
<li>✓ Pera — hidratação e fibra</li>
<li>✓ Uva — usar com moderação (teor de açúcar)</li>
</ul>

<h2>Legumes Essenciais</h2>
<ul>
<li>✓ Cenoura — crua ou cozida, muito apreciada</li>
<li>✓ Brócolo — rico em vitamina K e C</li>
<li>✓ Espinafre — com moderação (oxalatos)</li>
<li>✓ Courgette / Abobrinha — hidratante e suave</li>
<li>✓ Pimento vermelho ou amarelo — excelente fonte de vitamina A</li>
<li>✓ Ervilha — proteína vegetal</li>
<li>✓ Milho doce — apreciadíssimo, moderação pelo açúcar</li>
</ul>

<h2>Alimentos Proibidos — Lista Completa</h2>
<ul>
<li>❌ <strong>Abacate</strong> — tóxico, pode causar morte cardíaca</li>
<li>❌ <strong>Chocolate</strong> — teobromina é fatal</li>
<li>❌ <strong>Cafeína</strong> — café, chá, refrigerantes</li>
<li>❌ <strong>Álcool</strong> — absolutamente proibido</li>
<li>❌ <strong>Sal em excesso</strong> — insuficiência renal</li>
<li>❌ <strong>Cebola e alho</strong> — compostos sulfurosos tóxicos</li>
<li>❌ <strong>Sementes de maçã e pera</strong> — contêm cianeto</li>
<li>❌ <strong>Nozes em excesso</strong> — gordura excessiva</li>
</ul>

<div class="callout">
<p><strong>Água fresca diariamente:</strong> A água deve ser substituída todos os dias. Em Portugal, a água da torneira é geralmente segura. Se usar filtrada, melhor ainda. Evite água estagnada — papagaios adoram sujar a água com comida.</p>
</div>

<h2>Suplementos Úteis</h2>
<ul>
<li>Osso de sépia — cálcio natural, especialmente importante para fêmeas</li>
<li>Vitamina D3 — especialmente no inverno em zonas com pouco sol</li>
<li>Probióticos — após antibioticoterapia ou em aves com digestão sensível</li>
</ul>`
  },
  {
    slug: 'esperanca-de-vida-papagaios',
    title: 'Esperança de Vida dos Papagaios: Quanto Vivem?',
    metaDesc: 'Quanto vivem os papagaios? Guia de esperança de vida por espécie — cinzento africano, arara, cacatua, amazona, ninfa. E como maximizar a longevidade.',
    h1: 'Esperança de Vida dos Papagaios — Por Espécie',
    excerpt: 'Quanto tempo vivem os papagaios? Guia completo de longevidade por espécie e conselhos para maximizar a saúde ao longo dos anos.',
    content: `<p>Uma das primeiras perguntas que qualquer pessoa deve fazer antes de adquirir um papagaio é: <strong>quanto tempo viverá esta ave?</strong> A resposta pode surpreender — algumas espécies podem outlive os seus donos.</p>

<h2>Esperança de Vida por Espécie</h2>
<table class="spec-table">
<tr><th>Espécie</th><th>Esperança de Vida (cativeiro)</th><th>Recorde Documentado</th></tr>
<tr><td>Arara Azul-e-Amarela</td><td>50–60 anos</td><td>+70 anos</td></tr>
<tr><td>Arara Escarlate</td><td>40–75 anos</td><td>+80 anos</td></tr>
<tr><td>Papagaio Cinzento Africano</td><td>50–80 anos</td><td>+90 anos</td></tr>
<tr><td>Cacatua de Eleonora</td><td>40–60 anos</td><td>+80 anos</td></tr>
<tr><td>Amazona</td><td>40–70 anos</td><td>+90 anos</td></tr>
<tr><td>Eclectus</td><td>30–50 anos</td><td>+60 anos</td></tr>
<tr><td>Ninfa Carolina</td><td>15–25 anos</td><td>+32 anos</td></tr>
<tr><td>Periquito Australiano</td><td>8–15 anos</td><td>+20 anos</td></tr>
</table>

<h2>O Que Determina a Longevidade</h2>
<p>Cinco factores principais determinam se o seu papagaio atinge o topo do seu potencial de longevidade:</p>
<ol>
<li><strong>Alimentação adequada</strong> — a causa mais comum de morte prematura é dieta deficiente</li>
<li><strong>Cuidados veterinários preventivos</strong> — consulta anual mínima, diagnóstico precoce</li>
<li><strong>Estabilidade emocional</strong> — stress crónico encurta significativamente a vida</li>
<li><strong>Alojamento correcto</strong> — temperatura, ventilação, espaço adequado</li>
<li><strong>Estimulação mental</strong> — papagaios que se entediam degeneram mais rapidamente</li>
</ol>

<h2>Planear para a Longevidade da Ave</h2>
<p>Se adquirir um cinzento africano hoje, a probabilidade é de que essa ave sobreviva a si. Isto é uma responsabilidade que deve ser planeada:</p>
<ul>
<li>Considere nomear um tutor para a ave no seu testamento</li>
<li>Crie uma reserva financeira dedicada aos cuidados da ave</li>
<li>Certifique-se que a ave está socializada com mais do que uma pessoa</li>
<li>Registe a ave junto de associações avícolas locais que possam apoiar em caso de necessidade</li>
</ul>

<div class="callout">
<p><strong>Reflexão:</strong> Quando adoptar um papagaio cinzento africano ou uma arara, está essencialmente a tomar a decisão por alguém que ainda não existe — os seus filhos ou netos podem herdar a ave. Isto não é razão para não adoptar, mas é razão para planear responsavelmente.</p>
</div>`
  },
  {
    slug: 'doencas-comuns-papagaios',
    title: 'Doenças Comuns em Papagaios: Sintomas e Prevenção',
    metaDesc: 'Guia de doenças comuns em papagaios — sintomas, causas e prevenção. Psitacose, PBFD, aspergilose e outras doenças frequentes em Portugal.',
    h1: 'Doenças Comuns em Papagaios — Guia de Saúde',
    excerpt: 'Conheça as doenças mais frequentes em papagaios, os seus sintomas e como preveni-las.',
    content: `<p>Os papagaios são aves que escondem bem a doença — é um mecanismo de defesa evolutivo (aves doentes são vulneráveis a predadores). Por isso, quando os sintomas se tornam visíveis, a doença pode já estar avançada. Conhecer os sinais de alarme é essencial.</p>

<h2>Sinais Gerais de Alerta</h2>
<p>Leve o seu papagaio ao veterinário imediatamente se observar:</p>
<ul>
<li>Letargia persistente, olhos semicerrados</li>
<li>Plumas eriçadas durante longos períodos</li>
<li>Perda de peso visível (osso do esterno em relevo)</li>
<li>Alterações nas fezes (cor, consistência, volume)</li>
<li>Dificuldade respiratória (cauda a mover ao respirar)</li>
<li>Secreções nasais ou oculares</li>
<li>Automutilação das penas</li>
</ul>

<h2>Doenças Mais Comuns em Portugal</h2>

<h3>Psitacose (Clamidiose)</h3>
<p>Causada por <em>Chlamydia psittaci</em>, é transmissível a humanos (zoonose). Sintomas: secreções oculares/nasais, letargia, diarreia esverdeada. Tratamento: antibioticoterapia prolongada (doxiciclina). Prevenção: quarentena de aves novas, higiene.</p>

<h3>PBFD — Doença do Bico e Penas</h3>
<p>Vírus (Beak and Feather Disease Virus) que destrói as penas e o bico progressivamente. Sem cura conhecida. Prevenção: teste obrigatório antes de adquirir qualquer nova ave. Não existe vacina.</p>

<h3>Aspergilose</h3>
<p>Infecção fúngica do sistema respiratório, causada por <em>Aspergillus</em> spp. Comum em aves imunodeprimidas ou em ambientes húmidos mal ventilados. Tratamento: antifúngicos prolongados. Prevenção: boa ventilação, evitar substâncias de nidificação húmidas.</p>

<h3>Proventricular Dilatation Disease (PDD)</h3>
<p>Doença neurológica causada por Avian Bornavirus. Afecta o sistema digestivo e nervoso. Sintomas: regurgitação, perda de peso progressiva, fezes com sementes não digeridas. Tratamento de suporte apenas.</p>

<h3>Automutilação das Penas</h3>
<p>Não é uma doença em si, mas um sinal. Causas: aborrecimento, stress, carência nutricional, alergia, infecção. Requer investigação veterinária completa para identificar a causa subjacente.</p>

<h2>Prevenção — Rotinas Essenciais</h2>
<ul>
<li>Consulta veterinária anual com especialista em aves</li>
<li>Quarentena de 30 dias para qualquer nova ave</li>
<li>Higiene regular da jaula e acessórios</li>
<li>Água fresca diariamente</li>
<li>Alimentação variada e de qualidade</li>
<li>Redução do stress (rotina estável, estimulação adequada)</li>
</ul>

<div class="callout">
<p><strong>Veterinário especializado:</strong> Não leve o seu papagaio a um veterinário generalista sem experiência em aves. A fisiologia dos psitacídeos é muito específica. Procure sempre um veterinário com formação em medicina de aves exóticas.</p>
</div>`
  },
  {
    slug: 'primeiros-dias-papagaio-em-casa',
    title: 'Os Primeiros Dias com um Papagaio em Casa',
    metaDesc: 'Guia prático para os primeiros dias com um papagaio novo em casa. Como preparar o espaço, o que esperar e como facilitar a adaptação da ave.',
    h1: 'Os Primeiros Dias com um Papagaio em Casa',
    excerpt: 'Como preparar a chegada do seu novo papagaio e facilitar a sua adaptação ao novo lar.',
    content: `<p>Os primeiros dias de um papagaio num novo lar são críticos. A ave acabou de passar por uma experiência stressante — mudança de ambiente, novo lar, pessoas desconhecidas. O que fizer nas primeiras semanas define muito do comportamento futuro da ave.</p>

<h2>Antes da Chegada — Preparação</h2>
<p>Prepare o espaço antes da chegada da ave:</p>
<ul>
<li>A jaula deve estar montada, limpa e equipada com poleiros, comedouros e bebedouros</li>
<li>Escolha um local tranquilo, sem correntes de ar e com luz natural (sem sol directo intenso)</li>
<li>Afaste plantas tóxicas do espaço de voo livre</li>
<li>Identifique o seu veterinário de aves exóticas de referência</li>
<li>Tenha comida adequada preparada (pergunte ao criador o que a ave estava a comer)</li>
</ul>

<h2>Dias 1–3: Deixar a Ave Adaptar-se</h2>
<p>Resistência à tentação de tocar e interagir imediatamente. A ave precisa de:</p>
<ul>
<li>Explorar a jaula ao seu ritmo</li>
<li>Observar o ambiente com segurança</li>
<li>Habituar-se aos sons e rotinas da casa</li>
</ul>
<p>Fale suavemente perto da jaula. Mova-se com calma. Não force o contacto. Apresente petiscos especiais através das grades para criar associações positivas.</p>

<h2>Dias 4–14: Primeiros Contactos</h2>
<p>Quando a ave comer normalmente e não fugir para o fundo da jaula quando se aproxima, pode começar a tentar o contacto manual:</p>
<ul>
<li>Apresente a mão lentamente, com um petisco</li>
<li>Se recuar, não insista — recue e tente amanhã</li>
<li>Sessões de 10–15 minutos, várias vezes ao dia</li>
<li>Celebre qualquer pequeno progresso com reforço verbal positivo</li>
</ul>

<h2>Consulta Veterinária</h2>
<p>Agende uma consulta de boas-vindas nos primeiros 5–7 dias. O veterinário fará uma avaliação de saúde geral e estabelece a linha de base de saúde da ave. É também a oportunidade para fazer os testes de rastreio recomendados (PBFD, psitacose).</p>

<h2>Mudança de Dieta</h2>
<p>Não mude a dieta abruptamente. Se o criador deu pellets X, continue com pellets X durante pelo menos 2 semanas, introduzindo gradualmente a dieta que pretende estabelecer. Mudanças bruscas de dieta somadas ao stress da mudança de ambiente podem causar problemas digestivos.</p>

<div class="callout">
<p><strong>Paciência é a chave:</strong> Alguns papagaios adaptam-se em dias; outros levam semanas ou meses. Não compare o seu papagaio com outros. Respeite o ritmo da ave e construa a relação de confiança tijollo a tijolo — dará os seus frutos.</p>
</div>`
  },
  // Posts 11-30
  { slug: 'papagaio-cinzento-cuidados', title: 'Cuidados do Papagaio Cinzento Africano: Guia Completo', metaDesc: 'Guia completo de cuidados do papagaio cinzento africano (yaco). Alimentação, jaula, saúde, socialização e enriquecimento ambiental.', h1: 'Cuidados do Papagaio Cinzento Africano', excerpt: 'Tudo o que precisa de saber para cuidar correctamente de um papagaio cinzento africano em Portugal.', content: `<p>O papagaio cinzento africano (<em>Psittacus erithacus</em>) é considerado a espécie de psitacídeo mais inteligente do mundo. Com uma inteligência comparável à de um primata e uma sensibilidade emocional extraordinária, exige cuidados específicos e atenção constante.</p><h2>Alojamento</h2><p>A jaula mínima recomendada é 90×90×120 cm com barras de aço inoxidável. O espaçamento entre barras deve ser de 2,5 cm para evitar que o bico fique preso. Inclua pelo menos 3 poleiros de madeiras diferentes (eucalipto, salgueiro, bétula) para saúde das patas.</p><h2>Alimentação Diária</h2><ul><li>Pellets de qualidade (60% da dieta)</li><li>Frutas frescas variadas (20%)</li><li>Legumes frescos (15%)</li><li>Sementes e nozes (5%)</li></ul><h2>Necessidades Sociais</h2><p>O cinzento africano é uma espécie altamente social que forma vínculos profundos. Necessita de mínimo 3–4 horas de interação humana diária. A solidão crónica causa stress severo, automutilação e problemas psicológicos graves. Se trabalha longas horas fora de casa, considere ter um par de aves.</p><h2>Enriquecimento Ambiental</h2><ul><li>Brinquedos destrutíveis rotativos (rodízie semanalmente)</li><li>Puzzles de alimentação — esconder comida em brinquedos foraging</li><li>Interação vocal — fale com a ave, ensine palavras, cante</li><li>Tempo fora da jaula em zona segura e supervisionada</li></ul><div class="callout"><p><strong>Atenção ao stress:</strong> O cinzento africano esconde muito bem a doença mas não esconde o stress emocional. Penas eriçadas crónicas, recusa de comer, agressividade repentina — estes são sinais de que algo não está bem. Investigue sempre a causa.</p></div>` },
  { slug: 'arara-jacinto-caracteristicas', title: 'Arara Jacinto: O Gigante Gentil dos Papagaios', metaDesc: 'Conheça a arara jacinto — a maior arara do mundo. Características, cuidados, alimentação e onde comprar legalmente em Portugal.', h1: 'Arara Jacinto — O Maior Papagaio do Mundo', excerpt: 'A arara jacinto é a maior arara do mundo — azul cobalto e irresistível. Conheça tudo sobre esta espécie extraordinária.', content: `<p>A <strong>arara jacinto</strong> (<em>Anodorhynchus hyacinthinus</em>) é a maior espécie de papagaio do mundo — e possivelmente a mais bela. Com um azul cobalto que parece luminescente e um temperamento surpreendentemente dócil para o seu tamanho, é conhecida como o "gigante gentil" dos psitacídeos.</p><h2>Características</h2><table class="spec-table"><tr><th>Característica</th><th>Detalhe</th></tr><tr><td>Comprimento</td><td>100 cm (o maior de todos os papagaios)</td></tr><tr><td>Peso</td><td>1,5–1,7 kg</td></tr><tr><td>Esperança de vida</td><td>50–60 anos em cativeiro</td></tr><tr><td>Status CITES</td><td>Apêndice I (criticamente ameaçado na natureza)</td></tr><tr><td>Temperamento</td><td>Gentil, afectuoso, brincalhão</td></tr></table><h2>Alimentação Específica</h2><p>A arara jacinto tem uma dieta muito específica — ao contrário das outras araras, depende fortemente de cocos e palmeiras na natureza. Em cativeiro:</p><ul><li>Nozes de macadâmia (ESSENCIAL — fonte de gorduras específicas)</li><li>Nozes de coco e noz-de-brasil</li><li>Frutas tropicais: manga, papaia, maracujá</li><li>Vegetais: cenoura, brócolo, pimento</li><li>Pellets de qualidade (mas com menos ênfase que outras espécies)</li></ul><h2>Exigências de Espaço</h2><p>A arara jacinto necessita de uma jaula de dimensões muito superiores às outras espécies: mínimo 1,8 × 1,2 × 2 m, construída em aço de alta resistência. O seu bico pode partir aço de qualidade inferior. Não é uma ave para apartamentos.</p><div class="callout"><p><strong>Espécie rara e preciosa:</strong> A arara jacinto está criticamente ameaçada na natureza. Cada exemplar em cativeiro é potencialmente um embaixador da espécie. A responsabilidade de possuir uma destas aves é imensa — tanto ética como legalmente.</p></div>` },
  { slug: 'periquito-mascota-guia', title: 'O Periquito como Animal de Companhia: Guia Completo', metaDesc: 'Guia completo sobre o periquito australiano como animal de companhia. Cuidados, alimentação, socialização e onde comprar em Portugal.', h1: 'O Periquito Australiano como Animal de Companhia', excerpt: 'O periquito australiano é o papagaio mais popular do mundo. Pequeno, económico e sociável — o ponto de entrada perfeito.', content: `<p>O <strong>periquito australiano</strong> (<em>Melopsittacus undulatus</em>) é o papagaio mais popular do mundo, e por boas razões. Pequeno, adaptável, sociável e economicamente acessível, é o ponto de entrada ideal para quem quer descobrir o mundo dos papagaios sem grande investimento inicial.</p><h2>Porquê Começar com um Periquito?</h2><ul><li>Custo de aquisição baixo</li><li>Manutenção económica</li><li>Esperança de vida razoável: 8–15 anos</li><li>Pode aprender algumas palavras</li><li>Ideal para aprender a linguagem corporal de psitacídeos</li><li>Boa escolha para famílias com crianças pequenas</li></ul><h2>Necessidades Básicas</h2><p>O periquito é uma ave relativamente fácil de cuidar, mas tem necessidades que não devem ser ignoradas:</p><ul><li>Jaula mínima: 60×40×50 cm para um casal</li><li>Alimentação: mistura de sementes + pellets + legumes frescos</li><li>Companhia: os periquitos são aves de bando — evite ter apenas um</li><li>Veterinário: consulta anual recomendada</li></ul><h2>O Periquito Fala?</h2><p>Alguns periquitos machos podem desenvolver um vocabulário surpreendentemente extenso — há registos de periquitos com mais de 1000 palavras. No entanto, a maioria aprende apenas algumas palavras ou sons. A fala não é garantida e não deve ser a principal motivação para adquirir um.</p>` },
  { slug: 'cacatua-ninfa-carolina-guia', title: 'Ninfa Carolina: A Cacatua Ideal para Iniciantes', metaDesc: 'Guia completo sobre a ninfa carolina (cockatiel). Cuidados, temperamento, alimentação e por que é a melhor cacatua para iniciantes em Portugal.', h1: 'Ninfa Carolina — A Cacatua Perfeita para Iniciantes', excerpt: 'A ninfa carolina combina a doçura das cacatuas com um tamanho manejável. Descubra tudo sobre esta espécie encantadora.', content: `<p>A <strong>ninfa carolina</strong> (<em>Nymphicus hollandicus</em>), também conhecida como cockatiel, é uma das aves de companhia mais populares do mundo — e merecidamente. É pequena, dócil, afectuosa e surpreendentemente expressiva para o seu tamanho. É a cacatua por excelência para iniciantes.</p><h2>Características da Ninfa Carolina</h2><table class="spec-table"><tr><th>Característica</th><th>Detalhe</th></tr><tr><td>Tamanho</td><td>30–33 cm, 70–120 g</td></tr><tr><td>Esperança de vida</td><td>15–25 anos</td></tr><tr><td>Temperamento</td><td>Dócil, afectuosa, expressiva</td></tr><tr><td>Nível de ruído</td><td>Moderado (menos que cacatuas grandes)</td></tr><tr><td>Fala</td><td>Algumas palavras; melhor a assobiar</td></tr></table><h2>Crista — O Termómetro Emocional</h2><p>A crista da ninfa é um excelente indicador do estado emocional da ave:</p><ul><li>Crista erguida e aberta → curiosidade, excitação positiva</li><li>Crista em 45 graus → relaxada e contente</li><li>Crista completamente baixa, quase plana → medo ou agressão</li><li>Crista a tremer → muito excitada</li></ul><h2>Alimentação</h2><ul><li>Mistura de sementes específica para ninfas (40%)</li><li>Pellets de qualidade (30%)</li><li>Legumes frescos: cenoura, brócolo, milho (20%)</li><li>Frutas frescas com moderação (10%)</li></ul>` },
  { slug: 'papagaio-amazona-mascota', title: 'A Amazona como Animal de Companhia: Guia Completo', metaDesc: 'Guia completo sobre a amazona como animal de companhia. Temperamento, cuidados, alimentação e como lidar com a fase hormonal.', h1: 'A Amazona como Animal de Companhia', excerpt: 'Extrovertida, vocal e cheia de personalidade — a amazona é a ave perfeita para quem quer uma companheira activa.', content: `<p>A <strong>amazona</strong> é a "diva" do mundo dos papagaios. Extrovertida, vocal, com uma personalidade que nunca passa despercebida, é a escolha perfeita para quem quer uma ave que realmente se faça notar. Com a devida preparação, é uma excelente companheira para décadas.</p><h2>Personalidade da Amazona</h2><p>Cada amazona tem uma personalidade distinta e marcada. São aves curiosas, brincalhonas e que adoram ser o centro das atenções. Ao contrário do cinzento africano, que é mais reservado, a amazona faz questão de comunicar — vocal e fisicamente.</p><h2>A Fase Hormonal</h2><p>Entre os 5 e os 12 anos, a maioria das amazonas passa por uma fase hormonal intensa durante a época de reprodução (primavera). Nesta fase podem tornar-se mais territoriais, imprevisíveis e até agressivas com adultos do sexo masculino (especialmente). Este comportamento é temporário mas requer gestão adequada.</p><ul><li>Reduza a luz diária para 10–12 horas (simula dias de inverno)</li><li>Evite caixas ou espaços que possam estimular comportamento de nidificação</li><li>Mantenha a rotina estável</li><li>Consulte o veterinário se o comportamento for muito intenso</li></ul><h2>Capacidade Vocal</h2><p>As amazonas estão entre as melhores a imitar a voz humana. Muitos exemplares desenvolvem um repertório impressionante de palavras, frases e canções. A sua voz tende a ser mais clara e musical que a do cinzento africano.</p>` },
  { slug: 'jaula-ideal-papagaio', title: 'Como Escolher a Jaula Ideal para o Seu Papagaio', metaDesc: 'Guia para escolher a jaula certa para o seu papagaio. Dimensões por espécie, materiais seguros, acessórios essenciais e onde posicionar a jaula.', h1: 'Como Escolher a Jaula Ideal para o Seu Papagaio', excerpt: 'A jaula certa é fundamental para o bem-estar do seu papagaio. Guia completo de dimensões, materiais e acessórios.', content: `<p>A jaula é o lar do seu papagaio — o espaço onde passa a maior parte do tempo quando não está a interagir consigo. Uma jaula inadequada causa stress, doenças ortopédicas e comportamentos problemáticos. Investir numa boa jaula é investir no bem-estar a longo prazo da ave.</p><h2>Dimensões Mínimas por Espécie</h2><table class="spec-table"><tr><th>Espécie</th><th>Mínimo Recomendado (L×P×A)</th></tr><tr><td>Periquito australiano</td><td>60×40×50 cm</td></tr><tr><td>Ninfa carolina</td><td>70×55×80 cm</td></tr><tr><td>Amazona média</td><td>90×75×100 cm</td></tr><tr><td>Cinzento africano</td><td>90×90×120 cm</td></tr><tr><td>Cacatua grande</td><td>100×80×150 cm</td></tr><tr><td>Arara grande</td><td>150×100×180 cm</td></tr></table><h2>Materiais Seguros</h2><ul><li><strong>Aço inoxidável</strong> — o melhor. Resistente, lavável, não tóxico</li><li><strong>Aço galvanizado de qualidade</strong> — aceitável, verificar ausência de zinco em excesso</li><li><strong>Evitar:</strong> zinco, chumbo, cobre (tóxicos), madeira pintada com tintas tóxicas</li></ul><h2>Poleiros</h2><p>Poleiros variados são essenciais para a saúde das patas:</p><ul><li>Pelo menos 3 poleiros de diâmetros diferentes</li><li>Madeiras naturais: eucalipto, salgueiro, bétula (sem tratamento químico)</li><li>Evitar poleiros de lixa (lesam as patas a longo prazo)</li><li>Poleiros de corda (natural, sem corantes) para variar a textura</li></ul><h2>Posicionamento da Jaula</h2><ul><li>Colocar num canto — a ave sente-se mais segura com as costas protegidas</li><li>Ao nível dos olhos humanos ou ligeiramente abaixo</li><li>Longe de janelas com sol directo intenso</li><li>Longe de correntes de ar (janelas, ar condicionado, ventoinha)</li><li>Longe da cozinha — vapores de teflon e fumo são mortais para aves</li></ul>` },
  { slug: 'banhar-papagaio', title: 'Como Dar Banho ao Papagaio: Guia Passo a Passo', metaDesc: 'Como dar banho ao seu papagaio correctamente. Temperatura da água, frequência, métodos e como habituar uma ave que tem medo de água.', h1: 'Como Dar Banho ao Papagaio', excerpt: 'O banho é essencial para a saúde das penas e pele do papagaio. Guia completo com os melhores métodos.', content: `<p>O banho regular é fundamental para a saúde do seu papagaio. Mantém as penas limpas e em bom estado, hidrata a pele, facilita a muda de penas e é uma forma de enriquecimento ambiental que muitas aves adoram.</p><h2>Com Que Frequência Banhá-lo?</h2><p>A frequência ideal depende da espécie e das preferências individuais da ave:</p><ul><li>2–3 vezes por semana é o ideal para a maioria das espécies</li><li>Em Portugal, no verão quente (especialmente no Alentejo e Algarve), pode aumentar para diário</li><li>No inverno, reduzir se a habitação for fria (verificar que a ave seca antes de ir para a jaula)</li></ul><h2>Métodos de Banho</h2><h3>Spray / Pulverizador</h3><p>O método mais controlado. Use um pulverizador limpo com água morna (não fria, não quente). Pulverize de cima para baixo, imitando a chuva. Comece com jatos suaves se a ave não estiver habituada.</p><h3>Bacia de Banho</h3><p>Coloque uma bacia rasa (3–5 cm de água) na jaula ou fora dela. Algumas aves adoram banhar-se sozinhas. Água à temperatura ambiente é ideal.</p><h3>Duche</h3><p>Muitas aves, especialmente araras e amazonas, adoram duche. Pode colocar um poleiro no duche e deixar a ave desfrutar do vapor e água morna — sem sabão, nunca.</p><h2>O Que Usar na Água?</h2><p>Apenas água — nunca use sabões, champôs ou qualquer produto na água do banho. Alguns donos adicionam aloé vera puro (sem álcool, sem conservantes) para hidratar as penas, mas água limpa é suficiente.</p><h2>Habituar uma Ave com Medo de Água</h2><ol><li>Comece com um spray muito suave à distância</li><li>Associe o banho a algo positivo (petisco depois)</li><li>Nunca force — termine sempre a sessão de forma positiva</li><li>A persistência gentil ao longo de semanas resulta</li></ol>` },
  { slug: 'papagaio-bebe-alimentacao', title: 'Como Alimentar um Papagaio Bebé: Papinha e Desmame', metaDesc: 'Guia completo de alimentação de papagaio bebé. Como preparar a papinha, frequência de alimentação e como fazer o desmame gradual.', h1: 'Como Alimentar um Papagaio Bebé', excerpt: 'Guia de alimentação de papagaios bebés — papinha, frequência e desmame correcto para cada espécie.', content: `<p>A alimentação de um papagaio bebé (ainda não desmamado) é uma responsabilidade que não deve ser subestimada. Papagaios muito jovens que chegam a novas casas antes de completamente desmamados necessitam de cuidados intensivos que imitam os do criador.</p><div class="callout"><p><strong>Recomendação:</strong> Sempre que possível, adquira o papagaio completamente desmamado (a comer sozinho). A criação manual de bebés muito novos é um trabalho de especialista. Se o criador entrega a ave antes do desmame completo, assegure-se de ter formação adequada ou apoio veterinário.</p></div><h2>Papinha para Papagaios Bebés</h2><p>A papinha deve ser preparada com produtos específicos para psitacídeos:</p><ul><li>Kaytee Exact (muito usada em Portugal)</li><li>Zupreem Embrace Plus</li><li>Roudybush Squab Diet</li></ul><p>Misture com água quente a 40–42 °C. A consistência deve ser cremosa — nem demasiado líquida (risco de aspiração) nem demasiado espessa (difícil de engolir).</p><h2>Frequência de Alimentação por Idade</h2><table class="spec-table"><tr><th>Idade (semanas)</th><th>Frequência</th><th>Quantidade por Refeição</th></tr><tr><td>1–2 semanas</td><td>A cada 2h (24h)</td><td>1–3 ml</td></tr><tr><td>3–4 semanas</td><td>4–5x por dia</td><td>5–15 ml</td></tr><tr><td>5–7 semanas</td><td>3–4x por dia</td><td>15–25 ml</td></tr><tr><td>8–10 semanas</td><td>2–3x por dia</td><td>Desmame gradual</td></tr></table><h2>Processo de Desmame</h2><p>O desmame é gradual — nunca abrupto. A partir das 8–10 semanas (dependendo da espécie), comece a oferecer alimentos sólidos ao lado da papinha. Retire progressivamente uma refeição de papinha por semana, observando que a ave está a comer os sólidos em quantidade suficiente.</p>` },
  { slug: 'mordidas-papagaio-como-resolver', title: 'O Papagaio Morde: Causas e Como Resolver', metaDesc: 'O seu papagaio morde? Guia completo sobre as causas das mordidelas e técnicas baseadas em reforço positivo para reduzir este comportamento.', h1: 'O Papagaio Morde — Causas e Soluções', excerpt: 'Por que o papagaio morde e como resolver este comportamento com técnicas de reforço positivo.', content: `<p>Um papagaio que morde é uma fonte de stress para toda a família — e para a própria ave, que certamente não está feliz. A boa notícia: as mordidelas têm sempre uma causa, e identificar a causa é o primeiro passo para a solução.</p><h2>Por Que os Papagaios Mordem?</h2><ul><li><strong>Medo</strong> — a causa mais comum, especialmente em aves novas ou mal socializadas</li><li><strong>Sobre-estimulação</strong> — a ave ficou demasiado excitada durante o contacto</li><li><strong>Dor</strong> — a ave está com dor e reage ao toque</li><li><strong>Hormonal</strong> — época de reprodução (especialmente amazonas e cacatuas)</li><li><strong>Territorial</strong> — defesa da jaula ou do dono</li><li><strong>Comunicação</strong> — a ave está a tentar dizer "chega, quero parar"</li></ul><h2>Leia a Linguagem Corporal Antes</h2><p>Os papagaios raramente mordem sem aviso. Os sinais de aviso incluem:</p><ul><li>Dilatação da pupila (os olhos parecem "piscar")</li><li>Penas eriçadas no pescoço e cabeça</li><li>Balançar levemente o corpo</li><li>Bater o bico</li><li>Virar de costas</li></ul><p>Quando vir estes sinais, recue calmamente e dê espaço à ave.</p><h2>Como Reagir Quando Morde</h2><ul><li>Não grite — o papagaio interpreta como atenção</li><li>Não puna fisicamente — destrói a confiança</li><li>Reaja de forma neutra — um suave "não" e afaste a ave</li><li>Termine a sessão calmamente</li></ul><h2>Técnicas Preventivas</h2><ul><li>Aprenda a reconhecer os sinais de aviso individuais da sua ave</li><li>Respeite os momentos em que a ave não quer ser tocada</li><li>Sessões curtas que terminem sempre antes de a ave ficar sobre-estimulada</li><li>Reforço positivo — recompense o comportamento calmo e cooperativo</li></ul>` },
  { slug: 'papagaio-falar-como-ensinar', title: 'Como Ensinar um Papagaio a Falar: Guia Eficaz', metaDesc: 'Técnicas eficazes para ensinar o seu papagaio a falar. As melhores espécies para falar, quando começar e como maximizar o vocabulário.', h1: 'Como Ensinar o Papagaio a Falar', excerpt: 'Técnicas comprovadas para ensinar o seu papagaio a falar, com as espécies mais talentosas e métodos eficazes.', content: `<p>Ensinar um papagaio a falar é uma das experiências mais gratificantes que um dono pode ter. Ouvir a sua ave dizer o seu nome, pedir comida ou comentar o que se passa em casa cria uma ligação única. Mas nem todas as aves aprendem, e nem todas aprendem ao mesmo ritmo.</p><h2>Espécies com Melhor Capacidade de Fala</h2><table class="spec-table"><tr><th>Espécie</th><th>Capacidade de Fala</th><th>Observações</th></tr><tr><td>Papagaio Cinzento Africano</td><td>⭐⭐⭐⭐⭐</td><td>Melhor do mundo — compreensão contextual</td></tr><tr><td>Amazona</td><td>⭐⭐⭐⭐</td><td>Voz musical, excelente imitação</td></tr><tr><td>Arara Azul-e-Amarela</td><td>⭐⭐⭐</td><td>Aprende bastante, voz grossa</td></tr><tr><td>Eclectus</td><td>⭐⭐⭐</td><td>Boa capacidade, voz clara</td></tr><tr><td>Ninfa Carolina</td><td>⭐⭐</td><td>Algumas palavras; melhor a assobiar</td></tr><tr><td>Cacatua</td><td>⭐⭐</td><td>Limitada, mas aprende sons e frases curtas</td></tr></table><h2>Técnicas Eficazes</h2><h3>Associação Contextual</h3><p>A técnica mais eficaz: diga a palavra no contexto correcto repetidamente. "Bom dia" todas as manhãs, "boa noite" ao cobrir a jaula, o nome da comida ao oferecê-la. O papagaio aprende o significado, não apenas o som.</p><h3>Repetição com Entusiasmo</h3><p>Os papagaios respondem melhor a vozes expressivas e entusiastas. Uma voz monótona é menos estimulante. Exagere ligeiramente a entoação.</p><h3>Recompensa Imediata</h3><p>Quando a ave tentar reproduzir uma palavra (mesmo que imperfeita), recompense imediatamente com um petisco e elogio verbal efusivo. O entusiasmo reforça o comportamento.</p><h2>Com Que Idade Começar?</h2><p>Quanto mais cedo melhor — aves jovens aprendem mais facilmente. No entanto, papagaios adultos também aprendem. A paciência é a chave.</p>` },
  { slug: 'papagaio-stress-como-reduzir', title: 'Como Reduzir o Stress no Papagaio: Sinais e Soluções', metaDesc: 'Como identificar e reduzir o stress no seu papagaio. Sinais de stress, causas mais comuns e estratégias de enriquecimento ambiental.', h1: 'Como Identificar e Reduzir o Stress no Papagaio', excerpt: 'Guia de identificação e redução do stress em papagaios — sinais de alarme, causas e soluções.', content: `<p>O stress é um dos maiores inimigos do bem-estar do papagaio. Ao contrário dos mamíferos, os papagaios escondem bem a doença física mas externalizam claramente o stress emocional. Saber reconhecer os sinais e agir preventivamente é fundamental.</p><h2>Sinais de Stress</h2><ul><li>Automutilação das penas (arrancar as suas próprias penas)</li><li>Comportamentos estereotipados (balançar ritmicamente, andar em círculos)</li><li>Agressividade repentina e injustificada</li><li>Recusa de comer ou beber</li><li>Vocalização excessiva e persistente</li><li>Penas eriçadas por longos períodos sem causa aparente</li></ul><h2>Causas Mais Comuns de Stress</h2><ul><li><strong>Solidão:</strong> deixar a ave sozinha por muitas horas</li><li><strong>Ambiente instável:</strong> mudanças frequentes de rotina, pessoas novas, barulho excessivo</li><li><strong>Alojamento inadequado:</strong> jaula pequena, mal posicionada</li><li><strong>Dieta deficiente:</strong> carências nutricionais causam stress metabólico</li><li><strong>Falta de enriquecimento:</strong> tédio crónico</li><li><strong>Doença não diagnosticada:</strong> dor crónica causa stress</li></ul><h2>Estratégias de Redução de Stress</h2><h3>Enriquecimento Ambiental</h3><ul><li>Roteie os brinquedos semanalmente — novidade é estimulante</li><li>Introduza puzzles de alimentação (foraging)</li><li>Deixe a ave explorar espaços seguros fora da jaula</li><li>Música suave em background nas horas de ausência</li></ul><h3>Rotina Estável</h3><p>Os papagaios prosperam com previsibilidade. Hora de acordar, alimentação, interação e dormir — mantenha horários consistentes. Alterações bruscas de rotina são stressantes.</p><h3>Companhia Adequada</h3><p>Se trabalha muitas horas fora de casa, considere um par de papagaios compatíveis. A companhia de outro indivíduo da mesma espécie é frequentemente a solução mais eficaz para a solidão.</p>` },
  { slug: 'papagaio-e-criancas-seguranca', title: 'Papagaios e Crianças: Guia de Segurança e Convivência', metaDesc: 'Como garantir uma convivência segura entre papagaios e crianças. Regras de segurança, espécies recomendadas e como educar a criança para respeitar a ave.', h1: 'Papagaios e Crianças — Segurança e Convivência', excerpt: 'Guia completo para garantir uma convivência segura e enriquecedora entre papagaios e crianças.', content: `<p>A relação entre um papagaio e uma criança pode ser mágica — ou perigosa. Tudo depende da espécie escolhida, da supervisão dos adultos e da educação que a criança recebe sobre como interagir com a ave.</p><h2>Espécies Mais Adequadas para Famílias com Crianças</h2><ul><li><strong>Ninfa carolina</strong> — Ideal. Pequena, dócil, raramente morde com força.</li><li><strong>Amazona</strong> — Boa. Robusta e social. Supervisão com menores de 6 anos.</li><li><strong>Arara azul-e-amarela</strong> — Para crianças mais velhas (8+). Gentil mas grande.</li></ul><h2>Espécies a Evitar com Crianças Pequenas</h2><ul><li>Cacatua grande — bico poderoso</li><li>Cinzento africano — muito sensível ao caos e ao ruído</li><li>Arara escarlate — temperamento mais imprevisível</li></ul><h2>Regras de Segurança Fundamentais</h2><ul><li>Nunca deixe crianças sozinhas com um papagaio sem supervisão de adulto</li><li>Ensine: a ave não é um brinquedo, é um ser vivo com sentimentos</li><li>Movimentos lentos e voz suave perto da ave</li><li>Nunca aproximar o rosto do bico</li><li>Respeitar quando a ave sinaliza que não quer contacto</li><li>A jaula é o "quarto" da ave — não se enfia a mão sem convite</li></ul><h2>Benefícios Educativos</h2><p>Uma criança que cresce com um papagaio aprende responsabilidade, empatia e respeito pelos ritmos e necessidades de outro ser. São lições de vida que nenhuma sala de aula ensina da mesma forma. Com a espécie certa e supervisão adequada, é um dos melhores presentes que pode dar a um filho.</p>` },
  { slug: 'papagaio-adocao-vs-compra', title: 'Adotar vs Comprar um Papagaio: Vantagens e Considerações', metaDesc: 'Adotar ou comprar um papagaio? Vantagens e desvantagens de cada opção, onde adotar em Portugal e quando faz sentido comprar a um criador.', h1: 'Adotar vs Comprar um Papagaio — Qual a Melhor Opção?', excerpt: 'Análise comparativa de adoção versus compra de papagaios, com orientação para ajudá-lo a tomar a decisão certa.', content: `<p>A questão "adotar ou comprar?" é cada vez mais relevante no mundo dos papagaios. A longa esperança de vida dos psitacídeos significa que muitos acabam em centros de adopção por razões variadas — morte do dono, mudança de vida, incompatibilidade. Estas aves precisam de segundas oportunidades.</p><h2>Vantagens de Adotar</h2><ul><li>Salva uma ave que precisa de lar</li><li>Geralmente mais económico que comprar a um criador</li><li>A ave pode já ter vocabulário e comportamentos desenvolvidos</li><li>Os centros de adopção avaliam a compatibilidade</li></ul><h2>Desvantagens de Adotar</h2><ul><li>A história da ave pode ser desconhecida ou traumática</li><li>Podem existir problemas comportamentais que requerem trabalho</li><li>Pode demorar mais a criar vínculo com aves adultas</li><li>Menor disponibilidade de espécies raras</li></ul><h2>Quando Comprar a um Criador</h2><p>Comprar a um criador registado faz sentido quando:</p><ul><li>Quer uma espécie específica com temperamento previsível</li><li>É o seu primeiro papagaio e quer começar com uma ave socializada desde bebé</li><li>Precisa de garantias de saúde e documentação CITES completa</li><li>Quer apoio contínuo do criador após a compra</li></ul><h2>Onde Adotar em Portugal</h2><p>Em Portugal, não existe ainda uma rede organizada de adopção de papagaios como em países como o Reino Unido ou EUA. No entanto, pode encontrar papagaios para adopção em:</p><ul><li>Grupos de Facebook especializados em psitacídeos em Portugal</li><li>Anúncios em sites como OLX (verificar sempre documentação)</li><li>Contactar criadores — por vezes têm aves adultas que precisam de novo lar</li><li>Câmaras Municipais (aves apreendidas podem ser cedidas)</li></ul>` },
  { slug: 'viajar-com-papagaio', title: 'Como Viajar com um Papagaio: Dicas e Regulamentos', metaDesc: 'Como transportar o seu papagaio em viagens. Regulamentos para viajar com aves na UE, transportadoras aéreas e como gerir a ansiedade de viagem.', h1: 'Como Viajar com o Seu Papagaio', excerpt: 'Regulamentos, dicas práticas e cuidados essenciais para viajar com o seu papagaio dentro e fora de Portugal.', content: `<p>Viajar com um papagaio requer planeamento cuidadoso — regulamentos específicos, transportadora aprovada e preparação para o stress da viagem. Com a devida preparação, é possível viajar com a sua ave de forma segura.</p><h2>Viagem de Carro Dentro de Portugal</h2><p>A forma mais simples de viajar com o seu papagaio. Pontos essenciais:</p><ul><li>Use uma transportadora aprovada, bem ventilada e do tamanho certo</li><li>Cubra parcialmente a transportadora para reduzir o stress visual</li><li>Temperatura confortável no carro — sem sol directo na transportadora</li><li>Para viagens longas, paragens a cada 2–3 horas</li><li>Água disponível durante as paragens</li></ul><h2>Viagem de Avião dentro da UE</h2><p>Cada companhia aérea tem regras específicas. A maioria aceita aves pequenas em cabine (transportadora aprovada); aves grandes vão como carga.</p><ul><li>Contacte a companhia aérea com antecedência mínima de 48 horas</li><li>Transporte IATA-aprovado obrigatório</li><li>Guia sanitária e documentação CITES obrigatórias</li><li>Restrições de países de destino — verifique sempre</li></ul><h2>Viagem Internacional (fora da UE)</h2><p>Requer documentação adicional:</p><ul><li>Certificado de exportação CITES</li><li>Certificado sanitário emitido pela autoridade veterinária oficial</li><li>Verificação dos requisitos de importação do país de destino</li><li>Possível quarentena no destino</li></ul><div class="callout"><p><strong>Alternativa à viagem:</strong> Para muitas aves, a melhor solução é deixá-las em casa com um cuidador de confiança. Aves com rotinas estabelecidas podem stressar muito com viagens. Avalie se o benefício para si supera o custo para a ave.</p></div>` },
  { slug: 'papagaio-inverno-portugal', title: 'Cuidados do Papagaio no Inverno Português', metaDesc: 'Como cuidar do seu papagaio no inverno em Portugal. Temperatura, humidade, alimentação sazonal e como proteger a ave do frio e correntes de ar.', h1: 'Cuidados do Papagaio no Inverno em Portugal', excerpt: 'Como proteger e cuidar do seu papagaio durante o inverno português, com atenção às diferenças regionais.', content: `<p>Portugal tem invernos muito variados consoante a região — do Algarve ameno ao Norte frio e húmido. Os papagaios tropicais, habituados a temperaturas estáveis e elevadas, precisam de cuidados específicos durante os meses mais frios.</p><h2>Temperatura Mínima Recomendada</h2><table class="spec-table"><tr><th>Espécie</th><th>Temperatura Mínima</th><th>Risco Abaixo de</th></tr><tr><td>Papagaio Cinzento Africano</td><td>18 °C</td><td>Stress imunológico</td></tr><tr><td>Araras</td><td>15 °C</td><td>Hipotermia</td></tr><tr><td>Amazona</td><td>16 °C</td><td>Doença respiratória</td></tr><tr><td>Eclectus</td><td>20 °C</td><td>Muito sensível ao frio</td></tr><tr><td>Ninfa Carolina</td><td>12 °C</td><td>Stress; idealmente acima de 18°C</td></tr></table><h2>Soluções de Aquecimento</h2><ul><li>Aquecedor cerâmico próximo da jaula (sem exposição directa)</li><li>Lâmpada de calor (não UV) para aves — disponível em lojas especializadas</li><li>Cobrir parcialmente a jaula à noite com cobertor (não bloquear ventilação)</li><li>Evitar aquecimento a gás ou lareira próximos (vapores nocivos)</li></ul><h2>Humidade no Inverno</h2><p>O aquecimento central resseca o ar, o que pode causar problemas respiratórios e de penas. Mantenha humidade relativa entre 50–60%:</p><ul><li>Humidificador no espaço da ave</li><li>Banho mais frequente (2–3x/semana)</li><li>Tigela de água aberta próxima da jaula (evapora naturalmente)</li></ul><h2>Alimentação Sazonal</h2><p>No inverno, as aves gastam mais energia para manter a temperatura corporal. Pode aumentar ligeiramente a proporção de nozes e sementes na dieta (fonte de gorduras saudáveis) mas mantenha o equilíbrio.</p>` },
  { slug: 'reproduzir-papagaios-caseiro', title: 'Reprodução de Papagaios em Casa: Guia para Criadores', metaDesc: 'Guia de reprodução de papagaios para criadores amadores. Condições necessárias, ninho, cuidados dos bebés e legalidade em Portugal.', h1: 'Reprodução de Papagaios em Casa — Guia para Criadores', excerpt: 'Tudo o que precisa de saber sobre a reprodução de papagaios em cativeiro, incluindo aspectos legais em Portugal.', content: `<p>A reprodução de papagaios em cativeiro é um campo fascinante mas exigente. Antes de permitir que o seu casal se reproduza, é fundamental compreender as implicações legais, os requisitos práticos e a responsabilidade de criar bebés papagaios.</p><h2>Aspectos Legais em Portugal</h2><p>A reprodução de espécies CITES em Portugal exige registo como criador:</p><ul><li>Registo no ICNF (Instituto da Conservação da Natureza e das Florestas)</li><li>Instalações inspeccionadas e aprovadas</li><li>Registo de cada exemplar reproduzido</li><li>Emissão de certificados CITES para as crias</li></ul><p>A reprodução sem registo e a venda de crias sem documentação é ilegal, mesmo que o casal tenha documentação CITES.</p><h2>Condições para a Reprodução</h2><ul><li>O casal deve ser geneticamente compatível (não aparentado)</li><li>Ambas as aves devem ter pelo menos 4–5 anos (maturidade sexual)</li><li>Ninho adequado à espécie (caixa de madeira com dimensões específicas)</li><li>Dieta enriquecida com mais proteína durante a época de postura</li><li>Privacidade e estabilidade — perturbações durante a incubação podem levar ao abandono dos ovos</li></ul><h2>Cuidados das Crias</h2><p>Se as aves criarem os seus bebés naturalmente, a intervenção humana deve ser mínima. Se precisar de fazer criação manual (aves que rejeitam as crias), prepare-se para:</p><ul><li>Alimentação a cada 2–3 horas nos primeiros dias</li><li>Temperatura de nursery: 35–37 °C na primeira semana, reduzindo gradualmente</li><li>Registo detalhado de peso e alimentação de cada bebé</li></ul>` }
];

function buildBlogPost(post) {
  const ptUrl = `/pt/blog/${post.slug}/`;
  const canonical = `${BASE}${ptUrl}`;
  const html = `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${gaSnippet()}
  <title>${post.title}</title>
  <meta name="description" content="${post.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="pt-PT" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="pt-PT" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${BASE}/" />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="pt_PT" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.metaDesc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${BASE}/uploaded-macaw.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  ${favicons()}
  ${fonts()}
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.h1,
    "description": post.metaDesc,
    "url": canonical,
    "datePublished": "2026-06-26",
    "dateModified": "2026-06-26",
    "author": { "@type": "Organization", "name": "Paraíso de Aves" },
    "publisher": { "@type": "Organization", "name": "Paraíso de Aves", "url": BASE },
    "inLanguage": "pt-PT",
    "image": `${BASE}/uploaded-macaw.webp`
  })}</script>
  <script type="application/ld+json">${breadcrumbSchema([
    { name: 'Início', url: '/pt/' },
    { name: 'Blog', url: '/pt/blog/' },
    { name: post.h1, url: ptUrl }
  ])}</script>
  ${baseCSS()}
</head>
<body>

${ptNav('/blog')}

<section class="hero">
  <div class="wrap">
    <p class="breadcrumb-nav"><a href="/pt/">Início</a> · <a href="/pt/blog/">Blog</a> · Artigo</p>
    <span class="badge">📝 Blog · paraisodeaves.com</span>
    <h1>${post.h1}</h1>
    <p class="sub">${post.excerpt}</p>
  </div>
</section>

<div class="content">
  <p style="font-size:.82rem;color:var(--muted);margin-bottom:2rem">Por <strong>Paraíso de Aves</strong> · 26 Junho 2026 · Tempo de leitura: 5–8 min</p>

  ${post.content}

  <div class="cta-box">
    <h2>Interessado em Adquirir um Papagaio?</h2>
    <p>Somos um criador registado com mais de 25 anos de experiência. Enviamos para toda Portugal com documentação CITES completa.</p>
    <a href="/pt/papagaios-a-venda-portugal/" class="btn-primary">Ver Aves Disponíveis</a>
    <a href="/pt/contacto/" class="btn-ghost">✉ Contactar</a>
  </div>

  <h2>Artigos Relacionados</h2>
  <div class="article-grid">
    <div class="article-card"><a href="/pt/blog/como-escolher-um-papagaio/"><h3>Como Escolher um Papagaio</h3><p>Guia completo para iniciantes</p></a></div>
    <div class="article-card"><a href="/pt/blog/documentacao-cites-portugal/"><h3>Documentação CITES em Portugal</h3><p>O que precisa de saber legalmente</p></a></div>
    <div class="article-card"><a href="/pt/blog/alimentacao-papagaio-guia-completo/"><h3>Alimentação de Papagaios</h3><p>Guia completo de dieta</p></a></div>
    <div class="article-card"><a href="/pt/blog/primeiros-dias-papagaio-em-casa/"><h3>Os Primeiros Dias em Casa</h3><p>Como facilitar a adaptação</p></a></div>
  </div>
</div>

${ptFooter()}
</body>
</html>`;

  write(`pt/blog/${post.slug}/index.html`, html);
}

// Blog index
function buildBlogIndex() {
  const html = `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${gaSnippet()}
  <title>Blog sobre Papagaios em Português | paraisodeaves</title>
  <meta name="description" content="Blog sobre papagaios em português. ${blogPosts.length} artigos sobre cuidados, alimentação, saúde, treino e espécies de papagaios. Por criadores experientes." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${BASE}/pt/blog/" />
  <link rel="alternate" hreflang="pt-PT" href="${BASE}/pt/blog/" />
  <link rel="alternate" hreflang="x-default" href="${BASE}/blog/" />
  ${favicons()}
  ${fonts()}
  <script type="application/ld+json">${breadcrumbSchema([{ name: 'Início', url: '/pt/' }, { name: 'Blog', url: '/pt/blog/' }])}</script>
  ${baseCSS()}
</head>
<body>
${ptNav('/blog')}
<section class="hero">
  <div class="wrap">
    <p class="breadcrumb-nav"><a href="/pt/">Início</a> · Blog</p>
    <span class="badge">📝 ${blogPosts.length} Artigos em Português</span>
    <h1>Blog sobre Papagaios</h1>
    <p class="sub">Guias práticos, conselhos de especialistas e informação actualizada sobre papagaios e aves exóticas — em português.</p>
  </div>
</section>
<div class="content">
  <p>O nosso blog reúne mais de 25 anos de experiência em criação de papagaios. Aqui encontra artigos sobre todas as espécies que criamos, conselhos de alimentação, saúde, treino e muito mais — tudo em português e adaptado à realidade portuguesa.</p>
  <div class="article-grid">
    ${blogPosts.map(p => `<div class="article-card"><a href="/pt/blog/${p.slug}/"><h3>${p.h1}</h3><p>${p.excerpt}</p></a></div>`).join('\n    ')}
  </div>
</div>
${ptFooter()}
</body>
</html>`;
  write('pt/blog/index.html', html);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────

function buildContactPage() {
  const html = `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${gaSnippet()}
  <title>Contacto | Paraíso de Aves — Criador de Papagaios</title>
  <meta name="description" content="Entre em contacto com a Paraíso de Aves. Criador registado de papagaios com CITES. Respondemos a todas as questões sobre disponibilidade, preços e envios para Portugal." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${BASE}/pt/contacto/" />
  ${hreflang('/#contacto', '/pt/contacto/')}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_PT" />
  <meta property="og:title" content="Contacto | Paraíso de Aves" />
  <meta property="og:url" content="${BASE}/pt/contacto/" />
  <meta property="og:image" content="${BASE}/uploaded-macaw.webp" />
  ${favicons()}
  ${fonts()}
  <script type="application/ld+json">${breadcrumbSchema([{ name: 'Início', url: '/pt/' }, { name: 'Contacto', url: '/pt/contacto/' }])}</script>
  ${baseCSS()}
  <style>
    .contact-wrap{max-width:760px;margin:0 auto;padding:56px 5%}
    .contact-wrap h1{font-size:2rem;font-weight:900;color:var(--primary);margin-bottom:.5rem}
    .contact-wrap .lead{color:var(--muted);font-size:1.05rem;margin-bottom:2.5rem}
    .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:2.5rem}
    .contact-info h2{font-size:1.2rem;font-weight:800;color:var(--primary);margin-bottom:1rem}
    .info-item{display:flex;gap:.6rem;margin-bottom:1rem;align-items:flex-start}
    .info-icon{font-size:1.2rem}
    .info-text strong{display:block;color:var(--primary);font-weight:700}
    .info-text span{font-size:.9rem;color:var(--muted)}
    .form-col h2{font-size:1.2rem;font-weight:800;color:var(--primary);margin-bottom:1rem}
    .form-col input,.form-col select,.form-col textarea{width:100%;padding:.8rem 1rem;border:1px solid var(--border);border-radius:10px;font-family:'Open Sans',Arial,sans-serif;font-size:.97rem;background:#fff;color:var(--text);margin-bottom:.8rem}
    .form-col textarea{height:130px;resize:vertical}
    .form-col button{width:100%;padding:1rem;border-radius:999px;font-weight:800;font-family:'Poppins',Arial,sans-serif;font-size:1rem;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;border:none;cursor:pointer;transition:transform .2s,box-shadow .2s}
    .form-col button:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(212,169,79,.4)}
    .faq-contact{margin-top:2.5rem}
    @media(max-width:640px){.contact-grid{grid-template-columns:1fr}}
  </style>
</head>
<body>

${ptNav('/contacto')}

<section class="hero">
  <div class="wrap">
    <p class="breadcrumb-nav"><a href="/pt/">Início</a> · Contacto</p>
    <span class="badge">✉ Respondemos em 24–48h</span>
    <h1>Entre em Contacto Connosco</h1>
    <p class="sub">Tem perguntas sobre uma espécie, disponibilidade ou processo de compra? Estamos aqui para ajudar.</p>
  </div>
</section>

<div class="contact-wrap">
  <p class="lead">Somos um criador registado em Llíria, Valência (Espanha), com mais de 25 anos de experiência. Respondemos a todas as mensagens em português em 24 a 48 horas úteis.</p>

  <div class="contact-grid">
    <div class="contact-info">
      <h2>Informações de Contacto</h2>
      <div class="info-item">
        <span class="info-icon">📧</span>
        <div class="info-text">
          <strong>E-mail</strong>
          <span><a href="mailto:${EMAIL}">${EMAIL}</a></span>
        </div>
      </div>
      <div class="info-item">
        <span class="info-icon">📍</span>
        <div class="info-text">
          <strong>Localização do Criador</strong>
          <span>Llíria, Valência, Espanha</span>
        </div>
      </div>
      <div class="info-item">
        <span class="info-icon">🕐</span>
        <div class="info-text">
          <strong>Tempo de Resposta</strong>
          <span>24–48 horas úteis</span>
        </div>
      </div>
      <div class="info-item">
        <span class="info-icon">🌍</span>
        <div class="info-text">
          <strong>Idiomas</strong>
          <span>Português, Espanhol</span>
        </div>
      </div>
      <div class="info-item">
        <span class="info-icon">🚚</span>
        <div class="info-text">
          <strong>Envios para Portugal</strong>
          <span>Continental, Madeira e Açores</span>
        </div>
      </div>
    </div>

    <div class="form-col">
      <h2>Envie-nos uma Mensagem</h2>
      <form name="contacto-pt" method="POST" data-netlify="true" action="/gracias.html">
        <input type="hidden" name="form-name" value="contacto-pt" />
        <input type="text" name="nome" placeholder="O seu nome completo" required />
        <input type="email" name="email" placeholder="O seu endereço de e-mail" required />
        <input type="text" name="pais" placeholder="Cidade / Distrito em Portugal" />
        <select name="especie">
          <option value="">Espécie de interesse...</option>
          <option>Papagaio Cinzento Africano (Yaco)</option>
          <option>Arara Azul-e-Amarela</option>
          <option>Arara Escarlate</option>
          <option>Arara Jacinto</option>
          <option>Cacatua de Eleonora</option>
          <option>Ninfa Carolina</option>
          <option>Eclectus</option>
          <option>Amazona</option>
          <option>Ovos Fertilizados</option>
          <option>Outra / Não sei ainda</option>
        </select>
        <textarea name="mensagem" placeholder="Escreva a sua mensagem, perguntas sobre disponibilidade, entrega, documentação..."></textarea>
        <button type="submit">✉ Enviar Mensagem</button>
      </form>
    </div>
  </div>

  <div class="faq-contact">
    <h2 style="font-size:1.4rem;font-weight:800;color:var(--primary);margin-bottom:1rem">Perguntas Frequentes de Contacto</h2>
    <div class="faq">
      <details><summary>Em que idioma posso escrever?</summary><div class="faq-body">Pode escrever em português (europeu ou brasileiro) ou espanhol. Respondemos sempre em português.</div></details>
      <details><summary>Quanto tempo demora a resposta?</summary><div class="faq-body">Respondemos em 24 a 48 horas úteis. Em períodos de maior procura (primavera e início do verão) o prazo pode estender-se ligeiramente.</div></details>
      <details><summary>O que devo incluir na mensagem?</summary><div class="faq-body">Diga-nos: a espécie que lhe interessa, a sua localização em Portugal, e qualquer questão específica que tenha. Quanto mais informação der, mais útil é a nossa resposta.</div></details>
      <details><summary>Têm redes sociais em português?</summary><div class="faq-body">Neste momento o contacto é exclusivamente por e-mail. É o canal mais eficiente para responder a questões detalhadas sobre disponibilidade e documentação.</div></details>
    </div>
  </div>
</div>

${ptFooter()}
</body>
</html>`;

  write('pt/contacto/index.html', html);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. RUN ALL BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n🇵🇹  Generating Portuguese pages...\n');

buildHomepage();

for (const page of moneyPages) {
  buildMoneyPage(page);
}

buildCitiesIndex();
for (const city of cities) {
  buildCityPage(city);
}

buildBlogIndex();
for (const post of blogPosts) {
  buildBlogPost(post);
}

buildContactPage();

console.log(`\n✅  Done! Generated:\n  1 homepage\n  ${moneyPages.length} money pages\n  ${cities.length + 1} city pages (+ index)\n  ${blogPosts.length + 1} blog posts (+ index)\n  1 contact page\n  Total: ${1 + moneyPages.length + cities.length + 1 + blogPosts.length + 1 + 1} pages\n`);
