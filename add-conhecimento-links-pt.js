#!/usr/bin/env node
/**
 * add-conhecimento-links-pt.js
 *
 * Adds contextual inline links from PT city pages (pt/cidades/*.html) and
 * PT species pages (pt/especies/*\/index.html) to relevant /pt/conhecimento/ sections.
 *
 * Strategy (same as add-conocimiento-links-cities-species.js):
 *  - Skip if file already links to that conhecimento slug
 *  - Try to wrap the first trigger-term found in a <p>
 *  - Fallback: append a "Consulte também" sentence to the last <p> in the body
 *  - Max 1 link per conhecimento section per file
 */

const fs   = require('fs');
const path = require('path');

function readFile(p)       { return fs.readFileSync(p, 'utf8'); }
function writeFile(p, txt) { fs.writeFileSync(p, txt, 'utf8'); }

// ─── Body bounds for PT city pages ───────────────────────────────────────────
function getCityBodyBounds(html) {
  const start = html.indexOf('<div class="content"');
  if (start === -1) return null;

  const candidates = [
    html.indexOf('<!-- MESH-LINKS-START'),
    html.indexOf('<div class="cta-box"'),
    html.indexOf('<footer'),
  ].filter(i => i !== -1 && i > start);
  if (!candidates.length) return null;
  return { start, end: Math.min(...candidates) };
}

// ─── Body bounds for PT species pages ────────────────────────────────────────
function getSpeciesBodyBounds(html) {
  // Prefer the narrative article-body section
  let start = html.indexOf('<div class="article-body"');
  if (start === -1) {
    start = html.indexOf('<section class="sections"');
  }
  if (start === -1) return null;

  const candidates = [
    html.indexOf('<div class="fit-card"'),
    html.indexOf('<section class="gallery-section"'),
    html.indexOf('<section class="faq-section"'),
    html.indexOf('<section class="related-section"'),
    html.indexOf('<div class="final-cta"'),
    html.indexOf('<footer'),
  ].filter(i => i !== -1 && i > start);
  if (!candidates.length) return null;
  return { start, end: Math.min(...candidates) };
}

// ─── Link a term inside the first matching <p> ────────────────────────────────
function linkTermInBody(body, terms, slug) {
  let injected = false;
  const newBody = body.replace(/<p[^>]*>[\s\S]*?<\/p>/gi, (pBlock) => {
    if (injected) return pBlock;
    const pLower = pBlock.toLowerCase();
    for (const term of terms) {
      if (!pLower.includes(term.toLowerCase())) continue;
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(
        `(^|[^a-zA-ZáéíóúàâãêôõüçÁÉÍÓÚÀÂÃÊÔÕÜÇ])(${escaped})(?=[^a-zA-ZáéíóúàâãêôõüçÁÉÍÓÚÀÂÃÊÔÕÜÇ]|$)`,
        'i'
      );
      const parts = pBlock.split(/(<a[\s\S]*?<\/a>)/i);
      let replaced = false;
      const out = parts.map((part, i) => {
        if (i % 2 === 1 || replaced) return part;
        const newPart = part.replace(re, (m, pre, match) => {
          replaced = true;
          return `${pre}<a href="${slug}">${match}</a>`;
        });
        return newPart;
      });
      if (replaced) {
        injected = true;
        return out.join('');
      }
    }
    return pBlock;
  });
  return injected ? newBody : null;
}

// ─── Fallback: append a "Consulte também" sentence to the last <p> ───────────
function appendConsulteTambem(body, slug, label) {
  const lastP = body.lastIndexOf('</p>');
  if (lastP === -1) return null;
  const sentence = ` Consulte também o nosso <a href="${slug}">${label}</a>.`;
  return body.slice(0, lastP) + sentence + body.slice(lastP);
}

// ─── Generic apply function ───────────────────────────────────────────────────
function applyLinks(filePath, rules, getBounds) {
  if (!fs.existsSync(filePath)) return 0;
  let html = readFile(filePath);
  let changed = false;
  let linksAdded = 0;

  for (const { slug, label, terms } of rules) {
    // Skip if already links to this section
    if (html.includes(`href="${slug}"`)) continue;

    const bounds = getBounds(html);
    if (!bounds) continue;
    const { start, end } = bounds;
    let body = html.slice(start, end);

    let newBody = linkTermInBody(body, terms, slug);
    if (!newBody) {
      newBody = appendConsulteTambem(body, slug, label);
    }

    if (newBody && newBody !== body) {
      html = html.slice(0, start) + newBody + html.slice(end);
      changed = true;
      linksAdded++;
      console.log(`   ✓ ${filePath} → ${slug}`);
    }
  }

  if (changed) writeFile(filePath, html);
  return linksAdded;
}

