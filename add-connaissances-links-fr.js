#!/usr/bin/env node
/**
 * add-connaissances-links-fr.js
 *
 * Adds INLINE contextual links to /fr/connaissances/ pages within <p> paragraph
 * text in FR species pages and FR city/location pages.
 *
 * Target files:
 *   - fr/especies/*\/index.html  (26 species pages)
 *   - fr/perroquets-a-vendre-*\/index.html  (50 city pages)
 *   - fr/acheter-ara/index.html, fr/acheter-gris-du-gabon/index.html,
 *     fr/acheter-perroquet/index.html, fr/adopter-perroquet/index.html,
 *     fr/eleveur-perroquets/index.html
 *
 * Rules:
 *  - Only touches <p>...</p> blocks in the main body region (not nav, footer, CTA, related)
 *  - Each <p> block is processed individually (lazy match — never spans tag boundaries)
 *  - Never links text already inside an <a> tag
 *  - Wraps the original term text with <a> (keeps natural reading; term IS the anchor)
 *  - At most 2 contextual links per page (one per target URL)
 *  - Skips URLs already linked anywhere in the body
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

function findTargetFiles() {
  const results = [];
  // Species pages
  try {
    const species = execSync('find fr/especies -name "index.html" -type f 2>/dev/null')
      .toString().trim().split('\n').filter(f => f && !f.endsWith('/especies/index.html'));
    results.push(...species);
  } catch { /* ignore */ }

  // City pages
  try {
    const cities = execSync('find fr -maxdepth 2 -name "index.html" -type f 2>/dev/null')
      .toString().trim().split('\n')
      .filter(f => f && /fr\/perroquets-a-vendre-/.test(f));
    results.push(...cities);
  } catch { /* ignore */ }

  // Hub city/location pages
  const hubPages = [
    'fr/acheter-ara/index.html',
    'fr/acheter-gris-du-gabon/index.html',
    'fr/acheter-perroquet/index.html',
    'fr/adopter-perroquet/index.html',
    'fr/eleveur-perroquets/index.html',
  ];
  for (const p of hubPages) {
    if (fs.existsSync(p)) results.push(p);
  }

  return results;
}

// ─── Link rules ────────────────────────────────────────────────────────────────
// Each rule: target slug + French terms that, when found in a <p>, get linked.
// Terms are specific multi-word phrases to avoid false positives.
const LINK_RULES = [
  // ── Alimentation ──────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/alimentation/',
    terms: [
      'alimentation équilibrée',
      'alimentation de qualité',
      'alimentation variée',
      'alimentation saine',
      'alimentation adaptée',
    ] },

  // ── Santé ─────────────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/sante/',
    terms: [
      'bilan vétérinaire',
      'suivi vétérinaire',
      'vétérinaire spécialisé',
      'soins vétérinaires',
      'vétérinaire aviaire',
    ] },

  // ── Comportement ──────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/comportement/',
    terms: [
      'bien-être de votre perroquet',
      'comportement de votre perroquet',
      'enrichissement comportemental',
      'comportements stéréotypés',
      'renforcement positif',
    ] },

  // ── Adoption ──────────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/adoption/',
    terms: [
      "processus d'adoption",
      "procédure d'adoption",
      'décision d\'adoption',
      'dossier d\'adoption',
    ] },

  // ── Prix ──────────────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/prix/',
    terms: [
      "budget d'adoption",
      'coût total de maintenance',
      'investissement considérable',
      'prix sur demande',
    ] },

  // ── CITES ─────────────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/cites/',
    terms: [
      'documentation CITES',
      'Annexe I CITES',
      'Annexe II CITES',
      'réglementation CITES',
      'certificat CITES',
    ] },

  // ── Livraison ─────────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/livraison/',
    terms: [
      'conditions de livraison',
      'modalités de livraison',
      'livraison sécurisée',
      'transport sécurisé',
      'transporteur spécialisé',
    ] },

  // ── Espèces ───────────────────────────────────────────────────────────────
  { slug: '/fr/connaissances/especes/',
    terms: [
      'guide des espèces',
      'guide des perroquets',
      'choisir votre espèce',
      'choisir son espèce',
      'choisir un perroquet',
    ] },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Return the [start, end) offsets of the main body region to search/inject.
 * Works for both species pages (section.species-article / div.article-body)
 * and city/hub pages (main.main-col / main).
 */
function getBodyBounds(html) {
  // Try multiple start markers in priority order
  const startMarkers = [
    '<div class="article-body">',
    '<section class="species-article">',
    '<main class="main-col">',
    '<main>',
    '<main ',
    '<article',
  ];

  let start = -1;
  for (const marker of startMarkers) {
    const idx = html.indexOf(marker);
    if (idx !== -1) { start = idx; break; }
  }
  if (start === -1) return null;

  // End markers — stop before CTA blocks, related grids, BLOG-BACKLINKS, footer
  const endMarkers = [
    '<!-- BLOG-BACKLINKS',
    'class="related-section"',
    'class="cta-inline"',
    'class="related"',
    'class="related-grid"',
    '</article>',
    '</main>',
    '<footer',
  ];

  let end = -1;
  for (const marker of endMarkers) {
    const idx = html.indexOf(marker, start + 1);
    if (idx !== -1 && (end === -1 || idx < end)) end = idx;
  }
  if (end === -1) return null;

  return { start, end };
}

/**
 * Within a single <p>...</p> block, wrap the first unlinked occurrence of
 * `term` with <a href="slug">term</a>.
 */
function linkTermInParagraph(pBlock, term, slug) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Split the pBlock on existing <a>...</a> spans so we never touch linked text.
  const parts = pBlock.split(/(<a[\s\S]*?<\/a>)/i);

  let replaced = false;
  const out = parts.map((part, i) => {
    if (i % 2 === 1) return part;   // existing <a>...</a> — leave untouched
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
console.log('\n🔗 add-connaissances-links-fr — Adding /fr/connaissances/ links to FR species & city pages\n');

const files = findTargetFiles();
console.log(`   Found ${files.length} target pages to process\n`);

let updated = 0;
let skipped = 0;

for (const file of files) {
  const wasChanged = processFile(file);
  if (wasChanged) {
    updated++;
    const label = file.replace(/\/index\.html$/, '').replace('fr/', 'fr/');
    console.log(`   ✓ ${label}`);
  } else {
    skipped++;
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Pages with new contextual links: ${updated}`);
console.log(`Pages unchanged (links already present or no match): ${skipped}`);
console.log('\n✅ FR connaissances contextual link injection complete.\n');
