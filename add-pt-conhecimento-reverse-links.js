#!/usr/bin/env node
/**
 * add-pt-conhecimento-reverse-links.js
 * Injects species and city reverse-link sections into each PT /pt/conhecimento/ sub-page.
 * Pattern mirrors the sections already added to /conocimiento/ ES pages.
 */

const fs = require('fs');
const path = require('path');

// CSS to add before </style> if not already present
const EXTRA_CSS = `
  .section-title{font-family:'Playfair Display',Georgia,serif;font-size:1.5rem;font-weight:800;color:var(--primary);margin-bottom:8px}
  .section-sub{font-size:.95rem;color:var(--muted);margin-bottom:1.5rem;line-height:1.6}
  .cat-card{position:relative;overflow:hidden}
  .cat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--primary),var(--gold))}
  .cat-icon{font-size:1.6rem;display:block;margin-bottom:10px}
  .cat-card a.btn{display:inline-block;background:var(--primary);color:#fff;font-weight:700;font-size:.84rem;padding:9px 18px;border-radius:8px;text-decoration:none;margin-top:14px;transition:background .2s}
  .cat-card a.btn:hover{background:var(--gold)}
`;

/**
 * Build a section HTML block with the given title, subtitle, and card list.
 * Each card: { icon, title, desc, href }
 */
function buildSection(title, subtitle, cards) {
  const cardHtml = cards.map(c => `    <div class="cat-card">
      <span class="cat-icon">${c.icon}</span>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <a href="${c.href}" class="btn">Ver ficha →</a>
    </div>`).join('\n');

  return `
  <section style="padding:0 5% 48px">
    <h2 class="section-title">${title}</h2>
    <p class="section-sub">${subtitle}</p>
    <div class="cat-grid">
${cardHtml}
    </div>
  </section>`;
}

