#!/usr/bin/env node
/**
 * add-blog-backlinks-to-pt-pages.js
 *
 * Adds "Artigos de blog recomendados" sections to PT species and knowledge pages,
 * linking BACK to the relevant PT blog posts that discuss them.
 *
 * This completes the two-way internal link loop for the PT section:
 *   PT blog posts → PT species/knowledge pages  (add-contextual-body-links-pt.js)
 *   PT species/knowledge pages → PT blog posts  (this script)
 *
 * Rules:
 *  - Injects a styled blog-post card section before the final CTA block
 *  - Skips any blog post URL already linked anywhere in the page
 *  - Idempotent: skips pages that already have the injected marker comment
 *  - At most 2 blog post links injected per page (the highest-relevance ones first)
 */

const fs   = require('fs');
const path = require('path');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

// ─── Blog post catalogue ──────────────────────────────────────────────────────
const BLOG = {
  'alimentacao-correta-dos-papagaios':   { title: 'Alimentação Correcta dos Papagaios: Guia Completo', tag: 'Nutrição', time: '6 min' },
  'alimentacao-papagaio-guia-completo':  { title: 'Alimentação de Papagaios: Guia Completo para Portugal', tag: 'Nutrição', time: '7 min' },
  'arara-jacinto-guia-completo':         { title: 'Arara Jacinto: Guia Completo para Portugal', tag: 'Espécie', time: '9 min' },
  'arara-jacinto-caracteristicas':       { title: 'Arara Jacinto: O Gigante Gentil dos Papagaios', tag: 'Espécie', time: '6 min' },
  'cacatua-ninfa-carolina-guia':         { title: 'Ninfa Carolina: A Cacatua Ideal para Iniciantes', tag: 'Espécie', time: '7 min' },
  'como-escolher-um-criador-responsavel':{ title: 'Como Escolher um Criador de Papagaios Responsável', tag: 'Adopção', time: '6 min' },
  'como-escolher-um-papagaio':           { title: 'Como Escolher um Papagaio: Guia Completo', tag: 'Guia', time: '8 min' },
  'como-preparar-a-casa-para-um-papagaio':{ title: 'Como Preparar a Casa para um Papagaio', tag: 'Bem-estar', time: '5 min' },
  'documentacao-cites-portugal':         { title: 'Documentação CITES em Portugal: Guia Completo 2026', tag: 'CITES & Legalidade', time: '8 min' },
  'doencas-comuns-papagaios':            { title: 'Doenças Comuns em Papagaios: Sintomas e Prevenção', tag: 'Saúde', time: '7 min' },
  'esperanca-de-vida-papagaios':         { title: 'Esperança de Vida dos Papagaios: Quanto Vivem?', tag: 'Saúde', time: '5 min' },
  'jaula-ideal-papagaio':                { title: 'Como Escolher a Jaula Ideal para o Seu Papagaio', tag: 'Instalações', time: '5 min' },
  'melhores-papagaios-para-familias':    { title: 'Os Melhores Papagaios para Famílias com Crianças', tag: 'Guia', time: '6 min' },
  'melhores-papagaios-para-iniciantes':  { title: 'Melhores Papagaios para Iniciantes em Portugal', tag: 'Guia', time: '6 min' },
  'papagaio-adocao-vs-compra':           { title: 'Adotar vs Comprar um Papagaio: Vantagens e Considerações', tag: 'Adopção', time: '5 min' },
  'papagaio-amazona-mascota':            { title: 'A Amazona como Animal de Companhia: Guia Completo', tag: 'Espécie', time: '7 min' },
  'papagaio-cinzento-cuidados':          { title: 'Cuidados do Papagaio Cinzento Africano: Guia Completo', tag: 'Espécie', time: '9 min' },
  'papagaio-cinzento-vs-eclectus':       { title: 'Papagaio Cinzento vs Eclectus: Qual Escolher?', tag: 'Espécie', time: '6 min' },
  'papagaio-falar-como-ensinar':         { title: 'Como Ensinar um Papagaio a Falar: Guia Eficaz', tag: 'Comportamento', time: '5 min' },
  'papagaio-para-apartamento-em-portugal':{ title: 'Papagaio para Apartamento em Portugal: Guia Completo', tag: 'Guia', time: '6 min' },
  'papagaio-stress-como-reduzir':        { title: 'Como Reduzir o Stress no Papagaio: Sinais e Soluções', tag: 'Comportamento', time: '5 min' },
  'periquito-mascota-guia':              { title: 'O Periquito como Animal de Companhia: Guia Completo', tag: 'Espécie', time: '6 min' },
  'quanto-custa-um-papagaio-em-portugal':{ title: 'Quanto Custa um Papagaio em Portugal? Guia de Preços 2026', tag: 'Preços', time: '6 min' },
  'treinar-um-papagaio':                 { title: 'Como Treinar um Papagaio: Técnicas Eficazes e Seguras', tag: 'Adestramento', time: '6 min' },
  'primeiros-dias-papagaio-em-casa':     { title: 'Os Primeiros Dias com um Papagaio em Casa', tag: 'Adopção', time: '5 min' },
};

