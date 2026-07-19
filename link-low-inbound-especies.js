#!/usr/bin/env node
/**
 * link-low-inbound-especies.js
 *
 * Adds targeted links to under-linked species pages in ES, FR and PT.
 *
 * Under-linked ES pages (< 3 incoming links):
 *   /especies/lorikeet-arcoiris/    (0 links)
 *   /especies/cotorra-monje/        (1 link)
 *   /especies/conuro-mejilla-verde/ (2 links)
 *   /especies/periquito-collar-indio/ (2 links)
 *
 * Under-linked FR pages (< 3 incoming links):
 *   /fr/especies/perruche-moine/    (2 links)
 *
 * Under-linked PT pages (< 3 incoming links):
 *   /pt/especies/amazona-asa-laranja/ (1 link)
 *   /pt/especies/cacatua-goffin/      (1 link)
 *   /pt/especies/caique/              (1 link)
 */

const fs   = require('fs');
const path = require('path');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

function getBodyBounds(html) {
  const starts = [
    html.indexOf('<article'),
    html.indexOf('<main'),
    html.indexOf('<div class="content"'),
    html.indexOf('<div class=\'content\''),
  ].filter(i => i !== -1);
  if (!starts.length) return null;
  const start = Math.min(...starts);
  const ends = [
    html.indexOf('class="cta-inline"'),
    html.indexOf('class="related"'),
    html.indexOf('class="related-grid"'),
    html.indexOf('class="author-bio"'),
    html.indexOf('data-species-ref'),
    html.indexOf('</article>'),
    html.indexOf('</main>'),
    html.indexOf('<footer'),
  ].filter(i => i !== -1 && i > start);
  if (!ends.length) return null;
  return { start, end: Math.min(...ends) };
}

function linkTermInBody(body, terms, slug) {
  let injected = false;
  const newBody = body.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, (pBlock) => {
    if (injected) return pBlock;
    const pLower = pBlock.toLowerCase();
    for (const term of terms) {
      if (!pLower.includes(term.toLowerCase())) continue;
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(
        `(^|[^a-zA-ZáéíóúÁÉÍÓÚâêôÂÊÔãõÃÕàÀüÜçÇñÑ])(${escaped})(?=[^a-zA-ZáéíóúÁÉÍÓÚâêôÂÊÔãõÃÕàÀüÜçÇñÑ]|$)`,
        'i'
      );
      const parts = pBlock.split(/(<a[\s\S]*?<\/a>)/i);
      let replaced = false;
      const out = parts.map((part, i) => {
        if (i % 2 === 1 || replaced) return part;
        const newPart = part.replace(re, (m, pre, match) => {
          replaced = true;
          return `${pre}<a href="${slug}">${match}</a>`;
        });
        return newPart;
      });
      if (replaced) { injected = true; return out.join(''); }
    }
    return pBlock;
  });
  return injected ? newBody : null;
}

// Fallback: append "Ver también" sentence before closing </p> of last paragraph
function appendLink(body, slug, label) {
  const lastP = body.lastIndexOf('</p>');
  if (lastP === -1) return null;
  const sentence = ` Consulta también la ficha completa del <a href="${slug}">${label}</a>.`;
  return body.slice(0, lastP) + sentence + body.slice(lastP);
}

