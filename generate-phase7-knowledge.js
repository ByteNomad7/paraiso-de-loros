'use strict';
/**
 * generate-phase7-knowledge.js
 * Creates /conocimiento/ Knowledge Center: 1 index + 12 category hub pages.
 * Each hub links to relevant existing blog posts and question pages.
 */
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.paraisodeaves.com';
const GA = 'G-4007YHH4H9';
const TODAY = '2026-06-30';

const NAV = `<nav class="topnav" aria-label="Navegación principal">
  <div class="topnav__inner">
    <a href="/" class="topnav__brand">🦜 Paraíso de Aves</a>
    <button class="topnav__toggle" aria-label="Abrir menú" onclick="this.closest('nav').classList.toggle('open')">☰</button>
    <ul class="topnav__links">
      <li><a href="/comprar-loros-espana">Comprar</a></li>
      <li><a href="/adopcion-de-loros">Adopción</a></li>
      <li><a href="/conocimiento/" class="active">Conocimiento</a></li>
      <li><a href="/herramientas/">Herramientas</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><a href="/tienda.html">Tienda</a></li>
      <li><a href="/contacto.html">Contacto</a></li>
      <li class="lang-sw"><a href="/pt/conhecimento/" hreflang="pt">PT</a> · <a href="/fr/centre-connaissance/" hreflang="fr">FR</a></li>
    </ul>
  </div>
</nav>`;

const FOOTER = `<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <strong>🦜 Paraíso de Aves</strong><br>
      Criadero registrado · Llíria, Valencia, España<br>
      <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a>
    </div>
    <div class="footer-col">
      <strong>Aves</strong>
      <a href="/available-birds/loro-gris-africano.html">Loro Gris Africano</a>
      <a href="/available-birds/guacamayo-azul-amarillo.html">Guacamayo</a>
      <a href="/available-birds/cacatua.html">Cacatúa</a>
      <a href="/available-birds/loro-amazonico.html">Amazona</a>
    </div>
    <div class="footer-col">
      <strong>Conocimiento</strong>
      <a href="/conocimiento/">Centro de Conocimiento</a>
      <a href="/conocimiento/nutricion/">Nutrición</a>
      <a href="/conocimiento/salud/">Salud</a>
      <a href="/herramientas/">Herramientas</a>
    </div>
    <div class="footer-col">
      <strong>Comprar</strong>
      <a href="/comprar-loros-espana">España</a>
      <a href="/comprar-loros-madrid">Madrid</a>
      <a href="/comprar-loros-valencia">Valencia</a>
      <a href="/comprar-loros-cataluna">Cataluña</a>
    </div>
    <div class="footer-col">
      <strong>Información</strong>
      <a href="/nosotros.html">Nosotros</a>
      <a href="/faq.html">FAQ</a>
      <a href="/adopcion-de-loros">Adopción</a>
      <a href="/criadero-loros-espana">Criadero</a>
    </div>
  </div>
  <p class="footer-copy">© 2026 Paraíso de Aves · Criadero legal núcleo zoológico · CITES certificado</p>
</footer>`;

