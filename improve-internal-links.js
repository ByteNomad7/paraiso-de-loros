#!/usr/bin/env node
/**
 * improve-internal-links.js
 *
 * Improves internal linking across paraisodeaves.com:
 *   1. Fix blog CTA links: /available-birds/ → /aves-disponibles/
 *   2. Add CTA block to blog posts that don't have one
 *   3. Fix species page footer links: /available-birds/ → /aves-disponibles/
 *   4. Add "Aves Disponibles" link to species page cross-link section
 *   5. Add species-specific contextual links in blog posts
 *   6. Add aves-disponibles link to city pages that lack it
 */

const fs   = require('fs');
const path = require('path');

// ─── File helpers ──────────────────────────────────────────────────────────────
function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

function findFiles(dir, ext) {
  const { execSync } = require('child_process');
  try {
    return execSync(`find ${dir} -name "*.${ext}" -type f 2>/dev/null`)
      .toString().trim().split('\n').filter(Boolean);
  } catch { return []; }
}

// ─── Stats ─────────────────────────────────────────────────────────────────────
const stats = {
  ctaFixed: 0,
  ctaAdded: 0,
  speciesFooterFixed: 0,
  speciesCtaAdded: 0,
  cityLinksFixed: 0,
  blogSpeciesLinks: 0,
};

// ─── 1. Blog posts: fix /available-birds/ → /aves-disponibles/ in CTAs ────────
function fixBlogCtas() {
  const files = findFiles('blog', 'html');
  for (const file of files) {
    if (file.includes('/index.html')) continue; // skip blog index
    let html = readFile(file);
    if (!html.includes('cta-inline')) continue;

    // Replace /available-birds/ with /aves-disponibles/ inside the CTA block
    const before = html;
    html = html.replace(
      /(<div class="cta-inline">[\s\S]*?<\/div>)/g,
      (block) => block.replace(/href="\/available-birds\/"/g, 'href="/aves-disponibles/"')
                      .replace(/href='\/available-birds\/'/g, "href='/aves-disponibles/'")
    );
    if (html !== before) {
      writeFile(file, html);
      stats.ctaFixed++;
    }
  }
}

// ─── CTA HTML template ──────────────────────────────────────────────────────────
const CTA_TEMPLATE = `
<div class="cta-inline">
  <h3>¿Buscas un Loro Criado a Mano con Garantías?</h3>
  <p>En Paraíso de Aves llevamos más de 25 años criando loros con documentación CITES oficial. Consulta disponibilidad sin compromiso.</p>
  <a href="/aves-disponibles/">Ver aves disponibles</a>
  <a href="mailto:paraisodeloros@gmail.com">✉ Solicitar información</a>
</div>`;

// Specific CTA variants for topic-relevant blog posts
function getCtaForFile(filename) {
  const f = path.basename(filename);
  if (f.includes('cacatua') || f.includes('cockatoo') || f.includes('cockatiel') || f.includes('ninfa')) {
    return `
<div class="cta-inline">
  <h3>¿Te interesa adoptar una Cacatúa?</h3>
  <p>Criamos cacatúas con documentación CITES completa y 25 años de experiencia. Consulta disponibilidad.</p>
  <a href="/aves-disponibles/">Ver aves disponibles</a>
  <a href="mailto:paraisodeloros@gmail.com">✉ Contactar</a>
</div>`;
  }
  if (f.includes('guacamayo') || f.includes('macaw')) {
    return `
<div class="cta-inline">
  <h3>¿Te interesa adoptar un Guacamayo?</h3>
  <p>Criamos guacamayos con documentación CITES oficial y asesoramiento incluido. Consulta disponibilidad.</p>
  <a href="/aves-disponibles/">Ver aves disponibles</a>
  <a href="mailto:paraisodeloros@gmail.com">✉ Contactar</a>
</div>`;
  }
  if (f.includes('yaco') || f.includes('gris-africano') || f.includes('african-grey') || f.includes('african_grey')) {
    return `
<div class="cta-inline">
  <h3>¿Te interesa adoptar un Loro Gris Africano?</h3>
  <p>Nuestros yacos son criados a mano con CITES oficial. La especie más inteligente del mundo, en las mejores manos.</p>
  <a href="/aves-disponibles/">Ver aves disponibles</a>
  <a href="mailto:paraisodeloros@gmail.com">✉ Contactar</a>
</div>`;
  }
  if (f.includes('madrid') || f.includes('barcelona') || f.includes('valencia') || f.includes('sevilla') || f.includes('criadero')) {
    return `
<div class="cta-inline">
  <h3>¿Buscas un Criador de Loros de Confianza en España?</h3>
  <p>Somos criadores registrados en Valencia con envío a toda España. CITES oficial, aves criadas a mano.</p>
  <a href="/aves-disponibles/">Ver aves disponibles</a>
  <a href="mailto:paraisodeloros@gmail.com">✉ Solicitar información</a>
</div>`;
  }
  if (f.includes('comprar') || f.includes('precio') || f.includes('price') || f.includes('buy') || f.includes('adopt') || f.includes('adoptar')) {
    return `
<div class="cta-inline">
  <h3>¿Listo para Adoptar tu Primer Loro?</h3>
  <p>Consulta nuestra selección de aves disponibles, todas criadas a mano con documentación CITES completa.</p>
  <a href="/aves-disponibles/">Ver aves disponibles</a>
  <a href="mailto:paraisodeloros@gmail.com">✉ Contactar ahora</a>
</div>`;
  }
  return CTA_TEMPLATE;
}

