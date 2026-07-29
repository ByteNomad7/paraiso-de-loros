#!/usr/bin/env node
/**
 * ping-sitemaps.js
 * Prints the exact GSC sitemap submission URLs for paraisodeaves.com.
 *
 * Background: Both Google (/ping, removed 2023) and Bing (/ping, removed 2023)
 * dropped their public sitemap-ping endpoints. The only way to notify Google is
 * to submit sitemaps manually inside Google Search Console.
 *
 * Usage:
 *   node ping-sitemaps.js
 *
 * Then paste the printed GSC links into your browser and click Submit/Resubmit.
 */

const DOMAIN = 'https://www.paraisodeaves.com';

const SITEMAPS = [
  { file: 'sitemap_index.xml', note: 'Index of all split sitemaps — submit first' },
  { file: 'sitemap_main.xml',  note: 'ES core pages' },
  { file: 'sitemap_blog.xml',  note: 'ES blog posts' },
  { file: 'sitemap_cities.xml', note: 'ES city pages' },
  { file: 'sitemap_species.xml', note: 'Species pages ES/PT/FR' },
  { file: 'sitemap_es_especies.xml', note: 'ES /es/especies/ category pages' },
  { file: 'sitemap_fr.xml',    note: 'FR pages' },
  { file: 'sitemap_pt.xml',    note: 'PT pages' },
  { file: 'sitemap_accessories.xml', note: 'Accessory pages' },
  { file: 'sitemap_en.xml',    note: 'EN pages' },
];

function gscSitemapsUrl(propertyId) {
  return `https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(propertyId)}`;
}

console.log('=== paraisodeaves.com — Sitemap Submission Checklist ===\n');

console.log('NOTE: Both Google and Bing removed their public sitemap-ping endpoints in 2023.');
console.log('Sitemaps must be submitted manually in Google Search Console.\n');

// ── Main property ──────────────────────────────────────────────────────────
console.log('━━━ 1. Main Property (sc-domain:paraisodeaves.com) ━━━');
console.log(`Open: ${gscSitemapsUrl('sc-domain:paraisodeaves.com')}\n`);
console.log('Submit these sitemaps (paste filename, click Submit/Resubmit):\n');
SITEMAPS.forEach(({ file, note }) => {
  console.log(`  [ ] ${file.padEnd(30)} — ${note}`);
  console.log(`      ${DOMAIN}/${file}`);
});

// ── Portugal prefix property ────────────────────────────────────────────────
console.log('\n━━━ 2. Portugal Prefix Property (https://www.paraisodeaves.com/pt/) ━━━');
console.log('  a) Add property → URL prefix → https://www.paraisodeaves.com/pt/');
console.log('  b) Verify with HTML tag → add meta tag to pt/index.html → Verify');
console.log(`  c) Open: ${gscSitemapsUrl('https://www.paraisodeaves.com/pt/')}`);
console.log(`  d) Submit: ${DOMAIN}/sitemap_pt.xml`);

// ── English prefix property ─────────────────────────────────────────────────
console.log('\n━━━ 3. English Prefix Property (https://www.paraisodeaves.com/en/) ━━━');
console.log('  a) Add property → URL prefix → https://www.paraisodeaves.com/en/');
console.log('  b) Verify with HTML tag → add meta tag to en/index.html → Verify');
console.log(`  c) Open: ${gscSitemapsUrl('https://www.paraisodeaves.com/en/')}`);
console.log(`  d) Submit: ${DOMAIN}/sitemap_en.xml`);

// ── URL Inspection (manual request indexing) ────────────────────────────────
console.log('\n━━━ 4. Priority URLs — Request Indexing via URL Inspection ━━━');
console.log('In GSC, press "i" to open URL Inspection, paste each URL, click "Request Indexing".');
console.log('Limit: ~10 requests/day per property. Spread over 2–3 days.\n');

const priority = [
  `${DOMAIN}/en/`,
  `${DOMAIN}/en/available-birds/`,
  `${DOMAIN}/en/delivery/`,
  `${DOMAIN}/pt/`,
  `${DOMAIN}/pt/aves-disponiveis/`,
  `${DOMAIN}/fr/`,
  `${DOMAIN}/fr/oiseaux-disponibles/`,
  `${DOMAIN}/pt/especies/guacamayo-jacinto/`,
  `${DOMAIN}/pt/especies/loro-gris-africano/`,
  `${DOMAIN}/fr/especies/ara-hyacinthe/`,
  `${DOMAIN}/fr/especies/perroquet-gris/`,
  `${DOMAIN}/en/species/hyacinth-macaw/`,
  `${DOMAIN}/en/species/african-grey/`,
  `${DOMAIN}/en/knowledge/`,
  `${DOMAIN}/es/especies/`,
];
priority.forEach((url) => console.log(`  [ ] ${url}`));

console.log('\nFull guide: docs/gsc-indexing-guide.md\n');