const CSS = `<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Open Sans',sans-serif;background:#F8F5F0;color:#1A1A1A;line-height:1.7}
:root{--primary:#1F3D2B;--gold:#D4A94F;--cream:#F8F5F0;--border:#E7E0D2}
a{color:var(--primary);text-decoration:none}
a:hover{color:var(--gold)}
.topnav{background:var(--primary);position:sticky;top:0;z-index:999}
.topnav__inner{max-width:1200px;margin:0 auto;padding:0 5%;display:flex;align-items:center;justify-content:space-between;height:58px}
.topnav__brand{color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:1.05rem}
.topnav__links{display:flex;gap:24px;list-style:none}
.topnav__links a{color:rgba(255,255,255,.85);font-size:.88rem;font-weight:600}
.topnav__links a:hover,.topnav__links a.active{color:#fff}
.topnav__toggle{display:none;background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer}
.lang-sw a{font-size:.8rem;opacity:.75}

/* Hero */
.kc-hero{background:linear-gradient(135deg,var(--primary) 0%,#2B533C 100%);color:#fff;padding:72px 5% 60px;text-align:center}
.kc-hero h1{font-family:'Poppins',sans-serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:900;margin-bottom:16px}
.kc-hero p{font-size:1.05rem;opacity:.9;max-width:680px;margin:0 auto 28px}
.kc-badge{display:inline-block;background:var(--gold);color:#fff;font-weight:700;font-size:.8rem;padding:5px 14px;border-radius:999px;margin-bottom:18px;letter-spacing:.04em}

/* Breadcrumb */
.breadcrumb{max-width:1200px;margin:0 auto;padding:14px 5%;font-size:.82rem;color:#5C5C5C}
.breadcrumb a{color:#5C5C5C}
.breadcrumb span{margin:0 6px}

/* Category grid */
.section{max-width:1200px;margin:0 auto;padding:56px 5%}
.section-title{font-family:'Poppins',sans-serif;font-size:1.6rem;font-weight:800;color:var(--primary);margin-bottom:8px}
.section-sub{color:#5C5C5C;font-size:.95rem;margin-bottom:36px}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
.cat-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:28px 24px;transition:transform .2s,box-shadow .2s;position:relative;overflow:hidden}
.cat-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.1)}
.cat-icon{font-size:2.2rem;margin-bottom:14px;display:block}
.cat-card h2,.cat-card h3{font-family:'Poppins',sans-serif;font-size:1.1rem;font-weight:700;color:var(--primary);margin-bottom:8px}
.cat-card p{font-size:.88rem;color:#5C5C5C;line-height:1.6;margin-bottom:16px}
.cat-card .art-count{font-size:.78rem;font-weight:700;color:var(--gold);margin-bottom:12px;display:block}
.cat-card a.btn{display:inline-block;background:var(--primary);color:#fff;font-weight:700;font-size:.85rem;padding:9px 20px;border-radius:8px;transition:background .2s}
.cat-card a.btn:hover{background:var(--gold)}
.cat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--primary),var(--gold))}

/* Article list */
.art-list{display:grid;gap:14px}
.art-item{background:#fff;border:1px solid var(--border);border-radius:12px;padding:18px 22px;display:flex;align-items:flex-start;gap:16px;transition:box-shadow .2s}
.art-item:hover{box-shadow:0 6px 20px rgba(0,0,0,.08)}
.art-item-icon{font-size:1.6rem;flex-shrink:0}
.art-item-body h3{font-family:'Poppins',sans-serif;font-size:.95rem;font-weight:700;color:var(--primary);margin-bottom:4px}
.art-item-body p{font-size:.84rem;color:#5C5C5C;line-height:1.55}

/* FAQ */
.faq-section{background:#fff;border-radius:16px;padding:40px;margin-top:48px}
.faq-section h2{font-family:'Poppins',sans-serif;font-size:1.4rem;color:var(--primary);margin-bottom:24px}
details{border-bottom:1px solid var(--border);padding:16px 0}
details:last-child{border-bottom:none}
summary{font-weight:700;color:var(--primary);cursor:pointer;font-size:.97rem;list-style:none}
summary::-webkit-details-marker{display:none}
summary::before{content:'+ ';color:var(--gold)}
details[open] summary::before{content:'− '}
details p{margin-top:12px;color:#5C5C5C;font-size:.9rem;line-height:1.65}

/* CTA */
.cta-band{background:linear-gradient(135deg,var(--primary),#2B533C);color:#fff;text-align:center;padding:56px 5%;margin-top:56px}
.cta-band h2{font-family:'Poppins',sans-serif;font-size:1.6rem;font-weight:800;margin-bottom:12px}
.cta-band p{opacity:.9;margin-bottom:24px}
.cta-band a{display:inline-block;background:var(--gold);color:#fff;font-weight:700;padding:14px 36px;border-radius:10px;font-size:1rem;transition:background .2s}
.cta-band a:hover{background:#E0B75F}

/* Footer */
.site-footer{background:var(--primary);color:rgba(255,255,255,.8);padding:48px 5% 24px}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}
.footer-brand{color:#fff}
.footer-brand strong{font-family:'Poppins',sans-serif;font-size:1.05rem;display:block;margin-bottom:10px}
.footer-col strong{display:block;color:#fff;font-family:'Poppins',sans-serif;margin-bottom:12px;font-size:.88rem;text-transform:uppercase;letter-spacing:.05em}
.footer-col a{display:block;color:rgba(255,255,255,.72);font-size:.84rem;margin-bottom:7px;transition:color .2s}
.footer-col a:hover{color:var(--gold)}
.footer-copy{max-width:1200px;margin:0 auto;text-align:center;font-size:.78rem;opacity:.55;padding-top:20px;border-top:1px solid rgba(255,255,255,.12)}

@media(max-width:900px){
  .footer-inner{grid-template-columns:1fr 1fr;gap:24px}
  .topnav__links{display:none;flex-direction:column;position:absolute;top:58px;left:0;right:0;background:var(--primary);padding:16px 5%}
  .topnav{position:relative}
  .topnav.open .topnav__links{display:flex}
  .topnav__toggle{display:block}
}
@media(max-width:560px){.cat-grid{grid-template-columns:1fr}.footer-inner{grid-template-columns:1fr}}
</style>`;

