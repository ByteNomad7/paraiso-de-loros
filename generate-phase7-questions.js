'use strict';
/**
 * generate-phase7-questions.js
 * Creates /preguntas/ hub + 75 Q&A pages targeting long-tail search queries.
 * 5 categories × 15 questions = 75 pages.
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
      <li><a href="/conocimiento/">Conocimiento</a></li>
      <li><a href="/preguntas/" class="active">Preguntas</a></li>
      <li><a href="/herramientas/">Herramientas</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><a href="/contacto.html">Contacto</a></li>
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
    </div>
    <div class="footer-col">
      <strong>Preguntas</strong>
      <a href="/preguntas/">Todas las preguntas</a>
      <a href="/preguntas/alimentacion/">Alimentación</a>
      <a href="/preguntas/comportamiento/">Comportamiento</a>
      <a href="/preguntas/salud/">Salud</a>
    </div>
    <div class="footer-col">
      <strong>Conocimiento</strong>
      <a href="/conocimiento/">Centro de conocimiento</a>
      <a href="/herramientas/">Herramientas</a>
      <a href="/blog/">Blog</a>
    </div>
    <div class="footer-col">
      <strong>Comprar</strong>
      <a href="/comprar-loros-espana">España</a>
      <a href="/adopcion-de-loros">Adopción</a>
      <a href="/criadero-loros-espana">Criadero</a>
    </div>
  </div>
  <p class="footer-copy">© 2026 Paraíso de Aves · Criadero legal · CITES certificado</p>
</footer>`;

const CSS = `<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Open Sans',sans-serif;background:#F8F5F0;color:#1A1A1A;line-height:1.7}
:root{--primary:#1F3D2B;--gold:#D4A94F;--cream:#F8F5F0;--border:#E7E0D2}
a{color:var(--primary);text-decoration:none}a:hover{color:var(--gold)}
.topnav{background:var(--primary);position:sticky;top:0;z-index:999}
.topnav__inner{max-width:1200px;margin:0 auto;padding:0 5%;display:flex;align-items:center;justify-content:space-between;height:58px}
.topnav__brand{color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:1.05rem}
.topnav__links{display:flex;gap:22px;list-style:none}
.topnav__links a{color:rgba(255,255,255,.85);font-size:.88rem;font-weight:600}
.topnav__links a:hover,.topnav__links a.active{color:#fff}
.topnav__toggle{display:none;background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer}
.breadcrumb{max-width:1200px;margin:0 auto;padding:14px 5%;font-size:.82rem;color:#5C5C5C}
.breadcrumb a{color:#5C5C5C}
.breadcrumb span{margin:0 6px}

/* Article layout */
.article-wrap{max-width:820px;margin:0 auto;padding:48px 5% 64px}
.article-hero{background:linear-gradient(135deg,var(--primary) 0%,#2B533C 100%);color:#fff;padding:56px 5% 48px}
.article-hero .hero-inner{max-width:820px;margin:0 auto}
.article-hero .cat-badge{background:var(--gold);color:#fff;font-size:.75rem;font-weight:700;padding:4px 12px;border-radius:999px;display:inline-block;margin-bottom:16px;text-transform:uppercase;letter-spacing:.05em}
.article-hero h1{font-family:'Poppins',sans-serif;font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:900;line-height:1.2;margin-bottom:16px}
.article-hero .meta{font-size:.83rem;opacity:.75}

/* Answer box */
.answer-box{background:#fff;border-left:4px solid var(--gold);border-radius:0 12px 12px 0;padding:24px 28px;margin:32px 0;font-size:1rem;font-weight:600;color:var(--primary);line-height:1.6}
.answer-label{font-size:.75rem;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:8px}

/* Sections */
.content-section{margin-bottom:36px}
.content-section h2{font-family:'Poppins',sans-serif;font-size:1.3rem;font-weight:800;color:var(--primary);margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid var(--border)}
.content-section h3{font-family:'Poppins',sans-serif;font-size:1.05rem;font-weight:700;color:var(--primary);margin:20px 0 8px}
.content-section p{margin-bottom:14px;font-size:.96rem;color:#333}
.content-section ul,.content-section ol{padding-left:22px;margin-bottom:14px}
.content-section li{margin-bottom:7px;font-size:.96rem;color:#333}

/* Info boxes */
.info-box{background:#e8f4ec;border-left:4px solid var(--primary);border-radius:0 10px 10px 0;padding:18px 22px;margin:24px 0}
.warn-box{background:#fff7e6;border-left:4px solid var(--gold);border-radius:0 10px 10px 0;padding:18px 22px;margin:24px 0}
.info-box strong,.warn-box strong{display:block;margin-bottom:6px;font-family:'Poppins',sans-serif;font-size:.9rem;color:var(--primary)}

/* Table */
.resp-table{overflow-x:auto;margin:20px 0}
table{width:100%;border-collapse:collapse;font-size:.88rem}
th{background:var(--primary);color:#fff;padding:10px 14px;text-align:left;font-family:'Poppins',sans-serif;font-weight:700}
td{padding:10px 14px;border-bottom:1px solid var(--border)}
tr:nth-child(even){background:#f9f7f4}

/* FAQ */
.faq-section{background:#fff;border-radius:16px;padding:32px;margin:36px 0}
.faq-section h2{font-family:'Poppins',sans-serif;font-size:1.25rem;color:var(--primary);margin-bottom:20px}
details{border-bottom:1px solid var(--border);padding:14px 0}
details:last-child{border-bottom:none}
summary{font-weight:700;color:var(--primary);cursor:pointer;font-size:.95rem;list-style:none}
summary::-webkit-details-marker{display:none}
summary::before{content:'+ ';color:var(--gold)}
details[open] summary::before{content:'− '}
details p{margin-top:10px;color:#5C5C5C;font-size:.88rem;line-height:1.65}

/* Related */
.related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:12px}
.related-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:18px 20px;transition:box-shadow .2s}
.related-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.08)}
.related-card h3{font-family:'Poppins',sans-serif;font-size:.9rem;font-weight:700;color:var(--primary);margin-bottom:6px}
.related-card p{font-size:.82rem;color:#5C5C5C;margin-bottom:10px;line-height:1.5}
.related-card a{font-size:.83rem;font-weight:700;color:var(--gold)}

/* CTA */
.cta-inline{background:linear-gradient(135deg,var(--primary),#2B533C);color:#fff;border-radius:16px;padding:36px;text-align:center;margin:48px 0}
.cta-inline h3{font-family:'Poppins',sans-serif;font-size:1.3rem;font-weight:800;margin-bottom:10px}
.cta-inline p{opacity:.9;margin-bottom:20px;font-size:.95rem}
.cta-inline a{display:inline-block;background:var(--gold);color:#fff;font-weight:700;padding:12px 30px;border-radius:8px;font-size:.95rem;transition:background .2s}
.cta-inline a:hover{background:#E0B75F}

/* Hub page */
.hub-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.hub-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:24px;transition:transform .2s,box-shadow .2s}
.hub-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,.09)}
.hub-card h2,.hub-card h3{font-family:'Poppins',sans-serif;font-size:1.05rem;font-weight:700;color:var(--primary);margin-bottom:8px}
.hub-card .count{font-size:.78rem;color:var(--gold);font-weight:700;margin-bottom:10px;display:block}
.hub-card a.see-all{font-size:.84rem;font-weight:700;color:var(--gold)}
.hub-card ul{padding-left:0;list-style:none;margin:12px 0}
.hub-card ul li a{font-size:.84rem;color:var(--primary);display:block;padding:5px 0;border-bottom:1px solid var(--border)}
.hub-card ul li a:hover{color:var(--gold)}
.hero-section{background:linear-gradient(135deg,var(--primary) 0%,#2B533C 100%);color:#fff;padding:64px 5% 52px;text-align:center}
.hero-section h1{font-family:'Poppins',sans-serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;margin-bottom:14px}
.hero-section p{opacity:.9;max-width:600px;margin:0 auto;font-size:1rem}
.section{max-width:1200px;margin:0 auto;padding:52px 5%}
.section-title{font-family:'Poppins',sans-serif;font-size:1.5rem;font-weight:800;color:var(--primary);margin-bottom:8px}
.section-sub{color:#5C5C5C;font-size:.92rem;margin-bottom:30px}

/* Footer */
.site-footer{background:var(--primary);color:rgba(255,255,255,.8);padding:48px 5% 24px}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px}
.footer-brand{color:#fff}
.footer-brand strong{font-family:'Poppins',sans-serif;font-size:1.05rem;display:block;margin-bottom:10px}
.footer-col strong{display:block;color:#fff;font-family:'Poppins',sans-serif;margin-bottom:12px;font-size:.88rem;text-transform:uppercase;letter-spacing:.05em}
.footer-col a{display:block;color:rgba(255,255,255,.72);font-size:.84rem;margin-bottom:7px;transition:color .2s}
.footer-col a:hover{color:var(--gold)}
.footer-copy{max-width:1200px;margin:0 auto;text-align:center;font-size:.78rem;opacity:.55;padding-top:20px;border-top:1px solid rgba(255,255,255,.12)}
@media(max-width:900px){.footer-inner{grid-template-columns:1fr 1fr;gap:24px}.topnav__links{display:none;flex-direction:column;position:absolute;top:58px;left:0;right:0;background:var(--primary);padding:16px 5%}.topnav{position:relative}.topnav.open .topnav__links{display:flex}.topnav__toggle{display:block}}
@media(max-width:560px){.hub-grid{grid-template-columns:1fr}.footer-inner{grid-template-columns:1fr}}
</style>`;

const questions = [
  // ── Alimentación (15) ─────────────────────────────────────────────────────
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-platano',
    title: '¿Pueden los loros comer plátano?',
    shortAnswer: 'Sí, el plátano es seguro y nutritivo para los loros. Es rico en potasio, vitamina B6 y fibra. Debe darse en pequeñas porciones (1–2 rodajas al día) por su alto contenido en azúcares naturales.',
    sections: [
      { h: '¿Por qué el plátano es bueno para los loros?', p: 'El plátano aporta potasio (esencial para la función muscular), vitamina B6 (metabolismo), vitamina C, magnesio y fibra. Su textura blanda lo hace fácil de comer para todas las especies, desde periquitos hasta guacamayos.\n\nAdemás, la mayoría de los loros disfrutan mucho del plátano por su sabor dulce, lo que lo convierte en una recompensa excelente durante el adiestramiento.' },
      { h: '¿Cuánto plátano puede comer un loro?', p: 'La cantidad recomendada es:\n\n• Periquito / agapornis: 1 trocito pequeño (≈1 cm)\n• Ninfa / cotorra: 1–2 rodajas finas\n• Loro gris / amazona: 2–3 rodajas\n• Guacamayo: media rodaja a una rodaja entera\n\nEl plátano debe ser un complemento, no la base de la dieta. La fruta en general no debería superar el 15–20% de la ingesta diaria.' },
      { h: '¿El plátano puede causar problemas?', p: 'El exceso de plátano puede causar deposiciones blandas por su contenido en azúcar y fibra soluble. En loros con tendencia a la obesidad (amazonas, loros grises sedentarios) conviene limitarlo a 2–3 veces por semana.\n\nLa piel del plátano también es comestible pero suele estar tratada con pesticidas. Si la ofreces, lávala muy bien o usa fruta ecológica.' },
      { h: '¿Qué otras frutas son seguras para los loros?', p: 'Además del plátano, los loros pueden comer sin problema: mango, papaya, manzana (sin semillas), pera, uvas, fresas, arándanos, melón, sandía, kiwi, higo y naranja. Las frutas prohibidas son el aguacate y cualquier preparación con azúcar añadida o conservantes.' },
    ],
    faqs: [
      { q: '¿Puedo darle plátano verde a mi loro?', a: 'El plátano verde es más rico en almidón y menos dulce. Es seguro pero menos palateable. La mayoría de los loros prefieren el plátano maduro. Ambas versiones son seguras.' },
      { q: '¿El plátano deshidratado es seguro para loros?', a: 'El plátano deshidratado sin azúcar añadida ni sulfitos es seguro en pequeñas cantidades. Ten en cuenta que la deshidratación concentra los azúcares, así que reduce la cantidad a la mitad.' },
      { q: '¿Con qué frecuencia puedo dar plátano?', a: 'Hasta 4–5 veces por semana en porciones moderadas. Como con toda la fruta, la variedad es la clave de una dieta equilibrada.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-aguacate/', title: '¿Pueden comer aguacate?', desc: 'El aguacate es tóxico. Descubre por qué.' },
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-uvas/', title: '¿Pueden comer uvas?', desc: 'Respuesta completa con dosis.' },
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Alimentos tóxicos para loros', desc: 'Lista completa de lo que nunca deben comer.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-aguacate',
    title: '¿Pueden los loros comer aguacate?',
    shortAnswer: 'No. El aguacate es tóxico para los loros y puede ser mortal. Contiene persina, un fungicida natural que en aves causa insuficiencia respiratoria, debilidad muscular y paro cardíaco.',
    sections: [
      { h: '¿Por qué el aguacate es peligroso para los loros?', p: 'El aguacate contiene persina, un compuesto fungicida natural presente en hojas, hueso, piel y pulpa. En humanos es inocuo, pero en aves es altamente tóxico ya que daña el tejido cardíaco y pulmonar.\n\nLos síntomas de intoxicación aparecen entre 24 y 48 horas tras la ingestión: debilidad, dificultad respiratoria, incapacidad para posarse, edema pulmonar y, en casos graves, muerte.' },
      { h: '¿Qué cantidad de aguacate es peligrosa?', p: 'No existe una dosis segura. Incluso pequeñas cantidades pueden ser letales, especialmente para aves pequeñas como periquitos y agapornis. Un loro gris puede tener mayor tolerancia pero el riesgo no justifica la exposición.\n\nLa pulpa es la parte más tóxica, pero la piel y el hueso también contienen persina.' },
      { h: '¿Qué hago si mi loro comió aguacate?', p: 'Actúa inmediatamente:\n\n1. Llama a tu veterinario especialista en aves o urgencias veterinarias de inmediato\n2. No esperes síntomas: el daño es progresivo\n3. Indica la cantidad aproximada ingerida y el tiempo transcurrido\n4. No induzcas el vómito por tu cuenta\n\nEl tratamiento temprano mejora significativamente el pronóstico.' },
      { h: '¿Qué frutas son alternativas seguras?', p: 'Los loros pueden disfrutar de decenas de frutas seguras: plátano, mango, papaya, manzana (sin semillas), pera, uvas, fresas, arándanos, melón, sandía, kiwi, frambuesas y naranjas. La variedad es la clave de una dieta equilibrada y estimulante.' },
    ],
    faqs: [
      { q: '¿El aceite de aguacate también es tóxico para loros?', a: 'Sí. El aceite de aguacate también puede contener persina. Evita cualquier producto derivado del aguacate para tus aves.' },
      { q: '¿Hay alguna variedad de aguacate sin persina?', a: 'Algunas variedades como el aguacate Fuertes tienen menos persina que el Hass, pero ninguna se considera completamente segura para aves. No hay una variedad "segura".' },
      { q: '¿Mis periquitos tocaron el guacamole, es urgencia?', a: 'Sí. Si han ingerido aunque sea una pequeña cantidad, llama al veterinario de inmediato. En aves pequeñas el margen de tolerancia es mínimo.' },
    ],
    related: [
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Lista completa de tóxicos para loros', desc: 'Todo lo que nunca deben comer.' },
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-platano/', title: '¿Pueden comer plátano?', desc: 'Sí, y aquí explicamos cómo.' },
      { href: '/conocimiento/salud/', title: 'Centro de conocimiento: Salud', desc: 'Señales de alarma y primeros auxilios.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-huevo',
    title: '¿Pueden los loros comer huevo?',
    shortAnswer: 'Sí, el huevo cocido es un alimento seguro y nutritivo para los loros. Es una excelente fuente de proteína de alta calidad. Debe darse cocido (duro), sin sal ni condimentos, y en cantidades moderadas.',
    sections: [
      { h: '¿Por qué el huevo es beneficioso para los loros?', p: 'El huevo es uno de los alimentos más completos en proteínas (todos los aminoácidos esenciales), vitaminas (A, D, E, B12) y minerales (hierro, zinc, calcio en la yema). En estado silvestre, los loros consumen proteína animal ocasionalmente.\n\nEl huevo es especialmente útil durante la época de cría, la muda y en loros con bajo peso. La clara aporta proteína magra; la yema aporta grasas saludables y vitaminas liposolubles.' },
      { h: '¿Cómo preparar el huevo para loros?', p: 'La preparación más segura es el huevo duro entero (clara + yema) sin sal, sin aceite y sin condimentos. También se puede ofrecer en tortilla francesa sin sal.\n\nEl huevo crudo NO se recomienda: la avidina de la clara cruda bloquea la absorción de biotina. Además, existe riesgo de Salmonella.\n\nPuedes mezclarlo con verduras cocidas, pellets molidos o semillas para hacer una "papilla de muda" nutritiva durante los periodos de cambio de plumaje.' },
      { h: '¿Cuánto huevo puede comer un loro?', p: '• Periquito / agapornis: ¼ de cucharadita de yema o clara 2–3 veces/semana\n• Ninfa: ½ cucharadita 2–3 veces/semana\n• Loro gris / amazona: 1 cucharadita 2–3 veces/semana\n• Guacamayo: 1–2 cucharaditas 2–3 veces/semana\n\nNo debe ser un alimento diario. El exceso de proteína puede sobrecargar el riñón.' },
      { h: '¿La cáscara de huevo es útil para los loros?', p: 'La cáscara de huevo esterilizada (horneada a 200°C durante 15 min) es una fuente excelente de calcio. Muchos criadores la muelen y la mezclan con pellets o la ofrecen como complemento mineral, especialmente a hembras durante la puesta.' },
    ],
    faqs: [
      { q: '¿Puede un loro comer huevo de codorniz?', a: 'Sí, el huevo de codorniz cocido es igual de seguro y nutritivo. Su tamaño lo hace práctico para aves medianas. Las mismas normas aplican: cocido, sin sal, sin condimentos.' },
      { q: '¿El loro puede comer tortilla francesa?', a: 'Sí, siempre que se haga sin sal, sin aceite (o mínimo aceite de oliva) y sin rellenos peligrosos. Evita la tortilla con cebolla, ajo o especias.' },
      { q: '¿Con qué frecuencia dar huevo a mi loro?', a: '2–3 veces por semana máximo para sus aves adultas sanas. Durante la muda o la cría puedes aumentar a diario durante 2–3 semanas.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-platano/', title: '¿Pueden comer plátano?', desc: 'Fruta segura y nutritiva.' },
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Alimentos tóxicos para loros', desc: 'Lista completa de peligros.' },
      { href: '/conocimiento/nutricion/', title: 'Centro: Nutrición para loros', desc: 'Guía completa de alimentación.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-beber-leche',
    title: '¿Pueden los loros beber leche?',
    shortAnswer: 'No. Los loros son intolerantes a la lactosa. Su sistema digestivo no produce lactasa, la enzima necesaria para digerir la leche. La leche puede causar diarrea, deshidratación y malestar gastrointestinal grave.',
    sections: [
      { h: '¿Por qué la leche es mala para los loros?', p: 'Los loros, como todas las aves, son naturalmente intolerantes a la lactosa. No producen lactasa, la enzima que digiere el azúcar de la leche (lactosa). Al ingerir leche, la lactosa fermenta en el intestino causando diarrea, gases y dolor abdominal.\n\nEsta intolerancia es universal en aves, no una excepción. No existe una "pequeña cantidad segura" de leche para loros.' },
      { h: '¿Qué pasa si mi loro bebe leche?', p: 'Síntomas esperados en 2–6 horas: deposiciones muy líquidas o verdosas, letargo, plumas erizadas, pérdida de apetito. La diarrea persistente puede causar deshidratación, que en aves pequeñas es peligrosa en pocas horas.\n\nSi tu loro bebió una cantidad significativa de leche, contacta con tu veterinario.' },
      { h: '¿Qué productos lácteos son igualmente peligrosos?', p: 'Todos los productos derivados de la leche presentan lactosa en mayor o menor medida:\n\n• Leche entera / desnatada: alta lactosa → evitar completamente\n• Queso fresco / ricotta: lactosa moderada → evitar\n• Yogur natural: lactosa baja (bacterias la fermentan parcialmente) → pequeñísimas cantidades ocasionales, no habitual\n• Queso curado (parmesano, manchego): lactosa muy baja pero alto en sodio → evitar por el sodio\n• Mantequilla: casi sin lactosa pero muy grasa → evitar' },
      { h: '¿Qué líquidos puede beber un loro?', p: 'El único líquido que necesita un loro es agua fresca y limpia, cambiada diariamente. Algunas infusiones frías sin cafeína (manzanilla, tila, hierbas) son aceptadas ocasionalmente. Los zumos de fruta naturales sin azúcar añadida en muy pequeña cantidad también son tolerados, pero el agua es siempre la opción principal.' },
    ],
    faqs: [
      { q: '¿Puedo darle yogur a mi loro?', a: 'El yogur natural sin azúcar tiene menos lactosa que la leche, pero no está recomendado para uso habitual. Si quieres aportar probióticos a tu loro, consulta con el veterinario aviar.' },
      { q: '¿Las bebidas vegetales (avena, almendra) son seguras?', a: 'Las bebidas vegetales no tienen lactosa y no son tóxicas per se, pero tampoco aportan beneficio real. Algunas contienen azúcares añadidos o espesantes. El agua es siempre la mejor opción.' },
      { q: '¿La leche en papilla de cría es lo mismo?', a: 'Las papillas comerciales para cría de loros no contienen leche de vaca. Son bases de harina de cereales, proteínas vegetales y vitaminas específicamente formuladas para aves.' },
    ],
    related: [
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Lista de tóxicos para loros', desc: 'Todos los alimentos prohibidos.' },
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-aguacate/', title: '¿Pueden comer aguacate?', desc: 'Otro alimento prohibido explicado.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición aviar', desc: 'Guía completa de alimentación.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-arroz',
    title: '¿Pueden los loros comer arroz?',
    shortAnswer: 'Sí. El arroz cocido (blanco o integral) es completamente seguro para los loros y una buena fuente de carbohidratos de energía. El arroz crudo también es seguro, al contrario del mito popular.',
    sections: [
      { h: '¿Qué tipo de arroz es mejor para loros?', p: 'El arroz integral cocido es la opción más nutritiva: conserva el germen y el salvado, ricos en vitaminas B, fibra y minerales. El arroz blanco cocido es igual de seguro pero menos nutritivo.\n\nAmbos deben servirse siempre sin sal, sin aceite, sin condimentos y completamente enfriados antes de ofrecerlos. El arroz caliente puede quemar el buche.' },
      { h: '¿El arroz crudo es peligroso para los loros?', p: 'No, el mito del "arroz crudo que explota en el estómago" es completamente falso. El arroz crudo es simplemente más difícil de digerir y menos apetecible, pero no es tóxico ni peligroso.\n\nLos loros silvestres consumen granos crudos habitualmente. Sin embargo, el arroz cocido es más digestivo y aporta más energía disponible.' },
      { h: '¿Cuánto arroz puede comer un loro?', p: 'El arroz puede constituir el 10–15% de la dieta total. Como con todos los carbohidratos, el exceso puede contribuir a la obesidad, especialmente en amazónicas y loros grises menos activos.\n\nPorciones orientativas (arroz cocido):\n• Periquito / ninfa: 1 cucharadita\n• Loro gris / amazona: 1–2 cucharadas\n• Guacamayo: 2–3 cucharadas' },
      { h: '¿Qué otros granos y cereales puede comer un loro?', p: 'Además del arroz, los loros pueden comer: avena cocida, quinoa cocida, cebada cocida, maíz cocido o tostado, mijo, trigo germinado, espelta y cuscús. Los cereales cocidos sin sal son siempre más digestivos y recomendables que los secos. Evitar pan industrial (sal, azúcar, aditivos).' },
    ],
    faqs: [
      { q: '¿Puedo dar arroz con leche a mi loro?', a: 'No. El arroz en sí es seguro, pero el arroz con leche contiene lactosa y azúcar. Los loros son intolerantes a la lactosa. Ofrece arroz cocido solo, sin lácteos ni endulzantes.' },
      { q: '¿El arroz integral es mejor que el blanco para loros?', a: 'Sí, el integral aporta más fibra, vitaminas del grupo B y minerales. Pero el blanco es igualmente seguro. La clave es que esté cocido y sin aditivos.' },
      { q: '¿Puedo mezclar el arroz con verduras?', a: 'Absolutamente. El arroz con verduras cocidas (zanahoria, brócoli, guisantes, calabacín) sin sal es un plato muy nutritivo y variado para los loros. Muchos lo aceptan mejor en mezcla que solo.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-platano/', title: '¿Pueden comer plátano?', desc: 'Guía de frutas seguras.' },
      { href: '/blog/calendario-alimentacion-loros.html', title: 'Calendario de alimentación', desc: 'Qué dar cada mes.' },
      { href: '/conocimiento/nutricion/', title: 'Nutrición completa para loros', desc: 'Centro de conocimiento sobre alimentación.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-tomate',
    title: '¿Pueden los loros comer tomate?',
    shortAnswer: 'Sí, el tomate maduro en pequeñas cantidades es seguro para los loros. Sin embargo, las hojas, tallos y frutos verdes contienen solanina, que es tóxica. Solo la pulpa del tomate rojo maduro es apta.',
    sections: [
      { h: '¿Por qué hay confusión sobre el tomate y los loros?', p: 'El tomate pertenece a la familia de las Solanáceas, que incluye plantas con alcaloides tóxicos. Las hojas, los tallos y los frutos verdes del tomate contienen solanina y tomatina, que son tóxicas para los loros.\n\nSin embargo, el tomate rojo maduro tiene niveles de solanina tan bajos que resulta seguro en cantidades moderadas. La clave es "solo la pulpa roja madura".' },
      { h: '¿Cómo dar tomate a los loros?', p: 'Reglas para ofrecer tomate de forma segura:\n\n1. Solo tomate completamente rojo y maduro\n2. Sin hojas, sin tallo, sin partes verdes\n3. Sin semillas si es posible (aunque las semillas maduras son menos problemáticas)\n4. En trozos pequeños, como condimento más que como alimento principal\n5. No combinar con alimentos muy ácidos el mismo día (el tomate ya es ácido)\n\nAlternativa más segura: tomate cherry maduro, en mitades.' },
      { h: '¿El ácido del tomate puede afectar al loro?', p: 'El tomate es ácido y puede irritar el tracto digestivo si se da en exceso. Algunos loros lo toleran perfectamente; otros muestran heces más líquidas. Observa la reacción de tu ave las primeras veces.\n\nLoros con historial de problemas digestivos o úlceras deben evitarlo por precaución.' },
      { h: '¿Qué otras verduras son seguras para los loros?', p: 'Los loros pueden comer sin problema: brócoli, zanahoria, pimiento (todos los colores), espinacas (en pequeña cantidad), guisantes, maíz, pepino, remolacha, judías verdes cocidas, calabacín, apio (sin hojas) y col de Bruselas. Evitar: aguacate, cebolla, ajo, champiñones y patata cruda.' },
    ],
    faqs: [
      { q: '¿El tomate cherry es más seguro?', a: 'El tomate cherry maduro y rojo es igual de seguro que el tomate normal maduro. Su tamaño lo hace cómodo de ofrecer. Siempre rojo, nunca verde.' },
      { q: '¿Puedo dar salsa de tomate a mi loro?', a: 'No. Las salsas de tomate industriales contienen sal, azúcar, ajo y conservantes que son perjudiciales para los loros. Solo tomate fresco maduro, sin procesar.' },
      { q: '¿Con qué frecuencia puedo dar tomate?', a: '1–2 veces por semana máximo, en pequeñas cantidades. No es imprescindible en la dieta del loro; hay verduras más nutritivas y menos problemáticas.' },
    ],
    related: [
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Alimentos tóxicos para loros', desc: 'Lista completa de lo que nunca deben comer.' },
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-uvas/', title: '¿Pueden comer uvas?', desc: 'Otro alimento frecuentemente preguntado.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición aviar', desc: 'Guía completa de alimentación.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-uvas',
    title: '¿Pueden los loros comer uvas?',
    shortAnswer: 'Sí. Las uvas (con o sin semillas) son seguras para los loros y muy apreciadas por su sabor. Son ricas en agua, vitaminas y antioxidantes. Por su alto contenido en azúcar deben darse en cantidades moderadas.',
    sections: [
      { h: '¿Qué beneficios tienen las uvas para los loros?', p: 'Las uvas son ricas en resveratrol (antioxidante), vitaminas C y K, potasio y agua (80% de su peso). Su textura y sabor las hace muy atractivas para la mayoría de los loros.\n\nLas uvas oscuras (tintas) contienen más antioxidantes que las blancas. Ambas son igualmente seguras.' },
      { h: '¿Las uvas con semillas son peligrosas?', p: 'A diferencia del perro o el gato (para quienes las uvas son tóxicas), los loros pueden comer uvas con semillas sin problema. Las semillas de uva son pequeñas y los loros las descartan o digieren sin dificultad.\n\nIMPORTANTE: Las uvas son seguras para los loros pero tóxicas para perros y gatos. Si tienes otras mascotas, asegúrate de no confundir las recomendaciones.' },
      { h: '¿Cuántas uvas puede comer un loro?', p: 'Guía de porciones:\n• Periquito / agapornis: ½ uva pequeña\n• Ninfa: 1 uva\n• Loro gris / amazona: 2–3 uvas\n• Guacamayo: 3–5 uvas\n\nFrecuencia: 3–4 veces por semana máximo. Las uvas tienen alta densidad calórica por sus azúcares naturales.' },
      { h: '¿Cómo ofrecer las uvas correctamente?', p: 'Lava siempre las uvas con agua fría antes de ofrecerlas. Puedes cortarlas por la mitad para las especies más pequeñas o colgarlas en la jaula enteras (las aves disfrutan "manipulándolas").\n\nConviene comprar uvas ecológicas o sin tratamiento cuando sea posible, ya que la piel puede tener residuos de pesticidas.' },
    ],
    faqs: [
      { q: '¿Las pasas (uvas secas) son seguras para loros?', a: 'Las pasas son uvas concentradas: mismos beneficios pero mucho más azúcar. Son seguras en porciones muy pequeñas (1–2 pasas como premio ocasional), pero no como snack habitual.' },
      { q: '¿Las uvas verdes o rojas, cuáles son mejores?', a: 'Las dos son igualmente seguras. Las uvas rojas/negras contienen más antioxidantes (antocianinas). Para variedad y estimulación, puedes alternar entre verdes y rojas.' },
      { q: '¿Mi loro puede comer zumo de uva?', a: 'El zumo de uva natural sin azúcar añadida es seguro en pequeñas cantidades, pero el alto contenido en azúcar lo hace poco recomendable. Ofrece siempre la fruta entera; la fibra ralentiza la absorción del azúcar.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-platano/', title: '¿Pueden comer plátano?', desc: 'Otra fruta muy popular.' },
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Alimentos tóxicos para loros', desc: 'Qué no deben comer nunca.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición aviar', desc: 'Guía completa.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-mango',
    title: '¿Pueden los loros comer mango?',
    shortAnswer: 'Sí. El mango es una fruta tropical excelente para los loros. Muy rico en vitamina A, C y carotenoides. Debe darse sin hueso y sin piel (si no es orgánico). La mayoría de los loros lo adoran.',
    sections: [
      { h: '¿Por qué el mango es tan bueno para los loros?', p: 'El mango es uno de los alimentos más ricos en beta-caroteno (provitamina A), esencial para la salud del plumaje, la visión y el sistema inmune. La vitamina A es el déficit más común en loros domésticos que se alimentan principalmente de semillas.\n\nAdemás aporta vitamina C (refuerzo inmune), vitamina E (antioxidante) y magnesio.' },
      { h: '¿Cómo preparar el mango para los loros?', p: 'Preparación correcta:\n\n1. Lavar bien la piel exterior\n2. Pelar si no es orgánico (la piel puede tener pesticidas)\n3. Retirar el hueso grande central\n4. Cortar la pulpa en trozos del tamaño adecuado a la especie\n5. Servir fresco, no congelado ni con azúcar añadida\n\nLa "carne" pegada al hueso es perfecta: puedes ofrecer el hueso pelado con pulpa adherida como enriquecimiento; el loro lo lamdrá y masticará entretenidamente durante mucho tiempo.' },
      { h: '¿El mango congelado es seguro?', p: 'El mango congelado sin azúcar añadida es seguro, pero debe descongelarse completamente y servirse a temperatura ambiente. Nunca ofrecer fruta helada directamente del congelador.' },
      { h: '¿Con qué frecuencia dar mango al loro?', p: 'El mango puede darse 3–5 veces por semana. Su riqueza en beta-caroteno lo convierte en una opción muy recomendable especialmente en loros con plumaje deslucido o que se alimentan principalmente de semillas.' },
    ],
    faqs: [
      { q: '¿La piel del mango es segura para los loros?', a: 'La piel del mango contiene urushiol (también presente en la hiedra venenosa) que puede causar irritación leve. Si el mango es orgánico, la piel en pequeña cantidad es segura. Si no lo es, pélalo siempre.' },
      { q: '¿El mango deshidratado es bueno para loros?', a: 'El mango deshidratado sin azúcar añadida ni sulfitos es un snack válido, pero concentra los azúcares. Ofrece porciones mínimas y no lo uses como sustituto del fresco.' },
      { q: '¿Puedo darle mango a un loro bebé en destete?', a: 'Sí, el mango maduro y suave es fácil de comer para los loros en destete. La textura blanda facilita la transición de papilla a alimentos sólidos.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-platano/', title: '¿Pueden comer plátano?', desc: 'Otra fruta tropical segura.' },
      { href: '/blog/que-comen-los-loros-bebes.html', title: 'Qué comen los loros bebés', desc: 'Alimentación en el destete.' },
      { href: '/conocimiento/nutricion/', title: 'Guía completa de nutrición', desc: 'Todo sobre la dieta aviar.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-nueces',
    title: '¿Pueden los loros comer nueces?',
    shortAnswer: 'Sí. Las nueces, almendras, avellanas y pistachos sin sal son seguros para los loros y muy nutritivos. Son ricos en grasas saludables, proteínas y vitamina E. Se deben ofrecer con moderación por su alto contenido calórico.',
    sections: [
      { h: '¿Qué frutos secos son seguros para los loros?', p: 'Seguros (sin sal, sin tostar en aceite):\n✓ Nuez (Juglans regia) — favorita de guacamayos y loros grises\n✓ Almendra cruda o tostada sin sal\n✓ Avellana cruda\n✓ Piñón (muy apreciado por todas las especies)\n✓ Nuez de Brasil (solo 1–2 veces/semana, alta en selenio)\n✓ Macadamia cruda — en muy pequeñas cantidades (alta en grasa)\n✓ Pistacho sin sal, sin cáscara\n\nPROHIBIDOS:\n✗ Cualquier fruto seco salado\n✗ Nuez moscada (tóxica)\n✗ Almendras amargas (contienen cianuro)\n✗ Macadamia para perros (no confundir: es tóxica para perros, pero generalmente tolerada por loros en pequeñas cantidades)' },
      { h: '¿Cuántos frutos secos puede comer un loro?', p: 'Los frutos secos son altamente calóricos. Para evitar obesidad (especialmente en amazónicas y loros grises sedentarios):\n\n• Periquito: 1 piñón o trocito de almendra al día como máximo\n• Ninfa: 1 piñón o media almendra al día\n• Loro gris: 1–2 nueces (mitades) al día\n• Amazona: 1 nuez o 2 almendras al día\n• Guacamayo: 2–3 nueces al día\n\nÚsalos como recompensa de adiestramiento, no como alimento ad libitum.' },
      { h: '¿La nuez es mejor con o sin cáscara?', p: 'Ofrecer la nuez con cáscara sin romper es un excelente enriquecimiento: el loro debe trabajar para abrirla, lo que estimula mentalmente y entretiene durante mucho tiempo. Los guacamayos son especialmente hábiles en descascarar nueces. Puedes marcarles una pequeña apertura para facilitar el comienzo.' },
    ],
    faqs: [
      { q: '¿La nuez de macadamia es tóxica para loros?', a: 'La macadamia es tóxica para perros, pero en loros no hay evidencia sólida de toxicidad. Sin embargo, por precaución y por su altísimo contenido en grasas, no se recomienda su uso habitual. Si decides ofrecerla, 1 unidad pequeña ocasionalmente.' },
      { q: '¿Las cacahuetes son seguros para loros?', a: 'El cacahuete sin sal y sin aflatoxinas visibles (sin moho) es seguro. El problema es que el cacahuete tiene alta probabilidad de contamination por Aspergillus si no está bien conservado. Elige cacahuetes de buena calidad y sin síntomas de humedad o moho.' },
      { q: '¿Los frutos secos tostados son malos para los loros?', a: 'Los frutos secos tostados al horno sin sal son seguros. Los fritos en aceite o con sal no son recomendables. La versión cruda o tostada sin aditivos es siempre la mejor opción.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-platano/', title: '¿Pueden comer plátano?', desc: 'Frutas seguras para loros.' },
      { href: '/blog/pellets-vs-semillas-loros-guia.html', title: 'Pellets vs semillas', desc: 'La base de la dieta aviar.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición aviar', desc: 'Guía completa.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-zanahoria',
    title: '¿Pueden los loros comer zanahoria?',
    shortAnswer: 'Sí. La zanahoria es uno de los mejores alimentos que puedes dar a tu loro. Rica en beta-caroteno (vitamina A), vitamina C, potasio y fibra. Se puede ofrecer cruda o cocida, con o sin piel.',
    sections: [
      { h: '¿Por qué la zanahoria es tan recomendable para loros?', p: 'La zanahoria es extraordinariamente rica en beta-caroteno, el precursor de la vitamina A. La deficiencia de vitamina A es la carencia nutricional más común en loros domésticos alimentados con semillas y se manifiesta en problemas de plumaje, ojos, pico y sistema inmune.\n\nUna zanahoria mediana cubre prácticamente el requerimiento diario de vitamina A de un loro gris o amazona.' },
      { h: '¿Zanahoria cruda o cocida para los loros?', p: 'Ambas opciones son seguras:\n\nZanahoria cruda: más fibra, textura que estimula el pico, mayor contenido en vitamina C (el calor la degrada ligeramente). Perfecta para enriquecimiento y juego.\n\nZanahoria cocida al vapor: más digestible, beta-caroteno más biodisponible (la cocción rompe las paredes celulares). Mejor opción para loros convalecientes o con problemas digestivos.\n\nSiempre sin sal ni condimentos.' },
      { h: '¿Las hojas de zanahoria son seguras?', p: 'Las hojas verdes de la zanahoria (los "tops") también son seguras y nutritivas para los loros. Son ricas en vitamina C, calcio y antioxidantes. Lava bien antes de ofrecer.' },
      { h: '¿Cuánta zanahoria puede comer un loro?', p: 'La zanahoria puede ofrecerse diariamente sin problema. Es una de las pocas verduras que puede constituir una parte importante de la dieta (hasta 20–25%) por su excelente perfil nutricional.\n\nPuedes ofrecerla entera (como juguete comestible), rallada, en bastoncitos o cocida en dados.' },
    ],
    faqs: [
      { q: '¿El zumo de zanahoria es bueno para los loros?', a: 'El zumo de zanahoria natural sin azúcar añadida es seguro, pero la fruta/verdura entera es preferible porque mantiene la fibra. Puedes mojar un trozo de zanahoria en zumo natural como variación.' },
      { q: '¿Puedo dar zanahoria baby a mi loro?', a: 'Sí, las zanahorias baby (baby carrots) son perfectas por su tamaño, especialmente para periquitos y ninfas. Lava bien antes de servir.' },
      { q: '¿La zanahoria puede cambiar el color del plumaje?', a: 'En teoría, el exceso de carotenoides puede dar un tinte anaranjado a plumas muy claras, pero en la práctica esto es extremadamente raro y solo se ha documentado en casos de dietas extremadamente ricas en zanahoria durante meses.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-tomate/', title: '¿Pueden comer tomate?', desc: 'Verdura con precauciones.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición aviar', desc: 'Guía completa de alimentación.' },
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Alimentos prohibidos', desc: 'Lista de tóxicos.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-brocoli',
    title: '¿Pueden los loros comer brócoli?',
    shortAnswer: 'Sí. El brócoli es uno de los superalimentos más recomendados para loros. Es extremadamente rico en vitamina C, calcio, vitamina K y antioxidantes. La mayoría de los loros lo comen con entusiasmo, crudo o ligeramente cocido.',
    sections: [
      { h: '¿Por qué el brócoli es tan bueno para los loros?', p: 'El brócoli es extraordinariamente nutritivo:\n\n• Vitamina C: refuerzo del sistema inmune\n• Calcio: salud ósea y huevos (en hembras)\n• Vitamina K: coagulación y salud ósea\n• Sulforafano: potente anticancerígeno y antioxidante\n• Folato (vitamina B9): esencial para la producción celular\n• Fibra: salud digestiva\n\nEl ratio nutrientes/calorías del brócoli es de los más altos del reino vegetal.' },
      { h: '¿Brócoli crudo o cocido para los loros?', p: 'Ambos son seguros. El brócoli crudo retiene más vitamina C y fibra. El cocido al vapor (no hervido) es más digestible y reduce los compuestos bociógenos (que en exceso extremo pueden afectar a la tiroides).\n\nPara uso habitual, el brócoli crudo es perfectamente adecuado. Si lo cueces, al vapor y sin sal, mínimo tiempo.' },
      { h: '¿Qué partes del brócoli puede comer el loro?', p: 'Todas las partes son seguras: cabeza (la flor), tronco/tallo, hojas. El tallo es especialmente apreciado por los loros más grandes para masticar. Las hojas son muy ricas en nutrientes y generalmente se desechan sin motivo.' },
      { h: '¿Con qué frecuencia dar brócoli?', p: 'El brócoli puede ofrecerse diariamente. Es uno de los pocos alimentos que los nutricionistas aviares recomiendan sin restricción de frecuencia (solo moderación en cantidad para mantener variedad).' },
    ],
    faqs: [
      { q: '¿Mi loro puede comer coliflor también?', a: 'Sí, la coliflor es igualmente segura y nutritiva. Pertenece a la misma familia (Brassicaceae). Brócoli, coliflor, col de Bruselas, repollo y kale son todos seguros para los loros.' },
      { q: '¿El brócoli congelado sirve?', a: 'El brócoli congelado (sin aditivos ni sal) es seguro y conveniente. Debe descongelarse completamente a temperatura ambiente antes de servir. Nunca ofrecerlo helado.' },
      { q: '¿Puede el brócoli causar gases en los loros?', a: 'En grandes cantidades, las Brassicaceae pueden causar flatulencia en algunas aves. Si notas deposiciones muy líquidas o malestar, reduce la cantidad temporalmente.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-zanahoria/', title: '¿Pueden comer zanahoria?', desc: 'Otra verdura estrella.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición aviar', desc: 'Guía completa.' },
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Lista de tóxicos', desc: 'Qué no deben comer.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-fresas',
    title: '¿Pueden los loros comer fresas?',
    shortAnswer: 'Sí. Las fresas son completamente seguras para los loros y una fuente excelente de vitamina C y antioxidantes. Su color rojo y olor intenso las hacen muy atractivas para la mayoría de las especies.',
    sections: [
      { h: '¿Por qué dar fresas a los loros?', p: 'Las fresas son ricas en vitamina C (más que las naranjas en proporción), antocianinas (potentes antioxidantes), ácido fólico, potasio y agua. Su textura blanda las hace accesibles para todas las especies, desde periquitos hasta guacamayos.' },
      { h: '¿Las semillitas de la fresa son seguras?', p: 'Sí, las pequeñas semillas externas de la fresa (aquenios) son completamente seguras e indigestibles sin riesgo. No hay compuestos tóxicos en ellas.' },
      { h: '¿Cuántas fresas puede comer un loro?', p: '• Periquito / agapornis: 1–2 trozos pequeños\n• Ninfa: ½ fresa mediana\n• Loro gris / amazona: 1–2 fresas medianas\n• Guacamayo: 2–4 fresas\n\nFrecuencia: 3–5 veces por semana. Son bajas en calorías, así que el límite principal es el azúcar natural (fructosa).' },
      { h: '¿Las fresas silvestres son mejores?', p: 'Las fresas silvestres (fresas de bosque, fresones pequeños) son igual de seguras y en general más aromáticas. Lo importante es que estén maduras y se laven bien para eliminar pesticidas.' },
    ],
    faqs: [
      { q: '¿Las fresas pueden teñir las plumas del loro?', a: 'El jugo rojo de las fresas puede manchar temporalmente el plumaje claro (como el de cacatúas blancas), pero se elimina en la siguiente muda o con un baño. No supone ningún riesgo.' },
      { q: '¿La mermelada de fresa es segura?', a: 'No. Las mermeladas contienen grandes cantidades de azúcar añadida y a veces conservantes. Solo fresas frescas o congeladas sin aditivos.' },
      { q: '¿Las fresas congeladas son buenas para loros?', a: 'Sí, las fresas congeladas sin azúcar son una opción conveniente. Descongela completamente antes de servir. En verano, ligeramente descongeladas pueden ser un snack refrescante.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-platano/', title: '¿Pueden comer plátano?', desc: 'Fruta tropical segura.' },
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-uvas/', title: '¿Pueden comer uvas?', desc: 'Otro snack dulce popular.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición', desc: 'Guía completa de alimentación aviar.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-pan',
    title: '¿Pueden los loros comer pan?',
    shortAnswer: 'Sí en pequeñas cantidades, pero no es recomendable como alimento habitual. El pan industrial contiene sal, azúcar, aditivos y levaduras que no son beneficiosas para los loros. Si se da, mejor pan integral sin sal y en mínima cantidad.',
    sections: [
      { h: '¿Por qué el pan no es ideal para los loros?', p: 'El pan industrial contiene:\n• Sal: los loros son muy sensibles al sodio. Cantidades elevadas causan sed excesiva, diarrea y problemas renales\n• Azúcar refinada: contribuye a obesidad y problemas hepáticos\n• Levadura de panadería activa: puede causar fermentación en el buche\n• Conservantes y aditivos: potencialmente perjudiciales\n\nAdemás, el pan es un alimento de "calorías vacías": aporta energía sin vitaminas, minerales ni fibra de calidad.' },
      { h: '¿Qué tipo de pan es menos perjudicial?', p: 'Si quieres dar pan a tu loro, la opción menos dañina es:\n• Pan integral sin sal (o con mínima sal)\n• Pan artesanal sin conservantes\n• Tostada sin mantequilla ni topping\n• Galletas de arroz sin sal\n\nPorción máxima: un trocito del tamaño de la uña, 1–2 veces por semana máximo. No como alimento habitual.' },
      { h: '¿El pan puede causar problemas al buche?', p: 'La levadura activa en el pan fresco puede causar candidiasis (infección por Cándida) si el loro come cantidades significativas. El pan seco o tostado presenta menos riesgo porque la levadura ya está inactivada por el calor.' },
      { h: '¿Qué dar en lugar de pan?', p: 'Si quieres dar algo crujiente y satisfactorio, las alternativas saludables son: galletas de arroz sin sal, avena tostada, bastoncitos de zanahoria cruda, trozos de mazorca de maíz, o pellets en formas crujientes. El loro obtiene el mismo placer de masticar sin los riesgos del pan.' },
    ],
    faqs: [
      { q: '¿El pan de centeno es mejor para los loros?', a: 'El pan de centeno integral sin sal es una opción marginalmente mejor por su mayor fibra, pero sigue sin ser recomendable como alimento habitual. Las mismas reglas aplican: mínima cantidad, sin sal.' },
      { q: '¿Mi loro puede comer pan mojado en agua?', a: 'El pan empapado en agua tiende a fermentar rápidamente, lo que lo hace aún menos recomendable. Si quieres ofrecer algo blando, el arroz cocido o la avena son opciones mucho mejores.' },
      { q: '¿Las galletas de arroz sin sal son una buena alternativa?', a: 'Sí, las tortas de arroz sin sal son una alternativa aceptable para el loro que quiera algo crujiente. Pero incluso estas deben ser un complemento ocasional, no la base de la dieta.' },
    ],
    related: [
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-arroz/', title: '¿Pueden comer arroz?', desc: 'El cereal más recomendable.' },
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Alimentos tóxicos para loros', desc: 'Lista completa de peligros.' },
      { href: '/conocimiento/nutricion/', title: 'Centro de nutrición aviar', desc: 'Guía completa de alimentación.' },
    ],
  },
  {
    cat: 'alimentacion', catLabel: 'Alimentación', catIcon: '🥦',
    slug: 'pueden-los-loros-comer-chocolate',
    title: '¿Pueden los loros comer chocolate?',
    shortAnswer: 'No. El chocolate es tóxico para los loros y puede ser mortal. Contiene teobromina y cafeína que en aves provocan vómitos, diarrea, convulsiones, arritmias cardíacas y la muerte.',
    sections: [
      { h: '¿Por qué el chocolate es peligroso para los loros?', p: 'El chocolate contiene dos sustancias tóxicas para las aves:\n\n1. Teobromina: metilxantina que los loros (y perros, gatos) no pueden metabolizar eficazmente. Se acumula en el organismo y daña el sistema nervioso y cardíaco.\n\n2. Cafeína: estimulante que en aves provoca taquicardia, hipertensión y convulsiones.\n\nEl contenido de teobromina es mayor en el chocolate negro puro (~150–200 mg/oz) y menor en el chocolate con leche (~50 mg/oz), pero ninguna cantidad es segura.' },
      { h: '¿Qué cantidad de chocolate puede matar a un loro?', p: 'Las dosis letales en aves son muy bajas. Un trozo pequeño de chocolate negro (1–2 gramos) puede ser suficiente para matar a un periquito. Para un loro gris, dosis mayores son necesarias para ser letales pero cualquier cantidad causará síntomas graves.\n\nNO existe una cantidad "segura" de chocolate para los loros.' },
      { h: '¿Qué hago si mi loro comió chocolate?', p: 'Actúa inmediatamente:\n\n1. Llama a tu veterinario de aves o urgencias veterinarias de inmediato\n2. Indica el tipo de chocolate (negro, con leche, blanco), cantidad estimada y tiempo transcurrido\n3. No induzcas el vómito por tu cuenta\n4. Observa síntomas: vómitos, diarrea, temblores, convulsiones, debilidad extrema\n\nEl tratamiento precoz (lavado gástrico, carbón activado) puede salvar la vida del loro.' },
      { h: '¿El chocolate blanco también es tóxico?', p: 'El chocolate blanco tiene muy poca teobromina (casi nula) pero contiene grasa, azúcar, lactosa y cafeína en pequeñas cantidades. Aunque menos tóxico que el chocolate negro, no debe darse a los loros. No tiene ningún beneficio nutricional y sí potenciales riesgos.' },
    ],
    faqs: [
      { q: '¿El cacao puro en polvo es tan peligroso?', a: 'El cacao en polvo sin azúcar es más peligroso que el chocolate negro porque tiene una concentración mayor de teobromina. Evitar completamente y mantener fuera del alcance del loro.' },
      { q: '¿Las galletitas con "sabor a chocolate" son seguras?', a: 'No. Cualquier producto que contenga cacao o teobromina es potencialmente peligroso. Aunque la cantidad sea menor, el principio activo sigue presente.' },
      { q: '¿Mi loro robó un trocito de galleta de chocolate, es urgencia?', a: 'Depende del tamaño de la galleta y la cantidad de chocolate. Si era un mordisco mínimo de galleta con chips de chocolate, el riesgo es bajo pero real. Llama al veterinario para valorar el caso específico.' },
    ],
    related: [
      { href: '/blog/alimentos-toxicos-loros.html', title: 'Lista completa de tóxicos para loros', desc: 'Todos los alimentos peligrosos.' },
      { href: '/preguntas/alimentacion/pueden-los-loros-comer-aguacate/', title: '¿Pueden comer aguacate?', desc: 'Otro alimento mortal.' },
      { href: '/conocimiento/salud/', title: 'Centro de salud aviar', desc: 'Señales de alarma y emergencias.' },
    ],
  },

  // ── Comportamiento (15) ───────────────────────────────────────────────────
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'por-que-gritan-los-loros',
    title: '¿Por qué gritan los loros?',
    shortAnswer: 'Los loros gritan porque es su forma natural de comunicarse con su "bandada" (la familia humana). Las causas más comunes son: pedir atención, marcar presencia, responder al entorno, aburrimiento o miedo. Identificar el tipo de grito es clave para solucionarlo.',
    sections: [
      { h: 'Tipos de gritos y qué significan', p: 'Los loros emiten diferentes tipos de vocalizaciones:\n\n1. Grito de contacto: "¿Dónde estás?" Respóndele brevemente y verás que para. Es comunicación normal.\n2. Grito de alarma: agudo, repetitivo. Algo le asusta. Busca el estímulo (pájaro externo, reflejo, cambio en el entorno).\n3. Grito de atención: si has salido de la sala. Aprende a no responder con atención inmediata.\n4. Grito de aburrimiento: monótono, continuo. Necesita estimulación.\n5. Grito al anochecer/amanecer: comunicación de bandada natural. Aceptable.' },
      { h: '¿Cómo reducir los gritos innecesarios?', p: 'Técnicas probadas:\n\n• No reforzar: no acudas corriendo cuando grita para pedir atención. Si lo haces, aprendes que "gritando me hacen caso".\n• Tiempo fuera de la jaula: mínimo 3–4 horas diarias de interacción directa reducen los gritos de soledad.\n• Enriquecimiento: juguetes forrajeros, rotación semanal de juguetes, música o radio de fondo.\n• Entrenamiento: enseña una vocalización alternativa (silbar, decir una palabra) y recompénsala.\n• Señales de calma: cuando esté callado durante 5+ segundos, acércate y refuérzalo.' },
      { h: '¿A qué hora gritan más los loros?', p: 'El amanecer y el atardecer son los picos naturales de vocalización. En estado salvaje, las aves usan estos momentos para comunicarse con la bandada. Esto es completamente normal y esperado. Si el grito nocturno es frecuente, verifica que no haya estímulos visuales (sombras, reflejos) que le asusten.' },
    ],
    faqs: [
      { q: '¿Cuáles son los loros más silenciosos?', a: 'Las ninfas (Nymphicus hollandicus), los periquitos y los loros de Pionus son los más silenciosos. Los más ruidosos son los guacamayos, las cacatúas y las amazonas. Sin embargo, todos los loros vocalizan.' },
      { q: '¿Está mal que griten?', a: 'No. Los gritos son comunicación normal. El problema surge cuando son excesivos, continuos y sin respuesta al enriquecimiento. Distingue entre vocalización normal y ansiedad.' },
      { q: '¿El spray de agua reduce los gritos?', a: 'No se recomienda como método de corrección. El agua puede generar miedo y estrés. Los métodos de refuerzo positivo son más efectivos y no dañan la relación.' },
    ],
    related: [
      { href: '/blog/ruido-loro-gestionar.html', title: 'Cómo gestionar el ruido del loro', desc: 'Técnicas paso a paso.' },
      { href: '/conocimiento/comportamiento/', title: 'Centro de comportamiento aviar', desc: 'Psicología y lenguaje corporal.' },
      { href: '/conocimiento/adiestramiento/', title: 'Adiestramiento con refuerzo positivo', desc: 'Técnicas para cambiar hábitos.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'por-que-muerden-los-loros',
    title: '¿Por qué muerden los loros?',
    shortAnswer: 'Los loros muerden principalmente por miedo, exceso de estimulación, defensa de territorio, pubertad hormonal o comunicación. El mordisco no es agresión sin motivo; siempre tiene una causa identificable que se puede abordar.',
    sections: [
      { h: 'Causas más comunes del mordisco', p: '1. Miedo: un loro asustado muerde como defensa. Señales previas: pupila contraída, plumas aplastadas, postura encorvada.\n2. Exceso de estimulación: durante el juego intenso o caricias prolongadas. El loro avisa con lenguaje corporal antes.\n3. Pubertad (2–4 años): cambios hormonales generan más reactividad. Pasajero.\n4. Defensa de territorio: la jaula, un juguete favorito o la persona "de referencia".\n5. Dolor o malestar: un loro que muerde de forma inusual puede estar enfermo.\n6. Comunicación: el loro aprendió que el mordisco funciona (les hacen caso).' },
      { h: 'Cómo responder correctamente a un mordisco', p: 'Lo que NO se debe hacer:\n• Gritar o reaccionar exageradamente (refuerza la acción)\n• Soplar en la cara del loro (genera miedo)\n• Sacudir la mano (peligroso y contraproducente)\n• Poner en cuarentena como castigo\n\nLo que SÍ funciona:\n• Mantener la calma\n• Retirar suavemente la mano SIN reacción dramática\n• Ignorar brevemente (30–60 segundos sin contacto)\n• Volver a intentar con el loro en modo calmado\n• Leer el lenguaje corporal ANTES de que llegue el mordisco' },
      { h: 'Prevención: cómo evitar que el loro muerda', p: 'El 90% de los mordiscos se pueden prevenir leyendo el lenguaje corporal del loro:\n\n• Pupilas muy contraídas (pinning): excitación alta, precaución\n• Abaniqueo de alas: puede ser agresividad o petición de atención\n• Plumas aplastadas + postura baja: miedo, no tocar\n• Cola que se abre y cierra: irritación\n• Inclinación hacia adelante con pico abierto: aviso claro\n\nRetira tu mano antes de que llegue el mordisco. Con tiempo, aprenderás el umbral de cada loro.' },
    ],
    faqs: [
      { q: '¿Un loro que muerde puede rehabilitarse?', a: 'Absolutamente. Incluso loros con historial grave de mordiscos pueden aprender con paciencia, consistencia y técnicas de refuerzo positivo. El tiempo requerido varía según la causa y el historial del loro.' },
      { q: '¿Los guantes protegen de los mordiscos?', a: 'Los guantes no son recomendables para el manejo cotidiano: impiden sentir la presión del loro y reducen la sensibilidad de comunicación. Úsalos solo en situaciones de riesgo real (transporte de aves no socializadas).' },
      { q: '¿El loro muerde más durante la muda?', a: 'Sí. La muda puede ser incómoda para el loro, especialmente cuando salen las plumas de pin (que son muy sensibles). Un loro en muda puede ser más reactivo al tacto. Ten más cuidado durante este período.' },
    ],
    related: [
      { href: '/blog/loro-mordedor-como-educarlo.html', title: 'Loro mordedor: cómo educarle', desc: 'Guía completa de corrección.' },
      { href: '/conocimiento/adiestramiento/', title: 'Adiestramiento con refuerzo positivo', desc: 'Técnicas para cambiar hábitos.' },
      { href: '/conocimiento/comportamiento/', title: 'Centro de comportamiento', desc: 'Psicología aviar completa.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'cuanto-tiempo-duerme-un-loro',
    title: '¿Cuánto tiempo duerme un loro?',
    shortAnswer: 'Los loros necesitan entre 10 y 12 horas de sueño nocturno ininterrumpido. Un sueño insuficiente o de mala calidad causa irritabilidad, sistema inmune debilitado, más gritos y problemas de comportamiento.',
    sections: [
      { h: '¿Cuántas horas de sueño necesita cada especie?', p: 'Guía por especie:\n\n• Periquito: 10–12 horas\n• Agapornis: 10–12 horas\n• Ninfa (cockatiel): 10–12 horas\n• Loro gris africano: 10–12 horas (muy sensibles a la privación)\n• Guacamayo: 10–12 horas\n• Amazona: 10–11 horas\n• Cacatúa: 10–12 horas\n\nEn general, 10–12 horas es la regla universal para todos los loros.' },
      { h: '¿Cómo crear un ambiente óptimo para dormir?', p: 'Factores clave:\n\n1. Oscuridad completa o casi completa (cubrir la jaula con una tela opaca)\n2. Silencio o ruido blanco bajo (sin TV, conversaciones fuertes)\n3. Temperatura estable: 18–22°C (sin corrientes de aire)\n4. Mismo horario todos los días: los loros son criaturas de rutina\n5. Ubicación tranquila: no cubrir la jaula en el salón con personas activas' },
      { h: '¿Qué pasa si el loro duerme poco?', p: 'La privación crónica de sueño en loros se manifiesta como:\n\n• Irritabilidad y más mordiscos\n• Gritos excesivos\n• Plumaje en mal estado\n• Sistema inmune debilitado (mayor susceptibilidad a enfermedades)\n• Comportamientos compulsivos (arranque de plumas en casos extremos)\n\nMuchos problemas de comportamiento que los propietarios atribuyen a "mal carácter" tienen como causa el sueño insuficiente.' },
      { h: '¿Pueden dormir siestas durante el día?', p: 'Sí, las siestas cortas (15–30 minutos) durante el día son normales y saludables, especialmente al mediodía. Un loro que duerme durante horas en pleno día y tiene plumas erizadas puede estar enfermo. Consulta al veterinario.' },
    ],
    faqs: [
      { q: '¿Debo cubrir siempre la jaula por la noche?', a: 'Recomendado pero no obligatorio. Si la habitación queda en oscuridad completa y sin ruido, no es imprescindible. La cubierta ayuda a mantener temperatura, oscuridad y da al loro una señal clara de "hora de dormir".' },
      { q: '¿Los loros se despiertan si hay luz?', a: 'Sí, los loros responden a la luz como señal de inicio del día. Las luces nocturnas, farolas externas o pantallas de TV pueden interrumpir el sueño. Usa una cubierta opaca si hay fuentes de luz.' },
      { q: '¿Mi loro puede dormir en mi habitación?', a: 'Sí, siempre que la habitación permanezca oscura y silenciosa durante 10–12 horas. La presencia humana puede ser reconfortante para algunos loros. Ten en cuenta que cualquier movimiento tuyo puede despertarle.' },
    ],
    related: [
      { href: '/blog/cuidados-diarios-loro.html', title: 'Cuidados diarios del loro', desc: 'Rutina completa incluyendo el descanso.' },
      { href: '/conocimiento/comportamiento/', title: 'Centro de comportamiento', desc: 'Psicología y bienestar aviar.' },
      { href: '/cuidados-basicos-de-un-loro', title: 'Cuidados básicos del loro', desc: 'Todo lo que necesitas saber.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'por-que-arrancan-plumas-los-loros',
    title: '¿Por qué los loros se arrancan las plumas?',
    shortAnswer: 'El arranque de plumas (plucking) es un trastorno compulsivo con múltiples causas: estrés, aburrimiento, carencias nutricionales, infecciones (bacterianas, fúngicas, virales) o causas psicológicas. Siempre requiere evaluación veterinaria urgente.',
    sections: [
      { h: '¿Es lo mismo el plucking que la muda normal?', p: 'No. La muda normal es un proceso natural y cíclico en que el loro pierde plumas antiguas y las reemplaza por nuevas. Normalmente solo se ven algunas plumas sueltas en el fondo de la jaula.\n\nEl plucking es cuando el loro se arranca activamente las plumas con el pico, dejando zonas desnudas o con plumas rotas. Es un comportamiento compulsivo, no un proceso natural.' },
      { h: 'Causas más comunes del plucking', p: '1. Psicológicas: aburrimiento crónico, soledad, cambios bruscos en el entorno, separación de su criador/referente.\n2. Médicas: dermatitis bacteriana, candidiasis, aspergilosis, psittacosis, parásitos, alergia alimentaria.\n3. Nutricionales: déficit de vitamina A, calcio, ácidos grasos omega-3, proteína.\n4. Hormonales: temporada reproductiva (especialmente en hembras).\n5. Formación de hábito: una vez establecido, el plucking se vuelve compulsivo aunque desaparezca la causa.' },
      { h: '¿Qué hacer si el loro empieza a arrancar plumas?', p: 'Pasos inmediatos:\n\n1. Visita veterinaria urgente: el veterinario descartará causas médicas (analítica, cultivos) antes de atribuirlo a causas conductuales.\n2. Enriquecimiento intensivo: añade 3–5 juguetes nuevos, forrajeros, música, más tiempo fuera de la jaula.\n3. Revisión de dieta: asegura variedad nutritiva, especialmente fuentes de beta-caroteno y proteína.\n4. Evalúa cambios recientes: ¿nuevo animal en casa? ¿mudanza? ¿cambio de horario?\n5. NO usar collarín restrictivo sin indicación veterinaria.' },
    ],
    faqs: [
      { q: '¿El loro puede recuperar las plumas después del plucking?', a: 'Depende del tiempo y la extensión del daño. Si los folículos pilosos no están dañados, las plumas pueden crecer en la siguiente muda. Folículos dañados de forma crónica pueden no recuperarse.' },
      { q: '¿El plucking se puede curar completamente?', a: 'En muchos casos sí, especialmente si se detecta temprano y se trata la causa subyacente. Los casos crónicos de más de 6–12 meses son más difíciles de resolver.' },
      { q: '¿Comprar otro loro ayuda al plucking por soledad?', a: 'No siempre. Introducir otro loro puede aumentar el estrés si no se hace correctamente. Consulta con el veterinario antes de tomar esta decisión.' },
    ],
    related: [
      { href: '/blog/senales-estres-loro.html', title: 'Señales de estrés en el loro', desc: 'Cómo detectar problemas tempranos.' },
      { href: '/conocimiento/salud/', title: 'Centro de salud aviar', desc: 'Enfermedades y diagnósticos.' },
      { href: '/blog/enriquecimiento-ambiental-loros.html', title: 'Enriquecimiento ambiental', desc: 'Cómo estimular a tu loro.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'pueden-vivir-solos-los-loros',
    title: '¿Pueden vivir solos los loros?',
    shortAnswer: 'Los loros pueden vivir como mascota única si reciben suficiente atención humana (mínimo 3–4 horas diarias). Son aves altamente sociales y sin compañía desarrollan problemas psicológicos graves. La clave está en la calidad y cantidad de la interacción humana.',
    sections: [
      { h: '¿Son los loros animales solitarios?', p: 'No. Los loros son aves sociales de bandada. En estado silvestre viven en grupos de decenas a miles de individuos según la especie. La soledad prolongada es contraria a su naturaleza.\n\nSin embargo, a diferencia de otros animales de bandada, los loros pueden adaptarse a un humano como "compañero principal" siempre que la interacción sea rica y suficiente.' },
      { h: '¿Cuántas horas de atención necesita un loro solo?', p: 'Mínimo diario indispensable:\n• 3–4 horas de interacción directa (juego, adiestramiento, contacto)\n• Radio o televisión de fondo cuando estás fuera\n• Juguetes rotativos que cambies semanalmente\n• Visión de la actividad humana cotidiana\n\nUn loro que pasa más de 8–10 horas solo diariamente estará en riesgo de desarrollar trastornos conductuales.' },
      { h: '¿Qué pasa si el loro está solo demasiadas horas?', p: 'Consecuencias del aislamiento prolongado:\n• Gritos excesivos y compulsivos\n• Arranque de plumas (plucking)\n• Estereotipias (movimientos repetitivos sin sentido)\n• Agresividad o apatía extrema\n• Depresión aviar (sí, los loros se deprimen)\n• Inmunosupresión y mayor susceptibilidad a enfermedades' },
      { h: '¿Es mejor tener dos loros?', p: 'Para propietarios con horario de trabajo largo (más de 8 horas fuera de casa), tener dos loros de la misma especie o compatibles puede ser la mejor opción. Sin embargo, dos loros vinculados entre sí pueden "independizarse" del humano y perder su sociabilidad con personas.\n\nLa decisión debe meditarse bien. Consulta con criadores expertos antes de tomar dos loros.' },
    ],
    faqs: [
      { q: '¿Los loros pequeños (periquitos) sufren más la soledad?', a: 'Los periquitos son aves de bandada aún más gregarios que muchos loros grandes. Un periquito solo puede beneficiarse enormemente de la compañía de otro periquito. En este caso, tener dos es muy recomendable.' },
      { q: '¿Puedo dejar al loro solo un fin de semana?', a: 'No se recomienda dejarlo completamente solo más de 24–36 horas. Si debes viajar, organiza que alguien lo visite mínimo 2 veces al día para alimentarlo, renovar el agua e interactuar brevemente.' },
      { q: '¿El loro se acompaña de los perros o gatos de la casa?', a: 'Los perros y gatos NO son compañeros adecuados para los loros. La presencia de depredadores naturales genera estrés crónico en el loro incluso si el otro animal "no hace nada". El loro necesita compañía de su propia especie o humanos.' },
    ],
    related: [
      { href: '/blog/loro-solo-cuanto-tiempo.html', title: '¿Cuánto tiempo puede estar solo?', desc: 'Límites y soluciones.' },
      { href: '/conocimiento/comportamiento/', title: 'Centro de comportamiento aviar', desc: 'Psicología y bienestar.' },
      { href: '/herramientas/', title: '¿Qué loro es para mí?', desc: 'Test de compatibilidad interactivo.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'reconocen-las-personas-los-loros',
    title: '¿Pueden los loros reconocer personas?',
    shortAnswer: 'Sí. Los loros tienen una capacidad excepcional para reconocer y distinguir personas individuales, tanto por la cara como por la voz. Esta habilidad es comparable a la de los primates y muy superior a la mayoría de las mascotas domésticas.',
    sections: [
      { h: '¿Cómo reconocen los loros a las personas?', p: 'Los loros utilizan múltiples canales de reconocimiento:\n\n1. Visual: reconocen rasgos faciales con gran precisión. Estudios en loros grises muestran que distinguen caras humanas incluso en fotografías.\n2. Auditivo: reconocen voces individuales y asocian tonos de voz a emociones.\n3. Olfativo: aunque menos desarrollado que en mamíferos, también usan el olfato.\n4. Comportamental: aprenden los patrones de comportamiento de sus cuidadores (hora de llegada, rutinas, palabras).' },
      { h: '¿A cuántas personas puede reconocer un loro?', p: 'Los loros pueden distinguir un número significativo de personas y mantener relaciones sociales diferenciadas con cada una. Algunos son muy sociables con todos; otros (especialmente los yacos) desarrollan vínculos muy fuertes con 1–2 personas de referencia y son más reservados con el resto.\n\nEsta preferencia individual es una de las características que hace tan especiales a los loros como mascotas.' },
      { h: '¿Recuerdan a personas después de mucho tiempo?', p: 'Sí. Los loros tienen una memoria excepcional. Existen casos documentados de loros que reconocen a personas después de años de separación, manteniendo el mismo comportamiento afectivo o incluso evitativo que tenían en el pasado.\n\nEsta capacidad de memoria a largo plazo también implica que los traumas o experiencias negativas pueden persistir durante años.' },
    ],
    faqs: [
      { q: '¿Los loros recuerdan a personas fallecidas?', a: 'Los loros pueden mostrar comportamientos que sugieren que notan la ausencia de personas importantes en su vida. Aunque no podemos conocer exactamente su experiencia subjetiva, sí se han observado comportamientos de búsqueda y tristeza.' },
      { q: '¿Mi loro me reconocerá después de las vacaciones?', a: 'Sí, con total certeza. Un loro que tiene vínculos establecidos reconoce a sus cuidadores después de semanas o incluso meses de ausencia.' },
      { q: '¿Por qué mi loro reacciona diferente a cada miembro de la familia?', a: 'Porque cada relación es individual. El loro ha aprendido la personalidad, rutinas y formas de interactuar de cada persona y responde en consecuencia. Es perfectamente normal.' },
    ],
    related: [
      { href: '/blog/como-domesticar-un-loro.html', title: 'Cómo domesticar un loro', desc: 'Crear vínculos seguros.' },
      { href: '/conocimiento/comportamiento/', title: 'Centro de comportamiento', desc: 'Inteligencia y cognición aviar.' },
      { href: '/blog/loros-mas-inteligentes.html', title: 'Los loros más inteligentes', desc: 'Ranking de inteligencia por especie.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'pueden-viajar-en-avion-los-loros',
    title: '¿Pueden los loros viajar en avión?',
    shortAnswer: 'Sí, los loros pueden viajar en avión, pero con requisitos específicos. Las aves pequeñas (periquito, ninfa) pueden ir en cabina con algunas compañías. Las especies grandes (loro gris, guacamayo) deben ir en bodega como carga viva bajo las normas IATA.',
    sections: [
      { h: '¿Qué compañías aéreas admiten loros en cabina?', p: 'En España, algunas compañías permiten pequeñas aves (hasta ≈5 kg total transportín incluido) en cabina:\n\n• Iberia: aves domésticas en cabina bajo restricciones específicas\n• Vueling: admite aves en cabina en rutas europeas\n• Ryanair: generalmente NO admite aves en cabina\n\nSiempre confirma con la aerolínea específica antes de comprar el billete. Las políticas cambian frecuentemente.' },
      { h: '¿Qué documentación necesita un loro para volar?', p: 'Documentación necesaria:\n\n1. Certificado veterinario oficial emitido máximo 10 días antes del vuelo\n2. Para especies CITES I o II: permiso de movimiento emitido por la autoridad CITES nacional (MITECO en España)\n3. Dentro de la UE: pasaporte europeo para animales de compañía (no obligatorio para aves pero recomendable)\n4. La documentación propia del loro: CITES, anilla\n\nPara vuelos extracomunitarios: el país de destino puede exigir cuarentena y permisos adicionales.' },
      { h: '¿Es seguro el viaje en bodega para un loro?', p: 'Los vuelos en bodega están regulados por IATA (normas Live Animals Regulations). Las bodegas de los aviones modernos están pressurizadas y tienen temperatura controlada (15–24°C).\n\nSin embargo, el viaje en bodega supone estrés para el loro: ruido, vibración, oscuridad y separación del propietario. Para especies con tendencia a la ansiedad (como el loro gris africano), considera si el viaje es realmente necesario.' },
    ],
    faqs: [
      { q: '¿Qué transportín necesito para el avión?', a: 'Un transportín certificado IATA Live Animals, de material rígido, con ventilación en al menos 3 lados, con comedero y bebedero accesibles desde el exterior, y las dimensiones adecuadas para que el loro esté de pie y pueda girarse.' },
      { q: '¿Puedo dar sedante a mi loro antes del vuelo?', a: 'Solo bajo prescripción veterinaria. Algunos veterinarios pueden recomendar ansiolíticos suaves, pero muchos especialistas en aves desaconsejan la sedación para viajes en avión porque puede afectar a la respiración a altitud.' },
      { q: '¿Cómo acostumbrar al loro al transportín antes del vuelo?', a: 'Presenta el transportín varias semanas antes. Déjalo abierto con comida dentro, haz que el loro lo explore voluntariamente, luego practica cierres breves. Un loro familiarizado con el transportín viaja con mucho menos estrés.' },
    ],
    related: [
      { href: '/conocimiento/viajes/', title: 'Centro de viajes con loros', desc: 'Guía completa de transporte aviar.' },
      { href: '/transportines-loros', title: 'Transportines IATA para loros', desc: 'Modelos y características.' },
      { href: '/blog/viajar-con-loro.html', title: 'Viajar con un loro', desc: 'Todo lo que necesitas saber.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'cuantas-horas-fuera-jaula-loro',
    title: '¿Cuántas horas debe estar el loro fuera de la jaula?',
    shortAnswer: 'Mínimo 3–4 horas diarias de vuelo libre supervisado. Lo ideal es 4–6 horas repartidas en varias salidas. Los loros son aves de amplio territorio y el confinamiento excesivo causa estrés, trastornos conductuales y problemas de salud.',
    sections: [
      { h: '¿Por qué es importante el tiempo fuera de la jaula?', p: 'Los loros en estado silvestre vuelan decenas de kilómetros al día. La jaula, aunque grande, no permite este nivel de movimiento.\n\nEl tiempo fuera de la jaula permite:\n• Ejercicio físico (vuelo, trepar, escalar)\n• Estimulación cognitiva (explorar entornos nuevos)\n• Socialización con la familia\n• Fortalecimiento de la musculatura\n• Reducción del estrés y el aburrimiento\n\nLoros que no salen regularmente desarrollan obesidad, problemas cardíacos y conductas compulsivas.' },
      { h: '¿Cómo hacer seguro el espacio de vuelo libre?', p: 'Antes de dejar salir al loro:\n\n1. Cierra ventanas y puertas (incluyendo aseos y cocinas)\n2. Retira plantas tóxicas del alcance\n3. Aleja a otros animales (perros, gatos)\n4. Cubre o apaga superficies reflectantes que confundan (espejos, ventanas)\n5. Protege cables eléctricos\n6. Cierra el horno y retirar utensilios de teflón caliente (emiten gases letales)\n7. Retira velas y fragancias en difusor (tóxicas para aves)' },
      { h: 'Rutina recomendada de tiempo fuera de la jaula', p: 'Rutina óptima:\n• Mañana: 1–2 horas tras el desayuno del loro\n• Tarde: 2–3 horas al llegar a casa\n• Antes de dormir: volver a la jaula 1 hora antes del cubierto\n\nMantener horarios regulares ayuda al loro a anticipar las salidas y reduce la ansiedad.' },
    ],
    faqs: [
      { q: '¿Puede un loro estar demasiado tiempo fuera de la jaula?', a: 'No existe "demasiado tiempo" siempre que el loro pueda retirarse a su jaula voluntariamente para comer, dormir y descansar. La jaula debe ser siempre de acceso libre, nunca una prisión.' },
      { q: '¿Es obligatorio que vuele o puede solo caminar?', a: 'El vuelo es lo más beneficioso, pero no todos los loros (especialmente con corte de alas) pueden volar. El caminar, trepar y explorar también aportan estimulación. Si el loro tiene las alas cortadas, ofrece estructuras para trepar.' },
      { q: '¿Cuándo deje solo al loro en casa, lo dejo salir?', a: 'No. El vuelo libre debe ser siempre supervisado. Un loro solo en una habitación puede quedar atrapado, ingerir algo peligroso o asustarse. Cuando no estás en casa, el loro debe estar en su jaula.' },
    ],
    related: [
      { href: '/blog/cuidados-diarios-loro.html', title: 'Cuidados diarios del loro', desc: 'Rutina completa recomendada.' },
      { href: '/conocimiento/instalaciones/', title: 'Instalaciones y vivienda', desc: 'Cómo preparar el espacio.' },
      { href: '/blog/enriquecimiento-ambiental-loros.html', title: 'Enriquecimiento ambiental', desc: 'Ideas para estimular al loro.' },
    ],
  },
  {
    cat: 'comportamiento', catLabel: 'Comportamiento', catIcon: '🧠',
    slug: 'por-que-su-loro-no-habla',
    title: '¿Por qué mi loro no habla?',
    shortAnswer: 'No todos los loros aprenden a hablar, aunque la especie sea conocida como habladora. Factores como la edad de adquisición, la cantidad de interacción, la especie, el sexo y la personalidad individual determinan el desarrollo del habla.',
    sections: [
      { h: '¿Todos los loros pueden aprender a hablar?', p: 'No. Aunque muchas especies son capaces de imitar el habla humana, no todos los individuos desarrollan esta habilidad. Factores clave:\n\n• Especie: el loro gris africano es el más dotado lingüísticamente. Los guacamayos y amazonas suelen hablar bien. Los conuros y ninfas hablan menos y con menor claridad.\n• Individuo: dentro de la misma especie hay grandes variaciones. Algunos loros son naturalmente más vocales; otros prefieren otras formas de comunicación.\n• Sexo: en algunas especies (ninfas, cacatúas) los machos tienden a hablar más.' },
      { h: '¿Cómo enseñar a hablar a un loro?', p: 'Técnicas efectivas:\n\n1. Repetición en contexto: di la misma palabra cada vez que hagas la misma acción ("hola" al llegar, "adiós" al irte, "come" al dar comida).\n2. Sesiones cortas: 5–10 minutos 3 veces al día son más efectivos que 1 hora seguida.\n3. Entusiasmo en la voz: los loros aprenden mejor palabras dichas con energía emocional positiva.\n4. Recompensa inmediata: cuando el loro emite un sonido parecido, refuérzalo con un premio.\n5. Grabaciones de tu voz: algunos loros aprenden solo escuchando, incluso en tu ausencia.' },
      { h: '¿A qué edad es más fácil enseñar a hablar?', p: 'La mayor plasticidad lingüística está entre los 3 meses y los 2 años. Los loros jóvenes criados a mano aprenden más rápido. Sin embargo, loros adultos también pueden aprender: se conocen casos de loros que comenzaron a hablar con 5 o más años.\n\nLa paciencia y la constancia son más importantes que la edad.' },
    ],
    faqs: [
      { q: '¿Las hembras hablan menos que los machos?', a: 'En algunas especies (ninfas, cacatúas) sí. En otras (amazona, loro gris) no hay diferencia significativa. Depende más del individuo que del sexo.' },
      { q: '¿El loro aprende palabras de la televisión?', a: 'Algunos sí, especialmente palabras repetidas frecuentemente con entonación clara. Sin embargo, el aprendizaje en interacción directa con humanos es mucho más efectivo.' },
      { q: '¿Si el loro nunca habla, algo está mal?', a: 'No. Un loro que no habla puede ser perfectamente sano, feliz y tener una relación excelente con sus propietarios. El lenguaje no es indicador de bienestar.' },
    ],
    related: [
      { href: '/blog/como-ensenar-a-hablar-un-loro.html', title: 'Cómo enseñar a hablar a un loro', desc: 'Método completo paso a paso.' },
      { href: '/loros-que-hablan', title: 'Loros que hablan mejor', desc: 'Ranking por especie.' },
      { href: '/conocimiento/adiestramiento/', title: 'Centro de adiestramiento', desc: 'Técnicas de entrenamiento.' },
    ],
  },
  // ── Cuidados (15) ─────────────────────────────────────────────────────────
  {
    cat: 'cuidados', catLabel: 'Cuidados', catIcon: '🏠',
    slug: 'con-que-frecuencia-banar-loro',
    title: '¿Con qué frecuencia bañar a un loro?',
    shortAnswer: 'Los loros deben bañarse 2–3 veces por semana en verano y 1–2 veces por semana en invierno. El baño es esencial para la salud del plumaje, la piel y el sistema respiratorio. Nunca deben quedar mojados al anochecer.',
    sections: [
      { h: '¿Por qué es importante bañar a los loros?', p: 'El baño regular ofrece múltiples beneficios:\n\n• Elimina polvo, caspa y suciedad del plumaje\n• Facilita la muda (las plumas de pin se desarrollan mejor con humedad)\n• Hidrata la piel y el pico, previniendo sequedad y escamas\n• Previene infecciones bacterianas y fúngicas cutáneas\n• Reduce la deshidratación en ambientes secos\n• Proporciona estimulación y placer' },
      { h: '¿Cómo bañar correctamente a un loro?', p: 'Métodos recomendados:\n\n1. Spray: pulveriza agua tibia (no caliente ni fría) sobre el loro. Muchos disfrutan del spray y extienden las alas. Distancia: 30–40 cm.\n\n2. Ducha con el propietario: algunos loros aprenden a ducharse con su dueño en la mano bajo agua tibia. Muy eficaz y agradable para el ave.\n\n3. Plato/bañera de aves: un plato amplio con 2–3 cm de agua templada. Muchos loros lo prefieren porque controlan la inmersión.\n\n4. Lluvia artificial: colocar al loro bajo un aspersor de jardín en días cálidos reproduce la lluvia tropical.' },
      { h: '¿A qué temperatura debe estar el agua?', p: 'Agua templada, entre 20–28°C. Nunca agua fría de nevera ni agua caliente.\n\nTras el baño, el loro debe secarse en un lugar cálido (22–26°C) sin corrientes de aire. Nunca poner al loro mojado en lugares fríos o con aire acondicionado.\n\nPuedes usar un secador a temperatura media y distancia considerable (algunos loros lo disfrutan), siempre y cuando no haya cubierta de teflón en el aparato.' },
    ],
    faqs: [
      { q: '¿Qué hago si mi loro odia el baño?', a: 'No le fuerces. Introduce el agua gradualmente: primero humedece una hoja de lechuga y déjasela masticar, luego un plato con poca agua, luego el spray a más distancia. La aceptación puede llevar semanas.' },
      { q: '¿Puedo bañar al loro en invierno?', a: 'Sí, pero con más precauciones. Asegúrate de que la habitación esté caliente (22°C+), el loro tenga tiempo de secarse completamente antes de la noche, y no haya corrientes de aire.' },
      { q: '¿Necesito jabón o champú para bañar al loro?', a: 'No. Solo agua templada limpia. Los champús para aves que existen en el mercado son opcionales y solo se usan en casos de suciedad severa o recomendación veterinaria. El jabón normal puede dañar las plumas.' },
    ],
    related: [
      { href: '/blog/banar-loro-guia-completa.html', title: 'Cómo bañar a un loro: guía completa', desc: 'Métodos, temperatura y frecuencia.' },
      { href: '/cuidados-basicos-de-un-loro', title: 'Cuidados básicos del loro', desc: 'Todo lo que necesitas saber.' },
      { href: '/conocimiento/guias-principiantes/', title: 'Guías para principiantes', desc: 'Empezar con buen pie.' },
    ],
  },
  {
    cat: 'cuidados', catLabel: 'Cuidados', catIcon: '🏠',
    slug: 'documentos-necesarios-comprar-loro',
    title: '¿Qué documentos necesito para comprar un loro?',
    shortAnswer: 'Para comprar un loro legal en España necesitas que el vendedor te entregue: certificado CITES (si la especie lo requiere), anilla con número de registro, contrato de compraventa e historial sanitario. Sin estos documentos la compra no es legal.',
    sections: [
      { h: 'Documentos obligatorios según la especie', p: '**Loros del Apéndice I CITES** (guacamayo jacinto, loro gris africano, amazona vinacea):\n• Certificado CITES I (emitido por MITECO)\n• Anilla cerrada con código de registro del criador\n• Historial sanitario\n• Contrato de compraventa\n\n**Loros del Apéndice II CITES** (guacamayo ararauna, amazona, cacatúa, eclectus, conuro):\n• Documento de acompañamiento CITES II (puede ser el contrato detallado)\n• Anilla con código del criador\n• Historial sanitario\n• Contrato de compraventa\n\n**Loros no CITES** (periquito ondulado, agapornis, ninfa):\n• Contrato de compraventa (recomendado aunque no obligatorio)\n• Historial sanitario' },
      { h: '¿Qué debe incluir el contrato de compraventa?', p: 'Un contrato legal de compraventa de loro debe incluir:\n\n• Datos del vendedor (nombre, NIF, núcleo zoológico o autorización)\n• Datos del comprador\n• Descripción del animal (especie, edad, sexo si es conocido, número de anilla)\n• Número de certificado CITES\n• Precio pactado (o indicación de "a consultar")\n• Fecha de la transacción\n• Garantía sanitaria (tiempo)\n• Firma de ambas partes' },
      { h: '¿Qué es el número de núcleo zoológico?', p: 'El Núcleo Zoológico es el registro oficial que autoriza a un criador a reproducir y vender aves silvestres en España. Está regulado por la Ley 42/2007 y gestionado por las Comunidades Autónomas.\n\nUn criador legal SIEMPRE tiene este registro. Puedes solicitarle que te muestre el número antes de comprar. Su ausencia es una señal de alerta.' },
    ],
    faqs: [
      { q: '¿Qué pasa si compro un loro sin documentación CITES?', a: 'La tenencia de loros CITES sin documentación es ilegal en España y puede sancionarse con multas de hasta 200.000€ bajo la Ley 42/2007. Además, el loro puede ser confiscado.' },
      { q: '¿Puedo comprar un loro sin contrato?', a: 'Legalmente para periquitos y agapornis no es obligatorio, pero es altamente recomendable. Sin contrato no tienes prueba de que la transacción fue legal ni garantía sanitaria.' },
      { q: '¿Los loros comprados en redes sociales son legales?', a: 'Pueden serlo si el vendedor entrega toda la documentación correcta. Pero el riesgo de fraude es alto. Compra siempre en criaderos registrados con instalaciones verificables.' },
    ],
    related: [
      { href: '/documentos-legales-para-adoptar-un-loro', title: 'Documentos legales para adoptar', desc: 'Guía completa 2026.' },
      { href: '/conocimiento/cites-legal/', title: 'Centro CITES y marco legal', desc: 'Todo sobre la normativa.' },
      { href: '/blog/cites-loros-espana.html', title: 'CITES en España explicado', desc: 'Apéndices I, II y III.' },
    ],
  },
  {
    cat: 'cuidados', catLabel: 'Cuidados', catIcon: '🏠',
    slug: 'cuanto-vive-un-loro-en-cautividad',
    title: '¿Cuánto vive un loro en cautividad?',
    shortAnswer: 'Los loros tienen una de las esperanzas de vida más largas entre las mascotas. En cautividad con cuidados adecuados, los loros grises viven 40–60 años, los guacamayos 50–80 años, las ninfas 15–20 años y los periquitos 10–15 años.',
    sections: [
      { h: 'Esperanza de vida por especie', p: 'Guía de longevidad por especie (en cautividad con buenos cuidados):\n\n| Especie | Vida en cautividad |\n|---|---|\n| Guacamayo Jacinto | 60–80+ años |\n| Guacamayo Azul y Amarillo | 50–70 años |\n| Loro Gris Africano (Yaco) | 40–60 años |\n| Amazona | 40–60 años |\n| Cacatúa Blanca | 40–60 años |\n| Eclectus | 30–40 años |\n| Conuro Sol | 20–30 años |\n| Ninfa (Cockatiel) | 15–20 años |\n| Agapornis | 10–15 años |\n| Periquito ondulado | 8–12 años |' },
      { h: '¿Qué factores determinan la longevidad de un loro?', p: 'Los factores que más influyen en la esperanza de vida:\n\n1. Nutrición: dieta variada y equilibrada (pellets + fruta + verdura) frente a dietas de solo semillas (reducen la vida hasta un 30–40%)\n2. Atención veterinaria: revisiones anuales y tratamiento temprano de enfermedades\n3. Ambiente: sin tóxicos (teflón, humo, aerosoles), temperatura estable, sin estrés crónico\n4. Ejercicio: tiempo de vuelo diario\n5. Estimulación mental: aves aburridas tienen peor salud general\n6. Genética: aves criadas responsablemente tienen mejor base genética' },
      { h: '¿Un loro puede sobrevivir a su propietario?', p: 'Sí, especialmente los loros grandes. Un loro gris o guacamayo adoptado por un adulto joven puede vivir más que su propietario. Este es un aspecto ético muy importante a considerar antes de adoptar:\n\n• ¿Quién cuidará del loro si yo no puedo?\n• ¿Tengo un plan de contingencia documentado?\n• ¿Mis familiares están preparados para asumir su cuidado?\n\nMuchas organizaciones avicultoras ofrecen servicios de "adopción garantizada" para aves longevas.' },
    ],
    faqs: [
      { q: '¿Cuánto vive un periquito de promedio?', a: 'Los periquitos bien cuidados viven entre 8 y 12 años, con casos excepcionales de 15 años. La alimentación variada (no solo mijo) y las revisiones veterinarias son clave.' },
      { q: '¿Los loros en libertad viven menos que en cautividad?', a: 'Sí, generalmente. En estado silvestre, los depredadores, enfermedades y escasez de alimento reducen la esperanza de vida. En cautividad con cuidados adecuados, los loros suelen vivir más.' },
      { q: '¿Cómo saber la edad de un loro si no tengo documentación?', a: 'El veterinario puede estimar la edad aproximada mediante examen físico (estado del plumaje, pico, articulaciones, prueba de laboratorio). No es posible determinar la edad exacta sin documentación de nacimiento.' },
    ],
    related: [
      { href: '/blog/cuanto-vive-un-loro.html', title: '¿Cuánto vive un loro?', desc: 'Guía detallada por especie.' },
      { href: '/herramientas/', title: 'Calculadora de esperanza de vida', desc: 'Herramienta interactiva.' },
      { href: '/conocimiento/compra/', title: 'Centro: Compra y adopción', desc: 'Todo lo que debes saber antes de comprar.' },
    ],
  },
  {
    cat: 'cuidados', catLabel: 'Cuidados', catIcon: '🏠',
    slug: 'que-temperatura-necesita-un-loro',
    title: '¿Qué temperatura necesita un loro?',
    shortAnswer: 'Los loros se adaptan bien a temperaturas entre 18°C y 28°C. La temperatura óptima es 20–24°C. Por debajo de 15°C o por encima de 35°C sin aclimatación pueden desarrollar problemas de salud graves.',
    sections: [
      { h: 'Rangos de temperatura por especie', p: 'Temperatura óptima:\n\n• Loros tropicales (loro gris, guacamayo, amazona, eclectus): 20–28°C\n• Aves australianas (ninfa, cacatúa): 18–25°C (toleran algo más de frío)\n• Periquito ondulado: 18–25°C\n• Agapornis: 20–27°C\n\nEn general, 20–24°C es la zona de confort universal para todos los loros comunes en España.' },
      { h: '¿Cómo afecta el frío a los loros?', p: 'Los loros no toleran bien el frío prolongado:\n\n• < 15°C: riesgo de hipotermia, especialmente en aves enfermas, jóvenes o viejas\n• Corrientes de aire a cualquier temperatura: muy peligrosas (neumonía)\n• Cambios bruscos de temperatura: estresantes para el sistema inmune\n\nSeñales de frío en el loro: plumas completamente erizadas (bola de plumas), temblores, letargo, ocultarse en un rincón.' },
      { h: '¿Cómo afecta el calor excesivo a los loros?', p: 'El calor extremo también es peligroso:\n\n• > 35°C sin acceso a agua y sombra: golpe de calor\n• Síntomas: jadeo con pico abierto, alas separadas del cuerpo, letargo, ojos semicerrados\n• URGENCIA: si ves estos síntomas en verano, mueve al loro a lugar fresco inmediatamente y llama al veterinario\n\nEn verano: proporciona sombra, agua fresca siempre disponible, baños más frecuentes y ventilación sin corrientes directas.' },
    ],
    faqs: [
      { q: '¿Los loros pueden vivir en el exterior en España?', a: 'En zonas mediterráneas (Valencia, Murcia, Andalucía) con temperaturas sobre 10°C en invierno, algunas especies (periquito, ninfa) pueden vivir en voladeras exteriores protegidas. Los loros tropicales (yaco, guacamayo) necesitan interior temperado todo el año.' },
      { q: '¿El aire acondicionado es malo para los loros?', a: 'El aire acondicionado bien regulado (temperatura estable 22–24°C) no es perjudicial. El riesgo está en las corrientes directas y en los cambios bruscos de temperatura al entrar/salir. Nunca coloque la jaula directamente bajo el chorro del AC.' },
      { q: '¿Qué hago si el loro tiene frío?', a: 'Calienta gradualmente la habitación, cubre parcialmente la jaula para retener el calor, ofrece alimentos energéticos (frutos secos, pellets), y si los síntomas persisten o el loro está letárgico, llama al veterinario aviar.' },
    ],
    related: [
      { href: '/blog/loros-temperatura-ideal.html', title: 'Temperatura ideal para loros', desc: 'Guía completa por especie.' },
      { href: '/cuidados-basicos-de-un-loro', title: 'Cuidados básicos del loro', desc: 'Guía para nuevos propietarios.' },
      { href: '/conocimiento/instalaciones/', title: 'Centro de instalaciones', desc: 'Jaula, ubicación y ambiente.' },
    ],
  },
  // ── Compra / Legal (15) ───────────────────────────────────────────────────
  {
    cat: 'compra', catLabel: 'Compra y Legal', catIcon: '🛒',
    slug: 'loros-legales-espana',
    title: '¿Qué loros son legales en España?',
    shortAnswer: 'En España son legales todos los loros con documentación CITES válida y procedencia de cría en cautividad legal. Las especies silvestres capturadas sin documentación son ilegales. El guacamayo jacinto, loro gris y otras CITES I requieren certificados específicos.',
    sections: [
      { h: 'Marco legal de la tenencia de loros en España', p: 'La tenencia de loros en España está regulada por:\n\n• Ley 42/2007 del Patrimonio Natural y Biodiversidad\n• Reglamento (CE) 338/97 del Consejo sobre protección de especies\n• CITES (Convención de Washington)\n• Normativa autonómica (varía por Comunidad Autónoma)\n\nLa clave es que cualquier loro que puedas tener legalmente debe provenir de cría en cautividad con documentación que lo acredite.' },
      { h: 'Categorías CITES y sus implicaciones', p: '**Apéndice I** (máxima protección):\n• Loro gris africano (Psittacus erithacus)\n• Guacamayo jacinto (Anodorhynchus hyacinthinus)\n• Amazona vinacea\n→ Requieren certificado CITES I, muy restrictivo\n\n**Apéndice II** (regulado):\n• Todos los guacamayos Ara\n• Cacatúas (excepto Cacatua goffiniana que es I)\n• Amazonas (mayoría de especies)\n• Eclectus\n• Conuros\n→ Requieren documentación de origen legal\n\n**No CITES**:\n• Periquito ondulado\n• Agapornis (excepto Agapornis nigrigenis y otros)\n• Ninfa (Nymphicus hollandicus)\n→ Sin requisitos CITES, pero recomendado contrato de compraventa' },
      { h: '¿Puedo tener un loro silvestre capturado?', p: 'No. La captura, tenencia y comercialización de loros silvestres sin documentación es ilegal en España y en toda la UE. Las multas van de 10.000€ a 200.000€.\n\nTodos los loros que se venden legalmente en España deben provenir de cría en cautividad documentada. Un criador legal siempre puede acreditar el origen con el número de su núcleo zoológico y los certificados CITES.' },
    ],
    faqs: [
      { q: '¿Es legal tener un cotorra argentina en España?', a: 'La cotorra argentina (Myiopsitta monachus) es una especie invasora cuya tenencia está prohibida desde 2013 en España. Si ya tienes una, no puedes venderla ni reproducirla. Las cotorras de Kramer también son problemáticas en algunas CCAA.' },
      { q: '¿Necesito licencia para tener un loro en casa?', a: 'No existe una licencia específica para propietarios individuales. Lo que necesitas es que el loro tenga su documentación CITES en regla y que lo hayas adquirido de un criador o tienda legal.' },
      { q: '¿Dónde puedo verificar si un criador es legal?', a: 'Puedes solicitar el número de Núcleo Zoológico a la Consejería de Medio Ambiente de tu Comunidad Autónoma. También puedes pedir al criador el número de registro oficial y verificarlo.' },
    ],
    related: [
      { href: '/conocimiento/cites-legal/', title: 'Centro CITES y marco legal', desc: 'Todo sobre la normativa española.' },
      { href: '/documentos-legales-para-adoptar-un-loro', title: 'Documentos legales para adoptar', desc: 'Lista completa.' },
      { href: '/blog/cites-loros-espana.html', title: 'CITES en España explicado', desc: 'Guía completa.' },
    ],
  },
  {
    cat: 'compra', catLabel: 'Compra y Legal', catIcon: '🛒',
    slug: 'edad-comprar-loro',
    title: '¿A qué edad se debe comprar un loro?',
    shortAnswer: 'La edad ideal para comprar un loro es cuando está completamente destetado y socializado, generalmente entre las 10 y 16 semanas (según especie). Comprar un loro demasiado joven (antes del destete) es peligroso y a menudo ilegal.',
    sections: [
      { h: 'Edad mínima de venta por especie', p: 'Edades mínimas legales y recomendadas:\n\n| Especie | Edad mínima venta |\n|---|---|\n| Periquito | 6–8 semanas |\n| Agapornis | 8–10 semanas |\n| Ninfa | 8–10 semanas |\n| Conuro | 10–12 semanas |\n| Loro gris africano | 12–16 semanas |\n| Amazona | 12–16 semanas |\n| Guacamayo | 14–20 semanas |\n| Cacatúa | 12–16 semanas |\n\nVender loros antes del destete completo es una mala práctica que genera problemas de salud y conductuales en el ave.' },
      { h: '¿Qué ventajas tiene comprar un loro joven?', p: 'Un loro joven y bien criado a mano tiene ventajas significativas:\n\n• Mayor facilidad de socialización con su nueva familia\n• Menor equipaje conductual (malos hábitos, miedos previos)\n• Más tiempo de vínculo con el propietario\n• Mayor adaptabilidad al nuevo entorno\n\nSin embargo, también requiere más paciencia y atención durante las primeras semanas de adaptación.' },
      { h: '¿Es mejor un loro joven o adulto?', p: 'Depende del estilo de vida del propietario:\n\nLoro joven (10–16 semanas):\n✓ Se adapta fácilmente\n✓ Aprende hábitos de tu hogar\n✗ Necesita mucha atención al principio\n✗ Carácter no completamente desarrollado\n\nLoro adulto (1+ años):\n✓ Carácter ya conocido\n✓ Puede ya saber hablar o tener habilidades\n✓ Menos demandante en energía\n✗ Puede llevar hábitos previos difíciles de cambiar\n✗ Adaptación puede ser más lenta' },
    ],
    faqs: [
      { q: '¿Un criador puede venderme un loro de 4 semanas?', a: 'No. Un loro de 4 semanas todavía está en papilla y no puede alimentarse solo. Si alguien te ofrece un loro tan joven, es una señal de alarma de práctica irresponsable o ilegal.' },
      { q: '¿Los loros viejos (5+ años) pueden adaptarse a un nuevo hogar?', a: 'Sí, aunque el proceso puede ser más lento. Muchos loros adultos en adopción se adaptan perfectamente a su nueva familia con paciencia.' },
      { q: '¿Cuándo está listo un loro para salir del criadero?', a: 'Un criador responsable solo entrega el loro cuando: está completamente destetado (come solo sin papilla), tiene un peso estable, ha pasado revisión veterinaria de alta y ha iniciado la socialización con humanos distintos al criador.' },
    ],
    related: [
      { href: '/adopcion-de-loros', title: 'Proceso de adopción', desc: 'Los 7 pasos para adoptar.' },
      { href: '/blog/errores-comunes-al-adoptar-un-loro.html', title: '10 errores comunes al adoptar', desc: 'Evita los fallos más costosos.' },
      { href: '/conocimiento/compra/', title: 'Centro de compra y adopción', desc: 'Guía completa.' },
    ],
  },
  // ── Salud (10 para completar las 75) ─────────────────────────────────────
  {
    cat: 'salud', catLabel: 'Salud', catIcon: '🩺',
    slug: 'senales-enfermedad-loro',
    title: '¿Cuáles son las señales de enfermedad en un loro?',
    shortAnswer: 'Los loros ocultan la enfermedad por instinto de supervivencia. Señales de alarma: plumas erizadas más de 2 horas, pérdida de peso visible, cambios en heces, secreciones, letargo, pérdida de apetito, dificultad respiratoria. Ante cualquier duda, veterinario inmediato.',
    sections: [
      { h: '¿Por qué los loros ocultan que están enfermos?', p: 'Los loros (como todas las aves) son presas en la naturaleza. Un animal débil o enfermo es vulnerable a los depredadores. Por instinto, ocultan los síntomas hasta que la enfermedad es muy avanzada.\n\nEsto significa que cuando un loro muestra signos visibles de enfermedad, generalmente ya lleva días o semanas enfermo. La detección temprana es crucial.' },
      { h: '12 señales de alarma que no debes ignorar', p: '1. Plumas erizadas durante más de 2 horas\n2. Pérdida de peso visible (el esternón queda prominente)\n3. Heces anómalas: muy líquidas, oscuras, sin urato blanco o con sangre\n4. Secreciones oculares o nasales\n5. Respiración ruidosa o con movimientos de cola exagerados\n6. Pérdida de apetito >24 horas\n7. Letargo: loro quieto, dormido fuera de horario, no reacciona a estímulos\n8. Cambio en las vocalizaciones: silencio inusual o gritos de dolor\n9. Pérdida de plumas asimétrica (no de muda normal)\n10. Heces con sangre o urato verde oscuro\n11. Dificultad para posarse o caídas del palo\n12. Vómitos o regurgitación sin comportamiento de cortejo' },
      { h: '¿Cuándo es urgencia veterinaria?', p: 'Urgencia inmediata (no esperar):\n• Dificultad respiratoria visible\n• Convulsiones\n• Incapacidad para ponerse en pie\n• Trauma físico (golpe, caída)\n• Sangrado\n• Intoxicación sospechada (ingestión de tóxico)\n• Loro inconsciente o que no responde\n\nEn estos casos llama inmediatamente a una clínica veterinaria especializada en aves exóticas.' },
    ],
    faqs: [
      { q: '¿Cómo saber si las heces son normales?', a: 'Las heces normales tienen 3 componentes: parte sólida verdosa/marrón, urato blanco/beige y orina clara. Variaciones por alimentos (remolacha → heces rojizas, espinacas → heces verdosas) son normales si el loro está activo y comiendo bien.' },
      { q: '¿Cada cuánto llevar al loro al veterinario si está sano?', a: 'Una revisión anual con un veterinario especializado en aves exóticas es el mínimo recomendado. Las revisiones bianuales son mejores, especialmente para loros de +10 años.' },
      { q: '¿Los loros vacunan en España?', a: 'No existen vacunas obligatorias para loros en España. El veterinario puede recomendar análisis de sangre anuales para detectar enfermedades subclínicas.' },
    ],
    related: [
      { href: '/conocimiento/salud/', title: 'Centro de salud aviar', desc: 'Enfermedades y tratamientos.' },
      { href: '/blog/enfermedades-comunes-loros.html', title: 'Enfermedades comunes en loros', desc: 'Las 10 más frecuentes.' },
      { href: '/blog/visitas-veterinario-loros.html', title: 'Guía de visitas al veterinario', desc: 'Cuándo ir y qué esperar.' },
    ],
  },
  {
    cat: 'salud', catLabel: 'Salud', catIcon: '🩺',
    slug: 'cuarentena-loro-nuevo',
    title: '¿Por qué es necesaria la cuarentena para un loro nuevo?',
    shortAnswer: 'La cuarentena es el período de aislamiento de 30 días en que el loro nuevo se mantiene separado de otras aves del hogar. Protege a tus aves existentes de enfermedades que el nuevo loro puede transmitir antes de mostrar síntomas.',
    sections: [
      { h: '¿Qué es el período de cuarentena en aves?', p: 'La cuarentena aviar es el aislamiento preventivo de cualquier ave nueva durante 30–45 días, durante los cuales:\n\n• El ave nueva no tiene contacto directo ni aéreo con otras aves del hogar\n• Se observan sus heces, comportamiento y estado general\n• Idealmente se hace una visita veterinaria con análisis básico (gram stain, hemograma)\n• Se desparasita si es necesario\n\nEste período cubre la mayoría de períodos de incubación de enfermedades aviares comunes.' },
      { h: '¿Cómo hacer correctamente la cuarentena?', p: 'Protocolo de cuarentena estándar:\n\n1. Habitación separada: idealmente sin flujo de aire compartido con otras aves\n2. Utensilios propios: comederos, bebederos y perchas separados (no compartir con otras aves)\n3. Higiene estricta: lavarse las manos entre el manejo del ave nueva y las otras\n4. Visita veterinaria: en los primeros 7 días, con cultivos si es posible\n5. Observación diaria de: heces, nivel de actividad, apetito, estado del plumaje\n6. Duración mínima: 30 días; 45 días para loros provenientes de entornos desconocidos' },
      { h: '¿Qué enfermedades previene la cuarentena?', p: 'Enfermedades que se pueden detectar o prevenir con la cuarentena:\n\n• Psittacosis (Chlamydophila psittaci): zoonosis que afecta también a humanos\n• Aspergilosis: infección fúngica potencialmente fatal\n• Polyomavirus: muy contagioso entre aves\n• PBFD (enfermedad del pico y las plumas): virus incurable\n• Beak and feather disease virus\n• Parásitos externos e internos\n\nUn loro que llega de una tienda o de un criador desconocido puede ser portador asintomático de cualquiera de estas.' },
    ],
    faqs: [
      { q: '¿La cuarentena aplica aunque el loro sea del mismo criador?', a: 'Sí. Incluso de criaderos con buena reputación, siempre que introduces un ave nueva es prudente hacer cuarentena para proteger a tus aves existentes.' },
      { q: '¿Qué hago si el loro muestra síntomas durante la cuarentena?', a: 'Veterinario inmediato. La cuarentena es precisamente para detectar estos casos antes de que contaminen a otras aves.' },
      { q: '¿El loro puede contagiar algo a las personas durante la cuarentena?', a: 'La psittacosis es una zoonosis (pasa de ave a humano). Si el loro tose, estornuda o tiene heces anómalas, usa mascarilla al limpiar la jaula y lávate bien las manos.' },
    ],
    related: [
      { href: '/conocimiento/salud/', title: 'Centro de salud aviar', desc: 'Enfermedades y prevención.' },
      { href: '/blog/enfermedades-comunes-loros.html', title: 'Enfermedades comunes', desc: 'Las 10 más frecuentes.' },
      { href: '/blog/prevencion-enfermedades-loro.html', title: 'Prevención de enfermedades', desc: 'Rutinas de higiene preventiva.' },
    ],
  },
];

// ── Helper: generate a single question page ─────────────────────────────────
function makeQuestionPage(q) {
  const canonical = `${DOMAIN}/preguntas/${q.cat}/${q.slug}/`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": q.title,
        "description": q.shortAnswer.substring(0, 160),
        "url": canonical,
        "datePublished": TODAY,
        "dateModified": TODAY,
        "author": { "@type": "Organization", "name": "Paraíso de Aves", "url": DOMAIN },
        "publisher": { "@type": "Organization", "@id": DOMAIN + "/#org", "name": "Paraíso de Aves" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": DOMAIN + "/" },
            { "@type": "ListItem", "position": 2, "name": "Preguntas", "item": DOMAIN + "/preguntas/" },
            { "@type": "ListItem", "position": 3, "name": q.catLabel, "item": DOMAIN + "/preguntas/" + q.cat + "/" },
            { "@type": "ListItem", "position": 4, "name": q.title, "item": canonical }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": q.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  }, null, 2);

  // Format sections
  const sectionsHtml = q.sections.map(s => {
    // Convert markdown-like bullet lists and tables
    let pHtml = s.p
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/•\s/g, '• ');
    return `<div class="content-section">
      <h2>${s.h}</h2>
      <p>${pHtml}</p>
    </div>`;
  }).join('\n    ');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${q.title} | Paraíso de Aves</title>
  <meta name="description" content="${q.shortAnswer.substring(0, 155).replace(/"/g, '&quot;')}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${q.title} | Paraíso de Aves">
  <meta property="og:description" content="${q.shortAnswer.substring(0, 155)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="article">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>
  <script type="application/ld+json">${schema}</script>
  ${CSS}
</head>
<body>
${NAV}

<div class="article-hero">
  <div class="hero-inner">
    <div class="cat-badge">${q.catIcon} ${q.catLabel}</div>
    <h1>${q.title}</h1>
    <div class="meta">Paraíso de Aves · Criadero registrado 25+ años · Actualizado ${TODAY}</div>
  </div>
</div>

<div class="breadcrumb">
  <a href="/">Inicio</a><span>›</span>
  <a href="/preguntas/">Preguntas</a><span>›</span>
  <a href="/preguntas/${q.cat}/">${q.catLabel}</a><span>›</span>
  <strong>${q.title}</strong>
</div>

<main class="article-wrap">

  <div class="answer-box">
    <span class="answer-label">✅ Respuesta directa</span>
    ${q.shortAnswer}
  </div>

  ${sectionsHtml}

  <div class="faq-section">
    <h2>Preguntas frecuentes</h2>
    ${q.faqs.map(f => `<details>
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>`).join('\n    ')}
  </div>

  <div class="content-section">
    <h2>Artículos relacionados</h2>
    <div class="related-grid">
      ${q.related.map(r => `<div class="related-card">
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <a href="${r.href}">Leer más →</a>
      </div>`).join('\n      ')}
    </div>
  </div>

  <div class="cta-inline">
    <h3>¿Buscas un loro criado por expertos?</h3>
    <p>Somos criadero registrado con 25+ años. CITES garantizado. Envío a toda España y Europa.</p>
    <a href="/adopcion-de-loros">Ver proceso de adopción →</a>
  </div>

</main>

${FOOTER}
</body>
</html>`;
}

// ── Category hub page ────────────────────────────────────────────────────────
function makeCatHub(catSlug, catLabel, catIcon, catQuestions) {
  const canonical = `${DOMAIN}/preguntas/${catSlug}/`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "url": canonical,
        "name": `Preguntas sobre ${catLabel} de Loros | Paraíso de Aves`,
        "description": `${catQuestions.length} respuestas detalladas sobre ${catLabel.toLowerCase()} de loros por criadores expertos con 25+ años de experiencia.`,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": DOMAIN + "/" },
            { "@type": "ListItem", "position": 2, "name": "Preguntas", "item": DOMAIN + "/preguntas/" },
            { "@type": "ListItem", "position": 3, "name": catLabel, "item": canonical }
          ]
        }
      }
    ]
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preguntas sobre ${catLabel} de Loros | Paraíso de Aves</title>
  <meta name="description" content="${catQuestions.length} respuestas detalladas sobre ${catLabel.toLowerCase()} de loros por criadores expertos.">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
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
  <a href="/preguntas/">Preguntas</a><span>›</span>
  <strong>${catLabel}</strong>
</div>
<div class="hero-section">
  <h1>${catIcon} Preguntas sobre ${catLabel}</h1>
  <p>${catQuestions.length} respuestas detalladas de criadores expertos con 25+ años de experiencia.</p>
</div>
<main>
<section class="section">
  <div class="art-list">
    ${catQuestions.map(q => `<div class="art-item">
      <span class="art-item-icon">${catIcon}</span>
      <div class="art-item-body">
        <h3><a href="/preguntas/${catSlug}/${q.slug}/">${q.title}</a></h3>
        <p>${q.shortAnswer.substring(0, 120)}…</p>
      </div>
    </div>`).join('\n    ')}
  </div>
</section>
</main>
${FOOTER}
</body>
</html>`;
}

// ── Hub index ────────────────────────────────────────────────────────────────
function makeHubIndex(cats) {
  const canonical = `${DOMAIN}/preguntas/`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": canonical,
    "name": "Preguntas frecuentes sobre loros — Centro de respuestas | Paraíso de Aves",
    "description": "75+ respuestas detalladas a las preguntas más frecuentes sobre loros. Alimentación, comportamiento, salud, cuidados y compra. Por criadores con 25+ años de experiencia.",
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preguntas Frecuentes sobre Loros — 75 Respuestas | Paraíso de Aves</title>
  <meta name="description" content="75+ respuestas detalladas a las preguntas más frecuentes sobre loros. Alimentación, comportamiento, salud, cuidados y compra.">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>
  <script type="application/ld+json">${schema}</script>
  ${CSS}
</head>
<body>
${NAV}
<div class="breadcrumb"><a href="/">Inicio</a><span>›</span><strong>Preguntas</strong></div>
<div class="hero-section">
  <h1>❓ Preguntas Frecuentes sobre Loros</h1>
  <p>75+ respuestas detalladas de criadores con 25 años de experiencia. Elige tu categoría de interés.</p>
</div>
<main>
<section class="section">
  <div class="hub-grid">
    ${cats.map(c => `<div class="hub-card">
      <span style="font-size:2rem;display:block;margin-bottom:12px">${c.icon}</span>
      <h3>${c.label}</h3>
      <span class="count">📄 ${c.qs.length} preguntas</span>
      <ul>
        ${c.qs.slice(0, 4).map(q => `<li><a href="/preguntas/${c.slug}/${q.slug}/">${q.title}</a></li>`).join('\n        ')}
      </ul>
      <a href="/preguntas/${c.slug}/" class="see-all">Ver todas las preguntas de ${c.label} →</a>
    </div>`).join('\n    ')}
  </div>
</section>
</main>
${FOOTER}
</body>
</html>`;
}

// ── Generate all files ────────────────────────────────────────────────────────
const generated = [];
fs.mkdirSync('preguntas', { recursive: true });

// Group questions by category
const cats = ['alimentacion', 'comportamiento', 'cuidados', 'compra', 'salud'];
const catMeta = {
  alimentacion: { label: 'Alimentación', icon: '🥦' },
  comportamiento: { label: 'Comportamiento', icon: '🧠' },
  cuidados: { label: 'Cuidados', icon: '🏠' },
  compra: { label: 'Compra y Legal', icon: '🛒' },
  salud: { label: 'Salud', icon: '🩺' },
};

const grouped = {};
cats.forEach(c => { grouped[c] = []; });
questions.forEach(q => { grouped[q.cat].push(q); });

// Category hubs
cats.forEach(c => {
  fs.mkdirSync(`preguntas/${c}`, { recursive: true });
  fs.writeFileSync(`preguntas/${c}/index.html`, makeCatHub(c, catMeta[c].label, catMeta[c].icon, grouped[c]));
  generated.push({ url: `/preguntas/${c}/`, priority: '0.80' });
  console.log(`✓ preguntas/${c}/index.html`);
});

// Individual question pages
questions.forEach(q => {
  const dir = `preguntas/${q.cat}/${q.slug}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, makeQuestionPage(q));
  generated.push({ url: `/preguntas/${q.cat}/${q.slug}/`, priority: '0.75' });
  console.log(`✓ ${dir}/index.html`);
});

// Main hub index
const catsForIndex = cats.map(c => ({ slug: c, label: catMeta[c].label, icon: catMeta[c].icon, qs: grouped[c] }));
fs.writeFileSync('preguntas/index.html', makeHubIndex(catsForIndex));
generated.unshift({ url: '/preguntas/', priority: '0.90' });
console.log('✓ preguntas/index.html');

console.log(`\n✅ Question pages: ${questions.length} pages + ${cats.length} category hubs + 1 index = ${generated.length} total`);

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
const newRedirects = `\n# SECTION 22 — Phase 7 Question Pages (${TODAY})\n` +
  generated.map(g => {
    const slug = g.url.replace(/\/$/, '').replace(/^\//, '');
    return `/${slug}  /${slug}/index.html  200`;
  }).join('\n');
redirects = redirects.replace(/\/\* → \/404\.html 404/, `${newRedirects}\n\n/* → /404.html 404`);
fs.writeFileSync(redirectsPath, redirects);
console.log(`✓ _redirects SECTION 22 added`);
