#!/usr/bin/env node
/**
 * generate-bird-profiles.js
 *
 * Reads data/birds.json and:
 *  1. Creates /es/aves/{slug}/index.html for each bird (full profile page)
 *  2. Updates /es/especies/{speciesSlug}/index.html to inject "Aves disponibles" section
 *  3. Updates sitemap_es_especies.xml with bird URLs
 *
 * Re-run whenever birds.json changes (add, update, mark as sold).
 */

const fs   = require('fs');
const path = require('path');

const BIRDS   = JSON.parse(fs.readFileSync('data/birds.json', 'utf8'));
const SITE    = 'https://www.paraisodeaves.com';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ageLabel(months) {
  if (months < 12) return `${months} meses`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y} año${y>1?'s':''} y ${m} meses` : `${y} año${y>1?'s':''}`;
}

function statusLabel(status) {
  if (status === 'available') return { text: 'Disponible',  cls: 'inv-available' };
  if (status === 'reserved')  return { text: 'Reservado',   cls: 'inv-reserved' };
  return                             { text: 'Vendido',      cls: 'inv-sold' };
}

// ─── Bird profile page ────────────────────────────────────────────────────────
function makeBirdPage(bird) {
  const st = statusLabel(bird.status);
  const isAvailable = bird.status === 'available';

  const mainPhoto = bird.photos[0];
  const thumbs = bird.photos.slice(0, 10);

  const thumbHTML = thumbs.map((p, i) => `
          <button class="gal-thumb${i===0?' active':''}" data-full="${p}" aria-label="Foto ${i+1} de ${bird.name}">
            <img src="${p}" alt="${bird.name} foto ${i+1}" width="80" height="60" loading="${i===0?'eager':'lazy'}">
          </button>`).join('');

  // Related birds (same species, different slug, available)
  const related = BIRDS.filter(b => b.speciesSlug === bird.speciesSlug && b.slug !== bird.slug && b.status === 'available').slice(0, 3);
  const relatedHTML = related.length ? related.map(b => `
        <a class="rel-bird-card" href="/es/aves/${b.slug}/">
          <div class="rel-bird-img"><img src="${b.photos[0]}" alt="${b.name}" width="120" height="90" loading="lazy"></div>
          <div class="rel-bird-body">
            <p class="rel-bird-species">${b.speciesName}</p>
            <h4>${b.name}</h4>
            <p class="rel-bird-meta">${b.sex} · ${ageLabel(b.ageMonths)}</p>
          </div>
        </a>`).join('') : '<p style="color:var(--muted);font-size:.9rem">No hay más ejemplares disponibles en este momento.</p>';

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${bird.name} — ${bird.speciesName}`,
    description: bird.personality,
    image: bird.photos.map(p => `${SITE}${p}`),
    brand: { '@type': 'Brand', name: 'Paraíso de Aves' },
    offers: {
      '@type': 'Offer',
      availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE}/es/aves/${bird.slug}/`,
      priceCurrency: 'EUR',
      seller: { '@type': 'Organization', name: 'Paraíso de Aves' }
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio',    item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Especies',  item: `${SITE}/es/especies/` },
      { '@type': 'ListItem', position: 3, name: bird.speciesName, item: `${SITE}/es/especies/${bird.speciesSlug}/` },
      { '@type': 'ListItem', position: 4, name: bird.name,   item: `${SITE}/es/aves/${bird.slug}/` },
    ]
  };

  const seoTitle = `${bird.name} — ${bird.speciesName} | Paraíso de Aves`;
  const seoDesc  = `${bird.name}, ${bird.sex.toLowerCase()}, ${ageLabel(bird.ageMonths)}, criado a mano. ${bird.speciesName} (${bird.latinName}) con CITES. ${bird.status === 'available' ? 'Disponible ahora' : 'Ver perfil'}. Paraíso de Aves, Llíria.`;

  return `<!DOCTYPE html>