const categories = [
  {
    slug: 'nutricion',
    icon: '🥦',
    title: 'Nutrición para Loros',
    desc: 'Todo sobre la alimentación correcta de loros: frutas, verduras, pellets, semillas, alimentos prohibidos y dietas por especie.',
    count: 18,
    articles: [
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Alimentos tóxicos para loros — lista completa', desc: 'Qué no pueden comer nunca tus loros.' },
      { href: '/blog/pellets-vs-semillas-loros-guia.html', title: 'Pellets vs semillas: guía completa', desc: 'Cuál es la mejor base de alimentación.' },
      { href: '/blog/calendario-alimentacion-loros.html', title: 'Calendario de alimentación mensual', desc: 'Frutas y verduras según la temporada.' },
      { href: '/blog/como-alimentar-un-loro-bebe.html', title: 'Cómo alimentar un loro bebé', desc: 'Papilla, frecuencia y transición al destete.' },
      { href: '/blog/que-comen-los-loros-bebes.html', title: 'Qué comen los loros bebés', desc: 'Alimentos por edad y especie.' },
      { href: '/alimentacion-loros', title: 'Hub de alimentación y nutrición', desc: 'Guía completa de accesorios de alimentación.' },
    ],
    faqs: [
      { q: '¿Pueden los loros comer frutas tropicales?', a: 'Sí. El mango, papaya, guayaba y piña son excelentes fuentes de vitaminas. Siempre sin semillas (las semillas del mango y la piña no suponen riesgo, pero las de manzana sí contienen cianuro en pequeñas cantidades).' },
      { q: '¿Cuántas veces al día hay que dar de comer a un loro?', a: 'Los loros adultos comen 2 veces al día (mañana y tarde). Los bebés en destete necesitan 3–4 tomas. La fruta fresca debe retirarse tras 2–3 horas para evitar fermentación.' },
      { q: '¿Los pellets son mejores que las semillas para loros?', a: 'Los pellets de alta calidad ofrecen nutrición completa y balanceada. Las semillas son ricas en grasas y deben ser un complemento, no la base. La dieta ideal combina 50–70% pellets + 30–50% frutas, verduras y semillas.' },
    ],
    relatedSlugs: ['/conocimiento/salud/', '/conocimiento/guias-principiantes/'],
  },
  {
    slug: 'comportamiento',
    icon: '🧠',
    title: 'Comportamiento y Psicología',
    desc: 'Entiende por qué tu loro grita, muerde, arranca plumas o hace movimientos extraños. Guías basadas en etología aviar.',
    count: 22,
    articles: [
      { href: '/blog/loro-mordedor-como-educarlo.html', title: 'Loro mordedor: cómo educarlo', desc: 'Técnicas para reducir la agresividad.' },
      { href: '/blog/como-domesticar-un-loro.html', title: 'Cómo domesticar un loro', desc: 'Pasos para socializar aves nuevas.' },
      { href: '/blog/loros-y-ninos-seguridad.html', title: 'Loros y niños: seguridad y convivencia', desc: 'Normas para familias con niños.' },
      { href: '/blog/ruido-loro-gestionar.html', title: 'Cómo gestionar el ruido del loro', desc: 'Técnicas para reducir los gritos.' },
      { href: '/blog/problemas-comportamiento-loros.html', title: 'Problemas de comportamiento en loros', desc: 'Diagnóstico y soluciones prácticas.' },
      { href: '/blog/senales-estres-loro.html', title: 'Señales de estrés en el loro', desc: 'Cómo detectar y eliminar el estrés.' },
    ],
    faqs: [
      { q: '¿Por qué mi loro grita tanto?', a: 'Los loros gritan como comunicación natural. Las causas más comunes son: soledad, aburrimiento, hambre, pedir atención o responder al entorno. La clave es no reforzar el grito con atención inmediata.' },
      { q: '¿Es normal que un loro muerda?', a: 'Sí, especialmente durante la pubertad (2–4 años). El mordisco es un lenguaje: puede indicar miedo, exceso de estimulación o defensa de territorio. Con técnicas positivas se reduce notablemente.' },
      { q: '¿Qué es el arranque de plumas y por qué ocurre?', a: 'El plucking o arranque de plumas es un trastorno compulsivo relacionado con aburrimiento, estrés, carencias nutricionales o infecciones. Requiere evaluación veterinaria urgente.' },
    ],
    relatedSlugs: ['/conocimiento/adiestramiento/', '/conocimiento/salud/'],
  },
  {
    slug: 'salud',
    icon: '🩺',
    title: 'Salud Aviar',
    desc: 'Enfermedades comunes, síntomas de alarma, vacunas, visitas veterinarias y prevención para mantener tu loro sano.',
    count: 24,
    articles: [
      { href: '/blog/enfermedades-comunes-loros.html', title: 'Enfermedades comunes en loros', desc: 'Las 10 patologías más frecuentes.' },
      { href: '/blog/visitas-veterinario-loros.html', title: 'Guía de visitas al veterinario', desc: 'Cuándo ir y qué esperar.' },
      { href: '/blog/cuarentena-loro-nuevo.html', title: 'Cuarentena para loro nuevo', desc: 'Protocolo de 30 días.' },
      { href: '/blog/control-peso-loro.html', title: 'Control de peso en loros', desc: 'Cómo pesar y qué valores son normales.' },
      { href: '/blog/prevencion-enfermedades-loro.html', title: 'Prevención de enfermedades', desc: 'Rutinas e higiene preventiva.' },
      { href: '/blog/muda-plumaje-loro.html', title: 'La muda del plumaje en loros', desc: 'Qué es normal y qué no.' },
    ],
    faqs: [
      { q: '¿Con qué frecuencia llevar un loro al veterinario?', a: 'Los loros sanos deben tener una revisión anual con un veterinario especialista en aves exóticas. Las aves nuevas deben visitarse en los primeros 7 días y después de la cuarentena.' },
      { q: '¿Los loros necesitan vacunas?', a: 'En España no existen vacunas obligatorias para loros domésticos, pero el veterinario puede recomendar análisis de sangre anuales para detectar enfermedades subclínicas como la psitacosis.' },
      { q: '¿Cuáles son las señales de alarma en un loro?', a: 'Plumas erizadas más de 2 horas, pérdida de peso, secreciones oculares o nasales, heces anómalas, letargo, falta de apetito o dificultad para respirar requieren visita urgente.' },
    ],
    relatedSlugs: ['/conocimiento/nutricion/', '/blog/'],
  },
  {
    slug: 'adiestramiento',
    icon: '🎓',
    title: 'Adiestramiento y Entrenamiento',
    desc: 'Técnicas de refuerzo positivo para enseñar a hablar, subir al dedo, ir a la báscula y aprender trucos.',
    count: 16,
    articles: [
      { href: '/blog/adiestramiento-loros.html', title: 'Adiestramiento con refuerzo positivo', desc: 'Base científica y técnicas prácticas.' },
      { href: '/blog/como-ensenar-a-hablar-un-loro.html', title: 'Cómo enseñar a hablar a un loro', desc: 'Método paso a paso.' },
      { href: '/blog/como-ensenar-tricks-loro.html', title: 'Cómo enseñar trucos a tu loro', desc: '10 trucos para empezar.' },
      { href: '/blog/juegos-estimulacion-loro.html', title: 'Juegos de estimulación para loros', desc: 'Ideas para enriquecer su entorno.' },
      { href: '/blog/enriquecimiento-ambiental-loros.html', title: 'Enriquecimiento ambiental', desc: 'Juguetes, forrajeo y retos cognitivos.' },
      { href: '/blog/como-socializar-loro.html', title: 'Cómo socializar un loro', desc: 'De la desconfianza a la confianza.' },
    ],
    faqs: [
      { q: '¿A qué edad se puede empezar a adiestrar un loro?', a: 'Desde las primeras semanas tras el destete (~8–12 semanas). Los loros criados a mano son especialmente receptivos. Las sesiones deben ser cortas: 5–10 minutos, 2–3 veces al día.' },
      { q: '¿El refuerzo positivo funciona con todos los loros?', a: 'Sí, con todas las especies. El refuerzo positivo (recompensa con comida o atención) es más eficaz que el castigo. Respeta el tiempo de aprendizaje de cada individuo.' },
      { q: '¿Qué recompensas funcionan mejor para adiestrar?', a: 'Trocitos pequeños de alimento favorito (nuez, piñón, uva), tiempo de juego, rascado en la cabeza. La clave es que la recompensa sea de alto valor y se entregue en menos de 2 segundos tras el comportamiento.' },
    ],
    relatedSlugs: ['/conocimiento/comportamiento/', '/herramientas/'],
  },
  {
    slug: 'cria',
    icon: '🥚',
    title: 'Cría y Reproducción',
    desc: 'Nidificación, incubación de huevos, cría a mano, destete y bases legales para la cría controlada.',
    count: 12,
    articles: [
      { href: '/blog/como-incubar-huevos-de-loro.html', title: 'Cómo incubar huevos de loro', desc: 'Temperatura, humedad y volteo.' },
      { href: '/blog/como-alimentar-un-loro-bebe.html', title: 'Cómo alimentar un loro bebé', desc: 'Papilla y frecuencia de tomas.' },
      { href: '/blog/que-comen-los-loros-bebes.html', title: 'Qué comen los loros bebés', desc: 'Fórmulas, marcas y destete.' },
      { href: '/available-birds/huevos-fertiles.html', title: 'Huevos fértiles disponibles', desc: 'Huevos CITES de nuestra cría.' },
      { href: '/parejas-reproductoras-loros', title: 'Parejas reproductoras', desc: 'Información sobre parejas vinculadas.' },
      { href: '/preguntas-criador-loros-antes-comprar.html', title: '25 preguntas al criador', desc: 'Qué preguntar antes de comprar.' },
    ],
    faqs: [
      { q: '¿Cuál es el período de incubación de los loros?', a: 'Varía por especie: periquitos 18 días, ninfas 18–21 días, loros grises 28 días, guacamayos 24–28 días, cacatúas blancas 28–30 días.' },
      { q: '¿A qué temperatura hay que incubar los huevos de loro?', a: '37,2–37,5°C con humedad relativa del 40–50% durante la incubación, aumentando al 65–70% en los últimos 3–4 días (eclosión).' },
      { q: '¿Cuándo se puede destetar un loro?', a: 'Depende de la especie. Los loros grises se destetan hacia las 12–14 semanas, los guacamayos a las 14–16 semanas. El destete debe ser gradual y nunca forzado.' },
    ],
    relatedSlugs: ['/conocimiento/cites-legal/', '/conocimiento/nutricion/'],
  },
  {
    slug: 'cites-legal',
    icon: '📋',
    title: 'CITES y Marco Legal',
    desc: 'Documentación CITES, registro de núcleo zoológico, normativa española y europea para la tenencia y venta de loros.',
    count: 14,
    articles: [
      { href: '/blog/cites-loros-espana.html', title: 'CITES en España: guía completa', desc: 'Qué es y qué documentos necesitas.' },
      { href: '/documentos-legales-para-adoptar-un-loro', title: 'Documentos legales para adoptar', desc: 'Lista completa: CITES, anilla, contrato.' },
      { href: '/blog/loros-cites-espana.html', title: 'Loros CITES: qué especies están reguladas', desc: 'Apéndices I, II y III explicados.' },
      { href: '/blog/registro-microchip-loros.html', title: 'Registro y microchip de loros', desc: 'Es obligatorio en España.' },
      { href: '/blog/diferencia-criador-tienda-mascotas.html', title: 'Criador vs tienda: diferencia legal', desc: 'Qué garantías ofrece cada uno.' },
      { href: '/criadero-loros-espana', title: 'Criadero legal en España', desc: 'Núcleo zoológico registrado.' },
    ],
    faqs: [
      { q: '¿Qué es el CITES y por qué es importante para los loros?', a: 'CITES (Convención sobre el Comercio Internacional de Especies Amenazadas) regula el comercio de más de 380 especies de loros. Sin documentación CITES la tenencia o venta es ilegal en España y puede conllevar multas de hasta 200.000€.' },
      { q: '¿Todos los loros necesitan CITES en España?', a: 'Las especies del Apéndice I (loro gris, guacamayo jacinto) requieren CITES I con mayor restricción. El Apéndice II (guacamayos ararauna, amazonas, cacatúas) también requiere documentación. Solo periquitos y agapornis están exentos.' },
      { q: '¿Qué documentos entrega el criador al comprador?', a: 'Un criador legal entrega: certificado CITES o documento de acompañamiento, contrato de compraventa, historial sanitario, anilla con número de registro y factura.' },
    ],
    relatedSlugs: ['/conocimiento/compra/', '/criadero-loros-espana'],
  },
  {
    slug: 'instalaciones',
    icon: '🏠',
    title: 'Instalaciones y Vivienda',
    desc: 'Cómo elegir la jaula correcta, medidas mínimas, accesorios, ubicación y condiciones ambientales ideales.',
    count: 15,
    articles: [
      { href: '/blog/jaula-equipamiento-loro.html', title: 'Jaula y equipamiento: guía completa', desc: 'Medidas, materiales y accesorios.' },
      { href: '/jaulas-loros', title: 'Hub de jaulas para loros', desc: 'Comparativa de tipos y tamaños.' },
      { href: '/blog/loros-temperatura-ideal.html', title: 'Temperatura ideal para loros', desc: 'Rangos seguros por especie.' },
      { href: '/blog/loros-y-apartamento-legal.html', title: 'Loros en apartamento: aspectos legales', desc: 'Comunidades de vecinos y normativa.' },
      { href: '/blog/cuidados-diarios-loro.html', title: 'Cuidados diarios del loro', desc: 'Rutina completa día a día.' },
      { href: '/perchas-loros', title: 'Hub de perchas para loros', desc: 'Tipos, materiales y posicionamiento.' },
    ],
    faqs: [
      { q: '¿Cuál es el tamaño mínimo de jaula para un loro gris?', a: 'Para un loro gris (Yaco) la jaula mínima es 80×80×120cm. Preferiblemente mayor. La envergadura del loro con alas extendidas debe caber sin tocar las paredes laterales.' },
      { q: '¿Dónde debo colocar la jaula del loro?', a: 'En una habitación donde la familia pase tiempo, sin corrientes de aire, alejada de la cocina (humos de teflón son letales) y fuera del alcance directo del sol. Temperatura estable entre 18–26°C.' },
      { q: '¿Cuántas horas al día debe estar el loro fuera de la jaula?', a: 'Mínimo 3–4 horas diarias de vuelo libre supervisado. Los loros son muy sociales y el confinamiento sin salidas genera estrés y problemas de comportamiento.' },
    ],
    relatedSlugs: ['/conocimiento/comportamiento/', '/herramientas/'],
  },
  {
    slug: 'viajes',
    icon: '✈️',
    title: 'Viajes y Transporte',
    desc: 'Cómo viajar con tu loro en coche, avión o barco. Requisitos de documentación, transportines y normas IATA.',
    count: 8,
    articles: [
      { href: '/blog/viajar-con-loro.html', title: 'Viajar con un loro: guía completa', desc: 'Coche, avión y normativa.' },
      { href: '/blog/vacaciones-loro.html', title: 'Vacaciones con loro o sin él', desc: 'Opciones y cuidados durante tu ausencia.' },
      { href: '/transportines-loros', title: 'Hub de transportines para loros', desc: 'Modelos IATA aprobados.' },
      { href: '/comprar-loros-canarias', title: 'Envío a Canarias', desc: 'Protocolo de envío aéreo a Canarias.' },
      { href: '/blog/loro-solo-cuanto-tiempo.html', title: '¿Cuánto tiempo puede estar solo el loro?', desc: 'Límites y soluciones prácticas.' },
    ],
    faqs: [
      { q: '¿Pueden los loros viajar en avión?', a: 'Sí, con las compañías que lo permiten (Iberia, Vueling, Air Europa) en cabina (aves pequeñas) o como carga aérea (aves grandes). Se requiere transportín IATA aprobado, certificado veterinario y, si es especie CITES, permiso de movimiento.' },
      { q: '¿Qué transportín necesito para viajar con un loro?', a: 'Un transportín certificado IATA Live Animals con ventilación en 3 lados, dimensiones según la especie y el loro cómodo sin tocarlo todo. Los guacamayos y loros grises van como carga, los periquitos y ninfas pueden ir en cabina.' },
      { q: '¿Qué pasa si viajo al extranjero con mi loro?', a: 'Necesitas un certificado de salud emitido por veterinario oficial y, para especies CITES, un permiso de importación del país de destino. Dentro de la UE el trámite es más sencillo pero siempre obligatorio.' },
    ],
    relatedSlugs: ['/conocimiento/cites-legal/', '/transportines-loros'],
  },
  {
    slug: 'accesorios',
    icon: '🧸',
    title: 'Accesorios y Equipamiento',
    desc: 'Juguetes, perchas, comederos, bebederos, escaleras y todo el equipamiento para el bienestar de tu loro.',
    count: 11,
    articles: [
      { href: '/blog/accesorios-esenciales-loro.html', title: 'Accesorios esenciales para loros', desc: '12 accesorios que todo loro necesita.' },
      { href: '/juguetes-naturales-loros', title: 'Juguetes naturales para loros', desc: 'Materiales seguros y beneficios.' },
      { href: '/perchas-loros', title: 'Perchas para loros', desc: 'Tipos, materiales y posicionamiento correcto.' },
      { href: '/limpieza-loros', title: 'Productos de limpieza para aves', desc: 'Higiene segura sin tóxicos.' },
      { href: '/salud-loros', title: 'Productos de salud aviar', desc: 'Suplementos y botiquín básico.' },
      { href: '/jaulas-loros', title: 'Jaulas para loros: comparativa', desc: 'Guía de compra por especie y presupuesto.' },
    ],
    faqs: [
      { q: '¿Cuántos juguetes necesita un loro?', a: 'Entre 5 y 10 juguetes rotativos. Los loros se aburren de los mismos juguetes, así que rotar semanalmente mantiene el estímulo. Incluye masticables, forrajeros, de movimiento y de pico.' },
      { q: '¿Qué materiales son seguros para los juguetes de loros?', a: 'Madera sin tratar (pino, sauce, balsa), cuerda de sisal, algodón, acero inoxidable y plástico grueso libre de BPA. Evitar zinc, plomo, madera tratada y tintes artificiales.' },
      { q: '¿Con qué frecuencia limpiar la jaula?', a: 'Limpieza básica diaria (cambiar periódicos del fondo, limpiar comederos), limpieza media semanal (perchas, juguetes) y desinfección completa mensual con productos específicos para aves.' },
    ],
    relatedSlugs: ['/conocimiento/instalaciones/', '/jaulas-loros'],
  },
  {
    slug: 'compra',
    icon: '🛒',
    title: 'Compra y Adopción',
    desc: 'Cómo comprar un loro legal en España: dónde comprar, qué preguntar al criador, documentación y lista de verificación.',
    count: 20,
    articles: [
      { href: '/adopcion-de-loros', title: 'Proceso de adopción paso a paso', desc: 'Los 7 pasos para adoptar con garantías.' },
      { href: '/blog/como-comprar-un-loro-en-espana.html', title: 'Cómo comprar un loro en España', desc: 'Guía completa 2026.' },
      { href: '/blog/errores-comunes-al-adoptar-un-loro.html', title: '10 errores comunes al adoptar un loro', desc: 'Evita los fallos más costosos.' },
      { href: '/blog/como-elegir-criador-loros-espana.html', title: 'Cómo elegir un criador de confianza', desc: '10 claves para identificar calidad.' },
      { href: '/blog/adoptar-loro-vs-comprar.html', title: 'Adoptar vs comprar un loro', desc: 'Ventajas y desventajas de cada opción.' },
      { href: '/blog/reservar-loro-criador.html', title: 'Cómo reservar un loro en el criadero', desc: 'Proceso, señal y tiempos de espera.' },
    ],
    faqs: [
      { q: '¿Cuánto cuesta un loro en España?', a: 'Los precios varían enormemente por especie: periquitos (30–80€), agapornis (80–200€), ninfas (100–250€), loros grises (1.500–3.000€), guacamayos (2.000–8.000€), guacamayo jacinto (7.000–15.000€). Consulta siempre por correo.' },
      { q: '¿Cuánto tiempo tarda un criador en entregar un loro?', a: 'Para especies grandes (loro gris, guacamayo) la espera habitual es 3–8 meses ya que la cría es limitada. Para especies pequeñas (periquito, ninfa) puede haber disponibilidad inmediata o listas de espera de 1–3 meses.' },
      { q: '¿Qué señales de alarma hay que evitar en un criador?', a: 'Venta sin documentación CITES, precios muy bajos para especies reguladas, no permitir visitar las instalaciones, presionar para decidir rápido, no tener núcleo zoológico registrado o venta a través de redes sociales sin contrato.' },
    ],
    relatedSlugs: ['/conocimiento/cites-legal/', '/adopcion-de-loros'],
  },
  {
    slug: 'guias-principiantes',
    icon: '🌱',
    title: 'Guías para Principiantes',
    desc: 'Todo lo que necesitas saber antes de tener tu primer loro: elección de especie, presupuesto, preparación del hogar y primeros días.',
    count: 19,
    articles: [
      { href: '/blog/como-elegir-tu-primer-loro.html', title: 'Cómo elegir tu primer loro', desc: 'Guía definitiva para nuevos propietarios.' },
      { href: '/blog/mejores-loros-principiantes.html', title: 'Mejores loros para principiantes', desc: '8 especies recomendadas.' },
      { href: '/blog/primera-semana-loro-casa.html', title: 'La primera semana del loro en casa', desc: 'Protocolo de adaptación.' },
      { href: '/cuidados-basicos-de-un-loro', title: 'Cuidados básicos del loro', desc: 'Lista de verificación diaria.' },
      { href: '/cuanto-cuesta-mantener-un-loro', title: 'Cuánto cuesta mantener un loro', desc: 'Presupuesto mensual y anual.' },
      { href: '/blog/gastos-compra-loro.html', title: 'Gastos al comprar un loro', desc: 'Más allá del precio de compra.' },
    ],
    faqs: [
      { q: '¿Cuál es el loro más fácil para principiantes?', a: 'Las ninfas (Nymphicus hollandicus) son ideales: son tranquilas, menos ruidosas, muy sociables y tienen necesidades de espacio moderadas. También los periquitos y los agapornis se adaptan bien a personas sin experiencia.' },
      { q: '¿Cuánto tiempo libre se necesita para tener un loro?', a: 'Mínimo 2–4 horas diarias de interacción directa. Los loros son aves altamente sociales; sin atención suficiente desarrollan problemas conductuales graves. Evalúa honestamente tu disponibilidad antes de adoptar.' },
      { q: '¿Es necesario preparar el hogar antes de llevar al loro?', a: 'Sí. Antes del primer día: instalar la jaula en su ubicación definitiva, retirar plantas tóxicas, proteger cables eléctricos, eliminar olores de teflón y establecer una zona segura de vuelo libre.' },
    ],
    relatedSlugs: ['/conocimiento/compra/', '/herramientas/'],
  },
  {
    slug: 'guias-avanzadas',
    icon: '🏆',
    title: 'Guías para Propietarios Avanzados',
    desc: 'Nutrición clínica, genética de color, cría controlada, show birds y gestión de múltiples loros.',
    count: 10,
    articles: [
      { href: '/blog/guia-loro-gris-africano.html', title: 'Guía completa: Loro Gris Africano', desc: 'Psittacus erithacus — todo sobre el Yaco.' },
      { href: '/blog/guia-guacamayo-azul-amarillo.html', title: 'Guía completa: Guacamayo Azul', desc: 'Ara ararauna — el guacamayo más popular.' },
      { href: '/blog/guia-eclectus-roratus.html', title: 'Guía completa: Eclectus Roratus', desc: 'Dimorfismo sexual y cuidados únicos.' },
      { href: '/blog/guia-guacamayo-jacinto.html', title: 'Guía completa: Guacamayo Jacinto', desc: 'El loro más grande del mundo.' },
      { href: '/blog/pellets-vs-semillas-loros-guia.html', title: 'Nutrición avanzada: pellets vs semillas', desc: 'Análisis nutricional completo.' },
      { href: '/parejas-reproductoras-loros', title: 'Parejas reproductoras de loros', desc: 'Gestión de parejas vinculadas.' },
    ],
    faqs: [
      { q: '¿Cuántos loros se pueden tener en un hogar?', a: 'No hay límite legal en España (la tenencia de más de 5 animales puede requerir registro como coleccionista en algunas CCAA). La limitación práctica es la atención que puedes dedicar a cada uno.' },
      { q: '¿Es posible mantener diferentes especies juntas?', a: 'Solo con supervisión estricta. Los guacamayos grandes pueden herir a loros pequeños. Las ninfas y los periquitos conviven bien. Nunca mezclar species muy dispares en la misma jaula.' },
      { q: '¿Qué significa criar loros "a mano"?', a: 'La cría a mano (handraising) implica alimentar a los polluelos con papilla desde los primeros días de vida, asegurando socialización con humanos. Resulta en aves mucho más dóciles, confiadas y adaptadas a la vida doméstica.' },
    ],
    relatedSlugs: ['/conocimiento/cria/', '/blog/'],
  },
];

