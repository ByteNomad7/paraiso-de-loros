#!/usr/bin/env node
/**
 * add-conocimiento-links-cities-species.js
 *
 * Adds contextual inline links from city pages (ciudades/*.html) and
 * species pages (especies/*\/index.html) to relevant /conocimiento/ sections.
 *
 * Strategy (same as add-conocimiento-links.js):
 *  - Skip if file already links to that conocimiento slug
 *  - Try to wrap the first trigger-term found in a <p>
 *  - Fallback: append a "Ver también" sentence to the last <p> in the body
 *  - Max 1 link per conocimiento section per file
 */

const fs   = require('fs');
const path = require('path');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

// ─── Body bounds for city pages ──────────────────────────────────────────────
function getCityBodyBounds(html) {
  const start = html.indexOf('<div class="content"');
  if (start === -1) return null;

  const candidates = [
    html.indexOf('<!-- MESH-LINKS-START'),
    html.indexOf('<div class="cta-box"'),
    html.indexOf('<footer'),
  ].filter(i => i !== -1 && i > start);
  if (!candidates.length) return null;
  return { start, end: Math.min(...candidates) };
}

// ─── Body bounds for species pages ───────────────────────────────────────────
function getSpeciesBodyBounds(html) {
  // Prefer the narrative article-body section
  let start = html.indexOf('<div class="article-body"');
  if (start === -1) {
    // Fallback: first <article> card section
    start = html.indexOf('<section class="sections"');
  }
  if (start === -1) return null;

  const candidates = [
    html.indexOf('<div class="fit-card"'),
    html.indexOf('<section class="gallery-section"'),
    html.indexOf('<section class="faq-section"'),
    html.indexOf('<section class="related-section"'),
    html.indexOf('<div class="final-cta"'),
    html.indexOf('<footer'),
  ].filter(i => i !== -1 && i > start);
  if (!candidates.length) return null;
  return { start, end: Math.min(...candidates) };
}

