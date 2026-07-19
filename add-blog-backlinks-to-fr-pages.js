#!/usr/bin/env node
/**
 * add-blog-backlinks-to-fr-pages.js
 *
 * Adds "Articles de blog recommandés" sections to FR species and knowledge pages,
 * linking BACK to the relevant FR blog posts that discuss them.
 *
 * This completes the two-way internal link loop:
 *   FR blog posts → FR species/knowledge pages  (add-contextual-body-links-fr.js)
 *   FR species/knowledge pages → FR blog posts  (this script)
 *
 * Rules:
 *  - Injects a styled blog-post card section before the final CTA block
 *  - Skips any blog post URL already linked anywhere in the page
 *  - Idempotent: skips pages that already have the injected marker comment
 *  - At most 2 blog post links injected per page (the highest-relevance ones first)
 */

const fs   = require('fs');
const path = require('path');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

// ─── Blog post catalogue ──────────────────────────────────────────────────────
const BLOG = {
  'alimentation-perroquets':    { title: 'Alimentation des Perroquets : Guide Complet', tag: 'Alimentation', time: '7 min' },
  'ara-hyacinthe-guide':        { title: 'Ara Hyacinthe : Guide Complet pour la France', tag: 'Espèce', time: '9 min' },
  'choisir-eleveur-serieux':    { title: 'Comment Choisir un Éleveur de Perroquets Sérieux', tag: 'Adoption', time: '6 min' },
  'combien-vit-perroquet':      { title: 'Combien de Temps Vit un Perroquet ?', tag: 'Santé', time: '5 min' },
  'eclectus-guide':             { title: 'Perroquet Éclectus : Guide Complet pour la France', tag: 'Espèce', time: '8 min' },
  'guide-cites-france':         { title: 'Guide CITES France 2026 : Tout ce que Vous Devez Savoir', tag: 'CITES & Légalité', time: '8 min' },
  'meilleurs-perroquets-debutants': { title: 'Les 5 Meilleurs Perroquets pour les Débutants', tag: 'Guide', time: '6 min' },
  'perroquet-gris-du-gabon-guide':  { title: 'Perroquet Gris du Gabon : Guide Complet pour la France', tag: 'Espèce', time: '9 min' },
  'preparer-maison-perroquet':  { title: 'Comment Préparer sa Maison pour un Perroquet', tag: 'Bien-être', time: '5 min' },
  'prix-perroquet-france':      { title: "Prix d'un Perroquet en France 2026", tag: 'Prix & Tarifs', time: '6 min' },
  'quel-perroquet-choisir':     { title: 'Quel Perroquet Choisir ? Le Guide Complet', tag: 'Guide', time: '8 min' },
};

function blogUrl(slug) {
  return `https://www.paraisodeaves.com/fr/blog/${slug}/`;
}