// Map of PT sub-page slug → section data
const SECTIONS = {
  'acessorios': buildSection(
    'Acessórios por espécie',
    'O tamanho e o comportamento de cada espécie determinam os acessórios de que necessita.',
    [
      {
        icon: '🦜', title: 'Conuro-do-Sol',
        desc: 'Espécie activa e brincalhona: precisa de brinquedos destrutíveis, poleiros variados e sinos.',
        href: '/pt/especies/conuro-do-sol'
      },
      {
        icon: '🦜', title: 'Cacatua Goffin',
        desc: 'Muito inteligente e manipuladora: exige brinquedos de forrageamento e fechos de segurança na gaiola.',
        href: '/pt/especies/cacatua-goffin'
      },
      {
        icon: '🦜', title: 'Periquito Alexandrino',
        desc: 'Papagaio médio que precisa de gaiola espaçosa, baloiço e brinquedos de madeira para o bico.',
        href: '/pt/especies/periquito-alexandrino'
      },
    ]
  ),

  'adestramento': buildSection(
    'Espécies mais fáceis de adestrar',
    'Algumas espécies respondem especialmente bem ao treino com reforço positivo.',
    [
      {
        icon: '🦜', title: 'Papagaio-do-Senegal',
        desc: 'Tranquilo e motivado pela interacção humana — aprende truques com facilidade e rapidez.',
        href: '/pt/especies/papagaio-senegal'
      },
      {
        icon: '🦜', title: 'Amazona-nuca-amarela',
        desc: 'Grande capacidade vocal e de aprendizagem. Responde muito bem ao treino diário com clicker.',
        href: '/pt/especies/amazona-nuca-amarela'
      },
      {
        icon: '🦜', title: 'Cacatua-branca',
        desc: 'Muito sociável e motivada pela interacção humana; aprende comportamentos complexos com facilidade.',
        href: '/pt/especies/cacatua-branca'
      },
    ]
  ),

  'comportamento': buildSection(
    'Comportamento por espécie',
    'O temperamento varia muito entre espécies. Conheça o seu papagaio antes de adoptar.',
    [
      {
        icon: '🦜', title: 'Conuro-do-Sol',
        desc: 'Alegre e barulhento: socializa bem mas pode ser muito vocal. Ideal para lares activos.',
        href: '/pt/especies/conuro-do-sol'
      },
      {
        icon: '🦜', title: 'Papagaio-do-Senegal',
        desc: 'Calmo e carinhoso com o seu tutor, pode ser desconfiado com estranhos. Bom papagaio de apartamento.',
        href: '/pt/especies/papagaio-senegal'
      },
      {
        icon: '🦜', title: 'Caique',
        desc: 'Brincalhão e hiperactivo: cheio de energia, muito divertido mas exige muito tempo de brincadeira.',
        href: '/pt/especies/caique'
      },
      {
        icon: '🦜', title: 'Periquito-monge',
        desc: 'Gregário e curioso; comunica muito e integra-se bem em famílias com outros animais.',
        href: '/pt/especies/periquito-monge'
      },
    ]
  ),

  'comprar': buildSection(
    'Compre na sua cidade',
    'Guias locais para encontrar criadores de confiança nas principais cidades de Portugal.',
    [
      {
        icon: '🏙️', title: 'Comprar um papagaio em Lisboa',
        desc: 'Criadores registados, preços e onde recolher a sua ave na Grande Lisboa.',
        href: '/pt/cidades/papagaios-lisboa.html'
      },
      {
        icon: '🏙️', title: 'Comprar um papagaio no Porto',
        desc: 'Directório de criadores e lojas especializadas no Grande Porto.',
        href: '/pt/cidades/papagaios-porto.html'
      },
      {
        icon: '🏙️', title: 'Comprar um papagaio em Braga',
        desc: 'Criadores certificados e processo de adopção na região de Braga.',
        href: '/pt/cidades/papagaios-braga.html'
      },
      {
        icon: '🏙️', title: 'Comprar um papagaio em Coimbra',
        desc: 'Guia de compra e adoptantes verificados na região Centro de Portugal.',
        href: '/pt/cidades/papagaios-coimbra.html'
      },
    ]
  ),

  'documentacao-cites': buildSection(
    'Espécies reguladas pela CITES',
    'Consulte a documentação exigida para cada espécie antes de adoptar.',
    [
      {
        icon: '🦜', title: 'Cacatua-branca (CITES II)',
        desc: 'Apêndice II CITES. Requer documentação de criador registado e anilha de identificação.',
        href: '/pt/especies/cacatua-branca'
      },
      {
        icon: '🦜', title: 'Amazona-nuca-amarela (CITES I)',
        desc: 'Apêndice I CITES em perigo de extinção. Apenas permitida a compra de exemplares nascidos em criadouro certificado.',
        href: '/pt/especies/amazona-nuca-amarela'
      },
      {
        icon: '🦜', title: 'Cacatua Goffin (CITES II)',
        desc: 'Apêndice II CITES. Importante verificar a origem do exemplar e a documentação do criador.',
        href: '/pt/especies/cacatua-goffin'
      },
      {
        icon: '🏙️', title: 'Criador legal em Lisboa',
        desc: 'Compre com CITES e documentação completa na Grande Lisboa.',
        href: '/pt/cidades/papagaios-lisboa.html'
      },
    ]
  ),

  'guias-iniciantes': buildSection(
    'Espécies recomendadas para iniciantes',
    'Se é o seu primeiro papagaio, estas espécies são mais tolerantes e fáceis de manejar.',
    [
      {
        icon: '🦜', title: 'Papagaio Pionus',
        desc: 'Tranquilo, carinhoso e com nível sonoro baixo: o papagaio ideal para famílias que se iniciam.',
        href: '/pt/especies/papagaio-pionus'
      },
      {
        icon: '🦜', title: 'Conuro-faces-verdes',
        desc: 'Pequeno, brincalhão e resistente. Muito sociável e fácil de manejar para novos tutores.',
        href: '/pt/especies/conuro-faces-verdes'
      },
      {
        icon: '🦜', title: 'Papagaio-do-Senegal',
        desc: 'Médio e dócil: aprende a falar com facilidade e adapta-se bem à vida em apartamento.',
        href: '/pt/especies/papagaio-senegal'
      },
      {
        icon: '🏙️', title: 'Encontre um criador perto de si',
        desc: 'Guias locais para comprar o seu primeiro papagaio de forma legal e segura em Portugal.',
        href: '/pt/cidades/papagaios-porto.html'
      },
    ]
  ),

  'instalacoes': buildSection(
    'Necessidades de espaço por espécie',
    'O tamanho da gaiola e o espaço de voo livre variam conforme a espécie.',
    [
      {
        icon: '🦜', title: 'Cacatua-branca',
        desc: 'Precisa de uma das gaiolas maiores: mínimo 90×90×120 cm com espaço para estender as asas.',
        href: '/pt/especies/cacatua-branca'
      },
      {
        icon: '🦜', title: 'Caique',
        desc: 'Papagaio pequeno mas muito activo: requer muitos níveis de poleiros e brinquedos para explorar.',
        href: '/pt/especies/caique'
      },
      {
        icon: '🦜', title: 'Periquito-colar-indiano',
        desc: 'Cauda longa que exige gaiolas altas. Beneficia de espaço de voo livre diário.',
        href: '/pt/especies/periquito-colar-indiano'
      },
    ]
  ),

  'nutricao': buildSection(
    'Dietas por espécie',
    'Cada espécie tem necessidades nutricionais específicas. Consulte a ficha do seu papagaio.',
    [
      {
        icon: '🦜', title: 'Amazona-asa-laranja',
        desc: 'As amazonas têm tendência para a obesidade; a dieta deve ser rica em vegetais e pobre em gorduras.',
        href: '/pt/especies/amazona-asa-laranja'
      },
      {
        icon: '🦜', title: 'Cacatua-branca',
        desc: 'As cacatuas são propensas à obesidade; a sua dieta deve ser baixa em gorduras e rica em vegetais.',
        href: '/pt/especies/cacatua-branca'
      },
      {
        icon: '🦜', title: 'Conuro-do-Sol',
        desc: 'Espécie muito activa que necessita de dieta variada com fruta fresca, pellets e vegetais.',
        href: '/pt/especies/conuro-do-sol'
      },
      {
        icon: '🦜', title: 'Caique',
        desc: 'Metabolismo acelerado; precisa de muita fruta tropical e vegetais ricos em vitaminas.',
        href: '/pt/especies/caique'
      },
    ]
  ),

  'saude': buildSection(
    'Saúde por espécie',
    'Cada espécie tem predisposições sanitárias distintas. Informe-se antes de adoptar.',
    [
      {
        icon: '🦜', title: 'Cacatua-branca',
        desc: 'Susceptível à PBFD (doença do bico e das penas). Importante a detecção precoce.',
        href: '/pt/especies/cacatua-branca'
      },
      {
        icon: '🦜', title: 'Caique',
        desc: 'Espécie robusta mas sensível ao stress. Ambiente estável e enriquecimento diário são essenciais.',
        href: '/pt/especies/caique'
      },
      {
        icon: '🦜', title: 'Amazona-asa-laranja',
        desc: 'As amazonas têm tendência para a obesidade e doenças hepáticas com dieta incorrecta.',
        href: '/pt/especies/amazona-asa-laranja'
      },
      {
        icon: '🦜', title: 'Cacatua-galah',
        desc: 'Propensa a deficiências vitamínicas; requer supervisão veterinária regular e dieta equilibrada.',
        href: '/pt/especies/cacatua-galah'
      },
    ]
  ),
};