// ─── Link a term inside the first matching <p> ────────────────────────────────
function linkTermInBody(body, terms, slug) {
  let injected = false;
  const newBody = body.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, (pBlock) => {
    if (injected) return pBlock;
    const pLower = pBlock.toLowerCase();
    for (const term of terms) {
      if (!pLower.includes(term.toLowerCase())) continue;
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(
        `(^|[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ])(${escaped})(?=[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]|$)`,
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
  const lastP = body.lastIndexOf('</p>');
  if (lastP === -1) return null;
  const sentence = ` Consulta también nuestra <a href="${slug}">${label}</a>.`;
  return body.slice(0, lastP) + sentence + body.slice(lastP);
}

// ─── Generic apply function ───────────────────────────────────────────────────
function applyLinks(filePath, rules, getBounds) {
  if (!fs.existsSync(filePath)) return 0;
  let html = readFile(filePath);
  let changed = false;
  let linksAdded = 0;

  for (const { slug, label, terms } of rules) {
    // Skip if already links to this section
    if (html.includes(`href="${slug}"`)) continue;

    const bounds = getBounds(html);
    if (!bounds) continue;
    const { start, end } = bounds;
    let body = html.slice(start, end);

    let newBody = linkTermInBody(body, terms, slug);
    if (!newBody) {
      newBody = appendVerTambien(body, slug, label);
    }

    if (newBody && newBody !== body) {
      html = html.slice(0, start) + newBody + html.slice(end);
      changed = true;
      linksAdded++;
      console.log(`   ✓ ${filePath} → ${slug}`);
    }
  }

  if (changed) writeFile(filePath, html);
  return linksAdded;
}

// ─── CITY PAGE RULES ─────────────────────────────────────────────────────────
// Applied to all ciudades/*.html files
const CITY_RULES = [
  {
    slug: '/conocimiento/compra/',
    label: 'guía para comprar un loro',
    terms: ['comprar', 'criador', 'adquirir', 'compra', 'vendedor'],
  },
  {
    slug: '/conocimiento/cites-legal/',
    label: 'documentación CITES y marco legal',
    terms: ['CITES', 'documentación', 'documentacion', 'legal', 'certificado'],
  },
  {
    slug: '/conocimiento/salud/',
    label: 'guía de salud aviar',
    terms: ['veterinario', 'salud', 'clínica', 'clinica', 'revisión'],
  },
  {
    slug: '/conocimiento/instalaciones/',
    label: 'guía de instalaciones para loros',
    terms: ['jaula', 'instalaciones', 'espacio', 'habitación'],
  },
  {
    slug: '/conocimiento/guias-principiantes/',
    label: 'guía para nuevos propietarios de loros',
    terms: ['principiante', 'primer loro', 'primera vez', 'nuevo propietario'],
  },
];

// ─── SPECIES PAGE RULES ───────────────────────────────────────────────────────
// Applied to all especies/*/index.html files
const SPECIES_RULES = [
  {
    slug: '/conocimiento/nutricion/',
    label: 'guía de nutrición para loros',
    terms: ['alimentación', 'alimentacion', 'dieta', 'nutrición', 'nutricion', 'pellets', 'verduras', 'frutas'],
  },
  {
    slug: '/conocimiento/salud/',
    label: 'guía de salud aviar',
    terms: ['veterinario', 'salud', 'enfermedad', 'revisión', 'chequeo'],
  },
  {
    slug: '/conocimiento/comportamiento/',
    label: 'guía de comportamiento de loros',
    terms: ['comportamiento', 'socialización', 'socializacion', 'lenguaje corporal', 'carácter', 'personalidad'],
  },
  {
    slug: '/conocimiento/adiestramiento/',
    label: 'guía de adiestramiento de loros',
    terms: ['adiestramiento', 'entrenamiento', 'entrenar', 'trucos', 'aprender'],
  },
  {
    slug: '/conocimiento/instalaciones/',
    label: 'guía de instalaciones para loros',
    terms: ['jaula', 'instalaciones', 'espacio', 'perchas', 'vuelo libre'],
  },
  {
    slug: '/conocimiento/cites-legal/',
    label: 'documentación CITES y marco legal',
    terms: ['CITES', 'documentación', 'documentacion', 'legal', 'certificado', 'papeles'],
  },
  {
    slug: '/conocimiento/compra/',
    label: 'guía para comprar un loro',
    terms: ['comprar', 'adoptar', 'criador', 'adquirir'],
  },
  {
    slug: '/conocimiento/accesorios/',
    label: 'guía de accesorios para loros',
    terms: ['juguetes', 'accesorios', 'perchas', 'comedero'],
  },
  {
    slug: '/conocimiento/guias-principiantes/',
    label: 'guía para nuevos propietarios de loros',
    terms: ['principiante', 'primer loro', 'primera vez', 'no recomendado', 'experiencia previa'],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('\n🔗 add-conocimiento-links-cities-species — linking to /conocimiento/ sections\n');

let totalUpdated = 0;

// ── City pages ────────────────────────────────────────────────────────────────
console.log('📍 Processing city pages (ciudades/)…\n');
const cityFiles = fs.readdirSync('ciudades')
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .map(f => `ciudades/${f}`);

for (const filePath of cityFiles) {
  const added = applyLinks(filePath, CITY_RULES, getCityBodyBounds);
  if (added > 0) totalUpdated += added;
}

// ── Species pages ─────────────────────────────────────────────────────────────
console.log('\n🦜 Processing species pages (especies/)…\n');
const speciesDirs = fs.readdirSync('especies', { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => `especies/${d.name}/index.html`);

for (const filePath of speciesDirs) {
  const added = applyLinks(filePath, SPECIES_RULES, getSpeciesBodyBounds);
  if (added > 0) totalUpdated += added;
}

console.log(`\n✅ Done. ${totalUpdated} links added across city and species pages.\n`);
