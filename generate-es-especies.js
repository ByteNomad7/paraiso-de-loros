#!/usr/bin/env node
/**
 * generate-es-especies.js
 *
 * Generates 16 Spanish species category pages at /es/especies/{slug}/index.html
 * Each page is a full SEO landing page with schema, FAQs, breadcrumb, and
 * a Phase 2 placeholder for future bird listings.
 *
 * Also injects the "Explora nuestras especies" section into index.html
 * immediately after the hero.
 */

const fs   = require('fs');
const path = require('path');

// ─── Species data ─────────────────────────────────────────────────────────────
const SPECIES = [
  {
    slug:        'yacos',
    name:        'Yacos',
    latinName:   'Psittacus erithacus',
    subtitle:    'Loro Gris Africano',
    img:         '/images/loro-gris-01.webp',
    imgAlt:      'Yaco Loro Gris Africano criado a mano en España',
    size:        'grande',
    habla:       'muy-hablador',
    familia:     'si',
    principiante:'no',
    apartamento: 'no',
    tags:        ['CITES Apéndice II', 'Criado a mano', 'Gran inteligencia'],
    seoTitle:    'Yacos (Loro Gris Africano) en España | Paraíso de Aves',
    seoDesc:     'Yacos criados a mano con documentación CITES. El loro más inteligente del mundo. Envíos a toda España y Europa. Consulta disponibilidad en Paraíso de Aves.',
    h1:          'Yacos — Loro Gris Africano',
    intro:       `El <strong>Yaco</strong> (<em>Psittacus erithacus</em>), también conocido como <strong>Loro Gris Africano</strong>, es considerado el loro más inteligente del mundo. Estudios cognitivos lo equiparan con niños de 5 años en comprensión numérica y resolución de problemas. En Paraíso de Aves los criamos a mano desde el nido en nuestras instalaciones de Llíria (Valencia), garantizando un temperamento sociable y seguro para toda la familia. Cada ave sale con <a href="/blog/cites-loros-espana.html">documentación CITES</a> completa y <a href="/garantia-de-salud">garantía veterinaria de salud</a>.`,
    faqs: [
      { q: '¿Cuántas palabras puede aprender un Yaco?', a: 'Los Yacos destacan aprendiendo entre 200 y 1 000 palabras. Con entrenamiento diario pueden construir frases con sentido contextual, no solo imitación fonética.' },
      { q: '¿Cuánto vive un Loro Gris Africano en cautividad?', a: 'Con cuidados adecuados los Yacos viven entre 50 y 70 años. Es un compromiso a largo plazo que recomendamos valorar antes de la adopción.' },
      { q: '¿Necesita el Yaco mucha atención diaria?', a: 'Sí. El Yaco es una especie muy social que requiere al menos 2-3 horas de interacción diaria. El aislamiento prolongado genera comportamientos destructivos o plumafagia.' },
      { q: '¿Qué come un Yaco?', a: 'Su dieta ideal combina pienso de alta calidad (60 %), frutas y verduras frescas (30 %) y fuentes de calcio. Consulta nuestra <a href="/conocimiento/nutricion/">guía de nutrición para loros</a>.' },
      { q: '¿Es el Yaco adecuado para principiantes?', a: 'Por su sensibilidad emocional y sus altos requerimientos de estímulo, el Yaco es más adecuado para propietarios con experiencia previa en psitácidos. Recomendamos leer nuestra <a href="/conocimiento/guias-principiantes/">guía para principiantes</a> antes de decidir.' },
      { q: '¿Se puede enviar un Yaco a toda España?', a: 'Sí. Realizamos envíos seguros a toda España y a varios países de Europa con documentación CITES y acondicionamiento veterinario. Consulta el proceso en nuestra página de <a href="/transporte">transporte de aves</a>.' },
      { q: '¿El Yaco necesita CITES?', a: 'Sí. El Loro Gris Africano está incluido en el Apéndice II de CITES. Todos nuestros Yacos disponen de documentación oficial completa.' },
      { q: '¿Cuándo puedo ver los Yacos disponibles?', a: 'Publicamos los pichones disponibles en cuanto están listos para su nuevo hogar. Escríbenos a través de nuestro <a href="/#contacto">formulario de contacto</a> para recibir una alerta.' },
    ],
    relatedSlugs: ['guacamayos', 'amazonas', 'cacatuas'],
    relatedSpeciesLabels: ['Guacamayos', 'Amazonas', 'Cacatúas'],
  },
  {
    slug:        'guacamayos',
    name:        'Guacamayos',
    latinName:   'Ara spp.',
    subtitle:    'Macaws',
    img:         '/images/guacamayo-azul-01.webp',
    imgAlt:      'Guacamayo Azul y Amarillo criado a mano en España',
    size:        'grande',
    habla:       'muy-hablador',
    familia:     'si',
    principiante:'no',
    apartamento: 'no',
    tags:        ['CITES Apéndice I / II', 'Criado a mano', 'Plumaje espectacular'],
    seoTitle:    'Guacamayos en España — Macaws Criados a Mano | Paraíso de Aves',
    seoDesc:     'Guacamayos criados a mano en Llíria, Valencia. Azul y Amarillo, Escarlata, Jacinto y Catalina con CITES. Envíos a toda España y Europa.',
    h1:          'Guacamayos — Macaws Criados a Mano',
    intro:       `Los <strong>Guacamayos</strong> (género <em>Ara</em>) son los loros más grandes y espectaculares del mundo. Su plumaje vibrante, su inteligencia y su capacidad de vocalización los convierten en aves únicas. En Paraíso de Aves criamos a mano las variedades más solicitadas: <strong>Guacamayo Azul y Amarillo</strong>, <strong>Escarlata</strong>, <strong>Jacinto</strong> y el exclusivo <strong>Guacamayo Catalina</strong>. Todos salen con <a href="/blog/cites-loros-espana.html">documentación CITES</a> y <a href="/garantia-de-salud">garantía veterinaria</a>.`,
    faqs: [
      { q: '¿Qué variedades de Guacamayo tenéis disponibles?', a: 'Criamos Guacamayo Azul y Amarillo (Ara ararauna), Escarlata (Ara macao), Jacinto (Anodorhynchus hyacinthinus) y el híbrido Catalina. La disponibilidad varía por temporada.' },
      { q: '¿Cuánto vive un Guacamayo?', a: 'Los Guacamayos pueden vivir entre 60 y 80 años. Adoptar un Guacamayo es una decisión de por vida.' },
      { q: '¿Son los Guacamayos adecuados para vivir en piso?', a: 'Por su tamaño y volumen vocal, los Guacamayos son más adecuados para casas con espacio exterior o jardín. Necesitan jaulas muy grandes y vuelo libre diario.' },
      { q: '¿Qué espacio necesita un Guacamayo?', a: 'Una jaula mínima de 120 × 80 × 150 cm para la especie mediana, y sensiblemente mayor para el Jacinto. Consulta nuestra <a href="/conocimiento/instalaciones/">guía de instalaciones</a>.' },
      { q: '¿Los Guacamayos muerden mucho?', a: 'Sin una socialización adecuada desde pequeños pueden desarrollar mordidas fuertes. Nuestros pichones criados a mano tienen un carácter muy moldeable con el entrenamiento correcto.' },
      { q: '¿Necesitan CITES los Guacamayos?', a: 'Sí, en distintos Apéndices. El Jacinto está en Apéndice I; Azul y Amarillo y Escarlata en Apéndice II. Todos nuestros ejemplares salen con documentación oficial.' },
      { q: '¿Cuánto cuesta un Guacamayo?', a: 'El precio varía por especie. Consulta nuestra <a href="/#contacto">página de contacto</a> para recibir información actualizada de precios y disponibilidad.' },
      { q: '¿Enviáis Guacamayos fuera de España?', a: 'Sí, realizamos envíos a toda la Unión Europea con acondicionamiento especializado y documentación completa. Consulta los detalles en <a href="/transporte">nuestra página de transporte</a>.' },
    ],
    relatedSlugs: ['yacos', 'cacatuas', 'amazonas'],
    relatedSpeciesLabels: ['Yacos', 'Cacatúas', 'Amazonas'],
  },
  {
    slug:        'cacatuas',
    name:        'Cacatúas',
    latinName:   'Cacatua spp.',
    subtitle:    'Cockatoos',
    img:         '/images/cacatua-01.webp',
    imgAlt:      'Cacatúa Blanca criada a mano en criadero español',
    size:        'grande',
    habla:       'moderado',
    familia:     'si',
    principiante:'no',
    apartamento: 'no',
    tags:        ['CITES Apéndice I / II', 'Criada a mano', 'Muy afectuosa'],
    seoTitle:    'Cacatúas en España — Criadas a Mano con CITES | Paraíso de Aves',
    seoDesc:     'Cacatúas Blanca, Galah y Goffin criadas a mano en Llíria, Valencia. Documentación CITES completa. Envíos a toda España y Europa.',
    h1:          'Cacatúas — Criadas a Mano en España',
    intro:       `Las <strong>Cacatúas</strong> son famosas por su carácter afectuoso, su penacho distintivo y su necesidad de compañía constante. En Paraíso de Aves criamos a mano las variedades más demandadas: <strong>Cacatúa Blanca</strong> (<em>Cacatua alba</em>), <strong>Cacatúa Galah</strong> (<em>Eolophus roseicapilla</em>) y <strong>Cacatúa de Goffin</strong> (<em>Cacatua goffiniana</em>). Todas cuentan con <a href="/blog/cites-loros-espana.html">documentación CITES</a> y <a href="/garantia-de-salud">garantía de salud</a>.`,
    faqs: [
      { q: '¿Qué variedades de Cacatúa criáis?', a: 'Criamos Cacatúa Blanca (Cacatua alba), Cacatúa Galah (Eolophus roseicapilla) y Cacatúa de Goffin (Cacatua goffiniana). Consulta disponibilidad actual por contacto.' },
      { q: '¿Son las Cacatúas muy ruidosas?', a: 'Las Cacatúas son aves vocales. Sus llamadas pueden ser intensas. No son las más recomendadas para pisos sin aislamiento acústico.' },
      { q: '¿Cuánto vive una Cacatúa?', a: 'Las Cacatúas grandes viven entre 40 y 70 años; las más pequeñas como la Goffin entre 25 y 40 años.' },
      { q: '¿Las Cacatúas necesitan compañía constante?', a: 'Sí. Las Cacatúas son extremadamente sociales. La soledad prolongada genera plumafagia y automutilación. Consulta nuestra <a href="/conocimiento/comportamiento/">guía de comportamiento</a>.' },
      { q: '¿Qué come una Cacatúa?', a: 'Base de pienso de calidad (60 %), frutas y verduras frescas (30 %), semillas y nueces como premio (10 %). Detalle completo en nuestra <a href="/conocimiento/nutricion/">guía de nutrición</a>.' },
      { q: '¿Las Cacatúas necesitan CITES?', a: 'Sí. Todos los ejemplares llevan documentación CITES del Apéndice correspondiente.' },
      { q: '¿Son adecuadas para familias con niños?', a: 'Sí, con supervisión. Las Cacatúas criadas a mano son muy afectuosas con niños. Recomendamos socialización progresiva.' },
      { q: '¿Puedo visitar el criadero antes de adoptar?', a: 'Sí, atendemos visitas concertadas. Contáctanos a través de nuestro <a href="/#contacto">formulario</a> para fijar una cita.' },
    ],
    relatedSlugs: ['yacos', 'ninfas', 'guacamayos'],
    relatedSpeciesLabels: ['Yacos', 'Ninfas', 'Guacamayos'],
  },
  {
    slug:        'amazonas',
    name:        'Amazonas',
    latinName:   'Amazona spp.',
    subtitle:    'Amazon Parrots',
    img:         '/images/loro-amazonico-01.webp',
    imgAlt:      'Amazona loro amazónico hablador criado a mano en España',
    size:        'mediano',
    habla:       'muy-hablador',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['CITES Apéndice II', 'Criada a mano', 'Gran habladora'],
    seoTitle:    'Amazonas (Loros Amazónicos) en España | Paraíso de Aves',
    seoDesc:     'Loros Amazónicos criados a mano con CITES. Amazona Ala Naranja y Nuca Amarilla disponibles en España y Europa. Consúltanos sin compromiso.',
    h1:          'Amazonas — Loros Amazónicos',
    intro:       `Las <strong>Amazonas</strong> (género <em>Amazona</em>) son los loros habladores por excelencia. Su capacidad de imitación, su carácter expresivo y su tamaño manejable las convierten en una de las especies más populares de España. En Paraíso de Aves criamos <strong>Amazona Ala Naranja</strong> (<em>Amazona amazonica</em>) y <strong>Amazona Nuca Amarilla</strong> (<em>Amazona auropalliata</em>), con <a href="/blog/cites-loros-espana.html">documentación CITES</a> y <a href="/garantia-de-salud">garantía veterinaria</a> incluidas.`,
    faqs: [
      { q: '¿Qué variedades de Amazona tenéis?', a: 'Criamos Amazona Ala Naranja (Amazona amazonica) y Amazona Nuca Amarilla (Amazona auropalliata). La disponibilidad es estacional.' },
      { q: '¿Cuántas palabras aprende una Amazona?', a: 'Las Amazonas aprenden entre 100 y 200 palabras con relativa facilidad. Son especialmente buenas imitando entonaciones y canciones.' },
      { q: '¿Las Amazonas son fáciles de cuidar?', a: 'Comparadas con el Yaco o el Guacamayo, las Amazonas son más tolerantes y adaptables, lo que las hace adecuadas para propietarios con algo de experiencia. Consulta nuestra <a href="/conocimiento/guias-principiantes/">guía introductoria</a>.' },
      { q: '¿Cuánto vive una Amazona?', a: 'Entre 40 y 60 años con cuidados adecuados.' },
      { q: '¿Son ruidosas las Amazonas?', a: 'Moderadamente. Tienen picos vocales al amanecer y al atardecer, pero no son tan intensas como los Guacamayos o las Cacatúas.' },
      { q: '¿Las Amazonas necesitan CITES?', a: 'Sí, todas las Amazonas están incluidas en el Apéndice II de CITES. Todos nuestros ejemplares salen con documentación oficial.' },
      { q: '¿Son buenas con niños?', a: 'Sí. Las Amazonas criadas a mano son afectuosas y tolerantes. Se recomienda supervisión con niños pequeños hasta que el loro conozca a los miembros del hogar.' },
      { q: '¿Hacéis envíos de Amazonas a Europa?', a: 'Sí, enviamos a toda la UE con acondicionamiento y CITES. Consulta detalles en <a href="/transporte">nuestra página de transporte</a>.' },
    ],
    relatedSlugs: ['yacos', 'pionus', 'eclectus'],
    relatedSpeciesLabels: ['Yacos', 'Pionus', 'Eclectus'],
  },
  {
    slug:        'eclectus',
    name:        'Eclectus',
    latinName:   'Eclectus roratus',
    subtitle:    'Eclectus Parrot',
    img:         '/images/eclectus-01.webp',
    imgAlt:      'Eclectus loro dimorfismo sexual rojo verde criado en España',
    size:        'mediano',
    habla:       'moderado',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['CITES Apéndice II', 'Dimorfismo sexual', 'Dieta especializada'],
    seoTitle:    'Eclectus en España — Criados a Mano con CITES | Paraíso de Aves',
    seoDesc:     'Loros Eclectus criados a mano en España. Macho verde intenso, hembra rojo y azul. Documentación CITES. Envíos a toda España y Europa.',
    h1:          'Eclectus — El Loro del Dimorfismo Perfecto',
    intro:       `El <strong>Eclectus</strong> (<em>Eclectus roratus</em>) es uno de los loros más llamativos del mundo gracias a su pronunciado <strong>dimorfismo sexual</strong>: el macho luce un verde esmeralda brillante mientras que la hembra muestra un espectacular rojo y azul. En Paraíso de Aves los criamos a mano siguiendo una dieta alta en frutas y verduras, clave para mantener su plumaje en óptimas condiciones. Cada ave sale con <a href="/blog/cites-loros-espana.html">documentación CITES</a> y <a href="/garantia-de-salud">garantía de salud</a>.`,
    faqs: [
      { q: '¿Por qué el macho y la hembra Eclectus son tan diferentes?', a: 'El Eclectus presenta uno de los dimorfismos sexuales más pronunciados de las aves. Se pensó durante mucho tiempo que eran dos especies distintas.' },
      { q: '¿Qué come un Eclectus?', a: 'El Eclectus requiere una dieta alta en frutas y verduras frescas (50-60 %). Su metabolismo es diferente al de otras especies: no tolera bien los piensos convencionales con colorantes artificiales.' },
      { q: '¿Es el Eclectus adecuado para principiantes?', a: 'Con información previa, sí. Es más tranquilo y menos demandante que el Yaco. Leer nuestra <a href="/conocimiento/nutricion/">guía de nutrición</a> es imprescindible antes de adoptarlo.' },
      { q: '¿Cuánto vive un Eclectus?', a: 'Entre 30 y 50 años en cautividad con cuidados adecuados.' },
      { q: '¿Hablan bien los Eclectus?', a: 'Aprenden un vocabulario moderado (50-200 palabras) con voz clara y bien articulada. No son los más habladores, pero destacan por la claridad de su pronunciación.' },
      { q: '¿Necesita el Eclectus documentación CITES?', a: 'Sí, está incluido en el Apéndice II de CITES. Todos nuestros ejemplares llevan documentación oficial.' },
      { q: '¿Son tranquilos los Eclectus?', a: 'Sí, comparados con otras especies grandes son más calmados y menos propensos a gritar. Son una buena opción para apartamentos con vecinos sensibles al ruido.' },
      { q: '¿Dónde puedo ver los Eclectus disponibles?', a: 'Puedes consultarnos la disponibilidad actual a través de nuestro <a href="/#contacto">formulario de contacto</a>.' },
    ],
    relatedSlugs: ['amazonas', 'yacos', 'pionus'],
    relatedSpeciesLabels: ['Amazonas', 'Yacos', 'Pionus'],
  },
  {
    slug:        'conuros',
    name:        'Conuros',
    latinName:   'Aratinga / Pyrrhura spp.',
    subtitle:    'Conures',
    img:         '/images/conuro-01.webp',
    imgAlt:      'Conuro del Sol naranja criado a mano en España',
    size:        'pequeño',
    habla:       'moderado',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['Criado a mano', 'Juguetón', 'Colorido'],
    seoTitle:    'Conuros en España — Criados a Mano | Paraíso de Aves',
    seoDesc:     'Conuros del Sol, Jenday y Mejilla Verde criados a mano en España. Aves juguetoras y afectuosas. Envíos a toda España y Europa.',
    h1:          'Conuros — Pequeños Loros con Gran Personalidad',
    intro:       `Los <strong>Conuros</strong> son loros de tamaño pequeño a mediano con una personalidad desbordante. Juguetones, curiosos y muy afectuosos, son ideales para familias y para propietarios con poca experiencia previa. En Paraíso de Aves criamos a mano el <strong>Conuro del Sol</strong> (<em>Aratinga solstitialis</em>), el <strong>Conuro Jenday</strong> (<em>Aratinga jandaya</em>) y el <strong>Conuro Mejilla Verde</strong> (<em>Pyrrhura molinae</em>). Todos con <a href="/garantia-de-salud">garantía de salud</a>.`,
    faqs: [
      { q: '¿Qué variedades de Conuro criáis?', a: 'Criamos Conuro del Sol, Conuro Jenday y Conuro Mejilla Verde. Cada uno tiene su carácter particular; te asesoramos para elegir el más adecuado.' },
      { q: '¿Son ruidosos los Conuros?', a: 'El Conuro del Sol y el Jenday son conocidos por sus llamadas agudas e intensas. El Mejilla Verde es sensiblemente más silencioso y apto para apartamentos.' },
      { q: '¿Cuánto vive un Conuro?', a: 'Entre 20 y 35 años según la especie.' },
      { q: '¿Son buenos para principiantes?', a: 'Sí, los Conuros son una de las mejores primeras aves. Son resistentes, sociales y fáciles de manejar. Consulta nuestra <a href="/conocimiento/guias-principiantes/">guía para principiantes</a>.' },
      { q: '¿Hablan los Conuros?', a: 'Aprenden algunas palabras y frases cortas, pero no son los más habladores. Su fortaleza es el juego y la interacción física.' },
      { q: '¿Los Conuros necesitan CITES?', a: 'Depende de la especie. El Conuro del Sol requiere CITES Apéndice II. El Mejilla Verde no necesita CITES pero sí anilla de criadero. Todos nuestros ejemplares cuentan con la documentación correcta.' },
      { q: '¿Cuánto espacio necesita un Conuro?', a: 'Una jaula mínima de 80 × 60 × 80 cm es suficiente, pero el vuelo libre diario es imprescindible. Consulta más en nuestra <a href="/conocimiento/instalaciones/">guía de instalaciones</a>.' },
      { q: '¿Hacéis envíos de Conuros a toda España?', a: 'Sí, con acondicionamiento especializado y documentación completa. Consulta los detalles en <a href="/transporte">nuestra página de transporte</a>.' },
    ],
    relatedSlugs: ['agapornis', 'ninfas', 'periquitos'],
    relatedSpeciesLabels: ['Agapornis', 'Ninfas', 'Periquitos'],
  },
  {
    slug:        'agapornis',
    name:        'Agapornis',
    latinName:   'Agapornis spp.',
    subtitle:    'Inseparables',
    img:         '/images/conuro-mejilla-verde/conuro-mejilla-verde-01.webp',
    imgAlt:      'Agapornis inseparable pequeño loro colorido criado a mano',
    size:        'pequeño',
    habla:       'poco',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['Criado a mano', 'Ideal para parejas', 'Tamaño compacto'],
    seoTitle:    'Agapornis (Inseparables) en España | Paraíso de Aves',
    seoDesc:     'Agapornis inseparables criados a mano en España. Pequeños loros coloridos, ideales para familias y apartamentos. Consúltanos.',
    h1:          'Agapornis — Los Inseparables',
    intro:       `Los <strong>Agapornis</strong>, conocidos popularmente como <strong>Inseparables</strong>, son pequeños loros africanos famosos por sus colores llamativos y su fuerte vínculo de pareja. Son una de las aves más populares para hogares con espacio reducido. En Paraíso de Aves los criamos a mano garantizando un temperamento dócil y una excelente socialización. Consulta disponibilidad actual a través de nuestro <a href="/#contacto">formulario de contacto</a>.`,
    faqs: [
      { q: '¿Pueden vivir solos los Agapornis?', a: 'Aunque en la naturaleza forman parejas inseparables, un Agapornis criado a mano y con mucha interacción diaria puede vivir solo. Si vas a estar mucho tiempo fuera de casa, es mejor adoptar dos.' },
      { q: '¿Hablan los Agapornis?', a: 'Raramente. Son aves vocales con gorjeos propios, pero no suelen articular palabras claras como otras especies.' },
      { q: '¿Cuánto vive un Agapornis?', a: 'Entre 10 y 15 años de media, con algunos individuos superando los 20 años.' },
      { q: '¿Son buenos para principiantes?', a: 'Sí. Su tamaño manejable y su carácter adaptable los hacen ideales para quienes adoptan un loro por primera vez.' },
      { q: '¿Qué espacio necesita un Agapornis?', a: 'Una jaula de al menos 60 × 40 × 50 cm, aunque siempre cuanto más grande mejor. Detalle en nuestra <a href="/conocimiento/instalaciones/">guía de instalaciones</a>.' },
      { q: '¿Los Agapornis necesitan CITES?', a: 'La mayoría de las especies de Agapornis criadas en cautividad no requieren CITES, pero sí anilla de criadero. Cada ejemplar lleva la documentación reglamentaria.' },
      { q: '¿Son adecuados para niños?', a: 'Sí, aunque sus picos pueden pellizcar si se sienten asustados. Siempre recomendamos supervisión con niños menores de 8 años.' },
      { q: '¿Puedo tener un Agapornis en un apartamento?', a: 'Perfectamente. Su volumen vocal es bajo comparado con otras especies y su espacio de vuelo requerido es reducido.' },
    ],
    relatedSlugs: ['conuros', 'ninfas', 'periquitos'],
    relatedSpeciesLabels: ['Conuros', 'Ninfas', 'Periquitos'],
  },
  {
    slug:        'loris',
    name:        'Loris',
    latinName:   'Trichoglossus / Lorius spp.',
    subtitle:    'Lorikeets',
    img:         '/images/lorikeet-arcoiris/lorikeet-arcoiris-01.webp',
    imgAlt:      'Loris Lorikeet Arcoíris colorido criado a mano en España',
    size:        'pequeño',
    habla:       'poco',
    familia:     'si',
    principiante:'no',
    apartamento: 'si',
    tags:        ['Dieta nectarívora', 'Colores únicos', 'Criado a mano'],
    seoTitle:    'Loris y Lorikeets en España | Paraíso de Aves',
    seoDesc:     'Loris y Lorikeets criados a mano en España. Aves nectarívoras de colores espectaculares con cuidados especializados. Consúltanos.',
    h1:          'Loris y Lorikeets — El Arcoíris Emplumado',
    intro:       `Los <strong>Loris</strong> y <strong>Lorikeets</strong> son una subfamilia de loros caracterizados por su plumaje multicolor extraordinario y su dieta <strong>nectarívora</strong>. A diferencia del resto de psitácidos, se alimentan principalmente de néctar, polen y frutas blandas en lugar de semillas. En Paraíso de Aves criamos el <strong>Lorikeet Arcoíris</strong> (<em>Trichoglossus moluccanus</em>), el más popular de la familia. Cada ave sale con <a href="/garantia-de-salud">garantía de salud</a> y asesoría nutricional especializada.`,
    faqs: [
      { q: '¿Qué comen los Loris?', a: 'Su dieta principal es néctar líquido comercial especializado (60-70 %), complementado con frutas blandas (papaya, melón, kiwi) y algo de verdura. No toleran las semillas como alimento principal. Consulta nuestra <a href="/conocimiento/nutricion/">guía de nutrición</a>.' },
      { q: '¿Sus deposiciones son muy líquidas?', a: 'Sí. La dieta nectarívora genera deposiciones más líquidas y frecuentes. Requieren una limpieza más regular de la jaula.' },
      { q: '¿Son los Loris adecuados para principiantes?', a: 'Sus requerimientos dietéticos especiales los hacen más exigentes. Recomendamos informarse bien antes de adoptar uno. Consulta nuestra <a href="/conocimiento/guias-principiantes/">guía de inicio</a>.' },
      { q: '¿Hablan los Loris?', a: 'Aprenden algunas palabras pero no son grandes habladores. Destacan por sus gorjeos y vocalizaciones musicales.' },
      { q: '¿Cuánto vive un Lorikeet?', a: 'Entre 15 y 25 años con cuidados adecuados.' },
      { q: '¿Necesitan CITES?', a: 'El Lorikeet Arcoíris está incluido en el Apéndice II de CITES. Todos nuestros ejemplares llevan documentación oficial.' },
      { q: '¿Son apropiados para vivir en apartamento?', a: 'Son relativamente silenciosos y de tamaño pequeño, lo que los hace viables en piso. La mayor consideración es la frecuencia de limpieza.' },
      { q: '¿Puedo ver los Lorikeets disponibles?', a: 'Contáctanos a través de nuestro <a href="/#contacto">formulario</a> para conocer la disponibilidad actual.' },
    ],
    relatedSlugs: ['conuros', 'agapornis', 'periquitos'],
    relatedSpeciesLabels: ['Conuros', 'Agapornis', 'Periquitos'],
  },
  {
    slug:        'ninfas',
    name:        'Ninfas',
    latinName:   'Nymphicus hollandicus',
    subtitle:    'Cacatúas Ninfa',
    img:         '/images/homepage/cockatoo-resting-content.webp',
    imgAlt:      'Ninfa Cacatúa Ninfa Carolina criada a mano en España',
    size:        'pequeño',
    habla:       'moderado',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['Criada a mano', 'Ideal para principiantes', 'Silbidos musicales'],
    seoTitle:    'Ninfas (Cacatúas Ninfa) en España | Paraíso de Aves',
    seoDesc:     'Ninfas criadas a mano en España. La Cacatúa Ninfa Carolina es ideal para principiantes y familias. Envíos a toda España.',
    h1:          'Ninfas — La Cacatúa Ninfa Carolina',
    intro:       `La <strong>Ninfa</strong> (<em>Nymphicus hollandicus</em>), también llamada <strong>Cacatúa Ninfa</strong> o <strong>Carolina</strong>, es una de las aves de compañía más populares del mundo. Su carácter dócil, sus silbidos melódicos y su tamaño compacto la hacen perfecta para familias y para quienes adoptan un loro por primera vez. En Paraíso de Aves las criamos a mano desde el primer día, garantizando un temperamento tranquilo y sociable. Consulta disponibilidad actual en nuestro <a href="/#contacto">formulario de contacto</a>.`,
    faqs: [
      { q: '¿Son fáciles de cuidar las Ninfas?', a: 'Sí, son una de las aves más fáciles de cuidar. Son robustas, tolerantes y adaptables a distintos horarios y rutinas.' },
      { q: '¿Hablan las Ninfas?', a: 'Los machos aprenden a silbar melodías complejas y algunas palabras. Las hembras son más silenciosas. No son grandes imitadoras de voz humana.' },
      { q: '¿Cuánto vive una Ninfa?', a: 'Entre 15 y 25 años con cuidados adecuados.' },
      { q: '¿Son ruidosas?', a: 'No especialmente. Su volumen vocal es moderado, lo que las hace aptas para pisos y apartamentos.' },
      { q: '¿Necesitan compañía?', a: 'Se adaptan bien tanto en solitario (con mucha interacción humana diaria) como en pareja. Si trabajas fuera muchas horas, se recomienda adoptar dos.' },
      { q: '¿Necesitan CITES las Ninfas?', a: 'No. Las Ninfas criadas en cautividad no requieren CITES, pero sí anilla de criadero que acredita su origen legal.' },
      { q: '¿Son buenas con niños?', a: 'Sí. Son una de las especies más recomendadas para familias con niños por su temperamento tranquilo y su resistencia.' },
      { q: '¿Qué espacio necesita una Ninfa?', a: 'Una jaula mínima de 60 × 40 × 60 cm, con vuelo libre supervisado diario. Más información en nuestra <a href="/conocimiento/instalaciones/">guía de instalaciones</a>.' },
    ],
    relatedSlugs: ['agapornis', 'periquitos', 'conuros'],
    relatedSpeciesLabels: ['Agapornis', 'Periquitos', 'Conuros'],
  },
  {
    slug:        'pionus',
    name:        'Pionus',
    latinName:   'Pionus spp.',
    subtitle:    'Loros Pionus',
    img:         '/images/loro-pionus/loro-pionus-01.webp',
    imgAlt:      'Loro Pionus azul cabeza roja criado a mano en España',
    size:        'mediano',
    habla:       'moderado',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['CITES Apéndice II', 'Carácter tranquilo', 'Poco ruidoso'],
    seoTitle:    'Loros Pionus en España — Criados a Mano | Paraíso de Aves',
    seoDesc:     'Loros Pionus criados a mano con CITES. Carácter tranquilo, ideal para familias y apartamentos. Envíos a toda España y Europa.',
    h1:          'Pionus — El Loro Tranquilo',
    intro:       `Los <strong>Loros Pionus</strong> son conocidos como «el loro tranquilo». A diferencia de las Cacatúas o los Guacamayos, los Pionus tienen un carácter más calmado y un nivel vocal inferior, lo que los convierte en una excelente opción para apartamentos y familias que prefieren una mascota serena. En Paraíso de Aves criamos <strong>Pionus Cabeza Azul</strong> (<em>Pionus menstruus</em>) y <strong>Pionus de Maximilian</strong> (<em>Pionus maximiliani</em>), con <a href="/blog/cites-loros-espana.html">documentación CITES</a> y <a href="/garantia-de-salud">garantía veterinaria</a>.`,
    faqs: [
      { q: '¿Qué variedades de Pionus criáis?', a: 'Criamos Pionus Cabeza Azul (Pionus menstruus) y Pionus de Maximilian (Pionus maximiliani). Consulta disponibilidad por temporada.' },
      { q: '¿Son los Pionus buenos para principiantes?', a: 'Sí. Su carácter tranquilo y su nivel de exigencia moderado los hacen adecuados para quienes tienen poca experiencia con loros.' },
      { q: '¿Hablan bien los Pionus?', a: 'Aprenden un vocabulario moderado de 50-100 palabras. Su voz tiende a ser más ronca que la de las Amazonas, pero son constantes en el aprendizaje.' },
      { q: '¿Son ruidosos?', a: 'No. Son una de las especies de tamaño mediano menos ruidosas. Ideales para comunidades de vecinos.' },
      { q: '¿Cuánto vive un Pionus?', a: 'Entre 25 y 40 años con los cuidados apropiados.' },
      { q: '¿Los Pionus necesitan CITES?', a: 'Sí, están incluidos en el Apéndice II de CITES. Todos nuestros ejemplares llevan documentación oficial.' },
      { q: '¿Se adaptan bien a familias con niños?', a: 'Sí. Su temperamento pausado los hace buenos compañeros para niños que respetan el espacio del ave.' },
      { q: '¿Puedo solicitar un Pionus con anticipación?', a: 'Sí. Puedes reservar un pichón antes de que esté listo para su nuevo hogar. Contáctanos en nuestro <a href="/#contacto">formulario</a>.' },
    ],
    relatedSlugs: ['amazonas', 'eclectus', 'yacos'],
    relatedSpeciesLabels: ['Amazonas', 'Eclectus', 'Yacos'],
  },
  {
    slug:        'cotorras-quaker',
    name:        'Cotorras Quaker',
    latinName:   'Myiopsitta monachus',
    subtitle:    'Cotorra Monje',
    img:         '/images/cacatua-goffin/cacatua-goffin-01.webp',
    imgAlt:      'Cotorra Quaker Cotorra Monje criada a mano en España',
    size:        'pequeño',
    habla:       'moderado',
    familia:     'si',
    principiante:'si',
    apartamento: 'no',
    tags:        ['CITES Apéndice III', 'Muy habladora', 'Sociable'],
    seoTitle:    'Cotorras Quaker (Cotorra Monje) en España | Paraíso de Aves',
    seoDesc:     'Cotorras Quaker criadas a mano en España. Gran capacidad para hablar y carácter sociable. CITES Apéndice III. Envíos a toda España.',
    h1:          'Cotorras Quaker — La Cotorra Monje',
    intro:       `La <strong>Cotorra Quaker</strong> o <strong>Cotorra Monje</strong> (<em>Myiopsitta monachus</em>) es uno de los loros más inteligentes de su tamaño. Famosa por su facilidad para aprender palabras y frases, su carácter sociable y su adaptabilidad, es una de las aves de compañía más queridas en España. En Paraíso de Aves las criamos a mano garantizando una socialización óptima desde el primer día. Consulta disponibilidad en nuestro <a href="/#contacto">formulario de contacto</a>.`,
    faqs: [
      { q: '¿La Cotorra Monje necesita CITES?', a: 'Sí, está incluida en el Apéndice III de CITES. En España también requiere registro en el SEPRONA para algunas comunidades autónomas. Todos nuestros ejemplares llevan documentación completa.' },
      { q: '¿Hablan bien las Cotorras Quaker?', a: 'Sí, son una de las especies pequeñas con mayor capacidad verbal. Aprenden 100-300 palabras con entrenamiento regular.' },
      { q: '¿Son ruidosas?', a: 'Tienen un nivel vocal alto para su tamaño. No son las más recomendadas para pisos con paredes finas.' },
      { q: '¿Son buenas para principiantes?', a: 'Sí. Son robustas y adaptables, con requerimientos dietéticos y de espacio muy asequibles.' },
      { q: '¿Cuánto vive una Cotorra Monje?', a: 'Entre 15 y 25 años con buenos cuidados.' },
      { q: '¿Se llevan bien con otras aves?', a: 'En general sí, aunque pueden ser territoriales con la jaula. Se recomienda supervisión en la convivencia con otras especies.' },
      { q: '¿Qué espacio necesita una Cotorra Quaker?', a: 'Una jaula mínima de 70 × 50 × 70 cm. Consulta más en nuestra <a href="/conocimiento/instalaciones/">guía de instalaciones</a>.' },
      { q: '¿Dónde puedo ver las disponibles?', a: 'Consúltanos a través de nuestro <a href="/#contacto">formulario de contacto</a> para información actualizada.' },
    ],
    relatedSlugs: ['conuros', 'agapornis', 'ninfas'],
    relatedSpeciesLabels: ['Conuros', 'Agapornis', 'Ninfas'],
  },
  {
    slug:        'rosellas',
    name:        'Rosellas',
    latinName:   'Platycercus spp.',
    subtitle:    'Roselas Australianas',
    img:         '/images/periquito-alejandrino/periquito-alejandrino-01.webp',
    imgAlt:      'Rosella Rosela australiana colorida criada en España',
    size:        'pequeño',
    habla:       'poco',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['Criada a mano', 'Colores vivos', 'Australiana'],
    seoTitle:    'Rosellas (Roselas) en España — Criadas a Mano | Paraíso de Aves',
    seoDesc:     'Rosellas australianas criadas a mano en España. Aves de colores vivos, tranquilas y resistentes. Consulta disponibilidad en Paraíso de Aves.',
    h1:          'Rosellas — Roselas Australianas',
    intro:       `Las <strong>Rosellas</strong> (género <em>Platycercus</em>) son loros australianos conocidos por su plumaje multicolor excepcionalmente vistoso. Aunque son menos verbales que otras especies, su belleza visual y su carácter tranquilo las convierten en aves muy apreciadas. En Paraíso de Aves las criamos a mano con atención veterinaria constante. Consulta disponibilidad actual a través de nuestro <a href="/#contacto">formulario de contacto</a>.`,
    faqs: [
      { q: '¿Hablan las Rosellas?', a: 'Poco. Pueden aprender algunas frases pero no son conocidas por su capacidad verbal. Destacan por sus vocalizaciones musicales.' },
      { q: '¿Son buenas para principiantes?', a: 'Sí. Son robustas y de bajo mantenimiento comparadas con especies más exigentes.' },
      { q: '¿Cuánto vive una Rosella?', a: 'Entre 15 y 25 años con buena atención.' },
      { q: '¿Necesitan mucho espacio?', a: 'Más que otras especies de su tamaño. Son activas y les gusta volar. Se recomienda una jaula amplia o voladera.' },
      { q: '¿Son adecuadas para apartamento?', a: 'Sí siempre que dispongan de vuelo libre diario y una jaula suficientemente grande.' },
      { q: '¿Necesitan CITES?', a: 'Las Rosellas criadas en cautividad en la UE no requieren CITES en la mayoría de casos, pero sí anilla de criadero.' },
      { q: '¿Se llevan bien con otras aves?', a: 'Los machos pueden ser territoriales entre sí. Se recomienda alojar a machos por separado.' },
      { q: '¿Cómo puedo saber si tenéis Rosellas disponibles?', a: 'Contáctanos a través de nuestro <a href="/#contacto">formulario</a> y te informaremos de la disponibilidad actual.' },
    ],
    relatedSlugs: ['periquitos', 'ninfas', 'agapornis'],
    relatedSpeciesLabels: ['Periquitos', 'Ninfas', 'Agapornis'],
  },
  {
    slug:        'periquitos',
    name:        'Periquitos',
    latinName:   'Psittacula / Melopsittacus spp.',
    subtitle:    'Periquitos Australianos y Alejandrinos',
    img:         '/images/periquito-alejandrino/periquito-alejandrino-01.webp',
    imgAlt:      'Periquito Alejandrino verde criado a mano en España',
    size:        'pequeño',
    habla:       'poco',
    familia:     'si',
    principiante:'si',
    apartamento: 'si',
    tags:        ['Criado a mano', 'Económico', 'Muy popular'],
    seoTitle:    'Periquitos en España — Alejandrinos y Collar Indio | Paraíso de Aves',
    seoDesc:     'Periquitos Alejandrinos y de Collar Indio criados a mano en España. Aves resistentes, coloridas y asequibles. Envíos a toda España.',
    h1:          'Periquitos — Alejandrinos y Collar Indio',
    intro:       `Los <strong>Periquitos</strong> son una de las opciones más populares para quienes buscan un ave de compañía por primera vez. En Paraíso de Aves nos especializamos en dos especies de periquito más grandes: el <strong>Periquito Alejandrino</strong> (<em>Psittacula eupatria</em>) y el <strong>Periquito de Collar Indio</strong> (<em>Psittacula krameri</em>). Ambos se crían a mano, son resistentes y tienen una personalidad activa. Todos llevan <a href="/garantia-de-salud">garantía de salud</a>.`,
    faqs: [
      { q: '¿Qué tipo de periquitos criáis?', a: 'Criamos Periquito Alejandrino (Psittacula eupatria) y Periquito de Collar Indio (Psittacula krameri). Son periquitos de tamaño mediano, más grandes que el periquito australiano convencional.' },
      { q: '¿Hablan los Periquitos Alejandrinos?', a: 'Sí. Los machos aprenden 50-150 palabras con entrenamiento. Tienen una voz más clara y potente que el periquito australiano.' },
      { q: '¿Son fáciles de cuidar?', a: 'Sí, son de los loros más resistentes y adaptables. Perfectos para principiantes que quieren algo más grande que un periquito australiano.' },
      { q: '¿Cuánto vive un Periquito Alejandrino?', a: 'Entre 25 y 35 años con los cuidados apropiados.' },
      { q: '¿Necesitan CITES?', a: 'El Periquito de Collar Indio no requiere CITES pero sí anilla de criadero. El Alejandrino tampoco requiere CITES en la UE cuando es criado en cautividad.' },
      { q: '¿Son adecuados para apartamento?', a: 'Sí. Son moderadamente ruidosos y de tamaño manejable, aptos para pisos con espacio para una jaula mediana.' },
      { q: '¿Se pueden tener en pareja?', a: 'Perfectamente. Disfrutan de la compañía de otro ejemplar, aunque también se adaptan bien en solitario con interacción humana diaria.' },
      { q: '¿Dónde puedo ver los disponibles?', a: 'Consúltanos la disponibilidad actual a través de nuestro <a href="/#contacto">formulario de contacto</a>.' },
    ],
    relatedSlugs: ['agapornis', 'ninfas', 'conuros'],
    relatedSpeciesLabels: ['Agapornis', 'Ninfas', 'Conuros'],
  },
  {
    slug:        'tucanes',
    name:        'Tucanes',
    latinName:   'Ramphastos spp.',
    subtitle:    'Tucanes Tropicales',
    img:         '/images/homepage/toucan-portrait-closeup.webp',
    imgAlt:      'Tucán pico grande tropical colorido en España',
    size:        'mediano',
    habla:       'poco',
    familia:     'si',
    principiante:'no',
    apartamento: 'no',
    tags:        ['CITES Apéndice II', 'Dieta especializada', 'Ave exótica'],
    seoTitle:    'Tucanes en España — Aves Exóticas | Paraíso de Aves',
    seoDesc:     'Información sobre Tucanes como aves exóticas en España. Cuidados, dieta y legislación. Consulta disponibilidad en Paraíso de Aves.',
    h1:          'Tucanes — El Ave del Pico Legendario',
    intro:       `Los <strong>Tucanes</strong> (género <em>Ramphastos</em>) son aves tropicales icónicas por su enorme pico colorido. No son psitácidos pero forman parte de las aves exóticas más solicitadas. Su cuidado es especializado: requieren una dieta frugívora estricta, espacio de vuelo amplio y condiciones de temperatura controladas. En Paraíso de Aves ofrecemos información y asesoría sobre esta especie. Consulta disponibilidad a través de nuestro <a href="/#contacto">formulario de contacto</a>.`,
    faqs: [
      { q: '¿Los Tucanes son legales en España?', a: 'Los Tucanes incluidos en el Apéndice II de CITES son legales con la documentación correcta. Consulta el marco legal en nuestra página sobre <a href="/blog/cites-loros-espana.html">documentación CITES</a>.' },
      { q: '¿Qué come un Tucán?', a: 'Son frugívoros estrictos. Necesitan frutas variadas, bajas en hierro, como papaya, melón y arándanos. Los piensos para loros no son adecuados para ellos.' },
      { q: '¿Pueden vivir en piso?', a: 'No. Necesitan voladeras grandes y temperaturas tropicales estables. Son más adecuados para instalaciones con espacio exterior cubierto.' },
      { q: '¿Hablan los Tucanes?', a: 'No. Son aves vocales con llamadas propias, pero no imitan la voz humana.' },
      { q: '¿Cuánto vive un Tucán?', a: 'Entre 20 y 25 años en cautividad con los cuidados apropiados.' },
      { q: '¿Son animales de compañía habituales?', a: 'Son relativamente raros como mascotas en España. Requieren dueños muy comprometidos y con experiencia en aves exóticas.' },
      { q: '¿Tenéis Tucanes disponibles?', a: 'Consúltanos a través de nuestro <a href="/#contacto">formulario de contacto</a> para conocer la disponibilidad actual.' },
      { q: '¿Dónde puedo aprender más sobre el cuidado de Tucanes?', a: 'Consulta nuestra <a href="/conocimiento/guias-avanzadas/">guía para propietarios avanzados</a> o contáctanos directamente para asesoría personalizada.' },
    ],
    relatedSlugs: ['yacos', 'guacamayos', 'eclectus'],
    relatedSpeciesLabels: ['Yacos', 'Guacamayos', 'Eclectus'],
  },
  {
    slug:        'buhos',
    name:        'Búhos',
    latinName:   'Strigiformes',
    subtitle:    'Aves Rapaces Nocturnas',
    img:         '/images/homepage/african-grey-parrot-flying.webp',
    imgAlt:      'Búho rapaz nocturna ave exótica en España',
    size:        'mediano',
    habla:       'poco',
    familia:     'si',
    principiante:'no',
    apartamento: 'no',
    tags:        ['CITES Apéndice I / II', 'Rapaz nocturna', 'Especialista requerido'],
    seoTitle:    'Búhos en España — Aves Rapaces Exóticas | Paraíso de Aves',
    seoDesc:     'Información sobre Búhos como aves exóticas en España. Cuidados especializados, legislación CITES y disponibilidad. Consulta en Paraíso de Aves.',
    h1:          'Búhos — Rapaces Nocturnas Exóticas',
    intro:       `Los <strong>Búhos</strong> del orden <em>Strigiformes</em> son aves rapaces nocturnas conocidas por su silencio de vuelo y su capacidad visual extraordinaria. Como aves de compañía exóticas son extremadamente especializadas: requieren alimentación con presas completas, instalaciones apropiadas y una licencia específica en muchas comunidades autónomas de España. En Paraíso de Aves podemos orientarte sobre la legislación y los requerimientos. Consulta tu caso a través de nuestro <a href="/#contacto">formulario de contacto</a>.`,
    faqs: [
      { q: '¿Es legal tener un Búho en España?', a: 'La mayoría de los Búhos están protegidos por CITES Apéndice I o II y por legislación española. Solo determinadas especies criadas en cautividad son legales con permisos específicos. Consulta la <a href="/blog/cites-loros-espana.html">normativa vigente</a>.' },
      { q: '¿Qué come un Búho?', a: 'Carnívoros estrictos. Necesitan presas completas (ratones de un día, pollitos) para obtener los nutrientes necesarios. No se alimentan de pienso.' },
      { q: '¿Pueden vivir en piso?', a: 'No. Necesitan instalaciones especializadas con espacio para volar y perchas altas. No son aves de apartamento.' },
      { q: '¿Son buenos animales de compañía?', a: 'Son aves de comportamiento muy específico. No son aves de compañía convencionales. Requieren dueños con conocimiento avanzado en cetrería o rapaces.' },
      { q: '¿Hablan los Búhos?', a: 'No. Solo emiten vocalizaciones naturales propias de la especie.' },
      { q: '¿Se pueden amaestrar?', a: 'Pueden habituarse a la mano humana con entrenamiento de cetrería. No desarrollan el vínculo afectivo que sí tienen los loros.' },
      { q: '¿Tenéis Búhos disponibles?', a: 'Consúltanos directamente a través de nuestro <a href="/#contacto">formulario de contacto</a>.' },
      { q: '¿Dónde puedo aprender más sobre rapaces?', a: 'Visita nuestra <a href="/conocimiento/guias-avanzadas/">sección de guías avanzadas</a> o contáctanos para asesoría especializada.' },
    ],
    relatedSlugs: ['halcones', 'tucanes', 'yacos'],
    relatedSpeciesLabels: ['Halcones', 'Tucanes', 'Yacos'],
  },
  {
    slug:        'halcones',
    name:        'Halcones',
    latinName:   'Falco spp.',
    subtitle:    'Aves Rapaces Diurnas',
    img:         '/images/homepage/african-grey-parrot-flying.webp',
    imgAlt:      'Halcón rapaz diurna ave exótica en España',
    size:        'mediano',
    habla:       'poco',
    familia:     'no',
    principiante:'no',
    apartamento: 'no',
    tags:        ['CITES Apéndice I / II', 'Cetrería', 'Especialista requerido'],
    seoTitle:    'Halcones en España — Cetrería y Aves Rapaces | Paraíso de Aves',
    seoDesc:     'Información sobre Halcones en España. Cetrería, legislación CITES y cuidados especializados. Consulta en Paraíso de Aves.',
    h1:          'Halcones — Rapaces de Cetrería',
    intro:       `Los <strong>Halcones</strong> (género <em>Falco</em>) son aves rapaces diurnas de extraordinaria velocidad y agudeza visual. Son las aves más rápidas del planeta y han acompañado al ser humano durante milenios a través de la <strong>cetrería</strong>. Como aves de compañía exóticas en España están sujetas a legislación específica (CITES y permisos autonómicos). En Paraíso de Aves podemos orientarte sobre los requerimientos legales y de cuidado. Consúltanos a través de nuestro <a href="/#contacto">formulario de contacto</a>.`,
    faqs: [
      { q: '¿Es legal tener un Halcón en España?', a: 'Determinadas especies criadas en cautividad son legales con permisos autonómicos y documentación CITES. Consulta la <a href="/blog/cites-loros-espana.html">normativa CITES vigente</a>.' },
      { q: '¿Qué come un Halcón?', a: 'Carnívoros estrictos. Requieren presas completas (aves o mamíferos pequeños) y no se alimentan de pienso convencional.' },
      { q: '¿Qué es la cetrería?', a: 'La cetrería es el arte milenario de amaestrar aves rapaces para la caza. En España existe una comunidad activa y varias escuelas especializadas.' },
      { q: '¿Los Halcones se pueden tener como mascota convencional?', a: 'No. Son aves con necesidades muy específicas de espacio, dieta y entrenamiento. No son adecuados como mascotas convencionales.' },
      { q: '¿Cuánto vive un Halcón?', a: 'El Halcón Peregrino vive entre 15 y 25 años en cautividad.' },
      { q: '¿Necesitan CITES?', a: 'Sí. La mayoría de los Halcones están incluidos en Apéndice I o II de CITES.' },
      { q: '¿Tenéis Halcones disponibles?', a: 'Consúltanos a través de nuestro <a href="/#contacto">formulario de contacto</a> para información sobre disponibilidad.' },
      { q: '¿Dónde puedo informarme más?', a: 'Consulta nuestra <a href="/conocimiento/guias-avanzadas/">guía para propietarios avanzados</a> o contacta con nosotros directamente.' },
    ],
    relatedSlugs: ['buhos', 'tucanes', 'guacamayos'],
    relatedSpeciesLabels: ['Búhos', 'Tucanes', 'Guacamayos'],
  },
];

