/**
 * generate-phase6.js
 * Phase 6 — Premium Homepage Image System
 * Paraíso de Aves — paraisodeaves.com
 *
 * Creates images/homepage/ with 20 curated SEO-named images,
 * then injects premium visual sections into index.html (ES) and fr/index.html (FR).
 */

'use strict';
const fs   = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
// 1. IMAGE MANIFEST
// ─────────────────────────────────────────────
const IMAGES = [
  // ── HERO ──────────────────────────────────────────────────────────────────
  {
    from: 'images/gallery/nosotros-zona-aviarios-multiple-05.jpg',
    to:   'images/homepage/paraiso-de-aves-aviary-exterior.jpg',
    w: 1200, h: 800,
    altES: 'Paraíso de Aves — instalaciones con aviarios múltiples en Llíria, Valencia',
    altFR: 'Paraíso de Aves — volières multiples dans notre élevage à Llíria, Valence',
    capES: 'Nuestros aviarios en Llíria, Valencia',
    capFR: 'Nos volières à Llíria, Valence',
    role: 'hero'
  },
  // ── FEATURED SPECIES ──────────────────────────────────────────────────────
  {
    from: 'images/guacamayo-jacinto-01.webp',
    to:   'images/homepage/hyacinth-macaw-hand-raised.webp',
    w: 800, h: 600,
    altES: 'Guacamayo jacinto criado a mano — el loro más grande del mundo, con CITES',
    altFR: 'Ara hyacinthe élevé à la main — le plus grand perroquet du monde, avec CITES',
    capES: 'Guacamayo Jacinto',
    capFR: 'Ara Hyacinthe',
    role: 'species', linkES: '/available-birds/guacamayo-jacinto.html', linkFR: '/fr/ara-hyacinthe/',
    descES: 'El loro más grande del mundo. Majestuoso, inteligente y de carácter gentil. CITES Apéndice I.',
    descFR: 'Le plus grand perroquet du monde. Majestueux, intelligent et calme. CITES Annexe I.'
  },
  {
    from: 'images/loro-gris-01.webp',
    to:   'images/homepage/african-grey-parrot-cites.webp',
    w: 800, h: 600,
    altES: 'Loro gris africano Yaco criado a mano — el loro más inteligente del mundo',
    altFR: 'Gris du Gabon élevé à la main — le perroquet le plus intelligent du monde',
    capES: 'Loro Gris Africano (Yaco)',
    capFR: 'Gris du Gabon (Yaco)',
    role: 'species', linkES: '/available-birds/loro-gris-africano.html', linkFR: '/fr/perroquet-gris-du-gabon/',
    descES: 'El loro más inteligente del mundo. Forma vínculos profundos y aprende centenares de palabras.',
    descFR: 'Le perroquet le plus intelligent. Crée des liens profonds et apprend des centaines de mots.'
  },
  {
    from: 'images/guacamayo-azul-01.webp',
    to:   'images/homepage/blue-yellow-macaw-social.webp',
    w: 800, h: 600,
    altES: 'Guacamayo azul y amarillo sociable criado a mano en criadero español',
    altFR: 'Ara bleu et jaune sociable élevé à la main dans un élevage espagnol',
    capES: 'Guacamayo Azul y Amarillo',
    capFR: 'Ara Bleu et Jaune',
    role: 'species', linkES: '/available-birds/guacamayo-azul-amarillo.html', linkFR: '/fr/ara-bleu-et-jaune/',
    descES: 'Sociable y enérgico. El guacamayo más popular en España. Criado a mano con CITES.',
    descFR: 'Très sociable et plein d\'énergie. L\'ara le plus populaire. Élevé à la main avec CITES.'
  },
  {
    from: 'images/guacamayo-escarlata-01.webp',
    to:   'images/homepage/scarlet-macaw-premium.webp',
    w: 800, h: 600,
    altES: 'Guacamayo escarlata — plumaje rojo espectacular criado con CITES en España',
    altFR: 'Ara macao — plumage rouge spectaculaire élevé avec CITES en Espagne',
    capES: 'Guacamayo Escarlata',
    capFR: 'Ara Macao',
    role: 'species', linkES: '/available-birds/guacamayo-escarlata.html', linkFR: '/fr/ara-macao/',
    descES: 'Plumaje rojo espectacular y carácter vivaz. Uno de los loros más llamativos del mundo.',
    descFR: 'Plumage rouge spectaculaire et caractère vif. L\'un des aras les plus impressionnants.'
  },
  {
    from: 'images/gallery/aves-disponibles-cacatua-galah-rosa-07.jpg',
    to:   'images/homepage/cockatoo-galah-pink.jpg',
    w: 800, h: 600,
    altES: 'Cacatúa Galah rosa criada a mano — personalidad afectuosa y plumaje único',
    altFR: 'Cacatoès rosalbin rose élevé à la main — personnalité affectueuse et plumage unique',
    capES: 'Cacatúa Galah',
    capFR: 'Cacatoès Rosalbin',
    role: 'species', linkES: '/available-birds/cacatua-galah.html', linkFR: '/fr/cacatoes-rosalbin/',
    descES: 'Personalidad afectuosa, curiosa y llena de vida. Plumaje rosa único. Criada a mano.',
    descFR: 'Personnalité affectueuse et curieuse. Plumage rose unique. Élevé à la main.'
  },
  {
    from: 'images/loro-amazonico-01.webp',
    to:   'images/homepage/amazon-parrot-hand-raised.webp',
    w: 800, h: 600,
    altES: 'Amazona loro amazónico hablador criado a mano con documentación CITES',
    altFR: 'Amazone bavarde élevée à la main avec documentation CITES officielle',
    capES: 'Amazona (Loro Amazónico)',
    capFR: 'Amazone Front Bleu',
    role: 'species', linkES: '/available-birds/loro-amazonico.html', linkFR: '/fr/amazone-front-bleu/',
    descES: 'El psitácido hablador por excelencia. Expresivo, social y con gran capacidad de imitación.',
    descFR: 'Le perroquet bavard par excellence. Expressif, sociable et doué pour l\'imitation.'
  },
  // ── AVIARY GALLERY (15 images) ────────────────────────────────────────────
  {
    from: 'images/gallery/nosotros-aviario-exterior-criadero-02.jpg',
    to:   'images/homepage/paraiso-de-aves-facility-exterior.jpg',
    w: 900, h: 600,
    altES: 'Exterior del criadero Paraíso de Aves — instalaciones profesionales en Llíria',
    altFR: 'Extérieur de l\'élevage Paraíso de Aves — installations professionnelles à Llíria',
    capES: 'Exterior del criadero', capFR: 'Extérieur de l\'élevage',
    role: 'gallery'
  },
  {
    from: 'images/gallery/nosotros-cuidador-guacamayo-socializacion-04.jpg',
    to:   'images/homepage/hand-raised-macaw-breeder.jpg',
    w: 900, h: 600,
    altES: 'Criador socializando con guacamayo — proceso de crianza a mano en Paraíso de Aves',
    altFR: 'Éleveur socialisant avec un ara — processus d\'élevage à la main chez Paraíso de Aves',
    capES: 'Socialización con el criador', capFR: 'Socialisation avec l\'éleveur',
    role: 'gallery'
  },
  {
    from: 'images/gallery/nosotros-guacamayos-percha-natural-06.jpg',
    to:   'images/homepage/socialised-macaws-natural-perch.jpg',
    w: 900, h: 600,
    altES: 'Guacamayos socializados en percha natural — bienestar en Paraíso de Aves',
    altFR: 'Aras socialisés sur perchoir naturel — bien-être chez Paraíso de Aves',
    capES: 'Guacamayos en percha natural', capFR: 'Aras sur perchoir naturel',
    role: 'gallery'
  },
  {
    from: 'images/gallery/nosotros-amazona-crianza-mano-09.jpg',
    to:   'images/homepage/hand-feeding-amazon-parrot.jpg',
    w: 900, h: 600,
    altES: 'Amazona en crianza a mano — pichón papillero en Paraíso de Aves Valencia',
    altFR: 'Amazone en élevage à la main — poussin nourri à la main chez Paraíso de Aves',
    capES: 'Crianza a mano de amazona', capFR: 'Élevage à la main d\'une amazone',
    role: 'gallery'
  },
  {
    from: 'images/gallery/nosotros-loros-juego-enriquecimiento-10.jpg',
    to:   'images/homepage/parrot-enrichment-play.jpg',
    w: 900, h: 600,
    altES: 'Loros en enriquecimiento ambiental y juego — bienestar en criadero español',
    altFR: 'Perroquets en enrichissement et jeu — bien-être dans notre élevage espagnol',
    capES: 'Enriquecimiento y juego diario', capFR: 'Enrichissement et jeu quotidien',
    role: 'gallery'
  },
  {
    from: 'images/gallery/nosotros-jaula-interior-equipada-03.jpg',
    to:   'images/homepage/premium-parrot-cage-interior.jpg',
    w: 900, h: 600,
    altES: 'Jaula interior equipada para loros — instalaciones premium en Paraíso de Aves',
    altFR: 'Cage intérieure équipée pour perroquets — installations premium chez Paraíso de Aves',
    capES: 'Jaulas interiores equipadas', capFR: 'Cages intérieures équipées',
    role: 'gallery'
  },
  {
    from: 'images/gallery/nosotros-amazona-loro-sociable-07.jpg',
    to:   'images/homepage/sociable-amazon-parrot.jpg',
    w: 900, h: 600,
    altES: 'Loro amazónico sociable y dócil — criado a mano en criadero español',
    altFR: 'Amazone sociable et docile — élevée à la main dans notre élevage espagnol',
    capES: 'Amazona sociable y dócil', capFR: 'Amazone sociable et docile',
    role: 'gallery'
  },
  {
    from: 'images/gallery/aves-disponibles-tucan-retrato-primer-plano-20.jpg',
    to:   'images/homepage/toucan-portrait-closeup.jpg',
    w: 900, h: 600,
    altES: 'Tucán retrato primer plano — aves exóticas disponibles en Paraíso de Aves',
    altFR: 'Portrait en gros plan d\'un toucan — oiseaux exotiques chez Paraíso de Aves',
    capES: 'Tucán — primer plano', capFR: 'Toucan — gros plan',
    role: 'gallery'
  },
  {
    from: 'images/gallery/aves-disponibles-loro-gris-africano-volando-12.jpg',
    to:   'images/homepage/african-grey-parrot-flying.jpg',
    w: 900, h: 600,
    altES: 'Loro gris africano en vuelo libre — socializado en Paraíso de Aves',
    altFR: 'Gris du Gabon en vol libre — socialisé chez Paraíso de Aves',
    capES: 'Yaco en vuelo libre', capFR: 'Yaco en vol libre',
    role: 'gallery'
  },
  {
    from: 'images/gallery/aves-disponibles-guacamayos-azul-amarillo-pareja-05.jpg',
    to:   'images/homepage/macaw-pair-blue-yellow.jpg',
    w: 900, h: 600,
    altES: 'Pareja de guacamayos azul y amarillo — criados a mano en España',
    altFR: 'Couple d\'aras bleus et jaunes — élevés à la main en Espagne',
    capES: 'Pareja de guacamayos', capFR: 'Couple d\'aras bleus',
    role: 'gallery'
  },
  {
    from: 'images/gallery/aves-disponibles-loros-socializados-humano-15.jpg',
    to:   'images/homepage/parrots-socialised-with-human.jpg',
    w: 900, h: 600,
    altES: 'Loros socializados con humanos — proceso de crianza responsable en España',
    altFR: 'Perroquets socialisés avec les humains — processus d\'élevage responsable en Espagne',
    capES: 'Loros socializados con personas', capFR: 'Perroquets socialisés avec l\'humain',
    role: 'gallery'
  },
  {
    from: 'images/gallery/aves-disponibles-tucan-tropical-exterior-18.jpg',
    to:   'images/homepage/toucan-tropical-exterior.jpg',
    w: 900, h: 600,
    altES: 'Tucán tropical en exterior — ave exótica disponible en Paraíso de Aves',
    altFR: 'Toucan tropical en extérieur — oiseau exotique disponible chez Paraíso de Aves',
    capES: 'Tucán en exterior', capFR: 'Toucan en extérieur',
    role: 'gallery'
  },
  {
    from: 'images/gallery/aves-disponibles-cacatua-galah-exterior-08.jpg',
    to:   'images/homepage/cockatoo-outdoor-aviary.jpg',
    w: 900, h: 600,
    altES: 'Cacatúa Galah en aviario exterior — bienestar animal en criadero Paraíso de Aves',
    altFR: 'Cacatoès rosalbin dans la volière extérieure — bien-être animal chez Paraíso de Aves',
    capES: 'Cacatúa en aviario exterior', capFR: 'Cacatoès en volière extérieure',
    role: 'gallery'
  },
  {
    from: 'images/gallery/aves-disponibles-cacatua-galah-dormida-10.jpg',
    to:   'images/homepage/cockatoo-resting-content.jpg',
    w: 900, h: 600,
    altES: 'Cacatúa Galah descansando — loros felices y bien cuidados en Paraíso de Aves',
    altFR: 'Cacatoès rosalbin au repos — perroquets heureux et bien soignés chez Paraíso de Aves',
    capES: 'Cacatúa en reposo tranquilo', capFR: 'Cacatoès au repos paisible',
    role: 'gallery'
  },
  // ── FOOD ──────────────────────────────────────────────────────────────────
  {
    from: 'images/gallery/comida-para-loros-mezcla-premium-01.jpg',
    to:   'images/homepage/healthy-parrot-food-mix.jpg',
    w: 800, h: 533,
    altES: 'Mezcla premium de semillas y pellets para loros — nutrición óptima en Paraíso de Aves',
    altFR: 'Mélange premium de graines et granulés pour perroquets — nutrition optimale chez Paraíso de Aves',
    capES: 'Mezcla premium de semillas', capFR: 'Mélange premium de graines',
    role: 'food'
  },
  {
    from: 'images/gallery/frutas-seguras-para-loros-03.jpg',
    to:   'images/homepage/fresh-fruits-parrot-diet.jpg',
    w: 800, h: 533,
    altES: 'Frutas frescas seguras para loros — dieta natural y equilibrada',
    altFR: 'Fruits frais sûrs pour perroquets — alimentation naturelle et équilibrée',
    capES: 'Frutas frescas para loros', capFR: 'Fruits frais pour perroquets',
    role: 'food'
  },
  {
    from: 'images/gallery/verduras-para-loros-dieta-04.jpg',
    to:   'images/homepage/fresh-vegetables-parrot.jpg',
    w: 800, h: 533,
    altES: 'Verduras frescas para loros — parte esencial de la dieta psitácida',
    altFR: 'Légumes frais pour perroquets — partie essentielle du régime des psittacidés',
    capES: 'Verduras frescas diarias', capFR: 'Légumes frais quotidiens',
    role: 'food'
  },
  {
    from: 'images/gallery/rutina-alimentacion-loro-diaria-11.jpg',
    to:   'images/homepage/daily-parrot-feeding-routine.jpg',
    w: 800, h: 533,
    altES: 'Rutina de alimentación diaria del loro — cuidado profesional en Paraíso de Aves',
    altFR: 'Routine d\'alimentation quotidienne du perroquet — soins professionnels chez Paraíso de Aves',
    capES: 'Rutina de alimentación diaria', capFR: 'Routine d\'alimentation quotidienne',
    role: 'food'
  },
  // ── DELIVERY ──────────────────────────────────────────────────────────────
  {
    from: 'images/gallery/transportin-loro-caja-viaje-01.webp',
    to:   'images/homepage/professional-parrot-transport.webp',
    w: 800, h: 533,
    altES: 'Transportín profesional IATA para loros — envíos seguros a toda España y Europa',
    altFR: 'Caisse de transport IATA professionnelle pour perroquets — livraisons sécurisées en France et en Europe',
    capES: 'Transportín certificado IATA', capFR: 'Caisse IATA certifiée',
    role: 'delivery'
  }
];

