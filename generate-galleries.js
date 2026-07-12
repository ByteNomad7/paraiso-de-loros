#!/usr/bin/env node
/**
 * Phase 5 — Gallery Hubs
 * Generates /galeria/index.html and /fr/galerie/index.html
 */
const fs = require('fs');
const path = require('path');

// ─── MEDIA LIBRARY ───────────────────────────────────────────────────────────

const IMAGES = [
  // ── INSTALACIONES / INSTALLATIONS ──
  { file:'nosotros-guacamayo-verde-volador-01.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Guacamayo verde en vuelo libre en las instalaciones de Paraíso de Aves',
    altFr:'Ara vert en vol libre dans les installations de Paraíso de Aves',
    capEs:'Vuelo libre — nuestros guacamayos disfrutan de espacio amplio cada día',
    capFr:"Vol libre — nos aras profitent d'un grand espace chaque jour", featured:true },
  { file:'nosotros-aviario-exterior-criadero-02.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Aviario exterior del criadero de Paraíso de Aves en Llíria, Valencia',
    altFr:'Volière extérieure de l\'élevage Paraíso de Aves à Llíria, Valencia',
    capEs:'Aviarios exteriores — diseñados para el bienestar y la actividad natural',
    capFr:'Volières extérieures — conçues pour le bien-être et le comportement naturel', featured:true },
  { file:'nosotros-jaula-interior-equipada-03.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Jaula interior equipada con perchas naturales en el criadero',
    altFr:'Cage intérieure équipée de perchoirs naturels dans l\'élevage',
    capEs:'Jaulas interiores con enriquecimiento ambiental completo',
    capFr:'Cages intérieures avec enrichissement environnemental complet' },
  { file:'nosotros-cuidador-guacamayo-socializacion-04.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Cuidador socializando con guacamayo en Paraíso de Aves',
    altFr:'Soigneur qui socialise avec un ara à Paraíso de Aves',
    capEs:'Socialización diaria — la clave de un loro de compañía equilibrado',
    capFr:'Socialisation quotidienne — la clé d\'un perroquet de compagnie équilibré', featured:true },
  { file:'nosotros-zona-aviarios-multiple-05.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Zona de aviarios múltiples del criadero Paraíso de Aves',
    altFr:'Zone de volières multiples de l\'élevage Paraíso de Aves',
    capEs:'Más de 20 aviarios individuales para una cría responsable',
    capFr:'Plus de 20 volières individuelles pour un élevage responsable' },
  { file:'nosotros-guacamayos-percha-natural-06.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Guacamayos descansando en percha natural en el criadero',
    altFr:'Aras se reposant sur un perchoir naturel dans l\'élevage',
    capEs:'Perchas naturales de madera — estimulación para las patas y el pico',
    capFr:'Perchoirs naturels en bois — stimulation pour les pattes et le bec' },
  { file:'nosotros-amazona-loro-sociable-07.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Amazona sociable y confiada en manos del criador',
    altFr:'Amazone sociable et confiante dans les mains de l\'éleveur',
    capEs:'Amazonas criadas a mano — temperamento equilibrado desde el primer día',
    capFr:'Amazones élevées à la main — tempérament équilibré dès le premier jour' },
  { file:'nosotros-amazonas-pareja-curiosas-08.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Pareja de amazonas curiosas observando en el criadero',
    altFr:'Couple d\'amazones curieuses qui observent dans l\'élevage',
    capEs:'Reproductores seleccionados por su salud y temperamento',
    capFr:'Reproducteurs sélectionnés pour leur santé et leur tempérament' },
  { file:'nosotros-amazona-crianza-mano-09.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Cría de amazona criada a mano con biberón en Paraíso de Aves',
    altFr:'Bébé amazone élevé à la main au biberon à Paraíso de Aves',
    capEs:'Crianza a mano desde los 15 días — máxima socialización',
    capFr:'Élevage manuel dès 15 jours — socialisation maximale', featured:true },
  { file:'nosotros-loros-juego-enriquecimiento-10.jpg', ext:'jpg', cat:'instalaciones', w:1200, h:800,
    altEs:'Loros jugando con juguetes de enriquecimiento en el criadero',
    altFr:'Perroquets jouant avec des jouets d\'enrichissement dans l\'élevage',
    capEs:'Enriquecimiento diario — fundamental para el bienestar cognitivo',
    capFr:'Enrichissement quotidien — essentiel pour le bien-être cognitif' },

  // ── AVAILABLE BIRDS / AVES DISPONIBLES ──
  { file:'aves-disponibles-tucan-pico-keel-01.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Tucán de pico quilla disponible en Paraíso de Aves', altFr:'Toucan à bec caréné disponible à Paraíso de Aves',
    capEs:'Tucán keel-bill — uno de nuestros pájaros más fascinantes', capFr:'Toucan à bec caréné — l\'un de nos oiseaux les plus fascinants', featured:true },
  { file:'aves-disponibles-loro-senegal-verde-02.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Loro del Senegal verde disponible para adopción', altFr:'Perroquet du Sénégal vert disponible à l\'adoption',
    capEs:'Loro del Senegal — tamaño compacto, personalidad gigante', capFr:'Perroquet du Sénégal — taille compacte, personnalité géante' },
  { file:'aves-disponibles-conuro-verde-percha-03.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Conuro verde en percha disponible en el criadero', altFr:'Conure verte sur perchoir disponible à l\'élevage',
    capEs:'Conuros criados a mano — perfectos como primer loro', capFr:'Conures élevées à la main — parfaites comme premier perroquet' },
  { file:'aves-disponibles-cacatua-pichon-bebe-04.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Pichón de cacatúa bebé en el criadero Paraíso de Aves', altFr:'Bébé cacatoès dans l\'élevage Paraíso de Aves',
    capEs:'Pichones de cacatúa — reservas disponibles', capFr:'Bébés cacatoès — réservations disponibles', featured:true },
  { file:'aves-disponibles-guacamayos-azul-amarillo-pareja-05.jpg', ext:'jpg', cat:'guacamayos', w:1200, h:800,
    altEs:'Pareja de guacamayos azul y amarillo criados a mano', altFr:'Couple d\'aras bleu et jaune élevés à la main',
    capEs:'Pareja de aras azul y amarillo — sociables y documentados CITES', capFr:'Couple d\'aras bleu et jaune — sociaux et documentés CITES', featured:true },
  { file:'aves-disponibles-guacamayo-azul-amarillo-06.jpg', ext:'jpg', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo azul y amarillo disponible en Paraíso de Aves', altFr:'Ara bleu et jaune disponible à Paraíso de Aves',
    capEs:'Guacamayo azul y amarillo — el clásico de los aras', capFr:'Ara bleu et jaune — le classique des aras' },
  { file:'aves-disponibles-cacatua-galah-rosa-07.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Cacatúa galah rosada disponible en Paraíso de Aves', altFr:'Cacatoès rosalbin rose disponible à Paraíso de Aves',
    capEs:'Cacatúa galah — la joya rosada de los loros', capFr:'Cacatoès rosalbin — le joyau rose des perroquets', featured:true },
  { file:'aves-disponibles-cacatua-galah-exterior-08.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Cacatúa galah en aviario exterior del criadero', altFr:'Cacatoès rosalbin dans une volière extérieure',
    capEs:'Tiempo al aire libre — esencial para la salud física y mental', capFr:'Temps en plein air — essentiel pour la santé physique et mentale' },
  { file:'aves-disponibles-tucan-bano-09.jpg', ext:'jpg', cat:'tucanes', w:1200, h:800,
    altEs:'Tucán disfrutando del baño en el criadero Paraíso de Aves', altFr:'Toucan profitant du bain à Paraíso de Aves',
    capEs:'Nuestros tucanes adoran el agua — ¡bañan a diario!', capFr:'Nos toucans adorent l\'eau — bain quotidien !', featured:true },
  { file:'aves-disponibles-cacatua-galah-dormida-10.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Cacatúa galah descansando plácidamente en el criadero', altFr:'Cacatoès rosalbin se reposant paisiblement dans l\'élevage',
    capEs:'Rutinas de descanso — indicador clave de bienestar animal', capFr:'Routines de repos — indicateur clé du bien-être animal' },
  { file:'aves-disponibles-cacatua-galah-alimentacion-11.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Cacatúa galah comiendo en el criadero Paraíso de Aves', altFr:'Cacatoès rosalbin mangeant à l\'élevage Paraíso de Aves',
    capEs:'Alimentación supervisada con dieta equilibrada', capFr:'Alimentation supervisée avec régime équilibré' },
  { file:'aves-disponibles-loro-gris-africano-volando-12.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Loro gris africano en vuelo libre dentro del criadero', altFr:'Perroquet gris d\'Afrique en vol libre dans l\'élevage',
    capEs:'Vuelo libre diario — fundamental para la salud de los grises', capFr:'Vol libre quotidien — essentiel pour la santé des gris', featured:true },
  { file:'aves-disponibles-cacatua-galah-bano-alas-13.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Cacatúa galah abriendo las alas durante el baño', altFr:'Cacatoès rosalbin déployant ses ailes pendant le bain',
    capEs:'Baño en alas abiertas — comportamiento natural de bienestar', capFr:'Bain ailes déployées — comportement naturel de bien-être' },
  { file:'aves-disponibles-guacamayo-verde-papillero-14.jpg', ext:'jpg', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo verde papillero criado a mano desde bebé', altFr:'Ara vert nourri à la main depuis sa naissance',
    capEs:'Papilleros criados a mano — el vínculo más fuerte', capFr:'Bébés nourris à la main — le lien le plus fort', featured:true },
  { file:'aves-disponibles-loros-socializados-humano-15.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Loros socializados con humanos en el criadero', altFr:'Perroquets socialisés avec des humains dans l\'élevage',
    capEs:'Socialización humana desde la primera semana de vida', capFr:'Socialisation humaine dès la première semaine de vie' },
  { file:'aves-disponibles-loro-gris-cacatua-pareja-16.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Loro gris africano y cacatúa juntos en el criadero', altFr:'Perroquet gris d\'Afrique et cacatoès ensemble dans l\'élevage',
    capEs:'Convivencia entre especies — ambiente social enriquecedor', capFr:'Cohabitation entre espèces — environnement social enrichissant' },
  { file:'aves-disponibles-tucan-ducha-17.jpg', ext:'jpg', cat:'tucanes', w:1200, h:800,
    altEs:'Tucán disfrutando de ducha de agua en el criadero', altFr:'Toucan profitant d\'une douche d\'eau dans l\'élevage',
    capEs:'Ducha diaria — rutina de higiene esencial para tucanes', capFr:'Douche quotidienne — routine d\'hygiène essentielle pour les toucans' },
  { file:'aves-disponibles-tucan-tropical-exterior-18.jpg', ext:'jpg', cat:'tucanes', w:1200, h:800,
    altEs:'Tucán en ambiente exterior tropical del criadero', altFr:'Toucan dans un environnement extérieur tropical de l\'élevage',
    capEs:'Espacios exteriores naturalizados — el hábitat ideal para tucanes', capFr:'Espaces extérieurs naturalisés — l\'habitat idéal pour les toucans' },
  { file:'aves-disponibles-ave-blanca-percha-19.jpg', ext:'jpg', cat:'aves', w:1200, h:800,
    altEs:'Ave blanca en percha disponible en el criadero', altFr:'Oiseau blanc sur perchoir disponible à l\'élevage',
    capEs:'Aves blancas — elegancia y carácter único', capFr:'Oiseaux blancs — élégance et caractère unique' },
  { file:'aves-disponibles-tucan-retrato-primer-plano-20.jpg', ext:'jpg', cat:'tucanes', w:1200, h:800,
    altEs:'Retrato de primer plano de tucán en el criadero Paraíso de Aves', altFr:'Portrait en gros plan d\'un toucan à Paraíso de Aves',
    capEs:'Retrato del tucán — perfección natural de pico y plumaje', capFr:'Portrait du toucan — perfection naturelle du bec et du plumage', featured:true },

  // ── FOOD / ALIMENTATION ──
  { file:'comida-para-loros-mezcla-premium-01.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Mezcla premium de semillas y frutas para loros del criadero', altFr:'Mélange premium de graines et fruits pour perroquets',
    capEs:'Mezcla premium personalizada — nutrición óptima para cada especie', capFr:'Mélange premium personnalisé — nutrition optimale pour chaque espèce', featured:true },
  { file:'frutas-seguras-para-loros-03.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Frutas frescas seguras para loros — mango, papaya y frutos rojos', altFr:'Fruits frais sûrs pour perroquets — mangue, papaye et fruits rouges',
    capEs:'Fruta fresca diaria — vitaminas y antioxidantes esenciales', capFr:'Fruits frais quotidiens — vitamines et antioxydants essentiels' },
  { file:'verduras-para-loros-dieta-04.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Verduras frescas preparadas para la dieta de los loros', altFr:'Légumes frais préparés pour le régime des perroquets',
    capEs:'Verduras de temporada — variedad y color para estimular el apetito', capFr:'Légumes de saison — variété et couleur pour stimuler l\'appétit' },
  { file:'semillas-para-loros-grandes-05.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Semillas de tamaño grande para guacamayos y cacatúas', altFr:'Graines de grande taille pour aras et cacatoès',
    capEs:'Semillas seleccionadas por especie — tamaño y composición específicos', capFr:'Graines sélectionnées par espèce — taille et composition spécifiques' },
  { file:'brotes-germinados-loros-08.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Brotes germinados frescos para loros — superalimento natural', altFr:'Germes fraîches pour perroquets — super-aliment naturel',
    capEs:'Brotes germinados — máximo aporte de enzimas y vitaminas', capFr:'Germes — apport maximal d\'enzymes et de vitamines' },
  { file:'comida-guacamayo-dieta-especifica-13.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Dieta específica para guacamayo — nueces, frutas y pellets', altFr:'Régime spécifique pour ara — noix, fruits et granulés',
    capEs:'Dieta de guacamayo — equilibrada con alto contenido calórico', capFr:'Régime ara — équilibré avec haute teneur calorique' },
  { file:'comida-yaco-loro-gris-14.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Comida especial para yaco loro gris africano', altFr:'Nourriture spéciale pour gris du Gabon',
    capEs:'Dieta del yaco — especialmente rica en calcio y vitamina A', capFr:'Régime du gris — particulièrement riche en calcium et vitamine A' },
  { file:'nueces-para-loros-proteinas-23.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Nueces y frutos secos como proteína para loros', altFr:'Noix et fruits secs comme protéines pour perroquets',
    capEs:'Nueces frescas — fuente proteica y de grasas saludables', capFr:'Noix fraîches — source de protéines et de graisses saines' },
  { file:'mango-loro-fruta-tropical-28.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Mango fresco como fruta tropical favorita de los loros', altFr:'Mangue fraîche comme fruit tropical favori des perroquets',
    capEs:'Mango — vitaminas A y C en abundancia para plumaje brillante', capFr:'Mangue — vitamines A et C abondantes pour un plumage brillant' },
  { file:'alimento-fresco-diario-loro-29.jpg', ext:'jpg', cat:'alimentacion', w:1200, h:800,
    altEs:'Preparación diaria de alimento fresco para loros del criadero', altFr:'Préparation quotidienne d\'aliments frais pour perroquets',
    capEs:'Preparación diaria — cada lote fresco preparado en el criadero', capFr:'Préparation quotidienne — chaque lot frais préparé dans l\'élevage', featured:true },

  // ── ENRICHMENT / JUGUETES ──
  { file:'juguetes-naturales-para-loros-01.jpg', ext:'jpg', cat:'enriquecimiento', w:1200, h:800,
    altEs:'Juguetes naturales de madera y cuerda para loros', altFr:'Jouets naturels en bois et corde pour perroquets',
    capEs:'Juguetes naturales — estimulación mental sin riesgo', capFr:'Jouets naturels — stimulation mentale sans risque', featured:true },
  { file:'juguete-madera-guacamayo-02.jpg', ext:'jpg', cat:'enriquecimiento', w:1200, h:800,
    altEs:'Juguete de madera resistente para guacamayos', altFr:'Jouet en bois résistant pour aras',
    capEs:'Madera dura — necesaria para el pico fuerte de los guacamayos', capFr:'Bois dur — nécessaire pour le puissant bec des aras' },
  { file:'columpio-natural-loros-03.jpg', ext:'jpg', cat:'enriquecimiento', w:1200, h:800,
    altEs:'Columpio natural de madera para loros en el criadero', altFr:'Balançoire naturelle en bois pour perroquets dans l\'élevage',
    capEs:'Columpios naturales — equilibrio y coordinación en cada movimiento', capFr:'Balançoires naturelles — équilibre et coordination à chaque mouvement' },
  { file:'cuerdas-naturales-loros-trepar-05.jpg', ext:'jpg', cat:'enriquecimiento', w:1200, h:800,
    altEs:'Cuerdas naturales para que los loros trepen y ejerciten', altFr:'Cordes naturelles pour que les perroquets grimpent et s\'exercent',
    capEs:'Cuerdas de fibra natural — seguras para trepar y explorar', capFr:'Cordes en fibre naturelle — sûres pour grimper et explorer' },
  { file:'perchas-madera-natural-loro-06.jpg', ext:'jpg', cat:'enriquecimiento', w:1200, h:800,
    altEs:'Perchas de madera natural de distintos diámetros para loros', altFr:'Perchoirs en bois naturel de différents diamètres pour perroquets',
    capEs:'Perchas de distinto diámetro — salud de patas y uñas', capFr:'Perchoirs de différents diamètres — santé des pattes et des griffes' },
  { file:'juguete-destruir-loros-07.jpg', ext:'jpg', cat:'enriquecimiento', w:1200, h:800,
    altEs:'Juguete de destrucción para loros — estímulo natural del picoteo', altFr:'Jouet à détruire pour perroquets — stimulation naturelle du picorage',
    capEs:'Juguetes de destrucción — satisfacen el instinto natural de picotear', capFr:'Jouets à détruire — satisfont l\'instinct naturel de picorage' },
  { file:'campanas-loros-sonido-10.jpg', ext:'jpg', cat:'enriquecimiento', w:1200, h:800,
    altEs:'Campanas y sonajeros para estimulación auditiva de loros', altFr:'Cloches et hochets pour la stimulation auditive des perroquets',
    capEs:'Sonajeros y campanas — estimulación auditiva y búsqueda de recompensa', capFr:'Hochets et cloches — stimulation auditive et recherche de récompense' },

  // ── TRANSPORT ──
  { file:'transportin-loro-caja-viaje-01.webp', ext:'webp', cat:'transporte', w:1200, h:800,
    altEs:'Transportín homologado para transporte de loros en viaje', altFr:'Caisse de transport homologuée pour le transport de perroquets',
    capEs:'Transportines IATA — seguridad y confort en cada viaje', capFr:'Caisses IATA — sécurité et confort à chaque voyage', featured:true },

  // ── SPECIES / GUACAMAYOS ──
  { file:'../guacamayo-azul-01.webp', ext:'webp', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo azul y amarillo de frente — Ara ararauna en el criadero', altFr:'Ara bleu et jaune de face — Ara ararauna dans l\'élevage',
    capEs:'Ara ararauna — el guacamayo más popular del mundo', capFr:'Ara ararauna — l\'ara le plus populaire au monde', featured:true },
  { file:'../guacamayo-azul-02.webp', ext:'webp', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo azul y amarillo de perfil mostrando su plumaje', altFr:'Ara bleu et jaune de profil montrant son plumage',
    capEs:'Plumaje turquesa y amarillo dorado — 90 cm de magnificencia', capFr:'Plumage turquoise et jaune doré — 90 cm de magnificence' },
  { file:'../guacamayo-escarlata-01.webp', ext:'webp', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo escarlata rojo brillante — Ara macao en el criadero', altFr:'Ara rouge écarlate brillant — Ara macao dans l\'élevage',
    capEs:'Ara macao — 3 000 años de historia junto al hombre', capFr:'Ara macao — 3 000 ans d\'histoire aux côtés de l\'homme', featured:true },
  { file:'../guacamayo-escarlata-02.webp', ext:'webp', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo escarlata mostrando alas extendidas', altFr:'Ara rouge écarlate déployant ses ailes',
    capEs:'Alas extendidas — envergadura de hasta 120 cm', capFr:'Ailes déployées — envergure jusqu\'à 120 cm' },
  { file:'../guacamayo-jacinto-01.webp', ext:'webp', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo jacinto azul cobalto — el loro más grande del mundo', altFr:'Ara hyacinthe bleu cobalt — le plus grand perroquet du monde',
    capEs:'Ara jacinto — 100 cm de pura intensidad azul cobalto', capFr:'Ara hyacinthe — 100 cm de pur bleu cobalt intense', featured:true },
  { file:'../guacamayo-jacinto-02.webp', ext:'webp', cat:'guacamayos', w:1200, h:800,
    altEs:'Guacamayo jacinto mostrando el pico fuerte y el ojo amarillo', altFr:'Ara hyacinthe montrant son puissant bec et son œil jaune',
    capEs:'Pico negro y anillo ocular amarillo — rasgos únicos del jacinto', capFr:'Bec noir et anneau oculaire jaune — traits uniques de l\'hyacinthe' },

  // ── CONUROS / CONURES ──
  { file:'../conuro-01.webp', ext:'webp', cat:'conuros', w:1200, h:800,
    altEs:'Conuro del sol (Aratinga solstitialis) en el criadero', altFr:'Conure soleil (Aratinga solstitialis) dans l\'élevage',
    capEs:'Conuro del sol — explosión de colores tropicales', capFr:'Conure soleil — explosion de couleurs tropicales', featured:true },
  { file:'../conuro-02.webp', ext:'webp', cat:'conuros', w:1200, h:800,
    altEs:'Conuro verde en percha — especie de compañía perfecta', altFr:'Conure verte sur perchoir — espèce de compagnie parfaite',
    capEs:'Conuros — grandes personalidades en cuerpos compactos', capFr:'Conures — grandes personnalités dans des corps compacts' },

  // ── TUCANES ──
  { file:'../shinda-daphne-01.webp', ext:'webp', cat:'tucanes', w:1200, h:800,
    altEs:'Tucán Shinda en el criadero Paraíso de Aves', altFr:'Toucan Shinda à l\'élevage Paraíso de Aves',
    capEs:'Shinda — nuestro tucán de pico quilla, nacido en el criadero', capFr:'Shinda — notre toucan à bec caréné, né dans l\'élevage', featured:true },
  { file:'../shinda-daphne-02.webp', ext:'webp', cat:'tucanes', w:1200, h:800,
    altEs:'Daphne la tucana posada en rama en el criadero', altFr:'Daphne la toucan perchée sur une branche dans l\'élevage',
    capEs:'Daphne — nuestra tucana hembra, carácter dulce y curioso', capFr:'Daphne — notre toucan femelle, caractère doux et curieux' },
  { file:'../shinda-daphne-03.webp', ext:'webp', cat:'tucanes', w:1200, h:800,
    altEs:'Tucán mostrando el colorido pico en primer plano', altFr:'Toucan montrant son bec coloré en gros plan',
    capEs:'El pico del tucán — una obra maestra de la evolución', capFr:'Le bec du toucan — un chef-d\'œuvre de l\'évolution' },
  { file:'../shinda-daphne-04.webp', ext:'webp', cat:'tucanes', w:1200, h:800,
    altEs:'Pareja de tucanes Shinda y Daphne juntos en el criadero', altFr:'Couple de toucans Shinda et Daphne ensemble dans l\'élevage',
    capEs:'Shinda y Daphne — nuestra pareja de tucanes reproductores', capFr:'Shinda et Daphne — notre couple de toucans reproducteurs', featured:true },
];