function blogUrl(slug) {
  return `https://www.paraisodeaves.com/pt/blog/${slug}/`;
}

// ─── Page → blog post mapping ─────────────────────────────────────────────────
// Each entry: page file path → ordered array of blog slugs (most relevant first)
const PAGE_LINKS = {
  // ── Species pages ─────────────────────────────────────────────────────────
  'pt/especies/amazona-asa-laranja/index.html':      ['papagaio-amazona-mascota', 'esperanca-de-vida-papagaios'],
  'pt/especies/amazona-nuca-amarela/index.html':     ['papagaio-amazona-mascota', 'como-escolher-um-papagaio'],
  'pt/especies/cacatua-branca/index.html':           ['esperanca-de-vida-papagaios', 'como-escolher-um-papagaio'],
  'pt/especies/cacatua-galah/index.html':            ['melhores-papagaios-para-iniciantes', 'como-escolher-um-papagaio'],
  'pt/especies/cacatua-goffin/index.html':           ['melhores-papagaios-para-iniciantes', 'como-escolher-um-papagaio'],
  'pt/especies/caique/index.html':                   ['melhores-papagaios-para-iniciantes', 'como-escolher-um-papagaio'],
  'pt/especies/conuro-do-sol/index.html':            ['melhores-papagaios-para-iniciantes', 'quanto-custa-um-papagaio-em-portugal'],
  'pt/especies/conuro-faces-verdes/index.html':      ['melhores-papagaios-para-iniciantes', 'como-escolher-um-papagaio'],
  'pt/especies/conuro-jenday/index.html':            ['melhores-papagaios-para-iniciantes', 'quanto-custa-um-papagaio-em-portugal'],
  'pt/especies/lorikeet-arco-iris/index.html':       ['alimentacao-papagaio-guia-completo', 'como-escolher-um-papagaio'],
  'pt/especies/papagaio-pionus/index.html':          ['melhores-papagaios-para-iniciantes', 'como-escolher-um-papagaio'],
  'pt/especies/papagaio-senegal/index.html':         ['melhores-papagaios-para-iniciantes', 'como-escolher-um-papagaio'],
  'pt/especies/periquito-alexandrino/index.html':    ['periquito-mascota-guia', 'como-escolher-um-papagaio'],
  'pt/especies/periquito-colar-indiano/index.html':  ['periquito-mascota-guia', 'melhores-papagaios-para-iniciantes'],
  'pt/especies/periquito-monge/index.html':          ['periquito-mascota-guia', 'melhores-papagaios-para-iniciantes'],

  // ── Knowledge pages ───────────────────────────────────────────────────────
  'pt/conhecimento/nutricao/index.html':           ['alimentacao-papagaio-guia-completo', 'alimentacao-correta-dos-papagaios'],
  'pt/conhecimento/saude/index.html':              ['doencas-comuns-papagaios', 'esperanca-de-vida-papagaios'],
  'pt/conhecimento/comportamento/index.html':      ['papagaio-stress-como-reduzir', 'papagaio-falar-como-ensinar'],
  'pt/conhecimento/comprar/index.html':            ['como-escolher-um-papagaio', 'papagaio-adocao-vs-compra'],
  'pt/conhecimento/documentacao-cites/index.html': ['documentacao-cites-portugal', 'como-escolher-um-criador-responsavel'],
  'pt/conhecimento/guias-iniciantes/index.html':   ['melhores-papagaios-para-iniciantes', 'como-escolher-um-papagaio'],
  'pt/conhecimento/instalacoes/index.html':        ['jaula-ideal-papagaio', 'como-preparar-a-casa-para-um-papagaio'],
  'pt/conhecimento/adestramento/index.html':       ['treinar-um-papagaio', 'papagaio-falar-como-ensinar'],
  'pt/conhecimento/acessorios/index.html':         ['jaula-ideal-papagaio', 'como-preparar-a-casa-para-um-papagaio'],
};

// ─── HTML builders ────────────────────────────────────────────────────────────

