/**
 * generate-phase6d.js — Phase 6D
 * Restructure gallery by category
 * Outputs:
 *   galeria/index.html                     (landing — 9 category cards)
 *   fr/galerie/index.html                  (landing — 9 category cards, FR)
 *   galeria/{slug}/index.html  ×9          (ES category pages)
 *   fr/galerie/{slug}/index.html  ×9       (FR category pages)
 *   index.html                             (replace masonry with 6 category cards)
 *   fr/index.html                          (same, FR)
 *   sitemap_main.xml + sitemap_fr.xml      (+9 URLs each)
 */
'use strict';
const fs = require('fs');

const BASE = 'https://www.paraisodeaves.com';

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
const CATS = [
  {
    key: 'instalaciones',
    slugES: 'instalaciones', slugFR: 'installations',
    titleES: 'Nuestras Instalaciones', titleFR: 'Nos Installations',
    descES: 'Aviarios exteriores diseñados para el bienestar animal, zonas de vuelo libre, áreas de crianza y espacios de socialización diaria de nuestros loros.',
    descFR: 'Volières extérieures conçues pour le bien-être animal, zones de vol libre, espaces d\'élevage et de socialisation quotidienne de nos perroquets.',
    introES: 'Conozca los espacios donde cuidamos, alimentamos y socializamos a nuestras aves. Esta selección muestra nuestras zonas de crianza, aviarios, áreas de descanso y preparación diaria en el criadero de Llíria, Valencia.',
    introFR: 'Découvrez les espaces dans lesquels nos oiseaux sont élevés, nourris et socialisés. Cette sélection présente nos zones d\'élevage, volières, espaces de repos et installations de préparation quotidienne à Llíria, Valencia.',
    seoTitleES: 'Instalaciones del Criadero | Galería Paraíso de Aves',
    seoMetaES: 'Fotografías reales de las instalaciones de Paraíso de Aves: aviarios exteriores, jaulas interiores, zonas de vuelo libre y espacios de socialización en Llíria, Valencia.',
    seoTitleFR: 'Installations de l\'Élevage | Galerie Paraíso de Aves',
    seoMetaFR: 'Photos réelles des installations de Paraíso de Aves: volières extérieures, cages intérieures, zones de vol libre et espaces de socialisation à Llíria, Valencia.',
    relatedES: ['alimentacion','crianza-socializacion','jaulas-aviarios'],
    relatedFR: ['alimentation','elevage-socialisation','cages-volieres'],
    linkES: '/aves-disponibles/', linkFR: '/fr/oiseaux-disponibles/',
    linkLabelES: 'Ver aves disponibles →', linkLabelFR: 'Voir les oiseaux disponibles →',
  },
  {
    key: 'alimentacion',
    slugES: 'alimentacion', slugFR: 'alimentation',
    titleES: 'Alimentación y Nutrición', titleFR: 'Alimentation et Nutrition',
    descES: 'Frutas frescas, verduras de temporada, mezclas de semillas artesanales y pellets premium. Cada ave recibe una dieta equilibrada adaptada a su especie y etapa de vida.',
    descFR: 'Fruits frais, légumes de saison, mélanges de graines artisanaux et granulés premium. Chaque oiseau reçoit un régime équilibré adapté à son espèce et à son stade de vie.',
    introES: 'Una dieta de calidad es la base de la salud y longevidad de los loros. En Paraíso de Aves preparamos diariamente frutas frescas, verduras de temporada, brotes germinados, semillas naturales y pellets. Aquí mostramos los alimentos reales que ofrecemos a nuestros loros.',
    introFR: 'Un régime de qualité est la base de la santé et de la longévité des perroquets. Chez Paraíso de Aves, nous préparons quotidiennement des fruits frais, des légumes de saison, des graines germées, des graines naturelles et des granulés. Voici les aliments réels que nous offrons à nos perroquets.',
    seoTitleES: 'Alimentación para Loros — Fotos Reales | Galería Paraíso de Aves',
    seoMetaES: 'Galería de fotos de alimentación para loros: mezclas de semillas, frutas frescas, verduras, pellets y brotes germinados. Nutrición real del criadero Paraíso de Aves.',
    seoTitleFR: 'Alimentation pour Perroquets — Photos Réelles | Galerie Paraíso de Aves',
    seoMetaFR: 'Galerie photos d\'alimentation pour perroquets: mélanges de graines, fruits frais, légumes, granulés et graines germées. Nutrition réelle de l\'élevage Paraíso de Aves.',
    relatedES: ['instalaciones','crianza-socializacion'],
    relatedFR: ['installations','elevage-socialisation'],
    linkES: '/comida-para-loros/', linkFR: '/fr/nourriture-pour-perroquets/',
    linkLabelES: 'Guía completa de alimentación →', linkLabelFR: 'Guide complet d\'alimentation →',
  },
  {
    key: 'jaulas-aviarios',
    slugES: 'jaulas-aviarios', slugFR: 'cages-volieres',
    titleES: 'Jaulas y Aviarios', titleFR: 'Cages et Volières',
    descES: 'Jaulas de acero inoxidable de gran capacidad, perchas naturales, comederos ergonómicos y juguetes de enriquecimiento. El ambiente correcto para loros equilibrados y sanos.',
    descFR: 'Cages en acier inoxydable de grande capacité, perchoirs naturels, mangeoires ergonomiques et jouets d\'enrichissement. L\'environnement correct pour des perroquets équilibrés et en bonne santé.',
    introES: 'El entorno físico de un loro es determinante para su bienestar mental y físico. En Paraíso de Aves equipamos cada aviario y jaula con perchas de diámetros variados, juguetes de destrucción, cuerdas de trepar y comederos de acero inoxidable fáciles de higienizar.',
    introFR: 'L\'environnement physique d\'un perroquet est déterminant pour son bien-être mental et physique. Chez Paraíso de Aves, chaque volière et cage est équipée de perchoirs de diamètres variés, jouets de destruction, cordes pour grimper et mangeoires en acier inoxydable faciles à hygiéniser.',
    seoTitleES: 'Jaulas y Aviarios para Loros | Galería Paraíso de Aves',
    seoMetaES: 'Fotos reales de jaulas, aviarios y equipamiento para loros: perchas naturales, juguetes, cuerdas y comederos. Instalaciones de Paraíso de Aves en Valencia.',
    seoTitleFR: 'Cages et Volières pour Perroquets | Galerie Paraíso de Aves',
    seoMetaFR: 'Photos réelles de cages, volières et équipement pour perroquets: perchoirs naturels, jouets, cordes et mangeoires. Installations de Paraíso de Aves en Espagne.',
    relatedES: ['instalaciones','aves-disponibles'],
    relatedFR: ['installations','perroquets-disponibles'],
    linkES: '/aves-disponibles/', linkFR: '/fr/oiseaux-disponibles/',
    linkLabelES: 'Ver aves disponibles →', linkLabelFR: 'Voir les oiseaux disponibles →',
  },
  {
    key: 'guacamayos',
    slugES: 'guacamayos', slugFR: 'aras',
    titleES: 'Guacamayos', titleFR: 'Aras',
    descES: 'Ara ararauna, Ara macao y Ara hyacinthinus criados a mano con máxima socialización desde los 15 días. Las tres especies más solicitadas con documentación CITES completa.',
    descFR: 'Ara ararauna, Ara macao et Ara hyacinthinus élevés à la main avec une socialisation maximale dès 15 jours. Les trois espèces les plus demandées avec documentation CITES complète.',
    introES: 'Los guacamayos son las aves de compañía más impresionantes del mundo. En Paraíso de Aves criamos las tres especies más representativas: el azul y amarillo (Ara ararauna), el escarlata (Ara macao) y el jacinto (Anodorhynchus hyacinthinus). Todos criados a mano, sociables desde bebé y documentados CITES. Las fotos que ves aquí son de nuestros ejemplares reales.',
    introFR: 'Les aras sont les oiseaux de compagnie les plus impressionnants au monde. Chez Paraíso de Aves, nous élevons les trois espèces les plus représentatives: le bleu et jaune (Ara ararauna), l\'écarlate (Ara macao) et l\'hyacinthe (Anodorhynchus hyacinthinus). Tous élevés à la main, sociables dès le plus jeune âge et documentés CITES. Les photos que vous voyez ici sont de nos vrais spécimens.',
    seoTitleES: 'Galería de Guacamayos Criados a Mano | Paraíso de Aves',
    seoMetaES: 'Fotos reales de guacamayos azul amarillo, escarlata y jacinto criados a mano en Paraíso de Aves. Disponibles con documentación CITES. Llíria, Valencia.',
    seoTitleFR: 'Galerie d\'Aras Élevés à la Main | Paraíso de Aves',
    seoMetaFR: 'Photos réelles d\'aras bleus et jaunes, écarlates et hyacinthes élevés à la main chez Paraíso de Aves. Disponibles avec documentation CITES. Llíria, Valencia.',
    relatedES: ['aves-disponibles','crianza-socializacion','conuros'],
    relatedFR: ['perroquets-disponibles','elevage-socialisation','conures'],
    linkES: '/guacamayos.html', linkFR: '/fr/aras/',
    linkLabelES: 'Ficha completa de guacamayos →', linkLabelFR: 'Fiche complète des aras →',
  },
  {
    key: 'conuros',
    slugES: 'conuros', slugFR: 'conures',
    titleES: 'Conuros', titleFR: 'Conures',
    descES: 'Conuros del sol y conuros verdes criados a mano: personalidad desbordante en un cuerpo compacto. Perfectos como primer loro para familias y personas que buscan un ave sociable.',
    descFR: 'Conures du soleil et conures verts élevés à la main: personnalité débordante dans un corps compact. Parfaits comme premier perroquet pour les familles et les personnes cherchant un oiseau sociable.',
    introES: 'Los conuros son loros de tamaño mediano con grandes personalidades. Criados a mano en Paraíso de Aves desde los primeros días de vida, son aves completamente sociables, juguetonas y curiosas. Sus colores vibrantes y su temperamento activo los convierten en compañeros ideales para toda la familia.',
    introFR: 'Les conures sont des perroquets de taille moyenne avec de grandes personnalités. Élevés à la main chez Paraíso de Aves depuis les premiers jours de vie, ce sont des oiseaux totalement sociables, joueurs et curieux. Leurs couleurs vives et leur tempérament actif en font des compagnons idéaux pour toute la famille.',
    seoTitleES: 'Galería de Conuros Criados a Mano | Paraíso de Aves',
    seoMetaES: 'Fotos reales de conuros del sol y conuros verdes criados a mano. Loros de compañía sociables y coloridos de Paraíso de Aves, Llíria Valencia.',
    seoTitleFR: 'Galerie de Conures Élevées à la Main | Paraíso de Aves',
    seoMetaFR: 'Photos réelles de conures du soleil et conures verts élevés à la main. Perroquets de compagnie sociables et colorés de Paraíso de Aves, Llíria Valencia.',
    relatedES: ['guacamayos','aves-disponibles','crianza-socializacion'],
    relatedFR: ['aras','perroquets-disponibles','elevage-socialisation'],
    linkES: '/aves-disponibles/', linkFR: '/fr/oiseaux-disponibles/',
    linkLabelES: 'Ver conuros disponibles →', linkLabelFR: 'Voir les conures disponibles →',
  },
  {
    key: 'tucanes',
    slugES: 'tucanes', slugFR: 'toucans',
    titleES: 'Tucanes', titleFR: 'Toucans',
    descES: 'Shinda y Daphne, nuestra pareja de tucanes de pico quilla nacidos en el criadero. Aves exóticas únicas que conviven con los loros y enriquecen el ambiente con su presencia.',
    descFR: 'Shinda et Daphne, notre couple de toucans à bec caréné nés dans notre élevage. Oiseaux exotiques uniques qui cohabitent avec les perroquets et enrichissent l\'ambiance de leur présence.',
    introES: 'Los tucanes de Paraíso de Aves no son aves de compañía convencionales: son embajadores del mundo tropical que viven en nuestras instalaciones desde su nacimiento. Shinda y Daphne son nuestra pareja reproductora de Ramphastos sulfuratus (tucán keel-bill). Las imágenes muestran su comportamiento real: baños, alimentación y descanso.',
    introFR: 'Les toucans de Paraíso de Aves ne sont pas des oiseaux de compagnie conventionnels: ce sont des ambassadeurs du monde tropical qui vivent dans nos installations depuis leur naissance. Shinda et Daphne sont notre couple reproducteur de Ramphastos sulfuratus (toucan à bec caréné). Les images montrent leur comportement réel: bains, alimentation et repos.',
    seoTitleES: 'Galería de Tucanes — Shinda y Daphne | Paraíso de Aves',
    seoMetaES: 'Fotos reales de tucanes de pico quilla en Paraíso de Aves: Shinda y Daphne, nuestra pareja reproductora. Baños, alimentación y vida diaria del tucán en el criadero.',
    seoTitleFR: 'Galerie de Toucans — Shinda et Daphne | Paraíso de Aves',
    seoMetaFR: 'Photos réelles de toucans à bec caréné chez Paraíso de Aves: Shinda et Daphne, notre couple reproducteur. Bains, alimentation et vie quotidienne du toucan.',
    relatedES: ['instalaciones','aves-disponibles','guacamayos'],
    relatedFR: ['installations','perroquets-disponibles','aras'],
    linkES: '/tucanes/', linkFR: '/fr/toucans/',
    linkLabelES: 'Conocer a Shinda y Daphne →', linkLabelFR: 'Découvrir Shinda et Daphne →',
  },
  {
    key: 'aves-disponibles',
    slugES: 'aves-disponibles', slugFR: 'perroquets-disponibles',
    titleES: 'Loros Disponibles', titleFR: 'Perroquets Disponibles',
    descES: 'Loro gris africano, cacatúas galah, loros del Senegal y otras especies disponibles. Todos criados a mano, con documentación CITES y revisión veterinaria previa a la entrega.',
    descFR: 'Gris du Gabon, cacatoès rosalbins, perroquets du Sénégal et d\'autres espèces disponibles. Tous élevés à la main, avec documentation CITES et visite vétérinaire avant livraison.',
    introES: 'Estas son imágenes reales de loros que hemos criado o estamos criando actualmente. La disponibilidad cambia con frecuencia: algunas aves ya tienen dueño, otras están en período de reserva. Contacta con nosotros para conocer el estado actual de disponibilidad. Todos nuestros loros se entregan con documentación CITES y revisión veterinaria.',
    introFR: 'Ce sont des images réelles de perroquets que nous avons élevés ou élevons actuellement. La disponibilité change fréquemment: certains oiseaux ont déjà un propriétaire, d\'autres sont en période de réservation. Contactez-nous pour connaître la disponibilité actuelle. Tous nos perroquets sont livrés avec documentation CITES et visite vétérinaire.',
    seoTitleES: 'Loros Disponibles — Galería Real | Paraíso de Aves',
    seoMetaES: 'Fotos reales de loros disponibles: loro gris africano, cacatúas galah, loros del Senegal. Criados a mano con documentación CITES en Paraíso de Aves, Valencia.',
    seoTitleFR: 'Perroquets Disponibles — Galerie Réelle | Paraíso de Aves',
    seoMetaFR: 'Photos réelles de perroquets disponibles: gris du Gabon, cacatoès rosalbins, perroquets du Sénégal. Élevés à la main avec documentation CITES chez Paraíso de Aves.',
    relatedES: ['guacamayos','conuros','tucanes'],
    relatedFR: ['aras','conures','toucans'],
    linkES: '/aves-disponibles/', linkFR: '/fr/oiseaux-disponibles/',
    linkLabelES: 'Ver todas las aves disponibles →', linkLabelFR: 'Voir tous les oiseaux disponibles →',
  },
  {
    key: 'crianza-socializacion',
    slugES: 'crianza-socializacion', slugFR: 'elevage-socialisation',
    titleES: 'Crianza y Socialización', titleFR: 'Élevage et Socialisation',
    descES: 'Imágenes del proceso de crianza a mano desde los 15 días de vida: alimentación con papilla, socialización temprana con humanos y desarrollo de la confianza.',
    descFR: 'Images du processus d\'élevage à la main dès 15 jours de vie: alimentation à la becquée, socialisation précoce avec les humains et développement de la confiance.',
    introES: 'La crianza a mano es el corazón de lo que hacemos. Desde los 15 días de vida, cada pichón recibe alimentación manual con papilla varias veces al día, contacto humano constante y socialización progresiva. El resultado son aves que confían completamente en las personas y se adaptan fácilmente al hogar familiar.',
    introFR: 'L\'élevage à la main est au cœur de ce que nous faisons. Dès 15 jours de vie, chaque oisillon reçoit une alimentation manuelle à la becquée plusieurs fois par jour, un contact humain constant et une socialisation progressive. Le résultat est des oiseaux qui font totalement confiance aux humains et s\'adaptent facilement au foyer familial.',
    seoTitleES: 'Crianza a Mano y Socialización | Galería Paraíso de Aves',
    seoMetaES: 'Fotos del proceso de crianza a mano de loros: alimentación con papilla, socialización temprana y desarrollo del vínculo humano-ave en Paraíso de Aves.',
    seoTitleFR: 'Élevage à la Main et Socialisation | Galerie Paraíso de Aves',
    seoMetaFR: 'Photos du processus d\'élevage à la main de perroquets: alimentation à la becquée, socialisation précoce et développement du lien humain-oiseau chez Paraíso de Aves.',
    relatedES: ['instalaciones','aves-disponibles','guacamayos'],
    relatedFR: ['installations','perroquets-disponibles','aras'],
    linkES: '/adopcion-de-loros', linkFR: '/fr/adoption-perroquet/',
    linkLabelES: 'Proceso de adopción →', linkLabelFR: 'Processus d\'adoption →',
  },
  {
    key: 'transporte',
    slugES: 'transporte', slugFR: 'transport',
    titleES: 'Transporte y Entrega', titleFR: 'Transport et Livraison',
    descES: 'Transportines homologados IATA, envíos a toda España y Europa con empresa especializada en transporte de animales vivos. El bienestar del ave en el viaje es nuestra prioridad.',
    descFR: 'Caisses de transport homologuées IATA, livraisons dans toute l\'Espagne et l\'Europe avec une entreprise spécialisée dans le transport d\'animaux vivants. Le bien-être de l\'oiseau pendant le voyage est notre priorité.',
    introES: 'El transporte seguro es la última etapa del proceso de adopción. Utilizamos transportines homologados IATA diseñados específicamente para aves, con ventilación adecuada, espacio suficiente y materiales seguros. Trabajamos con empresas especializadas en transporte de animales vivos para garantizar que tu loro llegue en perfectas condiciones.',
    introFR: 'Le transport sécurisé est la dernière étape du processus d\'adoption. Nous utilisons des caisses de transport homologuées IATA spécifiquement conçues pour les oiseaux, avec une ventilation adéquate, un espace suffisant et des matériaux sûrs. Nous travaillons avec des entreprises spécialisées dans le transport d\'animaux vivants pour garantir que votre perroquet arrive en parfaites conditions.',
    seoTitleES: 'Transporte y Entrega de Loros | Galería Paraíso de Aves',
    seoMetaES: 'Cómo transportamos los loros: transportines IATA, envíos a España y Europa. Fotos del equipamiento de transporte de Paraíso de Aves.',
    seoTitleFR: 'Transport et Livraison de Perroquets | Galerie Paraíso de Aves',
    seoMetaFR: 'Comment nous transportons les perroquets: caisses IATA, livraisons en Espagne et Europe. Photos de l\'équipement de transport de Paraíso de Aves.',
    relatedES: ['aves-disponibles','crianza-socializacion'],
    relatedFR: ['perroquets-disponibles','elevage-socialisation'],
    linkES: '/envio-de-loros', linkFR: '/fr/livraison-perroquets/',
    linkLabelES: 'Información sobre envíos →', linkLabelFR: 'Informations sur les livraisons →',
  },
];