// ─── CITY PAGE RULES ─────────────────────────────────────────────────────────
// Applied to all pt/cidades/*.html files
const CITY_RULES = [
  {
    slug: '/pt/conhecimento/comprar/',
    label: 'guia para comprar um papagaio',
    terms: ['comprar', 'criador', 'adquirir', 'compra', 'vendedor', 'adoptar', 'adopção', 'adoção'],
  },
  {
    slug: '/pt/conhecimento/documentacao-cites/',
    label: 'documentação CITES e quadro legal',
    terms: ['CITES', 'documentação', 'documentacao', 'legal', 'certificado', 'legalidade', 'ICNF'],
  },
  {
    slug: '/pt/conhecimento/saude/',
    label: 'guia de saúde aviária',
    terms: ['veterinário', 'veterinario', 'saúde', 'saude', 'clínica', 'clinica', 'revisão', 'consulta'],
  },
  {
    slug: '/pt/conhecimento/instalacoes/',
    label: 'guia de instalações para papagaios',
    terms: ['gaiola', 'instalações', 'instalacoes', 'espaço', 'espaco', 'habitação', 'poleiro'],
  },
  {
    slug: '/pt/conhecimento/guias-iniciantes/',
    label: 'guia para novos proprietários de papagaios',
    terms: ['iniciante', 'principiante', 'primeiro papagaio', 'primeira vez', 'novo proprietário', 'novo proprietario'],
  },
];

// ─── SPECIES PAGE RULES ───────────────────────────────────────────────────────
// Applied to all pt/especies/*/index.html files
const SPECIES_RULES = [
  {
    slug: '/pt/conhecimento/nutricao/',
    label: 'guia de nutrição para papagaios',
    terms: ['alimentação', 'alimentacao', 'dieta', 'nutrição', 'nutricao', 'pellets', 'verduras', 'frutas', 'aliment'],
  },
  {
    slug: '/pt/conhecimento/saude/',
    label: 'guia de saúde aviária',
    terms: ['veterinário', 'veterinario', 'saúde', 'saude', 'doença', 'doenca', 'revisão', 'consulta'],
  },
  {
    slug: '/pt/conhecimento/comportamento/',
    label: 'guia de comportamento de papagaios',
    terms: ['comportamento', 'socialização', 'socializacao', 'linguagem corporal', 'carácter', 'caracter', 'personalidade', 'temperamento'],
  },
  {
    slug: '/pt/conhecimento/adestramento/',
    label: 'guia de adestramento de papagaios',
    terms: ['adestramento', 'treino', 'treinar', 'trucos', 'aprender', 'ensinar'],
  },
  {
    slug: '/pt/conhecimento/instalacoes/',
    label: 'guia de instalações para papagaios',
    terms: ['gaiola', 'instalações', 'instalacoes', 'espaço', 'espaco', 'poleiros', 'voo livre'],
  },
  {
    slug: '/pt/conhecimento/documentacao-cites/',
    label: 'documentação CITES e quadro legal',
    terms: ['CITES', 'documentação', 'documentacao', 'legal', 'certificado', 'papéis', 'papeis', 'Apêndice', 'Apendice'],
  },
  {
    slug: '/pt/conhecimento/comprar/',
    label: 'guia para comprar um papagaio',
    terms: ['comprar', 'adoptar', 'adotar', 'criador', 'adquirir'],
  },
  {
    slug: '/pt/conhecimento/acessorios/',
    label: 'guia de acessórios para papagaios',
    terms: ['brinquedos', 'acessórios', 'acessorios', 'poleiros', 'comedeiro', 'comedouro'],
  },
  {
    slug: '/pt/conhecimento/guias-iniciantes/',
    label: 'guia para novos proprietários de papagaios',
    terms: ['iniciante', 'principiante', 'primeiro papagaio', 'primeira vez', 'não recomendado', 'experiência prévia', 'experiencia previa'],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('\n🔗 add-conhecimento-links-pt — linking to /pt/conhecimento/ sections\n');

let totalUpdated = 0;

// ── PT City pages ─────────────────────────────────────────────────────────────
const cityDir = 'pt/cidades';
if (fs.existsSync(cityDir)) {
  console.log('📍 Processing PT city pages (pt/cidades/)…\n');
  const cityFiles = fs.readdirSync(cityDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => `${cityDir}/${d.name}/index.html`)
    .concat(
      fs.readdirSync(cityDir)
        .filter(f => f.endsWith('.html') && f !== 'index.html')
        .map(f => `${cityDir}/${f}`)
    );

  for (const filePath of cityFiles) {
    const added = applyLinks(filePath, CITY_RULES, getCityBodyBounds);
    if (added > 0) totalUpdated += added;
  }
}

// ── PT Species pages ──────────────────────────────────────────────────────────
const especiesDir = 'pt/especies';
if (fs.existsSync(especiesDir)) {
  console.log('\n🦜 Processing PT species pages (pt/especies/)…\n');
  const speciesDirs = fs.readdirSync(especiesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => `${especiesDir}/${d.name}/index.html`);

  for (const filePath of speciesDirs) {
    const added = applyLinks(filePath, SPECIES_RULES, getSpeciesBodyBounds);
    if (added > 0) totalUpdated += added;
  }
}

console.log(`\n✅ Done. ${totalUpdated} links added across PT city and species pages.\n`);
