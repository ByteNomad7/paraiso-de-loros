#!/usr/bin/env node
/* Canonical unified footer for ES (/), PT (/pt/) and FR (/fr/).
   Identical structure across all three languages: brand block + 4 link
   columns (Birds, Accessories, Cities, Info). Localized labels/links, all
   ABSOLUTE URLs (no relative-depth bugs). Idempotent. Also exported so
   make-placeholders.js shares the exact same markup. */
const fs = require('fs');
const path = require('path');

const FOOTER_CSS = `
<style>
/* unified-footer-v2 */
.footer{background:#1F3D2B;color:#F8F5F0;padding:3.5rem 5% 2.5rem;border-top:1px solid rgba(255,255,255,.10)}
.footer a{color:#E0B75F;text-decoration:none;transition:color .2s}.footer a:hover{color:#fff}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:2rem;max-width:1200px;margin:0 auto 2.5rem}
.footer-brand-name{font-family:'Poppins',Arial,sans-serif;font-size:1.1rem;font-weight:700;color:#FFFFFF;-webkit-text-fill-color:#FFFFFF;display:block;margin-bottom:.7rem;letter-spacing:-.01em}
.footer-tagline{font-size:.86rem;color:rgba(255,255,255,.60);line-height:1.5;margin-bottom:.8rem}
.footer-contact{font-size:.83rem;color:rgba(245,245,245,.85);line-height:1.9}
.footer-contact a{color:#E0B75F;text-decoration:none;transition:color .2s}.footer-contact a:hover{color:#fff}
.footer-col h4{font-family:'Poppins',Arial,sans-serif;font-size:.72rem;font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:#E0B75F;margin-bottom:1rem}
.footer-col ul{list-style:none;padding:0;margin:0}
.footer-col ul li{margin-bottom:.55rem}
.footer-col ul li a{color:#F8F5F0;font-size:.86rem;text-decoration:none;transition:color .2s,opacity .2s}
.footer-col ul li a:hover{color:#E0B75F;opacity:.9}
.footer-bottom-bar{max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,.12);padding-top:1.2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;font-size:.78rem;color:rgba(245,245,245,.60)}
.footer-bottom-bar a{color:#E0B75F;text-decoration:none;transition:color .2s}.footer-bottom-bar a:hover{color:#fff}
@media(max-width:820px){.footer-grid{grid-template-columns:1fr 1fr;row-gap:1.5rem}}
@media(max-width:480px){.footer-grid{grid-template-columns:1fr}.footer-bottom-bar{flex-direction:column;text-align:center}}
</style>`;

function buildFooter({ tagline, c1, c2, c3, c4, copyright }) {
  const col = (h4, links) => `      <div class="footer-col">
        <h4>${h4}</h4>
        <ul>
${links.map(([href, label]) => `          <li><a href="${href}">${label}</a></li>`).join('\n')}
        </ul>
      </div>`;
  return `  <footer class="footer">
    <div class="footer-grid">
      <div>
        <span class="footer-brand-name">🦜 paraisodeaves</span>
        <p class="footer-tagline">${tagline}</p>
        <p class="footer-contact">📧 <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a></p>
      </div>
${col(c1.h, c1.l)}
${col(c2.h, c2.l)}
${col(c3.h, c3.l)}
${col(c4.h, c4.l)}
    </div>
    <div class="footer-bottom-bar">
      <span>&copy; 2026 paraisodeaves &mdash; ${copyright}</span>
      <span><a href="/sitemap.xml">Sitemap</a></span>
    </div>
  </footer>`;
}

const ES_FOOTER = buildFooter({
  tagline: 'Criador de loros y aves exóticas en España. Envíos con documentación CITES a toda Europa.',
  c1: { h: 'Nuestras Aves', l: [
    ['/loro-gris-africano.html', 'Loro Gris Africano'],
    ['/guacamayos.html', 'Guacamayos'],
    ['/cacatuas.html', 'Cacatúas'],
    ['/available-birds/', 'Ver todas las aves'],
  ]},
  c2: { h: 'Accesorios', l: [
    ['/comida-para-loros', 'Comida para Loros'],
    ['/jaulas-para-loros', 'Jaulas'],
    ['/juguetes-naturales-para-loros', 'Juguetes Naturales'],
    ['/transportines-para-loros', 'Transportines'],
  ]},
  c3: { h: 'Ciudades', l: [
    ['/ciudades/', 'Todas las ciudades'],
    ['/comprar-loros-madrid', 'Madrid'],
    ['/comprar-loros-andalucia', 'Andalucía'],
    ['/comprar-loros-cataluna', 'Cataluña'],
    ['/comprar-loros-valencia', 'Valencia'],
  ]},
  c4: { h: 'Información', l: [
    ['/adopcion-de-loros', 'Adopción'],
    ['/cuidados-basicos-de-un-loro', 'Cuidados básicos'],
    ['/documentos-legales-para-adoptar-un-loro', 'Documentación legal'],
    ['/faq.html', 'FAQ'],
    ['/blog/', 'Blog'],
  ]},
  copyright: 'Todos los derechos reservados',
});

