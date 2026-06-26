/**
 * generate-pt-cities-blogs.js
 * Phase 4B — Portugal City SEO Domination + Blog Authority Articles
 * 12 city pages at /pt/papagaios-a-venda-{city}/
 * 10 full blog articles at /pt/blog/{slug}/
 * All: European Portuguese (pt-PT), full schemas, unique content.
 */

const fs   = require('fs');
const path = require('path');

const BASE  = 'https://www.paraisodeaves.com';
const EMAIL = 'paraisodeloros@gmail.com';
const GA_ID = 'G-4007YHH4H9';

function mkdirp(d){ fs.mkdirSync(d,{recursive:true}); }

/* ── SHARED CSS ── */
function baseCSS(){
  return `
  :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.10);}
  *{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
  body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;}
  h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
  a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
  img{max-width:100%;height:auto;display:block;}
  .topbar{background:var(--primary);position:sticky;top:0;z-index:1000;padding:0 5%;}
  .topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto;}
  .logo{color:var(--white);font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;}
  .logo span{font-size:1.5rem;}
  nav a{color:rgba(255,255,255,.85);margin-left:24px;font-size:.92rem;font-weight:500;transition:color .2s;}
  nav a:hover,nav a.active{color:var(--gold);}
  .lang-switch{display:flex;align-items:center;gap:6px;margin-left:28px;}
  .lang-switch a{font-size:.82rem;font-weight:600;color:rgba(255,255,255,.6);padding:3px 7px;border-radius:4px;transition:all .2s;}
  .lang-switch a.active{color:var(--gold);background:rgba(212,169,79,.15);}
  .lang-switch span{color:rgba(255,255,255,.35);font-size:.75rem;}
  .breadcrumb-bar{background:var(--primary);padding:10px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
  .breadcrumb-bar .inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.6);}
  .breadcrumb-bar .inner a{color:rgba(255,255,255,.7);}
  .breadcrumb-bar .inner a:hover{color:var(--gold);}
  .breadcrumb-bar .inner span{margin:0 6px;}
  .hero-city{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);padding:64px 5%;text-align:center;color:var(--white);}
  .hero-city .badge{display:inline-block;background:rgba(212,169,79,.15);border:1px solid var(--gold);color:var(--gold);padding:6px 20px;border-radius:30px;font-size:.8rem;font-weight:700;letter-spacing:1px;margin-bottom:18px;}
  .hero-city h1{font-size:clamp(1.9rem,5vw,3rem);margin-bottom:12px;color:var(--white);}
  .hero-city .subtitle{font-size:1.05rem;color:rgba(255,255,255,.85);max-width:660px;margin:0 auto 24px;}
  .trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:10px;}
  .trust-pills span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:var(--white);padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;}
  .page-wrap{max-width:1200px;margin:0 auto;padding:56px 5%;display:grid;grid-template-columns:1fr 320px;gap:48px;align-items:start;}
  @media(max-width:900px){.page-wrap{grid-template-columns:1fr;}}
  .main-col p{margin-bottom:14px;color:#2a2a2a;}
  .main-col ul{padding-left:20px;margin-bottom:14px;}
  .main-col ul li{margin-bottom:6px;}
  .section{margin-bottom:48px;}
  .section h2{font-size:1.55rem;color:var(--primary);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--gold);display:inline-block;}
  .section h3{font-size:1.1rem;color:var(--secondary);margin:20px 0 8px;}
  .delivery-box{background:var(--primary);color:var(--white);border-radius:12px;padding:28px;margin-bottom:32px;}
  .delivery-box h3{color:var(--gold);margin-bottom:14px;}
  .delivery-box p,.delivery-box li{color:rgba(255,255,255,.85);font-size:.93rem;}
  .delivery-box ul{padding-left:18px;}
  .delivery-box ul li{margin-bottom:6px;}
  .species-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:32px;}
  .species-card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;transition:box-shadow .2s;}
  .species-card:hover{box-shadow:var(--shadow);}
  .species-card .icon{font-size:1.8rem;margin-bottom:6px;}
  .species-card h4{font-size:.85rem;color:var(--primary);font-family:'Poppins',sans-serif;margin-bottom:3px;}
  .species-card span{font-size:.77rem;color:var(--muted);}
  .faq-item{border-bottom:1px solid var(--border);padding:18px 0;}
  .faq-item:last-child{border-bottom:none;}
  .faq-q{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:var(--primary);margin-bottom:8px;}
  .faq-a{color:#2a2a2a;font-size:.95rem;}
  .cities-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-top:14px;}
  .city-chip{background:var(--white);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;font-size:.85rem;color:var(--secondary);font-weight:600;transition:all .2s;}
  .city-chip:hover{background:var(--primary);color:var(--gold);border-color:var(--primary);}
  .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:12px;padding:32px;color:var(--white);text-align:center;margin-bottom:32px;}
  .cta-box h3{color:var(--gold);font-size:1.15rem;margin-bottom:10px;}
  .cta-box p{color:rgba(255,255,255,.85);font-size:.9rem;margin-bottom:20px;}
  .btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.92rem;transition:all .2s;}
  .btn-gold:hover{background:var(--gold-light);color:var(--primary);}
  .btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.5);color:var(--white);padding:10px 22px;border-radius:30px;font-weight:600;font-size:.88rem;margin-left:10px;transition:all .2s;}
  .btn-outline:hover{border-color:var(--white);background:rgba(255,255,255,.1);color:var(--white);}
  .contact-form{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:26px;}
  .contact-form h3{color:var(--primary);font-size:1rem;margin-bottom:14px;}
  .form-group{margin-bottom:12px;}
  .form-group label{display:block;font-size:.83rem;font-weight:600;color:var(--primary);margin-bottom:4px;}
  .form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 13px;border:1.5px solid var(--border);border-radius:8px;font-family:'Open Sans',sans-serif;font-size:.88rem;color:var(--text);background:var(--bg);}
  .form-group textarea{min-height:80px;resize:vertical;}
  .sidebar-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:22px;}
  .sidebar-card h4{font-family:'Poppins',sans-serif;color:var(--primary);font-size:.95rem;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--gold);}
  .sidebar-card ul{list-style:none;padding:0;}
  .sidebar-card ul li{padding:6px 0;border-bottom:1px solid var(--border);font-size:.86rem;}
  .sidebar-card ul li:last-child{border-bottom:none;}
  .sidebar-card ul li a{color:var(--secondary);}
  .delivery-badge{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:12px;padding:20px;text-align:center;color:var(--white);margin-bottom:22px;}
  .delivery-badge .time{font-family:'Poppins',sans-serif;font-size:2rem;font-weight:700;color:var(--gold);}
  .delivery-badge p{font-size:.82rem;color:rgba(255,255,255,.75);margin-top:4px;}
  footer{background:var(--primary);color:rgba(255,255,255,.75);padding:56px 5% 28px;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:32px;max-width:1200px;margin:0 auto 40px;}
  @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:500px){.footer-grid{grid-template-columns:1fr;}}
  .footer-brand h3{font-family:'Poppins',sans-serif;color:var(--white);font-size:1.1rem;margin-bottom:10px;}
  .footer-brand p{font-size:.84rem;line-height:1.7;max-width:260px;}
  .footer-col h4{font-family:'Poppins',sans-serif;color:var(--gold-light);font-size:.84rem;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px;}
  .footer-col ul{list-style:none;}
  .footer-col ul li{margin-bottom:6px;}
  .footer-col ul li a{color:rgba(255,255,255,.65);font-size:.82rem;transition:color .2s;}
  .footer-col ul li a:hover{color:var(--gold);}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;text-align:center;font-size:.78rem;color:rgba(255,255,255,.4);max-width:1200px;margin:0 auto;}
  /* BLOG specific */
  .article-hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:56px 5%;color:var(--white);}
  .article-hero .badge{display:inline-block;background:rgba(212,169,79,.15);border:1px solid var(--gold);color:var(--gold);padding:5px 16px;border-radius:20px;font-size:.78rem;font-weight:700;letter-spacing:1px;margin-bottom:16px;}
  .article-hero h1{font-size:clamp(1.7rem,4vw,2.6rem);margin-bottom:10px;}
  .article-hero .meta{font-size:.85rem;color:rgba(255,255,255,.65);}
  .article-wrap{max-width:1200px;margin:0 auto;padding:56px 5%;display:grid;grid-template-columns:1fr 300px;gap:48px;}
  @media(max-width:900px){.article-wrap{grid-template-columns:1fr;}}
  .article-body p{margin-bottom:16px;color:#2a2a2a;font-size:1rem;}
  .article-body h2{font-size:1.45rem;color:var(--primary);margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--gold);display:inline-block;}
  .article-body h3{font-size:1.1rem;color:var(--secondary);margin:20px 0 8px;}
  .article-body ul,.article-body ol{padding-left:20px;margin-bottom:16px;}
  .article-body ul li,.article-body ol li{margin-bottom:7px;}
  .article-body figure{margin:24px 0;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);}
  .article-body figcaption{background:var(--primary);color:rgba(255,255,255,.75);font-size:.78rem;padding:8px 14px;font-style:italic;}
  .article-body .highlight-box{background:rgba(31,61,43,.07);border-left:4px solid var(--gold);padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0;}
  @media(max-width:700px){nav{display:none;}.page-wrap{padding:28px 4%;}.article-wrap{padding:28px 4%;}}
  `;
}

function ptNav(active=''){
  return `<header class="topbar">
    <div class="topbar-inner">
      <a class="logo" href="${BASE}/pt/"><span>🦜</span> paraisodeaves</a>
      <nav>
        <a href="${BASE}/pt/"${active==='Início'?' class="active"':''}>Início</a>
        <a href="${BASE}/pt/papagaios-a-venda-portugal/"${active==='Papagaios'?' class="active"':''}>Papagaios</a>
        <a href="${BASE}/pt/cidades/"${active==='Cidades'?' class="active"':''}>Cidades</a>
        <a href="${BASE}/pt/blog/"${active==='Blog'?' class="active"':''}>Blog</a>
        <a href="${BASE}/pt/contacto/"${active==='Contacto'?' class="active"':''}>Contacto</a>
        <span class="lang-switch">
          <a href="${BASE}/" title="Español">ES</a>
          <span>|</span>
          <a href="${BASE}/pt/" class="active" title="Português">PT</a>
        </span>
      </nav>
    </div>
  </header>`;
}

function ptFooter(){
  return `<footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>🦜 Paraíso de Aves</h3>
        <p>Criador registado de papagaios exóticos em Llíria, Valência (Espanha). Mais de 25 anos de experiência. Envios seguros para todo Portugal e Europa.</p>
        <p style="margin-top:12px;font-size:.82rem;">📧 <a href="mailto:${EMAIL}" style="color:var(--gold-light);">${EMAIL}</a></p>
      </div>
      <div class="footer-col">
        <h4>Espécies</h4>
        <ul>
          <li><a href="${BASE}/pt/papagaio-cinzento/">Papagaio Cinzento</a></li>
          <li><a href="${BASE}/pt/arara-jacinto/">Arara Jacinto</a></li>
          <li><a href="${BASE}/pt/arara-azul-e-amarela/">Arara Azul e Amarela</a></li>
          <li><a href="${BASE}/pt/arara-escarlate/">Arara Escarlate</a></li>
          <li><a href="${BASE}/pt/cacatua-de-crista-amarela/">Cacatua de Crista Amarela</a></li>
          <li><a href="${BASE}/pt/papagaio-eclectus/">Papagaio Eclectus</a></li>
          <li><a href="${BASE}/pt/papagaio-amazona/">Papagaio Amazona</a></li>
          <li><a href="${BASE}/pt/conuro/">Conuro</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Cidades</h4>
        <ul>
          <li><a href="${BASE}/pt/papagaios-a-venda-lisboa/">Lisboa</a></li>
          <li><a href="${BASE}/pt/papagaios-a-venda-porto/">Porto</a></li>
          <li><a href="${BASE}/pt/papagaios-a-venda-braga/">Braga</a></li>
          <li><a href="${BASE}/pt/papagaios-a-venda-faro/">Faro</a></li>
          <li><a href="${BASE}/pt/papagaios-a-venda-coimbra/">Coimbra</a></li>
          <li><a href="${BASE}/pt/papagaios-a-venda-evora/">Évora</a></li>
          <li><a href="${BASE}/pt/cidades/">Ver todas →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Blog</h4>
        <ul>
          <li><a href="${BASE}/pt/blog/documentacao-cites-portugal/">CITES Portugal</a></li>
          <li><a href="${BASE}/pt/blog/quanto-custa-um-papagaio-em-portugal/">Preços</a></li>
          <li><a href="${BASE}/pt/blog/papagaio-para-apartamento-em-portugal/">Papagaio em Aprtm.</a></li>
          <li><a href="${BASE}/pt/blog/melhores-papagaios-para-iniciantes/">Para Iniciantes</a></li>
          <li><a href="${BASE}/pt/blog/alimentacao-correta-dos-papagaios/">Alimentação</a></li>
          <li><a href="${BASE}/pt/blog/">Ver todos →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Comprar em Espanha</h4>
        <ul>
          <li><a href="${BASE}/comprar-loros-espana">Comprar Loros España</a></li>
          <li><a href="${BASE}/comprar-loros-madrid">Madrid</a></li>
          <li><a href="${BASE}/comprar-loros-valencia">Valencia</a></li>
          <li><a href="${BASE}/criadero-loros-espana">Criadero</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Paraíso de Aves · Criador Registado · CITES Oficial · Llíria, Valência, Espanha</p>
    </div>
  </footer>`;
}

function contactForm(id){
  return `<div class="contact-form" id="reserva">
    <h3>📋 Pedir Informação</h3>
    <p style="font-size:.82rem;color:var(--muted);margin-bottom:14px;">Resposta em menos de 24h.</p>
    <form method="POST" data-netlify="true" name="contacto-pt-${id}">
      <input type="hidden" name="form-name" value="contacto-pt-${id}"/>
      <div class="form-group"><label>Nome *</label><input type="text" name="nome" required placeholder="O seu nome"/></div>
      <div class="form-group"><label>E-mail *</label><input type="email" name="email" required placeholder="email@exemplo.pt"/></div>
      <div class="form-group"><label>Espécie de interesse</label>
        <select name="especie">
          <option value="">Selecione</option>
          <option>Papagaio Cinzento</option><option>Arara Jacinto</option>
          <option>Arara Azul e Amarela</option><option>Arara Escarlate</option>
          <option>Cacatua de Crista Amarela</option><option>Papagaio Eclectus</option>
          <option>Papagaio Amazona</option><option>Conuro</option>
          <option>Ovos Fertilizados</option><option>Outra</option>
        </select>
      </div>
      <div class="form-group"><label>Mensagem</label>
        <textarea name="mensagem" placeholder="Questões sobre disponibilidade, preço, entrega..."></textarea>
      </div>
      <button type="submit" class="btn-gold" style="width:100%;padding:12px;">Enviar →</button>
    </form>
  </div>`;
}

/* ════════════════════════════════════════════════
   CITY PAGE GENERATOR
════════════════════════════════════════════════ */

function citySchemas(c){
  const faqSchema = c.faqs.map(f=>`{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',');
  return `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"WebPage","@id":"${BASE}/pt/${c.slug}/","name":${JSON.stringify(c.title)},"description":${JSON.stringify(c.metaDesc)},"url":"${BASE}/pt/${c.slug}/","inLanguage":"pt-PT","publisher":{"@id":"${BASE}/#org"}},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"${BASE}/pt/"},{"@type":"ListItem","position":2,"name":"Papagaios à Venda em Portugal","item":"${BASE}/pt/papagaios-a-venda-portugal/"},{"@type":"ListItem","position":3,"name":${JSON.stringify('Papagaios em ' + c.name)},"item":"${BASE}/pt/${c.slug}/"}]},
{"@type":"FAQPage","mainEntity":[${faqSchema}]},
{"@type":"LocalBusiness","@id":"${BASE}/#localbusiness-pt-${c.cityKey}","name":"Paraíso de Aves","description":"Criador registado de papagaios exóticos com envio para ${c.name} e ${c.district}","url":"${BASE}/pt/","email":"${EMAIL}","address":{"@type":"PostalAddress","addressLocality":"Llíria","addressRegion":"Valência","addressCountry":"ES"},"areaServed":{"@type":"City","name":"${c.name}","addressCountry":"PT"}},
{"@type":"Organization","@id":"${BASE}/#org","name":"Paraíso de Aves","url":"${BASE}","email":"${EMAIL}","address":{"@type":"PostalAddress","addressLocality":"Llíria","addressRegion":"Valência","addressCountry":"ES"},"areaServed":["PT","ES","EU"]}
]}</script>`;
}

function generateCityPage(c){
  return `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
  <title>${c.title}</title>
  <meta name="description" content="${c.metaDesc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${BASE}/pt/${c.slug}/"/>
  <link rel="alternate" hreflang="pt-PT" href="${BASE}/pt/${c.slug}/"/>
  <link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="pt_PT"/>
  <meta property="og:title" content="${c.title}"/>
  <meta property="og:description" content="${c.metaDesc}"/>
  <meta property="og:url" content="${BASE}/pt/${c.slug}/"/>
  <meta property="og:image" content="${BASE}/images/${c.ogImage}"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${c.title}"/>
  <meta name="twitter:description" content="${c.metaDesc}"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>${baseCSS()}</style>
  ${citySchemas(c)}
</head>
<body>
${ptNav('Cidades')}
<section class="hero-city">
  <p class="badge">🦜 ENTREGA EM ${c.name.toUpperCase()} · CITES OFICIAL</p>
  <h1>Papagaios à Venda em ${c.name}</h1>
  <p class="subtitle">${c.heroSubtitle}</p>
  <div class="trust-pills">
    ${c.trustBadges.map(b=>`<span>${b}</span>`).join('')}
  </div>
</section>
<nav class="breadcrumb-bar" aria-label="Navegação estrutural">
  <div class="inner">
    <a href="${BASE}/pt/">Início</a><span>·</span>
    <a href="${BASE}/pt/papagaios-a-venda-portugal/">Papagaios à Venda</a><span>·</span>
    <strong style="color:rgba(255,255,255,.9)">Papagaios em ${c.name}</strong>
  </div>
</nav>

<div class="page-wrap">
  <main class="main-col">

    <!-- Intro Local -->
    <div class="section">
      <h2>Papagaios em ${c.name} com Documentação CITES</h2>
      ${c.introHTML}
    </div>

    <!-- Delivery Box -->
    <div class="delivery-box">
      <h3>🚚 Entrega em ${c.name} e ${c.district}</h3>
      ${c.deliveryHTML}
    </div>

    <!-- Espécies Disponíveis -->
    <div class="section">
      <h2>Espécies Disponíveis para ${c.name}</h2>
      <p>Todas as espécies abaixo estão disponíveis com entrega directa em ${c.name}${c.nearbyAreas ? ' e ' + c.nearbyAreas : ''}. Cada ave inclui documentação CITES completa, certificado veterinário e caixa de transporte IATA.</p>
      <div class="species-grid">
        <a href="${BASE}/pt/papagaio-cinzento/" class="species-card"><div class="icon">🩶</div><h4>Papagaio Cinzento</h4><span>O mais inteligente</span></a>
        <a href="${BASE}/pt/arara-jacinto/" class="species-card"><div class="icon">💙</div><h4>Arara Jacinto</h4><span>A maior arara</span></a>
        <a href="${BASE}/pt/arara-azul-e-amarela/" class="species-card"><div class="icon">💛</div><h4>Arara Azul e Amarela</h4><span>Muito sociável</span></a>
        <a href="${BASE}/pt/arara-escarlate/" class="species-card"><div class="icon">❤️</div><h4>Arara Escarlate</h4><span>Espectacular</span></a>
        <a href="${BASE}/pt/cacatua-de-crista-amarela/" class="species-card"><div class="icon">🤍</div><h4>Cacatua</h4><span>Muito carinhosa</span></a>
        <a href="${BASE}/pt/papagaio-eclectus/" class="species-card"><div class="icon">🦜</div><h4>Papagaio Eclectus</h4><span>Dimorfismo único</span></a>
        <a href="${BASE}/pt/papagaio-amazona/" class="species-card"><div class="icon">💚</div><h4>Papagaio Amazona</h4><span>Muito comunicativo</span></a>
        <a href="${BASE}/pt/conuro/" class="species-card"><div class="icon">🌟</div><h4>Conuro</h4><span>Ideal apartamento</span></a>
      </div>
    </div>

    <!-- CITES & Legalidade -->
    <div class="section">
      <h2>Documentação CITES e Legalidade em Portugal</h2>
      ${c.citesHTML}
    </div>

    <!-- Guia de Compra -->
    <div class="section">
      <h2>Guia de Compra para Residentes em ${c.name}</h2>
      ${c.buyingGuideHTML}
    </div>

    <!-- Processo de Reserva -->
    <div class="section">
      <h2>Processo de Reserva — Passo a Passo</h2>
      <ul>
        <li><strong>1. Contacto inicial:</strong> Envie-nos uma mensagem pelo formulário ou por e-mail com a espécie de interesse e o seu distrito.</li>
        <li><strong>2. Verificação de disponibilidade:</strong> Respondemos em menos de 24 horas com informação sobre aves disponíveis, idades e preços actualizados.</li>
        <li><strong>3. Sinal de reserva:</strong> Após decidir, é solicitado um sinal para garantir o exemplar escolhido.</li>
        <li><strong>4. Preparação:</strong> A ave recebe check-up veterinário, toda a documentação CITES é preparada e a caixa de transporte IATA é seleccionada.</li>
        <li><strong>5. Entrega em ${c.name}:</strong> A ave é entregue directamente na sua morada por transportadora especializada em animais vivos.</li>
        <li><strong>6. Acompanhamento pós-entrega:</strong> Mantemos contacto durante a primeira semana para garantir a boa adaptação da ave ao novo lar.</li>
      </ul>
    </div>

    <!-- Porque Paraíso de Aves -->
    <div class="section">
      <h2>Por que Escolher a Paraíso de Aves?</h2>
      ${c.whyUsHTML}
    </div>

    <!-- FAQ -->
    <div class="section">
      <h2>Perguntas Frequentes — Papagaios em ${c.name}</h2>
      ${c.faqs.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('')}
    </div>

    <!-- Cidades Relacionadas -->
    <div class="section">
      <h2>Entregamos também em</h2>
      <div class="cities-grid">
        ${c.relatedCities.map(r=>`<a href="${BASE}/pt/${r.slug}/" class="city-chip">📍 ${r.name}</a>`).join('')}
      </div>
    </div>

    <!-- CTA -->
    <div class="cta-box">
      <h3>Pronto para Adoptar um Papagaio em ${c.name}?</h3>
      <p>Contacte-nos hoje e verifique a disponibilidade de exemplares com entrega directa em ${c.name} e ${c.district}.</p>
      <a href="#reserva" class="btn-gold">Solicitar Disponibilidade</a>
      <a href="mailto:${EMAIL}" class="btn-outline">Enviar E-mail</a>
    </div>

  </main>

  <aside class="sidebar">
    <div class="delivery-badge">
      <div style="font-size:.78rem;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Entrega em ${c.name}</div>
      <div class="time">${c.deliveryTime}</div>
      <p>dias úteis após confirmação</p>
    </div>

    ${contactForm(c.cityKey)}

    <div class="sidebar-card">
      <h4>Espécies em Destaque</h4>
      <ul>
        <li><a href="${BASE}/pt/papagaio-cinzento/">Papagaio Cinzento Africano</a></li>
        <li><a href="${BASE}/pt/arara-jacinto/">Arara Jacinto</a></li>
        <li><a href="${BASE}/pt/arara-azul-e-amarela/">Arara Azul e Amarela</a></li>
        <li><a href="${BASE}/pt/cacatua-de-crista-amarela/">Cacatua de Crista Amarela</a></li>
        <li><a href="${BASE}/pt/papagaio-amazona/">Papagaio Amazona</a></li>
        <li><a href="${BASE}/pt/conuro/">Conuro</a></li>
        <li><a href="${BASE}/pt/ovos-fertilizados/">Ovos Fertilizados</a></li>
      </ul>
    </div>

    <div class="sidebar-card">
      <h4>Artigos Úteis</h4>
      <ul>
        <li><a href="${BASE}/pt/blog/documentacao-cites-portugal/">Documentação CITES Portugal</a></li>
        <li><a href="${BASE}/pt/blog/quanto-custa-um-papagaio-em-portugal/">Quanto Custa um Papagaio?</a></li>
        <li><a href="${BASE}/pt/blog/melhores-papagaios-para-iniciantes/">Para Iniciantes</a></li>
        <li><a href="${BASE}/pt/blog/papagaio-para-apartamento-em-portugal/">Papagaio em Apartamento</a></li>
        <li><a href="${BASE}/pt/blog/como-escolher-um-criador-responsavel/">Escolher Criador</a></li>
      </ul>
    </div>
  </aside>
