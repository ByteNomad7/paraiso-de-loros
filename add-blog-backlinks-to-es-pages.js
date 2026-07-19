#!/usr/bin/env node
/**
 * add-blog-backlinks-to-es-pages.js
 *
 * Adds "Artículos de blog relacionados" sections to ES species and knowledge pages,
 * linking BACK to the relevant ES blog posts that discuss them.
 *
 * This completes the two-way internal link loop for the ES section:
 *   ES blog posts → ES species/knowledge pages  (add-contextual-body-links.js)
 *   ES species/knowledge pages → ES blog posts  (this script)
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
  'accesorios-esenciales-loro':       { title: 'Accesorios Esenciales para Loros', tag: 'Equipamiento', time: '5 min' },
  'adiestramiento-loros':             { title: 'Adiestramiento de Loros: Trucos y Técnicas', tag: 'Adiestramiento', time: '6 min' },
  'alimentos-seguros-loros':          { title: 'Alimentos Seguros para Loros: Lista Completa', tag: 'Nutrición', time: '5 min' },
  'amazona-loro-mascota':             { title: 'Amazona como Mascota: Guía Completa', tag: 'Especie', time: '7 min' },
  'amazona-real-vs-frente-azul':      { title: 'Amazona Real vs Frente Azul: Comparativa', tag: 'Comparativa', time: '5 min' },
  'cacatua-blanca-vs-galah':          { title: 'Cacatúa Blanca vs Galah: Comparativa', tag: 'Comparativa', time: '5 min' },
  'cacatua-galah-vs-ninfa':           { title: 'Cacatúa Galah vs Ninfa: Comparativa', tag: 'Comparativa', time: '5 min' },
  'caique-loro-mascota':              { title: 'Caique como Mascota: El Loro Payaso', tag: 'Especie', time: '6 min' },
  'cites-loros-espana':               { title: 'CITES y los Loros en España: Guía Completa', tag: 'CITES & Legal', time: '7 min' },
  'como-comprar-un-loro-en-espana':   { title: 'Cómo Comprar un Loro en España Legal y Seguro', tag: 'Compra', time: '6 min' },
  'como-domesticar-un-loro':          { title: 'Cómo Domesticar un Loro: Guía Paso a Paso', tag: 'Adiestramiento', time: '6 min' },
  'como-elegir-criador-loros-espana': { title: 'Cómo Elegir un Buen Criador de Loros', tag: 'Compra', time: '5 min' },
  'como-elegir-tu-primer-loro':       { title: 'Cómo Elegir Tu Primer Loro: Guía Completa', tag: 'Guía', time: '7 min' },
  'como-incubar-huevos-de-loro':      { title: 'Cómo Incubar Huevos de Loro Paso a Paso', tag: 'Cría', time: '6 min' },
  'conuro-loro-familia':              { title: 'El Conuro: El Loro Ideal para Familias', tag: 'Especie', time: '6 min' },
  'conuro-sol-vs-ninfa':              { title: 'Conuro del Sol vs Ninfa: Comparativa', tag: 'Comparativa', time: '5 min' },
  'cotorra-argentina-mascota':        { title: 'Cotorra Argentina como Mascota: Guía Completa', tag: 'Especie', time: '7 min' },
  'cria-loro-mano-vs-padres':         { title: 'Loro Criado a Mano vs Padres: Diferencias', tag: 'Cría', time: '6 min' },
  'cuanto-vive-un-loro':              { title: '¿Cuánto Vive un Loro? Esperanza de Vida', tag: 'Salud', time: '5 min' },
  'cuidados-cacatua-guia':            { title: 'Guía Completa de Cuidados de la Cacatúa', tag: 'Especie', time: '8 min' },
  'cuidados-diarios-loro':            { title: 'Cuidados Diarios del Loro: Rutina Completa', tag: 'Cuidados', time: '6 min' },
  'documentacion-loro-espana':        { title: 'Documentación para Tener un Loro en España', tag: 'CITES & Legal', time: '5 min' },
  'enfermedades-comunes-loros':       { title: 'Enfermedades Comunes de los Loros: Síntomas y Prevención', tag: 'Salud', time: '7 min' },
  'guia-alimentacion-loros':          { title: 'Guía Alimentación Loros: Completa 2026', tag: 'Nutrición', time: '7 min' },
  'guia-conuro-sol':                  { title: 'Guía Conuro del Sol: Especie Completa', tag: 'Especie', time: '7 min' },
  'guia-cuidados-loro':               { title: 'Guía de Cuidados del Loro: Todo lo que Necesitas', tag: 'Cuidados', time: '8 min' },
  'guia-veterinaria-loros':           { title: 'Guía Veterinaria para Loros: Chequeos y Salud', tag: 'Salud', time: '6 min' },
  'jaula-equipamiento-loro':          { title: 'Equipamiento Jaula Loro: Configuración Perfecta', tag: 'Equipamiento', time: '5 min' },
  'jaula-ideal-loro-tamano':          { title: 'Cómo Elegir la Jaula Ideal para tu Loro', tag: 'Equipamiento', time: '6 min' },
  'lenguaje-corporal-loros':          { title: 'Lenguaje Corporal de los Loros: Guía Completa', tag: 'Comportamiento', time: '6 min' },
  'loros-dociles-principiantes':      { title: 'Loros Más Dóciles para Principiantes: Top 6', tag: 'Guía', time: '5 min' },
  'loros-para-piso':                  { title: 'Loros para Piso y Apartamento: Guía 2026', tag: 'Guía', time: '5 min' },
  'mejores-loros-principiantes':      { title: 'Mejores Loros para Principiantes: Guía 2026', tag: 'Guía', time: '6 min' },
  'periquito-mascota-guia':           { title: 'Periquito como Mascota: Guía Completa', tag: 'Especie', time: '6 min' },
  'pionus-loro-mascota':              { title: 'Pionus como Mascota: El Loro Tranquilo', tag: 'Especie', time: '6 min' },
  'problemas-comportamiento-loros':   { title: 'Problemas de Comportamiento en Loros: Causas y Soluciones', tag: 'Comportamiento', time: '6 min' },
  'vacaciones-loro':                  { title: 'Loro en Vacaciones: Guía Completa', tag: 'Viajes', time: '5 min' },
  'viajar-con-loro':                  { title: 'Cómo Viajar con un Loro: Guía de Transporte', tag: 'Viajes', time: '5 min' },
};

function blogUrl(slug) {
  return `https://www.paraisodeaves.com/blog/${slug}.html`;
}

// ─── Page → blog post mapping ─────────────────────────────────────────────────
// Each entry: page file path → ordered array of blog slugs (most relevant first)
const PAGE_LINKS = {
  // ── Species pages ─────────────────────────────────────────────────────────
  'especies/amazona-ala-naranja/index.html':      ['amazona-loro-mascota', 'amazona-real-vs-frente-azul'],
  'especies/amazona-nuca-amarilla/index.html':    ['amazona-loro-mascota', 'cuanto-vive-un-loro'],
  'especies/cacatua-blanca/index.html':           ['cuidados-cacatua-guia', 'cacatua-blanca-vs-galah'],
  'especies/cacatua-galah/index.html':            ['cacatua-galah-vs-ninfa', 'cuidados-cacatua-guia'],
  'especies/cacatua-goffin/index.html':           ['cuidados-cacatua-guia', 'mejores-loros-principiantes'],
  'especies/caique/index.html':                  ['caique-loro-mascota', 'mejores-loros-principiantes'],
  'especies/conuro-del-sol/index.html':           ['guia-conuro-sol', 'conuro-sol-vs-ninfa'],
  'especies/conuro-jenday/index.html':            ['conuro-loro-familia', 'mejores-loros-principiantes'],
  'especies/conuro-mejilla-verde/index.html':     ['mejores-loros-principiantes', 'loros-dociles-principiantes'],
  'especies/cotorra-monje/index.html':            ['cotorra-argentina-mascota', 'mejores-loros-principiantes'],
  'especies/lorikeet-arcoiris/index.html':        ['guia-alimentacion-loros', 'alimentos-seguros-loros'],
  'especies/loro-pionus/index.html':              ['pionus-loro-mascota', 'loros-dociles-principiantes'],
  'especies/loro-senegal/index.html':             ['loros-dociles-principiantes', 'mejores-loros-principiantes'],
  'especies/periquito-alejandrino/index.html':    ['periquito-mascota-guia', 'mejores-loros-principiantes'],
  'especies/periquito-collar-indio/index.html':   ['periquito-mascota-guia', 'loros-para-piso'],

  // ── Knowledge pages ───────────────────────────────────────────────────────
  'conocimiento/accesorios/index.html':           ['accesorios-esenciales-loro', 'jaula-equipamiento-loro'],
  'conocimiento/adiestramiento/index.html':       ['adiestramiento-loros', 'como-domesticar-un-loro'],
  'conocimiento/cites-legal/index.html':          ['cites-loros-espana', 'documentacion-loro-espana'],
  'conocimiento/comportamiento/index.html':       ['lenguaje-corporal-loros', 'problemas-comportamiento-loros'],
  'conocimiento/compra/index.html':               ['como-comprar-un-loro-en-espana', 'como-elegir-criador-loros-espana'],
  'conocimiento/cria/index.html':                 ['cria-loro-mano-vs-padres', 'como-incubar-huevos-de-loro'],
  'conocimiento/guias-avanzadas/index.html':      ['guia-cuidados-loro', 'cuidados-diarios-loro'],
  'conocimiento/guias-principiantes/index.html':  ['como-elegir-tu-primer-loro', 'mejores-loros-principiantes'],
  'conocimiento/instalaciones/index.html':        ['jaula-ideal-loro-tamano', 'jaula-equipamiento-loro'],
  'conocimiento/nutricion/index.html':            ['guia-alimentacion-loros', 'alimentos-seguros-loros'],
  'conocimiento/salud/index.html':                ['enfermedades-comunes-loros', 'guia-veterinaria-loros'],
  'conocimiento/viajes/index.html':               ['viajar-con-loro', 'vacaciones-loro'],
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
      <span class="read-time">⏱ ${info.time} de lectura</span>
      <span class="read-link">Leer →</span>
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
  <!-- BLOG-BACKLINKS: artículos de blog relacionados — inyectado por add-blog-backlinks-to-es-pages.js -->
  <div class="otras-aves" style="margin-top:24px;">
    <h2>📰 Artículos de blog relacionados</h2>
    <div class="article-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:14px;">
      ${cards}
    </div>
    <div style="margin-top:14px;text-align:right;">
      <a href="https://www.paraisodeaves.com/blog/" style="font-size:.85rem;font-weight:700;color:var(--primary);">Ver todos nuestros artículos →</a>
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
    '<section class="otras-aves">',
  ];
  for (const m of markers) {
    const idx = html.indexOf(m);
    if (idx !== -1) return idx;
  }
  return -1;
}

/**
 * Find the injection point for a knowledge page: just before <div class="cta-band">.
 */
function findKnowledgeInjectionPoint(html) {
  const markers = [
    '<div class="cta-band">',
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
  const isSpecies   = filePath.includes('especies/');
  const isKnowledge = filePath.includes('conocimiento/');

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

console.log('\n🔗 add-blog-backlinks-to-es-pages — Adding blog post backlinks to ES species & knowledge pages\n');

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
  if (r.status === 'updated') {
    console.log(`  ✓ ${r.filePath}  →  ${r.slugs.join(', ')}`);
  } else if (r.status === 'missing') {
    console.log(`  ✗ MISSING: ${r.filePath}`);
  } else if (r.status === 'no_injection_point') {
    console.log(`  ⚠ no injection point: ${r.filePath}`);
  } else if (r.status === 'already_done') {
    console.log(`  ↩ already done: ${r.filePath}`);
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Pages updated (new blog links added): ${stats.updated}`);
console.log(`Already had BLOG-BACKLINKS section:   ${stats.already_done || 0}`);
console.log(`All target blog posts already linked: ${stats.already_linked || 0}`);
console.log(`Missing files:                        ${stats.missing || 0}`);
console.log(`No injection point found:             ${stats.no_injection_point || 0}`);
console.log('\n✅ ES blog backlink injection complete.\n');
