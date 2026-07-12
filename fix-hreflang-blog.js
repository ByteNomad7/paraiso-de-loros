/**
 * Task #3 — Fix hreflang across ES/PT/FR blog posts
 *
 * Problems fixed:
 * 1. 105 ES blog posts missing hreflang entirely → add es-ES + x-default (+ PT/FR where mapped)
 * 2. 33 PT blog posts missing es-ES cross-reference → add es-ES + fix x-default
 * 3. 12 FR blog posts with es-ES/pt-PT pointing to homepages → fix to actual posts
 */

const fs = require('fs');
const path = require('path');

const BASE = 'https://www.paraisodeaves.com';

// ─── MAPPING TABLES ──────────────────────────────────────────────────────────

// PT slug → ES blog filename (blog/SLUG.html)
const PT_TO_ES = {
  'alimentacao-correta-dos-papagaios':      'alimentos-seguros-loros.html',
  'alimentacao-papagaio-guia-completo':     'alimentacion-loro-adulto.html',
  'arara-jacinto-caracteristicas':          'guacamayo-jacinto-caracteristicas.html',
  'arara-jacinto-guia-completo':            'guia-guacamayo-jacinto.html',
  'banhar-papagaio':                        'banar-loro-guia-completa.html',
  'cacatua-ninfa-carolina-guia':            'guia-cacatua-ninfa.html',
  'como-escolher-um-criador-responsavel':   'como-elegir-criador-loros-espana.html',
  'como-escolher-um-papagaio':              'como-elegir-tu-primer-loro.html',
  'documentacao-cites-portugal':            'cites-loros-espana.html',
  'doencas-comuns-papagaios':               'enfermedades-comunes-loros.html',
  'esperanca-de-vida-papagaios':            'cuanto-vive-un-loro.html',
  'jaula-ideal-papagaio':                   'jaula-ideal-loro-tamano.html',
  'melhores-papagaios-para-familias':       'mejores-loros-familias.html',
  'melhores-papagaios-para-iniciantes':     'mejores-loros-para-principiantes.html',
  'papagaio-adocao-vs-compra':              'adoptar-loro-vs-comprar.html',
  'papagaio-amazona-mascota':               'amazona-loro-mascota.html',
  'papagaio-bebe-alimentacao':              'como-alimentar-un-loro-bebe.html',
  'papagaio-cinzento-cuidados':             'cuidado-loro-gris-africano.html',
  'papagaio-cinzento-vs-eclectus':          'eclectus-vs-yaco.html',
  'papagaio-falar-como-ensinar':            'como-ensenar-a-hablar-un-loro.html',
  'periquito-mascota-guia':                 'periquito-mascota-guia.html',
  'quanto-vive-um-papagaio':                'cuanto-vive-un-loro.html',
  'treinar-um-papagaio':                    'como-ensenar-tricks-loro.html',
};

// FR slug → ES blog filename
const FR_TO_ES = {
  'alimentation-perroquets':       'alimentos-seguros-loros.html',
  'ara-hyacinthe-guide':           'guia-guacamayo-jacinto.html',
  'choisir-eleveur-serieux':       'como-elegir-criador-loros-espana.html',
  'combien-vit-perroquet':         'cuanto-vive-un-loro.html',
  'eclectus-guide':                'eclectus-loro-guia.html',
  'guide-cites-france':            'cites-loros-espana.html',
  'meilleurs-perroquets-debutants':'mejores-loros-para-principiantes.html',
  'perroquet-gris-du-gabon-guide': 'guia-loro-gris-africano.html',
  'quel-perroquet-choisir':        'como-elegir-tu-primer-loro.html',
};

// FR slug → PT slug (for pt-PT hreflang in FR posts)
const FR_TO_PT = {
  'alimentation-perroquets':       'alimentacao-correta-dos-papagaios',
  'ara-hyacinthe-guide':           'arara-jacinto-guia-completo',
  'choisir-eleveur-serieux':       'como-escolher-um-criador-responsavel',
  'combien-vit-perroquet':         'esperanca-de-vida-papagaios',
  'guide-cites-france':            'documentacao-cites-portugal',
  'meilleurs-perroquets-debutants':'melhores-papagaios-para-iniciantes',
  'perroquet-gris-du-gabon-guide': 'papagaio-cinzento-cuidados',
  'preparer-maison-perroquet':     'como-preparar-a-casa-para-um-papagaio',
  'quel-perroquet-choisir':        'como-escolher-um-papagaio',
};

// Reverse: ES filename → PT slug (for adding pt-PT to ES posts)
const ES_TO_PT = {};
for (const [pt, es] of Object.entries(PT_TO_ES)) ES_TO_PT[es] = pt;

// Reverse: ES filename → FR slug
const ES_TO_FR = {};
for (const [fr, es] of Object.entries(FR_TO_ES)) ES_TO_FR[es] = fr;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function insertAfterCanonical(html, tags) {
  // Insert after the canonical link tag
  const canonicalRx = /(<link rel="canonical"[^>]*\/>)/i;
  if (canonicalRx.test(html)) {
    return html.replace(canonicalRx, `$1\n  ${tags}`);
  }
  // Fallback: insert before </head>
  return html.replace('</head>', `  ${tags}\n</head>`);
}

