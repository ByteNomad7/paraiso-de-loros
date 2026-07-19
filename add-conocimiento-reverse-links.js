#!/usr/bin/env node
const fs = require('fs');

// Define reverse links for each conocimiento page
// Each entry: file path, new section HTML to insert before </main>
const pages = [

  // compra/ — links to city pages
  {
    file: 'conocimiento/compra/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Compra en tu ciudad</h2>
    <p class="section-sub">Guías locales para encontrar criadores de confianza en las principales ciudades de España.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Comprar un loro en Madrid</h3>
        <p>Criadores registrados, precios y dónde recoger tu ave en la Comunidad de Madrid.</p>
        <a href="/ciudades/comprar-loros-madrid.html" class="btn">Ver guía →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Comprar un loro en Barcelona</h3>
        <p>Directorio de criadores y tiendas especializadas en Cataluña.</p>
        <a href="/ciudades/comprar-loros-barcelona.html" class="btn">Ver guía →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Comprar un loro en Valencia</h3>
        <p>Criaderos certificados y proceso de adopción en la Comunitat Valenciana.</p>
        <a href="/ciudades/comprar-loros-valencia.html" class="btn">Ver guía →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Comprar un loro en Sevilla</h3>
        <p>Guía de compra y adoptantes verificados en Andalucía occidental.</p>
        <a href="/ciudades/comprar-loros-sevilla.html" class="btn">Ver guía →</a>
      </div>
    </div>
  </section>`
  },

  // nutricion/ — links to species pages
  {
    file: 'conocimiento/nutricion/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Dietas por especie</h2>
    <p class="section-sub">Cada especie tiene necesidades nutricionales específicas. Consulta la ficha de tu loro.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Gris Africano</h3>
        <p>Especie que requiere dieta muy variada con alto contenido en calcio y vitamina A.</p>
        <a href="/aves-disponibles/loro-gris-africano/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cacatúa Blanca</h3>
        <p>Las cacatúas son propensas a la obesidad; su dieta debe ser baja en grasas y rica en verduras.</p>
        <a href="/aves-disponibles/cacatua-blanca/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Senegal</h3>
        <p>Pequeño y activo, el Senegal necesita pellets de calidad y fruta fresca a diario.</p>
        <a href="/aves-disponibles/loro-senegal/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Amazona Nuca Amarilla</h3>
        <p>Las amazonas requieren dietas variadas y bajas en semillas para evitar hepatopatías.</p>
        <a href="/aves-disponibles/amazona-nuca-amarilla/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // salud/ — links to species pages with health context
  {
    file: 'conocimiento/salud/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Salud por especie</h2>
    <p class="section-sub">Cada especie tiene predisposiciones sanitarias distintas. Infórmate antes de adoptar.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Gris Africano</h3>
        <p>Propenso a problemas respiratorios y deficiencia de vitamina A. Revisión anual imprescindible.</p>
        <a href="/aves-disponibles/loro-gris-africano/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cacatúa Blanca</h3>
        <p>Susceptible a la PBFD (enfermedad del pico y las plumas). Importante detección temprana.</p>
        <a href="/aves-disponibles/cacatua-blanca/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Caique</h3>
        <p>Especie robusta pero sensible al estrés. Ambiente estable y enriquecimiento diario son clave.</p>
        <a href="/aves-disponibles/caique/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Amazona Ala Naranja</h3>
        <p>Las amazonas tienen tendencia a la obesidad y enfermedades hepáticas con dieta incorrecta.</p>
        <a href="/aves-disponibles/amazona-ala-naranja/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // cites-legal/ — links to regulated species and city pages
  {
    file: 'conocimiento/cites-legal/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Especies reguladas por CITES</h2>
    <p class="section-sub">Consulta la documentación requerida para cada especie antes de adoptar.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Gris Africano (CITES I)</h3>
        <p>La especie más regulada: Apéndice I CITES. Documentación de origen obligatoria y certificado de cría en cautividad.</p>
        <a href="/aves-disponibles/loro-gris-africano/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cacatúa Blanca (CITES II)</h3>
        <p>Apéndice II CITES. Requiere documentación de criadero registrado y anilla de identificación.</p>
        <a href="/aves-disponibles/cacatua-blanca/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Amazona Nuca Amarilla (CITES I)</h3>
        <p>Apéndice I CITES en peligro de extinción. Solo permitida la compra de ejemplares nacidos en criadero certificado.</p>
        <a href="/aves-disponibles/amazona-nuca-amarilla/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Criadero legal en Madrid</h3>
        <p>Compra con CITES y documentación completa en la Comunidad de Madrid.</p>
        <a href="/ciudades/comprar-loros-madrid.html" class="btn">Ver guía →</a>
      </div>
    </div>
  </section>`
  },

  // accesorios/ — links to species that need specific accessories
  {
    file: 'conocimiento/accesorios/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Accesorios por especie</h2>
    <p class="section-sub">El tamaño y el comportamiento de cada especie determinan qué accesorios necesitas.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Conuro del Sol</h3>
        <p>Especie activa y juguetona: necesita juguetes destructibles, perchas variadas y campanas.</p>
        <a href="/aves-disponibles/conuro-del-sol/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cacatúa Goffin</h3>
        <p>Muy inteligente y manipuladora: requiere juguetes de forrajeo y cierres de seguridad en la jaula.</p>
        <a href="/aves-disponibles/cacatua-goffin/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Periquito Alejandrino</h3>
        <p>Loro mediano que necesita jaula espaciosa, columpio y juguetes de madera para el pico.</p>
        <a href="/aves-disponibles/periquito-alejandrino/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // adiestramiento/ — links to trainable species
  {
    file: 'conocimiento/adiestramiento/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Especies más fáciles de adiestrar</h2>
    <p class="section-sub">Algunas especies responden especialmente bien al entrenamiento con refuerzo positivo.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Gris Africano</h3>
        <p>Considerado el loro más inteligente del mundo: aprende centenares de palabras y conceptos abstractos.</p>
        <a href="/aves-disponibles/loro-gris-africano/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Amazona Nuca Amarilla</h3>
        <p>Gran capacidad vocal y de aprendizaje. Responde muy bien al entrenamiento diario con clic.</p>
        <a href="/aves-disponibles/amazona-nuca-amarilla/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cacatúa Blanca</h3>
        <p>Muy sociable y motivada por la interacción humana, aprende trucos con facilidad.</p>
        <a href="/aves-disponibles/cacatua-blanca/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // comportamiento/ — links to species with notable behavior traits
  {
    file: 'conocimiento/comportamiento/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Comportamiento por especie</h2>
    <p class="section-sub">El temperamento varía mucho entre especies. Conoce a tu loro antes de adoptarlo.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Gris Africano</h3>
        <p>Especie muy sensible al estrés; necesita rutinas estables y estimulación cognitiva constante.</p>
        <a href="/aves-disponibles/loro-gris-africano/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Conuro del Sol</h3>
        <p>Alegre y ruidoso: socializa bien pero puede ser muy vocal. Ideal para hogares activos.</p>
        <a href="/aves-disponibles/conuro-del-sol/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Senegal</h3>
        <p>Tranquilo y amoroso en su dueño, puede ser desconfiado con extraños. Buen loro de apartamento.</p>
        <a href="/aves-disponibles/loro-senegal/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Caique</h3>
        <p>Juguetón e hiperactivo: lleno de energía, muy divertido pero requiere mucho tiempo de juego.</p>
        <a href="/aves-disponibles/caique/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // cria/ — links to species commonly bred in captivity
  {
    file: 'conocimiento/cria/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Especies que criamos</h2>
    <p class="section-sub">Todas nuestras especies se crían en cautividad con documentación CITES completa.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Conuro Jenday</h3>
        <p>Especie prolífica en cautividad con buena adaptación al clima español. Colorido y sociable.</p>
        <a href="/aves-disponibles/conuro-jenday/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cacatúa Goffin</h3>
        <p>Cría bien establecida en Europa; ejemplares nacidos en criadero son más dóciles que los importados.</p>
        <a href="/aves-disponibles/cacatua-goffin/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cotorra Monje</h3>
        <p>Una de las especies más criadas en España. Altamente adaptable y fácil de manejar.</p>
        <a href="/aves-disponibles/cotorra-monje/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // guias-avanzadas/ — links to challenging/advanced species
  {
    file: 'conocimiento/guias-avanzadas/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Especies para tutores avanzados</h2>
    <p class="section-sub">Estas especies requieren experiencia previa y un compromiso serio de cuidado a largo plazo.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Gris Africano</h3>
        <p>Altamente inteligente y emocionalmente complejo. No recomendado para principiantes.</p>
        <a href="/aves-disponibles/loro-gris-africano/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Amazona Nuca Amarilla</h3>
        <p>Fuerte personalidad y posible agresividad en la pubertad. Requiere manejo consistente.</p>
        <a href="/aves-disponibles/amazona-nuca-amarilla/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Lorikeet Arcoíris</h3>
        <p>Dieta especializada en néctar, heces muy líquidas y alta energía: solo para tutores dedicados.</p>
        <a href="/aves-disponibles/lorikeet-arcoiris/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // guias-principiantes/ — links to beginner-friendly species + city pages
  {
    file: 'conocimiento/guias-principiantes/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Especies recomendadas para principiantes</h2>
    <p class="section-sub">Si es tu primer loro, estas especies son más tolerantes y fáciles de manejar.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Pionus</h3>
        <p>Tranquilo, cariñoso y con bajo nivel sonoro: el loro ideal para familias que se inician.</p>
        <a href="/aves-disponibles/loro-pionus/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Conuro Mejilla Verde</h3>
        <p>Pequeño, juguetón y resistente. Muy sociable y fácil de manejar para nuevos tutores.</p>
        <a href="/aves-disponibles/conuro-mejilla-verde/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Senegal</h3>
        <p>Mediano y dócil: aprende a hablar con facilidad y se adapta bien a la vida en apartamento.</p>
        <a href="/aves-disponibles/loro-senegal/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Encuentra un criador cerca</h3>
        <p>Guías locales para comprar tu primer loro de forma legal y segura en España.</p>
        <a href="/comprar-loros-espana" class="btn">Ver ciudades →</a>
      </div>
    </div>
  </section>`
  },

  // instalaciones/ — links to species with specific housing needs
  {
    file: 'conocimiento/instalaciones/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Necesidades de espacio por especie</h2>
    <p class="section-sub">El tamaño de la jaula y el espacio de vuelo libre varían según la especie.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Cacatúa Blanca</h3>
        <p>Necesita una de las jaulas más grandes: mínimo 90×90×120 cm con espacio para extender las alas.</p>
        <a href="/aves-disponibles/cacatua-blanca/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Caique</h3>
        <p>Loro pequeño pero muy activo: requiere muchos niveles de perchas y juguetes que explorar.</p>
        <a href="/aves-disponibles/caique/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Periquito Collar Indio</h3>
        <p>Cola larga que requiere jaulas altas. Disfruta de espacio de vuelo libre diario.</p>
        <a href="/aves-disponibles/periquito-collar-indio/" class="btn">Ver ficha →</a>
      </div>
    </div>
  </section>`
  },

  // viajes/ — links to species and city pages
  {
    file: 'conocimiento/viajes/index.html',
    newSection: `
  <section class="section" style="padding-top:0">
    <h2 class="section-title">Viajes con loros: especies y ciudades</h2>
    <p class="section-sub">Los requisitos de transporte varían según la especie y el destino. Infórmate antes de viajar.</p>
    <div class="cat-grid">
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Gris Africano</h3>
        <p>CITES I: requiere permiso de exportación/importación en cada viaje internacional fuera de la UE.</p>
        <a href="/aves-disponibles/loro-gris-africano/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🦜</span>
        <h3>Loro Pionus</h3>
        <p>Especie tranquila que tolera bien los desplazamientos con el transportín adecuado.</p>
        <a href="/aves-disponibles/loro-pionus/" class="btn">Ver ficha →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Recogida en Madrid</h3>
        <p>Entrega presencial en Madrid para evitar el estrés del transporte aéreo en tu nueva ave.</p>
        <a href="/ciudades/comprar-loros-madrid.html" class="btn">Ver guía →</a>
      </div>
      <div class="cat-card">
        <span class="cat-icon">🏙️</span>
        <h3>Recogida en Barcelona</h3>
        <p>Entrega directa en Cataluña con toda la documentación CITES en mano.</p>
        <a href="/ciudades/comprar-loros-barcelona.html" class="btn">Ver guía →</a>
      </div>
    </div>
  </section>`
  }
];

let updated = 0;
for (const { file, newSection } of pages) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('</main>')) {
    // Insert before </main>
    html = html.replace('</main>', newSection + '\n</main>');
    fs.writeFileSync(file, html, 'utf8');
    console.log(`✅ Updated: ${file}`);
    updated++;
  } else {
    console.log(`⚠️  Could not find </main> in: ${file}`);
  }
}
console.log(`\nDone: ${updated}/${pages.length} pages updated.`);