// ─── SHARED CSS + JS ─────────────────────────────────────────────────────────

function galleryStyles() {
  return `<style>
:root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.12);}
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.7;}
h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
/* TOPBAR */
.topbar{background:var(--primary);position:sticky;top:0;z-index:100;padding:0 5%;}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto;}
.logo{color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;}
nav a{color:rgba(255,255,255,.85);margin-left:18px;font-size:.88rem;font-weight:500;transition:color .2s;}
nav a:hover,nav a.active{color:var(--gold);}
.lang-sw{display:flex;align-items:center;gap:5px;margin-left:18px;}
.lang-sw a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.6);padding:3px 7px;border-radius:4px;}
.lang-sw a.active{color:var(--gold);background:rgba(212,169,79,.15);}
.lang-sw span{color:rgba(255,255,255,.25);font-size:.7rem;}
/* BREADCRUMB */
.breadcrumb{background:linear-gradient(to right,var(--primary),var(--secondary));padding:10px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
.breadcrumb-inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.65);}
.breadcrumb-inner a{color:rgba(255,255,255,.75);}
.breadcrumb-inner a:hover{color:var(--gold);}
.breadcrumb-inner span{margin:0 6px;opacity:.4;}
/* HERO */
.hero{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 60%,#173326 100%);padding:72px 5% 60px;color:#fff;text-align:center;position:relative;overflow:hidden;}
.hero::after{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Crect x='0' y='0' width='1' height='40'/%3E%3Crect x='0' y='0' width='40' height='1'/%3E%3C/g%3E%3C/svg%3E");}
.hero .badge{position:relative;display:inline-block;background:rgba(212,169,79,.18);border:1px solid rgba(212,169,79,.45);color:var(--gold);padding:6px 22px;border-radius:30px;font-size:.78rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;}
.hero h1{position:relative;font-size:clamp(2rem,5vw,3.2rem);color:#fff;margin-bottom:14px;}
.hero h1 em{color:var(--gold);font-style:normal;}
.hero p{position:relative;font-size:1.05rem;color:rgba(255,255,255,.88);max-width:640px;margin:0 auto 28px;}
.trust-pills{position:relative;display:flex;flex-wrap:wrap;justify-content:center;gap:10px;}
.trust-pills span{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;}
/* STATS */
.stats-bar{background:var(--primary);padding:36px 5%;}
.stats-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:24px;text-align:center;}
.stat-num{font-family:'Poppins',sans-serif;font-size:2rem;font-weight:800;color:var(--gold);}
.stat-lbl{font-size:.82rem;color:rgba(255,255,255,.7);margin-top:3px;}
/* FILTER */
.filter-bar{max-width:1200px;margin:48px auto 32px;padding:0 5%;}
.filter-bar h2{font-size:1.5rem;color:var(--primary);margin-bottom:20px;}
.filter-tabs{display:flex;flex-wrap:wrap;gap:10px;}
.filter-btn{background:var(--white);border:2px solid var(--border);border-radius:30px;padding:8px 20px;font-size:.85rem;font-weight:600;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'Poppins',sans-serif;}
.filter-btn:hover{border-color:var(--primary);color:var(--primary);}
.filter-btn.active{background:var(--primary);border-color:var(--primary);color:#fff;}
/* MASONRY GRID */
.gallery-grid{column-count:3;column-gap:16px;max-width:1200px;margin:0 auto;padding:0 5% 64px;}
@media(max-width:900px){.gallery-grid{column-count:2;}}
@media(max-width:560px){.gallery-grid{column-count:1;}}
.gallery-item{break-inside:avoid;margin-bottom:16px;position:relative;overflow:hidden;border-radius:10px;cursor:pointer;background:var(--border);}
.gallery-item img{width:100%;height:auto;display:block;transition:transform .4s ease;border-radius:10px;}
.gallery-item:hover img{transform:scale(1.04);}
.gallery-item .overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 50%);opacity:0;transition:opacity .3s;border-radius:10px;display:flex;align-items:flex-end;padding:14px;}
.gallery-item:hover .overlay{opacity:1;}
.gallery-item .caption{color:#fff;font-size:.82rem;font-weight:600;line-height:1.35;}
.gallery-item.hidden{display:none;}
.gallery-item .featured-badge{position:absolute;top:10px;right:10px;background:var(--gold);color:var(--primary);font-size:.7rem;font-weight:800;padding:3px 8px;border-radius:6px;text-transform:uppercase;letter-spacing:.5px;}
/* skeleton loading */
.gallery-item.skeleton{background:linear-gradient(90deg,#e0d8ce 25%,#f0ebe4 50%,#e0d8ce 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;}
@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}
/* LIGHTBOX */
.lb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:9999;display:none;align-items:center;justify-content:center;flex-direction:column;}
.lb-overlay.open{display:flex;}
.lb-img-wrap{position:relative;max-width:90vw;max-height:82vh;display:flex;align-items:center;justify-content:center;}
.lb-img{max-width:90vw;max-height:80vh;object-fit:contain;border-radius:6px;box-shadow:0 20px 60px rgba(0,0,0,.6);}
.lb-cap{color:rgba(255,255,255,.85);font-size:.88rem;text-align:center;margin-top:14px;max-width:600px;padding:0 20px;}
.lb-close{position:fixed;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;z-index:10000;line-height:1;opacity:.8;}
.lb-close:hover{opacity:1;}
.lb-nav{position:fixed;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;width:48px;height:48px;border-radius:50%;font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;z-index:10000;}
.lb-nav:hover{background:rgba(255,255,255,.2);}
.lb-prev{left:16px;}.lb-next{right:16px;}
.lb-counter{position:fixed;top:20px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.6);font-size:.82rem;z-index:10000;}
/* CTA */
.cta-section{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:64px 5%;text-align:center;color:#fff;}
.cta-section h2{font-size:2rem;margin-bottom:12px;color:#fff;}
.cta-section p{color:rgba(255,255,255,.85);margin-bottom:28px;font-size:1rem;}
.btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:14px 36px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;transition:all .2s;}
.btn-gold:hover{background:var(--gold-light);transform:translateY(-2px);box-shadow:0 6px 20px rgba(212,169,79,.4);}
.btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.4);color:#fff;padding:13px 30px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.95rem;margin-left:12px;transition:all .2s;}
.btn-outline:hover{border-color:#fff;background:rgba(255,255,255,.1);}
footer{background:var(--primary);color:rgba(255,255,255,.65);padding:40px 5% 24px;}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:36px;margin-bottom:32px;}
.footer-col h4{color:#fff;font-size:.95rem;margin-bottom:14px;}
.footer-col ul{list-style:none;}
.footer-col ul li{margin-bottom:7px;}
.footer-col ul li a{font-size:.85rem;color:rgba(255,255,255,.6);}
.footer-col ul li a:hover{color:var(--gold);}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;text-align:center;font-size:.8rem;color:rgba(255,255,255,.4);}
@media(max-width:768px){.btn-outline{margin-left:0;margin-top:10px;display:block;width:fit-content;margin:10px auto 0;}}
</style>`;
}