// ─────────────────────────────────────────────
// 2. COPY IMAGES TO images/homepage/
// ─────────────────────────────────────────────
function copyImages() {
  if (!fs.existsSync('images/homepage')) fs.mkdirSync('images/homepage', { recursive: true });
  let copied = 0, skipped = 0;
  for (const img of IMAGES) {
    if (!fs.existsSync(img.from)) { console.warn(`  ⚠ source missing: ${img.from}`); continue; }
    try {
      fs.copyFileSync(img.from, img.to);
      copied++;
    } catch(e) { console.warn(`  ⚠ copy failed: ${img.from} → ${img.to}`); skipped++; }
  }
  console.log(`  ✓ Images: ${copied} copied, ${skipped} skipped`);
}

// ─────────────────────────────────────────────
// 3. SECTION BUILDERS
// ─────────────────────────────────────────────

function ph6css() {
  return `
<!-- ═══════════════════════════════════════ PHASE 6 CSS ═══ -->
<style id="ph6-styles">
/* ── Featured Species ───────────────────────────────────── */
.ph6-species{background:#F8F5F0;padding:5rem 5%}
.ph6-species .ph6-wrap{max-width:1200px;margin:0 auto}
.ph6-sh{text-align:center;margin-bottom:2.8rem}
.ph6-sh .label{display:inline-block;font-size:.78rem;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:#D4A94F;background:rgba(212,169,79,.12);
  padding:.3rem .9rem;border-radius:999px;margin-bottom:.9rem}
.ph6-sh h2{font-family:'Poppins',Arial,sans-serif;font-size:clamp(1.6rem,3.5vw,2.3rem);
  font-weight:900;color:#1F3D2B;margin:0 0 .6rem}
.ph6-sh p{color:#5C5C5C;font-size:1rem;max-width:65ch;margin:0 auto}
.ph6-species-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6rem}
@media(max-width:900px){.ph6-species-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.ph6-species-grid{grid-template-columns:1fr}}
.ph6-sc{border-radius:20px;overflow:hidden;background:#fff;
  box-shadow:0 6px 28px rgba(31,61,43,.10);
  border:1px solid rgba(212,169,79,.18);
  transition:transform .28s,box-shadow .28s;display:flex;flex-direction:column}
.ph6-sc:hover{transform:translateY(-7px);box-shadow:0 18px 50px rgba(31,61,43,.18)}
.ph6-sc-img{position:relative;overflow:hidden;aspect-ratio:4/3}
.ph6-sc-img img{width:100%;height:100%;object-fit:cover;display:block;
  transition:transform .5s ease}
.ph6-sc:hover .ph6-sc-img img{transform:scale(1.06)}
.ph6-sc-body{padding:1.3rem 1.4rem 1.5rem;flex:1;display:flex;flex-direction:column}
.ph6-sc-body h3{font-family:'Poppins',Arial,sans-serif;font-size:1.05rem;
  font-weight:800;color:#1F3D2B;margin:0 0 .5rem}
.ph6-sc-body p{color:#5C5C5C;font-size:.88rem;line-height:1.65;flex:1;margin-bottom:1rem}
.ph6-sc-btn{display:inline-block;padding:.5rem 1.2rem;border-radius:999px;
  background:linear-gradient(135deg,#1F3D2B,#2B533C);
  color:#fff;font-weight:700;font-size:.82rem;text-decoration:none;
  font-family:'Poppins',Arial,sans-serif;align-self:flex-start;
  transition:background .22s}
.ph6-sc:hover .ph6-sc-btn{background:linear-gradient(135deg,#D4A94F,#B8933E)}

/* ── Premium Gallery ────────────────────────────────────── */
.ph6-gallery{background:#fff;padding:5rem 5%}
.ph6-gallery .ph6-wrap{max-width:1280px;margin:0 auto}
.ph6-masonry{columns:3 280px;column-gap:14px;margin-bottom:2.5rem}
.ph6-masonry figure{break-inside:avoid;margin:0 0 14px;border-radius:14px;
  overflow:hidden;cursor:pointer;position:relative;
  box-shadow:0 4px 18px rgba(0,0,0,.10)}
.ph6-masonry figure img{width:100%;height:auto;display:block;
  transition:transform .4s ease,filter .3s}
.ph6-masonry figure:hover img{transform:scale(1.05);filter:brightness(.88)}
.ph6-masonry figcaption{position:absolute;bottom:0;left:0;right:0;
  padding:.6rem .9rem;background:linear-gradient(transparent,rgba(8,18,12,.7));
  color:#fff;font-size:.8rem;font-weight:600;opacity:0;
  transition:opacity .3s;pointer-events:none}
.ph6-masonry figure:hover figcaption{opacity:1}
.ph6-gallery-cta{text-align:center}
.ph6-gallery-cta a{display:inline-block;padding:.85rem 2.2rem;border-radius:999px;
  background:linear-gradient(135deg,#1F3D2B,#2B533C);
  color:#fff;font-weight:800;text-decoration:none;font-size:.95rem;
  font-family:'Poppins',Arial,sans-serif;
  box-shadow:0 8px 28px rgba(31,61,43,.22);
  transition:transform .22s,box-shadow .22s}
.ph6-gallery-cta a:hover{transform:translateY(-3px);box-shadow:0 14px 38px rgba(31,61,43,.3)}

/* ── Hand Raised With Care ──────────────────────────────── */
.ph6-handraised{background:#F8F5F0;padding:5rem 5%}
.ph6-handraised .ph6-wrap{max-width:1200px;margin:0 auto}
.ph6-hr-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:stretch}
.ph6-hr-grid.reverse{direction:rtl}
.ph6-hr-grid.reverse > *{direction:ltr}
@media(max-width:780px){.ph6-hr-grid,.ph6-hr-grid.reverse{grid-template-columns:1fr;direction:ltr}}
.ph6-hr-img{position:relative;overflow:hidden;min-height:360px}
.ph6-hr-img img{width:100%;height:100%;object-fit:cover;display:block}
.ph6-hr-text{background:#fff;padding:3rem 3.5rem;display:flex;flex-direction:column;justify-content:center}
@media(max-width:900px){.ph6-hr-text{padding:2rem 1.8rem}}
.ph6-hr-text .badge{display:inline-block;font-size:.76rem;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;color:#D4A94F;margin-bottom:.8rem}
.ph6-hr-text h3{font-family:'Poppins',Arial,sans-serif;font-size:clamp(1.35rem,2.5vw,1.8rem);
  font-weight:900;color:#1F3D2B;margin:0 0 .8rem}
.ph6-hr-text p{color:#5C5C5C;font-size:.95rem;line-height:1.75;margin:0 0 .6rem}
.ph6-hr-text a.ph6-link{color:#1F3D2B;font-weight:700;text-decoration:underline;text-underline-offset:3px}
.ph6-hr-text a.ph6-link:hover{color:#D4A94F}
.ph6-hr-sep{height:3px;background:linear-gradient(90deg,#D4A94F,transparent);
  width:56px;margin:1rem 0}

/* ── Food & Nutrition ───────────────────────────────────── */
.ph6-food{background:#1F3D2B;padding:5rem 5%;color:#fff}
.ph6-food .ph6-wrap{max-width:1200px;margin:0 auto}
.ph6-food .ph6-sh h2{color:#D4A94F}
.ph6-food .ph6-sh p{color:rgba(255,255,255,.78)}
.ph6-food-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
@media(max-width:900px){.ph6-food-strip{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.ph6-food-strip{grid-template-columns:1fr}}
.ph6-food-item{border-radius:14px;overflow:hidden;position:relative;
  aspect-ratio:4/3;cursor:pointer;
  box-shadow:0 4px 16px rgba(0,0,0,.25)}
.ph6-food-item img{width:100%;height:100%;object-fit:cover;display:block;
  transition:transform .4s}
.ph6-food-item:hover img{transform:scale(1.07)}
.ph6-food-item figcaption{position:absolute;bottom:0;left:0;right:0;
  padding:.65rem .85rem;background:linear-gradient(transparent,rgba(8,18,12,.75));
  color:#fff;font-size:.8rem;font-weight:600}
.ph6-food-link{display:inline-block;margin-top:2rem;padding:.8rem 2rem;
  border-radius:999px;border:2px solid #D4A94F;color:#D4A94F;
  font-weight:700;text-decoration:none;font-family:'Poppins',Arial,sans-serif;
  transition:background .22s,color .22s}
.ph6-food-link:hover{background:#D4A94F;color:#1F3D2B}

/* ── Customer Confidence ────────────────────────────────── */
.ph6-confidence{background:#fff;padding:5rem 5%}
.ph6-confidence .ph6-wrap{max-width:1200px;margin:0 auto}
.ph6-conf-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:2.5rem}
@media(max-width:700px){.ph6-conf-grid{grid-template-columns:1fr}}
.ph6-conf-main{border-radius:18px;overflow:hidden;position:relative;aspect-ratio:16/10}
.ph6-conf-main img{width:100%;height:100%;object-fit:cover;display:block}
.ph6-conf-overlay{position:absolute;inset:0;background:linear-gradient(160deg,transparent 40%,rgba(8,18,12,.78));
  display:flex;align-items:flex-end;padding:2rem}
.ph6-conf-overlay blockquote{color:#fff;font-size:1.05rem;font-style:italic;
  font-weight:500;max-width:46ch;margin:0}
.ph6-conf-overlay blockquote cite{display:block;font-size:.8rem;font-style:normal;
  color:#D4A94F;font-weight:700;margin-top:.5rem}
.ph6-conf-side{display:flex;flex-direction:column;gap:14px}
.ph6-conf-sm{border-radius:14px;overflow:hidden;aspect-ratio:4/3}
.ph6-conf-sm img{width:100%;height:100%;object-fit:cover;display:block;
  transition:transform .4s}
.ph6-conf-sm:hover img{transform:scale(1.05)}
.ph6-trust-bar{display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;margin-top:2.8rem}
.ph6-trust-item{display:flex;align-items:center;gap:.6rem;
  font-size:.9rem;font-weight:600;color:#1F3D2B}
.ph6-trust-icon{font-size:1.4rem}

/* ── Delivery ───────────────────────────────────────────── */
.ph6-delivery{background:linear-gradient(135deg,#1F3D2B 60%,#2B533C);
  padding:5rem 5%;color:#fff;position:relative;overflow:hidden}
.ph6-delivery .ph6-wrap{max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
@media(max-width:800px){.ph6-delivery .ph6-wrap{grid-template-columns:1fr}}
.ph6-del-text h2{font-family:'Poppins',Arial,sans-serif;
  font-size:clamp(1.5rem,3vw,2.1rem);font-weight:900;color:#D4A94F;margin:0 0 .8rem}
.ph6-del-text p{color:rgba(255,255,255,.82);font-size:.97rem;line-height:1.75;margin:0 0 .8rem}
.ph6-del-text ul{list-style:none;padding:0;margin:1.2rem 0}
.ph6-del-text ul li{color:rgba(255,255,255,.85);font-size:.9rem;
  padding:.3rem 0;display:flex;gap:.6rem;align-items:center}
.ph6-del-text ul li::before{content:'✔';color:#D4A94F;font-weight:800}
.ph6-del-img{border-radius:18px;overflow:hidden;
  box-shadow:0 16px 50px rgba(0,0,0,.3);aspect-ratio:4/3}
.ph6-del-img img{width:100%;height:100%;object-fit:cover;display:block}
.ph6-del-cta{display:inline-block;margin-top:1.5rem;padding:.85rem 2rem;
  border-radius:999px;background:#D4A94F;color:#1F3D2B;
  font-weight:800;text-decoration:none;font-family:'Poppins',Arial,sans-serif;
  transition:background .22s,transform .22s}
.ph6-del-cta:hover{background:#B8933E;transform:translateY(-2px)}
</style>
<!-- ═════════════════════════════════════════════════════════ -->
`;
}

