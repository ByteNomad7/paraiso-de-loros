#!/usr/bin/env node
/**
 * add-blog-backlinks-to-en-pages.js
 *
 * Adds "Recommended Reading" sections to EN species and knowledge pages,
 * linking BACK to the relevant EN knowledge-hub guides that discuss them.
 *
 * The EN section has no separate /en/blog/ directory — the knowledge hub
 * (/en/knowledge/*) serves as the EN long-form content equivalent of blog posts.
 *
 * This completes the two-way internal link loop for the EN section:
 *   EN knowledge pages → EN species pages  (existing link-cards in page body)
 *   EN species & knowledge pages → EN knowledge guides  (this script)
 *
 * Rules:
 *  - Injects a styled guide-card section before the final CTA block
 *  - Skips any knowledge URL already linked anywhere in the page
 *  - Idempotent: skips pages that already have the injected marker comment
 *  - At most 2 guide links injected per page (the highest-relevance ones first)
 */

const fs   = require('fs');
const path = require('path');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

// ─── EN Knowledge hub catalogue ───────────────────────────────────────────────
const GUIDES = {
  'african-grey-guide':        { title: 'African Grey Parrot Complete Guide',              tag: 'Species',       time: '10 min' },
  'amazon-guide':              { title: 'Amazon Parrot Buying Guide',                      tag: 'Species',       time: '8 min'  },
  'best-family-parrots':       { title: 'Best Family Parrots: Which Is Right for You?',    tag: 'Guide',         time: '7 min'  },
  'breeders-vs-pet-shops':     { title: 'Parrot Breeder vs Pet Shop: Which Is Better?',   tag: 'Buying',        time: '6 min'  },
  'caique-guide':              { title: 'Caique Buying Guide',                             tag: 'Species',       time: '8 min'  },
  'catalina-macaw-guide':      { title: 'Catalina Macaw Guide',                            tag: 'Species',       time: '7 min'  },
  'choosing-the-right-parrot': { title: 'Choosing the Right Parrot for You',               tag: 'Guide',         time: '8 min'  },
  'cites-explained':           { title: 'CITES Explained: Import Rules for UK Buyers',     tag: 'CITES & Legal', time: '7 min'  },
  'cockatoo-guide':            { title: 'Cockatoo Buying Guide',                           tag: 'Species',       time: '9 min'  },
  'conure-guide':              { title: 'Conure Buying Guide',                             tag: 'Species',       time: '8 min'  },
  'eclectus-guide':            { title: 'Eclectus Parrot Buying Guide',                    tag: 'Species',       time: '8 min'  },
  'first-parrot-guide':        { title: "Buying Your First Parrot: Beginner's Guide",      tag: 'Guide',         time: '9 min'  },
  'green-wing-macaw-guide':    { title: 'Green-Wing Macaw Guide',                          tag: 'Species',       time: '8 min'  },
  'hand-raised-vs-parent-raised': { title: 'Hand-Raised vs Parent-Raised Parrots',        tag: 'Buying',        time: '6 min'  },
  'how-to-buy-a-parrot':       { title: 'How to Buy a Parrot in the UK',                  tag: 'Buying',        time: '9 min'  },
  'hyacinth-macaw-guide':      { title: 'Hyacinth Macaw Complete Owner\'s Guide',          tag: 'Species',       time: '9 min'  },
  'importing-parrots-ireland': { title: 'Importing a Parrot into Ireland',                 tag: 'CITES & Legal', time: '7 min'  },
  'importing-parrots-uk':      { title: 'Importing a Parrot into the UK',                  tag: 'CITES & Legal', time: '7 min'  },
  'large-parrots':             { title: 'Large Parrots Guide: Macaws, Greys & Cockatoos', tag: 'Guide',         time: '8 min'  },
  'macaw-guide':               { title: 'Macaw Guide: Types, Care & Buying Advice',        tag: 'Species',       time: '9 min'  },
  'parrot-acclimatisation':    { title: 'Settling a New Parrot In: The First Week',        tag: 'Care',          time: '6 min'  },
  'parrot-aggression-guide':   { title: 'Parrot Aggression: Why Parrots Bite & How to Help', tag: 'Behaviour',  time: '7 min'  },
  'parrot-bathing-guide':      { title: 'How to Bathe a Parrot',                           tag: 'Care',          time: '5 min'  },
  'parrot-bonding':            { title: 'How to Bond with Your Parrot',                    tag: 'Behaviour',     time: '6 min'  },
  'parrot-cage-guide':         { title: 'Parrot Cage Guide: Size, Bar Spacing & Setup',    tag: 'Equipment',     time: '7 min'  },
  'parrot-delivery-guide':     { title: 'How Parrot Delivery Works: Air Cargo to the UK',  tag: 'Delivery',      time: '6 min'  },
  'parrot-diet-guide':         { title: 'Parrot Diet Guide: What to Feed Your Parrot',     tag: 'Nutrition',     time: '8 min'  },
  'parrot-health-guide':       { title: 'Parrot Health Guide: Signs of Illness & Vets',    tag: 'Health',        time: '9 min'  },
  'parrot-insurance-uk':       { title: 'Parrot Insurance UK: Do You Need It?',            tag: 'Health',        time: '6 min'  },
  'parrot-lifespan':           { title: 'How Long Do Parrots Live? Lifespans by Species',  tag: 'Health',        time: '6 min'  },
  'parrot-noise-levels':       { title: 'Parrot Noise Levels: Which Species Are Loudest?', tag: 'Guide',         time: '7 min'  },
  'parrot-prices':             { title: 'Parrot Prices in the UK 2026',                    tag: 'Prices',        time: '7 min'  },
  'parrot-sleep-guide':        { title: 'How Much Sleep Do Parrots Need?',                 tag: 'Care',          time: '5 min'  },
  'parrot-socialisation':      { title: 'Parrot Socialisation Guide',                      tag: 'Behaviour',     time: '6 min'  },
  'parrots-with-cats-dogs':    { title: 'Parrots with Cats & Dogs: Safe Introduction',     tag: 'Behaviour',     time: '7 min'  },
  'parrots-with-children':     { title: 'Parrots and Children: Safe Species & Tips',       tag: 'Guide',         time: '6 min'  },
  'parrot-toys-guide':         { title: 'Best Parrot Toys: Enrichment Guide',              tag: 'Equipment',     time: '6 min'  },
  'parrot-training':           { title: 'Parrot Training Guide: Step-Up, Recall & Tricks', tag: 'Training',      time: '8 min'  },
  'parrot-vets-uk':            { title: 'Finding an Avian Vet in the UK',                  tag: 'Health',        time: '6 min'  },
  'pionus-guide':              { title: 'Pionus Parrot Buying Guide',                       tag: 'Species',       time: '7 min'  },
  'preparing-your-home':       { title: 'Preparing Your Home for a Parrot',                tag: 'Care',          time: '7 min'  },
  'quiet-parrots':             { title: 'Quiet Parrots for Flats & Apartments',            tag: 'Guide',         time: '7 min'  },
  'small-parrots':             { title: 'Small Parrots Guide: Conures, Caiques & More',    tag: 'Guide',         time: '7 min'  },
  'talking-parrots':           { title: 'Best Talking Parrots: Top Speaking Species',      tag: 'Guide',         time: '6 min'  },
  'uk-parrot-laws':            { title: 'UK Parrot Laws 2026: Legal Requirements',         tag: 'CITES & Legal', time: '6 min'  },
};

