#!/usr/bin/env node
// Verification: checks species + hub pages have correct hreflang tags,
// and that the lang-switcher.js MAP has no ambiguous first-match for key source paths.
const fs = require('fs');
const BASE = 'https://www.paraisodeaves.com';

// ── Trilingual clusters: all 3 pages must carry all 4 tags ──────────────
const CLUSTERS = [
  ['/especies/amazona-ala-naranja',    '/pt/especies/amazona-asa-laranja',    '/fr/especies/amazone-aile-orange'],
  ['/especies/amazona-nuca-amarilla',  '/pt/especies/amazona-nuca-amarela',   '/fr/especies/amazone-nuque-jaune'],
  ['/especies/cacatua-blanca',         '/pt/especies/cacatua-branca',         '/fr/especies/cacatoes-blanc'],
  ['/especies/cacatua-galah',          '/pt/especies/cacatua-galah',          '/fr/especies/cacatoes-rosalbin'],
  ['/especies/cacatua-goffin',         '/pt/especies/cacatua-goffin',         '/fr/especies/cacatoes-goffin'],
  ['/especies/caique',                 '/pt/especies/caique',                 '/fr/especies/caique'],
  ['/especies/conuro-del-sol',         '/pt/especies/conuro-do-sol',          '/fr/especies/conure-soleil'],
  ['/especies/conuro-jenday',          '/pt/especies/conuro-jenday',          '/fr/especies/conure-jenday'],
  ['/especies/conuro-mejilla-verde',   '/pt/especies/conuro-faces-verdes',    '/fr/especies/conure-joues-vertes'],
  ['/especies/cotorra-monje',          '/pt/especies/periquito-monge',        '/fr/especies/perruche-moine'],
  ['/especies/lorikeet-arcoiris',      '/pt/especies/lorikeet-arco-iris',     '/fr/especies/loriquet-arc-en-ciel'],
  ['/especies/loro-pionus',            '/pt/especies/papagaio-pionus',        '/fr/especies/perroquet-pionus'],
  ['/especies/loro-senegal',           '/pt/especies/papagaio-senegal',       '/fr/especies/perroquet-du-senegal'],
  ['/especies/periquito-alejandrino',  '/pt/especies/periquito-alexandrino',  '/fr/especies/perruche-alexandre'],
  ['/especies/periquito-collar-indio', '/pt/especies/periquito-colar-indiano','/fr/especies/perruche-a-collier'],
  // Hub
  ['/especies/',                       '/pt/especies/',                       '/fr/especies/'],
];

// ── FR-only subtype pages: ES/PT point to hub ────────────────────────────
const FR_SUBTYPES = [
  ['/fr/especies/ara-bleu-et-jaune',       '/guacamayos',             '/pt/arara-a-venda'],
  ['/fr/especies/ara-chloroptere',         '/guacamayos',             '/pt/arara-a-venda'],
  ['/fr/especies/ara-hyacinthe',           '/guia-guacamayo-jacinto', '/pt/arara-jacinto'],
  ['/fr/especies/ara-macao',               '/guacamayos',             '/pt/arara-escarlate'],
  ['/fr/especies/cacatoes-huppe-jaune',    '/cacatua',                '/pt/cacatua-de-crista-amarela'],
  ['/fr/especies/eclectus',                '/eclectus',               '/pt/papagaio-eclectus'],
  ['/fr/especies/perroquet-gris-du-gabon', '/loro-gris-africano',     '/pt/papagaio-cinzento'],
  ['/fr/especies/amazone-front-bleu',      '/loro-amazonico',         '/pt/amazona-a-venda'],
  ['/fr/especies/caique-ventre-blanc',     '/especies/',              '/pt/especies/'],
  ['/fr/especies/grand-alexandre',         '/especies/',              '/pt/especies/'],
  ['/fr/especies/perruche-royale',         '/especies/',              '/pt/especies/'],
];