<html lang="es-ES" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
  <title>${seoTitle}</title>
  <meta name="description" content="${seoDesc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${SITE}/es/aves/${bird.slug}/"/>
  <meta property="og:type" content="product"/>
  <meta property="og:locale" content="es_ES"/>
  <meta property="og:title" content="${seoTitle}"/>
  <meta property="og:description" content="${seoDesc}"/>
  <meta property="og:url" content="${SITE}/es/aves/${bird.slug}/"/>
  <meta property="og:image" content="${SITE}${mainPhoto}"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${seoTitle}"/>
  <meta name="twitter:description" content="${seoDesc}"/>
  <meta name="twitter:image" content="${SITE}${mainPhoto}"/>
  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"/></noscript>
  <style>
  :root{--primary:#1B3D2F;--secondary:#2B533C;--gold:#C9A24B;--bg:#F8F5ED;--surface:#fff;--border:#E7E0D2;--text:#2B2B2B;--muted:#5C5C5C;--shadow:0 4px 24px rgba(0,0,0,.09)}
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;padding-top:64px}
  h1,h2,h3,h4{font-family:'Playfair Display',serif;line-height:1.25}
  a{color:var(--primary);text-decoration:none}
  a:hover{color:var(--gold)}
  img{max-width:100%;height:auto;display:block}
  /* Header */
  .site-header{position:fixed;top:0;width:100%;z-index:1000;background:var(--primary);border-bottom:2px solid var(--gold);padding:0 5%}
  .header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px}
  .brand-name{font-family:'Playfair Display',serif;font-weight:900;font-size:1.05rem;color:#fff}
  .main-nav{display:flex;gap:1.4rem}
  .main-nav a{color:rgba(255,255,255,.9);font-weight:600;font-size:.88rem;text-decoration:none;transition:color .2s}
  .main-nav a:hover{color:var(--gold)}
  .nav-ham{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:6px 0}
  .nav-ham span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .25s,opacity .25s}
  @media(max-width:720px){.nav-ham{display:flex}.main-nav{display:none}}
  .nav-mob{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999;opacity:0;pointer-events:none;transition:opacity .25s}
  .nav-mob.open{opacity:1;pointer-events:auto}
  .nav-mob-inner{position:absolute;top:64px;left:0;right:0;background:var(--primary);padding:1.2rem 5%;display:flex;flex-direction:column;gap:.8rem}
  .nav-mob-inner a{color:#fff;font-weight:600;padding:.4rem 0;border-bottom:1px solid rgba(255,255,255,.08);text-decoration:none}
  /* Breadcrumb */
  .breadcrumb{background:#fff;border-bottom:1px solid var(--border);padding:.6rem 5%}
  .breadcrumb ol{list-style:none;display:flex;flex-wrap:wrap;gap:.3rem;max-width:1200px;margin:0 auto;font-size:.82rem;color:var(--muted)}
  .breadcrumb li:not(:last-child)::after{content:' /';margin-left:.3rem}
  .breadcrumb a{color:var(--primary)}
  .breadcrumb a:hover{color:var(--gold)}
  /* Status badge */
  .inv-available{background:#d4f1e0;color:#155724;border:1px solid #a3d9b5}
  .inv-reserved{background:#fff3cd;color:#856404;border:1px solid #ffe69c}
  .inv-sold{background:#f8d7da;color:#842029;border:1px solid #f5c2c7}
  .status-pill{display:inline-flex;align-items:center;gap:.4rem;padding:.35rem 1rem;border-radius:999px;font-size:.8rem;font-weight:700}
  .status-dot{width:7px;height:7px;border-radius:50%;background:currentColor}
  /* Main layout */
  .bird-main{max-width:1200px;margin:0 auto;padding:2.5rem 5%;display:grid;grid-template-columns:1fr 380px;gap:3rem;align-items:start}
  @media(max-width:900px){.bird-main{grid-template-columns:1fr;padding:1.5rem 5%}}
  /* Gallery */
  .gallery{margin-bottom:2rem}
  .gal-main{position:relative;border-radius:18px;overflow:hidden;background:#000;aspect-ratio:4/3;margin-bottom:.8rem;cursor:zoom-in}
  .gal-main img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}
  .gal-main img:hover{transform:scale(1.04)}
  .gal-count{position:absolute;top:.8rem;right:.8rem;background:rgba(0,0,0,.55);color:#fff;font-size:.75rem;font-weight:700;padding:.3rem .75rem;border-radius:999px;backdrop-filter:blur(4px)}
  .gal-thumbs{display:flex;gap:.5rem;flex-wrap:wrap}
  .gal-thumb{border:2px solid transparent;border-radius:8px;overflow:hidden;cursor:pointer;background:none;padding:0;transition:border-color .2s;flex-shrink:0}
  .gal-thumb img{width:72px;height:54px;object-fit:cover}
  .gal-thumb.active{border-color:var(--gold)}
  .gal-thumb:hover{border-color:rgba(201,162,75,.5)}
  /* Lightbox */
  .lightbox{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:2000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .25s}
  .lightbox.open{opacity:1;pointer-events:auto}
  .lightbox-img{max-width:92vw;max-height:88vh;border-radius:8px;object-fit:contain}
  .lightbox-close{position:absolute;top:1.2rem;right:1.5rem;color:#fff;font-size:2rem;cursor:pointer;background:none;border:none;line-height:1}
  .lightbox-close:hover{color:var(--gold)}
  .lightbox-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.12);border:none;color:#fff;font-size:1.8rem;padding:.4rem .8rem;border-radius:8px;cursor:pointer;transition:background .2s}
  .lightbox-nav:hover{background:rgba(255,255,255,.25)}
  .lightbox-prev{left:1rem}
  .lightbox-next{right:1rem}
  /* Info card (sidebar) */
  .info-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:1.6rem;box-shadow:var(--shadow);position:sticky;top:80px}
  .info-card h1{font-size:1.7rem;color:var(--primary);margin-bottom:.3rem}
  .info-card .species-label{color:var(--muted);font-size:.9rem;margin-bottom:1rem}
  .info-table{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.9rem}
  .info-table tr:not(:last-child) td{border-bottom:1px solid var(--border)}
  .info-table td{padding:.55rem .4rem}
  .info-table td:first-child{color:var(--muted);font-weight:600;width:42%;font-size:.82rem;text-transform:uppercase;letter-spacing:.04em}
  .info-table td:last-child{font-weight:700;color:var(--text)}
  .price-row{margin:1.2rem 0;text-align:center;padding:1rem;background:var(--bg);border-radius:12px;border:1px solid var(--border)}
  .price-label{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.25rem}
  .price-val{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:800;color:var(--primary)}
  .cta-inquire{display:block;width:100%;background:linear-gradient(135deg,var(--gold),#A8873A);color:#fff;font-weight:800;padding:1rem;border-radius:12px;text-align:center;font-size:1rem;text-decoration:none;transition:opacity .2s,transform .2s;margin-bottom:.7rem}
  .cta-inquire:hover{opacity:.88;transform:translateY(-2px);color:#fff;text-decoration:none}
  /* Sections */
  .bird-section{margin-bottom:2.2rem}
  .bird-section h2{font-size:1.3rem;color:var(--primary);margin-bottom:.8rem;padding-bottom:.4rem;border-bottom:2px solid var(--gold);display:inline-block}
  .bird-section p{color:var(--muted);line-height:1.8;margin-bottom:.6rem}
  .bird-section a{color:var(--primary);text-decoration:underline}
  .trait-pills{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.8rem}
  .trait-pill{background:rgba(27,61,47,.08);border:1px solid rgba(27,61,47,.15);color:var(--primary);font-size:.78rem;font-weight:600;padding:.3rem .85rem;border-radius:999px}
  /* Related birds */
  .rel-birds-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
  @media(max-width:600px){.rel-birds-grid{grid-template-columns:1fr}}
  .rel-bird-card{display:flex;flex-direction:column;background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;text-decoration:none;transition:box-shadow .2s,transform .2s;color:var(--text)}
  .rel-bird-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.1);transform:translateY(-3px);text-decoration:none}
  .rel-bird-img img{width:100%;height:90px;object-fit:cover}
  .rel-bird-body{padding:.8rem}
  .rel-bird-species{font-size:.72rem;color:var(--muted);text-transform:uppercase;font-weight:700;margin-bottom:.2rem}
  .rel-bird-body h4{font-size:.95rem;color:var(--primary);margin-bottom:.2rem}
  .rel-bird-meta{font-size:.78rem;color:var(--muted)}
  /* Sold overlay */
  .sold-overlay{background:#f8d7da;border:1px solid #f5c2c7;border-radius:12px;padding:1rem;text-align:center;margin:.8rem 0;font-size:.9rem;color:#842029;font-weight:600}
  /* Footer */
  footer{background:var(--primary);color:#fff;padding:2rem 5%;text-align:center;font-size:.88rem;margin-top:4rem}
  footer a{color:var(--gold)}
  footer a:hover{color:#fff}
  </style>
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" style="text-decoration:none"><span class="brand-name">Paraíso de Aves</span></a>
      <nav class="main-nav" aria-label="Navegación principal">
        <a href="/">Inicio</a>
        <a href="/es/especies/">Especies</a>
        <a href="/aves-disponibles/">Aves Disponibles</a>
        <a href="/conocimiento/">Conocimiento</a>
        <a href="/blog/">Blog</a>
        <a href="/#contacto">Contacto</a>
      </nav>
      <button class="nav-ham" aria-label="Menú" aria-expanded="false"
        onclick="this.classList.toggle('is-open');document.querySelector('.nav-mob').classList.toggle('open');this.setAttribute('aria-expanded',this.classList.contains('is-open'))">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="nav-mob" onclick="this.classList.remove('open');document.querySelector('.nav-ham').classList.remove('is-open')">
    <nav class="nav-mob-inner">
      <a href="/">Inicio</a><a href="/es/especies/">Especies</a>
      <a href="/aves-disponibles/">Aves Disponibles</a><a href="/conocimiento/">Conocimiento</a>
      <a href="/blog/">Blog</a><a href="/#contacto">Contacto</a>
    </nav>
  </div>

  <nav class="breadcrumb" aria-label="Ruta de navegación">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/" itemprop="item"><span itemprop="name">Inicio</span></a><meta itemprop="position" content="1"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/es/especies/" itemprop="item"><span itemprop="name">Especies</span></a><meta itemprop="position" content="2"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/es/especies/${bird.speciesSlug}/" itemprop="item"><span itemprop="name">${bird.speciesName}</span></a><meta itemprop="position" content="3"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">${bird.name}</span><meta itemprop="position" content="4"/>
      </li>
    </ol>
  </nav>

  <!-- Lightbox -->
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Galería de fotos de ${bird.name}">
    <button class="lightbox-close" id="lb-close" aria-label="Cerrar galería">✕</button>
    <button class="lightbox-nav lightbox-prev" id="lb-prev" aria-label="Foto anterior">‹</button>
    <img class="lightbox-img" id="lb-img" src="" alt="${bird.name}">
    <button class="lightbox-nav lightbox-next" id="lb-next" aria-label="Foto siguiente">›</button>
  </div>

  <div class="bird-main">
    <!-- Left: gallery + details -->
    <div>
      <section class="gallery" aria-label="Galería de fotos de ${bird.name}">
        <div class="gal-main" id="gal-main" role="button" tabindex="0" aria-label="Ampliar foto">
          <img src="${mainPhoto}" alt="${bird.name} — ${bird.speciesName}" id="gal-main-img" width="800" height="600">
          <span class="gal-count">${thumbs.length} foto${thumbs.length!==1?'s':''}</span>
        </div>
        <div class="gal-thumbs" role="list">
          ${thumbHTML}
        </div>
      </section>

      <div class="trait-pills">
        <span class="trait-pill">${bird.rearing}</span>
        ${bird.dnaStatus ? `<span class="trait-pill">${bird.dnaStatus}</span>` : ''}
        <span class="trait-pill">${bird.cites}</span>
        <span class="trait-pill">Documentación completa</span>
        <span class="trait-pill">Garantía de salud</span>
      </div>

      <div class="bird-section">
        <h2>Personalidad</h2>
        <p>${bird.personality}</p>
      </div>

      <div class="bird-section">
        <h2>Salud</h2>
        <p>${bird.health}</p>
        <p>Cada ave sale con <strong>certificado veterinario de salud</strong>, documentación CITES oficial, anilla de criadero y guía de cuidados personalizada. Consulta nuestra <a href="/garantia-de-salud">garantía de salud</a>.</p>
      </div>

      <div class="bird-section">
        <h2>Dieta</h2>
        <p>${bird.diet}</p>
        <p>Más información en nuestra <a href="/conocimiento/nutricion/">guía de nutrición para loros</a>.</p>
      </div>

      <div class="bird-section">
        <h2>Cuidados</h2>
        <p>${bird.care}</p>
        <p>Consulta también nuestra <a href="/conocimiento/instalaciones/">guía de instalaciones</a> y <a href="/conocimiento/adiestramiento/">guía de adiestramiento</a>.</p>
      </div>

      <div class="bird-section">
        <h2>Transporte y entrega</h2>
        <p>Realizamos envíos seguros a toda España y a varios países de Europa. El transporte se realiza con acondicionamiento especializado, supervisión veterinaria y los documentos CITES en regla. Consulta los detalles en nuestra <a href="/transporte">página de transporte</a>.</p>
      </div>

      ${related.length ? `
      <div class="bird-section">
        <h2>Más ${bird.speciesName}</h2>
        <div class="rel-birds-grid">${relatedHTML}</div>
      </div>` : ''}
    </div>

    <!-- Right: info card (sticky) -->
    <aside>
      <div class="info-card">
        <span class="status-pill ${st.cls}"><span class="status-dot"></span>${st.text}</span>
        <h1 style="margin-top:.7rem">${bird.name}</h1>
        <p class="species-label"><em>${bird.latinName}</em></p>

        <table class="info-table">
          <tr><td>Especie</td><td>${bird.speciesName}</td></tr>
          <tr><td>Sexo</td><td>${bird.sex}</td></tr>
          <tr><td>Edad</td><td>${ageLabel(bird.ageMonths)}</td></tr>
          ${bird.hatchDate ? `<tr><td>Nacimiento</td><td>${new Date(bird.hatchDate).toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}</td></tr>` : ''}
          ${bird.dnaStatus ? `<tr><td>ADN</td><td>${bird.dnaStatus}</td></tr>` : ''}
          <tr><td>Crianza</td><td>${bird.rearing}</td></tr>
          <tr><td>CITES</td><td>${bird.cites}</td></tr>
        </table>

        <div class="price-row">
          <p class="price-label">Precio</p>
          <p class="price-val">${bird.price}</p>
        </div>

        ${!isAvailable ? `<div class="sold-overlay">Este ejemplar ya no está disponible. Contáctanos para encontrar uno similar.</div>` : ''}

        <a href="/#contacto" class="cta-inquire">Solicitar información sobre ${bird.name}</a>
        

        <p style="font-size:.75rem;color:var(--muted);text-align:center;margin-top:.8rem">
          <a href="/adopcion-de-loros">Proceso de adopción</a> ·
          <a href="/transporte">Transporte</a> ·
          <a href="/garantia-de-salud">Garantía de salud</a>
        </p>
      </div>
    </aside>
  </div>

  <footer>
    <p>© 2025 Paraíso de Aves · <a href="/blog/cites-loros-espana.html">CITES</a> · <a href="/transporte">Transporte</a> · <a href="/#contacto">Contacto</a></p>
  </footer>

  <script>
  // Gallery
  var photos = ${JSON.stringify(thumbs)};
  var currentIdx = 0;
  var mainImg = document.getElementById('gal-main-img');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');

  document.querySelectorAll('.gal-thumb').forEach(function(btn, i){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.gal-thumb').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      mainImg.src = btn.dataset.full;
      currentIdx = i;
    });
  });

  // Lightbox open
  document.getElementById('gal-main').addEventListener('click', openLightbox);
  document.getElementById('gal-main').addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' ') openLightbox(); });
  function openLightbox(){
    lbImg.src = photos[currentIdx];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if(e.target===lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e){
    if(!lightbox.classList.contains('open')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowRight') lbNav(1);
    if(e.key==='ArrowLeft')  lbNav(-1);
  });
  function closeLightbox(){ lightbox.classList.remove('open'); document.body.style.overflow = ''; }
  document.getElementById('lb-prev').addEventListener('click', function(){ lbNav(-1); });
  document.getElementById('lb-next').addEventListener('click', function(){ lbNav(1);  });
  function lbNav(dir){
    currentIdx = (currentIdx + dir + photos.length) % photos.length;
    lbImg.src = photos[currentIdx];
    // sync thumbnail
    mainImg.src = photos[currentIdx];
    document.querySelectorAll('.gal-thumb').forEach(function(b,i){ b.classList.toggle('active', i===currentIdx); });
  }
  </script>
</body>
</html>`;
}

// ─── Inventory card (for species pages) ──────────────────────────────────────
function makeInvCard(bird) {
  const st = statusLabel(bird.status);
  return `
      <a class="inv-card" href="/es/aves/${bird.slug}/" aria-label="${bird.name} — ${bird.speciesName}">
        <div class="inv-card-img-wrap">
          <img src="${bird.photos[0]}" alt="${bird.name} — ${bird.speciesName}" width="400" height="300" loading="lazy">
          <span class="inv-photo-badge">${bird.photos.length} foto${bird.photos.length!==1?'s':''}</span>
          <span class="inv-status-badge ${st.cls}">${st.text}</span>
        </div>
        <div class="inv-card-body">
          <p class="inv-card-species">${bird.speciesName}</p>
          <h3 class="inv-card-name">${bird.name}</h3>
          <div class="inv-card-meta">
            <span>${bird.sex}</span><span>·</span><span>${ageLabel(bird.ageMonths)}</span>
            ${bird.dnaStatus ? `<span>·</span><span>${bird.dnaStatus}</span>` : ''}
          </div>
          <p class="inv-card-desc">${bird.personality.slice(0, 110)}…</p>
          <span class="inv-card-cta">Ver perfil →</span>
        </div>
      </a>`;
}

// ─── Inventory section CSS (injected once into species pages) ─────────────────
const INV_CSS = `
  /* ── Inventory section ── */
  .inv-section{margin-bottom:2.5rem}
  .inv-section>h2{font-size:1.5rem;color:var(--primary,#1B3D2F);margin-bottom:1.2rem}
  .inv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}
  @media(max-width:760px){.inv-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:460px){.inv-grid{grid-template-columns:1fr}}
  .inv-card{background:#fff;border:1px solid #E7E0D2;border-radius:14px;overflow:hidden;text-decoration:none;color:#2B2B2B;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s;box-shadow:0 4px 16px rgba(0,0,0,.07)}
  .inv-card:hover{transform:translateY(-5px);box-shadow:0 10px 32px rgba(0,0,0,.13);text-decoration:none;color:#2B2B2B}
  .inv-card-img-wrap{position:relative;overflow:hidden}
  .inv-card-img-wrap img{width:100%;height:200px;object-fit:cover;object-position:center;transition:transform .4s ease}
  .inv-card:hover .inv-card-img-wrap img{transform:scale(1.07)}
  .inv-photo-badge{position:absolute;bottom:.5rem;left:.5rem;background:rgba(0,0,0,.55);color:#fff;font-size:.7rem;font-weight:700;padding:.2rem .6rem;border-radius:999px;backdrop-filter:blur(3px)}
  .inv-status-badge{position:absolute;top:.5rem;right:.5rem;font-size:.7rem;font-weight:700;padding:.25rem .7rem;border-radius:999px}
  .inv-card-body{padding:1rem;display:flex;flex-direction:column;gap:.35rem;flex:1}
  .inv-card-species{font-size:.72rem;color:#5C5C5C;text-transform:uppercase;font-weight:700;letter-spacing:.06em}
  .inv-card-name{font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;font-weight:800;color:#1B3D2F}
  .inv-card-meta{font-size:.78rem;color:#5C5C5C;display:flex;gap:.4rem;flex-wrap:wrap}
  .inv-card-desc{font-size:.82rem;color:#5C5C5C;line-height:1.55;flex:1}
  .inv-card-cta{display:inline-block;background:linear-gradient(135deg,#C9A24B,#A8873A);color:#fff;font-size:.78rem;font-weight:700;padding:.35rem .9rem;border-radius:999px;align-self:flex-start;margin-top:.2rem}
  .inv-no-birds{background:#fff;border:2px dashed #E7E0D2;border-radius:14px;padding:2rem;text-align:center;color:#5C5C5C;font-size:.95rem}
  .inv-no-birds a{color:#1B3D2F;font-weight:700;text-decoration:underline}`;

const INV_CSS_MARKER = '/* ── Inventory section ── */';

// ─── Generate all bird profile pages ─────────────────────────────────────────
console.log('\n🦜 generate-bird-profiles.js\n');
console.log('── Bird profile pages ──────────────────────');

const birdUrls = [];
for (const bird of BIRDS) {
  const dir = path.join('es', 'aves', bird.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), makeBirdPage(bird), 'utf8');
  console.log(`   ✓ /es/aves/${bird.slug}/`);
  birdUrls.push(`${SITE}/es/aves/${bird.slug}/`);
}
console.log(`\n   ${birdUrls.length} bird profiles created.\n`);

// ─── Update species pages with inventory section ──────────────────────────────
console.log('── Species pages: injecting inventory ──────');

// Group birds by speciesSlug
const bySpecies = {};
for (const bird of BIRDS) {
  if (!bySpecies[bird.speciesSlug]) bySpecies[bird.speciesSlug] = [];
  bySpecies[bird.speciesSlug].push(bird);
}

// For each species page, replace or inject the inventory section
const speciesDirs = fs.readdirSync(path.join('es', 'especies')).filter(d => d !== 'index.html');

for (const slug of speciesDirs) {
  const pagePath = path.join('es', 'especies', slug, 'index.html');
  if (!fs.existsSync(pagePath)) continue;

  let html = fs.readFileSync(pagePath, 'utf8');
  const birds = bySpecies[slug] || [];
  const availableBirds = birds.filter(b => b.status === 'available');

  // Build inventory section HTML
  const invSectionHtml = birds.length > 0
    ? `<section class="inv-section" aria-label="Aves disponibles de esta especie">
        <h2>Aves Disponibles</h2>
        <div class="inv-grid">
          ${birds.map(makeInvCard).join('')}
        </div>
      </section>`
    : `<section class="inv-section" aria-label="Aves disponibles">
        <h2>Aves Disponibles</h2>
        <div class="inv-no-birds">
          <p>En este momento no tenemos ejemplares disponibles de esta especie.</p>
          <p style="margin-top:.6rem"><a href="/#contacto">Contáctanos</a> para recibir una alerta cuando haya disponibilidad.</p>
        </div>
      </section>`;

  // Inject inventory CSS if not present
  if (!html.includes(INV_CSS_MARKER)) {
    html = html.replace('</style>', INV_CSS + '\n  </style>');
  }

  // Replace the ph2-section placeholder (or existing inv-section) with real content
  const ph2Start = html.indexOf('<section class="ph2-section"');
  const ph2End   = html.indexOf('</section>', ph2Start) + '</section>'.length;
  if (ph2Start !== -1) {
    html = html.slice(0, ph2Start) + invSectionHtml + html.slice(ph2End);
  } else {
    // Replace existing inv-section
    const invStart = html.indexOf('<section class="inv-section"');
    const invEnd   = html.indexOf('</section>', invStart) + '</section>'.length;
    if (invStart !== -1) {
      html = html.slice(0, invStart) + invSectionHtml + html.slice(invEnd);
    }
  }

  fs.writeFileSync(pagePath, html, 'utf8');
  const label = availableBirds.length > 0 ? `${availableBirds.length} aves disponibles` : 'sin aves activas';
  console.log(`   ✓ /es/especies/${slug}/ — ${label}`);
}

// ─── Update sitemap_es_especies.xml with bird URLs ────────────────────────────
let sitemap = fs.readFileSync('sitemap_es_especies.xml', 'utf8');
// Remove existing bird URLs to avoid duplicates
sitemap = sitemap.replace(/<url><loc>https:\/\/www\.paraisodeaves\.com\/es\/aves\/[^<]+<\/url>\n/g, '');
// Add new bird URLs before closing tag
const birdSitemapEntries = birdUrls.map(u => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n');
sitemap = sitemap.replace('</urlset>', birdSitemapEntries + '\n</urlset>');
fs.writeFileSync('sitemap_es_especies.xml', sitemap, 'utf8');

console.log(`\n📄 sitemap_es_especies.xml updated (${birdUrls.length} bird URLs added)`);
console.log('\n✅ Done.\n');
console.log('── How to add a new bird ────────────────────');
console.log('   1. Add the bird object to data/birds.json');
console.log('   2. Run: node generate-bird-profiles.js');
console.log('   All pages, species sections and sitemaps update automatically.\n');
