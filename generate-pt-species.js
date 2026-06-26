/**
 * generate-pt-species.js
 * Phase 4A — Portuguese Species Authority Cluster
 * Creates 10 full commercial landing pages under /pt/
 * European Portuguese (pt-PT), ~2000 words each, all schemas.
 */

const fs   = require('fs');
const path = require('path');

const BASE   = 'https://www.paraisodeaves.com';
const EMAIL  = 'paraisodeloros@gmail.com';
const GA_ID  = 'G-4007YHH4H9';

function mkdirp(d){ fs.mkdirSync(d,{recursive:true}); }

/* ─── SHARED CSS ─── */
function baseCSS(){
  return `
  :root{
    --primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;
    --bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;
    --white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.10);
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;}
  h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
  a{color:var(--primary);text-decoration:none;}
  a:hover{color:var(--gold);}
  img{max-width:100%;height:auto;display:block;}

  /* TOPBAR */
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

  /* HERO */
  .hero-species{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);padding:60px 5%;text-align:center;color:var(--white);}
  .hero-species .badge{display:inline-block;background:rgba(212,169,79,.15);border:1px solid var(--gold);color:var(--gold);padding:6px 20px;border-radius:30px;font-size:.8rem;font-weight:700;letter-spacing:1px;margin-bottom:20px;}
  .hero-species h1{font-size:clamp(2rem,5vw,3.2rem);margin-bottom:12px;color:var(--white);}
  .hero-species .latin{font-style:italic;color:rgba(255,255,255,.65);font-size:1rem;margin-bottom:16px;}
  .hero-species .subtitle{font-size:1.1rem;color:rgba(255,255,255,.85);max-width:680px;margin:0 auto 28px;}
  .trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:12px;}
  .trust-pills span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:var(--white);padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;}

  /* BREADCRUMB */
  .breadcrumb{background:var(--primary);padding:10px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
  .breadcrumb-inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.6);}
  .breadcrumb-inner a{color:rgba(255,255,255,.7);}
  .breadcrumb-inner a:hover{color:var(--gold);}
  .breadcrumb-inner span{margin:0 6px;}

  /* MAIN LAYOUT */
  .content-wrap{max-width:1200px;margin:0 auto;padding:60px 5%;display:grid;grid-template-columns:1fr 340px;gap:48px;align-items:start;}
  @media(max-width:900px){.content-wrap{grid-template-columns:1fr;}}
  .main-col{}
  .sidebar{}

  /* SECTIONS */
  .section-block{margin-bottom:48px;}
  .section-block h2{font-size:1.6rem;color:var(--primary);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--gold);display:inline-block;}
  .section-block h3{font-size:1.15rem;color:var(--secondary);margin:20px 0 8px;}
  .section-block p{margin-bottom:14px;color:#2a2a2a;}
  .section-block ul{padding-left:20px;margin-bottom:14px;}
  .section-block ul li{margin-bottom:6px;}

  /* QUICK FACTS */
  .quick-facts{background:var(--primary);color:var(--white);border-radius:var(--radius);padding:28px;margin-bottom:40px;}
  .quick-facts h3{color:var(--gold);font-size:1rem;letter-spacing:1px;text-transform:uppercase;margin-bottom:18px;}
  .facts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;}
  .fact-item{text-align:center;padding:14px 10px;background:rgba(255,255,255,.06);border-radius:8px;}
  .fact-item .fact-value{font-family:'Poppins',sans-serif;font-size:1.25rem;font-weight:700;color:var(--gold);display:block;}
  .fact-item .fact-label{font-size:.75rem;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.5px;margin-top:4px;}

  /* CTA BOX */
  .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius);padding:32px;color:var(--white);margin-bottom:32px;text-align:center;}
  .cta-box h3{color:var(--gold);font-size:1.2rem;margin-bottom:10px;}
  .cta-box p{color:rgba(255,255,255,.85);font-size:.9rem;margin-bottom:20px;}
  .btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:13px 28px;border-radius:30px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:all .2s;text-decoration:none;}
  .btn-gold:hover{background:var(--gold-light);color:var(--primary);transform:translateY(-1px);}
  .btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.5);color:var(--white);padding:11px 24px;border-radius:30px;font-weight:600;font-size:.9rem;margin-left:10px;transition:all .2s;text-decoration:none;}
  .btn-outline:hover{border-color:var(--white);background:rgba(255,255,255,.1);color:var(--white);}

  /* FEATURES */
  .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:32px;}
  .feature-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:20px;text-align:center;}
  .feature-card .icon{font-size:2rem;margin-bottom:8px;}
  .feature-card h4{font-size:.95rem;color:var(--primary);margin-bottom:6px;}
  .feature-card p{font-size:.83rem;color:var(--muted);}

  /* FAQ */
  .faq-item{border-bottom:1px solid var(--border);padding:18px 0;}
  .faq-item:last-child{border-bottom:none;}
  .faq-q{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:var(--primary);margin-bottom:8px;}
  .faq-a{color:#2a2a2a;font-size:.95rem;}

  /* RELATED */
  .related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-top:16px;}
  .related-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;transition:box-shadow .2s;}
  .related-card:hover{box-shadow:var(--shadow);}
  .related-card .rel-icon{font-size:2rem;margin-bottom:8px;}
  .related-card h4{font-size:.88rem;color:var(--primary);font-family:'Poppins',sans-serif;margin-bottom:4px;}
  .related-card span{font-size:.78rem;color:var(--muted);}

  /* CONTACT FORM */
  .contact-form{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:28px;}
  .contact-form h3{color:var(--primary);font-size:1.1rem;margin-bottom:16px;}
  .form-group{margin-bottom:14px;}
  .form-group label{display:block;font-size:.85rem;font-weight:600;color:var(--primary);margin-bottom:5px;}
  .form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 14px;border:1.5px solid var(--border);border-radius:8px;font-family:'Open Sans',sans-serif;font-size:.9rem;color:var(--text);background:var(--bg);transition:border .2s;}
  .form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--gold);}
  .form-group textarea{min-height:90px;resize:vertical;}

  /* SIDEBAR */
  .sidebar-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:22px;margin-bottom:24px;}
  .sidebar-card h4{font-family:'Poppins',sans-serif;color:var(--primary);font-size:1rem;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--gold);}
  .sidebar-card ul{list-style:none;padding:0;}
  .sidebar-card ul li{padding:7px 0;border-bottom:1px solid var(--border);font-size:.88rem;}
  .sidebar-card ul li:last-child{border-bottom:none;}
  .sidebar-card ul li a{color:var(--secondary);}
  .sidebar-card ul li a:hover{color:var(--gold);}
  .price-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:var(--radius);padding:22px;text-align:center;color:var(--white);margin-bottom:24px;}
  .price-box .price{font-family:'Poppins',sans-serif;font-size:1.6rem;font-weight:700;color:var(--gold);}
  .price-box p{font-size:.82rem;color:rgba(255,255,255,.75);margin-top:6px;}

  /* IMAGE */
  .species-img{border-radius:var(--radius);overflow:hidden;margin-bottom:32px;box-shadow:var(--shadow);}
  .species-img img{width:100%;height:300px;object-fit:cover;}
  .species-img figcaption{background:var(--primary);color:rgba(255,255,255,.8);font-size:.78rem;padding:8px 14px;text-align:center;font-style:italic;}

  /* FOOTER */
  footer{background:var(--primary);color:rgba(255,255,255,.75);padding:56px 5% 28px;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:32px;max-width:1200px;margin:0 auto 40px;}
  @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:500px){.footer-grid{grid-template-columns:1fr;}}
  .footer-brand h3{font-family:'Poppins',sans-serif;color:var(--white);font-size:1.1rem;margin-bottom:10px;}
  .footer-brand p{font-size:.85rem;line-height:1.7;max-width:260px;}
  .footer-col h4{font-family:'Poppins',sans-serif;color:var(--gold-light);font-size:.85rem;text-transform:uppercase;letter-spacing:.8px;margin-bottom:14px;}
  .footer-col ul{list-style:none;}
  .footer-col ul li{margin-bottom:7px;}
  .footer-col ul li a{color:rgba(255,255,255,.65);font-size:.83rem;transition:color .2s;}
  .footer-col ul li a:hover{color:var(--gold);}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:22px;text-align:center;font-size:.78rem;color:rgba(255,255,255,.4);max-width:1200px;margin:0 auto;}

  @media(max-width:700px){
    .hero-species h1{font-size:1.9rem;}
    nav{display:none;}
    .content-wrap{padding:30px 4%;}
  }
  `;
}

/* ─── NAV ─── */
function ptNav(active){
  const links = [
    ['Início','../../'],
    ['Papagaios','../../papagaios-a-venda-portugal/'],
    ['Cidades','../../cidades/'],
    ['Blog','../../blog/'],
    ['Contacto','../../contacto/'],
  ];
  return `
  <header class="topbar">
    <div class="topbar-inner">
      <a class="logo" href="${BASE}/pt/"><span>🦜</span> paraisodeaves</a>
      <nav>
        ${links.map(([label,href])=>`<a href="${href}"${active===label?' class="active"':''}>${label}</a>`).join('')}
        <span class="lang-switch">
          <a href="${BASE}/" title="Español">ES</a>
          <span>|</span>
          <a href="${BASE}/pt/" class="active" title="Português">PT</a>
        </span>
      </nav>
    </div>
  </header>`;
}

/* ─── FOOTER ─── */
function ptFooter(){
  return `
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>🦜 Paraíso de Aves</h3>
        <p>Criador registado de papagaios exóticos em Llíria, Valência (Espanha). Mais de 25 anos de experiência. Envios seguros para todo Portugal e Europa.</p>
        <p style="margin-top:12px;font-size:.82rem;">📧 <a href="mailto:${EMAIL}" style="color:var(--gold-light);">${EMAIL}</a></p>
      </div>
      <div class="footer-col">
        <h4>Espécies</h4>
        <ul>
          <li><a href="../../papagaio-cinzento/">Papagaio Cinzento</a></li>
          <li><a href="../../arara-jacinto/">Arara Jacinto</a></li>
          <li><a href="../../arara-azul-e-amarela/">Arara Azul e Amarela</a></li>
          <li><a href="../../arara-escarlate/">Arara Escarlate</a></li>
          <li><a href="../../cacatua-de-crista-amarela/">Cacatua de Crista Amarela</a></li>
          <li><a href="../../papagaio-eclectus/">Papagaio Eclectus</a></li>
          <li><a href="../../papagaio-amazona/">Papagaio Amazona</a></li>
          <li><a href="../../conuro/">Conuro</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Cidades</h4>
        <ul>
          <li><a href="../../cidades/papagaios-lisboa/">Lisboa</a></li>
          <li><a href="../../cidades/papagaios-porto/">Porto</a></li>
          <li><a href="../../cidades/papagaios-braga/">Braga</a></li>
          <li><a href="../../cidades/papagaios-coimbra/">Coimbra</a></li>
          <li><a href="../../cidades/papagaios-faro/">Faro</a></li>
          <li><a href="../../cidades/papagaios-funchal/">Funchal</a></li>
          <li><a href="../../cidades/">Ver todas →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Informações</h4>
        <ul>
          <li><a href="../../blog/">Blog</a></li>
          <li><a href="../../blog/documentacao-cites-portugal/">CITES em Portugal</a></li>
          <li><a href="../../blog/quanto-custa-um-papagaio-em-portugal/">Preços e Custos</a></li>
          <li><a href="../../blog/como-escolher-um-papagaio/">Como Escolher</a></li>
          <li><a href="../../blog/alimentacao-papagaio-guia-completo/">Alimentação</a></li>
          <li><a href="../../contacto/">Contacto</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Comprar em Espanha</h4>
        <ul>
          <li><a href="${BASE}/comprar-loros-espana">Comprar Loros España</a></li>
          <li><a href="${BASE}/comprar-loros-madrid">Madrid</a></li>
          <li><a href="${BASE}/comprar-loros-valencia">Valencia</a></li>
          <li><a href="${BASE}/comprar-loros-cataluna">Cataluña</a></li>
          <li><a href="${BASE}/criadero-loros-espana">Criadero</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Paraíso de Aves · Criador Registado · CITES Oficial · Llíria, Valência, Espanha</p>
      <p style="margin-top:6px;"><a href="${BASE}/aviso-legal.html" style="color:rgba(255,255,255,.4)">Aviso Legal</a> · <a href="${BASE}/politica-de-privacidad.html" style="color:rgba(255,255,255,.4)">Privacidade</a></p>
    </div>
  </footer>`;
}

/* ─── BREADCRUMB ─── */
function breadcrumb(sp){
  return `
  <nav class="breadcrumb" aria-label="Navegação estrutural">
    <div class="breadcrumb-inner">
      <a href="${BASE}/pt/">Início</a><span>·</span>
      <a href="${BASE}/pt/papagaios-a-venda-portugal/">Papagaios à Venda</a><span>·</span>
      <strong style="color:rgba(255,255,255,.9)">${sp.h1}</strong>
    </div>
  </nav>`;
}

/* ─── SCHEMAS ─── */
function schemas(sp){
  const faqSchema = sp.faqs.map(f=>`{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',');
  return `
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"WebPage",
      "@id":"${BASE}/pt/${sp.slug}/",
      "name":${JSON.stringify(sp.title)},
      "description":${JSON.stringify(sp.metaDesc)},
      "url":"${BASE}/pt/${sp.slug}/",
      "inLanguage":"pt-PT",
      "publisher":{"@id":"${BASE}/#org"}
    },
    {
      "@type":"BreadcrumbList",
      "itemListElement":[
        {"@type":"ListItem","position":1,"name":"Início","item":"${BASE}/pt/"},
        {"@type":"ListItem","position":2,"name":"Papagaios à Venda em Portugal","item":"${BASE}/pt/papagaios-a-venda-portugal/"},
        {"@type":"ListItem","position":3,"name":${JSON.stringify(sp.h1)},"item":"${BASE}/pt/${sp.slug}/"}
      ]
    },
    {
      "@type":"FAQPage",
      "mainEntity":[${faqSchema}]
    },
    {
      "@type":"Product",
      "name":${JSON.stringify(sp.h1 + ' — Criador Registado')},
      "description":${JSON.stringify(sp.metaDesc)},
      "brand":{"@type":"Brand","name":"Paraíso de Aves"},
      "offers":{
        "@type":"Offer",
        "priceCurrency":"EUR",
        "priceSpecification":{"@type":"PriceSpecification","description":"Preço sob consulta"},
        "availability":"https://schema.org/InStock",
        "seller":{"@id":"${BASE}/#org"}
      }
    },
    {
      "@type":"Organization",
      "@id":"${BASE}/#org",
      "name":"Paraíso de Aves",
      "url":"${BASE}",
      "logo":"${BASE}/images/logo.png",
      "email":"${EMAIL}",
      "address":{"@type":"PostalAddress","addressLocality":"Llíria","addressRegion":"Valência","addressCountry":"ES"},
      "areaServed":["PT","ES","EU"],
      "knowsAbout":["Papagaios CITES","Criação de Aves Exóticas","Araras","Cacatuas","Papagaio Cinzento"]
    }
  ]
}
</script>`;
}

/* ─── CONTACT FORM ─── */
function contactForm(sp){
  return `
<div class="contact-form" id="reserva">
  <h3>📋 Solicitar Informação ou Reservar</h3>
  <p style="font-size:.85rem;color:var(--muted);margin-bottom:16px;">Preencha o formulário e responderemos em menos de 24 horas.</p>
  <form method="POST" action="https://formspree.io/f/paraisodeaves" data-netlify="true" name="reserva-pt-${sp.slug}">
    <input type="hidden" name="especie" value="${sp.h1}" />
    <input type="hidden" name="form-name" value="reserva-pt-${sp.slug}" />
    <div class="form-group">
      <label for="nome-${sp.slug}">Nome completo *</label>
      <input type="text" id="nome-${sp.slug}" name="nome" required placeholder="O seu nome" />
    </div>
    <div class="form-group">
      <label for="email-${sp.slug}">E-mail *</label>
      <input type="email" id="email-${sp.slug}" name="email" required placeholder="email@exemplo.pt" />
    </div>
    <div class="form-group">
      <label for="distrito-${sp.slug}">Distrito (Portugal)</label>
      <select id="distrito-${sp.slug}" name="distrito">
        <option value="">Selecione o seu distrito</option>
        <option>Lisboa</option><option>Porto</option><option>Braga</option>
        <option>Coimbra</option><option>Aveiro</option><option>Faro</option>
        <option>Setúbal</option><option>Leiria</option><option>Évora</option>
        <option>Viseu</option><option>Guimarães / Braga</option>
        <option>Funchal / Madeira</option><option>Ponta Delgada / Açores</option>
        <option>Outro</option>
      </select>
    </div>
    <div class="form-group">
      <label for="msg-${sp.slug}">Mensagem</label>
      <textarea id="msg-${sp.slug}" name="mensagem" placeholder="Questões sobre disponibilidade, preço, entrega..."></textarea>
    </div>
    <button type="submit" class="btn-gold" style="width:100%;padding:13px;">Enviar Pedido →</button>
  </form>
</div>`;
}

/* ─── FULL PAGE TEMPLATE ─── */
function generatePage(sp){
  return `<!DOCTYPE html>
<html lang="pt-PT" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
  <title>${sp.title}</title>
  <meta name="description" content="${sp.metaDesc}" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="pt-PT" />
  <link rel="canonical" href="${BASE}/pt/${sp.slug}/" />
  <link rel="alternate" hreflang="pt-PT" href="${BASE}/pt/${sp.slug}/" />
  ${sp.esUrl ? `<link rel="alternate" hreflang="es-ES" href="${BASE}${sp.esUrl}" />` : `<link rel="alternate" hreflang="es-ES" href="${BASE}/" />`}
  <link rel="alternate" hreflang="x-default" href="${BASE}/" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_PT" />
  <meta property="og:title" content="${sp.title}" />
  <meta property="og:description" content="${sp.metaDesc}" />
  <meta property="og:url" content="${BASE}/pt/${sp.slug}/" />
  <meta property="og:image" content="${BASE}/images/${sp.ogImage}" />
  <meta property="og:site_name" content="Paraíso de Aves" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${sp.title}" />
  <meta name="twitter:description" content="${sp.metaDesc}" />
  <meta name="twitter:image" content="${BASE}/images/${sp.ogImage}" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>${baseCSS()}</style>
  ${schemas(sp)}
</head>
<body>

${ptNav('Papagaios')}

<!-- Hero -->
<section class="hero-species">
  <p class="badge">${sp.badge}</p>
  <h1>${sp.h1}</h1>
  <p class="latin">${sp.latinName}</p>
  <p class="subtitle">${sp.subtitle}</p>
  <div class="trust-pills">
    ${sp.trustBadges.map(b=>`<span>${b}</span>`).join('')}
  </div>
</section>

${breadcrumb(sp)}