// ─── Page template ─────────────────────────────────────────────────────────────
function makePage(sp) {
  // Build slug → image lookup from SPECIES array
  const slugToImg = {};
  SPECIES.forEach(s => { slugToImg[s.slug] = { img: s.img, alt: s.imgAlt }; });

  const relatedCards = sp.relatedSlugs.map((slug, i) => {
    const thumb = slugToImg[slug];
    const thumbSrc = thumb ? thumb.img : '/images/logo/paraiso-de-aves-logo-light.png';
    const thumbAlt = thumb ? thumb.alt : sp.relatedSpeciesLabels[i];
    return `
      <a class="es-rel-card" href="/es/especies/${slug}/">
        <img class="es-rel-thumb" src="${thumbSrc}" alt="${thumbAlt}" width="52" height="52" loading="lazy">
        <span class="es-rel-name">${sp.relatedSpeciesLabels[i]}</span>
        <span class="es-rel-arrow">→</span>
      </a>`;
  }).join('');

  const faqItems = sp.faqs.map(f => `
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 class="faq-q" itemprop="name">${f.q}</h3>
          <div class="faq-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">${f.a}</p>
          </div>
        </div>`).join('');

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sp.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') }
    }))
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.paraisodeaves.com/' },
      { '@type': 'ListItem', position: 2, name: 'Especies', item: 'https://www.paraisodeaves.com/es/especies/' },
      { '@type': 'ListItem', position: 3, name: sp.name, item: `https://www.paraisodeaves.com/es/especies/${sp.slug}/` },
    ]
  });

  const webPageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: sp.seoTitle,
    description: sp.seoDesc,
    url: `https://www.paraisodeaves.com/es/especies/${sp.slug}/`,
    inLanguage: 'es-ES',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.paraisodeaves.com/' },
        { '@type': 'ListItem', position: 2, name: 'Especies', item: 'https://www.paraisodeaves.com/es/especies/' },
        { '@type': 'ListItem', position: 3, name: sp.name, item: `https://www.paraisodeaves.com/es/especies/${sp.slug}/` },
      ]
    }
  });

  const tagPills = sp.tags.map(t => `<span class="sp-tag">${t}</span>`).join('');

  return `<!DOCTYPE html>
<html lang="es-ES" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
  <title>${sp.seoTitle}</title>
  <meta name="description" content="${sp.seoDesc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="https://www.paraisodeaves.com/es/especies/${sp.slug}/"/>
  <link rel="alternate" hreflang="es-ES" href="https://www.paraisodeaves.com/es/especies/${sp.slug}/"/>
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/es/especies/${sp.slug}/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="es_ES"/>
  <meta property="og:title" content="${sp.seoTitle}"/>
  <meta property="og:description" content="${sp.seoDesc}"/>
  <meta property="og:url" content="https://www.paraisodeaves.com/es/especies/${sp.slug}/"/>
  <meta property="og:image" content="https://www.paraisodeaves.com${sp.img}"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${sp.seoTitle}"/>
  <meta name="twitter:description" content="${sp.seoDesc}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Playfair+Display:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
  <noscript><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Playfair+Display:wght@400;600;700;800;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"/></noscript>
  <script type="application/ld+json">${webPageSchema}</script>
  <script type="application/ld+json">${breadcrumbSchema}</script>
  <script type="application/ld+json">${faqSchema}</script>
  <style>
  :root{--primary:#1B3D2F;--secondary:#2B533C;--gold:#C9A24B;--gold-rich:#D4A94F;--bg:#F8F5ED;--surface:#FFFFFF;--border:#E7E0D2;--text:#2B2B2B;--muted:#5C5C5C;--radius:14px;--shadow:0 4px 24px rgba(0,0,0,.09)}
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:'Open Sans',Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;padding-top:64px}
  h1,h2,h3,h4{font-family:'Playfair Display',Georgia,serif;line-height:1.25}
  a{color:var(--primary);text-decoration:none}
  a:hover{color:var(--gold)}
  img{max-width:100%;height:auto;display:block}
  /* Header */
  .site-header{position:fixed;top:0;width:100%;z-index:1000;background:var(--primary);border-bottom:2px solid var(--gold);padding:0 5%}
  .header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px}
  .brand-logo{display:flex;align-items:center;gap:9px;text-decoration:none}
  .brand-name{font-family:'Playfair Display',Georgia,serif;font-weight:900;font-size:1.05rem;color:#fff}
  .main-nav{display:flex;align-items:center;gap:1.4rem}
  .main-nav a{color:rgba(255,255,255,.9);font-weight:600;font-size:.88rem;text-decoration:none;transition:color .2s;white-space:nowrap}
  .main-nav a:hover,.main-nav a.active{color:var(--gold)}
  .nav-ham{display:none;background:none;border:none;cursor:pointer;padding:6px 0;flex-direction:column;gap:5px}
  .nav-ham span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .25s,opacity .25s}
  .nav-mob{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999;opacity:0;pointer-events:none;transition:opacity .25s}
  .nav-mob.open{opacity:1;pointer-events:auto}
  .nav-mob-inner{position:absolute;top:64px;left:0;right:0;background:var(--primary);padding:1.2rem 5%;display:flex;flex-direction:column;gap:.8rem;border-top:1px solid rgba(255,255,255,.1)}
  .nav-mob-inner a{color:#fff;font-weight:600;font-size:.97rem;padding:.4rem 0;border-bottom:1px solid rgba(255,255,255,.08);text-decoration:none}
  @media(max-width:720px){.nav-ham{display:flex}.main-nav{display:none}}
  /* Breadcrumb */
  .breadcrumb{background:#fff;border-bottom:1px solid var(--border);padding:.6rem 5%}
  .breadcrumb ol{list-style:none;display:flex;flex-wrap:wrap;gap:.3rem;max-width:1400px;margin:0 auto;font-size:.82rem;color:var(--muted)}
  .breadcrumb li:not(:last-child)::after{content:' /';margin-left:.3rem;color:var(--muted)}
  .breadcrumb a{color:var(--primary);text-decoration:none}
  .breadcrumb a:hover{color:var(--gold)}
  /* Hero */
  .sp-hero{background:linear-gradient(135deg,var(--primary),var(--secondary));padding:52px 5% 44px;color:#fff;text-align:center}
  .sp-hero-inner{max-width:860px;margin:0 auto}
  .sp-label{display:inline-block;background:rgba(201,162,75,.2);border:1px solid var(--gold);color:var(--gold);font-size:.78rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:4px 14px;border-radius:999px;margin-bottom:14px}
  .sp-hero h1{font-size:clamp(1.9rem,4vw,2.9rem);font-weight:900;margin-bottom:.8rem;text-shadow:0 8px 24px rgba(0,0,0,.3)}
  .sp-hero .latin{font-size:.95rem;color:rgba(255,255,255,.65);font-style:italic;margin-bottom:1rem}
  .sp-tags{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin-bottom:1.4rem}
  .sp-tag{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.9);font-size:.78rem;font-weight:600;padding:3px 12px;border-radius:999px}
  .sp-hero-cta{display:inline-block;background:linear-gradient(135deg,var(--gold),#A8873A);color:#fff;font-weight:800;padding:.85rem 2rem;border-radius:999px;font-size:.97rem;text-decoration:none;transition:transform .2s,box-shadow .2s;box-shadow:0 8px 24px rgba(201,162,75,.35)}
  .sp-hero-cta:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(201,162,75,.45);color:#fff;text-decoration:none}
  /* Main layout */
  .sp-main{max-width:1100px;margin:0 auto;padding:3.5rem 5% 2rem;display:grid;grid-template-columns:1fr 340px;gap:3rem;align-items:start}
  @media(max-width:860px){.sp-main{grid-template-columns:1fr;padding:2rem 5%}}
  /* Intro */
  .sp-intro{font-size:1.06rem;line-height:1.8;color:var(--text);margin-bottom:2rem}
  .sp-intro strong{color:var(--primary)}
  /* Phase 2 placeholder */
  .ph2-section{background:#fff;border:2px dashed var(--border);border-radius:18px;padding:2rem;text-align:center;margin-bottom:2.5rem}
  .ph2-section h2{font-size:1.5rem;color:var(--primary);margin-bottom:.6rem}
  .ph2-section p{color:var(--muted);margin-bottom:1.2rem;font-size:.95rem}
  .ph2-cta{display:inline-block;background:var(--primary);color:#fff;font-weight:700;padding:.75rem 1.8rem;border-radius:999px;text-decoration:none;transition:background .2s}
  .ph2-cta:hover{background:var(--secondary);color:#fff;text-decoration:none}
  /* FAQ */
  .faq-section{margin-bottom:2.5rem}
  .faq-section h2{font-size:1.6rem;color:var(--primary);margin-bottom:1.2rem}
  .faq-item{border-bottom:1px solid var(--border);padding:1rem 0}
  .faq-item:last-child{border-bottom:none}
  .faq-q{font-size:1rem;font-weight:700;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:1rem;font-family:'Open Sans',Arial,sans-serif}
  .faq-q::after{content:'+';font-size:1.3rem;color:var(--gold);flex-shrink:0;transition:transform .25s}
  .faq-item.open .faq-q::after{transform:rotate(45deg)}
  .faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease}
  .faq-a p{padding:.6rem 0 .2rem;color:var(--muted);font-size:.95rem;line-height:1.7}
  .faq-a a{color:var(--primary);text-decoration:underline}
  .faq-item.open .faq-a{max-height:300px}
  /* Sidebar */
  .sp-sidebar{}
  .sp-sidebar-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:1.4rem;margin-bottom:1.2rem;box-shadow:var(--shadow)}
  .sp-sidebar-card h3{font-size:1rem;color:var(--primary);margin-bottom:.8rem;font-family:'Open Sans',Arial,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.04em;font-size:.82rem}
  .sp-sidebar-card p,.sp-sidebar-card li{font-size:.9rem;color:var(--muted);line-height:1.6}
  .sp-sidebar-card ul{list-style:none;padding:0}
  .sp-sidebar-card ul li{padding:.25rem 0;border-bottom:1px solid var(--border)}
  .sp-sidebar-card ul li:last-child{border-bottom:none}
  .sp-sidebar-card ul li a{color:var(--primary);font-weight:600}
  .sp-sidebar-card ul li a:hover{color:var(--gold)}
  .sidebar-cta{display:block;background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;font-weight:700;padding:.8rem 1.2rem;border-radius:12px;text-align:center;text-decoration:none;transition:opacity .2s;margin-top:.8rem;font-size:.95rem}
  .sidebar-cta:hover{opacity:.88;color:#fff;text-decoration:none}
  /* Related species */
  .es-rel-section{margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border)}
  .es-rel-section h2{font-size:1.5rem;color:var(--primary);margin-bottom:1rem}
  .es-rel-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem}
  @media(max-width:640px){.es-rel-grid{grid-template-columns:1fr}}
  .es-rel-card{display:flex;align-items:center;gap:.8rem;background:#fff;border:1px solid var(--border);border-radius:14px;padding:.65rem .9rem .65rem .65rem;text-decoration:none;color:var(--primary);font-weight:700;font-size:.9rem;transition:background .25s,box-shadow .25s,transform .2s}
  .es-rel-card:hover{background:var(--primary);color:#fff;text-decoration:none;box-shadow:0 6px 22px rgba(27,61,47,.22);transform:translateY(-2px)}
  .es-rel-card:hover .es-rel-arrow{color:var(--gold)}
  .es-rel-card:hover .es-rel-thumb{border-color:rgba(255,255,255,.35)}
  .es-rel-thumb{width:52px;height:52px;border-radius:50%;object-fit:cover;object-position:center top;flex-shrink:0;border:2px solid var(--border);box-shadow:0 2px 10px rgba(0,0,0,.13);transition:border-color .25s}
  @media(max-width:900px){.es-rel-thumb{width:44px;height:44px}}
  .es-rel-name{flex:1;font-family:'Playfair Display',Georgia,serif;font-size:.92rem}
  .es-rel-arrow{color:var(--gold);flex-shrink:0;font-size:1.1rem;line-height:1}
  /* Footer */
  footer{background:var(--primary);color:#fff;padding:2.5rem 5%;font-size:.88rem;text-align:center}
  footer a{color:var(--gold);text-decoration:none}
  footer a:hover{color:#fff}
  .visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
  </style>
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="brand-logo" aria-label="Paraíso de Aves — Inicio">
        <img src="/images/logo-horizontal-horizontal-light.svg" alt="Paraíso de Aves" width="140" height="36" onerror="this.style.display='none';this.nextElementSibling.style.display='block'" style="display:block">
        <span class="brand-name" style="display:none">Paraíso de Aves</span>
      </a>
      <nav class="main-nav" aria-label="Navegación principal">
        <a href="/">Inicio</a>
        <a href="/especies/">Especies</a>
        <a href="/aves-disponibles/">Aves Disponibles</a>
        <a href="/conocimiento/" class="active">Conocimiento</a>
        <a href="/blog/">Blog</a>
        <a href="/#contacto">Contacto</a>
      </nav>
      <button class="nav-ham" aria-label="Menú" aria-expanded="false" onclick="this.classList.toggle('is-open');document.querySelector('.nav-mob').classList.toggle('open');this.setAttribute('aria-expanded',this.classList.contains('is-open'))">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="nav-mob" onclick="this.classList.remove('open');document.querySelector('.nav-ham').classList.remove('is-open')">
    <nav class="nav-mob-inner" aria-label="Navegación móvil">
      <a href="/">Inicio</a>
      <a href="/especies/">Especies</a>
      <a href="/aves-disponibles/">Aves Disponibles</a>
      <a href="/conocimiento/">Conocimiento</a>
      <a href="/blog/">Blog</a>
      <a href="/#contacto">Contacto</a>
    </nav>
  </div>

  <nav class="breadcrumb" aria-label="Navegación de migas de pan">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/" itemprop="item"><span itemprop="name">Inicio</span></a>
        <meta itemprop="position" content="1"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/es/especies/" itemprop="item"><span itemprop="name">Especies</span></a>
        <meta itemprop="position" content="2"/>
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">${sp.name}</span>
        <meta itemprop="position" content="3"/>
      </li>
    </ol>
  </nav>

  <section class="sp-hero">
    <div class="sp-hero-inner">
      <span class="sp-label">Especie</span>
      <h1>${sp.h1}</h1>
      <p class="latin"><em>${sp.latinName}</em> · ${sp.subtitle}</p>
      <div class="sp-tags">${tagPills}</div>
      <a href="/#contacto" class="sp-hero-cta">Consultar disponibilidad</a>
    </div>
  </section>

  <div class="sp-main">
    <div>
      <p class="sp-intro">${sp.intro}</p>

      <!-- ── Phase 2: Live bird listings placeholder ── -->
      <section class="ph2-section" aria-label="${sp.name} disponibles">
        <h2>${sp.name} Disponibles</h2>
        <p>Esta sección mostrará próximamente todos los ejemplares disponibles de <strong>${sp.name}</strong> criados en nuestras instalaciones.</p>
        <a href="/aves-disponibles/" class="ph2-cta">Ver todas las aves disponibles</a>
      </section>

      <!-- ── FAQs ── -->
      <section class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
        <h2>Preguntas Frecuentes sobre ${sp.name}</h2>
        ${faqItems}
      </section>

      <!-- ── Related species ── -->
      <div class="es-rel-section">
        <h2>Especies Relacionadas</h2>
        <div class="es-rel-grid">${relatedCards}
        </div>
      </div>
    </div>

    <!-- ── Sidebar ── -->
    <aside class="sp-sidebar">
      <div class="sp-sidebar-card">
        <h3>Ficha rápida</h3>
        <ul>
          <li><strong>Tamaño:</strong> ${sp.size === 'pequeño' ? 'Pequeño' : sp.size === 'mediano' ? 'Mediano' : 'Grande'}</li>
          <li><strong>Habla:</strong> ${sp.habla === 'muy-hablador' ? 'Muy hablador' : sp.habla === 'moderado' ? 'Moderado' : 'Poco'}</li>
          <li><strong>Para familias:</strong> ${sp.familia === 'si' ? 'Sí' : 'No recomendado'}</li>
          <li><strong>Para principiantes:</strong> ${sp.principiante === 'si' ? 'Sí' : 'No'}</li>
          <li><strong>Para apartamento:</strong> ${sp.apartamento === 'si' ? 'Apto' : 'No recomendado'}</li>
        </ul>
      </div>
      <div class="sp-sidebar-card">
        <h3>Guías de cuidado</h3>
        <ul>
          <li><a href="/conocimiento/nutricion/">Nutrición para loros</a></li>
          <li><a href="/conocimiento/salud/">Salud aviar</a></li>
          <li><a href="/conocimiento/instalaciones/">Instalaciones</a></li>
          <li><a href="/conocimiento/adiestramiento/">Adiestramiento</a></li>
          <li><a href="/conocimiento/compra/">Guía de compra</a></li>
        </ul>
      </div>
      <div class="sp-sidebar-card">
        <h3>Información y adopción</h3>
        <ul>
          <li><a href="/adopcion-de-loros">Proceso de adopción</a></li>
          <li><a href="/transporte">Transporte seguro</a></li>
          <li><a href="/garantia-de-salud">Garantía de salud</a></li>
          <li><a href="/blog/cites-loros-espana.html">Documentación CITES</a></li>
        </ul>
        <a href="/#contacto" class="sidebar-cta">Solicitar información</a>
      </div>
    </aside>
  </div>

  <footer>
    <p>© 2025 Paraíso de Aves · <a href="/blog/cites-loros-espana.html">Información CITES</a> · <a href="/transporte">Transporte</a> · <a href="/#contacto">Contacto</a></p>
  </footer>

  <script>
  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
  </script>
</body>
</html>`;
}