function removeExistingHreflang(html) {
  // Remove all existing hreflang and x-default alternates so we can rewrite clean
  return html.replace(/<link rel="alternate" hreflang="[^"]*"[^>]*\/>\s*/gi, '');
}

function buildTags(entries) {
  // entries: [{lang, href}]
  return entries
    .map(e => `<link rel="alternate" hreflang="${e.lang}" href="${e.href}"/>`)
    .join('\n  ');
}

let stats = { esUpdated: 0, esSkipped: 0, ptUpdated: 0, ptSkipped: 0, frUpdated: 0, frSkipped: 0 };

// ─── 1. ES BLOG POSTS ────────────────────────────────────────────────────────

const esBlogFiles = fs.readdirSync('blog').filter(f => f.endsWith('.html') && f !== 'index.html');

for (const filename of esBlogFiles) {
  const file = path.join('blog', filename);
  let html = fs.readFileSync(file, 'utf8');

  // Skip if already has self-referencing es-ES hreflang pointing to /blog/
  if (/hreflang="es-ES"/.test(html) && html.includes('/blog/')) {
    stats.esSkipped++;
    continue;
  }

  const esUrl = `${BASE}/blog/${filename}`;
  const entries = [{ lang: 'es-ES', href: esUrl }];

  // Add PT alternate if mapped
  const ptSlug = ES_TO_PT[filename];
  if (ptSlug) entries.push({ lang: 'pt-PT', href: `${BASE}/pt/blog/${ptSlug}/` });

  // Add FR alternate if mapped
  const frSlug = ES_TO_FR[filename];
  if (frSlug) entries.push({ lang: 'fr-FR', href: `${BASE}/fr/blog/${frSlug}/` });

  // x-default = ES URL
  entries.push({ lang: 'x-default', href: esUrl });

  // If hreflang tags already exist but are wrong, remove them first
  if (/hreflang=/.test(html)) html = removeExistingHreflang(html);

  html = insertAfterCanonical(html, buildTags(entries));
  fs.writeFileSync(file, html, 'utf8');
  stats.esUpdated++;
}

console.log(`ES blog: ${stats.esUpdated} updated, ${stats.esSkipped} already OK`);

// ─── 2. PT BLOG POSTS ────────────────────────────────────────────────────────

const ptBlogDirs = fs.readdirSync('pt/blog').filter(d => {
  return fs.statSync(path.join('pt/blog', d)).isDirectory();
});

for (const ptSlug of ptBlogDirs) {
  const file = path.join('pt/blog', ptSlug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');

  const ptUrl = `${BASE}/pt/blog/${ptSlug}/`;
  const esFilename = PT_TO_ES[ptSlug];
  const esUrl = esFilename ? `${BASE}/blog/${esFilename}` : `${BASE}/`;
  const xDefault = esFilename ? esUrl : `${BASE}/`;

  // Find FR slug for this PT post (reverse FR_TO_PT)
  const frSlug = Object.keys(FR_TO_PT).find(k => FR_TO_PT[k] === ptSlug);
  const frUrl = frSlug ? `${BASE}/fr/blog/${frSlug}/` : null;

  const entries = [{ lang: 'pt-PT', href: ptUrl }];
  entries.push({ lang: 'es-ES', href: esUrl });
  if (frUrl) entries.push({ lang: 'fr-FR', href: frUrl });
  entries.push({ lang: 'x-default', href: xDefault });

  // Remove existing hreflang and rewrite clean
  html = removeExistingHreflang(html);
  html = insertAfterCanonical(html, buildTags(entries));
  fs.writeFileSync(file, html, 'utf8');
  stats.ptUpdated++;
}

console.log(`PT blog: ${stats.ptUpdated} updated, ${stats.ptSkipped} skipped`);

// ─── 3. FR BLOG POSTS ────────────────────────────────────────────────────────

const frBlogDirs = fs.readdirSync('fr/blog').filter(d => {
  return fs.statSync(path.join('fr/blog', d)).isDirectory();
});

for (const frSlug of frBlogDirs) {
  const file = path.join('fr/blog', frSlug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');

  const frUrl = `${BASE}/fr/blog/${frSlug}/`;
  const esFilename = FR_TO_ES[frSlug];
  const esUrl = esFilename ? `${BASE}/blog/${esFilename}` : `${BASE}/`;
  const ptSlug = FR_TO_PT[frSlug];
  const ptUrl = ptSlug ? `${BASE}/pt/blog/${ptSlug}/` : null;
  const xDefault = esFilename ? esUrl : `${BASE}/`;

  const entries = [{ lang: 'fr-FR', href: frUrl }];
  entries.push({ lang: 'es-ES', href: esUrl });
  if (ptUrl) entries.push({ lang: 'pt-PT', href: ptUrl });
  entries.push({ lang: 'x-default', href: xDefault });

  html = removeExistingHreflang(html);
  html = insertAfterCanonical(html, buildTags(entries));
  fs.writeFileSync(file, html, 'utf8');
  stats.frUpdated++;
}

console.log(`FR blog: ${stats.frUpdated} updated, ${stats.frSkipped} skipped`);
console.log('\nHreflang fix complete.');