function hubPage(cat) {
  const canonical = `${DOMAIN}/conocimiento/${cat.slug}/`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        "url": canonical,
        "name": `${cat.title} — Centro de Conocimiento | Paraíso de Aves`,
        "description": cat.desc,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": DOMAIN + "/" },
            { "@type": "ListItem", "position": 2, "name": "Centro de Conocimiento", "item": DOMAIN + "/conocimiento/" },
            { "@type": "ListItem", "position": 3, "name": cat.title, "item": canonical }
          ]
        },
        "publisher": { "@type": "Organization", "@id": DOMAIN + "/#org", "name": "Paraíso de Aves" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": cat.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cat.title} — Centro de Conocimiento | Paraíso de Aves</title>
  <meta name="description" content="${cat.desc.substring(0, 155)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${cat.title} | Paraíso de Aves">
  <meta property="og:description" content="${cat.desc.substring(0, 155)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>
  <script type="application/ld+json">${schema}</script>
  ${CSS}
</head>
<body>
${NAV}
<div class="breadcrumb">
  <a href="/">Inicio</a><span>›</span>
  <a href="/conocimiento/">Centro de Conocimiento</a><span>›</span>
  <strong>${cat.title}</strong>
</div>

<div class="kc-hero">
  <span class="kc-badge">${cat.icon} ${cat.count} artículos</span>
  <h1>${cat.title}</h1>
  <p>${cat.desc}</p>
</div>

<main>
  <section class="section">
    <h2 class="section-title">Artículos destacados</h2>
    <p class="section-sub">Selección de nuestras guías más completas y valoradas sobre ${cat.title.toLowerCase()}.</p>
    <div class="art-list">
      ${cat.articles.map(a => `<div class="art-item">
        <span class="art-item-icon">${cat.icon}</span>
        <div class="art-item-body">
          <h3><a href="${a.href}">${a.title}</a></h3>
          <p>${a.desc}</p>
        </div>
      </div>`).join('\n      ')}
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="faq-section">
      <h2>Preguntas frecuentes sobre ${cat.title}</h2>
      ${cat.faqs.map(f => `<details>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`).join('\n      ')}
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <h2 class="section-title">También te puede interesar</h2>
    <div class="cat-grid">
      ${cat.relatedSlugs.map(sl => `<div class="cat-card">
        <a href="${sl}" class="btn">Explorar →</a>
      </div>`).join('\n      ')}
      <div class="cat-card">
        <span class="cat-icon">🛠️</span>
        <h3>Herramientas interactivas</h3>
        <p>Calculadoras y guías interactivas para ayudarte a decidir.</p>
        <a href="/herramientas/" class="btn">Ir a herramientas →</a>
      </div>
    </div>
  </section>
</main>

<div class="cta-band">
  <h2>¿Buscas un loro criado con estos estándares?</h2>
  <p>Somos criadero registrado con más de 25 años de experiencia. Toda nuestra documentación es legal y transparente.</p>
  <a href="/adopcion-de-loros">Ver proceso de adopción →</a>
</div>

${FOOTER}
</body>
</html>`;
}

function indexPage() {
  const canonical = `${DOMAIN}/conocimiento/`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        "url": canonical,
        "name": "Centro de Conocimiento sobre Loros — Paraíso de Aves",
        "description": "La enciclopedia de referencia sobre loros en español. Nutrición, salud, comportamiento, adiestramiento, CITES y compra. Más de 200 guías expertas.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": DOMAIN + "/" },
            { "@type": "ListItem", "position": 2, "name": "Centro de Conocimiento", "item": canonical }
          ]
        },
        "publisher": { "@type": "Organization", "@id": DOMAIN + "/#org", "name": "Paraíso de Aves" }
      }
    ]
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Centro de Conocimiento sobre Loros | Paraíso de Aves</title>
  <meta name="description" content="La mayor enciclopedia de loros en español. Guías expertas sobre nutrición, salud, comportamiento, CITES, adiestramiento y compra. Más de 200 artículos.">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="Centro de Conocimiento sobre Loros | Paraíso de Aves">
  <meta property="og:description" content="La mayor enciclopedia de loros en español. Guías expertas de criadores con 25+ años de experiencia.">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>
  <script type="application/ld+json">${schema}</script>
  ${CSS}
</head>
<body>
${NAV}
<div class="breadcrumb">
  <a href="/">Inicio</a><span>›</span>
  <strong>Centro de Conocimiento</strong>
</div>

<div class="kc-hero">
  <span class="kc-badge">📚 200+ Guías Expertas</span>
  <h1>Centro de Conocimiento sobre Loros</h1>
  <p>La mayor enciclopedia en español sobre loros y aves exóticas. Creada por criadores con 25+ años de experiencia. Información técnica, verificada y actualizada en 2026.</p>
</div>

<main>
  <section class="section">
    <h2 class="section-title">Explora por categoría</h2>
    <p class="section-sub">12 áreas temáticas con cientos de artículos, guías prácticas y respuestas a las preguntas más frecuentes.</p>
    <div class="cat-grid">
      ${categories.map(c => `<div class="cat-card">
        <span class="cat-icon">${c.icon}</span>
        <h2>${c.title}</h2>
        <p>${c.desc.substring(0, 120)}…</p>
        <span class="art-count">📄 ${c.count} artículos</span>
        <a href="/conocimiento/${c.slug}/" class="btn">Explorar →</a>
      </div>`).join('\n      ')}
    </div>
  </section>

  <section class="section" style="background:#fff;padding:56px 5%;max-width:none">
    <div style="max-width:1200px;margin:0 auto">
      <h2 class="section-title">También disponible en</h2>
      <div class="cat-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
        <div class="cat-card">
          <span class="cat-icon">🇵🇹</span>
          <h3>Centro de Conhecimento PT</h3>
          <p>Guias em português sobre papagaios — nutrição, saúde, CITES e compra.</p>
          <a href="/pt/conhecimento/" class="btn">Ver em Português →</a>
        </div>
        <div class="cat-card">
          <span class="cat-icon">🇫🇷</span>
          <h3>Centre de Connaissance FR</h3>
          <p>Guides en français sur les perroquets — nutrition, santé, CITES et achat.</p>
          <a href="/fr/centre-connaissance/" class="btn">Voir en Français →</a>
        </div>
        <div class="cat-card">
          <span class="cat-icon">🛠️</span>
          <h3>Herramientas Interactivas</h3>
          <p>Calculadoras, cuestionarios y guías visuales para tomar las mejores decisiones.</p>
          <a href="/herramientas/" class="btn">Ir a herramientas →</a>
        </div>
        <div class="cat-card">
          <span class="cat-icon">❓</span>
          <h3>Preguntas y Respuestas</h3>
          <p>75+ respuestas directas a las dudas más frecuentes sobre loros.</p>
          <a href="/preguntas/" class="btn">Ver preguntas →</a>
        </div>
      </div>
    </div>
  </section>
</main>

<div class="cta-band">
  <h2>¿Listo para adoptar tu loro?</h2>
  <p>Consulta nuestra disponibilidad. Criador registrado, CITES garantizado, envío a toda España y Europa.</p>
  <a href="/adopcion-de-loros">Iniciar proceso de adopción →</a>
</div>

${FOOTER}
</body>
</html>`;
}

