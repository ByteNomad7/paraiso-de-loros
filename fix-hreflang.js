#!/usr/bin/env node
/**
 * fix-hreflang.js
 * ───────────────
 * Fixes hreflang in all FR especies pages and adds missing MAP entries
 * to lang-switcher.js so the JS resolver correctly covers all especies/ subpages.
 *
 * Problems addressed:
 *  1. FR especies pages missing pt-PT alternate (10 pages)
 *  2. FR especies pages with stale x-default (pointing to old ES slugs instead of ES canonical)
 *  3. lang-switcher.js MAP missing all especies/ trilingual entries
 *
 * Safe to re-run (idempotent).
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.paraisodeaves.com';

/* ─── CANONICAL TRILINGUAL SPECIES MAP ──────────────────────────────────
   Each entry: [es_path, pt_path, fr_path]
   Paths without trailing slash to match existing static tag format.
   For FR-only pages (no ES/PT especies/ equivalent), use best-match page.
─────────────────────────────────────────────────────────────────────── */
const SPECIES_MAP = [
  // Full trilingual set (ES, PT, FR all in /especies/)
  ['/especies/amazona-ala-naranja',   '/pt/especies/amazona-asa-laranja',   '/fr/especies/amazone-aile-orange'],
  ['/especies/amazona-nuca-amarilla', '/pt/especies/amazona-nuca-amarela',  '/fr/especies/amazone-nuque-jaune'],
  ['/especies/cacatua-blanca',        '/pt/especies/cacatua-branca',        '/fr/especies/cacatoes-blanc'],
  ['/especies/cacatua-galah',         '/pt/especies/cacatua-galah',         '/fr/especies/cacatoes-rosalbin'],
  ['/especies/cacatua-goffin',        '/pt/especies/cacatua-goffin',        '/fr/especies/cacatoes-goffin'],
  ['/especies/caique',                '/pt/especies/caique',                '/fr/especies/caique'],
  ['/especies/conuro-del-sol',        '/pt/especies/conuro-do-sol',         '/fr/especies/conure-soleil'],
  ['/especies/conuro-jenday',         '/pt/especies/conuro-jenday',         '/fr/especies/conure-jenday'],
  ['/especies/conuro-mejilla-verde',  '/pt/especies/conuro-faces-verdes',   '/fr/especies/conure-joues-vertes'],
  ['/especies/cotorra-monje',         '/pt/especies/periquito-monge',       '/fr/especies/perruche-moine'],
  ['/especies/lorikeet-arcoiris',     '/pt/especies/lorikeet-arco-iris',    '/fr/especies/loriquet-arc-en-ciel'],
  ['/especies/loro-pionus',           '/pt/especies/papagaio-pionus',       '/fr/especies/perroquet-pionus'],
  ['/especies/loro-senegal',          '/pt/especies/papagaio-senegal',      '/fr/especies/perroquet-du-senegal'],
  ['/especies/periquito-alejandrino', '/pt/especies/periquito-alexandrino', '/fr/especies/perruche-alexandre'],
  ['/especies/periquito-collar-indio','/pt/especies/periquito-colar-indiano','/fr/especies/perruche-a-collier'],
  // Hubs
  ['/especies/',                      '/pt/especies/',                      '/fr/especies/'],

  // FR-only macaw / unique species → best ES and PT equivalents
  // (no ES especies/ page exists for these; use legacy single-species pages)
  ['/guacamayos',       '/pt/arara-a-venda',            '/fr/especies/ara-bleu-et-jaune'],
  ['/guacamayos',       '/pt/arara-a-venda',            '/fr/especies/ara-chloroptere'],
  ['/guia-guacamayo-jacinto','/pt/arara-jacinto',        '/fr/especies/ara-hyacinthe'],
  ['/guacamayos',       '/pt/arara-escarlate',           '/fr/especies/ara-macao'],
  ['/cacatua',          '/pt/cacatua-de-crista-amarela', '/fr/especies/cacatoes-huppe-jaune'],
  ['/especies/caique',  '/pt/especies/caique',           '/fr/especies/caique-ventre-blanc'],
  ['/eclectus',         '/pt/papagaio-eclectus',         '/fr/especies/eclectus'],
  // grand-alexandre & perruche-royale share the closest ES/PT alejandrino page
  ['/especies/periquito-alejandrino','/pt/especies/periquito-alexandrino','/fr/especies/grand-alexandre'],
  ['/especies/periquito-alejandrino','/pt/especies/periquito-alexandrino','/fr/especies/perruche-royale'],
  ['/loro-gris-africano','/pt/papagaio-cinzento',        '/fr/especies/perroquet-gris-du-gabon'],
  ['/loro-amazonico',   '/pt/amazona-a-venda',           '/fr/especies/amazone-front-bleu'],
];

/* Build a lookup keyed by normalised path */
function norm(p) { return p.replace(/\/$/, '') || '/'; }

const byES = new Map();
const byPT = new Map();
const byFR = new Map();
for (const row of SPECIES_MAP) {
  const [es, pt, fr] = row.map(norm);
  byES.set(es, { es, pt, fr });
  if (pt) byPT.set(pt, { es, pt, fr });
  if (fr) byFR.set(fr, { es, pt, fr });
}