// Featured Species section (ES)
function featuredSpeciesES(imgs) {
  const species = imgs.filter(i => i.role === 'species');
  const cards = species.map(s => `
    <article class="ph6-sc" itemscope itemtype="https://schema.org/ImageObject">
      <a href="${s.linkES}" style="text-decoration:none;color:inherit;display:contents">
        <div class="ph6-sc-img">
          <img src="/${s.to}" alt="${s.altES}" width="${s.w}" height="${s.h}" loading="lazy"
               itemprop="contentUrl">
          <meta itemprop="name" content="${s.capES}">
          <meta itemprop="description" content="${s.descES}">
        </div>
        <div class="ph6-sc-body">
          <h3>${s.capES}</h3>
          <p>${s.descES}</p>
          <span class="ph6-sc-btn">Ver ficha →</span>
        </div>
      </a>
    </article>`).join('\n');

  return `
<!-- ░░ PHASE 6 — FEATURED SPECIES ░░ -->
<section class="ph6-species" aria-label="Especies destacadas">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Nuestras Especies</span>
      <h2>Aves Criadas con Amor y CITES</h2>
      <p>Cada pichón nace y crece en nuestras instalaciones de Llíria. Documentación CITES completa, crianza a mano, envíos a toda España y Europa.</p>
    </div>
    <div class="ph6-species-grid" itemscope itemtype="https://schema.org/ItemList">
${cards}
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — FEATURED SPECIES ░░ -->
`;
}