// ─── Generate pages ────────────────────────────────────────────────────────────
console.log('\n🦜 generate-es-especies.js — Creating /es/especies/ category pages\n');

let created = 0;
const urls = [];

for (const sp of SPECIES) {
  const dir = path.join('es', 'especies', sp.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = makePage(sp);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`   ✓ /es/especies/${sp.slug}/`);
  urls.push(`https://www.paraisodeaves.com/es/especies/${sp.slug}/`);
  created++;
}

console.log(`\n✅ ${created} pages created.\n`);

// ─── Append URLs to sitemap_index.xml or create sitemap_es_especies.xml ──────
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.paraisodeaves.com/es/especies/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
${urls.map(u => `  <url><loc>${u}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap_es_especies.xml', sitemapContent, 'utf8');
console.log('📄 sitemap_es_especies.xml created');

// Add to sitemap_index.xml if not already present
let sitemapIndex = fs.readFileSync('sitemap_index.xml', 'utf8');
if (!sitemapIndex.includes('sitemap_es_especies.xml')) {
  sitemapIndex = sitemapIndex.replace(
    '</sitemapindex>',
    `  <sitemap><loc>https://www.paraisodeaves.com/sitemap_es_especies.xml</loc></sitemap>\n</sitemapindex>`
  );
  fs.writeFileSync('sitemap_index.xml', sitemapIndex, 'utf8');
  console.log('📄 sitemap_index.xml updated');
}