function lightboxJS(lang) {
  const items = IMAGES.map((img, i) => ({
    src: `/images/gallery/${img.file}`,
    cap: lang === 'es' ? img.capEs : img.capFr,
    cat: img.cat
  }));
  return `<script>
(function() {
  var items = ${JSON.stringify(items)};
  var filtered = items.slice();
  var curIdx = 0;
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var lbCount = document.getElementById('lb-counter');

  function open(src, cap, visibleItems, visIdx) {
    filtered = visibleItems;
    curIdx = visIdx;
    lbImg.src = src;
    lbCap.textContent = cap;
    lbCount.textContent = (visIdx+1) + ' / ' + visibleItems.length;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbImg.focus();
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function nav(dir) {
    curIdx = (curIdx + dir + filtered.length) % filtered.length;
    var it = filtered[curIdx];
    lbImg.src = it.src; lbCap.textContent = it.cap;
    lbCount.textContent = (curIdx+1) + ' / ' + filtered.length;
  }

  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', function(){ nav(-1); });
  document.getElementById('lb-next').addEventListener('click', function(){ nav(1); });
  lb.addEventListener('click', function(e){ if(e.target===lb) close(); });

  document.addEventListener('keydown', function(e) {
    if (!lb.classList.contains('open')) return;
    if (e.key==='Escape') close();
    if (e.key==='ArrowLeft') nav(-1);
    if (e.key==='ArrowRight') nav(1);
  });

  // Touch swipe
  var touchX = 0;
  lb.addEventListener('touchstart', function(e){ touchX = e.touches[0].clientX; }, {passive:true});
  lb.addEventListener('touchend', function(e){
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) nav(dx < 0 ? 1 : -1);
  }, {passive:true});

  // Category filter
  var currentCat = 'all';
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      document.querySelectorAll('.gallery-item').forEach(function(item) {
        if (currentCat === 'all' || item.dataset.cat === currentCat) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Open gallery items
  document.querySelectorAll('.gallery-item[data-src]').forEach(function(el) {
    el.addEventListener('click', function() {
      var src = el.dataset.src;
      var cap = el.dataset.cap;
      var visItems = [];
      document.querySelectorAll('.gallery-item[data-src]:not(.hidden)').forEach(function(i){
        visItems.push({ src: i.dataset.src, cap: i.dataset.cap });
      });
      var visIdx = visItems.findIndex(function(i){ return i.src === src; });
      open(src, cap, visItems, visIdx);
    });
  });
})();
</script>`;
}

