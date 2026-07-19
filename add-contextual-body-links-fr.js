#!/usr/bin/env node
/**
 * add-contextual-body-links-fr.js
 *
 * Adds INLINE contextual links within <p> paragraph text in FR blog posts.
 * Adapted from add-contextual-body-links-pt.js for the /fr/blog/ section.
 *
 * Rules:
 *  - Only touches <p>...</p> blocks in the article body (not nav, footer, CTA, related)
 *  - Each <p> block is processed individually (lazy match — never spans tag boundaries)
 *  - Never links text already inside an <a> tag
 *  - Wraps the original term text with <a> (keeps natural reading; term IS the anchor)
 *  - At most 2 contextual links per post (one per target URL)
 *  - Skips URLs already linked anywhere in the body
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

function findBlogFiles() {
  try {
    return execSync('find fr/blog -name "index.html" -type f 2>/dev/null')
      .toString().trim().split('\n')
      .filter(f => f && f !== 'fr/blog/index.html' && !f.endsWith('/blog/index.html'));
  } catch { return []; }
}

// ─── Species rules ────────────────────────────────────────────────────────────
// Each rule: target slug + French terms that, when found in a <p>, get linked.
// The ORIGINAL matched text becomes the anchor (natural in-context link).
// Species rules first (highest SEO value), knowledge rules after.
const LINK_RULES = [
  // ── Species WITH dedicated /fr/especies/ page ─────────────────────────────
  { slug: '/fr/especies/ara-hyacinthe/',
    terms: ['Ara Hyacinthe', 'ara hyacinthe', 'Anodorhynchus hyacinthinus'] },

  { slug: '/fr/especies/perroquet-gris-du-gabon/',
    terms: ['Gris du Gabon', 'gris du Gabon', 'gris du gabon', 'Psittacus erithacus'] },

  { slug: '/fr/especies/ara-bleu-et-jaune/',
    terms: ['ara bleu et jaune', 'Ara bleu et jaune', 'Ara ararauna', 'ararauna'] },

  { slug: '/fr/especies/ara-macao/',
    terms: ['Ara macao', 'ara macao', 'ara rouge'] },

  { slug: '/fr/especies/ara-chloroptere/',
    terms: ['ara chloroptère', 'ara chloroptere', 'Ara chloroptère'] },

  { slug: '/fr/especies/cacatoes-rosalbin/',
    terms: ['rosalbin', 'Rosalbin', 'cacatoès rosalbin', 'cacatoes rosalbin'] },

  { slug: '/fr/especies/eclectus/',
    terms: ['Éclectus', 'éclectus', 'Eclectus', 'eclectus'] },

  { slug: '/fr/especies/cacatoes-blanc/',
    terms: ['cacatoès blanc', 'cacatoes blanc', 'Cacatoès blanc'] },

  { slug: '/fr/especies/cacatoes-goffin/',
    terms: ['cacatoès goffin', 'cacatoes goffin', 'Goffin'] },

  { slug: '/fr/especies/cacatoes-huppe-jaune/',
    terms: ['cacatoès à huppe jaune', 'cacatoès huppe jaune', 'cacatoes huppe jaune'] },

  { slug: '/fr/especies/conure-soleil/',
    terms: ['conure soleil', 'conure du soleil', 'Conure soleil', 'Aratinga solstitialis'] },

  { slug: '/fr/especies/conure-jenday/',
    terms: ['conure jenday', 'Conure jenday'] },

  { slug: '/fr/especies/conure-joues-vertes/',
    terms: ['conure joues vertes', 'conure à joues vertes', 'Conure joues vertes'] },

  { slug: '/fr/especies/caique/',
    terms: ['caïque', 'caique', 'Caïque'] },

  { slug: '/fr/especies/loriquet-arc-en-ciel/',
    terms: ['loriquet arc-en-ciel', 'loriquet arc en ciel', 'Loriquet arc-en-ciel'] },

  { slug: '/fr/especies/perroquet-pionus/',
    terms: ['perroquet pionus', 'Pionus', 'pionus'] },

  { slug: '/fr/especies/perroquet-du-senegal/',
    terms: ['perroquet du Sénégal', 'perroquet du senegal', 'Poicephalus senegalus'] },

  { slug: '/fr/especies/perruche-a-collier/',
    terms: ['perruche à collier', 'perruche a collier', 'Psittacula krameri'] },

  { slug: '/fr/especies/perruche-alexandre/',
    terms: ['perruche alexandre', 'Perruche alexandre'] },

  { slug: '/fr/especies/grand-alexandre/',
    terms: ['grand alexandre', 'Grand Alexandre'] },

  { slug: '/fr/especies/perruche-moine/',
    terms: ['perruche moine', 'Perruche moine', 'Myiopsitta monachus'] },

  { slug: '/fr/especies/amazone-aile-orange/',
    terms: ['amazone aile orange', 'amazone à aile orange', 'Amazone aile orange'] },

  { slug: '/fr/especies/amazone-nuque-jaune/',
    terms: ['amazone nuque jaune', 'amazone à nuque jaune', 'Amazone nuque jaune'] },

  { slug: '/fr/especies/amazone-front-bleu/',
    terms: ['amazone front bleu', 'amazone à front bleu', 'Amazone front bleu'] },

  { slug: '/fr/especies/perruche-royale/',
    terms: ['perruche royale', 'Perruche royale'] },

  // ── Knowledge section rules — /fr/connaissances/ ──────────────────────────
  // Uses specific multi-word phrases so matches are targeted, not accidental.
  { slug: '/fr/connaissances/cites/',
    terms: ['documentation CITES', 'Annexe I CITES', 'réglementation CITES'] },

  { slug: '/fr/connaissances/alimentation/',
    terms: ['alimentation équilibrée', 'alimentation de qualité'] },

  { slug: '/fr/connaissances/sante/',
    terms: ['soins vétérinaires', 'suivi vétérinaire'] },

  { slug: '/fr/connaissances/comportement/',
    terms: ['bien-être de votre perroquet', 'comportement de votre perroquet'] },

  { slug: '/fr/connaissances/adoption/',
    terms: ['processus d\'adoption', 'procédure d\'adoption'] },

  { slug: '/fr/connaissances/livraison/',
    terms: ['conditions de livraison', 'modalités de livraison'] },

  { slug: '/fr/connaissances/prix/',
    terms: ['budget d\'adoption', 'coût total de maintenance'] },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Return the [start, end) offsets of the article body: the region between
 * the opening <article>/<main> tag and the first CTA/related/footer block.
 */