// ─── 2. Add CTA to blog posts without one ─────────────────────────────────────
function addMissingCtas() {
  const files = findFiles('blog', 'html');
  for (const file of files) {
    if (file.includes('/index.html')) continue;
    let html = readFile(file);
    if (html.includes('cta-inline')) continue;

    const cta = getCtaForFile(file);

    // Try inserting before <div class="related"> first
    if (html.includes('<div class="related">')) {
      html = html.replace('<div class="related">', cta + '\n<div class="related">');
      writeFile(file, html);
      stats.ctaAdded++;
      continue;
    }

    // Try inserting before </main>
    if (html.includes('</main>')) {
      html = html.replace('</main>', cta + '\n</main>');
      writeFile(file, html);
      stats.ctaAdded++;
      continue;
    }

    // Try inserting before </article>
    if (html.includes('</article>')) {
      html = html.replace('</article>', cta + '\n</article>');
      writeFile(file, html);
      stats.ctaAdded++;
    }
  }
}

// ─── 3. Fix species page footer links ─────────────────────────────────────────
function fixSpeciesFooters() {
  const files = findFiles('especies', 'html');
  for (const file of files) {
    let html = readFile(file);
    const before = html;

    // Fix footer aves links: /available-birds/X.html → /aves-disponibles/
    html = html
      .replace(/href="https:\/\/www\.paraisodeaves\.com\/available-birds\/loro-gris-africano\.html"/g,
               'href="https://www.paraisodeaves.com/aves-disponibles/"')
      .replace(/href="https:\/\/www\.paraisodeaves\.com\/available-birds\/guacamayo-azul-amarillo\.html"/g,
               'href="https://www.paraisodeaves.com/aves-disponibles/"')
      .replace(/href="https:\/\/www\.paraisodeaves\.com\/available-birds\/cacatua\.html"/g,
               'href="https://www.paraisodeaves.com/aves-disponibles/"')
      .replace(/href="https:\/\/www\.paraisodeaves\.com\/available-birds\/eclectus\.html"/g,
               'href="https://www.paraisodeaves.com/aves-disponibles/"')
      .replace(/href="https:\/\/www\.paraisodeaves\.com\/available-birds\/[^"]+"/g,
               'href="https://www.paraisodeaves.com/aves-disponibles/"');

    if (html !== before) {
      writeFile(file, html);
      stats.speciesFooterFixed++;
    }
  }
}

