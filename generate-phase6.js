'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.paraisodeaves.com';
const GA = 'G-4007YHH4H9';
const EMAIL = 'paraisodeloros@gmail.com';
const TODAY = '2026-06-30';

// ─── Shared CSS + Head fragments ────────────────────────────────────────────
const COMMON_HEAD_CSS = `  <style>
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
    .hero h1{font-size:2.4rem;font-weight:900;color:#fff;line-height:1.2;margin-bottom:16px}
    .hero .sub{font-size:1.05rem;color:rgba(255,255,255,.82);max-width:640px;margin:0 auto 28px}
    .trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:20px}
    .trust-item{background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:7px 16px;font-size:.83rem;color:rgba(255,255,255,.9);font-weight:600}
    .breadcrumb-nav{font-size:.83rem;color:rgba(255,255,255,.65);margin-bottom:16px}
    .breadcrumb-nav a{color:rgba(255,255,255,.65);text-decoration:none}
    .content{max-width:860px;margin:0 auto;padding:52px 5% 24px}
    .content h2{font-size:1.45rem;font-weight:800;color:var(--primary);margin:2.2rem 0 .9rem;padding-bottom:.4rem;border-bottom:2px solid var(--gold)}
    .content h3{font-size:1.1rem;font-weight:700;color:var(--secondary);margin:1.5rem 0 .5rem}
    .content p{margin-bottom:1.1rem;font-size:.99rem;color:var(--text);line-height:1.84}
    .content ul,.content ol{padding-left:22px;margin-bottom:1.2rem}
    .content li{margin:7px 0;font-size:.97rem;line-height:1.76}
    .content strong{color:var(--primary)}
    .callout{background:rgba(212,169,79,.07);border-left:4px solid var(--gold);border-radius:0 12px 12px 0;padding:18px 22px;margin:1.8rem 0}
    .callout p{margin-bottom:0}
    .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:18px;padding:2.2rem;text-align:center;margin:2.4rem 0;color:#fff}
    .cta-box h2{color:#fff;border:none;padding:0;margin:0 0 10px;font-size:1.4rem}
    .cta-box p{color:rgba(255,255,255,.86);margin-bottom:1.3rem}
    .btn-primary{display:inline-block;padding:.9rem 2rem;border-radius:999px;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--gold-rich));color:#fff;text-decoration:none;font-family:'Poppins',Arial,sans-serif;font-size:.95rem;margin:5px;transition:transform .2s,box-shadow .2s}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(212,169,79,.45);color:#fff;text-decoration:none}
    .btn-ghost{display:inline-block;padding:.85rem 1.8rem;border-radius:999px;font-weight:700;border:2px solid rgba(255,255,255,.5);color:#fff;text-decoration:none;font-family:'Poppins',Arial,sans-serif;font-size:.9rem;margin:5px;transition:all .2s}
    .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff;color:#fff;text-decoration:none}
    .faq{margin:2rem 0}
    .faq details{background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:10px}
    .faq summary{font-weight:700;color:var(--primary);padding:16px 20px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-family:'Poppins',Arial,sans-serif;font-size:.95rem}
    .faq summary::-webkit-details-marker{display:none}
    .faq summary::after{content:'▸';transition:transform .2s;color:var(--gold)}
    .faq details[open] summary::after{transform:rotate(90deg)}
    .faq-body{padding:0 20px 16px;color:var(--muted);font-size:.94rem;line-height:1.76}
    .species-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin:1.5rem 0}
    .species-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px;text-align:center}
    .species-card h3{font-size:.95rem;color:var(--primary);margin-bottom:6px}
    .species-card p{font-size:.83rem;color:var(--muted)}
    .city-links{display:flex;flex-wrap:wrap;gap:10px;margin:1.5rem 0}
    .city-links a{background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:7px 18px;font-size:.85rem;font-weight:600;color:var(--primary);text-decoration:none;transition:all .2s}
    .city-links a:hover{background:var(--primary);color:#fff;border-color:var(--primary);text-decoration:none}
    .article-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin:1.5rem 0}
    .article-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px}
    .article-card h3{font-size:.95rem;color:var(--primary);margin-bottom:8px}
    .article-card p{font-size:.84rem;color:var(--muted);margin-bottom:12px}
    .article-card a.read-more{font-size:.83rem;font-weight:700;color:var(--gold-hover)}
    table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.93rem}
    th{background:var(--primary);color:#fff;padding:10px 14px;text-align:left;font-family:'Poppins',Arial,sans-serif;font-size:.82rem}
    td{padding:9px 14px;border-bottom:1px solid var(--border)}
    tr:nth-child(even) td{background:rgba(212,169,79,.05)}
    .intent-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin:1.5rem 0}
    .intent-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;text-align:center}
    .intent-card .icon{font-size:2rem;margin-bottom:10px}
    .intent-card h3{font-size:.95rem;color:var(--primary);margin-bottom:6px}
    .intent-card p{font-size:.82rem;color:var(--muted)}
    .gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin:1.5rem 0}
    .gallery-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden}
    .gallery-placeholder{background:linear-gradient(135deg,var(--primary),var(--secondary));height:180px;display:flex;align-items:center;justify-content:center;font-size:3rem}
    .gallery-info{padding:14px 16px}
    .gallery-info h3{font-size:.92rem;color:var(--primary);margin-bottom:4px}
    .gallery-info p{font-size:.82rem;color:var(--muted)}
    @media(max-width:640px){.hero h1{font-size:1.65rem}.topnav{gap:.7rem}}
  </style>`;

const NAV_HTML = `<header class="topbar">
  <a class="brand" href="/">🦜 paraisodeaves</a>
  <nav class="topnav">
    <a href="/available-birds/">Aves</a>
    <a href="/adopcion-de-loros">Adopción</a>
    <a href="/blog/">Blog</a>
    <a href="/ciudades/">Ciudades</a>
    <a href="mailto:${EMAIL}">Contacto</a>
    <a href="/pt/" style="font-size:.8rem;opacity:.75">PT</a>
    <a href="/fr/" style="font-size:.8rem;opacity:.75">FR</a>
  </nav>
</header>`;

const FOOTER_HTML = `<footer style="background:#1F3D2B;color:#F8F5F0;padding:3rem 5% 2rem;border-top:1px solid rgba(255,255,255,.1)">
  <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:2rem;margin-bottom:2rem">
    <div>
      <span style="font-family:'Poppins',Arial,sans-serif;font-size:1.05rem;font-weight:700;color:#fff;display:block;margin-bottom:.5rem">🦜 paraisodeaves</span>
      <p style="font-size:.84rem;color:rgba(245,245,245,.78);line-height:1.6">Criadero legal de loros y aves exóticas en Llíria, Valencia (España). 25+ años de experiencia. CITES · Anilla · Núcleo Zoológico.</p>
      <p style="font-size:.82rem;color:rgba(245,245,245,.7);margin-top:.8rem">✉ <a href="mailto:${EMAIL}" style="color:#E0B75F;text-decoration:none">${EMAIL}</a></p>
    </div>
    <div>
      <h4 style="font-family:'Poppins',Arial,sans-serif;font-size:.7rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#E0B75F;margin-bottom:.9rem">Aves</h4>
      <ul style="list-style:none;padding:0">
        <li style="margin-bottom:.45rem"><a href="${BASE}/available-birds/" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Disponibles</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/loro-gris-africano" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Loro Gris Africano</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/guacamayos" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Guacamayos</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/cacatua" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Cacatúas</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/loros-especies" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Todas las especies</a></li>
      </ul>
    </div>
    <div>
      <h4 style="font-family:'Poppins',Arial,sans-serif;font-size:.7rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#E0B75F;margin-bottom:.9rem">Accesorios</h4>
      <ul style="list-style:none;padding:0">
        <li style="margin-bottom:.45rem"><a href="${BASE}/jaulas-loros" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Jaulas</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/alimentacion-loros" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Alimentación</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/juguetes-naturales-loros" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Juguetes</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/transportines-loros" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Transportines</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/perchas-loros" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Perchas</a></li>
      </ul>
    </div>
    <div>
      <h4 style="font-family:'Poppins',Arial,sans-serif;font-size:.7rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#E0B75F;margin-bottom:.9rem">Ciudades</h4>
      <ul style="list-style:none;padding:0">
        <li style="margin-bottom:.45rem"><a href="${BASE}/ciudades/comprar-loros-madrid" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Madrid</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/ciudades/comprar-loros-barcelona" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Barcelona</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/ciudades/comprar-loros-valencia" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Valencia</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/ciudades/comprar-loros-sevilla" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Sevilla</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/ciudades/" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Ver todas →</a></li>
      </ul>
    </div>
    <div>
      <h4 style="font-family:'Poppins',Arial,sans-serif;font-size:.7rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#E0B75F;margin-bottom:.9rem">Comprar por Región</h4>
      <ul style="list-style:none;padding:0">
        <li style="margin-bottom:.45rem"><a href="${BASE}/comprar-loros-madrid" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Comunidad de Madrid</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/comprar-loros-cataluna" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Cataluña</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/comprar-loros-andalucia" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Andalucía</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/comprar-loros-valencia" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Comunitat Valenciana</a></li>
        <li style="margin-bottom:.45rem"><a href="${BASE}/comprar-loros-canarias" style="color:#F8F5F0;font-size:.84rem;text-decoration:none">Canarias</a></li>
      </ul>
    </div>
  </div>
  <div style="max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,.12);padding-top:1.1rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem;font-size:.76rem;color:rgba(245,245,245,.55)">
    <span>© 2026 paraisodeaves.com · Criadero registrado · Llíria, Valencia (España)</span>
    <span><a href="${BASE}/faq" style="color:rgba(245,245,245,.55);text-decoration:none;margin-right:1rem">FAQ</a><a href="${BASE}/nosotros" style="color:rgba(245,245,245,.55);text-decoration:none">Nosotros</a></span>
  </div>
</footer>`;

function ga() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3219055968593295" crossorigin="anonymous"></script>`;
}

function fonts() {
  return `<link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"/></noscript>`;
}

function breadcrumbSchema(items) {
  const list = items.map((it, i) => `{"@type":"ListItem","position":${i+1},"name":"${it.name}","item":"${it.url}"}`).join(',');
  return `<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${list}]}</script>`;
}

function faqSchema(faqs) {
  const entities = faqs.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',');
  return `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${entities}]}</script>`;
}

// ─── TRACK generated pages for sitemap/redirects ────────────────────────────
const generated = []; // {url, priority, changefreq}

