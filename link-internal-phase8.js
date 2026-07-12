/**
 * Phase 8.1 — Internal Linking Improvements
 *
 * 1. Adds "Ver aves disponibles" button to final CTA of all 15 species subpages
 * 2. Inserts a contextual species reference box into species-related blog posts
 */

const fs = require('fs');
const path = require('path');

// ─── 1. SPECIES PAGES: add "Ver aves disponibles" to final CTA ───────────────

const SPECIES_DIRS = [
  'amazona-ala-naranja',
  'amazona-nuca-amarilla',
  'cacatua-blanca',
  'cacatua-galah',
  'cacatua-goffin',
  'caique',
  'conuro-del-sol',
  'conuro-jenday',
  'conuro-mejilla-verde',
  'cotorra-monje',
  'lorikeet-arcoiris',
  'loro-pionus',
  'loro-senegal',
  'periquito-alejandrino',
  'periquito-collar-indio',
];

const AVES_BTN = `<a href="/aves-disponibles/" class="btn btn-gold" style="min-width:200px">Ver aves disponibles</a>\n        `;
// Insert before the email button which is always last in the btns div
const EMAIL_BTN_PATTERN = /<a href="\/?#contacto" class="btn-email"/;

let speciesUpdated = 0;
let speciesSkipped = 0;

for (const dir of SPECIES_DIRS) {
  const file = path.join('especies', dir, 'index.html');
  if (!fs.existsSync(file)) { console.log(`  MISSING: ${file}`); continue; }

  let html = fs.readFileSync(file, 'utf8');

  if (html.includes('/aves-disponibles/')) {
    console.log(`  SKIP (already has aves-disponibles link): ${file}`);
    speciesSkipped++;
    continue;
  }

  if (!EMAIL_BTN_PATTERN.test(html)) {
    console.log(`  WARN: cannot find email btn anchor in ${file}`);
    continue;
  }

  html = html.replace(EMAIL_BTN_PATTERN, AVES_BTN + '<a href="/#contacto" class="btn-email"');
  fs.writeFileSync(file, html, 'utf8');
  console.log(`  UPDATED species page: ${file}`);
  speciesUpdated++;
}

console.log(`\nSpecies pages: ${speciesUpdated} updated, ${speciesSkipped} skipped\n`);

// ─── 2. BLOG POSTS: inject contextual species box ────────────────────────────