<!-- Main Content -->
<div class="content-wrap">
  <main class="main-col">

    <!-- Intro image -->
    <figure class="species-img">
      <picture>
        <source srcset="../../images/${sp.imgWebp}" type="image/webp" />
        <img src="../../images/${sp.imgJpg}" alt="${sp.imgAlt}" width="760" height="300" loading="eager" />
      </picture>
      <figcaption>${sp.imgCaption}</figcaption>
    </figure>

    <!-- Quick Facts -->
    <div class="quick-facts">
      <h3>Características da Espécie</h3>
      <div class="facts-grid">
        ${sp.facts.map(f=>`<div class="fact-item"><span class="fact-value">${f.v}</span><div class="fact-label">${f.l}</div></div>`).join('')}
      </div>
    </div>

    <!-- Intro -->
    <div class="section-block">
      <h2>Sobre o ${sp.h1}</h2>
      ${sp.introHTML}
    </div>

    <!-- Temperamento & Inteligência -->
    <div class="section-block">
      <h2>Temperamento e Inteligência</h2>
      ${sp.temperHTML}
    </div>

    <!-- Alimentação -->
    <div class="section-block">
      <h2>Alimentação</h2>
      ${sp.dietHTML}
    </div>

    <!-- Jaula & Habitat -->
    <div class="section-block">
      <h2>Jaula e Habitat</h2>
      ${sp.cageHTML}
    </div>

    <!-- Cuidados Diários -->
    <div class="section-block">
      <h2>Cuidados Diários e Exercício</h2>
      ${sp.careHTML}
    </div>

    <!-- Saúde -->
    <div class="section-block">
      <h2>Saúde e Veterinário</h2>
      ${sp.healthHTML}
    </div>

    <!-- CITES & Legal -->
    <div class="section-block">
      <h2>Documentação CITES e Legislação em Portugal</h2>
      ${sp.citesHTML}
    </div>

    <!-- Entrega & Reserva -->
    <div class="section-block">
      <h2>Entrega em Portugal e Processo de Reserva</h2>
      ${sp.deliveryHTML}
    </div>

    <!-- Porque Paraíso de Aves -->
    <div class="section-block">
      <h2>Por que Escolher a Paraíso de Aves?</h2>
      <div class="features-grid">
        <div class="feature-card"><div class="icon">🏆</div><h4>25+ Anos de Experiência</h4><p>Criador registado desde 1998 com histórico comprovado.</p></div>
        <div class="feature-card"><div class="icon">📋</div><h4>CITES Oficial</h4><p>Toda a documentação legal CITES incluída no preço.</p></div>
        <div class="feature-card"><div class="icon">❤️</div><h4>Criados à Mão</h4><p>Socializados desde bebés para máxima confiança.</p></div>
        <div class="feature-card"><div class="icon">🚚</div><h4>Entrega Segura</h4><p>Envio certificado para qualquer ponto de Portugal.</p></div>
        <div class="feature-card"><div class="icon">🩺</div><h4>Garantia de Saúde</h4><p>Certificado veterinário e acompanhamento pós-venda.</p></div>
        <div class="feature-card"><div class="icon">💬</div><h4>Apoio Personalizado</h4><p>Aconselhamento antes e depois da adopção.</p></div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="section-block">
      <h2>Perguntas Frequentes sobre o ${sp.h1}</h2>
      ${sp.faqs.map(f=>`
      <div class="faq-item">
        <div class="faq-q">${f.q}</div>
        <div class="faq-a">${f.a}</div>
      </div>`).join('')}
    </div>

    <!-- Espécies Relacionadas -->
    <div class="section-block">
      <h2>Espécies Relacionadas</h2>
      <div class="related-grid">
        ${sp.related.map(r=>`
        <a href="${r.url}" class="related-card">
          <div class="rel-icon">${r.icon}</div>
          <h4>${r.name}</h4>
          <span>${r.desc}</span>
        </a>`).join('')}
      </div>
    </div>

    <!-- CTA Final -->
    <div class="cta-box" style="margin-top:40px;">
      <h3>Interessado em Adoptar um ${sp.h1}?</h3>
      <p>Contacte-nos para verificar disponibilidade e iniciar o processo de reserva. Entregamos em todo Portugal continental, Madeira e Açores.</p>
      <a href="#reserva" class="btn-gold">Solicitar Disponibilidade</a>
      <a href="mailto:${EMAIL}" class="btn-outline">Enviar E-mail</a>
    </div>

  </main>

  <!-- SIDEBAR -->
  <aside class="sidebar">

    <!-- Price box -->
    <div class="price-box">
      <div style="font-size:.8rem;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Preço</div>
      <div class="price">${sp.price}</div>
      <p>Inclui documentação CITES, certificado veterinário e caixa de transporte IATA</p>
      <a href="#reserva" class="btn-gold" style="margin-top:14px;display:block;">Reservar Agora →</a>
    </div>

    <!-- Contact form -->
    ${contactForm(sp)}

    <!-- Quick links -->
    <div class="sidebar-card">
      <h4>Páginas Úteis</h4>
      <ul>
        <li><a href="../../papagaios-a-venda-portugal/">Todos os Papagaios à Venda</a></li>
        <li><a href="../../blog/documentacao-cites-portugal/">Documentação CITES Portugal</a></li>
        <li><a href="../../blog/quanto-custa-um-papagaio-em-portugal/">Quanto Custa um Papagaio?</a></li>
        <li><a href="../../blog/como-escolher-um-papagaio/">Como Escolher um Papagaio</a></li>
        <li><a href="../../blog/alimentacao-papagaio-guia-completo/">Guia de Alimentação</a></li>
        <li><a href="../../cidades/">Entrega por Cidade</a></li>
        <li><a href="../../contacto/">Contacto</a></li>
      </ul>
    </div>

    <!-- Cities sidebar -->
    <div class="sidebar-card">
      <h4>Entregamos em</h4>
      <ul>
        <li><a href="../../cidades/papagaios-lisboa/">Lisboa e Área Metropolitana</a></li>
        <li><a href="../../cidades/papagaios-porto/">Porto e Norte</a></li>
        <li><a href="../../cidades/papagaios-braga/">Braga e Minho</a></li>
        <li><a href="../../cidades/papagaios-coimbra/">Coimbra e Centro</a></li>
        <li><a href="../../cidades/papagaios-faro/">Faro e Algarve</a></li>
        <li><a href="../../cidades/papagaios-funchal/">Funchal / Madeira</a></li>
        <li><a href="../../cidades/papagaios-ponta-delgada/">Ponta Delgada / Açores</a></li>
      </ul>
    </div>

  </aside>
</div>

${ptFooter()}

</body>
</html>`;
}

/* ══════════════════════════════════════════════════════
   SPECIES DATA
══════════════════════════════════════════════════════ */
const allSpecies = [

/* ── 1. PAPAGAIO CINZENTO ── */
{
  slug:'papagaio-cinzento',
  title:'Papagaio Cinzento Africano à Venda em Portugal | CITES | Paraíso de Aves',
  metaDesc:'Compre um papagaio cinzento africano (yaco) com documentação CITES em Portugal. Criado à mão, socializado desde bebé, entrega em todo Portugal continental e ilhas.',
  h1:'Papagaio Cinzento Africano',
  latinName:'Psittacus erithacus',
  subtitle:'O papagaio mais inteligente do mundo, agora disponível com documentação CITES completa e entrega em todo Portugal.',
  badge:'🦜 CRIADOR REGISTADO · CITES OFICIAL',
  trustBadges:['✓ CITES Oficial','✓ Criado à Mão','✓ Envio Portugal','✓ Garantia de Saúde'],
  price:'Sob Consulta',
  esUrl:'/loro-gris-africano.html',
  ogImage:'loro-gris-01.webp',
  imgWebp:'loro-gris-01.webp',
  imgJpg:'loro-gris-01.jpg',
  imgAlt:'Papagaio cinzento africano (yaco) com plumagem cinzenta e cauda vermelha viva, posado num poleiro',
  imgCaption:'Papagaio Cinzento Africano (Psittacus erithacus) — Reconhecido mundialmente pela sua inteligência excecional',
  facts:[
    {v:'50–70 anos',l:'Esperança de Vida'},
    {v:'400–650 g',l:'Peso Adulto'},
    {v:'33 cm',l:'Comprimento'},
    {v:'Excecional',l:'Inteligência'},
    {v:'Muito alto',l:'Capacidade Verbal'},
    {v:'Moderado',l:'Nível de Ruído'},
    {v:'Sim',l:'Apto para Apartamento'},
    {v:'CITES I',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>O papagaio cinzento africano, conhecido popularmente como <strong>yaco</strong>, é amplamente considerado o papagaio mais inteligente do mundo. Nativo das florestas tropicais da África ocidental e central, esta espécie impressionante tem uma capacidade cognitiva comparável à de uma criança de 5 anos, conseguindo não apenas imitar sons, mas compreender o contexto e até comunicar intencionalmente com os seus tutores.</p>
    <p>A sua plumagem de um cinzento uniforme, contrastada com a cauda vermelha viva, torna o yaco imediatamente reconhecível. Mas é a sua personalidade que verdadeiramente o distingue: sensível, carinhoso com quem confia, perspicaz e dotado de uma memória impressionante que lhe permite aprender centenas de palavras e frases ao longo da vida.</p>
    <p>Em Portugal, o papagaio cinzento tem vindo a ganhar cada vez mais adeptos entre os apreciadores de aves exóticas. A sua capacidade de adaptação ao clima português — desde o norte mais frio ao Algarve mais quente — e a sua longevidade (pode viver mais de 60 anos) fazem dele um companheiro para a vida inteira. É, contudo, uma espécie exigente em termos de estimulação mental e social, pelo que requer tutores dedicados e disponíveis.</p>
    <p>Na Paraíso de Aves, todos os nossos papagaios cinzentos são criados à mão desde pequenos, habituados ao contacto humano diário e socializados em ambiente familiar. Fornecemos toda a documentação CITES exigida por lei, certificado veterinário e acompanhamento pós-venda personalizado.</p>
  `,
  temperHTML:`
    <p>O yaco é uma ave de grande complexidade emocional. Estabelece laços profundos com os seus tutores e pode desenvolver fobia de abandono se não lhe for dado atenção suficiente. É simultaneamente sensível e resiliente: adapta-se bem a novos ambientes quando a transição é feita com calma, mas detesta mudanças bruscas de rotina.</p>
    <p>A sua inteligência manifesta-se de formas surpreendentes: resolve puzzles, reconhece objectos por nome, compreende conceitos abstractos como "igual", "diferente", "maior" e "menor". O trabalho pioneiro da investigadora Dr. Irene Pepperberg com o yaco Alex demonstrou ao mundo científico que estas aves possuem capacidades cognitivas muito além do que se julgava possível em aves.</p>
    <p>Do ponto de vista verbal, um yaco adulto bem estimulado pode ter um vocabulário activo de 300 a 1.000 palavras, utilizando-as em contexto correcto. Mais impressionante ainda, muitos yacos demonstram capacidade de criar frases novas combinando palavras que já conhecem — um nível de produção linguística que vai além da simples imitação.</p>
    <h3>Sociabilidade e Ligação ao Tutor</h3>
    <p>O cinzento africano tende a criar laços muito fortes com uma pessoa principal. Embora possa ser amigável com toda a família, é frequente que eleja um "favorito". Esta característica deve ser gerida com cuidado para evitar ciúmes e comportamentos destrutivos. É importante desde cedo habituá-lo a interagir positivamente com múltiplas pessoas.</p>
  `,
  dietHTML:`
    <p>Uma alimentação equilibrada é essencial para a saúde e longevidade do papagaio cinzento. A base da dieta deve assentar em <strong>pellets de alta qualidade</strong> (60–70% do total), complementados com frutas frescas, vegetais e uma pequena quantidade de sementes e nozes.</p>
    <h3>Alimentos Recomendados</h3>
    <ul>
      <li><strong>Frutas:</strong> maçã (sem sementes), pera, manga, papaia, kiwi, romã, frutos silvestres</li>
      <li><strong>Vegetais:</strong> cenoura, brócolo, espinafres, abóbora, pimento vermelho, batata-doce cozida</li>
      <li><strong>Proteínas:</strong> ovo cozido (ocasionalmente), leguminosas cozidas</li>
      <li><strong>Sementes e nozes:</strong> nozes, amêndoas, avelãs — com moderação, pois são ricas em gordura</li>
    </ul>
    <h3>Alimentos Proibidos</h3>
    <ul>
      <li>Abacate (altamente tóxico)</li>
      <li>Chocolate e café</li>
      <li>Álcool</li>
      <li>Cebola e alho em quantidade</li>
      <li>Sal e alimentos processados</li>
      <li>Sementes de maçã e pêssego (contêm cianeto)</li>
    </ul>
    <p>Os yacos são especialmente susceptíveis à deficiência de cálcio e vitamina A. Certifique-se de que a dieta inclui alimentos ricos nestes nutrientes, como brócolo, cenoura e pimento vermelho. Consulte um veterinário especializado em aves para um plano alimentar personalizado.</p>
  `,
  cageHTML:`
    <p>O yaco necessita de uma jaula espaçosa que lhe permita abrir as asas completamente e movimentar-se com conforto. As dimensões mínimas recomendadas para um adulto são de <strong>90 cm × 60 cm × 120 cm</strong> (largura × profundidade × altura), mas quanto maior melhor.</p>
    <p>Os materiais devem ser resistentes — o yaco tem um bico poderoso capaz de destruir jaulas de construção frágil. Prefira aço inoxidável ou ferro pintado com tintas atóxicas. O espaçamento entre os varões não deve ultrapassar os 2,5 cm para evitar acidentes.</p>
    <h3>Enriquecimento Ambiental</h3>
    <p>Dada a sua elevada inteligência, o papagaio cinzento necessita de estimulação mental constante. A jaula deve conter:</p>
    <ul>
      <li>Vários poleiros de diferentes texturas e espessuras (madeira natural, sisal, acrílico)</li>
      <li>Brinquedos de puzzle e foraging (busca de alimento)</li>
      <li>Brinquedos de destruição (madeira, cortiça, palha) para satisfazer o instinto de mascar</li>
      <li>Espelhos e brinquedos de chocalho para estimulação sensorial</li>
    </ul>
    <p>A temperatura ideal situa-se entre os 18°C e os 26°C. Evite correntes de ar directas e humidade excessiva. Em Portugal, o yaco adapta-se bem ao clima, mas durante os invernos mais frios do interior deve ter-se especial atenção ao aquecimento do espaço.</p>
  `,
  careHTML:`
    <p>O yaco necessita de pelo menos <strong>3 a 4 horas de interacção fora da jaula</strong> por dia. Este tempo deve incluir jogos, treino de comportamentos positivos, exploração livre e contacto físico (caricias no pescoço e cabeça, que são as zonas preferidas).</p>
    <p>O banho é fundamental para a manutenção da plumagem. Dois a três banhos por semana, com spray morno ou um recipiente raso com água, são suficientes. Muitos yacos adoram o banho e rapidamente o associam a um momento prazeroso da rotina diária.</p>
    <h3>Rotina Diária Recomendada</h3>
    <ul>
      <li><strong>Manhã:</strong> Descobrir a gaiola, oferecer alimento fresco, 30 minutos de interacção</li>
      <li><strong>Tarde:</strong> Sessão de treino com reforço positivo (10–15 min), tempo livre fora da jaula</li>
      <li><strong>Noite:</strong> Banho (2–3x/semana), período tranquilo antes de cobrir a gaiola</li>
    </ul>
    <p>O yaco necessita de <strong>10 a 12 horas de descanso nocturno</strong> numa divisão escura e sossegada. Cubra a gaiola com um pano opaco para simular a escuridão da noite — isto regula o ciclo circadiano e promove um comportamento mais calmo durante o dia.</p>
  `,
  healthHTML:`
    <p>O papagaio cinzento africano é geralmente uma ave robusta, mas tem predisposições para certas condições de saúde que o tutor deve conhecer.</p>
    <h3>Doenças Mais Comuns</h3>
    <ul>
      <li><strong>Doença de Becker (PBFD):</strong> Doença vírica que afecta penas e bico. Incurável mas detectável por análise de sangue.</li>
      <li><strong>Aspergilose:</strong> Infecção fúngica do aparelho respiratório, geralmente associada a má ventilação ou humidade excessiva.</li>
      <li><strong>Deficiência de cálcio e vitamina A:</strong> Comum em dietas baseadas exclusivamente em sementes. Pode causar problemas ósseos e imunidade reduzida.</li>
      <li><strong>Depenamento compulsivo:</strong> Comportamento psicológico ligado a falta de estimulação, stress ou doença. Requer avaliação veterinária urgente.</li>
    </ul>
    <h3>Visitas Veterinárias</h3>
    <p>Recomenda-se consulta veterinária anual com um médico veterinário especializado em aves exóticas. Em Portugal, existem clínicas especializadas em Lisboa, Porto, Braga e Coimbra. A Paraíso de Aves fornece contactos de veterinários de confiança na sua área.</p>
  `,
  citesHTML:`
    <p>O papagaio cinzento africano está listado no <strong>Apêndice I da CITES</strong> (Convenção sobre o Comércio Internacional das Espécies da Fauna e Flora Selvagens Ameaçadas de Extinção), o que significa que o seu comércio internacional é altamente regulado.</p>
    <p>Em Portugal, a aquisição de um yaco de criador registado requer a seguinte documentação:</p>
    <ul>
      <li><strong>Certificado CITES:</strong> Emitido pela autoridade competente (ICNF — Instituto da Conservação da Natureza e das Florestas)</li>
      <li><strong>Anilha de identificação:</strong> Anilha fechada colocada na cria, com número de registo único</li>
      <li><strong>Certificado veterinário:</strong> Atestado de saúde emitido por médico veterinário</li>
      <li><strong>Comprovativo da origem do criador:</strong> Documentação do establecimiento de cría registado</li>
    </ul>
    <p>Na Paraíso de Aves, todos estes documentos são fornecidos de forma completa e legal. O nosso estabelecimento de criação está registado junto às autoridades espanholas e os documentos são reconhecidos em toda a União Europeia, incluindo Portugal.</p>
    <p>É ilegal adquirir um papagaio cinzento sem documentação CITES válida em Portugal. Além de constituir crime ambiental, a ausência de documentação impossibilita o acesso a cuidados veterinários adequados e pode resultar na apreensão do animal.</p>
  `,
  deliveryHTML:`
    <p>A Paraíso de Aves entrega papagaios cinzentos em todo Portugal continental, Madeira e Açores. O processo de entrega é cuidadosamente planeado para garantir o bem-estar da ave durante o transporte.</p>
    <h3>Processo de Reserva (Passo a Passo)</h3>
    <ul>
      <li><strong>1. Contacto inicial:</strong> Envie-nos um e-mail ou preencha o formulário desta página</li>
      <li><strong>2. Confirmação de disponibilidade:</strong> Respondemos em menos de 24 horas com informação sobre aves disponíveis</li>
      <li><strong>3. Sinal de reserva:</strong> Após confirmação, é solicitado um sinal para garantir a sua ave</li>
      <li><strong>4. Preparação:</strong> A ave é preparada para a viagem com check-up veterinário e documentação CITES</li>
      <li><strong>5. Entrega:</strong> Envio por transportadora especializada em animais vivos, com caixa IATA certificada</li>
    </ul>
    <p>O tempo de entrega para Portugal continental é geralmente de <strong>1 a 3 dias úteis</strong> após confirmação de pagamento. Para Madeira e Açores, o transporte aéreo implica prazos adicionais e documentação sanitária específica — contacte-nos para detalhes.</p>
    <p><em>Nota legal: A disponibilidade está sujeita a confirmação. O comprador é responsável por verificar os requisitos de posse vigentes na sua área de residência. Toda a documentação está em conformidade com a legislação europeia CITES.</em></p>
  `,
  faqs:[
    {q:'Quanto custa um papagaio cinzento africano em Portugal?',a:'O preço de um yaco criado à mão com documentação CITES completa varia consoante a idade e o nível de socialização. Contacte-nos directamente para obter uma cotação actualizada, pois os preços podem variar com a disponibilidade.'},
    {q:'É legal ter um papagaio cinzento africano em Portugal?',a:'Sim, é completamente legal desde que a ave seja proveniente de criador registado e acompanhada da documentação CITES válida emitida pelas autoridades competentes. A compra em mercado paralelo, sem documentação, é crime ambiental em Portugal.'},
    {q:'Quanto tempo vive um papagaio cinzento africano?',a:'Em cativeiro, com cuidados adequados, o yaco pode viver entre 50 e 70 anos. Existem registos de exemplares que ultrapassaram os 80 anos. É, portanto, um compromisso para a vida inteira — e frequentemente para a vida dos seus herdeiros.'},
    {q:'O papagaio cinzento fala mesmo?',a:'Sim, é a espécie com maior capacidade verbal entre todos os psitacídeos. Um adulto bem estimulado pode aprender entre 300 e 1.000 palavras e utilizá-las em contexto correcto. A maioria começa a imitar sons por volta dos 6 meses e a falar claramente após o primeiro ano.'},
    {q:'É indicado para famílias com crianças?',a:'Pode ser, mas requer supervisão. O yaco é uma ave sensível que pode reagir de forma imprevisível a movimentos bruscos ou barulhos de crianças pequenas. Com crianças mais velhas (acima dos 8 anos) e educação adequada, a convivência é geralmente excelente.'},
    {q:'Pode viver em apartamento?',a:'Sim. O papagaio cinzento adapta-se bem à vida em apartamento desde que tenha espaço suficiente dentro de casa para voar, estimulação mental adequada e pelo menos 3 horas diárias fora da jaula. O nível de ruído é moderado — não é tão barulhento como as araras ou as cacatuas.'},
    {q:'Necessita de licença especial para ter um yaco em Portugal?',a:'Não é necessária uma licença especial para posse doméstica, mas é obrigatório que a ave tenha documentação CITES válida. Em alguns municípios podem existir regulamentos locais sobre posse de animais exóticos — recomendamos verificar junto à Câmara Municipal.'},
    {q:'Qual é a alimentação ideal para um papagaio cinzento?',a:'A base da dieta deve ser pellets de alta qualidade (60–70%), complementados com frutas frescas (maçã, manga, pera), vegetais (cenoura, brócolo, pimento) e uma pequena quantidade de nozes. Evite dietas baseadas exclusivamente em sementes, pois são deficientes em vitaminas e minerais essenciais.'},
    {q:'Como é feita a entrega em Portugal?',a:'Trabalhamos com transportadoras especializadas em animais vivos. A ave viaja numa caixa IATA certificada, com toda a documentação necessária, e é entregue directamente na morada indicada. Para Portugal continental, a entrega demora geralmente 1 a 3 dias úteis após confirmação.'},
  ],
  related:[
    {url:'../../arara-jacinto/',icon:'💙',name:'Arara Jacinto',desc:'A maior arara do mundo'},
    {url:'../../papagaio-eclectus/',icon:'🦜',name:'Papagaio Eclectus',desc:'Dimorfismo sexual único'},
    {url:'../../papagaio-amazona/',icon:'💚',name:'Papagaio Amazona',desc:'Alegre e comunicativo'},
    {url:'../../cacatua-de-crista-amarela/',icon:'🤍',name:'Cacatua de Crista Amarela',desc:'Carinhosa e expressiva'},
  ],
},