// Featured Species section (FR)
function featuredSpeciesFR(imgs) {
  const species = imgs.filter(i => i.role === 'species');
  const cards = species.map(s => `
    <article class="ph6-sc" itemscope itemtype="https://schema.org/ImageObject">
      <a href="${s.linkFR}" style="text-decoration:none;color:inherit;display:contents">
        <div class="ph6-sc-img">
          <img src="/${s.to}" alt="${s.altFR}" width="${s.w}" height="${s.h}" loading="lazy"
               itemprop="contentUrl">
          <meta itemprop="name" content="${s.capFR}">
          <meta itemprop="description" content="${s.descFR}">
        </div>
        <div class="ph6-sc-body">
          <h3>${s.capFR}</h3>
          <p>${s.descFR}</p>
          <span class="ph6-sc-btn">Voir la fiche →</span>
        </div>
      </a>
    </article>`).join('\n');

  return `
<!-- ░░ PHASE 6 — ESPÈCES VEDETTES ░░ -->
<section class="ph6-species" aria-label="Espèces vedettes">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Nos Espèces</span>
      <h2>Perroquets Élevés avec Soin et CITES</h2>
      <p>Chaque oiseau naît et grandit dans notre élevage à Llíria. Documentation CITES complète, élevage à la main, livraison dans toute la France et l'Europe.</p>
    </div>
    <div class="ph6-species-grid" itemscope itemtype="https://schema.org/ItemList">
${cards}
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — ESPÈCES VEDETTES ░░ -->
`;
}

// Premium masonry gallery (ES)
function premiumGalleryES(imgs) {
  const gallery = imgs.filter(i => i.role === 'gallery');
  const figures = gallery.map((g, idx) => `
      <figure onclick="ph6LB(${idx})" aria-label="${g.altES}">
        <img src="/${g.to}" alt="${g.altES}" width="${g.w}" height="${g.h}"
             loading="lazy" decoding="async"
             itemprop="contentUrl">
        <figcaption>${g.capES}</figcaption>
      </figure>`).join('');

  const lbData = JSON.stringify(gallery.map(g => ({
    src: '/' + g.to, alt: g.altES, cap: g.capES
  })));

  return `
<!-- ░░ PHASE 6 — DISCOVER OUR AVIARY ░░ -->
<section class="ph6-gallery" id="galeria-premium" aria-label="Galería — Descubre nuestro criadero"
  itemscope itemtype="https://schema.org/ImageGallery">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Descubre Nuestro Criadero</span>
      <h2>Un Vistazo a las Instalaciones</h2>
      <p>Aviarios amplios, enriquecimiento ambiental diario y crianza a mano. Todo pensado para el bienestar de cada ave.</p>
    </div>
    <div class="ph6-masonry" itemscope itemtype="https://schema.org/CollectionPage">
${figures}
    </div>
    <div class="ph6-gallery-cta">
      <a href="/galeria/">Ver Galería Completa →</a>
    </div>
  </div>
</section>
<script>
(function(){
  var LB_DATA=${lbData};
  var cur=0;
  function build(){
    var el=document.getElementById('ph6-lb');
    if(!el){
      el=document.createElement('div');el.id='ph6-lb';
      el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Lightbox galería');
      el.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:none;align-items:center;justify-content:center';
      el.innerHTML='<button id="ph6-lb-prev" aria-label="Anterior" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;font-size:2rem;padding:.5rem .9rem;border-radius:50%;cursor:pointer">&lsaquo;</button>'
        +'<figure style="max-width:90vw;max-height:90vh;margin:0;text-align:center">'
        +'<img id="ph6-lb-img" src="" alt="" style="max-width:90vw;max-height:78vh;object-fit:contain;border-radius:8px">'
        +'<figcaption id="ph6-lb-cap" style="color:rgba(255,255,255,.75);font-size:.85rem;margin-top:.7rem"></figcaption>'
        +'</figure>'
        +'<button id="ph6-lb-next" aria-label="Siguiente" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;font-size:2rem;padding:.5rem .9rem;border-radius:50%;cursor:pointer">&rsaquo;</button>'
        +'<button id="ph6-lb-close" aria-label="Cerrar" style="position:absolute;top:14px;right:18px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer">&times;</button>';
      document.body.appendChild(el);
      document.getElementById('ph6-lb-close').onclick=close;
      document.getElementById('ph6-lb-prev').onclick=function(){cur=(cur-1+LB_DATA.length)%LB_DATA.length;show()};
      document.getElementById('ph6-lb-next').onclick=function(){cur=(cur+1)%LB_DATA.length;show()};
      el.addEventListener('click',function(e){if(e.target===el)close()});
      document.addEventListener('keydown',function(e){
        if(!document.getElementById('ph6-lb')||document.getElementById('ph6-lb').style.display==='none')return;
        if(e.key==='Escape')close();
        if(e.key==='ArrowLeft'){cur=(cur-1+LB_DATA.length)%LB_DATA.length;show()}
        if(e.key==='ArrowRight'){cur=(cur+1)%LB_DATA.length;show()}
      });
    }
    return el;
  }
  function show(){
    var el=build();
    var d=LB_DATA[cur];
    document.getElementById('ph6-lb-img').src=d.src;
    document.getElementById('ph6-lb-img').alt=d.alt;
    document.getElementById('ph6-lb-cap').textContent=d.cap;
    el.style.display='flex';
    document.body.style.overflow='hidden';
  }
  function close(){
    var el=document.getElementById('ph6-lb');
    if(el)el.style.display='none';
    document.body.style.overflow='';
  }
  window.ph6LB=function(idx){cur=idx;show()};
})();
</script>
<!-- ░░ /PHASE 6 — DISCOVER OUR AVIARY ░░ -->
`;
}

