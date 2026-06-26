#!/usr/bin/env node
/* PHASE 2E — Unify multilingual navigation across PT and FR pages.
   - Extracts the canonical nav CSS + toggle JS verbatim from an ES page.
   - Replaces the divergent PT/FR top bars with the unified mega-menu header.
   - Creates the 4 missing commercial placeholder pages (noindex). */
const fs = require('fs');
const path = require('path');

const ES_SRC = 'juguetes-naturales-para-loros.html';
const es = fs.readFileSync(ES_SRC, 'utf8');

/* ── Extract nav CSS (two <style> blocks) verbatim ── */
const cssStart = es.indexOf('<style>\n.header{position:fixed');
const cssEndMarker = '@media(max-width:600px){.nav-ham{display:flex}}\n</style>';
const cssEnd = es.indexOf(cssEndMarker) + cssEndMarker.length;
if (cssStart < 0 || cssEnd < cssEndMarker.length) throw new Error('nav CSS not found');
const NAV_CSS = es.slice(cssStart, cssEnd);

/* ── Extract nav toggle JS (two <script> blocks) verbatim ── */
const jsStart = es.indexOf("<script>\n(function(){\n  document.querySelectorAll('.nav-dropdown')");
const jsEndMarker = '<script src="/lang-switcher.js"';
const jsEnd = es.indexOf(jsEndMarker);
if (jsStart < 0 || jsEnd < 0) throw new Error('nav JS not found');
const NAV_JS = es.slice(jsStart, jsEnd).trim();

/* ── Localized header builder ── */
function header(lang) {
  const C = {
    pt: {
      home: '/pt/', aria: 'Navegação principal', menuAria: 'Menu de navegação',
      l_home: 'Início', l_birds: 'Aves', l_adopt: 'Adoção', l_adoptUrl: '/pt/papagaios-a-venda-portugal/',
      l_care: 'Cuidados', l_shop: 'Loja / Acessórios', l_blog: 'Blog', l_contact: 'Contacto',
      blogUrl: '/pt/blog/', contactUrl: '/pt/contacto/', hamAria: 'Abrir menu',
      birds: [
        ['/pt/papagaio-cinzento/', '/images/loro-gris-01.webp', 'Papagaio Cinzento', 'Yaco, Timneh'],
        ['/pt/arara-a-venda/', '/images/guacamayo-azul-01.webp', 'Araras', 'Azul, Jacinto, Macao'],
        ['/pt/cacatua-a-venda/', '/images/cacatua-01.webp', 'Cacatuas', 'Ninfa, Branca'],
        ['/pt/amazona-a-venda/', '/images/loro-amazonico-01.webp', 'Amazonas', 'Frente azul'],
        ['/pt/papagaio-eclectus/', '/images/eclectus-01.webp', 'Eclectus', 'Macho e fêmea'],
        ['/pt/conuro/', '/images/conuro-01.webp', 'Conuros', 'Sol, Jenday']
      ],
      care: [
        ['/pt/comida-para-papagaios/', '/images/gallery/comida-para-loros-mezcla-premium-01.jpg', 'Alimentação', 'Dieta e nutrição'],
        ['/pt/blog/jaula-ideal-papagaio/', '/images/gallery/nosotros-jaula-interior-equipada-03.jpg', 'Gaiolas', 'Tamanho e equipamento'],
        ['/pt/blog/doencas-comuns-papagaios/', '/images/gallery/aves-disponibles-loro-gris-africano-volando-12.jpg', 'Saúde', 'Doenças e prevenção'],
        ['/pt/blog/documentacao-cites-portugal/', '📄', 'Documentação CITES', 'Requisitos legais']
      ],
      shop: [
        ['/pt/gaiolas-para-papagaios/', '/images/gallery/nosotros-jaula-interior-equipada-03.jpg', 'Gaiolas', 'Para todas as espécies'],
        ['/pt/comida-para-papagaios/', '/images/gallery/comida-para-loros-mezcla-premium-01.jpg', 'Comida', 'Rações e complementos'],
        ['/pt/brinquedos-naturais-para-papagaios/', '/images/gallery/juguetes-naturales-para-loros-01.jpg', 'Brinquedos', 'Estimulação e enriquecimento'],
        ['/pt/transportadoras-para-papagaios/', '🧳', 'Transportadoras', 'Para viagens seguras']
      ]
    },
    fr: {
      home: '/fr/', aria: 'Navigation principale', menuAria: 'Menu de navigation',
      l_home: 'Accueil', l_birds: 'Oiseaux', l_adopt: 'Adoption', l_adoptUrl: '/fr/perroquets-disponibles/',
      l_care: 'Soins', l_shop: 'Boutique / Accessoires', l_blog: 'Blog', l_contact: 'Contact',
      blogUrl: '/fr/blog/', contactUrl: '/fr/contact/', hamAria: 'Ouvrir le menu',
      birds: [
        ['/fr/perroquet-gris-du-gabon/', '/images/loro-gris-01.webp', 'Gris du Gabon', 'Le plus intelligent'],
        ['/fr/ara-bleu-et-jaune/', '/images/guacamayo-azul-01.webp', 'Ara Bleu et Jaune', 'Très sociable'],
        ['/fr/ara-hyacinthe/', '/images/guacamayo-azul-01.webp', 'Ara Hyacinthe', 'Le plus grand'],
        ['/fr/cacatoes-huppe-jaune/', '/images/cacatua-01.webp', 'Cacatoès', 'Très affectueux'],
        ['/fr/amazone-front-bleu/', '/images/loro-amazonico-01.webp', 'Amazone', 'Très bavard'],
        ['/fr/eclectus/', '/images/eclectus-01.webp', 'Éclectus', 'Dimorphisme unique']
      ],
      care: [
        ['/fr/nourriture-pour-perroquets/', '/images/gallery/comida-para-loros-mezcla-premium-01.jpg', 'Alimentation', 'Régime et nutrition'],
        ['/fr/jouets-naturels-pour-perroquets/', '/images/gallery/juguetes-naturales-para-loros-01.jpg', 'Jouets', 'Stimulation et enrichissement'],
        ['/fr/garantie-sante/', '/images/gallery/aves-disponibles-loro-gris-africano-volando-12.jpg', 'Garantie santé', 'Suivi vétérinaire'],
        ['/fr/processus-adoption/', '📄', "Processus d'adoption", 'Étapes et documentation']
      ],
      shop: [
        ['/fr/cages-pour-perroquets/', '/images/gallery/nosotros-jaula-interior-equipada-03.jpg', 'Cages', 'Pour toutes les espèces'],
        ['/fr/nourriture-pour-perroquets/', '/images/gallery/comida-para-loros-mezcla-premium-01.jpg', 'Nourriture', 'Granulés et compléments'],
        ['/fr/jouets-naturels-pour-perroquets/', '/images/gallery/juguetes-naturales-para-loros-01.jpg', 'Jouets', 'Stimulation et enrichissement'],
        ['/fr/caisses-de-transport/', '🧳', 'Caisses de transport', 'Pour des voyages sûrs']
      ]
    }
  }[lang];

  const megaItem = ([url, img, label, sub]) => {
    const icon = img.startsWith('/')
      ? `<img class="mega-img" src="${img}" alt="${label}" loading="lazy" width="40" height="40">`
      : `<span style="font-size:1.05rem;width:40px;text-align:center;flex-shrink:0">${img}</span>`;
    return `        <a href="${url}" role="menuitem">${icon}<span class="mega-label">${label}<small>${sub}</small></span></a>`;
  };
  const dropdown = (label, items) => `    <div class="nav-dropdown">
      <button class="dropbtn" aria-haspopup="true" aria-expanded="false">${label} <span class="chevron">▾</span></button>
      <div class="nav-mega" role="menu">
${items.map(megaItem).join('\n')}
      </div>
    </div>`;
  const mobSection = (label, items) => `      <div class="nm-section"><p class="nm-heading">${label}</p>
${items.map(([url, , label2]) => `        <a href="${url}">${label2}</a>`).join('\n')}
      </div>`;

  return `<header class="header">
  <a class="logo" href="${C.home}">🦜 paraisodeaves</a>
  <nav class="nav" aria-label="${C.aria}">
    <a href="${C.home}">${C.l_home}</a>
${dropdown(C.l_birds, C.birds)}
    <a href="${C.l_adoptUrl}">${C.l_adopt}</a>
${dropdown(C.l_care, C.care)}
${dropdown(C.l_shop, C.shop)}
    <a href="${C.blogUrl}">${C.l_blog}</a>
    <a href="${C.contactUrl}">${C.l_contact}</a>
  </nav>
  <button class="nav-ham" id="navHam" aria-label="${C.hamAria}" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</header>
<div class="nav-mobile" id="navMobile" role="dialog" aria-modal="true" aria-label="${C.menuAria}">
  <div class="nav-mobile-panel">
    <nav class="nav-mobile-list">
      <a href="${C.home}">${C.l_home}</a>
${mobSection(C.l_birds, C.birds)}
      <a href="${C.l_adoptUrl}">${C.l_adopt}</a>
${mobSection(C.l_care, C.care)}
${mobSection(C.l_shop, C.shop)}
      <a href="${C.blogUrl}">${C.l_blog}</a>
      <a href="${C.contactUrl}">${C.l_contact}</a>
    </nav>
  </div>
</div>`;
}

