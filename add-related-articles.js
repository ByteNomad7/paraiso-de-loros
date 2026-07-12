#!/usr/bin/env node
/**
 * Phase 4 — Add Related Articles blocks to all FR blog posts
 * Injects before </body> in each blog post
 */
const fs = require('fs');
const path = require('path');

// ─── DATA: per-article related content ───────────────────────────────────────

const ARTICLES = [
  {
    slug: 'prix-perroquet-france',
    category: 'Prix & Tarifs',
    categorySlug: 'prix',
    related: [
      { slug: 'quel-perroquet-choisir',         title: "Quel Perroquet Choisir ?",                icon: '🤔', time: '12 min' },
      { slug: 'choisir-eleveur-serieux',         title: "Comment Choisir un Éleveur Sérieux",      icon: '✅', time: '7 min'  },
      { slug: 'guide-cites-france',              title: "CITES en France : Documents Obligatoires", icon: '📋', time: '8 min'  }
    ],
    species: [
      { slug: 'ara-hyacinthe',         name: 'Ara Hyacinthe' },
      { slug: 'perroquet-gris-du-gabon', name: 'Perroquet Gris du Gabon' }
    ],
    city: { slug: 'paris', name: 'Paris' }
  },
  {
    slug: 'alimentation-perroquets',
    category: 'Alimentation',
    categorySlug: 'alimentation',
    related: [
      { slug: 'combien-vit-perroquet',           title: "Combien de Temps Vit un Perroquet ?",     icon: '❤️', time: '10 min' },
      { slug: 'preparer-maison-perroquet',       title: "Préparer sa Maison avant l'Arrivée",      icon: '🏡', time: '9 min'  },
      { slug: 'meilleurs-perroquets-debutants',  title: "Meilleurs Perroquets pour Débutants",     icon: '🐦', time: '11 min' }
    ],
    species: [
      { slug: 'perroquet-gris-du-gabon', name: 'Perroquet Gris du Gabon' },
      { slug: 'amazone-front-bleu',      name: 'Amazone à Front Bleu' }
    ],
    city: { slug: 'lyon', name: 'Lyon' }
  },
  {
    slug: 'ara-hyacinthe-guide',
    category: 'Fiches Espèces',
    categorySlug: 'especes',
    related: [
      { slug: 'prix-perroquet-france',           title: "Prix d'un Perroquet en France 2026",      icon: '💰', time: '10 min' },
      { slug: 'guide-cites-france',              title: "CITES en France : Documents Obligatoires", icon: '📋', time: '8 min'  },
      { slug: 'choisir-eleveur-serieux',         title: "Comment Choisir un Éleveur Sérieux",      icon: '✅', time: '7 min'  }
    ],
    species: [
      { slug: 'ara-hyacinthe',      name: 'Ara Hyacinthe' },
      { slug: 'ara-bleu-et-jaune',  name: 'Ara Bleu et Jaune' }
    ],
    city: { slug: 'marseille', name: 'Marseille' }
  },
  {
    slug: 'eclectus-guide',
    category: 'Fiches Espèces',
    categorySlug: 'especes',
    related: [
      { slug: 'perroquet-gris-du-gabon-guide',   title: "Perroquet Gris du Gabon : Guide Ultime",  icon: '🦜', time: '14 min' },
      { slug: 'alimentation-perroquets',         title: "Alimentation des Perroquets",             icon: '🌿', time: '12 min' },
      { slug: 'combien-vit-perroquet',           title: "Combien de Temps Vit un Perroquet ?",     icon: '❤️', time: '10 min' }
    ],
    species: [
      { slug: 'eclectus',              name: 'Perroquet Éclectus' },
      { slug: 'perroquet-du-senegal',  name: 'Perroquet du Sénégal' }
    ],
    city: { slug: 'bordeaux', name: 'Bordeaux' }
  },
  {
    slug: 'perroquet-gris-du-gabon-guide',
    category: 'Fiches Espèces',
    categorySlug: 'especes',
    related: [
      { slug: 'alimentation-perroquets',         title: "Alimentation des Perroquets",             icon: '🌿', time: '12 min' },
      { slug: 'prix-perroquet-france',           title: "Prix d'un Perroquet en France 2026",      icon: '💰', time: '10 min' },
      { slug: 'combien-vit-perroquet',           title: "Combien de Temps Vit un Perroquet ?",     icon: '❤️', time: '10 min' }
    ],
    species: [
      { slug: 'perroquet-gris-du-gabon', name: 'Perroquet Gris du Gabon' },
      { slug: 'amazone-nuque-jaune',     name: 'Amazone à Nuque Jaune' }
    ],
    city: { slug: 'toulouse', name: 'Toulouse' }
  },
  {
    slug: 'guide-cites-france',
    category: 'CITES & Légalité',
    categorySlug: 'cites',
    related: [
      { slug: 'prix-perroquet-france',           title: "Prix d'un Perroquet en France 2026",      icon: '💰', time: '10 min' },
      { slug: 'choisir-eleveur-serieux',         title: "Comment Choisir un Éleveur Sérieux",      icon: '✅', time: '7 min'  },
      { slug: 'quel-perroquet-choisir',          title: "Quel Perroquet Choisir ?",                icon: '🤔', time: '12 min' }
    ],
    species: [
      { slug: 'ara-hyacinthe',         name: 'Ara Hyacinthe' },
      { slug: 'cacatoes-huppe-jaune',  name: 'Cacatoès à Huppe Jaune' }
    ],
    city: { slug: 'strasbourg', name: 'Strasbourg' }
  },
  {
    slug: 'meilleurs-perroquets-debutants',
    category: 'Comportement & Éducation',
    categorySlug: 'comportement',
    related: [
      { slug: 'quel-perroquet-choisir',          title: "Quel Perroquet Choisir ?",                icon: '🤔', time: '12 min' },
      { slug: 'preparer-maison-perroquet',       title: "Préparer sa Maison avant l'Arrivée",      icon: '🏡', time: '9 min'  },
      { slug: 'alimentation-perroquets',         title: "Alimentation des Perroquets",             icon: '🌿', time: '12 min' }
    ],
    species: [
      { slug: 'perroquet-du-senegal',  name: 'Perroquet du Sénégal' },
      { slug: 'conure-soleil',         name: 'Conure Soleil' }
    ],
    city: { slug: 'nantes', name: 'Nantes' }
  },
  {
    slug: 'preparer-maison-perroquet',
    category: 'Comportement & Éducation',
    categorySlug: 'comportement',
    related: [
      { slug: 'meilleurs-perroquets-debutants',  title: "Meilleurs Perroquets pour Débutants",     icon: '🐦', time: '11 min' },
      { slug: 'alimentation-perroquets',         title: "Alimentation des Perroquets",             icon: '🌿', time: '12 min' },
      { slug: 'choisir-eleveur-serieux',         title: "Comment Choisir un Éleveur Sérieux",      icon: '✅', time: '7 min'  }
    ],
    species: [
      { slug: 'conure-jenday',  name: 'Conure Jenday' },
      { slug: 'caique',         name: 'Caïque à Tête Noire' }
    ],
    city: { slug: 'nice', name: 'Nice' }
  },
  {
    slug: 'choisir-eleveur-serieux',
    category: "Guide d'Adoption",
    categorySlug: 'adoption',
    related: [
      { slug: 'quel-perroquet-choisir',          title: "Quel Perroquet Choisir ?",                icon: '🤔', time: '12 min' },
      { slug: 'guide-cites-france',              title: "CITES en France : Documents Obligatoires", icon: '📋', time: '8 min'  },
      { slug: 'prix-perroquet-france',           title: "Prix d'un Perroquet en France 2026",      icon: '💰', time: '10 min' }
    ],
    species: [
      { slug: 'ara-macao',        name: 'Ara Macao' },
      { slug: 'cacatoes-rosalbin', name: 'Cacatoès Rosalbin' }
    ],
    city: { slug: 'perpignan', name: 'Perpignan' }
  },
  {
    slug: 'combien-vit-perroquet',
    category: 'Santé & Longévité',
    categorySlug: 'sante',
    related: [
      { slug: 'alimentation-perroquets',         title: "Alimentation des Perroquets",             icon: '🌿', time: '12 min' },
      { slug: 'preparer-maison-perroquet',       title: "Préparer sa Maison avant l'Arrivée",      icon: '🏡', time: '9 min'  },
      { slug: 'perroquet-gris-du-gabon-guide',   title: "Perroquet Gris du Gabon : Guide Ultime",  icon: '🦜', time: '14 min' }
    ],
    species: [
      { slug: 'ara-bleu-et-jaune',   name: 'Ara Bleu et Jaune' },
      { slug: 'amazone-front-bleu',  name: 'Amazone à Front Bleu' }
    ],
    city: { slug: 'grenoble', name: 'Grenoble' }
  },
  {
    slug: 'quel-perroquet-choisir',
    category: "Guide d'Adoption",
    categorySlug: 'adoption',
    related: [
      { slug: 'meilleurs-perroquets-debutants',  title: "Meilleurs Perroquets pour Débutants",     icon: '🐦', time: '11 min' },
      { slug: 'prix-perroquet-france',           title: "Prix d'un Perroquet en France 2026",      icon: '💰', time: '10 min' },
      { slug: 'choisir-eleveur-serieux',         title: "Comment Choisir un Éleveur Sérieux",      icon: '✅', time: '7 min'  }
    ],
    species: [
      { slug: 'perroquet-pionus',       name: 'Perroquet Pionus' },
      { slug: 'loriquet-arc-en-ciel',   name: 'Loriquet Arc-en-Ciel' }
    ],
    city: { slug: 'lille', name: 'Lille' }
  }
];

