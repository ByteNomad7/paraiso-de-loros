#!/usr/bin/env node
/**
 * add-contextual-body-links-pt.js
 *
 * Adds INLINE contextual links within <p> paragraph text in PT blog posts.
 * Adapted from add-contextual-body-links.js for the /pt/blog/ section.
 *
 * Rules:
 *  - Only touches <p>...</p> blocks in the article body (not nav, footer, CTA, related)
 *  - Each <p> block is processed individually (lazy match — never spans tag boundaries)
 *  - Never links text already inside an <a> tag
 *  - Wraps the original term text with <a> (keeps natural reading; term IS the anchor)
 *  - At most 2 contextual links per post (one per target URL)
 *  - Skips URLs already linked anywhere in the body (except /pt/papagaios-disponiveis/
 *    which appears in nav/CTA — we still add body links for it)
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

function findBlogFiles() {
  try {
    return execSync('find pt/blog -name "index.html" -type f 2>/dev/null')
      .toString().trim().split('\n')
      .filter(f => f && f !== 'pt/blog/index.html' && !f.endsWith('/blog/index.html'));
  } catch { return []; }
}

// ─── Species rules ────────────────────────────────────────────────────────────
// Each rule: target slug + Portuguese terms that, when found in a <p>, get linked.
// The ORIGINAL matched text becomes the anchor (natural in-context link).
const SPECIES_RULES = [
  // ── Species WITH dedicated /pt/especies/ page ────────────────────────────
  { slug: '/pt/especies/cacatua-branca/',
    terms: ['cacatua branca', 'cacatua-branca', 'cacatua alba', 'cacatua da coroa branca'] },
  { slug: '/pt/especies/cacatua-galah/',
    terms: ['cacatua galah', 'galah'] },
  { slug: '/pt/especies/cacatua-goffin/',
    terms: ['cacatua goffin', 'goffin'] },
  { slug: '/pt/especies/amazona-asa-laranja/',
    terms: ['amazona asa laranja', 'amazona-asa-laranja', 'amazona de asa laranja', 'amazona auropalliata'] },
  { slug: '/pt/especies/amazona-nuca-amarela/',
    terms: ['amazona nuca amarela', 'amazona-nuca-amarela', 'amazona de nuca amarela'] },
  { slug: '/pt/especies/conuro-do-sol/',
    terms: ['conuro do sol', 'conuro-do-sol', 'periquito do sol', 'aratinga do sol'] },
  { slug: '/pt/especies/conuro-jenday/',
    terms: ['conuro jenday', 'conuro-jenday', 'jandaia'] },
  { slug: '/pt/especies/conuro-faces-verdes/',
    terms: ['conuro faces verdes', 'conuro-faces-verdes', 'periquito faces verdes'] },
  { slug: '/pt/especies/periquito-monge/',
    terms: ['periquito monge', 'periquito-monge', 'cotorra monge', 'myiopsitta monachus'] },
  { slug: '/pt/especies/caique/',
    terms: ['caique', 'papagaio caique'] },
  { slug: '/pt/especies/lorikeet-arco-iris/',
    terms: ['lorikeet arco-íris', 'lorikeet arco iris', 'lori arco-íris', 'lori arco iris', 'lorikeet arcoíris'] },
  { slug: '/pt/especies/papagaio-pionus/',
    terms: ['papagaio pionus', 'pionus'] },
  { slug: '/pt/especies/papagaio-senegal/',
    terms: ['papagaio senegal', 'loro senegal', 'poicephalus senegalus'] },
  { slug: '/pt/especies/periquito-alexandrino/',
    terms: ['periquito alexandrino'] },
  { slug: '/pt/especies/periquito-colar-indiano/',
    terms: ['periquito colar indiano', 'periquito de colar', 'psittacula krameri'] },

  // ── Species WITHOUT dedicated PT page → /pt/papagaios-disponiveis/ ───────
  { slug: '/pt/papagaios-disponiveis/',
    terms: ['arara jacinto', 'Anodorhynchus hyacinthinus', 'arara-jacinto'] },
  { slug: '/pt/papagaios-disponiveis/',
    terms: ['papagaio cinzento africano', 'Psittacus erithacus', 'yaco'] },
  { slug: '/pt/papagaios-disponiveis/',
    terms: ['arara azul e amarela', 'arara ararauna', 'ararauna'] },
  { slug: '/pt/papagaios-disponiveis/',
    terms: ['arara vermelha', 'arara escarlate', 'Ara macao'] },
  { slug: '/pt/papagaios-disponiveis/',
    terms: ['eclectus'] },
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

    // Word-boundary pattern that handles Portuguese accented chars
    const re = new RegExp(
      `(^|[^a-zA-ZáéíóúÁÉÍÓÚâêôÂÊÔãõÃÕàÀüÜçÇ])(${escaped})(?=[^a-zA-ZáéíóúÁÉÍÓÚâêôÂÊÔãõÃÕàÀüÜçÇ]|$)`,
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
  // (skip species-page slugs already linked in body; for /pt/papagaios-disponiveis/
  // we allow adding body links even if CTA/nav already link there)
  const alreadyLinkedInBody = new Set();
  for (const rule of SPECIES_RULES) {
    if (rule.slug === '/pt/papagaios-disponiveis/') continue;
    if (body.includes(`href="${rule.slug}"`)) {
      alreadyLinkedInBody.add(rule.slug);
    }
  }

  let linksAdded = 0;
  let changed = false;

  // Check if /pt/papagaios-disponiveis/ is already linked in body (outside CTA)
  const papagaiosBodyLinked = body.includes(`href="/pt/papagaios-disponiveis/"`) &&
    !body.includes('cta-inline') && !body.includes('related');
  let papagaiosAdded = papagaiosBodyLinked;

  for (const rule of SPECIES_RULES) {
    if (linksAdded >= 2) break;
    if (alreadyLinkedInBody.has(rule.slug)) continue;
    if (rule.slug === '/pt/papagaios-disponiveis/' && papagaiosAdded) continue;

    // Does the body mention any of this rule's terms at all?
    const bodyLower = body.toLowerCase();
    const matchingTerm = rule.terms.find(t => bodyLower.includes(t.toLowerCase()));
    if (!matchingTerm) continue;

    // Find <p>...</p> blocks within the body and try to inject the link
    let injected = false;

    // Use (?:\s[^>]*)? so <p> or <p class="..."> matches but NOT <picture>, <pre>, etc.
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
      if (rule.slug === '/pt/papagaios-disponiveis/') papagaiosAdded = true;
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
console.log('\n🔗 add-contextual-body-links-pt — Adding inline contextual links to PT blog posts\n');

const files = findBlogFiles();
console.log(`   Found ${files.length} PT blog posts to process\n`);

let updated = 0;
let skipped = 0;
const updatedFiles = [];

for (const file of files) {
  const wasChanged = processFile(file);
  if (wasChanged) {
    updated++;
    updatedFiles.push(path.basename(path.dirname(file)));
    console.log(`   ✓ ${path.basename(path.dirname(file))}`);
  } else {
    skipped++;
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Posts with new contextual links: ${updated}`);
console.log(`Posts unchanged (links already present or no match): ${skipped}`);
console.log('\n✅ PT contextual body link injection complete.\n');