// Map category key → category object
const CAT_MAP = {};
CATS.forEach(c => { CAT_MAP[c.key] = c; });

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE DATABASE — every photo with category + localized captions
// ─────────────────────────────────────────────────────────────────────────────
// Helper: does a WebP companion exist for a .jpg path?
function hasWebP(src) {
  // homepage/*.jpg and food/*.jpg have companions from Phases 6A/6C
  return src.startsWith('/images/homepage/') || src.startsWith('/images/food/');
}
function imgTag(src, alt, w, h, lazy = true) {
  const wp  = src.replace('.jpg', '.webp');
  const av  = src.replace('.jpg', '.avif');
  const sm  = src.replace('.jpg', '-sm.jpg');
  const load = lazy ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"';
  if (src.endsWith('.webp')) {
    return `<img src="${src}" alt="${alt}" width="${w}" height="${h}" ${load}>`;
  }
  if (hasWebP(src)) {
    return `<picture>`
         + `<source srcset="${av}" type="image/avif">`
         + `<source srcset="${wp}" type="image/webp">`
         + `<img src="${src}" alt="${alt}" width="${w}" height="${h}" ${load}>`
         + `</picture>`;
  }
  return `<img src="${src}" alt="${alt}" width="${w}" height="${h}" ${load}>`;
}