const PT_FOOTER = buildFooter({
  tagline: 'Criador de papagaios e aves exóticas. Envios com documentação CITES para Portugal e toda a Europa.',
  c1: { h: 'As Nossas Aves', l: [
    ['/pt/papagaio-cinzento/', 'Papagaio Cinzento'],
    ['/pt/arara-a-venda/', 'Araras'],
    ['/pt/cacatua-a-venda/', 'Cacatuas'],
    ['/pt/amazona-a-venda/', 'Amazonas'],
    ['/pt/papagaios-disponiveis/', 'Ver todas as aves'],
  ]},
  c2: { h: 'Acessórios', l: [
    ['/pt/comida-para-papagaios/', 'Comida para Papagaios'],
    ['/pt/gaiolas-para-papagaios/', 'Gaiolas'],
    ['/pt/brinquedos-naturais-para-papagaios/', 'Brinquedos Naturais'],
    ['/pt/transportadoras-para-papagaios/', 'Transportadoras'],
  ]},
  c3: { h: 'Cidades', l: [
    ['/pt/cidades/', 'Todas as cidades'],
    ['/pt/cidades/papagaios-lisboa/', 'Lisboa'],
    ['/pt/cidades/papagaios-porto/', 'Porto'],
    ['/pt/cidades/papagaios-funchal/', 'Funchal'],
  ]},
  c4: { h: 'Informação', l: [
    ['/pt/papagaios-a-venda-portugal/', 'Papagaios à Venda'],
    ['/pt/as-nossas-instalacoes/', 'As Nossas Instalações'],
    ['/pt/blog/', 'Blog'],
    ['/pt/contacto/', 'Contacto'],
  ]},
  copyright: 'Todos os direitos reservados',
});

const FR_FOOTER = buildFooter({
  tagline: "Éleveur de perroquets et d'oiseaux exotiques. Livraison avec documentation CITES en France et dans toute l'Europe.",
  c1: { h: 'Nos Oiseaux', l: [
    ['/fr/perroquet-gris-du-gabon/', 'Gris du Gabon'],
    ['/fr/ara-bleu-et-jaune/', 'Aras'],
    ['/fr/cacatoes-huppe-jaune/', 'Cacatoès'],
    ['/fr/amazone-front-bleu/', 'Amazones'],
    ['/fr/perroquets-disponibles/', 'Voir tous les oiseaux'],
  ]},
  c2: { h: 'Accessoires', l: [
    ['/fr/nourriture-pour-perroquets/', 'Nourriture'],
    ['/fr/cages-pour-perroquets/', 'Cages'],
    ['/fr/jouets-naturels-pour-perroquets/', 'Jouets Naturels'],
    ['/fr/caisses-de-transport/', 'Caisses de Transport'],
  ]},
  c3: { h: 'Villes', l: [
    ['/fr/perroquets-a-vendre-paris/', 'Paris'],
    ['/fr/perroquets-a-vendre-lyon/', 'Lyon'],
    ['/fr/perroquets-a-vendre-marseille/', 'Marseille'],
    ['/fr/perroquets-a-vendre-bordeaux/', 'Bordeaux'],
  ]},
  c4: { h: 'Informations', l: [
    ['/fr/processus-adoption/', 'Processus d\'Adoption'],
    ['/fr/garantie-sante/', 'Garantie Santé'],
    ['/fr/livraison/', 'Livraison'],
    ['/fr/blog/', 'Blog'],
    ['/fr/contact/', 'Contact'],
  ]},
  copyright: 'Tous droits réservés',
});

function applyFooter(file, footerHtml) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/unified-footer-v2/.test(html)) {
    if (html.includes('</head>')) html = html.replace('</head>', FOOTER_CSS + '\n</head>');
  }
  // Replace the LAST <footer>...</footer> (the site footer; leaves any
  // article-footer earlier in the page untouched).
  const footerRe = /<footer[\s\S]*?<\/footer>/gi;
  const matches = [...html.matchAll(footerRe)];
  if (matches.length) {
    const last = matches[matches.length - 1];
    html = html.slice(0, last.index) + footerHtml + html.slice(last.index + last[0].length);
  } else if (html.includes('</body>')) {
    html = html.replace('</body>', footerHtml + '\n</body>');
  } else {
    return false;
  }
  fs.writeFileSync(file, html);
  return true;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['.git', 'node_modules', '.local', '.agents'].includes(e.name)) continue;
      walk(p, acc);
    } else if (e.name.endsWith('.html')) {
      acc.push(p);
    }
  }
  return acc;
}

function run() {
  const root = process.cwd();
  const all = walk(root);
  let es = 0, pt = 0, fr = 0, skipped = 0;
  for (const f of all) {
    const rel = path.relative(root, f).replace(/\\/g, '/');
    let footer;
    if (rel.startsWith('pt/')) footer = PT_FOOTER;
    else if (rel.startsWith('fr/')) footer = FR_FOOTER;
    else footer = ES_FOOTER;
    const ok = applyFooter(f, footer);
    if (!ok) { skipped++; continue; }
    if (rel.startsWith('pt/')) pt++;
    else if (rel.startsWith('fr/')) fr++;
    else es++;
  }
  console.log(`Unified footer applied — ES:${es} PT:${pt} FR:${fr} skipped:${skipped}`);
}

module.exports = { FOOTER_CSS, ES_FOOTER, PT_FOOTER, FR_FOOTER };
if (require.main === module) run();
