#!/usr/bin/env node
/* Apply the canonical ES 5-column footer (from index.html) to the ES
   commercial pages that still use a compact inline footer. Idempotent. */
const fs = require('fs');

const ES_FOOTER_CSS = `
<style>
/* unified-es-footer */
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

const ES_FOOTER = `  <footer class="footer">
    <div class="footer-grid">
      <div>
        <span class="footer-brand-name">🦜 paraisodeaves</span>
        <p class="footer-tagline">Criador de loros y aves exóticas en España. Envíos con documentación CITES a toda Europa.</p>
        <p class="footer-contact">📧 <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a></p>
      </div>
      <div class="footer-col">
        <h4>Navegar</h4>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/nosotros.html">Nosotros</a></li>
          <li><a href="/criadero-loros-espana">Criadero</a></li>
          <li><a href="/adopcion-de-loros">Adopción</a></li>
          <li><a href="/#contacto">Contacto</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Nuestras Aves</h4>
        <ul>
          <li><a href="/loro-gris-africano.html">Loro Gris Africano</a></li>
          <li><a href="/guacamayos.html">Guacamayos</a></li>
          <li><a href="/cacatuas.html">Cacatúas</a></li>
          <li><a href="/available-birds/">Ver todas las aves</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Comprar por Región</h4>
        <ul>
          <li><a href="/comprar-loros-espana">España Nacional</a></li>
          <li><a href="/comprar-loros-madrid">Madrid</a></li>
          <li><a href="/comprar-loros-andalucia">Andalucía</a></li>
          <li><a href="/comprar-loros-cataluna">Cataluña</a></li>
          <li><a href="/comprar-loros-valencia">Valencia</a></li>
          <li><a href="/comprar-loros-canarias">Canarias</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Información</h4>
        <ul>
          <li><a href="/faq.html">FAQ</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/cuidados-basicos-de-un-loro">Cuidados básicos</a></li>
          <li><a href="/documentos-legales-para-adoptar-un-loro">Documentación legal</a></li>
          <li><a href="/cuanto-cuesta-mantener-un-loro">Costes mantenimiento</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <span>&copy; 2026 paraisodeaves &mdash; Todos los derechos reservados</span>
      <span><a href="/sitemap.xml">Sitemap</a></span>
    </div>
  </footer>`;

const FILES = [
  'comida-para-loros.html',
  'jaulas-para-loros.html',
  'juguetes-naturales-para-loros.html',
  'transportines-para-loros.html',
  'tienda.html'
];

for (const file of FILES) {
  let html = fs.readFileSync(file, 'utf8');

  // 1) inject footer CSS once
  if (!/unified-es-footer/.test(html)) {
    html = html.replace('</head>', ES_FOOTER_CSS + '\n</head>');
  }

  // 2) replace existing footer with the canonical one
  const footerRe = /<footer[\s\S]*?<\/footer>/i;
  if (footerRe.test(html)) {
    html = html.replace(footerRe, ES_FOOTER);
  } else {
    html = html.replace('</body>', ES_FOOTER + '\n</body>');
  }

  fs.writeFileSync(file, html);
  console.log('footer applied:', file);
}
console.log('ES footer unification done.');
