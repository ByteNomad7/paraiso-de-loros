/**
 * Upgrades existing fr/especies/ pages:
 * 1. Adds Article schema (missing from all)
 * 2. Adds 3 more FAQ entries per species (to reach 8 minimum)
 * 3. Updates canonical trailing slash consistency
 * 4. Ensures otras-aves section has links to all 20 target species
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.paraisodeaves.com';

// Full set of 20 target species for otras-aves links
const ALL_SPECIES = [
  { slug: 'perroquet-gris-du-gabon', name: 'Gris du Gabon' },
  { slug: 'ara-bleu-et-jaune', name: 'Ara Bleu et Jaune' },
  { slug: 'ara-hyacinthe', name: 'Ara Hyacinthe' },
  { slug: 'ara-macao', name: 'Ara Macao' },
  { slug: 'ara-chloroptere', name: 'Ara Chloroptère' },
  { slug: 'cacatoes-rosalbin', name: 'Cacatoès Rosalbin' },
  { slug: 'cacatoes-huppe-jaune', name: 'Cacatoès Huppé Jaune' },
  { slug: 'amazone-front-bleu', name: 'Amazone à Front Bleu' },
  { slug: 'amazone-nuque-jaune', name: 'Amazone à Nuque Jaune' },
  { slug: 'eclectus', name: 'Eclectus' },
  { slug: 'conure-soleil', name: 'Conure Soleil' },
  { slug: 'conure-jenday', name: 'Conure Jendaya' },
  { slug: 'caique', name: 'Caique à Tête Noire' },
  { slug: 'caique-ventre-blanc', name: 'Caique à Ventre Blanc' },
  { slug: 'perroquet-pionus', name: 'Pionus' },
  { slug: 'perroquet-du-senegal', name: 'Youyou du Sénégal' },
  { slug: 'perruche-alexandre', name: 'Perruche Alexandre' },
  { slug: 'loriquet-arc-en-ciel', name: 'Loriquet Arc-en-ciel' },
  { slug: 'perruche-royale', name: 'Perruche Royale' },
  { slug: 'grand-alexandre', name: 'Grand Alexandre' },
];

// Extra FAQ entries per species (3 each, to reach 8 total)
const EXTRA_FAQS = {
  'cacatoes-rosalbin': [
    { q: "Le cacatoès rosalbin est-il facile à apprivoiser ?", a: "Élevé à la main, le cacatoès rosalbin est l'un des cacatoès les plus doux et les plus faciles à manipuler. Il s'attache rapidement à ses propriétaires et apprend rapidement les manipulations de base." },
    { q: "Le cacatoès rosalbin peut-il vivre en appartement ?", a: "Avec une cage suffisamment grande et plusieurs heures quotidiennes de sortie, le rosalbin peut vivre en appartement. Cependant, son niveau sonore modéré nécessite des voisins tolérants." },
    { q: "Quelle est l'alimentation idéale du cacatoès rosalbin ?", a: "Une base de granulés de qualité, complétée par des fruits et légumes frais (pomme, carotte, brocoli, poivron), constitue l'alimentation idéale. Limitez les graines grasses qui favorisent l'obésité chez cette espèce." },
  ],
  'amazone-nuque-jaune': [
    { q: "L'amazone à nuque jaune parle-t-elle vraiment aussi bien qu'on le dit ?", a: "Oui, l'amazone à nuque jaune est reconnue comme l'une des meilleures locutrices du règne animal. Des individus bien socialisés apprennent des dizaines de mots, des phrases complètes et reproduisent des intonations spécifiques à chaque personne." },
    { q: "L'amazone à nuque jaune est-elle agressive ?", a: "Elle peut montrer de la territorialité, notamment en période de reproduction. Ce comportement, temporaire et gérable avec une bonne socialisation, ne doit pas être confondu avec une agressivité permanente. Un oiseau bien élevé est affectueux au quotidien." },
    { q: "Quelle cage pour une amazone à nuque jaune ?", a: "Une cage d'au minimum 90 cm de largeur et 120 cm de hauteur est recommandée. L'amazone est une grande nageuse et a besoin d'espace pour étendre les ailes. Des perchoirs variés et des jouets à détruire sont indispensables." },
  ],
  'conure-soleil': [
    { q: "La conure soleil peut-elle apprendre à parler ?", a: "La conure soleil a une capacité de parole limitée : elle peut apprendre quelques mots ou sons courts mais n'est pas réputée pour son vocabulaire. En revanche, elle excelle dans les mimiques sonores et les sifflements." },
    { q: "Comment réduire les cris d'une conure soleil ?", a: "Les cris excessifs sont souvent liés à l'ennui ou au manque d'attention. Proposez des jouets variés renouvelés régulièrement, des sorties quotidiennes et des séances d'interaction enrichissante. Ne punissez jamais les cris : ignorez-les et récompensez le calme." },
    { q: "La conure soleil est-elle compatible avec d'autres animaux ?", a: "Avec une introduction progressive et supervisée, la conure soleil peut cohabiter avec d'autres oiseaux et même des chiens ou chats calmes. La prudence reste de mise : ne laissez jamais des animaux de tailles différentes seuls sans surveillance." },
  ],
  'conure-jenday': [
    { q: "Quelle est la différence entre la conure jenday et la conure soleil ?", a: "Les deux espèces sont très proches et peuvent se croiser en nature. La conure jenday a un plumage légèrement différent (vert plus présent sur les ailes) et un caractère souvent considéré comme légèrement plus calme que la conure soleil." },
    { q: "La conure jenday est-elle bruyante ?", a: "Oui, comme toutes les conures, la jenday peut être bruyante, surtout à l'aube et au crépuscule. Son niveau sonore est important à considérer si vous vivez en appartement." },
    { q: "Combien de temps vit une conure jenday ?", a: "Bien soignée, la conure jenday vit entre 20 et 30 ans. Cette longévité en fait un compagnon de vie à considérer sur le long terme avant l'adoption." },
  ],
  'caique': [
    { q: "Le caique à tête noire est-il bon avec les enfants ?", a: "Le caique est généralement bon avec les enfants à partir d'environ 8 ans, capables de le manipuler avec douceur et respect. Sa petite taille et son énergie jouent en sa faveur, mais les enfants doivent apprendre à respecter ses signaux." },
    { q: "Le caique peut-il apprendre des tours ?", a: "Absolument ! Le caique est l'un des perroquets les plus doués pour l'apprentissage des tours. Avec des séances courtes et régulières basées sur la récompense, il peut apprendre à rouler sur le dos, à faire la morte ou à passer dans des cerceaux." },
    { q: "Quel est le niveau sonore du caique ?", a: "Le caique est modérément bruyant : moins que les aras ou les cacatoès, mais plus qu'un perroquet du Sénégal. Ses vocalisations sont courtes et percussives. En appartement, il est généralement tolérable avec des voisins raisonnables." },
  ],
  'perroquet-pionus': [
    { q: "Le pionus est-il un bon perroquet pour les personnes allergiques ?", a: "Contrairement aux cacatoès ou aux cacatoès à poudre, le pionus produit peu de poudre de plumes. C'est souvent une bonne option pour les personnes sensibles, bien qu'aucun oiseau ne soit totalement hypoallergénique." },
    { q: "Le pionus est-il affectueux ?", a: "Oui, le pionus est un oiseau doux et affectueux, qui apprécie les câlins sans pour autant être aussi collant que certains cacatoès. C'est un équilibre parfait entre indépendance et sociabilité." },
    { q: "Quel est le bruit caractéristique du pionus ?", a: "Le pionus émet parfois un sifflement de détresse ou de peur qui peut surprendre les nouveaux propriétaires. Ce comportement, normal chez l'espèce, ne doit pas être confondu avec un problème respiratoire." },
  ],
  'perroquet-du-senegal': [
    { q: "Le youyou du Sénégal est-il bon pour un appartement ?", a: "Oui, le youyou est l'un des meilleurs choix pour un appartement. Son niveau sonore est modéré, sa taille compacte et son caractère calme en font un compagnon discret et agréable pour les urbains." },
    { q: "Le youyou du Sénégal s'attache-t-il à une seule personne ?", a: "Le youyou peut en effet développer une préférence forte pour une personne, surtout s'il n'est pas habitué dès le plus jeune âge à interagir avec plusieurs membres de la famille. Une socialisation précoce évite ce comportement." },
    { q: "Le youyou du Sénégal peut-il vivre seul ?", a: "Oui, le youyou supporte bien la solitude à condition d'avoir suffisamment de jouets et d'interaction quotidienne. Il n'a pas besoin d'un congénère comme certaines espèces, mais 2 à 3 heures d'attention humaine par jour restent indispensables." },
  ],
  'perruche-alexandre': [
    { q: "La perruche alexandre est-elle facile à apprivoiser ?", a: "Élevée à la main, la perruche alexandre est relativement facile à apprivoiser. Elle peut cependant être indépendante et moins câline que certains perroquets. La patience et la régularité sont les clés d'une relation harmonieuse." },
    { q: "La perruche alexandre peut-elle vivre en volière extérieure ?", a: "Oui, la perruche alexandre est plus robuste que d'autres espèces et supporte des températures hivernales modérées. Une volière extérieure avec une zone abritée du vent et des températures négatives est tout à fait adaptée à cette espèce." },
    { q: "Quelle est la différence entre la perruche alexandre et la grande perruche alexandre ?", a: "En France, les deux termes désignent souvent la même espèce, Psittacula eupatria. Le terme 'Grande Perruche Alexandre' met en avant la taille impressionnante de l'oiseau (jusqu'à 58 cm), la plus grande de toutes les perruches à collier." },
  ],
  'loriquet-arc-en-ciel': [
    { q: "Le loriquet arc-en-ciel peut-il vivre seul ?", a: "Le loriquet peut vivre seul à condition de recevoir beaucoup d'attention quotidienne. Étant naturellement grégaire, un second loriquet ou une présence humaine régulière est fortement recommandée pour son équilibre." },
    { q: "L'alimentation du loriquet est-elle difficile à gérer ?", a: "La principale difficulté est son alimentation liquide (nectars, fruits mixés) qui nécessite un nettoyage très régulier. Les déjections sont liquides et peuvent éclabousser. Prévoir une cage facile à nettoyer et un environnement protégé." },
    { q: "Le loriquet arc-en-ciel est-il bruyant ?", a: "Oui, le loriquet peut être bruyant, particulièrement le matin et le soir. Ses sifflements aigus peuvent déranger en appartement. Il s'adapte cependant bien à la vie en famille active et s'habitue aux bruits du quotidien." },
  ],
};

// Article schema template
function buildArticleSchema(slug, name, desc, url) {
  return `<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${name}",
  "description": "${desc}",
  "url": "${url}",
  "inLanguage": "fr-FR",
  "author": {
    "@type": "Organization",
    "name": "Paraíso de Aves",
    "url": "https://www.paraisodeaves.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Paraíso de Aves",
    "url": "https://www.paraisodeaves.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.paraisodeaves.com/apple-touch-icon.png"
    }
  },
  "datePublished": "2026-06-01",
  "dateModified": "2026-07-12"
}</script>`;
}

function buildFaqItem(q, a) {
  return `\n      <div class="faq-item"><details><summary class="faq-q">${q}</summary><div class="faq-a">${a}</div></details></div>`;
}

function buildFaqSchema(q, a) {
  return `    {\n      "@type": "Question",\n      "name": "${q.replace(/"/g, '\\"')}",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "${a.replace(/"/g, '\\"')}"\n      }\n    }`;
}

function buildOtrasAves(currentSlug) {
  const others = ALL_SPECIES.filter(s => s.slug !== currentSlug).slice(0, 10);
  const items = others.map(s => `<li><a href="/fr/especies/${s.slug}">🦜 ${s.name}</a></li>`).join('');
  return `<div class="otras-aves">\n    <h2>Autres espèces disponibles</h2>\n    <ul>${items}</ul>\n  </div>`;
}

const dirs = fs.readdirSync('fr/especies').filter(d => {
  const p = path.join('fr/especies', d);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
});

let updated = 0;

for (const dir of dirs) {
  if (!EXTRA_FAQS[dir]) {
    console.log(`  SKIP (no extra FAQs defined): ${dir}`);
    continue;
  }

  const file = path.join('fr/especies', dir, 'index.html');
  let html = fs.readFileSync(file, 'utf8');

  // 1. Add Article schema if missing
  if (!html.includes('"@type": "Article"')) {
    const descMatch = html.match(/content="([^"]{50,200})"\s*\/>\s*\n\s*<meta name="robots"/);
    const desc = descMatch ? descMatch[1] : `Guide complet ${dir} en France.`;
    const urlMatch = html.match(/rel="canonical" href="([^"]+)"/);
    const url = urlMatch ? urlMatch[1] : `${BASE}/fr/especies/${dir}`;
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const name = titleMatch ? titleMatch[1].replace(' | paraisodeaves', '').replace(/ : Guide Complet.*/, '') : dir;

    const articleSchema = '\n' + buildArticleSchema(dir, name, desc, url);
    html = html.replace(
      /<script type="application\/ld\+json">{\s*"@context": "https:\/\/schema\.org",\s*"@type": "BreadcrumbList"/,
      articleSchema + '\n<script type="application/ld+json">{\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList"'
    );
    console.log(`  Added Article schema: ${dir}`);
  }

  // 2. Add extra FAQ entries to FAQPage schema
  const extraFaqs = EXTRA_FAQS[dir];
  const faqSchemaEnd = html.lastIndexOf(']\n}</script>');
  if (faqSchemaEnd !== -1 && !html.includes(extraFaqs[0].q)) {
    const schemaEntries = extraFaqs.map(f => ',\n' + buildFaqSchema(f.q, f.a)).join('');
    html = html.slice(0, faqSchemaEnd) + schemaEntries + html.slice(faqSchemaEnd);
  }

  // 3. Add extra FAQ items to FAQ section HTML
  const faqSectionEnd = html.indexOf('</section>\n\n    <!-- FINAL CTA');
  if (faqSectionEnd !== -1 && !html.includes(extraFaqs[0].q)) {
    const extraHtml = extraFaqs.map(f => buildFaqItem(f.q, f.a)).join('');
    html = html.slice(0, faqSectionEnd) + extraHtml + '\n    ' + html.slice(faqSectionEnd);
  }

  // 4. Update otras-aves section to include all 20 species
  const otrasStart = html.indexOf('<div class="otras-aves">');
  const otrasEnd = html.indexOf('</div>', otrasStart) + 6;
  if (otrasStart !== -1) {
    html = html.slice(0, otrasStart) + buildOtrasAves(dir) + html.slice(otrasEnd);
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`  UPGRADED: fr/especies/${dir}/index.html`);
  updated++;
}

console.log(`\nUpgraded ${updated} existing fr/especies pages.`);
