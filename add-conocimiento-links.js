#!/usr/bin/env node
/**
 * add-conocimiento-links.js
 *
 * Adds contextual inline links from blog posts to /conocimiento/ section pages.
 * All 12 /conocimiento/ sub-pages currently have 0 incoming internal links.
 *
 * Strategy:
 *  - For each (conocimiento-section, target-blog-posts[]) pair:
 *  - Check if the blog post already links to that conocimiento page
 *  - If not, find the first <p> in the article body containing a trigger term
 *    and wrap it with <a href="/conocimiento/[section]/">term</a>
 *  - If no trigger term found in any <p>, append a short "Ver también" inline
 *    sentence at the end of the last article body <p>
 *  - Max 1 link per conocimiento section per file
 */

const fs   = require('fs');
const path = require('path');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

// ─── Body bounds (same helper as existing scripts) ────────────────────────────
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

// ─── Link a term inside the first matching <p> ────────────────────────────────
function linkTermInBody(body, terms, slug) {
  let injected = false;
  const newBody = body.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, (pBlock) => {
    if (injected) return pBlock;
    const pLower = pBlock.toLowerCase();
    for (const term of terms) {
      if (!pLower.includes(term.toLowerCase())) continue;
      // Make sure not already inside an <a>
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(
        `(^|[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])(${escaped})(?=[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]|$)`,
        'i'
      );
      // Split on existing <a> to avoid linking inside links
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
      if (replaced) {
        injected = true;
        return out.join('');
      }
    }
    return pBlock;
  });
  return injected ? newBody : null;
}

// ─── Fallback: append a "Ver también" sentence to the last <p> ───────────────
function appendVerTambien(body, slug, label) {
  // Find the last </p> in the body
  const lastP = body.lastIndexOf('</p>');
  if (lastP === -1) return null;
  const sentence = ` Consulta también nuestra <a href="${slug}">${label}</a>.`;
  return body.slice(0, lastP) + sentence + body.slice(lastP);
}

