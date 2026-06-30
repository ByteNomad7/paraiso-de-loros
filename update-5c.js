'use strict';
const fs = require('fs');

const a = require('./data-5c-a.js');
const a2 = require('./data-5c-a2.js');
const b = require('./data-5c-b.js');
const c = require('./data-5c-comparisons.js');
const all = [...a, ...a2, ...b, ...c];

// Badge → category label
function cat(badge) {
  if (!badge) return 'Guía';
  const b2 = badge.toLowerCase();
  if (b2.includes('compra') || b2.includes('presupuesto') || b2.includes('proceso') || b2.includes('reservar')) return 'Compra';
  if (b2.includes('salud') || b2.includes('veterinario') || b2.includes('cuarentena') || b2.includes('tóxico') || b2.includes('prevención') || b2.includes('peso') || b2.includes('pluma') || b2.includes('muda') || b2.includes('mental')) return 'Salud';
  if (b2.includes('legal') || b2.includes('registro') || b2.includes('documentación') || b2.includes('ley')) return 'Legalidad';
  if (b2.includes('comparativa') || b2.includes('compared') || b2.includes('vs')) return 'Comparativa';
  if (b2.includes('especie') || b2.includes('guía de especie') || b2.includes('inteligencia') || b2.includes('longevidad') || b2.includes('temperamento') || b2.includes('habla')) return 'Especies';
  if (b2.includes('adiestramiento') || b2.includes('trucos') || b2.includes('socialización')) return 'Adiestramiento';
  if (b2.includes('comportamiento') || b2.includes('ruido') || b2.includes('soledad') || b2.includes('enriquecimiento') || b2.includes('juego') || b2.includes('convivencia')) return 'Comportamiento';
  if (b2.includes('nutrición') || b2.includes('alimento') || b2.includes('alimentación')) return 'Cuidados';
  if (b2.includes('familia')) return 'Familia';
  return 'Cuidados';
}

// ── 1. blog/index.html ──────────────────────────────────────────────────────
let idx = fs.readFileSync('blog/index.html', 'utf8');

const newCount = 70 + all.length; // 70 + 76 = 146
idx = idx.replace(/70 Artículos · 5 Categorías/g, `${newCount} Artículos · 5 Categorías`);
idx = idx.replace(/70 Artículos — Todo/g, `${newCount} Artículos — Todo`);

const cards = all.map(art => {
  const excerpt = (art.desc || '').replace(/'/g, '&#39;').substring(0, 140);
  const label = cat(art.badge);
  const title = (art.title || '').replace(/'/g, '&#39;');
  return `      <article class="article-card">
        <div class="card-body" style="padding-top:1.8rem">
          <span class="card-cat">${label}</span>
          <h3 class="card-title">${title}</h3>
          <p class="card-excerpt">${excerpt}</p>
          <a class="btn-leer" href="/blog/${art.slug}.html">Leer más</a>
        </div>
      </article>`;
}).join('\n');

// Insert before the closing </div>\n  </div>\n</section> that wraps the article grid
idx = idx.replace(
  /(\s*<\/div>\s*<\/div>\s*<\/section>\s*<!-- CTA band -->)/,
  `\n${cards}\n\n    </div>\n  </div>\n</section>\n\n<!-- CTA band -->`
);

fs.writeFileSync('blog/index.html', idx);
console.log(`blog/index.html updated: counter ${newCount}, added ${all.length} cards`);

// ── 2. sitemap.xml ──────────────────────────────────────────────────────────
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

const sitemapEntries = all.map(art => {
  const priority = art.badge && art.badge.includes('Comparativa') ? '0.80' : '0.75';
  return `  <url><loc>https://www.paraisodeaves.com/blog/${art.slug}.html</loc><lastmod>2026-06-30</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
}).join('\n');

sitemap = sitemap.replace('</urlset>', `${sitemapEntries}\n</urlset>`);
fs.writeFileSync('sitemap.xml', sitemap);
console.log(`sitemap.xml updated: +${all.length} blog entries`);

// ── 3. _redirects ────────────────────────────────────────────────────────────
let redirects = fs.readFileSync('_redirects', 'utf8');

const section = `
# ══════════════════════════════════════════════════════
# SECTION 19 — PHASE 5C BLOG POSTS (76 articles)
# ══════════════════════════════════════════════════════
${all.map(art => `/blog/${art.slug}   /blog/${art.slug}.html   200`).join('\n')}
`;

redirects += section;
fs.writeFileSync('_redirects', redirects);
console.log(`_redirects updated: +${all.length} Phase 5C rewrites`);

console.log('Phase 5C completion DONE.');