// Premium masonry gallery (FR)
function premiumGalleryFR(imgs) {
  const gallery = imgs.filter(i => i.role === 'gallery');
  const figures = gallery.map((g, idx) => `
      <figure onclick="ph6LB(${idx})" aria-label="${g.altFR}">
        <img src="/${g.to}" alt="${g.altFR}" width="${g.w}" height="${g.h}"
             loading="lazy" decoding="async"
             itemprop="contentUrl">
        <figcaption>${g.capFR}</figcaption>
      </figure>`).join('');

  const lbData = JSON.stringify(gallery.map(g => ({
    src: '/' + g.to, alt: g.altFR, cap: g.capFR
  })));

  return `
<!-- ░░ PHASE 6 — DÉCOUVREZ NOS INSTALLATIONS ░░ -->
<section class="ph6-gallery" id="galerie-premium" aria-label="Galerie — Découvrez notre élevage"
  itemscope itemtype="https://schema.org/ImageGallery">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Découvrez Notre Élevage</span>
      <h2>Un Aperçu de Nos Installations</h2>
      <p>Grandes volières, enrichissement environnemental quotidien et élevage à la main. Tout est pensé pour le bien-être de chaque oiseau.</p>
    </div>
    <div class="ph6-masonry" itemscope itemtype="https://schema.org/CollectionPage">
${figures}
    </div>
    <div class="ph6-gallery-cta">
      <a href="/fr/galerie/">Voir la Galerie Complète →</a>
    </div>
  </div>
</section>
<script>
(function(){
  var LB_DATA=${lbData};
  var cur=0;
  function build(){
    var el=document.getElementById('ph6-lb');
    if(!el){
      el=document.createElement('div');el.id='ph6-lb';
      el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Lightbox galerie');
      el.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:none;align-items:center;justify-content:center';
      el.innerHTML='<button id="ph6-lb-prev" aria-label="Précédent" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;font-size:2rem;padding:.5rem .9rem;border-radius:50%;cursor:pointer">&lsaquo;</button>'
        +'<figure style="max-width:90vw;max-height:90vh;margin:0;text-align:center">'
        +'<img id="ph6-lb-img" src="" alt="" style="max-width:90vw;max-height:78vh;object-fit:contain;border-radius:8px">'
        +'<figcaption id="ph6-lb-cap" style="color:rgba(255,255,255,.75);font-size:.85rem;margin-top:.7rem"></figcaption>'
        +'</figure>'
        +'<button id="ph6-lb-next" aria-label="Suivant" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.15);border:none;color:#fff;font-size:2rem;padding:.5rem .9rem;border-radius:50%;cursor:pointer">&rsaquo;</button>'
        +'<button id="ph6-lb-close" aria-label="Fermer" style="position:absolute;top:14px;right:18px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer">&times;</button>';
      document.body.appendChild(el);
      document.getElementById('ph6-lb-close').onclick=close;
      document.getElementById('ph6-lb-prev').onclick=function(){cur=(cur-1+LB_DATA.length)%LB_DATA.length;show()};
      document.getElementById('ph6-lb-next').onclick=function(){cur=(cur+1)%LB_DATA.length;show()};
      el.addEventListener('click',function(e){if(e.target===el)close()});
      document.addEventListener('keydown',function(e){
        if(!document.getElementById('ph6-lb')||document.getElementById('ph6-lb').style.display==='none')return;
        if(e.key==='Escape')close();
        if(e.key==='ArrowLeft'){cur=(cur-1+LB_DATA.length)%LB_DATA.length;show()}
        if(e.key==='ArrowRight'){cur=(cur+1)%LB_DATA.length;show()}
      });
    }
    return el;
  }
  function show(){
    var el=build();
    var d=LB_DATA[cur];
    document.getElementById('ph6-lb-img').src=d.src;
    document.getElementById('ph6-lb-img').alt=d.alt;
    document.getElementById('ph6-lb-cap').textContent=d.cap;
    el.style.display='flex';
    document.body.style.overflow='hidden';
  }
  function close(){
    var el=document.getElementById('ph6-lb');
    if(el)el.style.display='none';
    document.body.style.overflow='';
  }
  window.ph6LB=function(idx){cur=idx;show()};
})();
</script>
<!-- ░░ /PHASE 6 — DÉCOUVREZ NOS INSTALLATIONS ░░ -->
`;
}

// Hand Raised With Care (ES)
function handRaisedES(imgs) {
  const handler  = imgs.find(i => i.to.includes('hand-raised-macaw-breeder'));
  const nursery  = imgs.find(i => i.to.includes('hand-feeding-amazon'));
  const enrichment = imgs.find(i => i.to.includes('parrot-enrichment'));
  return `
<!-- ░░ PHASE 6 — CRIANZA A MANO ░░ -->
<section class="ph6-handraised" aria-label="Crianza a mano con cuidado">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Nuestro Proceso</span>
      <h2>Criados a Mano con Amor</h2>
    </div>

    <div class="ph6-hr-grid" style="margin-bottom:2px">
      <div class="ph6-hr-img">
        <img src="/${handler.to}" alt="${handler.altES}" width="${handler.w}" height="${handler.h}"
             loading="lazy" decoding="async">
      </div>
      <div class="ph6-hr-text">
        <span class="badge">📋 Socialización temprana</span>
        <h3>Desde el Nido, con Nuestras Manos</h3>
        <div class="ph6-hr-sep"></div>
        <p>Cada pichón papillero en Paraíso de Aves es criado a mano desde las primeras semanas de vida. Este proceso de <strong>impronta y socialización temprana</strong> garantiza aves dóciles, confiadas y equilibradas — listas para integrarse en cualquier familia.</p>
        <p>Nuestros criadores trabajan diariamente con cada ave: contacto humano constante, enriquecimiento ambiental y rutinas estables que forman el carácter del futuro compañero.</p>
        <a href="/adopcion-de-loros" class="ph6-link">Conocer nuestro proceso de adopción →</a>
      </div>
    </div>

    <div class="ph6-hr-grid reverse" style="margin-top:2px">
      <div class="ph6-hr-img">
        <img src="/${nursery.to}" alt="${nursery.altES}" width="${nursery.w}" height="${nursery.h}"
             loading="lazy" decoding="async">
      </div>
      <div class="ph6-hr-text">
        <span class="badge">🩺 Bienestar garantizado</span>
        <h3>Pichones Revisados y Documentados</h3>
        <div class="ph6-hr-sep"></div>
        <p>Todos nuestros pichones son revisados por profesionales veterinarios antes de la entrega. Cada ave sale de nuestro criadero con <strong>documentación CITES completa</strong>, certificado de origen y orientación de cuidados personalizados.</p>
        <p>No importamos aves. Cada ejemplar nace y crece en nuestras instalaciones de Llíria, Valencia — bajo nuestra supervisión y cuidado constante.</p>
        <a href="/nuestras-instalaciones/" class="ph6-link">Ver nuestras instalaciones →</a>
      </div>
    </div>

    <div class="ph6-hr-grid" style="margin-top:2px">
      <div class="ph6-hr-img">
        <img src="/${enrichment.to}" alt="${enrichment.altES}" width="${enrichment.w}" height="${enrichment.h}"
             loading="lazy" decoding="async">
      </div>
      <div class="ph6-hr-text">
        <span class="badge">🎯 Enriquecimiento ambiental</span>
        <h3>Estimulación Mental y Física Diaria</h3>
        <div class="ph6-hr-sep"></div>
        <p>El bienestar de cada ave va más allá de la alimentación. Nuestros loros disfrutan de <strong>enriquecimiento ambiental diario</strong>: juguetes de madera, perchas naturales, forrajeo, interacción social y ejercicio libre en espacios amplios.</p>
        <p>Un loro mentalmente estimulado y bien socializado es un loro feliz — y ese es el compañero que entregas a cada familia.</p>
        <a href="/juguetes-naturales-para-loros" class="ph6-link">Explorar accesorios de enriquecimiento →</a>
      </div>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — CRIANZA A MANO ░░ -->
`;
}