/* ── 2. ARARA JACINTO ── */
{
  slug:'arara-jacinto',
  title:'Arara Jacinto à Venda em Portugal | Anodorhynchus hyacinthinus | CITES',
  metaDesc:'Compre uma arara jacinto com documentação CITES em Portugal. A maior arara do mundo, criada à mão em criadeiro registado. Entrega segura em todo Portugal.',
  h1:'Arara Jacinto',
  latinName:'Anodorhynchus hyacinthinus',
  subtitle:'A maior e mais majestosa arara do mundo, disponível com documentação CITES completa e entrega em todo Portugal.',
  badge:'💙 CRIADOR REGISTADO · CITES I · ESPÉCIE RARA',
  trustBadges:['✓ CITES Oficial','✓ Criada à Mão','✓ Maior Arara do Mundo','✓ Garantia de Saúde'],
  price:'Sob Consulta',
  esUrl:'/guacamayos.html',
  ogImage:'guacamayo-jacinto-01.webp',
  imgWebp:'guacamayo-jacinto-01.webp',
  imgJpg:'guacamayo-jacinto-01.jpg',
  imgAlt:'Arara jacinto com plumagem azul cobalto intensa, mostrando o anel ocular amarelo característico',
  imgCaption:'Arara Jacinto (Anodorhynchus hyacinthinus) — A arara mais grande e rara do mundo',
  facts:[
    {v:'50–60 anos',l:'Esperança de Vida'},
    {v:'1,2–1,7 kg',l:'Peso Adulto'},
    {v:'95–100 cm',l:'Comprimento'},
    {v:'Alta',l:'Inteligência'},
    {v:'Médio-alto',l:'Capacidade Verbal'},
    {v:'Muito alto',l:'Nível de Ruído'},
    {v:'Não ideal',l:'Apartamento'},
    {v:'CITES I',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>A arara jacinto é, sem qualquer dúvida, uma das aves mais espectaculares do planeta. Com os seus quase um metro de comprimento e uma plumagem de um azul cobalto profundo que parece mudar de tonalidade com a luz, esta espécie nativa do Brasil central é a maior de todas as araras — e possivelmente o papagaio mais impressionante do mundo.</p>
    <p>Além do tamanho e da beleza, a jacinto distingue-se pelo temperamento. Ao contrário do que a sua dimensão poderia sugerir, é frequentemente descrita como a "arara gentil" — menos agressiva do que muitas espécies menores, tendencialmente carinhosa e afectuosa com os seus tutores. Esta combinação de grandiosidade e doçura torna-a absolutamente inigualável.</p>
    <p>Na natureza, a arara jacinto está listada como espécie vulnerável, com população selvagem de menos de 5.000 exemplares, ameaçados pela perda de habitat e pelo comércio ilegal histórico. Por esta razão, o seu comércio é rigorosamente controlado pela CITES Apêndice I, e apenas exemplares provenientes de criadores registados podem ser legalmente comercializados.</p>
    <p>Na Paraíso de Aves, criamos araras jacinto com os mais elevados padrões de bem-estar animal. As nossas aves são socializadas desde o nascimento, habituadas ao contacto humano e fornecidas com toda a documentação legal exigida. Dada a raridade da espécie, a disponibilidade é limitada — recomendamos contacto antecipado.</p>
  `,
  temperHTML:`
    <p>Apesar da sua dimensão imponente, a arara jacinto é conhecida pela sua personalidade afectuosa e dócil. Estabelece laços de lealdade profundos com os seus tutores e demonstra comportamentos de carinho genuíno — aproximando-se para ser acariciada, vocalizando de forma suave quando está satisfeita e seguindo o seu humano preferido pela casa.</p>
    <p>A sua inteligência é comparável à dos grandes primatas. Resolve puzzles, aprende rotinas complexas e demonstra capacidade de resolução de problemas em situações novas. Ao contrário do papagaio cinzento, que comunica sobretudo verbalmente, a jacinto expressa-se muito através da linguagem corporal — e aprender a interpretá-la é fundamental para uma relação harmoniosa.</p>
    <h3>Energia e Necessidades de Estimulação</h3>
    <p>A arara jacinto é uma ave de alta energia que necessita de muita actividade física e mental. Em liberdade, percorreria dezenas de quilómetros por dia. Em cativeiro, esta energia deve ser canalizada através de tempo fora da jaula, brinquedos robustos (a jacinto destrói facilmente brinquedos convencionais com o seu bico poderoso) e interacção activa com os tutores.</p>
    <p>Não é a espécie indicada para um apartamento de dimensão reduzida. Necessita de espaço generoso, de preferência um aviário ou uma divisão dedicada onde possa voar, e tutores com disponibilidade para lhe dedicar várias horas diárias de atenção.</p>
  `,
  dietHTML:`
    <p>Na natureza, a arara jacinto alimenta-se quase exclusivamente de palmeiras, especialmente da palmeira bocaiúva (<em>Acrocomia aculeata</em>). Em cativeiro, a dieta deve ser adaptada, mas manter sempre a riqueza lipídica e nutritiva necessária para uma ave de grandes dimensões.</p>
    <h3>Alimentação Recomendada</h3>
    <ul>
      <li><strong>Nozes de macadâmia e cocos:</strong> Base fundamental da dieta (30–40%), espelham a dieta natural</li>
      <li><strong>Pellets para araras grandes:</strong> Formulados especificamente, devem representar 30–40% do total</li>
      <li><strong>Frutas tropicais:</strong> Manga, papaia, maracujá, banana — mas com moderação</li>
      <li><strong>Vegetais:</strong> Milho, abóbora, cenoura, pimento vermelho</li>
      <li><strong>Nozes e amêndoas:</strong> Amendoim, noz, amêndoa — excelente fonte de gorduras saudáveis</li>
    </ul>
    <h3>Cuidados Especiais com a Alimentação</h3>
    <p>A jacinto requer mais gordura na dieta do que a maioria dos papagaios, devido ao seu metabolismo e tamanho. No entanto, deve monitorizar-se o peso regularmente para evitar obesidade. Consulte um veterinário especializado para definir as quantidades exactas consoante o peso e a actividade da ave.</p>
  `,
  cageHTML:`
    <p>Uma arara jacinto adulta requer um espaço verdadeiramente generoso. A <strong>jaula mínima</strong> recomendada tem dimensões de <strong>150 cm × 100 cm × 180 cm</strong>, mas o ideal é um aviário exterior coberto ou uma divisão interior dedicada. Muitos tutores de jacinto optam por criar a ave à solta numa divisão especialmente preparada da casa.</p>
    <p>O material da jaula deve ser de aço inox ou aço galvanizado de alta resistência — a jacinto tem um dos bicos mais poderosos do reino animal, capaz de quebrar uma noz de coco. Varões com espessura inferior a 4 mm serão destruídos rapidamente.</p>
    <h3>Poleiros e Enriquecimento</h3>
    <ul>
      <li>Poleiros de madeira dura (carvalho, bétula) com diâmetro de 4–6 cm</li>
      <li>Ramos naturais para mascar e destruir (fonte de enriquecimento e desgaste do bico)</li>
      <li>Brinquedos de aço inox e acrílico resistente (o plástico comum não resiste)</li>
      <li>Puzzle feeders com nozes de macadâmia para estimulação foraging</li>
    </ul>
    <p>A jacinto precisa de luz natural adequada e boa ventilação. Em Portugal, o clima mediterrânico do sul é particularmente favorável. Em regiões mais frias, especialmente no interior norte, deverá garantir aquecimento suplementar nos meses de inverno (temperatura mínima de 15°C).</p>
  `,
  careHTML:`
    <p>A arara jacinto necessita de <strong>4 a 6 horas de interacção e actividade fora da jaula</strong> por dia. É uma ave muito física — adora trepar, pendurar-se de cabeça para baixo e explorar o ambiente. O tutor deve criar um espaço seguro onde a ave possa fazer isto sem risco de acidentes.</p>
    <p>O banho é altamente apreciado pela jacinto. Dois a três banhos por semana, preferencialmente com spray de água morna, mantêm a plumagem azul lustrosa e reduzem o pó de penas. Algumas jacinto adoram duches directamente sob a água corrente — observe as preferências da sua ave e adapte-se.</p>
    <h3>Treino e Comportamento</h3>
    <p>O treino por reforço positivo é essencial para uma jacinto bem comportada. Uma ave não treinada, dado o seu tamanho e força, pode tornar-se difícil de gerir. Sessões curtas (10–15 minutos) de treino diário, com recompensas de comida favorita, produzem resultados excelentes em poucas semanas.</p>
    <p>O desgaste natural do bico pode ser promovido fornecendo ramos de madeira natural para mascar. Nunca tente aparar o bico em casa — é um procedimento que deve ser feito exclusivamente por veterinário especializado.</p>
  `,
  healthHTML:`
    <p>A arara jacinto, quando bem cuidada e alimentada, é uma ave geralmente saudável e resistente. Contudo, existem algumas condições de saúde a que o tutor deve estar atento.</p>
    <h3>Condições Mais Frequentes</h3>
    <ul>
      <li><strong>Proventiculite Dilatante (PDD):</strong> Doença neurológica viral que afecta a digestão. Sintomas incluem perda de peso, regurgitação e plumagem em mau estado.</li>
      <li><strong>Psitacose (Clamidiose):</strong> Infecção bacteriana transmissível ao ser humano. Requer diagnóstico e tratamento veterinário imediatos.</li>
      <li><strong>Papilomatose:</strong> Lesões benignas na cavidade oral e cloaca. Mais comum em araras.</li>
      <li><strong>Crescimento anormal do bico:</strong> Pode ocorrer por deficiências nutricionais ou traumatismos. Tratamento veterinário necessário.</li>
    </ul>
    <p>Recomenda-se consulta veterinária anual e análises de sangue para monitorização do estado de saúde geral. A detecção precoce de problemas é a melhor prevenção contra doenças graves.</p>
  `,
  citesHTML:`
    <p>A arara jacinto está listada no <strong>Apêndice I da CITES</strong> — o nível de protecção mais elevado. Isto significa que qualquer comércio internacional desta espécie requer licenças especiais e é altamente restringido. Em Portugal, a posse de uma jacinto sem documentação válida pode resultar em coimas severas e apreensão da ave.</p>
    <p>A documentação obrigatória inclui:</p>
    <ul>
      <li>Certificado CITES emitido pela autoridade competente (em Espanha: MITERD; em Portugal: ICNF)</li>
      <li>Anilha de identificação fechada com número de registo único</li>
      <li>Certificado veterinário de saúde</li>
      <li>Comprovativo de origem do criador registado</li>
    </ul>
    <p>Todos os exemplares da Paraíso de Aves são criados no nosso estabelecimento registado em Llíria, Espanha. A documentação é 100% válida em toda a União Europeia, incluindo Portugal, e é fornecida completa no momento da entrega.</p>
  `,
  deliveryHTML:`
    <p>Dado o tamanho e a delicadeza da espécie, o transporte da arara jacinto é planeado com especial cuidado. A ave viaja numa caixa IATA certificada de tamanho adequado, com ventilação, água disponível e alimento para a duração da viagem.</p>
    <h3>Processo de Reserva</h3>
    <ul>
      <li><strong>1. Consulta inicial:</strong> Contacte-nos para verificar disponibilidade (a jacinto tem disponibilidade limitada)</li>
      <li><strong>2. Visita virtual ou presencial:</strong> Poderá conhecer a ave por videochamada ou visitar-nos em Llíria</li>
      <li><strong>3. Sinal de reserva:</strong> Para confirmar a reserva, é solicitado um sinal</li>
      <li><strong>4. Preparação:</strong> Check-up veterinário, documentação CITES, caixa de transporte certificada</li>
      <li><strong>5. Entrega:</strong> Transportadora especializada em animais vivos, com seguro de transporte</li>
    </ul>
    <p>Para Portugal continental, a entrega é feita em 1 a 3 dias úteis. Para ilhas, requer coordenação adicional — contacte-nos para um orçamento específico.</p>
  `,
  faqs:[
    {q:'Quanto custa uma arara jacinto em Portugal?',a:'A arara jacinto é uma das espécies mais dispendiosas do mundo. O preço varia consoante a idade, o nível de socialização e a documentação incluída. Contacte-nos para uma cotação actualizada.'},
    {q:'É legal ter uma arara jacinto em Portugal?',a:'Sim, desde que proveniente de criador registado com documentação CITES I válida. A compra sem documentação é crime ambiental e pode resultar em coimas avultadas e apreensão da ave.'},
    {q:'Quanto vive uma arara jacinto em cativeiro?',a:'Com cuidados adequados, a arara jacinto pode viver entre 50 e 60 anos em cativeiro, havendo registos de animais mais longevos. É um compromisso de vida que deve ser ponderado seriamente.'},
    {q:'A arara jacinto fala?',a:'Sim, embora não seja a espécie com maior capacidade verbal. Uma jacinto criada à mão aprende geralmente algumas dezenas de palavras e frases, mas a sua principal forma de comunicação é através de vocalizações características e linguagem corporal.'},
    {q:'É indicada para famílias com crianças?',a:'Com crianças mais velhas e supervisionadas, pode funcionar bem. A jacinto é dócil mas poderosa — o seu bico pode causar lesões sérias se a ave se sentir ameaçada. Não é recomendada como primeira ave, especialmente em famílias com crianças pequenas.'},
    {q:'Pode viver em apartamento?',a:'Não é a espécie mais indicada para apartamentos. Devido ao seu tamanho e nível de energia, necessita de muito espaço. Além disso, as suas vocalizações são muito intensas e podem ser incómodas em ambientes de vizinhança próxima.'},
    {q:'Qual a alimentação específica da arara jacinto?',a:'A base da dieta deve ser nozes de macadâmia e pellets específicos para araras grandes. Complementada com frutas tropicais, vegetais e outras nozes. Necessita de mais gordura na dieta do que a maioria dos papagaios.'},
    {q:'Quanto espaço precisa uma arara jacinto?',a:'Necessita de uma jaula de pelo menos 150×100×180 cm, mas o ideal é um aviário ou divisão dedicada. É a ave que mais espaço ocupa entre todas as espécies de psitacídeos disponíveis em cativeiro.'},
    {q:'Existe apoio pós-venda da Paraíso de Aves?',a:'Sim. Após a entrega, mantemos contacto regular com os tutores, fornecemos aconselhamento nutricional e comportamental, e disponibilizamos contactos de veterinários especializados em aves exóticas em todo Portugal.'},
  ],
  related:[
    {url:'../../arara-azul-e-amarela/',icon:'💛',name:'Arara Azul e Amarela',desc:'Colorida e sociável'},
    {url:'../../arara-escarlate/',icon:'❤️',name:'Arara Escarlate',desc:'Vibrante e inteligente'},
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
    {url:'../../cacatua-de-crista-amarela/',icon:'🤍',name:'Cacatua de Crista Amarela',desc:'Carinhosa e vistosa'},
  ],
},

/* ── 3. ARARA AZUL E AMARELA ── */
{
  slug:'arara-azul-e-amarela',
  title:'Arara Azul e Amarela à Venda em Portugal | Ara ararauna | CITES',
  metaDesc:'Compre uma arara azul e amarela com documentação CITES em Portugal. Criada à mão, colorida e sociável, entrega em todo Portugal. Criador registado com 25+ anos.',
  h1:'Arara Azul e Amarela',
  latinName:'Ara ararauna',
  subtitle:'Uma das araras mais populares do mundo — espectacular, sociável e cheia de personalidade, com entrega certificada em todo Portugal.',
  badge:'💛 CRIADOR REGISTADO · CITES II · MUITO SOCIÁVEL',
  trustBadges:['✓ CITES Oficial','✓ Criada à Mão','✓ Envio Portugal','✓ Apoio Pós-Venda'],
  price:'Sob Consulta',
  esUrl:'/guacamayos.html',
  ogImage:'guacamayo-azul-01.webp',
  imgWebp:'guacamayo-azul-01.webp',
  imgJpg:'guacamayo-azul-01.jpg',
  imgAlt:'Arara azul e amarela com plumagem azul cobalto nas asas e amarelo brilhante no peito, posada num poleiro de madeira',
  imgCaption:'Arara Azul e Amarela (Ara ararauna) — Uma das araras mais populares em Portugal e no mundo',
  facts:[
    {v:'50–60 anos',l:'Esperança de Vida'},
    {v:'900–1200 g',l:'Peso Adulto'},
    {v:'76–86 cm',l:'Comprimento'},
    {v:'Alta',l:'Inteligência'},
    {v:'Alto',l:'Capacidade Verbal'},
    {v:'Muito alto',l:'Nível de Ruído'},
    {v:'Espaço grande',l:'Apartamento'},
    {v:'CITES II',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>A arara azul e amarela é, provavelmente, a arara mais reconhecida e popular do mundo. O contraste dramático entre o azul cobalto das costas e asas e o amarelo brilhante do peito e ventre torna-a inconfundível — uma ave que parece saída diretamente de um quadro tropical.</p>
    <p>Nativa das florestas tropicais da América Central e do Sul, do México ao Brasil, a <em>Ara ararauna</em> habita essencialmente zonas florestadas próximas de rios e zonas húmidas. Em liberdade, vive em bandos ruidosos e activos, percorrendo grandes distâncias diariamente em busca de alimento.</p>
    <p>Em cativeiro, destaca-se pela sua natureza sociável e comunicativa. É uma das araras que mais fácil e rapidamente cria laços com os tutores, tornando-se verdadeiramente um membro da família. Tem excelente capacidade verbal — aprende palavras e frases com facilidade — e uma personalidade extrovertida que a torna o centro das atenções em qualquer sala.</p>
    <p>A Paraíso de Aves disponibiliza araras azul e amarela criadas à mão no nosso estabelecimento registado em Llíria, Espanha. Toda a documentação CITES está incluída, assim como certificado veterinário e caixa de transporte IATA. Entregamos em todo o território nacional.</p>
  `,
  temperHTML:`
    <p>A arara azul e amarela é frequentemente descrita como "a arara para todos" — suficientemente sociável para se adaptar a famílias animadas, suficientemente inteligente para se manter estimulada com interacção regular, e suficientemente afectuosa para criar laços profundos com os seus tutores.</p>
    <p>É, por natureza, uma ave muito vocal e expressiva. Comunica o seu estado de espírito de forma clara: canta quando está feliz, vocaliza de forma aguda quando quer atenção e produz sons suaves quando está relaxada e satisfeita. Aprender a "ler" a sua linguagem corporal — posição das penas da cabeça, pupila dilatada ou contraída, postura do corpo — é fascinante e aproxima enormemente a relação tutor-ave.</p>
    <h3>Relação com Outros Animais e Crianças</h3>
    <p>Geralmente tolera bem outros animais domésticos quando a socialização é feita progressivamente. Com crianças mais velhas é, habitualmente, muito brincalhona. A sua exuberância vocal pode ser uma limitação em ambientes de vizinhança muito próxima — é uma ave genuinamente barulhenta.</p>
  `,
  dietHTML:`
    <p>A arara azul e amarela tem necessidades nutricionais diferentes de papagaios de médio porte. O seu metabolismo mais acelerado e o maior gasto energético requerem uma dieta mais calórica e variada.</p>
    <h3>Alimentos Recomendados</h3>
    <ul>
      <li><strong>Pellets para araras:</strong> 40–50% da dieta total</li>
      <li><strong>Frutas frescas:</strong> Manga, papaia, kiwi, maçã, pêra, uvas (sem sementes), romã</li>
      <li><strong>Vegetais frescos:</strong> Milho, pimento, cenoura, brócolo, espinafres, couve</li>
      <li><strong>Nozes e sementes:</strong> Noz, amêndoa, amendoim, pinhão — importantes fontes de gordura saudável</li>
      <li><strong>Cereais cozidos:</strong> Arroz integral, quinoa, aveia — excelentes alternativas nutritivas</li>
    </ul>
    <p>Ofereça variedade — a arara azul e amarela tende a entediar-se com a monotonia alimentar e pode tornar-se selectiva. Introduza novos alimentos gradualmente e de forma lúdica (escondidos em brinquedos de foraging).</p>
  `,
  cageHTML:`
    <p>Uma arara azul e amarela adulta necessita de uma jaula de no mínimo <strong>120 cm × 80 cm × 150 cm</strong>. Dada a sua envergadura de quase um metro, esta dimensão é realmente o mínimo — espaços maiores são sempre preferíveis.</p>
    <p>Os materiais devem ser resistentes: aço inox ou ferro com revestimento atóxico. Os varões devem ter espessura adequada para suportar o bico poderoso da arara. Muitos tutores optam por um aviário exterior coberto, especialmente em regiões do sul de Portugal com clima mais quente.</p>
    <h3>Posicionamento e Ambiente</h3>
    <p>A jaula deve ser colocada numa área de passagem frequente — a arara gosta de ser o centro da actividade doméstica. Evite locais com correntes de ar, próximos de janelas sem protecção solar directa, ou perto de cozinhas onde fumos de teflon ou vapores de cozinha podem ser letais para aves.</p>
    <ul>
      <li>Poleiros de madeira natural de diferentes diâmetros</li>
      <li>Brinquedos de destruição (ramos, caixas de cartão, espiga de milho)</li>
      <li>Brinquedos de intelecto (puzzle feeders, foraging toys)</li>
      <li>Argolas e baloiços — araras adoram acrobacias</li>
    </ul>
  `,
  careHTML:`
    <p>A arara azul e amarela necessita de pelo menos <strong>3 a 5 horas fora da jaula</strong> por dia. Este tempo deve incluir voo livre num espaço seguro, interacção com os tutores, e sessões de treino por reforço positivo.</p>
    <p>A asa deve ser aparada? Esta é uma questão dividida entre os especialistas. A asa aparada torna a ave mais segura em casa mas limita o exercício. A asa intacta permite voo completo mas exige ambiente doméstico muito seguro. Consulte o seu veterinário para tomar a decisão mais adequada à sua situação.</p>
    <h3>Higiene e Banho</h3>
    <p>O banho pode ser oferecido 2 a 3 vezes por semana com spray de água morna ou num recipiente pouco fundo. Algumas araras preferem o duche — coloque-as num poleiro dentro da casa de banho enquanto toma duche. A plumagem mantém-se mais brilhante e saudável com banhos regulares.</p>
  `,
  healthHTML:`
    <p>A arara azul e amarela é uma espécie relativamente robusta, com boa longevidade quando bem cuidada. Os principais riscos de saúde incluem:</p>
    <ul>
      <li><strong>Psitacose:</strong> Infecção bacteriana por <em>Chlamydia psittaci</em>. Detectável e tratável. Consulta veterinária urgente se suspeitar.</li>
      <li><strong>PBFD (Doença do Bico e Penas):</strong> Vírus que afecta o crescimento das penas e do bico. Detecção por análise de sangue.</li>
      <li><strong>Deficiência de vitamina A:</strong> Comum em dietas pobres em vegetais. Manifesta-se por sinais respiratórios e lesões na mucosa.</li>
      <li><strong>Obesidade:</strong> Risco em aves com acesso ilimitado a alimentos calóricos e pouco exercício. Monitorize o peso regularmente.</li>
    </ul>
    <p>Consultas veterinárias anuais com especialista em aves exóticas são fundamentais. Em Portugal, existem clínicas especializadas nos principais centros urbanos.</p>
  `,
  citesHTML:`
    <p>A arara azul e amarela está listada no <strong>Apêndice II da CITES</strong>, o que significa que o seu comércio é permitido mas regulado. Em Portugal, é obrigatório que qualquer exemplar em posse doméstica seja acompanhado de documentação CITES válida emitida por criador registado.</p>
    <p>A documentação fornecida pela Paraíso de Aves inclui:</p>
    <ul>
      <li>Certificado CITES Apêndice II</li>
      <li>Anilha fechada com número de identificação único</li>
      <li>Certificado veterinário de saúde</li>
      <li>Registo do estabelecimento de criação (válido em toda a UE)</li>
    </ul>
    <p>Apesar de ser Apêndice II (menos restritivo que o I), a ausência de documentação continua a ser crime ambiental em Portugal e nos restantes países da UE. Nunca adquira uma arara sem documentação completa.</p>
  `,
  deliveryHTML:`
    <p>Entregamos araras azul e amarela em todo o território nacional. A ave viaja numa caixa IATA certificada, com espaço adequado ao seu tamanho, boa ventilação e alimento e água disponíveis durante a viagem.</p>
    <h3>Prazos e Processo</h3>
    <ul>
      <li>Portugal continental: entrega em 1–3 dias úteis após confirmação</li>
      <li>Madeira: transporte aéreo, prazo de 3–5 dias úteis, documentação sanitária adicional</li>
      <li>Açores: transporte aéreo, prazo de 3–5 dias úteis, documentação sanitária adicional</li>
    </ul>
    <p>Para reserva, contacte-nos pelo formulário abaixo ou por e-mail. Respondemos em menos de 24 horas com informação de disponibilidade e preços actualizados.</p>
  `,
  faqs:[
    {q:'Quanto custa uma arara azul e amarela em Portugal?',a:'O preço varia consoante a idade e o nível de socialização. Contacte-nos directamente para uma cotação actualizada. O preço inclui sempre documentação CITES, certificado veterinário e caixa de transporte.'},
    {q:'É legal ter uma arara azul e amarela em Portugal?',a:'Sim, desde que proveniente de criador registado com documentação CITES II válida. Sem documentação, a posse é ilegal e pode resultar em coimas e apreensão do animal.'},
    {q:'Quanto vive uma arara azul e amarela?',a:'Em cativeiro com cuidados adequados, pode viver entre 50 e 60 anos. É um compromisso de longo prazo que deve ser seriamente ponderado antes da aquisição.'},
    {q:'A arara azul e amarela fala muito?',a:'Sim! É uma das araras com maior capacidade vocal. Adultos bem estimulados aprendem dezenas a centenas de palavras e tendem a usar frases em contexto. A maioria começa a imitar sons nos primeiros meses de vida.'},
    {q:'É adequada para famílias com crianças?',a:'Com supervisão adequada e crianças responsáveis (a partir dos 10 anos), a arara azul e amarela é geralmente muito sociável com toda a família. Envolva os filhos no cuidado diário para criar uma ligação positiva.'},
    {q:'Pode viver em apartamento?',a:'É possível em apartamentos amplos, mas as suas vocalizações são muito intensas e podem criar conflitos com vizinhos. Idealmente, deve ter acesso a espaço exterior ou uma divisão grande para voar livremente.'},
    {q:'Com que frequência precisa de atenção?',a:'Diariamente. A arara azul e amarela necessita de pelo menos 3 a 5 horas de interacção e tempo fora da jaula por dia. Aves deixadas sozinhas por longos períodos podem desenvolver comportamentos destrutivos e depenamento.'},
    {q:'Qual a diferença entre a arara azul e amarela e a arara jacinto?',a:'A jacinto é significativamente maior, mais rara e mais cara. A azul e amarela tem temperamento geralmente mais extrovertido e é mais fácil de encontrar de criadores registados. Ambas necessitam de muito espaço e atenção.'},
    {q:'Como é feito o transporte para Portugal?',a:'A ave viaja numa caixa IATA certificada por transportadora especializada em animais vivos. Para Portugal continental, a entrega demora 1 a 3 dias. Para ilhas, coordenamos transporte aéreo com documentação sanitária específica.'},
  ],
  related:[
    {url:'../../arara-jacinto/',icon:'💙',name:'Arara Jacinto',desc:'A maior arara do mundo'},
    {url:'../../arara-escarlate/',icon:'❤️',name:'Arara Escarlate',desc:'Vermelha e vibrante'},
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
    {url:'../../papagaio-amazona/',icon:'💚',name:'Papagaio Amazona',desc:'Alegre e comunicativo'},
  ],
},

/* ── 4. ARARA ESCARLATE ── */
{
  slug:'arara-escarlate',
  title:'Arara Escarlate à Venda em Portugal | Ara macao | CITES | Criador',
  metaDesc:'Compre uma arara escarlate com documentação CITES em Portugal. Ave exótica espectacular, criada à mão. Criador registado em Llíria, Espanha. Entrega em Portugal.',
  h1:'Arara Escarlate',
  latinName:'Ara macao',
  subtitle:'Uma das aves mais belas do planeta — vermelho, amarelo e azul em perfeita harmonia — com documentação CITES e entrega em todo Portugal.',
  badge:'❤️ CRIADOR REGISTADO · CITES I · ESPÉCIE PROTEGIDA',
  trustBadges:['✓ CITES Oficial','✓ Criada à Mão','✓ Envio Portugal','✓ Certificado Vet.'],
  price:'Sob Consulta',
  esUrl:'/guacamayo-escarlata.html',
  ogImage:'guacamayo-escarlata-01.webp',
  imgWebp:'guacamayo-escarlata-01.webp',
  imgJpg:'guacamayo-escarlata-01.jpg',
  imgAlt:'Arara escarlate com plumagem vermelho vivo, asas com azul e amarelo, em voo rasante sobre a floresta',
  imgCaption:'Arara Escarlate (Ara macao) — Símbolo de beleza tropical e símbolo nacional da Honduras',
  facts:[
    {v:'40–50 anos',l:'Esperança de Vida'},
    {v:'900–1100 g',l:'Peso Adulto'},
    {v:'81–96 cm',l:'Comprimento'},
    {v:'Alta',l:'Inteligência'},
    {v:'Médio-alto',l:'Capacidade Verbal'},
    {v:'Muito alto',l:'Nível de Ruído'},
    {v:'Espaço grande',l:'Apartamento'},
    {v:'CITES I',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>A arara escarlate é uma das aves mais fotogénicas e reconhecidas no mundo inteiro. Com as suas cores vivas e contrastantes — um vermelho profundo no corpo, amarelo nas coberturas das asas e azul nas rémiges — é muitas vezes considerada o paradigma das aves tropicais. Não é por acaso que é o símbolo nacional da Honduras e aparece nas bandeiras e brasões de vários países centro-americanos.</p>
    <p>Nativa das florestas tropicais desde o sul do México até ao Brasil, a arara escarlate habita sobretudo zonas costeiras, manguezais e florestas de altitude média. Em liberdade, é uma ave social que vive em casais permanentes e bandos familiares, voando enormes distâncias diárias em busca de frutos, nozes e sementes.</p>
    <p>Em cativeiro, é uma ave de personalidade forte e independente — mais assertiva do que a arara azul e amarela, por exemplo. Requer tutores experientes e consistentes, capazes de estabelecer limites claros e de manter uma rotina de treino por reforço positivo. Em boas mãos, é uma companheira extraordinária e absolutamente fascinante.</p>
    <p>A Paraíso de Aves cria araras escarlate no nosso estabelecimento registado em Llíria, Valência, com toda a documentação CITES I exigida pela legislação europeia. Dada a natureza protegida da espécie, a disponibilidade pode ser limitada — contacte-nos com antecedência para verificar a disponibilidade de exemplares.</p>
  `,
  temperHTML:`
    <p>A arara escarlate tem uma personalidade marcante e, por vezes, desafiante. É inteligente e perspicaz — consegue rapidamente perceber as inconsistências no comportamento do tutor e explorar isso a seu favor. Este traço de carácter torna-a fascinante mas também exigente: requer tutores consistentes e com experiência em aves grandes.</p>
    <p>Em contraste com a arara azul e amarela (geralmente mais dócil), a escarlate pode mostrar comportamentos territoriais na fase de maturidade sexual, que se inicia por volta dos 3 a 5 anos. Sessões regulares de treino e socialização desde novo são fundamentais para prevenir comportamentos agressivos no adulto.</p>
    <h3>Expressividade e Comunicação</h3>
    <p>A arara escarlate é altamente expressiva. As suas mudanças de humor são evidentes: as penas da cabeça eriçam-se quando está excitada, as pupilas contraem-se rapidamente quando está estimulada ou alerta, e o corpo relaxa completamente quando se sente segura e confortável. Aprender a ler estes sinais é essencial para construir uma relação de confiança.</p>
  `,
  dietHTML:`
    <p>Em liberdade, a arara escarlate tem uma dieta mais variada e rica em gorduras do que a maioria das araras, incluindo regularmente frutos imaturos e sementes ricas em lípidos que outras espécies evitam devido aos seus taninos.</p>
    <h3>Alimentação em Cativeiro</h3>
    <ul>
      <li><strong>Pellets para araras:</strong> 40–50% da dieta, especificamente formulados para araras grandes</li>
      <li><strong>Frutos tropicais:</strong> Manga, papaia, banana, maracujá, kiwi</li>
      <li><strong>Frutos silvestres:</strong> Romã, mirtilo, framboesa — ricos em antioxidantes</li>
      <li><strong>Nozes:</strong> Noz, macadâmia, amendoim, pinhão — importante componente lipídica</li>
      <li><strong>Vegetais:</strong> Pimento vermelho (ótimo para vitamina A), milho, cenoura, batata-doce</li>
    </ul>
    <p>A escarlate tem uma particular preferência por alimentos duros e resistentes que desafiem o bico. Ofereça nozes com casca, espiga de milho inteira e cenouras cruas para enriquecimento alimentar.</p>
  `,
  cageHTML:`
    <p>A arara escarlate, com a sua envergadura de asa que pode atingir os 120 cm, necessita de uma jaula verdadeiramente generosa. As dimensões mínimas recomendadas são de <strong>120 cm × 80 cm × 150 cm</strong>, mas um aviário exterior coberto é a solução ideal para Portugal, especialmente nas regiões mais quentes do sul.</p>
    <p>A construção deve ser em aço inox ou ferro galvanizado de alta resistência. A arara escarlate tem um dos bicos mais poderosos entre as araras de tamanho médio-grande — jaulas de construção frágil serão deterioradas rapidamente.</p>
    <h3>Enriquecimento Obrigatório</h3>
    <ul>
      <li>Brinquedos de destruição renovados frequentemente (ramos, caixas, palha entrelaçada)</li>
      <li>Puzzle feeders para estimulação cognitiva durante o dia</li>
      <li>Poleiros a diferentes alturas (as araras preferem estar no ponto mais alto do espaço)</li>
      <li>Baloiços e argolas para exercício e acrobacias</li>
    </ul>
  `,
  careHTML:`
    <p>A arara escarlate necessita de <strong>4 a 5 horas de interacção diária</strong> fora da jaula. É uma ave que se entedia facilmente e pode desenvolver comportamentos destrutivos (depenamento, gritos excessivos) quando privada de estimulação.</p>
    <p>O treino por reforço positivo é especialmente importante nesta espécie. Invista tempo diário em sessões de treino curtas mas consistentes — o reforço positivo com comida favorita produz resultados excelentes e fortalece o vínculo tutor-ave.</p>
    <h3>Manutenção da Plumagem</h3>
    <p>A plumagem vibrante da arara escarlate mantém-se em óptimo estado com banhos regulares (2–3 vezes por semana) e boa nutrição. Uma dieta deficiente manifesta-se rapidamente na qualidade das penas — cores desbotadas ou penas danificadas são geralmente sinal de carências nutricionais.</p>
  `,
  healthHTML:`
    <p>A arara escarlate é geralmente saudável quando bem cuidada, mas tem algumas susceptibilidades específicas:</p>
    <ul>
      <li><strong>Papilomatose viral:</strong> Tumores benignos na cavidade oral, cloaca e trato digestivo. Mais frequente em araras do que em outros psitacídeos.</li>
      <li><strong>Proventiculite Dilatante (PDD):</strong> Doença viral neurológica que afecta o aparelho digestivo. Progressiva e actualmente sem cura.</li>
      <li><strong>Bacteriémia por picadas:</strong> O bico poderoso pode causar infecções graves ao tutor. Nunca subestime uma mordidela de arara — recorra a cuidados médicos se ocorrer uma lesão significativa.</li>
    </ul>
    <p>Consultas veterinárias anuais, vacinação e análises de sangue preventivas são fundamentais para detectar precocemente qualquer anomalia de saúde.</p>
  `,
  citesHTML:`
    <p>A arara escarlate está incluída no <strong>Apêndice I da CITES</strong>, o nível de protecção mais elevado. Em Portugal, é completamente ilegal possuir uma arara escarlate sem documentação CITES I válida emitida por criador registado junto às autoridades competentes.</p>
    <p>Todos os nossos exemplares são criados no estabelecimento registado da Paraíso de Aves em Llíria, Espanha, com autorização das autoridades espanholas de meio ambiente (MITERD). A documentação é válida em toda a União Europeia, incluindo Portugal.</p>
    <p>A documentação inclui: certificado CITES I, anilha de identificação fechada, certificado veterinário de saúde e registo do criador. Todos os documentos são entregues em mão no momento da entrega da ave.</p>
  `,
  deliveryHTML:`
    <p>O transporte de araras escarlate para Portugal é efectuado por transportadora especializada em animais vivos, com toda a documentação necessária. A caixa de transporte IATA é escolhida em função do tamanho do animal e cumpre todos os requisitos internacionais de bem-estar animal no transporte.</p>
    <ul>
      <li><strong>Portugal continental:</strong> 1 a 3 dias úteis após confirmação</li>
      <li><strong>Madeira e Açores:</strong> Transporte aéreo, prazo adicional de 2 a 4 dias</li>
    </ul>
    <p>Para reserva, utilize o formulário nesta página ou envie-nos um e-mail. Informamos sobre disponibilidade e detalhes de preço em menos de 24 horas.</p>
  `,
  faqs:[
    {q:'Quanto custa uma arara escarlate em Portugal?',a:'Dado que é uma espécie CITES I com disponibilidade limitada de criadores registados, o preço é significativo. Contacte-nos para uma cotação actualizada que inclui toda a documentação e transporte.'},
    {q:'É legal ter uma arara escarlate em Portugal?',a:'Sim, desde que a ave seja proveniente de criador registado com documentação CITES I completa. Sem essa documentação, a posse é crime ambiental punível com coimas e apreensão do animal.'},
    {q:'A arara escarlate é mais difícil de manter do que a arara azul e amarela?',a:'Geralmente sim. A escarlate tem uma personalidade mais assertiva e independente, o que a torna mais desafiante para tutores sem experiência prévia com araras. Recomendamos esta espécie a tutores com alguma experiência em psitacídeos grandes.'},
    {q:'Quanto vive uma arara escarlate em cativeiro?',a:'Com cuidados adequados, pode viver entre 40 e 50 anos. Existem registos de exemplares que ultrapassaram os 60 anos em condições excepcionais de cuidado.'},
    {q:'A arara escarlate fala?',a:'Sim, aprende palavras e frases, embora a sua capacidade verbal seja geralmente inferior à da arara azul e amarela ou do papagaio cinzento. O seu talento principal reside na mímica de sons ambientais e na sua expressividade vocal geral.'},
    {q:'É segura para famílias com crianças?',a:'A arara escarlate não é a espécie mais indicada para famílias com crianças pequenas. Com adolescentes supervisionados que respeitem os limites da ave, pode funcionar bem. Requer tutores experientes e consistentes.'},
    {q:'Qual é o nível de ruído da arara escarlate?',a:'Muito alto. As suas vocalizações são intensas e podem ser audíveis a distâncias consideráveis. Não é a espécie mais adequada para ambientes urbanos com vizinhos próximos.'},
    {q:'Precisa de licença especial em Portugal?',a:'Não existe uma licença especial de posse doméstica, mas a documentação CITES I é obrigatória. Recomendamos também verificar os regulamentos municipais locais sobre posse de espécies exóticas protegidas.'},
    {q:'Qual é o processo de reserva na Paraíso de Aves?',a:'Contacte-nos por e-mail ou formulário, verificamos disponibilidade, enviamos proposta com detalhes e preço, após confirmação solicitamos sinal de reserva. A ave é preparada com check-up veterinário e documentação e entregue na data acordada.'},
  ],
  related:[
    {url:'../../arara-jacinto/',icon:'💙',name:'Arara Jacinto',desc:'A maior arara'},
    {url:'../../arara-azul-e-amarela/',icon:'💛',name:'Arara Azul e Amarela',desc:'Muito sociável'},
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
    {url:'../../cacatua-de-crista-amarela/',icon:'🤍',name:'Cacatua de Crista Amarela',desc:'Branca e expressiva'},
  ],
},

/* ── 5. CACATUA DE CRISTA AMARELA ── */
{
  slug:'cacatua-de-crista-amarela',
  title:'Cacatua de Crista Amarela à Venda em Portugal | Cacatua galerita | CITES',
  metaDesc:'Compre uma cacatua de crista amarela com documentação CITES em Portugal. Carinhosa, expressiva e cheia de personalidade. Criador registado, entrega em todo Portugal.',
  h1:'Cacatua de Crista Amarela',
  latinName:'Cacatua galerita',
  subtitle:'A cacatua mais popular do mundo — branca, carinhosa e com uma personalidade que preenche qualquer sala. Com CITES e entrega em todo Portugal.',
  badge:'🤍 CRIADOR REGISTADO · CITES II · MUITO CARINHOSA',
  trustBadges:['✓ CITES Oficial','✓ Criada à Mão','✓ Envio Portugal','✓ Apoio Pós-Venda'],
  price:'Sob Consulta',
  esUrl:'/cacatua.html',
  ogImage:'cacatua-01.webp',
  imgWebp:'cacatua-01.webp',
  imgJpg:'cacatua-01.jpg',
  imgAlt:'Cacatua de crista amarela com plumagem branca imaculada e crista amarela erguida, posada num poleiro de madeira natural',
  imgCaption:'Cacatua de Crista Amarela (Cacatua galerita) — Elegância branca com uma personalidade inigualável',
  facts:[
    {v:'40–60 anos',l:'Esperança de Vida'},
    {v:'820–970 g',l:'Peso Adulto'},
    {v:'44–55 cm',l:'Comprimento'},
    {v:'Alta',l:'Inteligência'},
    {v:'Médio',l:'Capacidade Verbal'},
    {v:'Muito alto',l:'Nível de Ruído'},
    {v:'Espaço grande',l:'Apartamento'},
    {v:'CITES II',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>A cacatua de crista amarela, também conhecida como cacatua-de-crista-enxofre, é possivelmente a espécie de cacatua mais conhecida e popular do mundo. Com a sua plumagem branca imaculada e a crista amarelo-enxofre que ereciona dramaticamente em momentos de emoção ou excitação, é uma ave que alia beleza clássica a uma personalidade exuberante e muito carinhosa.</p>
    <p>Nativa da Austrália, da Nova Guiné e das ilhas adjacentes, a cacatua de crista amarela habita uma vasta gama de ambientes — desde florestas tropicais a savanas e zonas agrícolas. É uma espécie altamente adaptável que, em certas zonas da Austrália, atingiu populações tão grandes que é considerada praga agrícola. Esta resiliência reflecte-se também na sua capacidade de adaptação ao cativeiro.</p>
    <p>Em Portugal, a cacatua de crista amarela tem conquistado cada vez mais adeptos entre os tutores de aves exóticas. A sua natureza afectuosa — frequentemente descrita como "um cão com penas" — e a sua longevidade fazem dela um companheiro de vida verdadeiramente especial. É, contudo, uma ave extremamente dependente de atenção e interacção, pelo que requer tutores com disponibilidade real para lhe dedicar tempo diário.</p>
    <p>A Paraíso de Aves disponibiliza cacatuas de crista amarela criadas à mão no nosso estabelecimento registado, com toda a documentação CITES incluída. Entregamos em todo o território nacional, incluindo ilhas.</p>
  `,
  temperHTML:`
    <p>A cacatua de crista amarela é, talvez, a espécie de psitacídeo com maior necessidade emocional de entre todas as aves exóticas populares. Tem uma capacidade extraordinária de criar laços profundos com os seus tutores e manifesta esses laços de forma efusiva — com abraços, beijos, ronronos e uma constante necessidade de contacto físico.</p>
    <p>Esta natureza afectuosa tem, no entanto, um lado que deve ser gerido com cuidado: a cacatua pode desenvolver dependência emocional excessiva, resultando em ansiedade de separação, depenamento compulsivo e vocalizações de chamada intensas quando o tutor não está presente. A socialização desde cedo com múltiplas pessoas e períodos de independência gradualmente introduzidos são essenciais para uma cacatua emocionalmente equilibrada.</p>
    <h3>A Crista como Barómetro Emocional</h3>
    <p>A crista amarela é muito mais do que um adorno — é um comunicador emocional de grande expressividade. Crista completamente erguida indica excitação máxima (que pode ser positiva ou negativa). Crista ligeiramente erguida indica curiosidade ou alerta. Crista completamente baixa indica calma, relaxamento ou, em alguns contextos, submissão. Aprender a ler a crista da sua cacatua é um dos aspectos mais fascinantes de viver com esta espécie.</p>
  `,
  dietHTML:`
    <p>A cacatua de crista amarela tem necessidades nutricionais específicas que diferem de outras espécies de papagaios. É uma espécie propensa à lipidose hepática (acumulação de gordura no fígado) quando alimentada com dietas demasiado ricas em sementes e nozes.</p>
    <h3>Alimentação Ideal</h3>
    <ul>
      <li><strong>Pellets específicos para cacatuas:</strong> 50–60% da dieta — baixos em gordura e ricos em vitaminas</li>
      <li><strong>Vegetais frescos:</strong> Base importante — cenoura, brócolo, pimento, couve, espinafres</li>
      <li><strong>Frutas frescas:</strong> Maçã (sem sementes), pera, manga, pêssego, frutos silvestres</li>
      <li><strong>Sementes e nozes:</strong> Em quantidade muito reduzida — máximo 5–10% da dieta</li>
    </ul>
    <h3>Alimentos a Evitar</h3>
    <ul>
      <li>Abacate (altamente tóxico)</li>
      <li>Chocolates, café e álcool</li>
      <li>Alimentos fritos ou muito gordurosos</li>
      <li>Dietas baseadas exclusivamente em sementes (risco elevado de lipidose hepática)</li>
    </ul>
    <p>A cacatua necessita de suplementação em cálcio — um osso de sépia disponível permanentemente na gaiola é uma solução eficaz e económica.</p>
  `,
  cageHTML:`
    <p>A cacatua de crista amarela adulta necessita de uma jaula de no mínimo <strong>100 cm × 70 cm × 130 cm</strong>. Dado o seu nível de energia e necessidade de movimento, o espaço maior é sempre preferível.</p>
    <p>O material deve ser aço inox ou ferro com revestimento atóxico. A cacatua mastiga activamente as barras da gaiola — escolha materiais que resistam a esta actividade sem libertar compostos tóxicos.</p>
    <h3>Enriquecimento Ambiental</h3>
    <ul>
      <li>Brinquedos de destruição (principal actividade de enriquecimento — renove frequentemente)</li>
      <li>Puzzle feeders para esconder alimentos e promover comportamento de foraging</li>
      <li>Poleiros de madeira natural de diferentes texturas e diâmetros</li>
      <li>Baloiços — cacatuas adoram balançar-se</li>
      <li>Espelho (pode aumentar o comportamento de exibição da crista)</li>
    </ul>
    <p>A cacatua produz muito pó de plumagem — a "pó branco" característico das cacatuas é pó de plumagem (barba de pena). Escolha um local com boa ventilação e considere um purificador de ar — especialmente importante para tutores com tendência a alergias respiratórias.</p>
  `,
  careHTML:`
    <p>A cacatua de crista amarela necessita de <strong>3 a 5 horas de interacção diária</strong> fora da jaula. Este tempo deve incluir contacto físico (é das espécies que mais aprecia caricias), sessões de treino, exploração livre e jogos interactivos.</p>
    <p>O banho é fundamental — 2 a 3 vezes por semana. A maioria das cacatuas adora ser borrifada com spray de água morna. O banho, além de manter a plumagem em bom estado, reduz a quantidade de pó de plumagem no ambiente.</p>
    <h3>Atenção ao Isolamento</h3>
    <p>Nunca deixe uma cacatua de crista amarela isolada por períodos prolongados sem qualquer estimulação. Esta espécie é particularmente vulnerável à ansiedade de separação. Se necessitar de se ausentar por longos períodos, considere: música ou televisão em volume baixo, brinquedos de puzzle com comida, ou mesmo a adopção de um segundo pássaro (embora a introdução deva ser feita muito gradualmente e com supervisão).</p>
  `,
  healthHTML:`
    <p>A cacatua de crista amarela tem algumas susceptibilidades de saúde específicas que o tutor deve conhecer:</p>
    <ul>
      <li><strong>Lipidose hepática:</strong> Acumulação de gordura no fígado, causada por dieta rica em sementes e sedentarismo. Prevenção: dieta adequada e exercício regular.</li>
      <li><strong>PBFD (Doença do Bico e Penas):</strong> Vírus altamente contagioso entre psitacídeos. Detectável por análise de sangue. Sem cura mas com gestão possível.</li>
      <li><strong>Depenamento compulsivo:</strong> Comportamento psicológico associado a stress, solidão ou falta de estimulação. Requer avaliação veterinária e mudanças de maneio.</li>
      <li><strong>Psitacose:</strong> Infecção bacteriana transmissível ao ser humano. Tratável com antibióticos específicos.</li>
    </ul>
    <p>Visitas veterinárias semestrais com especialista em aves exóticas são recomendadas para cacatuas, dado o seu perfil de saúde específico.</p>
  `,
  citesHTML:`
    <p>A cacatua de crista amarela está listada no <strong>Apêndice II da CITES</strong>. Em Portugal, toda a documentação de origem de criador registado é obrigatória — sem ela, a posse é ilegal e pode resultar em apreensão da ave e coimas de valor significativo.</p>
    <p>A documentação fornecida pela Paraíso de Aves inclui:</p>
    <ul>
      <li>Certificado CITES Apêndice II</li>
      <li>Anilha de identificação fechada</li>
      <li>Certificado veterinário de saúde</li>
      <li>Documentação do estabelecimento de criação registado</li>
    </ul>
    <p>Todos os documentos são reconhecidos pelas autoridades portuguesas (ICNF) e são válidos em toda a União Europeia.</p>
  `,
  deliveryHTML:`
    <p>Entregamos cacatuas de crista amarela em todo Portugal — continental, Madeira e Açores. O transporte é efectuado por transportadora especializada com caixa IATA certificada.</p>
    <p>Para Portugal continental, a entrega demora geralmente 1 a 3 dias úteis após confirmação do pagamento. Para as ilhas, o transporte é aéreo e requer documentação sanitária adicional — contacte-nos para um orçamento específico.</p>
    <p>A Paraíso de Aves oferece acompanhamento durante a primeira semana após entrega — aconselhamento telefónico ou por e-mail sobre a adaptação da ave ao novo lar.</p>
  `,
  faqs:[
    {q:'Quanto custa uma cacatua de crista amarela em Portugal?',a:'O preço varia consoante a idade e socialização. Contacte-nos para uma cotação actualizada. O preço inclui sempre documentação CITES completa, certificado veterinário e caixa de transporte IATA.'},
    {q:'A cacatua de crista amarela é boa para iniciantes?',a:'Não é a espécie mais indicada para quem nunca teve psitacídeos grandes. A sua elevada necessidade emocional e o nível de ruído são aspectos que muitos tutores inexperientes subestimam. Recomendamos investigação aprofundada antes da decisão.'},
    {q:'A cacatua fala?',a:'Aprende algumas palavras e frases, mas não é a espécie com maior capacidade verbal. A sua comunicação principal é através das vocalizações características (que podem ser muito intensas) e da crista expressiva.'},
    {q:'Quanto tempo de atenção diária precisa?',a:'Pelo menos 3 a 5 horas de interacção fora da jaula. A cacatua de crista amarela é uma das espécies com maior necessidade de contacto humano. Tutores muito ocupados ou que viajam frequentemente não devem adquirir esta espécie.'},
    {q:'Pode a cacatua viver em apartamento?',a:'É possível mas desafiante. As suas vocalizações são muito intensas e podem criar conflitos com vizinhos. Além disso, necessita de espaço considerável para o seu exercício diário. Em moradias ou apartamentos grandes com boa isolação acústica é mais viável.'},
    {q:'É verdade que a cacatua produz muito pó?',a:'Sim. As cacatuas produzem pó de plumagem (barba de pena) em quantidade significativa. Este pó branco acumula-se no ambiente e pode ser um problema para pessoas com alergias respiratórias. Um purificador de ar de qualidade e banhos regulares da ave ajudam a reduzir este problema.'},
    {q:'Quanto vive uma cacatua de crista amarela?',a:'Em cativeiro com cuidados adequados, pode viver entre 40 e 60 anos. Existem registos documentados de exemplares com mais de 70 anos. É um compromisso de vida muito longo que deve ser ponderado com seriedade, incluindo no planeamento da herança.'},
    {q:'Como é a relação da cacatua com outros animais de estimação?',a:'Pode coexistir com cães e gatos bem treinados, mas a supervisão é sempre necessária. Nunca deixe a cacatua sem supervisão com predadores naturais, mesmo que pareçam habituados à sua presença. Com outros papagaios, a introdução deve ser gradual e muito cautelosa.'},
    {q:'A cacatua de crista amarela é adequada para crianças?',a:'Com crianças mais velhas (acima dos 10 anos) que sejam calmas e respeitosas, pode funcionar muito bem. Crianças muito pequenas ou barulhentas podem assustar a ave e provocar reacções defensivas. A supervisão adulta é sempre necessária nas interacções.'},
  ],
  related:[
    {url:'../../cacatua-de-cabeca-nua/',icon:'🩶',name:'Cacatua de Cabeça Nua',desc:'Dócil e comunicativa'},
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
    {url:'../../papagaio-eclectus/',icon:'🦜',name:'Papagaio Eclectus',desc:'Dimorfismo único'},
    {url:'../../conuro/',icon:'💚',name:'Conuro',desc:'Colorido e brincalhão'},
  ],
},

/* ── 6. CACATUA DE CABEÇA NUA ── */
{
  slug:'cacatua-de-cabeca-nua',
  title:'Cacatua de Cabeça Nua à Venda em Portugal | CITES | Paraíso de Aves',
  metaDesc:'Compre uma cacatua de cabeça nua com CITES em Portugal. Dócil, curiosa e excelente companheira. Criador registado em Espanha, entrega em todo Portugal.',
  h1:'Cacatua de Cabeça Nua',
  latinName:'Cacatua sanguinea',
  subtitle:'Uma cacatua dócil, curiosa e de menor exigência emocional — ideal para quem quer uma ave carinhosa com personalidade equilibrada.',
  badge:'🩶 CRIADOR REGISTADO · CITES II · DÓCIL E CURIOSA',
  trustBadges:['✓ CITES Oficial','✓ Criada à Mão','✓ Envio Portugal','✓ Menos Pó de Pena'],
  price:'Sob Consulta',
  esUrl:'/cacatua.html',
  ogImage:'cacatua-02.webp',
  imgWebp:'cacatua-02.webp',
  imgJpg:'cacatua-02.jpg',
  imgAlt:'Cacatua de cabeça nua com área periorbital azul característica e plumagem branca, posada num poleiro natural',
  imgCaption:'Cacatua de Cabeça Nua (Cacatua sanguinea) — Temperamento dócil e personalidade curiosa',
  facts:[
    {v:'30–40 anos',l:'Esperança de Vida'},
    {v:'300–450 g',l:'Peso Adulto'},
    {v:'36–41 cm',l:'Comprimento'},
    {v:'Boa',l:'Inteligência'},
    {v:'Médio',l:'Capacidade Verbal'},
    {v:'Alto',l:'Nível de Ruído'},
    {v:'Sim',l:'Apartamento'},
    {v:'CITES II',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>A cacatua de cabeça nua, reconhecida pelo anel de pele azul-claro ao redor dos olhos que lhe dá o nome característico, é uma das espécies de cacatua mais docéis e acessíveis para tutores com experiência moderada em psitacídeos. Ao contrário das cacatuas de crista amarela (reconhecidamente exigentes em termos emocionais), a cacatua de cabeça nua tem um temperamento mais equilibrado e adaptável.</p>
    <p>Nativa da Austrália (especialmente do interior árido e semi-árido), esta espécie desenvolveu uma grande capacidade de adaptação a diferentes condições ambientais. Em cativeiro, reflecte essa adaptabilidade — habitua-se bem a diferentes ambientes domésticos e rotinas, tornando-se uma ave mais "prática" do que algumas das suas primas mais exigentes.</p>
    <p>Em termos de dimensão, situa-se entre as cacatuas menores e as grandes — com cerca de 40 cm de comprimento e 350–450 g, é uma ave substancial mas manejável. A sua plumagem é maioritariamente branca, com uma leve tonalidade rosada nas bochechas e uma crista branca discreta que ereciona em momentos de excitação.</p>
    <p>É uma excelente opção para famílias com alguma experiência prévia em papagaios médios ou grandes que desejam ter uma cacatua sem os desafios extremos que a crista amarela pode apresentar. A Paraíso de Aves disponibiliza exemplares criados à mão com toda a documentação CITES e garantia de saúde.</p>
  `,
  temperHTML:`
    <p>A cacatua de cabeça nua tem um temperamento frequentemente descrito como "equilibrado" — é afectuosa sem ser excessivamente dependente, curiosa sem ser destrutiva em excesso, e vocal sem atingir os picos de ruído das cacatuas maiores. Esta combinação torna-a uma companheira agradável para tutores que valorizam uma ave carinhosa mas com maior grau de independência.</p>
    <p>É uma ave muito curiosa e inteligente, que aprecia explorar o ambiente, manipular objectos com o bico e as patas, e resolver puzzles simples. O seu interesse pelo mundo ao seu redor é genuíno e torna as sessões de enriquecimento particularmente gratificantes.</p>
    <h3>Sociabilidade</h3>
    <p>Geralmente dá-se bem com toda a família e adapta-se melhor do que a maioria das cacatuas a rotinas com alguma variação. Pode ser uma boa opção para famílias onde nem todos os membros têm a mesma disponibilidade diária — ao contrário da crista amarela, não colapsa emocionalmente face a pequenas variações na atenção recebida.</p>
  `,
  dietHTML:`
    <p>A dieta da cacatua de cabeça nua deve ser equilibrada e variada, com especial atenção ao controlo de gordura — como todas as cacatuas, é susceptível à lipidose hepática em dietas muito ricas em sementes.</p>
    <ul>
      <li><strong>Pellets para cacatuas pequenas/médias:</strong> 50–60% da dieta</li>
      <li><strong>Vegetais frescos:</strong> Cenoura, pimento, brócolo, couve, abóbora</li>
      <li><strong>Frutas:</strong> Maçã, pera, frutos silvestres, kiwi — com moderação</li>
      <li><strong>Sementes:</strong> Mix de sementes de qualidade, mas em quantidade limitada (não mais de 15% da dieta)</li>
      <li><strong>Osso de sépia:</strong> Disponível permanentemente como fonte de cálcio</li>
    </ul>
    <p>A cacatua de cabeça nua aprecia especialmente alimentos de textura crocante — cenoura crua, espiga de milho, noz com casca — que satisfazem o seu instinto natural de mascar e desgastam o bico adequadamente.</p>
  `,
  cageHTML:`
    <p>Para uma cacatua de cabeça nua adulta, recomenda-se uma jaula de no mínimo <strong>80 cm × 60 cm × 110 cm</strong>. Sendo uma espécie de tamanho médio, tem requisitos menos extremos do que as cacatuas grandes, mas ainda assim necessita de espaço suficiente para se exercitar.</p>
    <ul>
      <li>Varões espaçados entre 2 e 2,5 cm (para segurança das patas)</li>
      <li>Poleiros de madeira natural de diferentes diâmetros</li>
      <li>Pelo menos 3 tipos diferentes de brinquedos em rotação</li>
      <li>Baloiço — esta espécie é particularmente apreciadora</li>
    </ul>
    <p>A cacatua de cabeça nua produz menos pó de plumagem do que a cacatua de crista amarela, o que a torna mais adequada para tutores com sensibilidade respiratória. Ainda assim, boa ventilação do espaço é sempre recomendada.</p>
  `,
  careHTML:`
    <p>A cacatua de cabeça nua necessita de pelo menos <strong>2 a 4 horas de interacção diária</strong> fora da jaula. É menos exigente em termos de contacto constante do que a crista amarela, mas ainda assim requer atenção regular e estimulação para manter o equilíbrio emocional.</p>
    <p>O banho deve ser oferecido 2 vezes por semana com spray de água morna. Estas cacatuas apreciam especialmente banhos em dias quentes — em Portugal, durante o verão, pode oferecer banhos mais frequentes para ajudar na termorregulação.</p>
    <h3>Treino e Estimulação</h3>
    <p>Sessões diárias de treino por reforço positivo (10–15 minutos) são altamente recomendadas. Esta espécie aprende comandos básicos (subir para o braço, descer, virar) com facilidade e o treino fortalece significativamente o vínculo tutor-ave.</p>
  `,
  healthHTML:`
    <p>A cacatua de cabeça nua é geralmente uma ave saudável e resistente, mas partilha com outras cacatuas algumas susceptibilidades específicas:</p>
    <ul>
      <li><strong>Lipidose hepática:</strong> Risco em dietas ricas em sementes. Prevenção através de dieta equilibrada com pellets como base.</li>
      <li><strong>PBFD:</strong> Vírus que afecta penas e bico. Detecção por análise de sangue anual.</li>
      <li><strong>Depenamento:</strong> Geralmente associado a stress ou falta de estimulação. Menos frequente nesta espécie do que na crista amarela.</li>
    </ul>
    <p>Consulta veterinária anual com especialista em aves exóticas é suficiente para manutenção preventiva da saúde desta espécie.</p>
  `,
  citesHTML:`
    <p>A cacatua de cabeça nua está incluída no <strong>Apêndice II da CITES</strong>. Em Portugal, a documentação de criador registado é obrigatória para qualquer exemplar em posse doméstica.</p>
    <p>A Paraíso de Aves fornece toda a documentação necessária: certificado CITES II, anilha de identificação, certificado veterinário e registo do estabelecimento de criação. Todos os documentos são válidos em toda a União Europeia, incluindo Portugal.</p>
  `,
  deliveryHTML:`
    <p>Entregamos cacatuas de cabeça nua em todo Portugal — continental, Madeira e Açores. A entrega para Portugal continental demora geralmente 1 a 3 dias úteis. Para as ilhas, o transporte aéreo implica prazos e documentação adicionais.</p>
    <p>Contacte-nos pelo formulário desta página para verificar disponibilidade e obter um orçamento detalhado com todos os custos incluídos.</p>
  `,
  faqs:[
    {q:'Quanto custa uma cacatua de cabeça nua em Portugal?',a:'O preço é geralmente mais acessível do que o das cacatuas de crista amarela ou das araras. Contacte-nos para uma cotação actualizada que inclui CITES, veterinário e transporte.'},
    {q:'É boa para tutores com menos experiência?',a:'Sim, é considerada uma das cacatuas mais acessíveis para tutores com alguma experiência em papagaios médios. O seu temperamento mais equilibrado torna-a menos desafiante do que as espécies de cacatua maiores.'},
    {q:'A cacatua de cabeça nua fala?',a:'Aprende algumas palavras e frases, embora não seja reconhecida por uma grande capacidade verbal. Comunica principalmente através de vocalizações e linguagem corporal expressiva.'},
    {q:'Produz tanto pó de plumagem como a cacatua de crista amarela?',a:'Não. A cacatua de cabeça nua produz menos pó de plumagem do que a crista amarela, o que a torna mais adequada para tutores com sensibilidade respiratória, embora ainda produza mais pó do que a maioria dos papagaios de outras famílias.'},
    {q:'Pode viver em apartamento?',a:'Sim, com espaço adequado e interacção diária regular. As suas vocalizações são intensas mas geralmente menos extremas do que as das cacatuas maiores.'},
    {q:'Quanto vive esta espécie?',a:'Em cativeiro com cuidados adequados, vive entre 30 e 40 anos — ligeiramente menos do que as cacatuas grandes, mas ainda assim um compromisso de longo prazo a considerar seriamente.'},
    {q:'Como se diferencia da cacatua de crista amarela?',a:'É menor, tem a crista mais discreta, a área periorbital azul característica (que lhe dá o nome), temperamento genericamente mais equilibrado e menor necessidade de contacto constante. Produz também menos pó de plumagem.'},
    {q:'É boa para famílias com crianças?',a:'Com supervisão adequada e crianças que sejam calmas e respeitosas, sim. É geralmente mais tolerante a ambientes familiares movimentados do que algumas das suas primas mais sensíveis.'},
  ],
  related:[
    {url:'../../cacatua-de-crista-amarela/',icon:'🤍',name:'Cacatua de Crista Amarela',desc:'A mais popular'},
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
    {url:'../../conuro/',icon:'💚',name:'Conuro',desc:'Pequeno e brincalhão'},
    {url:'../../papagaio-eclectus/',icon:'🦜',name:'Papagaio Eclectus',desc:'Visual único'},
  ],
},

/* ── 7. PAPAGAIO ECLECTUS ── */
{
  slug:'papagaio-eclectus',
  title:'Papagaio Eclectus à Venda em Portugal | Eclectus roratus | CITES',
  metaDesc:'Compre um papagaio eclectus com documentação CITES em Portugal. Macho verde, fêmea vermelha — dimorfismo único. Criador registado, entrega em todo Portugal.',
  h1:'Papagaio Eclectus',
  latinName:'Eclectus roratus',
  subtitle:'O papagaio com dimorfismo sexual mais marcado do mundo — macho verde-esmeralda, fêmea vermelha e azul. Com CITES e entrega em todo Portugal.',
  badge:'🦜 CRIADOR REGISTADO · CITES II · DIMORFISMO ÚNICO',
  trustBadges:['✓ CITES Oficial','✓ Criado à Mão','✓ Envio Portugal','✓ Dieta Especializada'],
  price:'Sob Consulta',
  esUrl:'/eclectus.html',
  ogImage:'eclectus-01.webp',
  imgWebp:'eclectus-01.webp',
  imgJpg:'eclectus-01.jpg',
  imgAlt:'Papagaio eclectus macho com plumagem verde-esmeralda intensa e bico laranja, mostrando o contraste de cores único desta espécie',
  imgCaption:'Papagaio Eclectus macho (Eclectus roratus) — Verde-esmeralda incomparável com bico laranja',
  facts:[
    {v:'30–50 anos',l:'Esperança de Vida'},
    {v:'380–550 g',l:'Peso Adulto'},
    {v:'35–42 cm',l:'Comprimento'},
    {v:'Boa',l:'Inteligência'},
    {v:'Médio-alto',l:'Capacidade Verbal'},
    {v:'Moderado',l:'Nível de Ruído'},
    {v:'Sim',l:'Apto para Apartamento'},
    {v:'CITES II',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>O papagaio eclectus é, para quem o vê pela primeira vez, uma fonte de confusão visual imediata: o macho, de um verde-esmeralda intenso com bico laranja brilhante, e a fêmea, de um vermelho vibrante com manchas azuis e bico preto, são tão diferentes que os ornitólogos do século XIX os classificaram como duas espécies distintas durante décadas. Este dimorfismo sexual extremo é único entre os papagaios e torna o eclectus verdadeiramente especial.</p>
    <p>Nativo da Nova Guiné, das ilhas Salomão, das Molucas e do nordeste da Austrália, o eclectus habita florestas tropicais densas onde as suas cores contrastantes, surpreendentemente, lhe conferem camuflagem eficaz no dossel florestal. Em liberdade, vive em grupos e demonstra comportamentos sociais complexos, incluindo sistemas de acasalamento poligâmicos incomuns para psitacídeos.</p>
    <p>Em termos de temperamento, o eclectus surpreende frequentemente quem o adquire pela primeira vez: ao contrário da maioria dos papagaios grandes, tende a ser mais calmo, mais reflexivo e menos ruidoso. É uma ave que observa o ambiente com atenção antes de agir, que aprecia rotinas previsíveis e que pode ser extraordinariamente carinhosa com tutores de quem confia genuinamente.</p>
    <p>A Paraíso de Aves disponibiliza papagaios eclectus criados à mão, tanto machos como fêmeas, com toda a documentação CITES incluída. A dieta específica desta espécie é uma área de particular conhecimento da nossa equipa — fornecemos orientação alimentar detalhada a todos os nossos clientes.</p>
  `,
  temperHTML:`
    <p>O eclectus tem uma personalidade muito diferente da maioria dos papagaios de tamanho comparável. É menos extrovertido e exuberante do que um amazona ou uma arara, mas não por falta de inteligência ou sociabilidade — simplesmente tem um ritmo mais calmo e reflectido. Esta natureza tranquila torna-o um companheiro particularmente agradável para ambientes familiares mais sossegados.</p>
    <p>É importante notar que machos e fêmeas da espécie têm personalidades distintas. Em geral, os machos tendem a ser mais dóceis e amorosos, enquanto as fêmeas podem ser mais assertivas e territoriais — especialmente durante a época reprodutiva. Ambos os sexos formam laços fortes com os tutores, mas de formas ligeiramente diferentes.</p>
    <h3>Sensibilidade e Stress</h3>
    <p>O eclectus é uma espécie particularmente sensível a mudanças ambientais, rotinas erráticas e alimentação inadequada. Esta sensibilidade manifesta-se frequentemente em problemas de comportamento ou saúde que são na verdade respostas ao stress. Um ambiente estável, uma dieta correcta e uma rotina previsível são os pilares de um eclectus feliz e saudável.</p>
  `,
  dietHTML:`
    <p>A alimentação do papagaio eclectus merece atenção especial — é uma das áreas em que mais difere de outros papagaios. O eclectus tem um tracto digestivo mais longo do que a maioria dos psitacídeos, adaptado para processar frutas e vegetais frescos com eficiência. Por esta razão, dietas baseadas em pellets secos podem ser inadequadas para esta espécie específica.</p>
    <h3>Base da Dieta do Eclectus</h3>
    <ul>
      <li><strong>Frutas frescas (40–50%):</strong> Manga, papaia, kiwi, figo, romã, maçã, pêra, melão, mirtilo — quanto mais variado, melhor</li>
      <li><strong>Vegetais frescos (30–40%):</strong> Pimento vermelho e amarelo (vitamina A essencial), cenoura, abóbora, milho, brócolo, couve, espinafres</li>
      <li><strong>Pellets naturais (10–20%):</strong> Se incluídos, prefira pellets com corantes e conservantes naturais — o eclectus é particularmente sensível a aditivos químicos</li>
      <li><strong>Proteínas:</strong> Ovo cozido, leguminosas cozidas — em pequena quantidade</li>
    </ul>
    <h3>O Que Evitar</h3>
    <p>Pellets com corantes artificiais, conservantes e vitaminas sintéticas em excesso podem causar hipertricose (crescimento anormal das penas) e outros problemas de saúde no eclectus. Consulte um veterinário especializado nesta espécie para orientação alimentar específica.</p>
  `,
  cageHTML:`
    <p>O papagaio eclectus necessita de uma jaula de no mínimo <strong>90 cm × 70 cm × 120 cm</strong>. Sendo uma ave que aprecia subir e explorar verticalmente, a altura da jaula é tão importante como a largura.</p>
    <p>O eclectus não é tão destrutivo como as araras ou as cacatuas — os seus brinquedos duram mais tempo, o que é uma vantagem em termos de custos de manutenção. Prefira brinquedos de madeira macia, couro e palha.</p>
    <h3>Enriquecimento</h3>
    <ul>
      <li>Poleiros naturais de eucalipto, bétula ou salgueiro</li>
      <li>Brinquedos de foraging (para esconder frutas e pedaços de legume)</li>
      <li>Ramagens naturais frescas — o eclectus adora manipulá-las com bico e patas</li>
      <li>Espelho — pode ou não apreciar, dependendo do indivíduo</li>
    </ul>
  `,
  careHTML:`
    <p>O eclectus necessita de <strong>2 a 4 horas fora da jaula</strong> por dia. É uma ave que aprecia explorar o ambiente calmamente, subir poleiros e manipular objectos — o exercício intenso e os jogos muito físicos são menos do seu agrado do que para espécies mais extrovertidas.</p>
    <p>O banho é fundamental para o eclectus — é das espécies que mais beneficia de banhos regulares para a manutenção da plumagem e do equilíbrio hormonal. Ofereça banho com spray de água morna 3 vezes por semana, ou um recipiente raso com água para banho voluntário.</p>
    <h3>Exposição à Luz</h3>
    <p>O eclectus necessita de exposição a luz natural (ou luz UV artificial) para síntese adequada de vitamina D3 e regulação hormonal. Pelo menos 2 horas diárias de luz natural (não através de vidro, que filtra os raios UV) são recomendadas — em Portugal, as condições de luz solar são geralmente excelentes para esta finalidade.</p>
  `,
  healthHTML:`
    <p>O eclectus é uma espécie com algumas vulnerabilidades específicas que o distinguem de outros papagaios:</p>
    <ul>
      <li><strong>Hipertricose (Feather Follicle Disease):</strong> Crescimento anormal das penas, frequentemente associado a dieta inadequada (excesso de vitaminas sintéticas, conservantes). Muito mais comum nesta espécie do que em outras.</li>
      <li><strong>Deficiência de vitamina A:</strong> Manifesta-se por lesões na mucosa oral e respiratória. Prevenção: dieta rica em pimento vermelho, cenoura e abóbora.</li>
      <li><strong>Sensibilidade digestiva:</strong> O tracto digestivo longo do eclectus é mais susceptível a disbiose (desequilíbrio da flora intestinal) quando a dieta é muito processada.</li>
    </ul>
    <p>Um veterinário especializado em eclectus é um recurso valioso — esta espécie tem necessidades médicas específicas que nem todos os veterinários de aves conhecem em profundidade.</p>
  `,
  citesHTML:`
    <p>O papagaio eclectus está incluído no <strong>Apêndice II da CITES</strong>. Em Portugal, a documentação de origem de criador registado é legalmente obrigatória. A Paraíso de Aves fornece certificado CITES II, anilha de identificação, certificado veterinário e documentação do estabelecimento de criação, tudo válido em toda a UE.</p>
  `,
  deliveryHTML:`
    <p>Entregamos papagaios eclectus em todo Portugal continental, Madeira e Açores. O transporte é efectuado por transportadora especializada com caixa IATA de dimensões adequadas. Para Portugal continental, a entrega demora 1 a 3 dias úteis após confirmação.</p>
    <p>Fornecemos um guia alimentar detalhado específico para o eclectus com cada entrega, bem como contactos de veterinários especializados na espécie em Portugal.</p>
  `,
  faqs:[
    {q:'Qual a diferença entre macho e fêmea eclectus?',a:'O dimorfismo é extremo: o macho tem plumagem verde-esmeralda com bico laranja; a fêmea tem plumagem vermelho vivo com manchas azuis e bico preto. Em termos de temperamento, machos tendem a ser mais dóceis e fêmeas mais assertivas.'},
    {q:'O eclectus tem necessidades alimentares especiais?',a:'Sim. Ao contrário da maioria dos papagaios, deve ter uma dieta baseada predominantemente em frutas e vegetais frescos. Pellets com corantes e vitaminas artificiais podem causar problemas de saúde nesta espécie.'},
    {q:'O eclectus fala?',a:'Sim, aprende palavras e frases com facilidade. Muitos eclectus têm um vocabulário razoável e usam as palavras em contexto. A sua voz tende a ser clara e relativamente suave comparada com outras espécies de tamanho similar.'},
    {q:'Pode viver em apartamento?',a:'Sim, é uma das espécies mais adaptadas ao apartamento entre os papagaios grandes. O seu nível de ruído é moderado, o temperamento geralmente mais calmo e as necessidades de espaço são razoáveis.'},
    {q:'É indicado para tutores com experiência moderada?',a:'Sim, embora a sua dieta específica exija conhecimento extra. Para um tutor disposto a investigar as necessidades alimentares particulares desta espécie, é uma ave muito recompensante e relativamente acessível em termos de temperamento.'},
    {q:'Quanto tempo precisa de atenção diária?',a:'Geralmente menos do que cacatuas ou araras — 2 a 4 horas de interacção diária são geralmente suficientes para um eclectus equilibrado. No entanto, precisa de estabilidade emocional e rotinas previsíveis.'},
    {q:'Quanto custa um papagaio eclectus em Portugal?',a:'O preço varia consoante o sexo (machos e fêmeas têm frequentemente preços similares mas podem variar), idade e socialização. Contacte-nos para uma cotação actualizada.'},
    {q:'Como é a entrega do eclectus para Portugal?',a:'Por transportadora especializada em animais vivos, com caixa IATA certificada. A entrega para Portugal continental demora 1 a 3 dias úteis. O eclectus tolera bem a viagem quando bem preparado e a caixa tem dimensões adequadas.'},
  ],
  related:[
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
    {url:'../../papagaio-amazona/',icon:'💚',name:'Papagaio Amazona',desc:'Alegre e comunicativo'},
    {url:'../../cacatua-de-crista-amarela/',icon:'🤍',name:'Cacatua de Crista Amarela',desc:'Muito carinhosa'},
    {url:'../../conuro/',icon:'💚',name:'Conuro',desc:'Colorido e brincalhão'},
  ],
},

/* ── 8. PAPAGAIO AMAZONA ── */
{
  slug:'papagaio-amazona',
  title:'Papagaio Amazona à Venda em Portugal | Amazona spp. | CITES',
  metaDesc:'Compre um papagaio amazona com CITES em Portugal. Alegre, comunicativo e muito sociável. Criador registado em Espanha, entrega em todo Portugal continental e ilhas.',
  h1:'Papagaio Amazona',
  latinName:'Amazona spp.',
  subtitle:'O papagaio verde por excelência — alegre, comunicativo e cheio de personalidade mediterrânica. Com CITES e entrega em todo Portugal.',
  badge:'💚 CRIADOR REGISTADO · CITES II · MUITO COMUNICATIVO',
  trustBadges:['✓ CITES Oficial','✓ Criado à Mão','✓ Envio Portugal','✓ Fala com Facilidade'],
  price:'Sob Consulta',
  esUrl:'/loro-amazonico.html',
  ogImage:'loro-amazonico-01.webp',
  imgWebp:'loro-amazonico-01.webp',
  imgJpg:'loro-amazonico-01.jpg',
  imgAlt:'Papagaio amazona de fronte azul com plumagem verde vibrante e marcas coloridas características na cabeça',
  imgCaption:'Papagaio Amazona (Amazona spp.) — Comunicativo, alegre e dotado de grande personalidade',
  facts:[
    {v:'40–70 anos',l:'Esperança de Vida'},
    {v:'300–500 g',l:'Peso Adulto'},
    {v:'28–38 cm',l:'Comprimento'},
    {v:'Alta',l:'Inteligência'},
    {v:'Muito alto',l:'Capacidade Verbal'},
    {v:'Alto',l:'Nível de Ruído'},
    {v:'Sim',l:'Apto para Apartamento'},
    {v:'CITES II',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>O papagaio amazona é um dos papagaios mais populares do mundo — e com razão. Com a sua plumagem verde exuberante, marcada de cores vivas na cabeça e nas asas consoante a espécie, e uma personalidade que alia inteligência a alegria de viver, o amazona tem conquistado tutores em todo o mundo há séculos. Foi, aliás, o papagaio mais comum nos navios portugueses da Era dos Descobrimentos — trazido do Novo Mundo para as cortes europeias como símbolo de exotismo e prosperidade.</p>
    <p>O género <em>Amazona</em> inclui mais de 30 espécies distintas, das quais as mais comuns em cativeiro incluem a Amazona de Fronte Azul (<em>A. aestiva</em>), a Amazona da Nuca Amarela (<em>A. ochrocephala</em>), a Amazona Real (<em>A. amazonica</em>) e a Amazona Mealy (<em>A. farinosa</em>). Cada espécie tem as suas características próprias, mas todas partilham as qualidades fundamentais que tornaram o género tão popular: inteligência, capacidade verbal e uma sociabilidade generosa.</p>
    <p>Em Portugal, o amazona adapta-se excepcionalmente bem ao clima — o calor do sul e o clima temperado do norte são ambos confortáveis para estas aves originárias das florestas tropicais americanas. Esta adaptabilidade, combinada com a sua natureza comunicativa, torna-o um companheiro ideal para famílias portuguesas.</p>
    <p>A Paraíso de Aves disponibiliza papagaios amazona criados à mão, com temperamento socializado desde pequenos, toda a documentação CITES e garantia de saúde. Contacte-nos para informação sobre espécies e exemplares disponíveis.</p>
  `,
  temperHTML:`
    <p>O amazona tem uma personalidade frequentemente descrita como "mediterrânica" — extrovertido, exuberante, sociável e cheio de energia. É das espécies que mais facilmente "se encaixa" numa família numerosa e animada, adaptando-se bem ao barulho, ao movimento e à variedade de pessoas.</p>
    <p>É um excelente orador: aprende palavras com facilidade e muitos amazona desenvolvem um vocabulário impressionante ao longo dos anos, utilizando frases em contexto de forma surpreendentemente precisa. Esta capacidade verbal, combinada com a sua natureza expressiva, torna-o um companheiro verdadeiramente cativante.</p>
    <h3>A Fase de Maturidade Sexual</h3>
    <p>Uma característica importante dos amazona que o tutor deve conhecer é a "fase do inferno" — o período de maturidade sexual (geralmente entre os 5 e os 10 anos) durante o qual a ave pode tornar-se temporariamente mais agressiva, territorial e imprevisível. Esta fase é normal e transitória, mas requer paciência e consistência por parte do tutor. Com treino adequado desde cedo e um vínculo sólido estabelecido, esta fase é geralmente bem gerida.</p>
  `,
  dietHTML:`
    <p>A dieta do amazona deve ser variada e equilibrada, com atenção especial ao controlo de gordura — é uma espécie propensa à obesidade quando a dieta é excessivamente rica em sementes e nozes.</p>
    <ul>
      <li><strong>Pellets para papagaios médios:</strong> 40–50% da dieta</li>
      <li><strong>Vegetais frescos:</strong> Pimento, cenoura, brócolo, couve, espinafres, milho, abóbora</li>
      <li><strong>Frutas:</strong> Maçã, pêra, manga, papaia, kiwi, uvas — em quantidade moderada</li>
      <li><strong>Sementes e nozes:</strong> Mix de qualidade, mas em quantidade limitada (máximo 15%)</li>
      <li><strong>Cálcio:</strong> Osso de sépia disponível permanentemente</li>
    </ul>
    <p>O amazona é particularmente apreciador de pimentos coloridos — são uma excelente fonte de vitamina A e geralmente muito bem aceites. Experimente oferecer pimento inteiro como brinquedo e alimento em simultâneo.</p>
  `,
  cageHTML:`
    <p>A jaula mínima para um amazona adulto deve ter <strong>80 cm × 60 cm × 100 cm</strong>. Sendo um papagaio de tamanho médio mas muito activo, beneficia de espaço extra para exercício e exploração.</p>
    <ul>
      <li>Varões de aço inox ou ferro galvanizado resistente</li>
      <li>Poleiros de madeira natural de várias espessuras</li>
      <li>Brinquedos em rotação semanal para manter o interesse</li>
      <li>Baloiço — os amazona adoram balançar-se e fazer acrobacias</li>
      <li>Puzzle feeders para estimulação cognitiva</li>
    </ul>
    <p>O amazona adapta-se bem a jaulas no interior, mas aprecia muito as horas passadas num poleiro ou "árvore de jogo" fora da jaula. Invista num poleiro de topo de gaiola ou numa árvore de jogo independente — é um dos melhores investimentos para o bem-estar desta espécie.</p>
  `,
  careHTML:`
    <p>O amazona necessita de <strong>2 a 4 horas diárias fora da jaula</strong> com interacção activa. É uma ave enérgica que aprecia jogos, treino de truques e exploração do ambiente. As sessões de treino por reforço positivo são particularmente eficazes nesta espécie — o amazona aprende truques com entusiasmo e rapidez.</p>
    <p>O banho deve ser oferecido regularmente — 2 a 3 vezes por semana em clima temperado, ou mais frequentemente durante os meses quentes de verão em Portugal. O amazona aprecia especialmente banhos ao ar livre em dias de sol, o que lhe permite secar a plumagem naturalmente.</p>
  `,
  healthHTML:`
    <p>O amazona é geralmente uma ave saudável e resistente. As principais questões de saúde a monitorizar são:</p>
    <ul>
      <li><strong>Obesidade:</strong> Risco elevado em aves com dietas ricas em sementes e pouco exercício. Monitorize o peso mensalmente.</li>
      <li><strong>Deficiência de vitamina A:</strong> Manifesta-se por lesões nasais e orais. Prevenção com pimentos coloridos, cenoura e abóbora na dieta.</li>
      <li><strong>Psitacose:</strong> Infecção bacteriana detectável e tratável. Análise de sangue anual recomendada.</li>
      <li><strong>Proventiculite Dilatante:</strong> Doença neurológica. Relativamente menos frequente nos amazona do que em outras espécies, mas deve ser conhecida.</li>
    </ul>
  `,
  citesHTML:`
    <p>Os papagaios amazona estão incluídos no <strong>Apêndice II da CITES</strong>, com algumas espécies no Apêndice I (como o <em>Amazona imperialis</em> e o <em>A. arausiaca</em>). As espécies mais comuns em cativeiro são Apêndice II. Em Portugal, toda a documentação de criador registado é obrigatória. A Paraíso de Aves fornece certificação completa e válida em toda a UE.</p>
  `,
  deliveryHTML:`
    <p>Entregamos papagaios amazona em todo Portugal continental, Madeira e Açores. Para Portugal continental, a entrega demora 1 a 3 dias úteis após confirmação. Fornecemos toda a documentação CITES, certificado veterinário e orientação personalizada para a chegada da ave ao novo lar.</p>
  `,
  faqs:[
    {q:'Qual é a diferença entre as várias espécies de amazona?',a:'O género inclui mais de 30 espécies. As diferenças principais são nas marcações coloridas da cabeça, no tamanho (que varia ligeiramente) e na personalidade. Contacte-nos para informação sobre as espécies disponíveis em cada momento.'},
    {q:'O amazona fala muito?',a:'É uma das espécies com maior capacidade verbal entre os papagaios de médio porte. Muitos amazona desenvolvem vocabulários extensos e utilizam frases em contexto. A clareza da voz é geralmente muito boa.'},
    {q:'É adequado para famílias com crianças?',a:'Sim, geralmente bem. O amazona é extrovertido e sociável, adaptando-se bem a ambientes familiares animados. Com crianças a partir dos 8–10 anos que sejam responsáveis, a relação é frequentemente excelente.'},
    {q:'O amazona pode viver em apartamento?',a:'Sim, com espaço adequado. As suas vocalizações são intensas mas não tão extremas como as das araras ou cacatuas grandes. Em apartamentos com boa isolação acústica, é perfeitamente viável.'},
    {q:'O que é a "fase do inferno" do amazona?',a:'É um período de maturidade sexual (geralmente 5–10 anos de idade) durante o qual a ave pode tornar-se temporariamente mais agressiva e territorial. É normal e transitório — com consistência e treino adequado, passa sem deixar sequelas.'},
    {q:'Quanto vive um amazona?',a:'Com cuidados adequados, pode viver entre 40 e 70 anos, dependendo da espécie. Algumas espécies de amazona têm dos registos de longevidade mais altos entre os papagaios.'},
    {q:'Qual a alimentação recomendada?',a:'Pellets como base (40–50%), complementados com vegetais frescos (pimento, cenoura, brócolo), frutas e uma quantidade limitada de sementes. O amazona é propenso à obesidade — controle as porções de alimentos muito calóricos.'},
    {q:'Quanto custa um papagaio amazona em Portugal?',a:'O preço varia consoante a espécie, a idade e o nível de socialização. Contacte-nos para uma cotação actualizada específica para as espécies disponíveis.'},
  ],
  related:[
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
    {url:'../../papagaio-eclectus/',icon:'🦜',name:'Papagaio Eclectus',desc:'Dimorfismo único'},
    {url:'../../arara-azul-e-amarela/',icon:'💛',name:'Arara Azul e Amarela',desc:'Colorida e sociável'},
    {url:'../../conuro/',icon:'💚',name:'Conuro',desc:'Pequeno e brincalhão'},
  ],
},

/* ── 9. CONURO ── */
{
  slug:'conuro',
  title:'Conuro à Venda em Portugal | Aratinga & Pyrrhura | CITES | Paraíso de Aves',
  metaDesc:'Compre um conuro com documentação CITES em Portugal. Colorido, brincalhão e cheio de energia. Criador registado, entrega em todo Portugal. Ideal para apartamento.',
  h1:'Conuro',
  latinName:'Aratinga spp. / Pyrrhura spp.',
  subtitle:'Pequeno em tamanho, imenso em personalidade — o conuro é o companheiro ideal para quem quer uma ave colorida, brincalhona e cheia de energia.',
  badge:'💚 CRIADOR REGISTADO · CITES · IDEAL PARA APARTAMENTO',
  trustBadges:['✓ CITES Oficial','✓ Criado à Mão','✓ Envio Portugal','✓ Tamanho Ideal'],
  price:'Sob Consulta',
  esUrl:'/conuro.html',
  ogImage:'conuro-01.webp',
  imgWebp:'conuro-01.webp',
  imgJpg:'conuro-01.jpg',
  imgAlt:'Conuro sol (Aratinga solstitialis) com plumagem amarela e laranja vibrante, posado num poleiro de madeira colorido',
  imgCaption:'Conuro (Aratinga/Pyrrhura spp.) — Pequeno, colorido e com personalidade que supera o tamanho',
  facts:[
    {v:'15–30 anos',l:'Esperança de Vida'},
    {v:'80–180 g',l:'Peso Adulto'},
    {v:'22–32 cm',l:'Comprimento'},
    {v:'Boa',l:'Inteligência'},
    {v:'Médio',l:'Capacidade Verbal'},
    {v:'Médio-alto',l:'Nível de Ruído'},
    {v:'Excelente',l:'Apto para Apartamento'},
    {v:'CITES II',l:'Protecção Legal'},
  ],
  introHTML:`
    <p>Os conuros são um grupo diverso de psitacídeos de pequeno a médio porte, agrupando principalmente os géneros <em>Aratinga</em>, <em>Pyrrhura</em> e vários outros géneros relacionados originários da América Central e do Sul. Com cores que vão do verde discreto aos amarelos e laranjas explosivos, passando por verdes com manchas multicoloridas, os conuros são autênticas joias tropicais em miniatura.</p>
    <p>Em Portugal, os conuros têm vindo a ganhar enorme popularidade nos últimos anos, e é fácil perceber porquê: são suficientemente pequenos para um apartamento, suficientemente activos e brincalhões para manter qualquer tutor entretido, e têm uma expectativa de vida razoável (15 a 30 anos consoante a espécie) que justifica o investimento emocional.</p>
    <p>Entre as espécies mais populares disponíveis em Portugal destacam-se o Conuro Sol (<em>Aratinga solstitialis</em>) — absolutamente espectacular com as suas cores amarelas e laranjas —, o Conuro Verde (<em>Aratinga holochlora</em>), o Conuro Marianinha (<em>Pyrrhura molinae</em>) — conhecido pela sua maior quietude — e o Conuro Jenday (<em>Aratinga jandaya</em>).</p>
    <p>A Paraíso de Aves disponibiliza conuros criados à mão com toda a documentação CITES. Contacte-nos para informação sobre as espécies disponíveis em cada momento — a variedade de conuros que trabalhamos pode variar consoante a época e disponibilidade.</p>
  `,
  temperHTML:`
    <p>Os conuros são, por natureza, aves de alta energia e grande sociabilidade. São curiosos, brincalhões e demonstram uma afectividade genuína com os seus tutores — adoram ser transportados no ombro ou no bolso de uma camisola, e são conhecidos por inventar jogos e brincadeiras espontâneas.</p>
    <p>Existe alguma variação de temperamento entre géneros: os <em>Pyrrhura</em> tendem a ser mais quietos e menos ruidosos, tornando-os excelentes para apartamentos urbanos. Os <em>Aratinga</em> são geralmente mais vocais e extrovertidos — mais animados mas também mais ruidosos.</p>
    <h3>Convivência com Outros Animais</h3>
    <p>Os conuros são geralmente muito sociáveis com outros conuros e podem ser mantidos em pares ou pequenos grupos com bons resultados. A coexistência com cães ou gatos requer supervisão permanente — o tamanho pequeno do conuro torna-o vulnerável. Com crianças mais velhas e calmas, é geralmente uma relação muito bem-sucedida.</p>
  `,
  dietHTML:`
    <p>A dieta do conuro deve ser variada e equilibrada, semelhante à de outros psitacídeos mas adaptada ao seu tamanho menor:</p>
    <ul>
      <li><strong>Mix de sementes e pellets pequenos:</strong> 40–50% da dieta</li>
      <li><strong>Frutas frescas:</strong> Maçã, pêra, uvas (sem sementes), manga, kiwi, frutos silvestres — cortados em pedaços pequenos</li>
      <li><strong>Vegetais frescos:</strong> Pimento, cenoura, brócolo, couve, milho</li>
      <li><strong>Proteínas:</strong> Ovo cozido picado (pequena quantidade, 2–3 vezes por semana)</li>
      <li><strong>Osso de sépia:</strong> Disponível permanentemente</li>
    </ul>
    <p>Os conuros apreciam especialmente alimentos que possam segurar com as patas enquanto comem — nozes pequenas, uvas inteiras, pedaços de cenoura. Este comportamento de alimentação "à mão" é delicioso de observar e fornece estimulação adicional.</p>
  `,
  cageHTML:`
    <p>Para um conuro de tamanho médio, a jaula mínima deve ter <strong>60 cm × 50 cm × 80 cm</strong> — embora, como sempre, maior seja melhor. O espaçamento entre os varões não deve exceder 1,5 cm para evitar que a ave se prenda ou escape.</p>
    <p>Os conuros são aves activas que adoram subir, balançar e explorar — invista numa jaula com múltiplos poleiros a diferentes alturas, baloiços e brinquedos de destruição de tamanho adequado.</p>
    <ul>
      <li>Poleiros de madeira natural de 1–2 cm de diâmetro</li>
      <li>Baloiço — os conuros adoram</li>
      <li>Brinquedos de destruição de tamanho pequeno</li>
      <li>Sinos e campainhas — adoram fazer barulho</li>
      <li>Espelho — muitos conuros adoram interagir com o seu reflexo</li>
    </ul>
  `,
  careHTML:`
    <p>Apesar do tamanho menor, o conuro não tem necessidades de cuidados proporcionalmente menores — requer pelo menos <strong>2 a 3 horas de interacção diária</strong> fora da jaula. É uma ave que prospera com rotinas consistentes e atenção regular.</p>
    <p>O banho deve ser oferecido 2 a 3 vezes por semana. A maioria dos conuros adora banhos — muitos entram voluntariamente num recipiente raso com água ou reagem com entusiasmo ao spray de água morna.</p>
    <h3>Treino</h3>
    <p>Os conuros respondem muito bem ao treino por reforço positivo. Aprendem facilmente a "fazer de conta que está morto", a dar a pata, a voar para o braço do tutor e muitos outros truques divertidos. O treino não só estimula cognitivamente a ave como estreita significativamente a relação.</p>
  `,
  healthHTML:`
    <p>Os conuros são geralmente saudáveis e resistentes quando bem cuidados. As principais questões de saúde incluem:</p>
    <ul>
      <li><strong>Proventiculite Dilatante:</strong> Afecta particularmente os conuros — monitorize perda de peso, regurgitação ou fezes anormais.</li>
      <li><strong>PBFD:</strong> Vírus que pode afectar qualquer psitacídeo. Detecção anual por análise de sangue.</li>
      <li><strong>Parasitas internos:</strong> Especialmente em aves com acesso a espaços exteriores. Análise de fezes semestral recomendada.</li>
    </ul>
    <p>Consultas veterinárias anuais com especialista em aves são suficientes para manutenção da saúde preventiva em conuros saudáveis.</p>
  `,
  citesHTML:`
    <p>A maioria das espécies de conuro está incluída no <strong>Apêndice II da CITES</strong>. Algumas espécies mais raras podem estar no Apêndice I. Em Portugal, a documentação de criador registado é obrigatória. A Paraíso de Aves fornece toda a documentação legal necessária com cada exemplar.</p>
  `,
  deliveryHTML:`
    <p>Entregamos conuros em todo Portugal continental, Madeira e Açores. Para Portugal continental, a entrega demora 1 a 3 dias úteis após confirmação. Dada a menor dimensão da ave, o transporte é geralmente mais simples e económico do que para espécies maiores.</p>
    <p>Contacte-nos para verificar as espécies disponíveis e obter uma cotação completa.</p>
  `,
  faqs:[
    {q:'Qual a diferença entre conuro Pyrrhura e Aratinga?',a:'Os Pyrrhura são geralmente mais pequenos, mais quietos e mais adequados para apartamentos urbanos. Os Aratinga são mais coloridos (o conuro sol é o exemplo mais espectacular), mais vocais e geralmente mais extrovertidos. Ambos são afectuosos com os tutores.'},
    {q:'O conuro é adequado para apartamento?',a:'Sim! É uma das espécies mais bem adaptadas ao apartamento, especialmente os Pyrrhura. As necessidades de espaço são menores e o nível de ruído, embora não negligenciável, é muito inferior ao das araras ou cacatuas grandes.'},
    {q:'O conuro fala?',a:'Aprende algumas palavras e frases, geralmente com uma voz mais aguda e menos clara do que os papagaios maiores. A sua comunicação principal é através das vocalizações características, que variam muito entre espécies.'},
    {q:'Quanto custa um conuro em Portugal?',a:'O conuro é geralmente mais acessível do que as araras ou cacatuas grandes. O preço varia com a espécie e socialização. Contacte-nos para cotação actualizada.'},
    {q:'O conuro pode viver sozinho?',a:'Pode, se tiver muita interacção humana. Mas em geral, os conuros são aves muito sociais e beneficiam da companhia de outro conuro, especialmente se o tutor não puder estar presente durante longas horas do dia.'},
    {q:'Quanto vive um conuro?',a:'Depende da espécie: os conuros menores (Pyrrhura) vivem geralmente 15–20 anos; os maiores (Aratinga) podem chegar aos 25–30 anos com bons cuidados.'},
    {q:'Com que frequência precisa de sair da jaula?',a:'Pelo menos 2 a 3 horas por dia. O conuro é uma ave muito activa — confinado à jaula durante longos períodos, pode desenvolver comportamentos de frustração e depenamento.'},
    {q:'O conuro dá-se bem com crianças?',a:'Com crianças a partir dos 8–10 anos que sejam calmas e responsáveis, geralmente muito bem. O conuro é brincalhão e interactivo, tornando-se rapidamente o favorito das crianças mais velhas que aprendem a respeitá-lo.'},
    {q:'Quais as espécies de conuro disponíveis na Paraíso de Aves?',a:'A disponibilidade varia com a época e os nascimentos. Trabalhamos com várias espécies de Aratinga e Pyrrhura. Contacte-nos para informação actualizada sobre exemplares disponíveis no momento.'},
  ],
  related:[
    {url:'../../papagaio-amazona/',icon:'💚',name:'Papagaio Amazona',desc:'Tamanho médio, muito vocal'},
    {url:'../../papagaio-eclectus/',icon:'🦜',name:'Papagaio Eclectus',desc:'Dimorfismo sexual único'},
    {url:'../../cacatua-de-cabeca-nua/',icon:'🩶',name:'Cacatua de Cabeça Nua',desc:'Dócil e curiosa'},
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'O mais inteligente'},
  ],
},

/* ── 10. OVOS FERTILIZADOS ── */
{
  slug:'ovos-fertilizados',
  title:'Ovos Fertilizados de Papagaio à Venda | CITES | Paraíso de Aves Portugal',
  metaDesc:'Compre ovos fertilizados de papagaio com CITES em Portugal. Araras, cacatuas, yacos, amazona. Criador registado. Documentação completa e orientação de incubação.',
  h1:'Ovos Fertilizados de Papagaio',
  latinName:'Psittacidae spp.',
  subtitle:'Para criadores experientes — ovos fertilizados de espécies seleccionadas com documentação CITES, certificado de origem e orientação completa de incubação.',
  badge:'🥚 CRIADOR REGISTADO · CITES · PARA CRIADORES',
  trustBadges:['✓ CITES Oficial','✓ Fertilidade Verificada','✓ Envio Portugal','✓ Orientação Incubação'],
  price:'Sob Consulta',
  esUrl:'/huevos-fertiles.html',
  ogImage:'huevos-fertiles-01.webp',
  imgWebp:'huevos-fertiles-01.webp',
  imgJpg:'huevos-fertiles-01.jpg',
  imgAlt:'Ovos fertilizados de papagaio em incubadora profissional com controlo de temperatura e humidade, mostrando o desenvolvimento embrionário',
  imgCaption:'Ovos Fertilizados de Papagaio — Para criadores registados com incubadora profissional',
  facts:[
    {v:'26–30 dias',l:'Incubação Araras'},
    {v:'21–26 dias',l:'Incubação Pequenos'},
    {v:'37,2–37,5°C',l:'Temperatura Ideal'},
    {v:'50–65%',l:'Humidade Relativa'},
    {v:'CITES',l:'Documentação'},
    {v:'Criadores',l:'Destinatários'},
    {v:'Verificada',l:'Fertilidade'},
    {v:'Incluída',l:'Orientação'},
  ],
  introHTML:`
    <p>A Paraíso de Aves disponibiliza ovos fertilizados de psitacídeos seleccionados para criadores registados com experiência e equipamento adequado. Esta é uma opção destinada exclusivamente a quem já possui conhecimentos sólidos em incubação artificial e criação à mão de papagaios — não é recomendada para tutores sem experiência prévia nesta área específica.</p>
    <p>Os ovos são obtidos dos nossos pares reprodutores registados, em ambiente controlado e com historial reprodutivo comprovado. A fertilidade dos ovos é verificada por transiluminação antes do envio, o que reduz significativamente o risco de enviar ovos inférteis. Cada lote é acompanhado de documentação CITES completa e certificado de origem.</p>
    <p>Trabalhamos com ovos de várias espécies, consoante a disponibilidade sazonal: araras (azul e amarela, escarlate, severa), papagaios cinzentos (yacos), cacatuas, amazona, eclectus e conuros. A disponibilidade varia com a época reprodutiva de cada espécie — contacte-nos para verificar o que está disponível no momento da sua consulta.</p>
    <p>A criação à mão de papagaios a partir de ovo é uma experiência extraordinariamente gratificante para o criador experiente — o vínculo que se cria com uma ave desde a eclosão é único. No entanto, exige um investimento significativo em equipamento (incubadora profissional, chocadeira/brooder, equipamento de alimentação) e um compromisso de tempo intensivo, especialmente nas primeiras semanas após a eclosão.</p>
  `,
  temperHTML:`
    <p>A criação a partir de ovo tem implicações directas no temperamento das aves adultas. Papagaios criados à mão desde o ovo tendem a ser excepcionalmente socializados com humanos — estabelecem laços muito mais fortes do que aves adquiridas já adultas ou mesmo desmamadas.</p>
    <p>Este processo também permite ao criador moldar desde o início os hábitos alimentares, a tolerância a diferentes estímulos e a familiaridade com diversas pessoas — factores que têm impacto significativo no comportamento adulto da ave.</p>
    <h3>A Responsabilidade da Criação à Mão</h3>
    <p>É crucial que o criador compreenda que uma ave criada à mão desde o ovo desenvolve uma dependência profunda do ser humano. A socialização adequada — exposição progressiva a diferentes pessoas, sons e ambientes — é fundamental para evitar a criação de um animal excessivamente dependente de uma única pessoa.</p>
  `,
  dietHTML:`
    <p>A alimentação de crias desde o ovo requer conhecimentos específicos e materiais adequados:</p>
    <h3>Papilla para Crias</h3>
    <ul>
      <li><strong>Papilla comercial para psitacídeos:</strong> Marcas como Kaytee Exact, Versele-Laga Nutribird A21 ou Roudybush são referências do mercado</li>
      <li><strong>Temperatura de serviço:</strong> 38–40°C (nunca superior — risco de queimaduras do papo)</li>
      <li><strong>Consistência:</strong> Varia com a idade — mais líquida nas primeiras semanas, progressivamente mais espessa</li>
      <li><strong>Frequência:</strong> A cada 2 horas nas primeiras semanas, reduzindo progressivamente</li>
    </ul>
    <h3>Desmame Progressivo</h3>
    <p>O desmame deve ser gradual e nunca forçado. Ofereça alimentos sólidos (pellets humedecidos, frutas amassadas) progressivamente a partir das 6–8 semanas, mantendo a papilla até que a cria coma de forma autónoma e consistente.</p>
  `,
  cageHTML:`
    <p>A criação de ovos requer equipamento específico:</p>
    <h3>Incubadora</h3>
    <ul>
      <li>Temperatura estável de 37,2–37,5°C (controlo electrónico preciso)</li>
      <li>Humidade de 50–55% na fase de incubação, aumentando para 65–70% nos últimos 3 dias antes da eclosão</li>
      <li>Sistema de rotação automática dos ovos (pelo menos 3–4 vezes por dia)</li>
      <li>Ventilação adequada para manutenção do CO2 e O2</li>
    </ul>
    <h3>Brooder / Chocadeira</h3>
    <ul>
      <li>Temperatura de 35°C na primeira semana, reduzindo 1°C por semana</li>
      <li>Superfície antideslizante (papel de cozinha, toalha de papel) para desenvolvimento correcto das patas</li>
      <li>Higiene rigorosa — limpeza e desinfecção diárias</li>
    </ul>
  `,
  careHTML:`
    <p>A criação a partir de ovo é um processo que exige disponibilidade total, especialmente nas primeiras semanas após a eclosão. As crias recém-nascidas precisam de ser alimentadas a cada 2 horas (incluindo durante a noite nas primeiras 2 semanas), o que implica uma dedicação incompatível com um estilo de vida muito ocupado.</p>
    <h3>Cronograma Aproximado</h3>
    <ul>
      <li><strong>Incubação:</strong> 21–30 dias conforme a espécie</li>
      <li><strong>Eclosão:</strong> Processo de 24–48 horas — não interfira a não ser que seja estritamente necessário</li>
      <li><strong>Semanas 1–2:</strong> Alimentação a cada 2h (incluindo noite); temperatura do brooder 34–35°C</li>
      <li><strong>Semanas 3–6:</strong> Alimentação a cada 4h; penas começam a emergir</li>
      <li><strong>Semanas 7–12:</strong> Início do desmame progressivo; desenvolvimento de competências alimentares autónomas</li>
    </ul>
  `,
  healthHTML:`
    <p>A saúde das crias depende criticamente de:</p>
    <ul>
      <li><strong>Higiene rigorosa:</strong> Toda a incubadora, brooder e utensílios de alimentação devem ser desinfectados diariamente</li>
      <li><strong>Temperatura correcta da papilla:</strong> Papilla demasiado quente queima o papo irreversivelmente; demasiado fria causa disbiose</li>
      <li><strong>Monitorização do papo:</strong> O papo deve esvaziar completamente entre alimentações — papo não vazio indica problema digestivo que requer atenção imediata</li>
      <li><strong>Exame veterinário precoce:</strong> Consulta veterinária nas primeiras semanas após a eclosão para detecção precoce de problemas congénitos ou infecciosos</li>
    </ul>
    <p>Recomendamos fortemente que quem nunca criou aves a partir de ovo faça formação específica ou contacte um criador experiente para orientação antes de iniciar este processo.</p>
  `,
  citesHTML:`
    <p>Os ovos fertilizados de psitacídeos protegidos pela CITES (Apêndice I e II) requerem documentação específica para transporte. A Paraíso de Aves fornece toda a documentação CITES necessária para os ovos comercializados, incluindo certificado de origem do par reprodutor e documentação de transporte.</p>
    <p>É responsabilidade do comprador certificar-se de que possui as autorizações necessárias no país de destino para receber ovos de espécies CITES. Em Portugal, recomendamos contactar o ICNF (Instituto da Conservação da Natureza e das Florestas) para verificar os requisitos específicos aplicáveis.</p>
    <p>A comercialização de ovos sem documentação CITES é crime ambiental em toda a União Europeia. Nunca adquira ovos de fontes não documentadas.</p>
  `,
  deliveryHTML:`
    <p>O transporte de ovos fertilizados é uma operação delicada que requer condições específicas. A Paraíso de Aves utiliza embalagem térmica especialmente concebida para manutenção da temperatura e protecção mecânica durante o transporte.</p>
    <p>O envio é efectuado por serviço expresso prioritário, com entrega garantida em 24 horas para Portugal continental. Para as ilhas, o transporte aéreo requer coordenação prévia. A taxa de fertilidade dos ovos após transporte adequado é geralmente muito boa — verificamos por transiluminação antes do envio.</p>
    <p><strong>Importante:</strong> Os ovos devem ser colocados em incubadora nas primeiras horas após a recepção. A Paraíso de Aves não pode garantir os resultados de incubação pois estes dependem do equipamento, conhecimento e condições de incubação do comprador.</p>
  `,
  faqs:[
    {q:'Os ovos são realmente fertilizados?',a:'Sim. Verificamos a fertilidade de cada ovo por transiluminação (candling) antes do envio. Ovos confirmadamente inférteis não são comercializados. A taxa de fertilidade dos nossos pares reprodutores é consistentemente alta.'},
    {q:'Que equipamento preciso para incubar ovos de papagaio?',a:'Uma incubadora profissional com controlo preciso de temperatura (37,2–37,5°C) e humidade, sistema de rotação automática, e um brooder para as crias após a eclosão. Além do equipamento, é necessária experiência prévia ou formação específica.'},
    {q:'Quais as espécies disponíveis em ovos fertilizados?',a:'A disponibilidade é sazonal e depende dos ciclos reprodutivos dos nossos casais. Trabalhamos com ovos de arara azul e amarela, papagaio cinzento, cacatua, amazona, eclectus e conuro. Contacte-nos para verificar disponibilidade actual.'},
    {q:'Os ovos têm documentação CITES?',a:'Sim. Todos os ovos são acompanhados de documentação CITES de origem, certificado do par reprodutor e documentação de transporte. É responsabilidade do comprador verificar os requisitos de importação no seu país.'},
    {q:'Os ovos são adequados para iniciantes?',a:'Não. A criação de aves a partir de ovo exige experiência, equipamento profissional e disponibilidade total (incluindo alimentações nocturnas nas primeiras semanas). Recomendamos fortemente adquirir primeiro uma cria já desmamada.'},
    {q:'Qual a taxa de eclosão esperada?',a:'Depende de múltiplos factores incluindo a espécie, a qualidade da incubadora e a experiência do criador. Com equipamento adequado e boa técnica, taxas de 70–90% são razoáveis para criadores experientes.'},
    {q:'Quanto tempo dura a incubação?',a:'Varia com a espécie: papagaio cinzento cerca de 28 dias; araras grandes 26–30 dias; cacatuas 21–24 dias; amazona e eclectus 26–28 dias; conuros 21–24 dias.'},
    {q:'Como é feito o envio para Portugal?',a:'Por serviço expresso 24 horas, em embalagem térmica especialmente concebida para ovos. Para Portugal continental, a entrega é no dia seguinte ao envio. Para ilhas, contacte-nos para coordenação específica.'},
    {q:'Existe garantia nos ovos?',a:'Verificamos a fertilidade por transiluminação antes do envio. No entanto, não podemos garantir os resultados de incubação pois dependem das condições e competência do criador. Fornecemos orientação técnica completa com cada encomenda.'},
  ],
  related:[
    {url:'../../papagaio-cinzento/',icon:'🩶',name:'Papagaio Cinzento',desc:'Cria desmamada disponível'},
    {url:'../../arara-azul-e-amarela/',icon:'💛',name:'Arara Azul e Amarela',desc:'Cria desmamada disponível'},
    {url:'../../cacatua-de-crista-amarela/',icon:'🤍',name:'Cacatua de Crista Amarela',desc:'Cria desmamada disponível'},
    {url:'../../papagaio-amazona/',icon:'💚',name:'Papagaio Amazona',desc:'Cria desmamada disponível'},
  ],
},

];

/* ══════════════════════════════════════════════════════
   GENERATE ALL PAGES
══════════════════════════════════════════════════════ */
console.log('\n🇵🇹  Phase 4A — Portuguese Species Authority Cluster\n');

allSpecies.forEach(sp => {
  const dir = path.join(__dirname, 'pt', sp.slug);
  mkdirp(dir);
  const html = generatePage(sp);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  const wc = (html.match(/\w+/g)||[]).length;
  console.log(`✓ pt/${sp.slug}/index.html  (~${wc} tokens)`);
});

console.log(`\n✅  Done! Generated ${allSpecies.length} species authority pages.\n`);