</div>
${ptFooter()}
</body>
</html>`;
}

/* ════════════════════════════════════════════════
   CITY DATA
════════════════════════════════════════════════ */

const ALL_CITIES_REL = [
  {slug:'papagaios-a-venda-lisboa',name:'Lisboa'},
  {slug:'papagaios-a-venda-porto',name:'Porto'},
  {slug:'papagaios-a-venda-braga',name:'Braga'},
  {slug:'papagaios-a-venda-coimbra',name:'Coimbra'},
  {slug:'papagaios-a-venda-faro',name:'Faro'},
  {slug:'papagaios-a-venda-setubal',name:'Setúbal'},
  {slug:'papagaios-a-venda-aveiro',name:'Aveiro'},
  {slug:'papagaios-a-venda-leiria',name:'Leiria'},
  {slug:'papagaios-a-venda-viseu',name:'Viseu'},
  {slug:'papagaios-a-venda-evora',name:'Évora'},
  {slug:'papagaios-a-venda-guimaraes',name:'Guimarães'},
  {slug:'papagaios-a-venda-castelo-branco',name:'Castelo Branco'},
];

function relatedCitiesFor(mySlug){
  return ALL_CITIES_REL.filter(c=>c.slug!==mySlug).slice(0,6);
}

const cities = [

/* ── LISBOA ── */
{
  slug:'papagaios-a-venda-lisboa',
  cityKey:'lisboa',
  name:'Lisboa',
  district:'Distrito de Lisboa',
  nearbyAreas:'Sintra, Cascais, Setúbal, Almada e toda a Área Metropolitana de Lisboa',
  deliveryTime:'1–2',
  ogImage:'loro-gris-01.webp',
  title:'Papagaios à Venda em Lisboa | CITES Oficial | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Lisboa com documentação CITES. Criador registado entrega em Lisboa, Sintra, Cascais e AML. Yacos, araras, cacatuas e muito mais.',
  heroSubtitle:'Entrega directa em Lisboa e toda a Área Metropolitana — araras, yacos, cacatuas e conuros com CITES oficial e garantia de saúde.',
  trustBadges:['✓ CITES Oficial','✓ Entrega AML','✓ Criado à Mão','✓ Garantia de Saúde'],
  introHTML:`
    <p>Lisboa é a cidade com maior concentração de amantes de aves exóticas em Portugal. A capital portuguesa, com cerca de 2,9 milhões de habitantes na sua área metropolitana, tem vindo a registar um crescimento consistente no interesse por psitacídeos como companheiros de vida — impulsionado em parte pela cultura cosmopolita da cidade, pela presença de comunidades internacionais e pela crescente oferta de clínicas veterinárias especializadas em aves exóticas.</p>
    <p>Para os residentes em Lisboa que procuram adquirir um papagaio de um criador responsável e legalmente registado, a Paraíso de Aves oferece a solução mais completa disponível na Península Ibérica: aves criadas à mão no nosso estabelecimento em Llíria, Valência (Espanha), com toda a documentação CITES exigida pela legislação portuguesa, entrega certificada directamente na sua morada em Lisboa ou arredores, e acompanhamento pós-venda personalizado.</p>
    <p>Lisboa tem o privilégio de contar com algumas das melhores clínicas veterinárias especializadas em aves exóticas de todo Portugal — uma vantagem importante para os tutores que adquirem espécies protegidas que requerem cuidados veterinários especializados. A nossa rede de parceiros inclui clínicas de referência em Lisboa com experiência comprovada em psitacídeos de grande porte.</p>
    <p>Seja um papagaio cinzento africano para um apartamento em Alfama, uma arara azul e amarela para uma moradia em Cascais, ou um conuro para um estúdio no Chiado — entregamos em toda a área metropolitana de Lisboa com a segurança e a legalidade que a sua futura companheira merece.</p>
  `,
  deliveryHTML:`
    <p>Para Lisboa e toda a Área Metropolitana de Lisboa (AML), a Paraíso de Aves oferece entrega em <strong>1 a 2 dias úteis</strong> após confirmação do pagamento. A proximidade geográfica entre Llíria (Espanha) e Lisboa — menos de 700 km de distância — permite-nos garantir prazos de entrega entre os mais rápidos para Portugal.</p>
    <ul>
      <li><strong>Lisboa cidade:</strong> 1–2 dias úteis, entrega domiciliária</li>
      <li><strong>Sintra, Cascais, Oeiras, Amadora:</strong> 1–2 dias úteis</li>
      <li><strong>Almada, Setúbal, Barreiro, Moita:</strong> 2–3 dias úteis</li>
      <li><strong>Mafra, Torres Vedras, Loures:</strong> 2–3 dias úteis</li>
    </ul>
    <p>A ave viaja numa caixa IATA certificada com ventilação, água e alimento para a duração da viagem. Acompanha toda a documentação CITES, certificado veterinário e instruções de acolhimento.</p>
  `,
  citesHTML:`
    <p>Em Portugal, a posse de espécies protegidas pela CITES sem documentação válida é crime ambiental. O ICNF (Instituto da Conservação da Natureza e das Florestas) é a autoridade portuguesa responsável pela gestão e fiscalização da Convenção CITES.</p>
    <p>Todos os papagaios da Paraíso de Aves são acompanhados de documentação CITES reconhecida pelas autoridades portuguesas, incluindo certificado de origem do criador registado, anilha de identificação e certificado veterinário. Para residentes em Lisboa, recomendamos conservar toda a documentação e registar a ave junto do médico veterinário de referência.</p>
  `,
  buyingGuideHTML:`
    <p>Para comprar um papagaio em Lisboa de forma segura e legal, siga estes passos:</p>
    <ul>
      <li><strong>Verifique a documentação:</strong> Nunca compre uma ave sem documentação CITES. Em Lisboa, existem vendedores informais sem licença — evite-os.</li>
      <li><strong>Pesquise a espécie:</strong> Cada espécie tem necessidades diferentes. Yacos exigem muito tempo; conuros são mais independentes.</li>
      <li><strong>Prepare o espaço:</strong> Antes da entrega, assegure-se de que tem jaula adequada, poleiros e alimento de qualidade.</li>
      <li><strong>Identifique um veterinário especializado:</strong> Lisboa tem excelentes clínicas de aves exóticas. Marque uma consulta de apresentação nas primeiras semanas após a chegada da ave.</li>
    </ul>
  `,
  whyUsHTML:`
    <p>A Paraíso de Aves é um criador registado com mais de 25 anos de actividade. Ao contrário de vendedores locais sem licença, fornecemos documentação CITES completa e válida em toda a União Europeia, garantia de saúde com certificado veterinário, caixa de transporte IATA certificada, e apoio pós-venda por e-mail durante toda a vida da ave. Os nossos pares reprodutores estão registados junto às autoridades espanholas competentes, e todos os nascimentos são documentados e anilhados individualmente.</p>
  `,
  faqs:[
    {q:'Entregam papagaios directamente em Lisboa?',a:'Sim. Entregamos em Lisboa e em toda a Área Metropolitana de Lisboa em 1 a 2 dias úteis após confirmação do pagamento. A entrega é feita por transportadora especializada em animais vivos, com a ave numa caixa IATA certificada.'},
    {q:'Que documentação acompanha o papagaio entregue em Lisboa?',a:'Certificado CITES, anilha de identificação fechada, certificado veterinário de saúde e documentação do criador registado. Todos os documentos são válidos em Portugal e em toda a União Europeia.'},
    {q:'É necessário registo junto do ICNF para ter um papagaio em Lisboa?',a:'Para a maioria das espécies de cativeiro com documentação CITES, não é exigido registo adicional junto do ICNF. Recomendamos, contudo, contactar o ICNF ou um veterinário especializado para confirmar os requisitos específicos da espécie que pretende adquirir.'},
    {q:'Há clínicas veterinárias especializadas em aves exóticas em Lisboa?',a:'Sim. Lisboa tem algumas das melhores clínicas de aves exóticas em Portugal. Ao adquirir uma ave connosco, fornecemos uma lista de veterinários de referência especializados em psitacídeos na sua área.'},
    {q:'Qual a espécie mais popular entre os tutores de Lisboa?',a:'O papagaio cinzento africano (yaco) é consistentemente a espécie mais procurada em Lisboa, seguido das araras azul e amarela e das cacatuas de crista amarela. Para apartamentos mais pequenos, os conuros são cada vez mais populares.'},
    {q:'Podem entregar em Cascais, Sintra ou Setúbal?',a:'Sim, entregamos em toda a Área Metropolitana de Lisboa, incluindo Cascais, Sintra, Oeiras, Almada, Setúbal e Barreiro, em prazos de 1 a 3 dias úteis consoante a localização exacta.'},
    {q:'Quanto custa a entrega em Lisboa?',a:'O custo de entrega é calculado com base no peso e dimensão da caixa IATA e na distância. Contacte-nos para um orçamento detalhado que inclua o custo total (ave + documentação + transporte).'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-lisboa'),
},

/* ── PORTO ── */
{
  slug:'papagaios-a-venda-porto',
  cityKey:'porto',
  name:'Porto',
  district:'Distrito do Porto e Grande Porto',
  nearbyAreas:'Matosinhos, Gaia, Braga, Guimarães e Norte de Portugal',
  deliveryTime:'1–2',
  ogImage:'guacamayo-azul-01.webp',
  title:'Papagaios à Venda no Porto | CITES | Criador Registado | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos no Porto com CITES. Entrega no Porto, Matosinhos, Gaia e Norte de Portugal. Yacos, araras, cacatuas. Criador registado 25+ anos.',
  heroSubtitle:'Entrega directa no Porto e todo o Grande Porto — criador registado com 25 anos de experiência e CITES oficial incluído em cada ave.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Grande Porto','✓ Criado à Mão','✓ Apoio Pós-Venda'],
  introHTML:`
    <p>O Porto, a Invicta, é a segunda maior cidade de Portugal e um dos mercados mais dinâmicos para aves exóticas no país. Com mais de 1,7 milhões de habitantes na área metropolitana e uma cultura cada vez mais urbana e cosmopolita, o Porto tem assistido nos últimos anos a um crescimento significativo na procura de papagaios de criador registado como animais de companhia.</p>
    <p>A cidade do Porto tem características únicas que a tornam um excelente ambiente para papagaios: o clima atlântico, mais fresco e húmido do que Lisboa, é particularmente favorável para espécies como o papagaio cinzento africano e as cacatuas, que preferem temperaturas mais moderadas. O Porto tem também uma comunidade veterinária especializada em aves exóticas que tem crescido consideravelmente nos últimos anos.</p>
    <p>A Paraíso de Aves entrega no Porto e em toda a região Norte de Portugal — Grande Porto, Braga, Guimarães, Matosinhos e Gaia — com a regularidade e a fiabilidade que os nossos clientes portuenses esperam. Somos o criador ibérico com maior presença no mercado português do Norte, fruto de anos de relações de confiança com tutores satisfeitos nesta região.</p>
    <p>Se reside no Porto ou nos arredores e procura um papagaio de criador responsável, com toda a documentação CITES exigida por lei, entregue directamente na sua porta, a Paraíso de Aves é a sua escolha natural.</p>
  `,
  deliveryHTML:`
    <p>Para o Porto e o Grande Porto, garantimos entrega em <strong>1 a 2 dias úteis</strong>. A distância entre Llíria (Espanha) e o Porto é de aproximadamente 800 km, permitindo-nos uma logística eficiente com transportadoras parceiras especializadas em animais vivos.</p>
    <ul>
      <li><strong>Porto cidade e Grande Porto:</strong> 1–2 dias úteis</li>
      <li><strong>Matosinhos, Gaia, Maia, Gondomar:</strong> 1–2 dias úteis</li>
      <li><strong>Braga, Guimarães, Barcelos:</strong> 2–3 dias úteis</li>
      <li><strong>Viana do Castelo, Chaves, Vila Real:</strong> 2–3 dias úteis</li>
    </ul>
    <p>O clima atlântico do Porto, com temperaturas mais amenas, é geralmente favorável para o transporte de aves — evitamos, contudo, envios em dias de calor extremo ou frio severo para garantir o bem-estar durante a viagem.</p>
  `,
  citesHTML:`
    <p>Em Portugal e em toda a União Europeia, a compra de psitacídeos protegidos pela CITES sem documentação válida constitui crime ambiental. No Porto, como em qualquer outra cidade portuguesa, a fiscalização por parte do ICNF é regular e efectiva.</p>
    <p>Todos os papagaios da Paraíso de Aves chegam ao Porto com documentação CITES completa e legalmente válida. Recomendamos a todos os novos tutores no Porto que registem a ave com um veterinário especializado nas primeiras semanas após a chegada.</p>
  `,
  buyingGuideHTML:`
    <p>O Porto tem um mercado de aves exóticas activo, mas nem todos os vendedores operam com as licenças e a documentação correctas. Para comprar com segurança no Porto:</p>
    <ul>
      <li>Exija sempre documentação CITES — nunca aceite uma ave sem ela</li>
      <li>Prefira criadores registados com estabelecimento documentado</li>
      <li>Verifique a existência de anilha de identificação fechada na pata da ave</li>
      <li>Identifique previamente um veterinário especializado em aves exóticas no Porto</li>
      <li>Prepare o espaço — jaula adequada, poleiros, alimento de qualidade — antes da entrega</li>
    </ul>
  `,
  whyUsHTML:`<p>Com mais de 25 anos de experiência e dezenas de clientes satisfeitos no Norte de Portugal, a Paraíso de Aves é a referência ibérica em criação responsável de psitacídeos. Fornecemos documentação CITES completa, garantia de saúde, caixa IATA certificada e apoio pós-venda por e-mail. Os nossos clientes no Porto contam com a nossa disponibilidade para responder a questões sobre saúde, alimentação e comportamento ao longo de toda a vida da ave.</p>`,
  faqs:[
    {q:'Entregam papagaios directamente no Porto?',a:'Sim, entregamos no Porto e em toda a região do Grande Porto em 1 a 2 dias úteis após confirmação. A entrega é domiciliária, por transportadora especializada em animais vivos.'},
    {q:'O clima do Porto é adequado para papagaios?',a:'Sim. O clima atlântico do Porto, com temperaturas moderadas e humidade razoável, é particularmente favorável para espécies como o papagaio cinzento africano e as cacatuas. O inverno mais fresco no interior requer cuidados de aquecimento, mas no geral as condições são excelentes.'},
    {q:'Há veterinários de aves exóticas no Porto?',a:'Sim. O Porto tem algumas clínicas veterinárias especializadas em aves exóticas. Ao adquirir uma ave connosco, fornecemos uma lista de referência de veterinários especializados na região do Porto.'},
    {q:'Entregam também em Braga e Guimarães a partir do Porto?',a:'Sim. Além do Porto, entregamos em Braga, Guimarães, Matosinhos, Gaia, Barcelos, Viana do Castelo e em toda a região Norte em prazos de 2 a 3 dias úteis.'},
    {q:'Qual a espécie mais pedida por clientes do Porto?',a:'O papagaio cinzento africano e as araras azul e amarela são as mais solicitadas pelos nossos clientes do Porto. Em apartamentos mais pequenos, os conuros têm ganho muita popularidade.'},
    {q:'Podem fazer a entrega à tarde ou ao fim de semana?',a:'As janelas de entrega dependem da transportadora parceira. Ao confirmar a encomenda, fornecemos a informação sobre horários disponíveis para a sua área. Sempre que possível, tentamos acomodar preferências horárias.'},
    {q:'A documentação CITES é reconhecida pelas autoridades portuguesas?',a:'Sim. A documentação emitida pelo criador registado em Espanha é válida em toda a União Europeia, incluindo Portugal. Todos os documentos são reconhecidos pelo ICNF.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-porto'),
},

/* ── BRAGA ── */
{
  slug:'papagaios-a-venda-braga',
  cityKey:'braga',
  name:'Braga',
  district:'Distrito de Braga e Minho',
  nearbyAreas:'Guimarães, Barcelos, Viana do Castelo e todo o Minho',
  deliveryTime:'2–3',
  ogImage:'cacatua-01.webp',
  title:'Papagaios à Venda em Braga | CITES | Criador Registado | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Braga com documentação CITES completa. Entrega em Braga, Guimarães e Minho. Criador registado há 25+ anos. Yacos, araras, cacatuas.',
  heroSubtitle:'Braga é a cidade que mais cresce em Portugal — e a comunidade de amantes de aves exóticas cresce com ela. CITES incluído, entrega em toda a região do Minho.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Minho','✓ Criado à Mão','✓ Garantia Saúde'],
  introHTML:`
    <p>Braga, a cidade mais jovem e de crescimento mais rápido em Portugal, tem uma comunidade de apreciadores de aves exóticas que acompanha o dinamismo da cidade. Capital do Minho e sede da região com maior densidade populacional do país, Braga oferece um contexto excelente para a criação responsável de papagaios — com boas acessibilidades, clínicas veterinárias especializadas e uma comunidade de tutores activa.</p>
    <p>O clima do Minho, húmido e temperado com invernos mais frios do que o sul do país, é geralmente bem tolerado pelos psitacídeos desde que sejam mantidos em ambientes climatizados. O papagaio cinzento africano, por exemplo, adapta-se muito bem ao clima bracarense quando mantido em casa com aquecimento adequado nos meses mais frios.</p>
    <p>A Paraíso de Aves serve regularmente clientes em Braga, Guimarães, Barcelos e em toda a região do Minho. O nosso processo de entrega está optimizado para a região Norte, com prazos de 2 a 3 dias úteis e rastreamento em tempo real da encomenda.</p>
    <p>Se procura adquirir um papagaio em Braga com toda a segurança legal e documentação CITES exigida, a Paraíso de Aves é o criador de referência para a região. Contacte-nos e informe-se sobre a disponibilidade actual.</p>
  `,
  deliveryHTML:`
    <p>Para Braga e o Minho, a entrega demora geralmente <strong>2 a 3 dias úteis</strong> após confirmação. A área do Minho está bem servida pela nossa rede de transportadoras parceiras especializadas.</p>
    <ul>
      <li><strong>Braga cidade:</strong> 2–3 dias úteis</li>
      <li><strong>Guimarães, Barcelos, Famalicão:</strong> 2–3 dias úteis</li>
      <li><strong>Viana do Castelo, Ponte de Lima:</strong> 2–3 dias úteis</li>
      <li><strong>Interior do Minho (Chaves, Monção):</strong> 3–4 dias úteis</li>
    </ul>
    <p>Atenção especial ao inverno do Minho: em dias de temperatura muito baixa, podemos atrasar o envio por 24h para proteger o bem-estar da ave durante o transporte.</p>
  `,
  citesHTML:`<p>Como em toda Portugal, a posse de papagaios de espécies protegidas em Braga requer documentação CITES válida. Todos os nossos exemplares chegam a Braga com certificado CITES, anilha de identificação e certificado veterinário — documentação reconhecida pelo ICNF e pelas autoridades veterinárias portuguesas.</p>`,
  buyingGuideHTML:`<p>Em Braga e no Minho, como em qualquer região de Portugal, é fundamental adquirir apenas de criadores com estabelecimento registado e documentação CITES completa. Desconfie de anúncios de venda sem documentação — a ausência de CITES pode resultar na apreensão da ave e em coimas significativas. A Paraíso de Aves fornece toda a documentação e está disponível para esclarecer qualquer dúvida antes e após a compra.</p>`,
  whyUsHTML:`<p>Somos o criador ibérico com maior track record de entregas no Norte de Portugal. Mais de 25 anos de experiência, zero compromisso na documentação legal e apoio pós-venda contínuo por e-mail fazem da Paraíso de Aves a escolha de referência para os tutores de Braga e do Minho.</p>`,
  faqs:[
    {q:'Entregam em Braga e no Minho?',a:'Sim. Entregamos em Braga cidade e em toda a região do Minho — Guimarães, Barcelos, Viana do Castelo, Famalicão — em 2 a 3 dias úteis.'},
    {q:'O clima de Braga é adequado para papagaios?',a:'Sim, com os devidos cuidados. O clima do Minho é húmido e os invernos podem ser frios. Os papagaios devem ser mantidos em ambientes aquecidos (mínimo 16°C) nos meses mais frios. No verão, o clima bracarense é excelente para a maioria das espécies.'},
    {q:'Qual a espécie mais adequada para um apartamento em Braga?',a:'O conuro é a escolha mais popular para apartamentos de dimensão média. Para tutores com mais espaço e experiência, o papagaio cinzento africano ou a cacatua de cabeça nua são excelentes opções para a região.'},
    {q:'Entregam também em Guimarães e Barcelos?',a:'Sim, entregamos em Guimarães, Barcelos, Famalicão, Esposende e em toda a região do Minho em prazos de 2 a 3 dias úteis.'},
    {q:'Os papagaios precisam de vacinas em Portugal?',a:'Não existem vacinas obrigatórias para psitacídeos em Portugal. Recomendamos, contudo, análise de sangue e exame veterinário geral nos primeiros meses após a aquisição — especialmente para espécies CITES I como o papagaio cinzento africano.'},
    {q:'Como sei que o criador é legítimo?',a:'Solicite o número de registo do estabelecimento de criação, a documentação CITES dos pares reprodutores e as anilhas das crias. Um criador legítimo fornece toda esta informação sem hesitação. A Paraíso de Aves disponibiliza toda a documentação a pedido.'},
    {q:'Qual o processo de reserva para Braga?',a:'Contacto inicial por e-mail ou formulário → verificação de disponibilidade (resposta em 24h) → sinal de reserva → preparação da ave com check-up veterinário e documentação → entrega em 2–3 dias úteis.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-braga'),
},

/* ── COIMBRA ── */
{
  slug:'papagaios-a-venda-coimbra',
  cityKey:'coimbra',
  name:'Coimbra',
  district:'Distrito de Coimbra e Região Centro',
  nearbyAreas:'Leiria, Viseu, Aveiro e toda a região Centro de Portugal',
  deliveryTime:'2–3',
  ogImage:'eclectus-01.webp',
  title:'Papagaios à Venda em Coimbra | CITES | Criador Registado | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Coimbra com CITES. Entrega em Coimbra e região Centro. Yacos, araras, cacatuas, conuros. Criador registado 25+ anos de experiência.',
  heroSubtitle:'A cidade universitária de Coimbra merece uma ave de excepção — com CITES completo e entrega directa em Coimbra e toda a região Centro.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Região Centro','✓ Criado à Mão','✓ Apoio Pós-Venda'],
  introHTML:`
    <p>Coimbra, a cidade do conhecimento e das tradições, tem uma comunidade académica e universitária que demonstra um interesse crescente por aves exóticas como companheiros de vida. A cidade do Mondego é o coração da região Centro de Portugal e um hub de distribuição natural para toda a faixa litoral e interior centro do país.</p>
    <p>Para os estudantes, professores e famílias residentes em Coimbra, a Paraíso de Aves oferece uma proposta única: aves de criador certificado, com toda a documentação CITES, entregues directamente na porta — sem necessidade de deslocações a Espanha ou de compra em mercados sem garantias legais.</p>
    <p>O clima de Coimbra, temperado e com verões quentes e invernos amenos, é excelente para a maioria das espécies de papagaios. A cidade tem também uma oferta veterinária especializada em desenvolvimento, com algumas clínicas de referência na área de aves exóticas.</p>
    <p>A nossa experiência de entregas na região Centro diz-nos que os tutores de Coimbra se destacam pelo nível de preparação e conhecimento — frequentemente já pesquisaram em detalhe a espécie que pretendem antes de nos contactar. Se é o caso, estamos aqui para ajudar a finalizar a decisão e garantir que a adopção corre da melhor forma possível.</p>
  `,
  deliveryHTML:`
    <p>Para Coimbra e a região Centro, a entrega demora <strong>2 a 3 dias úteis</strong>. Coimbra é um ponto de distribuição central excelente — a partir de Coimbra conseguimos também servir rapidamente Leiria, Viseu, Aveiro e Castelo Branco.</p>
    <ul>
      <li><strong>Coimbra cidade:</strong> 2–3 dias úteis</li>
      <li><strong>Figueira da Foz, Cantanhede:</strong> 2–3 dias úteis</li>
      <li><strong>Leiria, Pombal:</strong> 2–3 dias úteis</li>
      <li><strong>Interior Centro (Arganil, Góis):</strong> 3–4 dias úteis</li>
    </ul>
  `,
  citesHTML:`<p>A legislação CITES aplica-se igualmente em Coimbra e em toda a região Centro. A Paraíso de Aves fornece toda a documentação necessária — certificado CITES, anilha, certificado veterinário — reconhecida pelo ICNF e válida em toda a UE.</p>`,
  buyingGuideHTML:`<p>Em Coimbra, o mercado informal de aves exóticas existe mas opera frequentemente sem as licenças correctas. Para proteger a sua compra e o seu futuro companheiro, adquira sempre de criador registado com documentação CITES verificável. A Paraíso de Aves disponibiliza toda a documentação a pedido antes de qualquer transacção.</p>`,
  whyUsHTML:`<p>Para os residentes em Coimbra, somos o criador ibérico de referência — documentação legal completa, aves socializadas desde o nascimento, garantia de saúde e apoio veterinário de referência. Mais de 25 anos a criar com responsabilidade e a entregar em todo Portugal continental.</p>`,
  faqs:[
    {q:'Entregam papagaios directamente em Coimbra?',a:'Sim. Entregamos em Coimbra cidade e em toda a região Centro em 2 a 3 dias úteis após confirmação do pagamento.'},
    {q:'É possível visitar o criadeiro antes de comprar?',a:'Sim. O nosso estabelecimento está em Llíria, Valência (Espanha), a cerca de 6 horas de Coimbra. Recebemos visitas com marcação prévia. Muitos clientes de Coimbra optam também por conhecer a ave por videochamada antes da entrega.'},
    {q:'Qual a espécie mais adequada para um estudante universitário em Coimbra?',a:'Para tutores com menos disponibilidade (aulas, trabalhos), os conuros são geralmente a melhor opção — têm menor exigência de atenção constante do que yacos ou araras. No entanto, mesmo o conuro necessita de pelo menos 2 horas de interacção diária.'},
    {q:'A documentação CITES tem prazo de validade?',a:'O certificado CITES de nascimento (emitido para cada ave) não tem prazo de validade — é um documento permanente. Para transacções comerciais futuras, podem ser necessários documentos adicionais. Para posse doméstica, o certificado original é suficiente.'},
    {q:'Entregam também em Aveiro e Leiria a partir da rota de Coimbra?',a:'Sim. A nossa rota Centro cobre Coimbra, Aveiro, Leiria, Figueira da Foz e adjacências em prazos de 2 a 3 dias úteis.'},
    {q:'Existe algum risco de a ave adoecer durante o transporte?',a:'O transporte é planeado para minimizar o stress — caixa IATA adequada ao tamanho, alimentação e água disponíveis, temperatura monitorizada. Fornecemos também um certificado veterinário de saúde antes do envio. O risco de adoecer durante o transporte é muito baixo quando feito correctamente.'},
    {q:'Como contactar a Paraíso de Aves para uma reserva em Coimbra?',a:'Pelo formulário desta página ou por e-mail para paraisodeloros@gmail.com. Respondemos em menos de 24 horas com informação de disponibilidade e preços actualizados.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-coimbra'),
},

/* ── FARO ── */
{
  slug:'papagaios-a-venda-faro',
  cityKey:'faro',
  name:'Faro',
  district:'Distrito de Faro e Algarve',
  nearbyAreas:'Portimão, Albufeira, Lagos, Tavira e todo o Algarve',
  deliveryTime:'2–3',
  ogImage:'guacamayo-escarlata-01.webp',
  title:'Papagaios à Venda no Algarve e Faro | CITES | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos no Algarve com CITES. Entrega em Faro, Portimão, Albufeira, Lagos e todo o Algarve. Criador registado 25+ anos. Araras, yacos, cacatuas.',
  heroSubtitle:'O Algarve tem o melhor clima de Portugal para papagaios — e a Paraíso de Aves entrega em Faro e em todo o Algarve com CITES e garantia de saúde.',
  trustBadges:['✓ CITES Oficial','✓ Entrega todo o Algarve','✓ Clima Ideal','✓ Garantia Saúde'],
  introHTML:`
    <p>O Algarve tem uma característica que o distingue de todas as outras regiões de Portugal para a criação de papagaios: o clima. Com médias anuais de temperatura que raramente descem abaixo dos 10°C e verões longos e quentes, o Algarve oferece condições climáticas muito próximas das regiões de origem de muitas espécies tropicais. Para araras, amazona e papagaios africanos, o Algarve é, do ponto de vista climático, o lugar ideal de Portugal para viver.</p>
    <p>Faro, capital distrital do Algarve, é o polo urbano da região e o centro de referência para os amantes de aves exóticas do sul do país. A cidade tem uma comunidade internacional significativa — residentes britânicos, alemães e holandeses que trazem consigo uma cultura estabelecida de criação de papagaios — o que contribuiu para o desenvolvimento de uma rede veterinária especializada em aves exóticas invulgarmente desenvolvida para uma cidade de dimensão média.</p>
    <p>A Paraíso de Aves serve regularmente clientes em todo o Algarve — Faro, Portimão, Lagos, Albufeira, Tavira, Loulé e Silves — com entregas em 2 a 3 dias úteis e toda a documentação CITES incluída. Para os residentes estrangeiros no Algarve, a nossa documentação é válida em toda a União Europeia.</p>
    <p>O clima algarvio permite também, para tutores com moradia e jardim, a criação em aviário exterior — uma solução excelente para araras grandes que necessitam de muito espaço. Contacte-nos para orientação sobre aviários adequados para as condições do Algarve.</p>
  `,
  deliveryHTML:`
    <p>Para o Algarve, a entrega demora <strong>2 a 3 dias úteis</strong> após confirmação. A distância entre Llíria e Faro é de cerca de 750 km, bem servida pelas nossas transportadoras parceiras.</p>
    <ul>
      <li><strong>Faro, Olhão, Tavira:</strong> 2–3 dias úteis</li>
      <li><strong>Portimão, Lagos, Silves:</strong> 2–3 dias úteis</li>
      <li><strong>Albufeira, Loulé, Lagoa:</strong> 2–3 dias úteis</li>
      <li><strong>Sagres, Vila do Bispo:</strong> 3–4 dias úteis</li>
    </ul>
    <p>Dada a distância, o transporte é feito em embalagem com regulação de temperatura para proteger a ave dos calores extremos do verão algarvio, especialmente nos meses de julho e agosto.</p>
  `,
  citesHTML:`<p>Em Portugal, incluindo o Algarve, a documentação CITES é obrigatória para todas as espécies protegidas. Para os residentes estrangeiros no Algarve (cidadãos da UE), a documentação é igualmente válida — sendo reconhecida em todos os países membros da União Europeia. A Paraíso de Aves fornece toda a documentação em português e espanhol.</p>`,
  buyingGuideHTML:`<p>O Algarve tem um mercado de aves exóticas activo, potenciado pela comunidade internacional. Existem vendedores informais sem licença — especialmente em mercados e plataformas online locais. Para comprar com segurança no Algarve, exija sempre documentação CITES verificável, anilha de identificação e certificado veterinário. Para qualquer dúvida sobre a legalidade de uma oferta específica, contacte o ICNF ou um veterinário de aves exóticas local.</p>`,
  whyUsHTML:`<p>A Paraíso de Aves tem uma presença consolidada no mercado algarvio, com clientes satisfeitos desde Tavira até Lagos. A nossa documentação CITES é válida para residentes portugueses e cidadãos da UE, o nosso apoio pós-venda está disponível em português, e as nossas aves são socializadas para ambientes domésticos — ideais para o estilo de vida algarvio, seja em apartamento seja em moradia com jardim.</p>`,
  faqs:[
    {q:'O clima do Algarve é adequado para papagaios?',a:'É o melhor clima de Portugal para a maioria das espécies. As temperaturas amenas no inverno e o calor seco no verão aproximam-se das condições naturais de muitas espécies tropicais. Atenção aos picos de calor no verão — assegure sombra e agua fresca abundantes.'},
    {q:'Entregam em todo o Algarve?',a:'Sim. Cobrimos Faro, Portimão, Lagos, Albufeira, Tavira, Olhão, Loulé, Silves, Lagoa e toda a costa algarvia em 2 a 3 dias úteis.'},
    {q:'Os residentes estrangeiros no Algarve podem comprar papagaios?',a:'Sim. Cidadãos da UE residentes em Portugal podem comprar papagaios com documentação CITES. A nossa documentação é válida em toda a UE. Para cidadãos de fora da UE (ex. britânicos pós-Brexit), recomendamos verificar os requisitos específicos com o ICNF.'},
    {q:'É possível criar araras grandes em aviário exterior no Algarve?',a:'Sim. O clima algarvio é excelente para aviários exteriores, especialmente nas regiões do interior. Recomendamos aviários cobertos com protecção contra vento e chuva de inverno, mesmo no Algarve. Contacte-nos para orientação sobre dimensões e materiais.'},
    {q:'Qual a espécie mais popular no Algarve?',a:'As araras azul e amarela e os papagaios cinzentos africanos são as espécies mais solicitadas no Algarve. As condições climáticas favorecem as espécies tropicais de maior porte, que apreciam o calor e a luz solar abundante.'},
    {q:'Há clínicas veterinárias de aves exóticas no Algarve?',a:'Sim. O Algarve, potenciado pela comunidade internacional, tem clínicas veterinárias com experiência em aves exóticas, especialmente em Faro e Portimão. Fornecemos referências ao adquirir uma ave connosco.'},
    {q:'Como é que o transporte funciona no verão algarvio?',a:'Em dias de calor extremo (acima de 38°C), podemos atrasar o envio por 24h para proteger o bem-estar da ave. A embalagem inclui regulação térmica. Se necessário, optamos por envio em início de manhã para minimizar a exposição ao calor.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-faro'),
},

/* ── SETÚBAL ── */
{
  slug:'papagaios-a-venda-setubal',
  cityKey:'setubal',
  name:'Setúbal',
  district:'Distrito de Setúbal e Península de Setúbal',
  nearbyAreas:'Almada, Barreiro, Sesimbra, Palmela e Arrábida',
  deliveryTime:'2–3',
  ogImage:'loro-gris-02.webp',
  title:'Papagaios à Venda em Setúbal | CITES Oficial | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Setúbal com CITES. Entrega em Setúbal, Almada, Barreiro e Península de Setúbal. Yacos, araras, cacatuas. Criador registado.',
  heroSubtitle:'Entrega directa em Setúbal e em toda a Península de Setúbal — com CITES oficial, garantia de saúde e apoio pós-venda personalizado.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Península Setúbal','✓ Criado à Mão','✓ Apoio Pós-Venda'],
  introHTML:`
    <p>Setúbal e a Península de Setúbal formam uma das regiões mais dinâmicas e populosas de Portugal, a sul de Lisboa. Com mais de 850.000 habitantes na área total e um crescimento residencial consistente, a região de Setúbal tem vindo a afirmar-se como um mercado importante para aves exóticas de qualidade.</p>
    <p>A proximidade com Lisboa — e a consequente facilidade de acesso a clínicas veterinárias especializadas da capital — torna a Península de Setúbal um local muito favorável para tutores de psitacídeos. Almada, Barreiro, Sesimbra, Palmela e a própria Setúbal têm uma comunidade de amantes de aves em crescimento constante.</p>
    <p>A Paraíso de Aves entrega regularmente na região de Setúbal, com prazos de 2 a 3 dias úteis desde o nosso criadeiro em Llíria até à porta do cliente. Toda a documentação CITES está incluída, assim como o certificado veterinário e a caixa de transporte IATA.</p>
  `,
  deliveryHTML:`
    <p>Para Setúbal e a Península de Setúbal, a entrega demora <strong>2 a 3 dias úteis</strong>.</p>
    <ul>
      <li><strong>Setúbal, Palmela, Sesimbra:</strong> 2–3 dias úteis</li>
      <li><strong>Almada, Seixal, Barreiro, Moita:</strong> 2–3 dias úteis</li>
      <li><strong>Alcochete, Montijo, Alcácer do Sal:</strong> 2–3 dias úteis</li>
    </ul>
  `,
  citesHTML:`<p>A Paraíso de Aves fornece documentação CITES completa válida em Portugal e toda a UE. Para residentes em Setúbal, a documentação pode ser verificada junto do ICNF ou de qualquer veterinário especializado em aves exóticas da região de Lisboa/Setúbal.</p>`,
  buyingGuideHTML:`<p>Para comprar um papagaio na região de Setúbal: prefira criadores registados com documentação verificável; evite compradores informais em redes sociais sem CITES; prepare o espaço antes da chegada da ave; e identifique um veterinário especializado (a proximidade com Lisboa é uma vantagem). A Paraíso de Aves fornece toda a orientação necessária.</p>`,
  whyUsHTML:`<p>Somos o criador ibérico de referência para a região de Setúbal — 25+ anos de experiência, documentação CITES completa, garantia de saúde e apoio contínuo por e-mail durante toda a vida da ave.</p>`,
  faqs:[
    {q:'Entregam em Setúbal e Almada?',a:'Sim. Entregamos em toda a Península de Setúbal — Setúbal, Almada, Barreiro, Sesimbra, Seixal e Moita — em 2 a 3 dias úteis.'},
    {q:'A proximidade com Lisboa facilita o acesso a veterinários especializados?',a:'Sim. A Península de Setúbal tem acesso fácil às clínicas veterinárias especializadas em aves exóticas de Lisboa. Fornecemos uma lista de referência ao adquirir uma ave connosco.'},
    {q:'Qual a espécie recomendada para a região de Setúbal?',a:'O papagaio cinzento africano e o papagaio amazona são excelentes para a região. O clima temperado da Arrábida é favorável para a maioria das espécies.'},
    {q:'É possível ter um papagaio numa moradia com jardim em Setúbal?',a:'Sim. Uma moradia com jardim oferece possibilidade de aviário exterior — uma excelente opção para araras ou amazona que beneficiam de mais espaço e luz natural.'},
    {q:'A documentação é reconhecida em Portugal mesmo sendo emitida em Espanha?',a:'Sim. A documentação CITES emitida por criadores registados em Espanha é reconhecida em toda a UE, incluindo Portugal.'},
    {q:'Qual o custo de entrega em Setúbal?',a:'O custo de transporte é calculado com base na espécie, tamanho da caixa IATA e distância. Contacte-nos para um orçamento completo.'},
    {q:'Como verificar se um vendedor local tem licença?',a:'Solicite o número de registo do estabelecimento de criação e a documentação CITES. Pode também contactar o ICNF para verificar a legitimidade de qualquer vendedor.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-setubal'),
},

/* ── AVEIRO ── */
{
  slug:'papagaios-a-venda-aveiro',
  cityKey:'aveiro',
  name:'Aveiro',
  district:'Distrito de Aveiro e Região de Aveiro',
  nearbyAreas:'Coimbra, Viseu, Oliveira de Azeméis e Litoral Centro',
  deliveryTime:'2–3',
  ogImage:'eclectus-02.webp',
  title:'Papagaios à Venda em Aveiro | CITES | Criador Registado | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Aveiro com CITES completo. Entrega em Aveiro, Ílhavo, Ria de Aveiro e região. Yacos, araras, cacatuas. Criador registado 25+ anos.',
  heroSubtitle:'A "Veneza de Portugal" merece uma ave extraordinária — com CITES oficial e entrega directa em Aveiro e na Ria.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Aveiro e Ria','✓ Criado à Mão','✓ Garantia Saúde'],
  introHTML:`
    <p>Aveiro, conhecida como a "Veneza de Portugal" pelos seus famosos canais e moliceiros, é uma cidade em franco crescimento com uma qualidade de vida reconhecidamente elevada. O Distrito de Aveiro, que inclui municípios como Ílhavo, Águeda, Oliveira de Azeméis, São João da Madeira e Ovar, tem uma população total de cerca de 370.000 habitantes e uma comunidade de apreciadores de aves exóticas em expansão.</p>
    <p>O clima de Aveiro, atlântico e moderado, é bem tolerado pela maioria das espécies de papagaios quando mantidas em ambientes domésticos adequados. A humidade característica da Ria de Aveiro pode ser, inclusivamente, benéfica para espécies como o papagaio cinzento africano, que prefere ambientes com humidade relativa entre 50 e 70%.</p>
    <p>A Paraíso de Aves entrega regularmente em Aveiro e na região, com prazos de 2 a 3 dias úteis. A nossa posição geográfica permite-nos servir eficientemente todo o litoral centro de Portugal, da Figueira da Foz até ao Porto.</p>
  `,
  deliveryHTML:`
    <p>Para Aveiro e a região, entregamos em <strong>2 a 3 dias úteis</strong>.</p>
    <ul>
      <li><strong>Aveiro, Ílhavo, Murtosa:</strong> 2–3 dias úteis</li>
      <li><strong>Águeda, Oliveira do Bairro:</strong> 2–3 dias úteis</li>
      <li><strong>Ovar, Espinho, Estarreja:</strong> 2–3 dias úteis</li>
    </ul>
  `,
  citesHTML:`<p>Em Aveiro como em toda Portugal, a posse de papagaios protegidos requer documentação CITES. A Paraíso de Aves fornece toda a documentação válida em toda a UE, sem custos adicionais.</p>`,
  buyingGuideHTML:`<p>Para comprar um papagaio em Aveiro com segurança: exija CITES completo, prefira criadores registados, prepare o ambiente antes da chegada e identifique veterinários especializados na região Centro (Aveiro tem clínicas com experiência em aves exóticas).</p>`,
  whyUsHTML:`<p>25+ anos de experiência, documentação CITES completa, aves socializadas desde o nascimento e apoio pós-venda contínuo. Para os residentes em Aveiro, somos o criador ibérico de maior confiança.</p>`,
  faqs:[
    {q:'Entregam em Aveiro e na Ria?',a:'Sim. Entregamos em Aveiro cidade, Ílhavo, Murtosa, Águeda e toda a região do Distrito de Aveiro em 2 a 3 dias úteis.'},
    {q:'A humidade da Ria de Aveiro afecta os papagaios?',a:'Ligeiramente, no sentido positivo para algumas espécies como o papagaio cinzento africano, que prefere humidade relativa entre 50 e 70%. Certifique-se de que a casa tem boa ventilação para evitar problemas de condensação no inverno.'},
    {q:'Qual a espécie recomendada para Aveiro?',a:'O papagaio cinzento africano é especialmente adequado para o clima de Aveiro. Os conuros são também excelentes para apartamentos da cidade.'},
    {q:'Entregam em Oliveira de Azeméis e São João da Madeira?',a:'Sim, cobrimos todo o Distrito de Aveiro em 2 a 3 dias úteis.'},
    {q:'É necessário registo especial para ter um papagaio em Aveiro?',a:'Não é necessário registo municipal especial para posse doméstica, mas a documentação CITES é obrigatória. Recomendamos registo junto de um veterinário especializado.'},
    {q:'Qual o preço aproximado de entrega em Aveiro?',a:'O custo varia com a espécie e o tamanho da caixa. Contacte-nos para um orçamento completo que inclua ave, documentação e transporte.'},
    {q:'Como reservar um papagaio para entrega em Aveiro?',a:'Use o formulário desta página ou envie e-mail. Respondemos em 24h com disponibilidade e preços. Após reserva, a entrega é efectuada em 2 a 3 dias úteis.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-aveiro'),
},

/* ── LEIRIA ── */
{
  slug:'papagaios-a-venda-leiria',
  cityKey:'leiria',
  name:'Leiria',
  district:'Distrito de Leiria e Região de Pinhal Litoral',
  nearbyAreas:'Batalha, Marinha Grande, Alcobaça, Caldas da Rainha',
  deliveryTime:'2–3',
  ogImage:'loro-amazonico-01.webp',
  title:'Papagaios à Venda em Leiria | CITES | Criador Registado | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Leiria com CITES. Entrega em Leiria, Batalha, Marinha Grande e região. Yacos, araras, cacatuas. Criador registado há mais de 25 anos.',
  heroSubtitle:'Entrega directa em Leiria e no Pinhal Litoral — papagaios criados à mão com CITES completo e apoio pós-venda personalizado.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Leiria e Região','✓ Criado à Mão','✓ Apoio Pós-Venda'],
  introHTML:`
    <p>Leiria é uma cidade central em Portugal, bem posicionada entre Lisboa e o Porto, com uma região dinâmica que inclui Batalha, Marinha Grande, Alcobaça e Caldas da Rainha. O Distrito de Leiria, com cerca de 470.000 habitantes, tem uma base económica diversificada e uma qualidade de vida que atrai cada vez mais famílias — e, com elas, uma procura crescente por animais de companhia de qualidade.</p>
    <p>A localização central de Leiria torna-a um excelente ponto de entrega para toda a zona Centro Litoral de Portugal. A Paraíso de Aves serve regularmente tutores em Leiria e nos concelhos vizinhos, com entregas pontuais e toda a documentação necessária.</p>
    <p>O clima de Leiria, temperado e com a influência das matas de pinheiro que caracterizam a região, é adequado para a maioria das espécies de papagaios. Os invernos são amenos comparados com o interior, o que reduz os custos de aquecimento do espaço da ave.</p>
  `,
  deliveryHTML:`
    <p>Para Leiria e a região, entregamos em <strong>2 a 3 dias úteis</strong>.</p>
    <ul>
      <li><strong>Leiria cidade, Batalha:</strong> 2–3 dias úteis</li>
      <li><strong>Marinha Grande, Alcobaça:</strong> 2–3 dias úteis</li>
      <li><strong>Pombal, Ansião:</strong> 2–3 dias úteis</li>
      <li><strong>Caldas da Rainha, Óbidos:</strong> 2–3 dias úteis</li>
    </ul>
  `,
  citesHTML:`<p>Documentação CITES completa incluída em todos os nossos exemplares — certificado CITES, anilha, certificado veterinário, válida em toda a UE incluindo Portugal.</p>`,
  buyingGuideHTML:`<p>Em Leiria como em todo Portugal, exija sempre documentação CITES antes de adquirir qualquer psitacídeo protegido. A Paraíso de Aves disponibiliza toda a documentação a pedido e responde a qualquer questão legal ou técnica sobre a posse de aves exóticas em Portugal.</p>`,
  whyUsHTML:`<p>Para os residentes em Leiria e na região Centro Litoral: 25 anos de experiência, documentação CITES garantida, aves criadas à mão e apoio pós-venda por e-mail para toda a vida da ave.</p>`,
  faqs:[
    {q:'Entregam em Leiria e concelhos vizinhos?',a:'Sim. Cobrimos Leiria, Batalha, Marinha Grande, Alcobaça, Pombal e toda a região em 2 a 3 dias úteis.'},
    {q:'O clima de Leiria é adequado para papagaios?',a:'Sim. O clima temperado de Leiria, com influência da mata de pinheiro, é favorável para a maioria das espécies. Invernos amenos e verões quentes mas sem os extremos do Alentejo.'},
    {q:'Quais as espécies mais pedidas em Leiria?',a:'O papagaio amazona e o conuro são as espécies mais solicitadas na região de Leiria, seguidos do papagaio cinzento africano.'},
    {q:'É possível visitar o criadeiro a partir de Leiria?',a:'Sim. A distância de Leiria a Llíria (Espanha) é de cerca de 6 horas de carro. Recebemos visitas com marcação prévia. Alternativamente, organizamos videochamadas para apresentar as aves disponíveis.'},
    {q:'Há apoio veterinário especializado em aves em Leiria?',a:'Existem algumas clínicas na região com experiência em aves exóticas. Para casos mais complexos, Coimbra e Lisboa estão a menos de 1h30. Fornecemos referências ao adquirir uma ave connosco.'},
    {q:'Como é o processo de entrega em Leiria?',a:'Transportadora especializada em animais vivos, com rastreamento em tempo real. A entrega é domiciliária na morada indicada. Tentamos acomodar preferências horárias sempre que possível.'},
    {q:'Qual o sinal necessário para reservar uma ave?',a:'O valor do sinal é acordado caso a caso, consoante a espécie. É devolvido integralmente se o envio não puder ser efectuado por razões imputáveis à Paraíso de Aves.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-leiria'),
},

/* ── VISEU ── */
{
  slug:'papagaios-a-venda-viseu',
  cityKey:'viseu',
  name:'Viseu',
  district:'Distrito de Viseu e Beiras Altas',
  nearbyAreas:'Lamego, Mangualde, Tondela e toda a região das Beiras',
  deliveryTime:'2–3',
  ogImage:'cacatua-02.webp',
  title:'Papagaios à Venda em Viseu | CITES | Criador Registado | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Viseu com CITES. Entrega em Viseu e Beiras Altas. Yacos, araras, cacatuas, conuros. Criador registado 25+ anos de experiência.',
  heroSubtitle:'Viseu, cidade do Dão e das Beiras, recebe agora entregas directas de papagaios com CITES — criados à mão com 25 anos de experiência.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Beiras Altas','✓ Criado à Mão','✓ Garantia Saúde'],
  introHTML:`
    <p>Viseu, capital das Beiras Altas, é uma das cidades com maior qualidade de vida em Portugal segundo consecutivos rankings nacionais. Rodeada de vinhas do Dão e com uma posição geográfica privilegiada no coração de Portugal, Viseu tem uma comunidade de tutores de aves exóticas crescente, sobretudo entre famílias com moradia e jardim na região.</p>
    <p>O clima de Viseu apresenta características distintas: invernos mais frios do que o litoral e verões quentes e secos. Para os tutores de papagaios em Viseu, isto implica uma atenção redobrada ao aquecimento no inverno — recomendamos temperaturas mínimas de 18°C para a maioria das espécies — e à hidratação e ventilação nos meses de maior calor.</p>
    <p>Espécies como o papagaio cinzento africano e a cacatua de crista amarela são particularmente populares em Viseu e na região das Beiras, dado que toleram bem uma ampla gama de temperaturas quando mantidas em ambiente doméstico adequado. A Paraíso de Aves entrega regularmente na região, com prazos de 2 a 3 dias úteis.</p>
  `,
  deliveryHTML:`
    <p>Para Viseu e as Beiras, a entrega demora <strong>2 a 3 dias úteis</strong>.</p>
    <ul>
      <li><strong>Viseu cidade, Mangualde:</strong> 2–3 dias úteis</li>
      <li><strong>Lamego, Tondela, Santa Comba Dão:</strong> 2–3 dias úteis</li>
      <li><strong>Serra da Estrela, Guarda:</strong> 3–4 dias úteis</li>
    </ul>
    <p>Nota: em dias de neve ou gelo na Serra da Estrela, o envio pode ser adiado por 24h para proteger o bem-estar da ave.</p>
  `,
  citesHTML:`<p>Documentação CITES completa incluída — certificado CITES, anilha, certificado veterinário. Válida em toda a UE. Para tutores em Viseu, recomendamos registar a ave com veterinário especializado nos primeiros meses após a chegada.</p>`,
  buyingGuideHTML:`<p>Em Viseu e nas Beiras, como em toda Portugal, é essencial adquirir de criador registado. Desconfie de vendedores sem documentação CITES — especialmente em plataformas online e mercados regionais. A Paraíso de Aves fornece toda a documentação e está disponível para verificar a legalidade de qualquer situação específica.</p>`,
  whyUsHTML:`<p>Para residentes em Viseu e nas Beiras: criador ibérico registado há 25+ anos, documentação CITES completa, aves socializadas para ambientes familiares, garantia de saúde e apoio contínuo por e-mail.</p>`,
  faqs:[
    {q:'Entregam em Viseu e nas Beiras?',a:'Sim. Cobrimos Viseu, Lamego, Mangualde, Tondela, Santa Comba Dão e toda a região das Beiras em 2 a 3 dias úteis.'},
    {q:'O inverno frio de Viseu afecta os papagaios?',a:'Pode ser um factor se a ave estiver exposta ao frio. Em casa aquecida (mínimo 18°C), a maioria das espécies adapta-se bem. Recomendamos especial atenção ao aquecimento nos meses de dezembro a fevereiro.'},
    {q:'Quais as espécies mais indicadas para o clima de Viseu?',a:'O papagaio cinzento africano e a cacatua de crista amarela adaptam-se bem ao clima de interior com correcto aquecimento. Para quem quer uma espécie menos sensível ao frio, o conuro verde (Pyrrhura) é uma excelente opção.'},
    {q:'Há clínicas veterinárias especializadas em aves em Viseu?',a:'Existem clínicas em Viseu com experiência crescente em aves exóticas. Para casos mais complexos, Coimbra e Porto estão acessíveis. Fornecemos uma lista de referência ao adquirir.'},
    {q:'Entregam também na Serra da Estrela e na Guarda?',a:'Sim, embora com prazos ligeiramente superiores (3–4 dias úteis). Em períodos de neve, o envio pode ser adiado para proteger o bem-estar da ave.'},
    {q:'Como contactar para uma reserva em Viseu?',a:'Formulário nesta página ou e-mail para paraisodeloros@gmail.com. Respondemos em 24h com disponibilidade e preços.'},
    {q:'O papagaio cinzento africano é adequado para Viseu?',a:'Sim, desde que a casa tenha aquecimento adequado no inverno. O yaco tolera temperaturas até 12–14°C por períodos curtos, mas o ideal é manter o ambiente entre 18 e 24°C.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-viseu'),
},

/* ── ÉVORA ── */
{
  slug:'papagaios-a-venda-evora',
  cityKey:'evora',
  name:'Évora',
  district:'Distrito de Évora e Alto Alentejo',
  nearbyAreas:'Estremoz, Portalegre, Beja e todo o Alentejo',
  deliveryTime:'2–3',
  ogImage:'guacamayo-jacinto-02.webp',
  title:'Papagaios à Venda em Évora | CITES Oficial | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Évora com CITES. Entrega em Évora, Estremoz e Alentejo. Yacos, araras, cacatuas. Criador registado com mais de 25 anos de experiência.',
  heroSubtitle:'A cidade UNESCO de Évora recebe agora entregas directas de papagaios criados à mão — com CITES oficial e apoio pós-venda personalizado.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Alentejo','✓ Criado à Mão','✓ Garantia Saúde'],
  introHTML:`
    <p>Évora, classificada pela UNESCO como Património da Humanidade, é a capital do Alto Alentejo e uma das cidades mais histórias e belas de Portugal. Com um ritmo de vida mais tranquilo do que os grandes centros urbanos e uma qualidade de vida reconhecida, Évora tem atraído famílias e reformados que procuram um ambiente calmo — e, muitas vezes, a companhia de um papagaio para completar a casa.</p>
    <p>O clima do Alentejo é continental — verões quentes e secos, por vezes extremos, e invernos frios. Para os tutores de papagaios em Évora, isto implica cuidados específicos: protecção do calor extremo no verão (acima de 38–40°C, os papagaios precisam de ambiente arrefecido) e aquecimento no inverno. As casas típicas alentejanas, com paredes espessas, oferecem naturalmente uma boa regulação térmica.</p>
    <p>A Paraíso de Aves entrega em Évora e em toda a região do Alentejo — Estremoz, Portalegre, Beja — com prazos de 2 a 3 dias úteis. As espécies tropicais como araras e amazona apreciam especialmente o clima quente e seco do Alentejo, desde que tenham sombra e água fresca sempre disponíveis.</p>
  `,
  deliveryHTML:`
    <p>Para Évora e o Alentejo, a entrega demora <strong>2 a 3 dias úteis</strong>.</p>
    <ul>
      <li><strong>Évora cidade, Estremoz, Borba:</strong> 2–3 dias úteis</li>
      <li><strong>Portalegre, Elvas, Montemor-o-Novo:</strong> 2–3 dias úteis</li>
      <li><strong>Beja, Serpa, Moura:</strong> 3–4 dias úteis</li>
    </ul>
    <p>Em dias de calor extremo no Alentejo (temperatura acima de 40°C), o envio pode ser adiado por 24h ou efectuado em horário da madrugada para proteger a ave.</p>
  `,
  citesHTML:`<p>A documentação CITES fornecida pela Paraíso de Aves é válida em Portugal e em toda a UE — incluindo o Alentejo, onde o ICNF realiza fiscalizações regulares. Nunca compre sem documentação completa.</p>`,
  buyingGuideHTML:`<p>No Alentejo, o mercado de aves exóticas é menor do que nas grandes cidades, mas existem vendedores sem licença. Adquira sempre de criador registado com documentação CITES verificável. Para qualquer dúvida, o ICNF tem representação em Évora e pode ser contactado para verificação.</p>`,
  whyUsHTML:`<p>Para residentes em Évora e no Alentejo: 25+ anos de experiência, CITES completo, aves criadas à mão ideais para o estilo de vida alentejano — mais calmo e com mais espaço — e apoio por e-mail para toda a vida da ave.</p>`,
  faqs:[
    {q:'O clima quente do Alentejo é adequado para papagaios?',a:'Pode ser excelente, mas requer cuidados no verão. Em dias de calor extremo (acima de 38°C), a ave deve estar em ambiente arrefecido com ar condicionado ou ventilação forte. No inverno alentejano, garanta aquecimento mínimo de 16°C.'},
    {q:'Entregam em Évora e no Alentejo?',a:'Sim. Cobrimos Évora, Estremoz, Portalegre, Elvas, Montemor-o-Novo e todo o Alentejo em 2 a 4 dias úteis conforme a localização.'},
    {q:'Quais as espécies mais adequadas para o Alentejo?',a:'As araras e os papagaios amazona apreciam o calor do Alentejo. O papagaio cinzento africano também se adapta bem, desde que tenha ambiente arrefecido no verão.'},
    {q:'Posso ter um papagaio em aviário exterior no Alentejo?',a:'No inverno, sim. No verão, o calor extremo do Alentejo pode ser perigoso para aves em aviário exterior sem sombra e ventilação adequadas. Para o verão, recomendamos acesso a ambiente interior arrefecido.'},
    {q:'Há veterinários especializados em Évora?',a:'Existem clínicas em Évora com experiência em aves. Para casos complexos, Lisboa está a 1h30. Fornecemos lista de referência ao adquirir.'},
    {q:'Como é o processo de reserva para Évora?',a:'Contacto inicial → confirmação de disponibilidade em 24h → sinal de reserva → preparação da ave → entrega em 2–3 dias úteis directamente em Évora.'},
    {q:'O transporte é seguro com o calor do Alentejo?',a:'Sim, desde que o envio seja efectuado em horários adequados (madrugada/manhã) e a embalagem seja correcta. Em dias de calor extremo, podemos atrasar 24h para proteger o bem-estar da ave.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-evora'),
},

/* ── GUIMARÃES ── */
{
  slug:'papagaios-a-venda-guimaraes',
  cityKey:'guimaraes',
  name:'Guimarães',
  district:'Distrito de Braga e Minho',
  nearbyAreas:'Braga, Famalicão, Barcelos e Minho interior',
  deliveryTime:'2–3',
  ogImage:'conuro-01.webp',
  title:'Papagaios à Venda em Guimarães | CITES | Criador Registado | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Guimarães com CITES. Entrega em Guimarães, Braga e Minho. Yacos, araras, cacatuas, conuros. Criador registado 25+ anos.',
  heroSubtitle:'A "cidade berço" de Portugal acolhe agora entregas directas de papagaios criados à mão — com CITES oficial e garantia de saúde.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Guimarães e Minho','✓ Criado à Mão','✓ Apoio Pós-Venda'],
  introHTML:`
    <p>Guimarães, "a cidade onde Portugal nasceu", é uma das cidades mais emblemáticas e históricas do país. Classificada pela UNESCO como Património da Humanidade pelo seu centro histórico notável, Guimarães é também uma cidade moderna e dinâmica, com uma universidade activa, uma indústria têxtil relevante e uma comunidade urbana crescente.</p>
    <p>A proximidade com Braga e a inserção na região do Minho fazem de Guimarães um mercado relevante para aves exóticas. O clima do Minho — húmido e temperado, com invernos mais frios do que o litoral Sul — é adequado para a maioria das espécies desde que sejam mantidas em ambiente doméstico aquecido.</p>
    <p>A Paraíso de Aves entrega regularmente em Guimarães e nos concelhos vizinhos, com prazos de 2 a 3 dias úteis. A nossa experiência de entregas no Minho, combinada com o conhecimento das condições climáticas da região, permite-nos recomendar as espécies mais adequadas e os cuidados específicos para tutores de Guimarães.</p>
  `,
  deliveryHTML:`
    <p>Para Guimarães e o Minho, a entrega demora <strong>2 a 3 dias úteis</strong>.</p>
    <ul>
      <li><strong>Guimarães cidade, Vizela:</strong> 2–3 dias úteis</li>
      <li><strong>Braga, Barcelos, Famalicão:</strong> 2–3 dias úteis</li>
      <li><strong>Fafe, Felgueiras, Amarante:</strong> 2–3 dias úteis</li>
    </ul>
  `,
  citesHTML:`<p>Documentação CITES completa incluída em todos os nossos exemplares. Para Guimarães e o Minho, a documentação é reconhecida pelo ICNF e por todas as autoridades veterinárias portuguesas.</p>`,
  buyingGuideHTML:`<p>Em Guimarães, como em toda a região do Minho, é fundamental adquirir papagaios apenas de criadores registados com CITES. A Paraíso de Aves disponibiliza toda a documentação e está disponível para esclarecer qualquer dúvida antes da compra.</p>`,
  whyUsHTML:`<p>25+ anos de experiência, documentação CITES completa, aves criadas à mão e apoio pós-venda contínuo. Para os residentes em Guimarães, somos o criador ibérico de referência.</p>`,
  faqs:[
    {q:'Entregam em Guimarães?',a:'Sim. Entregamos em Guimarães cidade e em toda a região — Braga, Barcelos, Vizela, Fafe, Felgueiras — em 2 a 3 dias úteis.'},
    {q:'Quais as espécies mais pedidas em Guimarães?',a:'O papagaio cinzento africano e os conuros são as espécies mais solicitadas pelos nossos clientes de Guimarães. Para famílias com mais espaço, as araras azul e amarela são também muito populares.'},
    {q:'O inverno do Minho é problemático para papagaios?',a:'Com aquecimento adequado em casa (mínimo 18°C), não representa problema. Os papagaios são aves de interior e adaptam-se bem a climas temperados quando bem cuidados.'},
    {q:'Há veterinários de aves exóticas em Guimarães?',a:'Existem clínicas na região com crescente experiência em aves exóticas. Braga e Porto estão próximas para casos que requeiram especialistas específicos.'},
    {q:'É possível visitar o criadeiro a partir de Guimarães?',a:'Sim. A distância de Guimarães a Llíria é de cerca de 7 horas. Recebemos visitas com marcação. Muitos clientes de Guimarães preferem a videochamada.'},
    {q:'Qual o prazo de resposta após o contacto inicial?',a:'Respondemos em menos de 24 horas úteis a todos os pedidos de informação, com disponibilidade actualizada e preços da espécie de interesse.'},
    {q:'A entrega pode ser feita ao fim de semana?',a:'Dependendo da disponibilidade da transportadora na sua área. Informamos sobre as janelas de entrega disponíveis no momento da confirmação da reserva.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-guimaraes'),
},

/* ── CASTELO BRANCO ── */
{
  slug:'papagaios-a-venda-castelo-branco',
  cityKey:'castelo-branco',
  name:'Castelo Branco',
  district:'Distrito de Castelo Branco e Beiras',
  nearbyAreas:'Fundão, Covilhã, Guarda e interior das Beiras',
  deliveryTime:'2–3',
  ogImage:'loro-gris-02.webp',
  title:'Papagaios à Venda em Castelo Branco | CITES | Paraíso de Aves',
  metaDesc:'Compre papagaios exóticos em Castelo Branco com CITES. Entrega em Castelo Branco, Fundão, Covilhã e Beiras. Criador registado 25+ anos. Yacos, araras, cacatuas.',
  heroSubtitle:'Entrega directa em Castelo Branco e nas Beiras — papagaios criados à mão com CITES completo e acompanhamento pós-venda.',
  trustBadges:['✓ CITES Oficial','✓ Entrega Interior Beiras','✓ Criado à Mão','✓ Garantia Saúde'],
  introHTML:`
    <p>Castelo Branco, capital do interior das Beiras, é uma cidade com um ritmo de vida tranquilo e um forte sentido de comunidade. A região das Beiras — que inclui o Fundão, a Covilhã e a Guarda — tem uma população que aprecia a qualidade de vida do interior e demonstra um interesse crescente por animais de companhia exóticos.</p>
    <p>O clima de Castelo Branco é continental, com verões quentes (dos mais quentes de Portugal) e invernos frios. Para tutores de papagaios na região, é essencial dispor de bom aquecimento no inverno e de arrefecimento no verão — a temperatura máxima no interior das Beiras pode exceder os 40°C em julho e agosto.</p>
    <p>A Paraíso de Aves serve clientes em Castelo Branco e na região com entregas regulares em 2 a 3 dias úteis. A nossa equipa pode aconselhar sobre as espécies mais adequadas ao clima específico do interior das Beiras e os cuidados sazonais necessários para garantir o bem-estar da ave ao longo do ano.</p>
  `,
  deliveryHTML:`
    <p>Para Castelo Branco e a região, a entrega demora <strong>2 a 3 dias úteis</strong>.</p>
    <ul>
      <li><strong>Castelo Branco cidade:</strong> 2–3 dias úteis</li>
      <li><strong>Fundão, Covilhã, Belmonte:</strong> 2–3 dias úteis</li>
      <li><strong>Guarda, Sabugal:</strong> 3–4 dias úteis</li>
    </ul>
    <p>Em dias de calor extremo ou neve, o envio pode ser adiado 24h para proteger o bem-estar da ave durante o transporte.</p>
  `,
  citesHTML:`<p>Documentação CITES completa incluída em todos os nossos exemplares. Para tutores em Castelo Branco, recomendamos contactar o ICNF ou um veterinário especializado para confirmar os requisitos locais específicos para a espécie desejada.</p>`,
  buyingGuideHTML:`<p>No interior das Beiras, o mercado de aves exóticas é mais reduzido, o que pode levar alguns compradores a recorrer a fontes sem licença. Insistimos: adquira sempre de criador registado com CITES completo. A Paraíso de Aves entrega no interior das Beiras com toda a segurança e documentação legal exigida.</p>`,
  whyUsHTML:`<p>Para os residentes em Castelo Branco e na região: documentação CITES garantida, criador registado há 25+ anos, aves socializadas para ambientes domésticos e apoio pós-venda por e-mail para toda a vida da ave.</p>`,
  faqs:[
    {q:'Entregam em Castelo Branco e no interior das Beiras?',a:'Sim. Cobrimos Castelo Branco, Fundão, Covilhã, Belmonte e toda a região em 2 a 3 dias úteis.'},
    {q:'O clima extremo de Castelo Branco é um problema para papagaios?',a:'Requer cuidados adicionais: aquecimento no inverno (mínimo 18°C) e arrefecimento no verão (ar condicionado ou ventilação forte em dias acima de 35°C). Com os cuidados correctos, os papagaios adaptam-se bem.'},
    {q:'Quais as espécies mais adequadas para o interior das Beiras?',a:'Espécies mais robustas como o papagaio amazona ou o conuro verde (Pyrrhura) são boas opções para o interior. O papagaio cinzento africano também se adapta bem com ambiente doméstico adequado.'},
    {q:'O custo de transporte para Castelo Branco é elevado?',a:'O custo é calculado com base na espécie e distância. Contacte-nos para um orçamento completo — incluindo ave, documentação e transporte.'},
    {q:'Há veterinários especializados em aves em Castelo Branco?',a:'Existem clínicas na região com alguma experiência em aves. Para casos complexos, Coimbra ou Lisboa são as referências. Fornecemos lista de contactos ao adquirir.'},
    {q:'Como garantir que a ave chegue bem no calor de Castelo Branco?',a:'Programamos o envio para dias e horários de temperatura mais amena. Em julho/agosto, podemos optar por envio de madrugada para minimizar a exposição ao calor durante o transporte.'},
    {q:'Qual o processo completo de reserva e entrega?',a:'1. Contacto inicial. 2. Confirmação de disponibilidade (24h). 3. Sinal de reserva. 4. Check-up veterinário e documentação. 5. Entrega em 2–3 dias úteis directamente em Castelo Branco.'},
  ],
  relatedCities: relatedCitiesFor('papagaios-a-venda-castelo-branco'),
},

];

/* ════════════════════════════════════════════════
   BLOG ARTICLE GENERATOR
════════════════════════════════════════════════ */

function blogSchemas(art){
  const faqSchema = art.faqs.map(f=>`{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',');
  return `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[
{"@type":"Article","@id":"${BASE}/pt/blog/${art.slug}/","headline":${JSON.stringify(art.title)},"description":${JSON.stringify(art.metaDesc)},"url":"${BASE}/pt/blog/${art.slug}/","datePublished":"2026-06-26","dateModified":"2026-06-26","author":{"@type":"Organization","name":"Paraíso de Aves"},"publisher":{"@id":"${BASE}/#org"},"inLanguage":"pt-PT","image":"${BASE}/images/${art.ogImage}"},
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"${BASE}/pt/"},{"@type":"ListItem","position":2,"name":"Blog","item":"${BASE}/pt/blog/"},{"@type":"ListItem","position":3,"name":${JSON.stringify(art.h1)},"item":"${BASE}/pt/blog/${art.slug}/"}]},
{"@type":"FAQPage","mainEntity":[${faqSchema}]},
{"@type":"Organization","@id":"${BASE}/#org","name":"Paraíso de Aves","url":"${BASE}","email":"${EMAIL}"}
]}</script>`;
}