// ─── BLOCK TEMPLATE ──────────────────────────────────────────────────────────

function buildBlock(article) {
  const relCards = article.related.map(r => `
      <a href="https://www.paraisodeaves.com/fr/blog/${r.slug}/" class="ra-card">
        <div class="ra-icon">${r.icon}</div>
        <div class="ra-body">
          <div class="ra-title">${r.title}</div>
          <div class="ra-meta">⏱ ${r.time} de lecture</div>
        </div>
        <div class="ra-arrow">→</div>
      </a>`).join('');

  const speciesLinks = article.species.map(s =>
    `<a href="https://www.paraisodeaves.com/fr/especies/${s.slug}/" class="ra-chip">${s.name}</a>`
  ).join('\n        ');

  return `
<!-- ═══ RELATED ARTICLES BLOCK — injected by Phase 4 ═══ -->
<section class="related-articles-section" aria-label="Articles recommandés">
  <style>
    .related-articles-section{background:#F8F5F0;border-top:3px solid #D4A94F;padding:56px 5%;font-family:'Open Sans',sans-serif;}
    .ra-inner{max-width:1200px;margin:0 auto;}
    .ra-heading{font-family:'Poppins',sans-serif;font-size:1.45rem;font-weight:700;color:#1F3D2B;margin-bottom:8px;}
    .ra-sub{font-size:.9rem;color:#5C5C5C;margin-bottom:28px;}
    .ra-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:36px;}
    .ra-card{background:#fff;border:1px solid #E7E0D2;border-radius:12px;padding:18px 20px;display:flex;align-items:center;gap:14px;text-decoration:none;color:inherit;transition:all .2s;}
    .ra-card:hover{box-shadow:0 4px 20px rgba(0,0,0,.1);border-color:#D4A94F;transform:translateY(-2px);}
    .ra-icon{font-size:1.6rem;flex-shrink:0;}
    .ra-body{flex:1;}
    .ra-title{font-family:'Poppins',sans-serif;font-size:.92rem;font-weight:700;color:#1F3D2B;line-height:1.35;}
    .ra-meta{font-size:.78rem;color:#5C5C5C;margin-top:3px;}
    .ra-arrow{color:#D4A94F;font-size:1.1rem;flex-shrink:0;}
    .ra-divider{border:none;border-top:1px solid #E7E0D2;margin:28px 0;}
    .ra-links-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center;}
    .ra-chips-label{font-family:'Poppins',sans-serif;font-size:.8rem;font-weight:700;color:#1F3D2B;margin-right:4px;}
    .ra-chip{background:#1F3D2B;color:#fff;padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;text-decoration:none;transition:background .2s;}
    .ra-chip:hover{background:#D4A94F;color:#1F3D2B;}
    .ra-chip.city{background:transparent;border:2px solid #1F3D2B;color:#1F3D2B;}
    .ra-chip.city:hover{background:#1F3D2B;color:#fff;}
    .ra-chip.gold{background:#D4A94F;color:#1F3D2B;}
    .ra-chip.gold:hover{background:#E0B75F;color:#1F3D2B;}
    .ra-cat-link{font-size:.82rem;color:#1F3D2B;font-weight:600;text-decoration:none;border-bottom:1px dashed #D4A94F;padding-bottom:1px;}
    .ra-cat-link:hover{color:#D4A94F;}
    @media(max-width:600px){.ra-cards{grid-template-columns:1fr;}}
  </style>
  <div class="ra-inner">
    <div class="ra-heading">📚 Articles recommandés</div>
    <div class="ra-sub">Approfondir vos connaissances sur les perroquets exotiques en France</div>
    <div class="ra-cards">
      ${relCards}
    </div>
    <hr class="ra-divider"/>
    <div class="ra-links-row">
      <span class="ra-chips-label">🦜 Fiches espèces :</span>
      ${speciesLinks}
      <a href="https://www.paraisodeaves.com/fr/perroquets-a-vendre-${article.city.slug}/" class="ra-chip city">📍 Perroquets à ${article.city.name}</a>
      <a href="https://www.paraisodeaves.com/fr/perroquets-disponibles/" class="ra-chip gold">Oiseaux disponibles</a>
      <a href="https://www.paraisodeaves.com/fr/adopter-perroquet/" class="ra-chip">Adopter</a>
      <a href="https://www.paraisodeaves.com/fr/contact/" class="ra-chip">Contact</a>
      <a href="https://www.paraisodeaves.com/fr/connaissances/" class="ra-chip">Centre de connaissances</a>
    </div>
    <hr class="ra-divider"/>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
      <span style="font-size:.82rem;color:#5C5C5C;">Catégorie : <a href="https://www.paraisodeaves.com/fr/connaissances/${article.categorySlug}/" class="ra-cat-link">${article.category}</a></span>
      <a href="https://www.paraisodeaves.com/fr/blog/" style="font-size:.82rem;color:#1F3D2B;font-weight:600;text-decoration:none;">← Retour au blog</a>
    </div>
  </div>
</section>
<!-- ═══ END RELATED ARTICLES BLOCK ═══ -->`;
}

// ─── INJECT ──────────────────────────────────────────────────────────────────

let injected = 0;
let skipped = 0;

for (const article of ARTICLES) {
  const filePath = path.join('fr', 'blog', article.slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ File not found: ${filePath}`);
    skipped++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected
  if (html.includes('related-articles-section')) {
    console.log(`⏭ Already has related articles block: ${article.slug}`);
    skipped++;
    continue;
  }

  const block = buildBlock(article);
  html = html.replace('</body>', block + '\n</body>');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Injected into fr/blog/${article.slug}/`);
  injected++;
}

console.log(`\n✅ Related articles: ${injected} injected, ${skipped} skipped`);