// ─── 4. Add aves-disponibles to species page cross-links ──────────────────────
function addSpeciesCtaLinks() {
  const files = findFiles('especies', 'html');
  for (const file of files) {
    let html = readFile(file);

    // Check if there's already a link to /aves-disponibles/ in the species cross-link block
    // These pages have a <ul> with species links. Add aves-disponibles if not there.
    if (html.includes('/aves-disponibles/')) continue;

    // Find the species cross-link <ul> and add aves-disponibles link before </ul>
    // The pattern: <ul><li><a href="/especies/...">...
    const speciesListPattern = /(<ul>(?:<li><a href="\/especies\/[^"]*">[^<]*<\/a><\/li>)+<\/ul>)/;
    if (speciesListPattern.test(html)) {
      html = html.replace(speciesListPattern, (match) => {
        return match.replace('</ul>',
          '<li><a href="/aves-disponibles/">🏠 Ver todas las aves disponibles</a></li></ul>');
      });
      writeFile(file, html);
      stats.speciesCtaAdded++;
    }
  }
}

// ─── 5. Add species-specific contextual links in blog posts ───────────────────
//   If a blog post mentions a specific species by name in its content but has no
//   link to the /especies/ page for that species, inject a link to the related
//   block or contextually near the first mention.

const SPECIES_MAP = [
  { slug: 'cacatua-blanca',         terms: ['cacatúa blanca', 'cacatua blanca', 'cacatua de moño', 'cacatúa de moño', 'cacatua alba'],          label: 'Cacatúa Blanca' },
  { slug: 'cacatua-galah',          terms: ['cacatúa galah', 'cacatua galah', 'galah'],                                                          label: 'Cacatúa Galah' },
  { slug: 'cacatua-goffin',         terms: ['cacatúa goffin', 'cacatua goffin', 'goffin'],                                                       label: 'Cacatúa Goffin' },
  { slug: 'amazona-ala-naranja',    terms: ['amazona ala naranja', 'amazona de ala naranja'],                                                     label: 'Amazona Ala Naranja' },
  { slug: 'amazona-nuca-amarilla',  terms: ['amazona nuca amarilla', 'amazona de nuca amarilla', 'amazona auropalliata'],                         label: 'Amazona Nuca Amarilla' },
  { slug: 'conuro-del-sol',         terms: ['conuro del sol', 'loro del sol', 'conuropsis'],                                                     label: 'Conuro del Sol' },
  { slug: 'conuro-jenday',          terms: ['conuro jenday', 'conuro de jenday', 'aratinga jandaya'],                                            label: 'Conuro Jenday' },
  { slug: 'conuro-mejilla-verde',   terms: ['conuro de mejilla verde', 'conuro mejilla verde', 'cotorra de mejillas verdes'],                    label: 'Conuro Mejilla Verde' },
  { slug: 'cotorra-monje',          terms: ['cotorra monje', 'loro monje', 'cotorra argentina', 'myiopsitta monachus'],                         label: 'Cotorra Monje' },
  { slug: 'caique',                 terms: ['caique', 'loro caique', 'loro caiqué'],                                                             label: 'Caique' },
  { slug: 'lorikeet-arcoiris',      terms: ['lorikeet', 'lori arcoíris', 'lori arcoiris'],                                                      label: 'Lorikeet Arcoíris' },
  { slug: 'loro-pionus',            terms: ['loro pionus', 'pionus'],                                                                            label: 'Loro Pionus' },
  { slug: 'loro-senegal',           terms: ['loro senegal', 'loro del senegal', 'poicephalus senegalus'],                                        label: 'Loro Senegal' },
  { slug: 'periquito-alejandrino',  terms: ['periquito alejandrino', 'alejandrina'],                                                             label: 'Periquito Alejandrino' },
  { slug: 'periquito-collar-indio', terms: ['periquito collar indio', 'periquito de collar', 'psittacula krameri'],                              label: 'Periquito Collar Indio' },
];

function addSpeciesBlogLinks() {
  const files = findFiles('blog', 'html');
  for (const file of files) {
    if (file.includes('/index.html')) continue;
    let html = readFile(file);
    let changed = false;

    for (const species of SPECIES_MAP) {
      // Skip if link already exists
      if (html.includes(`/especies/${species.slug}`)) continue;

      // Check if page mentions the species (case-insensitive)
      const found = species.terms.some(term => html.toLowerCase().includes(term.toLowerCase()));
      if (!found) continue;

      // Find the related-grid div and add a species card if it exists
      if (html.includes('<div class="related-grid">')) {
        const relatedCard = `<div class="related-card"><h3>${species.label}</h3><p>Guía completa de cuidados, carácter y alimentación.</p><a href="/especies/${species.slug}">Ver especie →</a></div>`;
        html = html.replace('<div class="related-grid">', '<div class="related-grid">' + relatedCard);
        changed = true;
        stats.blogSpeciesLinks++;
        break; // Add at most one species card per post
      }
    }

    if (changed) writeFile(file, html);
  }
}

// ─── 6. Fix city pages: update /available-birds/ CTA links ────────────────────
function fixCityLinks() {
  const files = findFiles('ciudades', 'html');
  for (const file of files) {
    let html = readFile(file);
    const before = html;

    html = html
      .replace(/href="\/available-birds\/"/g, 'href="/aves-disponibles/"')
      .replace(/href='\/available-birds\/'/g, "href='/aves-disponibles/'")
      .replace(/href="https:\/\/www\.paraisodeaves\.com\/available-birds\/"/g,
               'href="https://www.paraisodeaves.com/aves-disponibles/"');

    if (html !== before) {
      writeFile(file, html);
      stats.cityLinksFixed++;
    }
  }
}

// ─── 7. Fix aves-disponibles/index.html: add links back to especies + blog ────
function fixAvesDisponibles() {
  const file = 'aves-disponibles/index.html';
  let html = readFile(file);

  // Check if already has especies cross-link section
  if (html.includes('/especies/')) {
    console.log('  aves-disponibles/index.html already links to /especies/');
    return;
  }

  // Add a "Conoce nuestras especies" section before the footer
  const especiesSection = `
<section style="max-width:960px;margin:0 auto 40px;padding:0 5%">
  <h2 style="color:#1F3D2B;font-size:1.2rem;font-weight:800;margin-bottom:16px;border-bottom:2px solid #D4A94F;display:inline-block;padding-bottom:4px">Guías por especie</h2>
  <p style="color:#555;margin-bottom:16px">Antes de decidir, lee la guía completa de la especie que más te interesa:</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px">
    <a href="/especies/cacatua-blanca" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Cacatúa Blanca</a>
    <a href="/especies/cacatua-galah" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Cacatúa Galah</a>
    <a href="/especies/cacatua-goffin" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Cacatúa Goffin</a>
    <a href="/especies/amazona-ala-naranja" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Amazona Ala Naranja</a>
    <a href="/especies/conuro-del-sol" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Conuro del Sol</a>
    <a href="/especies/loro-senegal" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Loro Senegal</a>
    <a href="/especies/caique" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Caique</a>
    <a href="/especies/lorikeet-arcoiris" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Lorikeet Arcoíris</a>
    <a href="/especies/loro-pionus" style="display:block;padding:12px 14px;background:#f9f6f1;border:1px solid #e7e0d2;border-radius:10px;text-decoration:none;color:#1F3D2B;font-weight:600;font-size:.9rem">🦜 Loro Pionus</a>
    <a href="/especies/" style="display:block;padding:12px 14px;background:#1F3D2B;border-radius:10px;text-decoration:none;color:#fff;font-weight:700;font-size:.9rem">Ver todas →</a>
  </div>
</section>`;

  // Insert before the footer
  if (html.includes('<footer')) {
    html = html.replace('<footer', especiesSection + '\n<footer');
    writeFile(file, html);
    console.log('  aves-disponibles/index.html: added especies cross-link section');
  }
}

// ─── Run all improvements ──────────────────────────────────────────────────────
console.log('\n🔗 paraisodeaves — Internal Linking Improvement\n');

console.log('1. Fixing blog CTAs: /available-birds/ → /aves-disponibles/');
fixBlogCtas();
console.log(`   ✓ Fixed ${stats.ctaFixed} blog posts`);

console.log('2. Adding CTAs to blog posts without one');
addMissingCtas();
console.log(`   ✓ Added CTAs to ${stats.ctaAdded} blog posts`);

console.log('3. Fixing species page footer links');
fixSpeciesFooters();
console.log(`   ✓ Fixed ${stats.speciesFooterFixed} species pages`);

console.log('4. Adding aves-disponibles link to species cross-link sections');
addSpeciesCtaLinks();
console.log(`   ✓ Updated ${stats.speciesCtaAdded} species pages`);

console.log('5. Adding species guide links to relevant blog posts');
addSpeciesBlogLinks();
console.log(`   ✓ Added species links to ${stats.blogSpeciesLinks} blog posts`);

console.log('6. Fixing city page CTA links');
fixCityLinks();
console.log(`   ✓ Fixed ${stats.cityLinksFixed} city pages`);

console.log('7. Improving aves-disponibles hub page');
fixAvesDisponibles();

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Blog CTAs updated:          ${stats.ctaFixed}`);
console.log(`Blog CTAs added (new):      ${stats.ctaAdded}`);
console.log(`Species footer links fixed: ${stats.speciesFooterFixed}`);
console.log(`Species hub links added:    ${stats.speciesCtaAdded}`);
console.log(`Blog species links added:   ${stats.blogSpeciesLinks}`);
console.log(`City CTA links fixed:       ${stats.cityLinksFixed}`);
console.log('\n✅ Internal linking improvements complete.\n');