function guideUrl(slug) {
  return `https://www.paraisodeaves.com/en/knowledge/${slug}/`;
}

// ─── Page → guide mapping ─────────────────────────────────────────────────────
// Each entry: page file path → ordered array of guide slugs (most relevant first)
const PAGE_LINKS = {
  // ── EN Species pages ──────────────────────────────────────────────────────
  'en/african-grey/index.html':       ['african-grey-guide',       'parrot-health-guide'],
  'en/amazon-parrots/index.html':     ['amazon-guide',             'talking-parrots'],
  'en/blue-and-yellow-macaw/index.html': ['macaw-guide',           'large-parrots'],
  'en/caiques/index.html':            ['caique-guide',             'best-family-parrots'],
  'en/catalina-macaw/index.html':     ['catalina-macaw-guide',     'macaw-guide'],
  'en/cockatoos/index.html':          ['cockatoo-guide',           'parrot-noise-levels'],
  'en/conures/index.html':            ['conure-guide',             'small-parrots'],
  'en/eclectus/index.html':           ['eclectus-guide',           'parrot-diet-guide'],
  'en/green-wing-macaw/index.html':   ['green-wing-macaw-guide',   'macaw-guide'],
  'en/hyacinth-macaw/index.html':     ['hyacinth-macaw-guide',     'large-parrots'],
  'en/pionus/index.html':             ['pionus-guide',             'quiet-parrots'],
  'en/scarlet-macaw/index.html':      ['macaw-guide',              'large-parrots'],

  // ── EN Knowledge guide pages ──────────────────────────────────────────────
  'en/knowledge/african-grey-guide/index.html':        ['parrot-health-guide',        'cites-explained'],
  'en/knowledge/amazon-guide/index.html':              ['talking-parrots',             'parrot-diet-guide'],
  'en/knowledge/best-family-parrots/index.html':       ['choosing-the-right-parrot',   'parrots-with-children'],
  'en/knowledge/breeders-vs-pet-shops/index.html':     ['how-to-buy-a-parrot',         'hand-raised-vs-parent-raised'],
  'en/knowledge/caique-guide/index.html':              ['small-parrots',               'best-family-parrots'],
  'en/knowledge/catalina-macaw-guide/index.html':      ['macaw-guide',                 'large-parrots'],
  'en/knowledge/choosing-the-right-parrot/index.html': ['first-parrot-guide',          'how-to-buy-a-parrot'],
  'en/knowledge/cites-explained/index.html':           ['importing-parrots-uk',        'how-to-buy-a-parrot'],
  'en/knowledge/cockatoo-guide/index.html':            ['parrot-noise-levels',         'large-parrots'],
  'en/knowledge/conure-guide/index.html':              ['small-parrots',               'parrot-noise-levels'],
  'en/knowledge/eclectus-guide/index.html':            ['parrot-diet-guide',           'talking-parrots'],
  'en/knowledge/first-parrot-guide/index.html':        ['choosing-the-right-parrot',   'preparing-your-home'],
  'en/knowledge/green-wing-macaw-guide/index.html':    ['macaw-guide',                 'large-parrots'],
  'en/knowledge/hand-raised-vs-parent-raised/index.html': ['breeders-vs-pet-shops',   'first-parrot-guide'],
  'en/knowledge/how-to-buy-a-parrot/index.html':       ['breeders-vs-pet-shops',       'cites-explained'],
  'en/knowledge/hyacinth-macaw-guide/index.html':      ['large-parrots',              'parrot-cage-guide'],
  'en/knowledge/importing-parrots-ireland/index.html': ['cites-explained',             'parrot-delivery-guide'],
  'en/knowledge/importing-parrots-uk/index.html':      ['cites-explained',             'parrot-delivery-guide'],
  'en/knowledge/large-parrots/index.html':             ['macaw-guide',                 'parrot-cage-guide'],
  'en/knowledge/macaw-guide/index.html':               ['large-parrots',               'parrot-cage-guide'],
  'en/knowledge/parrot-acclimatisation/index.html':    ['first-parrot-guide',          'preparing-your-home'],
  'en/knowledge/parrot-aggression-guide/index.html':   ['parrot-training',             'parrot-bonding'],
  'en/knowledge/parrot-bathing-guide/index.html':      ['parrot-health-guide',         'parrot-diet-guide'],
  'en/knowledge/parrot-bonding/index.html':            ['parrot-training',             'parrot-acclimatisation'],
  'en/knowledge/parrot-cage-guide/index.html':         ['preparing-your-home',         'parrot-toys-guide'],
  'en/knowledge/parrot-delivery-guide/index.html':     ['importing-parrots-uk',        'parrot-acclimatisation'],
  'en/knowledge/parrot-diet-guide/index.html':         ['parrot-health-guide',         'parrot-bathing-guide'],
  'en/knowledge/parrot-health-guide/index.html':       ['parrot-vets-uk',              'parrot-diet-guide'],
  'en/knowledge/parrot-insurance-uk/index.html':       ['parrot-health-guide',         'parrot-vets-uk'],
  'en/knowledge/parrot-lifespan/index.html':           ['parrot-health-guide',         'parrot-diet-guide'],
  'en/knowledge/parrot-noise-levels/index.html':       ['quiet-parrots',               'choosing-the-right-parrot'],
  'en/knowledge/parrot-prices/index.html':             ['how-to-buy-a-parrot',         'choosing-the-right-parrot'],
  'en/knowledge/parrot-sleep-guide/index.html':        ['parrot-health-guide',         'preparing-your-home'],
  'en/knowledge/parrot-socialisation/index.html':      ['parrot-bonding',              'parrots-with-cats-dogs'],
  'en/knowledge/parrots-with-cats-dogs/index.html':    ['parrot-socialisation',        'preparing-your-home'],
  'en/knowledge/parrots-with-children/index.html':     ['best-family-parrots',         'parrot-socialisation'],
  'en/knowledge/parrot-toys-guide/index.html':         ['parrot-cage-guide',           'parrot-training'],
  'en/knowledge/parrot-training/index.html':           ['parrot-bonding',              'parrot-aggression-guide'],
  'en/knowledge/parrot-vets-uk/index.html':            ['parrot-health-guide',         'parrot-insurance-uk'],
  'en/knowledge/pionus-guide/index.html':              ['quiet-parrots',               'small-parrots'],
  'en/knowledge/preparing-your-home/index.html':       ['parrot-cage-guide',           'first-parrot-guide'],
  'en/knowledge/quiet-parrots/index.html':             ['choosing-the-right-parrot',   'parrot-noise-levels'],
  'en/knowledge/small-parrots/index.html':             ['choosing-the-right-parrot',   'quiet-parrots'],
  'en/knowledge/talking-parrots/index.html':           ['parrot-training',             'choosing-the-right-parrot'],
  'en/knowledge/uk-parrot-laws/index.html':            ['cites-explained',             'importing-parrots-uk'],
};