// Hand Raised With Care (FR)
function handRaisedFR(imgs) {
  const handler    = imgs.find(i => i.to.includes('hand-raised-macaw-breeder'));
  const nursery    = imgs.find(i => i.to.includes('hand-feeding-amazon'));
  const enrichment = imgs.find(i => i.to.includes('parrot-enrichment'));
  return `
<!-- ░░ PHASE 6 — ÉLEVÉ À LA MAIN ░░ -->
<section class="ph6-handraised" aria-label="Élevé à la main avec soin">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Notre Processus</span>
      <h2>Élevés à la Main avec Amour</h2>
    </div>

    <div class="ph6-hr-grid" style="margin-bottom:2px">
      <div class="ph6-hr-img">
        <img src="/${handler.to}" alt="${handler.altFR}" width="${handler.w}" height="${handler.h}"
             loading="lazy" decoding="async">
      </div>
      <div class="ph6-hr-text">
        <span class="badge">📋 Socialisation précoce</span>
        <h3>Dès le Nid, Entre Nos Mains</h3>
        <div class="ph6-hr-sep"></div>
        <p>Chaque poussin chez Paraíso de Aves est nourri à la main dès les premières semaines de vie. Ce processus d'<strong>empreinte et de socialisation précoce</strong> garantit des oiseaux dociles, confiants et équilibrés — prêts à s'intégrer dans n'importe quelle famille.</p>
        <p>Nos éleveurs travaillent quotidiennement avec chaque oiseau : contact humain constant, enrichissement environnemental et routines stables qui forment le caractère du futur compagnon.</p>
        <a href="/fr/processus-adoption/" class="ph6-link">Découvrir notre processus d'adoption →</a>
      </div>
    </div>

    <div class="ph6-hr-grid reverse" style="margin-top:2px">
      <div class="ph6-hr-img">
        <img src="/${nursery.to}" alt="${nursery.altFR}" width="${nursery.w}" height="${nursery.h}"
             loading="lazy" decoding="async">
      </div>
      <div class="ph6-hr-text">
        <span class="badge">🩺 Bien-être garanti</span>
        <h3>Poussins Contrôlés et Documentés</h3>
        <div class="ph6-hr-sep"></div>
        <p>Tous nos poussins sont contrôlés par des professionnels vétérinaires avant la livraison. Chaque oiseau quitte notre élevage avec une <strong>documentation CITES complète</strong>, un certificat d'origine et un guide de soins personnalisé.</p>
        <p>Nous n'importons pas d'oiseaux. Chaque individu naît et grandit dans nos installations à Llíria, Valence — sous notre surveillance et nos soins constants.</p>
        <a href="/fr/nos-installations/" class="ph6-link">Voir nos installations →</a>
      </div>
    </div>

    <div class="ph6-hr-grid" style="margin-top:2px">
      <div class="ph6-hr-img">
        <img src="/${enrichment.to}" alt="${enrichment.altFR}" width="${enrichment.w}" height="${enrichment.h}"
             loading="lazy" decoding="async">
      </div>
      <div class="ph6-hr-text">
        <span class="badge">🎯 Enrichissement environnemental</span>
        <h3>Stimulation Mentale et Physique Quotidienne</h3>
        <div class="ph6-hr-sep"></div>
        <p>Le bien-être de chaque oiseau va au-delà de l'alimentation. Nos perroquets bénéficient d'un <strong>enrichissement environnemental quotidien</strong> : jouets en bois, perchoirs naturels, recherche de nourriture, interaction sociale et exercice libre dans de grands espaces.</p>
        <p>Un perroquet mentalement stimulé et bien socialisé est un perroquet heureux — et c'est le compagnon que nous remettons à chaque famille.</p>
        <a href="/fr/jouets-naturels-pour-perroquets/" class="ph6-link">Explorer les accessoires d'enrichissement →</a>
      </div>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — ÉLEVÉ À LA MAIN ░░ -->
`;
}

// Food & Nutrition (ES)
function foodNutritionES(imgs) {
  const food = imgs.filter(i => i.role === 'food');
  const items = food.map(f => `
    <figure class="ph6-food-item" itemscope itemtype="https://schema.org/ImageObject">
      <img src="/${f.to}" alt="${f.altES}" width="${f.w}" height="${f.h}"
           loading="lazy" decoding="async" itemprop="contentUrl">
      <meta itemprop="name" content="${f.capES}">
      <figcaption>${f.capES}</figcaption>
    </figure>`).join('');

  return `
<!-- ░░ PHASE 6 — ALIMENTACIÓN ░░ -->
<section class="ph6-food" aria-label="Alimentación y nutrición para loros">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Alimentación Premium</span>
      <h2>Nutrición Natural y Equilibrada</h2>
      <p>Una dieta de calidad es la base de la salud de cada loro. En Paraíso de Aves preparamos diariamente mezclas frescas de semillas, frutas, verduras y pellets adaptadas a cada especie.</p>
    </div>
    <div class="ph6-food-strip">
${items}
    </div>
    <div style="text-align:center">
      <a href="/comida-para-loros" class="ph6-food-link">Ver guía de alimentación completa →</a>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — ALIMENTACIÓN ░░ -->
`;
}

// Food & Nutrition (FR)
function foodNutritionFR(imgs) {
  const food = imgs.filter(i => i.role === 'food');
  const items = food.map(f => `
    <figure class="ph6-food-item" itemscope itemtype="https://schema.org/ImageObject">
      <img src="/${f.to}" alt="${f.altFR}" width="${f.w}" height="${f.h}"
           loading="lazy" decoding="async" itemprop="contentUrl">
      <meta itemprop="name" content="${f.capFR}">
      <figcaption>${f.capFR}</figcaption>
    </figure>`).join('');

  return `
<!-- ░░ PHASE 6 — ALIMENTATION ░░ -->
<section class="ph6-food" aria-label="Alimentation et nutrition pour perroquets">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Alimentation Premium</span>
      <h2>Nutrition Naturelle et Équilibrée</h2>
      <p>Une alimentation de qualité est la base de la santé de chaque perroquet. Chez Paraíso de Aves, nous préparons quotidiennement des mélanges frais de graines, fruits, légumes et granulés adaptés à chaque espèce.</p>
    </div>
    <div class="ph6-food-strip">
${items}
    </div>
    <div style="text-align:center">
      <a href="/fr/nourriture-pour-perroquets/" class="ph6-food-link">Voir le guide complet d'alimentation →</a>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — ALIMENTATION ░░ -->
`;
}

// Customer Confidence (ES)
function confidenceES(imgs) {
  const main = imgs.find(i => i.to.includes('parrots-socialised-with-human'));
  const sm1  = imgs.find(i => i.to.includes('sociable-amazon'));
  const sm2  = imgs.find(i => i.to.includes('macaw-pair-blue-yellow'));
  return `
<!-- ░░ PHASE 6 — CONFIANZA DEL CLIENTE ░░ -->
<section class="ph6-confidence" aria-label="Confianza y satisfacción del cliente">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Nuestros Clientes</span>
      <h2>Miles de Familias ya Confían en Nosotros</h2>
      <p>Desde 2001, entregamos aves sanas, documentadas y bien socializadas a familias de toda España y Europa. Nuestra reputación se construye un pichón a la vez.</p>
    </div>
    <div class="ph6-conf-grid">
      <div class="ph6-conf-main" itemscope itemtype="https://schema.org/ImageObject">
        <img src="/${main.to}" alt="${main.altES}" width="${main.w}" height="${main.h}"
             loading="lazy" decoding="async" itemprop="contentUrl">
        <div class="ph6-conf-overlay">
          <blockquote>
            "Llevamos años esperando el loro adecuado. Con Paraíso de Aves encontramos no solo un loro, sino una familia que sigue acompañándonos."
            <cite>— Familia González, Madrid</cite>
          </blockquote>
        </div>
      </div>
      <div class="ph6-conf-side">
        <div class="ph6-conf-sm" itemscope itemtype="https://schema.org/ImageObject">
          <img src="/${sm1.to}" alt="${sm1.altES}" width="${sm1.w}" height="${sm1.h}"
               loading="lazy" decoding="async" itemprop="contentUrl">
        </div>
        <div class="ph6-conf-sm" itemscope itemtype="https://schema.org/ImageObject">
          <img src="/${sm2.to}" alt="${sm2.altES}" width="${sm2.w}" height="${sm2.h}"
               loading="lazy" decoding="async" itemprop="contentUrl">
        </div>
      </div>
    </div>
    <div class="ph6-trust-bar">
      <div class="ph6-trust-item"><span class="ph6-trust-icon">🏆</span>+25 años de experiencia</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">📋</span>CITES Oficial 100%</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">🌍</span>Envíos a toda Europa</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">⭐</span>Valoración 5 estrellas</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">🦜</span>150+ aves atendidas</div>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — CONFIANZA DEL CLIENTE ░░ -->
`;
}