function pathToFile(p) {
  const s = p.replace(/^\//, '');
  if (s.endsWith('/')) return s + 'index.html';
  if (!s.endsWith('.html')) return s + '/index.html';
  return s;
}

function readHreflang(file) {
  const html = fs.readFileSync(file, 'utf8');
  const tags = {};
  const re1 = /<link[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/g;
  const re2 = /<link[^>]+href="([^"]+)"[^>]+hreflang="([^"]+)"/g;
  let m;
  while ((m = re1.exec(html)) !== null) tags[m[1]] = m[2];
  while ((m = re2.exec(html)) !== null) tags[m[2]] = m[1];
  return tags;
}

let errors = 0;
let checked = 0;

// ── Trilingual clusters ────────────────────────────────────────────────
for (const [es, pt, fr] of CLUSTERS) {
  for (const [, pagePath] of [['es', es], ['pt', pt], ['fr', fr]]) {
    const file = pathToFile(pagePath);
    if (!fs.existsSync(file)) { console.log('MISSING FILE:', file); errors++; continue; }
    const hl = readHreflang(file);
    for (const [tag, href] of [
      ['es-ES',    BASE + es],
      ['pt-PT',    BASE + pt],
      ['fr-FR',    BASE + fr],
      ['x-default',BASE + es],
    ]) {
      if (hl[tag] !== href) {
        console.log(`FAIL ${file}: ${tag} = "${hl[tag]}" (expected "${href}")`);
        errors++;
      }
    }
    checked++;
  }
}

// ── FR-only subtype pages ──────────────────────────────────────────────
for (const [fr, es, pt] of FR_SUBTYPES) {
  const file = pathToFile(fr);
  if (!fs.existsSync(file)) { console.log('MISSING FILE:', file); errors++; continue; }
  const hl = readHreflang(file);
  for (const [tag, href] of [
    ['es-ES',    BASE + es],
    ['pt-PT',    BASE + pt],
    ['fr-FR',    BASE + fr],
    ['x-default',BASE + es],
  ]) {
    if (hl[tag] !== href) {
      console.log(`FAIL ${file}: ${tag} = "${hl[tag]}" (expected "${href}")`);
      errors++;
    }
  }
  checked++;
}

// ── MAP resolver simulation: check first-match for key source paths ────
console.log('\nResolver tests (first-match check):');
const lsCode = fs.readFileSync('lang-switcher.js', 'utf8');
const mapMatch = lsCode.match(/var MAP = \[([\s\S]*?)\];/);
if (!mapMatch) { console.log('ERROR: Cannot parse MAP'); errors++; }
else {
  // Safe eval of just the MAP array
  const MAP = eval('[' + mapMatch[1] + ']');
  function norm(p) { return (p || '').replace(/\/$/, '').replace(/\.html$/, '') || '/'; }
  function resolve(srcPath, srcLang, dstLang) {
    const IDX = { es: 0, pt: 1, fr: 2 };
    const srcIdx = IDX[srcLang], dstIdx = IDX[dstLang];
    const n = norm(srcPath);
    for (const row of MAP) {
      const src = norm(row[srcIdx] || '');
      if (n === src || srcPath === row[srcIdx]) return row[dstIdx] || null;
    }
    return null;
  }

  const resolverTests = [
    // Hub: must resolve to correct FR hub, not a subtype page
    ['/especies/',  'es', 'fr', '/fr/especies/'],
    ['/pt/especies/','pt', 'fr', '/fr/especies/'],
    ['/fr/especies/','fr', 'es', '/especies/'],
    // Trilingual species: normal resolution
    ['/especies/caique',   'es', 'fr', '/fr/especies/caique'],
    ['/especies/periquito-alejandrino','es','fr','/fr/especies/perruche-alexandre'],
    // FR-only: resolve back to ES correctly
    ['/fr/especies/ara-bleu-et-jaune', 'fr', 'es', '/guacamayos'],
    ['/fr/especies/eclectus',          'fr', 'es', '/eclectus'],
    ['/fr/especies/perroquet-gris-du-gabon','fr','es','/loro-gris-africano'],
    // caique-ventre-blanc, grand-alexandre, perruche-royale have no MAP row (intentional fall-through)
  ];

  for (const [src, srcLang, dstLang, expected] of resolverTests) {
    const result = resolve(src, srcLang, dstLang);
    const ok = result === expected || norm(result || '') === norm(expected);
    console.log(` ${ok ? '✓' : '✗'} ${src} [${srcLang}→${dstLang}]: ${result} ${ok ? '' : `(expected ${expected})`}`);
    if (!ok) errors++;
  }
}

console.log(`\nChecked ${checked} pages.`);
if (errors === 0) {
  console.log('All hreflang + resolver tests passed ✓');
} else {
  console.log(`${errors} error(s) found ✗`);
  process.exit(1);
}