function generateBlogPage(art){
  return `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
  <title>${art.title}</title>
  <meta name="description" content="${art.metaDesc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${BASE}/pt/blog/${art.slug}/"/>
  <link rel="alternate" hreflang="pt-PT" href="${BASE}/pt/blog/${art.slug}/"/>
  <link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  <meta property="og:type" content="article"/>
  <meta property="og:locale" content="pt_PT"/>
  <meta property="og:title" content="${art.title}"/>
  <meta property="og:description" content="${art.metaDesc}"/>
  <meta property="og:url" content="${BASE}/pt/blog/${art.slug}/"/>
  <meta property="og:image" content="${BASE}/images/${art.ogImage}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${art.title}"/>
  <meta name="twitter:description" content="${art.metaDesc}"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>${baseCSS()}</style>
  ${blogSchemas(art)}
</head>
<body>
${ptNav('Blog')}
<section class="article-hero">
  <div style="max-width:900px;margin:0 auto;">
    <p class="badge">${art.badge}</p>
    <h1>${art.h1}</h1>
    <p class="meta">Por <strong>Paraíso de Aves</strong> · Publicado em 26 de Junho de 2026 · Leitura: ${art.readTime} min</p>
  </div>
</section>
<nav class="breadcrumb-bar" aria-label="Navegação estrutural">
  <div class="inner">
    <a href="${BASE}/pt/">Início</a><span>·</span>
    <a href="${BASE}/pt/blog/">Blog</a><span>·</span>
    <strong style="color:rgba(255,255,255,.9)">${art.h1}</strong>
  </div>
</nav>

<div class="article-wrap">
  <article class="article-body">

    <figure>
      <picture>
        <source srcset="${BASE}/images/${art.imgWebp}" type="image/webp"/>
        <img src="${BASE}/images/${art.imgJpg}" alt="${art.imgAlt}" width="860" height="340" loading="eager" style="width:100%;height:300px;object-fit:cover;border-radius:12px;"/>
      </picture>
      <figcaption>${art.imgCaption}</figcaption>
    </figure>

    ${art.bodyHTML}

    <h2>Perguntas Frequentes</h2>
    ${art.faqs.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('')}

    <div class="cta-box" style="margin-top:40px;">
      <h3>${art.ctaTitle}</h3>
      <p>${art.ctaText}</p>
      <a href="${BASE}/pt/papagaios-a-venda-portugal/" class="btn-gold">Ver Papagaios Disponíveis</a>
      <a href="${BASE}/pt/contacto/" class="btn-outline">Contactar</a>
    </div>

  </article>

  <aside class="sidebar">
    <div class="sidebar-card">
      <h4>Espécies à Venda</h4>
      <ul>
        <li><a href="${BASE}/pt/papagaio-cinzento/">Papagaio Cinzento Africano</a></li>
        <li><a href="${BASE}/pt/arara-jacinto/">Arara Jacinto</a></li>
        <li><a href="${BASE}/pt/arara-azul-e-amarela/">Arara Azul e Amarela</a></li>
        <li><a href="${BASE}/pt/cacatua-de-crista-amarela/">Cacatua de Crista Amarela</a></li>
        <li><a href="${BASE}/pt/papagaio-eclectus/">Papagaio Eclectus</a></li>
        <li><a href="${BASE}/pt/papagaio-amazona/">Papagaio Amazona</a></li>
        <li><a href="${BASE}/pt/conuro/">Conuro</a></li>
      </ul>
    </div>
    <div class="sidebar-card">
      <h4>Artigos Relacionados</h4>
      <ul>
        ${art.related.map(r=>`<li><a href="${BASE}/pt/blog/${r.slug}/">${r.label}</a></li>`).join('')}
      </ul>
    </div>
    <div class="sidebar-card">
      <h4>Cidades com Entrega</h4>
      <ul>
        <li><a href="${BASE}/pt/papagaios-a-venda-lisboa/">Lisboa</a></li>
        <li><a href="${BASE}/pt/papagaios-a-venda-porto/">Porto</a></li>
        <li><a href="${BASE}/pt/papagaios-a-venda-braga/">Braga</a></li>
        <li><a href="${BASE}/pt/papagaios-a-venda-faro/">Faro / Algarve</a></li>
        <li><a href="${BASE}/pt/papagaios-a-venda-coimbra/">Coimbra</a></li>
        <li><a href="${BASE}/pt/cidades/">Ver todas →</a></li>
      </ul>
    </div>
  </aside>
</div>
${ptFooter()}
</body>
</html>`;
}

