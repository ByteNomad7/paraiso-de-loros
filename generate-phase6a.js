/**
 * generate-phase6a.js
 * Phase 6A — Homepage Premium Image System
 * • Copies 8 new real photographs to images/homepage/ with SEO filenames
 * • Converts ALL JPG files in images/homepage/ → WebP + AVIF via ImageMagick
 * • Generates 480w responsive copies
 * • Wraps existing <img> homepage tags in <picture> with AVIF/WebP sources
 * • Injects new food + hand-raised + gallery blocks into ES & FR homepages
 * • Refreshes ImageObject schema
 */

'use strict';
const fs            = require('fs');
const path          = require('path');
const { execSync }  = require('child_process');

const DIR = 'images/homepage';

// ─────────────────────────────────────────────────────────────────────────────
// 1. NEW IMAGE MANIFEST (from attached_assets/)
// ─────────────────────────────────────────────────────────────────────────────
const NEW_IMAGES = [
  {
    src:  'attached_assets/3232159423_e28cfce8fd_z.jpg_1783853478450.jpeg',
    dest: `${DIR}/macaw-pair-indoor-socialised.jpg`,
    w: 640, h: 480,
    altES: 'Pareja de guacamayos azul-amarillo y militar socializados en interior — criados a mano en Paraíso de Aves',
    altFR: 'Couple d\'aras bleu-et-jaune et militaire socialisés en intérieur — élevés à la main chez Paraíso de Aves',
    capES: 'Guacamayos socializados en interior',
    capFR: 'Aras socialisés en intérieur',
    role: 'gallery'
  },
  {
    src:  'attached_assets/3559504652_0dcee5e05f_c.jpg_1783853478451.jpeg',
    dest: `${DIR}/blue-yellow-macaws-eating-orange.jpg`,
    w: 800, h: 532,
    altES: 'Dos guacamayos azul y amarillo comiendo una naranja — dieta de frutas frescas en Paraíso de Aves',
    altFR: 'Deux aras bleus et jaunes mangeant une orange — régime de fruits frais chez Paraíso de Aves',
    capES: 'Guacamayos comiendo naranja fresca',
    capFR: 'Aras mangeant une orange fraîche',
    role: 'food'
  },
  {
    src:  'attached_assets/3229647925_59754180c1_c.jpg_1783853478452.jpeg',
    dest: `${DIR}/macaws-eating-seeds-together.jpg`,
    w: 800, h: 532,
    altES: 'Guacamayos comiendo mezcla de semillas y brotes germinados — alimentación natural premium',
    altFR: 'Aras mangeant un mélange de graines et de graines germées — alimentation naturelle premium',
    capES: 'Mezcla de semillas y brotes germinados',
    capFR: 'Graines et graines germées pour aras',
    role: 'food'
  },
  {
    src:  'attached_assets/3230495954_f151a03e19_c.jpg_1783853478452.jpeg',
    dest: `${DIR}/macaw-eating-seeds-foot-dexterity.jpg`,
    w: 800, h: 532,
    altES: 'Guacamayo azul y amarillo usando el pie para comer semillas — comportamiento natural e inteligencia',
    altFR: 'Ara bleu et jaune utilisant sa patte pour manger des graines — comportement naturel et intelligence',
    capES: 'Guacamayo comiendo con el pie — comportamiento natural',
    capFR: 'Ara utilisant sa patte pour manger',
    role: 'food'
  },
  {
    src:  'attached_assets/2736634009_49fc587022_b.jpg_1783853478452.jpeg',
    dest: `${DIR}/african-grey-fresh-fruit-diet.jpg`,
    w: 1024, h: 681,
    altES: 'Loro gris africano (Yaco) comiendo ensalada de frutas frescas — dieta natural equilibrada',
    altFR: 'Gris du Gabon mangeant une salade de fruits frais — régime naturel équilibré',
    capES: 'Yaco con ensalada de frutas frescas',
    capFR: 'Gris du Gabon et sa salade de fruits',
    role: 'food'
  },
  {
    src:  'attached_assets/2438492649_82af7150dc_c.jpg_1783853478452.jpeg',
    dest: `${DIR}/galah-cockatoo-hand-tamed-wings.jpg`,
    w: 800, h: 532,
    altES: 'Cacatúa Galah rosa en mano humana con las alas extendidas — ejemplo de crianza a mano en Paraíso de Aves',
    altFR: 'Cacatoès rosalbin rose sur main humaine avec ailes déployées — exemple d\'élevage à la main chez Paraíso de Aves',
    capES: 'Cacatúa Galah criada a mano — alas extendidas',
    capFR: 'Cacatoès rosalbin élevé à la main — ailes déployées',
    role: 'handraised'
  },
  {
    src:  'attached_assets/3535927002_2dbde76ae1_z.jpg_1783853478452.jpeg',
    dest: `${DIR}/macaw-eating-grape-closeup.jpg`,
    w: 640, h: 426,
    altES: 'Guacamayo naranja-verde comiendo una uva de cerca — frutas seguras en la dieta de loros',
    altFR: 'Ara orange-vert mangeant un raisin en gros plan — fruits sûrs dans le régime des perroquets',
    capES: 'Guacamayo saboreando una uva fresca',
    capFR: 'Ara savourant un raisin frais',
    role: 'food'
  },
  {
    src:  'attached_assets/3424853419_d16e2a443c_c.jpg_1783853478452.jpeg',
    dest: `${DIR}/african-grey-parrot-home-socialised.jpg`,
    w: 800, h: 600,
    altES: 'Loro gris africano Yaco socializado en entorno doméstico — se adapta perfectamente a la vida familiar',
    altFR: 'Gris du Gabon socialisé dans un environnement domestique — s\'adapte parfaitement à la vie familiale',
    capES: 'Yaco integrado en vida doméstica',
    capFR: 'Gris du Gabon dans un foyer',
    role: 'gallery'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. COPY NEW IMAGES
// ─────────────────────────────────────────────────────────────────────────────
function copyNewImages() {
  let ok = 0;
  for (const img of NEW_IMAGES) {
    if (!fs.existsSync(img.src)) { console.warn(`  ⚠ missing: ${img.src}`); continue; }
    fs.copyFileSync(img.src, img.dest);
    ok++;
  }
  console.log(`  ✓ ${ok} new images copied to ${DIR}/`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CONVERT ALL JPEGS → WebP + AVIF + 480w responsive
// ─────────────────────────────────────────────────────────────────────────────
function convertImages() {
  const jpgs = fs.readdirSync(DIR).filter(f => f.endsWith('.jpg') && !f.endsWith('-sm.jpg'));
  let webpOk = 0, avifOk = 0, smOk = 0;

  for (const jpg of jpgs) {
    const base     = path.join(DIR, jpg.replace('.jpg', ''));
    const src      = path.join(DIR, jpg);
    const webpDest = base + '.webp';
    const avifDest = base + '.avif';
    const smDest   = base + '-sm.jpg';

    // WebP — quality 82, strip metadata, fast
    if (!fs.existsSync(webpDest)) {
      try {
        execSync(`convert "${src}" -quality 82 -strip "${webpDest}"`, { stdio: 'pipe' });
        webpOk++;
      } catch(e) { console.warn(`  ⚠ webp failed: ${jpg}`); }
    } else { webpOk++; }

    // AVIF — quality 55 (file size ~40% of JPEG)
    if (!fs.existsSync(avifDest)) {
      try {
        execSync(`convert "${src}" -quality 55 -strip "${avifDest}"`, { stdio: 'pipe' });
        avifOk++;
      } catch(e) { console.warn(`  ⚠ avif failed: ${jpg}`); }
    } else { avifOk++; }

    // 480w responsive small version
    if (!fs.existsSync(smDest)) {
      try {
        execSync(`convert "${src}" -resize 480x -quality 80 -strip "${smDest}"`, { stdio: 'pipe' });
        smOk++;
      } catch(e) { console.warn(`  ⚠ sm failed: ${jpg}`); }
    } else { smOk++; }
  }

  console.log(`  ✓ WebP: ${webpOk}/${jpgs.length}  AVIF: ${avifOk}/${jpgs.length}  480w: ${smOk}/${jpgs.length}`);
  return jpgs.length;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. WRAP ALL homepage/img.jpg TAGS IN <picture> WITH AVIF+WebP SOURCES
// ─────────────────────────────────────────────────────────────────────────────
function wrapPictureTags(html) {
  // Match <img ... src="/images/homepage/NAME.jpg" ...> and wrap with <picture>
  // Skip tags already inside a <picture> (check for preceding <source)
  // Pattern: find every <img> block that has src="/images/homepage/....jpg"
  // Replace with <picture> + AVIF source + WebP source + original img + </picture>

  // First, skip already-wrapped tags (preceded by </source> or <picture>)
  // We do a two-pass approach: remove any existing wrappers first, then re-wrap uniformly

  // Remove any existing <picture> wrappers around homepage images (idempotent)
  html = html.replace(
    /<picture>\s*<source[^>]*\/images\/homepage\/[^>]+>\s*<source[^>]*\/images\/homepage\/[^>]+>\s*(<img [^>]+>)\s*<\/picture>/gs,
    '$1'
  );

  // Now wrap all homepage .jpg img tags
  html = html.replace(
    /(<img\s[^>]*src="\/images\/homepage\/([^"]+)\.jpg"[^>]*>)/gs,
    (match, imgTag, baseName) => {
      // Don't wrap if it's a sm (responsive) variant reference
      if (baseName.endsWith('-sm')) return match;
      return `<picture>`
           + `<source srcset="/images/homepage/${baseName}.avif" type="image/avif">`
           + `<source srcset="/images/homepage/${baseName}.webp" type="image/webp">`
           + imgTag
           + `</picture>`;
    }
  );

  return html;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. NEW SECTIONS TO INJECT
// ─────────────────────────────────────────────────────────────────────────────

// Extended food section — replaces existing ph6-food section
function buildFoodSectionES() {
  // 7 food images: 4 existing + 3 new
  const items = [
    { to: 'images/homepage/healthy-parrot-food-mix.jpg',      w:800, h:533,
      alt: 'Mezcla premium de semillas y pellets para loros — nutrición óptima',
      cap: 'Mezcla premium de semillas' },
    { to: 'images/homepage/blue-yellow-macaws-eating-orange.jpg', w:800, h:532,
      alt: 'Dos guacamayos azul y amarillo comiendo una naranja — dieta de frutas frescas',
      cap: 'Frutas frescas: naranja' },
    { to: 'images/homepage/macaws-eating-seeds-together.jpg',  w:800, h:532,
      alt: 'Guacamayos comiendo mezcla de semillas y brotes germinados — alimentación natural premium',
      cap: 'Semillas y brotes germinados' },
    { to: 'images/homepage/fresh-fruits-parrot-diet.jpg',      w:800, h:533,
      alt: 'Frutas frescas seguras para loros — dieta natural y equilibrada',
      cap: 'Frutas seguras variadas' },
    { to: 'images/homepage/macaw-eating-seeds-foot-dexterity.jpg', w:800, h:532,
      alt: 'Guacamayo usando el pie para comer semillas — comportamiento natural e inteligencia',
      cap: 'Alimentación con el pie' },
    { to: 'images/homepage/african-grey-fresh-fruit-diet.jpg', w:1024, h:681,
      alt: 'Loro gris africano Yaco comiendo ensalada de frutas frescas — dieta natural equilibrada',
      cap: 'Yaco con ensalada de frutas' },
    { to: 'images/homepage/macaw-eating-grape-closeup.jpg',    w:640, h:426,
      alt: 'Guacamayo naranja-verde comiendo una uva de cerca — frutas seguras en la dieta de loros',
      cap: 'Uva fresca — fruta permitida' },
  ];

  const base    = n => n.replace(/images\/homepage\//, '').replace('.jpg','');
  const figures = items.map(i => `
    <figure class="ph6-food-item" itemscope itemtype="https://schema.org/ImageObject">
      <picture>
        <source srcset="/${i.to.replace('.jpg','.avif')}" type="image/avif">
        <source srcset="/${i.to.replace('.jpg','.webp')}" type="image/webp">
        <img src="/${i.to}" alt="${i.alt}" width="${i.w}" height="${i.h}"
             loading="lazy" decoding="async" itemprop="contentUrl">
      </picture>
      <meta itemprop="name" content="${i.cap}">
      <figcaption>${i.cap}</figcaption>
    </figure>`).join('');

  return `
<!-- ░░ PHASE 6A — ALIMENTACIÓN ░░ -->
<section class="ph6-food" aria-label="Alimentación y nutrición para loros"
  itemscope itemtype="https://schema.org/ImageGallery">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Alimentación Premium</span>
      <h2>Nutrición Natural y Equilibrada</h2>
      <p>Una dieta de calidad es la base de la salud de cada loro. En Paraíso de Aves preparamos diariamente mezclas frescas de semillas, frutas, verduras y pellets adaptadas a cada especie y etapa de vida.</p>
    </div>
    <style>
      .ph6-food-strip-7{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
      @media(max-width:900px){.ph6-food-strip-7{grid-template-columns:repeat(3,1fr)}}
      @media(max-width:600px){.ph6-food-strip-7{grid-template-columns:repeat(2,1fr)}}
      .ph6-food-strip-7 picture{display:block;width:100%;height:100%}
    </style>
    <div class="ph6-food-strip-7">
${figures}
    </div>
    <div style="text-align:center">
      <a href="/comida-para-loros" class="ph6-food-link">Ver guía de alimentación completa →</a>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6A — ALIMENTACIÓN ░░ -->
`;
}

function buildFoodSectionFR() {
  const items = [
    { to: 'images/homepage/healthy-parrot-food-mix.jpg',      w:800, h:533,
      alt: 'Mélange premium de graines et granulés pour perroquets — nutrition optimale',
      cap: 'Mélange premium de graines' },
    { to: 'images/homepage/blue-yellow-macaws-eating-orange.jpg', w:800, h:532,
      alt: 'Deux aras bleus et jaunes mangeant une orange — régime de fruits frais',
      cap: 'Fruits frais : orange' },
    { to: 'images/homepage/macaws-eating-seeds-together.jpg',  w:800, h:532,
      alt: 'Aras mangeant un mélange de graines et de graines germées — alimentation naturelle premium',
      cap: 'Graines et graines germées' },
    { to: 'images/homepage/fresh-fruits-parrot-diet.jpg',      w:800, h:533,
      alt: 'Fruits frais sûrs pour perroquets — alimentation naturelle et équilibrée',
      cap: 'Fruits variés et sûrs' },
    { to: 'images/homepage/macaw-eating-seeds-foot-dexterity.jpg', w:800, h:532,
      alt: 'Ara utilisant sa patte pour manger des graines — comportement naturel et intelligence',
      cap: 'Alimentation avec la patte' },
    { to: 'images/homepage/african-grey-fresh-fruit-diet.jpg', w:1024, h:681,
      alt: 'Gris du Gabon mangeant une salade de fruits frais — régime naturel équilibré',
      cap: 'Gris du Gabon et ses fruits' },
    { to: 'images/homepage/macaw-eating-grape-closeup.jpg',    w:640, h:426,
      alt: 'Ara orange-vert mangeant un raisin en gros plan — fruits sûrs pour perroquets',
      cap: 'Raisin frais — fruit autorisé' },
  ];

  const figures = items.map(i => `
    <figure class="ph6-food-item" itemscope itemtype="https://schema.org/ImageObject">
      <picture>
        <source srcset="/${i.to.replace('.jpg','.avif')}" type="image/avif">
        <source srcset="/${i.to.replace('.jpg','.webp')}" type="image/webp">
        <img src="/${i.to}" alt="${i.alt}" width="${i.w}" height="${i.h}"
             loading="lazy" decoding="async" itemprop="contentUrl">
      </picture>
      <meta itemprop="name" content="${i.cap}">
      <figcaption>${i.cap}</figcaption>
    </figure>`).join('');

  return `
<!-- ░░ PHASE 6A — ALIMENTATION ░░ -->
<section class="ph6-food" aria-label="Alimentation et nutrition pour perroquets"
  itemscope itemtype="https://schema.org/ImageGallery">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Alimentation Premium</span>
      <h2>Nutrition Naturelle et Équilibrée</h2>
      <p>Une alimentation de qualité est la base de la santé de chaque perroquet. Chez Paraíso de Aves, nous préparons quotidiennement des mélanges frais de graines, fruits, légumes et granulés adaptés à chaque espèce et étape de vie.</p>
    </div>
    <style>
      .ph6-food-strip-7{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
      @media(max-width:900px){.ph6-food-strip-7{grid-template-columns:repeat(3,1fr)}}
      @media(max-width:600px){.ph6-food-strip-7{grid-template-columns:repeat(2,1fr)}}
      .ph6-food-strip-7 picture{display:block;width:100%;height:100%}
    </style>
    <div class="ph6-food-strip-7">
${figures}
    </div>
    <div style="text-align:center">
      <a href="/fr/nourriture-pour-perroquets/" class="ph6-food-link">Voir le guide complet d'alimentation →</a>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6A — ALIMENTATION ░░ -->
`;
}

// Galah hand-taming block — appended to Hand Raised section
function buildGalahBlockES() {
  return `
      <div class="ph6-hr-grid" style="margin-top:2px">
        <div class="ph6-hr-img">
          <picture>
            <source srcset="/images/homepage/galah-cockatoo-hand-tamed-wings.avif" type="image/avif">
            <source srcset="/images/homepage/galah-cockatoo-hand-tamed-wings.webp" type="image/webp">
            <img src="/images/homepage/galah-cockatoo-hand-tamed-wings.jpg"
                 alt="Cacatúa Galah rosa en mano humana con las alas extendidas — ejemplo de crianza a mano en Paraíso de Aves"
                 width="800" height="532" loading="lazy" decoding="async"
                 itemscope itemtype="https://schema.org/ImageObject" itemprop="contentUrl">
          </picture>
        </div>
        <div class="ph6-hr-text">
          <span class="badge">🦅 Vínculo humano-ave</span>
          <h3>El Resultado de Años de Dedicación</h3>
          <div class="ph6-hr-sep"></div>
          <p>Esta Cacatúa Galah es el ejemplo perfecto de lo que conseguimos con la crianza a mano: un ave que aterriza voluntariamente sobre cualquier persona, completamente relajada y sin miedo.</p>
          <p>Este nivel de confianza no se improvisa. Es el resultado de <strong>semanas de contacto diario desde el nido</strong>, paciencia y un protocolo de socialización que aplicamos a cada especie que criamos.</p>
          <a href="/nuestras-instalaciones/" class="ph6-link">Conocer nuestro proceso de socialización →</a>
        </div>
      </div>`;
}

function buildGalahBlockFR() {
  return `
      <div class="ph6-hr-grid" style="margin-top:2px">
        <div class="ph6-hr-img">
          <picture>
            <source srcset="/images/homepage/galah-cockatoo-hand-tamed-wings.avif" type="image/avif">
            <source srcset="/images/homepage/galah-cockatoo-hand-tamed-wings.webp" type="image/webp">
            <img src="/images/homepage/galah-cockatoo-hand-tamed-wings.jpg"
                 alt="Cacatoès rosalbin rose sur main humaine avec ailes déployées — exemple d'élevage à la main chez Paraíso de Aves"
                 width="800" height="532" loading="lazy" decoding="async"
                 itemscope itemtype="https://schema.org/ImageObject" itemprop="contentUrl">
          </picture>
        </div>
        <div class="ph6-hr-text">
          <span class="badge">🦅 Lien humain-oiseau</span>
          <h3>Le Résultat d'Années de Dévouement</h3>
          <div class="ph6-hr-sep"></div>
          <p>Ce Cacatoès rosalbin est l'exemple parfait de ce que nous obtenons grâce à l'élevage à la main : un oiseau qui atterrit volontairement sur n'importe quelle personne, totalement détendu et sans peur.</p>
          <p>Ce niveau de confiance ne s'improvise pas. C'est le résultat de <strong>semaines de contact quotidien depuis le nid</strong>, de patience et d'un protocole de socialisation appliqué à chaque espèce que nous élevons.</p>
          <a href="/fr/nos-installations/" class="ph6-link">Découvrir notre processus de socialisation →</a>
        </div>
      </div>`;
}

// New gallery items to extend the masonry
function buildNewGalleryImgsES() {
  const newItems = [
    { f:'macaw-pair-indoor-socialised', w:640, h:480,
      alt:'Pareja de guacamayos azul-amarillo y militar socializados en interior — criados a mano en Paraíso de Aves',
      cap:'Guacamayos socializados en interior' },
    { f:'african-grey-parrot-home-socialised', w:800, h:600,
      alt:'Loro gris africano Yaco socializado en entorno doméstico — se adapta perfectamente a la vida familiar',
      cap:'Yaco integrado en vida doméstica' },
  ];
  return newItems.map((i,idx) => `
      <figure onclick="ph6LB(${15+idx})" aria-label="${i.alt}" itemscope itemtype="https://schema.org/ImageObject">
        <picture>
          <source srcset="/images/homepage/${i.f}.avif" type="image/avif">
          <source srcset="/images/homepage/${i.f}.webp" type="image/webp">
          <img src="/images/homepage/${i.f}.jpg" alt="${i.alt}"
               width="${i.w}" height="${i.h}" loading="lazy" decoding="async" itemprop="contentUrl">
        </picture>
        <figcaption>${i.cap}</figcaption>
      </figure>`).join('');
}

function buildNewGalleryImgsFR() {
  const newItems = [
    { f:'macaw-pair-indoor-socialised', w:640, h:480,
      alt:'Couple d\'aras bleu-et-jaune et militaire socialisés en intérieur — élevés à la main chez Paraíso de Aves',
      cap:'Aras socialisés en intérieur' },
    { f:'african-grey-parrot-home-socialised', w:800, h:600,
      alt:'Gris du Gabon socialisé dans un environnement domestique — s\'adapte parfaitement à la vie familiale',
      cap:'Gris du Gabon dans un foyer' },
  ];
  return newItems.map((i,idx) => `
      <figure onclick="ph6LB(${15+idx})" aria-label="${i.alt}" itemscope itemtype="https://schema.org/ImageObject">
        <picture>
          <source srcset="/images/homepage/${i.f}.avif" type="image/avif">
          <source srcset="/images/homepage/${i.f}.webp" type="image/webp">
          <img src="/images/homepage/${i.f}.jpg" alt="${i.alt}"
               width="${i.w}" height="${i.h}" loading="lazy" decoding="async" itemprop="contentUrl">
        </picture>
        <figcaption>${i.cap}</figcaption>
      </figure>`).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. UPDATE ES index.html
// ─────────────────────────────────────────────────────────────────────────────
function updateES() {
  let html = fs.readFileSync('index.html', 'utf8');

  // 6a. Wrap existing homepage JPG img tags in <picture>
  html = wrapPictureTags(html);

  // 6b. Replace old food section with new 7-image version
  html = html.replace(
    /<!-- ░░ PHASE 6 — ALIMENTACIÓN ░░ -->[\s\S]*?<!-- ░░ \/PHASE 6 — ALIMENTACIÓN ░░ -->/,
    buildFoodSectionES()
  );
  // Handle Phase 6A marker too (idempotent re-runs)
  html = html.replace(
    /<!-- ░░ PHASE 6A — ALIMENTACIÓN ░░ -->[\s\S]*?<!-- ░░ \/PHASE 6A — ALIMENTACIÓN ░░ -->/,
    buildFoodSectionES()
  );

  // 6c. Inject galah block inside the Hand Raised section, before closing </section>
  if (!html.includes('galah-cockatoo-hand-tamed-wings')) {
    html = html.replace(
      '<!-- ░░ /PHASE 6 — CRIANZA A MANO ░░ -->',
      buildGalahBlockES() + '\n  </div>\n</section>\n<!-- ░░ /PHASE 6A — CRIANZA A MANO ░░ -->'
    );
    // Fix: remove the mismatched </div></section> from original closing
    html = html.replace(
      '</div>\n    </div>\n  </div>\n</section>\n<!-- ░░ /PHASE 6A — CRIANZA A MANO ░░ -->',
      '\n  </div>\n</section>\n<!-- ░░ /PHASE 6A — CRIANZA A MANO ░░ -->'
    );
  }

  // 6d. Add 2 new gallery figures before the closing of ph6-masonry div
  if (!html.includes('macaw-pair-indoor-socialised')) {
    html = html.replace(
      '</div>\n    <div class="ph6-gallery-cta">\n      <a href="/galeria/">',
      buildNewGalleryImgsES() + '\n    </div>\n    <div class="ph6-gallery-cta">\n      <a href="/galeria/">'
    );
  }

  fs.writeFileSync('index.html', html);
  console.log('  ✓ index.html (ES) updated');
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. UPDATE FR fr/index.html
// ─────────────────────────────────────────────────────────────────────────────
function updateFR() {
  let html = fs.readFileSync('fr/index.html', 'utf8');

  // 7a. Wrap picture tags
  html = wrapPictureTags(html);

  // 7b. Replace old food section
  html = html.replace(
    /<!-- ░░ PHASE 6 — ALIMENTATION ░░ -->[\s\S]*?<!-- ░░ \/PHASE 6 — ALIMENTATION ░░ -->/,
    buildFoodSectionFR()
  );
  html = html.replace(
    /<!-- ░░ PHASE 6A — ALIMENTATION ░░ -->[\s\S]*?<!-- ░░ \/PHASE 6A — ALIMENTATION ░░ -->/,
    buildFoodSectionFR()
  );

  // 7c. Inject galah block in Hand Raised section
  if (!html.includes('galah-cockatoo-hand-tamed-wings')) {
    html = html.replace(
      '<!-- ░░ /PHASE 6 — ÉLEVÉ À LA MAIN ░░ -->',
      buildGalahBlockFR() + '\n  </div>\n</section>\n<!-- ░░ /PHASE 6A — ÉLEVÉ À LA MAIN ░░ -->'
    );
    html = html.replace(
      '</div>\n    </div>\n  </div>\n</section>\n<!-- ░░ /PHASE 6A — ÉLEVÉ À LA MAIN ░░ -->',
      '\n  </div>\n</section>\n<!-- ░░ /PHASE 6A — ÉLEVÉ À LA MAIN ░░ -->'
    );
  }

  // 7d. Add new gallery figures
  if (!html.includes('macaw-pair-indoor-socialised')) {
    html = html.replace(
      '</div>\n    <div class="ph6-gallery-cta">\n      <a href="/fr/galerie/">',
      buildNewGalleryImgsFR() + '\n    </div>\n    <div class="ph6-gallery-cta">\n      <a href="/fr/galerie/">'
    );
  }

  fs.writeFileSync('fr/index.html', html);
  console.log('  ✓ fr/index.html (FR) updated');
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. PRINT FINAL VALIDATION REPORT
// ─────────────────────────────────────────────────────────────────────────────
function validate() {
  const files = fs.readdirSync(DIR);
  const jpgs  = files.filter(f => f.endsWith('.jpg') && !f.endsWith('-sm.jpg'));
  const webps = files.filter(f => f.endsWith('.webp'));
  const avifs = files.filter(f => f.endsWith('.avif'));
  const sms   = files.filter(f => f.endsWith('-sm.jpg'));

  const esHtml = fs.readFileSync('index.html','utf8');
  const frHtml = fs.readFileSync('fr/index.html','utf8');

  console.log('\n═══════════════════════════════════════════════');
  console.log('   PHASE 6A — VALIDATION REPORT');
  console.log('═══════════════════════════════════════════════');
  console.log(`\n📁 images/homepage/ — ${files.length} total files`);
  console.log(`   JPEG originals:     ${jpgs.length}`);
  console.log(`   WebP converted:     ${webps.length}`);
  console.log(`   AVIF converted:     ${avifs.length}`);
  console.log(`   480w responsive:    ${sms.length}`);

  const esLazy   = (esHtml.match(/loading="lazy"/g)||[]).length;
  const frLazy   = (frHtml.match(/loading="lazy"/g)||[]).length;
  const esPic    = (esHtml.match(/<picture>/g)||[]).length;
  const frPic    = (frHtml.match(/<picture>/g)||[]).length;
  const esSchema = (esHtml.match(/"@type": "ImageGallery"/g)||[]).length;
  const esIO     = (esHtml.match(/"@type": "ImageObject"/g)||[]).length;
  const esNoAlt  = (esHtml.match(/<img [^>]+>/g)||[]).filter(t=>!t.includes('alt=')).length;
  const frNoAlt  = (frHtml.match(/<img [^>]+>/g)||[]).filter(t=>!t.includes('alt=')).length;

  console.log('\n📄 ES index.html');
  console.log(`   <picture> elements:   ${esPic}`);
  console.log(`   lazy-loaded images:   ${esLazy}`);
  console.log(`   ImageGallery schema:  ${esSchema}`);
  console.log(`   ImageObject schema:   ${esIO}`);
  console.log(`   imgs without alt:     ${esNoAlt} (target: 0)`);
  console.log(`   hero preload:         ${esHtml.includes('fetchpriority="high"') ? '✓' : '✗'}`);

  console.log('\n📄 FR fr/index.html');
  console.log(`   <picture> elements:   ${frPic}`);
  console.log(`   lazy-loaded images:   ${frLazy}`);
  console.log(`   imgs without alt:     ${frNoAlt} (target: 0)`);

  const foodImgsES = (esHtml.match(/ph6-food-item/g)||[]).length;
  const galahES    = esHtml.includes('galah-cockatoo-hand-tamed-wings') ? '✓' : '✗';
  const masES      = (esHtml.match(/ph6-masonry/g)||[]).length;

  console.log('\n📸 Homepage Sections');
  console.log(`   Food strip images:    ${foodImgsES} (ES)`);
  console.log(`   Galah hand-taming:    ${galahES}`);
  console.log(`   Masonry galleries:    ${masES} (ES)`);

  console.log('\n✅ Phase 6A complete\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n🎨 Phase 6A — Premium Homepage Image Processing\n');
console.log('1. Copying new images...');
copyNewImages();

console.log('2. Converting JPEGs → WebP + AVIF + 480w (this may take ~30s)...');
const total = convertImages();

console.log('3. Updating ES homepage...');
updateES();

console.log('4. Updating FR homepage...');
updateFR();

validate();
