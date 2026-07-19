/**
 * fix-gsc-indexing.js
 * Corrige 3 problemas de indexación detectados en Google Search Console:
 *
 * 1. Blog canonical .html → clean URL (187 archivos)
 * 2. FR especies canonical sin barra final → con barra final (26 archivos)
 * 3. Latam pages canonical .html → clean URL (15 archivos)
 * 4. _redirects: añadir redirects PT blog slugs ES + /blog/banhar-papagaio.html
 * 5. _redirects: añadir rewrites trailing-slash para FR especies
 */

const fs = require('fs');
const path = require('path');

let totalFixed = 0;

// ─── Helper ──────────────────────────────────────────────────────────────────
function fixFile(filePath, replaceFn) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = replaceFn(original);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    totalFixed++;
    return true;
  }
  return false;
}

// ─── FIX 1: Blog canonical .html → clean URL ─────────────────────────────────
console.log('\n=== FIX 1: Blog canonical .html → clean URL ===');
const blogDir = path.join(__dirname, 'blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let blogFixed = 0;
for (const file of blogFiles) {
  const filePath = path.join(blogDir, file);
  const changed = fixFile(filePath, html =>
    html.replace(
      /(<link rel="canonical" href="https:\/\/www\.paraisodeaves\.com\/blog\/[^"]+)\.html"/g,
      '$1"'
    )
  );
  if (changed) blogFixed++;
}
console.log(`  Blog posts corregidos: ${blogFixed} / ${blogFiles.length}`);

// ─── FIX 2: FR especies canonical → trailing slash ───────────────────────────
console.log('\n=== FIX 2: FR especies canonical → trailing slash ===');
const frEspeciesDir = path.join(__dirname, 'fr', 'especies');
const frSlugs = fs.readdirSync(frEspeciesDir).filter(f => {
  return fs.statSync(path.join(frEspeciesDir, f)).isDirectory() && f !== 'index.html';
});

let frFixed = 0;
for (const slug of frSlugs) {
  const filePath = path.join(frEspeciesDir, slug, 'index.html');
  if (!fs.existsSync(filePath)) continue;
  const changed = fixFile(filePath, html =>
    html.replace(
      /(<link rel="canonical" href="https:\/\/www\.paraisodeaves\.com\/fr\/especies\/[^"/]+)("\s*\/>)/g,
      '$1/$2'
    )
  );
  if (changed) frFixed++;
}
console.log(`  FR especies corregidas: ${frFixed} / ${frSlugs.length}`);

// ─── FIX 3: Latam pages canonical .html → clean URL ─────────────────────────
console.log('\n=== FIX 3: Latam pages canonical .html → clean URL ===');
const latamCountries = [
  'ecuador', 'peru', 'colombia', 'argentina', 'chile', 'mexico',
  'venezuela', 'cuba', 'bolivia', 'costa-rica', 'panama',
  'paraguay', 'uruguay', 'republica-dominicana', 'puerto-rico'
];

let latamFixed = 0;
for (const country of latamCountries) {
  const filePath = path.join(__dirname, country, 'adoptar-loros.html');
  if (!fs.existsSync(filePath)) continue;
  const changed = fixFile(filePath, html =>
    html.replace(
      /(<link rel="canonical" href="https:\/\/www\.paraisodeaves\.com\/[^"]+)\.html"/g,
      '$1"'
    )
  );
  if (changed) latamFixed++;
}
console.log(`  Latam pages corregidas: ${latamFixed} / ${latamCountries.length}`);

// ─── FIX 4 & 5: _redirects ────────────────────────────────────────────────────
console.log('\n=== FIX 4 & 5: _redirects ===');
const redirectsPath = path.join(__dirname, '_redirects');
let redirects = fs.readFileSync(redirectsPath, 'utf8');

