#!/usr/bin/env node
/**
 * add-contextual-body-links.js
 *
 * Adds INLINE contextual links within <p> paragraph text in blog posts.
 * These are the highest-SEO-value links: descriptive anchor text embedded
 * inside content, not just CTA blocks at the end.
 *
 * Rules:
 *  - Only touches <p>...</p> blocks in the article body (not nav, footer, CTA, related)
 *  - Each <p> block is processed individually (lazy match — never spans tag boundaries)
 *  - Never links text already inside an <a> tag
 *  - Wraps the original term text with <a> (keeps natural reading; term IS the anchor)
 *  - At most 2 contextual links per post (one per target URL)
 *  - Skips URLs already linked anywhere in the file (except /aves-disponibles/ which
 *    appears in nav/CTA — we still add body links for it)
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

function findBlogFiles() {
  try {
    return execSync('find blog -name "*.html" -type f 2>/dev/null')
      .toString().trim().split('\n').filter(f => f && !f.includes('/index.html'));
  } catch { return []; }
}

// ─── Species rules ────────────────────────────────────────────────────────────
// Each rule: target slug + terms that, when found in a <p>, get linked.
// The ORIGINAL matched text becomes the anchor (natural in-context link).
const SPECIES_RULES = [
  { slug: '/especies/cacatua-blanca/',
    terms: ['cacatúa blanca', 'cacatua blanca', 'cacatua alba', 'cacatúa alba'] },
  { slug: '/especies/cacatua-galah/',
    terms: ['cacatúa galah', 'cacatua galah', 'galah'] },
  { slug: '/especies/cacatua-goffin/',
    terms: ['cacatúa goffin', 'cacatua goffin', 'goffin'] },
  { slug: '/especies/amazona-ala-naranja/',
    terms: ['amazona ala naranja', 'amazona de ala naranja'] },
  { slug: '/especies/amazona-nuca-amarilla/',
    terms: ['amazona nuca amarilla', 'amazona de nuca amarilla', 'amazona auropalliata'] },
  { slug: '/especies/conuro-del-sol/',
    terms: ['conuro del sol'] },
  { slug: '/especies/conuro-jenday/',
    terms: ['conuro jenday', 'conuro de jenday'] },
  { slug: '/especies/conuro-mejilla-verde/',
    terms: ['conuro de mejilla verde', 'conuro mejilla verde', 'cotorra de mejillas verdes'] },
  { slug: '/especies/cotorra-monje/',
    terms: ['cotorra monje', 'cotorra argentina', 'myiopsitta monachus'] },
  { slug: '/especies/caique/',
    terms: ['caique', 'loro caique', 'loro caiqué'] },
  { slug: '/especies/lorikeet-arcoiris/',
    terms: ['lorikeet arcoíris', 'lorikeet arcoiris', 'lori arcoíris'] },
  { slug: '/especies/loro-pionus/',
    terms: ['loro pionus', 'loro Pionus'] },
  { slug: '/especies/loro-senegal/',
    terms: ['loro senegal', 'loro del senegal', 'poicephalus senegalus'] },
  { slug: '/especies/periquito-alejandrino/',
    terms: ['periquito alejandrino'] },
  { slug: '/especies/periquito-collar-indio/',
    terms: ['periquito collar indio', 'periquito de collar', 'psittacula krameri'] },
  // ── No dedicated species page → /aves-disponibles/ ────────────────────────
  { slug: '/aves-disponibles/',
    terms: ['guacamayo ararauna', 'guacamayo azul y amarillo', 'ararauna'] },
  { slug: '/aves-disponibles/',
    terms: ['guacamayo escarlata', 'Ara macao'] },
  { slug: '/aves-disponibles/',
    terms: ['guacamayo jacinto', 'Anodorhynchus hyacinthinus'] },
  { slug: '/aves-disponibles/',
    terms: ['loro gris africano', 'Psittacus erithacus'] },
  { slug: '/aves-disponibles/',
    terms: ['yaco'] },
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
  // Pattern: split into [non-link, link, non-link, link, ...]
  const parts = pBlock.split(/(<a[\s\S]*?<\/a>)/i);

  let replaced = false;
  const out = parts.map((part, i) => {
    // Odd parts (1, 3, …) are existing <a>...</a> — leave untouched
    if (i % 2 === 1) return part;
    if (replaced) return part;

    // Even parts: plain text + other tags. Try to replace first occurrence of term.
    // We use a word-boundary-like match but also handle special chars in Spanish.
    const re = new RegExp(`(^|[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])(${escaped})(?=[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]|$)`, 'i');
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

  // Track which slugs are already linked INSIDE the body region specifically
  // (we skip species-page slugs already linked in the body; for /aves-disponibles/
  // we allow adding body links even if the CTA/nav already link there)
  const alreadyLinkedInBody = new Set();
  for (const rule of SPECIES_RULES) {
    if (rule.slug === '/aves-disponibles/') continue; // always eligible
    if (body.includes(`href="${rule.slug}"`)) {
      alreadyLinkedInBody.add(rule.slug);
    }
  }

  let linksAdded = 0;
  let changed = false;

  // Also track /aves-disponibles/ body links we add in this run (cap at 1)
  const addedAvesDisponibles = body.includes(`href="/aves-disponibles/"`) &&
    !body.includes('cta-inline') && !body.includes('related');
  // ^ if there's already a non-CTA /aves-disponibles/ link in body, skip
  let avesDisponiblesAdded = addedAvesDisponibles;

  for (const rule of SPECIES_RULES) {
    if (linksAdded >= 2) break;
    if (alreadyLinkedInBody.has(rule.slug)) continue;
    if (rule.slug === '/aves-disponibles/' && avesDisponiblesAdded) continue;

    // Does the body mention any of this rule's terms at all?
    const bodyLower = body.toLowerCase();
    const matchingTerm = rule.terms.find(t => bodyLower.includes(t.toLowerCase()));
    if (!matchingTerm) continue;

    // Now find <p>...</p> blocks within the body and try to inject the link
    let injected = false;

    // Replace lazily: each <p>...</p> block processed individually
    const newBody = body.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, (pBlock) => {
      if (injected) return pBlock; // already did it for this rule
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
      if (rule.slug === '/aves-disponibles/') avesDisponiblesAdded = true;
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
console.log('\n🔗 add-contextual-body-links — Adding inline contextual links to blog posts\n');

const files = findBlogFiles();
console.log(`   Found ${files.length} blog posts to process\n`);

let updated = 0;
let skipped = 0;

for (const file of files) {
  const wasChanged = processFile(file);
  if (wasChanged) {
    updated++;
    console.log(`   ✓ ${path.basename(file)}`);
  } else {
    skipped++;
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Posts with new contextual links: ${updated}`);
console.log(`Posts unchanged (links already present or no match): ${skipped}`);
console.log('\n✅ Contextual body link injection complete.\n');