function buildCard(slug) {
  const info = BLOG[slug];
  const url  = blogUrl(slug);
  return `<a href="${url}" class="article-card" style="display:block;color:inherit;text-decoration:none;">
  <div class="card-body">
    <span class="tag">${info.tag}</span>
    <h3>${info.title}</h3>
    <div class="meta">
      <span class="read-time">⏱ ${info.time} de leitura</span>
      <span class="read-link">Ler →</span>
    </div>
  </div>
</a>`;
}

function buildSection(slugs) {
  const cards = slugs.map(buildCard).join('\n');
  return `
  <!-- BLOG-BACKLINKS: artigos de blog relacionados — injectado por add-blog-backlinks-to-pt-pages.js -->
  <div class="otras-aves" style="margin-top:24px;">
    <h2>📰 Artigos de blog recomendados</h2>
    <div class="article-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:14px;">
      ${cards}
    </div>
    <div style="margin-top:14px;text-align:right;">
      <a href="https://www.paraisodeaves.com/pt/blog/" style="font-size:.85rem;font-weight:700;color:var(--primary);">Ver todos os nossos artigos →</a>
    </div>
  </div>
  <!-- /BLOG-BACKLINKS -->`;
}

// ─── Injection helpers ────────────────────────────────────────────────────────

function findSpeciesInjectionPoint(html) {
  const markers = [
    '<!-- FINAL CTA -->',
    '<div class="final-cta">',
    '<div class="otras-aves">',
  ];
  for (const m of markers) {
    const idx = html.indexOf(m);
    if (idx !== -1) return idx;
  }
  return -1;
}

function findKnowledgeInjectionPoint(html) {
  const markers = [
    '<div class="cta-band">',
    '<!-- CTA block -->',
    '<div class="cta-block"',
  ];
  for (const m of markers) {
    const idx = html.indexOf(m);
    if (idx !== -1) return idx;
  }
  return -1;
}

// ─── Process one file ─────────────────────────────────────────────────────────

function processFile(filePath, slugs) {
  if (!fs.existsSync(filePath)) {
    return { status: 'missing' };
  }

  let html = readFile(filePath);

  // Idempotency guard
  if (html.includes('BLOG-BACKLINKS')) {
    return { status: 'already_done' };
  }

  // Filter out slugs whose URL is already linked anywhere in the page
  const slugsToAdd = slugs.filter(slug => !html.includes(blogUrl(slug)));
  if (!slugsToAdd.length) {
    return { status: 'already_linked' };
  }
  // Cap at 2
  const finalSlugs = slugsToAdd.slice(0, 2);

  const section = buildSection(finalSlugs);

  const isSpecies   = filePath.includes('/especies/');
  const isKnowledge = filePath.includes('/conhecimento/');

  let injectionPoint = -1;
  if (isSpecies)   injectionPoint = findSpeciesInjectionPoint(html);
  if (isKnowledge) injectionPoint = findKnowledgeInjectionPoint(html);

  if (injectionPoint === -1) {
    return { status: 'no_injection_point' };
  }

  html = html.slice(0, injectionPoint) + section + '\n\n  ' + html.slice(injectionPoint);
  writeFile(filePath, html);
  return { status: 'updated', slugs: finalSlugs };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\n🔗 add-blog-backlinks-to-pt-pages — Adding blog post backlinks to PT species & knowledge pages\n');

const stats = { updated: 0, already_done: 0, already_linked: 0, missing: 0, no_injection_point: 0 };
const results = [];

for (const [filePath, slugs] of Object.entries(PAGE_LINKS)) {
  const result = processFile(filePath, slugs);
  stats[result.status] = (stats[result.status] || 0) + 1;
  results.push({ filePath, ...result });
}

// Report
console.log('Results:\n');
for (const r of results) {
  const label = path.dirname(r.filePath).replace('pt/', '').replace(/\//g, '/');
  if (r.status === 'updated') {
    console.log(`  ✓ ${label}  →  ${r.slugs.join(', ')}`);
  } else if (r.status === 'missing') {
    console.log(`  ✗ MISSING: ${r.filePath}`);
  } else if (r.status === 'no_injection_point') {
    console.log(`  ⚠ no injection point: ${r.filePath}`);
  }
}

console.log('\n── Summary ──────────────────────────────────────────');
console.log(`Pages updated (new blog links added): ${stats.updated}`);
console.log(`Already had BLOG-BACKLINKS section:   ${stats.already_done || 0}`);
console.log(`All target blog posts already linked: ${stats.already_linked || 0}`);
console.log(`Missing files:                        ${stats.missing || 0}`);
console.log(`No injection point found:             ${stats.no_injection_point || 0}`);
console.log('\n✅ PT blog backlink injection complete.\n');
