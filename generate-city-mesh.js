#!/usr/bin/env node
/**
 * generate-city-mesh.js
 * Injects a "También te puede interesar" internal-link section into every
 * ciudades/*.html page, wiring:
 *   1. Species-guide links  →  /especies/<slug>/
 *   2. Same-species cross-city links  →  other ciudades/ pages for same species
 *   3. /aves-disponibles/ anchor with relevant text
 *
 * Safe to re-run: skips pages that already have the injected section marker.
 */

const fs   = require('fs');
const path = require('path');

// ─── 1. SPECIES METADATA ────────────────────────────────────────────────────

const SPECIES_PAGES = {
  'cacatua-blanca':          { label: '🤍 Cacatúa Blanca',          url: '/especies/cacatua-blanca/' },
  'cacatua-galah':           { label: '🌸 Cacatúa Galah',           url: '/especies/cacatua-galah/' },
  'cacatua-goffin':          { label: '🪸 Cacatúa Goffin',          url: '/especies/cacatua-goffin/' },
  'amazona-ala-naranja':     { label: '🟠 Amazona Ala Naranja',     url: '/especies/amazona-ala-naranja/' },
  'amazona-nuca-amarilla':   { label: '💛 Amazona Nuca Amarilla',   url: '/especies/amazona-nuca-amarilla/' },
  'conuro-del-sol':          { label: '☀️ Conuro del Sol',           url: '/especies/conuro-del-sol/' },
  'conuro-jenday':           { label: '🌅 Conuro Jenday',           url: '/especies/conuro-jenday/' },
  'conuro-mejilla-verde':    { label: '🟢 Conuro Mejilla Verde',    url: '/especies/conuro-mejilla-verde/' },
  'loro-senegal':            { label: '🟤 Loro Senegal',            url: '/especies/loro-senegal/' },
  'loro-pionus':             { label: '💜 Loro Pionus',             url: '/especies/loro-pionus/' },
  'caique':                  { label: '🎨 Caique',                  url: '/especies/caique/' },
  'cotorra-monje':           { label: '🦜 Cotorra Monje',           url: '/especies/cotorra-monje/' },
  'lorikeet-arcoiris':       { label: '🌈 Lorikeet Arcoíris',       url: '/especies/lorikeet-arcoiris/' },
  'periquito-alejandrino':   { label: '💚 Periquito Alejandrino',   url: '/especies/periquito-alejandrino/' },
  'periquito-collar-indio':  { label: '💙 Periquito Collar Indio',  url: '/especies/periquito-collar-indio/' },
};

// Species guide links per city-page type
const SPECIES_LINKS_BY_GROUP = {
  cacatua:    ['cacatua-blanca', 'cacatua-galah', 'cacatua-goffin'],
  amazona:    ['amazona-ala-naranja', 'amazona-nuca-amarilla'],
  guacamayo:  ['loro-senegal', 'cacatua-blanca', 'caique'],
  'loro-gris': ['loro-senegal', 'caique', 'loro-pionus'],
  eclectus:   ['loro-pionus', 'loro-senegal', 'caique'],
  conuro:     ['conuro-del-sol', 'conuro-jenday', 'conuro-mejilla-verde'],
  generic:    ['cacatua-blanca', 'loro-senegal', 'conuro-del-sol', 'amazona-ala-naranja'],
};

// ─── 2. CITY & SPECIES GROUP DETECTION ──────────────────────────────────────

function detectGroup(filename) {
  // filename without extension, e.g. "cacatua-barcelona", "comprar-loros-madrid"
  const n = filename.replace(/\.html$/, '');
  if (/^cacatua-/.test(n))             return 'cacatua';
  if (/^amazona-/.test(n))             return 'amazona';
  if (/^loro-amazonico-/.test(n))      return 'amazona';
  if (/^guacamayo-/.test(n))           return 'guacamayo';
  if (/^loro-gris-africano-/.test(n))  return 'loro-gris';
  if (/^eclectus-/.test(n))            return 'eclectus';
  if (/^conuro-/.test(n))              return 'conuro';
  if (/^comprar-loros-/.test(n))       return 'generic';
  return null; // index.html etc – skip
}

function extractCity(filename) {
  const n = filename.replace(/\.html$/, '');
  // strip known prefixes and return city slug
  const city = n
    .replace(/^cacatua-/, '')
    .replace(/^amazona-/, '')
    .replace(/^loro-amazonico-/, '')
    .replace(/^guacamayo-jacinto-/, '')
    .replace(/^guacamayo-/, '')
    .replace(/^loro-gris-africano-/, '')
    .replace(/^eclectus-/, '')
    .replace(/^conuro-/, '')
    .replace(/^comprar-loros-/, '');
  return city; // e.g. "madrid", "barcelona", "espana"
}

const CITY_DISPLAY = {
  madrid: 'Madrid', barcelona: 'Barcelona', valencia: 'Valencia',
  sevilla: 'Sevilla', malaga: 'Málaga', bilbao: 'Bilbao',
  zaragoza: 'Zaragoza', murcia: 'Murcia', alicante: 'Alicante',
  cordoba: 'Córdoba', granada: 'Granada', valladolid: 'Valladolid',
  gijon: 'Gijón', oviedo: 'Oviedo', santander: 'Santander',
  pamplona: 'Pamplona', leon: 'León', salamanca: 'Salamanca',
  tarragona: 'Tarragona', tenerife: 'Tenerife', vigo: 'Vigo',
  'las-palmas': 'Las Palmas', 'palma-de-mallorca': 'Palma de Mallorca',
  espana: 'España',
};