// ─── Targeted rules ───────────────────────────────────────────────────────────
const RULES = [

  // ── ES: Lorikeet Arcoíris (0 links) ──────────────────────────────────────
  {
    slug: '/especies/lorikeet-arcoiris/',
    label: 'Lorikeet Arcoíris',
    targets: [
      // frutas-para-loros.html mentions "lorikeet" — only ES blog post that does
      { file: 'blog/frutas-para-loros.html',
        terms: ['lorikeet', 'lori arco'] },
      // Tipos de loros - add in main tipos page (root)
      { file: 'tipos-de-loros-domesticos.html',
        terms: ['lorikeet', 'lori'] },
      // Blog index can link to it as chip in species grid
      { file: 'blog/loros-mas-coloridos.html',
        terms: ['lorikeet', 'lori', 'arcoíris', 'colorido'] },
      { file: 'blog/dieta-loro-yaco.html',
        terms: ['lorikeet', 'lori'] },
    ]
  },

  // ── ES: Cotorra Monje (1 link) ────────────────────────────────────────────
  {
    slug: '/especies/cotorra-monje/',
    label: 'Cotorra Monje',
    targets: [
      { file: 'blog/criadero-loros-valencia.html',
        terms: ['cotorra argentina', 'cotorra monje', 'cotorra'] },
      { file: 'blog/cites-loros-espana.html',
        terms: ['cotorra argentina', 'cotorra monje'] },
      { file: 'blog/conuro-loro-familia.html',
        terms: ['cotorra monje', 'cotorra argentina'] },
      { file: 'blog/loros-para-piso.html',
        terms: ['cotorra monje', 'cotorra argentina', 'cotorra'] },
    ]
  },

  // ── ES: Conuro Mejilla Verde (2 links) ────────────────────────────────────
  {
    slug: '/especies/conuro-mejilla-verde/',
    label: 'Conuro Mejilla Verde',
    targets: [
      { file: 'blog/conuro-vs-agapornis.html',
        terms: ['mejilla verde', 'conuro verde', 'conuro de mejilla'] },
      { file: 'blog/guia-conuro-sol.html',
        terms: ['mejilla verde', 'conuro verde'] },
      { file: 'blog/mejores-loros-principiantes.html',
        terms: ['mejilla verde', 'conuro verde', 'conuro'] },
      { file: 'blog/ninfa-vs-conuro.html',
        terms: ['mejilla verde', 'conuro de mejilla'] },
    ]
  },

  // ── ES: Periquito Collar Indio (2 links) ─────────────────────────────────
  {
    slug: '/especies/periquito-collar-indio/',
    label: 'Periquito Collar Indio',
    targets: [
      { file: 'blog/loros-mas-habladores.html',
        terms: ['collar', 'alejandrino', 'psittacula'] },
      { file: 'blog/agapornis-vs-periquito.html',
        terms: ['collar indio', 'periquito collar', 'alejandrino'] },
      { file: 'blog/cockatiel-vs-periquito.html',
        terms: ['collar', 'alejandrino'] },
      { file: 'blog/mejores-loros-principiantes.html',
        terms: ['collar indio', 'periquito collar'] },
    ]
  },

  // ── FR: Perruche Moine (2 links) ─────────────────────────────────────────
  {
    slug: '/fr/especies/perruche-moine/',
    label: 'Perruche Moine',
    targets: [
      { file: 'fr/blog/meilleurs-perroquets-debutants/index.html',
        terms: ['perruche moine', 'moine', 'calopsitte', 'perruche'] },
      { file: 'fr/blog/quel-perroquet-choisir/index.html',
        terms: ['perruche moine', 'moine', 'perruche'] },
      { file: 'fr/blog/choisir-eleveur-serieux/index.html',
        terms: ['perruche moine', 'moine', 'perruche'] },
    ]
  },

  // ── PT: Amazona Asa Laranja (1 link) ────────────────────────────────────
  {
    slug: '/pt/especies/amazona-asa-laranja/',
    label: 'Amazona Asa Laranja',
    targets: [
      { file: 'pt/blog/papagaio-amazona-mascota/index.html',
        terms: ['amazona asa laranja', 'amazona auropalliata', 'amazona'] },
      { file: 'pt/blog/melhores-papagaios-para-familias/index.html',
        terms: ['amazona asa laranja', 'amazona', 'auropalliata'] },
      { file: 'pt/blog/melhores-papagaios-para-iniciantes/index.html',
        terms: ['amazona asa laranja', 'amazona', 'auropalliata'] },
    ]
  },

  // ── PT: Cacatua Goffin (1 link) ─────────────────────────────────────────
  {
    slug: '/pt/especies/cacatua-goffin/',
    label: 'Cacatua Goffin',
    targets: [
      { file: 'pt/blog/cacatua-ninfa-carolina-guia/index.html',
        terms: ['cacatua goffin', 'goffin', 'cacatua'] },
      { file: 'pt/blog/melhores-papagaios-para-familias/index.html',
        terms: ['cacatua goffin', 'goffin', 'cacatua'] },
      { file: 'pt/blog/melhores-papagaios-para-iniciantes/index.html',
        terms: ['cacatua goffin', 'goffin', 'cacatua'] },
    ]
  },

  // ── PT: Caique (1 link) ────────────────────────────────────────────────
  {
    slug: '/pt/especies/caique/',
    label: 'Caique',
    targets: [
      { file: 'pt/blog/melhores-papagaios-para-familias/index.html',
        terms: ['caique'] },
      { file: 'pt/blog/melhores-papagaios-para-iniciantes/index.html',
        terms: ['caique'] },
      { file: 'pt/blog/papagaio-adocao-vs-compra/index.html',
        terms: ['caique'] },
    ]
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('\n🔗 link-low-inbound-especies — Adding links to under-linked species pages\n');

let totalUpdated = 0;

for (const rule of RULES) {
  let speciesLinked = 0;
  for (const target of rule.targets) {
    if (!fs.existsSync(target.file)) continue;

    let html = readFile(target.file);
    if (html.includes(`href="${rule.slug}"`)) continue; // already linked

    const bounds = getBodyBounds(html);
    if (!bounds) continue;
    const { start, end } = bounds;
    let body = html.slice(start, end);

    let newBody = linkTermInBody(body, target.terms, rule.slug);
    if (!newBody) {
      newBody = appendLink(body, rule.slug, rule.label);
    }

    if (newBody && newBody !== body) {
      html = html.slice(0, start) + newBody + html.slice(end);
      writeFile(target.file, html);
      console.log(`   ✓ ${target.file} → ${rule.slug}`);
      totalUpdated++;
      speciesLinked++;
    }
  }
  if (speciesLinked > 0) {
    console.log(`     (${speciesLinked} files now link to ${rule.slug})\n`);
  }
}

console.log(`\n✅ Done. ${totalUpdated} files updated with species page links.\n`);