// Each entry: blog filename → array of { slug, name } species to link
const BLOG_SPECIES_MAP = {
  'amazona-loro-mascota.html': [
    { slug: 'amazona-ala-naranja', name: 'Amazona Ala Naranja' },
    { slug: 'amazona-nuca-amarilla', name: 'Amazona Nuca Amarilla' },
  ],
  'amazona-real-vs-frente-azul.html': [
    { slug: 'amazona-ala-naranja', name: 'Amazona Ala Naranja' },
    { slug: 'amazona-nuca-amarilla', name: 'Amazona Nuca Amarilla' },
  ],
  'amazona-vs-cacatua.html': [
    { slug: 'amazona-ala-naranja', name: 'Amazona Ala Naranja' },
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
  ],
  'amazona-vs-eclectus-comparativa.html': [
    { slug: 'amazona-ala-naranja', name: 'Amazona Ala Naranja' },
  ],
  'eclectus-vs-amazona.html': [
    { slug: 'amazona-ala-naranja', name: 'Amazona Ala Naranja' },
  ],
  'guia-amazona-frente-azul.html': [
    { slug: 'amazona-ala-naranja', name: 'Amazona Ala Naranja' },
    { slug: 'amazona-nuca-amarilla', name: 'Amazona Nuca Amarilla' },
  ],
  'cacatua-alba-vs-cacatua-galerita.html': [
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
  ],
  'cacatua-blanca-vs-galah.html': [
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
    { slug: 'cacatua-galah', name: 'Cacatúa Galah' },
  ],
  'cacatua-galah-vs-ninfa.html': [
    { slug: 'cacatua-galah', name: 'Cacatúa Galah' },
  ],
  'dieta-cacatua.html': [
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
    { slug: 'cacatua-galah', name: 'Cacatúa Galah' },
    { slug: 'cacatua-goffin', name: 'Cacatúa Goffin' },
  ],
  'cuidados-cacatua-guia.html': [
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
    { slug: 'cacatua-galah', name: 'Cacatúa Galah' },
    { slug: 'cacatua-goffin', name: 'Cacatúa Goffin' },
  ],
  'comprar-cacatua-espana.html': [
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
    { slug: 'cacatua-galah', name: 'Cacatúa Galah' },
    { slug: 'cacatua-goffin', name: 'Cacatúa Goffin' },
  ],
  'guia-cacatua-ninfa.html': [
    { slug: 'cacatua-goffin', name: 'Cacatúa Goffin' },
  ],
  'guacamayo-vs-cacatua.html': [
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
    { slug: 'cacatua-galah', name: 'Cacatúa Galah' },
  ],
  'loro-gris-vs-cacatua.html': [
    { slug: 'cacatua-blanca', name: 'Cacatúa Blanca' },
  ],
  'caique-loro-mascota.html': [
    { slug: 'caique', name: 'Caique' },
  ],
  'conuro-loro-familia.html': [
    { slug: 'conuro-del-sol', name: 'Conuro del Sol' },
    { slug: 'conuro-jenday', name: 'Conuro Jenday' },
    { slug: 'conuro-mejilla-verde', name: 'Conuro Mejilla Verde' },
  ],
  'conuro-sol-vs-ninfa.html': [
    { slug: 'conuro-del-sol', name: 'Conuro del Sol' },
  ],
  'conuro-vs-agapornis.html': [
    { slug: 'conuro-del-sol', name: 'Conuro del Sol' },
    { slug: 'conuro-jenday', name: 'Conuro Jenday' },
  ],
  'guia-conuro-sol.html': [
    { slug: 'conuro-del-sol', name: 'Conuro del Sol' },
  ],
  'cotorra-argentina-mascota.html': [
    { slug: 'cotorra-monje', name: 'Cotorra Monje' },
  ],
  'pionus-loro-mascota.html': [
    { slug: 'loro-pionus', name: 'Loro Pionus' },
  ],
  'pionus-vs-amazona.html': [
    { slug: 'loro-pionus', name: 'Loro Pionus' },
    { slug: 'amazona-ala-naranja', name: 'Amazona Ala Naranja' },
  ],
  'agapornis-vs-periquito.html': [
    { slug: 'periquito-alejandrino', name: 'Periquito Alejandrino' },
    { slug: 'periquito-collar-indio', name: 'Periquito Collar Indio' },
  ],
  'cockatiel-vs-periquito.html': [
    { slug: 'periquito-alejandrino', name: 'Periquito Alejandrino' },
  ],
  'periquito-mascota-guia.html': [
    { slug: 'periquito-alejandrino', name: 'Periquito Alejandrino' },
    { slug: 'periquito-collar-indio', name: 'Periquito Collar Indio' },
  ],
};

function buildSpeciesBox(species) {
  const links = species
    .map(s => `<a href="/especies/${s.slug}/">Ver ficha del ${s.name}</a>`)
    .join('\n      ');
  return `\n  <div class="cta-inline" data-species-ref="true">
    <h3>🦜 Fichas de especie en paraisodeaves</h3>
    <p>Consulta nuestra guía detallada: carácter, cuidados, alimentación y disponibilidad.</p>
    ${links}
    <a href="/aves-disponibles/">Ver todas las aves disponibles</a>
  </div>\n`;
}

// Insert the box just before <div class="related"> or before footer.article-footer if no related section
const RELATED_PATTERN = /(\s*<div class="related")/;
const FOOTER_PATTERN = /(\s*<footer class="article-footer")/;

let blogUpdated = 0;
let blogSkipped = 0;

for (const [filename, species] of Object.entries(BLOG_SPECIES_MAP)) {
  const file = path.join('blog', filename);
  if (!fs.existsSync(file)) {
    console.log(`  MISSING blog: ${file}`);
    continue;
  }

  let html = fs.readFileSync(file, 'utf8');

  if (html.includes('data-species-ref="true"')) {
    console.log(`  SKIP (already has species box): ${file}`);
    blogSkipped++;
    continue;
  }

  const box = buildSpeciesBox(species);

  if (RELATED_PATTERN.test(html)) {
    html = html.replace(RELATED_PATTERN, box + '$1');
    fs.writeFileSync(file, html, 'utf8');
    console.log(`  UPDATED blog (before related): ${file}`);
    blogUpdated++;
  } else if (FOOTER_PATTERN.test(html)) {
    html = html.replace(FOOTER_PATTERN, box + '$1');
    fs.writeFileSync(file, html, 'utf8');
    console.log(`  UPDATED blog (before footer): ${file}`);
    blogUpdated++;
  } else {
    console.log(`  WARN: no insertion point found in ${file}`);
  }
}

console.log(`\nBlog posts: ${blogUpdated} updated, ${blogSkipped} skipped`);
console.log('\nPhase 8.1 internal linking complete.');