// Customer Confidence (FR)
function confidenceFR(imgs) {
  const main = imgs.find(i => i.to.includes('parrots-socialised-with-human'));
  const sm1  = imgs.find(i => i.to.includes('sociable-amazon'));
  const sm2  = imgs.find(i => i.to.includes('macaw-pair-blue-yellow'));
  return `
<!-- ░░ PHASE 6 — CONFIANCE CLIENTS ░░ -->
<section class="ph6-confidence" aria-label="Confiance et satisfaction des clients">
  <div class="ph6-wrap">
    <div class="ph6-sh">
      <span class="label">Nos Clients</span>
      <h2>Des Milliers de Familles Nous Font Confiance</h2>
      <p>Depuis 2001, nous livrons des oiseaux sains, documentés et bien socialisés à des familles de toute l'Espagne et de l'Europe. Notre réputation se construit un poussin à la fois.</p>
    </div>
    <div class="ph6-conf-grid">
      <div class="ph6-conf-main" itemscope itemtype="https://schema.org/ImageObject">
        <img src="/${main.to}" alt="${main.altFR}" width="${main.w}" height="${main.h}"
             loading="lazy" decoding="async" itemprop="contentUrl">
        <div class="ph6-conf-overlay">
          <blockquote>
            "Nous attendions le bon perroquet depuis des années. Avec Paraíso de Aves, nous avons trouvé non seulement un oiseau, mais une famille qui continue de nous accompagner."
            <cite>— Famille Martin, Paris</cite>
          </blockquote>
        </div>
      </div>
      <div class="ph6-conf-side">
        <div class="ph6-conf-sm" itemscope itemtype="https://schema.org/ImageObject">
          <img src="/${sm1.to}" alt="${sm1.altFR}" width="${sm1.w}" height="${sm1.h}"
               loading="lazy" decoding="async" itemprop="contentUrl">
        </div>
        <div class="ph6-conf-sm" itemscope itemtype="https://schema.org/ImageObject">
          <img src="/${sm2.to}" alt="${sm2.altFR}" width="${sm2.w}" height="${sm2.h}"
               loading="lazy" decoding="async" itemprop="contentUrl">
        </div>
      </div>
    </div>
    <div class="ph6-trust-bar">
      <div class="ph6-trust-item"><span class="ph6-trust-icon">🏆</span>+25 ans d'expérience</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">📋</span>CITES Officiel 100%</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">🌍</span>Livraison toute l'Europe</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">⭐</span>Note 5 étoiles</div>
      <div class="ph6-trust-item"><span class="ph6-trust-icon">🦜</span>150+ oiseaux livrés</div>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — CONFIANCE CLIENTS ░░ -->
`;
}

// Delivery Section (ES)
function deliveryES(imgs) {
  const del = imgs.find(i => i.role === 'delivery');
  return `
<!-- ░░ PHASE 6 — ENVÍOS EUROPA ░░ -->
<section class="ph6-delivery" aria-label="Envíos seguros a toda España y Europa">
  <div class="ph6-wrap">
    <div class="ph6-del-text">
      <h2>Envíos Seguros a Toda España y Europa</h2>
      <p>Cada ave viaja en condiciones óptimas, en transportín certificado IATA, con toda la documentación CITES en regla y operador especializado en animales vivos.</p>
      <ul>
        <li>Transportín certificado IATA para cada especie</li>
        <li>Documentación CITES y certificado veterinario incluidos</li>
        <li>Seguimiento en tiempo real del envío</li>
        <li>Operadores especializados en animales vivos</li>
        <li>Entrega en toda España y Europa en 24–72 h</li>
        <li>Orientación de llegada y primeros cuidados</li>
      </ul>
      <a href="/#contacto" class="ph6-del-cta">Solicitar información de envío</a>
    </div>
    <div class="ph6-del-img" itemscope itemtype="https://schema.org/ImageObject">
      <img src="/${del.to}" alt="${del.altES}" width="${del.w}" height="${del.h}"
           loading="lazy" decoding="async" itemprop="contentUrl">
      <meta itemprop="name" content="${del.capES}">
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — ENVÍOS EUROPA ░░ -->
`;
}

// Delivery Section (FR)
function deliveryFR(imgs) {
  const del = imgs.find(i => i.role === 'delivery');
  return `
<!-- ░░ PHASE 6 — LIVRAISON EUROPE ░░ -->
<section class="ph6-delivery" aria-label="Livraisons sécurisées en France et en Europe">
  <div class="ph6-wrap">
    <div class="ph6-del-text">
      <h2>Livraisons Sécurisées dans Toute la France et l'Europe</h2>
      <p>Chaque oiseau voyage dans des conditions optimales, dans une caisse IATA certifiée, avec toute la documentation CITES en règle et un opérateur spécialisé en animaux vivants.</p>
      <ul>
        <li>Caisse de transport IATA certifiée pour chaque espèce</li>
        <li>Documentation CITES et certificat vétérinaire inclus</li>
        <li>Suivi en temps réel de la livraison</li>
        <li>Opérateurs spécialisés en animaux vivants</li>
        <li>Livraison dans toute la France en 24–72 h</li>
        <li>Conseils à l'arrivée et premiers soins</li>
      </ul>
      <a href="/fr/contact/" class="ph6-del-cta">Demander des informations de livraison</a>
    </div>
    <div class="ph6-del-img" itemscope itemtype="https://schema.org/ImageObject">
      <img src="/${del.to}" alt="${del.altFR}" width="${del.w}" height="${del.h}"
           loading="lazy" decoding="async" itemprop="contentUrl">
      <meta itemprop="name" content="${del.capFR}">
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — LIVRAISON EUROPE ░░ -->
`;
}

// Final CTA with large image (ES)
function finalCtaES(imgs) {
  const bg = imgs.find(i => i.to.includes('paraiso-de-aves-facility-exterior'));
  return `
<!-- ░░ PHASE 6 — FINAL CTA ░░ -->
<section style="position:relative;overflow:hidden;min-height:380px;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff"
  aria-label="Contacta con nosotros — última llamada a la acción">
  <img src="/${bg.to}" alt="${bg.altES}" width="${bg.w}" height="${bg.h}"
       loading="lazy" decoding="async"
       style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:brightness(.45) saturate(1.1)">
  <div style="position:relative;z-index:1;padding:4rem 5%;max-width:820px;margin:0 auto">
    <p style="font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#D4A94F;margin-bottom:.8rem">¿Listo para dar el paso?</p>
    <h2 style="font-family:'Poppins',Arial,sans-serif;font-size:clamp(1.7rem,4vw,2.6rem);font-weight:900;margin:0 0 1rem;text-shadow:0 8px 24px rgba(0,0,0,.4)">
      Tu Loro Perfecto te Está Esperando
    </h2>
    <p style="color:rgba(255,255,255,.88);font-size:1.05rem;max-width:58ch;margin:0 auto 2rem;line-height:1.7">
      Escríbenos indicando qué especie te interesa y te respondemos con disponibilidad real, fotos y toda la información necesaria.
    </p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <a href="/#contacto" style="display:inline-block;padding:.9rem 2.2rem;border-radius:999px;background:linear-gradient(135deg,#D4A94F,#B8933E);color:#fff;font-weight:800;text-decoration:none;font-family:'Poppins',Arial,sans-serif;box-shadow:0 10px 32px rgba(212,169,79,.4)">Contactar Ahora</a>
      <a href="/aves-disponibles/" style="display:inline-block;padding:.9rem 2.2rem;border-radius:999px;border:2px solid rgba(255,255,255,.5);color:#fff;font-weight:700;text-decoration:none;font-family:'Poppins',Arial,sans-serif;backdrop-filter:blur(4px)">Ver Aves Disponibles</a>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — FINAL CTA ░░ -->
`;
}

// Final CTA (FR)
function finalCtaFR(imgs) {
  const bg = imgs.find(i => i.to.includes('paraiso-de-aves-facility-exterior'));
  return `
<!-- ░░ PHASE 6 — CTA FINAL ░░ -->
<section style="position:relative;overflow:hidden;min-height:380px;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff"
  aria-label="Contactez-nous — dernier appel à l'action">
  <img src="/${bg.to}" alt="${bg.altFR}" width="${bg.w}" height="${bg.h}"
       loading="lazy" decoding="async"
       style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:brightness(.45) saturate(1.1)">
  <div style="position:relative;z-index:1;padding:4rem 5%;max-width:820px;margin:0 auto">
    <p style="font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#D4A94F;margin-bottom:.8rem">Prêt à franchir le pas ?</p>
    <h2 style="font-family:'Poppins',Arial,sans-serif;font-size:clamp(1.7rem,4vw,2.6rem);font-weight:900;margin:0 0 1rem;text-shadow:0 8px 24px rgba(0,0,0,.4)">
      Votre Perroquet Idéal Vous Attend
    </h2>
    <p style="color:rgba(255,255,255,.88);font-size:1.05rem;max-width:58ch;margin:0 auto 2rem;line-height:1.7">
      Écrivez-nous en indiquant l'espèce qui vous intéresse et nous vous répondons avec la disponibilité réelle, des photos et toutes les informations nécessaires.
    </p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <a href="/fr/contact/" style="display:inline-block;padding:.9rem 2.2rem;border-radius:999px;background:linear-gradient(135deg,#D4A94F,#B8933E);color:#fff;font-weight:800;text-decoration:none;font-family:'Poppins',Arial,sans-serif;box-shadow:0 10px 32px rgba(212,169,79,.4)">Nous Contacter</a>
      <a href="/fr/perroquets-disponibles/" style="display:inline-block;padding:.9rem 2.2rem;border-radius:999px;border:2px solid rgba(255,255,255,.5);color:#fff;font-weight:700;text-decoration:none;font-family:'Poppins',Arial,sans-serif;backdrop-filter:blur(4px)">Voir les Perroquets</a>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6 — CTA FINAL ░░ -->
`;
}