// ─── BUILD PAGES ─────────────────────────────────────────────────────────────

function buildGalleryPage(lang) {
  const isEs = lang === 'es';
  const title    = isEs ? 'Galería de Fotos | Paraíso de Aves — Criadero de Loros' : 'Galerie Photos | Paraíso de Aves — Élevage de Perroquets';
  const desc     = isEs ? 'Galería completa de fotos del criadero Paraíso de Aves: instalaciones, guacamayos, conuros, tucanes, alimentación y más. Imágenes reales de nuestros loros.' : 'Galerie complète de photos de l\'élevage Paraíso de Aves : installations, aras, conures, toucans, alimentation et plus. Photos réelles de nos perroquets.';
  const canonical = isEs ? 'https://www.paraisodeaves.com/galeria/' : 'https://www.paraisodeaves.com/fr/galerie/';
  const base      = isEs ? '' : '/fr';

  const catLabels = isEs ? {
    all: 'Todas las fotos', instalaciones:'Instalaciones', aves:'Aves Disponibles',
    guacamayos:'Guacamayos', conuros:'Conuros', tucanes:'Tucanes',
    alimentacion:'Alimentación', enriquecimiento:'Juguetes y Enriquecimiento', transporte:'Transporte'
  } : {
    all: 'Toutes les photos', instalaciones:'Nos Installations', aves:'Perroquets Disponibles',
    guacamayos:'Aras', conuros:'Conures', tucanes:'Toucans',
    alimentacion:'Alimentation', enriquecimiento:'Jouets et Enrichissement', transporte:'Transport'
  };

  const filterBtns = Object.entries(catLabels).map(([cat, lbl]) =>
    `<button class="filter-btn${cat === 'all' ? ' active' : ''}" data-cat="${cat}">${lbl}</button>`
  ).join('\n      ');

  const galleryItems = IMAGES.map(img => {
    const src   = `/images/gallery/${img.file}`;
    const alt   = isEs ? img.altEs : img.altFr;
    const cap   = isEs ? img.capEs : img.capFr;
    return `<div class="gallery-item" data-cat="${img.cat}" data-src="${src}" data-cap="${cap.replace(/"/g, '&quot;')}" role="button" tabindex="0" aria-label="${alt.replace(/"/g, '&quot;')}">
        ${img.featured ? '<div class="featured-badge">⭐</div>' : ''}
        <img src="${src}" alt="${alt.replace(/"/g, '&quot;')}" loading="lazy" width="${img.w}" height="${img.h}" decoding="async"/>
        <div class="overlay"><div class="caption">${cap}</div></div>
      </div>`;
  }).join('\n      ');

  // Count per category
  const counts = {};
  IMAGES.forEach(img => { counts[img.cat] = (counts[img.cat]||0)+1; });

  const heroLine  = isEs ? 'Nuestros loros, instalaciones y vida diaria en el criadero' : 'Nos perroquets, installations et vie quotidienne dans l\'élevage';
  const heroSub   = isEs ? 'Imágenes reales. Sin filtros. La transparencia es nuestra mejor garantía.' : 'Images réelles. Sans filtres. La transparence est notre meilleure garantie.';
  const pill1     = isEs ? `📸 ${IMAGES.length} fotos reales` : `📸 ${IMAGES.length} photos réelles`;
  const pill2     = isEs ? '🏡 Sin filtros ni edición' : '🏡 Sans filtres ni retouche';
  const pill3     = isEs ? '🦜 Actualizadas en 2026' : '🦜 Mises à jour en 2026';
  const filterH2  = isEs ? 'Explorar por categoría' : 'Explorer par catégorie';
  const ctaH2     = isEs ? '¿Te gustaría conocernos en persona?' : 'Vous aimeriez nous connaître en personne ?';
  const ctaP      = isEs ? 'Visitas al criadero con cita previa. Contacta con nosotros para organizar tu visita.' : 'Visites de l\'élevage sur rendez-vous. Contactez-nous pour organiser votre visite.';
  const ctaBtn    = isEs ? 'Contactar' : 'Nous contacter';
  const ctaBtn2   = isEs ? 'Ver aves disponibles' : 'Voir les perroquets disponibles';
  const hreflangOther = isEs
    ? `<link rel="alternate" hreflang="fr-FR" href="https://www.paraisodeaves.com/fr/galerie/"/>`
    : `<link rel="alternate" hreflang="es-ES" href="https://www.paraisodeaves.com/galeria/"/>`;

  // Schema
  const imageObjects = IMAGES.slice(0, 20).map(img => ({
    "@type": "ImageObject",
    "url": `https://www.paraisodeaves.com/images/gallery/${img.file}`,
    "name": isEs ? img.altEs : img.altFr,
    "description": isEs ? img.capEs : img.capFr,
    "width": img.w, "height": img.h
  }));
  const schema = [{
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    "@id": canonical,
    "url": canonical,
    "name": title,
    "description": desc,
    "inLanguage": isEs ? "es-ES" : "fr-FR",
    "publisher": {"@type":"Organization","name":"Paraíso de Aves","url":"https://www.paraisodeaves.com/"},
    "breadcrumb": {
      "@type":"BreadcrumbList",
      "itemListElement":[
        {"@type":"ListItem","position":1,"name":isEs?"Inicio":"Accueil","item": isEs?"https://www.paraisodeaves.com/":"https://www.paraisodeaves.com/fr/"},
        {"@type":"ListItem","position":2,"name":isEs?"Galería":"Galerie","item":canonical}
      ]
    },
    "image": imageObjects
  }];

  const navAvail  = isEs ? 'Disponibles' : 'Disponibles';
  const navSpec   = isEs ? 'Especies'    : 'Espèces';
  const navConn   = isEs ? 'Blog'        : 'Connaissances';
  const navLiv    = isEs ? 'Envíos'      : 'Livraison';
  const navCont   = isEs ? 'Contacto'    : 'Contact';
  const navGal    = isEs ? 'Galería'     : 'Galerie';

  return `<!DOCTYPE html>
<html lang="${isEs?'es-ES':'fr-FR'}" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${canonical}"/>
  <link rel="alternate" hreflang="${isEs?'es-ES':'fr-FR'}" href="${canonical}"/>
  ${hreflangOther}
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="${isEs?'es_ES':'fr_FR'}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="${canonical}"/>
  <meta property="og:image" content="https://www.paraisodeaves.com/images/gallery/nosotros-guacamayo-verde-volador-01.jpg"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  ${galleryStyles()}
</head>
<body>

<nav class="topbar">
  <div class="topbar-inner">
    <a href="https://www.paraisodeaves.com${base}/" class="logo"><span>🦜</span> Paraíso de Aves</a>
    <nav>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'aves-disponibles':'perroquets-disponibles'}/">${navAvail}</a>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'especies':'especies'}/">${navSpec}</a>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'blog':'connaissances'}/">${navConn}</a>
      <a href="https://www.paraisodeaves.com${base}/livraison/" class="${isEs?'hidden':''}">Livraison</a>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'envio-de-loros':''}${isEs?'':''}" class="${isEs?'':'hidden'}">Envíos</a>
      <a href="https://www.paraisodeaves.com${base}/${isEs?'galeria':'galerie'}/" class="active">${navGal}</a>
      <a href="https://www.paraisodeaves.com${base}/contact${isEs?'o':''}/">${navCont}</a>
    </nav>
    <div class="lang-sw">
      <a href="https://www.paraisodeaves.com/galeria/" ${isEs?'class="active"':''}>ES</a>
      <span>|</span>
      <a href="https://www.paraisodeaves.com/fr/galerie/" ${!isEs?'class="active"':''}>FR</a>
    </div>
  </div>
</nav>

<div class="breadcrumb">
  <div class="breadcrumb-inner">
    <a href="https://www.paraisodeaves.com${base}/">${isEs?'Inicio':'Accueil'}</a>
    <span>›</span>
    <strong style="color:var(--gold);">${isEs?'Galería de Fotos':'Galerie Photos'}</strong>
  </div>
</div>

<section class="hero">
  <div class="badge">📸 ${isEs?'GALERÍA OFICIAL':'GALERIE OFFICIELLE'}</div>
  <h1>${isEs?'Galería de <em>Paraíso de Aves</em>':'Galerie de <em>Paraíso de Aves</em>'}</h1>
  <p>${heroLine}</p>
  <p style="font-size:.92rem;color:rgba(255,255,255,.7);position:relative;">${heroSub}</p>
  <div class="trust-pills" style="margin-top:20px;">
    <span>${pill1}</span>
    <span>${pill2}</span>
    <span>${pill3}</span>
  </div>
</section>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-num">${IMAGES.length}</div><div class="stat-lbl">${isEs?'Fotos reales':'Photos réelles'}</div></div>
    <div><div class="stat-num">${Object.keys(catLabels).length - 1}</div><div class="stat-lbl">${isEs?'Categorías':'Catégories'}</div></div>
    <div><div class="stat-num">20+</div><div class="stat-lbl">${isEs?'Especies criadas':'Espèces élevées'}</div></div>
    <div><div class="stat-num">15+</div><div class="stat-lbl">${isEs?'Años de experiencia':'Ans d\'expérience'}</div></div>
    <div><div class="stat-num">0</div><div class="stat-lbl">${isEs?'Fotos de banco':'Photos de banque'}</div></div>
  </div>
</div>

<div class="filter-bar">
  <h2>📂 ${filterH2}</h2>
  <div class="filter-tabs">
    ${filterBtns}
  </div>
</div>

<div class="gallery-grid" id="gallery-grid">
  ${galleryItems}
</div>

<section class="cta-section">
  <h2>${ctaH2}</h2>
  <p>${ctaP}</p>
  <a href="https://www.paraisodeaves.com${base}/contact${isEs?'o':''}/" class="btn-gold">${ctaBtn}</a>
  <a href="https://www.paraisodeaves.com${base}/${isEs?'aves-disponibles':'perroquets-disponibles'}/" class="btn-outline">${ctaBtn2}</a>
</section>

<footer>
  <div class="footer-inner">
    <div class="footer-col">
      <h4>🦜 Paraíso de Aves</h4>
      <p style="font-size:.85rem;color:rgba(255,255,255,.55);line-height:1.7;">${isEs?'Criadero especializado en loros exóticos criados a mano. Envíos a toda España, Francia y Portugal.':'Élevage spécialisé en perroquets exotiques élevés à la main. Livraison dans toute la France.'}</p>
      <p style="margin-top:10px;"><a href="mailto:paraisodeloros@gmail.com" style="color:var(--gold);font-size:.85rem;">paraisodeloros@gmail.com</a></p>
    </div>
    <div class="footer-col">
      <h4>${isEs?'Galería':'Galerie'}</h4>
      <ul>
        ${Object.entries(catLabels).filter(([c])=>c!=='all').map(([cat, lbl])=>
          `<li><a href="#" onclick="document.querySelector('[data-cat=${cat}].filter-btn').click();window.scrollTo(0,400);return false;">${lbl}</a></li>`
        ).join('\n        ')}
      </ul>
    </div>
    <div class="footer-col">
      <h4>${isEs?'Adopción':'Adoption'}</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'aves-disponibles':'perroquets-disponibles'}/">${isEs?'Aves disponibles':'Perroquets disponibles'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'adoptar-loro':'adopter-perroquet'}/">${isEs?'Adoptar un loro':'Adopter un perroquet'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/garantie${isEs?'-de-salud':'-sante'}/">${isEs?'Garantía de salud':'Garantie santé'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/faq/">${isEs?'Preguntas frecuentes':'FAQ'}</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>${isEs?'Instalaciones':'Installations'}</h4>
      <ul>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'nuestras-instalaciones':'nos-installations'}/">${isEs?'Nuestras instalaciones':'Nos installations'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/${isEs?'tucanes':'toucans'}/">${isEs?'Tucanes':'Toucans'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/especies/">${isEs?'Todas las especies':'Toutes les espèces'}</a></li>
        <li><a href="https://www.paraisodeaves.com${base}/contact${isEs?'o':''}/">${isEs?'Contacto':'Contact'}</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">© 2026 Paraíso de Aves — ${isEs?'Criadero de loros exóticos':'Élevage de perroquets exotiques'}</div>
</footer>

<!-- Lightbox -->
<div class="lb-overlay" id="lightbox" role="dialog" aria-modal="true" aria-label="${isEs?'Galería ampliada':'Galerie agrandie'}">
  <div class="lb-counter" id="lb-counter"></div>
  <button class="lb-close" id="lb-close" aria-label="${isEs?'Cerrar':'Fermer'}">✕</button>
  <button class="lb-nav lb-prev" id="lb-prev" aria-label="${isEs?'Anterior':'Précédente'}">‹</button>
  <div class="lb-img-wrap">
    <img class="lb-img" id="lb-img" src="" alt="" tabindex="0"/>
  </div>
  <div class="lb-cap" id="lb-cap"></div>
  <button class="lb-nav lb-next" id="lb-next" aria-label="${isEs?'Siguiente':'Suivante'}">›</button>
</div>

<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
${lightboxJS(lang)}
</body>
</html>`;
}

// ─── WRITE ────────────────────────────────────────────────────────────────────

const esDir = path.join('galeria');
const frDir = path.join('fr', 'galerie');
fs.mkdirSync(esDir, { recursive: true });
fs.mkdirSync(frDir, { recursive: true });

fs.writeFileSync(path.join(esDir, 'index.html'), buildGalleryPage('es'), 'utf8');
console.log('✓ Generated galeria/index.html');

fs.writeFileSync(path.join(frDir, 'index.html'), buildGalleryPage('fr'), 'utf8');
console.log('✓ Generated fr/galerie/index.html');

console.log(`\n✅ Gallery hubs complete — ${IMAGES.length} images catalogued`);