function getBodyBounds(html) {
  const starts = [
    html.indexOf('<article'),
    html.indexOf('<main'),
  ].filter(i => i !== -1);
  if (!starts.length) return null;
  const start = Math.min(...starts);

  const ends = [
    html.indexOf('class="cta-inline"'),
    html.indexOf('class="related"'),
    html.indexOf('class="related-grid"'),
    html.indexOf('data-species-ref'),
    html.indexOf('</article>'),
    html.indexOf('</main>'),
    html.indexOf('<footer'),
  ].filter(i => i !== -1 && i > start);
  if (!ends.length) return null;

  return { start, end: Math.min(...ends) };
}

/**
 * Within a single <p>...</p> block (no nested <p>), wrap the first unlinked
 * occurrence of `term` with <a href="slug">term</a>.
 * "Unlinked" means not already inside <a>...</a>.
 */
function linkTermInParagraph(pBlock, term, slug) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Split the pBlock on existing <a>...</a> spans so we never touch linked text.
  const parts = pBlock.split(/(<a[\s\S]*?<\/a>)/i);

  let replaced = false;
  const out = parts.map((part, i) => {
    // Odd parts (1, 3, …) are existing <a>...</a> — leave untouched
    if (i % 2 === 1) return part;
    if (replaced) return part;

    // Word-boundary pattern that handles French accented characters
    const re = new RegExp(
      `(^|[^a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ])(${escaped})(?=[^a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ]|$)`,
      'i'
    );
    const newPart = part.replace(re, (m, pre, match) => {
      replaced = true;
      return `${pre}<a href="${slug}">${match}</a>`;
    });
    return newPart;
  });

  return replaced ? out.join('') : null;
}

function processFile(file) {
  let html = readFile(file);
  const bounds = getBodyBounds(html);
  if (!bounds) return false;

  const { start, end } = bounds;
  let body = html.slice(start, end);

  // Track which slugs are already linked INSIDE the body region
  const alreadyLinkedInBody = new Set();
  for (const rule of LINK_RULES) {
    if (body.includes(`href="${rule.slug}"`)) {
      alreadyLinkedInBody.add(rule.slug);
    }
  }

  let linksAdded = 0;
  let changed = false;

  for (const rule of LINK_RULES) {
    if (linksAdded >= 2) break;
    if (alreadyLinkedInBody.has(rule.slug)) continue;

    // Does the body mention any of this rule's terms at all?
    const bodyLower = body.toLowerCase();
    const matchingTerm = rule.terms.find(t => bodyLower.includes(t.toLowerCase()));
    if (!matchingTerm) continue;

    // Find <p>...</p> blocks within the body and try to inject the link
    let injected = false;

    const newBody = body.replace(/<p(?:\s[^>]*)?>[\s\S]*?<\/p>/gi, (pBlock) => {
      if (injected) return pBlock;
      const result = linkTermInParagraph(pBlock, matchingTerm, rule.slug);
      if (result) {
        injected = true;
        return result;
      }
      return pBlock;
    });

    if (injected) {
      body = newBody;
      alreadyLinkedInBody.add(rule.slug);
      linksAdded++;
      changed = true;
    }
  }

  if (changed) {
    html = html.slice(0, start) + body + html.slice(end);
    writeFile(file, html);
  }
  return changed;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('\n🔗 add-contextual-body-links-fr — Adding inline contextual links to FR blog posts\n');

const files = findBlogFiles();
console.log(`   Found ${files.length} FR blog posts to process\n`);

let updated = 0;
let skipped = 0;

for (const file of files) {
  const wasChanged = processFile(file);
  if (wasChanged) {
    updated++;
    console.log(`   ✓ ${path.basename(path.dirname(file))}`);
  } else {
    skipped++;
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Posts with new contextual links: ${updated}`);
console.log(`Posts unchanged (links already present or no match): ${skipped}`);
console.log('\n✅ FR contextual body link injection complete.\n');