// Species group human labels for anchor text
const GROUP_LABEL = {
  cacatua:    'cacatúas',
  amazona:    'amazonas',
  guacamayo:  'guacamayos',
  'loro-gris': 'loros grises africanos',
  eclectus:   'loros eclectus',
  conuro:     'conuros',
  generic:    'loros',
};

// ─── 3. BUILD PAGE INVENTORY ─────────────────────────────────────────────────

const CIUDADES_DIR = path.join(__dirname, 'ciudades');
const allFiles = fs.readdirSync(CIUDADES_DIR).filter(f => f.endsWith('.html'));

// Group pages by species group  →  { group: [ { file, city } ] }
const groups = {};
for (const file of allFiles) {
  const group = detectGroup(file);
  if (!group) continue;
  if (!groups[group]) groups[group] = [];
  groups[group].push({ file, city: extractCity(file) });
}

// ─── 4. HTML SECTION GENERATOR ───────────────────────────────────────────────

function buildSection(file, group, city) {
  const speciesSlugs = SPECIES_LINKS_BY_GROUP[group] || [];

  // Species guide links
  const speciesLinksHtml = speciesSlugs.map(slug => {
    const sp = SPECIES_PAGES[slug];
    return `      <a href="${sp.url}" class="mesh-species-link">${sp.label} — guía</a>`;
  }).join('\n');

  // Cross-city links (same group, different city)
  const sameGroupFiles = (groups[group] || []).filter(p => p.file !== file);
  let crossCityHtml = '';
  if (sameGroupFiles.length > 0) {
    const speciesLabel = GROUP_LABEL[group] || 'loros';
    const cityLinks = sameGroupFiles.map(p => {
      const href = `/ciudades/${p.file.replace(/\.html$/, '')}`;
      const label = CITY_DISPLAY[p.city] || p.city.charAt(0).toUpperCase() + p.city.slice(1);
      return `<a href="${href}">${label}</a>`;
    }).join('\n      ');
    crossCityHtml = `
    <p class="mesh-also-in">También disponible en otras ciudades:</p>
    <div class="city-links mesh-city-links">
      ${cityLinks}
    </div>`;
  }

  // Aves-disponibles anchor text
  const avesAnchor = group === 'generic'
    ? 'ver todas las aves disponibles con documentación CITES'
    : `ver ${GROUP_LABEL[group] || 'aves'} disponibles con documentación CITES`;

  return `
  <!-- MESH-LINKS-START: internal link mesh — do not edit manually -->
  <section class="mesh-section" style="margin:2.5rem 0 0;padding:1.5rem;background:rgba(31,61,43,.05);border-radius:12px;border:1px solid #E7E0D2;">
    <h2 style="font-size:1.05rem;font-family:'Poppins',sans-serif;color:#1F3D2B;margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid #D4A94F;">🔗 También te puede interesar</h2>
    <div class="mesh-species-links" style="display:flex;flex-wrap:wrap;gap:.55rem;margin-bottom:1.1rem;">
${speciesLinksHtml}
    </div>
    <p style="font-size:.88rem;color:#5C5C5C;">📋 <a href="/aves-disponibles/" style="color:#1F3D2B;font-weight:600;">${avesAnchor.charAt(0).toUpperCase() + avesAnchor.slice(1)}</a> — criados a mano en nuestro criadero de Llíria, Valencia.</p>${crossCityHtml}
  </section>
  <!-- MESH-LINKS-END -->
`;
}

// ─── 5. CSS TO INJECT (once per page, in <head>) ─────────────────────────────

const MESH_CSS = `
<style>
/* city-mesh-v1 */
.mesh-species-link{display:inline-block;background:#fff;border:1px solid #E7E0D2;border-radius:8px;padding:6px 14px;font-size:.82rem;font-family:'Poppins',sans-serif;font-weight:600;color:#1F3D2B;text-decoration:none;transition:all .2s;}
.mesh-species-link:hover{background:#1F3D2B;color:#D4A94F;border-color:#1F3D2B;}
.mesh-also-in{margin-top:1rem;font-size:.85rem;color:#5C5C5C;margin-bottom:.4rem;}
.mesh-city-links{display:flex;flex-wrap:wrap;gap:.4rem;}
.mesh-city-links a{background:rgba(31,61,43,.07);border-radius:6px;padding:4px 10px;font-size:.8rem;font-weight:600;color:#1F3D2B;text-decoration:none;transition:all .2s;}
.mesh-city-links a:hover{background:#1F3D2B;color:#D4A94F;}
</style>
`;

// ─── 6. INJECT INTO EACH FILE ────────────────────────────────────────────────

let updated = 0;
let skipped = 0;

for (const file of allFiles) {
  const group = detectGroup(file);
  if (!group) { skipped++; continue; }

  const filePath = path.join(CIUDADES_DIR, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Idempotency guard
  if (html.includes('MESH-LINKS-START')) {
    console.log(`  SKIP (already has mesh): ${file}`);
    skipped++;
    continue;
  }

  const city = extractCity(file);
  const section = buildSection(file, group, city);

  // Inject CSS before </head>
  if (!html.includes('city-mesh-v1')) {
    html = html.replace('</head>', MESH_CSS + '</head>');
  }

  // Inject section just before <footer (works for both class="footer" and style="..." variants)
  if (html.includes('<footer')) {
    html = html.replace(/(<footer[\s>])/, section + '$1');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  OK: ${file}`);
    updated++;
  } else {
    console.log(`  WARN: no <footer> found in ${file}`);
    skipped++;
  }
}

console.log(`\nDone. Updated: ${updated}, Skipped/no-footer: ${skipped}`);
