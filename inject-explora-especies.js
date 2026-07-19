#!/usr/bin/env node
/**
 * inject-explora-especies.js
 *
 * Injects the "Explora Nuestras Especies" section into index.html
 * immediately after the hero section, with:
 * - 16 species cards (4-col desktop, 3 tablet, 2 mobile)
 * - Search bar ("Buscar una especie…")
 * - Filter buttons (Tamaño, Habla, Familia, Principiante, Apartamento)
 * - Smooth hover animations (image zoom, card lift, gradient overlay)
 * - Accessibility: keyboard nav, focus states, ARIA labels
 */

const fs = require('fs');

const HTML_PATH = 'index.html';
const MARKER_START = '<!-- ░░ EXPLORA NUESTRAS ESPECIES ░░ -->';
const MARKER_END   = '<!-- ░░ /EXPLORA NUESTRAS ESPECIES ░░ -->';

const SPECIES = [
  { slug:'yacos',          name:'Yacos',            sub:'Loro Gris Africano',    img:'/images/loro-gris-01.webp',                             size:'grande',  habla:'muy-hablador', familia:'si', principiante:'no', apartamento:'no' },
  { slug:'guacamayos',     name:'Guacamayos',       sub:'Macaws',                img:'/images/guacamayo-azul-01.webp',                         size:'grande',  habla:'muy-hablador', familia:'si', principiante:'no', apartamento:'no' },
  { slug:'cacatuas',       name:'Cacatúas',          sub:'Cockatoos',             img:'/images/cacatua-01.webp',                                size:'grande',  habla:'moderado',     familia:'si', principiante:'no', apartamento:'no' },
  { slug:'amazonas',       name:'Amazonas',          sub:'Amazon Parrots',        img:'/images/loro-amazonico-01.webp',                         size:'mediano', habla:'muy-hablador', familia:'si', principiante:'si', apartamento:'si' },
  { slug:'eclectus',       name:'Eclectus',          sub:'Eclectus Parrot',       img:'/images/eclectus-01.webp',                               size:'mediano', habla:'moderado',     familia:'si', principiante:'si', apartamento:'si' },
  { slug:'conuros',        name:'Conuros',           sub:'Conures',               img:'/images/conuro-01.webp',                                 size:'pequeño', habla:'moderado',     familia:'si', principiante:'si', apartamento:'si' },
  { slug:'agapornis',      name:'Agapornis',         sub:'Inseparables',          img:'/images/conuro-mejilla-verde/conuro-mejilla-verde-01.webp', size:'pequeño', habla:'poco',       familia:'si', principiante:'si', apartamento:'si' },
  { slug:'loris',          name:'Loris',             sub:'Lorikeets',             img:'/images/lorikeet-arcoiris/lorikeet-arcoiris-01.webp',    size:'pequeño', habla:'poco',         familia:'si', principiante:'no', apartamento:'si' },
  { slug:'ninfas',         name:'Ninfas',            sub:'Cacatúa Ninfa',         img:'/images/homepage/cockatoo-resting-content.webp',         size:'pequeño', habla:'moderado',     familia:'si', principiante:'si', apartamento:'si' },
  { slug:'pionus',         name:'Pionus',            sub:'Loros Pionus',          img:'/images/loro-pionus/loro-pionus-01.webp',                size:'mediano', habla:'moderado',     familia:'si', principiante:'si', apartamento:'si' },
  { slug:'cotorras-quaker',name:'Cotorras Quaker',   sub:'Cotorra Monje',         img:'/images/cacatua-goffin/cacatua-goffin-01.webp',          size:'pequeño', habla:'moderado',     familia:'si', principiante:'si', apartamento:'no' },
  { slug:'rosellas',       name:'Rosellas',          sub:'Roselas Australianas',  img:'/images/conuro-mejilla-verde/conuro-mejilla-verde-01.webp', size:'pequeño', habla:'poco',      familia:'si', principiante:'si', apartamento:'si' },
  { slug:'periquitos',     name:'Periquitos',        sub:'Alejandrinos y Collar', img:'/images/periquito-alejandrino/periquito-alejandrino-01.webp', size:'pequeño', habla:'poco',    familia:'si', principiante:'si', apartamento:'si' },
  { slug:'tucanes',        name:'Tucanes',           sub:'Tucanes Tropicales',    img:'/images/homepage/toucan-portrait-closeup.webp',          size:'mediano', habla:'poco',         familia:'si', principiante:'no', apartamento:'no' },
  { slug:'buhos',          name:'Búhos',             sub:'Rapaces Nocturnas',     img:'/images/homepage/african-grey-parrot-flying.webp',       size:'mediano', habla:'poco',         familia:'si', principiante:'no', apartamento:'no' },
  { slug:'halcones',       name:'Halcones',          sub:'Rapaces Diurnas',       img:'/images/homepage/african-grey-parrot-flying.webp',       size:'mediano', habla:'poco',         familia:'no', principiante:'no', apartamento:'no' },
];