// Write files
let created = 0;
const generated = [];

// Index
fs.mkdirSync('conocimiento', { recursive: true });
fs.writeFileSync('conocimiento/index.html', indexPage());
generated.push({ url: '/conocimiento/', priority: '0.90' });
console.log('✓ conocimiento/index.html');
created++;

// Category hubs
categories.forEach(cat => {
  const dir = `conocimiento/${cat.slug}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, hubPage(cat));
  generated.push({ url: `/conocimiento/${cat.slug}/`, priority: '0.80' });
  console.log(`✓ ${dir}/index.html`);
  created++;
});

console.log(`\n✅ Knowledge Center: ${created} pages created`);

// ── Sitemap append ──────────────────────────────────────────────────────────
const sitemapPath = 'sitemap.xml';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const newUrls = generated.map(g =>
  `  <url><loc>${DOMAIN}${g.url}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>${g.priority}</priority></url>`
).join('\n');
sitemap = sitemap.replace('</urlset>', `${newUrls}\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
console.log(`✓ sitemap.xml +${generated.length} URLs`);

// ── _redirects append ───────────────────────────────────────────────────────
const redirectsPath = '_redirects';
let redirects = fs.readFileSync(redirectsPath, 'utf8');
const newRedirects = `\n# SECTION 21 — Phase 7 Knowledge Center (${TODAY})\n` +
  generated.map(g => {
    const slug = g.url.replace(/\/$/, '').replace(/^\//, '');
    return `/${slug}  /${slug}/index.html  200\n/${slug}.html  ${g.url}  301`;
  }).join('\n');
redirects = redirects.replace(/\/\* → \/404\.html 404/, `${newRedirects}\n\n/* → /404.html 404`);
fs.writeFileSync(redirectsPath, redirects);
console.log(`✓ _redirects SECTION 21 added`);
console.log(`\nGenerated URLs:\n${generated.map(g => g.url).join('\n')}`);