/* ════════════════════════════════════════════════
   BLOG ARTICLES DATA
════════════════════════════════════════════════ */

const blogArticles = [

{
  slug:'papagaio-para-apartamento-em-portugal',
  title:'Papagaio para Apartamento em Portugal | Guia Completo 2026',
  metaDesc:'Qual o melhor papagaio para apartamento em Portugal? Guia completo com espécies recomendadas, nível de ruído, espaço necessário e requisitos legais CITES.',
  h1:'Papagaio para Apartamento em Portugal: Qual Escolher?',
  badge:'🏙️ GUIA PARA APARTAMENTO · PORTUGAL',
  readTime:8,
  ogImage:'conuro-01.webp',
  imgWebp:'conuro-01.webp',
  imgJpg:'conuro-01.jpg',
  imgAlt:'Conuro verde posado num poleiro dentro de um apartamento moderno com luz natural',
  imgCaption:'O conuro é uma das espécies mais adequadas para apartamento em Portugal',
  ctaTitle:'Pronto para Adoptar um Papagaio?',
  ctaText:'Temos espécies adequadas para apartamento com documentação CITES completa e entrega em todo Portugal.',
  related:[
    {slug:'melhores-papagaios-para-iniciantes',label:'Melhores para Iniciantes'},
    {slug:'quanto-custa-um-papagaio-em-portugal',label:'Quanto Custa?'},
    {slug:'documentacao-cites-portugal',label:'Documentação CITES'},
    {slug:'como-preparar-a-casa-para-um-papagaio',label:'Preparar a Casa'},
  ],
  faqs:[
    {q:'Qual o papagaio menos barulhento para apartamento?',a:'O conuro verde (Pyrrhura molinae) e o papagaio eclectus são os menos barulhentos entre os papagaios de tamanho médio. Entre os maiores, o papagaio cinzento africano tem um nível de ruído moderado.'},
    {q:'É possível ter uma arara num apartamento?',a:'É possível mas desafiante. As araras grandes são muito barulhentas e necessitam de muito espaço. Para apartamentos, são mais indicadas as araras menores (arara severa) ou espécies de menor porte.'},
    {q:'O vizinho pode reclamar do barulho do papagaio?',a:'Dependendo do regulamento de condomínio. Em Portugal, o ruído de animais de estimação é regulado pelos regulamentos municipais e condominiais. Um papagaio ruidoso pode gerar conflitos — escolha uma espécie com nível de ruído adequado ao seu contexto.'},
    {q:'Quantos metros quadrados são necessários para ter um papagaio em apartamento?',a:'Não existe um mínimo legal, mas a ave precisa de uma jaula adequada ao seu tamanho e de espaço para circular fora da jaula. Para um conuro, um apartamento T2 ou maior é suficiente. Para espécies maiores, T3+ é mais adequado.'},
    {q:'É necessária autorização do condomínio para ter um papagaio?',a:'Depende do regulamento do condomínio. A lei portuguesa permite geralmente a posse de animais de estimação, mas o ruído excessivo pode ser motivo de queixa. Verifique o regulamento do seu condomínio antes de adquirir.'},
  ],
  bodyHTML:`
    <p>A vida em apartamento é a realidade da maioria dos portugueses que habitam os grandes centros urbanos. Lisboa, Porto, Braga, Coimbra — em todas estas cidades, a maioria das famílias vive em apartamento. E, com crescente frequência, essas famílias questionam-se: <em>será possível ter um papagaio num apartamento?</em> A resposta é sim — mas a espécie escolhida faz toda a diferença.</p>
    <h2>Os Principais Factores a Considerar</h2>
    <p>Antes de escolher a espécie, avalie honestamente quatro factores críticos para a vida num apartamento:</p>
    <ul>
      <li><strong>Nível de ruído:</strong> As suas paredes têm espessura suficiente? Os seus vizinhos são tolerantes? Uma cacatua de crista amarela pode atingir 80–85 dB — audível através das paredes de muitos edifícios modernos.</li>
      <li><strong>Espaço disponível:</strong> Onde vai ficar a jaula? Tem espaço para a ave circular fora da gaiola em segurança? Uma arara grande necessita de uma jaula que ocupa o espaço de um móvel grande.</li>
      <li><strong>Tempo disponível:</strong> Trabalha longas horas? Um papagaio cinzento africano deixado sozinho durante 10 horas por dia pode desenvolver ansiedade de separação grave. Para tutores muito ocupados, considere espécies mais independentes ou adoptar em par.</li>
      <li><strong>Outros animais:</strong> Tem cão ou gato? A convivência entre papagaios e predadores naturais requer supervisão permanente e separação física quando o tutor não está presente.</li>
    </ul>
    <h2>As 5 Melhores Espécies para Apartamento em Portugal</h2>
    <h3>1. Conuro Verde (Pyrrhura molinae) — A Escolha de Excelência</h3>
    <p>O conuro verde da Patagónia é, provavelmente, a melhor combinação de personalidade e praticidade para apartamento em Portugal. Com apenas 25–28 cm de comprimento e peso de 60–80 g, é suficientemente pequeno para uma jaula compacta, tem um nível de ruído moderado (claramente inferior ao dos Aratinga) e é extremamente afectuoso com os tutores. Aprende algumas palavras, é brincalhão e activo, e adapta-se bem às rotinas domésticas típicas de um casal ou família jovem.</p>
    <h3>2. Papagaio Eclectus — O Mais Discreto dos Grandes</h3>
    <p>Para quem quer uma ave de maior dimensão num apartamento, o eclectus é uma surpresa agradável. Ao contrário da maioria dos papagaios de tamanho similar, o eclectus tem um temperamento sereno e um nível de ruído relativamente moderado. As suas vocalizações são geralmente suaves e musicais — nada comparado com uma arara ou uma cacatua. Uma jaula de 90×70 cm e um espaço de voo diário de 2 a 3 horas são suficientes para uma vida feliz num apartamento de dimensão média.</p>
    <h3>3. Papagaio Cinzento Africano — Para Tutores Dedicados</h3>
    <p>O yaco é possível em apartamento — desde que o tutor possa dedicar pelo menos 3 a 4 horas diárias de interacção directa. O nível de ruído é moderado (não é uma cacatua), mas a necessidade de atenção é muito elevada. Para quem trabalha em casa ou tem uma rotina com muito tempo doméstico, o yaco em apartamento pode funcionar muito bem. Para quem está fora 10 horas por dia, não é a escolha ideal.</p>
    <h3>4. Papagaio Amazona — Comunicativo e Adaptável</h3>
    <p>O amazona é uma ave extrovertida e comunicativa que, em apartamento, pode ser um companheiro excelente. O nível de ruído é mais elevado do que o eclectus mas inferior ao das araras grandes. Em apartamentos com boa isolação acústica — especialmente edifícios mais antigos com paredes espessas em Lisboa ou no Porto — o amazona vive confortavelmente. Necessita de 2 a 3 horas fora da gaiola por dia.</p>
    <h3>5. Periquito de Cauda Longa (Bourke ou Splendid) — Para Espaços Muito Pequenos</h3>
    <p>Para apartamentos muito pequenos (T0, T1) ou para tutores que preferem uma ave mais independente, os periquitos de cauda longa australianos são uma alternativa a considerar. São silenciosos, belos e de manutenção relativamente simples — embora não sejam tão interactivos como os psitacídeos maiores.</p>
    <h2>Espécies a Evitar em Apartamento</h2>
    <p>Algumas espécies, por mais atraentes que sejam, são verdadeiramente problemáticas em apartamento:</p>
    <ul>
      <li><strong>Cacatua de Crista Amarela:</strong> O nível de ruído pode ser extremo — 85+ dB em pico — e a necessidade de atenção constante é difícil de satisfazer para tutores que trabalham fora de casa.</li>
      <li><strong>Araras grandes (Ara ararauna, Ara macao):</strong> Excelentes aves mas inadequadas para a maioria dos apartamentos devido ao tamanho e ao ruído.</li>
      <li><strong>Arara Jacinto:</strong> A maior de todas as araras necessita de muito mais espaço do que qualquer apartamento pode oferecer de forma ética.</li>
    </ul>
    <h2>Requisitos Legais em Portugal para Papagaios em Apartamento</h2>
    <p>Em Portugal, a posse de papagaios de espécies protegidas pela CITES requer documentação específica. O ICNF (Instituto da Conservação da Natureza e das Florestas) é a autoridade nacional responsável pela fiscalização. Para qualquer papagaio de espécie exótica protegida, é obrigatório:</p>
    <ul>
      <li>Certificado CITES de origem (Apêndice I ou II, conforme a espécie)</li>
      <li>Anilha de identificação fechada colocada na cria pelo criador registado</li>
      <li>Certificado veterinário de saúde</li>
    </ul>
    <p>A compra de papagaios sem documentação CITES é crime ambiental em Portugal, independentemente de a ave viver num apartamento ou numa moradia. Adquira sempre de criador registado.</p>
    <h2>Preparar o Apartamento para um Papagaio</h2>
    <p>Antes da chegada da ave, tome estas precauções essenciais no apartamento:</p>
    <ul>
      <li><strong>Identifique e elimine riscos:</strong> Panelas de teflon (vapores letais para aves), velas, incensos, difusores de aroma, plantas tóxicas (lírio da paz, difenbaquia, azaléia)</li>
      <li><strong>Proteja janelas e varandas:</strong> Instale rede de protecção — uma ave assustada pode sair voando por uma janela aberta</li>
      <li><strong>Escolha a localização da jaula:</strong> Área de passagem frequente mas sem correntes de ar directas ou exposição solar intensa</li>
      <li><strong>Informe-se sobre os regulamentos do condomínio:</strong> Alguns condomínios têm regulamentos específicos sobre animais</li>
    </ul>
    <p>Com a espécie correcta e a preparação adequada, um papagaio em apartamento pode ser um dos companheiros mais satisfatórios e enriquecedores que uma família pode ter. A Paraíso de Aves pode ajudá-lo a fazer a escolha certa para o seu estilo de vida e contexto habitacional específico.</p>
  `,
},

{
  slug:'quanto-custa-um-papagaio-em-portugal',
  title:'Quanto Custa um Papagaio em Portugal? Guia de Preços 2026',
  metaDesc:'Quanto custa um papagaio em Portugal em 2026? Preços por espécie, custos de manutenção anual, CITES e custos ocultos. Guia completo do criador Paraíso de Aves.',
  h1:'Quanto Custa um Papagaio em Portugal? Guia Completo de Preços 2026',
  badge:'💰 GUIA DE PREÇOS · PORTUGAL 2026',
  readTime:9,
  ogImage:'loro-gris-01.webp',
  imgWebp:'loro-gris-01.webp',
  imgJpg:'loro-gris-01.jpg',
  imgAlt:'Papagaio cinzento africano com documentação CITES sobre mesa, representando o custo de aquisição de uma ave exótica em Portugal',
  imgCaption:'O custo de um papagaio em Portugal vai muito além do preço de compra — conheça todos os encargos',
  ctaTitle:'Quer saber o preço actual?',
  ctaText:'Os preços variam com a disponibilidade e a espécie. Contacte-nos para uma cotação actualizada com todos os custos incluídos.',
  related:[
    {slug:'documentacao-cites-portugal',label:'Documentação CITES Portugal'},
    {slug:'melhores-papagaios-para-iniciantes',label:'Melhores para Iniciantes'},
    {slug:'papagaio-para-apartamento-em-portugal',label:'Papagaio em Apartamento'},
    {slug:'como-escolher-um-criador-responsavel',label:'Como Escolher Criador'},
  ],
  faqs:[
    {q:'Qual o papagaio mais barato com CITES em Portugal?',a:'Os conuros e os periquitos de tamanho médio são geralmente as opções mais acessíveis entre os papagaios com documentação CITES. O papagaio amazona segue-se, com um preço médio superior.'},
    {q:'Porque é que os papagaios com CITES são mais caros?',a:'O custo da documentação CITES, dos registos de criação, das análises veterinárias e do transporte certificado eleva o preço das aves legais. Mas esta diferença de preço é também uma garantia de que a ave não foi capturada na natureza.'},
    {q:'Qual o custo anual de manutenção de um papagaio cinzento africano?',a:'Estima-se entre 800€ e 1.500€ por ano, incluindo alimentação de qualidade, consultas veterinárias anuais, brinquedos e poleiros. Em caso de doença, os custos veterinários podem ser significativamente superiores.'},
    {q:'Vale a pena comprar um papagaio barato sem documentação?',a:'Não. Além do risco legal (crime ambiental), uma ave sem documentação pode estar doente, mal socializada ou ser proveniente de captura ilegal. Os custos veterinários de recuperar uma ave em mau estado superam frequentemente a diferença de preço.'},
    {q:'O seguro de saúde animal cobre papagaios em Portugal?',a:'Alguns seguros de animais de companhia em Portugal cobrem aves exóticas, mas a oferta é limitada. Consulte as seguradoras especializadas — o custo de um seguro anual pode representar uma poupança significativa face a emergências veterinárias.'},
  ],
  bodyHTML:`
    <p>A pergunta "quanto custa um papagaio?" é uma das mais frequentes que recebemos. A resposta honesta é: depende muito da espécie — e o preço de compra é apenas uma parte do custo total de ter um papagaio. Neste guia completo, detalhamos os custos de aquisição por espécie, os custos de manutenção anuais e os "custos ocultos" que muitos tutores subestimam.</p>
    <h2>Preços de Aquisição por Espécie (Portugal, 2026)</h2>
    <p>Os preços abaixo referem-se a aves criadas à mão por criador registado, com documentação CITES completa, anilha de identificação e certificado veterinário. Aves sem documentação podem ser encontradas por preços inferiores mas representam um risco legal e sanitário que não recomendamos.</p>
    <div class="highlight-box">
      <strong>Nota importante:</strong> Todos os preços são indicativos e podem variar significativamente com a disponibilidade, a idade da ave e o nível de socialização. Contacte-nos para cotações actualizadas.
    </div>
    <h3>Conuro (Pyrrhura / Aratinga)</h3>
    <p>Preço de referência: <strong>300€ – 800€</strong>. O conuro é a opção mais acessível entre os papagaios com documentação CITES. O preço varia consoante a espécie — os conuros sol (Aratinga solstitialis) são significativamente mais caros que os conuros verdes (Pyrrhura molinae) devido à sua raridade e beleza excepcional.</p>
    <h3>Papagaio Amazona</h3>
    <p>Preço de referência: <strong>600€ – 1.500€</strong>. O preço varia muito com a espécie (existem mais de 30 espécies de amazona) e com a idade. Aves jovens e bem socializadas atingem os valores superiores desta gama.</p>
    <h3>Papagaio Eclectus</h3>
    <p>Preço de referência: <strong>800€ – 1.800€</strong>. O eclectus tem um preço intermédio-alto, justificado pela sua beleza única, temperamento equilibrado e raridade relativa nos criadores ibéricos.</p>
    <h3>Papagaio Cinzento Africano (Yaco)</h3>
    <p>Preço de referência: <strong>1.500€ – 3.500€</strong>. O yaco é uma das aves mais caras em Portugal, reflexo da sua extrema inteligência, longa longevidade e do facto de estar no Apêndice I da CITES. Os custos de documentação são mais elevados para Apêndice I.</p>
    <h3>Cacatua (várias espécies)</h3>
    <p>Preço de referência: <strong>800€ – 2.500€</strong>. O preço varia com a espécie — cacatua de cabeça nua é mais acessível; cacatua de crista amarela adulta bem socializada pode atingir os 2.500€.</p>
    <h3>Araras</h3>
    <p>Arara Azul e Amarela: <strong>2.000€ – 4.000€</strong>. Arara Escarlate: <strong>2.500€ – 5.000€</strong>. Arara Jacinto: <strong>8.000€ – 20.000€</strong>. As araras são as aves mais dispendiosas — a jacinto, pela sua raridade e estatuto CITES I, pode atingir valores muito elevados.</p>
    <h2>Custos de Manutenção Anuais</h2>
    <p>Além do preço de aquisição, estime os seguintes custos anuais:</p>
    <ul>
      <li><strong>Alimentação de qualidade:</strong> 200€ – 600€/ano (dependendo da espécie e do tipo de dieta — pellets + frutas + vegetais frescos)</li>
      <li><strong>Consulta veterinária anual:</strong> 60€ – 150€ (mais análises de sangue: 80€ – 200€)</li>
      <li><strong>Brinquedos e poleiros:</strong> 100€ – 300€/ano (renovação regular é essencial para estimulação)</li>
      <li><strong>Jaula e acessórios (amortização):</strong> 50€ – 200€/ano</li>
      <li><strong>Total estimado anual:</strong> 410€ – 1.250€ (sem contar com emergências)</li>
    </ul>
    <h2>Custos Ocultos Que Muitos Tutores Esquecem</h2>
    <ul>
      <li><strong>Emergências veterinárias:</strong> Uma consulta de urgência em Lisboa pode custar 150€ – 400€; cirurgia pode ultrapassar os 1.000€. Considere reservar um "fundo de emergência" para a ave.</li>
      <li><strong>Hospedagem durante férias:</strong> Nem todos os hotéis de animais aceitam aves exóticas. Uma boa hospedagem especializada pode custar 15€ – 40€/dia.</li>
      <li><strong>Adaptações da casa:</strong> Redes de protecção nas janelas, purificador de ar (especialmente para cacatuas), aquecimento ou arrefecimento adicional.</li>
      <li><strong>Custos de transporte inicial:</strong> A entrega de um papagaio em Portugal por transportadora especializada pode custar 50€ – 150€, dependendo da espécie e da distância.</li>
    </ul>
    <h2>Vale a Pena? A Perspectiva do Custo-Benefício</h2>
    <p>Um papagaio cinzento africano que viva 60 anos representa, ao longo da sua vida, um custo total de manutenção estimado entre 24.000€ e 75.000€ — sem contar com emergências veterinárias. É, de longe, o animal de estimação com maior custo de vida total de que muitas famílias tomam posse.</p>
    <p>Mas o que os números não capturam é a dimensão da relação — a inteligência de uma ave que aprende o seu nome, reconhece os seus humanos favoritos, comunica emoções e partilha 50 ou 60 anos de vida. Para quem está preparado para este compromisso, o valor é incalculável.</p>
    <p>A Paraíso de Aves recomenda sempre que, antes de adquirir um papagaio, se faça uma avaliação honesta do orçamento disponível — tanto para a aquisição como para a manutenção ao longo da vida da ave.</p>
  `,
},

{
  slug:'como-escolher-um-criador-responsavel',
  title:'Como Escolher um Criador de Papagaios Responsável em Portugal | Guia',
  metaDesc:'Como identificar um criador de papagaios responsável em Portugal? 10 sinais de alerta e 8 questões obrigatórias a fazer. Guia completo com critérios CITES.',
  h1:'Como Escolher um Criador de Papagaios Responsável em Portugal',
  badge:'✅ GUIA DE COMPRA SEGURA · PORTUGAL',
  readTime:8,
  ogImage:'loro-gris-02.webp',
  imgWebp:'loro-gris-02.webp',
  imgJpg:'loro-gris-02.jpg',
  imgAlt:'Criador de papagaios a segurar um papagaio cinzento jovem com documentação CITES visível em segundo plano',
  imgCaption:'Um criador responsável mostra sempre a documentação CITES completa sem hesitação',
  ctaTitle:'A Paraíso de Aves é um Criador Registado',
  ctaText:'Com 25+ anos de experiência, documentação CITES completa e acompanhamento pós-venda. Conheça os nossos papagaios disponíveis.',
  related:[
    {slug:'documentacao-cites-portugal',label:'Documentação CITES Portugal'},
    {slug:'quanto-custa-um-papagaio-em-portugal',label:'Quanto Custa?'},
    {slug:'melhores-papagaios-para-iniciantes',label:'Melhores para Iniciantes'},
    {slug:'papagaio-para-apartamento-em-portugal',label:'Papagaio em Apartamento'},
  ],
  faqs:[
    {q:'Posso verificar se um criador é legítimo em Portugal?',a:'Sim. Pode contactar o ICNF (Instituto da Conservação da Natureza e das Florestas) para verificar se um estabelecimento de criação está registado. Para criadores europeus fora de Portugal, a documentação CITES é o principal critério de verificação.'},
    {q:'O que é um "criador registado"?',a:'É um estabelecimento de criação de espécies protegidas formalmente registado junto às autoridades competentes do seu país — em Portugal, o ICNF; em Espanha, o MITERD. O registo é obrigatório para qualquer criador que comercialize espécies CITES.'},
    {q:'É seguro comprar um papagaio online em Portugal?',a:'Pode ser, se o criador for verificável, fornecer documentação CITES completa e tiver referências de clientes anteriores. A venda online por si só não é um problema — o problema é a ausência de documentação legal e rastreabilidade.'},
    {q:'Um criador sem website é necessariamente suspeito?',a:'Não. Alguns criadores de qualidade operam sem website elaborado. O critério principal é a documentação legal — CITES, registo do estabelecimento, anilha de identificação — não a presença digital.'},
    {q:'O que acontece se comprar um papagaio a um vendedor não registado?',a:'A ave pode ser apreendida pelas autoridades, e o comprador pode ser responsabilizado. Mesmo sem intenção dolosa, a posse de um animal CITES sem documentação válida é crime ambiental em Portugal.'},
  ],
  bodyHTML:`
    <p>Comprar um papagaio em Portugal pode ser uma experiência extraordinária — ou um pesadelo legal e emocional, dependendo do criador que escolher. Neste guia, ensinamos a distinguir um criador responsável e registado de um vendedor sem escrúpulos que opera no mercado paralelo.</p>
    <h2>Os 8 Critérios de um Criador Responsável</h2>
    <h3>1. Estabelecimento Registado junto às Autoridades</h3>
    <p>Um criador legítimo tem o seu estabelecimento de criação formalmente registado junto às autoridades competentes. Em Portugal, o ICNF é a entidade responsável. Para criadores espanhóis (como a Paraíso de Aves), o registo é feito junto ao MITERD (Ministério de Transición Ecológica). Peça o número de registo — um criador responsável fornece-o sem hesitação.</p>
    <h3>2. Documentação CITES Completa e Verificável</h3>
    <p>Para qualquer espécie protegida pela CITES (que inclui praticamente todos os papagaios de médio e grande porte), o criador deve fornecer o certificado CITES correspondente ao exemplar específico. Este certificado identifica a ave individualmente, indica a sua origem e é emitido pela autoridade competente. Nunca aceite "documentação em preparação" — a CITES deve acompanhar a ave desde a entrega.</p>
    <h3>3. Anilha de Identificação Fechada</h3>
    <p>Todos os exemplares criados em cativeiro devem ter uma anilha de identificação fechada na pata, colocada enquanto a cria é ainda muito jovem (impossível de colocar num adulto sem fracturar a pata). A anilha tem um código único que identifica o criador e o ano de nascimento. A ausência de anilha é um sinal de alerta sério.</p>
    <h3>4. Aves Criadas à Mão e Socializadas</h3>
    <p>Um criador responsável cria os seus filhotes à mão desde muito jovens, habituando-os ao contacto humano diário. Uma ave criada à mão é visivelmente mais confiante, menos assustada e mais fácil de manusear. Observe o comportamento da ave perante o criador — se este a toca e ela reage com calma, é um bom sinal.</p>
    <h3>5. Instalações Limpas e Bem Mantidas</h3>
    <p>Se visitar o criadeiro — o que recomendamos sempre que possível — verifique as condições das instalações: jaulas limpas, água fresca disponível, alimentação de qualidade, sem sinais de doença ou sofrimento. Um criador que não permite visitas é, por si só, motivo de desconfiança.</p>
    <h3>6. Certificado Veterinário de Saúde</h3>
    <p>Além da CITES, um criador responsável fornece um certificado veterinário actualizado atestando o estado de saúde da ave. Este certificado deve ser emitido por um médico veterinário e ter uma data recente (idealmente da semana anterior à entrega).</p>
    <h3>7. Apoio Pós-Venda</h3>
    <p>A relação com o criador não termina na entrega. Um criador responsável mantém-se disponível para responder a questões sobre alimentação, comportamento e saúde da ave. Pergunte antes de comprar: "Posso contactá-lo depois da entrega se tiver dúvidas?"</p>
    <h3>8. Transparência sobre Preços e Disponibilidade</h3>
    <p>Um criador honesto é transparente sobre preços, prazos de disponibilidade e sobre o que está e não está incluído no preço (documentação, transporte, caixa IATA). Desconfie de preços muito abaixo do mercado — frequentemente indicam ausência de documentação ou aves em mau estado de saúde.</p>
    <h2>10 Sinais de Alerta — Fuja!</h2>
    <ol>
      <li>Recusa em mostrar documentação CITES antes do pagamento</li>
      <li>Anilha ausente ou aberta (colocada artificialmente)</li>
      <li>Não fornece número de registo do estabelecimento</li>
      <li>Preço muito abaixo do mercado sem explicação plausível</li>
      <li>Venda exclusivamente por mensagem, sem possibilidade de videochamada</li>
      <li>Recusa de visita ao criadeiro</li>
      <li>Documentação "a chegar" — disponível apenas após o pagamento</li>
      <li>Aves com sinais evidentes de mau estado (penas sujas, olhos fechados, letargia)</li>
      <li>Sem referências verificáveis de clientes anteriores</li>
      <li>Pressão para decisão imediata ("tenho outros interessados")</li>
    </ol>
    <h2>As 8 Questões Obrigatórias a Fazer ao Criador</h2>
    <ol>
      <li>Qual o número de registo do seu estabelecimento de criação?</li>
      <li>Pode mostrar-me o certificado CITES deste exemplar específico?</li>
      <li>A ave tem anilha fechada? Posso ver o código?</li>
      <li>Posso visitar o criadeiro ou fazer uma videochamada?</li>
      <li>A ave tem certificado veterinário actualizado?</li>
      <li>A ave está criada à mão? Desde que idade?</li>
      <li>O preço inclui transporte e caixa IATA?</li>
      <li>Posso contactá-lo após a entrega se tiver dúvidas?</li>
    </ol>
    <p>Um criador responsável responde a todas estas questões sem hesitação. A Paraíso de Aves disponibiliza toda esta informação a qualquer potencial cliente antes de qualquer compromisso comercial.</p>
  `,
},

{
  slug:'documentacao-cites-portugal',
  title:'Documentação CITES em Portugal: Guia Completo 2026',
  metaDesc:'Tudo sobre a documentação CITES para papagaios em Portugal. O que é, como verificar, o que pedir ao criador e as obrigações legais do tutor. Guia actualizado 2026.',
  h1:'Documentação CITES para Papagaios em Portugal: O Guia Definitivo',
  badge:'📋 CITES PORTUGAL · GUIA LEGAL 2026',
  readTime:10,
  ogImage:'huevos-fertiles-01.webp',
  imgWebp:'huevos-fertiles-01.webp',
  imgJpg:'huevos-fertiles-01.jpg',
  imgAlt:'Documentação CITES de papagaio com anilha de identificação visível — certificado obrigatório em Portugal',
  imgCaption:'A documentação CITES é obrigatória para a posse de papagaios protegidos em Portugal',
  ctaTitle:'Todos os Nossos Papagaios têm CITES Completo',
  ctaText:'Documentação legal, reconhecida em toda a UE, incluída sem custos adicionais em cada ave da Paraíso de Aves.',
  related:[
    {slug:'como-escolher-um-criador-responsavel',label:'Como Escolher Criador'},
    {slug:'quanto-custa-um-papagaio-em-portugal',label:'Custos em Portugal'},
    {slug:'melhores-papagaios-para-iniciantes',label:'Para Iniciantes'},
    {slug:'arara-jacinto-guia-completo',label:'Arara Jacinto: Guia Completo'},
  ],
  faqs:[
    {q:'O que é a CITES e porque existe?',a:'A CITES (Convenção sobre o Comércio Internacional das Espécies da Fauna e Flora Selvagens Ameaçadas de Extinção) é um tratado internacional assinado por 183 países que regula o comércio de espécies ameaçadas para evitar que o comércio contribua para a sua extinção. Foi criada em 1963 e entrou em vigor em 1975.'},
    {q:'É obrigatória a documentação CITES para papagaios de estimação em Portugal?',a:'Sim. Para todas as espécies listadas nos Apêndices I ou II da CITES — que incluem praticamente todos os papagaios de médio e grande porte — a documentação é obrigatória em Portugal, como em toda a UE.'},
    {q:'Posso perder a minha ave se não tiver CITES?',a:'Sim. As autoridades portuguesas (ICNF, GNR, SEPNA) têm poder para apreender aves sem documentação CITES válida. O tutor pode ainda ser sujeito a processo contraordenacional com coimas elevadas.'},
    {q:'A CITES tem prazo de validade?',a:'O certificado CITES emitido para uma ave específica (nascimento em cativeiro) não tem prazo de validade enquanto a ave estiver em posse do primeiro detentor legal. Para transacções comerciais subsequentes, podem ser necessários novos documentos.'},
    {q:'Como verifico se o CITES que recebi é autêntico?',a:'Contacte o ICNF (Instituto da Conservação da Natureza e das Florestas) com o número do certificado. Para certificados emitidos em Espanha, a autoridade de verificação é o MITERD. Um certificado autêntico tem sempre um número único, data de emissão, dados da espécie e do detentor.'},
  ],
  bodyHTML:`
    <p>A Convenção sobre o Comércio Internacional das Espécies da Fauna e Flora Selvagens Ameaçadas de Extinção — universalmente conhecida pela sigla CITES — é o enquadramento legal que regula o comércio de espécies protegidas em todo o mundo, incluindo a grande maioria dos papagaios de médio e grande porte. Em Portugal, compreender a CITES não é apenas uma questão legal — é um dever ético de qualquer tutor responsável.</p>
    <h2>O Que é a CITES e Como Funciona</h2>
    <p>A CITES organiza as espécies protegidas em três apêndices, com diferentes níveis de restrição ao comércio:</p>
    <ul>
      <li><strong>Apêndice I:</strong> Espécies ameaçadas de extinção. O comércio comercial internacional é proibido, excepto em circunstâncias excepcionais (ex. criação em cativeiro com fins de conservação). Inclui o papagaio cinzento africano, a arara jacinto, a arara escarlate e várias espécies de amazona raras.</li>
      <li><strong>Apêndice II:</strong> Espécies não necessariamente ameaçadas mas cujo comércio deve ser controlado para evitar ameaça à sobrevivência. Inclui a maioria das araras comuns (azul e amarela), as cacatuas e muitas espécies de amazona.</li>
      <li><strong>Apêndice III:</strong> Espécies protegidas em pelo menos um país que solicitou assistência internacional para o controlo do seu comércio. Menos relevante para os papagaios comuns em Portugal.</li>
    </ul>
    <h2>Documentação CITES Exigida em Portugal</h2>
    <p>Para a posse legal de um papagaio de espécie protegida em Portugal, o tutor deve dispor de:</p>
    <h3>Para Espécies do Apêndice II</h3>
    <ul>
      <li><strong>Certificado CITES de nascimento em cativeiro</strong> (emitido pela autoridade do país do criador — em Espanha, o MITERD)</li>
      <li><strong>Anilha de identificação fechada</strong> com número único</li>
      <li><strong>Factura ou documento de compra</strong> do criador registado</li>
    </ul>
    <h3>Para Espécies do Apêndice I</h3>
    <ul>
      <li>Todos os documentos acima, mais:</li>
      <li><strong>Licença de importação</strong> da autoridade portuguesa (ICNF) — necessária para a transferência internacional de espécies Apêndice I</li>
      <li><strong>Certificado de exportação</strong> da autoridade do país de origem</li>
    </ul>
    <h2>A Anilha de Identificação — Porquê é Crucial</h2>
    <p>A anilha de identificação fechada é o elemento físico que vincula um animal específico aos seus documentos CITES. Sem anilha, é impossível provar que a ave em questão é a mesma que consta nos documentos. Por isso, nunca aceite uma ave sem anilha, e verifique sempre se a anilha está fechada (colocada quando a cria era muito jovem) — uma anilha aberta foi colocada artificialmente e pode ser indício de falsificação.</p>
    <h2>O ICNF — A Autoridade Portuguesa da CITES</h2>
    <p>Em Portugal, o ICNF (Instituto da Conservação da Natureza e das Florestas) é a Autoridade de Gestão da CITES. As suas funções incluem:</p>
    <ul>
      <li>Emissão de certificados CITES para aves nascidas em Portugal</li>
      <li>Verificação e reconhecimento de documentação CITES de outros países da UE</li>
      <li>Fiscalização do comércio de espécies protegidas em território nacional</li>
      <li>Coordenação com a GNR/SEPNA nas operações de fiscalização</li>
    </ul>
    <h2>Transferência de Propriedade e CITES</h2>
    <p>Se adquirir uma ave de Apêndice II de um criador europeu, o certificado CITES original acompanha a ave e não precisa de ser "transferido" para uso doméstico. No entanto, se pretender revender a ave no futuro, pode ser necessária documentação adicional — consulte o ICNF para os requisitos específicos.</p>
    <p>Para aves de Apêndice I, as regras são mais restritivas. Qualquer transferência de propriedade intracomunitária pode requerer documentação adicional. Recomendamos consultar sempre um veterinário especializado em aves exóticas ou directamente o ICNF antes de qualquer transacção envolvendo espécies Apêndice I.</p>
    <h2>Consequências da Ausência de Documentação</h2>
    <p>Em Portugal, a posse de um animal CITES sem documentação válida é punida ao abrigo da lei de crimes ambientais (Lei n.º 52/2019 e legislação comunitária). As sanções podem incluir:</p>
    <ul>
      <li>Apreensão imediata da ave</li>
      <li>Coimas que podem atingir dezenas de milhares de euros</li>
      <li>Em casos de tráfico intencional, responsabilidade penal</li>
    </ul>
    <p>A Paraíso de Aves fornece sempre toda a documentação CITES necessária e legalmente exigida, sem custos adicionais. É a nossa forma de garantir que cada ave que sai do nosso criadeiro tem o melhor começo possível na sua nova vida.</p>
  `,
},

{
  slug:'melhores-papagaios-para-iniciantes',
  title:'Melhores Papagaios para Iniciantes em Portugal | Guia 2026',
  metaDesc:'Qual o melhor papagaio para quem nunca teve aves? Top 5 espécies para iniciantes em Portugal — fáceis de criar, afectuosas e com CITES disponível. Guia completo.',
  h1:'Os 5 Melhores Papagaios para Iniciantes em Portugal',
  badge:'🌟 GUIA PARA INICIANTES · PORTUGAL',
  readTime:7,
  ogImage:'conuro-02.webp',
  imgWebp:'conuro-02.webp',
  imgJpg:'conuro-02.jpg',
  imgAlt:'Conuro verde brincalhão posado no ombro de uma pessoa jovem em casa',
  imgCaption:'O conuro verde é frequentemente recomendado como primeira ave para tutores iniciantes',
  ctaTitle:'Encontre o Seu Primeiro Papagaio',
  ctaText:'Temos espécies adequadas para iniciantes com CITES completo e apoio especializado para novos tutores.',
  related:[
    {slug:'papagaio-para-apartamento-em-portugal',label:'Papagaio em Apartamento'},
    {slug:'quanto-custa-um-papagaio-em-portugal',label:'Quanto Custa?'},
    {slug:'como-escolher-um-criador-responsavel',label:'Como Escolher Criador'},
    {slug:'alimentacao-correta-dos-papagaios',label:'Alimentação Correcta'},
  ],
  faqs:[
    {q:'Com que espécie deve um iniciante começar?',a:'Para a maioria dos iniciantes, um conuro (Pyrrhura ou Aratinga pequeno), um papagaio amazona jovem ou um eclectus são as melhores escolhas. Oferecem uma boa combinação de afectividade, nível de exigência moderado e longevidade razoável.'},
    {q:'Um periquito é uma boa opção para iniciantes?',a:'Sim, especialmente para quem tem dúvidas sobre o compromisso a longo prazo. Os periquitos comuns e ondulados são muito mais fáceis de manter e requerem menos atenção do que os psitacídeos maiores. São um excelente "campo de treino" para quem pensa evoluir para espécies maiores.'},
    {q:'O papagaio cinzento africano é adequado para iniciantes?',a:'Geralmente não. O yaco é uma das espécies mais exigentes em termos de cuidados emocionais e estimulação. É mais indicado para tutores com experiência prévia em psitacídeos. Para iniciantes muito motivados e com muito tempo disponível, pode funcionar — mas recomendamos começar por uma espécie menos exigente.'},
    {q:'Qual a melhor espécie para uma criança de 12 anos?',a:'Um conuro verde (Pyrrhura) bem socializado é uma excelente opção para adolescentes responsáveis. É suficientemente robusto para lidar com a interacção de um jovem mas suficientemente pequeno para ser manejável em segurança.'},
    {q:'É difícil manter um papagaio amazona?',a:'Para tutores iniciantes com algum tempo disponível e disposição para aprender, o amazona jovem bem socializado é uma das espécies mais gratificantes. Requer alguma experiência para gerir a fase de maturidade sexual, mas com as orientações correctas é acessível.'},
  ],
  bodyHTML:`
    <p>A decisão de adoptar o primeiro papagaio é uma das mais emocionantes e, ao mesmo tempo, das mais responsáveis que um amante de aves pode tomar. Escolher a espécie errada pode resultar numa relação frustrante para o tutor e stressante para a ave — enquanto a escolha certa pode criar um vínculo para a vida inteira. Neste guia, ajudamo-lo a encontrar a espécie perfeita para o seu primeiro papagaio em Portugal.</p>
    <h2>O Que Torna Uma Espécie Ideal para Iniciantes?</h2>
    <p>Uma boa espécie para iniciantes tem geralmente estas características:</p>
    <ul>
      <li><strong>Temperamento equilibrado:</strong> Não demasiado sensível a erros de maneio dos tutores menos experientes</li>
      <li><strong>Nível de exigência moderado:</strong> Não requer 6 horas de atenção diária para ser feliz</li>
      <li><strong>Robustez sanitária:</strong> Não está sujeita a doenças raras ou tratamentos específicos difíceis de encontrar</li>
      <li><strong>Tamanho manejável:</strong> Um papagaio de 1,5 kg pode causar lesões sérias se se sentir ameaçado — espécies menores são mais seguras para iniciantes</li>
      <li><strong>Preço e longevidade razoáveis:</strong> Um compromisso de 60 anos é um salto para quem nunca teve uma ave</li>
    </ul>
    <h2>O Top 5 de Espécies para Iniciantes em Portugal</h2>
    <h3>1. Conuro Verde da Patagónia (Pyrrhura molinae) — O Melhor para Começar</h3>
    <p>O conuro verde é, de forma consistente, a nossa primeira recomendação para tutores iniciantes. Com um tamanho pequeno (25 cm, ~80g), temperamento afectuoso mas não excessivamente dependente, nível de ruído moderado e esperança de vida de 20–25 anos, representa o ponto de entrada ideal no mundo dos psitacídeos. Aprende algumas palavras, adora brincar e socializar, e é suficientemente robusto para tolerar os erros inevitáveis de um tutor em aprendizagem.</p>
    <h3>2. Papagaio Amazona Jovem — Comunicativo e Sociável</h3>
    <p>Um amazona jovem (menos de 1 ano) bem socializado é uma excelente escolha para iniciantes com disponibilidade moderada. A sua natureza extrovertida facilita a criação de um vínculo rápido, a capacidade verbal é muito gratificante para tutores novos, e o temperamento é geralmente previsível no primeiro ano de vida. Atenção: a fase de maturidade sexual (5–10 anos) pode ser desafiante e requer consistência.</p>
    <h3>3. Papagaio Eclectus — O Mais Calmo dos Médios</h3>
    <p>Para quem procura uma ave de maior dimensão com temperamento mais calmo e nível de ruído moderado, o eclectus é uma escolha excelente. A principal ressalva é a dieta específica (base de frutas e vegetais frescos, sem pellets com corantes artificiais) — quem está disposto a dedicar atenção à alimentação tem nesta espécie um companheiro extraordinário.</p>
    <h3>4. Cacatua de Cabeça Nua — Mais Equilibrada que a Crista Amarela</h3>
    <p>Para iniciantes que sonham com uma cacatua mas receiam a exigência extrema da crista amarela, a cacatua de cabeça nua é um excelente compromisso. Mais pequena, menos ruidosa e com menor dependência emocional, é uma espécie muito mais acessível para tutores sem experiência prévia em cacatuas.</p>
    <h3>5. Conuro Sol (Aratinga solstitialis) — Espectacular mas Mais Ruidoso</h3>
    <p>Se a beleza das cores é uma prioridade e o ruído não é um problema (moradia ou apartamento com boa isolação), o conuro sol é uma opção deslumbrante para iniciantes. As suas cores amarelas e laranjas são absolutamente espectaculares, e o temperamento é geralmente muito sociável e brincalhão.</p>
    <h2>Espécies a Evitar Como Primeira Ave</h2>
    <ul>
      <li><strong>Papagaio Cinzento Africano (Yaco):</strong> Exigência emocional extrema; muito sensível a erros de maneio</li>
      <li><strong>Cacatua de Crista Amarela:</strong> Nível de dependência emocional incompatível com tutores muito ocupados ou inexperientes</li>
      <li><strong>Araras grandes:</strong> Tamanho, custo e exigência superiores ao que a maioria dos iniciantes está preparada para gerir</li>
    </ul>
    <h2>O Que Preparar Antes de Adoptar o Primeiro Papagaio</h2>
    <ul>
      <li>Leia pelo menos dois livros sobre a espécie escolhida</li>
      <li>Identifique um veterinário especializado em aves exóticas na sua área</li>
      <li>Prepare a jaula, poleiros e brinquedos antes da chegada</li>
      <li>Verifique a sua casa para riscos: plantas tóxicas, teflon, correntes de ar</li>
      <li>Discuta o compromisso com toda a família — a ave vai viver durante décadas</li>
    </ul>
    <p>A Paraíso de Aves fornece orientação personalizada a todos os novos tutores — antes e depois da adopção. Se estiver a considerar o seu primeiro papagaio, contacte-nos e ajudamo-lo a encontrar a espécie certa para o seu estilo de vida.</p>
  `,
},

{
  slug:'papagaio-cinzento-vs-eclectus',
  title:'Papagaio Cinzento vs Eclectus: Qual Escolher? | Comparação Completa',
  metaDesc:'Papagaio cinzento africano ou eclectus? Comparação completa de inteligência, temperamento, cuidados, custo e adequação para Portugal. Qual é o certo para si?',
  h1:'Papagaio Cinzento Africano vs Papagaio Eclectus: Comparação Definitiva',
  badge:'⚖️ COMPARAÇÃO DE ESPÉCIES · GUIA 2026',
  readTime:9,
  ogImage:'eclectus-01.webp',
  imgWebp:'eclectus-01.webp',
  imgJpg:'eclectus-01.jpg',
  imgAlt:'Comparação entre papagaio cinzento africano e papagaio eclectus — duas das espécies mais populares em Portugal',
  imgCaption:'Papagaio Eclectus (esquerda representativo) vs Papagaio Cinzento — duas personalidades muito distintas',
  ctaTitle:'Escolheu a Sua Espécie?',
  ctaText:'Temos papagaios cinzentos e eclectus disponíveis com CITES completo e entrega em todo Portugal.',
  related:[
    {slug:'melhores-papagaios-para-iniciantes',label:'Para Iniciantes'},
    {slug:'quanto-custa-um-papagaio-em-portugal',label:'Quanto Custa?'},
    {slug:'arara-jacinto-guia-completo',label:'Arara Jacinto: Guia'},
    {slug:'documentacao-cites-portugal',label:'CITES Portugal'},
  ],
  faqs:[
    {q:'Qual é mais inteligente, o cinzento ou o eclectus?',a:'O papagaio cinzento africano é geralmente considerado o mais inteligente dos dois — e de todos os psitacídeos. A sua capacidade de compreensão conceptual e vocabulário activo são notavelmente superiores. O eclectus é inteligente mas de uma forma mais contemplativa e menos verbalmente expressiva.'},
    {q:'Qual é mais fácil de manter para um iniciante?',a:'O eclectus é geralmente considerado mais acessível para iniciantes do ponto de vista do temperamento — é menos sensível e menos propenso a ansiedade de separação. No entanto, a sua dieta específica requer mais investigação. O yaco é mais exigente em termos emocionais.'},
    {q:'Qual vive mais tempo?',a:'O papagaio cinzento africano pode viver 50 a 70 anos em cativeiro. O eclectus tem uma esperança de vida de 30 a 50 anos. Ambos são compromissos de longo prazo muito significativos.'},
    {q:'Qual é mais adequado para apartamento?',a:'O eclectus tem vantagem em apartamento — nível de ruído moderado, temperamento mais calmo e necessidade de atenção ligeiramente inferior. O yaco também pode viver em apartamento mas requer mais horas de interacção directa.'},
    {q:'Posso ter ambas as espécies juntas?',a:'É possível mas não recomendável para iniciantes. Cada espécie tem necessidades muito específicas e a introdução de uma nova ave requer um processo cuidadoso de quarentena e socialização gradual.'},
  ],
  bodyHTML:`
    <p>O papagaio cinzento africano e o papagaio eclectus são duas das espécies mais fascinantes e procuradas em Portugal. Ambos são aves de grande qualidade, com longevidade elevada e capacidade de criar laços profundos com os tutores — mas têm personalidades, necessidades e características muito distintas. Este guia ajuda-o a perceber qual deles é a escolha certa para o seu estilo de vida.</p>
    <h2>Aspecto Visual</h2>
    <p>O <strong>papagaio cinzento africano</strong> tem uma aparência discreta mas elegante: plumagem cinzenta uniforme com cauda vermelha viva e uma expressão inteligente nos olhos amarelos. É uma ave que impressiona mais pela inteligência do que pela cor.</p>
    <p>O <strong>papagaio eclectus</strong> é visualmente espectacular e imediatamente reconhecível pelo seu dimorfismo sexual extremo: o macho tem plumagem verde-esmeralda intensa com bico laranja; a fêmea tem plumagem vermelho vivo com manchas azuis e bico preto. As duas cores são tão diferentes que foram classificadas como espécies distintas durante décadas.</p>
    <h2>Inteligência e Capacidade Verbal</h2>
    <p>O yaco é, por ampla margem, o vencedor nesta categoria. Considerado o papagaio mais inteligente do mundo, tem capacidade de compreensão conceptual, vocabulário activo de centenas de palavras e capacidade de usar frases em contexto de forma genuinamente comunicativa. A investigação académica documentou yacos a responder correctamente a questões abstractas sobre "igual", "diferente", "mais" e "menos".</p>
    <p>O eclectus é inteligente mas expressa-se de forma diferente — mais através da observação e da linguagem corporal do que da vocalização verbal. Aprende palavras com facilidade mas raramente desenvolve vocabulários tão extensos como o yaco.</p>
    <h2>Temperamento e Necessidades Emocionais</h2>
    <p>O <strong>yaco</strong> é emotivamente complexo. Cria laços profundos e permanentes com os tutores, mas pode desenvolver ansiedade de separação severa se não receber atenção suficiente. É sensível a mudanças de rotina, a conflitos domésticos e a inconsistências no comportamento dos tutores. Exige presença emocional constante.</p>
    <p>O <strong>eclectus</strong> tem um temperamento mais sereno e menos dependente. Aprecia a companhia humana mas tolera melhor períodos de menor atenção. Prefere ambientes estáveis e rotinas previsíveis, mas não "colapsa" com as inevitáveis variações do quotidiano doméstico.</p>
    <h2>Alimentação — Uma Diferença Crucial</h2>
    <p>O yaco adapta-se relativamente bem a uma dieta mista de pellets, frutas e vegetais. É uma espécie omnívora generalista com menor sensibilidade a aditivos alimentares.</p>
    <p>O eclectus requer uma dieta específica baseada em <strong>frutas e vegetais frescos</strong> (70–80% da dieta). O seu tracto digestivo longo não é bem adaptado a dietas com pellets como base principal. Além disso, o eclectus é muito sensível a corantes e vitaminas artificiais — que podem causar hipertricose (crescimento anormal das penas). Esta especificidade alimentar é o principal desafio do eclectus para tutores iniciantes.</p>
    <h2>Nível de Ruído</h2>
    <p>Ambas as espécies têm nível de ruído moderado em comparação com araras ou cacatuas. O yaco tem vocalizações variadas e pode imitar qualquer som com precisão assustadora. O eclectus tem vocalizações mais suaves e musicais. Para apartamentos, ambos são razoavelmente adequados — desde que o tutor compreenda que "moderado" ainda significa audível para vizinhos próximos.</p>
    <h2>Custo de Aquisição e Manutenção</h2>
    <p>O yaco (Apêndice I da CITES) é geralmente mais caro do que o eclectus (Apêndice II) — tanto em termos de preço de aquisição como de documentação. A longevidade superior do yaco implica também um custo de manutenção total ao longo da vida significativamente superior.</p>
    <h2>Veredicto: Qual Escolher?</h2>
    <ul>
      <li>Escolha o <strong>papagaio cinzento africano</strong> se: quer a ave mais inteligente do mundo, tem muito tempo para interacção diária, aprecia uma relação profunda e exclusiva e está preparado para um compromisso de 50+ anos.</li>
      <li>Escolha o <strong>papagaio eclectus</strong> se: quer uma ave visualmente espectacular com temperamento equilibrado, está disposto a aprender a sua dieta específica e prefere uma espécie menos emotivamente exigente.</li>
    </ul>
  `,
},

{
  slug:'arara-jacinto-guia-completo',
  title:'Arara Jacinto: Guia Completo para Portugal | Cuidados, CITES e Preço',
  metaDesc:'Guia completo da arara jacinto em Portugal: características, cuidados, alimentação, CITES, preço e como adoptar. A maior arara do mundo — tudo o que precisa de saber.',
  h1:'Arara Jacinto em Portugal: Guia Completo 2026',
  badge:'💙 ARARA JACINTO · GUIA COMPLETO PORTUGAL',
  readTime:11,
  ogImage:'guacamayo-jacinto-01.webp',
  imgWebp:'guacamayo-jacinto-01.webp',
  imgJpg:'guacamayo-jacinto-01.jpg',
  imgAlt:'Arara jacinto com plumagem azul cobalto intensa em ambiente natural, mostrando o anel ocular amarelo característico da espécie',
  imgCaption:'Arara Jacinto (Anodorhynchus hyacinthinus) — A maior e mais impressionante arara do mundo',
  ctaTitle:'Interessado numa Arara Jacinto?',
  ctaText:'A Paraíso de Aves tem araras jacinto disponíveis com CITES I completo e entrega em todo Portugal. A disponibilidade é limitada — contacte-nos com antecedência.',
  related:[
    {slug:'papagaio-cinzento-vs-eclectus',label:'Cinzento vs Eclectus'},
    {slug:'documentacao-cites-portugal',label:'CITES Portugal'},
    {slug:'quanto-custa-um-papagaio-em-portugal',label:'Quanto Custa?'},
    {slug:'como-escolher-um-criador-responsavel',label:'Como Escolher Criador'},
  ],
  faqs:[
    {q:'Quanto custa uma arara jacinto em Portugal?',a:'O preço de uma arara jacinto criada à mão com documentação CITES I completa em Portugal é significativo. Contacte a Paraíso de Aves para uma cotação actualizada — os preços variam com a disponibilidade e a idade da ave.'},
    {q:'A arara jacinto pode viver em apartamento?',a:'Não é recomendado. A arara jacinto é a maior de todas as araras e necessita de muito espaço. Requer pelo menos um aviário grande ou uma divisão dedicada da casa. Apartamentos convencionais não oferecem espaço suficiente para esta espécie.'},
    {q:'Quanto vive uma arara jacinto em cativeiro?',a:'Com cuidados adequados, pode viver entre 50 e 60 anos. Existem registos de exemplares que ultrapassaram os 70 anos em condições excepcionais de cuidado.'},
    {q:'A arara jacinto come nozes de macadâmia?',a:'Sim. As nozes de macadâmia são um componente essencial da dieta da arara jacinto em cativeiro, espelhando a sua dieta natural de palmeiras. Devem representar 30–40% da dieta total.'},
    {q:'É difícil obter CITES I para uma arara jacinto em Portugal?',a:'A documentação CITES I é mais complexa do que a do Apêndice II. Para exemplares adquiridos de criador europeu registado, a documentação é fornecida pelo criador e é válida em toda a UE, incluindo Portugal.'},
  ],
  bodyHTML:`
    <p>A arara jacinto é, para quem a encontra pela primeira vez, uma experiência que não se esquece. Com quase um metro de comprimento, um azul cobalto profundo que parece hipnótico sob a luz solar, e uma presença física que domina qualquer espaço, esta ave é muito mais do que um animal de estimação — é um companheiro de vida extraordinário que exige, e merece, o mais elevado nível de compromisso e cuidado.</p>
    <h2>Classificação e Distribuição</h2>
    <p>A arara jacinto (<em>Anodorhynchus hyacinthinus</em>) é a maior de todas as espécies de araras e o maior papagaio do mundo em termos de comprimento — podendo atingir os 100 cm da ponta do bico à ponta da cauda. O seu peso adulto varia entre 1,2 e 1,7 kg. É nativa das florestas e cerrados do Brasil central, especialmente do Pantanal, Cerrado e Amazónia.</p>
    <p>Na natureza, a arara jacinto está classificada como <strong>Vulnerável</strong> pela IUCN, com população estimada entre 4.000 e 5.000 indivíduos. A principal ameaça é a perda de habitat, embora o comércio ilegal histórico (hoje fortemente combatido) também tenha contribuído para o declínio das populações selvagens. O estatuto de vulnerabilidade reflecte-se na sua classificação CITES Apêndice I.</p>
    <h2>Características Físicas</h2>
    <p>A plumagem da arara jacinto é de um azul cobalto profundo uniforme em todo o corpo, com uma marcação amarela viva ao redor dos olhos e na base inferior do bico — o chamado anel periocultar amarelo. Esta combinação de azul e amarelo cria um contraste visual que torna a jacinto inconfundível entre todas as araras.</p>
    <p>O bico é negro, maciço e extraordinariamente poderoso — capaz de partir nozes de coco com uma força estimada em mais de 100 kg/cm². É um dos bicos mais poderosos do reino animal em relação ao tamanho do organismo.</p>
    <h2>Temperamento — A "Arara Gentil"</h2>
    <p>A arara jacinto tem uma reputação de "arara gentil" que surpreende quem a conhece apenas pelo tamanho imponente. Ao contrário de muitas araras menores que podem ser mais agressivas, a jacinto tende a ser dócil, afectuosa e genuinamente interessada nos seus tutores. Muitas jacinto desenvolvem comportamentos de carinho muito expressivos — procuram o contacto físico activamente, produzem vocalizações suaves quando satisfeitas e demonstram uma ligação emocional profunda.</p>
    <p>Esta natureza dócil não deve, no entanto, criar uma falsa sensação de segurança: o bico poderoso da jacinto pode causar lesões muito graves se a ave se sentir ameaçada ou assustada. O treino por reforço positivo e o estabelecimento de uma relação de confiança são absolutamente essenciais.</p>
    <h2>Alimentação Específica da Arara Jacinto</h2>
    <p>A dieta da arara jacinto em cativeiro deve reflectir, tanto quanto possível, a sua alimentação natural. Na natureza, a jacinto alimenta-se quase exclusivamente de palmeiras — especialmente da bocaiúva (<em>Acrocomia aculeata</em>) e da babaçu (<em>Orbignya phalerata</em>). Em cativeiro:</p>
    <ul>
      <li><strong>Nozes de macadâmia:</strong> Base fundamental (30–40%) — a fonte lipídica mais próxima da dieta natural</li>
      <li><strong>Coco fresco:</strong> Excelente alternativa às palmeiras nativas</li>
      <li><strong>Pellets específicos para araras grandes:</strong> 30–35% da dieta</li>
      <li><strong>Frutas tropicais:</strong> Manga, papaia, banana, coco — com moderação</li>
      <li><strong>Vegetais:</strong> Milho, pimento, abóbora, cenoura</li>
    </ul>
    <p>A jacinto necessita de mais gordura na dieta do que a maioria dos papagaios. Monitorize o peso regularmente — a obesidade é um risco real se a dieta não for equilibrada com exercício suficiente.</p>
    <h2>Espaço e Instalações</h2>
    <p>A arara jacinto necessita de espaço verdadeiramente generoso. As opções para Portugal incluem:</p>
    <ul>
      <li><strong>Divisão dedicada interior:</strong> Pelo menos 15 m² com poleiros robustos de aço inox ou madeira dura</li>
      <li><strong>Aviário exterior coberto:</strong> Ideal para Portugal, especialmente no Centro e Sul. Dimensões mínimas de 4m × 3m × 2,5m</li>
      <li><strong>Jaula de grandes dimensões:</strong> Mínimo 150cm × 100cm × 180cm — apenas adequada se complementada com horas diárias fora da jaula</li>
    </ul>
    <h2>CITES I e Legalidade em Portugal</h2>
    <p>A arara jacinto está no Apêndice I da CITES. Para posse legal em Portugal:</p>
    <ul>
      <li>Certificado CITES I do criador registado (obrigatório)</li>
      <li>Para exemplares importados de fora da UE: Licença de importação do ICNF</li>
      <li>Para exemplares de criador europeu (como a Paraíso de Aves): o certificado CITES I do criador é suficiente para posse legal em toda a UE</li>
    </ul>
    <p>A Paraíso de Aves fornece toda a documentação CITES I necessária para a posse legal em Portugal de araras jacinto provenientes do nosso criadeiro registado em Llíria, Espanha.</p>
    <h2>É para Si?</h2>
    <p>A arara jacinto é para tutores que têm: espaço real (não um apartamento convencional), disponibilidade de pelo menos 4 a 6 horas diárias de interacção, orçamento para alimentação de qualidade e veterinária especializada, e um plano para os próximos 50 anos (incluindo disposições para a ave em caso de incapacidade ou falecimento do tutor).</p>
    <p>Se todas estas condições estão reunidas, a arara jacinto é, sem dúvida, um dos companheiros mais extraordinários que um ser humano pode ter.</p>
  `,
},

{
  slug:'como-preparar-a-casa-para-um-papagaio',
  title:'Como Preparar a Casa para um Papagaio | Guia Completo Portugal',
  metaDesc:'Como preparar a casa para receber um papagaio em Portugal? Checklist completo de segurança, localização da jaula, plantas tóxicas e primeiros dias. Guia prático.',
  h1:'Como Preparar a Casa para Receber um Papagaio',
  badge:'🏠 GUIA DE PREPARAÇÃO · PORTUGAL',
  readTime:7,
  ogImage:'loro-amazonico-02.webp',
  imgWebp:'loro-amazonico-02.webp',
  imgJpg:'loro-amazonico-02.jpg',
  imgAlt:'Interior de casa preparado para receber um papagaio — jaula bem posicionada com poleiros e brinquedos, longe de janelas e correntes de ar',
  imgCaption:'Uma casa bem preparada faz toda a diferença na adaptação do papagaio ao novo lar',
  ctaTitle:'Pronto para Receber o Seu Papagaio?',
  ctaText:'Entregamos papagaios em todo Portugal com orientações detalhadas de acolhimento incluídas na documentação.',
  related:[
    {slug:'papagaio-para-apartamento-em-portugal',label:'Papagaio em Apartamento'},
    {slug:'alimentacao-correta-dos-papagaios',label:'Alimentação Correcta'},
    {slug:'melhores-papagaios-para-iniciantes',label:'Para Iniciantes'},
    {slug:'quanto-vive-um-papagaio',label:'Quanto Vive?'},
  ],
  faqs:[
    {q:'Quais são as plantas tóxicas para papagaios mais comuns em casas portuguesas?',a:'Lírio da paz (Spathiphyllum), difenbaquia, azaléia, oleandro, glicínia, hortênsia, begónia e todas as plantas do género Dieffenbachia são comuns em Portugal e altamente tóxicas para papagaios. Remova-as ou coloque-as em divisões sem acesso da ave.'},
    {q:'O teflon é realmente perigoso para papagaios?',a:'Extremamente. Os vapores de PTFE (teflon) aquecido acima de 260°C são letais para aves em minutos. Substitua panelas, frigideiras, torradeiras e qualquer utensílio com revestimento antiaderente por alternativas em inox, cerâmica ou ferro fundido.'},
    {q:'É seguro ter um papagaio e um gato na mesma casa?',a:'Com supervisão permanente e separação física quando não está presente, pode ser viável. Nunca deixe o papagaio fora da jaula sem supervisão directa se tiver um gato em casa — mesmo um gato calmo pode reagir instintivamente a uma ave.'},
    {q:'Onde é o melhor lugar para a jaula do papagaio em casa?',a:'Numa área de passagem frequente da família (sala de estar), sem correntes de ar directas, sem exposição solar intensa directa e longe da cozinha (vapores e fumos). A ave deve poder ver e ouvir os membros da família regularmente.'},
    {q:'É necessário purificador de ar para papagaios?',a:'Especialmente para cacatuas (que produzem muito pó de plumagem) e para tutores com alergias respiratórias. Um purificador de ar com filtro HEPA de qualidade é um investimento recomendado, mas não obrigatório para todas as espécies.'},
  ],
  bodyHTML:`
    <p>Antes de a sua futura ave chegar a casa, há um conjunto de preparações essenciais que podem fazer a diferença entre uma adaptação tranquila e uma chegada stressante — para a ave e para os tutores. Este guia percorre todos os aspectos da preparação da casa para receber um papagaio em Portugal.</p>
    <h2>A Checklist de Segurança — Eliminar os Riscos Mortais</h2>
    <p>Os papagaios são, surpreendentemente, animais muito vulneráveis a perigos domésticos comuns. Antes da chegada:</p>
    <h3>1. Eliminar Revestimentos de Teflon/PTFE</h3>
    <p>Esta é a prioridade número um. Substitua todas as panelas e frigideiras com revestimento antiaderente por alternativas em aço inox, ferro fundido ou cerâmica. Inclua também torradeiras, grelhadores e qualquer outro electrodoméstico com superfícies antiaderentes. Os vapores de PTFE aquecido são letais para aves — esta é a causa número um de mortes domésticas súbitas em papagaios.</p>
    <h3>2. Identificar e Remover Plantas Tóxicas</h3>
    <p>Em Portugal, as plantas decorativas mais comuns em interiores incluem várias espécies tóxicas para aves:</p>
    <ul>
      <li>Lírio da paz (<em>Spathiphyllum</em>) — muito comum; tóxico</li>
      <li>Difenbaquia (<em>Dieffenbachia</em>) — irritante grave da mucosa oral</li>
      <li>Azaléia — cardiotóxica</li>
      <li>Oleandro — extremamente tóxico</li>
      <li>Hortênsia — tóxica</li>
      <li>Begónia — tóxica</li>
    </ul>
    <p>Mova estas plantas para divisões sem acesso da ave, ou dê-as a amigos e familiares.</p>
    <h3>3. Proteger Janelas e Varandas</h3>
    <p>Instale redes de protecção em todas as janelas que abram durante o tempo quente. Uma ave assustada pode sair voando por uma janela aberta em segundos — e um papagaio que não conhece o exterior raramente consegue voltar. As redes de mosquiteiro standard são suficientes como barreira.</p>
    <h3>4. Identificar Outros Perigos</h3>
    <ul>
      <li><strong>Velas e difusores de aroma:</strong> Vapores concentrados de óleos essenciais podem ser tóxicos. Use-os apenas em divisões sem acesso da ave.</li>
      <li><strong>Incenso:</strong> O fumo de incenso é irritante do aparelho respiratório das aves. Evite.</li>
      <li><strong>Produtos de limpeza:</strong> Armazene-os em armário com fecho. Vapores de amoníaco, cloro e outros químicos são perigosos para aves.</li>
      <li><strong>Espelhos a baixa altura:</strong> Aves em voo livre podem colidir com espelhos não sinalizado.</li>
    </ul>
    <h2>Escolher a Localização Ideal da Jaula</h2>
    <p>A localização da jaula é uma das decisões mais importantes para o bem-estar da ave. A posição ideal tem estas características:</p>
    <ul>
      <li><strong>Área de convívio familiar:</strong> A sala de estar é geralmente o melhor lugar — a ave quer fazer parte da vida doméstica</li>
      <li><strong>Junto a uma parede:</strong> Não no centro da divisão — os papagaios sentem-se mais seguros com uma parede protegendo um dos lados</li>
      <li><strong>Longe de correntes de ar:</strong> Não junto a janelas ou portas que sejam abertas com frequência</li>
      <li><strong>Longe da cozinha:</strong> Vapores de cozinha, especialmente de frituras, são perigosos</li>
      <li><strong>Com luz natural:</strong> Idealmente próximo de uma janela (mas não com sol directo na jaula durante horas)</li>
    </ul>
    <h2>O Que Ter Pronto Antes da Chegada</h2>
    <ul>
      <li><strong>Jaula adequada à espécie:</strong> Montada, com poleiros instalados e verificada para estabilidade</li>
      <li><strong>Alimento de qualidade:</strong> Pellets adequados à espécie + frutas frescas de boas vindas</li>
      <li><strong>Água fresca:</strong> Bebedouro cheio</li>
      <li><strong>Pelo menos 3 brinquedos:</strong> Variedade de texturas e tipos — madeira, plástico resistente, corda de algodão</li>
      <li><strong>Poleiros de posições diferentes:</strong> Incluir pelo menos um poleiro macio (sisal ou algodão) para descanso nocturno</li>
      <li><strong>Pano de cobertura da jaula:</strong> Para simular o período de escuridão nocturna</li>
    </ul>
    <h2>Os Primeiros Dias — Paciência é a Chave</h2>
    <p>A chegada a uma nova casa é um momento de stress para qualquer ave. Nos primeiros dias:</p>
    <ul>
      <li>Deixe a ave explorar a jaula ao seu próprio ritmo — não a force a sair</li>
      <li>Fale de forma calma e suave, mantendo-se perto mas sem invadir o espaço da ave</li>
      <li>Mantenha a rotina doméstica — sons, movimentos e pessoas familiares</li>
      <li>Não convide pessoas extras para "ver o papagaio novo" — muito estímulo nos primeiros dias pode ser esmagador</li>
      <li>Observe a alimentação e as fezes — qualquer anomalia nos primeiros dias justifica contacto veterinário</li>
    </ul>
    <p>A adaptação completa pode demorar semanas ou meses, dependendo da espécie e da personalidade individual da ave. Tenha paciência e deixe a relação desenvolver-se naturalmente — nunca a force.</p>
  `,
},

{
  slug:'alimentacao-correta-dos-papagaios',
  title:'Alimentação Correcta dos Papagaios | Guia Completo Portugal 2026',
  metaDesc:'Guia completo da alimentação correcta dos papagaios em Portugal. O que comer, o que evitar, quantidades por espécie, frutas, vegetais, pellets e alimentos proibidos.',
  h1:'Alimentação Correcta dos Papagaios: Guia Definitivo para Portugal',
  badge:'🥗 GUIA DE ALIMENTAÇÃO · PORTUGAL 2026',
  readTime:9,
  ogImage:'loro-amazonico-01.webp',
  imgWebp:'loro-amazonico-01.webp',
  imgJpg:'loro-amazonico-01.jpg',
  imgAlt:'Papagaio amazona a comer fatia de manga fresca — alimentação correcta com frutos tropicais frescos',
  imgCaption:'Frutas tropicais frescas são um componente essencial da dieta de qualquer papagaio saudável',
  ctaTitle:'Quer Saber Mais sobre Cuidados?',
  ctaText:'A Paraíso de Aves fornece orientação alimentar personalizada com cada ave entregue em Portugal.',
  related:[
    {slug:'como-preparar-a-casa-para-um-papagaio',label:'Preparar a Casa'},
    {slug:'quanto-vive-um-papagaio',label:'Quanto Vive?'},
    {slug:'melhores-papagaios-para-iniciantes',label:'Para Iniciantes'},
    {slug:'papagaio-para-apartamento-em-portugal',label:'Papagaio em Apartamento'},
  ],
  faqs:[
    {q:'Qual a diferença entre pellets e sementes para papagaios?',a:'Os pellets são alimentos formulados especificamente para psitacídeos, com nutrientes balanceados. As sementes têm, em geral, excesso de gordura e défice de vitaminas e minerais. A maioria dos veterinários de aves recomenda pellets como base da dieta, com sementes apenas em quantidade reduzida.'},
    {q:'Os papagaios podem comer tomate?',a:'Em pequenas quantidades, sim. O tomate é ligeiramente ácido e deve ser dado com moderação. Evite as folhas e caules do tomateiro, que são tóxicos.'},
    {q:'Posso dar pão ao meu papagaio?',a:'Ocasionalmente, em pequena quantidade. Prefira pão integral sem sal. O pão não tem valor nutricional para papagaios e o sal e os aditivos dos pães industriais podem ser prejudiciais.'},
    {q:'Com que frequência devo oferecer frutas e vegetais frescos?',a:'Diariamente. A componente fresca da dieta deve ser renovada duas vezes por dia — fruta e vegetais não consumidos após 2 horas devem ser retirados para evitar deterioração e proliferação bacteriana.'},
    {q:'Os papagaios podem comer laranjas?',a:'Sim, com moderação. A acidez da laranja pode causar desconforto digestivo em algumas aves quando consumida em excesso. Ofereça em pequenas quantidades e observe a reacção da ave.'},
  ],
  bodyHTML:`
    <p>A alimentação é o pilar mais importante da saúde e longevidade de um papagaio. Uma dieta correcta pode prevenir a maioria das doenças mais comuns em psitacídeos de cativeiro — desde deficiências vitamínicas à lipidose hepática — e tem impacto directo na qualidade da plumagem, na energia e no equilíbrio emocional da ave. Este guia cobre os princípios fundamentais da alimentação correcta para as espécies mais comuns em Portugal.</p>
    <h2>Os 4 Grupos Alimentares para Papagaios</h2>
    <h3>1. Pellets — A Base Nutricional</h3>
    <p>Os pellets (ou rações granuladas específicas para psitacídeos) são alimentos formulados para fornecer todos os nutrientes essenciais numa forma completa e equilibrada. São a base recomendada pela maioria dos veterinários especialistas em aves para a maioria das espécies — com excepção do papagaio eclectus, que tem necessidades nutricionais específicas que os pellets convencionais nem sempre satisfazem adequadamente.</p>
    <p>Os pellets devem representar <strong>50–70% da dieta total</strong> para a maioria das espécies. Escolha pellets de marcas reconhecidas (Harrison's Bird Foods, Roudybush, Zupreem Natural, Versele-Laga Nutribird) e ajuste o tamanho ao porte da ave — pellets para araras são maiores do que para conuros.</p>
    <h3>2. Frutas Frescas — Vitaminas e Antioxidantes</h3>
    <p>As frutas frescas devem representar <strong>15–25% da dieta</strong>. Em Portugal, temos acesso a uma variedade excelente de frutas adequadas para papagaios — e o custo é geralmente razoável quando se aproveitam as frutas da época.</p>
    <p><strong>Frutas recomendadas e facilmente disponíveis em Portugal:</strong></p>
    <ul>
      <li><strong>Manga:</strong> Rica em vitamina A e betacaroteno — excelente para a saúde da pele e das mucosas</li>
      <li><strong>Maçã (sem sementes):</strong> As sementes contêm amigdalina que se converte em cianeto. Sempre sem sementes!</li>
      <li><strong>Pera:</strong> Bem tolerada pela maioria das espécies</li>
      <li><strong>Uvas (sem sementes):</strong> Ricas em antioxidantes; ofereça inteiras para estimulação</li>
      <li><strong>Romã:</strong> Uma das frutas mais ricas em antioxidantes — papagaios adoram extrair os bagos</li>
      <li><strong>Kiwi:</strong> Rica em vitamina C</li>
      <li><strong>Frutos silvestres:</strong> Mirtilo, framboesa, amora — excelentes fontes de antioxidantes</li>
      <li><strong>Papaia:</strong> Rica em enzimas digestivas; muito bem aceite pela maioria das espécies</li>
    </ul>
    <h3>3. Vegetais Frescos — Minerais e Fibra</h3>
    <p>Os vegetais devem representar <strong>15–20% da dieta</strong>. Em Portugal, o acesso a vegetais frescos e de qualidade é excelente — aproveite os mercados locais e a produção sazonal.</p>
    <ul>
      <li><strong>Pimento vermelho e amarelo:</strong> Excepcional fonte de vitamina A e betacaroteno. Uma das melhores "vitaminas naturais" para papagaios. Ofereça inteiro — os papagaios adoram extrair as sementes.</li>
      <li><strong>Cenoura:</strong> Rica em betacaroteno. Ofereça crua para estimulação dentária natural.</li>
      <li><strong>Brócolo:</strong> Rico em cálcio, vitamina C e vitamina K. Muito bem aceite pela maioria das espécies.</li>
      <li><strong>Couve (portuguesa ou kale):</strong> Uma das hortícolas mais nutritivas disponíveis em Portugal.</li>
      <li><strong>Espinafres:</strong> Ricos em ferro — mas atenção aos oxalatos em excesso; em quantidade moderada são excelentes.</li>
      <li><strong>Abóbora:</strong> Rica em betacaroteno; pode ser dada crua ou cozida sem sal ou temperos.</li>
      <li><strong>Milho fresco:</strong> Muito apreciado — ofereça na espiga para estimulação.</li>
    </ul>
    <h3>4. Sementes, Nozes e Proteínas — Com Moderação</h3>
    <p>As sementes e nozes são muito apreciadas pelos papagaios mas devem representar no máximo <strong>10–15% da dieta</strong> para a maioria das espécies, dada a sua elevada carga calórica e lipídica.</p>
    <ul>
      <li>Nozes, amêndoas, avelãs: excelentes fontes de gordura saudável e vitamina E</li>
      <li>Sementes de girassol: muito apreciadas mas muito calóricas — em quantidade limitada</li>
      <li>Ovo cozido: excelente fonte proteica ocasional (2–3 vezes por semana)</li>
    </ul>
    <h2>Alimentos Proibidos — O Que Nunca Dar</h2>
    <p>Alguns alimentos comuns nas cozinhas portuguesas são altamente tóxicos ou perigosos para papagaios:</p>
    <ul>
      <li><strong>Abacate:</strong> Contém persina — altamente tóxico para aves. Mesmo em pequena quantidade pode ser fatal.</li>
      <li><strong>Chocolate:</strong> A teobromina é tóxica para aves.</li>
      <li><strong>Café e bebidas com cafeína:</strong> Estimulante cardíaco perigoso para aves.</li>
      <li><strong>Álcool:</strong> Mesmo em quantidade mínima pode causar intoxicação grave.</li>
      <li><strong>Cebola e alho em grandes quantidades:</strong> Os compostos sulfurosos podem danificar os glóbulos vermelhos.</li>
      <li><strong>Sal:</strong> Os rins das aves não toleram sal em quantidades significativas.</li>
      <li><strong>Sementes de maçã, pêssego e cereja:</strong> Contêm compostos cianogénicos.</li>
      <li><strong>Leite e derivados lácteos em excesso:</strong> As aves têm baixa tolerância à lactose.</li>
      <li><strong>Produtos processados, fritos e embalados:</strong> Aditivos, conservantes e sal são prejudiciais.</li>
    </ul>
    <h2>Água — Frequentemente Negligenciada</h2>
    <p>A água fresca deve estar sempre disponível e ser trocada pelo menos duas vezes por dia. Os papagaios introduzem frequentemente pedaços de comida na água, tornando-a rapidamente imprópria. Use bebedouros de fácil limpeza e esterilize-os regularmente com água a ferver — nunca com produtos químicos.</p>
    <h2>A Transição para uma Dieta Melhor</h2>
    <p>Se a sua ave está habituada a uma dieta exclusiva de sementes, a transição para pellets deve ser gradual: comece por misturar 10% de pellets com 90% de sementes, aumentando a proporção de pellets em 10% por semana até atingir a proporção ideal. A transição muito rápida pode resultar em greve de fome — as aves são muito resistentes a mudanças alimentares abruptas.</p>
    <p>A Paraíso de Aves fornece orientação alimentar personalizada com cada entrega, adaptada à espécie específica. Se tiver dúvidas sobre a alimentação da sua ave, não hesite em contactar-nos.</p>
  `,
},

{
  slug:'quanto-vive-um-papagaio',
  title:'Quanto Vive um Papagaio? Esperança de Vida por Espécie | Portugal',
  metaDesc:'Quanto vive um papagaio? Esperança de vida por espécie — yacos, araras, cacatuas, amazona e conuros. O que afecta a longevidade e como maximizar a vida da ave.',
  h1:'Quanto Vive um Papagaio? Esperança de Vida por Espécie',
  badge:'⏳ LONGEVIDADE · GUIA DE ESPÉCIES',
  readTime:7,
  ogImage:'loro-gris-01.webp',
  imgWebp:'loro-gris-01.webp',
  imgJpg:'loro-gris-01.jpg',
  imgAlt:'Papagaio cinzento africano adulto em plena saúde — espécie com uma das maiores esperanças de vida entre os psitacídeos',
  imgCaption:'O papagaio cinzento africano pode viver mais de 60 anos com os cuidados correctos',
  ctaTitle:'Pronto para um Compromisso de Décadas?',
  ctaText:'Adoptar um papagaio é um compromisso de vida. A Paraíso de Aves ajuda-o a fazer a escolha certa para o seu estilo de vida.',
  related:[
    {slug:'melhores-papagaios-para-iniciantes',label:'Para Iniciantes'},
    {slug:'quanto-custa-um-papagaio-em-portugal',label:'Quanto Custa?'},
    {slug:'papagaio-cinzento-vs-eclectus',label:'Cinzento vs Eclectus'},
    {slug:'alimentacao-correta-dos-papagaios',label:'Alimentação Correcta'},
  ],
  faqs:[
    {q:'Qual o papagaio que vive mais anos?',a:'O papagaio cinzento africano (yaco) e as araras grandes têm os registos documentados de maior longevidade — com exemplares que ultrapassaram os 70 e mesmo 80 anos em condições excepcionais de cuidado.'},
    {q:'Os papagaios de estimação vivem mais do que os selvagens?',a:'Em boas condições de cativeiro, sim. A ausência de predadores, o acesso a alimentação regular e cuidados veterinários permitem que as aves de estimação superem frequentemente a esperança de vida dos seus congéneres selvagens.'},
    {q:'O que mais afecta a longevidade de um papagaio?',a:'Alimentação (o factor mais influente), qualidade do ambiente (temperatura, espaço, estimulação), cuidados veterinários regulares e equilíbrio emocional (stress crónico reduz significativamente a esperança de vida).'},
    {q:'Devo fazer alguma disposição testamentária para o meu papagaio?',a:'Para espécies de grande longevidade (yaco, araras, cacatuas), sim. É altamente recomendável designar um tutor de confiança para a ave em caso de incapacidade ou falecimento do tutor principal.'},
    {q:'Um papagaio mais velho é mais difícil de adoptar?',a:'Nem sempre. Papagaios adultos bem socializados podem adaptar-se muito bem a novos tutores. A vantagem é que o seu temperamento adulto já está completamente formado — sabe exactamente com que ave está a lidar.'},
  ],
  bodyHTML:`
    <p>Uma das perguntas mais importantes — e frequentemente subestimadas — que um potencial tutor de papagaio deve fazer é: "Quanto tempo vai viver este animal?" A resposta, para muitas espécies de psitacídeos, é surpreendente e tem implicações profundas para o compromisso que está prestes a assumir.</p>
    <h2>Esperança de Vida por Espécie — Tabela de Referência</h2>
    <p>Os valores abaixo referem-se a animais de estimação em boas condições de cuidado — alimentação equilibrada, ambiente adequado e cuidados veterinários regulares:</p>
    <h3>Espécies de Grande Longevidade (40+ anos)</h3>
    <ul>
      <li><strong>Papagaio Cinzento Africano (Yaco):</strong> 50–70 anos. O maior longevidade documentada é de um exemplar que viveu mais de 80 anos no Reino Unido.</li>
      <li><strong>Arara Jacinto:</strong> 50–60 anos. A raridade da espécie dificulta registos rigorosos, mas exemplares em aviários zoológicos ultrapassaram frequentemente os 50 anos.</li>
      <li><strong>Arara Azul e Amarela:</strong> 50–60 anos. Uma das araras mais populares e com um dos melhores track records de longevidade em cativeiro.</li>
      <li><strong>Arara Escarlate:</strong> 40–50 anos. Ligeiramente menos longeva do que a azul e amarela, mas ainda assim um compromisso de décadas.</li>
      <li><strong>Cacatua de Crista Amarela:</strong> 40–60 anos. Registos documentados de exemplares com mais de 70 anos existem mas são excepcionais.</li>
      <li><strong>Papagaio Amazona:</strong> 40–70 anos. A longevidade varia muito com a espécie de amazona — algumas espécies chegam facilmente aos 70 anos.</li>
    </ul>
    <h3>Espécies de Longevidade Média (20–40 anos)</h3>
    <ul>
      <li><strong>Papagaio Eclectus:</strong> 30–50 anos. Com a dieta específica correcta, pode atingir a faixa superior desta gama.</li>
      <li><strong>Cacatua de Cabeça Nua:</strong> 30–40 anos.</li>
      <li><strong>Conuro grande (Aratinga):</strong> 20–30 anos.</li>
    </ul>
    <h3>Espécies de Menor Longevidade (10–20 anos)</h3>
    <ul>
      <li><strong>Conuro verde (Pyrrhura):</strong> 15–25 anos.</li>
      <li><strong>Periquito ondulado:</strong> 10–15 anos com bons cuidados.</li>
    </ul>
    <h2>O Que Determina a Longevidade de um Papagaio</h2>
    <h3>1. Alimentação — O Factor Mais Importante</h3>
    <p>Uma dieta equilibrada é, de longe, o factor com maior impacto na longevidade. Papagaios alimentados exclusivamente com sementes têm esperanças de vida significativamente inferiores às dos seus congéneres com dietas equilibradas — deficiências em vitamina A, cálcio e proteínas de qualidade comprometem gravemente a saúde a longo prazo.</p>
    <h3>2. Ambiente e Espaço</h3>
    <p>Papagaios com espaço suficiente para exercício regular, estimulação mental adequada e um ambiente estável e sem stress vivem significativamente mais anos. O stress crónico — causado por solidão, falta de estimulação, ruído excessivo ou ambiente instável — é um factor comprovado de redução da longevidade.</p>
    <h3>3. Cuidados Veterinários</h3>
    <p>Consultas anuais com veterinário especializado em aves exóticas, análises de sangue preventivas e vacinação (quando aplicável) permitem detectar e tratar precocemente condições que, não tratadas, reduzem significativamente a esperança de vida.</p>
    <h3>4. Genética e Espécie</h3>
    <p>A longevidade base é geneticamente determinada e varia enormemente entre espécies. Dentro da mesma espécie, existe também variabilidade individual — alguns exemplares são geneticamente mais robustos do que outros.</p>
    <h2>As Implicações da Longevidade para o Tutor</h2>
    <p>Adoptar um papagaio cinzento africano aos 30 anos significa, estatisticamente, que a ave pode sobreviver ao tutor. Esta é uma realidade que poucos potenciais tutores consideram — e que deve fazer parte de qualquer processo de decisão responsável.</p>
    <p>As questões a ponderar incluem:</p>
    <ul>
      <li>Quem ficará com a ave se ficar incapacitado ou falecer?</li>
      <li>Existe um plano concreto para a transmissão da guarda da ave?</li>
      <li>A ave está socializada para aceitar novos tutores, ou apenas a uma pessoa?</li>
      <li>O futuro tutor designado está disposto e é capaz de continuar os cuidados?</li>
    </ul>
    <p>A Paraíso de Aves encoraja todos os seus clientes a reflectir sobre estas questões antes de adoptar, especialmente para as espécies de maior longevidade. A adopção responsável começa no dia zero — e inclui planear para os próximos 50 anos.</p>
  `,
},

];

/* ════════════════════════════════════════════════
   GENERATE ALL PAGES
════════════════════════════════════════════════ */

console.log('\n🇵🇹  Phase 4B — Portugal City SEO + Blog Authority\n');

let cityCount = 0, blogCount = 0;

// Generate city pages
cities.forEach(c => {
  const dir = path.join(__dirname, 'pt', c.slug);
  mkdirp(dir);
  fs.writeFileSync(path.join(dir,'index.html'), generateCityPage(c), 'utf8');
  console.log(`✓ pt/${c.slug}/index.html`);
  cityCount++;
});

console.log('');

// Generate blog articles
blogArticles.forEach(art => {
  const dir = path.join(__dirname, 'pt', 'blog', art.slug);
  mkdirp(dir);
  fs.writeFileSync(path.join(dir,'index.html'), generateBlogPage(art), 'utf8');
  console.log(`✓ pt/blog/${art.slug}/index.html`);
  blogCount++;
});

console.log(`\n✅  Done!`);
console.log(`   ${cityCount} city pages generated`);
console.log(`   ${blogCount} blog articles generated`);
console.log(`   Total: ${cityCount + blogCount} pages\n`);