// ─── HTML builders ────────────────────────────────────────────────────────────

function buildCard(slug) {
  const info = GUIDES[slug];
  const url  = guideUrl(slug);
  return `<a href="${url}" class="article-card" style="display:block;color:inherit;text-decoration:none;">
  <div class="card-body">
    <span class="tag">${info.tag}</span>
    <h3>${info.title}</h3>
    <div class="meta">
      <span class="read-time">⏱ ${info.time} read</span>
      <span class="read-link">Read →</span>
    </div>
  </div>
</a>`;
}

function buildSection(slugs) {
  const cards = slugs.map(buildCard).join('\n');
  return `
  <!-- BLOG-BACKLINKS: related knowledge guides — injected by add-blog-backlinks-to-en-pages.js -->
  <div class="otras-aves" style="margin-top:24px;">
    <h2>📰 Recommended Reading</h2>
    <div class="article-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:14px;">
      ${cards}
    </div>
    <div style="margin-top:14px;text-align:right;">
      <a href="https://www.paraisodeaves.com/en/knowledge/" style="font-size:.85rem;font-weight:700;color:var(--primary);">Browse all guides →</a>
    </div>
  </div>
  <!-- /BLOG-BACKLINKS -->`;
}

// ─── Injection helpers ────────────────────────────────────────────────────────