// ─── Page → blog post mapping ─────────────────────────────────────────────────
// Each entry: page file path → ordered array of blog slugs (most relevant first)
const PAGE_LINKS = {
  // ── Species pages ─────────────────────────────────────────────────────────
  'fr/especies/ara-hyacinthe/index.html':          ['ara-hyacinthe-guide', 'guide-cites-france'],
  'fr/especies/perroquet-gris-du-gabon/index.html':['perroquet-gris-du-gabon-guide', 'combien-vit-perroquet'],
  'fr/especies/eclectus/index.html':               ['eclectus-guide', 'quel-perroquet-choisir'],
  'fr/especies/ara-bleu-et-jaune/index.html':      ['quel-perroquet-choisir', 'prix-perroquet-france'],
  'fr/especies/ara-macao/index.html':              ['quel-perroquet-choisir', 'prix-perroquet-france'],
  'fr/especies/ara-chloroptere/index.html':        ['quel-perroquet-choisir', 'combien-vit-perroquet'],
  'fr/especies/cacatoes-rosalbin/index.html':      ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/cacatoes-blanc/index.html':         ['combien-vit-perroquet', 'quel-perroquet-choisir'],
  'fr/especies/cacatoes-goffin/index.html':        ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/cacatoes-huppe-jaune/index.html':   ['combien-vit-perroquet', 'meilleurs-perroquets-debutants'],
  'fr/especies/conure-soleil/index.html':          ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/conure-jenday/index.html':          ['meilleurs-perroquets-debutants', 'prix-perroquet-france'],
  'fr/especies/conure-joues-vertes/index.html':    ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/caique/index.html':                 ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/caique-ventre-blanc/index.html':    ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/loriquet-arc-en-ciel/index.html':   ['alimentation-perroquets', 'quel-perroquet-choisir'],
  'fr/especies/perroquet-pionus/index.html':       ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/perroquet-du-senegal/index.html':   ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/perruche-a-collier/index.html':     ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/perruche-alexandre/index.html':     ['quel-perroquet-choisir', 'combien-vit-perroquet'],
  'fr/especies/grand-alexandre/index.html':        ['quel-perroquet-choisir', 'prix-perroquet-france'],
  'fr/especies/perruche-moine/index.html':         ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],
  'fr/especies/amazone-aile-orange/index.html':    ['combien-vit-perroquet', 'prix-perroquet-france'],
  'fr/especies/amazone-nuque-jaune/index.html':    ['combien-vit-perroquet', 'quel-perroquet-choisir'],
  'fr/especies/amazone-front-bleu/index.html':     ['prix-perroquet-france', 'quel-perroquet-choisir'],
  'fr/especies/perruche-royale/index.html':        ['meilleurs-perroquets-debutants', 'quel-perroquet-choisir'],

  // ── Knowledge pages ───────────────────────────────────────────────────────
  'fr/connaissances/alimentation/index.html': ['alimentation-perroquets', 'preparer-maison-perroquet'],
  'fr/connaissances/cites/index.html':        ['guide-cites-france', 'choisir-eleveur-serieux'],
  'fr/connaissances/sante/index.html':        ['combien-vit-perroquet', 'preparer-maison-perroquet'],
  'fr/connaissances/comportement/index.html': ['preparer-maison-perroquet', 'quel-perroquet-choisir'],
  'fr/connaissances/adoption/index.html':     ['choisir-eleveur-serieux', 'preparer-maison-perroquet'],
  'fr/connaissances/livraison/index.html':    ['choisir-eleveur-serieux', 'prix-perroquet-france'],
  'fr/connaissances/prix/index.html':         ['prix-perroquet-france', 'quel-perroquet-choisir'],
  'fr/connaissances/especes/index.html':      ['quel-perroquet-choisir', 'meilleurs-perroquets-debutants'],
};

// ─── HTML builders ────────────────────────────────────────────────────────────

/**
 * Build a single article card <a> element.
 */
function buildCard(slug) {
  const info = BLOG[slug];
  const url  = blogUrl(slug);
  return `<a href="${url}" class="article-card" style="display:block;color:inherit;text-decoration:none;">
  <div class="card-body">
    <span class="tag">${info.tag}</span>
    <h3>${info.title}</h3>
    <div class="meta">
      <span class="read-time">⏱ ${info.time} de lecture</span>
      <span class="read-link">Lire →</span>
    </div>
  </div>
</a>`;
}

/**
 * Build the full injected section containing 1–2 blog post cards.
 */
function buildSection(slugs) {
  const cards = slugs.map(buildCard).join('\n');
  return `
  <!-- BLOG-BACKLINKS: articles de blog liés — injecté par add-blog-backlinks-to-fr-pages.js -->
  <div class="otras-aves" style="margin-top:24px;">
    <h2>📰 Articles de blog recommandés</h2>
    <div class="article-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:14px;">
      ${cards}
    </div>
    <div style="margin-top:14px;text-align:right;">
      <a href="https://www.paraisodeaves.com/fr/blog/" style="font-size:.85rem;font-weight:700;color:var(--primary);">Voir tous nos articles →</a>
    </div>
  </div>
  <!-- /BLOG-BACKLINKS -->`;
}

