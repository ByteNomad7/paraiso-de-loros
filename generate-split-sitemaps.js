'use strict';
const fs = require('fs');

const TODAY = '2026-06-30';
const BASE = 'https://www.paraisodeaves.com';

// Read current sitemap
const raw = fs.readFileSync('sitemap.xml', 'utf8');

// Extract all <url> blocks
const urlBlocks = [...raw.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[0]);

function extractLoc(block) {
  const m = block.match(/<loc>(.*?)<\/loc>/);
  return m ? m[1] : '';
}

function xmlHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
}

function buildSitemap(blocks) {
  return `${xmlHeader()}\n${blocks.join('\n')}\n</urlset>`;
}

// Classify each URL
const blogBlocks = urlBlocks.filter(b => extractLoc(b).includes('/blog/'));
const frBlocks = urlBlocks.filter(b => extractLoc(b).includes('/fr/'));
const ptBlocks = urlBlocks.filter(b => extractLoc(b).includes('/pt/'));
const cityBlocks = urlBlocks.filter(b => {
  const loc = extractLoc(b);
  return loc.includes('/ciudades/') || loc.includes('/comprar-loros-') || loc.includes('/ciudad/');
});
const speciesBlocks = urlBlocks.filter(b => {
  const loc = extractLoc(b);
  return (loc.includes('/loro-gris') || loc.includes('/guacamayo') || loc.includes('/cacatua') ||
          loc.includes('/amazona') || loc.includes('/eclectus') || loc.includes('/conuro') ||
          loc.includes('/agapornis') || loc.includes('/periquito') || loc.includes('/loros-especies') ||
          loc.includes('/available-birds') || loc.includes('/available-birds/')) &&
         !loc.includes('/blog/') && !loc.includes('/ciudades/') && !loc.includes('/pt/') && !loc.includes('/fr/');
});
const accessoryBlocks = urlBlocks.filter(b => {
  const loc = extractLoc(b);
  return (loc.includes('/jaulas') || loc.includes('/alimentacion') || loc.includes('/suplementos') ||
          loc.includes('/transportines') || loc.includes('/juguetes') || loc.includes('/perchas') ||
          loc.includes('/limpieza') || loc.includes('/salud-loros') || loc.includes('/accesorios') ||
          loc.includes('/galerias')) &&
         !loc.includes('/pt/') && !loc.includes('/fr/') && !loc.includes('/blog/');
});

// Remaining (main pages, buyer intent, etc.)
const classifiedLocs = new Set([
  ...blogBlocks, ...frBlocks, ...ptBlocks, ...cityBlocks, ...speciesBlocks, ...accessoryBlocks
].map(b => extractLoc(b)));
const mainBlocks = urlBlocks.filter(b => !classifiedLocs.has(extractLoc(b)));

// Write split sitemaps
fs.writeFileSync('sitemap_blog.xml', buildSitemap(blogBlocks));
fs.writeFileSync('sitemap_fr.xml', buildSitemap(frBlocks));
fs.writeFileSync('sitemap_pt.xml', buildSitemap(ptBlocks));
fs.writeFileSync('sitemap_cities.xml', buildSitemap(cityBlocks));
fs.writeFileSync('sitemap_species.xml', buildSitemap(speciesBlocks));
fs.writeFileSync('sitemap_accessories.xml', buildSitemap(accessoryBlocks));
fs.writeFileSync('sitemap_main.xml', buildSitemap(mainBlocks));

console.log('blog:', blogBlocks.length);
console.log('fr:', frBlocks.length);
console.log('pt:', ptBlocks.length);
console.log('cities:', cityBlocks.length);
console.log('species:', speciesBlocks.length);
console.log('accessories:', accessoryBlocks.length);
console.log('main:', mainBlocks.length);
console.log('total:', urlBlocks.length);

// Write sitemap index
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE}/sitemap_main.xml</loc><lastmod>${TODAY}</lastmod></sitemap>
  <sitemap><loc>${BASE}/sitemap_blog.xml</loc><lastmod>${TODAY}</lastmod></sitemap>
  <sitemap><loc>${BASE}/sitemap_cities.xml</loc><lastmod>${TODAY}</lastmod></sitemap>
  <sitemap><loc>${BASE}/sitemap_species.xml</loc><lastmod>${TODAY}</lastmod></sitemap>
  <sitemap><loc>${BASE}/sitemap_fr.xml</loc><lastmod>${TODAY}</lastmod></sitemap>
  <sitemap><loc>${BASE}/sitemap_pt.xml</loc><lastmod>${TODAY}</lastmod></sitemap>
  <sitemap><loc>${BASE}/sitemap_accessories.xml</loc><lastmod>${TODAY}</lastmod></sitemap>
</sitemapindex>`;

fs.writeFileSync('sitemap_index.xml', indexXml);
console.log('\n✅ Split sitemaps generated. sitemap_index.xml written.');