// 4a. PT blog Spanish-slug 404s → redirect to ES equivalents
const ptBlogMissing = [
  ['/pt/blog/pionus-loro-mascota',                              '/blog/pionus-loro-mascota'],
  ['/pt/blog/loro-yaco-en-ecuador-precio-cuidados-requisitos',  '/blog/loro-yaco-en-ecuador-precio-cuidados-requisitos'],
  ['/pt/blog/como-alimentar-un-loro-bebe',                      '/blog/como-alimentar-un-loro-bebe'],
  ['/pt/blog/comprar-loro-europa-envio',                        '/blog/comprar-loro-europa-envio'],
  ['/pt/blog/loro-amazonico-vs-eclectus',                       '/blog/loro-amazonico-vs-eclectus'],
  ['/pt/blog/amazona-loro-mascota',                             '/blog/amazona-loro-mascota'],
  ['/pt/blog/eclectus-vs-amazona',                              '/blog/eclectus-vs-amazona'],
  ['/pt/blog/cuidado-alas-loros',                               '/blog/cuidado-alas-loros'],
  ['/pt/blog/como-socializar-loro',                             '/blog/como-socializar-loro'],
  ['/blog/banhar-papagaio.html',                                '/pt/blog/banhar-papagaio'],
];

// 4b. FR especies trailing-slash rewrites (add where missing)
const frEspeciesForRedirects = frSlugs;
const frTrailingSlashRewrites = frEspeciesForRedirects.map(slug =>
  `/fr/especies/${slug}/   /fr/especies/${slug}/index.html   200`
);

// Build what to add — only entries not already present
const newRedirectLines = [];

for (const [from, to] of ptBlogMissing) {
  if (!redirects.includes(from)) {
    newRedirectLines.push(`${from.padEnd(60)}${to}   301`);
  }
}

// Insert PT blog section before the catch-all (last line)
const PT_SECTION_HEADER = '\n# SECTION — PT BLOG SPANISH-SLUG REDIRECTS (→ ES equivalents)\n';
if (newRedirectLines.length > 0 && !redirects.includes('PT BLOG SPANISH-SLUG')) {
  // Insert before the catch-all line at the end
  const catchAllPattern = /^\/\*\s*\/404\.html\s*404\s*$/m;
  if (catchAllPattern.test(redirects)) {
    redirects = redirects.replace(
      catchAllPattern,
      PT_SECTION_HEADER + newRedirectLines.join('\n') + '\n\n$&'
    );
    console.log(`  PT blog redirects añadidos: ${newRedirectLines.length}`);
  }
}

// Add FR especies trailing slash rewrites inside Section 25
const FR_TRAILING_MARKER = '# SECTION 25 — SPECIES PAGES (FR) /fr/especies/';
if (redirects.includes(FR_TRAILING_MARKER) && !redirects.includes('/fr/especies/perroquet-du-senegal/   ')) {
  // Find where section 25 ends (next blank line after last fr/especies entry)
  const section25Regex = /(# SECTION 25[^\n]*\n(?:\/fr\/especies[^\n]*\n)*)/;
  const trailingBlock = '\n# trailing-slash variants (avoid Netlify pretty-URL 301)\n' +
    frTrailingSlashRewrites.join('\n') + '\n';
  redirects = redirects.replace(
    section25Regex,
    (match) => match.trimEnd() + '\n' + trailingBlock + '\n'
  );
  console.log(`  FR especies trailing-slash rewrites añadidos: ${frTrailingSlashRewrites.length}`);
}

fs.writeFileSync(redirectsPath, redirects, 'utf8');

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log('\n=== RESUMEN ===');
console.log(`  Blog canonicals corregidos:            ${blogFixed}`);
console.log(`  FR especies canonicals (trailing /):   ${frFixed}`);
console.log(`  Latam canonicals corregidos:           ${latamFixed}`);
console.log(`  PT blog 404 redirects añadidos:        ${newRedirectLines.length}`);
console.log(`  FR especies trailing-slash rewrites:   ${frTrailingSlashRewrites.length}`);
console.log(`\n  Total archivos modificados: ${totalFixed}`);