/* ─── UTIL: upsert a single <link rel="alternate"> tag ──────────────── */
function upsertAlternate(html, hreflang, href) {
  const tagRe = new RegExp(
    `<link[^>]+rel=["']alternate["'][^>]+hreflang=["']${hreflang}["'][^>]*>|` +
    `<link[^>]+hreflang=["']${hreflang}["'][^>]+rel=["']alternate["'][^>]*>`,
    'i'
  );
  const newTag = `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
  if (tagRe.test(html)) {
    return html.replace(tagRe, newTag);
  }
  // Insert before </head>
  return html.replace('</head>', `  ${newTag}\n</head>`);
}

/* ─── FIX A SINGLE FILE ─────────────────────────────────────────────── */
function fixFile(file, row) {
  const { es, pt, fr } = row;
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // Determine x-default: ES canonical (matches pattern on existing correct pages)
  const xDefault = BASE + es;

  html = upsertAlternate(html, 'es-ES', BASE + es);
  if (pt) html = upsertAlternate(html, 'pt-PT', BASE + pt);
  html = upsertAlternate(html, 'fr-FR', BASE + fr);
  html = upsertAlternate(html, 'x-default', xDefault);

  if (html !== original) {
    fs.writeFileSync(file, html);
    return true;
  }
  return false;
}

/* ─── PROCESS ALL FR ESPECIES PAGES ─────────────────────────────────── */
let fixed = 0, already = 0, notInMap = 0;
const frDir = 'fr/especies';
for (const entry of fs.readdirSync(frDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(frDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  const key = norm(`/fr/especies/${entry.name}`);
  const row = byFR.get(key);
  if (!row) {
    console.log(`  ⚠  No MAP row for ${key}`);
    notInMap++;
    continue;
  }
  const changed = fixFile(file, row);
  if (changed) { fixed++; console.log(`  ✓ Fixed  ${key}`); }
  else { already++; }
}

/* Also check ES and PT species pages for missing x-default ─────────── */
let esFixed = 0, ptFixed = 0;
const esDir = 'especies';
for (const entry of fs.readdirSync(esDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(esDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  const key = norm(`/especies/${entry.name}`);
  const row = byES.get(key);
  if (!row) continue;
  const changed = fixFile(file, row);
  if (changed) { esFixed++; console.log(`  ✓ Fixed ES ${key}`); }
}
const ptDir = 'pt/especies';
for (const entry of fs.readdirSync(ptDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(ptDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  const key = norm(`/pt/especies/${entry.name}`);
  const row = byPT.get(key);
  if (!row) continue;
  const changed = fixFile(file, row);
  if (changed) { ptFixed++; console.log(`  ✓ Fixed PT ${key}`); }
}

console.log(`\nHreflang fixes: FR=${fixed} (already-ok=${already} not-mapped=${notInMap}) ES=${esFixed} PT=${ptFixed}`);

/* ─── ADD MISSING MAP ENTRIES TO lang-switcher.js ───────────────────── */
const lsFile = 'lang-switcher.js';
let ls = fs.readFileSync(lsFile, 'utf8');

// New MAP rows for especies/ pages — skip if already present
const newRows = SPECIES_MAP
  .filter(([es, pt, fr]) => {
    const frKey = norm(fr);
    // Only add if both: it's an especies/ path AND not already in file
    return frKey.startsWith('/fr/especies/') && !ls.includes(frKey);
  })
  .map(([es, pt, fr]) => `    ['${es}', '${pt}', '${fr}'],`);

if (newRows.length === 0) {
  console.log('lang-switcher.js MAP: all especies entries already present.');
} else {
  // Insert after the comment line "// Species pages" or after the root row
  const insertAfter = "    ['/', '/pt/', '/fr/'],";
  const espComment = '\n    // ── Especies species pages ──────────────────────────────';
  const insertion = espComment + '\n' + newRows.join('\n');
  if (ls.includes(insertAfter)) {
    ls = ls.replace(insertAfter, insertAfter + insertion);
    fs.writeFileSync(lsFile, ls);
    console.log(`lang-switcher.js MAP: added ${newRows.length} especies entries.`);
  } else {
    console.error('ERROR: Could not find anchor in lang-switcher.js — MAP not updated.');
  }
}

/* ─── VERIFICATION REPORT ────────────────────────────────────────────── */
console.log('\n── Verification ──────────────────────────────────────────────');
let errors = 0;
for (const [es, pt, fr] of SPECIES_MAP) {
  // Only verify FR pages (the ones we fixed)
  const frKey = norm(fr);
  if (!frKey.startsWith('/fr/especies/')) continue;
  const slug = frKey.replace('/fr/especies/', '');
  if (slug === '') continue; // hub
  const file = `fr/especies/${slug}/index.html`;
  if (!fs.existsSync(file)) { console.log(`  SKIP (no file): ${file}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const checks = [
    ['es-ES', BASE + norm(es)],
    ['pt-PT', pt ? BASE + norm(pt) : null],
    ['fr-FR', BASE + frKey],
    ['x-default', BASE + norm(es)],
  ];
  let pageOk = true;
  for (const [hl, href] of checks) {
    if (!href) continue;
    const tagRe = new RegExp(`hreflang="${hl}"[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"`);
    const tagRe2 = new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"[^>]*hreflang="${hl}"`);
    if (!tagRe.test(html) && !tagRe2.test(html)) {
      console.log(`  ✗ ${slug}: missing ${hl} → ${href}`);
      errors++;
      pageOk = false;
    }
  }
  if (pageOk) console.log(`  ✓ ${slug}`);
}
console.log(errors === 0 ? '\nAll hreflang checks passed ✓' : `\n${errors} error(s) found ✗`);