const IMAGES = [
  // ── INSTALACIONES ──────────────────────────────────────────────────────────
  { cat:'instalaciones', src:'/images/gallery/nosotros-guacamayo-verde-volador-01.jpg', w:1200, h:800, featured:true,
    altES:'Guacamayo verde en vuelo libre en las instalaciones de Paraíso de Aves', altFR:'Ara vert en vol libre dans les installations de Paraíso de Aves',
    capES:'Vuelo libre — espacio amplio cada día', capFR:'Vol libre — grand espace chaque jour' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-aviario-exterior-criadero-02.jpg', w:1200, h:800, featured:true,
    altES:'Aviario exterior del criadero de Paraíso de Aves en Llíria, Valencia', altFR:'Volière extérieure de l\'élevage Paraíso de Aves à Llíria, Valencia',
    capES:'Aviarios exteriores — diseñados para el bienestar animal', capFR:'Volières extérieures — conçues pour le bien-être animal' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-jaula-interior-equipada-03.jpg', w:1200, h:800,
    altES:'Jaula interior equipada con perchas naturales en el criadero', altFR:'Cage intérieure équipée de perchoirs naturels dans l\'élevage',
    capES:'Jaulas interiores con enriquecimiento ambiental', capFR:'Cages intérieures avec enrichissement environnemental' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-cuidador-guacamayo-socializacion-04.jpg', w:1200, h:800,
    altES:'Cuidador socializando con guacamayo en Paraíso de Aves', altFR:'Soigneur socialisant avec un ara chez Paraíso de Aves',
    capES:'Socialización diaria — clave de un loro equilibrado', capFR:'Socialisation quotidienne — clé d\'un perroquet équilibré' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-zona-aviarios-multiple-05.jpg', w:1200, h:800,
    altES:'Zona de aviarios múltiples del criadero Paraíso de Aves', altFR:'Zone de volières multiples de l\'élevage Paraíso de Aves',
    capES:'Más de 20 aviarios individuales para cría responsable', capFR:'Plus de 20 volières individuelles pour un élevage responsable' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-guacamayos-percha-natural-06.jpg', w:1200, h:800,
    altES:'Guacamayos descansando en percha natural en el criadero', altFR:'Aras se reposant sur un perchoir naturel dans l\'élevage',
    capES:'Perchas naturales de madera — salud de patas y pico', capFR:'Perchoirs naturels en bois — santé des pattes et du bec' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-amazona-loro-sociable-07.jpg', w:1200, h:800,
    altES:'Amazona sociable y confiada en manos del criador', altFR:'Amazone sociable et confiante dans les mains de l\'éleveur',
    capES:'Amazonas criadas a mano — temperamento equilibrado', capFR:'Amazones élevées à la main — tempérament équilibré' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-amazonas-pareja-curiosas-08.jpg', w:1200, h:800,
    altES:'Pareja de amazonas curiosas observando en el criadero', altFR:'Couple d\'amazones curieuses dans l\'élevage',
    capES:'Reproductores seleccionados por salud y temperamento', capFR:'Reproducteurs sélectionnés pour la santé et le tempérament' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-amazona-crianza-mano-09.jpg', w:1200, h:800,
    altES:'Cría de amazona criada a mano con biberón en Paraíso de Aves', altFR:'Oisillon d\'amazone élevé à la main au biberon chez Paraíso de Aves',
    capES:'Crianza a mano desde los 15 días — máxima socialización', capFR:'Élevage à la main dès 15 jours — socialisation maximale' },
  { cat:'instalaciones', src:'/images/gallery/nosotros-loros-juego-enriquecimiento-10.jpg', w:1200, h:800,
    altES:'Loros jugando con juguetes de enriquecimiento en el criadero', altFR:'Perroquets jouant avec des jouets d\'enrichissement dans l\'élevage',
    capES:'Enriquecimiento diario — bienestar cognitivo', capFR:'Enrichissement quotidien — bien-être cognitif' },
  { cat:'instalaciones', src:'/images/homepage/paraiso-de-aves-aviary-exterior.jpg', w:800, h:533,
    altES:'Exterior del aviario de Paraíso de Aves en Llíria, Valencia', altFR:'Extérieur de la volière de Paraíso de Aves à Llíria, Valencia',
    capES:'Exterior del aviario — Llíria, Valencia', capFR:'Extérieur de la volière — Llíria, Valencia' },
  { cat:'instalaciones', src:'/images/homepage/paraiso-de-aves-facility-exterior.jpg', w:800, h:533,
    altES:'Fachada exterior del criadero Paraíso de Aves', altFR:'Façade extérieure de l\'élevage Paraíso de Aves',
    capES:'Fachada del criadero — Paraíso de Aves', capFR:'Façade de l\'élevage — Paraíso de Aves' },
  { cat:'instalaciones', src:'/images/homepage/cockatoo-outdoor-aviary.jpg', w:800, h:533,
    altES:'Cacatúa en aviario exterior del criadero', altFR:'Cacatoès dans la volière extérieure de l\'élevage',
    capES:'Cacatúa en aviario exterior', capFR:'Cacatoès en volière extérieure' },

  // ── ALIMENTACIÓN ──────────────────────────────────────────────────────────
  { cat:'alimentacion', src:'/images/food/periquito-comiendo-semillas-cuenco-madera.jpg', w:800, h:534, featured:true,
    altES:'Periquito azul comiendo semillas de mezcla premium en cuenco de madera', altFR:'Perruche bleue mangeant des graines dans un bol en bois',
    capES:'Periquito comiendo su mezcla de semillas premium', capFR:'Perruche mangeant son mélange de graines premium' },
  { cat:'alimentacion', src:'/images/gallery/comida-para-loros-mezcla-premium-01.jpg', w:1200, h:800,
    altES:'Mezcla premium de semillas y frutas para loros del criadero', altFR:'Mélange premium de graines et fruits pour les perroquets de l\'élevage',
    capES:'Mezcla premium personalizada — nutrición óptima', capFR:'Mélange premium personnalisé — nutrition optimale' },
  { cat:'alimentacion', src:'/images/gallery/frutas-seguras-para-loros-03.jpg', w:1200, h:800,
    altES:'Frutas frescas seguras para loros: manzana, pera, papaya', altFR:'Fruits frais sûrs pour perroquets: pomme, poire, papaye',
    capES:'Frutas frescas diarias — vitaminas naturales', capFR:'Fruits frais quotidiens — vitamines naturelles' },
  { cat:'alimentacion', src:'/images/gallery/verduras-para-loros-dieta-04.jpg', w:1200, h:800,
    altES:'Verduras y hortalizas para la dieta del loro', altFR:'Légumes et légumes pour le régime alimentaire du perroquet',
    capES:'Verduras de temporada — esenciales en la dieta', capFR:'Légumes de saison — essentiels dans le régime' },
  { cat:'alimentacion', src:'/images/gallery/brotes-germinados-loros-08.jpg', w:1200, h:800,
    altES:'Brotes germinados para enriquecer la dieta del loro', altFR:'Graines germées pour enrichir le régime du perroquet',
    capES:'Brotes germinados — enzimas y vitaminas al máximo', capFR:'Graines germées — enzymes et vitamines au maximum' },
  { cat:'alimentacion', src:'/images/gallery/comida-guacamayo-dieta-especifica-13.jpg', w:1200, h:800,
    altES:'Dieta de guacamayo equilibrada con alto contenido calórico', altFR:'Régime d\'ara équilibré avec haute teneur calorique',
    capES:'Dieta del guacamayo — alta en calorías y nutrientes', capFR:'Régime de l\'ara — riche en calories et nutriments' },
  { cat:'alimentacion', src:'/images/gallery/comida-yaco-loro-gris-14.jpg', w:1200, h:800,
    altES:'Dieta del loro yaco especialmente rica en calcio y vitamina A', altFR:'Régime du gris du Gabon particulièrement riche en calcium et vitamine A',
    capES:'Dieta del yaco — calcio y vitamina A esenciales', capFR:'Régime du gris du Gabon — calcium et vitamine A' },
  { cat:'alimentacion', src:'/images/gallery/mango-loro-fruta-tropical-28.jpg', w:1200, h:800,
    altES:'Mango fresco para loros — vitaminas A y C para plumaje brillante', altFR:'Mangue fraîche pour perroquets — vitamines A et C pour un plumage brillant',
    capES:'Mango — vitaminas A y C para plumaje brillante', capFR:'Mangue — vitamines A et C pour un plumage brillant' },
  { cat:'alimentacion', src:'/images/homepage/healthy-parrot-food-mix.jpg', w:800, h:533,
    altES:'Mezcla saludable de semillas para loros — alimento premium natural', altFR:'Mélange sain de graines pour perroquets — aliment premium naturel',
    capES:'Mezcla premium de semillas y cereales', capFR:'Mélange premium de graines et céréales' },
  { cat:'alimentacion', src:'/images/homepage/fresh-fruits-parrot-diet.jpg', w:800, h:533,
    altES:'Frutas frescas variadas para la dieta diaria del loro', altFR:'Fruits frais variés pour le régime quotidien du perroquet',
    capES:'Frutas frescas variadas — dieta equilibrada', capFR:'Fruits frais variés — régime équilibré' },
  { cat:'alimentacion', src:'/images/homepage/fresh-vegetables-parrot.jpg', w:800, h:533,
    altES:'Verduras frescas para loros — zanahoria, pimiento, brócoli', altFR:'Légumes frais pour perroquets — carotte, poivron, brocoli',
    capES:'Verduras frescas — zanahoria, pimiento, brócoli', capFR:'Légumes frais — carotte, poivron, brocoli' },
  { cat:'alimentacion', src:'/images/food/mezcla-semillas-loros-cuenco-blanco-cenital.jpg', w:800, h:532,
    altES:'Mezcla de semillas para loros en cuenco blanco vista cenital', altFR:'Mélange de graines pour perroquets dans bol blanc vue du dessus',
    capES:'Mezcla artesanal — vista cenital', capFR:'Mélange artisanal — vue du dessus' },
  { cat:'alimentacion', src:'/images/food/almacenamiento-semillas-tarro-cristal.jpg', w:800, h:532,
    altES:'Semillas para loros almacenadas en tarro hermético de cristal', altFR:'Graines pour perroquets stockées dans un bocal hermétique en verre',
    capES:'Almacenamiento hermético — frescura garantizada', capFR:'Stockage hermétique — fraîcheur garantie' },

  // ── JAULAS Y AVIARIOS ─────────────────────────────────────────────────────
  { cat:'jaulas-aviarios', src:'/images/homepage/premium-parrot-cage-interior.jpg', w:800, h:533, featured:true,
    altES:'Jaula interior premium con perchas naturales para loros del criadero', altFR:'Cage intérieure premium avec perchoirs naturels pour perroquets',
    capES:'Jaula interior premium — perchas naturales y comederos', capFR:'Cage intérieure premium — perchoirs naturels et mangeoires' },
  { cat:'jaulas-aviarios', src:'/images/gallery/juguetes-naturales-para-loros-01.jpg', w:1200, h:800,
    altES:'Juguetes naturales para loros — estimulación mental sin riesgo', altFR:'Jouets naturels pour perroquets — stimulation mentale sans risque',
    capES:'Juguetes naturales — estimulación sin riesgo', capFR:'Jouets naturels — stimulation sans risque' },
  { cat:'jaulas-aviarios', src:'/images/gallery/juguete-madera-guacamayo-02.jpg', w:1200, h:800,
    altES:'Juguete de madera dura para guacamayo — necesario para el pico fuerte', altFR:'Jouet en bois dur pour ara — nécessaire pour le bec fort',
    capES:'Madera dura — necesaria para el pico de los guacamayos', capFR:'Bois dur — nécessaire pour le bec des aras' },
  { cat:'jaulas-aviarios', src:'/images/gallery/columpio-natural-loros-03.jpg', w:1200, h:800,
    altES:'Columpio natural para loros — equilibrio y coordinación', altFR:'Balançoire naturelle pour perroquets — équilibre et coordination',
    capES:'Columpios naturales — equilibrio y coordinación', capFR:'Balançoires naturelles — équilibre et coordination' },
  { cat:'jaulas-aviarios', src:'/images/gallery/cuerdas-naturales-loros-trepar-05.jpg', w:1200, h:800,
    altES:'Cuerdas de fibra natural para loros — seguras para trepar y explorar', altFR:'Cordes en fibre naturelle pour perroquets — sûres pour grimper et explorer',
    capES:'Cuerdas naturales — seguras para trepar', capFR:'Cordes naturelles — sûres pour grimper' },
  { cat:'jaulas-aviarios', src:'/images/gallery/perchas-madera-natural-loro-06.jpg', w:1200, h:800,
    altES:'Perchas de madera natural de distinto diámetro para la salud de las patas', altFR:'Perchoirs en bois naturel de différents diamètres pour la santé des pattes',
    capES:'Perchas de distinto diámetro — salud de patas y uñas', capFR:'Perchoirs de différents diamètres — santé des pattes et des griffes' },
  { cat:'jaulas-aviarios', src:'/images/gallery/juguete-destruir-loros-07.jpg', w:1200, h:800,
    altES:'Juguetes de destrucción para loros — satisfacen el instinto de picotear', altFR:'Jouets de destruction pour perroquets — satisfont l\'instinct de picoter',
    capES:'Juguetes de destrucción — instinto natural satisfecho', capFR:'Jouets de destruction — instinct naturel satisfait' },
  { cat:'jaulas-aviarios', src:'/images/gallery/campanas-loros-sonido-10.jpg', w:1200, h:800,
    altES:'Sonajeros y campanas para loros — estimulación auditiva', altFR:'Sonnettes et clochettes pour perroquets — stimulation auditive',
    capES:'Campanas y sonajeros — estimulación auditiva', capFR:'Cloches et sonnettes — stimulation auditive' },
  { cat:'jaulas-aviarios', src:'/images/gallery/comedero-acero-inoxidable-loro-10.jpg', w:1200, h:800,
    altES:'Comedero de acero inoxidable higiénico para loros sin BPA', altFR:'Mangeoire en acier inoxydable hygiénique pour perroquets sans BPA',
    capES:'Comederos de acero inoxidable — sin BPA, fáciles de limpiar', capFR:'Mangeoires en acier inoxydable — sans BPA, faciles à nettoyer' },
  { cat:'jaulas-aviarios', src:'/images/homepage/parrot-enrichment-play.jpg', w:800, h:533,
    altES:'Loro jugando con juguetes de enriquecimiento en su jaula', altFR:'Perroquet jouant avec des jouets d\'enrichissement dans sa cage',
    capES:'Enriquecimiento en jaula — fundamental para el bienestar', capFR:'Enrichissement en cage — fondamental pour le bien-être' },

  // ── GUACAMAYOS ───────────────────────────────────────────────────────────
  { cat:'guacamayos', src:'/images/guacamayo-azul-01.webp', w:800, h:600, featured:true,
    altES:'Guacamayo azul y amarillo Ara ararauna disponible en Paraíso de Aves', altFR:'Ara bleu et jaune Ara ararauna disponible chez Paraíso de Aves',
    capES:'Ara ararauna — el guacamayo más popular del mundo', capFR:'Ara ararauna — l\'ara le plus populaire au monde' },
  { cat:'guacamayos', src:'/images/guacamayo-azul-02.webp', w:800, h:600,
    altES:'Guacamayo azul amarillo plumaje turquesa 90 cm de envergadura', altFR:'Ara bleu et jaune plumage turquoise envergure 90 cm',
    capES:'Plumaje turquesa y amarillo dorado — 90 cm de magnificencia', capFR:'Plumage turquoise et jaune doré — 90 cm de magnificence' },
  { cat:'guacamayos', src:'/images/guacamayo-escarlata-01.webp', w:800, h:600,
    altES:'Guacamayo escarlata Ara macao disponible en Paraíso de Aves', altFR:'Ara écarlate Ara macao disponible chez Paraíso de Aves',
    capES:'Ara macao — 3000 años de historia junto al hombre', capFR:'Ara macao — 3000 ans d\'histoire aux côtés de l\'homme' },
  { cat:'guacamayos', src:'/images/guacamayo-escarlata-02.webp', w:800, h:600,
    altES:'Guacamayo escarlata con alas extendidas envergadura 120 cm', altFR:'Ara écarlate avec ailes déployées envergure 120 cm',
    capES:'Alas extendidas — envergadura de hasta 120 cm', capFR:'Ailes déployées — envergure jusqu\'à 120 cm' },
  { cat:'guacamayos', src:'/images/guacamayo-jacinto-01.webp', w:800, h:600,
    altES:'Guacamayo jacinto Anodorhynchus hyacinthinus azul cobalto 100 cm', altFR:'Ara hyacinthe Anodorhynchus hyacinthinus bleu cobalt 100 cm',
    capES:'Ara jacinto — 100 cm de pura intensidad azul cobalto', capFR:'Ara hyacinthe — 100 cm de pur bleu cobalt intense' },
  { cat:'guacamayos', src:'/images/guacamayo-jacinto-02.webp', w:800, h:600,
    altES:'Pico negro y anillo ocular amarillo del guacamayo jacinto', altFR:'Bec noir et anneau oculaire jaune de l\'ara hyacinthe',
    capES:'Pico negro y anillo ocular amarillo — rasgos únicos del jacinto', capFR:'Bec noir et anneau oculaire jaune — traits uniques de l\'hyacinthe' },
  { cat:'guacamayos', src:'/images/gallery/aves-disponibles-guacamayos-azul-amarillo-pareja-05.jpg', w:1200, h:800,
    altES:'Pareja de guacamayos azul y amarillo criados a mano con documentación CITES', altFR:'Couple d\'aras bleus et jaunes élevés à la main avec documentation CITES',
    capES:'Pareja de aras azul amarillo — documentados CITES', capFR:'Couple d\'aras bleu et jaune — documentés CITES' },
  { cat:'guacamayos', src:'/images/gallery/aves-disponibles-guacamayo-verde-papillero-14.jpg', w:1200, h:800,
    altES:'Guacamayo verde papillero criado a mano desde bebé', altFR:'Ara vert au biberon élevé à la main dès bébé',
    capES:'Papillero criado a mano — el vínculo más fuerte', capFR:'Oisillon élevé à la main — le lien le plus fort' },
  { cat:'guacamayos', src:'/images/homepage/macaw-pair-blue-yellow.jpg', w:800, h:533,
    altES:'Pareja de guacamayos azul y amarillo en percha del criadero', altFR:'Couple d\'aras bleus et jaunes sur perchoir de l\'élevage',
    capES:'Pareja de guacamayos en percha natural', capFR:'Couple d\'aras sur perchoir naturel' },
  { cat:'guacamayos', src:'/images/homepage/hand-raised-macaw-breeder.jpg', w:800, h:533,
    altES:'Guacamayo criado a mano por el criador de Paraíso de Aves', altFR:'Ara élevé à la main par l\'éleveur de Paraíso de Aves',
    capES:'Criado a mano — confianza total en el ser humano', capFR:'Élevé à la main — confiance totale en l\'humain' },

  // ── CONUROS ──────────────────────────────────────────────────────────────
  { cat:'conuros', src:'/images/conuro-01.webp', w:800, h:600, featured:true,
    altES:'Conuro del sol Sun conure naranja disponible en Paraíso de Aves', altFR:'Conure du soleil orange disponible chez Paraíso de Aves',
    capES:'Conuro del sol — explosión de colores tropicales', capFR:'Conure du soleil — explosion de couleurs tropicales' },
  { cat:'conuros', src:'/images/conuro-02.webp', w:800, h:600,
    altES:'Conuros criados a mano grandes personalidades cuerpo compacto', altFR:'Conures élevés à la main grandes personnalités corps compact',
    capES:'Grandes personalidades en cuerpos compactos', capFR:'Grandes personnalités dans des corps compacts' },
  { cat:'conuros', src:'/images/gallery/aves-disponibles-conuro-verde-percha-03.jpg', w:1200, h:800,
    altES:'Conuro verde en percha criado a mano primer loro ideal', altFR:'Conure vert sur perchoir élevé à la main premier perroquet idéal',
    capES:'Conuros criados a mano — perfectos como primer loro', capFR:'Conures élevés à la main — parfaits comme premier perroquet' },

  // ── TUCANES ──────────────────────────────────────────────────────────────
  { cat:'tucanes', src:'/images/shinda-daphne-01.webp', w:800, h:600, featured:true,
    altES:'Shinda el tucán de pico quilla nacido en el criadero Paraíso de Aves', altFR:'Shinda le toucan à bec caréné né dans l\'élevage Paraíso de Aves',
    capES:'Shinda — nuestro tucán keel-bill, nacido en el criadero', capFR:'Shinda — notre toucan à bec caréné, né dans l\'élevage' },
  { cat:'tucanes', src:'/images/shinda-daphne-02.webp', w:800, h:600,
    altES:'Daphne la tucana hembra carácter dulce y curioso en Paraíso de Aves', altFR:'Daphne la toucan femelle caractère doux et curieux chez Paraíso de Aves',
    capES:'Daphne — nuestra tucana hembra, carácter dulce y curioso', capFR:'Daphne — notre toucan femelle, caractère doux et curieux' },
  { cat:'tucanes', src:'/images/shinda-daphne-03.webp', w:800, h:600,
    altES:'Pico del tucán obra maestra de la evolución Paraíso de Aves', altFR:'Bec du toucan chef-d\'œuvre de l\'évolution Paraíso de Aves',
    capES:'El pico del tucán — una obra maestra de la evolución', capFR:'Le bec du toucan — un chef-d\'œuvre de l\'évolution' },
  { cat:'tucanes', src:'/images/shinda-daphne-04.webp', w:800, h:600,
    altES:'Shinda y Daphne pareja de tucanes reproductores en Paraíso de Aves', altFR:'Shinda et Daphne couple de toucans reproducteurs chez Paraíso de Aves',
    capES:'Shinda y Daphne — nuestra pareja reproductora', capFR:'Shinda et Daphne — notre couple reproducteur' },
  { cat:'tucanes', src:'/images/gallery/aves-disponibles-tucan-pico-keel-01.jpg', w:1200, h:800,
    altES:'Tucán keel-bill disponible en Paraíso de Aves fascinante', altFR:'Toucan à bec caréné disponible chez Paraíso de Aves fascinant',
    capES:'Tucán keel-bill — uno de nuestros pájaros más fascinantes', capFR:'Toucan à bec caréné — l\'un de nos oiseaux les plus fascinants' },
  { cat:'tucanes', src:'/images/gallery/aves-disponibles-tucan-bano-09.jpg', w:1200, h:800,
    altES:'Tucán disfrutando del baño en el criadero Paraíso de Aves', altFR:'Toucan appréciant son bain dans l\'élevage Paraíso de Aves',
    capES:'Los tucanes adoran el agua — ¡bañan a diario!', capFR:'Les toucans adorent l\'eau — ils se baignent quotidiennement!' },
  { cat:'tucanes', src:'/images/gallery/aves-disponibles-tucan-ducha-17.jpg', w:1200, h:800,
    altES:'Tucán disfrutando de ducha de agua en el criadero higiene esencial', altFR:'Toucan appréciant sa douche d\'eau dans l\'élevage hygiène essentielle',
    capES:'Ducha diaria — rutina de higiene esencial', capFR:'Douche quotidienne — routine d\'hygiène essentielle' },
  { cat:'tucanes', src:'/images/gallery/aves-disponibles-tucan-tropical-exterior-18.jpg', w:1200, h:800,
    altES:'Tucán en ambiente exterior tropical del criadero Paraíso de Aves', altFR:'Toucan dans un environnement extérieur tropical de l\'élevage',
    capES:'Espacios exteriores naturalizados — hábitat ideal', capFR:'Espaces extérieurs naturalisés — habitat idéal' },
  { cat:'tucanes', src:'/images/gallery/aves-disponibles-tucan-retrato-primer-plano-20.jpg', w:1200, h:800,
    altES:'Retrato de primer plano de tucán en el criadero Paraíso de Aves', altFR:'Portrait en gros plan d\'un toucan dans l\'élevage Paraíso de Aves',
    capES:'Retrato del tucán — perfección natural de pico y plumaje', capFR:'Portrait du toucan — perfection naturelle du bec et du plumage' },
  { cat:'tucanes', src:'/images/homepage/toucan-portrait-closeup.jpg', w:800, h:533,
    altES:'Retrato de tucán de cerca en el criadero', altFR:'Portrait de toucan de près dans l\'élevage',
    capES:'Retrato del tucán de cerca', capFR:'Portrait du toucan de près' },
  { cat:'tucanes', src:'/images/homepage/toucan-tropical-exterior.jpg', w:800, h:533,
    altES:'Tucán en espacio exterior tropical del criadero', altFR:'Toucan dans un espace extérieur tropical de l\'élevage',
    capES:'Tucán en exterior tropical', capFR:'Toucan en extérieur tropical' },

  // ── AVES DISPONIBLES ─────────────────────────────────────────────────────
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-loro-gris-africano-volando-12.jpg', w:1200, h:800, featured:true,
    altES:'Loro gris africano Yaco en vuelo libre dentro del criadero', altFR:'Gris du Gabon Yaco en vol libre dans l\'élevage',
    capES:'Vuelo libre diario — fundamental para la salud del Yaco', capFR:'Vol libre quotidien — fondamental pour la santé du Gris du Gabon' },
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-loro-senegal-verde-02.jpg', w:1200, h:800,
    altES:'Loro del Senegal verde disponible — tamaño compacto personalidad gigante', altFR:'Perroquet du Sénégal vert disponible — taille compacte personnalité géante',
    capES:'Loro del Senegal — tamaño compacto, personalidad gigante', capFR:'Perroquet du Sénégal — taille compacte, personnalité géante' },
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-cacatua-pichon-bebe-04.jpg', w:1200, h:800,
    altES:'Pichón bebé de cacatúa en el criadero Paraíso de Aves reservas disponibles', altFR:'Oisillon bébé de cacatoès dans l\'élevage Paraíso de Aves réservations disponibles',
    capES:'Pichones de cacatúa — reservas disponibles', capFR:'Oisillons de cacatoès — réservations disponibles' },
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-cacatua-galah-rosa-07.jpg', w:1200, h:800,
    altES:'Cacatúa galah rosada disponible en Paraíso de Aves', altFR:'Cacatoès rosalbin rose disponible chez Paraíso de Aves',
    capES:'Cacatúa galah — la joya rosada de los loros', capFR:'Cacatoès rosalbin — le joyau rose des perroquets' },
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-cacatua-galah-dormida-10.jpg', w:1200, h:800,
    altES:'Cacatúa galah descansando plácidamente indicador de bienestar', altFR:'Cacatoès rosalbin se reposant paisiblement indicateur de bien-être',
    capES:'Rutinas de descanso — indicador clave de bienestar animal', capFR:'Routines de repos — indicateur clé du bien-être animal' },
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-cacatua-galah-bano-alas-13.jpg', w:1200, h:800,
    altES:'Cacatúa galah abriendo las alas durante el baño comportamiento natural', altFR:'Cacatoès rosalbin ouvrant les ailes pendant le bain comportement naturel',
    capES:'Baño con alas abiertas — comportamiento natural de bienestar', capFR:'Bain avec ailes ouvertes — comportement naturel de bien-être' },
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-loro-gris-cacatua-pareja-16.jpg', w:1200, h:800,
    altES:'Loro gris africano y cacatúa juntos en el criadero ambiente social', altFR:'Gris du Gabon et cacatoès ensemble dans l\'élevage ambiance sociale',
    capES:'Convivencia entre especies — ambiente social enriquecedor', capFR:'Cohabitation entre espèces — ambiance sociale enrichissante' },
  { cat:'aves-disponibles', src:'/images/gallery/aves-disponibles-ave-blanca-percha-19.jpg', w:1200, h:800,
    altES:'Ave blanca en percha disponible en el criadero Paraíso de Aves', altFR:'Oiseau blanc sur perchoir disponible dans l\'élevage Paraíso de Aves',
    capES:'Aves blancas — elegancia y carácter único', capFR:'Oiseaux blancs — élégance et caractère unique' },
  { cat:'aves-disponibles', src:'/images/homepage/african-grey-parrot-flying.jpg', w:800, h:533,
    altES:'Loro gris africano Yaco en vuelo libre en el criadero', altFR:'Gris du Gabon Yaco en vol libre dans l\'élevage',
    capES:'Loro gris en vuelo libre — salud y bienestar', capFR:'Gris du Gabon en vol libre — santé et bien-être' },
  { cat:'aves-disponibles', src:'/images/homepage/cockatoo-galah-pink.jpg', w:800, h:533,
    altES:'Cacatúa galah rosada en el criadero disponible para adopción', altFR:'Cacatoès rosalbin rose dans l\'élevage disponible pour adoption',
    capES:'Cacatúa galah rosada — disponible para adopción', capFR:'Cacatoès rosalbin rose — disponible pour adoption' },
  { cat:'aves-disponibles', src:'/images/homepage/sociable-amazon-parrot.jpg', w:800, h:533,
    altES:'Amazona sociable y confiada disponible en Paraíso de Aves', altFR:'Amazone sociable et confiante disponible chez Paraíso de Aves',
    capES:'Amazona sociable — temperamento equilibrado', capFR:'Amazone sociable — tempérament équilibré' },
  { cat:'aves-disponibles', src:'/images/homepage/african-grey-parrot-home-socialised.jpg', w:800, h:600,
    altES:'Loro gris africano Yaco socializado en entorno doméstico familiar', altFR:'Gris du Gabon Yaco socialisé dans un environnement domestique familial',
    capES:'Yaco integrado en vida doméstica — se adapta fácilmente', capFR:'Gris du Gabon intégré dans la vie domestique — s\'adapte facilement' },

  // ── CRIANZA Y SOCIALIZACIÓN ──────────────────────────────────────────────
  { cat:'crianza-socializacion', src:'/images/homepage/galah-cockatoo-hand-tamed-wings.jpg', w:800, h:532, featured:true,
    altES:'Cacatúa Galah rosa en mano humana con alas extendidas criada a mano', altFR:'Cacatoès rosalbin rose sur main humaine avec ailes déployées élevé à la main',
    capES:'Cacatúa Galah criada a mano — alas extendidas en plena confianza', capFR:'Cacatoès rosalbin élevé à la main — ailes déployées en pleine confiance' },
  { cat:'crianza-socializacion', src:'/images/homepage/hand-feeding-amazon-parrot.jpg', w:800, h:533,
    altES:'Alimentación manual con papilla a cría de amazona crianza a mano', altFR:'Alimentation manuelle à la becquée d\'un oisillon d\'amazone élevage à la main',
    capES:'Alimentación manual con papilla — vínculo desde el primer día', capFR:'Alimentation à la becquée — lien dès le premier jour' },
  { cat:'crianza-socializacion', src:'/images/homepage/parrots-socialised-with-human.jpg', w:800, h:533,
    altES:'Loros socializados con humanos desde bebés en el criadero', altFR:'Perroquets socialisés avec des humains dès bébés dans l\'élevage',
    capES:'Socialización desde bebés — máxima confianza en el humano', capFR:'Socialisation dès bébés — confiance maximale en l\'humain' },
  { cat:'crianza-socializacion', src:'/images/gallery/nosotros-amazona-crianza-mano-09.jpg', w:1200, h:800,
    altES:'Crianza a mano de amazona con biberón en Paraíso de Aves', altFR:'Élevage à la main d\'une amazone au biberon chez Paraíso de Aves',
    capES:'Crianza con biberón desde los 15 días de vida', capFR:'Élevage au biberon dès 15 jours de vie' },
  { cat:'crianza-socializacion', src:'/images/gallery/nosotros-cuidador-guacamayo-socializacion-04.jpg', w:1200, h:800,
    altES:'Cuidador socializando guacamayo en el criadero Paraíso de Aves', altFR:'Soigneur socialisant un ara dans l\'élevage Paraíso de Aves',
    capES:'Socialización diaria con los cuidadores del criadero', capFR:'Socialisation quotidienne avec les soigneurs de l\'élevage' },
  { cat:'crianza-socializacion', src:'/images/gallery/aves-disponibles-loros-socializados-humano-15.jpg', w:1200, h:800,
    altES:'Loros socializados con humanos desde la primera semana de vida', altFR:'Perroquets socialisés avec des humains dès la première semaine de vie',
    capES:'Socialización humana desde la primera semana de vida', capFR:'Socialisation humaine dès la première semaine de vie' },
  { cat:'crianza-socializacion', src:'/images/homepage/macaw-pair-indoor-socialised.jpg', w:640, h:480,
    altES:'Pareja de guacamayos socializados en interior del criadero', altFR:'Couple d\'aras socialisés à l\'intérieur de l\'élevage',
    capES:'Guacamayos socializados — conviven con los cuidadores', capFR:'Aras socialisés — cohabitent avec les soigneurs' },

  // ── TRANSPORTE ───────────────────────────────────────────────────────────
  { cat:'transporte', src:'/images/gallery/transportin-loro-caja-viaje-01.webp', w:1200, h:800, featured:true,
    altES:'Transportín IATA homologado para loros — seguridad en el viaje', altFR:'Caisse de transport IATA homologuée pour perroquets — sécurité en voyage',
    capES:'Transportines IATA homologados — seguridad y confort', capFR:'Caisses de transport IATA homologuées — sécurité et confort' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HTML COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const SHARED_CSS = `
:root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.12);}
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.7;}
h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
img{max-width:100%;height:auto;display:block;}picture{display:block;}
.topbar{background:var(--primary);position:sticky;top:0;z-index:100;padding:0 5%;}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto;}
.logo{color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;}
.logo span{font-size:1.3rem;}
.topnav a{color:rgba(255,255,255,.85);margin-left:18px;font-size:.88rem;font-weight:500;transition:color .2s;}
.topnav a:hover,.topnav a.active{color:var(--gold);}
.lang-sw{display:flex;align-items:center;gap:5px;margin-left:18px;}
.lang-sw a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.6);padding:3px 7px;border-radius:4px;}
.lang-sw a.active{color:var(--gold);background:rgba(212,169,79,.15);}
.lang-sw span{color:rgba(255,255,255,.25);font-size:.7rem;}
.breadcrumb{background:var(--secondary);padding:9px 5%;}
.breadcrumb-inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.65);}
.breadcrumb-inner a{color:rgba(255,255,255,.75);}
.breadcrumb-inner a:hover{color:var(--gold);}
.breadcrumb-inner span{margin:0 5px;opacity:.4;}
.page-hero{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);padding:52px 5% 48px;text-align:center;color:#fff;}
.page-hero .badge{display:inline-block;background:rgba(212,169,79,.18);border:1px solid var(--gold);color:var(--gold);padding:5px 18px;border-radius:20px;font-size:.75rem;font-weight:700;letter-spacing:1px;margin-bottom:14px;}
.page-hero h1{font-size:clamp(1.8rem,5vw,2.8rem);margin-bottom:10px;color:#fff;}
.page-hero .sub{font-size:1rem;color:rgba(255,255,255,.82);max-width:640px;margin:0 auto 18px;}
.trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:10px;}
.trust-pills span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;padding:5px 14px;border-radius:16px;font-size:.8rem;font-weight:600;}
/* Category nav bar */
.cat-nav{background:var(--white);border-bottom:1px solid var(--border);padding:0 5%;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;}
.cat-nav-inner{max-width:1200px;margin:0 auto;display:flex;gap:4px;padding:10px 0;}
.cat-nav a{display:inline-block;padding:7px 16px;border-radius:20px;font-size:.82rem;font-weight:600;color:var(--muted);border:1.5px solid transparent;transition:all .2s;white-space:nowrap;}
.cat-nav a:hover{color:var(--primary);border-color:var(--border);}
.cat-nav a.active{background:var(--primary);color:#fff;border-color:var(--primary);}
.cat-nav .back-link{font-size:.78rem;color:var(--gold);margin-right:12px;border-right:1px solid var(--border);padding-right:14px;}
/* Main wrap */
.main-wrap{max-width:1200px;margin:0 auto;padding:52px 5%;}
.section-intro{max-width:800px;margin:0 auto 36px;text-align:center;}
.section-intro p{font-size:1rem;color:var(--muted);line-height:1.8;}
.section-trust{background:rgba(31,61,43,.06);border-left:4px solid var(--gold);padding:14px 20px;border-radius:0 8px 8px 0;margin-bottom:36px;font-size:.93rem;color:var(--secondary);}
/* Masonry gallery */
.masonry{column-count:3;column-gap:14px;}
@media(max-width:900px){.masonry{column-count:2;}}
@media(max-width:480px){.masonry{column-count:1;}}
.gallery-item{break-inside:avoid;margin-bottom:14px;position:relative;overflow:hidden;border-radius:10px;cursor:zoom-in;background:var(--border);}
.gallery-item img,.gallery-item picture{width:100%;height:auto;display:block;transition:transform .4s;}
.gallery-item:hover img{transform:scale(1.04);}
.gallery-item .overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 55%);opacity:0;transition:opacity .3s;border-radius:10px;display:flex;align-items:flex-end;padding:12px;}
.gallery-item:hover .overlay{opacity:1;}
.gallery-item .caption{color:#fff;font-size:.8rem;font-weight:600;line-height:1.3;}
/* Load more */
.load-more-wrap{text-align:center;margin:32px 0 0;}
.btn-more{background:var(--white);border:2px solid var(--primary);color:var(--primary);padding:12px 32px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.9rem;cursor:pointer;transition:all .2s;}
.btn-more:hover{background:var(--primary);color:#fff;}
/* Category cards (landing page) */
.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px;margin-top:40px;}
.cat-card{background:var(--white);border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);transition:transform .2s,box-shadow .2s;}
.cat-card:hover{transform:translateY(-4px);box-shadow:0 8px 28px rgba(0,0,0,.14);}
.cat-card-img{position:relative;height:200px;overflow:hidden;background:var(--primary);}
.cat-card-img img,.cat-card-img picture{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.cat-card:hover .cat-card-img img{transform:scale(1.05);}
.cat-card-img .count-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.6);color:#fff;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:8px;}
.cat-card-body{padding:18px 20px 20px;}
.cat-card-body h3{font-size:1.1rem;color:var(--primary);margin-bottom:8px;}
.cat-card-body p{font-size:.86rem;color:var(--muted);line-height:1.65;margin-bottom:14px;}
.cat-card-body .cta{display:inline-flex;align-items:center;gap:6px;background:var(--primary);color:#fff;padding:8px 18px;border-radius:20px;font-size:.82rem;font-weight:700;transition:background .2s;}
.cat-card-body .cta:hover{background:var(--secondary);}
/* Related categories */
.related-cats{background:var(--white);border-radius:12px;padding:28px;margin-top:48px;border:1px solid var(--border);}
.related-cats h3{font-size:1rem;color:var(--primary);margin-bottom:16px;font-family:'Poppins',sans-serif;}
.related-cats-grid{display:flex;flex-wrap:wrap;gap:10px;}
.related-cats-grid a{display:inline-block;background:var(--bg);border:1.5px solid var(--border);color:var(--secondary);padding:7px 16px;border-radius:20px;font-size:.84rem;font-weight:600;transition:all .2s;}
.related-cats-grid a:hover{background:var(--primary);color:#fff;border-color:var(--primary);}
/* CTA section */
.cta-section{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:52px 5%;text-align:center;color:#fff;margin-top:52px;}
.cta-section h2{font-size:1.8rem;margin-bottom:10px;color:#fff;}
.cta-section p{color:rgba(255,255,255,.85);margin-bottom:24px;}
.btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:13px 32px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.95rem;transition:all .2s;}
.btn-gold:hover{background:var(--gold-light);transform:translateY(-2px);}
.btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.4);color:#fff;padding:11px 26px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.9rem;margin-left:10px;transition:all .2s;}
.btn-outline:hover{border-color:#fff;background:rgba(255,255,255,.1);}
footer{background:var(--primary);color:rgba(255,255,255,.6);padding:40px 5% 24px;}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;margin-bottom:28px;}
.footer-col h4{color:#fff;font-size:.92rem;margin-bottom:12px;font-family:'Poppins',sans-serif;}
.footer-col ul{list-style:none;}
.footer-col ul li{margin-bottom:6px;}
.footer-col ul li a{font-size:.83rem;color:rgba(255,255,255,.6);transition:color .2s;}
.footer-col ul li a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:18px;text-align:center;font-size:.78rem;color:rgba(255,255,255,.38);}
/* Lightbox */
.lb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:9999;display:none;align-items:center;justify-content:center;flex-direction:column;}
.lb-overlay.open{display:flex;}
.lb-img{max-width:90vw;max-height:82vh;object-fit:contain;border-radius:6px;box-shadow:0 20px 60px rgba(0,0,0,.6);}
.lb-cap{color:rgba(255,255,255,.82);font-size:.88rem;text-align:center;margin-top:14px;max-width:580px;padding:0 20px;}
.lb-close{position:fixed;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;z-index:10000;opacity:.8;line-height:1;}
.lb-close:hover{opacity:1;}
.lb-nav{position:fixed;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;width:46px;height:46px;border-radius:50%;font-size:1.3rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;z-index:10000;}
.lb-nav:hover{background:rgba(255,255,255,.2);}
.lb-prev{left:14px;}.lb-next{right:14px;}
.lb-counter{position:fixed;top:20px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.55);font-size:.8rem;z-index:10000;}
@media(max-width:700px){.cat-grid{grid-template-columns:1fr 1fr;}.topnav{display:none;}}
@media(max-width:440px){.cat-grid{grid-template-columns:1fr;}}
`;

const LB_HTML = `
<div class="lb-overlay" id="lb" role="dialog" aria-modal="true" aria-label="Lightbox">
  <button class="lb-close" id="lb-close" aria-label="Cerrar">✕</button>
  <span class="lb-counter" id="lb-counter"></span>
  <img class="lb-img" id="lb-img" src="" alt="">
  <div class="lb-cap" id="lb-cap"></div>
  <button class="lb-nav lb-prev" id="lb-prev" aria-label="Anterior">‹</button>
  <button class="lb-nav lb-next" id="lb-next" aria-label="Siguiente">›</button>
</div>`;

const LB_JS = `
<script>
(function(){
  var lb=document.getElementById('lb'),img=document.getElementById('lb-img'),cap=document.getElementById('lb-cap'),ctr=document.getElementById('lb-counter');
  var items=[],cur=0;
  document.querySelectorAll('.gallery-item').forEach(function(el,i){
    var im=el.querySelector('img');
    items.push({src:im?im.dataset.src||im.src:'',cap:el.dataset.cap||''});
    el.addEventListener('click',function(){open(i);});
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open(i);});
  });
  function open(i){cur=i;show();}
  function show(){img.src=items[cur].src;cap.textContent=items[cur].cap;ctr.textContent=(cur+1)+' / '+items.length;lb.classList.add('open');document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('open');document.body.style.overflow='';}
  function nav(d){cur=(cur+d+items.length)%items.length;show();}
  document.getElementById('lb-close').addEventListener('click',close);
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.getElementById('lb-prev').addEventListener('click',function(e){e.stopPropagation();nav(-1);});
  document.getElementById('lb-next').addEventListener('click',function(e){e.stopPropagation();nav(1);});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')nav(-1);if(e.key==='ArrowRight')nav(1);});
  var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)nav(dx<0?1:-1);},{passive:true});
  // Lazy load
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(ents){ents.forEach(function(e){if(e.isIntersecting){var i=e.target;if(i.dataset.src){i.src=i.dataset.src;delete i.dataset.src;io.unobserve(i);}}});},{rootMargin:'200px'});
    document.querySelectorAll('img[data-src]').forEach(function(i){io.observe(i);});
  }
  // Load more
  var btnMore=document.getElementById('btn-more');
  if(btnMore){
    var hidden=document.querySelectorAll('.gallery-item.initially-hidden');
    btnMore.addEventListener('click',function(){hidden.forEach(function(el){el.classList.remove('initially-hidden');});btnMore.parentElement.style.display='none';if('IntersectionObserver' in window){document.querySelectorAll('img[data-src]').forEach(function(i){io.observe(i);});}});
  }
})();
</script>`;

function topbar(lang, activeHref) {
  const nav = lang === 'es' ? [
    ['https://www.paraisodeaves.com/aves-disponibles/','Disponibles'],
    ['https://www.paraisodeaves.com/especies/','Especies'],
    ['https://www.paraisodeaves.com/comida-para-loros/','Comida'],
    ['https://www.paraisodeaves.com/galeria/','Galería'],
    ['https://www.paraisodeaves.com/blog/','Blog'],
    ['https://www.paraisodeaves.com/contacto/','Contacto'],
  ] : [
    ['https://www.paraisodeaves.com/fr/oiseaux-disponibles/','Disponibles'],
    ['https://www.paraisodeaves.com/fr/especes/','Espèces'],
    ['https://www.paraisodeaves.com/fr/nourriture-pour-perroquets/','Alimentation'],
    ['https://www.paraisodeaves.com/fr/galerie/','Galerie'],
    ['https://www.paraisodeaves.com/fr/blog/','Blog'],
    ['https://www.paraisodeaves.com/fr/contact/','Contact'],
  ];
  const links = nav.map(([href,label]) =>
    `<a href="${href}"${href.startsWith(activeHref)?'':''} class="${activeHref && href.includes(activeHref.split('/').pop()) ? 'active' : ''}">${label}</a>`
  ).join('');
  const esHref = activeHref.replace('/fr/galerie','/galeria').replace('/fr/galerie/','/galeria/');
  const frHref = activeHref.replace('/galeria','/fr/galerie').replace('/galeria/','/fr/galerie/');
  return `
<nav class="topbar">
  <div class="topbar-inner">
    <a href="${BASE}/" class="logo"><span>🦜</span> Paraíso de Aves</a>
    <div class="topnav">${links}</div>
    <div class="lang-sw">
      <a href="${esHref}"${lang==='es'?' class="active"':''}>ES</a>
      <span>|</span>
      <a href="${frHref}"${lang==='fr'?' class="active"':''}>FR</a>
    </div>
  </div>
</nav>`;
}

function footer(lang) {
  const cols = lang === 'es' ? `
    <div class="footer-col"><h4>Nuestras Aves</h4><ul>
      <li><a href="${BASE}/guacamayos.html">Guacamayos</a></li>
      <li><a href="${BASE}/tucanes/">Tucanes</a></li>
      <li><a href="${BASE}/aves-disponibles/">Ver disponibles</a></li>
    </ul></div>
    <div class="footer-col"><h4>Galería</h4><ul>
      <li><a href="${BASE}/galeria/instalaciones/">Instalaciones</a></li>
      <li><a href="${BASE}/galeria/alimentacion/">Alimentación</a></li>
      <li><a href="${BASE}/galeria/guacamayos/">Guacamayos</a></li>
      <li><a href="${BASE}/galeria/tucanes/">Tucanes</a></li>
    </ul></div>
    <div class="footer-col"><h4>Información</h4><ul>
      <li><a href="${BASE}/comida-para-loros/">Comida para Loros</a></li>
      <li><a href="${BASE}/adopcion-de-loros">Adopción</a></li>
      <li><a href="${BASE}/blog/">Blog</a></li>
      <li><a href="${BASE}/contacto/">Contacto</a></li>
    </ul></div>` : `
    <div class="footer-col"><h4>Nos Oiseaux</h4><ul>
      <li><a href="${BASE}/fr/aras/">Aras</a></li>
      <li><a href="${BASE}/fr/toucans/">Toucans</a></li>
      <li><a href="${BASE}/fr/oiseaux-disponibles/">Voir disponibles</a></li>
    </ul></div>
    <div class="footer-col"><h4>Galerie</h4><ul>
      <li><a href="${BASE}/fr/galerie/installations/">Installations</a></li>
      <li><a href="${BASE}/fr/galerie/alimentation/">Alimentation</a></li>
      <li><a href="${BASE}/fr/galerie/aras/">Aras</a></li>
      <li><a href="${BASE}/fr/galerie/toucans/">Toucans</a></li>
    </ul></div>
    <div class="footer-col"><h4>Informations</h4><ul>
      <li><a href="${BASE}/fr/nourriture-pour-perroquets/">Nourriture</a></li>
      <li><a href="${BASE}/fr/adoption-perroquet/">Adoption</a></li>
      <li><a href="${BASE}/fr/blog/">Blog</a></li>
      <li><a href="${BASE}/fr/contact/">Contact</a></li>
    </ul></div>`;
  const copy = lang === 'es'
    ? '&copy; 2026 Paraíso de Aves &mdash; Todos los derechos reservados'
    : '&copy; 2026 Paraíso de Aves &mdash; Tous droits réservés';
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-col">
      <h4 style="font-size:1.05rem">🦜 Paraíso de Aves</h4>
      <p style="font-size:.83rem;line-height:1.7;max-width:230px;margin-bottom:8px">${lang==='es'?'Criadero especializado en loros y aves exóticas. Llíria, Valencia.':'Élevage spécialisé en perroquets et oiseaux exotiques. Llíria, Valencia.'}</p>
      <p style="font-size:.83rem">📧 <a href="mailto:paraisodeloros@gmail.com" style="color:var(--gold-light)">paraisodeloros@gmail.com</a></p>
    </div>
    ${cols}
  </div>
  <div class="footer-bottom"><span>${copy}</span></div>
</footer>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY NAV BAR
// ─────────────────────────────────────────────────────────────────────────────
function catNavBar(lang, activeKey) {
  const galleryHref = lang === 'es' ? `${BASE}/galeria/` : `${BASE}/fr/galerie/`;
  const backLabel   = lang === 'es' ? '← Galería' : '← Galerie';
  const links = CATS.map(c => {
    const slug = lang === 'es' ? c.slugES : c.slugFR;
    const base = lang === 'es' ? `${BASE}/galeria/` : `${BASE}/fr/galerie/`;
    const title = lang === 'es' ? c.titleES.split(' ')[0] : c.titleFR.split(' ')[0];
    return `<a href="${base}${slug}/"${c.key === activeKey ? ' class="active"' : ''}>${title}</a>`;
  }).join('');
  return `
<div class="cat-nav">
  <div class="cat-nav-inner">
    <a href="${galleryHref}" class="back-link">${backLabel}</a>
    ${links}
  </div>
</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// BUILD GALLERY ITEMS HTML
// ─────────────────────────────────────────────────────────────────────────────
function galleryItems(imgs, lang, initialShow = 15) {
  return imgs.map((img, i) => {
    const alt = lang === 'es' ? img.altES : img.altFR;
    const cap = lang === 'es' ? img.capES : img.capFR;
    const isHidden = i >= initialShow ? ' initially-hidden' : '';
    // For lazy loading: first 6 load eagerly, rest use data-src
    const tag = img.src.endsWith('.webp') ? (
      `<img src="${i < 6 ? img.src : ''}" ${i >= 6 ? `data-src="${img.src}"` : ''} alt="${alt}" width="${img.w}" height="${img.h}" ${i < 6 ? '' : 'loading="lazy" decoding="async"'}>`
    ) : hasWebP(img.src) ? (
      `<picture>`
      + `<source srcset="${img.src.replace('.jpg','.avif')}" type="image/avif">`
      + `<source srcset="${img.src.replace('.jpg','.webp')}" type="image/webp">`
      + `<img src="${i < 6 ? img.src : ''}" ${i >= 6 ? `data-src="${img.src}"` : ''} alt="${alt}" width="${img.w}" height="${img.h}" ${i < 6 ? '' : 'loading="lazy" decoding="async"'}>`
      + `</picture>`
    ) : (
      `<img src="${i < 6 ? img.src : ''}" ${i >= 6 ? `data-src="${img.src}"` : ''} alt="${alt}" width="${img.w}" height="${img.h}" ${i < 6 ? '' : 'loading="lazy" decoding="async"'}>`
    );
    return `<div class="gallery-item${isHidden}" data-cap="${cap}" tabindex="0" role="button" aria-label="${alt}"
  itemscope itemtype="https://schema.org/ImageObject">
  ${tag}
  <div class="overlay"><div class="caption">${cap}</div></div>
  <meta itemprop="contentUrl" content="${BASE}${img.src}">
  <meta itemprop="description" content="${alt}">
</div>`;
  }).join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATE LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
function buildLandingPage(lang) {
  const isES   = lang === 'es';
  const canon  = isES ? `${BASE}/galeria/` : `${BASE}/fr/galerie/`;
  const altUrl = isES ? `${BASE}/fr/galerie/` : `${BASE}/galeria/`;
  const title  = isES ? 'Galería de Fotos por Categoría | Paraíso de Aves' : 'Galerie Photos par Catégorie | Paraíso de Aves';
  const desc   = isES ? 'Galería organizada por categorías: instalaciones, guacamayos, conuros, tucanes, alimentación y crianza. Fotos reales del criadero Paraíso de Aves en Llíria, Valencia.'
                      : 'Galerie organisée par catégories: installations, aras, conures, toucans, alimentation et élevage. Photos réelles de l\'élevage Paraíso de Aves à Llíria, Valencia.';
  const h1     = isES ? 'Galería de Fotos' : 'Galerie Photos';
  const sub    = isES ? 'Explora nuestras instalaciones, aves y vida diaria organizadas por categoría'
                      : 'Explorez nos installations, oiseaux et vie quotidienne organisés par catégorie';
  const badge  = isES ? '📸 GALERÍA OFICIAL' : '📸 GALERIE OFFICIELLE';
  const catH2  = isES ? 'Explorar por Categoría' : 'Explorer par Catégorie';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type':'WebPage', url: canon, name: title, description: desc, inLanguage: isES ? 'es-ES' : 'fr-FR' },
      { '@type':'BreadcrumbList', itemListElement: [
          { '@type':'ListItem', position:1, name:'Inicio', item: BASE+'/' },
          { '@type':'ListItem', position:2, name: isES ? 'Galería' : 'Galerie', item: canon },
        ]},
      { '@type':'CollectionPage', name: title, url: canon,
        hasPart: CATS.map(c => ({
          '@type': 'CollectionPage',
          name: isES ? c.titleES : c.titleFR,
          url: isES ? `${BASE}/galeria/${c.slugES}/` : `${BASE}/fr/galerie/${c.slugFR}/`,
        }))
      }
    ]
  };

  // Build cards
  const cards = CATS.map(c => {
    const slug    = isES ? c.slugES : c.slugFR;
    const title_  = isES ? c.titleES : c.titleFR;
    const desc_   = isES ? c.descES : c.descFR;
    const cta     = isES ? 'Ver fotos' : 'Voir les photos';
    const catImgs = IMAGES.filter(i => i.cat === c.key);
    const feat    = catImgs.find(i => i.featured) || catImgs[0];
    const count   = catImgs.length;
    const href    = isES ? `${BASE}/galeria/${slug}/` : `${BASE}/fr/galerie/${slug}/`;
    const altTxt  = isES ? feat.altES : feat.altFR;
    const sm      = feat.src.endsWith('.webp') ? feat.src
                  : hasWebP(feat.src) ? feat.src.replace('.jpg','.webp') : feat.src;
    return `
<article class="cat-card" itemscope itemtype="https://schema.org/CollectionPage">
  <a href="${href}" aria-label="${title_}">
    <div class="cat-card-img">
      ${imgTag(feat.src, altTxt, feat.w, feat.h, false)}
      <span class="count-badge">📷 ${count} ${isES ? 'fotos' : 'photos'}</span>
    </div>
  </a>
  <div class="cat-card-body">
    <h3><a href="${href}" itemprop="url name">${title_}</a></h3>
    <p>${desc_}</p>
    <a href="${href}" class="cta">${cta} →</a>
  </div>
</article>`;
  }).join('');

  const activeHref = isES ? '/galeria/' : '/fr/galerie/';
  return `<!DOCTYPE html>
<html lang="${isES?'es-ES':'fr-FR'}" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${canon}"/>
  <link rel="alternate" hreflang="${isES?'es-ES':'fr-FR'}" href="${canon}"/>
  <link rel="alternate" hreflang="${isES?'fr-FR':'es-ES'}" href="${altUrl}"/>
  <link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="${isES?'es_ES':'fr_FR'}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="${canon}"/>
  <meta property="og:image" content="${BASE}/images/gallery/nosotros-guacamayo-verde-volador-01.jpg"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>${SHARED_CSS}</style>
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
${topbar(lang, activeHref)}
<div class="breadcrumb">
  <div class="breadcrumb-inner">
    <a href="${BASE}/">${isES?'Inicio':'Accueil'}</a>
    <span>›</span>
    <strong style="color:var(--gold)">${isES?'Galería de Fotos':'Galerie Photos'}</strong>
  </div>
</div>
<section class="page-hero">
  <div class="badge">${badge}</div>
  <h1>${h1}</h1>
  <p class="sub">${sub}</p>
  <div class="trust-pills">
    <span>${isES?'📸 Fotos reales':'📸 Photos réelles'}</span>
    <span>${isES?'🏡 Sin filtros':'🏡 Sans filtres'}</span>
    <span>${isES?'🦜 9 categorías':'🦜 9 catégories'}</span>
    <span>${isES?'✅ Actualizadas 2026':'✅ Mises à jour 2026'}</span>
  </div>
</section>
<div class="main-wrap">
  <div class="section-intro">
    <h2 style="color:var(--primary);font-size:1.6rem;margin-bottom:10px">${catH2}</h2>
    <p>${isES
      ? 'Hemos organizado todas las fotografías del criadero en 9 categorías temáticas para que puedas encontrar exactamente lo que buscas: instalaciones, especies, alimentación, crianza y más.'
      : 'Nous avons organisé toutes les photographies de l\'élevage en 9 catégories thématiques pour que vous puissiez trouver exactement ce que vous cherchez: installations, espèces, alimentation, élevage et plus.'
    }</p>
  </div>
  <div class="cat-grid">
    ${cards}
  </div>
</div>
${footer(lang)}
<script src="/lang-switcher.js" defer></script>
</body></html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATE CATEGORY PAGE
// ─────────────────────────────────────────────────────────────────────────────
function buildCategoryPage(catKey, lang) {
  const c    = CAT_MAP[catKey];
  const isES = lang === 'es';
  const slug = isES ? c.slugES : c.slugFR;
  const galleryBase = isES ? `${BASE}/galeria/` : `${BASE}/fr/galerie/`;
  const canon  = `${galleryBase}${slug}/`;
  const altSlug = isES ? c.slugFR : c.slugES;
  const altBase = isES ? `${BASE}/fr/galerie/` : `${BASE}/galeria/`;
  const altUrl = `${altBase}${altSlug}/`;

  const titleStr = isES ? c.seoTitleES : c.seoTitleFR;
  const metaDesc = isES ? c.seoMetaES : c.seoMetaFR;
  const h1       = isES ? c.titleES : c.titleFR;
  const intro    = isES ? c.introES : c.introFR;
  const imgs     = IMAGES.filter(i => i.cat === catKey);
  const feat     = imgs.find(i => i.featured) || imgs[0];
  const featAlt  = isES ? feat.altES : feat.altFR;
  const related  = isES ? c.relatedES : c.relatedFR;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type':'CollectionPage', url: canon, name: titleStr, description: metaDesc, inLanguage: isES?'es-ES':'fr-FR',
        image: { '@type':'ImageObject', url: `${BASE}${feat.src}`, name: featAlt } },
      { '@type':'BreadcrumbList', itemListElement: [
          { '@type':'ListItem', position:1, name:'Inicio', item:`${BASE}/` },
          { '@type':'ListItem', position:2, name: isES?'Galería':'Galerie', item: galleryBase },
          { '@type':'ListItem', position:3, name: h1, item: canon },
        ]},
      { '@type':'ImageGallery', name: h1, url: canon,
        image: imgs.slice(0,15).map(i => ({
          '@type':'ImageObject',
          url: `${BASE}${i.src}`,
          name: isES ? i.capES : i.capFR,
          description: isES ? i.altES : i.altFR,
        }))
      }
    ]
  };

  const relatedCards = related.map(rKey => {
    const rc = CATS.find(x => x.key === rKey || x.slugES === rKey || x.slugFR === rKey);
    if (!rc) return '';
    const rSlug  = isES ? rc.slugES : rc.slugFR;
    const rTitle = isES ? rc.titleES : rc.titleFR;
    const rHref  = `${galleryBase}${rSlug}/`;
    const rImgs  = IMAGES.filter(i => i.cat === rc.key);
    const rFeat  = rImgs.find(i => i.featured) || rImgs[0];
    return `<a href="${rHref}">${rTitle}</a>`;
  }).filter(Boolean).join('\n');

  const showMore = imgs.length > 15;

  const activeHref = isES ? '/galeria/' : '/fr/galerie/';
  return `<!DOCTYPE html>
<html lang="${isES?'es-ES':'fr-FR'}" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>
  <title>${titleStr}</title>
  <meta name="description" content="${metaDesc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${canon}"/>
  <link rel="alternate" hreflang="${isES?'es-ES':'fr-FR'}" href="${canon}"/>
  <link rel="alternate" hreflang="${isES?'fr-FR':'es-ES'}" href="${altUrl}"/>
  <link rel="alternate" hreflang="x-default" href="${BASE}/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="${isES?'es_ES':'fr_FR'}"/>
  <meta property="og:title" content="${titleStr}"/>
  <meta property="og:description" content="${metaDesc}"/>
  <meta property="og:url" content="${canon}"/>
  <meta property="og:image" content="${BASE}${feat.src}"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>${SHARED_CSS}
  .initially-hidden{display:none!important;}
  </style>
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
${topbar(lang, activeHref)}
${catNavBar(lang, catKey)}
<div class="breadcrumb">
  <div class="breadcrumb-inner">
    <a href="${BASE}/">${isES?'Inicio':'Accueil'}</a>
    <span>›</span>
    <a href="${galleryBase}">${isES?'Galería':'Galerie'}</a>
    <span>›</span>
    <strong style="color:var(--gold)">${h1}</strong>
  </div>
</div>
<section class="page-hero">
  <div class="badge">📷 ${imgs.length} ${isES?'FOTOS':'PHOTOS'}</div>
  <h1>${h1}</h1>
  <p class="sub">${isES?'Paraíso de Aves — Llíria, Valencia':'Paraíso de Aves — Llíria, Valencia'}</p>
</section>
<div class="main-wrap">
  <div class="section-intro">
    <p>${intro}</p>
  </div>
  <div class="section-trust">
    ${isES
      ? '📸 <strong>Fotos reales del criadero.</strong> Sin imágenes de banco ni fotografías de terceros. Lo que ves es lo que tenemos.'
      : '📸 <strong>Photos réelles de l\'élevage.</strong> Pas d\'images de banque ni de photos de tiers. Ce que vous voyez est ce que nous avons.'
    }
  </div>
  <div class="masonry">
    ${galleryItems(imgs, lang, 15)}
  </div>
  ${showMore ? `<div class="load-more-wrap"><button class="btn-more" id="btn-more">${isES?`Ver las ${imgs.length-15} fotos restantes`:`Voir les ${imgs.length-15} photos restantes`}</button></div>` : ''}
  <div class="related-cats">
    <h3>${isES?'Otras categorías de la galería':'Autres catégories de la galerie'}</h3>
    <div class="related-cats-grid">${relatedCards}</div>
  </div>
</div>
<section class="cta-section">
  <h2>${isES?'¿Te interesa alguna de estas aves?':'Êtes-vous intéressé par l\'un de ces oiseaux?'}</h2>
  <p>${isES?'Consulta la disponibilidad actual y reserva tu cita en el criadero.':'Consultez la disponibilité actuelle et réservez votre visite à l\'élevage.'}</p>
  <a href="${c.linkES && isES ? c.linkES : c.linkFR}" class="btn-gold">${isES?c.linkLabelES:c.linkLabelFR}</a>
  <a href="${isES?`${BASE}/contacto/`:`${BASE}/fr/contact/`}" class="btn-outline">${isES?'Enviar mensaje':'Envoyer un message'}</a>
</section>
${LB_HTML}
${footer(lang)}
${LB_JS}
<script src="/lang-switcher.js" defer></script>
</body></html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE GALLERY PREVIEW (6 category cards)
// ─────────────────────────────────────────────────────────────────────────────
const HOMEPAGE_CATS_ES = ['instalaciones','guacamayos','tucanes','alimentacion','aves-disponibles','crianza-socializacion'];
const HOMEPAGE_CATS_FR = ['instalaciones','guacamayos','tucanes','alimentacion','aves-disponibles','crianza-socializacion'];

function buildHomepageGallerySection(lang) {
  const isES = lang === 'es';
  const cats = HOMEPAGE_CATS_ES; // same keys both directions
  const galleryBase = isES ? `${BASE}/galeria/` : `${BASE}/fr/galerie/`;

  const cards = cats.map(key => {
    const c      = CAT_MAP[key];
    const slug   = isES ? c.slugES : c.slugFR;
    const title_ = isES ? c.titleES : c.titleFR;
    const feat   = IMAGES.find(i => i.cat === key && i.featured) || IMAGES.find(i => i.cat === key);
    const alt_   = isES ? feat.altES : feat.altFR;
    const href   = `${galleryBase}${slug}/`;
    const count  = IMAGES.filter(i => i.cat === key).length;
    return `
  <article class="ph6d-card">
    <a href="${href}" class="ph6d-card-img">
      ${imgTag(feat.src, alt_, feat.w, feat.h, true)}
      <span class="ph6d-count">📷 ${count}</span>
    </a>
    <div class="ph6d-card-body">
      <h3><a href="${href}">${title_}</a></h3>
      <a href="${href}" class="ph6d-cta">${isES ? 'Ver fotos →' : 'Voir photos →'}</a>
    </div>
  </article>`;
  }).join('');

  return `
<!-- ░░ PHASE 6D — GALLERY PREVIEW ░░ -->
<section class="ph6d-gallery-preview" aria-label="${isES?'Galería por categoría':'Galerie par catégorie'}">
  <div class="ph6d-wrap">
    <style>
      .ph6d-gallery-preview{background:var(--bg,#F8F5F0);padding:64px 5%;}
      .ph6d-wrap{max-width:1200px;margin:0 auto;}
      .ph6d-sh{text-align:center;margin-bottom:36px;}
      .ph6d-sh .label{display:inline-block;background:rgba(31,61,43,.08);color:#1F3D2B;font-size:.72rem;font-weight:700;letter-spacing:.9px;text-transform:uppercase;padding:5px 16px;border-radius:14px;margin-bottom:10px;}
      .ph6d-sh h2{font-family:'Poppins',sans-serif;font-size:clamp(1.5rem,3.5vw,2rem);color:#1F3D2B;margin-bottom:8px;}
      .ph6d-sh p{font-size:.96rem;color:#5C5C5C;max-width:540px;margin:0 auto;}
      .ph6d-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
      @media(max-width:820px){.ph6d-grid{grid-template-columns:repeat(2,1fr);}}
      @media(max-width:480px){.ph6d-grid{grid-template-columns:1fr;}}
      .ph6d-card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.07);transition:transform .2s,box-shadow .2s;}
      .ph6d-card:hover{transform:translateY(-3px);box-shadow:0 6px 22px rgba(0,0,0,.13);}
      .ph6d-card-img{display:block;position:relative;height:165px;overflow:hidden;background:#1F3D2B;}
      .ph6d-card-img img,.ph6d-card-img picture{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
      .ph6d-card:hover .ph6d-card-img img{transform:scale(1.05);}
      .ph6d-count{position:absolute;top:8px;right:8px;background:rgba(0,0,0,.55);color:#fff;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:6px;}
      .ph6d-card-body{padding:12px 16px 14px;}
      .ph6d-card-body h3{font-family:'Poppins',sans-serif;font-size:.95rem;color:#1F3D2B;margin-bottom:6px;}
      .ph6d-card-body h3 a{color:#1F3D2B;}
      .ph6d-card-body h3 a:hover{color:#D4A94F;}
      .ph6d-cta{font-size:.8rem;font-weight:700;color:#D4A94F;}
      .ph6d-cta:hover{color:#1F3D2B;}
      .ph6d-all{text-align:center;margin-top:28px;}
      .ph6d-all a{display:inline-block;background:#1F3D2B;color:#fff;padding:11px 28px;border-radius:24px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.88rem;transition:background .2s;}
      .ph6d-all a:hover{background:#2B533C;}
    </style>
    <div class="ph6d-sh">
      <span class="label">📸 ${isES?'Galería Real':'Galerie Réelle'}</span>
      <h2>${isES?'Explora el Criadero por Categoría':'Explorez l\'Élevage par Catégorie'}</h2>
      <p>${isES?'Fotos reales sin filtros, organizadas por tema para que encuentres lo que más te interesa.':'Photos réelles sans filtres, organisées par thème pour que vous trouviez ce qui vous intéresse le plus.'}</p>
    </div>
    <div class="ph6d-grid">
      ${cards}
    </div>
    <div class="ph6d-all">
      <a href="${isES?`${BASE}/galeria/`:`${BASE}/fr/galerie/`}">${isES?'Ver todas las categorías →':'Voir toutes les catégories →'}</a>
    </div>
  </div>
</section>
<!-- ░░ /PHASE 6D — GALLERY PREVIEW ░░ -->
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP UPDATE
// ─────────────────────────────────────────────────────────────────────────────
function updateSitemap() {
  const today = '2026-07-12';

  // ES sitemap
  let esXml = fs.readFileSync('sitemap_main.xml', 'utf8');
  const esUrls = CATS.map(c =>
    `  <url><loc>${BASE}/galeria/${c.slugES}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.70</priority></url>`
  ).join('\n');
  esXml = esXml.replace(
    `  <url><loc>${BASE}/galeria/</loc>`,
    `${esUrls}\n  <url><loc>${BASE}/galeria/</loc>`
  );
  // Update galeria lastmod
  esXml = esXml.replace(
    /<url><loc>https:\/\/www\.paraisodeaves\.com\/galeria\/<\/loc><lastmod>[^<]+<\/lastmod>/,
    `<url><loc>${BASE}/galeria/</loc><lastmod>${today}</lastmod>`
  );
  fs.writeFileSync('sitemap_main.xml', esXml);

  // FR sitemap
  let frXml = fs.readFileSync('sitemap_fr.xml', 'utf8');
  const frUrls = CATS.map(c =>
    `  <url><loc>${BASE}/fr/galerie/${c.slugFR}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.70</priority></url>`
  ).join('\n');
  frXml = frXml.replace(
    `  <url><loc>${BASE}/fr/galerie/</loc>`,
    `${frUrls}\n  <url><loc>${BASE}/fr/galerie/</loc>`
  );
  frXml = frXml.replace(
    /<url><loc>https:\/\/www\.paraisodeaves\.com\/fr\/galerie\/<\/loc><lastmod>[^<]+<\/lastmod>/,
    `<url><loc>${BASE}/fr/galerie/</loc><lastmod>${today}</lastmod>`
  );
  fs.writeFileSync('sitemap_fr.xml', frXml);

  console.log(`  ✓ sitemaps +${CATS.length} ES + ${CATS.length} FR category URLs`);
}

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE HOMEPAGES
// ─────────────────────────────────────────────────────────────────────────────
function updateHomepages() {
  for (const [file, lang] of [['index.html','es'],['fr/index.html','fr']]) {
    let html = fs.readFileSync(file, 'utf8');
    // Remove any previous 6D injection
    html = html.replace(/<!-- ░░ PHASE 6D — GALLERY PREVIEW ░░ -->[\s\S]*?<!-- ░░ \/PHASE 6D — GALLERY PREVIEW ░░ -->/,'');
    // Find the Phase 6 masonry gallery section and replace with 6 category cards
    const gallerySection = /<!-- ░░ PHASE 6 — GALERÍA ░░ -->[\s\S]*?<!-- ░░ \/PHASE 6 — GALERÍA ░░ -->/;
    if (gallerySection.test(html)) {
      html = html.replace(gallerySection, buildHomepageGallerySection(lang));
    } else {
      // Fallback: inject before </main> or before the next section after species
      const beforeFooter = /(<section class="ph6-cta"|<!-- ░░ PHASE 6 — CTA ░░ -->)/;
      if (beforeFooter.test(html)) {
        html = html.replace(beforeFooter, buildHomepageGallerySection(lang) + '\n$1');
      }
    }
    fs.writeFileSync(file, html);
    console.log(`  ✓ ${file} gallery section updated`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITE ALL FILES
// ─────────────────────────────────────────────────────────────────────────────
function writeAll() {
  let pagesCreated = 0;

  // Landing pages
  fs.mkdirSync('galeria', { recursive: true });
  fs.writeFileSync('galeria/index.html', buildLandingPage('es'));
  fs.mkdirSync('fr/galerie', { recursive: true });
  fs.writeFileSync('fr/galerie/index.html', buildLandingPage('fr'));
  console.log('  ✓ galeria/index.html (landing)');
  console.log('  ✓ fr/galerie/index.html (landing)');

  // Category pages
  for (const cat of CATS) {
    // ES
    const esDir = `galeria/${cat.slugES}`;
    fs.mkdirSync(esDir, { recursive: true });
    fs.writeFileSync(`${esDir}/index.html`, buildCategoryPage(cat.key, 'es'));
    // FR
    const frDir = `fr/galerie/${cat.slugFR}`;
    fs.mkdirSync(frDir, { recursive: true });
    fs.writeFileSync(`${frDir}/index.html`, buildCategoryPage(cat.key, 'fr'));
    pagesCreated += 2;
    console.log(`  ✓ ${esDir}/ + ${frDir}/`);
  }

  return pagesCreated;
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────
function validate(pagesCreated) {
  const esLanding = fs.readFileSync('galeria/index.html','utf8');
  const frLanding = fs.readFileSync('fr/galerie/index.html','utf8');

  const countTag = (h,t) => (h.match(new RegExp(t,'g'))||[]).length;
  const noAlt    = h => (h.match(/<img [^>]+>/g)||[]).filter(t=>!t.includes('alt=')).length;

  // Check each category page
  const catChecks = CATS.map(c => {
    const esHtml = fs.readFileSync(`galeria/${c.slugES}/index.html`,'utf8');
    const frHtml = fs.readFileSync(`fr/galerie/${c.slugFR}/index.html`,'utf8');
    const esImgs = IMAGES.filter(i => i.cat === c.key).length;
    const esNoAlt = noAlt(esHtml);
    const esBread = esHtml.includes('BreadcrumbList');
    const esColl  = esHtml.includes('CollectionPage');
    return { key: c.key, esImgs, esNoAlt, esBread, esColl, esCanon: esHtml.includes(`galeria/${c.slugES}/`) };
  });

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('   PHASE 6D — RESTRUCTURE VALIDATION REPORT');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`\n📄 Pages created: ${pagesCreated} category + 2 landing = ${pagesCreated+2} total`);
  console.log(`\n🏠 Landing pages`);
  console.log(`   ES cat-cards:       ${countTag(esLanding,'cat-card')} (target: 9)`);
  console.log(`   FR cat-cards:       ${countTag(frLanding,'cat-card')} (target: 9)`);
  console.log(`   ES CollectionPage:  ${countTag(esLanding,'CollectionPage')}`);
  console.log(`   ES BreadcrumbList:  ${countTag(esLanding,'BreadcrumbList')}`);
  console.log(`   ES imgs no-alt:     ${noAlt(esLanding)}`);
  console.log(`   FR imgs no-alt:     ${noAlt(frLanding)}`);

  console.log('\n📂 Category pages');
  catChecks.forEach(c => {
    const status = c.esNoAlt === 0 && c.esBread && c.esColl ? '✓' : '⚠';
    console.log(`   ${status} ${c.key.padEnd(22)} | ${String(c.esImgs).padStart(2)} photos | no-alt:${c.esNoAlt} | schema:${c.esBread?'✓':'✗'}`);
  });

  // Image classification summary
  console.log('\n🖼  Image classification');
  CATS.forEach(c => {
    const imgs = IMAGES.filter(i => i.cat === c.key);
    console.log(`   ${c.key.padEnd(22)}: ${String(imgs.length).padStart(2)} photos`);
  });
  console.log(`   ${'TOTAL'.padEnd(22)}: ${IMAGES.length} photos classified`);

  // Sitemap check
  const esSm = fs.readFileSync('sitemap_main.xml','utf8');
  const frSm = fs.readFileSync('sitemap_fr.xml','utf8');
  const esSmCount = (esSm.match(/galeria\//g)||[]).length;
  const frSmCount = (frSm.match(/galerie\//g)||[]).length;
  console.log(`\n🗺  Sitemap`);
  console.log(`   ES galeria URLs:    ${esSmCount} (target: ${CATS.length+1})`);
  console.log(`   FR galerie URLs:    ${frSmCount} (target: ${CATS.length+1})`);

  const esHp = fs.readFileSync('index.html','utf8');
  console.log(`\n🏠 Homepage preview section: ${esHp.includes('ph6d-gallery-preview')?'✓ injected':'✗ missing'}`);
  console.log(`   Category cards on homepage: ${countTag(esHp,'ph6d-card')}`);

  console.log('\n✅ Phase 6D complete\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n🗂  Phase 6D — Gallery Restructure by Category\n');
console.log('1. Writing all pages...');
const n = writeAll();
console.log('2. Updating homepages...');
updateHomepages();
console.log('3. Updating sitemaps...');
updateSitemap();
validate(n);