// ─── Also create the /es/especies/ hub index page ─────────────────────────────
const hubHtml = `<!DOCTYPE html>
<html lang="es-ES" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
  <title>Todas las Especies | Directorio de Aves | Paraíso de Aves</title>
  <meta name="description" content="Directorio completo de especies de aves disponibles en Paraíso de Aves: Yacos, Guacamayos, Cacatúas, Amazonas, Conuros, Agapornis y más. Envíos a toda España y Europa."/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="https://www.paraisodeaves.com/es/especies/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="es_ES"/>
  <meta property="og:title" content="Todas las Especies | Paraíso de Aves"/>
  <meta property="og:description" content="Directorio completo de especies de aves en Paraíso de Aves."/>
  <meta property="og:url" content="https://www.paraisodeaves.com/es/especies/"/>
  <script type="application/ld+json">${JSON.stringify({
    '@context':'https://schema.org','@type':'CollectionPage',
    name:'Todas las Especies — Paraíso de Aves',
    url:'https://www.paraisodeaves.com/es/especies/',
    description:'Directorio de todas las especies de aves disponibles en Paraíso de Aves',
    inLanguage:'es-ES'
  })}</script>
  <meta http-equiv="refresh" content="0;url=/#explora-especies"/>
  <style>body{font-family:sans-serif;text-align:center;padding:4rem;background:#F8F5ED;color:#2B2B2B}a{color:#1B3D2F}</style>
</head>
<body>
  <p>Redirigiendo al directorio de especies… <a href="/#explora-especies">Clic aquí si no se redirige automáticamente</a></p>
</body>
</html>`;

fs.mkdirSync(path.join('es', 'especies'), { recursive: true });
// Only write if no custom index already exists (protect manual edits)
const hubPath = path.join('es', 'especies', 'index.html');
if (!fs.existsSync(hubPath)) {
  fs.writeFileSync(hubPath, hubHtml, 'utf8');
  console.log('📄 es/especies/index.html created (hub redirect)');
}

console.log('\n✅ Done.\n');