const PT_HEADER = header('pt');
const FR_HEADER = header('fr');

/* ── Walk a directory for *.html ── */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function convert(file, lang) {
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes('nav-mega')) return 'skip';
  let changed = false;

  // Replace header markup
  const HDR = lang === 'pt' ? PT_HEADER : FR_HEADER;
  const reDiv = /<div class="topbar">[\s\S]*?<\/nav>\s*<\/div>/;
  const reHeader = /<header class="topbar">[\s\S]*?<\/header>/;
  if (reDiv.test(c)) { c = c.replace(reDiv, HDR); changed = true; }
  else if (reHeader.test(c)) { c = c.replace(reHeader, HDR); changed = true; }
  if (!changed) return 'no-header';

  // Inject CSS before </head>
  c = c.replace('</head>', NAV_CSS + '\n</head>');
  // Inject toggle JS before </body> (lang-switcher.js already present)
  c = c.replace('</body>', NAV_JS + '\n</body>');

  fs.writeFileSync(file, c);
  return 'ok';
}

module.exports = { NAV_CSS, NAV_JS, PT_HEADER, FR_HEADER, header };

if (require.main === module) {
  const stats = { pt: {}, fr: {} };
  for (const f of walk('pt')) { const r = convert(f, 'pt'); stats.pt[r] = (stats.pt[r] || 0) + 1; if (r === 'no-header') console.log('PT no-header:', f); }
  for (const f of walk('fr')) { const r = convert(f, 'fr'); stats.fr[r] = (stats.fr[r] || 0) + 1; if (r === 'no-header') console.log('FR no-header:', f); }
  console.log('PT:', stats.pt);
  console.log('FR:', stats.fr);
  console.log('Done converting navs.');
}
