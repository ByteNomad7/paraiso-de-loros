#!/usr/bin/env node
/**
 * fix-city-hreflang.js
 * ────────────────────
 * Fixes hreflang on all PT and FR city pages and adds city-page
 * pattern fallbacks to lang-switcher.js so the JS switcher resolves
 * them to the correct language hub.
 *
 * Problems addressed:
 *  1. PT city pages (/pt/cidades/*): missing es-ES alternate
 *  2. FR city pages (/fr/perroquets-a-vendre-*): es-ES points to '/'
 *     instead of '/ciudades/', and pt-PT alternate is missing entirely
 *  3. lang-switcher.js resolveURL has no city-page pattern fallback,
 *     so switching language from a city page falls back to the
 *     language homepage instead of the correct city hub.
 *
 * Safe to re-run (idempotent).
 */
const fs   = require('fs');
const path = require('path');

const BASE = 'https://www.paraisodeaves.com';

/* ─── UTIL: upsert a <link rel="alternate"> tag ──────────────────── */
function upsertAlternate(html, hreflang, href) {
  const esc  = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tagRe = new RegExp(
    `<link[^>]+rel=["']alternate["'][^>]+hreflang=["']${esc(hreflang)}["'][^>]*\\s*/?>|` +
    `<link[^>]+hreflang=["']${esc(hreflang)}["'][^>]+rel=["']alternate["'][^>]*\\s*/?>`,
    'i'
  );
  const newTag = `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
  if (tagRe.test(html)) {
    return html.replace(tagRe, newTag);
  }
  // Insert before </head>
  return html.replace('</head>', `  ${newTag}\n</head>`);
}

/* ─── FIX PT CITY PAGES ─────────────────────────────────────────── */
const ptDir = 'pt/cidades';
let ptFixed = 0, ptAlready = 0;

for (const entry of fs.readdirSync(ptDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(ptDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // pt-PT → self (already present, ensure it's correct)
  const selfUrl = `${BASE}/pt/cidades/${entry.name}/`;
  html = upsertAlternate(html, 'pt-PT', selfUrl);
  // es-ES → /ciudades/ (best cross-language equivalent)
  html = upsertAlternate(html, 'es-ES', `${BASE}/ciudades/`);
  // x-default → / (already present, keep correct)
  html = upsertAlternate(html, 'x-default', `${BASE}/`);

  if (html !== original) {
    fs.writeFileSync(file, html);
    ptFixed++;
    console.log(`  ✓ PT fixed  /pt/cidades/${entry.name}/`);
  } else {
    ptAlready++;
  }
}

/* ─── FIX FR CITY PAGES ─────────────────────────────────────────── */
const frDir = 'fr';
let frFixed = 0, frAlready = 0;

for (const entry of fs.readdirSync(frDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  if (!entry.name.startsWith('perroquets-a-vendre-')) continue;

  const file = path.join(frDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // fr-FR → self (already present, ensure correct)
  const selfUrl = `${BASE}/fr/${entry.name}/`;
  html = upsertAlternate(html, 'fr-FR', selfUrl);
  // es-ES → /ciudades/ (was wrongly '/'; city category hub is the best equivalent)
  html = upsertAlternate(html, 'es-ES', `${BASE}/ciudades/`);
  // pt-PT → /pt/cidades/ (was missing; PT city hub is the best equivalent)
  html = upsertAlternate(html, 'pt-PT', `${BASE}/pt/cidades/`);
  // x-default → / (already present, keep correct)
  html = upsertAlternate(html, 'x-default', `${BASE}/`);

  if (html !== original) {
    fs.writeFileSync(file, html);
    frFixed++;
    console.log(`  ✓ FR fixed  /fr/${entry.name}/`);
  } else {
    frAlready++;
  }
}

console.log(`\nCity hreflang fixes: PT=${ptFixed} (already-ok=${ptAlready})  FR=${frFixed} (already-ok=${frAlready})`);

/* ─── UPDATE lang-switcher.js — add city-page pattern fallbacks ─── */
const lsFile = 'lang-switcher.js';
let ls = fs.readFileSync(lsFile, 'utf8');

// Only add if not already present
const CITY_BLOCK_MARKER = '// City page pattern fallbacks';
if (ls.includes(CITY_BLOCK_MARKER)) {
  console.log('\nlang-switcher.js: city fallbacks already present — skipped.');
} else {
  // Insert the city-page fallback block just before "// Language homepage fallback"
  const insertBefore = '    // Language homepage fallback';
  if (!ls.includes(insertBefore)) {
    console.error('ERROR: anchor not found in lang-switcher.js — city fallbacks not added.');
    process.exit(1);
  }

  const cityBlock = `    // City page pattern fallbacks
    // PT and FR city pages cover different countries; there is no 1:1 city
    // equivalent across languages. Resolve to the language's city-hub instead.
    if (currentLang === 'pt' && path.startsWith('/pt/cidades/')) {
      if (targetLang === 'es') return '/ciudades/';
      if (targetLang === 'fr') return '/fr/';
    }
    if (currentLang === 'fr' && /^\\/fr\\/perroquets-a-vendre-/.test(path)) {
      if (targetLang === 'es') return '/ciudades/';
      if (targetLang === 'pt') return '/pt/cidades/';
    }
    if (currentLang === 'es' && path.startsWith('/ciudades/') && path !== '/ciudades/') {
      if (targetLang === 'pt') return '/pt/cidades/';
      if (targetLang === 'fr') return '/fr/';
    }

`;

  ls = ls.replace(insertBefore, cityBlock + insertBefore);
  fs.writeFileSync(lsFile, ls);
  console.log('\nlang-switcher.js: city-page pattern fallbacks added ✓');
}

/* ─── MAP entries for city hub pages (already in MAP, but verify) ── */
const hubEntry = "'/ciudades/', '/pt/cidades/', '/fr/'";
if (ls.includes(hubEntry)) {
  console.log('lang-switcher.js MAP: city hub entry already present ✓');
} else {
  console.warn('WARNING: city hub MAP entry missing — check lang-switcher.js MAP manually.');
}

/* ─── VERIFICATION REPORT ────────────────────────────────────────── */
console.log('\n── Verification ──────────────────────────────────────────────');
let errors = 0;

// Check PT pages
for (const entry of fs.readdirSync(ptDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(ptDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const selfHref  = `${BASE}/pt/cidades/${entry.name}/`;
  const checks = [
    ['pt-PT',    selfHref],
    ['es-ES',    `${BASE}/ciudades/`],
    ['x-default',`${BASE}/`],
  ];
  let ok = true;
  for (const [hl, href] of checks) {
    if (!html.includes(`hreflang="${hl}"`) || !html.includes(`href="${href}"`)) {
      console.log(`  ✗ PT ${entry.name}: missing ${hl} → ${href}`);
      errors++; ok = false;
    }
  }
  if (ok) console.log(`  ✓ PT /pt/cidades/${entry.name}/`);
}

// Check FR pages (first 5 for brevity, then total)
let frChecked = 0, frErrors = 0;
for (const entry of fs.readdirSync(frDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || !entry.name.startsWith('perroquets-a-vendre-')) continue;
  const file = path.join(frDir, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  frChecked++;
  const html = fs.readFileSync(file, 'utf8');
  const checks = [
    ['fr-FR',    `${BASE}/fr/${entry.name}/`],
    ['es-ES',    `${BASE}/ciudades/`],
    ['pt-PT',    `${BASE}/pt/cidades/`],
    ['x-default',`${BASE}/`],
  ];
  let ok = true;
  for (const [hl, href] of checks) {
    if (!html.includes(`hreflang="${hl}"`) || !html.includes(`href="${href}"`)) {
      if (frErrors < 5) console.log(`  ✗ FR ${entry.name}: missing ${hl} → ${href}`);
      errors++; frErrors++; ok = false;
    }
  }
}
console.log(`  FR city pages checked: ${frChecked}  errors: ${frErrors}`);
console.log(errors === 0 ? '\nAll city hreflang checks passed ✓' : `\n${errors} error(s) found ✗`);