// ─── Injection helpers ────────────────────────────────────────────────────────

/**
 * Find the injection point for a species page: just before <!-- FINAL CTA --> or
 * the opening <div class="final-cta"> tag.
 */
function findSpeciesInjectionPoint(html) {
  const markers = [
    '<!-- FINAL CTA -->',
    '<div class="final-cta">',
    '<div class="otras-aves">',
  ];
  for (const m of markers) {
    const idx = html.indexOf(m);
    if (idx !== -1) return idx;
  }
  return -1;
}

/**
 * Find the injection point for a knowledge page: just before <div class="cta-block".
 */
function findKnowledgeInjectionPoint(html) {
  const markers = [
    '<!-- CTA block -->',
    '<div class="cta-block"',
  ];
  for (const m of markers) {
    const idx = html.indexOf(m);
    if (idx !== -1) return idx;
  }
  return -1;
}

// ─── Process one file ─────────────────────────────────────────────────────────

function processFile(filePath, slugs) {
  if (!fs.existsSync(filePath)) {
    return { status: 'missing' };
  }

  let html = readFile(filePath);

  // Idempotency guard
  if (html.includes('BLOG-BACKLINKS')) {
    return { status: 'already_done' };
  }

  // Filter out slugs whose URL is already linked anywhere in the page
  const slugsToAdd = slugs.filter(slug => !html.includes(blogUrl(slug)));
  if (!slugsToAdd.length) {
    return { status: 'already_linked' };
  }
  // Cap at 2
  const finalSlugs = slugsToAdd.slice(0, 2);

  const section = buildSection(finalSlugs);

  // Determine page type from path
  const isSpecies    = filePath.includes('/especies/');
  const isKnowledge  = filePath.includes('/connaissances/');

  let injectionPoint = -1;
  if (isSpecies)   injectionPoint = findSpeciesInjectionPoint(html);
  if (isKnowledge) injectionPoint = findKnowledgeInjectionPoint(html);

  if (injectionPoint === -1) {
    return { status: 'no_injection_point' };
  }

  html = html.slice(0, injectionPoint) + section + '\n\n  ' + html.slice(injectionPoint);
  writeFile(filePath, html);
  return { status: 'updated', slugs: finalSlugs };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\n🔗 add-blog-backlinks-to-fr-pages — Adding blog post backlinks to FR species & knowledge pages\n');

const stats = { updated: 0, already_done: 0, already_linked: 0, missing: 0, no_injection_point: 0 };
const results = [];

for (const [filePath, slugs] of Object.entries(PAGE_LINKS)) {
  const result = processFile(filePath, slugs);
  stats[result.status] = (stats[result.status] || 0) + 1;
  results.push({ filePath, ...result });
}

// Report
console.log('Results:\n');
for (const r of results) {
  const label = path.dirname(r.filePath).replace('fr/', '').replace(/\//g, '/');
  if (r.status === 'updated') {
    console.log(`  ✓ ${label}  →  ${r.slugs.join(', ')}`);
  } else if (r.status === 'missing') {
    console.log(`  ✗ MISSING: ${r.filePath}`);
  } else if (r.status === 'no_injection_point') {
    console.log(`  ⚠ no injection point: ${r.filePath}`);
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Pages updated (new blog links added): ${stats.updated}`);
console.log(`Already had BLOG-BACKLINKS section:   ${stats.already_done || 0}`);
console.log(`All target blog posts already linked: ${stats.already_linked || 0}`);
console.log(`Missing files:                        ${stats.missing || 0}`);
console.log(`No injection point found:             ${stats.no_injection_point || 0}`);
console.log('\n✅ FR blog backlink injection complete.\n');