function track(url, priority='0.80', changefreq='monthly') {
  generated.push({url, priority, changefreq});
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. MISSING ES CITY PAGES
// ═══════════════════════════════════════════════════════════════════════════
const ES_CITIES_NEW = [
  {
    slug: 'comprar-loros-leon',
    city: 'León',
    region: 'Castilla y León',
    deliveryTime: '4–5 horas desde Llíria',
    h1: 'Loros en León con Documentación CITES',
    title: 'Loros en León | Criador CITES · Envío a Castilla y León',
    desc: 'Yacos, Guacamayos y Cacatúas papilleros con CITES para León. Criados en Llíria, Valencia. Envío especializado a Castilla y León. Consulta disponibilidad.',
    climate: 'clima continental extremo (veranos cálidos e inviernos muy fríos)',
    faqs: [
      {q:'¿Cuánto tarda el envío a León?', a:'El transporte especializado desde Llíria tarda entre 4 y 5 horas hasta León. El ave viaja con documentación completa y en condiciones de temperatura controlada.'},
      {q:'¿Qué especie recomienda para León con su clima frío?', a:'Para el clima continental de León recomendamos el Loro Gris Africano o una Amazona, que se adaptan bien a interiores bien calefactados. Los Guacamayos también se adaptan con los cuidados adecuados en interior.'},
      {q:'¿Existe algún veterinario especializado en aves en León?', a:'León cuenta con clínicas veterinarias que atienden aves exóticas. Recomendamos consultar la web de AVEPA para encontrar especialistas en psitácidas en la provincia.'},
      {q:'¿Puedo visitar el criadero antes de comprar?', a:'Sí, puede visitar nuestro criadero en Llíria (Valencia) previa cita por correo. También hacemos videollamadas para mostrar las aves disponibles.'}
    ]
  },
  {
    slug: 'comprar-loros-tarragona',
    city: 'Tarragona',
    region: 'Cataluña',
    deliveryTime: '3–4 horas desde Llíria',
    h1: 'Loros en Tarragona con Documentación CITES',
    title: 'Loros en Tarragona | Criador CITES · Envío a Cataluña',
    desc: 'Yacos, Guacamayos y Cacatúas papilleros con CITES para Tarragona y el Camp de Tarragona. Criados en Llíria. Normativa Llei 7/2023 (Cataluña) cumplida.',
    climate: 'clima mediterráneo templado, ideal para las aves',
    faqs: [
      {q:'¿Se aplica la normativa catalana (Llei 7/2023) a la compra de un loro en Tarragona?', a:'Sí. En Cataluña aplica la Llei 7/2023 de bienestar animal. Nuestras aves se entregan con documentación CITES completa y guía sanitaria que cumple con todos los requisitos catalanes.'},
      {q:'¿Cuánto tarda el envío a Tarragona?', a:'El transporte especializado desde Llíria llega a Tarragona en 3–4 horas. El trayecto es corto y cómodo para el ave.'},
      {q:'¿Puedo recoger el loro en persona en Tarragona?', a:'La entrega se realiza en el domicilio o mediante acuerdo. Para recoger en persona, visite nuestro criadero en Llíria (Valencia) con cita previa.'},
      {q:'¿Qué especie recomienda para el clima de Tarragona?', a:'El clima mediterráneo de Tarragona es ideal para cualquier psitácida. Las Amazonas y los Guacamayos se adaptan muy bien al clima templado de la Costa Daurada.'}
    ]
  }
];

function generateESCityPage(c) {
  const canonicalUrl = `${BASE}/ciudades/${c.slug}`;
  const html = `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="index, follow"/>
  <title>${c.title}</title>
  <meta name="description" content="${c.desc}"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  ${ga()}
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${c.title} | paraisodeaves"/>
  <meta property="og:description" content="${c.desc}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:image" content="${BASE}/images/loro-gris-01.webp"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  ${breadcrumbSchema([
    {name:'Inicio',url:BASE+'/'},
    {name:'Ciudades',url:BASE+'/ciudades/'},
    {name:`Loros en ${c.city}`,url:canonicalUrl}
  ])}
  ${faqSchema(c.faqs)}
  ${COMMON_HEAD_CSS}
</head>
<body>
${NAV_HTML}
<main>
<section class="hero">
  <div class="wrap">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href="/">Inicio</a> &rsaquo; <a href="/ciudades/">Ciudades</a> &rsaquo; ${c.city}
    </nav>
    <span class="badge">📍 ${c.region}</span>
    <h1>${c.h1}</h1>
    <p class="sub">Criados en Llíria (Valencia) con más de 25 años de experiencia. Documentación CITES oficial, anilla cerrada y guía sanitaria. Envío seguro a ${c.city} en ${c.deliveryTime}.</p>
    <div class="trust-row">
      <span class="trust-item">✓ Núcleo Zoológico Registrado</span>
      <span class="trust-item">✓ CITES Incluido</span>
      <span class="trust-item">✓ Envío ${c.city}</span>
      <span class="trust-item">✓ 25+ Años</span>
    </div>
  </div>
</section>

<div class="content">
  <h2>Comprar un Loro en ${c.city}: Todo lo que Necesitas Saber</h2>
  <p>${c.city} es una ciudad con una creciente comunidad de amantes de las aves exóticas. Si estás pensando en adoptar un loro en ${c.city}, <strong>paraisodeaves</strong> te ofrece aves criadas a mano desde Llíria (Valencia) con toda la documentación legal exigida en España.</p>
  <p>Contamos con un <strong>núcleo zoológico registrado</strong> y más de 25 años criando psitácidas. Todas las aves incluyen documentación CITES, anilla cerrada, guía sanitaria veterinaria y asesoramiento postventa ilimitado.</p>

  <div class="callout">
    <p><strong>📍 Envío a ${c.city}:</strong> Transporte especializado en aves vivas. Trayecto de ${c.deliveryTime}. Temperatura controlada. Caja IATA homologada. El ave llega con toda su documentación.</p>
  </div>

  <h2>Especies Disponibles para ${c.city}</h2>
  <div class="species-grid">
    <div class="species-card"><h3>🦜 Loro Gris Africano</h3><p>El loro más inteligente. Excelente hablador. Perfecto para ${c.city}.</p></div>
    <div class="species-card"><h3>🦜 Guacamayo Ararauna</h3><p>Azul y amarillo. Impresionante y afectuoso. Requiere espacio amplio.</p></div>
    <div class="species-card"><h3>🦜 Cacatúa Alba</h3><p>Sociable y cariñosa. Muy demandante de atención. CITES Apéndice I.</p></div>
    <div class="species-card"><h3>🦜 Amazona Frente Azul</h3><p>Gran habladora. Carácter extrovertido. Longeva (50+ años).</p></div>
    <div class="species-card"><h3>🦜 Eclectus</h3><p>Dimorfismo sexual único. Dieta rica en fruta. Carácter tranquilo.</p></div>
    <div class="species-card"><h3>🦜 Conuro del Sol</h3><p>Colorido y afectuoso. Activo y vocal. No apto para pisos pequeños.</p></div>
  </div>

  <h2>Documentación CITES en ${c.region}</h2>
  <p>En toda España, la documentación CITES es <strong>obligatoria</strong> para la mayoría de psitácidas. Todas nuestras aves se entregan con:</p>
  <ul>
    <li>Certificado CITES de origen y exportación (cuando aplica)</li>
    <li>Anilla cerrada de identificación del criador</li>
    <li>Guía sanitaria firmada por veterinario oficial</li>
    <li>Historial de alimentación y salud del ave</li>
    <li>Factura y garantía del criadero</li>
  </ul>

  <h2>¿Por Qué Elegir paraisodeaves para Compradores en ${c.city}?</h2>
  <ul>
    <li><strong>25+ años de experiencia</strong> criando psitácidas en España</li>
    <li>Aves <strong>criadas a mano</strong> desde el primer día — máxima socialización</li>
    <li>Documentación <strong>100% legal</strong> — nunca tendrás problemas</li>
    <li>Asesoramiento <strong>postventa ilimitado</strong> por correo electrónico</li>
    <li>Envío especializado y seguro a ${c.city}</li>
    <li>Garantía de salud en el momento de la entrega</li>
  </ul>

  <div class="cta-box">
    <h2>¿Interesado en un Loro para ${c.city}?</h2>
    <p>Consulta disponibilidad actual, precios orientativos y condiciones de envío a ${c.city} y ${c.region}.</p>
    <a href="mailto:${EMAIL}" class="btn-primary">✉ Consultar por correo</a>
    <a href="/available-birds/" class="btn-ghost">Ver Aves Disponibles</a>
  </div>

  <h2>Preguntas Frecuentes — Loros en ${c.city}</h2>
  <div class="faq">
    ${c.faqs.map(f => `<details><summary>${f.q}</summary><div class="faq-body"><p>${f.a}</p></div></details>`).join('\n    ')}
  </div>

  <h2>Otras Ciudades donde Enviamos</h2>
  <div class="city-links">
    <a href="/ciudades/comprar-loros-madrid">Madrid</a>
    <a href="/ciudades/comprar-loros-barcelona">Barcelona</a>
    <a href="/ciudades/comprar-loros-valencia">Valencia</a>
    <a href="/ciudades/comprar-loros-sevilla">Sevilla</a>
    <a href="/ciudades/comprar-loros-malaga">Málaga</a>
    <a href="/ciudades/comprar-loros-zaragoza">Zaragoza</a>
    <a href="/ciudades/comprar-loros-bilbao">Bilbao</a>
    <a href="/ciudades/comprar-loros-cordoba">Córdoba</a>
    <a href="/ciudades/">Ver todas las ciudades →</a>
  </div>

  <h2>Artículos Relacionados</h2>
  <div class="article-grid">
    <div class="article-card"><h3>Documentación Completa del Loro</h3><p>Todos los documentos que necesitas para tu loro en España.</p><a class="read-more" href="/documentos-legales-para-adoptar-un-loro">Leer →</a></div>
    <div class="article-card"><h3>Cómo Elegir tu Primer Loro</h3><p>Guía definitiva para elegir la especie perfecta según tu estilo de vida.</p><a class="read-more" href="/blog/como-elegir-tu-primer-loro">Leer →</a></div>
    <div class="article-card"><h3>Errores Comunes al Adoptar</h3><p>Los 10 errores más frecuentes y cómo evitarlos.</p><a class="read-more" href="/errores-comunes-al-adoptar-un-loro">Leer →</a></div>
  </div>
</div>
</main>
${FOOTER_HTML}
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;
  return html;
}

ES_CITIES_NEW.forEach(c => {
  const filePath = `ciudades/${c.slug}.html`;
  fs.writeFileSync(filePath, generateESCityPage(c));
  track(`${BASE}/ciudades/${c.slug}`);
  console.log('Generated:', filePath);
});

// ═══════════════════════════════════════════════════════════════════════════
// 2. MISSING FR CITY PAGE — DIJON
// ═══════════════════════════════════════════════════════════════════════════
const FR_DIJON_DIR = 'fr/perroquets-a-vendre-dijon';
if (!fs.existsSync(FR_DIJON_DIR)) fs.mkdirSync(FR_DIJON_DIR, {recursive:true});

const frDijonHtml = `<!DOCTYPE html>
<html lang="fr-FR" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="index, follow"/>
  <title>Perroquets à Vendre à Dijon | CITES | Éleveur Enregistré | Paraíso de Aves</title>
  <meta name="description" content="Achetez un perroquet exotique à Dijon avec documentation CITES officielle. Livraison en Bourgogne-Franche-Comté. Gris du Gabon, Ara, Cacatoès. Éleveur enregistré 25+ ans."/>
  <link rel="canonical" href="${BASE}/fr/perroquets-a-vendre-dijon/"/>
  <link rel="alternate" hreflang="fr-FR" href="${BASE}/fr/perroquets-a-vendre-dijon/"/>
  <link rel="alternate" hreflang="es-ES" href="${BASE}/"/>
  <link rel="alternate" hreflang="pt-PT" href="${BASE}/pt/"/>
  <link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  ${ga()}
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="fr_FR"/>
  <meta property="og:title" content="Perroquets à Vendre à Dijon | CITES | Paraíso de Aves"/>
  <meta property="og:description" content="Achetez un perroquet exotique à Dijon avec documentation CITES. Livraison Bourgogne. Gris du Gabon, Ara, Cacatoès."/>
  <meta property="og:url" content="${BASE}/fr/perroquets-a-vendre-dijon/"/>
  <meta property="og:image" content="${BASE}/images/loro-gris-01.webp"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Accueil","item":"${BASE}/fr/"},
    {"@type":"ListItem","position":2,"name":"Villes","item":"${BASE}/fr/"},
    {"@type":"ListItem","position":3,"name":"Perroquets à Dijon","item":"${BASE}/fr/perroquets-a-vendre-dijon/"}
  ]}</script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
    {"@type":"Question","name":"Livrez-vous les perroquets à Dijon ?","acceptedAnswer":{"@type":"Answer","text":"Oui, nous livrons à Dijon et dans toute la Bourgogne-Franche-Comté. Le transport spécialisé assure le confort de l'oiseau pendant tout le trajet depuis Llíria (Espagne)."}},
    {"@type":"Question","name":"Quelle espèce recommandez-vous pour Dijon ?","acceptedAnswer":{"@type":"Answer","text":"Le Gris du Gabon et l'Amazone à front bleu s'adaptent très bien au climat continental de Dijon. Pour les appartements, une Cacatoès Ninfa ou un Conure Vert sont aussi d'excellents choix."}},
    {"@type":"Question","name":"Les oiseaux viennent-ils avec les documents CITES ?","acceptedAnswer":{"@type":"Answer","text":"Oui, tous nos oiseaux sont livrés avec la documentation CITES officielle, la bague fermée d'identification, le certificat sanitaire vétérinaire et la facture du centre d'élevage enregistré."}},
    {"@type":"Question","name":"Puis-je visiter l'élevage avant d'acheter ?","acceptedAnswer":{"@type":"Answer","text":"Oui, vous pouvez visiter notre élevage à Llíria (Valence, Espagne) sur rendez-vous préalable par email. Nous proposons également des appels vidéo pour vous montrer les oiseaux disponibles."}}
  ]}</script>
  <style>
    :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2}
    *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.8}
    h1,h2,h3{font-family:'Poppins',Arial,sans-serif}a{color:var(--primary);text-decoration:none}a:hover{color:var(--gold)}
    .topbar{position:sticky;top:0;z-index:50;background:var(--primary);border-bottom:2px solid var(--gold);padding:14px 5%;display:flex;align-items:center;justify-content:space-between}
    .brand{font-weight:900;font-size:1.05rem;color:#fff;text-decoration:none}.topnav{display:flex;gap:1.3rem;align-items:center}
    .topnav a{color:rgba(255,255,255,.9);font-weight:600;font-size:.88rem;text-decoration:none}.topnav a:hover{color:var(--gold)}
    .hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:60px 5% 52px;text-align:center}
    .hero .wrap{max-width:820px;margin:0 auto}
    .badge{display:inline-block;background:rgba(212,169,79,.18);border:1px solid var(--gold);color:var(--gold);font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 14px;border-radius:999px;margin-bottom:18px}
    .hero h1{font-size:2.2rem;font-weight:900;color:#fff;line-height:1.2;margin-bottom:14px}
    .hero .sub{font-size:1rem;color:rgba(255,255,255,.82);max-width:600px;margin:0 auto 24px}
    .trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:18px}
    .trust-item{background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:6px 14px;font-size:.82rem;color:rgba(255,255,255,.9);font-weight:600}
    .content{max-width:840px;margin:0 auto;padding:50px 5% 24px}
    .content h2{font-size:1.4rem;font-weight:800;color:var(--primary);margin:2rem 0 .8rem;padding-bottom:.4rem;border-bottom:2px solid var(--gold)}
    .content p{margin-bottom:1rem;font-size:.98rem;line-height:1.82}
    .content ul{padding-left:20px;margin-bottom:1.1rem}.content li{margin:7px 0;font-size:.96rem}
    .callout{background:rgba(212,169,79,.07);border-left:4px solid var(--gold);border-radius:0 12px 12px 0;padding:16px 20px;margin:1.6rem 0}
    .callout p{margin-bottom:0}
    .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:16px;padding:2rem;text-align:center;margin:2rem 0;color:#fff}
    .cta-box h2{color:#fff;border:none;padding:0;margin:0 0 10px;font-size:1.35rem}
    .cta-box p{color:rgba(255,255,255,.85);margin-bottom:1.2rem}
    .btn-primary{display:inline-block;padding:.85rem 1.8rem;border-radius:999px;font-weight:800;background:linear-gradient(135deg,var(--gold),#B8933E);color:#fff;text-decoration:none;font-family:'Poppins',Arial,sans-serif;font-size:.92rem;margin:4px}
    .btn-ghost{display:inline-block;padding:.82rem 1.7rem;border-radius:999px;font-weight:700;border:2px solid rgba(255,255,255,.5);color:#fff;text-decoration:none;font-family:'Poppins',Arial,sans-serif;font-size:.88rem;margin:4px}
    .faq details{background:#fff;border:1px solid var(--border);border-radius:12px;margin-bottom:10px}
    .faq summary{font-weight:700;color:var(--primary);padding:15px 18px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;font-family:'Poppins',Arial,sans-serif;font-size:.94rem}
    .faq summary::-webkit-details-marker{display:none}.faq summary::after{content:'▸';color:var(--gold)}
    .faq details[open] summary::after{transform:rotate(90deg);display:inline-block}
    .faq-body{padding:0 18px 14px;color:var(--muted);font-size:.93rem;line-height:1.74}
    .city-links{display:flex;flex-wrap:wrap;gap:9px;margin:1.3rem 0}
    .city-links a{background:#fff;border:1px solid var(--border);border-radius:999px;padding:6px 16px;font-size:.83rem;font-weight:600;color:var(--primary)}
    .city-links a:hover{background:var(--primary);color:#fff;border-color:var(--primary)}
    .species-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px;margin:1.3rem 0}
    .species-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
    .species-card h3{font-size:.92rem;color:var(--primary);margin-bottom:5px}
    .species-card p{font-size:.81rem;color:var(--muted)}
    @media(max-width:640px){.hero h1{font-size:1.6rem}.topnav{gap:.6rem}}
  </style>
</head>
<body>
<header class="topbar">
  <a class="brand" href="/fr/">🦜 paraisodeaves</a>
  <nav class="topnav">
    <a href="/fr/perroquets/">Espèces</a>
    <a href="/fr/blog/">Blog</a>
    <a href="/fr/contact/">Contact</a>
    <a href="/fr/livraison/">Livraison</a>
    <a href="/" style="font-size:.78rem;opacity:.75">ES</a>
    <a href="/pt/" style="font-size:.78rem;opacity:.75">PT</a>
  </nav>
</header>
<main>
<section class="hero">
  <div class="wrap">
    <span class="badge">📍 Bourgogne-Franche-Comté</span>
    <h1>Perroquets à Vendre à Dijon</h1>
    <p class="sub">Éleveur enregistré depuis 25+ ans à Llíria (Valence, Espagne). Documentation CITES officielle. Livraison spécialisée à Dijon et en Bourgogne.</p>
    <div class="trust-row">
      <span class="trust-item">✓ Noyau Zoologique Enregistré</span>
      <span class="trust-item">✓ CITES Inclus</span>
      <span class="trust-item">✓ Livraison Dijon</span>
      <span class="trust-item">✓ 25+ Ans d'Expérience</span>
    </div>
  </div>
</section>
<div class="content">
  <h2>Acheter un Perroquet à Dijon</h2>
  <p>Dijon, capitale de la Bourgogne-Franche-Comté, accueille de plus en plus d'amateurs d'oiseaux exotiques. <strong>Paraíso de Aves</strong> vous propose des perroquets élevés à la main dans notre centre d'élevage de Llíria (Valence, Espagne), avec toute la documentation légale requise.</p>
  <p>Chaque oiseau est livré avec son certificat CITES, sa bague d'identification fermée, son certificat sanitaire vétérinaire et notre garantie de santé.</p>

  <div class="callout">
    <p><strong>📍 Livraison à Dijon :</strong> Transport spécialisé en oiseaux vivants depuis Llíria (Espagne). Température contrôlée. Caisse IATA homologuée. L'oiseau arrive avec tous ses documents.</p>
  </div>

  <h2>Espèces Disponibles</h2>
  <div class="species-grid">
    <div class="species-card"><h3>🦜 Gris du Gabon</h3><p>Le plus intelligent. Excellent parleur. Idéal pour Dijon.</p></div>
    <div class="species-card"><h3>🦜 Ara Bleu et Jaune</h3><p>Magnifique et affectueux. Requiert de l'espace.</p></div>
    <div class="species-card"><h3>🦜 Cacatoès Blanc</h3><p>Sociable et câlin. Très demandant en attention.</p></div>
    <div class="species-card"><h3>🦜 Amazone Front Bleu</h3><p>Grand parleur. Caractère extraverti. 50+ ans de vie.</p></div>
    <div class="species-card"><h3>🦜 Éclectus</h3><p>Dimorphisme sexuel unique. Régime riche en fruits.</p></div>
    <div class="species-card"><h3>🦜 Conure Soleil</h3><p>Très coloré et affectueux. Vocal et actif.</p></div>
  </div>

  <h2>Documentation CITES en France</h2>
  <p>En France, la réglementation sur les oiseaux exotiques est stricte. Tous nos oiseaux sont livrés avec :</p>
  <ul>
    <li>Certificat CITES d'origine et de captivité</li>
    <li>Bague fermée d'identification de l'éleveur</li>
    <li>Certificat sanitaire signé par un vétérinaire officiel</li>
    <li>Historique alimentaire et de santé de l'oiseau</li>
    <li>Facture et garantie du centre d'élevage</li>
  </ul>

  <div class="cta-box">
    <h2>Intéressé par un Perroquet à Dijon ?</h2>
    <p>Consultez la disponibilité actuelle, les prix indicatifs et les conditions de livraison à Dijon.</p>
    <a href="mailto:${EMAIL}" class="btn-primary">✉ Nous contacter par email</a>
    <a href="/available-birds/" class="btn-ghost">Voir les oiseaux disponibles</a>
  </div>

  <h2>Questions Fréquentes</h2>
  <div class="faq">
    <details><summary>Livrez-vous les perroquets à Dijon ?</summary><div class="faq-body"><p>Oui, nous livrons à Dijon et dans toute la Bourgogne-Franche-Comté. Le transport spécialisé assure le confort de l'oiseau pendant tout le trajet depuis Llíria (Espagne).</p></div></details>
    <details><summary>Quelle espèce recommandez-vous pour Dijon ?</summary><div class="faq-body"><p>Le Gris du Gabon et l'Amazone s'adaptent très bien au climat continental de Dijon. Pour les appartements, une Cacatoès Ninfa est aussi un excellent choix.</p></div></details>
    <details><summary>Les oiseaux viennent-ils avec les documents CITES ?</summary><div class="faq-body"><p>Oui, tous nos oiseaux sont livrés avec la documentation CITES officielle, la bague fermée d'identification, le certificat sanitaire vétérinaire et la facture du centre d'élevage.</p></div></details>
    <details><summary>Puis-je visiter l'élevage avant d'acheter ?</summary><div class="faq-body"><p>Oui, vous pouvez visiter notre élevage à Llíria (Valence, Espagne) sur rendez-vous préalable par email. Nous proposons également des appels vidéo.</p></div></details>
  </div>

  <h2>Autres Villes en France</h2>
  <div class="city-links">
    <a href="/fr/perroquets-a-vendre-paris/">Paris</a>
    <a href="/fr/perroquets-a-vendre-lyon/">Lyon</a>
    <a href="/fr/perroquets-a-vendre-marseille/">Marseille</a>
    <a href="/fr/perroquets-a-vendre-toulouse/">Toulouse</a>
    <a href="/fr/perroquets-a-vendre-nice/">Nice</a>
    <a href="/fr/perroquets-a-vendre-bordeaux/">Bordeaux</a>
    <a href="/fr/perroquets-a-vendre-lille/">Lille</a>
    <a href="/fr/perroquets-a-vendre-nantes/">Nantes</a>
    <a href="/fr/perroquets-a-vendre-strasbourg/">Strasbourg</a>
    <a href="/fr/perroquets-a-vendre-rennes/">Rennes</a>
    <a href="/fr/perroquets-a-vendre-montpellier/">Montpellier</a>
  </div>
</div>
</main>
<footer style="background:#1F3D2B;color:#F8F5F0;padding:2.5rem 5% 1.8rem;border-top:1px solid rgba(255,255,255,.1);text-align:center">
  <p style="font-family:'Poppins',Arial,sans-serif;font-size:1rem;font-weight:700;color:#fff;margin-bottom:.5rem">🦜 paraisodeaves</p>
  <p style="font-size:.84rem;color:rgba(245,245,245,.75);margin-bottom:.8rem">Éleveur enregistré de perroquets à Llíria, Valence (Espagne). CITES · Bague · Noyau Zoologique.</p>
  <p style="font-size:.82rem;color:rgba(245,245,245,.65)">✉ <a href="mailto:${EMAIL}" style="color:#E0B75F">${EMAIL}</a></p>
  <p style="margin-top:1rem;font-size:.75rem;color:rgba(245,245,245,.45)">© 2026 paraisodeaves.com · <a href="/fr/" style="color:rgba(245,245,245,.45)">Accueil</a> · <a href="/fr/contact/" style="color:rgba(245,245,245,.45)">Contact</a></p>
</footer>
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;

fs.writeFileSync(`${FR_DIJON_DIR}/index.html`, frDijonHtml);
track(`${BASE}/fr/perroquets-a-vendre-dijon/`);
console.log('Generated: fr/perroquets-a-vendre-dijon/index.html');

// ═══════════════════════════════════════════════════════════════════════════
// 3. SPECIES × CITY PAGES
// ═══════════════════════════════════════════════════════════════════════════
const SPECIES_CITIES = [
  {species:'loro-gris-africano', speciesName:'Loro Gris Africano (Yaco)', slug:'loro-gris-africano-madrid', city:'Madrid', region:'Comunidad de Madrid', speciesEmoji:'🦜', keyProp:'inteligencia superior y habla excepcional'},
  {species:'loro-gris-africano', speciesName:'Loro Gris Africano (Yaco)', slug:'loro-gris-africano-barcelona', city:'Barcelona', region:'Cataluña', speciesEmoji:'🦜', keyProp:'inteligencia superior y habla excepcional'},
  {species:'loro-gris-africano', speciesName:'Loro Gris Africano (Yaco)', slug:'loro-gris-africano-sevilla', city:'Sevilla', region:'Andalucía', speciesEmoji:'🦜', keyProp:'inteligencia superior y habla excepcional'},
  {species:'loro-gris-africano', speciesName:'Loro Gris Africano (Yaco)', slug:'loro-gris-africano-valencia', city:'Valencia', region:'Comunitat Valenciana', speciesEmoji:'🦜', keyProp:'inteligencia superior y habla excepcional'},
  {species:'loro-gris-africano', speciesName:'Loro Gris Africano (Yaco)', slug:'loro-gris-africano-bilbao', city:'Bilbao', region:'País Vasco', speciesEmoji:'🦜', keyProp:'inteligencia superior y habla excepcional'},
  {species:'guacamayo', speciesName:'Guacamayo Ararauna', slug:'guacamayo-sevilla', city:'Sevilla', region:'Andalucía', speciesEmoji:'🦜', keyProp:'plumaje azul y amarillo espectacular'},
  {species:'guacamayo', speciesName:'Guacamayo Ararauna', slug:'guacamayo-valencia', city:'Valencia', region:'Comunitat Valenciana', speciesEmoji:'🦜', keyProp:'plumaje azul y amarillo espectacular'},
  {species:'guacamayo', speciesName:'Guacamayo Ararauna', slug:'guacamayo-zaragoza', city:'Zaragoza', region:'Aragón', speciesEmoji:'🦜', keyProp:'plumaje azul y amarillo espectacular'},
  {species:'amazona', speciesName:'Amazona Frente Azul', slug:'amazona-madrid', city:'Madrid', region:'Comunidad de Madrid', speciesEmoji:'🦜', keyProp:'la mejor habladora entre las amazonas'},
  {species:'amazona', speciesName:'Amazona Frente Azul', slug:'amazona-barcelona', city:'Barcelona', region:'Cataluña', speciesEmoji:'🦜', keyProp:'la mejor habladora entre las amazonas'},
  {species:'amazona', speciesName:'Amazona Frente Azul', slug:'amazona-sevilla', city:'Sevilla', region:'Andalucía', speciesEmoji:'🦜', keyProp:'la mejor habladora entre las amazonas'},
  {species:'cacatua', speciesName:'Cacatúa Alba', slug:'cacatua-sevilla', city:'Sevilla', region:'Andalucía', speciesEmoji:'🦜', keyProp:'carácter sociable y cariñoso extremo'},
  {species:'cacatua', speciesName:'Cacatúa Alba', slug:'cacatua-bilbao', city:'Bilbao', region:'País Vasco', speciesEmoji:'🦜', keyProp:'carácter sociable y cariñoso extremo'},
  {species:'cacatua', speciesName:'Cacatúa Alba', slug:'cacatua-zaragoza', city:'Zaragoza', region:'Aragón', speciesEmoji:'🦜', keyProp:'carácter sociable y cariñoso extremo'},
  {species:'conuro', speciesName:'Conuro del Sol', slug:'conuro-madrid', city:'Madrid', region:'Comunidad de Madrid', speciesEmoji:'🦜', keyProp:'plumaje anaranjado espectacular y carácter afectuoso'},
  {species:'eclectus', speciesName:'Loro Eclectus', slug:'eclectus-madrid', city:'Madrid', region:'Comunidad de Madrid', speciesEmoji:'🦜', keyProp:'dimorfismo sexual único y carácter tranquilo'},
  {species:'eclectus', speciesName:'Loro Eclectus', slug:'eclectus-barcelona', city:'Barcelona', region:'Cataluña', speciesEmoji:'🦜', keyProp:'dimorfismo sexual único y carácter tranquilo'},
];

function generateSpeciesCityPage(p) {
  const canonicalUrl = `${BASE}/ciudades/${p.slug}`;
  const title = `${p.speciesName} en ${p.city} | Criador CITES · Envío a ${p.region}`;
  const desc = `Adopta un ${p.speciesName} en ${p.city} con documentación CITES. Criado a mano en Llíria (Valencia). Envío seguro a ${p.region}. ${p.keyProp}.`;
  
  const html = `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="index, follow"/>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  ${ga()}
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:image" content="${BASE}/images/loro-gris-01.webp"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  ${breadcrumbSchema([
    {name:'Inicio',url:BASE+'/'},
    {name:'Ciudades',url:BASE+'/ciudades/'},
    {name:`${p.speciesName} en ${p.city}`,url:canonicalUrl}
  ])}
  ${faqSchema([
    {q:`¿Cuánto cuesta un ${p.speciesName} en ${p.city}?`, a:`Los precios varían según disponibilidad y edad del ave. Contacta con nuestro criadero por correo para recibir precios actualizados y condiciones de entrega en ${p.city}.`},
    {q:`¿El ${p.speciesName} es buena mascota para ${p.city}?`, a:`Sí. El ${p.speciesName} se adapta perfectamente a hogares de ${p.city}, tanto casas como pisos bien acondicionados. Criamos todas las aves a mano para garantizar máxima socialización.`},
    {q:`¿Viene con documentación CITES para ${p.region}?`, a:`Sí, todas nuestras aves se entregan con certificado CITES, anilla cerrada, guía sanitaria veterinaria y toda la documentación exigida por la legislación española vigente.`},
    {q:`¿Hacéis envíos a ${p.city}?`, a:`Sí, enviamos aves a ${p.city} y toda la ${p.region} mediante transporte especializado en aves vivas, con caja IATA homologada y temperatura controlada.`}
  ])}
  ${COMMON_HEAD_CSS}
</head>
<body>
${NAV_HTML}
<main>
<section class="hero">
  <div class="wrap">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href="/">Inicio</a> &rsaquo; <a href="/ciudades/">Ciudades</a> &rsaquo; ${p.speciesName} en ${p.city}
    </nav>
    <span class="badge">${p.speciesEmoji} ${p.city} · ${p.region}</span>
    <h1>${p.speciesName} en ${p.city} con CITES</h1>
    <p class="sub">Criados a mano en Llíria (Valencia) con 25+ años de experiencia. Documentación CITES oficial, anilla cerrada y guía sanitaria. Envío seguro a ${p.city} y ${p.region}.</p>
    <div class="trust-row">
      <span class="trust-item">✓ Criado a Mano</span>
      <span class="trust-item">✓ CITES Incluido</span>
      <span class="trust-item">✓ Envío ${p.city}</span>
      <span class="trust-item">✓ 25+ Años</span>
    </div>
  </div>
</section>
<div class="content">
  <h2>${p.speciesName} como Mascota en ${p.city}</h2>
  <p>El <strong>${p.speciesName}</strong> es una de las psitácidas más buscadas en España, conocida por su <em>${p.keyProp}</em>. Si estás en ${p.city} o ${p.region} y quieres adoptar un ${p.speciesName} con garantías legales, <strong>paraisodeaves</strong> es tu criadero de referencia.</p>
  <p>Nuestras aves se crían a mano desde las primeras semanas de vida en nuestro núcleo zoológico registrado en Llíria (Valencia). Esto garantiza máxima socialización, docilidad y vinculación con el propietario.</p>

  <div class="callout">
    <p><strong>✓ ¿Por qué elegirnos?</strong> 25+ años de experiencia, aves criadas a mano, documentación CITES completa, asesoramiento postventa ilimitado y garantía de salud en la entrega.</p>
  </div>

  <h2>Documentación para el ${p.speciesName} en ${p.region}</h2>
  <p>En ${p.region} (como en toda España), la compra de un ${p.speciesName} requiere documentación oficial:</p>
  <ul>
    <li>Certificado CITES (obligatorio para esta especie)</li>
    <li>Anilla cerrada de identificación del criador</li>
    <li>Guía sanitaria emitida por veterinario oficial</li>
    <li>Factura del criadero registrado</li>
  </ul>
  <p>Todas estas gestiones están incluidas en nuestro proceso de venta. El comprador nunca debe preocuparse por la documentación.</p>

  <h2>Envío a ${p.city}</h2>
  <p>Enviamos ${p.speciesName}s a ${p.city} mediante transportistas especializados en aves vivas. El animal viaja en una caja IATA homologada con temperatura controlada, agua y alimento. Llegará a su domicilio en las mejores condiciones posibles.</p>

  <div class="cta-box">
    <h2>¿Interesado en un ${p.speciesName} para ${p.city}?</h2>
    <p>Consulta disponibilidad actual, edad de las aves disponibles y condiciones de entrega en ${p.city}.</p>
    <a href="mailto:${EMAIL}" class="btn-primary">✉ Consultar disponibilidad</a>
    <a href="/available-birds/" class="btn-ghost">Ver Aves Disponibles</a>
  </div>

  <h2>Preguntas Frecuentes</h2>
  <div class="faq">
    <details><summary>¿Cuánto cuesta un ${p.speciesName} en ${p.city}?</summary><div class="faq-body"><p>Los precios varían según disponibilidad y edad del ave. Contacta con nuestro criadero por correo para recibir precios actualizados y condiciones de entrega en ${p.city}.</p></div></details>
    <details><summary>¿El ${p.speciesName} es buena mascota para ${p.city}?</summary><div class="faq-body"><p>Sí. El ${p.speciesName} se adapta perfectamente a hogares de ${p.city}. Criamos todas las aves a mano para garantizar máxima socialización.</p></div></details>
    <details><summary>¿Viene con documentación CITES?</summary><div class="faq-body"><p>Sí, todas nuestras aves se entregan con certificado CITES, anilla cerrada, guía sanitaria veterinaria y toda la documentación exigida por la legislación española vigente.</p></div></details>
    <details><summary>¿Hacéis envíos a ${p.city}?</summary><div class="faq-body"><p>Sí, enviamos aves a ${p.city} y toda la ${p.region} mediante transporte especializado en aves vivas, con caja IATA homologada y temperatura controlada.</p></div></details>
  </div>

  <h2>Más Información sobre el ${p.speciesName}</h2>
  <div class="article-grid">
    <div class="article-card"><h3>Guía Completa de la Especie</h3><p>Todo sobre cuidados, alimentación, carácter y documentación.</p><a class="read-more" href="/blog/guia-${p.species === 'loro-gris-africano' ? 'loro-gris-africano' : p.species === 'amazona' ? 'amazona-frente-azul' : p.species === 'cacatua' ? 'cacatua-ninfa' : p.species === 'conuro' ? 'conuro-sol' : p.species === 'eclectus' ? 'eclectus-roratus' : 'guacamayo-azul-amarillo'}">Leer →</a></div>
    <div class="article-card"><h3>Cuidados Diarios</h3><p>Rutina de cuidados completa para tu nueva ave.</p><a class="read-more" href="/blog/cuidados-diarios-loro">Leer →</a></div>
    <div class="article-card"><h3>Documentación Completa</h3><p>Todos los documentos necesarios para un loro en España.</p><a class="read-more" href="/documentos-legales-para-adoptar-un-loro">Leer →</a></div>
  </div>

  <h2>Otras Ciudades</h2>
  <div class="city-links">
    <a href="/ciudades/comprar-loros-madrid">Madrid</a>
    <a href="/ciudades/comprar-loros-barcelona">Barcelona</a>
    <a href="/ciudades/comprar-loros-sevilla">Sevilla</a>
    <a href="/ciudades/comprar-loros-malaga">Málaga</a>
    <a href="/ciudades/comprar-loros-zaragoza">Zaragoza</a>
    <a href="/ciudades/">Ver todas →</a>
  </div>
</div>
</main>
${FOOTER_HTML}
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;
  return html;
}

SPECIES_CITIES.forEach(p => {
  // Check if already exists
  const filePath = `ciudades/${p.slug}.html`;
  if (fs.existsSync(filePath)) {
    console.log('Skip (exists):', filePath);
    return;
  }
  fs.writeFileSync(filePath, generateSpeciesCityPage(p));
  track(`${BASE}/ciudades/${p.slug}`);
  console.log('Generated:', filePath);
});

// ═══════════════════════════════════════════════════════════════════════════
// 4. BUYER INTENT PAGES
// ═══════════════════════════════════════════════════════════════════════════
const BUYER_INTENT = [
  {
    slug:'loros-menos-1000-euros',
    title:'Loros por Menos de 1.000€ con CITES en España 2026',
    desc:'Cuáles son los loros con precio inferior a 1.000€ en España con documentación CITES legal. Ninfas, conuros, agapornis y algunas amazonas con full docs.',
    h1:'Loros por Menos de 1.000€ en España',
    badge:'💶 Por Presupuesto',
    icon:'💶',
    intro:'Adoptar un loro no siempre requiere un gran presupuesto. Existen varias especies de psitácidas disponibles en España con documentación CITES por menos de 1.000€, perfectas para propietarios primerizos o familias.',
    sections:[
      {h:'Especies Disponibles por Menos de 1.000€',body:'Las cacatúas ninfas, conuros verdes (green cheek), agapornis inseparables y los periquitos australianos son las opciones más accesibles. Algunas amazonas de talla media también entran en este rango de precio.'},
      {h:'¿Precio Bajo Significa Menor Calidad?',body:'No. El precio de un loro depende principalmente de la rareza de la especie y la demanda del mercado, no de la calidad del criador. Un loro gris africano cuesta más que una ninfa simplemente porque es más raro y tiene mayor demanda.'},
      {h:'Documentación CITES en Loros de Precio Bajo',body:'Incluso las especies más económicas requieren documentación legal en España: anilla cerrada del criador, guía sanitaria y en muchos casos certificado CITES. Exige siempre toda la documentación.'},
    ],
    faqs:[
      {q:'¿Qué loros cuestan menos de 1.000€ en España?',a:'Las cacatúas ninfas, conuros verdes, agapornis y periquitos australianos suelen estar por debajo de los 1.000€. Consulta nuestro correo para conocer disponibilidad y precios actuales.'},
      {q:'¿Un loro barato es menos sano?',a:'El precio no determina la salud. Lo que importa es el criador: un ave bien criada, con documentación completa y revisión veterinaria previa garantiza su salud independientemente del precio.'},
      {q:'¿Cuál es el loro más barato con CITES?',a:'Los periquitos australianos y agapornis inseparables son las opciones más económicas con documentación legal. Sin embargo, consulta siempre que el criador esté registrado.'},
    ]
  },
  {
    slug:'loros-bebe',
    title:'Loros Bebé a la Venta en España con CITES 2026',
    desc:'Adopta un loro bebé criado a mano en España con documentación CITES completa. Yacos, guacamayos, cacatúas y amazonas desde el criadero directo.',
    h1:'Loros Bebé con Documentación CITES en España',
    badge:'🐣 Loros Bebé',
    icon:'🐣',
    intro:'Los loros bebé criados a mano son los más sociables, dóciles y fáciles de vincular con su propietario. En paraisodeaves criamos a mano todas nuestras aves desde las primeras semanas de vida.',
    sections:[
      {h:'¿Qué Edad Tiene un "Loro Bebé"?',body:'Un loro bebé es aquel que aún no ha completado el destete o lo acaba de completar. Según la especie, esto ocurre entre las 6 y las 16 semanas de vida. En este momento el ave está en su período óptimo de socialización.'},
      {h:'Crianza a Mano vs Crianza por los Padres',body:'Los loros criados a mano por el criador desde muy pequeños desarrollan una vinculación extraordinaria con los humanos. Son menos miedosos, más tolerantes al manejo y más fáciles de adiestrar desde el primer día.'},
      {h:'Documentación del Loro Bebé',body:'Incluso siendo bebé, el loro debe tener toda su documentación: anilla cerrada del criadero, guía sanitaria veterinaria y certificado CITES cuando corresponde según la especie.'},
    ],
    faqs:[
      {q:'¿Cuándo se puede llevar un loro bebé a casa?',a:'El loro puede salir del criadero cuando está completamente destetado, es decir, come solo sin ayuda del criador. Según la especie esto ocurre entre las 8 y las 16 semanas.'},
      {q:'¿Es mejor un loro bebé o un adulto?',a:'Depende del propietario. Un loro bebé requiere más dedicación al inicio, pero es más fácil de moldear y socializar. Un adulto ya tiene carácter formado y puede ser más independiente.'},
      {q:'¿Los loros bebé ya tienen CITES?',a:'Sí. La documentación CITES se gestiona antes de que el ave salga del criadero. El bebé llega a su nuevo hogar con toda la documentación legal en orden.'},
    ]
  },
  {
    slug:'loros-criados-mano',
    title:'Loros Criados a Mano en España: Ventajas y Dónde Encontrarlos 2026',
    desc:'Todo sobre los loros criados a mano: qué significa, por qué son mejores mascotas y cómo verificar que tu loro fue realmente criado a mano en un criadero registrado.',
    h1:'Loros Criados a Mano: La Mejor Opción para tu Hogar',
    badge:'🤲 Criados a Mano',
    icon:'🤲',
    intro:'La crianza a mano es el proceso por el cual el criador alimenta manualmente al loro desde muy pequeño, antes de que abra los ojos. Esto crea una impronta humana que hace al loro más sociable, dócil y fácil de adiestrar.',
    sections:[
      {h:'¿Qué Significa "Criado a Mano"?',body:'Un loro criado a mano ha sido alimentado por el criador con papilla mediante jeringa desde los primeros días de vida. El loro aprende a identificar a los humanos como su "familia" y esto facilita enormemente la socialización y el adiestramiento.'},
      {h:'Diferencias entre Criado a Mano y Criado por los Padres',body:'Un loro criado por sus padres puede ser perfectamente sano y feliz, pero requiere más tiempo para socializarse con humanos. El criado a mano llega a tu casa ya predispuesto a interactuar con las personas.'},
      {h:'Cómo Verificar que es un Loro Criado a Mano',body:'Un criador serio podrá mostrarte fotos y vídeos del proceso de crianza a mano. El loro debe dejar que te acerques y manipules sin mostrar miedo excesivo.'},
    ],
    faqs:[
      {q:'¿Un loro criado a mano habla más?',a:'No necesariamente. La capacidad de habla es una característica de la especie, no del método de crianza. Sin embargo, el loro criado a mano es más receptivo al adiestramiento, lo que facilita enseñarle a hablar.'},
      {q:'¿Es más caro un loro criado a mano?',a:'En general sí, porque el proceso de crianza a mano requiere mucho más tiempo y dedicación del criador. Pero el resultado es un ave mucho más sociable y fácil de integrar en el hogar.'},
      {q:'¿En paraisodeaves todos los loros son criados a mano?',a:'Sí. En nuestro criadero todas las aves se crían a mano desde las primeras semanas de vida. Es una filosofía que seguimos desde hace 25 años.'},
    ]
  },
  {
    slug:'loros-que-hablan',
    title:'Los Loros que Mejor Hablan: Cuáles Comprar en España 2026',
    desc:'Cuáles son los loros con mayor capacidad de habla en España. Ranking completo: loro gris africano, amazona, guacamayo y más. Guía de compra con CITES.',
    h1:'Los Loros que Mejor Hablan: Guía de Compra 2026',
    badge:'🗣️ Loros Habladores',
    icon:'🗣️',
    intro:'No todos los loros hablan con la misma claridad ni el mismo vocabulario. Si buscas un loro que hable, necesitas elegir la especie correcta y dedicar tiempo a su adiestramiento.',
    sections:[
      {h:'Top 5 Loros Habladores en España',body:'1. Loro Gris Africano (Yaco) — hasta 1.000 palabras, con comprensión semántica. 2. Amazona Real — voz muy nítida y potente. 3. Amazona Frente Azul — excelente habladora. 4. Guacamayo Ararauna — voz potente, vocabulario limitado. 5. Cacatúa Ninfa — silba perfectamente, vocaliza con claridad.'},
      {h:'¿Cuánto Tiempo Tarda un Loro en Hablar?',body:'Depende de la especie y el individuo. Los yacos pueden empezar a repetir palabras a los 6–12 meses. Las amazonas entre los 6 meses y el año. El adiestramiento constante acelera mucho el proceso.'},
      {h:'Mitos sobre los Loros Habladores',body:'No todos los loros hablan. El periquito australiano puede hablar pero no siempre lo hace. El eclectus raramente alcanza grandes vocabularios. El conuro del sol es muy ruidoso pero su capacidad de habla es limitada.'},
    ],
    faqs:[
      {q:'¿Qué loro habla mejor?',a:'El loro gris africano es científicamente el loro con mayor capacidad lingüística: puede aprender hasta 1.000 palabras y usarlas en contexto. Las amazonas también son excelentes habladoras con voz muy nítida.'},
      {q:'¿Los machos hablan más que las hembras?',a:'No necesariamente. En la mayoría de especies no hay diferencias significativas de capacidad vocal entre sexos. El individuo y el adiestramiento importan más que el sexo.'},
      {q:'¿Cómo enseño a hablar a mi loro?',a:'La clave es la repetición constante en un ambiente tranquilo, el refuerzo positivo y hablar directamente al loro mirándole a los ojos. La paciencia es fundamental. Los primeros resultados suelen aparecer entre los 6 y 18 meses.'},
    ]
  },
  {
    slug:'loros-grandes',
    title:'Loros Grandes a la Venta en España con CITES 2026',
    desc:'Guacamayos, yacos, cacatúas grandes y amazonas: los loros más grandes disponibles en España con CITES. Qué espacio necesitan, costes reales y dónde comprarlos.',
    h1:'Loros Grandes en España: Guía Completa 2026',
    badge:'🦜 Loros Grandes',
    icon:'🦜',
    intro:'Los loros grandes son las mascotas más imponentes e inteligentes que existen. Sin embargo, requieren un compromiso de espacio, tiempo y economía significativamente mayor que los loros pequeños.',
    sections:[
      {h:'Los Loros Grandes más Populares en España',body:'Los guacamayos (ararauna, escarlata, jacinto) son los más grandes y espectaculares. El loro gris africano (yaco) es mediano-grande pero con una inteligencia excepcional. Las cacatúas blancas y las amazonas grandes también forman parte de este grupo.'},
      {h:'Espacio y Jaula para un Loro Grande',body:'Un guacamayo ararauna necesita una jaula mínima de 90×120×150 cm y varias horas fuera de la jaula cada día. El espacio es la principal limitación para quien quiere un loro grande en un piso.'},
      {h:'Costes de un Loro Grande',body:'El coste inicial puede ir de 2.000€ a 15.000€ (guacamayo jacinto). Los costes anuales (alimentación, veterinario, juguetes, perchas) son considerablemente más altos que en especies pequeñas.'},
    ],
    faqs:[
      {q:'¿Puedo tener un guacamayo en un piso?',a:'Es posible si el piso es amplio, hay tolerancia al ruido y se le dan varias horas diarias de ejercicio fuera de la jaula. Sin embargo, muchos propietarios de piso prefieren especies más silenciosas y manejables.'},
      {q:'¿Cuánto vive un loro grande?',a:'Los guacamayos pueden vivir 60–80 años. El loro gris africano 50–60 años. Son compromisos para toda la vida que deben planificarse con responsabilidad.'},
      {q:'¿Qué loro grande es más tranquilo?',a:'El loro gris africano (yaco) es considerado uno de los loros grandes más tranquilos en cuanto a nivel de ruido, aunque es muy sensible emocionalmente. Las amazonas pueden ser muy vocales especialmente en temporada de celo.'},
    ]
  },
  {
    slug:'loros-pequenos',
    title:'Loros Pequeños: Las Mejores Especies para Piso en España 2026',
    desc:'Los mejores loros pequeños para piso y apartamento en España: cacatúa ninfa, conuro verde, agapornis y periquito. Guía completa con costes y cuidados.',
    h1:'Loros Pequeños: Las Mejores Opciones para Piso 2026',
    badge:'🐦 Loros Pequeños',
    icon:'🐦',
    intro:'Los loros pequeños son la opción perfecta para pisos, personas con presupuesto ajustado o propietarios que buscan una mascota menos exigente. Muchos son tan inteligentes y cariñosos como sus primos grandes.',
    sections:[
      {h:'Los Mejores Loros Pequeños para Piso',body:'1. Cacatúa Ninfa (Cockatiel) — silba, canta, puede hablar. Muy sociable. 2. Conuro Verde (Green Cheek) — juguetón y afectuoso, menos ruidoso que otros conuros. 3. Agapornis Inseparable — pequeño y cariñoso. 4. Periquito Australiano — el loro más popular del mundo, muy asequible.'},
      {h:'Ventajas de los Loros Pequeños',body:'Costes más bajos (alimentación, jaula, veterinario), menos ruido en general, más fáciles de manejar para principiantes y menos dependencia de tiempo que los loros grandes.'},
      {h:'Documentación para Loros Pequeños',body:'Aunque son más pequeños y asequibles, los loros pequeños también requieren anilla de criador y en algunos casos CITES. Exige siempre al criador la documentación completa.'},
    ],
    faqs:[
      {q:'¿Cuál es el loro pequeño más tranquilo?',a:'El conuro verde (green cheek) es uno de los conuros más silenciosos. La cacatúa ninfa también tiene un nivel de ruido moderado comparado con otras psitácidas.'},
      {q:'¿Los loros pequeños son buenos para niños?',a:'La cacatúa ninfa y el periquito son especialmente adecuados para familias con niños. Son más resistentes al manejo que otros loros pequeños y menos propensos a morder.'},
      {q:'¿Cuánto vive un loro pequeño?',a:'La cacatúa ninfa vive 15–20 años. El conuro verde 25–30 años. El agapornis 10–15 años. El periquito 7–15 años. Son compromisos importantes aunque de duración menor que los loros grandes.'},
    ]
  },
  {
    slug:'loros-para-familia',
    title:'Los Mejores Loros para Familias con Niños en España 2026',
    desc:'Cuáles son los loros más seguros y sociables para familias con niños en España. Especies recomendadas, especies a evitar y consejos de convivencia segura.',
    h1:'Loros para Familias con Niños: Guía Completa 2026',
    badge:'👨‍👩‍👧 Loros Familiar',
    icon:'👨‍👩‍👧',
    intro:'No todos los loros son igualmente adecuados para familias con niños. La especie, la crianza y la socialización son factores determinantes para una convivencia segura y enriquecedora.',
    sections:[
      {h:'Las Mejores Especies para Familias',body:'La amazona frente azul es conocida por su carácter extrovertido y tolerancia a ambientes activos. La cacatúa ninfa es una de las opciones más seguras para niños. El loro gris africano puede ser excelente con la familia correcta, aunque es más sensible al caos.'},
      {h:'Especies que Requieren Más Precaución con Niños',body:'Los guacamayos grandes tienen picos muy poderosos que pueden causar lesiones accidentales. Los conuros del sol son muy ruidosos. Las cacatúas blancas son muy cariñosas pero extremadamente demandantes.'},
      {h:'Normas de Convivencia Segura Loro-Niño',body:'Nunca dejar al loro solo con niños muy pequeños. Enseñar a los niños a acercarse al loro con calma. No molestar al loro cuando come o duerme. El loro tiene derecho a su espacio seguro.'},
    ],
    faqs:[
      {q:'¿A partir de qué edad pueden los niños interactuar con el loro?',a:'Con supervisión adulta, los niños de más de 6 años pueden interactuar con loros bien socializados. Con niños más pequeños se recomienda mucha precaución y nunca dejarlos solos.'},
      {q:'¿El loro puede morder a un niño?',a:'Cualquier loro puede morder si se siente amenazado o tiene miedo. Por eso es fundamental enseñar tanto a los niños como a los adultos a respetar los límites del ave.'},
      {q:'¿Cuál es el loro más recomendado para una familia con 2 niños?',a:'La cacatúa ninfa (cockatiel) o la amazona frente azul bien socializada son excelentes opciones. Ambas son tolerantes, sociables y menos propensas a morder que otras especies.'},
    ]
  },
  {
    slug:'loros-apartamento',
    title:'Loros para Piso y Apartamento: Las Mejores Especies 2026',
    desc:'Las mejores especies de loros para vivir en piso o apartamento en España: criterios de ruido, espacio y normativa de comunidades de propietarios. Guía completa.',
    h1:'Loros para Piso y Apartamento en España 2026',
    badge:'🏠 Loros en Piso',
    icon:'🏠',
    intro:'Vivir en un piso no impide tener un loro, pero sí limita las opciones. Hay que tener en cuenta el nivel de ruido, el espacio disponible y la normativa de la comunidad de propietarios.',
    sections:[
      {h:'Factores a Considerar para un Loro en Piso',body:'El ruido es el principal factor limitante. Los guacamayos grandes y los conuros del sol son muy vocales y pueden generar conflictos con vecinos. El espacio determina qué tamaño de jaula y de ave es viable.'},
      {h:'Las Mejores Especies para Piso',body:'Cacatúa Ninfa: nivel de ruido moderado, silba y canta. Conuro Verde: afectuoso, menos ruidoso que otros conuros. Loro Gris Africano: sorprendentemente tranquilo para ser un loro grande. Agapornis: pequeño y manejable.'},
      {h:'Normativa de Comunidades de Propietarios',body:'La Ley de Propiedad Horizontal no prohíbe expressamente los loros. Sin embargo, los estatutos de la comunidad pueden incluir restricciones. Siempre verifica antes de adoptar.'},
    ],
    faqs:[
      {q:'¿Está permitido tener un loro en un piso de alquiler?',a:'Depende del contrato de arrendamiento. Muchos contratos prohíben mascotas. Verifica siempre con el propietario antes de adoptar. La Ley de Arrendamientos Urbanos no lo prohíbe expresamente.'},
      {q:'¿Qué ruido hacen los loros en un piso?',a:'Varía enormemente según la especie. Una cacatúa ninfa o un loro gris africano son relativamente tranquilos. Un conuro del sol o un guacamayo pueden alcanzar 100 decibelios en sus momentos de mayor actividad vocal.'},
      {q:'¿Cómo reduzco el ruido del loro en el piso?',a:'Establecer rutinas claras, cubrir la jaula en los momentos de descanso, no reforzar los gritos con atención y proporcionar suficiente enriquecimiento ambiental son las estrategias más efectivas.'},
    ]
  },
  {
    slug:'loros-lujo',
    title:'Loros de Lujo: Las Especies más Raras y Exclusivas en España 2026',
    desc:'Los loros más raros, exclusivos y costosos disponibles en España: guacamayo jacinto, eclectus, galah y otras especies de alta gama con documentación CITES.',
    h1:'Loros de Lujo: Especies Exclusivas con CITES en España',
    badge:'💎 Alta Gama',
    icon:'💎',
    intro:'Para quienes buscan una psitácida verdaderamente exclusiva, existe un grupo de especies que combinan rareza, belleza y personalidad excepcionales. Estas aves representan el nivel más alto del hobby psitacicultor.',
    sections:[
      {h:'El Guacamayo Jacinto: El Loro más Exclusivo',body:'El Anodorhynchus hyacinthinus es el loro más grande del mundo y uno de los más cotizados. Su precio puede superar los 12.000–15.000€ con documentación CITES de Apéndice I. Su plumaje azul cobalto y sus ojos amarillos lo hacen único.'},
      {h:'Eclectus: El Dimorfismo más Espectacular',body:'El eclectus macho (verde esmeralda y rojo) y la hembra (roja y azul) son tan diferentes entre sí que durante años se pensó que eran especies distintas. Un lor o eclectus es una obra de arte viviente.'},
      {h:'Cacatúa Galah y otras Especies Poco Comunes',body:'La cacatúa galah rosada, los pionus, las amazona nuca amarilla y el guacamayo de Buffon son otras especies que ofrecen exclusividad y rareza para el coleccionista más exigente.'},
    ],
    faqs:[
      {q:'¿Cuánto cuesta un guacamayo jacinto en España?',a:'El guacamayo jacinto es una de las aves más costosas del mercado. Los precios orientativos van desde 8.000€ hasta 15.000€ o más, según disponibilidad. Consulta por correo para conocer disponibilidad actual.'},
      {q:'¿Están disponibles las especies de lujo con CITES?',a:'Sí. Todas nuestras aves se entregan con documentación CITES completa, independientemente de su precio o rareza. La legalidad es innegociable en nuestro criadero.'},
      {q:'¿Qué loro de lujo es más manejable?',a:'El eclectus tiene fama de ser uno de los loros más tranquilos y fáciles de manejar entre las especies de alta gama. El guacamayo jacinto es impresionante pero requiere muchísimo espacio y experiencia previa.'},
    ]
  },
  {
    slug:'loros-raros',
    title:'Loros Raros y Exóticos a la Venta en España con CITES 2026',
    desc:'Especies de loros raras y exóticas disponibles legalmente en España con documentación CITES. Pionus, galah, eclectus, guacamayo de Buffon y más.',
    h1:'Loros Raros y Exóticos con CITES en España 2026',
    badge:'🌟 Especies Raras',
    icon:'🌟',
    intro:'Más allá de las especies más comunes, existe un fascinante mundo de psitácidas raras disponibles legalmente en España con documentación CITES. Estas aves ofrecen características únicas para el amateur exigente.',
    sections:[
      {h:'Qué Hace Rara a una Especie',body:'La rareza en psitacultura viene determinada por la dificultad de reproducción en cautividad, la escasez de ejemplares disponibles en el mercado europeo y la demanda de aficionados especializados.'},
      {h:'Especies Raras Disponibles',body:'Pionus (Pionus menstruus, P. maximiliani), Amazona nuca amarilla (Amazona ochrocephala), Galah (Eolophus roseicapilla), Loro del Senegal (Poicephalus senegalus), Guacamayo de Buffon (Ara ambiguus).'},
      {h:'Consideraciones Legales para Especies Raras',body:'Muchas especies raras están en CITES Apéndice I o II. La documentación es especialmente importante para estas aves, ya que son objetivos frecuentes de inspecciones y verificaciones.'},
    ],
    faqs:[
      {q:'¿Puedo comprar un loro raro de forma legal en España?',a:'Sí, siempre que el ave esté criada en cautividad y tenga toda la documentación CITES en regla. Las aves de criaderos registrados como el nuestro cumplen todos los requisitos legales.'},
      {q:'¿Cómo sé si un loro raro es legal?',a:'El loro debe tener anilla cerrada del criadero, certificado CITES y guía sanitaria. Si el vendedor no puede proporcionar estos documentos, el ave puede ser de origen ilegal.'},
      {q:'¿Tenéis disponibilidad de especies raras?',a:'La disponibilidad varía según la época del año y las crías disponibles en el criadero. Contacta por correo indicando qué especie te interesa y te informaremos de disponibilidad y tiempos de espera.'},
    ]
  },
  {
    slug:'loros-cites',
    title:'Loros con CITES: Qué es, Qué Significa y Por Qué es Obligatorio 2026',
    desc:'Guía completa sobre CITES en loros en España: qué significa, cuáles especies lo necesitan, qué documentos se exigen y por qué es imprescindible para comprar legalmente.',
    h1:'Loros con CITES: Guía Legal Completa 2026',
    badge:'📋 CITES y Legalidad',
    icon:'📋',
    intro:'CITES (Convención sobre el Comercio Internacional de Especies Amenazadas de Fauna y Flora Silvestres) regula el comercio de la mayoría de psitácidas en España y Europa. Entender qué es el CITES es imprescindible para cualquier comprador responsable.',
    sections:[
      {h:'¿Qué es el CITES?',body:'El CITES es un tratado internacional firmado por 183 países que regula el comercio de especies amenazadas. Para los loros, esto se traduce en que la compraventa debe estar respaldada por documentación oficial que acredite que el ave fue criada en cautividad y no extraída de la naturaleza.'},
      {h:'¿Qué Loros Necesitan CITES en España?',body:'La inmensa mayoría de psitácidas disponibles en el mercado español requieren algún tipo de documentación CITES. Los yacos (loros grises africanos) están en Apéndice I (máxima protección). Los guacamayos y la mayoría de loros medianos y grandes están en Apéndice II.'},
      {h:'Qué Documentos Exige el CITES en España',body:'Para el comprador: el vendedor debe entregar el certificado CITES (o en su caso el permiso de uso). Para el criador: el núcleo zoológico debe estar registrado y las crías notificadas a la autoridad CITES española (MITECO).'},
    ],
    faqs:[
      {q:'¿Es obligatorio el CITES para comprar un loro en España?',a:'Depende de la especie. Para yacos, guacamayos y muchas cacatúas, el CITES es obligatorio. Para especies de apéndice III o no incluidas, la normativa es diferente. Siempre exige al criador la documentación completa.'},
      {q:'¿Qué pasa si compro un loro sin CITES?',a:'Poseer un loro CITES sin documentación es un delito en España penado con multas de hasta 200.000€ y posible confiscación del animal. Nunca compres un loro sin exigir la documentación completa.'},
      {q:'¿Cómo verifico que el CITES de mi loro es real?',a:'El certificado CITES tiene un número de registro oficial. Puedes verificarlo consultando con SEPRONA (Guardia Civil) o con la Subdirección General de Medio Natural del MITECO.'},
    ]
  },
];

function generateBuyerIntentPage(p) {
  const canonicalUrl = `${BASE}/${p.slug}`;
  const html = `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="index, follow"/>
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  ${ga()}
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${p.title}"/>
  <meta property="og:description" content="${p.desc}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:image" content="${BASE}/images/loro-gris-01.webp"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  ${breadcrumbSchema([
    {name:'Inicio',url:BASE+'/'},
    {name:p.title,url:canonicalUrl}
  ])}
  ${faqSchema(p.faqs)}
  ${COMMON_HEAD_CSS}
</head>
<body>
${NAV_HTML}
<main>
<section class="hero">
  <div class="wrap">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href="/">Inicio</a> &rsaquo; ${p.h1}
    </nav>
    <span class="badge">${p.badge}</span>
    <h1>${p.h1}</h1>
    <p class="sub">${p.intro}</p>
    <div class="trust-row">
      <span class="trust-item">✓ Criador Registrado</span>
      <span class="trust-item">✓ CITES Incluido</span>
      <span class="trust-item">✓ 25+ Años</span>
      <span class="trust-item">✓ Envío a España</span>
    </div>
  </div>
</section>
<div class="content">
  ${p.sections.map(s => `<h2>${s.h}</h2>\n  <p>${s.body}</p>`).join('\n\n  ')}

  <div class="cta-box">
    <h2>¿Listo para Adoptar?</h2>
    <p>Consulta disponibilidad de aves, condiciones de entrega y precios orientativos en nuestro criadero.</p>
    <a href="mailto:${EMAIL}" class="btn-primary">✉ Consultar por correo</a>
    <a href="/available-birds/" class="btn-ghost">Ver Aves Disponibles</a>
  </div>

  <h2>Preguntas Frecuentes</h2>
  <div class="faq">
    ${p.faqs.map(f => `<details><summary>${f.q}</summary><div class="faq-body"><p>${f.a}</p></div></details>`).join('\n    ')}
  </div>

  <h2>Guías Relacionadas</h2>
  <div class="article-grid">
    <div class="article-card"><h3>Cómo Elegir tu Primer Loro</h3><p>Guía definitiva para encontrar la especie perfecta.</p><a class="read-more" href="/blog/como-elegir-tu-primer-loro">Leer →</a></div>
    <div class="article-card"><h3>Documentación del Loro en España</h3><p>Todos los documentos legales necesarios explicados.</p><a class="read-more" href="/documentos-legales-para-adoptar-un-loro">Leer →</a></div>
    <div class="article-card"><h3>Gastos Iniciales al Comprar un Loro</h3><p>Presupuesto real para el primer año de propietario.</p><a class="read-more" href="/blog/gastos-compra-loro">Leer →</a></div>
    <div class="article-card"><h3>Errores Comunes al Adoptar</h3><p>Los 10 errores más frecuentes y cómo evitarlos.</p><a class="read-more" href="/errores-comunes-al-adoptar-un-loro">Leer →</a></div>
  </div>
</div>
</main>
${FOOTER_HTML}
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;
  return html;
}

BUYER_INTENT.forEach(p => {
  const filePath = `${p.slug}.html`;
  fs.writeFileSync(filePath, generateBuyerIntentPage(p));
  track(`${BASE}/${p.slug}`, '0.85');
  console.log('Generated:', filePath);
});

// ═══════════════════════════════════════════════════════════════════════════
// 5. ACCESSORIES HUBS
// ═══════════════════════════════════════════════════════════════════════════
const ACCESSORIES = [
  {
    slug:'jaulas-loros',
    title:'Jaulas para Loros: Guía Completa de Compra 2026 | paraisodeaves',
    desc:'Guía completa para elegir la jaula perfecta para tu loro: tamaños mínimos por especie, materiales, posición, equipamiento y las mejores marcas disponibles en España.',
    h1:'Jaulas para Loros: Guía Completa 2026',
    badge:'🏠 Equipamiento',
    intro:'La jaula es el elemento más importante del equipamiento de tu loro. Elegir mal la jaula puede arruinar el bienestar del ave. Esta guía te ayuda a acertar desde el primer día.',
    sections:[
      {h:'Tamaños Mínimos de Jaula por Especie',body:`<table><tr><th>Especie</th><th>Ancho mín.</th><th>Fondo mín.</th><th>Alto mín.</th></tr>
<tr><td>Periquito</td><td>60 cm</td><td>40 cm</td><td>60 cm</td></tr>
<tr><td>Agapornis</td><td>60 cm</td><td>40 cm</td><td>60 cm</td></tr>
<tr><td>Cacatúa Ninfa</td><td>80 cm</td><td>50 cm</td><td>80 cm</td></tr>
<tr><td>Conuro</td><td>80 cm</td><td>60 cm</td><td>100 cm</td></tr>
<tr><td>Amazona / Yaco</td><td>90 cm</td><td>70 cm</td><td>120 cm</td></tr>
<tr><td>Guacamayo</td><td>120 cm</td><td>90 cm</td><td>150 cm</td></tr>
</table>`},
      {h:'Materiales: Acero Inoxidable vs Hierro Pintado',body:'El acero inoxidable es el material más seguro y duradero, pero el más costoso. El hierro con pintura epóxica atóxica es una alternativa válida. Evita siempre las pinturas con zinc o plomo, que son tóxicas para las aves.'},
      {h:'Posición Correcta de la Jaula',body:'Coloca la jaula a la altura de los ojos (nunca en el suelo), contra una pared (para que el loro se sienta más seguro), lejos de corrientes de aire y humos de cocina, y donde reciba luz natural sin sol directo.'},
      {h:'Equipamiento Básico de la Jaula',body:'Mínimo: 3 perchas de diferentes diámetros (para ejercitar patas), 2 comederos (pellets + fruta), 1 bebedero, 1 bañera desmontable y 3–5 juguetes rotados semanalmente.'},
    ],
    faqs:[
      {q:'¿Cuánto debo gastar en una jaula para un loro?',a:'Para un loro mediano (yaco, amazona), una jaula de calidad cuesta entre 200€ y 500€. No escatimes en la jaula: es donde tu loro pasará gran parte de su vida.'},
      {q:'¿Las jaulas redondas son buenas para loros?',a:'No. Las jaulas redondas desorientan a los loros y no les dan esquinas donde sentirse seguros. Elige siempre jaulas rectangulares o cuadradas.'},
      {q:'¿Con qué frecuencia debo limpiar la jaula?',a:'Limpieza parcial diaria (bandeja, comederos, bebedero) y limpieza profunda con desinfectante apto para aves cada semana.'},
    ]
  },
  {
    slug:'alimentacion-loros',
    title:'Alimentación para Loros: Guía Completa de Nutrición 2026 | paraisodeaves',
    desc:'Todo sobre la alimentación correcta de los loros en España: pellets, frutas, verduras, semillas y tablas de porcentajes por especie. Guía completa de nutrición aviar.',
    h1:'Alimentación para Loros: Guía Completa de Nutrición 2026',
    badge:'🥦 Nutrición',
    intro:'La nutrición es el factor más determinante para la salud a largo plazo de tu loro. Una dieta incorrecta acorta significativamente la esperanza de vida del ave.',
    sections:[
      {h:'La Dieta Base: Pellets como Fundamento',body:'Los pellets formulados para psitácidas deben constituir el 50–70% de la dieta total. Los pellets garantizan el aporte correcto de vitaminas y minerales sin los desequilibrios de las dietas de semillas.'},
      {h:'Frutas y Verduras: El Complemento Fresco',body:'El 30–40% de la dieta debe ser fruta y verdura fresca. Las mejores opciones: zanahoria, pimiento rojo, boniato, mango, papaya, granada, arándanos y hortalizas de hoja verde (no espinacas).'},
      {h:'Las Semillas: ¿Sí o No?',body:'Las semillas son el equivalente nutricional de la "comida basura" para los loros. Pueden ser un complemento (máximo 10–15% de la dieta) o usarse como recompensa en el adiestramiento, pero nunca como base de la alimentación.'},
      {h:'Alimentos Completamente Prohibidos',body:'Aguacate (mortal), chocolate, cafeína, alcohol, cebolla, ajo, sal en exceso, nuez moscada y cualquier semilla de fruta (manzana, pera, melocotón) que contiene cianuro.'},
    ],
    faqs:[
      {q:'¿Qué pellets son mejores para loros en España?',a:'Harrison\'s Bird Foods y Zupreem son dos de las marcas más recomendadas por veterinarios aviares en España. Elige el tamaño de pellet adecuado para tu especie.'},
      {q:'¿Puedo dar arroz cocido a mi loro?',a:'Sí, el arroz cocido sin sal es perfectamente seguro para los loros y una buena fuente de carbohidratos. También pueden comer legumbres cocidas sin sal.'},
      {q:'¿Con qué frecuencia debo cambiar la comida del loro?',a:'La fruta y verdura fresca debe cambiarse a las 2–3 horas de temperatura ambiente. Los pellets pueden dejarse 24 horas si el comedero es limpio. El bebedero se cambia cada día.'},
    ]
  },
  {
    slug:'suplementos-loros',
    title:'Suplementos para Loros: Guía Completa 2026 | paraisodeaves',
    desc:'Los suplementos vitamínicos y minerales más recomendados para loros en España: cuándo son necesarios, cuáles elegir y cómo administrarlos correctamente.',
    h1:'Suplementos para Loros: Cuándo y Cuáles Usar 2026',
    badge:'💊 Suplementos',
    intro:'Los suplementos para loros son un tema controvertido: algunos son imprescindibles en situaciones específicas, otros son completamente innecesarios si el loro come pellets de calidad.',
    sections:[
      {h:'¿Cuándo Son Necesarios los Suplementos?',body:'Si tu loro come principalmente semillas (dieta deficiente), durante la muda (mayor necesidad de proteína y calcio), en períodos de estrés, tras enfermedades o en aves reproductoras. Con dieta de pellets, los suplementos son raramente necesarios.'},
      {h:'Suplementos más Útiles para Loros',body:'Vitamina A: crucial para loros que comen semillas (déficit frecuente). Calcio: importante para hembras en período reproductor. Probióticos: útiles tras tratamientos antibióticos. Omega-3: beneficioso para la salud del plumaje.'},
      {h:'Cómo Administrar Suplementos',body:'Los suplementos se pueden añadir al agua (líquidos), espolvorear sobre la comida húmeda (polvos) o mezclar con papilla. Nunca superes las dosis recomendadas. El exceso de algunas vitaminas (especialmente la A) puede ser tóxico.'},
    ],
    faqs:[
      {q:'¿Necesita suplementos un loro que come pellets?',a:'En general no. Los pellets formulados contienen todos los nutrientes en las proporciones correctas. Añadir suplementos puede incluso crear desequilibrios. Consulta siempre con el veterinario aviar.'},
      {q:'¿Qué vitamina les falta más a los loros?',a:'La vitamina A es la deficiencia más común en loros que comen principalmente semillas. Los síntomas incluyen problemas respiratorios, lesiones en la piel y plumaje opaco.'},
      {q:'¿Son seguros los suplementos en el agua?',a:'Sí, si se administran en las dosis correctas. Sin embargo, los suplementos en agua se degradan rápidamente y promueven el crecimiento bacteriano. Cambia el agua enriquecida cada pocas horas.'},
    ]
  },
  {
    slug:'transportines-loros',
    title:'Transportines para Loros: Guía de Compra 2026 | paraisodeaves',
    desc:'Guía completa para elegir el transportín correcto para tu loro: cajas IATA, transportines de tela, medidas mínimas por especie y consejos para viajes seguros.',
    h1:'Transportines para Loros: Guía Completa 2026',
    badge:'✈️ Transporte',
    intro:'Un buen transportín es imprescindible para llevar a tu loro al veterinario, de viaje o para cualquier desplazamiento. Elegir el transportín correcto mejora significativamente el bienestar del ave durante el transporte.',
    sections:[
      {h:'Tipos de Transportines para Loros',body:'Caja IATA: obligatoria para transporte aéreo, muy resistente, con ventilación específica. Transportín de plástico rígido: el más versátil y fácil de limpiar. Transportín de tela: solo apto para aves pequeñas y muy tranquilas.'},
      {h:'Medidas Correctas del Transportín',body:'El loro debe poder girarse y apoyar las patas en una percha sin tocar el techo. Para un loro gris africano o una amazona: mínimo 50×35×45 cm. Para un guacamayo ararauna: mínimo 70×50×60 cm.'},
      {h:'Cómo Acostumbrar al Loro al Transportín',body:'Introduce el transportín en el entorno habitual del loro días antes de su uso. Coloca dentro golosinas y deja que el loro entre y salga voluntariamente. Nunca uses el transportín solo para situaciones negativas (veterinario).'},
    ],
    faqs:[
      {q:'¿Qué transportín necesito para volar con mi loro?',a:'Para vuelos comerciales necesitas una caja IATA homologada. Cada aerolínea tiene sus propias normativas, que debes consultar directamente. Además necesitas certificado CITES y certificado sanitario de menos de 10 días.'},
      {q:'¿Puedo llevar al loro en un transportín de perro?',a:'Sí, si el tamaño es adecuado y tiene ventilación suficiente. Sin embargo, los transportines diseñados específicamente para aves suelen ser mejores porque tienen perchas integradas.'},
      {q:'¿Con qué frecuencia debo limpiar el transportín?',a:'Después de cada uso. Los patógenos pueden sobrevivir en las heces durante días. Usa un desinfectante apto para aves y déjalo secar bien antes del siguiente uso.'},
    ]
  },
  {
    slug:'juguetes-naturales-loros',
    title:'Juguetes Naturales para Loros: Guía Completa 2026 | paraisodeaves',
    desc:'Los mejores juguetes naturales para loros: madera, fibra natural, cuero vegetal y palmas. Qué materiales son seguros y cómo estimular la inteligencia de tu loro.',
    h1:'Juguetes Naturales para Loros: Estimulación y Bienestar 2026',
    badge:'🌿 Juguetes Naturales',
    intro:'Los juguetes naturales son los más seguros y enriquecedores para los loros. Fabricados con maderas no tratadas, fibras naturales y elementos comestibles, estimulan el instinto natural de masticar y explorar.',
    sections:[
      {h:'Maderas Seguras para Juguetes de Loro',body:'Maderas seguras: sauce, abedul, manzano, peral, cerezo, balsa. Maderas tóxicas a evitar: cedro, ciprés, fresno de montaña. Nunca uses maderas tratadas con barnices, pinturas o pesticidas.'},
      {h:'Otros Materiales Seguros',body:'Fibra de sisal natural, cuero vegetal (sin tinturas), corteza de palma, plumas naturales (sin colorantes), hojas de palma secas, nudos de algodón natural no teñido.'},
      {h:'Tipos de Juguetes por Función',body:'Juguetes de forrajeo: esconden comida, estimulan la búsqueda activa. Juguetes masticables: esenciales para el desgaste natural del pico. Juguetes de manipulación: desarrollan la destreza motora. Juguetes colgantes: para los que les gusta balancearse.'},
      {h:'Rotación de Juguetes',body:'Los loros se aburren de los mismos juguetes rápidamente. Mantén 5–8 juguetes y rótalos cada semana. Introduce un juguete nuevo poco a poco: algunos loros son desconfiados ante las novedades.'},
    ],
    faqs:[
      {q:'¿Con qué frecuencia debo cambiar los juguetes del loro?',a:'Rota los juguetes cada 7–10 días para mantener el interés. Sustituye inmediatamente cualquier juguete roto o con piezas pequeñas que el loro pueda ingerir.'},
      {q:'¿Son seguros los juguetes de colores para loros?',a:'Solo si los colorantes son atóxicos y aptos para uso con animales. Evita juguetes con pinturas de plomo o zinc. Los juguetes sin colorantes (madera natural) son siempre la opción más segura.'},
      {q:'¿Cuántos juguetes debe tener un loro en su jaula?',a:'Entre 3 y 5 juguetes activos en la jaula, más los que estén en rotación fuera. Demasiados juguetes pueden abrumar a algunos loros. Observa el comportamiento de tu ave para ajustar.'},
    ]
  },
  {
    slug:'perchas-loros',
    title:'Perchas para Loros: Guía Completa de Elección 2026 | paraisodeaves',
    desc:'La guía más completa sobre perchas para loros: tipos, materiales, diámetros correctos por especie y por qué son esenciales para la salud de las patas.',
    h1:'Perchas para Loros: Por Qué son Tan Importantes 2026',
    badge:'🪵 Perchas y Patas',
    intro:'Las perchas son mucho más que un lugar donde posarse. Son esenciales para la salud de las patas, el desgaste natural de las uñas y el bienestar general del loro.',
    sections:[
      {h:'Diámetros Correctos por Especie',body:`<table><tr><th>Especie</th><th>Diámetro recomendado</th></tr>
<tr><td>Periquito / Agapornis</td><td>1,2–1,5 cm</td></tr>
<tr><td>Cacatúa Ninfa / Conuro</td><td>1,5–2,5 cm</td></tr>
<tr><td>Amazona / Yaco</td><td>2,5–4 cm</td></tr>
<tr><td>Guacamayo mediano</td><td>3–5 cm</td></tr>
<tr><td>Guacamayo grande</td><td>5–8 cm</td></tr>
</table>`},
      {h:'Tipos de Perchas y sus Beneficios',body:'Perchas de madera natural: las mejores por la variación de diámetro a lo largo de la rama. Perchas de cuerda de algodón: suaves y muy apreciadas. Perchas de cemento o arena: para desgaste de uñas (no como percha principal). Perchas de PEEK o nylon: durables pero menos naturales.'},
      {h:'Cómo Colocar las Perchas en la Jaula',body:'Coloca perchas a diferentes alturas. Nunca directamente encima del comedero o bebedero (las heces contaminarían la comida). Incluye al menos una percha en la zona más alta de la jaula, donde el loro suele sentirse más seguro.'},
    ],
    faqs:[
      {q:'¿Son las perchas de arena buenas para loros?',a:'Las perchas de arena o cemento pueden usarse como complemento para el desgaste de uñas, pero NO como percha principal. Usadas en exceso irritan las patas y pueden causar pododermatitis.'},
      {q:'¿Puedo usar ramas de árbol del jardín como perchas?',a:'Sí, si son de maderas seguras (manzano, peral, sauce, olivo) y las lavas bien. Evita ramas de plantas potencialmente tóxicas o tratadas con pesticidas.'},
      {q:'¿Con qué frecuencia debo cambiar las perchas?',a:'Las perchas de madera natural que el loro mastica deben reemplazarse cuando están muy desgastadas. Las perchas de cuerda cuando empiezan a deshilacharse. Limpia con agua caliente cada semana.'},
    ]
  },
  {
    slug:'limpieza-loros',
    title:'Productos de Limpieza para Jaulas de Loro: Guía Completa 2026 | paraisodeaves',
    desc:'Los mejores productos de limpieza y desinfección para jaulas de loros en España: seguros para aves, eficaces contra bacterias y hongos. Rutina de limpieza completa.',
    h1:'Limpieza de la Jaula del Loro: Guía Completa 2026',
    badge:'🧹 Higiene',
    intro:'La higiene de la jaula es fundamental para prevenir enfermedades en tu loro. Un loro en una jaula sucia tiene muchas más probabilidades de desarrollar infecciones respiratorias, digestivas y micóticas.',
    sections:[
      {h:'Rutina de Limpieza Diaria',body:'1. Retirar la bandeja y limpiar los excrementos. 2. Cambiar la comida fresca (fruta y verdura). 3. Lavar y llenar el bebedero con agua fresca. 4. Limpiar los comederos. 5. Revisar el estado general de la jaula y los juguetes.'},
      {h:'Limpieza Semanal Profunda',body:'Retirar al loro y todos los accesorios. Limpiar todas las superficies con agua caliente y jabón. Desinfectar con producto apto para aves. Enjuagar bien y dejar secar completamente. Reintroducir al loro solo cuando la jaula esté seca.'},
      {h:'Productos Seguros para Loros',body:'Los productos de limpieza convencionales (lejía, amoníaco, alcohol) son tóxicos para los loros si quedan residuos. Usa desinfectantes específicos para aves o solución de vinagre blanco diluido (1:10 con agua) que es segura y eficaz para la limpieza diaria.'},
    ],
    faqs:[
      {q:'¿Puedo usar lejía para limpiar la jaula del loro?',a:'Solo en limpieza profunda con la jaula completamente vacía y enjuagando muy bien después. La lejía al 1% en agua es efectiva pero deja residuos que son tóxicos para las aves. Siempre enjuaga abundantemente.'},
      {q:'¿Con qué frecuencia debo desinfectar la jaula?',a:'Limpieza básica diaria, limpieza con jabón semanal y desinfección profunda mensual (o antes si el loro ha estado enfermo).'},
      {q:'¿El vinagre es seguro para limpiar la jaula del loro?',a:'Sí. El vinagre blanco diluido (1 parte vinagre: 10 partes agua) es un desinfectante suave, eficaz contra bacterias y hongos básicos, y completamente seguro para los loros una vez evaporado.'},
    ]
  },
  {
    slug:'salud-loros',
    title:'Productos de Salud para Loros: Botiquín Básico 2026 | paraisodeaves',
    desc:'Los productos de salud imprescindibles para tener en el botiquín de tu loro: qué tener siempre en casa, cuándo acudir al veterinario y primeros auxilios para aves.',
    h1:'Botiquín de Salud para Loros: Qué Necesitas en Casa 2026',
    badge:'🏥 Salud y Botiquín',
    intro:'Tener un botiquín básico para tu loro puede marcar la diferencia en una emergencia. Sin embargo, nunca sustituye a la atención veterinaria profesional de un especialista en aves exóticas.',
    sections:[
      {h:'Contenido del Botiquín Básico del Loro',body:'1. Solución salina estéril (para limpiar heridas). 2. Gasas estériles. 3. Cinta médica sin adhesivo tóxico. 4. Tijeras pequeñas de punta roma. 5. Harina de maíz o maicena (para hemorragias de uñas/plumas). 6. Jeringa pequeña (para medicación oral). 7. Termómetro (para controlar la temperatura del loro). 8. Transportín de emergencia.'},
      {h:'Señales de Emergencia Veterinaria',body:'Acude inmediatamente al veterinario si el loro: está en el suelo sin poder volar, tiene plumas erizadas y ojos entrecerrados con apatía, sangra de forma continua, tiene secreción nasal o ocular, respira con el pico abierto o hace ruidos al respirar, no ha comido en más de 24 horas.'},
      {h:'Qué NO Hacer en una Emergencia Veterinaria',body:'No medicarnos con antibióticos humanos. No aplicar productos de herbolario sin consultar. No forzar al loro a comer o beber. No bañar a un loro debilitado. No dejar al loro con corrientes de aire.'},
    ],
    faqs:[
      {q:'¿Con qué frecuencia debe ir el loro al veterinario?',a:'Mínimo una revisión anual completa (incluye análisis de heces y sangre). En aves de más de 10 años, dos revisiones anuales. Y siempre que notes cambios de comportamiento, pérdida de apetito o signos físicos.'},
      {q:'¿Cómo encuentro un veterinario especializado en aves en España?',a:'La AVEPA (Asociación de Veterinarios Especialistas en Animales Exóticos) tiene un directorio en su web. Busca siempre un especialista en aviar o en animales exóticos, no un veterinario de perros y gatos sin experiencia en aves.'},
      {q:'¿Qué temperatura es de emergencia para un loro?',a:'Si la temperatura corporal del loro cae por debajo de 36°C o supera los 43°C, es una emergencia veterinaria. Un loro que tiembla o jadea con calor necesita atención inmediata.'},
    ]
  }
];

function generateAccessoryHub(p) {
  const canonicalUrl = `${BASE}/${p.slug}`;
  const html = `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="index, follow"/>
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  ${ga()}
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${p.title}"/>
  <meta property="og:description" content="${p.desc}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:image" content="${BASE}/images/loro-gris-01.webp"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  ${breadcrumbSchema([
    {name:'Inicio',url:BASE+'/'},
    {name:p.h1,url:canonicalUrl}
  ])}
  ${faqSchema(p.faqs)}
  ${COMMON_HEAD_CSS}
</head>
<body>
${NAV_HTML}
<main>
<section class="hero">
  <div class="wrap">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href="/">Inicio</a> &rsaquo; ${p.h1}
    </nav>
    <span class="badge">${p.badge}</span>
    <h1>${p.h1}</h1>
    <p class="sub">${p.intro}</p>
  </div>
</section>
<div class="content">
  ${p.sections.map(s => `<h2>${s.h}</h2>\n  ${s.body.includes('<table>') ? s.body : '<p>'+s.body+'</p>'}`).join('\n\n  ')}

  <div class="cta-box">
    <h2>¿Tienes Dudas sobre Equipamiento?</h2>
    <p>Pregúntanos por correo. Más de 25 años de experiencia criando loros nos avalan para asesorarte en la elección del equipamiento correcto.</p>
    <a href="mailto:${EMAIL}" class="btn-primary">✉ Consultar por correo</a>
    <a href="/available-birds/" class="btn-ghost">Ver Aves Disponibles</a>
  </div>

  <h2>Preguntas Frecuentes</h2>
  <div class="faq">
    ${p.faqs.map(f => `<details><summary>${f.q}</summary><div class="faq-body"><p>${f.a}</p></div></details>`).join('\n    ')}
  </div>

  <h2>Más Guías de Cuidados</h2>
  <div class="article-grid">
    <div class="article-card"><h3>Cuidados Diarios del Loro</h3><p>Rutina completa de cuidados y checklist diario.</p><a class="read-more" href="/cuidados-basicos-de-un-loro">Leer →</a></div>
    <div class="article-card"><h3>Alimentación Correcta</h3><p>Guía definitiva de nutrición para loros.</p><a class="read-more" href="/blog/guia-alimentacion-loros">Leer →</a></div>
    <div class="article-card"><h3>Gastos Reales de Tener un Loro</h3><p>Desglose mensual y anual de todos los costes.</p><a class="read-more" href="/cuanto-cuesta-mantener-un-loro">Leer →</a></div>
  </div>
</div>
</main>
${FOOTER_HTML}
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;
  return html;
}

// Only create if doesn't exist (some may be placeholders)
ACCESSORIES.forEach(p => {
  const filePath = `${p.slug}.html`;
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing.length > 3000) {
      console.log('Skip (full page exists):', filePath);
      return;
    }
  }
  fs.writeFileSync(filePath, generateAccessoryHub(p));
  track(`${BASE}/${p.slug}`, '0.80');
  console.log('Generated:', filePath);
});

// ═══════════════════════════════════════════════════════════════════════════
// 6. IMAGE GALLERY HUBS
// ═══════════════════════════════════════════════════════════════════════════
const GALLERIES = [
  {slug:'galerias', dir:true, filename:'index.html', title:'Galerías de Fotos de Loros | paraisodeaves', desc:'Galería de fotos del criadero paraisodeaves: loros bebé, guacamayos, yacos, cacatúas, amazonas, instalaciones y proceso de envío.', h1:'Galerías de Fotos — Loros y Criadero', galleries:[
    {emoji:'🐣', name:'Loros Bebé', href:'/galerias/loros-bebe', desc:'Fotos de crías de loros recién nacidos y bebés en proceso de destete'},
    {emoji:'🦜', name:'Guacamayos', href:'/galerias/guacamayos', desc:'Galería de guacamayos ararauna, escarlata y jacinto del criadero'},
    {emoji:'🦅', name:'Loro Gris Africano', href:'/galerias/loro-gris', desc:'Fotos de yacos (loros grises africanos) del criadero'},
    {emoji:'🤍', name:'Cacatúas', href:'/galerias/cacatuas', desc:'Cacatúas alba, galah y ninfas del criadero'},
    {emoji:'💚', name:'Amazonas', href:'/galerias/amazonas', desc:'Loros amazónicos: frente azul, real y otras subspecies'},
    {emoji:'🏡', name:'Instalaciones', href:'/galerias/criadero', desc:'Fotos del criadero y las instalaciones de paraisodeaves en Llíria'},
    {emoji:'📦', name:'Proceso de Envío', href:'/galerias/envio-aves', desc:'Cómo enviamos las aves: cajas IATA, preparación y embalaje'},
    {emoji:'🥦', name:'Alimentación', href:'/galerias/alimentacion', desc:'La dieta de nuestros loros: pellets, frutas y verduras'},
    {emoji:'🪵', name:'Accesorios', href:'/galerias/accesorios', desc:'Jaulas, perchas y juguetes recomendados'},
  ]},
];

const galleryItems = [
  {slug:'loros-bebe', title:'Fotos de Loros Bebé | Galería del Criadero | paraisodeaves', h1:'Galería: Loros Bebé', desc:'Fotos de loros bebé criados a mano en paraisodeaves: crías recién nacidas, proceso de papillado y destete.', emoji:'🐣', parent:'Galerías'},
  {slug:'guacamayos', title:'Fotos de Guacamayos | Galería | paraisodeaves', h1:'Galería: Guacamayos', desc:'Galería de fotos de guacamayos ararauna, escarlata y jacinto del criadero paraisodeaves en Llíria.', emoji:'🦜', parent:'Galerías'},
  {slug:'loro-gris', title:'Fotos de Loro Gris Africano (Yaco) | Galería | paraisodeaves', h1:'Galería: Loro Gris Africano', desc:'Fotos de loros grises africanos (yacos) del criadero paraisodeaves: adultos, bebés y en interacción.', emoji:'🦅', parent:'Galerías'},
  {slug:'cacatuas', title:'Fotos de Cacatúas | Galería | paraisodeaves', h1:'Galería: Cacatúas', desc:'Galería de fotos de cacatúas del criadero: alba, galah, ninfa y otras especies.', emoji:'🤍', parent:'Galerías'},
  {slug:'amazonas', title:'Fotos de Amazonas | Galería | paraisodeaves', h1:'Galería: Loros Amazónicos', desc:'Galería de fotos de loros amazónicos del criadero: frente azul, real y otras subspecies.', emoji:'💚', parent:'Galerías'},
  {slug:'criadero', title:'Fotos del Criadero | Instalaciones | paraisodeaves', h1:'Galería: Instalaciones del Criadero', desc:'Fotos del criadero paraisodeaves en Llíria (Valencia): instalaciones, aviarios, sala de cría y equipamiento.', emoji:'🏡', parent:'Galerías'},
  {slug:'envio-aves', title:'Proceso de Envío de Aves | Galería | paraisodeaves', h1:'Galería: Proceso de Envío', desc:'Cómo enviamos las aves: preparación, cajas IATA, documentación y proceso de entrega en paraisodeaves.', emoji:'📦', parent:'Galerías'},
  {slug:'alimentacion', title:'Alimentación de Loros | Galería | paraisodeaves', h1:'Galería: Alimentación de Nuestros Loros', desc:'Fotos de la alimentación del criadero: pellets, frutas, verduras y papilla para bebés.', emoji:'🥦', parent:'Galerías'},
  {slug:'accesorios', title:'Accesorios para Loros | Galería | paraisodeaves', h1:'Galería: Accesorios y Equipamiento', desc:'Jaulas, perchas y juguetes recomendados para loros en España.', emoji:'🪵', parent:'Galerías'},
];

// Create galerias directory
if (!fs.existsSync('galerias')) fs.mkdirSync('galerias', {recursive:true});

// Gallery index
function generateGalleryIndex(g) {
  const html = `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="index, follow"/>
  <title>${g.title}</title>
  <meta name="description" content="${g.desc}"/>
  <link rel="canonical" href="${BASE}/galerias/"/>
  ${ga()}
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${g.title}"/>
  <meta property="og:description" content="${g.desc}"/>
  <meta property="og:url" content="${BASE}/galerias/"/>
  <meta property="og:image" content="${BASE}/images/loro-gris-01.webp"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  ${breadcrumbSchema([{name:'Inicio',url:BASE+'/'},{name:'Galerías',url:BASE+'/galerias/'}])}
  ${COMMON_HEAD_CSS}
</head>
<body>
${NAV_HTML}
<main>
<section class="hero">
  <div class="wrap">
    <nav class="breadcrumb-nav"><a href="/">Inicio</a> &rsaquo; Galerías</nav>
    <span class="badge">📸 Galería de Fotos</span>
    <h1>${g.h1}</h1>
    <p class="sub">Explora las galerías de fotos del criadero paraisodeaves: nuestras aves, instalaciones y el cuidado que ponemos en cada aspecto de la cría.</p>
  </div>
</section>
<div class="content">
  <h2>Todas las Galerías</h2>
  <div class="gallery-grid">
    ${g.galleries.map(gal => `<div class="gallery-card">
      <div class="gallery-placeholder">${gal.emoji}</div>
      <div class="gallery-info">
        <h3><a href="${gal.href}" style="color:var(--primary)">${gal.name}</a></h3>
        <p>${gal.desc}</p>
      </div>
    </div>`).join('\n    ')}
  </div>

  <div class="cta-box" style="margin-top:2.5rem">
    <h2>¿Quieres Ver Más?</h2>
    <p>Consulta disponibilidad de aves y recibe fotos actualizadas directamente de las crías disponibles.</p>
    <a href="mailto:${EMAIL}" class="btn-primary">✉ Solicitar fotos por correo</a>
    <a href="/available-birds/" class="btn-ghost">Aves Disponibles</a>
  </div>
</div>
</main>
${FOOTER_HTML}
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;
  return html;
}

fs.writeFileSync('galerias/index.html', generateGalleryIndex(GALLERIES[0]));
track(`${BASE}/galerias/`, '0.70');
console.log('Generated: galerias/index.html');

// Individual gallery pages
galleryItems.forEach(g => {
  const filePath = `galerias/${g.slug}.html`;
  const canonicalUrl = `${BASE}/galerias/${g.slug}`;
  const html = `<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="index, follow"/>
  <title>${g.title}</title>
  <meta name="description" content="${g.desc}"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  ${ga()}
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${g.title}"/>
  <meta property="og:description" content="${g.desc}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:image" content="${BASE}/images/loro-gris-01.webp"/>
  <link rel="icon" href="/favicon.ico"/>
  ${fonts()}
  ${breadcrumbSchema([{name:'Inicio',url:BASE+'/'},{name:'Galerías',url:BASE+'/galerias/'},{name:g.h1,url:canonicalUrl}])}
  ${COMMON_HEAD_CSS}
</head>
<body>
${NAV_HTML}
<main>
<section class="hero">
  <div class="wrap">
    <nav class="breadcrumb-nav"><a href="/">Inicio</a> &rsaquo; <a href="/galerias/">Galerías</a> &rsaquo; ${g.h1}</nav>
    <span class="badge">📸 ${g.parent}</span>
    <h1>${g.h1}</h1>
    <p class="sub">${g.desc}</p>
  </div>
</section>
<div class="content">
  <h2>Galería de Imágenes</h2>
  <p>Las siguientes imágenes pertenecen al criadero paraisodeaves en Llíria (Valencia, España). Todas las aves han sido criadas a mano con documentación CITES.</p>
  <div class="gallery-grid">
    ${[1,2,3,4,5,6].map(i => `<div class="gallery-card">
      <div class="gallery-placeholder" style="font-size:4rem">${g.emoji}</div>
      <div class="gallery-info">
        <h3>${g.h1} ${i}</h3>
        <p>Fotografía del criadero paraisodeaves</p>
      </div>
    </div>`).join('\n    ')}
  </div>
  <p style="font-size:.85rem;color:var(--muted);margin-top:1rem"><em>Próximamente: galería fotográfica completa. Para solicitar fotos actualizadas de las aves disponibles, contacta por correo.</em></p>
  <div class="cta-box">
    <h2>¿Te Interesa una de Estas Aves?</h2>
    <p>Consulta disponibilidad actual y recibe fotos y vídeos de las crías disponibles directamente en tu correo.</p>
    <a href="mailto:${EMAIL}" class="btn-primary">✉ Solicitar información</a>
    <a href="/available-birds/" class="btn-ghost">Aves Disponibles</a>
  </div>
  <h2>Otras Galerías</h2>
  <div class="city-links">
    <a href="/galerias/loros-bebe">Loros Bebé</a>
    <a href="/galerias/guacamayos">Guacamayos</a>
    <a href="/galerias/loro-gris">Loro Gris</a>
    <a href="/galerias/cacatuas">Cacatúas</a>
    <a href="/galerias/amazonas">Amazonas</a>
    <a href="/galerias/criadero">Criadero</a>
    <a href="/galerias/">Ver todas →</a>
  </div>
</div>
</main>
${FOOTER_HTML}
<script src="/lang-switcher.js" defer></script>
</body>
</html>`;
  fs.writeFileSync(filePath, html);
  track(canonicalUrl, '0.65');
  console.log('Generated:', filePath);
});

// ═══════════════════════════════════════════════════════════════════════════
// 7. UPDATE sitemap.xml + _redirects FOR ALL PHASE 6 PAGES
// ═══════════════════════════════════════════════════════════════════════════
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const sitemapBlock = generated.map(p =>
  `  <url><loc>${p.url}</loc><lastmod>${TODAY}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
).join('\n');
sitemap = sitemap.replace('</urlset>', `${sitemapBlock}\n</urlset>`);
fs.writeFileSync('sitemap.xml', sitemap);
console.log(`sitemap.xml: +${generated.length} Phase 6 entries`);

let redirects = fs.readFileSync('_redirects', 'utf8');
const redirectBlock = `
# ══════════════════════════════════════════════════════
# SECTION 20 — PHASE 6 CITY + INTENT + ACCESSORIES + GALLERIES
# ══════════════════════════════════════════════════════
# ES missing cities
/ciudades/comprar-loros-leon        /ciudades/comprar-loros-leon.html       200
/ciudades/comprar-loros-tarragona   /ciudades/comprar-loros-tarragona.html  200

# FR Dijon
/fr/perroquets-a-vendre-dijon       /fr/perroquets-a-vendre-dijon/index.html  200

# Species×City
${SPECIES_CITIES.filter(p => !fs.existsSync(`ciudades/${p.slug}.html`) === false).map(p => `/ciudades/${p.slug}   /ciudades/${p.slug}.html   200`).join('\n')}

# Buyer intent pages
${BUYER_INTENT.map(p => `/${p.slug}   /${p.slug}.html   200`).join('\n')}

# Accessories hubs
${ACCESSORIES.map(p => `/${p.slug}   /${p.slug}.html   200`).join('\n')}

# Gallery hubs
/galerias   /galerias/index.html   200
${galleryItems.map(g => `/galerias/${g.slug}   /galerias/${g.slug}.html   200`).join('\n')}
`;
redirects += redirectBlock;
fs.writeFileSync('_redirects', redirects);
console.log(`_redirects: +Phase 6 rules`);

console.log(`\n✅ Phase 6 DONE. Generated ${generated.length} new pages.`);
console.log('Tracked pages:');
generated.forEach(p => console.log(' ', p.url));