const BLOG_BACKLINKS_MARKER = '  <!-- BLOG-BACKLINKS: artigos de blog relacionados — injectado por add-blog-backlinks-to-pt-pages.js -->';
const STYLE_CLOSE = '</style>';

let processed = 0;
let skipped = 0;

for (const [slug, sectionHtml] of Object.entries(SECTIONS)) {
  const filePath = path.join('pt', 'conhecimento', slug, 'index.html');

  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Not found: ${filePath}`);
    skipped++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Guard: skip if already processed
  if (html.includes('section-title')) {
    console.log(`  ↷ Already has section-title, skipping: ${filePath}`);
    skipped++;
    continue;
  }

  // 1. Inject extra CSS before </style>
  if (!html.includes('.section-title{')) {
    html = html.replace(STYLE_CLOSE, EXTRA_CSS + STYLE_CLOSE);
  }

  // 2. Insert section before the blog-backlinks comment
  if (html.includes(BLOG_BACKLINKS_MARKER)) {
    html = html.replace(BLOG_BACKLINKS_MARKER, sectionHtml + '\n\n' + BLOG_BACKLINKS_MARKER);
    console.log(`  ✓ Injected section into: ${filePath}`);
    processed++;
  } else {
    console.warn(`  ⚠ BLOG-BACKLINKS marker not found in: ${filePath}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

console.log(`\nDone. ${processed} files updated, ${skipped} skipped.`);