function makeCard(sp) {
  return `
      <a class="es-card"
         href="/es/especies/${sp.slug}/"
         data-name="${sp.name.toLowerCase()}"
         data-size="${sp.size}"
         data-habla="${sp.habla}"
         data-familia="${sp.familia}"
         data-principiante="${sp.principiante}"
         data-apartamento="${sp.apartamento}"
         aria-label="${sp.name} — Ver especie">
        <div class="es-card-img">
          <img src="${sp.img}" alt="${sp.name} — ${sp.sub}" width="400" height="300" loading="lazy">
        </div>
        <div class="es-card-overlay" aria-hidden="true"></div>
        <div class="es-card-body">
          <p class="es-card-sub">${sp.sub}</p>
          <h3 class="es-card-name">${sp.name}</h3>
          <span class="es-card-avail">Ver aves disponibles</span>
          <span class="es-card-cta">Ver especie →</span>
        </div>
      </a>`;
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  /* ── Explora Nuestras Especies ── */
  .es-section{background:#1B3D2F;padding:5.5rem 5%;position:relative;overflow:hidden}
  .es-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 0%,rgba(201,162,75,.12),transparent 60%);pointer-events:none}
  .es-wrap{max-width:1400px;margin:0 auto;position:relative;z-index:1}
  .es-header{text-align:center;margin-bottom:2.8rem}
  .es-label{display:inline-block;background:rgba(201,162,75,.18);border:1px solid rgba(201,162,75,.45);color:#C9A24B;font-size:.76rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 14px;border-radius:999px;margin-bottom:14px}
  .es-header h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.8rem,3.5vw,2.7rem);font-weight:900;color:#fff;margin-bottom:.6rem;letter-spacing:-.02em}
  .es-header p{color:rgba(255,255,255,.65);font-size:1rem;max-width:580px;margin:0 auto}
  /* Controls */
  .es-controls{display:flex;flex-direction:column;gap:1rem;margin-bottom:2.4rem}
  .es-search-wrap{position:relative;max-width:480px;margin:0 auto;width:100%}
  .es-search{width:100%;padding:.75rem 1rem .75rem 2.8rem;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.08);color:#fff;font-size:.97rem;font-family:'Open Sans',sans-serif;outline:none;transition:border-color .2s,background .2s}
  .es-search::placeholder{color:rgba(255,255,255,.45)}
  .es-search:focus{border-color:rgba(201,162,75,.7);background:rgba(255,255,255,.12)}
  .es-search-icon{position:absolute;left:.85rem;top:50%;transform:translateY(-50%);color:rgba(255,255,255,.5);pointer-events:none}
  .es-filters{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center}
  .es-filter{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.8);font-size:.8rem;font-weight:600;padding:.4rem 1rem;border-radius:999px;cursor:pointer;transition:background .2s,border-color .2s,color .2s;font-family:'Open Sans',sans-serif;white-space:nowrap}
  .es-filter:hover{background:rgba(201,162,75,.2);border-color:rgba(201,162,75,.5);color:#fff}
  .es-filter.active{background:linear-gradient(135deg,#C9A24B,#A8873A);border-color:transparent;color:#fff;box-shadow:0 4px 12px rgba(201,162,75,.35)}
  .es-filter:focus-visible{outline:2px solid #C9A24B;outline-offset:2px}
  /* Grid */
  .es-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem}
  @media(max-width:1100px){.es-grid{grid-template-columns:repeat(3,1fr)}}
  @media(max-width:720px){.es-grid{grid-template-columns:repeat(2,1fr);gap:1rem}}
  @media(max-width:400px){.es-grid{grid-template-columns:1fr}}
  /* Card */
  .es-card{position:relative;display:block;border-radius:18px;overflow:hidden;aspect-ratio:3/4;text-decoration:none;box-shadow:0 6px 28px rgba(0,0,0,.35);transition:transform .3s cubic-bezier(.25,.8,.25,1),box-shadow .3s;will-change:transform;cursor:pointer}
  .es-card:hover,.es-card:focus-visible{transform:translateY(-6px) scale(1.015);box-shadow:0 14px 44px rgba(0,0,0,.55);text-decoration:none;outline:none}
  .es-card:focus-visible{outline:3px solid #C9A24B;outline-offset:3px}
  .es-card-img{position:absolute;inset:0;overflow:hidden}
  .es-card-img img{width:100%;height:100%;object-fit:cover;object-position:center;transition:transform .5s cubic-bezier(.25,.8,.25,1)}
  .es-card:hover .es-card-img img{transform:scale(1.1)}
  .es-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,22,16,.88) 0%,rgba(10,22,16,.4) 45%,rgba(10,22,16,.05) 100%);transition:background .3s}
  .es-card:hover .es-card-overlay{background:linear-gradient(to top,rgba(10,22,16,.94) 0%,rgba(10,22,16,.5) 50%,rgba(10,22,16,.1) 100%)}
  .es-card-body{position:absolute;bottom:0;left:0;right:0;padding:1.2rem;color:#fff}
  .es-card-sub{font-size:.72rem;color:rgba(255,255,255,.6);font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.25rem}
  .es-card-name{font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;font-weight:800;line-height:1.2;margin-bottom:.5rem;text-shadow:0 2px 8px rgba(0,0,0,.4)}
  .es-card-avail{display:block;font-size:.75rem;color:#C9A24B;font-weight:600;margin-bottom:.6rem}
  .es-card-cta{display:inline-block;background:rgba(201,162,75,.2);border:1px solid rgba(201,162,75,.5);color:#C9A24B;font-size:.78rem;font-weight:700;padding:.3rem .9rem;border-radius:999px;transition:background .2s,color .2s}
  .es-card:hover .es-card-cta{background:linear-gradient(135deg,#C9A24B,#A8873A);border-color:transparent;color:#fff}
  /* Hidden cards */
  .es-card.hidden{display:none}
  /* No results */
  .es-no-results{text-align:center;color:rgba(255,255,255,.55);padding:2.5rem;font-size:.95rem;display:none}
  .es-no-results.visible{display:block}
  /* View all CTA */
  .es-footer{text-align:center;margin-top:2.4rem}
  .es-footer a{display:inline-block;border:2px solid rgba(201,162,75,.5);color:#C9A24B;font-weight:700;padding:.75rem 2rem;border-radius:999px;font-size:.95rem;transition:background .2s,border-color .2s,color .2s;text-decoration:none}
  .es-footer a:hover{background:rgba(201,162,75,.15);border-color:#C9A24B;color:#fff;text-decoration:none}`;

// ─── HTML ─────────────────────────────────────────────────────────────────────
const SECTION = `${MARKER_START}
<section class="es-section" id="explora-especies" aria-labelledby="es-title">
  <div class="es-wrap">
    <div class="es-header">
      <span class="es-label">Nuestras Especies</span>
      <h2 id="es-title">Explora Nuestras Especies</h2>
      <p>Loros criados a mano en Llíria. Encuentra la especie perfecta para tu hogar.</p>
    </div>

    <div class="es-controls">
      <div class="es-search-wrap">
        <label for="es-search" class="visually-hidden">Buscar una especie</label>
        <svg class="es-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="es-search" class="es-search" type="search" placeholder="Buscar una especie…" autocomplete="off" aria-label="Buscar una especie">
      </div>
      <div class="es-filters" role="group" aria-label="Filtrar por características">
        <button class="es-filter active" data-filter="all" aria-pressed="true">Todas</button>
        <button class="es-filter" data-filter="size:pequeño" aria-pressed="false">Tamaño pequeño</button>
        <button class="es-filter" data-filter="size:mediano" aria-pressed="false">Tamaño mediano</button>
        <button class="es-filter" data-filter="size:grande" aria-pressed="false">Tamaño grande</button>
        <button class="es-filter" data-filter="habla:muy-hablador" aria-pressed="false">Muy habladora</button>
        <button class="es-filter" data-filter="familia:si" aria-pressed="false">Ideal para familias</button>
        <button class="es-filter" data-filter="principiante:si" aria-pressed="false">Para principiantes</button>
        <button class="es-filter" data-filter="apartamento:si" aria-pressed="false">Para apartamento</button>
      </div>
    </div>

    <div class="es-grid" id="es-grid" role="list">
${SPECIES.map(makeCard).join('')}
    </div>
    <p class="es-no-results" id="es-no-results" aria-live="polite">No se encontraron especies con esos criterios.</p>

    <div class="es-footer">
      <a href="/aves-disponibles/">Ver todas las aves disponibles</a>
    </div>
  </div>
</section>
${MARKER_END}`;

// ─── JS ───────────────────────────────────────────────────────────────────────
const JS = `
  /* Explora Nuestras Especies — search + filter */
  (function(){
    var grid   = document.getElementById('es-grid');
    var noRes  = document.getElementById('es-no-results');
    if(!grid) return;
    var cards  = Array.from(grid.querySelectorAll('.es-card'));
    var search = document.getElementById('es-search');
    var filters= Array.from(document.querySelectorAll('.es-filter'));
    var activeFilter = 'all';
    var searchTerm   = '';

    function update(){
      var visible = 0;
      cards.forEach(function(c){
        var nameMatch = !searchTerm || c.dataset.name.includes(searchTerm);
        var filterMatch = activeFilter === 'all' || matchFilter(c, activeFilter);
        if(nameMatch && filterMatch){ c.classList.remove('hidden'); visible++; }
        else c.classList.add('hidden');
      });
      noRes.classList.toggle('visible', visible === 0);
    }

    function matchFilter(card, f){
      var parts = f.split(':');
      if(parts.length !== 2) return true;
      return card.dataset[parts[0]] === parts[1];
    }

    if(search){
      search.addEventListener('input', function(){
        searchTerm = this.value.toLowerCase().trim();
        update();
      });
    }

    filters.forEach(function(btn){
      btn.addEventListener('click', function(){
        filters.forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
        this.classList.add('active');
        this.setAttribute('aria-pressed','true');
        activeFilter = this.dataset.filter;
        update();
      });
    });
  })();`;

// ─── Inject into index.html ───────────────────────────────────────────────────
let html = fs.readFileSync(HTML_PATH, 'utf8');

// Idempotent: remove existing block if present
if (html.includes(MARKER_START)) {
  const start = html.indexOf(MARKER_START);
  const end   = html.indexOf(MARKER_END) + MARKER_END.length;
  html = html.slice(0, start) + html.slice(end);
  console.log('   (Removed existing section for clean re-injection)');
}

// 1. Inject CSS before </style> of first style block
const styleEnd = html.indexOf('</style>');
if (styleEnd !== -1) {
  html = html.slice(0, styleEnd) + CSS + '\n  ' + html.slice(styleEnd);
}

// Add visually-hidden utility class if not present
if (!html.includes('.visually-hidden')) {
  const secondStyle = html.indexOf('</style>', styleEnd + 10);
  if (secondStyle !== -1) {
    html = html.slice(0, secondStyle) + '\n  .visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}\n  ' + html.slice(secondStyle);
  }
}

// 2. Inject section after hero </section>
const heroEnd = html.indexOf('</section>\n\n<section class="about"');
if (heroEnd !== -1) {
  const insertAt = heroEnd + '</section>'.length;
  html = html.slice(0, insertAt) + '\n\n' + SECTION + '\n' + html.slice(insertAt);
} else {
  console.error('❌ Could not find hero end. Searching for alternate anchor...');
  // Fallback: search for the about section
  const aboutIdx = html.indexOf('<section class="about" id="nosotros">');
  if (aboutIdx !== -1) {
    html = html.slice(0, aboutIdx) + SECTION + '\n' + html.slice(aboutIdx);
  } else {
    console.error('❌ Could not find insertion point. Aborting.');
    process.exit(1);
  }
}

// 3. Inject JS before </body>
if (!html.includes('Explora Nuestras Especies — search')) {
  html = html.replace('</body>', `<script>${JS}</script>\n</body>`);
}

fs.writeFileSync(HTML_PATH, html, 'utf8');
console.log('✅ index.html updated with "Explora Nuestras Especies" section');