function findInjectionPoint(html) {
  // Works for both species pages and knowledge guide pages
  const markers = [
    '<section class="cta-band">',
    '<!-- FINAL CTA -->',
    '<div class="final-cta">',
    '<div class="cta-band">',
    '<div class="otras-aves">',
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
  const slugsToAdd = slugs.filter(slug => !html.includes(guideUrl(slug)));
  if (!slugsToAdd.length) {
    return { status: 'already_linked' };
  }
  // Cap at 2
  const finalSlugs = slugsToAdd.slice(0, 2);

  const section = buildSection(finalSlugs);

  const injectionPoint = findInjectionPoint(html);
  if (injectionPoint === -1) {
    return { status: 'no_injection_point' };
  }

  html = html.slice(0, injectionPoint) + section + '\n\n  ' + html.slice(injectionPoint);
  writeFile(filePath, html);
  return { status: 'updated', slugs: finalSlugs };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\n🔗 add-blog-backlinks-to-en-pages — Adding knowledge guide backlinks to EN species & knowledge pages\n');

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
  const label = r.filePath.replace('en/', '').replace(/\/index\.html$/, '');
  if (r.status === 'updated') {
    console.log(`  ✓ ${label}  →  ${r.slugs.join(', ')}`);
  } else if (r.status === 'missing') {
    console.log(`  ✗ MISSING: ${r.filePath}`);
  } else if (r.status === 'no_injection_point') {
    console.log(`  ⚠ no injection point: ${r.filePath}`);
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Pages updated (new guide links added): ${stats.updated}`);
console.log(`Already had BLOG-BACKLINKS section:    ${stats.already_done || 0}`);
console.log(`All target guides already linked:      ${stats.already_linked || 0}`);
console.log(`Missing files:                         ${stats.missing || 0}`);
console.log(`No injection point found:              ${stats.no_injection_point || 0}`);
console.log('\n✅ EN knowledge guide backlink injection complete.\n');