// ─── Rules ────────────────────────────────────────────────────────────────────
// Each rule: slug + label (used in fallback) + blog files + trigger terms
const RULES = [
  {
    slug: '/conocimiento/nutricion/',
    label: 'guía de nutrición para loros',
    targets: [
      { file: 'blog/alimentacion-loro-adulto.html',      terms: ['nutrición', 'dieta', 'alimentación'] },
      { file: 'blog/alimentos-toxicos-loros.html',       terms: ['nutrición', 'dieta', 'alimentos'] },
      { file: 'blog/frutas-para-loros.html',             terms: ['alimentación', 'dieta', 'frutas'] },
      { file: 'blog/guia-alimentacion-loros.html',       terms: ['nutrición', 'alimentación', 'dieta'] },
      { file: 'blog/calendario-alimentacion-loros.html', terms: ['alimentación', 'nutrición', 'dieta'] },
    ]
  },
  {
    slug: '/conocimiento/salud/',
    label: 'guía de salud aviar',
    targets: [
      { file: 'blog/enfermedades-comunes-loros.html',    terms: ['salud', 'veterinario', 'enfermedades'] },
      { file: 'blog/prevencion-enfermedades-loro.html',  terms: ['salud', 'prevención', 'veterinario'] },
      { file: 'blog/visitas-veterinario-loros.html',     terms: ['salud', 'veterinario'] },
      { file: 'blog/muda-plumaje-loro.html',             terms: ['salud', 'veterinario', 'muda'] },
      { file: 'blog/banar-loro-guia-completa.html',      terms: ['salud', 'higiene'] },
    ]
  },
  {
    slug: '/conocimiento/adiestramiento/',
    label: 'guía de adiestramiento de loros',
    targets: [
      { file: 'blog/adiestramiento-loros.html',            terms: ['adiestramiento', 'entrenamiento', 'entrenar'] },
      { file: 'blog/como-entrenar-un-loro.html',           terms: ['adiestramiento', 'entrenamiento', 'entrenar'] },
      { file: 'blog/como-ensenar-a-hablar-un-loro.html',   terms: ['entrenamiento', 'adiestramiento', 'enseñar'] },
      { file: 'blog/reservar-loro-criador.html',           terms: ['entrenamiento', 'adiestramiento'] },
    ]
  },
  {
    slug: '/conocimiento/comportamiento/',
    label: 'guía de comportamiento de loros',
    targets: [
      { file: 'blog/lenguaje-corporal-loros.html',          terms: ['comportamiento', 'lenguaje corporal'] },
      { file: 'blog/como-socializar-loro.html',             terms: ['comportamiento', 'socialización'] },
      { file: 'blog/juegos-estimulacion-loro.html',         terms: ['comportamiento', 'estimulación'] },
      { file: 'blog/enriquecimiento-ambiental-loros.html',  terms: ['comportamiento', 'enriquecimiento'] },
      { file: 'blog/socializar-loro-recien-adoptado.html',  terms: ['comportamiento', 'socialización'] },
    ]
  },
  {
    slug: '/conocimiento/instalaciones/',
    label: 'guía de instalaciones para loros',
    targets: [
      { file: 'blog/jaula-equipamiento-loro.html',       terms: ['jaula', 'instalaciones', 'espacio'] },
      { file: 'blog/jaula-ideal-loro-tamano.html',       terms: ['jaula', 'instalaciones', 'espacio'] },
      { file: 'blog/jaula-grande-vs-pequena-loro.html',  terms: ['jaula', 'instalaciones', 'espacio'] },
      { file: 'blog/primera-semana-loro-casa.html',      terms: ['jaula', 'instalaciones', 'espacio'] },
    ]
  },
  {
    slug: '/conocimiento/compra/',
    label: 'guía para comprar un loro',
    targets: [
      { file: 'blog/como-elegir-criador-loros-espana.html', terms: ['criador', 'comprar', 'adoptar'] },
      { file: 'blog/adoptar-loro-vs-comprar.html',          terms: ['comprar', 'adoptar', 'criador'] },
      { file: 'blog/gastos-compra-loro.html',               terms: ['comprar', 'precio', 'coste'] },
      { file: 'blog/reservar-loro-criador.html',            terms: ['criador', 'comprar', 'reservar'] },
    ]
  },
  {
    slug: '/conocimiento/accesorios/',
    label: 'guía de accesorios para loros',
    targets: [
      { file: 'blog/accesorios-esenciales-loro.html',      terms: ['accesorios', 'juguetes', 'perchas'] },
      { file: 'blog/jaula-equipamiento-loro.html',         terms: ['accesorios', 'juguetes', 'perchas'] },
      { file: 'blog/juegos-estimulacion-loro.html',        terms: ['juguetes', 'accesorios'] },
      { file: 'blog/enriquecimiento-ambiental-loros.html', terms: ['juguetes', 'accesorios'] },
    ]
  },
  {
    slug: '/conocimiento/cites-legal/',
    label: 'documentación CITES y marco legal',
    targets: [
      { file: 'blog/cites-loros-espana.html',          terms: ['CITES', 'documentación', 'legal'] },
      { file: 'blog/documentacion-completa-loro.html', terms: ['CITES', 'documentación', 'legal'] },
      { file: 'blog/registro-microchip-loros.html',    terms: ['CITES', 'documentación', 'legal', 'microchip'] },
    ]
  },
  {
    slug: '/conocimiento/viajes/',
    label: 'guía de viajes con loros',
    targets: [
      { file: 'blog/viajar-con-loro.html',   terms: ['viaje', 'transporte', 'viajar'] },
      { file: 'blog/vacaciones-loro.html',   terms: ['viaje', 'vacaciones', 'viajar'] },
    ]
  },
  {
    slug: '/conocimiento/cria/',
    label: 'guía de cría y reproducción',
    targets: [
      { file: 'blog/como-alimentar-un-loro-bebe.html',      terms: ['cría', 'reproducción', 'bebé', 'bebe'] },
      { file: 'blog/como-elegir-criador-loros-espana.html', terms: ['cría', 'criador', 'reproducción'] },
    ]
  },
  {
    slug: '/conocimiento/guias-principiantes/',
    label: 'guía para nuevos propietarios de loros',
    targets: [
      { file: 'blog/mejores-loros-para-principiantes.html', terms: ['principiante', 'primer loro', 'nuevo propietario'] },
      { file: 'blog/primera-semana-loro-casa.html',         terms: ['principiante', 'primer loro', 'nueva mascota'] },
      { file: 'blog/primeros-pasos-loro.html',              terms: ['principiante', 'primer loro'] },
      { file: 'blog/cuidados-diarios-loro.html',            terms: ['principiante', 'cuidados básicos'] },
    ]
  },
  {
    slug: '/conocimiento/guias-avanzadas/',
    label: 'guías para propietarios avanzados',
    targets: [
      { file: 'blog/enriquecimiento-ambiental-loros.html',  terms: ['avanzado', 'experto', 'enriquecimiento'] },
      { file: 'blog/cuidados-diarios-loro.html',            terms: ['avanzado', 'experiencia', 'propietario'] },
      { file: 'blog/seguro-mascotas-loros.html',            terms: ['avanzado', 'propietario', 'experiencia'] },
    ]
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('\n🔗 add-conocimiento-links — Linking blog posts to /conocimiento/ sections\n');

let totalUpdated = 0;

for (const rule of RULES) {
  let sectionLinked = 0;
  for (const target of rule.targets) {
    if (!fs.existsSync(target.file)) continue;

    let html = readFile(target.file);

    // Skip if already links to this conocimiento section
    if (html.includes(`href="${rule.slug}"`)) continue;

    const bounds = getBodyBounds(html);
    if (!bounds) continue;
    const { start, end } = bounds;
    let body = html.slice(start, end);

    // Try inline linking of a trigger term
    let newBody = linkTermInBody(body, target.terms, rule.slug);

    // Fallback: append Ver También to last <p>
    if (!newBody) {
      newBody = appendVerTambien(body, rule.slug, rule.label);
    }

    if (newBody && newBody !== body) {
      html = html.slice(0, start) + newBody + html.slice(end);
      writeFile(target.file, html);
      console.log(`   ✓ ${target.file} → ${rule.slug}`);
      totalUpdated++;
      sectionLinked++;
    }
  }
  if (sectionLinked > 0) {
    console.log(`     (${sectionLinked} posts now link to ${rule.slug})\n`);
  }
}

console.log(`\n✅ Done. ${totalUpdated} blog posts updated with /conocimiento/ links.\n`);
