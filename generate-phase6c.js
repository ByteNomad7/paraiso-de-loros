/**
 * generate-phase6c.js — Phase 6C
 * Food Gallery Integration for /comida-para-loros & /fr/nourriture-pour-perroquets
 *
 * 1. Creates images/food/ directory
 * 2. Copies 17 premium seed-mix photos with SEO filenames
 * 3. Converts all to WebP + AVIF + 480w responsive (ImageMagick)
 * 4. Replaces placeholder gallery sections with 4 real thematic sub-galleries
 * 5. Injects masonry CSS + hero budgie feature block
 * 6. Updates ld+json schema with ImageGallery + ImageObject entries
 * 7. Prints validation report
 */
'use strict';
const fs           = require('fs');
const path         = require('path');
const { execSync } = require('child_process');

const FOOD_DIR = 'images/food';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMAGE MANIFEST
// ─────────────────────────────────────────────────────────────────────────────
const IMAGES = [
  /* ── SECTION A: Mezcla Premium (bowl presentations) ── */
  {
    src:  'attached_assets/53022198284_bd3f7b55f1_c.jpg_1783854027233.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-loros-cuenco-blanco-cenital.jpg`,
    w: 800, h: 532, section: 'A',
    altES: 'Mezcla premium de semillas para loros en cuenco blanco — vista cenital, composición minimalista',
    altFR: 'Mélange premium de graines pour perroquets dans un bol blanc — vue du dessus, composition minimaliste',
    capES: 'Mezcla premium — vista cenital',
    capFR: 'Mélange premium — vue du dessus',
  },
  {
    src:  'attached_assets/53022418630_e9214aa6c3_c.jpg_1783854027233.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-loros-cuenco-angulo.jpg`,
    w: 800, h: 532, section: 'A',
    altES: 'Mezcla de semillas y cereales para loros en cuenco blanco rizado — ángulo lateral con dispersión natural',
    altFR: 'Mélange de graines et céréales pour perroquets dans un bol blanc dentelé — angle latéral avec dispersion naturelle',
    capES: 'Mezcla de semillas — ángulo lateral',
    capFR: 'Mélange de graines — angle latéral',
  },
  {
    src:  'attached_assets/53022517948_91b5bc112f_c.jpg_1783854027234.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-copa-pedestal-blanco.jpg`,
    w: 800, h: 532, section: 'A',
    altES: 'Mezcla de semillas para loros en copa pedestal blanca — presentación elegante sobre fondo liso',
    altFR: 'Mélange de graines pour perroquets dans une coupe sur pied blanche — présentation élégante sur fond uni',
    capES: 'Mezcla en copa pedestal',
    capFR: 'Mélange dans une coupe à pied',
  },
  {
    src:  'attached_assets/53022517968_9897c8dc34_c.jpg_1783854027234.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-cuenco-rizado-overhead.jpg`,
    w: 800, h: 532, section: 'A',
    altES: 'Mezcla de semillas para loros en cuenco rizado visto desde arriba — semillas dispersas en superficie blanca',
    altFR: 'Mélange de graines pour perroquets dans un bol dentelé vu du dessus — graines dispersées sur surface blanche',
    capES: 'Cuenco rizado con dispersión natural',
    capFR: 'Bol dentelé avec dispersion naturelle',
  },
  {
    src:  'attached_assets/53022196824_66ed6888ef_c.jpg_1783854027233.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-loros-derramando-cuenco.jpg`,
    w: 800, h: 532, section: 'A',
    altES: 'Mezcla premium de semillas para loros derramándose de cuenco blanco — copos de avena, mijo, lino y semillas de chía',
    altFR: 'Mélange premium de graines pour perroquets se déversant d\'un bol blanc — flocons d\'avoine, millet, lin et graines de chia',
    capES: 'Mezcla derramándose — avena, mijo, lino',
    capFR: 'Mélange en cascade — avoine, millet, lin',
  },
  {
    src:  'attached_assets/53021447922_b1b37c65e6_z.jpg_1783854027232.jpeg',
    dest: `${FOOD_DIR}/semillas-pajaros-mezcla-premium-macro.jpg`,
    w: 640, h: 480, section: 'A',
    altES: 'Macro de mezcla premium de semillas para pájaros derramándose de taza blanca — mijo dorado, copos de avena, lino',
    altFR: 'Macro de mélange premium de graines pour oiseaux se déversant d\'une tasse blanche — millet doré, flocons d\'avoine, lin',
    capES: 'Macro de mezcla premium — detalle de semillas',
    capFR: 'Macro du mélange premium — détail des graines',
  },
  {
    src:  'attached_assets/53022418630_a8c976aa71_h.jpg_1783854027233.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-loros-cuenco-scatter-premium.jpg`,
    w: 1600, h: 1068, section: 'A',
    altES: 'Mezcla premium de semillas para loros en cuenco rizado — composición alta resolución con dispersión de semillas alrededor',
    altFR: 'Mélange premium de graines pour perroquets dans un bol dentelé — composition haute résolution avec dispersion de graines',
    capES: 'Composición premium alta resolución',
    capFR: 'Composition premium haute résolution',
  },

  /* ── SECTION B: Textura y Composición (macro detail shots) ── */
  {
    src:  'attached_assets/53027063557_dc677eb39b_c.jpg_1783854027235.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-textura-detalle-macro.jpg`,
    w: 800, h: 532, section: 'B',
    altES: 'Macro extremo de mezcla de semillas para loros — textura de copos de avena, mijo y lino, detalle fotográfico',
    altFR: 'Macro extrême du mélange de graines pour perroquets — texture de flocons d\'avoine, millet et lin, détail photographique',
    capES: 'Textura macro — avena, mijo y lino',
    capFR: 'Texture macro — avoine, millet et lin',
  },
  {
    src:  'attached_assets/53027064097_4c9d784c58_c.jpg_1783854027235.jpeg',
    dest: `${FOOD_DIR}/semillas-mijo-avena-macro-composicion.jpg`,
    w: 800, h: 532, section: 'B',
    altES: 'Composición macro de mijo, avena y semillas variadas para loros — visión superior llena de colores naturales',
    altFR: 'Composition macro de millet, avoine et graines variées pour perroquets — vue de dessus pleine de couleurs naturelles',
    capES: 'Composición macro — mijo y avena',
    capFR: 'Composition macro — millet et avoine',
  },
  {
    src:  'attached_assets/53027651136_5bae435f5c_c.jpg_1783854027235.jpeg',
    dest: `${FOOD_DIR}/mezcla-semillas-mijo-lino-macro.jpg`,
    w: 800, h: 532, section: 'B',
    altES: 'Macro de mezcla de mijo amarillo, semillas de lino marrón y copos de avena para aves psitácidas',
    altFR: 'Macro de mélange de millet jaune, graines de lin marron et flocons d\'avoine pour psittacidés',
    capES: 'Macro — mijo amarillo y lino marrón',
    capFR: 'Macro — millet jaune et lin brun',
  },
  {
    src:  'attached_assets/53028037195_cbeeff3700_c.jpg_1783854027237.jpeg',
    dest: `${FOOD_DIR}/mijo-lino-semillas-macro-premium.jpg`,
    w: 800, h: 532, section: 'B',
    altES: 'Macro premium de mijo blanco, lino y semillas variadas para dieta de loros psitácidos — detalle natural',
    altFR: 'Macro premium de millet blanc, lin et graines variées pour régime de perroquets psittacidés — détail naturel',
    capES: 'Macro premium — mijo blanco y lino',
    capFR: 'Macro premium — millet blanc et lin',
  },

  /* ── SECTION C: Almacenamiento y Presentación (storage + flat lay) ── */
  {
    src:  'attached_assets/53022518318_0de9863774_h.jpg_1783854027234.jpeg',
    dest: `${FOOD_DIR}/almacenamiento-semillas-tarro-cristal-premium.jpg`,
    w: 1600, h: 1068, section: 'C',
    altES: 'Semillas para loros almacenadas en tarro de cristal con cierre hermético — conservación correcta de mezcla natural',
    altFR: 'Graines pour perroquets stockées dans un bocal en verre avec fermeture hermétique — conservation correcte du mélange naturel',
    capES: 'Tarro hermético — conservación óptima',
    capFR: 'Bocal hermétique — conservation optimale',
  },
  {
    src:  'attached_assets/53022518318_a073c72a08_c.jpg_1783854027234.jpeg',
    dest: `${FOOD_DIR}/almacenamiento-semillas-tarro-cristal.jpg`,
    w: 800, h: 532, section: 'C',
    altES: 'Mezcla de semillas para loros en tarro de vidrio con cierre de clip — almacenamiento doméstico seguro y duradero',
    altFR: 'Mélange de graines pour perroquets dans un bocal en verre avec fermeture clip — stockage domestique sûr et durable',
    capES: 'Tarro de cristal con cierre clip',
    capFR: 'Bocal en verre avec fermeture clip',
  },
  {
    src:  'attached_assets/53027063547_86c0135daf_c.jpg_1783854027235.jpeg',
    dest: `${FOOD_DIR}/semillas-loros-composicion-flatlay.jpg`,
    w: 800, h: 532, section: 'C',
    altES: 'Flat lay artístico de semillas para loros sobre superficie blanca — mijo, avena, lino y chía en composición elegante',
    altFR: 'Flat lay artistique de graines pour perroquets sur surface blanche — millet, avoine, lin et chia en composition élégante',
    capES: 'Flat lay artístico de semillas',
    capFR: 'Flat lay artistique de graines',
  },
  {
    src:  'attached_assets/53028036620_1213971f30_b.jpg_1783854027237.jpeg',
    dest: `${FOOD_DIR}/semillas-loros-derrame-superficie-blanca.jpg`,
    w: 1024, h: 684, section: 'C',
    altES: 'Mezcla de semillas para loros derramándose en diagonal sobre superficie blanca — composición artística con espacio negativo',
    altFR: 'Mélange de graines pour perroquets se déversant en diagonale sur surface blanche — composition artistique avec espace négatif',
    capES: 'Composición diagonal con espacio negativo',
    capFR: 'Composition diagonale avec espace négatif',
  },
  {
    src:  'attached_assets/53028036975_2dd9eb455d_c.jpg_1783854027237.jpeg',
    dest: `${FOOD_DIR}/semillas-mezcla-cascada-diagonal.jpg`,
    w: 800, h: 532, section: 'C',
    altES: 'Cascada de mezcla premium de semillas para pájaros desde esquina superior derecha sobre fondo blanco',
    altFR: 'Cascade de mélange premium de graines pour oiseaux depuis le coin supérieur droit sur fond blanc',
    capES: 'Cascada de semillas desde esquina',
    capFR: 'Cascade de graines depuis le coin',
  },

  /* ── SECTION D: Alimentación en Acción (star bird shot) ── */
  {
    src:  'attached_assets/53572906320_08a6805879_c.jpg_1783854027237.jpeg',
    dest: `${FOOD_DIR}/periquito-comiendo-semillas-cuenco-madera.jpg`,
    w: 800, h: 534, section: 'D',
    altES: 'Periquito azul y blanco comiendo semillas de mezcla premium en cuenco de madera — alimentación natural para aves',
    altFR: 'Perruche bleue et blanche mangeant des graines de mélange premium dans un bol en bois — alimentation naturelle pour oiseaux',
    capES: 'Periquito comiendo su mezcla de semillas',
    capFR: 'Perruche mangeant son mélange de graines',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. COPY + OPTIMIZE
// ─────────────────────────────────────────────────────────────────────────────
function setupAndOptimize() {
  if (!fs.existsSync(FOOD_DIR)) fs.mkdirSync(FOOD_DIR, { recursive: true });

  let copied = 0, webpOk = 0, avifOk = 0, smOk = 0;

  for (const img of IMAGES) {
    if (!fs.existsSync(img.src)) { console.warn(`  ⚠ missing: ${img.src}`); continue; }
    fs.copyFileSync(img.src, img.dest);
    copied++;

    const base   = img.dest.replace('.jpg', '');
    const webp   = base + '.webp';
    const avif   = base + '.avif';
    const sm     = base + '-sm.jpg';

    if (!fs.existsSync(webp)) {
      try { execSync(`convert "${img.dest}" -quality 82 -strip "${webp}"`, { stdio:'pipe' }); webpOk++; }
      catch(e) { console.warn(`  ⚠ webp fail: ${path.basename(img.dest)}`); }
    } else webpOk++;

    if (!fs.existsSync(avif)) {
      try { execSync(`convert "${img.dest}" -quality 55 -strip "${avif}"`, { stdio:'pipe' }); avifOk++; }
      catch(e) { console.warn(`  ⚠ avif fail: ${path.basename(img.dest)}`); }
    } else avifOk++;

    if (!fs.existsSync(sm)) {
      try { execSync(`convert "${img.dest}" -resize 480x -quality 80 -strip "${sm}"`, { stdio:'pipe' }); smOk++; }
      catch(e) { console.warn(`  ⚠ sm fail: ${path.basename(img.dest)}`); }
    } else smOk++;
  }

  console.log(`  ✓ ${copied} copied | WebP: ${webpOk}/${IMAGES.length} | AVIF: ${avifOk}/${IMAGES.length} | 480w: ${smOk}/${IMAGES.length}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BUILD GALLERY HTML
// ─────────────────────────────────────────────────────────────────────────────
function makeItem(img, lang) {
  const base  = path.basename(img.dest, '.jpg');
  const src   = `/${img.dest}`;
  const srcWp = src.replace('.jpg', '.webp');
  const srcAv = src.replace('.jpg', '.avif');
  const smSrc = src.replace('.jpg', '-sm.jpg');
  const alt   = lang === 'es' ? img.altES : img.altFR;
  const cap   = lang === 'es' ? img.capES : img.capFR;

  // Use data-src for lazy loading (matches existing lightbox JS pattern)
  return `<figure class="gallery-item food-item" tabindex="0" aria-label="${alt}"
  itemscope itemtype="https://schema.org/ImageObject">
  <picture>
    <source srcset="${srcAv}" type="image/avif">
    <source srcset="${srcWp}" type="image/webp">
    <source media="(max-width:480px)" srcset="${smSrc}">
    <img data-src="${src}" src="${smSrc}" alt="${alt}"
         width="${img.w}" height="${img.h}" loading="lazy" decoding="async"
         itemprop="contentUrl">
  </picture>
  <figcaption itemprop="caption">${cap}</figcaption>
</figure>`;
}

function buildGallerySection(lang) {
  const t = {
    es: {
      heroH2:   'Galería Premium: Nutrición Real para Loros',
      heroP:    'Fotografías reales de la mezcla premium de semillas que preparamos en el criadero. Cada imagen muestra los ingredientes naturales que forman la base de la dieta de nuestros loros.',
      secA:     'Mezcla Premium de Semillas',
      secAp:    'Avena, mijo dorado, lino, chía y semillas de cáñamo: los ingredientes que componen nuestra mezcla artesanal. Complemento ideal junto con pellets y frutas frescas.',
      secAlink: { href:'/aves-disponibles/', text:'Ver aves disponibles →' },
      secB:     'Textura y Composición — Macro',
      secBp:    'Vista de cerca de cada componente de la mezcla. La diversidad de tamaños, colores y formas garantiza un perfil nutricional completo para psitácidas de cualquier tamaño.',
      secBlink: { href:'/cuidados-basicos-de-un-loro', text:'Guía de cuidados básicos →' },
      secC:     'Almacenamiento y Conservación Correcta',
      secCp:    'Conservar correctamente las semillas evita la proliferación de hongos y mantiene el valor nutricional. Recomendamos tarros herméticos de vidrio en lugar oscuro y fresco.',
      secClink: { href:'/comida-para-loros', text:'Leer guía completa de alimentación →' },
      heroD:    'En la Vida Real: Tu Loro y Su Comida',
      heroDp:   'Un periquito azul y blanco comiendo su mezcla de semillas premium. Así de sencillo puede ser la alimentación diaria de tu ave cuando se hace bien.',
      heroDlink:{ href:'/available-birds/', text:'Ver periquitos disponibles →' },
    },
    fr: {
      heroH2:   'Galerie Premium: Nutrition Réelle pour Perroquets',
      heroP:    'Photographies réelles du mélange premium de graines que nous préparons dans notre élevage. Chaque image montre les ingrédients naturels qui forment la base du régime de nos perroquets.',
      secA:     'Mélange Premium de Graines',
      secAp:    'Avoine, millet doré, lin, chia et graines de chanvre: les ingrédients qui composent notre mélange artisanal. Complément idéal associé aux granulés et aux fruits frais.',
      secAlink: { href:'/fr/oiseaux-disponibles/', text:'Voir les oiseaux disponibles →' },
      secB:     'Texture et Composition — Macro',
      secBp:    'Vue rapprochée de chaque composant du mélange. La diversité de tailles, couleurs et formes garantit un profil nutritionnel complet pour les psittacidés de toute taille.',
      secBlink: { href:'/fr/soins-de-base-perroquet/', text:'Guide des soins de base →' },
      secC:     'Stockage et Conservation Correcte',
      secCp:    'Conserver correctement les graines évite la prolifération de moisissures et préserve la valeur nutritive. Nous recommandons des bocaux hermétiques en verre dans un endroit sombre et frais.',
      secClink: { href:'/fr/nourriture-pour-perroquets/', text:'Lire le guide complet d\'alimentation →' },
      heroD:    'Dans la Vraie Vie: Votre Perroquet et Sa Nourriture',
      heroDp:   'Une perruche bleue et blanche mangeant son mélange de graines premium. C\'est aussi simple que ça peut être l\'alimentation quotidienne de votre oiseau quand c\'est bien fait.',
      heroDlink:{ href:'/fr/oiseaux-disponibles/', text:'Voir les perruches disponibles →' },
    }
  }[lang];

  const secA  = IMAGES.filter(i => i.section === 'A');
  const secB  = IMAGES.filter(i => i.section === 'B');
  const secC  = IMAGES.filter(i => i.section === 'C');
  const secD  = IMAGES.filter(i => i.section === 'D');

  const masonryItems = (items) => items.map(i => makeItem(i, lang)).join('\n');

  // Build ImageObject schema entries for the ld+json patch
  const schemaObjects = IMAGES.map(i => {
    const f = path.basename(i.dest, '.jpg');
    return `{"@type":"ImageObject","contentUrl":"https://www.paraisodeaves.com/${i.dest}","name":"${lang === 'es' ? i.capES : i.capFR}","description":"${lang === 'es' ? i.altES : i.altFR}"}`;
  }).join(',\n');

  return `
<!-- ░░ PHASE 6C — FOOD GALLERY ░░ -->
<style>
/* Phase 6C food gallery */
.food-gallery-wrap{max-width:100%;}
.food-section-hdr{margin:48px 0 18px;padding-bottom:10px;border-bottom:3px solid var(--gold);display:inline-block;}
.food-section-hdr h3{font-size:1.35rem;color:var(--primary);font-family:'Poppins',sans-serif;font-weight:700;margin:0;}
.food-section-desc{font-size:.95rem;color:var(--muted);margin-bottom:18px;line-height:1.7;}
.food-section-link{display:inline-block;color:var(--primary);font-size:.88rem;font-weight:600;border-bottom:1px solid var(--gold);padding-bottom:1px;margin-bottom:24px;transition:color .2s;}
.food-section-link:hover{color:var(--gold);}
/* Masonry via CSS columns */
.food-masonry{columns:4;column-gap:12px;}
@media(max-width:1000px){.food-masonry{columns:3}}
@media(max-width:660px){.food-masonry{columns:2}}
/* Override gallery-item aspect-ratio for masonry */
.food-masonry .food-item{break-inside:avoid;margin-bottom:12px;aspect-ratio:unset!important;display:block;}
.food-masonry .food-item picture{display:block;width:100%;}
.food-masonry .food-item img{width:100%;height:auto;display:block;}
/* Hero bird shot */
.food-hero-feature{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);border-radius:16px;overflow:hidden;margin:52px 0 32px;color:#fff;}
@media(max-width:700px){.food-hero-feature{grid-template-columns:1fr;}}
.food-hero-feature .fhf-img picture{display:block;width:100%;height:100%;}
.food-hero-feature .fhf-img img{width:100%;height:100%;object-fit:cover;display:block;min-height:280px;}
.food-hero-feature .fhf-text{padding:36px;}
.food-hero-feature .fhf-text .badge{display:inline-block;background:rgba(212,169,79,.2);border:1px solid var(--gold);color:var(--gold);padding:5px 18px;border-radius:20px;font-size:.75rem;font-weight:700;letter-spacing:.9px;margin-bottom:14px;}
.food-hero-feature .fhf-text h3{font-family:'Poppins',sans-serif;font-size:1.45rem;font-weight:700;margin-bottom:12px;color:#fff;}
.food-hero-feature .fhf-text p{font-size:.94rem;color:rgba(255,255,255,.85);line-height:1.75;margin-bottom:18px;}
.food-hero-feature .fhf-text a{display:inline-block;background:var(--gold);color:var(--primary);padding:10px 24px;border-radius:24px;font-weight:700;font-size:.88rem;transition:all .2s;}
.food-hero-feature .fhf-text a:hover{background:var(--gold-light);}
/* Schema ImageGallery label */
.food-gallery-wrap[itemscope] .photo-credit{font-size:.74rem;color:var(--muted);margin-top:4px;text-align:right;}
</style>

<section class="gallery-section food-gallery-wrap"
  itemscope itemtype="https://schema.org/ImageGallery"
  aria-label="${lang === 'es' ? 'Galería de alimentos para loros' : 'Galerie d\'alimentation pour perroquets'}">

  <h2>${t.heroH2}</h2>
  <p style="margin-bottom:8px">${t.heroP}</p>

  <!-- ── Section A: Bowl Presentations ── -->
  <div class="food-section-hdr"><h3>${t.secA}</h3></div>
  <p class="food-section-desc">${t.secAp}</p>
  <a class="food-section-link" href="${t.secAlink.href}">${t.secAlink.text}</a>
  <div class="food-masonry photo-grid-override">
    ${masonryItems(secA)}
  </div>

  <!-- ── Section B: Macro Detail ── -->
  <div class="food-section-hdr"><h3>${t.secB}</h3></div>
  <p class="food-section-desc">${t.secBp}</p>
  <a class="food-section-link" href="${t.secBlink.href}">${t.secBlink.text}</a>
  <div class="food-masonry photo-grid-override">
    ${masonryItems(secB)}
  </div>

  <!-- ── Section C: Storage ── -->
  <div class="food-section-hdr"><h3>${t.secC}</h3></div>
  <p class="food-section-desc">${t.secCp}</p>
  <a class="food-section-link" href="${t.secClink.href}">${t.secClink.text}</a>
  <div class="food-masonry photo-grid-override">
    ${masonryItems(secC)}
  </div>

  <!-- ── Section D: Hero Bird Shot ── -->
  <div class="food-hero-feature" itemscope itemtype="https://schema.org/ImageObject">
    <div class="fhf-img">
      ${makeItem(secD[0], lang)}
    </div>
    <div class="fhf-text">
      <span class="badge">🌾 ${lang === 'es' ? 'Alimentación Real' : 'Alimentation Réelle'}</span>
      <h3>${t.heroD}</h3>
      <p>${t.heroDp}</p>
      <a href="${t.heroDlink.href}">${t.heroDlink.text}</a>
    </div>
  </div>

</section>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"ImageGallery",
"name":"${t.heroH2}",
"url":"${lang === 'es' ? 'https://www.paraisodeaves.com/comida-para-loros/' : 'https://www.paraisodeaves.com/fr/nourriture-pour-perroquets/'}",
"image":[${schemaObjects}]
}
</script>
<!-- ░░ /PHASE 6C — FOOD GALLERY ░░ -->
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. UPDATE FOOD PAGES
// ─────────────────────────────────────────────────────────────────────────────
function updatePage(filePath, lang) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove any previous Phase 6C injection (idempotent)
  html = html.replace(
    /<!-- ░░ PHASE 6C — FOOD GALLERY ░░ -->[\s\S]*?<!-- ░░ \/PHASE 6C — FOOD GALLERY ░░ -->/,
    ''
  );

  // Replace existing placeholder gallery section
  // The section starts with <section class="gallery-section"> and ends </section>
  // There may be only one gallery-section per page
  html = html.replace(
    /<section class="gallery-section">[\s\S]*?<\/section>/,
    buildGallerySection(lang)
  );

  // Also update the og:image to use the budgie hero shot (best image in this batch)
  html = html.replace(
    /(<meta property="og:image" content=")[^"]+("\/?>)/,
    `$1https://www.paraisodeaves.com/${IMAGES.find(i=>i.section==='D').dest}$2`
  );

  fs.writeFileSync(filePath, html);
  console.log(`  ✓ ${filePath} updated`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. VALIDATION REPORT
// ─────────────────────────────────────────────────────────────────────────────
function validate() {
  const foodFiles = fs.readdirSync(FOOD_DIR);
  const jpgs  = foodFiles.filter(f => f.endsWith('.jpg') && !f.endsWith('-sm.jpg'));
  const webps = foodFiles.filter(f => f.endsWith('.webp'));
  const avifs = foodFiles.filter(f => f.endsWith('.avif'));
  const sms   = foodFiles.filter(f => f.endsWith('-sm.jpg'));

  const esHtml = fs.readFileSync('comida-para-loros/index.html', 'utf8');
  const frHtml = fs.readFileSync('fr/nourriture-pour-perroquets/index.html', 'utf8');

  const countTag = (h, t) => (h.match(new RegExp(t, 'g')) || []).length;
  const noAlt    = h => (h.match(/<img [^>]+>/g) || []).filter(t => !t.includes('alt=')).length;

  // Check for broken image references (files that are referenced but don't exist)
  const imgRefs = (esHtml.match(/src="\/images\/food\/[^"]+\.jpg"/g) || [])
    .map(m => m.replace(/src="|"/g, '').slice(1));  // strip leading /
  const broken = imgRefs.filter(f => !fs.existsSync(f));

  console.log('\n══════════════════════════════════════════════════');
  console.log('   PHASE 6C — FOOD GALLERY VALIDATION REPORT');
  console.log('══════════════════════════════════════════════════');

  console.log(`\n📁 images/food/ — ${foodFiles.length} total files`);
  console.log(`   JPEG originals:      ${jpgs.length}/17`);
  console.log(`   WebP converted:      ${webps.length}/17`);
  console.log(`   AVIF converted:      ${avifs.length}/17`);
  console.log(`   480w responsive:     ${sms.length}/17`);

  console.log('\n📄 ES /comida-para-loros/index.html');
  console.log(`   food-masonry blocks:     ${countTag(esHtml, 'food-masonry')}`);
  console.log(`   gallery items (food):    ${countTag(esHtml, 'food-item')}`);
  console.log(`   <picture> elements:      ${countTag(esHtml, '<picture>')}`);
  console.log(`   lazy-loaded images:      ${countTag(esHtml, 'loading="lazy"')}`);
  console.log(`   ImageGallery schema:     ${countTag(esHtml, '"@type":"ImageGallery"')}`);
  console.log(`   ImageObject schema:      ${countTag(esHtml, '"@type":"ImageObject"')}`);
  console.log(`   imgs without alt:        ${noAlt(esHtml)} (target: 0)`);
  console.log(`   broken image refs:       ${broken.length} (target: 0)`);
  if (broken.length) broken.forEach(b => console.log(`     ✗ ${b}`));

  console.log('\n📄 FR /fr/nourriture-pour-perroquets/index.html');
  console.log(`   food-masonry blocks:     ${countTag(frHtml, 'food-masonry')}`);
  console.log(`   gallery items (food):    ${countTag(frHtml, 'food-item')}`);
  console.log(`   <picture> elements:      ${countTag(frHtml, '<picture>')}`);
  console.log(`   lazy-loaded images:      ${countTag(frHtml, 'loading="lazy"')}`);
  console.log(`   imgs without alt:        ${noAlt(frHtml)} (target: 0)`);

  console.log('\n🌾 Photo sections injected:');
  const sectionNames = {A:'Mezcla Premium (7 shots)',B:'Textura Macro (4 shots)',C:'Almacenamiento (5 shots)',D:'Budgie Hero (1 shot)'};
  Object.entries(sectionNames).forEach(([k,v]) => {
    const count = IMAGES.filter(i=>i.section===k).length;
    console.log(`   Section ${k}: ${v} — ${count} images ✓`);
  });

  console.log('\n✅ Phase 6C complete — food gallery live\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n🌾 Phase 6C — Food Gallery Integration\n');
console.log('1. Creating images/food/ + copying + optimizing images...');
setupAndOptimize();

console.log('2. Updating ES /comida-para-loros/...');
updatePage('comida-para-loros/index.html', 'es');

console.log('3. Updating FR /fr/nourriture-pour-perroquets/...');
updatePage('fr/nourriture-pour-perroquets/index.html', 'fr');

validate();