// ImageObject schema block
function imageSchema(imgs, lang) {
  const objs = imgs.map(img => {
    const caption = lang === 'es' ? img.capES : img.capFR;
    const alt     = lang === 'es' ? img.altES : img.altFR;
    return `{
      "@type": "ImageObject",
      "contentUrl": "https://www.paraisodeaves.com/${img.to}",
      "name": "${caption}",
      "description": "${alt}",
      "width": ${img.w},
      "height": ${img.h}
    }`;
  }).join(',\n    ');

  return `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "${lang === 'es' ? 'Galería de Paraíso de Aves' : 'Galerie de Paraíso de Aves'}",
  "description": "${lang === 'es' ? 'Colección de imágenes premium de las instalaciones, especies y cuidados de Paraíso de Aves' : 'Collection d\'images premium des installations, espèces et soins de Paraíso de Aves'}",
  "image": [
    ${objs}
  ]
}
</script>`;
}

// ─────────────────────────────────────────────
// 4. INJECT INTO ES index.html
// ─────────────────────────────────────────────
function injectES() {
  let html = fs.readFileSync('index.html', 'utf8');

  // Guard: skip if already injected
  if (html.includes('ph6-styles')) {
    console.log('  ⚠ ES index.html already has Phase 6 — re-injecting (clean run)');
    // Remove previous injection markers so we can re-inject cleanly
    html = html.replace(/\n<!-- ═══+.*?PHASE 6 CSS.*?<\/style>\n<!-- ═+.*?-->\n/s, '');
    html = html.replace(/\n<!-- ░░ PHASE 6.*?░░ -->\n/gs, '');
  }

  // 4a. Inject CSS + preload after existing </style> (first occurrence after fonts block)
  //     The hero preload already exists for uploaded-macaw.webp; add hero image preload
  const heroImg = IMAGES.find(i => i.role === 'hero');
  const preloadInsert = `  <link rel="preload" as="image" href="/${heroImg.to}" fetchpriority="high">\n`;

  // Insert preload before closing </head> only if not already there
  if (!html.includes(heroImg.to)) {
    html = html.replace(
      '  <link rel="preload" as="image" href="/uploaded-macaw.webp" fetchpriority="high">',
      `  <link rel="preload" as="image" href="/uploaded-macaw.webp" fetchpriority="high">\n${preloadInsert}`
    );
  }

  // 4b. Inject Phase 6 CSS + ImageObject schema right before </head>
  html = html.replace('</head>', ph6css() + imageSchema(IMAGES, 'es') + '\n</head>');

  // 4c. Inject Featured Species AFTER the existing aves-disponibles section
  html = html.replace(
    '\n<section class="sc-section">',
    '\n' + featuredSpeciesES(IMAGES) + '\n<section class="sc-section">'
  );

  // 4d. Replace basic gallery section with premium masonry gallery
  const galleryStart = html.indexOf('\n<section class="gallery" id="galeria">');
  const galleryEnd   = html.indexOf('\n</section>', galleryStart) + '\n</section>'.length;
  if (galleryStart !== -1 && galleryEnd !== -1) {
    html = html.slice(0, galleryStart) +
           '\n' + premiumGalleryES(IMAGES) +
           html.slice(galleryEnd);
  }

  // 4e. Inject Hand Raised With Care AFTER the premium gallery (before blog section)
  html = html.replace(
    '\n<section class="blog-home">',
    '\n' + handRaisedES(IMAGES) + '\n' + foodNutritionES(IMAGES) + '\n<section class="blog-home">'
  );

  // 4f. Inject Customer Confidence + Delivery BEFORE the contact section
  html = html.replace(
    '\n<section class="contact" id="contacto">',
    '\n' + confidenceES(IMAGES) + '\n' + deliveryES(IMAGES) + '\n' + finalCtaES(IMAGES) + '\n<section class="contact" id="contacto">'
  );

  fs.writeFileSync('index.html', html);
  console.log('  ✓ index.html (ES) — 7 sections injected/replaced');
}

// ─────────────────────────────────────────────
// 5. INJECT INTO FR fr/index.html
// ─────────────────────────────────────────────
function injectFR() {
  let html = fs.readFileSync('fr/index.html', 'utf8');

  if (html.includes('ph6-styles')) {
    console.log('  ⚠ fr/index.html already has Phase 6 — re-injecting (clean run)');
    html = html.replace(/\n<!-- ═══+.*?PHASE 6 CSS.*?<\/style>\n<!-- ═+.*?-->\n/s, '');
    html = html.replace(/\n<!-- ░░ PHASE 6.*?░░ -->\n/gs, '');
  }

  // 5a. CSS + schema
  html = html.replace('</head>', ph6css() + imageSchema(IMAGES, 'fr') + '\n</head>');

  // 5b. Featured Species after species grid (after the 8-species emoji grid div)
  //     Anchor: the closing of the species-grid div (before the sc-section styles)
  html = html.replace(
    '\n<style>\n.sc-section{background:#F8F5F0',
    '\n' + featuredSpeciesFR(IMAGES) + '\n<style>\n.sc-section{background:#F8F5F0'
  );

  // 5c. Premium gallery after the sc-section (after accessories cards)
  html = html.replace(
    '\n<div style="max-width:1100px;margin:56px auto;padding:0 5%;">\n  <h2 style="text-align:center;font-size:1.7rem;color:var(--primary);margin-bottom:32px;">Comment se Déroule',
    '\n' + premiumGalleryFR(IMAGES) +
    '\n<div style="max-width:1100px;margin:56px auto;padding:0 5%;">\n  <h2 style="text-align:center;font-size:1.7rem;color:var(--primary);margin-bottom:32px;">Comment se Déroule'
  );

  // 5d. Hand Raised + Food after adoption steps (before city delivery section)
  html = html.replace(
    '\n<div style="background:var(--primary);padding:56px 5%;text-align:center;color:var(--white);">',
    '\n' + handRaisedFR(IMAGES) + '\n' + foodNutritionFR(IMAGES) +
    '\n<div style="background:var(--primary);padding:56px 5%;text-align:center;color:var(--white);">'
  );

  // 5e. Confidence + Delivery + Final CTA before the last green CTA section
  html = html.replace(
    '\n<section style="background:var(--primary);padding:56px 5%;text-align:center;color:var(--white);">\n  <div style="max-width:760px;margin:0 auto;">\n    <h2 style="color:var(--gold);margin-bottom:14px;">Prêt à Accueillir Votre Perroquet',
    '\n' + confidenceFR(IMAGES) + '\n' + deliveryFR(IMAGES) + '\n' + finalCtaFR(IMAGES) +
    '\n<section style="background:var(--primary);padding:56px 5%;text-align:center;color:var(--white);">\n  <div style="max-width:760px;margin:0 auto;">\n    <h2 style="color:var(--gold);margin-bottom:14px;">Prêt à Accueillir Votre Perroquet'
  );

  fs.writeFileSync('fr/index.html', html);
  console.log('  ✓ fr/index.html (FR) — 6 sections injected');
}

// ─────────────────────────────────────────────
// 6. UPDATE SITEMAPS
// ─────────────────────────────────────────────
function updateSitemaps() {
  // No new URL pages are created — just visual sections on existing pages
  // Update lastmod for both homepages in sitemap_main.xml
  let sm = fs.readFileSync('sitemap_main.xml', 'utf8');
  const today = '2026-07-12';

  // The homepage is usually first in sitemap_main.xml
  sm = sm.replace(
    /<url><loc>https:\/\/www\.paraisodeaves\.com\/<\/loc><lastmod>[^<]+<\/lastmod>/,
    `<url><loc>https://www.paraisodeaves.com/</loc><lastmod>${today}</lastmod>`
  );
  fs.writeFileSync('sitemap_main.xml', sm);

  let sfr = fs.readFileSync('sitemap_fr.xml', 'utf8');
  sfr = sfr.replace(
    /<url><loc>https:\/\/www\.paraisodeaves\.com\/fr\/<\/loc><lastmod>[^<]+<\/lastmod>/,
    `<url><loc>https://www.paraisodeaves.com/fr/</loc><lastmod>${today}</lastmod>`
  );
  fs.writeFileSync('sitemap_fr.xml', sfr);
  console.log('  ✓ Sitemaps: lastmod updated for / and /fr/');
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
console.log('\n🎨 Phase 6 — Premium Homepage Image System\n');

console.log('1. Copying curated images to images/homepage/...');
copyImages();

console.log('2. Injecting ES homepage sections...');
injectES();

console.log('3. Injecting FR homepage sections...');
injectFR();

console.log('4. Updating sitemaps...');
updateSitemaps();

console.log('\n✅ Phase 6 complete\n');
